(() => {
 const api=window.SKMBooking,list=document.querySelector('#message-list'),status=document.querySelector('#message-status');let loading=false,owner=null;
 const ko=()=>window.SKMLanguage.code==='ko',make=(tag,text)=>{const n=document.createElement(tag);n.textContent=text;return n;};
 const refresh=async()=>{if(loading||document.hidden)return;loading=true;const uid=api.session()?.user?.id;owner=uid;
  try{const rows=await api.messageInbox();if(uid!==api.session()?.user?.id)return;list.replaceChildren();status.textContent=rows.length?'':ko()?'아직 메시지가 없어요.':'No messages yet.';
   for(const row of rows){const b=make('button','');b.type='button';b.className='message-row';b.append(make('strong',row.kind==='booking'?'#'+row.label:row.label==='SKINOMAKASE SESSION'?'SKINOMAKASE':row.label));b.append(make('small',new Date(row.updated_at).toLocaleDateString(window.SKMLanguage.locale)));if(row.unread){const badge=make('span',String(row.unread));badge.className='message-count';b.append(badge);}
    b.onclick=()=>row.kind==='booking'?window.SKMChat.open({bookingId:row.id,code:row.label,admin:row.admin,studio:row.studio,onClose:refresh}):location.assign('community.html?view=thread&id='+encodeURIComponent(row.id));list.append(b);}
  }catch(e){if(uid!==api.session()?.user?.id)return;status.textContent=e.status===401?(ko()?'다시 로그인해 주세요.':'Please sign in again.'):(ko()?'메시지를 불러오지 못했어요.':'Could not load messages.');}finally{loading=false;}
 };
 document.querySelector('#new-message').onclick=()=>location.assign('community.html?view=thread&kind=session');
 window.addEventListener('skm-account-changed',()=>{list.replaceChildren();refresh();});document.addEventListener('visibilitychange',refresh);window.addEventListener('skm-language',refresh);const timer=setInterval(refresh,12000);window.addEventListener('pagehide',()=>clearInterval(timer));refresh();
})();
