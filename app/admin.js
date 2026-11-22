(() => {
'use strict';
const $=id=>document.getElementById(id),api=SKMBooking,demo=!api.ready,I=SKM_BOOKING_I18N,states=I.admin_ko.status;
let rows=[],tab='all',month=new Date(),day=null,selected=null,refreshing=false,paymentSettingsLoaded=false,accessVersion=0;
function clearWorkspace(){
 ++accessVersion;window.SKMStudioAdmin?.reset();rows=[];selected=null;paymentSettingsLoaded=false;
 $('workspace').hidden=true;$('detail').close();$('detail').replaceChildren();$('list').replaceChildren();
 $('contact-report-list').replaceChildren();$('deletion-list').replaceChildren();
 $('paypal-url').value='';$('paypal-auto').checked=false;$('paypal-status').textContent='';
 window.SKMChat?.close();
}
const reportPanel=$('contact-reports'),reportList=$('contact-report-list');
async function loadReports(){
 if(!reportPanel.open)return;
 reportList.textContent='불러오는 중…';
 try{
  const reports=await api.community('open_reports');
  reportList.replaceChildren();
  for(const report of reports){
   const item=el('article');
   item.append(el('strong',report.label),el('p',report.body));
   for(const [decision,label] of [['remove','메시지 숨기기'],['dismiss','신고 종결']]){
    item.append(button(label,async()=>{
     await api.community('review_report',{id:report.id,decision});
     await loadReports();
    }));
   }
   reportList.append(item);
  }
  if(!reports.length)reportList.textContent='대기 중인 신고가 없습니다.';
 }catch{reportList.textContent='신고 목록을 불러오지 못했습니다.';}
}
reportPanel.ontoggle=loadReports;
const deletionPanel=$('account-deletions');
deletionPanel.ontoggle=async()=>{
  if(!deletionPanel.open)return;
  const list=$('deletion-list'); list.textContent='불러오는 중…';
  try {
    const requests=await api.outstandingDeletions();
    list.replaceChildren();
    for(const request of requests){
      const line=document.createElement('p');
      line.textContent=[new Date(request.requested_at).toLocaleDateString('ko'),request.user_id,request.review_required?'스튜디오 확인 필요':'파일 정리 대기'].join(' · ');
      list.append(line);
    }
    if(!requests.length)list.textContent='대기 중인 요청이 없습니다.';
  } catch { list.textContent='삭제 요청을 불러오지 못했습니다.'; }
};
const error=e=>{const messages={'studio location required':'승인 전에 해당 도시의 스튜디오 주소를 저장해 주세요.','currency required':'금액의 통화를 선택하고 저장해 주세요.','studio qr required':'관리 설정 → 싱가포르에서 실제 스튜디오 PayNow QR을 먼저 저장해 주세요.','singapore currency required':'싱가포르 견적 통화를 SGD로 선택해 주세요.','singapore quote required':'싱가포르 총액과 예약금 SGD 100을 먼저 저장해 주세요.','deposit confirmation required':'스튜디오의 예약금 입금을 먼저 확인해 주세요.','approval required':'예약금 안내를 보낸 뒤 입금을 확인해 주세요.','approved city cannot change':'안내가 전송된 요청의 도시는 바꿀 수 없어요.'};$('error').textContent=messages[e?.message]||e?.message||String(e||'');if($('detail-error'))$('detail-error').textContent=$('error').textContent;};
function el(tag,text,cls){const e=document.createElement(tag);if(text!=null)e.textContent=text;if(cls)e.className=cls;return e;}
function button(text,action){const b=el('button',text);b.type='button';b.onclick=async()=>{b.disabled=true;try{await action();}catch(e){error(e);}finally{b.disabled=false;}};return b;}
function dateKey(date){return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;}
const when=v=>v?new Date(v).toLocaleString('ko-KR'):'미정';
const enumKo=(k,v)=>I.enums[k]?.[v]?.ko||I.enums[k]?.[v]?.all||v||'—';
function image(url){if(!url)return null;try{const u=new URL(url,location.href);if(u.protocol!=='https:'||(u.hostname!=='res.cloudinary.com'&&!(u.origin===window.SKM_BOOKING.url&&u.pathname.startsWith('/storage/v1/object/sign/'))))return null;const im=el('img');im.src=u.href;im.alt='예약 디자인';return im;}catch(_){return null;}}
function persist(){if(demo)localStorage.setItem('skm-admin-demo',JSON.stringify(rows));}
async function update(id,p){const row=demo?Object.assign(rows.find(r=>r.id===id),p,{updated_at:new Date().toISOString()}):await api.update(id,p);if(!row)throw Error('변경된 예약을 찾지 못했어요. 새로고침해 주세요.');const previous=rows.find(r=>r.id===id);if(row.design_path)row.design_url=previous?.design_url;if(row.ref_paths?.length)row.ref_urls=previous?.ref_urls;rows=rows.map(r=>r.id===id?row:r);persist();render();return row;}
async function load(){if(refreshing)return;refreshing=true;const viewer=api.session()?.user?.id,run=accessVersion,active=()=>run===accessVersion&&viewer===api.session()?.user?.id;try{if(!demo){if(!viewer||await api.isAdmin()!==true){clearWorkspace();$('login').hidden=false;error('관리자 계정으로 로그인해 주세요.');return;}if(!active())return;}if(demo){try{rows=JSON.parse(localStorage.getItem('skm-admin-demo')||'null');}catch(_){rows=null;}if(!Array.isArray(rows)){rows=['new','accepted','scheduled','done'].map((status,i)=>({id:'demo-'+i,code:'DEMO0'+i,name:['샘플 고객 1','샘플 고객 2','샘플 고객 3','샘플 고객 4'][i],status,created_at:new Date(Date.now()-i*3600000).toISOString(),dates:[dateKey(new Date())],times:['afternoon'],placement:'arm',size:'s',lang:'ko',note:'데모 예약입니다.',ref_urls:[],appt_at:status==='scheduled'?new Date().toISOString():null}));persist();}}else{const result=await api.list();if(!active())return;rows=result;await window.SKMStudioAdmin?.loadSettings();if(!active())return;}$('login').hidden=true;$('workspace').hidden=false;render();error('');}catch(e){error(e);if(e.status===401||e.status===403){clearWorkspace();$('login').hidden=false;}}finally{refreshing=false;}}
function matches(r){
 if(!window.SKMStudioAdmin.matches(r))return false;
 if(tab==='all')return !window.SKMSessionJourney.closed(r);
 if(tab==='archive')return window.SKMSessionJourney.closed(r);
 if(tab==='deposit')return window.SKMSessionJourney.phase(r)==='deposit';
 if(tab==='calendar')return day&&(r.status==='scheduled'?dateKey(new Date(r.appt_at))===day:['new','accepted'].includes(r.status)&&r.dates?.includes(day));
 return r.status===tab;
}
function render(){
 const tabs=$('tabs'),J=window.SKMSessionJourney,inCity=rows.filter(window.SKMStudioAdmin.matches);tabs.replaceChildren();
 const counts={all:inCity.filter(r=>!J.closed(r)).length,new:inCity.filter(r=>r.status==='new').length,deposit:inCity.filter(r=>J.phase(r)==='deposit').length,scheduled:inCity.filter(r=>r.status==='scheduled').length};
 for(const [k,label] of [['all','진행 중'],['new','새 문의'],['deposit','입금 대기'],['scheduled','확정'],['calendar','달력'],['archive','보관']]){
  const b=button(label+(counts[k]?' '+counts[k]:''),()=>{tab=k;render();});b.setAttribute('aria-pressed',k===tab);tabs.append(b);
 }
 $('calendar-wrap').hidden=tab!=='calendar';if(tab==='calendar')renderCalendar();
 const list=$('list');list.replaceChildren();
 const result=rows.filter(matches).sort((a,b)=>tab==='scheduled'?new Date(a.appt_at)-new Date(b.appt_at):new Date(b.created_at)-new Date(a.created_at));
 $('list-summary').textContent=result.length?result.length+'건 · 선택해서 대화와 다음 단계 확인':'';
 if(!result.length)list.append(el('p',tab==='calendar'&&!day?'날짜를 선택하세요.':'이 목록은 비어 있어요.','inbox-empty'));
 for(const r of result){
  const b=button('',()=>show(r.id));b.className='card';const im=image(r.design_url);if(im)b.append(im);
  b.append(el('small',window.SKMStudioAdmin.label(J.city(r))+' · #'+r.code),el('strong',r.name),el('p',r.status==='scheduled'?J.appointment(r,'ko'):(r.dates||[]).join(', ')||'일정 조율 전'));
  b.append(el('span',({new:'요청 확인',deposit:'입금 확인 대기',date:'일정 정하기',scheduled:'예약 · 대화 보기',done:'완료',declined:'종료',cancelled:'취소'})[J.phase(r)],'card-next'));list.append(b);
 }
}
function renderCalendar(){$('month').textContent=`${month.getFullYear()}년 ${month.getMonth()+1}월`;const grid=$('calendar');grid.replaceChildren();for(const d of ['일','월','화','수','목','금','토'])grid.append(el('small',d));const first=new Date(month.getFullYear(),month.getMonth(),1),last=new Date(month.getFullYear(),month.getMonth()+1,0).getDate();for(let i=0;i<first.getDay();i++)grid.append(el('span'));for(let n=1;n<=last;n++){const key=dateKey(new Date(month.getFullYear(),month.getMonth(),n));const scheduled=rows.some(r=>window.SKMStudioAdmin.matches(r)&&r.status==='scheduled'&&dateKey(new Date(r.appt_at))===key),wanted=rows.some(r=>window.SKMStudioAdmin.matches(r)&&['new','accepted'].includes(r.status)&&r.dates?.includes(key));const b=button(n+(scheduled?' ●':wanted?' ○':''),()=>{day=key;render();});b.setAttribute('aria-label',key);if(day===key)b.style.background='#ddd';grid.append(b);}}
function field(root,label,value,type='text'){const l=el('label'),s=el('span',label),e=el(type==='textarea'?'textarea':'input');if(type!=='textarea')e.type=type;e.value=value??'';l.append(s,e);root.append(l);return e;}
function link(root,label,url){const a=el('a',label);a.href=url;root.append(a);}
function confirmStep(title,message){
 const d=el('dialog',null,'manager-confirm'),cancel=button('아직 아니에요',()=>d.close()),yes=button('입금 확인 완료',()=>d.close('confirm'));
 yes.className='primary';d.setAttribute('aria-label',title);d.append(el('h2',title),el('p',message),cancel,yes);document.body.append(d);
 return new Promise(resolve=>{const changed=()=>d.close();window.addEventListener('skm-account-changed',changed);window.addEventListener('pagehide',changed);d.addEventListener('close',()=>{window.removeEventListener('skm-account-changed',changed);window.removeEventListener('pagehide',changed);const confirmed=d.returnValue==='confirm';d.remove();resolve(confirmed);},{once:true});d.showModal();cancel.focus();});
}
function detailSection(root,title,open=false){
 const details=el('details',null,'detail-section'),body=el('div');details.open=open;
 details.append(el('summary',title),body);root.append(details);return body;
}
function show(id){
 selected=id;const r=rows.find(r=>r.id===id);if(!r)return;
 const J=window.SKMSessionJourney,phase=J.phase(r),sg=J.city(r)==='SINGAPORE',ended=J.closed(r),root=$('detail');
 const heading=el('header',null,'detail-head'),name=el('div');
 name.append(el('small',window.SKMStudioAdmin.label(J.city(r))+' · #'+r.code),el('h2',r.name));
 heading.append(name,button('닫기',()=>root.close()));root.replaceChildren(heading,el('p',J.describe(r,'ko').title,'booking-state'));error('');
 const next=el('section',null,'detail-next');
 const titles={new:'요청 확인 후 승인',deposit:'입금 확인',date:'방문 일정 확정',scheduled:'방문 준비',done:'완료된 세션',declined:'종료된 요청',cancelled:'취소된 요청'};
 const hints={new:sg?'총액을 정하면 스튜디오 PayNow 예약금 안내가 전송돼요.':'도안과 가격을 조율한 뒤 승인하세요.',deposit:sg?'Crevice가 SGD 100을 받은 뒤 확인하세요. 확인하면 고객에게 주소와 잔금이 전달돼요.':'실제 예약금 수령을 확인한 뒤 표시하세요.',date:'고객과 정한 날짜와 시간을 아래에 입력하세요.',scheduled:J.appointment(r,'ko'),done:'대화와 요청 내용은 계속 확인할 수 있어요.',declined:'',cancelled:''};
 next.append(el('h3',titles[phase]),el('p',hints[phase]));root.append(next);
 let approvalData=()=>({}),scheduleAction=()=>{};
 const change=status=>async()=>{await update(id,{status});show(id);};
 const confirmReceipt=async()=>{
  if(!await confirmStep('예약금이 들어왔나요?',sg?'Crevice에서 SGD 100을 받은 것을 확인하세요. 고객에게 상세 주소와 잔금이 전송됩니다.':'실제 입금을 확인한 경우에만 완료해 주세요.'))return;
  await update(id,{deposit_paid:true});show(id);
 };
 let mainAction;
 if(phase==='new')mainAction=button(sg?'승인하고 예약금 안내 보내기':'요청 승인',async()=>{await update(id,{...approvalData(),status:'accepted'});show(id);});
 if(phase==='deposit')mainAction=button('입금 확인 완료',confirmReceipt);
 if(phase==='date')mainAction=button('일정 확정',()=>scheduleAction());
 if(phase==='scheduled')mainAction=button('세션 완료',async()=>{if(confirm('이 세션을 완료로 표시할까요?'))await change('done')();});
 if(mainAction){mainAction.className='primary';next.append(mainAction);}
 const chat=button('고객과 대화',()=>SKMChat.open({bookingId:r.id,code:r.code,admin:true}));chat.className=ended?'primary':'secondary';next.append(chat);
 if(phase==='new'&&sg&&!window.SKMStudioAdmin.record('SINGAPORE')?.qr_path){
  mainAction.disabled=true;next.append(el('p','먼저 Crevice의 PayNow QR을 등록해 주세요.'));
  next.append(button('스튜디오 설정 열기',()=>{root.close();window.SKMStudioAdmin.openSettings('SINGAPORE');}));
 }
 // Keep quote controls next to approval. Other information is progressively disclosed.
 const quote=detailSection(root,'도시 · 금액',phase==='new');
 const controls=window.SKMStudioAdmin.bookingControls(quote,r,async p=>{await update(id,p);show(id);});
 const fields=el('div',null,'money-fields');quote.append(fields);
 const price=field(fields,sg?'총액 · SGD':'총액',r.price,'number'),deposit=field(fields,sg?'예약금 · SGD':'예약금',sg?100:r.deposit,'number');
 price.min=sg?100:0;deposit.min=0;price.step=deposit.step='0.01';price.inputMode=deposit.inputMode='decimal';
 if(sg){price.required=true;deposit.readOnly=true;}
 const balance=el('p',null,'session-balance');quote.append(balance);
 const updateBalance=()=>{const total=Number(price.value),down=Number(deposit.value);balance.textContent=price.value&&Number.isFinite(total)&&Number.isFinite(down)?'예약금 차감 후 잔금 · '+controls.currency.value+' '+new Intl.NumberFormat('ko').format(Math.max(0,total-down)):'총액을 입력해 주세요.';};
 price.oninput=deposit.oninput=controls.currency.onchange=updateBalance;updateBalance();
 approvalData=()=>{if(!price.checkValidity()||!deposit.checkValidity()){quote.parentElement.open=true;price.reportValidity();deposit.reportValidity();throw Error('금액을 확인해 주세요.');}const total=price.value===''?null:Number(price.value),down=deposit.value===''?null:Number(deposit.value);if(total!=null&&down!=null&&down>total)throw Error('예약금이 총액보다 클 수 없어요.');return controls.amountPatch(total,down);};
 quote.append(button('금액 저장',async()=>{await update(id,approvalData());show(id);error('금액을 저장했어요.');}));
 if(sg&&!ended&&r.status!=='new')quote.append(button('고객 결제 안내 보기',()=>SKMSessionPayment.open(id)));
 if(r.deposit_paid){quote.append(el('p','예약금 확인됨 ✓'));quote.append(button('입금 확인 수정',async()=>{if(!confirm('입금 확인을 취소할까요? 이미 안내된 주소와 메시지는 남습니다.'))return;await update(id,{deposit_paid:false});show(id);}));}
 if(['accepted','scheduled'].includes(r.status)){
  const schedule=detailSection(root,'일정',phase==='date');
  if(sg&&!r.deposit_paid){schedule.append(el('p','예약금 입금 확인 후 일정을 확정할 수 있어요.'));}
  else{
   const appt=r.appt_at?new Date(r.appt_at):null,parts=appt&&sg?Object.fromEntries(new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Singapore',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(appt).map(x=>[x.type,x.value])):null;
   const dt=field(schedule,sg?'싱가포르 현지 날짜 · 시간':'날짜 · 시간 (이 기기 시간대)',parts?`${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`:appt?dateKey(appt)+'T'+String(appt.getHours()).padStart(2,'0')+':'+String(appt.getMinutes()).padStart(2,'0'):'','datetime-local');
   dt.required=true;const minutes=field(schedule,'소요 시간 · 분',r.appt_minutes||120,'number');minutes.min=15;minutes.max=1440;minutes.required=true;
   scheduleAction=async()=>{schedule.parentElement.open=true;if(!dt.checkValidity()||!minutes.checkValidity()){dt.reportValidity();minutes.reportValidity();throw Error('날짜와 소요 시간을 입력해 주세요.');}const date=new Date(dt.value+(sg?'+08:00':''));if(!Number.isFinite(date.getTime()))throw Error('날짜와 시간을 확인해 주세요.');await update(id,{status:'scheduled',appt_at:date.toISOString(),appt_minutes:Number(minutes.value)});show(id);};
   if(phase!=='date')schedule.append(button('일정 변경 저장',scheduleAction));
  }
 }
 const request=detailSection(root,'도안 · 요청 내용',phase==='new');
 request.append(el('p',[enumKo('placement',r.placement),r.placement_detail,enumKo('size',r.size)].filter(Boolean).join(' · ')),el('p','희망 날짜 · '+((r.dates||[]).join(', ')||'미정')),el('p','희망 시간 · '+((r.times||[]).map(v=>enumKo('times',v)).join(', ')||'미정')));
 if(r.note)request.append(el('p',r.note.replace(/^\[City: [A-Z ]+\]\s*/,'')));
 request.append(el('p','첫 세션 · '+(r.first_tattoo==null?'미정':r.first_tattoo?'네':'아니요')));
 const im=image(r.design_url);if(im){request.append(im,button('디자인 사진 저장',async()=>{if(!window.SKMApp?.savePhoto)throw Error('앱에서 사진첩에 저장할 수 있어요.');const response=await fetch(im.src);if(!response.ok)throw Error('이미지를 불러오지 못했어요.');const blob=await response.blob(),reader=new FileReader();reader.onload=()=>SKMApp.savePhoto(reader.result);reader.readAsDataURL(blob);}));}
 for(const url of r.ref_urls||[]){const ref=image(url);if(ref)request.append(ref);}
 request.append(el('small','접수 · '+when(r.created_at)+' · '+(r.lang||'en')));
 const privateNotes=detailSection(root,'내 메모'),memo=field(privateNotes,'고객에게 보이지 않아요',r.memo,'textarea');privateNotes.append(button('메모 저장',async()=>{await update(id,{memo:memo.value});error('메모를 저장했어요.');}));
 const other=detailSection(root,'연락처 · 추가 관리'),contact=el('div',null,'actions'),phone=/^[+\d\s().-]+$/.test(r.contact||'')?(r.contact||'').replace(/[^+\d]/g,''):'';
 if(phone){link(contact,'전화','tel:'+phone);link(contact,'문자','sms:'+phone);}
 if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r.contact||''))link(contact,'메일','mailto:'+r.contact);
 if(/^[A-Za-z0-9._]+$/.test(r.instagram||''))link(contact,'인스타그램','https://instagram.com/'+r.instagram);
 other.append(el('p',r.contact||r.instagram||''),contact);
 const message=field(other,'메일·문자 안내문','','textarea');
 for(const [key,label] of [['accept','수락 안내'],['schedule','일정 안내'],['decline','거절 안내']])other.append(button(label,()=>{message.value=I.admin_ko.templates[key+'_'+(r.lang==='ko'?'ko':'en')].replaceAll('{name}',r.name).replaceAll('{code}',r.code).replaceAll('{when}',when(r.appt_at));}));
 other.append(button('복사',async()=>{await navigator.clipboard.writeText(message.value);}));
 if(phone)other.append(button('문자 작성',()=>{location.href='sms:'+phone+'&body='+encodeURIComponent(message.value);}));
 if((r.contact||'').includes('@'))other.append(button('메일 작성',()=>{location.href='mailto:'+encodeURIComponent(r.contact)+'?subject=SKINOMAKASE&body='+encodeURIComponent(message.value);}));
 if(ended)other.append(button('다시 열기',change('new')));
 else other.append(button(r.status==='new'?'요청 거절':'예약 취소',async()=>{if(confirm(r.status==='new'?'이 요청을 거절할까요?':'이 예약을 취소할까요?'))await change(r.status==='new'?'declined':'cancelled')();}));
 const remove=button('예약 삭제',async()=>{if(!confirm('이 예약을 삭제할까요?'))return;if(!demo)await api.remove(id);rows=rows.filter(r=>r.id!==id);persist();root.close();render();});remove.className='danger';other.append(remove);
 const detailError=el('p');detailError.id='detail-error';detailError.setAttribute('role','alert');root.append(detailError);if(!root.open)root.showModal();
}
window.SKMStudioAdmin.mountFilter(render);
$('prev').onclick=()=>{month=new Date(month.getFullYear(),month.getMonth()-1,1);render();};$('next').onclick=()=>{month=new Date(month.getFullYear(),month.getMonth()+1,1);render();};$('refresh').onclick=load;$('logout').onclick=async()=>{clearWorkspace();await api.signOut();$('login').hidden=false;};$('login').onsubmit=e=>{e.preventDefault();window.top.location.href='login.html?next=admin';};
(async()=>{if(demo){$('notice').textContent='데모 모드 · Supabase 연결 전이라 이 기기에만 저장돼요';$('logout').hidden=true;$('workspace').hidden=false;await load();}else{try{if(api.session()){await load();}else $('login').hidden=false;}catch(_){$('login').hidden=false;}}})();
$('payment-settings').ontoggle=async()=>{if($('payment-settings').open&&!paymentSettingsLoaded){const run=accessVersion;paymentSettingsLoaded=await window.SKMSetupPaymentSettings();if(run!==accessVersion)clearWorkspace();}};
window.addEventListener('skm-account-changed',()=>{clearWorkspace();load();});
window.addEventListener('storage',e=>{if(!e.key||e.key==='skm-customer-session-v1'){clearWorkspace();load();}});
window.addEventListener('pagehide',clearWorkspace);
window.addEventListener('pageshow',e=>{if(e.persisted)load();});
setInterval(()=>{if(!document.hidden&&!$('workspace').hidden&&!$('detail').open)load();},60000);document.addEventListener('visibilitychange',()=>{if(!document.hidden&&!$('workspace').hidden)load();});
})();
