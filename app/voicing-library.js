(() => {
const names={
ko:['내 샘플','그랜드 피아노','어쿠스틱 기타','일렉트릭 기타','일렉트릭 베이스','플루트','하프','오르간','바이올린','트럼펫','실로폰','색소폰','콘트라베이스'],
en:['My sample','Grand piano','Acoustic guitar','Electric guitar','Electric bass','Flute','Harp','Organ','Violin','Trumpet','Xylophone','Saxophone','Double bass'],
ja:['自分のサンプル','グランドピアノ','アコースティックギター','エレキギター','エレキベース','フルート','ハープ','オルガン','バイオリン','トランペット','木琴','サクソフォン','コントラバス'],
zh:['我的采样','三角钢琴','原声吉他','电吉他','电贝斯','长笛','竖琴','管风琴','小提琴','小号','木琴','萨克斯','低音提琴'],
es:['Mi muestra','Piano de cola','Guitarra acústica','Guitarra eléctrica','Bajo eléctrico','Flauta','Arpa','Órgano','Violín','Trompeta','Xilófono','Saxofón','Contrabajo'],
fr:['Mon sample','Piano à queue','Guitare acoustique','Guitare électrique','Basse électrique','Flûte','Harpe','Orgue','Violon','Trompette','Xylophone','Saxophone','Contrebasse'],
de:['Mein Sample','Flügel','Akustikgitarre','E-Gitarre','E-Bass','Flöte','Harfe','Orgel','Violine','Trompete','Xylophon','Saxophon','Kontrabass']};
const ids=['','piano','guitar-acoustic','guitar-electric','bass-electric','flute','harp','organ','violin','trumpet','xylophone','saxophone','contrabass'];
const select=document.createElement('select');select.className='studio-language studio-library';select.id='studio-instrument';ids.forEach(id=>{const o=document.createElement('option');o.value=id;select.append(o);});document.getElementById('tPiano').parentElement.after(select);
const status=document.createElement('div');status.className='msg';status.setAttribute('role','status');select.after(status);
const credits=document.createElement('a');credits.href='app/samples/credits.html';credits.className='studio-credit';credits.textContent='ⓘ';credits.setAttribute('aria-label','CC BY 3.0');credits.target='_blank';document.getElementById('studio-language').after(credits);
function translate(){const code=document.documentElement.lang;const n=names[code]||names.en;[...select.options].forEach((o,i)=>o.textContent=n[i]);select.setAttribute('aria-label',n[0]);}
new MutationObserver(translate).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});translate();
const cache=new Map();let manifest,version=0,previous='';
select.addEventListener('change',async()=>{const id=select.value,request=++version;if(!id){window.skmStudio.installBank([]);previous='';status.textContent='';return;}select.disabled=true;status.textContent='…';try{
 if(!manifest){const r=await fetch('app/samples/manifest.json');if(!r.ok)throw new Error('manifest');manifest=await r.json();}
 let bank=cache.get(id);if(!bank){const instrument=manifest.find(i=>i.id===id);if(!instrument)throw new Error('instrument');const {ctx}=window.skmStudio.open();bank=await Promise.all(instrument.notes.map(async n=>{const r=await fetch('app/samples/'+n.file);if(!r.ok)throw new Error('sample');const buf=await ctx.decodeAudioData(await r.arrayBuffer());return {midi:n.midi,buf,gain:.7};}));cache.set(id,bank);if(cache.size>3)cache.delete(cache.keys().next().value);}
 if(request!==version)return;window.skmStudio.installBank(bank);previous=id;status.textContent='';select.dataset.loaded=id;
 }catch(e){if(request===version){select.value=previous;status.textContent=window.skmVoiceText('Could not read that file');}}finally{if(request===version)select.disabled=false;}
});
document.getElementById('dFile').addEventListener('change',()=>{version++;select.disabled=false;select.value='';previous='';status.textContent='';});
})();
