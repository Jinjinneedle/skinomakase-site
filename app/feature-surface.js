// Shared paper transition for every in-home feature. Hidden is the source of truth.
export function mountFeatureSurface(root){
 const panels=[...root.querySelectorAll('.earth-drop-panel,.earth-extra-menu')];
 const overlays=[...document.querySelectorAll('.bm-overlay,.video-player-overlay,.modal-overlay')];
 const frames=[...document.querySelectorAll('#appFrame,#bmFrame,#vcFrame')];
 const loading=new MutationObserver(records=>{for(const {target} of records)target.dataset.paperLoading='true';});
 for(const frame of frames){loading.observe(frame,{attributes:true,attributeFilter:['src']});frame.addEventListener('load',()=>{delete frame.dataset.paperLoading;});}
 const wash=document.createElement('div');wash.className='earth-white-wash';wash.setAttribute('aria-hidden','true');root.querySelector('.earth-app').append(wash);
 const heading=document.createElement('h2');heading.className='feature-heading';root.querySelector('.earth-header').append(heading);
 function sync(){
  const open=panels.some(panel=>!panel.hidden);
  root.classList.toggle('feature-open',open);
  const glove=root.querySelector('.glove-direct-grid'),extra=root.querySelector('.earth-extra-menu'),music=root.querySelector('.earth-music-panel');
  root.classList.toggle('gloves-open',!glove.hidden);
  const source=!glove.hidden?glove.querySelector('h2'):!extra.hidden?extra.querySelector('.earth-extra-heading span'):!music.hidden?music.querySelector('h2'):null;
  const title=source?.textContent||'';if(heading.textContent!==title)heading.textContent=title;
  if(open)root.scrollTop=0;
  root.inert=document.body.classList.contains('bm-open')||overlays.some(overlay=>overlay.classList.contains('active'));
  for(const e of root.querySelectorAll('.earth-stage,.earth-city-panel,.earth-world,.earth-footer'))e.inert=open;
 }
 const observer=new MutationObserver(sync);
 function observe(){for(const panel of panels)observer.observe(panel,{attributes:true,attributeFilter:['hidden']});for(const h of root.querySelectorAll('.glove-edition-label,.earth-extra-heading span,.earth-music-panel h2'))observer.observe(h,{childList:true,subtree:true,characterData:true});for(const overlay of [document.body,...overlays])observer.observe(overlay,{attributes:true,attributeFilter:['class']});}
 observe();sync();
 window.addEventListener('pagehide',()=>{observer.disconnect();loading.disconnect();});
 window.addEventListener('pageshow',()=>{observe();for(const frame of frames)loading.observe(frame,{attributes:true,attributeFilter:['src']});sync();});
}
