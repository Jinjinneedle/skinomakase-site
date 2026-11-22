(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.SKMLibraryCore=api;})(typeof globalThis==='object'?globalThis:this,function(){
 const normalize=s=>String(s||'').normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}\s]/gu,' ').trim();
 const stop=new Set('a an the for to of in on i want how what would like to read about is with and are my it me 알고 싶어 방법 알려줘 싶어요 읽고'.split(' '));
 function rank(docs,query){const tokens=[...new Set(normalize(query).split(/\s+/).filter(t=>t.length>1&&!stop.has(t)))];if(!tokens.length)return [];
  return docs.map(d=>{const hay=normalize(d.title+' '+d.description+' '+d.keywords);return {id:d.id,score:tokens.reduce((n,t)=>n+(hay.includes(t)?1:0),0)/tokens.length};}).filter(d=>d.score>0).sort((a,b)=>b.score-a.score).slice(0,5);
 }
 function bookmarks(raw,docs){try{const a=JSON.parse(raw);return new Set(Array.isArray(a)?a.filter(id=>docs.some(d=>d.id===id)):[]);}catch{return new Set();}}
 function merge(lexical,semantic){const scores=new Map(lexical.map(x=>[x.id,x.score]));for(const x of semantic||[])if(typeof x.id==='string'&&Number.isFinite(x.score)&&x.score>=.25)scores.set(x.id,(scores.get(x.id)||0)+x.score);return [...scores].map(([id,score])=>({id,score})).sort((a,b)=>b.score-a.score).slice(0,5);}
 // Embeddings are suggestions, not evidence that a source answers a question.
 // Keyword-backed matches may be reranked; new matches need a clear lead.
 function related(results,lexical){
  const ranked=(results||[]).filter(x=>typeof x.id==='string'&&Number.isFinite(x.score)).sort((a,b)=>b.score-a.score),ids=new Set(lexical.map(x=>x.id));
  const top=ranked[0],clear=top&&top.score>=.27&&top.score-(ranked[1]?.score||0)>=.08;
  return ranked.filter(x=>x.score>=.27&&(ids.has(x.id)||(clear&&x===top)));
 }
 return {rank,bookmarks,merge,related};
});
