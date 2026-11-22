/* Retain exactly one immutable payload until the server acknowledges it.
 * This survives a lost response or reload without generating a duplicate booking.
 */
(function(root){
 root.SKMCreateSubmission=function(api,storage){
  const key=()=>{const id=api.session()?.user?.id;if(!id)throw Object.assign(Error('login'),{status:401});return 'skm-pending-'+id;};
  const pending=()=>{const raw=storage.getItem(key());return raw?JSON.parse(raw):null;};
  let busy=false;
  return {pending,async send(prepare){
   if(busy)throw Error('already sending');busy=true;
   try{
    let p=pending();
    if(!p){p=await prepare();p.request_id=crypto.randomUUID();storage.setItem(key(),JSON.stringify(p));}
    const code=await api.submit(p);
    if(typeof code!=='string'||!code)throw Error('invalid receipt');
    storage.removeItem(key());return code;
   }finally{busy=false;}
  }};
 };
})(typeof window==='undefined'?globalThis:window);
