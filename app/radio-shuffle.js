// Cancellation and bounded retries prevent a late lookup from restarting stopped audio.
export function createRadioShuffle({loadStations,play,current,canPlay=()=>true,onSearching=()=>{},onError=()=>{},random=Math.random}){
 let pool=[],pending=null,generation=0,queue=[],activeId=null;
 function prefetch(){
  if(pool.length)return Promise.resolve(pool);
  if(!pending)pending=Promise.resolve().then(loadStations).then(rows=>{pool=rows;return pool;}).finally(()=>{pending=null;});
  return pending;
 }
 function cancel(){generation++;queue=[];activeId=null;onSearching(false);}
 function next(run){
  if(run!==generation)return;
  if(!canPlay()){cancel();return;}
  const station=queue.shift();
  if(!station){activeId=null;onError();return;}
  activeId=station.id;void play(station);
 }
 async function start(){
  const run=++generation;activeId=null;queue=[];onSearching(true);
  try{
   const rows=await prefetch();if(run!==generation)return;
   if(!canPlay()){cancel();return;}
   const candidates=rows.filter(r=>r.id!==current()?.id&&r.stream!==current()?.stream);
   for(let i=candidates.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[candidates[i],candidates[j]]=[candidates[j],candidates[i]];}
   queue=candidates.slice(0,3);onSearching(false);next(run);
  }catch{if(run===generation){onSearching(false);onError();}}
 }
 function observe(state){
  if(state.status==='paused'||state.status==='idle'){cancel();return;}
  if(state.station?.id!==activeId)return;
  if(state.status==='error'){const run=generation;queueMicrotask(()=>next(run));}
  else if(state.status==='playing'){activeId=null;queue=[];}
 }
 return {start,cancel,prefetch,observe};
}
