import zoneCentres from './zone-centres.json';
import * as THREE from 'three';

// Approximate solar position from UTC and the representative city in the device time zone.
const deviceZone=Intl.DateTimeFormat().resolvedOptions().timeZone;
export function solarVector(date) {
  const radians=Math.PI/180;
  const day=(date-Date.UTC(date.getUTCFullYear(),0,1))/86400000;
  const angle=2*Math.PI*day/365.2422;
  const dec=.006918-.399912*Math.cos(angle)+.070257*Math.sin(angle)-.006758*Math.cos(2*angle)+.000907*Math.sin(2*angle)-.002697*Math.cos(3*angle)+.00148*Math.sin(3*angle);
  const eq=229.18*(.000075+.001868*Math.cos(angle)-.032077*Math.sin(angle)-.014615*Math.cos(2*angle)-.040849*Math.sin(2*angle));
  const lon=(180-(date.getUTCHours()*60+date.getUTCMinutes()+eq)/4)*radians;
  return new THREE.Vector3(Math.cos(dec)*Math.cos(lon),Math.sin(dec),-Math.cos(dec)*Math.sin(lon));
}
export function localNight(date, sun, centre=zoneCentres[deviceZone]){
  const radians=Math.PI/180;
  const [lat,lon]=centre||[0,-date.getTimezoneOffset()/4];
  const altitude=Math.asin(THREE.MathUtils.clamp(sun.x*Math.cos(lat*radians)*Math.cos(lon*radians)+sun.y*Math.sin(lat*radians)-sun.z*Math.cos(lat*radians)*Math.sin(lon*radians),-1,1))/radians;
  return 1-THREE.MathUtils.smoothstep(altitude,-7,7);
}

export function createAirTraffic(routes) {
  // The nose points along local +Y; each aircraft uses the line's own sampled vertices.
  const outline = new THREE.Shape();
  const points = [[0,1],[.10,.65],[.10,.18],[.89,-.26],[.88,-.42],[.10,-.19],
    [.09,-.63],[.31,-.83],[.30,-.95],[0,-.83],[-.30,-.95],[-.31,-.83],
    [-.09,-.63],[-.10,-.19],[-.88,-.42],[-.89,-.26],[-.10,.18],[-.10,.65]];
  points.forEach(([x,y],i) => i ? outline.lineTo(x,y) : outline.moveTo(x,y));
  outline.closePath();
  const geometry = new THREE.ShapeGeometry(outline);
  const material = new THREE.MeshBasicMaterial({color:0xd2ebff,side:THREE.DoubleSide});
  const group = new THREE.Group();
  const flights = routes.map((route,i) => {
    const plane = new THREE.Mesh(geometry,material);
    plane.scale.setScalar(.14);
    group.add(plane);
    return {plane,route,phase:(.17+i*.381966)%1,duration:28+route[0].distanceTo(route.at(-1))*2.6};
  });
  const forward=new THREE.Vector3(), up=new THREE.Vector3(), right=new THREE.Vector3(), basis=new THREE.Matrix4();
  function update(seconds) {
    for (const {plane,route,phase,duration} of flights) {
      const progress=(seconds/duration+phase)%1, sample=progress*(route.length-1), i=Math.floor(sample);
      plane.position.lerpVectors(route[i],route[i+1],sample-i);
      forward.subVectors(route[i+1],route[i]).normalize();
      up.copy(plane.position).normalize(); right.crossVectors(forward,up).normalize(); up.crossVectors(right,forward);
      plane.quaternion.setFromRotationMatrix(basis.makeBasis(right,forward,up));
      plane.scale.setScalar(.14*Math.min(1,progress*18,(1-progress)*18));
    }
  }
  update(0);
  return {group,update};
}

export function cityLights(cities,vector,isLand,radius) {
  const positions=[], colors=[];
  let seed=87251;
  const random=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);
  for (const {lat,lon} of cities) {
    for(let i=0;i<105;i++){
      const a=random()*Math.PI*2, d=random()**1.5*1.65;
      const y=lat+Math.sin(a)*d*.64,x=lon+Math.cos(a)*d/Math.cos(lat*Math.PI/180);
      if(!isLand(x,y))continue;
      const p=vector(y,x,radius+.035);
      positions.push(p.x,p.y,p.z); colors.push(1,.57+random()*.35,.29+random()*.23);
    }
  }
  const geometry=new THREE.BufferGeometry();
  geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
  geometry.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));
  return new THREE.Points(geometry,new THREE.PointsMaterial({vertexColors:true,size:.036,transparent:true,
    depthWrite:false,blending:THREE.AdditiveBlending,toneMapped:false}));
}
