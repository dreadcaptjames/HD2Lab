/* HELLDIVER // SYNERGY LAB — deterministic, fully-offline PDF dossier exporter.
   Each page is drawn before JPEG/PDF serialization. No popups, remote services,
   libraries, print dialogs or fragile print-window timing are required. */
(() => {
  'use strict';
  const W=1240,H=1754,S=2;
  const C={bg:'#0b121b',bg2:'#121e2b',panel:'#172534',panel2:'#1c2d3e',line:'#35495b',gold:'#f8ce56',gold2:'#ffe7a0',white:'#f8fafb',text:'#dce4e9',muted:'#a4b4c1',soft:'#72889b',green:'#8bd6a7',orange:'#f5a37f',red:'#ff9d8c',blue:'#75cddd'};
  const enc=new TextEncoder();
  const txt=(v)=>String(v==null?'':v);
  const safe=(v)=>txt(v).replace(/[\x00-\x1f]/g,' ').trim();
  function canvas(){const el=document.createElement('canvas');el.width=W*S;el.height=H*S;const g=el.getContext('2d',{alpha:false});g.scale(S,S);return {el,g};}
  function rr(g,x,y,w,h,r=14){g.beginPath();g.roundRect(x,y,w,h,r);}
  function rect(g,x,y,w,h,color,r=0,stroke=null){g.fillStyle=color;rr(g,x,y,w,h,r);g.fill();if(stroke){g.strokeStyle=stroke;g.lineWidth=1.5;g.stroke();}}
  function line(g,x1,y1,x2,y2,color=C.line,width=1){g.beginPath();g.strokeStyle=color;g.lineWidth=width;g.moveTo(x1,y1);g.lineTo(x2,y2);g.stroke();}
  function text(g,s,x,y,size=20,color=C.white,bold=false,align='left',letter=0){g.font=`${bold?800:500} ${size}px "Arial", "DejaVu Sans", sans-serif`;g.fillStyle=color;g.textAlign=align;g.textBaseline='alphabetic';if(!letter){g.fillText(txt(s),x,y);return;}const words=[...txt(s)];const widths=words.map(ch=>g.measureText(ch).width);const width=widths.reduce((a,b)=>a+b,0)+(words.length-1)*letter;let xx=align==='right'?x-width:align==='center'?x-width/2:x;for(let i=0;i<words.length;i++){g.fillText(words[i],xx,y);xx+=widths[i]+letter;}}
  function fit(g,s,maxW,size=23,min=16){for(let z=size;z>=min;z--){g.font=`800 ${z}px Arial, sans-serif`;if(g.measureText(txt(s)).width<=maxW)return z;}return min;}
  function wrap(g,s,maxW,size=19,bold=false){g.font=`${bold?800:500} ${size}px Arial, sans-serif`;const out=[];for(const para of txt(s).split('\n')){const words=para.split(/\s+/).filter(Boolean);let row='';for(const word of words){let test=row?row+' '+word:word;if(g.measureText(test).width>maxW&&row){out.push(row);row=word;}else{row=test;}}if(row)out.push(row);else if(!words.length)out.push('');}return out;}
  function wrapped(g,s,x,y,maxW,size=19,color=C.muted,leading=28,maxLines=99){const lines=wrap(g,s,maxW,size);let n=0;for(const row of lines.slice(0,maxLines)){text(g,row,x,y+n*leading,size,color);n++;}return y+n*leading;}
  function badge(g,label,x,y,color=C.gold,back='#30402f'){const w=Math.max(82,txt(label).length*11+26);rect(g,x,y,w,33,back,8);text(g,label,x+13,y+22,14,color,true);return w;}
  function base(g,page,total){
    const bg=g.createLinearGradient(0,0,W,H);bg.addColorStop(0,C.bg2);bg.addColorStop(0.55,C.bg);bg.addColorStop(1,'#071019');g.fillStyle=bg;g.fillRect(0,0,W,H);
    g.strokeStyle='rgba(172,198,220,.045)';g.lineWidth=1;for(let x=48;x<W;x+=47){line(g,x,0,x,H,'rgba(172,198,220,.04)');}for(let y=0;y<H;y+=47){line(g,0,y,W,y,'rgba(172,198,220,.035)');}
    rect(g,0,0,W,9,C.gold,0);rect(g,55,45,12,46,C.gold);line(g,72,91,365,91,C.gold,2);
    line(g,56,H-90,W-56,H-90,C.line,1.5);
    text(g,'SEAF // UNOFFICIAL LOADOUT INTELLIGENCE',62,H-56,15,C.soft,true, 'left',1.3);
    text(g,`${String(page).padStart(2,'0')} / ${String(total).padStart(2,'0')}`,W-62,H-56,17,C.gold,true,'right');
  }
  function section(g,n,title,y,aside=''){text(g,n,64,y,17,C.gold,true,'left',2.4);text(g,title,121,y+1,31,C.white,true);if(aside)text(g,aside,W-66,y,16,C.soft,true,'right');line(g,65,y+20,W-65,y+20,C.line,1);}
  function drawSymbol(g,type,x,y,size=44){
    // Clear, high-contrast APP-6-inspired operational glyphs, drawn as Canvas paths.
    g.save();g.translate(x,y);g.strokeStyle=C.gold;g.fillStyle=C.gold;g.lineWidth=3.2;g.lineCap='round';g.lineJoin='round';
    const s=size/48;g.scale(s,s);
    const L=(...p)=>{g.beginPath();g.moveTo(p[0],p[1]);for(let i=2;i<p.length;i+=2)g.lineTo(p[i],p[i+1]);g.stroke();};
    const B=(x,y,w,h)=>g.strokeRect(x,y,w,h);
    const circle=(x,y,r)=>{g.beginPath();g.arc(x,y,r,0,Math.PI*2);g.stroke();};
    const map={armor:()=>{L(8,8,17,5,24,14,31,5,40,8,42,19,38,25,38,42,10,42,10,25,6,19,8,8);L(15,24,33,24);},rifle:()=>{L(4,18,34,18,42,26,34,30,19,30,13,41,5,41,11,28,4,28,4,18);L(22,18,22,11,33,11);},pistol:()=>{L(6,15,41,15,41,28,23,28,20,44,9,44,11,28,6,28,6,15);},grenade:()=>{g.beginPath();g.roundRect(13,14,22,30,7);g.stroke();L(24,14,24,5,37,5);L(16,23,32,23);},boost:()=>{L(24,2,29,19,46,24,29,29,24,46,19,29,2,24,19,19,24,2);},orbital:()=>{circle(24,24,16);circle(24,24,6);L(24,1,24,10);L(24,38,24,47);L(1,24,10,24);L(38,24,47,24);},eagle:()=>{L(4,31,16,18,24,24,32,18,44,31,32,29,24,39,16,29,4,31);L(24,28,24,46);},vehicle:()=>{B(14,4,20,40);B(4,10,10,28);B(34,10,10,28);circle(24,24,6);},pack:()=>{B(13,5,22,38);B(6,11,7,25);B(35,11,7,25);circle(24,24,7);},sentry:()=>{B(9,15,30,10);L(24,15,24,5,42,5);L(15,25,8,45);L(33,25,40,45);},rocket:()=>{L(7,41,18,17,34,7,41,14,30,31,7,41);L(18,17,30,31);},shield:()=>{L(24,4,41,11,38,30,24,44,10,30,7,11,24,4);},laser:()=>{L(28,2,10,26,24,26,20,46,39,18,25,18,28,2);},drone:()=>{B(14,20,20,13);circle(7,10,7);circle(41,10,7);L(14,22,9,15);L(34,22,39,15);},radar:()=>{circle(24,24,21);circle(24,24,12);L(24,24,38,11);},flame:()=>{L(25,3,18,20,12,26,12,36,18,44,31,44,37,35,31,24,28,32,24,34,25,3);},precision:()=>{circle(24,24,16);circle(24,24,5);L(24,1,24,10);L(24,38,24,47);L(1,24,10,24);L(38,24,47,24);},plasma:()=>{circle(24,24,10);L(24,1,24,10);L(24,38,24,47);L(1,24,10,24);L(38,24,47,24);},shotgun:()=>{L(4,20,39,20,44,25,39,30,18,30,12,43,5,43,11,30,4,30,4,20);},smg:()=>{L(4,18,39,18,44,26,33,30,17,30,12,41,5,41,9,30,4,30,4,18);},melee:()=>{L(7,44,28,23,42,5,44,7,26,28,7,44);},smoke:()=>{circle(22,28,13);circle(31,20,10);},stim:()=>{L(8,34,34,8,42,16,16,42,8,34);L(26,16,34,24);},explosive:()=>{circle(24,24,9);L(24,1,24,13);L(24,35,24,47);L(1,24,13,24);L(35,24,47,24);},logistics:()=>{B(8,16,32,26);L(16,16,16,8,32,8,32,16);L(24,23,24,35);L(18,29,30,29);}};
    (map[type]||map.shield)();g.restore();
  }
  function iconType(item,k){
    if(k==='armor')return item?.tags?.includes('medkit')?'stim':'armor';
    if(k==='primary')return item?.cat==='Shotgun'?'shotgun':item?.cat==='SMG'?'smg':item?.cat==='Melee'?'melee':'rifle';
    if(k==='secondary')return 'pistol';
    if(k==='throwable')return 'grenade';
    if(k==='booster')return 'boost';
    if(k==='strat')return item?.cat==='Vehicle'?'vehicle':item?.cat==='Backpack'?'pack':item?.cat==='Sentry'?'sentry':item?.cat==='Eagle'?'eagle':item?.cat==='Orbital'?'orbital':item?.cat==='Support weapon'?'rocket':'precision';return 'shield';
  }
  function equipCard(g,x,y,w,h,title,item,k){
    rect(g,x,y,w,h,C.panel,14,C.line);rect(g,x,y,5,h,C.gold,2);
    rect(g,x+18,y+21,63,63,'#0e1925',12,C.line);drawSymbol(g,iconType(item,k),x+28,y+30,43);
    text(g,title.toUpperCase(),x+95,y+43,15,C.soft,true,'left',1.1);
    const name=item?.name||'UNASSIGNED';text(g,name,x+95,y+77,fit(g,name,w-119,25,17),C.white,true);
    const chip=k==='armor'&&item?`${item.weight} ARMOR`:item?.cat||'OPEN SLOT';
    rect(g,x+20,y+103,Math.min(w-40,chip.length*10+24),28,'#263d4a',8);
    text(g,chip.toUpperCase(),x+31,y+122,14,C.gold2,true);
    const description=k==='armor'?item?.passive:item?.desc;
    wrapped(g,description||'No equipment selected.',x+21,y+153,w-43,18,C.muted,24,2);
  }
  function scoreRing(g,cx,cy,score){
    g.beginPath();g.arc(cx,cy,79,0,Math.PI*2);g.lineWidth=14;g.strokeStyle='#344656';g.stroke();
    if(typeof score==='number'){g.beginPath();g.arc(cx,cy,79,-Math.PI/2,-Math.PI/2+2*Math.PI*Math.min(100,Math.max(0,score))/100);g.strokeStyle=C.gold;g.stroke();}
    text(g,typeof score==='number'?score:'—',cx,cy+13,61,C.white,true,'center');text(g,'/ 100',cx,cy+43,20,C.muted,true,'center');
  }
  function header(g,d,logo){
    text(g,'SUPER EARTH // MISSION REQUISITIONS',66,147,17,C.gold,true,'left',2.0);
    text(g,'TACTICAL LOADOUT',65,213,56,C.white,true,'left',.8);
    text(g,'FIELD DOSSIER',65,265,51,C.gold,true,'left',1.0);
    if(logo){g.save();g.drawImage(logo,850,119,99,99);g.restore();}
    text(g,'SYNERGY LAB / 101ST FIELD TERMINAL',66,305,19,C.muted,true);
    scoreRing(g,1061,209,d.score);
    rect(g,64,344,W-128,136,C.panel,16,C.line);
    const fields=[['BATTLEFRONT',d.front],['THREAT LEVEL',`${d.difficulty} / 10`],['MISSION',d.mission],['FORMATION',d.party]];
    fields.forEach(([t,v],i)=>{const x=88+i*276;text(g,t,x,388,16,C.soft,true,'left',1.2);const sz=fit(g,v,240,25,17);text(g,v,x,431,sz,C.white,true);if(i<3)line(g,x+245,370,x+245,456,C.line,1.4);});
  }
  function loadoutPage(d,logo,pages){const {el,g}=canvas();base(g,1,pages);header(g,d,logo);
    section(g,'01','PERSONAL EQUIPMENT',530,'05 // REQUISITION SLOTS');
    const personal=[['BODY ARMOR',d.armor,'armor'],['PRIMARY',d.primary,'primary'],['SECONDARY',d.secondary,'secondary'],['THROWABLE',d.throwable,'throwable'],['BOOSTER',d.booster,'booster']];
    const cw=354,gap=25,x0=64,ys=[561,787];
    personal.forEach(([title,item,k],i)=>equipCard(g,x0+(i%3)*(cw+gap),ys[Math.floor(i/3)],cw,204,title,item,k));
    section(g,'02','STRATAGEM PACKAGE',1049,'04 // ACTIVE CALL-INS');
    const sW=542,sH=223;
    (d.strats||[]).forEach((item,i)=>equipCard(g,64+(i%2)*(sW+26),1080+Math.floor(i/2)*244,sW,sH,`STRATAGEM ${i+1}`,item,'strat'));
    const barY=1621;rect(g,64,barY,W-128,43,d.unconventional?'#473028':'#263642',9);text(g,d.unconventional?'EXPERIMENTAL // NONSTANDARD SUPPORT COMBINATION':`${d.filled} / 9 SLOTS ASSIGNED    •    ${d.status.toUpperCase()}`,85,barY+28,16,d.unconventional?C.orange:C.gold2,true);
    return el;}
  function chartCard(g,x,y,w,label,value){rect(g,x,y,w,103,C.panel,14,C.line);text(g,label.toUpperCase(),x+22,y+33,19,C.text,true);text(g,typeof value==='number'?String(value).padStart(2,'0'):'—',x+w-22,y+36,29,typeof value==='number'?C.gold:C.muted,true,'right');rect(g,x+22,y+67,w-44,12,'#344759',7);if(typeof value==='number'){rect(g,x+22,y+67,(w-44)*Math.max(0,Math.min(value,100))/100,12,value<46?C.red:value>79?C.green:C.blue,7);}}
  function findingHeight(g,entry){const lines=wrap(g,entry.body,966,20);return Math.max(102,67+lines.length*25);}
  function finding(g,entry,y){const h=findingHeight(g,entry),mark=entry.type==='good'?'✓':entry.type==='warn'?'!':'✦',ink=entry.type==='good'?C.green:entry.type==='warn'?C.red:C.blue;
    rect(g,64,y,W-128,h,C.panel,13,C.line);rect(g,64,y,5,h,ink,2);rect(g,86,y+21,42,42,'#0c1b27',11,C.line);text(g,mark,107,y+52,26,ink,true,'center');text(g,safe(entry.title),150,y+36,fit(g,entry.title,946,25,18),C.white,true);wrapped(g,entry.body,150,y+70,966,20,C.muted,25);return y+h+10;
  }
  function analysisTop(g,d,logo,page,total){base(g,page,total);if(logo)g.drawImage(logo,65,124,76,76);
    text(g,'SEAF // TACTICAL READOUT',159,148,16,C.gold,true,'left',2);
    text(g,'FIELD INTELLIGENCE',159,198,44,C.white,true);
    rect(g,64,232,W-128,120,C.panel,15,C.line);
    text(g,'MISSION ASSESSMENT',86,274,16,C.soft,true,'left',1.5);
    text(g,d.status.toUpperCase(),86,320,fit(g,d.status,800,34,23),C.white,true);
    if(typeof d.score==='number'){badge(g,`${d.score} / 100`,1003,269,C.bg,C.gold);}
  }
  function analysisPages(d,logo,totalEstimate){
    const all=(d.insights||[]).length?d.insights:[{type:'info',title:'Awaiting field analysis',body:'This is a draft export. Equip all nine slots and press Evaluate Synergy to include the full readiness report.'}];
    let offset=0,page=2;const imgs=[];
    while(offset<all.length || page===2){const {el,g}=canvas();analysisTop(g,d,logo,page,totalEstimate);
      let y=390;
      if(page===2){section(g,'03','COVERAGE VECTORS',y,'SIX METRICS // HEURISTIC');const metrics=d.metrics||[];for(let i=0;i<6;i++){chartCard(g,64+(i%2)*568,418+Math.floor(i/2)*115,542,['Anti-heavy','Swarm control','Medium targets','Objectives','Survivability','Sustain'][i],metrics[i]);}y=790;}
      else{y=385;}
      section(g,page===2?'04':'05',page===2?'SYNERGY FINDINGS':'CONTINUED INTELLIGENCE',y,`${String(all.length).padStart(2,'0')} // OBSERVATIONS`);y+=46;
      let count=0;while(offset<all.length){const entry=all[offset],h=findingHeight(g,entry);if(y+h>H-123)break;y=finding(g,entry,y);offset++;count++;}
      if(count===0&&offset<all.length){const entry={...all[offset],body:txt(all[offset].body).slice(0,520)};y=finding(g,entry,y);offset++;}
      imgs.push(el);page++;
    }
    return imgs;
  }
  function loadLogo(url){return new Promise(resolve=>{if(!url){resolve(null);return;}const img=new Image();img.onload=()=>resolve(img);img.onerror=()=>resolve(null);img.src=url;if(img.complete&&img.naturalWidth)resolve(img);});}
  function jpegBytes(c){const str=atob(c.toDataURL('image/jpeg',.93).split(',')[1]);const bytes=new Uint8Array(str.length);for(let i=0;i<str.length;i++)bytes[i]=str.charCodeAt(i);return bytes;}
  function pdfFromCanvases(canvases){
    const jpgs=canvases.map(jpegBytes),objects=[];
    // Objects: catalog, pages, then for each page: image, contents, page.
    objects[1]=enc.encode('<< /Type /Catalog /Pages 2 0 R >>');
    const refs=[];
    for(let i=0;i<jpgs.length;i++){
      const im=3+i*3,co=im+1,pg=im+2;
      const j=jpgs[i];objects[im]=[enc.encode(`<< /Type /XObject /Subtype /Image /Width ${canvases[i].width} /Height ${canvases[i].height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${j.length} >>\nstream\n`),j,enc.encode('\nendstream')];
      const stream='q\n595.28 0 0 841.89 0 0 cm\n/Im0 Do\nQ\n';const bytes=enc.encode(stream);
      objects[co]=[enc.encode(`<< /Length ${bytes.length} >>\nstream\n`),bytes,enc.encode('endstream')];
      objects[pg]=enc.encode(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /XObject << /Im0 ${im} 0 R >> >> /Contents ${co} 0 R >>`);refs.push(`${pg} 0 R`);
    }
    objects[2]=enc.encode(`<< /Type /Pages /Count ${jpgs.length} /Kids [${refs.join(' ')}] >>`);
    const parts=[enc.encode('%PDF-1.4\n%\xD3\xEB\xE9\xE1\n')];let offset=parts[0].length;const xref=[0];
    for(let i=1;i<objects.length;i++){xref.push(offset);const head=enc.encode(`${i} 0 obj\n`),tail=enc.encode('\nendobj\n');parts.push(head);offset+=head.length;const o=objects[i];if(Array.isArray(o)){for(const p of o){parts.push(p);offset+=p.length;}}else{parts.push(o);offset+=o.length;}parts.push(tail);offset+=tail.length;}
    const xrefPos=offset;let str=`xref\n0 ${objects.length}\n0000000000 65535 f \n`;for(let i=1;i<xref.length;i++)str+=`${String(xref[i]).padStart(10,'0')} 00000 n \n`;str+=`trailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xrefPos}\n%%EOF\n`;parts.push(enc.encode(str));
    return new Blob(parts,{type:'application/pdf'});
  }
  async function createPdf(d){const logo=await loadLogo(d.logoUrl);let imgs=analysisPages(d,logo,2);const total=1+imgs.length; // Repaint the page numbers if findings needed extra pages.
    imgs=analysisPages(d,logo,total);return pdfFromCanvases([loadoutPage(d,logo,total),...imgs]);}
  async function download(d){const pdf=await createPdf(d);const url=URL.createObjectURL(pdf),a=document.createElement('a');a.href=url;a.download=`Helldivers2_Loadout_${txt(d.front).replace(/[^a-z0-9]/gi,'_')}_${new Date().toISOString().slice(0,10)}.pdf`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);return pdf;}
  window.HD2PDF={download,createPdf};
})();
