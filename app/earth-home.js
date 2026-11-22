import {createShakeDetector,stepGlobeSpin} from './earth-shake.cjs';
import {mountEarthLive} from './earth-live.js';
import {mountSurveyEarth} from './survey-earth.js';
import {mountOrbitalSky} from './orbit-sky.js';
import {mountNaturePins} from './nature-pins.js';
import {localNight,solarVector,createAirTraffic,cityLights} from './earth-traffic.js';
import {mountOnboarding} from './onboarding.js';
import {mountEarthLanguage} from './earth-language.js';
import {mountFeatureSurface} from './feature-surface.js';
import {mountGloveDirect} from './glove-direct.js';
import {gloveDropPlan} from './glove-drop-plan.js';
import {createIcons,Languages,UserRound,Minus,Plus,Move3d,LockKeyhole,Hand,ArrowUpRight,X,PenTool,Headphones,Play,ChevronRight,ArrowLeft,Grid2x2} from 'lucide';
const lucide={createIcons:()=>createIcons({icons:{Languages,UserRound,Minus,Plus,Move3d,LockKeyhole,Hand,ArrowUpRight,X,PenTool,Headphones,Play,ChevronRight,ArrowLeft,Grid2x2}})};
import * as THREE from 'three';
import {geoEquirectangular,geoPath,geoInterpolate} from 'd3-geo';
import {feature,mesh} from 'topojson-client';

const root=document.getElementById('skm-earth-preview'),stage=root.querySelector('.earth-stage'),canvas=root.querySelector('canvas'),status=root.querySelector('.earth-message'),markerLayer=root.querySelector('.earth-markers');
const world=JSON.parse(document.getElementById('skm-earth-geography').textContent),rawCities=JSON.parse(document.getElementById('skm-earth-cities').textContent);
const countryNames={KR:'대한민국',JP:'일본',GB:'영국',FR:'프랑스',CA:'캐나다',US:'미국',HK:'홍콩',SG:'싱가포르'};
const countryCodes={KR:'KOR',JP:'JPN',GB:'GBR',FR:'FRA',CA:'CAN',US:'USA',SG:'SGP'};
const order=['1835848','1850147','1853909','2643743','2988507','6167865','6173331','6077243','5368361','5128581','1819729','1880252'];
const names=['서울','도쿄','오사카','런던','파리','토론토','밴쿠버','몬트리올','로스앤젤레스','뉴욕','홍콩','싱가포르'];
const cities=order.map((id,i)=>({...rawCities.find(c=>c.id===id),ko:names[i],label:i===9?'NEW YORK':i===8?'LOS ANGELES':rawCities.find(c=>c.id===id).ascii.toUpperCase(),features:['tattoo','gloves','music','dgtg','more']}));
const countries=feature(world,world.objects.features).features,borders=mesh(world,world.objects.features);
const R=5,rad=Math.PI/180,clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const oceanHome={lon:100,lat:24};
const state={...oceanHome,logoMode:'survey-earth-v1',zoom:1,selected:'1835848',elasticity:60,relief:65,engraving:70,connections:true,cityFocus:false};
const current={...oceanHome,zoom:1,focus:0},velocity={lon:0,lat:0,zoom:0,focus:0},bend={x:0,y:0,vx:0,vy:0,tx:0,ty:0};
let W=736,H=490,baseDistance=17,cityDistance=17,frame=0,lastTime=0,saveTimer=0,gesture=null,pinch=null,suppressUntil=0,demoTimer=0,sensorTimer=0,sensorOn=false,sensorBase=null;
const pointers=new Map();
const shakeDetector=createShakeDetector();let shakeSpeed=0;
function stopShake(){shakeSpeed=0;shakeDetector.reset();}
function vector(lat,lon,r=R){return new THREE.Vector3(Math.cos(lat*rad)*Math.cos(lon*rad)*r,Math.sin(lat*rad)*r,-Math.cos(lat*rad)*Math.sin(lon*rad)*r);}
function save(){clearTimeout(saveTimer);saveTimer=setTimeout(()=>{try{localStorage.setItem('skm-earth-view-v1',JSON.stringify({privateContent:{skmBlueEarth:{...state}}}));}catch(_){}},180);}
function restore(snapshot){const v=snapshot?.privateContent?.skmBlueEarth;if(!v)return;for(const key of ['lon','lat','zoom','elasticity','relief','engraving'])if(Number.isFinite(v[key])&&(!['lon','lat'].includes(key)||v.logoMode===state.logoMode))state[key]=v[key];state.engraving=clamp(state.engraving,0,100);state.lat=clamp(state.lat,-75,75);state.zoom=clamp(state.zoom,.75,2.6);if(cities.some(c=>c.id===v.selected))state.selected=v.selected;state.connections=v.connections!==false;state.cityFocus=false;state.zoom=1;Object.assign(current,{lon:state.lon,lat:state.lat,zoom:state.zoom,focus:state.cityFocus?1:0});}
try{restore(JSON.parse(localStorage.getItem('skm-earth-view-v1')||'null'));}catch(_){}
const scene=new THREE.Scene(),globe=new THREE.Group();scene.add(globe);
const camera=new THREE.PerspectiveCamera(46,1,.1,100);
let renderer;
try{renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true,powerPreference:'low-power'});}catch(error){status.textContent='이 화면에서는 지구본을 시작하지 못했어요. 브라우저에서 다시 열어주세요.';throw error;}
renderer.setPixelRatio(Math.min(devicePixelRatio||1,2));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.2;
scene.add(new THREE.AmbientLight('#d6e4ff',.9));
const sun=new THREE.DirectionalLight('#fffaf1',3.8);scene.add(sun);
scene.add(new THREE.HemisphereLight('#d4e7ff','#91a2b8',.55));

// Geographic geometry is projected to a texture with d3-geo; no invented outlines.
const tw=2048,th=1024,mapCanvas=document.createElement('canvas'),landCanvas=document.createElement('canvas');
const mapWidth=Math.min(4096,renderer.capabilities.maxTextureSize),mapHeight=mapWidth/2;
mapCanvas.width=mapWidth;mapCanvas.height=mapHeight;landCanvas.width=tw;landCanvas.height=th;

