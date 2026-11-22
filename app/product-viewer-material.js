import * as THREE from 'three';

// The supplied STL has geometry only. Reconstruct a viewing material from the
// existing STG-05 product photograph; never modify that photo or the source STL.
export async function dressSTG05(root,renderer){
 const photo=await new THREE.TextureLoader().loadAsync(new URL('earth-assets/gloves/stg-05.jpg',location.href));
 photo.colorSpace=THREE.SRGBColorSpace;photo.flipY=false;photo.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());
 const oldMaterials=new Set();
 root.traverse(object=>{
  if(!object.isMesh)return;
  for(const old of [].concat(object.material||[]))oldMaterials.add(old);
  const material=new THREE.MeshPhysicalMaterial({color:0xe3dcc5,roughness:.94,metalness:0,sheen:.55,sheenColor:0xf0e9d7,sheenRoughness:.9,side:THREE.DoubleSide});
  // Keep the texture on the material too, so the viewer's disposal owns it.
  material.userData.reconstructedSTG05=true;material.skmPrintPhoto=photo;
  material.onBeforeCompile=shader=>{
   shader.uniforms.skmPrintPhoto={value:photo};
   shader.vertexShader=shader.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 skmPosition;\nvarying vec3 skmNormal;');
   shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nskmPosition=position;skmNormal=normal;');
   shader.fragmentShader=shader.fragmentShader.replace('#include <common>',`#include <common>
    uniform sampler2D skmPrintPhoto;
    varying vec3 skmPosition;
    varying vec3 skmNormal;
    // Filtered V-shaped stitch courses. Triplanar coordinates keep the weave
    // continuous around fingers and sides, without adding geometry or a large map.
    float skmStitch(vec2 p){
     vec2 st=p*vec2(145.0,190.0);
     float footprint=max(fwidth(st.x),fwidth(st.y));
     float fade=1.0-smoothstep(.35,1.25,footprint);
     float x=abs(fract(st.x)-.5);
     float course=fract(st.y+x*.9);
     float yarn=pow(.5+.5*cos(course*6.2831853),5.0);
     float columns=(1.0-smoothstep(.33,.49,x));
     return mix(.38,yarn*columns,fade);
    }
    float skmWeave(vec3 p,vec3 n){
     vec3 w=pow(abs(n),vec3(4.0));w/=max(dot(w,vec3(1.0)),.0001);
     return dot(vec3(skmStitch(p.zy),skmStitch(p.xz),skmStitch(p.xy)),w);
    }
    vec3 skmBump(vec3 eyePosition,vec3 surfaceNormal,float height){
     vec3 dx=dFdx(eyePosition),dy=dFdy(eyePosition);
     vec3 r1=cross(dy,surfaceNormal),r2=cross(surfaceNormal,dx);
     float determinant=dot(dx,r1);
     vec3 gradient=sign(determinant)*(dFdx(height)*r1+dFdy(height)*r2);
     return normalize(abs(determinant)*surfaceNormal-gradient);
    }
   `);
   shader.fragmentShader=shader.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>
    float knit=skmWeave(skmPosition,normalize(skmNormal));
    float cuff=1.0-smoothstep(-.28,-.24,skmPosition.y);
    float ribs=.5+.5*cos(skmPosition.x*1100.0);
    float cloth=mix(knit,knit*.55+ribs*.45,cuff);
    diffuseColor.rgb*=.83+.22*cloth;
    // Project only the printed palm area from the unchanged product photo.
    // This is a reconstructed preview, not an original UV/texture export.
    vec2 area=(skmPosition.xy-vec2(.052,-.285))/vec2(.29,.325);
    float inside=step(0.0,area.x)*step(area.x,1.0)*step(0.0,area.y)*step(area.y,1.0);
    vec2 photoUV=vec2(mix(.670,.345,area.x),mix(.728,.363,area.y));
    vec3 photographed=texture2D(skmPrintPhoto,clamp(photoUV,vec2(0.0),vec2(1.0))).rgb;
    float dark=1.0-smoothstep(.12,.48,dot(photographed,vec3(.2126,.7152,.0722)));
    float front=smoothstep(.15,.55,normalize(skmNormal).z)*smoothstep(.015,.045,skmPosition.z);
    float ink=dark*inside*front;
    diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.022,.024,.021),ink*.92);
   `);
   shader.fragmentShader=shader.fragmentShader.replace('#include <normal_fragment_maps>',`#include <normal_fragment_maps>
    normal=skmBump(-vViewPosition,normal,cloth*.00045);
   `);
  };
  material.customProgramCacheKey=()=> 'skm-stg05-knit-v1';object.material=material;
 });
 for(const old of oldMaterials)old.dispose();
}
