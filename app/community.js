(()=>{
'use strict';
const api=window.SKMBooking, q=new URLSearchParams(location.search);
const codes=['ko','en','ja','zh','zh-Hant','ru','fr','es','de','pt','it'];
const copy={
 report:["메시지 신고", "Report message", "メッセージを通報", "举报消息", "檢舉訊息", "Пожаловаться на сообщение", "Signaler le message", "Denunciar mensaje", "Nachricht melden", "Denunciar mensagem", "Segnala messaggio"],
 reported:["신고를 접수했어요.", "Report received.", "通報を受け付けました。", "举报已收到。", "已收到檢舉。", "Жалоба получена.", "Signalement reçu.", "Denuncia recibida.", "Meldung erhalten.", "Denúncia recebida.", "Segnalazione ricevuta."],
 block:["상대방 차단", "Block user", "相手をブロック", "屏蔽用户", "封鎖使用者", "Заблокировать пользователя", "Bloquer la personne", "Bloquear usuario", "Person blockieren", "Bloquear usuário", "Blocca utente"],
 unblock:["차단 해제", "Unblock user", "ブロック解除", "解除屏蔽", "解除封鎖", "Разблокировать", "Débloquer la personne", "Desbloquear usuario", "Blockierung aufheben", "Desbloquear usuário", "Sblocca utente"],
 blocked:["이 대화에서 메시지를 주고받을 수 없어요.", "Messaging is unavailable in this conversation.", "この相手とはメッセージを送受信できません。", "此对话无法收发消息。", "此對話無法收發訊息。", "Обмен сообщениями в этом чате недоступен.", "Les échanges sont désactivés dans cette conversation.", "No se pueden enviar ni recibir mensajes aquí.", "In diesem Chat sind keine Nachrichten möglich.", "Não é possível trocar mensagens nesta conversa.", "Non è possibile scambiare messaggi in questa chat."],
 reportNotice:["이 메시지를 스튜디오에 보내 검토를 요청할까요?", "Send this message to the studio for review?", "このメッセージをスタジオに通報しますか？", "将这条消息提交给工作室审核？", "將這則訊息交給工作室審查？", "Отправить это сообщение в студию на проверку?", "Envoyer ce message au studio pour examen ?", "¿Enviar este mensaje al estudio para su revisión?", "Diese Nachricht zur Prüfung an das Studio senden?", "Enviar esta mensagem ao estúdio para análise?", "Inviare questo messaggio allo studio per la verifica?"],
 blockNotice:["서로 메시지를 보낼 수 없게 됩니다.", "You will no longer be able to message each other.", "お互いにメッセージを送れなくなります。", "双方将无法互发消息。", "雙方將無法互傳訊息。", "Вы больше не сможете писать друг другу.", "Vous ne pourrez plus vous envoyer de messages.", "Ya no podrán intercambiar mensajes.", "Ihr könnt einander keine Nachrichten mehr senden.", "Vocês não poderão mais trocar mensagens.", "Non potrete più scambiarvi messaggi."],

 inbox:['문의함','Inbox','受信箱','收件箱','收件匣','Входящие','Messagerie','Mensajes','Postfach','Mensagens','Messaggi'],
 profile:['연락 프로필','Contact profile','連絡プロフィール','联系资料','聯絡資料','Контактный профиль','Profil de contact','Perfil de contacto','Kontaktprofil','Perfil de contato','Profilo di contatto'],
 name:['공개 이름','Public name','公開名','公开名称','公開名稱','Публичное имя','Nom public','Nombre público','Öffentlicher Name','Nome público','Nome pubblico'],
 email:['내 이메일 공개','Show my email','メールを公開','公开我的邮箱','公開我的電子郵件','Показывать мой адрес','Afficher mon e-mail','Mostrar mi correo','E-Mail anzeigen','Mostrar meu e-mail','Mostra la mia email'],
 save:['저장','Save','保存','保存','儲存','Сохранить','Enregistrer','Guardar','Speichern','Salvar','Salva'],
 tattoo:["세션 예약", "Session booking", "セッション予約", "预约 SKINOMAKASE", "預約 SKINOMAKASE", "Запись на сеанс", "Réserver une séance", "Reservar sesión", "Session buchen", "Agendar sessão", "Prenota una sessione"],
 venues:['베뉴 일정','City events','会場の予定','城市活动','城市活動','События города','Événements','Eventos','Veranstaltungen','Eventos','Eventi'],
 empty:['등록된 일정이 없어요.','No events scheduled.','予定はまだありません。','暂无活动。','目前沒有活動。','Событий пока нет.','Aucun événement prévu.','No hay eventos.','Keine Termine.','Nenhum evento.','Nessun evento.'],
 noChats:['아직 문의가 없어요.','No inquiries yet.','問い合わせはまだありません。','暂无咨询。','尚無詢問。','Обращений пока нет.','Aucune demande.','Sin consultas.','Noch keine Anfragen.','Nenhuma consulta.','Nessuna richiesta.'],
 contact:['주최자에게 문의','Message host','主催者に連絡','联系主办方','聯絡主辦單位','Написать организатору','Contacter l’hôte','Contactar al anfitrión','Veranstalter kontaktieren','Falar com anfitrião','Contatta chi organizza'],
 send:['보내기','Send','送信','发送','傳送','Отправить','Envoyer','Enviar','Senden','Enviar','Invia'],
 message:['메시지','Message','メッセージ','消息','訊息','Сообщение','Message','Mensaje','Nachricht','Mensagem','Messaggio'],
 pending:['서비스 연결 준비 중','Service coming soon','サービス準備中','服务筹备中','服務籌備中','Сервис готовится','Service en préparation','Servicio en preparación','Dienst in Vorbereitung','Serviço em preparação','Servizio in preparazione']
};
const t=k=>copy[k]?.[codes.indexOf(window.SKMLanguage?.code)]||copy[k]?.[1]||k;
const G=k=>window.SKMGloveText(k),el=(tag,value,cls)=>{const e=document.createElement(tag);if(value!=null)e.textContent=value;if(cls)e.className=cls;return e;};
const city=q.get('city'),zones={'1835848':'Asia/Seoul','1850147':'Asia/Tokyo','1853909':'Asia/Tokyo','2643743':'Europe/London','2988507':'Europe/Paris','6167865':'America/Toronto','6173331':'America/Vancouver','6077243':'America/Toronto','5368361':'America/Los_Angeles','5128581':'America/New_York','1819729':'Asia/Hong_Kong','1880252':'Asia/Singapore'};
const names={'1835848':'Seoul','1850147':'Tokyo','1853909':'Osaka','2643743':'London','2988507':'Paris','6167865':'Toronto','6173331':'Vancouver','6077243':'Montréal','5368361':'Los Angeles','5128581':'New York','1819729':'Hong Kong','1880252':'Singapore'};
const root=document.querySelector('#content'),status=document.querySelector('#status'),head=document.querySelector('#heading');
let translation=null,version=0,timer=null,uid=()=>api.session()?.user?.id||null;
function button(label,fn,cls='row'){const b=el('button',label,cls);b.type='button';b.onclick=async()=>{b.disabled=true;try{await fn();}catch(e){error(e);}finally{b.disabled=false;}};return b;}
const call=(action,p={})=>api.community(action,p);
function error(e){status.textContent=e.message==='contact blocked'?t('blocked'):e.status===404?t('pending'):G('error');}
function confirmAction(label,description){
 const dialog=el('dialog',null,'safety-dialog'),prompt=el('p',description);
 dialog.setAttribute('aria-label',label);
 return new Promise(resolve=>{
  function finish(accepted){
   dialog.close();dialog.remove();resolve(accepted);
  }
  const back=button(window.SKMLanguage.t('close'),()=>finish(false));
  const accept=button(label,()=>finish(true),'primary');
  dialog.addEventListener('cancel',event=>{event.preventDefault();finish(false);},{once:true});
  dialog.append(prompt,back,accept);root.append(dialog);
  dialog.showModal();back.focus();
 });
}
function field(f,label,type='text'){const l=el('label',label),input=el('input');input.type=type;input.required=true;l.append(input);f.append(l);return input;}
function visit(view,extra={}){const params=new URLSearchParams({view,...extra});location.href='community.html?'+params;}
async function show(){
 translation?.stop();translation=null;clearInterval(timer);const run=++version,user=uid(),ok=()=>version===run&&uid()===user;
 const view=q.get('view')||'inbox';
 root.replaceChildren();document.body.classList.remove('studio-thread');document.querySelector('.studio-head')?.remove();status.textContent='';
 document.querySelector('#inbox').textContent=t('inbox');document.querySelector('#profile').textContent=t('profile');
 head.textContent=view==='venues'?(names[city]||'')+' · '+t('venues'):t(view==='thread'?'message':view==='profile'?'profile':'inbox');
 if(view==='inbox')root.append(button('SKINOMAKASE SESSION',()=>{location.href='account.html';}));
 if(!user&&view!=='venues'){root.append(button(G('login'),async()=>{if(await api.signInGoogle())await show();},'primary'));return;}
 try{
  if(view==='profile'){
   const v=await call('profile');if(!ok())return;
   const f=el('form');const name=field(f,t('name'));name.maxLength=60;name.value=v.name||'';
   const l=el('label',null,'check'),check=el('input');check.type='checkbox';check.checked=v.share;
   l.append(check,document.createTextNode(t('email')+' · '+v.email));f.append(l,el('button',t('save'),'primary'));
   f.onsubmit=async e=>{e.preventDefault();try{await call('save_profile',{name:name.value.trim(),share:check.checked});if(ok())status.textContent=G('saved');}catch(e){if(ok())error(e);}};root.append(f);
  }else if(view==='venues'){
   const select=el('select');select.setAttribute('aria-label',t('venues'));
   for(const [id,name] of Object.entries(names)){const o=el('option',name);o.value=id;select.append(o);}
   select.value=city;select.onchange=()=>visit('venues',{city:select.value});root.append(select);
   const events=await api.communityVenues(city);if(!ok())return;
   const fmt=new Intl.DateTimeFormat(window.SKMLanguage?.locale,{timeZone:zones[city],month:'short',day:'numeric',hour:'2-digit',minute:'2-digit',timeZoneName:'short'});
   if(!events.length)root.append(el('p',t('empty'),'quiet'));
   for(const v of events){const card=el('article');card.append(el('h2',v.title),el('p',v.place),el('time',fmt.format(new Date(v.starts_at))+' – '+fmt.format(new Date(v.ends_at))));if(v.host_name)card.append(el('p',v.host_name));card.append(button(t('contact'),()=>visit('thread',{kind:'venue',subject:v.id})));root.append(card);}
   if(user&&await api.isAdmin()&&ok())eventForm();
  }else if(view==='thread'){
   let id=q.get('id');if(!id)id=q.get('kind')==='session'?await api.desk('session'):await call('start',{kind:q.get('kind'),id:q.get('subject')});if(!ok())return;
   const log=el('div',null,'messages');log.setAttribute('role','log');
   const f=el('form'),input=el('textarea'),send=el('button',t('send'),'primary');
   input.placeholder=t('message');input.setAttribute('aria-label',t('message'));input.required=true;input.maxLength=2000;
   const controls=el('div',null,'safety-controls');
   let last=null,cid=null,draft='',revision=0,paused=true,currentMessages=[];const toolbar=el('div',null,'skm-chat-toolbar');root.append(toolbar);translation=window.SKMTranslation?.mount({container:toolbar,kind:'thread',id,changed:()=>{last=null;read().catch(error);}});
   f.hidden=true;
   function messageBubble(m,peer){
    const bubble=el('div',null,'bubble'+(m.mine?' mine':''));
    const text=el('span',m.body);bubble.append(text);translation?.render(text,m);
    if(peer&&!m.mine)bubble.append(button(t('report'),async()=>{
     if(!await confirmAction(t('report'),t('reportNotice'))||!ok())return;
     await call('report',{id,message:m.id});
     if(ok()){await read();status.textContent=t('reported');}
    },'safety-action'));
    return bubble;
   }
   async function read(){const n=++revision,data=await call('read',{id});if(!ok()||n!==revision)return;
    const studio=data.kind?data.kind==='session':q.get('kind')==='session'||data.label==='SKINOMAKASE SESSION';
    const peer=data.kind==='glove'||data.kind==='venue';
    if(!studio&&!peer){f.hidden=true;status.textContent=t('pending');return;}
    paused=data.paused===true;f.hidden=paused;
    if(studio&&!document.querySelector('.studio-head')){
      document.body.classList.add('studio-thread');
      const banner=el('div',null,'studio-head'),logo=el('span',null,'studio-mark'),img=el('img');
      img.src='logo-transparent.png';img.alt='SKINOMAKASE';logo.append(img);
      banner.append(logo,button(window.SKMLanguage.t('close'),()=>{location.href='messages.html';},'desk-close'));
      head.before(banner);
    }
    head.textContent=studio?'#'+String(id).slice(0,8).toUpperCase():data.label;const state=JSON.stringify([data.messages.map(m=>m.id),paused,!!data.blocked_by_me]);
    if(last===state)return;
    const atBottom=last===null||log.scrollHeight-log.clientHeight-log.scrollTop<35;
    last=state;controls.replaceChildren();
    if(peer){
     if(paused)controls.append(el('p',t('blocked'),'quiet'));
     if(data.blocked_by_me||!paused){
      const action=data.blocked_by_me?'unblock':'block';
      controls.append(button(t(action),async()=>{
       if(action==='block'&&!await confirmAction(t('block'),t('blockNotice')))return;
       if(!ok())return;
       await call(action,{id});
       if(ok()){status.textContent='';await read();}
      },'safety-action'));
     }
    }
    currentMessages=data.messages;log.replaceChildren(...data.messages.map(m=>messageBubble(m,peer)));translation?.update(currentMessages);
    if(studio&&!data.messages.length)log.append(el('p',window.SKMLanguage.t('chatEmpty'),'desk-empty'));
    if(atBottom){log.scrollTop=log.scrollHeight;if(!document.hidden&&data.messages.length)api.markContactRead?.(id,data.messages.at(-1).id).then(()=>{if(parent!==window)parent.postMessage({skm:'messages-read'},location.origin==='null'?'*':location.origin);window.dispatchEvent(new Event('skm-messages-read'));}).catch(()=>{});}
   }
   f.append(input,send);root.append(controls,log,f);await read();if(!ok())return;
   f.onsubmit=async e=>{e.preventDefault();const value=input.value.trim();if(!value||paused||send.disabled||!ok())return;
    if(!cid||value!==draft){cid=crypto.randomUUID();draft=value;}send.disabled=true;
    try{await call('send',{id,text:value,client_id:cid});if(ok()){if(input.value.trim()===value)input.value='';cid=null;await read();}}
    catch(e){if(ok()){error(e);if(e.message==='contact blocked')await read();}}finally{send.disabled=false;}};
   timer=setInterval(()=>{if(!document.hidden&&ok())read().catch(e=>{if(ok())error(e);});},10000);
  }else{
   const rows=await call('inbox');if(!ok())return;if(!rows.length)root.append(el('p',t('noChats'),'quiet'));
   for(const row of rows)root.append(button([row.label,row.peer].filter(Boolean).join(' · '),()=>visit('thread',{id:row.id})));
  }
 }catch(e){if(ok())error(e);}
}
function eventForm(){
 const details=el('details');details.append(el('summary','관리자 · 일정 등록'));const f=el('form');
 const title=field(f,'행사 이름'),place=field(f,'공개 장소'),host=field(f,'세션 고객 주최자의 가입 이메일','email');
 const tz=Intl.DateTimeFormat().resolvedOptions().timeZone;
 const start=field(f,'시작 · '+tz,'datetime-local'),end=field(f,'종료 · '+tz,'datetime-local');
 const submit=el('button','일정 공개','primary');f.append(submit);details.append(f);root.append(details);
 const eventID=crypto.randomUUID();
 f.onsubmit=async e=>{e.preventDefault();submit.disabled=true;try{await call('publish',{id:eventID,city,title:title.value,place:place.value,host:host.value,starts:new Date(start.value).toISOString(),ends:new Date(end.value).toISOString()});await show();}catch(e){error(e);}finally{submit.disabled=false;}};
}
document.querySelector('#inbox').onclick=()=>visit('inbox');document.querySelector('#profile').onclick=()=>visit('profile');
window.addEventListener('skm-language',show);window.addEventListener('storage',e=>{if(!e.key||e.key==='skm-customer-session-v1')show();});
let shownUser=uid();
function checkUser(){const next=uid();if(next!==shownUser){shownUser=next;show();}}
window.addEventListener('skm-account-changed',checkUser);
try{if(parent!==window)parent.addEventListener('skm-account-changed',checkUser);}catch{}
window.addEventListener('pagehide',()=>{try{if(parent!==window)parent.removeEventListener('skm-account-changed',checkUser);}catch{}});
window.addEventListener('pagehide',()=>{version++;clearInterval(timer);root.replaceChildren();});
window.addEventListener('pageshow',e=>{if(e.persisted)show();});show();
})();
