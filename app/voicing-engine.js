  // App studio bridge: shares the original synth context and processing chain.
  let studioBank=[],studioLinked=false,studioEpoch=0;
  window.skmStudio={
    installBank(bank){stop();studioBank=bank;tSample.disabled=!(bank.length||sample);setTone(bank.length||sample?'sample':'piano');},
    beginLinked(){if(!chords.length)return false;stop();ac();studioLinked=true;playing=true;playBtn.innerHTML=ICON_STOP;playBtn.classList.add('on');playBtn.setAttribute('aria-label','Stop');return true;},
    scheduleStep(tick,when,bpm){
      if(!studioLinked||!voicings.length)return;
      const index=Math.floor(tick/16)%voicings.length,slot=tick%16,v=voicings[index],beat=60/bpm,offset=Math.max(0,when-ctx.currentTime),epoch=studioEpoch;
      const all=v.lh.concat(v.rh).sort((a,b)=>a.midi-b.midi);
      if(slot===0)setTimeout(()=>{if(studioLinked&&epoch===studioEpoch)select(index,false);},offset*1000);
      if(S.r==='hold'){if(slot===0)playNotes(all,beat*4+.1,offset);}
      else if(slot%2===0){if(S.r==='e')playNotes(all,beat*.48+.08,offset,.55);else{const sequence=all.concat(all.slice(1,-1).reverse());const n=sequence[(slot/2)%sequence.length];if(n){playNote(n.midi,beat*.5+.15,.65,offset);flash(n.midi,offset);}}}
    },
    get linked(){return studioLinked;},
    get settings(){return {...S};},
    open(){ac(); return {ctx,master,nodes};},
    tempo(bpm){S.bpm=Math.max(40,Math.min(240,bpm));$('bpmV').textContent=S.bpm;applyFx();save();},
    get bpm(){return S.bpm;},
    fx(key,value){ac(); if(key==='cut'||key==='drive'){S[key]=value;applyFx();save();} else {S[key]=value;applyFx();}},
    language(code){const i=['ko','en','ja','zh','es','fr','de'].indexOf(code);S.lang=Math.max(0,i);save();},
    halt(){stop();},
    get playing(){return playing;}
  };