const mapContext=mapCanvas.getContext('2d'),landContext=landCanvas.getContext('2d',{willReadFrequently:true});
const projection=geoEquirectangular().scale(tw/(2*Math.PI)).translate([tw/2,th/2]);
const mapProjection=geoEquirectangular().scale(mapWidth/(2*Math.PI)).translate([mapWidth/2,mapHeight/2]);
const mapPath=geoPath(mapProjection,mapContext),landPath=geoPath(projection,landContext);
stage.dataset.surfaceResolution=mapWidth+'×'+mapHeight;
landContext.fillStyle='#ffffff';for(const c of countries){landContext.beginPath();landPath(c);landContext.fill();}
const landPixels=landContext.getImageData(0,0,tw,th).data;
function isLand(lon,lat){const x=clamp(Math.floor((lon+180)/360*tw),0,tw-1),y=clamp(Math.floor((90-lat)/180*th),0,th-1);return landPixels[(y*tw+x)*4+3]>100;}
const mapTexture=new THREE.CanvasTexture(mapCanvas);mapTexture.colorSpace=THREE.SRGBColorSpace;mapTexture.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());
let reliefCanvas=null,terrainHeights=null,logoMask=null,logoRelief=null,logoShade=null,dayImage=null,lastEngraving=null;
const stamp={lon:-158,lat:3,width:56,height:28};
const engravingCanvas=document.createElement('canvas');engravingCanvas.width=tw;engravingCanvas.height=th;
const engravingContext=engravingCanvas.getContext('2d',{willReadFrequently:true});
const bumpCanvas=document.createElement('canvas');bumpCanvas.width=tw;bumpCanvas.height=th;
const bumpContext=bumpCanvas.getContext('2d');
const bumpTexture=new THREE.CanvasTexture(bumpCanvas);bumpTexture.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());
function paintMap(){
  mapContext.fillStyle='#042444';mapContext.fillRect(0,0,mapWidth,mapHeight);
  if(dayImage){mapContext.drawImage(dayImage,0,0,mapWidth,mapHeight);}else{
    mapContext.fillStyle='#466356';for(const c of countries){mapContext.beginPath();mapPath(c);mapContext.fill();}
  }
  if(logoShade){mapContext.save();mapContext.globalCompositeOperation='source-over';mapContext.globalAlpha=state.engraving/100*.76;mapContext.drawImage(logoShade,0,0,mapWidth,mapHeight);mapContext.restore();}
  mapTexture.needsUpdate=true;
}
paintMap();
const surfaceMaterial=new THREE.MeshStandardMaterial({map:mapTexture,roughness:.9,metalness:0,bumpScale:.025,transparent:true});
const sunUniform={value:solarVector(new Date())};
surfaceMaterial.userData.solar=sunUniform;
surfaceMaterial.onBeforeCompile=shader=>{
  shader.uniforms.skmSun=sunUniform;
  shader.vertexShader='varying vec3 skmEarthNormal;\n'+shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\n skmEarthNormal=normalize(position);');
  shader.fragmentShader=shader.fragmentShader.replace('#include <map_fragment>','#include <map_fragment>\n float surveyLuma=dot(diffuseColor.rgb,vec3(.2126,.7152,.0722)); diffuseColor.rgb=mix(vec3(surveyLuma),diffuseColor.rgb,.24)*vec3(.8,.94,.96);');
  shader.fragmentShader='uniform vec3 skmSun; varying vec3 skmEarthNormal;\n'+shader.fragmentShader.replace('#include <opaque_fragment>','outgoingLight*=mix(.66,1.,smoothstep(-.18,.18,dot(normalize(skmEarthNormal),skmSun)));\n#include <opaque_fragment>');
};
const roughCanvas=document.createElement('canvas');roughCanvas.width=tw;roughCanvas.height=th;const roughContext=roughCanvas.getContext('2d'),roughPixels=roughContext.createImageData(tw,th);
for(let i=0;i<roughPixels.data.length;i+=4){const value=landPixels[i+3]>100?235:72;roughPixels.data[i]=roughPixels.data[i+1]=roughPixels.data[i+2]=value;roughPixels.data[i+3]=255;}roughContext.putImageData(roughPixels,0,0);surfaceMaterial.roughnessMap=new THREE.CanvasTexture(roughCanvas);
const surfaceSegments=matchMedia('(pointer:coarse)').matches?320:480;
const surfaceGeometry=new THREE.SphereGeometry(R,surfaceSegments,surfaceSegments/2);
const originalPositions=new Float32Array(surfaceGeometry.attributes.position.array);
const surface=new THREE.Mesh(surfaceGeometry,surfaceMaterial);globe.add(surface);
const surveyEarth=mountSurveyEarth(globe,vector,isLand,R);
// Authored bathymetric logo: raised relief, not real seafloor survey data.
function terrainNoise(x,y){
  const ix=Math.floor(x),iy=Math.floor(y),fx=x-ix,fy=y-iy,ux=fx*fx*(3-2*fx),uy=fy*fy*(3-2*fy);
  const hash=(a,b)=>{const n=Math.sin(a*127.1+b*311.7)*43758.5453;return n-Math.floor(n);};
  const a=hash(ix,iy)*(1-ux)+hash(ix+1,iy)*ux,b=hash(ix,iy+1)*(1-ux)+hash(ix+1,iy+1)*ux;
  return a*(1-uy)+b*uy;
}
function ridgeHeight(x,y){
  const warp=terrainNoise(x*.11,y*.11)*2.4;
  const ridge=(scale)=>Math.pow(1-Math.abs(2*terrainNoise(x*scale+warp,y*scale-warp)-1),2);
  return .38+.34*ridge(.20)+.19*ridge(.43)+.09*ridge(.91);
}
function sampleLogo(u,v){
  if(!logoRelief)return 0;const x=clamp(u*(tw-1),0,tw-1),y=clamp((1-v)*(th-1),0,th-1),x0=Math.floor(x),y0=Math.floor(y),x1=Math.min(x0+1,tw-1),y1=Math.min(y0+1,th-1),fx=x-x0,fy=y-y0;
  const a=logoRelief[y0*tw+x0]*(1-fx)+logoRelief[y0*tw+x1]*fx,b=logoRelief[y1*tw+x0]*(1-fx)+logoRelief[y1*tw+x1]*fx;
  return a*(1-fy)+b*fy;
}
function updateBump(){
  const pixels=bumpContext.createImageData(tw,th),depth=state.engraving/100;
  for(let i=0;i<pixels.data.length;i+=4){const terrain=terrainHeights?terrainHeights[i]*.3:0,ridge=logoRelief?logoRelief[i/4]*145*depth:0,v=clamp(Math.round(100+terrain+ridge),0,255);pixels.data[i]=pixels.data[i+1]=pixels.data[i+2]=v;pixels.data[i+3]=255;}
  bumpContext.putImageData(pixels,0,0);bumpTexture.needsUpdate=true;surfaceMaterial.bumpMap=bumpTexture;surfaceMaterial.needsUpdate=true;
}
function applyEngraving(){
  if(!logoRelief||lastEngraving===state.engraving)return;lastEngraving=state.engraving;const pos=surfaceGeometry.attributes.position,uv=surfaceGeometry.attributes.uv,height=.11*state.engraving/100;let count=0,minimum=R,maximum=0;
  for(let i=0;i<pos.count;i++){const rise=sampleLogo(uv.getX(i),uv.getY(i))*height,scale=(R+rise)/R,j=i*3;pos.setXYZ(i,originalPositions[j]*scale,originalPositions[j+1]*scale,originalPositions[j+2]*scale);if(rise>.0001)count++;minimum=Math.min(minimum,R+rise);maximum=Math.max(maximum,R+rise);}
  pos.needsUpdate=true;surfaceGeometry.computeVertexNormals();surfaceGeometry.computeBoundingSphere();
  stage.dataset.logoRelief='raised-ocean-ridge';stage.dataset.logoLongitude=String(stamp.lon);stage.dataset.logoLatitude=String(stamp.lat);stage.dataset.raisedVertices=String(count);stage.dataset.minimumRadius=minimum.toFixed(4);stage.dataset.maximumRadius=maximum.toFixed(4);stage.dataset.engraving=String(state.engraving);updateBump();paintMap();wake();
}
function prepareLogo(){
  const logo=root.querySelector('.earth-logo img');if(!logo.naturalWidth)return;
  const x=(stamp.lon+180-stamp.width/2)/360*tw,y=(90-stamp.lat-stamp.height/2)/180*th,w=stamp.width/360*tw,h=stamp.height/180*th;
  engravingContext.clearRect(0,0,tw,th);engravingContext.filter='blur(1px)';for(const wrap of [-tw,0,tw])engravingContext.drawImage(logo,127,395,1020,507,x+wrap,y,w,h);engravingContext.filter='none';logoMask=engravingContext.getImageData(0,0,tw,th).data;
  logoRelief=new Float32Array(tw*th);logoShade=document.createElement('canvas');logoShade.width=tw;logoShade.height=th;const shade=logoShade.getContext('2d'),colors=shade.createImageData(tw,th);
  for(let py=Math.max(0,Math.floor(y)-5);py<Math.min(th,Math.ceil(y+h)+5);py++)for(let rawX=Math.floor(x)-5;rawX<Math.ceil(x+w)+5;rawX++){
    const px=((rawX%tw)+tw)%tw,index=py*tw+px,i=index*4,mask=logoMask[i+3]/255;if(!mask)continue;
    const detail=ridgeHeight(rawX-x,py-y);logoRelief[index]=Math.pow(mask,.85)*detail;
    colors.data[i]=9+detail*20;colors.data[i+1]=47+detail*55;colors.data[i+2]=72+detail*58;colors.data[i+3]=Math.round(mask*220);
    const rough=72+(205-72)*mask;roughPixels.data[i]=roughPixels.data[i+1]=roughPixels.data[i+2]=rough;
  }
  shade.putImageData(colors,0,0);roughContext.putImageData(roughPixels,0,0);surfaceMaterial.roughnessMap.needsUpdate=true;
  surveyEarth.setLogo(logoMask,logoRelief,tw,th,state.engraving/100);
  stage.dataset.logoDots=String(surveyEarth.logoCount());
  lastEngraving=null;applyEngraving();
}
// A camera-centred sphere keeps the stars at optical infinity during a zoom.
const skyMaterial = new THREE.MeshBasicMaterial({
  side: THREE.BackSide, toneMapped: false, depthWrite: false, depthTest: false
});
const starSky = new THREE.Mesh(new THREE.SphereGeometry(70, 64, 32), skyMaterial);
starSky.rotation.set(27 * rad, 36 * rad, 0, 'YXZ');
starSky.renderOrder = -100;
starSky.visible = false;
scene.add(starSky);
new THREE.TextureLoader().load('app/earth-assets/deep-star-map.jpg', texture => {
  texture.colorSpace = THREE.SRGBColorSpace;
  skyMaterial.map = texture;
  skyMaterial.needsUpdate = true;
  starSky.visible = true;
  stage.dataset.starTexture = 'loaded';
  wake();
});

