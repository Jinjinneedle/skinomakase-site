(() => {
'use strict';
const form=document.getElementById('booking'),fields=document.getElementById('fields'),consent=form.querySelector('.consent'),send=document.getElementById('send');
let lang=document.documentElement.lang;let t=SKM_BOOKING_I18N.ui[lang]||SKM_BOOKING_I18N.ui.en;
let words=['back','next','consent'].map(k=>window.SKMLanguage.t(k));
const panels=[...fields.children,consent],review=document.createElement('section');review.className='booking-review';panels.push(review);fields.append(consent,review);
const labels=panels.map((p,i)=>i===panels.length-1?send.textContent:p.querySelector('legend,span')?.textContent||'');labels[panels.length-2]=words[2];
const progress=document.createElement('div');progress.className='booking-progress';progress.setAttribute('aria-live','polite');form.prepend(progress);
const nav=document.createElement('nav');nav.className='booking-navigation';
const back=document.createElement('button'),next=document.createElement('button');back.type=next.type='button';back.textContent='← '+words[0];next.textContent=words[1]+' →';nav.append(back,next);form.append(nav);
let current=0;
function paint(i,focus=false){current=Math.max(0,Math.min(panels.length-1,i));panels.forEach((p,j)=>{p.hidden=current!==j;p.tabIndex=-1;});send.hidden=current!==panels.length-1;next.hidden=current===panels.length-1;back.disabled=current===0;progress.textContent=String(current+1).padStart(2,'0')+' / '+panels.length;document.getElementById('error').textContent='';fields.scrollTop=0;
 if(current===panels.length-1){review.replaceChildren();const heading=document.createElement('h2');heading.textContent=labels[current];review.append(heading);panels.slice(0,-1).forEach((p,j)=>{const row=document.createElement('button');row.type='button';const title=document.createElement('span'),value=document.createElement('b');title.textContent=labels[j];const texts=[...p.querySelectorAll('input,textarea')].map(e=>e.type==='file'?[...e.files].map(f=>f.name).join(', '):e.type==='checkbox'?(e.checked?'✓':'—'):e.value).filter(Boolean);texts.push(...[...p.querySelectorAll('[aria-pressed=true]')].map(b=>b.textContent));value.textContent=texts.join(' · ')||'—';row.append(title,value);row.onclick=()=>paint(j,true);review.append(row);});}
 if(focus)panels[current].focus({preventScroll:true});
}
function invalid(message,id){document.getElementById('error').textContent=message;document.getElementById(id)?.focus();return false;}
function valid(){const panel=panels[current],name=document.getElementById('name'),contact=document.getElementById('contact'),ig=document.getElementById('ig');
 if(panel.contains(name)&&!name.value.trim())return invalid(t.need_name,'name');
 if(panel.contains(contact)&&contact.value.trim()){const v=contact.value.trim();if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)&&!(/^[+\d\s().-]+$/.test(v)&&v.replace(/\D/g,'').length>=7))return invalid(t.bad_contact,'contact');}
 if(panel.contains(ig)){const v=ig.value.trim().replace(/^@/,'');if(!v&&!contact.value.trim())return invalid(t.need_contact,'ig');if(v&&!/^[A-Za-z0-9._]+$/.test(v))return invalid(t.bad_contact,'ig');}
 if(panel===consent&&!document.getElementById('agree').checked)return invalid(t.need_agree,'agree');
 for(const input of panel.querySelectorAll('input')){if(input.type==='file'&&input.files.length>3)return invalid(t.refs,input.id);if(!input.checkValidity()){input.reportValidity();return false;}}
 return true;
}
function advance(){if(valid()){paint(current+1,true);window.SKMApp?.haptic?.('light');}}
back.onclick=()=>paint(current-1,true);next.onclick=advance;
window.SKMBookingReveal=id=>{const el=document.getElementById(id),i=panels.findIndex(p=>p.contains(el));if(i>=0&&i!==current)paint(i);};
form.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.tagName==='INPUT'&&e.target.type!=='file'&&current<panels.length-1){e.preventDefault();advance();}});
form.addEventListener('submit',e=>{if(current!==panels.length-1){e.preventDefault();e.stopImmediatePropagation();advance();}},true);
form.addEventListener('invalid',e=>window.SKMBookingReveal(e.target.id),true);
document.addEventListener('booking-language',e=>{lang=e.detail.code;t=SKM_BOOKING_I18N.ui[lang]||SKM_BOOKING_I18N.ui.en;words=['back','next','consent'].map(k=>window.SKMLanguage.t(k));back.textContent='← '+words[0];next.textContent=words[1]+' →';panels.forEach((p,i)=>labels[i]=i===panels.length-1?send.textContent:i===panels.length-2?words[2]:p.querySelector('legend,span')?.textContent||'');paint(current);});
const language=document.createElement('label');language.className='booking-language';const caption=document.createElement('span');caption.dataset.ui='language';const select=document.createElement('select');const api=window.SKMLanguage;
for(const entry of api.languages){const option=document.createElement('option');option.value=entry.code;option.lang=entry.locale;option.textContent=entry.name;select.append(option);}
language.append(caption,select);form.after(language);
function refreshLanguage(){select.value=api.code;caption.textContent=api.t('language');select.setAttribute('aria-label',api.t('language'));window.SKMSetBookingLanguage(api.code,api.locale);}
select.onchange=()=>api.set(select.value);window.addEventListener('skm-language',refreshLanguage);refreshLanguage();
new MutationObserver(()=>{language.hidden=form.hidden;}).observe(form,{attributes:true,attributeFilter:['hidden']});
language.hidden=form.hidden;
paint(0);
})();
