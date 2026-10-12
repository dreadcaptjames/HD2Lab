
(()=>{'use strict';
const ICONS={eagle:'<path d="M4 13 8 9h2l2-2 2 2h2l4 4-2 2-3-2-3 3-3-3-3 2Z"/><path d="M8 16v3m4-5v8m4-6v3"/>',shield:'<path d="M12 2 21 6v6c0 5-4 8-9 10-5-2-9-5-9-10V6Z"/><path d="m8 12 3 3 5-6"/>',armor:'<path d="M8 3h8l5 5-3 4v9H6v-9L3 8Z"/><path d="m8 3 4 7 4-7M8 15h8"/>',rifle:'<path d="M3 9h13l3 3-3 2H9l-3 4H3l2-5H2Z"/><path d="M13 9V6M18 12h4M9 14l1 5"/>',pistol:'<path d="M3 8h17v5h-9l-1 8H6l1-8H3Z"/><path d="M16 8V5h4"/>',grenade:'<rect x="6" y="7" width="12" height="14" rx="6"/><path d="M12 7V4h4M15 3h4M8 12h8M12 12v5"/>',orbital:'<circle cx="12" cy="13" r="4"/><circle cx="12" cy="13" r="8" stroke-dasharray="2.2 2.2"/><path d="M12 1v8M8.5 16.5 6 19m9.5-2.5L18 19"/>',sentry:'<rect x="6" y="10" width="12" height="4" rx="1"/><path d="M12 10V4m0 0h6M9 14 7 20m8-6 2 6"/><path d="M9 9h6"/>',rocket:'<path d="m5 19 4-8 7-5 3 3-5 7-9 3Z"/><path d="M9 11l4 4M5 19l-2 2M12 21l2-2"/>',pack:'<rect x="8" y="5" width="8" height="14" rx="2"/><path d="M5 7h3v10H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Zm11 0h3a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-3"/><circle cx="12" cy="12" r="2"/>',laser:'<path d="M12 2 4 13h7l-2 9 11-13h-7l2-7Z"/>',boost:'<path d="m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3Z"/>',bug:'<rect x="4" y="4" width="16" height="16" rx="1.5"/><path d="M12 7 15 9 16 12 12 14 8 12 9 9Z"/><path d="M9 9 6 6M15 9l3-3M8 12H5m11 0h3M9 15l-3 3m9-3 3 3M12 14v3"/>',bot:'<rect x="4" y="4" width="16" height="16" rx="1.5"/><path d="M8 7h8l2 4-1 5-5 3-5-3-1-5Z"/><path d="M9 7V5m6 2V5M9 11h2m2 0h2M9 14h6"/>',squid:'<rect x="4" y="4" width="16" height="16" rx="1.5"/><path d="M12 7c3 2 5 4 5 7 0 3-2 5-5 6-3-1-5-3-5-6 0-3 2-5 5-7Z"/><path d="M9 11l3-1 3 1M9 14l3 1 3-1M9.5 17 8 19m4-2v3m4-1-1.5 2"/>',mixed:'<rect x="4" y="4" width="16" height="16" rx="1.5"/><path d="M12 6v12M6 12h12M9 9l3 3 3-3M9 15l3-3 3 3"/>',vehicle:'<rect x="8" y="5" width="8" height="14" rx="2"/><path d="M5 7h3v10H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Zm11 0h3a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-3"/><circle cx="12" cy="12" r="2.5"/>'};
Object.assign(ICONS,{
crest:'<rect x="4" y="4" width="16" height="16" rx="1.5"/><path d="M12 6c-3 3-3 9 0 12 3-3 3-9 0-12Z"/><path d="M6 12h12M7 7l-2-2m12 2 2-2M7 17l-2 2m12-2 2 2"/><path d="m8 10 4-3 4 3-4-1z"/>',
bug:'<path d="M12 3 16 5 18 9 16 13 12 15 8 13 6 9 8 5Z"/><path d="M10 10h1m3 0h1"/><path d="M12 15v6M8 7 4 4M16 7l4-3M6 10H2m16 0h4M7 14l-4 5m14-5 4 5"/><path d="M8 12c2 1 6 1 8 0"/>',
bot:'<path d="M6 5h12l2 4-1 8-7 4-7-4-1-8Z"/><path d="M9 5V2m6 3V2"/><path d="M8 10h3l1 2 1-2h3"/><path d="M8 15h8"/><path d="M5 20 3 22m16-2 2 2"/>',
squid:'<path d="M12 3c5 3 7 6 7 10 0 4-3 7-7 8-4-1-7-4-7-8 0-4 2-7 7-10Z"/><path d="M8 9l4-3 4 3"/><path d="M7 13l3-1 2 2 2-2 3 1"/><path d="M8 17l1 4m3-4v5m3-5 1 4"/>',
mixed:'<circle cx="12" cy="12" r="9"/><path d="M12 4v16M4 12h16M8 8l4 4 4-4M8 16l4-4 4 4"/>',
flame:'<path d="M12 2c2 5-3 6-1 10 3-1 4-4 4-6 8 7 8 16-3 16S2 14 8 8c0 4 1 5 4 6"/>',
plasma:'<circle cx="12" cy="12" r="4"/><path d="M12 1v4m0 14v4M1 12h4m14 0h4M4 4l3 3m10 10 3 3M20 4l-3 3M7 17l-3 3"/>',
shotgun:'<path d="M2 9h15l4 3-4 2H9l-4 6H2l2-7H2Z"/><path d="M8 9V5h6v4M18 12h4M8 16h5"/>',
smg:'<path d="M3 10h16l2 3-3 2H9l-3 5H3l2-6H2Z"/><path d="M11 10V7h5M12 15l1 4"/>',
melee:'<path d="m4 20 8-8 8-9-1-1-9 8-8 8 2 2Z"/><path d="M8 14l4 4M4 17l3 3"/>',
smoke:'<path d="M6 19h12M7 15c-4-2 0-5 3-4-2-3 1-6 4-4 0-5 7-4 7 1-1 3-4 4-6 5m-8 3c-4-1-5-4-3-7"/>',
stim:'<path d="M4 16 16 4l4 4-12 12-4-4ZM12 8l4 4M15 4l2-2 5 5-2 2M7 16l2 2"/>',
radar:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><path d="M12 12 17.5 6.5M12 4v1M4 12h1m7 7v1m7-8h1"/>',
drone:'<rect x="8" y="9" width="8" height="6" rx="2"/><path d="M8 10 5 7m11 3 3-3M5 5a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm14 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"/><path d="m10 15-2 5m8-5 2 5"/>',
explosive:'<circle cx="12" cy="12" r="4"/><path d="M12 1v5m0 12v5M1 12h5m12 0h5M4 4l4 4m8 8 4 4M20 4l-4 4m-8 8-4 4"/>',
precision:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 1v5m0 12v5M1 12h5m12 0h5"/>',
logistics:'<rect x="4" y="7" width="16" height="12" rx="2"/><path d="M8 7V4h8v3M12 11v5m-3-2h6"/>',
});
const svg=(type)=>'<svg viewBox="0 0 24 24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">'+(ICONS[type]||ICONS.boost)+'</svg>';
// Brand logo is supplied as the original image asset in index.html.
// Capability vector: anti-heavy, swarm control, medium threats, objective destruction, survivability, ammo/sustain.
const DB=window.HD2_DB;
const byId={};Object.values(DB).forEach(arr=>arr.forEach(x=>byId[x.id]=x));
const state={front:'bugs',mission:'general',party:'squad',difficulty:7,armor:null,primary:null,secondary:null,throwable:null,booster:null,strats:[null,null,null,null]};
let analyzed=null,pickerTarget=null,pickerFilter='All',pickerQuery='';
const labels={armor:'Body armor',primary:'Primary weapon',secondary:'Secondary weapon',throwable:'Throwable',booster:'Squad booster'};
const fronts=[['bugs','Terminids','bug'],['bots','Automatons','bot'],['squids','Illuminate','squid'],['mixed','All fronts','mixed']];
const targets=['Anti-heavy','Swarm control','Medium targets','Objectives','Survivability','Sustain'];
// Actual vehicle-slot rule. Multiple DIFFERENT vehicle types may coexist; two
// of the same class may not. This restriction applies even to Complete Chaos.
const vehicleClassLabels={mech:'Mech',frv:'FRV',tank:'Tank'};
const vehicleClassOf=item=>item?.cat==='Vehicle'?item.vehicleClass:null;
function sameVehicleClass(item,others){
  const kind=vehicleClassOf(item);
  return !!kind&&others.some(other=>vehicleClassOf(other)===kind);
}

const iconFor=(x,type)=>{
  if(!x)return {armor:'armor',primary:'rifle',secondary:'pistol',throwable:'grenade',booster:'boost',strat:'orbital'}[type];
  if(type==='armor')return x.tags.includes('medkit')?'stim':x.tags.includes('stealth')?'radar':'armor';
  if(type==='throwable')return x.tags.includes('fire')?'flame':x.tags.includes('smoke')?'smoke':x.tags.includes('arc')?'plasma':x.tags.includes('stun')?'precision':'grenade';
  if(type==='booster')return x.tags.includes('mobility')?'boost':x.tags.includes('supply')?'logistics':x.tags.includes('recon')?'radar':'shield';
  if(type==='strat'){
    if(x.cat==='Support weapon')return x.tags.includes('antiTank')?'rocket':x.tags.includes('fire')?'flame':x.tags.includes('energy')?'laser':'rifle';
    if(x.cat==='Backpack')return x.tags.includes('drone')?'drone':x.tags.includes('shield')?'shield':'pack';
    if(x.cat==='Eagle')return 'eagle';if(x.cat==='Orbital')return x.tags.includes('precisionStrike')?'precision':'orbital';
    if(x.cat==='Sentry')return 'sentry';if(x.cat==='Emplacement')return x.tags.includes('shield')?'shield':x.tags.includes('trap')?'explosive':'sentry';
    if(x.cat==='Vehicle')return 'vehicle';return 'orbital';
  }
  if(x.tags.includes('fire'))return 'flame';if(x.tags.includes('plasma')||x.tags.includes('arc'))return 'plasma';
  if(x.cat==='Shotgun')return 'shotgun';if(x.cat==='SMG')return 'smg';if(x.cat==='Melee')return 'melee';
  if(x.tags.includes('precision'))return 'precision';if(x.tags.includes('energy'))return 'laser';
  if(x.tags.includes('explosive'))return 'explosive';return type==='secondary'?'pistol':'rifle';
};
const $=s=>document.querySelector(s);
function updateParams(){state.mission=$('#mission').value;state.party=$('#party').value;state.difficulty=Number($('#difficulty').value);$('#diffVal').textContent=state.difficulty;const levels=['','TRIVIAL','EASY','MEDIUM','CHALLENGING','HARD','EXTREME','SUICIDE MISSION','IMPOSSIBLE','HELLDIVE','SUPER HELLDIVE'];$('#diffName').textContent='— '+levels[state.difficulty];invalidate();}
function renderFronts(){
  $('#factions').innerHTML=fronts.map(([id,name,icon])=>`<button class="faction ${state.front===id?'active':''}" data-front="${id}" aria-pressed="${state.front===id}"><span class="faction-crest">${svg(icon)}</span><span>${name}</span><small>${{bugs:'TERMINID FRONT',bots:'AUTOMATON FRONT',squids:'ILLUMINATE FRONT',mixed:'MULTI-FRONT'}[id]}</small></button>`).join('');
  $('#frontDisplay').textContent=fronts.find(x=>x[0]===state.front)[1].toUpperCase();
  $('#frontCode').textContent={bugs:'TRM',bots:'ATM',squids:'ILL',mixed:'ALL'}[state.front];
  $('#scanCrest').innerHTML=svg(fronts.find(x=>x[0]===state.front)[2]);
  document.querySelector('.hero-side').dataset.front=state.front;
}
function selected(type,idx){return type==='strat'?byId[state.strats[idx]]:byId[state[type]]}
function slotHtml(type,idx=0){let v=selected(type,idx),title=type==='strat'?`Stratagem ${idx+1}`:labels[type],extra=v?(type==='armor'?v.weight+' armor • '+v.passive:type==='strat'?(vehicleClassOf(v)?v.cat+' • '+vehicleClassLabels[vehicleClassOf(v)]:v.cat):v.cat+' • '+v.desc):'Tap to browse equipment';return `<button class="slot ${type==='armor'?'armor-slot ':''}${v?'':'empty'}" data-type="${type}" data-idx="${idx}" aria-label="Select ${title}. ${v?v.name:'Empty'}"><span class="sicon">${svg(iconFor(v,type))}</span><span class="scopy"><div class="stype">${title}</div><div class="sname">${v?v.name:'+ SELECT '+title.toUpperCase()+' +'}</div><div class="sdesc">${extra}</div></span><span class="chev">›</span></button>`}
function renderSlots(){$('#armorSlot').innerHTML=slotHtml('armor');$('#weaponSlots').innerHTML=['primary','secondary','throwable'].map(t=>slotHtml(t)).join('');$('#boosterSlot').innerHTML=slotHtml('booster');$('#stratSlots').innerHTML=[0,1,2,3].map(i=>slotHtml('strat',i)).join('');const n=['armor','primary','secondary','throwable','booster'].filter(k=>state[k]).length+state.strats.filter(Boolean).length;if(!analyzed)$('#grade').textContent=n+' / 9 EQUIPMENT SLOTS FILLED';renderRollLocks();}
function invalidate(){analyzed=null;$('#scoreRing').style.setProperty('--percent',0);$('#scoreNum').textContent='—';$('#scoreTitle').textContent='Build your kit.';$('#scoreSubtitle').textContent='Your loadout has not been evaluated yet.';$('#status').textContent='AWAITING EVALUATION';$('#barLabel').textContent='NOT ANALYZED';$('#insightCount').textContent='NO REPORT';$('#insights').innerHTML='<div class="placeholder">Your next analysis will assess faction-specific role coverage, armor interactions and the full four-stratagem package.</div>';renderBars([0,0,0,0,0,0]);renderSlots();}
function renderBars(values){$('#bars').innerHTML=targets.map((t,i)=>`<div class="barrow"><span>${t}</span><div class="barbg"><div class="barfill" style="width:${values[i]||0}%;background:${(values[i]||0)<46?'#d79b69':(values[i]||0)>79?'#a7dfb0':'#7ad7cd'}"></div></div><strong>${values[i]===undefined||!analyzed?'—':values[i]}</strong></div>`).join('');}
function conflictMessage(obj,idx){const other=state.strats.map((id,i)=>i===idx?null:byId[id]).filter(Boolean);if(other.some(x=>x.id===obj.id))return 'That stratagem is already selected.';if(sameVehicleClass(obj,other))return 'Only one '+vehicleClassLabels[vehicleClassOf(obj)]+' stratagem may be selected per loadout.';if(obj.cat==='Support weapon'&&other.some(x=>x.cat==='Support weapon'))return 'Planner permits one support weapon. Clear the existing one first.';if(obj.cat==='Backpack'&&other.some(x=>x.cat==='Backpack'))return 'Only one backpack is allowed in this planner.';if(obj.cat==='Backpack'&&other.some(x=>x.packRequired))return 'A backpack-fed weapon already occupies your pack slot.';if(obj.packRequired&&other.some(x=>x.cat==='Backpack'))return 'This weapon requires its ammo backpack. Clear the separate backpack first.';return ''}
function openPicker(type,idx=0){pickerTarget={type,idx};pickerFilter='All';pickerQuery='';$('#search').value='';$('#pickerAlert').textContent='';$('#modalKicker').textContent=type==='strat'?'STRATAGEM REQUISITION':'PERSONAL EQUIPMENT';$('#modalTitle').textContent=type==='strat'?'Select Stratagem '+(idx+1):'Select '+labels[type];$('#modal').dataset.pickerType=type;$('#modal').classList.add('show');$('#modal').setAttribute('aria-hidden','false');document.body.style.overflow='hidden';$('#pickerList').scrollTop=0;$('#filters').scrollTop=0;$('#filters').scrollLeft=0;renderPicker();$('#search').focus({preventScroll:true});}
function closePicker(){$('#modal').classList.remove('show');$('#modal').setAttribute('aria-hidden','true');document.body.style.overflow='';pickerTarget=null;}
function renderPicker(){if(!pickerTarget)return;const {type,idx}=pickerTarget,arr=DB[type]||[],cats=type==='armor'?['All','Light','Medium','Heavy',...new Set(arr.map(x=>x.passive))]:['All',...new Set(arr.map(x=>x.cat))];const filterRegion=$('#filters'),previousFilterTop=filterRegion.scrollTop,previousFilterLeft=filterRegion.scrollLeft;filterRegion.innerHTML=cats.map(c=>`<button class="filter ${pickerFilter===c?'active':''}" data-filter="${c.replace(/"/g,'&quot;')}" aria-pressed="${pickerFilter===c}">${c}</button>`).join('');filterRegion.scrollTop=previousFilterTop;filterRegion.scrollLeft=previousFilterLeft;const result=arr.filter(x=>(pickerFilter==='All'||(type==='armor'?(x.weight===pickerFilter||x.passive===pickerFilter):x.cat===pickerFilter))&&[x.name,x.cat,x.desc,...x.tags,x.passive||'',x.weight||''].join(' ').toLowerCase().includes(pickerQuery));let html='';const existing=type==='strat'?state.strats[idx]:state[type];if(existing)html+=`<button class="pick" data-clear="1"><span class="picon" style="color:var(--red)">×</span><div><strong>Clear this slot</strong><p>Leave this equipment slot unassigned.</p></div><span class="ptag">REMOVE</span></button>`;html+=result.map(x=>{const block=type==='strat'?conflictMessage(x,idx):'',active=existing===x.id;return `<button class="pick ${block?'blocked':''} ${active?'selected':''}" data-pick="${x.id}" ${block?'aria-disabled="true"':''} title="${block}"><span class="picon">${svg(iconFor(x,type))}</span><div><strong>${x.name}</strong><p>${x.desc}${block?'<span style="display:block;color:var(--red);margin-top:5px">'+block+'</span>':''}</p></div><span class="ptag">${active?'SELECTED':type==='armor'?x.weight:type==='strat'&&vehicleClassOf(x)?vehicleClassLabels[vehicleClassOf(x)]:x.cat}</span></button>`}).join('');$('#pickerMeta').textContent=result.length+' MATCHING ENTRIES  /  '+arr.length+' TOTAL IN CATEGORY';const resultsList=$('#pickerList');resultsList.innerHTML=html||'<div class="empty-search">No matching items. Try another search or category.</div>';resultsList.scrollTop=0;resultsList.scrollLeft=0;}
let toastTimer;function toast(msg,err=false){const el=$('#toast');el.textContent=msg;el.className='toast show'+(err?' err':'');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.className='toast',2800);}
function choose(id){if(!pickerTarget)return;const {type,idx}=pickerTarget;if(type==='strat'){const message=conflictMessage(byId[id],idx);if(message){$('#pickerAlert').textContent=message;toast(message,true);return;}state.strats[idx]=id;}else state[type]=id;closePicker();invalidate();}
function applyTemplate(key){const sets={bugs:{front:'bugs',armor:'cm09',primary:'blitzer',secondary:'gp31',throwable:'thermite',booster:'stamina',strats:['rr','eagleNap','orbGatt','gatSentry']},bots:{front:'bots',armor:'fs05',primary:'dcs',secondary:'gp31',throwable:'stun',booster:'vitality',strats:['ac','eagleAir','orbPS','shieldRelay']},squids:{front:'squids',armor:'ce35',primary:'purifier',secondary:'senator',throwable:'impact',booster:'hellpod',strats:['quasar','orbGas','eagleAir','gatSentry']}};Object.assign(state,sets[key]);renderFronts();invalidate();toast('Sample build loaded. Press Evaluate to analyze.');}
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const has=(items,t)=>items.some(x=>x.tags.includes(t));
function analyze(){const missing=['armor','primary','secondary','throwable','booster'].filter(k=>!state[k]).map(k=>labels[k]);state.strats.forEach((s,i)=>{if(!s)missing.push('Stratagem '+(i+1))});if(missing.length){toast('Fill these slots first: '+missing.join(', '),true);$('#insights').innerHTML=`<div class="insight warn"><span class="mark">!</span><div><strong>Incomplete loadout</strong><p>Choose ${missing.join(', ')} to evaluate a complete nine-slot kit.</p></div></div>`;$('#status').textContent='INCOMPLETE';return;}
const armor=byId[state.armor],primary=byId[state.primary],secondary=byId[state.secondary],grenade=byId[state.throwable],booster=byId[state.booster],strats=state.strats.map(x=>byId[x]);const all=[armor,primary,secondary,grenade,booster,...strats],n=t=>all.find(x=>x.id===t), support=strats.find(x=>x.cat==='Support weapon'),backpack=strats.find(x=>x.cat==='Backpack');
const sum=Array.from({length:6},(_,i)=>all.reduce((v,x)=>v+x.c[i],0));
const frontFactors={bugs:[1.08,1.4,.89,.95,1.0,1.01],bots:[1.45,.81,1.4,1.15,1.35,1],squids:[1.1,1.22,1.22,1.13,1.12,1],mixed:[1.2,1.2,1.2,1.2,1.1,1.08]}[state.front];
const missionFactors={general:[1,1,1,1,1,1],blitz:[1,1,1,1.42,.87,1.05],defense:[1.17,1.4,1.15,.84,1.2,.99],objectives:[1.15,.96,1.15,1.38,1,1],stealth:[.91,.89,.9,1.19,1.05,1.12]}[state.mission];
const diffMultiplier=state.difficulty>=9?1.28:state.difficulty>=7?1.16:state.difficulty>=5?1.04:.91;
const baseTargets=[12,14,12,10,10,11];
let metrics=sum.map((total,i)=>clamp(Math.round(100*(1-Math.exp(-total/(baseTargets[i]*frontFactors[i]*missionFactors[i]*diffMultiplier)*1.85))),0,100));
if(state.party==='solo'){metrics[4]=clamp(metrics[4]-7,0,100);metrics[5]=clamp(metrics[5]-5,0,100);}
const insights=[],bonuses=[];let synergy=0,penalty=0;
const add=(type,title,body)=>insights.push({type,title,body});const bonus=(pts,title,body)=>{synergy+=pts;bonuses.push({type:'good',title,body})};
const supports=strats.filter(x=>x.cat==='Support weapon');
const backpacks=strats.filter(x=>x.cat==='Backpack');
const duplicates=[...new Set(state.strats.filter((id,i)=>state.strats.indexOf(id)!==i))];
const vehiclesByClass=strats.filter(x=>vehicleClassOf(x)).reduce((acc,x)=>{(acc[vehicleClassOf(x)]??=[]).push(x.name);return acc},{});
const repeatedVehicleClasses=Object.entries(vehiclesByClass).filter(([,items])=>items.length>1);
const invalidReasons=[];
for(const [kind,items] of repeatedVehicleClasses)invalidReasons.push('More than one '+vehicleClassLabels[kind]+' selected: '+items.join(', '));
if(duplicates.length)invalidReasons.push('Repeated stratagems: '+duplicates.map(id=>byId[id].name).join(', '));
if(supports.length>1)invalidReasons.push(`${supports.length} support weapons selected in one loadout`);
if(backpacks.length>1)invalidReasons.push(`${backpacks.length} separate backpacks selected`);
if(backpacks.length&&supports.some(x=>x.packRequired))invalidReasons.push('Backpack-fed weapon clashes with a separate backpack');
const sandboxBuild=invalidReasons.length>0,nonDeployable=duplicates.length>0||repeatedVehicleClasses.length>0;
if(sandboxBuild)penalty+=Math.min(32,8*invalidReasons.length);
if(armor.tags.includes('engineering')&&grenade.tags.some(t=>['antiTank','stun','demolition','fire','gas'].includes(t)))bonus(6,'Engineering Kit × '+grenade.name,'Two extra throwables amplify your selected grenade’s tactical role, while the armor also aids controlled fire.');
if(armor.tags.includes('servo')&&(grenade.tags.includes('antiTank')||grenade.tags.includes('demolition')))bonus(5,'Servo-Assisted delivery','Extra throwing distance helps deliver powerful grenades without committing as close to the target.');
if(armor.tags.includes('medkit')&&booster.id==='infusion')bonus(9,'Med-Kit × Experimental Infusion','More stims, longer stim duration and boosted stim effects create a genuinely reinforcing sustain loop.');
if(armor.tags.includes('siege')&&(primary.tags.includes('fast')||primary.tags.includes('ballistic')||primary.tags.includes('slow')))bonus(6,'Siege Ready × primary weapon','Faster primary reloads and increased ammunition directly support your chosen gun’s uptime.');
if(armor.tags.includes('fortified')&&(has(all,'stationary')||has(all,'sentry')))bonus(6,'Fortified firing position','Explosive resistance and reduced recoil complement extended shooting or held ground.');
if(armor.tags.includes('peak')&&(primary.tags.includes('recoil')||support?.tags.includes('recoil')))bonus(6,'Peak Physique × heavy handling','Improved weapon handling supports a less agile primary or heavy support weapon.');
if(armor.tags.includes('fireResist')&&has(all,'fire'))bonus(5,'Inflammable × incendiary pressure','Fire resistance makes close-range fire setups more forgiving, though friendly fire remains dangerous.');
if(armor.tags.includes('gasResist')&&has(all,'gas'))bonus(5,'Gas filtration × area denial','Gas resistance complements closer play around your own gas effects.');
if(armor.tags.includes('arcResist')&&has(all,'arc'))bonus(5,'Electrical Conduit × arc equipment','Arc resistance adds protection when the team uses electrical area-control tools.');
if(armor.tags.includes('stealth')&&(primary.tags.includes('precision')||primary.tags.includes('stealth')||state.mission==='stealth'))bonus(6,'Scout × low-contact approach','Reduced detection and radar information reinforce deliberate target selection and avoidance.');
if(grenade.tags.includes('stun')&&strats.some(x=>x.tags.includes('precisionStrike')||x.id==='eagle500'))bonus(8,'Stun setup × precision finisher','Hold armored targets in place, then land an Orbital Precision Strike or 500kg bomb more reliably.');
if((grenade.tags.includes('stun')||has(strats,'stun'))&&strats.some(x=>x.tags.includes('aoe')&& !x.tags.includes('stun')))bonus(5,'Control first, damage second','Disabling a group can keep it inside the damage zone of an area strike.');
if(primary.tags.includes('close')&&(backpack?.tags.includes('shield')||backpack?.tags.includes('drone')))bonus(6,'Close-quarters protection','The backpack mitigates the exposure created by a short-range primary weapon.');
if(primary.tags.includes('energy')&&booster.id==='hellpod')add('info','Ammunition trade-off','Your heat-based primary is less dependent on ammo refills; the booster still helps grenades, stims, your sidearm and your squad.');
if(primary.tags.includes('explosive')&&secondary.id==='gp31')add('info','Demolition redundancy','Your primary and Grenade Pistol both cover demolition. Useful insurance, but a fast emergency sidearm might balance the kit better.');
if(support?.tags.includes('antiTank')&&(primary.c[1]>=3||strats.some(x=>x.c[1]>=4)))bonus(5,'Anti-heavy + horde clear','Your heavy-answer support weapon is paired with a reliable way to prevent lighter enemies from overwhelming it.');
if(support?.tags.includes('crowd')&&strats.some(x=>x.c[0]>=4))bonus(5,'Crowd support + heavy finisher','Sustained clearing is backed by a dedicated response to heavily armored threats.');
if(backpack?.id==='supplyPack'&&support&&!support.packRequired)bonus(7,'Supply Pack × support weapon','Your support gun can draw from a dedicated sustain source without a competing ammo backpack.');
if(state.party==='solo'&&backpack?.tags.includes('shield'))bonus(5,'Solo safety net','Personal shielding makes mistakes more survivable when no squadmate can rescue you.');
if(state.mission==='defense'&&strats.some(x=>x.tags.includes('sentry')))bonus(5,'Hold-the-line placement','Automated defense strengthens a position-based mission and frees you to cover another lane.');
if(state.mission==='blitz'&&(armor.weight==='Light'||backpack?.tags.includes('mobile')||booster.tags.includes('mobility')))bonus(5,'Blitz mobility','Your kit has mobility support for covering objectives within a short mission timer.');
if(state.mission==='stealth'&&(armor.tags.includes('stealth')||booster.tags.includes('stealth')||booster.tags.includes('recon')))bonus(5,'Recon doctrine','Awareness and lower contact fit deliberate objective routing.');
if(state.front==='bugs'&&has(all,'fire'))bonus(4,'Fire against Terminid swarms','Incendiary damage supplies useful pressure when light enemies stack around breaches.');
if(state.front==='bots'&&has(all,'precision'))bonus(4,'Weak-point discipline','Precision fire helps answer medium armored Automatons and exposed weak points.');
if(state.front==='squids'&&has(all,'control'))bonus(4,'Crowd disruption','Control effects help manage fast and mixed Illuminate encounters.');
const breaches=primary.c[3]+secondary.c[3]+grenade.c[3]+strats.reduce((t,x)=>t+x.c[3],0);
if(breaches<4){penalty+=7;add('warn','Spawner / structure gap','You have limited destruction utility for nests, fabricators and other objectives. Try Grenade Pistol, an explosive throwable, or Eagle Airstrike.');}
if(metrics[0]<46){penalty+=9;add('warn','No dependable heavy answer','This kit struggles against heavily armored units. Prefer Recoilless Rifle, Quasar Cannon, Commando, or a dedicated high-impact strike.');}
if(metrics[1]<48){penalty+=7;add('warn','Swarm coverage is thin','Few reliable options handle sustained light-enemy pressure. Consider a crowd-focused primary, Gatling Sentry, Orbital Gatling Barrage, or an incendiary strike.');}
if(metrics[2]<50){penalty+=6;add('warn','Medium targets are a liability','Medium-armored enemies can demand too much of your cooldowns. Consider an armor-penetrating primary, Autocannon, Anti-Materiel Rifle or an appropriate sentry.');}
if(metrics[4]<43){penalty+=5;add('warn','Limited defensive margin','Low protection can punish close engagements. A defensive booster, shield, heavier armor, or survival passive could help.');}
if(metrics[5]<44){penalty+=5;add('warn','Long-fight endurance risk','You may lack repeatable damage or refills. Ammo-efficient weapons, a supply backpack, or Hellpod Space Optimization can compensate.');}
const bombard=strats.filter(x=>x.tags.includes('barrage'));if(bombard.length>1){penalty+=4;add('warn','Competing large-area barrages','Two large bombardments consume stratagem slots while increasing placement and friendly-fire risks.');}
const risky=strats.filter(x=>x.tags.includes('aoe')||x.tags.includes('barrage'));if(state.party==='squad'&&risky.length>=3)add('warn','Friendly-fire coordination','Three or more area-effect call-ins require careful spacing, timing, and squad communication.');
if(support?.packRequired)add('info','Ammo backpack accounted for',sandboxBuild?'A backpack-fed support weapon appears in this sandbox build. Its ammo pack still occupies the same equipment slot in normal play.':support.name+' reserves your backpack equipment slot; a separate backpack would conflict.');
if(state.front==='bots'&&grenade.id==='stun'&&strats.some(x=>x.tags.includes('antiTank')))add('good','Bot heavy-control chain','Stuns can buy crucial time to align anti-heavy shots and protect the team during reloads.');
if(state.front==='bugs'&&grenade.id==='thermite'&&support?.tags.includes('antiTank'))add('info','Two anti-heavy tools','Thermite provides a backup heavy answer; use your other slots for breach and medium-enemy handling rather than stacking more single-target damage.');
const weights=frontFactors.map((f,i)=>f*missionFactors[i]*(i===0&&state.difficulty>=8?1.09:1));const covered=metrics.reduce((a,m,i)=>a+m*weights[i],0)/weights.reduce((a,b)=>a+b,0);
const gradeScore=clamp(Math.round(covered*.77+20+Math.min(16,synergy)-penalty),0,100);
const critical=[0,1,2,3].filter(i=>metrics[i]<48);if(!critical.length)add('good','Core mission coverage is present','Your combined weapons and stratagems answer heavy armor, crowds, medium targets and objective destruction.');
if(!bonuses.length)add('info','Look for a stronger interaction','This build may cover roles, but currently has no standout armor × weapon or control × follow-up combo.');
insights.unshift(...bonuses);if(sandboxBuild)insights.unshift({type:'warn',title:nonDeployable?'INVALID STRATAGEM COMBINATION':'CHAOS // PLANNER GUARDRAILS OVERRIDDEN',body:invalidReasons.join('. ')+'. Unique stratagems and the one-per-vehicle-class limit are mandatory in every mode. Multiple support/backpack call-ins may not all be carried simultaneously. Treat this score as an experimental planning estimate.'});if(insights.length===0)add('info','Well-rounded build','The equipment fills several tactical roles without a pronounced conflict.');
const status=nonDeployable?'INVALID LOADOUT':sandboxBuild?'CHAOS // UNCONVENTIONAL':gradeScore>=85?'EXCELLENT SYNERGY':gradeScore>=70?'COHERENT LOADOUT':gradeScore>=55?'HAS GAPS':'REQUIRES REWORK';
analyzed={score:gradeScore,metrics,insights,synergy,penalty,status,sandboxBuild,nonDeployable};$('#scoreRing').style.setProperty('--percent',gradeScore);$('#scoreNum').innerHTML=gradeScore+'<small>/100</small>';$('#scoreTitle').textContent=status;$('#scoreSubtitle').textContent=state.difficulty+' / 10 threat · '+fronts.find(x=>x[0]===state.front)[1]+' · '+(state.party==='solo'?'Solo':'Squad')+' play';$('#status').textContent=sandboxBuild?'EXPERIMENTAL ASSESSMENT':'ASSESSMENT COMPLETE';$('#grade').textContent=`+${Math.min(16,synergy)} INTERACTION • −${penalty} GAP PENALTY`;$('#barLabel').textContent='0–100 HEURISTIC';renderBars(metrics);
$('#insightCount').textContent=insights.length+' FINDINGS';$('#insights').innerHTML=insights.map(x=>`<div class="insight ${x.type}"><span class="mark">${x.type==='good'?'✓':x.type==='warn'?'!':'✦'}</span><div><strong>${x.title}</strong><p>${x.body}</p></div></div>`).join('');toast('Assessment complete — review your field intelligence.');}
function copyBuild(){const all=['armor','primary','secondary','throwable','booster'].map(k=>labels[k]+': '+(byId[state[k]]?.name||'Unassigned'));const data=['HELLDIVER // SYNERGY LAB',`${fronts.find(x=>x[0]===state.front)[1]} | Difficulty ${state.difficulty} | ${state.mission} | ${state.party}`,...all,...state.strats.map((id,i)=>`Stratagem ${i+1}: ${byId[id]?.name||'Unassigned'}`)];if(analyzed)data.push(`Synergy score: ${analyzed.score}/100${analyzed.sandboxBuild?(analyzed.nonDeployable?' (INVALID STRATAGEM COMBINATION)':' (PLANNER GUARDRAILS OVERRIDDEN)'):''}`,...analyzed.insights.map(x=>`• ${x.title}: ${x.body}`));const out=data.join('\n');if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(out).then(()=>toast('Loadout report copied.')).catch(()=>manualCopy(out));}else manualCopy(out);}
function manualCopy(text){let area=document.createElement('textarea');area.value=text;area.style.position='fixed';area.style.top='-500px';document.body.appendChild(area);area.select();let ok=false;try{ok=document.execCommand('copy')}catch{}area.remove();toast(ok?'Loadout copied.':'Copy unavailable in this browser.',!ok)}
// Randomizer: draft candidates use the *same* database, slot state and conflict rules
// as manual selection. No score is published until analyze() is invoked.
const stratClasses=[...new Set(DB.strat.map(x=>x.cat))];
const gearTypes=[['primary','Primary weapons'],['secondary','Secondary weapons'],['throwable','Throwables'],['booster','Boosters']];
const lockSlots=[['armor','Body armor'],['primary','Primary weapon'],['secondary','Secondary weapon'],['throwable','Throwable'],['booster','Squad booster'],...[0,1,2,3].map(i=>['strat'+i,'Stratagem '+(i+1)])];
const lockedSlots=Object.fromEntries(lockSlots.map(([key])=>[key,false]));
let previousRoll='';
function randomInt(max){
  if(max<=0)return 0;
  if(globalThis.crypto&&typeof crypto.getRandomValues==='function'){
    const buffer=new Uint32Array(1),limit=Math.floor(4294967296/max)*max;
    do{crypto.getRandomValues(buffer)}while(buffer[0]>=limit);
    return buffer[0]%max;
  }
  return Math.floor(Math.random()*max);
}
function randPick(items){return items[randomInt(items.length)]}
function shuffleItems(items){const out=items.slice();for(let i=out.length-1;i>0;i--){const j=randomInt(i+1);[out[i],out[j]]=[out[j],out[i]]}return out}
function randomError(message){const el=$('#rollResult');el.className='roll-result error';el.textContent='RULE CONFLICT // '+message;toast(message,true)}
function initRandomizer(){
  $('#rollStratCats').innerHTML=stratClasses.map(cat=>`<label class="rule-toggle"><input class="roll-type" type="checkbox" value="${cat}" checked> ${cat}</label>`).join('');
  const passives=[...new Set(DB.armor.map(x=>x.passive))].sort();
  $('#rollArmorPassive').innerHTML='<option value="any">Any armor passive</option>'+passives.map(passive=>`<option value="${passive}">${passive}</option>`).join('');
  $('#rollEquipmentCats').innerHTML=gearTypes.map(([type,label])=>`<div class="roll-gear-pool"><div class="roll-gear-pool-title">${label}</div><div class="roll-toggles" data-gear-category="${type}">${[...new Set(DB[type].map(x=>x.cat))].map(cat=>`<label class="rule-toggle"><input type="checkbox" value="${cat}" checked> ${cat}</label>`).join('')}</div></div>`).join('');
  renderRollLocks();
}
function renderRollLocks(){
  const zone=$('#rollLocks');if(!zone)return;
  zone.innerHTML=lockSlots.map(([key,name])=>{
    const current=key.startsWith('strat')?state.strats[Number(key.slice(5))]:state[key];
    if(!current)lockedSlots[key]=false;
    const gear=current?byId[current]:null;
    return `<label class="roll-lock"><input type="checkbox" data-lock-slot="${key}" ${lockedSlots[key]?'checked':''} ${gear?'':'disabled'}><span class="roll-lock-copy"><strong>${name}</strong><small title="${gear?gear.name:'Empty slot'}">${gear?gear.name:'Empty slot'}</small></span></label>`;
  }).join('');
}
function readRollRules(){
  return {
    mode:$('#rollMode').value,
    weights:new Set([...$('#rollArmorWeights').querySelectorAll('input:checked')].map(input=>input.value)),
    armorPassive:$('#rollArmorPassive').value,
    gearCats:Object.fromEntries(gearTypes.map(([type])=>[type,new Set([...document.querySelectorAll(`[data-gear-category="${type}"] input:checked`)].map(input=>input.value))])),
    cats:new Set([...$('#rollStratCats').querySelectorAll('input:checked')].map(input=>input.value)),
    support:$('#rollSupportRule').value,
    backpack:$('#rollBackpackRule').value,
    antiHeavy:$('#rollAntiHeavy').checked,
    demolition:$('#rollDemolition').checked,
    allowUnsafe:$('#rollMode').value==='chaos'&&$('#rollUnsafe').checked,
    cursed:$('#rollMode').value==='chaos'&&$('#rollUnsafe').checked&&$('#rollCursed').checked,
    autoEvaluate:$('#rollAutoEvaluate').checked
  };
}
function fixedSlots(){
  const draft={};
  for(const [key] of lockSlots){
    if(!lockedSlots[key])continue;
    const id=key.startsWith('strat')?state.strats[Number(key.slice(5))]:state[key];
    if(id)draft[key]=id;
  }
  return draft;
}
function rulesCheck(rules,fixed){
  if(!rules.weights.size)return 'Select at least one armor weight.';
  if(!rules.cats.size)return 'Allow at least one stratagem class.';
  if(Object.keys(fixed).length===9)return 'Every slot is locked. Unlock at least one slot to reroll.';
  for(const [type,label] of gearTypes){
    if(!rules.gearCats[type].size)return `Allow at least one ${label.toLowerCase()} category.`;
    if(fixed[type]&&!rules.gearCats[type].has(byId[fixed[type]].cat))return `Locked ${label.toLowerCase()} item is excluded by your equipment category rules.`;
  }
  if(fixed.armor&&!rules.weights.has(byId[fixed.armor].weight))return 'Locked armor is excluded by your armor-weight rule.';
  if(fixed.armor&&rules.armorPassive!=='any'&&byId[fixed.armor].passive!==rules.armorPassive)return 'Locked armor has a different passive than the one required.';
  if(!DB.armor.some(x=>rules.weights.has(x.weight)&&(rules.armorPassive==='any'||x.passive===rules.armorPassive)))return 'No armor matches the selected weight and passive. Broaden one of those rules.';
  if(rules.support==='required'&&!rules.cats.has('Support weapon'))return 'Support weapons are required but that stratagem class is disabled.';
  if(rules.backpack==='required'&&!rules.cats.has('Backpack'))return 'Backpacks are required but that stratagem class is disabled.';
  const fixedStrats=Array.from({length:4},(_,i)=>fixed['strat'+i]||null).filter(Boolean).map(id=>byId[id]);
  for(let i=0;i<fixedStrats.length;i++){
    const obj=fixedStrats[i];
    if(!rules.cats.has(obj.cat))return 'A locked '+obj.name+' is in a disabled stratagem category.';
    if(rules.support==='none'&&obj.cat==='Support weapon')return 'A locked support weapon conflicts with your support weapon exclusion.';
    if(rules.backpack==='none'&&obj.cat==='Backpack')return 'A locked backpack conflicts with your backpack exclusion.';
    if(fixedStrats.some((other,j)=>j!==i&&other.id===obj.id))return 'Two locked slots contain the same stratagem. Unlock or change one: duplicates are never allowed.';
    if(sameVehicleClass(obj,fixedStrats.filter((_,j)=>j!==i)))return 'Locked slots contain two '+vehicleClassLabels[vehicleClassOf(obj)]+' stratagems. Unlock or change one: only one per vehicle class is allowed.';
    if(!rules.allowUnsafe&&stratConflictIn(obj,fixedStrats.filter((_,j)=>j!==i)))return 'Locked stratagem slots contain incompatible selections.';
  }
  const fixedSupport=fixedStrats.some(x=>x.cat==='Support weapon');
  const fixedBackpack=fixedStrats.some(x=>x.cat==='Backpack');
  const free=4-fixedStrats.length;
  const required=(rules.support==='required'&&!fixedSupport?1:0)+(rules.backpack==='required'&&!fixedBackpack?1:0);
  if(required>free)return 'Not enough unlocked stratagem slots to satisfy mandatory support and backpack rules.';
  if(DB.strat.filter(x=>rules.cats.has(x.cat)&&(rules.support!=='none'||x.cat!=='Support weapon')&&(rules.backpack!=='none'||x.cat!=='Backpack')).length<4)return 'Not enough eligible stratagems remain for four distinct slots.';
  if(rules.cats.size===1&&rules.cats.has('Vehicle'))return 'A four-slot loadout cannot contain only vehicles: there is a maximum of one Mech, one FRV, and one Tank. Enable another stratagem class.';
  return '';
}
function stratConflictIn(obj,others){
  if(others.some(x=>x.id===obj.id))return 'duplicate';
  if(sameVehicleClass(obj,others))return 'multiple vehicles of one class';
  if(obj.cat==='Support weapon'&&others.some(x=>x.cat==='Support weapon'))return 'multiple supports';
  if(obj.cat==='Backpack'&&others.some(x=>x.cat==='Backpack'))return 'multiple backpacks';
  if(obj.cat==='Backpack'&&others.some(x=>x.packRequired))return 'backpack conflict';
  if(obj.packRequired&&others.some(x=>x.cat==='Backpack'))return 'ammo backpack conflict';
  return '';
}
function buildRoll(rules,fixed){
  const draft={strats:Array.from({length:4},(_,i)=>fixed['strat'+i]||null)};
  for(const key of ['armor','primary','secondary','throwable','booster']){
    const items=key==='armor'?DB.armor.filter(x=>rules.weights.has(x.weight)&&(rules.armorPassive==='any'||x.passive===rules.armorPassive)):DB[key].filter(x=>rules.gearCats[key].has(x.cat));
    if(!items.length)return null;
    draft[key]=fixed[key]||randPick(items).id;
  }
  const pool=DB.strat.filter(x=>rules.cats.has(x.cat)&&(rules.support!=='none'||x.cat!=='Support weapon')&&(rules.backpack!=='none'||x.cat!=='Backpack'));
  // Never select the same stratagem twice, including in Complete Chaos.
  // The Chaos override may bypass support/backpack rules but NEVER duplicate
  // stratagem IDs or a vehicle class (Mech, FRV, Tank).
  const compatible=x=>{
    const current=draft.strats.filter(Boolean).map(id=>byId[id]);
    return !draft.strats.includes(x.id)&&!sameVehicleClass(x,current)
      &&(rules.allowUnsafe||!stratConflictIn(x,current));
  };
  const insertFrom=category=>{
    const free=draft.strats.map((id,i)=>id===null?i:-1).filter(i=>i>=0);
    const choices=pool.filter(x=>x.cat===category&&compatible(x));
    if(!free.length||!choices.length)return false;
    draft.strats[randPick(free)]=randPick(choices).id;
    return true;
  };
  // Backpack first avoids selecting an ammo-pack-fed support gun when a
  // *separate* backpack is explicitly required.
  if(rules.backpack==='required'&&!draft.strats.some(id=>byId[id]?.cat==='Backpack')&&!insertFrom('Backpack'))return null;
  if(rules.support==='required'&&!draft.strats.some(id=>byId[id]?.cat==='Support weapon')&&!insertFrom('Support weapon'))return null;
  // A strictly positive share of Chaos rolls (the WILD DRAW pattern) samples
  // the entire allowed catalog independently, so NO eligible item gets excluded.
  // Other patterns deliberately create truly absurd loadouts when opted in.
  const pattern=rules.cursed?randPick(['WILD DRAW','WILD DRAW','WILD DRAW','WILD DRAW',
    'CLASS TAKEOVER','CLASS TAKEOVER','CLASS TAKEOVER',
    'SUPPORT INVASION','BACKPACK PILEUP','VEHICLE PARADE']):'WILD DRAW';
  let themedPool=pool;
  if(pattern==='CLASS TAKEOVER'){
    const cls=randPick([...new Set(pool.map(x=>x.cat))]);
    themedPool=pool.filter(x=>x.cat===cls);
  } else if(pattern==='SUPPORT INVASION'||pattern==='BACKPACK PILEUP'||pattern==='VEHICLE PARADE'){
    const cls={'SUPPORT INVASION':'Support weapon','BACKPACK PILEUP':'Backpack','VEHICLE PARADE':'Vehicle'}[pattern];
    if(pool.some(x=>x.cat===cls))themedPool=pool.filter(x=>x.cat===cls);
  }
  const empty=shuffleItems(draft.strats.map((id,i)=>id===null?i:-1).filter(i=>i>=0));
  let patternUsed=false;
  for(const i of empty){
    const special=themedPool.filter(compatible);
    const choices=special.length?special:pool.filter(compatible);
    if(!choices.length)return null;
    if(special.length&&themedPool!==pool)patternUsed=true;
    draft.strats[i]=randPick(choices).id;
  }
  draft.rollPattern=patternUsed?pattern:'WILD DRAW';
  return draft;
}
function allRollItems(draft){return [...['armor','primary','secondary','throwable','booster'].map(k=>byId[draft[k]]),...draft.strats.map(id=>byId[id])];}
function rollCoverageValid(draft,rules){
  if(!draft)return false;
  const all=allRollItems(draft);
  if(rules.antiHeavy&&!all.some(x=>x.tags.includes('antiTank')||(x.c[0]>=4&&(x.cat==='Orbital'||x.cat==='Eagle'||x.cat==='Support weapon'))))return false;
  if(rules.demolition&&!all.some(x=>x.tags.includes('demolition')||x.c[3]>=3))return false;
  return true;
}
function rollRank(draft,mode){
  const all=allRollItems(draft),sums=Array.from({length:6},(_,i)=>all.reduce((s,x)=>s+x.c[i],0));
  const front={bugs:[1.08,1.4,.89,.95,1,1.01],bots:[1.45,.81,1.4,1.15,1.35,1],squids:[1.1,1.22,1.22,1.13,1.12,1],mixed:[1.2,1.2,1.2,1.2,1.1,1.08]}[state.front];
  const mission={general:[1,1,1,1,1,1],blitz:[1,1,1,1.42,.87,1.05],defense:[1.17,1.4,1.15,.84,1.2,.99],objectives:[1.15,.96,1.15,1.38,1,1],stealth:[.91,.89,.9,1.19,1.05,1.12]}[state.mission];
  const diff=state.difficulty>=9?1.28:state.difficulty>=7?1.16:state.difficulty>=5?1.04:.91;
  const bases=[12,14,12,10,10,11];
  const coverage=sums.map((n,i)=>Math.min(100,100*(1-Math.exp(-n/(bases[i]*front[i]*mission[i]*diff)*1.85))));
  const weight=coverage.map((_,i)=>mode==='mission'?front[i]*mission[i]:1);
  const weighted=coverage.reduce((n,v,i)=>n+v*weight[i],0)/weight.reduce((a,b)=>a+b,0);
  const core=Math.min(...coverage.slice(0,4)),max=Math.max(...coverage.slice(0,4));
  const armor=byId[draft.armor],primary=byId[draft.primary],grenade=byId[draft.throwable],booster=byId[draft.booster];
  const strats=draft.strats.map(id=>byId[id]),support=strats.find(x=>x.cat==='Support weapon'),backpack=strats.find(x=>x.cat==='Backpack');
  const match=t=>all.some(x=>x.tags.includes(t));
  let interaction=0;
  if(armor.tags.includes('engineering')&&grenade.tags.some(t=>['antiTank','stun','demolition','fire','gas'].includes(t)))interaction+=6;
  if(armor.tags.includes('medkit')&&booster.id==='infusion')interaction+=8;
  if(armor.tags.includes('stealth')&&(primary.tags.includes('precision')||state.mission==='stealth'))interaction+=5;
  if(grenade.tags.includes('stun')&&strats.some(x=>x.tags.includes('precisionStrike')||x.id==='eagle500'))interaction+=8;
  if(backpack?.id==='supplyPack'&&support&&!support.packRequired)interaction+=6;
  if(primary.tags.includes('close')&&(backpack?.tags.includes('shield')||backpack?.tags.includes('drone')))interaction+=6;
  if(state.mission==='defense'&&match('sentry'))interaction+=5;
  if(state.mission==='blitz'&&(armor.weight==='Light'||match('mobility')))interaction+=5;
  if(state.front==='bugs'&&match('fire'))interaction+=4;
  if(state.front==='bots'&&match('precision'))interaction+=4;
  if(state.front==='squids'&&match('control'))interaction+=4;
  const largeBarrageCount=strats.filter(x=>x.tags.includes('barrage')).length;
  return weighted*.65+core*.20+coverage[4]*.08+coverage[5]*.07+interaction*.75-(max-core)*.045-Math.max(0,largeBarrageCount-1)*5;
}
function generateRandomLoadout(){
  const rules=readRollRules(),fixed=fixedSlots(),problem=rulesCheck(rules,fixed);
  if(problem){randomError(problem);return}
  const trials=rules.mode==='chaos'?220:rules.mode==='balanced'?140:220;
  const candidates=[];
  for(let n=0;n<trials;n++){
    const draft=buildRoll(rules,fixed);
    if(!rollCoverageValid(draft,rules))continue;
    const sig=[draft.armor,draft.primary,draft.secondary,draft.throwable,draft.booster,...draft.strats].join('|');
    if(sig===previousRoll)continue;
    if(rules.mode==='chaos'){candidates.push({draft,sig});break}
    candidates.push({draft,sig,rank:rollRank(draft,rules.mode)});
  }
  if(!candidates.length){randomError('No valid roll found with these settings. Try unlocking a slot, enabling another stratagem class, or relaxing coverage requirements.');return}
  let chosen;
  if(rules.mode==='chaos')chosen=candidates[0];
  else{
    candidates.sort((a,b)=>b.rank-a.rank);
    const top=Math.max(1,Math.min(rules.mode==='mission'?7:12,Math.ceil(candidates.length*(rules.mode==='mission'?.08:.17))));
    chosen=candidates[randomInt(top)];
  }
  for(const key of ['armor','primary','secondary','throwable','booster'])state[key]=chosen.draft[key];
  state.strats=chosen.draft.strats.slice();
  previousRoll=chosen.sig;
  invalidate();
  renderRollLocks();
  const nLocked=Object.keys(fixed).length;
  const modeName={chaos:'COMPLETE CHAOS',balanced:'TACTICAL BLEND',mission:'MISSION-TUNED'}[rules.mode];
  const status=$('#rollResult');status.className='roll-result success';
  const sandbox=rules.allowUnsafe?' · SANDBOX RULES ON':'';
  const stunt=rules.mode==='chaos'?' · '+chosen.draft.rollPattern+sandbox:'';
  status.innerHTML=`ROLL COMPLETE // ${modeName}${stunt} · 9/9 slots filled · ${nLocked} item${nLocked===1?'':'s'} kept. <a href="#loadout">Review gear ↑</a> or press Evaluate Synergy for the full tactical report.`;
  if(rules.autoEvaluate)analyze();
  else{
    $('#scoreTitle').textContent='Randomized kit ready.';
    $('#scoreSubtitle').textContent='Review the roll or press Evaluate Synergy to see its tactical strengths and weaknesses.';
    $('#status').textContent='RANDOM KIT READY';
    toast('Random loadout generated — ready to evaluate.');
  }
}
function resetRandomizerRules(){
  $('#rollMode').value='balanced';
  $('#rollUnsafe').checked=true;$('#rollCursed').checked=true;
  antiHeavyModified=false;syncChaosOptions();
  $('#rollArmorWeights').querySelectorAll('input').forEach(x=>x.checked=true);
  $('#rollArmorPassive').value='any';
  $('#rollEquipmentCats').querySelectorAll('input').forEach(x=>x.checked=true);
  $('#rollStratCats').querySelectorAll('input').forEach(x=>x.checked=true);
  $('#rollSupportRule').value='optional';$('#rollBackpackRule').value='optional';
  $('#rollAntiHeavy').checked=true;$('#rollDemolition').checked=false;$('#rollAutoEvaluate').checked=false;
  for(const [key] of lockSlots)lockedSlots[key]=false;
  previousRoll='';renderRollLocks();
  const result=$('#rollResult');result.className='roll-result';result.textContent='READY TO ROLL // Choose rules, then generate. No equipment changes until you press Generate.';
}
initRandomizer();
let antiHeavyModified=false;
function syncChaosOptions(){
  const chaos=$('#rollMode').value==='chaos',unsafe=$('#rollUnsafe').checked;
  $('#rollChaosOptions').hidden=!chaos;
  $('#rollCursed').disabled=!chaos||!unsafe;
  $('#rollBackpackRule').querySelector('option[value="optional"]').textContent=chaos&&unsafe?'Optional (even if packs compete)':'Allowed if compatible';
}
$('#rollMode').addEventListener('change',()=>{
  if(!antiHeavyModified)$('#rollAntiHeavy').checked=$('#rollMode').value!=='chaos';
  syncChaosOptions();
});
$('#rollAntiHeavy').addEventListener('change',()=>{antiHeavyModified=true});
$('#rollUnsafe').addEventListener('change',syncChaosOptions);
syncChaosOptions();
$('#rollGenerate').addEventListener('click',generateRandomLoadout);
$('#rollResetRules').addEventListener('click',resetRandomizerRules);
$('#rollLocks').addEventListener('change',e=>{if(e.target.matches('[data-lock-slot]'))lockedSlots[e.target.dataset.lockSlot]=e.target.checked});

