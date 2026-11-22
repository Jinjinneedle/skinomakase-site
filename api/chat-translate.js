const {translate}=require('../_server/chat-translation.cjs');
module.exports=async(req,res)=>{
 res.setHeader('Cache-Control','no-store');res.setHeader('Vary','Origin');
 const enabled=process.env.SKM_TRANSLATION_ENABLED==='true'&&!!process.env.SKM_DEEPL_API_KEY;
 const origin=req.headers.origin;
 if(origin==='https://www.skinomakase.com'||origin==='https://skinomakase.com'||/^skm:\/\//.test(origin||''))res.setHeader('Access-Control-Allow-Origin',origin);
 res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');res.setHeader('Access-Control-Allow-Methods','GET, POST, OPTIONS');
 if(req.method==='OPTIONS')return res.status(204).end();
 if(req.method==='GET')return res.status(200).json({enabled,provider:'DeepL'});
 if(req.method==='POST'&&!enabled)return res.status(503).json({error:'translation_not_connected'});
 if(req.method!=='POST')return res.status(405).json({error:'method_not_allowed'});
 try{const body=typeof req.body==='string'?JSON.parse(req.body):req.body;return res.status(200).json(await translate({authorization:req.headers.authorization,body,key:process.env.SKM_DEEPL_API_KEY}));}
 catch(e){return res.status(e.status||502).json({error:e.status?e.message:'translation_unavailable'});}
};
