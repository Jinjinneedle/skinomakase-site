(()=>{var Gx=Object.create;var Ch=Object.defineProperty;var Wx=Object.getOwnPropertyDescriptor;var qx=Object.getOwnPropertyNames;var Xx=Object.getPrototypeOf,Yx=Object.prototype.hasOwnProperty;var qo=(n,e)=>()=>(e||n((e={exports:{}}).exports,e),e.exports);var Zx=(n,e,t,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of qx(e))!Yx.call(n,r)&&r!==t&&Ch(n,r,{get:()=>e[r],enumerable:!(i=Wx(e,r))||i.enumerable});return n};var Vr=(n,e,t)=>(t=n!=null?Gx(Xx(n)):{},Zx(e||!n||!n.__esModule?Ch(t,"default",{value:n,enumerable:!0}):t,n));var Ph=qo((cw,Rh)=>{"use strict";function Kx(){let n=null,e=-1/0;return{reset(){n=null},sample(t,i,r=!0){if(!r||!Number.isFinite(i)||!t||![t.x,t.y,t.z].every(Number.isFinite)||i-e<2200)return n=null,0;n&&(i-n.time>450||i<n.time)&&(n=null);let o=Math.hypot(t.x,t.y,t.z);if(o<1.15)return 0;if(n){let a=i-n.time,s=(t.x*n.x+t.y*n.y+t.z*n.z)/(o*n.magnitude);if(a>=40&&a<=450&&s<-.35){let l=Math.abs(n.x)>.45?Math.sign(n.x):1;return e=i,n=null,l}return 0}return n={...t,time:i,magnitude:o},0}}}function $x(n,e){if(!Number.isFinite(n)||!Number.isFinite(e)||e<=0)return{delta:0,speed:0};let t=Math.min(e,.05),i=n*Math.exp(-2*t);return{delta:(n-i)/2,speed:Math.abs(i)<2?0:i}}Rh.exports={createShakeDetector:Kx,stepGlobeSpin:$x}});var Qm=qo((LA,jm)=>{"use strict";function XS(n,e){return{...n,code:n?.code||e.label,model:n?.model||"models/skm-product.glb",previewOnly:!n?.model&&!n?.photo,publicPickup:n?.publicPickup}}jm.exports={glovePreview:XS}});var zl=qo((UA,ng)=>{"use strict";function YS({status:n,ownerId:e,viewerId:t,request:i,preview:r=!1}){return n==="owned"||n==="sold"||n==="collected"?{view:e&&e===t?"mine":"chat",label:e&&e===t?"\uB0B4 \uC7A5\uAC11":"\uC8FC\uC778 \uC788\uC74C"}:n==="reserved"&&!["shared","collected"].includes(i?.status)?{view:"unavailable",label:"\uC608\uC57D \uC911"}:n==="open"||n==="available"||i?.status==="shared"?{view:"pickup",label:"\uB4DC\uB86D \uAC00\uB2A5",canViewLocation:r||i?.status==="shared"}:{view:"unavailable",label:n==="closed"?"\uB4DC\uB86D \uC885\uB8CC":"\uC900\uBE44 \uC911"}}function ZS(n,e){if(!e||n?.latitude==null||n?.longitude==null)return null;let t=o=>typeof o=="number"||typeof o=="string"&&o.trim()!==""&&Number.isFinite(Number(o));if(!t(n.latitude)||!t(n.longitude))return null;let i=Number(n.latitude),r=Number(n.longitude);return!Number.isFinite(i)||!Number.isFinite(r)||Math.abs(i)>90||Math.abs(r)>180?null:"https://maps.apple.com/?daddr="+encodeURIComponent(i+","+r)+"&dirflg=w"}function KS(n){return n===1?"available":n===2?"owned":n===3?"reserved":"draft"}function $S(n,e,t){let i=u=>String(u||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim().toLowerCase(),r=[e.ko,e.label,e.ascii,e.name].filter(Boolean).map(i),o=(n?.drops||[]).filter(u=>r.includes(i(u.area))&&Number(u.number)===t);if(o.length!==1)return null;let a=o[0],s=(n.requests||[]).filter(u=>u.drop_id===a.id);if(s.length>1)return null;let l=s[0];return{drop:{id:a.id,status:a.status},request:l?["shared","collected"].includes(l.status)?l:{id:l.id,status:l.status}:null}}ng.exports={routeGlove:YS,pickupLink:ZS,previewSlot:KS,pickupForPair:$S}});var rg=qo((NA,ig)=>{"use strict";var{pickupLink:JS}=zl(),dd=1e3;function hd(n){let e=String(n??"").trim();if(!/^\d+(?:[.,]\d{1,2})?$/.test(e))return null;let[t,i=""]=e.replace(",",".").split("."),r=Number(t)*100+Number(i.padEnd(2,"0"));return!Number.isSafeInteger(r)||r<dd?null:Math.floor(r/100)+"."+String(r%100).padStart(2,"0")}function jS(n,e){let t=hd(n);if(!t)return"10.00";if(e!==1&&e!==-1)return t;let[i,r]=t.split("."),o=Number(i)*100+Number(r),a=Math.max(dd,o+e*100);return Number.isSafeInteger(a)?Math.floor(a/100)+"."+String(a%100).padStart(2,"0"):t}function QS(n){let e=hd(n);return e?"https://paypal.me/Jinjinnoodle/"+e+"USD":null}function eb({live:n=!1,preview:e=!1,userId:t,info:i}){if(!n)return"held";if(e)return"preview";if(!t)return"login";if(!i)return"held";let{drop:r,request:o}=i;return["owned","sold","collected"].includes(r?.status)?"owner":r?.status==="reserved"&&o?.status==="shared"&&JS(o,!0)?"pay":o?.status==="pending"?"pending":o||r?.status!=="open"?"unavailable":"request"}ig.exports={MINIMUM_USD_CENTS:dd,usdAmount:hd,stepUsdAmount:jS,paypalURL:QS,checkoutState:eb}});var ag=qo((HA,og)=>{"use strict";function rb(n,e=357,t){e=Math.max(1,Number(e)||357);let i=e,r=Math.max(1,Number(t)||Math.max(640,Math.round(225e3/e))),o=Math.min(1,Math.sqrt(i*r/225e3),i/240,r/240);e=i/o;let a=r/o,s={x:e/2,y:a/2};if(!Number.isInteger(n)||n<1||n>50)return{width:i,height:r,center:{x:i/2,y:r/2},scale:o,points:[]};let l=e/2-24,u=a/2-24,c=[.27,.5,.74,1],f=[0,.24,-.08,.04],d=[Math.round(n*.12),Math.round(n*.2),Math.round(n*.28)];d.push(n-d.reduce((m,x)=>m+x,0));let h=[];d.forEach((m,x)=>{for(let g=0;g<m;g++){let p=-Math.PI/2+g/m*Math.PI*2+f[x];h.push({x:s.x+Math.cos(p)*l*c[x],y:s.y+Math.sin(p)*u*c[x]})}});for(let m=0;m<450;m++){for(let x=0;x<n;x++)for(let g=x+1;g<n;g++){let p=h[x],_=h[g],y=_.x-p.x,v=_.y-p.y,R=48-Math.abs(y),E=48-Math.abs(v);if(R>0&&E>0)if(R<E){let P=(Math.sign(y)||1)*(R/2+.01);p.x-=P,_.x+=P}else{let P=(Math.sign(v)||1)*(E/2+.01);p.y-=P,_.y+=P}}for(let x of h)x.x=Math.max(24,Math.min(e-24,x.x)),x.y=Math.max(24,Math.min(a-24,x.y)),Math.abs(x.x-s.x)<64&&Math.abs(x.y-s.y)<44&&(64-Math.abs(x.x-s.x)<44-Math.abs(x.y-s.y)?x.x=s.x+(Math.sign(x.x-s.x)||1)*64:x.y=s.y+(Math.sign(x.y-s.y)||1)*44)}return{width:i,height:r,center:{x:i/2,y:r/2},scale:o,points:h.map(m=>({x:m.x*o,y:m.y*o}))}}og.exports={gloveNetwork:rb}});var Cc=Vr(Ph());function Ih({loadStations:n,play:e,current:t,canPlay:i=()=>!0,onSearching:r=()=>{},onError:o=()=>{},random:a=Math.random}){let s=[],l=null,u=0,c=[],f=null;function d(){return s.length?Promise.resolve(s):(l||(l=Promise.resolve().then(n).then(p=>(s=p,s)).finally(()=>{l=null})),l)}function h(){u++,c=[],f=null,r(!1)}function m(p){if(p!==u)return;if(!i()){h();return}let _=c.shift();if(!_){f=null,o();return}f=_.id,e(_)}async function x(){let p=++u;f=null,c=[],r(!0);try{let _=await d();if(p!==u)return;if(!i()){h();return}let y=_.filter(v=>v.id!==t()?.id&&v.stream!==t()?.stream);for(let v=y.length-1;v>0;v--){let R=Math.floor(a()*(v+1));[y[v],y[R]]=[y[R],y[v]]}c=y.slice(0,3),r(!1),m(p)}catch{p===u&&(r(!1),o())}}function g(p){if(p.status==="paused"||p.status==="idle"){h();return}if(p.station?.id===f)if(p.status==="error"){let _=u;queueMicrotask(()=>m(_))}else p.status==="playing"&&(f=null,c=[])}return{start:x,cancel:h,prefetch:d,observe:g}}var on=Math.PI,mt=on*2,Yi=on/180,Jx=180/on,Lh=1440,jx=398600.8,gn=6378.135,zn=60/Math.sqrt(gn*gn*gn/jx),gs=gn*zn/60,Dh=1/zn,gi=.001082616,Qx=-253881e-11,Uh=-165597e-11,Ri=Qx/gi,Pi=2/3,xs=1440/(2*on);function Fh(n,e){let t=[31,n%4===0?29:28,31,30,31,30,31,31,30,31,30,31],i=Math.floor(e),r=1,o=0;for(;i>o+t[r-1]&&r<12;)o+=t[r-1],r+=1;let a=r,s=i-o,l=(e-i)*24,u=Math.floor(l);l=(l-u)*60;let c=Math.floor(l),f=(l-c)*60;return{mon:a,day:s,hr:u,minute:c,sec:f}}function Nh(n,e,t,i,r,o,a=0){return 367*n-Math.floor(7*(n+Math.floor((e+9)/12))*.25)+Math.floor(275*e/9)+t+17210135e-1+((a/6e4+o/60+r)/60+i)/24}function vr(n,e,t,i,r,o,a=0){if(n instanceof Date){let s=n;return Nh(s.getUTCFullYear(),s.getUTCMonth()+1,s.getUTCDate(),s.getUTCHours(),s.getUTCMinutes(),s.getUTCSeconds(),s.getUTCMilliseconds())}return Nh(n,e,t,i,r,o,a)}function vs(n,e){let{e3:t,ee2:i,peo:r,pgho:o,pho:a,pinco:s,plo:l,se2:u,se3:c,sgh2:f,sgh3:d,sgh4:h,sh2:m,sh3:x,si2:g,si3:p,sl2:_,sl3:y,sl4:v,t:R,xgh2:E,xgh3:P,xgh4:L,xh2:b,xh3:S,xi2:T,xi3:O,xl2:F,xl3:H,xl4:U,zmol:N,zmos:te}=n,{init:D,opsmode:k}=e,{ep:J,inclp:$,nodep:re,argpp:le,mp:q}=e,W,j,oe,de,me,ue,Ce,Te,Pe,B,Oe,De,_e,pe,Ue,xe,C,w,X,ne,ae,ie=119459e-10,be=.01675,he=.00015835218,ge=.0549;ae=te+ie*R,D==="y"&&(ae=te),ne=ae+2*be*Math.sin(ae),C=Math.sin(ne),B=.5*C*C-.25,Oe=-.5*C*Math.cos(ne);let Ve=u*B+c*Oe,fe=g*B+p*Oe,we=_*B+y*Oe+v*C,M=f*B+d*Oe+h*C,Re=m*B+x*Oe;ae=N+he*R,D==="y"&&(ae=N),ne=ae+2*ge*Math.sin(ae),C=Math.sin(ne),B=.5*C*C-.25,Oe=-.5*C*Math.cos(ne);let Me=i*B+t*Oe,Ge=T*B+O*Oe,ze=F*B+H*Oe+U*C,qe=E*B+P*Oe+L*C,I=b*B+S*Oe;return De=Ve+Me,Ue=fe+Ge,xe=we+ze,_e=M+qe,pe=Re+I,D==="n"&&(De-=r,Ue-=s,xe-=l,_e-=o,pe-=a,$+=Ue,J+=De,de=Math.sin($),oe=Math.cos($),$>=.2?(pe/=de,_e-=oe*pe,le+=_e,re+=pe,q+=xe):(ue=Math.sin(re),me=Math.cos(re),W=de*ue,j=de*me,Ce=pe*me+Ue*oe*ue,Te=-pe*ue+Ue*oe*me,W+=Ce,j+=Te,re%=mt,re<0&&k==="a"&&(re+=mt),w=q+le+oe*re,Pe=xe+_e-Ue*re*de,w+=Pe,X=re,re=Math.atan2(W,j),re<0&&k==="a"&&(re+=mt),Math.abs(X-re)>on&&(re<X?re+=mt:re-=mt),q+=xe,le=w-q-oe*re)),{ep:J,inclp:$,nodep:re,argpp:le,mp:q}}function Oh(n){let{epoch:e,ep:t,argpp:i,tc:r,inclp:o,nodep:a,np:s}=n,l,u,c,f,d,h,m,x,g,p,_,y,v,R,E,P,L,b,S,T,O,F,H,U,N,te,D,k,J,$,re,le,q,W,j,oe,de,me,ue,Ce,Te,Pe,B,Oe,De,_e,pe,Ue,xe,C,w,X,ne,ae,ie,be,he,ge,Ve,fe,we,M,Re,Me=.01675,Ge=.0549,ze=29864797e-13,qe=47968065e-14,I=.39785416,ee=.91744867,G=.1945905,Z=-.98088458,ce=s,se=t,Se=Math.sin(a),Ke=Math.cos(a),Qe=Math.sin(i),Xe=Math.cos(i),At=Math.sin(o),yt=Math.cos(o),He=se*se,Wt=1-He,Dt=Math.sqrt(Wt),hn=0,Ye=0,nn=0,Ln=0,Dn=0,rn=e+18261.5+r/1440,pn=(4.523602-.00092422029*rn)%mt,kt=Math.sin(pn),bn=Math.cos(pn),qi=.91375164-.03568096*bn,Xi=Math.sqrt(1-qi*qi),A=.089683511*kt/Xi,V=Math.sqrt(1-A*A),K=5.8351514+.001944368*rn,Q=.39785416*kt/Xi,Y=V*bn+.91744867*A*kt;Q=Math.atan2(Q,Y),Q+=K-pn;let ve=Math.cos(Q),Ee=Math.sin(Q);T=G,O=Z,U=ee,N=I,F=Ke,H=Se,_=ze;let Ne=1/ce,Ie=0;for(;Ie<2;)Ie+=1,l=T*F+O*U*H,c=-O*F+T*U*H,m=-T*H+O*U*F,x=O*N,g=O*H+T*U*F,p=T*N,u=yt*m+At*x,f=yt*g+At*p,d=-At*m+yt*x,h=-At*g+yt*p,y=l*Xe+u*Qe,v=c*Xe+f*Qe,R=-l*Qe+u*Xe,E=-c*Qe+f*Xe,P=d*Qe,L=h*Qe,b=d*Xe,S=h*Xe,we=12*y*y-3*R*R,M=24*y*v-6*R*E,Re=12*v*v-3*E*E,X=3*(l*l+u*u)+we*He,ne=6*(l*c+u*f)+M*He,ae=3*(c*c+f*f)+Re*He,ie=-6*l*d+He*(-24*y*b-6*R*P),be=-6*(l*h+c*d)+He*(-24*(v*b+y*S)+-6*(R*L+E*P)),he=-6*c*h+He*(-24*v*S-6*E*L),ge=6*u*d+He*(24*y*P-6*R*b),Ve=6*(f*d+u*h)+He*(24*(v*P+y*L)-6*(E*b+R*S)),fe=6*f*h+He*(24*v*L-6*E*S),X=X+X+Wt*we,ne=ne+ne+Wt*M,ae=ae+ae+Wt*Re,pe=_*Ne,_e=-.5*pe/Dt,Ue=pe*Dt,De=-15*se*Ue,xe=y*R+v*E,C=v*R+y*E,w=v*E-y*R,Ie===1&&(te=De,D=_e,k=pe,J=Ue,$=xe,re=C,le=w,q=X,W=ne,j=ae,oe=ie,de=be,me=he,ue=ge,Ce=Ve,Te=fe,Pe=we,B=M,Oe=Re,T=ve,O=Ee,U=qi,N=Xi,F=V*Ke+A*Se,H=Se*V-Ke*A,_=qe);let We=(4.7199672+(.2299715*rn-K))%mt,Ze=(6.2565837+.017201977*rn)%mt,Fe=2*te*re,et=2*te*le,ct=2*D*de,Mt=2*D*(me-oe),$t=-2*k*W,ut=-2*k*(j-q),Be=-2*k*(-21-9*He)*Me,ln=2*J*B,ft=2*J*(Oe-Pe),mn=-18*J*Me,kn=-2*D*Ce,Jt=-2*D*(Te-ue),$n=2*De*C,St=2*De*w,wn=2*_e*be,xr=2*_e*(he-ie),An=-2*pe*ne,pi=-2*pe*(ae-X),mi=-2*pe*(-21-9*He)*Ge,ms=2*Ue*M,kx=2*Ue*(Re-we),zx=-18*Ue*Ge,Hx=-2*_e*Ve,Vx=-2*_e*(fe-ge);return{snodm:Se,cnodm:Ke,sinim:At,cosim:yt,sinomm:Qe,cosomm:Xe,day:rn,e3:St,ee2:$n,em:se,emsq:He,gam:K,peo:hn,pgho:Ln,pho:Dn,pinco:Ye,plo:nn,rtemsq:Dt,se2:Fe,se3:et,sgh2:ln,sgh3:ft,sgh4:mn,sh2:kn,sh3:Jt,si2:ct,si3:Mt,sl2:$t,sl3:ut,sl4:Be,s1:De,s2:_e,s3:pe,s4:Ue,s5:xe,s6:C,s7:w,ss1:te,ss2:D,ss3:k,ss4:J,ss5:$,ss6:re,ss7:le,sz1:q,sz2:W,sz3:j,sz11:oe,sz12:de,sz13:me,sz21:ue,sz22:Ce,sz23:Te,sz31:Pe,sz32:B,sz33:Oe,xgh2:ms,xgh3:kx,xgh4:zx,xh2:Hx,xh3:Vx,xi2:wn,xi3:xr,xl2:An,xl3:pi,xl4:mi,nm:ce,z1:X,z2:ne,z3:ae,z11:ie,z12:be,z13:he,z21:ge,z22:Ve,z23:fe,z31:we,z32:M,z33:Re,zmol:We,zmos:Ze}}function Bh(n){let{cosim:e,argpo:t,s1:i,s2:r,s3:o,s4:a,s5:s,sinim:l,ss1:u,ss2:c,ss3:f,ss4:d,ss5:h,sz1:m,sz3:x,sz11:g,sz13:p,sz21:_,sz23:y,sz31:v,sz33:R,t:E,tc:P,gsto:L,mo:b,mdot:S,no:T,nodeo:O,nodedot:F,xpidot:H,z1:U,z3:N,z11:te,z13:D,z21:k,z23:J,z31:$,z33:re,ecco:le,eccsq:q}=n,{emsq:W,em:j,argpm:oe,inclm:de,mm:me,nm:ue,nodem:Ce,irez:Te,atime:Pe,d2201:B,d2211:Oe,d3210:De,d3222:_e,d4410:pe,d4422:Ue,d5220:xe,d5232:C,d5421:w,d5433:X,dedt:ne,didt:ae,dmdt:ie,dnodt:be,domdt:he,del1:ge,del2:Ve,del3:fe,xfact:we,xlamo:M,xli:Re,xni:Me}=n,Ge,ze,qe,I,ee,G,Z,ce,se,Se,Ke,Qe,Xe,At,yt,He,Wt,Dt,hn,Ye,nn,Ln,Dn,rn,pn,kt,bn,qi,Xi,A,V,K,Q=17891679e-13,Y=21460748e-13,ve=22123015e-14,Ee=17891679e-13,Ne=73636953e-16,Ie=21765803e-16,We=.0043752690880113,Ze=37393792e-14,Fe=11428639e-14,et=.00015835218,ct=119459e-10;Te=0,ue<.0052359877&&ue>.0034906585&&(Te=1),ue>=.00826&&ue<=.00924&&j>=.5&&(Te=2);let Mt=u*ct*h,$t=c*ct*(g+p),ut=-ct*f*(m+x-14-6*W),Be=d*ct*(v+R-6),ln=-ct*c*(_+y);(de<.052359877||de>on-.052359877)&&(ln=0),l!==0&&(ln/=l);let ft=Be-e*ln;ne=Mt+i*et*s,ae=$t+r*et*(te+D),ie=ut-et*o*(U+N-14-6*W);let mn=a*et*($+re-6),kn=-et*r*(k+J);(de<.052359877||de>on-.052359877)&&(kn=0),he=ft+mn,be=ln,l!==0&&(he-=e/l*kn,be+=kn/l);let Jt=0,$n=(L+P*We)%mt;if(j+=ne*E,de+=ae*E,oe+=he*E,Ce+=be*E,me+=ie*E,Te!==0){if(A=(ue/zn)**Pi,Te===2){V=e*e;let St=j;j=le;let wn=W;W=q,K=j*W,At=-.306-(j-.64)*.44,j<=.65?(yt=3.616-13.247*j+16.29*W,Wt=-19.302+117.39*j-228.419*W+156.591*K,Dt=-18.9068+109.7927*j-214.6334*W+146.5816*K,hn=-41.122+242.694*j-471.094*W+313.953*K,Ye=-146.407+841.88*j-1629.014*W+1083.435*K,nn=-532.114+3017.977*j-5740.032*W+3708.276*K):(yt=-72.099+331.819*j-508.738*W+266.724*K,Wt=-346.844+1582.851*j-2415.925*W+1246.113*K,Dt=-342.585+1554.908*j-2366.899*W+1215.972*K,hn=-1052.797+4758.686*j-7193.992*W+3651.957*K,Ye=-3581.69+16178.11*j-24462.77*W+12422.52*K,j>.715?nn=-5149.66+29936.92*j-54087.36*W+31324.56*K:nn=1464.74-4664.75*j+3763.64*W),j<.7?(rn=-919.2277+4988.61*j-9064.77*W+5542.21*K,Ln=-822.71072+4568.6173*j-8491.4146*W+5337.524*K,Dn=-853.666+4690.25*j-8624.77*W+5341.4*K):(rn=-37995.78+161616.52*j-229838.2*W+109377.94*K,Ln=-51752.104+218913.95*j-309468.16*W+146349.42*K,Dn=-40023.88+170470.89*j-242699.48*W+115605.82*K),pn=l*l,Ge=.75*(1+2*e+V),ze=1.5*pn,I=1.875*l*(1-2*e-3*V),ee=-1.875*l*(1+2*e-3*V),Z=35*pn*Ge,ce=39.375*pn*pn,se=9.84375*l*(pn*(1-2*e-5*V)+.33333333*(-2+4*e+6*V)),Se=l*(4.92187512*pn*(-2-4*e+10*V)+6.56250012*(1+2*e-3*V)),Ke=29.53125*l*(2-8*e+V*(-12+8*e+10*V)),Qe=29.53125*l*(-2-8*e+V*(12+8*e-10*V)),qi=ue*ue,Xi=A*A,bn=3*qi*Xi,kt=bn*Ee,B=kt*Ge*At,Oe=kt*ze*yt,bn*=A,kt=bn*Ze,De=kt*I*Wt,_e=kt*ee*Dt,bn*=A,kt=2*bn*Ne,pe=kt*Z*hn,Ue=kt*ce*Ye,bn*=A,kt=bn*Fe,xe=kt*se*nn,C=kt*Se*Dn,kt=2*bn*Ie,w=kt*Ke*Ln,X=kt*Qe*rn,M=(b+O+O-($n+$n))%mt,we=S+ie+2*(F+be-We)-T,j=St,W=wn}Te===1&&(Xe=1+W*(-2.5+.8125*W),Wt=1+2*W,He=1+W*(-6+6.60937*W),Ge=.75*(1+e)*(1+e),qe=.9375*l*l*(1+3*e)-.75*(1+e),G=1+e,G=1.875*G*G*G,ge=3*ue*ue*A*A,Ve=2*ge*Ge*Xe*Q,fe=3*ge*G*He*ve*A,ge=ge*qe*Wt*Y*A,M=(b+O+t-$n)%mt,we=S+H+ie+he+be-(T+We)),Re=M,Me=T,Pe=0,ue=T+Jt}return{em:j,argpm:oe,inclm:de,mm:me,nm:ue,nodem:Ce,irez:Te,atime:Pe,d2201:B,d2211:Oe,d3210:De,d3222:_e,d4410:pe,d4422:Ue,d5220:xe,d5232:C,d5421:w,d5433:X,dedt:ne,didt:ae,dmdt:ie,dndt:Jt,dnodt:be,domdt:he,del1:ge,del2:Ve,del3:fe,xfact:we,xlamo:M,xli:Re,xni:Me}}function Bc(n){let e=(n-2451545)/36525,t=-62e-7*e*e*e+.093104*e*e+(876600*3600+8640184812866e-6)*e+67310.54841;return t=t*Yi/240%mt,t<0&&(t+=mt),t}function Xo(n,e,t,i,r,o,a){return n instanceof Date?Bc(vr(n)):Bc(e!==void 0?vr(n,e,t,i,r,o,a):n)}function kh(n){let{ecco:e,epoch:t,inclo:i,opsmode:r}=n,{no:o}=n,a=e*e,s=1-a,l=Math.sqrt(s),u=Math.cos(i),c=u*u,f=(zn/o)**Pi,d=.75*gi*(3*c-1)/(l*s),h=d/(f*f),m=f*(1-h*h-h*(1/3+134*h*h/81));h=d/(m*m),o/=1+h;let x=(zn/o)**Pi,g=Math.sin(i),p=x*s,_=1-5*c,y=-_-c-c,v=1/x,R=p*p,E=x*(1-e),P="n",L;if(r==="a"){let b=t-7305,S=Math.floor(b+1e-8),T=b-S,O=.017202791694070362,F=1.7321343856509375,H=5075514194322695e-30,U=O+mt;L=(F+O*S+U*T+b*b*H)%mt,L<0&&(L+=mt)}else L=Xo(t+24332815e-1);return{no:o,method:P,ainv:v,ao:x,con41:y,con42:_,cosio:u,cosio2:c,eccsq:a,omeosq:s,posq:R,rp:E,rteosq:l,sinio:g,gsto:L}}function zh(n){let{irez:e,d2201:t,d2211:i,d3210:r,d3222:o,d4410:a,d4422:s,d5220:l,d5232:u,d5421:c,d5433:f,dedt:d,del1:h,del2:m,del3:x,didt:g,dmdt:p,dnodt:_,domdt:y,argpo:v,argpdot:R,t:E,tc:P,gsto:L,xfact:b,xlamo:S,no:T}=n,{atime:O,em:F,argpm:H,inclm:U,xli:N,mm:te,xni:D,nodem:k,nm:J}=n,$=.13130908,re=2.8843198,le=.37448087,q=5.7686396,W=.95240898,j=1.8014998,oe=1.050833,de=4.4108898,me=.0043752690880113,ue=720,Ce=-720,Te=259200,Pe,B,Oe,De,_e,pe,Ue,xe,C=0,w=0,X=(L+P*me)%mt;if(F+=d*E,U+=g*E,H+=y*E,k+=_*E,te+=p*E,e!==0){(O===0||E*O<=0||Math.abs(E)<Math.abs(O))&&(O=0,D=T,N=S),E>0?Pe=ue:Pe=Ce;let ne=381;for(;ne===381;)e!==2?(Ue=h*Math.sin(N-$)+m*Math.sin(2*(N-re))+x*Math.sin(3*(N-le)),_e=D+b,pe=h*Math.cos(N-$)+2*m*Math.cos(2*(N-re))+3*x*Math.cos(3*(N-le)),pe*=_e):(xe=v+R*O,Oe=xe+xe,B=N+N,Ue=t*Math.sin(Oe+N-q)+i*Math.sin(N-q)+r*Math.sin(xe+N-W)+o*Math.sin(-xe+N-W)+a*Math.sin(Oe+B-j)+s*Math.sin(B-j)+l*Math.sin(xe+N-oe)+u*Math.sin(-xe+N-oe)+c*Math.sin(xe+B-de)+f*Math.sin(-xe+B-de),_e=D+b,pe=t*Math.cos(Oe+N-q)+i*Math.cos(N-q)+r*Math.cos(xe+N-W)+o*Math.cos(-xe+N-W)+l*Math.cos(xe+N-oe)+u*Math.cos(-xe+N-oe)+2*(a*Math.cos(Oe+B-j)+s*Math.cos(B-j)+c*Math.cos(xe+B-de)+f*Math.cos(-xe+B-de)),pe*=_e),Math.abs(E-O)>=ue?ne=381:(w=E-O,ne=0),ne===381&&(N+=_e*Pe+Ue*Te,D+=Ue*Pe+pe*Te,O+=Pe);J=D+Ue*w+pe*w*w*.5,De=N+_e*w+Ue*w*w*.5,e!==1?(te=De-2*k+2*X,C=J-T):(te=De-k-H+X,C=J-T),J=T+C}return{atime:O,em:F,argpm:H,inclm:U,xli:N,mm:te,xni:D,nodem:k,dndt:C,nm:J}}var Jn;(function(n){n[n.None=0]="None",n[n.MeanEccentricityOutOfRange=1]="MeanEccentricityOutOfRange",n[n.MeanMotionBelowZero=2]="MeanMotionBelowZero",n[n.PerturbedEccentricityOutOfRange=3]="PerturbedEccentricityOutOfRange",n[n.SemiLatusRectumBelowZero=4]="SemiLatusRectumBelowZero",n[n.Decayed=6]="Decayed"})(Jn||(Jn={}));function Yo(n,e){let t,i,r,o,a,s,l,u,c,f,d,h,m,x,g,p,_,y,v,R,E,P,L,b,S,T,O;n.t=e,n.error=Jn.None;let H=n.mo+n.mdot*n.t,U=n.argpo+n.argpdot*n.t,N=n.nodeo+n.nodedot*n.t;c=U,E=H;let te=n.t*n.t;if(L=N+n.nodecf*te,_=1-n.cc1*n.t,y=n.bstar*n.cc4*n.t,v=n.t2cof*te,n.isimp!==1){l=n.omgcof*n.t;let se=1+n.eta*Math.cos(H);s=n.xmcof*(se*se*se-n.delmo),p=l+s,E=H+p,c=U-p,h=te*n.t,m=h*n.t,_=_-n.d2*te-n.d3*h-n.d4*m,y+=n.bstar*n.cc5*(Math.sin(E)-n.sinmao),v=v+n.t3cof*h+m*(n.t4cof+n.t*n.t5cof)}n.tempa=_,P=n.no;let D=n.ecco;if(R=n.inclo,n.method==="d"){x=n.t;let se={irez:n.irez,d2201:n.d2201,d2211:n.d2211,d3210:n.d3210,d3222:n.d3222,d4410:n.d4410,d4422:n.d4422,d5220:n.d5220,d5232:n.d5232,d5421:n.d5421,d5433:n.d5433,dedt:n.dedt,del1:n.del1,del2:n.del2,del3:n.del3,didt:n.didt,dmdt:n.dmdt,dnodt:n.dnodt,domdt:n.domdt,argpo:n.argpo,argpdot:n.argpdot,t:n.t,tc:x,gsto:n.gsto,xfact:n.xfact,xlamo:n.xlamo,no:n.no,atime:n.atime,em:D,argpm:c,inclm:R,xli:n.xli,mm:E,xni:n.xni,nodem:L,nm:P},Se=zh(se);({em:D,argpm:c,inclm:R,mm:E,nodem:L,nm:P}=Se),n.atime=Se.atime,n.xli=Se.xli,n.xni=Se.xni}if(P<=0)return n.error=Jn.MeanMotionBelowZero,null;let k=(zn/P)**Pi*_*_;if(P=zn/k**1.5,D-=y,D>=1||D<-.001)return n.error=Jn.MeanEccentricityOutOfRange,null;D<1e-6&&(D=1e-6),E+=n.no*v,S=E+c+L,L%=mt,c%=mt,S%=mt,E=(S-c-L)%mt;let J={am:k,em:D,im:R,Om:L,om:c,mm:E,nm:P},$=Math.sin(R),re=Math.cos(R),le=D;if(b=R,f=c,O=L,T=E,o=$,r=re,n.method==="d"){let se={inclo:n.inclo,init:"n",ep:le,inclp:b,nodep:O,argpp:f,mp:T,opsmode:n.operationmode},Se=vs(n,se);if({ep:le,nodep:O,argpp:f,mp:T}=Se,b=Se.inclp,b<0&&(b=-b,O+=on,f-=on),le<0||le>1)return n.error=Jn.PerturbedEccentricityOutOfRange,null}n.method==="d"&&(o=Math.sin(b),r=Math.cos(b),n.aycof=-.5*Ri*o,Math.abs(r+1)>15e-13?n.xlcof=-.25*Ri*o*(3+5*r)/(1+r):n.xlcof=-.25*Ri*o*(3+5*r)/15e-13);let q=le*Math.cos(f);p=1/(k*(1-le*le));let W=le*Math.sin(f)+p*n.aycof,oe=(T+f+O+p*n.xlcof*q-O)%mt;u=oe,g=9999.9;let de=1;for(;Math.abs(g)>=1e-12&&de<=10;)i=Math.sin(u),t=Math.cos(u),g=1-t*q-i*W,g=(oe-W*t+q*i-u)/g,Math.abs(g)>=.95&&(g>0?g=.95:g=-.95),u+=g,de+=1;let me=q*t+W*i,ue=q*i-W*t,Ce=q*q+W*W,Te=k*(1-Ce);if(Te<0)return n.error=Jn.SemiLatusRectumBelowZero,null;let Pe=k*(1-me),B=Math.sqrt(k)*ue/Pe,Oe=Math.sqrt(Te)/Pe,De=Math.sqrt(1-Ce);p=ue/(1+De);let _e=k/Pe*(i-W-q*p),pe=k/Pe*(t-q+W*p);d=Math.atan2(_e,pe);let Ue=(pe+pe)*_e,xe=1-2*_e*_e;p=1/Te;let C=.5*gi*p,w=C*p;n.method==="d"&&(a=r*r,n.con41=3*a-1,n.x1mth2=1-a,n.x7thm1=7*a-1);let X=Pe*(1-1.5*w*De*n.con41)+.5*C*n.x1mth2*xe;if(X<1)return n.error=Jn.Decayed,null;d-=.25*w*n.x7thm1*Ue;let ne=O+1.5*w*r*Ue,ae=b+1.5*w*r*o*xe,ie=B-P*C*n.x1mth2*Ue/zn,be=Oe+P*C*(n.x1mth2*xe+1.5*n.con41)/zn,he=Math.sin(d),ge=Math.cos(d),Ve=Math.sin(ne),fe=Math.cos(ne),we=Math.sin(ae),M=Math.cos(ae),Re=-Ve*M,Me=fe*M,Ge=Re*he+fe*ge,ze=Me*he+Ve*ge,qe=we*he,I=Re*ge-fe*he,ee=Me*ge-Ve*he,G=we*ge,Z={x:X*Ge*gn,y:X*ze*gn,z:X*qe*gn},ce={x:(ie*Ge+be*I)*gs,y:(ie*ze+be*ee)*gs,z:(ie*qe+be*G)*gs};return{position:Z,velocity:ce,meanElements:J}}function Hh(n,e){let{opsmode:t,satn:i,epoch:r,xbstar:o,xecco:a,xargpo:s,xinclo:l,xmo:u,xno:c,xnodeo:f}=e,d,h,m,x,g,p,_,y,v,R,E,P,L,b,S,T,O,F,H,U,N,te,D,k,J,$,re,le,q,W,j,oe,de,me,ue,Ce,Te,Pe,B,Oe,De,_e,pe,Ue,xe,C,w,X,ne,ae,ie,be,he,ge,Ve,fe,we=15e-13,M=n;M.isimp=0,M.method="n",M.aycof=0,M.con41=0,M.cc1=0,M.cc4=0,M.cc5=0,M.d2=0,M.d3=0,M.d4=0,M.delmo=0,M.eta=0,M.argpdot=0,M.omgcof=0,M.sinmao=0,M.t=0,M.t2cof=0,M.t3cof=0,M.t4cof=0,M.t5cof=0,M.x1mth2=0,M.x7thm1=0,M.mdot=0,M.nodedot=0,M.xlcof=0,M.xmcof=0,M.nodecf=0,M.irez=0,M.d2201=0,M.d2211=0,M.d3210=0,M.d3222=0,M.d4410=0,M.d4422=0,M.d5220=0,M.d5232=0,M.d5421=0,M.d5433=0,M.dedt=0,M.del1=0,M.del2=0,M.del3=0,M.didt=0,M.dmdt=0,M.dnodt=0,M.domdt=0,M.e3=0,M.ee2=0,M.peo=0,M.pgho=0,M.pho=0,M.pinco=0,M.plo=0,M.se2=0,M.se3=0,M.sgh2=0,M.sgh3=0,M.sgh4=0,M.sh2=0,M.sh3=0,M.si2=0,M.si3=0,M.sl2=0,M.sl3=0,M.sl4=0,M.gsto=0,M.xfact=0,M.xgh2=0,M.xgh3=0,M.xgh4=0,M.xh2=0,M.xh3=0,M.xi2=0,M.xi3=0,M.xl2=0,M.xl3=0,M.xl4=0,M.xlamo=0,M.zmol=0,M.zmos=0,M.atime=0,M.xli=0,M.xni=0,M.bstar=o,M.ecco=a,M.argpo=s,M.inclo=l,M.mo=u,M.no=c,M.nokozai=c,M.nodeo=f,M.operationmode=t;let Re=78/gn+1,Me=42/gn,Ge=Me*Me*Me*Me;M.init="y",M.t=0;let ze={satn:i,ecco:M.ecco,epoch:r,inclo:M.inclo,no:M.no,method:M.method,opsmode:M.operationmode},qe=kh(ze),{ao:I,con42:ee,cosio:G,cosio2:Z,eccsq:ce,omeosq:se,posq:Se,rp:Ke,rteosq:Qe,sinio:Xe}=qe;if(M.no=qe.no,M.con41=qe.con41,M.gsto=qe.gsto,M.a=(M.no*Dh)**(-2/3),M.alta=M.a*(1+M.ecco)-1,M.altp=M.a*(1-M.ecco)-1,M.error=0,se>=0||M.no>=0){if(M.isimp=0,Ke<220/gn+1&&(M.isimp=1),re=Re,N=Ge,F=(Ke-1)*gn,F<156){re=F-78,F<98&&(re=20);let yt=(120-re)/gn;N=yt*yt*yt*yt,re=re/gn+1}H=1/Se,C=1/(I-re),M.eta=I*M.ecco*C,P=M.eta*M.eta,E=M.ecco*M.eta,U=Math.abs(1-P),p=N*C**4,_=p/U**3.5,x=_*M.no*(I*(1+1.5*P+E*(4+P))+.375*gi*C/U*M.con41*(8+3*P*(8+P))),M.cc1=M.bstar*x,g=0,M.ecco>1e-4&&(g=-2*p*C*Ri*M.no*Xe/M.ecco),M.x1mth2=1-Z,M.cc4=2*M.no*_*I*se*(M.eta*(2+.5*P)+M.ecco*(.5+2*P)-gi*C/(I*U)*(-3*M.con41*(1-2*E+P*(1.5-.5*E))+.75*M.x1mth2*(2*P-E*(1+P))*Math.cos(2*M.argpo))),M.cc5=2*_*I*se*(1+2.75*(P+E)+E*P),y=Z*Z,pe=1.5*gi*H*M.no,Ue=.5*pe*gi*H,xe=-.46875*Uh*H*H*M.no,M.mdot=M.no+.5*pe*Qe*M.con41+.0625*Ue*Qe*(13-78*Z+137*y),M.argpdot=-.5*pe*ee+.0625*Ue*(7-114*Z+395*y)+xe*(3-36*Z+49*y),X=-pe*G,M.nodedot=X+(.5*Ue*(4-19*Z)+2*xe*(3-7*Z))*G,w=M.argpdot+M.nodedot,M.omgcof=M.bstar*g*Math.cos(M.argpo),M.xmcof=0,M.ecco>1e-4&&(M.xmcof=-Pi*p*M.bstar/E),M.nodecf=3.5*se*X*M.cc1,M.t2cof=1.5*M.cc1,Math.abs(G+1)>15e-13?M.xlcof=-.25*Ri*Xe*(3+5*G)/(1+G):M.xlcof=-.25*Ri*Xe*(3+5*G)/we,M.aycof=-.5*Ri*Xe;let At=1+M.eta*Math.cos(M.mo);if(M.delmo=At*At*At,M.sinmao=Math.sin(M.mo),M.x7thm1=7*Z-1,2*on/M.no>=225){M.method="d",M.isimp=1,De=0,S=M.inclo;let yt={epoch:r,ep:M.ecco,argpp:M.argpo,tc:De,inclp:M.inclo,nodep:M.nodeo,np:M.no,e3:M.e3,ee2:M.ee2,peo:M.peo,pgho:M.pgho,pho:M.pho,pinco:M.pinco,plo:M.plo,se2:M.se2,se3:M.se3,sgh2:M.sgh2,sgh3:M.sgh3,sgh4:M.sgh4,sh2:M.sh2,sh3:M.sh3,si2:M.si2,si3:M.si3,sl2:M.sl2,sl3:M.sl3,sl4:M.sl4,xgh2:M.xgh2,xgh3:M.xgh3,xgh4:M.xgh4,xh2:M.xh2,xh3:M.xh3,xi2:M.xi2,xi3:M.xi3,xl2:M.xl2,xl3:M.xl3,xl4:M.xl4,zmol:M.zmol,zmos:M.zmos},He=Oh(yt);M.e3=He.e3,M.ee2=He.ee2,M.peo=He.peo,M.pgho=He.pgho,M.pho=He.pho,M.pinco=He.pinco,M.plo=He.plo,M.se2=He.se2,M.se3=He.se3,M.sgh2=He.sgh2,M.sgh3=He.sgh3,M.sgh4=He.sgh4,M.sh2=He.sh2,M.sh3=He.sh3,M.si2=He.si2,M.si3=He.si3,M.sl2=He.sl2,M.sl3=He.sl3,M.sl4=He.sl4,{sinim:h,cosim:d,em:v,emsq:R,s1:te,s2:D,s3:k,s4:J,s5:$,ss1:le,ss2:q,ss3:W,ss4:j,ss5:oe,sz1:de,sz3:me,sz11:ue,sz13:Ce,sz21:Te,sz23:Pe,sz31:B,sz33:Oe}=He,M.xgh2=He.xgh2,M.xgh3=He.xgh3,M.xgh4=He.xgh4,M.xh2=He.xh2,M.xh3=He.xh3,M.xi2=He.xi2,M.xi3=He.xi3,M.xl2=He.xl2,M.xl3=He.xl3,M.xl4=He.xl4,M.zmol=He.zmol,M.zmos=He.zmos,{nm:O,z1:ne,z3:ae,z11:ie,z13:be,z21:he,z23:ge,z31:Ve,z33:fe}=He;let Wt={inclo:S,init:M.init,ep:M.ecco,inclp:M.inclo,nodep:M.nodeo,argpp:M.argpo,mp:M.mo,opsmode:M.operationmode},Dt=vs(M,Wt);M.ecco=Dt.ep,M.inclo=Dt.inclp,M.nodeo=Dt.nodep,M.argpo=Dt.argpp,M.mo=Dt.mp,L=0,b=0,T=0;let hn={cosim:d,emsq:R,argpo:M.argpo,s1:te,s2:D,s3:k,s4:J,s5:$,sinim:h,ss1:le,ss2:q,ss3:W,ss4:j,ss5:oe,sz1:de,sz3:me,sz11:ue,sz13:Ce,sz21:Te,sz23:Pe,sz31:B,sz33:Oe,t:M.t,tc:De,gsto:M.gsto,mo:M.mo,mdot:M.mdot,no:M.no,nodeo:M.nodeo,nodedot:M.nodedot,xpidot:w,z1:ne,z3:ae,z11:ie,z13:be,z21:he,z23:ge,z31:Ve,z33:fe,ecco:M.ecco,eccsq:ce,em:v,argpm:L,inclm:S,mm:T,nm:O,nodem:b,irez:M.irez,atime:M.atime,d2201:M.d2201,d2211:M.d2211,d3210:M.d3210,d3222:M.d3222,d4410:M.d4410,d4422:M.d4422,d5220:M.d5220,d5232:M.d5232,d5421:M.d5421,d5433:M.d5433,dedt:M.dedt,didt:M.didt,dmdt:M.dmdt,dnodt:M.dnodt,domdt:M.domdt,del1:M.del1,del2:M.del2,del3:M.del3,xfact:M.xfact,xlamo:M.xlamo,xli:M.xli,xni:M.xni},Ye=Bh(hn);M.irez=Ye.irez,M.atime=Ye.atime,M.d2201=Ye.d2201,M.d2211=Ye.d2211,M.d3210=Ye.d3210,M.d3222=Ye.d3222,M.d4410=Ye.d4410,M.d4422=Ye.d4422,M.d5220=Ye.d5220,M.d5232=Ye.d5232,M.d5421=Ye.d5421,M.d5433=Ye.d5433,M.dedt=Ye.dedt,M.didt=Ye.didt,M.dmdt=Ye.dmdt,M.dnodt=Ye.dnodt,M.domdt=Ye.domdt,M.del1=Ye.del1,M.del2=Ye.del2,M.del3=Ye.del3,M.xfact=Ye.xfact,M.xlamo=Ye.xlamo,M.xli=Ye.xli,M.xni=Ye.xni}M.isimp!==1&&(m=M.cc1*M.cc1,M.d2=4*I*C*m,_e=M.d2*C*M.cc1/3,M.d3=(17*I+re)*_e,M.d4=.5*_e*I*C*(221*I+31*re)*M.cc1,M.t3cof=M.d2+2*m,M.t4cof=.25*(3*M.d3+M.cc1*(12*M.d2+10*m)),M.t5cof=.2*(3*M.d4+12*M.cc1*M.d3+6*M.d2*M.d2+15*m*(2*M.d2+m)))}Yo(M,0),M.init="n"}function e0(n,e){Hh(n,{opsmode:e,satn:n.satnum,epoch:n.jdsatepoch-24332815e-1,xbstar:n.bstar,xecco:n.ecco,xargpo:n.argpo,xinclo:n.inclo,xmo:n.mo,xno:n.no,xnodeo:n.nodeo})}function Vh(n,e="i"){let i=n.NORAD_CAT_ID.toString(),r=n.EPOCH.endsWith("Z")?n.EPOCH:`${n.EPOCH}Z`,o=new Date(r),a=/\.(\d+)Z$/.exec(r)?.[1]??"",s=a.length>3?+`0.${a.slice(3)}`/1e3:0,l=o.getUTCFullYear(),u=Number(l.toString().slice(-2)),c=(o.valueOf()-new Date(Date.UTC(l,0,1,0,0,0)).valueOf())/(86400*1e3)+s/86400+1,f=Number(n.MEAN_MOTION_DOT),d=Number(n.MEAN_MOTION_DDOT);f/=xs*1440,d/=xs*1440*1440;let h=Number(n.BSTAR),m=Number(n.INCLINATION)*Yi,x=Number(n.RA_OF_ASC_NODE)*Yi,g=Number(n.ECCENTRICITY),p=Number(n.ARG_OF_PERICENTER)*Yi,_=Number(n.MEAN_ANOMALY)*Yi,y=Number(n.MEAN_MOTION)/xs,v=Fh(l,c),{mon:R,day:E,hr:P,minute:L,sec:b}=v,S=vr(l,R,E,P,L,b),T={error:0,satnum:i,epochyr:u,epochdays:c,ndot:f,nddot:d,bstar:h,inclo:m,nodeo:x,ecco:g,argpo:p,mo:_,no:y,jdsatepoch:S};return e0(T,e),T}var Gh=n=>n.tempa<=0;function kc(n,...e){let t=e.at(-1),i=typeof t=="object"&&!(t instanceof Date)?t:void 0,r=i?e.slice(0,-1):e,a=(vr(...r)-n.jdsatepoch)*Lh,s=Yo(n,a);return i?.communityDecayCheckEnabled&&s&&Gh(n)?(n.error=Jn.Decayed,null):s}function Wh(n,e){let i=6356.7523142,r=Math.sqrt(n.x*n.x+n.y*n.y),o=(6378.137-i)/6378.137,a=2*o-o*o,s=((Math.atan2(n.y,n.x)-e+on)%mt+mt)%mt-on,l=20,u=1e-12,c=0,f=Math.atan2(n.z,r),d;do{d=f;let p=Math.sin(f),_=1/Math.sqrt(1-a*(p*p));f=Math.atan2(n.z+6378.137*_*a*p,r)}while(Math.abs(f-d)>u&&++c<l);let h=Math.sin(f),m=Math.cos(f),x=1/Math.sqrt(1-a*(h*h)),g=r*m+n.z*h-6378.137/x;return{longitude:s,latitude:f,height:g}}var Hc=7200*1e3,t0=10080*60*1e3;function $o(n,e=Date.now()){return Array.isArray(n)?n.filter(t=>{if(!t||typeof t!="object")return!1;let i=Date.parse(String(t.EPOCH).replace(/Z$/,"")+"Z");return Number.isFinite(i)&&e-i<t0&&i-e<864e5&&["MEAN_MOTION","ECCENTRICITY","INCLINATION","RA_OF_ASC_NODE","ARG_OF_PERICENTER","MEAN_ANOMALY","BSTAR"].every(r=>Number.isFinite(t[r]))&&t.MEAN_MOTION>0&&t.ECCENTRICITY>=0&&t.ECCENTRICITY<1}).slice(0,40).flatMap(t=>{try{return[{id:String(t.NORAD_CAT_ID),name:String(t.OBJECT_NAME).slice(0,80),epoch:t.EPOCH,record:Vh(t)}]}catch{return[]}}):[]}function Ii(n,e=new Date){try{let t=kc(n.record,e);if(!t?.position)return null;let i=Wh(t.position,Xo(e)),r=i.latitude*180/Math.PI,o=i.longitude*180/Math.PI;return[r,o,i.height].every(Number.isFinite)&&i.height>80&&i.height<1e5?{lat:r,lon:o,altitude:i.height,speed:t.velocity?Math.hypot(t.velocity.x,t.velocity.y,t.velocity.z)*3600:0}:null}catch{return null}}function ys(n){try{let e=new URL(n);return e.protocol==="https:"&&!e.username&&!e.password?e.href:null}catch{return null}}async function Wr(n,e=12e3){let t=new AbortController,i=setTimeout(()=>t.abort(),e);try{let r=await fetch(n,{signal:t.signal,credentials:"omit",referrerPolicy:"no-referrer"});if(!r.ok)throw Error("HTTP "+r.status);return await r.json()}finally{clearTimeout(i)}}function Jo(n){try{return JSON.parse(localStorage.getItem(n)||"null")}catch{return null}}function jo(n,e){try{localStorage.setItem(n,JSON.stringify(e))}catch{}}async function Xh(){let n="skm-public-orbits-v1",e=Jo(n),t=Date.now();if(e&&t-e.at<Hc&&$o(e.rows,t).length)return{...e,offline:!1};try{let i=await Wr("https://celestrak.org/NORAD/elements/gp.php?GROUP=stations&FORMAT=json");if(!$o(i,t).length)throw Error("No current orbital data");let r={rows:i,at:t};return jo(n,r),{...r,offline:!1}}catch(i){if(e&&$o(e.rows,t).length)return{...e,offline:!0};throw i}}var Gr="";async function Vc(){let n="skm-radio-servers-v1",e=Jo(n),t=e&&Date.now()-e.at<864e5?e.names:null;if(!t)try{t=(await Wr("https://all.api.radio-browser.info/json/servers")).map(r=>r.name).filter(r=>/^[a-z0-9-]+\.api\.radio-browser\.info$/.test(r)),t.length&&jo(n,{at:Date.now(),names:t})}catch{t=["de1.api.radio-browser.info","de2.api.radio-browser.info"]}return[...new Set([Gr,...t||[]].filter(Boolean))].sort(()=>Math.random()-.5)}function qh(n){if(!Array.isArray(n))return[];let e=new Map;for(let t of n){let i=String(t?.name||"").toUpperCase(),r=Number(t?.stationcount);!/^[A-Z]{2}$/.test(i)||!Number.isSafeInteger(r)||r<1||e.set(i,{code:i,count:r})}return[...e.values()].sort((t,i)=>t.code.localeCompare(i.code))}function Gc(n,e="en",t=""){let i;try{i=new Intl.DisplayNames([e],{type:"region"})}catch{i=new Intl.DisplayNames(["en"],{type:"region"})}let r=new Intl.DisplayNames(["en"],{type:"region"}),o=s=>s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLocaleLowerCase().trim(),a=o(t);return n.map(s=>({...s,label:i.of(s.code)||s.code})).filter(s=>o(s.label+" "+r.of(s.code)+" "+s.code).includes(a)).sort((s,l)=>s.label.localeCompare(l.label))}var Zo;function Yh(){return Zo||(Zo=(async()=>{let n="skm-radio-countries-v1",e=Jo(n),t=Date.now(),i=qh(e?.rows);if(i.length&&t-e.at<864e5)return i;for(let r of await Vc())try{let o=await Wr("https://"+r+"/json/countrycodes?hidebroken=true"),a=qh(o);if(!a.length)continue;return Gr=r,jo(n,{at:t,rows:o}),a}catch{}if(i.length&&t-e.at<7*864e5)return i;throw Error("Radio countries unavailable")})().finally(()=>{Zo=null}),Zo)}function zc(n,e){if(!Array.isArray(n))return[];let t=new Set;return n.flatMap(i=>{if(!i||typeof i!="object")return[];let r=ys(i.url_resolved||i.url),o=ys(i.homepage),a=String(i.name||"").trim().slice(0,90),s=String(i.codec||"").toUpperCase();return!r||!a||typeof i.stationuuid!="string"||t.has(a.toLowerCase())?[]:/somafm/i.test(a+" "+r+" "+o)?[]:!["MP3","AAC","AAC+"].includes(s)&&!i.hls?[]:/\.(pls|m3u)$/i.test(new URL(r).pathname)&&!i.hls?[]:i.lastcheckok===0?[]:(t.add(a.toLowerCase()),[{id:i.stationuuid,name:a,stream:r,homepage:o,country:e||String(i.countrycode||"").toUpperCase(),codec:s,hls:!!i.hls}])}).slice(0,20)}async function Zh(n){if(!/^[A-Z]{2}$/.test(n))throw Error("Invalid country");let e="skm-radio-streams-v2-"+n,t=Jo(e);if(t&&Date.now()-t.at<216e5&&Array.isArray(t.rows))return t.rows;for(let i of await Vc())try{let r=await Wr("https://"+i+"/json/stations/search?"+new URLSearchParams({countrycode:n,hidebroken:"true",limit:"60",order:"clickcount",reverse:"true",is_https:"true"}));if(!Array.isArray(r))continue;Gr=i;let o=zc(r,n);return jo(e,{at:Date.now(),rows:o}),o}catch{}if(t&&Date.now()-t.at<864e5&&Array.isArray(t.rows))return t.rows;throw Error("Radio directory unavailable")}function Kh(n,e=Date.now()){let t=[];for(let i=0;i<=90;i++){let r=Ii(n,new Date(e+i*6e4));t.push(r)}return t}function $h(n){Gr&&/^[a-f0-9-]{36}$/.test(n)&&Wr("https://"+Gr+"/json/url/"+n,5e3).catch(()=>{})}var Ko;function Jh(){return Ko||(Ko=(async()=>{let n="skm-radio-random-v1",e=Jo(n),t=Date.now(),i=zc(e?.rows);if(i.length&&t-e.at<36e5)return i;for(let r of(await Vc()).slice(0,2))try{let o=await Wr("https://"+r+"/json/stations/search?"+new URLSearchParams({hidebroken:"true",limit:"100",order:"random",is_https:"true"}),7e3),a=zc(o);if(!a.length)continue;return Gr=r,jo(n,{at:t,rows:o}),a}catch{}if(i.length&&t-e.at<864e5)return i;throw Error("Radio directory unavailable")})().finally(()=>{Ko=null}),Ko)}function jh({createAudio:n,onChange:e=()=>{},beforePlay:t=()=>{},timeout:i=2e4}){let r=null,o=null,a="idle",s=0,l=null,u=()=>({station:o,status:a,audio:r}),c=()=>e(u()),f=()=>{clearTimeout(l),l=null};function d(){f();let p=r;r=null,p&&(p.pause(),p.removeAttribute("src"),p.load(),p.remove?.())}function h(){s++,d(),a=o?"paused":"idle",c()}function m(){s++,d(),o=null,a="idle",c()}async function x(p=o){if(!p||!ys(p.stream))return;let _=++s;d(),o=p,a="loading";let y=n();r=y,y.preload="none",y.src=p.stream;let v=()=>s===_&&r===y,R=()=>{v()&&(s++,d(),a="error",c())},E=()=>{v()&&(a="loading",f(),l=setTimeout(R,i),c())};y.addEventListener("playing",()=>{v()&&(f(),a="playing",c())}),y.addEventListener("waiting",E),y.addEventListener("stalled",()=>{v()&&!l&&(l=setTimeout(R,i))}),y.addEventListener("error",R),y.addEventListener("ended",R),y.addEventListener("pause",()=>{v()&&a!=="error"&&h()}),l=setTimeout(R,i),c();try{t(y,p),await y.play()}catch{R()}}function g(){a==="playing"||a==="loading"?h():x()}return{play:x,pause:h,stop:m,toggle:g,snapshot:u}}var _s=[{id:"kilauea",name:"K\u012Blauea \xB7 West crater",lat:19.42,lon:-155.29,video:"HggWKlZv9yk",publisher:"USGS",source:"https://www.usgs.gov/volcanoes/kilauea/summit-webcams"},{id:"kilauea-east-crater",name:"K\u012Blauea \xB7 East crater",lat:19.42,lon:-155.29,video:"f9-oSpYpubg",publisher:"USGS",source:"https://www.youtube.com/watch?v=f9-oSpYpubg"},{id:"kilauea-south-crater",name:"K\u012Blauea \xB7 South crater",lat:19.42,lon:-155.29,video:"gXKuUyKt8mc",publisher:"USGS",source:"https://www.youtube.com/watch?v=gXKuUyKt8mc"},{id:"brooks-river",name:"Brooks River \xB7 River watch",lat:58.555,lon:-155.78,video:"wkVLYfU-Kew",publisher:"NPS / explore.org",source:"https://www.nps.gov/katm/learn/photosmultimedia/river-watch-cam.htm"},{id:"brooks-underwater-salmon",name:"Brooks River \xB7 Underwater salmon",lat:58.555,lon:-155.78,video:"vu7I315gQpU",publisher:"Explore Bears",source:"https://www.youtube.com/watch?v=vu7I315gQpU"},{id:"brooks-river-bend",name:"Brooks River \xB7 River bend",lat:58.555,lon:-155.78,video:"cTsjMtjRLCo",publisher:"Explore Bears",source:"https://www.youtube.com/watch?v=cTsjMtjRLCo"},{id:"brooks-falls-brown-bears",name:"Brooks Falls \xB7 Brown bears",lat:58.554,lon:-155.791,video:"J7ZrIDvqlic",publisher:"Explore Live Nature Cams",source:"https://www.youtube.com/watch?v=J7ZrIDvqlic"},{id:"brooks-falls-low-view",name:"Brooks Falls \xB7 Low view",lat:58.554,lon:-155.791,video:"EwTH5yY7Mks",publisher:"Explore Bears",source:"https://www.youtube.com/watch?v=EwTH5yY7Mks"},{id:"brooks-falls-riffles",name:"Brooks Falls \xB7 Riffles",lat:58.554,lon:-155.791,video:"z7_GhJeFxQI",publisher:"Explore Bears",source:"https://www.youtube.com/watch?v=z7_GhJeFxQI"},{id:"katmai-katmai",name:"Dumpling Mountain \xB7 Katmai",lat:58.58,lon:-155.8,video:"uLgdUiT9WZQ",publisher:"Explore Northern Lights & Nature Meditation Cams",source:"https://www.youtube.com/watch?v=uLgdUiT9WZQ"},{id:"juneau-glacier-lake",name:"Mendenhall Glacier \xB7 Glacier lake",lat:58.42,lon:-134.55,video:"jJI5w_RVGtQ",publisher:"Explore Northern Lights & Nature Meditation Cams",source:"https://www.youtube.com/watch?v=jJI5w_RVGtQ"},{id:"fairbanks-aurora",name:"Fairbanks \xB7 Aurora",lat:64.84,lon:-147.72,video:"O52zDyxg5QI",publisher:"Explore Northern Lights & Nature Meditation Cams",source:"https://www.youtube.com/watch?v=O52zDyxg5QI"},{id:"churchill-northern-lights",name:"Churchill \xB7 Northern lights",lat:58.74,lon:-93.82,video:"a0i1Kg6fROg",publisher:"Explore Northern Lights & Nature Meditation Cams",source:"https://www.youtube.com/watch?v=a0i1Kg6fROg"},{id:"ontario-boreal-birds",name:"Manitouwadge \xB7 Boreal birds",lat:49.12,lon:-85.83,video:"wTVDrtShk7Y",publisher:"Cornell Lab Bird Cams",source:"https://www.youtube.com/watch?v=wTVDrtShk7Y"},{id:"montana-ospreys",name:"Hellgate Canyon \xB7 Ospreys",lat:46.88,lon:-113.93,video:"J7HO0dkkomE",publisher:"Cornell Lab Bird Cams",source:"https://www.youtube.com/watch?v=J7HO0dkkomE"},{id:"ninepipes-mission-mountains",name:"Ninepipes \xB7 Mission Mountains",lat:47.45,lon:-114.1,video:"wDgZkzkOP-s",publisher:"Explore Northern Lights & Nature Meditation Cams",source:"https://www.youtube.com/watch?v=wDgZkzkOP-s"},{id:"ithaca-red-tailed-hawks",name:"Ithaca \xB7 Red-tailed hawks",lat:42.45,lon:-76.48,video:"afsaYKQ3vac",publisher:"Cornell Lab Bird Cams",source:"https://www.youtube.com/watch?v=afsaYKQ3vac"},{id:"sapsucker-woodland-birds",name:"Sapsucker Woods \xB7 Woodland birds",lat:42.48,lon:-76.45,video:"x10vL6_47Dw",publisher:"Cornell Lab Bird Cams",source:"https://www.youtube.com/watch?v=x10vL6_47Dw"},{id:"ely-international-wolf-center",name:"Ely \xB7 International Wolf Center",lat:47.94,lon:-91.83,video:"5e4lsEe4Vew",publisher:"Explore Live Nature Cams",source:"https://www.youtube.com/watch?v=5e4lsEe4Vew"},{id:"decorah-north-nest",name:"Decorah \xB7 North nest",lat:43.3,lon:-91.78,video:"GGIE1E-kaMQ",publisher:"Explore Live Nature Cams",source:"https://www.youtube.com/watch?v=GGIE1E-kaMQ"},{id:"decorah-bald-eagles",name:"Decorah \xB7 Bald eagles",lat:43.3,lon:-91.78,video:"IVmL3diwJuw",publisher:"Explore Eagle Nest Cams",source:"https://www.youtube.com/watch?v=IVmL3diwJuw"},{id:"monterey-monterey-bay",name:"Monterey Bay Aquarium \xB7 Monterey Bay",lat:36.618,lon:-121.901,video:"fVa6-zCBR7A",publisher:"Monterey Bay Aquarium",source:"https://www.youtube.com/watch?v=fVa6-zCBR7A"},{id:"monterey-kelp-forest",name:"Monterey Bay Aquarium \xB7 Kelp forest",lat:36.618,lon:-121.901,video:"w3LjpFhySTg",publisher:"Monterey Bay Aquarium",source:"https://www.youtube.com/watch?v=w3LjpFhySTg"},{id:"monterey-sea-otters",name:"Monterey Bay Aquarium \xB7 Sea otters",lat:36.618,lon:-121.901,video:"abbR-Ttd-cA",publisher:"Monterey Bay Aquarium",source:"https://www.youtube.com/watch?v=abbR-Ttd-cA"},{id:"monterey-moon-jellies",name:"Monterey Bay Aquarium \xB7 Moon jellies",lat:36.618,lon:-121.901,video:"zL68biE6wAs",publisher:"Monterey Bay Aquarium",source:"https://www.youtube.com/watch?v=zL68biE6wAs"},{id:"monterey-sharks",name:"Monterey Bay Aquarium \xB7 Sharks",lat:36.618,lon:-121.901,video:"tEtg5Kg3voQ",publisher:"Monterey Bay Aquarium",source:"https://www.youtube.com/watch?v=tEtg5Kg3voQ"},{id:"monterey-spider-crabs",name:"Monterey Bay Aquarium \xB7 Spider crabs",lat:36.618,lon:-121.901,video:"dzmJXWmA2EM",publisher:"Monterey Bay Aquarium",source:"https://www.youtube.com/watch?v=dzmJXWmA2EM"},{id:"monterey-open-sea",name:"Monterey Bay Aquarium \xB7 Open sea",lat:36.618,lon:-121.901,video:"n_GpVsz4nHU",publisher:"Monterey Bay Aquarium",source:"https://www.youtube.com/watch?v=n_GpVsz4nHU"},{id:"monterey-penguins",name:"Monterey Bay Aquarium \xB7 Penguins",lat:36.618,lon:-121.901,video:"QWGYS9IOqYc",publisher:"Monterey Bay Aquarium",source:"https://www.youtube.com/watch?v=QWGYS9IOqYc"},{id:"monterey-aviary",name:"Monterey Bay Aquarium \xB7 Aviary",lat:36.618,lon:-121.901,video:"AWJi0LgyA28",publisher:"Monterey Bay Aquarium",source:"https://www.youtube.com/watch?v=AWJi0LgyA28"},{id:"monterey-coral-reef",name:"Monterey Bay Aquarium \xB7 Coral reef",lat:36.618,lon:-121.901,video:"1VBPxAkaNDU",publisher:"Monterey Bay Aquarium",source:"https://www.youtube.com/watch?v=1VBPxAkaNDU"},{id:"monterey-jellyfish",name:"Monterey Bay Aquarium \xB7 Jellyfish",lat:36.618,lon:-121.901,video:"eQ_foBERmzA",publisher:"Monterey Bay Aquarium",source:"https://www.youtube.com/watch?v=eQ_foBERmzA"},{id:"catalina-marine-reserve",name:"Catalina Island \xB7 Marine reserve",lat:33.46,lon:-118.52,video:"JH_NzhSsqis",publisher:"Explore Oceans",source:"https://www.youtube.com/watch?v=JH_NzhSsqis"},{id:"catalina-two-harbors-eagles",name:"Catalina Island \xB7 Two Harbors eagles",lat:33.46,lon:-118.52,video:"E5T2eHM8tcI",publisher:"Explore Eagle Nest Cams",source:"https://www.youtube.com/watch?v=E5T2eHM8tcI"},{id:"catalina-west-end-eagles",name:"Catalina Island \xB7 West End eagles",lat:33.46,lon:-118.52,video:"aT1adgYSfbc",publisher:"Explore Eagle Nest Cams",source:"https://www.youtube.com/watch?v=aT1adgYSfbc"},{id:"santa-cruz-sauces-eagles",name:"Santa Cruz Island \xB7 Sauces eagles",lat:34,lon:-119.8,video:"rnTsOesC6hE",publisher:"Explore Eagle Nest Cams",source:"https://www.youtube.com/watch?v=rnTsOesC6hE"},{id:"santa-cruz-fraser-point",name:"Santa Cruz Island \xB7 Fraser Point",lat:34,lon:-119.8,video:"OY4V_AppZ6s",publisher:"Explore Eagle Nest Cams",source:"https://www.youtube.com/watch?v=OY4V_AppZ6s"},{id:"homosassa-manatees",name:"Homosassa Springs \xB7 Manatees",lat:28.8,lon:-82.59,video:"Fz6sl9YJZE0",publisher:"Explore Live Nature Cams",source:"https://www.youtube.com/watch?v=Fz6sl9YJZE0"},{id:"silver-springs-underwater",name:"Silver Springs \xB7 Underwater",lat:29.22,lon:-82.05,video:"uWiJ9qCYxoo",publisher:"Explore Oceans",source:"https://www.youtube.com/watch?v=uWiJ9qCYxoo"},{id:"silver-springs-river-surface",name:"Silver Springs \xB7 River surface",lat:29.22,lon:-82.05,video:"jxnehowX-9Y",publisher:"Explore Oceans",source:"https://www.youtube.com/watch?v=jxnehowX-9Y"},{id:"utila-reef-wall",name:"\xDAtila \xB7 Reef wall",lat:16.08,lon:-86.97,video:"Sq-X4Ga1oyc",publisher:"Explore Oceans",source:"https://www.youtube.com/watch?v=Sq-X4Ga1oyc"},{id:"utila-shallow-reef",name:"\xDAtila \xB7 Shallow reef",lat:16.08,lon:-86.97,video:"Kf-x20Yq0_A",publisher:"Explore Oceans",source:"https://www.youtube.com/watch?v=Kf-x20Yq0_A"},{id:"utila-sand-channel",name:"\xDAtila \xB7 Sand channel",lat:16.08,lon:-86.97,video:"jzx_n25g3kA",publisher:"Explore Oceans",source:"https://www.youtube.com/watch?v=jzx_n25g3kA"},{id:"utila-reef-crest",name:"\xDAtila \xB7 Reef crest",lat:16.08,lon:-86.97,video:"1zcIUk66HX4",publisher:"Explore Oceans",source:"https://www.youtube.com/watch?v=1zcIUk66HX4"},{id:"canopy-tower-hummingbirds",name:"Soberan\xEDa \xB7 Hummingbirds",lat:9.08,lon:-79.66,video:"0xFARCdZ3vA",publisher:"Cornell Lab Bird Cams",source:"https://www.youtube.com/watch?v=0xFARCdZ3vA"},{id:"canopy-lodge-tropical-birds",name:"El Valle de Ant\xF3n \xB7 Tropical birds",lat:8.61,lon:-80.13,video:"WtoxxHADnGk",publisher:"Cornell Lab Bird Cams",source:"https://www.youtube.com/watch?v=WtoxxHADnGk"},{id:"otago-royal-albatross",name:"Taiaroa Head \xB7 Royal albatross",lat:-45.78,lon:170.73,video:"Mm_zVDDUeNA",publisher:"Cornell Lab Bird Cams",source:"https://www.youtube.com/watch?v=Mm_zVDDUeNA"},{id:"mindanao-philippine-eagles",name:"Davao \xB7 Philippine eagles",lat:7,lon:125.39,video:"QoKy-rn66og",publisher:"Explore Eagle Nest Cams",source:"https://www.youtube.com/watch?v=QoKy-rn66og"},{id:"namib-desert-waterhole",name:"Gondwana Namib Park \xB7 Desert waterhole",lat:-24.11,lon:15.89,video:"ydYDqZQpim8",publisher:"NamibiaCam",source:"https://www.youtube.com/watch?v=ydYDqZQpim8"},{id:"kalahari-kalahari-desert",name:"Gondwana Kalahari Park \xB7 Kalahari Desert",lat:-24.4,lon:17.96,video:"ME0dPuBtzug",publisher:"NamibiaCam",source:"https://www.youtube.com/watch?v=ME0dPuBtzug"},{id:"etosha-etosha-waterhole",name:"Okaukuejo \xB7 Etosha waterhole",lat:-19.18,lon:15.92,video:"AeMUdOPFcXI",publisher:"NamibiaCam",source:"https://www.youtube.com/watch?v=AeMUdOPFcXI"},{id:"tembe-elephants",name:"Tembe Elephant Park \xB7 Elephants",lat:-27.04,lon:32.42,video:"0P_LBKqVbfs",publisher:"Explore Live Nature Cams",source:"https://www.youtube.com/watch?v=0P_LBKqVbfs"},{id:"selati-black-eagles",name:"Selati Game Reserve \xB7 Black eagles",lat:-23.95,lon:30.72,video:"_xhLV-TJpd8",publisher:"Explore Eagle Nest Cams",source:"https://www.youtube.com/watch?v=_xhLV-TJpd8"},{id:"lisbon-waterfall",name:"Lisbon Falls \xB7 Waterfall",lat:-24.86,lon:30.83,video:"-qwXenyHDN4",publisher:"Explore Northern Lights & Nature Meditation Cams",source:"https://www.youtube.com/watch?v=-qwXenyHDN4"},{id:"loch-garten",name:"Loch Garten \xB7 Ospreys",lat:57.24,lon:-3.7,video:"1UByY8ca7qs",publisher:"RSPB",source:"https://www.youtube.com/watch?v=1UByY8ca7qs"},{id:"loch-leven",name:"Loch Leven \xB7 Red squirrels",lat:56.2,lon:-3.38,video:"FhMFae-SZME",publisher:"RSPB",source:"https://www.youtube.com/watch?v=FhMFae-SZME"},{id:"lorton-meadows",name:"Lorton Meadows",lat:50.65,lon:-2.46,video:"UVeaxLRI83I",publisher:"Dorset Wildlife Trust",source:"https://www.youtube.com/watch?v=UVeaxLRI83I"},{id:"utsjoki",name:"Utsjoki \xB7 Aurora",lat:69.91,lon:27.03,video:"Iw5VhekzbxE",publisher:"Aurora Borealis (LIVE!)",source:"https://www.youtube.com/watch?v=Iw5VhekzbxE"}];var Wc=[{id:"iss-earth-hd",name:"ISS \xB7 Earth view HD",norad:"25544",publisher:"NASA",video:"ROboUHfPUrU",source:"https://www.nasa.gov/live/"},{id:"iss-station-live",name:"ISS \xB7 Station camera",norad:"25544",publisher:"NASA",video:"M3HKLzjvKPc",source:"https://www.nasa.gov/live/"}];function Qh({root:n,layer:e,vector:t,R:i,cities:r,selectedCity:o,focusPoint:a,followPoint:s,setCameras:l,openCamera:u,wake:c,isVisible:f}){let d=()=>window.SKMLanguage?.code==="ko",h=(I,ee)=>d()?I:ee,m=(I,ee,G)=>{let Z=document.createElement(I);return ee&&(Z.textContent=ee),G&&(Z.className=G),Z},x=n.querySelector(".earth-app"),g=n.querySelector(".survey-dock"),p=m("button","LIVE");p.type="button",p.dataset.survey="live",p.setAttribute("aria-expanded","false"),g.append(p);let _=m("section",null,"earth-live-panel");_.hidden=!0,_.setAttribute("aria-label","Live map"),x.append(_);let y=m("header"),v=m("strong","LIVE"),R=m("button","\xD7");R.type="button",R.setAttribute("aria-label","Close live map"),y.append(v,R),_.append(y);let E=m("nav"),P=m("div",null,"earth-live-body");_.append(E,P);let L="satellites",b=!0,S=[],T=null,O=0,F=0,H=!1,U=0,N=null,te=!1,D=[],k=0,J=o()?.country||"US",$=new Map,re=new Map,le={satellites:["\uC704\uC131","SATELLITES"],radio:["\uB77C\uB514\uC624","RADIO"],cameras:["\uCE74\uBA54\uB77C","CAMERAS"]};function q(){for(let[I,ee]of re)ee.textContent=h(...le[I]),ee.setAttribute("aria-pressed",String(L===I))}for(let I of Object.keys(le)){let ee=m("button");ee.type="button",ee.onclick=()=>{L=I,q(),qe()},E.append(ee),re.set(I,ee)}q();function W(){_.hidden=!1,pe.hidden=!0,p.setAttribute("aria-expanded","true"),n.querySelector(".survey-cities").hidden=!0,n.querySelector("[data-survey=cities]").setAttribute("aria-expanded","false"),q(),qe()}function j(){_.hidden=!0,p.setAttribute("aria-expanded","false"),F++,Re(),c()}p.onclick=()=>_.hidden?W():j(),R.onclick=j,n.querySelector("[data-survey=cities]").addEventListener("click",()=>{fe(),j()}),document.addEventListener("keydown",I=>{I.key==="Escape"&&(_.hidden?fe():j())});let oe=(I,ee)=>{let G=m("a",I+" \u2197","earth-live-source");return G.href=ee,G.target="_blank",G.rel="noopener noreferrer",G};function de(I,ee,G){let Z=m("button",null,"earth-live-row");return Z.type="button",Z.append(m("span",I)),ee&&Z.append(m("small",ee)),Z.onclick=G,Z}let me=m("section",null,"earth-radio-mini");me.hidden=!0,me.setAttribute("aria-label","Radio player");let ue=m("button",null,"earth-radio-info"),Ce=m("strong"),Te=m("small");ue.type="button",ue.append(Ce,Te),ue.onclick=()=>{L="radio",W()};let Pe=m("button","\u25B6"),B=m("button","\xD7");Pe.type=B.type="button",B.setAttribute("aria-label","Close radio player"),me.append(ue,Pe,B),x.append(me);let Oe=null;function De(I){me.hidden=!I.station,me.dataset.status=I.status,n.classList.toggle("radio-active",!!I.station),Ce.textContent=I.station?.name||"";let ee={loading:["\uC5F0\uACB0 \uC911\u2026","CONNECTING\u2026"],playing:["\uC7AC\uC0DD \uC911","LIVE RADIO"],paused:["\uC77C\uC2DC \uC815\uC9C0","PAUSED"],error:["\uC5F0\uACB0 \uC2E4\uD328 \xB7 \uB2E4\uC2DC \uC7AC\uC0DD","UNAVAILABLE \xB7 RETRY"]};Te.textContent=ee[I.status]?h(...ee[I.status]):"";let G=I.status==="playing"||I.status==="loading";Pe.textContent=G?"\u2161":"\u25B6",Pe.setAttribute("aria-label",G?h("\uB77C\uB514\uC624 \uC77C\uC2DC \uC815\uC9C0","Pause radio"):h("\uB77C\uB514\uC624 \uC7AC\uC0DD","Play radio"));for(let Z of P.querySelectorAll("[data-radio-id]")){let ce=Z.dataset.radioId===I.station?.id&&G;Z.setAttribute("aria-pressed",String(ce)),Z.querySelector("small").textContent=ce?"\u2161":"\u25B6"}}let _e=jh({createAudio:()=>{let I=m("audio");return I.hidden=!0,I.dataset.skmRadio="true",x.append(I),I},onChange:I=>{Oe?.observe(I),De(I)},beforePlay:(I,ee)=>{for(let G of document.querySelectorAll("audio,video"))G!==I&&!G.paused&&G.pause();try{window.SKMApp?.audio?.("playback")}catch{}$h(ee.id)}});Oe=Ih({loadStations:Jh,play:I=>(J=I.country||J,_e.play(I)),current:()=>_e.snapshot().station,canPlay:()=>!document.hidden&&f(),onSearching:I=>{if(!I){De(_e.snapshot());return}I&&(me.hidden=!1,n.classList.add("radio-active"),me.dataset.status="loading",Ce.textContent=h("\uB79C\uB364 \uB77C\uB514\uC624","RANDOM RADIO"),Te.textContent=h("\uC5F0\uACB0 \uC911\u2026","CONNECTING\u2026"),Pe.textContent="\u2161",Pe.setAttribute("aria-label",h("\uB77C\uB514\uC624 \uC77C\uC2DC \uC815\uC9C0","Pause radio")))},onError:()=>{me.hidden=!1,n.classList.add("radio-active"),me.dataset.status="error",Ce.textContent=h("\uB79C\uB364 \uB77C\uB514\uC624","RANDOM RADIO"),Te.textContent=h("\uC5F0\uACB0 \uC2E4\uD328 \xB7 \uB2E4\uC2DC \uC7AC\uC0DD","UNAVAILABLE \xB7 RETRY"),Pe.textContent="\u25B6",Pe.setAttribute("aria-label",h("\uB77C\uB514\uC624 \uC7AC\uC0DD","Play radio"))}}),Oe.prefetch().catch(()=>{}),Pe.onclick=()=>{let I=me.dataset.status==="loading";Oe.cancel(),_e.snapshot().station?_e.toggle():I?_e.stop():Oe.start()},B.onclick=()=>{Oe.cancel(),_e.stop()},document.addEventListener("play",I=>{let ee=_e.snapshot();I.target!==ee.audio&&(ee.status==="playing"||ee.status==="loading")&&_e.pause()},!0),window.addEventListener("pagehide",()=>{Oe.cancel(),_e.stop()}),document.addEventListener("visibilitychange",()=>{document.hidden&&Oe.cancel()});let pe=m("section",null,"earth-orbit-detail");pe.hidden=!0,pe.setAttribute("aria-label","Satellite details");let Ue=m("header"),xe=m("strong"),C=m("button","\xD7");C.type="button",C.setAttribute("aria-label","Close satellite details"),C.onclick=()=>fe(),Ue.append(xe,C);let w=m("div",null,"earth-orbit-metrics"),X=m("p",null,"earth-live-note"),ne=m("p",null,"earth-live-note"),ae=m("div",null,"earth-orbit-actions"),ie=m("div",null,"earth-space-cameras"),be=m("button"),he=m("button");be.type=he.type="button",ae.append(be,he),pe.append(Ue,w,X,ae,ne,ie),x.append(pe);let ge=document.createElementNS("http://www.w3.org/2000/svg","svg"),Ve=document.createElementNS("http://www.w3.org/2000/svg","path");ge.classList.add("earth-orbit-trail"),ge.setAttribute("aria-hidden","true"),ge.append(Ve),e.prepend(ge);function fe(){N=null,te=!1,D=[],pe.hidden=!0,Ve.setAttribute("d",""),c()}function we(){te=!1,Re()}function M(I){N=I,te=!1,b=!0,k=0;let ee=Ii(I);ee&&a(ee.lat,ee.lon),j(),c()}be.onclick=()=>{te=!te;let I=N&&Ii(N);te&&I&&a(I.lat,I.lon),Re(),c()},he.onclick=()=>{let I=N&&Ii(N);I&&a(I.lat,I.lon)};function Re(){if(pe.hidden=!N||!b||!_.hidden,pe.hidden)return;let I=Ii(N);xe.textContent=N.name,be.textContent=te?h("\uCD94\uC801 \uC911","FOLLOWING"):h("\uB530\uB77C\uAC00\uAE30","FOLLOW"),be.setAttribute("aria-pressed",String(te)),he.textContent=h("\uC911\uC559\uC73C\uB85C","CENTER"),w.replaceChildren();for(let[ee,G]of[[h("\uACE0\uB3C4","ALTITUDE"),I?Math.round(I.altitude)+" km":"\u2014"],[h("\uC18D\uB3C4","SPEED"),I?Math.round(I.speed).toLocaleString()+" km/h":"\u2014"]]){let Z=m("div");Z.append(m("small",ee),m("strong",G)),w.append(Z)}if(X.textContent=I?`${Math.abs(I.lat).toFixed(2)}\xB0${I.lat>=0?"N":"S"}  /  ${Math.abs(I.lon).toFixed(2)}\xB0${I.lon>=0?"E":"W"}`:h("\uD604\uC7AC \uC704\uCE58\uB97C \uACC4\uC0B0\uD560 \uC218 \uC5C6\uC5B4\uC694.","Position unavailable."),ie.dataset.satellite!==N.id){ie.dataset.satellite=N.id,ie.replaceChildren();let ee=Wc.filter(G=>String(G.norad)===N.id);for(let G of ee)ie.append(de(G.name,"\u25B7",()=>{_e.pause(),u(G)}));ee.length&&ie.append(m("p",h("NASA \uC1A1\uCD9C \xB7 \uC911\uB2E8 \uC2DC \uC548\uB0B4 \uD654\uBA74\uC774 \uB098\uC62C \uC218 \uC788\uC5B4\uC694.","NASA feed \xB7 May show a standby screen during outages."),"earth-live-note"))}ne.textContent=h("\uADA4\uB3C4 \uAE30\uBC18 \uCD94\uC815 \xB7 \uC810\uC120\uC740 \uD5A5\uD6C4 90\uBD84 \uACBD\uB85C","ORBIT ESTIMATE \xB7 DOTTED PATH: NEXT 90 MIN")}function Me(){for(let I of $.values())I.button.hidden=!0;Ve.setAttribute("d","")}function Ge(I){if($.has(I.id))return $.get(I.id).item=I,$.get(I.id);let ee=m("button",null,"earth-satellite-pin");ee.type="button",ee.setAttribute("aria-label",I.name),ee.append(m("span","\u25C7"),m("small",I.name));let G={button:ee,item:I,point:null};return ee.onclick=()=>M(G.item),e.append(ee),$.set(I.id,G),G}async function ze(){if(!H){H=!0;try{T=await Xh(),S=$o(T.rows),U=Date.now(),O=0,Me();for(let[I,ee]of $)S.some(G=>G.id===I)||(ee.button.remove(),$.delete(I));for(let I of S)Ge(I);N&&(N=S.find(I=>I.id===N.id)||null,k=0,N||(te=!1))}catch{S=[];for(let I of $.values())I.button.remove();$.clear(),fe()}finally{H=!1,c(),!_.hidden&&L==="satellites"&&qe()}}}async function qe(){let I=++F;if(P.replaceChildren(),L==="satellites"){let ee=de(h("\uC9C0\uB3C4\uC5D0 \uD45C\uC2DC","SHOW ON MAP"),b?"ON":"OFF",()=>{b=!b,b&&!S.length&&ze(),b||(Me(),fe()),qe(),c()});ee.setAttribute("aria-pressed",String(b)),P.append(ee),P.append(m("p",H?h("\uADA4\uB3C4 \uBD88\uB7EC\uC624\uB294 \uC911\u2026","Loading orbits\u2026"):h("\uACF5\uAC1C \uADA4\uB3C4\uB85C \uACC4\uC0B0\uD55C \uD604\uC7AC \uC704\uCE58","Current positions estimated from orbital data"),"earth-live-note")),!S.length&&!H&&P.append(de(h("\uADA4\uB3C4 \uB2E4\uC2DC \uBD88\uB7EC\uC624\uAE30","RELOAD ORBITS"),"\u21BB",()=>{b=!0,ze(),qe()})),T&&P.append(m("p",(T.offline?h("\uC800\uC7A5\uB41C \uADA4\uB3C4 \xB7 ","Cached orbits \xB7 "):"")+new Date(T.at).toLocaleString(),"earth-live-note"));for(let G of S){let Z=Ii(G);Z&&P.append(de(G.name,Math.round(Z.altitude)+" km",()=>M(G)))}P.append(oe("CelesTrak","https://celestrak.org/NORAD/elements/"))}else if(L==="radio"){let Wt=function(){if(Se.replaceChildren(),At){Se.append(m("p",h("\uAD6D\uAC00 \uBD88\uB7EC\uC624\uB294 \uC911\u2026","Loading countries\u2026"),"earth-live-note"));return}if(yt){Se.append(de(h("\uC5F0\uACB0 \uC2E4\uD328 \xB7 \uB2E4\uC2DC \uC2DC\uB3C4","UNAVAILABLE \xB7 RETRY"),"\u21BB",()=>void Dt()));return}let Ye=Gc(Xe,ee,se.value);Ye.length||Se.append(m("p",h("\uC77C\uCE58\uD558\uB294 \uAD6D\uAC00\uAC00 \uC5C6\uC5B4\uC694.","No matching countries."),"earth-live-note"));for(let nn of Ye)Se.append(de(nn.label,nn.code,()=>{J=nn.code,Z.querySelector("span").textContent=nn.label,ce.hidden=!0,Ke.hidden=!1,Z.setAttribute("aria-expanded","false"),se.value="",hn()}))},ee=window.SKMLanguage?.code||"en",Z=de((Ye=>Gc([{code:Ye}],ee)[0]?.label||Ye)(J),"\u2304",()=>{let Ye=ce.hidden;ce.hidden=!Ye,Ke.hidden=Ye,Z.setAttribute("aria-expanded",String(Ye)),Ye&&(se.focus(),Wt())});Z.setAttribute("aria-label",h("\uB77C\uB514\uC624 \uAD6D\uAC00 \uC120\uD0DD","Choose radio country")),Z.setAttribute("aria-expanded","false");let ce=m("div",null,"earth-radio-countries");ce.hidden=!0;let se=m("input");se.type="search",se.placeholder=h("\uAD6D\uAC00 \uAC80\uC0C9","Search countries"),se.setAttribute("aria-label",se.placeholder),se.autocomplete="off",se.spellcheck=!1;let Se=m("div"),Ke=m("div"),Qe=m("div");ce.append(se,Se),Ke.append(m("p",h("\uBC29\uC1A1\uAD6D \uC120\uD0DD \u2192 \uC9C0\uAD6C\uBCF8\uC744 \uBCF4\uBA74\uC11C \uB4E3\uAE30","Choose a station. Keep listening as you explore."),"earth-live-note"),Qe),P.append(Z,ce,Ke,oe("Radio Browser","https://www.radio-browser.info/"));let Xe=[],At=!0,yt=!1,He=0;async function Dt(){At=!0,yt=!1,Wt();try{let Ye=await Yh();if(I!==F)return;Xe=Ye}catch{yt=!0}finally{At=!1,I===F&&Wt()}}async function hn(){let Ye=J,nn=++He;Qe.replaceChildren(m("p",h("\uBD88\uB7EC\uC624\uB294 \uC911\u2026","Loading\u2026")));try{let Ln=await Zh(Ye);if(I!==F||nn!==He)return;Qe.replaceChildren();for(let Dn of Ln){let rn=de(Dn.name,"\u25B6",()=>{Oe.cancel(),_e.snapshot().station?.id===Dn.id?_e.toggle():_e.play(Dn)});rn.dataset.radioId=Dn.id,Qe.append(rn)}Ln.length||Qe.append(m("p",h("\uC571\uC5D0\uC11C \uC7AC\uC0DD \uAC00\uB2A5\uD55C \uBC29\uC1A1\uAD6D\uC774 \uC544\uC9C1 \uC5C6\uC5B4\uC694. \uB2E4\uB978 \uAD6D\uAC00\uB97C \uC120\uD0DD\uD574 \uC8FC\uC138\uC694.","No compatible stations here yet. Choose another country."))),De(_e.snapshot())}catch{I===F&&nn===He&&Qe.replaceChildren(de(h("\uC5F0\uACB0 \uC2E4\uD328 \xB7 \uB2E4\uC2DC \uC2DC\uB3C4","UNAVAILABLE \xB7 RETRY"),"\u21BB",()=>void hn()))}}se.oninput=Wt,Dt(),hn()}else{let se=function(){Z.replaceChildren();let Se=G.value.toLocaleLowerCase();for(let Ke of _s.filter(Qe=>(Qe.name+" "+Qe.publisher).toLocaleLowerCase().includes(Se)))Z.append(de(Ke.name,Ke.publisher,()=>{fe(),a(Ke.lat,Ke.lon),j(),u(Ke)}))},ee=de(h("\uC9C0\uB3C4\uC5D0 \uD45C\uC2DC","SHOW ON MAP"),n.dataset.cameras==="off"?"OFF":"ON",()=>{let Se=n.dataset.cameras==="off";n.dataset.cameras=Se?"on":"off",l(Se),qe()});ee.setAttribute("aria-pressed",String(n.dataset.cameras!=="off")),P.append(ee);for(let Se of Wc)P.append(de(Se.name,"NASA \xB7 \u25B7",()=>{_e.pause(),j(),u(Se)}));let G=m("input");G.type="search",G.placeholder=h("\uC7A5\uC18C \uAC80\uC0C9","Search places"),G.setAttribute("aria-label",G.placeholder);let Z=m("div");P.append(G);let ce=m("a",h("\uB274\uC695 \xB7 \uD0C0\uC784\uC2A4\uD018\uC5B4 \u2197","New York \xB7 Times Square \u2197"),"earth-live-row");ce.href="https://www.earthcam.com/usa/newyork/timessquare/",ce.target="_blank",ce.rel="noopener noreferrer",P.append(ce,Z),G.oninput=se,se()}}return ze(),{hide:j,stopFollowing:we,dismissSatellite:fe,randomRadio:()=>Oe.start(),render(I){if(!b||!f()){Me();return}let ee=Date.now();if(ee-U>Hc&&!H&&(U=ee,ze()),ee-O>1e3){O=ee;for(let Z of $.values()){let ce=Ii(Z.item,new Date(ee));Z.point=ce?t(ce.lat,ce.lon,i*(1+ce.altitude/6371)):null}if(N){let Z=Ii(N,new Date(ee));te&&Z&&s(Z.lat,Z.lon),Re()}}let G=[];Me();for(let Z of[...$.values()].sort((ce,se)=>(se.item.id===N?.id)-(ce.item.id===N?.id))){let ce=Z.point&&I(Z.point);if(!ce)continue;let se=G.find(Se=>Math.hypot(Se.p.x-ce.x,Se.p.y-ce.y)<28);se?se.count++:G.push({pin:Z,p:ce,count:1})}for(let{pin:Z,p:ce,count:se}of G){Z.button.hidden=!1,Z.button.style.left=ce.x+"px",Z.button.style.top=ce.y+"px";let Se=Z.item.name+(se>1?" +"+(se-1):"");Z.button.querySelector("small").textContent=Se,Z.button.setAttribute("aria-label",Se),Z.button.classList.toggle("is-selected",Z.item.id===N?.id)}if(N){ee-k>3e4&&(k=ee,D=Kh(N,ee).map(se=>se?t(se.lat,se.lon,i*(1+se.altitude/6371)):null));let Z="",ce=!1;for(let se of D){let Se=se&&I(se);if(!Se){ce=!1;continue}Z+=(ce?"L":"M")+Se.x.toFixed(1)+","+Se.y.toFixed(1),ce=!0}Ve.setAttribute("d",Z)}}}}var r0=0,ep=1,o0=2;var hm=1,a0=2,Oi=3,rr=0,Qt=1,ti=2,nr=0,fo=1,rl=2,tp=3,np=4,s0=5,Er=100,l0=101,c0=102,u0=103,f0=104,d0=200,h0=201,p0=202,m0=203,Au=204,Eu=205,g0=206,x0=207,v0=208,y0=209,_0=210,M0=211,S0=212,b0=213,w0=214,Tu=0,Cu=1,Ru=2,go=3,Pu=4,Iu=5,Lu=6,Du=7,pm=0,A0=1,E0=2,ir=0,T0=1,C0=2,R0=3,Jf=4,P0=5,I0=6,L0=7;var mm=300,xo=301,vo=302,Uu=303,Nu=304,Ul=306,Fu=1e3,Cr=1001,Ou=1002,ri=1003,D0=1004;var Ms=1005;var vi=1006,qc=1007;var Rr=1008;var Vi=1009,gm=1010,xm=1011,ma=1012,jf=1013,Pr=1014,ki=1015,Ra=1016,Qf=1017,ed=1018,yo=1020,vm=35902,ym=1021,_m=1022,ii=1023,Mm=1024,Sm=1025,ho=1026,_o=1027,bm=1028,td=1029,wm=1030,nd=1031;var id=1033,Qs=33776,el=33777,tl=33778,nl=33779,Bu=35840,ku=35841,zu=35842,Hu=35843,Vu=36196,Gu=37492,Wu=37496,qu=37808,Xu=37809,Yu=37810,Zu=37811,Ku=37812,$u=37813,Ju=37814,ju=37815,Qu=37816,ef=37817,tf=37818,nf=37819,rf=37820,of=37821,il=36492,af=36494,sf=36495,Am=36283,lf=36284,cf=36285,uf=36286;var ol=2300,ff=2301,Xc=2302,ip=2400,rp=2401,op=2402;var U0=3200,N0=3201;var Em=0,F0=1,er="",zt="srgb",wo="srgb-linear",Nl="linear",Et="srgb";var qr=7680;var ap=519,O0=512,B0=513,k0=514,Tm=515,z0=516,H0=517,V0=518,G0=519,df=35044;var sp="300 es",zi=2e3,al=2001,or=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let r=this._listeners[e];if(r!==void 0){let o=r.indexOf(t);o!==-1&&r.splice(o,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let i=this._listeners[e.type];if(i!==void 0){e.target=this;let r=i.slice(0);for(let o=0,a=r.length;o<a;o++)r[o].call(this,e);e.target=null}}},cn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],lp=1234567,ca=Math.PI/180,ga=180/Math.PI;function yi(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(cn[n&255]+cn[n>>8&255]+cn[n>>16&255]+cn[n>>24&255]+"-"+cn[e&255]+cn[e>>8&255]+"-"+cn[e>>16&15|64]+cn[e>>24&255]+"-"+cn[t&63|128]+cn[t>>8&255]+"-"+cn[t>>16&255]+cn[t>>24&255]+cn[i&255]+cn[i>>8&255]+cn[i>>16&255]+cn[i>>24&255]).toLowerCase()}function an(n,e,t){return Math.max(e,Math.min(t,n))}function rd(n,e){return(n%e+e)%e}function W0(n,e,t,i,r){return i+(n-e)*(r-i)/(t-e)}function q0(n,e,t){return n!==e?(t-n)/(e-n):0}function ua(n,e,t){return(1-t)*n+t*e}function X0(n,e,t,i){return ua(n,e,1-Math.exp(-t*i))}function Y0(n,e=1){return e-Math.abs(rd(n,e*2)-e)}function Z0(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function K0(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function $0(n,e){return n+Math.floor(Math.random()*(e-n+1))}function J0(n,e){return n+Math.random()*(e-n)}function j0(n){return n*(.5-Math.random())}function Q0(n){n!==void 0&&(lp=n);let e=lp+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function ev(n){return n*ca}function tv(n){return n*ga}function nv(n){return(n&n-1)===0&&n!==0}function iv(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function rv(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function ov(n,e,t,i,r){let o=Math.cos,a=Math.sin,s=o(t/2),l=a(t/2),u=o((e+i)/2),c=a((e+i)/2),f=o((e-i)/2),d=a((e-i)/2),h=o((i-e)/2),m=a((i-e)/2);switch(r){case"XYX":n.set(s*c,l*f,l*d,s*u);break;case"YZY":n.set(l*d,s*c,l*f,s*u);break;case"ZXZ":n.set(l*f,l*d,s*c,s*u);break;case"XZX":n.set(s*c,l*m,l*h,s*u);break;case"YXY":n.set(l*h,s*c,l*m,s*u);break;case"ZYZ":n.set(l*m,l*h,s*c,s*u);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function ni(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function bt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}var od={DEG2RAD:ca,RAD2DEG:ga,generateUUID:yi,clamp:an,euclideanModulo:rd,mapLinear:W0,inverseLerp:q0,lerp:ua,damp:X0,pingpong:Y0,smoothstep:Z0,smootherstep:K0,randInt:$0,randFloat:J0,randFloatSpread:j0,seededRandom:Q0,degToRad:ev,radToDeg:tv,isPowerOfTwo:nv,ceilPowerOfTwo:iv,floorPowerOfTwo:rv,setQuaternionFromProperEuler:ov,normalize:bt,denormalize:ni},Le=class n{constructor(e=0,t=0){n.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(an(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),r=Math.sin(t),o=this.x-e.x,a=this.y-e.y;return this.x=o*i-a*r+e.x,this.y=o*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},je=class n{constructor(e,t,i,r,o,a,s,l,u){n.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,o,a,s,l,u)}set(e,t,i,r,o,a,s,l,u){let c=this.elements;return c[0]=e,c[1]=r,c[2]=s,c[3]=t,c[4]=o,c[5]=l,c[6]=i,c[7]=a,c[8]=u,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,o=this.elements,a=i[0],s=i[3],l=i[6],u=i[1],c=i[4],f=i[7],d=i[2],h=i[5],m=i[8],x=r[0],g=r[3],p=r[6],_=r[1],y=r[4],v=r[7],R=r[2],E=r[5],P=r[8];return o[0]=a*x+s*_+l*R,o[3]=a*g+s*y+l*E,o[6]=a*p+s*v+l*P,o[1]=u*x+c*_+f*R,o[4]=u*g+c*y+f*E,o[7]=u*p+c*v+f*P,o[2]=d*x+h*_+m*R,o[5]=d*g+h*y+m*E,o[8]=d*p+h*v+m*P,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],r=e[2],o=e[3],a=e[4],s=e[5],l=e[6],u=e[7],c=e[8];return t*a*c-t*s*u-i*o*c+i*s*l+r*o*u-r*a*l}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],o=e[3],a=e[4],s=e[5],l=e[6],u=e[7],c=e[8],f=c*a-s*u,d=s*l-c*o,h=u*o-a*l,m=t*f+i*d+r*h;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/m;return e[0]=f*x,e[1]=(r*u-c*i)*x,e[2]=(s*i-r*a)*x,e[3]=d*x,e[4]=(c*t-r*l)*x,e[5]=(r*o-s*t)*x,e[6]=h*x,e[7]=(i*l-u*t)*x,e[8]=(a*t-i*o)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,o,a,s){let l=Math.cos(o),u=Math.sin(o);return this.set(i*l,i*u,-i*(l*a+u*s)+a+e,-r*u,r*l,-r*(-u*a+l*s)+s+t,0,0,1),this}scale(e,t){return this.premultiply(Yc.makeScale(e,t)),this}rotate(e){return this.premultiply(Yc.makeRotation(-e)),this}translate(e,t){return this.premultiply(Yc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Yc=new je;function Cm(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function xa(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function av(){let n=xa("canvas");return n.style.display="block",n}var cp={};function sa(n){n in cp||(cp[n]=!0,console.warn(n))}function sv(n,e,t){return new Promise(function(i,r){function o(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(o,t);break;default:i()}}setTimeout(o,t)})}function lv(n){let e=n.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function cv(n){let e=n.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}var gt={enabled:!0,workingColorSpace:wo,spaces:{},convert:function(n,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===Et&&(n.r=Hi(n.r),n.g=Hi(n.g),n.b=Hi(n.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(n.applyMatrix3(this.spaces[e].toXYZ),n.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===Et&&(n.r=po(n.r),n.g=po(n.g),n.b=po(n.b))),n},fromWorkingColorSpace:function(n,e){return this.convert(n,this.workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===er?Nl:this.spaces[n].transfer},getLuminanceCoefficients:function(n,e=this.workingColorSpace){return n.fromArray(this.spaces[e].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,e,t){return n.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}};function Hi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function po(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var up=[.64,.33,.3,.6,.15,.06],fp=[.2126,.7152,.0722],dp=[.3127,.329],hp=new je().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),pp=new je().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);gt.define({[wo]:{primaries:up,whitePoint:dp,transfer:Nl,toXYZ:hp,fromXYZ:pp,luminanceCoefficients:fp,workingColorSpaceConfig:{unpackColorSpace:zt},outputColorSpaceConfig:{drawingBufferColorSpace:zt}},[zt]:{primaries:up,whitePoint:dp,transfer:Et,toXYZ:hp,fromXYZ:pp,luminanceCoefficients:fp,outputColorSpaceConfig:{drawingBufferColorSpace:zt}}});var Xr,hf=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Xr===void 0&&(Xr=xa("canvas")),Xr.width=e.width,Xr.height=e.height;let i=Xr.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=Xr}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=xa("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let r=i.getImageData(0,0,e.width,e.height),o=r.data;for(let a=0;a<o.length;a++)o[a]=Hi(o[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Hi(t[i]/255)*255):t[i]=Hi(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},uv=0,sl=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:uv++}),this.uuid=yi(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let o;if(Array.isArray(r)){o=[];for(let a=0,s=r.length;a<s;a++)r[a].isDataTexture?o.push(Zc(r[a].image)):o.push(Zc(r[a]))}else o=Zc(r);i.url=o}return t||(e.images[this.uuid]=i),i}};function Zc(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?hf.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var fv=0,En=class n extends or{constructor(e=n.DEFAULT_IMAGE,t=n.DEFAULT_MAPPING,i=Cr,r=Cr,o=vi,a=Rr,s=ii,l=Vi,u=n.DEFAULT_ANISOTROPY,c=er){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:fv++}),this.uuid=yi(),this.name="",this.source=new sl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=o,this.minFilter=a,this.anisotropy=u,this.format=s,this.internalFormat=null,this.type=l,this.offset=new Le(0,0),this.repeat=new Le(1,1),this.center=new Le(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new je,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=c,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==mm)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Fu:e.x=e.x-Math.floor(e.x);break;case Cr:e.x=e.x<0?0:1;break;case Ou:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Fu:e.y=e.y-Math.floor(e.y);break;case Cr:e.y=e.y<0?0:1;break;case Ou:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};En.DEFAULT_IMAGE=null;En.DEFAULT_MAPPING=mm;En.DEFAULT_ANISOTROPY=1;var Ht=class n{constructor(e=0,t=0,i=0,r=1){n.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,o=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*o,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*o,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*o,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*o,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,o,l=e.elements,u=l[0],c=l[4],f=l[8],d=l[1],h=l[5],m=l[9],x=l[2],g=l[6],p=l[10];if(Math.abs(c-d)<.01&&Math.abs(f-x)<.01&&Math.abs(m-g)<.01){if(Math.abs(c+d)<.1&&Math.abs(f+x)<.1&&Math.abs(m+g)<.1&&Math.abs(u+h+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let y=(u+1)/2,v=(h+1)/2,R=(p+1)/2,E=(c+d)/4,P=(f+x)/4,L=(m+g)/4;return y>v&&y>R?y<.01?(i=0,r=.707106781,o=.707106781):(i=Math.sqrt(y),r=E/i,o=P/i):v>R?v<.01?(i=.707106781,r=0,o=.707106781):(r=Math.sqrt(v),i=E/r,o=L/r):R<.01?(i=.707106781,r=.707106781,o=0):(o=Math.sqrt(R),i=P/o,r=L/o),this.set(i,r,o,t),this}let _=Math.sqrt((g-m)*(g-m)+(f-x)*(f-x)+(d-c)*(d-c));return Math.abs(_)<.001&&(_=1),this.x=(g-m)/_,this.y=(f-x)/_,this.z=(d-c)/_,this.w=Math.acos((u+h+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},pf=class extends or{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Ht(0,0,e,t),this.scissorTest=!1,this.viewport=new Ht(0,0,e,t);let r={width:e,height:t,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:vi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);let o=new En(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);o.flipY=!1,o.generateMipmaps=i.generateMipmaps,o.internalFormat=i.internalFormat,this.textures=[];let a=i.count;for(let s=0;s<a;s++)this.textures[s]=o.clone(),this.textures[s].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,o=this.textures.length;r<o;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,r=e.textures.length;i<r;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new sl(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Gi=class extends pf{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},ll=class extends En{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=ri,this.minFilter=ri,this.wrapR=Cr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var mf=class extends En{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=ri,this.minFilter=ri,this.wrapR=Cr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var oi=class{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,o,a,s){let l=i[r+0],u=i[r+1],c=i[r+2],f=i[r+3],d=o[a+0],h=o[a+1],m=o[a+2],x=o[a+3];if(s===0){e[t+0]=l,e[t+1]=u,e[t+2]=c,e[t+3]=f;return}if(s===1){e[t+0]=d,e[t+1]=h,e[t+2]=m,e[t+3]=x;return}if(f!==x||l!==d||u!==h||c!==m){let g=1-s,p=l*d+u*h+c*m+f*x,_=p>=0?1:-1,y=1-p*p;if(y>Number.EPSILON){let R=Math.sqrt(y),E=Math.atan2(R,p*_);g=Math.sin(g*E)/R,s=Math.sin(s*E)/R}let v=s*_;if(l=l*g+d*v,u=u*g+h*v,c=c*g+m*v,f=f*g+x*v,g===1-s){let R=1/Math.sqrt(l*l+u*u+c*c+f*f);l*=R,u*=R,c*=R,f*=R}}e[t]=l,e[t+1]=u,e[t+2]=c,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,r,o,a){let s=i[r],l=i[r+1],u=i[r+2],c=i[r+3],f=o[a],d=o[a+1],h=o[a+2],m=o[a+3];return e[t]=s*m+c*f+l*h-u*d,e[t+1]=l*m+c*d+u*f-s*h,e[t+2]=u*m+c*h+s*d-l*f,e[t+3]=c*m-s*f-l*d-u*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,r=e._y,o=e._z,a=e._order,s=Math.cos,l=Math.sin,u=s(i/2),c=s(r/2),f=s(o/2),d=l(i/2),h=l(r/2),m=l(o/2);switch(a){case"XYZ":this._x=d*c*f+u*h*m,this._y=u*h*f-d*c*m,this._z=u*c*m+d*h*f,this._w=u*c*f-d*h*m;break;case"YXZ":this._x=d*c*f+u*h*m,this._y=u*h*f-d*c*m,this._z=u*c*m-d*h*f,this._w=u*c*f+d*h*m;break;case"ZXY":this._x=d*c*f-u*h*m,this._y=u*h*f+d*c*m,this._z=u*c*m+d*h*f,this._w=u*c*f-d*h*m;break;case"ZYX":this._x=d*c*f-u*h*m,this._y=u*h*f+d*c*m,this._z=u*c*m-d*h*f,this._w=u*c*f+d*h*m;break;case"YZX":this._x=d*c*f+u*h*m,this._y=u*h*f+d*c*m,this._z=u*c*m-d*h*f,this._w=u*c*f-d*h*m;break;case"XZY":this._x=d*c*f-u*h*m,this._y=u*h*f-d*c*m,this._z=u*c*m+d*h*f,this._w=u*c*f+d*h*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],r=t[4],o=t[8],a=t[1],s=t[5],l=t[9],u=t[2],c=t[6],f=t[10],d=i+s+f;if(d>0){let h=.5/Math.sqrt(d+1);this._w=.25/h,this._x=(c-l)*h,this._y=(o-u)*h,this._z=(a-r)*h}else if(i>s&&i>f){let h=2*Math.sqrt(1+i-s-f);this._w=(c-l)/h,this._x=.25*h,this._y=(r+a)/h,this._z=(o+u)/h}else if(s>f){let h=2*Math.sqrt(1+s-i-f);this._w=(o-u)/h,this._x=(r+a)/h,this._y=.25*h,this._z=(l+c)/h}else{let h=2*Math.sqrt(1+f-i-s);this._w=(a-r)/h,this._x=(o+u)/h,this._y=(l+c)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(an(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,r=e._y,o=e._z,a=e._w,s=t._x,l=t._y,u=t._z,c=t._w;return this._x=i*c+a*s+r*u-o*l,this._y=r*c+a*l+o*s-i*u,this._z=o*c+a*u+i*l-r*s,this._w=a*c-i*s-r*l-o*u,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let i=this._x,r=this._y,o=this._z,a=this._w,s=a*e._w+i*e._x+r*e._y+o*e._z;if(s<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,s=-s):this.copy(e),s>=1)return this._w=a,this._x=i,this._y=r,this._z=o,this;let l=1-s*s;if(l<=Number.EPSILON){let h=1-t;return this._w=h*a+t*this._w,this._x=h*i+t*this._x,this._y=h*r+t*this._y,this._z=h*o+t*this._z,this.normalize(),this}let u=Math.sqrt(l),c=Math.atan2(u,s),f=Math.sin((1-t)*c)/u,d=Math.sin(t*c)/u;return this._w=a*f+this._w*d,this._x=i*f+this._x*d,this._y=r*f+this._y*d,this._z=o*f+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),o=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),o*Math.sin(t),o*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},z=class n{constructor(e=0,t=0,i=0){n.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(mp.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(mp.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,r=this.z,o=e.elements;return this.x=o[0]*t+o[3]*i+o[6]*r,this.y=o[1]*t+o[4]*i+o[7]*r,this.z=o[2]*t+o[5]*i+o[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,o=e.elements,a=1/(o[3]*t+o[7]*i+o[11]*r+o[15]);return this.x=(o[0]*t+o[4]*i+o[8]*r+o[12])*a,this.y=(o[1]*t+o[5]*i+o[9]*r+o[13])*a,this.z=(o[2]*t+o[6]*i+o[10]*r+o[14])*a,this}applyQuaternion(e){let t=this.x,i=this.y,r=this.z,o=e.x,a=e.y,s=e.z,l=e.w,u=2*(a*r-s*i),c=2*(s*t-o*r),f=2*(o*i-a*t);return this.x=t+l*u+a*f-s*c,this.y=i+l*c+s*u-o*f,this.z=r+l*f+o*c-a*u,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,r=this.z,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r,this.y=o[1]*t+o[5]*i+o[9]*r,this.z=o[2]*t+o[6]*i+o[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,r=e.y,o=e.z,a=t.x,s=t.y,l=t.z;return this.x=r*l-o*s,this.y=o*a-i*l,this.z=i*s-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Kc.copy(this).projectOnVector(e),this.sub(Kc)}reflect(e){return this.sub(Kc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(an(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Kc=new z,mp=new oi,Ir=class{constructor(e=new z(1/0,1/0,1/0),t=new z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(jn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(jn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=jn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let o=i.getAttribute("position");if(t===!0&&o!==void 0&&e.isInstancedMesh!==!0)for(let a=0,s=o.count;a<s;a++)e.isMesh===!0?e.getVertexPosition(a,jn):jn.fromBufferAttribute(o,a),jn.applyMatrix4(e.matrixWorld),this.expandByPoint(jn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ss.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ss.copy(i.boundingBox)),Ss.applyMatrix4(e.matrixWorld),this.union(Ss)}let r=e.children;for(let o=0,a=r.length;o<a;o++)this.expandByObject(r[o],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,jn),jn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Qo),bs.subVectors(this.max,Qo),Yr.subVectors(e.a,Qo),Zr.subVectors(e.b,Qo),Kr.subVectors(e.c,Qo),Zi.subVectors(Zr,Yr),Ki.subVectors(Kr,Zr),yr.subVectors(Yr,Kr);let t=[0,-Zi.z,Zi.y,0,-Ki.z,Ki.y,0,-yr.z,yr.y,Zi.z,0,-Zi.x,Ki.z,0,-Ki.x,yr.z,0,-yr.x,-Zi.y,Zi.x,0,-Ki.y,Ki.x,0,-yr.y,yr.x,0];return!$c(t,Yr,Zr,Kr,bs)||(t=[1,0,0,0,1,0,0,0,1],!$c(t,Yr,Zr,Kr,bs))?!1:(ws.crossVectors(Zi,Ki),t=[ws.x,ws.y,ws.z],$c(t,Yr,Zr,Kr,bs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,jn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(jn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Li[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Li[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Li[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Li[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Li[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Li[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Li[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Li[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Li),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},Li=[new z,new z,new z,new z,new z,new z,new z,new z],jn=new z,Ss=new Ir,Yr=new z,Zr=new z,Kr=new z,Zi=new z,Ki=new z,yr=new z,Qo=new z,bs=new z,ws=new z,_r=new z;function $c(n,e,t,i,r){for(let o=0,a=n.length-3;o<=a;o+=3){_r.fromArray(n,o);let s=r.x*Math.abs(_r.x)+r.y*Math.abs(_r.y)+r.z*Math.abs(_r.z),l=e.dot(_r),u=t.dot(_r),c=i.dot(_r);if(Math.max(-Math.max(l,u,c),Math.min(l,u,c))>s)return!1}return!0}var dv=new Ir,ea=new z,Jc=new z,Lr=class{constructor(e=new z,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):dv.setFromPoints(e).getCenter(i);let r=0;for(let o=0,a=e.length;o<a;o++)r=Math.max(r,i.distanceToSquared(e[o]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ea.subVectors(e,this.center);let t=ea.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(ea,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Jc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ea.copy(e.center).add(Jc)),this.expandByPoint(ea.copy(e.center).sub(Jc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},Di=new z,jc=new z,As=new z,$i=new z,Qc=new z,Es=new z,eu=new z,va=class{constructor(e=new z,t=new z(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Di)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Di.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Di.copy(this.origin).addScaledVector(this.direction,t),Di.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){jc.copy(e).add(t).multiplyScalar(.5),As.copy(t).sub(e).normalize(),$i.copy(this.origin).sub(jc);let o=e.distanceTo(t)*.5,a=-this.direction.dot(As),s=$i.dot(this.direction),l=-$i.dot(As),u=$i.lengthSq(),c=Math.abs(1-a*a),f,d,h,m;if(c>0)if(f=a*l-s,d=a*s-l,m=o*c,f>=0)if(d>=-m)if(d<=m){let x=1/c;f*=x,d*=x,h=f*(f+a*d+2*s)+d*(a*f+d+2*l)+u}else d=o,f=Math.max(0,-(a*d+s)),h=-f*f+d*(d+2*l)+u;else d=-o,f=Math.max(0,-(a*d+s)),h=-f*f+d*(d+2*l)+u;else d<=-m?(f=Math.max(0,-(-a*o+s)),d=f>0?-o:Math.min(Math.max(-o,-l),o),h=-f*f+d*(d+2*l)+u):d<=m?(f=0,d=Math.min(Math.max(-o,-l),o),h=d*(d+2*l)+u):(f=Math.max(0,-(a*o+s)),d=f>0?o:Math.min(Math.max(-o,-l),o),h=-f*f+d*(d+2*l)+u);else d=a>0?-o:o,f=Math.max(0,-(a*d+s)),h=-f*f+d*(d+2*l)+u;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(jc).addScaledVector(As,d),h}intersectSphere(e,t){Di.subVectors(e.center,this.origin);let i=Di.dot(this.direction),r=Di.dot(Di)-i*i,o=e.radius*e.radius;if(r>o)return null;let a=Math.sqrt(o-r),s=i-a,l=i+a;return l<0?null:s<0?this.at(l,t):this.at(s,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,o,a,s,l,u=1/this.direction.x,c=1/this.direction.y,f=1/this.direction.z,d=this.origin;return u>=0?(i=(e.min.x-d.x)*u,r=(e.max.x-d.x)*u):(i=(e.max.x-d.x)*u,r=(e.min.x-d.x)*u),c>=0?(o=(e.min.y-d.y)*c,a=(e.max.y-d.y)*c):(o=(e.max.y-d.y)*c,a=(e.min.y-d.y)*c),i>a||o>r||((o>i||isNaN(i))&&(i=o),(a<r||isNaN(r))&&(r=a),f>=0?(s=(e.min.z-d.z)*f,l=(e.max.z-d.z)*f):(s=(e.max.z-d.z)*f,l=(e.min.z-d.z)*f),i>l||s>r)||((s>i||i!==i)&&(i=s),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Di)!==null}intersectTriangle(e,t,i,r,o){Qc.subVectors(t,e),Es.subVectors(i,e),eu.crossVectors(Qc,Es);let a=this.direction.dot(eu),s;if(a>0){if(r)return null;s=1}else if(a<0)s=-1,a=-a;else return null;$i.subVectors(this.origin,e);let l=s*this.direction.dot(Es.crossVectors($i,Es));if(l<0)return null;let u=s*this.direction.dot(Qc.cross($i));if(u<0||l+u>a)return null;let c=-s*$i.dot(eu);return c<0?null:this.at(c/a,o)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},wt=class n{constructor(e,t,i,r,o,a,s,l,u,c,f,d,h,m,x,g){n.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,o,a,s,l,u,c,f,d,h,m,x,g)}set(e,t,i,r,o,a,s,l,u,c,f,d,h,m,x,g){let p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=r,p[1]=o,p[5]=a,p[9]=s,p[13]=l,p[2]=u,p[6]=c,p[10]=f,p[14]=d,p[3]=h,p[7]=m,p[11]=x,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,i=e.elements,r=1/$r.setFromMatrixColumn(e,0).length(),o=1/$r.setFromMatrixColumn(e,1).length(),a=1/$r.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*o,t[5]=i[5]*o,t[6]=i[6]*o,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,r=e.y,o=e.z,a=Math.cos(i),s=Math.sin(i),l=Math.cos(r),u=Math.sin(r),c=Math.cos(o),f=Math.sin(o);if(e.order==="XYZ"){let d=a*c,h=a*f,m=s*c,x=s*f;t[0]=l*c,t[4]=-l*f,t[8]=u,t[1]=h+m*u,t[5]=d-x*u,t[9]=-s*l,t[2]=x-d*u,t[6]=m+h*u,t[10]=a*l}else if(e.order==="YXZ"){let d=l*c,h=l*f,m=u*c,x=u*f;t[0]=d+x*s,t[4]=m*s-h,t[8]=a*u,t[1]=a*f,t[5]=a*c,t[9]=-s,t[2]=h*s-m,t[6]=x+d*s,t[10]=a*l}else if(e.order==="ZXY"){let d=l*c,h=l*f,m=u*c,x=u*f;t[0]=d-x*s,t[4]=-a*f,t[8]=m+h*s,t[1]=h+m*s,t[5]=a*c,t[9]=x-d*s,t[2]=-a*u,t[6]=s,t[10]=a*l}else if(e.order==="ZYX"){let d=a*c,h=a*f,m=s*c,x=s*f;t[0]=l*c,t[4]=m*u-h,t[8]=d*u+x,t[1]=l*f,t[5]=x*u+d,t[9]=h*u-m,t[2]=-u,t[6]=s*l,t[10]=a*l}else if(e.order==="YZX"){let d=a*l,h=a*u,m=s*l,x=s*u;t[0]=l*c,t[4]=x-d*f,t[8]=m*f+h,t[1]=f,t[5]=a*c,t[9]=-s*c,t[2]=-u*c,t[6]=h*f+m,t[10]=d-x*f}else if(e.order==="XZY"){let d=a*l,h=a*u,m=s*l,x=s*u;t[0]=l*c,t[4]=-f,t[8]=u*c,t[1]=d*f+x,t[5]=a*c,t[9]=h*f-m,t[2]=m*f-h,t[6]=s*c,t[10]=x*f+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(hv,e,pv)}lookAt(e,t,i){let r=this.elements;return Un.subVectors(e,t),Un.lengthSq()===0&&(Un.z=1),Un.normalize(),Ji.crossVectors(i,Un),Ji.lengthSq()===0&&(Math.abs(i.z)===1?Un.x+=1e-4:Un.z+=1e-4,Un.normalize(),Ji.crossVectors(i,Un)),Ji.normalize(),Ts.crossVectors(Un,Ji),r[0]=Ji.x,r[4]=Ts.x,r[8]=Un.x,r[1]=Ji.y,r[5]=Ts.y,r[9]=Un.y,r[2]=Ji.z,r[6]=Ts.z,r[10]=Un.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,o=this.elements,a=i[0],s=i[4],l=i[8],u=i[12],c=i[1],f=i[5],d=i[9],h=i[13],m=i[2],x=i[6],g=i[10],p=i[14],_=i[3],y=i[7],v=i[11],R=i[15],E=r[0],P=r[4],L=r[8],b=r[12],S=r[1],T=r[5],O=r[9],F=r[13],H=r[2],U=r[6],N=r[10],te=r[14],D=r[3],k=r[7],J=r[11],$=r[15];return o[0]=a*E+s*S+l*H+u*D,o[4]=a*P+s*T+l*U+u*k,o[8]=a*L+s*O+l*N+u*J,o[12]=a*b+s*F+l*te+u*$,o[1]=c*E+f*S+d*H+h*D,o[5]=c*P+f*T+d*U+h*k,o[9]=c*L+f*O+d*N+h*J,o[13]=c*b+f*F+d*te+h*$,o[2]=m*E+x*S+g*H+p*D,o[6]=m*P+x*T+g*U+p*k,o[10]=m*L+x*O+g*N+p*J,o[14]=m*b+x*F+g*te+p*$,o[3]=_*E+y*S+v*H+R*D,o[7]=_*P+y*T+v*U+R*k,o[11]=_*L+y*O+v*N+R*J,o[15]=_*b+y*F+v*te+R*$,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],r=e[8],o=e[12],a=e[1],s=e[5],l=e[9],u=e[13],c=e[2],f=e[6],d=e[10],h=e[14],m=e[3],x=e[7],g=e[11],p=e[15];return m*(+o*l*f-r*u*f-o*s*d+i*u*d+r*s*h-i*l*h)+x*(+t*l*h-t*u*d+o*a*d-r*a*h+r*u*c-o*l*c)+g*(+t*u*f-t*s*h-o*a*f+i*a*h+o*s*c-i*u*c)+p*(-r*s*c-t*l*f+t*s*d+r*a*f-i*a*d+i*l*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],o=e[3],a=e[4],s=e[5],l=e[6],u=e[7],c=e[8],f=e[9],d=e[10],h=e[11],m=e[12],x=e[13],g=e[14],p=e[15],_=f*g*u-x*d*u+x*l*h-s*g*h-f*l*p+s*d*p,y=m*d*u-c*g*u-m*l*h+a*g*h+c*l*p-a*d*p,v=c*x*u-m*f*u+m*s*h-a*x*h-c*s*p+a*f*p,R=m*f*l-c*x*l-m*s*d+a*x*d+c*s*g-a*f*g,E=t*_+i*y+r*v+o*R;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let P=1/E;return e[0]=_*P,e[1]=(x*d*o-f*g*o-x*r*h+i*g*h+f*r*p-i*d*p)*P,e[2]=(s*g*o-x*l*o+x*r*u-i*g*u-s*r*p+i*l*p)*P,e[3]=(f*l*o-s*d*o-f*r*u+i*d*u+s*r*h-i*l*h)*P,e[4]=y*P,e[5]=(c*g*o-m*d*o+m*r*h-t*g*h-c*r*p+t*d*p)*P,e[6]=(m*l*o-a*g*o-m*r*u+t*g*u+a*r*p-t*l*p)*P,e[7]=(a*d*o-c*l*o+c*r*u-t*d*u-a*r*h+t*l*h)*P,e[8]=v*P,e[9]=(m*f*o-c*x*o-m*i*h+t*x*h+c*i*p-t*f*p)*P,e[10]=(a*x*o-m*s*o+m*i*u-t*x*u-a*i*p+t*s*p)*P,e[11]=(c*s*o-a*f*o-c*i*u+t*f*u+a*i*h-t*s*h)*P,e[12]=R*P,e[13]=(c*x*r-m*f*r+m*i*d-t*x*d-c*i*g+t*f*g)*P,e[14]=(m*s*r-a*x*r-m*i*l+t*x*l+a*i*g-t*s*g)*P,e[15]=(a*f*r-c*s*r+c*i*l-t*f*l-a*i*d+t*s*d)*P,this}scale(e){let t=this.elements,i=e.x,r=e.y,o=e.z;return t[0]*=i,t[4]*=r,t[8]*=o,t[1]*=i,t[5]*=r,t[9]*=o,t[2]*=i,t[6]*=r,t[10]*=o,t[3]*=i,t[7]*=r,t[11]*=o,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),r=Math.sin(t),o=1-i,a=e.x,s=e.y,l=e.z,u=o*a,c=o*s;return this.set(u*a+i,u*s-r*l,u*l+r*s,0,u*s+r*l,c*s+i,c*l-r*a,0,u*l-r*s,c*l+r*a,o*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,o,a){return this.set(1,i,o,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){let r=this.elements,o=t._x,a=t._y,s=t._z,l=t._w,u=o+o,c=a+a,f=s+s,d=o*u,h=o*c,m=o*f,x=a*c,g=a*f,p=s*f,_=l*u,y=l*c,v=l*f,R=i.x,E=i.y,P=i.z;return r[0]=(1-(x+p))*R,r[1]=(h+v)*R,r[2]=(m-y)*R,r[3]=0,r[4]=(h-v)*E,r[5]=(1-(d+p))*E,r[6]=(g+_)*E,r[7]=0,r[8]=(m+y)*P,r[9]=(g-_)*P,r[10]=(1-(d+x))*P,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){let r=this.elements,o=$r.set(r[0],r[1],r[2]).length(),a=$r.set(r[4],r[5],r[6]).length(),s=$r.set(r[8],r[9],r[10]).length();this.determinant()<0&&(o=-o),e.x=r[12],e.y=r[13],e.z=r[14],Qn.copy(this);let u=1/o,c=1/a,f=1/s;return Qn.elements[0]*=u,Qn.elements[1]*=u,Qn.elements[2]*=u,Qn.elements[4]*=c,Qn.elements[5]*=c,Qn.elements[6]*=c,Qn.elements[8]*=f,Qn.elements[9]*=f,Qn.elements[10]*=f,t.setFromRotationMatrix(Qn),i.x=o,i.y=a,i.z=s,this}makePerspective(e,t,i,r,o,a,s=zi){let l=this.elements,u=2*o/(t-e),c=2*o/(i-r),f=(t+e)/(t-e),d=(i+r)/(i-r),h,m;if(s===zi)h=-(a+o)/(a-o),m=-2*a*o/(a-o);else if(s===al)h=-a/(a-o),m=-a*o/(a-o);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+s);return l[0]=u,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=c,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=h,l[14]=m,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,o,a,s=zi){let l=this.elements,u=1/(t-e),c=1/(i-r),f=1/(a-o),d=(t+e)*u,h=(i+r)*c,m,x;if(s===zi)m=(a+o)*f,x=-2*f;else if(s===al)m=o*f,x=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+s);return l[0]=2*u,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*c,l[9]=0,l[13]=-h,l[2]=0,l[6]=0,l[10]=x,l[14]=-m,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}},$r=new z,Qn=new wt,hv=new z(0,0,0),pv=new z(1,1,1),Ji=new z,Ts=new z,Un=new z,gp=new wt,xp=new oi,_i=class n{constructor(e=0,t=0,i=0,r=n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){let r=e.elements,o=r[0],a=r[4],s=r[8],l=r[1],u=r[5],c=r[9],f=r[2],d=r[6],h=r[10];switch(t){case"XYZ":this._y=Math.asin(an(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-c,h),this._z=Math.atan2(-a,o)):(this._x=Math.atan2(d,u),this._z=0);break;case"YXZ":this._x=Math.asin(-an(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(s,h),this._z=Math.atan2(l,u)):(this._y=Math.atan2(-f,o),this._z=0);break;case"ZXY":this._x=Math.asin(an(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,h),this._z=Math.atan2(-a,u)):(this._y=0,this._z=Math.atan2(l,o));break;case"ZYX":this._y=Math.asin(-an(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,h),this._z=Math.atan2(l,o)):(this._x=0,this._z=Math.atan2(-a,u));break;case"YZX":this._z=Math.asin(an(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-c,u),this._y=Math.atan2(-f,o)):(this._x=0,this._y=Math.atan2(s,h));break;case"XZY":this._z=Math.asin(-an(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,u),this._y=Math.atan2(s,o)):(this._x=Math.atan2(-c,h),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return gp.makeRotationFromQuaternion(e),this.setFromRotationMatrix(gp,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return xp.setFromEuler(this),this.setFromQuaternion(xp,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};_i.DEFAULT_ORDER="XYZ";var cl=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},mv=0,vp=new z,Jr=new oi,Ui=new wt,Cs=new z,ta=new z,gv=new z,xv=new oi,yp=new z(1,0,0),_p=new z(0,1,0),Mp=new z(0,0,1),Sp={type:"added"},vv={type:"removed"},jr={type:"childadded",child:null},tu={type:"childremoved",child:null},en=class n extends or{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:mv++}),this.uuid=yi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let e=new z,t=new _i,i=new oi,r=new z(1,1,1);function o(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(o),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new wt},normalMatrix:{value:new je}}),this.matrix=new wt,this.matrixWorld=new wt,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new cl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Jr.setFromAxisAngle(e,t),this.quaternion.multiply(Jr),this}rotateOnWorldAxis(e,t){return Jr.setFromAxisAngle(e,t),this.quaternion.premultiply(Jr),this}rotateX(e){return this.rotateOnAxis(yp,e)}rotateY(e){return this.rotateOnAxis(_p,e)}rotateZ(e){return this.rotateOnAxis(Mp,e)}translateOnAxis(e,t){return vp.copy(e).applyQuaternion(this.quaternion),this.position.add(vp.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(yp,e)}translateY(e){return this.translateOnAxis(_p,e)}translateZ(e){return this.translateOnAxis(Mp,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ui.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Cs.copy(e):Cs.set(e,t,i);let r=this.parent;this.updateWorldMatrix(!0,!1),ta.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ui.lookAt(ta,Cs,this.up):Ui.lookAt(Cs,ta,this.up),this.quaternion.setFromRotationMatrix(Ui),r&&(Ui.extractRotation(r.matrixWorld),Jr.setFromRotationMatrix(Ui),this.quaternion.premultiply(Jr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Sp),jr.child=e,this.dispatchEvent(jr),jr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(vv),tu.child=e,this.dispatchEvent(tu),tu.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ui.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ui.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ui),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Sp),jr.child=e,this.dispatchEvent(jr),jr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){let a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ta,e,gv),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ta,xv,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){let i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(s=>({boxInitialized:s.boxInitialized,boxMin:s.box.min.toArray(),boxMax:s.box.max.toArray(),sphereInitialized:s.sphereInitialized,sphereRadius:s.sphere.radius,sphereCenter:s.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function o(s,l){return s[l.uuid]===void 0&&(s[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=o(e.geometries,this.geometry);let s=this.geometry.parameters;if(s!==void 0&&s.shapes!==void 0){let l=s.shapes;if(Array.isArray(l))for(let u=0,c=l.length;u<c;u++){let f=l[u];o(e.shapes,f)}else o(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let s=[];for(let l=0,u=this.material.length;l<u;l++)s.push(o(e.materials,this.material[l]));r.material=s}else r.material=o(e.materials,this.material);if(this.children.length>0){r.children=[];for(let s=0;s<this.children.length;s++)r.children.push(this.children[s].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let s=0;s<this.animations.length;s++){let l=this.animations[s];r.animations.push(o(e.animations,l))}}if(t){let s=a(e.geometries),l=a(e.materials),u=a(e.textures),c=a(e.images),f=a(e.shapes),d=a(e.skeletons),h=a(e.animations),m=a(e.nodes);s.length>0&&(i.geometries=s),l.length>0&&(i.materials=l),u.length>0&&(i.textures=u),c.length>0&&(i.images=c),f.length>0&&(i.shapes=f),d.length>0&&(i.skeletons=d),h.length>0&&(i.animations=h),m.length>0&&(i.nodes=m)}return i.object=r,i;function a(s){let l=[];for(let u in s){let c=s[u];delete c.metadata,l.push(c)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){let r=e.children[i];this.add(r.clone())}return this}};en.DEFAULT_UP=new z(0,1,0);en.DEFAULT_MATRIX_AUTO_UPDATE=!0;en.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var ei=new z,Ni=new z,nu=new z,Fi=new z,Qr=new z,eo=new z,bp=new z,iu=new z,ru=new z,ou=new z,au=new Ht,su=new Ht,lu=new Ht,tr=class n{constructor(e=new z,t=new z,i=new z){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),ei.subVectors(e,t),r.cross(ei);let o=r.lengthSq();return o>0?r.multiplyScalar(1/Math.sqrt(o)):r.set(0,0,0)}static getBarycoord(e,t,i,r,o){ei.subVectors(r,t),Ni.subVectors(i,t),nu.subVectors(e,t);let a=ei.dot(ei),s=ei.dot(Ni),l=ei.dot(nu),u=Ni.dot(Ni),c=Ni.dot(nu),f=a*u-s*s;if(f===0)return o.set(0,0,0),null;let d=1/f,h=(u*l-s*c)*d,m=(a*c-s*l)*d;return o.set(1-h-m,m,h)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Fi)===null?!1:Fi.x>=0&&Fi.y>=0&&Fi.x+Fi.y<=1}static getInterpolation(e,t,i,r,o,a,s,l){return this.getBarycoord(e,t,i,r,Fi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(o,Fi.x),l.addScaledVector(a,Fi.y),l.addScaledVector(s,Fi.z),l)}static getInterpolatedAttribute(e,t,i,r,o,a){return au.setScalar(0),su.setScalar(0),lu.setScalar(0),au.fromBufferAttribute(e,t),su.fromBufferAttribute(e,i),lu.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(au,o.x),a.addScaledVector(su,o.y),a.addScaledVector(lu,o.z),a}static isFrontFacing(e,t,i,r){return ei.subVectors(i,t),Ni.subVectors(e,t),ei.cross(Ni).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ei.subVectors(this.c,this.b),Ni.subVectors(this.a,this.b),ei.cross(Ni).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,o){return n.getInterpolation(e,this.a,this.b,this.c,t,i,r,o)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,r=this.b,o=this.c,a,s;Qr.subVectors(r,i),eo.subVectors(o,i),iu.subVectors(e,i);let l=Qr.dot(iu),u=eo.dot(iu);if(l<=0&&u<=0)return t.copy(i);ru.subVectors(e,r);let c=Qr.dot(ru),f=eo.dot(ru);if(c>=0&&f<=c)return t.copy(r);let d=l*f-c*u;if(d<=0&&l>=0&&c<=0)return a=l/(l-c),t.copy(i).addScaledVector(Qr,a);ou.subVectors(e,o);let h=Qr.dot(ou),m=eo.dot(ou);if(m>=0&&h<=m)return t.copy(o);let x=h*u-l*m;if(x<=0&&u>=0&&m<=0)return s=u/(u-m),t.copy(i).addScaledVector(eo,s);let g=c*m-h*f;if(g<=0&&f-c>=0&&h-m>=0)return bp.subVectors(o,r),s=(f-c)/(f-c+(h-m)),t.copy(r).addScaledVector(bp,s);let p=1/(g+x+d);return a=x*p,s=d*p,t.copy(i).addScaledVector(Qr,a).addScaledVector(eo,s)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Rm={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ji={h:0,s:0,l:0},Rs={h:0,s:0,l:0};function cu(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var $e=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=zt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,gt.toWorkingColorSpace(this,t),this}setRGB(e,t,i,r=gt.workingColorSpace){return this.r=e,this.g=t,this.b=i,gt.toWorkingColorSpace(this,r),this}setHSL(e,t,i,r=gt.workingColorSpace){if(e=rd(e,1),t=an(t,0,1),i=an(i,0,1),t===0)this.r=this.g=this.b=i;else{let o=i<=.5?i*(1+t):i+t-i*t,a=2*i-o;this.r=cu(a,o,e+1/3),this.g=cu(a,o,e),this.b=cu(a,o,e-1/3)}return gt.toWorkingColorSpace(this,r),this}setStyle(e,t=zt){function i(o){o!==void 0&&parseFloat(o)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let o,a=r[1],s=r[2];switch(a){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))return i(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,t);if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))return i(o[4]),this.setRGB(Math.min(100,parseInt(o[1],10))/100,Math.min(100,parseInt(o[2],10))/100,Math.min(100,parseInt(o[3],10))/100,t);break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))return i(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let o=r[1],a=o.length;if(a===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(o,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=zt){let i=Rm[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Hi(e.r),this.g=Hi(e.g),this.b=Hi(e.b),this}copyLinearToSRGB(e){return this.r=po(e.r),this.g=po(e.g),this.b=po(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=zt){return gt.fromWorkingColorSpace(un.copy(this),e),Math.round(an(un.r*255,0,255))*65536+Math.round(an(un.g*255,0,255))*256+Math.round(an(un.b*255,0,255))}getHexString(e=zt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=gt.workingColorSpace){gt.fromWorkingColorSpace(un.copy(this),t);let i=un.r,r=un.g,o=un.b,a=Math.max(i,r,o),s=Math.min(i,r,o),l,u,c=(s+a)/2;if(s===a)l=0,u=0;else{let f=a-s;switch(u=c<=.5?f/(a+s):f/(2-a-s),a){case i:l=(r-o)/f+(r<o?6:0);break;case r:l=(o-i)/f+2;break;case o:l=(i-r)/f+4;break}l/=6}return e.h=l,e.s=u,e.l=c,e}getRGB(e,t=gt.workingColorSpace){return gt.fromWorkingColorSpace(un.copy(this),t),e.r=un.r,e.g=un.g,e.b=un.b,e}getStyle(e=zt){gt.fromWorkingColorSpace(un.copy(this),e);let t=un.r,i=un.g,r=un.b;return e!==zt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(ji),this.setHSL(ji.h+e,ji.s+t,ji.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(ji),e.getHSL(Rs);let i=ua(ji.h,Rs.h,t),r=ua(ji.s,Rs.s,t),o=ua(ji.l,Rs.l,t);return this.setHSL(i,r,o),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,r=this.b,o=e.elements;return this.r=o[0]*t+o[3]*i+o[6]*r,this.g=o[1]*t+o[4]*i+o[7]*r,this.b=o[2]*t+o[5]*i+o[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},un=new $e;$e.NAMES=Rm;var yv=0,Mi=class extends or{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:yv++}),this.uuid=yi(),this.name="",this.blending=fo,this.side=rr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Au,this.blendDst=Eu,this.blendEquation=Er,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new $e(0,0,0),this.blendAlpha=0,this.depthFunc=go,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ap,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=qr,this.stencilZFail=qr,this.stencilZPass=qr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==fo&&(i.blending=this.blending),this.side!==rr&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Au&&(i.blendSrc=this.blendSrc),this.blendDst!==Eu&&(i.blendDst=this.blendDst),this.blendEquation!==Er&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==go&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ap&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==qr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==qr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==qr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(o){let a=[];for(let s in o){let l=o[s];delete l.metadata,a.push(l)}return a}if(t){let o=r(e.textures),a=r(e.images);o.length>0&&(i.textures=o),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let r=t.length;i=new Array(r);for(let o=0;o!==r;++o)i[o]=t[o].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},Vn=class extends Mi{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new $e(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _i,this.combine=pm,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var qt=new z,Ps=new Le,Fn=class{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=df,this.updateRanges=[],this.gpuType=ki,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,o=this.itemSize;r<o;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Ps.fromBufferAttribute(this,t),Ps.applyMatrix3(e),this.setXY(t,Ps.x,Ps.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)qt.fromBufferAttribute(this,t),qt.applyMatrix3(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)qt.fromBufferAttribute(this,t),qt.applyMatrix4(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)qt.fromBufferAttribute(this,t),qt.applyNormalMatrix(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)qt.fromBufferAttribute(this,t),qt.transformDirection(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=ni(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=bt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ni(t,this.array)),t}setX(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ni(t,this.array)),t}setY(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ni(t,this.array)),t}setZ(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ni(t,this.array)),t}setW(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),i=bt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),i=bt(i,this.array),r=bt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,o){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),i=bt(i,this.array),r=bt(r,this.array),o=bt(o,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=o,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==df&&(e.usage=this.usage),e}};var ul=class extends Fn{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var fl=class extends Fn{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var Tt=class extends Fn{constructor(e,t,i){super(new Float32Array(e),t,i)}},_v=0,Hn=new wt,uu=new en,to=new z,Nn=new Ir,na=new Ir,jt=new z,Vt=class n extends or{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:_v++}),this.uuid=yi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Cm(e)?fl:ul)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let o=new je().getNormalMatrix(e);i.applyNormalMatrix(o),i.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Hn.makeRotationFromQuaternion(e),this.applyMatrix4(Hn),this}rotateX(e){return Hn.makeRotationX(e),this.applyMatrix4(Hn),this}rotateY(e){return Hn.makeRotationY(e),this.applyMatrix4(Hn),this}rotateZ(e){return Hn.makeRotationZ(e),this.applyMatrix4(Hn),this}translate(e,t,i){return Hn.makeTranslation(e,t,i),this.applyMatrix4(Hn),this}scale(e,t,i){return Hn.makeScale(e,t,i),this.applyMatrix4(Hn),this}lookAt(e){return uu.lookAt(e),uu.updateMatrix(),this.applyMatrix4(uu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(to).negate(),this.translate(to.x,to.y,to.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let r=0,o=e.length;r<o;r++){let a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Tt(i,3))}else{for(let i=0,r=t.count;i<r;i++){let o=e[i];t.setXYZ(i,o.x,o.y,o.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ir);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new z(-1/0,-1/0,-1/0),new z(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){let o=t[i];Nn.setFromBufferAttribute(o),this.morphTargetsRelative?(jt.addVectors(this.boundingBox.min,Nn.min),this.boundingBox.expandByPoint(jt),jt.addVectors(this.boundingBox.max,Nn.max),this.boundingBox.expandByPoint(jt)):(this.boundingBox.expandByPoint(Nn.min),this.boundingBox.expandByPoint(Nn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Lr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new z,1/0);return}if(e){let i=this.boundingSphere.center;if(Nn.setFromBufferAttribute(e),t)for(let o=0,a=t.length;o<a;o++){let s=t[o];na.setFromBufferAttribute(s),this.morphTargetsRelative?(jt.addVectors(Nn.min,na.min),Nn.expandByPoint(jt),jt.addVectors(Nn.max,na.max),Nn.expandByPoint(jt)):(Nn.expandByPoint(na.min),Nn.expandByPoint(na.max))}Nn.getCenter(i);let r=0;for(let o=0,a=e.count;o<a;o++)jt.fromBufferAttribute(e,o),r=Math.max(r,i.distanceToSquared(jt));if(t)for(let o=0,a=t.length;o<a;o++){let s=t[o],l=this.morphTargetsRelative;for(let u=0,c=s.count;u<c;u++)jt.fromBufferAttribute(s,u),l&&(to.fromBufferAttribute(e,u),jt.add(to)),r=Math.max(r,i.distanceToSquared(jt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,r=t.normal,o=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Fn(new Float32Array(4*i.count),4));let a=this.getAttribute("tangent"),s=[],l=[];for(let L=0;L<i.count;L++)s[L]=new z,l[L]=new z;let u=new z,c=new z,f=new z,d=new Le,h=new Le,m=new Le,x=new z,g=new z;function p(L,b,S){u.fromBufferAttribute(i,L),c.fromBufferAttribute(i,b),f.fromBufferAttribute(i,S),d.fromBufferAttribute(o,L),h.fromBufferAttribute(o,b),m.fromBufferAttribute(o,S),c.sub(u),f.sub(u),h.sub(d),m.sub(d);let T=1/(h.x*m.y-m.x*h.y);isFinite(T)&&(x.copy(c).multiplyScalar(m.y).addScaledVector(f,-h.y).multiplyScalar(T),g.copy(f).multiplyScalar(h.x).addScaledVector(c,-m.x).multiplyScalar(T),s[L].add(x),s[b].add(x),s[S].add(x),l[L].add(g),l[b].add(g),l[S].add(g))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let L=0,b=_.length;L<b;++L){let S=_[L],T=S.start,O=S.count;for(let F=T,H=T+O;F<H;F+=3)p(e.getX(F+0),e.getX(F+1),e.getX(F+2))}let y=new z,v=new z,R=new z,E=new z;function P(L){R.fromBufferAttribute(r,L),E.copy(R);let b=s[L];y.copy(b),y.sub(R.multiplyScalar(R.dot(b))).normalize(),v.crossVectors(E,b);let T=v.dot(l[L])<0?-1:1;a.setXYZW(L,y.x,y.y,y.z,T)}for(let L=0,b=_.length;L<b;++L){let S=_[L],T=S.start,O=S.count;for(let F=T,H=T+O;F<H;F+=3)P(e.getX(F+0)),P(e.getX(F+1)),P(e.getX(F+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Fn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,h=i.count;d<h;d++)i.setXYZ(d,0,0,0);let r=new z,o=new z,a=new z,s=new z,l=new z,u=new z,c=new z,f=new z;if(e)for(let d=0,h=e.count;d<h;d+=3){let m=e.getX(d+0),x=e.getX(d+1),g=e.getX(d+2);r.fromBufferAttribute(t,m),o.fromBufferAttribute(t,x),a.fromBufferAttribute(t,g),c.subVectors(a,o),f.subVectors(r,o),c.cross(f),s.fromBufferAttribute(i,m),l.fromBufferAttribute(i,x),u.fromBufferAttribute(i,g),s.add(c),l.add(c),u.add(c),i.setXYZ(m,s.x,s.y,s.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(g,u.x,u.y,u.z)}else for(let d=0,h=t.count;d<h;d+=3)r.fromBufferAttribute(t,d+0),o.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),c.subVectors(a,o),f.subVectors(r,o),c.cross(f),i.setXYZ(d+0,c.x,c.y,c.z),i.setXYZ(d+1,c.x,c.y,c.z),i.setXYZ(d+2,c.x,c.y,c.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)jt.fromBufferAttribute(e,t),jt.normalize(),e.setXYZ(t,jt.x,jt.y,jt.z)}toNonIndexed(){function e(s,l){let u=s.array,c=s.itemSize,f=s.normalized,d=new u.constructor(l.length*c),h=0,m=0;for(let x=0,g=l.length;x<g;x++){s.isInterleavedBufferAttribute?h=l[x]*s.data.stride+s.offset:h=l[x]*c;for(let p=0;p<c;p++)d[m++]=u[h++]}return new Fn(d,c,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,r=this.attributes;for(let s in r){let l=r[s],u=e(l,i);t.setAttribute(s,u)}let o=this.morphAttributes;for(let s in o){let l=[],u=o[s];for(let c=0,f=u.length;c<f;c++){let d=u[c],h=e(d,i);l.push(h)}t.morphAttributes[s]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let s=0,l=a.length;s<l;s++){let u=a[s];t.addGroup(u.start,u.count,u.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let u in l)l[u]!==void 0&&(e[u]=l[u]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let l in i){let u=i[l];e.data.attributes[l]=u.toJSON(e.data)}let r={},o=!1;for(let l in this.morphAttributes){let u=this.morphAttributes[l],c=[];for(let f=0,d=u.length;f<d;f++){let h=u[f];c.push(h.toJSON(e.data))}c.length>0&&(r[l]=c,o=!0)}o&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let s=this.boundingSphere;return s!==null&&(e.data.boundingSphere={center:s.center.toArray(),radius:s.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone(t));let r=e.attributes;for(let u in r){let c=r[u];this.setAttribute(u,c.clone(t))}let o=e.morphAttributes;for(let u in o){let c=[],f=o[u];for(let d=0,h=f.length;d<h;d++)c.push(f[d].clone(t));this.morphAttributes[u]=c}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let u=0,c=a.length;u<c;u++){let f=a[u];this.addGroup(f.start,f.count,f.materialIndex)}let s=e.boundingBox;s!==null&&(this.boundingBox=s.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},wp=new wt,Mr=new va,Is=new Lr,Ap=new z,Ls=new z,Ds=new z,Us=new z,fu=new z,Ns=new z,Ep=new z,Fs=new z,Ft=class extends en{constructor(e=new Vt,t=new Vn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,a=r.length;o<a;o++){let s=r[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[s]=o}}}}getVertexPosition(e,t){let i=this.geometry,r=i.attributes.position,o=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);let s=this.morphTargetInfluences;if(o&&s){Ns.set(0,0,0);for(let l=0,u=o.length;l<u;l++){let c=s[l],f=o[l];c!==0&&(fu.fromBufferAttribute(f,e),a?Ns.addScaledVector(fu,c):Ns.addScaledVector(fu.sub(t),c))}t.add(Ns)}return t}raycast(e,t){let i=this.geometry,r=this.material,o=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Is.copy(i.boundingSphere),Is.applyMatrix4(o),Mr.copy(e.ray).recast(e.near),!(Is.containsPoint(Mr.origin)===!1&&(Mr.intersectSphere(Is,Ap)===null||Mr.origin.distanceToSquared(Ap)>(e.far-e.near)**2))&&(wp.copy(o).invert(),Mr.copy(e.ray).applyMatrix4(wp),!(i.boundingBox!==null&&Mr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Mr)))}_computeIntersections(e,t,i){let r,o=this.geometry,a=this.material,s=o.index,l=o.attributes.position,u=o.attributes.uv,c=o.attributes.uv1,f=o.attributes.normal,d=o.groups,h=o.drawRange;if(s!==null)if(Array.isArray(a))for(let m=0,x=d.length;m<x;m++){let g=d[m],p=a[g.materialIndex],_=Math.max(g.start,h.start),y=Math.min(s.count,Math.min(g.start+g.count,h.start+h.count));for(let v=_,R=y;v<R;v+=3){let E=s.getX(v),P=s.getX(v+1),L=s.getX(v+2);r=Os(this,p,e,i,u,c,f,E,P,L),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{let m=Math.max(0,h.start),x=Math.min(s.count,h.start+h.count);for(let g=m,p=x;g<p;g+=3){let _=s.getX(g),y=s.getX(g+1),v=s.getX(g+2);r=Os(this,a,e,i,u,c,f,_,y,v),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,x=d.length;m<x;m++){let g=d[m],p=a[g.materialIndex],_=Math.max(g.start,h.start),y=Math.min(l.count,Math.min(g.start+g.count,h.start+h.count));for(let v=_,R=y;v<R;v+=3){let E=v,P=v+1,L=v+2;r=Os(this,p,e,i,u,c,f,E,P,L),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{let m=Math.max(0,h.start),x=Math.min(l.count,h.start+h.count);for(let g=m,p=x;g<p;g+=3){let _=g,y=g+1,v=g+2;r=Os(this,a,e,i,u,c,f,_,y,v),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}}};function Mv(n,e,t,i,r,o,a,s){let l;if(e.side===Qt?l=i.intersectTriangle(a,o,r,!0,s):l=i.intersectTriangle(r,o,a,e.side===rr,s),l===null)return null;Fs.copy(s),Fs.applyMatrix4(n.matrixWorld);let u=t.ray.origin.distanceTo(Fs);return u<t.near||u>t.far?null:{distance:u,point:Fs.clone(),object:n}}function Os(n,e,t,i,r,o,a,s,l,u){n.getVertexPosition(s,Ls),n.getVertexPosition(l,Ds),n.getVertexPosition(u,Us);let c=Mv(n,e,t,i,Ls,Ds,Us,Ep);if(c){let f=new z;tr.getBarycoord(Ep,Ls,Ds,Us,f),r&&(c.uv=tr.getInterpolatedAttribute(r,s,l,u,f,new Le)),o&&(c.uv1=tr.getInterpolatedAttribute(o,s,l,u,f,new Le)),a&&(c.normal=tr.getInterpolatedAttribute(a,s,l,u,f,new z),c.normal.dot(i.direction)>0&&c.normal.multiplyScalar(-1));let d={a:s,b:l,c:u,normal:new z,materialIndex:0};tr.getNormal(Ls,Ds,Us,d.normal),c.face=d,c.barycoord=f}return c}var ya=class n extends Vt{constructor(e=1,t=1,i=1,r=1,o=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:o,depthSegments:a};let s=this;r=Math.floor(r),o=Math.floor(o),a=Math.floor(a);let l=[],u=[],c=[],f=[],d=0,h=0;m("z","y","x",-1,-1,i,t,e,a,o,0),m("z","y","x",1,-1,i,t,-e,a,o,1),m("x","z","y",1,1,e,i,t,r,a,2),m("x","z","y",1,-1,e,i,-t,r,a,3),m("x","y","z",1,-1,e,t,i,r,o,4),m("x","y","z",-1,-1,e,t,-i,r,o,5),this.setIndex(l),this.setAttribute("position",new Tt(u,3)),this.setAttribute("normal",new Tt(c,3)),this.setAttribute("uv",new Tt(f,2));function m(x,g,p,_,y,v,R,E,P,L,b){let S=v/P,T=R/L,O=v/2,F=R/2,H=E/2,U=P+1,N=L+1,te=0,D=0,k=new z;for(let J=0;J<N;J++){let $=J*T-F;for(let re=0;re<U;re++){let le=re*S-O;k[x]=le*_,k[g]=$*y,k[p]=H,u.push(k.x,k.y,k.z),k[x]=0,k[g]=0,k[p]=E>0?1:-1,c.push(k.x,k.y,k.z),f.push(re/P),f.push(1-J/L),te+=1}}for(let J=0;J<L;J++)for(let $=0;$<P;$++){let re=d+$+U*J,le=d+$+U*(J+1),q=d+($+1)+U*(J+1),W=d+($+1)+U*J;l.push(re,le,W),l.push(le,q,W),D+=6}s.addGroup(h,D,b),h+=D,d+=te}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function Mo(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function vn(n){let e={};for(let t=0;t<n.length;t++){let i=Mo(n[t]);for(let r in i)e[r]=i[r]}return e}function Sv(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Pm(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:gt.workingColorSpace}var bv={clone:Mo,merge:vn},wv=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Av=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Tn=class extends Mi{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=wv,this.fragmentShader=Av,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Mo(e.uniforms),this.uniformsGroups=Sv(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}},dl=class extends en{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new wt,this.projectionMatrix=new wt,this.projectionMatrixInverse=new wt,this.coordinateSystem=zi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Qi=new z,Tp=new Le,Cp=new Le,yn=class extends dl{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=ga*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(ca*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ga*2*Math.atan(Math.tan(ca*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Qi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Qi.x,Qi.y).multiplyScalar(-e/Qi.z),Qi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Qi.x,Qi.y).multiplyScalar(-e/Qi.z)}getViewSize(e,t){return this.getViewBounds(e,Tp,Cp),t.subVectors(Cp,Tp)}setViewOffset(e,t,i,r,o,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=o,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(ca*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,o=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,u=a.fullHeight;o+=a.offsetX*r/l,t-=a.offsetY*i/u,r*=a.width/l,i*=a.height/u}let s=this.filmOffset;s!==0&&(o+=e*s/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+r,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},no=-90,io=1,gf=class extends en{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new yn(no,io,e,t);r.layers=this.layers,this.add(r);let o=new yn(no,io,e,t);o.layers=this.layers,this.add(o);let a=new yn(no,io,e,t);a.layers=this.layers,this.add(a);let s=new yn(no,io,e,t);s.layers=this.layers,this.add(s);let l=new yn(no,io,e,t);l.layers=this.layers,this.add(l);let u=new yn(no,io,e,t);u.layers=this.layers,this.add(u)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,r,o,a,s,l]=t;for(let u of t)this.remove(u);if(e===zi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),o.up.set(0,0,-1),o.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),s.up.set(0,1,0),s.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===al)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),o.up.set(0,0,1),o.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),s.up.set(0,-1,0),s.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let u of t)this.add(u),u.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[o,a,s,l,u,c]=this.children,f=e.getRenderTarget(),d=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,o),e.setRenderTarget(i,1,r),e.render(t,a),e.setRenderTarget(i,2,r),e.render(t,s),e.setRenderTarget(i,3,r),e.render(t,l),e.setRenderTarget(i,4,r),e.render(t,u),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,r),e.render(t,c),e.setRenderTarget(f,d,h),e.xr.enabled=m,i.texture.needsPMREMUpdate=!0}},hl=class extends En{constructor(e,t,i,r,o,a,s,l,u,c){e=e!==void 0?e:[],t=t!==void 0?t:xo,super(e,t,i,r,o,a,s,l,u,c),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},xf=class extends Gi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new hl(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:vi}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new ya(5,5,5),o=new Tn({name:"CubemapFromEquirect",uniforms:Mo(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Qt,blending:nr});o.uniforms.tEquirect.value=t;let a=new Ft(r,o),s=t.minFilter;return t.minFilter===Rr&&(t.minFilter=vi),new gf(1,10,this).update(e,a),t.minFilter=s,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,i,r){let o=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(o)}},du=new z,Ev=new z,Tv=new je,Bi=class{constructor(e=new z(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let r=du.subVectors(i,t).cross(Ev.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let i=e.delta(du),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let o=-(e.start.dot(this.normal)+this.constant)/r;return o<0||o>1?null:t.copy(e.start).addScaledVector(i,o)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||Tv.getNormalMatrix(e),r=this.coplanarPoint(du).applyMatrix4(e),o=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(o),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Sr=new Lr,Bs=new z,Dr=class{constructor(e=new Bi,t=new Bi,i=new Bi,r=new Bi,o=new Bi,a=new Bi){this.planes=[e,t,i,r,o,a]}set(e,t,i,r,o,a){let s=this.planes;return s[0].copy(e),s[1].copy(t),s[2].copy(i),s[3].copy(r),s[4].copy(o),s[5].copy(a),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=zi){let i=this.planes,r=e.elements,o=r[0],a=r[1],s=r[2],l=r[3],u=r[4],c=r[5],f=r[6],d=r[7],h=r[8],m=r[9],x=r[10],g=r[11],p=r[12],_=r[13],y=r[14],v=r[15];if(i[0].setComponents(l-o,d-u,g-h,v-p).normalize(),i[1].setComponents(l+o,d+u,g+h,v+p).normalize(),i[2].setComponents(l+a,d+c,g+m,v+_).normalize(),i[3].setComponents(l-a,d-c,g-m,v-_).normalize(),i[4].setComponents(l-s,d-f,g-x,v-y).normalize(),t===zi)i[5].setComponents(l+s,d+f,g+x,v+y).normalize();else if(t===al)i[5].setComponents(s,f,x,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Sr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Sr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Sr)}intersectsSprite(e){return Sr.center.set(0,0,0),Sr.radius=.7071067811865476,Sr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Sr)}intersectsSphere(e){let t=this.planes,i=e.center,r=-e.radius;for(let o=0;o<6;o++)if(t[o].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let r=t[i];if(Bs.x=r.normal.x>0?e.max.x:e.min.x,Bs.y=r.normal.y>0?e.max.y:e.min.y,Bs.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Bs)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Im(){let n=null,e=!1,t=null,i=null;function r(o,a){t(o,a),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(o){t=o},setContext:function(o){n=o}}}function Cv(n){let e=new WeakMap;function t(s,l){let u=s.array,c=s.usage,f=u.byteLength,d=n.createBuffer();n.bindBuffer(l,d),n.bufferData(l,u,c),s.onUploadCallback();let h;if(u instanceof Float32Array)h=n.FLOAT;else if(u instanceof Uint16Array)s.isFloat16BufferAttribute?h=n.HALF_FLOAT:h=n.UNSIGNED_SHORT;else if(u instanceof Int16Array)h=n.SHORT;else if(u instanceof Uint32Array)h=n.UNSIGNED_INT;else if(u instanceof Int32Array)h=n.INT;else if(u instanceof Int8Array)h=n.BYTE;else if(u instanceof Uint8Array)h=n.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)h=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:d,type:h,bytesPerElement:u.BYTES_PER_ELEMENT,version:s.version,size:f}}function i(s,l,u){let c=l.array,f=l.updateRanges;if(n.bindBuffer(u,s),f.length===0)n.bufferSubData(u,0,c);else{f.sort((h,m)=>h.start-m.start);let d=0;for(let h=1;h<f.length;h++){let m=f[d],x=f[h];x.start<=m.start+m.count+1?m.count=Math.max(m.count,x.start+x.count-m.start):(++d,f[d]=x)}f.length=d+1;for(let h=0,m=f.length;h<m;h++){let x=f[h];n.bufferSubData(u,x.start*c.BYTES_PER_ELEMENT,c,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(s){return s.isInterleavedBufferAttribute&&(s=s.data),e.get(s)}function o(s){s.isInterleavedBufferAttribute&&(s=s.data);let l=e.get(s);l&&(n.deleteBuffer(l.buffer),e.delete(s))}function a(s,l){if(s.isInterleavedBufferAttribute&&(s=s.data),s.isGLBufferAttribute){let c=e.get(s);(!c||c.version<s.version)&&e.set(s,{buffer:s.buffer,type:s.type,bytesPerElement:s.elementSize,version:s.version});return}let u=e.get(s);if(u===void 0)e.set(s,t(s,l));else if(u.version<s.version){if(u.size!==s.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(u.buffer,s,l),u.version=s.version}}return{get:r,remove:o,update:a}}var pl=class n extends Vt{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};let o=e/2,a=t/2,s=Math.floor(i),l=Math.floor(r),u=s+1,c=l+1,f=e/s,d=t/l,h=[],m=[],x=[],g=[];for(let p=0;p<c;p++){let _=p*d-a;for(let y=0;y<u;y++){let v=y*f-o;m.push(v,-_,0),x.push(0,0,1),g.push(y/s),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let _=0;_<s;_++){let y=_+u*p,v=_+u*(p+1),R=_+1+u*(p+1),E=_+1+u*p;h.push(y,v,E),h.push(v,R,E)}this.setIndex(h),this.setAttribute("position",new Tt(m,3)),this.setAttribute("normal",new Tt(x,3)),this.setAttribute("uv",new Tt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}},Rv=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Pv=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Iv=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Lv=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Dv=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Uv=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Nv=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Fv=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ov=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Bv=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,kv=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,zv=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Hv=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Vv=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Gv=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Wv=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,qv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Xv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Yv=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Zv=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Kv=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,$v=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Jv=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,jv=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Qv=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,ey=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,ty=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ny=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,iy=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ry=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,oy="gl_FragColor = linearToOutputTexel( gl_FragColor );",ay=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,sy=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,ly=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,cy=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,uy=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,fy=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,dy=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,hy=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,py=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,my=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gy=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,xy=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,vy=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,yy=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,_y=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,My=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Sy=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,by=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,wy=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ay=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Ey=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Ty=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Cy=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Ry=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Py=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Iy=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ly=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Dy=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Uy=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ny=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Fy=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Oy=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,By=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ky=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,zy=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Hy=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Vy=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Gy=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Wy=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,qy=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Xy=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Yy=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Zy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ky=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$y=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Jy=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,jy=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Qy=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,e_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,t_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,n_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,i_=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,r_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,o_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,a_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,s_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,l_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,c_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,u_=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,f_=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,d_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,h_=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,p_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,m_=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,g_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,x_=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,v_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,y_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,__=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,M_=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,S_=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,b_=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,w_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,A_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,E_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,T_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,C_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,R_=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,P_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,I_=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,L_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,D_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,U_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,N_=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,F_=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,O_=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,B_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,k_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,z_=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,H_=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,V_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,G_=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,W_=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,q_=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,X_=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Y_=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Z_=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,K_=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,$_=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,J_=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,j_=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Q_=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,e1=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,t1=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,n1=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,i1=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,r1=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,o1=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,a1=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,s1=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,tt={alphahash_fragment:Rv,alphahash_pars_fragment:Pv,alphamap_fragment:Iv,alphamap_pars_fragment:Lv,alphatest_fragment:Dv,alphatest_pars_fragment:Uv,aomap_fragment:Nv,aomap_pars_fragment:Fv,batching_pars_vertex:Ov,batching_vertex:Bv,begin_vertex:kv,beginnormal_vertex:zv,bsdfs:Hv,iridescence_fragment:Vv,bumpmap_pars_fragment:Gv,clipping_planes_fragment:Wv,clipping_planes_pars_fragment:qv,clipping_planes_pars_vertex:Xv,clipping_planes_vertex:Yv,color_fragment:Zv,color_pars_fragment:Kv,color_pars_vertex:$v,color_vertex:Jv,common:jv,cube_uv_reflection_fragment:Qv,defaultnormal_vertex:ey,displacementmap_pars_vertex:ty,displacementmap_vertex:ny,emissivemap_fragment:iy,emissivemap_pars_fragment:ry,colorspace_fragment:oy,colorspace_pars_fragment:ay,envmap_fragment:sy,envmap_common_pars_fragment:ly,envmap_pars_fragment:cy,envmap_pars_vertex:uy,envmap_physical_pars_fragment:My,envmap_vertex:fy,fog_vertex:dy,fog_pars_vertex:hy,fog_fragment:py,fog_pars_fragment:my,gradientmap_pars_fragment:gy,lightmap_pars_fragment:xy,lights_lambert_fragment:vy,lights_lambert_pars_fragment:yy,lights_pars_begin:_y,lights_toon_fragment:Sy,lights_toon_pars_fragment:by,lights_phong_fragment:wy,lights_phong_pars_fragment:Ay,lights_physical_fragment:Ey,lights_physical_pars_fragment:Ty,lights_fragment_begin:Cy,lights_fragment_maps:Ry,lights_fragment_end:Py,logdepthbuf_fragment:Iy,logdepthbuf_pars_fragment:Ly,logdepthbuf_pars_vertex:Dy,logdepthbuf_vertex:Uy,map_fragment:Ny,map_pars_fragment:Fy,map_particle_fragment:Oy,map_particle_pars_fragment:By,metalnessmap_fragment:ky,metalnessmap_pars_fragment:zy,morphinstance_vertex:Hy,morphcolor_vertex:Vy,morphnormal_vertex:Gy,morphtarget_pars_vertex:Wy,morphtarget_vertex:qy,normal_fragment_begin:Xy,normal_fragment_maps:Yy,normal_pars_fragment:Zy,normal_pars_vertex:Ky,normal_vertex:$y,normalmap_pars_fragment:Jy,clearcoat_normal_fragment_begin:jy,clearcoat_normal_fragment_maps:Qy,clearcoat_pars_fragment:e_,iridescence_pars_fragment:t_,opaque_fragment:n_,packing:i_,premultiplied_alpha_fragment:r_,project_vertex:o_,dithering_fragment:a_,dithering_pars_fragment:s_,roughnessmap_fragment:l_,roughnessmap_pars_fragment:c_,shadowmap_pars_fragment:u_,shadowmap_pars_vertex:f_,shadowmap_vertex:d_,shadowmask_pars_fragment:h_,skinbase_vertex:p_,skinning_pars_vertex:m_,skinning_vertex:g_,skinnormal_vertex:x_,specularmap_fragment:v_,specularmap_pars_fragment:y_,tonemapping_fragment:__,tonemapping_pars_fragment:M_,transmission_fragment:S_,transmission_pars_fragment:b_,uv_pars_fragment:w_,uv_pars_vertex:A_,uv_vertex:E_,worldpos_vertex:T_,background_vert:C_,background_frag:R_,backgroundCube_vert:P_,backgroundCube_frag:I_,cube_vert:L_,cube_frag:D_,depth_vert:U_,depth_frag:N_,distanceRGBA_vert:F_,distanceRGBA_frag:O_,equirect_vert:B_,equirect_frag:k_,linedashed_vert:z_,linedashed_frag:H_,meshbasic_vert:V_,meshbasic_frag:G_,meshlambert_vert:W_,meshlambert_frag:q_,meshmatcap_vert:X_,meshmatcap_frag:Y_,meshnormal_vert:Z_,meshnormal_frag:K_,meshphong_vert:$_,meshphong_frag:J_,meshphysical_vert:j_,meshphysical_frag:Q_,meshtoon_vert:e1,meshtoon_frag:t1,points_vert:n1,points_frag:i1,shadow_vert:r1,shadow_frag:o1,sprite_vert:a1,sprite_frag:s1},Ae={common:{diffuse:{value:new $e(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new je}},envmap:{envMap:{value:null},envMapRotation:{value:new je},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new je}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new je}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new je},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new je},normalScale:{value:new Le(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new je},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new je}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new je}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new je}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new $e(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new $e(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0},uvTransform:{value:new je}},sprite:{diffuse:{value:new $e(16777215)},opacity:{value:1},center:{value:new Le(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}}},xi={basic:{uniforms:vn([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.fog]),vertexShader:tt.meshbasic_vert,fragmentShader:tt.meshbasic_frag},lambert:{uniforms:vn([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,Ae.lights,{emissive:{value:new $e(0)}}]),vertexShader:tt.meshlambert_vert,fragmentShader:tt.meshlambert_frag},phong:{uniforms:vn([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,Ae.lights,{emissive:{value:new $e(0)},specular:{value:new $e(1118481)},shininess:{value:30}}]),vertexShader:tt.meshphong_vert,fragmentShader:tt.meshphong_frag},standard:{uniforms:vn([Ae.common,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.roughnessmap,Ae.metalnessmap,Ae.fog,Ae.lights,{emissive:{value:new $e(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:tt.meshphysical_vert,fragmentShader:tt.meshphysical_frag},toon:{uniforms:vn([Ae.common,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.gradientmap,Ae.fog,Ae.lights,{emissive:{value:new $e(0)}}]),vertexShader:tt.meshtoon_vert,fragmentShader:tt.meshtoon_frag},matcap:{uniforms:vn([Ae.common,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,{matcap:{value:null}}]),vertexShader:tt.meshmatcap_vert,fragmentShader:tt.meshmatcap_frag},points:{uniforms:vn([Ae.points,Ae.fog]),vertexShader:tt.points_vert,fragmentShader:tt.points_frag},dashed:{uniforms:vn([Ae.common,Ae.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:tt.linedashed_vert,fragmentShader:tt.linedashed_frag},depth:{uniforms:vn([Ae.common,Ae.displacementmap]),vertexShader:tt.depth_vert,fragmentShader:tt.depth_frag},normal:{uniforms:vn([Ae.common,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,{opacity:{value:1}}]),vertexShader:tt.meshnormal_vert,fragmentShader:tt.meshnormal_frag},sprite:{uniforms:vn([Ae.sprite,Ae.fog]),vertexShader:tt.sprite_vert,fragmentShader:tt.sprite_frag},background:{uniforms:{uvTransform:{value:new je},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:tt.background_vert,fragmentShader:tt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new je}},vertexShader:tt.backgroundCube_vert,fragmentShader:tt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:tt.cube_vert,fragmentShader:tt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:tt.equirect_vert,fragmentShader:tt.equirect_frag},distanceRGBA:{uniforms:vn([Ae.common,Ae.displacementmap,{referencePosition:{value:new z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:tt.distanceRGBA_vert,fragmentShader:tt.distanceRGBA_frag},shadow:{uniforms:vn([Ae.lights,Ae.fog,{color:{value:new $e(0)},opacity:{value:1}}]),vertexShader:tt.shadow_vert,fragmentShader:tt.shadow_frag}};xi.physical={uniforms:vn([xi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new je},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new je},clearcoatNormalScale:{value:new Le(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new je},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new je},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new je},sheen:{value:0},sheenColor:{value:new $e(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new je},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new je},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new je},transmissionSamplerSize:{value:new Le},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new je},attenuationDistance:{value:0},attenuationColor:{value:new $e(0)},specularColor:{value:new $e(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new je},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new je},anisotropyVector:{value:new Le},anisotropyMap:{value:null},anisotropyMapTransform:{value:new je}}]),vertexShader:tt.meshphysical_vert,fragmentShader:tt.meshphysical_frag};var ks={r:0,b:0,g:0},br=new _i,l1=new wt;function c1(n,e,t,i,r,o,a){let s=new $e(0),l=o===!0?0:1,u,c,f=null,d=0,h=null;function m(_){let y=_.isScene===!0?_.background:null;return y&&y.isTexture&&(y=(_.backgroundBlurriness>0?t:e).get(y)),y}function x(_){let y=!1,v=m(_);v===null?p(s,l):v&&v.isColor&&(p(v,1),y=!0);let R=n.xr.getEnvironmentBlendMode();R==="additive"?i.buffers.color.setClear(0,0,0,1,a):R==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||y)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function g(_,y){let v=m(y);v&&(v.isCubeTexture||v.mapping===Ul)?(c===void 0&&(c=new Ft(new ya(1,1,1),new Tn({name:"BackgroundCubeMaterial",uniforms:Mo(xi.backgroundCube.uniforms),vertexShader:xi.backgroundCube.vertexShader,fragmentShader:xi.backgroundCube.fragmentShader,side:Qt,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(R,E,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(c)),br.copy(y.backgroundRotation),br.x*=-1,br.y*=-1,br.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(br.y*=-1,br.z*=-1),c.material.uniforms.envMap.value=v,c.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(l1.makeRotationFromEuler(br)),c.material.toneMapped=gt.getTransfer(v.colorSpace)!==Et,(f!==v||d!==v.version||h!==n.toneMapping)&&(c.material.needsUpdate=!0,f=v,d=v.version,h=n.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null)):v&&v.isTexture&&(u===void 0&&(u=new Ft(new pl(2,2),new Tn({name:"BackgroundMaterial",uniforms:Mo(xi.background.uniforms),vertexShader:xi.background.vertexShader,fragmentShader:xi.background.fragmentShader,side:rr,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),Object.defineProperty(u.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(u)),u.material.uniforms.t2D.value=v,u.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,u.material.toneMapped=gt.getTransfer(v.colorSpace)!==Et,v.matrixAutoUpdate===!0&&v.updateMatrix(),u.material.uniforms.uvTransform.value.copy(v.matrix),(f!==v||d!==v.version||h!==n.toneMapping)&&(u.material.needsUpdate=!0,f=v,d=v.version,h=n.toneMapping),u.layers.enableAll(),_.unshift(u,u.geometry,u.material,0,0,null))}function p(_,y){_.getRGB(ks,Pm(n)),i.buffers.color.setClear(ks.r,ks.g,ks.b,y,a)}return{getClearColor:function(){return s},setClearColor:function(_,y=1){s.set(_),l=y,p(s,l)},getClearAlpha:function(){return l},setClearAlpha:function(_){l=_,p(s,l)},render:x,addToRenderList:g}}function u1(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=d(null),o=r,a=!1;function s(S,T,O,F,H){let U=!1,N=f(F,O,T);o!==N&&(o=N,u(o.object)),U=h(S,F,O,H),U&&m(S,F,O,H),H!==null&&e.update(H,n.ELEMENT_ARRAY_BUFFER),(U||a)&&(a=!1,v(S,T,O,F),H!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(H).buffer))}function l(){return n.createVertexArray()}function u(S){return n.bindVertexArray(S)}function c(S){return n.deleteVertexArray(S)}function f(S,T,O){let F=O.wireframe===!0,H=i[S.id];H===void 0&&(H={},i[S.id]=H);let U=H[T.id];U===void 0&&(U={},H[T.id]=U);let N=U[F];return N===void 0&&(N=d(l()),U[F]=N),N}function d(S){let T=[],O=[],F=[];for(let H=0;H<t;H++)T[H]=0,O[H]=0,F[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:T,enabledAttributes:O,attributeDivisors:F,object:S,attributes:{},index:null}}function h(S,T,O,F){let H=o.attributes,U=T.attributes,N=0,te=O.getAttributes();for(let D in te)if(te[D].location>=0){let J=H[D],$=U[D];if($===void 0&&(D==="instanceMatrix"&&S.instanceMatrix&&($=S.instanceMatrix),D==="instanceColor"&&S.instanceColor&&($=S.instanceColor)),J===void 0||J.attribute!==$||$&&J.data!==$.data)return!0;N++}return o.attributesNum!==N||o.index!==F}function m(S,T,O,F){let H={},U=T.attributes,N=0,te=O.getAttributes();for(let D in te)if(te[D].location>=0){let J=U[D];J===void 0&&(D==="instanceMatrix"&&S.instanceMatrix&&(J=S.instanceMatrix),D==="instanceColor"&&S.instanceColor&&(J=S.instanceColor));let $={};$.attribute=J,J&&J.data&&($.data=J.data),H[D]=$,N++}o.attributes=H,o.attributesNum=N,o.index=F}function x(){let S=o.newAttributes;for(let T=0,O=S.length;T<O;T++)S[T]=0}function g(S){p(S,0)}function p(S,T){let O=o.newAttributes,F=o.enabledAttributes,H=o.attributeDivisors;O[S]=1,F[S]===0&&(n.enableVertexAttribArray(S),F[S]=1),H[S]!==T&&(n.vertexAttribDivisor(S,T),H[S]=T)}function _(){let S=o.newAttributes,T=o.enabledAttributes;for(let O=0,F=T.length;O<F;O++)T[O]!==S[O]&&(n.disableVertexAttribArray(O),T[O]=0)}function y(S,T,O,F,H,U,N){N===!0?n.vertexAttribIPointer(S,T,O,H,U):n.vertexAttribPointer(S,T,O,F,H,U)}function v(S,T,O,F){x();let H=F.attributes,U=O.getAttributes(),N=T.defaultAttributeValues;for(let te in U){let D=U[te];if(D.location>=0){let k=H[te];if(k===void 0&&(te==="instanceMatrix"&&S.instanceMatrix&&(k=S.instanceMatrix),te==="instanceColor"&&S.instanceColor&&(k=S.instanceColor)),k!==void 0){let J=k.normalized,$=k.itemSize,re=e.get(k);if(re===void 0)continue;let le=re.buffer,q=re.type,W=re.bytesPerElement,j=q===n.INT||q===n.UNSIGNED_INT||k.gpuType===jf;if(k.isInterleavedBufferAttribute){let oe=k.data,de=oe.stride,me=k.offset;if(oe.isInstancedInterleavedBuffer){for(let ue=0;ue<D.locationSize;ue++)p(D.location+ue,oe.meshPerAttribute);S.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let ue=0;ue<D.locationSize;ue++)g(D.location+ue);n.bindBuffer(n.ARRAY_BUFFER,le);for(let ue=0;ue<D.locationSize;ue++)y(D.location+ue,$/D.locationSize,q,J,de*W,(me+$/D.locationSize*ue)*W,j)}else{if(k.isInstancedBufferAttribute){for(let oe=0;oe<D.locationSize;oe++)p(D.location+oe,k.meshPerAttribute);S.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=k.meshPerAttribute*k.count)}else for(let oe=0;oe<D.locationSize;oe++)g(D.location+oe);n.bindBuffer(n.ARRAY_BUFFER,le);for(let oe=0;oe<D.locationSize;oe++)y(D.location+oe,$/D.locationSize,q,J,$*W,$/D.locationSize*oe*W,j)}}else if(N!==void 0){let J=N[te];if(J!==void 0)switch(J.length){case 2:n.vertexAttrib2fv(D.location,J);break;case 3:n.vertexAttrib3fv(D.location,J);break;case 4:n.vertexAttrib4fv(D.location,J);break;default:n.vertexAttrib1fv(D.location,J)}}}}_()}function R(){L();for(let S in i){let T=i[S];for(let O in T){let F=T[O];for(let H in F)c(F[H].object),delete F[H];delete T[O]}delete i[S]}}function E(S){if(i[S.id]===void 0)return;let T=i[S.id];for(let O in T){let F=T[O];for(let H in F)c(F[H].object),delete F[H];delete T[O]}delete i[S.id]}function P(S){for(let T in i){let O=i[T];if(O[S.id]===void 0)continue;let F=O[S.id];for(let H in F)c(F[H].object),delete F[H];delete O[S.id]}}function L(){b(),a=!0,o!==r&&(o=r,u(o.object))}function b(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:s,reset:L,resetDefaultState:b,dispose:R,releaseStatesOfGeometry:E,releaseStatesOfProgram:P,initAttributes:x,enableAttribute:g,disableUnusedAttributes:_}}function f1(n,e,t){let i;function r(u){i=u}function o(u,c){n.drawArrays(i,u,c),t.update(c,i,1)}function a(u,c,f){f!==0&&(n.drawArraysInstanced(i,u,c,f),t.update(c,i,f))}function s(u,c,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,u,0,c,0,f);let h=0;for(let m=0;m<f;m++)h+=c[m];t.update(h,i,1)}function l(u,c,f,d){if(f===0)return;let h=e.get("WEBGL_multi_draw");if(h===null)for(let m=0;m<u.length;m++)a(u[m],c[m],d[m]);else{h.multiDrawArraysInstancedWEBGL(i,u,0,c,0,d,0,f);let m=0;for(let x=0;x<f;x++)m+=c[x]*d[x];t.update(m,i,1)}}this.setMode=r,this.render=o,this.renderInstances=a,this.renderMultiDraw=s,this.renderMultiDrawInstances=l}function d1(n,e,t,i){let r;function o(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let P=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(P){return!(P!==ii&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function s(P){let L=P===Ra&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==Vi&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==ki&&!L)}function l(P){if(P==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let u=t.precision!==void 0?t.precision:"highp",c=l(u);c!==u&&(console.warn("THREE.WebGLRenderer:",u,"not supported, using",c,"instead."),u=c);let f=t.logarithmicDepthBuffer===!0,d=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),h=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),_=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),y=n.getParameter(n.MAX_VARYING_VECTORS),v=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),R=m>0,E=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:o,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:s,precision:u,logarithmicDepthBuffer:f,reverseDepthBuffer:d,maxTextures:h,maxVertexTextures:m,maxTextureSize:x,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:_,maxVaryings:y,maxFragmentUniforms:v,vertexTextures:R,maxSamples:E}}function h1(n){let e=this,t=null,i=0,r=!1,o=!1,a=new Bi,s=new je,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){let h=f.length!==0||d||i!==0||r;return r=d,i=f.length,h},this.beginShadows=function(){o=!0,c(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(f,d){t=c(f,d,0)},this.setState=function(f,d,h){let m=f.clippingPlanes,x=f.clipIntersection,g=f.clipShadows,p=n.get(f);if(!r||m===null||m.length===0||o&&!g)o?c(null):u();else{let _=o?0:i,y=_*4,v=p.clippingState||null;l.value=v,v=c(m,d,y,h);for(let R=0;R!==y;++R)v[R]=t[R];p.clippingState=v,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=_}};function u(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function c(f,d,h,m){let x=f!==null?f.length:0,g=null;if(x!==0){if(g=l.value,m!==!0||g===null){let p=h+x*4,_=d.matrixWorldInverse;s.getNormalMatrix(_),(g===null||g.length<p)&&(g=new Float32Array(p));for(let y=0,v=h;y!==x;++y,v+=4)a.copy(f[y]).applyMatrix4(_,s),a.normal.toArray(g,v),g[v+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,g}}function p1(n){let e=new WeakMap;function t(a,s){return s===Uu?a.mapping=xo:s===Nu&&(a.mapping=vo),a}function i(a){if(a&&a.isTexture){let s=a.mapping;if(s===Uu||s===Nu)if(e.has(a)){let l=e.get(a).texture;return t(l,a.mapping)}else{let l=a.image;if(l&&l.height>0){let u=new xf(l.height);return u.fromEquirectangularTexture(n,a),e.set(a,u),a.addEventListener("dispose",r),t(u.texture,a.mapping)}else return null}}return a}function r(a){let s=a.target;s.removeEventListener("dispose",r);let l=e.get(s);l!==void 0&&(e.delete(s),l.dispose())}function o(){e=new WeakMap}return{get:i,dispose:o}}var ml=class extends dl{constructor(e=-1,t=1,i=1,r=-1,o=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=o,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,o,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=o,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2,o=i-e,a=i+e,s=r+t,l=r-t;if(this.view!==null&&this.view.enabled){let u=(this.right-this.left)/this.view.fullWidth/this.zoom,c=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=u*this.view.offsetX,a=o+u*this.view.width,s-=c*this.view.offsetY,l=s-c*this.view.height}this.projectionMatrix.makeOrthographic(o,a,s,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},co=4,Rp=[.125,.215,.35,.446,.526,.582],Tr=20,hu=new ml,Pp=new $e,pu=null,mu=0,gu=0,xu=!1,Ar=(1+Math.sqrt(5))/2,ro=1/Ar,Ip=[new z(-Ar,ro,0),new z(Ar,ro,0),new z(-ro,0,Ar),new z(ro,0,Ar),new z(0,Ar,-ro),new z(0,Ar,ro),new z(-1,1,-1),new z(1,1,-1),new z(-1,1,1),new z(1,1,1)],gl=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100){pu=this._renderer.getRenderTarget(),mu=this._renderer.getActiveCubeFace(),gu=this._renderer.getActiveMipmapLevel(),xu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(e,i,r,o),t>0&&this._blur(o,0,0,t),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Up(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Dp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(pu,mu,gu),this._renderer.xr.enabled=xu,e.scissorTest=!1,zs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===xo||e.mapping===vo?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),pu=this._renderer.getRenderTarget(),mu=this._renderer.getActiveCubeFace(),gu=this._renderer.getActiveMipmapLevel(),xu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:vi,minFilter:vi,generateMipmaps:!1,type:Ra,format:ii,colorSpace:wo,depthBuffer:!1},r=Lp(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Lp(e,t,i);let{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=m1(o)),this._blurMaterial=g1(o,e,t)}return r}_compileMaterial(e){let t=new Ft(this._lodPlanes[0],e);this._renderer.compile(t,hu)}_sceneToCubeUV(e,t,i,r){let s=new yn(90,1,t,i),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],c=this._renderer,f=c.autoClear,d=c.toneMapping;c.getClearColor(Pp),c.toneMapping=ir,c.autoClear=!1;let h=new Vn({name:"PMREM.Background",side:Qt,depthWrite:!1,depthTest:!1}),m=new Ft(new ya,h),x=!1,g=e.background;g?g.isColor&&(h.color.copy(g),e.background=null,x=!0):(h.color.copy(Pp),x=!0);for(let p=0;p<6;p++){let _=p%3;_===0?(s.up.set(0,l[p],0),s.lookAt(u[p],0,0)):_===1?(s.up.set(0,0,l[p]),s.lookAt(0,u[p],0)):(s.up.set(0,l[p],0),s.lookAt(0,0,u[p]));let y=this._cubeSize;zs(r,_*y,p>2?y:0,y,y),c.setRenderTarget(r),x&&c.render(m,s),c.render(e,s)}m.geometry.dispose(),m.material.dispose(),c.toneMapping=d,c.autoClear=f,e.background=g}_textureToCubeUV(e,t){let i=this._renderer,r=e.mapping===xo||e.mapping===vo;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Up()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Dp());let o=r?this._cubemapMaterial:this._equirectMaterial,a=new Ft(this._lodPlanes[0],o),s=o.uniforms;s.envMap.value=e;let l=this._cubeSize;zs(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,hu)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let r=this._lodPlanes.length;for(let o=1;o<r;o++){let a=Math.sqrt(this._sigmas[o]*this._sigmas[o]-this._sigmas[o-1]*this._sigmas[o-1]),s=Ip[(r-o-1)%Ip.length];this._blur(e,o-1,o,a,s)}t.autoClear=i}_blur(e,t,i,r,o){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,r,"latitudinal",o),this._halfBlur(a,e,i,i,r,"longitudinal",o)}_halfBlur(e,t,i,r,o,a,s){let l=this._renderer,u=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let c=3,f=new Ft(this._lodPlanes[r],u),d=u.uniforms,h=this._sizeLods[i]-1,m=isFinite(o)?Math.PI/(2*h):2*Math.PI/(2*Tr-1),x=o/m,g=isFinite(o)?1+Math.floor(c*x):Tr;g>Tr&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Tr}`);let p=[],_=0;for(let P=0;P<Tr;++P){let L=P/x,b=Math.exp(-L*L/2);p.push(b),P===0?_+=b:P<g&&(_+=2*b)}for(let P=0;P<p.length;P++)p[P]=p[P]/_;d.envMap.value=e.texture,d.samples.value=g,d.weights.value=p,d.latitudinal.value=a==="latitudinal",s&&(d.poleAxis.value=s);let{_lodMax:y}=this;d.dTheta.value=m,d.mipInt.value=y-i;let v=this._sizeLods[r],R=3*v*(r>y-co?r-y+co:0),E=4*(this._cubeSize-v);zs(t,R,E,3*v,2*v),l.setRenderTarget(t),l.render(f,hu)}};function m1(n){let e=[],t=[],i=[],r=n,o=n-co+1+Rp.length;for(let a=0;a<o;a++){let s=Math.pow(2,r);t.push(s);let l=1/s;a>n-co?l=Rp[a-n+co-1]:a===0&&(l=0),i.push(l);let u=1/(s-2),c=-u,f=1+u,d=[c,c,f,c,f,f,c,c,f,f,c,f],h=6,m=6,x=3,g=2,p=1,_=new Float32Array(x*m*h),y=new Float32Array(g*m*h),v=new Float32Array(p*m*h);for(let E=0;E<h;E++){let P=E%3*2/3-1,L=E>2?0:-1,b=[P,L,0,P+2/3,L,0,P+2/3,L+1,0,P,L,0,P+2/3,L+1,0,P,L+1,0];_.set(b,x*m*E),y.set(d,g*m*E);let S=[E,E,E,E,E,E];v.set(S,p*m*E)}let R=new Vt;R.setAttribute("position",new Fn(_,x)),R.setAttribute("uv",new Fn(y,g)),R.setAttribute("faceIndex",new Fn(v,p)),e.push(R),r>co&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function Lp(n,e,t){let i=new Gi(n,e,t);return i.texture.mapping=Ul,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function zs(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function g1(n,e,t){let i=new Float32Array(Tr),r=new z(0,1,0);return new Tn({name:"SphericalGaussianBlur",defines:{n:Tr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:ad(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:nr,depthTest:!1,depthWrite:!1})}function Dp(){return new Tn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ad(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:nr,depthTest:!1,depthWrite:!1})}function Up(){return new Tn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ad(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:nr,depthTest:!1,depthWrite:!1})}function ad(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function x1(n){let e=new WeakMap,t=null;function i(s){if(s&&s.isTexture){let l=s.mapping,u=l===Uu||l===Nu,c=l===xo||l===vo;if(u||c){let f=e.get(s),d=f!==void 0?f.texture.pmremVersion:0;if(s.isRenderTargetTexture&&s.pmremVersion!==d)return t===null&&(t=new gl(n)),f=u?t.fromEquirectangular(s,f):t.fromCubemap(s,f),f.texture.pmremVersion=s.pmremVersion,e.set(s,f),f.texture;if(f!==void 0)return f.texture;{let h=s.image;return u&&h&&h.height>0||c&&h&&r(h)?(t===null&&(t=new gl(n)),f=u?t.fromEquirectangular(s):t.fromCubemap(s),f.texture.pmremVersion=s.pmremVersion,e.set(s,f),s.addEventListener("dispose",o),f.texture):null}}}return s}function r(s){let l=0,u=6;for(let c=0;c<u;c++)s[c]!==void 0&&l++;return l===u}function o(s){let l=s.target;l.removeEventListener("dispose",o);let u=e.get(l);u!==void 0&&(e.delete(l),u.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function v1(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let r=t(i);return r===null&&sa("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function y1(n,e,t,i){let r={},o=new WeakMap;function a(f){let d=f.target;d.index!==null&&e.remove(d.index);for(let m in d.attributes)e.remove(d.attributes[m]);for(let m in d.morphAttributes){let x=d.morphAttributes[m];for(let g=0,p=x.length;g<p;g++)e.remove(x[g])}d.removeEventListener("dispose",a),delete r[d.id];let h=o.get(d);h&&(e.remove(h),o.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function s(f,d){return r[d.id]===!0||(d.addEventListener("dispose",a),r[d.id]=!0,t.memory.geometries++),d}function l(f){let d=f.attributes;for(let m in d)e.update(d[m],n.ARRAY_BUFFER);let h=f.morphAttributes;for(let m in h){let x=h[m];for(let g=0,p=x.length;g<p;g++)e.update(x[g],n.ARRAY_BUFFER)}}function u(f){let d=[],h=f.index,m=f.attributes.position,x=0;if(h!==null){let _=h.array;x=h.version;for(let y=0,v=_.length;y<v;y+=3){let R=_[y+0],E=_[y+1],P=_[y+2];d.push(R,E,E,P,P,R)}}else if(m!==void 0){let _=m.array;x=m.version;for(let y=0,v=_.length/3-1;y<v;y+=3){let R=y+0,E=y+1,P=y+2;d.push(R,E,E,P,P,R)}}else return;let g=new(Cm(d)?fl:ul)(d,1);g.version=x;let p=o.get(f);p&&e.remove(p),o.set(f,g)}function c(f){let d=o.get(f);if(d){let h=f.index;h!==null&&d.version<h.version&&u(f)}else u(f);return o.get(f)}return{get:s,update:l,getWireframeAttribute:c}}function _1(n,e,t){let i;function r(d){i=d}let o,a;function s(d){o=d.type,a=d.bytesPerElement}function l(d,h){n.drawElements(i,h,o,d*a),t.update(h,i,1)}function u(d,h,m){m!==0&&(n.drawElementsInstanced(i,h,o,d*a,m),t.update(h,i,m))}function c(d,h,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,o,d,0,m);let g=0;for(let p=0;p<m;p++)g+=h[p];t.update(g,i,1)}function f(d,h,m,x){if(m===0)return;let g=e.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<d.length;p++)u(d[p]/a,h[p],x[p]);else{g.multiDrawElementsInstancedWEBGL(i,h,0,o,d,0,x,0,m);let p=0;for(let _=0;_<m;_++)p+=h[_]*x[_];t.update(p,i,1)}}this.setMode=r,this.setIndex=s,this.render=l,this.renderInstances=u,this.renderMultiDraw=c,this.renderMultiDrawInstances=f}function M1(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(o,a,s){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=s*(o/3);break;case n.LINES:t.lines+=s*(o/2);break;case n.LINE_STRIP:t.lines+=s*(o-1);break;case n.LINE_LOOP:t.lines+=s*o;break;case n.POINTS:t.points+=s*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function S1(n,e,t){let i=new WeakMap,r=new Ht;function o(a,s,l){let u=a.morphTargetInfluences,c=s.morphAttributes.position||s.morphAttributes.normal||s.morphAttributes.color,f=c!==void 0?c.length:0,d=i.get(s);if(d===void 0||d.count!==f){let b=function(){P.dispose(),i.delete(s),s.removeEventListener("dispose",b)};d!==void 0&&d.texture.dispose();let h=s.morphAttributes.position!==void 0,m=s.morphAttributes.normal!==void 0,x=s.morphAttributes.color!==void 0,g=s.morphAttributes.position||[],p=s.morphAttributes.normal||[],_=s.morphAttributes.color||[],y=0;h===!0&&(y=1),m===!0&&(y=2),x===!0&&(y=3);let v=s.attributes.position.count*y,R=1;v>e.maxTextureSize&&(R=Math.ceil(v/e.maxTextureSize),v=e.maxTextureSize);let E=new Float32Array(v*R*4*f),P=new ll(E,v,R,f);P.type=ki,P.needsUpdate=!0;let L=y*4;for(let S=0;S<f;S++){let T=g[S],O=p[S],F=_[S],H=v*R*4*S;for(let U=0;U<T.count;U++){let N=U*L;h===!0&&(r.fromBufferAttribute(T,U),E[H+N+0]=r.x,E[H+N+1]=r.y,E[H+N+2]=r.z,E[H+N+3]=0),m===!0&&(r.fromBufferAttribute(O,U),E[H+N+4]=r.x,E[H+N+5]=r.y,E[H+N+6]=r.z,E[H+N+7]=0),x===!0&&(r.fromBufferAttribute(F,U),E[H+N+8]=r.x,E[H+N+9]=r.y,E[H+N+10]=r.z,E[H+N+11]=F.itemSize===4?r.w:1)}}d={count:f,texture:P,size:new Le(v,R)},i.set(s,d),s.addEventListener("dispose",b)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let h=0;for(let x=0;x<u.length;x++)h+=u[x];let m=s.morphTargetsRelative?1:1-h;l.getUniforms().setValue(n,"morphTargetBaseInfluence",m),l.getUniforms().setValue(n,"morphTargetInfluences",u)}l.getUniforms().setValue(n,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:o}}function b1(n,e,t,i){let r=new WeakMap;function o(l){let u=i.render.frame,c=l.geometry,f=e.get(l,c);if(r.get(f)!==u&&(e.update(f),r.set(f,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",s)===!1&&l.addEventListener("dispose",s),r.get(l)!==u&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,u))),l.isSkinnedMesh){let d=l.skeleton;r.get(d)!==u&&(d.update(),r.set(d,u))}return f}function a(){r=new WeakMap}function s(l){let u=l.target;u.removeEventListener("dispose",s),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:o,dispose:a}}var xl=class extends En{constructor(e,t,i,r,o,a,s,l,u,c=ho){if(c!==ho&&c!==_o)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&c===ho&&(i=Pr),i===void 0&&c===_o&&(i=yo),super(null,r,o,a,s,l,c,i,u),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=s!==void 0?s:ri,this.minFilter=l!==void 0?l:ri,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Lm=new En,Np=new xl(1,1),Dm=new ll,Um=new mf,Nm=new hl,Fp=[],Op=[],Bp=new Float32Array(16),kp=new Float32Array(9),zp=new Float32Array(4);function Ao(n,e,t){let i=n[0];if(i<=0||i>0)return n;let r=e*t,o=Fp[r];if(o===void 0&&(o=new Float32Array(r),Fp[r]=o),e!==0){i.toArray(o,0);for(let a=1,s=0;a!==e;++a)s+=t,n[a].toArray(o,s)}return o}function Yt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Zt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Fl(n,e){let t=Op[e];t===void 0&&(t=new Int32Array(e),Op[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function w1(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function A1(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;n.uniform2fv(this.addr,e),Zt(t,e)}}function E1(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Yt(t,e))return;n.uniform3fv(this.addr,e),Zt(t,e)}}function T1(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;n.uniform4fv(this.addr,e),Zt(t,e)}}function C1(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Yt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Zt(t,e)}else{if(Yt(t,i))return;zp.set(i),n.uniformMatrix2fv(this.addr,!1,zp),Zt(t,i)}}function R1(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Yt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Zt(t,e)}else{if(Yt(t,i))return;kp.set(i),n.uniformMatrix3fv(this.addr,!1,kp),Zt(t,i)}}function P1(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Yt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Zt(t,e)}else{if(Yt(t,i))return;Bp.set(i),n.uniformMatrix4fv(this.addr,!1,Bp),Zt(t,i)}}function I1(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function L1(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;n.uniform2iv(this.addr,e),Zt(t,e)}}function D1(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Yt(t,e))return;n.uniform3iv(this.addr,e),Zt(t,e)}}function U1(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;n.uniform4iv(this.addr,e),Zt(t,e)}}function N1(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function F1(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;n.uniform2uiv(this.addr,e),Zt(t,e)}}function O1(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Yt(t,e))return;n.uniform3uiv(this.addr,e),Zt(t,e)}}function B1(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;n.uniform4uiv(this.addr,e),Zt(t,e)}}function k1(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let o;this.type===n.SAMPLER_2D_SHADOW?(Np.compareFunction=Tm,o=Np):o=Lm,t.setTexture2D(e||o,r)}function z1(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Um,r)}function H1(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||Nm,r)}function V1(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Dm,r)}function G1(n){switch(n){case 5126:return w1;case 35664:return A1;case 35665:return E1;case 35666:return T1;case 35674:return C1;case 35675:return R1;case 35676:return P1;case 5124:case 35670:return I1;case 35667:case 35671:return L1;case 35668:case 35672:return D1;case 35669:case 35673:return U1;case 5125:return N1;case 36294:return F1;case 36295:return O1;case 36296:return B1;case 35678:case 36198:case 36298:case 36306:case 35682:return k1;case 35679:case 36299:case 36307:return z1;case 35680:case 36300:case 36308:case 36293:return H1;case 36289:case 36303:case 36311:case 36292:return V1}}function W1(n,e){n.uniform1fv(this.addr,e)}function q1(n,e){let t=Ao(e,this.size,2);n.uniform2fv(this.addr,t)}function X1(n,e){let t=Ao(e,this.size,3);n.uniform3fv(this.addr,t)}function Y1(n,e){let t=Ao(e,this.size,4);n.uniform4fv(this.addr,t)}function Z1(n,e){let t=Ao(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function K1(n,e){let t=Ao(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function $1(n,e){let t=Ao(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function J1(n,e){n.uniform1iv(this.addr,e)}function j1(n,e){n.uniform2iv(this.addr,e)}function Q1(n,e){n.uniform3iv(this.addr,e)}function eM(n,e){n.uniform4iv(this.addr,e)}function tM(n,e){n.uniform1uiv(this.addr,e)}function nM(n,e){n.uniform2uiv(this.addr,e)}function iM(n,e){n.uniform3uiv(this.addr,e)}function rM(n,e){n.uniform4uiv(this.addr,e)}function oM(n,e,t){let i=this.cache,r=e.length,o=Fl(t,r);Yt(i,o)||(n.uniform1iv(this.addr,o),Zt(i,o));for(let a=0;a!==r;++a)t.setTexture2D(e[a]||Lm,o[a])}function aM(n,e,t){let i=this.cache,r=e.length,o=Fl(t,r);Yt(i,o)||(n.uniform1iv(this.addr,o),Zt(i,o));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||Um,o[a])}function sM(n,e,t){let i=this.cache,r=e.length,o=Fl(t,r);Yt(i,o)||(n.uniform1iv(this.addr,o),Zt(i,o));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||Nm,o[a])}function lM(n,e,t){let i=this.cache,r=e.length,o=Fl(t,r);Yt(i,o)||(n.uniform1iv(this.addr,o),Zt(i,o));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Dm,o[a])}function cM(n){switch(n){case 5126:return W1;case 35664:return q1;case 35665:return X1;case 35666:return Y1;case 35674:return Z1;case 35675:return K1;case 35676:return $1;case 5124:case 35670:return J1;case 35667:case 35671:return j1;case 35668:case 35672:return Q1;case 35669:case 35673:return eM;case 5125:return tM;case 36294:return nM;case 36295:return iM;case 36296:return rM;case 35678:case 36198:case 36298:case 36306:case 35682:return oM;case 35679:case 36299:case 36307:return aM;case 35680:case 36300:case 36308:case 36293:return sM;case 36289:case 36303:case 36311:case 36292:return lM}}var vf=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=G1(t.type)}},yf=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=cM(t.type)}},_f=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let r=this.seq;for(let o=0,a=r.length;o!==a;++o){let s=r[o];s.setValue(e,t[s.id],i)}}},vu=/(\w+)(\])?(\[|\.)?/g;function Hp(n,e){n.seq.push(e),n.map[e.id]=e}function uM(n,e,t){let i=n.name,r=i.length;for(vu.lastIndex=0;;){let o=vu.exec(i),a=vu.lastIndex,s=o[1],l=o[2]==="]",u=o[3];if(l&&(s=s|0),u===void 0||u==="["&&a+2===r){Hp(t,u===void 0?new vf(s,n,e):new yf(s,n,e));break}else{let f=t.map[s];f===void 0&&(f=new _f(s),Hp(t,f)),t=f}}}var mo=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){let o=e.getActiveUniform(t,r),a=e.getUniformLocation(t,o.name);uM(o,a,this)}}setValue(e,t,i,r){let o=this.map[t];o!==void 0&&o.setValue(e,i,r)}setOptional(e,t,i){let r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let o=0,a=t.length;o!==a;++o){let s=t[o],l=i[s.id];l.needsUpdate!==!1&&s.setValue(e,l.value,r)}}static seqWithValue(e,t){let i=[];for(let r=0,o=e.length;r!==o;++r){let a=e[r];a.id in t&&i.push(a)}return i}};function Vp(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var fM=37297,dM=0;function hM(n,e){let t=n.split(`
`),i=[],r=Math.max(e-6,0),o=Math.min(e+6,t.length);for(let a=r;a<o;a++){let s=a+1;i.push(`${s===e?">":" "} ${s}: ${t[a]}`)}return i.join(`
`)}var Gp=new je;function pM(n){gt._getMatrix(Gp,gt.workingColorSpace,n);let e=`mat3( ${Gp.elements.map(t=>t.toFixed(4))} )`;switch(gt.getTransfer(n)){case Nl:return[e,"LinearTransferOETF"];case Et:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Wp(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),r=n.getShaderInfoLog(e).trim();if(i&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+hM(n.getShaderSource(e),a)}else return r}function mM(n,e){let t=pM(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function gM(n,e){let t;switch(e){case T0:t="Linear";break;case C0:t="Reinhard";break;case R0:t="Cineon";break;case Jf:t="ACESFilmic";break;case I0:t="AgX";break;case L0:t="Neutral";break;case P0:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Hs=new z;function xM(){gt.getLuminanceCoefficients(Hs);let n=Hs.x.toFixed(4),e=Hs.y.toFixed(4),t=Hs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function vM(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(la).join(`
`)}function yM(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function _M(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){let o=n.getActiveAttrib(e,r),a=o.name,s=1;o.type===n.FLOAT_MAT2&&(s=2),o.type===n.FLOAT_MAT3&&(s=3),o.type===n.FLOAT_MAT4&&(s=4),t[a]={type:o.type,location:n.getAttribLocation(e,a),locationSize:s}}return t}function la(n){return n!==""}function qp(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Xp(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var MM=/^[ \t]*#include +<([\w\d./]+)>/gm;function Mf(n){return n.replace(MM,bM)}var SM=new Map;function bM(n,e){let t=tt[e];if(t===void 0){let i=SM.get(e);if(i!==void 0)t=tt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Mf(t)}var wM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Yp(n){return n.replace(wM,AM)}function AM(n,e,t,i){let r="";for(let o=parseInt(e);o<parseInt(t);o++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return r}function Zp(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function EM(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===hm?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===a0?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Oi&&(e="SHADOWMAP_TYPE_VSM"),e}function TM(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case xo:case vo:e="ENVMAP_TYPE_CUBE";break;case Ul:e="ENVMAP_TYPE_CUBE_UV";break}return e}function CM(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case vo:e="ENVMAP_MODE_REFRACTION";break}return e}function RM(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case pm:e="ENVMAP_BLENDING_MULTIPLY";break;case A0:e="ENVMAP_BLENDING_MIX";break;case E0:e="ENVMAP_BLENDING_ADD";break}return e}function PM(n){let e=n.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function IM(n,e,t,i){let r=n.getContext(),o=t.defines,a=t.vertexShader,s=t.fragmentShader,l=EM(t),u=TM(t),c=CM(t),f=RM(t),d=PM(t),h=vM(t),m=yM(o),x=r.createProgram(),g,p,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(la).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(la).join(`
`),p.length>0&&(p+=`
`)):(g=[Zp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(la).join(`
`),p=[Zp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.envMap?"#define "+c:"",t.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ir?"#define TONE_MAPPING":"",t.toneMapping!==ir?tt.tonemapping_pars_fragment:"",t.toneMapping!==ir?gM("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",tt.colorspace_pars_fragment,mM("linearToOutputTexel",t.outputColorSpace),xM(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(la).join(`
`)),a=Mf(a),a=qp(a,t),a=Xp(a,t),s=Mf(s),s=qp(s,t),s=Xp(s,t),a=Yp(a),s=Yp(s),t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,g=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===sp?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===sp?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let y=_+g+a,v=_+p+s,R=Vp(r,r.VERTEX_SHADER,y),E=Vp(r,r.FRAGMENT_SHADER,v);r.attachShader(x,R),r.attachShader(x,E),t.index0AttributeName!==void 0?r.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(x,0,"position"),r.linkProgram(x);function P(T){if(n.debug.checkShaderErrors){let O=r.getProgramInfoLog(x).trim(),F=r.getShaderInfoLog(R).trim(),H=r.getShaderInfoLog(E).trim(),U=!0,N=!0;if(r.getProgramParameter(x,r.LINK_STATUS)===!1)if(U=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,x,R,E);else{let te=Wp(r,R,"vertex"),D=Wp(r,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,r.VALIDATE_STATUS)+`

Material Name: `+T.name+`
Material Type: `+T.type+`

Program Info Log: `+O+`
`+te+`
`+D)}else O!==""?console.warn("THREE.WebGLProgram: Program Info Log:",O):(F===""||H==="")&&(N=!1);N&&(T.diagnostics={runnable:U,programLog:O,vertexShader:{log:F,prefix:g},fragmentShader:{log:H,prefix:p}})}r.deleteShader(R),r.deleteShader(E),L=new mo(r,x),b=_M(r,x)}let L;this.getUniforms=function(){return L===void 0&&P(this),L};let b;this.getAttributes=function(){return b===void 0&&P(this),b};let S=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=r.getProgramParameter(x,fM)),S},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=dM++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=R,this.fragmentShader=E,this}var LM=0,Sf=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),o=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(o)===!1&&(a.add(o),o.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new bf(e),t.set(e,i)),i}},bf=class{constructor(e){this.id=LM++,this.code=e,this.usedTimes=0}};function DM(n,e,t,i,r,o,a){let s=new cl,l=new Sf,u=new Set,c=[],f=r.logarithmicDepthBuffer,d=r.vertexTextures,h=r.precision,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(b){return u.add(b),b===0?"uv":`uv${b}`}function g(b,S,T,O,F){let H=O.fog,U=F.geometry,N=b.isMeshStandardMaterial?O.environment:null,te=(b.isMeshStandardMaterial?t:e).get(b.envMap||N),D=te&&te.mapping===Ul?te.image.height:null,k=m[b.type];b.precision!==null&&(h=r.getMaxPrecision(b.precision),h!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",h,"instead."));let J=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,$=J!==void 0?J.length:0,re=0;U.morphAttributes.position!==void 0&&(re=1),U.morphAttributes.normal!==void 0&&(re=2),U.morphAttributes.color!==void 0&&(re=3);let le,q,W,j;if(k){let Xe=xi[k];le=Xe.vertexShader,q=Xe.fragmentShader}else le=b.vertexShader,q=b.fragmentShader,l.update(b),W=l.getVertexShaderID(b),j=l.getFragmentShaderID(b);let oe=n.getRenderTarget(),de=n.state.buffers.depth.getReversed(),me=F.isInstancedMesh===!0,ue=F.isBatchedMesh===!0,Ce=!!b.map,Te=!!b.matcap,Pe=!!te,B=!!b.aoMap,Oe=!!b.lightMap,De=!!b.bumpMap,_e=!!b.normalMap,pe=!!b.displacementMap,Ue=!!b.emissiveMap,xe=!!b.metalnessMap,C=!!b.roughnessMap,w=b.anisotropy>0,X=b.clearcoat>0,ne=b.dispersion>0,ae=b.iridescence>0,ie=b.sheen>0,be=b.transmission>0,he=w&&!!b.anisotropyMap,ge=X&&!!b.clearcoatMap,Ve=X&&!!b.clearcoatNormalMap,fe=X&&!!b.clearcoatRoughnessMap,we=ae&&!!b.iridescenceMap,M=ae&&!!b.iridescenceThicknessMap,Re=ie&&!!b.sheenColorMap,Me=ie&&!!b.sheenRoughnessMap,Ge=!!b.specularMap,ze=!!b.specularColorMap,qe=!!b.specularIntensityMap,I=be&&!!b.transmissionMap,ee=be&&!!b.thicknessMap,G=!!b.gradientMap,Z=!!b.alphaMap,ce=b.alphaTest>0,se=!!b.alphaHash,Se=!!b.extensions,Ke=ir;b.toneMapped&&(oe===null||oe.isXRRenderTarget===!0)&&(Ke=n.toneMapping);let Qe={shaderID:k,shaderType:b.type,shaderName:b.name,vertexShader:le,fragmentShader:q,defines:b.defines,customVertexShaderID:W,customFragmentShaderID:j,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:h,batching:ue,batchingColor:ue&&F._colorsTexture!==null,instancing:me,instancingColor:me&&F.instanceColor!==null,instancingMorph:me&&F.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:oe===null?n.outputColorSpace:oe.isXRRenderTarget===!0?oe.texture.colorSpace:wo,alphaToCoverage:!!b.alphaToCoverage,map:Ce,matcap:Te,envMap:Pe,envMapMode:Pe&&te.mapping,envMapCubeUVHeight:D,aoMap:B,lightMap:Oe,bumpMap:De,normalMap:_e,displacementMap:d&&pe,emissiveMap:Ue,normalMapObjectSpace:_e&&b.normalMapType===F0,normalMapTangentSpace:_e&&b.normalMapType===Em,metalnessMap:xe,roughnessMap:C,anisotropy:w,anisotropyMap:he,clearcoat:X,clearcoatMap:ge,clearcoatNormalMap:Ve,clearcoatRoughnessMap:fe,dispersion:ne,iridescence:ae,iridescenceMap:we,iridescenceThicknessMap:M,sheen:ie,sheenColorMap:Re,sheenRoughnessMap:Me,specularMap:Ge,specularColorMap:ze,specularIntensityMap:qe,transmission:be,transmissionMap:I,thicknessMap:ee,gradientMap:G,opaque:b.transparent===!1&&b.blending===fo&&b.alphaToCoverage===!1,alphaMap:Z,alphaTest:ce,alphaHash:se,combine:b.combine,mapUv:Ce&&x(b.map.channel),aoMapUv:B&&x(b.aoMap.channel),lightMapUv:Oe&&x(b.lightMap.channel),bumpMapUv:De&&x(b.bumpMap.channel),normalMapUv:_e&&x(b.normalMap.channel),displacementMapUv:pe&&x(b.displacementMap.channel),emissiveMapUv:Ue&&x(b.emissiveMap.channel),metalnessMapUv:xe&&x(b.metalnessMap.channel),roughnessMapUv:C&&x(b.roughnessMap.channel),anisotropyMapUv:he&&x(b.anisotropyMap.channel),clearcoatMapUv:ge&&x(b.clearcoatMap.channel),clearcoatNormalMapUv:Ve&&x(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:fe&&x(b.clearcoatRoughnessMap.channel),iridescenceMapUv:we&&x(b.iridescenceMap.channel),iridescenceThicknessMapUv:M&&x(b.iridescenceThicknessMap.channel),sheenColorMapUv:Re&&x(b.sheenColorMap.channel),sheenRoughnessMapUv:Me&&x(b.sheenRoughnessMap.channel),specularMapUv:Ge&&x(b.specularMap.channel),specularColorMapUv:ze&&x(b.specularColorMap.channel),specularIntensityMapUv:qe&&x(b.specularIntensityMap.channel),transmissionMapUv:I&&x(b.transmissionMap.channel),thicknessMapUv:ee&&x(b.thicknessMap.channel),alphaMapUv:Z&&x(b.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(_e||w),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!U.attributes.uv&&(Ce||Z),fog:!!H,useFog:b.fog===!0,fogExp2:!!H&&H.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:f,reverseDepthBuffer:de,skinning:F.isSkinnedMesh===!0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:$,morphTextureStride:re,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:b.dithering,shadowMapEnabled:n.shadowMap.enabled&&T.length>0,shadowMapType:n.shadowMap.type,toneMapping:Ke,decodeVideoTexture:Ce&&b.map.isVideoTexture===!0&&gt.getTransfer(b.map.colorSpace)===Et,decodeVideoTextureEmissive:Ue&&b.emissiveMap.isVideoTexture===!0&&gt.getTransfer(b.emissiveMap.colorSpace)===Et,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===ti,flipSided:b.side===Qt,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Se&&b.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Se&&b.extensions.multiDraw===!0||ue)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Qe.vertexUv1s=u.has(1),Qe.vertexUv2s=u.has(2),Qe.vertexUv3s=u.has(3),u.clear(),Qe}function p(b){let S=[];if(b.shaderID?S.push(b.shaderID):(S.push(b.customVertexShaderID),S.push(b.customFragmentShaderID)),b.defines!==void 0)for(let T in b.defines)S.push(T),S.push(b.defines[T]);return b.isRawShaderMaterial===!1&&(_(S,b),y(S,b),S.push(n.outputColorSpace)),S.push(b.customProgramCacheKey),S.join()}function _(b,S){b.push(S.precision),b.push(S.outputColorSpace),b.push(S.envMapMode),b.push(S.envMapCubeUVHeight),b.push(S.mapUv),b.push(S.alphaMapUv),b.push(S.lightMapUv),b.push(S.aoMapUv),b.push(S.bumpMapUv),b.push(S.normalMapUv),b.push(S.displacementMapUv),b.push(S.emissiveMapUv),b.push(S.metalnessMapUv),b.push(S.roughnessMapUv),b.push(S.anisotropyMapUv),b.push(S.clearcoatMapUv),b.push(S.clearcoatNormalMapUv),b.push(S.clearcoatRoughnessMapUv),b.push(S.iridescenceMapUv),b.push(S.iridescenceThicknessMapUv),b.push(S.sheenColorMapUv),b.push(S.sheenRoughnessMapUv),b.push(S.specularMapUv),b.push(S.specularColorMapUv),b.push(S.specularIntensityMapUv),b.push(S.transmissionMapUv),b.push(S.thicknessMapUv),b.push(S.combine),b.push(S.fogExp2),b.push(S.sizeAttenuation),b.push(S.morphTargetsCount),b.push(S.morphAttributeCount),b.push(S.numDirLights),b.push(S.numPointLights),b.push(S.numSpotLights),b.push(S.numSpotLightMaps),b.push(S.numHemiLights),b.push(S.numRectAreaLights),b.push(S.numDirLightShadows),b.push(S.numPointLightShadows),b.push(S.numSpotLightShadows),b.push(S.numSpotLightShadowsWithMaps),b.push(S.numLightProbes),b.push(S.shadowMapType),b.push(S.toneMapping),b.push(S.numClippingPlanes),b.push(S.numClipIntersection),b.push(S.depthPacking)}function y(b,S){s.disableAll(),S.supportsVertexTextures&&s.enable(0),S.instancing&&s.enable(1),S.instancingColor&&s.enable(2),S.instancingMorph&&s.enable(3),S.matcap&&s.enable(4),S.envMap&&s.enable(5),S.normalMapObjectSpace&&s.enable(6),S.normalMapTangentSpace&&s.enable(7),S.clearcoat&&s.enable(8),S.iridescence&&s.enable(9),S.alphaTest&&s.enable(10),S.vertexColors&&s.enable(11),S.vertexAlphas&&s.enable(12),S.vertexUv1s&&s.enable(13),S.vertexUv2s&&s.enable(14),S.vertexUv3s&&s.enable(15),S.vertexTangents&&s.enable(16),S.anisotropy&&s.enable(17),S.alphaHash&&s.enable(18),S.batching&&s.enable(19),S.dispersion&&s.enable(20),S.batchingColor&&s.enable(21),b.push(s.mask),s.disableAll(),S.fog&&s.enable(0),S.useFog&&s.enable(1),S.flatShading&&s.enable(2),S.logarithmicDepthBuffer&&s.enable(3),S.reverseDepthBuffer&&s.enable(4),S.skinning&&s.enable(5),S.morphTargets&&s.enable(6),S.morphNormals&&s.enable(7),S.morphColors&&s.enable(8),S.premultipliedAlpha&&s.enable(9),S.shadowMapEnabled&&s.enable(10),S.doubleSided&&s.enable(11),S.flipSided&&s.enable(12),S.useDepthPacking&&s.enable(13),S.dithering&&s.enable(14),S.transmission&&s.enable(15),S.sheen&&s.enable(16),S.opaque&&s.enable(17),S.pointsUvs&&s.enable(18),S.decodeVideoTexture&&s.enable(19),S.decodeVideoTextureEmissive&&s.enable(20),S.alphaToCoverage&&s.enable(21),b.push(s.mask)}function v(b){let S=m[b.type],T;if(S){let O=xi[S];T=bv.clone(O.uniforms)}else T=b.uniforms;return T}function R(b,S){let T;for(let O=0,F=c.length;O<F;O++){let H=c[O];if(H.cacheKey===S){T=H,++T.usedTimes;break}}return T===void 0&&(T=new IM(n,S,b,o),c.push(T)),T}function E(b){if(--b.usedTimes===0){let S=c.indexOf(b);c[S]=c[c.length-1],c.pop(),b.destroy()}}function P(b){l.remove(b)}function L(){l.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:v,acquireProgram:R,releaseProgram:E,releaseShaderCache:P,programs:c,dispose:L}}function UM(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let s=n.get(a);return s===void 0&&(s={},n.set(a,s)),s}function i(a){n.delete(a)}function r(a,s,l){n.get(a)[s]=l}function o(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:o}}function NM(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Kp(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function $p(){let n=[],e=0,t=[],i=[],r=[];function o(){e=0,t.length=0,i.length=0,r.length=0}function a(f,d,h,m,x,g){let p=n[e];return p===void 0?(p={id:f.id,object:f,geometry:d,material:h,groupOrder:m,renderOrder:f.renderOrder,z:x,group:g},n[e]=p):(p.id=f.id,p.object=f,p.geometry=d,p.material=h,p.groupOrder=m,p.renderOrder=f.renderOrder,p.z=x,p.group=g),e++,p}function s(f,d,h,m,x,g){let p=a(f,d,h,m,x,g);h.transmission>0?i.push(p):h.transparent===!0?r.push(p):t.push(p)}function l(f,d,h,m,x,g){let p=a(f,d,h,m,x,g);h.transmission>0?i.unshift(p):h.transparent===!0?r.unshift(p):t.unshift(p)}function u(f,d){t.length>1&&t.sort(f||NM),i.length>1&&i.sort(d||Kp),r.length>1&&r.sort(d||Kp)}function c(){for(let f=e,d=n.length;f<d;f++){let h=n[f];if(h.id===null)break;h.id=null,h.object=null,h.geometry=null,h.material=null,h.group=null}}return{opaque:t,transmissive:i,transparent:r,init:o,push:s,unshift:l,finish:c,sort:u}}function FM(){let n=new WeakMap;function e(i,r){let o=n.get(i),a;return o===void 0?(a=new $p,n.set(i,[a])):r>=o.length?(a=new $p,o.push(a)):a=o[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function OM(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new z,color:new $e};break;case"SpotLight":t={position:new z,direction:new z,color:new $e,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new z,color:new $e,distance:0,decay:0};break;case"HemisphereLight":t={direction:new z,skyColor:new $e,groundColor:new $e};break;case"RectAreaLight":t={color:new $e,position:new z,halfWidth:new z,halfHeight:new z};break}return n[e.id]=t,t}}}function BM(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Le};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Le};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Le,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var kM=0;function zM(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function HM(n){let e=new OM,t=BM(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)i.probe.push(new z);let r=new z,o=new wt,a=new wt;function s(u){let c=0,f=0,d=0;for(let b=0;b<9;b++)i.probe[b].set(0,0,0);let h=0,m=0,x=0,g=0,p=0,_=0,y=0,v=0,R=0,E=0,P=0;u.sort(zM);for(let b=0,S=u.length;b<S;b++){let T=u[b],O=T.color,F=T.intensity,H=T.distance,U=T.shadow&&T.shadow.map?T.shadow.map.texture:null;if(T.isAmbientLight)c+=O.r*F,f+=O.g*F,d+=O.b*F;else if(T.isLightProbe){for(let N=0;N<9;N++)i.probe[N].addScaledVector(T.sh.coefficients[N],F);P++}else if(T.isDirectionalLight){let N=e.get(T);if(N.color.copy(T.color).multiplyScalar(T.intensity),T.castShadow){let te=T.shadow,D=t.get(T);D.shadowIntensity=te.intensity,D.shadowBias=te.bias,D.shadowNormalBias=te.normalBias,D.shadowRadius=te.radius,D.shadowMapSize=te.mapSize,i.directionalShadow[h]=D,i.directionalShadowMap[h]=U,i.directionalShadowMatrix[h]=T.shadow.matrix,_++}i.directional[h]=N,h++}else if(T.isSpotLight){let N=e.get(T);N.position.setFromMatrixPosition(T.matrixWorld),N.color.copy(O).multiplyScalar(F),N.distance=H,N.coneCos=Math.cos(T.angle),N.penumbraCos=Math.cos(T.angle*(1-T.penumbra)),N.decay=T.decay,i.spot[x]=N;let te=T.shadow;if(T.map&&(i.spotLightMap[R]=T.map,R++,te.updateMatrices(T),T.castShadow&&E++),i.spotLightMatrix[x]=te.matrix,T.castShadow){let D=t.get(T);D.shadowIntensity=te.intensity,D.shadowBias=te.bias,D.shadowNormalBias=te.normalBias,D.shadowRadius=te.radius,D.shadowMapSize=te.mapSize,i.spotShadow[x]=D,i.spotShadowMap[x]=U,v++}x++}else if(T.isRectAreaLight){let N=e.get(T);N.color.copy(O).multiplyScalar(F),N.halfWidth.set(T.width*.5,0,0),N.halfHeight.set(0,T.height*.5,0),i.rectArea[g]=N,g++}else if(T.isPointLight){let N=e.get(T);if(N.color.copy(T.color).multiplyScalar(T.intensity),N.distance=T.distance,N.decay=T.decay,T.castShadow){let te=T.shadow,D=t.get(T);D.shadowIntensity=te.intensity,D.shadowBias=te.bias,D.shadowNormalBias=te.normalBias,D.shadowRadius=te.radius,D.shadowMapSize=te.mapSize,D.shadowCameraNear=te.camera.near,D.shadowCameraFar=te.camera.far,i.pointShadow[m]=D,i.pointShadowMap[m]=U,i.pointShadowMatrix[m]=T.shadow.matrix,y++}i.point[m]=N,m++}else if(T.isHemisphereLight){let N=e.get(T);N.skyColor.copy(T.color).multiplyScalar(F),N.groundColor.copy(T.groundColor).multiplyScalar(F),i.hemi[p]=N,p++}}g>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Ae.LTC_FLOAT_1,i.rectAreaLTC2=Ae.LTC_FLOAT_2):(i.rectAreaLTC1=Ae.LTC_HALF_1,i.rectAreaLTC2=Ae.LTC_HALF_2)),i.ambient[0]=c,i.ambient[1]=f,i.ambient[2]=d;let L=i.hash;(L.directionalLength!==h||L.pointLength!==m||L.spotLength!==x||L.rectAreaLength!==g||L.hemiLength!==p||L.numDirectionalShadows!==_||L.numPointShadows!==y||L.numSpotShadows!==v||L.numSpotMaps!==R||L.numLightProbes!==P)&&(i.directional.length=h,i.spot.length=x,i.rectArea.length=g,i.point.length=m,i.hemi.length=p,i.directionalShadow.length=_,i.directionalShadowMap.length=_,i.pointShadow.length=y,i.pointShadowMap.length=y,i.spotShadow.length=v,i.spotShadowMap.length=v,i.directionalShadowMatrix.length=_,i.pointShadowMatrix.length=y,i.spotLightMatrix.length=v+R-E,i.spotLightMap.length=R,i.numSpotLightShadowsWithMaps=E,i.numLightProbes=P,L.directionalLength=h,L.pointLength=m,L.spotLength=x,L.rectAreaLength=g,L.hemiLength=p,L.numDirectionalShadows=_,L.numPointShadows=y,L.numSpotShadows=v,L.numSpotMaps=R,L.numLightProbes=P,i.version=kM++)}function l(u,c){let f=0,d=0,h=0,m=0,x=0,g=c.matrixWorldInverse;for(let p=0,_=u.length;p<_;p++){let y=u[p];if(y.isDirectionalLight){let v=i.directional[f];v.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(g),f++}else if(y.isSpotLight){let v=i.spot[h];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(g),v.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(g),h++}else if(y.isRectAreaLight){let v=i.rectArea[m];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(g),a.identity(),o.copy(y.matrixWorld),o.premultiply(g),a.extractRotation(o),v.halfWidth.set(y.width*.5,0,0),v.halfHeight.set(0,y.height*.5,0),v.halfWidth.applyMatrix4(a),v.halfHeight.applyMatrix4(a),m++}else if(y.isPointLight){let v=i.point[d];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(g),d++}else if(y.isHemisphereLight){let v=i.hemi[x];v.direction.setFromMatrixPosition(y.matrixWorld),v.direction.transformDirection(g),x++}}}return{setup:s,setupView:l,state:i}}function Jp(n){let e=new HM(n),t=[],i=[];function r(c){u.camera=c,t.length=0,i.length=0}function o(c){t.push(c)}function a(c){i.push(c)}function s(){e.setup(t)}function l(c){e.setupView(t,c)}let u={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:u,setupLights:s,setupLightsView:l,pushLight:o,pushShadow:a}}function VM(n){let e=new WeakMap;function t(r,o=0){let a=e.get(r),s;return a===void 0?(s=new Jp(n),e.set(r,[s])):o>=a.length?(s=new Jp(n),a.push(s)):s=a[o],s}function i(){e=new WeakMap}return{get:t,dispose:i}}var wf=class extends Mi{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=U0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Af=class extends Mi{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},GM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,WM=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function qM(n,e,t){let i=new Dr,r=new Le,o=new Le,a=new Ht,s=new wf({depthPacking:N0}),l=new Af,u={},c=t.maxTextureSize,f={[rr]:Qt,[Qt]:rr,[ti]:ti},d=new Tn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Le},radius:{value:4}},vertexShader:GM,fragmentShader:WM}),h=d.clone();h.defines.HORIZONTAL_PASS=1;let m=new Vt;m.setAttribute("position",new Fn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new Ft(m,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=hm;let p=this.type;this.render=function(E,P,L){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||E.length===0)return;let b=n.getRenderTarget(),S=n.getActiveCubeFace(),T=n.getActiveMipmapLevel(),O=n.state;O.setBlending(nr),O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);let F=p!==Oi&&this.type===Oi,H=p===Oi&&this.type!==Oi;for(let U=0,N=E.length;U<N;U++){let te=E[U],D=te.shadow;if(D===void 0){console.warn("THREE.WebGLShadowMap:",te,"has no shadow.");continue}if(D.autoUpdate===!1&&D.needsUpdate===!1)continue;r.copy(D.mapSize);let k=D.getFrameExtents();if(r.multiply(k),o.copy(D.mapSize),(r.x>c||r.y>c)&&(r.x>c&&(o.x=Math.floor(c/k.x),r.x=o.x*k.x,D.mapSize.x=o.x),r.y>c&&(o.y=Math.floor(c/k.y),r.y=o.y*k.y,D.mapSize.y=o.y)),D.map===null||F===!0||H===!0){let $=this.type!==Oi?{minFilter:ri,magFilter:ri}:{};D.map!==null&&D.map.dispose(),D.map=new Gi(r.x,r.y,$),D.map.texture.name=te.name+".shadowMap",D.camera.updateProjectionMatrix()}n.setRenderTarget(D.map),n.clear();let J=D.getViewportCount();for(let $=0;$<J;$++){let re=D.getViewport($);a.set(o.x*re.x,o.y*re.y,o.x*re.z,o.y*re.w),O.viewport(a),D.updateMatrices(te,$),i=D.getFrustum(),v(P,L,D.camera,te,this.type)}D.isPointLightShadow!==!0&&this.type===Oi&&_(D,L),D.needsUpdate=!1}p=this.type,g.needsUpdate=!1,n.setRenderTarget(b,S,T)};function _(E,P){let L=e.update(x);d.defines.VSM_SAMPLES!==E.blurSamples&&(d.defines.VSM_SAMPLES=E.blurSamples,h.defines.VSM_SAMPLES=E.blurSamples,d.needsUpdate=!0,h.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new Gi(r.x,r.y)),d.uniforms.shadow_pass.value=E.map.texture,d.uniforms.resolution.value=E.mapSize,d.uniforms.radius.value=E.radius,n.setRenderTarget(E.mapPass),n.clear(),n.renderBufferDirect(P,null,L,d,x,null),h.uniforms.shadow_pass.value=E.mapPass.texture,h.uniforms.resolution.value=E.mapSize,h.uniforms.radius.value=E.radius,n.setRenderTarget(E.map),n.clear(),n.renderBufferDirect(P,null,L,h,x,null)}function y(E,P,L,b){let S=null,T=L.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(T!==void 0)S=T;else if(S=L.isPointLight===!0?l:s,n.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0){let O=S.uuid,F=P.uuid,H=u[O];H===void 0&&(H={},u[O]=H);let U=H[F];U===void 0&&(U=S.clone(),H[F]=U,P.addEventListener("dispose",R)),S=U}if(S.visible=P.visible,S.wireframe=P.wireframe,b===Oi?S.side=P.shadowSide!==null?P.shadowSide:P.side:S.side=P.shadowSide!==null?P.shadowSide:f[P.side],S.alphaMap=P.alphaMap,S.alphaTest=P.alphaTest,S.map=P.map,S.clipShadows=P.clipShadows,S.clippingPlanes=P.clippingPlanes,S.clipIntersection=P.clipIntersection,S.displacementMap=P.displacementMap,S.displacementScale=P.displacementScale,S.displacementBias=P.displacementBias,S.wireframeLinewidth=P.wireframeLinewidth,S.linewidth=P.linewidth,L.isPointLight===!0&&S.isMeshDistanceMaterial===!0){let O=n.properties.get(S);O.light=L}return S}function v(E,P,L,b,S){if(E.visible===!1)return;if(E.layers.test(P.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&S===Oi)&&(!E.frustumCulled||i.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,E.matrixWorld);let F=e.update(E),H=E.material;if(Array.isArray(H)){let U=F.groups;for(let N=0,te=U.length;N<te;N++){let D=U[N],k=H[D.materialIndex];if(k&&k.visible){let J=y(E,k,b,S);E.onBeforeShadow(n,E,P,L,F,J,D),n.renderBufferDirect(L,null,F,J,E,D),E.onAfterShadow(n,E,P,L,F,J,D)}}}else if(H.visible){let U=y(E,H,b,S);E.onBeforeShadow(n,E,P,L,F,U,null),n.renderBufferDirect(L,null,F,U,E,null),E.onAfterShadow(n,E,P,L,F,U,null)}}let O=E.children;for(let F=0,H=O.length;F<H;F++)v(O[F],P,L,b,S)}function R(E){E.target.removeEventListener("dispose",R);for(let L in u){let b=u[L],S=E.target.uuid;S in b&&(b[S].dispose(),delete b[S])}}}var XM={[Tu]:Cu,[Ru]:Lu,[Pu]:Du,[go]:Iu,[Cu]:Tu,[Lu]:Ru,[Du]:Pu,[Iu]:go};function YM(n,e){function t(){let I=!1,ee=new Ht,G=null,Z=new Ht(0,0,0,0);return{setMask:function(ce){G!==ce&&!I&&(n.colorMask(ce,ce,ce,ce),G=ce)},setLocked:function(ce){I=ce},setClear:function(ce,se,Se,Ke,Qe){Qe===!0&&(ce*=Ke,se*=Ke,Se*=Ke),ee.set(ce,se,Se,Ke),Z.equals(ee)===!1&&(n.clearColor(ce,se,Se,Ke),Z.copy(ee))},reset:function(){I=!1,G=null,Z.set(-1,0,0,0)}}}function i(){let I=!1,ee=!1,G=null,Z=null,ce=null;return{setReversed:function(se){if(ee!==se){let Se=e.get("EXT_clip_control");ee?Se.clipControlEXT(Se.LOWER_LEFT_EXT,Se.ZERO_TO_ONE_EXT):Se.clipControlEXT(Se.LOWER_LEFT_EXT,Se.NEGATIVE_ONE_TO_ONE_EXT);let Ke=ce;ce=null,this.setClear(Ke)}ee=se},getReversed:function(){return ee},setTest:function(se){se?oe(n.DEPTH_TEST):de(n.DEPTH_TEST)},setMask:function(se){G!==se&&!I&&(n.depthMask(se),G=se)},setFunc:function(se){if(ee&&(se=XM[se]),Z!==se){switch(se){case Tu:n.depthFunc(n.NEVER);break;case Cu:n.depthFunc(n.ALWAYS);break;case Ru:n.depthFunc(n.LESS);break;case go:n.depthFunc(n.LEQUAL);break;case Pu:n.depthFunc(n.EQUAL);break;case Iu:n.depthFunc(n.GEQUAL);break;case Lu:n.depthFunc(n.GREATER);break;case Du:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Z=se}},setLocked:function(se){I=se},setClear:function(se){ce!==se&&(ee&&(se=1-se),n.clearDepth(se),ce=se)},reset:function(){I=!1,G=null,Z=null,ce=null,ee=!1}}}function r(){let I=!1,ee=null,G=null,Z=null,ce=null,se=null,Se=null,Ke=null,Qe=null;return{setTest:function(Xe){I||(Xe?oe(n.STENCIL_TEST):de(n.STENCIL_TEST))},setMask:function(Xe){ee!==Xe&&!I&&(n.stencilMask(Xe),ee=Xe)},setFunc:function(Xe,At,yt){(G!==Xe||Z!==At||ce!==yt)&&(n.stencilFunc(Xe,At,yt),G=Xe,Z=At,ce=yt)},setOp:function(Xe,At,yt){(se!==Xe||Se!==At||Ke!==yt)&&(n.stencilOp(Xe,At,yt),se=Xe,Se=At,Ke=yt)},setLocked:function(Xe){I=Xe},setClear:function(Xe){Qe!==Xe&&(n.clearStencil(Xe),Qe=Xe)},reset:function(){I=!1,ee=null,G=null,Z=null,ce=null,se=null,Se=null,Ke=null,Qe=null}}}let o=new t,a=new i,s=new r,l=new WeakMap,u=new WeakMap,c={},f={},d=new WeakMap,h=[],m=null,x=!1,g=null,p=null,_=null,y=null,v=null,R=null,E=null,P=new $e(0,0,0),L=0,b=!1,S=null,T=null,O=null,F=null,H=null,U=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),N=!1,te=0,D=n.getParameter(n.VERSION);D.indexOf("WebGL")!==-1?(te=parseFloat(/^WebGL (\d)/.exec(D)[1]),N=te>=1):D.indexOf("OpenGL ES")!==-1&&(te=parseFloat(/^OpenGL ES (\d)/.exec(D)[1]),N=te>=2);let k=null,J={},$=n.getParameter(n.SCISSOR_BOX),re=n.getParameter(n.VIEWPORT),le=new Ht().fromArray($),q=new Ht().fromArray(re);function W(I,ee,G,Z){let ce=new Uint8Array(4),se=n.createTexture();n.bindTexture(I,se),n.texParameteri(I,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(I,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Se=0;Se<G;Se++)I===n.TEXTURE_3D||I===n.TEXTURE_2D_ARRAY?n.texImage3D(ee,0,n.RGBA,1,1,Z,0,n.RGBA,n.UNSIGNED_BYTE,ce):n.texImage2D(ee+Se,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ce);return se}let j={};j[n.TEXTURE_2D]=W(n.TEXTURE_2D,n.TEXTURE_2D,1),j[n.TEXTURE_CUBE_MAP]=W(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),j[n.TEXTURE_2D_ARRAY]=W(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),j[n.TEXTURE_3D]=W(n.TEXTURE_3D,n.TEXTURE_3D,1,1),o.setClear(0,0,0,1),a.setClear(1),s.setClear(0),oe(n.DEPTH_TEST),a.setFunc(go),De(!1),_e(ep),oe(n.CULL_FACE),B(nr);function oe(I){c[I]!==!0&&(n.enable(I),c[I]=!0)}function de(I){c[I]!==!1&&(n.disable(I),c[I]=!1)}function me(I,ee){return f[I]!==ee?(n.bindFramebuffer(I,ee),f[I]=ee,I===n.DRAW_FRAMEBUFFER&&(f[n.FRAMEBUFFER]=ee),I===n.FRAMEBUFFER&&(f[n.DRAW_FRAMEBUFFER]=ee),!0):!1}function ue(I,ee){let G=h,Z=!1;if(I){G=d.get(ee),G===void 0&&(G=[],d.set(ee,G));let ce=I.textures;if(G.length!==ce.length||G[0]!==n.COLOR_ATTACHMENT0){for(let se=0,Se=ce.length;se<Se;se++)G[se]=n.COLOR_ATTACHMENT0+se;G.length=ce.length,Z=!0}}else G[0]!==n.BACK&&(G[0]=n.BACK,Z=!0);Z&&n.drawBuffers(G)}function Ce(I){return m!==I?(n.useProgram(I),m=I,!0):!1}let Te={[Er]:n.FUNC_ADD,[l0]:n.FUNC_SUBTRACT,[c0]:n.FUNC_REVERSE_SUBTRACT};Te[u0]=n.MIN,Te[f0]=n.MAX;let Pe={[d0]:n.ZERO,[h0]:n.ONE,[p0]:n.SRC_COLOR,[Au]:n.SRC_ALPHA,[_0]:n.SRC_ALPHA_SATURATE,[v0]:n.DST_COLOR,[g0]:n.DST_ALPHA,[m0]:n.ONE_MINUS_SRC_COLOR,[Eu]:n.ONE_MINUS_SRC_ALPHA,[y0]:n.ONE_MINUS_DST_COLOR,[x0]:n.ONE_MINUS_DST_ALPHA,[M0]:n.CONSTANT_COLOR,[S0]:n.ONE_MINUS_CONSTANT_COLOR,[b0]:n.CONSTANT_ALPHA,[w0]:n.ONE_MINUS_CONSTANT_ALPHA};function B(I,ee,G,Z,ce,se,Se,Ke,Qe,Xe){if(I===nr){x===!0&&(de(n.BLEND),x=!1);return}if(x===!1&&(oe(n.BLEND),x=!0),I!==s0){if(I!==g||Xe!==b){if((p!==Er||v!==Er)&&(n.blendEquation(n.FUNC_ADD),p=Er,v=Er),Xe)switch(I){case fo:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case rl:n.blendFunc(n.ONE,n.ONE);break;case tp:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case np:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case fo:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case rl:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case tp:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case np:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}_=null,y=null,R=null,E=null,P.set(0,0,0),L=0,g=I,b=Xe}return}ce=ce||ee,se=se||G,Se=Se||Z,(ee!==p||ce!==v)&&(n.blendEquationSeparate(Te[ee],Te[ce]),p=ee,v=ce),(G!==_||Z!==y||se!==R||Se!==E)&&(n.blendFuncSeparate(Pe[G],Pe[Z],Pe[se],Pe[Se]),_=G,y=Z,R=se,E=Se),(Ke.equals(P)===!1||Qe!==L)&&(n.blendColor(Ke.r,Ke.g,Ke.b,Qe),P.copy(Ke),L=Qe),g=I,b=!1}function Oe(I,ee){I.side===ti?de(n.CULL_FACE):oe(n.CULL_FACE);let G=I.side===Qt;ee&&(G=!G),De(G),I.blending===fo&&I.transparent===!1?B(nr):B(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),a.setFunc(I.depthFunc),a.setTest(I.depthTest),a.setMask(I.depthWrite),o.setMask(I.colorWrite);let Z=I.stencilWrite;s.setTest(Z),Z&&(s.setMask(I.stencilWriteMask),s.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),s.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),Ue(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?oe(n.SAMPLE_ALPHA_TO_COVERAGE):de(n.SAMPLE_ALPHA_TO_COVERAGE)}function De(I){S!==I&&(I?n.frontFace(n.CW):n.frontFace(n.CCW),S=I)}function _e(I){I!==r0?(oe(n.CULL_FACE),I!==T&&(I===ep?n.cullFace(n.BACK):I===o0?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):de(n.CULL_FACE),T=I}function pe(I){I!==O&&(N&&n.lineWidth(I),O=I)}function Ue(I,ee,G){I?(oe(n.POLYGON_OFFSET_FILL),(F!==ee||H!==G)&&(n.polygonOffset(ee,G),F=ee,H=G)):de(n.POLYGON_OFFSET_FILL)}function xe(I){I?oe(n.SCISSOR_TEST):de(n.SCISSOR_TEST)}function C(I){I===void 0&&(I=n.TEXTURE0+U-1),k!==I&&(n.activeTexture(I),k=I)}function w(I,ee,G){G===void 0&&(k===null?G=n.TEXTURE0+U-1:G=k);let Z=J[G];Z===void 0&&(Z={type:void 0,texture:void 0},J[G]=Z),(Z.type!==I||Z.texture!==ee)&&(k!==G&&(n.activeTexture(G),k=G),n.bindTexture(I,ee||j[I]),Z.type=I,Z.texture=ee)}function X(){let I=J[k];I!==void 0&&I.type!==void 0&&(n.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function ne(){try{n.compressedTexImage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ae(){try{n.compressedTexImage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ie(){try{n.texSubImage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function be(){try{n.texSubImage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function he(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ge(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Ve(){try{n.texStorage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function fe(){try{n.texStorage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function we(){try{n.texImage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function M(){try{n.texImage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Re(I){le.equals(I)===!1&&(n.scissor(I.x,I.y,I.z,I.w),le.copy(I))}function Me(I){q.equals(I)===!1&&(n.viewport(I.x,I.y,I.z,I.w),q.copy(I))}function Ge(I,ee){let G=u.get(ee);G===void 0&&(G=new WeakMap,u.set(ee,G));let Z=G.get(I);Z===void 0&&(Z=n.getUniformBlockIndex(ee,I.name),G.set(I,Z))}function ze(I,ee){let Z=u.get(ee).get(I);l.get(ee)!==Z&&(n.uniformBlockBinding(ee,Z,I.__bindingPointIndex),l.set(ee,Z))}function qe(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),c={},k=null,J={},f={},d=new WeakMap,h=[],m=null,x=!1,g=null,p=null,_=null,y=null,v=null,R=null,E=null,P=new $e(0,0,0),L=0,b=!1,S=null,T=null,O=null,F=null,H=null,le.set(0,0,n.canvas.width,n.canvas.height),q.set(0,0,n.canvas.width,n.canvas.height),o.reset(),a.reset(),s.reset()}return{buffers:{color:o,depth:a,stencil:s},enable:oe,disable:de,bindFramebuffer:me,drawBuffers:ue,useProgram:Ce,setBlending:B,setMaterial:Oe,setFlipSided:De,setCullFace:_e,setLineWidth:pe,setPolygonOffset:Ue,setScissorTest:xe,activeTexture:C,bindTexture:w,unbindTexture:X,compressedTexImage2D:ne,compressedTexImage3D:ae,texImage2D:we,texImage3D:M,updateUBOMapping:Ge,uniformBlockBinding:ze,texStorage2D:Ve,texStorage3D:fe,texSubImage2D:ie,texSubImage3D:be,compressedTexSubImage2D:he,compressedTexSubImage3D:ge,scissor:Re,viewport:Me,reset:qe}}function jp(n,e,t,i){let r=ZM(i);switch(t){case ym:return n*e;case Mm:return n*e;case Sm:return n*e*2;case bm:return n*e/r.components*r.byteLength;case td:return n*e/r.components*r.byteLength;case wm:return n*e*2/r.components*r.byteLength;case nd:return n*e*2/r.components*r.byteLength;case _m:return n*e*3/r.components*r.byteLength;case ii:return n*e*4/r.components*r.byteLength;case id:return n*e*4/r.components*r.byteLength;case Qs:case el:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case tl:case nl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case ku:case Hu:return Math.max(n,16)*Math.max(e,8)/4;case Bu:case zu:return Math.max(n,8)*Math.max(e,8)/2;case Vu:case Gu:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Wu:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case qu:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Xu:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Yu:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Zu:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Ku:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case $u:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Ju:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case ju:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Qu:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case ef:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case tf:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case nf:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case rf:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case of:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case il:case af:case sf:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Am:case lf:return Math.ceil(n/4)*Math.ceil(e/4)*8;case cf:case uf:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function ZM(n){switch(n){case Vi:case gm:return{byteLength:1,components:1};case ma:case xm:case Ra:return{byteLength:2,components:1};case Qf:case ed:return{byteLength:2,components:4};case Pr:case jf:case ki:return{byteLength:4,components:1};case vm:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function KM(n,e,t,i,r,o,a){let s=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new Le,c=new WeakMap,f,d=new WeakMap,h=!1;try{h=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(C,w){return h?new OffscreenCanvas(C,w):xa("canvas")}function x(C,w,X){let ne=1,ae=xe(C);if((ae.width>X||ae.height>X)&&(ne=X/Math.max(ae.width,ae.height)),ne<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){let ie=Math.floor(ne*ae.width),be=Math.floor(ne*ae.height);f===void 0&&(f=m(ie,be));let he=w?m(ie,be):f;return he.width=ie,he.height=be,he.getContext("2d").drawImage(C,0,0,ie,be),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ae.width+"x"+ae.height+") to ("+ie+"x"+be+")."),he}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ae.width+"x"+ae.height+")."),C;return C}function g(C){return C.generateMipmaps}function p(C){n.generateMipmap(C)}function _(C){return C.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?n.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function y(C,w,X,ne,ae=!1){if(C!==null){if(n[C]!==void 0)return n[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let ie=w;if(w===n.RED&&(X===n.FLOAT&&(ie=n.R32F),X===n.HALF_FLOAT&&(ie=n.R16F),X===n.UNSIGNED_BYTE&&(ie=n.R8)),w===n.RED_INTEGER&&(X===n.UNSIGNED_BYTE&&(ie=n.R8UI),X===n.UNSIGNED_SHORT&&(ie=n.R16UI),X===n.UNSIGNED_INT&&(ie=n.R32UI),X===n.BYTE&&(ie=n.R8I),X===n.SHORT&&(ie=n.R16I),X===n.INT&&(ie=n.R32I)),w===n.RG&&(X===n.FLOAT&&(ie=n.RG32F),X===n.HALF_FLOAT&&(ie=n.RG16F),X===n.UNSIGNED_BYTE&&(ie=n.RG8)),w===n.RG_INTEGER&&(X===n.UNSIGNED_BYTE&&(ie=n.RG8UI),X===n.UNSIGNED_SHORT&&(ie=n.RG16UI),X===n.UNSIGNED_INT&&(ie=n.RG32UI),X===n.BYTE&&(ie=n.RG8I),X===n.SHORT&&(ie=n.RG16I),X===n.INT&&(ie=n.RG32I)),w===n.RGB_INTEGER&&(X===n.UNSIGNED_BYTE&&(ie=n.RGB8UI),X===n.UNSIGNED_SHORT&&(ie=n.RGB16UI),X===n.UNSIGNED_INT&&(ie=n.RGB32UI),X===n.BYTE&&(ie=n.RGB8I),X===n.SHORT&&(ie=n.RGB16I),X===n.INT&&(ie=n.RGB32I)),w===n.RGBA_INTEGER&&(X===n.UNSIGNED_BYTE&&(ie=n.RGBA8UI),X===n.UNSIGNED_SHORT&&(ie=n.RGBA16UI),X===n.UNSIGNED_INT&&(ie=n.RGBA32UI),X===n.BYTE&&(ie=n.RGBA8I),X===n.SHORT&&(ie=n.RGBA16I),X===n.INT&&(ie=n.RGBA32I)),w===n.RGB&&X===n.UNSIGNED_INT_5_9_9_9_REV&&(ie=n.RGB9_E5),w===n.RGBA){let be=ae?Nl:gt.getTransfer(ne);X===n.FLOAT&&(ie=n.RGBA32F),X===n.HALF_FLOAT&&(ie=n.RGBA16F),X===n.UNSIGNED_BYTE&&(ie=be===Et?n.SRGB8_ALPHA8:n.RGBA8),X===n.UNSIGNED_SHORT_4_4_4_4&&(ie=n.RGBA4),X===n.UNSIGNED_SHORT_5_5_5_1&&(ie=n.RGB5_A1)}return(ie===n.R16F||ie===n.R32F||ie===n.RG16F||ie===n.RG32F||ie===n.RGBA16F||ie===n.RGBA32F)&&e.get("EXT_color_buffer_float"),ie}function v(C,w){let X;return C?w===null||w===Pr||w===yo?X=n.DEPTH24_STENCIL8:w===ki?X=n.DEPTH32F_STENCIL8:w===ma&&(X=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===Pr||w===yo?X=n.DEPTH_COMPONENT24:w===ki?X=n.DEPTH_COMPONENT32F:w===ma&&(X=n.DEPTH_COMPONENT16),X}function R(C,w){return g(C)===!0||C.isFramebufferTexture&&C.minFilter!==ri&&C.minFilter!==vi?Math.log2(Math.max(w.width,w.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?w.mipmaps.length:1}function E(C){let w=C.target;w.removeEventListener("dispose",E),L(w),w.isVideoTexture&&c.delete(w)}function P(C){let w=C.target;w.removeEventListener("dispose",P),S(w)}function L(C){let w=i.get(C);if(w.__webglInit===void 0)return;let X=C.source,ne=d.get(X);if(ne){let ae=ne[w.__cacheKey];ae.usedTimes--,ae.usedTimes===0&&b(C),Object.keys(ne).length===0&&d.delete(X)}i.remove(C)}function b(C){let w=i.get(C);n.deleteTexture(w.__webglTexture);let X=C.source,ne=d.get(X);delete ne[w.__cacheKey],a.memory.textures--}function S(C){let w=i.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),i.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let ne=0;ne<6;ne++){if(Array.isArray(w.__webglFramebuffer[ne]))for(let ae=0;ae<w.__webglFramebuffer[ne].length;ae++)n.deleteFramebuffer(w.__webglFramebuffer[ne][ae]);else n.deleteFramebuffer(w.__webglFramebuffer[ne]);w.__webglDepthbuffer&&n.deleteRenderbuffer(w.__webglDepthbuffer[ne])}else{if(Array.isArray(w.__webglFramebuffer))for(let ne=0;ne<w.__webglFramebuffer.length;ne++)n.deleteFramebuffer(w.__webglFramebuffer[ne]);else n.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&n.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&n.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let ne=0;ne<w.__webglColorRenderbuffer.length;ne++)w.__webglColorRenderbuffer[ne]&&n.deleteRenderbuffer(w.__webglColorRenderbuffer[ne]);w.__webglDepthRenderbuffer&&n.deleteRenderbuffer(w.__webglDepthRenderbuffer)}let X=C.textures;for(let ne=0,ae=X.length;ne<ae;ne++){let ie=i.get(X[ne]);ie.__webglTexture&&(n.deleteTexture(ie.__webglTexture),a.memory.textures--),i.remove(X[ne])}i.remove(C)}let T=0;function O(){T=0}function F(){let C=T;return C>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+r.maxTextures),T+=1,C}function H(C){let w=[];return w.push(C.wrapS),w.push(C.wrapT),w.push(C.wrapR||0),w.push(C.magFilter),w.push(C.minFilter),w.push(C.anisotropy),w.push(C.internalFormat),w.push(C.format),w.push(C.type),w.push(C.generateMipmaps),w.push(C.premultiplyAlpha),w.push(C.flipY),w.push(C.unpackAlignment),w.push(C.colorSpace),w.join()}function U(C,w){let X=i.get(C);if(C.isVideoTexture&&pe(C),C.isRenderTargetTexture===!1&&C.version>0&&X.__version!==C.version){let ne=C.image;if(ne===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ne.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{q(X,C,w);return}}t.bindTexture(n.TEXTURE_2D,X.__webglTexture,n.TEXTURE0+w)}function N(C,w){let X=i.get(C);if(C.version>0&&X.__version!==C.version){q(X,C,w);return}t.bindTexture(n.TEXTURE_2D_ARRAY,X.__webglTexture,n.TEXTURE0+w)}function te(C,w){let X=i.get(C);if(C.version>0&&X.__version!==C.version){q(X,C,w);return}t.bindTexture(n.TEXTURE_3D,X.__webglTexture,n.TEXTURE0+w)}function D(C,w){let X=i.get(C);if(C.version>0&&X.__version!==C.version){W(X,C,w);return}t.bindTexture(n.TEXTURE_CUBE_MAP,X.__webglTexture,n.TEXTURE0+w)}let k={[Fu]:n.REPEAT,[Cr]:n.CLAMP_TO_EDGE,[Ou]:n.MIRRORED_REPEAT},J={[ri]:n.NEAREST,[D0]:n.NEAREST_MIPMAP_NEAREST,[Ms]:n.NEAREST_MIPMAP_LINEAR,[vi]:n.LINEAR,[qc]:n.LINEAR_MIPMAP_NEAREST,[Rr]:n.LINEAR_MIPMAP_LINEAR},$={[O0]:n.NEVER,[G0]:n.ALWAYS,[B0]:n.LESS,[Tm]:n.LEQUAL,[k0]:n.EQUAL,[V0]:n.GEQUAL,[z0]:n.GREATER,[H0]:n.NOTEQUAL};function re(C,w){if(w.type===ki&&e.has("OES_texture_float_linear")===!1&&(w.magFilter===vi||w.magFilter===qc||w.magFilter===Ms||w.magFilter===Rr||w.minFilter===vi||w.minFilter===qc||w.minFilter===Ms||w.minFilter===Rr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(C,n.TEXTURE_WRAP_S,k[w.wrapS]),n.texParameteri(C,n.TEXTURE_WRAP_T,k[w.wrapT]),(C===n.TEXTURE_3D||C===n.TEXTURE_2D_ARRAY)&&n.texParameteri(C,n.TEXTURE_WRAP_R,k[w.wrapR]),n.texParameteri(C,n.TEXTURE_MAG_FILTER,J[w.magFilter]),n.texParameteri(C,n.TEXTURE_MIN_FILTER,J[w.minFilter]),w.compareFunction&&(n.texParameteri(C,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(C,n.TEXTURE_COMPARE_FUNC,$[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===ri||w.minFilter!==Ms&&w.minFilter!==Rr||w.type===ki&&e.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||i.get(w).__currentAnisotropy){let X=e.get("EXT_texture_filter_anisotropic");n.texParameterf(C,X.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,r.getMaxAnisotropy())),i.get(w).__currentAnisotropy=w.anisotropy}}}function le(C,w){let X=!1;C.__webglInit===void 0&&(C.__webglInit=!0,w.addEventListener("dispose",E));let ne=w.source,ae=d.get(ne);ae===void 0&&(ae={},d.set(ne,ae));let ie=H(w);if(ie!==C.__cacheKey){ae[ie]===void 0&&(ae[ie]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,X=!0),ae[ie].usedTimes++;let be=ae[C.__cacheKey];be!==void 0&&(ae[C.__cacheKey].usedTimes--,be.usedTimes===0&&b(w)),C.__cacheKey=ie,C.__webglTexture=ae[ie].texture}return X}function q(C,w,X){let ne=n.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(ne=n.TEXTURE_2D_ARRAY),w.isData3DTexture&&(ne=n.TEXTURE_3D);let ae=le(C,w),ie=w.source;t.bindTexture(ne,C.__webglTexture,n.TEXTURE0+X);let be=i.get(ie);if(ie.version!==be.__version||ae===!0){t.activeTexture(n.TEXTURE0+X);let he=gt.getPrimaries(gt.workingColorSpace),ge=w.colorSpace===er?null:gt.getPrimaries(w.colorSpace),Ve=w.colorSpace===er||he===ge?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,w.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,w.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ve);let fe=x(w.image,!1,r.maxTextureSize);fe=Ue(w,fe);let we=o.convert(w.format,w.colorSpace),M=o.convert(w.type),Re=y(w.internalFormat,we,M,w.colorSpace,w.isVideoTexture);re(ne,w);let Me,Ge=w.mipmaps,ze=w.isVideoTexture!==!0,qe=be.__version===void 0||ae===!0,I=ie.dataReady,ee=R(w,fe);if(w.isDepthTexture)Re=v(w.format===_o,w.type),qe&&(ze?t.texStorage2D(n.TEXTURE_2D,1,Re,fe.width,fe.height):t.texImage2D(n.TEXTURE_2D,0,Re,fe.width,fe.height,0,we,M,null));else if(w.isDataTexture)if(Ge.length>0){ze&&qe&&t.texStorage2D(n.TEXTURE_2D,ee,Re,Ge[0].width,Ge[0].height);for(let G=0,Z=Ge.length;G<Z;G++)Me=Ge[G],ze?I&&t.texSubImage2D(n.TEXTURE_2D,G,0,0,Me.width,Me.height,we,M,Me.data):t.texImage2D(n.TEXTURE_2D,G,Re,Me.width,Me.height,0,we,M,Me.data);w.generateMipmaps=!1}else ze?(qe&&t.texStorage2D(n.TEXTURE_2D,ee,Re,fe.width,fe.height),I&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,fe.width,fe.height,we,M,fe.data)):t.texImage2D(n.TEXTURE_2D,0,Re,fe.width,fe.height,0,we,M,fe.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){ze&&qe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ee,Re,Ge[0].width,Ge[0].height,fe.depth);for(let G=0,Z=Ge.length;G<Z;G++)if(Me=Ge[G],w.format!==ii)if(we!==null)if(ze){if(I)if(w.layerUpdates.size>0){let ce=jp(Me.width,Me.height,w.format,w.type);for(let se of w.layerUpdates){let Se=Me.data.subarray(se*ce/Me.data.BYTES_PER_ELEMENT,(se+1)*ce/Me.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,G,0,0,se,Me.width,Me.height,1,we,Se)}w.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,G,0,0,0,Me.width,Me.height,fe.depth,we,Me.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,G,Re,Me.width,Me.height,fe.depth,0,Me.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ze?I&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,G,0,0,0,Me.width,Me.height,fe.depth,we,M,Me.data):t.texImage3D(n.TEXTURE_2D_ARRAY,G,Re,Me.width,Me.height,fe.depth,0,we,M,Me.data)}else{ze&&qe&&t.texStorage2D(n.TEXTURE_2D,ee,Re,Ge[0].width,Ge[0].height);for(let G=0,Z=Ge.length;G<Z;G++)Me=Ge[G],w.format!==ii?we!==null?ze?I&&t.compressedTexSubImage2D(n.TEXTURE_2D,G,0,0,Me.width,Me.height,we,Me.data):t.compressedTexImage2D(n.TEXTURE_2D,G,Re,Me.width,Me.height,0,Me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ze?I&&t.texSubImage2D(n.TEXTURE_2D,G,0,0,Me.width,Me.height,we,M,Me.data):t.texImage2D(n.TEXTURE_2D,G,Re,Me.width,Me.height,0,we,M,Me.data)}else if(w.isDataArrayTexture)if(ze){if(qe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ee,Re,fe.width,fe.height,fe.depth),I)if(w.layerUpdates.size>0){let G=jp(fe.width,fe.height,w.format,w.type);for(let Z of w.layerUpdates){let ce=fe.data.subarray(Z*G/fe.data.BYTES_PER_ELEMENT,(Z+1)*G/fe.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Z,fe.width,fe.height,1,we,M,ce)}w.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,fe.width,fe.height,fe.depth,we,M,fe.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Re,fe.width,fe.height,fe.depth,0,we,M,fe.data);else if(w.isData3DTexture)ze?(qe&&t.texStorage3D(n.TEXTURE_3D,ee,Re,fe.width,fe.height,fe.depth),I&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,fe.width,fe.height,fe.depth,we,M,fe.data)):t.texImage3D(n.TEXTURE_3D,0,Re,fe.width,fe.height,fe.depth,0,we,M,fe.data);else if(w.isFramebufferTexture){if(qe)if(ze)t.texStorage2D(n.TEXTURE_2D,ee,Re,fe.width,fe.height);else{let G=fe.width,Z=fe.height;for(let ce=0;ce<ee;ce++)t.texImage2D(n.TEXTURE_2D,ce,Re,G,Z,0,we,M,null),G>>=1,Z>>=1}}else if(Ge.length>0){if(ze&&qe){let G=xe(Ge[0]);t.texStorage2D(n.TEXTURE_2D,ee,Re,G.width,G.height)}for(let G=0,Z=Ge.length;G<Z;G++)Me=Ge[G],ze?I&&t.texSubImage2D(n.TEXTURE_2D,G,0,0,we,M,Me):t.texImage2D(n.TEXTURE_2D,G,Re,we,M,Me);w.generateMipmaps=!1}else if(ze){if(qe){let G=xe(fe);t.texStorage2D(n.TEXTURE_2D,ee,Re,G.width,G.height)}I&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,we,M,fe)}else t.texImage2D(n.TEXTURE_2D,0,Re,we,M,fe);g(w)&&p(ne),be.__version=ie.version,w.onUpdate&&w.onUpdate(w)}C.__version=w.version}function W(C,w,X){if(w.image.length!==6)return;let ne=le(C,w),ae=w.source;t.bindTexture(n.TEXTURE_CUBE_MAP,C.__webglTexture,n.TEXTURE0+X);let ie=i.get(ae);if(ae.version!==ie.__version||ne===!0){t.activeTexture(n.TEXTURE0+X);let be=gt.getPrimaries(gt.workingColorSpace),he=w.colorSpace===er?null:gt.getPrimaries(w.colorSpace),ge=w.colorSpace===er||be===he?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,w.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,w.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ge);let Ve=w.isCompressedTexture||w.image[0].isCompressedTexture,fe=w.image[0]&&w.image[0].isDataTexture,we=[];for(let Z=0;Z<6;Z++)!Ve&&!fe?we[Z]=x(w.image[Z],!0,r.maxCubemapSize):we[Z]=fe?w.image[Z].image:w.image[Z],we[Z]=Ue(w,we[Z]);let M=we[0],Re=o.convert(w.format,w.colorSpace),Me=o.convert(w.type),Ge=y(w.internalFormat,Re,Me,w.colorSpace),ze=w.isVideoTexture!==!0,qe=ie.__version===void 0||ne===!0,I=ae.dataReady,ee=R(w,M);re(n.TEXTURE_CUBE_MAP,w);let G;if(Ve){ze&&qe&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ee,Ge,M.width,M.height);for(let Z=0;Z<6;Z++){G=we[Z].mipmaps;for(let ce=0;ce<G.length;ce++){let se=G[ce];w.format!==ii?Re!==null?ze?I&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ce,0,0,se.width,se.height,Re,se.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ce,Ge,se.width,se.height,0,se.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ze?I&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ce,0,0,se.width,se.height,Re,Me,se.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ce,Ge,se.width,se.height,0,Re,Me,se.data)}}}else{if(G=w.mipmaps,ze&&qe){G.length>0&&ee++;let Z=xe(we[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,ee,Ge,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(fe){ze?I&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,we[Z].width,we[Z].height,Re,Me,we[Z].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Ge,we[Z].width,we[Z].height,0,Re,Me,we[Z].data);for(let ce=0;ce<G.length;ce++){let Se=G[ce].image[Z].image;ze?I&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ce+1,0,0,Se.width,Se.height,Re,Me,Se.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ce+1,Ge,Se.width,Se.height,0,Re,Me,Se.data)}}else{ze?I&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,Re,Me,we[Z]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Ge,Re,Me,we[Z]);for(let ce=0;ce<G.length;ce++){let se=G[ce];ze?I&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ce+1,0,0,Re,Me,se.image[Z]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ce+1,Ge,Re,Me,se.image[Z])}}}g(w)&&p(n.TEXTURE_CUBE_MAP),ie.__version=ae.version,w.onUpdate&&w.onUpdate(w)}C.__version=w.version}function j(C,w,X,ne,ae,ie){let be=o.convert(X.format,X.colorSpace),he=o.convert(X.type),ge=y(X.internalFormat,be,he,X.colorSpace),Ve=i.get(w),fe=i.get(X);if(fe.__renderTarget=w,!Ve.__hasExternalTextures){let we=Math.max(1,w.width>>ie),M=Math.max(1,w.height>>ie);ae===n.TEXTURE_3D||ae===n.TEXTURE_2D_ARRAY?t.texImage3D(ae,ie,ge,we,M,w.depth,0,be,he,null):t.texImage2D(ae,ie,ge,we,M,0,be,he,null)}t.bindFramebuffer(n.FRAMEBUFFER,C),_e(w)?s.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ne,ae,fe.__webglTexture,0,De(w)):(ae===n.TEXTURE_2D||ae>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ae<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,ne,ae,fe.__webglTexture,ie),t.bindFramebuffer(n.FRAMEBUFFER,null)}function oe(C,w,X){if(n.bindRenderbuffer(n.RENDERBUFFER,C),w.depthBuffer){let ne=w.depthTexture,ae=ne&&ne.isDepthTexture?ne.type:null,ie=v(w.stencilBuffer,ae),be=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,he=De(w);_e(w)?s.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,he,ie,w.width,w.height):X?n.renderbufferStorageMultisample(n.RENDERBUFFER,he,ie,w.width,w.height):n.renderbufferStorage(n.RENDERBUFFER,ie,w.width,w.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,be,n.RENDERBUFFER,C)}else{let ne=w.textures;for(let ae=0;ae<ne.length;ae++){let ie=ne[ae],be=o.convert(ie.format,ie.colorSpace),he=o.convert(ie.type),ge=y(ie.internalFormat,be,he,ie.colorSpace),Ve=De(w);X&&_e(w)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ve,ge,w.width,w.height):_e(w)?s.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ve,ge,w.width,w.height):n.renderbufferStorage(n.RENDERBUFFER,ge,w.width,w.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function de(C,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,C),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let ne=i.get(w.depthTexture);ne.__renderTarget=w,(!ne.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),U(w.depthTexture,0);let ae=ne.__webglTexture,ie=De(w);if(w.depthTexture.format===ho)_e(w)?s.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ae,0,ie):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ae,0);else if(w.depthTexture.format===_o)_e(w)?s.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ae,0,ie):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ae,0);else throw new Error("Unknown depthTexture format")}function me(C){let w=i.get(C),X=C.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==C.depthTexture){let ne=C.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),ne){let ae=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,ne.removeEventListener("dispose",ae)};ne.addEventListener("dispose",ae),w.__depthDisposeCallback=ae}w.__boundDepthTexture=ne}if(C.depthTexture&&!w.__autoAllocateDepthBuffer){if(X)throw new Error("target.depthTexture not supported in Cube render targets");de(w.__webglFramebuffer,C)}else if(X){w.__webglDepthbuffer=[];for(let ne=0;ne<6;ne++)if(t.bindFramebuffer(n.FRAMEBUFFER,w.__webglFramebuffer[ne]),w.__webglDepthbuffer[ne]===void 0)w.__webglDepthbuffer[ne]=n.createRenderbuffer(),oe(w.__webglDepthbuffer[ne],C,!1);else{let ae=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ie=w.__webglDepthbuffer[ne];n.bindRenderbuffer(n.RENDERBUFFER,ie),n.framebufferRenderbuffer(n.FRAMEBUFFER,ae,n.RENDERBUFFER,ie)}}else if(t.bindFramebuffer(n.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=n.createRenderbuffer(),oe(w.__webglDepthbuffer,C,!1);else{let ne=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ae=w.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ae),n.framebufferRenderbuffer(n.FRAMEBUFFER,ne,n.RENDERBUFFER,ae)}t.bindFramebuffer(n.FRAMEBUFFER,null)}function ue(C,w,X){let ne=i.get(C);w!==void 0&&j(ne.__webglFramebuffer,C,C.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),X!==void 0&&me(C)}function Ce(C){let w=C.texture,X=i.get(C),ne=i.get(w);C.addEventListener("dispose",P);let ae=C.textures,ie=C.isWebGLCubeRenderTarget===!0,be=ae.length>1;if(be||(ne.__webglTexture===void 0&&(ne.__webglTexture=n.createTexture()),ne.__version=w.version,a.memory.textures++),ie){X.__webglFramebuffer=[];for(let he=0;he<6;he++)if(w.mipmaps&&w.mipmaps.length>0){X.__webglFramebuffer[he]=[];for(let ge=0;ge<w.mipmaps.length;ge++)X.__webglFramebuffer[he][ge]=n.createFramebuffer()}else X.__webglFramebuffer[he]=n.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){X.__webglFramebuffer=[];for(let he=0;he<w.mipmaps.length;he++)X.__webglFramebuffer[he]=n.createFramebuffer()}else X.__webglFramebuffer=n.createFramebuffer();if(be)for(let he=0,ge=ae.length;he<ge;he++){let Ve=i.get(ae[he]);Ve.__webglTexture===void 0&&(Ve.__webglTexture=n.createTexture(),a.memory.textures++)}if(C.samples>0&&_e(C)===!1){X.__webglMultisampledFramebuffer=n.createFramebuffer(),X.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,X.__webglMultisampledFramebuffer);for(let he=0;he<ae.length;he++){let ge=ae[he];X.__webglColorRenderbuffer[he]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,X.__webglColorRenderbuffer[he]);let Ve=o.convert(ge.format,ge.colorSpace),fe=o.convert(ge.type),we=y(ge.internalFormat,Ve,fe,ge.colorSpace,C.isXRRenderTarget===!0),M=De(C);n.renderbufferStorageMultisample(n.RENDERBUFFER,M,we,C.width,C.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+he,n.RENDERBUFFER,X.__webglColorRenderbuffer[he])}n.bindRenderbuffer(n.RENDERBUFFER,null),C.depthBuffer&&(X.__webglDepthRenderbuffer=n.createRenderbuffer(),oe(X.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ie){t.bindTexture(n.TEXTURE_CUBE_MAP,ne.__webglTexture),re(n.TEXTURE_CUBE_MAP,w);for(let he=0;he<6;he++)if(w.mipmaps&&w.mipmaps.length>0)for(let ge=0;ge<w.mipmaps.length;ge++)j(X.__webglFramebuffer[he][ge],C,w,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+he,ge);else j(X.__webglFramebuffer[he],C,w,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+he,0);g(w)&&p(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(be){for(let he=0,ge=ae.length;he<ge;he++){let Ve=ae[he],fe=i.get(Ve);t.bindTexture(n.TEXTURE_2D,fe.__webglTexture),re(n.TEXTURE_2D,Ve),j(X.__webglFramebuffer,C,Ve,n.COLOR_ATTACHMENT0+he,n.TEXTURE_2D,0),g(Ve)&&p(n.TEXTURE_2D)}t.unbindTexture()}else{let he=n.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(he=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(he,ne.__webglTexture),re(he,w),w.mipmaps&&w.mipmaps.length>0)for(let ge=0;ge<w.mipmaps.length;ge++)j(X.__webglFramebuffer[ge],C,w,n.COLOR_ATTACHMENT0,he,ge);else j(X.__webglFramebuffer,C,w,n.COLOR_ATTACHMENT0,he,0);g(w)&&p(he),t.unbindTexture()}C.depthBuffer&&me(C)}function Te(C){let w=C.textures;for(let X=0,ne=w.length;X<ne;X++){let ae=w[X];if(g(ae)){let ie=_(C),be=i.get(ae).__webglTexture;t.bindTexture(ie,be),p(ie),t.unbindTexture()}}}let Pe=[],B=[];function Oe(C){if(C.samples>0){if(_e(C)===!1){let w=C.textures,X=C.width,ne=C.height,ae=n.COLOR_BUFFER_BIT,ie=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,be=i.get(C),he=w.length>1;if(he)for(let ge=0;ge<w.length;ge++)t.bindFramebuffer(n.FRAMEBUFFER,be.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ge,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,be.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ge,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,be.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,be.__webglFramebuffer);for(let ge=0;ge<w.length;ge++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(ae|=n.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(ae|=n.STENCIL_BUFFER_BIT)),he){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,be.__webglColorRenderbuffer[ge]);let Ve=i.get(w[ge]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Ve,0)}n.blitFramebuffer(0,0,X,ne,0,0,X,ne,ae,n.NEAREST),l===!0&&(Pe.length=0,B.length=0,Pe.push(n.COLOR_ATTACHMENT0+ge),C.depthBuffer&&C.resolveDepthBuffer===!1&&(Pe.push(ie),B.push(ie),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,B)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Pe))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),he)for(let ge=0;ge<w.length;ge++){t.bindFramebuffer(n.FRAMEBUFFER,be.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ge,n.RENDERBUFFER,be.__webglColorRenderbuffer[ge]);let Ve=i.get(w[ge]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,be.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ge,n.TEXTURE_2D,Ve,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,be.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&l){let w=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[w])}}}function De(C){return Math.min(r.maxSamples,C.samples)}function _e(C){let w=i.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function pe(C){let w=a.render.frame;c.get(C)!==w&&(c.set(C,w),C.update())}function Ue(C,w){let X=C.colorSpace,ne=C.format,ae=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||X!==wo&&X!==er&&(gt.getTransfer(X)===Et?(ne!==ii||ae!==Vi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",X)),w}function xe(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(u.width=C.naturalWidth||C.width,u.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(u.width=C.displayWidth,u.height=C.displayHeight):(u.width=C.width,u.height=C.height),u}this.allocateTextureUnit=F,this.resetTextureUnits=O,this.setTexture2D=U,this.setTexture2DArray=N,this.setTexture3D=te,this.setTextureCube=D,this.rebindTextures=ue,this.setupRenderTarget=Ce,this.updateRenderTargetMipmap=Te,this.updateMultisampleRenderTarget=Oe,this.setupDepthRenderbuffer=me,this.setupFrameBufferTexture=j,this.useMultisampledRTT=_e}function $M(n,e){function t(i,r=er){let o,a=gt.getTransfer(r);if(i===Vi)return n.UNSIGNED_BYTE;if(i===Qf)return n.UNSIGNED_SHORT_4_4_4_4;if(i===ed)return n.UNSIGNED_SHORT_5_5_5_1;if(i===vm)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===gm)return n.BYTE;if(i===xm)return n.SHORT;if(i===ma)return n.UNSIGNED_SHORT;if(i===jf)return n.INT;if(i===Pr)return n.UNSIGNED_INT;if(i===ki)return n.FLOAT;if(i===Ra)return n.HALF_FLOAT;if(i===ym)return n.ALPHA;if(i===_m)return n.RGB;if(i===ii)return n.RGBA;if(i===Mm)return n.LUMINANCE;if(i===Sm)return n.LUMINANCE_ALPHA;if(i===ho)return n.DEPTH_COMPONENT;if(i===_o)return n.DEPTH_STENCIL;if(i===bm)return n.RED;if(i===td)return n.RED_INTEGER;if(i===wm)return n.RG;if(i===nd)return n.RG_INTEGER;if(i===id)return n.RGBA_INTEGER;if(i===Qs||i===el||i===tl||i===nl)if(a===Et)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(i===Qs)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===el)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===tl)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===nl)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(i===Qs)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===el)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===tl)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===nl)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Bu||i===ku||i===zu||i===Hu)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(i===Bu)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===ku)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===zu)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Hu)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Vu||i===Gu||i===Wu)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(i===Vu||i===Gu)return a===Et?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(i===Wu)return a===Et?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===qu||i===Xu||i===Yu||i===Zu||i===Ku||i===$u||i===Ju||i===ju||i===Qu||i===ef||i===tf||i===nf||i===rf||i===of)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(i===qu)return a===Et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Xu)return a===Et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Yu)return a===Et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Zu)return a===Et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Ku)return a===Et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===$u)return a===Et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Ju)return a===Et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===ju)return a===Et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Qu)return a===Et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===ef)return a===Et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===tf)return a===Et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===nf)return a===Et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===rf)return a===Et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===of)return a===Et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===il||i===af||i===sf)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(i===il)return a===Et?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===af)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===sf)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Am||i===lf||i===cf||i===uf)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(i===il)return o.COMPRESSED_RED_RGTC1_EXT;if(i===lf)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===cf)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===uf)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===yo?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}var Ef=class extends yn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},_n=class extends en{constructor(){super(),this.isGroup=!0,this.type="Group"}},JM={type:"move"},fa=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new _n,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new _n,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new _n,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new z),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,o=null,a=null,s=this._targetRay,l=this._grip,u=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(u&&e.hand){a=!0;for(let x of e.hand.values()){let g=t.getJointPose(x,i),p=this._getHandJoint(u,x);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}let c=u.joints["index-finger-tip"],f=u.joints["thumb-tip"],d=c.position.distanceTo(f.position),h=.02,m=.005;u.inputState.pinching&&d>h+m?(u.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!u.inputState.pinching&&d<=h-m&&(u.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(o=t.getPose(e.gripSpace,i),o!==null&&(l.matrix.fromArray(o.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,o.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(o.linearVelocity)):l.hasLinearVelocity=!1,o.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(o.angularVelocity)):l.hasAngularVelocity=!1));s!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&o!==null&&(r=o),r!==null&&(s.matrix.fromArray(r.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,r.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(r.linearVelocity)):s.hasLinearVelocity=!1,r.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(r.angularVelocity)):s.hasAngularVelocity=!1,this.dispatchEvent(JM)))}return s!==null&&(s.visible=r!==null),l!==null&&(l.visible=o!==null),u!==null&&(u.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new _n;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}},jM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,QM=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Tf=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,i){if(this.texture===null){let r=new En,o=e.properties.get(r);o.__webglTexture=t.texture,(t.depthNear!=i.depthNear||t.depthFar!=i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new Tn({vertexShader:jM,fragmentShader:QM,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ft(new pl(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Cf=class extends or{constructor(e,t){super();let i=this,r=null,o=1,a=null,s="local-floor",l=1,u=null,c=null,f=null,d=null,h=null,m=null,x=new Tf,g=t.getContextAttributes(),p=null,_=null,y=[],v=[],R=new Le,E=null,P=new yn;P.viewport=new Ht;let L=new yn;L.viewport=new Ht;let b=[P,L],S=new Ef,T=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let W=y[q];return W===void 0&&(W=new fa,y[q]=W),W.getTargetRaySpace()},this.getControllerGrip=function(q){let W=y[q];return W===void 0&&(W=new fa,y[q]=W),W.getGripSpace()},this.getHand=function(q){let W=y[q];return W===void 0&&(W=new fa,y[q]=W),W.getHandSpace()};function F(q){let W=v.indexOf(q.inputSource);if(W===-1)return;let j=y[W];j!==void 0&&(j.update(q.inputSource,q.frame,u||a),j.dispatchEvent({type:q.type,data:q.inputSource}))}function H(){r.removeEventListener("select",F),r.removeEventListener("selectstart",F),r.removeEventListener("selectend",F),r.removeEventListener("squeeze",F),r.removeEventListener("squeezestart",F),r.removeEventListener("squeezeend",F),r.removeEventListener("end",H),r.removeEventListener("inputsourceschange",U);for(let q=0;q<y.length;q++){let W=v[q];W!==null&&(v[q]=null,y[q].disconnect(W))}T=null,O=null,x.reset(),e.setRenderTarget(p),h=null,d=null,f=null,r=null,_=null,le.stop(),i.isPresenting=!1,e.setPixelRatio(E),e.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){o=q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){s=q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return u||a},this.setReferenceSpace=function(q){u=q},this.getBaseLayer=function(){return d!==null?d:h},this.getBinding=function(){return f},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(q){if(r=q,r!==null){if(p=e.getRenderTarget(),r.addEventListener("select",F),r.addEventListener("selectstart",F),r.addEventListener("selectend",F),r.addEventListener("squeeze",F),r.addEventListener("squeezestart",F),r.addEventListener("squeezeend",F),r.addEventListener("end",H),r.addEventListener("inputsourceschange",U),g.xrCompatible!==!0&&await t.makeXRCompatible(),E=e.getPixelRatio(),e.getSize(R),r.renderState.layers===void 0){let W={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:o};h=new XRWebGLLayer(r,t,W),r.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),_=new Gi(h.framebufferWidth,h.framebufferHeight,{format:ii,type:Vi,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil})}else{let W=null,j=null,oe=null;g.depth&&(oe=g.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,W=g.stencil?_o:ho,j=g.stencil?yo:Pr);let de={colorFormat:t.RGBA8,depthFormat:oe,scaleFactor:o};f=new XRWebGLBinding(r,t),d=f.createProjectionLayer(de),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),_=new Gi(d.textureWidth,d.textureHeight,{format:ii,type:Vi,depthTexture:new xl(d.textureWidth,d.textureHeight,j,void 0,void 0,void 0,void 0,void 0,void 0,W),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),u=null,a=await r.requestReferenceSpace(s),le.setContext(r),le.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function U(q){for(let W=0;W<q.removed.length;W++){let j=q.removed[W],oe=v.indexOf(j);oe>=0&&(v[oe]=null,y[oe].disconnect(j))}for(let W=0;W<q.added.length;W++){let j=q.added[W],oe=v.indexOf(j);if(oe===-1){for(let me=0;me<y.length;me++)if(me>=v.length){v.push(j),oe=me;break}else if(v[me]===null){v[me]=j,oe=me;break}if(oe===-1)break}let de=y[oe];de&&de.connect(j)}}let N=new z,te=new z;function D(q,W,j){N.setFromMatrixPosition(W.matrixWorld),te.setFromMatrixPosition(j.matrixWorld);let oe=N.distanceTo(te),de=W.projectionMatrix.elements,me=j.projectionMatrix.elements,ue=de[14]/(de[10]-1),Ce=de[14]/(de[10]+1),Te=(de[9]+1)/de[5],Pe=(de[9]-1)/de[5],B=(de[8]-1)/de[0],Oe=(me[8]+1)/me[0],De=ue*B,_e=ue*Oe,pe=oe/(-B+Oe),Ue=pe*-B;if(W.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(Ue),q.translateZ(pe),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),de[10]===-1)q.projectionMatrix.copy(W.projectionMatrix),q.projectionMatrixInverse.copy(W.projectionMatrixInverse);else{let xe=ue+pe,C=Ce+pe,w=De-Ue,X=_e+(oe-Ue),ne=Te*Ce/C*xe,ae=Pe*Ce/C*xe;q.projectionMatrix.makePerspective(w,X,ne,ae,xe,C),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function k(q,W){W===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(W.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(r===null)return;let W=q.near,j=q.far;x.texture!==null&&(x.depthNear>0&&(W=x.depthNear),x.depthFar>0&&(j=x.depthFar)),S.near=L.near=P.near=W,S.far=L.far=P.far=j,(T!==S.near||O!==S.far)&&(r.updateRenderState({depthNear:S.near,depthFar:S.far}),T=S.near,O=S.far),P.layers.mask=q.layers.mask|2,L.layers.mask=q.layers.mask|4,S.layers.mask=P.layers.mask|L.layers.mask;let oe=q.parent,de=S.cameras;k(S,oe);for(let me=0;me<de.length;me++)k(de[me],oe);de.length===2?D(S,P,L):S.projectionMatrix.copy(P.projectionMatrix),J(q,S,oe)};function J(q,W,j){j===null?q.matrix.copy(W.matrixWorld):(q.matrix.copy(j.matrixWorld),q.matrix.invert(),q.matrix.multiply(W.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(W.projectionMatrix),q.projectionMatrixInverse.copy(W.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=ga*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(d===null&&h===null))return l},this.setFoveation=function(q){l=q,d!==null&&(d.fixedFoveation=q),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=q)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(S)};let $=null;function re(q,W){if(c=W.getViewerPose(u||a),m=W,c!==null){let j=c.views;h!==null&&(e.setRenderTargetFramebuffer(_,h.framebuffer),e.setRenderTarget(_));let oe=!1;j.length!==S.cameras.length&&(S.cameras.length=0,oe=!0);for(let me=0;me<j.length;me++){let ue=j[me],Ce=null;if(h!==null)Ce=h.getViewport(ue);else{let Pe=f.getViewSubImage(d,ue);Ce=Pe.viewport,me===0&&(e.setRenderTargetTextures(_,Pe.colorTexture,d.ignoreDepthValues?void 0:Pe.depthStencilTexture),e.setRenderTarget(_))}let Te=b[me];Te===void 0&&(Te=new yn,Te.layers.enable(me),Te.viewport=new Ht,b[me]=Te),Te.matrix.fromArray(ue.transform.matrix),Te.matrix.decompose(Te.position,Te.quaternion,Te.scale),Te.projectionMatrix.fromArray(ue.projectionMatrix),Te.projectionMatrixInverse.copy(Te.projectionMatrix).invert(),Te.viewport.set(Ce.x,Ce.y,Ce.width,Ce.height),me===0&&(S.matrix.copy(Te.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),oe===!0&&S.cameras.push(Te)}let de=r.enabledFeatures;if(de&&de.includes("depth-sensing")){let me=f.getDepthInformation(j[0]);me&&me.isValid&&me.texture&&x.init(e,me,r.renderState)}}for(let j=0;j<y.length;j++){let oe=v[j],de=y[j];oe!==null&&de!==void 0&&de.update(oe,W,u||a)}$&&$(q,W),W.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:W}),m=null}let le=new Im;le.setAnimationLoop(re),this.setAnimationLoop=function(q){$=q},this.dispose=function(){}}},wr=new _i,eS=new wt;function tS(n,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function i(g,p){p.color.getRGB(g.fogColor.value,Pm(n)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function r(g,p,_,y,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?o(g,p):p.isMeshToonMaterial?(o(g,p),f(g,p)):p.isMeshPhongMaterial?(o(g,p),c(g,p)):p.isMeshStandardMaterial?(o(g,p),d(g,p),p.isMeshPhysicalMaterial&&h(g,p,v)):p.isMeshMatcapMaterial?(o(g,p),m(g,p)):p.isMeshDepthMaterial?o(g,p):p.isMeshDistanceMaterial?(o(g,p),x(g,p)):p.isMeshNormalMaterial?o(g,p):p.isLineBasicMaterial?(a(g,p),p.isLineDashedMaterial&&s(g,p)):p.isPointsMaterial?l(g,p,_,y):p.isSpriteMaterial?u(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function o(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Qt&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Qt&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);let _=e.get(p),y=_.envMap,v=_.envMapRotation;y&&(g.envMap.value=y,wr.copy(v),wr.x*=-1,wr.y*=-1,wr.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(wr.y*=-1,wr.z*=-1),g.envMapRotation.value.setFromMatrix4(eS.makeRotationFromEuler(wr)),g.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function s(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,_,y){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*_,g.scale.value=y*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function u(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function f(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function d(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function h(g,p,_){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Qt&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=_.texture,g.transmissionSamplerSize.value.set(_.width,_.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function x(g,p){let _=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(_.matrixWorld),g.nearDistance.value=_.shadow.camera.near,g.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function nS(n,e,t,i){let r={},o={},a=[],s=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(_,y){let v=y.program;i.uniformBlockBinding(_,v)}function u(_,y){let v=r[_.id];v===void 0&&(m(_),v=c(_),r[_.id]=v,_.addEventListener("dispose",g));let R=y.program;i.updateUBOMapping(_,R);let E=e.render.frame;o[_.id]!==E&&(d(_),o[_.id]=E)}function c(_){let y=f();_.__bindingPointIndex=y;let v=n.createBuffer(),R=_.__size,E=_.usage;return n.bindBuffer(n.UNIFORM_BUFFER,v),n.bufferData(n.UNIFORM_BUFFER,R,E),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,y,v),v}function f(){for(let _=0;_<s;_++)if(a.indexOf(_)===-1)return a.push(_),_;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(_){let y=r[_.id],v=_.uniforms,R=_.__cache;n.bindBuffer(n.UNIFORM_BUFFER,y);for(let E=0,P=v.length;E<P;E++){let L=Array.isArray(v[E])?v[E]:[v[E]];for(let b=0,S=L.length;b<S;b++){let T=L[b];if(h(T,E,b,R)===!0){let O=T.__offset,F=Array.isArray(T.value)?T.value:[T.value],H=0;for(let U=0;U<F.length;U++){let N=F[U],te=x(N);typeof N=="number"||typeof N=="boolean"?(T.__data[0]=N,n.bufferSubData(n.UNIFORM_BUFFER,O+H,T.__data)):N.isMatrix3?(T.__data[0]=N.elements[0],T.__data[1]=N.elements[1],T.__data[2]=N.elements[2],T.__data[3]=0,T.__data[4]=N.elements[3],T.__data[5]=N.elements[4],T.__data[6]=N.elements[5],T.__data[7]=0,T.__data[8]=N.elements[6],T.__data[9]=N.elements[7],T.__data[10]=N.elements[8],T.__data[11]=0):(N.toArray(T.__data,H),H+=te.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,O,T.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function h(_,y,v,R){let E=_.value,P=y+"_"+v;if(R[P]===void 0)return typeof E=="number"||typeof E=="boolean"?R[P]=E:R[P]=E.clone(),!0;{let L=R[P];if(typeof E=="number"||typeof E=="boolean"){if(L!==E)return R[P]=E,!0}else if(L.equals(E)===!1)return L.copy(E),!0}return!1}function m(_){let y=_.uniforms,v=0,R=16;for(let P=0,L=y.length;P<L;P++){let b=Array.isArray(y[P])?y[P]:[y[P]];for(let S=0,T=b.length;S<T;S++){let O=b[S],F=Array.isArray(O.value)?O.value:[O.value];for(let H=0,U=F.length;H<U;H++){let N=F[H],te=x(N),D=v%R,k=D%te.boundary,J=D+k;v+=k,J!==0&&R-J<te.storage&&(v+=R-J),O.__data=new Float32Array(te.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=v,v+=te.storage}}}let E=v%R;return E>0&&(v+=R-E),_.__size=v,_.__cache={},this}function x(_){let y={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(y.boundary=4,y.storage=4):_.isVector2?(y.boundary=8,y.storage=8):_.isVector3||_.isColor?(y.boundary=16,y.storage=12):_.isVector4?(y.boundary=16,y.storage=16):_.isMatrix3?(y.boundary=48,y.storage=48):_.isMatrix4?(y.boundary=64,y.storage=64):_.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",_),y}function g(_){let y=_.target;y.removeEventListener("dispose",g);let v=a.indexOf(y.__bindingPointIndex);a.splice(v,1),n.deleteBuffer(r[y.id]),delete r[y.id],delete o[y.id]}function p(){for(let _ in r)n.deleteBuffer(r[_]);a=[],r={},o={}}return{bind:l,update:u,dispose:p}}var vl=class{constructor(e={}){let{canvas:t=av(),context:i=null,depth:r=!0,stencil:o=!1,alpha:a=!1,antialias:s=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:u=!1,powerPreference:c="default",failIfMajorPerformanceCaveat:f=!1,reverseDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let h;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=i.getContextAttributes().alpha}else h=a;let m=new Uint32Array(4),x=new Int32Array(4),g=null,p=null,_=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=zt,this.toneMapping=ir,this.toneMappingExposure=1;let v=this,R=!1,E=0,P=0,L=null,b=-1,S=null,T=new Ht,O=new Ht,F=null,H=new $e(0),U=0,N=t.width,te=t.height,D=1,k=null,J=null,$=new Ht(0,0,N,te),re=new Ht(0,0,N,te),le=!1,q=new Dr,W=!1,j=!1,oe=new wt,de=new wt,me=new z,ue=new Ht,Ce={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Te=!1;function Pe(){return L===null?D:1}let B=i;function Oe(A,V){return t.getContext(A,V)}try{let A={alpha:!0,depth:r,stencil:o,antialias:s,premultipliedAlpha:l,preserveDrawingBuffer:u,powerPreference:c,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine","three.js r170"),t.addEventListener("webglcontextlost",Z,!1),t.addEventListener("webglcontextrestored",ce,!1),t.addEventListener("webglcontextcreationerror",se,!1),B===null){let V="webgl2";if(B=Oe(V,A),B===null)throw Oe(V)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let De,_e,pe,Ue,xe,C,w,X,ne,ae,ie,be,he,ge,Ve,fe,we,M,Re,Me,Ge,ze,qe,I;function ee(){De=new v1(B),De.init(),ze=new $M(B,De),_e=new d1(B,De,e,ze),pe=new YM(B,De),_e.reverseDepthBuffer&&d&&pe.buffers.depth.setReversed(!0),Ue=new M1(B),xe=new UM,C=new KM(B,De,pe,xe,_e,ze,Ue),w=new p1(v),X=new x1(v),ne=new Cv(B),qe=new u1(B,ne),ae=new y1(B,ne,Ue,qe),ie=new b1(B,ae,ne,Ue),Re=new S1(B,_e,C),fe=new h1(xe),be=new DM(v,w,X,De,_e,qe,fe),he=new tS(v,xe),ge=new FM,Ve=new VM(De),M=new c1(v,w,X,pe,ie,h,l),we=new qM(v,ie,_e),I=new nS(B,Ue,_e,pe),Me=new f1(B,De,Ue),Ge=new _1(B,De,Ue),Ue.programs=be.programs,v.capabilities=_e,v.extensions=De,v.properties=xe,v.renderLists=ge,v.shadowMap=we,v.state=pe,v.info=Ue}ee();let G=new Cf(v,B);this.xr=G,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){let A=De.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){let A=De.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return D},this.setPixelRatio=function(A){A!==void 0&&(D=A,this.setSize(N,te,!1))},this.getSize=function(A){return A.set(N,te)},this.setSize=function(A,V,K=!0){if(G.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}N=A,te=V,t.width=Math.floor(A*D),t.height=Math.floor(V*D),K===!0&&(t.style.width=A+"px",t.style.height=V+"px"),this.setViewport(0,0,A,V)},this.getDrawingBufferSize=function(A){return A.set(N*D,te*D).floor()},this.setDrawingBufferSize=function(A,V,K){N=A,te=V,D=K,t.width=Math.floor(A*K),t.height=Math.floor(V*K),this.setViewport(0,0,A,V)},this.getCurrentViewport=function(A){return A.copy(T)},this.getViewport=function(A){return A.copy($)},this.setViewport=function(A,V,K,Q){A.isVector4?$.set(A.x,A.y,A.z,A.w):$.set(A,V,K,Q),pe.viewport(T.copy($).multiplyScalar(D).round())},this.getScissor=function(A){return A.copy(re)},this.setScissor=function(A,V,K,Q){A.isVector4?re.set(A.x,A.y,A.z,A.w):re.set(A,V,K,Q),pe.scissor(O.copy(re).multiplyScalar(D).round())},this.getScissorTest=function(){return le},this.setScissorTest=function(A){pe.setScissorTest(le=A)},this.setOpaqueSort=function(A){k=A},this.setTransparentSort=function(A){J=A},this.getClearColor=function(A){return A.copy(M.getClearColor())},this.setClearColor=function(){M.setClearColor.apply(M,arguments)},this.getClearAlpha=function(){return M.getClearAlpha()},this.setClearAlpha=function(){M.setClearAlpha.apply(M,arguments)},this.clear=function(A=!0,V=!0,K=!0){let Q=0;if(A){let Y=!1;if(L!==null){let ve=L.texture.format;Y=ve===id||ve===nd||ve===td}if(Y){let ve=L.texture.type,Ee=ve===Vi||ve===Pr||ve===ma||ve===yo||ve===Qf||ve===ed,Ne=M.getClearColor(),Ie=M.getClearAlpha(),We=Ne.r,Ze=Ne.g,Fe=Ne.b;Ee?(m[0]=We,m[1]=Ze,m[2]=Fe,m[3]=Ie,B.clearBufferuiv(B.COLOR,0,m)):(x[0]=We,x[1]=Ze,x[2]=Fe,x[3]=Ie,B.clearBufferiv(B.COLOR,0,x))}else Q|=B.COLOR_BUFFER_BIT}V&&(Q|=B.DEPTH_BUFFER_BIT),K&&(Q|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B.clear(Q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Z,!1),t.removeEventListener("webglcontextrestored",ce,!1),t.removeEventListener("webglcontextcreationerror",se,!1),ge.dispose(),Ve.dispose(),xe.dispose(),w.dispose(),X.dispose(),ie.dispose(),qe.dispose(),I.dispose(),be.dispose(),G.dispose(),G.removeEventListener("sessionstart",He),G.removeEventListener("sessionend",Wt),Dt.stop()};function Z(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function ce(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;let A=Ue.autoReset,V=we.enabled,K=we.autoUpdate,Q=we.needsUpdate,Y=we.type;ee(),Ue.autoReset=A,we.enabled=V,we.autoUpdate=K,we.needsUpdate=Q,we.type=Y}function se(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Se(A){let V=A.target;V.removeEventListener("dispose",Se),Ke(V)}function Ke(A){Qe(A),xe.remove(A)}function Qe(A){let V=xe.get(A).programs;V!==void 0&&(V.forEach(function(K){be.releaseProgram(K)}),A.isShaderMaterial&&be.releaseShaderCache(A))}this.renderBufferDirect=function(A,V,K,Q,Y,ve){V===null&&(V=Ce);let Ee=Y.isMesh&&Y.matrixWorld.determinant()<0,Ne=bn(A,V,K,Q,Y);pe.setMaterial(Q,Ee);let Ie=K.index,We=1;if(Q.wireframe===!0){if(Ie=ae.getWireframeAttribute(K),Ie===void 0)return;We=2}let Ze=K.drawRange,Fe=K.attributes.position,et=Ze.start*We,ct=(Ze.start+Ze.count)*We;ve!==null&&(et=Math.max(et,ve.start*We),ct=Math.min(ct,(ve.start+ve.count)*We)),Ie!==null?(et=Math.max(et,0),ct=Math.min(ct,Ie.count)):Fe!=null&&(et=Math.max(et,0),ct=Math.min(ct,Fe.count));let Mt=ct-et;if(Mt<0||Mt===1/0)return;qe.setup(Y,Q,Ne,K,Ie);let $t,ut=Me;if(Ie!==null&&($t=ne.get(Ie),ut=Ge,ut.setIndex($t)),Y.isMesh)Q.wireframe===!0?(pe.setLineWidth(Q.wireframeLinewidth*Pe()),ut.setMode(B.LINES)):ut.setMode(B.TRIANGLES);else if(Y.isLine){let Be=Q.linewidth;Be===void 0&&(Be=1),pe.setLineWidth(Be*Pe()),Y.isLineSegments?ut.setMode(B.LINES):Y.isLineLoop?ut.setMode(B.LINE_LOOP):ut.setMode(B.LINE_STRIP)}else Y.isPoints?ut.setMode(B.POINTS):Y.isSprite&&ut.setMode(B.TRIANGLES);if(Y.isBatchedMesh)if(Y._multiDrawInstances!==null)ut.renderMultiDrawInstances(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount,Y._multiDrawInstances);else if(De.get("WEBGL_multi_draw"))ut.renderMultiDraw(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount);else{let Be=Y._multiDrawStarts,ln=Y._multiDrawCounts,ft=Y._multiDrawCount,mn=Ie?ne.get(Ie).bytesPerElement:1,kn=xe.get(Q).currentProgram.getUniforms();for(let Jt=0;Jt<ft;Jt++)kn.setValue(B,"_gl_DrawID",Jt),ut.render(Be[Jt]/mn,ln[Jt])}else if(Y.isInstancedMesh)ut.renderInstances(et,Mt,Y.count);else if(K.isInstancedBufferGeometry){let Be=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,ln=Math.min(K.instanceCount,Be);ut.renderInstances(et,Mt,ln)}else ut.render(et,Mt)};function Xe(A,V,K){A.transparent===!0&&A.side===ti&&A.forceSinglePass===!1?(A.side=Qt,A.needsUpdate=!0,rn(A,V,K),A.side=rr,A.needsUpdate=!0,rn(A,V,K),A.side=ti):rn(A,V,K)}this.compile=function(A,V,K=null){K===null&&(K=A),p=Ve.get(K),p.init(V),y.push(p),K.traverseVisible(function(Y){Y.isLight&&Y.layers.test(V.layers)&&(p.pushLight(Y),Y.castShadow&&p.pushShadow(Y))}),A!==K&&A.traverseVisible(function(Y){Y.isLight&&Y.layers.test(V.layers)&&(p.pushLight(Y),Y.castShadow&&p.pushShadow(Y))}),p.setupLights();let Q=new Set;return A.traverse(function(Y){if(!(Y.isMesh||Y.isPoints||Y.isLine||Y.isSprite))return;let ve=Y.material;if(ve)if(Array.isArray(ve))for(let Ee=0;Ee<ve.length;Ee++){let Ne=ve[Ee];Xe(Ne,K,Y),Q.add(Ne)}else Xe(ve,K,Y),Q.add(ve)}),y.pop(),p=null,Q},this.compileAsync=function(A,V,K=null){let Q=this.compile(A,V,K);return new Promise(Y=>{function ve(){if(Q.forEach(function(Ee){xe.get(Ee).currentProgram.isReady()&&Q.delete(Ee)}),Q.size===0){Y(A);return}setTimeout(ve,10)}De.get("KHR_parallel_shader_compile")!==null?ve():setTimeout(ve,10)})};let At=null;function yt(A){At&&At(A)}function He(){Dt.stop()}function Wt(){Dt.start()}let Dt=new Im;Dt.setAnimationLoop(yt),typeof self<"u"&&Dt.setContext(self),this.setAnimationLoop=function(A){At=A,G.setAnimationLoop(A),A===null?Dt.stop():Dt.start()},G.addEventListener("sessionstart",He),G.addEventListener("sessionend",Wt),this.render=function(A,V){if(V!==void 0&&V.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),V.parent===null&&V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),G.enabled===!0&&G.isPresenting===!0&&(G.cameraAutoUpdate===!0&&G.updateCamera(V),V=G.getCamera()),A.isScene===!0&&A.onBeforeRender(v,A,V,L),p=Ve.get(A,y.length),p.init(V),y.push(p),de.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),q.setFromProjectionMatrix(de),j=this.localClippingEnabled,W=fe.init(this.clippingPlanes,j),g=ge.get(A,_.length),g.init(),_.push(g),G.enabled===!0&&G.isPresenting===!0){let ve=v.xr.getDepthSensingMesh();ve!==null&&hn(ve,V,-1/0,v.sortObjects)}hn(A,V,0,v.sortObjects),g.finish(),v.sortObjects===!0&&g.sort(k,J),Te=G.enabled===!1||G.isPresenting===!1||G.hasDepthSensing()===!1,Te&&M.addToRenderList(g,A),this.info.render.frame++,W===!0&&fe.beginShadows();let K=p.state.shadowsArray;we.render(K,A,V),W===!0&&fe.endShadows(),this.info.autoReset===!0&&this.info.reset();let Q=g.opaque,Y=g.transmissive;if(p.setupLights(),V.isArrayCamera){let ve=V.cameras;if(Y.length>0)for(let Ee=0,Ne=ve.length;Ee<Ne;Ee++){let Ie=ve[Ee];nn(Q,Y,A,Ie)}Te&&M.render(A);for(let Ee=0,Ne=ve.length;Ee<Ne;Ee++){let Ie=ve[Ee];Ye(g,A,Ie,Ie.viewport)}}else Y.length>0&&nn(Q,Y,A,V),Te&&M.render(A),Ye(g,A,V);L!==null&&(C.updateMultisampleRenderTarget(L),C.updateRenderTargetMipmap(L)),A.isScene===!0&&A.onAfterRender(v,A,V),qe.resetDefaultState(),b=-1,S=null,y.pop(),y.length>0?(p=y[y.length-1],W===!0&&fe.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,_.pop(),_.length>0?g=_[_.length-1]:g=null};function hn(A,V,K,Q){if(A.visible===!1)return;if(A.layers.test(V.layers)){if(A.isGroup)K=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(V);else if(A.isLight)p.pushLight(A),A.castShadow&&p.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||q.intersectsSprite(A)){Q&&ue.setFromMatrixPosition(A.matrixWorld).applyMatrix4(de);let Ee=ie.update(A),Ne=A.material;Ne.visible&&g.push(A,Ee,Ne,K,ue.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||q.intersectsObject(A))){let Ee=ie.update(A),Ne=A.material;if(Q&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),ue.copy(A.boundingSphere.center)):(Ee.boundingSphere===null&&Ee.computeBoundingSphere(),ue.copy(Ee.boundingSphere.center)),ue.applyMatrix4(A.matrixWorld).applyMatrix4(de)),Array.isArray(Ne)){let Ie=Ee.groups;for(let We=0,Ze=Ie.length;We<Ze;We++){let Fe=Ie[We],et=Ne[Fe.materialIndex];et&&et.visible&&g.push(A,Ee,et,K,ue.z,Fe)}}else Ne.visible&&g.push(A,Ee,Ne,K,ue.z,null)}}let ve=A.children;for(let Ee=0,Ne=ve.length;Ee<Ne;Ee++)hn(ve[Ee],V,K,Q)}function Ye(A,V,K,Q){let Y=A.opaque,ve=A.transmissive,Ee=A.transparent;p.setupLightsView(K),W===!0&&fe.setGlobalState(v.clippingPlanes,K),Q&&pe.viewport(T.copy(Q)),Y.length>0&&Ln(Y,V,K),ve.length>0&&Ln(ve,V,K),Ee.length>0&&Ln(Ee,V,K),pe.buffers.depth.setTest(!0),pe.buffers.depth.setMask(!0),pe.buffers.color.setMask(!0),pe.setPolygonOffset(!1)}function nn(A,V,K,Q){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[Q.id]===void 0&&(p.state.transmissionRenderTarget[Q.id]=new Gi(1,1,{generateMipmaps:!0,type:De.has("EXT_color_buffer_half_float")||De.has("EXT_color_buffer_float")?Ra:Vi,minFilter:Rr,samples:4,stencilBuffer:o,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:gt.workingColorSpace}));let ve=p.state.transmissionRenderTarget[Q.id],Ee=Q.viewport||T;ve.setSize(Ee.z,Ee.w);let Ne=v.getRenderTarget();v.setRenderTarget(ve),v.getClearColor(H),U=v.getClearAlpha(),U<1&&v.setClearColor(16777215,.5),v.clear(),Te&&M.render(K);let Ie=v.toneMapping;v.toneMapping=ir;let We=Q.viewport;if(Q.viewport!==void 0&&(Q.viewport=void 0),p.setupLightsView(Q),W===!0&&fe.setGlobalState(v.clippingPlanes,Q),Ln(A,K,Q),C.updateMultisampleRenderTarget(ve),C.updateRenderTargetMipmap(ve),De.has("WEBGL_multisampled_render_to_texture")===!1){let Ze=!1;for(let Fe=0,et=V.length;Fe<et;Fe++){let ct=V[Fe],Mt=ct.object,$t=ct.geometry,ut=ct.material,Be=ct.group;if(ut.side===ti&&Mt.layers.test(Q.layers)){let ln=ut.side;ut.side=Qt,ut.needsUpdate=!0,Dn(Mt,K,Q,$t,ut,Be),ut.side=ln,ut.needsUpdate=!0,Ze=!0}}Ze===!0&&(C.updateMultisampleRenderTarget(ve),C.updateRenderTargetMipmap(ve))}v.setRenderTarget(Ne),v.setClearColor(H,U),We!==void 0&&(Q.viewport=We),v.toneMapping=Ie}function Ln(A,V,K){let Q=V.isScene===!0?V.overrideMaterial:null;for(let Y=0,ve=A.length;Y<ve;Y++){let Ee=A[Y],Ne=Ee.object,Ie=Ee.geometry,We=Q===null?Ee.material:Q,Ze=Ee.group;Ne.layers.test(K.layers)&&Dn(Ne,V,K,Ie,We,Ze)}}function Dn(A,V,K,Q,Y,ve){A.onBeforeRender(v,V,K,Q,Y,ve),A.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),Y.onBeforeRender(v,V,K,Q,A,ve),Y.transparent===!0&&Y.side===ti&&Y.forceSinglePass===!1?(Y.side=Qt,Y.needsUpdate=!0,v.renderBufferDirect(K,V,Q,Y,A,ve),Y.side=rr,Y.needsUpdate=!0,v.renderBufferDirect(K,V,Q,Y,A,ve),Y.side=ti):v.renderBufferDirect(K,V,Q,Y,A,ve),A.onAfterRender(v,V,K,Q,Y,ve)}function rn(A,V,K){V.isScene!==!0&&(V=Ce);let Q=xe.get(A),Y=p.state.lights,ve=p.state.shadowsArray,Ee=Y.state.version,Ne=be.getParameters(A,Y.state,ve,V,K),Ie=be.getProgramCacheKey(Ne),We=Q.programs;Q.environment=A.isMeshStandardMaterial?V.environment:null,Q.fog=V.fog,Q.envMap=(A.isMeshStandardMaterial?X:w).get(A.envMap||Q.environment),Q.envMapRotation=Q.environment!==null&&A.envMap===null?V.environmentRotation:A.envMapRotation,We===void 0&&(A.addEventListener("dispose",Se),We=new Map,Q.programs=We);let Ze=We.get(Ie);if(Ze!==void 0){if(Q.currentProgram===Ze&&Q.lightsStateVersion===Ee)return kt(A,Ne),Ze}else Ne.uniforms=be.getUniforms(A),A.onBeforeCompile(Ne,v),Ze=be.acquireProgram(Ne,Ie),We.set(Ie,Ze),Q.uniforms=Ne.uniforms;let Fe=Q.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Fe.clippingPlanes=fe.uniform),kt(A,Ne),Q.needsLights=Xi(A),Q.lightsStateVersion=Ee,Q.needsLights&&(Fe.ambientLightColor.value=Y.state.ambient,Fe.lightProbe.value=Y.state.probe,Fe.directionalLights.value=Y.state.directional,Fe.directionalLightShadows.value=Y.state.directionalShadow,Fe.spotLights.value=Y.state.spot,Fe.spotLightShadows.value=Y.state.spotShadow,Fe.rectAreaLights.value=Y.state.rectArea,Fe.ltc_1.value=Y.state.rectAreaLTC1,Fe.ltc_2.value=Y.state.rectAreaLTC2,Fe.pointLights.value=Y.state.point,Fe.pointLightShadows.value=Y.state.pointShadow,Fe.hemisphereLights.value=Y.state.hemi,Fe.directionalShadowMap.value=Y.state.directionalShadowMap,Fe.directionalShadowMatrix.value=Y.state.directionalShadowMatrix,Fe.spotShadowMap.value=Y.state.spotShadowMap,Fe.spotLightMatrix.value=Y.state.spotLightMatrix,Fe.spotLightMap.value=Y.state.spotLightMap,Fe.pointShadowMap.value=Y.state.pointShadowMap,Fe.pointShadowMatrix.value=Y.state.pointShadowMatrix),Q.currentProgram=Ze,Q.uniformsList=null,Ze}function pn(A){if(A.uniformsList===null){let V=A.currentProgram.getUniforms();A.uniformsList=mo.seqWithValue(V.seq,A.uniforms)}return A.uniformsList}function kt(A,V){let K=xe.get(A);K.outputColorSpace=V.outputColorSpace,K.batching=V.batching,K.batchingColor=V.batchingColor,K.instancing=V.instancing,K.instancingColor=V.instancingColor,K.instancingMorph=V.instancingMorph,K.skinning=V.skinning,K.morphTargets=V.morphTargets,K.morphNormals=V.morphNormals,K.morphColors=V.morphColors,K.morphTargetsCount=V.morphTargetsCount,K.numClippingPlanes=V.numClippingPlanes,K.numIntersection=V.numClipIntersection,K.vertexAlphas=V.vertexAlphas,K.vertexTangents=V.vertexTangents,K.toneMapping=V.toneMapping}function bn(A,V,K,Q,Y){V.isScene!==!0&&(V=Ce),C.resetTextureUnits();let ve=V.fog,Ee=Q.isMeshStandardMaterial?V.environment:null,Ne=L===null?v.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:wo,Ie=(Q.isMeshStandardMaterial?X:w).get(Q.envMap||Ee),We=Q.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,Ze=!!K.attributes.tangent&&(!!Q.normalMap||Q.anisotropy>0),Fe=!!K.morphAttributes.position,et=!!K.morphAttributes.normal,ct=!!K.morphAttributes.color,Mt=ir;Q.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(Mt=v.toneMapping);let $t=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,ut=$t!==void 0?$t.length:0,Be=xe.get(Q),ln=p.state.lights;if(W===!0&&(j===!0||A!==S)){let An=A===S&&Q.id===b;fe.setState(Q,A,An)}let ft=!1;Q.version===Be.__version?(Be.needsLights&&Be.lightsStateVersion!==ln.state.version||Be.outputColorSpace!==Ne||Y.isBatchedMesh&&Be.batching===!1||!Y.isBatchedMesh&&Be.batching===!0||Y.isBatchedMesh&&Be.batchingColor===!0&&Y.colorTexture===null||Y.isBatchedMesh&&Be.batchingColor===!1&&Y.colorTexture!==null||Y.isInstancedMesh&&Be.instancing===!1||!Y.isInstancedMesh&&Be.instancing===!0||Y.isSkinnedMesh&&Be.skinning===!1||!Y.isSkinnedMesh&&Be.skinning===!0||Y.isInstancedMesh&&Be.instancingColor===!0&&Y.instanceColor===null||Y.isInstancedMesh&&Be.instancingColor===!1&&Y.instanceColor!==null||Y.isInstancedMesh&&Be.instancingMorph===!0&&Y.morphTexture===null||Y.isInstancedMesh&&Be.instancingMorph===!1&&Y.morphTexture!==null||Be.envMap!==Ie||Q.fog===!0&&Be.fog!==ve||Be.numClippingPlanes!==void 0&&(Be.numClippingPlanes!==fe.numPlanes||Be.numIntersection!==fe.numIntersection)||Be.vertexAlphas!==We||Be.vertexTangents!==Ze||Be.morphTargets!==Fe||Be.morphNormals!==et||Be.morphColors!==ct||Be.toneMapping!==Mt||Be.morphTargetsCount!==ut)&&(ft=!0):(ft=!0,Be.__version=Q.version);let mn=Be.currentProgram;ft===!0&&(mn=rn(Q,V,Y));let kn=!1,Jt=!1,$n=!1,St=mn.getUniforms(),wn=Be.uniforms;if(pe.useProgram(mn.program)&&(kn=!0,Jt=!0,$n=!0),Q.id!==b&&(b=Q.id,Jt=!0),kn||S!==A){pe.buffers.depth.getReversed()?(oe.copy(A.projectionMatrix),lv(oe),cv(oe),St.setValue(B,"projectionMatrix",oe)):St.setValue(B,"projectionMatrix",A.projectionMatrix),St.setValue(B,"viewMatrix",A.matrixWorldInverse);let pi=St.map.cameraPosition;pi!==void 0&&pi.setValue(B,me.setFromMatrixPosition(A.matrixWorld)),_e.logarithmicDepthBuffer&&St.setValue(B,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(Q.isMeshPhongMaterial||Q.isMeshToonMaterial||Q.isMeshLambertMaterial||Q.isMeshBasicMaterial||Q.isMeshStandardMaterial||Q.isShaderMaterial)&&St.setValue(B,"isOrthographic",A.isOrthographicCamera===!0),S!==A&&(S=A,Jt=!0,$n=!0)}if(Y.isSkinnedMesh){St.setOptional(B,Y,"bindMatrix"),St.setOptional(B,Y,"bindMatrixInverse");let An=Y.skeleton;An&&(An.boneTexture===null&&An.computeBoneTexture(),St.setValue(B,"boneTexture",An.boneTexture,C))}Y.isBatchedMesh&&(St.setOptional(B,Y,"batchingTexture"),St.setValue(B,"batchingTexture",Y._matricesTexture,C),St.setOptional(B,Y,"batchingIdTexture"),St.setValue(B,"batchingIdTexture",Y._indirectTexture,C),St.setOptional(B,Y,"batchingColorTexture"),Y._colorsTexture!==null&&St.setValue(B,"batchingColorTexture",Y._colorsTexture,C));let xr=K.morphAttributes;if((xr.position!==void 0||xr.normal!==void 0||xr.color!==void 0)&&Re.update(Y,K,mn),(Jt||Be.receiveShadow!==Y.receiveShadow)&&(Be.receiveShadow=Y.receiveShadow,St.setValue(B,"receiveShadow",Y.receiveShadow)),Q.isMeshGouraudMaterial&&Q.envMap!==null&&(wn.envMap.value=Ie,wn.flipEnvMap.value=Ie.isCubeTexture&&Ie.isRenderTargetTexture===!1?-1:1),Q.isMeshStandardMaterial&&Q.envMap===null&&V.environment!==null&&(wn.envMapIntensity.value=V.environmentIntensity),Jt&&(St.setValue(B,"toneMappingExposure",v.toneMappingExposure),Be.needsLights&&qi(wn,$n),ve&&Q.fog===!0&&he.refreshFogUniforms(wn,ve),he.refreshMaterialUniforms(wn,Q,D,te,p.state.transmissionRenderTarget[A.id]),mo.upload(B,pn(Be),wn,C)),Q.isShaderMaterial&&Q.uniformsNeedUpdate===!0&&(mo.upload(B,pn(Be),wn,C),Q.uniformsNeedUpdate=!1),Q.isSpriteMaterial&&St.setValue(B,"center",Y.center),St.setValue(B,"modelViewMatrix",Y.modelViewMatrix),St.setValue(B,"normalMatrix",Y.normalMatrix),St.setValue(B,"modelMatrix",Y.matrixWorld),Q.isShaderMaterial||Q.isRawShaderMaterial){let An=Q.uniformsGroups;for(let pi=0,mi=An.length;pi<mi;pi++){let ms=An[pi];I.update(ms,mn),I.bind(ms,mn)}}return mn}function qi(A,V){A.ambientLightColor.needsUpdate=V,A.lightProbe.needsUpdate=V,A.directionalLights.needsUpdate=V,A.directionalLightShadows.needsUpdate=V,A.pointLights.needsUpdate=V,A.pointLightShadows.needsUpdate=V,A.spotLights.needsUpdate=V,A.spotLightShadows.needsUpdate=V,A.rectAreaLights.needsUpdate=V,A.hemisphereLights.needsUpdate=V}function Xi(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(A,V,K){xe.get(A.texture).__webglTexture=V,xe.get(A.depthTexture).__webglTexture=K;let Q=xe.get(A);Q.__hasExternalTextures=!0,Q.__autoAllocateDepthBuffer=K===void 0,Q.__autoAllocateDepthBuffer||De.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Q.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(A,V){let K=xe.get(A);K.__webglFramebuffer=V,K.__useDefaultFramebuffer=V===void 0},this.setRenderTarget=function(A,V=0,K=0){L=A,E=V,P=K;let Q=!0,Y=null,ve=!1,Ee=!1;if(A){let Ie=xe.get(A);if(Ie.__useDefaultFramebuffer!==void 0)pe.bindFramebuffer(B.FRAMEBUFFER,null),Q=!1;else if(Ie.__webglFramebuffer===void 0)C.setupRenderTarget(A);else if(Ie.__hasExternalTextures)C.rebindTextures(A,xe.get(A.texture).__webglTexture,xe.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){let Fe=A.depthTexture;if(Ie.__boundDepthTexture!==Fe){if(Fe!==null&&xe.has(Fe)&&(A.width!==Fe.image.width||A.height!==Fe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");C.setupDepthRenderbuffer(A)}}let We=A.texture;(We.isData3DTexture||We.isDataArrayTexture||We.isCompressedArrayTexture)&&(Ee=!0);let Ze=xe.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Ze[V])?Y=Ze[V][K]:Y=Ze[V],ve=!0):A.samples>0&&C.useMultisampledRTT(A)===!1?Y=xe.get(A).__webglMultisampledFramebuffer:Array.isArray(Ze)?Y=Ze[K]:Y=Ze,T.copy(A.viewport),O.copy(A.scissor),F=A.scissorTest}else T.copy($).multiplyScalar(D).floor(),O.copy(re).multiplyScalar(D).floor(),F=le;if(pe.bindFramebuffer(B.FRAMEBUFFER,Y)&&Q&&pe.drawBuffers(A,Y),pe.viewport(T),pe.scissor(O),pe.setScissorTest(F),ve){let Ie=xe.get(A.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+V,Ie.__webglTexture,K)}else if(Ee){let Ie=xe.get(A.texture),We=V||0;B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,Ie.__webglTexture,K||0,We)}b=-1},this.readRenderTargetPixels=function(A,V,K,Q,Y,ve,Ee){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ne=xe.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Ee!==void 0&&(Ne=Ne[Ee]),Ne){pe.bindFramebuffer(B.FRAMEBUFFER,Ne);try{let Ie=A.texture,We=Ie.format,Ze=Ie.type;if(!_e.textureFormatReadable(We)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!_e.textureTypeReadable(Ze)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}V>=0&&V<=A.width-Q&&K>=0&&K<=A.height-Y&&B.readPixels(V,K,Q,Y,ze.convert(We),ze.convert(Ze),ve)}finally{let Ie=L!==null?xe.get(L).__webglFramebuffer:null;pe.bindFramebuffer(B.FRAMEBUFFER,Ie)}}},this.readRenderTargetPixelsAsync=async function(A,V,K,Q,Y,ve,Ee){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ne=xe.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Ee!==void 0&&(Ne=Ne[Ee]),Ne){let Ie=A.texture,We=Ie.format,Ze=Ie.type;if(!_e.textureFormatReadable(We))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!_e.textureTypeReadable(Ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(V>=0&&V<=A.width-Q&&K>=0&&K<=A.height-Y){pe.bindFramebuffer(B.FRAMEBUFFER,Ne);let Fe=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,Fe),B.bufferData(B.PIXEL_PACK_BUFFER,ve.byteLength,B.STREAM_READ),B.readPixels(V,K,Q,Y,ze.convert(We),ze.convert(Ze),0);let et=L!==null?xe.get(L).__webglFramebuffer:null;pe.bindFramebuffer(B.FRAMEBUFFER,et);let ct=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await sv(B,ct,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,Fe),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,ve),B.deleteBuffer(Fe),B.deleteSync(ct),ve}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(A,V=null,K=0){A.isTexture!==!0&&(sa("WebGLRenderer: copyFramebufferToTexture function signature has changed."),V=arguments[0]||null,A=arguments[1]);let Q=Math.pow(2,-K),Y=Math.floor(A.image.width*Q),ve=Math.floor(A.image.height*Q),Ee=V!==null?V.x:0,Ne=V!==null?V.y:0;C.setTexture2D(A,0),B.copyTexSubImage2D(B.TEXTURE_2D,K,0,0,Ee,Ne,Y,ve),pe.unbindTexture()},this.copyTextureToTexture=function(A,V,K=null,Q=null,Y=0){A.isTexture!==!0&&(sa("WebGLRenderer: copyTextureToTexture function signature has changed."),Q=arguments[0]||null,A=arguments[1],V=arguments[2],Y=arguments[3]||0,K=null);let ve,Ee,Ne,Ie,We,Ze,Fe,et,ct,Mt=A.isCompressedTexture?A.mipmaps[Y]:A.image;K!==null?(ve=K.max.x-K.min.x,Ee=K.max.y-K.min.y,Ne=K.isBox3?K.max.z-K.min.z:1,Ie=K.min.x,We=K.min.y,Ze=K.isBox3?K.min.z:0):(ve=Mt.width,Ee=Mt.height,Ne=Mt.depth||1,Ie=0,We=0,Ze=0),Q!==null?(Fe=Q.x,et=Q.y,ct=Q.z):(Fe=0,et=0,ct=0);let $t=ze.convert(V.format),ut=ze.convert(V.type),Be;V.isData3DTexture?(C.setTexture3D(V,0),Be=B.TEXTURE_3D):V.isDataArrayTexture||V.isCompressedArrayTexture?(C.setTexture2DArray(V,0),Be=B.TEXTURE_2D_ARRAY):(C.setTexture2D(V,0),Be=B.TEXTURE_2D),B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,V.flipY),B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),B.pixelStorei(B.UNPACK_ALIGNMENT,V.unpackAlignment);let ln=B.getParameter(B.UNPACK_ROW_LENGTH),ft=B.getParameter(B.UNPACK_IMAGE_HEIGHT),mn=B.getParameter(B.UNPACK_SKIP_PIXELS),kn=B.getParameter(B.UNPACK_SKIP_ROWS),Jt=B.getParameter(B.UNPACK_SKIP_IMAGES);B.pixelStorei(B.UNPACK_ROW_LENGTH,Mt.width),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,Mt.height),B.pixelStorei(B.UNPACK_SKIP_PIXELS,Ie),B.pixelStorei(B.UNPACK_SKIP_ROWS,We),B.pixelStorei(B.UNPACK_SKIP_IMAGES,Ze);let $n=A.isDataArrayTexture||A.isData3DTexture,St=V.isDataArrayTexture||V.isData3DTexture;if(A.isRenderTargetTexture||A.isDepthTexture){let wn=xe.get(A),xr=xe.get(V),An=xe.get(wn.__renderTarget),pi=xe.get(xr.__renderTarget);pe.bindFramebuffer(B.READ_FRAMEBUFFER,An.__webglFramebuffer),pe.bindFramebuffer(B.DRAW_FRAMEBUFFER,pi.__webglFramebuffer);for(let mi=0;mi<Ne;mi++)$n&&B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,xe.get(A).__webglTexture,Y,Ze+mi),A.isDepthTexture?(St&&B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,xe.get(V).__webglTexture,Y,ct+mi),B.blitFramebuffer(Ie,We,ve,Ee,Fe,et,ve,Ee,B.DEPTH_BUFFER_BIT,B.NEAREST)):St?B.copyTexSubImage3D(Be,Y,Fe,et,ct+mi,Ie,We,ve,Ee):B.copyTexSubImage2D(Be,Y,Fe,et,ct+mi,Ie,We,ve,Ee);pe.bindFramebuffer(B.READ_FRAMEBUFFER,null),pe.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else St?A.isDataTexture||A.isData3DTexture?B.texSubImage3D(Be,Y,Fe,et,ct,ve,Ee,Ne,$t,ut,Mt.data):V.isCompressedArrayTexture?B.compressedTexSubImage3D(Be,Y,Fe,et,ct,ve,Ee,Ne,$t,Mt.data):B.texSubImage3D(Be,Y,Fe,et,ct,ve,Ee,Ne,$t,ut,Mt):A.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,Y,Fe,et,ve,Ee,$t,ut,Mt.data):A.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,Y,Fe,et,Mt.width,Mt.height,$t,Mt.data):B.texSubImage2D(B.TEXTURE_2D,Y,Fe,et,ve,Ee,$t,ut,Mt);B.pixelStorei(B.UNPACK_ROW_LENGTH,ln),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,ft),B.pixelStorei(B.UNPACK_SKIP_PIXELS,mn),B.pixelStorei(B.UNPACK_SKIP_ROWS,kn),B.pixelStorei(B.UNPACK_SKIP_IMAGES,Jt),Y===0&&V.generateMipmaps&&B.generateMipmap(Be),pe.unbindTexture()},this.copyTextureToTexture3D=function(A,V,K=null,Q=null,Y=0){return A.isTexture!==!0&&(sa("WebGLRenderer: copyTextureToTexture3D function signature has changed."),K=arguments[0]||null,Q=arguments[1]||null,A=arguments[2],V=arguments[3],Y=arguments[4]||0),sa('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(A,V,K,Q,Y)},this.initRenderTarget=function(A){xe.get(A).__webglFramebuffer===void 0&&C.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?C.setTextureCube(A,0):A.isData3DTexture?C.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?C.setTexture2DArray(A,0):C.setTexture2D(A,0),pe.unbindTexture()},this.resetState=function(){E=0,P=0,L=null,pe.reset(),qe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return zi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorspace=gt._getDrawingBufferColorSpace(e),t.unpackColorSpace=gt._getUnpackColorSpace()}};var yl=class extends en{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new _i,this.environmentIntensity=1,this.environmentRotation=new _i,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Rf=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=df,this.updateRanges=[],this.version=0,this.uuid=yi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let r=0,o=this.stride;r<o;r++)this.array[e+r]=t.array[i+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=yi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=yi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},xn=new z,_l=class n{constructor(e,t,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)xn.fromBufferAttribute(this,t),xn.applyMatrix4(e),this.setXYZ(t,xn.x,xn.y,xn.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)xn.fromBufferAttribute(this,t),xn.applyNormalMatrix(e),this.setXYZ(t,xn.x,xn.y,xn.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)xn.fromBufferAttribute(this,t),xn.transformDirection(e),this.setXYZ(t,xn.x,xn.y,xn.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=ni(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=bt(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=ni(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=ni(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=ni(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=ni(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=bt(t,this.array),i=bt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=bt(t,this.array),i=bt(i,this.array),r=bt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this}setXYZW(e,t,i,r,o){return e=e*this.data.stride+this.offset,this.normalized&&(t=bt(t,this.array),i=bt(i,this.array),r=bt(r,this.array),o=bt(o,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this.data.array[e+3]=o,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let r=i*this.data.stride+this.offset;for(let o=0;o<this.itemSize;o++)t.push(this.data.array[r+o])}return new Fn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new n(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let r=i*this.data.stride+this.offset;for(let o=0;o<this.itemSize;o++)t.push(this.data.array[r+o])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},_a=class extends Mi{static get type(){return"SpriteMaterial"}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new $e(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},oo,ia=new z,ao=new z,so=new z,lo=new Le,ra=new Le,Fm=new wt,Vs=new z,oa=new z,Gs=new z,Qp=new Le,yu=new Le,em=new Le,Ml=class extends en{constructor(e=new _a){if(super(),this.isSprite=!0,this.type="Sprite",oo===void 0){oo=new Vt;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new Rf(t,5);oo.setIndex([0,1,2,0,2,3]),oo.setAttribute("position",new _l(i,3,0,!1)),oo.setAttribute("uv",new _l(i,2,3,!1))}this.geometry=oo,this.material=e,this.center=new Le(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ao.setFromMatrixScale(this.matrixWorld),Fm.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),so.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ao.multiplyScalar(-so.z);let i=this.material.rotation,r,o;i!==0&&(o=Math.cos(i),r=Math.sin(i));let a=this.center;Ws(Vs.set(-.5,-.5,0),so,a,ao,r,o),Ws(oa.set(.5,-.5,0),so,a,ao,r,o),Ws(Gs.set(.5,.5,0),so,a,ao,r,o),Qp.set(0,0),yu.set(1,0),em.set(1,1);let s=e.ray.intersectTriangle(Vs,oa,Gs,!1,ia);if(s===null&&(Ws(oa.set(-.5,.5,0),so,a,ao,r,o),yu.set(0,1),s=e.ray.intersectTriangle(Vs,Gs,oa,!1,ia),s===null))return;let l=e.ray.origin.distanceTo(ia);l<e.near||l>e.far||t.push({distance:l,point:ia.clone(),uv:tr.getInterpolation(ia,Vs,oa,Gs,Qp,yu,em,new Le),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function Ws(n,e,t,i,r,o){lo.subVectors(n,t).addScalar(.5).multiply(i),r!==void 0?(ra.x=o*lo.x-r*lo.y,ra.y=r*lo.x+o*lo.y):ra.copy(lo),n.copy(e),n.x+=ra.x,n.y+=ra.y,n.applyMatrix4(Fm)}var Ur=class extends Mi{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new $e(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Sl=new z,bl=new z,tm=new wt,aa=new va,qs=new Lr,_u=new z,nm=new z,So=class extends en{constructor(e=new Vt,t=new Ur){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[0];for(let r=1,o=t.count;r<o;r++)Sl.fromBufferAttribute(t,r-1),bl.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=Sl.distanceTo(bl);e.setAttribute("lineDistance",new Tt(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let i=this.geometry,r=this.matrixWorld,o=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),qs.copy(i.boundingSphere),qs.applyMatrix4(r),qs.radius+=o,e.ray.intersectsSphere(qs)===!1)return;tm.copy(r).invert(),aa.copy(e.ray).applyMatrix4(tm);let s=o/((this.scale.x+this.scale.y+this.scale.z)/3),l=s*s,u=this.isLineSegments?2:1,c=i.index,d=i.attributes.position;if(c!==null){let h=Math.max(0,a.start),m=Math.min(c.count,a.start+a.count);for(let x=h,g=m-1;x<g;x+=u){let p=c.getX(x),_=c.getX(x+1),y=Xs(this,e,aa,l,p,_);y&&t.push(y)}if(this.isLineLoop){let x=c.getX(m-1),g=c.getX(h),p=Xs(this,e,aa,l,x,g);p&&t.push(p)}}else{let h=Math.max(0,a.start),m=Math.min(d.count,a.start+a.count);for(let x=h,g=m-1;x<g;x+=u){let p=Xs(this,e,aa,l,x,x+1);p&&t.push(p)}if(this.isLineLoop){let x=Xs(this,e,aa,l,m-1,h);x&&t.push(x)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,a=r.length;o<a;o++){let s=r[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[s]=o}}}}};function Xs(n,e,t,i,r,o){let a=n.geometry.attributes.position;if(Sl.fromBufferAttribute(a,r),bl.fromBufferAttribute(a,o),t.distanceSqToSegment(Sl,bl,_u,nm)>i)return;_u.applyMatrix4(n.matrixWorld);let l=e.ray.origin.distanceTo(_u);if(!(l<e.near||l>e.far))return{distance:l,point:nm.clone().applyMatrix4(n.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:n}}var ai=class extends Mi{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new $e(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},im=new wt,Pf=new va,Ys=new Lr,Zs=new z,Si=class extends en{constructor(e=new Vt,t=new ai){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let i=this.geometry,r=this.matrixWorld,o=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ys.copy(i.boundingSphere),Ys.applyMatrix4(r),Ys.radius+=o,e.ray.intersectsSphere(Ys)===!1)return;im.copy(r).invert(),Pf.copy(e.ray).applyMatrix4(im);let s=o/((this.scale.x+this.scale.y+this.scale.z)/3),l=s*s,u=i.index,f=i.attributes.position;if(u!==null){let d=Math.max(0,a.start),h=Math.min(u.count,a.start+a.count);for(let m=d,x=h;m<x;m++){let g=u.getX(m);Zs.fromBufferAttribute(f,g),rm(Zs,g,l,r,e,t,this)}}else{let d=Math.max(0,a.start),h=Math.min(f.count,a.start+a.count);for(let m=d,x=h;m<x;m++)Zs.fromBufferAttribute(f,m),rm(Zs,m,l,r,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,a=r.length;o<a;o++){let s=r[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[s]=o}}}}};function rm(n,e,t,i,r,o,a){let s=Pf.distanceSqToPoint(n);if(s<t){let l=new z;Pf.closestPointToPoint(n,l),l.applyMatrix4(i);let u=r.ray.origin.distanceTo(l);if(u<r.near||u>r.far)return;o.push({distance:u,distanceToRay:Math.sqrt(s),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var ar=class extends En{constructor(e,t,i,r,o,a,s,l,u){super(e,t,i,r,o,a,s,l,u),this.isCanvasTexture=!0,this.needsUpdate=!0}},Gn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){let i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],i,r=this.getPoint(0),o=0;t.push(0);for(let a=1;a<=e;a++)i=this.getPoint(a/e),o+=i.distanceTo(r),t.push(o),r=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){let i=this.getLengths(),r=0,o=i.length,a;t?a=t:a=e*i[o-1];let s=0,l=o-1,u;for(;s<=l;)if(r=Math.floor(s+(l-s)/2),u=i[r]-a,u<0)s=r+1;else if(u>0)l=r-1;else{l=r;break}if(r=l,i[r]===a)return r/(o-1);let c=i[r],d=i[r+1]-c,h=(a-c)/d;return(r+h)/(o-1)}getTangent(e,t){let r=e-1e-4,o=e+1e-4;r<0&&(r=0),o>1&&(o=1);let a=this.getPoint(r),s=this.getPoint(o),l=t||(a.isVector2?new Le:new z);return l.copy(s).sub(a).normalize(),l}getTangentAt(e,t){let i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t){let i=new z,r=[],o=[],a=[],s=new z,l=new wt;for(let h=0;h<=e;h++){let m=h/e;r[h]=this.getTangentAt(m,new z)}o[0]=new z,a[0]=new z;let u=Number.MAX_VALUE,c=Math.abs(r[0].x),f=Math.abs(r[0].y),d=Math.abs(r[0].z);c<=u&&(u=c,i.set(1,0,0)),f<=u&&(u=f,i.set(0,1,0)),d<=u&&i.set(0,0,1),s.crossVectors(r[0],i).normalize(),o[0].crossVectors(r[0],s),a[0].crossVectors(r[0],o[0]);for(let h=1;h<=e;h++){if(o[h]=o[h-1].clone(),a[h]=a[h-1].clone(),s.crossVectors(r[h-1],r[h]),s.length()>Number.EPSILON){s.normalize();let m=Math.acos(an(r[h-1].dot(r[h]),-1,1));o[h].applyMatrix4(l.makeRotationAxis(s,m))}a[h].crossVectors(r[h],o[h])}if(t===!0){let h=Math.acos(an(o[0].dot(o[e]),-1,1));h/=e,r[0].dot(s.crossVectors(o[0],o[e]))>0&&(h=-h);for(let m=1;m<=e;m++)o[m].applyMatrix4(l.makeRotationAxis(r[m],h*m)),a[m].crossVectors(r[m],o[m])}return{tangents:r,normals:o,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Ma=class extends Gn{constructor(e=0,t=0,i=1,r=1,o=0,a=Math.PI*2,s=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=r,this.aStartAngle=o,this.aEndAngle=a,this.aClockwise=s,this.aRotation=l}getPoint(e,t=new Le){let i=t,r=Math.PI*2,o=this.aEndAngle-this.aStartAngle,a=Math.abs(o)<Number.EPSILON;for(;o<0;)o+=r;for(;o>r;)o-=r;o<Number.EPSILON&&(a?o=0:o=r),this.aClockwise===!0&&!a&&(o===r?o=-r:o=o-r);let s=this.aStartAngle+e*o,l=this.aX+this.xRadius*Math.cos(s),u=this.aY+this.yRadius*Math.sin(s);if(this.aRotation!==0){let c=Math.cos(this.aRotation),f=Math.sin(this.aRotation),d=l-this.aX,h=u-this.aY;l=d*c-h*f+this.aX,u=d*f+h*c+this.aY}return i.set(l,u)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},If=class extends Ma{constructor(e,t,i,r,o,a){super(e,t,i,i,r,o,a),this.isArcCurve=!0,this.type="ArcCurve"}};function sd(){let n=0,e=0,t=0,i=0;function r(o,a,s,l){n=o,e=s,t=-3*o+3*a-2*s-l,i=2*o-2*a+s+l}return{initCatmullRom:function(o,a,s,l,u){r(a,s,u*(s-o),u*(l-a))},initNonuniformCatmullRom:function(o,a,s,l,u,c,f){let d=(a-o)/u-(s-o)/(u+c)+(s-a)/c,h=(s-a)/c-(l-a)/(c+f)+(l-s)/f;d*=c,h*=c,r(a,s,d,h)},calc:function(o){let a=o*o,s=a*o;return n+e*o+t*a+i*s}}}var Ks=new z,Mu=new sd,Su=new sd,bu=new sd,Lf=class extends Gn{constructor(e=[],t=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=r}getPoint(e,t=new z){let i=t,r=this.points,o=r.length,a=(o-(this.closed?0:1))*e,s=Math.floor(a),l=a-s;this.closed?s+=s>0?0:(Math.floor(Math.abs(s)/o)+1)*o:l===0&&s===o-1&&(s=o-2,l=1);let u,c;this.closed||s>0?u=r[(s-1)%o]:(Ks.subVectors(r[0],r[1]).add(r[0]),u=Ks);let f=r[s%o],d=r[(s+1)%o];if(this.closed||s+2<o?c=r[(s+2)%o]:(Ks.subVectors(r[o-1],r[o-2]).add(r[o-1]),c=Ks),this.curveType==="centripetal"||this.curveType==="chordal"){let h=this.curveType==="chordal"?.5:.25,m=Math.pow(u.distanceToSquared(f),h),x=Math.pow(f.distanceToSquared(d),h),g=Math.pow(d.distanceToSquared(c),h);x<1e-4&&(x=1),m<1e-4&&(m=x),g<1e-4&&(g=x),Mu.initNonuniformCatmullRom(u.x,f.x,d.x,c.x,m,x,g),Su.initNonuniformCatmullRom(u.y,f.y,d.y,c.y,m,x,g),bu.initNonuniformCatmullRom(u.z,f.z,d.z,c.z,m,x,g)}else this.curveType==="catmullrom"&&(Mu.initCatmullRom(u.x,f.x,d.x,c.x,this.tension),Su.initCatmullRom(u.y,f.y,d.y,c.y,this.tension),bu.initCatmullRom(u.z,f.z,d.z,c.z,this.tension));return i.set(Mu.calc(l),Su.calc(l),bu.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(new z().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function om(n,e,t,i,r){let o=(i-e)*.5,a=(r-t)*.5,s=n*n,l=n*s;return(2*t-2*i+o+a)*l+(-3*t+3*i-2*o-a)*s+o*n+t}function iS(n,e){let t=1-n;return t*t*e}function rS(n,e){return 2*(1-n)*n*e}function oS(n,e){return n*n*e}function da(n,e,t,i){return iS(n,e)+rS(n,t)+oS(n,i)}function aS(n,e){let t=1-n;return t*t*t*e}function sS(n,e){let t=1-n;return 3*t*t*n*e}function lS(n,e){return 3*(1-n)*n*n*e}function cS(n,e){return n*n*n*e}function ha(n,e,t,i,r){return aS(n,e)+sS(n,t)+lS(n,i)+cS(n,r)}var wl=class extends Gn{constructor(e=new Le,t=new Le,i=new Le,r=new Le){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new Le){let i=t,r=this.v0,o=this.v1,a=this.v2,s=this.v3;return i.set(ha(e,r.x,o.x,a.x,s.x),ha(e,r.y,o.y,a.y,s.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Df=class extends Gn{constructor(e=new z,t=new z,i=new z,r=new z){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new z){let i=t,r=this.v0,o=this.v1,a=this.v2,s=this.v3;return i.set(ha(e,r.x,o.x,a.x,s.x),ha(e,r.y,o.y,a.y,s.y),ha(e,r.z,o.z,a.z,s.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Al=class extends Gn{constructor(e=new Le,t=new Le){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Le){let i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Le){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Uf=class extends Gn{constructor(e=new z,t=new z){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new z){let i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new z){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},El=class extends Gn{constructor(e=new Le,t=new Le,i=new Le){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new Le){let i=t,r=this.v0,o=this.v1,a=this.v2;return i.set(da(e,r.x,o.x,a.x),da(e,r.y,o.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Nf=class extends Gn{constructor(e=new z,t=new z,i=new z){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new z){let i=t,r=this.v0,o=this.v1,a=this.v2;return i.set(da(e,r.x,o.x,a.x),da(e,r.y,o.y,a.y),da(e,r.z,o.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Tl=class extends Gn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Le){let i=t,r=this.points,o=(r.length-1)*e,a=Math.floor(o),s=o-a,l=r[a===0?a:a-1],u=r[a],c=r[a>r.length-2?r.length-1:a+1],f=r[a>r.length-3?r.length-1:a+2];return i.set(om(s,l.x,u.x,c.x,f.x),om(s,l.y,u.y,c.y,f.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(new Le().fromArray(r))}return this}},am=Object.freeze({__proto__:null,ArcCurve:If,CatmullRomCurve3:Lf,CubicBezierCurve:wl,CubicBezierCurve3:Df,EllipseCurve:Ma,LineCurve:Al,LineCurve3:Uf,QuadraticBezierCurve:El,QuadraticBezierCurve3:Nf,SplineCurve:Tl}),Ff=class extends Gn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new am[i](t,e))}return this}getPoint(e,t){let i=e*this.getLength(),r=this.getCurveLengths(),o=0;for(;o<r.length;){if(r[o]>=i){let a=r[o]-i,s=this.curves[o],l=s.getLength(),u=l===0?0:1-a/l;return s.getPointAt(u,t)}o++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let i=0,r=this.curves.length;i<r;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],i;for(let r=0,o=this.curves;r<o.length;r++){let a=o[r],s=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(s);for(let u=0;u<l.length;u++){let c=l[u];i&&i.equals(c)||(t.push(c),i=c)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){let r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){let r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){let r=e.curves[t];this.curves.push(new am[r.type]().fromJSON(r))}return this}},Cl=class extends Ff{constructor(e){super(),this.type="Path",this.currentPoint=new Le,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let i=new Al(this.currentPoint.clone(),new Le(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,r){let o=new El(this.currentPoint.clone(),new Le(e,t),new Le(i,r));return this.curves.push(o),this.currentPoint.set(i,r),this}bezierCurveTo(e,t,i,r,o,a){let s=new wl(this.currentPoint.clone(),new Le(e,t),new Le(i,r),new Le(o,a));return this.curves.push(s),this.currentPoint.set(o,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),i=new Tl(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,r,o,a){let s=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+s,t+l,i,r,o,a),this}absarc(e,t,i,r,o,a){return this.absellipse(e,t,i,i,r,o,a),this}ellipse(e,t,i,r,o,a,s,l){let u=this.currentPoint.x,c=this.currentPoint.y;return this.absellipse(e+u,t+c,i,r,o,a,s,l),this}absellipse(e,t,i,r,o,a,s,l){let u=new Ma(e,t,i,r,o,a,s,l);if(this.curves.length>0){let f=u.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(u);let c=u.getPoint(1);return this.currentPoint.copy(c),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}};var Sa=class extends Cl{constructor(e){super(e),this.uuid=yi(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let i=0,r=this.holes.length;i<r;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){let r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){let r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){let r=e.holes[t];this.holes.push(new Cl().fromJSON(r))}return this}},uS={triangulate:function(n,e,t=2){let i=e&&e.length,r=i?e[0]*t:n.length,o=Om(n,0,r,t,!0),a=[];if(!o||o.next===o.prev)return a;let s,l,u,c,f,d,h;if(i&&(o=mS(n,e,o,t)),n.length>80*t){s=u=n[0],l=c=n[1];for(let m=t;m<r;m+=t)f=n[m],d=n[m+1],f<s&&(s=f),d<l&&(l=d),f>u&&(u=f),d>c&&(c=d);h=Math.max(u-s,c-l),h=h!==0?32767/h:0}return ba(o,a,t,s,l,h,0),a}};function Om(n,e,t,i,r){let o,a;if(r===ES(n,e,t,i)>0)for(o=e;o<t;o+=i)a=sm(o,n[o],n[o+1],a);else for(o=t-i;o>=e;o-=i)a=sm(o,n[o],n[o+1],a);return a&&Ol(a,a.next)&&(Aa(a),a=a.next),a}function Nr(n,e){if(!n)return n;e||(e=n);let t=n,i;do if(i=!1,!t.steiner&&(Ol(t,t.next)||Nt(t.prev,t,t.next)===0)){if(Aa(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function ba(n,e,t,i,r,o,a){if(!n)return;!a&&o&&_S(n,i,r,o);let s=n,l,u;for(;n.prev!==n.next;){if(l=n.prev,u=n.next,o?dS(n,i,r,o):fS(n)){e.push(l.i/t|0),e.push(n.i/t|0),e.push(u.i/t|0),Aa(n),n=u.next,s=u.next;continue}if(n=u,n===s){a?a===1?(n=hS(Nr(n),e,t),ba(n,e,t,i,r,o,2)):a===2&&pS(n,e,t,i,r,o):ba(Nr(n),e,t,i,r,o,1);break}}}function fS(n){let e=n.prev,t=n,i=n.next;if(Nt(e,t,i)>=0)return!1;let r=e.x,o=t.x,a=i.x,s=e.y,l=t.y,u=i.y,c=r<o?r<a?r:a:o<a?o:a,f=s<l?s<u?s:u:l<u?l:u,d=r>o?r>a?r:a:o>a?o:a,h=s>l?s>u?s:u:l>u?l:u,m=i.next;for(;m!==e;){if(m.x>=c&&m.x<=d&&m.y>=f&&m.y<=h&&uo(r,s,o,l,a,u,m.x,m.y)&&Nt(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function dS(n,e,t,i){let r=n.prev,o=n,a=n.next;if(Nt(r,o,a)>=0)return!1;let s=r.x,l=o.x,u=a.x,c=r.y,f=o.y,d=a.y,h=s<l?s<u?s:u:l<u?l:u,m=c<f?c<d?c:d:f<d?f:d,x=s>l?s>u?s:u:l>u?l:u,g=c>f?c>d?c:d:f>d?f:d,p=Of(h,m,e,t,i),_=Of(x,g,e,t,i),y=n.prevZ,v=n.nextZ;for(;y&&y.z>=p&&v&&v.z<=_;){if(y.x>=h&&y.x<=x&&y.y>=m&&y.y<=g&&y!==r&&y!==a&&uo(s,c,l,f,u,d,y.x,y.y)&&Nt(y.prev,y,y.next)>=0||(y=y.prevZ,v.x>=h&&v.x<=x&&v.y>=m&&v.y<=g&&v!==r&&v!==a&&uo(s,c,l,f,u,d,v.x,v.y)&&Nt(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;y&&y.z>=p;){if(y.x>=h&&y.x<=x&&y.y>=m&&y.y<=g&&y!==r&&y!==a&&uo(s,c,l,f,u,d,y.x,y.y)&&Nt(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;v&&v.z<=_;){if(v.x>=h&&v.x<=x&&v.y>=m&&v.y<=g&&v!==r&&v!==a&&uo(s,c,l,f,u,d,v.x,v.y)&&Nt(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function hS(n,e,t){let i=n;do{let r=i.prev,o=i.next.next;!Ol(r,o)&&Bm(r,i,i.next,o)&&wa(r,o)&&wa(o,r)&&(e.push(r.i/t|0),e.push(i.i/t|0),e.push(o.i/t|0),Aa(i),Aa(i.next),i=n=o),i=i.next}while(i!==n);return Nr(i)}function pS(n,e,t,i,r,o){let a=n;do{let s=a.next.next;for(;s!==a.prev;){if(a.i!==s.i&&bS(a,s)){let l=km(a,s);a=Nr(a,a.next),l=Nr(l,l.next),ba(a,e,t,i,r,o,0),ba(l,e,t,i,r,o,0);return}s=s.next}a=a.next}while(a!==n)}function mS(n,e,t,i){let r=[],o,a,s,l,u;for(o=0,a=e.length;o<a;o++)s=e[o]*i,l=o<a-1?e[o+1]*i:n.length,u=Om(n,s,l,i,!1),u===u.next&&(u.steiner=!0),r.push(SS(u));for(r.sort(gS),o=0;o<r.length;o++)t=xS(r[o],t);return t}function gS(n,e){return n.x-e.x}function xS(n,e){let t=vS(n,e);if(!t)return e;let i=km(t,n);return Nr(i,i.next),Nr(t,t.next)}function vS(n,e){let t=e,i=-1/0,r,o=n.x,a=n.y;do{if(a<=t.y&&a>=t.next.y&&t.next.y!==t.y){let d=t.x+(a-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=o&&d>i&&(i=d,r=t.x<t.next.x?t:t.next,d===o))return r}t=t.next}while(t!==e);if(!r)return null;let s=r,l=r.x,u=r.y,c=1/0,f;t=r;do o>=t.x&&t.x>=l&&o!==t.x&&uo(a<u?o:i,a,l,u,a<u?i:o,a,t.x,t.y)&&(f=Math.abs(a-t.y)/(o-t.x),wa(t,n)&&(f<c||f===c&&(t.x>r.x||t.x===r.x&&yS(r,t)))&&(r=t,c=f)),t=t.next;while(t!==s);return r}function yS(n,e){return Nt(n.prev,n,e.prev)<0&&Nt(e.next,n,n.next)<0}function _S(n,e,t,i){let r=n;do r.z===0&&(r.z=Of(r.x,r.y,e,t,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==n);r.prevZ.nextZ=null,r.prevZ=null,MS(r)}function MS(n){let e,t,i,r,o,a,s,l,u=1;do{for(t=n,n=null,o=null,a=0;t;){for(a++,i=t,s=0,e=0;e<u&&(s++,i=i.nextZ,!!i);e++);for(l=u;s>0||l>0&&i;)s!==0&&(l===0||!i||t.z<=i.z)?(r=t,t=t.nextZ,s--):(r=i,i=i.nextZ,l--),o?o.nextZ=r:n=r,r.prevZ=o,o=r;t=i}o.nextZ=null,u*=2}while(a>1);return n}function Of(n,e,t,i,r){return n=(n-t)*r|0,e=(e-i)*r|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,n|e<<1}function SS(n){let e=n,t=n;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==n);return t}function uo(n,e,t,i,r,o,a,s){return(r-a)*(e-s)>=(n-a)*(o-s)&&(n-a)*(i-s)>=(t-a)*(e-s)&&(t-a)*(o-s)>=(r-a)*(i-s)}function bS(n,e){return n.next.i!==e.i&&n.prev.i!==e.i&&!wS(n,e)&&(wa(n,e)&&wa(e,n)&&AS(n,e)&&(Nt(n.prev,n,e.prev)||Nt(n,e.prev,e))||Ol(n,e)&&Nt(n.prev,n,n.next)>0&&Nt(e.prev,e,e.next)>0)}function Nt(n,e,t){return(e.y-n.y)*(t.x-e.x)-(e.x-n.x)*(t.y-e.y)}function Ol(n,e){return n.x===e.x&&n.y===e.y}function Bm(n,e,t,i){let r=Js(Nt(n,e,t)),o=Js(Nt(n,e,i)),a=Js(Nt(t,i,n)),s=Js(Nt(t,i,e));return!!(r!==o&&a!==s||r===0&&$s(n,t,e)||o===0&&$s(n,i,e)||a===0&&$s(t,n,i)||s===0&&$s(t,e,i))}function $s(n,e,t){return e.x<=Math.max(n.x,t.x)&&e.x>=Math.min(n.x,t.x)&&e.y<=Math.max(n.y,t.y)&&e.y>=Math.min(n.y,t.y)}function Js(n){return n>0?1:n<0?-1:0}function wS(n,e){let t=n;do{if(t.i!==n.i&&t.next.i!==n.i&&t.i!==e.i&&t.next.i!==e.i&&Bm(t,t.next,n,e))return!0;t=t.next}while(t!==n);return!1}function wa(n,e){return Nt(n.prev,n,n.next)<0?Nt(n,e,n.next)>=0&&Nt(n,n.prev,e)>=0:Nt(n,e,n.prev)<0||Nt(n,n.next,e)<0}function AS(n,e){let t=n,i=!1,r=(n.x+e.x)/2,o=(n.y+e.y)/2;do t.y>o!=t.next.y>o&&t.next.y!==t.y&&r<(t.next.x-t.x)*(o-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==n);return i}function km(n,e){let t=new Bf(n.i,n.x,n.y),i=new Bf(e.i,e.x,e.y),r=n.next,o=e.prev;return n.next=e,e.prev=n,t.next=r,r.prev=t,i.next=t,t.prev=i,o.next=i,i.prev=o,i}function sm(n,e,t,i){let r=new Bf(n,e,t);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function Aa(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function Bf(n,e,t){this.i=n,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function ES(n,e,t,i){let r=0;for(let o=e,a=t-i;o<t;o+=i)r+=(n[a]-n[o])*(n[o+1]+n[a+1]),a=o;return r}var pa=class n{static area(e){let t=e.length,i=0;for(let r=t-1,o=0;o<t;r=o++)i+=e[r].x*e[o].y-e[o].x*e[r].y;return i*.5}static isClockWise(e){return n.area(e)<0}static triangulateShape(e,t){let i=[],r=[],o=[];lm(e),cm(i,e);let a=e.length;t.forEach(lm);for(let l=0;l<t.length;l++)r.push(a),a+=t[l].length,cm(i,t[l]);let s=uS.triangulate(i,r);for(let l=0;l<s.length;l+=3)o.push(s.slice(l,l+3));return o}};function lm(n){let e=n.length;e>2&&n[e-1].equals(n[0])&&n.pop()}function cm(n,e){for(let t=0;t<e.length;t++)n.push(e[t].x),n.push(e[t].y)}var Rl=class n extends Vt{constructor(e=new Sa([new Le(0,.5),new Le(-.5,-.5),new Le(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let i=[],r=[],o=[],a=[],s=0,l=0;if(Array.isArray(e)===!1)u(e);else for(let c=0;c<e.length;c++)u(e[c]),this.addGroup(s,l,c),s+=l,l=0;this.setIndex(i),this.setAttribute("position",new Tt(r,3)),this.setAttribute("normal",new Tt(o,3)),this.setAttribute("uv",new Tt(a,2));function u(c){let f=r.length/3,d=c.extractPoints(t),h=d.shape,m=d.holes;pa.isClockWise(h)===!1&&(h=h.reverse());for(let g=0,p=m.length;g<p;g++){let _=m[g];pa.isClockWise(_)===!0&&(m[g]=_.reverse())}let x=pa.triangulateShape(h,m);for(let g=0,p=m.length;g<p;g++){let _=m[g];h=h.concat(_)}for(let g=0,p=h.length;g<p;g++){let _=h[g];r.push(_.x,_.y,0),o.push(0,0,1),a.push(_.x,_.y)}for(let g=0,p=x.length;g<p;g++){let _=x[g],y=_[0]+f,v=_[1]+f,R=_[2]+f;i.push(y,v,R),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return TS(t,e)}static fromJSON(e,t){let i=[];for(let r=0,o=e.shapes.length;r<o;r++){let a=t[e.shapes[r]];i.push(a)}return new n(i,e.curveSegments)}};function TS(n,e){if(e.shapes=[],Array.isArray(n))for(let t=0,i=n.length;t<i;t++){let r=n[t];e.shapes.push(r.uuid)}else e.shapes.push(n.uuid);return e}var Wn=class n extends Vt{constructor(e=1,t=32,i=16,r=0,o=Math.PI*2,a=0,s=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:o,thetaStart:a,thetaLength:s},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));let l=Math.min(a+s,Math.PI),u=0,c=[],f=new z,d=new z,h=[],m=[],x=[],g=[];for(let p=0;p<=i;p++){let _=[],y=p/i,v=0;p===0&&a===0?v=.5/t:p===i&&l===Math.PI&&(v=-.5/t);for(let R=0;R<=t;R++){let E=R/t;f.x=-e*Math.cos(r+E*o)*Math.sin(a+y*s),f.y=e*Math.cos(a+y*s),f.z=e*Math.sin(r+E*o)*Math.sin(a+y*s),m.push(f.x,f.y,f.z),d.copy(f).normalize(),x.push(d.x,d.y,d.z),g.push(E+v,1-y),_.push(u++)}c.push(_)}for(let p=0;p<i;p++)for(let _=0;_<t;_++){let y=c[p][_+1],v=c[p][_],R=c[p+1][_],E=c[p+1][_+1];(p!==0||a>0)&&h.push(y,v,E),(p!==i-1||l<Math.PI)&&h.push(v,R,E)}this.setIndex(h),this.setAttribute("position",new Tt(m,3)),this.setAttribute("normal",new Tt(x,3)),this.setAttribute("uv",new Tt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Ea=class extends Mi{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new $e(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new $e(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Em,this.normalScale=new Le(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _i,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};function js(n,e,t){return!n||!t&&n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function CS(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}var bo=class{constructor(e,t,i,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,r=t[i],o=t[i-1];n:{e:{let a;t:{i:if(!(e<r)){for(let s=i+2;;){if(r===void 0){if(e<o)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===s)break;if(o=r,r=t[++i],e<r)break e}a=t.length;break t}if(!(e>=o)){let s=t[1];e<s&&(i=2,o=s);for(let l=i-2;;){if(o===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(r=o,o=t[--i-1],e>=o)break e}a=i,i=0;break t}break n}for(;i<a;){let s=i+a>>>1;e<t[s]?a=s:i=s+1}if(r=t[i],o=t[i-1],o===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,o,r)}return this.interpolate_(i,o,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,r=this.valueSize,o=e*r;for(let a=0;a!==r;++a)t[a]=i[o+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},kf=class extends bo{constructor(e,t,i,r){super(e,t,i,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ip,endingEnd:ip}}intervalChanged_(e,t,i){let r=this.parameterPositions,o=e-2,a=e+1,s=r[o],l=r[a];if(s===void 0)switch(this.getSettings_().endingStart){case rp:o=e,s=2*t-i;break;case op:o=r.length-2,s=t+r[o]-r[o+1];break;default:o=e,s=i}if(l===void 0)switch(this.getSettings_().endingEnd){case rp:a=e,l=2*i-t;break;case op:a=1,l=i+r[1]-r[0];break;default:a=e-1,l=t}let u=(i-t)*.5,c=this.valueSize;this._weightPrev=u/(t-s),this._weightNext=u/(l-i),this._offsetPrev=o*c,this._offsetNext=a*c}interpolate_(e,t,i,r){let o=this.resultBuffer,a=this.sampleValues,s=this.valueSize,l=e*s,u=l-s,c=this._offsetPrev,f=this._offsetNext,d=this._weightPrev,h=this._weightNext,m=(i-t)/(r-t),x=m*m,g=x*m,p=-d*g+2*d*x-d*m,_=(1+d)*g+(-1.5-2*d)*x+(-.5+d)*m+1,y=(-1-h)*g+(1.5+h)*x+.5*m,v=h*g-h*x;for(let R=0;R!==s;++R)o[R]=p*a[c+R]+_*a[u+R]+y*a[l+R]+v*a[f+R];return o}},zf=class extends bo{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let o=this.resultBuffer,a=this.sampleValues,s=this.valueSize,l=e*s,u=l-s,c=(i-t)/(r-t),f=1-c;for(let d=0;d!==s;++d)o[d]=a[u+d]*f+a[l+d]*c;return o}},Hf=class extends bo{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e){return this.copySampleValue_(e-1)}},si=class{constructor(e,t,i,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=js(t,this.TimeBufferType),this.values=js(i,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:js(e.times,Array),values:js(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(i.interpolation=r)}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new Hf(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new zf(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new kf(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case ol:t=this.InterpolantFactoryMethodDiscrete;break;case ff:t=this.InterpolantFactoryMethodLinear;break;case Xc:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ol;case this.InterpolantFactoryMethodLinear:return ff;case this.InterpolantFactoryMethodSmooth:return Xc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]*=e}return this}trim(e,t){let i=this.times,r=i.length,o=0,a=r-1;for(;o!==r&&i[o]<e;)++o;for(;a!==-1&&i[a]>t;)--a;if(++a,o!==0||a!==r){o>=a&&(a=Math.max(a,1),o=a-1);let s=this.getValueSize();this.times=i.slice(o,a),this.values=this.values.slice(o*s,a*s)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,r=this.values,o=i.length;o===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let s=0;s!==o;s++){let l=i[s];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,s,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,s,l,a),e=!1;break}a=l}if(r!==void 0&&CS(r))for(let s=0,l=r.length;s!==l;++s){let u=r[s];if(isNaN(u)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,s,u),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),r=this.getInterpolation()===Xc,o=e.length-1,a=1;for(let s=1;s<o;++s){let l=!1,u=e[s],c=e[s+1];if(u!==c&&(s!==1||u!==e[0]))if(r)l=!0;else{let f=s*i,d=f-i,h=f+i;for(let m=0;m!==i;++m){let x=t[f+m];if(x!==t[d+m]||x!==t[h+m]){l=!0;break}}}if(l){if(s!==a){e[a]=e[s];let f=s*i,d=a*i;for(let h=0;h!==i;++h)t[d+h]=t[f+h]}++a}}if(o>0){e[a]=e[o];for(let s=o*i,l=a*i,u=0;u!==i;++u)t[l+u]=t[s+u];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,r=new i(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};si.prototype.TimeBufferType=Float32Array;si.prototype.ValueBufferType=Float32Array;si.prototype.DefaultInterpolation=ff;var Fr=class extends si{constructor(e,t,i){super(e,t,i)}};Fr.prototype.ValueTypeName="bool";Fr.prototype.ValueBufferType=Array;Fr.prototype.DefaultInterpolation=ol;Fr.prototype.InterpolantFactoryMethodLinear=void 0;Fr.prototype.InterpolantFactoryMethodSmooth=void 0;var Vf=class extends si{};Vf.prototype.ValueTypeName="color";var Gf=class extends si{};Gf.prototype.ValueTypeName="number";var Wf=class extends bo{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let o=this.resultBuffer,a=this.sampleValues,s=this.valueSize,l=(i-t)/(r-t),u=e*s;for(let c=u+s;u!==c;u+=4)oi.slerpFlat(o,0,a,u-s,a,u,l);return o}},Pl=class extends si{InterpolantFactoryMethodLinear(e){return new Wf(this.times,this.values,this.getValueSize(),e)}};Pl.prototype.ValueTypeName="quaternion";Pl.prototype.InterpolantFactoryMethodSmooth=void 0;var Or=class extends si{constructor(e,t,i){super(e,t,i)}};Or.prototype.ValueTypeName="string";Or.prototype.ValueBufferType=Array;Or.prototype.DefaultInterpolation=ol;Or.prototype.InterpolantFactoryMethodLinear=void 0;Or.prototype.InterpolantFactoryMethodSmooth=void 0;var qf=class extends si{};qf.prototype.ValueTypeName="vector";var um={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(this.files[n]=e)},get:function(n){if(this.enabled!==!1)return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}},Xf=class{constructor(e,t,i){let r=this,o=!1,a=0,s=0,l,u=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this.itemStart=function(c){s++,o===!1&&r.onStart!==void 0&&r.onStart(c,a,s),o=!0},this.itemEnd=function(c){a++,r.onProgress!==void 0&&r.onProgress(c,a,s),a===s&&(o=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(c){r.onError!==void 0&&r.onError(c)},this.resolveURL=function(c){return l?l(c):c},this.setURLModifier=function(c){return l=c,this},this.addHandler=function(c,f){return u.push(c,f),this},this.removeHandler=function(c){let f=u.indexOf(c);return f!==-1&&u.splice(f,2),this},this.getHandler=function(c){for(let f=0,d=u.length;f<d;f+=2){let h=u[f],m=u[f+1];if(h.global&&(h.lastIndex=0),h.test(c))return m}return null}}},RS=new Xf,Ta=class{constructor(e){this.manager=e!==void 0?e:RS,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let i=this;return new Promise(function(r,o){i.load(e,r,t,o)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};Ta.DEFAULT_MATERIAL_NAME="__DEFAULT";var Yf=class extends Ta{constructor(e){super(e)}load(e,t,i,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let o=this,a=um.get(e);if(a!==void 0)return o.manager.itemStart(e),setTimeout(function(){t&&t(a),o.manager.itemEnd(e)},0),a;let s=xa("img");function l(){c(),um.add(e,this),t&&t(this),o.manager.itemEnd(e)}function u(f){c(),r&&r(f),o.manager.itemError(e),o.manager.itemEnd(e)}function c(){s.removeEventListener("load",l,!1),s.removeEventListener("error",u,!1)}return s.addEventListener("load",l,!1),s.addEventListener("error",u,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(s.crossOrigin=this.crossOrigin),o.manager.itemStart(e),s.src=e,s}};var sr=class extends Ta{constructor(e){super(e)}load(e,t,i,r){let o=new En,a=new Yf(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(s){o.image=s,o.needsUpdate=!0,t!==void 0&&t(o)},i,r),o}},Ca=class extends en{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new $e(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},Il=class extends Ca{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(en.DEFAULT_UP),this.updateMatrix(),this.groundColor=new $e(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},wu=new wt,fm=new z,dm=new z,Zf=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Le(512,512),this.map=null,this.mapPass=null,this.matrix=new wt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Dr,this._frameExtents=new Le(1,1),this._viewportCount=1,this._viewports=[new Ht(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,i=this.matrix;fm.setFromMatrixPosition(e.matrixWorld),t.position.copy(fm),dm.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(dm),t.updateMatrixWorld(),wu.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(wu),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(wu)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}};var Kf=class extends Zf{constructor(){super(new ml(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ll=class extends Ca{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(en.DEFAULT_UP),this.updateMatrix(),this.target=new en,this.shadow=new Kf}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},Dl=class extends Ca{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}};var ld="\\[\\]\\.:\\/",PS=new RegExp("["+ld+"]","g"),cd="[^"+ld+"]",IS="[^"+ld.replace("\\.","")+"]",LS=/((?:WC+[\/:])*)/.source.replace("WC",cd),DS=/(WCOD+)?/.source.replace("WCOD",IS),US=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",cd),NS=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",cd),FS=new RegExp("^"+LS+DS+US+NS+"$"),OS=["material","materials","bones","map"],$f=class{constructor(e,t,i){let r=i||Ut.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,r=this._bindings[i];r!==void 0&&r.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let r=this._targetGroup.nCachedObjects_,o=i.length;r!==o;++r)i[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},Ut=class n{constructor(e,t,i){this.path=t,this.parsedPath=i||n.parseTrackName(t),this.node=n.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new n.Composite(e,t,i):new n(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(PS,"")}static parseTrackName(e){let t=FS.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=i.nodeName&&i.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let o=i.nodeName.substring(r+1);OS.indexOf(o)!==-1&&(i.nodeName=i.nodeName.substring(0,r),i.objectName=o)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){let i=function(o){for(let a=0;a<o.length;a++){let s=o[a];if(s.name===t||s.uuid===t)return s;let l=i(s.children);if(l)return l}return null},r=i(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let i=this.resolvedProperty;for(let r=0,o=i.length;r!==o;++r)e[t++]=i[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let i=this.resolvedProperty;for(let r=0,o=i.length;r!==o;++r)i[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let i=this.resolvedProperty;for(let r=0,o=i.length;r!==o;++r)i[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let i=this.resolvedProperty;for(let r=0,o=i.length;r!==o;++r)i[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,i=t.objectName,r=t.propertyName,o=t.propertyIndex;if(e||(e=n.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let u=t.objectIndex;switch(i){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let c=0;c<e.length;c++)if(e[c].name===u){u=c;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(u!==void 0){if(e[u]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[u]}}let a=e[r];if(a===void 0){let u=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+u+"."+r+" but it wasn't found.",e);return}let s=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?s=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(o!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[o]!==void 0&&(o=e.morphTargetDictionary[o])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=o}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=r;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ut.Composite=$f;Ut.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ut.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ut.prototype.GetterByBindingType=[Ut.prototype._getValue_direct,Ut.prototype._getValue_array,Ut.prototype._getValue_arrayElement,Ut.prototype._getValue_toArray];Ut.prototype.SetterByBindingTypeAndVersioning=[[Ut.prototype._setValue_direct,Ut.prototype._setValue_direct_setNeedsUpdate,Ut.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ut.prototype._setValue_array,Ut.prototype._setValue_array_setNeedsUpdate,Ut.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ut.prototype._setValue_arrayElement,Ut.prototype._setValue_arrayElement_setNeedsUpdate,Ut.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ut.prototype._setValue_fromArray,Ut.prototype._setValue_fromArray_setNeedsUpdate,Ut.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var xA=new Float32Array(1);typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"170"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="170");function zm(n,e,t,i){let r=new _n;n.add(r);let o=new Ft(new Wn(i-.028,96,48),new Vn({color:66051}));r.add(o);let a=[],s=[],l=new $e;for(let g=-86;g<=86;g+=1.25){let p=1.25/Math.max(.12,Math.cos(g*Math.PI/180));for(let _=-180;_<180;_+=p){let y=t(_,g),v=Math.sin(g*91.7+_*23.9)*.5+.5;l.set(y?"#89b841":"#426eaa"),l.multiplyScalar(.82+v*.3),!y&&Math.floor((_+180)/p)%19===0&&l.set("#702b3a");let R=e(g,_,i+.007);a.push(R.x,R.y,R.z),s.push(l.r,l.g,l.b)}}let u=new Si(new Vt().setAttribute("position",new Tt(a,3)).setAttribute("color",new Tt(s,3)),new ai({vertexColors:!0,size:.064,transparent:!0,opacity:1,depthWrite:!1,toneMapped:!1}));r.add(u);let c=null;function f(g,p,_,y,v){c&&(r.remove(c),c.geometry.dispose(),c.material.dispose());let R=[],E=[],P=new $e;for(let L=0;L<y;L+=6)for(let b=0;b<_;b+=6){let S=L*_+b;if(g[S*4+3]/255<.28)continue;let O=b/_*360-180,F=90-L/y*180;if(t(O,F))continue;let H=p[S],U=e(F,O,i+.018+H*.11*v);R.push(U.x,U.y,U.z),P.set("#dce6d5").multiplyScalar(.6+H*.7),E.push(P.r,P.g,P.b)}c=new Si(new Vt().setAttribute("position",new Tt(R,3)).setAttribute("color",new Tt(E,3)),new ai({vertexColors:!0,size:.064,transparent:!0,opacity:1,depthWrite:!1,toneMapped:!1})),c.name="SKM ocean dot logo",r.add(c)}let d=[],h=[];for(let g=0;g<1500;g++){let p=g*2.39996323,_=1-2*(g+.5)/1500,y=Math.sqrt(1-_*_),v=i*(1.055+.1*(Math.sin(g*18.71)*.5+.5));d.push(Math.cos(p)*y*v,_*v,Math.sin(p)*y*v),l.set(["#8faaa0","#d49b62","#506f9d","#b8c6cf"][g%4]),h.push(l.r,l.g,l.b)}let m=new Si(new Vt().setAttribute("position",new Tt(d,3)).setAttribute("color",new Tt(h,3)),new ai({vertexColors:!0,size:.037,transparent:!0,opacity:.65,depthWrite:!1,toneMapped:!1}));r.add(m);let x=[];for(let[g,p,_]of[[.52,.65,"#b1c7bc"],[-.91,.3,"#536c91"],[1.12,-.8,"#762c37"]]){let y=[];for(let R=0;R<=200;R++){let E=R/200*Math.PI*2;y.push(new z(Math.cos(E)*i*1.055,Math.sin(E)*i*1.055,0))}let v=new So(new Vt().setFromPoints(y),new Ur({color:_,transparent:!0,opacity:.48,depthWrite:!1}));v.rotation.set(g,p,.25),x.push(v),r.add(v)}return{setLogo:f,logoCount:()=>c?.geometry.attributes.position.count||0,update(g,p){r.visible=g<.995;let _=1-g;u.material.opacity=_,c&&(c.material.opacity=_),m.material.opacity=_*.65,m.rotation.y=p*.003,x.forEach(y=>y.material.opacity=_*.48),o.visible=g<.5}}}var Hm="app/earth-assets/",Eo=Math.PI/180;function BS(n){let e=n.getTime()/864e5-10957.5,t=(134.963+13.064993*e)*Eo,i=(93.272+13.22935*e)*Eo,r=(218.316+13.176396*e+6.289*Math.sin(t))*Eo,o=5.128*Eo*Math.sin(i),a=23.4393*Eo,s=Math.cos(r)*Math.cos(o),l=Math.sin(r)*Math.cos(o)*Math.cos(a)-Math.sin(o)*Math.sin(a),u=Math.sin(r)*Math.cos(o)*Math.sin(a)+Math.sin(o)*Math.cos(a),c=(280.46061837+360.98564736629*e)*Eo;return new z(s*Math.cos(c)+l*Math.sin(c),u,s*Math.sin(c)-l*Math.cos(c)).normalize()}function Vm(n,e,t,i,r=!0){let o=new sr,a=new _n;n.add(a);let s=document.createElement("canvas");s.width=s.height=128;let l=s.getContext("2d"),u=l.createRadialGradient(64,64,0,64,64,64);for(let[k,J]of[[0,"#ffffff"],[.22,"#fffef4"],[.24,"#fff2ce"],[.27,"#ffdb9355"],[.52,"#ffc67018"],[1,"#ffbd7000"]])u.addColorStop(k,J);l.fillStyle=u,l.fillRect(0,0,128,128);let c=new ar(s);c.colorSpace=zt;let f=new Ml(new _a({map:c,depthWrite:!1,toneMapped:!1}));f.scale.setScalar(2.8),a.add(f);let d=new Tn({uniforms:{surface:{value:null},sunDirection:{value:new z}},vertexShader:`varying vec2 lunarUV;varying vec3 lunarNormal;
      void main(){lunarUV=uv;lunarNormal=mat3(modelMatrix)*normal;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,fragmentShader:`uniform sampler2D surface;uniform vec3 sunDirection;varying vec2 lunarUV;varying vec3 lunarNormal;
      void main(){float illumination=max(0.,dot(normalize(lunarNormal),sunDirection));
      vec3 rock=texture2D(surface,lunarUV).rgb;
      gl_FragColor=vec4(rock*(0.16+2.5*illumination),1.0);
      #include <colorspace_fragment>
      }`}),h=new Ft(new Wn(.55,32,20),d);h.visible=!1,a.add(h),o.load(Hm+"moon.jpg",k=>{k.colorSpace=zt,d.uniforms.surface.value=k,h.visible=!0,i()});let m=[],x=8,g=4,p=1024,_=2,y=p+_*2;for(let k=0;r&&k<g;k++)for(let J=0;J<x;J++){let $=new Wn(70,12,10,J*2*Math.PI/x,2*Math.PI/x,k*Math.PI/g,Math.PI/g),re=$.attributes.uv;for(let q=0;q<=10;q++)for(let W=0;W<=12;W++)re.setXY(q*13+W,(_+p*W/12)/y,(_+p*(1-q/10))/y);$.computeBoundingSphere();let le=new Ft($,new Vn({side:Qt,toneMapped:!1,depthTest:!1,depthWrite:!1}));le.renderOrder=-99,le.visible=!1,e.add(le),m.push({mesh:le,row:k,col:J,direction:$.boundingSphere.center.clone().normalize(),loading:!1,failed:!1})}let v=new z,R=new oi,E=new oi,P=new Dr,L=new wt,b=new z,S=new z,T=new z,O=[],F=0,H="",U=!0;function N(){for(let k of O){if(F>=2)break;k.mesh.material.map||k.loading||k.failed||(k.loading=!0,F++,o.load(Hm+"sky/"+k.row+"-"+k.col+".jpg",J=>{k.loading=!1,F--,O.includes(k)?(J.colorSpace=zt,k.mesh.material.map=J,k.mesh.material.needsUpdate=!0,k.mesh.visible=!0):J.dispose(),t.dataset.skyDetail=String(O.filter($=>$.mesh.visible).length),N(),i()},void 0,()=>{k.failed=!0,k.loading=!1,F--,N()}))}}function te(k){if(e.position.copy(k.position),a.position.copy(k.position),!r)return;let J=k.projectionMatrix.elements,$=J[0]+"|"+J[5]+"|"+J[8]+"|"+J[9];if(!(!U&&R.angleTo(k.quaternion)<.012&&$===H)){U=!1,R.copy(k.quaternion),H=$,e.updateMatrixWorld(!0),P.setFromProjectionMatrix(L.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse)),E.copy(e.quaternion).invert(),k.getWorldDirection(v).applyQuaternion(E),O=m.filter(re=>P.intersectsObject(re.mesh)).sort((re,le)=>le.direction.dot(v)-re.direction.dot(v)).slice(0,10);for(let re of m)re.mesh.visible&&!O.includes(re)&&(re.mesh.visible=!1,re.mesh.material.map.dispose(),re.mesh.material.map=null,re.mesh.material.needsUpdate=!0);N()}}function D(k,J){let $=BS(k);h.position.copy($).multiplyScalar(54),f.position.copy(J).multiplyScalar(60),b.copy($).negate(),S.set(0,1,0).addScaledVector(b,-b.y).normalize(),T.crossVectors(b,S),h.quaternion.setFromRotationMatrix(L.makeBasis(b,S,T)),d.uniforms.sunDirection.value.copy(J)}return{view:te,date:D,direction(k){return(k==="sun"?f:h).position.clone().normalize()},screenPoint(k,J){return(k==="sun"?f:h).getWorldPosition(new z).project(J)}}}var Gm=[{id:"new-york-times-square",name:"New York \xB7 Times Square",publisher:"EarthCam",lat:40.758,lon:-73.9855,page:"https://www.earthcam.com/usa/newyork/timessquare/"}];var zS=[..._s,...Gm];function Wm(n,e,t,i){let r;function o(d,h){r?.close();let m=document.createElement("dialog"),x=document.createElement("header"),g=document.createElement("strong"),p=document.createElement("button");m.className="nature-window",m.setAttribute("aria-label",d),g.textContent=d,p.type="button",p.textContent=t("close"),p.onclick=()=>m.close(),x.append(g,p),m.append(x),h(m),document.body.append(m),m.addEventListener("close",()=>{m.remove(),r===m&&(r=null)},{once:!0}),r=m,m.showModal()}function a(d){if(d.page){o(d.name+" \xB7 "+d.publisher,h=>{let m=document.createElement("a");m.href=d.page,m.textContent=d.publisher+" \u2197",m.target="_blank",m.rel="noopener noreferrer",h.append(m)});return}if(location.protocol==="skm:"){location.href="skm-camera://"+d.id+"?close="+encodeURIComponent(t("close"));return}o(d.name+" \xB7 "+d.publisher,h=>{let m=document.createElement("iframe"),x=document.createElement("a");m.title=d.name,m.allow="autoplay; encrypted-media; fullscreen; picture-in-picture",m.referrerPolicy="strict-origin-when-cross-origin",m.src="https://www.youtube-nocookie.com/embed/"+d.video+"?playsinline=1&autoplay=1&mute=1",x.href="https://www.youtube.com/watch?v="+d.video,x.textContent="YouTube \u2197",x.target="_blank",x.rel="noopener noreferrer",h.append(m,x)})}function s(d){if(d.length===1){a(d[0]);return}o("YouTube \xB7 "+d.length,h=>{h.classList.add("nature-picker");for(let m of d){let x=document.createElement("button");x.type="button",x.textContent=m.name,x.onclick=()=>{h.close(),a(m)},h.append(x)}})}let l=zS.map(d=>({camera:d,point:e(d.lat,d.lon)})),u=[];function c(){let d=document.createElement("button");d.type="button",d.className="earth-camera-pin",n.append(d);let h={button:d,items:[],key:""};return d.onclick=()=>{i()&&s(h.items)},h}let f=function(d,h,m,x){let g=[];for(let{camera:_,point:y}of l){let v=d(y);if(!v)continue;let R=g.find(E=>Math.hypot(E.x-v.x,E.y-v.y)<46);R||(R={...v,items:[]},g.push(R)),R.items.push(_)}let p=h.map(({x:_,y})=>({x:_,y}));g.forEach((_,y)=>{let v=u[y]||(u[y]=c()),R=v.button,E=_.x,P=_.y,L=(T,O)=>T>=22&&T<=m-22&&O>=24&&O<=x-42&&p.every(F=>Math.hypot(F.x-T,F.y-O)>=43);if(!L(E,P)){let T=!1;for(let O of[40,58,80]){for(let F=0;F<8;F++){let H=Math.cos(F*Math.PI/4)*O,U=Math.sin(F*Math.PI/4)*O;if(L(_.x+H,_.y+U)){E=_.x+H,P=_.y+U,T=!0;break}}if(T)break}}let b=Math.hypot(E-_.x,P-_.y);p.push({x:E,y:P}),R.hidden=!1,R.style.left=E+"px",R.style.top=P+"px",R.style.setProperty("--leader",b>2?b+"px":"0px"),R.style.setProperty("--direction",Math.atan2(_.y-P,_.x-E)+"rad");let S=_.items.map(T=>T.id).join("|");v.key!==S&&(v.key=S,v.items=_.items,R.textContent=_.items.length>1?"\u25B7 "+_.items.length:"\u25B7",R.setAttribute("aria-label",_.items.length===1?_.items[0].name+" \xB7 "+(_.items[0].page?_.items[0].publisher:"YouTube"):"YouTube \xB7 "+_.items.length+" \xB7 "+_.items[0].name))});for(let _=g.length;_<u.length;_++)u[_].button.hidden=!0};return f.open=a,f}var qm={"Europe/Andorra":[42.5,1.517],"Asia/Dubai":[25.3,55.3],"Asia/Kabul":[34.517,69.2],"America/Antigua":[17.05,-61.8],"America/Anguilla":[18.2,-63.067],"Europe/Tirane":[41.333,19.833],"Asia/Yerevan":[40.183,44.5],"Africa/Luanda":[-8.8,13.233],"Antarctica/McMurdo":[-77.833,166.6],"Antarctica/Casey":[-66.283,110.517],"Antarctica/Davis":[-68.583,77.967],"Antarctica/DumontDUrville":[-66.667,140.017],"Antarctica/Mawson":[-67.6,62.883],"Antarctica/Palmer":[-64.8,-64.1],"Antarctica/Rothera":[-67.567,-68.133],"Antarctica/Syowa":[-69.006,39.59],"Antarctica/Troll":[-72.011,2.535],"Antarctica/Vostok":[-78.4,106.9],"America/Argentina/Buenos_Aires":[-34.6,-58.45],"America/Argentina/Cordoba":[-31.4,-64.183],"America/Argentina/Salta":[-24.783,-65.417],"America/Argentina/Jujuy":[-24.183,-65.3],"America/Argentina/Tucuman":[-26.817,-65.217],"America/Argentina/Catamarca":[-28.467,-65.783],"America/Argentina/La_Rioja":[-29.433,-66.85],"America/Argentina/San_Juan":[-31.533,-68.517],"America/Argentina/Mendoza":[-32.883,-68.817],"America/Argentina/San_Luis":[-33.317,-66.35],"America/Argentina/Rio_Gallegos":[-51.633,-69.217],"America/Argentina/Ushuaia":[-54.8,-68.3],"Pacific/Pago_Pago":[-14.267,-170.7],"Europe/Vienna":[48.217,16.333],"Australia/Lord_Howe":[-31.55,159.083],"Antarctica/Macquarie":[-54.5,158.95],"Australia/Hobart":[-42.883,147.317],"Australia/Melbourne":[-37.817,144.967],"Australia/Sydney":[-33.867,151.217],"Australia/Broken_Hill":[-31.95,141.45],"Australia/Brisbane":[-27.467,153.033],"Australia/Lindeman":[-20.267,149],"Australia/Adelaide":[-34.917,138.583],"Australia/Darwin":[-12.467,130.833],"Australia/Perth":[-31.95,115.85],"Australia/Eucla":[-31.717,128.867],"America/Aruba":[12.5,-69.967],"Europe/Mariehamn":[60.1,19.95],"Asia/Baku":[40.383,49.85],"Europe/Sarajevo":[43.867,18.417],"America/Barbados":[13.1,-59.617],"Asia/Dhaka":[23.717,90.417],"Europe/Brussels":[50.833,4.333],"Africa/Ouagadougou":[12.367,-1.517],"Europe/Sofia":[42.683,23.317],"Asia/Bahrain":[26.383,50.583],"Africa/Bujumbura":[-3.383,29.367],"Africa/Porto-Novo":[6.483,2.617],"America/St_Barthelemy":[17.883,-62.85],"Atlantic/Bermuda":[32.283,-64.767],"Asia/Brunei":[4.933,114.917],"America/La_Paz":[-16.5,-68.15],"America/Kralendijk":[12.151,-68.277],"America/Noronha":[-3.85,-32.417],"America/Belem":[-1.45,-48.483],"America/Fortaleza":[-3.717,-38.5],"America/Recife":[-8.05,-34.9],"America/Araguaina":[-7.2,-48.2],"America/Maceio":[-9.667,-35.717],"America/Bahia":[-12.983,-38.517],"America/Sao_Paulo":[-23.533,-46.617],"America/Campo_Grande":[-20.45,-54.617],"America/Cuiaba":[-15.583,-56.083],"America/Santarem":[-2.433,-54.867],"America/Porto_Velho":[-8.767,-63.9],"America/Boa_Vista":[2.817,-60.667],"America/Manaus":[-3.133,-60.017],"America/Eirunepe":[-6.667,-69.867],"America/Rio_Branco":[-9.967,-67.8],"America/Nassau":[25.083,-77.35],"Asia/Thimphu":[27.467,89.65],"Africa/Gaborone":[-24.65,25.917],"Europe/Minsk":[53.9,27.567],"America/Belize":[17.5,-88.2],"America/St_Johns":[47.567,-52.717],"America/Halifax":[44.65,-63.6],"America/Glace_Bay":[46.2,-59.95],"America/Moncton":[46.1,-64.783],"America/Goose_Bay":[53.333,-60.417],"America/Blanc-Sablon":[51.417,-57.117],"America/Toronto":[43.65,-79.383],"America/Iqaluit":[63.733,-68.467],"America/Atikokan":[48.759,-91.622],"America/Winnipeg":[49.883,-97.15],"America/Resolute":[74.696,-94.829],"America/Rankin_Inlet":[62.817,-92.083],"America/Regina":[50.4,-104.65],"America/Swift_Current":[50.283,-107.833],"America/Edmonton":[53.55,-113.467],"America/Cambridge_Bay":[69.114,-105.053],"America/Inuvik":[68.35,-133.717],"America/Vancouver":[49.267,-123.117],"America/Creston":[49.1,-116.517],"America/Dawson_Creek":[55.767,-120.233],"America/Fort_Nelson":[58.8,-122.7],"America/Whitehorse":[60.717,-135.05],"America/Dawson":[64.067,-139.417],"Indian/Cocos":[-12.167,96.917],"Africa/Kinshasa":[-4.3,15.3],"Africa/Lubumbashi":[-11.667,27.467],"Africa/Bangui":[4.367,18.583],"Africa/Brazzaville":[-4.267,15.283],"Europe/Zurich":[47.383,8.533],"Africa/Abidjan":[5.317,-4.033],"Pacific/Rarotonga":[-21.233,-159.767],"America/Santiago":[-33.45,-70.667],"America/Coyhaique":[-45.567,-72.067],"America/Punta_Arenas":[-53.15,-70.917],"Pacific/Easter":[-27.15,-109.433],"Africa/Douala":[4.05,9.7],"Asia/Shanghai":[31.233,121.467],"Asia/Urumqi":[43.8,87.583],"America/Bogota":[4.6,-74.083],"America/Costa_Rica":[9.933,-84.083],"America/Havana":[23.133,-82.367],"Atlantic/Cape_Verde":[14.917,-23.517],"America/Curacao":[12.183,-69],"Indian/Christmas":[-10.417,105.717],"Asia/Nicosia":[35.167,33.367],"Asia/Famagusta":[35.117,33.95],"Europe/Prague":[50.083,14.433],"Europe/Berlin":[52.5,13.367],"Europe/Busingen":[47.7,8.683],"Africa/Djibouti":[11.6,43.15],"Europe/Copenhagen":[55.667,12.583],"America/Dominica":[15.3,-61.4],"America/Santo_Domingo":[18.467,-69.9],"Africa/Algiers":[36.783,3.05],"America/Guayaquil":[-2.167,-79.833],"Pacific/Galapagos":[-.9,-89.6],"Europe/Tallinn":[59.417,24.75],"Africa/Cairo":[30.05,31.25],"Africa/El_Aaiun":[27.15,-13.2],"Africa/Asmara":[15.333,38.883],"Europe/Madrid":[40.4,-3.683],"Africa/Ceuta":[35.883,-5.317],"Atlantic/Canary":[28.1,-15.4],"Africa/Addis_Ababa":[9.033,38.7],"Europe/Helsinki":[60.167,24.967],"Pacific/Fiji":[-18.133,178.417],"Atlantic/Stanley":[-51.7,-57.85],"Pacific/Chuuk":[7.417,151.783],"Pacific/Pohnpei":[6.967,158.217],"Pacific/Kosrae":[5.317,162.983],"Atlantic/Faroe":[62.017,-6.767],"Europe/Paris":[48.867,2.333],"Africa/Libreville":[.383,9.45],"Europe/London":[51.508,-.125],"America/Grenada":[12.05,-61.75],"Asia/Tbilisi":[41.717,44.817],"America/Cayenne":[4.933,-52.333],"Europe/Guernsey":[49.455,-2.536],"Africa/Accra":[5.55,-.217],"Europe/Gibraltar":[36.133,-5.35],"America/Nuuk":[64.183,-51.733],"America/Danmarkshavn":[76.767,-18.667],"America/Scoresbysund":[70.483,-21.967],"America/Thule":[76.567,-68.783],"Africa/Banjul":[13.467,-16.65],"Africa/Conakry":[9.517,-13.717],"America/Guadeloupe":[16.233,-61.533],"Africa/Malabo":[3.75,8.783],"Europe/Athens":[37.967,23.717],"Atlantic/South_Georgia":[-54.267,-36.533],"America/Guatemala":[14.633,-90.517],"Pacific/Guam":[13.467,144.75],"Africa/Bissau":[11.85,-15.583],"America/Guyana":[6.8,-58.167],"Asia/Hong_Kong":[22.283,114.15],"America/Tegucigalpa":[14.1,-87.217],"Europe/Zagreb":[45.8,15.967],"America/Port-au-Prince":[18.533,-72.333],"Europe/Budapest":[47.5,19.083],"Asia/Jakarta":[-6.167,106.8],"Asia/Pontianak":[-.033,109.333],"Asia/Makassar":[-5.117,119.4],"Asia/Jayapura":[-2.533,140.7],"Europe/Dublin":[53.333,-6.25],"Asia/Jerusalem":[31.781,35.224],"Europe/Isle_of_Man":[54.15,-4.467],"Asia/Kolkata":[22.533,88.367],"Indian/Chagos":[-7.333,72.417],"Asia/Baghdad":[33.35,44.417],"Asia/Tehran":[35.667,51.433],"Atlantic/Reykjavik":[64.15,-21.85],"Europe/Rome":[41.9,12.483],"Europe/Jersey":[49.184,-2.107],"America/Jamaica":[17.968,-76.793],"Asia/Amman":[31.95,35.933],"Asia/Tokyo":[35.654,139.745],"Africa/Nairobi":[-1.283,36.817],"Asia/Bishkek":[42.9,74.6],"Asia/Phnom_Penh":[11.55,104.917],"Pacific/Tarawa":[1.417,173],"Pacific/Kanton":[-2.783,-171.717],"Pacific/Kiritimati":[1.867,-157.333],"Indian/Comoro":[-11.683,43.267],"America/St_Kitts":[17.3,-62.717],"Asia/Pyongyang":[39.017,125.75],"Asia/Seoul":[37.55,126.967],"Asia/Kuwait":[29.333,47.983],"America/Cayman":[19.3,-81.383],"Asia/Almaty":[43.25,76.95],"Asia/Qyzylorda":[44.8,65.467],"Asia/Qostanay":[53.2,63.617],"Asia/Aqtobe":[50.283,57.167],"Asia/Aqtau":[44.517,50.267],"Asia/Atyrau":[47.117,51.933],"Asia/Oral":[51.217,51.35],"Asia/Vientiane":[17.967,102.6],"Asia/Beirut":[33.883,35.5],"America/St_Lucia":[14.017,-61],"Europe/Vaduz":[47.15,9.517],"Asia/Colombo":[6.933,79.85],"Africa/Monrovia":[6.3,-10.783],"Africa/Maseru":[-29.467,27.5],"Europe/Vilnius":[54.683,25.317],"Europe/Luxembourg":[49.6,6.15],"Europe/Riga":[56.95,24.1],"Africa/Tripoli":[32.9,13.183],"Africa/Casablanca":[33.65,-7.583],"Europe/Monaco":[43.7,7.383],"Europe/Chisinau":[47,28.833],"Europe/Podgorica":[42.433,19.267],"America/Marigot":[18.067,-63.083],"Indian/Antananarivo":[-18.917,47.517],"Pacific/Majuro":[7.15,171.2],"Pacific/Kwajalein":[9.083,167.333],"Europe/Skopje":[41.983,21.433],"Africa/Bamako":[12.65,-8],"Asia/Yangon":[16.783,96.167],"Asia/Ulaanbaatar":[47.917,106.883],"Asia/Hovd":[48.017,91.65],"Asia/Macau":[22.197,113.542],"Pacific/Saipan":[15.2,145.75],"America/Martinique":[14.6,-61.083],"Africa/Nouakchott":[18.1,-15.95],"America/Montserrat":[16.717,-62.217],"Europe/Malta":[35.9,14.517],"Indian/Mauritius":[-20.167,57.5],"Indian/Maldives":[4.167,73.5],"Africa/Blantyre":[-15.783,35],"America/Mexico_City":[19.4,-99.15],"America/Cancun":[21.083,-86.767],"America/Merida":[20.967,-89.617],"America/Monterrey":[25.667,-100.317],"America/Matamoros":[25.833,-97.5],"America/Chihuahua":[28.633,-106.083],"America/Ciudad_Juarez":[31.733,-106.483],"America/Ojinaga":[29.567,-104.417],"America/Mazatlan":[23.217,-106.417],"America/Bahia_Banderas":[20.8,-105.25],"America/Hermosillo":[29.067,-110.967],"America/Tijuana":[32.533,-117.017],"Asia/Kuala_Lumpur":[3.167,101.7],"Asia/Kuching":[1.55,110.333],"Africa/Maputo":[-25.967,32.583],"Africa/Windhoek":[-22.567,17.1],"Pacific/Noumea":[-22.267,166.45],"Africa/Niamey":[13.517,2.117],"Pacific/Norfolk":[-29.05,167.967],"Africa/Lagos":[6.45,3.4],"America/Managua":[12.15,-86.283],"Europe/Amsterdam":[52.367,4.9],"Europe/Oslo":[59.917,10.75],"Asia/Kathmandu":[27.717,85.317],"Pacific/Nauru":[-.517,166.917],"Pacific/Niue":[-19.017,-169.917],"Pacific/Auckland":[-36.867,174.767],"Pacific/Chatham":[-43.95,-176.55],"Asia/Muscat":[23.6,58.583],"America/Panama":[8.967,-79.533],"America/Lima":[-12.05,-77.05],"Pacific/Tahiti":[-17.533,-149.567],"Pacific/Marquesas":[-9,-139.5],"Pacific/Gambier":[-23.133,-134.95],"Pacific/Port_Moresby":[-9.5,147.167],"Pacific/Bougainville":[-6.217,155.567],"Asia/Manila":[14.587,120.968],"Asia/Karachi":[24.867,67.05],"Europe/Warsaw":[52.25,21],"America/Miquelon":[47.05,-56.333],"Pacific/Pitcairn":[-25.067,-130.083],"America/Puerto_Rico":[18.468,-66.106],"Asia/Gaza":[31.5,34.467],"Asia/Hebron":[31.533,35.095],"Europe/Lisbon":[38.717,-9.133],"Atlantic/Madeira":[32.633,-16.9],"Atlantic/Azores":[37.733,-25.667],"Pacific/Palau":[7.333,134.483],"America/Asuncion":[-25.267,-57.667],"Asia/Qatar":[25.283,51.533],"Indian/Reunion":[-20.867,55.467],"Europe/Bucharest":[44.433,26.1],"Europe/Belgrade":[44.833,20.5],"Europe/Kaliningrad":[54.717,20.5],"Europe/Moscow":[55.756,37.618],"Europe/Simferopol":[44.95,34.1],"Europe/Kirov":[58.6,49.65],"Europe/Volgograd":[48.733,44.417],"Europe/Astrakhan":[46.35,48.05],"Europe/Saratov":[51.567,46.033],"Europe/Ulyanovsk":[54.333,48.4],"Europe/Samara":[53.2,50.15],"Asia/Yekaterinburg":[56.85,60.6],"Asia/Omsk":[55,73.4],"Asia/Novosibirsk":[55.033,82.917],"Asia/Barnaul":[53.367,83.75],"Asia/Tomsk":[56.5,84.967],"Asia/Novokuznetsk":[53.75,87.117],"Asia/Krasnoyarsk":[56.017,92.833],"Asia/Irkutsk":[52.267,104.333],"Asia/Chita":[52.05,113.467],"Asia/Yakutsk":[62,129.667],"Asia/Khandyga":[62.656,135.554],"Asia/Vladivostok":[43.167,131.933],"Asia/Ust-Nera":[64.56,143.227],"Asia/Magadan":[59.567,150.8],"Asia/Sakhalin":[46.967,142.7],"Asia/Srednekolymsk":[67.467,153.717],"Asia/Kamchatka":[53.017,158.65],"Asia/Anadyr":[64.75,177.483],"Africa/Kigali":[-1.95,30.067],"Asia/Riyadh":[24.633,46.717],"Pacific/Guadalcanal":[-9.533,160.2],"Indian/Mahe":[-4.667,55.467],"Africa/Khartoum":[15.6,32.533],"Europe/Stockholm":[59.333,18.05],"Asia/Singapore":[1.283,103.85],"Atlantic/St_Helena":[-15.917,-5.7],"Europe/Ljubljana":[46.05,14.517],"Arctic/Longyearbyen":[78,16],"Europe/Bratislava":[48.15,17.117],"Africa/Freetown":[8.5,-13.25],"Europe/San_Marino":[43.917,12.467],"Africa/Dakar":[14.667,-17.433],"Africa/Mogadishu":[2.067,45.367],"America/Paramaribo":[5.833,-55.167],"Africa/Juba":[4.85,31.617],"Africa/Sao_Tome":[.333,6.733],"America/El_Salvador":[13.7,-89.2],"America/Lower_Princes":[18.051,-63.047],"Asia/Damascus":[33.5,36.3],"Africa/Mbabane":[-26.3,31.1],"America/Grand_Turk":[21.467,-71.133],"Africa/Ndjamena":[12.117,15.05],"Indian/Kerguelen":[-49.353,70.218],"Africa/Lome":[6.133,1.217],"Asia/Bangkok":[13.75,100.517],"Asia/Dushanbe":[38.583,68.8],"Pacific/Fakaofo":[-9.367,-171.233],"Asia/Dili":[-8.55,125.583],"Asia/Ashgabat":[37.95,58.383],"Africa/Tunis":[36.8,10.183],"Pacific/Tongatapu":[-21.133,-175.2],"Europe/Istanbul":[41.017,28.967],"America/Port_of_Spain":[10.65,-61.517],"Pacific/Funafuti":[-8.517,179.217],"Asia/Taipei":[25.05,121.5],"Africa/Dar_es_Salaam":[-6.8,39.283],"Europe/Kyiv":[50.433,30.517],"Africa/Kampala":[.317,32.417],"Pacific/Midway":[28.217,-177.367],"Pacific/Wake":[19.283,166.617],"America/New_York":[40.714,-74.006],"America/Detroit":[42.331,-83.046],"America/Kentucky/Louisville":[38.254,-85.759],"America/Kentucky/Monticello":[36.83,-84.849],"America/Indiana/Indianapolis":[39.768,-86.158],"America/Indiana/Vincennes":[38.677,-87.529],"America/Indiana/Winamac":[41.051,-86.603],"America/Indiana/Marengo":[38.376,-86.345],"America/Indiana/Petersburg":[38.492,-87.279],"America/Indiana/Vevay":[38.748,-85.067],"America/Chicago":[41.85,-87.65],"America/Indiana/Tell_City":[37.953,-86.761],"America/Indiana/Knox":[41.296,-86.625],"America/Menominee":[45.108,-87.614],"America/North_Dakota/Center":[47.116,-101.299],"America/North_Dakota/New_Salem":[46.845,-101.411],"America/North_Dakota/Beulah":[47.264,-101.778],"America/Denver":[39.739,-104.984],"America/Boise":[43.614,-116.203],"America/Phoenix":[33.448,-112.073],"America/Los_Angeles":[34.052,-118.243],"America/Anchorage":[61.218,-149.9],"America/Juneau":[58.302,-134.42],"America/Sitka":[57.176,-135.302],"America/Metlakatla":[55.127,-131.576],"America/Yakutat":[59.547,-139.727],"America/Nome":[64.501,-165.406],"America/Adak":[51.88,-176.658],"Pacific/Honolulu":[21.307,-157.858],"America/Montevideo":[-34.909,-56.213],"Asia/Samarkand":[39.667,66.8],"Asia/Tashkent":[41.333,69.3],"Europe/Vatican":[41.902,12.453],"America/St_Vincent":[13.15,-61.233],"America/Caracas":[10.5,-66.933],"America/Tortola":[18.45,-64.617],"America/St_Thomas":[18.35,-64.933],"Asia/Ho_Chi_Minh":[10.75,106.667],"Pacific/Efate":[-17.667,168.417],"Pacific/Wallis":[-13.3,-176.167],"Pacific/Apia":[-13.833,-171.733],"Asia/Aden":[12.75,45.2],"Indian/Mayotte":[-12.783,45.233],"Africa/Johannesburg":[-26.25,28],"Africa/Lusaka":[-15.417,28.283],"Africa/Harare":[-17.833,31.05]};var VS=Intl.DateTimeFormat().resolvedOptions().timeZone;function kl(n){let e=Math.PI/180,t=(n-Date.UTC(n.getUTCFullYear(),0,1))/864e5,i=2*Math.PI*t/365.2422,r=.006918-.399912*Math.cos(i)+.070257*Math.sin(i)-.006758*Math.cos(2*i)+907e-6*Math.sin(2*i)-.002697*Math.cos(3*i)+.00148*Math.sin(3*i),o=229.18*(75e-6+.001868*Math.cos(i)-.032077*Math.sin(i)-.014615*Math.cos(2*i)-.040849*Math.sin(2*i)),a=(180-(n.getUTCHours()*60+n.getUTCMinutes()+o)/4)*e;return new z(Math.cos(r)*Math.cos(a),Math.sin(r),-Math.cos(r)*Math.sin(a))}function Xm(n,e,t=qm[VS]){let i=Math.PI/180,[r,o]=t||[0,-n.getTimezoneOffset()/4],a=Math.asin(od.clamp(e.x*Math.cos(r*i)*Math.cos(o*i)+e.y*Math.sin(r*i)-e.z*Math.cos(r*i)*Math.sin(o*i),-1,1))/i;return 1-od.smoothstep(a,-7,7)}function Ym(n){let e=new Sa;[[0,1],[.1,.65],[.1,.18],[.89,-.26],[.88,-.42],[.1,-.19],[.09,-.63],[.31,-.83],[.3,-.95],[0,-.83],[-.3,-.95],[-.31,-.83],[-.09,-.63],[-.1,-.19],[-.88,-.42],[-.89,-.26],[-.1,.18],[-.1,.65]].forEach(([d,h],m)=>m?e.lineTo(d,h):e.moveTo(d,h)),e.closePath();let i=new Rl(e),r=new Vn({color:13822975,side:ti}),o=new _n,a=n.map((d,h)=>{let m=new Ft(i,r);return m.scale.setScalar(.14),o.add(m),{plane:m,route:d,phase:(.17+h*.381966)%1,duration:28+d[0].distanceTo(d.at(-1))*2.6}}),s=new z,l=new z,u=new z,c=new wt;function f(d){for(let{plane:h,route:m,phase:x,duration:g}of a){let p=(d/g+x)%1,_=p*(m.length-1),y=Math.floor(_);h.position.lerpVectors(m[y],m[y+1],_-y),s.subVectors(m[y+1],m[y]).normalize(),l.copy(h.position).normalize(),u.crossVectors(s,l).normalize(),l.crossVectors(u,s),h.quaternion.setFromRotationMatrix(c.makeBasis(u,s,l)),h.scale.setScalar(.14*Math.min(1,p*18,(1-p)*18))}}return f(0),{group:o,update:f}}function Zm(n,e,t,i){let r=[],o=[],a=87251,s=()=>(a=Math.imul(a,1664525)+1013904223>>>0)/4294967296;for(let{lat:u,lon:c}of n)for(let f=0;f<105;f++){let d=s()*Math.PI*2,h=s()**1.5*1.65,m=u+Math.sin(d)*h*.64,x=c+Math.cos(d)*h/Math.cos(u*Math.PI/180);if(!t(x,m))continue;let g=e(m,x,i+.035);r.push(g.x,g.y,g.z),o.push(1,.57+s()*.35,.29+s()*.23)}let l=new Vt;return l.setAttribute("position",new Tt(r,3)),l.setAttribute("color",new Tt(o,3)),new Si(l,new ai({vertexColors:!0,size:.036,transparent:!0,depthWrite:!1,blending:rl,toneMapped:!1}))}var ud={ko:["\uC9C0\uAD6C\uBCF8","\uB3CC\uB824 \uBCF4\uACE0, \uB450 \uC190\uAC00\uB77D\uC73C\uB85C \uD655\uB300\uD558\uC138\uC694.","\uB3C4\uC2DC","\uBE68\uAC04 \uD45C\uC2DC\uB97C \uB20C\uB7EC \uB3C4\uC2DC\uC758 \uBA54\uB274\uB97C \uC5EC\uC138\uC694.","\uC138\uC158","\uB3C4\uC548\uC744 \uBAB8\uC5D0 \uBC30\uCE58\uD55C \uB4A4 \uBB38\uC758\uB97C \uBCF4\uB0B4\uC138\uC694.","\uC7A5\uAC11","3D\uB85C \uC0B4\uD3B4\uBCF4\uACE0 \uB4DC\uB86D \uC7A5\uC18C\uC640 \uAE08\uC561\uC744 \uD655\uC778\uD558\uC138\uC694. \uBC30\uC1A1 \uC5C6\uC774 \uD604\uC7A5 \uD53D\uC5C5\uD574\uC694.","SOUND SYSTEM","\uB3C4\uC2DC\uC758 \uC74C\uC545\uC744 \uB4E4\uC5B4\uBCF4\uC138\uC694.","LIVE","\uB77C\uB514\uC624\xB7\uC704\uC131\xB7\uACF5\uAC1C \uB77C\uC774\uBE0C \uC601\uC0C1\uC744 \uB458\uB7EC\uBCF4\uC138\uC694.","Message","\uB85C\uACE0\uC5D0\uC11C \uB300\uD654\uB97C \uC5F4\uC5B4\uC694. \uC0C8 \uBA54\uC2DC\uC9C0\uAC00 \uC788\uC73C\uBA74 \uCD08\uB85D \uC810\uC774 \uAE5C\uBE61\uC5EC\uC694.","PROFILE","\uB0B4 \uC138\uC158\uACFC \uACB0\uC81C \uC548\uB0B4\uB97C \uD655\uC778\uD558\uC138\uC694. \uC5B8\uC5B4 \uBA54\uB274\uC5D0\uC11C \uC774 \uC548\uB0B4\uB97C \uB2E4\uC2DC \uBCFC \uC218 \uC788\uC5B4\uC694."],en:["Globe","Drag to rotate. Pinch to zoom.","Cities","Tap a red marker to open the city menu.","Session","Place a design on the body, then send an inquiry.","Gloves","Explore the 3D model, pickup location and price. Collection is in person, with no shipping.","SOUND SYSTEM","Listen to the city\u2019s music.","LIVE","Explore radio, satellites and public live streams.","Message","Tap the logo for your conversations. A green dot pulses for unread messages.","PROFILE","Find your sessions and payment instructions. Replay this guide from the language menu."],ja:["\u5730\u7403\u5100","\u30C9\u30E9\u30C3\u30B0\u3067\u56DE\u8EE2\u30012\u672C\u6307\u3067\u62E1\u5927\u3067\u304D\u307E\u3059\u3002","\u90FD\u5E02","\u8D64\u3044\u30DE\u30FC\u30AB\u30FC\u3092\u62BC\u3059\u3068\u90FD\u5E02\u306E\u30E1\u30CB\u30E5\u30FC\u304C\u958B\u304D\u307E\u3059\u3002","\u30BB\u30C3\u30B7\u30E7\u30F3","\u4F53\u306B\u30C7\u30B6\u30A4\u30F3\u3092\u914D\u7F6E\u3057\u3066\u3001\u554F\u3044\u5408\u308F\u305B\u3092\u9001\u308C\u307E\u3059\u3002","\u30B0\u30ED\u30FC\u30D6","3D\u30E2\u30C7\u30EB\u3001\u53D7\u53D6\u5834\u6240\u3001\u91D1\u984D\u3092\u78BA\u8A8D\u3067\u304D\u307E\u3059\u3002\u914D\u9001\u306F\u306A\u304F\u73FE\u5730\u53D7\u53D6\u3067\u3059\u3002","SOUND SYSTEM","\u90FD\u5E02\u306E\u97F3\u697D\u3092\u8074\u3044\u3066\u307F\u307E\u3057\u3087\u3046\u3002","LIVE","\u30E9\u30B8\u30AA\u30FB\u885B\u661F\u30FB\u516C\u958B\u30E9\u30A4\u30D6\u6620\u50CF\u3092\u898B\u3089\u308C\u307E\u3059\u3002","Message","\u30ED\u30B4\u304B\u3089\u4F1A\u8A71\u3092\u958B\u3051\u307E\u3059\u3002\u672A\u8AAD\u304C\u3042\u308B\u3068\u7DD1\u306E\u70B9\u304C\u70B9\u6EC5\u3057\u307E\u3059\u3002","PROFILE","\u30BB\u30C3\u30B7\u30E7\u30F3\u3068\u652F\u6255\u6848\u5185\u3092\u78BA\u8A8D\u3067\u304D\u307E\u3059\u3002\u8A00\u8A9E\u30E1\u30CB\u30E5\u30FC\u304B\u3089\u30AC\u30A4\u30C9\u3092\u518D\u8868\u793A\u3067\u304D\u307E\u3059\u3002"],zh:["\u5730\u7403\u4EEA","\u62D6\u52A8\u65CB\u8F6C\uFF0C\u53CC\u6307\u7F29\u653E\u3002","\u57CE\u5E02","\u70B9\u51FB\u7EA2\u8272\u6807\u8BB0\u6253\u5F00\u57CE\u5E02\u83DC\u5355\u3002","\u9884\u7EA6","\u628A\u56FE\u6848\u653E\u5230\u8EAB\u4F53\u4E0A\uFF0C\u518D\u53D1\u9001\u54A8\u8BE2\u3002","\u624B\u5957","\u67E5\u770B3D\u6A21\u578B\u3001\u9886\u53D6\u5730\u70B9\u548C\u91D1\u989D\u3002\u4EC5\u9650\u73B0\u573A\u9886\u53D6\uFF0C\u4E0D\u63D0\u4F9B\u914D\u9001\u3002","SOUND SYSTEM","\u6536\u542C\u8FD9\u5EA7\u57CE\u5E02\u7684\u97F3\u4E50\u3002","LIVE","\u63A2\u7D22\u5E7F\u64AD\u3001\u536B\u661F\u548C\u516C\u5F00\u76F4\u64AD\u3002","Message","\u70B9\u51FB\u6807\u5FD7\u67E5\u770B\u5BF9\u8BDD\u3002\u6709\u672A\u8BFB\u6D88\u606F\u65F6\uFF0C\u7EFF\u70B9\u4F1A\u95EA\u70C1\u3002","PROFILE","\u67E5\u770B\u9884\u7EA6\u548C\u4ED8\u6B3E\u8BF4\u660E\u3002\u53EF\u4ECE\u8BED\u8A00\u83DC\u5355\u91CD\u65B0\u6253\u5F00\u6559\u7A0B\u3002"],"zh-Hant":["\u5730\u7403\u5100","\u62D6\u66F3\u65CB\u8F49\uFF0C\u96D9\u6307\u7E2E\u653E\u3002","\u57CE\u5E02","\u9EDE\u64CA\u7D05\u8272\u6A19\u8A18\u958B\u555F\u57CE\u5E02\u9078\u55AE\u3002","\u9810\u7D04","\u5C07\u5716\u6848\u653E\u5230\u8EAB\u9AD4\u4E0A\uFF0C\u518D\u50B3\u9001\u8AEE\u8A62\u3002","\u624B\u5957","\u67E5\u770B3D\u6A21\u578B\u3001\u9818\u53D6\u5730\u9EDE\u8207\u91D1\u984D\u3002\u50C5\u9650\u73FE\u5834\u9818\u53D6\uFF0C\u4E0D\u63D0\u4F9B\u914D\u9001\u3002","SOUND SYSTEM","\u8046\u807D\u9019\u5EA7\u57CE\u5E02\u7684\u97F3\u6A02\u3002","LIVE","\u63A2\u7D22\u5EE3\u64AD\u3001\u885B\u661F\u8207\u516C\u958B\u76F4\u64AD\u3002","Message","\u9EDE\u64CA\u6A19\u8A8C\u67E5\u770B\u5C0D\u8A71\u3002\u6709\u672A\u8B80\u8A0A\u606F\u6642\uFF0C\u7DA0\u9EDE\u6703\u9583\u720D\u3002","PROFILE","\u67E5\u770B\u9810\u7D04\u8207\u4ED8\u6B3E\u8AAA\u660E\u3002\u53EF\u5F9E\u8A9E\u8A00\u9078\u55AE\u91CD\u65B0\u958B\u555F\u6559\u5B78\u3002"],ru:["\u0413\u043B\u043E\u0431\u0443\u0441","\u041F\u0435\u0440\u0435\u0442\u0430\u0441\u043A\u0438\u0432\u0430\u0439\u0442\u0435 \u0434\u043B\u044F \u0432\u0440\u0430\u0449\u0435\u043D\u0438\u044F. \u041C\u0435\u043D\u044F\u0439\u0442\u0435 \u043C\u0430\u0441\u0448\u0442\u0430\u0431 \u0434\u0432\u0443\u043C\u044F \u043F\u0430\u043B\u044C\u0446\u0430\u043C\u0438.","\u0413\u043E\u0440\u043E\u0434\u0430","\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u043A\u0440\u0430\u0441\u043D\u0443\u044E \u043C\u0435\u0442\u043A\u0443, \u0447\u0442\u043E\u0431\u044B \u043E\u0442\u043A\u0440\u044B\u0442\u044C \u043C\u0435\u043D\u044E \u0433\u043E\u0440\u043E\u0434\u0430.","\u0421\u0435\u0430\u043D\u0441","\u0420\u0430\u0437\u043C\u0435\u0441\u0442\u0438\u0442\u0435 \u0440\u0438\u0441\u0443\u043D\u043E\u043A \u043D\u0430 \u0442\u0435\u043B\u0435 \u0438 \u043E\u0442\u043F\u0440\u0430\u0432\u044C\u0442\u0435 \u0437\u0430\u043F\u0440\u043E\u0441.","\u041F\u0435\u0440\u0447\u0430\u0442\u043A\u0438","\u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0438\u0442\u0435 3D-\u043C\u043E\u0434\u0435\u043B\u044C, \u043C\u0435\u0441\u0442\u043E \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0438 \u0446\u0435\u043D\u0443. \u0422\u043E\u043B\u044C\u043A\u043E \u043B\u0438\u0447\u043D\u043E\u0435 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0435, \u0431\u0435\u0437 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438.","SOUND SYSTEM","\u0421\u043B\u0443\u0448\u0430\u0439\u0442\u0435 \u043C\u0443\u0437\u044B\u043A\u0443 \u0433\u043E\u0440\u043E\u0434\u0430.","LIVE","\u0420\u0430\u0434\u0438\u043E, \u0441\u043F\u0443\u0442\u043D\u0438\u043A\u0438 \u0438 \u043E\u0442\u043A\u0440\u044B\u0442\u044B\u0435 \u043F\u0440\u044F\u043C\u044B\u0435 \u0442\u0440\u0430\u043D\u0441\u043B\u044F\u0446\u0438\u0438.","Message","\u041B\u043E\u0433\u043E\u0442\u0438\u043F \u043E\u0442\u043A\u0440\u044B\u0432\u0430\u0435\u0442 \u043F\u0435\u0440\u0435\u043F\u0438\u0441\u043A\u0443. \u0417\u0435\u043B\u0451\u043D\u0430\u044F \u0442\u043E\u0447\u043A\u0430 \u043C\u0438\u0433\u0430\u0435\u0442 \u043F\u0440\u0438 \u043D\u0435\u043F\u0440\u043E\u0447\u0438\u0442\u0430\u043D\u043D\u044B\u0445 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F\u0445.","PROFILE","\u0412\u0430\u0448\u0438 \u0441\u0435\u0430\u043D\u0441\u044B \u0438 \u0438\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u0438 \u043F\u043E \u043E\u043F\u043B\u0430\u0442\u0435. \u042D\u0442\u043E \u0440\u0443\u043A\u043E\u0432\u043E\u0434\u0441\u0442\u0432\u043E \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u043E \u0432 \u043C\u0435\u043D\u044E \u044F\u0437\u044B\u043A\u0430."],fr:["Globe","Faites glisser pour tourner. Pincez pour zoomer.","Villes","Touchez un rep\xE8re rouge pour ouvrir le menu de la ville.","S\xE9ance","Placez un motif sur le corps, puis envoyez une demande.","Gants","D\xE9couvrez le mod\xE8le 3D, le lieu de retrait et le prix. Retrait sur place uniquement, sans livraison.","SOUND SYSTEM","\xC9coutez la musique de la ville.","LIVE","Explorez les radios, les satellites et les directs publics.","Message","Le logo ouvre vos conversations. Un point vert clignote pour les messages non lus.","PROFILE","Retrouvez vos s\xE9ances et les instructions de paiement. Relancez ce guide depuis le menu des langues."],es:["Globo","Arrastra para girar. Pellizca para ampliar.","Ciudades","Toca una marca roja para abrir el men\xFA de la ciudad.","Sesi\xF3n","Coloca un dise\xF1o en el cuerpo y env\xEDa una consulta.","Guantes","Mira el modelo 3D, el lugar de recogida y el precio. Solo recogida presencial, sin env\xEDo.","SOUND SYSTEM","Escucha la m\xFAsica de la ciudad.","LIVE","Explora radio, sat\xE9lites y directos p\xFAblicos.","Message","El logotipo abre tus conversaciones. Un punto verde parpadea cuando hay mensajes sin leer.","PROFILE","Consulta tus sesiones e instrucciones de pago. Repite la gu\xEDa desde el men\xFA de idiomas."],de:["Globus","Zum Drehen ziehen. Mit zwei Fingern zoomen.","St\xE4dte","Tippe auf eine rote Markierung, um das Stadtmen\xFC zu \xF6ffnen.","Session","Platziere ein Motiv auf dem K\xF6rper und sende eine Anfrage.","Handschuhe","Sieh dir das 3D-Modell, den Abholort und den Preis an. Nur pers\xF6nliche Abholung, kein Versand.","SOUND SYSTEM","H\xF6re die Musik der Stadt.","LIVE","Entdecke Radio, Satelliten und \xF6ffentliche Livestreams.","Message","Das Logo \xF6ffnet deine Chats. Bei ungelesenen Nachrichten blinkt ein gr\xFCner Punkt.","PROFILE","Hier findest du Sessions und Zahlungshinweise. Die Anleitung l\xE4sst sich im Sprachmen\xFC erneut \xF6ffnen."],pt:["Globo","Arraste para girar. Use dois dedos para ampliar.","Cidades","Toque numa marca vermelha para abrir o menu da cidade.","Sess\xE3o","Posicione um desenho no corpo e envie uma consulta.","Luvas","Veja o modelo 3D, o local de retirada e o pre\xE7o. Apenas retirada presencial, sem envio.","SOUND SYSTEM","Ou\xE7a a m\xFAsica da cidade.","LIVE","Explore r\xE1dios, sat\xE9lites e transmiss\xF5es p\xFAblicas.","Message","O logotipo abre suas conversas. Um ponto verde pisca quando h\xE1 mensagens n\xE3o lidas.","PROFILE","Confira suas sess\xF5es e instru\xE7\xF5es de pagamento. Reabra o guia pelo menu de idiomas."],it:["Globo","Trascina per ruotare. Usa due dita per ingrandire.","Citt\xE0","Tocca un segnaposto rosso per aprire il menu della citt\xE0.","Sessione","Posiziona un disegno sul corpo e invia una richiesta.","Guanti","Guarda il modello 3D, il luogo di ritiro e il prezzo. Solo ritiro di persona, senza spedizione.","SOUND SYSTEM","Ascolta la musica della citt\xE0.","LIVE","Esplora radio, satelliti e dirette pubbliche.","Message","Il logo apre le conversazioni. Un punto verde lampeggia per i messaggi non letti.","PROFILE","Consulta sessioni e istruzioni di pagamento. Puoi riaprire la guida dal menu delle lingue."]};function Km(){let n=window.SKMLanguage,e=window.SKMBooking,t=document.querySelector("#skm-earth-preview"),i=(y,v,R)=>{let E=document.createElement(y);return v&&(E.className=v),R&&(E.textContent=R),E},r=()=>`skm-guide-v2:${e.session()?.user?.id||"guest"}`,o=null,a=null,s=null,l=0,u=null,c=null,f=y=>n.t(y),d=[".earth-stage","[data-survey=cities]","[data-feature=tattoo]","[data-feature=gloves]","[data-feature=music]","[data-survey=live]",".earth-brand",".earth-account"];function h(){if(c===e.session()?.user?.id)try{localStorage.setItem(r(),"done")}catch{}clearInterval(s),o?.remove(),o=null,a?.close(),a?.remove(),a=null,u?.focus();let y=sessionStorage.getItem("skm-guide-return-v2");sessionStorage.removeItem("skm-guide-return-v2"),["/app/account.html","/app/messages.html","/app/admin.html","/world.html#bodymap"].includes(y)&&location.replace(y)}function m(){if(!o)return;let y=t.querySelector(d[l]);if(!y)return;let v=y.getBoundingClientRect(),R=o.querySelector(".skm-guide-hole"),E=o.querySelector(".skm-guide-bubble"),P=l===0,L=P?Math.min(innerWidth*.72,300):v.width+12,b=P?L:v.height+12,S=P?(innerWidth-L)/2:v.left-6,T=P?innerHeight*.26:v.top-6;Object.assign(R.style,{left:S+"px",top:T+"px",width:L+"px",height:b+"px",borderRadius:P?"50%":"16px"});let O=E.getBoundingClientRect(),F=Math.max(16,Math.min(innerWidth-O.width-16,S+L/2-O.width/2)),H=T+b+18,U=H+O.height>innerHeight-20;U&&(H=Math.max(76,T-O.height-18)),E.toggleAttribute("data-above",U),Object.assign(E.style,{left:F+"px",top:Math.min(innerHeight-O.height-16,H)+"px"}),E.style.setProperty("--arrow-x",Math.max(20,Math.min(O.width-30,S+L/2-F))+"px")}function x(){if(!o)return;let y=ud[n.code]||ud.en;l>=2&&l<=4&&!t.classList.contains("city-focus")&&t.querySelector(".survey-cities button")?.click(),(l<2||l>4)&&t.classList.contains("city-focus")&&t.querySelector(".earth-world")?.click();let v=o.querySelector(".skm-guide-bubble");v.querySelector("small").textContent=`${l+1} / 8`,v.querySelector("h2").textContent=y[l*2],v.querySelector("p").textContent=y[l*2+1];let R=v.querySelector("[data-back]"),E=v.querySelector("[data-next]");R.textContent=f("back"),R.disabled=l===0,E.textContent=f(l===7?"close":"next"),o.querySelector(".skm-guide-skip").textContent=f("close"),m()}function g(){a?.close(),a?.remove(),a=null,l=0,o=i("div","skm-guide"),o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),o.setAttribute("aria-label","SKINOMAKASE"),o.innerHTML='<div class="skm-guide-hole"></div><section class="skm-guide-bubble"><small></small><h2></h2><p></p><nav class="skm-guide-actions"><button type="button" data-back></button><button type="button" data-next></button></nav></section><button type="button" class="skm-guide-skip"></button>',document.body.append(o),o.querySelector("[data-back]").onclick=()=>{l=Math.max(0,l-1),x()},o.querySelector("[data-next]").onclick=()=>l===7?h():(l++,x()),o.querySelector(".skm-guide-skip").onclick=h,o.addEventListener("keydown",y=>{if(y.key==="Escape"&&(y.preventDefault(),h()),y.key==="Tab"){let v=[...o.querySelectorAll("button:not(:disabled)")],R=v.indexOf(document.activeElement);y.preventDefault(),v[(R+(y.shiftKey?-1:1)+v.length)%v.length].focus()}}),x(),o.querySelector("[data-next]").focus(),s=setInterval(m,100)}function p(){if(o||a||!e.session()?.user?.id)return;c=e.session().user.id,u=document.activeElement,a=i("dialog"),a.id="skm-welcome",a.innerHTML='<small>SKINOMAKASE</small><h1></h1><select></select><button type="button"></button>';let y=a.querySelector("select");for(let R of n.languages){let E=i("option","",R.name);E.value=R.code,y.append(E)}y.value=n.code;let v=()=>{a.querySelector("h1").textContent=f("language"),y.setAttribute("aria-label",f("language")),a.querySelector("button").textContent=f("next")};y.onchange=()=>{n.set(y.value),v()},a.querySelector("button").onclick=g,a.addEventListener("cancel",R=>{R.preventDefault(),h()}),v(),document.body.append(a),a.showModal(),y.focus()}let _=i("button","","\u24D8");_.type="button",_.id="skm-tour-replay",_.textContent=n.t("guide")==="guide"?n.code==="ko"?"\uC0AC\uC6A9 \uBC29\uBC95":"Guide":n.t("guide"),document.querySelector("#skm-language-dialog")?.append(_),_.onclick=()=>{document.querySelector("#skm-language-dialog")?.close(),p()},window.SKMGuide={show:p},window.addEventListener("skm-language",x),window.addEventListener("skm-account-changed",()=>{c&&c!==e.session()?.user?.id&&h()}),e.verifiedAppUser().then(y=>{if(!y)return;let v=!1;try{v=localStorage.getItem(r())==="done"}catch{}!v&&!new URLSearchParams(location.search).has("gloves")&&!location.hash&&p()}).catch(()=>{}),window.addEventListener("pagehide",()=>{clearInterval(s)})}var WS=["ko","en","ja","zh","zh-Hant","ru","fr","es","de","pt","it"],fd=[["\uC138\uC158 \uC608\uC57D","Session booking","\u30BB\u30C3\u30B7\u30E7\u30F3\u4E88\u7D04","\u9884\u7EA6 SKINOMAKASE","\u9810\u7D04 SKINOMAKASE","\u0417\u0430\u043F\u0438\u0441\u044C \u043D\u0430 \u0441\u0435\u0430\u043D\u0441","R\xE9server une s\xE9ance","Reservar sesi\xF3n","Session buchen","Agendar sess\xE3o","Prenota una sessione"],["\uC7A5\uAC11 \uB4DC\uB86D","Glove drop","\u30B0\u30ED\u30FC\u30D6\u30C9\u30ED\u30C3\u30D7","\u624B\u5957\u53D1\u653E","\u624B\u5957\u767C\u653E","\u0420\u0430\u0437\u0434\u0430\u0447\u0430 \u043F\u0435\u0440\u0447\u0430\u0442\u043E\u043A","Drop de gants","Entrega de guantes","Handschuh-Drop","Drop de luvas","Drop di guanti"],["\uC74C\uC545","Music","\u97F3\u697D","\u97F3\u4E50","\u97F3\u6A02","\u041C\u0443\u0437\u044B\u043A\u0430","Musique","M\xFAsica","Musik","M\xFAsica","Musica"],["\uAE30\uD0C0 \uAE30\uB2A5","Explore","\u305D\u306E\u4ED6","\u63A2\u7D22","\u63A2\u7D22","\u041E\u0431\u0437\u043E\u0440","Explorer","Explorar","Entdecken","Explorar","Esplora"],["\uB3C4\uC2DC \uC120\uD0DD","Choose a city","\u90FD\u5E02\u3092\u9078\u629E","\u9009\u62E9\u57CE\u5E02","\u9078\u64C7\u57CE\u5E02","\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0433\u043E\u0440\u043E\u0434","Choisir une ville","Elegir ciudad","Stadt w\xE4hlen","Escolher cidade","Scegli citt\xE0"],["\uC9C0\uAD6C\uBCF8\uC73C\uB85C \uB3CC\uC544\uAC00\uAE30","Back to globe","\u5730\u7403\u5100\u306B\u623B\u308B","\u8FD4\u56DE\u5730\u7403","\u8FD4\u56DE\u5730\u7403","\u041D\u0430\u0437\u0430\u0434 \u043A \u0433\u043B\u043E\u0431\u0443\u0441\u0443","Retour au globe","Volver al globo","Zur\xFCck zum Globus","Voltar ao globo","Torna al globo"],["\uB4DC\uB86D \uAC00\uB2A5","Available","\u53D7\u53D6\u53EF\u80FD","\u53EF\u9886\u53D6","\u53EF\u9818\u53D6","\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u043E","Disponible","Disponible","Verf\xFCgbar","Dispon\xEDvel","Disponibile"],["\uC8FC\uC778 \uC788\uC74C","Owned","\u6240\u6709\u8005\u3042\u308A","\u5DF2\u6709\u4E3B\u4EBA","\u5DF2\u6709\u4E3B\u4EBA","\u0415\u0441\u0442\u044C \u0432\u043B\u0430\u0434\u0435\u043B\u0435\u0446","D\xE9j\xE0 attribu\xE9","Con propietario","Vergeben","Com propriet\xE1rio","Assegnato"],["\uC608\uC57D \uC911","Reserved","\u4E88\u7D04\u6E08\u307F","\u5DF2\u9884\u7559","\u5DF2\u9810\u7559","\u0417\u0430\u0440\u0435\u0437\u0435\u0440\u0432\u0438\u0440\u043E\u0432\u0430\u043D\u043E","R\xE9serv\xE9","Reservado","Reserviert","Reservado","Riservato"],["\uC900\uBE44 \uC911","Coming soon","\u6E96\u5099\u4E2D","\u7B79\u5907\u4E2D","\u7C4C\u5099\u4E2D","\u0421\u043A\u043E\u0440\u043E","Bient\xF4t","Pr\xF3ximamente","Demn\xE4chst","Em breve","Prossimamente"],["\uBBF8\uB9AC\uBCF4\uAE30","Preview","\u30D7\u30EC\u30D3\u30E5\u30FC","\u9884\u89C8","\u9810\u89BD","\u041F\u0440\u0435\u0434\u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440","Aper\xE7u","Vista previa","Vorschau","Pr\xE9via","Anteprima"],["\uD53D\uC5C5 \uC704\uCE58","Pickup location","\u53D7\u53D6\u5834\u6240","\u9886\u53D6\u5730\u70B9","\u9818\u53D6\u5730\u9EDE","\u041C\u0435\u0441\u0442\u043E \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F","Lieu de retrait","Lugar de recogida","Abholort","Local de retirada","Luogo di ritiro"],["\uC704\uCE58 \uB4F1\uB85D \uC804","Location not set","\u5834\u6240\u672A\u767B\u9332","\u5730\u70B9\u5F85\u8BBE\u7F6E","\u5730\u9EDE\u5F85\u8A2D\u5B9A","\u041C\u0435\u0441\u0442\u043E \u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D\u043E","Lieu non d\xE9fini","Ubicaci\xF3n pendiente","Ort noch offen","Local n\xE3o definido","Luogo non impostato"],["\uAE38\uCC3E\uAE30","Directions","\u7D4C\u8DEF\u6848\u5185","\u8DEF\u7EBF","\u8DEF\u7DDA","\u041C\u0430\u0440\u0448\u0440\u0443\u0442","Itin\xE9raire","C\xF3mo llegar","Route","Como chegar","Indicazioni"],["\uBCF4\uC720\uC790","Owner","\u6240\u6709\u8005","\u6301\u6709\u8005","\u6301\u6709\u8005","\u0412\u043B\u0430\u0434\u0435\u043B\u0435\u0446","Propri\xE9taire","Propietario","Besitzer","Propriet\xE1rio","Proprietario"],["\uC2E4\uC81C \uC804\uC1A1 \uC548 \uB428","Not sent \u2014 preview","\u30D7\u30EC\u30D3\u30E5\u30FC\u30FB\u9001\u4FE1\u3055\u308C\u307E\u305B\u3093","\u9884\u89C8\uFF0C\u4E0D\u4F1A\u53D1\u9001","\u9810\u89BD\uFF0C\u4E0D\u6703\u50B3\u9001","\u041F\u0440\u0435\u0434\u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 \u2014 \u043D\u0435 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043E","Aper\xE7u \u2014 non envoy\xE9","Vista previa, no se env\xEDa","Vorschau \u2014 nicht gesendet","Pr\xE9via \u2014 n\xE3o enviado","Anteprima \u2014 non inviato"],["\uC7A5\uAC11 \uBAA9\uB85D\uC73C\uB85C","Back to gloves","\u30B0\u30ED\u30FC\u30D6\u306B\u623B\u308B","\u8FD4\u56DE\u624B\u5957","\u8FD4\u56DE\u624B\u5957","\u041D\u0430\u0437\u0430\u0434 \u043A \u043F\u0435\u0440\u0447\u0430\u0442\u043A\u0430\u043C","Retour aux gants","Volver a los guantes","Zur\xFCck zu Handschuhen","Voltar \xE0s luvas","Torna ai guanti"],["\uC7AC\uC0DD","Play","\u518D\u751F","\u64AD\u653E","\u64AD\u653E","\u0412\u043E\u0441\u043F\u0440\u043E\u0438\u0437\u0432\u0435\u0441\u0442\u0438","Lecture","Reproducir","Abspielen","Reproduzir","Riproduci"],["\uC77C\uC2DC\uC815\uC9C0","Pause","\u4E00\u6642\u505C\u6B62","\u6682\u505C","\u66AB\u505C","\u041F\u0430\u0443\u0437\u0430","Pause","Pausar","Pause","Pausar","Pausa"],["\uD50C\uB808\uC774\uC5B4 \uB2EB\uAE30","Close player","\u30D7\u30EC\u30FC\u30E4\u30FC\u3092\u9589\u3058\u308B","\u5173\u95ED\u64AD\u653E\u5668","\u95DC\u9589\u64AD\u653E\u5668","\u0417\u0430\u043A\u0440\u044B\u0442\u044C \u043F\u043B\u0435\u0435\u0440","Fermer le lecteur","Cerrar reproductor","Player schlie\xDFen","Fechar player","Chiudi lettore"],["\uC7A5\uAC11 \uB4DC\uB86D\uC740 \uD604\uC7AC \uBBF8\uB9AC\uBCF4\uAE30\uC785\uB2C8\uB2E4.","Glove drops are currently a preview.","\u30B0\u30ED\u30FC\u30D6\u30C9\u30ED\u30C3\u30D7\u306F\u73FE\u5728\u30D7\u30EC\u30D3\u30E5\u30FC\u3067\u3059\u3002","\u624B\u5957\u53D1\u653E\u76EE\u524D\u4E3A\u9884\u89C8\u3002","\u624B\u5957\u767C\u653E\u76EE\u524D\u70BA\u9810\u89BD\u3002","\u0420\u0430\u0437\u0434\u0430\u0447\u0430 \u043F\u0435\u0440\u0447\u0430\u0442\u043E\u043A \u043F\u043E\u043A\u0430 \u0432 \u0440\u0435\u0436\u0438\u043C\u0435 \u043F\u0440\u0435\u0434\u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0430.","Le drop de gants est en aper\xE7u.","La entrega de guantes est\xE1 en vista previa.","Handschuh-Drops sind derzeit eine Vorschau.","O drop de luvas est\xE1 em pr\xE9via.","Il drop di guanti \xE8 in anteprima."],["\uC11C\uC6B8","Seoul","\u30BD\u30A6\u30EB","\u9996\u5C14","\u9996\u723E","\u0421\u0435\u0443\u043B","Seoul","Seoul","Seoul","Seoul","Seoul"],["\uB3C4\uCFC4","Tokyo","\u6771\u4EAC","\u4E1C\u4EAC","\u6771\u4EAC","\u0422\u043E\u043A\u0438\u043E","Tokyo","Tokyo","Tokyo","Tokyo","Tokyo"],["\uC624\uC0AC\uCE74","Osaka","\u5927\u962A","\u5927\u962A","\u5927\u962A","\u041E\u0441\u0430\u043A\u0430","Osaka","Osaka","Osaka","Osaka","Osaka"],["\uB7F0\uB358","London","\u30ED\u30F3\u30C9\u30F3","\u4F26\u6566","\u502B\u6566","\u041B\u043E\u043D\u0434\u043E\u043D","London","London","London","London","London"],["\uD30C\uB9AC","Paris","\u30D1\u30EA","\u5DF4\u9ECE","\u5DF4\u9ECE","\u041F\u0430\u0440\u0438\u0436","Paris","Paris","Paris","Paris","Paris"],["\uD1A0\uB860\uD1A0","Toronto","\u30C8\u30ED\u30F3\u30C8","\u591A\u4F26\u591A","\u591A\u502B\u591A","\u0422\u043E\u0440\u043E\u043D\u0442\u043E","Toronto","Toronto","Toronto","Toronto","Toronto"],["\uBC34\uCFE0\uBC84","Vancouver","\u30D0\u30F3\u30AF\u30FC\u30D0\u30FC","\u6E29\u54E5\u534E","\u6EAB\u54E5\u83EF","\u0412\u0430\u043D\u043A\u0443\u0432\u0435\u0440","Vancouver","Vancouver","Vancouver","Vancouver","Vancouver"],["\uBAAC\uD2B8\uB9AC\uC62C","Montreal","\u30E2\u30F3\u30C8\u30EA\u30AA\u30FC\u30EB","\u8499\u7279\u5229\u5C14","\u8499\u7279\u5229\u723E","\u041C\u043E\u043D\u0440\u0435\u0430\u043B\u044C","Montreal","Montreal","Montreal","Montreal","Montreal"],["\uB85C\uC2A4\uC564\uC824\uB808\uC2A4","Los Angeles","\u30ED\u30B5\u30F3\u30BC\u30EB\u30B9","\u6D1B\u6749\u77F6","\u6D1B\u6749\u78EF","\u041B\u043E\u0441-\u0410\u043D\u0434\u0436\u0435\u043B\u0435\u0441","Los Angeles","Los Angeles","Los Angeles","Los Angeles","Los Angeles"],["\uB274\uC695","New York","\u30CB\u30E5\u30FC\u30E8\u30FC\u30AF","\u7EBD\u7EA6","\u7D10\u7D04","\u041D\u044C\u044E-\u0419\u043E\u0440\u043A","New York","New York","New York","New York","New York"],["\uD64D\uCF69","Hong Kong","\u9999\u6E2F","\u9999\u6E2F","\u9999\u6E2F","\u0413\u043E\u043D\u043A\u043E\u043D\u0433","Hong Kong","Hong Kong","Hong Kong","Hong Kong","Hong Kong"],["\uC704\uCE58 \uACF5\uAC1C \uB300\uAE30","Location pending","\u5834\u6240\u306E\u516C\u958B\u5F85\u3061","\u7B49\u5F85\u516C\u5E03\u5730\u70B9","\u7B49\u5F85\u516C\u5E03\u5730\u9EDE","\u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0430\u0434\u0440\u0435\u0441\u0430","Lieu en attente","Ubicaci\xF3n pendiente","Ort ausstehend","Local pendente","Luogo in attesa"],["\uC800\uC7A5\uD558\uC9C0 \uBABB\uD588\uC5B4\uC694. \uB2E4\uC2DC \uC2DC\uB3C4\uD574\uC8FC\uC138\uC694.","Could not save. Please try again.","\u4FDD\u5B58\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F\u3002\u518D\u8A66\u884C\u3057\u3066\u304F\u3060\u3055\u3044\u3002","\u4FDD\u5B58\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5\u3002","\u5132\u5B58\u5931\u6557\uFF0C\u8ACB\u91CD\u8A66\u3002","\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C. \u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u043F\u043E\u043F\u044B\u0442\u043A\u0443.","Enregistrement impossible. R\xE9essayez.","No se pudo guardar. Int\xE9ntalo de nuevo.","Speichern fehlgeschlagen. Bitte erneut versuchen.","N\xE3o foi poss\xEDvel salvar. Tente novamente.","Salvataggio non riuscito. Riprova."],["\uC74C\uC6D0\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC5B4\uC694. \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694.","Audio could not load. Tap to retry.","\u97F3\u58F0\u3092\u8AAD\u307F\u8FBC\u3081\u307E\u305B\u3093\u3002\u3082\u3046\u4E00\u5EA6\u62BC\u3057\u3066\u304F\u3060\u3055\u3044\u3002","\u97F3\u9891\u52A0\u8F7D\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5\u3002","\u97F3\u8A0A\u8F09\u5165\u5931\u6557\uFF0C\u8ACB\u91CD\u8A66\u3002","\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0430\u0443\u0434\u0438\u043E. \u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u0435\u0449\u0451 \u0440\u0430\u0437.","Impossible de charger le son. R\xE9essayez.","No se pudo cargar el audio. Vuelve a pulsar.","Audio konnte nicht geladen werden. Erneut tippen.","N\xE3o foi poss\xEDvel carregar o \xE1udio. Toque novamente.","Impossibile caricare l\u2019audio. Tocca di nuovo."],["\uB3C4\uC2DC \uC9C0\uB3C4","City map","\u90FD\u5E02\u5730\u56F3","\u57CE\u5E02\u5730\u56FE","\u57CE\u5E02\u5730\u5716","\u041A\u0430\u0440\u0442\u0430 \u0433\u043E\u0440\u043E\u0434\u0430","Carte de la ville","Mapa de la ciudad","Stadtplan","Mapa da cidade","Mappa della citt\xE0"],["\uC218\uB839 \uAE08\uC561","Your pickup price","\u53D7\u53D6\u91D1\u984D","\u81EA\u9009\u9886\u53D6\u91D1\u989D","\u81EA\u9078\u9818\u53D6\u91D1\u984D","\u0412\u0430\u0448\u0430 \u0446\u0435\u043D\u0430","Montant au choix","Tu importe","Dein Betrag","Seu valor","Il tuo importo"],["\uD53D\uC5C5 \uBBF8\uB9AC\uBCF4\uAE30","Preview pickup","\u53D7\u53D6\u30D7\u30EC\u30D3\u30E5\u30FC","\u9884\u89C8\u9886\u53D6","\u9810\u89BD\u9818\u53D6","\u041F\u0440\u0435\u0434\u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F","Aper\xE7u du retrait","Vista previa de recogida","Abholung ansehen","Pr\xE9via da retirada","Anteprima ritiro"],["\uACB0\uC81C \uC218\uB2E8 \uC900\uBE44 \uC911","Payment setup pending","\u6C7A\u6E08\u65B9\u6CD5\u306F\u6E96\u5099\u4E2D","\u652F\u4ED8\u65B9\u5F0F\u7B79\u5907\u4E2D","\u4ED8\u6B3E\u65B9\u5F0F\u7C4C\u5099\u4E2D","\u041E\u043F\u043B\u0430\u0442\u0430 \u043F\u043E\u043A\u0430 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0430","Paiement en pr\xE9paration","Pago en preparaci\xF3n","Zahlung in Vorbereitung","Pagamento em prepara\xE7\xE3o","Pagamento in preparazione"],["\uACBD\uB9E4 \uCCB4\uD5D8","Try an auction","\u30AA\u30FC\u30AF\u30B7\u30E7\u30F3\u4F53\u9A13","\u4F53\u9A8C\u7ADE\u62CD","\u9AD4\u9A57\u7AF6\u62CD","\u0414\u0435\u043C\u043E \u0430\u0443\u043A\u0446\u0438\u043E\u043D\u0430","Essayer les ench\xE8res","Probar subasta","Auktion ausprobieren","Testar leil\xE3o","Prova l\u2019asta"],["\uAD6C\uB9E4 \uBB38\uC758","Ask to buy","\u8CFC\u5165\u306E\u554F\u3044\u5408\u308F\u305B","\u8054\u7CFB\u8D2D\u4E70","\u806F\u7D61\u8CFC\u8CB7","\u0421\u043F\u0440\u043E\u0441\u0438\u0442\u044C \u043E \u043F\u043E\u043A\u0443\u043F\u043A\u0435","Contacter pour acheter","Consultar compra","Kaufanfrage","Consultar compra","Chiedi di acquistare"],["\uC5F0\uB77D \uD504\uB85C\uD544","Contact profile","\u9023\u7D61\u30D7\u30ED\u30D5\u30A3\u30FC\u30EB","\u8054\u7CFB\u8D44\u6599","\u806F\u7D61\u8CC7\u6599","\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u043D\u044B\u0439 \u043F\u0440\u043E\u0444\u0438\u043B\u044C","Profil de contact","Perfil de contacto","Kontaktprofil","Perfil de contato","Profilo di contatto"],["\uBCA0\uB274 \uC77C\uC815","City events","\u4F1A\u5834\u306E\u4E88\u5B9A","\u57CE\u5E02\u6D3B\u52A8","\u57CE\u5E02\u6D3B\u52D5","\u0421\u043E\u0431\u044B\u0442\u0438\u044F \u0433\u043E\u0440\u043E\u0434\u0430","\xC9v\xE9nements","Eventos","Veranstaltungen","Eventos","Eventi"],["US$10 \uC774\uC0C1, \uC6D0\uD558\uB294 \uB9CC\uD07C","US$10 minimum. You choose.","US$10\u4EE5\u4E0A\u3001\u304A\u597D\u304D\u306A\u91D1\u984D","\u6700\u4F4E US$10\uFF0C\u91D1\u989D\u81EA\u5B9A","\u6700\u4F4E US$10\uFF0C\u91D1\u984D\u81EA\u8A02","\u041E\u0442 US$10, \u0441\u0443\u043C\u043C\u0443 \u0432\u044B\u0431\u0438\u0440\u0430\u0435\u0442\u0435 \u0432\u044B","\xC0 partir de US$10, \xE0 votre choix","Desde US$10, t\xFA eliges","Ab US$10, du entscheidest","A partir de US$10, voc\xEA escolhe","Da US$10, scegli tu"],["US$10 \uC774\uC0C1, \uC6D0\uD558\uB294 \uB9CC\uD07C","US$10 minimum. You choose.","US$10\u4EE5\u4E0A\u3001\u304A\u597D\u304D\u306A\u91D1\u984D","\u6700\u4F4E US$10\uFF0C\u91D1\u989D\u81EA\u5B9A","\u6700\u4F4E US$10\uFF0C\u91D1\u984D\u81EA\u8A02","\u041E\u0442 US$10, \u0441\u0443\u043C\u043C\u0443 \u0432\u044B\u0431\u0438\u0440\u0430\u0435\u0442\u0435 \u0432\u044B","\xC0 partir de US$10, \xE0 votre choix","Desde US$10, t\xFA eliges","Ab US$10, du entscheidest","A partir de US$10, voc\xEA escolhe","Da US$10, scegli tu"]];fd.push(["3D\uB85C \uBCF4\uAE30","View in 3D","3D\u3067\u898B\u308B","\u67E5\u770B3D","\u67E5\u770B3D","\u0421\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0432 3D","Voir en 3D","Ver en 3D","In 3D ansehen","Ver em 3D","Vedi in 3D"]);fd.push(["\uC2F1\uAC00\uD3EC\uB974","Singapore","\u30B7\u30F3\u30AC\u30DD\u30FC\u30EB","\u65B0\u52A0\u5761","\u65B0\u52A0\u5761","\u0421\u0438\u043D\u0433\u0430\u043F\u0443\u0440","Singapour","Singapur","Singapur","Singapura","Singapore"]);var qS={"SESSION BOOKING":"\uC138\uC158 \uC608\uC57D","GLOVE DROP":"\uC7A5\uAC11 \uB4DC\uB86D","CITY SOUND":"\uC74C\uC545",EXPLORE:"\uAE30\uD0C0 \uAE30\uB2A5",PLAY:"\uC7AC\uC0DD",PAUSE:"\uC77C\uC2DC\uC815\uC9C0","\uC804\uCCB4 \uC9C0\uAD6C\uBCF8\uC73C\uB85C \uB3CC\uC544\uAC00\uAE30":"\uC9C0\uAD6C\uBCF8\uC73C\uB85C \uB3CC\uC544\uAC00\uAE30","\uBA54\uC2DC\uC9C0\uB97C \uBCF4\uB0B4\uBCF4\uC138\uC694":"\uBA54\uC2DC\uC9C0\uB97C \uC785\uB825\uD574 \uC8FC\uC138\uC694.","\uAE30\uD0C0 \uAE30\uB2A5 \uB2EB\uAE30":"\uB2EB\uAE30"};function $m(n){let e=new WeakMap;function t(){i.disconnect();let r=window.SKMLanguage,o=r?.code||"en",a=Math.max(0,WS.indexOf(o)),s=new Map;for(let x of fd)s.set(x[0],x[a]);for(let[x,g]of Object.entries(window.SKM_UI_TRANSLATIONS?.ko||{}))s.set(g,r.t(x));let l={\uB300\uD55C\uBBFC\uAD6D:"KR",\uC77C\uBCF8:"JP",\uC601\uAD6D:"GB",\uD504\uB791\uC2A4:"FR",\uCE90\uB098\uB2E4:"CA",\uBBF8\uAD6D:"US",\uD64D\uCF69:"HK",\uC2F1\uAC00\uD3EC\uB974:"SG"},u=new Intl.DisplayNames([r?.locale||"en"],{type:"region"});for(let[x,g]of Object.entries(l))s.set(x,u.of(g));function c(x){let g=x.trim(),p=qS[g]||g;return s.has(p)?x.replace(g,s.get(p)):x}function f(x){let g=c(x);if(g!==x||o==="ko")return g;let p=x;for(let[_,y]of[...s].sort((v,R)=>R[0].length-v[0].length))/[가-힣]/.test(_)&&(p=p.split(_).join(y));return p.replace(/ 보기$/,"").replace(/ · 내 대화$/,"")}function d(x,g,p,_){let y=e.get(x);y||(y={},e.set(x,y));let v=y[g],R=v&&p===v.last?v.original:p,E=g==="text"?c(R):f(R);y[g]={original:R,last:E},p!==E&&_(E)}let h=document.createTreeWalker(n,NodeFilter.SHOW_TEXT),m;for(;m=h.nextNode();){if(m.parentElement.closest("script,style,textarea,.private-note,.glove-chat-message,.earth-track-info h3"))continue;let x=m;d(x,"text",x.nodeValue,g=>x.nodeValue=g)}for(let x of n.querySelectorAll("[aria-label],[placeholder],optgroup[label]"))for(let g of["aria-label","placeholder","label"])x.hasAttribute(g)&&d(x,g,x.getAttribute(g),p=>x.setAttribute(g,p));i.observe(n,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["aria-label","placeholder","label"]})}let i=new MutationObserver(t);window.addEventListener("skm-language",t),t(),window.addEventListener("pagehide",()=>i.disconnect()),window.addEventListener("pageshow",t)}function Jm(n){let e=[...n.querySelectorAll(".earth-drop-panel,.earth-extra-menu")],t=[...document.querySelectorAll(".bm-overlay,.video-player-overlay,.modal-overlay")],i=[...document.querySelectorAll("#appFrame,#bmFrame,#vcFrame")],r=new MutationObserver(c=>{for(let{target:f}of c)f.dataset.paperLoading="true"});for(let c of i)r.observe(c,{attributes:!0,attributeFilter:["src"]}),c.addEventListener("load",()=>{delete c.dataset.paperLoading});let o=document.createElement("div");o.className="earth-white-wash",o.setAttribute("aria-hidden","true"),n.querySelector(".earth-app").append(o);let a=document.createElement("h2");a.className="feature-heading",n.querySelector(".earth-header").append(a);function s(){let c=e.some(g=>!g.hidden);n.classList.toggle("feature-open",c);let f=n.querySelector(".glove-direct-grid"),d=n.querySelector(".earth-extra-menu"),h=n.querySelector(".earth-music-panel");n.classList.toggle("gloves-open",!f.hidden);let x=(f.hidden?d.hidden?h.hidden?null:h.querySelector("h2"):d.querySelector(".earth-extra-heading span"):f.querySelector("h2"))?.textContent||"";a.textContent!==x&&(a.textContent=x),c&&(n.scrollTop=0),n.inert=document.body.classList.contains("bm-open")||t.some(g=>g.classList.contains("active"));for(let g of n.querySelectorAll(".earth-stage,.earth-city-panel,.earth-world,.earth-footer"))g.inert=c}let l=new MutationObserver(s);function u(){for(let c of e)l.observe(c,{attributes:!0,attributeFilter:["hidden"]});for(let c of n.querySelectorAll(".glove-edition-label,.earth-extra-heading span,.earth-music-panel h2"))l.observe(c,{childList:!0,subtree:!0,characterData:!0});for(let c of[document.body,...t])l.observe(c,{attributes:!0,attributeFilter:["class"]})}u(),s(),window.addEventListener("pagehide",()=>{l.disconnect(),r.disconnect()}),window.addEventListener("pageshow",()=>{u();for(let c of i)r.observe(c,{attributes:!0,attributeFilter:["src"]});s()})}var ug=Vr(Qm());var eg="data:image/svg+xml,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48"><g clip-path="url(#a)"><path fill="#002991" d="M38.914 13.35c0 5.574-5.144 12.15-12.927 12.15H18.49l-.368 2.322L16.373 39H7.056l5.605-36h15.095c5.083 0 9.082 2.833 10.555 6.77a9.687 9.687 0 0 1 .603 3.58z"/><path fill="#60CDFF" d="M44.284 23.7A12.894 12.894 0 0 1 31.53 34.5h-5.206L24.157 48H14.89l1.483-9 1.75-11.178.367-2.322h7.497c7.773 0 12.927-6.576 12.927-12.15 3.825 1.974 6.055 5.963 5.37 10.35z"/><path fill="#008CFF" d="M38.914 13.35C37.31 12.511 35.365 12 33.248 12h-12.64L18.49 25.5h7.497c7.773 0 12.927-6.576 12.927-12.15z"/></g><defs><clipPath id="a"><path fill="#fff" d="M7.056 3h37.35v45H7.056z"/></clipPath></defs></svg>'),tg="data:image/svg+xml,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 135 48"><g clip-path="url(#a)"><path fill="#000" d="M133 2.02v32.83h-7.47V2.02H133zM122.78 13.1v21.81h-6.64v-1.88c-.84.82-1.8 1.44-2.86 1.88-1.07.46-2.23.7-3.47.7-1.56 0-3.01-.29-4.34-.87-1.33-.61-2.49-1.44-3.47-2.48-.99-1.05-1.77-2.27-2.35-3.66-.55-1.42-.82-2.95-.82-4.58s.27-3.14.82-4.53c.58-1.42 1.36-2.66 2.35-3.71a10.45 10.45 0 0 1 3.47-2.44c1.33-.61 2.78-.92 4.34-.92 1.24 0 2.4.23 3.47.7 1.07.44 2.03 1.06 2.86 1.88v-1.88h6.64v-.02zm-11.77 15.87c1.36 0 2.47-.46 3.34-1.4.9-.93 1.35-2.12 1.35-3.57 0-1.45-.45-2.65-1.35-3.57-.87-.93-1.99-1.4-3.34-1.4-1.35 0-2.49.46-3.39 1.4-.87.93-1.31 2.12-1.31 3.57 0 1.45.44 2.65 1.31 3.57.9.93 2.03 1.4 3.39 1.4zM88.17 2.02c1.97 0 3.65.28 5.04.83 1.39.55 2.56 1.32 3.52 2.31.98 1.02 1.75 2.18 2.3 3.49.55 1.31.82 2.72.82 4.23 0 1.51-.27 2.92-.82 4.23a11.15 11.15 0 0 1-2.3 3.49c-.95.99-2.13 1.76-3.52 2.31-1.39.55-3.07.83-5.04.83h-3.6V34.9h-7.6V2.02h11.2zm-1.09 14.96c1.02 0 1.79-.1 2.35-.31.58-.23 1.06-.53 1.43-.87.78-.73 1.17-1.7 1.17-2.92s-.39-2.19-1.17-2.92c-.38-.35-.85-.63-1.43-.83-.55-.23-1.33-.35-2.35-.35h-2.52v8.2h2.52zM48.97 13.1h8.25l5.6 10.46h.09L67.9 13.1h7.64L59.17 45.98h-7.6l7.47-15.04L48.97 13.1zm-1.47 0v21.81h-6.64v-1.88c-.84.82-1.8 1.44-2.86 1.88-1.07.46-2.23.7-3.47.7-1.56 0-3.01-.29-4.34-.87-1.33-.61-2.49-1.44-3.47-2.48-.99-1.05-1.77-2.27-2.35-3.66-.55-1.42-.82-2.95-.82-4.58s.27-3.14.82-4.53c.58-1.42 1.36-2.66 2.35-3.71a10.35 10.35 0 0 1 3.47-2.44c1.33-.61 2.78-.92 4.34-.92 1.24 0 2.4.23 3.47.7 1.07.44 2.03 1.06 2.86 1.88v-1.88h6.64v-.02zM35.73 28.97c1.36 0 2.47-.46 3.35-1.4.9-.93 1.35-2.12 1.35-3.57 0-1.45-.45-2.65-1.35-3.57-.87-.93-1.99-1.4-3.35-1.4s-2.49.46-3.39 1.4c-.87.93-1.3 2.12-1.3 3.57 0 1.45.44 2.65 1.3 3.57.9.93 2.03 1.4 3.39 1.4zM13.2 2.02c1.97 0 3.65.28 5.04.83 1.39.55 2.56 1.32 3.52 2.31.98 1.02 1.75 2.18 2.3 3.49.55 1.31.82 2.72.82 4.23 0 1.51-.27 2.92-.82 4.23a11.15 11.15 0 0 1-2.3 3.49c-.95.99-2.13 1.76-3.52 2.31-1.39.55-3.07.83-5.04.83H9.6V34.9H2V2.02h11.2zm-1.08 14.96c1.02 0 1.79-.1 2.35-.31.58-.23 1.06-.53 1.43-.87.78-.73 1.17-1.7 1.17-2.92s-.39-2.19-1.17-2.92c-.38-.35-.85-.63-1.43-.83-.55-.23-1.33-.35-2.35-.35H9.6v8.2h2.52z"/></g><defs><clipPath id="a"><path fill="#fff" d="M2 2.02h131v43.96H2z"/></clipPath></defs></svg>');(()=>{let n=["title","intro","refresh","back","none","loading","error","login","request","pending","shared","collected","declined","open","reserved","closed","draft","empty","mine","close","wait","private","collect","confirm","map","imageError","unavailable","limit","saved","preview","choose"],e={ko:["\uC7A5\uAC11 \uB4DC\uB86D","\uB3C4\uC2DC\uB97C \uC120\uD0DD\uD558\uACE0, \uB098\uB9CC\uC758 \uC7A5\uAC11\uC744 \uCC3E\uC544\uBCF4\uC138\uC694.","\uC0C8\uB85C\uACE0\uCE68","\uB3C4\uC2DC \uBAA9\uB85D","\uC544\uC9C1 \uACF5\uAC1C\uB41C \uB4DC\uB86D\uC774 \uC5C6\uC5B4\uC694.","\uBD88\uB7EC\uC624\uB294 \uC911\u2026","\uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC5B4\uC694. \uC7A0\uC2DC \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694.","Google\uB85C \uB85C\uADF8\uC778","\uC704\uCE58 \uC694\uCCAD\uD558\uAE30","\uC694\uCCAD \uC811\uC218","\uC704\uCE58 \uB3C4\uCC29","\uC218\uB839 \uC644\uB8CC","\uC694\uCCAD \uB9C8\uAC10","\uC694\uCCAD \uAC00\uB2A5","\uC608\uC57D\uB428","\uB9C8\uAC10","\uC900\uBE44 \uC911","\uBBF8\uB4F1\uB85D","\uB0B4 \uC694\uCCAD","\uB2EB\uAE30","\uC694\uCCAD\uC774 \uC811\uC218\uB410\uC5B4\uC694. \uC704\uCE58 \uC548\uB0B4\uAC00 \uB3C4\uCC29\uD558\uBA74 \uC5EC\uAE30\uC5D0\uC11C \uD655\uC778\uD560 \uC218 \uC788\uC5B4\uC694.","\uC774 \uC704\uCE58\uB294 \uC120\uD0DD\uB41C \uACE0\uAC1D\uC5D0\uAC8C\uB9CC \uD45C\uC2DC\uB3FC\uC694.","\uC7A5\uAC11\uC744 \uCC3E\uC558\uC5B4\uC694","\uC2E4\uC81C\uB85C \uC7A5\uAC11\uC744 \uCC3E\uC558\uB098\uC694? \uC218\uB839 \uC644\uB8CC\uB85C \uAE30\uB85D\uD560\uAC8C\uC694.","\uD604\uC7AC \uC704\uCE58\uC5D0\uC11C \uAE38\uCC3E\uAE30","\uC0AC\uC9C4\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC5B4\uC694. \uC0C8\uB85C\uACE0\uCE68\uD574 \uC8FC\uC138\uC694.","\uC774 \uC7A5\uAC11\uC740 \uD604\uC7AC \uC694\uCCAD\uD560 \uC218 \uC5C6\uC5B4\uC694.","\uC694\uCCAD\uC774 \uB9CE\uC544\uC694. \uC7A0\uC2DC \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694.","\uC800\uC7A5\uD588\uC5B4\uC694.","\uC2DC\uC548 \xB7 \uC2E4\uC81C \uD53D\uC5C5 \uBD88\uAC00","\uBC88\uD638\uB97C \uC120\uD0DD\uD574 \uC8FC\uC138\uC694."],en:["Glove drop","Choose a city. Find your glove.","Refresh","Cities","No drops are available yet.","Loading\u2026","Could not load. Please try again.","Sign in with Google","Request location","Request received","Location received","Collected","Request closed","Available","Reserved","Closed","Preparing","Not listed","My requests","Close","Request received. Check here for your location reply.","This location is visible only to the selected recipient.","I found my glove","Have you collected the glove? Confirm pickup.","Directions from my location","Could not load the photo. Please refresh.","This glove is not available.","Too many requests. Please try again later.","Saved.","Preview \xB7 no pickup","Choose a number."],ja:["\u30B0\u30ED\u30FC\u30D6\u30C9\u30ED\u30C3\u30D7","\u90FD\u5E02\u3092\u9078\u3093\u3067\u3001\u81EA\u5206\u306E\u30B0\u30ED\u30FC\u30D6\u3092\u63A2\u305D\u3046\u3002","\u66F4\u65B0","\u90FD\u5E02\u4E00\u89A7","\u516C\u958B\u4E2D\u306E\u30C9\u30ED\u30C3\u30D7\u306F\u3042\u308A\u307E\u305B\u3093\u3002","\u8AAD\u307F\u8FBC\u307F\u4E2D\u2026","\u8AAD\u307F\u8FBC\u3081\u307E\u305B\u3093\u3067\u3057\u305F\u3002\u518D\u5EA6\u304A\u8A66\u3057\u304F\u3060\u3055\u3044\u3002","Google\u3067\u30ED\u30B0\u30A4\u30F3","\u5834\u6240\u3092\u30EA\u30AF\u30A8\u30B9\u30C8","\u30EA\u30AF\u30A8\u30B9\u30C8\u53D7\u4ED8\u6E08\u307F","\u5834\u6240\u304C\u5C4A\u304D\u307E\u3057\u305F","\u53D7\u53D6\u6E08\u307F","\u53D7\u4ED8\u7D42\u4E86","\u53D7\u4ED8\u4E2D","\u4E88\u7D04\u6E08\u307F","\u7D42\u4E86","\u6E96\u5099\u4E2D","\u672A\u767B\u9332","\u81EA\u5206\u306E\u30EA\u30AF\u30A8\u30B9\u30C8","\u9589\u3058\u308B","\u53D7\u3051\u4ED8\u3051\u307E\u3057\u305F\u3002\u5834\u6240\u306E\u6848\u5185\u306F\u3053\u3053\u3067\u78BA\u8A8D\u3067\u304D\u307E\u3059\u3002","\u5834\u6240\u306F\u9078\u3070\u308C\u305F\u53D7\u53D6\u4EBA\u3060\u3051\u306B\u8868\u793A\u3055\u308C\u307E\u3059\u3002","\u30B0\u30ED\u30FC\u30D6\u3092\u898B\u3064\u3051\u305F","\u5B9F\u969B\u306B\u53D7\u3051\u53D6\u308A\u307E\u3057\u305F\u304B\uFF1F\u53D7\u53D6\u5B8C\u4E86\u3068\u3057\u3066\u8A18\u9332\u3057\u307E\u3059\u3002","\u73FE\u5728\u5730\u304B\u3089\u306E\u7D4C\u8DEF","\u5199\u771F\u3092\u8AAD\u307F\u8FBC\u3081\u307E\u305B\u3093\u3002\u66F4\u65B0\u3057\u3066\u304F\u3060\u3055\u3044\u3002","\u3053\u306E\u30B0\u30ED\u30FC\u30D6\u306F\u53D7\u4ED8\u3067\u304D\u307E\u305B\u3093\u3002","\u30EA\u30AF\u30A8\u30B9\u30C8\u304C\u591A\u3059\u304E\u307E\u3059\u3002\u5F8C\u3067\u304A\u8A66\u3057\u304F\u3060\u3055\u3044\u3002","\u4FDD\u5B58\u3057\u307E\u3057\u305F\u3002","\u30D7\u30EC\u30D3\u30E5\u30FC\u30FB\u53D7\u53D6\u4E0D\u53EF","\u756A\u53F7\u3092\u9078\u3093\u3067\u304F\u3060\u3055\u3044\u3002"],zh:["\u624B\u5957\u6389\u843D","\u9009\u62E9\u57CE\u5E02\uFF0C\u5BFB\u627E\u5C5E\u4E8E\u4F60\u7684\u624B\u5957\u3002","\u5237\u65B0","\u57CE\u5E02\u5217\u8868","\u6682\u65E0\u516C\u5F00\u6389\u843D\u3002","\u52A0\u8F7D\u4E2D\u2026","\u52A0\u8F7D\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5\u3002","\u4F7F\u7528 Google \u767B\u5F55","\u7533\u8BF7\u4F4D\u7F6E","\u7533\u8BF7\u5DF2\u6536\u5230","\u4F4D\u7F6E\u5DF2\u9001\u8FBE","\u5DF2\u9886\u53D6","\u7533\u8BF7\u5DF2\u7ED3\u675F","\u53EF\u7533\u8BF7","\u5DF2\u9884\u7559","\u5DF2\u7ED3\u675F","\u51C6\u5907\u4E2D","\u672A\u4E0A\u67B6","\u6211\u7684\u7533\u8BF7","\u5173\u95ED","\u7533\u8BF7\u5DF2\u6536\u5230\u3002\u4F4D\u7F6E\u56DE\u590D\u4F1A\u663E\u793A\u5728\u8FD9\u91CC\u3002","\u6B64\u4F4D\u7F6E\u4EC5\u5411\u9009\u4E2D\u7684\u9886\u53D6\u8005\u663E\u793A\u3002","\u6211\u627E\u5230\u624B\u5957\u4E86","\u4F60\u5DF2\u7ECF\u9886\u53D6\u624B\u5957\u4E86\u5417\uFF1F\u786E\u8BA4\u540E\u5C06\u8BB0\u5F55\u4E3A\u5DF2\u9886\u53D6\u3002","\u4ECE\u5F53\u524D\u4F4D\u7F6E\u5BFC\u822A","\u7167\u7247\u52A0\u8F7D\u5931\u8D25\uFF0C\u8BF7\u5237\u65B0\u3002","\u6682\u65F6\u65E0\u6CD5\u7533\u8BF7\u8FD9\u53EA\u624B\u5957\u3002","\u7533\u8BF7\u8FC7\u591A\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002","\u5DF2\u4FDD\u5B58\u3002","\u9884\u89C8 \xB7 \u4E0D\u53EF\u9886\u53D6","\u8BF7\u9009\u62E9\u7F16\u53F7\u3002"],"zh-Hant":["\u624B\u5957\u6389\u843D","\u9078\u64C7\u57CE\u5E02\uFF0C\u5C0B\u627E\u5C6C\u65BC\u4F60\u7684\u624B\u5957\u3002","\u91CD\u65B0\u6574\u7406","\u57CE\u5E02\u5217\u8868","\u66AB\u7121\u516C\u958B\u6389\u843D\u3002","\u8F09\u5165\u4E2D\u2026","\u8F09\u5165\u5931\u6557\uFF0C\u8ACB\u91CD\u8A66\u3002","\u4F7F\u7528 Google \u767B\u5165","\u7533\u8ACB\u4F4D\u7F6E","\u7533\u8ACB\u5DF2\u6536\u5230","\u4F4D\u7F6E\u5DF2\u9001\u9054","\u5DF2\u9818\u53D6","\u7533\u8ACB\u5DF2\u7D50\u675F","\u53EF\u7533\u8ACB","\u5DF2\u9810\u7559","\u5DF2\u7D50\u675F","\u6E96\u5099\u4E2D","\u672A\u4E0A\u67B6","\u6211\u7684\u7533\u8ACB","\u95DC\u9589","\u7533\u8ACB\u5DF2\u6536\u5230\u3002\u4F4D\u7F6E\u56DE\u8986\u6703\u986F\u793A\u5728\u9019\u88E1\u3002","\u6B64\u4F4D\u7F6E\u50C5\u5411\u9078\u4E2D\u7684\u9818\u53D6\u8005\u986F\u793A\u3002","\u6211\u627E\u5230\u624B\u5957\u4E86","\u4F60\u5DF2\u7D93\u9818\u53D6\u624B\u5957\u4E86\u55CE\uFF1F\u78BA\u8A8D\u5F8C\u5C07\u8A18\u9304\u70BA\u5DF2\u9818\u53D6\u3002","\u5F9E\u76EE\u524D\u4F4D\u7F6E\u5C0E\u822A","\u7167\u7247\u8F09\u5165\u5931\u6557\uFF0C\u8ACB\u91CD\u65B0\u6574\u7406\u3002","\u66AB\u6642\u7121\u6CD5\u7533\u8ACB\u9019\u96BB\u624B\u5957\u3002","\u7533\u8ACB\u904E\u591A\uFF0C\u8ACB\u7A0D\u5F8C\u91CD\u8A66\u3002","\u5DF2\u5132\u5B58\u3002","\u9810\u89BD \xB7 \u4E0D\u53EF\u9818\u53D6","\u8ACB\u9078\u64C7\u7DE8\u865F\u3002"],ru:["\u0413\u0434\u0435 \u043F\u0435\u0440\u0447\u0430\u0442\u043A\u0430","\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0433\u043E\u0440\u043E\u0434. \u041D\u0430\u0439\u0434\u0438\u0442\u0435 \u0441\u0432\u043E\u044E \u043F\u0435\u0440\u0447\u0430\u0442\u043A\u0443.","\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C","\u0413\u043E\u0440\u043E\u0434\u0430","\u041F\u043E\u043A\u0430 \u043D\u0435\u0442 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0445 \u043F\u0435\u0440\u0447\u0430\u0442\u043E\u043A.","\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430\u2026","\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0451 \u0440\u0430\u0437.","\u0412\u043E\u0439\u0442\u0438 \u0447\u0435\u0440\u0435\u0437 Google","\u0417\u0430\u043F\u0440\u043E\u0441\u0438\u0442\u044C \u043C\u0435\u0441\u0442\u043E","\u0417\u0430\u043F\u0440\u043E\u0441 \u043F\u043E\u043B\u0443\u0447\u0435\u043D","\u041C\u0435\u0441\u0442\u043E \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u043E","\u041F\u043E\u043B\u0443\u0447\u0435\u043D\u043E","\u0417\u0430\u043F\u0440\u043E\u0441 \u0437\u0430\u043A\u0440\u044B\u0442","\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u043E","\u0417\u0430\u0440\u0435\u0437\u0435\u0440\u0432\u0438\u0440\u043E\u0432\u0430\u043D\u043E","\u0417\u0430\u043A\u0440\u044B\u0442\u043E","\u041F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u043A\u0430","\u041D\u0435 \u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u043E","\u041C\u043E\u0438 \u0437\u0430\u043F\u0440\u043E\u0441\u044B","\u0417\u0430\u043A\u0440\u044B\u0442\u044C","\u0417\u0430\u043F\u0440\u043E\u0441 \u043F\u043E\u043B\u0443\u0447\u0435\u043D. \u041E\u0442\u0432\u0435\u0442 \u0441 \u043C\u0435\u0441\u0442\u043E\u043C \u043F\u043E\u044F\u0432\u0438\u0442\u0441\u044F \u0437\u0434\u0435\u0441\u044C.","\u041C\u0435\u0441\u0442\u043E \u0432\u0438\u0434\u043D\u043E \u0442\u043E\u043B\u044C\u043A\u043E \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u043E\u043C\u0443 \u043F\u043E\u043B\u0443\u0447\u0430\u0442\u0435\u043B\u044E.","\u041F\u0435\u0440\u0447\u0430\u0442\u043A\u0430 \u043D\u0430\u0439\u0434\u0435\u043D\u0430","\u0412\u044B \u0437\u0430\u0431\u0440\u0430\u043B\u0438 \u043F\u0435\u0440\u0447\u0430\u0442\u043A\u0443? \u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0435.","\u041C\u0430\u0440\u0448\u0440\u0443\u0442 \u043E\u0442 \u043C\u0435\u043D\u044F","\u0424\u043E\u0442\u043E \u043D\u0435 \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u043B\u043E\u0441\u044C. \u041E\u0431\u043D\u043E\u0432\u0438\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443.","\u042D\u0442\u0430 \u043F\u0435\u0440\u0447\u0430\u0442\u043A\u0430 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0430.","\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u043C\u043D\u043E\u0433\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u043E\u0432. \u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u043F\u043E\u0437\u0436\u0435.","\u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043E.","\u041C\u0430\u043A\u0435\u0442 \xB7 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0435 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u043E","\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043D\u043E\u043C\u0435\u0440."],fr:["Glove drop","Choisissez une ville. Trouvez votre gant.","Actualiser","Villes","Aucun drop disponible pour le moment.","Chargement\u2026","Chargement impossible. R\xE9essayez.","Connexion avec Google","Demander le lieu","Demande re\xE7ue","Lieu re\xE7u","R\xE9cup\xE9r\xE9","Demande close","Disponible","R\xE9serv\xE9","Termin\xE9","En pr\xE9paration","Non propos\xE9","Mes demandes","Fermer","Demande re\xE7ue. La r\xE9ponse indiquant le lieu appara\xEEtra ici.","Ce lieu est visible uniquement par le destinataire choisi.","J\u2019ai trouv\xE9 mon gant","Avez-vous r\xE9cup\xE9r\xE9 le gant ? Confirmez la r\xE9cup\xE9ration.","Itin\xE9raire depuis ma position","Photo indisponible. Actualisez.","Ce gant n\u2019est pas disponible.","Trop de demandes. R\xE9essayez plus tard.","Enregistr\xE9.","Aper\xE7u \xB7 aucun retrait","Choisissez un num\xE9ro."],es:["Glove drop","Elige una ciudad. Encuentra tu guante.","Actualizar","Ciudades","A\xFAn no hay entregas disponibles.","Cargando\u2026","No se pudo cargar. Int\xE9ntalo de nuevo.","Entrar con Google","Solicitar ubicaci\xF3n","Solicitud recibida","Ubicaci\xF3n recibida","Recogido","Solicitud cerrada","Disponible","Reservado","Finalizado","En preparaci\xF3n","Sin publicar","Mis solicitudes","Cerrar","Solicitud recibida. La respuesta con la ubicaci\xF3n aparecer\xE1 aqu\xED.","Solo la persona elegida puede ver esta ubicaci\xF3n.","Encontr\xE9 mi guante","\xBFHas recogido el guante? Confirma la recogida.","Ruta desde mi ubicaci\xF3n","No se pudo cargar la foto. Actualiza.","Este guante no est\xE1 disponible.","Demasiadas solicitudes. Int\xE9ntalo m\xE1s tarde.","Guardado.","Vista previa \xB7 sin recogida","Elige un n\xFAmero."],de:["Glove drop","W\xE4hle eine Stadt. Finde deinen Handschuh.","Aktualisieren","St\xE4dte","Noch keine Drops verf\xFCgbar.","Wird geladen\u2026","Laden fehlgeschlagen. Bitte erneut versuchen.","Mit Google anmelden","Standort anfragen","Anfrage erhalten","Standort erhalten","Abgeholt","Anfrage geschlossen","Verf\xFCgbar","Reserviert","Beendet","In Vorbereitung","Nicht gelistet","Meine Anfragen","Schlie\xDFen","Anfrage erhalten. Die Antwort mit dem Standort erscheint hier.","Dieser Standort ist nur f\xFCr die ausgew\xE4hlte Person sichtbar.","Handschuh gefunden","Hast du den Handschuh abgeholt? Abholung best\xE4tigen.","Route ab meinem Standort","Foto nicht geladen. Bitte aktualisieren.","Dieser Handschuh ist nicht verf\xFCgbar.","Zu viele Anfragen. Bitte sp\xE4ter erneut versuchen.","Gespeichert.","Vorschau \xB7 keine Abholung","W\xE4hle eine Nummer."],pt:["Glove drop","Escolha uma cidade. Encontre sua luva.","Atualizar","Cidades","Ainda n\xE3o h\xE1 drops dispon\xEDveis.","Carregando\u2026","N\xE3o foi poss\xEDvel carregar. Tente novamente.","Entrar com Google","Solicitar localiza\xE7\xE3o","Solicita\xE7\xE3o recebida","Localiza\xE7\xE3o recebida","Retirado","Solicita\xE7\xE3o encerrada","Dispon\xEDvel","Reservado","Encerrado","Em prepara\xE7\xE3o","N\xE3o listado","Minhas solicita\xE7\xF5es","Fechar","Solicita\xE7\xE3o recebida. A resposta com a localiza\xE7\xE3o aparecer\xE1 aqui.","Esta localiza\xE7\xE3o s\xF3 aparece para a pessoa escolhida.","Encontrei minha luva","Voc\xEA retirou a luva? Confirme a retirada.","Rota da minha localiza\xE7\xE3o","N\xE3o foi poss\xEDvel carregar a foto. Atualize.","Esta luva n\xE3o est\xE1 dispon\xEDvel.","Muitas solicita\xE7\xF5es. Tente mais tarde.","Salvo.","Pr\xE9via \xB7 sem retirada","Escolha um n\xFAmero."],it:["Glove drop","Scegli una citt\xE0. Trova il tuo guanto.","Aggiorna","Citt\xE0","Nessun drop ancora disponibile.","Caricamento\u2026","Impossibile caricare. Riprova.","Accedi con Google","Richiedi posizione","Richiesta ricevuta","Posizione ricevuta","Ritirato","Richiesta chiusa","Disponibile","Riservato","Terminato","In preparazione","Non pubblicato","Le mie richieste","Chiudi","Richiesta ricevuta. La risposta con la posizione apparir\xE0 qui.","La posizione \xE8 visibile solo alla persona scelta.","Ho trovato il guanto","Hai ritirato il guanto? Conferma il ritiro.","Indicazioni dalla mia posizione","Impossibile caricare la foto. Aggiorna.","Questo guanto non \xE8 disponibile.","Troppe richieste. Riprova pi\xF9 tardi.","Salvato.","Anteprima \xB7 ritiro non disponibile","Scegli un numero."]};window.SKMGloveText=t=>{let i=n.indexOf(t);return e[window.SKMLanguage?.code]?.[i]||e.en[i]||t}})();var Hl=Vr(zl()),lr=Vr(rg());var tb=["ko","en","ja","zh","zh-Hant","ru","fr","es","de","pt","it"],nb={decrease:["1\uB2EC\uB7EC \uC904\uC774\uAE30","Decrease by 1 US dollar","1\u7C73\u30C9\u30EB\u6E1B\u3089\u3059","\u51CF\u5C111\u7F8E\u5143","\u6E1B\u5C111\u7F8E\u5143","\u0423\u043C\u0435\u043D\u044C\u0448\u0438\u0442\u044C \u043D\u0430 1 \u0434\u043E\u043B\u043B\u0430\u0440","R\xE9duire de 1 dollar US","Reducir 1 d\xF3lar estadounidense","Um 1 US-Dollar verringern","Diminuir 1 d\xF3lar americano","Riduci di 1 dollaro USA"],increase:["1\uB2EC\uB7EC \uB298\uB9AC\uAE30","Increase by 1 US dollar","1\u7C73\u30C9\u30EB\u5897\u3084\u3059","\u589E\u52A01\u7F8E\u5143","\u589E\u52A01\u7F8E\u5143","\u0423\u0432\u0435\u043B\u0438\u0447\u0438\u0442\u044C \u043D\u0430 1 \u0434\u043E\u043B\u043B\u0430\u0440","Ajouter 1 dollar US","A\xF1adir 1 d\xF3lar estadounidense","Um 1 US-Dollar erh\xF6hen","Adicionar 1 d\xF3lar americano","Aumenta di 1 dollaro USA"],close:["\uB2EB\uAE30","Close","\u9589\u3058\u308B","\u5173\u95ED","\u95DC\u9589","\u0417\u0430\u043A\u0440\u044B\u0442\u044C","Fermer","Cerrar","Schlie\xDFen","Fechar","Chiudi"],pickupSoon:["\uC2A4\uD29C\uB514\uC624\xB7\uD53D\uC5C5 \uC77C\uC815\uC740 \uCD94\uD6C4 \uC548\uB0B4","Studio and pickup times to be announced","\u30B9\u30BF\u30B8\u30AA\u30FB\u53D7\u53D6\u65E5\u6642\u306F\u5F8C\u65E5\u6848\u5185","\u5DE5\u4F5C\u5BA4\u53CA\u81EA\u53D6\u65F6\u95F4\u7A0D\u540E\u516C\u5E03","\u5DE5\u4F5C\u5BA4\u53CA\u81EA\u53D6\u6642\u9593\u7A0D\u5F8C\u516C\u5E03","\u0421\u0442\u0443\u0434\u0438\u044F \u0438 \u0432\u0440\u0435\u043C\u044F \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0431\u0443\u0434\u0443\u0442 \u043E\u0431\u044A\u044F\u0432\u043B\u0435\u043D\u044B","Studio et horaires de retrait \xE0 venir","Estudio y horario de recogida por anunciar","Studio und Abholzeiten folgen","Est\xFAdio e hor\xE1rios ser\xE3o anunciados","Studio e orari di ritiro da annunciare"],price:["\uC6D0\uD558\uB294 \uAE08\uC561","Your price","\u5E0C\u671B\u91D1\u984D","\u81EA\u9009\u91D1\u989D","\u81EA\u9078\u91D1\u984D","\u0412\u0430\u0448\u0430 \u0446\u0435\u043D\u0430","Votre montant","Tu precio","Dein Betrag","Seu valor","Il tuo prezzo"],minimum:["US$10 \uC774\uC0C1, \uC6D0\uD558\uB294 \uB9CC\uD07C","US$10 minimum. You choose.","US$10\u4EE5\u4E0A\u3001\u304A\u597D\u304D\u306A\u91D1\u984D","\u6700\u4F4E US$10\uFF0C\u91D1\u989D\u81EA\u5B9A","\u6700\u4F4E US$10\uFF0C\u91D1\u984D\u81EA\u8A02","\u041E\u0442 US$10, \u0441\u0443\u043C\u043C\u0443 \u0432\u044B\u0431\u0438\u0440\u0430\u0435\u0442\u0435 \u0432\u044B","\xC0 partir de US$10, \xE0 votre choix","Desde US$10, t\xFA eliges","Ab US$10, du entscheidest","A partir de US$10, voc\xEA escolhe","Da US$10, scegli tu"],pickup:["\uD604\uC7A5 \uD53D\uC5C5 \uC804\uC6A9 \xB7 \uBC30\uC1A1 \uC5C6\uC74C","Pickup at the drop only \xB7 no shipping","\u73FE\u5730\u53D7\u53D6\u306E\u307F\u30FB\u914D\u9001\u306A\u3057","\u4EC5\u9650\u5230\u6389\u843D\u5730\u70B9\u81EA\u53D6 \xB7 \u4E0D\u914D\u9001","\u50C5\u9650\u5230\u6389\u843D\u5730\u9EDE\u81EA\u53D6 \xB7 \u4E0D\u914D\u9001","\u0422\u043E\u043B\u044C\u043A\u043E \u0441\u0430\u043C\u043E\u0432\u044B\u0432\u043E\u0437 \xB7 \u0431\u0435\u0437 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438","Retrait sur place uniquement \xB7 sans livraison","Solo recogida en el lugar \xB7 sin env\xEDos","Nur Abholung am Drop \xB7 kein Versand","Retirada no local \xB7 sem envio","Solo ritiro sul posto \xB7 nessuna spedizione"],buy:["PayPal\uB85C \uAD6C\uB9E4","Buy with PayPal","PayPal\u3067\u8CFC\u5165","\u4F7F\u7528 PayPal \u8D2D\u4E70","\u4F7F\u7528 PayPal \u8CFC\u8CB7","\u041A\u0443\u043F\u0438\u0442\u044C \u0447\u0435\u0440\u0435\u0437 PayPal","Acheter avec PayPal","Comprar con PayPal","Mit PayPal kaufen","Comprar com PayPal","Acquista con PayPal"],held:["\uB4DC\uB86D \uC900\uBE44 \uC911","Drop coming soon","\u30C9\u30ED\u30C3\u30D7\u6E96\u5099\u4E2D","\u6389\u843D\u7B79\u5907\u4E2D","\u6389\u843D\u7C4C\u5099\u4E2D","\u0421\u043A\u043E\u0440\u043E \u0432 \u0434\u043E\u0441\u0442\u0443\u043F\u0435","Drop \xE0 venir","Pr\xF3ximamente","Drop in Vorbereitung","Em breve","Drop in arrivo"],login:["\uB85C\uADF8\uC778\uD558\uACE0 \uAD6C\uB9E4","Sign in to buy","\u30ED\u30B0\u30A4\u30F3\u3057\u3066\u8CFC\u5165","\u767B\u5F55\u8D2D\u4E70","\u767B\u5165\u8CFC\u8CB7","\u0412\u043E\u0439\u0442\u0438 \u0434\u043B\u044F \u043F\u043E\u043A\u0443\u043F\u043A\u0438","Se connecter pour acheter","Entrar para comprar","Zum Kauf anmelden","Entrar para comprar","Accedi per acquistare"],request:["\uD53D\uC5C5 \uC2E0\uCCAD","Request pickup","\u53D7\u53D6\u3092\u7533\u3057\u8FBC\u3080","\u7533\u8BF7\u81EA\u53D6","\u7533\u8ACB\u81EA\u53D6","\u0417\u0430\u043F\u0440\u043E\u0441\u0438\u0442\u044C \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0435","Demander le retrait","Solicitar recogida","Abholung anfragen","Solicitar retirada","Richiedi il ritiro"],pending:["\uD53D\uC5C5 \uD655\uC778 \uC911","Pickup request pending","\u53D7\u53D6\u78BA\u8A8D\u5F85\u3061","\u7B49\u5F85\u786E\u8BA4\u81EA\u53D6","\u7B49\u5F85\u78BA\u8A8D\u81EA\u53D6","\u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F","Retrait en attente","Recogida pendiente","Abholung ausstehend","Retirada pendente","Ritiro in attesa"],invalid:["US$10 \uC774\uC0C1, \uC18C\uC218\uC810 \uB450 \uC790\uB9AC\uAE4C\uC9C0 \uC785\uB825\uD574 \uC8FC\uC138\uC694.","Enter at least US$10, with up to two decimal places.","US$10\u4EE5\u4E0A\u3001\u5C0F\u6570\u70B9\u4EE5\u4E0B2\u6841\u307E\u3067\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002","\u8BF7\u8F93\u5165\u81F3\u5C11 US$10\uFF0C\u6700\u591A\u4E24\u4F4D\u5C0F\u6570\u3002","\u8ACB\u8F38\u5165\u81F3\u5C11 US$10\uFF0C\u6700\u591A\u5169\u4F4D\u5C0F\u6578\u3002","\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043E\u0442 US$10, \u043D\u0435 \u0431\u043E\u043B\u0435\u0435 \u0434\u0432\u0443\u0445 \u0437\u043D\u0430\u043A\u043E\u0432 \u043F\u043E\u0441\u043B\u0435 \u0437\u0430\u043F\u044F\u0442\u043E\u0439.","Saisissez au moins US$10, avec deux d\xE9cimales maximum.","Introduce al menos US$10, con hasta dos decimales.","Mindestens US$10, mit h\xF6chstens zwei Nachkommastellen.","Insira pelo menos US$10, com at\xE9 duas casas decimais.","Inserisci almeno US$10, con massimo due decimali."],verify:["\uC785\uAE08\uC740 \uC2A4\uD29C\uB514\uC624\uC5D0\uC11C \uD655\uC778\uD574\uC694.","The studio confirms payment.","\u5165\u91D1\u306F\u30B9\u30BF\u30B8\u30AA\u304C\u78BA\u8A8D\u3057\u307E\u3059\u3002","\u4ED8\u6B3E\u7531\u5DE5\u4F5C\u5BA4\u786E\u8BA4\u3002","\u4ED8\u6B3E\u7531\u5DE5\u4F5C\u5BA4\u78BA\u8A8D\u3002","\u0421\u0442\u0443\u0434\u0438\u044F \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0430\u0435\u0442 \u043E\u043F\u043B\u0430\u0442\u0443.","Le studio confirme le paiement.","El estudio confirma el pago.","Das Studio best\xE4tigt die Zahlung.","O est\xFAdio confirma o pagamento.","Lo studio conferma il pagamento."],memo:["PayPal \uBA54\uBAA8","PayPal note","PayPal\u306E\u30E1\u30E2","PayPal \u5907\u6CE8","PayPal \u5099\u8A3B","\u041F\u0440\u0438\u043C\u0435\u0447\u0430\u043D\u0438\u0435 PayPal","Note PayPal","Nota de PayPal","PayPal-Notiz","Nota do PayPal","Nota PayPal"],check:["\uD655\uC778 \uC911\u2026","Checking\u2026","\u78BA\u8A8D\u4E2D\u2026","\u6B63\u5728\u786E\u8BA4\u2026","\u6B63\u5728\u78BA\u8A8D\u2026","\u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430\u2026","V\xE9rification\u2026","Comprobando\u2026","Wird gepr\xFCft\u2026","Verificando\u2026","Verifica\u2026"],owner:["\uBCF4\uC720\uC790\uC5D0\uAC8C \uBB38\uC758","Contact owner","\u6240\u6709\u8005\u306B\u554F\u3044\u5408\u308F\u305B","\u8054\u7CFB\u6301\u6709\u8005","\u806F\u7D61\u6301\u6709\u8005","\u0421\u0432\u044F\u0437\u0430\u0442\u044C\u0441\u044F \u0441 \u0432\u043B\u0430\u0434\u0435\u043B\u044C\u0446\u0435\u043C","Contacter le propri\xE9taire","Contactar al propietario","Eigent\xFCmer kontaktieren","Contatar propriet\xE1rio","Contatta il proprietario"]},Xt=n=>nb[n]?.[Math.max(0,tb.indexOf(window.SKMLanguage?.code||"en"))]||n;var qn=n=>window.SKMGloveText(n);function _t(n,e,t){let i=document.createElement(n);return e!=null&&(i.textContent=e),t&&(i.className=t),i}function ib(n,e){let t=_t("a",n,"glove-map-link");return t.href=e,t.target="_blank",t.rel="noopener noreferrer",t}function pd(n,{city:e,number:t,itemName:i="",live:r=!1,preview:o=!1,onState:a,navigate:s,locationHost:l=null,pickupPlan:u=null}){let c=window.SKMBooking,f=()=>c?.session()?.user?.id||null,d=!!l,h=0,m=!1,x="10",g=!1,p=(L,b)=>!m&&L===h&&f()===b&&n.isConnected,_=_t("div",null,"glove-purchase");n.replaceChildren(_);function y(L,b){if(!l)return;l.replaceChildren();let S=[u?.address||e.label,u?.area].filter(Boolean).join(" \xB7 "),T=L==="pay"&&b.request.reply||S;l.append(_t("p",T,"glove-pickup-address"))}function v(L,b,S,T){y(L,b);let O=_t("form",null,"glove-purchase-form");O.noValidate=!0;let F=_t("div",null,"glove-price-label");d||F.append(_t("span",Xt("price")));let H=_t("span",null,"glove-price-field"),U=_t("button","\u2212","glove-price-step"),N=_t("button","+","glove-price-step");U.type=N.type="button",U.setAttribute("aria-label",Xt("decrease")),N.setAttribute("aria-label",Xt("increase"));let te=_t("span",null,"glove-price-value");te.append(_t("span","USD"));let D=_t("input");D.type="text",D.inputMode="decimal",D.autocomplete="off",D.value=x,D.required=!0,D.maxLength=18,D.setAttribute("aria-label",Xt("price")),te.append(D),H.append(U,te,N),F.append(H);let k=_t("p",Xt("minimum"),d?"glove-sr-only":"glove-pickup-note");k.id="glove-price-help",D.setAttribute("aria-describedby",k.id);let J=_t("p",Xt("pickup"),"glove-pickup-only"),$=_t("button",null,"glove-buy-button");$.type="submit";let re=_t("span");if($.append(re),!d){let ue=_t("span","\u2197");ue.setAttribute("aria-hidden","true"),$.append(ue)}let le=_t("p",null,"glove-purchase-status");le.setAttribute("role","status"),le.setAttribute("aria-live","polite");let q=["pay","login","request"].includes(L),W={pay:"buy",held:"held",login:"login",request:"request",pending:"pending"},j=W[L]?Xt(W[L]):qn(L==="preview"?"preview":"unavailable"),oe=ue=>{if(!d){re.textContent=ue;return}$.classList.add("glove-paypal-button"),re.className="glove-paypal-brand",re.replaceChildren();for(let[Ce,Te]of[[eg,"glove-paypal-mark"],[tg,"glove-paypal-wordmark"]]){let Pe=_t("img",null,Te);Pe.src=Ce,Pe.alt="",Pe.draggable=!1,re.append(Pe)}};oe(j),d&&($.title=j,$.setAttribute("aria-label","PayPal \xB7 "+j)),$.disabled=!q,D.disabled=g;let de=()=>{let ue=lr.default.usdAmount(D.value);U.disabled=g||ue==="10.00",N.disabled=g},me=ue=>{if(g||!p(S,T))return;let Ce=lr.default.stepUsdAmount(D.value,ue);x=Ce.endsWith(".00")?Ce.slice(0,-3):Ce,D.value=x,D.removeAttribute("aria-invalid"),le.textContent="",de(),window.SKMApp?.haptic?.("light")};if(U.onclick=()=>me(-1),N.onclick=()=>me(1),de(),D.onblur=()=>{lr.default.usdAmount(D.value)||(D.setAttribute("aria-invalid","true"),le.textContent=Xt("invalid"))},D.oninput=()=>{x=D.value,D.removeAttribute("aria-invalid"),le.textContent="",de()},O.append(F,k),l||O.append(J),L==="pay"&&!l){let ue=_t("p",b.request.reply||qn("shared"),"glove-pickup-address private-note");O.append(ue,ib(qn("map"),Hl.default.pickupLink(b.request,!0)))}if(O.append($,le),_.append(O),L==="pay"&&!d){_.append(_t("p",Xt("memo")+": "+i,"glove-pickup-note"),_t("p",Xt("verify"),"glove-pickup-note"));let ue=_t("button",qn("collect"),"glove-map-link glove-confirm-pickup");ue.type="button",ue.onclick=async()=>{if(!(g||!p(S,T)||!window.confirm(qn("confirm")))){g=!0,ue.disabled=!0;try{await c.gloveCollect(b.request.id),p(S,T)&&await R()}catch{p(S,T)&&(ue.disabled=!1,le.textContent=qn("error"))}finally{g=!1}}},_.append(ue)}O.onsubmit=async ue=>{if(ue.preventDefault(),g||!q||!p(S,T))return;let Ce=lr.default.paypalURL(D.value);if(!Ce){D.setAttribute("aria-invalid","true"),le.textContent=Xt("invalid"),D.focus();return}if(L==="login"){s("app/login.html?next=account");return}g=!0,$.disabled=!0,$.setAttribute("aria-busy","true"),d||(re.textContent=Xt("check")),D.disabled=!0,de();try{let Te=await c.dropLive();if(!p(S,T))return;let Pe=Hl.default.pickupForPair(await c.gloveList(),e,t);if(!p(S,T))return;if(lr.default.checkoutState({live:Te===!0,preview:o,userId:T,info:Pe})!==L||Pe?.drop.id!==b?.drop.id||Pe?.request?.id!==b?.request?.id){await R();return}if(L==="request"){await c.gloveRequest(b.drop.id),p(S,T)&&await R();return}d||(le.textContent=Xt("verify"));let Oe=document.createElement("a");Oe.href=Ce,Oe.rel="noreferrer",Oe.hidden=!0,_.append(Oe),Oe.click(),Oe.remove()}catch{p(S,T)&&(le.textContent=qn("error"))}finally{g=!1,p(S,T)&&($.disabled=!1,$.removeAttribute("aria-busy"),D.disabled=!1,oe(Xt(W[L])),de())}}}async function R(){let L=++h,b=f();_.replaceChildren(),y("held",null);let S=null,T=r;if(o||!T||!b){v(lr.default.checkoutState({live:T,preview:o,userId:b,info:S}),S,L,b);return}_.append(_t("p",qn("loading"),"glove-pickup-note"));try{if(T=await c.dropLive(),!p(L,b))return;T&&(S=Hl.default.pickupForPair(await c.gloveList(),e,t))}catch{if(p(L,b)){let F=_t("button",qn("refresh"),"glove-map-link");F.type="button",F.onclick=R,_.replaceChildren(_t("p",qn("error"),"glove-pickup-note"),F)}return}if(!p(L,b))return;_.replaceChildren(),S&&a?.(S.drop.status,S.request?.status);let O=lr.default.checkoutState({live:T===!0,preview:o,userId:b,info:S});if(O==="owner"){try{let F=await c.community("owner",{kind:"glove",id:S.drop.id});if(!p(L,b))return;_.append(_t("strong",F.name||qn("mine"))),F.email&&_.append(_t("p",F.email,"glove-pickup-note"));let H=_t("button",Xt("owner"),"glove-buy-button");H.type="button",H.onclick=()=>{p(L,b)&&s(F.mine?"app/community.html?view=profile":"app/community.html?view=thread&kind=glove&subject="+encodeURIComponent(S.drop.id))},_.append(H)}catch{p(L,b)&&_.append(_t("p",qn("collected"),"glove-pickup-note"))}return}v(O,S,L,b)}function E(){document.hidden?(h++,_.replaceChildren(),l?.replaceChildren()):R()}function P(L){(!L.key||L.key==="skm-customer-session-v1")&&R()}return document.addEventListener("visibilitychange",E),window.addEventListener("storage",P),window.addEventListener("skm-account-changed",R),window.addEventListener("skm-language",R),R(),()=>{m=!0,h++,n.replaceChildren(),l?.replaceChildren(),document.removeEventListener("visibilitychange",E),window.removeEventListener("storage",P),window.removeEventListener("skm-account-changed",R),window.removeEventListener("skm-language",R)}}var fg=Vr(ag());var sg=(n,e,t=[])=>{let i=document.createElementNS("http://www.w3.org/2000/svg",n);return Object.keys(e).forEach(r=>{i.setAttribute(r,String(e[r]))}),t.length&&t.forEach(r=>{let o=sg(...r);i.appendChild(o)}),i},Pa=([n,e,t])=>sg(n,e,t);var ob=n=>Array.from(n.attributes).reduce((e,t)=>(e[t.name]=t.value,e),{}),ab=n=>typeof n=="string"?n:!n||!n.class?"":n.class&&typeof n.class=="string"?n.class.split(" "):n.class&&Array.isArray(n.class)?n.class:"",sb=n=>n.flatMap(ab).map(t=>t.trim()).filter(Boolean).filter((t,i,r)=>r.indexOf(t)===i).join(" "),lb=n=>n.replace(/(\w)(\w*)(_|-|\s*)/g,(e,t,i)=>t.toUpperCase()+i.toLowerCase()),md=(n,{nameAttr:e,icons:t,attrs:i})=>{let r=n.getAttribute(e);if(r==null)return;let o=lb(r),a=t[o];if(!a)return console.warn(`${n.outerHTML} icon name was not found in the provided icons object.`);let s=ob(n),[l,u,c]=a,f={...u,"data-lucide":r,...i,...s},d=sb(["lucide",`lucide-${r}`,s,i]);d&&Object.assign(f,{class:d});let h=Pa([l,f,c]);return n.parentNode?.replaceChild(h,n)};var dt={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};var Ia=["svg",dt,[["path",{d:"m12 19-7-7 7-7"}],["path",{d:"M19 12H5"}]]];var La=["svg",dt,[["path",{d:"M7 7h10v10"}],["path",{d:"M7 17 17 7"}]]];var gd=["svg",dt,[["path",{d:"m9 18 6-6-6-6"}]]];var Vl=["svg",dt,[["path",{d:"M12 3v18"}],["path",{d:"M3 12h18"}],["rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}]]];var To=["svg",dt,[["path",{d:"M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"}],["path",{d:"M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"}],["path",{d:"M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"}],["path",{d:"M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"}]]];var xd=["svg",dt,[["path",{d:"M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"}]]];var vd=["svg",dt,[["path",{d:"m5 8 6 6"}],["path",{d:"m4 14 6-6 2-3"}],["path",{d:"M2 5h12"}],["path",{d:"M7 2h1"}],["path",{d:"m22 22-5-10-5 10"}],["path",{d:"M14 18h6"}]]];var Da=["svg",dt,[["circle",{cx:"12",cy:"16",r:"1"}],["rect",{x:"3",y:"10",width:"18",height:"12",rx:"2"}],["path",{d:"M7 10V7a5 5 0 0 1 10 0v3"}]]];var yd=["svg",dt,[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"}],["circle",{cx:"12",cy:"10",r:"3"}]]];var _d=["svg",dt,[["path",{d:"M5 12h14"}]]];var Gl=["svg",dt,[["path",{d:"M5 3v16h16"}],["path",{d:"m5 19 6-6"}],["path",{d:"m2 6 3-3 3 3"}],["path",{d:"m18 16 3 3-3 3"}]]];var Md=["svg",dt,[["path",{d:"M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z"}],["path",{d:"m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18"}],["path",{d:"m2.3 2.3 7.286 7.286"}],["circle",{cx:"11",cy:"11",r:"2"}]]];var Sd=["svg",dt,[["polygon",{points:"6 3 20 12 6 21 6 3"}]]];var bd=["svg",dt,[["path",{d:"M5 12h14"}],["path",{d:"M12 5v14"}]]];var wd=["svg",dt,[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"}],["path",{d:"m21.854 2.147-10.94 10.939"}]]];var Co=["svg",dt,[["circle",{cx:"12",cy:"8",r:"5"}],["path",{d:"M20 21a8 8 0 0 0-16 0"}]]];var Ua=["svg",dt,[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]]];var Wl=({icons:n={},nameAttr:e="data-lucide",attrs:t={}}={})=>{if(!Object.values(n).length)throw new Error(`Please provide an icons object.
If you want to use all the icons you can import it like:
 \`import { createIcons, icons } from 'lucide';
lucide.createIcons({icons});\``);if(typeof document>"u")throw new Error("`createIcons()` only works in a browser environment.");let i=document.querySelectorAll(`[${e}]`);if(Array.from(i).forEach(r=>md(r,{nameAttr:e,icons:n,attrs:t})),e==="data-lucide"){let r=document.querySelectorAll("[icon-name]");r.length>0&&(console.warn("[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide"),Array.from(r).forEach(o=>md(o,{nameAttr:"icon-name",icons:n,attrs:t})))}};var Na={1835848:{code:"STG-01",pairs:50,phase:1,window:"2026.11 \xB7 \uCCAB \uB4DC\uB86D \uC608\uC815",photo:"app/earth-assets/gloves/stg-01.jpg",print:"app/earth-assets/gloves/stg-01-print.svg"},1850147:{code:"STG-02",pairs:50,phase:3,window:"\uD64D\uCF69 \uB2E4\uC74C \xB7 \uC77C\uBCF8 \uB4DC\uB86D \uC608\uC815",photo:null},1853909:{code:null,pairs:50,phase:3,window:"\uD64D\uCF69 \uB2E4\uC74C \xB7 \uC77C\uBCF8 \uB4DC\uB86D \uC608\uC815",photo:null},1819729:{code:"STG-04",pairs:50,phase:2,window:"\uC11C\uC6B8 \uB2E4\uC74C \xB7 \uD64D\uCF69 \uB4DC\uB86D \uC608\uC815",photo:null},6167865:{code:null,pairs:50,phase:4,window:"\uC77C\uBCF8 \uB2E4\uC74C \xB7 \uD1A0\uB860\uD1A0 \uB4DC\uB86D \uC608\uC815",photo:null},6173331:{code:"STG-06",pairs:50,phase:null,window:"\uB4DC\uB86D \uC77C\uC815 \uC900\uBE44 \uC911",photo:null},6077243:{code:"STG-07",pairs:50,phase:null,window:"\uB4DC\uB86D \uC77C\uC815 \uC900\uBE44 \uC911",photo:null},5128581:{code:"STG-05",pairs:50,phase:null,window:"\uB4DC\uB86D \uC77C\uC815 \uC900\uBE44 \uC911",photo:"app/earth-assets/gloves/stg-05.jpg",print:"app/earth-assets/gloves/stg-05-print.svg",model:"models/skm-product.glb",publicPickup:{address:"17-17 Troutman Street",area:"Ridgewood, New York",confirmed:!1}},5368361:{code:"STG-09",pairs:50,phase:null,window:"\uB4DC\uB86D \uC77C\uC815 \uC900\uBE44 \uC911",photo:null}};var Xl=Vr(zl());var lg=()=>Wl({icons:{Hand:To,MapPin:yd,ArrowUpRight:La,ArrowLeft:Ia,Send:wd,X:Ua,UserRound:Co,LockKeyhole:Da}}),it=(n,e,t)=>{let i=document.createElement(n);return e!=null&&(i.textContent=e),t&&(i.className=t),i},ql=n=>{let e=it("i");return e.dataset.lucide=n,e.setAttribute("aria-hidden","true"),e};function Fa(n,e,t=""){let i=it("button",n,t);return i.type="button",i.onclick=e,i}function Yl(n="",e){let t=it("span",null,"glove-pair-art "+n);for(let i=0;i<2;i++){let r=Pa(To);if(r.setAttribute("aria-hidden","true"),e){let o=document.createElementNS("http://www.w3.org/2000/svg","image");o.setAttribute("href",e),o.setAttribute("x","7.4"),o.setAttribute("y","9.5"),o.setAttribute("width","13.2"),o.setAttribute("height","12.2"),r.append(o)}t.append(r)}return t}function Ad(n){if(!n?.photo)return Yl("glove-large-art");let e=it("img",null,"glove-detail-photo");return e.alt=n.code,e.onerror=()=>e.replaceWith(Yl("glove-large-art",n.print)),e.src=n.photo,e}var cg=(n,e,t)=>"skm-glove-direct-preview-v1:"+(n==="5128581"?"STG-08":e)+":"+t;function dg(n,e){let t=n.querySelector(".earth-drop-panel"),i=t.querySelector(".earth-drop-grid"),r=it("dialog",null,"glove-direct-sheet");r.setAttribute("aria-label","\uC7A5\uAC11"),n.querySelector(".earth-app").append(r);let o=null,a=null,s=[],l=null,u=0,c=0,f=["#d46682","#cf9644","#a0a044","#559a76","#439fb9","#5f7fc3","#a06db5"],d=D=>["owned","sold","collected"].includes(D);function h(){let D=i.clientWidth,k=i.clientHeight;if(!l||!s.length||D<1||k<1||u===D&&c===k)return;u=D,c=k;let J=Math.max(1,Math.min(k-1,window.innerHeight/2-i.getBoundingClientRect().top)),$=(0,fg.gloveNetwork)(s.length,D,2*Math.min(J,k-J)),re=J-$.height/2;$.center.y+=re;for(let le of $.points)le.y+=re;i.style.setProperty("--glove-scale",$.scale),i.querySelector(".glove-network-hub").style.top=J/k*100+"%",l.setAttribute("viewBox","0 0 "+D+" "+k),l.replaceChildren(),$.points.forEach((le,q)=>{let W=s[q];W.style.left=le.x/$.width*100+"%",W.style.top=le.y/k*100+"%",W.style.setProperty("--from-x",$.center.x-le.x+"px"),W.style.setProperty("--from-y",$.center.y-le.y+"px"),W.style.setProperty("--spread-delay",q*5+"ms");let j=document.createElementNS("http://www.w3.org/2000/svg","line");j.setAttribute("x1",$.center.x),j.setAttribute("y1",$.center.y),j.setAttribute("x2",le.x),j.setAttribute("y2",le.y),j.setAttribute("stroke",f[q%f.length]),j.setAttribute("pathLength","1"),j.dataset.to=String(q+1),j.dataset.owned=String(d(W.dataset.status)),l.append(j)})}let m=new ResizeObserver(h);m.observe(i);let x=null;function g(){x?.(),x=null}let p=()=>{F(),g(),r.close(),a=null};r.addEventListener("close",()=>{r.open||g()});let _=0,y=0,v=!1;async function R(){let D=++_,k=window.SKMBooking,J=k?.session()?.user?.id,$=o;if(!(!v||!$||t.hidden||!J||P&&P===Na[$.id]?.code))try{let re=await k.gloveList();if(D!==_||t.hidden||o!==$||k.session()?.user?.id!==J)return;for(let[le,q]of s.entries()){let W=Xl.default.pickupForPair(re,$,le+1),j=W?.drop.status||"draft";q.dataset.status=j;let oe=W?window.SKMGloveText(W.request?.status||j):window.SKMGloveText("draft");q.setAttribute("aria-label",q.dataset.itemName+" \xB7 "+oe);let de=l?.children[le];de&&(de.dataset.owned=String(d(j)))}}catch{}}function E(D){let k=++y;if(D||p(),t.hidden=!D,D){n.scrollTop=0,t.scrollTop=0,u=0,h();let J=window.SKMBooking?.dropLive;J&&J().catch(()=>!1).then($=>{k!==y||t.hidden||(v!==($===!0)&&(v=$===!0,L(o),h()),R())})}}r.addEventListener("click",D=>{if(D.target===r){let k=r.getBoundingClientRect();(D.clientX<k.left||D.clientX>k.right||D.clientY<k.top||D.clientY>k.bottom)&&p()}}),window.addEventListener("pagehide",()=>{p(),m.disconnect()}),window.addEventListener("pageshow",()=>{m.observe(i),h()});let P=new URLSearchParams(location.search).get("gloves"),L=D=>{o=D,p();let k=Na[o.id],J=o.label.toLowerCase().replace(/\b[a-z]/g,oe=>oe.toUpperCase()),$=o.ko||J;t.querySelector("h2").replaceChildren(document.createTextNode($));let le=!!(v&&k?.code&&k.code===P);i.replaceChildren(),s=[],u=0,c=0,i.setAttribute("aria-label",o.ko+" \uC7A5\uAC11"),l=document.createElementNS("http://www.w3.org/2000/svg","svg"),l.classList.add("glove-network-lines"),l.setAttribute("aria-hidden","true"),l.setAttribute("preserveAspectRatio","none");let q=it("div",null,"glove-network-hub"),W=it("img");W.src="app/logo-transparent.png",W.alt="SKINOMAKASE",q.append(W),i.append(l,q);let j=k?.pairs??50;for(let oe=1;oe<=j;oe++){let de=le?Xl.default.previewSlot(oe):"draft",me=Xl.default.routeGlove({status:de,preview:le}),ue=k?.code?k.code+" / "+String(oe).padStart(3,"0"):J,Ce=Fa("",()=>S(k,ue,oe,me,le),"earth-drop-pair");Ce.dataset.itemName=ue,Ce.dataset.status=de,Ce.setAttribute("aria-label",ue+" \xB7 "+me.label),Ce.append(Yl("",k?.print)),i.append(Ce),s.push(Ce)}h(),lg()};function b(D,k){let J=it("header",null,"glove-direct-header"),$=Fa("",p,"glove-icon-button");$.setAttribute("aria-label","\uC7A5\uAC11 \uBAA9\uB85D\uC73C\uB85C"),$.append(ql("arrow-left"));let re=it("div");re.append(it("strong",D),it("span",k.label,"glove-direct-status"));let le=Fa("",p,"glove-icon-button");le.setAttribute("aria-label","\uB2EB\uAE30"),le.append(ql("x")),J.append($,re,le),r.append(J)}function S(D,k,J,$,re){if(g(),a=J,!(re&&$.view==="chat")){H((0,ug.glovePreview)(D,o),k,J,$,re);return}if(r.replaceChildren(),r.dataset.view=$.view,b(k,$),re&&r.append(it("span","\uBBF8\uB9AC\uBCF4\uAE30","glove-preview-mark")),re&&$.view==="chat")te(D,J);else{N(D);let le=it("section",null,"glove-map-section");r.append(le),x=pd(le,{city:o,number:J,itemName:k,live:v,preview:re,navigate:q=>{p(),window.openAppPage(q)},onState:(q,W)=>{let j=W?window.SKMGloveText(W):window.SKMGloveText(q);r.querySelector(".glove-direct-status").textContent=j;let oe=s[J-1];oe.dataset.status=q,oe.setAttribute("aria-label",k+" \xB7 "+j)}})}lg(),r.open||r.showModal()}let T=it("dialog",null,"glove-model-dialog");T.setAttribute("aria-label","3D"),document.body.append(T);let O=null;function F(){T.open&&T.close(),T.dataset.product&&g(),O?.remove(),O=null}T.addEventListener("close",()=>{T.open||(T.dataset.product&&g(),O?.remove(),O=null)}),window.addEventListener("message",D=>{D.source!==O?.contentWindow||D.data?.skm!=="product-viewer-close"||D.origin!==location.origin&&!(D.origin==="null"&&location.protocol==="skm:")||F()});function H(D,k,J,$,re){F(),r.open&&r.close(),T.dataset.product="true",T.setAttribute("aria-label",k);let le=it("div",null,"glove-product-shell"),q=it("header",null,"glove-product-header"),W=it("strong",D.code),j=Fa("\xD7",F,"glove-product-close");j.setAttribute("aria-label",Xt("close")),q.append(W,j);let oe=it("section",null,"glove-product-location");oe.setAttribute("aria-label",Xt("pickup")),oe.hidden=D.previewOnly&&!D.publicPickup;let de=it("div",null,"glove-product-stage");O=it("iframe"),O.title=D.code+" \xB7 3D",O.src="app/product-viewer.html?model="+encodeURIComponent(D.model)+"&embedded=1&mosaic=1",de.append(O);let me=it("section",null,"glove-product-checkout");me.setAttribute("aria-label",Xt("price")),le.append(q,oe,de,me),T.replaceChildren(le),T.showModal(),x=pd(me,{city:o,number:J,itemName:k,live:v&&!D.previewOnly,preview:re,locationHost:oe,pickupPlan:D.publicPickup,navigate:ue=>{p(),window.openAppPage(ue)},onState:(ue,Ce)=>{let Te=s[J-1];Te&&(Te.dataset.status=ue,Te.setAttribute("aria-label",k+" \xB7 "+window.SKMGloveText(Ce||ue)))}})}function U(D){/^models\/[a-zA-Z0-9_-]+\.glb$/.test(D.model||"")&&(F(),delete T.dataset.product,O=it("iframe"),O.title=D.code+" \xB7 3D",O.src="app/product-viewer.html?model="+encodeURIComponent(D.model),T.replaceChildren(O),T.showModal())}function N(D){let k=it("div",null,"glove-unavailable");if(D?.model){let J=Fa("",()=>U(D),"glove-model-open");J.setAttribute("aria-label","3D\uB85C \uBCF4\uAE30"),J.append(Ad(D),it("span","3D \u2197","glove-model-badge")),k.append(J)}else k.append(Ad(D));r.append(k)}function te(D,k){let J=D.code,$=[];try{let me=JSON.parse(localStorage.getItem(cg(o.id,J,k)));Array.isArray(me)&&($=me.filter(ue=>typeof ue.text=="string"&&ue.text.length<=1e3&&Number.isFinite(ue.at)).slice(-100))}catch{}let re=it("div",null,"glove-chat-owner");re.append(D.photo?Ad(D):ql("user-round"),it("span","\uBCF4\uC720\uC790"),it("small","\uC2E4\uC81C \uC804\uC1A1 \uC548 \uB428")),r.append(re);let le=it("div",null,"glove-chat-log");le.setAttribute("role","log"),le.setAttribute("aria-live","polite"),le.setAttribute("aria-label","\uBCF4\uC720\uC790\uC640 \uB300\uD654"),r.append(le);function q(){if(le.replaceChildren(),!$.length){let me=it("div",null,"glove-chat-empty");me.append(Yl(),it("p","\uBA54\uC2DC\uC9C0\uB97C \uBCF4\uB0B4\uBCF4\uC138\uC694")),le.append(me)}for(let me of $){let ue=it("div",null,"glove-chat-message");ue.append(it("p",me.text),it("time",new Date(me.at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"}))),le.append(ue)}le.scrollTop=le.scrollHeight}let W=it("form",null,"glove-chat-compose"),j=it("textarea"),oe=it("button");j.rows=1,j.maxLength=1e3,j.placeholder="\uBA54\uC2DC\uC9C0",j.setAttribute("aria-label","\uBA54\uC2DC\uC9C0"),oe.type="submit",oe.setAttribute("aria-label","\uBCF4\uB0B4\uAE30"),oe.append(ql("send"));let de=it("p",null,"glove-chat-error");de.setAttribute("role","status"),j.oninput=()=>{oe.disabled=!j.value.trim()},oe.disabled=!0,W.onsubmit=me=>{me.preventDefault();let ue=j.value.trim();if(!ue||ue.length>1e3)return;let Ce=[...$,{text:ue,at:Date.now()}].slice(-100);try{localStorage.setItem(cg(o.id,J,k),JSON.stringify(Ce)),$=Ce,j.value="",oe.disabled=!0,de.textContent="",q(),j.focus()}catch{de.textContent="\uC800\uC7A5\uD558\uC9C0 \uBABB\uD588\uC5B4\uC694. \uB2E4\uC2DC \uC2DC\uB3C4\uD574\uC8FC\uC138\uC694."}},W.append(j,oe),r.append(W,de),q()}return{render:L,close:p,setOpen:E}}var On=class{constructor(){this._partials=new Float64Array(32),this._n=0}add(e){let t=this._partials,i=0;for(let r=0;r<this._n&&r<32;r++){let o=t[r],a=e+o,s=Math.abs(e)<Math.abs(o)?e-(a-o):o-(a-e);s&&(t[i++]=s),e=a}return t[i]=e,this._n=i+1,this}valueOf(){let e=this._partials,t=this._n,i,r,o,a=0;if(t>0){for(a=e[--t];t>0&&(i=a,r=e[--t],a=i+r,o=r-(a-i),!o););t>0&&(o<0&&e[t-1]<0||o>0&&e[t-1]>0)&&(r=o*2,i=a+r,r==i-a&&(a=i))}return a}};function*cb(n){for(let e of n)yield*e}function Ro(n){return Array.from(cb(n))}var lt=1e-6,hg=1e-12,rt=Math.PI,Mn=rt/2,Ed=rt/4,fn=rt*2,sn=180/rt,Ot=rt/180,xt=Math.abs,pg=Math.atan,Xn=Math.atan2,ht=Math.cos;var ot=Math.sin,mg=Math.sign||function(n){return n>0?1:n<0?-1:0},dn=Math.sqrt;function gg(n){return n>1?0:n<-1?rt:Math.acos(n)}function li(n){return n>1?Mn:n<-1?-Mn:Math.asin(n)}function Td(n){return(n=ot(n/2))*n}function tn(){}function Zl(n,e){n&&vg.hasOwnProperty(n.type)&&vg[n.type](n,e)}var xg={Feature:function(n,e){Zl(n.geometry,e)},FeatureCollection:function(n,e){for(var t=n.features,i=-1,r=t.length;++i<r;)Zl(t[i].geometry,e)}},vg={Sphere:function(n,e){e.sphere()},Point:function(n,e){n=n.coordinates,e.point(n[0],n[1],n[2])},MultiPoint:function(n,e){for(var t=n.coordinates,i=-1,r=t.length;++i<r;)n=t[i],e.point(n[0],n[1],n[2])},LineString:function(n,e){Cd(n.coordinates,e,0)},MultiLineString:function(n,e){for(var t=n.coordinates,i=-1,r=t.length;++i<r;)Cd(t[i],e,0)},Polygon:function(n,e){yg(n.coordinates,e)},MultiPolygon:function(n,e){for(var t=n.coordinates,i=-1,r=t.length;++i<r;)yg(t[i],e)},GeometryCollection:function(n,e){for(var t=n.geometries,i=-1,r=t.length;++i<r;)Zl(t[i],e)}};function Cd(n,e,t){var i=-1,r=n.length-t,o;for(e.lineStart();++i<r;)o=n[i],e.point(o[0],o[1],o[2]);e.lineEnd()}function yg(n,e){var t=-1,i=n.length;for(e.polygonStart();++t<i;)Cd(n[t],e,1);e.polygonEnd()}function cr(n,e){n&&xg.hasOwnProperty(n.type)?xg[n.type](n,e):Zl(n,e)}function Oa(n){return[Xn(n[1],n[0]),li(n[2])]}function bi(n){var e=n[0],t=n[1],i=ht(t);return[i*ht(e),i*ot(e),ot(t)]}function Ba(n,e){return n[0]*e[0]+n[1]*e[1]+n[2]*e[2]}function Po(n,e){return[n[1]*e[2]-n[2]*e[1],n[2]*e[0]-n[0]*e[2],n[0]*e[1]-n[1]*e[0]]}function Kl(n,e){n[0]+=e[0],n[1]+=e[1],n[2]+=e[2]}function ka(n,e){return[n[0]*e,n[1]*e,n[2]*e]}function za(n){var e=dn(n[0]*n[0]+n[1]*n[1]+n[2]*n[2]);n[0]/=e,n[1]/=e,n[2]/=e}function Ha(n,e){function t(i,r){return i=n(i,r),e(i[0],i[1])}return n.invert&&e.invert&&(t.invert=function(i,r){return i=e.invert(i,r),i&&n.invert(i[0],i[1])}),t}function Rd(n,e){return xt(n)>rt&&(n-=Math.round(n/fn)*fn),[n,e]}Rd.invert=Rd;function bg(n,e,t){return(n%=fn)?e||t?Ha(Mg(n),Sg(e,t)):Mg(n):e||t?Sg(e,t):Rd}function _g(n){return function(e,t){return e+=n,xt(e)>rt&&(e-=Math.round(e/fn)*fn),[e,t]}}function Mg(n){var e=_g(n);return e.invert=_g(-n),e}function Sg(n,e){var t=ht(n),i=ot(n),r=ht(e),o=ot(e);function a(s,l){var u=ht(l),c=ht(s)*u,f=ot(s)*u,d=ot(l),h=d*t+c*i;return[Xn(f*r-h*o,c*t-d*i),li(h*r+f*o)]}return a.invert=function(s,l){var u=ht(l),c=ht(s)*u,f=ot(s)*u,d=ot(l),h=d*r-f*o;return[Xn(f*r+d*o,c*t+h*i),li(h*t-c*i)]},a}function Ag(n,e,t,i,r,o){if(t){var a=ht(e),s=ot(e),l=i*t;r==null?(r=e+i*fn,o=e-l/2):(r=wg(a,r),o=wg(a,o),(i>0?r<o:r>o)&&(r+=i*fn));for(var u,c=r;i>0?c>o:c<o;c-=l)u=Oa([a,-s*ht(c),-s*ot(c)]),n.point(u[0],u[1])}}function wg(n,e){e=bi(e),e[0]-=n,za(e);var t=gg(-e[1]);return((-e[2]<0?-t:t)+fn-lt)%fn}function $l(){var n=[],e;return{point:function(t,i,r){e.push([t,i,r])},lineStart:function(){n.push(e=[])},lineEnd:tn,rejoin:function(){n.length>1&&n.push(n.pop().concat(n.shift()))},result:function(){var t=n;return n=[],e=null,t}}}function Io(n,e){return xt(n[0]-e[0])<lt&&xt(n[1]-e[1])<lt}function Jl(n,e,t,i){this.x=n,this.z=e,this.o=t,this.e=i,this.v=!1,this.n=this.p=null}function jl(n,e,t,i,r){var o=[],a=[],s,l;if(n.forEach(function(m){if(!((x=m.length-1)<=0)){var x,g=m[0],p=m[x],_;if(Io(g,p)){if(!g[2]&&!p[2]){for(r.lineStart(),s=0;s<x;++s)r.point((g=m[s])[0],g[1]);r.lineEnd();return}p[0]+=2*lt}o.push(_=new Jl(g,m,null,!0)),a.push(_.o=new Jl(g,null,_,!1)),o.push(_=new Jl(p,m,null,!1)),a.push(_.o=new Jl(p,null,_,!0))}}),!!o.length){for(a.sort(e),Eg(o),Eg(a),s=0,l=a.length;s<l;++s)a[s].e=t=!t;for(var u=o[0],c,f;;){for(var d=u,h=!0;d.v;)if((d=d.n)===u)return;c=d.z,r.lineStart();do{if(d.v=d.o.v=!0,d.e){if(h)for(s=0,l=c.length;s<l;++s)r.point((f=c[s])[0],f[1]);else i(d.x,d.n.x,1,r);d=d.n}else{if(h)for(c=d.p.z,s=c.length-1;s>=0;--s)r.point((f=c[s])[0],f[1]);else i(d.x,d.p.x,-1,r);d=d.p}d=d.o,c=d.z,h=!h}while(!d.v);r.lineEnd()}}}function Eg(n){if(e=n.length){for(var e,t=0,i=n[0],r;++t<e;)i.n=r=n[t],r.p=i,i=r;i.n=r=n[0],r.p=i}}function Pd(n){return xt(n[0])<=rt?n[0]:mg(n[0])*((xt(n[0])+rt)%fn-rt)}function Tg(n,e){var t=Pd(e),i=e[1],r=ot(i),o=[ot(t),-ht(t),0],a=0,s=0,l=new On;r===1?i=Mn+lt:r===-1&&(i=-Mn-lt);for(var u=0,c=n.length;u<c;++u)if(d=(f=n[u]).length)for(var f,d,h=f[d-1],m=Pd(h),x=h[1]/2+Ed,g=ot(x),p=ht(x),_=0;_<d;++_,m=v,g=E,p=P,h=y){var y=f[_],v=Pd(y),R=y[1]/2+Ed,E=ot(R),P=ht(R),L=v-m,b=L>=0?1:-1,S=b*L,T=S>rt,O=g*E;if(l.add(Xn(O*b*ot(S),p*P+O*ht(S))),a+=T?L+b*fn:L,T^m>=t^v>=t){var F=Po(bi(h),bi(y));za(F);var H=Po(o,F);za(H);var U=(T^L>=0?-1:1)*li(H[2]);(i>U||i===U&&(F[0]||F[1]))&&(s+=T^L>=0?1:-1)}}return(a<-lt||a<lt&&l<-hg)^s&1}function Ql(n,e,t,i){return function(r){var o=e(r),a=$l(),s=e(a),l=!1,u,c,f,d={point:h,lineStart:x,lineEnd:g,polygonStart:function(){d.point=p,d.lineStart=_,d.lineEnd=y,c=[],u=[]},polygonEnd:function(){d.point=h,d.lineStart=x,d.lineEnd=g,c=Ro(c);var v=Tg(u,i);c.length?(l||(r.polygonStart(),l=!0),jl(c,fb,v,t,r)):v&&(l||(r.polygonStart(),l=!0),r.lineStart(),t(null,null,1,r),r.lineEnd()),l&&(r.polygonEnd(),l=!1),c=u=null},sphere:function(){r.polygonStart(),r.lineStart(),t(null,null,1,r),r.lineEnd(),r.polygonEnd()}};function h(v,R){n(v,R)&&r.point(v,R)}function m(v,R){o.point(v,R)}function x(){d.point=m,o.lineStart()}function g(){d.point=h,o.lineEnd()}function p(v,R){f.push([v,R]),s.point(v,R)}function _(){s.lineStart(),f=[]}function y(){p(f[0][0],f[0][1]),s.lineEnd();var v=s.clean(),R=a.result(),E,P=R.length,L,b,S;if(f.pop(),u.push(f),f=null,!!P){if(v&1){if(b=R[0],(L=b.length-1)>0){for(l||(r.polygonStart(),l=!0),r.lineStart(),E=0;E<L;++E)r.point((S=b[E])[0],S[1]);r.lineEnd()}return}P>1&&v&2&&R.push(R.pop().concat(R.shift())),c.push(R.filter(ub))}}return d}}function ub(n){return n.length>1}function fb(n,e){return((n=n.x)[0]<0?n[1]-Mn-lt:Mn-n[1])-((e=e.x)[0]<0?e[1]-Mn-lt:Mn-e[1])}var Id=Ql(function(){return!0},db,pb,[-rt,-Mn]);function db(n){var e=NaN,t=NaN,i=NaN,r;return{lineStart:function(){n.lineStart(),r=1},point:function(o,a){var s=o>0?rt:-rt,l=xt(o-e);xt(l-rt)<lt?(n.point(e,t=(t+a)/2>0?Mn:-Mn),n.point(i,t),n.lineEnd(),n.lineStart(),n.point(s,t),n.point(o,t),r=0):i!==s&&l>=rt&&(xt(e-i)<lt&&(e-=i*lt),xt(o-s)<lt&&(o-=s*lt),t=hb(e,t,o,a),n.point(i,t),n.lineEnd(),n.lineStart(),n.point(s,t),r=0),n.point(e=o,t=a),i=s},lineEnd:function(){n.lineEnd(),e=t=NaN},clean:function(){return 2-r}}}function hb(n,e,t,i){var r,o,a=ot(n-t);return xt(a)>lt?pg((ot(e)*(o=ht(i))*ot(t)-ot(i)*(r=ht(e))*ot(n))/(r*o*a)):(e+i)/2}function pb(n,e,t,i){var r;if(n==null)r=t*Mn,i.point(-rt,r),i.point(0,r),i.point(rt,r),i.point(rt,0),i.point(rt,-r),i.point(0,-r),i.point(-rt,-r),i.point(-rt,0),i.point(-rt,r);else if(xt(n[0]-e[0])>lt){var o=n[0]<e[0]?rt:-rt;r=t*o/2,i.point(-o,r),i.point(0,r),i.point(o,r)}else i.point(e[0],e[1])}function Cg(n){var e=ht(n),t=2*Ot,i=e>0,r=xt(e)>lt;function o(c,f,d,h){Ag(h,n,t,d,c,f)}function a(c,f){return ht(c)*ht(f)>e}function s(c){var f,d,h,m,x;return{lineStart:function(){m=h=!1,x=1},point:function(g,p){var _=[g,p],y,v=a(g,p),R=i?v?0:u(g,p):v?u(g+(g<0?rt:-rt),p):0;if(!f&&(m=h=v)&&c.lineStart(),v!==h&&(y=l(f,_),(!y||Io(f,y)||Io(_,y))&&(_[2]=1)),v!==h)x=0,v?(c.lineStart(),y=l(_,f),c.point(y[0],y[1])):(y=l(f,_),c.point(y[0],y[1],2),c.lineEnd()),f=y;else if(r&&f&&i^v){var E;!(R&d)&&(E=l(_,f,!0))&&(x=0,i?(c.lineStart(),c.point(E[0][0],E[0][1]),c.point(E[1][0],E[1][1]),c.lineEnd()):(c.point(E[1][0],E[1][1]),c.lineEnd(),c.lineStart(),c.point(E[0][0],E[0][1],3)))}v&&(!f||!Io(f,_))&&c.point(_[0],_[1]),f=_,h=v,d=R},lineEnd:function(){h&&c.lineEnd(),f=null},clean:function(){return x|(m&&h)<<1}}}function l(c,f,d){var h=bi(c),m=bi(f),x=[1,0,0],g=Po(h,m),p=Ba(g,g),_=g[0],y=p-_*_;if(!y)return!d&&c;var v=e*p/y,R=-e*_/y,E=Po(x,g),P=ka(x,v),L=ka(g,R);Kl(P,L);var b=E,S=Ba(P,b),T=Ba(b,b),O=S*S-T*(Ba(P,P)-1);if(!(O<0)){var F=dn(O),H=ka(b,(-S-F)/T);if(Kl(H,P),H=Oa(H),!d)return H;var U=c[0],N=f[0],te=c[1],D=f[1],k;N<U&&(k=U,U=N,N=k);var J=N-U,$=xt(J-rt)<lt,re=$||J<lt;if(!$&&D<te&&(k=te,te=D,D=k),re?$?te+D>0^H[1]<(xt(H[0]-U)<lt?te:D):te<=H[1]&&H[1]<=D:J>rt^(U<=H[0]&&H[0]<=N)){var le=ka(b,(-S+F)/T);return Kl(le,P),[H,Oa(le)]}}}function u(c,f){var d=i?n:rt-n,h=0;return c<-d?h|=1:c>d&&(h|=2),f<-d?h|=4:f>d&&(h|=8),h}return Ql(a,s,o,i?[0,-n]:[-rt,n-rt])}function Rg(n,e,t,i,r,o){var a=n[0],s=n[1],l=e[0],u=e[1],c=0,f=1,d=l-a,h=u-s,m;if(m=t-a,!(!d&&m>0)){if(m/=d,d<0){if(m<c)return;m<f&&(f=m)}else if(d>0){if(m>f)return;m>c&&(c=m)}if(m=r-a,!(!d&&m<0)){if(m/=d,d<0){if(m>f)return;m>c&&(c=m)}else if(d>0){if(m<c)return;m<f&&(f=m)}if(m=i-s,!(!h&&m>0)){if(m/=h,h<0){if(m<c)return;m<f&&(f=m)}else if(h>0){if(m>f)return;m>c&&(c=m)}if(m=o-s,!(!h&&m<0)){if(m/=h,h<0){if(m>f)return;m>c&&(c=m)}else if(h>0){if(m<c)return;m<f&&(f=m)}return c>0&&(n[0]=a+c*d,n[1]=s+c*h),f<1&&(e[0]=a+f*d,e[1]=s+f*h),!0}}}}}var Va=1e9,ec=-Va;function Ld(n,e,t,i){function r(u,c){return n<=u&&u<=t&&e<=c&&c<=i}function o(u,c,f,d){var h=0,m=0;if(u==null||(h=a(u,f))!==(m=a(c,f))||l(u,c)<0^f>0)do d.point(h===0||h===3?n:t,h>1?i:e);while((h=(h+f+4)%4)!==m);else d.point(c[0],c[1])}function a(u,c){return xt(u[0]-n)<lt?c>0?0:3:xt(u[0]-t)<lt?c>0?2:1:xt(u[1]-e)<lt?c>0?1:0:c>0?3:2}function s(u,c){return l(u.x,c.x)}function l(u,c){var f=a(u,1),d=a(c,1);return f!==d?f-d:f===0?c[1]-u[1]:f===1?u[0]-c[0]:f===2?u[1]-c[1]:c[0]-u[0]}return function(u){var c=u,f=$l(),d,h,m,x,g,p,_,y,v,R,E,P={point:L,lineStart:O,lineEnd:F,polygonStart:S,polygonEnd:T};function L(U,N){r(U,N)&&c.point(U,N)}function b(){for(var U=0,N=0,te=h.length;N<te;++N)for(var D=h[N],k=1,J=D.length,$=D[0],re,le,q=$[0],W=$[1];k<J;++k)re=q,le=W,$=D[k],q=$[0],W=$[1],le<=i?W>i&&(q-re)*(i-le)>(W-le)*(n-re)&&++U:W<=i&&(q-re)*(i-le)<(W-le)*(n-re)&&--U;return U}function S(){c=f,d=[],h=[],E=!0}function T(){var U=b(),N=E&&U,te=(d=Ro(d)).length;(N||te)&&(u.polygonStart(),N&&(u.lineStart(),o(null,null,1,u),u.lineEnd()),te&&jl(d,s,U,o,u),u.polygonEnd()),c=u,d=h=m=null}function O(){P.point=H,h&&h.push(m=[]),R=!0,v=!1,_=y=NaN}function F(){d&&(H(x,g),p&&v&&f.rejoin(),d.push(f.result())),P.point=L,v&&c.lineEnd()}function H(U,N){var te=r(U,N);if(h&&m.push([U,N]),R)x=U,g=N,p=te,R=!1,te&&(c.lineStart(),c.point(U,N));else if(te&&v)c.point(U,N);else{var D=[_=Math.max(ec,Math.min(Va,_)),y=Math.max(ec,Math.min(Va,y))],k=[U=Math.max(ec,Math.min(Va,U)),N=Math.max(ec,Math.min(Va,N))];Rg(D,k,n,e,t,i)?(v||(c.lineStart(),c.point(D[0],D[1])),c.point(k[0],k[1]),te||c.lineEnd(),E=!1):te&&(c.lineStart(),c.point(U,N),E=!1)}_=U,y=N,v=te}return P}}function Dd(n,e){var t=n[0]*Ot,i=n[1]*Ot,r=e[0]*Ot,o=e[1]*Ot,a=ht(i),s=ot(i),l=ht(o),u=ot(o),c=a*ht(t),f=a*ot(t),d=l*ht(r),h=l*ot(r),m=2*li(dn(Td(o-i)+a*l*Td(r-t))),x=ot(m),g=m?function(p){var _=ot(p*=m)/x,y=ot(m-p)/x,v=y*c+_*d,R=y*f+_*h,E=y*s+_*u;return[Xn(R,v)*sn,Xn(E,dn(v*v+R*R))*sn]}:function(){return[t*sn,i*sn]};return g.distance=m,g}var Ga=n=>n;var Ud=new On,Nd=new On,Pg,Ig,Fd,Od,ur={point:tn,lineStart:tn,lineEnd:tn,polygonStart:function(){ur.lineStart=mb,ur.lineEnd=xb},polygonEnd:function(){ur.lineStart=ur.lineEnd=ur.point=tn,Ud.add(xt(Nd)),Nd=new On},result:function(){var n=Ud/2;return Ud=new On,n}};function mb(){ur.point=gb}function gb(n,e){ur.point=Lg,Pg=Fd=n,Ig=Od=e}function Lg(n,e){Nd.add(Od*n-Fd*e),Fd=n,Od=e}function xb(){Lg(Pg,Ig)}var Bd=ur;var Lo=1/0,tc=Lo,Wa=-Lo,nc=Wa,vb={point:yb,lineStart:tn,lineEnd:tn,polygonStart:tn,polygonEnd:tn,result:function(){var n=[[Lo,tc],[Wa,nc]];return Wa=nc=-(tc=Lo=1/0),n}};function yb(n,e){n<Lo&&(Lo=n),n>Wa&&(Wa=n),e<tc&&(tc=e),e>nc&&(nc=e)}var Do=vb;var kd=0,zd=0,qa=0,ic=0,rc=0,Uo=0,Hd=0,Vd=0,Xa=0,Ng,Fg,wi,Ai,ci={point:Br,lineStart:Dg,lineEnd:Ug,polygonStart:function(){ci.lineStart=Sb,ci.lineEnd=bb},polygonEnd:function(){ci.point=Br,ci.lineStart=Dg,ci.lineEnd=Ug},result:function(){var n=Xa?[Hd/Xa,Vd/Xa]:Uo?[ic/Uo,rc/Uo]:qa?[kd/qa,zd/qa]:[NaN,NaN];return kd=zd=qa=ic=rc=Uo=Hd=Vd=Xa=0,n}};function Br(n,e){kd+=n,zd+=e,++qa}function Dg(){ci.point=_b}function _b(n,e){ci.point=Mb,Br(wi=n,Ai=e)}function Mb(n,e){var t=n-wi,i=e-Ai,r=dn(t*t+i*i);ic+=r*(wi+n)/2,rc+=r*(Ai+e)/2,Uo+=r,Br(wi=n,Ai=e)}function Ug(){ci.point=Br}function Sb(){ci.point=wb}function bb(){Og(Ng,Fg)}function wb(n,e){ci.point=Og,Br(Ng=wi=n,Fg=Ai=e)}function Og(n,e){var t=n-wi,i=e-Ai,r=dn(t*t+i*i);ic+=r*(wi+n)/2,rc+=r*(Ai+e)/2,Uo+=r,r=Ai*n-wi*e,Hd+=r*(wi+n),Vd+=r*(Ai+e),Xa+=r*3,Br(wi=n,Ai=e)}var Gd=ci;function oc(n){this._context=n}oc.prototype={_radius:4.5,pointRadius:function(n){return this._radius=n,this},polygonStart:function(){this._line=0},polygonEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){this._line===0&&this._context.closePath(),this._point=NaN},point:function(n,e){switch(this._point){case 0:{this._context.moveTo(n,e),this._point=1;break}case 1:{this._context.lineTo(n,e);break}default:{this._context.moveTo(n+this._radius,e),this._context.arc(n,e,this._radius,0,fn);break}}},result:tn};var qd=new On,Wd,Bg,kg,Ya,Za,ac={point:tn,lineStart:function(){ac.point=Ab},lineEnd:function(){Wd&&zg(Bg,kg),ac.point=tn},polygonStart:function(){Wd=!0},polygonEnd:function(){Wd=null},result:function(){var n=+qd;return qd=new On,n}};function Ab(n,e){ac.point=zg,Bg=Ya=n,kg=Za=e}function zg(n,e){Ya-=n,Za-=e,qd.add(dn(Ya*Ya+Za*Za)),Ya=n,Za=e}var Xd=ac;var Hg,sc,Vg,Gg,No=class{constructor(e){this._append=e==null?Wg:Eb(e),this._radius=4.5,this._=""}pointRadius(e){return this._radius=+e,this}polygonStart(){this._line=0}polygonEnd(){this._line=NaN}lineStart(){this._point=0}lineEnd(){this._line===0&&(this._+="Z"),this._point=NaN}point(e,t){switch(this._point){case 0:{this._append`M${e},${t}`,this._point=1;break}case 1:{this._append`L${e},${t}`;break}default:{if(this._append`M${e},${t}`,this._radius!==Vg||this._append!==sc){let i=this._radius,r=this._;this._="",this._append`m0,${i}a${i},${i} 0 1,1 0,${-2*i}a${i},${i} 0 1,1 0,${2*i}z`,Vg=i,sc=this._append,Gg=this._,this._=r}this._+=Gg;break}}}result(){let e=this._;return this._="",e.length?e:null}};function Wg(n){let e=1;this._+=n[0];for(let t=n.length;e<t;++e)this._+=arguments[e]+n[e]}function Eb(n){let e=Math.floor(n);if(!(e>=0))throw new RangeError(`invalid digits: ${n}`);if(e>15)return Wg;if(e!==Hg){let t=10**e;Hg=e,sc=function(r){let o=1;this._+=r[0];for(let a=r.length;o<a;++o)this._+=Math.round(arguments[o]*t)/t+r[o]}}return sc}function lc(n,e){let t=3,i=4.5,r,o;function a(s){return s&&(typeof i=="function"&&o.pointRadius(+i.apply(this,arguments)),cr(s,r(o))),o.result()}return a.area=function(s){return cr(s,r(Bd)),Bd.result()},a.measure=function(s){return cr(s,r(Xd)),Xd.result()},a.bounds=function(s){return cr(s,r(Do)),Do.result()},a.centroid=function(s){return cr(s,r(Gd)),Gd.result()},a.projection=function(s){return arguments.length?(r=s==null?(n=null,Ga):(n=s).stream,a):n},a.context=function(s){return arguments.length?(o=s==null?(e=null,new No(t)):new oc(e=s),typeof i!="function"&&o.pointRadius(i),a):e},a.pointRadius=function(s){return arguments.length?(i=typeof s=="function"?s:(o.pointRadius(+s),+s),a):i},a.digits=function(s){if(!arguments.length)return t;if(s==null)t=null;else{let l=Math.floor(s);if(!(l>=0))throw new RangeError(`invalid digits: ${s}`);t=l}return e===null&&(o=new No(t)),a},a.projection(n).digits(t).context(e)}function Ka(n){return function(e){var t=new Yd;for(var i in n)t[i]=n[i];return t.stream=e,t}}function Yd(){}Yd.prototype={constructor:Yd,point:function(n,e){this.stream.point(n,e)},sphere:function(){this.stream.sphere()},lineStart:function(){this.stream.lineStart()},lineEnd:function(){this.stream.lineEnd()},polygonStart:function(){this.stream.polygonStart()},polygonEnd:function(){this.stream.polygonEnd()}};function Zd(n,e,t){var i=n.clipExtent&&n.clipExtent();return n.scale(150).translate([0,0]),i!=null&&n.clipExtent(null),cr(t,n.stream(Do)),e(Do.result()),i!=null&&n.clipExtent(i),n}function Kd(n,e,t){return Zd(n,function(i){var r=e[1][0]-e[0][0],o=e[1][1]-e[0][1],a=Math.min(r/(i[1][0]-i[0][0]),o/(i[1][1]-i[0][1])),s=+e[0][0]+(r-a*(i[1][0]+i[0][0]))/2,l=+e[0][1]+(o-a*(i[1][1]+i[0][1]))/2;n.scale(150*a).translate([s,l])},t)}function qg(n,e,t){return Kd(n,[[0,0],e],t)}function Xg(n,e,t){return Zd(n,function(i){var r=+e,o=r/(i[1][0]-i[0][0]),a=(r-o*(i[1][0]+i[0][0]))/2,s=-o*i[0][1];n.scale(150*o).translate([a,s])},t)}function Yg(n,e,t){return Zd(n,function(i){var r=+e,o=r/(i[1][1]-i[0][1]),a=-o*i[0][0],s=(r-o*(i[1][1]+i[0][1]))/2;n.scale(150*o).translate([a,s])},t)}var Zg=16,Tb=ht(30*Ot);function $d(n,e){return+e?Rb(n,e):Cb(n)}function Cb(n){return Ka({point:function(e,t){e=n(e,t),this.stream.point(e[0],e[1])}})}function Rb(n,e){function t(i,r,o,a,s,l,u,c,f,d,h,m,x,g){var p=u-i,_=c-r,y=p*p+_*_;if(y>4*e&&x--){var v=a+d,R=s+h,E=l+m,P=dn(v*v+R*R+E*E),L=li(E/=P),b=xt(xt(E)-1)<lt||xt(o-f)<lt?(o+f)/2:Xn(R,v),S=n(b,L),T=S[0],O=S[1],F=T-i,H=O-r,U=_*F-p*H;(U*U/y>e||xt((p*F+_*H)/y-.5)>.3||a*d+s*h+l*m<Tb)&&(t(i,r,o,a,s,l,T,O,b,v/=P,R/=P,E,x,g),g.point(T,O),t(T,O,b,v,R,E,u,c,f,d,h,m,x,g))}}return function(i){var r,o,a,s,l,u,c,f,d,h,m,x,g={point:p,lineStart:_,lineEnd:v,polygonStart:function(){i.polygonStart(),g.lineStart=R},polygonEnd:function(){i.polygonEnd(),g.lineStart=_}};function p(L,b){L=n(L,b),i.point(L[0],L[1])}function _(){f=NaN,g.point=y,i.lineStart()}function y(L,b){var S=bi([L,b]),T=n(L,b);t(f,d,c,h,m,x,f=T[0],d=T[1],c=L,h=S[0],m=S[1],x=S[2],Zg,i),i.point(f,d)}function v(){g.point=p,i.lineEnd()}function R(){_(),g.point=E,g.lineEnd=P}function E(L,b){y(r=L,b),o=f,a=d,s=h,l=m,u=x,g.point=y}function P(){t(f,d,c,h,m,x,o,a,r,s,l,u,Zg,i),g.lineEnd=v,v()}return g}}var Pb=Ka({point:function(n,e){this.stream.point(n*Ot,e*Ot)}});function Ib(n){return Ka({point:function(e,t){var i=n(e,t);return this.stream.point(i[0],i[1])}})}function Lb(n,e,t,i,r){function o(a,s){return a*=i,s*=r,[e+n*a,t-n*s]}return o.invert=function(a,s){return[(a-e)/n*i,(t-s)/n*r]},o}function Kg(n,e,t,i,r,o){if(!o)return Lb(n,e,t,i,r);var a=ht(o),s=ot(o),l=a*n,u=s*n,c=a/n,f=s/n,d=(s*t-a*e)/n,h=(s*e+a*t)/n;function m(x,g){return x*=i,g*=r,[l*x-u*g+e,t-u*x-l*g]}return m.invert=function(x,g){return[i*(c*x-f*g+d),r*(h-f*x-c*g)]},m}function Jd(n){return Db(function(){return n})()}function Db(n){var e,t=150,i=480,r=250,o=0,a=0,s=0,l=0,u=0,c,f=0,d=1,h=1,m=null,x=Id,g=null,p,_,y,v=Ga,R=.5,E,P,L,b,S;function T(U){return L(U[0]*Ot,U[1]*Ot)}function O(U){return U=L.invert(U[0],U[1]),U&&[U[0]*sn,U[1]*sn]}T.stream=function(U){return b&&S===U?b:b=Pb(Ib(c)(x(E(v(S=U)))))},T.preclip=function(U){return arguments.length?(x=U,m=void 0,H()):x},T.postclip=function(U){return arguments.length?(v=U,g=p=_=y=null,H()):v},T.clipAngle=function(U){return arguments.length?(x=+U?Cg(m=U*Ot):(m=null,Id),H()):m*sn},T.clipExtent=function(U){return arguments.length?(v=U==null?(g=p=_=y=null,Ga):Ld(g=+U[0][0],p=+U[0][1],_=+U[1][0],y=+U[1][1]),H()):g==null?null:[[g,p],[_,y]]},T.scale=function(U){return arguments.length?(t=+U,F()):t},T.translate=function(U){return arguments.length?(i=+U[0],r=+U[1],F()):[i,r]},T.center=function(U){return arguments.length?(o=U[0]%360*Ot,a=U[1]%360*Ot,F()):[o*sn,a*sn]},T.rotate=function(U){return arguments.length?(s=U[0]%360*Ot,l=U[1]%360*Ot,u=U.length>2?U[2]%360*Ot:0,F()):[s*sn,l*sn,u*sn]},T.angle=function(U){return arguments.length?(f=U%360*Ot,F()):f*sn},T.reflectX=function(U){return arguments.length?(d=U?-1:1,F()):d<0},T.reflectY=function(U){return arguments.length?(h=U?-1:1,F()):h<0},T.precision=function(U){return arguments.length?(E=$d(P,R=U*U),H()):dn(R)},T.fitExtent=function(U,N){return Kd(T,U,N)},T.fitSize=function(U,N){return qg(T,U,N)},T.fitWidth=function(U,N){return Xg(T,U,N)},T.fitHeight=function(U,N){return Yg(T,U,N)};function F(){var U=Kg(t,0,0,d,h,f).apply(null,e(o,a)),N=Kg(t,i-U[0],r-U[1],d,h,f);return c=bg(s,l,u),P=Ha(e,N),L=Ha(c,P),E=$d(P,R),H()}function H(){return b=S=null,T}return function(){return e=n.apply(this,arguments),T.invert=e.invert&&O,F()}}function cc(n,e){return[n,e]}cc.invert=cc;function uc(){return Jd(cc).scale(152.63)}function jd(n){return n}function fc(n){if(n==null)return jd;var e,t,i=n.scale[0],r=n.scale[1],o=n.translate[0],a=n.translate[1];return function(s,l){l||(e=t=0);var u=2,c=s.length,f=new Array(c);for(f[0]=(e+=s[0])*i+o,f[1]=(t+=s[1])*r+a;u<c;)f[u]=s[u],++u;return f}}function $g(n,e){for(var t,i=n.length,r=i-e;r<--i;)t=n[r],n[r++]=n[i],n[i]=t}function Qd(n,e){return typeof e=="string"&&(e=n.objects[e]),e.type==="GeometryCollection"?{type:"FeatureCollection",features:e.geometries.map(function(t){return Jg(n,t)})}:Jg(n,e)}function Jg(n,e){var t=e.id,i=e.bbox,r=e.properties==null?{}:e.properties,o=dc(n,e);return t==null&&i==null?{type:"Feature",properties:r,geometry:o}:i==null?{type:"Feature",id:t,properties:r,geometry:o}:{type:"Feature",id:t,bbox:i,properties:r,geometry:o}}function dc(n,e){var t=fc(n.transform),i=n.arcs;function r(c,f){f.length&&f.pop();for(var d=i[c<0?~c:c],h=0,m=d.length;h<m;++h)f.push(t(d[h],h));c<0&&$g(f,m)}function o(c){return t(c)}function a(c){for(var f=[],d=0,h=c.length;d<h;++d)r(c[d],f);return f.length<2&&f.push(f[0]),f}function s(c){for(var f=a(c);f.length<4;)f.push(f[0]);return f}function l(c){return c.map(s)}function u(c){var f=c.type,d;switch(f){case"GeometryCollection":return{type:f,geometries:c.geometries.map(u)};case"Point":d=o(c.coordinates);break;case"MultiPoint":d=c.coordinates.map(o);break;case"LineString":d=a(c.arcs);break;case"MultiLineString":d=c.arcs.map(a);break;case"Polygon":d=l(c.arcs);break;case"MultiPolygon":d=c.arcs.map(l);break;default:return null}return{type:f,coordinates:d}}return u(e)}function eh(n,e){var t={},i={},r={},o=[],a=-1;e.forEach(function(u,c){var f=n.arcs[u<0?~u:u],d;f.length<3&&!f[1][0]&&!f[1][1]&&(d=e[++a],e[a]=u,e[c]=d)}),e.forEach(function(u){var c=s(u),f=c[0],d=c[1],h,m;if(h=r[f])if(delete r[h.end],h.push(u),h.end=d,m=i[d]){delete i[m.start];var x=m===h?h:h.concat(m);i[x.start=h.start]=r[x.end=m.end]=x}else i[h.start]=r[h.end]=h;else if(h=i[d])if(delete i[h.start],h.unshift(u),h.start=f,m=r[f]){delete r[m.end];var g=m===h?h:m.concat(h);i[g.start=m.start]=r[g.end=h.end]=g}else i[h.start]=r[h.end]=h;else h=[u],i[h.start=f]=r[h.end=d]=h});function s(u){var c=n.arcs[u<0?~u:u],f=c[0],d;return n.transform?(d=[0,0],c.forEach(function(h){d[0]+=h[0],d[1]+=h[1]})):d=c[c.length-1],u<0?[d,f]:[f,d]}function l(u,c){for(var f in u){var d=u[f];delete c[d.start],delete d.start,delete d.end,d.forEach(function(h){t[h<0?~h:h]=1}),o.push(d)}}return l(r,i),l(i,r),e.forEach(function(u){t[u<0?~u:u]||o.push([u])}),o}function th(n){return dc(n,jg.apply(this,arguments))}function jg(n,e,t){var i,r,o;if(arguments.length>1)i=Ub(n,e,t);else for(r=0,i=new Array(o=n.arcs.length);r<o;++r)i[r]=r;return{type:"MultiLineString",arcs:eh(n,i)}}function Ub(n,e,t){var i=[],r=[],o;function a(f){var d=f<0?~f:f;(r[d]||(r[d]=[])).push({i:f,g:o})}function s(f){f.forEach(a)}function l(f){f.forEach(s)}function u(f){f.forEach(l)}function c(f){switch(o=f,f.type){case"GeometryCollection":f.geometries.forEach(c);break;case"LineString":s(f.arcs);break;case"MultiLineString":case"Polygon":l(f.arcs);break;case"MultiPolygon":u(f.arcs);break}}return c(e),r.forEach(t==null?function(f){i.push(f[0].i)}:function(f){t(f[0].g,f[f.length-1].g)&&i.push(f[0].i)}),i}var px={createIcons:()=>Wl({icons:{Languages:vd,UserRound:Co,Minus:_d,Plus:bd,Move3d:Gl,LockKeyhole:Da,Hand:To,ArrowUpRight:La,X:Ua,PenTool:Md,Headphones:xd,Play:Sd,ChevronRight:gd,ArrowLeft:Ia,Grid2x2:Vl}})},ke=document.getElementById("skm-earth-preview"),at=ke.querySelector(".earth-stage"),Ob=ke.querySelector("canvas"),fi=ke.querySelector(".earth-message"),Rc=ke.querySelector(".earth-markers"),Mc=JSON.parse(document.getElementById("skm-earth-geography").textContent),Qg=JSON.parse(document.getElementById("skm-earth-cities").textContent),Sc={KR:"\uB300\uD55C\uBBFC\uAD6D",JP:"\uC77C\uBCF8",GB:"\uC601\uAD6D",FR:"\uD504\uB791\uC2A4",CA:"\uCE90\uB098\uB2E4",US:"\uBBF8\uAD6D",HK:"\uD64D\uCF69",SG:"\uC2F1\uAC00\uD3EC\uB974"};var Bb=["1835848","1850147","1853909","2643743","2988507","6167865","6173331","6077243","5368361","5128581","1819729","1880252"],kb=["\uC11C\uC6B8","\uB3C4\uCFC4","\uC624\uC0AC\uCE74","\uB7F0\uB358","\uD30C\uB9AC","\uD1A0\uB860\uD1A0","\uBC34\uCFE0\uBC84","\uBAAC\uD2B8\uB9AC\uC62C","\uB85C\uC2A4\uC564\uC824\uB808\uC2A4","\uB274\uC695","\uD64D\uCF69","\uC2F1\uAC00\uD3EC\uB974"],Kt=Bb.map((n,e)=>({...Qg.find(t=>t.id===n),ko:kb[e],label:e===9?"NEW YORK":e===8?"LOS ANGELES":Qg.find(t=>t.id===n).ascii.toUpperCase(),features:["tattoo","gloves","music","dgtg","more"]})),xh=Qd(Mc,Mc.objects.features).features,XC=th(Mc,Mc.objects.features),Rt=5,Rn=Math.PI/180,vt=(n,e,t)=>Math.max(e,Math.min(t,n)),ss=matchMedia("(prefers-reduced-motion: reduce)").matches,bc={lon:100,lat:24},ye={...bc,logoMode:"survey-earth-v1",zoom:1,selected:"1835848",elasticity:60,relief:65,engraving:70,connections:!0,cityFocus:!1},pt={...bc,zoom:1,focus:0},Wi={lon:0,lat:0,zoom:0,focus:0},nt={x:0,y:0,vx:0,vy:0,tx:0,ty:0},It=736,Lt=490,ah=17,mx=17,Zn=0,sh=0,lh=0,Bt=null,ja=null,is=0,vc=0,wc=0,Cn=!1,Ja=null,Pn=new Map,gx=(0,Cc.createShakeDetector)(),kr=0;function ls(){kr=0,gx.reset()}function hr(n,e,t=Rt){return new z(Math.cos(n*Rn)*Math.cos(e*Rn)*t,Math.sin(n*Rn)*t,-Math.cos(n*Rn)*Math.sin(e*Rn)*t)}function pr(){clearTimeout(lh),lh=setTimeout(()=>{try{localStorage.setItem("skm-earth-view-v1",JSON.stringify({privateContent:{skmBlueEarth:{...ye}}}))}catch{}},180)}function zb(n){let e=n?.privateContent?.skmBlueEarth;if(e){for(let t of["lon","lat","zoom","elasticity","relief","engraving"])Number.isFinite(e[t])&&(!["lon","lat"].includes(t)||e.logoMode===ye.logoMode)&&(ye[t]=e[t]);ye.engraving=vt(ye.engraving,0,100),ye.lat=vt(ye.lat,-75,75),ye.zoom=vt(ye.zoom,.75,2.6),Kt.some(t=>t.id===e.selected)&&(ye.selected=e.selected),ye.connections=e.connections!==!1,ye.cityFocus=!1,ye.zoom=1,Object.assign(pt,{lon:ye.lon,lat:ye.lat,zoom:ye.zoom,focus:ye.cityFocus?1:0})}}try{zb(JSON.parse(localStorage.getItem("skm-earth-view-v1")||"null"))}catch{}var mr=new yl,Bn=new _n;mr.add(Bn);var Pt=new yn(46,1,.1,100),Sn;try{Sn=new vl({canvas:Ob,antialias:!0,alpha:!0,powerPreference:"low-power"})}catch(n){throw fi.textContent="\uC774 \uD654\uBA74\uC5D0\uC11C\uB294 \uC9C0\uAD6C\uBCF8\uC744 \uC2DC\uC791\uD558\uC9C0 \uBABB\uD588\uC5B4\uC694. \uBE0C\uB77C\uC6B0\uC800\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4\uC8FC\uC138\uC694.",n}Sn.setPixelRatio(Math.min(devicePixelRatio||1,2));Sn.outputColorSpace=zt;Sn.toneMapping=Jf;Sn.toneMappingExposure=1.2;mr.add(new Dl("#d6e4ff",.9));var Ac=new Ll("#fffaf1",3.8);mr.add(Ac);mr.add(new Il("#d4e7ff","#91a2b8",.55));var Je=2048,Ct=1024,Pc=document.createElement("canvas"),vh=document.createElement("canvas"),dr=Math.min(4096,Sn.capabilities.maxTextureSize),Bo=dr/2;Pc.width=dr;Pc.height=Bo;vh.width=Je;vh.height=Ct;var Yn=Pc.getContext("2d"),rs=vh.getContext("2d",{willReadFrequently:!0}),Hb=uc().scale(Je/(2*Math.PI)).translate([Je/2,Ct/2]),Vb=uc().scale(dr/(2*Math.PI)).translate([dr/2,Bo/2]),Gb=lc(Vb,Yn),Wb=lc(Hb,rs);at.dataset.surfaceResolution=dr+"\xD7"+Bo;rs.fillStyle="#ffffff";for(let n of xh)rs.beginPath(),Wb(n),rs.fill();var yh=rs.getImageData(0,0,Je,Ct).data;function _h(n,e){let t=vt(Math.floor((n+180)/360*Je),0,Je-1),i=vt(Math.floor((90-e)/180*Ct),0,Ct-1);return yh[(i*Je+t)*4+3]>100}var cs=new ar(Pc);cs.colorSpace=zt;cs.anisotropy=Math.min(8,Sn.capabilities.getMaxAnisotropy());var hc=null,ch=null,nh=null,ui=null,Fo=null,uh=null,fh=null,fr={lon:-158,lat:3,width:56,height:28},Mh=document.createElement("canvas");Mh.width=Je;Mh.height=Ct;var $a=Mh.getContext("2d",{willReadFrequently:!0}),Ic=document.createElement("canvas");Ic.width=Je;Ic.height=Ct;var ex=Ic.getContext("2d"),dh=new ar(Ic);dh.anisotropy=Math.min(8,Sn.capabilities.getMaxAnisotropy());function us(){if(Yn.fillStyle="#042444",Yn.fillRect(0,0,dr,Bo),uh)Yn.drawImage(uh,0,0,dr,Bo);else{Yn.fillStyle="#466356";for(let n of xh)Yn.beginPath(),Gb(n),Yn.fill()}Fo&&(Yn.save(),Yn.globalCompositeOperation="source-over",Yn.globalAlpha=ye.engraving/100*.76,Yn.drawImage(Fo,0,0,dr,Bo),Yn.restore()),cs.needsUpdate=!0}us();var di=new Ea({map:cs,roughness:.9,metalness:0,bumpScale:.025,transparent:!0}),fs={value:kl(new Date)};di.userData.solar=fs;di.onBeforeCompile=n=>{n.uniforms.skmSun=fs,n.vertexShader=`varying vec3 skmEarthNormal;
`+n.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
 skmEarthNormal=normalize(position);`),n.fragmentShader=n.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
 float surveyLuma=dot(diffuseColor.rgb,vec3(.2126,.7152,.0722)); diffuseColor.rgb=mix(vec3(surveyLuma),diffuseColor.rgb,.24)*vec3(.8,.94,.96);`),n.fragmentShader=`uniform vec3 skmSun; varying vec3 skmEarthNormal;
`+n.fragmentShader.replace("#include <opaque_fragment>",`outgoingLight*=mix(.66,1.,smoothstep(-.18,.18,dot(normalize(skmEarthNormal),skmSun)));
#include <opaque_fragment>`)};var Lc=document.createElement("canvas");Lc.width=Je;Lc.height=Ct;var Sh=Lc.getContext("2d"),Ei=Sh.createImageData(Je,Ct);for(let n=0;n<Ei.data.length;n+=4){let e=yh[n+3]>100?235:72;Ei.data[n]=Ei.data[n+1]=Ei.data[n+2]=e,Ei.data[n+3]=255}Sh.putImageData(Ei,0,0);di.roughnessMap=new ar(Lc);var tx=matchMedia("(pointer:coarse)").matches?320:480,Oo=new Wn(Rt,tx,tx/2),ih=new Float32Array(Oo.attributes.position.array),xx=new Ft(Oo,di);Bn.add(xx);var hh=zm(Bn,hr,_h,Rt);function nx(n,e){let t=Math.floor(n),i=Math.floor(e),r=n-t,o=e-i,a=r*r*(3-2*r),s=o*o*(3-2*o),l=(f,d)=>{let h=Math.sin(f*127.1+d*311.7)*43758.5453;return h-Math.floor(h)},u=l(t,i)*(1-a)+l(t+1,i)*a,c=l(t,i+1)*(1-a)+l(t+1,i+1)*a;return u*(1-s)+c*s}function qb(n,e){let t=nx(n*.11,e*.11)*2.4,i=r=>Math.pow(1-Math.abs(2*nx(n*r+t,e*r-t)-1),2);return .38+.34*i(.2)+.19*i(.43)+.09*i(.91)}function Xb(n,e){if(!ui)return 0;let t=vt(n*(Je-1),0,Je-1),i=vt((1-e)*(Ct-1),0,Ct-1),r=Math.floor(t),o=Math.floor(i),a=Math.min(r+1,Je-1),s=Math.min(o+1,Ct-1),l=t-r,u=i-o,c=ui[o*Je+r]*(1-l)+ui[o*Je+a]*l,f=ui[s*Je+r]*(1-l)+ui[s*Je+a]*l;return c*(1-u)+f*u}function vx(){let n=ex.createImageData(Je,Ct),e=ye.engraving/100;for(let t=0;t<n.data.length;t+=4){let i=ch?ch[t]*.3:0,r=ui?ui[t/4]*145*e:0,o=vt(Math.round(100+i+r),0,255);n.data[t]=n.data[t+1]=n.data[t+2]=o,n.data[t+3]=255}ex.putImageData(n,0,0),dh.needsUpdate=!0,di.bumpMap=dh,di.needsUpdate=!0}function Yb(){if(!ui||fh===ye.engraving)return;fh=ye.engraving;let n=Oo.attributes.position,e=Oo.attributes.uv,t=.11*ye.engraving/100,i=0,r=Rt,o=0;for(let a=0;a<n.count;a++){let s=Xb(e.getX(a),e.getY(a))*t,l=(Rt+s)/Rt,u=a*3;n.setXYZ(a,ih[u]*l,ih[u+1]*l,ih[u+2]*l),s>1e-4&&i++,r=Math.min(r,Rt+s),o=Math.max(o,Rt+s)}n.needsUpdate=!0,Oo.computeVertexNormals(),Oo.computeBoundingSphere(),at.dataset.logoRelief="raised-ocean-ridge",at.dataset.logoLongitude=String(fr.lon),at.dataset.logoLatitude=String(fr.lat),at.dataset.raisedVertices=String(i),at.dataset.minimumRadius=r.toFixed(4),at.dataset.maximumRadius=o.toFixed(4),at.dataset.engraving=String(ye.engraving),vx(),us(),st()}function ix(){let n=ke.querySelector(".earth-logo img");if(!n.naturalWidth)return;let e=(fr.lon+180-fr.width/2)/360*Je,t=(90-fr.lat-fr.height/2)/180*Ct,i=fr.width/360*Je,r=fr.height/180*Ct;$a.clearRect(0,0,Je,Ct),$a.filter="blur(1px)";for(let s of[-Je,0,Je])$a.drawImage(n,127,395,1020,507,e+s,t,i,r);$a.filter="none",nh=$a.getImageData(0,0,Je,Ct).data,ui=new Float32Array(Je*Ct),Fo=document.createElement("canvas"),Fo.width=Je,Fo.height=Ct;let o=Fo.getContext("2d"),a=o.createImageData(Je,Ct);for(let s=Math.max(0,Math.floor(t)-5);s<Math.min(Ct,Math.ceil(t+r)+5);s++)for(let l=Math.floor(e)-5;l<Math.ceil(e+i)+5;l++){let u=(l%Je+Je)%Je,c=s*Je+u,f=c*4,d=nh[f+3]/255;if(!d)continue;let h=qb(l-e,s-t);ui[c]=Math.pow(d,.85)*h,a.data[f]=9+h*20,a.data[f+1]=47+h*55,a.data[f+2]=72+h*58,a.data[f+3]=Math.round(d*220);let m=72+133*d;Ei.data[f]=Ei.data[f+1]=Ei.data[f+2]=m}o.putImageData(a,0,0),Sh.putImageData(Ei,0,0),di.roughnessMap.needsUpdate=!0,hh.setLogo(nh,ui,Je,Ct,ye.engraving/100),at.dataset.logoDots=String(hh.logoCount()),fh=null,Yb()}var ph=new Vn({side:Qt,toneMapped:!1,depthWrite:!1,depthTest:!1}),gr=new Ft(new Wn(70,64,32),ph);gr.rotation.set(27*Rn,36*Rn,0,"YXZ");gr.renderOrder=-100;gr.visible=!1;mr.add(gr);new sr().load("app/earth-assets/deep-star-map.jpg",n=>{n.colorSpace=zt,ph.map=n,ph.needsUpdate=!0,gr.visible=!0,at.dataset.starTexture="loaded",st()});var os=Vm(mr,gr,at,st),yx=new sr;yx.load("app/earth-assets/earth-day.jpg",n=>{uh=n.image,at.dataset.dayTexture="loaded",us(),n.colorSpace=zt,n.anisotropy=Math.min(8,Sn.capabilities.getMaxAnisotropy()),di.map=cs,di.needsUpdate=!0,n.dispose(),st()},void 0,()=>{fi.textContent="\uC9C0\uAD6C \uD45C\uBA74 \uC774\uBBF8\uC9C0\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC5B4\uC694."});var ko=new Ea({transparent:!0,opacity:.92,depthWrite:!1,roughness:1}),Zb=2*Math.PI/240,zo=new Ft(new Wn(Rt*1.018,128,64),ko);zo.visible=!1;Bn.add(zo);yx.load("app/earth-assets/earth-clouds.png",n=>{n.colorSpace=zt,n.anisotropy=Math.min(8,Sn.capabilities.getMaxAnisotropy()),ko.map=n,ko.needsUpdate=!0,zo.visible=!0,at.dataset.cloudTexture="loaded",st()},void 0,()=>{fi.textContent="\uAD6C\uB984 \uC774\uBBF8\uC9C0\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC5B4\uC694."});new sr().load("app/earth-assets/earth-topology.png",n=>{n.anisotropy=Math.min(8,Sn.capabilities.getMaxAnisotropy());let e=document.createElement("canvas");e.width=Je,e.height=Ct;let t=e.getContext("2d");t.drawImage(n.image,0,0,Je,Ct);try{let i=t.getImageData(0,0,Je,Ct).data;ch=i,hc=document.createElement("canvas"),hc.width=Je,hc.height=Ct;let r=hc.getContext("2d"),o=r.createImageData(Je,Ct);for(let a=1;a<Ct-1;a++)for(let s=1;s<Je-1;s++){let l=(a*Je+s)*4;if(yh[l+3]<100)continue;let u=(i[l-4]-i[l+4])*.7+(i[l-Je*4]-i[l+Je*4])*.9,c=u<0?[65,105,142]:[255,255,255];o.data[l]=c[0],o.data[l+1]=c[1],o.data[l+2]=c[2],o.data[l+3]=Math.min(155,Math.abs(u)*6)}r.putImageData(o,0,0),vx(),us()}catch{}n.dispose(),st()},void 0,()=>{fi.textContent="\uC9C0\uD615 \uC74C\uC601\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD574 \uAD6D\uAC00 \uC724\uACFD\uC73C\uB85C \uD45C\uC2DC\uD558\uACE0 \uC788\uC5B4\uC694."});var bh=[];for(let n=-78;n<84;n+=.7){let e=.7/Math.max(.25,Math.cos(n*Rn));for(let t=-180;t<180;t+=e){let i=Math.sin(n*197+t*153)*.2;if(_h(t+i,n-i)){let r=hr(n-i,t+i,Rt+.006);bh.push(r.x,r.y,r.z)}}}var YC=new Float32Array(bh),Kb=new Si(new Vt().setAttribute("position",new Tt(bh,3)),new ai({color:"#7198b8",size:.009,transparent:!0,opacity:.24,depthWrite:!1}));Kb.visible=!1;var wh=new Ft(new Wn(Rt*1.014,96,64),new Tn({transparent:!0,depthWrite:!1,uniforms:{tint:{value:new $e("#1f9fe5")},lightDirection:{value:new z(1,1,1).normalize()}},vertexShader:"varying vec3 n; varying vec3 v; void main(){vec4 p=modelViewMatrix*vec4(position,1.);n=normalize(normalMatrix*normal);v=normalize(-p.xyz);gl_Position=projectionMatrix*p;}",fragmentShader:"uniform vec3 tint;uniform vec3 lightDirection;varying vec3 n;varying vec3 v;void main(){float rim=pow(1.-max(0.,dot(normalize(n),normalize(v))),2.4);float day=smoothstep(-.25,.7,dot(normalize(n),normalize(lightDirection)));gl_FragColor=vec4(tint,rim*day*.94);}"}));Bn.add(wh);var rx=new z,ox=new z,ds=new _n;Bn.add(ds);var _x=[],ax=Kt[0];for(let n of Kt.slice(1)){let e=Dd([ax.lon,ax.lat],[n.lon,n.lat]),t=e.distance,i=[];for(let r=0;r<=96;r++){let o=r/96,[a,s]=e(o);i.push(hr(s,a,Rt+.025+Math.sin(o*Math.PI)*Math.min(.65,t*.32)))}_x.push(i),ds.add(new So(new Vt().setFromPoints(i),new Ur({color:"#7ebfff",transparent:!0,opacity:.27})))}var Dc=Ym(_x);Dc.group.scale.setScalar(1);Dc.group.children.forEach(n=>n.scale.setScalar(.045));ds.add(Dc.group);var as=Zm(Kt,hr,_h,Rt);Bn.add(as);as.material.userData.solar=fs;as.material.onBeforeCompile=n=>{n.uniforms.skmSun=fs,n.vertexShader=`uniform vec3 skmSun; varying float lightLevel;
`+n.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
 lightLevel=1.-smoothstep(-.22,.08,dot(normalize(position),skmSun));`),n.fragmentShader=`varying float lightLevel;
`+n.fragmentShader.replace("#include <opaque_fragment>",`diffuseColor.a*=lightLevel;
#include <opaque_fragment>`)};var pc=0,Qa=null,sx=-1,mc=0,Ho=0;function Mx(n){Qa!==null&&!ss&&(pc+=Math.min((n-Qa)/1e3,.3)),Qa=n;let e=Date.now(),t=Math.floor(e/6e4);if(sx!==t){sx=t;let r=new Date(e),o=kl(r);mc=Xm(r,o),fs.value.copy(o),os.date(r,o),Ac.intensity=3.8-1.9*mc,ko.opacity=.92-.26*mc,as.material.opacity=mc*.7+.25}zo.rotation.y=pc*Zb,Dc.update(pc);let i=pt.focus;hh.update(i,pc),xx.visible=i>.005,di.opacity=i,zo.visible=i>.005&&!!ko.map,ko.opacity=i*.55,wh.visible=i>.025,ds.visible=ye.connections&&i>.3,as.visible=!1,gr.visible=!1,at.dataset.cloudAngle=zo.rotation.y.toFixed(5),at.dataset.mapMode=i>.5?"terrain":"survey"}function zr(){return!document.hidden&&!document.body.classList.contains("bm-open")&&!document.body.classList.contains("district-open")&&!ke.classList.contains("feature-open")&&!document.querySelector("dialog[open]")}function Sx(){clearTimeout(Ho),zr()&&(Ho=setTimeout(()=>{!zr()||Zn||(Mx(performance.now()),Sn.render(mr,Pt),Ix(),Sx())},ss?3e4:65))}for(let n of Kt)n.point=hr(n.lat,n.lon,Rt+.025);var Ec=ke.querySelector("select"),lx=ke.querySelector(".earth-city-title h2"),$b=ke.querySelector(".earth-country"),es=ke.querySelector(".earth-focus-label");for(let n of Object.keys(Sc)){let e=document.createElement("optgroup");e.label=Sc[n];for(let t of Kt.filter(i=>i.country===n)){let i=document.createElement("option");i.value=t.id,i.textContent=t.ko,e.appendChild(i)}Ec.appendChild(e)}var ZC=ke.querySelector(".earth-drop-panel"),KC=ke.querySelector(".earth-drop-grid"),Ci=ke.querySelector(".earth-booking-panel"),cx=ke.querySelector(".earth-features"),Jb={dgtg:{icon:"grid-2x2",title:"DGTG-01",menu:"DGTG-01",subtitle:""},gloves:{icon:"hand",title:"\uC7A5\uAC11 \uB4DC\uB86D",menu:"GLOVE DROP",subtitle:"\uC7A5\uAC11 \uD53D\uC5C5"},tattoo:{icon:"pen-tool",title:"\uC138\uC158 \uC608\uC57D",menu:"SESSION BOOKING",subtitle:"\uC138\uC158 \uC608\uC57D"},music:{icon:"headphones",title:"\uC74C\uC545",menu:"SOUND SYSTEM",subtitle:"\uB3C4\uC2DC\uC758 \uC74C\uC545"},more:{icon:"grid-2x2",title:"\uAE30\uD0C0 \uAE30\uB2A5",menu:"EXPLORE",subtitle:"\uAE30\uD0C0 \uAE30\uB2A5"}},hi=dg(ke,xh);function jb(n){Kn(),Ci.hidden=!0,hi.render(n),hi.setOpen(!0)}Jm(ke);var In=ke.querySelector(".earth-music-panel"),Gt=In.querySelector("audio"),mh=In.querySelector(".earth-music-play"),ts=In.querySelector(".earth-music-seek"),Tc=In.querySelector(".earth-music-error"),Qb="assets/music/",bx={1835848:"bogwangdong-59",1850147:"3HM",1853909:"BABIapk",2643743:"rh042",2988507:"paris-1",6167865:"skinomakase-2025",6173331:"sleep",6077243:"wolf-guide",5368361:"never-stop",5128581:"banban",1819729:"my-love-cantonese",1880252:"skinomakase-2025"},wx=n=>bx[n.id].replaceAll("-"," "),gh=null;function ux(n){return Number.isFinite(n)?Math.floor(n/60)+":"+String(Math.floor(n%60)).padStart(2,"0"):"\u2014:\u2014"}function hs(){let n=!Gt.paused&&!Gt.ended,e=Number.isFinite(Gt.duration)&&Gt.duration>0;mh.setAttribute("aria-label",n?"\uC77C\uC2DC\uC815\uC9C0":"\uC7AC\uC0DD"),mh.querySelector("span").textContent=n?"PAUSE":"PLAY",In.dataset.playing=String(n),In.dataset.city=gh||"",In.querySelector('[data-audio-time="elapsed"]').textContent=ux(Gt.currentTime),In.querySelector('[data-audio-time="duration"]').textContent=ux(Gt.duration),ts.disabled=!e,ts.max=e?Gt.duration:100,ts.value=Gt.currentTime||0}function Kn(){Gt.pause(),In.hidden=!0}function ew(n){hi.setOpen(!1),Ci.hidden=!0,In.hidden=!1,In.querySelector("h2").textContent=n.label.toLowerCase().replace(/\b[a-z]/g,e=>e.toUpperCase()),In.querySelector("h3").textContent=wx(n),gh!==n.id&&(Gt.pause(),gh=n.id,Tc.textContent="",Gt.src=Qb+bx[n.id]+".mp3",Gt.preload="metadata",Gt.load()),hs()}mh.addEventListener("click",async()=>{if(!Gt.paused){Gt.pause();return}Tc.textContent="";try{await Gt.play()}catch{Tc.textContent="\uC74C\uC6D0\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC5B4\uC694. \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694."}hs()});In.querySelector(".earth-music-close").addEventListener("click",Kn);ts.addEventListener("input",()=>{Number.isFinite(Gt.duration)&&(Gt.currentTime=Number(ts.value)),hs()});for(let n of["play","pause","ended","timeupdate","loadedmetadata","emptied"])Gt.addEventListener(n,hs);Gt.addEventListener("error",()=>{Tc.textContent="\uC74C\uC6D0\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC5B4\uC694. \uC5F0\uACB0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD574\uC8FC\uC138\uC694.",hs()});ke.addEventListener("keydown",n=>{n.key==="Escape"&&(ke.querySelector(".earth-extra-menu").hidden=!0,Kn(),hi.setOpen(!1),Ci.hidden=!0)});function Ax(n){cx.replaceChildren();for(let e of n.features){let t=Jb[e];if(!t)continue;let i=document.createElement("button");i.type="button",i.className="earth-feature cursor-interaction",i.dataset.feature=e,i.setAttribute("aria-label",n.ko+" "+t.title+" \uBCF4\uAE30"),i.innerHTML='<span class="earth-feature-icon"><i data-lucide="'+t.icon+'" aria-hidden="true"></i></span><span><strong>'+t.menu+"</strong><small>"+(e==="music"?wx(n):t.subtitle)+'</small></span><i data-lucide="chevron-right" aria-hidden="true"></i>',i.addEventListener("click",()=>{e!=="more"&&(ke.querySelector(".earth-extra-menu").hidden=!0),e==="more"?(Kn(),hi.setOpen(!1),Ci.hidden=!0,ke.querySelector(".earth-extra-menu").hidden=!ke.querySelector(".earth-extra-menu").hidden):e==="music"?ew(n):e==="dgtg"?window.open("https://4thdeath.com/products/dgtg-01","_blank","noopener,noreferrer"):e==="gloves"?jb(n):aw(n),pr()}),cx.appendChild(i)}px.createIcons()}function tw(n){hi.render(n)}function Ex(){let n=Kt.find(t=>t.id===ye.selected);Ec.value=n.id,$b.textContent=Sc[n.country],lx.replaceChildren(document.createTextNode(n.label));let e=document.createElement("span");e.textContent=n.ko,lx.appendChild(e),ke.querySelector(".survey-coordinates").textContent=Math.abs(n.lat).toFixed(2)+"\xB0 "+(n.lat>=0?"N":"S")+" / "+Math.abs(n.lon).toFixed(2)+"\xB0 "+(n.lon>=0?"E":"W"),tw(n),es.querySelector("span").textContent=Sc[n.country],es.querySelector("strong").textContent=n.label,Ax(n)}function Uc(n,e=!0){ls(),Hr.dismissSatellite(),Hr.hide(),ke.querySelector(".survey-cities").hidden=!0,ke.querySelector("[data-survey=cities]").setAttribute("aria-expanded","false"),Fc();let t=Kt.find(i=>i.id===n);t&&(ye.selected!==t.id&&(ke.querySelector(".earth-extra-menu").hidden=!0,Kn(),hi.setOpen(!1),Ci.hidden=!0),ye.selected=t.id,e&&(ye.cityFocus=!0,ye.zoom=1,ps(),ye.lon=pt.lon+(((t.lon-pt.lon+180)%360+360)%360-180),ye.lat=t.lat-18),us(),Ex(),st(),pr())}var ns=ke.querySelector(".survey-cities");for(let n of Kt){let e=document.createElement("button");e.type="button",e.textContent=n.label,e.onclick=()=>Uc(n.id),ns.append(e)}ke.querySelector("[data-survey=cities]").onclick=n=>{ns.hidden=!ns.hidden,n.currentTarget.setAttribute("aria-expanded",String(!ns.hidden))};ke.querySelector(".survey-date").textContent=new Date().toISOString().slice(0,10).replaceAll("-"," / ");var Tx=ke.querySelector(".earth-world");function ps(){ke.classList.toggle("city-focus",ye.cityFocus),ke.dataset.view=ye.cityFocus?"city":"world",Tx.hidden=!ye.cityFocus,ke.querySelector(".earth-city-panel").hidden=!ye.cityFocus}ps();Tx.addEventListener("click",Eh);Ec.addEventListener("change",()=>Uc(Ec.value));Ci.querySelector("button").addEventListener("click",()=>Ci.hidden=!0);ke.querySelector(".earth-glove-close").addEventListener("click",()=>{let n=ke.querySelector(".earth-feature[data-feature="+(ke.classList.contains("gloves-open")?"gloves":In.hidden?"more":"music")+"]");hi.setOpen(!1),Kn(),Ci.hidden=!0,ke.querySelector(".earth-extra-menu").hidden=!0,requestAnimationFrame(()=>n?.focus({preventScroll:!0}))});Ex();px.createIcons();var Cx=!0,Rx=[],Nc=document.createElementNS("http://www.w3.org/2000/svg","svg");Nc.classList.add("earth-pin-leaders");Nc.setAttribute("aria-hidden","true");Rc.append(Nc);var nw=Kt.map(()=>{let n=document.createElementNS("http://www.w3.org/2000/svg","line");return Nc.append(n),n});for(let n=0;n<Kt.length;n++){let e=document.createElement("button");e.type="button",e.className="earth-pin cursor-interaction",e.hidden=!0,e.innerHTML='<span class="earth-cluster-count" hidden></span><span class="survey-pin-label"></span>',e.addEventListener("click",()=>{if(performance.now()<is)return;let t=e.dataset.ids.split(","),i=t.indexOf(ye.selected);Uc(t[(i+1)%t.length])}),Rc.appendChild(e),Rx.push(e)}function rh(n){let e=n.clone().project(Pt);return{x:(e.x*.5+.5)*It,y:(-.5*e.y+.5)*Lt}}var Px=Wm(Rc,(n,e)=>hr(n,e,Rt+.04),n=>window.SKMLanguage?.t(n)||n,()=>performance.now()>=is),Hr=Qh({root:ke,layer:Rc,vector:hr,R:Rt,cities:Kt,selectedCity:()=>Kt.find(n=>n.id===ye.selected),wake:st,setCameras:n=>{Cx=n,st()},openCamera:n=>Px.open(n),isVisible:()=>zr(),followPoint:(n,e)=>{ye.lon=pt.lon+(((e-pt.lon+180)%360+360)%360-180),ye.lat=n,st()},focusPoint:(n,e)=>{ye.cityFocus=!1,ps(),ye.lon=pt.lon+(((e-pt.lon+180)%360+360)%360-180),ye.lat=n,ye.zoom=1.15,st(),pr()}}),Vo=document.createElement("div"),Ti=document.createElement("span");Vo.className="sky-finder";Ti.className="sky-target-name";Ti.hidden=!0;at.append(Ti);ke.querySelector(".earth-app").append(Vo);var fx={ko:["\uD0DC\uC591","\uB2EC"],en:["Sun","Moon"],ja:["\u592A\u967D","\u6708"],zh:["\u592A\u9633","\u6708\u4EAE"],"zh-Hant":["\u592A\u967D","\u6708\u4EAE"],ru:["\u0421\u043E\u043B\u043D\u0446\u0435","\u041B\u0443\u043D\u0430"],fr:["Soleil","Lune"],es:["Sol","Luna"],de:["Sonne","Mond"],pt:["Sol","Lua"],it:["Sole","Luna"]},Go=null;function Ah(){let n=fx[window.SKMLanguage?.code]||fx.en;[...Vo.children].forEach((e,t)=>{e.title=n[t],e.setAttribute("aria-label",n[t])}),Go&&(Ti.textContent=n[Go==="sun"?0:1])}function Fc(){Go=null,Ti.hidden=!0;for(let n of Vo.children)n.setAttribute("aria-pressed","false")}for(let[n,e]of[["sun","\u2600"],["moon","\u263E"]]){let t=document.createElement("button");t.type="button",t.dataset.aim=n,t.textContent=e,t.setAttribute("aria-pressed","false"),Vo.append(t),t.onclick=()=>{let i=new Date;os.date(i,kl(i));let r=os.direction(n),o=Math.atan2(-r.z,r.x)/Rn+180;ye.lon=pt.lon+(((o-pt.lon+180)%360+360)%360-180),ye.lat=vt(-Math.asin(r.y)/Rn+Math.atan(.6*Math.tan(Pt.fov*Rn/2))/Rn,-75,75),ye.zoom=.85,Go=n,Ah(),nt.tx=nt.ty=0;for(let a of Vo.children)a.setAttribute("aria-pressed",String(a===t));st()}}window.addEventListener("skm-language",Ah);Ah();function Ix(){if(Go&&!ye.cityFocus){let i=os.screenPoint(Go,Pt);Ti.hidden=i.z>=1||i.z<0||Math.abs(i.x)>.94||Math.abs(i.y)>.85,Ti.hidden||(Ti.style.left=(i.x+1)*It/2+"px",Ti.style.top=(1-i.y)*Lt/2+17+"px")}else Ti.hidden=!0;let n=Pt.position.clone().normalize(),e=[],t=null;for(let i of Kt){if(ye.cityFocus&&i.id!==ye.selected)continue;let r=Bn.localToWorld(i.point.clone());if(r.clone().normalize().dot(n)<Rt/Pt.position.length()+.015)continue;let a=rh(r);a.x<12||a.x>It-12||a.y<14||a.y>Lt-64||(i.id===ye.selected&&(t=a),e.push({x:a.x,y:a.y,anchorX:a.x,anchorY:a.y,ids:[i.id]}))}for(let i=0;i<16;i++)for(let r=0;r<e.length;r++)for(let o=r+1;o<e.length;o++){let a=e[r],s=e[o],l=s.x-a.x,u=s.y-a.y,c=Math.hypot(l,u);if(c>=48)continue;c<.001&&(l=0,u=1,c=1);let f=(48-c)/2,d=l/c,h=u/c;a.x=vt(a.x-d*f,28,It-28),a.y=vt(a.y-h*f,28,Lt-64),s.x=vt(s.x+d*f,28,It-28),s.y=vt(s.y+h*f,28,Lt-64)}nw.forEach((i,r)=>{let o=e[r],a=o&&Math.hypot(o.x-o.anchorX,o.y-o.anchorY)>4;i.style.display=a?"":"none",a&&(i.setAttribute("x1",o.anchorX),i.setAttribute("y1",o.anchorY),i.setAttribute("x2",o.x),i.setAttribute("y2",o.y))}),Rx.forEach((i,r)=>{let o=e[r];if(i.hidden=!o,i.style.display=o?"grid":"none",!o)return;i.style.left=o.x+"px",i.style.top=o.y+"px",i.dataset.ids=o.ids.join(","),i.dataset.cityName=Kt.find(s=>s.id===o.ids[0])?.label||"",i.dataset.labelSide=o.x>It-115?"left":"right",i.querySelector(".survey-pin-label").textContent=Kt.find(s=>s.id===o.ids[0]).label,i.setAttribute("aria-label",o.ids.map(s=>Kt.find(l=>l.id===s).ko).join(" \xB7 ")+" \uB3C4\uC2DC \uAE30\uB2A5 \uBCF4\uAE30"),i.setAttribute("aria-pressed",String(o.ids.includes(ye.selected)));let a=i.firstElementChild;a.hidden=o.ids.length===1,a.style.display=o.ids.length===1?"none":"grid",a.textContent=o.ids.length}),Px(i=>{if(!Cx)return null;let r=Bn.localToWorld(i.clone());if(r.clone().normalize().dot(n)<Rt/Pt.position.length()+.015)return null;let o=rh(r);return o.x<10||o.x>It-10||o.y<24||o.y>Lt-32?null:o},e,It,Lt),Hr.render(i=>{let r=Bn.localToWorld(i.clone());if(r.clone().normalize().dot(n)<Rt/Pt.position.length()+.015)return null;let o=rh(r);return o.x<20||o.x>It-20||o.y<60||o.y>Lt-80?null:o}),es.style.display=t?"flex":"none",t&&(es.style.left=vt(t.x+18,10,It-125)+"px",es.style.top=vt(t.y+15,12,Lt-95)+"px")}function gc(n,e,t,i,r,o=115,a=21){return ss||(n[t]+=(i-n[e])*o*r,n[t]*=Math.exp(-a*r),n[e]+=n[t]*r,Math.abs(n[e]-i)<3e-4&&Math.abs(n[t])<3e-4)?(n[e]=i,n[t]=0,!1):!0}function iw(n){Zn=0;let e=Math.min((n-sh)/1e3||1/60,1/30);sh=n;let t=!1;if(kr&&!zr()&&ls(),kr){let s=(0,Cc.stepGlobeSpin)(kr,e);ye.lon+=s.delta,pt.lon=ye.lon,Wi.lon=0,kr=s.speed,t=!0,kr||pr()}for(let s of["lon","lat","zoom"]){let l={p:pt[s],v:Wi[s]};t=gc(l,"p","v",ye[s],e)||t,pt[s]=l.p,Wi[s]=l.v}let i={p:pt.focus,v:Wi.focus};t=gc(i,"p","v",ye.cityFocus?1:0,e,100,19)||t,pt.focus=vt(i.p,0,1),Wi.focus=i.v,Pt.setViewOffset(It,Lt,-It*.3*pt.focus,0,It,Lt);let r=ye.elasticity/100;t=gc(nt,"x","vx",nt.tx,e,110-r*50,21-r*8)||t,t=gc(nt,"y","vy",nt.ty,e,110-r*50,21-r*8)||t;let o=ah+(mx-ah)*pt.focus,a=Rt+(o-Rt)/pt.zoom;Pt.position.copy(hr(pt.lat+nt.y*.9,pt.lon+nt.x*1.2,a)),gr.position.copy(Pt.position),Pt.lookAt(0,0,0),Pt.setViewOffset(It,Lt,-It*.18*pt.focus,-Lt*.78*pt.focus,It,Lt),Pt.updateProjectionMatrix(),Pt.updateMatrixWorld(),rx.setFromMatrixColumn(Pt.matrixWorld,0),ox.setFromMatrixColumn(Pt.matrixWorld,1),Ac.position.copy(Pt.position).normalize().multiplyScalar(15).addScaledVector(rx,22).addScaledVector(ox,10),wh.material.uniforms.lightDirection.value.copy(Ac.position).transformDirection(Pt.matrixWorldInverse),Bn.scale.set(1+nt.x*.006,1-nt.x*.004+nt.y*.004,1),Bn.rotation.z=nt.x*.004,Bn.updateMatrixWorld(!0),di.bumpScale=.015+ye.relief/100*.025,ds.visible=ye.connections,os.view(Pt),Mx(n),Sn.render(mr,Pt),Ix(),ke.querySelector('[data-view="reset"]').textContent=Math.round(pt.zoom*100)+"%",at.dataset.zoom=String(Math.round(pt.zoom*100)),at.dataset.longitude=String(Math.round(pt.lon)),at.dataset.city=ye.selected,at.dataset.focus=pt.focus.toFixed(3),at.dataset.tilt=String(Math.round(Math.hypot(nt.x,nt.y)*100)),t?st():Sx()}function st(){clearTimeout(Ho),!Zn&&!document.hidden&&!document.body.classList.contains("bm-open")&&!document.body.classList.contains("district-open")&&(Zn=requestAnimationFrame(iw))}function Lx(){let n=at.getBoundingClientRect();if(n.width<1||n.height<1)return;It=n.width,Lt=n.height,Pt.aspect=It/Lt,Pt.setViewOffset(It,Lt,0,0,It,Lt),Pt.updateProjectionMatrix(),Sn.setSize(It,Lt,!1);let e=Math.min(It*.39,Lt*.29),t=Lt/(2*Math.tan(Pt.fov*Rn/2));ah=Math.sqrt(Math.pow(t*Rt/e,2)+Rt*Rt);let i=Lt*1.15;mx=Math.sqrt(Math.pow(t*Rt/i,2)+Rt*Rt),st()}new ResizeObserver(Lx).observe(at);Lx();fi.textContent="";function Oc(n){ye.zoom=vt(n,.75,2.6),st(),pr()}function Eh(){ls(),Hr.dismissSatellite(),Fc(),Object.assign(ye,{lon:pt.lon+(((bc.lon-pt.lon+180)%360+360)%360-180),lat:bc.lat,zoom:1,cityFocus:!1}),Kn(),hi.setOpen(!1),Ci.hidden=!0,ke.querySelector(".earth-extra-menu").hidden=!0,ps(),nt.tx=nt.ty=0,st(),pr()}ke.querySelector('[data-view="in"]').addEventListener("click",()=>Oc(ye.zoom*1.25));ke.querySelector('[data-view="out"]').addEventListener("click",()=>Oc(ye.zoom/1.25));ke.querySelector('[data-view="reset"]').addEventListener("click",Eh);ke.querySelector(".earth-brand").addEventListener("click",ow);ke.querySelector(".earth-brand").setAttribute("aria-label","Message");ke.querySelector(".earth-zoom").addEventListener("keydown",n=>{(n.key==="ArrowLeft"||n.key==="ArrowRight")&&(n.preventDefault(),ye.lon+=n.key==="ArrowRight"?18:-18,st(),pr())});function Th(n){return n.closest(".earth-zoom,.earth-tilt,.earth-message")}at.addEventListener("wheel",n=>{Th(n.target)||(n.preventDefault(),Oc(ye.zoom*Math.exp(-vt(n.deltaY*(n.deltaMode===1?16:1),-100,100)*.003)))},{passive:!1});function Dx(n,e,t,i){return Hr.stopFollowing(),{id:n,x:e,y:t,lon:pt.lon,lat:pt.lat,lastX:e,lastY:t,lastTime:i,speedX:0,speedY:0,moved:!1}}at.addEventListener("pointerdown",n=>{if(!Th(n.target)){if(ls(),Fc(),Pn.set(n.pointerId,{x:n.clientX,y:n.clientY}),Pn.size===1)Bt=Dx(n.pointerId,n.clientX,n.clientY,performance.now());else if(Pn.size===2){let[e,t]=Pn.values();ja={distance:Math.max(1,Math.hypot(e.x-t.x,e.y-t.y)),zoom:ye.zoom},Bt=null;for(let i of Pn.keys())at.setPointerCapture(i);is=performance.now()+500}}});at.addEventListener("pointermove",n=>{if(!Pn.has(n.pointerId)){if(n.pointerType==="mouse"&&!Cn&&!Th(n.target)){let c=at.getBoundingClientRect();nt.tx=vt((n.clientX-c.left-It/2)/(It/2),-1,1)*.6,nt.ty=vt((n.clientY-c.top-Lt/2)/(Lt/2),-1,1)*.6,st()}return}if(Pn.set(n.pointerId,{x:n.clientX,y:n.clientY}),Pn.size>=2&&ja){let[c,f]=Pn.values();ye.zoom=vt(ja.zoom*Math.hypot(c.x-f.x,c.y-f.y)/ja.distance,.75,2.6),is=performance.now()+500,st();return}if(!Bt||Bt.id!==n.pointerId)return;let e=n.clientX-Bt.x,t=n.clientY-Bt.y;if(!Bt.moved&&Math.hypot(e,t)<4)return;let i=performance.now(),r=Math.max(8,i-Bt.lastTime),o=195/(It*ye.zoom),a=154/(Lt*ye.zoom),s=1-Math.exp(-r/30),l=-(n.clientX-Bt.lastX)*o/r,u=(n.clientY-Bt.lastY)*a/r;Bt.speedX+=(l-Bt.speedX)*s,Bt.speedY+=(u-Bt.speedY)*s,Bt.lastX=n.clientX,Bt.lastY=n.clientY,Bt.lastTime=i,Bt.moved=!0,at.setPointerCapture(n.pointerId),is=i+350,ye.lon=Bt.lon-e*o,ye.lat=vt(Bt.lat+t*a,-75,75),pt.lon=ye.lon,pt.lat=ye.lat,Wi.lon=0,Wi.lat=0,Cn||(nt.tx=vt(e/85,-1,1),nt.ty=vt(t/85,-1,1)),st()});function Ux(n){let e=Bt;if(Pn.delete(n.pointerId)){if(at.hasPointerCapture(n.pointerId)&&at.releasePointerCapture(n.pointerId),n.type==="pointerup"&&!ss&&e?.id===n.pointerId&&e.moved&&performance.now()-e.lastTime<90&&(ye.lon+=vt(e.speedX*90,-26,26),ye.lat=vt(ye.lat+vt(e.speedY*75,-13,13),-75,75)),ja=null,Pn.size===1){let[t,i]=Pn.entries().next().value;Bt=Dx(t,i.x,i.y,performance.now())}else Bt=null,Cn||(nt.tx=nt.ty=0);st(),pr()}}at.addEventListener("pointerup",Ux);at.addEventListener("pointercancel",Ux);at.addEventListener("pointerleave",()=>{!Pn.size&&!Cn&&(nt.tx=nt.ty=0,st())});var Nx=1;at.addEventListener("gesturestart",n=>{n.preventDefault(),Nx=ye.zoom},{passive:!1});at.addEventListener("gesturechange",n=>{n.preventDefault(),Oc(Nx*n.scale)},{passive:!1});function oh(){clearTimeout(vc),nt.tx=.95,nt.ty=-.55,st(),vc=setTimeout(()=>{nt.tx=-.55,nt.ty=.3,st(),vc=setTimeout(()=>{nt.tx=nt.ty=0,st()},420)},480)}var yc=ke.querySelector(".earth-tilt"),rw=matchMedia("(pointer:coarse)").matches;function _c(n){if(!Cn||!Number.isFinite(n.beta)||!Number.isFinite(n.gamma))return;clearTimeout(wc),Ja||(Ja={beta:n.beta,gamma:n.gamma});let e=(n.gamma-Ja.gamma)/25,t=(n.beta-Ja.beta)/28,i=(screen.orientation?.angle||0)*Rn;nt.tx=vt(e*Math.cos(i)+t*Math.sin(i),-1,1),nt.ty=vt(t*Math.cos(i)-e*Math.sin(i),-1,1),fi.textContent="",yc.querySelector("span").textContent="\uAE30\uC6B8\uAE30 \uCF1C\uC9D0",st()}yc.addEventListener("click",async()=>{if(Bx){Cn=!Cn,nt.tx=nt.ty=0,yc.setAttribute("aria-pressed",String(Cn)),st();return}if(!rw){oh();return}if(Cn){Cn=!1,window.removeEventListener("deviceorientation",_c),clearTimeout(wc),nt.tx=nt.ty=0,yc.querySelector("span").textContent="\uAE30\uC6B8\uAE30",st();return}try{if(!window.DeviceOrientationEvent)throw new Error("unavailable");if(typeof DeviceOrientationEvent.requestPermission=="function"&&await DeviceOrientationEvent.requestPermission()!=="granted"){fi.textContent="\uAE30\uC6B8\uAE30 \uAD8C\uD55C\uC774 \uC5C6\uC5B4 \uD130\uCE58\uB85C \uC870\uC791\uD560 \uC218 \uC788\uC5B4\uC694.";return}Cn=!0,Ja=null,window.addEventListener("deviceorientation",_c),wc=setTimeout(()=>{Cn=!1,window.removeEventListener("deviceorientation",_c),fi.textContent="\uC774 \uBBF8\uB9AC\uBCF4\uAE30\uB294 \uC13C\uC11C \uC2E0\uD638\uB97C \uBC1B\uC9C0 \uBABB\uD588\uC5B4\uC694. \uC544\uC774\uD3F0 \uC571\uC5D0\uC11C \uD655\uC778\uC774 \uD544\uC694\uD574\uC694.",oh()},2200)}catch{fi.textContent="\uAE30\uC6B8\uAE30 \uC5F0\uACB0\uC740 \uC544\uC774\uD3F0 \uC571\uC5D0\uC11C \uD655\uC778\uC774 \uD544\uC694\uD574\uC694. \uC6C0\uC9C1\uC784\uC744 \uBBF8\uB9AC \uBCF4\uC5EC\uC904\uAC8C\uC694.",oh()}});document.addEventListener("visibilitychange",()=>{document.hidden?(ls(),clearTimeout(Ho),Qa=null,Zn&&cancelAnimationFrame(Zn),Zn=0):(sh=performance.now(),st())});window.addEventListener("pagehide",()=>{clearTimeout(Ho),Gt.pause(),Zn&&cancelAnimationFrame(Zn),clearTimeout(lh),clearTimeout(vc),clearTimeout(wc),window.removeEventListener("deviceorientation",_c),Sn.dispose()});new MutationObserver(()=>{zr()?st():clearTimeout(Ho)}).observe(ke,{attributes:!0,attributeFilter:["class"]});document.addEventListener("close",()=>{zr()&&st()},!0);window.addEventListener("pageshow",()=>{Qa=null,st()});var xc=ke.querySelector(".earth-logo img");xc&&(xc.complete&&xc.naturalWidth?ix():xc.addEventListener("load",ix,{once:!0}));var Fx=n=>window.SKMLanguage?.t(n)||n;async function ow(){let n=ke.querySelector(".earth-brand");n.disabled=!0,Kn();try{await window.SKMEnterHome(window.SKMBooking,!!window.webkit?.messageHandlers?.skmAuth),fi.textContent="",window.openAppPage("app/messages.html")}catch{fi.textContent=Fx("loginFailed")}finally{n.disabled=!1}}function aw(n){Kn(),hi.setOpen(!1),Ci.hidden=!0,sessionStorage.setItem("skm-booking-city-v1",JSON.stringify({id:n.id,label:n.label})),window.openBodyMap()}function Ox(){let n=window.SKMLanguage?.code||"ko";ke.querySelector(".earth-language span").textContent=n.toUpperCase(),ke.querySelector(".earth-language").setAttribute("aria-label",Fx("language")),ke.querySelector(".earth-account").setAttribute("aria-label","SKINOMAKASE SESSION"),Ax(Kt.find(e=>e.id===ye.selected))}ke.querySelector(".earth-language").addEventListener("click",()=>document.getElementById("skm-language-button")?.click());ke.querySelector(".earth-account").addEventListener("click",()=>{Kn(),window.openAppPage("app/account.html")});window.addEventListener("skm-language",Ox);Ox();var Wo=ke.querySelector(".earth-extra-menu");ke.querySelector(".earth-more").addEventListener("click",()=>{Wo.hidden=!Wo.hidden});Wo.querySelector(".earth-extra-close").addEventListener("click",()=>{Wo.hidden=!0});Wo.querySelectorAll("[data-extra]").forEach(n=>n.addEventListener("click",()=>{Wo.hidden=!0,Kn();let e=n.dataset.extra;e==="venues"?window.openAppPage("app/community.html?view=venues&city="+encodeURIComponent(ye.selected)):e==="strobe"||e==="shelter"?window.openAppPage("app/"+e+".html"):e==="video"?window.openVideoPlayer():e==="accessory"&&document.getElementById("accModal").classList.add("active")}));window.SKMApp=window.SKMApp||{};var sw=window.SKMApp.onMotion;window.SKMApp.onMotion=(n,e,t)=>{sw?.(n,e,t);let i=zr()&&!Pn.size&&ns.hidden,r=gx.sample({x:n,y:e,z:t},performance.now(),i);r&&(ss||(Hr.stopFollowing(),Fc(),ye.cityFocus&&(ye.cityFocus=!1,ye.zoom=1,ps()),ye.lon=pt.lon,ye.lat=pt.lat,Wi.lon=Wi.lat=0,kr=r*760,st()),window.SKMApp.haptic?.("medium"),Hr.randomRadio())};var Bx=!!window.webkit?.messageHandlers?.haptic;if(Bx){let n=window.SKMApp?.onTilt,e=null;Cn=!0,window.SKMApp.onTilt=(t,i,r,...o)=>{n?.(t,i,r,...o),!(!Cn||document.body.classList.contains("bm-open")||document.hidden)&&(e||(e={x:t,z:r}),nt.tx=vt((t-e.x)*2.6,-1,1),nt.ty=vt((r-e.z)*2.6,-1,1),e.x+=(t-e.x)*.002,e.z+=(r-e.z)*.002,st())}}new MutationObserver(()=>{document.body.classList.contains("bm-open")?(Kn(),Zn&&(cancelAnimationFrame(Zn),Zn=0)):st()}).observe(document.body,{attributes:!0,attributeFilter:["class"]});window.addEventListener("skm-return-home",()=>st());var dx=new URLSearchParams(location.search).get("gloves"),hx=dx&&Kt.find(n=>Na[n.id]?.code===dx);hx&&(Uc(hx.id),hi.setOpen(!0));$m(ke);Km();window.addEventListener("skm-booking-home",()=>{Eh(),ke.scrollTop=0,window.SKMTheme?.returnHome?.()});})();
/*! Bundled license information:

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2024 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)

lucide/dist/esm/createElement.js:
lucide/dist/esm/replaceElement.js:
lucide/dist/esm/defaultAttributes.js:
lucide/dist/esm/icons/arrow-left.js:
lucide/dist/esm/icons/arrow-up-right.js:
lucide/dist/esm/icons/chevron-right.js:
lucide/dist/esm/icons/grid-2x2.js:
lucide/dist/esm/icons/hand.js:
lucide/dist/esm/icons/headphones.js:
lucide/dist/esm/icons/languages.js:
lucide/dist/esm/icons/lock-keyhole.js:
lucide/dist/esm/icons/map-pin.js:
lucide/dist/esm/icons/minus.js:
lucide/dist/esm/icons/move-3d.js:
lucide/dist/esm/icons/pen-tool.js:
lucide/dist/esm/icons/play.js:
lucide/dist/esm/icons/plus.js:
lucide/dist/esm/icons/send.js:
lucide/dist/esm/icons/user-round.js:
lucide/dist/esm/icons/x.js:
lucide/dist/esm/lucide.js:
  (**
   * @license lucide v0.468.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
