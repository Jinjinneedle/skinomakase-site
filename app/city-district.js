import {mountDropProximity} from './drop-proximity.js';
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';

// Only locations explicitly supplied by the studio. Unconfigured cities keep their existing collection.
export const districtLocations={'5128581':'app/earth-assets/districts/new-york-troutman.json'};
const words={
 ko:['지구본','도시 메뉴','드롭 준비 중','장갑 보기','지도를 불러오는 중','다시 시도','한 손가락으로 회전 · 두 손가락으로 확대','건물 위치 시안 · 픽업 입구 미확정'],
 en:['World','City menu','Drop coming soon','View gloves','Loading map','Try again','Drag to rotate · Pinch to zoom','Building preview · Pickup entrance to be confirmed'],
 ja:['地球へ','都市メニュー','ドロップ準備中','グローブを見る','地図を読み込み中','再試行','ドラッグで回転・ピンチでズーム','建物プレビュー・受取入口は未確定'],
 zh:['地球','城市菜单','投放准备中','查看手套','正在加载地图','重试','拖动旋转 · 双指缩放','建筑预览 · 领取入口待确认'],
 'zh-Hant':['地球','城市選單','投放準備中','查看手套','正在載入地圖','重試','拖曳旋轉 · 雙指縮放','建築預覽 · 領取入口待確認'],
 fr:['Monde','Menu de la ville','Drop à venir','Voir les gants','Chargement de la carte','Réessayer','Glisser pour tourner · Pincer pour zoomer','Aperçu du bâtiment · Entrée à confirmer'],
 de:['Welt','Stadtmenü','Drop folgt','Handschuhe ansehen','Karte wird geladen','Erneut versuchen','Ziehen zum Drehen · Zwei Finger zum Zoomen','Gebäudevorschau · Eingang noch offen'],
 es:['Mundo','Menú de ciudad','Drop próximamente','Ver guantes','Cargando mapa','Reintentar','Arrastra para girar · Pellizca para ampliar','Vista del edificio · Entrada por confirmar'],
 pt:['Mundo','Menu da cidade','Drop em breve','Ver luvas','Carregando mapa','Tentar novamente','Arraste para girar · Pince para ampliar','Prévia do edifício · Entrada a confirmar'],
 it:['Mondo','Menu città','Drop in arrivo','Vedi guanti','Caricamento mappa','Riprova','Trascina per ruotare · Pizzica per zoomare','Anteprima edificio · Ingresso da confermare'],
 ru:['Мир','Меню города','Дроп готовится','Посмотреть перчатки','Загрузка карты','Повторить','Поворот пальцем · Масштаб двумя пальцами','Макет здания · Вход для получения уточняется']
};
const color=new THREE.Color();
function tint(g,c){color.set(c);const a=new Float32Array(g.attributes.position.count*3);for(let i=0;i<a.length;i+=3)color.toArray(a,i);g.setAttribute('color',new THREE.BufferAttribute(a,3));return g;}
function faceTexture(){const c=document.createElement('canvas');c.width=c.height=128;const x=c.getContext('2d');x.fillStyle='#ddd6c9';x.fillRect(0,0,128,128);x.strokeStyle='#b9afa1';x.lineWidth=1;for(let y=0;y<128;y+=8){x.beginPath();x.moveTo(0,y);x.lineTo(128,y);x.stroke();for(let a=(y%16?8:0);a<128;a+=24)x.strokeRect(a,y,24,8);}x.fillStyle='#363e40';x.fillRect(29,22,63,78);x.fillStyle='#72807e';x.fillRect(33,26,55,70);x.fillStyle='#b0b9af';x.fillRect(36,29,20,26);x.fillStyle='#d2c6b1';x.fillRect(29,100,67,5);x.fillStyle='#41484a';x.fillRect(59,25,3,72);x.fillRect(31,60,60,3);const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.colorSpace=THREE.SRGBColorSpace;return t;}
function strip(a,b,width,y,material){const dx=b[0]-a[0],dz=b[1]-a[1],length=Math.hypot(dx,dz);if(length<.01)return null;const m=new THREE.Mesh(new THREE.PlaneGeometry(width,length),material);m.rotation.x=-Math.PI/2;m.rotation.z=Math.atan2(dx,dz);m.position.set((a[0]+b[0])/2,y,(a[1]+b[1])/2);return m;}
// Clip road segments to the same small district footprint as the buildings.
function clip(a,b,r){const d=[b[0]-a[0],b[1]-a[1]],aa=d[0]**2+d[1]**2;if(!aa)return null;const bb=2*(a[0]*d[0]+a[1]*d[1]),cc=a[0]**2+a[1]**2-r*r,det=bb*bb-4*aa*cc;if(det<0)return null;const lo=Math.max(0,(-bb-Math.sqrt(det))/(2*aa)),hi=Math.min(1,(-bb+Math.sqrt(det))/(2*aa));return hi>lo?[[a[0]+d[0]*lo,a[1]+d[1]*lo],[a[0]+d[0]*hi,a[1]+d[1]*hi]]:null;}

