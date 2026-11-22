"use strict";
const {pickupLink}=require('./glove-slot-model.cjs');
const MINIMUM_USD_CENTS=1000;
// PayPal.Me supports amount + ISO currency in the path. The recipient is fixed.
// A link is a payment request, never a receipt or an ownership transfer.
function usdAmount(value){
 const raw=String(value??'').trim();
 if(!/^\d+(?:[.,]\d{1,2})?$/.test(raw))return null;
 const [whole,fraction='']=raw.replace(',','.').split('.');
 const cents=Number(whole)*100+Number(fraction.padEnd(2,'0'));
 if(!Number.isSafeInteger(cents)||cents<MINIMUM_USD_CENTS)return null;
 return Math.floor(cents/100)+'.'+String(cents%100).padStart(2,'0');
}
// Step in whole dollars while preserving typed cents and the minimum.
function stepUsdAmount(value,direction){
 const amount=usdAmount(value);
 if(!amount)return '10.00';
 if(direction!==1&&direction!==-1)return amount;
 const [whole,fraction]=amount.split('.');
 const cents=Number(whole)*100+Number(fraction);
 const next=Math.max(MINIMUM_USD_CENTS,cents+direction*100);
 return Number.isSafeInteger(next)?Math.floor(next/100)+'.'+String(next%100).padStart(2,'0'):amount;
}
function paypalURL(value){
 const amount=usdAmount(value);
 return amount?'https://paypal.me/Jinjinnoodle/'+amount+'USD':null;
}
function checkoutState({live=false,preview=false,userId,info}){
 if(!live)return 'held';
 if(preview)return 'preview';
 if(!userId)return 'login';
 if(!info)return 'held';
 const {drop,request}=info;
 if(['owned','sold','collected'].includes(drop?.status))return 'owner';
 // Only the selected recipient pays; pending applicants must not pay for the same pair.
 if(drop?.status==='reserved'&&request?.status==='shared'&&pickupLink(request,true))return 'pay';
 if(request?.status==='pending')return 'pending';
 if(request||drop?.status!=='open')return 'unavailable';
 return 'request';
}
module.exports={MINIMUM_USD_CENTS,usdAmount,stepUsdAmount,paypalURL,checkoutState};
