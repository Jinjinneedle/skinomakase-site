(async()=>{
 document.documentElement.style.visibility='hidden';
 try{await SKMBooking.currentUser();document.documentElement.style.visibility='';}
 catch(e){
  if(e.status===401){window.top.location.replace('../app/login.html?next=bodymap');return;}
  document.body.replaceChildren();const p=document.createElement('p');p.textContent='로그인 상태를 확인하지 못했어요. 인터넷 연결을 확인하고 다시 열어주세요.';document.body.append(p);document.documentElement.style.visibility='';
 }
})();
