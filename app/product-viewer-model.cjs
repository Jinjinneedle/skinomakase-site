'use strict';
function fitDistance(radius,aspect,fov=40){
 if(!Number.isFinite(radius)||radius<=0||!Number.isFinite(aspect)||aspect<=0)throw new Error('Invalid model bounds');
 const vertical=fov*Math.PI/180,horizontal=2*Math.atan(Math.tan(vertical/2)*aspect);
 return radius/Math.sin(Math.min(vertical,horizontal)/2)*1.12;
}
function boxDistance(size,aspect,fov=40){
 if(!Array.isArray(size)||size.length!==3||size.some(v=>!Number.isFinite(v)||v<0)||size[0]+size[1]<=0||!Number.isFinite(aspect)||aspect<=0)throw new Error('Invalid model bounds');
 const tangent=Math.tan(fov*Math.PI/360);
 return (Math.max(size[1]/(2*tangent),size[0]/(2*tangent*aspect))+size[2]/2)*1.15;
}
function assetPath(value){
 // Only packaged models can be deep-linked. No arbitrary network/file URL fetching.
 return typeof value==='string'&&/^models\/[a-zA-Z0-9_-]+\.glb$/.test(value)?value:null;
}
module.exports={fitDistance,boxDistance,assetPath};
