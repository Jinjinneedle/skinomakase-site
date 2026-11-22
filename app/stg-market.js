import engine from './stg-preview-engine.cjs';
import {gloveDropPlan} from './glove-drop-plan.js';
const names={'STG-01':'서울','STG-02':'도쿄','STG-04':'홍콩','STG-05':'뉴욕','STG-06':'밴쿠버','STG-07':'몬트리올','STG-09':'로스앤젤레스'},roles={studio:'STUDIO',original:'최초 수령자',collector:'다음 보유자'},chapters={making:'제작',giving:'첫 픽업',wearing:'착용',moving:'다음 사람에게',music:'음악·공연'};
const plans=Object.values(gloveDropPlan).filter(plan=>plan.code).sort((a,b)=>a.code.localeCompare(b.code)),key='skm-stg-community-preview-v3',$=id=>document.getElementById(id),root=$('content');
let state=engine.blank(),tab='drop',actor='studio',collection=new URLSearchParams(location.search).get('collection')||'STG-01';
if(!names[collection])collection='STG-01';
try{
 const current=localStorage.getItem(key);
 const previous=current===null ? localStorage.getItem('skm-stg-community-preview-v2') : null;
 const saved=JSON.parse(current ?? previous ?? localStorage.getItem('skm-stg-community-preview-v1'));
 if(saved?.version===1&&['items','listings','threads','journal'].every(k=>Array.isArray(saved[k]))){
  if(current===null){
   for(const record of [...saved.items,...saved.journal]){
    if(record.collection==='STG-03')record.collection='osaka-pending';
    if(previous===null){
     if(record.collection==='STG-05')record.collection='toronto-pending';
     else if(record.collection==='STG-08')record.collection='STG-05';
    }
   }
  }
  state=saved;
 }
}catch{}
const el=(tag,text,cls)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=text;if(cls)e.className=cls;return e;};
const notice=text=>{$('notice').textContent=text;};
function run(action,p){try{const next=engine.apply(state,actor,action,p);localStorage.setItem(key,JSON.stringify(next));state=next;notice('체험 기록을 저장했어요. 실제 거래는 발생하지 않습니다.');render();return true;}catch(e){notice(e.message);return false;}}
function button(text,fn,primary=false){const b=el('button',text,'action'+(primary?' primary':''));b.type='button';b.onclick=fn;return b;}
function panel(title,parent=root){const p=el('section',undefined,'panel');if(title)p.append(el('h2',title));parent.append(p);return p;}
function form(parent,submit){const f=el('form');f.onsubmit=e=>{e.preventDefault();if(f.reportValidity())submit();};parent.append(f);return f;}
function field(parent,title,type='text'){const l=el('label',title),i=el(type==='textarea'?'textarea':'input');if(type!=='textarea')i.type=type;l.append(i);parent.append(l);return i;}
function select(parent,title,options){const l=el('label',title),s=el('select');for(const [value,label] of options){const o=el('option',label);o.value=value;s.append(o);}l.append(s);parent.append(l);return s;}
function check(parent,title){const l=el('label',undefined,'check'),i=el('input');i.type='checkbox';l.append(i,el('span',title));parent.append(l);return i;}
function submit(f,title){const b=el('button',title,'action primary');b.type='submit';f.append(b);}
const unit=currency=>['KRW','JPY'].includes(currency)?1:100;
const price=(n,c)=>n===null||n===undefined?'가격 협의':new Intl.NumberFormat('ko-KR',{style:'currency',currency:c}).format(n/unit(c));
function readMoney(input,currency,optional=false){if(optional&&input.value.trim()==='')return null;const value=input.value.trim(),places=unit(currency)===1?0:2;if(!new RegExp('^\\d+(?:\\.\\d{1,'+Math.max(1,places)+'})?$').test(value)||(!places&&value.includes('.')))throw new Error('금액과 통화의 소수 자릿수를 확인해주세요.');const n=Number(value)*unit(currency);if(!Number.isSafeInteger(Math.round(n))||Math.abs(n-Math.round(n))>.00001)throw new Error('금액을 확인해주세요.');return Math.round(n);}
const itemLabel=x=>x.collection+' / '+x.serial+' · 050';
const currentItems=()=>state.items.filter(x=>x.collection===collection);
function history(x,parent){const list=el('ol',undefined,'timeline');for(const e of x.history){const li=el('li');li.append(el('small',new Date(e.at).toLocaleString('ko-KR')),el('span',e.text));list.append(li);}parent.append(list);}
function detailHistory(x,parent){const d=el('details');d.append(el('summary','이 장갑의 전달·소유 기록'));history(x,d);parent.append(d);}
function drawDrop(){
 const plan=plans.find(p=>p.code===collection),p=panel(collection+' / '+names[collection]);p.append(el('span','50 PAIRS · CHOOSE YOUR PRICE','tag'),el('p',plan.window,'meta'));
 p.append(el('p','첫 픽업은 US$10 이상으로 직접 가격을 정해요. 드롭 장소에서만 수령할 수 있어요. 처음 받은 이후에는 누구나 판매·선물·경매로 다음 이야기를 이어갈 수 있어요.'));
 const phases=el('ol',undefined,'steps');for(const text of ['기존 세션 고객 확인·선정','최초 수령자 지정 가격과 촬영 동의 확인','쌍마다 고유 번호와 최초 전달 기록','착용·소유자 이동·음악·공연으로 이어가기'])phases.append(el('li',text));p.append(phases);
 if(collection==='STG-01')p.append(el('p','서울: 최초 수령자 50명에게 한 쌍씩 전달할 계획입니다.','meta'));
 if(['STG-02','STG-04'].includes(collection))p.append(el('p',collection==='STG-04'?'홍콩: 세션 고객 8~9명에게 5~6쌍씩. 받은 장갑은 각자의 소유이며 판매·선물이 자유롭습니다. 정확한 배분은 미정입니다.':'도쿄도 기존 세션 고객에게 첫 픽업으로 시작합니다. 1인 여러 쌍 전달이 가능하며 구체적인 배분은 준비 중입니다.','meta'));
 const d=panel('첫 픽업 체험');d.append(el('p','실제 장갑과 고객을 등록하지 않고, 가상의 전달 기록으로 다음 화면을 확인합니다. '+currentItems().length+' / 50쌍 체험 등록됨.','meta'));
 if(actor==='studio'){let count,verified;const f=form(d,()=>run('issue',{collection,count:Number(count.value),tattooConfirmed:verified.checked}));count=select(f,'한 번에 전달할 쌍 수',[['1','1쌍'],['5','5쌍'],['6','6쌍']]);if(['STG-02','STG-04'].includes(collection))count.value='5';verified=check(f,'이 체험에서 최초 수령자의 세션 고객 확인을 완료한 것으로 진행');verified.required=true;submit(f,'첫 픽업 체험');}
 else d.append(el('p','관리자 역할에서 전달 체험을 진행한 뒤, 최초 수령자의 MY STG에서 확인하세요.','meta'));
 const note=panel('소유 기록과 실물 확인');note.append(el('p','타투는 최초 수령자의 자격을 확인합니다. 실물 장갑은 개체 번호·최초 전달 자료·현재 보유자 기록을 함께 확인하는 구조로 준비합니다.','meta'),el('p','이 시안의 번호나 화면은 정품 인증서가 아닙니다. 실제 인증 태그·서버 검증은 연결 전입니다.','meta'));
}
function drawArchive(){
 const p=panel('THE STORY');p.append(el('p','배포 이전부터 기록합니다. 한 도시의 이야기와 한 쌍의 이동을 함께 남겨요.','meta'));
 const stages=el('div',undefined,'stages');for(const name of Object.values(chapters))stages.append(el('span',name));p.append(stages,el('div','FILM / PHOTO — PREPARING','film'));
 p.append(el('p','촬영 계획: 디자인·프린트 → 번호 부착 → 도시 이동 → 선정된 세션 고객에게 전달 → 착용 → 다음 보유자 → 공연.','meta'));
 if(actor==='studio'){let chapter,text,consent;const f=form(p,()=>run('journal',{collection,chapter:chapter.value,text:text.value,consent:consent.checked}));chapter=select(f,'기록 단계',Object.entries(chapters));text=field(f,'촬영 메모·게시물 문안 초안','textarea');text.required=true;text.maxLength=2000;consent=check(f,'공개할 인물·타투·촬영물의 공개 동의를 확인했음');submit(f,'기록 초안 저장');}
 for(const record of state.journal.filter(x=>x.collection===collection&&(actor==='studio'||x.consent))){const card=panel(chapters[record.chapter]);card.append(el('span',record.consent?'공개용 초안 · 아직 게시되지 않음':'비공개 촬영 메모','tag'),el('p',record.text));if(record.consent)card.append(button('문안 복사',async()=>{try{await navigator.clipboard.writeText('[STG 게시물 초안]\n'+collection+' / '+names[collection]+'\n'+record.text+'\n#SKINOMAKASE #STG');notice('초안을 복사했어요. 계정에 게시하지는 않았어요.');}catch{notice('복사를 지원하지 않는 화면이에요. 문안을 직접 선택해 복사할 수 있어요.');}}));}
 if(!state.journal.some(x=>x.collection===collection))root.append(el('p','아직 영상·사진이 없어요. 촬영 메모부터 기록할 수 있어요.','empty'));
 const c=panel('NEXT / LIVE');c.append(el('p','타투·STG·SKM 의류로 이어진 사람들이 함께 오는 공연.','serial'),el('p','보유자에게 공연 소식과 참여 안내를 연결할 예정입니다. 공연 날짜·입장 방식·혜택은 아직 정해지지 않았어요.','meta'));
}
function listingForm(x,parent){
 const d=el('details');d.append(el('summary','판매글 또는 경매 등록 체험'));parent.append(d);let kind,currency,value,increment,hours,delivery;
 const f=form(d,()=>{try{run('list',{itemId:x.id,kind:kind.value,currency:currency.value,price:readMoney(value,currency.value,kind.value==='sale'),increment:kind.value==='auction'?readMoney(increment,currency.value):null,hours:Number(hours.value),delivery:delivery.value});}catch(e){notice(e.message);}});
 kind=select(f,'등록 방식',[['sale','일반 판매'],['auction','경매']]);currency=select(f,'통화',[['KRW','KRW · 원'],['JPY','JPY · 엔'],['HKD','HKD'],['CAD','CAD'],['USD','USD']]);value=field(f,'판매가 / 경매 시작가');value.inputMode='decimal';value.placeholder='일반 판매는 비우면 가격 협의';
 increment=field(f,'최소 입찰 단위 · 경매만');increment.inputMode='decimal';hours=select(f,'경매 시간 · 체험 기본 옵션',[['24','24시간'],['48','48시간'],['72','72시간']]);delivery=select(f,'전달 방식',[['both','직거래 또는 택배'],['meet','직거래'],['ship','택배']]);submit(f,'등록 체험');
}
function drawVault(){
 const mine=currentItems().filter(x=>x.owner===actor);panel('MY STG');if(actor==='studio')root.append(el('p','최초 수령자 또는 다음 보유자 역할로 바꿔 보관함을 확인하세요.','empty'));
 if(!mine.length&&actor!=='studio')root.append(el('p','아직 이 역할이 보유한 장갑이 없어요. 첫 픽업 또는 거래 수령 체험을 완료하면 나타납니다.','empty'));
 for(const x of mine){const p=panel(itemLabel(x));p.append(el('span','체험용 보유 기록 · 실물 인증 전','tag'));detailHistory(x,p);const active=state.listings.find(l=>l.itemId===x.id&&['open','reserved'].includes(l.status));if(!active){listingForm(x,p);p.append(button('다음 사람에게 선물 체험',()=>run('gift',{itemId:x.id})));}else p.append(el('p',active.status==='open'?'EXCHANGE에 등록되어 있어요.':'전달·수령 확인을 기다리고 있어요.','meta'));}
 const pending=state.listings.filter(l=>l.buyer===actor&&l.status==='reserved'&&state.items.some(x=>x.id===l.itemId&&x.collection===collection));for(const l of pending)drawListing(l);
}
function drawThread(t,parent){
 if(![t.seller,t.buyer].includes(actor))return;const d=el('details');d.open=true;d.append(el('summary','거래 대화 · '+roles[t.buyer]));parent.append(d);
 for(const m of t.messages){const p=el('div',undefined,'message');p.append(el('small',roles[m.actor]),el('span',m.text));d.append(p);}let text;const f=form(d,()=>run('message',{threadId:t.id,text:text.value}));text=field(f,'메시지','textarea');text.required=true;text.maxLength=1000;submit(f,'보내기 · 체험');
 const l=state.listings.find(x=>x.id===t.listingId);if(l?.seller===actor&&l.kind==='sale'&&l.status==='open')d.append(button('이 상대와 거래 진행 체험',()=>run('reserve',{listingId:l.id,buyer:t.buyer}),true));
}
function drawListing(l){
 const x=state.items.find(x=>x.id===l.itemId);if(!x||x.collection!==collection)return;const p=panel(itemLabel(x)),labels={open:'진행 중',reserved:'전달·수령 대기',complete:'양쪽 완료 확인',expired:'입찰 없이 마감'};p.append(el('span',(l.kind==='auction'?'AUCTION':l.kind==='gift'?'GIFT':'SALE')+' / '+labels[l.status],'tag'));
 if(l.kind!=='gift')p.append(el('p',price(l.kind==='auction'?l.highBid??l.price:l.price,l.currency),'price'));
 p.append(el('p','보유자: '+roles[l.seller]+' · '+(l.kind==='gift'?'무료 선물':({meet:'직거래',ship:'택배',both:'직거래·택배'}[l.delivery])),'meta'));
 if(l.kind==='auction'){p.append(el('p','마감: '+new Date(l.endsAt).toLocaleString('ko-KR')+' · '+(l.bidder?'입찰자: '+roles[l.bidder]:'아직 입찰 없음'),'meta'));if(l.status==='open'&&actor!==l.seller&&actor!=='studio'){let value;const f=form(p,()=>{try{run('bid',{listingId:l.id,value:readMoney(value,l.currency)});}catch(e){notice(e.message);}});value=field(f,'입찰 금액 · 최소 '+price(l.highBid===null?l.price:l.highBid+l.increment,l.currency));value.inputMode='decimal';value.required=true;submit(f,'입찰 체험');}if(actor==='studio'&&l.status==='open')p.append(button('지금 마감해 보기 · 체험',()=>run('finishAuction',{listingId:l.id})));}
 if(l.kind!=='gift'&&['open','reserved'].includes(l.status)&&actor!=='studio'&&actor!==l.seller&&(!l.buyer||l.buyer===actor)&&!state.threads.some(t=>t.listingId===l.id&&t.buyer===actor))p.append(button('판매자와 대화 체험',()=>run('contact',{listingId:l.id})));
 if(l.status==='reserved'){p.append(el('p','결제는 당사자끼리 진행합니다. 앱은 결제 성공을 확인하거나 보증하지 않습니다.','meta'));if(actor===l.seller&&!l.delivered)p.append(button('전달 완료 체험',()=>run('deliver',{listingId:l.id}),true));if(actor===l.buyer){const b=button(l.delivered?'수령 확인 · 내 보관함으로 이전 체험':'판매자의 전달 확인 대기',()=>run('receive',{listingId:l.id}),true);b.disabled=!l.delivered;p.append(b);}}
 if(l.status==='complete')p.append(el('p','체험용 소유 기록이 다음 사람에게 이전됐어요. 실제 결제 확인 기록은 아닙니다.','meta'));
 detailHistory(x,p);for(const t of state.threads.filter(t=>t.listingId===l.id))drawThread(t,p);
}
function drawExchange(){const p=panel('EXCHANGE');p.append(el('p','최초 수령자 이후에는 타투가 없어도 참여할 수 있어요. 공식 판매가는 없고 보유자가 판매가·경매 시작가를 정합니다.','meta'));const rows=state.listings.filter(l=>currentItems().some(x=>x.id===l.itemId));if(!rows.length)root.append(el('p','아직 체험 판매글이 없어요. 첫 픽업 후, 최초 수령자의 MY STG에서 등록해보세요.','empty'));rows.slice().reverse().forEach(drawListing);}
function render(){root.replaceChildren();document.querySelectorAll('nav button').forEach(b=>b.setAttribute('aria-current',String(b.dataset.tab===tab)));({drop:drawDrop,archive:drawArchive,exchange:drawExchange,vault:drawVault}[tab])();}
for(const plan of plans){const o=el('option',plan.code+' · '+names[plan.code]);o.value=plan.code;$('collection').append(o);}$('collection').value=collection;
$('collection').onchange=()=>{collection=$('collection').value;notice('');render();};$('actor').onchange=()=>{actor=$('actor').value;notice('');render();};document.querySelectorAll('nav button').forEach(b=>b.onclick=()=>{tab=b.dataset.tab;state=engine.apply(state,actor,'tick');localStorage.setItem(key,JSON.stringify(state));notice('');render();});render();
