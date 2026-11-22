export function createAdminAccess(api, onChange, onState=()=>{}) {
 let generation=0;
 const hide=()=>{++generation;onChange(false);onState('hidden');};
 const check=async()=>{
  const run=++generation, user=api.session()?.user?.id;
  onChange(false);
  if(!user){onState('signedout');return false;}
  onState('checking');
  let allowed=false,failed=false;
  try{allowed=await api.isAdmin()===true;}catch{failed=true;}
  if(run!==generation||api.session()?.user?.id!==user)return false;
  onChange(allowed);onState(allowed?'allowed':failed?'error':'denied');return allowed;
 };
 hide();return {check,hide};
}
