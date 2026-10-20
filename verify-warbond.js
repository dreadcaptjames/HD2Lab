/* Run: node verify-warbond.js [path-to-data.js] */
const fs=require('fs'),vm=require('vm'),path=require('path');
const root=__dirname;
const base=process.argv[2]||path.join(root,'sample-data-for-test.js');
const sandbox={window:{},document:{readyState:'loading',addEventListener(){ }},console};
if(fs.existsSync(base))vm.runInNewContext(fs.readFileSync(base,'utf8'),sandbox,{filename:base});
else {sandbox.window.HD2_DB={armor:[],primary:[],secondary:[],throwable:[],booster:[],strat:[]};sandbox.window.HD2_CATALOG={counts:{}}}
const initial=Object.values(sandbox.window.HD2_DB).reduce((sum,x)=>sum+x.length,0);
const content=fs.readFileSync(path.join(root,'warbond-scope-of-authority.js'),'utf8');
vm.runInNewContext(content,sandbox);vm.runInNewContext(content,sandbox);
const db=sandbox.window.HD2_DB,after=Object.values(db).reduce((sum,x)=>sum+x.length,0);
const expected={armor:['SS-33 Mimetic Marshal','SS-15 Focal Point'],primary:['R-40 Sightliner'],secondary:['P-44 Mist'],throwable:['G-11 Caltrops'],strat:['AMW-20 Apex','LAS-44 Nova']};
for(const [key,names] of Object.entries(expected))for(const name of names) {
const matches=db[key].filter(x=>x.name===name);if(matches.length!==1)throw new Error(`${key}: expected one ${name}, got ${matches.length}`);
}
if(after!==initial+7)throw new Error(`Expected +7 entries, got ${after-initial}`);
if(!db.strat.find(x=>x.name==='AMW-20 Apex').packRequired)throw new Error('Apex backpack requirement missing');
if(db.armor.filter(x=>x.passive==='Stationary Shroud').length!==2)throw new Error('Armor passives mismatch');
console.log('PASS: seven verified entries, no duplicates after second load, correct armor passives and support category');
console.log(JSON.stringify({previous:initial,current:after,newEntries:after-initial,counts:Object.fromEntries(Object.entries(db).map(([k,v])=>[k,v.length]))},null,2));
