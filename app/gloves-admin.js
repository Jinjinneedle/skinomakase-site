(() => {
'use strict';
const api=window.SKMBooking,$=id=>document.getElementById(id),root=$('drop-detail');
let data={drops:[],requests:[]},loading=false,user=null;
const states={draft:'준비 중',open:'요청 가능',reserved:'예약됨',collected:'수령 완료',closed:'마감',pending:'위치 요청',shared:'위치 전달됨',declined:'요청 마감'};
const el=(tag,text,cls)=>{const e=document.createElement(tag);if(text!=null)e.textContent=text;if(cls)e.className=cls;return e;};
const errors={'drop locked':'이미 예약되거나 수령된 장갑은 수정할 수 없어요.','drop unavailable':'이미 다른 고객에게 예약됐거나 마감됐어요. 새로고침해 주세요.','location reply required':'고객에게 보낼 위치 안내를 입력해 주세요.','city already exists':'이미 등록된 도시예요. 기존 도시에서 번호를 선택해 주세요.','reply already sent':'이미 위치를 보냈어요. 새로고침해 확인해 주세요.','requested slot cannot move':'요청이 있는 장갑의 도시·번호는 변경할 수 없어요.','invalid image':'사진을 다시 선택해 주세요.','invalid drop':'도시·이름·번호·좌표를 확인해 주세요.','photo and area required':'공개하려면 도시와 장갑 사진이 필요해요.','private photo cannot be public':'위치 사진을 공개 사진으로 사용할 수 없어요.','public photo cannot be private':'공개 장갑 사진과 다른 위치 사진을 선택해 주세요.'};
function error(e){return e.message==='coordinates required'?'길찾기에 사용할 위도와 경도를 입력해 주세요.':errors[e.message]||(/duplicate key/.test(e.message)?'이미 등록된 도시·번호예요.':'저장하거나 불러오지 못했어요. 다시 시도해 주세요.');}
function status(s){$('status').textContent=s;const p=$('detail-status');if(p)p.textContent=s;}
function button(label,fn,cls=''){const b=el('button',label,'drop-button '+cls);b.type='button';b.onclick=async()=>{b.disabled=true;try{await fn();}catch(e){status(error(e));}finally{b.disabled=false;}};return b;}
function field(parent,label,value='',type='text'){const l=el('label',label),i=el(type==='textarea'?'textarea':'input');if(type!=='textarea')i.type=type;i.value=value??'';l.append(i);parent.append(l);return i;}
function photo(path,parent){if(!path)return;const im=el('img');im.alt='장갑 사진';parent.append(im);api.gloveImage(path).then(url=>{if(im.isConnected)im.src=url;}).catch(()=>im.remove());}
function open(title){root.replaceChildren(button('닫기',()=>root.close(),'drop-close'),el('h2',title));const s=el('p',null,'drop-status');s.id='detail-status';s.setAttribute('role','status');root.append(s);if(!root.open)root.showModal();}
async function load(){
 if(loading)return;loading=true;$('refresh').disabled=true;
 try{const current=await api.currentUser();if(!await api.isAdmin())throw Error('admin required');const result=await api.gloveAdminList();if(api.session()?.user?.id!==current.id)return;
 user=current.id;data=result;$('add').hidden=false;status('');render();
 }catch(e){data={drops:[],requests:[]};$('content').replaceChildren();$('add').hidden=true;root.close();status(e.message==='admin required'?'관리자 계정으로 로그인해 주세요.':error(e));if(e.status===401)$('content').append(el('p','예약 관리 화면에서 로그인한 뒤 다시 열어주세요.'));}
 finally{loading=false;$('refresh').disabled=false;}
}
function render(){
 const content=$('content');content.replaceChildren();const cities=new Map();
 for(const d of data.drops){const key=d.area.trim().toLowerCase();if(!cities.has(key))cities.set(key,[]);cities.get(key).push(d);}
 if(!cities.size)content.append(el('p','첫 도시와 장갑 디자인을 등록해 주세요. 준비 중으로 저장하면 고객에게 보이지 않아요.','drop-sub'));
 for(const rows of cities.values()){
  rows.sort((a,b)=>a.number-b.number);const section=el('section',null,'drop-admin-card');section.append(el('h2',rows[0].area),el('p',`${rows.filter(d=>d.status==='open').length}개 요청 가능 · ${rows.filter(d=>d.status==='reserved').length}개 예약 · ${rows.filter(d=>d.status==='collected').length}개 수령 완료`,'drop-meta'));
  section.append(button('도시 디자인 · 공통 픽업 장소',()=>editCity(rows.find(d=>['draft','open'].includes(d.status))||rows[0])));
  const requests=data.requests.filter(r=>rows.some(d=>d.id===r.drop_id)&&['pending','shared'].includes(r.status));
  for(const r of requests){const d=rows.find(d=>d.id===r.drop_id),b=button(`#${String(d.number).padStart(2,'0')} · ${r.email} · ${states[r.status]}`,()=>reply(r.id));b.classList.add('drop-request');section.append(b);}
  const details=el('details');details.append(el('summary','장갑 번호별 관리'));const grid=el('div',null,'drop-grid');
  for(let n=1;n<=Math.max(50,...rows.map(row=>row.number));n++){const d=rows.find(d=>d.number===n);const b=button(String(n).padStart(2,'0'),()=>edit(d||{area:rows[0].area,number:n,title:rows[0].title,cover_path:rows[0].cover_path}));b.className='drop-slot';b.dataset.state=d?.status||'empty';b.setAttribute('aria-label',rows[0].area+' '+n+' · '+(states[d?.status]||'미등록'));b.title=states[d?.status]||'미등록';if(d?.status==='collected')b.textContent+=' ✓';else if(d?.status==='reserved')b.textContent+=' •';grid.append(b);}details.append(grid);section.append(details);content.append(section);
 }
}
async function upload(input){
 if(!input.files?.[0])return input.dataset.path||'';
 if(input._uploaded===input.files[0])return input.dataset.path;
 const file=input.files[0];if(file.size>10*1024*1024)throw Error('invalid image');
 // Re-encode to remove location metadata and cap transfer size on mobile.
 const url=URL.createObjectURL(file),im=new Image();let blob;
 try{await new Promise((resolve,reject)=>{im.onload=resolve;im.onerror=reject;im.src=url;});const scale=Math.min(1,1600/Math.max(im.naturalWidth,im.naturalHeight));const canvas=document.createElement('canvas');canvas.width=Math.round(im.naturalWidth*scale);canvas.height=Math.round(im.naturalHeight*scale);const ctx=canvas.getContext('2d');ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(im,0,0,canvas.width,canvas.height);blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/jpeg',.88));}finally{URL.revokeObjectURL(url);}
 if(!blob)throw Error('invalid image');input.dataset.path=await api.gloveUpload(blob);input._uploaded=file;return input.dataset.path;
}
function edit(d={},batch=false){
 if(['reserved','collected'].includes(d.status)){const r=data.requests.find(r=>r.drop_id===d.id&&['shared','collected'].includes(r.status));if(r)return reply(r.id);}
 open(batch?'도시 등록 · 장갑 50쌍':'장갑 등록 / 수정');const form=el('form');root.append(form);
 const id=d.id||crypto.randomUUID(),area=field(form,'도시',d.area),title=field(form,'장갑 디자인 이름',d.title),number=field(form,'번호 (1–100)',d.number||1,'number');area.required=title.required=true;area.maxLength=160;title.maxLength=120;number.min=1;number.max=100;number.required=true;if(batch)number.parentElement.hidden=true;
 const desc=field(form,'고객에게 보이는 설명',d.description,'textarea');desc.maxLength=2000;
 const cover=field(form,'공개 장갑 사진 · 위치 단서가 없는 디자인 사진','','file');cover.accept='image/jpeg,image/png,image/webp';cover.dataset.path=d.cover_path||'';photo(d.cover_path,form);
 const privateFields=el('fieldset');privateFields.append(el('legend','비공개 위치 · 안내를 보낼 때만 고객에게 공개'));form.append(privateFields);
 const note=field(privateFields,'기본 위치 안내 (고객별로 보내기 전에 수정 가능)',d.location_note,'textarea');note.maxLength=4000;
 const lat=field(privateFields,'위도 (선택)',d.latitude,'number'),lon=field(privateFields,'경도 (선택)',d.longitude,'number');lat.min=-90;lat.max=90;lon.min=-180;lon.max=180;lat.step=lon.step='any';
 const locationPhoto=field(privateFields,'비공개 위치 사진 (선택)','','file');locationPhoto.accept=cover.accept;locationPhoto.dataset.path=d.location_photo||'';photo(d.location_photo,privateFields);
 const label=el('label','공개 상태'),state=el('select');for(const value of ['draft','open','closed']){const o=el('option',states[value]);o.value=value;state.append(o);}state.value=d.status||'draft';label.append(state);form.append(label);
 if(batch)form.append(el('p','50개 번호에 같은 도시 디자인을 적용합니다. 위치는 번호별로 수정하거나 요청을 수락할 때 입력할 수 있어요.','drop-meta'));
 const save=el('button',batch?'도시와 50개 번호 저장':'저장','drop-button primary');save.type='submit';form.append(save);
 form.onsubmit=async e=>{e.preventDefault();if(!form.reportValidity())return;if((lat.value==='')!==(lon.value==='')){status('위도와 경도를 함께 입력해 주세요.');return;}if(batch&&state.value==='open'&&!confirm('이 도시의 장갑 50쌍를 고객이 요청할 수 있게 공개할까요? 실제 준비된 수량인지 확인해 주세요.'))return;
  save.disabled=true;try{status('사진과 장갑을 저장하는 중…');const coverPath=await upload(cover),photoPath=await upload(locationPhoto);if(api.session()?.user?.id!==user)throw Error('session changed');
  const p={id,area:area.value.trim(),title:title.value.trim(),number:Number(number.value),description:desc.value.trim(),cover_path:coverPath,location_note:note.value.trim(),latitude:lat.value||null,longitude:lon.value||null,location_photo:photoPath,status:state.value};
  await (batch?api.gloveCreateCity(p):api.gloveSave(p));root.close();await load();status('저장했어요.');}catch(e){status(error(e));}finally{save.disabled=false;}
 };
}
function reply(id){
 const r=data.requests.find(r=>r.id===id),d=data.drops.find(d=>d.id===r?.drop_id);if(!r||!d)return;
 open(d.area+' / #'+String(d.number).padStart(2,'0'));root.append(el('p',r.email),el('p',states[r.status],'drop-meta'));photo(d.cover_path,root);
 if(r.status==='pending'){
  const note=field(root,'이 고객에게 보낼 위치 안내',d.location_note,'textarea');note.maxLength=4000;photo(d.location_photo,root);
  const lat=field(root,'픽업 위도',d.latitude,'number'),lon=field(root,'픽업 경도',d.longitude,'number');lat.min=-90;lat.max=90;lon.min=-180;lon.max=180;lat.step=lon.step='any';lat.required=lon.required=true;
  root.append(el('p','전송하면 이 고객 한 명에게만 위치가 공개돼요. 다른 대기 요청은 마감되고 이 장갑은 예약 처리됩니다.','drop-meta'),button('위치 보내고 예약 처리',async()=>{if(!note.value.trim()){status('위치 안내를 입력해 주세요.');return;}if(!lat.reportValidity()||!lon.reportValidity())return;await api.gloveShare(r.id,note.value,Number(lat.value),Number(lon.value));await load();reply(id);},'primary'));
 }else{root.append(el('p',r.reply||'요청이 마감됐어요.'));photo(r.location_photo,root);if(r.status==='shared')root.append(button('수령 완료로 기록',async()=>{if(!confirm('실제 수령이 확인됐나요?'))return;await api.gloveCollect(r.id);await load();reply(id);},'primary'));}
}
function editCity(d){
 open(d.area+' · 도시 설정');const form=el('form');root.append(form);
 const cover=field(form,'도시 장갑 디자인 · 전체 번호에 적용','','file');cover.accept='image/jpeg,image/png,image/webp';cover.dataset.path=d.cover_path||'';photo(d.cover_path,form);
 const note=field(form,'공통 픽업 장소 안내',d.location_note,'textarea');note.maxLength=4000;
 const lat=field(form,'공통 픽업 위도',d.latitude,'number'),lon=field(form,'공통 픽업 경도',d.longitude,'number');lat.min=-90;lat.max=90;lon.min=-180;lon.max=180;lat.step=lon.step='any';
 const label=el('label','준비 중인 번호를 고객에게 공개'),publish=el('input');publish.type='checkbox';publish.style.width='22px';label.append(publish);form.append(label,el('p','이미 위치를 받은 고객의 안내는 바뀌지 않습니다. 변경된 장소는 이후 선택하는 고객에게 적용돼요.','drop-meta'));
 const save=el('button','도시 설정 저장','drop-button primary');save.type='submit';form.append(save);
 form.onsubmit=async e=>{e.preventDefault();if(!form.reportValidity())return;if((lat.value==='')!==(lon.value==='')){status('위도와 경도를 함께 입력해 주세요.');return;}if(publish.checked&&!confirm('준비 중인 번호를 실제 픽업 요청이 가능하도록 공개할까요?'))return;save.disabled=true;
  try{const path=await upload(cover);await api.gloveCityUpdate(d.id,path,note.value,lat.value===''?null:Number(lat.value),lon.value===''?null:Number(lon.value),publish.checked);root.close();await load();status('도시 설정을 저장했어요.');}catch(e){status(error(e));}finally{save.disabled=false;}
 };
}
$('add').textContent='+ 도시 등록 · 50쌍';$('add').onclick=()=>edit({},true);$('refresh').onclick=load;
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&!root.open)load();});
setInterval(()=>{if(!document.hidden&&!root.open)load();},30000);load();
})();
