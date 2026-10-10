/* Vehicle restrictions regression suite. Run: node tests/vehicle-rules.test.js */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname, '..');
const context = {
  window: {},
  console,
  document: { getElementById() { return { innerHTML: '' }; } },
  setTimeout, clearTimeout, Math, Set, Object, Array,
};
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(root, 'data.js'), 'utf8'), context);
const source = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const stopAt = source.indexOf('\ninitRandomizer();');
assert(stopAt > 0, 'app initialization boundary moved; update test harness');
const tests = `
const assert = globalThis.__assert;
const vehicles = DB.strat.filter(x=>x.cat==='Vehicle');
assert.equal(vehicles.length,9);
assert.equal(vehicles.map(x=>x.vehicleClass).sort().join(','),
  ['mech','mech','mech','mech','frv','frv','frv','tank','tank'].sort().join(','));
const group = Object.groupBy(vehicles,x=>x.vehicleClass);
const kinds = Object.keys(group).sort();
assert.equal(kinds.join(','),'frv,mech,tank');
function names(ids){return ids.map(id=>byId[id]?.name).join(', ')}
function checkIds(ids){
  const seen = new Set();
  const vehicleKinds = new Set();
  for(const id of ids){
    assert(!seen.has(id),'Duplicate stratagem: '+names(ids));seen.add(id);
    const kind=vehicleClassOf(byId[id]);
    if(kind){assert(!vehicleKinds.has(kind),'Duplicate '+kind+': '+names(ids));vehicleKinds.add(kind)}
  }
}
// Manual editor: reject a second of the same class, but accept mixed classes.
state.strats=['patriot',null,null,null];
assert.match(conflictMessage(byId.emancipator,1),/one Mech/);
assert.equal(conflictMessage(byId.frv,1),'');
assert.equal(conflictMessage(byId.maelstrom,1),'');
state.strats=['patriot','frv','maelstrom',null];
assert.equal(conflictMessage(byId.eagleAir,3),'');
assert.match(conflictMessage(byId.breakthrough,3),/Mech/);
assert.match(conflictMessage(byId.supplyFrv,3),/FRV/);
assert.match(conflictMessage(byId.bastion,3),/Tank/);
assert.match(conflictMessage(byId.patriot,3),/already selected/);
// Any different family mix must be accepted by the *family* rule.
for(let a=0;a<vehicles.length;a++){
  for(let b=0;b<vehicles.length;b++){
    if(a===b)continue;
    const blocked = sameVehicleClass(vehicles[a],[vehicles[b]]);
    assert.equal(blocked,vehicles[a].vehicleClass===vehicles[b].vehicleClass);
  }
}
const makeRules=(mode,unsafe,cursed)=>({
  weights:new Set(DB.armor.map(x=>x.weight)),armorPassive:'any',
  gearCats:Object.fromEntries(['primary','secondary','throwable','booster'].map(type=>[type,new Set(DB[type].map(x=>x.cat))])),
  cats:new Set(DB.strat.map(x=>x.cat)),support:'optional',backpack:'optional',
  antiHeavy:false,demolition:false,mode,allowUnsafe:unsafe,cursed,autoEvaluate:false
});
for(const mode of ['chaos','balanced','mission']){
  for(const unsafe of mode==='chaos'?[true,false]:[false]){
    for(const cursed of mode==='chaos'?[true,false]:[false]){
      const rules=makeRules(mode,unsafe,cursed);
      assert.equal(rulesCheck(rules,{}),'');
      let drawn=0,multi=0,parades=0;
      for(let n=0;n<1300;n++){
        const candidate=buildRoll(rules,{});
        assert(candidate,'Could not draw with unrestricted default pools');
        const ids=candidate.strats;
        assert.equal(ids.length,4);checkIds(ids);
        const number=ids.map(x=>vehicleClassOf(byId[x])).filter(Boolean).length;
        if(number>=2)multi++;
        if(candidate.rollPattern==='VEHICLE PARADE')parades++;
        drawn++;
      }
      if(unsafe&&cursed)assert(parades>0,'Cursed Vehicle Parade never triggered');
      console.log(mode,unsafe?'unsafe':'safe',cursed?'cursed':'plain',drawn,'rolls; mixed vehicle rolls:',multi,'parades:',parades);
    }
  }
}
// A valid combination of one of each vehicle family is preserved with locks.
for(const mode of ['chaos','balanced','mission']){
  const rules=makeRules(mode,mode==='chaos',true);
  const fixed={strat0:'patriot',strat1:'frv',strat2:'maelstrom'};
  assert.equal(rulesCheck(rules,fixed),'');
  for(let n=0;n<80;n++){
    const candidate=buildRoll(rules,fixed);
    assert(candidate);
    assert.equal(candidate.strats.slice(0,3).join(','),'patriot,frv,maelstrom');
    checkIds(candidate.strats);
  }
}
// Locked invalid combinations must be rejected, including with Chaos unsafe rules.
const unsafeRules=makeRules('chaos',true,true);
assert.match(rulesCheck(unsafeRules,{strat0:'patriot',strat1:'emancipator'}),/two Mech/);
assert.match(rulesCheck(unsafeRules,{strat0:'frv',strat1:'flameFrv'}),/two FRV/);
assert.match(rulesCheck(unsafeRules,{strat0:'maelstrom',strat1:'bastion'}),/two Tank/);
assert.match(rulesCheck(unsafeRules,{strat0:'patriot',strat1:'patriot'}),/same stratagem/);
const vehiclesOnly=makeRules('chaos',true,true);
vehiclesOnly.cats=new Set(['Vehicle']);
assert.match(rulesCheck(vehiclesOnly,{}),/cannot contain only vehicles/);
console.log('PASS: Vehicle class rules, manual editor, all randomizer modes, Chaos overrides, locks, and single-category validation.');
`;
context.__assert = assert;
// Evaluate only the logic before browser UI setup. Includes the same functions used by production.
vm.runInContext(source.slice(0,stopAt) + '\n' + tests + '\n})();', context, {timeout:45000});
