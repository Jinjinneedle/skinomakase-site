(() => {
function welcomeRoute(path){
 const uid=window.SKMBooking.session()?.user?.id;let seen=false;try{seen=localStorage.getItem('skm-guide-v2:'+uid)==='done';}catch{}
 if(uid&&!seen&&path!=='notification.html'){
  const to=new URL(path,location.href);if(['/app/account.html','/app/admin.html'].includes(to.pathname)||to.hash==='#bodymap')sessionStorage.setItem('skm-guide-return-v2',to.pathname+to.hash);
  location.replace('../world.html');
 }else location.replace(path);
}

const ko=()=>String(window.SKMLanguage?.locale||navigator.language).startsWith('ko');
SKMBooking.finishSignIn().then(async next=>{
 if(await SKMBooking.verifiedAppUser()!==true)throw Error('Verified sign-in required');
 const notification=sessionStorage.getItem('skm-notification-booking-v1');
 welcomeRoute(notification?'notification.html':next==='home'?'../world.html':next==='bodymap'?'../world.html#bodymap':next==='admin'?'admin.html':'account.html');
}).catch(()=>{document.getElementById('status').textContent=ko()?'로그인이 완료되지 않았어요. 다시 시도해 주세요.':'Sign-in did not complete. Please try again.';});
})();
