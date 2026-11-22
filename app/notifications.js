/* Optional native alerts and transactional email preferences. Never request permission on launch. */
(() => {
'use strict';
const api=window.SKMBooking,native=window.webkit?.messageHandlers?.skmPush;
const ko=()=>String(window.SKMLanguage?.locale||document.documentElement.lang).startsWith('ko'),T=(a,b)=>ko()?a:b;
const make=(tag,text)=>{const e=document.createElement(tag);if(text)e.textContent=text;return e;};
let syncing=false,registration='',dialog=null;
async function sync(){
 if(syncing||!native||!api.session()?.user?.id)return;syncing=true;
 const user=api.session().user.id;
 try{
  const config=await api.notificationSettings();if(!config.enabled||api.session()?.user?.id!==user)return;
  const s=await native.postMessage({action:'status'});if(!s.available||!s.authorized||!s.token||api.session()?.user?.id!==user)return;
  const key=[user,s.id,s.token,s.environment].join(':');if(key===registration)return;
  await api.registerPush({p_id:s.id,p_secret:s.secret,p_token:s.token,p_environment:s.environment,p_topic:s.topic});
  if(api.session()?.user?.id===user)registration=key;
 }catch{/* Account settings show connection failures; normal app navigation stays available. */}
 finally{syncing=false;}
}
async function disconnect(){
 registration='';if(!native||!api.session()?.user?.id)return;
 const s=await native.postMessage({action:'status'});if(s.available)await api.unregisterPush({p_id:s.id,p_secret:s.secret});
}
function open(){
 dialog?.close();const user=api.session()?.user?.id,d=make('dialog'),close=make('button',T('닫기','Close')),body=make('section');d.className='skm-session-payment';d.setAttribute('aria-label',T('알림','Notifications'));close.onclick=()=>d.close();d.append(close,body);document.body.append(d);d.showModal();dialog=d;
 const active=()=>d.open&&api.session()?.user?.id===user;
 const changed=()=>d.close();window.addEventListener('skm-account-changed',changed);d.addEventListener('close',()=>{window.removeEventListener('skm-account-changed',changed);d.remove();if(dialog===d)dialog=null;});
 async function load(){
  body.replaceChildren(make('h2',T('알림','Notifications')));
  try{
   const config=await api.notificationSettings();if(!active())return;
   if(!config.enabled){body.append(make('p',T('알림 서버 연결 준비 중이에요. 대화는 앱에서 확인할 수 있어요.','Notifications are being connected. You can still read and reply in the app.')));return;}
   const email=make('label',T('이메일 알림','Email notifications')),check=make('input');check.type='checkbox';check.checked=config.email;email.prepend(check);body.append(email);
   const status=make('p');status.setAttribute('role','status');body.append(status);
   check.onchange=async()=>{const value=check.checked;check.disabled=true;try{await api.notificationPreferences(value);if(active())status.textContent=T('저장했어요.','Saved.');}catch{if(active()){check.checked=!value;status.textContent=T('저장하지 못했어요. 다시 시도해 주세요.','Could not save. Please try again.');}}finally{check.disabled=false;}};
   if(!native){body.append(make('p',T('iPhone 앱에서 푸시 알림을 켤 수 있어요.','Enable push notifications in the iPhone app.')));return;}
   const s=await native.postMessage({action:'status'});if(!active())return;
   if(!s.available){body.append(make('p',T('푸시 알림은 정식 배포용 앱에서 연결됩니다.','Push notifications require the distribution build.')));return;}
   const button=make('button',s.authorized?T('iPhone 알림 설정','iPhone notification settings'):s.denied?T('설정에서 알림 허용','Allow notifications in Settings'):T('푸시 알림 켜기','Enable push notifications'));
   body.append(button,make('small',T('새 답장과 예약 변경을 알려드려요. 알림을 누르면 해당 대화가 열려요.','Get alerts for new replies and booking updates. Tap an alert to open its conversation.')));
   button.onclick=async()=>{button.disabled=true;try{await native.postMessage({action:s.authorized||s.denied?'settings':'request'});await sync();if(active())await load();}catch{if(active())status.textContent=T('알림 연결을 다시 시도해 주세요.','Please retry connecting notifications.');}finally{button.disabled=false;}};
   if(s.authorized){await sync();if(active())status.textContent=registration?T('푸시 알림이 연결됐어요.','Push notifications connected.'):T('기기 연결 중이에요. 잠시 후 다시 확인해 주세요.','Connecting your device. Please check again shortly.');}
  }catch{if(active())body.append(make('p',T('알림 설정을 불러오지 못했어요.','Could not load notification settings.')));}
 }
 load();
}
window.SKMNotifications={sync,disconnect,open};
const button=document.getElementById('notification-settings');if(button){const label=()=>button.textContent=T('알림','Notifications');label();button.onclick=open;window.addEventListener('skm-language',label);}
window.addEventListener('skm-push-ready',sync);window.addEventListener('skm-account-changed',()=>{registration='';sync();});
document.addEventListener('visibilitychange',()=>{if(!document.hidden)sync();});sync();
})();
