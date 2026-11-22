import * as THREE from 'three';

// Geometry, not a background image: dots stay on the map through rotation and zoom.
export function mountSurveyEarth(globe,vector,isLand,R){
 const group=new THREE.Group();globe.add(group);
 const black=new THREE.Mesh(new THREE.SphereGeometry(R-.028,96,48),new THREE.MeshBasicMaterial({color:0x010203}));group.add(black);
 const positions=[],colours=[],c=new THREE.Color();
 for(let lat=-86;lat<=86;lat+=1.25){const step=1.25/Math.max(.12,Math.cos(lat*Math.PI/180));for(let lon=-180;lon<180;lon+=step){const land=isLand(lon,lat),seed=Math.sin(lat*91.7+lon*23.9)*.5+.5;c.set(land?'#89b841':'#426eaa');c.multiplyScalar(.82+seed*.3);if(!land&&Math.floor((lon+180)/step)%19===0)c.set('#702b3a');const p=vector(lat,lon,R+.007);positions.push(p.x,p.y,p.z);colours.push(c.r,c.g,c.b);}}
 const dots=new THREE.Points(new THREE.BufferGeometry().setAttribute('position',new THREE.Float32BufferAttribute(positions,3)).setAttribute('color',new THREE.Float32BufferAttribute(colours,3)),new THREE.PointsMaterial({vertexColors:true,size:.064,transparent:true,opacity:1,depthWrite:false,toneMapped:false}));group.add(dots);
 let logoDots=null;
 function setLogo(mask,relief,width,height,depth){
  if(logoDots){group.remove(logoDots);logoDots.geometry.dispose();logoDots.material.dispose();}
  const p=[],color=[],tone=new THREE.Color();
  for(let y=0;y<height;y+=6)for(let x=0;x<width;x+=6){
   const index=y*width+x,alpha=mask[index*4+3]/255;if(alpha<.28)continue;
   const lon=x/width*360-180,lat=90-y/height*180;
   if(isLand(lon,lat))continue;
   const heightAt=relief[index],point=vector(lat,lon,R+.018+heightAt*.11*depth);
   p.push(point.x,point.y,point.z);tone.set('#dce6d5').multiplyScalar(.6+heightAt*.7);color.push(tone.r,tone.g,tone.b);
  }
  logoDots=new THREE.Points(new THREE.BufferGeometry().setAttribute('position',new THREE.Float32BufferAttribute(p,3)).setAttribute('color',new THREE.Float32BufferAttribute(color,3)),new THREE.PointsMaterial({vertexColors:true,size:.064,transparent:true,opacity:1,depthWrite:false,toneMapped:false}));
  logoDots.name='SKM ocean dot logo';group.add(logoDots);
 }
 const debris=[],debrisColours=[];
 for(let i=0;i<1500;i++){const a=i*2.39996323,y=1-2*(i+.5)/1500,r=Math.sqrt(1-y*y),rad=R*(1.055+.1*(Math.sin(i*18.71)*.5+.5));debris.push(Math.cos(a)*r*rad,y*rad,Math.sin(a)*r*rad);c.set(['#8faaa0','#d49b62','#506f9d','#b8c6cf'][i%4]);debrisColours.push(c.r,c.g,c.b);}
 const particles=new THREE.Points(new THREE.BufferGeometry().setAttribute('position',new THREE.Float32BufferAttribute(debris,3)).setAttribute('color',new THREE.Float32BufferAttribute(debrisColours,3)),new THREE.PointsMaterial({vertexColors:true,size:.037,transparent:true,opacity:.65,depthWrite:false,toneMapped:false}));group.add(particles);
 const orbits=[];
 for(const [tilt,spin,tone] of [[.52,.65,'#b1c7bc'],[-.91,.3,'#536c91'],[1.12,-.8,'#762c37']]){const pts=[];for(let i=0;i<=200;i++){const a=i/200*Math.PI*2;pts.push(new THREE.Vector3(Math.cos(a)*R*1.055,Math.sin(a)*R*1.055,0));}const l=new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts),new THREE.LineBasicMaterial({color:tone,transparent:true,opacity:.48,depthWrite:false}));l.rotation.set(tilt,spin,.25);orbits.push(l);group.add(l);}
 return {setLogo,logoCount:()=>logoDots?.geometry.attributes.position.count||0,update(focus,seconds){group.visible=focus<.995;const a=1-focus;dots.material.opacity=a;if(logoDots)logoDots.material.opacity=a;particles.material.opacity=a*.65;particles.rotation.y=seconds*.003;orbits.forEach(l=>l.material.opacity=a*.48);black.visible=focus<.5;}};
}