function buildScene(data,scene){
 const resources=[],hitAreas=[],roofParts=[],wallParts=[],pavements=[],roadParts=[],stripeParts=[],roofDetails=[];
 const keep=x=>(resources.push(x),x),flat=c=>keep(new THREE.MeshStandardMaterial({color:c,roughness:1}));
 const pavement=flat('#c6c6b9'),asphalt=flat('#666d6d'),paint=flat('#dcd5bd'),roofMat=keep(new THREE.MeshStandardMaterial({vertexColors:true,roughness:.94})),wallMap=keep(faceTexture()),wallMat=keep(new THREE.MeshStandardMaterial({vertexColors:true,map:wallMap,roughness:1,side:THREE.DoubleSide}));
 const base=new THREE.Mesh(keep(new THREE.CylinderGeometry(data.radius,data.radius,7,96)),flat('#bdc2b5'));base.position.y=-3.6;base.receiveShadow=true;scene.add(base);
 const addStrip=(array,a,b,w,y)=>{const m=strip(a,b,w,y,null);if(m){m.updateMatrix();const g=m.geometry;g.applyMatrix4(m.matrix);array.push(g);}};
 for(const road of data.roads){const width=road.kind==='service'?5:road.kind==='secondary'?16:11;for(let i=1;i<road.points.length;i++){const line=clip(road.points[i-1],road.points[i],data.radius-.3);if(!line)continue;const[a,b]=line;addStrip(pavements,a,b,width+5,.04);addStrip(roadParts,a,b,width,.1);if(width>8){const len=Math.hypot(b[0]-a[0],b[1]-a[1]);for(let d=3;d<len-4;d+=11){const along=t=>[a[0]+(b[0]-a[0])*t/len,a[1]+(b[1]-a[1])*t/len];addStrip(stripeParts,along(d),along(d+3),.27,.13);}}}}
 const palette=['#d0b392','#b89c82','#c7bda5','#b7b8a9','#bd9278','#9daaa1'];
 for(const b of data.buildings){
  const p=b.points,isDrop=b.id===data.targetId,h=Math.max(3,Math.min(55,parseFloat(b.tags.height)||parseFloat(b.tags['building:levels'])*3.2||9)),c=isDrop?'#dbc6a1':palette[Number(b.id)%palette.length];
  const shape=new THREE.Shape(p.map(([x,z])=>new THREE.Vector2(x,-z)));let roof=new THREE.ShapeGeometry(shape).toNonIndexed();roof.rotateX(-Math.PI/2);roof.translate(0,h,0);tint(roof,isDrop?'#718f80':Number(b.id)%3?'#91998f':'#617e77');roofParts.push(roof);
  const pos=[],uv=[];for(let i=0;i<p.length;i++){const a=p[i],next=p[(i+1)%p.length],len=Math.hypot(next[0]-a[0],next[1]-a[1]),u=len/4.3,v=h/4.1;pos.push(a[0],0,a[1],next[0],0,next[1],a[0],h,a[1],next[0],0,next[1],next[0],h,next[1],a[0],h,a[1]);uv.push(0,0,u,0,0,v,u,0,u,v,0,v);}
  const walls=new THREE.BufferGeometry();walls.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));walls.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));walls.computeVertexNormals();tint(walls,c);wallParts.push(walls);
  const center=p.reduce((r,a)=>[r[0]+a[0]/p.length,r[1]+a[1]/p.length],[0,0]);hitAreas.push({b,h,center});
  if(!isDrop){const g=new THREE.BoxGeometry(2.7,.8,2.1).toNonIndexed();g.translate(center[0],h+.5,center[1]);tint(g,'#b6b8ae');roofDetails.push(g);}
 }
 function merge(parts,material){if(!parts.length)return;const g=keep(mergeGeometries(parts));parts.forEach(g=>g.dispose());const mesh=new THREE.Mesh(g,material);mesh.castShadow=material===wallMat;mesh.receiveShadow=true;scene.add(mesh);return mesh;}
 merge(pavements,pavement);merge(roadParts,asphalt);merge(stripeParts,paint);merge(roofParts,roofMat);merge(wallParts,wallMat);merge(roofDetails,roofMat);
 if(data.trees.length){const trees=new THREE.InstancedMesh(keep(new THREE.IcosahedronGeometry(2.5,1)),flat('#627c65'),data.trees.length),matrix=new THREE.Matrix4();data.trees.forEach((p,i)=>{matrix.makeTranslation(p[0],3.5,p[1]);trees.setMatrixAt(i,matrix);});scene.add(trees);}
 const target=hitAreas.find(x=>x.b.id===data.targetId),outline=target.b.points.map(([x,z])=>new THREE.Vector3(x,target.h+.35,z));outline.push(outline[0]);const edge=new THREE.Line(keep(new THREE.BufferGeometry().setFromPoints(outline)),keep(new THREE.LineBasicMaterial({color:'#e65037'})));scene.add(edge);
 return {target,dispose:()=>{resources.forEach(x=>x.dispose());scene.clear();}};
}

