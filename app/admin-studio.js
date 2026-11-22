(() => {
'use strict';
const api=window.SKMBooking,$=id=>document.getElementById(id);
const cities=['SEOUL','TOKYO','OSAKA','HONG KONG','NEW YORK','VANCOUVER','TORONTO','MONTREAL','LOS ANGELES','LONDON','PARIS','SINGAPORE'];
const names=['서울','도쿄','오사카','홍콩','뉴욕','밴쿠버','토론토','몬트리올','로스앤젤레스','런던','파리','싱가포르'];
let ready=false,records=[],owner='',generation=0,filter='all';
const node=(tag,text)=>{const n=document.createElement(tag);if(text!=null)n.textContent=text;return n;};
const label=c=>names[cities.indexOf(c)]||'도시 미정';
function cityOf(row){const c=row.city||/^\[City: ([A-Z ]+)\]/.exec(row.note||'')?.[1];return cities.includes(c)?c:'';}
function selectCity(empty='도시 선택'){const s=node('select');const blank=node('option',empty);blank.value='';s.append(blank);cities.forEach((city,i)=>{const o=node('option',names[i]);o.value=city;s.append(o);});return s;}
const status=t=>{$('studio-setup-status').textContent=t;};
const reset=()=>{++generation;ready=false;records=[];owner='';for(const id of ['studio-name','studio-address','studio-message','studio-qr-file'])$(id).value='';$('studio-qr-preview').hidden=true;$('studio-qr-preview').removeAttribute('src');$('studio-save').disabled=true;$('studio-qr-save').disabled=true;};
async function loadSettings(){
 const user=api.session()?.user?.id;if(ready&&owner===user)return;
 const run=++generation;owner=user;ready=false;
 try{const result=await api.sessionStudios();if(run!==generation||api.session()?.user?.id!==user)return;records=result;ready=true;status('');}
 catch{if(run===generation)status('도시 설정 서버 연결 준비 중');}
 $('studio-save').disabled=$('studio-qr-save').disabled=!ready;
}
function mountFilter(change){
 const s=$('manager-city');s.append(new Option('모든 도시','all'),...cities.map((c,i)=>new Option(names[i],c)),new Option('도시 미정',''));
 s.value=filter;s.onchange=()=>{filter=s.value;change();};
 const city=$('studio-city');for(const [i,c] of cities.entries())city.append(new Option(names[i],c));
 const fill=()=>{const row=records.find(r=>r.city===city.value)||{},run=generation;
 $('studio-name').value=row.studio_name||'';$('studio-address').value=row.address||'';$('studio-message').value=row.first_message||'';
 $('studio-qr-settings').hidden=city.value!=='SINGAPORE';$('studio-qr-file').value='';const image=$('studio-qr-preview');image.hidden=true;image.removeAttribute('src');
 if(row.qr_path)api.studioQRImage(row.qr_path).then(url=>{if(run===generation&&city.value===row.city){image.src=url;image.hidden=false;}}).catch(()=>status('QR 이미지를 불러오지 못했어요.'));
 };
 city.onchange=fill;
 $('studio-qr-save').onclick=async()=>{
  const user=api.session()?.user?.id,run=generation,file=$('studio-qr-file').files[0];if(!ready||owner!==user||city.value!=='SINGAPORE')return;
  if(!file){status('스튜디오에서 받은 실제 PayNow QR 이미지를 선택해 주세요.');return;}
  const button=$('studio-qr-save');button.disabled=true;status('QR 저장 중…');
  try{const path=await api.uploadStudioQR(file);if(run!==generation||api.session()?.user?.id!==user)return;await api.saveStudioQR('SINGAPORE',path);if(run!==generation||api.session()?.user?.id!==user)return;ready=false;await loadSettings();fill();status('스튜디오 QR을 저장했어요.');}
  catch{if(run===generation)status('QR을 저장하지 못했어요. 스튜디오 정보와 이미지 파일을 확인해 주세요.');}
  finally{if(run===generation)button.disabled=!ready;}
 };

 $('studio-settings').ontoggle=async()=>{if($('studio-settings').open){await loadSettings();fill();}};
 $('studio-save').onclick=async()=>{
  const user=api.session()?.user?.id;if(!ready||owner!==user)return;
  const button=$('studio-save');button.disabled=true;status('저장 중…');
  try{const row=await api.saveSessionStudio(city.value,$('studio-name').value.trim(),$('studio-address').value.trim(),$('studio-message').value.trim());if(owner!==user||api.session()?.user?.id!==user)return;records=records.filter(r=>r.city!==row.city).concat(row);status('저장했어요.');}
  catch{if(owner===user&&api.session()?.user?.id===user)status('저장하지 못했어요. 내용을 확인하고 다시 시도해 주세요.');}
  finally{button.disabled=!ready;}
 };
}
function bookingControls(root,row,save){
 const city=selectCity();city.value=cityOf(row);city.setAttribute('aria-label','세션 도시');root.append(city);
 const saveCity=node('button','도시 저장');saveCity.type='button';saveCity.disabled=!ready;root.append(saveCity);
 saveCity.onclick=async()=>{saveCity.disabled=true;try{const patch={city:city.value||null};if(city.value==='SINGAPORE'&&row.status==='new'&&row.price==null){patch.currency='SGD';patch.deposit=100;}await save(patch);}catch{status('도시를 저장하지 못했어요.');}finally{saveCity.disabled=!ready;}};
 const l=node('label','통화'),currency=node('select');currency.setAttribute('aria-label','통화');
 const legacy=row.currency==null&&(row.price!=null||row.deposit!=null);
 if(legacy)currency.append(new Option('기존 금액 · 통화 미지정',''));
 for(const c of ['USD','KRW','JPY','CAD','HKD','GBP','EUR','SGD'])currency.append(new Option(c,c));
 currency.value=cityOf(row)==='SINGAPORE'?'SGD':row.currency||(legacy?'':'USD');currency.disabled=!ready;l.append(currency);root.append(l);
 if(!ready)root.append(node('p','도시·USD 설정은 서버 연결 후 저장할 수 있어요.'));
 return {currency,amountPatch(price,deposit){if(!ready)throw Error('도시·통화 설정 서버를 먼저 연결해 주세요.');if(!currency.value)throw Error('기존 금액의 통화를 선택해 주세요.');return {price,deposit,currency:currency.value};}};
}
function openSettings(city){$('studio-city').value=city;$('studio-settings').closest('.manager-tools').open=true;$('studio-settings').open=true;$('studio-city').dispatchEvent(new Event('change'));$('studio-settings').scrollIntoView({behavior:'smooth',block:'start'});}
window.SKMStudioAdmin={record:city=>records.find(r=>r.city===city),openSettings,mountFilter,loadSettings,reset,bookingControls,cityOf,label,matches:r=>filter==='all'||cityOf(r)===filter};
})();
