import {evaluateProximity} from './drop-proximity-core.cjs';
// Local, foreground distance assistance. GPS is never proof of ownership or collection.
// No coordinates are stored or sent to a third party by this module.
export function mountDropProximity(host,target){
 const ko=window.SKMLanguage?.code==='ko';
 const box=document.createElement('div');box.className='drop-proximity';
 const start=document.createElement('button'),hint=document.createElement('span'),contact=document.createElement('button');
 start.type=contact.type='button';start.textContent=ko?'거리 · 진동 켜기':'Enable distance & haptics';hint.setAttribute('role','status');contact.textContent=ko?'스튜디오 연결 준비 중':'Studio contact coming soon';contact.disabled=true;contact.hidden=true;box.append(start,hint,contact);host.prepend(box);
 let running=false,watch=null,timer=null,fix=null,lastPulse=0,native=false,previous={},hooks={};
 const api=window.SKMApp;
 function stop(message){running=false;clearInterval(timer);timer=null;if(watch!==null){navigator.geolocation.clearWatch(watch);watch=null;}if(native){api.location('stop');for(const key of Object.keys(hooks))if(api[key]===hooks[key])api[key]=previous[key];native=false;}contact.hidden=true;fix=null;start.textContent=ko?'거리 · 진동 켜기':'Enable distance & haptics';start.setAttribute('aria-pressed','false');hint.textContent=message||'';}
 function paint(){if(!running||document.hidden)return;const state=evaluateProximity(fix,target);contact.hidden=!state.within;start.textContent=ko?'위치 확인 끄기':'Stop location';start.setAttribute('aria-pressed','true');hint.textContent=state.state==='waiting'?(ko?'현재 위치 확인 중':'Finding your location'):state.state==='uncertain'?(ko?'GPS 오차가 커요 · 다시 확인 중':'GPS accuracy is low · Checking again'):(state.distance>=1000?(state.distance/1000).toFixed(1)+' km':Math.ceil(state.distance)+' m')+(state.within?(ko?' · 100m 안에 도착':' · Within 100 m'):'');const now=Date.now();if(state.interval&&now-lastPulse>=state.interval){lastPulse=now;if(api?.haptic)api.haptic(state.style);else if(navigator.vibrate)navigator.vibrate(state.within?45:20);}}
 function error(denied){stop(ko?(denied?'위치 권한을 허용하면 사용할 수 있어요':'위치를 확인하지 못했어요. 다시 눌러주세요.'):(denied?'Allow location access to continue':'Location unavailable. Try again.'));}
 start.onclick=()=>{if(running){stop();return;}running=true;lastPulse=Date.now();fix=null;paint();timer=setInterval(paint,1000);if(api?.location){native=true;hooks={onLocation:(lat,lon,alt,accuracy,timestamp)=>{fix={lat,lon,accuracy,timestamp:timestamp||Date.now()};paint();},onLocationDenied:()=>error(true),onLocationError:()=>error(false)};for(const key of Object.keys(hooks)){previous[key]=api[key];api[key]=hooks[key];}api.location('start');}else if(navigator.geolocation){watch=navigator.geolocation.watchPosition(p=>{fix={lat:p.coords.latitude,lon:p.coords.longitude,accuracy:p.coords.accuracy,timestamp:p.timestamp};paint();},e=>error(e.code===1),{enableHighAccuracy:true,maximumAge:0,timeout:15000});}else error(false);};
 function visibility(){if(document.hidden)stop();}const pagehide=()=>stop();document.addEventListener('visibilitychange',visibility);window.addEventListener('pagehide',pagehide);
 return {dispose(){stop();document.removeEventListener('visibilitychange',visibility);window.removeEventListener('pagehide',pagehide);box.remove();}};
}
