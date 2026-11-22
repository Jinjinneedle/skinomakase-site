import * as THREE from 'three';

const asset = 'app/earth-assets/';
const radians = Math.PI / 180;

// The lunar longitude, anomaly and latitude argument are measured in the ecliptic.
// Convert the resulting direction to the same Earth-fixed XYZ used by the globe.
export function moonDirection(date) {
  const days = date.getTime() / 86400000 - 10957.5;
  const anomaly = (134.963 + 13.064993 * days) * radians;
  const latitudeArgument = (93.272 + 13.229350 * days) * radians;
  const lon = (218.316 + 13.176396 * days + 6.289 * Math.sin(anomaly)) * radians;
  const lat = 5.128 * radians * Math.sin(latitudeArgument);
  const obliquity = 23.4393 * radians;
  const x = Math.cos(lon) * Math.cos(lat);
  const y = Math.sin(lon) * Math.cos(lat) * Math.cos(obliquity) - Math.sin(lat) * Math.sin(obliquity);
  const z = Math.sin(lon) * Math.cos(lat) * Math.sin(obliquity) + Math.sin(lat) * Math.cos(obliquity);
  const sidereal = (280.46061837 + 360.98564736629 * days) * radians;
  return new THREE.Vector3(x*Math.cos(sidereal)+y*Math.sin(sidereal), z, x*Math.sin(sidereal)-y*Math.cos(sidereal)).normalize();
}

