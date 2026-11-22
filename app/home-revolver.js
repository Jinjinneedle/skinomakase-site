/* Website-style landing: authenticated logo toggle and seven fixed destinations. */
(() => {
const T=key=>window.SKMLanguage?.t(key)||key;
  'use strict';
  const source=document.getElementById('itemsLayer');
  const viewport=document.querySelector('.viewport');
  const order=['glove','accessory','shelter','bodymap','video','strobe','headset'];
  const names=()=>['glove','accessory','shelter','bodymap','video','morse','music'].map(T);
  const colors=['#d46682','#cf9644','#a0a044','#559a76','#439fb9','#5f7fc3','#a06db5'];
  const root=document.createElement('section');
  root.id='home-revolver';
  root.className='sleeping static-menu';
  root.innerHTML='<div class="revolver-wheel"></div><div class="revolver-orbit"></div><button type="button" class="revolver-center" aria-label="SKM" aria-expanded="false"><span class="revolver-logo-crop"><img src="app/logo-transparent.png" alt="SKM"></span></button><p id="home-entry-status" role="status"></p><div class="revolver-status" aria-live="polite"></div>';
  viewport.append(root);
  const wheel=root.querySelector('.revolver-wheel');
  const orbit=root.querySelector('.revolver-orbit');
  const center=root.querySelector('.revolver-center');
  const status=root.querySelector('.revolver-status');
  const entryStatus=root.querySelector('#home-entry-status');
  orbit.inert=true;
  const svgNS='http://www.w3.org/2000/svg';
  const connections=document.createElementNS(svgNS,'svg');
  connections.setAttribute('viewBox','0 0 500 500');
  connections.setAttribute('aria-hidden','true');
  connections.classList.add('landing-connections');
  const positions=order.map((_,i)=>{
    const angle=i*2*Math.PI/order.length;
    return {x:50+38*Math.sin(angle),y:50-38*Math.cos(angle)};
  });
  positions.forEach((point,i)=>{
    const line=document.createElementNS(svgNS,'line');
    line.setAttribute('x1','250');line.setAttribute('y1','250');
    // The endpoint is the icon's actual center, using the same normalized coordinates.
    line.setAttribute('x2',String(point.x*5));line.setAttribute('y2',String(point.y*5));
    line.setAttribute('stroke',colors[i]);
    connections.append(line);
  });
  wheel.append(connections);
  const pulse=()=>{try{window.SKMApp?.haptic?.('light');}catch(_){}};
  function closeMenu(){
    root.classList.add('sleeping');orbit.inert=true;
    center.setAttribute('aria-expanded','false');status.textContent='';entryStatus.textContent='';
  }
  function openMenu(){
    root.classList.remove('sleeping');orbit.inert=false;
    center.setAttribute('aria-expanded','true');updateClock();
  }
  let entering=false;
  center.addEventListener('click',async()=>{
    if(entering)return;
    pulse();
    if(!window.SKMTheme?.eligible&&!root.classList.contains('sleeping')){closeMenu();return;}
    entering=true;center.disabled=true;center.setAttribute('aria-busy','true');
    entryStatus.textContent=T('checkingLogin');
    try{
      await window.SKMEnterHome(window.SKMBooking,!!window.webkit?.messageHandlers?.skmAuth);
      await window.SKMTheme?.refresh();
      entryStatus.textContent='';openMenu();
      if(window.SKMTheme?.eligible)await window.SKMTheme.openConversation();
    }catch(error){
      entryStatus.textContent=error.code==='native-only'?error.message:T('loginFailed');
    }finally{entering=false;center.disabled=false;center.removeAttribute('aria-busy');}
  });
  window.addEventListener('skm-return-home',()=>{entryStatus.textContent='';openMenu();});
  const buttons=[];
  function mount(){
    if(buttons.length||order.some(name=>!source.querySelector('[data-category="'+name+'"]')))return;
    order.forEach((name,i)=>{
      const original=source.querySelector('[data-category="'+name+'"]');
      const button=document.createElement('button');
      button.type='button';button.className='revolver-icon';button.dataset.category=name;
      button.setAttribute('aria-label',names()[i]);
      button.style.left=positions[i].x+'%';button.style.top=positions[i].y+'%';
      button.style.transform='translate(-50%,-50%)';
      const art=document.createElement('span');art.className='revolver-art';
      const image=original.querySelector('img');
      if(image)art.append(image.cloneNode());
      else {
        const canvas=document.createElement('canvas');canvas.width=180;canvas.height=180;art.append(canvas);
        const copy=()=>{const existing=original.querySelector('canvas');if(existing?.width&&existing?.height){const context=canvas.getContext('2d');context.clearRect(0,0,180,180);context.drawImage(existing,0,0,180,180);}};
        copy();setTimeout(copy,700);
      }
      button.append(art);
      button.addEventListener('focus',()=>{status.textContent=names()[i];});
      button.addEventListener('blur',()=>{status.textContent='';});
      button.addEventListener('click',()=>{
        if(root.classList.contains('sleeping'))return;
        pulse();
        if(name==='glove'){window.openAppPage('app/gloves.html');setTimeout(()=>document.getElementById('appFrame')?.contentWindow?.postMessage({skm:'gloves-open'},'*'),100);return;}
        if(name==='headset'){window.openSKMMusic?.();return;}
        if(name==='accessory'){window.open('https://4thdeath.com/products/dgtg-01','_blank','noopener,noreferrer');return;}
        original.click();
      });
      orbit.append(button);buttons.push(button);
    });
  }
  mount();
  if(!buttons.length){const observer=new MutationObserver(()=>{mount();if(buttons.length)observer.disconnect();});observer.observe(source,{childList:true});}
  window.addEventListener('skm-language',()=>buttons.forEach((button,i)=>button.setAttribute('aria-label',names()[i])));
  window.addEventListener('storage',event=>{if(event.key==='skm-lang')buttons.forEach((button,i)=>button.setAttribute('aria-label',names()[i]));});

  // Retain the existing country/time/rate utility, visible only with the open menu.
  const cities=window.SKM_WORLD_CLOCK||[{locale:'ko-KR',zone:'Asia/Seoul',currency:'KRW',name:'대한민국',city:'서울'}];
  let cityIndex=Math.max(0,cities.findIndex(city=>city.locale.startsWith((localStorage.getItem('skm-lang')||'ko')+'-')));
  const clock=document.createElement('section');clock.id='revolver-clock';clock.setAttribute('role','group');
  clock.innerHTML='<span class="clock-city"></span><time></time>';
  const picker=document.createElement('select');picker.id='world-country-picker';picker.setAttribute('aria-label','Country / Region');
  cities.forEach((city,i)=>{const option=document.createElement('option');option.value=i;option.textContent=city.name+(city.city?' · '+city.city:'');option.lang=city.locale;picker.append(option);});
  clock.querySelector('.clock-city').append(picker);document.body.append(clock);
  picker.value=String(cityIndex);
  picker.addEventListener('change',()=>{cityIndex=Number(picker.value);pulse();updateClock();});
  function updateClock(){
    if(document.hidden||root.classList.contains('sleeping'))return;
    const now=new Date(),city=cities[cityIndex],time=clock.querySelector('time');
    clock.dataset.currency=city.currency;clock.dataset.locale=city.locale;clock.lang=city.locale;
    clock.dir=['ar','fa','he','ur','ps'].includes(city.locale.split('-')[0])?'rtl':'ltr';
    time.dateTime=now.toISOString();time.textContent=now.toLocaleTimeString(city.locale,{timeZone:city.zone,hour:'2-digit',minute:'2-digit',hour12:false});
    clock.setAttribute('aria-label',city.name+' '+time.textContent);
  }
  setInterval(updateClock,1000);
})();