const orbitalSky=mountOrbitalSky(scene,starSky,stage,wake);
const textureLoader=new THREE.TextureLoader();
textureLoader.load('app/earth-assets/earth-day.jpg',texture=>{
  dayImage=texture.image;stage.dataset.dayTexture='loaded';paintMap();texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());surfaceMaterial.map=mapTexture;surfaceMaterial.needsUpdate=true;texture.dispose();wake();
},undefined,()=>{status.textContent='지구 표면 이미지를 불러오지 못했어요.';});
const cloudMaterial=new THREE.MeshStandardMaterial({transparent:true,opacity:.92,depthWrite:false,roughness:1});
const cloudRadiansPerSecond = 2 * Math.PI / 240;
const clouds=new THREE.Mesh(new THREE.SphereGeometry(R*1.018,128,64),cloudMaterial);clouds.visible=false;globe.add(clouds);
textureLoader.load('app/earth-assets/earth-clouds.png',texture=>{
  texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());cloudMaterial.map=texture;cloudMaterial.needsUpdate=true;clouds.visible=true;stage.dataset.cloudTexture='loaded';wake();
},undefined,()=>{status.textContent='구름 이미지를 불러오지 못했어요.';});
new THREE.TextureLoader().load('app/earth-assets/earth-topology.png',texture=>{
  texture.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());
  const heightCanvas=document.createElement('canvas');heightCanvas.width=tw;heightCanvas.height=th;const heightContext=heightCanvas.getContext('2d');heightContext.drawImage(texture.image,0,0,tw,th);
  try{const heights=heightContext.getImageData(0,0,tw,th).data;terrainHeights=heights;reliefCanvas=document.createElement('canvas');reliefCanvas.width=tw;reliefCanvas.height=th;const reliefContext=reliefCanvas.getContext('2d'),pixels=reliefContext.createImageData(tw,th);
    for(let y=1;y<th-1;y++)for(let x=1;x<tw-1;x++){const i=(y*tw+x)*4;if(landPixels[i+3]<100)continue;const slope=(heights[i-4]-heights[i+4])*.7+(heights[i-tw*4]-heights[i+tw*4])*.9;const shade=slope<0?[65,105,142]:[255,255,255];pixels.data[i]=shade[0];pixels.data[i+1]=shade[1];pixels.data[i+2]=shade[2];pixels.data[i+3]=Math.min(155,Math.abs(slope)*6);}
    reliefContext.putImageData(pixels,0,0);updateBump();paintMap();
  }catch(error){/* The base geographic texture and normal relief remain available. */}
  texture.dispose();wake();
},undefined,()=>{status.textContent='지형 음영을 불러오지 못해 국가 윤곽으로 표시하고 있어요.';});
const stipple=[];
for(let lat=-78;lat<84;lat+=.7){const step=.7/Math.max(.25,Math.cos(lat*rad));for(let lon=-180;lon<180;lon+=step){const jitter=Math.sin(lat*197+lon*153)*.2;if(isLand(lon+jitter,lat-jitter)){const p=vector(lat-jitter,lon+jitter,R+.006);stipple.push(p.x,p.y,p.z);}}}
const stippleBase=new Float32Array(stipple),stippleMesh=new THREE.Points(new THREE.BufferGeometry().setAttribute('position',new THREE.Float32BufferAttribute(stipple,3)),new THREE.PointsMaterial({color:'#7198b8',size:.009,transparent:true,opacity:.24,depthWrite:false}));stippleMesh.visible=false;
const atmosphere=new THREE.Mesh(new THREE.SphereGeometry(R*1.014,96,64),new THREE.ShaderMaterial({transparent:true,depthWrite:false,uniforms:{tint:{value:new THREE.Color('#1f9fe5')},lightDirection:{value:new THREE.Vector3(1,1,1).normalize()}},vertexShader:'varying vec3 n; varying vec3 v; void main(){vec4 p=modelViewMatrix*vec4(position,1.);n=normalize(normalMatrix*normal);v=normalize(-p.xyz);gl_Position=projectionMatrix*p;}',fragmentShader:'uniform vec3 tint;uniform vec3 lightDirection;varying vec3 n;varying vec3 v;void main(){float rim=pow(1.-max(0.,dot(normalize(n),normalize(v))),2.4);float day=smoothstep(-.25,.7,dot(normalize(n),normalize(lightDirection)));gl_FragColor=vec4(tint,rim*day*.94);}'}));globe.add(atmosphere);
const sunRight=new THREE.Vector3(),sunUp=new THREE.Vector3();
const arcs=new THREE.Group();globe.add(arcs);
const routePaths=[];
const seoul=cities[0];
for(const city of cities.slice(1)){
  const interpolate=geoInterpolate([seoul.lon,seoul.lat],[city.lon,city.lat]),distance=interpolate.distance,points=[];
  for(let i=0;i<=96;i++){const t=i/96,[lon,lat]=interpolate(t);points.push(vector(lat,lon,R+.025+Math.sin(t*Math.PI)*Math.min(.65,distance*.32)));}
  routePaths.push(points);
  arcs.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points),new THREE.LineBasicMaterial({color:'#7ebfff',transparent:true,opacity:.27})));
}
const traffic=createAirTraffic(routePaths);
traffic.group.scale.setScalar(1);traffic.group.children.forEach(p=>p.scale.setScalar(.045));arcs.add(traffic.group);
const lights=cityLights(cities,vector,isLand,R);globe.add(lights);
    lights.material.userData.solar=sunUniform;
    lights.material.onBeforeCompile=shader=>{
      shader.uniforms.skmSun=sunUniform;
      shader.vertexShader='uniform vec3 skmSun; varying float lightLevel;\n'+shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\n lightLevel=1.-smoothstep(-.22,.08,dot(normalize(position),skmSun));');
      shader.fragmentShader='varying float lightLevel;\n'+shader.fragmentShader.replace('#include <opaque_fragment>','diffuseColor.a*=lightLevel;\n#include <opaque_fragment>');
    };
