import natureLocations from './nature-cameras.json';
import publicCameras from './public-cameras.json';
const locations=[...natureLocations,...publicCameras];

export function mountNaturePins(layer, toVector, translate, canOpen) {
  let currentDialog;
  function show(title,build){
    currentDialog?.close();
    const dialog=document.createElement('dialog'),header=document.createElement('header');
    const heading=document.createElement('strong'),close=document.createElement('button');
    dialog.className='nature-window';dialog.setAttribute('aria-label',title);
    heading.textContent=title;close.type='button';close.textContent=translate('close');close.onclick=()=>dialog.close();
    header.append(heading,close);dialog.append(header);build(dialog);document.body.append(dialog);
    dialog.addEventListener('close',()=>{dialog.remove();if(currentDialog===dialog)currentDialog=null;},{once:true});
    currentDialog=dialog;dialog.showModal();
  }
  function open(camera){
    if(camera.page){show(camera.name+' · '+camera.publisher,dialog=>{const link=document.createElement('a');link.href=camera.page;link.textContent=camera.publisher+' ↗';link.target='_blank';link.rel='noopener noreferrer';dialog.append(link);});return;}
    if(location.protocol==='skm:'){
      location.href='skm-camera://'+camera.id+'?close='+encodeURIComponent(translate('close'));return;
    }
    show(camera.name+' · '+camera.publisher,dialog=>{
      const player=document.createElement('iframe'),link=document.createElement('a');
      player.title=camera.name;player.allow='autoplay; encrypted-media; fullscreen; picture-in-picture';
      player.referrerPolicy='strict-origin-when-cross-origin';
      player.src='https://www.youtube-nocookie.com/embed/'+camera.video+'?playsinline=1&autoplay=1&mute=1';
      link.href='https://www.youtube.com/watch?v='+camera.video;link.textContent='YouTube ↗';
      link.target='_blank';link.rel='noopener noreferrer';dialog.append(player,link);
    });
  }
  function choose(group){
    if(group.length===1){open(group[0]);return;}
    show('YouTube · '+group.length,dialog=>{
      dialog.classList.add('nature-picker');
      for(const camera of group){
        const b=document.createElement('button');b.type='button';b.textContent=camera.name;
        b.onclick=()=>{dialog.close();open(camera);};dialog.append(b);
      }
    });
  }
  const sites=locations.map(camera=>({camera,point:toVector(camera.lat,camera.lon)}));
  const pins=[];
  function makePin(){
    const b=document.createElement('button');b.type='button';b.className='earth-camera-pin';layer.append(b);
    const pin={button:b,items:[],key:''};
    b.onclick=()=>{if(canOpen())choose(pin.items)};return pin;
  }
  const render=function(project,cityTargets,width,height){
    const clusters=[];
    for(const {camera,point} of sites){
      const p=project(point);if(!p)continue;
      let cluster=clusters.find(c=>Math.hypot(c.x-p.x,c.y-p.y)<46);
      if(!cluster){cluster={...p,items:[]};clusters.push(cluster);}
      cluster.items.push(camera);
    }
    const occupied=cityTargets.map(({x,y})=>({x,y}));
    clusters.forEach((c,i)=>{
      const pin=pins[i]||(pins[i]=makePin()),b=pin.button;
      let x=c.x,y=c.y;
      const available=(x,y)=>x>=22&&x<=width-22&&y>=24&&y<=height-42&&occupied.every(q=>Math.hypot(q.x-x,q.y-y)>=43);
      if(!available(x,y)){
        let placed=false;
        for(const distance of [40,58,80]){
          for(let a=0;a<8;a++){
            const dx=Math.cos(a*Math.PI/4)*distance,dy=Math.sin(a*Math.PI/4)*distance;
            if(available(c.x+dx,c.y+dy)){x=c.x+dx;y=c.y+dy;placed=true;break;}
          }
          if(placed)break;
        }
      }
      const offset=Math.hypot(x-c.x,y-c.y);
      occupied.push({x,y});b.hidden=false;b.style.left=x+'px';b.style.top=y+'px';
      b.style.setProperty('--leader',offset>2?offset+'px':'0px');
      b.style.setProperty('--direction',Math.atan2(c.y-y,c.x-x)+'rad');
      const key=c.items.map(camera=>camera.id).join('|');
      if(pin.key!==key){pin.key=key;pin.items=c.items;b.textContent=c.items.length>1?'▷ '+c.items.length:'▷';
        b.setAttribute('aria-label',c.items.length===1?c.items[0].name+' · '+(c.items[0].page?c.items[0].publisher:'YouTube'):'YouTube · '+c.items.length+' · '+c.items[0].name);}
    });
    for(let i=clusters.length;i<pins.length;i++)pins[i].button.hidden=true;
  };
  render.open=open;return render;
}
