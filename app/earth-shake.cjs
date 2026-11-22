'use strict';
// User acceleration is gravity-free, in g. Ordinary tilt and walking are ignored.
// Require two opposing strong peaks, then wait for the gesture to finish.
function createShakeDetector(){
 let peak=null,last=-Infinity;
 return {
  reset(){peak=null;},
  sample(a,time,enabled=true){
   if(!enabled||!Number.isFinite(time)||!a||![a.x,a.y,a.z].every(Number.isFinite)){peak=null;return 0;}
   if(time-last<2200){peak=null;return 0;}
   if(peak&&(time-peak.time>450||time<peak.time))peak=null;
   const magnitude=Math.hypot(a.x,a.y,a.z);
   if(magnitude<1.15)return 0;
   if(peak){
    const elapsed=time-peak.time;
    const alignment=(a.x*peak.x+a.y*peak.y+a.z*peak.z)/(magnitude*peak.magnitude);
    if(elapsed>=40&&elapsed<=450&&alignment<-.35){
     const direction=Math.abs(peak.x)>.45?Math.sign(peak.x):1;
     last=time;peak=null;return direction;
    }
    return 0; // Preserve the first peak across successive 30Hz samples.
   }
   peak={...a,time,magnitude};return 0;
  }
 };
}
// Exact exponential integration: about one full turn, then a smooth three-second stop.
function stepGlobeSpin(speed,dt){
 if(!Number.isFinite(speed)||!Number.isFinite(dt)||dt<=0)return {delta:0,speed:0};
 const seconds=Math.min(dt,.05),next=speed*Math.exp(-2*seconds);
 return {delta:(speed-next)/2,speed:Math.abs(next)<2?0:next};
}
module.exports={createShakeDetector,stepGlobeSpin};