export function mountOrbitalSky(scene, sky, stage, wake, detailedStars=true) {
  const loader = new THREE.TextureLoader();
  const bodies = new THREE.Group();
  scene.add(bodies);
  const sunCanvas = document.createElement('canvas');
  sunCanvas.width = sunCanvas.height = 128;
  const ctx = sunCanvas.getContext('2d');
  const halo = ctx.createRadialGradient(64,64,0,64,64,64);
  for (const [position, color] of [[0,'#ffffff'],[.22,'#fffef4'],[.24,'#fff2ce'],[.27,'#ffdb9355'],[.52,'#ffc67018'],[1,'#ffbd7000']]) halo.addColorStop(position,color);
  ctx.fillStyle=halo;ctx.fillRect(0,0,128,128);
  const sunTexture=new THREE.CanvasTexture(sunCanvas);sunTexture.colorSpace=THREE.SRGBColorSpace;
  const sun=new THREE.Sprite(new THREE.SpriteMaterial({map:sunTexture,depthWrite:false,toneMapped:false}));
  sun.scale.setScalar(2.8);bodies.add(sun);

  const lunarMaterial = new THREE.ShaderMaterial({
    uniforms:{surface:{value:null},sunDirection:{value:new THREE.Vector3()}},
    vertexShader:`varying vec2 lunarUV;varying vec3 lunarNormal;
      void main(){lunarUV=uv;lunarNormal=mat3(modelMatrix)*normal;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
    fragmentShader:`uniform sampler2D surface;uniform vec3 sunDirection;varying vec2 lunarUV;varying vec3 lunarNormal;
      void main(){float illumination=max(0.,dot(normalize(lunarNormal),sunDirection));
      vec3 rock=texture2D(surface,lunarUV).rgb;
      gl_FragColor=vec4(rock*(0.16+2.5*illumination),1.0);
      #include <colorspace_fragment>
      }`
  });
  const moon=new THREE.Mesh(new THREE.SphereGeometry(.55,32,20),lunarMaterial);
  moon.visible=false;bodies.add(moon);
  loader.load(asset+'moon.jpg',t=>{t.colorSpace=THREE.SRGBColorSpace;lunarMaterial.uniforms.surface.value=t;moon.visible=true;wake();});

  const tiles=[];
  const columns=8,rows=4, tileSize=1024, border=2, storedSize=tileSize+border*2;
  for(let row=0;detailedStars && row<rows;row++)for(let col=0;col<columns;col++){
    const geom=new THREE.SphereGeometry(70,12,10,col*2*Math.PI/columns,2*Math.PI/columns,row*Math.PI/rows,Math.PI/rows);
    const uv=geom.attributes.uv;
    for(let y=0;y<=10;y++)for(let x=0;x<=12;x++)uv.setXY(y*13+x,(border+tileSize*x/12)/storedSize,(border+tileSize*(1-y/10))/storedSize);
    geom.computeBoundingSphere();
    const mesh=new THREE.Mesh(geom,new THREE.MeshBasicMaterial({side:THREE.BackSide,toneMapped:false,depthTest:false,depthWrite:false}));
    mesh.renderOrder=-99;mesh.visible=false;sky.add(mesh);
    tiles.push({mesh,row,col,direction:geom.boundingSphere.center.clone().normalize(),loading:false,failed:false});
  }
  const forward=new THREE.Vector3(),previous=new THREE.Quaternion(),skyInverse=new THREE.Quaternion();
  const frustum=new THREE.Frustum(),matrix=new THREE.Matrix4();
  const centre=new THREE.Vector3(),north=new THREE.Vector3(),east=new THREE.Vector3();
  let wanted=[],inFlight=0,previousProjection='',refresh=true;
  function requestDetails(){
    for(const tile of wanted){
      if(inFlight>=2)break;
      if(tile.mesh.material.map||tile.loading||tile.failed)continue;
      tile.loading=true;inFlight++;
      loader.load(asset+'sky/'+tile.row+'-'+tile.col+'.jpg',texture=>{
        tile.loading=false;inFlight--;
        if(wanted.includes(tile)){
          texture.colorSpace=THREE.SRGBColorSpace;tile.mesh.material.map=texture;
          tile.mesh.material.needsUpdate=true;tile.mesh.visible=true;
        }else texture.dispose();
        stage.dataset.skyDetail=String(wanted.filter(t=>t.mesh.visible).length);
        requestDetails();wake();
      },undefined,()=>{tile.failed=true;tile.loading=false;inFlight--;requestDetails();});
    }
  }
  function view(camera){
    sky.position.copy(camera.position);bodies.position.copy(camera.position);
    if(!detailedStars)return;
    const projection=camera.projectionMatrix.elements;
    const signature=projection[0]+'|'+projection[5]+'|'+projection[8]+'|'+projection[9];
    if(!refresh && previous.angleTo(camera.quaternion)<.012 && signature===previousProjection)return;
    refresh=false;previous.copy(camera.quaternion);previousProjection=signature;
    sky.updateMatrixWorld(true);
    frustum.setFromProjectionMatrix(matrix.multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse));
    skyInverse.copy(sky.quaternion).invert();camera.getWorldDirection(forward).applyQuaternion(skyInverse);
    wanted=tiles.filter(t=>frustum.intersectsObject(t.mesh)).sort((a,b)=>b.direction.dot(forward)-a.direction.dot(forward)).slice(0,10);
    for(const tile of tiles)if(tile.mesh.visible&&!wanted.includes(tile)){
      tile.mesh.visible=false;tile.mesh.material.map.dispose();tile.mesh.material.map=null;tile.mesh.material.needsUpdate=true;
    }
    requestDetails();
  }
  function date(now,solar){
    const dir=moonDirection(now);moon.position.copy(dir).multiplyScalar(54);sun.position.copy(solar).multiplyScalar(60);
    centre.copy(dir).negate();north.set(0,1,0).addScaledVector(centre,-centre.y).normalize();east.crossVectors(centre,north);
    moon.quaternion.setFromRotationMatrix(matrix.makeBasis(centre,north,east));
    lunarMaterial.uniforms.sunDirection.value.copy(solar);
  }
  return {view,date,
    direction(kind){return (kind==='sun'?sun:moon).position.clone().normalize();},
    screenPoint(kind,camera){return (kind==='sun'?sun:moon).getWorldPosition(new THREE.Vector3()).project(camera);}
  };
}
