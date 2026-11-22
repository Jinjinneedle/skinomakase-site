(() => {
 'use strict';
 const arrow='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5m7-7-7 7 7 7"/></svg>';
 function paint(){
  document.querySelectorAll('.bm-close,.video-close,.earth-world,.desk-close,.back,.manager-home,.manager-back,#studio-home,[data-skm-back]').forEach(b=>{
   if(b.dataset.skmAligned)return;
   b.dataset.skmAligned='true';b.classList.add('skm-back-control');
   if(!b.getAttribute('aria-label'))b.setAttribute('aria-label',b.textContent.trim()||window.SKMLanguage?.t('back')||'Back');
   b.innerHTML=arrow;
  });
 }
 window.SKMStudioLink=(name)=>{
  const raw=String(name||'').trim();let handle=raw.replace(/^@/,'');if(/^crevice$/i.test(handle))handle='__cr3vic3__';
  if(/^https?:\/\//i.test(raw)){try{const u=new URL(raw);handle=/^(www\.)?instagram\.com$/.test(u.hostname)?u.pathname.split('/').filter(Boolean)[0]||'':'';}catch{handle='';}}
  if(!/^[A-Za-z0-9._]{1,30}$/.test(handle)){const span=document.createElement('span');span.textContent=raw;return span;}
  const a=document.createElement('a');a.className='skm-studio-link';a.textContent='@'+handle;a.href='https://www.instagram.com/'+encodeURIComponent(handle)+'/';a.target='_blank';a.rel='noopener noreferrer';return a;
 };
 let studioCache=null,studioOwner=null,studioAt=0;
 window.SKMStudioInfo=async id=>{const owner=window.SKMBooking?.session()?.user?.id;if(!owner)return '';if(studioOwner!==owner||Date.now()-studioAt>60000||!studioCache){studioOwner=owner;studioAt=Date.now();studioCache=window.SKMBooking.messageInbox().catch(()=>[]);}const rows=await studioCache;return owner===window.SKMBooking.session()?.user?.id?rows.find(r=>r.kind==='booking'&&r.id===id)?.studio||'':'';};
 const observer=new MutationObserver(paint);observer.observe(document.documentElement,{subtree:true,childList:true});paint();
})();
