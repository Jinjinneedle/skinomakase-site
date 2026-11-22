/* A notification is a pointer, never authorization. The server validates the active user. */
(() => {
'use strict';
const key='skm-notification-booking-v1',uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
let pending,type;
try{
 const query=new URLSearchParams(location.search);type=query.has('thread')?'thread':'booking';const fromURL=query.get(type);
 if(uuid.test(fromURL||'')){pending=fromURL;sessionStorage.setItem(key,JSON.stringify({id:pending,type,at:Date.now()}));}
 else{const stored=JSON.parse(sessionStorage.getItem(key)||'null');if(stored&&Date.now()-stored.at<3600000&&uuid.test(stored.id)){pending=stored.id;type=stored.type==='thread'?'thread':'booking';}}
}catch{}
if(!pending)return;
const go=async()=>{
 if(!window.SKMBooking.session()?.user?.id){location.replace('login.html?next=account');return;}
 try{
  const user=window.SKMBooking.session().user.id,r=await (type==='thread'?window.SKMBooking.notificationThread(pending):window.SKMBooking.notificationBooking(pending));
  if(window.SKMBooking.session()?.user?.id!==user)return;
  if(!r)throw Error('not available');sessionStorage.removeItem(key);
  if(type==='thread'){location.replace('community.html?view=thread&id='+encodeURIComponent(r.id));return;}
  const chat=window.SKMChat.open({bookingId:r.id,code:r.code,admin:!!r.admin,onClose:()=>{if(location.pathname.endsWith('notification.html'))location.replace('account.html');}});
  return chat;
 }catch{
  sessionStorage.removeItem(key);const status=document.getElementById('notification-status')||document.getElementById('status');
  if(status)status.textContent=String(window.SKMLanguage?.locale||'').startsWith('ko')?'이 계정에서 열 수 없는 대화예요. 마이페이지에서 계정을 확인해 주세요.':'This conversation is not available to this account. Check your account and try again.';
 }
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go,{once:true});else go();
})();
