'use strict';
// Local interaction model only. It is NOT an authentication or payment service.
const blank=()=>({version:1,next:1,items:[],listings:[],threads:[],journal:[]});
const requireThat=(ok,message)=>{if(!ok)throw new Error(message);};
const amount=n=>Number.isSafeInteger(n)&&n>0&&n<=1000000000;
function apply(input,actor,action,p={},now=Date.now()){
 const s=JSON.parse(JSON.stringify(input)),id=()=>String(s.next++),item=()=>s.items.find(x=>x.id===p.itemId),listing=()=>s.listings.find(x=>x.id===p.listingId);
 const record=(x,kind,text)=>x.history.push({kind,text,at:now});
 const expire=l=>{if(l&&l.kind==='auction'&&l.status==='open'&&l.endsAt<=now){l.status=l.bidder?'reserved':'expired';l.buyer=l.bidder||null;}};
 s.listings.forEach(expire);
 if(action==='issue'){
  requireThat(actor==='studio','관리자 체험 화면에서 배포할 수 있어요.');requireThat(p.tattooConfirmed===true,'최초 수령자의 세션 고객 확인이 필요해요.');
  requireThat(/^STG-0[1-9]$/.test(p.collection),'컬렉션을 확인해주세요.');requireThat(Number.isInteger(p.count)&&p.count>=1&&p.count<=6,'한 번에 1~6쌍을 선택해주세요.');
  const used=s.items.filter(x=>x.collection===p.collection).length;requireThat(used+p.count<=50,'이 컬렉션의 50쌍을 넘길 수 없어요.');
  for(let n=0;n<p.count;n++){const x={id:id(),collection:p.collection,serial:String(used+n+1).padStart(3,'0'),owner:'original',history:[]};record(x,'gift','STUDIO → 최초 수령자 · 세션 고객 확인 후 첫 픽업 (체험)');s.items.push(x);}
 }else if(action==='list'){
  const x=item();requireThat(x&&x.owner===actor,'현재 보유자만 등록할 수 있어요.');requireThat(!s.listings.some(l=>l.itemId===x.id&&['open','reserved'].includes(l.status)),'이미 거래 중인 장갑이에요.');
  requireThat(['sale','auction'].includes(p.kind),'거래 방식을 확인해주세요.');requireThat(['KRW','JPY','HKD','CAD','USD'].includes(p.currency),'통화를 확인해주세요.');
  requireThat(p.price===null&&p.kind==='sale'||amount(p.price),'판매가 또는 시작가를 확인해주세요.');
  if(p.kind==='auction'){requireThat(amount(p.increment),'최소 입찰 단위를 입력해주세요.');requireThat([24,48,72].includes(p.hours),'경매 기간을 선택해주세요.');}
  requireThat(['meet','ship','both'].includes(p.delivery),'거래 방식을 선택해주세요.');
  s.listings.push({id:id(),itemId:x.id,seller:actor,kind:p.kind,currency:p.currency,price:p.price,increment:p.increment||null,endsAt:p.kind==='auction'?now+p.hours*3600000:null,delivery:p.delivery,status:'open',bidder:null,highBid:null,buyer:null,delivered:false});record(x,'listed',p.kind==='auction'?'보유자가 경매 등록 (체험)':'보유자가 판매글 등록 (체험)');
 }else if(action==='bid'){
  const l=listing();requireThat(l&&l.kind==='auction'&&l.status==='open','진행 중인 경매가 아니에요.');requireThat(actor!=='studio'&&actor!==l.seller,'본인 경매에는 입찰할 수 없어요.');
  const minimum=l.highBid===null?l.price:l.highBid+l.increment;requireThat(amount(p.value)&&p.value>=minimum,'현재 최소 입찰가 이상으로 입력해주세요.');l.highBid=p.value;l.bidder=actor;
 }else if(action==='finishAuction'){
  const l=listing();requireThat(actor==='studio'&&l&&l.kind==='auction'&&l.status==='open','관리자 화면에서 경매 마감 체험을 할 수 있어요.');l.endsAt=now;expire(l);
 }else if(action==='contact'){
  const l=listing();requireThat(l&&['open','reserved'].includes(l.status)&&actor!=='studio'&&actor!==l.seller,'구매자 화면에서 대화를 시작해주세요.');requireThat(l.status!=='reserved'||l.buyer===actor,'이미 다른 사람과 거래 중이에요.');
  if(!s.threads.some(t=>t.listingId===l.id&&t.buyer===actor))s.threads.push({id:id(),listingId:l.id,seller:l.seller,buyer:actor,messages:[]});
 }else if(action==='message'){
  const t=s.threads.find(t=>t.id===p.threadId);requireThat(t&&[t.seller,t.buyer].includes(actor),'이 대화의 참여자만 메시지를 보낼 수 있어요.');const text=String(p.text||'').trim();requireThat(text.length>0&&text.length<=1000,'메시지는 1~1000자로 입력해주세요.');t.messages.push({actor,text,at:now});
 }else if(action==='reserve'){
  const l=listing();requireThat(l&&l.kind==='sale'&&l.status==='open'&&l.seller===actor,'판매자만 거래 상대를 확정할 수 있어요.');requireThat(s.threads.some(t=>t.listingId===l.id&&t.buyer===p.buyer),'대화를 시작한 상대를 선택해주세요.');l.buyer=p.buyer;l.status='reserved';
 }else if(action==='gift'){
  const x=item();requireThat(x&&x.owner===actor&&actor!=='studio','현재 보유자만 선물할 수 있어요.');requireThat(!s.listings.some(l=>l.itemId===x.id&&['open','reserved'].includes(l.status)),'거래 중인 장갑은 선물할 수 없어요.');
  const buyer=actor==='original'?'collector':'original';s.listings.push({id:id(),itemId:x.id,seller:actor,kind:'gift',status:'reserved',buyer,delivered:false});
 }else if(action==='deliver'){
  const l=listing();requireThat(l&&l.status==='reserved'&&l.seller===actor,'거래 중인 보유자만 전달을 확인할 수 있어요.');l.delivered=true;
 }else if(action==='receive'){
  const l=listing();requireThat(l&&l.status==='reserved'&&l.delivered&&l.buyer===actor,'판매자 전달 확인 후 수령자가 확인할 수 있어요.');const x=s.items.find(x=>x.id===l.itemId);requireThat(x.owner===l.seller,'현재 소유자가 일치하지 않아요.');x.owner=actor;l.status='complete';record(x,'transfer',(l.kind==='gift'?'선물':'거래')+' · 양쪽 전달·수령 확인, 다음 보유자에게 이전 (체험)');
 }else if(action==='journal'){
  requireThat(actor==='studio','관리자 체험 화면에서 기록 초안을 남길 수 있어요.');const text=String(p.text||'').trim();requireThat(text.length>0&&text.length<=2000,'기록을 1~2000자로 입력해주세요.');requireThat(['making','giving','wearing','moving','music'].includes(p.chapter),'기록 단계를 선택해주세요.');
  s.journal.push({id:id(),collection:p.collection,chapter:p.chapter,text,consent:p.consent===true,at:now});
 }else if(action!=='tick')throw new Error('지원하지 않는 동작이에요.');
 return s;
}
module.exports={blank,apply};
