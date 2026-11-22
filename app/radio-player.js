import {secureURL} from './live-data.js';

// A single player outlives the map's panels. A new source gets a new audio
// element so late events/promises from the previous station cannot win a race.
export function createRadioPlayer({createAudio,onChange=()=>{},beforePlay=()=>{},timeout=20000}){
 let audio=null,station=null,status='idle',generation=0,timer=null;
 const snapshot=()=>({station,status,audio});
 const emit=()=>onChange(snapshot());
 const clearTimer=()=>{clearTimeout(timer);timer=null;};
 function release(){clearTimer();const old=audio;audio=null;if(old){old.pause();old.removeAttribute('src');old.load();old.remove?.();}}
 function pause(){generation++;release();status=station?'paused':'idle';emit();}
 function stop(){generation++;release();station=null;status='idle';emit();}
 async function play(next=station){
  if(!next||!secureURL(next.stream))return;
  const token=++generation;release();station=next;status='loading';
  const element=createAudio();audio=element;element.preload='none';element.src=next.stream;
  const current=()=>generation===token&&audio===element;
  const fail=()=>{if(!current())return;generation++;release();status='error';emit();};
  const waiting=()=>{if(!current())return;status='loading';clearTimer();timer=setTimeout(fail,timeout);emit();};
  element.addEventListener('playing',()=>{if(current()){clearTimer();status='playing';emit();}});
  element.addEventListener('waiting',waiting);
  element.addEventListener('stalled',()=>{if(current()&&!timer)timer=setTimeout(fail,timeout);});
  element.addEventListener('error',fail);element.addEventListener('ended',fail);
  element.addEventListener('pause',()=>{if(current()&&status!=='error')pause();});
  timer=setTimeout(fail,timeout);emit();
  try{beforePlay(element,next);await element.play();}catch{fail();}
 }
 function toggle(){if(status==='playing'||status==='loading')pause();else void play();}
 return {play,pause,stop,toggle,snapshot};
}
