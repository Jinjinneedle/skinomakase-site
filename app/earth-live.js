import {createRadioShuffle} from './radio-shuffle.js';
import {loadOrbits,orbitRecords,orbitPosition,orbitTrack,loadRadio,loadRandomRadioStations,loadRadioCountries,searchRadioCountries,countRadioClick,ORBIT_TTL} from './live-data.js';
import {createRadioPlayer} from './radio-player.js';
import cameras from './nature-cameras.json';
import spaceCameras from './space-cameras.json';

export function mountEarthLive({root,layer,vector,R,cities,selectedCity,focusPoint,followPoint,setCameras,openCamera,wake,isVisible}){
 const ko=()=>window.SKMLanguage?.code==='ko',say=(kr,en)=>ko()?kr:en;
 const el=(tag,text,className)=>{const n=document.createElement(tag);if(text)n.textContent=text;if(className)n.className=className;return n;};
 const app=root.querySelector('.earth-app'),dock=root.querySelector('.survey-dock');
 const toggle=el('button','LIVE');toggle.type='button';toggle.setAttribute('aria-expanded','false');dock.append(toggle);
 const panel=el('section',null,'earth-live-panel');panel.hidden=true;panel.setAttribute('aria-label','Live map');app.append(panel);
 const head=el('header'),title=el('strong','LIVE'),close=el('button','×');close.type='button';close.setAttribute('aria-label','Close live map');head.append(title,close);panel.append(head);
 const tabs=el('nav'),body=el('div',null,'earth-live-body');panel.append(tabs,body);
 let active='satellites',enabled=true,records=[],received=null,lastPosition=0,loadToken=0,loading=false,lastLoad=0;
 let selected=null,following=false,track=[],trackAt=0,radioCountry=selectedCity()?.country||'US';
 const pins=new Map(),tabButtons=new Map();
 const labels={satellites:['위성','SATELLITES'],radio:['라디오','RADIO'],cameras:['카메라','CAMERAS']};
 function paintTabs(){for(const [id,b]of tabButtons){b.textContent=say(...labels[id]);b.setAttribute('aria-pressed',String(active===id));}}
 for(const id of Object.keys(labels)){const b=el('button');b.type='button';b.onclick=()=>{active=id;paintTabs();void paintBody();};tabs.append(b);tabButtons.set(id,b);}paintTabs();
 function open(){panel.hidden=false;detail.hidden=true;toggle.setAttribute('aria-expanded','true');root.querySelector('.survey-cities').hidden=true;root.querySelector('[data-survey=cities]').setAttribute('aria-expanded','false');paintTabs();void paintBody();}
 function hide(){panel.hidden=true;toggle.setAttribute('aria-expanded','false');loadToken++;paintDetail();wake();}
 toggle.onclick=()=>panel.hidden?open():hide();close.onclick=hide;
 root.querySelector('[data-survey=cities]').addEventListener('click',()=>{dismissSatellite();hide();});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(!panel.hidden)hide();else dismissSatellite();}});
 const source=(name,url)=>{const a=el('a',name+' ↗','earth-live-source');a.href=url;a.target='_blank';a.rel='noopener noreferrer';return a;};
 function rowButton(label,sub,action){const b=el('button',null,'earth-live-row');b.type='button';b.append(el('span',label));if(sub)b.append(el('small',sub));b.onclick=action;return b;}

 // This player remains attached when the panel closes or the globe moves.
 const mini=el('section',null,'earth-radio-mini');mini.hidden=true;mini.setAttribute('aria-label','Radio player');
 const stationInfo=el('button',null,'earth-radio-info'),stationName=el('strong'),stationStatus=el('small');stationInfo.type='button';stationInfo.append(stationName,stationStatus);stationInfo.onclick=()=>{active='radio';open();};
 const playButton=el('button','▶'),stopButton=el('button','×');playButton.type=stopButton.type='button';stopButton.setAttribute('aria-label','Close radio player');mini.append(stationInfo,playButton,stopButton);app.append(mini);
 let shuffle=null;
 function paintRadio(state){
  mini.hidden=!state.station;mini.dataset.status=state.status;root.classList.toggle('radio-active',!!state.station);
  stationName.textContent=state.station?.name||'';
  const text={loading:['연결 중…','CONNECTING…'],playing:['재생 중','LIVE RADIO'],paused:['일시 정지','PAUSED'],error:['연결 실패 · 다시 재생','UNAVAILABLE · RETRY']};
  stationStatus.textContent=text[state.status]?say(...text[state.status]):'';
  const playing=state.status==='playing'||state.status==='loading';playButton.textContent=playing?'Ⅱ':'▶';playButton.setAttribute('aria-label',playing?say('라디오 일시 정지','Pause radio'):say('라디오 재생','Play radio'));
  for(const b of body.querySelectorAll('[data-radio-id]')){const on=b.dataset.radioId===state.station?.id&&playing;b.setAttribute('aria-pressed',String(on));b.querySelector('small').textContent=on?'Ⅱ':'▶';}
 }
 const radio=createRadioPlayer({createAudio:()=>{const audio=el('audio');audio.hidden=true;audio.dataset.skmRadio='true';app.append(audio);return audio;},onChange:state=>{shuffle?.observe(state);paintRadio(state);},beforePlay:(audio,station)=>{
  for(const other of document.querySelectorAll('audio,video'))if(other!==audio&&!other.paused)other.pause();
  try{window.SKMApp?.audio?.('playback');}catch{}
  countRadioClick(station.id);
 }});
 shuffle=createRadioShuffle({loadStations:loadRandomRadioStations,play:station=>{radioCountry=station.country||radioCountry;return radio.play(station);},current:()=>radio.snapshot().station,canPlay:()=>!document.hidden&&isVisible(),
  onSearching:searching=>{if(!searching){paintRadio(radio.snapshot());return;}if(searching){mini.hidden=false;root.classList.add('radio-active');mini.dataset.status='loading';stationName.textContent=say('랜덤 라디오','RANDOM RADIO');stationStatus.textContent=say('연결 중…','CONNECTING…');playButton.textContent='Ⅱ';playButton.setAttribute('aria-label',say('라디오 일시 정지','Pause radio'));}},
  onError:()=>{mini.hidden=false;root.classList.add('radio-active');mini.dataset.status='error';stationName.textContent=say('랜덤 라디오','RANDOM RADIO');stationStatus.textContent=say('연결 실패 · 다시 재생','UNAVAILABLE · RETRY');playButton.textContent='▶';playButton.setAttribute('aria-label',say('라디오 재생','Play radio'));}
 });
 void shuffle.prefetch().catch(()=>{});
 playButton.onclick=()=>{const connecting=mini.dataset.status==='loading';shuffle.cancel();if(radio.snapshot().station)radio.toggle();else if(connecting)radio.stop();else void shuffle.start();};
 stopButton.onclick=()=>{shuffle.cancel();radio.stop();};
 document.addEventListener('play',e=>{const state=radio.snapshot();if(e.target!==state.audio&&(state.status==='playing'||state.status==='loading'))radio.pause();},true);
 window.addEventListener('pagehide',()=>{shuffle.cancel();radio.stop();});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)shuffle.cancel();});

 const detail=el('section',null,'earth-orbit-detail');detail.hidden=true;detail.setAttribute('aria-label','Satellite details');
 const detailHead=el('header'),detailName=el('strong'),detailClose=el('button','×');detailClose.type='button';detailClose.setAttribute('aria-label','Close satellite details');detailClose.onclick=()=>dismissSatellite();detailHead.append(detailName,detailClose);
 const detailGrid=el('div',null,'earth-orbit-metrics'),detailPosition=el('p',null,'earth-live-note'),detailNote=el('p',null,'earth-live-note');
 const detailActions=el('div',null,'earth-orbit-actions'),cameraActions=el('div',null,'earth-space-cameras'),follow=el('button'),center=el('button');follow.type=center.type='button';detailActions.append(follow,center);detail.append(detailHead,detailGrid,detailPosition,detailActions,detailNote,cameraActions);app.append(detail);
 const orbitSVG=document.createElementNS('http://www.w3.org/2000/svg','svg'),orbitPath=document.createElementNS('http://www.w3.org/2000/svg','path');orbitSVG.classList.add('earth-orbit-trail');orbitSVG.setAttribute('aria-hidden','true');orbitSVG.append(orbitPath);layer.prepend(orbitSVG);
 function dismissSatellite(){selected=null;following=false;track=[];detail.hidden=true;orbitPath.setAttribute('d','');wake();}
 function stopFollowing(){following=false;paintDetail();}
 function selectSatellite(item){selected=item;following=false;enabled=true;trackAt=0;const p=orbitPosition(item);if(p)focusPoint(p.lat,p.lon);hide();wake();}
 follow.onclick=()=>{following=!following;const p=selected&&orbitPosition(selected);if(following&&p)focusPoint(p.lat,p.lon);paintDetail();wake();};
 center.onclick=()=>{const p=selected&&orbitPosition(selected);if(p)focusPoint(p.lat,p.lon);};
 function paintDetail(){
  detail.hidden=!selected||!enabled||!panel.hidden;if(detail.hidden)return;
  const p=orbitPosition(selected);detailName.textContent=selected.name;
  follow.textContent=following?say('추적 중','FOLLOWING'):say('따라가기','FOLLOW');follow.setAttribute('aria-pressed',String(following));center.textContent=say('중앙으로','CENTER');
  detailGrid.replaceChildren();
  for(const [label,value] of [[say('고도','ALTITUDE'),p?Math.round(p.altitude)+' km':'—'],[say('속도','SPEED'),p?Math.round(p.speed).toLocaleString()+' km/h':'—']]){const metric=el('div');metric.append(el('small',label),el('strong',value));detailGrid.append(metric);}
  detailPosition.textContent=p?`${Math.abs(p.lat).toFixed(2)}°${p.lat>=0?'N':'S'}  /  ${Math.abs(p.lon).toFixed(2)}°${p.lon>=0?'E':'W'}`:say('현재 위치를 계산할 수 없어요.','Position unavailable.');
  if(cameraActions.dataset.satellite!==selected.id){
   cameraActions.dataset.satellite=selected.id;cameraActions.replaceChildren();
   const feeds=spaceCameras.filter(c=>String(c.norad)===selected.id);
   for(const feed of feeds){cameraActions.append(rowButton(feed.name,'▷',()=>{radio.pause();openCamera(feed);}));}
   if(feeds.length)cameraActions.append(el('p',say('NASA 송출 · 중단 시 안내 화면이 나올 수 있어요.','NASA feed · May show a standby screen during outages.'),'earth-live-note'));
  }
  detailNote.textContent=say('궤도 기반 추정 · 점선은 향후 90분 경로','ORBIT ESTIMATE · DOTTED PATH: NEXT 90 MIN');
 }
 function clearPins(){for(const p of pins.values())p.button.hidden=true;orbitPath.setAttribute('d','');}
 function ensurePin(item){if(pins.has(item.id)){pins.get(item.id).item=item;return pins.get(item.id);}const b=el('button',null,'earth-satellite-pin');b.type='button';b.setAttribute('aria-label',item.name);b.append(el('span','◇'),el('small',item.name));const pin={button:b,item,point:null};b.onclick=()=>selectSatellite(pin.item);layer.append(b);pins.set(item.id,pin);return pin;}
 async function refresh(){
  if(loading)return;loading=true;
  try{received=await loadOrbits();records=orbitRecords(received.rows);lastLoad=Date.now();lastPosition=0;clearPins();
   for(const [id,p]of pins)if(!records.some(r=>r.id===id)){p.button.remove();pins.delete(id);}
   for(const r of records)ensurePin(r);
   if(selected){selected=records.find(r=>r.id===selected.id)||null;trackAt=0;if(!selected)following=false;}
  }catch{records=[];for(const p of pins.values())p.button.remove();pins.clear();dismissSatellite();}
  finally{loading=false;wake();if(!panel.hidden&&active==='satellites')void paintBody();}
 }
 async function paintBody(){
  const token=++loadToken;body.replaceChildren();
  if(active==='satellites'){
   const control=rowButton(say('지도에 표시','SHOW ON MAP'),enabled?'ON':'OFF',()=>{enabled=!enabled;if(enabled&&!records.length)void refresh();if(!enabled){clearPins();dismissSatellite();}void paintBody();wake();});control.setAttribute('aria-pressed',String(enabled));body.append(control);
   body.append(el('p',loading?say('궤도 불러오는 중…','Loading orbits…'):say('공개 궤도로 계산한 현재 위치','Current positions estimated from orbital data'),'earth-live-note'));
   if(!records.length&&!loading)body.append(rowButton(say('궤도 다시 불러오기','RELOAD ORBITS'),'↻',()=>{enabled=true;void refresh();void paintBody();}));
   if(received)body.append(el('p',(received.offline?say('저장된 궤도 · ','Cached orbits · '):'')+new Date(received.at).toLocaleString(),'earth-live-note'));
   for(const item of records){const p=orbitPosition(item);if(!p)continue;body.append(rowButton(item.name,Math.round(p.altitude)+' km',()=>selectSatellite(item)));}
   body.append(source('CelesTrak','https://celestrak.org/NORAD/elements/'));
  }else if(active==='radio'){
   const locale=window.SKMLanguage?.code||'en';
   const countryLabel=code=>searchRadioCountries([{code}],locale)[0]?.label||code;
   const pickerButton=rowButton(countryLabel(radioCountry),'⌄',()=>{const show=picker.hidden;picker.hidden=!show;stationGroup.hidden=show;pickerButton.setAttribute('aria-expanded',String(show));if(show){search.focus();paintCountries();}});
   pickerButton.setAttribute('aria-label',say('라디오 국가 선택','Choose radio country'));pickerButton.setAttribute('aria-expanded','false');
   const picker=el('div',null,'earth-radio-countries');picker.hidden=true;
   const search=el('input');search.type='search';search.placeholder=say('국가 검색','Search countries');search.setAttribute('aria-label',search.placeholder);search.autocomplete='off';search.spellcheck=false;
   const countryList=el('div'),stationGroup=el('div'),list=el('div');picker.append(search,countryList);
   stationGroup.append(el('p',say('방송국 선택 → 지구본을 보면서 듣기','Choose a station. Keep listening as you explore.'),'earth-live-note'),list);
   body.append(pickerButton,picker,stationGroup,source('Radio Browser','https://www.radio-browser.info/'));
   let countries=[],countriesLoading=true,countriesFailed=false,stationRequest=0;
   function paintCountries(){
    countryList.replaceChildren();
    if(countriesLoading){countryList.append(el('p',say('국가 불러오는 중…','Loading countries…'),'earth-live-note'));return;}
    if(countriesFailed){countryList.append(rowButton(say('연결 실패 · 다시 시도','UNAVAILABLE · RETRY'),'↻',()=>void fetchCountries()));return;}
    const matches=searchRadioCountries(countries,locale,search.value);
    if(!matches.length)countryList.append(el('p',say('일치하는 국가가 없어요.','No matching countries.'),'earth-live-note'));
    for(const country of matches){countryList.append(rowButton(country.label,country.code,()=>{
     radioCountry=country.code;pickerButton.querySelector('span').textContent=country.label;
     picker.hidden=true;stationGroup.hidden=false;pickerButton.setAttribute('aria-expanded','false');search.value='';void stations();
    }));}
   }
   async function fetchCountries(){countriesLoading=true;countriesFailed=false;paintCountries();
    try{const rows=await loadRadioCountries();if(token!==loadToken)return;countries=rows;}
    catch{countriesFailed=true;}
    finally{countriesLoading=false;if(token===loadToken)paintCountries();}
   }
   async function stations(){const country=radioCountry,request=++stationRequest;list.replaceChildren(el('p',say('불러오는 중…','Loading…')));
    try{const rows=await loadRadio(country);if(token!==loadToken||request!==stationRequest)return;list.replaceChildren();
     for(const r of rows){const b=rowButton(r.name,'▶',()=>{shuffle.cancel();const current=radio.snapshot();if(current.station?.id===r.id)radio.toggle();else void radio.play(r);});b.dataset.radioId=r.id;list.append(b);}
     if(!rows.length)list.append(el('p',say('앱에서 재생 가능한 방송국이 아직 없어요. 다른 국가를 선택해 주세요.','No compatible stations here yet. Choose another country.')));paintRadio(radio.snapshot());
    }catch{if(token===loadToken&&request===stationRequest)list.replaceChildren(rowButton(say('연결 실패 · 다시 시도','UNAVAILABLE · RETRY'),'↻',()=>void stations()));}}
   search.oninput=paintCountries;void fetchCountries();void stations();
  }else{
   const control=rowButton(say('지도에 표시','SHOW ON MAP'),root.dataset.cameras==='off'?'OFF':'ON',()=>{const on=root.dataset.cameras==='off';root.dataset.cameras=on?'on':'off';setCameras(on);void paintBody();});control.setAttribute('aria-pressed',String(root.dataset.cameras!=='off'));body.append(control);
   for(const feed of spaceCameras)body.append(rowButton(feed.name,'NASA · ▷',()=>{radio.pause();hide();openCamera(feed);}));
   const input=el('input');input.type='search';input.placeholder=say('장소 검색','Search places');input.setAttribute('aria-label',input.placeholder);const list=el('div');body.append(input);
   const street=el('a',say('뉴욕 · 타임스퀘어 ↗','New York · Times Square ↗'),'earth-live-row');street.href='https://www.earthcam.com/usa/newyork/timessquare/';street.target='_blank';street.rel='noopener noreferrer';body.append(street,list);
   function cameraList(){list.replaceChildren();const query=input.value.toLocaleLowerCase();for(const camera of cameras.filter(c=>(c.name+' '+c.publisher).toLocaleLowerCase().includes(query))){list.append(rowButton(camera.name,camera.publisher,()=>{dismissSatellite();focusPoint(camera.lat,camera.lon);hide();openCamera(camera);}));}}
   input.oninput=cameraList;cameraList();
  }
 }
 void refresh();
 return {hide,stopFollowing,dismissSatellite,randomRadio:()=>shuffle.start(),render(project){
  if(!enabled||!isVisible()){clearPins();return;}
  const now=Date.now();if(now-lastLoad>ORBIT_TTL&&!loading){lastLoad=now;void refresh();}
  if(now-lastPosition>1000){lastPosition=now;for(const pin of pins.values()){const p=orbitPosition(pin.item,new Date(now));pin.point=p?vector(p.lat,p.lon,R*(1+p.altitude/6371)):null;}
   if(selected){const p=orbitPosition(selected,new Date(now));if(following&&p)followPoint(p.lat,p.lon);paintDetail();}
  }
  const groups=[];clearPins();
  for(const pin of [...pins.values()].sort((a,b)=>(b.item.id===selected?.id)-(a.item.id===selected?.id))){const p=pin.point&&project(pin.point);if(!p)continue;const group=groups.find(g=>Math.hypot(g.p.x-p.x,g.p.y-p.y)<28);if(group)group.count++;else groups.push({pin,p,count:1});}
  for(const {pin,p,count} of groups){pin.button.hidden=false;pin.button.style.left=p.x+'px';pin.button.style.top=p.y+'px';const name=pin.item.name+(count>1?' +'+(count-1):'');pin.button.querySelector('small').textContent=name;pin.button.setAttribute('aria-label',name);pin.button.classList.toggle('is-selected',pin.item.id===selected?.id);}
  if(selected){if(now-trackAt>30000){trackAt=now;track=orbitTrack(selected,now).map(p=>p?vector(p.lat,p.lon,R*(1+p.altitude/6371)):null);}
   let path='',connected=false;for(const point of track){const p=point&&project(point);if(!p){connected=false;continue;}path+=(connected?'L':'M')+p.x.toFixed(1)+','+p.y.toFixed(1);connected=true;}orbitPath.setAttribute('d',path);
  }
 }};
}
