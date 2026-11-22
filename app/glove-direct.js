import {glovePreview} from './glove-preview.cjs';
import {mountPickup} from './glove-pickup.js';
import {gloveNetwork} from './glove-network-layout.cjs';
import {Hand,MapPin,ArrowUpRight,ArrowLeft,Send,X,UserRound,LockKeyhole,createElement,createIcons} from 'lucide';
import {gloveDropPlan} from './glove-drop-plan.js';
import routing from './glove-slot-model.cjs';
import {checkoutText as purchaseText} from './glove-checkout-copy.js';

const icons=()=>createIcons({icons:{Hand,MapPin,ArrowUpRight,ArrowLeft,Send,X,UserRound,LockKeyhole}});
const node=(tag,text,cls)=>{const e=document.createElement(tag);if(text!=null)e.textContent=text;if(cls)e.className=cls;return e;};
const icon=name=>{const e=node('i');e.dataset.lucide=name;e.setAttribute('aria-hidden','true');return e;};
function button(label,fn,cls=''){const e=node('button',label,cls);e.type='button';e.onclick=fn;return e;}
function pairArt(cls='',print){
 const art=node('span',null,'glove-pair-art '+cls);
 for(let side=0;side<2;side++){
  const hand=createElement(Hand);
  hand.setAttribute('aria-hidden','true');
  if(print){
   const mark=document.createElementNS('http://www.w3.org/2000/svg','image');
   mark.setAttribute('href',print);
   mark.setAttribute('x','7.4');mark.setAttribute('y','9.5');
   mark.setAttribute('width','13.2');mark.setAttribute('height','12.2');
   hand.append(mark);
  }
  art.append(hand);
 }
 return art;
}
function detailArt(plan){
 if(!plan?.photo)return pairArt('glove-large-art');
 const image=node('img',null,'glove-detail-photo');
 image.alt=plan.code;
 image.onerror=()=>image.replaceWith(pairArt('glove-large-art',plan.print));
 image.src=plan.photo;
 return image;
}
// Keep local preview conversations with their original city after renumbering.
const messageKey=(cityId,code,n)=>'skm-glove-direct-preview-v1:'+(cityId==='5128581'?'STG-08':code)+':'+n;