let globeSeconds=0, lastSceneTime=null, nightMinute=-1, night=0, idleFrame=0;
function updateSky(time){
  if(lastSceneTime!==null&&!reduced)globeSeconds+=Math.min((time-lastSceneTime)/1000,.3);
  lastSceneTime=time;
  const now=Date.now(),minute=Math.floor(now/60000);
  if(nightMinute!==minute){
    nightMinute=minute;const date=new Date(now),solar=solarVector(date);night=localNight(date,solar);
    sunUniform.value.copy(solar);orbitalSky.date(date,solar);
    sun.intensity = 3.8 - 1.9 * night;
    cloudMaterial.opacity = .92 - .26 * night;
    lights.material.opacity=night*.70+.25;

  }
  clouds.rotation.y = globeSeconds * cloudRadiansPerSecond;
  traffic.update(globeSeconds);
  const focus=current.focus;surveyEarth.update(focus,globeSeconds);
  surface.visible=focus>.005;surfaceMaterial.opacity=focus;clouds.visible=focus>.005&&!!cloudMaterial.map;cloudMaterial.opacity=focus*.55;
  atmosphere.visible=focus>.025;arcs.visible=state.connections&&focus>.3;lights.visible=false;starSky.visible=false;
  stage.dataset.cloudAngle=clouds.rotation.y.toFixed(5);stage.dataset.mapMode=focus>.5?'terrain':'survey';
}
function globeVisible(){
  return !document.hidden&&!document.body.classList.contains('bm-open')&&!document.body.classList.contains('district-open')&&!root.classList.contains('feature-open')&&!document.querySelector('dialog[open]');
}
function scheduleSky(){
  clearTimeout(idleFrame);
  if(!globeVisible())return;
  idleFrame=setTimeout(()=>{
    if(!globeVisible()||frame)return;
    updateSky(performance.now());renderer.render(scene,camera);renderPins();scheduleSky();
  },reduced?30000:65);
}
for(const city of cities)city.point=vector(city.lat,city.lon,R+.025);
const selector=root.querySelector('select'),heading=root.querySelector('.earth-city-title h2'),countryLabel=root.querySelector('.earth-country'),focusLabel=root.querySelector('.earth-focus-label');
for(const code of Object.keys(countryNames)){const group=document.createElement('optgroup');group.label=countryNames[code];for(const c of cities.filter(c=>c.country===code)){const o=document.createElement('option');o.value=c.id;o.textContent=c.ko;group.appendChild(o);}selector.appendChild(group);}
const dropPanel=root.querySelector('.earth-drop-panel'),dropGrid=root.querySelector('.earth-drop-grid'),bookingPanel=root.querySelector('.earth-booking-panel'),featureList=root.querySelector('.earth-features');
const featureRegistry={dgtg:{icon:'grid-2x2',title:'DGTG-01',menu:'DGTG-01',subtitle:''},gloves:{icon:'hand',title:'장갑 드롭',menu:'GLOVE DROP',subtitle:'장갑 픽업'},tattoo:{icon:'pen-tool',title:'세션 예약',menu:'SESSION BOOKING',subtitle:'세션 예약'},music:{icon:'headphones',title:'음악',menu:'SOUND SYSTEM',subtitle:'도시의 음악'},more:{icon:'grid-2x2',title:'기타 기능',menu:'EXPLORE',subtitle:'기타 기능'}};
const gloveDirect=mountGloveDirect(root,countries);
// All city glove entries open the original radial collection directly.
function openCityDrop(city){closeMusic();bookingPanel.hidden=true;gloveDirect.render(city);gloveDirect.setOpen(true);}
mountFeatureSurface(root);
const musicPanel=root.querySelector('.earth-music-panel'),musicAudio=musicPanel.querySelector('audio'),musicPlay=musicPanel.querySelector('.earth-music-play'),musicSeek=musicPanel.querySelector('.earth-music-seek'),musicError=musicPanel.querySelector('.earth-music-error');
const originalMusicBase='assets/music/';
// Reuses the original app recordings. City assignments are provisional preview data.
const cityTracks={
 '1835848':'bogwangdong-59','1850147':'3HM','1853909':'BABIapk','2643743':'rh042','2988507':'paris-1',
 '6167865':'skinomakase-2025','6173331':'sleep','6077243':'wolf-guide','5368361':'never-stop','5128581':'banban','1819729':'my-love-cantonese','1880252':'skinomakase-2025'
};
const trackName=city=>cityTracks[city.id].replaceAll('-',' ');
let loadedMusicCity=null;
function audioTime(value){return Number.isFinite(value)?Math.floor(value/60)+':'+String(Math.floor(value%60)).padStart(2,'0'):'—:—';}
function paintAudio(){
 const playing=!musicAudio.paused&&!musicAudio.ended,ready=Number.isFinite(musicAudio.duration)&&musicAudio.duration>0;
 musicPlay.setAttribute('aria-label',playing?'일시정지':'재생');musicPlay.querySelector('span').textContent=playing?'PAUSE':'PLAY';
 musicPanel.dataset.playing=String(playing);musicPanel.dataset.city=loadedMusicCity||'';
 musicPanel.querySelector('[data-audio-time="elapsed"]').textContent=audioTime(musicAudio.currentTime);
 musicPanel.querySelector('[data-audio-time="duration"]').textContent=audioTime(musicAudio.duration);
 musicSeek.disabled=!ready;musicSeek.max=ready?musicAudio.duration:100;musicSeek.value=musicAudio.currentTime||0;
}
function closeMusic(){musicAudio.pause();musicPanel.hidden=true;}
function openMusic(city){
 gloveDirect.setOpen(false);bookingPanel.hidden=true;musicPanel.hidden=false;
 musicPanel.querySelector('h2').textContent=city.label.toLowerCase().replace(/\b[a-z]/g,c=>c.toUpperCase());musicPanel.querySelector('h3').textContent=trackName(city);
 if(loadedMusicCity!==city.id){musicAudio.pause();loadedMusicCity=city.id;musicError.textContent='';musicAudio.src=originalMusicBase+cityTracks[city.id]+'.mp3';musicAudio.preload='metadata';musicAudio.load();}
 paintAudio();
}
musicPlay.addEventListener('click',async()=>{if(!musicAudio.paused){musicAudio.pause();return;}musicError.textContent='';try{await musicAudio.play();}catch{musicError.textContent='음원을 불러오지 못했어요. 다시 눌러주세요.';}paintAudio();});
musicPanel.querySelector('.earth-music-close').addEventListener('click',closeMusic);
musicSeek.addEventListener('input',()=>{if(Number.isFinite(musicAudio.duration))musicAudio.currentTime=Number(musicSeek.value);paintAudio();});
for(const event of ['play','pause','ended','timeupdate','loadedmetadata','emptied'])musicAudio.addEventListener(event,paintAudio);
musicAudio.addEventListener('error',()=>{musicError.textContent='음원을 불러오지 못했어요. 연결 상태를 확인해주세요.';paintAudio();});
root.addEventListener('keydown',event=>{if(event.key==='Escape'){root.querySelector('.earth-extra-menu').hidden=true;closeMusic();gloveDirect.setOpen(false);bookingPanel.hidden=true;}});

