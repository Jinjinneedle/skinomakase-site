'use strict';
// Routing consumes only the selected viewer's authorized pickup response.
function routeGlove({status,ownerId,viewerId,request,preview=false}){
 if(status==='owned'||status==='sold'||status==='collected')return {view:ownerId&&ownerId===viewerId?'mine':'chat',label:ownerId&&ownerId===viewerId?'내 장갑':'주인 있음'};
 if(status==='reserved'&&!['shared','collected'].includes(request?.status))return {view:'unavailable',label:'예약 중'};
 if(status==='open'||status==='available'||request?.status==='shared')return {view:'pickup',label:'드롭 가능',canViewLocation:preview||request?.status==='shared'};
 return {view:'unavailable',label:status==='closed'?'드롭 종료':'준비 중'};
}
function pickupLink(request,authorized){
 if(!authorized||request?.latitude==null||request?.longitude==null)return null;
 const numeric=v=>typeof v==='number'||(typeof v==='string'&&v.trim()!==''&&Number.isFinite(Number(v)));
 if(!numeric(request.latitude)||!numeric(request.longitude))return null;
 const lat=Number(request.latitude),lon=Number(request.longitude);
 if(!Number.isFinite(lat)||!Number.isFinite(lon)||Math.abs(lat)>90||Math.abs(lon)>180)return null;
 return 'https://maps.apple.com/?daddr='+encodeURIComponent(lat+','+lon)+'&dirflg=w';
}
function previewSlot(number){return number===1?'available':number===2?'owned':number===3?'reserved':'draft';}
// Resolve the city's public row first. Personal details come only from the matching
// request in skm_glove_list, which filters by auth.uid() on the server.
function pickupForPair(result,city,number){
 const normalize=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().toLowerCase();
 const names=[city.ko,city.label,city.ascii,city.name].filter(Boolean).map(normalize);
 const rows=(result?.drops||[]).filter(d=>names.includes(normalize(d.area))&&Number(d.number)===number);
 if(rows.length!==1)return null;
 const drop=rows[0],matches=(result.requests||[]).filter(r=>r.drop_id===drop.id);
 if(matches.length>1)return null;
 const r=matches[0];
 return {drop:{id:drop.id,status:drop.status},request:!r?null:
  ['shared','collected'].includes(r.status)?r:{id:r.id,status:r.status}};
}
module.exports={routeGlove,pickupLink,previewSlot,pickupForPair};
