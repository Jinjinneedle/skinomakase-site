(() => {
'use strict';
const app=document.querySelector('.app'),panels=[...document.querySelectorAll('.studio-panel')],tabs=document.querySelector('.studio-tabs'),play=document.getElementById('play'),engine=window.skmStudio;
const words={ko:['템포','음색','리듬','스윙','공간','볼륨','세부 조작'],en:['Tempo','Sound','Rhythm','Swing','Space','Volume','More controls'],ja:['テンポ','音色','リズム','スイング','空間','音量','詳細'],zh:['速度','音色','节奏','摇摆','空间','音量','更多'],es:['Tempo','Sonido','Ritmo','Swing','Espacio','Volumen','Más controles'],fr:['Tempo','Son','Rythme','Swing','Espace','Volume','Réglages'],de:['Tempo','Klang','Rhythmus','Swing','Raum','Lautstärke','Weitere Regler']};
const grid=document.createElement('div');grid.className='knob-grid';document.querySelector('.studio-deck').after(grid);
const pads=document.querySelector('.studio-padgrid');pads.classList.add('knob-pads');panels[1].prepend(pads);
const extra=document.createElement('details');extra.className='knob-extra';const summary=document.createElement('summary');summary.textContent='···';extra.append(summary);app.append(extra);extra.append(tabs,...panels);extra.append(document.getElementById('prog').closest('.field'));
const mainStep=document.querySelector('.studio-transport .step');mainStep.hidden=true;
const groove=panels[1].querySelector('select'),swing=panels[1].querySelector('input[type=range]'),instrument=document.getElementById('studio-instrument'),reverb=panels[2].querySelectorAll('input[type=range]')[1],volume=panels[3].querySelectorAll('input[type=range]')[2];
const knobs=[];window.SKM_KNOBS=[];let dragging=false;
function emit(el,type){el.dispatchEvent(new Event(type,{bubbles:true}));}
function rangeSet(el,v,done){el.value=v;emit(el,'input');if(done)emit(el,'change');}
function knob(index,spec){
 const cell=document.createElement('div');cell.className='knob-cell';const label=document.createElement('span');label.className='knob-label';const dial=document.createElement('div');dial.className='knob-dial';dial.tabIndex=0;dial.setAttribute('role','slider');dial.setAttribute('aria-orientation','vertical');dial.innerHTML='<span class="knob-cap"><i></i></span>';const value=document.createElement('span');value.className='knob-value';cell.append(label,dial,value);grid.append(cell);
 let current=spec.get(),origin=0,startY=0,startX=0;
 function paint(v){current=Math.max(spec.min,Math.min(spec.max(),Math.round(v)));const fraction=(current-spec.min)/(spec.max()-spec.min||1);dial.style.setProperty('--angle',(-135+fraction*270)+'deg');dial.style.setProperty('--progress',(fraction*270)+'deg');value.textContent=spec.text(current);dial.setAttribute('aria-valuenow',current);dial.setAttribute('aria-valuemin',spec.min);dial.setAttribute('aria-valuemax',spec.max());dial.setAttribute('aria-valuetext',spec.text(current));}
 function refresh(){if(dragging)return;const names=words[document.documentElement.lang]||words.en;label.textContent=names[index];dial.setAttribute('aria-label',names[index]);paint(spec.get());}
 dial.addEventListener('pointerdown',e=>{if(e.button!==0)return;dragging=true;origin=current;startY=e.clientY;startX=e.clientX;dial.setPointerCapture(e.pointerId);dial.classList.add('turning');});
 dial.addEventListener('pointermove',e=>{if(!dial.hasPointerCapture(e.pointerId))return;const scale=spec.max()-spec.min>50?1:12;paint(origin+((startY-e.clientY)+(e.clientX-startX)*.35)/scale);if(spec.live)spec.set(current,false);});
 function finish(e){if(!dial.hasPointerCapture(e.pointerId))return;dial.releasePointerCapture(e.pointerId);dragging=false;dial.classList.remove('turning');if(current!==origin)spec.set(current,true);refreshAll();}
 dial.addEventListener('pointerup',finish);dial.addEventListener('pointercancel',e=>{if(dial.hasPointerCapture(e.pointerId)){dial.releasePointerCapture(e.pointerId);dragging=false;dial.classList.remove('turning');refreshAll();}});
 dial.addEventListener('keydown',e=>{const delta=['ArrowUp','ArrowRight'].includes(e.key)?1:['ArrowDown','ArrowLeft'].includes(e.key)?-1:0;if(!delta&&!['Home','End','PageUp','PageDown'].includes(e.key))return;e.preventDefault();const n=e.key==='Home'?spec.min:e.key==='End'?spec.max():current+(delta||(e.key==='PageUp'?10:-10));paint(n);spec.set(current,true);refreshAll();});
 knobs.push(refresh);window.SKM_KNOBS.push({spec,name:()=>label.textContent,refresh:refreshAll});refresh();return cell;
}
function refreshAll(){knobs.forEach(fn=>fn());summary.setAttribute('aria-label',(words[document.documentElement.lang]||words.en)[6]);}
knob(0,{min:40,max:()=>240,get:()=>engine.bpm,text:v=>v+' BPM',set:v=>engine.tempo(v),live:true});
function soundIndex(){const tone=engine.settings.tone;return tone==='piano'?0:tone==='synth'?1:2+instrument.selectedIndex;}
knob(1,{min:0,max:()=>2+instrument.options.length-1,get:soundIndex,text:v=>v<2?document.getElementById(v?'tSynth':'tPiano').textContent:instrument.options[v-2]?.textContent||'—',set:v=>{if(v<2)document.getElementById(v?'tSynth':'tPiano').click();else{instrument.selectedIndex=v-2;emit(instrument,'change');}},live:false});
knob(2,{min:0,max:()=>groove.options.length-1,get:()=>groove.selectedIndex,text:v=>groove.options[v]?.textContent||'—',set:v=>{groove.selectedIndex=v;emit(groove,'change');},live:false});
knob(3,{min:0,max:()=>50,get:()=>Number(swing.value),text:v=>v+'%',set:(v,done)=>rangeSet(swing,v,done),live:false});
knob(4,{min:0,max:()=>100,get:()=>Number(reverb.value),text:v=>v+'%',set:(v,done)=>rangeSet(reverb,v,done),live:true});
knob(5,{min:0,max:()=>100,get:()=>Number(volume.value),text:v=>v+'%',set:(v,done)=>rangeSet(volume,v,done),live:true});
// One transport starts the shared keyboard/drum clock; original capture handler stops both.
play.addEventListener('click',e=>{e.stopImmediatePropagation();if(engine.playing)engine.halt();else document.querySelector('.studio-joint').click();},true);
// Preserve all detailed editing, recording and warp controls behind the one disclosure.
new MutationObserver(refreshAll).observe(document.getElementById('bpmV'),{childList:true});new MutationObserver(refreshAll).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});new MutationObserver(refreshAll).observe(instrument,{attributes:true,attributeFilter:['disabled','data-loaded']});app.addEventListener('change',refreshAll);app.addEventListener('input',()=>{if(!dragging)refreshAll();});refreshAll();
})();
