/* Exponential drag integrates consistently across display frame rates. */
((root)=>{const step=(velocity,seconds)=>{const decay=Math.exp(-.85*Math.max(0,seconds));return {velocity:velocity*decay,distance:velocity*(1-decay)/.85};};if(typeof module==='object')module.exports={step};else root.SKMInertia={step};})(globalThis);
