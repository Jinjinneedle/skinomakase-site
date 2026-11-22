(() => {
const ko=()=>String(window.SKMLanguage?.locale||navigator.language).startsWith('ko');
SKMBooking.finishSignIn().then(async next=>{
 if(await SKMBooking.verifiedAppUser()!==true)throw Error('Verified sign-in required');
 const notification=sessionStorage.getItem('skm-notification-booking-v1');
 location.replace(notification?'notification.html':next==='home'?'../world.html':next==='bodymap'?'../world.html#bodymap':next==='admin'?'admin.html':'account.html');
}).catch(()=>{document.getElementById('status').textContent=ko()?'로그인이 완료되지 않았어요. 다시 시도해 주세요.':'Sign-in did not complete. Please try again.';});
})();
