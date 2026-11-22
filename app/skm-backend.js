/* SKM public configuration. Never put a secret/service_role key in this file. */
window.SKM_BOOKING = {
  verifiedSignInOnly: true,
  habitatLive: false,
  requestCancellationLive: false,
  url: 'https://qltzjfzpucyophocyesk.supabase.co',
  key: 'sb_publishable_ih7uTrwXdzkQA6IbrEzLIg_Fo9WJTC4'
};
(function () {
  'use strict';
  // Embedded pages share the parent's refresh operation and session.
  try { if (window.parent !== window && window.parent.SKMBooking?.version===1) { window.SKMBooking=window.parent.SKMBooking; return; } } catch (_) {}
  const C=window.SKM_BOOKING, base=String(C.url||'').replace(/\/+$/,''), key=C.key||'';
  const LS='skm-customer-session-v1', PKCE='skm-pkce-v1';
  const fail=(message,status)=>Object.assign(new Error(message),{status});
  let refreshing=null,verifiedToken=null;
  function session(){try{return JSON.parse(localStorage.getItem(LS)||'null');}catch(_){return null;}}
  function keep(value){
    const previous=session()?.user?.id;
    if(value)localStorage.setItem(LS,JSON.stringify(value));else localStorage.removeItem(LS);
    if(previous!==value?.user?.id&&typeof window.dispatchEvent==='function')window.dispatchEvent(new Event('skm-account-changed'));
  }
  function save(d){
    if(!d.access_token||!d.refresh_token||!d.user?.id)throw fail('invalid session',401);
    keep({access_token:d.access_token,refresh_token:d.refresh_token,expires_at:Date.now()+(d.expires_in||3600)*1000,user:d.user,email:d.user.email||''});
  }
  async function http(path,{method='GET',body,token,headers={},binary=false}={}){
    if(!base||!key)throw fail('server not configured',503);
    const h={apikey:key,...headers};
    if(token)h.Authorization='Bearer '+token;
    if(body!==undefined&&!binary)h['Content-Type']='application/json';
    const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),30000);
    try{
      const r=await fetch(base+path,{method,headers:h,body:body===undefined?undefined:binary?body:JSON.stringify(body),signal:controller.signal});
      const txt=await r.text();let data;try{data=txt?JSON.parse(txt):null;}catch(_){data=txt;}
      if(!r.ok)throw fail(data?.msg||data?.message||data?.error_description||data?.error||'HTTP '+r.status,r.status);
      return data;
    }finally{clearTimeout(timer);}
  }
  async function refresh(){
    const s=session();if(!s)throw fail('login',401);
    if(Date.now()<s.expires_at-60000)return s.access_token;
    try{
      const d=await http('/auth/v1/token?grant_type=refresh_token',{method:'POST',body:{refresh_token:s.refresh_token}});
      // A sign-out or account change during the request must not restore the old account.
      if(session()?.refresh_token!==s.refresh_token)throw fail('session changed',401);
      save(d);return d.access_token;
    }catch(e){
      if([400,401,403].includes(e.status)&&session()?.refresh_token===s.refresh_token)keep(null);
      throw e;
    }
  }
  async function token(){
    if(!refreshing){
      const run=()=>refresh();
      refreshing=(window.navigator?.locks?window.navigator.locks.request('skm-auth-refresh',run):run()).finally(()=>{refreshing=null;});
    }
    return refreshing;
  }
  async function authenticated(path,opt={}){
    const used=await token();
    if(C.verifiedSignInOnly&&path!=='/rest/v1/rpc/skm_verified_app_user'&&path!=='/auth/v1/user'&&verifiedToken!==used){
      const verified=await http('/rest/v1/rpc/skm_verified_app_user',{method:'POST',body:{},token:used});
      if(verified!==true)throw fail('Google or Apple sign-in required',403);
      verifiedToken=used;
    }
    try{return await http(path,{...opt,token:used});}
    catch(e){
      if(e.status!==401)throw e;
      const s=session();if(!s)throw e;
      if(s.access_token===used){s.expires_at=0;keep(s);}
      return http(path,{...opt,token:await token()});
    }
  }
  async function exchange(code,verifier){save(await http('/auth/v1/token?grant_type=pkce',{method:'POST',body:{auth_code:code,code_verifier:verifier}}));}
  const b64=bytes=>btoa(String.fromCharCode(...bytes)).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
  async function signInGoogle(next='account'){
    if(!['account','bodymap','admin','home'].includes(next))next='account';
    if(window.webkit?.messageHandlers?.skmAuth){
      const d=await window.webkit.messageHandlers.skmAuth.postMessage({action:'google'});
      if(!d?.code||!d.verifier)throw fail('login cancelled',401);
      await exchange(d.code,d.verifier);return true;
    }
    if(location.protocol!=='https:'&&!['127.0.0.1','localhost'].includes(location.hostname))throw Error('Secure connection required');
    const verifier=b64(crypto.getRandomValues(new Uint8Array(32)));
    const challenge=b64(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(verifier))));
    sessionStorage.setItem(PKCE,JSON.stringify({verifier,next,created:Date.now()}));
    const callback=new URL('auth-callback.html',new URL('/app/',location.href)).href;
    const url=new URL(base+'/auth/v1/authorize');
    url.search=new URLSearchParams({provider:'google',redirect_to:callback,code_challenge:challenge,code_challenge_method:'s256',prompt:'select_account'});
    window.top.location.href=url.href;return false;
  }
  async function finishSignIn(){
    const params=new URLSearchParams(location.search);
    const raw=sessionStorage.getItem(PKCE);sessionStorage.removeItem(PKCE);
    history.replaceState({},'',location.pathname);
    if(params.has('error'))throw Error(params.get('error_description')||'Login cancelled');
    let pending;try{pending=JSON.parse(raw);}catch(_){}
    if(!pending||Date.now()-pending.created>10*60000||!params.get('code'))throw Error('Login expired. Please try again.');
    await exchange(params.get('code'),pending.verifier);
    return ['account','bodymap','admin','home'].includes(pending.next)?pending.next:'account';
  }
  async function signedImage(path,bucket='skm-designs'){
    if(!path)return null;
    const d=await authenticated('/storage/v1/object/sign/'+bucket+'/'+path.split('/').map(encodeURIComponent).join('/'),{method:'POST',body:{expiresIn:900}});
    const url=new URL(d.signedURL,base+'/storage/v1');
    // Supabase returns /object/sign/... relative to /storage/v1, not the project root.
    if(d.signedURL.startsWith('/object/'))return base+'/storage/v1'+d.signedURL;
    if(url.origin!==base)throw Error('Invalid image URL');return url.href;
  }
  async function hydrate(rows){return Promise.all(rows.map(async row=>{
    const next={...row};
    try{if(row.design_path)next.design_url=await signedImage(row.design_path);
      if(row.ref_paths?.length)next.ref_urls=await Promise.all(row.ref_paths.map(path=>signedImage(path)));
    }catch(_){next.image_error=true;}
    return next;
  }));}
  window.SKMBooking={
    version:1,ready:!!(base&&key),session,signInGoogle,finishSignIn,
    verifiedAppUser:()=>authenticated('/rest/v1/rpc/skm_verified_app_user',{method:'POST',body:{}}),
    notificationThread:id=>authenticated('/rest/v1/rpc/skm_notification_thread',{method:'POST',body:{p_thread:id}}),
    markContactRead:(id,message)=>authenticated('/rest/v1/rpc/skm_mark_contact_read',{method:'POST',body:{p_thread:id,p_message:message}}),
    notificationSettings:()=>authenticated('/rest/v1/rpc/skm_notification_settings',{method:'POST',body:{}}),
    notificationPreferences:enabled=>authenticated('/rest/v1/rpc/skm_notice_preferences',{method:'POST',body:{p_email:enabled}}),
    registerPush:p=>authenticated('/rest/v1/rpc/skm_register_push',{method:'POST',body:p}),
    unregisterPush:p=>authenticated('/rest/v1/rpc/skm_unregister_push',{method:'POST',body:p}),
    notificationBooking:id=>authenticated('/rest/v1/rpc/skm_notification_booking',{method:'POST',body:{p_booking:id}}),
    markBookingRead:(id,sequence)=>authenticated('/rest/v1/rpc/skm_mark_booking_read',{method:'POST',body:{p_booking:id,p_sequence:sequence}}),
    habitat:(action,p)=>authenticated('/rest/v1/rpc/skm_habitat',{method:'POST',body:{p_action:action,p}}),
    currentUser:()=>authenticated('/auth/v1/user'),
    async signIn(email,password){save(await http('/auth/v1/token?grant_type=password',{method:'POST',body:{email:String(email).trim().toLowerCase(),password}}));},
    outstandingDeletions:()=>authenticated('/rest/v1/skm_account_deletion_requests?select=user_id,requested_at,review_required&order=requested_at'),
    async appleAccessRevoked() {
      const providers=session()?.user?.app_metadata?.providers || [session()?.user?.app_metadata?.provider];
      if (providers.includes('apple')) { await this.signOut(); location.replace('/world.html'); }
    },
    async deleteOwnAccount(expectedId) {
      if (!expectedId || session()?.user?.id !== expectedId) throw fail('session changed', 401);
      const pinnedToken = await token();
      if (session()?.user?.id !== expectedId) throw fail('session changed', 401);
      const post = {method:'POST', token:pinnedToken, body:{p_confirmation:'DELETE_MY_ACCOUNT',p_expected_user:expectedId}};
      let previousFirst = '';
      while (true) {
        const result = await http('/rest/v1/rpc/skm_delete_my_account', post);
        if (result?.status === 'review') return 'review';
        if (result?.status === 'deleted') {
          if (session()?.user?.id === expectedId) keep(null);
          sessionStorage.removeItem('skm-pending-' + expectedId);
          localStorage.removeItem('skm-session-theme-v1:' + expectedId);
          const prefix = 'skm-chat-v1:' + expectedId + ':';
          for (let i = localStorage.length - 1; i >= 0; i--) {
            const key = localStorage.key(i);
            if (key?.startsWith(prefix)) localStorage.removeItem(key);
          }
          return 'deleted';
        }
        const paths = result?.paths;
        if (result?.status !== 'files' || !Array.isArray(paths) || !paths.length ||
            paths[0] === previousFirst || !paths.every(path => typeof path === 'string' && path.startsWith(expectedId + '/'))) {
          throw fail('cannot remove account files', 409);
        }
        previousFirst = paths[0];
        await http('/storage/v1/object/skm-designs', {method:'DELETE',token:pinnedToken,body:{prefixes:paths}});
      }
    },
    async signOut(){const s=session();try{await window.SKMNotifications?.disconnect();}catch(_){}keep(null);try{if(s)await http('/auth/v1/logout',{method:'POST',token:s.access_token});}catch(_){}},
    submit:p=>authenticated('/rest/v1/rpc/skm_submit_booking',{method:'POST',body:{p}}),
    mine:async()=>hydrate(await authenticated('/rest/v1/rpc/skm_my_bookings',{method:'POST',body:{}})),
    cancelMyBooking(id){return authenticated('/rest/v1/rpc/skm_cancel_my_booking',{method:'POST',body:{p_booking:id}});},
    myThreads:async()=>(await authenticated('/rest/v1/rpc/skm_my_bookings',{method:'POST',body:{}})).map(({id,code,status,created_at})=>({id,code,status,created_at})),
    dropLive:()=>http('/rest/v1/rpc/skm_drop_live',{method:'POST',body:{}}),
    async signInApple(){
      const result=await window.webkit.messageHandlers.skmAuth.postMessage({action:'apple'});
      if(!result?.id_token||!result.nonce)throw Error('Apple sign-in incomplete');
      save(await http('/auth/v1/token?grant_type=id_token',{method:'POST',body:{provider:'apple',id_token:result.id_token,nonce:result.nonce}}));return true;
    },
    desk:(action,p={})=>authenticated('/rest/v1/rpc/skm_desk',{method:'POST',body:{p_action:action,p}}),
    community:(action,p={})=>authenticated('/rest/v1/rpc/skm_community',{method:'POST',body:{p_action:action,p}}),
    communityVenues:city=>http('/rest/v1/rpc/skm_community',{method:'POST',body:{p_action:'venues',p:{city}}}),
    gloveList:()=>authenticated('/rest/v1/rpc/skm_glove_list',{method:'POST',body:{}}),
    gloveAdminList:()=>authenticated('/rest/v1/rpc/skm_glove_admin_list',{method:'POST',body:{}}),
    gloveSave:p=>authenticated('/rest/v1/rpc/skm_glove_save',{method:'POST',body:{p}}),
    gloveCreateCity:p=>authenticated('/rest/v1/rpc/skm_glove_create_city',{method:'POST',body:{p}}),
    gloveCityUpdate:(id,cover,note,lat,lon,publish)=>authenticated('/rest/v1/rpc/skm_glove_city_update',{method:'POST',body:{p_drop:id,p_cover:cover,p_note:note,p_lat:lat,p_lon:lon,p_publish:publish}}),
    gloveRequest:id=>authenticated('/rest/v1/rpc/skm_glove_request',{method:'POST',body:{p_drop:id}}),
    gloveShare:(id,reply,lat=null,lon=null)=>authenticated('/rest/v1/rpc/skm_glove_share',{method:'POST',body:{p_request:id,p_reply:reply,p_lat:lat,p_lon:lon}}),
    gloveCollect:id=>authenticated('/rest/v1/rpc/skm_glove_collect',{method:'POST',body:{p_request:id}}),
    gloveImage:path=>signedImage(path,'skm-drops'),
    async gloveUpload(file){
      const user=await authenticated('/auth/v1/user');
      if(!['image/png','image/jpeg','image/webp'].includes(file.type)||file.size>10*1024*1024)throw Error('invalid image');
      const ext=file.type==='image/png'?'png':file.type==='image/webp'?'webp':'jpg';
      const path=user.id+'/'+crypto.randomUUID()+'.'+ext;
      await authenticated('/storage/v1/object/skm-drops/'+path,{method:'POST',body:file,binary:true,headers:{'Content-Type':file.type,'x-upsert':'false'}});
      return path;
    },
    sessionPayment:id=>authenticated('/rest/v1/rpc/skm_session_payment',{method:'POST',body:{p_booking:id}}),
    studioQRImage:path=>signedImage(path,'skm-studio-payments'),
    saveStudioQR:(city,path)=>authenticated('/rest/v1/rpc/skm_save_studio_qr',{method:'POST',body:{p_city:city,p_path:path}}),
    async uploadStudioQR(file){
      const user=await authenticated('/auth/v1/user');
      if(!['image/png','image/jpeg','image/webp'].includes(file.type)||file.size>5*1024*1024)throw Error('invalid image');
      const ext=file.type==='image/png'?'png':file.type==='image/webp'?'webp':'jpg';
      const path=user.id+'/'+crypto.randomUUID()+'.'+ext;
      await authenticated('/storage/v1/object/skm-studio-payments/'+path,{method:'POST',body:file,binary:true,headers:{'Content-Type':file.type,'x-upsert':'false'}});
      return path;
    },
    sessionStudios:()=>authenticated('/rest/v1/rpc/skm_session_studios',{method:'POST',body:{}}),
    saveSessionStudio:(city,studio,address,message)=>authenticated('/rest/v1/rpc/skm_save_session_studio',{method:'POST',body:{p_city:city,p_studio:studio,p_address:address,p_message:message}}),
    isAdmin:()=>authenticated('/rest/v1/rpc/skm_is_admin',{method:'POST',body:{}}),
    paymentSettings:()=>authenticated('/rest/v1/rpc/skm_payment_settings',{method:'POST',body:{}}),
    savePaymentSettings:(url,auto)=>authenticated('/rest/v1/rpc/skm_save_payment_settings',{method:'POST',body:{p_url:url,p_auto:auto}}),
    messages:(id,{before=null,after=null}={})=>authenticated('/rest/v1/rpc/skm_booking_messages',{method:'POST',body:{p_booking:id,p_before:before,p_after:after}}),
    sendMessage:(id,request,body,admin=false)=>authenticated('/rest/v1/rpc/skm_send_message',{method:'POST',body:{p_booking:id,p_request:request,p_body:body,p_as_admin:admin}}),
    list:async()=>hydrate(await authenticated('/rest/v1/skm_bookings?select=*&order=created_at.desc&limit=1000')),
    update:(id,patch)=>authenticated('/rest/v1/skm_bookings?id=eq.'+encodeURIComponent(id),{method:'PATCH',body:patch,headers:{Prefer:'return=representation'}}).then(r=>r?.[0]),
    remove:id=>authenticated('/rest/v1/skm_bookings?id=eq.'+encodeURIComponent(id),{method:'DELETE'}),
    async upload(file){
      const user=await authenticated('/auth/v1/user');
      if(!['image/png','image/jpeg','image/webp'].includes(file.type)||file.size>10*1024*1024)throw Error('Invalid image');
      const ext=file.type==='image/png'?'png':file.type==='image/webp'?'webp':'jpg';
      const path=user.id+'/'+crypto.randomUUID()+'.'+ext;
      await authenticated('/storage/v1/object/skm-designs/'+path,{method:'POST',body:file,binary:true,headers:{'Content-Type':file.type,'x-upsert':'false'}});
      return path;
    }
  };
})();

(() => {
 if(!window.SKM_BOOKING.verifiedSignInOnly||/\/(login|auth-callback)\.html$/.test(location.pathname))return;
 const script=document.createElement('script');script.src=new URL('auth-gate.js',document.currentScript.src).href;document.head.append(script);
})();