$('#factions').addEventListener('click',e=>{const b=e.target.closest('[data-front]');if(!b)return;state.front=b.dataset.front;renderFronts();invalidate();});['#mission','#party'].forEach(sel=>$(sel).addEventListener('change',updateParams));$('#difficulty').addEventListener('input',updateParams);
document.addEventListener('click',e=>{const slot=e.target.closest('.slot[data-type]');if(slot)openPicker(slot.dataset.type,Number(slot.dataset.idx));const t=e.target.closest('[data-template]');if(t)applyTemplate(t.dataset.template);});
$('#evaluateBtn').addEventListener('click',analyze);$('#copyBtn').addEventListener('click',copyBuild);$('#resetBtn').addEventListener('click',()=>{Object.assign(state,{front:'bugs',mission:'general',party:'squad',difficulty:7,armor:null,primary:null,secondary:null,throwable:null,booster:null,strats:[null,null,null,null]});$('#mission').value='general';$('#party').value='squad';$('#difficulty').value='7';$('#diffVal').textContent='7';$('#diffName').textContent='— SUICIDE MISSION';renderFronts();resetRandomizerRules();invalidate();toast('Build cleared.');});
$('#closeModal').addEventListener('click',closePicker);$('#modal').addEventListener('mousedown',e=>{if(e.target===$('#modal'))closePicker()});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&pickerTarget)closePicker()});$('#search').addEventListener('input',e=>{pickerQuery=e.target.value.trim().toLowerCase();renderPicker()});$('#filters').addEventListener('click',e=>{const b=e.target.closest('[data-filter]');if(b){pickerFilter=b.dataset.filter;renderPicker()}});$('#pickerList').addEventListener('click',e=>{const clear=e.target.closest('[data-clear]');if(clear){const {type,idx}=pickerTarget;if(type==='strat')state.strats[idx]=null;else state[type]=null;closePicker();invalidate();return}const b=e.target.closest('[data-pick]');if(b)choose(b.dataset.pick)});
$('#catalogCount').textContent=Object.values(DB).reduce((n,list)=>n+list.length,0)+' ITEMS';renderFronts();renderSlots();renderBars([0,0,0,0,0,0]);
})();
