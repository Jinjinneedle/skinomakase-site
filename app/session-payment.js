/* Per-booking payment instructions; server decides which fields may be disclosed. */
(() => {
'use strict';
const api=window.SKMBooking;
const ko=()=>String(window.SKMLanguage?.locale||document.documentElement.lang).startsWith('ko');
const text=(a,b)=>ko()?a:b;
const el=(tag,value)=>{const n=document.createElement(tag);if(value!=null)n.textContent=value;return n;};
let opened=null;
function open(bookingId){
 opened?.close();const user=api.session()?.user?.id,dialog=el('dialog'),close=el('button',text('닫기','Close')),content=el('section');
 dialog.className='skm-session-payment';dialog.setAttribute('aria-label',text('결제 안내','Payment details'));close.type='button';close.onclick=()=>dialog.close();dialog.append(close,content);document.body.append(dialog);opened=dialog;dialog.showModal();
 const end=()=>dialog.close();window.addEventListener('skm-account-changed',end);window.addEventListener('pagehide',end);
 dialog.addEventListener('close',()=>{window.removeEventListener('skm-account-changed',end);window.removeEventListener('pagehide',end);dialog.remove();if(opened===dialog)opened=null;});
 const active=()=>dialog.open&&api.session()?.user?.id===user;
 async function load(){
  content.replaceChildren(el('p',text('불러오는 중…','Loading…')));
  try{
   const p=await api.sessionPayment(bookingId);if(!active())return;
   if(!p){content.replaceChildren(el('p',text('아직 예약금 안내가 등록되지 않았어요. 스튜디오와 대화에서 도안·가격·일정을 조율해 주세요. 승인 후 이곳에서 PayNow QR을 확인할 수 있어요.','Deposit instructions are not ready yet. Discuss your design, price and appointment in the conversation. The PayNow QR will appear here after approval.')));return;}
   const amount=n=>`SGD ${new Intl.NumberFormat(window.SKMLanguage?.locale||'en').format(n)}`;
   const heading=el('h2'),status=el('p',p.deposit_paid?text('예약금 입금 확인됨','Deposit confirmed'):text('스튜디오 예약금 안내','Studio deposit'));
   heading.append(window.SKMStudioLink?window.SKMStudioLink(p.studio):document.createTextNode(p.studio));
   const list=el('dl');for(const [label,value] of [[text('총액','Total'),amount(p.total)],[text('예약금','Deposit'),amount(p.deposit)],[p.deposit_paid?text('남은 결제액','Remaining balance'):text('예약금 차감 후 잔금','Balance after deposit'),amount(p.after_deposit)]]){list.append(el('dt',label),el('dd',value));}
   content.replaceChildren(heading,status,list);if(p.appointment)content.append(el('p',new Date(p.appointment).toLocaleString(window.SKMLanguage?.locale||'en',{timeZone:'Asia/Singapore'})+' · Singapore time'));
   if(!p.deposit_paid){
    content.append(el('p',text('스튜디오에 SGD 100을 보내 주세요.','Send SGD 100 directly to the studio.')));
    const url=await api.studioQRImage(p.qr_path);if(!active())return;
    const img=el('img');img.src=url;img.alt=text('스튜디오 PayNow 결제 QR','Studio PayNow payment QR');img.className='studio-payment-qr';
    img.onerror=()=>{if(active())content.append(el('p',text('QR을 불러오지 못했어요. 새로고침하거나 대화로 문의해 주세요.','Could not load the QR. Refresh or ask the studio in this conversation.')));};const frame=el('div');frame.className='studio-qr-frame';if(p.qr_path==='crevice-paynow-original-20261122.jpg')frame.classList.add('crevice-original-qr');frame.append(img);content.append(frame);
    const save=el('button',text('QR 사진 저장','Save QR image'));save.type='button';
    save.onclick=async()=>{save.disabled=true;try{if(!window.SKMApp?.savePhoto){window.open(url,'_blank','noopener');return;}const r=await fetch(url);if(!r.ok)throw Error();const blob=await r.blob();const reader=new FileReader();reader.onload=()=>{if(active())window.SKMApp.savePhoto(reader.result);};reader.readAsDataURL(blob);}catch{content.append(el('p',text('QR을 저장하지 못했어요.','Could not save the QR.')));}finally{save.disabled=false;}};content.append(save);
    content.append(el('small',text('QR 저장 → 은행 앱에서 불러오기. PayNow 이용이 어려우면 대화로 알려 주세요.','Save the QR → import it in your bank app. If you cannot use PayNow, message the studio.')));
   }else{
    if(p.address){const address=el('p',p.address);address.className='studio-address';content.append(el('h3',text('방문 장소','Your studio')),address);}
    if(p.remaining>0){content.append(el('p',text('잔금은 현금 또는 PayPal로 결제해 주세요.','Pay the remaining balance by cash or PayPal.')));
     if(p.paypal){const url=new URL(p.paypal);if(url.protocol==='https:'&&['paypal.me','www.paypal.me'].includes(url.hostname)&&!url.username&&!url.password){const a=el('a',text('PayPal로 잔금 결제','Pay balance with PayPal'));a.href=url.href;a.target='_blank';a.rel='noopener noreferrer';a.className='payment-link';content.append(a,el('small',text('PayPal에서 SGD와 위 잔금을 확인해 주세요.','Check SGD and the balance above on PayPal.')));}}
    }else content.append(el('p',text('추가로 결제할 잔금이 없어요.','No remaining balance.')));
   }
   if(!p.deposit_paid&&!p.admin&&p.code&&window.SKMChat){
    const tell=el('button',text('송금했어요 · 대화로 알리기','I paid · message the studio'));tell.type='button';tell.className='payment-primary';
    tell.onclick=()=>{dialog.close();window.SKMChat.open({bookingId,code:p.code,draft:text('예약금 SGD 100을 스튜디오로 보냈어요. 입금 확인 부탁드려요.','I transferred the SGD 100 deposit to the studio. Please confirm receipt.')});};content.append(tell);
   }
   const refresh=el('button',text('새로고침','Refresh'));refresh.type='button';refresh.onclick=load;content.append(refresh);
  }catch{if(active()){content.replaceChildren(el('p',text('결제 안내를 불러오지 못했어요.','Could not load payment details.')));const retry=el('button',text('다시 시도','Retry'));retry.onclick=load;content.append(retry);}}
 }
 load();return dialog;
}
window.SKMSessionPayment={open};
})();
