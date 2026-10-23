// Erotic Condo — adult layer (18+). Fiction only; all characters are adults. Text-only; art stays as-is.
(function(){
'use strict';
const KEY_SET='erocondo_settings',KEY_CON='erocondo_console';
const ACC={Ares:'#ff3b4e',Zayne:'#34d2ff',Batzz:'#e8344f',Ophion:'#ffb62e'};
const STG=['RESISTANT','FLUSTERED','AROUSED','NEEDY'],STX=[25,50,75];
const D=()=>window.ADULT;
let set={int:1,rm:false,outl:true};
try{const j=JSON.parse(localStorage.getItem(KEY_SET));if(j)Object.assign(set,j);else set.rm=!!(matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches);}catch(e){}
const saveSet=()=>{try{localStorage.setItem(KEY_SET,JSON.stringify(set));}catch(e){}};
const $$=id=>document.getElementById(id);
const rnd=a=>a[Math.floor(Math.random()*a.length)];
const cap=s=>s.charAt(0).toUpperCase()+s.slice(1);
function A(n){S.adult=S.adult||{};const a=S.adult[n]=S.adult[n]||{};if(a.trust==null)a.trust=12;a.ch=a.ch||{};a.d=a.d||{day:0,st:[0,0,0,0],fin:0};if(a.d.day!=S.day)a.d={day:S.day,st:[0,0,0,0],fin:0};a.fins=a.fins||0;return a;}
const stageOf=v=>v<STX[0]?0:v<STX[1]?1:v<STX[2]?2:3;
const capStage=n=>Math.min(3,relLv(n));
const arMax=n=>[24.9,49.9,74.9,100][capStage(n)];
function explicitTxt(o){let t=o.t||'';if(set.int>=1&&o.s)t+=' '+o.s;if(set.int>=2&&o.x)t+=' '+o.x;return t;}
function pool(n,z,st){const d=D()[n],sub=s=>s.replace(/\{z\}/g,z.my).replace(/\{Z\}/g,cap(z.my));
 let p=z.L[st].slice().concat(d.G[st].map(sub));if(set.int>=1)p=p.concat(d.H[st]);if(set.int>=2)p=p.concat(d.X[st]);return p;}
// ---------- state ----------
let ts=null,rd=null,lastLine='',hold=null,viewMode='fit',idleT=0,capT=0,setOpen=false,ticker=null;
const open=()=>!!(ts||rd);
// ---------- console toggle ----------
function applyConsole(h){document.body.classList.toggle('chide',h);try{localStorage.setItem(KEY_CON,h?'1':'0');}catch(e){}
 const b=$$('consoleToggle');if(b)b.textContent=h?'▲ Show console':'▼ Hide console';
 if(h&&typeof closeSheet=='function'&&!open())closeSheet();
 const m=$$('mini');if(m)document.documentElement.style.setProperty('--mb',(m.offsetHeight||74)+'px');
 layoutArt();dispatchEvent(new Event('resize'));}
function toggleConsole(){applyConsole(!document.body.classList.contains('chide'));}
// ---------- overlay build ----------
function build(){
 if($$('ad'))return;
 const h=`<div id="ad"><div id="adIn"><div id="adTop"><button id="adX" aria-label="Leave">✕</button><div id="adMeters"></div></div>
 <div id="adStage"><div id="adArt"><img id="adImg" alt=""><div id="adHS"></div><div id="adBlush"></div><div id="adFx"></div></div></div>
 <div id="adCap"><div class="fc" id="adFace"></div><div class="tx"><div class="nm" id="adNm"></div><div id="adTx"></div></div></div>
 <div id="adCon"></div><div id="adMini"></div><div id="adBlack"></div></div></div>
 <div id="adSet"><div id="adSetBox"></div></div>
 <div id="mini"></div><button id="consoleToggle"></button>`;
 const w=document.createElement('div');w.innerHTML=h;while(w.firstChild)document.body.appendChild(w.firstChild);
 $$('adX').onclick=leave;$$('consoleToggle').onclick=toggleConsole;
 const art=$$('adArt');
 art.addEventListener('pointerdown',pDown);art.addEventListener('pointermove',pMove);art.addEventListener('pointerup',pUp);art.addEventListener('pointercancel',pUp);
 art.addEventListener('contextmenu',e=>e.preventDefault());
 addEventListener('resize',layoutArt);addEventListener('keydown',e=>{if(e.code=='Escape'&&open()){if(setOpen)closeSet();else leave();}});
}
// ---------- art layout & hotspots ----------
function layoutArt(){if(!ts&&!rd)return;const d=D()[(ts||rd).n],st=$$('adStage'),art=$$('adArt');if(!st||!art)return;
 const sw=st.clientWidth,sh=st.clientHeight;if(!sw||!sh)return;let W,H,L,T;
 if(rd){viewMode='fit';}
 if(viewMode=='fit'){H=Math.min(sh,sw/d.ratio);W=H*d.ratio;L=(sw-W)/2;T=(sh-H)/2;}
 else{W=Math.min(sw,sw*.98);H=W/d.ratio;L=(sw-W)/2;T=viewMode=='up'?0:sh-H;}
 art.style.width=W+'px';art.style.height=H+'px';art.style.left=L+'px';art.style.top=T+'px';
 const bl=$$('adBlush');if(ts){const f=d.Z[0].r[0];bl.style.left=(f[0]-4)+'%';bl.style.top=(f[1]-2)+'%';bl.style.width=(f[2]-f[0]+8)+'%';bl.style.height=(f[3]-f[1]+4)+'%';}}
function buildHS(){const d=D()[ts.n],box=$$('adHS');box.innerHTML='';const lv=relLv(ts.n);
 d.Z.forEach((z,zi)=>z.r.forEach(r=>{const e=document.createElement('div');e.className='hs'+(lv<z.lv?' lk':'');e.dataset.z=zi;e.style.cssText=`left:${r[0]}%;top:${r[1]}%;width:${r[2]-r[0]}%;height:${r[3]-r[1]}%`;e.innerHTML='<span>'+(lv<z.lv?'🔒 ':'')+z.n+'</span>';box.appendChild(e);}));}
function zoneAt(px,py){const d=D()[ts.n];let best=-1,ba=1e9;d.Z.forEach((z,zi)=>z.r.forEach(r=>{if(px>=r[0]&&px<=r[2]&&py>=r[1]&&py<=r[3]){const a=(r[2]-r[0])*(r[3]-r[1]);if(a<ba){ba=a;best=zi;}}}));return best;}
// ---------- pointer ----------
function pDown(e){if(!ts||ts.fin)return;e.preventDefault();try{e.target.setPointerCapture(e.pointerId);}catch(_){}
 const r=$$('adArt').getBoundingClientRect(),px=(e.clientX-r.left)/r.width*100,py=(e.clientY-r.top)/r.height*100,z=zoneAt(px,py);
 ripple(e.clientX-r.left,e.clientY-r.top);hold={id:e.pointerId,z,t:performance.now(),x:e.clientX,y:e.clientY};
 if(z<0){hint();return;}touchZone(z,1,e.clientX-r.left,e.clientY-r.top);}
function pMove(e){if(!hold||hold.id!=e.pointerId||!ts||ts.fin)return;const r=$$('adArt').getBoundingClientRect(),px=(e.clientX-r.left)/r.width*100,py=(e.clientY-r.top)/r.height*100,z=zoneAt(px,py),now=performance.now();
 if(z<0)return;const mv=Math.hypot(e.clientX-hold.x,e.clientY-hold.y);
 if((z!=hold.z)||(mv>14&&now-hold.t>380)){hold.z=z;hold.t=now;hold.x=e.clientX;hold.y=e.clientY;touchZone(z,.6,e.clientX-r.left,e.clientY-r.top);}}
function pUp(e){if(hold&&hold.id==e.pointerId)hold=null;}
let hintT=0;function hint(){if(performance.now()-hintT<4000)return;hintT=performance.now();say(ts.n,'(Try the highlighted spots, or use the zone buttons below.)',0,'normal');}
// ---------- effects ----------
function ripple(x,y){if(set.rm)return;const f=$$('adFx'),e=document.createElement('div');e.className='fxr';e.style.left=x+'px';e.style.top=y+'px';f.appendChild(e);setTimeout(()=>e.remove(),520);}
function fxAt(kind,x,y,n=1){if(set.rm)return;const f=$$('adFx');for(let i=0;i<n;i++){const e=document.createElement('div');e.className=kind;e.style.left=(x+(Math.random()*40-20))+'px';e.style.top=(y+(Math.random()*20-10))+'px';e.style.setProperty('--dx',(Math.random()*50-25)+'px');if(kind=='fxh')e.textContent=rnd(['♥','♥','♡','💗']);f.appendChild(e);setTimeout(()=>e.remove(),1900);}}
function shake(){if(set.rm)return;const a=$$('adArt');a.classList.remove('shake');void a.offsetWidth;a.classList.add('shake');}
function flashZone(zi){document.querySelectorAll('#adHS .hs').forEach(e=>{if(+e.dataset.z==zi){e.classList.add('flash');setTimeout(()=>e.classList.remove('flash'),260);}});}
// ---------- caption ----------
function face(n,ex){const nn=n.toLowerCase();$$('adFace').style.backgroundImage=`url(assets/${nn}/expr_${ex}_hd.png)`;}
function say(n,txt,st,ex,noName){const c=$$('adTx');c.textContent=txt;if(!noName){$$('adNm').innerHTML=n.toUpperCase()+(ts?`<i>${STG[st]}</i>`:'');}face(n,ex||D()[n].expr[st]);}
// ---------- touch scene ----------
function openTouch(n,force){build();if(!n||!S.unlocked.includes(n)){toast('Move in this resident first');return;}if(dlg&&dlg.on)return;
 if(!force&&!TN[n]){toast(n+' is away right now');return;}
 if(typeof closeSheet=='function')closeSheet();const d=D()[n],a=A(n);
 ts={n,ar:0,last:0,st:0,fin:0,fr:0,busy:0,pg:0};rd=null;viewMode='fit';idleT=0;capT=0;
 $$('ad').style.setProperty('--ac',ACC[n]);$$('adImg').src=d.img;$$('adCap').classList.remove('rd');
 $$('ad').classList.add('on');document.body.classList.add('adon');$$('ad').classList.toggle('outl',!!set.outl);$$('ad').classList.toggle('rm',!!set.rm);
 buildHS();render();layoutArt();$$('adImg').onload=layoutArt;
 const r=relLv(n);
 const intro={0:`Tap the glowing spots on ${n}. Build trust first — new zones and reactions unlock as you grow closer.`,1:`${n} is warming up. Try the arms, hands and face.`}[Math.min(1,r)]||`Touch ${n}. Watch the meters.`;
 say(n,intro,0,d.expr[0]);startTicker();}
function startTicker(){if(ticker)return;let last=performance.now();ticker=setInterval(()=>{const now=performance.now(),dt=Math.min(.2,(now-last)/1000);last=now;if(!ts||ts.fin)return;idleT+=dt;
 if(idleT>4&&ts.ar>0){ts.ar=Math.max(0,ts.ar-1.8*dt);ts.st=Math.max(0,Math.min(ts.st,stageOf(ts.ar)));meters();}
 if(idleT>14){idleT=-6;const d=D()[ts.n];say(ts.n,rnd(d.IDLE),stageOf(ts.ar));}},100);}
function meters(){if(!ts)return;const a=A(ts.n),st=stageOf(ts.ar),h=$$('adMeters');if(!h.firstChild||h.dataset.n!=ts.n){h.dataset.n=ts.n;h.innerHTML=`<div class="mr"><b>AROUSAL</b><div class="bar ar"><i id="mAr"></i><u style="left:25%"></u><u style="left:50%"></u><u style="left:75%"></u></div><em id="mSt"></em></div><div class="mr"><b>TRUST</b><div class="bar tr"><i id="mTr"></i></div><em id="mTn"></em></div>`;}
 $$('mAr').style.width=ts.ar+'%';$$('mSt').textContent=STG[st];$$('mTr').style.width=a.trust+'%';$$('mTn').textContent=Math.round(a.trust)+'/100';
 const bl=$$('adBlush');bl.style.opacity=set.rm?(.12*st):[0,.25,.5,.8][st];
 const f=$$('adFin');if(f){const ready=ts.ar>=85&&relLv(ts.n)>=4;f.disabled=!ready&&!(ts.ar>=85);f.classList.toggle('ready',ready);const m=$$('mFin');if(m)m.disabled=f.disabled;}}
function render(){const n=ts.n,d=D()[n];$$('adTop').style.display='flex';
 const chips=d.Z.map((z,i)=>{const lk=relLv(n)<z.lv;return`<button class="zc${lk?' lk':''}" data-z="${i}">${lk?'🔒 ':''}${z.n}${lk?`<small>${REL[z.lv]}</small>`:''}</button>`;}).join('');
 const row=`<button class="ab" id="abView">🔍 VIEW<br><small>${{fit:'body',up:'upper',down:'lower'}[viewMode]}</small></button><button class="ab" id="abOut">${set.outl?'◼ SPOTS ON':'◻ SPOTS OFF'}</button><button class="ab" id="abSet">⚙ SETTINGS</button><button class="ab" id="abProf">☰ PROFILE</button><button class="ab fin" id="adFin" disabled>♥ FINALE</button>`;
 $$('adCon').innerHTML=`<div id="adCh">${chips}</div><div class="arow">${row}</div>`;
 $$('adMini').innerHTML=`<button class="ab" id="mNext">⏭ NEXT HOUR</button><button class="ab" id="mView">🔍</button><button class="ab" id="mSet">⚙</button><button class="ab fin" id="mFin" disabled>♥ FINALE</button>`;
 $$('adCh').onclick=e=>{const b=e.target.closest('.zc');if(!b||!ts||ts.fin)return;const zi=+b.dataset.z;ensureVisible(zi);flashZone(zi);const art=$$('adArt').getBoundingClientRect(),r=D()[n].Z[zi].r[0];touchZone(zi,1.1,(r[0]+r[2])/200*art.width,(r[1]+r[3])/200*art.height);};
 const fin=()=>doFinale(),vw=()=>{viewMode=viewMode=='fit'?'up':viewMode=='up'?'down':'fit';render();layoutArt();meters();};
 $$('abView').onclick=vw;$$('mView').onclick=vw;$$('abOut').onclick=()=>{set.outl=!set.outl;saveSet();$$('ad').classList.toggle('outl',set.outl);render();meters();};
 $$('abSet').onclick=$$('mSet').onclick=openSet;$$('adFin').onclick=fin;$$('mFin').onclick=fin;$$('mNext').onclick=nextHour;
 $$('abProf').onclick=()=>{const m=n;leave();openProfile(m);};meters();
 const m=$$('mFin');if(m){m.disabled=$$('adFin').disabled;}}
function ensureVisible(zi){const r=D()[ts.n].Z[zi].r[0],cy=(r[1]+r[3])/2;if(viewMode=='up'&&cy>58){viewMode='down';render();layoutArt();}else if(viewMode=='down'&&cy<42){viewMode='up';render();layoutArt();}}
function touchZone(zi,strength,x,y){if(!ts||ts.fin||ts.busy)return;const n=ts.n,d=D()[n],z=d.Z[zi],a=A(n),lv=relLv(n);idleT=0;flashZone(zi);
 if(lv<z.lv){a.trust=Math.max(0,a.trust-.8);const l=rnd(d.LOCK);say(n,l,stageOf(ts.ar),d.ex1?d.ex1[Math.min(3,stageOf(ts.ar))]:null);if(typeof sfx=='function')sfx(220);meters();return;}
 const cs=capStage(n),before=stageOf(ts.ar),mx=arMax(n),gainv=7*z.sens*strength*(.7+a.trust/100);
 a.trust=Math.min(100,a.trust+.5*strength);let nv=Math.min(mx,ts.ar+gainv);const capped=ts.ar+gainv>mx&&cs<3;ts.ar=nv;const st=stageOf(ts.ar);
 let txt,ex;
 if(st>before){txt=d.UP[st];ts.st=st;const dd=a.d;if(!dd.st[st]){dd.st[st]=1;gain(n,st,'closer');a.trust=Math.min(100,a.trust+st);}if(typeof sfx=='function')sfx(900+st*160);}
 else if(capped&&performance.now()-capT>3500){capT=performance.now();txt=rnd(d.CAP);}
 else{const p=pool(n,z,st).filter(l=>l!=lastLine);txt=rnd(p);}
 lastLine=txt;ex=Math.random()<.4&&d.ex1?d.ex1[st]:d.expr[st];say(n,txt,st,ex);
 if(typeof sfx=='function'&&st>=before)sfx(420+st*90+Math.random()*60);
 if(st>=1)shake();fxAt('fxh',x,y,st>=2?3:1+(Math.random()<.5?1:0));if(st>=2)fxAt('fxs',x,y,2);if(st==0&&Math.random()<.5)fxAt('fxh',x,y,1);
 meters();}
function nextHour(){if(typeof tickTime!='function')return;const dm=60-(S.min%60);tickTime(dm);if(typeof syncTenants=='function')syncTenants();if(typeof updateHud=='function')updateHud();toast('⏭ '+clock());
 if(ts&&!TN[ts.n]){toast(ts.n+' has left the room');}}
// ---------- finale ----------
function doFinale(){if(!ts||ts.fin||ts.busy)return;const n=ts.n,d=D()[n],lv=relLv(n);if(ts.ar<85){say(n,'(Not yet — raise the arousal meter first.)',stageOf(ts.ar));return;}
 if(lv<4){say(n,d.CAPF,stageOf(ts.ar),d.expr[1]);return;}
 ts.fin=1;ts.fr=0;document.body.classList.add('fin');finPage();}
function finPage(){const n=ts.n,d=D()[n],p=d.FIN[ts.fr];if(!p){return finEnd();}
 $$('adNm').innerHTML=n.toUpperCase()+'<i>❤ FINALE</i>';$$('adTx').textContent=explicitTxt(p);face(n,['blushing','blushing','smile'][ts.fr]||'blushing');
 $$('adCon').innerHTML=`<div class="arow"><button class="ab go" id="fNext">${ts.fr<d.FIN.length-1?'NEXT ▶':'FADE TO BLACK ▶'}</button></div>`;
 $$('adMini').innerHTML=`<button class="ab go" id="fNext2">${ts.fr<d.FIN.length-1?'NEXT ▶':'FADE ▶'}</button>`;
 const go=()=>{ts.fr++;if(ts.fr>=d.FIN.length)finEnd();else finPage();};$$('fNext').onclick=go;$$('fNext2').onclick=go;
 if(ts.fr==1){fxAt('fxh',150,200,5);}}
function finEnd(){const n=ts.n,d=D()[n],a=A(n),bk=$$('adBlack');ts.busy=1;$$('adCon').innerHTML='';$$('adMini').innerHTML='';
 bk.textContent='…';bk.classList.add('on');
 setTimeout(()=>{bk.textContent=rnd(d.AFTER).replace(/^"|"$/g,'');},1500);
 setTimeout(()=>{const first=a.d.fin==0;a.d.fin=1;a.fins++;a.trust=Math.min(100,a.trust+3);if(first){gain(n,8,'finale');S.money+=40;toast('+£40 tip · ♥ +8');}else gain(n,1,'afterglow');
  if(typeof updateHud=='function')updateHud();save(1);ts.ar=0;ts.fin=0;ts.busy=0;ts.fr=0;document.body.classList.remove('fin');bk.classList.remove('on');
  setTimeout(()=>{if(!ts)return;render();say(n,rnd(d.AFTER),0,'smile');meters();},600);},3600);}
// ---------- story reader ----------
function chapters(n){return D()[n].CH;}
function chapterStatus(n,i){const c=chapters(n)[i],p=R(n).p,a=A(n);return p<c.need?'lock':a.ch[c.id]?'seen':'new';}
function storyRowsA(n){const C=chapters(n);return`<div class="zrow srow"><b>STORY</b>${C.map((c,i)=>{const st=chapterStatus(n,i);return`<button class="st-${st}" onclick="ADULTUI.chapter('${n}',${i})" title="${st=='lock'?'Unlocks at ♥'+c.need:c.title}">${st=='lock'?'🔒':(i+1)}<small>${st=='lock'?'♥'+c.need:st=='seen'?'✓':'NEW'}</small></button>`;}).join('')}</div>
 <div class="slegend">18+ story chapters · 🔒 locked · NEW unlocked · ✓ read — tap to read (replayable)</div>`;}
function chapter(n,i){build();const c=chapters(n)[i],p=R(n).p;if(p<c.need){toast(`Chapter ${i+1} unlocks at ♥ ${c.need} (you have ♥ ${p})`);if(typeof sfx=='function')sfx(180);return;}
 if(typeof closeSheet=='function')closeSheet();ts=null;rd={n,i,c,k:0,q:null,extra:null,res:null};viewMode='fit';
 $$('ad').style.setProperty('--ac',ACC[n]);$$('adImg').src=D()[n].img;$$('adCap').classList.add('rd');$$('ad').classList.add('on');$$('ad').classList.remove('outl');$$('ad').classList.toggle('rm',!!set.rm);document.body.classList.add('adon');
 $$('adHS').innerHTML='';$$('adBlush').style.opacity=0;$$('adMeters').dataset.n='';$$('adMeters').innerHTML=`<div style="font-weight:1000;font-size:13px">${n.toUpperCase()} · CH ${i+1}</div><div style="font-size:11px;opacity:.85">${c.title}</div>`;
 layoutArt();$$('adImg').onload=layoutArt;rdPage();}
const RDX=['normal','smile','teasing','blushing','blushing','smile'];
function rdPage(){const n=rd.n,c=rd.c,pg=c.pages[rd.k],d=D()[n];if(!pg){return rdEnd();}
 const ex=RDX[Math.min(rd.k,5)];let con='';
 if(pg.q){$$('adNm').innerHTML=n.toUpperCase()+`<i>CHOICE</i>`;$$('adTx').innerHTML=`<div class="q"></div>`;$$('adTx').firstChild.textContent=pg.q;
  con=pg.o.map((o,oi)=>`<button class="ab opt" data-o="${oi}">${o.a}</button>`).join('');}
 else{$$('adNm').innerHTML=n.toUpperCase()+`<i>${rd.k+1}/${c.pages.length}</i>`;$$('adTx').textContent=rd.res?rd.res:explicitTxt(pg);
  con=`<button class="ab go" id="rNext">${rd.k>=c.pages.length-1?'FINISH ✓':'NEXT ▶'}</button>`;}
 face(n,ex);$$('adCap').scrollTop=0;
 if(rd.k==4&&!rd.faded){rd.faded=1;const bk=$$('adBlack');bk.textContent='…';bk.classList.add('on');setTimeout(()=>bk.classList.remove('on'),1300);}
 $$('adCon').innerHTML=`<div class="arow" style="flex-wrap:wrap">${con}</div>`;$$('adMini').innerHTML=con;
 const bind=el=>{el.querySelectorAll('.opt').forEach(b=>b.onclick=()=>pick(+b.dataset.o));const nx=el.querySelector('#rNext');if(nx)nx.onclick=rdNext;};bind($$('adCon'));
 $$('adMini').querySelectorAll('.opt').forEach(b=>b.onclick=()=>pick(+b.dataset.o));const m=$$('adMini').querySelector('#rNext');if(m)m.onclick=rdNext;
 $$('adMini').querySelectorAll('#rNext').forEach(b=>b.id='rNext2');}
function pick(oi){const pg=rd.c.pages[rd.k],o=pg.o[oi],n=rd.n,a=A(n);
 if(o.trust)a.trust=Math.min(100,a.trust+o.trust);if(o.hearts)gain(n,o.hearts,'story');
 // show the result as an in-between page, then continue
 $$('adNm').innerHTML=n.toUpperCase()+`<i>…</i>`;$$('adTx').textContent=explicitTxt(o);face(n,'smile');
 const con=`<button class="ab go" id="rNext">NEXT ▶</button>`;$$('adCon').innerHTML=`<div class="arow">${con}</div>`;$$('adMini').innerHTML=con.replace('rNext','rNext2');
 const go=()=>{rd.k++;rdPage();};$$('adCon').querySelector('#rNext').onclick=go;$$('adMini').querySelector('#rNext2').onclick=go;}
function rdNext(){rd.k++;rdPage();}
function rdEnd(){const n=rd.n,c=rd.c,a=A(n),first=!a.ch[c.id];a.ch[c.id]=1;if(first){gain(n,4,'chapter');a.trust=Math.min(100,a.trust+2);}save(1);const m=n;leave();toast(first?`Chapter read · ♥ +4`:'Chapter replayed');openProfile(m);}
// ---------- leave ----------
function leave(){if(!ts&&!rd){return;}const wasTs=!!ts;ts=null;rd=null;hold=null;$$('ad').classList.remove('on');document.body.classList.remove('adon','fin');$$('adBlack').classList.remove('on');$$('adArt').classList.remove('shake');
 save(1);if(typeof updateHud=='function')updateHud();}
// ---------- settings ----------
function openSet(){build();setOpen=true;const b=$$('adSetBox');
 b.innerHTML=`<h3>18+ SETTINGS</h3><p>Fiction for adults only. All characters are adult fictional beings. Text only — art is never explicit.</p><b style="font-size:12px">TEXT INTENSITY</b><div class="seg"><button data-i="0" class="${set.int==0?'on':''}">Teasing</button><button data-i="1" class="${set.int==1?'on':''}">Steamy</button><button data-i="2" class="${set.int==2?'on':''}">Explicit</button></div>
 <button class="tg ${set.rm?'on':''}" id="sRm">Reduced motion: ${set.rm?'ON':'OFF'}</button><button class="tg ${set.outl?'on':''}" id="sOut">Hotspot outlines: ${set.outl?'ON':'OFF'}</button><button class="cl" id="sCl">DONE</button>`;
 b.querySelectorAll('.seg button').forEach(x=>x.onclick=()=>{set.int=+x.dataset.i;saveSet();openSet();});
 $$('sRm').onclick=()=>{set.rm=!set.rm;saveSet();if($$('ad'))$$('ad').classList.toggle('rm',set.rm);openSet();};
 $$('sOut').onclick=()=>{set.outl=!set.outl;saveSet();if($$('ad'))$$('ad').classList.toggle('outl',set.outl);if(ts){render();meters();}openSet();};
 $$('sCl').onclick=closeSet;$$('adSet').classList.add('on');}
function closeSet(){setOpen=false;$$('adSet').classList.remove('on');}
// ---------- game-mode mini bar + buttons ----------
function mini(){const m=$$('mini');if(!m||!document.body.classList.contains('chide')||open())return;const n=talkTarget();const ic=$$('infoT');
 let rel='';if(n&&TN[n]){const r=R(n),np=nextP(n),p0=REL_P[relLv(n)],pc=np?Math.round((r.p-p0)/(np-p0)*100):100;rel=`<div class="mbar"><i style="width:${pc}%"></i></div>`;}
 const html=`<div class="mc">${ic?ic.innerHTML:''}${rel}</div>`;
 if(m.dataset.h!=html+(n||'')){m.dataset.h=html+(n||'');m.innerHTML=html+`<button id="mnNext">⏭ NEXT HR</button><button class="t" id="mnTouch" ${n&&TN[n]?'':'disabled'}>TOUCH</button>`;$$('mnNext').onclick=nextHour;$$('mnTouch').onclick=()=>{const t=talkTarget();if(t)openTouch(t);};document.documentElement.style.setProperty('--mb',m.offsetHeight+'px');}}
function init(){build();const _t=window.toast;window.toast=function(t){_t(t);if(open()){const b=$$('adIn');if(!b)return;const e=document.createElement('div');e.textContent=t;e.style.cssText='position:absolute;left:50%;top:64px;transform:translateX(-50%);background:#201830ee;color:#fff;border:1px solid #ffe16a;border-radius:13px;padding:6px 13px;font:800 12px system-ui;z-index:9;max-width:86%;text-align:center;pointer-events:none';b.appendChild(e);setTimeout(()=>e.remove(),2400);}};let h=false;try{h=localStorage.getItem(KEY_CON)=='1';}catch(e){}applyConsole(h);
 const bt=$$('bTouch'),bn=$$('bNext');if(bt)bt.onclick=()=>{const t=talkTarget();if(t)openTouch(t);else toast('Pick a resident first');};if(bn)bn.onclick=nextHour;
 setInterval(()=>{mini();const sh=$$('sheet');document.body.classList.toggle('sheeton',!!(sh&&sh.classList.contains('open')));},300);}
window.ADULTUI={init,open:()=>open(),openTouch,chapter,storyRows:storyRowsA,settings:openSet,nextHour,toggleConsole,leave,
 state:()=>ts?{n:ts.n,ar:ts.ar,fin:ts.fin,stage:stageOf(ts.ar)}:null,
 _set:set,zoneAt:(n,x,y)=>{ts={n};const z=zoneAt(x,y);ts=null;return z;}};
})();
