(() => {
 const api=window.SKMBooking;let pending=false,dot=null,owner=null;
 function badge(){const logo=document.querySelector('.earth-brand');if(!logo)return null;if(!dot){dot=document.createElement('span');dot.className='skm-unread-dot';dot.hidden=true;dot.setAttribute('aria-hidden','true');logo.append(dot);}return logo;}
 async function refresh(){const logo=badge(),uid=api.session()?.user?.id;if(owner!==uid){owner=uid;if(dot)dot.hidden=true;}if(!uid||!logo||pending||document.hidden)return;pending=true;
  try{const rows=await api.messageInbox();if(uid!==api.session()?.user?.id)return;const count=rows.reduce((sum,r)=>sum+Number(r.unread||0),0);dot.hidden=count===0;logo.setAttribute('aria-label',count?'Message · '+count+' unread':'Message');}catch{}finally{pending=false;}
 }
 document.addEventListener('visibilitychange',refresh);window.addEventListener('skm-account-changed',refresh);window.addEventListener('skm-messages-read',refresh);
 window.addEventListener('message',event=>{if(event.origin!==location.origin||event.data?.skm!=='messages-read')return;const frame=document.getElementById('appFrame');if(frame&&event.source===frame.contentWindow)refresh();});
 const timer=setInterval(refresh,10000);window.addEventListener('pagehide',()=>clearInterval(timer));refresh();
})();
