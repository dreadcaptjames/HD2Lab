/*
 * HELL DIVER // SYNERGY LAB
 * Scope of Authority Premium Warbond — 2026-10-20
 * Official equipment reference:
 * https://blog.playstation.com/2026/10/13/helldivers-2-scope-of-authority-premium-warbond-launches-oct-20/
 *
 * Load this script AFTER data.js and BEFORE app.js. It extends the live
 * window.HD2_DB used by the picker, randomizer, and synergy engine.
 */
(()=>{'use strict';
  if (!window.HD2_DB) {
    console.error('[HD2Lab / Scope of Authority] Load data.js BEFORE warbond-scope-of-authority.js');
    return;
  }
  const origin='Scope of Authority Premium Warbond / PlayStation Blog, 2026-10-13';
  const entries={
    armor:[
      {id:'armor-ss33mimeticmarshal',name:'SS-33 Mimetic Marshal',cat:'Light',weight:'Light',passive:'Stationary Shroud',desc:'Stationary Shroud • Reduces weapon sway and enemy detection range while crouched or prone.',c:[0,0,0,0,1,0],tags:['stealth','precision','stationary','mobile','scopeOfAuthority']},
      {id:'armor-ss15focalpoint',name:'SS-15 Focal Point',cat:'Medium',weight:'Medium',passive:'Stationary Shroud',desc:'Stationary Shroud • Reduces weapon sway and enemy detection range while crouched or prone.',c:[0,0,0,0,2,0],tags:['stealth','precision','stationary','scopeOfAuthority']}
    ],
    primary:[
      {id:'primary-r40sightliner',name:'R-40 Sightliner',cat:'Marksman rifle',desc:'Bolt-action long-range sniper rifle with armor-piercing precision rounds.',c:[1,0,4,0,0,1],tags:['precision','ballistic','mediumPen','slow','stationary','scopeOfAuthority']}
    ],
    secondary:[
      {id:'secondary-p44mist',name:'P-44 Mist',cat:'Pistol',desc:'One-handed machine pistol for fast defensive fire at close range.',c:[0,3,1,0,0,2],tags:['ballistic','fast','close','scopeOfAuthority']}
    ],
    throwable:[
      {id:'throwable-g11caltrops',name:'G-11 Caltrops',cat:'Control',desc:'A wide field of proximity-detonated submunitions that slow and stun enemies.',c:[0,3,1,0,1,1],tags:['stun','control','trap','crowd','scopeOfAuthority']}
    ],
    strat:[
      {id:'strat-amw20apex',name:'AMW-20 Apex',cat:'Support weapon',desc:'Backpack-fed heavy anti-materiel rifle with armor penetration and assisted reload.',c:[5,0,5,0,0,1],tags:['antiTank','precision','mediumPen','stationary','ballistic','scopeOfAuthority'],packRequired:true},
      {id:'strat-las44nova',name:'LAS-44 Nova',cat:'Support weapon',desc:'Charge-to-fire precision energy rifle; non-explosive thermal projectile with heat-based ammo and improved cooling.',c:[3,0,4,0,0,3],tags:['energy','precision','mediumPen','slow','scopeOfAuthority']}
    ]
  };
  let inserted=0;
  for (const [category,items] of Object.entries(entries)) {
    if(!Array.isArray(window.HD2_DB[category])) {
      console.error(`[HD2Lab / Scope of Authority] Unknown category: ${category}`);
      continue;
    }
    const group=window.HD2_DB[category];
    const ids=new Set(group.map(item=>item.id));
    for (const item of items) {
      if (ids.has(item.id)) continue;
      const entry={...item,source:origin,estimate:true};
      group.push(entry);ids.add(entry.id);inserted++;
    }
    group.sort((a,b)=>(a.name||'').localeCompare(b.name||'',undefined,{numeric:true,sensitivity:'base'}));
  }
  const counts=Object.fromEntries(Object.entries(window.HD2_DB).map(([key,items])=>[key,items.length]));
  if(window.HD2_CATALOG){
    window.HD2_CATALOG.version='6.1';
    window.HD2_CATALOG.audited='2026-10-20';
    window.HD2_CATALOG.counts=counts;
    window.HD2_CATALOG.warbonds=[...(window.HD2_CATALOG.warbonds||[]).filter(x=>x.name!=='Scope of Authority'),{name:'Scope of Authority',released:'2026-10-20',newEquipment:7}];
  }
  window.HD2_SCOPE_OF_AUTHORITY={items:entries,inserted,counts,total:Object.values(counts).reduce((a,b)=>a+b,0)};
  // Visible confirmation in the actual app (not merely in the catalog file).
  const showConfirmation=()=>{
    const strip=document.querySelector('.command-strip');
    if(!strip||document.getElementById('scopeWarbondBadge'))return;
    const badge=document.createElement('div');
    badge.id='scopeWarbondBadge';
    badge.className='intel-card';
    badge.setAttribute('aria-label','Scope of Authority Warbond loaded');
    badge.style.cssText='border:1px solid rgba(250,203,71,.45);background:linear-gradient(115deg,rgba(59,47,22,.98),rgba(20,29,38,.98))';
    badge.innerHTML='<span class="intel-symbol" aria-hidden="true">⌖</span><div><small>NEW WARBOND / OCT 20</small><strong>SCOPE OF AUTHORITY</strong><span class="intel-sub">7 new loadout items · search “scope” in gear pickers</span></div>';
    strip.appendChild(badge);
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',showConfirmation,{once:true});
  else showConfirmation();
  console.info('[HD2Lab] Scope of Authority ready:',inserted,'new entries;',window.HD2_SCOPE_OF_AUTHORITY.total,'total catalog entries');
})();
