(() => {
'use strict';
const api=window.SKMBooking,isEntry=location.pathname.endsWith('/entry.html');
const base=new URL('.',document.currentScript.src),style=document.createElement('style');style.textContent='html.skm-auth-pending body{visibility:hidden}';document.head.append(style);document.documentElement.classList.add('skm-auth-pending');
let checking=false;
async function check(){
 if(checking)return;checking=true;
 const user=api.session()?.user?.id;
 if(!user){location.replace(new URL('login.html?next='+(/\/admin\.html$/.test(location.pathname)?'admin':/\/(account|notification|community)\.html$/.test(location.pathname)?'account':'home')+'',base));return;}
 try{
  const allowed=await api.verifiedAppUser();if(api.session()?.user?.id!==user){checking=false;check();return;}
  if(!allowed){location.replace(new URL('login.html?next='+(/\/admin\.html$/.test(location.pathname)?'admin':/\/(account|notification|community)\.html$/.test(location.pathname)?'account':'home')+'',base));return;}
  if(isEntry){location.replace(new URL('../world.html'+location.hash,base));return;}
  document.documentElement.classList.remove('skm-auth-pending');
 }catch{
  if(!api.session()?.user?.id){location.replace(new URL('login.html?next='+(/\/admin\.html$/.test(location.pathname)?'admin':/\/(account|notification|community)\.html$/.test(location.pathname)?'account':'home')+'',base));return;}
  // Do not erase a session or stored drafts on a temporary network failure.
  const host=document.createElement('div');host.style.cssText='position:fixed;z-index:2147483647;inset:0;background:#f3f3f3;color:#111;display:grid;align-content:center;justify-items:center;gap:16px;padding:24px;font:16px -apple-system,sans-serif;visibility:visible';
  const text=document.createElement('p');text.textContent=String(window.SKMLanguage?.locale||'').startsWith('ko')?'로그인 확인을 위해 인터넷에 연결해 주세요.':'Connect to the internet to verify your sign-in.';
  const retry=document.createElement('button');retry.textContent=String(window.SKMLanguage?.locale||'').startsWith('ko')?'다시 시도':'Try again';retry.onclick=()=>{host.remove();checking=false;check();};host.append(text,retry);document.body.append(host);
 }finally{checking=false;}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',check,{once:true});else check();
window.addEventListener('skm-account-changed',()=>{document.documentElement.classList.add('skm-auth-pending');check();});
})();
