(function(root){
const presets={
 blues:{bpm:92,swing:.33,rows:[[0,8],[4,12],[0,2,4,6,8,10,12,14],[]]},
 dnb:{bpm:174,swing:0,rows:[[0,6,10],[4,12],[0,2,3,4,6,8,10,11,12,14],[15]]},
 house:{bpm:124,swing:0,rows:[[0,4,8,12],[],[2,6,10,14],[4,12]]},
 hiphop:{bpm:88,swing:.22,rows:[[0,3,8,10],[4,12],[0,2,4,6,8,10,12,14],[]]},
 garage:{bpm:132,swing:.28,rows:[[0,7,10],[4,12],[0,2,5,6,8,10,13,14],[14]]},
 halftime:{bpm:140,swing:0,rows:[[0,10],[8],[0,2,4,6,8,10,12,14],[15]]},
 techno:{bpm:138,swing:0,rows:[[0,4,8,12],[4,12],[0,2,4,6,8,10,12,14],[6,14]]},
 bossa:{bpm:110,swing:0,rows:[[0,6,8,14],[4,10,14],[0,2,4,6,8,10,12,14],[3,9]]}
};
function resize(pattern,count){return pattern.map(row=>{const next=Array(count).fill(false);row.forEach((hit,i)=>{if(hit)next[Math.round(i*count/row.length)%count]=true;});return next;});}
function preset(id){return presets[id].rows.map(row=>Array.from({length:16},(_,i)=>row.includes(i)));}
// Adjacent pairs retain their total duration, so swing cannot move the bar boundary.
function interval(step,bpm,count,swing){return 240/bpm/count*(step%2?1-swing:1+swing);}
// Pitch-preserving overlap-add. Grain positions change, sample rate within each grain does not.
function stretch(input,ratio){if(!(ratio>=.25&&ratio<=4))throw new RangeError('ratio');const length=Math.max(1,Math.round(input.length*ratio));if(ratio===1)return input.slice();const out=new Float32Array(length),weight=new Float32Array(length),grain=2048,hop=512;for(let at=-grain;at<length;at+=hop){const from=Math.round(at/ratio);for(let j=0;j<grain;j++){const dest=at+j,source=from+j;if(dest<0||dest>=length||source<0||source>=input.length)continue;const w=.5-.5*Math.cos(2*Math.PI*j/(grain-1));out[dest]+=input[source]*w;weight[dest]+=w;}}for(let i=0;i<length;i++)if(weight[i]>1e-5)out[i]/=weight[i];return out;}
const api={presets,resize,preset,interval,stretch};if(typeof module!=='undefined')module.exports=api;else root.SKM_GROOVE=api;
})(typeof window==='undefined'?this:window);