function renderFeatures(city){featureList.replaceChildren();for(const id of city.features){const f=featureRegistry[id];if(!f)continue;const button=document.createElement('button');button.type='button';button.className='earth-feature cursor-interaction';button.dataset.feature=id;button.setAttribute('aria-label',city.ko+' '+f.title+' 보기');button.innerHTML='<span class="earth-feature-icon"><i data-lucide="'+f.icon+'" aria-hidden="true"></i></span><span><strong>'+f.menu+'</strong><small>'+(id==='music'?trackName(city):f.subtitle)+'</small></span><i data-lucide="chevron-right" aria-hidden="true"></i>';button.addEventListener('click',()=>{if(id!=='more')root.querySelector('.earth-extra-menu').hidden=true;if(id==='more'){closeMusic();gloveDirect.setOpen(false);bookingPanel.hidden=true;root.querySelector('.earth-extra-menu').hidden=!root.querySelector('.earth-extra-menu').hidden;}else if(id==='music'){openMusic(city);}else if(id==='dgtg'){window.open('https://4thdeath.com/products/dgtg-01','_blank','noopener,noreferrer');}else if(id==='gloves'){openCityDrop(city);}else{openTattoo(city);}save();});featureList.appendChild(button);}lucide.createIcons();}
function renderDrop(city){gloveDirect.render(city);}
function updateCity(){const c=cities.find(c=>c.id===state.selected);selector.value=c.id;countryLabel.textContent=countryNames[c.country];heading.replaceChildren(document.createTextNode(c.label));const korean=document.createElement('span');korean.textContent=c.ko;heading.appendChild(korean);root.querySelector('.survey-coordinates').textContent=Math.abs(c.lat).toFixed(2)+'° '+(c.lat>=0?'N':'S')+' / '+Math.abs(c.lon).toFixed(2)+'° '+(c.lon>=0?'E':'W');renderDrop(c);focusLabel.querySelector('span').textContent=countryNames[c.country];focusLabel.querySelector('strong').textContent=c.label;renderFeatures(c);}
function selectCity(id,focus=true){stopShake();earthLive.dismissSatellite();earthLive.hide();root.querySelector('.survey-cities').hidden=true;root.querySelector('[data-survey=cities]').setAttribute('aria-expanded','false');clearTarget();const c=cities.find(c=>c.id===id);if(!c)return;if(state.selected!==c.id){root.querySelector('.earth-extra-menu').hidden=true;closeMusic();gloveDirect.setOpen(false);bookingPanel.hidden=true;}state.selected=c.id;if(focus){state.cityFocus=true;state.zoom=1;syncCityLayout();state.lon=current.lon+(((c.lon-current.lon+180)%360+360)%360-180);state.lat=c.lat-18;}paintMap();updateCity();wake();save();}
const surveyNav=root.querySelector('.survey-cities');
for(const city of cities){const b=document.createElement('button');b.type='button';b.textContent=city.label;b.onclick=()=>selectCity(city.id);surveyNav.append(b);}
root.querySelector('[data-survey=cities]').onclick=event=>{surveyNav.hidden=!surveyNav.hidden;event.currentTarget.setAttribute('aria-expanded',String(!surveyNav.hidden));};

root.querySelector('.survey-date').textContent=new Date().toISOString().slice(0,10).replaceAll('-',' / ');
const worldButton=root.querySelector('.earth-world');
function syncCityLayout(){root.classList.toggle('city-focus',state.cityFocus);root.dataset.view=state.cityFocus?'city':'world';worldButton.hidden=!state.cityFocus;root.querySelector('.earth-city-panel').hidden=!state.cityFocus;}
syncCityLayout();worldButton.addEventListener('click',reset);
selector.addEventListener('change',()=>selectCity(selector.value));
bookingPanel.querySelector('button').addEventListener('click',()=>bookingPanel.hidden=true);root.querySelector('.earth-glove-close').addEventListener('click',()=>{const back=root.querySelector('.earth-feature[data-feature='+ (root.classList.contains('gloves-open')?'gloves':!musicPanel.hidden?'music':'more') +']');gloveDirect.setOpen(false);closeMusic();bookingPanel.hidden=true;root.querySelector('.earth-extra-menu').hidden=true;requestAnimationFrame(()=>back?.focus({preventScroll:true}));});
updateCity();lucide.createIcons();
let showLiveCameras=true;
const pinButtons=[];
const pinLeaders=document.createElementNS('http://www.w3.org/2000/svg','svg');pinLeaders.classList.add('earth-pin-leaders');pinLeaders.setAttribute('aria-hidden','true');markerLayer.append(pinLeaders);
const pinLines=cities.map(()=>{const line=document.createElementNS('http://www.w3.org/2000/svg','line');pinLeaders.append(line);return line;});
for(let i=0;i<cities.length;i++){const b=document.createElement('button');b.type='button';b.className='earth-pin cursor-interaction';b.hidden=true;b.innerHTML='<span class="earth-cluster-count" hidden></span><span class="survey-pin-label"></span>';b.addEventListener('click',()=>{if(performance.now()<suppressUntil)return;const ids=b.dataset.ids.split(',');const activeIndex=ids.indexOf(state.selected);selectCity(ids[(activeIndex+1)%ids.length]);});markerLayer.appendChild(b);pinButtons.push(b);}
function project(point){const p=point.clone().project(camera);return {x:(p.x*.5+.5)*W,y:(-.5*p.y+.5)*H};}
const naturePins=mountNaturePins(markerLayer,(lat,lon)=>vector(lat,lon,R+.04),key=>window.SKMLanguage?.t(key)||key,()=>performance.now()>=suppressUntil);
const earthLive=mountEarthLive({root,layer:markerLayer,vector,R,cities,selectedCity:()=>cities.find(c=>c.id===state.selected),wake,
 setCameras:on=>{showLiveCameras=on;wake();},openCamera:camera=>naturePins.open(camera),isVisible:()=>globeVisible(),
 followPoint:(lat,lon)=>{state.lon=current.lon+(((lon-current.lon+180)%360+360)%360-180);state.lat=lat;wake();},
 focusPoint:(lat,lon)=>{state.cityFocus=false;syncCityLayout();state.lon=current.lon+(((lon-current.lon+180)%360+360)%360-180);state.lat=lat;state.zoom=1.15;wake();save();}});

