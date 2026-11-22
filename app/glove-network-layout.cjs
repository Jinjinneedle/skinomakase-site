'use strict';
// A single central hub; every glove has its own radial spoke.
function gloveNetwork(count,width=357,availableHeight){
 width=Math.max(1,Number(width)||357);
 const screenWidth=width,screenHeight=Math.max(1,Number(availableHeight)||Math.max(640,Math.round(225000/width)));
 // Fit the entire constellation, including its touch targets, into the available viewport.
 const scale=Math.min(1,Math.sqrt(screenWidth*screenHeight/225000),screenWidth/240,screenHeight/240);
 width=screenWidth/scale;
 const height=screenHeight/scale,center={x:width/2,y:height/2};
 if(!Number.isInteger(count)||count<1||count>50)return {width:screenWidth,height:screenHeight,center:{x:screenWidth/2,y:screenHeight/2},scale,points:[]};
 const rx=width/2-24,ry=height/2-24,radii=[.27,.50,.74,1],phases=[0,.24,-.08,.04];
 const counts=[Math.round(count*.12),Math.round(count*.20),Math.round(count*.28)];counts.push(count-counts.reduce((a,b)=>a+b,0));
 const points=[];
 counts.forEach((n,k)=>{for(let j=0;j<n;j++){const angle=-Math.PI/2+j/n*Math.PI*2+phases[k];points.push({x:center.x+Math.cos(angle)*rx*radii[k],y:center.y+Math.sin(angle)*ry*radii[k]});}});
 // Keep radial spokes and separate touch targets before uniformly fitting the screen.
 for(let pass=0;pass<450;pass++){
  for(let i=0;i<count;i++)for(let j=i+1;j<count;j++){
   const a=points[i],b=points[j],dx=b.x-a.x,dy=b.y-a.y,px=48-Math.abs(dx),py=48-Math.abs(dy);
   if(px>0&&py>0){if(px<py){const d=(Math.sign(dx)||1)*(px/2+.01);a.x-=d;b.x+=d;}else{const d=(Math.sign(dy)||1)*(py/2+.01);a.y-=d;b.y+=d;}}
  }
  for(const p of points){
   p.x=Math.max(24,Math.min(width-24,p.x));p.y=Math.max(24,Math.min(height-24,p.y));
   if(Math.abs(p.x-center.x)<64&&Math.abs(p.y-center.y)<44){
    if(64-Math.abs(p.x-center.x)<44-Math.abs(p.y-center.y))p.x=center.x+(Math.sign(p.x-center.x)||1)*64;
    else p.y=center.y+(Math.sign(p.y-center.y)||1)*44;
   }
  }
 }
 return {width:screenWidth,height:screenHeight,center:{x:screenWidth/2,y:screenHeight/2},scale,points:points.map(p=>({x:p.x*scale,y:p.y*scale}))};
}
module.exports={gloveNetwork};
