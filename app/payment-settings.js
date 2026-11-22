(() => {
'use strict';
window.SKMSetupPaymentSettings=async()=>{
 const root=document.getElementById('payment-settings');if(!root)return;
 const api=window.SKMBooking,url=document.getElementById('paypal-url'),auto=document.getElementById('paypal-auto'),save=document.getElementById('paypal-save'),status=document.getElementById('paypal-status');
 save.disabled=true;
 try{const value=await api.paymentSettings();url.value=value.paypal_url;auto.checked=value.auto_send;save.disabled=false;status.textContent=value.auto_send?'새 예약을 수락할 때 앱 대화로 링크를 한 번 전송합니다.':'자동 전송이 꺼져 있어요. PayPal에 표시되는 이름을 확인한 뒤 켜주세요.';}
 catch(_){status.textContent='결제 링크 설정을 불러오지 못했어요.';return false;}
 save.onclick=async()=>{
  save.disabled=true;
  try{
   const value=await api.savePaymentSettings(url.value.trim(),auto.checked);url.value=value.paypal_url;auto.checked=value.auto_send;
   status.textContent=value.auto_send?'저장했어요. 앞으로 새 예약을 수락하면 링크가 자동으로 전송돼요.':'저장했어요. 자동 전송이 꺼져 있어요.';
  }catch(_){status.textContent='저장하지 못했어요. https://paypal.me/로 시작하는 본인 결제 링크를 확인해 주세요.';}
  finally{save.disabled=false;}
 };
 return true;
};
})();
