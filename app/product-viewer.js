import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {RoomEnvironment} from 'three/examples/jsm/environments/RoomEnvironment.js';
import {boxDistance,assetPath} from './product-viewer-model.cjs';
const $=id=>document.getElementById(id),canvas=$('model-canvas'),status=$('message'),empty=$('empty'),reset=$('reset'),input=$('model-files');
const embedded=new URLSearchParams(location.search).get('embedded')==='1';
const mosaic=new URLSearchParams(location.search).get('mosaic')==='1';
if(mosaic)document.body.classList.add('mosaic-product');
if(embedded)document.body.classList.add('embedded-product');
const framing=embedded?1.16:1;
const codes=['ko','en','ja','zh','zh-Hant','ru','fr','es','de','pt','it'];
const rows={
open:['3D 파일 열기','Open 3D file','3Dファイルを開く','打开3D文件','開啟3D檔案','Открыть 3D-файл','Ouvrir un fichier 3D','Abrir archivo 3D','3D-Datei öffnen','Abrir arquivo 3D','Apri file 3D'],
close:['닫기','Close','閉じる','关闭','關閉','Закрыть','Fermer','Cerrar','Schließen','Fechar','Chiudi'],
reset:['처음 각도로','Reset view','表示をリセット','重置视角','重設視角','Сбросить вид','Réinitialiser la vue','Restablecer vista','Ansicht zurücksetzen','Redefinir vista','Ripristina vista'],
gesture:['드래그로 회전 · 두 손가락으로 확대','Drag to rotate · pinch to zoom','ドラッグで回転・ピンチで拡大','拖动旋转 · 双指缩放','拖曳旋轉 · 雙指縮放','Поворот перетаскиванием · масштаб двумя пальцами','Glissez pour tourner · pincez pour zoomer','Arrastra para girar · pellizca para ampliar','Ziehen zum Drehen · mit zwei Fingern zoomen','Arraste para girar · pince para ampliar','Trascina per ruotare · pizzica per ingrandire'],
loading:['불러오는 중…','Loading…','読み込み中…','加载中…','載入中…','Загрузка…','Chargement…','Cargando…','Wird geladen…','Carregando…','Caricamento…'],
error:['모델을 열지 못했어요. GLB 또는 GLTF와 텍스처 파일을 함께 선택해 주세요.','Could not open the model. Choose a GLB, or a GLTF with its texture files.','モデルを開けません。GLB、またはGLTFとテクスチャを選択してください。','无法打开模型。请选择 GLB，或 GLTF 及其纹理文件。','無法開啟模型。請選擇 GLB，或 GLTF 及其紋理檔案。','Не удалось открыть модель. Выберите GLB или GLTF вместе с текстурами.','Impossible d’ouvrir le modèle. Choisissez un GLB, ou un GLTF avec ses textures.','No se pudo abrir. Elige un GLB, o un GLTF con sus texturas.','Modell nicht lesbar. Wähle GLB oder GLTF mit Texturen.','Não foi possível abrir. Escolha GLB ou GLTF com as texturas.','Impossibile aprire. Scegli GLB o GLTF con le texture.'],
size:['미리보기 파일은 합계 50MB까지 열 수 있어요.','Preview files can total up to 50 MB.','プレビューは合計50MBまでです。','预览文件总大小不能超过50MB。','預覽檔案總大小不能超過50MB。','Размер файлов — до 50 МБ.','Les fichiers peuvent totaliser 50 Mo.','Los archivos pueden sumar hasta 50 MB.','Dateien insgesamt bis 50 MB.','Arquivos de até 50 MB no total.','File fino a 50 MB complessivi.'],
webgl:['이 기기에서 3D 화면을 열지 못했어요.','3D viewing is unavailable on this device.','この端末で3D表示を開けません。','此设备无法打开3D视图。','此裝置無法開啟3D檢視。','3D-просмотр недоступен.','La 3D est indisponible sur cet appareil.','La vista 3D no está disponible.','3D-Ansicht nicht verfügbar.','Visualização 3D indisponível.','Visualizzazione 3D non disponibile.']};
const t=key=>rows[key][Math.max(0,codes.indexOf(window.SKMLanguage?.code||'en'))];
let statusKey='',renderer,scene,camera,controls,environment,model=null,radius=1,dimensions=[1,1,1],frame=0,run=0,stopped=false,paused=false;
function message(key){statusKey=key;status.textContent=key?t(key):'';}
function copy(){
 $('open-label').textContent=t('open');$('close').setAttribute('aria-label',t('close'));reset.setAttribute('aria-label',t('reset'));$('replace').setAttribute('aria-label',t('open'));$('gesture').textContent=t('gesture');if(statusKey)message(statusKey);
}
copy();window.addEventListener('skm-language',copy);
$('close').onclick=()=>{if(window.parent!==window){parent.postMessage({skm:'product-viewer-close'},location.origin==='null'?'*':location.origin);return;}if(history.length>1)history.back();else location.replace('../world.html');};
$('replace').onclick=()=>input.click();
function dispose(root){
 const geometries=new Set(),materials=new Set(),textures=new Set();
 root?.traverse(object=>{if(object.geometry)geometries.add(object.geometry);for(const material of [].concat(object.material||[])){materials.add(material);for(const value of Object.values(material))if(value?.isTexture)textures.add(value);}});
 for(const value of textures){value.dispose();if(value.image?.close)value.image.close();}
 for(const value of materials)value.dispose();for(const value of geometries)value.dispose();
}
function invalidate(){if(!frame&&!stopped&&!paused&&!document.hidden&&renderer)frame=requestAnimationFrame(render);}
function render(){frame=0;if(stopped||paused||document.hidden)return;const moving=controls.update();renderer.render(scene,camera);if(moving)invalidate();}
function fit(){
 if(!model)return;const distance=boxDistance(dimensions,camera.aspect)*framing;camera.position.set(0,radius*.08,distance);camera.near=radius/100;camera.far=distance*20;camera.updateProjectionMatrix();controls.target.set(0,0,0);controls.minDistance=radius*1.1;controls.maxDistance=distance*4;controls.update();invalidate();
}
function resize(){
 if(!renderer)return;const rect=$('viewer').getBoundingClientRect(),old=camera.aspect;paused=rect.width===0||rect.height===0;if(paused){cancelAnimationFrame(frame);frame=0;return;}camera.aspect=rect.width/Math.max(1,rect.height);camera.updateProjectionMatrix();renderer.setSize(rect.width,rect.height,false);
 if(model&&old!==camera.aspect){const ratio=boxDistance(dimensions,camera.aspect)/boxDistance(dimensions,old);camera.position.multiplyScalar(ratio);controls.maxDistance=boxDistance(dimensions,camera.aspect)*framing*4;}
 invalidate();
}
try{
 renderer=new THREE.WebGLRenderer({canvas,antialias:!mosaic,alpha:false,powerPreference:'low-power'});renderer.setPixelRatio(mosaic?1/8:Math.min(window.devicePixelRatio||1,2));renderer.setClearColor(0x000000,1);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;
 scene=new THREE.Scene();scene.background=new THREE.Color(0x000000);camera=new THREE.PerspectiveCamera(40,1,.01,1000);
 const room=new RoomEnvironment(),pmrem=new THREE.PMREMGenerator(renderer);environment=pmrem.fromScene(room,.04);scene.environment=environment.texture;scene.environmentIntensity=.4;room.dispose();pmrem.dispose();
 scene.add(new THREE.HemisphereLight(0xffffff,0x404040,.5));const key=new THREE.DirectionalLight(0xffffff,1.65);key.position.set(3,4,5);camera.add(key);const rim=new THREE.DirectionalLight(0xffffff,.8);rim.position.set(-3,2,-3);camera.add(rim);scene.add(camera);
 controls=new OrbitControls(camera,canvas);controls.enableDamping=true;controls.dampingFactor=.12;controls.enablePan=false;controls.rotateSpeed=.65;controls.zoomSpeed=.85;controls.autoRotate=false;controls.addEventListener('change',invalidate);
 controls.addEventListener('start',()=>{$('gesture').hidden=true;});reset.onclick=fit;resize();
}catch{renderer?.dispose();renderer=null;message('webgl');input.disabled=true;}
function loading(){message('loading');empty.hidden=true;reset.disabled=true;$('gesture').hidden=true;document.body.classList.remove('ready');}
function accept(gltf,version){
 if(stopped||version!==run){dispose(gltf.scene);return;}
 const root=gltf.scene;root.updateMatrixWorld(true);const box=new THREE.Box3().setFromObject(root),sphere=box.getBoundingSphere(new THREE.Sphere());
 if(!Number.isFinite(sphere.radius)||sphere.radius<=0){dispose(root);throw new Error('Empty model');}
 if(model){scene.remove(model);dispose(model);}model=new THREE.Group();model.add(root);model.position.copy(sphere.center).negate();radius=sphere.radius;dimensions=box.getSize(new THREE.Vector3()).toArray();scene.add(model);fit();
 empty.hidden=true;reset.disabled=false;message('');$('gesture').hidden=false;document.body.classList.add('ready');$('replace').hidden=Boolean(packaged);invalidate();
}
async function openFiles(files){
 if(!renderer||!files.length)return;const version=++run;
 const roots=files.filter(f=>/\.(glb|gltf)$/i.test(f.name));if(roots.length!==1){message('error');return;}
 if(files.reduce((n,f)=>n+f.size,0)>50*1024*1024){message('size');return;}
 loading();const urls=[];
 try{
  const map=new Map();for(const file of files){if(map.has(file.name))throw new Error('Duplicate asset name');const url=URL.createObjectURL(file);urls.push(url);map.set(file.name,url);}
  const manager=new THREE.LoadingManager();manager.setURLModifier(url=>{
   if(url.startsWith('blob:')||url.startsWith('data:'))return url;
   const name=decodeURIComponent(url.split('/').pop());if(map.has(name))return map.get(name);
   throw new Error('Missing local texture or buffer');
  });
  const file=roots[0],data=/\.gltf$/i.test(file.name)?await file.text():await file.arrayBuffer();
  const gltf=await new GLTFLoader(manager).parseAsync(data,'');accept(gltf,version);
 }catch{if(version===run&&!stopped){message('error');empty.hidden=false;reset.disabled=!model;document.body.classList.toggle('ready',!!model);}}
 finally{for(const url of urls)URL.revokeObjectURL(url);input.value='';}
}
input.onchange=()=>openFiles(Array.from(input.files||[]));
const packaged=assetPath(new URLSearchParams(location.search).get('model'));
if(packaged&&renderer){const version=++run;loading();new GLTFLoader().load(new URL(packaged,location.href).href,gltf=>{try{accept(gltf,version);}catch{dispose(gltf.scene);message('error');empty.hidden=false;}},undefined,()=>{if(version===run&&!stopped){message('error');empty.hidden=false;}});}
window.addEventListener('resize',resize);const resizeObserver=new ResizeObserver(resize);resizeObserver.observe($('viewer'));
window.addEventListener('message',event=>{if(event.source===parent&&event.data?.skm==='stop'){cancelAnimationFrame(frame);frame=0;paused=true;}});
document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;}else invalidate();});
window.addEventListener('pagehide',()=>{stopped=true;run++;cancelAnimationFrame(frame);frame=0;controls?.dispose();dispose(model);environment?.dispose();renderer?.dispose();renderer?.forceContextLoss();resizeObserver.disconnect();});
window.addEventListener('pageshow',event=>{if(event.persisted)location.reload();});
canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();cancelAnimationFrame(frame);frame=0;message('webgl');});
canvas.addEventListener('webglcontextrestored',()=>location.reload());