const finder=document.createElement('div'),skyTag=document.createElement('span');
finder.className='sky-finder';skyTag.className='sky-target-name';skyTag.hidden=true;stage.append(skyTag);root.querySelector('.earth-app').append(finder);
const bodyNames={ko:['태양','달'],en:['Sun','Moon'],ja:['太陽','月'],zh:['太阳','月亮'],'zh-Hant':['太陽','月亮'],ru:['Солнце','Луна'],fr:['Soleil','Lune'],es:['Sol','Luna'],de:['Sonne','Mond'],pt:['Sol','Lua'],it:['Sole','Luna']};
let sought=null;
function labelSky(){const names=bodyNames[window.SKMLanguage?.code]||bodyNames.en;[...finder.children].forEach((button,i)=>{button.title=names[i];button.setAttribute('aria-label',names[i]);});if(sought)skyTag.textContent=names[sought==='sun'?0:1];}
function clearTarget(){sought=null;skyTag.hidden=true;for(const b of finder.children)b.setAttribute('aria-pressed','false');}
for(const [id,icon] of [['sun','☀'],['moon','☾']]){
  const b=document.createElement('button');b.type='button';b.dataset.aim=id;b.textContent=icon;b.setAttribute('aria-pressed','false');finder.append(b);
  b.onclick=()=>{
    const now=new Date();orbitalSky.date(now,solarVector(now));const v=orbitalSky.direction(id);
    const oppositeLongitude=Math.atan2(-v.z,v.x)/rad+180;
    state.lon=current.lon+(((oppositeLongitude-current.lon+180)%360+360)%360-180);
    state.lat=clamp(-Math.asin(v.y)/rad+Math.atan(.60*Math.tan(camera.fov*rad/2))/rad,-75,75);
    state.zoom=.85;sought=id;labelSky();bend.tx=bend.ty=0;
    for(const button of finder.children)button.setAttribute('aria-pressed',String(button===b));
    wake();
  };
}
window.addEventListener('skm-language',labelSky);labelSky();
function renderPins(){
  if(sought&&!state.cityFocus){
    const p=orbitalSky.screenPoint(sought,camera);skyTag.hidden=p.z>=1||p.z<0||Math.abs(p.x)>.94||Math.abs(p.y)>.85;
    if(!skyTag.hidden){skyTag.style.left=((p.x+1)*W/2)+'px';skyTag.style.top=((1-p.y)*H/2+17)+'px';}
  }else skyTag.hidden=true;
  const cameraDirection=camera.position.clone().normalize(),groups=[];let focused=null;
  for(const c of cities){if(state.cityFocus&&c.id!==state.selected)continue;const p3=globe.localToWorld(c.point.clone()),normal=p3.clone().normalize();if(normal.dot(cameraDirection)<R/camera.position.length()+.015)continue;const p=project(p3);if(p.x<12||p.x>W-12||p.y<14||p.y>H-64)continue;if(c.id===state.selected)focused=p;
    groups.push({x:p.x,y:p.y,anchorX:p.x,anchorY:p.y,ids:[c.id]});
  }
  // Keep every city individually selectable, including Toronto, Montreal and New York.
  // Separate only nearby touch targets and retain a leader to their map coordinates.
  for(let pass=0;pass<16;pass++)for(let i=0;i<groups.length;i++)for(let j=i+1;j<groups.length;j++){
    const a=groups[i],b=groups[j];let dx=b.x-a.x,dy=b.y-a.y,d=Math.hypot(dx,dy);
    if(d>=48)continue;
    if(d<.001){dx=0;dy=1;d=1;}
    const move=(48-d)/2,ux=dx/d,uy=dy/d;
    a.x=clamp(a.x-ux*move,28,W-28);a.y=clamp(a.y-uy*move,28,H-64);
    b.x=clamp(b.x+ux*move,28,W-28);b.y=clamp(b.y+uy*move,28,H-64);
  }
  pinLines.forEach((line,i)=>{const g=groups[i],shifted=g&&Math.hypot(g.x-g.anchorX,g.y-g.anchorY)>4;line.style.display=shifted?'':'none';if(!shifted)return;line.setAttribute('x1',g.anchorX);line.setAttribute('y1',g.anchorY);line.setAttribute('x2',g.x);line.setAttribute('y2',g.y);});
  pinButtons.forEach((button,i)=>{const g=groups[i];button.hidden=!g;button.style.display=g?'grid':'none';if(!g)return;button.style.left=g.x+'px';button.style.top=g.y+'px';button.dataset.ids=g.ids.join(',');button.dataset.cityName=cities.find(c=>c.id===g.ids[0])?.label||'';button.dataset.labelSide=g.x>W-115?'left':'right';button.querySelector('.survey-pin-label').textContent=cities.find(c=>c.id===g.ids[0]).label;button.setAttribute('aria-label',g.ids.map(id=>cities.find(c=>c.id===id).ko).join(' · ')+' 도시 기능 보기');button.setAttribute('aria-pressed',String(g.ids.includes(state.selected)));const count=button.firstElementChild;count.hidden=g.ids.length===1;count.style.display=g.ids.length===1?'none':'grid';count.textContent=g.ids.length;});
  naturePins(point=>{
    if(!showLiveCameras)return null;
    const worldPoint=globe.localToWorld(point.clone());
    if(worldPoint.clone().normalize().dot(cameraDirection)<R/camera.position.length()+.015)return null;
    const projected=project(worldPoint);
    return projected.x<10||projected.x>W-10||projected.y<24||projected.y>H-32?null:projected;
  },groups,W,H);
  earthLive.render(point=>{const wp=globe.localToWorld(point.clone());if(wp.clone().normalize().dot(cameraDirection)<R/camera.position.length()+.015)return null;const p=project(wp);return p.x<20||p.x>W-20||p.y<60||p.y>H-80?null:p;});
  focusLabel.style.display=focused?'flex':'none';if(focused){focusLabel.style.left=clamp(focused.x+18,10,W-125)+'px';focusLabel.style.top=clamp(focused.y+15,12,H-95)+'px';}
}
function spring(object,key,vkey,to,dt,k=115,d=21){if(reduced){object[key]=to;object[vkey]=0;return false;}object[vkey]+=(to-object[key])*k*dt;object[vkey]*=Math.exp(-d*dt);object[key]+=object[vkey]*dt;if(Math.abs(object[key]-to)<.0003&&Math.abs(object[vkey])<.0003){object[key]=to;object[vkey]=0;return false;}return true;}
function animate(time){frame=0;
  const dt=Math.min((time-lastTime)/1000||1/60,1/30);lastTime=time;let moving=false;
  if(shakeSpeed&&!globeVisible())stopShake();
  if(shakeSpeed){
    const spin=stepGlobeSpin(shakeSpeed,dt);state.lon+=spin.delta;current.lon=state.lon;velocity.lon=0;shakeSpeed=spin.speed;moving=true;
    if(!shakeSpeed)save();
  }
  for(const key of ['lon','lat','zoom']){const s={p:current[key],v:velocity[key]};moving=spring(s,'p','v',state[key],dt)||moving;current[key]=s.p;velocity[key]=s.v;}
  const focusSpring={p:current.focus,v:velocity.focus};moving=spring(focusSpring,'p','v',state.cityFocus?1:0,dt,100,19)||moving;current.focus=clamp(focusSpring.p,0,1);velocity.focus=focusSpring.v;camera.setViewOffset(W,H,-W*.30*current.focus,0,W,H);
  const elastic=state.elasticity/100;moving=spring(bend,'x','vx',bend.tx,dt,110-elastic*50,21-elastic*8)||moving;moving=spring(bend,'y','vy',bend.ty,dt,110-elastic*50,21-elastic*8)||moving;
  const viewDistance=baseDistance+(cityDistance-baseDistance)*current.focus,distance=R+(viewDistance-R)/current.zoom;camera.position.copy(vector(current.lat+bend.y*.9,current.lon+bend.x*1.2,distance));starSky.position.copy(camera.position);camera.lookAt(0,0,0);camera.setViewOffset(W,H,-W*.18*current.focus,-H*.78*current.focus,W,H);camera.updateProjectionMatrix();camera.updateMatrixWorld();sunRight.setFromMatrixColumn(camera.matrixWorld,0);sunUp.setFromMatrixColumn(camera.matrixWorld,1);sun.position.copy(camera.position).normalize().multiplyScalar(15).addScaledVector(sunRight,22).addScaledVector(sunUp,10);atmosphere.material.uniforms.lightDirection.value.copy(sun.position).transformDirection(camera.matrixWorldInverse);
  globe.scale.set(1+bend.x*.006,1-bend.x*.004+bend.y*.004,1);globe.rotation.z=bend.x*.004;globe.updateMatrixWorld(true);surfaceMaterial.bumpScale=.015+state.relief/100*.025;arcs.visible=state.connections;
  orbitalSky.view(camera);updateSky(time);renderer.render(scene,camera);renderPins();root.querySelector('[data-view="reset"]').textContent=Math.round(current.zoom*100)+'%';stage.dataset.zoom=String(Math.round(current.zoom*100));stage.dataset.longitude=String(Math.round(current.lon));stage.dataset.city=state.selected;stage.dataset.focus=current.focus.toFixed(3);stage.dataset.tilt=String(Math.round(Math.hypot(bend.x,bend.y)*100));
  if(moving)wake();else scheduleSky();
}
function wake(){clearTimeout(idleFrame);if(!frame&&!document.hidden&&!document.body.classList.contains('bm-open')&&!document.body.classList.contains('district-open'))frame=requestAnimationFrame(animate);}
function resize(){const rect=stage.getBoundingClientRect();if(rect.width<1||rect.height<1)return;W=rect.width;H=rect.height;camera.aspect=W/H;camera.setViewOffset(W,H,0,0,W,H);camera.updateProjectionMatrix();renderer.setSize(W,H,false);const desiredRadius=Math.min(W*.39,H*.29),f=H/(2*Math.tan(camera.fov*rad/2));baseDistance=Math.sqrt(Math.pow(f*R/desiredRadius,2)+R*R);const cityRadius=H*1.15;cityDistance=Math.sqrt(Math.pow(f*R/cityRadius,2)+R*R);wake();}
new ResizeObserver(resize).observe(stage);resize();status.textContent='';
function zoom(value){state.zoom=clamp(value,.75,2.6);wake();save();}
function reset(){stopShake();earthLive.dismissSatellite();clearTarget();Object.assign(state,{lon:current.lon+(((oceanHome.lon-current.lon+180)%360+360)%360-180),lat:oceanHome.lat,zoom:1,cityFocus:false});closeMusic();gloveDirect.setOpen(false);bookingPanel.hidden=true;root.querySelector('.earth-extra-menu').hidden=true;syncCityLayout();bend.tx=bend.ty=0;wake();save();}
function focusEngraving(){Object.assign(state,{lon:current.lon+(((stamp.lon-current.lon+180)%360+360)%360-180),lat:stamp.lat,zoom:1.55});wake();save();}
root.querySelector('[data-view="in"]').addEventListener('click',()=>zoom(state.zoom*1.25));root.querySelector('[data-view="out"]').addEventListener('click',()=>zoom(state.zoom/1.25));root.querySelector('[data-view="reset"]').addEventListener('click',reset);root.querySelector('.earth-brand').addEventListener('click',openHomeConversation);
root.querySelector('.earth-brand').setAttribute('aria-label','Message');
root.querySelector('.earth-zoom').addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();state.lon+=e.key==='ArrowRight'?18:-18;wake();save();}});
function blocked(target){return target.closest('.earth-zoom,.earth-tilt,.earth-message');}
stage.addEventListener('wheel',e=>{if(blocked(e.target))return;e.preventDefault();zoom(state.zoom*Math.exp(-clamp(e.deltaY*(e.deltaMode===1?16:1),-100,100)*.003));},{passive:false});
function beginDrag(id, x, y, now) {
  earthLive.stopFollowing();
  return {id, x, y, lon: current.lon, lat: current.lat, lastX: x, lastY: y,
    lastTime: now, speedX: 0, speedY: 0, moved: false};
}
stage.addEventListener('pointerdown', e => {
  if (blocked(e.target)) return;
  stopShake();
  clearTarget();
  pointers.set(e.pointerId, {x: e.clientX, y: e.clientY});
  if (pointers.size === 1) {
    gesture = beginDrag(e.pointerId, e.clientX, e.clientY, performance.now());
  } else if (pointers.size === 2) {
    const [a,b] = pointers.values();
    pinch = {distance: Math.max(1, Math.hypot(a.x-b.x,a.y-b.y)), zoom: state.zoom};
    gesture = null;
    for (const id of pointers.keys()) stage.setPointerCapture(id);
    suppressUntil = performance.now()+500;
  }
});
stage.addEventListener('pointermove', e => {
  if (!pointers.has(e.pointerId)) {
    if (e.pointerType==='mouse' && !sensorOn && !blocked(e.target)) {
      const bounds=stage.getBoundingClientRect();
      bend.tx=clamp((e.clientX-bounds.left-W/2)/(W/2),-1,1)*.6;
      bend.ty=clamp((e.clientY-bounds.top-H/2)/(H/2),-1,1)*.6;wake();
    }
    return;
  }
  pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
  if (pointers.size>=2 && pinch) {
    const [a,b]=pointers.values();
    state.zoom=clamp(pinch.zoom*Math.hypot(a.x-b.x,a.y-b.y)/pinch.distance,.75,2.6);
    suppressUntil=performance.now()+500;wake();return;
  }
  if (!gesture || gesture.id!==e.pointerId) return;
  const dx=e.clientX-gesture.x, dy=e.clientY-gesture.y;
  if (!gesture.moved && Math.hypot(dx,dy)<4) return;
  const now=performance.now(), elapsed=Math.max(8,now-gesture.lastTime);
  const longitudeGain=195/(W*state.zoom), latitudeGain=154/(H*state.zoom);
  const weight=1-Math.exp(-elapsed/30);
  const speedX=-(e.clientX-gesture.lastX)*longitudeGain/elapsed;
  const speedY=(e.clientY-gesture.lastY)*latitudeGain/elapsed;
  gesture.speedX+=(speedX-gesture.speedX)*weight;
  gesture.speedY+=(speedY-gesture.speedY)*weight;
  gesture.lastX=e.clientX;gesture.lastY=e.clientY;gesture.lastTime=now;
  gesture.moved=true;
  stage.setPointerCapture(e.pointerId);
  suppressUntil=now+350;
  state.lon=gesture.lon-dx*longitudeGain;
  state.lat=clamp(gesture.lat+dy*latitudeGain,-75,75);
  // The camera follows the finger on the next frame. The bend settles independently.
  current.lon=state.lon;current.lat=state.lat;velocity.lon=0;velocity.lat=0;
  if(!sensorOn){bend.tx=clamp(dx/85,-1,1);bend.ty=clamp(dy/85,-1,1);}
  wake();
});
function finish(e) {
  const drag=gesture;
  if(!pointers.delete(e.pointerId)) return;
  if(stage.hasPointerCapture(e.pointerId)) stage.releasePointerCapture(e.pointerId);
  if(e.type==='pointerup' && !reduced && drag?.id===e.pointerId && drag.moved && performance.now()-drag.lastTime<90){
    state.lon+=clamp(drag.speedX*90,-26,26);
    state.lat=clamp(state.lat+clamp(drag.speedY*75,-13,13),-75,75);
  }
  pinch=null;
  if(pointers.size===1){const [id,p]=pointers.entries().next().value;gesture=beginDrag(id,p.x,p.y,performance.now());}
  else{gesture=null;if(!sensorOn)bend.tx=bend.ty=0;}
  wake();save();
}
stage.addEventListener('pointerup',finish);stage.addEventListener('pointercancel',finish);stage.addEventListener('pointerleave',()=>{if(!pointers.size&&!sensorOn){bend.tx=bend.ty=0;wake();}});
let safariZoom=1;stage.addEventListener('gesturestart',e=>{e.preventDefault();safariZoom=state.zoom;},{passive:false});stage.addEventListener('gesturechange',e=>{e.preventDefault();zoom(safariZoom*e.scale);},{passive:false});
function demoTilt(){clearTimeout(demoTimer);bend.tx=.95;bend.ty=-.55;wake();demoTimer=setTimeout(()=>{bend.tx=-.55;bend.ty=.3;wake();demoTimer=setTimeout(()=>{bend.tx=bend.ty=0;wake();},420);},480);}
const tiltButton=root.querySelector('.earth-tilt'),coarse=matchMedia('(pointer:coarse)').matches;
function orientation(e){if(!sensorOn||!Number.isFinite(e.beta)||!Number.isFinite(e.gamma))return;clearTimeout(sensorTimer);if(!sensorBase)sensorBase={beta:e.beta,gamma:e.gamma};const x=(e.gamma-sensorBase.gamma)/25,y=(e.beta-sensorBase.beta)/28,a=(screen.orientation?.angle||0)*rad;bend.tx=clamp(x*Math.cos(a)+y*Math.sin(a),-1,1);bend.ty=clamp(y*Math.cos(a)-x*Math.sin(a),-1,1);status.textContent='';tiltButton.querySelector('span').textContent='기울기 켜짐';wake();}
tiltButton.addEventListener('click',async()=>{if(hasNativeMotion){sensorOn=!sensorOn;bend.tx=bend.ty=0;tiltButton.setAttribute('aria-pressed',String(sensorOn));wake();return;}if(!coarse){demoTilt();return;}if(sensorOn){sensorOn=false;window.removeEventListener('deviceorientation',orientation);clearTimeout(sensorTimer);bend.tx=bend.ty=0;tiltButton.querySelector('span').textContent='기울기';wake();return;}try{if(!window.DeviceOrientationEvent)throw new Error('unavailable');if(typeof DeviceOrientationEvent.requestPermission==='function'&&await DeviceOrientationEvent.requestPermission()!=='granted'){status.textContent='기울기 권한이 없어 터치로 조작할 수 있어요.';return;}sensorOn=true;sensorBase=null;window.addEventListener('deviceorientation',orientation);sensorTimer=setTimeout(()=>{sensorOn=false;window.removeEventListener('deviceorientation',orientation);status.textContent='이 미리보기는 센서 신호를 받지 못했어요. 아이폰 앱에서 확인이 필요해요.';demoTilt();},2200);}catch(error){status.textContent='기울기 연결은 아이폰 앱에서 확인이 필요해요. 움직임을 미리 보여줄게요.';demoTilt();}});
document.addEventListener('visibilitychange',()=>{if(document.hidden){stopShake();clearTimeout(idleFrame);lastSceneTime=null;if(frame)cancelAnimationFrame(frame);frame=0;}else{lastTime=performance.now();wake();}});
window.addEventListener('pagehide',()=>{clearTimeout(idleFrame);musicAudio.pause();if(frame)cancelAnimationFrame(frame);clearTimeout(saveTimer);clearTimeout(demoTimer);clearTimeout(sensorTimer);window.removeEventListener('deviceorientation',orientation);renderer.dispose();});
new MutationObserver(()=>{if(globeVisible())wake();else clearTimeout(idleFrame);}).observe(root,{attributes:true,attributeFilter:['class']});
document.addEventListener('close',()=>{if(globeVisible())wake();},true);
window.addEventListener('pageshow',()=>{lastSceneTime=null;wake();});
const logoImage=root.querySelector('.earth-logo img');if(logoImage){if(logoImage.complete&&logoImage.naturalWidth)prepareLogo();else logoImage.addEventListener('load',prepareLogo,{once:true});}
// Keep all navigation on the existing SKM origin so customer sessions remain intact.
const T=key=>window.SKMLanguage?.t(key)||key;
async function openHomeConversation(){
 const button=root.querySelector('.earth-brand');button.disabled=true;closeMusic();
 try{await window.SKMEnterHome(window.SKMBooking,!!window.webkit?.messageHandlers?.skmAuth);status.textContent='';window.openAppPage('app/messages.html');}
 catch(error){status.textContent=T('loginFailed');}finally{button.disabled=false;}
}

