/* Theme preference is account-scoped; only server bookings or an acknowledged submit activate it. */
(function(root){
root.SKMCreateThemeState=({storage,session,threads,changed=()=>{}})=>{
 let userId='',rejectedId='',eligible=false,dark=false,rows=[],epoch=0;
 const key=id=>'skm-session-theme-v1:'+id;
 const saved=id=>{try{return JSON.parse(storage.getItem(key(id))||'null');}catch(_){return null;}};
 function emit(persist=true){if(persist&&userId)try{storage.setItem(key(userId),JSON.stringify({eligible,dark}));}catch(_){}changed({eligible,dark,userId});}
 function sync(){const id=session()?.user?.id||'';if(id!==userId){userId=id;const pref=id&&id!==rejectedId?saved(id):null;eligible=!!pref?.eligible;dark=eligible&&!!pref?.dark;rows=[];emit(false);}return id;}
 async function refresh(){const id=sync(),ticket=++epoch;if(!id){eligible=dark=false;rows=[];emit(false);return;}
  try{const result=await threads();if(ticket!==epoch||session()?.user?.id!==id)return;
   rejectedId='';rows=result;eligible=rows.length>0;const pref=saved(id);dark=eligible&&(pref?.eligible?!!pref.dark:true);emit();
  }catch(e){if(ticket===epoch&&(!session()?.user?.id||e.status===401)){rejectedId=id;userId='';eligible=dark=false;rows=[];emit(false);}throw e;}
 }
 function setDark(value){sync();dark=eligible&&!!value;emit();}
 function booked(){const id=sync();if(!id)return;epoch++;rejectedId='';eligible=true;dark=true;emit();}
 sync();
 return {refresh,setDark,booked,get eligible(){sync();return eligible;},get dark(){sync();return dark;},get rows(){return rows.slice();}};
};
})(typeof window==='undefined'?globalThis:window);
