import {json2satrec} from './vendor/satellite/dist/io.js';
import {propagate,gstime} from './vendor/satellite/dist/propagation.js';
import {eciToGeodetic} from './vendor/satellite/dist/transforms.js';

export const ORBIT_TTL=2*60*60*1000;
export const ORBIT_MAX_AGE=7*24*60*60*1000;
export function orbitRecords(rows,now=Date.now()){
 if(!Array.isArray(rows))return [];
 return rows.filter(row=>{
  if(!row||typeof row!=='object')return false;
  const epoch=Date.parse(String(row.EPOCH).replace(/Z$/,'')+'Z');
  return Number.isFinite(epoch)&&now-epoch<ORBIT_MAX_AGE&&epoch-now<86400000&&
   ['MEAN_MOTION','ECCENTRICITY','INCLINATION','RA_OF_ASC_NODE','ARG_OF_PERICENTER','MEAN_ANOMALY','BSTAR'].every(k=>Number.isFinite(row[k]))&&row.MEAN_MOTION>0&&row.ECCENTRICITY>=0&&row.ECCENTRICITY<1;
 }).slice(0,40).flatMap(row=>{try{return [{id:String(row.NORAD_CAT_ID),name:String(row.OBJECT_NAME).slice(0,80),epoch:row.EPOCH,record:json2satrec(row)}];}catch{return [];}});
}
export function orbitPosition(item,date=new Date()){
 try{
  const result=propagate(item.record,date);if(!result?.position)return null;
  const gd=eciToGeodetic(result.position,gstime(date)),lat=gd.latitude*180/Math.PI,lon=gd.longitude*180/Math.PI;
  return [lat,lon,gd.height].every(Number.isFinite)&&gd.height>80&&gd.height<100000?{lat,lon,altitude:gd.height,speed:result.velocity?Math.hypot(result.velocity.x,result.velocity.y,result.velocity.z)*3600:0}:null;
 }catch{return null;}
}
export function secureURL(value){try{const u=new URL(value);return u.protocol==='https:'&&!u.username&&!u.password?u.href:null;}catch{return null;}}
export async function fetchJSON(url,timeout=12000){
 const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),timeout);
 try{const response=await fetch(url,{signal:controller.signal,credentials:'omit',referrerPolicy:'no-referrer'});if(!response.ok)throw Error('HTTP '+response.status);return await response.json();}finally{clearTimeout(timer);}
}
export function readCache(key){try{return JSON.parse(localStorage.getItem(key)||'null');}catch{return null;}}
export function writeCache(key,value){try{localStorage.setItem(key,JSON.stringify(value));}catch{}}
export async function loadOrbits(){
 const key='skm-public-orbits-v1',cached=readCache(key),now=Date.now();
 if(cached&&now-cached.at<ORBIT_TTL&&orbitRecords(cached.rows,now).length)return {...cached,offline:false};
 try{
  const rows=await fetchJSON('https://celestrak.org/NORAD/elements/gp.php?GROUP=stations&FORMAT=json');
  if(!orbitRecords(rows,now).length)throw Error('No current orbital data');
  const value={rows,at:now};writeCache(key,value);return {...value,offline:false};
 }catch(error){if(cached&&orbitRecords(cached.rows,now).length)return {...cached,offline:true};throw error;}
}
let radioServer='';
async function radioServers(){
 const key='skm-radio-servers-v1',cached=readCache(key);
 let names=cached&&Date.now()-cached.at<86400000?cached.names:null;
 if(!names){try{
  const rows=await fetchJSON('https://all.api.radio-browser.info/json/servers');
  names=rows.map(row=>row.name).filter(name=>/^[a-z0-9-]+\.api\.radio-browser\.info$/.test(name));
  if(names.length)writeCache(key,{at:Date.now(),names});
 }catch{names=['de1.api.radio-browser.info','de2.api.radio-browser.info'];}}
 return [...new Set([radioServer,...(names||[])].filter(Boolean))].sort(()=>Math.random()-.5);
}
export function radioCountries(rows){
 if(!Array.isArray(rows))return [];
 const found=new Map();
 for(const row of rows){
  const code=String(row?.name||'').toUpperCase(),count=Number(row?.stationcount);
  if(!/^[A-Z]{2}$/.test(code)||!Number.isSafeInteger(count)||count<1)continue;
  found.set(code,{code,count});
 }
 return [...found.values()].sort((a,b)=>a.code.localeCompare(b.code));
}
export function searchRadioCountries(rows,locale='en',query=''){
 let names;try{names=new Intl.DisplayNames([locale],{type:'region'});}catch{names=new Intl.DisplayNames(['en'],{type:'region'});}
 const english=new Intl.DisplayNames(['en'],{type:'region'});
 const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase().trim();
 const q=normalize(query);
 return rows.map(row=>({...row,label:names.of(row.code)||row.code})).filter(row=>normalize(row.label+' '+english.of(row.code)+' '+row.code).includes(q)).sort((a,b)=>a.label.localeCompare(b.label));
}
let countriesRequest;
export function loadRadioCountries(){
 if(countriesRequest)return countriesRequest;
 countriesRequest=(async()=>{
  const key='skm-radio-countries-v1',cached=readCache(key),now=Date.now();
  const cachedRows=radioCountries(cached?.rows);
  if(cachedRows.length&&now-cached.at<86400000)return cachedRows;
  for(const host of await radioServers()){
   try{
    const rows=await fetchJSON('https://'+host+'/json/countrycodes?hidebroken=true');
    const countries=radioCountries(rows);if(!countries.length)continue;
    radioServer=host;writeCache(key,{at:now,rows});return countries;
   }catch{}
  }
  if(cachedRows.length&&now-cached.at<7*86400000)return cachedRows;
  throw Error('Radio countries unavailable');
 })().finally(()=>{countriesRequest=null;});
 return countriesRequest;
}
// Only directly playable secure streams; the directory does not confer broadcasting rights.
export function radioStations(rows,country){
 if(!Array.isArray(rows))return [];
 const seen=new Set();return rows.flatMap(row=>{
  if(!row||typeof row!=='object')return [];
  const stream=secureURL(row.url_resolved||row.url),homepage=secureURL(row.homepage);
  const name=String(row.name||'').trim().slice(0,90),codec=String(row.codec||'').toUpperCase();
  if(!stream||!name||typeof row.stationuuid!=='string'||seen.has(name.toLowerCase()))return [];
  // SomaFM requires written permission for embedding in third-party applications.
  if(/somafm/i.test(name+' '+stream+' '+homepage))return [];
  if(!['MP3','AAC','AAC+'].includes(codec)&&!row.hls)return [];
  if(/\.(pls|m3u)$/i.test(new URL(stream).pathname)&&!row.hls)return [];
  if(row.lastcheckok===0)return [];
  seen.add(name.toLowerCase());
  return [{id:row.stationuuid,name,stream,homepage,country:country||String(row.countrycode||'').toUpperCase(),codec,hls:!!row.hls}];
 }).slice(0,20);
}
export async function loadRadio(country){
 if(!/^[A-Z]{2}$/.test(country))throw Error('Invalid country');
 const key='skm-radio-streams-v2-'+country,cached=readCache(key);
 if(cached&&Date.now()-cached.at<21600000&&Array.isArray(cached.rows))return cached.rows;
 for(const host of await radioServers()){
  try{
   const rows=await fetchJSON('https://'+host+'/json/stations/search?'+new URLSearchParams({countrycode:country,hidebroken:'true',limit:'60',order:'clickcount',reverse:'true',is_https:'true'}));
   if(!Array.isArray(rows))continue;
   radioServer=host;
   const safe=radioStations(rows,country);
   writeCache(key,{at:Date.now(),rows:safe});return safe;
  }catch{}
 }
 if(cached&&Date.now()-cached.at<86400000&&Array.isArray(cached.rows))return cached.rows;
 throw Error('Radio directory unavailable');
}
export function orbitTrack(item,at=Date.now()){
 const points=[];
 for(let i=0;i<=90;i++){const p=orbitPosition(item,new Date(at+i*60000));points.push(p);}
 return points;
}
export function countRadioClick(id){if(radioServer&&/^[a-f0-9-]{36}$/.test(id))void fetchJSON('https://'+radioServer+'/json/url/'+id,5000).catch(()=>{});}

// Prefetch a small, worldwide pool. This loads metadata only, never starts audio.
let randomRadioRequest;
export function loadRandomRadioStations(){
 if(randomRadioRequest)return randomRadioRequest;
 randomRadioRequest=(async()=>{
  const key='skm-radio-random-v1',cached=readCache(key),now=Date.now();
  const safeCached=radioStations(cached?.rows);
  if(safeCached.length&&now-cached.at<3600000)return safeCached;
  for(const host of (await radioServers()).slice(0,2)){
   try{
    const rows=await fetchJSON('https://'+host+'/json/stations/search?'+new URLSearchParams({hidebroken:'true',limit:'100',order:'random',is_https:'true'}),7000);
    const safe=radioStations(rows);if(!safe.length)continue;
    radioServer=host;writeCache(key,{at:now,rows});return safe;
   }catch{}
  }
  if(safeCached.length&&now-cached.at<86400000)return safeCached;
  throw Error('Radio directory unavailable');
 })().finally(()=>{randomRadioRequest=null;});
 return randomRadioRequest;
}