// The grid is a collection preview. Private pickup details use the signed-in customer API.
export function mountGloveDirect(root,countries){
 const panel=root.querySelector('.earth-drop-panel'),grid=panel.querySelector('.earth-drop-grid');
 const sheet=node('dialog',null,'glove-direct-sheet');sheet.setAttribute('aria-label','장갑');root.querySelector('.earth-app').append(sheet);
 let city=null,selected=null,networkButtons=[],networkSVG=null,layoutWidth=0,layoutHeight=0;
 const colors=['#d46682','#cf9644','#a0a044','#559a76','#439fb9','#5f7fc3','#a06db5'];
 const owned=status=>['owned','sold','collected'].includes(status);
 function connectGloves(){
  const width=grid.clientWidth,height=grid.clientHeight;
  if(!networkSVG||!networkButtons.length||width<1||height<1||(layoutWidth===width&&layoutHeight===height))return;
  layoutWidth=width;layoutHeight=height;
  // The brand sits at the screen center, not the center below the toolbar.
  const centerY=Math.max(1,Math.min(height-1,window.innerHeight/2-grid.getBoundingClientRect().top));
  const layout=gloveNetwork(networkButtons.length,width,2*Math.min(centerY,height-centerY));
  const offsetY=centerY-layout.height/2;
  layout.center.y+=offsetY;
  for(const point of layout.points)point.y+=offsetY;
  grid.style.setProperty('--glove-scale',layout.scale);
  grid.querySelector('.glove-network-hub').style.top=centerY/height*100+'%';
  networkSVG.setAttribute('viewBox','0 0 '+width+' '+height);
  networkSVG.replaceChildren();
  layout.points.forEach((point,i)=>{
   const b=networkButtons[i];b.style.left=point.x/layout.width*100+'%';b.style.top=point.y/height*100+'%';
   b.style.setProperty('--from-x',(layout.center.x-point.x)+'px');b.style.setProperty('--from-y',(layout.center.y-point.y)+'px');b.style.setProperty('--spread-delay',i*5+'ms');
   const line=document.createElementNS('http://www.w3.org/2000/svg','line');line.setAttribute('x1',layout.center.x);line.setAttribute('y1',layout.center.y);line.setAttribute('x2',point.x);line.setAttribute('y2',point.y);line.setAttribute('stroke',colors[i%colors.length]);line.setAttribute('pathLength','1');line.dataset.to=String(i+1);line.dataset.owned=String(owned(b.dataset.status));networkSVG.append(line);
  });
 }
 const networkObserver=new ResizeObserver(connectGloves);networkObserver.observe(grid);
 let releasePickup=null;
 function clearPickup(){releasePickup?.();releasePickup=null;}
 const close=()=>{closeModel();clearPickup();sheet.close();selected=null;};
 sheet.addEventListener('close',()=>{if(!sheet.open)clearPickup();});
 let gridGeneration=0,visibilityRun=0,dropsLive=false;
 async function syncGrid(){
  const generation=++gridGeneration,api=window.SKMBooking;
  const user=api?.session()?.user?.id,current=city;
  if(!dropsLive||!current||panel.hidden||!user||(previewCode && previewCode===gloveDropPlan[current.id]?.code))return;
  try{
   const result=await api.gloveList();
   if(generation!==gridGeneration||panel.hidden||city!==current||api.session()?.user?.id!==user)return;
   for(const [index,b] of networkButtons.entries()){
    const info=routing.pickupForPair(result,current,index+1);
    const state=info?.drop.status||'draft';
    b.dataset.status=state;
    const label=info?window.SKMGloveText(info.request?.status||state):window.SKMGloveText('draft');
    b.setAttribute('aria-label',b.dataset.itemName+' · '+label);
    const line=networkSVG?.children[index];if(line)line.dataset.owned=String(owned(state));
   }
  }catch{/* Public collection artwork remains usable offline. */}
 }
 function setOpen(open){
  const run=++visibilityRun;
  if(!open)close();
  panel.hidden=!open;
  if(open){
   root.scrollTop=0;panel.scrollTop=0;layoutWidth=0;connectGloves();
   const availability=window.SKMBooking?.dropLive;
   if(availability)availability().catch(()=>false).then(value=>{
    if(run!==visibilityRun||panel.hidden)return;
    if(dropsLive!==(value===true)){dropsLive=value===true;render(city);connectGloves();}
    syncGrid();
   });
  }
 }
 sheet.addEventListener('click',e=>{if(e.target===sheet){const r=sheet.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close();}});
 window.addEventListener('pagehide',()=>{close();networkObserver.disconnect();});
 window.addEventListener('pageshow',()=>{networkObserver.observe(grid);connectGloves();});
 // Deep-linked collection previews retain the simulated pickup and chat examples.
 // In the ordinary city menu, upcoming drops have no publicly available inventory.
 const previewCode=new URLSearchParams(location.search).get('gloves');
 const render=next=>{
  city=next;
  close();
  const plan=gloveDropPlan[city.id];
  const cityName=city.label.toLowerCase().replace(/\b[a-z]/g,c=>c.toUpperCase());
  const label=city.ko||cityName;
  const title=panel.querySelector('h2');
  title.replaceChildren(document.createTextNode(label));
  const preview=Boolean(dropsLive&&plan?.code && plan.code===previewCode);


  grid.replaceChildren();
  networkButtons=[];layoutWidth=0;layoutHeight=0;
  grid.setAttribute('aria-label',city.ko+' 장갑');
  networkSVG=document.createElementNS('http://www.w3.org/2000/svg','svg');
  networkSVG.classList.add('glove-network-lines');
  networkSVG.setAttribute('aria-hidden','true');
  networkSVG.setAttribute('preserveAspectRatio','none');
  const hub=node('div',null,'glove-network-hub'),logo=node('img');
  logo.src='app/logo-transparent.png';logo.alt='SKINOMAKASE';hub.append(logo);
  grid.append(networkSVG,hub);

  // Unnumbered cities use the same placeholder artwork, without assigning serials.
  const count=plan?.pairs ?? 50;
  for(let n=1;n<=count;n++){
   const status=preview ? routing.previewSlot(n) : 'draft';
   const route=routing.routeGlove({status,preview});
   const itemName=plan?.code ? plan.code+' / '+String(n).padStart(3,'0') : cityName;
   const b=button('',()=>open(plan,itemName,n,route,preview),'earth-drop-pair');
   b.dataset.itemName=itemName;b.dataset.status=status;b.setAttribute('aria-label',itemName+' · '+route.label);
   b.append(pairArt('',plan?.print));grid.append(b);networkButtons.push(b);
  }
  connectGloves();icons();
 };
 function heading(itemName,route){
  const h=node('header',null,'glove-direct-header'),back=button('',close,'glove-icon-button');back.setAttribute('aria-label','장갑 목록으로');back.append(icon('arrow-left'));
  const id=node('div');id.append(node('strong',itemName),node('span',route.label,'glove-direct-status'));
  const quit=button('',close,'glove-icon-button');quit.setAttribute('aria-label','닫기');quit.append(icon('x'));h.append(back,id,quit);sheet.append(h);
 }
 function open(plan,itemName,n,route,preview){
  clearPickup();selected=n;
  if(!(preview&&route.view==='chat')){openProduct(glovePreview(plan,city),itemName,n,route,preview);return;}
  sheet.replaceChildren();sheet.dataset.view=route.view;heading(itemName,route);
  if(preview)sheet.append(node('span','미리보기','glove-preview-mark'));
  if(preview&&route.view==='chat')drawChat(plan,n);
  else{
   drawUnavailable(plan);
   const section=node('section',null,'glove-map-section');
   sheet.append(section);
   releasePickup=mountPickup(section,{city,number:n,itemName,live:dropsLive,preview,navigate:path=>{close();window.openAppPage(path);},
    onState:(status,requestStatus)=>{
     const label=requestStatus?window.SKMGloveText(requestStatus):window.SKMGloveText(status);
     sheet.querySelector('.glove-direct-status').textContent=label;
     const item=networkButtons[n-1];item.dataset.status=status;item.setAttribute('aria-label',itemName+' · '+label);
    }
   });

  }
  icons();if(!sheet.open)sheet.showModal();
 }
 const modelDialog=node('dialog',null,'glove-model-dialog');modelDialog.setAttribute('aria-label','3D');document.body.append(modelDialog);
 let modelFrame=null;
 function closeModel(){if(modelDialog.open)modelDialog.close();if(modelDialog.dataset.product)clearPickup();modelFrame?.remove();modelFrame=null;}
 modelDialog.addEventListener('close',()=>{if(modelDialog.open)return;if(modelDialog.dataset.product)clearPickup();modelFrame?.remove();modelFrame=null;});
 window.addEventListener('message',event=>{
  if(event.source!==modelFrame?.contentWindow||event.data?.skm!=='product-viewer-close')return;
  if(event.origin!==location.origin&&!(event.origin==='null'&&location.protocol==='skm:'))return;
  closeModel();
 });
 function openProduct(plan,itemName,n,route,preview){
  closeModel();if(sheet.open)sheet.close();
  modelDialog.dataset.product='true';modelDialog.setAttribute('aria-label',itemName);
  const shell=node('div',null,'glove-product-shell'),head=node('header',null,'glove-product-header');
  const title=node('strong',plan.code),quit=button('×',closeModel,'glove-product-close');quit.setAttribute('aria-label',purchaseText('close'));
  head.append(title,quit);
  const location=node('section',null,'glove-product-location');location.setAttribute('aria-label',purchaseText('pickup'));location.hidden=plan.previewOnly&&!plan.publicPickup;
  const stage=node('div',null,'glove-product-stage');
  modelFrame=node('iframe');modelFrame.title=plan.code+' · 3D';modelFrame.src='app/product-viewer.html?model='+encodeURIComponent(plan.model)+'&embedded=1&mosaic=1';stage.append(modelFrame);
  const purchase=node('section',null,'glove-product-checkout');purchase.setAttribute('aria-label',purchaseText('price'));
  shell.append(head,location,stage,purchase);modelDialog.replaceChildren(shell);modelDialog.showModal();
  releasePickup=mountPickup(purchase,{city,number:n,itemName,live:dropsLive&&!plan.previewOnly,preview,locationHost:location,pickupPlan:plan.publicPickup,
   navigate:path=>{close();window.openAppPage(path);},onState:(status,requestStatus)=>{
    const b=networkButtons[n-1];if(!b)return;b.dataset.status=status;b.setAttribute('aria-label',itemName+' · '+window.SKMGloveText(requestStatus||status));
   }});
 }
 function openModel(plan){
  if(!/^models\/[a-zA-Z0-9_-]+\.glb$/.test(plan.model||''))return;
  closeModel();delete modelDialog.dataset.product;modelFrame=node('iframe');modelFrame.title=plan.code+' · 3D';
  modelFrame.src='app/product-viewer.html?model='+encodeURIComponent(plan.model);
  modelDialog.replaceChildren(modelFrame);modelDialog.showModal();
 }
 function drawUnavailable(plan){
  const p=node('div',null,'glove-unavailable');
  if(plan?.model){const view=button('',()=>openModel(plan),'glove-model-open');view.setAttribute('aria-label','3D로 보기');view.append(detailArt(plan),node('span','3D ↗','glove-model-badge'));p.append(view);}
  else p.append(detailArt(plan));sheet.append(p);
 }
 function drawChat(plan,n){
  const code=plan.code;
  let messages=[];try{const saved=JSON.parse(localStorage.getItem(messageKey(city.id,code,n)));if(Array.isArray(saved))messages=saved.filter(m=>typeof m.text==='string'&&m.text.length<=1000&&Number.isFinite(m.at)).slice(-100);}catch{}
  const owner=node('div',null,'glove-chat-owner');owner.append(plan.photo?detailArt(plan):icon('user-round'),node('span','보유자'),node('small','실제 전송 안 됨'));sheet.append(owner);
  const log=node('div',null,'glove-chat-log');log.setAttribute('role','log');log.setAttribute('aria-live','polite');log.setAttribute('aria-label','보유자와 대화');sheet.append(log);
  function paint(){log.replaceChildren();if(!messages.length){const empty=node('div',null,'glove-chat-empty');empty.append(pairArt(),node('p','메시지를 보내보세요'));log.append(empty);}for(const m of messages){const bubble=node('div',null,'glove-chat-message');bubble.append(node('p',m.text),node('time',new Date(m.at).toLocaleTimeString('ko-KR',{hour:'2-digit',minute:'2-digit'})));log.append(bubble);}log.scrollTop=log.scrollHeight;}
  const form=node('form',null,'glove-chat-compose'),input=node('textarea'),send=node('button');input.rows=1;input.maxLength=1000;input.placeholder='메시지';input.setAttribute('aria-label','메시지');send.type='submit';send.setAttribute('aria-label','보내기');send.append(icon('send'));const status=node('p',null,'glove-chat-error');status.setAttribute('role','status');
  input.oninput=()=>{send.disabled=!input.value.trim();};send.disabled=true;
  form.onsubmit=e=>{e.preventDefault();const text=input.value.trim();if(!text||text.length>1000)return;const next=[...messages,{text,at:Date.now()}].slice(-100);try{localStorage.setItem(messageKey(city.id,code,n),JSON.stringify(next));messages=next;input.value='';send.disabled=true;status.textContent='';paint();input.focus();}catch{status.textContent='저장하지 못했어요. 다시 시도해주세요.';}};
  form.append(input,send);sheet.append(form,status);paint();
 }
 return {render,close,setOpen};
}