function openTattoo(city){closeMusic();gloveDirect.setOpen(false);bookingPanel.hidden=true;sessionStorage.setItem('skm-booking-city-v1',JSON.stringify({id:city.id,label:city.label}));window.openBodyMap();}
function updateLanguage(){const code=window.SKMLanguage?.code||'ko';root.querySelector('.earth-language span').textContent=code.toUpperCase();root.querySelector('.earth-language').setAttribute('aria-label',T('language'));root.querySelector('.earth-account').setAttribute('aria-label','SKINOMAKASE SESSION');renderFeatures(cities.find(c=>c.id===state.selected));}
root.querySelector('.earth-language').addEventListener('click',()=>document.getElementById('skm-language-button')?.click());
root.querySelector('.earth-account').addEventListener('click',()=>{closeMusic();window.openAppPage('app/account.html');});
window.addEventListener('skm-language',updateLanguage);updateLanguage();
const extras=root.querySelector('.earth-extra-menu');root.querySelector('.earth-more').addEventListener('click',()=>{extras.hidden=!extras.hidden;});
extras.querySelector('.earth-extra-close').addEventListener('click',()=>{extras.hidden=true;});
extras.querySelectorAll('[data-extra]').forEach(button=>button.addEventListener('click',()=>{extras.hidden=true;closeMusic();const kind=button.dataset.extra;if(kind==='venues')window.openAppPage('app/community.html?view=venues&city='+encodeURIComponent(state.selected));else if(kind==='strobe'||kind==='shelter')window.openAppPage('app/'+kind+'.html');else if(kind==='video')window.openVideoPlayer();else if(kind==='accessory')document.getElementById('accModal').classList.add('active');}));
// A deliberate shake spins the visible globe and starts a random station.
// Acceleration stays on this device; no motion data is uploaded.
window.SKMApp=window.SKMApp||{};
const previousMotion=window.SKMApp.onMotion;
window.SKMApp.onMotion=(x,y,z)=>{
 previousMotion?.(x,y,z);
 const allowed=globeVisible()&&!pointers.size&&surveyNav.hidden;
 const direction=shakeDetector.sample({x,y,z},performance.now(),allowed);
 if(!direction)return;
 if(!reduced){
  earthLive.stopFollowing();clearTarget();
  if(state.cityFocus){state.cityFocus=false;state.zoom=1;syncCityLayout();}
  state.lon=current.lon;state.lat=current.lat;velocity.lon=velocity.lat=0;
  shakeSpeed=direction*760;wake();
 }
 window.SKMApp.haptic?.('medium');void earthLive.randomRadio();
};
// The existing native bridge supplies gravity vectors without web sensor permissions.
const hasNativeMotion=!!window.webkit?.messageHandlers?.haptic;
if(hasNativeMotion){const previousTilt=window.SKMApp?.onTilt;let origin=null;sensorOn=true;window.SKMApp.onTilt=(x,y,z,...rest)=>{previousTilt?.(x,y,z,...rest);if(!sensorOn||document.body.classList.contains('bm-open')||document.hidden)return;if(!origin)origin={x,z};bend.tx=clamp((x-origin.x)*2.6,-1,1);bend.ty=clamp((z-origin.z)*2.6,-1,1);origin.x+=(x-origin.x)*.002;origin.z+=(z-origin.z)*.002;wake();};}
new MutationObserver(()=>{if(document.body.classList.contains('bm-open')){closeMusic();if(frame){cancelAnimationFrame(frame);frame=0;}}else wake();}).observe(document.body,{attributes:true,attributeFilter:['class']});
window.addEventListener('skm-return-home',()=>wake());

// Share a preview of the existing city glove section without a separate marketplace.
const gloveCollection=new URLSearchParams(location.search).get('gloves');
const gloveCity=gloveCollection && cities.find(city=>gloveDropPlan[city.id]?.code===gloveCollection);
if(gloveCity){selectCity(gloveCity.id);gloveDirect.setOpen(true);}

mountEarthLanguage(root);

mountOnboarding();

window.addEventListener('skm-booking-home',()=>{reset();root.scrollTop=0;window.SKMTheme?.returnHome?.();});