export function mountCityDistrict({onWorld,onMenu,onGloves,onVisibility}){
 let proximity=null;
 let active=null,epoch=0,view=null,controller=null,lastFocus=null,closingTimer=0;
 const dialog=document.createElement('dialog');dialog.className='skm-district';dialog.setAttribute('aria-labelledby','district-title');
 dialog.innerHTML='<div class="district-shell"><header class="district-header"><button type="button" data-world></button><div><span>NEW YORK / STG-05</span><h1 id="district-title">Ridgewood</h1></div><button type="button" data-menu></button></header><div class="district-canvas"><div class="district-status" role="status"></div><button class="district-pin" type="button" hidden><span>STG-05</span><strong>17-17</strong><i></i></button></div><div class="district-bottom"><p class="district-hint"></p><button class="district-collection" type="button"><img src="app/earth-assets/gloves/stg-05.jpg" alt="STG-05"><span><small class="district-coming"></small><strong>17-17 Troutman Street</strong><span class="district-see"></span></span><b aria-hidden="true">↗</b></button><footer><span class="district-note"></span><a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">© OpenStreetMap</a></footer></div></div>';
 document.body.append(dialog);
 const q=s=>dialog.querySelector(s),host=q('.district-canvas'),status=q('.district-status'),pin=q('.district-pin');
 function copy(){const w=words[window.SKMLanguage?.code]||words.en;q('[data-world]').textContent='← '+w[0];q('[data-menu]').textContent=w[1];q('.district-coming').textContent=w[2];q('.district-see').textContent=w[3];q('.district-hint').textContent=w[6];q('.district-note').textContent=w[7];pin.setAttribute('aria-label',w[3]+' · 17-17 Troutman Street');if(status.dataset.state==='loading')status.textContent=w[4];if(status.dataset.state==='error'){status.textContent=w[5];const retry=document.createElement('button');retry.type='button';retry.textContent='↻';retry.setAttribute('aria-label',w[5]);retry.onclick=()=>open(active);status.append(retry);}}
 window.addEventListener('skm-language',copy);copy();
 function destroy(){proximity?.dispose();proximity=null;controller?.abort();controller=null;view?.dispose();view=null;pin.hidden=true;}
 function close(then){if(!dialog.open)return;epoch++;destroy();dialog.classList.add('leaving');clearTimeout(closingTimer);closingTimer=setTimeout(()=>{dialog.close();dialog.classList.remove('leaving');document.body.classList.remove('district-open');onVisibility(false);lastFocus?.focus?.({preventScroll:true});then?.();},matchMedia('(prefers-reduced-motion: reduce)').matches?0:180);}
 q('[data-world]').onclick=()=>close(onWorld);q('[data-menu]').onclick=()=>close(onMenu);
 const gloves=()=>close(()=>onGloves(active));q('.district-collection').onclick=gloves;pin.onclick=gloves;
 dialog.addEventListener('cancel',event=>{event.preventDefault();close(onMenu);});
 async function open(city){
  if(!districtLocations[city.id])return false;active=city;const mine=++epoch;clearTimeout(closingTimer);destroy();controller=new AbortController();lastFocus=document.activeElement;dialog.classList.remove('leaving');if(!dialog.open)dialog.showModal();document.body.classList.add('district-open');onVisibility(true);status.hidden=false;status.dataset.state='loading';copy();
  try{const response=await fetch(districtLocations[city.id],{signal:controller.signal});if(!response.ok)throw Error('Map unavailable');const data=await response.json();if(mine!==epoch)return;view=createView(data);proximity=mountDropProximity(q('.district-bottom'),data.center);status.hidden=true;pin.hidden=false;view.wake();q('[data-world]').focus({preventScroll:true});}catch(error){if(mine!==epoch||error.name==='AbortError')return;destroy();status.hidden=false;status.dataset.state='error';copy();}
  return true;
 }
 function createView(data){
  const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'low-power'});renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.8));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.shadowMap.autoUpdate=false;renderer.shadowMap.needsUpdate=true;host.prepend(renderer.domElement);renderer.domElement.setAttribute('aria-label','3D · 17-17 Troutman Street, Ridgewood');renderer.domElement.style.touchAction='none';
  const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(35,1,1,1800);scene.add(new THREE.HemisphereLight('#edf5ff','#7f8a71',2.9));const sun=new THREE.DirectionalLight('#fff1d5',2.6);sun.position.set(-180,320,150);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);Object.assign(sun.shadow.camera,{left:-300,right:300,top:300,bottom:-300,near:1,far:800});sun.shadow.bias=-.001;scene.add(sun);
  let model;try{model=buildScene(data,scene);}catch(e){renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove();throw e;}
  camera.position.set(300,370,420);const controls=new OrbitControls(camera,renderer.domElement);controls.target.set(0,0,0);controls.enableDamping=true;controls.dampingFactor=.12;controls.minDistance=100;controls.maxDistance=850;controls.minPolarAngle=.2;controls.maxPolarAngle=Math.PI*.43;controls.rotateSpeed=.65;controls.zoomSpeed=.75;controls.maxTargetRadius=140;controls.touches.ONE=THREE.TOUCH.ROTATE;controls.touches.TWO=THREE.TOUCH.DOLLY_PAN;
  let raf=0,left=0,dead=false;const anchor=new THREE.Vector3(model.target.center[0],model.target.h+4,model.target.center[1]);
  function draw(){raf=0;if(dead||document.hidden)return;controls.update();renderer.render(scene,camera);const p=anchor.clone().project(camera);pin.style.left=((p.x+1)*host.clientWidth/2)+'px';pin.style.top=((1-p.y)*host.clientHeight/2)+'px';pin.style.visibility=p.z<1&&Math.abs(p.x)<.9&&Math.abs(p.y)<.9?'visible':'hidden';if(--left>0&&!raf)raf=requestAnimationFrame(draw);}
  function wake(){if(dead||document.hidden)return;left=30;if(!raf)raf=requestAnimationFrame(draw);}
  controls.addEventListener('change',wake);
  function resize(){const w=host.clientWidth,h=host.clientHeight;if(!w||!h)return;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();wake();}
  const observer=new ResizeObserver(resize);observer.observe(host);resize();
  function visible(){if(document.hidden){cancelAnimationFrame(raf);raf=0;}else wake();}document.addEventListener('visibilitychange',visible);
  return {wake,dispose(){dead=true;cancelAnimationFrame(raf);observer.disconnect();document.removeEventListener('visibilitychange',visible);controls.dispose();sun.shadow.dispose();model.dispose();renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove();}};
 }
 return {open,close,isConfigured:city=>!!districtLocations[city.id]};
}
