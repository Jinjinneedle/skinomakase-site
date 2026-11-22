/* Two muted video layers: prepare the next clip before revealing its first frame. */
(() => {
window.SKMCreateBackground=(sources)=>{
 const host=document.createElement('div');host.id='home-background';host.setAttribute('aria-hidden','true');document.body.prepend(host);
 if(!sources.length)return {pause(){},resume(){}};
 const videos=[0,1].map(()=>{const v=document.createElement('video');v.muted=true;v.defaultMuted=true;v.playsInline=true;v.setAttribute('playsinline','');v.setAttribute('muted','');v.preload='auto';v.tabIndex=-1;host.append(v);return v;});
 let active=0,index=0,wanted=false,switching=false,failures=0,epoch=0,pendingFrame=null;
 const prepare=(v,i)=>{v.src=sources[i];v.load();};
 videos[0].poster='app/backgrounds/poster.png';videos[0].classList.add('active');prepare(videos[0],0);prepare(videos[1],1%sources.length);
 async function advance(){
  if(!wanted||switching)return;
  const old=videos[active],next=videos[1-active];if(next.readyState<2)return;switching=true;const run=++epoch;
  try{next.currentTime=0;await next.play();if(!wanted||run!==epoch){next.pause();switching=false;return;}
   const reveal=()=>{pendingFrame=null;if(!wanted||run!==epoch){next.pause();switching=false;return;}active=1-active;index=(index+1)%sources.length;next.classList.add('active');old.classList.remove('active');failures=0;
    setTimeout(()=>{old.pause();prepare(old,(index+1)%sources.length);switching=false;},180);
   };
   if(next.requestVideoFrameCallback)pendingFrame={video:next,id:next.requestVideoFrameCallback(reveal)};else reveal();
  }catch{switching=false;}
 }
 videos.forEach(v=>{
  v.addEventListener('timeupdate',()=>{if(v===videos[active]&&Number.isFinite(v.duration)&&v.duration-v.currentTime<.25)advance();});
  v.addEventListener('ended',()=>{if(v===videos[active])advance();});
  v.addEventListener('canplay',()=>{if(wanted){if(v===videos[active])v.play().catch(()=>{});else if(videos[active].ended)advance();}});
  v.addEventListener('error',()=>{failures++;if(failures>=sources.length){wanted=false;return;}if(v!==videos[active]){index=(index+1)%sources.length;prepare(v,(index+1)%sources.length);}});
 });
 return {pause(){wanted=false;epoch++;if(pendingFrame){pendingFrame.video.cancelVideoFrameCallback(pendingFrame.id);pendingFrame=null;switching=false;}videos.forEach(v=>v.pause());},resume(){if(document.hidden)return;wanted=true;if(videos[active].ended)advance();else videos[active].play().catch(()=>{});}};
};
})();
