import copy from './onboarding-guide-copy.json';
export function mountOnboarding(){
 const api=window.SKMLanguage,auth=window.SKMBooking,root=document.querySelector('#skm-earth-preview');
 const e=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text)n.textContent=text;return n;};
 const key=()=>`skm-guide-v2:${auth.session()?.user?.id||'guest'}`;
 let overlay=null,welcome=null,tick=null,step=0,priorFocus=null,owner=null;
 const label=k=>api.t(k);
 const targets=['.earth-stage','[data-survey=cities]','[data-feature=tattoo]','[data-feature=gloves]','[data-feature=music]','[data-survey=live]','.earth-brand','.earth-account'];
 function finish(){if(owner===auth.session()?.user?.id)try{localStorage.setItem(key(),'done');}catch{}clearInterval(tick);overlay?.remove();overlay=null;welcome?.close();welcome?.remove();welcome=null;priorFocus?.focus();const dest=sessionStorage.getItem('skm-guide-return-v2');sessionStorage.removeItem('skm-guide-return-v2');if(['/app/account.html','/app/messages.html','/app/admin.html','/world.html#bodymap'].includes(dest))location.replace(dest);}
 function place(){if(!overlay)return;let target=root.querySelector(targets[step]);if(!target)return;const r=target.getBoundingClientRect(),hole=overlay.querySelector('.skm-guide-hole'),bubble=overlay.querySelector('.skm-guide-bubble');
  const globe=step===0,w=globe?Math.min(innerWidth*.72,300):r.width+12,h=globe?w:r.height+12,x=globe?(innerWidth-w)/2:r.left-6,y=globe?innerHeight*.26:r.top-6;
  Object.assign(hole.style,{left:x+'px',top:y+'px',width:w+'px',height:h+'px',borderRadius:globe?'50%':'16px'});
  const b=bubble.getBoundingClientRect(),left=Math.max(16,Math.min(innerWidth-b.width-16,x+w/2-b.width/2));let top=y+h+18,above=top+b.height>innerHeight-20;
  if(above)top=Math.max(76,y-b.height-18);bubble.toggleAttribute('data-above',above);Object.assign(bubble.style,{left:left+'px',top:Math.min(innerHeight-b.height-16,top)+'px'});bubble.style.setProperty('--arrow-x',Math.max(20,Math.min(b.width-30,x+w/2-left))+'px');
 }
 function paint(){
  if(!overlay)return;const text=copy[api.code]||copy.en;
  if(step>=2&&step<=4&&!root.classList.contains('city-focus'))root.querySelector('.survey-cities button')?.click();
  if((step<2||step>4)&&root.classList.contains('city-focus'))root.querySelector('.earth-world')?.click();
  const bubble=overlay.querySelector('.skm-guide-bubble');bubble.querySelector('small').textContent=`${step+1} / 8`;bubble.querySelector('h2').textContent=text[step*2];bubble.querySelector('p').textContent=text[step*2+1];
  const back=bubble.querySelector('[data-back]'),next=bubble.querySelector('[data-next]');back.textContent=label('back');back.disabled=step===0;next.textContent=step===7?label('close'):label('next');overlay.querySelector('.skm-guide-skip').textContent=label('close');place();
 }
 function guide(){
  welcome?.close();welcome?.remove();welcome=null;step=0;overlay=e('div','skm-guide');overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');overlay.setAttribute('aria-label','SKINOMAKASE');
  overlay.innerHTML='<div class="skm-guide-hole"></div><section class="skm-guide-bubble"><small></small><h2></h2><p></p><nav class="skm-guide-actions"><button type="button" data-back></button><button type="button" data-next></button></nav></section><button type="button" class="skm-guide-skip"></button>';
  document.body.append(overlay);overlay.querySelector('[data-back]').onclick=()=>{step=Math.max(0,step-1);paint();};overlay.querySelector('[data-next]').onclick=()=>step===7?finish():(step++,paint());overlay.querySelector('.skm-guide-skip').onclick=finish;
  overlay.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();finish();}if(event.key==='Tab'){const bs=[...overlay.querySelectorAll('button:not(:disabled)')],i=bs.indexOf(document.activeElement);event.preventDefault();bs[(i+(event.shiftKey?-1:1)+bs.length)%bs.length].focus();}});
  paint();overlay.querySelector('[data-next]').focus();tick=setInterval(place,100);
 }
 function show(){if(overlay||welcome||!auth.session()?.user?.id)return;owner=auth.session().user.id;priorFocus=document.activeElement;welcome=e('dialog');welcome.id='skm-welcome';welcome.innerHTML='<small>SKINOMAKASE</small><h1></h1><select></select><button type="button"></button>';
  const select=welcome.querySelector('select');for(const l of api.languages){const o=e('option','',l.name);o.value=l.code;select.append(o);}select.value=api.code;
  const update=()=>{welcome.querySelector('h1').textContent=label('language');select.setAttribute('aria-label',label('language'));welcome.querySelector('button').textContent=label('next');};select.onchange=()=>{api.set(select.value);update();};welcome.querySelector('button').onclick=guide;welcome.addEventListener('cancel',event=>{event.preventDefault();finish();});update();document.body.append(welcome);welcome.showModal();select.focus();
 }
 const replay=e('button','','ⓘ');replay.type='button';replay.id='skm-tour-replay';replay.textContent=api.t('guide')==='guide'?(api.code==='ko'?'사용 방법':'Guide'):api.t('guide');document.querySelector('#skm-language-dialog')?.append(replay);replay.onclick=()=>{document.querySelector('#skm-language-dialog')?.close();show();};
 window.SKMGuide={show};window.addEventListener('skm-language',paint);window.addEventListener('skm-account-changed',()=>{if(owner&&owner!==auth.session()?.user?.id)finish();});
 auth.verifiedAppUser().then(ok=>{if(!ok)return;let seen=false;try{seen=localStorage.getItem(key())==='done';}catch{}if(!seen&&!new URLSearchParams(location.search).has('gloves')&&!location.hash)show();}).catch(()=>{});
 window.addEventListener('pagehide',()=>{clearInterval(tick);});
}
