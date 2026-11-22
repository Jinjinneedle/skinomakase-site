(()=>{
 const html=document.documentElement;html.dataset.skmRoute=location.pathname.split('/').pop().replace(/\.html$/,'');
 if(window===parent)return;
 let h,frame;try{h=parent.document;frame=window.frameElement;if(!frame||parent.location.host!==location.host)return;}catch{return;}
 const probe=h.createElement('i');probe.setAttribute('aria-hidden','true');
 probe.style.cssText='position:fixed;visibility:hidden;pointer-events:none;padding:var(--skm-safe-top,env(safe-area-inset-top)) var(--skm-safe-right,env(safe-area-inset-right)) var(--skm-safe-bottom,env(safe-area-inset-bottom)) var(--skm-safe-left,env(safe-area-inset-left))';
 const sync=()=>{const r=frame.getBoundingClientRect();if(!r.width||!r.height)return;const s=parent.getComputedStyle(probe),gaps=[r.top,parent.innerWidth-r.right,parent.innerHeight-r.bottom,r.left];['Top','Right','Bottom','Left'].forEach((k,i)=>html.style.setProperty('--skm-safe-'+k.toLowerCase(),Math.max(0,parseFloat(s['padding'+k])-gaps[i])+'px'));};
 const ro=new ResizeObserver(sync);function start(){h.body.append(probe);ro.observe(frame);parent.addEventListener('resize',sync);parent.visualViewport?.addEventListener('resize',sync);sync();}
 function stop(){ro.disconnect();parent.removeEventListener('resize',sync);parent.visualViewport?.removeEventListener('resize',sync);probe.remove();}
 start();window.addEventListener('pagehide',stop);window.addEventListener('pageshow',e=>{if(e.persisted)start();});
})();