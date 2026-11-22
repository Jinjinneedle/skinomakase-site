(() => {
const init=()=>{
 if(!window.SKM?.nodes?.length){setTimeout(init,100);return;}
 const api=window.SKM,root=document.createElement('section');root.id='bodymap-flower';root.innerHTML='<div class="graphic-dial"></div><button type="button" class="graphic-dismiss" hidden>×</button>';document.body.append(root);
 let busy=false;
 const entries=api.nodes.map(n=>({src:n.g.thumb,label:n.g.id,g:n.g}));
 const hide=()=>{root.hidden=true;document.body.classList.remove('choosing-graphic');};
 const open=()=>{root.hidden=false;document.body.classList.add('choosing-graphic');root.querySelector('.graphic-dismiss').hidden=!api.items.length;};
 const openGraphic=async i=>{if(busy)return;busy=true;try{const before=api.items.length;await api.placeNode(entries[i].g,window.SKM_BODY.W/2,window.SKM_BODY.H*.24);if(api.items.length>before){hide();api.flyTo(api.bodyBox(),500,{x:30,top:75,bottom:165});}}finally{busy=false;}};
 SKMPetalDial(root.querySelector('.graphic-dial'),{entries,onOpen:openGraphic});
 root.querySelector('.graphic-dismiss').onclick=hide;
 document.getElementById('mb-tray').onclick=open;document.getElementById('back-spread').onclick=open;
 const add=document.createElement('button');add.type='button';add.id='flower-add';add.textContent='＋';add.setAttribute('aria-label',document.getElementById('back-spread').textContent.trim());add.onclick=open;document.body.append(add);
 const bar=document.getElementById('bar'),more=document.createElement('button');more.type='button';more.className='t flower-more';more.textContent='···';more.setAttribute('aria-label','⋯');more.setAttribute('aria-expanded','false');more.onclick=()=>{const yes=bar.classList.toggle('expanded');more.setAttribute('aria-expanded',yes);};bar.append(more);
 document.querySelectorAll('#bar button').forEach(b=>{if(!b.getAttribute('aria-label'))b.setAttribute('aria-label',b.title||b.textContent);});
 document.querySelectorAll('#bar [data-tool]').forEach(b=>b.addEventListener('click',()=>{if(b.dataset.tool!=='select')bar.classList.add('expanded');}));
 new MutationObserver(()=>{if(!api.items.length)open();}).observe(bar,{attributes:true,attributeFilter:['hidden']});
 if(parent===window){
  document.getElementById('next').onclick=async()=>{
   if(!api.items.length||busy)return;busy=true;
   try{const png=(await api.exportPNG(2)).toDataURL('image/png'),frame=document.createElement('iframe'),close=document.createElement('button'),sheet=document.createElement('section');sheet.id='flower-booking-overlay';frame.src='../app/booking.html';frame.title=document.getElementById('next').textContent;close.textContent='←';close.type='button';close.setAttribute('aria-label',document.getElementById('sheet-close').getAttribute('aria-label'));sheet.append(frame,close);document.body.append(sheet);
    const receive=e=>{if(e.source!==frame.contentWindow)return;if(e.data?.skm==='booking-ready')frame.contentWindow.postMessage({skm:'design',png,graphics:api.items.map(it=>it.gid)},location.origin);if(e.data?.skm==='booking-done')exit();};
    const exit=()=>{window.removeEventListener('message',receive);sheet.remove();};window.addEventListener('message',receive);close.onclick=exit;
   }finally{busy=false;}
  };
 }
 open();
};init();
})();
