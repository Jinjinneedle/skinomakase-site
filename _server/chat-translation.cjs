const SUPABASE='https://qltzjfzpucyophocyesk.supabase.co';
const PUBLIC_KEY='sb_publishable_ih7uTrwXdzkQA6IbrEzLIg_Fo9WJTC4';
const targets={ko:'KO',en:'EN-US',ja:'JA',zh:'ZH-HANS','zh-Hant':'ZH-HANT',ru:'RU',fr:'FR',es:'ES',de:'DE',pt:'PT-BR',it:'IT'};
const uuid=/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i;
const fail=(status,error)=>Object.assign(new Error(error),{status});
async function translate({authorization,body,key,fetcher=fetch}){
 if(!key)throw fail(503,'translation_not_connected');
 if(!/^Bearer [A-Za-z0-9._-]+$/.test(authorization||''))throw fail(401,'sign_in_required');
 if(!body||!['booking','thread'].includes(body.kind)||!uuid.test(body.id||'')||!targets[body.target]||!Array.isArray(body.messages)||body.messages.length<1||body.messages.length>20||new Set(body.messages).size!==body.messages.length||body.messages.some(id=>!uuid.test(id)))throw fail(400,'invalid_request');
 const access=await fetcher(SUPABASE+'/rest/v1/rpc/skm_translation_text',{method:'POST',headers:{apikey:PUBLIC_KEY,Authorization:authorization,'Content-Type':'application/json'},body:JSON.stringify({p_kind:body.kind,p_conversation:body.id,p_messages:body.messages}),signal:AbortSignal.timeout(12000)});
 const messages=await access.json();if(!access.ok)throw fail(access.status===401?401:messages?.message==='translation limit'?429:403,'translation_unavailable');
 if(!Array.isArray(messages)||messages.length!==body.messages.length||messages.some(m=>!body.messages.includes(m.id)||typeof m.text!=='string'))throw fail(502,'translation_unavailable');
 const endpoint=key.endsWith(':fx')?'https://api-free.deepl.com/v2/translate':'https://api.deepl.com/v2/translate';
 const result=await fetcher(endpoint,{method:'POST',headers:{Authorization:'DeepL-Auth-Key '+key,'Content-Type':'application/json'},body:JSON.stringify({text:messages.map(m=>m.text),target_lang:targets[body.target],preserve_formatting:true}),signal:AbortSignal.timeout(15000)});
 if(!result.ok)throw fail(result.status===429||result.status===456?429:502,'translation_unavailable');
 const data=await result.json();if(data.translations?.length!==messages.length||data.translations.some(t=>typeof t.text!=='string'))throw fail(502,'translation_unavailable');
 return {translations:messages.map((m,i)=>({id:m.id,text:data.translations[i].text,source:data.translations[i].detected_source_language})),provider:'DeepL'};
}
module.exports={translate};
