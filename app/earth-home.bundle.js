(()=>{var ax=Object.create;var Gh=Object.defineProperty;var ox=Object.getOwnPropertyDescriptor;var sx=Object.getOwnPropertyNames;var lx=Object.getPrototypeOf,cx=Object.prototype.hasOwnProperty;var Xa=(n,e)=>()=>(e||n((e={exports:{}}).exports,e),e.exports);var ux=(n,e,t,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of sx(e))!cx.call(n,r)&&r!==t&&Gh(n,r,{get:()=>e[r],enumerable:!(i=ox(e,r))||i.enumerable});return n};var Gr=(n,e,t)=>(t=n!=null?ax(lx(n)):{},ux(e||!n||!n.__esModule?Gh(t,"default",{value:n,enumerable:!0}):t,n));var qh=Xa((Ew,Wh)=>{"use strict";function dx(){let n=null,e=-1/0;return{reset(){n=null},sample(t,i,r=!0){if(!r||!Number.isFinite(i)||!t||![t.x,t.y,t.z].every(Number.isFinite)||i-e<2200)return n=null,0;n&&(i-n.time>450||i<n.time)&&(n=null);let a=Math.hypot(t.x,t.y,t.z);if(a<1.15)return 0;if(n){let o=i-n.time,s=(t.x*n.x+t.y*n.y+t.z*n.z)/(a*n.magnitude);if(o>=40&&o<=450&&s<-.35){let l=Math.abs(n.x)>.45?Math.sign(n.x):1;return e=i,n=null,l}return 0}return n={...t,time:i,magnitude:a},0}}}function fx(n,e){if(!Number.isFinite(n)||!Number.isFinite(e)||e<=0)return{delta:0,speed:0};let t=Math.min(e,.05),i=n*Math.exp(-2*t);return{delta:(n-i)/2,speed:Math.abs(i)<2?0:i}}Wh.exports={createShakeDetector:dx,stepGlobeSpin:fx}});var xg=Xa((k2,gg)=>{"use strict";function hb(n,e){return{...n,code:n?.code||e.label,model:n?.model||"models/skm-product.glb",previewOnly:!n?.model&&!n?.photo,publicPickup:n?.publicPickup}}gg.exports={glovePreview:hb}});var Kl=Xa((H2,_g)=>{"use strict";function pb({status:n,ownerId:e,viewerId:t,request:i,preview:r=!1}){return n==="owned"||n==="sold"||n==="collected"?{view:e&&e===t?"mine":"chat",label:e&&e===t?"\uB0B4 \uC7A5\uAC11":"\uC8FC\uC778 \uC788\uC74C"}:n==="reserved"&&!["shared","collected"].includes(i?.status)?{view:"unavailable",label:"\uC608\uC57D \uC911"}:n==="open"||n==="available"||i?.status==="shared"?{view:"pickup",label:"\uB4DC\uB86D \uAC00\uB2A5",canViewLocation:r||i?.status==="shared"}:{view:"unavailable",label:n==="closed"?"\uB4DC\uB86D \uC885\uB8CC":"\uC900\uBE44 \uC911"}}function mb(n,e){if(!e||n?.latitude==null||n?.longitude==null)return null;let t=a=>typeof a=="number"||typeof a=="string"&&a.trim()!==""&&Number.isFinite(Number(a));if(!t(n.latitude)||!t(n.longitude))return null;let i=Number(n.latitude),r=Number(n.longitude);return!Number.isFinite(i)||!Number.isFinite(r)||Math.abs(i)>90||Math.abs(r)>180?null:"https://maps.apple.com/?daddr="+encodeURIComponent(i+","+r)+"&dirflg=w"}function gb(n){return n===1?"available":n===2?"owned":n===3?"reserved":"draft"}function xb(n,e,t){let i=u=>String(u||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim().toLowerCase(),r=[e.ko,e.label,e.ascii,e.name].filter(Boolean).map(i),a=(n?.drops||[]).filter(u=>r.includes(i(u.area))&&Number(u.number)===t);if(a.length!==1)return null;let o=a[0],s=(n.requests||[]).filter(u=>u.drop_id===o.id);if(s.length>1)return null;let l=s[0];return{drop:{id:o.id,status:o.status},request:l?["shared","collected"].includes(l.status)?l:{id:l.id,status:l.status}:null}}_g.exports={routeGlove:pb,pickupLink:mb,previewSlot:gb,pickupForPair:xb}});var Sg=Xa((V2,Mg)=>{"use strict";var{pickupLink:vb}=Kl(),Ff=1e3;function Of(n){let e=String(n??"").trim();if(!/^\d+(?:[.,]\d{1,2})?$/.test(e))return null;let[t,i=""]=e.replace(",",".").split("."),r=Number(t)*100+Number(i.padEnd(2,"0"));return!Number.isSafeInteger(r)||r<Ff?null:Math.floor(r/100)+"."+String(r%100).padStart(2,"0")}function yb(n,e){let t=Of(n);if(!t)return"10.00";if(e!==1&&e!==-1)return t;let[i,r]=t.split("."),a=Number(i)*100+Number(r),o=Math.max(Ff,a+e*100);return Number.isSafeInteger(o)?Math.floor(o/100)+"."+String(o%100).padStart(2,"0"):t}function _b(n){let e=Of(n);return e?"https://paypal.me/Jinjinnoodle/"+e+"USD":null}function Mb({live:n=!1,preview:e=!1,userId:t,info:i}){if(!n)return"held";if(e)return"preview";if(!t)return"login";if(!i)return"held";let{drop:r,request:a}=i;return["owned","sold","collected"].includes(r?.status)?"owner":r?.status==="reserved"&&a?.status==="shared"&&vb(a,!0)?"pay":a?.status==="pending"?"pending":a||r?.status!=="open"?"unavailable":"request"}Mg.exports={MINIMUM_USD_CENTS:Ff,usdAmount:Of,stepUsdAmount:yb,paypalURL:_b,checkoutState:Mb}});var wg=Xa((Z2,bg)=>{"use strict";function Ab(n,e=357,t){e=Math.max(1,Number(e)||357);let i=e,r=Math.max(1,Number(t)||Math.max(640,Math.round(225e3/e))),a=Math.min(1,Math.sqrt(i*r/225e3),i/240,r/240);e=i/a;let o=r/a,s={x:e/2,y:o/2};if(!Number.isInteger(n)||n<1||n>50)return{width:i,height:r,center:{x:i/2,y:r/2},scale:a,points:[]};let l=e/2-24,u=o/2-24,c=[.27,.5,.74,1],d=[0,.24,-.08,.04],f=[Math.round(n*.12),Math.round(n*.2),Math.round(n*.28)];f.push(n-f.reduce((m,x)=>m+x,0));let h=[];f.forEach((m,x)=>{for(let g=0;g<m;g++){let p=-Math.PI/2+g/m*Math.PI*2+d[x];h.push({x:s.x+Math.cos(p)*l*c[x],y:s.y+Math.sin(p)*u*c[x]})}});for(let m=0;m<450;m++){for(let x=0;x<n;x++)for(let g=x+1;g<n;g++){let p=h[x],y=h[g],_=y.x-p.x,v=y.y-p.y,I=48-Math.abs(_),E=48-Math.abs(v);if(I>0&&E>0)if(I<E){let P=(Math.sign(_)||1)*(I/2+.01);p.x-=P,y.x+=P}else{let P=(Math.sign(v)||1)*(E/2+.01);p.y-=P,y.y+=P}}for(let x of h)x.x=Math.max(24,Math.min(e-24,x.x)),x.y=Math.max(24,Math.min(o-24,x.y)),Math.abs(x.x-s.x)<64&&Math.abs(x.y-s.y)<44&&(64-Math.abs(x.x-s.x)<44-Math.abs(x.y-s.y)?x.x=s.x+(Math.sign(x.x-s.x)||1)*64:x.y=s.y+(Math.sign(x.y-s.y)||1)*44)}return{width:i,height:r,center:{x:i/2,y:r/2},scale:a,points:h.map(m=>({x:m.x*a,y:m.y*a}))}}bg.exports={gloveNetwork:Ab}});var Uc=Gr(qh());function Xh({loadStations:n,play:e,current:t,canPlay:i=()=>!0,onSearching:r=()=>{},onError:a=()=>{},random:o=Math.random}){let s=[],l=null,u=0,c=[],d=null;function f(){return s.length?Promise.resolve(s):(l||(l=Promise.resolve().then(n).then(p=>(s=p,s)).finally(()=>{l=null})),l)}function h(){u++,c=[],d=null,r(!1)}function m(p){if(p!==u)return;if(!i()){h();return}let y=c.shift();if(!y){d=null,a();return}d=y.id,e(y)}async function x(){let p=++u;d=null,c=[],r(!0);try{let y=await f();if(p!==u)return;if(!i()){h();return}let _=y.filter(v=>v.id!==t()?.id&&v.stream!==t()?.stream);for(let v=_.length-1;v>0;v--){let I=Math.floor(o()*(v+1));[_[v],_[I]]=[_[I],_[v]]}c=_.slice(0,3),r(!1),m(p)}catch{p===u&&(r(!1),a())}}function g(p){if(p.status==="paused"||p.status==="idle"){h();return}if(p.station?.id===d)if(p.status==="error"){let y=u;queueMicrotask(()=>m(y))}else p.status==="playing"&&(d=null,c=[])}return{start:x,cancel:h,prefetch:f,observe:g}}var an=Math.PI,mt=an*2,Yi=an/180,hx=180/an,Yh=1440,px=398600.8,gn=6378.135,zn=60/Math.sqrt(gn*gn*gn/px),Ms=gn*zn/60,Zh=1/zn,gi=.001082616,mx=-253881e-11,Kh=-165597e-11,Ri=mx/gi,Pi=2/3,Ss=1440/(2*an);function Jh(n,e){let t=[31,n%4===0?29:28,31,30,31,30,31,31,30,31,30,31],i=Math.floor(e),r=1,a=0;for(;i>a+t[r-1]&&r<12;)a+=t[r-1],r+=1;let o=r,s=i-a,l=(e-i)*24,u=Math.floor(l);l=(l-u)*60;let c=Math.floor(l),d=(l-c)*60;return{mon:o,day:s,hr:u,minute:c,sec:d}}function $h(n,e,t,i,r,a,o=0){return 367*n-Math.floor(7*(n+Math.floor((e+9)/12))*.25)+Math.floor(275*e/9)+t+17210135e-1+((o/6e4+a/60+r)/60+i)/24}function vr(n,e,t,i,r,a,o=0){if(n instanceof Date){let s=n;return $h(s.getUTCFullYear(),s.getUTCMonth()+1,s.getUTCDate(),s.getUTCHours(),s.getUTCMinutes(),s.getUTCSeconds(),s.getUTCMilliseconds())}return $h(n,e,t,i,r,a,o)}function bs(n,e){let{e3:t,ee2:i,peo:r,pgho:a,pho:o,pinco:s,plo:l,se2:u,se3:c,sgh2:d,sgh3:f,sgh4:h,sh2:m,sh3:x,si2:g,si3:p,sl2:y,sl3:_,sl4:v,t:I,xgh2:E,xgh3:P,xgh4:L,xh2:b,xh3:S,xi2:T,xi3:B,xl2:F,xl3:G,xl4:U,zmol:N,zmos:te}=n,{init:D,opsmode:k}=e,{ep:J,inclp:$,nodep:re,argpp:le,mp:q}=e,W,j,ae,fe,me,ue,Ce,Te,Pe,O,Oe,De,_e,pe,Ue,xe,C,w,X,ne,oe,ie=119459e-10,be=.01675,he=.00015835218,ge=.0549;oe=te+ie*I,D==="y"&&(oe=te),ne=oe+2*be*Math.sin(oe),C=Math.sin(ne),O=.5*C*C-.25,Oe=-.5*C*Math.cos(ne);let Ge=u*O+c*Oe,de=g*O+p*Oe,we=y*O+_*Oe+v*C,M=d*O+f*Oe+h*C,Re=m*O+x*Oe;oe=N+he*I,D==="y"&&(oe=N),ne=oe+2*ge*Math.sin(oe),C=Math.sin(ne),O=.5*C*C-.25,Oe=-.5*C*Math.cos(ne);let Me=i*O+t*Oe,We=T*O+B*Oe,He=F*O+G*Oe+U*C,Xe=E*O+P*Oe+L*C,R=b*O+S*Oe;return De=Ge+Me,Ue=de+We,xe=we+He,_e=M+Xe,pe=Re+R,D==="n"&&(De-=r,Ue-=s,xe-=l,_e-=a,pe-=o,$+=Ue,J+=De,fe=Math.sin($),ae=Math.cos($),$>=.2?(pe/=fe,_e-=ae*pe,le+=_e,re+=pe,q+=xe):(ue=Math.sin(re),me=Math.cos(re),W=fe*ue,j=fe*me,Ce=pe*me+Ue*ae*ue,Te=-pe*ue+Ue*ae*me,W+=Ce,j+=Te,re%=mt,re<0&&k==="a"&&(re+=mt),w=q+le+ae*re,Pe=xe+_e-Ue*re*fe,w+=Pe,X=re,re=Math.atan2(W,j),re<0&&k==="a"&&(re+=mt),Math.abs(X-re)>an&&(re<X?re+=mt:re-=mt),q+=xe,le=w-q-ae*re)),{ep:J,inclp:$,nodep:re,argpp:le,mp:q}}function jh(n){let{epoch:e,ep:t,argpp:i,tc:r,inclp:a,nodep:o,np:s}=n,l,u,c,d,f,h,m,x,g,p,y,_,v,I,E,P,L,b,S,T,B,F,G,U,N,te,D,k,J,$,re,le,q,W,j,ae,fe,me,ue,Ce,Te,Pe,O,Oe,De,_e,pe,Ue,xe,C,w,X,ne,oe,ie,be,he,ge,Ge,de,we,M,Re,Me=.01675,We=.0549,He=29864797e-13,Xe=47968065e-14,R=.39785416,ee=.91744867,V=.1945905,Z=-.98088458,ce=s,se=t,Se=Math.sin(o),$e=Math.cos(o),et=Math.sin(i),Ye=Math.cos(i),At=Math.sin(a),yt=Math.cos(a),Ve=se*se,Wt=1-Ve,Dt=Math.sqrt(Wt),hn=0,Ze=0,nn=0,Ln=0,Dn=0,rn=e+18261.5+r/1440,pn=(4.523602-.00092422029*rn)%mt,kt=Math.sin(pn),bn=Math.cos(pn),qi=.91375164-.03568096*bn,Xi=Math.sqrt(1-qi*qi),A=.089683511*kt/Xi,H=Math.sqrt(1-A*A),K=5.8351514+.001944368*rn,Q=.39785416*kt/Xi,Y=H*bn+.91744867*A*kt;Q=Math.atan2(Q,Y),Q+=K-pn;let ve=Math.cos(Q),Ee=Math.sin(Q);T=V,B=Z,U=ee,N=R,F=$e,G=Se,y=He;let Ne=1/ce,Ie=0;for(;Ie<2;)Ie+=1,l=T*F+B*U*G,c=-B*F+T*U*G,m=-T*G+B*U*F,x=B*N,g=B*G+T*U*F,p=T*N,u=yt*m+At*x,d=yt*g+At*p,f=-At*m+yt*x,h=-At*g+yt*p,_=l*Ye+u*et,v=c*Ye+d*et,I=-l*et+u*Ye,E=-c*et+d*Ye,P=f*et,L=h*et,b=f*Ye,S=h*Ye,we=12*_*_-3*I*I,M=24*_*v-6*I*E,Re=12*v*v-3*E*E,X=3*(l*l+u*u)+we*Ve,ne=6*(l*c+u*d)+M*Ve,oe=3*(c*c+d*d)+Re*Ve,ie=-6*l*f+Ve*(-24*_*b-6*I*P),be=-6*(l*h+c*f)+Ve*(-24*(v*b+_*S)+-6*(I*L+E*P)),he=-6*c*h+Ve*(-24*v*S-6*E*L),ge=6*u*f+Ve*(24*_*P-6*I*b),Ge=6*(d*f+u*h)+Ve*(24*(v*P+_*L)-6*(E*b+I*S)),de=6*d*h+Ve*(24*v*L-6*E*S),X=X+X+Wt*we,ne=ne+ne+Wt*M,oe=oe+oe+Wt*Re,pe=y*Ne,_e=-.5*pe/Dt,Ue=pe*Dt,De=-15*se*Ue,xe=_*I+v*E,C=v*I+_*E,w=v*E-_*I,Ie===1&&(te=De,D=_e,k=pe,J=Ue,$=xe,re=C,le=w,q=X,W=ne,j=oe,ae=ie,fe=be,me=he,ue=ge,Ce=Ge,Te=de,Pe=we,O=M,Oe=Re,T=ve,B=Ee,U=qi,N=Xi,F=H*$e+A*Se,G=Se*H-$e*A,y=Xe);let qe=(4.7199672+(.2299715*rn-K))%mt,Ke=(6.2565837+.017201977*rn)%mt,Fe=2*te*re,tt=2*te*le,ut=2*D*fe,Mt=2*D*(me-ae),$t=-2*k*W,dt=-2*k*(j-q),ke=-2*k*(-21-9*Ve)*Me,ln=2*J*O,ft=2*J*(Oe-Pe),mn=-18*J*Me,kn=-2*D*Ce,Jt=-2*D*(Te-ue),Jn=2*De*C,St=2*De*w,wn=2*_e*be,xr=2*_e*(he-ie),An=-2*pe*ne,pi=-2*pe*(oe-X),mi=-2*pe*(-21-9*Ve)*We,_s=2*Ue*M,tx=2*Ue*(Re-we),nx=-18*Ue*We,ix=-2*_e*Ge,rx=-2*_e*(de-ge);return{snodm:Se,cnodm:$e,sinim:At,cosim:yt,sinomm:et,cosomm:Ye,day:rn,e3:St,ee2:Jn,em:se,emsq:Ve,gam:K,peo:hn,pgho:Ln,pho:Dn,pinco:Ze,plo:nn,rtemsq:Dt,se2:Fe,se3:tt,sgh2:ln,sgh3:ft,sgh4:mn,sh2:kn,sh3:Jt,si2:ut,si3:Mt,sl2:$t,sl3:dt,sl4:ke,s1:De,s2:_e,s3:pe,s4:Ue,s5:xe,s6:C,s7:w,ss1:te,ss2:D,ss3:k,ss4:J,ss5:$,ss6:re,ss7:le,sz1:q,sz2:W,sz3:j,sz11:ae,sz12:fe,sz13:me,sz21:ue,sz22:Ce,sz23:Te,sz31:Pe,sz32:O,sz33:Oe,xgh2:_s,xgh3:tx,xgh4:nx,xh2:ix,xh3:rx,xi2:wn,xi3:xr,xl2:An,xl3:pi,xl4:mi,nm:ce,z1:X,z2:ne,z3:oe,z11:ie,z12:be,z13:he,z21:ge,z22:Ge,z23:de,z31:we,z32:M,z33:Re,zmol:qe,zmos:Ke}}function Qh(n){let{cosim:e,argpo:t,s1:i,s2:r,s3:a,s4:o,s5:s,sinim:l,ss1:u,ss2:c,ss3:d,ss4:f,ss5:h,sz1:m,sz3:x,sz11:g,sz13:p,sz21:y,sz23:_,sz31:v,sz33:I,t:E,tc:P,gsto:L,mo:b,mdot:S,no:T,nodeo:B,nodedot:F,xpidot:G,z1:U,z3:N,z11:te,z13:D,z21:k,z23:J,z31:$,z33:re,ecco:le,eccsq:q}=n,{emsq:W,em:j,argpm:ae,inclm:fe,mm:me,nm:ue,nodem:Ce,irez:Te,atime:Pe,d2201:O,d2211:Oe,d3210:De,d3222:_e,d4410:pe,d4422:Ue,d5220:xe,d5232:C,d5421:w,d5433:X,dedt:ne,didt:oe,dmdt:ie,dnodt:be,domdt:he,del1:ge,del2:Ge,del3:de,xfact:we,xlamo:M,xli:Re,xni:Me}=n,We,He,Xe,R,ee,V,Z,ce,se,Se,$e,et,Ye,At,yt,Ve,Wt,Dt,hn,Ze,nn,Ln,Dn,rn,pn,kt,bn,qi,Xi,A,H,K,Q=17891679e-13,Y=21460748e-13,ve=22123015e-14,Ee=17891679e-13,Ne=73636953e-16,Ie=21765803e-16,qe=.0043752690880113,Ke=37393792e-14,Fe=11428639e-14,tt=.00015835218,ut=119459e-10;Te=0,ue<.0052359877&&ue>.0034906585&&(Te=1),ue>=.00826&&ue<=.00924&&j>=.5&&(Te=2);let Mt=u*ut*h,$t=c*ut*(g+p),dt=-ut*d*(m+x-14-6*W),ke=f*ut*(v+I-6),ln=-ut*c*(y+_);(fe<.052359877||fe>an-.052359877)&&(ln=0),l!==0&&(ln/=l);let ft=ke-e*ln;ne=Mt+i*tt*s,oe=$t+r*tt*(te+D),ie=dt-tt*a*(U+N-14-6*W);let mn=o*tt*($+re-6),kn=-tt*r*(k+J);(fe<.052359877||fe>an-.052359877)&&(kn=0),he=ft+mn,be=ln,l!==0&&(he-=e/l*kn,be+=kn/l);let Jt=0,Jn=(L+P*qe)%mt;if(j+=ne*E,fe+=oe*E,ae+=he*E,Ce+=be*E,me+=ie*E,Te!==0){if(A=(ue/zn)**Pi,Te===2){H=e*e;let St=j;j=le;let wn=W;W=q,K=j*W,At=-.306-(j-.64)*.44,j<=.65?(yt=3.616-13.247*j+16.29*W,Wt=-19.302+117.39*j-228.419*W+156.591*K,Dt=-18.9068+109.7927*j-214.6334*W+146.5816*K,hn=-41.122+242.694*j-471.094*W+313.953*K,Ze=-146.407+841.88*j-1629.014*W+1083.435*K,nn=-532.114+3017.977*j-5740.032*W+3708.276*K):(yt=-72.099+331.819*j-508.738*W+266.724*K,Wt=-346.844+1582.851*j-2415.925*W+1246.113*K,Dt=-342.585+1554.908*j-2366.899*W+1215.972*K,hn=-1052.797+4758.686*j-7193.992*W+3651.957*K,Ze=-3581.69+16178.11*j-24462.77*W+12422.52*K,j>.715?nn=-5149.66+29936.92*j-54087.36*W+31324.56*K:nn=1464.74-4664.75*j+3763.64*W),j<.7?(rn=-919.2277+4988.61*j-9064.77*W+5542.21*K,Ln=-822.71072+4568.6173*j-8491.4146*W+5337.524*K,Dn=-853.666+4690.25*j-8624.77*W+5341.4*K):(rn=-37995.78+161616.52*j-229838.2*W+109377.94*K,Ln=-51752.104+218913.95*j-309468.16*W+146349.42*K,Dn=-40023.88+170470.89*j-242699.48*W+115605.82*K),pn=l*l,We=.75*(1+2*e+H),He=1.5*pn,R=1.875*l*(1-2*e-3*H),ee=-1.875*l*(1+2*e-3*H),Z=35*pn*We,ce=39.375*pn*pn,se=9.84375*l*(pn*(1-2*e-5*H)+.33333333*(-2+4*e+6*H)),Se=l*(4.92187512*pn*(-2-4*e+10*H)+6.56250012*(1+2*e-3*H)),$e=29.53125*l*(2-8*e+H*(-12+8*e+10*H)),et=29.53125*l*(-2-8*e+H*(12+8*e-10*H)),qi=ue*ue,Xi=A*A,bn=3*qi*Xi,kt=bn*Ee,O=kt*We*At,Oe=kt*He*yt,bn*=A,kt=bn*Ke,De=kt*R*Wt,_e=kt*ee*Dt,bn*=A,kt=2*bn*Ne,pe=kt*Z*hn,Ue=kt*ce*Ze,bn*=A,kt=bn*Fe,xe=kt*se*nn,C=kt*Se*Dn,kt=2*bn*Ie,w=kt*$e*Ln,X=kt*et*rn,M=(b+B+B-(Jn+Jn))%mt,we=S+ie+2*(F+be-qe)-T,j=St,W=wn}Te===1&&(Ye=1+W*(-2.5+.8125*W),Wt=1+2*W,Ve=1+W*(-6+6.60937*W),We=.75*(1+e)*(1+e),Xe=.9375*l*l*(1+3*e)-.75*(1+e),V=1+e,V=1.875*V*V*V,ge=3*ue*ue*A*A,Ge=2*ge*We*Ye*Q,de=3*ge*V*Ve*ve*A,ge=ge*Xe*Wt*Y*A,M=(b+B+t-Jn)%mt,we=S+G+ie+he+be-(T+qe)),Re=M,Me=T,Pe=0,ue=T+Jt}return{em:j,argpm:ae,inclm:fe,mm:me,nm:ue,nodem:Ce,irez:Te,atime:Pe,d2201:O,d2211:Oe,d3210:De,d3222:_e,d4410:pe,d4422:Ue,d5220:xe,d5232:C,d5421:w,d5433:X,dedt:ne,didt:oe,dmdt:ie,dndt:Jt,dnodt:be,domdt:he,del1:ge,del2:Ge,del3:de,xfact:we,xlamo:M,xli:Re,xni:Me}}function Wc(n){let e=(n-2451545)/36525,t=-62e-7*e*e*e+.093104*e*e+(876600*3600+8640184812866e-6)*e+67310.54841;return t=t*Yi/240%mt,t<0&&(t+=mt),t}function Ya(n,e,t,i,r,a,o){return n instanceof Date?Wc(vr(n)):Wc(e!==void 0?vr(n,e,t,i,r,a,o):n)}function ep(n){let{ecco:e,epoch:t,inclo:i,opsmode:r}=n,{no:a}=n,o=e*e,s=1-o,l=Math.sqrt(s),u=Math.cos(i),c=u*u,d=(zn/a)**Pi,f=.75*gi*(3*c-1)/(l*s),h=f/(d*d),m=d*(1-h*h-h*(1/3+134*h*h/81));h=f/(m*m),a/=1+h;let x=(zn/a)**Pi,g=Math.sin(i),p=x*s,y=1-5*c,_=-y-c-c,v=1/x,I=p*p,E=x*(1-e),P="n",L;if(r==="a"){let b=t-7305,S=Math.floor(b+1e-8),T=b-S,B=.017202791694070362,F=1.7321343856509375,G=5075514194322695e-30,U=B+mt;L=(F+B*S+U*T+b*b*G)%mt,L<0&&(L+=mt)}else L=Ya(t+24332815e-1);return{no:a,method:P,ainv:v,ao:x,con41:_,con42:y,cosio:u,cosio2:c,eccsq:o,omeosq:s,posq:I,rp:E,rteosq:l,sinio:g,gsto:L}}function tp(n){let{irez:e,d2201:t,d2211:i,d3210:r,d3222:a,d4410:o,d4422:s,d5220:l,d5232:u,d5421:c,d5433:d,dedt:f,del1:h,del2:m,del3:x,didt:g,dmdt:p,dnodt:y,domdt:_,argpo:v,argpdot:I,t:E,tc:P,gsto:L,xfact:b,xlamo:S,no:T}=n,{atime:B,em:F,argpm:G,inclm:U,xli:N,mm:te,xni:D,nodem:k,nm:J}=n,$=.13130908,re=2.8843198,le=.37448087,q=5.7686396,W=.95240898,j=1.8014998,ae=1.050833,fe=4.4108898,me=.0043752690880113,ue=720,Ce=-720,Te=259200,Pe,O,Oe,De,_e,pe,Ue,xe,C=0,w=0,X=(L+P*me)%mt;if(F+=f*E,U+=g*E,G+=_*E,k+=y*E,te+=p*E,e!==0){(B===0||E*B<=0||Math.abs(E)<Math.abs(B))&&(B=0,D=T,N=S),E>0?Pe=ue:Pe=Ce;let ne=381;for(;ne===381;)e!==2?(Ue=h*Math.sin(N-$)+m*Math.sin(2*(N-re))+x*Math.sin(3*(N-le)),_e=D+b,pe=h*Math.cos(N-$)+2*m*Math.cos(2*(N-re))+3*x*Math.cos(3*(N-le)),pe*=_e):(xe=v+I*B,Oe=xe+xe,O=N+N,Ue=t*Math.sin(Oe+N-q)+i*Math.sin(N-q)+r*Math.sin(xe+N-W)+a*Math.sin(-xe+N-W)+o*Math.sin(Oe+O-j)+s*Math.sin(O-j)+l*Math.sin(xe+N-ae)+u*Math.sin(-xe+N-ae)+c*Math.sin(xe+O-fe)+d*Math.sin(-xe+O-fe),_e=D+b,pe=t*Math.cos(Oe+N-q)+i*Math.cos(N-q)+r*Math.cos(xe+N-W)+a*Math.cos(-xe+N-W)+l*Math.cos(xe+N-ae)+u*Math.cos(-xe+N-ae)+2*(o*Math.cos(Oe+O-j)+s*Math.cos(O-j)+c*Math.cos(xe+O-fe)+d*Math.cos(-xe+O-fe)),pe*=_e),Math.abs(E-B)>=ue?ne=381:(w=E-B,ne=0),ne===381&&(N+=_e*Pe+Ue*Te,D+=Ue*Pe+pe*Te,B+=Pe);J=D+Ue*w+pe*w*w*.5,De=N+_e*w+Ue*w*w*.5,e!==1?(te=De-2*k+2*X,C=J-T):(te=De-k-G+X,C=J-T),J=T+C}return{atime:B,em:F,argpm:G,inclm:U,xli:N,mm:te,xni:D,nodem:k,dndt:C,nm:J}}var jn;(function(n){n[n.None=0]="None",n[n.MeanEccentricityOutOfRange=1]="MeanEccentricityOutOfRange",n[n.MeanMotionBelowZero=2]="MeanMotionBelowZero",n[n.PerturbedEccentricityOutOfRange=3]="PerturbedEccentricityOutOfRange",n[n.SemiLatusRectumBelowZero=4]="SemiLatusRectumBelowZero",n[n.Decayed=6]="Decayed"})(jn||(jn={}));function Za(n,e){let t,i,r,a,o,s,l,u,c,d,f,h,m,x,g,p,y,_,v,I,E,P,L,b,S,T,B;n.t=e,n.error=jn.None;let G=n.mo+n.mdot*n.t,U=n.argpo+n.argpdot*n.t,N=n.nodeo+n.nodedot*n.t;c=U,E=G;let te=n.t*n.t;if(L=N+n.nodecf*te,y=1-n.cc1*n.t,_=n.bstar*n.cc4*n.t,v=n.t2cof*te,n.isimp!==1){l=n.omgcof*n.t;let se=1+n.eta*Math.cos(G);s=n.xmcof*(se*se*se-n.delmo),p=l+s,E=G+p,c=U-p,h=te*n.t,m=h*n.t,y=y-n.d2*te-n.d3*h-n.d4*m,_+=n.bstar*n.cc5*(Math.sin(E)-n.sinmao),v=v+n.t3cof*h+m*(n.t4cof+n.t*n.t5cof)}n.tempa=y,P=n.no;let D=n.ecco;if(I=n.inclo,n.method==="d"){x=n.t;let se={irez:n.irez,d2201:n.d2201,d2211:n.d2211,d3210:n.d3210,d3222:n.d3222,d4410:n.d4410,d4422:n.d4422,d5220:n.d5220,d5232:n.d5232,d5421:n.d5421,d5433:n.d5433,dedt:n.dedt,del1:n.del1,del2:n.del2,del3:n.del3,didt:n.didt,dmdt:n.dmdt,dnodt:n.dnodt,domdt:n.domdt,argpo:n.argpo,argpdot:n.argpdot,t:n.t,tc:x,gsto:n.gsto,xfact:n.xfact,xlamo:n.xlamo,no:n.no,atime:n.atime,em:D,argpm:c,inclm:I,xli:n.xli,mm:E,xni:n.xni,nodem:L,nm:P},Se=tp(se);({em:D,argpm:c,inclm:I,mm:E,nodem:L,nm:P}=Se),n.atime=Se.atime,n.xli=Se.xli,n.xni=Se.xni}if(P<=0)return n.error=jn.MeanMotionBelowZero,null;let k=(zn/P)**Pi*y*y;if(P=zn/k**1.5,D-=_,D>=1||D<-.001)return n.error=jn.MeanEccentricityOutOfRange,null;D<1e-6&&(D=1e-6),E+=n.no*v,S=E+c+L,L%=mt,c%=mt,S%=mt,E=(S-c-L)%mt;let J={am:k,em:D,im:I,Om:L,om:c,mm:E,nm:P},$=Math.sin(I),re=Math.cos(I),le=D;if(b=I,d=c,B=L,T=E,a=$,r=re,n.method==="d"){let se={inclo:n.inclo,init:"n",ep:le,inclp:b,nodep:B,argpp:d,mp:T,opsmode:n.operationmode},Se=bs(n,se);if({ep:le,nodep:B,argpp:d,mp:T}=Se,b=Se.inclp,b<0&&(b=-b,B+=an,d-=an),le<0||le>1)return n.error=jn.PerturbedEccentricityOutOfRange,null}n.method==="d"&&(a=Math.sin(b),r=Math.cos(b),n.aycof=-.5*Ri*a,Math.abs(r+1)>15e-13?n.xlcof=-.25*Ri*a*(3+5*r)/(1+r):n.xlcof=-.25*Ri*a*(3+5*r)/15e-13);let q=le*Math.cos(d);p=1/(k*(1-le*le));let W=le*Math.sin(d)+p*n.aycof,ae=(T+d+B+p*n.xlcof*q-B)%mt;u=ae,g=9999.9;let fe=1;for(;Math.abs(g)>=1e-12&&fe<=10;)i=Math.sin(u),t=Math.cos(u),g=1-t*q-i*W,g=(ae-W*t+q*i-u)/g,Math.abs(g)>=.95&&(g>0?g=.95:g=-.95),u+=g,fe+=1;let me=q*t+W*i,ue=q*i-W*t,Ce=q*q+W*W,Te=k*(1-Ce);if(Te<0)return n.error=jn.SemiLatusRectumBelowZero,null;let Pe=k*(1-me),O=Math.sqrt(k)*ue/Pe,Oe=Math.sqrt(Te)/Pe,De=Math.sqrt(1-Ce);p=ue/(1+De);let _e=k/Pe*(i-W-q*p),pe=k/Pe*(t-q+W*p);f=Math.atan2(_e,pe);let Ue=(pe+pe)*_e,xe=1-2*_e*_e;p=1/Te;let C=.5*gi*p,w=C*p;n.method==="d"&&(o=r*r,n.con41=3*o-1,n.x1mth2=1-o,n.x7thm1=7*o-1);let X=Pe*(1-1.5*w*De*n.con41)+.5*C*n.x1mth2*xe;if(X<1)return n.error=jn.Decayed,null;f-=.25*w*n.x7thm1*Ue;let ne=B+1.5*w*r*Ue,oe=b+1.5*w*r*a*xe,ie=O-P*C*n.x1mth2*Ue/zn,be=Oe+P*C*(n.x1mth2*xe+1.5*n.con41)/zn,he=Math.sin(f),ge=Math.cos(f),Ge=Math.sin(ne),de=Math.cos(ne),we=Math.sin(oe),M=Math.cos(oe),Re=-Ge*M,Me=de*M,We=Re*he+de*ge,He=Me*he+Ge*ge,Xe=we*he,R=Re*ge-de*he,ee=Me*ge-Ge*he,V=we*ge,Z={x:X*We*gn,y:X*He*gn,z:X*Xe*gn},ce={x:(ie*We+be*R)*Ms,y:(ie*He+be*ee)*Ms,z:(ie*Xe+be*V)*Ms};return{position:Z,velocity:ce,meanElements:J}}function np(n,e){let{opsmode:t,satn:i,epoch:r,xbstar:a,xecco:o,xargpo:s,xinclo:l,xmo:u,xno:c,xnodeo:d}=e,f,h,m,x,g,p,y,_,v,I,E,P,L,b,S,T,B,F,G,U,N,te,D,k,J,$,re,le,q,W,j,ae,fe,me,ue,Ce,Te,Pe,O,Oe,De,_e,pe,Ue,xe,C,w,X,ne,oe,ie,be,he,ge,Ge,de,we=15e-13,M=n;M.isimp=0,M.method="n",M.aycof=0,M.con41=0,M.cc1=0,M.cc4=0,M.cc5=0,M.d2=0,M.d3=0,M.d4=0,M.delmo=0,M.eta=0,M.argpdot=0,M.omgcof=0,M.sinmao=0,M.t=0,M.t2cof=0,M.t3cof=0,M.t4cof=0,M.t5cof=0,M.x1mth2=0,M.x7thm1=0,M.mdot=0,M.nodedot=0,M.xlcof=0,M.xmcof=0,M.nodecf=0,M.irez=0,M.d2201=0,M.d2211=0,M.d3210=0,M.d3222=0,M.d4410=0,M.d4422=0,M.d5220=0,M.d5232=0,M.d5421=0,M.d5433=0,M.dedt=0,M.del1=0,M.del2=0,M.del3=0,M.didt=0,M.dmdt=0,M.dnodt=0,M.domdt=0,M.e3=0,M.ee2=0,M.peo=0,M.pgho=0,M.pho=0,M.pinco=0,M.plo=0,M.se2=0,M.se3=0,M.sgh2=0,M.sgh3=0,M.sgh4=0,M.sh2=0,M.sh3=0,M.si2=0,M.si3=0,M.sl2=0,M.sl3=0,M.sl4=0,M.gsto=0,M.xfact=0,M.xgh2=0,M.xgh3=0,M.xgh4=0,M.xh2=0,M.xh3=0,M.xi2=0,M.xi3=0,M.xl2=0,M.xl3=0,M.xl4=0,M.xlamo=0,M.zmol=0,M.zmos=0,M.atime=0,M.xli=0,M.xni=0,M.bstar=a,M.ecco=o,M.argpo=s,M.inclo=l,M.mo=u,M.no=c,M.nokozai=c,M.nodeo=d,M.operationmode=t;let Re=78/gn+1,Me=42/gn,We=Me*Me*Me*Me;M.init="y",M.t=0;let He={satn:i,ecco:M.ecco,epoch:r,inclo:M.inclo,no:M.no,method:M.method,opsmode:M.operationmode},Xe=ep(He),{ao:R,con42:ee,cosio:V,cosio2:Z,eccsq:ce,omeosq:se,posq:Se,rp:$e,rteosq:et,sinio:Ye}=Xe;if(M.no=Xe.no,M.con41=Xe.con41,M.gsto=Xe.gsto,M.a=(M.no*Zh)**(-2/3),M.alta=M.a*(1+M.ecco)-1,M.altp=M.a*(1-M.ecco)-1,M.error=0,se>=0||M.no>=0){if(M.isimp=0,$e<220/gn+1&&(M.isimp=1),re=Re,N=We,F=($e-1)*gn,F<156){re=F-78,F<98&&(re=20);let yt=(120-re)/gn;N=yt*yt*yt*yt,re=re/gn+1}G=1/Se,C=1/(R-re),M.eta=R*M.ecco*C,P=M.eta*M.eta,E=M.ecco*M.eta,U=Math.abs(1-P),p=N*C**4,y=p/U**3.5,x=y*M.no*(R*(1+1.5*P+E*(4+P))+.375*gi*C/U*M.con41*(8+3*P*(8+P))),M.cc1=M.bstar*x,g=0,M.ecco>1e-4&&(g=-2*p*C*Ri*M.no*Ye/M.ecco),M.x1mth2=1-Z,M.cc4=2*M.no*y*R*se*(M.eta*(2+.5*P)+M.ecco*(.5+2*P)-gi*C/(R*U)*(-3*M.con41*(1-2*E+P*(1.5-.5*E))+.75*M.x1mth2*(2*P-E*(1+P))*Math.cos(2*M.argpo))),M.cc5=2*y*R*se*(1+2.75*(P+E)+E*P),_=Z*Z,pe=1.5*gi*G*M.no,Ue=.5*pe*gi*G,xe=-.46875*Kh*G*G*M.no,M.mdot=M.no+.5*pe*et*M.con41+.0625*Ue*et*(13-78*Z+137*_),M.argpdot=-.5*pe*ee+.0625*Ue*(7-114*Z+395*_)+xe*(3-36*Z+49*_),X=-pe*V,M.nodedot=X+(.5*Ue*(4-19*Z)+2*xe*(3-7*Z))*V,w=M.argpdot+M.nodedot,M.omgcof=M.bstar*g*Math.cos(M.argpo),M.xmcof=0,M.ecco>1e-4&&(M.xmcof=-Pi*p*M.bstar/E),M.nodecf=3.5*se*X*M.cc1,M.t2cof=1.5*M.cc1,Math.abs(V+1)>15e-13?M.xlcof=-.25*Ri*Ye*(3+5*V)/(1+V):M.xlcof=-.25*Ri*Ye*(3+5*V)/we,M.aycof=-.5*Ri*Ye;let At=1+M.eta*Math.cos(M.mo);if(M.delmo=At*At*At,M.sinmao=Math.sin(M.mo),M.x7thm1=7*Z-1,2*an/M.no>=225){M.method="d",M.isimp=1,De=0,S=M.inclo;let yt={epoch:r,ep:M.ecco,argpp:M.argpo,tc:De,inclp:M.inclo,nodep:M.nodeo,np:M.no,e3:M.e3,ee2:M.ee2,peo:M.peo,pgho:M.pgho,pho:M.pho,pinco:M.pinco,plo:M.plo,se2:M.se2,se3:M.se3,sgh2:M.sgh2,sgh3:M.sgh3,sgh4:M.sgh4,sh2:M.sh2,sh3:M.sh3,si2:M.si2,si3:M.si3,sl2:M.sl2,sl3:M.sl3,sl4:M.sl4,xgh2:M.xgh2,xgh3:M.xgh3,xgh4:M.xgh4,xh2:M.xh2,xh3:M.xh3,xi2:M.xi2,xi3:M.xi3,xl2:M.xl2,xl3:M.xl3,xl4:M.xl4,zmol:M.zmol,zmos:M.zmos},Ve=jh(yt);M.e3=Ve.e3,M.ee2=Ve.ee2,M.peo=Ve.peo,M.pgho=Ve.pgho,M.pho=Ve.pho,M.pinco=Ve.pinco,M.plo=Ve.plo,M.se2=Ve.se2,M.se3=Ve.se3,M.sgh2=Ve.sgh2,M.sgh3=Ve.sgh3,M.sgh4=Ve.sgh4,M.sh2=Ve.sh2,M.sh3=Ve.sh3,M.si2=Ve.si2,M.si3=Ve.si3,M.sl2=Ve.sl2,M.sl3=Ve.sl3,M.sl4=Ve.sl4,{sinim:h,cosim:f,em:v,emsq:I,s1:te,s2:D,s3:k,s4:J,s5:$,ss1:le,ss2:q,ss3:W,ss4:j,ss5:ae,sz1:fe,sz3:me,sz11:ue,sz13:Ce,sz21:Te,sz23:Pe,sz31:O,sz33:Oe}=Ve,M.xgh2=Ve.xgh2,M.xgh3=Ve.xgh3,M.xgh4=Ve.xgh4,M.xh2=Ve.xh2,M.xh3=Ve.xh3,M.xi2=Ve.xi2,M.xi3=Ve.xi3,M.xl2=Ve.xl2,M.xl3=Ve.xl3,M.xl4=Ve.xl4,M.zmol=Ve.zmol,M.zmos=Ve.zmos,{nm:B,z1:ne,z3:oe,z11:ie,z13:be,z21:he,z23:ge,z31:Ge,z33:de}=Ve;let Wt={inclo:S,init:M.init,ep:M.ecco,inclp:M.inclo,nodep:M.nodeo,argpp:M.argpo,mp:M.mo,opsmode:M.operationmode},Dt=bs(M,Wt);M.ecco=Dt.ep,M.inclo=Dt.inclp,M.nodeo=Dt.nodep,M.argpo=Dt.argpp,M.mo=Dt.mp,L=0,b=0,T=0;let hn={cosim:f,emsq:I,argpo:M.argpo,s1:te,s2:D,s3:k,s4:J,s5:$,sinim:h,ss1:le,ss2:q,ss3:W,ss4:j,ss5:ae,sz1:fe,sz3:me,sz11:ue,sz13:Ce,sz21:Te,sz23:Pe,sz31:O,sz33:Oe,t:M.t,tc:De,gsto:M.gsto,mo:M.mo,mdot:M.mdot,no:M.no,nodeo:M.nodeo,nodedot:M.nodedot,xpidot:w,z1:ne,z3:oe,z11:ie,z13:be,z21:he,z23:ge,z31:Ge,z33:de,ecco:M.ecco,eccsq:ce,em:v,argpm:L,inclm:S,mm:T,nm:B,nodem:b,irez:M.irez,atime:M.atime,d2201:M.d2201,d2211:M.d2211,d3210:M.d3210,d3222:M.d3222,d4410:M.d4410,d4422:M.d4422,d5220:M.d5220,d5232:M.d5232,d5421:M.d5421,d5433:M.d5433,dedt:M.dedt,didt:M.didt,dmdt:M.dmdt,dnodt:M.dnodt,domdt:M.domdt,del1:M.del1,del2:M.del2,del3:M.del3,xfact:M.xfact,xlamo:M.xlamo,xli:M.xli,xni:M.xni},Ze=Qh(hn);M.irez=Ze.irez,M.atime=Ze.atime,M.d2201=Ze.d2201,M.d2211=Ze.d2211,M.d3210=Ze.d3210,M.d3222=Ze.d3222,M.d4410=Ze.d4410,M.d4422=Ze.d4422,M.d5220=Ze.d5220,M.d5232=Ze.d5232,M.d5421=Ze.d5421,M.d5433=Ze.d5433,M.dedt=Ze.dedt,M.didt=Ze.didt,M.dmdt=Ze.dmdt,M.dnodt=Ze.dnodt,M.domdt=Ze.domdt,M.del1=Ze.del1,M.del2=Ze.del2,M.del3=Ze.del3,M.xfact=Ze.xfact,M.xlamo=Ze.xlamo,M.xli=Ze.xli,M.xni=Ze.xni}M.isimp!==1&&(m=M.cc1*M.cc1,M.d2=4*R*C*m,_e=M.d2*C*M.cc1/3,M.d3=(17*R+re)*_e,M.d4=.5*_e*R*C*(221*R+31*re)*M.cc1,M.t3cof=M.d2+2*m,M.t4cof=.25*(3*M.d3+M.cc1*(12*M.d2+10*m)),M.t5cof=.2*(3*M.d4+12*M.cc1*M.d3+6*M.d2*M.d2+15*m*(2*M.d2+m)))}Za(M,0),M.init="n"}function gx(n,e){np(n,{opsmode:e,satn:n.satnum,epoch:n.jdsatepoch-24332815e-1,xbstar:n.bstar,xecco:n.ecco,xargpo:n.argpo,xinclo:n.inclo,xmo:n.mo,xno:n.no,xnodeo:n.nodeo})}function ip(n,e="i"){let i=n.NORAD_CAT_ID.toString(),r=n.EPOCH.endsWith("Z")?n.EPOCH:`${n.EPOCH}Z`,a=new Date(r),o=/\.(\d+)Z$/.exec(r)?.[1]??"",s=o.length>3?+`0.${o.slice(3)}`/1e3:0,l=a.getUTCFullYear(),u=Number(l.toString().slice(-2)),c=(a.valueOf()-new Date(Date.UTC(l,0,1,0,0,0)).valueOf())/(86400*1e3)+s/86400+1,d=Number(n.MEAN_MOTION_DOT),f=Number(n.MEAN_MOTION_DDOT);d/=Ss*1440,f/=Ss*1440*1440;let h=Number(n.BSTAR),m=Number(n.INCLINATION)*Yi,x=Number(n.RA_OF_ASC_NODE)*Yi,g=Number(n.ECCENTRICITY),p=Number(n.ARG_OF_PERICENTER)*Yi,y=Number(n.MEAN_ANOMALY)*Yi,_=Number(n.MEAN_MOTION)/Ss,v=Jh(l,c),{mon:I,day:E,hr:P,minute:L,sec:b}=v,S=vr(l,I,E,P,L,b),T={error:0,satnum:i,epochyr:u,epochdays:c,ndot:d,nddot:f,bstar:h,inclo:m,nodeo:x,ecco:g,argpo:p,mo:y,no:_,jdsatepoch:S};return gx(T,e),T}var rp=n=>n.tempa<=0;function qc(n,...e){let t=e.at(-1),i=typeof t=="object"&&!(t instanceof Date)?t:void 0,r=i?e.slice(0,-1):e,o=(vr(...r)-n.jdsatepoch)*Yh,s=Za(n,o);return i?.communityDecayCheckEnabled&&s&&rp(n)?(n.error=jn.Decayed,null):s}function ap(n,e){let i=6356.7523142,r=Math.sqrt(n.x*n.x+n.y*n.y),a=(6378.137-i)/6378.137,o=2*a-a*a,s=((Math.atan2(n.y,n.x)-e+an)%mt+mt)%mt-an,l=20,u=1e-12,c=0,d=Math.atan2(n.z,r),f;do{f=d;let p=Math.sin(d),y=1/Math.sqrt(1-o*(p*p));d=Math.atan2(n.z+6378.137*y*o*p,r)}while(Math.abs(d-f)>u&&++c<l);let h=Math.sin(d),m=Math.cos(d),x=1/Math.sqrt(1-o*(h*h)),g=r*m+n.z*h-6378.137/x;return{longitude:s,latitude:d,height:g}}var Yc=7200*1e3,xx=10080*60*1e3;function Ja(n,e=Date.now()){return Array.isArray(n)?n.filter(t=>{if(!t||typeof t!="object")return!1;let i=Date.parse(String(t.EPOCH).replace(/Z$/,"")+"Z");return Number.isFinite(i)&&e-i<xx&&i-e<864e5&&["MEAN_MOTION","ECCENTRICITY","INCLINATION","RA_OF_ASC_NODE","ARG_OF_PERICENTER","MEAN_ANOMALY","BSTAR"].every(r=>Number.isFinite(t[r]))&&t.MEAN_MOTION>0&&t.ECCENTRICITY>=0&&t.ECCENTRICITY<1}).slice(0,40).flatMap(t=>{try{return[{id:String(t.NORAD_CAT_ID),name:String(t.OBJECT_NAME).slice(0,80),epoch:t.EPOCH,record:ip(t)}]}catch{return[]}}):[]}function Ii(n,e=new Date){try{let t=qc(n.record,e);if(!t?.position)return null;let i=ap(t.position,Ya(e)),r=i.latitude*180/Math.PI,a=i.longitude*180/Math.PI;return[r,a,i.height].every(Number.isFinite)&&i.height>80&&i.height<1e5?{lat:r,lon:a,altitude:i.height,speed:t.velocity?Math.hypot(t.velocity.x,t.velocity.y,t.velocity.z)*3600:0}:null}catch{return null}}function ws(n){try{let e=new URL(n);return e.protocol==="https:"&&!e.username&&!e.password?e.href:null}catch{return null}}async function qr(n,e=12e3){let t=new AbortController,i=setTimeout(()=>t.abort(),e);try{let r=await fetch(n,{signal:t.signal,credentials:"omit",referrerPolicy:"no-referrer"});if(!r.ok)throw Error("HTTP "+r.status);return await r.json()}finally{clearTimeout(i)}}function ja(n){try{return JSON.parse(localStorage.getItem(n)||"null")}catch{return null}}function Qa(n,e){try{localStorage.setItem(n,JSON.stringify(e))}catch{}}async function sp(){let n="skm-public-orbits-v1",e=ja(n),t=Date.now();if(e&&t-e.at<Yc&&Ja(e.rows,t).length)return{...e,offline:!1};try{let i=await qr("https://celestrak.org/NORAD/elements/gp.php?GROUP=stations&FORMAT=json");if(!Ja(i,t).length)throw Error("No current orbital data");let r={rows:i,at:t};return Qa(n,r),{...r,offline:!1}}catch(i){if(e&&Ja(e.rows,t).length)return{...e,offline:!0};throw i}}var Wr="";async function Zc(){let n="skm-radio-servers-v1",e=ja(n),t=e&&Date.now()-e.at<864e5?e.names:null;if(!t)try{t=(await qr("https://all.api.radio-browser.info/json/servers")).map(r=>r.name).filter(r=>/^[a-z0-9-]+\.api\.radio-browser\.info$/.test(r)),t.length&&Qa(n,{at:Date.now(),names:t})}catch{t=["de1.api.radio-browser.info","de2.api.radio-browser.info"]}return[...new Set([Wr,...t||[]].filter(Boolean))].sort(()=>Math.random()-.5)}function op(n){if(!Array.isArray(n))return[];let e=new Map;for(let t of n){let i=String(t?.name||"").toUpperCase(),r=Number(t?.stationcount);!/^[A-Z]{2}$/.test(i)||!Number.isSafeInteger(r)||r<1||e.set(i,{code:i,count:r})}return[...e.values()].sort((t,i)=>t.code.localeCompare(i.code))}function Kc(n,e="en",t=""){let i;try{i=new Intl.DisplayNames([e],{type:"region"})}catch{i=new Intl.DisplayNames(["en"],{type:"region"})}let r=new Intl.DisplayNames(["en"],{type:"region"}),a=s=>s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLocaleLowerCase().trim(),o=a(t);return n.map(s=>({...s,label:i.of(s.code)||s.code})).filter(s=>a(s.label+" "+r.of(s.code)+" "+s.code).includes(o)).sort((s,l)=>s.label.localeCompare(l.label))}var Ka;function lp(){return Ka||(Ka=(async()=>{let n="skm-radio-countries-v1",e=ja(n),t=Date.now(),i=op(e?.rows);if(i.length&&t-e.at<864e5)return i;for(let r of await Zc())try{let a=await qr("https://"+r+"/json/countrycodes?hidebroken=true"),o=op(a);if(!o.length)continue;return Wr=r,Qa(n,{at:t,rows:a}),o}catch{}if(i.length&&t-e.at<7*864e5)return i;throw Error("Radio countries unavailable")})().finally(()=>{Ka=null}),Ka)}function Xc(n,e){if(!Array.isArray(n))return[];let t=new Set;return n.flatMap(i=>{if(!i||typeof i!="object")return[];let r=ws(i.url_resolved||i.url),a=ws(i.homepage),o=String(i.name||"").trim().slice(0,90),s=String(i.codec||"").toUpperCase();return!r||!o||typeof i.stationuuid!="string"||t.has(o.toLowerCase())?[]:/somafm/i.test(o+" "+r+" "+a)?[]:!["MP3","AAC","AAC+"].includes(s)&&!i.hls?[]:/\.(pls|m3u)$/i.test(new URL(r).pathname)&&!i.hls?[]:i.lastcheckok===0?[]:(t.add(o.toLowerCase()),[{id:i.stationuuid,name:o,stream:r,homepage:a,country:e||String(i.countrycode||"").toUpperCase(),codec:s,hls:!!i.hls}])}).slice(0,20)}async function cp(n){if(!/^[A-Z]{2}$/.test(n))throw Error("Invalid country");let e="skm-radio-streams-v2-"+n,t=ja(e);if(t&&Date.now()-t.at<216e5&&Array.isArray(t.rows))return t.rows;for(let i of await Zc())try{let r=await qr("https://"+i+"/json/stations/search?"+new URLSearchParams({countrycode:n,hidebroken:"true",limit:"60",order:"clickcount",reverse:"true",is_https:"true"}));if(!Array.isArray(r))continue;Wr=i;let a=Xc(r,n);return Qa(e,{at:Date.now(),rows:a}),a}catch{}if(t&&Date.now()-t.at<864e5&&Array.isArray(t.rows))return t.rows;throw Error("Radio directory unavailable")}function up(n,e=Date.now()){let t=[];for(let i=0;i<=90;i++){let r=Ii(n,new Date(e+i*6e4));t.push(r)}return t}function dp(n){Wr&&/^[a-f0-9-]{36}$/.test(n)&&qr("https://"+Wr+"/json/url/"+n,5e3).catch(()=>{})}var $a;function fp(){return $a||($a=(async()=>{let n="skm-radio-random-v1",e=ja(n),t=Date.now(),i=Xc(e?.rows);if(i.length&&t-e.at<36e5)return i;for(let r of(await Zc()).slice(0,2))try{let a=await qr("https://"+r+"/json/stations/search?"+new URLSearchParams({hidebroken:"true",limit:"100",order:"random",is_https:"true"}),7e3),o=Xc(a);if(!o.length)continue;return Wr=r,Qa(n,{at:t,rows:a}),o}catch{}if(i.length&&t-e.at<864e5)return i;throw Error("Radio directory unavailable")})().finally(()=>{$a=null}),$a)}function hp({createAudio:n,onChange:e=()=>{},beforePlay:t=()=>{},timeout:i=2e4}){let r=null,a=null,o="idle",s=0,l=null,u=()=>({station:a,status:o,audio:r}),c=()=>e(u()),d=()=>{clearTimeout(l),l=null};function f(){d();let p=r;r=null,p&&(p.pause(),p.removeAttribute("src"),p.load(),p.remove?.())}function h(){s++,f(),o=a?"paused":"idle",c()}function m(){s++,f(),a=null,o="idle",c()}async function x(p=a){if(!p||!ws(p.stream))return;let y=++s;f(),a=p,o="loading";let _=n();r=_,_.preload="none",_.src=p.stream;let v=()=>s===y&&r===_,I=()=>{v()&&(s++,f(),o="error",c())},E=()=>{v()&&(o="loading",d(),l=setTimeout(I,i),c())};_.addEventListener("playing",()=>{v()&&(d(),o="playing",c())}),_.addEventListener("waiting",E),_.addEventListener("stalled",()=>{v()&&!l&&(l=setTimeout(I,i))}),_.addEventListener("error",I),_.addEventListener("ended",I),_.addEventListener("pause",()=>{v()&&o!=="error"&&h()}),l=setTimeout(I,i),c();try{t(_,p),await _.play()}catch{I()}}function g(){o==="playing"||o==="loading"?h():x()}return{play:x,pause:h,stop:m,toggle:g,snapshot:u}}var As=[{id:"kilauea",name:"K\u012Blauea \xB7 West crater",lat:19.42,lon:-155.29,video:"HggWKlZv9yk",publisher:"USGS",source:"https://www.usgs.gov/volcanoes/kilauea/summit-webcams"},{id:"kilauea-east-crater",name:"K\u012Blauea \xB7 East crater",lat:19.42,lon:-155.29,video:"f9-oSpYpubg",publisher:"USGS",source:"https://www.youtube.com/watch?v=f9-oSpYpubg"},{id:"kilauea-south-crater",name:"K\u012Blauea \xB7 South crater",lat:19.42,lon:-155.29,video:"gXKuUyKt8mc",publisher:"USGS",source:"https://www.youtube.com/watch?v=gXKuUyKt8mc"},{id:"brooks-river",name:"Brooks River \xB7 River watch",lat:58.555,lon:-155.78,video:"wkVLYfU-Kew",publisher:"NPS / explore.org",source:"https://www.nps.gov/katm/learn/photosmultimedia/river-watch-cam.htm"},{id:"brooks-underwater-salmon",name:"Brooks River \xB7 Underwater salmon",lat:58.555,lon:-155.78,video:"vu7I315gQpU",publisher:"Explore Bears",source:"https://www.youtube.com/watch?v=vu7I315gQpU"},{id:"brooks-river-bend",name:"Brooks River \xB7 River bend",lat:58.555,lon:-155.78,video:"cTsjMtjRLCo",publisher:"Explore Bears",source:"https://www.youtube.com/watch?v=cTsjMtjRLCo"},{id:"brooks-falls-brown-bears",name:"Brooks Falls \xB7 Brown bears",lat:58.554,lon:-155.791,video:"J7ZrIDvqlic",publisher:"Explore Live Nature Cams",source:"https://www.youtube.com/watch?v=J7ZrIDvqlic"},{id:"brooks-falls-low-view",name:"Brooks Falls \xB7 Low view",lat:58.554,lon:-155.791,video:"EwTH5yY7Mks",publisher:"Explore Bears",source:"https://www.youtube.com/watch?v=EwTH5yY7Mks"},{id:"brooks-falls-riffles",name:"Brooks Falls \xB7 Riffles",lat:58.554,lon:-155.791,video:"z7_GhJeFxQI",publisher:"Explore Bears",source:"https://www.youtube.com/watch?v=z7_GhJeFxQI"},{id:"katmai-katmai",name:"Dumpling Mountain \xB7 Katmai",lat:58.58,lon:-155.8,video:"uLgdUiT9WZQ",publisher:"Explore Northern Lights & Nature Meditation Cams",source:"https://www.youtube.com/watch?v=uLgdUiT9WZQ"},{id:"juneau-glacier-lake",name:"Mendenhall Glacier \xB7 Glacier lake",lat:58.42,lon:-134.55,video:"jJI5w_RVGtQ",publisher:"Explore Northern Lights & Nature Meditation Cams",source:"https://www.youtube.com/watch?v=jJI5w_RVGtQ"},{id:"fairbanks-aurora",name:"Fairbanks \xB7 Aurora",lat:64.84,lon:-147.72,video:"O52zDyxg5QI",publisher:"Explore Northern Lights & Nature Meditation Cams",source:"https://www.youtube.com/watch?v=O52zDyxg5QI"},{id:"churchill-northern-lights",name:"Churchill \xB7 Northern lights",lat:58.74,lon:-93.82,video:"a0i1Kg6fROg",publisher:"Explore Northern Lights & Nature Meditation Cams",source:"https://www.youtube.com/watch?v=a0i1Kg6fROg"},{id:"ontario-boreal-birds",name:"Manitouwadge \xB7 Boreal birds",lat:49.12,lon:-85.83,video:"wTVDrtShk7Y",publisher:"Cornell Lab Bird Cams",source:"https://www.youtube.com/watch?v=wTVDrtShk7Y"},{id:"montana-ospreys",name:"Hellgate Canyon \xB7 Ospreys",lat:46.88,lon:-113.93,video:"J7HO0dkkomE",publisher:"Cornell Lab Bird Cams",source:"https://www.youtube.com/watch?v=J7HO0dkkomE"},{id:"ninepipes-mission-mountains",name:"Ninepipes \xB7 Mission Mountains",lat:47.45,lon:-114.1,video:"wDgZkzkOP-s",publisher:"Explore Northern Lights & Nature Meditation Cams",source:"https://www.youtube.com/watch?v=wDgZkzkOP-s"},{id:"ithaca-red-tailed-hawks",name:"Ithaca \xB7 Red-tailed hawks",lat:42.45,lon:-76.48,video:"afsaYKQ3vac",publisher:"Cornell Lab Bird Cams",source:"https://www.youtube.com/watch?v=afsaYKQ3vac"},{id:"sapsucker-woodland-birds",name:"Sapsucker Woods \xB7 Woodland birds",lat:42.48,lon:-76.45,video:"x10vL6_47Dw",publisher:"Cornell Lab Bird Cams",source:"https://www.youtube.com/watch?v=x10vL6_47Dw"},{id:"ely-international-wolf-center",name:"Ely \xB7 International Wolf Center",lat:47.94,lon:-91.83,video:"5e4lsEe4Vew",publisher:"Explore Live Nature Cams",source:"https://www.youtube.com/watch?v=5e4lsEe4Vew"},{id:"decorah-north-nest",name:"Decorah \xB7 North nest",lat:43.3,lon:-91.78,video:"GGIE1E-kaMQ",publisher:"Explore Live Nature Cams",source:"https://www.youtube.com/watch?v=GGIE1E-kaMQ"},{id:"decorah-bald-eagles",name:"Decorah \xB7 Bald eagles",lat:43.3,lon:-91.78,video:"IVmL3diwJuw",publisher:"Explore Eagle Nest Cams",source:"https://www.youtube.com/watch?v=IVmL3diwJuw"},{id:"monterey-monterey-bay",name:"Monterey Bay Aquarium \xB7 Monterey Bay",lat:36.618,lon:-121.901,video:"fVa6-zCBR7A",publisher:"Monterey Bay Aquarium",source:"https://www.youtube.com/watch?v=fVa6-zCBR7A"},{id:"monterey-kelp-forest",name:"Monterey Bay Aquarium \xB7 Kelp forest",lat:36.618,lon:-121.901,video:"w3LjpFhySTg",publisher:"Monterey Bay Aquarium",source:"https://www.youtube.com/watch?v=w3LjpFhySTg"},{id:"monterey-sea-otters",name:"Monterey Bay Aquarium \xB7 Sea otters",lat:36.618,lon:-121.901,video:"abbR-Ttd-cA",publisher:"Monterey Bay Aquarium",source:"https://www.youtube.com/watch?v=abbR-Ttd-cA"},{id:"monterey-moon-jellies",name:"Monterey Bay Aquarium \xB7 Moon jellies",lat:36.618,lon:-121.901,video:"zL68biE6wAs",publisher:"Monterey Bay Aquarium",source:"https://www.youtube.com/watch?v=zL68biE6wAs"},{id:"monterey-sharks",name:"Monterey Bay Aquarium \xB7 Sharks",lat:36.618,lon:-121.901,video:"tEtg5Kg3voQ",publisher:"Monterey Bay Aquarium",source:"https://www.youtube.com/watch?v=tEtg5Kg3voQ"},{id:"monterey-spider-crabs",name:"Monterey Bay Aquarium \xB7 Spider crabs",lat:36.618,lon:-121.901,video:"dzmJXWmA2EM",publisher:"Monterey Bay Aquarium",source:"https://www.youtube.com/watch?v=dzmJXWmA2EM"},{id:"monterey-open-sea",name:"Monterey Bay Aquarium \xB7 Open sea",lat:36.618,lon:-121.901,video:"n_GpVsz4nHU",publisher:"Monterey Bay Aquarium",source:"https://www.youtube.com/watch?v=n_GpVsz4nHU"},{id:"monterey-penguins",name:"Monterey Bay Aquarium \xB7 Penguins",lat:36.618,lon:-121.901,video:"QWGYS9IOqYc",publisher:"Monterey Bay Aquarium",source:"https://www.youtube.com/watch?v=QWGYS9IOqYc"},{id:"monterey-aviary",name:"Monterey Bay Aquarium \xB7 Aviary",lat:36.618,lon:-121.901,video:"AWJi0LgyA28",publisher:"Monterey Bay Aquarium",source:"https://www.youtube.com/watch?v=AWJi0LgyA28"},{id:"monterey-coral-reef",name:"Monterey Bay Aquarium \xB7 Coral reef",lat:36.618,lon:-121.901,video:"1VBPxAkaNDU",publisher:"Monterey Bay Aquarium",source:"https://www.youtube.com/watch?v=1VBPxAkaNDU"},{id:"monterey-jellyfish",name:"Monterey Bay Aquarium \xB7 Jellyfish",lat:36.618,lon:-121.901,video:"eQ_foBERmzA",publisher:"Monterey Bay Aquarium",source:"https://www.youtube.com/watch?v=eQ_foBERmzA"},{id:"catalina-marine-reserve",name:"Catalina Island \xB7 Marine reserve",lat:33.46,lon:-118.52,video:"JH_NzhSsqis",publisher:"Explore Oceans",source:"https://www.youtube.com/watch?v=JH_NzhSsqis"},{id:"catalina-two-harbors-eagles",name:"Catalina Island \xB7 Two Harbors eagles",lat:33.46,lon:-118.52,video:"E5T2eHM8tcI",publisher:"Explore Eagle Nest Cams",source:"https://www.youtube.com/watch?v=E5T2eHM8tcI"},{id:"catalina-west-end-eagles",name:"Catalina Island \xB7 West End eagles",lat:33.46,lon:-118.52,video:"aT1adgYSfbc",publisher:"Explore Eagle Nest Cams",source:"https://www.youtube.com/watch?v=aT1adgYSfbc"},{id:"santa-cruz-sauces-eagles",name:"Santa Cruz Island \xB7 Sauces eagles",lat:34,lon:-119.8,video:"rnTsOesC6hE",publisher:"Explore Eagle Nest Cams",source:"https://www.youtube.com/watch?v=rnTsOesC6hE"},{id:"santa-cruz-fraser-point",name:"Santa Cruz Island \xB7 Fraser Point",lat:34,lon:-119.8,video:"OY4V_AppZ6s",publisher:"Explore Eagle Nest Cams",source:"https://www.youtube.com/watch?v=OY4V_AppZ6s"},{id:"homosassa-manatees",name:"Homosassa Springs \xB7 Manatees",lat:28.8,lon:-82.59,video:"Fz6sl9YJZE0",publisher:"Explore Live Nature Cams",source:"https://www.youtube.com/watch?v=Fz6sl9YJZE0"},{id:"silver-springs-underwater",name:"Silver Springs \xB7 Underwater",lat:29.22,lon:-82.05,video:"uWiJ9qCYxoo",publisher:"Explore Oceans",source:"https://www.youtube.com/watch?v=uWiJ9qCYxoo"},{id:"silver-springs-river-surface",name:"Silver Springs \xB7 River surface",lat:29.22,lon:-82.05,video:"jxnehowX-9Y",publisher:"Explore Oceans",source:"https://www.youtube.com/watch?v=jxnehowX-9Y"},{id:"utila-reef-wall",name:"\xDAtila \xB7 Reef wall",lat:16.08,lon:-86.97,video:"Sq-X4Ga1oyc",publisher:"Explore Oceans",source:"https://www.youtube.com/watch?v=Sq-X4Ga1oyc"},{id:"utila-shallow-reef",name:"\xDAtila \xB7 Shallow reef",lat:16.08,lon:-86.97,video:"Kf-x20Yq0_A",publisher:"Explore Oceans",source:"https://www.youtube.com/watch?v=Kf-x20Yq0_A"},{id:"utila-sand-channel",name:"\xDAtila \xB7 Sand channel",lat:16.08,lon:-86.97,video:"jzx_n25g3kA",publisher:"Explore Oceans",source:"https://www.youtube.com/watch?v=jzx_n25g3kA"},{id:"utila-reef-crest",name:"\xDAtila \xB7 Reef crest",lat:16.08,lon:-86.97,video:"1zcIUk66HX4",publisher:"Explore Oceans",source:"https://www.youtube.com/watch?v=1zcIUk66HX4"},{id:"canopy-tower-hummingbirds",name:"Soberan\xEDa \xB7 Hummingbirds",lat:9.08,lon:-79.66,video:"0xFARCdZ3vA",publisher:"Cornell Lab Bird Cams",source:"https://www.youtube.com/watch?v=0xFARCdZ3vA"},{id:"canopy-lodge-tropical-birds",name:"El Valle de Ant\xF3n \xB7 Tropical birds",lat:8.61,lon:-80.13,video:"WtoxxHADnGk",publisher:"Cornell Lab Bird Cams",source:"https://www.youtube.com/watch?v=WtoxxHADnGk"},{id:"otago-royal-albatross",name:"Taiaroa Head \xB7 Royal albatross",lat:-45.78,lon:170.73,video:"Mm_zVDDUeNA",publisher:"Cornell Lab Bird Cams",source:"https://www.youtube.com/watch?v=Mm_zVDDUeNA"},{id:"mindanao-philippine-eagles",name:"Davao \xB7 Philippine eagles",lat:7,lon:125.39,video:"QoKy-rn66og",publisher:"Explore Eagle Nest Cams",source:"https://www.youtube.com/watch?v=QoKy-rn66og"},{id:"namib-desert-waterhole",name:"Gondwana Namib Park \xB7 Desert waterhole",lat:-24.11,lon:15.89,video:"ydYDqZQpim8",publisher:"NamibiaCam",source:"https://www.youtube.com/watch?v=ydYDqZQpim8"},{id:"kalahari-kalahari-desert",name:"Gondwana Kalahari Park \xB7 Kalahari Desert",lat:-24.4,lon:17.96,video:"ME0dPuBtzug",publisher:"NamibiaCam",source:"https://www.youtube.com/watch?v=ME0dPuBtzug"},{id:"etosha-etosha-waterhole",name:"Okaukuejo \xB7 Etosha waterhole",lat:-19.18,lon:15.92,video:"AeMUdOPFcXI",publisher:"NamibiaCam",source:"https://www.youtube.com/watch?v=AeMUdOPFcXI"},{id:"tembe-elephants",name:"Tembe Elephant Park \xB7 Elephants",lat:-27.04,lon:32.42,video:"0P_LBKqVbfs",publisher:"Explore Live Nature Cams",source:"https://www.youtube.com/watch?v=0P_LBKqVbfs"},{id:"selati-black-eagles",name:"Selati Game Reserve \xB7 Black eagles",lat:-23.95,lon:30.72,video:"_xhLV-TJpd8",publisher:"Explore Eagle Nest Cams",source:"https://www.youtube.com/watch?v=_xhLV-TJpd8"},{id:"lisbon-waterfall",name:"Lisbon Falls \xB7 Waterfall",lat:-24.86,lon:30.83,video:"-qwXenyHDN4",publisher:"Explore Northern Lights & Nature Meditation Cams",source:"https://www.youtube.com/watch?v=-qwXenyHDN4"},{id:"loch-garten",name:"Loch Garten \xB7 Ospreys",lat:57.24,lon:-3.7,video:"1UByY8ca7qs",publisher:"RSPB",source:"https://www.youtube.com/watch?v=1UByY8ca7qs"},{id:"loch-leven",name:"Loch Leven \xB7 Red squirrels",lat:56.2,lon:-3.38,video:"FhMFae-SZME",publisher:"RSPB",source:"https://www.youtube.com/watch?v=FhMFae-SZME"},{id:"lorton-meadows",name:"Lorton Meadows",lat:50.65,lon:-2.46,video:"UVeaxLRI83I",publisher:"Dorset Wildlife Trust",source:"https://www.youtube.com/watch?v=UVeaxLRI83I"},{id:"utsjoki",name:"Utsjoki \xB7 Aurora",lat:69.91,lon:27.03,video:"Iw5VhekzbxE",publisher:"Aurora Borealis (LIVE!)",source:"https://www.youtube.com/watch?v=Iw5VhekzbxE"}];var $c=[{id:"iss-earth-hd",name:"ISS \xB7 Earth view HD",norad:"25544",publisher:"NASA",video:"ROboUHfPUrU",source:"https://www.nasa.gov/live/"},{id:"iss-station-live",name:"ISS \xB7 Station camera",norad:"25544",publisher:"NASA",video:"M3HKLzjvKPc",source:"https://www.nasa.gov/live/"}];function pp({root:n,layer:e,vector:t,R:i,cities:r,selectedCity:a,focusPoint:o,followPoint:s,setCameras:l,openCamera:u,wake:c,isVisible:d}){let f=()=>window.SKMLanguage?.code==="ko",h=(R,ee)=>f()?R:ee,m=(R,ee,V)=>{let Z=document.createElement(R);return ee&&(Z.textContent=ee),V&&(Z.className=V),Z},x=n.querySelector(".earth-app"),g=n.querySelector(".survey-dock"),p=m("button","LIVE");p.type="button",p.setAttribute("aria-expanded","false"),g.append(p);let y=m("section",null,"earth-live-panel");y.hidden=!0,y.setAttribute("aria-label","Live map"),x.append(y);let _=m("header"),v=m("strong","LIVE"),I=m("button","\xD7");I.type="button",I.setAttribute("aria-label","Close live map"),_.append(v,I),y.append(_);let E=m("nav"),P=m("div",null,"earth-live-body");y.append(E,P);let L="satellites",b=!0,S=[],T=null,B=0,F=0,G=!1,U=0,N=null,te=!1,D=[],k=0,J=a()?.country||"US",$=new Map,re=new Map,le={satellites:["\uC704\uC131","SATELLITES"],radio:["\uB77C\uB514\uC624","RADIO"],cameras:["\uCE74\uBA54\uB77C","CAMERAS"]};function q(){for(let[R,ee]of re)ee.textContent=h(...le[R]),ee.setAttribute("aria-pressed",String(L===R))}for(let R of Object.keys(le)){let ee=m("button");ee.type="button",ee.onclick=()=>{L=R,q(),Xe()},E.append(ee),re.set(R,ee)}q();function W(){y.hidden=!1,pe.hidden=!0,p.setAttribute("aria-expanded","true"),n.querySelector(".survey-cities").hidden=!0,n.querySelector("[data-survey=cities]").setAttribute("aria-expanded","false"),q(),Xe()}function j(){y.hidden=!0,p.setAttribute("aria-expanded","false"),F++,Re(),c()}p.onclick=()=>y.hidden?W():j(),I.onclick=j,n.querySelector("[data-survey=cities]").addEventListener("click",()=>{de(),j()}),document.addEventListener("keydown",R=>{R.key==="Escape"&&(y.hidden?de():j())});let ae=(R,ee)=>{let V=m("a",R+" \u2197","earth-live-source");return V.href=ee,V.target="_blank",V.rel="noopener noreferrer",V};function fe(R,ee,V){let Z=m("button",null,"earth-live-row");return Z.type="button",Z.append(m("span",R)),ee&&Z.append(m("small",ee)),Z.onclick=V,Z}let me=m("section",null,"earth-radio-mini");me.hidden=!0,me.setAttribute("aria-label","Radio player");let ue=m("button",null,"earth-radio-info"),Ce=m("strong"),Te=m("small");ue.type="button",ue.append(Ce,Te),ue.onclick=()=>{L="radio",W()};let Pe=m("button","\u25B6"),O=m("button","\xD7");Pe.type=O.type="button",O.setAttribute("aria-label","Close radio player"),me.append(ue,Pe,O),x.append(me);let Oe=null;function De(R){me.hidden=!R.station,me.dataset.status=R.status,n.classList.toggle("radio-active",!!R.station),Ce.textContent=R.station?.name||"";let ee={loading:["\uC5F0\uACB0 \uC911\u2026","CONNECTING\u2026"],playing:["\uC7AC\uC0DD \uC911","LIVE RADIO"],paused:["\uC77C\uC2DC \uC815\uC9C0","PAUSED"],error:["\uC5F0\uACB0 \uC2E4\uD328 \xB7 \uB2E4\uC2DC \uC7AC\uC0DD","UNAVAILABLE \xB7 RETRY"]};Te.textContent=ee[R.status]?h(...ee[R.status]):"";let V=R.status==="playing"||R.status==="loading";Pe.textContent=V?"\u2161":"\u25B6",Pe.setAttribute("aria-label",V?h("\uB77C\uB514\uC624 \uC77C\uC2DC \uC815\uC9C0","Pause radio"):h("\uB77C\uB514\uC624 \uC7AC\uC0DD","Play radio"));for(let Z of P.querySelectorAll("[data-radio-id]")){let ce=Z.dataset.radioId===R.station?.id&&V;Z.setAttribute("aria-pressed",String(ce)),Z.querySelector("small").textContent=ce?"\u2161":"\u25B6"}}let _e=hp({createAudio:()=>{let R=m("audio");return R.hidden=!0,R.dataset.skmRadio="true",x.append(R),R},onChange:R=>{Oe?.observe(R),De(R)},beforePlay:(R,ee)=>{for(let V of document.querySelectorAll("audio,video"))V!==R&&!V.paused&&V.pause();try{window.SKMApp?.audio?.("playback")}catch{}dp(ee.id)}});Oe=Xh({loadStations:fp,play:R=>(J=R.country||J,_e.play(R)),current:()=>_e.snapshot().station,canPlay:()=>!document.hidden&&d(),onSearching:R=>{if(!R){De(_e.snapshot());return}R&&(me.hidden=!1,n.classList.add("radio-active"),me.dataset.status="loading",Ce.textContent=h("\uB79C\uB364 \uB77C\uB514\uC624","RANDOM RADIO"),Te.textContent=h("\uC5F0\uACB0 \uC911\u2026","CONNECTING\u2026"),Pe.textContent="\u2161",Pe.setAttribute("aria-label",h("\uB77C\uB514\uC624 \uC77C\uC2DC \uC815\uC9C0","Pause radio")))},onError:()=>{me.hidden=!1,n.classList.add("radio-active"),me.dataset.status="error",Ce.textContent=h("\uB79C\uB364 \uB77C\uB514\uC624","RANDOM RADIO"),Te.textContent=h("\uC5F0\uACB0 \uC2E4\uD328 \xB7 \uB2E4\uC2DC \uC7AC\uC0DD","UNAVAILABLE \xB7 RETRY"),Pe.textContent="\u25B6",Pe.setAttribute("aria-label",h("\uB77C\uB514\uC624 \uC7AC\uC0DD","Play radio"))}}),Oe.prefetch().catch(()=>{}),Pe.onclick=()=>{let R=me.dataset.status==="loading";Oe.cancel(),_e.snapshot().station?_e.toggle():R?_e.stop():Oe.start()},O.onclick=()=>{Oe.cancel(),_e.stop()},document.addEventListener("play",R=>{let ee=_e.snapshot();R.target!==ee.audio&&(ee.status==="playing"||ee.status==="loading")&&_e.pause()},!0),window.addEventListener("pagehide",()=>{Oe.cancel(),_e.stop()}),document.addEventListener("visibilitychange",()=>{document.hidden&&Oe.cancel()});let pe=m("section",null,"earth-orbit-detail");pe.hidden=!0,pe.setAttribute("aria-label","Satellite details");let Ue=m("header"),xe=m("strong"),C=m("button","\xD7");C.type="button",C.setAttribute("aria-label","Close satellite details"),C.onclick=()=>de(),Ue.append(xe,C);let w=m("div",null,"earth-orbit-metrics"),X=m("p",null,"earth-live-note"),ne=m("p",null,"earth-live-note"),oe=m("div",null,"earth-orbit-actions"),ie=m("div",null,"earth-space-cameras"),be=m("button"),he=m("button");be.type=he.type="button",oe.append(be,he),pe.append(Ue,w,X,oe,ne,ie),x.append(pe);let ge=document.createElementNS("http://www.w3.org/2000/svg","svg"),Ge=document.createElementNS("http://www.w3.org/2000/svg","path");ge.classList.add("earth-orbit-trail"),ge.setAttribute("aria-hidden","true"),ge.append(Ge),e.prepend(ge);function de(){N=null,te=!1,D=[],pe.hidden=!0,Ge.setAttribute("d",""),c()}function we(){te=!1,Re()}function M(R){N=R,te=!1,b=!0,k=0;let ee=Ii(R);ee&&o(ee.lat,ee.lon),j(),c()}be.onclick=()=>{te=!te;let R=N&&Ii(N);te&&R&&o(R.lat,R.lon),Re(),c()},he.onclick=()=>{let R=N&&Ii(N);R&&o(R.lat,R.lon)};function Re(){if(pe.hidden=!N||!b||!y.hidden,pe.hidden)return;let R=Ii(N);xe.textContent=N.name,be.textContent=te?h("\uCD94\uC801 \uC911","FOLLOWING"):h("\uB530\uB77C\uAC00\uAE30","FOLLOW"),be.setAttribute("aria-pressed",String(te)),he.textContent=h("\uC911\uC559\uC73C\uB85C","CENTER"),w.replaceChildren();for(let[ee,V]of[[h("\uACE0\uB3C4","ALTITUDE"),R?Math.round(R.altitude)+" km":"\u2014"],[h("\uC18D\uB3C4","SPEED"),R?Math.round(R.speed).toLocaleString()+" km/h":"\u2014"]]){let Z=m("div");Z.append(m("small",ee),m("strong",V)),w.append(Z)}if(X.textContent=R?`${Math.abs(R.lat).toFixed(2)}\xB0${R.lat>=0?"N":"S"}  /  ${Math.abs(R.lon).toFixed(2)}\xB0${R.lon>=0?"E":"W"}`:h("\uD604\uC7AC \uC704\uCE58\uB97C \uACC4\uC0B0\uD560 \uC218 \uC5C6\uC5B4\uC694.","Position unavailable."),ie.dataset.satellite!==N.id){ie.dataset.satellite=N.id,ie.replaceChildren();let ee=$c.filter(V=>String(V.norad)===N.id);for(let V of ee)ie.append(fe(V.name,"\u25B7",()=>{_e.pause(),u(V)}));ee.length&&ie.append(m("p",h("NASA \uC1A1\uCD9C \xB7 \uC911\uB2E8 \uC2DC \uC548\uB0B4 \uD654\uBA74\uC774 \uB098\uC62C \uC218 \uC788\uC5B4\uC694.","NASA feed \xB7 May show a standby screen during outages."),"earth-live-note"))}ne.textContent=h("\uADA4\uB3C4 \uAE30\uBC18 \uCD94\uC815 \xB7 \uC810\uC120\uC740 \uD5A5\uD6C4 90\uBD84 \uACBD\uB85C","ORBIT ESTIMATE \xB7 DOTTED PATH: NEXT 90 MIN")}function Me(){for(let R of $.values())R.button.hidden=!0;Ge.setAttribute("d","")}function We(R){if($.has(R.id))return $.get(R.id).item=R,$.get(R.id);let ee=m("button",null,"earth-satellite-pin");ee.type="button",ee.setAttribute("aria-label",R.name),ee.append(m("span","\u25C7"),m("small",R.name));let V={button:ee,item:R,point:null};return ee.onclick=()=>M(V.item),e.append(ee),$.set(R.id,V),V}async function He(){if(!G){G=!0;try{T=await sp(),S=Ja(T.rows),U=Date.now(),B=0,Me();for(let[R,ee]of $)S.some(V=>V.id===R)||(ee.button.remove(),$.delete(R));for(let R of S)We(R);N&&(N=S.find(R=>R.id===N.id)||null,k=0,N||(te=!1))}catch{S=[];for(let R of $.values())R.button.remove();$.clear(),de()}finally{G=!1,c(),!y.hidden&&L==="satellites"&&Xe()}}}async function Xe(){let R=++F;if(P.replaceChildren(),L==="satellites"){let ee=fe(h("\uC9C0\uB3C4\uC5D0 \uD45C\uC2DC","SHOW ON MAP"),b?"ON":"OFF",()=>{b=!b,b&&!S.length&&He(),b||(Me(),de()),Xe(),c()});ee.setAttribute("aria-pressed",String(b)),P.append(ee),P.append(m("p",G?h("\uADA4\uB3C4 \uBD88\uB7EC\uC624\uB294 \uC911\u2026","Loading orbits\u2026"):h("\uACF5\uAC1C \uADA4\uB3C4\uB85C \uACC4\uC0B0\uD55C \uD604\uC7AC \uC704\uCE58","Current positions estimated from orbital data"),"earth-live-note")),!S.length&&!G&&P.append(fe(h("\uADA4\uB3C4 \uB2E4\uC2DC \uBD88\uB7EC\uC624\uAE30","RELOAD ORBITS"),"\u21BB",()=>{b=!0,He(),Xe()})),T&&P.append(m("p",(T.offline?h("\uC800\uC7A5\uB41C \uADA4\uB3C4 \xB7 ","Cached orbits \xB7 "):"")+new Date(T.at).toLocaleString(),"earth-live-note"));for(let V of S){let Z=Ii(V);Z&&P.append(fe(V.name,Math.round(Z.altitude)+" km",()=>M(V)))}P.append(ae("CelesTrak","https://celestrak.org/NORAD/elements/"))}else if(L==="radio"){let Wt=function(){if(Se.replaceChildren(),At){Se.append(m("p",h("\uAD6D\uAC00 \uBD88\uB7EC\uC624\uB294 \uC911\u2026","Loading countries\u2026"),"earth-live-note"));return}if(yt){Se.append(fe(h("\uC5F0\uACB0 \uC2E4\uD328 \xB7 \uB2E4\uC2DC \uC2DC\uB3C4","UNAVAILABLE \xB7 RETRY"),"\u21BB",()=>void Dt()));return}let Ze=Kc(Ye,ee,se.value);Ze.length||Se.append(m("p",h("\uC77C\uCE58\uD558\uB294 \uAD6D\uAC00\uAC00 \uC5C6\uC5B4\uC694.","No matching countries."),"earth-live-note"));for(let nn of Ze)Se.append(fe(nn.label,nn.code,()=>{J=nn.code,Z.querySelector("span").textContent=nn.label,ce.hidden=!0,$e.hidden=!1,Z.setAttribute("aria-expanded","false"),se.value="",hn()}))},ee=window.SKMLanguage?.code||"en",Z=fe((Ze=>Kc([{code:Ze}],ee)[0]?.label||Ze)(J),"\u2304",()=>{let Ze=ce.hidden;ce.hidden=!Ze,$e.hidden=Ze,Z.setAttribute("aria-expanded",String(Ze)),Ze&&(se.focus(),Wt())});Z.setAttribute("aria-label",h("\uB77C\uB514\uC624 \uAD6D\uAC00 \uC120\uD0DD","Choose radio country")),Z.setAttribute("aria-expanded","false");let ce=m("div",null,"earth-radio-countries");ce.hidden=!0;let se=m("input");se.type="search",se.placeholder=h("\uAD6D\uAC00 \uAC80\uC0C9","Search countries"),se.setAttribute("aria-label",se.placeholder),se.autocomplete="off",se.spellcheck=!1;let Se=m("div"),$e=m("div"),et=m("div");ce.append(se,Se),$e.append(m("p",h("\uBC29\uC1A1\uAD6D \uC120\uD0DD \u2192 \uC9C0\uAD6C\uBCF8\uC744 \uBCF4\uBA74\uC11C \uB4E3\uAE30","Choose a station. Keep listening as you explore."),"earth-live-note"),et),P.append(Z,ce,$e,ae("Radio Browser","https://www.radio-browser.info/"));let Ye=[],At=!0,yt=!1,Ve=0;async function Dt(){At=!0,yt=!1,Wt();try{let Ze=await lp();if(R!==F)return;Ye=Ze}catch{yt=!0}finally{At=!1,R===F&&Wt()}}async function hn(){let Ze=J,nn=++Ve;et.replaceChildren(m("p",h("\uBD88\uB7EC\uC624\uB294 \uC911\u2026","Loading\u2026")));try{let Ln=await cp(Ze);if(R!==F||nn!==Ve)return;et.replaceChildren();for(let Dn of Ln){let rn=fe(Dn.name,"\u25B6",()=>{Oe.cancel(),_e.snapshot().station?.id===Dn.id?_e.toggle():_e.play(Dn)});rn.dataset.radioId=Dn.id,et.append(rn)}Ln.length||et.append(m("p",h("\uC571\uC5D0\uC11C \uC7AC\uC0DD \uAC00\uB2A5\uD55C \uBC29\uC1A1\uAD6D\uC774 \uC544\uC9C1 \uC5C6\uC5B4\uC694. \uB2E4\uB978 \uAD6D\uAC00\uB97C \uC120\uD0DD\uD574 \uC8FC\uC138\uC694.","No compatible stations here yet. Choose another country."))),De(_e.snapshot())}catch{R===F&&nn===Ve&&et.replaceChildren(fe(h("\uC5F0\uACB0 \uC2E4\uD328 \xB7 \uB2E4\uC2DC \uC2DC\uB3C4","UNAVAILABLE \xB7 RETRY"),"\u21BB",()=>void hn()))}}se.oninput=Wt,Dt(),hn()}else{let se=function(){Z.replaceChildren();let Se=V.value.toLocaleLowerCase();for(let $e of As.filter(et=>(et.name+" "+et.publisher).toLocaleLowerCase().includes(Se)))Z.append(fe($e.name,$e.publisher,()=>{de(),o($e.lat,$e.lon),j(),u($e)}))},ee=fe(h("\uC9C0\uB3C4\uC5D0 \uD45C\uC2DC","SHOW ON MAP"),n.dataset.cameras==="off"?"OFF":"ON",()=>{let Se=n.dataset.cameras==="off";n.dataset.cameras=Se?"on":"off",l(Se),Xe()});ee.setAttribute("aria-pressed",String(n.dataset.cameras!=="off")),P.append(ee);for(let Se of $c)P.append(fe(Se.name,"NASA \xB7 \u25B7",()=>{_e.pause(),j(),u(Se)}));let V=m("input");V.type="search",V.placeholder=h("\uC7A5\uC18C \uAC80\uC0C9","Search places"),V.setAttribute("aria-label",V.placeholder);let Z=m("div");P.append(V);let ce=m("a",h("\uB274\uC695 \xB7 \uD0C0\uC784\uC2A4\uD018\uC5B4 \u2197","New York \xB7 Times Square \u2197"),"earth-live-row");ce.href="https://www.earthcam.com/usa/newyork/timessquare/",ce.target="_blank",ce.rel="noopener noreferrer",P.append(ce,Z),V.oninput=se,se()}}return He(),{hide:j,stopFollowing:we,dismissSatellite:de,randomRadio:()=>Oe.start(),render(R){if(!b||!d()){Me();return}let ee=Date.now();if(ee-U>Yc&&!G&&(U=ee,He()),ee-B>1e3){B=ee;for(let Z of $.values()){let ce=Ii(Z.item,new Date(ee));Z.point=ce?t(ce.lat,ce.lon,i*(1+ce.altitude/6371)):null}if(N){let Z=Ii(N,new Date(ee));te&&Z&&s(Z.lat,Z.lon),Re()}}let V=[];Me();for(let Z of[...$.values()].sort((ce,se)=>(se.item.id===N?.id)-(ce.item.id===N?.id))){let ce=Z.point&&R(Z.point);if(!ce)continue;let se=V.find(Se=>Math.hypot(Se.p.x-ce.x,Se.p.y-ce.y)<28);se?se.count++:V.push({pin:Z,p:ce,count:1})}for(let{pin:Z,p:ce,count:se}of V){Z.button.hidden=!1,Z.button.style.left=ce.x+"px",Z.button.style.top=ce.y+"px";let Se=Z.item.name+(se>1?" +"+(se-1):"");Z.button.querySelector("small").textContent=Se,Z.button.setAttribute("aria-label",Se),Z.button.classList.toggle("is-selected",Z.item.id===N?.id)}if(N){ee-k>3e4&&(k=ee,D=up(N,ee).map(se=>se?t(se.lat,se.lon,i*(1+se.altitude/6371)):null));let Z="",ce=!1;for(let se of D){let Se=se&&R(se);if(!Se){ce=!1;continue}Z+=(ce?"L":"M")+Se.x.toFixed(1)+","+Se.y.toFixed(1),ce=!0}Ge.setAttribute("d",Z)}}}}var _x=0,mp=1,Mx=2;var Cm=1,Sx=2,Oi=3,rr=0,Qt=1,ni=2,nr=0,fa=1,cl=2,gp=3,xp=4,bx=5,Er=100,wx=101,Ax=102,Ex=103,Tx=104,Cx=200,Rx=201,Px=202,Ix=203,Iu=204,Lu=205,Lx=206,Dx=207,Ux=208,Nx=209,Fx=210,Ox=211,Bx=212,kx=213,zx=214,Du=0,Uu=1,Nu=2,ga=3,Fu=4,Ou=5,Bu=6,ku=7,Rm=0,Hx=1,Vx=2,ir=0,Gx=1,Wx=2,qx=3,nf=4,Xx=5,Yx=6,Zx=7;var Pm=300,xa=301,va=302,zu=303,Hu=304,kl=306,Vu=1e3,Cr=1001,Gu=1002,ai=1003,Kx=1004;var Es=1005;var vi=1006,Jc=1007;var Rr=1008;var Vi=1009,Im=1010,Lm=1011,xo=1012,rf=1013,Pr=1014,ki=1015,Io=1016,af=1017,of=1018,ya=1020,Dm=35902,Um=1021,Nm=1022,ri=1023,Fm=1024,Om=1025,ha=1026,_a=1027,Bm=1028,sf=1029,km=1030,lf=1031;var cf=1033,rl=33776,al=33777,ol=33778,sl=33779,Wu=35840,qu=35841,Xu=35842,Yu=35843,Zu=36196,Ku=37492,$u=37496,Ju=37808,ju=37809,Qu=37810,ed=37811,td=37812,nd=37813,id=37814,rd=37815,ad=37816,od=37817,sd=37818,ld=37819,cd=37820,ud=37821,ll=36492,dd=36494,fd=36495,zm=36283,hd=36284,pd=36285,md=36286;var ul=2300,gd=2301,jc=2302,vp=2400,yp=2401,_p=2402;var $x=3200,Jx=3201;var Hm=0,jx=1,er="",zt="srgb",wa="srgb-linear",zl="linear",Et="srgb";var Xr=7680;var Mp=519,Qx=512,ev=513,tv=514,Vm=515,nv=516,iv=517,rv=518,av=519,xd=35044;var Sp="300 es",zi=2e3,dl=2001,ar=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let r=this._listeners[e];if(r!==void 0){let a=r.indexOf(t);a!==-1&&r.splice(a,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let i=this._listeners[e.type];if(i!==void 0){e.target=this;let r=i.slice(0);for(let a=0,o=r.length;a<o;a++)r[a].call(this,e);e.target=null}}},cn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],bp=1234567,uo=Math.PI/180,vo=180/Math.PI;function yi(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(cn[n&255]+cn[n>>8&255]+cn[n>>16&255]+cn[n>>24&255]+"-"+cn[e&255]+cn[e>>8&255]+"-"+cn[e>>16&15|64]+cn[e>>24&255]+"-"+cn[t&63|128]+cn[t>>8&255]+"-"+cn[t>>16&255]+cn[t>>24&255]+cn[i&255]+cn[i>>8&255]+cn[i>>16&255]+cn[i>>24&255]).toLowerCase()}function on(n,e,t){return Math.max(e,Math.min(t,n))}function uf(n,e){return(n%e+e)%e}function ov(n,e,t,i,r){return i+(n-e)*(r-i)/(t-e)}function sv(n,e,t){return n!==e?(t-n)/(e-n):0}function fo(n,e,t){return(1-t)*n+t*e}function lv(n,e,t,i){return fo(n,e,1-Math.exp(-t*i))}function cv(n,e=1){return e-Math.abs(uf(n,e*2)-e)}function uv(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function dv(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function fv(n,e){return n+Math.floor(Math.random()*(e-n+1))}function hv(n,e){return n+Math.random()*(e-n)}function pv(n){return n*(.5-Math.random())}function mv(n){n!==void 0&&(bp=n);let e=bp+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function gv(n){return n*uo}function xv(n){return n*vo}function vv(n){return(n&n-1)===0&&n!==0}function yv(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function _v(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Mv(n,e,t,i,r){let a=Math.cos,o=Math.sin,s=a(t/2),l=o(t/2),u=a((e+i)/2),c=o((e+i)/2),d=a((e-i)/2),f=o((e-i)/2),h=a((i-e)/2),m=o((i-e)/2);switch(r){case"XYX":n.set(s*c,l*d,l*f,s*u);break;case"YZY":n.set(l*f,s*c,l*d,s*u);break;case"ZXZ":n.set(l*d,l*f,s*c,s*u);break;case"XZX":n.set(s*c,l*m,l*h,s*u);break;case"YXY":n.set(l*h,s*c,l*m,s*u);break;case"ZYZ":n.set(l*m,l*h,s*c,s*u);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function ii(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function bt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}var df={DEG2RAD:uo,RAD2DEG:vo,generateUUID:yi,clamp:on,euclideanModulo:uf,mapLinear:ov,inverseLerp:sv,lerp:fo,damp:lv,pingpong:cv,smoothstep:uv,smootherstep:dv,randInt:fv,randFloat:hv,randFloatSpread:pv,seededRandom:mv,degToRad:gv,radToDeg:xv,isPowerOfTwo:vv,ceilPowerOfTwo:yv,floorPowerOfTwo:_v,setQuaternionFromProperEuler:Mv,normalize:bt,denormalize:ii},Le=class n{constructor(e=0,t=0){n.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(on(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),r=Math.sin(t),a=this.x-e.x,o=this.y-e.y;return this.x=a*i-o*r+e.x,this.y=a*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Qe=class n{constructor(e,t,i,r,a,o,s,l,u){n.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,a,o,s,l,u)}set(e,t,i,r,a,o,s,l,u){let c=this.elements;return c[0]=e,c[1]=r,c[2]=s,c[3]=t,c[4]=a,c[5]=l,c[6]=i,c[7]=o,c[8]=u,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,a=this.elements,o=i[0],s=i[3],l=i[6],u=i[1],c=i[4],d=i[7],f=i[2],h=i[5],m=i[8],x=r[0],g=r[3],p=r[6],y=r[1],_=r[4],v=r[7],I=r[2],E=r[5],P=r[8];return a[0]=o*x+s*y+l*I,a[3]=o*g+s*_+l*E,a[6]=o*p+s*v+l*P,a[1]=u*x+c*y+d*I,a[4]=u*g+c*_+d*E,a[7]=u*p+c*v+d*P,a[2]=f*x+h*y+m*I,a[5]=f*g+h*_+m*E,a[8]=f*p+h*v+m*P,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],r=e[2],a=e[3],o=e[4],s=e[5],l=e[6],u=e[7],c=e[8];return t*o*c-t*s*u-i*a*c+i*s*l+r*a*u-r*o*l}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],a=e[3],o=e[4],s=e[5],l=e[6],u=e[7],c=e[8],d=c*o-s*u,f=s*l-c*a,h=u*a-o*l,m=t*d+i*f+r*h;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/m;return e[0]=d*x,e[1]=(r*u-c*i)*x,e[2]=(s*i-r*o)*x,e[3]=f*x,e[4]=(c*t-r*l)*x,e[5]=(r*a-s*t)*x,e[6]=h*x,e[7]=(i*l-u*t)*x,e[8]=(o*t-i*a)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,a,o,s){let l=Math.cos(a),u=Math.sin(a);return this.set(i*l,i*u,-i*(l*o+u*s)+o+e,-r*u,r*l,-r*(-u*o+l*s)+s+t,0,0,1),this}scale(e,t){return this.premultiply(Qc.makeScale(e,t)),this}rotate(e){return this.premultiply(Qc.makeRotation(-e)),this}translate(e,t){return this.premultiply(Qc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Qc=new Qe;function Gm(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function yo(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Sv(){let n=yo("canvas");return n.style.display="block",n}var wp={};function lo(n){n in wp||(wp[n]=!0,console.warn(n))}function bv(n,e,t){return new Promise(function(i,r){function a(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(a,t);break;default:i()}}setTimeout(a,t)})}function wv(n){let e=n.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Av(n){let e=n.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}var gt={enabled:!0,workingColorSpace:wa,spaces:{},convert:function(n,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===Et&&(n.r=Hi(n.r),n.g=Hi(n.g),n.b=Hi(n.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(n.applyMatrix3(this.spaces[e].toXYZ),n.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===Et&&(n.r=pa(n.r),n.g=pa(n.g),n.b=pa(n.b))),n},fromWorkingColorSpace:function(n,e){return this.convert(n,this.workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===er?zl:this.spaces[n].transfer},getLuminanceCoefficients:function(n,e=this.workingColorSpace){return n.fromArray(this.spaces[e].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,e,t){return n.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}};function Hi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function pa(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var Ap=[.64,.33,.3,.6,.15,.06],Ep=[.2126,.7152,.0722],Tp=[.3127,.329],Cp=new Qe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Rp=new Qe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);gt.define({[wa]:{primaries:Ap,whitePoint:Tp,transfer:zl,toXYZ:Cp,fromXYZ:Rp,luminanceCoefficients:Ep,workingColorSpaceConfig:{unpackColorSpace:zt},outputColorSpaceConfig:{drawingBufferColorSpace:zt}},[zt]:{primaries:Ap,whitePoint:Tp,transfer:Et,toXYZ:Cp,fromXYZ:Rp,luminanceCoefficients:Ep,outputColorSpaceConfig:{drawingBufferColorSpace:zt}}});var Yr,vd=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Yr===void 0&&(Yr=yo("canvas")),Yr.width=e.width,Yr.height=e.height;let i=Yr.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=Yr}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=yo("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let r=i.getImageData(0,0,e.width,e.height),a=r.data;for(let o=0;o<a.length;o++)a[o]=Hi(a[o]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Hi(t[i]/255)*255):t[i]=Hi(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Ev=0,fl=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ev++}),this.uuid=yi(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let a;if(Array.isArray(r)){a=[];for(let o=0,s=r.length;o<s;o++)r[o].isDataTexture?a.push(eu(r[o].image)):a.push(eu(r[o]))}else a=eu(r);i.url=a}return t||(e.images[this.uuid]=i),i}};function eu(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?vd.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Tv=0,En=class n extends ar{constructor(e=n.DEFAULT_IMAGE,t=n.DEFAULT_MAPPING,i=Cr,r=Cr,a=vi,o=Rr,s=ri,l=Vi,u=n.DEFAULT_ANISOTROPY,c=er){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Tv++}),this.uuid=yi(),this.name="",this.source=new fl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=a,this.minFilter=o,this.anisotropy=u,this.format=s,this.internalFormat=null,this.type=l,this.offset=new Le(0,0),this.repeat=new Le(1,1),this.center=new Le(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Qe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=c,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Pm)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Vu:e.x=e.x-Math.floor(e.x);break;case Cr:e.x=e.x<0?0:1;break;case Gu:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Vu:e.y=e.y-Math.floor(e.y);break;case Cr:e.y=e.y<0?0:1;break;case Gu:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};En.DEFAULT_IMAGE=null;En.DEFAULT_MAPPING=Pm;En.DEFAULT_ANISOTROPY=1;var Ht=class n{constructor(e=0,t=0,i=0,r=1){n.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,a=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r+o[12]*a,this.y=o[1]*t+o[5]*i+o[9]*r+o[13]*a,this.z=o[2]*t+o[6]*i+o[10]*r+o[14]*a,this.w=o[3]*t+o[7]*i+o[11]*r+o[15]*a,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,a,l=e.elements,u=l[0],c=l[4],d=l[8],f=l[1],h=l[5],m=l[9],x=l[2],g=l[6],p=l[10];if(Math.abs(c-f)<.01&&Math.abs(d-x)<.01&&Math.abs(m-g)<.01){if(Math.abs(c+f)<.1&&Math.abs(d+x)<.1&&Math.abs(m+g)<.1&&Math.abs(u+h+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let _=(u+1)/2,v=(h+1)/2,I=(p+1)/2,E=(c+f)/4,P=(d+x)/4,L=(m+g)/4;return _>v&&_>I?_<.01?(i=0,r=.707106781,a=.707106781):(i=Math.sqrt(_),r=E/i,a=P/i):v>I?v<.01?(i=.707106781,r=0,a=.707106781):(r=Math.sqrt(v),i=E/r,a=L/r):I<.01?(i=.707106781,r=.707106781,a=0):(a=Math.sqrt(I),i=P/a,r=L/a),this.set(i,r,a,t),this}let y=Math.sqrt((g-m)*(g-m)+(d-x)*(d-x)+(f-c)*(f-c));return Math.abs(y)<.001&&(y=1),this.x=(g-m)/y,this.y=(d-x)/y,this.z=(f-c)/y,this.w=Math.acos((u+h+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},yd=class extends ar{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Ht(0,0,e,t),this.scissorTest=!1,this.viewport=new Ht(0,0,e,t);let r={width:e,height:t,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:vi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);let a=new En(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);a.flipY=!1,a.generateMipmaps=i.generateMipmaps,a.internalFormat=i.internalFormat,this.textures=[];let o=i.count;for(let s=0;s<o;s++)this.textures[s]=a.clone(),this.textures[s].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,a=this.textures.length;r<a;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,r=e.textures.length;i<r;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new fl(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Gi=class extends yd{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},hl=class extends En{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=ai,this.minFilter=ai,this.wrapR=Cr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var _d=class extends En{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=ai,this.minFilter=ai,this.wrapR=Cr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var oi=class{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,a,o,s){let l=i[r+0],u=i[r+1],c=i[r+2],d=i[r+3],f=a[o+0],h=a[o+1],m=a[o+2],x=a[o+3];if(s===0){e[t+0]=l,e[t+1]=u,e[t+2]=c,e[t+3]=d;return}if(s===1){e[t+0]=f,e[t+1]=h,e[t+2]=m,e[t+3]=x;return}if(d!==x||l!==f||u!==h||c!==m){let g=1-s,p=l*f+u*h+c*m+d*x,y=p>=0?1:-1,_=1-p*p;if(_>Number.EPSILON){let I=Math.sqrt(_),E=Math.atan2(I,p*y);g=Math.sin(g*E)/I,s=Math.sin(s*E)/I}let v=s*y;if(l=l*g+f*v,u=u*g+h*v,c=c*g+m*v,d=d*g+x*v,g===1-s){let I=1/Math.sqrt(l*l+u*u+c*c+d*d);l*=I,u*=I,c*=I,d*=I}}e[t]=l,e[t+1]=u,e[t+2]=c,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,r,a,o){let s=i[r],l=i[r+1],u=i[r+2],c=i[r+3],d=a[o],f=a[o+1],h=a[o+2],m=a[o+3];return e[t]=s*m+c*d+l*h-u*f,e[t+1]=l*m+c*f+u*d-s*h,e[t+2]=u*m+c*h+s*f-l*d,e[t+3]=c*m-s*d-l*f-u*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,r=e._y,a=e._z,o=e._order,s=Math.cos,l=Math.sin,u=s(i/2),c=s(r/2),d=s(a/2),f=l(i/2),h=l(r/2),m=l(a/2);switch(o){case"XYZ":this._x=f*c*d+u*h*m,this._y=u*h*d-f*c*m,this._z=u*c*m+f*h*d,this._w=u*c*d-f*h*m;break;case"YXZ":this._x=f*c*d+u*h*m,this._y=u*h*d-f*c*m,this._z=u*c*m-f*h*d,this._w=u*c*d+f*h*m;break;case"ZXY":this._x=f*c*d-u*h*m,this._y=u*h*d+f*c*m,this._z=u*c*m+f*h*d,this._w=u*c*d-f*h*m;break;case"ZYX":this._x=f*c*d-u*h*m,this._y=u*h*d+f*c*m,this._z=u*c*m-f*h*d,this._w=u*c*d+f*h*m;break;case"YZX":this._x=f*c*d+u*h*m,this._y=u*h*d+f*c*m,this._z=u*c*m-f*h*d,this._w=u*c*d-f*h*m;break;case"XZY":this._x=f*c*d-u*h*m,this._y=u*h*d-f*c*m,this._z=u*c*m+f*h*d,this._w=u*c*d+f*h*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],r=t[4],a=t[8],o=t[1],s=t[5],l=t[9],u=t[2],c=t[6],d=t[10],f=i+s+d;if(f>0){let h=.5/Math.sqrt(f+1);this._w=.25/h,this._x=(c-l)*h,this._y=(a-u)*h,this._z=(o-r)*h}else if(i>s&&i>d){let h=2*Math.sqrt(1+i-s-d);this._w=(c-l)/h,this._x=.25*h,this._y=(r+o)/h,this._z=(a+u)/h}else if(s>d){let h=2*Math.sqrt(1+s-i-d);this._w=(a-u)/h,this._x=(r+o)/h,this._y=.25*h,this._z=(l+c)/h}else{let h=2*Math.sqrt(1+d-i-s);this._w=(o-r)/h,this._x=(a+u)/h,this._y=(l+c)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(on(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,r=e._y,a=e._z,o=e._w,s=t._x,l=t._y,u=t._z,c=t._w;return this._x=i*c+o*s+r*u-a*l,this._y=r*c+o*l+a*s-i*u,this._z=a*c+o*u+i*l-r*s,this._w=o*c-i*s-r*l-a*u,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let i=this._x,r=this._y,a=this._z,o=this._w,s=o*e._w+i*e._x+r*e._y+a*e._z;if(s<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,s=-s):this.copy(e),s>=1)return this._w=o,this._x=i,this._y=r,this._z=a,this;let l=1-s*s;if(l<=Number.EPSILON){let h=1-t;return this._w=h*o+t*this._w,this._x=h*i+t*this._x,this._y=h*r+t*this._y,this._z=h*a+t*this._z,this.normalize(),this}let u=Math.sqrt(l),c=Math.atan2(u,s),d=Math.sin((1-t)*c)/u,f=Math.sin(t*c)/u;return this._w=o*d+this._w*f,this._x=i*d+this._x*f,this._y=r*d+this._y*f,this._z=a*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),a=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),a*Math.sin(t),a*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},z=class n{constructor(e=0,t=0,i=0){n.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Pp.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Pp.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,r=this.z,a=e.elements;return this.x=a[0]*t+a[3]*i+a[6]*r,this.y=a[1]*t+a[4]*i+a[7]*r,this.z=a[2]*t+a[5]*i+a[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,a=e.elements,o=1/(a[3]*t+a[7]*i+a[11]*r+a[15]);return this.x=(a[0]*t+a[4]*i+a[8]*r+a[12])*o,this.y=(a[1]*t+a[5]*i+a[9]*r+a[13])*o,this.z=(a[2]*t+a[6]*i+a[10]*r+a[14])*o,this}applyQuaternion(e){let t=this.x,i=this.y,r=this.z,a=e.x,o=e.y,s=e.z,l=e.w,u=2*(o*r-s*i),c=2*(s*t-a*r),d=2*(a*i-o*t);return this.x=t+l*u+o*d-s*c,this.y=i+l*c+s*u-a*d,this.z=r+l*d+a*c-o*u,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,r=this.z,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r,this.y=a[1]*t+a[5]*i+a[9]*r,this.z=a[2]*t+a[6]*i+a[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,r=e.y,a=e.z,o=t.x,s=t.y,l=t.z;return this.x=r*l-a*s,this.y=a*o-i*l,this.z=i*s-r*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return tu.copy(this).projectOnVector(e),this.sub(tu)}reflect(e){return this.sub(tu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(on(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},tu=new z,Pp=new oi,Ir=class{constructor(e=new z(1/0,1/0,1/0),t=new z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Qn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Qn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=Qn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let a=i.getAttribute("position");if(t===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let o=0,s=a.count;o<s;o++)e.isMesh===!0?e.getVertexPosition(o,Qn):Qn.fromBufferAttribute(a,o),Qn.applyMatrix4(e.matrixWorld),this.expandByPoint(Qn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ts.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ts.copy(i.boundingBox)),Ts.applyMatrix4(e.matrixWorld),this.union(Ts)}let r=e.children;for(let a=0,o=r.length;a<o;a++)this.expandByObject(r[a],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Qn),Qn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(eo),Cs.subVectors(this.max,eo),Zr.subVectors(e.a,eo),Kr.subVectors(e.b,eo),$r.subVectors(e.c,eo),Zi.subVectors(Kr,Zr),Ki.subVectors($r,Kr),yr.subVectors(Zr,$r);let t=[0,-Zi.z,Zi.y,0,-Ki.z,Ki.y,0,-yr.z,yr.y,Zi.z,0,-Zi.x,Ki.z,0,-Ki.x,yr.z,0,-yr.x,-Zi.y,Zi.x,0,-Ki.y,Ki.x,0,-yr.y,yr.x,0];return!nu(t,Zr,Kr,$r,Cs)||(t=[1,0,0,0,1,0,0,0,1],!nu(t,Zr,Kr,$r,Cs))?!1:(Rs.crossVectors(Zi,Ki),t=[Rs.x,Rs.y,Rs.z],nu(t,Zr,Kr,$r,Cs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Qn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Qn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Li[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Li[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Li[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Li[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Li[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Li[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Li[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Li[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Li),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},Li=[new z,new z,new z,new z,new z,new z,new z,new z],Qn=new z,Ts=new Ir,Zr=new z,Kr=new z,$r=new z,Zi=new z,Ki=new z,yr=new z,eo=new z,Cs=new z,Rs=new z,_r=new z;function nu(n,e,t,i,r){for(let a=0,o=n.length-3;a<=o;a+=3){_r.fromArray(n,a);let s=r.x*Math.abs(_r.x)+r.y*Math.abs(_r.y)+r.z*Math.abs(_r.z),l=e.dot(_r),u=t.dot(_r),c=i.dot(_r);if(Math.max(-Math.max(l,u,c),Math.min(l,u,c))>s)return!1}return!0}var Cv=new Ir,to=new z,iu=new z,Lr=class{constructor(e=new z,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):Cv.setFromPoints(e).getCenter(i);let r=0;for(let a=0,o=e.length;a<o;a++)r=Math.max(r,i.distanceToSquared(e[a]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;to.subVectors(e,this.center);let t=to.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(to,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(iu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(to.copy(e.center).add(iu)),this.expandByPoint(to.copy(e.center).sub(iu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},Di=new z,ru=new z,Ps=new z,$i=new z,au=new z,Is=new z,ou=new z,_o=class{constructor(e=new z,t=new z(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Di)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Di.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Di.copy(this.origin).addScaledVector(this.direction,t),Di.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){ru.copy(e).add(t).multiplyScalar(.5),Ps.copy(t).sub(e).normalize(),$i.copy(this.origin).sub(ru);let a=e.distanceTo(t)*.5,o=-this.direction.dot(Ps),s=$i.dot(this.direction),l=-$i.dot(Ps),u=$i.lengthSq(),c=Math.abs(1-o*o),d,f,h,m;if(c>0)if(d=o*l-s,f=o*s-l,m=a*c,d>=0)if(f>=-m)if(f<=m){let x=1/c;d*=x,f*=x,h=d*(d+o*f+2*s)+f*(o*d+f+2*l)+u}else f=a,d=Math.max(0,-(o*f+s)),h=-d*d+f*(f+2*l)+u;else f=-a,d=Math.max(0,-(o*f+s)),h=-d*d+f*(f+2*l)+u;else f<=-m?(d=Math.max(0,-(-o*a+s)),f=d>0?-a:Math.min(Math.max(-a,-l),a),h=-d*d+f*(f+2*l)+u):f<=m?(d=0,f=Math.min(Math.max(-a,-l),a),h=f*(f+2*l)+u):(d=Math.max(0,-(o*a+s)),f=d>0?a:Math.min(Math.max(-a,-l),a),h=-d*d+f*(f+2*l)+u);else f=o>0?-a:a,d=Math.max(0,-(o*f+s)),h=-d*d+f*(f+2*l)+u;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(ru).addScaledVector(Ps,f),h}intersectSphere(e,t){Di.subVectors(e.center,this.origin);let i=Di.dot(this.direction),r=Di.dot(Di)-i*i,a=e.radius*e.radius;if(r>a)return null;let o=Math.sqrt(a-r),s=i-o,l=i+o;return l<0?null:s<0?this.at(l,t):this.at(s,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,a,o,s,l,u=1/this.direction.x,c=1/this.direction.y,d=1/this.direction.z,f=this.origin;return u>=0?(i=(e.min.x-f.x)*u,r=(e.max.x-f.x)*u):(i=(e.max.x-f.x)*u,r=(e.min.x-f.x)*u),c>=0?(a=(e.min.y-f.y)*c,o=(e.max.y-f.y)*c):(a=(e.max.y-f.y)*c,o=(e.min.y-f.y)*c),i>o||a>r||((a>i||isNaN(i))&&(i=a),(o<r||isNaN(r))&&(r=o),d>=0?(s=(e.min.z-f.z)*d,l=(e.max.z-f.z)*d):(s=(e.max.z-f.z)*d,l=(e.min.z-f.z)*d),i>l||s>r)||((s>i||i!==i)&&(i=s),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Di)!==null}intersectTriangle(e,t,i,r,a){au.subVectors(t,e),Is.subVectors(i,e),ou.crossVectors(au,Is);let o=this.direction.dot(ou),s;if(o>0){if(r)return null;s=1}else if(o<0)s=-1,o=-o;else return null;$i.subVectors(this.origin,e);let l=s*this.direction.dot(Is.crossVectors($i,Is));if(l<0)return null;let u=s*this.direction.dot(au.cross($i));if(u<0||l+u>o)return null;let c=-s*$i.dot(ou);return c<0?null:this.at(c/o,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},wt=class n{constructor(e,t,i,r,a,o,s,l,u,c,d,f,h,m,x,g){n.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,a,o,s,l,u,c,d,f,h,m,x,g)}set(e,t,i,r,a,o,s,l,u,c,d,f,h,m,x,g){let p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=r,p[1]=a,p[5]=o,p[9]=s,p[13]=l,p[2]=u,p[6]=c,p[10]=d,p[14]=f,p[3]=h,p[7]=m,p[11]=x,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,i=e.elements,r=1/Jr.setFromMatrixColumn(e,0).length(),a=1/Jr.setFromMatrixColumn(e,1).length(),o=1/Jr.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*a,t[5]=i[5]*a,t[6]=i[6]*a,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,r=e.y,a=e.z,o=Math.cos(i),s=Math.sin(i),l=Math.cos(r),u=Math.sin(r),c=Math.cos(a),d=Math.sin(a);if(e.order==="XYZ"){let f=o*c,h=o*d,m=s*c,x=s*d;t[0]=l*c,t[4]=-l*d,t[8]=u,t[1]=h+m*u,t[5]=f-x*u,t[9]=-s*l,t[2]=x-f*u,t[6]=m+h*u,t[10]=o*l}else if(e.order==="YXZ"){let f=l*c,h=l*d,m=u*c,x=u*d;t[0]=f+x*s,t[4]=m*s-h,t[8]=o*u,t[1]=o*d,t[5]=o*c,t[9]=-s,t[2]=h*s-m,t[6]=x+f*s,t[10]=o*l}else if(e.order==="ZXY"){let f=l*c,h=l*d,m=u*c,x=u*d;t[0]=f-x*s,t[4]=-o*d,t[8]=m+h*s,t[1]=h+m*s,t[5]=o*c,t[9]=x-f*s,t[2]=-o*u,t[6]=s,t[10]=o*l}else if(e.order==="ZYX"){let f=o*c,h=o*d,m=s*c,x=s*d;t[0]=l*c,t[4]=m*u-h,t[8]=f*u+x,t[1]=l*d,t[5]=x*u+f,t[9]=h*u-m,t[2]=-u,t[6]=s*l,t[10]=o*l}else if(e.order==="YZX"){let f=o*l,h=o*u,m=s*l,x=s*u;t[0]=l*c,t[4]=x-f*d,t[8]=m*d+h,t[1]=d,t[5]=o*c,t[9]=-s*c,t[2]=-u*c,t[6]=h*d+m,t[10]=f-x*d}else if(e.order==="XZY"){let f=o*l,h=o*u,m=s*l,x=s*u;t[0]=l*c,t[4]=-d,t[8]=u*c,t[1]=f*d+x,t[5]=o*c,t[9]=h*d-m,t[2]=m*d-h,t[6]=s*c,t[10]=x*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Rv,e,Pv)}lookAt(e,t,i){let r=this.elements;return Un.subVectors(e,t),Un.lengthSq()===0&&(Un.z=1),Un.normalize(),Ji.crossVectors(i,Un),Ji.lengthSq()===0&&(Math.abs(i.z)===1?Un.x+=1e-4:Un.z+=1e-4,Un.normalize(),Ji.crossVectors(i,Un)),Ji.normalize(),Ls.crossVectors(Un,Ji),r[0]=Ji.x,r[4]=Ls.x,r[8]=Un.x,r[1]=Ji.y,r[5]=Ls.y,r[9]=Un.y,r[2]=Ji.z,r[6]=Ls.z,r[10]=Un.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,a=this.elements,o=i[0],s=i[4],l=i[8],u=i[12],c=i[1],d=i[5],f=i[9],h=i[13],m=i[2],x=i[6],g=i[10],p=i[14],y=i[3],_=i[7],v=i[11],I=i[15],E=r[0],P=r[4],L=r[8],b=r[12],S=r[1],T=r[5],B=r[9],F=r[13],G=r[2],U=r[6],N=r[10],te=r[14],D=r[3],k=r[7],J=r[11],$=r[15];return a[0]=o*E+s*S+l*G+u*D,a[4]=o*P+s*T+l*U+u*k,a[8]=o*L+s*B+l*N+u*J,a[12]=o*b+s*F+l*te+u*$,a[1]=c*E+d*S+f*G+h*D,a[5]=c*P+d*T+f*U+h*k,a[9]=c*L+d*B+f*N+h*J,a[13]=c*b+d*F+f*te+h*$,a[2]=m*E+x*S+g*G+p*D,a[6]=m*P+x*T+g*U+p*k,a[10]=m*L+x*B+g*N+p*J,a[14]=m*b+x*F+g*te+p*$,a[3]=y*E+_*S+v*G+I*D,a[7]=y*P+_*T+v*U+I*k,a[11]=y*L+_*B+v*N+I*J,a[15]=y*b+_*F+v*te+I*$,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],r=e[8],a=e[12],o=e[1],s=e[5],l=e[9],u=e[13],c=e[2],d=e[6],f=e[10],h=e[14],m=e[3],x=e[7],g=e[11],p=e[15];return m*(+a*l*d-r*u*d-a*s*f+i*u*f+r*s*h-i*l*h)+x*(+t*l*h-t*u*f+a*o*f-r*o*h+r*u*c-a*l*c)+g*(+t*u*d-t*s*h-a*o*d+i*o*h+a*s*c-i*u*c)+p*(-r*s*c-t*l*d+t*s*f+r*o*d-i*o*f+i*l*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],a=e[3],o=e[4],s=e[5],l=e[6],u=e[7],c=e[8],d=e[9],f=e[10],h=e[11],m=e[12],x=e[13],g=e[14],p=e[15],y=d*g*u-x*f*u+x*l*h-s*g*h-d*l*p+s*f*p,_=m*f*u-c*g*u-m*l*h+o*g*h+c*l*p-o*f*p,v=c*x*u-m*d*u+m*s*h-o*x*h-c*s*p+o*d*p,I=m*d*l-c*x*l-m*s*f+o*x*f+c*s*g-o*d*g,E=t*y+i*_+r*v+a*I;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let P=1/E;return e[0]=y*P,e[1]=(x*f*a-d*g*a-x*r*h+i*g*h+d*r*p-i*f*p)*P,e[2]=(s*g*a-x*l*a+x*r*u-i*g*u-s*r*p+i*l*p)*P,e[3]=(d*l*a-s*f*a-d*r*u+i*f*u+s*r*h-i*l*h)*P,e[4]=_*P,e[5]=(c*g*a-m*f*a+m*r*h-t*g*h-c*r*p+t*f*p)*P,e[6]=(m*l*a-o*g*a-m*r*u+t*g*u+o*r*p-t*l*p)*P,e[7]=(o*f*a-c*l*a+c*r*u-t*f*u-o*r*h+t*l*h)*P,e[8]=v*P,e[9]=(m*d*a-c*x*a-m*i*h+t*x*h+c*i*p-t*d*p)*P,e[10]=(o*x*a-m*s*a+m*i*u-t*x*u-o*i*p+t*s*p)*P,e[11]=(c*s*a-o*d*a-c*i*u+t*d*u+o*i*h-t*s*h)*P,e[12]=I*P,e[13]=(c*x*r-m*d*r+m*i*f-t*x*f-c*i*g+t*d*g)*P,e[14]=(m*s*r-o*x*r-m*i*l+t*x*l+o*i*g-t*s*g)*P,e[15]=(o*d*r-c*s*r+c*i*l-t*d*l-o*i*f+t*s*f)*P,this}scale(e){let t=this.elements,i=e.x,r=e.y,a=e.z;return t[0]*=i,t[4]*=r,t[8]*=a,t[1]*=i,t[5]*=r,t[9]*=a,t[2]*=i,t[6]*=r,t[10]*=a,t[3]*=i,t[7]*=r,t[11]*=a,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),r=Math.sin(t),a=1-i,o=e.x,s=e.y,l=e.z,u=a*o,c=a*s;return this.set(u*o+i,u*s-r*l,u*l+r*s,0,u*s+r*l,c*s+i,c*l-r*o,0,u*l-r*s,c*l+r*o,a*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,a,o){return this.set(1,i,a,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){let r=this.elements,a=t._x,o=t._y,s=t._z,l=t._w,u=a+a,c=o+o,d=s+s,f=a*u,h=a*c,m=a*d,x=o*c,g=o*d,p=s*d,y=l*u,_=l*c,v=l*d,I=i.x,E=i.y,P=i.z;return r[0]=(1-(x+p))*I,r[1]=(h+v)*I,r[2]=(m-_)*I,r[3]=0,r[4]=(h-v)*E,r[5]=(1-(f+p))*E,r[6]=(g+y)*E,r[7]=0,r[8]=(m+_)*P,r[9]=(g-y)*P,r[10]=(1-(f+x))*P,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){let r=this.elements,a=Jr.set(r[0],r[1],r[2]).length(),o=Jr.set(r[4],r[5],r[6]).length(),s=Jr.set(r[8],r[9],r[10]).length();this.determinant()<0&&(a=-a),e.x=r[12],e.y=r[13],e.z=r[14],ei.copy(this);let u=1/a,c=1/o,d=1/s;return ei.elements[0]*=u,ei.elements[1]*=u,ei.elements[2]*=u,ei.elements[4]*=c,ei.elements[5]*=c,ei.elements[6]*=c,ei.elements[8]*=d,ei.elements[9]*=d,ei.elements[10]*=d,t.setFromRotationMatrix(ei),i.x=a,i.y=o,i.z=s,this}makePerspective(e,t,i,r,a,o,s=zi){let l=this.elements,u=2*a/(t-e),c=2*a/(i-r),d=(t+e)/(t-e),f=(i+r)/(i-r),h,m;if(s===zi)h=-(o+a)/(o-a),m=-2*o*a/(o-a);else if(s===dl)h=-o/(o-a),m=-o*a/(o-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+s);return l[0]=u,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=c,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=h,l[14]=m,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,a,o,s=zi){let l=this.elements,u=1/(t-e),c=1/(i-r),d=1/(o-a),f=(t+e)*u,h=(i+r)*c,m,x;if(s===zi)m=(o+a)*d,x=-2*d;else if(s===dl)m=a*d,x=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+s);return l[0]=2*u,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*c,l[9]=0,l[13]=-h,l[2]=0,l[6]=0,l[10]=x,l[14]=-m,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}},Jr=new z,ei=new wt,Rv=new z(0,0,0),Pv=new z(1,1,1),Ji=new z,Ls=new z,Un=new z,Ip=new wt,Lp=new oi,_i=class n{constructor(e=0,t=0,i=0,r=n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){let r=e.elements,a=r[0],o=r[4],s=r[8],l=r[1],u=r[5],c=r[9],d=r[2],f=r[6],h=r[10];switch(t){case"XYZ":this._y=Math.asin(on(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-c,h),this._z=Math.atan2(-o,a)):(this._x=Math.atan2(f,u),this._z=0);break;case"YXZ":this._x=Math.asin(-on(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(s,h),this._z=Math.atan2(l,u)):(this._y=Math.atan2(-d,a),this._z=0);break;case"ZXY":this._x=Math.asin(on(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,h),this._z=Math.atan2(-o,u)):(this._y=0,this._z=Math.atan2(l,a));break;case"ZYX":this._y=Math.asin(-on(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,h),this._z=Math.atan2(l,a)):(this._x=0,this._z=Math.atan2(-o,u));break;case"YZX":this._z=Math.asin(on(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-c,u),this._y=Math.atan2(-d,a)):(this._x=0,this._y=Math.atan2(s,h));break;case"XZY":this._z=Math.asin(-on(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,u),this._y=Math.atan2(s,a)):(this._x=Math.atan2(-c,h),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Ip.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ip,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Lp.setFromEuler(this),this.setFromQuaternion(Lp,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};_i.DEFAULT_ORDER="XYZ";var pl=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Iv=0,Dp=new z,jr=new oi,Ui=new wt,Ds=new z,no=new z,Lv=new z,Dv=new oi,Up=new z(1,0,0),Np=new z(0,1,0),Fp=new z(0,0,1),Op={type:"added"},Uv={type:"removed"},Qr={type:"childadded",child:null},su={type:"childremoved",child:null},en=class n extends ar{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Iv++}),this.uuid=yi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let e=new z,t=new _i,i=new oi,r=new z(1,1,1);function a(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(a),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new wt},normalMatrix:{value:new Qe}}),this.matrix=new wt,this.matrixWorld=new wt,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new pl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return jr.setFromAxisAngle(e,t),this.quaternion.multiply(jr),this}rotateOnWorldAxis(e,t){return jr.setFromAxisAngle(e,t),this.quaternion.premultiply(jr),this}rotateX(e){return this.rotateOnAxis(Up,e)}rotateY(e){return this.rotateOnAxis(Np,e)}rotateZ(e){return this.rotateOnAxis(Fp,e)}translateOnAxis(e,t){return Dp.copy(e).applyQuaternion(this.quaternion),this.position.add(Dp.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Up,e)}translateY(e){return this.translateOnAxis(Np,e)}translateZ(e){return this.translateOnAxis(Fp,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ui.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Ds.copy(e):Ds.set(e,t,i);let r=this.parent;this.updateWorldMatrix(!0,!1),no.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ui.lookAt(no,Ds,this.up):Ui.lookAt(Ds,no,this.up),this.quaternion.setFromRotationMatrix(Ui),r&&(Ui.extractRotation(r.matrixWorld),jr.setFromRotationMatrix(Ui),this.quaternion.premultiply(jr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Op),Qr.child=e,this.dispatchEvent(Qr),Qr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Uv),su.child=e,this.dispatchEvent(su),su.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ui.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ui.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ui),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Op),Qr.child=e,this.dispatchEvent(Qr),Qr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){let o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(no,e,Lv),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(no,Dv,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){let i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(s=>({boxInitialized:s.boxInitialized,boxMin:s.box.min.toArray(),boxMax:s.box.max.toArray(),sphereInitialized:s.sphereInitialized,sphereRadius:s.sphere.radius,sphereCenter:s.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function a(s,l){return s[l.uuid]===void 0&&(s[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=a(e.geometries,this.geometry);let s=this.geometry.parameters;if(s!==void 0&&s.shapes!==void 0){let l=s.shapes;if(Array.isArray(l))for(let u=0,c=l.length;u<c;u++){let d=l[u];a(e.shapes,d)}else a(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let s=[];for(let l=0,u=this.material.length;l<u;l++)s.push(a(e.materials,this.material[l]));r.material=s}else r.material=a(e.materials,this.material);if(this.children.length>0){r.children=[];for(let s=0;s<this.children.length;s++)r.children.push(this.children[s].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let s=0;s<this.animations.length;s++){let l=this.animations[s];r.animations.push(a(e.animations,l))}}if(t){let s=o(e.geometries),l=o(e.materials),u=o(e.textures),c=o(e.images),d=o(e.shapes),f=o(e.skeletons),h=o(e.animations),m=o(e.nodes);s.length>0&&(i.geometries=s),l.length>0&&(i.materials=l),u.length>0&&(i.textures=u),c.length>0&&(i.images=c),d.length>0&&(i.shapes=d),f.length>0&&(i.skeletons=f),h.length>0&&(i.animations=h),m.length>0&&(i.nodes=m)}return i.object=r,i;function o(s){let l=[];for(let u in s){let c=s[u];delete c.metadata,l.push(c)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){let r=e.children[i];this.add(r.clone())}return this}};en.DEFAULT_UP=new z(0,1,0);en.DEFAULT_MATRIX_AUTO_UPDATE=!0;en.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var ti=new z,Ni=new z,lu=new z,Fi=new z,ea=new z,ta=new z,Bp=new z,cu=new z,uu=new z,du=new z,fu=new Ht,hu=new Ht,pu=new Ht,tr=class n{constructor(e=new z,t=new z,i=new z){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),ti.subVectors(e,t),r.cross(ti);let a=r.lengthSq();return a>0?r.multiplyScalar(1/Math.sqrt(a)):r.set(0,0,0)}static getBarycoord(e,t,i,r,a){ti.subVectors(r,t),Ni.subVectors(i,t),lu.subVectors(e,t);let o=ti.dot(ti),s=ti.dot(Ni),l=ti.dot(lu),u=Ni.dot(Ni),c=Ni.dot(lu),d=o*u-s*s;if(d===0)return a.set(0,0,0),null;let f=1/d,h=(u*l-s*c)*f,m=(o*c-s*l)*f;return a.set(1-h-m,m,h)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Fi)===null?!1:Fi.x>=0&&Fi.y>=0&&Fi.x+Fi.y<=1}static getInterpolation(e,t,i,r,a,o,s,l){return this.getBarycoord(e,t,i,r,Fi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(a,Fi.x),l.addScaledVector(o,Fi.y),l.addScaledVector(s,Fi.z),l)}static getInterpolatedAttribute(e,t,i,r,a,o){return fu.setScalar(0),hu.setScalar(0),pu.setScalar(0),fu.fromBufferAttribute(e,t),hu.fromBufferAttribute(e,i),pu.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(fu,a.x),o.addScaledVector(hu,a.y),o.addScaledVector(pu,a.z),o}static isFrontFacing(e,t,i,r){return ti.subVectors(i,t),Ni.subVectors(e,t),ti.cross(Ni).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ti.subVectors(this.c,this.b),Ni.subVectors(this.a,this.b),ti.cross(Ni).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,a){return n.getInterpolation(e,this.a,this.b,this.c,t,i,r,a)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,r=this.b,a=this.c,o,s;ea.subVectors(r,i),ta.subVectors(a,i),cu.subVectors(e,i);let l=ea.dot(cu),u=ta.dot(cu);if(l<=0&&u<=0)return t.copy(i);uu.subVectors(e,r);let c=ea.dot(uu),d=ta.dot(uu);if(c>=0&&d<=c)return t.copy(r);let f=l*d-c*u;if(f<=0&&l>=0&&c<=0)return o=l/(l-c),t.copy(i).addScaledVector(ea,o);du.subVectors(e,a);let h=ea.dot(du),m=ta.dot(du);if(m>=0&&h<=m)return t.copy(a);let x=h*u-l*m;if(x<=0&&u>=0&&m<=0)return s=u/(u-m),t.copy(i).addScaledVector(ta,s);let g=c*m-h*d;if(g<=0&&d-c>=0&&h-m>=0)return Bp.subVectors(a,r),s=(d-c)/(d-c+(h-m)),t.copy(r).addScaledVector(Bp,s);let p=1/(g+x+f);return o=x*p,s=f*p,t.copy(i).addScaledVector(ea,o).addScaledVector(ta,s)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Wm={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ji={h:0,s:0,l:0},Us={h:0,s:0,l:0};function mu(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var Je=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=zt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,gt.toWorkingColorSpace(this,t),this}setRGB(e,t,i,r=gt.workingColorSpace){return this.r=e,this.g=t,this.b=i,gt.toWorkingColorSpace(this,r),this}setHSL(e,t,i,r=gt.workingColorSpace){if(e=uf(e,1),t=on(t,0,1),i=on(i,0,1),t===0)this.r=this.g=this.b=i;else{let a=i<=.5?i*(1+t):i+t-i*t,o=2*i-a;this.r=mu(o,a,e+1/3),this.g=mu(o,a,e),this.b=mu(o,a,e-1/3)}return gt.toWorkingColorSpace(this,r),this}setStyle(e,t=zt){function i(a){a!==void 0&&parseFloat(a)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let a,o=r[1],s=r[2];switch(o){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))return i(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,t);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))return i(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,t);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))return i(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let a=r[1],o=a.length;if(o===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(a,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=zt){let i=Wm[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Hi(e.r),this.g=Hi(e.g),this.b=Hi(e.b),this}copyLinearToSRGB(e){return this.r=pa(e.r),this.g=pa(e.g),this.b=pa(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=zt){return gt.fromWorkingColorSpace(un.copy(this),e),Math.round(on(un.r*255,0,255))*65536+Math.round(on(un.g*255,0,255))*256+Math.round(on(un.b*255,0,255))}getHexString(e=zt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=gt.workingColorSpace){gt.fromWorkingColorSpace(un.copy(this),t);let i=un.r,r=un.g,a=un.b,o=Math.max(i,r,a),s=Math.min(i,r,a),l,u,c=(s+o)/2;if(s===o)l=0,u=0;else{let d=o-s;switch(u=c<=.5?d/(o+s):d/(2-o-s),o){case i:l=(r-a)/d+(r<a?6:0);break;case r:l=(a-i)/d+2;break;case a:l=(i-r)/d+4;break}l/=6}return e.h=l,e.s=u,e.l=c,e}getRGB(e,t=gt.workingColorSpace){return gt.fromWorkingColorSpace(un.copy(this),t),e.r=un.r,e.g=un.g,e.b=un.b,e}getStyle(e=zt){gt.fromWorkingColorSpace(un.copy(this),e);let t=un.r,i=un.g,r=un.b;return e!==zt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(ji),this.setHSL(ji.h+e,ji.s+t,ji.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(ji),e.getHSL(Us);let i=fo(ji.h,Us.h,t),r=fo(ji.s,Us.s,t),a=fo(ji.l,Us.l,t);return this.setHSL(i,r,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,r=this.b,a=e.elements;return this.r=a[0]*t+a[3]*i+a[6]*r,this.g=a[1]*t+a[4]*i+a[7]*r,this.b=a[2]*t+a[5]*i+a[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},un=new Je;Je.NAMES=Wm;var Nv=0,Mi=class extends ar{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Nv++}),this.uuid=yi(),this.name="",this.blending=fa,this.side=rr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Iu,this.blendDst=Lu,this.blendEquation=Er,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Je(0,0,0),this.blendAlpha=0,this.depthFunc=ga,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Mp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Xr,this.stencilZFail=Xr,this.stencilZPass=Xr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==fa&&(i.blending=this.blending),this.side!==rr&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Iu&&(i.blendSrc=this.blendSrc),this.blendDst!==Lu&&(i.blendDst=this.blendDst),this.blendEquation!==Er&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==ga&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Mp&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Xr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Xr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Xr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(a){let o=[];for(let s in a){let l=a[s];delete l.metadata,o.push(l)}return o}if(t){let a=r(e.textures),o=r(e.images);a.length>0&&(i.textures=a),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let r=t.length;i=new Array(r);for(let a=0;a!==r;++a)i[a]=t[a].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},Vn=class extends Mi{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new Je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _i,this.combine=Rm,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var qt=new z,Ns=new Le,Fn=class{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=xd,this.updateRanges=[],this.gpuType=ki,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,a=this.itemSize;r<a;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Ns.fromBufferAttribute(this,t),Ns.applyMatrix3(e),this.setXY(t,Ns.x,Ns.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)qt.fromBufferAttribute(this,t),qt.applyMatrix3(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)qt.fromBufferAttribute(this,t),qt.applyMatrix4(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)qt.fromBufferAttribute(this,t),qt.applyNormalMatrix(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)qt.fromBufferAttribute(this,t),qt.transformDirection(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=ii(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=bt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ii(t,this.array)),t}setX(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ii(t,this.array)),t}setY(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ii(t,this.array)),t}setZ(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ii(t,this.array)),t}setW(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),i=bt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),i=bt(i,this.array),r=bt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,a){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),i=bt(i,this.array),r=bt(r,this.array),a=bt(a,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==xd&&(e.usage=this.usage),e}};var ml=class extends Fn{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var gl=class extends Fn{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var Tt=class extends Fn{constructor(e,t,i){super(new Float32Array(e),t,i)}},Fv=0,Hn=new wt,gu=new en,na=new z,Nn=new Ir,io=new Ir,jt=new z,Vt=class n extends ar{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Fv++}),this.uuid=yi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Gm(e)?gl:ml)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let a=new Qe().getNormalMatrix(e);i.applyNormalMatrix(a),i.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Hn.makeRotationFromQuaternion(e),this.applyMatrix4(Hn),this}rotateX(e){return Hn.makeRotationX(e),this.applyMatrix4(Hn),this}rotateY(e){return Hn.makeRotationY(e),this.applyMatrix4(Hn),this}rotateZ(e){return Hn.makeRotationZ(e),this.applyMatrix4(Hn),this}translate(e,t,i){return Hn.makeTranslation(e,t,i),this.applyMatrix4(Hn),this}scale(e,t,i){return Hn.makeScale(e,t,i),this.applyMatrix4(Hn),this}lookAt(e){return gu.lookAt(e),gu.updateMatrix(),this.applyMatrix4(gu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(na).negate(),this.translate(na.x,na.y,na.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let r=0,a=e.length;r<a;r++){let o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Tt(i,3))}else{for(let i=0,r=t.count;i<r;i++){let a=e[i];t.setXYZ(i,a.x,a.y,a.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ir);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new z(-1/0,-1/0,-1/0),new z(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){let a=t[i];Nn.setFromBufferAttribute(a),this.morphTargetsRelative?(jt.addVectors(this.boundingBox.min,Nn.min),this.boundingBox.expandByPoint(jt),jt.addVectors(this.boundingBox.max,Nn.max),this.boundingBox.expandByPoint(jt)):(this.boundingBox.expandByPoint(Nn.min),this.boundingBox.expandByPoint(Nn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Lr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new z,1/0);return}if(e){let i=this.boundingSphere.center;if(Nn.setFromBufferAttribute(e),t)for(let a=0,o=t.length;a<o;a++){let s=t[a];io.setFromBufferAttribute(s),this.morphTargetsRelative?(jt.addVectors(Nn.min,io.min),Nn.expandByPoint(jt),jt.addVectors(Nn.max,io.max),Nn.expandByPoint(jt)):(Nn.expandByPoint(io.min),Nn.expandByPoint(io.max))}Nn.getCenter(i);let r=0;for(let a=0,o=e.count;a<o;a++)jt.fromBufferAttribute(e,a),r=Math.max(r,i.distanceToSquared(jt));if(t)for(let a=0,o=t.length;a<o;a++){let s=t[a],l=this.morphTargetsRelative;for(let u=0,c=s.count;u<c;u++)jt.fromBufferAttribute(s,u),l&&(na.fromBufferAttribute(e,u),jt.add(na)),r=Math.max(r,i.distanceToSquared(jt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,r=t.normal,a=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Fn(new Float32Array(4*i.count),4));let o=this.getAttribute("tangent"),s=[],l=[];for(let L=0;L<i.count;L++)s[L]=new z,l[L]=new z;let u=new z,c=new z,d=new z,f=new Le,h=new Le,m=new Le,x=new z,g=new z;function p(L,b,S){u.fromBufferAttribute(i,L),c.fromBufferAttribute(i,b),d.fromBufferAttribute(i,S),f.fromBufferAttribute(a,L),h.fromBufferAttribute(a,b),m.fromBufferAttribute(a,S),c.sub(u),d.sub(u),h.sub(f),m.sub(f);let T=1/(h.x*m.y-m.x*h.y);isFinite(T)&&(x.copy(c).multiplyScalar(m.y).addScaledVector(d,-h.y).multiplyScalar(T),g.copy(d).multiplyScalar(h.x).addScaledVector(c,-m.x).multiplyScalar(T),s[L].add(x),s[b].add(x),s[S].add(x),l[L].add(g),l[b].add(g),l[S].add(g))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let L=0,b=y.length;L<b;++L){let S=y[L],T=S.start,B=S.count;for(let F=T,G=T+B;F<G;F+=3)p(e.getX(F+0),e.getX(F+1),e.getX(F+2))}let _=new z,v=new z,I=new z,E=new z;function P(L){I.fromBufferAttribute(r,L),E.copy(I);let b=s[L];_.copy(b),_.sub(I.multiplyScalar(I.dot(b))).normalize(),v.crossVectors(E,b);let T=v.dot(l[L])<0?-1:1;o.setXYZW(L,_.x,_.y,_.z,T)}for(let L=0,b=y.length;L<b;++L){let S=y[L],T=S.start,B=S.count;for(let F=T,G=T+B;F<G;F+=3)P(e.getX(F+0)),P(e.getX(F+1)),P(e.getX(F+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Fn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,h=i.count;f<h;f++)i.setXYZ(f,0,0,0);let r=new z,a=new z,o=new z,s=new z,l=new z,u=new z,c=new z,d=new z;if(e)for(let f=0,h=e.count;f<h;f+=3){let m=e.getX(f+0),x=e.getX(f+1),g=e.getX(f+2);r.fromBufferAttribute(t,m),a.fromBufferAttribute(t,x),o.fromBufferAttribute(t,g),c.subVectors(o,a),d.subVectors(r,a),c.cross(d),s.fromBufferAttribute(i,m),l.fromBufferAttribute(i,x),u.fromBufferAttribute(i,g),s.add(c),l.add(c),u.add(c),i.setXYZ(m,s.x,s.y,s.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(g,u.x,u.y,u.z)}else for(let f=0,h=t.count;f<h;f+=3)r.fromBufferAttribute(t,f+0),a.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),c.subVectors(o,a),d.subVectors(r,a),c.cross(d),i.setXYZ(f+0,c.x,c.y,c.z),i.setXYZ(f+1,c.x,c.y,c.z),i.setXYZ(f+2,c.x,c.y,c.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)jt.fromBufferAttribute(e,t),jt.normalize(),e.setXYZ(t,jt.x,jt.y,jt.z)}toNonIndexed(){function e(s,l){let u=s.array,c=s.itemSize,d=s.normalized,f=new u.constructor(l.length*c),h=0,m=0;for(let x=0,g=l.length;x<g;x++){s.isInterleavedBufferAttribute?h=l[x]*s.data.stride+s.offset:h=l[x]*c;for(let p=0;p<c;p++)f[m++]=u[h++]}return new Fn(f,c,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,r=this.attributes;for(let s in r){let l=r[s],u=e(l,i);t.setAttribute(s,u)}let a=this.morphAttributes;for(let s in a){let l=[],u=a[s];for(let c=0,d=u.length;c<d;c++){let f=u[c],h=e(f,i);l.push(h)}t.morphAttributes[s]=l}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let s=0,l=o.length;s<l;s++){let u=o[s];t.addGroup(u.start,u.count,u.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let u in l)l[u]!==void 0&&(e[u]=l[u]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let l in i){let u=i[l];e.data.attributes[l]=u.toJSON(e.data)}let r={},a=!1;for(let l in this.morphAttributes){let u=this.morphAttributes[l],c=[];for(let d=0,f=u.length;d<f;d++){let h=u[d];c.push(h.toJSON(e.data))}c.length>0&&(r[l]=c,a=!0)}a&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let s=this.boundingSphere;return s!==null&&(e.data.boundingSphere={center:s.center.toArray(),radius:s.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone(t));let r=e.attributes;for(let u in r){let c=r[u];this.setAttribute(u,c.clone(t))}let a=e.morphAttributes;for(let u in a){let c=[],d=a[u];for(let f=0,h=d.length;f<h;f++)c.push(d[f].clone(t));this.morphAttributes[u]=c}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let u=0,c=o.length;u<c;u++){let d=o[u];this.addGroup(d.start,d.count,d.materialIndex)}let s=e.boundingBox;s!==null&&(this.boundingBox=s.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},kp=new wt,Mr=new _o,Fs=new Lr,zp=new z,Os=new z,Bs=new z,ks=new z,xu=new z,zs=new z,Hp=new z,Hs=new z,Ft=class extends en{constructor(e=new Vt,t=new Vn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,o=r.length;a<o;a++){let s=r[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[s]=a}}}}getVertexPosition(e,t){let i=this.geometry,r=i.attributes.position,a=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(r,e);let s=this.morphTargetInfluences;if(a&&s){zs.set(0,0,0);for(let l=0,u=a.length;l<u;l++){let c=s[l],d=a[l];c!==0&&(xu.fromBufferAttribute(d,e),o?zs.addScaledVector(xu,c):zs.addScaledVector(xu.sub(t),c))}t.add(zs)}return t}raycast(e,t){let i=this.geometry,r=this.material,a=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Fs.copy(i.boundingSphere),Fs.applyMatrix4(a),Mr.copy(e.ray).recast(e.near),!(Fs.containsPoint(Mr.origin)===!1&&(Mr.intersectSphere(Fs,zp)===null||Mr.origin.distanceToSquared(zp)>(e.far-e.near)**2))&&(kp.copy(a).invert(),Mr.copy(e.ray).applyMatrix4(kp),!(i.boundingBox!==null&&Mr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Mr)))}_computeIntersections(e,t,i){let r,a=this.geometry,o=this.material,s=a.index,l=a.attributes.position,u=a.attributes.uv,c=a.attributes.uv1,d=a.attributes.normal,f=a.groups,h=a.drawRange;if(s!==null)if(Array.isArray(o))for(let m=0,x=f.length;m<x;m++){let g=f[m],p=o[g.materialIndex],y=Math.max(g.start,h.start),_=Math.min(s.count,Math.min(g.start+g.count,h.start+h.count));for(let v=y,I=_;v<I;v+=3){let E=s.getX(v),P=s.getX(v+1),L=s.getX(v+2);r=Vs(this,p,e,i,u,c,d,E,P,L),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{let m=Math.max(0,h.start),x=Math.min(s.count,h.start+h.count);for(let g=m,p=x;g<p;g+=3){let y=s.getX(g),_=s.getX(g+1),v=s.getX(g+2);r=Vs(this,o,e,i,u,c,d,y,_,v),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let m=0,x=f.length;m<x;m++){let g=f[m],p=o[g.materialIndex],y=Math.max(g.start,h.start),_=Math.min(l.count,Math.min(g.start+g.count,h.start+h.count));for(let v=y,I=_;v<I;v+=3){let E=v,P=v+1,L=v+2;r=Vs(this,p,e,i,u,c,d,E,P,L),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{let m=Math.max(0,h.start),x=Math.min(l.count,h.start+h.count);for(let g=m,p=x;g<p;g+=3){let y=g,_=g+1,v=g+2;r=Vs(this,o,e,i,u,c,d,y,_,v),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}}};function Ov(n,e,t,i,r,a,o,s){let l;if(e.side===Qt?l=i.intersectTriangle(o,a,r,!0,s):l=i.intersectTriangle(r,a,o,e.side===rr,s),l===null)return null;Hs.copy(s),Hs.applyMatrix4(n.matrixWorld);let u=t.ray.origin.distanceTo(Hs);return u<t.near||u>t.far?null:{distance:u,point:Hs.clone(),object:n}}function Vs(n,e,t,i,r,a,o,s,l,u){n.getVertexPosition(s,Os),n.getVertexPosition(l,Bs),n.getVertexPosition(u,ks);let c=Ov(n,e,t,i,Os,Bs,ks,Hp);if(c){let d=new z;tr.getBarycoord(Hp,Os,Bs,ks,d),r&&(c.uv=tr.getInterpolatedAttribute(r,s,l,u,d,new Le)),a&&(c.uv1=tr.getInterpolatedAttribute(a,s,l,u,d,new Le)),o&&(c.normal=tr.getInterpolatedAttribute(o,s,l,u,d,new z),c.normal.dot(i.direction)>0&&c.normal.multiplyScalar(-1));let f={a:s,b:l,c:u,normal:new z,materialIndex:0};tr.getNormal(Os,Bs,ks,f.normal),c.face=f,c.barycoord=d}return c}var Mo=class n extends Vt{constructor(e=1,t=1,i=1,r=1,a=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:a,depthSegments:o};let s=this;r=Math.floor(r),a=Math.floor(a),o=Math.floor(o);let l=[],u=[],c=[],d=[],f=0,h=0;m("z","y","x",-1,-1,i,t,e,o,a,0),m("z","y","x",1,-1,i,t,-e,o,a,1),m("x","z","y",1,1,e,i,t,r,o,2),m("x","z","y",1,-1,e,i,-t,r,o,3),m("x","y","z",1,-1,e,t,i,r,a,4),m("x","y","z",-1,-1,e,t,-i,r,a,5),this.setIndex(l),this.setAttribute("position",new Tt(u,3)),this.setAttribute("normal",new Tt(c,3)),this.setAttribute("uv",new Tt(d,2));function m(x,g,p,y,_,v,I,E,P,L,b){let S=v/P,T=I/L,B=v/2,F=I/2,G=E/2,U=P+1,N=L+1,te=0,D=0,k=new z;for(let J=0;J<N;J++){let $=J*T-F;for(let re=0;re<U;re++){let le=re*S-B;k[x]=le*y,k[g]=$*_,k[p]=G,u.push(k.x,k.y,k.z),k[x]=0,k[g]=0,k[p]=E>0?1:-1,c.push(k.x,k.y,k.z),d.push(re/P),d.push(1-J/L),te+=1}}for(let J=0;J<L;J++)for(let $=0;$<P;$++){let re=f+$+U*J,le=f+$+U*(J+1),q=f+($+1)+U*(J+1),W=f+($+1)+U*J;l.push(re,le,W),l.push(le,q,W),D+=6}s.addGroup(h,D,b),h+=D,f+=te}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function Ma(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function vn(n){let e={};for(let t=0;t<n.length;t++){let i=Ma(n[t]);for(let r in i)e[r]=i[r]}return e}function Bv(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function qm(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:gt.workingColorSpace}var kv={clone:Ma,merge:vn},zv=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Hv=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Tn=class extends Mi{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=zv,this.fragmentShader=Hv,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ma(e.uniforms),this.uniformsGroups=Bv(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}},xl=class extends en{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new wt,this.projectionMatrix=new wt,this.projectionMatrixInverse=new wt,this.coordinateSystem=zi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Qi=new z,Vp=new Le,Gp=new Le,yn=class extends xl{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=vo*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(uo*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return vo*2*Math.atan(Math.tan(uo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Qi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Qi.x,Qi.y).multiplyScalar(-e/Qi.z),Qi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Qi.x,Qi.y).multiplyScalar(-e/Qi.z)}getViewSize(e,t){return this.getViewBounds(e,Vp,Gp),t.subVectors(Gp,Vp)}setViewOffset(e,t,i,r,a,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(uo*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,a=-.5*r,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,u=o.fullHeight;a+=o.offsetX*r/l,t-=o.offsetY*i/u,r*=o.width/l,i*=o.height/u}let s=this.filmOffset;s!==0&&(a+=e*s/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+r,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},ia=-90,ra=1,Md=class extends en{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new yn(ia,ra,e,t);r.layers=this.layers,this.add(r);let a=new yn(ia,ra,e,t);a.layers=this.layers,this.add(a);let o=new yn(ia,ra,e,t);o.layers=this.layers,this.add(o);let s=new yn(ia,ra,e,t);s.layers=this.layers,this.add(s);let l=new yn(ia,ra,e,t);l.layers=this.layers,this.add(l);let u=new yn(ia,ra,e,t);u.layers=this.layers,this.add(u)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,r,a,o,s,l]=t;for(let u of t)this.remove(u);if(e===zi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),s.up.set(0,1,0),s.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===dl)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),s.up.set(0,-1,0),s.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let u of t)this.add(u),u.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[a,o,s,l,u,c]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,a),e.setRenderTarget(i,1,r),e.render(t,o),e.setRenderTarget(i,2,r),e.render(t,s),e.setRenderTarget(i,3,r),e.render(t,l),e.setRenderTarget(i,4,r),e.render(t,u),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,r),e.render(t,c),e.setRenderTarget(d,f,h),e.xr.enabled=m,i.texture.needsPMREMUpdate=!0}},vl=class extends En{constructor(e,t,i,r,a,o,s,l,u,c){e=e!==void 0?e:[],t=t!==void 0?t:xa,super(e,t,i,r,a,o,s,l,u,c),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Sd=class extends Gi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new vl(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:vi}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Mo(5,5,5),a=new Tn({name:"CubemapFromEquirect",uniforms:Ma(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Qt,blending:nr});a.uniforms.tEquirect.value=t;let o=new Ft(r,a),s=t.minFilter;return t.minFilter===Rr&&(t.minFilter=vi),new Md(1,10,this).update(e,o),t.minFilter=s,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,i,r){let a=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,r);e.setRenderTarget(a)}},vu=new z,Vv=new z,Gv=new Qe,Bi=class{constructor(e=new z(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let r=vu.subVectors(i,t).cross(Vv.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let i=e.delta(vu),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return a<0||a>1?null:t.copy(e.start).addScaledVector(i,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||Gv.getNormalMatrix(e),r=this.coplanarPoint(vu).applyMatrix4(e),a=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Sr=new Lr,Gs=new z,Dr=class{constructor(e=new Bi,t=new Bi,i=new Bi,r=new Bi,a=new Bi,o=new Bi){this.planes=[e,t,i,r,a,o]}set(e,t,i,r,a,o){let s=this.planes;return s[0].copy(e),s[1].copy(t),s[2].copy(i),s[3].copy(r),s[4].copy(a),s[5].copy(o),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=zi){let i=this.planes,r=e.elements,a=r[0],o=r[1],s=r[2],l=r[3],u=r[4],c=r[5],d=r[6],f=r[7],h=r[8],m=r[9],x=r[10],g=r[11],p=r[12],y=r[13],_=r[14],v=r[15];if(i[0].setComponents(l-a,f-u,g-h,v-p).normalize(),i[1].setComponents(l+a,f+u,g+h,v+p).normalize(),i[2].setComponents(l+o,f+c,g+m,v+y).normalize(),i[3].setComponents(l-o,f-c,g-m,v-y).normalize(),i[4].setComponents(l-s,f-d,g-x,v-_).normalize(),t===zi)i[5].setComponents(l+s,f+d,g+x,v+_).normalize();else if(t===dl)i[5].setComponents(s,d,x,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Sr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Sr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Sr)}intersectsSprite(e){return Sr.center.set(0,0,0),Sr.radius=.7071067811865476,Sr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Sr)}intersectsSphere(e){let t=this.planes,i=e.center,r=-e.radius;for(let a=0;a<6;a++)if(t[a].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let r=t[i];if(Gs.x=r.normal.x>0?e.max.x:e.min.x,Gs.y=r.normal.y>0?e.max.y:e.min.y,Gs.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Gs)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Xm(){let n=null,e=!1,t=null,i=null;function r(a,o){t(a,o),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(a){t=a},setContext:function(a){n=a}}}function Wv(n){let e=new WeakMap;function t(s,l){let u=s.array,c=s.usage,d=u.byteLength,f=n.createBuffer();n.bindBuffer(l,f),n.bufferData(l,u,c),s.onUploadCallback();let h;if(u instanceof Float32Array)h=n.FLOAT;else if(u instanceof Uint16Array)s.isFloat16BufferAttribute?h=n.HALF_FLOAT:h=n.UNSIGNED_SHORT;else if(u instanceof Int16Array)h=n.SHORT;else if(u instanceof Uint32Array)h=n.UNSIGNED_INT;else if(u instanceof Int32Array)h=n.INT;else if(u instanceof Int8Array)h=n.BYTE;else if(u instanceof Uint8Array)h=n.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)h=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:f,type:h,bytesPerElement:u.BYTES_PER_ELEMENT,version:s.version,size:d}}function i(s,l,u){let c=l.array,d=l.updateRanges;if(n.bindBuffer(u,s),d.length===0)n.bufferSubData(u,0,c);else{d.sort((h,m)=>h.start-m.start);let f=0;for(let h=1;h<d.length;h++){let m=d[f],x=d[h];x.start<=m.start+m.count+1?m.count=Math.max(m.count,x.start+x.count-m.start):(++f,d[f]=x)}d.length=f+1;for(let h=0,m=d.length;h<m;h++){let x=d[h];n.bufferSubData(u,x.start*c.BYTES_PER_ELEMENT,c,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(s){return s.isInterleavedBufferAttribute&&(s=s.data),e.get(s)}function a(s){s.isInterleavedBufferAttribute&&(s=s.data);let l=e.get(s);l&&(n.deleteBuffer(l.buffer),e.delete(s))}function o(s,l){if(s.isInterleavedBufferAttribute&&(s=s.data),s.isGLBufferAttribute){let c=e.get(s);(!c||c.version<s.version)&&e.set(s,{buffer:s.buffer,type:s.type,bytesPerElement:s.elementSize,version:s.version});return}let u=e.get(s);if(u===void 0)e.set(s,t(s,l));else if(u.version<s.version){if(u.size!==s.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(u.buffer,s,l),u.version=s.version}}return{get:r,remove:a,update:o}}var yl=class n extends Vt{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};let a=e/2,o=t/2,s=Math.floor(i),l=Math.floor(r),u=s+1,c=l+1,d=e/s,f=t/l,h=[],m=[],x=[],g=[];for(let p=0;p<c;p++){let y=p*f-o;for(let _=0;_<u;_++){let v=_*d-a;m.push(v,-y,0),x.push(0,0,1),g.push(_/s),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let y=0;y<s;y++){let _=y+u*p,v=y+u*(p+1),I=y+1+u*(p+1),E=y+1+u*p;h.push(_,v,E),h.push(v,I,E)}this.setIndex(h),this.setAttribute("position",new Tt(m,3)),this.setAttribute("normal",new Tt(x,3)),this.setAttribute("uv",new Tt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}},qv=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Xv=`#ifdef USE_ALPHAHASH
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
#endif`,Yv=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Zv=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Kv=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,$v=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Jv=`#ifdef USE_AOMAP
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
#endif`,jv=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Qv=`#ifdef USE_BATCHING
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
#endif`,ey=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,ty=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ny=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,iy=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,ry=`#ifdef USE_IRIDESCENCE
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
#endif`,ay=`#ifdef USE_BUMPMAP
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
#endif`,oy=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,sy=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ly=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,cy=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,uy=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,dy=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,fy=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,hy=`#if defined( USE_COLOR_ALPHA )
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
#endif`,py=`#define PI 3.141592653589793
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
} // validated`,my=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,gy=`vec3 transformedNormal = objectNormal;
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
#endif`,xy=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,vy=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,yy=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,_y=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,My="gl_FragColor = linearToOutputTexel( gl_FragColor );",Sy=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,by=`#ifdef USE_ENVMAP
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
#endif`,wy=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Ay=`#ifdef USE_ENVMAP
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
#endif`,Ey=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ty=`#ifdef USE_ENVMAP
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
#endif`,Cy=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ry=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Py=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Iy=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ly=`#ifdef USE_GRADIENTMAP
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
}`,Dy=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Uy=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ny=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Fy=`uniform bool receiveShadow;
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
#endif`,Oy=`#ifdef USE_ENVMAP
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
#endif`,By=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ky=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,zy=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Hy=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Vy=`PhysicalMaterial material;
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
#endif`,Gy=`struct PhysicalMaterial {
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
}`,Wy=`
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
#endif`,qy=`#if defined( RE_IndirectDiffuse )
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
#endif`,Xy=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Yy=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Zy=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ky=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,$y=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Jy=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,jy=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Qy=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,e_=`#if defined( USE_POINTS_UV )
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
#endif`,t_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,n_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,i_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,r_=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,a_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,o_=`#ifdef USE_MORPHTARGETS
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
#endif`,s_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,l_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,c_=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,u_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,d_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,f_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,h_=`#ifdef USE_NORMALMAP
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
#endif`,p_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,m_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,g_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,x_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,v_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,y_=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,__=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,M_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,S_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,b_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,w_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,A_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,E_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,T_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,C_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,R_=`float getShadowMask() {
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
}`,P_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,I_=`#ifdef USE_SKINNING
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
#endif`,L_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,D_=`#ifdef USE_SKINNING
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
#endif`,U_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,N_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,F_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,O_=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,B_=`#ifdef USE_TRANSMISSION
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
#endif`,k_=`#ifdef USE_TRANSMISSION
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
#endif`,z_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,H_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,V_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,G_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,W_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,q_=`uniform sampler2D t2D;
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
}`,X_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Y_=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Z_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,K_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$_=`#include <common>
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
}`,J_=`#if DEPTH_PACKING == 3200
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
}`,j_=`#define DISTANCE
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
}`,Q_=`#define DISTANCE
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
}`,e1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,t1=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,n1=`uniform float scale;
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
}`,i1=`uniform vec3 diffuse;
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
}`,r1=`#include <common>
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
}`,a1=`uniform vec3 diffuse;
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
}`,o1=`#define LAMBERT
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
}`,s1=`#define LAMBERT
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
}`,l1=`#define MATCAP
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
}`,c1=`#define MATCAP
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
}`,u1=`#define NORMAL
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
}`,d1=`#define NORMAL
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
}`,f1=`#define PHONG
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
}`,h1=`#define PHONG
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
}`,p1=`#define STANDARD
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
}`,m1=`#define STANDARD
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
}`,g1=`#define TOON
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
}`,x1=`#define TOON
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
}`,v1=`uniform float size;
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
}`,y1=`uniform vec3 diffuse;
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
}`,_1=`#include <common>
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
}`,M1=`uniform vec3 color;
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
}`,S1=`uniform float rotation;
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
}`,b1=`uniform vec3 diffuse;
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
}`,nt={alphahash_fragment:qv,alphahash_pars_fragment:Xv,alphamap_fragment:Yv,alphamap_pars_fragment:Zv,alphatest_fragment:Kv,alphatest_pars_fragment:$v,aomap_fragment:Jv,aomap_pars_fragment:jv,batching_pars_vertex:Qv,batching_vertex:ey,begin_vertex:ty,beginnormal_vertex:ny,bsdfs:iy,iridescence_fragment:ry,bumpmap_pars_fragment:ay,clipping_planes_fragment:oy,clipping_planes_pars_fragment:sy,clipping_planes_pars_vertex:ly,clipping_planes_vertex:cy,color_fragment:uy,color_pars_fragment:dy,color_pars_vertex:fy,color_vertex:hy,common:py,cube_uv_reflection_fragment:my,defaultnormal_vertex:gy,displacementmap_pars_vertex:xy,displacementmap_vertex:vy,emissivemap_fragment:yy,emissivemap_pars_fragment:_y,colorspace_fragment:My,colorspace_pars_fragment:Sy,envmap_fragment:by,envmap_common_pars_fragment:wy,envmap_pars_fragment:Ay,envmap_pars_vertex:Ey,envmap_physical_pars_fragment:Oy,envmap_vertex:Ty,fog_vertex:Cy,fog_pars_vertex:Ry,fog_fragment:Py,fog_pars_fragment:Iy,gradientmap_pars_fragment:Ly,lightmap_pars_fragment:Dy,lights_lambert_fragment:Uy,lights_lambert_pars_fragment:Ny,lights_pars_begin:Fy,lights_toon_fragment:By,lights_toon_pars_fragment:ky,lights_phong_fragment:zy,lights_phong_pars_fragment:Hy,lights_physical_fragment:Vy,lights_physical_pars_fragment:Gy,lights_fragment_begin:Wy,lights_fragment_maps:qy,lights_fragment_end:Xy,logdepthbuf_fragment:Yy,logdepthbuf_pars_fragment:Zy,logdepthbuf_pars_vertex:Ky,logdepthbuf_vertex:$y,map_fragment:Jy,map_pars_fragment:jy,map_particle_fragment:Qy,map_particle_pars_fragment:e_,metalnessmap_fragment:t_,metalnessmap_pars_fragment:n_,morphinstance_vertex:i_,morphcolor_vertex:r_,morphnormal_vertex:a_,morphtarget_pars_vertex:o_,morphtarget_vertex:s_,normal_fragment_begin:l_,normal_fragment_maps:c_,normal_pars_fragment:u_,normal_pars_vertex:d_,normal_vertex:f_,normalmap_pars_fragment:h_,clearcoat_normal_fragment_begin:p_,clearcoat_normal_fragment_maps:m_,clearcoat_pars_fragment:g_,iridescence_pars_fragment:x_,opaque_fragment:v_,packing:y_,premultiplied_alpha_fragment:__,project_vertex:M_,dithering_fragment:S_,dithering_pars_fragment:b_,roughnessmap_fragment:w_,roughnessmap_pars_fragment:A_,shadowmap_pars_fragment:E_,shadowmap_pars_vertex:T_,shadowmap_vertex:C_,shadowmask_pars_fragment:R_,skinbase_vertex:P_,skinning_pars_vertex:I_,skinning_vertex:L_,skinnormal_vertex:D_,specularmap_fragment:U_,specularmap_pars_fragment:N_,tonemapping_fragment:F_,tonemapping_pars_fragment:O_,transmission_fragment:B_,transmission_pars_fragment:k_,uv_pars_fragment:z_,uv_pars_vertex:H_,uv_vertex:V_,worldpos_vertex:G_,background_vert:W_,background_frag:q_,backgroundCube_vert:X_,backgroundCube_frag:Y_,cube_vert:Z_,cube_frag:K_,depth_vert:$_,depth_frag:J_,distanceRGBA_vert:j_,distanceRGBA_frag:Q_,equirect_vert:e1,equirect_frag:t1,linedashed_vert:n1,linedashed_frag:i1,meshbasic_vert:r1,meshbasic_frag:a1,meshlambert_vert:o1,meshlambert_frag:s1,meshmatcap_vert:l1,meshmatcap_frag:c1,meshnormal_vert:u1,meshnormal_frag:d1,meshphong_vert:f1,meshphong_frag:h1,meshphysical_vert:p1,meshphysical_frag:m1,meshtoon_vert:g1,meshtoon_frag:x1,points_vert:v1,points_frag:y1,shadow_vert:_1,shadow_frag:M1,sprite_vert:S1,sprite_frag:b1},Ae={common:{diffuse:{value:new Je(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Qe},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Qe}},envmap:{envMap:{value:null},envMapRotation:{value:new Qe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Qe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Qe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Qe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Qe},normalScale:{value:new Le(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Qe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Qe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Qe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Qe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Je(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Je(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0},uvTransform:{value:new Qe}},sprite:{diffuse:{value:new Je(16777215)},opacity:{value:1},center:{value:new Le(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Qe},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0}}},xi={basic:{uniforms:vn([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.fog]),vertexShader:nt.meshbasic_vert,fragmentShader:nt.meshbasic_frag},lambert:{uniforms:vn([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,Ae.lights,{emissive:{value:new Je(0)}}]),vertexShader:nt.meshlambert_vert,fragmentShader:nt.meshlambert_frag},phong:{uniforms:vn([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,Ae.lights,{emissive:{value:new Je(0)},specular:{value:new Je(1118481)},shininess:{value:30}}]),vertexShader:nt.meshphong_vert,fragmentShader:nt.meshphong_frag},standard:{uniforms:vn([Ae.common,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.roughnessmap,Ae.metalnessmap,Ae.fog,Ae.lights,{emissive:{value:new Je(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:nt.meshphysical_vert,fragmentShader:nt.meshphysical_frag},toon:{uniforms:vn([Ae.common,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.gradientmap,Ae.fog,Ae.lights,{emissive:{value:new Je(0)}}]),vertexShader:nt.meshtoon_vert,fragmentShader:nt.meshtoon_frag},matcap:{uniforms:vn([Ae.common,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,{matcap:{value:null}}]),vertexShader:nt.meshmatcap_vert,fragmentShader:nt.meshmatcap_frag},points:{uniforms:vn([Ae.points,Ae.fog]),vertexShader:nt.points_vert,fragmentShader:nt.points_frag},dashed:{uniforms:vn([Ae.common,Ae.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:nt.linedashed_vert,fragmentShader:nt.linedashed_frag},depth:{uniforms:vn([Ae.common,Ae.displacementmap]),vertexShader:nt.depth_vert,fragmentShader:nt.depth_frag},normal:{uniforms:vn([Ae.common,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,{opacity:{value:1}}]),vertexShader:nt.meshnormal_vert,fragmentShader:nt.meshnormal_frag},sprite:{uniforms:vn([Ae.sprite,Ae.fog]),vertexShader:nt.sprite_vert,fragmentShader:nt.sprite_frag},background:{uniforms:{uvTransform:{value:new Qe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:nt.background_vert,fragmentShader:nt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Qe}},vertexShader:nt.backgroundCube_vert,fragmentShader:nt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:nt.cube_vert,fragmentShader:nt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:nt.equirect_vert,fragmentShader:nt.equirect_frag},distanceRGBA:{uniforms:vn([Ae.common,Ae.displacementmap,{referencePosition:{value:new z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:nt.distanceRGBA_vert,fragmentShader:nt.distanceRGBA_frag},shadow:{uniforms:vn([Ae.lights,Ae.fog,{color:{value:new Je(0)},opacity:{value:1}}]),vertexShader:nt.shadow_vert,fragmentShader:nt.shadow_frag}};xi.physical={uniforms:vn([xi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Qe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Qe},clearcoatNormalScale:{value:new Le(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Qe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Qe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Qe},sheen:{value:0},sheenColor:{value:new Je(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Qe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Qe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Qe},transmissionSamplerSize:{value:new Le},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Qe},attenuationDistance:{value:0},attenuationColor:{value:new Je(0)},specularColor:{value:new Je(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Qe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Qe},anisotropyVector:{value:new Le},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Qe}}]),vertexShader:nt.meshphysical_vert,fragmentShader:nt.meshphysical_frag};var Ws={r:0,b:0,g:0},br=new _i,w1=new wt;function A1(n,e,t,i,r,a,o){let s=new Je(0),l=a===!0?0:1,u,c,d=null,f=0,h=null;function m(y){let _=y.isScene===!0?y.background:null;return _&&_.isTexture&&(_=(y.backgroundBlurriness>0?t:e).get(_)),_}function x(y){let _=!1,v=m(y);v===null?p(s,l):v&&v.isColor&&(p(v,1),_=!0);let I=n.xr.getEnvironmentBlendMode();I==="additive"?i.buffers.color.setClear(0,0,0,1,o):I==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||_)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function g(y,_){let v=m(_);v&&(v.isCubeTexture||v.mapping===kl)?(c===void 0&&(c=new Ft(new Mo(1,1,1),new Tn({name:"BackgroundCubeMaterial",uniforms:Ma(xi.backgroundCube.uniforms),vertexShader:xi.backgroundCube.vertexShader,fragmentShader:xi.backgroundCube.fragmentShader,side:Qt,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(I,E,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(c)),br.copy(_.backgroundRotation),br.x*=-1,br.y*=-1,br.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(br.y*=-1,br.z*=-1),c.material.uniforms.envMap.value=v,c.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(w1.makeRotationFromEuler(br)),c.material.toneMapped=gt.getTransfer(v.colorSpace)!==Et,(d!==v||f!==v.version||h!==n.toneMapping)&&(c.material.needsUpdate=!0,d=v,f=v.version,h=n.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null)):v&&v.isTexture&&(u===void 0&&(u=new Ft(new yl(2,2),new Tn({name:"BackgroundMaterial",uniforms:Ma(xi.background.uniforms),vertexShader:xi.background.vertexShader,fragmentShader:xi.background.fragmentShader,side:rr,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),Object.defineProperty(u.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(u)),u.material.uniforms.t2D.value=v,u.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,u.material.toneMapped=gt.getTransfer(v.colorSpace)!==Et,v.matrixAutoUpdate===!0&&v.updateMatrix(),u.material.uniforms.uvTransform.value.copy(v.matrix),(d!==v||f!==v.version||h!==n.toneMapping)&&(u.material.needsUpdate=!0,d=v,f=v.version,h=n.toneMapping),u.layers.enableAll(),y.unshift(u,u.geometry,u.material,0,0,null))}function p(y,_){y.getRGB(Ws,qm(n)),i.buffers.color.setClear(Ws.r,Ws.g,Ws.b,_,o)}return{getClearColor:function(){return s},setClearColor:function(y,_=1){s.set(y),l=_,p(s,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,p(s,l)},render:x,addToRenderList:g}}function E1(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=f(null),a=r,o=!1;function s(S,T,B,F,G){let U=!1,N=d(F,B,T);a!==N&&(a=N,u(a.object)),U=h(S,F,B,G),U&&m(S,F,B,G),G!==null&&e.update(G,n.ELEMENT_ARRAY_BUFFER),(U||o)&&(o=!1,v(S,T,B,F),G!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(G).buffer))}function l(){return n.createVertexArray()}function u(S){return n.bindVertexArray(S)}function c(S){return n.deleteVertexArray(S)}function d(S,T,B){let F=B.wireframe===!0,G=i[S.id];G===void 0&&(G={},i[S.id]=G);let U=G[T.id];U===void 0&&(U={},G[T.id]=U);let N=U[F];return N===void 0&&(N=f(l()),U[F]=N),N}function f(S){let T=[],B=[],F=[];for(let G=0;G<t;G++)T[G]=0,B[G]=0,F[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:T,enabledAttributes:B,attributeDivisors:F,object:S,attributes:{},index:null}}function h(S,T,B,F){let G=a.attributes,U=T.attributes,N=0,te=B.getAttributes();for(let D in te)if(te[D].location>=0){let J=G[D],$=U[D];if($===void 0&&(D==="instanceMatrix"&&S.instanceMatrix&&($=S.instanceMatrix),D==="instanceColor"&&S.instanceColor&&($=S.instanceColor)),J===void 0||J.attribute!==$||$&&J.data!==$.data)return!0;N++}return a.attributesNum!==N||a.index!==F}function m(S,T,B,F){let G={},U=T.attributes,N=0,te=B.getAttributes();for(let D in te)if(te[D].location>=0){let J=U[D];J===void 0&&(D==="instanceMatrix"&&S.instanceMatrix&&(J=S.instanceMatrix),D==="instanceColor"&&S.instanceColor&&(J=S.instanceColor));let $={};$.attribute=J,J&&J.data&&($.data=J.data),G[D]=$,N++}a.attributes=G,a.attributesNum=N,a.index=F}function x(){let S=a.newAttributes;for(let T=0,B=S.length;T<B;T++)S[T]=0}function g(S){p(S,0)}function p(S,T){let B=a.newAttributes,F=a.enabledAttributes,G=a.attributeDivisors;B[S]=1,F[S]===0&&(n.enableVertexAttribArray(S),F[S]=1),G[S]!==T&&(n.vertexAttribDivisor(S,T),G[S]=T)}function y(){let S=a.newAttributes,T=a.enabledAttributes;for(let B=0,F=T.length;B<F;B++)T[B]!==S[B]&&(n.disableVertexAttribArray(B),T[B]=0)}function _(S,T,B,F,G,U,N){N===!0?n.vertexAttribIPointer(S,T,B,G,U):n.vertexAttribPointer(S,T,B,F,G,U)}function v(S,T,B,F){x();let G=F.attributes,U=B.getAttributes(),N=T.defaultAttributeValues;for(let te in U){let D=U[te];if(D.location>=0){let k=G[te];if(k===void 0&&(te==="instanceMatrix"&&S.instanceMatrix&&(k=S.instanceMatrix),te==="instanceColor"&&S.instanceColor&&(k=S.instanceColor)),k!==void 0){let J=k.normalized,$=k.itemSize,re=e.get(k);if(re===void 0)continue;let le=re.buffer,q=re.type,W=re.bytesPerElement,j=q===n.INT||q===n.UNSIGNED_INT||k.gpuType===rf;if(k.isInterleavedBufferAttribute){let ae=k.data,fe=ae.stride,me=k.offset;if(ae.isInstancedInterleavedBuffer){for(let ue=0;ue<D.locationSize;ue++)p(D.location+ue,ae.meshPerAttribute);S.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let ue=0;ue<D.locationSize;ue++)g(D.location+ue);n.bindBuffer(n.ARRAY_BUFFER,le);for(let ue=0;ue<D.locationSize;ue++)_(D.location+ue,$/D.locationSize,q,J,fe*W,(me+$/D.locationSize*ue)*W,j)}else{if(k.isInstancedBufferAttribute){for(let ae=0;ae<D.locationSize;ae++)p(D.location+ae,k.meshPerAttribute);S.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=k.meshPerAttribute*k.count)}else for(let ae=0;ae<D.locationSize;ae++)g(D.location+ae);n.bindBuffer(n.ARRAY_BUFFER,le);for(let ae=0;ae<D.locationSize;ae++)_(D.location+ae,$/D.locationSize,q,J,$*W,$/D.locationSize*ae*W,j)}}else if(N!==void 0){let J=N[te];if(J!==void 0)switch(J.length){case 2:n.vertexAttrib2fv(D.location,J);break;case 3:n.vertexAttrib3fv(D.location,J);break;case 4:n.vertexAttrib4fv(D.location,J);break;default:n.vertexAttrib1fv(D.location,J)}}}}y()}function I(){L();for(let S in i){let T=i[S];for(let B in T){let F=T[B];for(let G in F)c(F[G].object),delete F[G];delete T[B]}delete i[S]}}function E(S){if(i[S.id]===void 0)return;let T=i[S.id];for(let B in T){let F=T[B];for(let G in F)c(F[G].object),delete F[G];delete T[B]}delete i[S.id]}function P(S){for(let T in i){let B=i[T];if(B[S.id]===void 0)continue;let F=B[S.id];for(let G in F)c(F[G].object),delete F[G];delete B[S.id]}}function L(){b(),o=!0,a!==r&&(a=r,u(a.object))}function b(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:s,reset:L,resetDefaultState:b,dispose:I,releaseStatesOfGeometry:E,releaseStatesOfProgram:P,initAttributes:x,enableAttribute:g,disableUnusedAttributes:y}}function T1(n,e,t){let i;function r(u){i=u}function a(u,c){n.drawArrays(i,u,c),t.update(c,i,1)}function o(u,c,d){d!==0&&(n.drawArraysInstanced(i,u,c,d),t.update(c,i,d))}function s(u,c,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,u,0,c,0,d);let h=0;for(let m=0;m<d;m++)h+=c[m];t.update(h,i,1)}function l(u,c,d,f){if(d===0)return;let h=e.get("WEBGL_multi_draw");if(h===null)for(let m=0;m<u.length;m++)o(u[m],c[m],f[m]);else{h.multiDrawArraysInstancedWEBGL(i,u,0,c,0,f,0,d);let m=0;for(let x=0;x<d;x++)m+=c[x]*f[x];t.update(m,i,1)}}this.setMode=r,this.render=a,this.renderInstances=o,this.renderMultiDraw=s,this.renderMultiDrawInstances=l}function C1(n,e,t,i){let r;function a(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let P=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(P){return!(P!==ri&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function s(P){let L=P===Io&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==Vi&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==ki&&!L)}function l(P){if(P==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let u=t.precision!==void 0?t.precision:"highp",c=l(u);c!==u&&(console.warn("THREE.WebGLRenderer:",u,"not supported, using",c,"instead."),u=c);let d=t.logarithmicDepthBuffer===!0,f=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),h=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),y=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),_=n.getParameter(n.MAX_VARYING_VECTORS),v=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),I=m>0,E=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:s,precision:u,logarithmicDepthBuffer:d,reverseDepthBuffer:f,maxTextures:h,maxVertexTextures:m,maxTextureSize:x,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:y,maxVaryings:_,maxFragmentUniforms:v,vertexTextures:I,maxSamples:E}}function R1(n){let e=this,t=null,i=0,r=!1,a=!1,o=new Bi,s=new Qe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){let h=d.length!==0||f||i!==0||r;return r=f,i=d.length,h},this.beginShadows=function(){a=!0,c(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(d,f){t=c(d,f,0)},this.setState=function(d,f,h){let m=d.clippingPlanes,x=d.clipIntersection,g=d.clipShadows,p=n.get(d);if(!r||m===null||m.length===0||a&&!g)a?c(null):u();else{let y=a?0:i,_=y*4,v=p.clippingState||null;l.value=v,v=c(m,f,_,h);for(let I=0;I!==_;++I)v[I]=t[I];p.clippingState=v,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=y}};function u(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function c(d,f,h,m){let x=d!==null?d.length:0,g=null;if(x!==0){if(g=l.value,m!==!0||g===null){let p=h+x*4,y=f.matrixWorldInverse;s.getNormalMatrix(y),(g===null||g.length<p)&&(g=new Float32Array(p));for(let _=0,v=h;_!==x;++_,v+=4)o.copy(d[_]).applyMatrix4(y,s),o.normal.toArray(g,v),g[v+3]=o.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,g}}function P1(n){let e=new WeakMap;function t(o,s){return s===zu?o.mapping=xa:s===Hu&&(o.mapping=va),o}function i(o){if(o&&o.isTexture){let s=o.mapping;if(s===zu||s===Hu)if(e.has(o)){let l=e.get(o).texture;return t(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let u=new Sd(l.height);return u.fromEquirectangularTexture(n,o),e.set(o,u),o.addEventListener("dispose",r),t(u.texture,o.mapping)}else return null}}return o}function r(o){let s=o.target;s.removeEventListener("dispose",r);let l=e.get(s);l!==void 0&&(e.delete(s),l.dispose())}function a(){e=new WeakMap}return{get:i,dispose:a}}var _l=class extends xl{constructor(e=-1,t=1,i=1,r=-1,a=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=a,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,a,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2,a=i-e,o=i+e,s=r+t,l=r-t;if(this.view!==null&&this.view.enabled){let u=(this.right-this.left)/this.view.fullWidth/this.zoom,c=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=u*this.view.offsetX,o=a+u*this.view.width,s-=c*this.view.offsetY,l=s-c*this.view.height}this.projectionMatrix.makeOrthographic(a,o,s,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},ua=4,Wp=[.125,.215,.35,.446,.526,.582],Tr=20,yu=new _l,qp=new Je,_u=null,Mu=0,Su=0,bu=!1,Ar=(1+Math.sqrt(5))/2,aa=1/Ar,Xp=[new z(-Ar,aa,0),new z(Ar,aa,0),new z(-aa,0,Ar),new z(aa,0,Ar),new z(0,Ar,-aa),new z(0,Ar,aa),new z(-1,1,-1),new z(1,1,-1),new z(-1,1,1),new z(1,1,1)],Ml=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100){_u=this._renderer.getRenderTarget(),Mu=this._renderer.getActiveCubeFace(),Su=this._renderer.getActiveMipmapLevel(),bu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let a=this._allocateTargets();return a.depthBuffer=!0,this._sceneToCubeUV(e,i,r,a),t>0&&this._blur(a,0,0,t),this._applyPMREM(a),this._cleanup(a),a}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Kp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Zp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(_u,Mu,Su),this._renderer.xr.enabled=bu,e.scissorTest=!1,qs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===xa||e.mapping===va?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),_u=this._renderer.getRenderTarget(),Mu=this._renderer.getActiveCubeFace(),Su=this._renderer.getActiveMipmapLevel(),bu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:vi,minFilter:vi,generateMipmaps:!1,type:Io,format:ri,colorSpace:wa,depthBuffer:!1},r=Yp(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Yp(e,t,i);let{_lodMax:a}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=I1(a)),this._blurMaterial=L1(a,e,t)}return r}_compileMaterial(e){let t=new Ft(this._lodPlanes[0],e);this._renderer.compile(t,yu)}_sceneToCubeUV(e,t,i,r){let s=new yn(90,1,t,i),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],c=this._renderer,d=c.autoClear,f=c.toneMapping;c.getClearColor(qp),c.toneMapping=ir,c.autoClear=!1;let h=new Vn({name:"PMREM.Background",side:Qt,depthWrite:!1,depthTest:!1}),m=new Ft(new Mo,h),x=!1,g=e.background;g?g.isColor&&(h.color.copy(g),e.background=null,x=!0):(h.color.copy(qp),x=!0);for(let p=0;p<6;p++){let y=p%3;y===0?(s.up.set(0,l[p],0),s.lookAt(u[p],0,0)):y===1?(s.up.set(0,0,l[p]),s.lookAt(0,u[p],0)):(s.up.set(0,l[p],0),s.lookAt(0,0,u[p]));let _=this._cubeSize;qs(r,y*_,p>2?_:0,_,_),c.setRenderTarget(r),x&&c.render(m,s),c.render(e,s)}m.geometry.dispose(),m.material.dispose(),c.toneMapping=f,c.autoClear=d,e.background=g}_textureToCubeUV(e,t){let i=this._renderer,r=e.mapping===xa||e.mapping===va;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Kp()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Zp());let a=r?this._cubemapMaterial:this._equirectMaterial,o=new Ft(this._lodPlanes[0],a),s=a.uniforms;s.envMap.value=e;let l=this._cubeSize;qs(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,yu)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let r=this._lodPlanes.length;for(let a=1;a<r;a++){let o=Math.sqrt(this._sigmas[a]*this._sigmas[a]-this._sigmas[a-1]*this._sigmas[a-1]),s=Xp[(r-a-1)%Xp.length];this._blur(e,a-1,a,o,s)}t.autoClear=i}_blur(e,t,i,r,a){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,r,"latitudinal",a),this._halfBlur(o,e,i,i,r,"longitudinal",a)}_halfBlur(e,t,i,r,a,o,s){let l=this._renderer,u=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let c=3,d=new Ft(this._lodPlanes[r],u),f=u.uniforms,h=this._sizeLods[i]-1,m=isFinite(a)?Math.PI/(2*h):2*Math.PI/(2*Tr-1),x=a/m,g=isFinite(a)?1+Math.floor(c*x):Tr;g>Tr&&console.warn(`sigmaRadians, ${a}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Tr}`);let p=[],y=0;for(let P=0;P<Tr;++P){let L=P/x,b=Math.exp(-L*L/2);p.push(b),P===0?y+=b:P<g&&(y+=2*b)}for(let P=0;P<p.length;P++)p[P]=p[P]/y;f.envMap.value=e.texture,f.samples.value=g,f.weights.value=p,f.latitudinal.value=o==="latitudinal",s&&(f.poleAxis.value=s);let{_lodMax:_}=this;f.dTheta.value=m,f.mipInt.value=_-i;let v=this._sizeLods[r],I=3*v*(r>_-ua?r-_+ua:0),E=4*(this._cubeSize-v);qs(t,I,E,3*v,2*v),l.setRenderTarget(t),l.render(d,yu)}};function I1(n){let e=[],t=[],i=[],r=n,a=n-ua+1+Wp.length;for(let o=0;o<a;o++){let s=Math.pow(2,r);t.push(s);let l=1/s;o>n-ua?l=Wp[o-n+ua-1]:o===0&&(l=0),i.push(l);let u=1/(s-2),c=-u,d=1+u,f=[c,c,d,c,d,d,c,c,d,d,c,d],h=6,m=6,x=3,g=2,p=1,y=new Float32Array(x*m*h),_=new Float32Array(g*m*h),v=new Float32Array(p*m*h);for(let E=0;E<h;E++){let P=E%3*2/3-1,L=E>2?0:-1,b=[P,L,0,P+2/3,L,0,P+2/3,L+1,0,P,L,0,P+2/3,L+1,0,P,L+1,0];y.set(b,x*m*E),_.set(f,g*m*E);let S=[E,E,E,E,E,E];v.set(S,p*m*E)}let I=new Vt;I.setAttribute("position",new Fn(y,x)),I.setAttribute("uv",new Fn(_,g)),I.setAttribute("faceIndex",new Fn(v,p)),e.push(I),r>ua&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function Yp(n,e,t){let i=new Gi(n,e,t);return i.texture.mapping=kl,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function qs(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function L1(n,e,t){let i=new Float32Array(Tr),r=new z(0,1,0);return new Tn({name:"SphericalGaussianBlur",defines:{n:Tr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:ff(),fragmentShader:`

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
		`,blending:nr,depthTest:!1,depthWrite:!1})}function Zp(){return new Tn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ff(),fragmentShader:`

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
		`,blending:nr,depthTest:!1,depthWrite:!1})}function Kp(){return new Tn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ff(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:nr,depthTest:!1,depthWrite:!1})}function ff(){return`

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
	`}function D1(n){let e=new WeakMap,t=null;function i(s){if(s&&s.isTexture){let l=s.mapping,u=l===zu||l===Hu,c=l===xa||l===va;if(u||c){let d=e.get(s),f=d!==void 0?d.texture.pmremVersion:0;if(s.isRenderTargetTexture&&s.pmremVersion!==f)return t===null&&(t=new Ml(n)),d=u?t.fromEquirectangular(s,d):t.fromCubemap(s,d),d.texture.pmremVersion=s.pmremVersion,e.set(s,d),d.texture;if(d!==void 0)return d.texture;{let h=s.image;return u&&h&&h.height>0||c&&h&&r(h)?(t===null&&(t=new Ml(n)),d=u?t.fromEquirectangular(s):t.fromCubemap(s),d.texture.pmremVersion=s.pmremVersion,e.set(s,d),s.addEventListener("dispose",a),d.texture):null}}}return s}function r(s){let l=0,u=6;for(let c=0;c<u;c++)s[c]!==void 0&&l++;return l===u}function a(s){let l=s.target;l.removeEventListener("dispose",a);let u=e.get(l);u!==void 0&&(e.delete(l),u.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function U1(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let r=t(i);return r===null&&lo("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function N1(n,e,t,i){let r={},a=new WeakMap;function o(d){let f=d.target;f.index!==null&&e.remove(f.index);for(let m in f.attributes)e.remove(f.attributes[m]);for(let m in f.morphAttributes){let x=f.morphAttributes[m];for(let g=0,p=x.length;g<p;g++)e.remove(x[g])}f.removeEventListener("dispose",o),delete r[f.id];let h=a.get(f);h&&(e.remove(h),a.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function s(d,f){return r[f.id]===!0||(f.addEventListener("dispose",o),r[f.id]=!0,t.memory.geometries++),f}function l(d){let f=d.attributes;for(let m in f)e.update(f[m],n.ARRAY_BUFFER);let h=d.morphAttributes;for(let m in h){let x=h[m];for(let g=0,p=x.length;g<p;g++)e.update(x[g],n.ARRAY_BUFFER)}}function u(d){let f=[],h=d.index,m=d.attributes.position,x=0;if(h!==null){let y=h.array;x=h.version;for(let _=0,v=y.length;_<v;_+=3){let I=y[_+0],E=y[_+1],P=y[_+2];f.push(I,E,E,P,P,I)}}else if(m!==void 0){let y=m.array;x=m.version;for(let _=0,v=y.length/3-1;_<v;_+=3){let I=_+0,E=_+1,P=_+2;f.push(I,E,E,P,P,I)}}else return;let g=new(Gm(f)?gl:ml)(f,1);g.version=x;let p=a.get(d);p&&e.remove(p),a.set(d,g)}function c(d){let f=a.get(d);if(f){let h=d.index;h!==null&&f.version<h.version&&u(d)}else u(d);return a.get(d)}return{get:s,update:l,getWireframeAttribute:c}}function F1(n,e,t){let i;function r(f){i=f}let a,o;function s(f){a=f.type,o=f.bytesPerElement}function l(f,h){n.drawElements(i,h,a,f*o),t.update(h,i,1)}function u(f,h,m){m!==0&&(n.drawElementsInstanced(i,h,a,f*o,m),t.update(h,i,m))}function c(f,h,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,a,f,0,m);let g=0;for(let p=0;p<m;p++)g+=h[p];t.update(g,i,1)}function d(f,h,m,x){if(m===0)return;let g=e.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<f.length;p++)u(f[p]/o,h[p],x[p]);else{g.multiDrawElementsInstancedWEBGL(i,h,0,a,f,0,x,0,m);let p=0;for(let y=0;y<m;y++)p+=h[y]*x[y];t.update(p,i,1)}}this.setMode=r,this.setIndex=s,this.render=l,this.renderInstances=u,this.renderMultiDraw=c,this.renderMultiDrawInstances=d}function O1(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,o,s){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=s*(a/3);break;case n.LINES:t.lines+=s*(a/2);break;case n.LINE_STRIP:t.lines+=s*(a-1);break;case n.LINE_LOOP:t.lines+=s*a;break;case n.POINTS:t.points+=s*a;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function B1(n,e,t){let i=new WeakMap,r=new Ht;function a(o,s,l){let u=o.morphTargetInfluences,c=s.morphAttributes.position||s.morphAttributes.normal||s.morphAttributes.color,d=c!==void 0?c.length:0,f=i.get(s);if(f===void 0||f.count!==d){let b=function(){P.dispose(),i.delete(s),s.removeEventListener("dispose",b)};f!==void 0&&f.texture.dispose();let h=s.morphAttributes.position!==void 0,m=s.morphAttributes.normal!==void 0,x=s.morphAttributes.color!==void 0,g=s.morphAttributes.position||[],p=s.morphAttributes.normal||[],y=s.morphAttributes.color||[],_=0;h===!0&&(_=1),m===!0&&(_=2),x===!0&&(_=3);let v=s.attributes.position.count*_,I=1;v>e.maxTextureSize&&(I=Math.ceil(v/e.maxTextureSize),v=e.maxTextureSize);let E=new Float32Array(v*I*4*d),P=new hl(E,v,I,d);P.type=ki,P.needsUpdate=!0;let L=_*4;for(let S=0;S<d;S++){let T=g[S],B=p[S],F=y[S],G=v*I*4*S;for(let U=0;U<T.count;U++){let N=U*L;h===!0&&(r.fromBufferAttribute(T,U),E[G+N+0]=r.x,E[G+N+1]=r.y,E[G+N+2]=r.z,E[G+N+3]=0),m===!0&&(r.fromBufferAttribute(B,U),E[G+N+4]=r.x,E[G+N+5]=r.y,E[G+N+6]=r.z,E[G+N+7]=0),x===!0&&(r.fromBufferAttribute(F,U),E[G+N+8]=r.x,E[G+N+9]=r.y,E[G+N+10]=r.z,E[G+N+11]=F.itemSize===4?r.w:1)}}f={count:d,texture:P,size:new Le(v,I)},i.set(s,f),s.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let h=0;for(let x=0;x<u.length;x++)h+=u[x];let m=s.morphTargetsRelative?1:1-h;l.getUniforms().setValue(n,"morphTargetBaseInfluence",m),l.getUniforms().setValue(n,"morphTargetInfluences",u)}l.getUniforms().setValue(n,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:a}}function k1(n,e,t,i){let r=new WeakMap;function a(l){let u=i.render.frame,c=l.geometry,d=e.get(l,c);if(r.get(d)!==u&&(e.update(d),r.set(d,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",s)===!1&&l.addEventListener("dispose",s),r.get(l)!==u&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,u))),l.isSkinnedMesh){let f=l.skeleton;r.get(f)!==u&&(f.update(),r.set(f,u))}return d}function o(){r=new WeakMap}function s(l){let u=l.target;u.removeEventListener("dispose",s),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}var Sl=class extends En{constructor(e,t,i,r,a,o,s,l,u,c=ha){if(c!==ha&&c!==_a)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&c===ha&&(i=Pr),i===void 0&&c===_a&&(i=ya),super(null,r,a,o,s,l,c,i,u),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=s!==void 0?s:ai,this.minFilter=l!==void 0?l:ai,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Ym=new En,$p=new Sl(1,1),Zm=new hl,Km=new _d,$m=new vl,Jp=[],jp=[],Qp=new Float32Array(16),em=new Float32Array(9),tm=new Float32Array(4);function Aa(n,e,t){let i=n[0];if(i<=0||i>0)return n;let r=e*t,a=Jp[r];if(a===void 0&&(a=new Float32Array(r),Jp[r]=a),e!==0){i.toArray(a,0);for(let o=1,s=0;o!==e;++o)s+=t,n[o].toArray(a,s)}return a}function Yt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Zt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Hl(n,e){let t=jp[e];t===void 0&&(t=new Int32Array(e),jp[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function z1(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function H1(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;n.uniform2fv(this.addr,e),Zt(t,e)}}function V1(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Yt(t,e))return;n.uniform3fv(this.addr,e),Zt(t,e)}}function G1(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;n.uniform4fv(this.addr,e),Zt(t,e)}}function W1(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Yt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Zt(t,e)}else{if(Yt(t,i))return;tm.set(i),n.uniformMatrix2fv(this.addr,!1,tm),Zt(t,i)}}function q1(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Yt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Zt(t,e)}else{if(Yt(t,i))return;em.set(i),n.uniformMatrix3fv(this.addr,!1,em),Zt(t,i)}}function X1(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Yt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Zt(t,e)}else{if(Yt(t,i))return;Qp.set(i),n.uniformMatrix4fv(this.addr,!1,Qp),Zt(t,i)}}function Y1(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Z1(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;n.uniform2iv(this.addr,e),Zt(t,e)}}function K1(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Yt(t,e))return;n.uniform3iv(this.addr,e),Zt(t,e)}}function $1(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;n.uniform4iv(this.addr,e),Zt(t,e)}}function J1(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function j1(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;n.uniform2uiv(this.addr,e),Zt(t,e)}}function Q1(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Yt(t,e))return;n.uniform3uiv(this.addr,e),Zt(t,e)}}function eM(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;n.uniform4uiv(this.addr,e),Zt(t,e)}}function tM(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let a;this.type===n.SAMPLER_2D_SHADOW?($p.compareFunction=Vm,a=$p):a=Ym,t.setTexture2D(e||a,r)}function nM(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Km,r)}function iM(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||$m,r)}function rM(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Zm,r)}function aM(n){switch(n){case 5126:return z1;case 35664:return H1;case 35665:return V1;case 35666:return G1;case 35674:return W1;case 35675:return q1;case 35676:return X1;case 5124:case 35670:return Y1;case 35667:case 35671:return Z1;case 35668:case 35672:return K1;case 35669:case 35673:return $1;case 5125:return J1;case 36294:return j1;case 36295:return Q1;case 36296:return eM;case 35678:case 36198:case 36298:case 36306:case 35682:return tM;case 35679:case 36299:case 36307:return nM;case 35680:case 36300:case 36308:case 36293:return iM;case 36289:case 36303:case 36311:case 36292:return rM}}function oM(n,e){n.uniform1fv(this.addr,e)}function sM(n,e){let t=Aa(e,this.size,2);n.uniform2fv(this.addr,t)}function lM(n,e){let t=Aa(e,this.size,3);n.uniform3fv(this.addr,t)}function cM(n,e){let t=Aa(e,this.size,4);n.uniform4fv(this.addr,t)}function uM(n,e){let t=Aa(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function dM(n,e){let t=Aa(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function fM(n,e){let t=Aa(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function hM(n,e){n.uniform1iv(this.addr,e)}function pM(n,e){n.uniform2iv(this.addr,e)}function mM(n,e){n.uniform3iv(this.addr,e)}function gM(n,e){n.uniform4iv(this.addr,e)}function xM(n,e){n.uniform1uiv(this.addr,e)}function vM(n,e){n.uniform2uiv(this.addr,e)}function yM(n,e){n.uniform3uiv(this.addr,e)}function _M(n,e){n.uniform4uiv(this.addr,e)}function MM(n,e,t){let i=this.cache,r=e.length,a=Hl(t,r);Yt(i,a)||(n.uniform1iv(this.addr,a),Zt(i,a));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||Ym,a[o])}function SM(n,e,t){let i=this.cache,r=e.length,a=Hl(t,r);Yt(i,a)||(n.uniform1iv(this.addr,a),Zt(i,a));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||Km,a[o])}function bM(n,e,t){let i=this.cache,r=e.length,a=Hl(t,r);Yt(i,a)||(n.uniform1iv(this.addr,a),Zt(i,a));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||$m,a[o])}function wM(n,e,t){let i=this.cache,r=e.length,a=Hl(t,r);Yt(i,a)||(n.uniform1iv(this.addr,a),Zt(i,a));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||Zm,a[o])}function AM(n){switch(n){case 5126:return oM;case 35664:return sM;case 35665:return lM;case 35666:return cM;case 35674:return uM;case 35675:return dM;case 35676:return fM;case 5124:case 35670:return hM;case 35667:case 35671:return pM;case 35668:case 35672:return mM;case 35669:case 35673:return gM;case 5125:return xM;case 36294:return vM;case 36295:return yM;case 36296:return _M;case 35678:case 36198:case 36298:case 36306:case 35682:return MM;case 35679:case 36299:case 36307:return SM;case 35680:case 36300:case 36308:case 36293:return bM;case 36289:case 36303:case 36311:case 36292:return wM}}var bd=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=aM(t.type)}},wd=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=AM(t.type)}},Ad=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let r=this.seq;for(let a=0,o=r.length;a!==o;++a){let s=r[a];s.setValue(e,t[s.id],i)}}},wu=/(\w+)(\])?(\[|\.)?/g;function nm(n,e){n.seq.push(e),n.map[e.id]=e}function EM(n,e,t){let i=n.name,r=i.length;for(wu.lastIndex=0;;){let a=wu.exec(i),o=wu.lastIndex,s=a[1],l=a[2]==="]",u=a[3];if(l&&(s=s|0),u===void 0||u==="["&&o+2===r){nm(t,u===void 0?new bd(s,n,e):new wd(s,n,e));break}else{let d=t.map[s];d===void 0&&(d=new Ad(s),nm(t,d)),t=d}}}var ma=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){let a=e.getActiveUniform(t,r),o=e.getUniformLocation(t,a.name);EM(a,o,this)}}setValue(e,t,i,r){let a=this.map[t];a!==void 0&&a.setValue(e,i,r)}setOptional(e,t,i){let r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let a=0,o=t.length;a!==o;++a){let s=t[a],l=i[s.id];l.needsUpdate!==!1&&s.setValue(e,l.value,r)}}static seqWithValue(e,t){let i=[];for(let r=0,a=e.length;r!==a;++r){let o=e[r];o.id in t&&i.push(o)}return i}};function im(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var TM=37297,CM=0;function RM(n,e){let t=n.split(`
`),i=[],r=Math.max(e-6,0),a=Math.min(e+6,t.length);for(let o=r;o<a;o++){let s=o+1;i.push(`${s===e?">":" "} ${s}: ${t[o]}`)}return i.join(`
`)}var rm=new Qe;function PM(n){gt._getMatrix(rm,gt.workingColorSpace,n);let e=`mat3( ${rm.elements.map(t=>t.toFixed(4))} )`;switch(gt.getTransfer(n)){case zl:return[e,"LinearTransferOETF"];case Et:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function am(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),r=n.getShaderInfoLog(e).trim();if(i&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+RM(n.getShaderSource(e),o)}else return r}function IM(n,e){let t=PM(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function LM(n,e){let t;switch(e){case Gx:t="Linear";break;case Wx:t="Reinhard";break;case qx:t="Cineon";break;case nf:t="ACESFilmic";break;case Yx:t="AgX";break;case Zx:t="Neutral";break;case Xx:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Xs=new z;function DM(){gt.getLuminanceCoefficients(Xs);let n=Xs.x.toFixed(4),e=Xs.y.toFixed(4),t=Xs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function UM(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(co).join(`
`)}function NM(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function FM(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){let a=n.getActiveAttrib(e,r),o=a.name,s=1;a.type===n.FLOAT_MAT2&&(s=2),a.type===n.FLOAT_MAT3&&(s=3),a.type===n.FLOAT_MAT4&&(s=4),t[o]={type:a.type,location:n.getAttribLocation(e,o),locationSize:s}}return t}function co(n){return n!==""}function om(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function sm(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var OM=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ed(n){return n.replace(OM,kM)}var BM=new Map;function kM(n,e){let t=nt[e];if(t===void 0){let i=BM.get(e);if(i!==void 0)t=nt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Ed(t)}var zM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function lm(n){return n.replace(zM,HM)}function HM(n,e,t,i){let r="";for(let a=parseInt(e);a<parseInt(t);a++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return r}function cm(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}function VM(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Cm?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===Sx?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Oi&&(e="SHADOWMAP_TYPE_VSM"),e}function GM(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case xa:case va:e="ENVMAP_TYPE_CUBE";break;case kl:e="ENVMAP_TYPE_CUBE_UV";break}return e}function WM(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case va:e="ENVMAP_MODE_REFRACTION";break}return e}function qM(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Rm:e="ENVMAP_BLENDING_MULTIPLY";break;case Hx:e="ENVMAP_BLENDING_MIX";break;case Vx:e="ENVMAP_BLENDING_ADD";break}return e}function XM(n){let e=n.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function YM(n,e,t,i){let r=n.getContext(),a=t.defines,o=t.vertexShader,s=t.fragmentShader,l=VM(t),u=GM(t),c=WM(t),d=qM(t),f=XM(t),h=UM(t),m=NM(a),x=r.createProgram(),g,p,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(co).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(co).join(`
`),p.length>0&&(p+=`
`)):(g=[cm(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(co).join(`
`),p=[cm(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ir?"#define TONE_MAPPING":"",t.toneMapping!==ir?nt.tonemapping_pars_fragment:"",t.toneMapping!==ir?LM("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",nt.colorspace_pars_fragment,IM("linearToOutputTexel",t.outputColorSpace),DM(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(co).join(`
`)),o=Ed(o),o=om(o,t),o=sm(o,t),s=Ed(s),s=om(s,t),s=sm(s,t),o=lm(o),s=lm(s),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,g=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===Sp?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Sp?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let _=y+g+o,v=y+p+s,I=im(r,r.VERTEX_SHADER,_),E=im(r,r.FRAGMENT_SHADER,v);r.attachShader(x,I),r.attachShader(x,E),t.index0AttributeName!==void 0?r.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(x,0,"position"),r.linkProgram(x);function P(T){if(n.debug.checkShaderErrors){let B=r.getProgramInfoLog(x).trim(),F=r.getShaderInfoLog(I).trim(),G=r.getShaderInfoLog(E).trim(),U=!0,N=!0;if(r.getProgramParameter(x,r.LINK_STATUS)===!1)if(U=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,x,I,E);else{let te=am(r,I,"vertex"),D=am(r,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,r.VALIDATE_STATUS)+`

Material Name: `+T.name+`
Material Type: `+T.type+`

Program Info Log: `+B+`
`+te+`
`+D)}else B!==""?console.warn("THREE.WebGLProgram: Program Info Log:",B):(F===""||G==="")&&(N=!1);N&&(T.diagnostics={runnable:U,programLog:B,vertexShader:{log:F,prefix:g},fragmentShader:{log:G,prefix:p}})}r.deleteShader(I),r.deleteShader(E),L=new ma(r,x),b=FM(r,x)}let L;this.getUniforms=function(){return L===void 0&&P(this),L};let b;this.getAttributes=function(){return b===void 0&&P(this),b};let S=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=r.getProgramParameter(x,TM)),S},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=CM++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=I,this.fragmentShader=E,this}var ZM=0,Td=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),a=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(a)===!1&&(o.add(a),a.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new Cd(e),t.set(e,i)),i}},Cd=class{constructor(e){this.id=ZM++,this.code=e,this.usedTimes=0}};function KM(n,e,t,i,r,a,o){let s=new pl,l=new Td,u=new Set,c=[],d=r.logarithmicDepthBuffer,f=r.vertexTextures,h=r.precision,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(b){return u.add(b),b===0?"uv":`uv${b}`}function g(b,S,T,B,F){let G=B.fog,U=F.geometry,N=b.isMeshStandardMaterial?B.environment:null,te=(b.isMeshStandardMaterial?t:e).get(b.envMap||N),D=te&&te.mapping===kl?te.image.height:null,k=m[b.type];b.precision!==null&&(h=r.getMaxPrecision(b.precision),h!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",h,"instead."));let J=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,$=J!==void 0?J.length:0,re=0;U.morphAttributes.position!==void 0&&(re=1),U.morphAttributes.normal!==void 0&&(re=2),U.morphAttributes.color!==void 0&&(re=3);let le,q,W,j;if(k){let Ye=xi[k];le=Ye.vertexShader,q=Ye.fragmentShader}else le=b.vertexShader,q=b.fragmentShader,l.update(b),W=l.getVertexShaderID(b),j=l.getFragmentShaderID(b);let ae=n.getRenderTarget(),fe=n.state.buffers.depth.getReversed(),me=F.isInstancedMesh===!0,ue=F.isBatchedMesh===!0,Ce=!!b.map,Te=!!b.matcap,Pe=!!te,O=!!b.aoMap,Oe=!!b.lightMap,De=!!b.bumpMap,_e=!!b.normalMap,pe=!!b.displacementMap,Ue=!!b.emissiveMap,xe=!!b.metalnessMap,C=!!b.roughnessMap,w=b.anisotropy>0,X=b.clearcoat>0,ne=b.dispersion>0,oe=b.iridescence>0,ie=b.sheen>0,be=b.transmission>0,he=w&&!!b.anisotropyMap,ge=X&&!!b.clearcoatMap,Ge=X&&!!b.clearcoatNormalMap,de=X&&!!b.clearcoatRoughnessMap,we=oe&&!!b.iridescenceMap,M=oe&&!!b.iridescenceThicknessMap,Re=ie&&!!b.sheenColorMap,Me=ie&&!!b.sheenRoughnessMap,We=!!b.specularMap,He=!!b.specularColorMap,Xe=!!b.specularIntensityMap,R=be&&!!b.transmissionMap,ee=be&&!!b.thicknessMap,V=!!b.gradientMap,Z=!!b.alphaMap,ce=b.alphaTest>0,se=!!b.alphaHash,Se=!!b.extensions,$e=ir;b.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&($e=n.toneMapping);let et={shaderID:k,shaderType:b.type,shaderName:b.name,vertexShader:le,fragmentShader:q,defines:b.defines,customVertexShaderID:W,customFragmentShaderID:j,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:h,batching:ue,batchingColor:ue&&F._colorsTexture!==null,instancing:me,instancingColor:me&&F.instanceColor!==null,instancingMorph:me&&F.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ae===null?n.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:wa,alphaToCoverage:!!b.alphaToCoverage,map:Ce,matcap:Te,envMap:Pe,envMapMode:Pe&&te.mapping,envMapCubeUVHeight:D,aoMap:O,lightMap:Oe,bumpMap:De,normalMap:_e,displacementMap:f&&pe,emissiveMap:Ue,normalMapObjectSpace:_e&&b.normalMapType===jx,normalMapTangentSpace:_e&&b.normalMapType===Hm,metalnessMap:xe,roughnessMap:C,anisotropy:w,anisotropyMap:he,clearcoat:X,clearcoatMap:ge,clearcoatNormalMap:Ge,clearcoatRoughnessMap:de,dispersion:ne,iridescence:oe,iridescenceMap:we,iridescenceThicknessMap:M,sheen:ie,sheenColorMap:Re,sheenRoughnessMap:Me,specularMap:We,specularColorMap:He,specularIntensityMap:Xe,transmission:be,transmissionMap:R,thicknessMap:ee,gradientMap:V,opaque:b.transparent===!1&&b.blending===fa&&b.alphaToCoverage===!1,alphaMap:Z,alphaTest:ce,alphaHash:se,combine:b.combine,mapUv:Ce&&x(b.map.channel),aoMapUv:O&&x(b.aoMap.channel),lightMapUv:Oe&&x(b.lightMap.channel),bumpMapUv:De&&x(b.bumpMap.channel),normalMapUv:_e&&x(b.normalMap.channel),displacementMapUv:pe&&x(b.displacementMap.channel),emissiveMapUv:Ue&&x(b.emissiveMap.channel),metalnessMapUv:xe&&x(b.metalnessMap.channel),roughnessMapUv:C&&x(b.roughnessMap.channel),anisotropyMapUv:he&&x(b.anisotropyMap.channel),clearcoatMapUv:ge&&x(b.clearcoatMap.channel),clearcoatNormalMapUv:Ge&&x(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:de&&x(b.clearcoatRoughnessMap.channel),iridescenceMapUv:we&&x(b.iridescenceMap.channel),iridescenceThicknessMapUv:M&&x(b.iridescenceThicknessMap.channel),sheenColorMapUv:Re&&x(b.sheenColorMap.channel),sheenRoughnessMapUv:Me&&x(b.sheenRoughnessMap.channel),specularMapUv:We&&x(b.specularMap.channel),specularColorMapUv:He&&x(b.specularColorMap.channel),specularIntensityMapUv:Xe&&x(b.specularIntensityMap.channel),transmissionMapUv:R&&x(b.transmissionMap.channel),thicknessMapUv:ee&&x(b.thicknessMap.channel),alphaMapUv:Z&&x(b.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(_e||w),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!U.attributes.uv&&(Ce||Z),fog:!!G,useFog:b.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:fe,skinning:F.isSkinnedMesh===!0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:$,morphTextureStride:re,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:n.shadowMap.enabled&&T.length>0,shadowMapType:n.shadowMap.type,toneMapping:$e,decodeVideoTexture:Ce&&b.map.isVideoTexture===!0&&gt.getTransfer(b.map.colorSpace)===Et,decodeVideoTextureEmissive:Ue&&b.emissiveMap.isVideoTexture===!0&&gt.getTransfer(b.emissiveMap.colorSpace)===Et,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===ni,flipSided:b.side===Qt,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Se&&b.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Se&&b.extensions.multiDraw===!0||ue)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return et.vertexUv1s=u.has(1),et.vertexUv2s=u.has(2),et.vertexUv3s=u.has(3),u.clear(),et}function p(b){let S=[];if(b.shaderID?S.push(b.shaderID):(S.push(b.customVertexShaderID),S.push(b.customFragmentShaderID)),b.defines!==void 0)for(let T in b.defines)S.push(T),S.push(b.defines[T]);return b.isRawShaderMaterial===!1&&(y(S,b),_(S,b),S.push(n.outputColorSpace)),S.push(b.customProgramCacheKey),S.join()}function y(b,S){b.push(S.precision),b.push(S.outputColorSpace),b.push(S.envMapMode),b.push(S.envMapCubeUVHeight),b.push(S.mapUv),b.push(S.alphaMapUv),b.push(S.lightMapUv),b.push(S.aoMapUv),b.push(S.bumpMapUv),b.push(S.normalMapUv),b.push(S.displacementMapUv),b.push(S.emissiveMapUv),b.push(S.metalnessMapUv),b.push(S.roughnessMapUv),b.push(S.anisotropyMapUv),b.push(S.clearcoatMapUv),b.push(S.clearcoatNormalMapUv),b.push(S.clearcoatRoughnessMapUv),b.push(S.iridescenceMapUv),b.push(S.iridescenceThicknessMapUv),b.push(S.sheenColorMapUv),b.push(S.sheenRoughnessMapUv),b.push(S.specularMapUv),b.push(S.specularColorMapUv),b.push(S.specularIntensityMapUv),b.push(S.transmissionMapUv),b.push(S.thicknessMapUv),b.push(S.combine),b.push(S.fogExp2),b.push(S.sizeAttenuation),b.push(S.morphTargetsCount),b.push(S.morphAttributeCount),b.push(S.numDirLights),b.push(S.numPointLights),b.push(S.numSpotLights),b.push(S.numSpotLightMaps),b.push(S.numHemiLights),b.push(S.numRectAreaLights),b.push(S.numDirLightShadows),b.push(S.numPointLightShadows),b.push(S.numSpotLightShadows),b.push(S.numSpotLightShadowsWithMaps),b.push(S.numLightProbes),b.push(S.shadowMapType),b.push(S.toneMapping),b.push(S.numClippingPlanes),b.push(S.numClipIntersection),b.push(S.depthPacking)}function _(b,S){s.disableAll(),S.supportsVertexTextures&&s.enable(0),S.instancing&&s.enable(1),S.instancingColor&&s.enable(2),S.instancingMorph&&s.enable(3),S.matcap&&s.enable(4),S.envMap&&s.enable(5),S.normalMapObjectSpace&&s.enable(6),S.normalMapTangentSpace&&s.enable(7),S.clearcoat&&s.enable(8),S.iridescence&&s.enable(9),S.alphaTest&&s.enable(10),S.vertexColors&&s.enable(11),S.vertexAlphas&&s.enable(12),S.vertexUv1s&&s.enable(13),S.vertexUv2s&&s.enable(14),S.vertexUv3s&&s.enable(15),S.vertexTangents&&s.enable(16),S.anisotropy&&s.enable(17),S.alphaHash&&s.enable(18),S.batching&&s.enable(19),S.dispersion&&s.enable(20),S.batchingColor&&s.enable(21),b.push(s.mask),s.disableAll(),S.fog&&s.enable(0),S.useFog&&s.enable(1),S.flatShading&&s.enable(2),S.logarithmicDepthBuffer&&s.enable(3),S.reverseDepthBuffer&&s.enable(4),S.skinning&&s.enable(5),S.morphTargets&&s.enable(6),S.morphNormals&&s.enable(7),S.morphColors&&s.enable(8),S.premultipliedAlpha&&s.enable(9),S.shadowMapEnabled&&s.enable(10),S.doubleSided&&s.enable(11),S.flipSided&&s.enable(12),S.useDepthPacking&&s.enable(13),S.dithering&&s.enable(14),S.transmission&&s.enable(15),S.sheen&&s.enable(16),S.opaque&&s.enable(17),S.pointsUvs&&s.enable(18),S.decodeVideoTexture&&s.enable(19),S.decodeVideoTextureEmissive&&s.enable(20),S.alphaToCoverage&&s.enable(21),b.push(s.mask)}function v(b){let S=m[b.type],T;if(S){let B=xi[S];T=kv.clone(B.uniforms)}else T=b.uniforms;return T}function I(b,S){let T;for(let B=0,F=c.length;B<F;B++){let G=c[B];if(G.cacheKey===S){T=G,++T.usedTimes;break}}return T===void 0&&(T=new YM(n,S,b,a),c.push(T)),T}function E(b){if(--b.usedTimes===0){let S=c.indexOf(b);c[S]=c[c.length-1],c.pop(),b.destroy()}}function P(b){l.remove(b)}function L(){l.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:v,acquireProgram:I,releaseProgram:E,releaseShaderCache:P,programs:c,dispose:L}}function $M(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let s=n.get(o);return s===void 0&&(s={},n.set(o,s)),s}function i(o){n.delete(o)}function r(o,s,l){n.get(o)[s]=l}function a(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:a}}function JM(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function um(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function dm(){let n=[],e=0,t=[],i=[],r=[];function a(){e=0,t.length=0,i.length=0,r.length=0}function o(d,f,h,m,x,g){let p=n[e];return p===void 0?(p={id:d.id,object:d,geometry:f,material:h,groupOrder:m,renderOrder:d.renderOrder,z:x,group:g},n[e]=p):(p.id=d.id,p.object=d,p.geometry=f,p.material=h,p.groupOrder=m,p.renderOrder=d.renderOrder,p.z=x,p.group=g),e++,p}function s(d,f,h,m,x,g){let p=o(d,f,h,m,x,g);h.transmission>0?i.push(p):h.transparent===!0?r.push(p):t.push(p)}function l(d,f,h,m,x,g){let p=o(d,f,h,m,x,g);h.transmission>0?i.unshift(p):h.transparent===!0?r.unshift(p):t.unshift(p)}function u(d,f){t.length>1&&t.sort(d||JM),i.length>1&&i.sort(f||um),r.length>1&&r.sort(f||um)}function c(){for(let d=e,f=n.length;d<f;d++){let h=n[d];if(h.id===null)break;h.id=null,h.object=null,h.geometry=null,h.material=null,h.group=null}}return{opaque:t,transmissive:i,transparent:r,init:a,push:s,unshift:l,finish:c,sort:u}}function jM(){let n=new WeakMap;function e(i,r){let a=n.get(i),o;return a===void 0?(o=new dm,n.set(i,[o])):r>=a.length?(o=new dm,a.push(o)):o=a[r],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function QM(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new z,color:new Je};break;case"SpotLight":t={position:new z,direction:new z,color:new Je,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new z,color:new Je,distance:0,decay:0};break;case"HemisphereLight":t={direction:new z,skyColor:new Je,groundColor:new Je};break;case"RectAreaLight":t={color:new Je,position:new z,halfWidth:new z,halfHeight:new z};break}return n[e.id]=t,t}}}function eS(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Le};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Le};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Le,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var tS=0;function nS(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function iS(n){let e=new QM,t=eS(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)i.probe.push(new z);let r=new z,a=new wt,o=new wt;function s(u){let c=0,d=0,f=0;for(let b=0;b<9;b++)i.probe[b].set(0,0,0);let h=0,m=0,x=0,g=0,p=0,y=0,_=0,v=0,I=0,E=0,P=0;u.sort(nS);for(let b=0,S=u.length;b<S;b++){let T=u[b],B=T.color,F=T.intensity,G=T.distance,U=T.shadow&&T.shadow.map?T.shadow.map.texture:null;if(T.isAmbientLight)c+=B.r*F,d+=B.g*F,f+=B.b*F;else if(T.isLightProbe){for(let N=0;N<9;N++)i.probe[N].addScaledVector(T.sh.coefficients[N],F);P++}else if(T.isDirectionalLight){let N=e.get(T);if(N.color.copy(T.color).multiplyScalar(T.intensity),T.castShadow){let te=T.shadow,D=t.get(T);D.shadowIntensity=te.intensity,D.shadowBias=te.bias,D.shadowNormalBias=te.normalBias,D.shadowRadius=te.radius,D.shadowMapSize=te.mapSize,i.directionalShadow[h]=D,i.directionalShadowMap[h]=U,i.directionalShadowMatrix[h]=T.shadow.matrix,y++}i.directional[h]=N,h++}else if(T.isSpotLight){let N=e.get(T);N.position.setFromMatrixPosition(T.matrixWorld),N.color.copy(B).multiplyScalar(F),N.distance=G,N.coneCos=Math.cos(T.angle),N.penumbraCos=Math.cos(T.angle*(1-T.penumbra)),N.decay=T.decay,i.spot[x]=N;let te=T.shadow;if(T.map&&(i.spotLightMap[I]=T.map,I++,te.updateMatrices(T),T.castShadow&&E++),i.spotLightMatrix[x]=te.matrix,T.castShadow){let D=t.get(T);D.shadowIntensity=te.intensity,D.shadowBias=te.bias,D.shadowNormalBias=te.normalBias,D.shadowRadius=te.radius,D.shadowMapSize=te.mapSize,i.spotShadow[x]=D,i.spotShadowMap[x]=U,v++}x++}else if(T.isRectAreaLight){let N=e.get(T);N.color.copy(B).multiplyScalar(F),N.halfWidth.set(T.width*.5,0,0),N.halfHeight.set(0,T.height*.5,0),i.rectArea[g]=N,g++}else if(T.isPointLight){let N=e.get(T);if(N.color.copy(T.color).multiplyScalar(T.intensity),N.distance=T.distance,N.decay=T.decay,T.castShadow){let te=T.shadow,D=t.get(T);D.shadowIntensity=te.intensity,D.shadowBias=te.bias,D.shadowNormalBias=te.normalBias,D.shadowRadius=te.radius,D.shadowMapSize=te.mapSize,D.shadowCameraNear=te.camera.near,D.shadowCameraFar=te.camera.far,i.pointShadow[m]=D,i.pointShadowMap[m]=U,i.pointShadowMatrix[m]=T.shadow.matrix,_++}i.point[m]=N,m++}else if(T.isHemisphereLight){let N=e.get(T);N.skyColor.copy(T.color).multiplyScalar(F),N.groundColor.copy(T.groundColor).multiplyScalar(F),i.hemi[p]=N,p++}}g>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Ae.LTC_FLOAT_1,i.rectAreaLTC2=Ae.LTC_FLOAT_2):(i.rectAreaLTC1=Ae.LTC_HALF_1,i.rectAreaLTC2=Ae.LTC_HALF_2)),i.ambient[0]=c,i.ambient[1]=d,i.ambient[2]=f;let L=i.hash;(L.directionalLength!==h||L.pointLength!==m||L.spotLength!==x||L.rectAreaLength!==g||L.hemiLength!==p||L.numDirectionalShadows!==y||L.numPointShadows!==_||L.numSpotShadows!==v||L.numSpotMaps!==I||L.numLightProbes!==P)&&(i.directional.length=h,i.spot.length=x,i.rectArea.length=g,i.point.length=m,i.hemi.length=p,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=_,i.pointShadowMap.length=_,i.spotShadow.length=v,i.spotShadowMap.length=v,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=_,i.spotLightMatrix.length=v+I-E,i.spotLightMap.length=I,i.numSpotLightShadowsWithMaps=E,i.numLightProbes=P,L.directionalLength=h,L.pointLength=m,L.spotLength=x,L.rectAreaLength=g,L.hemiLength=p,L.numDirectionalShadows=y,L.numPointShadows=_,L.numSpotShadows=v,L.numSpotMaps=I,L.numLightProbes=P,i.version=tS++)}function l(u,c){let d=0,f=0,h=0,m=0,x=0,g=c.matrixWorldInverse;for(let p=0,y=u.length;p<y;p++){let _=u[p];if(_.isDirectionalLight){let v=i.directional[d];v.direction.setFromMatrixPosition(_.matrixWorld),r.setFromMatrixPosition(_.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(g),d++}else if(_.isSpotLight){let v=i.spot[h];v.position.setFromMatrixPosition(_.matrixWorld),v.position.applyMatrix4(g),v.direction.setFromMatrixPosition(_.matrixWorld),r.setFromMatrixPosition(_.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(g),h++}else if(_.isRectAreaLight){let v=i.rectArea[m];v.position.setFromMatrixPosition(_.matrixWorld),v.position.applyMatrix4(g),o.identity(),a.copy(_.matrixWorld),a.premultiply(g),o.extractRotation(a),v.halfWidth.set(_.width*.5,0,0),v.halfHeight.set(0,_.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),m++}else if(_.isPointLight){let v=i.point[f];v.position.setFromMatrixPosition(_.matrixWorld),v.position.applyMatrix4(g),f++}else if(_.isHemisphereLight){let v=i.hemi[x];v.direction.setFromMatrixPosition(_.matrixWorld),v.direction.transformDirection(g),x++}}}return{setup:s,setupView:l,state:i}}function fm(n){let e=new iS(n),t=[],i=[];function r(c){u.camera=c,t.length=0,i.length=0}function a(c){t.push(c)}function o(c){i.push(c)}function s(){e.setup(t)}function l(c){e.setupView(t,c)}let u={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:u,setupLights:s,setupLightsView:l,pushLight:a,pushShadow:o}}function rS(n){let e=new WeakMap;function t(r,a=0){let o=e.get(r),s;return o===void 0?(s=new fm(n),e.set(r,[s])):a>=o.length?(s=new fm(n),o.push(s)):s=o[a],s}function i(){e=new WeakMap}return{get:t,dispose:i}}var Rd=class extends Mi{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=$x,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Pd=class extends Mi{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},aS=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,oS=`uniform sampler2D shadow_pass;
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
}`;function sS(n,e,t){let i=new Dr,r=new Le,a=new Le,o=new Ht,s=new Rd({depthPacking:Jx}),l=new Pd,u={},c=t.maxTextureSize,d={[rr]:Qt,[Qt]:rr,[ni]:ni},f=new Tn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Le},radius:{value:4}},vertexShader:aS,fragmentShader:oS}),h=f.clone();h.defines.HORIZONTAL_PASS=1;let m=new Vt;m.setAttribute("position",new Fn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new Ft(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Cm;let p=this.type;this.render=function(E,P,L){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||E.length===0)return;let b=n.getRenderTarget(),S=n.getActiveCubeFace(),T=n.getActiveMipmapLevel(),B=n.state;B.setBlending(nr),B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);let F=p!==Oi&&this.type===Oi,G=p===Oi&&this.type!==Oi;for(let U=0,N=E.length;U<N;U++){let te=E[U],D=te.shadow;if(D===void 0){console.warn("THREE.WebGLShadowMap:",te,"has no shadow.");continue}if(D.autoUpdate===!1&&D.needsUpdate===!1)continue;r.copy(D.mapSize);let k=D.getFrameExtents();if(r.multiply(k),a.copy(D.mapSize),(r.x>c||r.y>c)&&(r.x>c&&(a.x=Math.floor(c/k.x),r.x=a.x*k.x,D.mapSize.x=a.x),r.y>c&&(a.y=Math.floor(c/k.y),r.y=a.y*k.y,D.mapSize.y=a.y)),D.map===null||F===!0||G===!0){let $=this.type!==Oi?{minFilter:ai,magFilter:ai}:{};D.map!==null&&D.map.dispose(),D.map=new Gi(r.x,r.y,$),D.map.texture.name=te.name+".shadowMap",D.camera.updateProjectionMatrix()}n.setRenderTarget(D.map),n.clear();let J=D.getViewportCount();for(let $=0;$<J;$++){let re=D.getViewport($);o.set(a.x*re.x,a.y*re.y,a.x*re.z,a.y*re.w),B.viewport(o),D.updateMatrices(te,$),i=D.getFrustum(),v(P,L,D.camera,te,this.type)}D.isPointLightShadow!==!0&&this.type===Oi&&y(D,L),D.needsUpdate=!1}p=this.type,g.needsUpdate=!1,n.setRenderTarget(b,S,T)};function y(E,P){let L=e.update(x);f.defines.VSM_SAMPLES!==E.blurSamples&&(f.defines.VSM_SAMPLES=E.blurSamples,h.defines.VSM_SAMPLES=E.blurSamples,f.needsUpdate=!0,h.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new Gi(r.x,r.y)),f.uniforms.shadow_pass.value=E.map.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,n.setRenderTarget(E.mapPass),n.clear(),n.renderBufferDirect(P,null,L,f,x,null),h.uniforms.shadow_pass.value=E.mapPass.texture,h.uniforms.resolution.value=E.mapSize,h.uniforms.radius.value=E.radius,n.setRenderTarget(E.map),n.clear(),n.renderBufferDirect(P,null,L,h,x,null)}function _(E,P,L,b){let S=null,T=L.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(T!==void 0)S=T;else if(S=L.isPointLight===!0?l:s,n.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0){let B=S.uuid,F=P.uuid,G=u[B];G===void 0&&(G={},u[B]=G);let U=G[F];U===void 0&&(U=S.clone(),G[F]=U,P.addEventListener("dispose",I)),S=U}if(S.visible=P.visible,S.wireframe=P.wireframe,b===Oi?S.side=P.shadowSide!==null?P.shadowSide:P.side:S.side=P.shadowSide!==null?P.shadowSide:d[P.side],S.alphaMap=P.alphaMap,S.alphaTest=P.alphaTest,S.map=P.map,S.clipShadows=P.clipShadows,S.clippingPlanes=P.clippingPlanes,S.clipIntersection=P.clipIntersection,S.displacementMap=P.displacementMap,S.displacementScale=P.displacementScale,S.displacementBias=P.displacementBias,S.wireframeLinewidth=P.wireframeLinewidth,S.linewidth=P.linewidth,L.isPointLight===!0&&S.isMeshDistanceMaterial===!0){let B=n.properties.get(S);B.light=L}return S}function v(E,P,L,b,S){if(E.visible===!1)return;if(E.layers.test(P.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&S===Oi)&&(!E.frustumCulled||i.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,E.matrixWorld);let F=e.update(E),G=E.material;if(Array.isArray(G)){let U=F.groups;for(let N=0,te=U.length;N<te;N++){let D=U[N],k=G[D.materialIndex];if(k&&k.visible){let J=_(E,k,b,S);E.onBeforeShadow(n,E,P,L,F,J,D),n.renderBufferDirect(L,null,F,J,E,D),E.onAfterShadow(n,E,P,L,F,J,D)}}}else if(G.visible){let U=_(E,G,b,S);E.onBeforeShadow(n,E,P,L,F,U,null),n.renderBufferDirect(L,null,F,U,E,null),E.onAfterShadow(n,E,P,L,F,U,null)}}let B=E.children;for(let F=0,G=B.length;F<G;F++)v(B[F],P,L,b,S)}function I(E){E.target.removeEventListener("dispose",I);for(let L in u){let b=u[L],S=E.target.uuid;S in b&&(b[S].dispose(),delete b[S])}}}var lS={[Du]:Uu,[Nu]:Bu,[Fu]:ku,[ga]:Ou,[Uu]:Du,[Bu]:Nu,[ku]:Fu,[Ou]:ga};function cS(n,e){function t(){let R=!1,ee=new Ht,V=null,Z=new Ht(0,0,0,0);return{setMask:function(ce){V!==ce&&!R&&(n.colorMask(ce,ce,ce,ce),V=ce)},setLocked:function(ce){R=ce},setClear:function(ce,se,Se,$e,et){et===!0&&(ce*=$e,se*=$e,Se*=$e),ee.set(ce,se,Se,$e),Z.equals(ee)===!1&&(n.clearColor(ce,se,Se,$e),Z.copy(ee))},reset:function(){R=!1,V=null,Z.set(-1,0,0,0)}}}function i(){let R=!1,ee=!1,V=null,Z=null,ce=null;return{setReversed:function(se){if(ee!==se){let Se=e.get("EXT_clip_control");ee?Se.clipControlEXT(Se.LOWER_LEFT_EXT,Se.ZERO_TO_ONE_EXT):Se.clipControlEXT(Se.LOWER_LEFT_EXT,Se.NEGATIVE_ONE_TO_ONE_EXT);let $e=ce;ce=null,this.setClear($e)}ee=se},getReversed:function(){return ee},setTest:function(se){se?ae(n.DEPTH_TEST):fe(n.DEPTH_TEST)},setMask:function(se){V!==se&&!R&&(n.depthMask(se),V=se)},setFunc:function(se){if(ee&&(se=lS[se]),Z!==se){switch(se){case Du:n.depthFunc(n.NEVER);break;case Uu:n.depthFunc(n.ALWAYS);break;case Nu:n.depthFunc(n.LESS);break;case ga:n.depthFunc(n.LEQUAL);break;case Fu:n.depthFunc(n.EQUAL);break;case Ou:n.depthFunc(n.GEQUAL);break;case Bu:n.depthFunc(n.GREATER);break;case ku:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Z=se}},setLocked:function(se){R=se},setClear:function(se){ce!==se&&(ee&&(se=1-se),n.clearDepth(se),ce=se)},reset:function(){R=!1,V=null,Z=null,ce=null,ee=!1}}}function r(){let R=!1,ee=null,V=null,Z=null,ce=null,se=null,Se=null,$e=null,et=null;return{setTest:function(Ye){R||(Ye?ae(n.STENCIL_TEST):fe(n.STENCIL_TEST))},setMask:function(Ye){ee!==Ye&&!R&&(n.stencilMask(Ye),ee=Ye)},setFunc:function(Ye,At,yt){(V!==Ye||Z!==At||ce!==yt)&&(n.stencilFunc(Ye,At,yt),V=Ye,Z=At,ce=yt)},setOp:function(Ye,At,yt){(se!==Ye||Se!==At||$e!==yt)&&(n.stencilOp(Ye,At,yt),se=Ye,Se=At,$e=yt)},setLocked:function(Ye){R=Ye},setClear:function(Ye){et!==Ye&&(n.clearStencil(Ye),et=Ye)},reset:function(){R=!1,ee=null,V=null,Z=null,ce=null,se=null,Se=null,$e=null,et=null}}}let a=new t,o=new i,s=new r,l=new WeakMap,u=new WeakMap,c={},d={},f=new WeakMap,h=[],m=null,x=!1,g=null,p=null,y=null,_=null,v=null,I=null,E=null,P=new Je(0,0,0),L=0,b=!1,S=null,T=null,B=null,F=null,G=null,U=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),N=!1,te=0,D=n.getParameter(n.VERSION);D.indexOf("WebGL")!==-1?(te=parseFloat(/^WebGL (\d)/.exec(D)[1]),N=te>=1):D.indexOf("OpenGL ES")!==-1&&(te=parseFloat(/^OpenGL ES (\d)/.exec(D)[1]),N=te>=2);let k=null,J={},$=n.getParameter(n.SCISSOR_BOX),re=n.getParameter(n.VIEWPORT),le=new Ht().fromArray($),q=new Ht().fromArray(re);function W(R,ee,V,Z){let ce=new Uint8Array(4),se=n.createTexture();n.bindTexture(R,se),n.texParameteri(R,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(R,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Se=0;Se<V;Se++)R===n.TEXTURE_3D||R===n.TEXTURE_2D_ARRAY?n.texImage3D(ee,0,n.RGBA,1,1,Z,0,n.RGBA,n.UNSIGNED_BYTE,ce):n.texImage2D(ee+Se,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ce);return se}let j={};j[n.TEXTURE_2D]=W(n.TEXTURE_2D,n.TEXTURE_2D,1),j[n.TEXTURE_CUBE_MAP]=W(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),j[n.TEXTURE_2D_ARRAY]=W(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),j[n.TEXTURE_3D]=W(n.TEXTURE_3D,n.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),ae(n.DEPTH_TEST),o.setFunc(ga),De(!1),_e(mp),ae(n.CULL_FACE),O(nr);function ae(R){c[R]!==!0&&(n.enable(R),c[R]=!0)}function fe(R){c[R]!==!1&&(n.disable(R),c[R]=!1)}function me(R,ee){return d[R]!==ee?(n.bindFramebuffer(R,ee),d[R]=ee,R===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=ee),R===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=ee),!0):!1}function ue(R,ee){let V=h,Z=!1;if(R){V=f.get(ee),V===void 0&&(V=[],f.set(ee,V));let ce=R.textures;if(V.length!==ce.length||V[0]!==n.COLOR_ATTACHMENT0){for(let se=0,Se=ce.length;se<Se;se++)V[se]=n.COLOR_ATTACHMENT0+se;V.length=ce.length,Z=!0}}else V[0]!==n.BACK&&(V[0]=n.BACK,Z=!0);Z&&n.drawBuffers(V)}function Ce(R){return m!==R?(n.useProgram(R),m=R,!0):!1}let Te={[Er]:n.FUNC_ADD,[wx]:n.FUNC_SUBTRACT,[Ax]:n.FUNC_REVERSE_SUBTRACT};Te[Ex]=n.MIN,Te[Tx]=n.MAX;let Pe={[Cx]:n.ZERO,[Rx]:n.ONE,[Px]:n.SRC_COLOR,[Iu]:n.SRC_ALPHA,[Fx]:n.SRC_ALPHA_SATURATE,[Ux]:n.DST_COLOR,[Lx]:n.DST_ALPHA,[Ix]:n.ONE_MINUS_SRC_COLOR,[Lu]:n.ONE_MINUS_SRC_ALPHA,[Nx]:n.ONE_MINUS_DST_COLOR,[Dx]:n.ONE_MINUS_DST_ALPHA,[Ox]:n.CONSTANT_COLOR,[Bx]:n.ONE_MINUS_CONSTANT_COLOR,[kx]:n.CONSTANT_ALPHA,[zx]:n.ONE_MINUS_CONSTANT_ALPHA};function O(R,ee,V,Z,ce,se,Se,$e,et,Ye){if(R===nr){x===!0&&(fe(n.BLEND),x=!1);return}if(x===!1&&(ae(n.BLEND),x=!0),R!==bx){if(R!==g||Ye!==b){if((p!==Er||v!==Er)&&(n.blendEquation(n.FUNC_ADD),p=Er,v=Er),Ye)switch(R){case fa:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case cl:n.blendFunc(n.ONE,n.ONE);break;case gp:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case xp:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}else switch(R){case fa:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case cl:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case gp:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case xp:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}y=null,_=null,I=null,E=null,P.set(0,0,0),L=0,g=R,b=Ye}return}ce=ce||ee,se=se||V,Se=Se||Z,(ee!==p||ce!==v)&&(n.blendEquationSeparate(Te[ee],Te[ce]),p=ee,v=ce),(V!==y||Z!==_||se!==I||Se!==E)&&(n.blendFuncSeparate(Pe[V],Pe[Z],Pe[se],Pe[Se]),y=V,_=Z,I=se,E=Se),($e.equals(P)===!1||et!==L)&&(n.blendColor($e.r,$e.g,$e.b,et),P.copy($e),L=et),g=R,b=!1}function Oe(R,ee){R.side===ni?fe(n.CULL_FACE):ae(n.CULL_FACE);let V=R.side===Qt;ee&&(V=!V),De(V),R.blending===fa&&R.transparent===!1?O(nr):O(R.blending,R.blendEquation,R.blendSrc,R.blendDst,R.blendEquationAlpha,R.blendSrcAlpha,R.blendDstAlpha,R.blendColor,R.blendAlpha,R.premultipliedAlpha),o.setFunc(R.depthFunc),o.setTest(R.depthTest),o.setMask(R.depthWrite),a.setMask(R.colorWrite);let Z=R.stencilWrite;s.setTest(Z),Z&&(s.setMask(R.stencilWriteMask),s.setFunc(R.stencilFunc,R.stencilRef,R.stencilFuncMask),s.setOp(R.stencilFail,R.stencilZFail,R.stencilZPass)),Ue(R.polygonOffset,R.polygonOffsetFactor,R.polygonOffsetUnits),R.alphaToCoverage===!0?ae(n.SAMPLE_ALPHA_TO_COVERAGE):fe(n.SAMPLE_ALPHA_TO_COVERAGE)}function De(R){S!==R&&(R?n.frontFace(n.CW):n.frontFace(n.CCW),S=R)}function _e(R){R!==_x?(ae(n.CULL_FACE),R!==T&&(R===mp?n.cullFace(n.BACK):R===Mx?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):fe(n.CULL_FACE),T=R}function pe(R){R!==B&&(N&&n.lineWidth(R),B=R)}function Ue(R,ee,V){R?(ae(n.POLYGON_OFFSET_FILL),(F!==ee||G!==V)&&(n.polygonOffset(ee,V),F=ee,G=V)):fe(n.POLYGON_OFFSET_FILL)}function xe(R){R?ae(n.SCISSOR_TEST):fe(n.SCISSOR_TEST)}function C(R){R===void 0&&(R=n.TEXTURE0+U-1),k!==R&&(n.activeTexture(R),k=R)}function w(R,ee,V){V===void 0&&(k===null?V=n.TEXTURE0+U-1:V=k);let Z=J[V];Z===void 0&&(Z={type:void 0,texture:void 0},J[V]=Z),(Z.type!==R||Z.texture!==ee)&&(k!==V&&(n.activeTexture(V),k=V),n.bindTexture(R,ee||j[R]),Z.type=R,Z.texture=ee)}function X(){let R=J[k];R!==void 0&&R.type!==void 0&&(n.bindTexture(R.type,null),R.type=void 0,R.texture=void 0)}function ne(){try{n.compressedTexImage2D.apply(n,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function oe(){try{n.compressedTexImage3D.apply(n,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function ie(){try{n.texSubImage2D.apply(n,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function be(){try{n.texSubImage3D.apply(n,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function he(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function ge(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Ge(){try{n.texStorage2D.apply(n,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function de(){try{n.texStorage3D.apply(n,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function we(){try{n.texImage2D.apply(n,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function M(){try{n.texImage3D.apply(n,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Re(R){le.equals(R)===!1&&(n.scissor(R.x,R.y,R.z,R.w),le.copy(R))}function Me(R){q.equals(R)===!1&&(n.viewport(R.x,R.y,R.z,R.w),q.copy(R))}function We(R,ee){let V=u.get(ee);V===void 0&&(V=new WeakMap,u.set(ee,V));let Z=V.get(R);Z===void 0&&(Z=n.getUniformBlockIndex(ee,R.name),V.set(R,Z))}function He(R,ee){let Z=u.get(ee).get(R);l.get(ee)!==Z&&(n.uniformBlockBinding(ee,Z,R.__bindingPointIndex),l.set(ee,Z))}function Xe(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),c={},k=null,J={},d={},f=new WeakMap,h=[],m=null,x=!1,g=null,p=null,y=null,_=null,v=null,I=null,E=null,P=new Je(0,0,0),L=0,b=!1,S=null,T=null,B=null,F=null,G=null,le.set(0,0,n.canvas.width,n.canvas.height),q.set(0,0,n.canvas.width,n.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:ae,disable:fe,bindFramebuffer:me,drawBuffers:ue,useProgram:Ce,setBlending:O,setMaterial:Oe,setFlipSided:De,setCullFace:_e,setLineWidth:pe,setPolygonOffset:Ue,setScissorTest:xe,activeTexture:C,bindTexture:w,unbindTexture:X,compressedTexImage2D:ne,compressedTexImage3D:oe,texImage2D:we,texImage3D:M,updateUBOMapping:We,uniformBlockBinding:He,texStorage2D:Ge,texStorage3D:de,texSubImage2D:ie,texSubImage3D:be,compressedTexSubImage2D:he,compressedTexSubImage3D:ge,scissor:Re,viewport:Me,reset:Xe}}function hm(n,e,t,i){let r=uS(i);switch(t){case Um:return n*e;case Fm:return n*e;case Om:return n*e*2;case Bm:return n*e/r.components*r.byteLength;case sf:return n*e/r.components*r.byteLength;case km:return n*e*2/r.components*r.byteLength;case lf:return n*e*2/r.components*r.byteLength;case Nm:return n*e*3/r.components*r.byteLength;case ri:return n*e*4/r.components*r.byteLength;case cf:return n*e*4/r.components*r.byteLength;case rl:case al:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case ol:case sl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case qu:case Yu:return Math.max(n,16)*Math.max(e,8)/4;case Wu:case Xu:return Math.max(n,8)*Math.max(e,8)/2;case Zu:case Ku:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case $u:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ju:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case ju:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Qu:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case ed:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case td:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case nd:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case id:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case rd:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case ad:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case od:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case sd:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case ld:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case cd:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case ud:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case ll:case dd:case fd:return Math.ceil(n/4)*Math.ceil(e/4)*16;case zm:case hd:return Math.ceil(n/4)*Math.ceil(e/4)*8;case pd:case md:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function uS(n){switch(n){case Vi:case Im:return{byteLength:1,components:1};case xo:case Lm:case Io:return{byteLength:2,components:1};case af:case of:return{byteLength:2,components:4};case Pr:case rf:case ki:return{byteLength:4,components:1};case Dm:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function dS(n,e,t,i,r,a,o){let s=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new Le,c=new WeakMap,d,f=new WeakMap,h=!1;try{h=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(C,w){return h?new OffscreenCanvas(C,w):yo("canvas")}function x(C,w,X){let ne=1,oe=xe(C);if((oe.width>X||oe.height>X)&&(ne=X/Math.max(oe.width,oe.height)),ne<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){let ie=Math.floor(ne*oe.width),be=Math.floor(ne*oe.height);d===void 0&&(d=m(ie,be));let he=w?m(ie,be):d;return he.width=ie,he.height=be,he.getContext("2d").drawImage(C,0,0,ie,be),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+oe.width+"x"+oe.height+") to ("+ie+"x"+be+")."),he}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+oe.width+"x"+oe.height+")."),C;return C}function g(C){return C.generateMipmaps}function p(C){n.generateMipmap(C)}function y(C){return C.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?n.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function _(C,w,X,ne,oe=!1){if(C!==null){if(n[C]!==void 0)return n[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let ie=w;if(w===n.RED&&(X===n.FLOAT&&(ie=n.R32F),X===n.HALF_FLOAT&&(ie=n.R16F),X===n.UNSIGNED_BYTE&&(ie=n.R8)),w===n.RED_INTEGER&&(X===n.UNSIGNED_BYTE&&(ie=n.R8UI),X===n.UNSIGNED_SHORT&&(ie=n.R16UI),X===n.UNSIGNED_INT&&(ie=n.R32UI),X===n.BYTE&&(ie=n.R8I),X===n.SHORT&&(ie=n.R16I),X===n.INT&&(ie=n.R32I)),w===n.RG&&(X===n.FLOAT&&(ie=n.RG32F),X===n.HALF_FLOAT&&(ie=n.RG16F),X===n.UNSIGNED_BYTE&&(ie=n.RG8)),w===n.RG_INTEGER&&(X===n.UNSIGNED_BYTE&&(ie=n.RG8UI),X===n.UNSIGNED_SHORT&&(ie=n.RG16UI),X===n.UNSIGNED_INT&&(ie=n.RG32UI),X===n.BYTE&&(ie=n.RG8I),X===n.SHORT&&(ie=n.RG16I),X===n.INT&&(ie=n.RG32I)),w===n.RGB_INTEGER&&(X===n.UNSIGNED_BYTE&&(ie=n.RGB8UI),X===n.UNSIGNED_SHORT&&(ie=n.RGB16UI),X===n.UNSIGNED_INT&&(ie=n.RGB32UI),X===n.BYTE&&(ie=n.RGB8I),X===n.SHORT&&(ie=n.RGB16I),X===n.INT&&(ie=n.RGB32I)),w===n.RGBA_INTEGER&&(X===n.UNSIGNED_BYTE&&(ie=n.RGBA8UI),X===n.UNSIGNED_SHORT&&(ie=n.RGBA16UI),X===n.UNSIGNED_INT&&(ie=n.RGBA32UI),X===n.BYTE&&(ie=n.RGBA8I),X===n.SHORT&&(ie=n.RGBA16I),X===n.INT&&(ie=n.RGBA32I)),w===n.RGB&&X===n.UNSIGNED_INT_5_9_9_9_REV&&(ie=n.RGB9_E5),w===n.RGBA){let be=oe?zl:gt.getTransfer(ne);X===n.FLOAT&&(ie=n.RGBA32F),X===n.HALF_FLOAT&&(ie=n.RGBA16F),X===n.UNSIGNED_BYTE&&(ie=be===Et?n.SRGB8_ALPHA8:n.RGBA8),X===n.UNSIGNED_SHORT_4_4_4_4&&(ie=n.RGBA4),X===n.UNSIGNED_SHORT_5_5_5_1&&(ie=n.RGB5_A1)}return(ie===n.R16F||ie===n.R32F||ie===n.RG16F||ie===n.RG32F||ie===n.RGBA16F||ie===n.RGBA32F)&&e.get("EXT_color_buffer_float"),ie}function v(C,w){let X;return C?w===null||w===Pr||w===ya?X=n.DEPTH24_STENCIL8:w===ki?X=n.DEPTH32F_STENCIL8:w===xo&&(X=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===Pr||w===ya?X=n.DEPTH_COMPONENT24:w===ki?X=n.DEPTH_COMPONENT32F:w===xo&&(X=n.DEPTH_COMPONENT16),X}function I(C,w){return g(C)===!0||C.isFramebufferTexture&&C.minFilter!==ai&&C.minFilter!==vi?Math.log2(Math.max(w.width,w.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?w.mipmaps.length:1}function E(C){let w=C.target;w.removeEventListener("dispose",E),L(w),w.isVideoTexture&&c.delete(w)}function P(C){let w=C.target;w.removeEventListener("dispose",P),S(w)}function L(C){let w=i.get(C);if(w.__webglInit===void 0)return;let X=C.source,ne=f.get(X);if(ne){let oe=ne[w.__cacheKey];oe.usedTimes--,oe.usedTimes===0&&b(C),Object.keys(ne).length===0&&f.delete(X)}i.remove(C)}function b(C){let w=i.get(C);n.deleteTexture(w.__webglTexture);let X=C.source,ne=f.get(X);delete ne[w.__cacheKey],o.memory.textures--}function S(C){let w=i.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),i.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let ne=0;ne<6;ne++){if(Array.isArray(w.__webglFramebuffer[ne]))for(let oe=0;oe<w.__webglFramebuffer[ne].length;oe++)n.deleteFramebuffer(w.__webglFramebuffer[ne][oe]);else n.deleteFramebuffer(w.__webglFramebuffer[ne]);w.__webglDepthbuffer&&n.deleteRenderbuffer(w.__webglDepthbuffer[ne])}else{if(Array.isArray(w.__webglFramebuffer))for(let ne=0;ne<w.__webglFramebuffer.length;ne++)n.deleteFramebuffer(w.__webglFramebuffer[ne]);else n.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&n.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&n.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let ne=0;ne<w.__webglColorRenderbuffer.length;ne++)w.__webglColorRenderbuffer[ne]&&n.deleteRenderbuffer(w.__webglColorRenderbuffer[ne]);w.__webglDepthRenderbuffer&&n.deleteRenderbuffer(w.__webglDepthRenderbuffer)}let X=C.textures;for(let ne=0,oe=X.length;ne<oe;ne++){let ie=i.get(X[ne]);ie.__webglTexture&&(n.deleteTexture(ie.__webglTexture),o.memory.textures--),i.remove(X[ne])}i.remove(C)}let T=0;function B(){T=0}function F(){let C=T;return C>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+r.maxTextures),T+=1,C}function G(C){let w=[];return w.push(C.wrapS),w.push(C.wrapT),w.push(C.wrapR||0),w.push(C.magFilter),w.push(C.minFilter),w.push(C.anisotropy),w.push(C.internalFormat),w.push(C.format),w.push(C.type),w.push(C.generateMipmaps),w.push(C.premultiplyAlpha),w.push(C.flipY),w.push(C.unpackAlignment),w.push(C.colorSpace),w.join()}function U(C,w){let X=i.get(C);if(C.isVideoTexture&&pe(C),C.isRenderTargetTexture===!1&&C.version>0&&X.__version!==C.version){let ne=C.image;if(ne===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ne.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{q(X,C,w);return}}t.bindTexture(n.TEXTURE_2D,X.__webglTexture,n.TEXTURE0+w)}function N(C,w){let X=i.get(C);if(C.version>0&&X.__version!==C.version){q(X,C,w);return}t.bindTexture(n.TEXTURE_2D_ARRAY,X.__webglTexture,n.TEXTURE0+w)}function te(C,w){let X=i.get(C);if(C.version>0&&X.__version!==C.version){q(X,C,w);return}t.bindTexture(n.TEXTURE_3D,X.__webglTexture,n.TEXTURE0+w)}function D(C,w){let X=i.get(C);if(C.version>0&&X.__version!==C.version){W(X,C,w);return}t.bindTexture(n.TEXTURE_CUBE_MAP,X.__webglTexture,n.TEXTURE0+w)}let k={[Vu]:n.REPEAT,[Cr]:n.CLAMP_TO_EDGE,[Gu]:n.MIRRORED_REPEAT},J={[ai]:n.NEAREST,[Kx]:n.NEAREST_MIPMAP_NEAREST,[Es]:n.NEAREST_MIPMAP_LINEAR,[vi]:n.LINEAR,[Jc]:n.LINEAR_MIPMAP_NEAREST,[Rr]:n.LINEAR_MIPMAP_LINEAR},$={[Qx]:n.NEVER,[av]:n.ALWAYS,[ev]:n.LESS,[Vm]:n.LEQUAL,[tv]:n.EQUAL,[rv]:n.GEQUAL,[nv]:n.GREATER,[iv]:n.NOTEQUAL};function re(C,w){if(w.type===ki&&e.has("OES_texture_float_linear")===!1&&(w.magFilter===vi||w.magFilter===Jc||w.magFilter===Es||w.magFilter===Rr||w.minFilter===vi||w.minFilter===Jc||w.minFilter===Es||w.minFilter===Rr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(C,n.TEXTURE_WRAP_S,k[w.wrapS]),n.texParameteri(C,n.TEXTURE_WRAP_T,k[w.wrapT]),(C===n.TEXTURE_3D||C===n.TEXTURE_2D_ARRAY)&&n.texParameteri(C,n.TEXTURE_WRAP_R,k[w.wrapR]),n.texParameteri(C,n.TEXTURE_MAG_FILTER,J[w.magFilter]),n.texParameteri(C,n.TEXTURE_MIN_FILTER,J[w.minFilter]),w.compareFunction&&(n.texParameteri(C,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(C,n.TEXTURE_COMPARE_FUNC,$[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===ai||w.minFilter!==Es&&w.minFilter!==Rr||w.type===ki&&e.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||i.get(w).__currentAnisotropy){let X=e.get("EXT_texture_filter_anisotropic");n.texParameterf(C,X.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,r.getMaxAnisotropy())),i.get(w).__currentAnisotropy=w.anisotropy}}}function le(C,w){let X=!1;C.__webglInit===void 0&&(C.__webglInit=!0,w.addEventListener("dispose",E));let ne=w.source,oe=f.get(ne);oe===void 0&&(oe={},f.set(ne,oe));let ie=G(w);if(ie!==C.__cacheKey){oe[ie]===void 0&&(oe[ie]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,X=!0),oe[ie].usedTimes++;let be=oe[C.__cacheKey];be!==void 0&&(oe[C.__cacheKey].usedTimes--,be.usedTimes===0&&b(w)),C.__cacheKey=ie,C.__webglTexture=oe[ie].texture}return X}function q(C,w,X){let ne=n.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(ne=n.TEXTURE_2D_ARRAY),w.isData3DTexture&&(ne=n.TEXTURE_3D);let oe=le(C,w),ie=w.source;t.bindTexture(ne,C.__webglTexture,n.TEXTURE0+X);let be=i.get(ie);if(ie.version!==be.__version||oe===!0){t.activeTexture(n.TEXTURE0+X);let he=gt.getPrimaries(gt.workingColorSpace),ge=w.colorSpace===er?null:gt.getPrimaries(w.colorSpace),Ge=w.colorSpace===er||he===ge?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,w.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,w.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ge);let de=x(w.image,!1,r.maxTextureSize);de=Ue(w,de);let we=a.convert(w.format,w.colorSpace),M=a.convert(w.type),Re=_(w.internalFormat,we,M,w.colorSpace,w.isVideoTexture);re(ne,w);let Me,We=w.mipmaps,He=w.isVideoTexture!==!0,Xe=be.__version===void 0||oe===!0,R=ie.dataReady,ee=I(w,de);if(w.isDepthTexture)Re=v(w.format===_a,w.type),Xe&&(He?t.texStorage2D(n.TEXTURE_2D,1,Re,de.width,de.height):t.texImage2D(n.TEXTURE_2D,0,Re,de.width,de.height,0,we,M,null));else if(w.isDataTexture)if(We.length>0){He&&Xe&&t.texStorage2D(n.TEXTURE_2D,ee,Re,We[0].width,We[0].height);for(let V=0,Z=We.length;V<Z;V++)Me=We[V],He?R&&t.texSubImage2D(n.TEXTURE_2D,V,0,0,Me.width,Me.height,we,M,Me.data):t.texImage2D(n.TEXTURE_2D,V,Re,Me.width,Me.height,0,we,M,Me.data);w.generateMipmaps=!1}else He?(Xe&&t.texStorage2D(n.TEXTURE_2D,ee,Re,de.width,de.height),R&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,de.width,de.height,we,M,de.data)):t.texImage2D(n.TEXTURE_2D,0,Re,de.width,de.height,0,we,M,de.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){He&&Xe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ee,Re,We[0].width,We[0].height,de.depth);for(let V=0,Z=We.length;V<Z;V++)if(Me=We[V],w.format!==ri)if(we!==null)if(He){if(R)if(w.layerUpdates.size>0){let ce=hm(Me.width,Me.height,w.format,w.type);for(let se of w.layerUpdates){let Se=Me.data.subarray(se*ce/Me.data.BYTES_PER_ELEMENT,(se+1)*ce/Me.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,V,0,0,se,Me.width,Me.height,1,we,Se)}w.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,V,0,0,0,Me.width,Me.height,de.depth,we,Me.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,V,Re,Me.width,Me.height,de.depth,0,Me.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else He?R&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,V,0,0,0,Me.width,Me.height,de.depth,we,M,Me.data):t.texImage3D(n.TEXTURE_2D_ARRAY,V,Re,Me.width,Me.height,de.depth,0,we,M,Me.data)}else{He&&Xe&&t.texStorage2D(n.TEXTURE_2D,ee,Re,We[0].width,We[0].height);for(let V=0,Z=We.length;V<Z;V++)Me=We[V],w.format!==ri?we!==null?He?R&&t.compressedTexSubImage2D(n.TEXTURE_2D,V,0,0,Me.width,Me.height,we,Me.data):t.compressedTexImage2D(n.TEXTURE_2D,V,Re,Me.width,Me.height,0,Me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):He?R&&t.texSubImage2D(n.TEXTURE_2D,V,0,0,Me.width,Me.height,we,M,Me.data):t.texImage2D(n.TEXTURE_2D,V,Re,Me.width,Me.height,0,we,M,Me.data)}else if(w.isDataArrayTexture)if(He){if(Xe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ee,Re,de.width,de.height,de.depth),R)if(w.layerUpdates.size>0){let V=hm(de.width,de.height,w.format,w.type);for(let Z of w.layerUpdates){let ce=de.data.subarray(Z*V/de.data.BYTES_PER_ELEMENT,(Z+1)*V/de.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Z,de.width,de.height,1,we,M,ce)}w.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,de.width,de.height,de.depth,we,M,de.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Re,de.width,de.height,de.depth,0,we,M,de.data);else if(w.isData3DTexture)He?(Xe&&t.texStorage3D(n.TEXTURE_3D,ee,Re,de.width,de.height,de.depth),R&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,de.width,de.height,de.depth,we,M,de.data)):t.texImage3D(n.TEXTURE_3D,0,Re,de.width,de.height,de.depth,0,we,M,de.data);else if(w.isFramebufferTexture){if(Xe)if(He)t.texStorage2D(n.TEXTURE_2D,ee,Re,de.width,de.height);else{let V=de.width,Z=de.height;for(let ce=0;ce<ee;ce++)t.texImage2D(n.TEXTURE_2D,ce,Re,V,Z,0,we,M,null),V>>=1,Z>>=1}}else if(We.length>0){if(He&&Xe){let V=xe(We[0]);t.texStorage2D(n.TEXTURE_2D,ee,Re,V.width,V.height)}for(let V=0,Z=We.length;V<Z;V++)Me=We[V],He?R&&t.texSubImage2D(n.TEXTURE_2D,V,0,0,we,M,Me):t.texImage2D(n.TEXTURE_2D,V,Re,we,M,Me);w.generateMipmaps=!1}else if(He){if(Xe){let V=xe(de);t.texStorage2D(n.TEXTURE_2D,ee,Re,V.width,V.height)}R&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,we,M,de)}else t.texImage2D(n.TEXTURE_2D,0,Re,we,M,de);g(w)&&p(ne),be.__version=ie.version,w.onUpdate&&w.onUpdate(w)}C.__version=w.version}function W(C,w,X){if(w.image.length!==6)return;let ne=le(C,w),oe=w.source;t.bindTexture(n.TEXTURE_CUBE_MAP,C.__webglTexture,n.TEXTURE0+X);let ie=i.get(oe);if(oe.version!==ie.__version||ne===!0){t.activeTexture(n.TEXTURE0+X);let be=gt.getPrimaries(gt.workingColorSpace),he=w.colorSpace===er?null:gt.getPrimaries(w.colorSpace),ge=w.colorSpace===er||be===he?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,w.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,w.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ge);let Ge=w.isCompressedTexture||w.image[0].isCompressedTexture,de=w.image[0]&&w.image[0].isDataTexture,we=[];for(let Z=0;Z<6;Z++)!Ge&&!de?we[Z]=x(w.image[Z],!0,r.maxCubemapSize):we[Z]=de?w.image[Z].image:w.image[Z],we[Z]=Ue(w,we[Z]);let M=we[0],Re=a.convert(w.format,w.colorSpace),Me=a.convert(w.type),We=_(w.internalFormat,Re,Me,w.colorSpace),He=w.isVideoTexture!==!0,Xe=ie.__version===void 0||ne===!0,R=oe.dataReady,ee=I(w,M);re(n.TEXTURE_CUBE_MAP,w);let V;if(Ge){He&&Xe&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ee,We,M.width,M.height);for(let Z=0;Z<6;Z++){V=we[Z].mipmaps;for(let ce=0;ce<V.length;ce++){let se=V[ce];w.format!==ri?Re!==null?He?R&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ce,0,0,se.width,se.height,Re,se.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ce,We,se.width,se.height,0,se.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):He?R&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ce,0,0,se.width,se.height,Re,Me,se.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ce,We,se.width,se.height,0,Re,Me,se.data)}}}else{if(V=w.mipmaps,He&&Xe){V.length>0&&ee++;let Z=xe(we[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,ee,We,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(de){He?R&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,we[Z].width,we[Z].height,Re,Me,we[Z].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,We,we[Z].width,we[Z].height,0,Re,Me,we[Z].data);for(let ce=0;ce<V.length;ce++){let Se=V[ce].image[Z].image;He?R&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ce+1,0,0,Se.width,Se.height,Re,Me,Se.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ce+1,We,Se.width,Se.height,0,Re,Me,Se.data)}}else{He?R&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,Re,Me,we[Z]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,We,Re,Me,we[Z]);for(let ce=0;ce<V.length;ce++){let se=V[ce];He?R&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ce+1,0,0,Re,Me,se.image[Z]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ce+1,We,Re,Me,se.image[Z])}}}g(w)&&p(n.TEXTURE_CUBE_MAP),ie.__version=oe.version,w.onUpdate&&w.onUpdate(w)}C.__version=w.version}function j(C,w,X,ne,oe,ie){let be=a.convert(X.format,X.colorSpace),he=a.convert(X.type),ge=_(X.internalFormat,be,he,X.colorSpace),Ge=i.get(w),de=i.get(X);if(de.__renderTarget=w,!Ge.__hasExternalTextures){let we=Math.max(1,w.width>>ie),M=Math.max(1,w.height>>ie);oe===n.TEXTURE_3D||oe===n.TEXTURE_2D_ARRAY?t.texImage3D(oe,ie,ge,we,M,w.depth,0,be,he,null):t.texImage2D(oe,ie,ge,we,M,0,be,he,null)}t.bindFramebuffer(n.FRAMEBUFFER,C),_e(w)?s.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ne,oe,de.__webglTexture,0,De(w)):(oe===n.TEXTURE_2D||oe>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&oe<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,ne,oe,de.__webglTexture,ie),t.bindFramebuffer(n.FRAMEBUFFER,null)}function ae(C,w,X){if(n.bindRenderbuffer(n.RENDERBUFFER,C),w.depthBuffer){let ne=w.depthTexture,oe=ne&&ne.isDepthTexture?ne.type:null,ie=v(w.stencilBuffer,oe),be=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,he=De(w);_e(w)?s.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,he,ie,w.width,w.height):X?n.renderbufferStorageMultisample(n.RENDERBUFFER,he,ie,w.width,w.height):n.renderbufferStorage(n.RENDERBUFFER,ie,w.width,w.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,be,n.RENDERBUFFER,C)}else{let ne=w.textures;for(let oe=0;oe<ne.length;oe++){let ie=ne[oe],be=a.convert(ie.format,ie.colorSpace),he=a.convert(ie.type),ge=_(ie.internalFormat,be,he,ie.colorSpace),Ge=De(w);X&&_e(w)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ge,ge,w.width,w.height):_e(w)?s.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ge,ge,w.width,w.height):n.renderbufferStorage(n.RENDERBUFFER,ge,w.width,w.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function fe(C,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,C),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let ne=i.get(w.depthTexture);ne.__renderTarget=w,(!ne.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),U(w.depthTexture,0);let oe=ne.__webglTexture,ie=De(w);if(w.depthTexture.format===ha)_e(w)?s.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,oe,0,ie):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,oe,0);else if(w.depthTexture.format===_a)_e(w)?s.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,oe,0,ie):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,oe,0);else throw new Error("Unknown depthTexture format")}function me(C){let w=i.get(C),X=C.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==C.depthTexture){let ne=C.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),ne){let oe=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,ne.removeEventListener("dispose",oe)};ne.addEventListener("dispose",oe),w.__depthDisposeCallback=oe}w.__boundDepthTexture=ne}if(C.depthTexture&&!w.__autoAllocateDepthBuffer){if(X)throw new Error("target.depthTexture not supported in Cube render targets");fe(w.__webglFramebuffer,C)}else if(X){w.__webglDepthbuffer=[];for(let ne=0;ne<6;ne++)if(t.bindFramebuffer(n.FRAMEBUFFER,w.__webglFramebuffer[ne]),w.__webglDepthbuffer[ne]===void 0)w.__webglDepthbuffer[ne]=n.createRenderbuffer(),ae(w.__webglDepthbuffer[ne],C,!1);else{let oe=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ie=w.__webglDepthbuffer[ne];n.bindRenderbuffer(n.RENDERBUFFER,ie),n.framebufferRenderbuffer(n.FRAMEBUFFER,oe,n.RENDERBUFFER,ie)}}else if(t.bindFramebuffer(n.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=n.createRenderbuffer(),ae(w.__webglDepthbuffer,C,!1);else{let ne=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,oe=w.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,oe),n.framebufferRenderbuffer(n.FRAMEBUFFER,ne,n.RENDERBUFFER,oe)}t.bindFramebuffer(n.FRAMEBUFFER,null)}function ue(C,w,X){let ne=i.get(C);w!==void 0&&j(ne.__webglFramebuffer,C,C.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),X!==void 0&&me(C)}function Ce(C){let w=C.texture,X=i.get(C),ne=i.get(w);C.addEventListener("dispose",P);let oe=C.textures,ie=C.isWebGLCubeRenderTarget===!0,be=oe.length>1;if(be||(ne.__webglTexture===void 0&&(ne.__webglTexture=n.createTexture()),ne.__version=w.version,o.memory.textures++),ie){X.__webglFramebuffer=[];for(let he=0;he<6;he++)if(w.mipmaps&&w.mipmaps.length>0){X.__webglFramebuffer[he]=[];for(let ge=0;ge<w.mipmaps.length;ge++)X.__webglFramebuffer[he][ge]=n.createFramebuffer()}else X.__webglFramebuffer[he]=n.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){X.__webglFramebuffer=[];for(let he=0;he<w.mipmaps.length;he++)X.__webglFramebuffer[he]=n.createFramebuffer()}else X.__webglFramebuffer=n.createFramebuffer();if(be)for(let he=0,ge=oe.length;he<ge;he++){let Ge=i.get(oe[he]);Ge.__webglTexture===void 0&&(Ge.__webglTexture=n.createTexture(),o.memory.textures++)}if(C.samples>0&&_e(C)===!1){X.__webglMultisampledFramebuffer=n.createFramebuffer(),X.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,X.__webglMultisampledFramebuffer);for(let he=0;he<oe.length;he++){let ge=oe[he];X.__webglColorRenderbuffer[he]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,X.__webglColorRenderbuffer[he]);let Ge=a.convert(ge.format,ge.colorSpace),de=a.convert(ge.type),we=_(ge.internalFormat,Ge,de,ge.colorSpace,C.isXRRenderTarget===!0),M=De(C);n.renderbufferStorageMultisample(n.RENDERBUFFER,M,we,C.width,C.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+he,n.RENDERBUFFER,X.__webglColorRenderbuffer[he])}n.bindRenderbuffer(n.RENDERBUFFER,null),C.depthBuffer&&(X.__webglDepthRenderbuffer=n.createRenderbuffer(),ae(X.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ie){t.bindTexture(n.TEXTURE_CUBE_MAP,ne.__webglTexture),re(n.TEXTURE_CUBE_MAP,w);for(let he=0;he<6;he++)if(w.mipmaps&&w.mipmaps.length>0)for(let ge=0;ge<w.mipmaps.length;ge++)j(X.__webglFramebuffer[he][ge],C,w,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+he,ge);else j(X.__webglFramebuffer[he],C,w,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+he,0);g(w)&&p(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(be){for(let he=0,ge=oe.length;he<ge;he++){let Ge=oe[he],de=i.get(Ge);t.bindTexture(n.TEXTURE_2D,de.__webglTexture),re(n.TEXTURE_2D,Ge),j(X.__webglFramebuffer,C,Ge,n.COLOR_ATTACHMENT0+he,n.TEXTURE_2D,0),g(Ge)&&p(n.TEXTURE_2D)}t.unbindTexture()}else{let he=n.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(he=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(he,ne.__webglTexture),re(he,w),w.mipmaps&&w.mipmaps.length>0)for(let ge=0;ge<w.mipmaps.length;ge++)j(X.__webglFramebuffer[ge],C,w,n.COLOR_ATTACHMENT0,he,ge);else j(X.__webglFramebuffer,C,w,n.COLOR_ATTACHMENT0,he,0);g(w)&&p(he),t.unbindTexture()}C.depthBuffer&&me(C)}function Te(C){let w=C.textures;for(let X=0,ne=w.length;X<ne;X++){let oe=w[X];if(g(oe)){let ie=y(C),be=i.get(oe).__webglTexture;t.bindTexture(ie,be),p(ie),t.unbindTexture()}}}let Pe=[],O=[];function Oe(C){if(C.samples>0){if(_e(C)===!1){let w=C.textures,X=C.width,ne=C.height,oe=n.COLOR_BUFFER_BIT,ie=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,be=i.get(C),he=w.length>1;if(he)for(let ge=0;ge<w.length;ge++)t.bindFramebuffer(n.FRAMEBUFFER,be.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ge,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,be.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ge,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,be.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,be.__webglFramebuffer);for(let ge=0;ge<w.length;ge++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(oe|=n.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(oe|=n.STENCIL_BUFFER_BIT)),he){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,be.__webglColorRenderbuffer[ge]);let Ge=i.get(w[ge]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Ge,0)}n.blitFramebuffer(0,0,X,ne,0,0,X,ne,oe,n.NEAREST),l===!0&&(Pe.length=0,O.length=0,Pe.push(n.COLOR_ATTACHMENT0+ge),C.depthBuffer&&C.resolveDepthBuffer===!1&&(Pe.push(ie),O.push(ie),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,O)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Pe))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),he)for(let ge=0;ge<w.length;ge++){t.bindFramebuffer(n.FRAMEBUFFER,be.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ge,n.RENDERBUFFER,be.__webglColorRenderbuffer[ge]);let Ge=i.get(w[ge]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,be.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ge,n.TEXTURE_2D,Ge,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,be.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&l){let w=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[w])}}}function De(C){return Math.min(r.maxSamples,C.samples)}function _e(C){let w=i.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function pe(C){let w=o.render.frame;c.get(C)!==w&&(c.set(C,w),C.update())}function Ue(C,w){let X=C.colorSpace,ne=C.format,oe=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||X!==wa&&X!==er&&(gt.getTransfer(X)===Et?(ne!==ri||oe!==Vi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",X)),w}function xe(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(u.width=C.naturalWidth||C.width,u.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(u.width=C.displayWidth,u.height=C.displayHeight):(u.width=C.width,u.height=C.height),u}this.allocateTextureUnit=F,this.resetTextureUnits=B,this.setTexture2D=U,this.setTexture2DArray=N,this.setTexture3D=te,this.setTextureCube=D,this.rebindTextures=ue,this.setupRenderTarget=Ce,this.updateRenderTargetMipmap=Te,this.updateMultisampleRenderTarget=Oe,this.setupDepthRenderbuffer=me,this.setupFrameBufferTexture=j,this.useMultisampledRTT=_e}function fS(n,e){function t(i,r=er){let a,o=gt.getTransfer(r);if(i===Vi)return n.UNSIGNED_BYTE;if(i===af)return n.UNSIGNED_SHORT_4_4_4_4;if(i===of)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Dm)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Im)return n.BYTE;if(i===Lm)return n.SHORT;if(i===xo)return n.UNSIGNED_SHORT;if(i===rf)return n.INT;if(i===Pr)return n.UNSIGNED_INT;if(i===ki)return n.FLOAT;if(i===Io)return n.HALF_FLOAT;if(i===Um)return n.ALPHA;if(i===Nm)return n.RGB;if(i===ri)return n.RGBA;if(i===Fm)return n.LUMINANCE;if(i===Om)return n.LUMINANCE_ALPHA;if(i===ha)return n.DEPTH_COMPONENT;if(i===_a)return n.DEPTH_STENCIL;if(i===Bm)return n.RED;if(i===sf)return n.RED_INTEGER;if(i===km)return n.RG;if(i===lf)return n.RG_INTEGER;if(i===cf)return n.RGBA_INTEGER;if(i===rl||i===al||i===ol||i===sl)if(o===Et)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(i===rl)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===al)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ol)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===sl)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(i===rl)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===al)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ol)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===sl)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Wu||i===qu||i===Xu||i===Yu)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(i===Wu)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===qu)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Xu)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Yu)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Zu||i===Ku||i===$u)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(i===Zu||i===Ku)return o===Et?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(i===$u)return o===Et?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Ju||i===ju||i===Qu||i===ed||i===td||i===nd||i===id||i===rd||i===ad||i===od||i===sd||i===ld||i===cd||i===ud)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(i===Ju)return o===Et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===ju)return o===Et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Qu)return o===Et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ed)return o===Et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===td)return o===Et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===nd)return o===Et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===id)return o===Et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===rd)return o===Et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===ad)return o===Et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===od)return o===Et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===sd)return o===Et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ld)return o===Et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===cd)return o===Et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===ud)return o===Et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ll||i===dd||i===fd)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(i===ll)return o===Et?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===dd)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===fd)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===zm||i===hd||i===pd||i===md)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(i===ll)return a.COMPRESSED_RED_RGTC1_EXT;if(i===hd)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===pd)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===md)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ya?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}var Id=class extends yn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},_n=class extends en{constructor(){super(),this.isGroup=!0,this.type="Group"}},hS={type:"move"},ho=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new _n,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new _n,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new _n,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new z),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,a=null,o=null,s=this._targetRay,l=this._grip,u=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(u&&e.hand){o=!0;for(let x of e.hand.values()){let g=t.getJointPose(x,i),p=this._getHandJoint(u,x);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}let c=u.joints["index-finger-tip"],d=u.joints["thumb-tip"],f=c.position.distanceTo(d.position),h=.02,m=.005;u.inputState.pinching&&f>h+m?(u.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!u.inputState.pinching&&f<=h-m&&(u.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(a=t.getPose(e.gripSpace,i),a!==null&&(l.matrix.fromArray(a.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,a.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(a.linearVelocity)):l.hasLinearVelocity=!1,a.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(a.angularVelocity)):l.hasAngularVelocity=!1));s!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&a!==null&&(r=a),r!==null&&(s.matrix.fromArray(r.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,r.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(r.linearVelocity)):s.hasLinearVelocity=!1,r.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(r.angularVelocity)):s.hasAngularVelocity=!1,this.dispatchEvent(hS)))}return s!==null&&(s.visible=r!==null),l!==null&&(l.visible=a!==null),u!==null&&(u.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new _n;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}},pS=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,mS=`
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

}`,Ld=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,i){if(this.texture===null){let r=new En,a=e.properties.get(r);a.__webglTexture=t.texture,(t.depthNear!=i.depthNear||t.depthFar!=i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new Tn({vertexShader:pS,fragmentShader:mS,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ft(new yl(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Dd=class extends ar{constructor(e,t){super();let i=this,r=null,a=1,o=null,s="local-floor",l=1,u=null,c=null,d=null,f=null,h=null,m=null,x=new Ld,g=t.getContextAttributes(),p=null,y=null,_=[],v=[],I=new Le,E=null,P=new yn;P.viewport=new Ht;let L=new yn;L.viewport=new Ht;let b=[P,L],S=new Id,T=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let W=_[q];return W===void 0&&(W=new ho,_[q]=W),W.getTargetRaySpace()},this.getControllerGrip=function(q){let W=_[q];return W===void 0&&(W=new ho,_[q]=W),W.getGripSpace()},this.getHand=function(q){let W=_[q];return W===void 0&&(W=new ho,_[q]=W),W.getHandSpace()};function F(q){let W=v.indexOf(q.inputSource);if(W===-1)return;let j=_[W];j!==void 0&&(j.update(q.inputSource,q.frame,u||o),j.dispatchEvent({type:q.type,data:q.inputSource}))}function G(){r.removeEventListener("select",F),r.removeEventListener("selectstart",F),r.removeEventListener("selectend",F),r.removeEventListener("squeeze",F),r.removeEventListener("squeezestart",F),r.removeEventListener("squeezeend",F),r.removeEventListener("end",G),r.removeEventListener("inputsourceschange",U);for(let q=0;q<_.length;q++){let W=v[q];W!==null&&(v[q]=null,_[q].disconnect(W))}T=null,B=null,x.reset(),e.setRenderTarget(p),h=null,f=null,d=null,r=null,y=null,le.stop(),i.isPresenting=!1,e.setPixelRatio(E),e.setSize(I.width,I.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){a=q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){s=q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return u||o},this.setReferenceSpace=function(q){u=q},this.getBaseLayer=function(){return f!==null?f:h},this.getBinding=function(){return d},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(q){if(r=q,r!==null){if(p=e.getRenderTarget(),r.addEventListener("select",F),r.addEventListener("selectstart",F),r.addEventListener("selectend",F),r.addEventListener("squeeze",F),r.addEventListener("squeezestart",F),r.addEventListener("squeezeend",F),r.addEventListener("end",G),r.addEventListener("inputsourceschange",U),g.xrCompatible!==!0&&await t.makeXRCompatible(),E=e.getPixelRatio(),e.getSize(I),r.renderState.layers===void 0){let W={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:a};h=new XRWebGLLayer(r,t,W),r.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),y=new Gi(h.framebufferWidth,h.framebufferHeight,{format:ri,type:Vi,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil})}else{let W=null,j=null,ae=null;g.depth&&(ae=g.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,W=g.stencil?_a:ha,j=g.stencil?ya:Pr);let fe={colorFormat:t.RGBA8,depthFormat:ae,scaleFactor:a};d=new XRWebGLBinding(r,t),f=d.createProjectionLayer(fe),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),y=new Gi(f.textureWidth,f.textureHeight,{format:ri,type:Vi,depthTexture:new Sl(f.textureWidth,f.textureHeight,j,void 0,void 0,void 0,void 0,void 0,void 0,W),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),u=null,o=await r.requestReferenceSpace(s),le.setContext(r),le.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function U(q){for(let W=0;W<q.removed.length;W++){let j=q.removed[W],ae=v.indexOf(j);ae>=0&&(v[ae]=null,_[ae].disconnect(j))}for(let W=0;W<q.added.length;W++){let j=q.added[W],ae=v.indexOf(j);if(ae===-1){for(let me=0;me<_.length;me++)if(me>=v.length){v.push(j),ae=me;break}else if(v[me]===null){v[me]=j,ae=me;break}if(ae===-1)break}let fe=_[ae];fe&&fe.connect(j)}}let N=new z,te=new z;function D(q,W,j){N.setFromMatrixPosition(W.matrixWorld),te.setFromMatrixPosition(j.matrixWorld);let ae=N.distanceTo(te),fe=W.projectionMatrix.elements,me=j.projectionMatrix.elements,ue=fe[14]/(fe[10]-1),Ce=fe[14]/(fe[10]+1),Te=(fe[9]+1)/fe[5],Pe=(fe[9]-1)/fe[5],O=(fe[8]-1)/fe[0],Oe=(me[8]+1)/me[0],De=ue*O,_e=ue*Oe,pe=ae/(-O+Oe),Ue=pe*-O;if(W.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(Ue),q.translateZ(pe),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),fe[10]===-1)q.projectionMatrix.copy(W.projectionMatrix),q.projectionMatrixInverse.copy(W.projectionMatrixInverse);else{let xe=ue+pe,C=Ce+pe,w=De-Ue,X=_e+(ae-Ue),ne=Te*Ce/C*xe,oe=Pe*Ce/C*xe;q.projectionMatrix.makePerspective(w,X,ne,oe,xe,C),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function k(q,W){W===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(W.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(r===null)return;let W=q.near,j=q.far;x.texture!==null&&(x.depthNear>0&&(W=x.depthNear),x.depthFar>0&&(j=x.depthFar)),S.near=L.near=P.near=W,S.far=L.far=P.far=j,(T!==S.near||B!==S.far)&&(r.updateRenderState({depthNear:S.near,depthFar:S.far}),T=S.near,B=S.far),P.layers.mask=q.layers.mask|2,L.layers.mask=q.layers.mask|4,S.layers.mask=P.layers.mask|L.layers.mask;let ae=q.parent,fe=S.cameras;k(S,ae);for(let me=0;me<fe.length;me++)k(fe[me],ae);fe.length===2?D(S,P,L):S.projectionMatrix.copy(P.projectionMatrix),J(q,S,ae)};function J(q,W,j){j===null?q.matrix.copy(W.matrixWorld):(q.matrix.copy(j.matrixWorld),q.matrix.invert(),q.matrix.multiply(W.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(W.projectionMatrix),q.projectionMatrixInverse.copy(W.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=vo*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(f===null&&h===null))return l},this.setFoveation=function(q){l=q,f!==null&&(f.fixedFoveation=q),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=q)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(S)};let $=null;function re(q,W){if(c=W.getViewerPose(u||o),m=W,c!==null){let j=c.views;h!==null&&(e.setRenderTargetFramebuffer(y,h.framebuffer),e.setRenderTarget(y));let ae=!1;j.length!==S.cameras.length&&(S.cameras.length=0,ae=!0);for(let me=0;me<j.length;me++){let ue=j[me],Ce=null;if(h!==null)Ce=h.getViewport(ue);else{let Pe=d.getViewSubImage(f,ue);Ce=Pe.viewport,me===0&&(e.setRenderTargetTextures(y,Pe.colorTexture,f.ignoreDepthValues?void 0:Pe.depthStencilTexture),e.setRenderTarget(y))}let Te=b[me];Te===void 0&&(Te=new yn,Te.layers.enable(me),Te.viewport=new Ht,b[me]=Te),Te.matrix.fromArray(ue.transform.matrix),Te.matrix.decompose(Te.position,Te.quaternion,Te.scale),Te.projectionMatrix.fromArray(ue.projectionMatrix),Te.projectionMatrixInverse.copy(Te.projectionMatrix).invert(),Te.viewport.set(Ce.x,Ce.y,Ce.width,Ce.height),me===0&&(S.matrix.copy(Te.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),ae===!0&&S.cameras.push(Te)}let fe=r.enabledFeatures;if(fe&&fe.includes("depth-sensing")){let me=d.getDepthInformation(j[0]);me&&me.isValid&&me.texture&&x.init(e,me,r.renderState)}}for(let j=0;j<_.length;j++){let ae=v[j],fe=_[j];ae!==null&&fe!==void 0&&fe.update(ae,W,u||o)}$&&$(q,W),W.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:W}),m=null}let le=new Xm;le.setAnimationLoop(re),this.setAnimationLoop=function(q){$=q},this.dispose=function(){}}},wr=new _i,gS=new wt;function xS(n,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function i(g,p){p.color.getRGB(g.fogColor.value,qm(n)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function r(g,p,y,_,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?a(g,p):p.isMeshToonMaterial?(a(g,p),d(g,p)):p.isMeshPhongMaterial?(a(g,p),c(g,p)):p.isMeshStandardMaterial?(a(g,p),f(g,p),p.isMeshPhysicalMaterial&&h(g,p,v)):p.isMeshMatcapMaterial?(a(g,p),m(g,p)):p.isMeshDepthMaterial?a(g,p):p.isMeshDistanceMaterial?(a(g,p),x(g,p)):p.isMeshNormalMaterial?a(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&s(g,p)):p.isPointsMaterial?l(g,p,y,_):p.isSpriteMaterial?u(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function a(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Qt&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Qt&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);let y=e.get(p),_=y.envMap,v=y.envMapRotation;_&&(g.envMap.value=_,wr.copy(v),wr.x*=-1,wr.y*=-1,wr.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(wr.y*=-1,wr.z*=-1),g.envMapRotation.value.setFromMatrix4(gS.makeRotationFromEuler(wr)),g.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function s(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,y,_){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*y,g.scale.value=_*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function u(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function d(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function f(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function h(g,p,y){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Qt&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=y.texture,g.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function x(g,p){let y=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(y.matrixWorld),g.nearDistance.value=y.shadow.camera.near,g.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function vS(n,e,t,i){let r={},a={},o=[],s=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,_){let v=_.program;i.uniformBlockBinding(y,v)}function u(y,_){let v=r[y.id];v===void 0&&(m(y),v=c(y),r[y.id]=v,y.addEventListener("dispose",g));let I=_.program;i.updateUBOMapping(y,I);let E=e.render.frame;a[y.id]!==E&&(f(y),a[y.id]=E)}function c(y){let _=d();y.__bindingPointIndex=_;let v=n.createBuffer(),I=y.__size,E=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,v),n.bufferData(n.UNIFORM_BUFFER,I,E),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,_,v),v}function d(){for(let y=0;y<s;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(y){let _=r[y.id],v=y.uniforms,I=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,_);for(let E=0,P=v.length;E<P;E++){let L=Array.isArray(v[E])?v[E]:[v[E]];for(let b=0,S=L.length;b<S;b++){let T=L[b];if(h(T,E,b,I)===!0){let B=T.__offset,F=Array.isArray(T.value)?T.value:[T.value],G=0;for(let U=0;U<F.length;U++){let N=F[U],te=x(N);typeof N=="number"||typeof N=="boolean"?(T.__data[0]=N,n.bufferSubData(n.UNIFORM_BUFFER,B+G,T.__data)):N.isMatrix3?(T.__data[0]=N.elements[0],T.__data[1]=N.elements[1],T.__data[2]=N.elements[2],T.__data[3]=0,T.__data[4]=N.elements[3],T.__data[5]=N.elements[4],T.__data[6]=N.elements[5],T.__data[7]=0,T.__data[8]=N.elements[6],T.__data[9]=N.elements[7],T.__data[10]=N.elements[8],T.__data[11]=0):(N.toArray(T.__data,G),G+=te.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,B,T.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function h(y,_,v,I){let E=y.value,P=_+"_"+v;if(I[P]===void 0)return typeof E=="number"||typeof E=="boolean"?I[P]=E:I[P]=E.clone(),!0;{let L=I[P];if(typeof E=="number"||typeof E=="boolean"){if(L!==E)return I[P]=E,!0}else if(L.equals(E)===!1)return L.copy(E),!0}return!1}function m(y){let _=y.uniforms,v=0,I=16;for(let P=0,L=_.length;P<L;P++){let b=Array.isArray(_[P])?_[P]:[_[P]];for(let S=0,T=b.length;S<T;S++){let B=b[S],F=Array.isArray(B.value)?B.value:[B.value];for(let G=0,U=F.length;G<U;G++){let N=F[G],te=x(N),D=v%I,k=D%te.boundary,J=D+k;v+=k,J!==0&&I-J<te.storage&&(v+=I-J),B.__data=new Float32Array(te.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=v,v+=te.storage}}}let E=v%I;return E>0&&(v+=I-E),y.__size=v,y.__cache={},this}function x(y){let _={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(_.boundary=4,_.storage=4):y.isVector2?(_.boundary=8,_.storage=8):y.isVector3||y.isColor?(_.boundary=16,_.storage=12):y.isVector4?(_.boundary=16,_.storage=16):y.isMatrix3?(_.boundary=48,_.storage=48):y.isMatrix4?(_.boundary=64,_.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),_}function g(y){let _=y.target;_.removeEventListener("dispose",g);let v=o.indexOf(_.__bindingPointIndex);o.splice(v,1),n.deleteBuffer(r[_.id]),delete r[_.id],delete a[_.id]}function p(){for(let y in r)n.deleteBuffer(r[y]);o=[],r={},a={}}return{bind:l,update:u,dispose:p}}var bl=class{constructor(e={}){let{canvas:t=Sv(),context:i=null,depth:r=!0,stencil:a=!1,alpha:o=!1,antialias:s=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:u=!1,powerPreference:c="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let h;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=i.getContextAttributes().alpha}else h=o;let m=new Uint32Array(4),x=new Int32Array(4),g=null,p=null,y=[],_=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=zt,this.toneMapping=ir,this.toneMappingExposure=1;let v=this,I=!1,E=0,P=0,L=null,b=-1,S=null,T=new Ht,B=new Ht,F=null,G=new Je(0),U=0,N=t.width,te=t.height,D=1,k=null,J=null,$=new Ht(0,0,N,te),re=new Ht(0,0,N,te),le=!1,q=new Dr,W=!1,j=!1,ae=new wt,fe=new wt,me=new z,ue=new Ht,Ce={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Te=!1;function Pe(){return L===null?D:1}let O=i;function Oe(A,H){return t.getContext(A,H)}try{let A={alpha:!0,depth:r,stencil:a,antialias:s,premultipliedAlpha:l,preserveDrawingBuffer:u,powerPreference:c,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine","three.js r170"),t.addEventListener("webglcontextlost",Z,!1),t.addEventListener("webglcontextrestored",ce,!1),t.addEventListener("webglcontextcreationerror",se,!1),O===null){let H="webgl2";if(O=Oe(H,A),O===null)throw Oe(H)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let De,_e,pe,Ue,xe,C,w,X,ne,oe,ie,be,he,ge,Ge,de,we,M,Re,Me,We,He,Xe,R;function ee(){De=new U1(O),De.init(),He=new fS(O,De),_e=new C1(O,De,e,He),pe=new cS(O,De),_e.reverseDepthBuffer&&f&&pe.buffers.depth.setReversed(!0),Ue=new O1(O),xe=new $M,C=new dS(O,De,pe,xe,_e,He,Ue),w=new P1(v),X=new D1(v),ne=new Wv(O),Xe=new E1(O,ne),oe=new N1(O,ne,Ue,Xe),ie=new k1(O,oe,ne,Ue),Re=new B1(O,_e,C),de=new R1(xe),be=new KM(v,w,X,De,_e,Xe,de),he=new xS(v,xe),ge=new jM,Ge=new rS(De),M=new A1(v,w,X,pe,ie,h,l),we=new sS(v,ie,_e),R=new vS(O,Ue,_e,pe),Me=new T1(O,De,Ue),We=new F1(O,De,Ue),Ue.programs=be.programs,v.capabilities=_e,v.extensions=De,v.properties=xe,v.renderLists=ge,v.shadowMap=we,v.state=pe,v.info=Ue}ee();let V=new Dd(v,O);this.xr=V,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){let A=De.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){let A=De.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return D},this.setPixelRatio=function(A){A!==void 0&&(D=A,this.setSize(N,te,!1))},this.getSize=function(A){return A.set(N,te)},this.setSize=function(A,H,K=!0){if(V.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}N=A,te=H,t.width=Math.floor(A*D),t.height=Math.floor(H*D),K===!0&&(t.style.width=A+"px",t.style.height=H+"px"),this.setViewport(0,0,A,H)},this.getDrawingBufferSize=function(A){return A.set(N*D,te*D).floor()},this.setDrawingBufferSize=function(A,H,K){N=A,te=H,D=K,t.width=Math.floor(A*K),t.height=Math.floor(H*K),this.setViewport(0,0,A,H)},this.getCurrentViewport=function(A){return A.copy(T)},this.getViewport=function(A){return A.copy($)},this.setViewport=function(A,H,K,Q){A.isVector4?$.set(A.x,A.y,A.z,A.w):$.set(A,H,K,Q),pe.viewport(T.copy($).multiplyScalar(D).round())},this.getScissor=function(A){return A.copy(re)},this.setScissor=function(A,H,K,Q){A.isVector4?re.set(A.x,A.y,A.z,A.w):re.set(A,H,K,Q),pe.scissor(B.copy(re).multiplyScalar(D).round())},this.getScissorTest=function(){return le},this.setScissorTest=function(A){pe.setScissorTest(le=A)},this.setOpaqueSort=function(A){k=A},this.setTransparentSort=function(A){J=A},this.getClearColor=function(A){return A.copy(M.getClearColor())},this.setClearColor=function(){M.setClearColor.apply(M,arguments)},this.getClearAlpha=function(){return M.getClearAlpha()},this.setClearAlpha=function(){M.setClearAlpha.apply(M,arguments)},this.clear=function(A=!0,H=!0,K=!0){let Q=0;if(A){let Y=!1;if(L!==null){let ve=L.texture.format;Y=ve===cf||ve===lf||ve===sf}if(Y){let ve=L.texture.type,Ee=ve===Vi||ve===Pr||ve===xo||ve===ya||ve===af||ve===of,Ne=M.getClearColor(),Ie=M.getClearAlpha(),qe=Ne.r,Ke=Ne.g,Fe=Ne.b;Ee?(m[0]=qe,m[1]=Ke,m[2]=Fe,m[3]=Ie,O.clearBufferuiv(O.COLOR,0,m)):(x[0]=qe,x[1]=Ke,x[2]=Fe,x[3]=Ie,O.clearBufferiv(O.COLOR,0,x))}else Q|=O.COLOR_BUFFER_BIT}H&&(Q|=O.DEPTH_BUFFER_BIT),K&&(Q|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O.clear(Q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Z,!1),t.removeEventListener("webglcontextrestored",ce,!1),t.removeEventListener("webglcontextcreationerror",se,!1),ge.dispose(),Ge.dispose(),xe.dispose(),w.dispose(),X.dispose(),ie.dispose(),Xe.dispose(),R.dispose(),be.dispose(),V.dispose(),V.removeEventListener("sessionstart",Ve),V.removeEventListener("sessionend",Wt),Dt.stop()};function Z(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),I=!0}function ce(){console.log("THREE.WebGLRenderer: Context Restored."),I=!1;let A=Ue.autoReset,H=we.enabled,K=we.autoUpdate,Q=we.needsUpdate,Y=we.type;ee(),Ue.autoReset=A,we.enabled=H,we.autoUpdate=K,we.needsUpdate=Q,we.type=Y}function se(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Se(A){let H=A.target;H.removeEventListener("dispose",Se),$e(H)}function $e(A){et(A),xe.remove(A)}function et(A){let H=xe.get(A).programs;H!==void 0&&(H.forEach(function(K){be.releaseProgram(K)}),A.isShaderMaterial&&be.releaseShaderCache(A))}this.renderBufferDirect=function(A,H,K,Q,Y,ve){H===null&&(H=Ce);let Ee=Y.isMesh&&Y.matrixWorld.determinant()<0,Ne=bn(A,H,K,Q,Y);pe.setMaterial(Q,Ee);let Ie=K.index,qe=1;if(Q.wireframe===!0){if(Ie=oe.getWireframeAttribute(K),Ie===void 0)return;qe=2}let Ke=K.drawRange,Fe=K.attributes.position,tt=Ke.start*qe,ut=(Ke.start+Ke.count)*qe;ve!==null&&(tt=Math.max(tt,ve.start*qe),ut=Math.min(ut,(ve.start+ve.count)*qe)),Ie!==null?(tt=Math.max(tt,0),ut=Math.min(ut,Ie.count)):Fe!=null&&(tt=Math.max(tt,0),ut=Math.min(ut,Fe.count));let Mt=ut-tt;if(Mt<0||Mt===1/0)return;Xe.setup(Y,Q,Ne,K,Ie);let $t,dt=Me;if(Ie!==null&&($t=ne.get(Ie),dt=We,dt.setIndex($t)),Y.isMesh)Q.wireframe===!0?(pe.setLineWidth(Q.wireframeLinewidth*Pe()),dt.setMode(O.LINES)):dt.setMode(O.TRIANGLES);else if(Y.isLine){let ke=Q.linewidth;ke===void 0&&(ke=1),pe.setLineWidth(ke*Pe()),Y.isLineSegments?dt.setMode(O.LINES):Y.isLineLoop?dt.setMode(O.LINE_LOOP):dt.setMode(O.LINE_STRIP)}else Y.isPoints?dt.setMode(O.POINTS):Y.isSprite&&dt.setMode(O.TRIANGLES);if(Y.isBatchedMesh)if(Y._multiDrawInstances!==null)dt.renderMultiDrawInstances(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount,Y._multiDrawInstances);else if(De.get("WEBGL_multi_draw"))dt.renderMultiDraw(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount);else{let ke=Y._multiDrawStarts,ln=Y._multiDrawCounts,ft=Y._multiDrawCount,mn=Ie?ne.get(Ie).bytesPerElement:1,kn=xe.get(Q).currentProgram.getUniforms();for(let Jt=0;Jt<ft;Jt++)kn.setValue(O,"_gl_DrawID",Jt),dt.render(ke[Jt]/mn,ln[Jt])}else if(Y.isInstancedMesh)dt.renderInstances(tt,Mt,Y.count);else if(K.isInstancedBufferGeometry){let ke=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,ln=Math.min(K.instanceCount,ke);dt.renderInstances(tt,Mt,ln)}else dt.render(tt,Mt)};function Ye(A,H,K){A.transparent===!0&&A.side===ni&&A.forceSinglePass===!1?(A.side=Qt,A.needsUpdate=!0,rn(A,H,K),A.side=rr,A.needsUpdate=!0,rn(A,H,K),A.side=ni):rn(A,H,K)}this.compile=function(A,H,K=null){K===null&&(K=A),p=Ge.get(K),p.init(H),_.push(p),K.traverseVisible(function(Y){Y.isLight&&Y.layers.test(H.layers)&&(p.pushLight(Y),Y.castShadow&&p.pushShadow(Y))}),A!==K&&A.traverseVisible(function(Y){Y.isLight&&Y.layers.test(H.layers)&&(p.pushLight(Y),Y.castShadow&&p.pushShadow(Y))}),p.setupLights();let Q=new Set;return A.traverse(function(Y){if(!(Y.isMesh||Y.isPoints||Y.isLine||Y.isSprite))return;let ve=Y.material;if(ve)if(Array.isArray(ve))for(let Ee=0;Ee<ve.length;Ee++){let Ne=ve[Ee];Ye(Ne,K,Y),Q.add(Ne)}else Ye(ve,K,Y),Q.add(ve)}),_.pop(),p=null,Q},this.compileAsync=function(A,H,K=null){let Q=this.compile(A,H,K);return new Promise(Y=>{function ve(){if(Q.forEach(function(Ee){xe.get(Ee).currentProgram.isReady()&&Q.delete(Ee)}),Q.size===0){Y(A);return}setTimeout(ve,10)}De.get("KHR_parallel_shader_compile")!==null?ve():setTimeout(ve,10)})};let At=null;function yt(A){At&&At(A)}function Ve(){Dt.stop()}function Wt(){Dt.start()}let Dt=new Xm;Dt.setAnimationLoop(yt),typeof self<"u"&&Dt.setContext(self),this.setAnimationLoop=function(A){At=A,V.setAnimationLoop(A),A===null?Dt.stop():Dt.start()},V.addEventListener("sessionstart",Ve),V.addEventListener("sessionend",Wt),this.render=function(A,H){if(H!==void 0&&H.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),V.enabled===!0&&V.isPresenting===!0&&(V.cameraAutoUpdate===!0&&V.updateCamera(H),H=V.getCamera()),A.isScene===!0&&A.onBeforeRender(v,A,H,L),p=Ge.get(A,_.length),p.init(H),_.push(p),fe.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),q.setFromProjectionMatrix(fe),j=this.localClippingEnabled,W=de.init(this.clippingPlanes,j),g=ge.get(A,y.length),g.init(),y.push(g),V.enabled===!0&&V.isPresenting===!0){let ve=v.xr.getDepthSensingMesh();ve!==null&&hn(ve,H,-1/0,v.sortObjects)}hn(A,H,0,v.sortObjects),g.finish(),v.sortObjects===!0&&g.sort(k,J),Te=V.enabled===!1||V.isPresenting===!1||V.hasDepthSensing()===!1,Te&&M.addToRenderList(g,A),this.info.render.frame++,W===!0&&de.beginShadows();let K=p.state.shadowsArray;we.render(K,A,H),W===!0&&de.endShadows(),this.info.autoReset===!0&&this.info.reset();let Q=g.opaque,Y=g.transmissive;if(p.setupLights(),H.isArrayCamera){let ve=H.cameras;if(Y.length>0)for(let Ee=0,Ne=ve.length;Ee<Ne;Ee++){let Ie=ve[Ee];nn(Q,Y,A,Ie)}Te&&M.render(A);for(let Ee=0,Ne=ve.length;Ee<Ne;Ee++){let Ie=ve[Ee];Ze(g,A,Ie,Ie.viewport)}}else Y.length>0&&nn(Q,Y,A,H),Te&&M.render(A),Ze(g,A,H);L!==null&&(C.updateMultisampleRenderTarget(L),C.updateRenderTargetMipmap(L)),A.isScene===!0&&A.onAfterRender(v,A,H),Xe.resetDefaultState(),b=-1,S=null,_.pop(),_.length>0?(p=_[_.length-1],W===!0&&de.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,y.pop(),y.length>0?g=y[y.length-1]:g=null};function hn(A,H,K,Q){if(A.visible===!1)return;if(A.layers.test(H.layers)){if(A.isGroup)K=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(H);else if(A.isLight)p.pushLight(A),A.castShadow&&p.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||q.intersectsSprite(A)){Q&&ue.setFromMatrixPosition(A.matrixWorld).applyMatrix4(fe);let Ee=ie.update(A),Ne=A.material;Ne.visible&&g.push(A,Ee,Ne,K,ue.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||q.intersectsObject(A))){let Ee=ie.update(A),Ne=A.material;if(Q&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),ue.copy(A.boundingSphere.center)):(Ee.boundingSphere===null&&Ee.computeBoundingSphere(),ue.copy(Ee.boundingSphere.center)),ue.applyMatrix4(A.matrixWorld).applyMatrix4(fe)),Array.isArray(Ne)){let Ie=Ee.groups;for(let qe=0,Ke=Ie.length;qe<Ke;qe++){let Fe=Ie[qe],tt=Ne[Fe.materialIndex];tt&&tt.visible&&g.push(A,Ee,tt,K,ue.z,Fe)}}else Ne.visible&&g.push(A,Ee,Ne,K,ue.z,null)}}let ve=A.children;for(let Ee=0,Ne=ve.length;Ee<Ne;Ee++)hn(ve[Ee],H,K,Q)}function Ze(A,H,K,Q){let Y=A.opaque,ve=A.transmissive,Ee=A.transparent;p.setupLightsView(K),W===!0&&de.setGlobalState(v.clippingPlanes,K),Q&&pe.viewport(T.copy(Q)),Y.length>0&&Ln(Y,H,K),ve.length>0&&Ln(ve,H,K),Ee.length>0&&Ln(Ee,H,K),pe.buffers.depth.setTest(!0),pe.buffers.depth.setMask(!0),pe.buffers.color.setMask(!0),pe.setPolygonOffset(!1)}function nn(A,H,K,Q){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[Q.id]===void 0&&(p.state.transmissionRenderTarget[Q.id]=new Gi(1,1,{generateMipmaps:!0,type:De.has("EXT_color_buffer_half_float")||De.has("EXT_color_buffer_float")?Io:Vi,minFilter:Rr,samples:4,stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:gt.workingColorSpace}));let ve=p.state.transmissionRenderTarget[Q.id],Ee=Q.viewport||T;ve.setSize(Ee.z,Ee.w);let Ne=v.getRenderTarget();v.setRenderTarget(ve),v.getClearColor(G),U=v.getClearAlpha(),U<1&&v.setClearColor(16777215,.5),v.clear(),Te&&M.render(K);let Ie=v.toneMapping;v.toneMapping=ir;let qe=Q.viewport;if(Q.viewport!==void 0&&(Q.viewport=void 0),p.setupLightsView(Q),W===!0&&de.setGlobalState(v.clippingPlanes,Q),Ln(A,K,Q),C.updateMultisampleRenderTarget(ve),C.updateRenderTargetMipmap(ve),De.has("WEBGL_multisampled_render_to_texture")===!1){let Ke=!1;for(let Fe=0,tt=H.length;Fe<tt;Fe++){let ut=H[Fe],Mt=ut.object,$t=ut.geometry,dt=ut.material,ke=ut.group;if(dt.side===ni&&Mt.layers.test(Q.layers)){let ln=dt.side;dt.side=Qt,dt.needsUpdate=!0,Dn(Mt,K,Q,$t,dt,ke),dt.side=ln,dt.needsUpdate=!0,Ke=!0}}Ke===!0&&(C.updateMultisampleRenderTarget(ve),C.updateRenderTargetMipmap(ve))}v.setRenderTarget(Ne),v.setClearColor(G,U),qe!==void 0&&(Q.viewport=qe),v.toneMapping=Ie}function Ln(A,H,K){let Q=H.isScene===!0?H.overrideMaterial:null;for(let Y=0,ve=A.length;Y<ve;Y++){let Ee=A[Y],Ne=Ee.object,Ie=Ee.geometry,qe=Q===null?Ee.material:Q,Ke=Ee.group;Ne.layers.test(K.layers)&&Dn(Ne,H,K,Ie,qe,Ke)}}function Dn(A,H,K,Q,Y,ve){A.onBeforeRender(v,H,K,Q,Y,ve),A.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),Y.onBeforeRender(v,H,K,Q,A,ve),Y.transparent===!0&&Y.side===ni&&Y.forceSinglePass===!1?(Y.side=Qt,Y.needsUpdate=!0,v.renderBufferDirect(K,H,Q,Y,A,ve),Y.side=rr,Y.needsUpdate=!0,v.renderBufferDirect(K,H,Q,Y,A,ve),Y.side=ni):v.renderBufferDirect(K,H,Q,Y,A,ve),A.onAfterRender(v,H,K,Q,Y,ve)}function rn(A,H,K){H.isScene!==!0&&(H=Ce);let Q=xe.get(A),Y=p.state.lights,ve=p.state.shadowsArray,Ee=Y.state.version,Ne=be.getParameters(A,Y.state,ve,H,K),Ie=be.getProgramCacheKey(Ne),qe=Q.programs;Q.environment=A.isMeshStandardMaterial?H.environment:null,Q.fog=H.fog,Q.envMap=(A.isMeshStandardMaterial?X:w).get(A.envMap||Q.environment),Q.envMapRotation=Q.environment!==null&&A.envMap===null?H.environmentRotation:A.envMapRotation,qe===void 0&&(A.addEventListener("dispose",Se),qe=new Map,Q.programs=qe);let Ke=qe.get(Ie);if(Ke!==void 0){if(Q.currentProgram===Ke&&Q.lightsStateVersion===Ee)return kt(A,Ne),Ke}else Ne.uniforms=be.getUniforms(A),A.onBeforeCompile(Ne,v),Ke=be.acquireProgram(Ne,Ie),qe.set(Ie,Ke),Q.uniforms=Ne.uniforms;let Fe=Q.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Fe.clippingPlanes=de.uniform),kt(A,Ne),Q.needsLights=Xi(A),Q.lightsStateVersion=Ee,Q.needsLights&&(Fe.ambientLightColor.value=Y.state.ambient,Fe.lightProbe.value=Y.state.probe,Fe.directionalLights.value=Y.state.directional,Fe.directionalLightShadows.value=Y.state.directionalShadow,Fe.spotLights.value=Y.state.spot,Fe.spotLightShadows.value=Y.state.spotShadow,Fe.rectAreaLights.value=Y.state.rectArea,Fe.ltc_1.value=Y.state.rectAreaLTC1,Fe.ltc_2.value=Y.state.rectAreaLTC2,Fe.pointLights.value=Y.state.point,Fe.pointLightShadows.value=Y.state.pointShadow,Fe.hemisphereLights.value=Y.state.hemi,Fe.directionalShadowMap.value=Y.state.directionalShadowMap,Fe.directionalShadowMatrix.value=Y.state.directionalShadowMatrix,Fe.spotShadowMap.value=Y.state.spotShadowMap,Fe.spotLightMatrix.value=Y.state.spotLightMatrix,Fe.spotLightMap.value=Y.state.spotLightMap,Fe.pointShadowMap.value=Y.state.pointShadowMap,Fe.pointShadowMatrix.value=Y.state.pointShadowMatrix),Q.currentProgram=Ke,Q.uniformsList=null,Ke}function pn(A){if(A.uniformsList===null){let H=A.currentProgram.getUniforms();A.uniformsList=ma.seqWithValue(H.seq,A.uniforms)}return A.uniformsList}function kt(A,H){let K=xe.get(A);K.outputColorSpace=H.outputColorSpace,K.batching=H.batching,K.batchingColor=H.batchingColor,K.instancing=H.instancing,K.instancingColor=H.instancingColor,K.instancingMorph=H.instancingMorph,K.skinning=H.skinning,K.morphTargets=H.morphTargets,K.morphNormals=H.morphNormals,K.morphColors=H.morphColors,K.morphTargetsCount=H.morphTargetsCount,K.numClippingPlanes=H.numClippingPlanes,K.numIntersection=H.numClipIntersection,K.vertexAlphas=H.vertexAlphas,K.vertexTangents=H.vertexTangents,K.toneMapping=H.toneMapping}function bn(A,H,K,Q,Y){H.isScene!==!0&&(H=Ce),C.resetTextureUnits();let ve=H.fog,Ee=Q.isMeshStandardMaterial?H.environment:null,Ne=L===null?v.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:wa,Ie=(Q.isMeshStandardMaterial?X:w).get(Q.envMap||Ee),qe=Q.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,Ke=!!K.attributes.tangent&&(!!Q.normalMap||Q.anisotropy>0),Fe=!!K.morphAttributes.position,tt=!!K.morphAttributes.normal,ut=!!K.morphAttributes.color,Mt=ir;Q.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(Mt=v.toneMapping);let $t=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,dt=$t!==void 0?$t.length:0,ke=xe.get(Q),ln=p.state.lights;if(W===!0&&(j===!0||A!==S)){let An=A===S&&Q.id===b;de.setState(Q,A,An)}let ft=!1;Q.version===ke.__version?(ke.needsLights&&ke.lightsStateVersion!==ln.state.version||ke.outputColorSpace!==Ne||Y.isBatchedMesh&&ke.batching===!1||!Y.isBatchedMesh&&ke.batching===!0||Y.isBatchedMesh&&ke.batchingColor===!0&&Y.colorTexture===null||Y.isBatchedMesh&&ke.batchingColor===!1&&Y.colorTexture!==null||Y.isInstancedMesh&&ke.instancing===!1||!Y.isInstancedMesh&&ke.instancing===!0||Y.isSkinnedMesh&&ke.skinning===!1||!Y.isSkinnedMesh&&ke.skinning===!0||Y.isInstancedMesh&&ke.instancingColor===!0&&Y.instanceColor===null||Y.isInstancedMesh&&ke.instancingColor===!1&&Y.instanceColor!==null||Y.isInstancedMesh&&ke.instancingMorph===!0&&Y.morphTexture===null||Y.isInstancedMesh&&ke.instancingMorph===!1&&Y.morphTexture!==null||ke.envMap!==Ie||Q.fog===!0&&ke.fog!==ve||ke.numClippingPlanes!==void 0&&(ke.numClippingPlanes!==de.numPlanes||ke.numIntersection!==de.numIntersection)||ke.vertexAlphas!==qe||ke.vertexTangents!==Ke||ke.morphTargets!==Fe||ke.morphNormals!==tt||ke.morphColors!==ut||ke.toneMapping!==Mt||ke.morphTargetsCount!==dt)&&(ft=!0):(ft=!0,ke.__version=Q.version);let mn=ke.currentProgram;ft===!0&&(mn=rn(Q,H,Y));let kn=!1,Jt=!1,Jn=!1,St=mn.getUniforms(),wn=ke.uniforms;if(pe.useProgram(mn.program)&&(kn=!0,Jt=!0,Jn=!0),Q.id!==b&&(b=Q.id,Jt=!0),kn||S!==A){pe.buffers.depth.getReversed()?(ae.copy(A.projectionMatrix),wv(ae),Av(ae),St.setValue(O,"projectionMatrix",ae)):St.setValue(O,"projectionMatrix",A.projectionMatrix),St.setValue(O,"viewMatrix",A.matrixWorldInverse);let pi=St.map.cameraPosition;pi!==void 0&&pi.setValue(O,me.setFromMatrixPosition(A.matrixWorld)),_e.logarithmicDepthBuffer&&St.setValue(O,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(Q.isMeshPhongMaterial||Q.isMeshToonMaterial||Q.isMeshLambertMaterial||Q.isMeshBasicMaterial||Q.isMeshStandardMaterial||Q.isShaderMaterial)&&St.setValue(O,"isOrthographic",A.isOrthographicCamera===!0),S!==A&&(S=A,Jt=!0,Jn=!0)}if(Y.isSkinnedMesh){St.setOptional(O,Y,"bindMatrix"),St.setOptional(O,Y,"bindMatrixInverse");let An=Y.skeleton;An&&(An.boneTexture===null&&An.computeBoneTexture(),St.setValue(O,"boneTexture",An.boneTexture,C))}Y.isBatchedMesh&&(St.setOptional(O,Y,"batchingTexture"),St.setValue(O,"batchingTexture",Y._matricesTexture,C),St.setOptional(O,Y,"batchingIdTexture"),St.setValue(O,"batchingIdTexture",Y._indirectTexture,C),St.setOptional(O,Y,"batchingColorTexture"),Y._colorsTexture!==null&&St.setValue(O,"batchingColorTexture",Y._colorsTexture,C));let xr=K.morphAttributes;if((xr.position!==void 0||xr.normal!==void 0||xr.color!==void 0)&&Re.update(Y,K,mn),(Jt||ke.receiveShadow!==Y.receiveShadow)&&(ke.receiveShadow=Y.receiveShadow,St.setValue(O,"receiveShadow",Y.receiveShadow)),Q.isMeshGouraudMaterial&&Q.envMap!==null&&(wn.envMap.value=Ie,wn.flipEnvMap.value=Ie.isCubeTexture&&Ie.isRenderTargetTexture===!1?-1:1),Q.isMeshStandardMaterial&&Q.envMap===null&&H.environment!==null&&(wn.envMapIntensity.value=H.environmentIntensity),Jt&&(St.setValue(O,"toneMappingExposure",v.toneMappingExposure),ke.needsLights&&qi(wn,Jn),ve&&Q.fog===!0&&he.refreshFogUniforms(wn,ve),he.refreshMaterialUniforms(wn,Q,D,te,p.state.transmissionRenderTarget[A.id]),ma.upload(O,pn(ke),wn,C)),Q.isShaderMaterial&&Q.uniformsNeedUpdate===!0&&(ma.upload(O,pn(ke),wn,C),Q.uniformsNeedUpdate=!1),Q.isSpriteMaterial&&St.setValue(O,"center",Y.center),St.setValue(O,"modelViewMatrix",Y.modelViewMatrix),St.setValue(O,"normalMatrix",Y.normalMatrix),St.setValue(O,"modelMatrix",Y.matrixWorld),Q.isShaderMaterial||Q.isRawShaderMaterial){let An=Q.uniformsGroups;for(let pi=0,mi=An.length;pi<mi;pi++){let _s=An[pi];R.update(_s,mn),R.bind(_s,mn)}}return mn}function qi(A,H){A.ambientLightColor.needsUpdate=H,A.lightProbe.needsUpdate=H,A.directionalLights.needsUpdate=H,A.directionalLightShadows.needsUpdate=H,A.pointLights.needsUpdate=H,A.pointLightShadows.needsUpdate=H,A.spotLights.needsUpdate=H,A.spotLightShadows.needsUpdate=H,A.rectAreaLights.needsUpdate=H,A.hemisphereLights.needsUpdate=H}function Xi(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(A,H,K){xe.get(A.texture).__webglTexture=H,xe.get(A.depthTexture).__webglTexture=K;let Q=xe.get(A);Q.__hasExternalTextures=!0,Q.__autoAllocateDepthBuffer=K===void 0,Q.__autoAllocateDepthBuffer||De.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Q.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(A,H){let K=xe.get(A);K.__webglFramebuffer=H,K.__useDefaultFramebuffer=H===void 0},this.setRenderTarget=function(A,H=0,K=0){L=A,E=H,P=K;let Q=!0,Y=null,ve=!1,Ee=!1;if(A){let Ie=xe.get(A);if(Ie.__useDefaultFramebuffer!==void 0)pe.bindFramebuffer(O.FRAMEBUFFER,null),Q=!1;else if(Ie.__webglFramebuffer===void 0)C.setupRenderTarget(A);else if(Ie.__hasExternalTextures)C.rebindTextures(A,xe.get(A.texture).__webglTexture,xe.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){let Fe=A.depthTexture;if(Ie.__boundDepthTexture!==Fe){if(Fe!==null&&xe.has(Fe)&&(A.width!==Fe.image.width||A.height!==Fe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");C.setupDepthRenderbuffer(A)}}let qe=A.texture;(qe.isData3DTexture||qe.isDataArrayTexture||qe.isCompressedArrayTexture)&&(Ee=!0);let Ke=xe.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Ke[H])?Y=Ke[H][K]:Y=Ke[H],ve=!0):A.samples>0&&C.useMultisampledRTT(A)===!1?Y=xe.get(A).__webglMultisampledFramebuffer:Array.isArray(Ke)?Y=Ke[K]:Y=Ke,T.copy(A.viewport),B.copy(A.scissor),F=A.scissorTest}else T.copy($).multiplyScalar(D).floor(),B.copy(re).multiplyScalar(D).floor(),F=le;if(pe.bindFramebuffer(O.FRAMEBUFFER,Y)&&Q&&pe.drawBuffers(A,Y),pe.viewport(T),pe.scissor(B),pe.setScissorTest(F),ve){let Ie=xe.get(A.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+H,Ie.__webglTexture,K)}else if(Ee){let Ie=xe.get(A.texture),qe=H||0;O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,Ie.__webglTexture,K||0,qe)}b=-1},this.readRenderTargetPixels=function(A,H,K,Q,Y,ve,Ee){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ne=xe.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Ee!==void 0&&(Ne=Ne[Ee]),Ne){pe.bindFramebuffer(O.FRAMEBUFFER,Ne);try{let Ie=A.texture,qe=Ie.format,Ke=Ie.type;if(!_e.textureFormatReadable(qe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!_e.textureTypeReadable(Ke)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=A.width-Q&&K>=0&&K<=A.height-Y&&O.readPixels(H,K,Q,Y,He.convert(qe),He.convert(Ke),ve)}finally{let Ie=L!==null?xe.get(L).__webglFramebuffer:null;pe.bindFramebuffer(O.FRAMEBUFFER,Ie)}}},this.readRenderTargetPixelsAsync=async function(A,H,K,Q,Y,ve,Ee){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ne=xe.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Ee!==void 0&&(Ne=Ne[Ee]),Ne){let Ie=A.texture,qe=Ie.format,Ke=Ie.type;if(!_e.textureFormatReadable(qe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!_e.textureTypeReadable(Ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(H>=0&&H<=A.width-Q&&K>=0&&K<=A.height-Y){pe.bindFramebuffer(O.FRAMEBUFFER,Ne);let Fe=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,Fe),O.bufferData(O.PIXEL_PACK_BUFFER,ve.byteLength,O.STREAM_READ),O.readPixels(H,K,Q,Y,He.convert(qe),He.convert(Ke),0);let tt=L!==null?xe.get(L).__webglFramebuffer:null;pe.bindFramebuffer(O.FRAMEBUFFER,tt);let ut=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await bv(O,ut,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,Fe),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,ve),O.deleteBuffer(Fe),O.deleteSync(ut),ve}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(A,H=null,K=0){A.isTexture!==!0&&(lo("WebGLRenderer: copyFramebufferToTexture function signature has changed."),H=arguments[0]||null,A=arguments[1]);let Q=Math.pow(2,-K),Y=Math.floor(A.image.width*Q),ve=Math.floor(A.image.height*Q),Ee=H!==null?H.x:0,Ne=H!==null?H.y:0;C.setTexture2D(A,0),O.copyTexSubImage2D(O.TEXTURE_2D,K,0,0,Ee,Ne,Y,ve),pe.unbindTexture()},this.copyTextureToTexture=function(A,H,K=null,Q=null,Y=0){A.isTexture!==!0&&(lo("WebGLRenderer: copyTextureToTexture function signature has changed."),Q=arguments[0]||null,A=arguments[1],H=arguments[2],Y=arguments[3]||0,K=null);let ve,Ee,Ne,Ie,qe,Ke,Fe,tt,ut,Mt=A.isCompressedTexture?A.mipmaps[Y]:A.image;K!==null?(ve=K.max.x-K.min.x,Ee=K.max.y-K.min.y,Ne=K.isBox3?K.max.z-K.min.z:1,Ie=K.min.x,qe=K.min.y,Ke=K.isBox3?K.min.z:0):(ve=Mt.width,Ee=Mt.height,Ne=Mt.depth||1,Ie=0,qe=0,Ke=0),Q!==null?(Fe=Q.x,tt=Q.y,ut=Q.z):(Fe=0,tt=0,ut=0);let $t=He.convert(H.format),dt=He.convert(H.type),ke;H.isData3DTexture?(C.setTexture3D(H,0),ke=O.TEXTURE_3D):H.isDataArrayTexture||H.isCompressedArrayTexture?(C.setTexture2DArray(H,0),ke=O.TEXTURE_2D_ARRAY):(C.setTexture2D(H,0),ke=O.TEXTURE_2D),O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,H.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,H.unpackAlignment);let ln=O.getParameter(O.UNPACK_ROW_LENGTH),ft=O.getParameter(O.UNPACK_IMAGE_HEIGHT),mn=O.getParameter(O.UNPACK_SKIP_PIXELS),kn=O.getParameter(O.UNPACK_SKIP_ROWS),Jt=O.getParameter(O.UNPACK_SKIP_IMAGES);O.pixelStorei(O.UNPACK_ROW_LENGTH,Mt.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Mt.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,Ie),O.pixelStorei(O.UNPACK_SKIP_ROWS,qe),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Ke);let Jn=A.isDataArrayTexture||A.isData3DTexture,St=H.isDataArrayTexture||H.isData3DTexture;if(A.isRenderTargetTexture||A.isDepthTexture){let wn=xe.get(A),xr=xe.get(H),An=xe.get(wn.__renderTarget),pi=xe.get(xr.__renderTarget);pe.bindFramebuffer(O.READ_FRAMEBUFFER,An.__webglFramebuffer),pe.bindFramebuffer(O.DRAW_FRAMEBUFFER,pi.__webglFramebuffer);for(let mi=0;mi<Ne;mi++)Jn&&O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,xe.get(A).__webglTexture,Y,Ke+mi),A.isDepthTexture?(St&&O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,xe.get(H).__webglTexture,Y,ut+mi),O.blitFramebuffer(Ie,qe,ve,Ee,Fe,tt,ve,Ee,O.DEPTH_BUFFER_BIT,O.NEAREST)):St?O.copyTexSubImage3D(ke,Y,Fe,tt,ut+mi,Ie,qe,ve,Ee):O.copyTexSubImage2D(ke,Y,Fe,tt,ut+mi,Ie,qe,ve,Ee);pe.bindFramebuffer(O.READ_FRAMEBUFFER,null),pe.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else St?A.isDataTexture||A.isData3DTexture?O.texSubImage3D(ke,Y,Fe,tt,ut,ve,Ee,Ne,$t,dt,Mt.data):H.isCompressedArrayTexture?O.compressedTexSubImage3D(ke,Y,Fe,tt,ut,ve,Ee,Ne,$t,Mt.data):O.texSubImage3D(ke,Y,Fe,tt,ut,ve,Ee,Ne,$t,dt,Mt):A.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,Y,Fe,tt,ve,Ee,$t,dt,Mt.data):A.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,Y,Fe,tt,Mt.width,Mt.height,$t,Mt.data):O.texSubImage2D(O.TEXTURE_2D,Y,Fe,tt,ve,Ee,$t,dt,Mt);O.pixelStorei(O.UNPACK_ROW_LENGTH,ln),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,ft),O.pixelStorei(O.UNPACK_SKIP_PIXELS,mn),O.pixelStorei(O.UNPACK_SKIP_ROWS,kn),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Jt),Y===0&&H.generateMipmaps&&O.generateMipmap(ke),pe.unbindTexture()},this.copyTextureToTexture3D=function(A,H,K=null,Q=null,Y=0){return A.isTexture!==!0&&(lo("WebGLRenderer: copyTextureToTexture3D function signature has changed."),K=arguments[0]||null,Q=arguments[1]||null,A=arguments[2],H=arguments[3],Y=arguments[4]||0),lo('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(A,H,K,Q,Y)},this.initRenderTarget=function(A){xe.get(A).__webglFramebuffer===void 0&&C.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?C.setTextureCube(A,0):A.isData3DTexture?C.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?C.setTexture2DArray(A,0):C.setTexture2D(A,0),pe.unbindTexture()},this.resetState=function(){E=0,P=0,L=null,pe.reset(),Xe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return zi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorspace=gt._getDrawingBufferColorSpace(e),t.unpackColorSpace=gt._getUnpackColorSpace()}};var wl=class extends en{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new _i,this.environmentIntensity=1,this.environmentRotation=new _i,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Ud=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=xd,this.updateRanges=[],this.version=0,this.uuid=yi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let r=0,a=this.stride;r<a;r++)this.array[e+r]=t.array[i+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=yi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=yi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},xn=new z,Al=class n{constructor(e,t,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)xn.fromBufferAttribute(this,t),xn.applyMatrix4(e),this.setXYZ(t,xn.x,xn.y,xn.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)xn.fromBufferAttribute(this,t),xn.applyNormalMatrix(e),this.setXYZ(t,xn.x,xn.y,xn.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)xn.fromBufferAttribute(this,t),xn.transformDirection(e),this.setXYZ(t,xn.x,xn.y,xn.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=ii(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=bt(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=ii(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=ii(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=ii(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=ii(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=bt(t,this.array),i=bt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=bt(t,this.array),i=bt(i,this.array),r=bt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this}setXYZW(e,t,i,r,a){return e=e*this.data.stride+this.offset,this.normalized&&(t=bt(t,this.array),i=bt(i,this.array),r=bt(r,this.array),a=bt(a,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this.data.array[e+3]=a,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let r=i*this.data.stride+this.offset;for(let a=0;a<this.itemSize;a++)t.push(this.data.array[r+a])}return new Fn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new n(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let r=i*this.data.stride+this.offset;for(let a=0;a<this.itemSize;a++)t.push(this.data.array[r+a])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},So=class extends Mi{static get type(){return"SpriteMaterial"}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new Je(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},oa,ro=new z,sa=new z,la=new z,ca=new Le,ao=new Le,Jm=new wt,Ys=new z,oo=new z,Zs=new z,pm=new Le,Au=new Le,mm=new Le,El=class extends en{constructor(e=new So){if(super(),this.isSprite=!0,this.type="Sprite",oa===void 0){oa=new Vt;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new Ud(t,5);oa.setIndex([0,1,2,0,2,3]),oa.setAttribute("position",new Al(i,3,0,!1)),oa.setAttribute("uv",new Al(i,2,3,!1))}this.geometry=oa,this.material=e,this.center=new Le(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),sa.setFromMatrixScale(this.matrixWorld),Jm.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),la.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&sa.multiplyScalar(-la.z);let i=this.material.rotation,r,a;i!==0&&(a=Math.cos(i),r=Math.sin(i));let o=this.center;Ks(Ys.set(-.5,-.5,0),la,o,sa,r,a),Ks(oo.set(.5,-.5,0),la,o,sa,r,a),Ks(Zs.set(.5,.5,0),la,o,sa,r,a),pm.set(0,0),Au.set(1,0),mm.set(1,1);let s=e.ray.intersectTriangle(Ys,oo,Zs,!1,ro);if(s===null&&(Ks(oo.set(-.5,.5,0),la,o,sa,r,a),Au.set(0,1),s=e.ray.intersectTriangle(Ys,Zs,oo,!1,ro),s===null))return;let l=e.ray.origin.distanceTo(ro);l<e.near||l>e.far||t.push({distance:l,point:ro.clone(),uv:tr.getInterpolation(ro,Ys,oo,Zs,pm,Au,mm,new Le),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function Ks(n,e,t,i,r,a){ca.subVectors(n,t).addScalar(.5).multiply(i),r!==void 0?(ao.x=a*ca.x-r*ca.y,ao.y=r*ca.x+a*ca.y):ao.copy(ca),n.copy(e),n.x+=ao.x,n.y+=ao.y,n.applyMatrix4(Jm)}var Ur=class extends Mi{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new Je(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Tl=new z,Cl=new z,gm=new wt,so=new _o,$s=new Lr,Eu=new z,xm=new z,Sa=class extends en{constructor(e=new Vt,t=new Ur){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[0];for(let r=1,a=t.count;r<a;r++)Tl.fromBufferAttribute(t,r-1),Cl.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=Tl.distanceTo(Cl);e.setAttribute("lineDistance",new Tt(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let i=this.geometry,r=this.matrixWorld,a=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),$s.copy(i.boundingSphere),$s.applyMatrix4(r),$s.radius+=a,e.ray.intersectsSphere($s)===!1)return;gm.copy(r).invert(),so.copy(e.ray).applyMatrix4(gm);let s=a/((this.scale.x+this.scale.y+this.scale.z)/3),l=s*s,u=this.isLineSegments?2:1,c=i.index,f=i.attributes.position;if(c!==null){let h=Math.max(0,o.start),m=Math.min(c.count,o.start+o.count);for(let x=h,g=m-1;x<g;x+=u){let p=c.getX(x),y=c.getX(x+1),_=Js(this,e,so,l,p,y);_&&t.push(_)}if(this.isLineLoop){let x=c.getX(m-1),g=c.getX(h),p=Js(this,e,so,l,x,g);p&&t.push(p)}}else{let h=Math.max(0,o.start),m=Math.min(f.count,o.start+o.count);for(let x=h,g=m-1;x<g;x+=u){let p=Js(this,e,so,l,x,x+1);p&&t.push(p)}if(this.isLineLoop){let x=Js(this,e,so,l,m-1,h);x&&t.push(x)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,o=r.length;a<o;a++){let s=r[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[s]=a}}}}};function Js(n,e,t,i,r,a){let o=n.geometry.attributes.position;if(Tl.fromBufferAttribute(o,r),Cl.fromBufferAttribute(o,a),t.distanceSqToSegment(Tl,Cl,Eu,xm)>i)return;Eu.applyMatrix4(n.matrixWorld);let l=e.ray.origin.distanceTo(Eu);if(!(l<e.near||l>e.far))return{distance:l,point:xm.clone().applyMatrix4(n.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:n}}var si=class extends Mi{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new Je(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},vm=new wt,Nd=new _o,js=new Lr,Qs=new z,Si=class extends en{constructor(e=new Vt,t=new si){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let i=this.geometry,r=this.matrixWorld,a=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),js.copy(i.boundingSphere),js.applyMatrix4(r),js.radius+=a,e.ray.intersectsSphere(js)===!1)return;vm.copy(r).invert(),Nd.copy(e.ray).applyMatrix4(vm);let s=a/((this.scale.x+this.scale.y+this.scale.z)/3),l=s*s,u=i.index,d=i.attributes.position;if(u!==null){let f=Math.max(0,o.start),h=Math.min(u.count,o.start+o.count);for(let m=f,x=h;m<x;m++){let g=u.getX(m);Qs.fromBufferAttribute(d,g),ym(Qs,g,l,r,e,t,this)}}else{let f=Math.max(0,o.start),h=Math.min(d.count,o.start+o.count);for(let m=f,x=h;m<x;m++)Qs.fromBufferAttribute(d,m),ym(Qs,m,l,r,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,o=r.length;a<o;a++){let s=r[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[s]=a}}}}};function ym(n,e,t,i,r,a,o){let s=Nd.distanceSqToPoint(n);if(s<t){let l=new z;Nd.closestPointToPoint(n,l),l.applyMatrix4(i);let u=r.ray.origin.distanceTo(l);if(u<r.near||u>r.far)return;a.push({distance:u,distanceToRay:Math.sqrt(s),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}var or=class extends En{constructor(e,t,i,r,a,o,s,l,u){super(e,t,i,r,a,o,s,l,u),this.isCanvasTexture=!0,this.needsUpdate=!0}},Gn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){let i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],i,r=this.getPoint(0),a=0;t.push(0);for(let o=1;o<=e;o++)i=this.getPoint(o/e),a+=i.distanceTo(r),t.push(a),r=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){let i=this.getLengths(),r=0,a=i.length,o;t?o=t:o=e*i[a-1];let s=0,l=a-1,u;for(;s<=l;)if(r=Math.floor(s+(l-s)/2),u=i[r]-o,u<0)s=r+1;else if(u>0)l=r-1;else{l=r;break}if(r=l,i[r]===o)return r/(a-1);let c=i[r],f=i[r+1]-c,h=(o-c)/f;return(r+h)/(a-1)}getTangent(e,t){let r=e-1e-4,a=e+1e-4;r<0&&(r=0),a>1&&(a=1);let o=this.getPoint(r),s=this.getPoint(a),l=t||(o.isVector2?new Le:new z);return l.copy(s).sub(o).normalize(),l}getTangentAt(e,t){let i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t){let i=new z,r=[],a=[],o=[],s=new z,l=new wt;for(let h=0;h<=e;h++){let m=h/e;r[h]=this.getTangentAt(m,new z)}a[0]=new z,o[0]=new z;let u=Number.MAX_VALUE,c=Math.abs(r[0].x),d=Math.abs(r[0].y),f=Math.abs(r[0].z);c<=u&&(u=c,i.set(1,0,0)),d<=u&&(u=d,i.set(0,1,0)),f<=u&&i.set(0,0,1),s.crossVectors(r[0],i).normalize(),a[0].crossVectors(r[0],s),o[0].crossVectors(r[0],a[0]);for(let h=1;h<=e;h++){if(a[h]=a[h-1].clone(),o[h]=o[h-1].clone(),s.crossVectors(r[h-1],r[h]),s.length()>Number.EPSILON){s.normalize();let m=Math.acos(on(r[h-1].dot(r[h]),-1,1));a[h].applyMatrix4(l.makeRotationAxis(s,m))}o[h].crossVectors(r[h],a[h])}if(t===!0){let h=Math.acos(on(a[0].dot(a[e]),-1,1));h/=e,r[0].dot(s.crossVectors(a[0],a[e]))>0&&(h=-h);for(let m=1;m<=e;m++)a[m].applyMatrix4(l.makeRotationAxis(r[m],h*m)),o[m].crossVectors(r[m],a[m])}return{tangents:r,normals:a,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},bo=class extends Gn{constructor(e=0,t=0,i=1,r=1,a=0,o=Math.PI*2,s=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=r,this.aStartAngle=a,this.aEndAngle=o,this.aClockwise=s,this.aRotation=l}getPoint(e,t=new Le){let i=t,r=Math.PI*2,a=this.aEndAngle-this.aStartAngle,o=Math.abs(a)<Number.EPSILON;for(;a<0;)a+=r;for(;a>r;)a-=r;a<Number.EPSILON&&(o?a=0:a=r),this.aClockwise===!0&&!o&&(a===r?a=-r:a=a-r);let s=this.aStartAngle+e*a,l=this.aX+this.xRadius*Math.cos(s),u=this.aY+this.yRadius*Math.sin(s);if(this.aRotation!==0){let c=Math.cos(this.aRotation),d=Math.sin(this.aRotation),f=l-this.aX,h=u-this.aY;l=f*c-h*d+this.aX,u=f*d+h*c+this.aY}return i.set(l,u)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Fd=class extends bo{constructor(e,t,i,r,a,o){super(e,t,i,i,r,a,o),this.isArcCurve=!0,this.type="ArcCurve"}};function hf(){let n=0,e=0,t=0,i=0;function r(a,o,s,l){n=a,e=s,t=-3*a+3*o-2*s-l,i=2*a-2*o+s+l}return{initCatmullRom:function(a,o,s,l,u){r(o,s,u*(s-a),u*(l-o))},initNonuniformCatmullRom:function(a,o,s,l,u,c,d){let f=(o-a)/u-(s-a)/(u+c)+(s-o)/c,h=(s-o)/c-(l-o)/(c+d)+(l-s)/d;f*=c,h*=c,r(o,s,f,h)},calc:function(a){let o=a*a,s=o*a;return n+e*a+t*o+i*s}}}var el=new z,Tu=new hf,Cu=new hf,Ru=new hf,Od=class extends Gn{constructor(e=[],t=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=r}getPoint(e,t=new z){let i=t,r=this.points,a=r.length,o=(a-(this.closed?0:1))*e,s=Math.floor(o),l=o-s;this.closed?s+=s>0?0:(Math.floor(Math.abs(s)/a)+1)*a:l===0&&s===a-1&&(s=a-2,l=1);let u,c;this.closed||s>0?u=r[(s-1)%a]:(el.subVectors(r[0],r[1]).add(r[0]),u=el);let d=r[s%a],f=r[(s+1)%a];if(this.closed||s+2<a?c=r[(s+2)%a]:(el.subVectors(r[a-1],r[a-2]).add(r[a-1]),c=el),this.curveType==="centripetal"||this.curveType==="chordal"){let h=this.curveType==="chordal"?.5:.25,m=Math.pow(u.distanceToSquared(d),h),x=Math.pow(d.distanceToSquared(f),h),g=Math.pow(f.distanceToSquared(c),h);x<1e-4&&(x=1),m<1e-4&&(m=x),g<1e-4&&(g=x),Tu.initNonuniformCatmullRom(u.x,d.x,f.x,c.x,m,x,g),Cu.initNonuniformCatmullRom(u.y,d.y,f.y,c.y,m,x,g),Ru.initNonuniformCatmullRom(u.z,d.z,f.z,c.z,m,x,g)}else this.curveType==="catmullrom"&&(Tu.initCatmullRom(u.x,d.x,f.x,c.x,this.tension),Cu.initCatmullRom(u.y,d.y,f.y,c.y,this.tension),Ru.initCatmullRom(u.z,d.z,f.z,c.z,this.tension));return i.set(Tu.calc(l),Cu.calc(l),Ru.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(new z().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function _m(n,e,t,i,r){let a=(i-e)*.5,o=(r-t)*.5,s=n*n,l=n*s;return(2*t-2*i+a+o)*l+(-3*t+3*i-2*a-o)*s+a*n+t}function yS(n,e){let t=1-n;return t*t*e}function _S(n,e){return 2*(1-n)*n*e}function MS(n,e){return n*n*e}function po(n,e,t,i){return yS(n,e)+_S(n,t)+MS(n,i)}function SS(n,e){let t=1-n;return t*t*t*e}function bS(n,e){let t=1-n;return 3*t*t*n*e}function wS(n,e){return 3*(1-n)*n*n*e}function AS(n,e){return n*n*n*e}function mo(n,e,t,i,r){return SS(n,e)+bS(n,t)+wS(n,i)+AS(n,r)}var Rl=class extends Gn{constructor(e=new Le,t=new Le,i=new Le,r=new Le){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new Le){let i=t,r=this.v0,a=this.v1,o=this.v2,s=this.v3;return i.set(mo(e,r.x,a.x,o.x,s.x),mo(e,r.y,a.y,o.y,s.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Bd=class extends Gn{constructor(e=new z,t=new z,i=new z,r=new z){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new z){let i=t,r=this.v0,a=this.v1,o=this.v2,s=this.v3;return i.set(mo(e,r.x,a.x,o.x,s.x),mo(e,r.y,a.y,o.y,s.y),mo(e,r.z,a.z,o.z,s.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Pl=class extends Gn{constructor(e=new Le,t=new Le){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Le){let i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Le){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},kd=class extends Gn{constructor(e=new z,t=new z){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new z){let i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new z){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Il=class extends Gn{constructor(e=new Le,t=new Le,i=new Le){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new Le){let i=t,r=this.v0,a=this.v1,o=this.v2;return i.set(po(e,r.x,a.x,o.x),po(e,r.y,a.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},zd=class extends Gn{constructor(e=new z,t=new z,i=new z){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new z){let i=t,r=this.v0,a=this.v1,o=this.v2;return i.set(po(e,r.x,a.x,o.x),po(e,r.y,a.y,o.y),po(e,r.z,a.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ll=class extends Gn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Le){let i=t,r=this.points,a=(r.length-1)*e,o=Math.floor(a),s=a-o,l=r[o===0?o:o-1],u=r[o],c=r[o>r.length-2?r.length-1:o+1],d=r[o>r.length-3?r.length-1:o+2];return i.set(_m(s,l.x,u.x,c.x,d.x),_m(s,l.y,u.y,c.y,d.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(new Le().fromArray(r))}return this}},Mm=Object.freeze({__proto__:null,ArcCurve:Fd,CatmullRomCurve3:Od,CubicBezierCurve:Rl,CubicBezierCurve3:Bd,EllipseCurve:bo,LineCurve:Pl,LineCurve3:kd,QuadraticBezierCurve:Il,QuadraticBezierCurve3:zd,SplineCurve:Ll}),Hd=class extends Gn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Mm[i](t,e))}return this}getPoint(e,t){let i=e*this.getLength(),r=this.getCurveLengths(),a=0;for(;a<r.length;){if(r[a]>=i){let o=r[a]-i,s=this.curves[a],l=s.getLength(),u=l===0?0:1-o/l;return s.getPointAt(u,t)}a++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let i=0,r=this.curves.length;i<r;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],i;for(let r=0,a=this.curves;r<a.length;r++){let o=a[r],s=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(s);for(let u=0;u<l.length;u++){let c=l[u];i&&i.equals(c)||(t.push(c),i=c)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){let r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){let r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){let r=e.curves[t];this.curves.push(new Mm[r.type]().fromJSON(r))}return this}},Dl=class extends Hd{constructor(e){super(),this.type="Path",this.currentPoint=new Le,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let i=new Pl(this.currentPoint.clone(),new Le(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,r){let a=new Il(this.currentPoint.clone(),new Le(e,t),new Le(i,r));return this.curves.push(a),this.currentPoint.set(i,r),this}bezierCurveTo(e,t,i,r,a,o){let s=new Rl(this.currentPoint.clone(),new Le(e,t),new Le(i,r),new Le(a,o));return this.curves.push(s),this.currentPoint.set(a,o),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),i=new Ll(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,r,a,o){let s=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+s,t+l,i,r,a,o),this}absarc(e,t,i,r,a,o){return this.absellipse(e,t,i,i,r,a,o),this}ellipse(e,t,i,r,a,o,s,l){let u=this.currentPoint.x,c=this.currentPoint.y;return this.absellipse(e+u,t+c,i,r,a,o,s,l),this}absellipse(e,t,i,r,a,o,s,l){let u=new bo(e,t,i,r,a,o,s,l);if(this.curves.length>0){let d=u.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(u);let c=u.getPoint(1);return this.currentPoint.copy(c),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}};var wo=class extends Dl{constructor(e){super(e),this.uuid=yi(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let i=0,r=this.holes.length;i<r;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){let r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){let r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){let r=e.holes[t];this.holes.push(new Dl().fromJSON(r))}return this}},ES={triangulate:function(n,e,t=2){let i=e&&e.length,r=i?e[0]*t:n.length,a=jm(n,0,r,t,!0),o=[];if(!a||a.next===a.prev)return o;let s,l,u,c,d,f,h;if(i&&(a=IS(n,e,a,t)),n.length>80*t){s=u=n[0],l=c=n[1];for(let m=t;m<r;m+=t)d=n[m],f=n[m+1],d<s&&(s=d),f<l&&(l=f),d>u&&(u=d),f>c&&(c=f);h=Math.max(u-s,c-l),h=h!==0?32767/h:0}return Ao(a,o,t,s,l,h,0),o}};function jm(n,e,t,i,r){let a,o;if(r===VS(n,e,t,i)>0)for(a=e;a<t;a+=i)o=Sm(a,n[a],n[a+1],o);else for(a=t-i;a>=e;a-=i)o=Sm(a,n[a],n[a+1],o);return o&&Vl(o,o.next)&&(To(o),o=o.next),o}function Nr(n,e){if(!n)return n;e||(e=n);let t=n,i;do if(i=!1,!t.steiner&&(Vl(t,t.next)||Nt(t.prev,t,t.next)===0)){if(To(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function Ao(n,e,t,i,r,a,o){if(!n)return;!o&&a&&FS(n,i,r,a);let s=n,l,u;for(;n.prev!==n.next;){if(l=n.prev,u=n.next,a?CS(n,i,r,a):TS(n)){e.push(l.i/t|0),e.push(n.i/t|0),e.push(u.i/t|0),To(n),n=u.next,s=u.next;continue}if(n=u,n===s){o?o===1?(n=RS(Nr(n),e,t),Ao(n,e,t,i,r,a,2)):o===2&&PS(n,e,t,i,r,a):Ao(Nr(n),e,t,i,r,a,1);break}}}function TS(n){let e=n.prev,t=n,i=n.next;if(Nt(e,t,i)>=0)return!1;let r=e.x,a=t.x,o=i.x,s=e.y,l=t.y,u=i.y,c=r<a?r<o?r:o:a<o?a:o,d=s<l?s<u?s:u:l<u?l:u,f=r>a?r>o?r:o:a>o?a:o,h=s>l?s>u?s:u:l>u?l:u,m=i.next;for(;m!==e;){if(m.x>=c&&m.x<=f&&m.y>=d&&m.y<=h&&da(r,s,a,l,o,u,m.x,m.y)&&Nt(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function CS(n,e,t,i){let r=n.prev,a=n,o=n.next;if(Nt(r,a,o)>=0)return!1;let s=r.x,l=a.x,u=o.x,c=r.y,d=a.y,f=o.y,h=s<l?s<u?s:u:l<u?l:u,m=c<d?c<f?c:f:d<f?d:f,x=s>l?s>u?s:u:l>u?l:u,g=c>d?c>f?c:f:d>f?d:f,p=Vd(h,m,e,t,i),y=Vd(x,g,e,t,i),_=n.prevZ,v=n.nextZ;for(;_&&_.z>=p&&v&&v.z<=y;){if(_.x>=h&&_.x<=x&&_.y>=m&&_.y<=g&&_!==r&&_!==o&&da(s,c,l,d,u,f,_.x,_.y)&&Nt(_.prev,_,_.next)>=0||(_=_.prevZ,v.x>=h&&v.x<=x&&v.y>=m&&v.y<=g&&v!==r&&v!==o&&da(s,c,l,d,u,f,v.x,v.y)&&Nt(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;_&&_.z>=p;){if(_.x>=h&&_.x<=x&&_.y>=m&&_.y<=g&&_!==r&&_!==o&&da(s,c,l,d,u,f,_.x,_.y)&&Nt(_.prev,_,_.next)>=0)return!1;_=_.prevZ}for(;v&&v.z<=y;){if(v.x>=h&&v.x<=x&&v.y>=m&&v.y<=g&&v!==r&&v!==o&&da(s,c,l,d,u,f,v.x,v.y)&&Nt(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function RS(n,e,t){let i=n;do{let r=i.prev,a=i.next.next;!Vl(r,a)&&Qm(r,i,i.next,a)&&Eo(r,a)&&Eo(a,r)&&(e.push(r.i/t|0),e.push(i.i/t|0),e.push(a.i/t|0),To(i),To(i.next),i=n=a),i=i.next}while(i!==n);return Nr(i)}function PS(n,e,t,i,r,a){let o=n;do{let s=o.next.next;for(;s!==o.prev;){if(o.i!==s.i&&kS(o,s)){let l=eg(o,s);o=Nr(o,o.next),l=Nr(l,l.next),Ao(o,e,t,i,r,a,0),Ao(l,e,t,i,r,a,0);return}s=s.next}o=o.next}while(o!==n)}function IS(n,e,t,i){let r=[],a,o,s,l,u;for(a=0,o=e.length;a<o;a++)s=e[a]*i,l=a<o-1?e[a+1]*i:n.length,u=jm(n,s,l,i,!1),u===u.next&&(u.steiner=!0),r.push(BS(u));for(r.sort(LS),a=0;a<r.length;a++)t=DS(r[a],t);return t}function LS(n,e){return n.x-e.x}function DS(n,e){let t=US(n,e);if(!t)return e;let i=eg(t,n);return Nr(i,i.next),Nr(t,t.next)}function US(n,e){let t=e,i=-1/0,r,a=n.x,o=n.y;do{if(o<=t.y&&o>=t.next.y&&t.next.y!==t.y){let f=t.x+(o-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(f<=a&&f>i&&(i=f,r=t.x<t.next.x?t:t.next,f===a))return r}t=t.next}while(t!==e);if(!r)return null;let s=r,l=r.x,u=r.y,c=1/0,d;t=r;do a>=t.x&&t.x>=l&&a!==t.x&&da(o<u?a:i,o,l,u,o<u?i:a,o,t.x,t.y)&&(d=Math.abs(o-t.y)/(a-t.x),Eo(t,n)&&(d<c||d===c&&(t.x>r.x||t.x===r.x&&NS(r,t)))&&(r=t,c=d)),t=t.next;while(t!==s);return r}function NS(n,e){return Nt(n.prev,n,e.prev)<0&&Nt(e.next,n,n.next)<0}function FS(n,e,t,i){let r=n;do r.z===0&&(r.z=Vd(r.x,r.y,e,t,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==n);r.prevZ.nextZ=null,r.prevZ=null,OS(r)}function OS(n){let e,t,i,r,a,o,s,l,u=1;do{for(t=n,n=null,a=null,o=0;t;){for(o++,i=t,s=0,e=0;e<u&&(s++,i=i.nextZ,!!i);e++);for(l=u;s>0||l>0&&i;)s!==0&&(l===0||!i||t.z<=i.z)?(r=t,t=t.nextZ,s--):(r=i,i=i.nextZ,l--),a?a.nextZ=r:n=r,r.prevZ=a,a=r;t=i}a.nextZ=null,u*=2}while(o>1);return n}function Vd(n,e,t,i,r){return n=(n-t)*r|0,e=(e-i)*r|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,n|e<<1}function BS(n){let e=n,t=n;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==n);return t}function da(n,e,t,i,r,a,o,s){return(r-o)*(e-s)>=(n-o)*(a-s)&&(n-o)*(i-s)>=(t-o)*(e-s)&&(t-o)*(a-s)>=(r-o)*(i-s)}function kS(n,e){return n.next.i!==e.i&&n.prev.i!==e.i&&!zS(n,e)&&(Eo(n,e)&&Eo(e,n)&&HS(n,e)&&(Nt(n.prev,n,e.prev)||Nt(n,e.prev,e))||Vl(n,e)&&Nt(n.prev,n,n.next)>0&&Nt(e.prev,e,e.next)>0)}function Nt(n,e,t){return(e.y-n.y)*(t.x-e.x)-(e.x-n.x)*(t.y-e.y)}function Vl(n,e){return n.x===e.x&&n.y===e.y}function Qm(n,e,t,i){let r=nl(Nt(n,e,t)),a=nl(Nt(n,e,i)),o=nl(Nt(t,i,n)),s=nl(Nt(t,i,e));return!!(r!==a&&o!==s||r===0&&tl(n,t,e)||a===0&&tl(n,i,e)||o===0&&tl(t,n,i)||s===0&&tl(t,e,i))}function tl(n,e,t){return e.x<=Math.max(n.x,t.x)&&e.x>=Math.min(n.x,t.x)&&e.y<=Math.max(n.y,t.y)&&e.y>=Math.min(n.y,t.y)}function nl(n){return n>0?1:n<0?-1:0}function zS(n,e){let t=n;do{if(t.i!==n.i&&t.next.i!==n.i&&t.i!==e.i&&t.next.i!==e.i&&Qm(t,t.next,n,e))return!0;t=t.next}while(t!==n);return!1}function Eo(n,e){return Nt(n.prev,n,n.next)<0?Nt(n,e,n.next)>=0&&Nt(n,n.prev,e)>=0:Nt(n,e,n.prev)<0||Nt(n,n.next,e)<0}function HS(n,e){let t=n,i=!1,r=(n.x+e.x)/2,a=(n.y+e.y)/2;do t.y>a!=t.next.y>a&&t.next.y!==t.y&&r<(t.next.x-t.x)*(a-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==n);return i}function eg(n,e){let t=new Gd(n.i,n.x,n.y),i=new Gd(e.i,e.x,e.y),r=n.next,a=e.prev;return n.next=e,e.prev=n,t.next=r,r.prev=t,i.next=t,t.prev=i,a.next=i,i.prev=a,i}function Sm(n,e,t,i){let r=new Gd(n,e,t);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function To(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function Gd(n,e,t){this.i=n,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function VS(n,e,t,i){let r=0;for(let a=e,o=t-i;a<t;a+=i)r+=(n[o]-n[a])*(n[a+1]+n[o+1]),o=a;return r}var go=class n{static area(e){let t=e.length,i=0;for(let r=t-1,a=0;a<t;r=a++)i+=e[r].x*e[a].y-e[a].x*e[r].y;return i*.5}static isClockWise(e){return n.area(e)<0}static triangulateShape(e,t){let i=[],r=[],a=[];bm(e),wm(i,e);let o=e.length;t.forEach(bm);for(let l=0;l<t.length;l++)r.push(o),o+=t[l].length,wm(i,t[l]);let s=ES.triangulate(i,r);for(let l=0;l<s.length;l+=3)a.push(s.slice(l,l+3));return a}};function bm(n){let e=n.length;e>2&&n[e-1].equals(n[0])&&n.pop()}function wm(n,e){for(let t=0;t<e.length;t++)n.push(e[t].x),n.push(e[t].y)}var Ul=class n extends Vt{constructor(e=new wo([new Le(0,.5),new Le(-.5,-.5),new Le(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let i=[],r=[],a=[],o=[],s=0,l=0;if(Array.isArray(e)===!1)u(e);else for(let c=0;c<e.length;c++)u(e[c]),this.addGroup(s,l,c),s+=l,l=0;this.setIndex(i),this.setAttribute("position",new Tt(r,3)),this.setAttribute("normal",new Tt(a,3)),this.setAttribute("uv",new Tt(o,2));function u(c){let d=r.length/3,f=c.extractPoints(t),h=f.shape,m=f.holes;go.isClockWise(h)===!1&&(h=h.reverse());for(let g=0,p=m.length;g<p;g++){let y=m[g];go.isClockWise(y)===!0&&(m[g]=y.reverse())}let x=go.triangulateShape(h,m);for(let g=0,p=m.length;g<p;g++){let y=m[g];h=h.concat(y)}for(let g=0,p=h.length;g<p;g++){let y=h[g];r.push(y.x,y.y,0),a.push(0,0,1),o.push(y.x,y.y)}for(let g=0,p=x.length;g<p;g++){let y=x[g],_=y[0]+d,v=y[1]+d,I=y[2]+d;i.push(_,v,I),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return GS(t,e)}static fromJSON(e,t){let i=[];for(let r=0,a=e.shapes.length;r<a;r++){let o=t[e.shapes[r]];i.push(o)}return new n(i,e.curveSegments)}};function GS(n,e){if(e.shapes=[],Array.isArray(n))for(let t=0,i=n.length;t<i;t++){let r=n[t];e.shapes.push(r.uuid)}else e.shapes.push(n.uuid);return e}var Wn=class n extends Vt{constructor(e=1,t=32,i=16,r=0,a=Math.PI*2,o=0,s=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:a,thetaStart:o,thetaLength:s},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));let l=Math.min(o+s,Math.PI),u=0,c=[],d=new z,f=new z,h=[],m=[],x=[],g=[];for(let p=0;p<=i;p++){let y=[],_=p/i,v=0;p===0&&o===0?v=.5/t:p===i&&l===Math.PI&&(v=-.5/t);for(let I=0;I<=t;I++){let E=I/t;d.x=-e*Math.cos(r+E*a)*Math.sin(o+_*s),d.y=e*Math.cos(o+_*s),d.z=e*Math.sin(r+E*a)*Math.sin(o+_*s),m.push(d.x,d.y,d.z),f.copy(d).normalize(),x.push(f.x,f.y,f.z),g.push(E+v,1-_),y.push(u++)}c.push(y)}for(let p=0;p<i;p++)for(let y=0;y<t;y++){let _=c[p][y+1],v=c[p][y],I=c[p+1][y],E=c[p+1][y+1];(p!==0||o>0)&&h.push(_,v,E),(p!==i-1||l<Math.PI)&&h.push(v,I,E)}this.setIndex(h),this.setAttribute("position",new Tt(m,3)),this.setAttribute("normal",new Tt(x,3)),this.setAttribute("uv",new Tt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Co=class extends Mi{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Je(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Je(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Hm,this.normalScale=new Le(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _i,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};function il(n,e,t){return!n||!t&&n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function WS(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}var ba=class{constructor(e,t,i,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,r=t[i],a=t[i-1];n:{e:{let o;t:{i:if(!(e<r)){for(let s=i+2;;){if(r===void 0){if(e<a)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===s)break;if(a=r,r=t[++i],e<r)break e}o=t.length;break t}if(!(e>=a)){let s=t[1];e<s&&(i=2,a=s);for(let l=i-2;;){if(a===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(r=a,a=t[--i-1],e>=a)break e}o=i,i=0;break t}break n}for(;i<o;){let s=i+o>>>1;e<t[s]?o=s:i=s+1}if(r=t[i],a=t[i-1],a===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,a,r)}return this.interpolate_(i,a,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,r=this.valueSize,a=e*r;for(let o=0;o!==r;++o)t[o]=i[a+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Wd=class extends ba{constructor(e,t,i,r){super(e,t,i,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:vp,endingEnd:vp}}intervalChanged_(e,t,i){let r=this.parameterPositions,a=e-2,o=e+1,s=r[a],l=r[o];if(s===void 0)switch(this.getSettings_().endingStart){case yp:a=e,s=2*t-i;break;case _p:a=r.length-2,s=t+r[a]-r[a+1];break;default:a=e,s=i}if(l===void 0)switch(this.getSettings_().endingEnd){case yp:o=e,l=2*i-t;break;case _p:o=1,l=i+r[1]-r[0];break;default:o=e-1,l=t}let u=(i-t)*.5,c=this.valueSize;this._weightPrev=u/(t-s),this._weightNext=u/(l-i),this._offsetPrev=a*c,this._offsetNext=o*c}interpolate_(e,t,i,r){let a=this.resultBuffer,o=this.sampleValues,s=this.valueSize,l=e*s,u=l-s,c=this._offsetPrev,d=this._offsetNext,f=this._weightPrev,h=this._weightNext,m=(i-t)/(r-t),x=m*m,g=x*m,p=-f*g+2*f*x-f*m,y=(1+f)*g+(-1.5-2*f)*x+(-.5+f)*m+1,_=(-1-h)*g+(1.5+h)*x+.5*m,v=h*g-h*x;for(let I=0;I!==s;++I)a[I]=p*o[c+I]+y*o[u+I]+_*o[l+I]+v*o[d+I];return a}},qd=class extends ba{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let a=this.resultBuffer,o=this.sampleValues,s=this.valueSize,l=e*s,u=l-s,c=(i-t)/(r-t),d=1-c;for(let f=0;f!==s;++f)a[f]=o[u+f]*d+o[l+f]*c;return a}},Xd=class extends ba{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e){return this.copySampleValue_(e-1)}},li=class{constructor(e,t,i,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=il(t,this.TimeBufferType),this.values=il(i,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:il(e.times,Array),values:il(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(i.interpolation=r)}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new Xd(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new qd(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Wd(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case ul:t=this.InterpolantFactoryMethodDiscrete;break;case gd:t=this.InterpolantFactoryMethodLinear;break;case jc:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ul;case this.InterpolantFactoryMethodLinear:return gd;case this.InterpolantFactoryMethodSmooth:return jc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]*=e}return this}trim(e,t){let i=this.times,r=i.length,a=0,o=r-1;for(;a!==r&&i[a]<e;)++a;for(;o!==-1&&i[o]>t;)--o;if(++o,a!==0||o!==r){a>=o&&(o=Math.max(o,1),a=o-1);let s=this.getValueSize();this.times=i.slice(a,o),this.values=this.values.slice(a*s,o*s)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,r=this.values,a=i.length;a===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let s=0;s!==a;s++){let l=i[s];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,s,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,s,l,o),e=!1;break}o=l}if(r!==void 0&&WS(r))for(let s=0,l=r.length;s!==l;++s){let u=r[s];if(isNaN(u)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,s,u),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),r=this.getInterpolation()===jc,a=e.length-1,o=1;for(let s=1;s<a;++s){let l=!1,u=e[s],c=e[s+1];if(u!==c&&(s!==1||u!==e[0]))if(r)l=!0;else{let d=s*i,f=d-i,h=d+i;for(let m=0;m!==i;++m){let x=t[d+m];if(x!==t[f+m]||x!==t[h+m]){l=!0;break}}}if(l){if(s!==o){e[o]=e[s];let d=s*i,f=o*i;for(let h=0;h!==i;++h)t[f+h]=t[d+h]}++o}}if(a>0){e[o]=e[a];for(let s=a*i,l=o*i,u=0;u!==i;++u)t[l+u]=t[s+u];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,r=new i(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};li.prototype.TimeBufferType=Float32Array;li.prototype.ValueBufferType=Float32Array;li.prototype.DefaultInterpolation=gd;var Fr=class extends li{constructor(e,t,i){super(e,t,i)}};Fr.prototype.ValueTypeName="bool";Fr.prototype.ValueBufferType=Array;Fr.prototype.DefaultInterpolation=ul;Fr.prototype.InterpolantFactoryMethodLinear=void 0;Fr.prototype.InterpolantFactoryMethodSmooth=void 0;var Yd=class extends li{};Yd.prototype.ValueTypeName="color";var Zd=class extends li{};Zd.prototype.ValueTypeName="number";var Kd=class extends ba{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let a=this.resultBuffer,o=this.sampleValues,s=this.valueSize,l=(i-t)/(r-t),u=e*s;for(let c=u+s;u!==c;u+=4)oi.slerpFlat(a,0,o,u-s,o,u,l);return a}},Nl=class extends li{InterpolantFactoryMethodLinear(e){return new Kd(this.times,this.values,this.getValueSize(),e)}};Nl.prototype.ValueTypeName="quaternion";Nl.prototype.InterpolantFactoryMethodSmooth=void 0;var Or=class extends li{constructor(e,t,i){super(e,t,i)}};Or.prototype.ValueTypeName="string";Or.prototype.ValueBufferType=Array;Or.prototype.DefaultInterpolation=ul;Or.prototype.InterpolantFactoryMethodLinear=void 0;Or.prototype.InterpolantFactoryMethodSmooth=void 0;var $d=class extends li{};$d.prototype.ValueTypeName="vector";var Am={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(this.files[n]=e)},get:function(n){if(this.enabled!==!1)return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}},Jd=class{constructor(e,t,i){let r=this,a=!1,o=0,s=0,l,u=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this.itemStart=function(c){s++,a===!1&&r.onStart!==void 0&&r.onStart(c,o,s),a=!0},this.itemEnd=function(c){o++,r.onProgress!==void 0&&r.onProgress(c,o,s),o===s&&(a=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(c){r.onError!==void 0&&r.onError(c)},this.resolveURL=function(c){return l?l(c):c},this.setURLModifier=function(c){return l=c,this},this.addHandler=function(c,d){return u.push(c,d),this},this.removeHandler=function(c){let d=u.indexOf(c);return d!==-1&&u.splice(d,2),this},this.getHandler=function(c){for(let d=0,f=u.length;d<f;d+=2){let h=u[d],m=u[d+1];if(h.global&&(h.lastIndex=0),h.test(c))return m}return null}}},qS=new Jd,Ro=class{constructor(e){this.manager=e!==void 0?e:qS,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let i=this;return new Promise(function(r,a){i.load(e,r,t,a)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};Ro.DEFAULT_MATERIAL_NAME="__DEFAULT";var jd=class extends Ro{constructor(e){super(e)}load(e,t,i,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let a=this,o=Am.get(e);if(o!==void 0)return a.manager.itemStart(e),setTimeout(function(){t&&t(o),a.manager.itemEnd(e)},0),o;let s=yo("img");function l(){c(),Am.add(e,this),t&&t(this),a.manager.itemEnd(e)}function u(d){c(),r&&r(d),a.manager.itemError(e),a.manager.itemEnd(e)}function c(){s.removeEventListener("load",l,!1),s.removeEventListener("error",u,!1)}return s.addEventListener("load",l,!1),s.addEventListener("error",u,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(s.crossOrigin=this.crossOrigin),a.manager.itemStart(e),s.src=e,s}};var sr=class extends Ro{constructor(e){super(e)}load(e,t,i,r){let a=new En,o=new jd(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(s){a.image=s,a.needsUpdate=!0,t!==void 0&&t(a)},i,r),a}},Po=class extends en{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Je(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},Fl=class extends Po{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(en.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Je(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},Pu=new wt,Em=new z,Tm=new z,Qd=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Le(512,512),this.map=null,this.mapPass=null,this.matrix=new wt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Dr,this._frameExtents=new Le(1,1),this._viewportCount=1,this._viewports=[new Ht(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,i=this.matrix;Em.setFromMatrixPosition(e.matrixWorld),t.position.copy(Em),Tm.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Tm),t.updateMatrixWorld(),Pu.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Pu),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Pu)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}};var ef=class extends Qd{constructor(){super(new _l(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ol=class extends Po{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(en.DEFAULT_UP),this.updateMatrix(),this.target=new en,this.shadow=new ef}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},Bl=class extends Po{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}};var pf="\\[\\]\\.:\\/",XS=new RegExp("["+pf+"]","g"),mf="[^"+pf+"]",YS="[^"+pf.replace("\\.","")+"]",ZS=/((?:WC+[\/:])*)/.source.replace("WC",mf),KS=/(WCOD+)?/.source.replace("WCOD",YS),$S=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",mf),JS=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",mf),jS=new RegExp("^"+ZS+KS+$S+JS+"$"),QS=["material","materials","bones","map"],tf=class{constructor(e,t,i){let r=i||Ut.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,r=this._bindings[i];r!==void 0&&r.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let r=this._targetGroup.nCachedObjects_,a=i.length;r!==a;++r)i[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},Ut=class n{constructor(e,t,i){this.path=t,this.parsedPath=i||n.parseTrackName(t),this.node=n.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new n.Composite(e,t,i):new n(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(XS,"")}static parseTrackName(e){let t=jS.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=i.nodeName&&i.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let a=i.nodeName.substring(r+1);QS.indexOf(a)!==-1&&(i.nodeName=i.nodeName.substring(0,r),i.objectName=a)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){let i=function(a){for(let o=0;o<a.length;o++){let s=a[o];if(s.name===t||s.uuid===t)return s;let l=i(s.children);if(l)return l}return null},r=i(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let i=this.resolvedProperty;for(let r=0,a=i.length;r!==a;++r)e[t++]=i[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let i=this.resolvedProperty;for(let r=0,a=i.length;r!==a;++r)i[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let i=this.resolvedProperty;for(let r=0,a=i.length;r!==a;++r)i[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let i=this.resolvedProperty;for(let r=0,a=i.length;r!==a;++r)i[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,i=t.objectName,r=t.propertyName,a=t.propertyIndex;if(e||(e=n.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let u=t.objectIndex;switch(i){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let c=0;c<e.length;c++)if(e[c].name===u){u=c;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(u!==void 0){if(e[u]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[u]}}let o=e[r];if(o===void 0){let u=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+u+"."+r+" but it wasn't found.",e);return}let s=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?s=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(a!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[a]!==void 0&&(a=e.morphTargetDictionary[a])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=r;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ut.Composite=tf;Ut.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ut.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ut.prototype.GetterByBindingType=[Ut.prototype._getValue_direct,Ut.prototype._getValue_array,Ut.prototype._getValue_arrayElement,Ut.prototype._getValue_toArray];Ut.prototype.SetterByBindingTypeAndVersioning=[[Ut.prototype._setValue_direct,Ut.prototype._setValue_direct_setNeedsUpdate,Ut.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ut.prototype._setValue_array,Ut.prototype._setValue_array_setNeedsUpdate,Ut.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ut.prototype._setValue_arrayElement,Ut.prototype._setValue_arrayElement_setNeedsUpdate,Ut.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ut.prototype._setValue_fromArray,Ut.prototype._setValue_fromArray_setNeedsUpdate,Ut.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var UA=new Float32Array(1);typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"170"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="170");function tg(n,e,t,i){let r=new _n;n.add(r);let a=new Ft(new Wn(i-.028,96,48),new Vn({color:66051}));r.add(a);let o=[],s=[],l=new Je;for(let g=-86;g<=86;g+=1.25){let p=1.25/Math.max(.12,Math.cos(g*Math.PI/180));for(let y=-180;y<180;y+=p){let _=t(y,g),v=Math.sin(g*91.7+y*23.9)*.5+.5;l.set(_?"#89b841":"#426eaa"),l.multiplyScalar(.82+v*.3),!_&&Math.floor((y+180)/p)%19===0&&l.set("#702b3a");let I=e(g,y,i+.007);o.push(I.x,I.y,I.z),s.push(l.r,l.g,l.b)}}let u=new Si(new Vt().setAttribute("position",new Tt(o,3)).setAttribute("color",new Tt(s,3)),new si({vertexColors:!0,size:.064,transparent:!0,opacity:1,depthWrite:!1,toneMapped:!1}));r.add(u);let c=null;function d(g,p,y,_,v){c&&(r.remove(c),c.geometry.dispose(),c.material.dispose());let I=[],E=[],P=new Je;for(let L=0;L<_;L+=6)for(let b=0;b<y;b+=6){let S=L*y+b;if(g[S*4+3]/255<.28)continue;let B=b/y*360-180,F=90-L/_*180;if(t(B,F))continue;let G=p[S],U=e(F,B,i+.018+G*.11*v);I.push(U.x,U.y,U.z),P.set("#dce6d5").multiplyScalar(.6+G*.7),E.push(P.r,P.g,P.b)}c=new Si(new Vt().setAttribute("position",new Tt(I,3)).setAttribute("color",new Tt(E,3)),new si({vertexColors:!0,size:.064,transparent:!0,opacity:1,depthWrite:!1,toneMapped:!1})),c.name="SKM ocean dot logo",r.add(c)}let f=[],h=[];for(let g=0;g<1500;g++){let p=g*2.39996323,y=1-2*(g+.5)/1500,_=Math.sqrt(1-y*y),v=i*(1.055+.1*(Math.sin(g*18.71)*.5+.5));f.push(Math.cos(p)*_*v,y*v,Math.sin(p)*_*v),l.set(["#8faaa0","#d49b62","#506f9d","#b8c6cf"][g%4]),h.push(l.r,l.g,l.b)}let m=new Si(new Vt().setAttribute("position",new Tt(f,3)).setAttribute("color",new Tt(h,3)),new si({vertexColors:!0,size:.037,transparent:!0,opacity:.65,depthWrite:!1,toneMapped:!1}));r.add(m);let x=[];for(let[g,p,y]of[[.52,.65,"#b1c7bc"],[-.91,.3,"#536c91"],[1.12,-.8,"#762c37"]]){let _=[];for(let I=0;I<=200;I++){let E=I/200*Math.PI*2;_.push(new z(Math.cos(E)*i*1.055,Math.sin(E)*i*1.055,0))}let v=new Sa(new Vt().setFromPoints(_),new Ur({color:y,transparent:!0,opacity:.48,depthWrite:!1}));v.rotation.set(g,p,.25),x.push(v),r.add(v)}return{setLogo:d,logoCount:()=>c?.geometry.attributes.position.count||0,update(g,p){r.visible=g<.995;let y=1-g;u.material.opacity=y,c&&(c.material.opacity=y),m.material.opacity=y*.65,m.rotation.y=p*.003,x.forEach(_=>_.material.opacity=y*.48),a.visible=g<.5}}}var ng="app/earth-assets/",Ea=Math.PI/180;function eb(n){let e=n.getTime()/864e5-10957.5,t=(134.963+13.064993*e)*Ea,i=(93.272+13.22935*e)*Ea,r=(218.316+13.176396*e+6.289*Math.sin(t))*Ea,a=5.128*Ea*Math.sin(i),o=23.4393*Ea,s=Math.cos(r)*Math.cos(a),l=Math.sin(r)*Math.cos(a)*Math.cos(o)-Math.sin(a)*Math.sin(o),u=Math.sin(r)*Math.cos(a)*Math.sin(o)+Math.sin(a)*Math.cos(o),c=(280.46061837+360.98564736629*e)*Ea;return new z(s*Math.cos(c)+l*Math.sin(c),u,s*Math.sin(c)-l*Math.cos(c)).normalize()}function ig(n,e,t,i,r=!0){let a=new sr,o=new _n;n.add(o);let s=document.createElement("canvas");s.width=s.height=128;let l=s.getContext("2d"),u=l.createRadialGradient(64,64,0,64,64,64);for(let[k,J]of[[0,"#ffffff"],[.22,"#fffef4"],[.24,"#fff2ce"],[.27,"#ffdb9355"],[.52,"#ffc67018"],[1,"#ffbd7000"]])u.addColorStop(k,J);l.fillStyle=u,l.fillRect(0,0,128,128);let c=new or(s);c.colorSpace=zt;let d=new El(new So({map:c,depthWrite:!1,toneMapped:!1}));d.scale.setScalar(2.8),o.add(d);let f=new Tn({uniforms:{surface:{value:null},sunDirection:{value:new z}},vertexShader:`varying vec2 lunarUV;varying vec3 lunarNormal;
      void main(){lunarUV=uv;lunarNormal=mat3(modelMatrix)*normal;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,fragmentShader:`uniform sampler2D surface;uniform vec3 sunDirection;varying vec2 lunarUV;varying vec3 lunarNormal;
      void main(){float illumination=max(0.,dot(normalize(lunarNormal),sunDirection));
      vec3 rock=texture2D(surface,lunarUV).rgb;
      gl_FragColor=vec4(rock*(0.16+2.5*illumination),1.0);
      #include <colorspace_fragment>
      }`}),h=new Ft(new Wn(.55,32,20),f);h.visible=!1,o.add(h),a.load(ng+"moon.jpg",k=>{k.colorSpace=zt,f.uniforms.surface.value=k,h.visible=!0,i()});let m=[],x=8,g=4,p=1024,y=2,_=p+y*2;for(let k=0;r&&k<g;k++)for(let J=0;J<x;J++){let $=new Wn(70,12,10,J*2*Math.PI/x,2*Math.PI/x,k*Math.PI/g,Math.PI/g),re=$.attributes.uv;for(let q=0;q<=10;q++)for(let W=0;W<=12;W++)re.setXY(q*13+W,(y+p*W/12)/_,(y+p*(1-q/10))/_);$.computeBoundingSphere();let le=new Ft($,new Vn({side:Qt,toneMapped:!1,depthTest:!1,depthWrite:!1}));le.renderOrder=-99,le.visible=!1,e.add(le),m.push({mesh:le,row:k,col:J,direction:$.boundingSphere.center.clone().normalize(),loading:!1,failed:!1})}let v=new z,I=new oi,E=new oi,P=new Dr,L=new wt,b=new z,S=new z,T=new z,B=[],F=0,G="",U=!0;function N(){for(let k of B){if(F>=2)break;k.mesh.material.map||k.loading||k.failed||(k.loading=!0,F++,a.load(ng+"sky/"+k.row+"-"+k.col+".jpg",J=>{k.loading=!1,F--,B.includes(k)?(J.colorSpace=zt,k.mesh.material.map=J,k.mesh.material.needsUpdate=!0,k.mesh.visible=!0):J.dispose(),t.dataset.skyDetail=String(B.filter($=>$.mesh.visible).length),N(),i()},void 0,()=>{k.failed=!0,k.loading=!1,F--,N()}))}}function te(k){if(e.position.copy(k.position),o.position.copy(k.position),!r)return;let J=k.projectionMatrix.elements,$=J[0]+"|"+J[5]+"|"+J[8]+"|"+J[9];if(!(!U&&I.angleTo(k.quaternion)<.012&&$===G)){U=!1,I.copy(k.quaternion),G=$,e.updateMatrixWorld(!0),P.setFromProjectionMatrix(L.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse)),E.copy(e.quaternion).invert(),k.getWorldDirection(v).applyQuaternion(E),B=m.filter(re=>P.intersectsObject(re.mesh)).sort((re,le)=>le.direction.dot(v)-re.direction.dot(v)).slice(0,10);for(let re of m)re.mesh.visible&&!B.includes(re)&&(re.mesh.visible=!1,re.mesh.material.map.dispose(),re.mesh.material.map=null,re.mesh.material.needsUpdate=!0);N()}}function D(k,J){let $=eb(k);h.position.copy($).multiplyScalar(54),d.position.copy(J).multiplyScalar(60),b.copy($).negate(),S.set(0,1,0).addScaledVector(b,-b.y).normalize(),T.crossVectors(b,S),h.quaternion.setFromRotationMatrix(L.makeBasis(b,S,T)),f.uniforms.sunDirection.value.copy(J)}return{view:te,date:D,direction(k){return(k==="sun"?d:h).position.clone().normalize()},screenPoint(k,J){return(k==="sun"?d:h).getWorldPosition(new z).project(J)}}}var rg=[{id:"new-york-times-square",name:"New York \xB7 Times Square",publisher:"EarthCam",lat:40.758,lon:-73.9855,page:"https://www.earthcam.com/usa/newyork/timessquare/"}];var nb=[...As,...rg];function ag(n,e,t,i){let r;function a(f,h){r?.close();let m=document.createElement("dialog"),x=document.createElement("header"),g=document.createElement("strong"),p=document.createElement("button");m.className="nature-window",m.setAttribute("aria-label",f),g.textContent=f,p.type="button",p.textContent=t("close"),p.onclick=()=>m.close(),x.append(g,p),m.append(x),h(m),document.body.append(m),m.addEventListener("close",()=>{m.remove(),r===m&&(r=null)},{once:!0}),r=m,m.showModal()}function o(f){if(f.page){a(f.name+" \xB7 "+f.publisher,h=>{let m=document.createElement("a");m.href=f.page,m.textContent=f.publisher+" \u2197",m.target="_blank",m.rel="noopener noreferrer",h.append(m)});return}if(location.protocol==="skm:"){location.href="skm-camera://"+f.id+"?close="+encodeURIComponent(t("close"));return}a(f.name+" \xB7 "+f.publisher,h=>{let m=document.createElement("iframe"),x=document.createElement("a");m.title=f.name,m.allow="autoplay; encrypted-media; fullscreen; picture-in-picture",m.referrerPolicy="strict-origin-when-cross-origin",m.src="https://www.youtube-nocookie.com/embed/"+f.video+"?playsinline=1&autoplay=1&mute=1",x.href="https://www.youtube.com/watch?v="+f.video,x.textContent="YouTube \u2197",x.target="_blank",x.rel="noopener noreferrer",h.append(m,x)})}function s(f){if(f.length===1){o(f[0]);return}a("YouTube \xB7 "+f.length,h=>{h.classList.add("nature-picker");for(let m of f){let x=document.createElement("button");x.type="button",x.textContent=m.name,x.onclick=()=>{h.close(),o(m)},h.append(x)}})}let l=nb.map(f=>({camera:f,point:e(f.lat,f.lon)})),u=[];function c(){let f=document.createElement("button");f.type="button",f.className="earth-camera-pin",n.append(f);let h={button:f,items:[],key:""};return f.onclick=()=>{i()&&s(h.items)},h}let d=function(f,h,m,x){let g=[];for(let{camera:y,point:_}of l){let v=f(_);if(!v)continue;let I=g.find(E=>Math.hypot(E.x-v.x,E.y-v.y)<46);I||(I={...v,items:[]},g.push(I)),I.items.push(y)}let p=h.map(({x:y,y:_})=>({x:y,y:_}));g.forEach((y,_)=>{let v=u[_]||(u[_]=c()),I=v.button,E=y.x,P=y.y,L=(T,B)=>T>=22&&T<=m-22&&B>=24&&B<=x-42&&p.every(F=>Math.hypot(F.x-T,F.y-B)>=43);if(!L(E,P)){let T=!1;for(let B of[40,58,80]){for(let F=0;F<8;F++){let G=Math.cos(F*Math.PI/4)*B,U=Math.sin(F*Math.PI/4)*B;if(L(y.x+G,y.y+U)){E=y.x+G,P=y.y+U,T=!0;break}}if(T)break}}let b=Math.hypot(E-y.x,P-y.y);p.push({x:E,y:P}),I.hidden=!1,I.style.left=E+"px",I.style.top=P+"px",I.style.setProperty("--leader",b>2?b+"px":"0px"),I.style.setProperty("--direction",Math.atan2(y.y-P,y.x-E)+"rad");let S=y.items.map(T=>T.id).join("|");v.key!==S&&(v.key=S,v.items=y.items,I.textContent=y.items.length>1?"\u25B7 "+y.items.length:"\u25B7",I.setAttribute("aria-label",y.items.length===1?y.items[0].name+" \xB7 "+(y.items[0].page?y.items[0].publisher:"YouTube"):"YouTube \xB7 "+y.items.length+" \xB7 "+y.items[0].name))});for(let y=g.length;y<u.length;y++)u[y].button.hidden=!0};return d.open=o,d}var og={"Europe/Andorra":[42.5,1.517],"Asia/Dubai":[25.3,55.3],"Asia/Kabul":[34.517,69.2],"America/Antigua":[17.05,-61.8],"America/Anguilla":[18.2,-63.067],"Europe/Tirane":[41.333,19.833],"Asia/Yerevan":[40.183,44.5],"Africa/Luanda":[-8.8,13.233],"Antarctica/McMurdo":[-77.833,166.6],"Antarctica/Casey":[-66.283,110.517],"Antarctica/Davis":[-68.583,77.967],"Antarctica/DumontDUrville":[-66.667,140.017],"Antarctica/Mawson":[-67.6,62.883],"Antarctica/Palmer":[-64.8,-64.1],"Antarctica/Rothera":[-67.567,-68.133],"Antarctica/Syowa":[-69.006,39.59],"Antarctica/Troll":[-72.011,2.535],"Antarctica/Vostok":[-78.4,106.9],"America/Argentina/Buenos_Aires":[-34.6,-58.45],"America/Argentina/Cordoba":[-31.4,-64.183],"America/Argentina/Salta":[-24.783,-65.417],"America/Argentina/Jujuy":[-24.183,-65.3],"America/Argentina/Tucuman":[-26.817,-65.217],"America/Argentina/Catamarca":[-28.467,-65.783],"America/Argentina/La_Rioja":[-29.433,-66.85],"America/Argentina/San_Juan":[-31.533,-68.517],"America/Argentina/Mendoza":[-32.883,-68.817],"America/Argentina/San_Luis":[-33.317,-66.35],"America/Argentina/Rio_Gallegos":[-51.633,-69.217],"America/Argentina/Ushuaia":[-54.8,-68.3],"Pacific/Pago_Pago":[-14.267,-170.7],"Europe/Vienna":[48.217,16.333],"Australia/Lord_Howe":[-31.55,159.083],"Antarctica/Macquarie":[-54.5,158.95],"Australia/Hobart":[-42.883,147.317],"Australia/Melbourne":[-37.817,144.967],"Australia/Sydney":[-33.867,151.217],"Australia/Broken_Hill":[-31.95,141.45],"Australia/Brisbane":[-27.467,153.033],"Australia/Lindeman":[-20.267,149],"Australia/Adelaide":[-34.917,138.583],"Australia/Darwin":[-12.467,130.833],"Australia/Perth":[-31.95,115.85],"Australia/Eucla":[-31.717,128.867],"America/Aruba":[12.5,-69.967],"Europe/Mariehamn":[60.1,19.95],"Asia/Baku":[40.383,49.85],"Europe/Sarajevo":[43.867,18.417],"America/Barbados":[13.1,-59.617],"Asia/Dhaka":[23.717,90.417],"Europe/Brussels":[50.833,4.333],"Africa/Ouagadougou":[12.367,-1.517],"Europe/Sofia":[42.683,23.317],"Asia/Bahrain":[26.383,50.583],"Africa/Bujumbura":[-3.383,29.367],"Africa/Porto-Novo":[6.483,2.617],"America/St_Barthelemy":[17.883,-62.85],"Atlantic/Bermuda":[32.283,-64.767],"Asia/Brunei":[4.933,114.917],"America/La_Paz":[-16.5,-68.15],"America/Kralendijk":[12.151,-68.277],"America/Noronha":[-3.85,-32.417],"America/Belem":[-1.45,-48.483],"America/Fortaleza":[-3.717,-38.5],"America/Recife":[-8.05,-34.9],"America/Araguaina":[-7.2,-48.2],"America/Maceio":[-9.667,-35.717],"America/Bahia":[-12.983,-38.517],"America/Sao_Paulo":[-23.533,-46.617],"America/Campo_Grande":[-20.45,-54.617],"America/Cuiaba":[-15.583,-56.083],"America/Santarem":[-2.433,-54.867],"America/Porto_Velho":[-8.767,-63.9],"America/Boa_Vista":[2.817,-60.667],"America/Manaus":[-3.133,-60.017],"America/Eirunepe":[-6.667,-69.867],"America/Rio_Branco":[-9.967,-67.8],"America/Nassau":[25.083,-77.35],"Asia/Thimphu":[27.467,89.65],"Africa/Gaborone":[-24.65,25.917],"Europe/Minsk":[53.9,27.567],"America/Belize":[17.5,-88.2],"America/St_Johns":[47.567,-52.717],"America/Halifax":[44.65,-63.6],"America/Glace_Bay":[46.2,-59.95],"America/Moncton":[46.1,-64.783],"America/Goose_Bay":[53.333,-60.417],"America/Blanc-Sablon":[51.417,-57.117],"America/Toronto":[43.65,-79.383],"America/Iqaluit":[63.733,-68.467],"America/Atikokan":[48.759,-91.622],"America/Winnipeg":[49.883,-97.15],"America/Resolute":[74.696,-94.829],"America/Rankin_Inlet":[62.817,-92.083],"America/Regina":[50.4,-104.65],"America/Swift_Current":[50.283,-107.833],"America/Edmonton":[53.55,-113.467],"America/Cambridge_Bay":[69.114,-105.053],"America/Inuvik":[68.35,-133.717],"America/Vancouver":[49.267,-123.117],"America/Creston":[49.1,-116.517],"America/Dawson_Creek":[55.767,-120.233],"America/Fort_Nelson":[58.8,-122.7],"America/Whitehorse":[60.717,-135.05],"America/Dawson":[64.067,-139.417],"Indian/Cocos":[-12.167,96.917],"Africa/Kinshasa":[-4.3,15.3],"Africa/Lubumbashi":[-11.667,27.467],"Africa/Bangui":[4.367,18.583],"Africa/Brazzaville":[-4.267,15.283],"Europe/Zurich":[47.383,8.533],"Africa/Abidjan":[5.317,-4.033],"Pacific/Rarotonga":[-21.233,-159.767],"America/Santiago":[-33.45,-70.667],"America/Coyhaique":[-45.567,-72.067],"America/Punta_Arenas":[-53.15,-70.917],"Pacific/Easter":[-27.15,-109.433],"Africa/Douala":[4.05,9.7],"Asia/Shanghai":[31.233,121.467],"Asia/Urumqi":[43.8,87.583],"America/Bogota":[4.6,-74.083],"America/Costa_Rica":[9.933,-84.083],"America/Havana":[23.133,-82.367],"Atlantic/Cape_Verde":[14.917,-23.517],"America/Curacao":[12.183,-69],"Indian/Christmas":[-10.417,105.717],"Asia/Nicosia":[35.167,33.367],"Asia/Famagusta":[35.117,33.95],"Europe/Prague":[50.083,14.433],"Europe/Berlin":[52.5,13.367],"Europe/Busingen":[47.7,8.683],"Africa/Djibouti":[11.6,43.15],"Europe/Copenhagen":[55.667,12.583],"America/Dominica":[15.3,-61.4],"America/Santo_Domingo":[18.467,-69.9],"Africa/Algiers":[36.783,3.05],"America/Guayaquil":[-2.167,-79.833],"Pacific/Galapagos":[-.9,-89.6],"Europe/Tallinn":[59.417,24.75],"Africa/Cairo":[30.05,31.25],"Africa/El_Aaiun":[27.15,-13.2],"Africa/Asmara":[15.333,38.883],"Europe/Madrid":[40.4,-3.683],"Africa/Ceuta":[35.883,-5.317],"Atlantic/Canary":[28.1,-15.4],"Africa/Addis_Ababa":[9.033,38.7],"Europe/Helsinki":[60.167,24.967],"Pacific/Fiji":[-18.133,178.417],"Atlantic/Stanley":[-51.7,-57.85],"Pacific/Chuuk":[7.417,151.783],"Pacific/Pohnpei":[6.967,158.217],"Pacific/Kosrae":[5.317,162.983],"Atlantic/Faroe":[62.017,-6.767],"Europe/Paris":[48.867,2.333],"Africa/Libreville":[.383,9.45],"Europe/London":[51.508,-.125],"America/Grenada":[12.05,-61.75],"Asia/Tbilisi":[41.717,44.817],"America/Cayenne":[4.933,-52.333],"Europe/Guernsey":[49.455,-2.536],"Africa/Accra":[5.55,-.217],"Europe/Gibraltar":[36.133,-5.35],"America/Nuuk":[64.183,-51.733],"America/Danmarkshavn":[76.767,-18.667],"America/Scoresbysund":[70.483,-21.967],"America/Thule":[76.567,-68.783],"Africa/Banjul":[13.467,-16.65],"Africa/Conakry":[9.517,-13.717],"America/Guadeloupe":[16.233,-61.533],"Africa/Malabo":[3.75,8.783],"Europe/Athens":[37.967,23.717],"Atlantic/South_Georgia":[-54.267,-36.533],"America/Guatemala":[14.633,-90.517],"Pacific/Guam":[13.467,144.75],"Africa/Bissau":[11.85,-15.583],"America/Guyana":[6.8,-58.167],"Asia/Hong_Kong":[22.283,114.15],"America/Tegucigalpa":[14.1,-87.217],"Europe/Zagreb":[45.8,15.967],"America/Port-au-Prince":[18.533,-72.333],"Europe/Budapest":[47.5,19.083],"Asia/Jakarta":[-6.167,106.8],"Asia/Pontianak":[-.033,109.333],"Asia/Makassar":[-5.117,119.4],"Asia/Jayapura":[-2.533,140.7],"Europe/Dublin":[53.333,-6.25],"Asia/Jerusalem":[31.781,35.224],"Europe/Isle_of_Man":[54.15,-4.467],"Asia/Kolkata":[22.533,88.367],"Indian/Chagos":[-7.333,72.417],"Asia/Baghdad":[33.35,44.417],"Asia/Tehran":[35.667,51.433],"Atlantic/Reykjavik":[64.15,-21.85],"Europe/Rome":[41.9,12.483],"Europe/Jersey":[49.184,-2.107],"America/Jamaica":[17.968,-76.793],"Asia/Amman":[31.95,35.933],"Asia/Tokyo":[35.654,139.745],"Africa/Nairobi":[-1.283,36.817],"Asia/Bishkek":[42.9,74.6],"Asia/Phnom_Penh":[11.55,104.917],"Pacific/Tarawa":[1.417,173],"Pacific/Kanton":[-2.783,-171.717],"Pacific/Kiritimati":[1.867,-157.333],"Indian/Comoro":[-11.683,43.267],"America/St_Kitts":[17.3,-62.717],"Asia/Pyongyang":[39.017,125.75],"Asia/Seoul":[37.55,126.967],"Asia/Kuwait":[29.333,47.983],"America/Cayman":[19.3,-81.383],"Asia/Almaty":[43.25,76.95],"Asia/Qyzylorda":[44.8,65.467],"Asia/Qostanay":[53.2,63.617],"Asia/Aqtobe":[50.283,57.167],"Asia/Aqtau":[44.517,50.267],"Asia/Atyrau":[47.117,51.933],"Asia/Oral":[51.217,51.35],"Asia/Vientiane":[17.967,102.6],"Asia/Beirut":[33.883,35.5],"America/St_Lucia":[14.017,-61],"Europe/Vaduz":[47.15,9.517],"Asia/Colombo":[6.933,79.85],"Africa/Monrovia":[6.3,-10.783],"Africa/Maseru":[-29.467,27.5],"Europe/Vilnius":[54.683,25.317],"Europe/Luxembourg":[49.6,6.15],"Europe/Riga":[56.95,24.1],"Africa/Tripoli":[32.9,13.183],"Africa/Casablanca":[33.65,-7.583],"Europe/Monaco":[43.7,7.383],"Europe/Chisinau":[47,28.833],"Europe/Podgorica":[42.433,19.267],"America/Marigot":[18.067,-63.083],"Indian/Antananarivo":[-18.917,47.517],"Pacific/Majuro":[7.15,171.2],"Pacific/Kwajalein":[9.083,167.333],"Europe/Skopje":[41.983,21.433],"Africa/Bamako":[12.65,-8],"Asia/Yangon":[16.783,96.167],"Asia/Ulaanbaatar":[47.917,106.883],"Asia/Hovd":[48.017,91.65],"Asia/Macau":[22.197,113.542],"Pacific/Saipan":[15.2,145.75],"America/Martinique":[14.6,-61.083],"Africa/Nouakchott":[18.1,-15.95],"America/Montserrat":[16.717,-62.217],"Europe/Malta":[35.9,14.517],"Indian/Mauritius":[-20.167,57.5],"Indian/Maldives":[4.167,73.5],"Africa/Blantyre":[-15.783,35],"America/Mexico_City":[19.4,-99.15],"America/Cancun":[21.083,-86.767],"America/Merida":[20.967,-89.617],"America/Monterrey":[25.667,-100.317],"America/Matamoros":[25.833,-97.5],"America/Chihuahua":[28.633,-106.083],"America/Ciudad_Juarez":[31.733,-106.483],"America/Ojinaga":[29.567,-104.417],"America/Mazatlan":[23.217,-106.417],"America/Bahia_Banderas":[20.8,-105.25],"America/Hermosillo":[29.067,-110.967],"America/Tijuana":[32.533,-117.017],"Asia/Kuala_Lumpur":[3.167,101.7],"Asia/Kuching":[1.55,110.333],"Africa/Maputo":[-25.967,32.583],"Africa/Windhoek":[-22.567,17.1],"Pacific/Noumea":[-22.267,166.45],"Africa/Niamey":[13.517,2.117],"Pacific/Norfolk":[-29.05,167.967],"Africa/Lagos":[6.45,3.4],"America/Managua":[12.15,-86.283],"Europe/Amsterdam":[52.367,4.9],"Europe/Oslo":[59.917,10.75],"Asia/Kathmandu":[27.717,85.317],"Pacific/Nauru":[-.517,166.917],"Pacific/Niue":[-19.017,-169.917],"Pacific/Auckland":[-36.867,174.767],"Pacific/Chatham":[-43.95,-176.55],"Asia/Muscat":[23.6,58.583],"America/Panama":[8.967,-79.533],"America/Lima":[-12.05,-77.05],"Pacific/Tahiti":[-17.533,-149.567],"Pacific/Marquesas":[-9,-139.5],"Pacific/Gambier":[-23.133,-134.95],"Pacific/Port_Moresby":[-9.5,147.167],"Pacific/Bougainville":[-6.217,155.567],"Asia/Manila":[14.587,120.968],"Asia/Karachi":[24.867,67.05],"Europe/Warsaw":[52.25,21],"America/Miquelon":[47.05,-56.333],"Pacific/Pitcairn":[-25.067,-130.083],"America/Puerto_Rico":[18.468,-66.106],"Asia/Gaza":[31.5,34.467],"Asia/Hebron":[31.533,35.095],"Europe/Lisbon":[38.717,-9.133],"Atlantic/Madeira":[32.633,-16.9],"Atlantic/Azores":[37.733,-25.667],"Pacific/Palau":[7.333,134.483],"America/Asuncion":[-25.267,-57.667],"Asia/Qatar":[25.283,51.533],"Indian/Reunion":[-20.867,55.467],"Europe/Bucharest":[44.433,26.1],"Europe/Belgrade":[44.833,20.5],"Europe/Kaliningrad":[54.717,20.5],"Europe/Moscow":[55.756,37.618],"Europe/Simferopol":[44.95,34.1],"Europe/Kirov":[58.6,49.65],"Europe/Volgograd":[48.733,44.417],"Europe/Astrakhan":[46.35,48.05],"Europe/Saratov":[51.567,46.033],"Europe/Ulyanovsk":[54.333,48.4],"Europe/Samara":[53.2,50.15],"Asia/Yekaterinburg":[56.85,60.6],"Asia/Omsk":[55,73.4],"Asia/Novosibirsk":[55.033,82.917],"Asia/Barnaul":[53.367,83.75],"Asia/Tomsk":[56.5,84.967],"Asia/Novokuznetsk":[53.75,87.117],"Asia/Krasnoyarsk":[56.017,92.833],"Asia/Irkutsk":[52.267,104.333],"Asia/Chita":[52.05,113.467],"Asia/Yakutsk":[62,129.667],"Asia/Khandyga":[62.656,135.554],"Asia/Vladivostok":[43.167,131.933],"Asia/Ust-Nera":[64.56,143.227],"Asia/Magadan":[59.567,150.8],"Asia/Sakhalin":[46.967,142.7],"Asia/Srednekolymsk":[67.467,153.717],"Asia/Kamchatka":[53.017,158.65],"Asia/Anadyr":[64.75,177.483],"Africa/Kigali":[-1.95,30.067],"Asia/Riyadh":[24.633,46.717],"Pacific/Guadalcanal":[-9.533,160.2],"Indian/Mahe":[-4.667,55.467],"Africa/Khartoum":[15.6,32.533],"Europe/Stockholm":[59.333,18.05],"Asia/Singapore":[1.283,103.85],"Atlantic/St_Helena":[-15.917,-5.7],"Europe/Ljubljana":[46.05,14.517],"Arctic/Longyearbyen":[78,16],"Europe/Bratislava":[48.15,17.117],"Africa/Freetown":[8.5,-13.25],"Europe/San_Marino":[43.917,12.467],"Africa/Dakar":[14.667,-17.433],"Africa/Mogadishu":[2.067,45.367],"America/Paramaribo":[5.833,-55.167],"Africa/Juba":[4.85,31.617],"Africa/Sao_Tome":[.333,6.733],"America/El_Salvador":[13.7,-89.2],"America/Lower_Princes":[18.051,-63.047],"Asia/Damascus":[33.5,36.3],"Africa/Mbabane":[-26.3,31.1],"America/Grand_Turk":[21.467,-71.133],"Africa/Ndjamena":[12.117,15.05],"Indian/Kerguelen":[-49.353,70.218],"Africa/Lome":[6.133,1.217],"Asia/Bangkok":[13.75,100.517],"Asia/Dushanbe":[38.583,68.8],"Pacific/Fakaofo":[-9.367,-171.233],"Asia/Dili":[-8.55,125.583],"Asia/Ashgabat":[37.95,58.383],"Africa/Tunis":[36.8,10.183],"Pacific/Tongatapu":[-21.133,-175.2],"Europe/Istanbul":[41.017,28.967],"America/Port_of_Spain":[10.65,-61.517],"Pacific/Funafuti":[-8.517,179.217],"Asia/Taipei":[25.05,121.5],"Africa/Dar_es_Salaam":[-6.8,39.283],"Europe/Kyiv":[50.433,30.517],"Africa/Kampala":[.317,32.417],"Pacific/Midway":[28.217,-177.367],"Pacific/Wake":[19.283,166.617],"America/New_York":[40.714,-74.006],"America/Detroit":[42.331,-83.046],"America/Kentucky/Louisville":[38.254,-85.759],"America/Kentucky/Monticello":[36.83,-84.849],"America/Indiana/Indianapolis":[39.768,-86.158],"America/Indiana/Vincennes":[38.677,-87.529],"America/Indiana/Winamac":[41.051,-86.603],"America/Indiana/Marengo":[38.376,-86.345],"America/Indiana/Petersburg":[38.492,-87.279],"America/Indiana/Vevay":[38.748,-85.067],"America/Chicago":[41.85,-87.65],"America/Indiana/Tell_City":[37.953,-86.761],"America/Indiana/Knox":[41.296,-86.625],"America/Menominee":[45.108,-87.614],"America/North_Dakota/Center":[47.116,-101.299],"America/North_Dakota/New_Salem":[46.845,-101.411],"America/North_Dakota/Beulah":[47.264,-101.778],"America/Denver":[39.739,-104.984],"America/Boise":[43.614,-116.203],"America/Phoenix":[33.448,-112.073],"America/Los_Angeles":[34.052,-118.243],"America/Anchorage":[61.218,-149.9],"America/Juneau":[58.302,-134.42],"America/Sitka":[57.176,-135.302],"America/Metlakatla":[55.127,-131.576],"America/Yakutat":[59.547,-139.727],"America/Nome":[64.501,-165.406],"America/Adak":[51.88,-176.658],"Pacific/Honolulu":[21.307,-157.858],"America/Montevideo":[-34.909,-56.213],"Asia/Samarkand":[39.667,66.8],"Asia/Tashkent":[41.333,69.3],"Europe/Vatican":[41.902,12.453],"America/St_Vincent":[13.15,-61.233],"America/Caracas":[10.5,-66.933],"America/Tortola":[18.45,-64.617],"America/St_Thomas":[18.35,-64.933],"Asia/Ho_Chi_Minh":[10.75,106.667],"Pacific/Efate":[-17.667,168.417],"Pacific/Wallis":[-13.3,-176.167],"Pacific/Apia":[-13.833,-171.733],"Asia/Aden":[12.75,45.2],"Indian/Mayotte":[-12.783,45.233],"Africa/Johannesburg":[-26.25,28],"Africa/Lusaka":[-15.417,28.283],"Africa/Harare":[-17.833,31.05]};var rb=Intl.DateTimeFormat().resolvedOptions().timeZone;function Wl(n){let e=Math.PI/180,t=(n-Date.UTC(n.getUTCFullYear(),0,1))/864e5,i=2*Math.PI*t/365.2422,r=.006918-.399912*Math.cos(i)+.070257*Math.sin(i)-.006758*Math.cos(2*i)+907e-6*Math.sin(2*i)-.002697*Math.cos(3*i)+.00148*Math.sin(3*i),a=229.18*(75e-6+.001868*Math.cos(i)-.032077*Math.sin(i)-.014615*Math.cos(2*i)-.040849*Math.sin(2*i)),o=(180-(n.getUTCHours()*60+n.getUTCMinutes()+a)/4)*e;return new z(Math.cos(r)*Math.cos(o),Math.sin(r),-Math.cos(r)*Math.sin(o))}function sg(n,e,t=og[rb]){let i=Math.PI/180,[r,a]=t||[0,-n.getTimezoneOffset()/4],o=Math.asin(df.clamp(e.x*Math.cos(r*i)*Math.cos(a*i)+e.y*Math.sin(r*i)-e.z*Math.cos(r*i)*Math.sin(a*i),-1,1))/i;return 1-df.smoothstep(o,-7,7)}function lg(n){let e=new wo;[[0,1],[.1,.65],[.1,.18],[.89,-.26],[.88,-.42],[.1,-.19],[.09,-.63],[.31,-.83],[.3,-.95],[0,-.83],[-.3,-.95],[-.31,-.83],[-.09,-.63],[-.1,-.19],[-.88,-.42],[-.89,-.26],[-.1,.18],[-.1,.65]].forEach(([f,h],m)=>m?e.lineTo(f,h):e.moveTo(f,h)),e.closePath();let i=new Ul(e),r=new Vn({color:13822975,side:ni}),a=new _n,o=n.map((f,h)=>{let m=new Ft(i,r);return m.scale.setScalar(.14),a.add(m),{plane:m,route:f,phase:(.17+h*.381966)%1,duration:28+f[0].distanceTo(f.at(-1))*2.6}}),s=new z,l=new z,u=new z,c=new wt;function d(f){for(let{plane:h,route:m,phase:x,duration:g}of o){let p=(f/g+x)%1,y=p*(m.length-1),_=Math.floor(y);h.position.lerpVectors(m[_],m[_+1],y-_),s.subVectors(m[_+1],m[_]).normalize(),l.copy(h.position).normalize(),u.crossVectors(s,l).normalize(),l.crossVectors(u,s),h.quaternion.setFromRotationMatrix(c.makeBasis(u,s,l)),h.scale.setScalar(.14*Math.min(1,p*18,(1-p)*18))}}return d(0),{group:a,update:d}}function cg(n,e,t,i){let r=[],a=[],o=87251,s=()=>(o=Math.imul(o,1664525)+1013904223>>>0)/4294967296;for(let{lat:u,lon:c}of n)for(let d=0;d<105;d++){let f=s()*Math.PI*2,h=s()**1.5*1.65,m=u+Math.sin(f)*h*.64,x=c+Math.cos(f)*h/Math.cos(u*Math.PI/180);if(!t(x,m))continue;let g=e(m,x,i+.035);r.push(g.x,g.y,g.z),a.push(1,.57+s()*.35,.29+s()*.23)}let l=new Vt;return l.setAttribute("position",new Tt(r,3)),l.setAttribute("color",new Tt(a,3)),new Si(l,new si({vertexColors:!0,size:.036,transparent:!0,depthWrite:!1,blending:cl,toneMapped:!1}))}var gf={ko:["\uC9C0\uAD6C\uBCF8\uC744 \uB458\uB7EC\uBD10","\uC190\uAC00\uB77D\uC73C\uB85C \uB3CC\uB9AC\uACE0, \uB450 \uC190\uAC00\uB77D\uC73C\uB85C \uD655\uB300\uD574 \uC6D0\uD558\uB294 \uB3C4\uC2DC\uB97C \uCC3E\uC544\uBD10.","\uB3C4\uC2DC\uB97C \uB20C\uB7EC\uBD10","\uB3C4\uC2DC\uB97C \uB20C\uB7EC \uC138\uC158 \uC608\uC57D, \uC7A5\uAC11 \uB4DC\uB86D, SOUND SYSTEM, DGTG-01\uC744 \uC5F4\uC5B4\uBD10.","\uC608\uC57D\uACFC \uB300\uD654\uB97C \uC774\uC5B4\uAC00","\uBA54\uB274\uC5D0\uC11C \uB0B4 \uACC4\uC815\uC744 \uC5F4\uC5B4 \uC694\uCCAD\uACFC \uB300\uD654\uB97C \uD655\uC778\uD574.","\uC7A5\uAC11 \uCCAB \uD53D\uC5C5","US$10 \uC774\uC0C1\uC73C\uB85C \uC6D0\uD558\uB294 \uAE08\uC561\uC744 \uC815\uD574\uC694. \uBC30\uC1A1 \uC5C6\uC774 \uB4DC\uB86D \uC7A5\uC18C\uC5D0\uC11C \uC9C1\uC811 \uD53D\uC5C5\uD574\uC694. \uC9C0\uAE08\uC740 \uB4DC\uB86D \uC900\uBE44 \uC911\uC774\uC5D0\uC694.","\uC7A5\uAC11\uC758 \uB2E4\uC74C \uC8FC\uC778","\uC8FC\uC778\uC774 \uC788\uB294 \uC7A5\uAC11\uC740 \uD750\uB9AC\uAC8C \uBCF4\uC5EC. \uC815\uC2DD \uC5F0\uACB0 \uD6C4 \uBCF4\uC720\uC790\uC640 \uB300\uD654\uD574 \uC9C1\uAC70\uB798\xB7\uD0DD\uBC30 \uAC70\uB798\uB97C \uD611\uC758\uD558\uB294 \uBC29\uC2DD\uC774\uC57C. \uACB0\uC81C\uB294 \uB2F9\uC0AC\uC790\uB07C\uB9AC \uC9C4\uD589\uD558\uBA70, \uD604\uC7AC \uB300\uD654\uB294 \uC804\uC1A1\uB418\uC9C0 \uC54A\uB294 \uC2DC\uC548\uC774\uC57C.","\uB3C4\uC2DC\uC758 \uC74C\uC545\uC744 \uB4E4\uC5B4\uBD10","\uB3C4\uC2DC \uBA54\uB274\uC5D0\uC11C SOUND SYSTEM\uC744 \uC5F4\uACE0 \uC7AC\uC0DD\uC744 \uB20C\uB7EC\uBD10. \uC7AC\uC0DD \uB9C9\uB300\uB85C \uC6D0\uD558\uB294 \uAD6C\uAC04\uC744 \uCC3E\uACE0, \uB2EB\uC73C\uBA74 \uC74C\uC545\uC774 \uBA48\uCDB0.","DGTG-01 \uAD6C\uB9E4\uD558\uAE30","\uB3C4\uC2DC \uBA54\uB274\uC758 DGTG-01\uC744 \uB204\uB974\uBA74 4thdeath \uC0C1\uD488 \uD398\uC774\uC9C0\uAC00 \uC5F4\uB824. \uC0C1\uD488 \uC815\uBCF4\xB7\uAC00\uACA9\xB7\uBC30\uC1A1\uC744 \uD655\uC778\uD558\uACE0 \uD574\uB2F9 \uC0AC\uC774\uD2B8\uC5D0\uC11C \uAD6C\uB9E4\uD574.","\uB2E4\uB978 \uAE30\uB2A5\uB3C4 \uB458\uB7EC\uBD10","\uAE30\uD0C0 \uAE30\uB2A5\uC5D0\uC11C SOS\xB7\uBAA8\uC2A4 \uBD80\uD638, \uC258\uD130, \uC601\uC0C1\uACFC \uC0C1\uD488\uC744 \uC5F4 \uC218 \uC788\uC5B4. \uC258\uD130\uB294 \uCC38\uACE0\uC6A9\uC774\uB2C8 \uC2E4\uC81C \uC7AC\uB09C\uC5D0\uC11C\uB294 \uACF5\uC2DD \uC548\uB0B4\uB97C \uBA3C\uC800 \uB530\uB77C\uC918.","\uB2E4\uC74C","\uC774\uC804","\uAC74\uB108\uB6F0\uAE30","\uC2DC\uC791\uD558\uAE30","\uC571 \uC0AC\uC6A9 \uC548\uB0B4"],en:["Explore the globe","Drag to rotate. Pinch to zoom and find your city.","Choose a city","Tap a city for session booking, glove drops, SOUND SYSTEM and DGTG-01.","Keep the conversation going","Open My account from Menu to see your requests and messages.","First glove pickup","Choose any amount from US$10. Collect at the drop location; no shipping. Drops are currently being prepared.","The next owner","Owned gloves appear blurred. Once trading is live, chat with the owner to arrange pickup or shipping and pay each other directly. The current chat is a preview and sends no messages.","Listen to the city","Open SOUND SYSTEM in a city menu and press Play. Use the seek bar to move through the track. Closing the player stops the music.","Buy DGTG-01","Tap DGTG-01 in the city menu to open its 4thdeath product page. Check the product, price and shipping, then purchase on that site.","Explore more","Explore opens SOS/Morse, shelters, videos and objects. Shelter information is a reference; follow official instructions in an emergency.","Next","Back","Skip","Get started","App guide"],ja:["\u5730\u7403\u3092\u898B\u3066\u307F\u3088\u3046","\u6307\u3067\u56DE\u3057\u3066\u30012\u672C\u306E\u6307\u3067\u62E1\u5927\u3002\u6C17\u306B\u306A\u308B\u90FD\u5E02\u3092\u63A2\u305D\u3046\u3002","\u90FD\u5E02\u3092\u9078\u307C\u3046","\u90FD\u5E02\u304B\u3089\u30BB\u30C3\u30B7\u30E7\u30F3\u4E88\u7D04\u3001\u30B0\u30ED\u30FC\u30D6\u3001SOUND SYSTEM\u3001DGTG-01\u3078\u3002","\u4E88\u7D04\u3068\u4F1A\u8A71\u3092\u7D9A\u3051\u3088\u3046","\u30E1\u30CB\u30E5\u30FC\u306E\u30A2\u30AB\u30A6\u30F3\u30C8\u3067\u4F9D\u983C\u3068\u30E1\u30C3\u30BB\u30FC\u30B8\u3092\u78BA\u8A8D\u3002","\u30B0\u30ED\u30FC\u30D6\u306E\u521D\u56DE\u53D7\u53D6","US$10\u4EE5\u4E0A\u3067\u91D1\u984D\u3092\u9078\u3079\u307E\u3059\u3002\u30C9\u30ED\u30C3\u30D7\u5730\u70B9\u3067\u76F4\u63A5\u53D7\u3051\u53D6\u308A\u3001\u914D\u9001\u306F\u3042\u308A\u307E\u305B\u3093\u3002\u73FE\u5728\u6E96\u5099\u4E2D\u3067\u3059\u3002","\u6B21\u306E\u6240\u6709\u8005\u3078","\u6240\u6709\u8005\u306E\u3044\u308B\u30B0\u30ED\u30FC\u30D6\u306F\u307C\u304B\u3057\u3066\u8868\u793A\u3002\u53D6\u5F15\u958B\u59CB\u5F8C\u306F\u6240\u6709\u8005\u3068\u4F1A\u8A71\u3057\u3001\u624B\u6E21\u3057\u30FB\u914D\u9001\u3084\u5F53\u4E8B\u8005\u9593\u306E\u652F\u6255\u3044\u3092\u76F8\u8AC7\u3057\u307E\u3059\u3002\u73FE\u5728\u306E\u4F1A\u8A71\u306F\u9001\u4FE1\u3055\u308C\u306A\u3044\u30D7\u30EC\u30D3\u30E5\u30FC\u3067\u3059\u3002","\u90FD\u5E02\u306E\u97F3\u697D\u3092\u8074\u3053\u3046","\u90FD\u5E02\u30E1\u30CB\u30E5\u30FC\u306ESOUND SYSTEM\u3067\u518D\u751F\u3092\u62BC\u3057\u307E\u3059\u3002\u30D0\u30FC\u3067\u518D\u751F\u4F4D\u7F6E\u3092\u5909\u66F4\u3067\u304D\u307E\u3059\u3002\u9589\u3058\u308B\u3068\u97F3\u697D\u304C\u6B62\u307E\u308A\u307E\u3059\u3002","DGTG-01\u3092\u8CFC\u5165","\u90FD\u5E02\u30E1\u30CB\u30E5\u30FC\u306EDGTG-01\u304B\u30894thdeath\u306E\u5546\u54C1\u30DA\u30FC\u30B8\u3078\u3002\u5546\u54C1\u30FB\u4FA1\u683C\u30FB\u914D\u9001\u3092\u78BA\u8A8D\u3057\u3066\u3001\u305D\u306E\u30B5\u30A4\u30C8\u3067\u8CFC\u5165\u3057\u307E\u3059\u3002","\u305D\u306E\u4ED6\u306E\u6A5F\u80FD","\u305D\u306E\u4ED6\u304B\u3089SOS\u30FB\u30E2\u30FC\u30EB\u30B9\u3001\u30B7\u30A7\u30EB\u30BF\u30FC\u3001\u6620\u50CF\u3001\u5546\u54C1\u3092\u958B\u3051\u307E\u3059\u3002\u30B7\u30A7\u30EB\u30BF\u30FC\u60C5\u5831\u306F\u53C2\u8003\u7528\u3067\u3059\u3002\u707D\u5BB3\u6642\u306F\u516C\u5F0F\u306E\u6848\u5185\u306B\u5F93\u3063\u3066\u304F\u3060\u3055\u3044\u3002","\u6B21\u3078","\u623B\u308B","\u30B9\u30AD\u30C3\u30D7","\u306F\u3058\u3081\u308B","\u30A2\u30D7\u30EA\u30AC\u30A4\u30C9"],zh:["\u63A2\u7D22\u5730\u7403","\u62D6\u52A8\u65CB\u8F6C\uFF0C\u53CC\u6307\u7F29\u653E\uFF0C\u627E\u5230\u4F60\u60F3\u53BB\u7684\u57CE\u5E02\u3002","\u9009\u62E9\u57CE\u5E02","\u70B9\u9009\u57CE\u5E02\uFF0C\u67E5\u770B\u9884\u7EA6\u3001\u624B\u5957\u3001SOUND SYSTEM \u548C DGTG-01\u3002","\u7EE7\u7EED\u9884\u7EA6\u4E0E\u5BF9\u8BDD","\u5728\u83DC\u5355\u4E2D\u6253\u5F00\u6211\u7684\u8D26\u6237\uFF0C\u67E5\u770B\u8BF7\u6C42\u548C\u6D88\u606F\u3002","\u9996\u6B21\u9886\u53D6\u624B\u5957","\u81EA\u9009\u91D1\u989D\uFF0C\u6700\u4F4E US$10\u3002\u4EC5\u9650\u5230\u6389\u843D\u5730\u70B9\u81EA\u53D6\uFF0C\u4E0D\u914D\u9001\u3002\u76EE\u524D\u6B63\u5728\u7B79\u5907\u3002","\u4E0B\u4E00\u4F4D\u4E3B\u4EBA","\u5DF2\u6709\u4E3B\u4EBA\u7684\u624B\u5957\u4F1A\u6A21\u7CCA\u663E\u793A\u3002\u6B63\u5F0F\u4EA4\u6613\u4E0A\u7EBF\u540E\uFF0C\u53EF\u4E0E\u6301\u6709\u8005\u804A\u5929\u534F\u5546\u9762\u4EA4\u6216\u90AE\u5BC4\uFF0C\u53CC\u65B9\u81EA\u884C\u4ED8\u6B3E\u3002\u76EE\u524D\u7684\u804A\u5929\u53EA\u662F\u9884\u89C8\uFF0C\u4E0D\u4F1A\u53D1\u9001\u6D88\u606F\u3002","\u8046\u542C\u57CE\u5E02\u97F3\u4E50","\u5728\u57CE\u5E02\u83DC\u5355\u6253\u5F00SOUND SYSTEM\u5E76\u70B9\u51FB\u64AD\u653E\u3002\u62D6\u52A8\u8FDB\u5EA6\u6761\u9009\u62E9\u7247\u6BB5\uFF0C\u5173\u95ED\u64AD\u653E\u5668\u4F1A\u505C\u6B62\u97F3\u4E50\u3002","\u8D2D\u4E70DGTG-01","\u70B9\u51FB\u57CE\u5E02\u83DC\u5355\u7684DGTG-01\u6253\u5F004thdeath\u5546\u54C1\u9875\u9762\u3002\u786E\u8BA4\u5546\u54C1\u3001\u4EF7\u683C\u548C\u914D\u9001\u540E\uFF0C\u5728\u8BE5\u7F51\u7AD9\u8D2D\u4E70\u3002","\u63A2\u7D22\u66F4\u591A","\u63A2\u7D22\u83DC\u5355\u63D0\u4F9BSOS\uFF0F\u6469\u65AF\u7535\u7801\u3001\u907F\u96BE\u6240\u3001\u89C6\u9891\u548C\u5546\u54C1\u3002\u907F\u96BE\u6240\u4FE1\u606F\u4EC5\u4F9B\u53C2\u8003\uFF0C\u7D27\u6025\u60C5\u51B5\u8BF7\u9075\u5FAA\u5B98\u65B9\u6307\u5F15\u3002","\u4E0B\u4E00\u6B65","\u4E0A\u4E00\u6B65","\u8DF3\u8FC7","\u5F00\u59CB","\u4F7F\u7528\u6307\u5357"],"zh-Hant":["\u63A2\u7D22\u5730\u7403","\u62D6\u66F3\u65CB\u8F49\uFF0C\u96D9\u6307\u7E2E\u653E\uFF0C\u627E\u5230\u4F60\u60F3\u53BB\u7684\u57CE\u5E02\u3002","\u9078\u64C7\u57CE\u5E02","\u9EDE\u9078\u57CE\u5E02\uFF0C\u67E5\u770B\u9810\u7D04\u3001\u624B\u5957\u3001SOUND SYSTEM \u548C DGTG-01\u3002","\u7E7C\u7E8C\u9810\u7D04\u8207\u5C0D\u8A71","\u5728\u9078\u55AE\u4E2D\u6253\u958B\u6211\u7684\u5E33\u6236\uFF0C\u67E5\u770B\u8ACB\u6C42\u548C\u8A0A\u606F\u3002","\u9996\u6B21\u9818\u53D6\u624B\u5957","\u81EA\u9078\u91D1\u984D\uFF0C\u6700\u4F4E US$10\u3002\u50C5\u9650\u5230\u6389\u843D\u5730\u9EDE\u81EA\u53D6\uFF0C\u4E0D\u914D\u9001\u3002\u76EE\u524D\u6B63\u5728\u7C4C\u5099\u3002","\u4E0B\u4E00\u4F4D\u4E3B\u4EBA","\u5DF2\u6709\u4E3B\u4EBA\u7684\u624B\u5957\u6703\u6A21\u7CCA\u986F\u793A\u3002\u6B63\u5F0F\u4EA4\u6613\u4E0A\u7DDA\u5F8C\uFF0C\u53EF\u8207\u6301\u6709\u8005\u804A\u5929\u5354\u5546\u9762\u4EA4\u6216\u90F5\u5BC4\uFF0C\u96D9\u65B9\u81EA\u884C\u4ED8\u6B3E\u3002\u76EE\u524D\u804A\u5929\u53EA\u662F\u9810\u89BD\uFF0C\u4E0D\u6703\u50B3\u9001\u8A0A\u606F\u3002","\u8046\u807D\u57CE\u5E02\u97F3\u6A02","\u5728\u57CE\u5E02\u9078\u55AE\u958B\u555FSOUND SYSTEM\u4E26\u9EDE\u9078\u64AD\u653E\u3002\u62D6\u66F3\u9032\u5EA6\u689D\u9078\u64C7\u7247\u6BB5\uFF0C\u95DC\u9589\u64AD\u653E\u5668\u6703\u505C\u6B62\u97F3\u6A02\u3002","\u8CFC\u8CB7DGTG-01","\u9EDE\u9078\u57CE\u5E02\u9078\u55AE\u7684DGTG-01\u958B\u555F4thdeath\u5546\u54C1\u9801\u9762\u3002\u78BA\u8A8D\u5546\u54C1\u3001\u50F9\u683C\u548C\u914D\u9001\u5F8C\uFF0C\u5728\u8A72\u7DB2\u7AD9\u8CFC\u8CB7\u3002","\u63A2\u7D22\u66F4\u591A","\u63A2\u7D22\u9078\u55AE\u63D0\u4F9BSOS\uFF0F\u6469\u65AF\u96FB\u78BC\u3001\u907F\u96E3\u6240\u3001\u5F71\u7247\u548C\u5546\u54C1\u3002\u907F\u96E3\u6240\u8CC7\u8A0A\u50C5\u4F9B\u53C3\u8003\uFF0C\u7DCA\u6025\u60C5\u6CC1\u8ACB\u9075\u5FAA\u5B98\u65B9\u6307\u5F15\u3002","\u4E0B\u4E00\u6B65","\u4E0A\u4E00\u6B65","\u7565\u904E","\u958B\u59CB","\u4F7F\u7528\u6307\u5357"],ru:["\u0418\u0441\u0441\u043B\u0435\u0434\u0443\u0439\u0442\u0435 \u0433\u043B\u043E\u0431\u0443\u0441","\u041F\u043E\u0432\u043E\u0440\u0430\u0447\u0438\u0432\u0430\u0439\u0442\u0435 \u043E\u0434\u043D\u0438\u043C \u043F\u0430\u043B\u044C\u0446\u0435\u043C. \u041C\u0430\u0441\u0448\u0442\u0430\u0431\u0438\u0440\u0443\u0439\u0442\u0435 \u0434\u0432\u0443\u043C\u044F, \u0447\u0442\u043E\u0431\u044B \u043D\u0430\u0439\u0442\u0438 \u0441\u0432\u043E\u0439 \u0433\u043E\u0440\u043E\u0434.","\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0433\u043E\u0440\u043E\u0434","\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0433\u043E\u0440\u043E\u0434 \u0434\u043B\u044F \u0437\u0430\u043F\u0438\u0441\u0438 \u043D\u0430 \u0441\u0435\u0430\u043D\u0441, \u0434\u0440\u043E\u043F\u0430 \u043F\u0435\u0440\u0447\u0430\u0442\u043E\u043A, SOUND SYSTEM \u0438 DGTG-01.","\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0430\u0439\u0442\u0435 \u043E\u0431\u0449\u0435\u043D\u0438\u0435","\u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0430\u043A\u043A\u0430\u0443\u043D\u0442 \u0432 \u043C\u0435\u043D\u044E, \u0447\u0442\u043E\u0431\u044B \u0443\u0432\u0438\u0434\u0435\u0442\u044C \u0437\u0430\u043F\u0440\u043E\u0441\u044B \u0438 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F.","\u041F\u0435\u0440\u0432\u043E\u0435 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0435 \u043F\u0435\u0440\u0447\u0430\u0442\u043E\u043A","\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0443\u043C\u043C\u0443 \u043E\u0442 US$10. \u0422\u043E\u043B\u044C\u043A\u043E \u0441\u0430\u043C\u043E\u0432\u044B\u0432\u043E\u0437 \u0441 \u043C\u0435\u0441\u0442\u0430 \u0432\u044B\u0434\u0430\u0447\u0438, \u0431\u0435\u0437 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438. \u0412\u044B\u0434\u0430\u0447\u0430 \u0433\u043E\u0442\u043E\u0432\u0438\u0442\u0441\u044F.","\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 \u0432\u043B\u0430\u0434\u0435\u043B\u0435\u0446","\u041F\u0435\u0440\u0447\u0430\u0442\u043A\u0438 \u0441 \u0432\u043B\u0430\u0434\u0435\u043B\u044C\u0446\u0435\u043C \u0440\u0430\u0437\u043C\u044B\u0442\u044B. \u041F\u043E\u0441\u043B\u0435 \u0437\u0430\u043F\u0443\u0441\u043A\u0430 \u0442\u043E\u0440\u0433\u043E\u0432\u043B\u0438 \u043C\u043E\u0436\u043D\u043E \u0431\u0443\u0434\u0435\u0442 \u0434\u043E\u0433\u043E\u0432\u043E\u0440\u0438\u0442\u044C\u0441\u044F \u0441 \u0432\u043B\u0430\u0434\u0435\u043B\u044C\u0446\u0435\u043C \u043E \u0432\u0441\u0442\u0440\u0435\u0447\u0435 \u0438\u043B\u0438 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0435 \u0438 \u043E\u043F\u043B\u0430\u0442\u0438\u0442\u044C \u043D\u0430\u043F\u0440\u044F\u043C\u0443\u044E. \u0421\u0435\u0439\u0447\u0430\u0441 \u0447\u0430\u0442 \u2014 \u043F\u0440\u0435\u0434\u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440, \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F \u043D\u0435 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u044E\u0442\u0441\u044F.","\u041C\u0443\u0437\u044B\u043A\u0430 \u0433\u043E\u0440\u043E\u0434\u0430","\u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 SOUND SYSTEM \u0432 \u043C\u0435\u043D\u044E \u0433\u043E\u0440\u043E\u0434\u0430 \u0438 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \u0432\u043E\u0441\u043F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u0435. \u041F\u043E\u043B\u043E\u0441\u0430 \u043F\u043E\u0437\u0432\u043E\u043B\u044F\u0435\u0442 \u043F\u0435\u0440\u0435\u043C\u043E\u0442\u0430\u0442\u044C \u0442\u0440\u0435\u043A. \u0417\u0430\u043A\u0440\u044B\u0442\u0438\u0435 \u043F\u043B\u0435\u0435\u0440\u0430 \u043E\u0441\u0442\u0430\u043D\u0430\u0432\u043B\u0438\u0432\u0430\u0435\u0442 \u043C\u0443\u0437\u044B\u043A\u0443.","\u041A\u0443\u043F\u0438\u0442\u044C DGTG-01","DGTG-01 \u043E\u0442\u043A\u0440\u044B\u0432\u0430\u0435\u0442 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0442\u043E\u0432\u0430\u0440\u0430 \u043D\u0430 4thdeath. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435, \u0446\u0435\u043D\u0443 \u0438 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0443; \u043F\u043E\u043A\u0443\u043F\u043A\u0430 \u0441\u043E\u0432\u0435\u0440\u0448\u0430\u0435\u0442\u0441\u044F \u043D\u0430 \u0442\u043E\u043C \u0441\u0430\u0439\u0442\u0435.","\u0414\u0440\u0443\u0433\u0438\u0435 \u0444\u0443\u043D\u043A\u0446\u0438\u0438","\u0412 \u0440\u0430\u0437\u0434\u0435\u043B\u0435 \u043E\u0431\u0437\u043E\u0440\u0430 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B SOS/\u0430\u0437\u0431\u0443\u043A\u0430 \u041C\u043E\u0440\u0437\u0435, \u0443\u0431\u0435\u0436\u0438\u0449\u0430, \u0432\u0438\u0434\u0435\u043E \u0438 \u0442\u043E\u0432\u0430\u0440\u044B. \u0414\u0430\u043D\u043D\u044B\u0435 \u043E\u0431 \u0443\u0431\u0435\u0436\u0438\u0449\u0430\u0445 \u0441\u043F\u0440\u0430\u0432\u043E\u0447\u043D\u044B\u0435; \u043F\u0440\u0438 \u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438 \u0441\u043B\u0435\u0434\u0443\u0439\u0442\u0435 \u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u043C \u0443\u043A\u0430\u0437\u0430\u043D\u0438\u044F\u043C.","\u0414\u0430\u043B\u0435\u0435","\u041D\u0430\u0437\u0430\u0434","\u041F\u0440\u043E\u043F\u0443\u0441\u0442\u0438\u0442\u044C","\u041D\u0430\u0447\u0430\u0442\u044C","\u0413\u0438\u0434 \u043F\u043E \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044E"],fr:["Explorez le globe","Faites glisser pour tourner. Pincez pour zoomer et trouver votre ville.","Choisissez une ville","Touchez une ville pour r\xE9server une s\xE9ance et acc\xE9der aux gants, \xE0 SOUND SYSTEM et \xE0 DGTG-01.","Poursuivez la conversation","Ouvrez Mon compte dans le menu pour retrouver vos demandes et messages.","Premier retrait des gants","Choisissez votre montant \xE0 partir de US$10. Retrait au lieu du drop uniquement, sans livraison. Drops en pr\xE9paration.","Le prochain propri\xE9taire","Les gants attribu\xE9s sont flout\xE9s. Une fois les \xE9changes disponibles, discutez avec le propri\xE9taire pour une remise en main propre ou un envoi et payez directement entre vous. Le chat actuel est un aper\xE7u sans envoi.","\xC9coutez la ville","Ouvrez SOUND SYSTEM et lancez la lecture. La barre permet de changer de passage. Fermer le lecteur arr\xEAte la musique.","Acheter DGTG-01","DGTG-01 ouvre sa fiche produit sur 4thdeath. V\xE9rifiez le produit, le prix et la livraison, puis achetez sur ce site.","Explorez les autres fonctions","Explorer donne acc\xE8s \xE0 SOS/Morse, aux abris, aux vid\xE9os et aux objets. Les abris sont indiqu\xE9s \xE0 titre informatif ; en cas d\u2019urgence, suivez les consignes officielles.","Suivant","Retour","Passer","Commencer","Guide de l\u2019application"],es:["Explora el globo","Arrastra para girar. Usa dos dedos para ampliar y encontrar tu ciudad.","Elige una ciudad","Toca una ciudad para reservar sesi\xF3n y ver guantes, SOUND SYSTEM y DGTG-01.","Sigue la conversaci\xF3n","Abre Mi cuenta en el men\xFA para ver tus solicitudes y mensajes.","Primera recogida de guantes","Elige cualquier importe desde US$10. Recoge en el lugar del drop, sin env\xEDos. Los drops est\xE1n en preparaci\xF3n.","El siguiente propietario","Los guantes con due\xF1o se ven borrosos. Cuando se activen los intercambios, podr\xE1s acordar entrega en mano o env\xEDo y pagar directamente al propietario. El chat actual es una vista previa y no env\xEDa mensajes.","Escucha la ciudad","Abre SOUND SYSTEM y pulsa reproducir. Usa la barra para buscar un fragmento. Cerrar el reproductor detiene la m\xFAsica.","Comprar DGTG-01","DGTG-01 abre su p\xE1gina en 4thdeath. Revisa producto, precio y env\xEDo y compra en esa web.","Explora m\xE1s","Explorar incluye SOS/Morse, refugios, v\xEDdeos y objetos. Los refugios son informaci\xF3n de referencia; en una emergencia, sigue las instrucciones oficiales.","Siguiente","Atr\xE1s","Omitir","Empezar","Gu\xEDa de la app"],de:["Entdecke den Globus","Zum Drehen ziehen. Mit zwei Fingern zoomen und deine Stadt finden.","W\xE4hle eine Stadt","Tippe auf eine Stadt f\xFCr Sessions, Handschuhe, SOUND SYSTEM und DGTG-01.","Bleib im Gespr\xE4ch","\xD6ffne Mein Konto im Men\xFC, um Anfragen und Nachrichten zu sehen.","Erste Handschuhabholung","W\xE4hle einen Betrag ab US$10. Abholung am Drop-Ort, kein Versand. Die Drops werden vorbereitet.","Der n\xE4chste Besitzer","Vergebene Handschuhe sind unscharf. Nach dem Handelsstart k\xF6nnt ihr Abholung oder Versand im Chat vereinbaren und direkt untereinander bezahlen. Der aktuelle Chat ist eine Vorschau ohne Nachrichtenversand.","H\xF6re die Stadt","\xD6ffne SOUND SYSTEM und starte die Wiedergabe. Mit dem Balken kannst du im Titel springen. Beim Schlie\xDFen stoppt die Musik.","DGTG-01 kaufen","DGTG-01 \xF6ffnet die Produktseite bei 4thdeath. Pr\xFCfe Produkt, Preis und Versand und kaufe dort.","Weitere Funktionen","Entdecken \xF6ffnet SOS/Morse, Schutzr\xE4ume, Videos und Objekte. Schutzraumdaten dienen als Orientierung; im Notfall gelten offizielle Anweisungen.","Weiter","Zur\xFCck","\xDCberspringen","Loslegen","App-Anleitung"],pt:["Explore o globo","Arraste para girar. Use dois dedos para ampliar e encontrar sua cidade.","Escolha uma cidade","Toque em uma cidade para agendar sess\xF5es e ver luvas, SOUND SYSTEM e DGTG-01.","Continue a conversa","Abra Minha conta no menu para ver seus pedidos e mensagens.","Primeira retirada de luvas","Escolha qualquer valor a partir de US$10. Retire no local do drop, sem envio. Os drops est\xE3o em prepara\xE7\xE3o.","O pr\xF3ximo propriet\xE1rio","Luvas com dono aparecem desfocadas. Quando as trocas estiverem dispon\xEDveis, combine retirada ou envio com o dono e paguem diretamente entre voc\xEAs. O chat atual \xE9 uma pr\xE9via e n\xE3o envia mensagens.","Ou\xE7a a cidade","Abra SOUND SYSTEM e toque em reproduzir. Use a barra para buscar um trecho. Fechar o player interrompe a m\xFAsica.","Comprar DGTG-01","DGTG-01 abre a p\xE1gina do produto na 4thdeath. Confira produto, pre\xE7o e entrega e compre nesse site.","Explore mais","Explorar oferece SOS/Morse, abrigos, v\xEDdeos e objetos. Os abrigos s\xE3o uma refer\xEAncia; em emerg\xEAncias, siga as orienta\xE7\xF5es oficiais.","Pr\xF3ximo","Voltar","Pular","Come\xE7ar","Guia do app"],it:["Esplora il globo","Trascina per ruotare. Usa due dita per ingrandire e trovare la tua citt\xE0.","Scegli una citt\xE0","Tocca una citt\xE0 per prenotare una sessione e trovare guanti, SOUND SYSTEM e DGTG-01.","Continua la conversazione","Apri Account nel menu per vedere richieste e messaggi.","Primo ritiro dei guanti","Scegli un importo da US$10. Ritiro presso il luogo del drop, senza spedizione. I drop sono in preparazione.","Il prossimo proprietario","I guanti assegnati appaiono sfocati. Quando gli scambi saranno attivi, concordate ritiro o spedizione in chat e pagatevi direttamente. La chat attuale \xE8 un\u2019anteprima e non invia messaggi.","Ascolta la citt\xE0","Apri SOUND SYSTEM e avvia la riproduzione. Usa la barra per scegliere un punto del brano. Chiudendo il lettore, la musica si ferma.","Acquistare DGTG-01","DGTG-01 apre la pagina prodotto su 4thdeath. Controlla prodotto, prezzo e spedizione e acquista su quel sito.","Esplora di pi\xF9","Esplora offre SOS/Morse, rifugi, video e oggetti. I rifugi sono indicazioni di riferimento; in emergenza segui le istruzioni ufficiali.","Avanti","Indietro","Salta","Inizia","Guida dell\u2019app"]};var ug=(n,e,t=[])=>{let i=document.createElementNS("http://www.w3.org/2000/svg",n);return Object.keys(e).forEach(r=>{i.setAttribute(r,String(e[r]))}),t.length&&t.forEach(r=>{let a=ug(...r);i.appendChild(a)}),i},Br=([n,e,t])=>ug(n,e,t);var ob=n=>Array.from(n.attributes).reduce((e,t)=>(e[t.name]=t.value,e),{}),sb=n=>typeof n=="string"?n:!n||!n.class?"":n.class&&typeof n.class=="string"?n.class.split(" "):n.class&&Array.isArray(n.class)?n.class:"",lb=n=>n.flatMap(sb).map(t=>t.trim()).filter(Boolean).filter((t,i,r)=>r.indexOf(t)===i).join(" "),cb=n=>n.replace(/(\w)(\w*)(_|-|\s*)/g,(e,t,i)=>t.toUpperCase()+i.toLowerCase()),xf=(n,{nameAttr:e,icons:t,attrs:i})=>{let r=n.getAttribute(e);if(r==null)return;let a=cb(r),o=t[a];if(!o)return console.warn(`${n.outerHTML} icon name was not found in the provided icons object.`);let s=ob(n),[l,u,c]=o,d={...u,"data-lucide":r,...i,...s},f=lb(["lucide",`lucide-${r}`,s,i]);f&&Object.assign(d,{class:f});let h=Br([l,d,c]);return n.parentNode?.replaceChild(h,n)};var ze={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};var Lo=["svg",ze,[["path",{d:"m12 19-7-7 7-7"}],["path",{d:"M19 12H5"}]]];var vf=["svg",ze,[["path",{d:"M5 12h14"}],["path",{d:"m12 5 7 7-7 7"}]]];var Do=["svg",ze,[["path",{d:"M7 7h10v10"}],["path",{d:"M7 17 17 7"}]]];var yf=["svg",ze,[["path",{d:"M12 7v14"}],["path",{d:"M16 12h2"}],["path",{d:"M16 8h2"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"}],["path",{d:"M6 12h2"}],["path",{d:"M6 8h2"}]]];var _f=["svg",ze,[["path",{d:"m9 18 6-6-6-6"}]]];var Mf=["svg",ze,[["path",{d:"m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z"}],["circle",{cx:"12",cy:"12",r:"10"}]]];var Uo=["svg",ze,[["path",{d:"M21.54 15H17a2 2 0 0 0-2 2v4.54"}],["path",{d:"M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17"}],["path",{d:"M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05"}],["circle",{cx:"12",cy:"12",r:"10"}]]];var Sf=["svg",ze,[["path",{d:"M15 3h6v6"}],["path",{d:"M10 14 21 3"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}]]];var bf=["svg",ze,[["path",{d:"M18 6c0 2-2 2-2 4v10a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V10c0-2-2-2-2-4V2h12z"}],["line",{x1:"6",x2:"18",y1:"6",y2:"6"}],["line",{x1:"12",x2:"12",y1:"12",y2:"12"}]]];var ql=["svg",ze,[["path",{d:"M12 3v18"}],["path",{d:"M3 12h18"}],["rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}]]];var Ta=["svg",ze,[["path",{d:"M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"}],["path",{d:"M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"}],["path",{d:"M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"}],["path",{d:"M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"}]]];var No=["svg",ze,[["path",{d:"M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"}]]];var wf=["svg",ze,[["path",{d:"m5 8 6 6"}],["path",{d:"m4 14 6-6 2-3"}],["path",{d:"M2 5h12"}],["path",{d:"M7 2h1"}],["path",{d:"m22 22-5-10-5 10"}],["path",{d:"M14 18h6"}]]];var Af=["svg",ze,[["path",{d:"M3 12h.01"}],["path",{d:"M3 18h.01"}],["path",{d:"M3 6h.01"}],["path",{d:"M8 12h13"}],["path",{d:"M8 18h13"}],["path",{d:"M8 6h13"}]]];var Fo=["svg",ze,[["circle",{cx:"12",cy:"16",r:"1"}],["rect",{x:"3",y:"10",width:"18",height:"12",rx:"2"}],["path",{d:"M7 10V7a5 5 0 0 1 10 0v3"}]]];var Oo=["svg",ze,[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"}],["circle",{cx:"12",cy:"10",r:"3"}]]];var Ef=["svg",ze,[["path",{d:"M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0"}],["circle",{cx:"12",cy:"8",r:"2"}],["path",{d:"M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712"}]]];var Xl=["svg",ze,[["path",{d:"M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z"}],["path",{d:"M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"}]]];var Tf=["svg",ze,[["path",{d:"M5 12h14"}]]];var Yl=["svg",ze,[["path",{d:"M5 3v16h16"}],["path",{d:"m5 19 6-6"}],["path",{d:"m2 6 3-3 3 3"}],["path",{d:"m18 16 3 3-3 3"}]]];var Cf=["svg",ze,[["path",{d:"m18 8 4 4-4 4"}],["path",{d:"M2 12h20"}],["path",{d:"m6 8-4 4 4 4"}]]];var Rf=["svg",ze,[["path",{d:"M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4"}],["path",{d:"M2 6h4"}],["path",{d:"M2 10h4"}],["path",{d:"M2 14h4"}],["path",{d:"M2 18h4"}],["path",{d:"M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"}]]];var Pf=["svg",ze,[["path",{d:"M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z"}],["path",{d:"m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18"}],["path",{d:"m2.3 2.3 7.286 7.286"}],["circle",{cx:"11",cy:"11",r:"2"}]]];var Bo=["svg",ze,[["polygon",{points:"6 3 20 12 6 21 6 3"}]]];var If=["svg",ze,[["path",{d:"M5 12h14"}],["path",{d:"M12 5v14"}]]];var Lf=["svg",ze,[["path",{d:"M22 14a8 8 0 0 1-8 8"}],["path",{d:"M18 11v-1a2 2 0 0 0-2-2a2 2 0 0 0-2 2"}],["path",{d:"M14 10V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1"}],["path",{d:"M10 9.5V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v10"}],["path",{d:"M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"}]]];var Df=["svg",ze,[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"}],["path",{d:"m21.854 2.147-10.94 10.939"}]]];var Uf=["svg",ze,[["path",{d:"M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"}],["path",{d:"M3 6h18"}],["path",{d:"M16 10a4 4 0 0 1-8 0"}]]];var Ca=["svg",ze,[["circle",{cx:"12",cy:"8",r:"5"}],["path",{d:"M20 21a8 8 0 0 0-16 0"}]]];var ko=["svg",ze,[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]]];var Zl=({icons:n={},nameAttr:e="data-lucide",attrs:t={}}={})=>{if(!Object.values(n).length)throw new Error(`Please provide an icons object.
If you want to use all the icons you can import it like:
 \`import { createIcons, icons } from 'lucide';
lucide.createIcons({icons});\``);if(typeof document>"u")throw new Error("`createIcons()` only works in a browser environment.");let i=document.querySelectorAll(`[${e}]`);if(Array.from(i).forEach(r=>xf(r,{nameAttr:e,icons:n,attrs:t})),e==="data-lucide"){let r=document.querySelectorAll("[icon-name]");r.length>0&&(console.warn("[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide"),Array.from(r).forEach(a=>xf(a,{nameAttr:"icon-name",icons:n,attrs:t})))}};var dg=["svg",Uo[1],[["path",{d:"M8 21v-2c-1.3-1-2-2-2.7-3.3l-2.1-4.2c-.8-1.6.9-2.8 2-1.5l2.1 2.5V5.2c0-1.9 2.4-1.9 2.4 0v4.1-6c0-1.9 2.6-1.9 2.6 0v5.8-6.4c0-1.9 2.6-1.9 2.6 0v6.7-4.9c0-1.9 2.5-1.9 2.5 0v7.8l.6-2.8c.4-1.8 2.6-1.4 2.4.4l-.7 5.3c-.2 1.5-1 2.8-2.2 4.2V21z"}],["path",{d:"M8 18.8h9.5M10 20v1m2.5-1v1m2.5-1v1"}]]],fg=[[Uo,Lf],[Ef,Af],[Rf,Xl],[dg,Oo],[dg,Xl],[No,Bo],[Uf,Sf],[Mf,bf]];function zo(n,e){let t=Br(n);return t.setAttribute("class",e),t.setAttribute("aria-hidden","true"),t.setAttribute("focusable","false"),t}function ub(n,e){let[t,i]=fg[e],r=document.createElement("span");r.className="tour-action",r.append(zo(i,"tour-action-ink")),e===0&&r.append(zo(Cf,"tour-swipe")),n.replaceChildren(zo(t,"tour-subject"),zo(vf,"tour-connector"),r)}function hg(){let n=window.SKMLanguage,e="skm-onboarding-v1",t=fg.length,i=0,r=null,a=document.createElement("dialog");a.id="skm-onboarding",a.setAttribute("aria-labelledby","skm-tour-title"),a.innerHTML='<header><span>SKINOMAKASE</span><button type="button" data-skip></button></header><select data-language></select><main><div class="tour-scene" aria-hidden="true"></div><span data-count></span><h1 id="skm-tour-title" tabindex="-1"></h1><p data-copy></p></main><footer><button type="button" data-back></button><button type="button" data-next></button></footer>',document.body.append(a);let o=y=>a.querySelector(y),s=o("select");for(let y of n.languages){let _=document.createElement("option");_.value=y.code,_.textContent=y.name,s.append(_)}let l=document.querySelector("#skm-language-dialog");function u(y){let _=document.createElement("button");return _.type="button",_.id=y,_.setAttribute("aria-haspopup","dialog"),_.setAttribute("aria-controls",a.id),_.append(zo(yf,"tour-book")),_}let c=u("skm-tour-launch"),d=u("skm-tour-replay"),f=document.createElement("span");document.querySelector(".earth-header .earth-account")?.before(c),d.append(f),l?.append(d);function h(){let y=gf[n.code]||gf.en;s.value=n.code,s.setAttribute("aria-label",n.t("language")),a.dataset.step=i,ub(o(".tour-scene"),i),o("main").getAnimations().forEach(_=>_.cancel()),!matchMedia("(prefers-reduced-motion: reduce)").matches&&a.open&&o("main").animate([{opacity:0,transform:"translateY(4px)"},{opacity:1,transform:"translateY(0)"}],{duration:200}),o("[data-count]").textContent=String(i+1).padStart(2,"0")+" / "+String(t).padStart(2,"0"),o("h1").textContent=y[i*2],o("[data-copy]").textContent=y[i*2+1],o("[data-skip]").textContent=y[t*2+2],o("[data-back]").textContent=y[t*2+1],o("[data-back]").hidden=i===0,o("[data-next]").textContent=y[t*2+(i===t-1?3:0)],f.textContent=c.title=y[t*2+4],c.setAttribute("aria-label",f.textContent)}function m(){try{localStorage.setItem(e,"done")}catch{}a.close(),r?.focus()}function x(y){a.open||(r=y,i=0,h(),a.showModal(),o("h1").focus())}function g(y){i+=y,h(),o("h1").focus()}s.onchange=()=>n.set(s.value),o("[data-skip]").onclick=m,o("[data-next]").onclick=()=>i===t-1?m():g(1),o("[data-back]").onclick=()=>{i>0&&g(-1)},a.addEventListener("cancel",y=>{y.preventDefault(),m()}),c.onclick=()=>x(c),d.onclick=()=>{l.close(),x(document.querySelector(".earth-language"))},window.addEventListener("skm-language",h),h();let p=!1;try{p=localStorage.getItem(e)==="done"}catch{}!p&&!new URLSearchParams(location.search).has("gloves")&&window.addEventListener("skm-first-city",()=>{localStorage.getItem(e)||x(document.querySelector(".earth-world"))},{once:!0})}var db=["ko","en","ja","zh","zh-Hant","ru","fr","es","de","pt","it"],Nf=[["\uC138\uC158 \uC608\uC57D","Session booking","\u30BB\u30C3\u30B7\u30E7\u30F3\u4E88\u7D04","\u9884\u7EA6 SKINOMAKASE","\u9810\u7D04 SKINOMAKASE","\u0417\u0430\u043F\u0438\u0441\u044C \u043D\u0430 \u0441\u0435\u0430\u043D\u0441","R\xE9server une s\xE9ance","Reservar sesi\xF3n","Session buchen","Agendar sess\xE3o","Prenota una sessione"],["\uC7A5\uAC11 \uB4DC\uB86D","Glove drop","\u30B0\u30ED\u30FC\u30D6\u30C9\u30ED\u30C3\u30D7","\u624B\u5957\u53D1\u653E","\u624B\u5957\u767C\u653E","\u0420\u0430\u0437\u0434\u0430\u0447\u0430 \u043F\u0435\u0440\u0447\u0430\u0442\u043E\u043A","Drop de gants","Entrega de guantes","Handschuh-Drop","Drop de luvas","Drop di guanti"],["\uC74C\uC545","Music","\u97F3\u697D","\u97F3\u4E50","\u97F3\u6A02","\u041C\u0443\u0437\u044B\u043A\u0430","Musique","M\xFAsica","Musik","M\xFAsica","Musica"],["\uAE30\uD0C0 \uAE30\uB2A5","Explore","\u305D\u306E\u4ED6","\u63A2\u7D22","\u63A2\u7D22","\u041E\u0431\u0437\u043E\u0440","Explorer","Explorar","Entdecken","Explorar","Esplora"],["\uB3C4\uC2DC \uC120\uD0DD","Choose a city","\u90FD\u5E02\u3092\u9078\u629E","\u9009\u62E9\u57CE\u5E02","\u9078\u64C7\u57CE\u5E02","\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0433\u043E\u0440\u043E\u0434","Choisir une ville","Elegir ciudad","Stadt w\xE4hlen","Escolher cidade","Scegli citt\xE0"],["\uC9C0\uAD6C\uBCF8\uC73C\uB85C \uB3CC\uC544\uAC00\uAE30","Back to globe","\u5730\u7403\u5100\u306B\u623B\u308B","\u8FD4\u56DE\u5730\u7403","\u8FD4\u56DE\u5730\u7403","\u041D\u0430\u0437\u0430\u0434 \u043A \u0433\u043B\u043E\u0431\u0443\u0441\u0443","Retour au globe","Volver al globo","Zur\xFCck zum Globus","Voltar ao globo","Torna al globo"],["\uB4DC\uB86D \uAC00\uB2A5","Available","\u53D7\u53D6\u53EF\u80FD","\u53EF\u9886\u53D6","\u53EF\u9818\u53D6","\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u043E","Disponible","Disponible","Verf\xFCgbar","Dispon\xEDvel","Disponibile"],["\uC8FC\uC778 \uC788\uC74C","Owned","\u6240\u6709\u8005\u3042\u308A","\u5DF2\u6709\u4E3B\u4EBA","\u5DF2\u6709\u4E3B\u4EBA","\u0415\u0441\u0442\u044C \u0432\u043B\u0430\u0434\u0435\u043B\u0435\u0446","D\xE9j\xE0 attribu\xE9","Con propietario","Vergeben","Com propriet\xE1rio","Assegnato"],["\uC608\uC57D \uC911","Reserved","\u4E88\u7D04\u6E08\u307F","\u5DF2\u9884\u7559","\u5DF2\u9810\u7559","\u0417\u0430\u0440\u0435\u0437\u0435\u0440\u0432\u0438\u0440\u043E\u0432\u0430\u043D\u043E","R\xE9serv\xE9","Reservado","Reserviert","Reservado","Riservato"],["\uC900\uBE44 \uC911","Coming soon","\u6E96\u5099\u4E2D","\u7B79\u5907\u4E2D","\u7C4C\u5099\u4E2D","\u0421\u043A\u043E\u0440\u043E","Bient\xF4t","Pr\xF3ximamente","Demn\xE4chst","Em breve","Prossimamente"],["\uBBF8\uB9AC\uBCF4\uAE30","Preview","\u30D7\u30EC\u30D3\u30E5\u30FC","\u9884\u89C8","\u9810\u89BD","\u041F\u0440\u0435\u0434\u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440","Aper\xE7u","Vista previa","Vorschau","Pr\xE9via","Anteprima"],["\uD53D\uC5C5 \uC704\uCE58","Pickup location","\u53D7\u53D6\u5834\u6240","\u9886\u53D6\u5730\u70B9","\u9818\u53D6\u5730\u9EDE","\u041C\u0435\u0441\u0442\u043E \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F","Lieu de retrait","Lugar de recogida","Abholort","Local de retirada","Luogo di ritiro"],["\uC704\uCE58 \uB4F1\uB85D \uC804","Location not set","\u5834\u6240\u672A\u767B\u9332","\u5730\u70B9\u5F85\u8BBE\u7F6E","\u5730\u9EDE\u5F85\u8A2D\u5B9A","\u041C\u0435\u0441\u0442\u043E \u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D\u043E","Lieu non d\xE9fini","Ubicaci\xF3n pendiente","Ort noch offen","Local n\xE3o definido","Luogo non impostato"],["\uAE38\uCC3E\uAE30","Directions","\u7D4C\u8DEF\u6848\u5185","\u8DEF\u7EBF","\u8DEF\u7DDA","\u041C\u0430\u0440\u0448\u0440\u0443\u0442","Itin\xE9raire","C\xF3mo llegar","Route","Como chegar","Indicazioni"],["\uBCF4\uC720\uC790","Owner","\u6240\u6709\u8005","\u6301\u6709\u8005","\u6301\u6709\u8005","\u0412\u043B\u0430\u0434\u0435\u043B\u0435\u0446","Propri\xE9taire","Propietario","Besitzer","Propriet\xE1rio","Proprietario"],["\uC2E4\uC81C \uC804\uC1A1 \uC548 \uB428","Not sent \u2014 preview","\u30D7\u30EC\u30D3\u30E5\u30FC\u30FB\u9001\u4FE1\u3055\u308C\u307E\u305B\u3093","\u9884\u89C8\uFF0C\u4E0D\u4F1A\u53D1\u9001","\u9810\u89BD\uFF0C\u4E0D\u6703\u50B3\u9001","\u041F\u0440\u0435\u0434\u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 \u2014 \u043D\u0435 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043E","Aper\xE7u \u2014 non envoy\xE9","Vista previa, no se env\xEDa","Vorschau \u2014 nicht gesendet","Pr\xE9via \u2014 n\xE3o enviado","Anteprima \u2014 non inviato"],["\uC7A5\uAC11 \uBAA9\uB85D\uC73C\uB85C","Back to gloves","\u30B0\u30ED\u30FC\u30D6\u306B\u623B\u308B","\u8FD4\u56DE\u624B\u5957","\u8FD4\u56DE\u624B\u5957","\u041D\u0430\u0437\u0430\u0434 \u043A \u043F\u0435\u0440\u0447\u0430\u0442\u043A\u0430\u043C","Retour aux gants","Volver a los guantes","Zur\xFCck zu Handschuhen","Voltar \xE0s luvas","Torna ai guanti"],["\uC7AC\uC0DD","Play","\u518D\u751F","\u64AD\u653E","\u64AD\u653E","\u0412\u043E\u0441\u043F\u0440\u043E\u0438\u0437\u0432\u0435\u0441\u0442\u0438","Lecture","Reproducir","Abspielen","Reproduzir","Riproduci"],["\uC77C\uC2DC\uC815\uC9C0","Pause","\u4E00\u6642\u505C\u6B62","\u6682\u505C","\u66AB\u505C","\u041F\u0430\u0443\u0437\u0430","Pause","Pausar","Pause","Pausar","Pausa"],["\uD50C\uB808\uC774\uC5B4 \uB2EB\uAE30","Close player","\u30D7\u30EC\u30FC\u30E4\u30FC\u3092\u9589\u3058\u308B","\u5173\u95ED\u64AD\u653E\u5668","\u95DC\u9589\u64AD\u653E\u5668","\u0417\u0430\u043A\u0440\u044B\u0442\u044C \u043F\u043B\u0435\u0435\u0440","Fermer le lecteur","Cerrar reproductor","Player schlie\xDFen","Fechar player","Chiudi lettore"],["\uC7A5\uAC11 \uB4DC\uB86D\uC740 \uD604\uC7AC \uBBF8\uB9AC\uBCF4\uAE30\uC785\uB2C8\uB2E4.","Glove drops are currently a preview.","\u30B0\u30ED\u30FC\u30D6\u30C9\u30ED\u30C3\u30D7\u306F\u73FE\u5728\u30D7\u30EC\u30D3\u30E5\u30FC\u3067\u3059\u3002","\u624B\u5957\u53D1\u653E\u76EE\u524D\u4E3A\u9884\u89C8\u3002","\u624B\u5957\u767C\u653E\u76EE\u524D\u70BA\u9810\u89BD\u3002","\u0420\u0430\u0437\u0434\u0430\u0447\u0430 \u043F\u0435\u0440\u0447\u0430\u0442\u043E\u043A \u043F\u043E\u043A\u0430 \u0432 \u0440\u0435\u0436\u0438\u043C\u0435 \u043F\u0440\u0435\u0434\u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0430.","Le drop de gants est en aper\xE7u.","La entrega de guantes est\xE1 en vista previa.","Handschuh-Drops sind derzeit eine Vorschau.","O drop de luvas est\xE1 em pr\xE9via.","Il drop di guanti \xE8 in anteprima."],["\uC11C\uC6B8","Seoul","\u30BD\u30A6\u30EB","\u9996\u5C14","\u9996\u723E","\u0421\u0435\u0443\u043B","Seoul","Seoul","Seoul","Seoul","Seoul"],["\uB3C4\uCFC4","Tokyo","\u6771\u4EAC","\u4E1C\u4EAC","\u6771\u4EAC","\u0422\u043E\u043A\u0438\u043E","Tokyo","Tokyo","Tokyo","Tokyo","Tokyo"],["\uC624\uC0AC\uCE74","Osaka","\u5927\u962A","\u5927\u962A","\u5927\u962A","\u041E\u0441\u0430\u043A\u0430","Osaka","Osaka","Osaka","Osaka","Osaka"],["\uB7F0\uB358","London","\u30ED\u30F3\u30C9\u30F3","\u4F26\u6566","\u502B\u6566","\u041B\u043E\u043D\u0434\u043E\u043D","London","London","London","London","London"],["\uD30C\uB9AC","Paris","\u30D1\u30EA","\u5DF4\u9ECE","\u5DF4\u9ECE","\u041F\u0430\u0440\u0438\u0436","Paris","Paris","Paris","Paris","Paris"],["\uD1A0\uB860\uD1A0","Toronto","\u30C8\u30ED\u30F3\u30C8","\u591A\u4F26\u591A","\u591A\u502B\u591A","\u0422\u043E\u0440\u043E\u043D\u0442\u043E","Toronto","Toronto","Toronto","Toronto","Toronto"],["\uBC34\uCFE0\uBC84","Vancouver","\u30D0\u30F3\u30AF\u30FC\u30D0\u30FC","\u6E29\u54E5\u534E","\u6EAB\u54E5\u83EF","\u0412\u0430\u043D\u043A\u0443\u0432\u0435\u0440","Vancouver","Vancouver","Vancouver","Vancouver","Vancouver"],["\uBAAC\uD2B8\uB9AC\uC62C","Montreal","\u30E2\u30F3\u30C8\u30EA\u30AA\u30FC\u30EB","\u8499\u7279\u5229\u5C14","\u8499\u7279\u5229\u723E","\u041C\u043E\u043D\u0440\u0435\u0430\u043B\u044C","Montreal","Montreal","Montreal","Montreal","Montreal"],["\uB85C\uC2A4\uC564\uC824\uB808\uC2A4","Los Angeles","\u30ED\u30B5\u30F3\u30BC\u30EB\u30B9","\u6D1B\u6749\u77F6","\u6D1B\u6749\u78EF","\u041B\u043E\u0441-\u0410\u043D\u0434\u0436\u0435\u043B\u0435\u0441","Los Angeles","Los Angeles","Los Angeles","Los Angeles","Los Angeles"],["\uB274\uC695","New York","\u30CB\u30E5\u30FC\u30E8\u30FC\u30AF","\u7EBD\u7EA6","\u7D10\u7D04","\u041D\u044C\u044E-\u0419\u043E\u0440\u043A","New York","New York","New York","New York","New York"],["\uD64D\uCF69","Hong Kong","\u9999\u6E2F","\u9999\u6E2F","\u9999\u6E2F","\u0413\u043E\u043D\u043A\u043E\u043D\u0433","Hong Kong","Hong Kong","Hong Kong","Hong Kong","Hong Kong"],["\uC704\uCE58 \uACF5\uAC1C \uB300\uAE30","Location pending","\u5834\u6240\u306E\u516C\u958B\u5F85\u3061","\u7B49\u5F85\u516C\u5E03\u5730\u70B9","\u7B49\u5F85\u516C\u5E03\u5730\u9EDE","\u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0430\u0434\u0440\u0435\u0441\u0430","Lieu en attente","Ubicaci\xF3n pendiente","Ort ausstehend","Local pendente","Luogo in attesa"],["\uC800\uC7A5\uD558\uC9C0 \uBABB\uD588\uC5B4\uC694. \uB2E4\uC2DC \uC2DC\uB3C4\uD574\uC8FC\uC138\uC694.","Could not save. Please try again.","\u4FDD\u5B58\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F\u3002\u518D\u8A66\u884C\u3057\u3066\u304F\u3060\u3055\u3044\u3002","\u4FDD\u5B58\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5\u3002","\u5132\u5B58\u5931\u6557\uFF0C\u8ACB\u91CD\u8A66\u3002","\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C. \u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u043F\u043E\u043F\u044B\u0442\u043A\u0443.","Enregistrement impossible. R\xE9essayez.","No se pudo guardar. Int\xE9ntalo de nuevo.","Speichern fehlgeschlagen. Bitte erneut versuchen.","N\xE3o foi poss\xEDvel salvar. Tente novamente.","Salvataggio non riuscito. Riprova."],["\uC74C\uC6D0\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC5B4\uC694. \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694.","Audio could not load. Tap to retry.","\u97F3\u58F0\u3092\u8AAD\u307F\u8FBC\u3081\u307E\u305B\u3093\u3002\u3082\u3046\u4E00\u5EA6\u62BC\u3057\u3066\u304F\u3060\u3055\u3044\u3002","\u97F3\u9891\u52A0\u8F7D\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5\u3002","\u97F3\u8A0A\u8F09\u5165\u5931\u6557\uFF0C\u8ACB\u91CD\u8A66\u3002","\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0430\u0443\u0434\u0438\u043E. \u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u0435\u0449\u0451 \u0440\u0430\u0437.","Impossible de charger le son. R\xE9essayez.","No se pudo cargar el audio. Vuelve a pulsar.","Audio konnte nicht geladen werden. Erneut tippen.","N\xE3o foi poss\xEDvel carregar o \xE1udio. Toque novamente.","Impossibile caricare l\u2019audio. Tocca di nuovo."],["\uB3C4\uC2DC \uC9C0\uB3C4","City map","\u90FD\u5E02\u5730\u56F3","\u57CE\u5E02\u5730\u56FE","\u57CE\u5E02\u5730\u5716","\u041A\u0430\u0440\u0442\u0430 \u0433\u043E\u0440\u043E\u0434\u0430","Carte de la ville","Mapa de la ciudad","Stadtplan","Mapa da cidade","Mappa della citt\xE0"],["\uC218\uB839 \uAE08\uC561","Your pickup price","\u53D7\u53D6\u91D1\u984D","\u81EA\u9009\u9886\u53D6\u91D1\u989D","\u81EA\u9078\u9818\u53D6\u91D1\u984D","\u0412\u0430\u0448\u0430 \u0446\u0435\u043D\u0430","Montant au choix","Tu importe","Dein Betrag","Seu valor","Il tuo importo"],["\uD53D\uC5C5 \uBBF8\uB9AC\uBCF4\uAE30","Preview pickup","\u53D7\u53D6\u30D7\u30EC\u30D3\u30E5\u30FC","\u9884\u89C8\u9886\u53D6","\u9810\u89BD\u9818\u53D6","\u041F\u0440\u0435\u0434\u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F","Aper\xE7u du retrait","Vista previa de recogida","Abholung ansehen","Pr\xE9via da retirada","Anteprima ritiro"],["\uACB0\uC81C \uC218\uB2E8 \uC900\uBE44 \uC911","Payment setup pending","\u6C7A\u6E08\u65B9\u6CD5\u306F\u6E96\u5099\u4E2D","\u652F\u4ED8\u65B9\u5F0F\u7B79\u5907\u4E2D","\u4ED8\u6B3E\u65B9\u5F0F\u7C4C\u5099\u4E2D","\u041E\u043F\u043B\u0430\u0442\u0430 \u043F\u043E\u043A\u0430 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0430","Paiement en pr\xE9paration","Pago en preparaci\xF3n","Zahlung in Vorbereitung","Pagamento em prepara\xE7\xE3o","Pagamento in preparazione"],["\uACBD\uB9E4 \uCCB4\uD5D8","Try an auction","\u30AA\u30FC\u30AF\u30B7\u30E7\u30F3\u4F53\u9A13","\u4F53\u9A8C\u7ADE\u62CD","\u9AD4\u9A57\u7AF6\u62CD","\u0414\u0435\u043C\u043E \u0430\u0443\u043A\u0446\u0438\u043E\u043D\u0430","Essayer les ench\xE8res","Probar subasta","Auktion ausprobieren","Testar leil\xE3o","Prova l\u2019asta"],["\uAD6C\uB9E4 \uBB38\uC758","Ask to buy","\u8CFC\u5165\u306E\u554F\u3044\u5408\u308F\u305B","\u8054\u7CFB\u8D2D\u4E70","\u806F\u7D61\u8CFC\u8CB7","\u0421\u043F\u0440\u043E\u0441\u0438\u0442\u044C \u043E \u043F\u043E\u043A\u0443\u043F\u043A\u0435","Contacter pour acheter","Consultar compra","Kaufanfrage","Consultar compra","Chiedi di acquistare"],["\uC5F0\uB77D \uD504\uB85C\uD544","Contact profile","\u9023\u7D61\u30D7\u30ED\u30D5\u30A3\u30FC\u30EB","\u8054\u7CFB\u8D44\u6599","\u806F\u7D61\u8CC7\u6599","\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u043D\u044B\u0439 \u043F\u0440\u043E\u0444\u0438\u043B\u044C","Profil de contact","Perfil de contacto","Kontaktprofil","Perfil de contato","Profilo di contatto"],["\uBCA0\uB274 \uC77C\uC815","City events","\u4F1A\u5834\u306E\u4E88\u5B9A","\u57CE\u5E02\u6D3B\u52A8","\u57CE\u5E02\u6D3B\u52D5","\u0421\u043E\u0431\u044B\u0442\u0438\u044F \u0433\u043E\u0440\u043E\u0434\u0430","\xC9v\xE9nements","Eventos","Veranstaltungen","Eventos","Eventi"],["US$10 \uC774\uC0C1, \uC6D0\uD558\uB294 \uB9CC\uD07C","US$10 minimum. You choose.","US$10\u4EE5\u4E0A\u3001\u304A\u597D\u304D\u306A\u91D1\u984D","\u6700\u4F4E US$10\uFF0C\u91D1\u989D\u81EA\u5B9A","\u6700\u4F4E US$10\uFF0C\u91D1\u984D\u81EA\u8A02","\u041E\u0442 US$10, \u0441\u0443\u043C\u043C\u0443 \u0432\u044B\u0431\u0438\u0440\u0430\u0435\u0442\u0435 \u0432\u044B","\xC0 partir de US$10, \xE0 votre choix","Desde US$10, t\xFA eliges","Ab US$10, du entscheidest","A partir de US$10, voc\xEA escolhe","Da US$10, scegli tu"],["US$10 \uC774\uC0C1, \uC6D0\uD558\uB294 \uB9CC\uD07C","US$10 minimum. You choose.","US$10\u4EE5\u4E0A\u3001\u304A\u597D\u304D\u306A\u91D1\u984D","\u6700\u4F4E US$10\uFF0C\u91D1\u989D\u81EA\u5B9A","\u6700\u4F4E US$10\uFF0C\u91D1\u984D\u81EA\u8A02","\u041E\u0442 US$10, \u0441\u0443\u043C\u043C\u0443 \u0432\u044B\u0431\u0438\u0440\u0430\u0435\u0442\u0435 \u0432\u044B","\xC0 partir de US$10, \xE0 votre choix","Desde US$10, t\xFA eliges","Ab US$10, du entscheidest","A partir de US$10, voc\xEA escolhe","Da US$10, scegli tu"]];Nf.push(["3D\uB85C \uBCF4\uAE30","View in 3D","3D\u3067\u898B\u308B","\u67E5\u770B3D","\u67E5\u770B3D","\u0421\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0432 3D","Voir en 3D","Ver en 3D","In 3D ansehen","Ver em 3D","Vedi in 3D"]);Nf.push(["\uC2F1\uAC00\uD3EC\uB974","Singapore","\u30B7\u30F3\u30AC\u30DD\u30FC\u30EB","\u65B0\u52A0\u5761","\u65B0\u52A0\u5761","\u0421\u0438\u043D\u0433\u0430\u043F\u0443\u0440","Singapour","Singapur","Singapur","Singapura","Singapore"]);var fb={"SESSION BOOKING":"\uC138\uC158 \uC608\uC57D","GLOVE DROP":"\uC7A5\uAC11 \uB4DC\uB86D","CITY SOUND":"\uC74C\uC545",EXPLORE:"\uAE30\uD0C0 \uAE30\uB2A5",PLAY:"\uC7AC\uC0DD",PAUSE:"\uC77C\uC2DC\uC815\uC9C0","\uC804\uCCB4 \uC9C0\uAD6C\uBCF8\uC73C\uB85C \uB3CC\uC544\uAC00\uAE30":"\uC9C0\uAD6C\uBCF8\uC73C\uB85C \uB3CC\uC544\uAC00\uAE30","\uBA54\uC2DC\uC9C0\uB97C \uBCF4\uB0B4\uBCF4\uC138\uC694":"\uBA54\uC2DC\uC9C0\uB97C \uC785\uB825\uD574 \uC8FC\uC138\uC694.","\uAE30\uD0C0 \uAE30\uB2A5 \uB2EB\uAE30":"\uB2EB\uAE30"};function pg(n){let e=new WeakMap;function t(){i.disconnect();let r=window.SKMLanguage,a=r?.code||"en",o=Math.max(0,db.indexOf(a)),s=new Map;for(let x of Nf)s.set(x[0],x[o]);for(let[x,g]of Object.entries(window.SKM_UI_TRANSLATIONS?.ko||{}))s.set(g,r.t(x));let l={\uB300\uD55C\uBBFC\uAD6D:"KR",\uC77C\uBCF8:"JP",\uC601\uAD6D:"GB",\uD504\uB791\uC2A4:"FR",\uCE90\uB098\uB2E4:"CA",\uBBF8\uAD6D:"US",\uD64D\uCF69:"HK",\uC2F1\uAC00\uD3EC\uB974:"SG"},u=new Intl.DisplayNames([r?.locale||"en"],{type:"region"});for(let[x,g]of Object.entries(l))s.set(x,u.of(g));function c(x){let g=x.trim(),p=fb[g]||g;return s.has(p)?x.replace(g,s.get(p)):x}function d(x){let g=c(x);if(g!==x||a==="ko")return g;let p=x;for(let[y,_]of[...s].sort((v,I)=>I[0].length-v[0].length))/[가-힣]/.test(y)&&(p=p.split(y).join(_));return p.replace(/ 보기$/,"").replace(/ · 내 대화$/,"")}function f(x,g,p,y){let _=e.get(x);_||(_={},e.set(x,_));let v=_[g],I=v&&p===v.last?v.original:p,E=g==="text"?c(I):d(I);_[g]={original:I,last:E},p!==E&&y(E)}let h=document.createTreeWalker(n,NodeFilter.SHOW_TEXT),m;for(;m=h.nextNode();){if(m.parentElement.closest("script,style,textarea,.private-note,.glove-chat-message,.earth-track-info h3"))continue;let x=m;f(x,"text",x.nodeValue,g=>x.nodeValue=g)}for(let x of n.querySelectorAll("[aria-label],[placeholder],optgroup[label]"))for(let g of["aria-label","placeholder","label"])x.hasAttribute(g)&&f(x,g,x.getAttribute(g),p=>x.setAttribute(g,p));i.observe(n,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:["aria-label","placeholder","label"]})}let i=new MutationObserver(t);window.addEventListener("skm-language",t),t(),window.addEventListener("pagehide",()=>i.disconnect()),window.addEventListener("pageshow",t)}function mg(n){let e=[...n.querySelectorAll(".earth-drop-panel,.earth-extra-menu")],t=[...document.querySelectorAll(".bm-overlay,.video-player-overlay,.modal-overlay")],i=[...document.querySelectorAll("#appFrame,#bmFrame,#vcFrame")],r=new MutationObserver(c=>{for(let{target:d}of c)d.dataset.paperLoading="true"});for(let c of i)r.observe(c,{attributes:!0,attributeFilter:["src"]}),c.addEventListener("load",()=>{delete c.dataset.paperLoading});let a=document.createElement("div");a.className="earth-white-wash",a.setAttribute("aria-hidden","true"),n.querySelector(".earth-app").append(a);let o=document.createElement("h2");o.className="feature-heading",n.querySelector(".earth-header").append(o);function s(){let c=e.some(g=>!g.hidden);n.classList.toggle("feature-open",c);let d=n.querySelector(".glove-direct-grid"),f=n.querySelector(".earth-extra-menu"),h=n.querySelector(".earth-music-panel");n.classList.toggle("gloves-open",!d.hidden);let x=(d.hidden?f.hidden?h.hidden?null:h.querySelector("h2"):f.querySelector(".earth-extra-heading span"):d.querySelector("h2"))?.textContent||"";o.textContent!==x&&(o.textContent=x),c&&(n.scrollTop=0),n.inert=document.body.classList.contains("bm-open")||t.some(g=>g.classList.contains("active"));for(let g of n.querySelectorAll(".earth-stage,.earth-city-panel,.earth-world,.earth-footer"))g.inert=c}let l=new MutationObserver(s);function u(){for(let c of e)l.observe(c,{attributes:!0,attributeFilter:["hidden"]});for(let c of n.querySelectorAll(".glove-edition-label,.earth-extra-heading span,.earth-music-panel h2"))l.observe(c,{childList:!0,subtree:!0,characterData:!0});for(let c of[document.body,...t])l.observe(c,{attributes:!0,attributeFilter:["class"]})}u(),s(),window.addEventListener("pagehide",()=>{l.disconnect(),r.disconnect()}),window.addEventListener("pageshow",()=>{u();for(let c of i)r.observe(c,{attributes:!0,attributeFilter:["src"]});s()})}var Tg=Gr(xg());var vg="data:image/svg+xml,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48"><g clip-path="url(#a)"><path fill="#002991" d="M38.914 13.35c0 5.574-5.144 12.15-12.927 12.15H18.49l-.368 2.322L16.373 39H7.056l5.605-36h15.095c5.083 0 9.082 2.833 10.555 6.77a9.687 9.687 0 0 1 .603 3.58z"/><path fill="#60CDFF" d="M44.284 23.7A12.894 12.894 0 0 1 31.53 34.5h-5.206L24.157 48H14.89l1.483-9 1.75-11.178.367-2.322h7.497c7.773 0 12.927-6.576 12.927-12.15 3.825 1.974 6.055 5.963 5.37 10.35z"/><path fill="#008CFF" d="M38.914 13.35C37.31 12.511 35.365 12 33.248 12h-12.64L18.49 25.5h7.497c7.773 0 12.927-6.576 12.927-12.15z"/></g><defs><clipPath id="a"><path fill="#fff" d="M7.056 3h37.35v45H7.056z"/></clipPath></defs></svg>'),yg="data:image/svg+xml,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 135 48"><g clip-path="url(#a)"><path fill="#000" d="M133 2.02v32.83h-7.47V2.02H133zM122.78 13.1v21.81h-6.64v-1.88c-.84.82-1.8 1.44-2.86 1.88-1.07.46-2.23.7-3.47.7-1.56 0-3.01-.29-4.34-.87-1.33-.61-2.49-1.44-3.47-2.48-.99-1.05-1.77-2.27-2.35-3.66-.55-1.42-.82-2.95-.82-4.58s.27-3.14.82-4.53c.58-1.42 1.36-2.66 2.35-3.71a10.45 10.45 0 0 1 3.47-2.44c1.33-.61 2.78-.92 4.34-.92 1.24 0 2.4.23 3.47.7 1.07.44 2.03 1.06 2.86 1.88v-1.88h6.64v-.02zm-11.77 15.87c1.36 0 2.47-.46 3.34-1.4.9-.93 1.35-2.12 1.35-3.57 0-1.45-.45-2.65-1.35-3.57-.87-.93-1.99-1.4-3.34-1.4-1.35 0-2.49.46-3.39 1.4-.87.93-1.31 2.12-1.31 3.57 0 1.45.44 2.65 1.31 3.57.9.93 2.03 1.4 3.39 1.4zM88.17 2.02c1.97 0 3.65.28 5.04.83 1.39.55 2.56 1.32 3.52 2.31.98 1.02 1.75 2.18 2.3 3.49.55 1.31.82 2.72.82 4.23 0 1.51-.27 2.92-.82 4.23a11.15 11.15 0 0 1-2.3 3.49c-.95.99-2.13 1.76-3.52 2.31-1.39.55-3.07.83-5.04.83h-3.6V34.9h-7.6V2.02h11.2zm-1.09 14.96c1.02 0 1.79-.1 2.35-.31.58-.23 1.06-.53 1.43-.87.78-.73 1.17-1.7 1.17-2.92s-.39-2.19-1.17-2.92c-.38-.35-.85-.63-1.43-.83-.55-.23-1.33-.35-2.35-.35h-2.52v8.2h2.52zM48.97 13.1h8.25l5.6 10.46h.09L67.9 13.1h7.64L59.17 45.98h-7.6l7.47-15.04L48.97 13.1zm-1.47 0v21.81h-6.64v-1.88c-.84.82-1.8 1.44-2.86 1.88-1.07.46-2.23.7-3.47.7-1.56 0-3.01-.29-4.34-.87-1.33-.61-2.49-1.44-3.47-2.48-.99-1.05-1.77-2.27-2.35-3.66-.55-1.42-.82-2.95-.82-4.58s.27-3.14.82-4.53c.58-1.42 1.36-2.66 2.35-3.71a10.35 10.35 0 0 1 3.47-2.44c1.33-.61 2.78-.92 4.34-.92 1.24 0 2.4.23 3.47.7 1.07.44 2.03 1.06 2.86 1.88v-1.88h6.64v-.02zM35.73 28.97c1.36 0 2.47-.46 3.35-1.4.9-.93 1.35-2.12 1.35-3.57 0-1.45-.45-2.65-1.35-3.57-.87-.93-1.99-1.4-3.35-1.4s-2.49.46-3.39 1.4c-.87.93-1.3 2.12-1.3 3.57 0 1.45.44 2.65 1.3 3.57.9.93 2.03 1.4 3.39 1.4zM13.2 2.02c1.97 0 3.65.28 5.04.83 1.39.55 2.56 1.32 3.52 2.31.98 1.02 1.75 2.18 2.3 3.49.55 1.31.82 2.72.82 4.23 0 1.51-.27 2.92-.82 4.23a11.15 11.15 0 0 1-2.3 3.49c-.95.99-2.13 1.76-3.52 2.31-1.39.55-3.07.83-5.04.83H9.6V34.9H2V2.02h11.2zm-1.08 14.96c1.02 0 1.79-.1 2.35-.31.58-.23 1.06-.53 1.43-.87.78-.73 1.17-1.7 1.17-2.92s-.39-2.19-1.17-2.92c-.38-.35-.85-.63-1.43-.83-.55-.23-1.33-.35-2.35-.35H9.6v8.2h2.52z"/></g><defs><clipPath id="a"><path fill="#fff" d="M2 2.02h131v43.96H2z"/></clipPath></defs></svg>');(()=>{let n=["title","intro","refresh","back","none","loading","error","login","request","pending","shared","collected","declined","open","reserved","closed","draft","empty","mine","close","wait","private","collect","confirm","map","imageError","unavailable","limit","saved","preview","choose"],e={ko:["\uC7A5\uAC11 \uB4DC\uB86D","\uB3C4\uC2DC\uB97C \uC120\uD0DD\uD558\uACE0, \uB098\uB9CC\uC758 \uC7A5\uAC11\uC744 \uCC3E\uC544\uBCF4\uC138\uC694.","\uC0C8\uB85C\uACE0\uCE68","\uB3C4\uC2DC \uBAA9\uB85D","\uC544\uC9C1 \uACF5\uAC1C\uB41C \uB4DC\uB86D\uC774 \uC5C6\uC5B4\uC694.","\uBD88\uB7EC\uC624\uB294 \uC911\u2026","\uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC5B4\uC694. \uC7A0\uC2DC \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694.","Google\uB85C \uB85C\uADF8\uC778","\uC704\uCE58 \uC694\uCCAD\uD558\uAE30","\uC694\uCCAD \uC811\uC218","\uC704\uCE58 \uB3C4\uCC29","\uC218\uB839 \uC644\uB8CC","\uC694\uCCAD \uB9C8\uAC10","\uC694\uCCAD \uAC00\uB2A5","\uC608\uC57D\uB428","\uB9C8\uAC10","\uC900\uBE44 \uC911","\uBBF8\uB4F1\uB85D","\uB0B4 \uC694\uCCAD","\uB2EB\uAE30","\uC694\uCCAD\uC774 \uC811\uC218\uB410\uC5B4\uC694. \uC704\uCE58 \uC548\uB0B4\uAC00 \uB3C4\uCC29\uD558\uBA74 \uC5EC\uAE30\uC5D0\uC11C \uD655\uC778\uD560 \uC218 \uC788\uC5B4\uC694.","\uC774 \uC704\uCE58\uB294 \uC120\uD0DD\uB41C \uACE0\uAC1D\uC5D0\uAC8C\uB9CC \uD45C\uC2DC\uB3FC\uC694.","\uC7A5\uAC11\uC744 \uCC3E\uC558\uC5B4\uC694","\uC2E4\uC81C\uB85C \uC7A5\uAC11\uC744 \uCC3E\uC558\uB098\uC694? \uC218\uB839 \uC644\uB8CC\uB85C \uAE30\uB85D\uD560\uAC8C\uC694.","\uD604\uC7AC \uC704\uCE58\uC5D0\uC11C \uAE38\uCC3E\uAE30","\uC0AC\uC9C4\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC5B4\uC694. \uC0C8\uB85C\uACE0\uCE68\uD574 \uC8FC\uC138\uC694.","\uC774 \uC7A5\uAC11\uC740 \uD604\uC7AC \uC694\uCCAD\uD560 \uC218 \uC5C6\uC5B4\uC694.","\uC694\uCCAD\uC774 \uB9CE\uC544\uC694. \uC7A0\uC2DC \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694.","\uC800\uC7A5\uD588\uC5B4\uC694.","\uC2DC\uC548 \xB7 \uC2E4\uC81C \uD53D\uC5C5 \uBD88\uAC00","\uBC88\uD638\uB97C \uC120\uD0DD\uD574 \uC8FC\uC138\uC694."],en:["Glove drop","Choose a city. Find your glove.","Refresh","Cities","No drops are available yet.","Loading\u2026","Could not load. Please try again.","Sign in with Google","Request location","Request received","Location received","Collected","Request closed","Available","Reserved","Closed","Preparing","Not listed","My requests","Close","Request received. Check here for your location reply.","This location is visible only to the selected recipient.","I found my glove","Have you collected the glove? Confirm pickup.","Directions from my location","Could not load the photo. Please refresh.","This glove is not available.","Too many requests. Please try again later.","Saved.","Preview \xB7 no pickup","Choose a number."],ja:["\u30B0\u30ED\u30FC\u30D6\u30C9\u30ED\u30C3\u30D7","\u90FD\u5E02\u3092\u9078\u3093\u3067\u3001\u81EA\u5206\u306E\u30B0\u30ED\u30FC\u30D6\u3092\u63A2\u305D\u3046\u3002","\u66F4\u65B0","\u90FD\u5E02\u4E00\u89A7","\u516C\u958B\u4E2D\u306E\u30C9\u30ED\u30C3\u30D7\u306F\u3042\u308A\u307E\u305B\u3093\u3002","\u8AAD\u307F\u8FBC\u307F\u4E2D\u2026","\u8AAD\u307F\u8FBC\u3081\u307E\u305B\u3093\u3067\u3057\u305F\u3002\u518D\u5EA6\u304A\u8A66\u3057\u304F\u3060\u3055\u3044\u3002","Google\u3067\u30ED\u30B0\u30A4\u30F3","\u5834\u6240\u3092\u30EA\u30AF\u30A8\u30B9\u30C8","\u30EA\u30AF\u30A8\u30B9\u30C8\u53D7\u4ED8\u6E08\u307F","\u5834\u6240\u304C\u5C4A\u304D\u307E\u3057\u305F","\u53D7\u53D6\u6E08\u307F","\u53D7\u4ED8\u7D42\u4E86","\u53D7\u4ED8\u4E2D","\u4E88\u7D04\u6E08\u307F","\u7D42\u4E86","\u6E96\u5099\u4E2D","\u672A\u767B\u9332","\u81EA\u5206\u306E\u30EA\u30AF\u30A8\u30B9\u30C8","\u9589\u3058\u308B","\u53D7\u3051\u4ED8\u3051\u307E\u3057\u305F\u3002\u5834\u6240\u306E\u6848\u5185\u306F\u3053\u3053\u3067\u78BA\u8A8D\u3067\u304D\u307E\u3059\u3002","\u5834\u6240\u306F\u9078\u3070\u308C\u305F\u53D7\u53D6\u4EBA\u3060\u3051\u306B\u8868\u793A\u3055\u308C\u307E\u3059\u3002","\u30B0\u30ED\u30FC\u30D6\u3092\u898B\u3064\u3051\u305F","\u5B9F\u969B\u306B\u53D7\u3051\u53D6\u308A\u307E\u3057\u305F\u304B\uFF1F\u53D7\u53D6\u5B8C\u4E86\u3068\u3057\u3066\u8A18\u9332\u3057\u307E\u3059\u3002","\u73FE\u5728\u5730\u304B\u3089\u306E\u7D4C\u8DEF","\u5199\u771F\u3092\u8AAD\u307F\u8FBC\u3081\u307E\u305B\u3093\u3002\u66F4\u65B0\u3057\u3066\u304F\u3060\u3055\u3044\u3002","\u3053\u306E\u30B0\u30ED\u30FC\u30D6\u306F\u53D7\u4ED8\u3067\u304D\u307E\u305B\u3093\u3002","\u30EA\u30AF\u30A8\u30B9\u30C8\u304C\u591A\u3059\u304E\u307E\u3059\u3002\u5F8C\u3067\u304A\u8A66\u3057\u304F\u3060\u3055\u3044\u3002","\u4FDD\u5B58\u3057\u307E\u3057\u305F\u3002","\u30D7\u30EC\u30D3\u30E5\u30FC\u30FB\u53D7\u53D6\u4E0D\u53EF","\u756A\u53F7\u3092\u9078\u3093\u3067\u304F\u3060\u3055\u3044\u3002"],zh:["\u624B\u5957\u6389\u843D","\u9009\u62E9\u57CE\u5E02\uFF0C\u5BFB\u627E\u5C5E\u4E8E\u4F60\u7684\u624B\u5957\u3002","\u5237\u65B0","\u57CE\u5E02\u5217\u8868","\u6682\u65E0\u516C\u5F00\u6389\u843D\u3002","\u52A0\u8F7D\u4E2D\u2026","\u52A0\u8F7D\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5\u3002","\u4F7F\u7528 Google \u767B\u5F55","\u7533\u8BF7\u4F4D\u7F6E","\u7533\u8BF7\u5DF2\u6536\u5230","\u4F4D\u7F6E\u5DF2\u9001\u8FBE","\u5DF2\u9886\u53D6","\u7533\u8BF7\u5DF2\u7ED3\u675F","\u53EF\u7533\u8BF7","\u5DF2\u9884\u7559","\u5DF2\u7ED3\u675F","\u51C6\u5907\u4E2D","\u672A\u4E0A\u67B6","\u6211\u7684\u7533\u8BF7","\u5173\u95ED","\u7533\u8BF7\u5DF2\u6536\u5230\u3002\u4F4D\u7F6E\u56DE\u590D\u4F1A\u663E\u793A\u5728\u8FD9\u91CC\u3002","\u6B64\u4F4D\u7F6E\u4EC5\u5411\u9009\u4E2D\u7684\u9886\u53D6\u8005\u663E\u793A\u3002","\u6211\u627E\u5230\u624B\u5957\u4E86","\u4F60\u5DF2\u7ECF\u9886\u53D6\u624B\u5957\u4E86\u5417\uFF1F\u786E\u8BA4\u540E\u5C06\u8BB0\u5F55\u4E3A\u5DF2\u9886\u53D6\u3002","\u4ECE\u5F53\u524D\u4F4D\u7F6E\u5BFC\u822A","\u7167\u7247\u52A0\u8F7D\u5931\u8D25\uFF0C\u8BF7\u5237\u65B0\u3002","\u6682\u65F6\u65E0\u6CD5\u7533\u8BF7\u8FD9\u53EA\u624B\u5957\u3002","\u7533\u8BF7\u8FC7\u591A\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002","\u5DF2\u4FDD\u5B58\u3002","\u9884\u89C8 \xB7 \u4E0D\u53EF\u9886\u53D6","\u8BF7\u9009\u62E9\u7F16\u53F7\u3002"],"zh-Hant":["\u624B\u5957\u6389\u843D","\u9078\u64C7\u57CE\u5E02\uFF0C\u5C0B\u627E\u5C6C\u65BC\u4F60\u7684\u624B\u5957\u3002","\u91CD\u65B0\u6574\u7406","\u57CE\u5E02\u5217\u8868","\u66AB\u7121\u516C\u958B\u6389\u843D\u3002","\u8F09\u5165\u4E2D\u2026","\u8F09\u5165\u5931\u6557\uFF0C\u8ACB\u91CD\u8A66\u3002","\u4F7F\u7528 Google \u767B\u5165","\u7533\u8ACB\u4F4D\u7F6E","\u7533\u8ACB\u5DF2\u6536\u5230","\u4F4D\u7F6E\u5DF2\u9001\u9054","\u5DF2\u9818\u53D6","\u7533\u8ACB\u5DF2\u7D50\u675F","\u53EF\u7533\u8ACB","\u5DF2\u9810\u7559","\u5DF2\u7D50\u675F","\u6E96\u5099\u4E2D","\u672A\u4E0A\u67B6","\u6211\u7684\u7533\u8ACB","\u95DC\u9589","\u7533\u8ACB\u5DF2\u6536\u5230\u3002\u4F4D\u7F6E\u56DE\u8986\u6703\u986F\u793A\u5728\u9019\u88E1\u3002","\u6B64\u4F4D\u7F6E\u50C5\u5411\u9078\u4E2D\u7684\u9818\u53D6\u8005\u986F\u793A\u3002","\u6211\u627E\u5230\u624B\u5957\u4E86","\u4F60\u5DF2\u7D93\u9818\u53D6\u624B\u5957\u4E86\u55CE\uFF1F\u78BA\u8A8D\u5F8C\u5C07\u8A18\u9304\u70BA\u5DF2\u9818\u53D6\u3002","\u5F9E\u76EE\u524D\u4F4D\u7F6E\u5C0E\u822A","\u7167\u7247\u8F09\u5165\u5931\u6557\uFF0C\u8ACB\u91CD\u65B0\u6574\u7406\u3002","\u66AB\u6642\u7121\u6CD5\u7533\u8ACB\u9019\u96BB\u624B\u5957\u3002","\u7533\u8ACB\u904E\u591A\uFF0C\u8ACB\u7A0D\u5F8C\u91CD\u8A66\u3002","\u5DF2\u5132\u5B58\u3002","\u9810\u89BD \xB7 \u4E0D\u53EF\u9818\u53D6","\u8ACB\u9078\u64C7\u7DE8\u865F\u3002"],ru:["\u0413\u0434\u0435 \u043F\u0435\u0440\u0447\u0430\u0442\u043A\u0430","\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0433\u043E\u0440\u043E\u0434. \u041D\u0430\u0439\u0434\u0438\u0442\u0435 \u0441\u0432\u043E\u044E \u043F\u0435\u0440\u0447\u0430\u0442\u043A\u0443.","\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C","\u0413\u043E\u0440\u043E\u0434\u0430","\u041F\u043E\u043A\u0430 \u043D\u0435\u0442 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0445 \u043F\u0435\u0440\u0447\u0430\u0442\u043E\u043A.","\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430\u2026","\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0451 \u0440\u0430\u0437.","\u0412\u043E\u0439\u0442\u0438 \u0447\u0435\u0440\u0435\u0437 Google","\u0417\u0430\u043F\u0440\u043E\u0441\u0438\u0442\u044C \u043C\u0435\u0441\u0442\u043E","\u0417\u0430\u043F\u0440\u043E\u0441 \u043F\u043E\u043B\u0443\u0447\u0435\u043D","\u041C\u0435\u0441\u0442\u043E \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u043E","\u041F\u043E\u043B\u0443\u0447\u0435\u043D\u043E","\u0417\u0430\u043F\u0440\u043E\u0441 \u0437\u0430\u043A\u0440\u044B\u0442","\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u043E","\u0417\u0430\u0440\u0435\u0437\u0435\u0440\u0432\u0438\u0440\u043E\u0432\u0430\u043D\u043E","\u0417\u0430\u043A\u0440\u044B\u0442\u043E","\u041F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u043A\u0430","\u041D\u0435 \u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u043E","\u041C\u043E\u0438 \u0437\u0430\u043F\u0440\u043E\u0441\u044B","\u0417\u0430\u043A\u0440\u044B\u0442\u044C","\u0417\u0430\u043F\u0440\u043E\u0441 \u043F\u043E\u043B\u0443\u0447\u0435\u043D. \u041E\u0442\u0432\u0435\u0442 \u0441 \u043C\u0435\u0441\u0442\u043E\u043C \u043F\u043E\u044F\u0432\u0438\u0442\u0441\u044F \u0437\u0434\u0435\u0441\u044C.","\u041C\u0435\u0441\u0442\u043E \u0432\u0438\u0434\u043D\u043E \u0442\u043E\u043B\u044C\u043A\u043E \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u043E\u043C\u0443 \u043F\u043E\u043B\u0443\u0447\u0430\u0442\u0435\u043B\u044E.","\u041F\u0435\u0440\u0447\u0430\u0442\u043A\u0430 \u043D\u0430\u0439\u0434\u0435\u043D\u0430","\u0412\u044B \u0437\u0430\u0431\u0440\u0430\u043B\u0438 \u043F\u0435\u0440\u0447\u0430\u0442\u043A\u0443? \u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0435.","\u041C\u0430\u0440\u0448\u0440\u0443\u0442 \u043E\u0442 \u043C\u0435\u043D\u044F","\u0424\u043E\u0442\u043E \u043D\u0435 \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u043B\u043E\u0441\u044C. \u041E\u0431\u043D\u043E\u0432\u0438\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443.","\u042D\u0442\u0430 \u043F\u0435\u0440\u0447\u0430\u0442\u043A\u0430 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0430.","\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u043C\u043D\u043E\u0433\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u043E\u0432. \u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u043F\u043E\u0437\u0436\u0435.","\u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043E.","\u041C\u0430\u043A\u0435\u0442 \xB7 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0435 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u043E","\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043D\u043E\u043C\u0435\u0440."],fr:["Glove drop","Choisissez une ville. Trouvez votre gant.","Actualiser","Villes","Aucun drop disponible pour le moment.","Chargement\u2026","Chargement impossible. R\xE9essayez.","Connexion avec Google","Demander le lieu","Demande re\xE7ue","Lieu re\xE7u","R\xE9cup\xE9r\xE9","Demande close","Disponible","R\xE9serv\xE9","Termin\xE9","En pr\xE9paration","Non propos\xE9","Mes demandes","Fermer","Demande re\xE7ue. La r\xE9ponse indiquant le lieu appara\xEEtra ici.","Ce lieu est visible uniquement par le destinataire choisi.","J\u2019ai trouv\xE9 mon gant","Avez-vous r\xE9cup\xE9r\xE9 le gant ? Confirmez la r\xE9cup\xE9ration.","Itin\xE9raire depuis ma position","Photo indisponible. Actualisez.","Ce gant n\u2019est pas disponible.","Trop de demandes. R\xE9essayez plus tard.","Enregistr\xE9.","Aper\xE7u \xB7 aucun retrait","Choisissez un num\xE9ro."],es:["Glove drop","Elige una ciudad. Encuentra tu guante.","Actualizar","Ciudades","A\xFAn no hay entregas disponibles.","Cargando\u2026","No se pudo cargar. Int\xE9ntalo de nuevo.","Entrar con Google","Solicitar ubicaci\xF3n","Solicitud recibida","Ubicaci\xF3n recibida","Recogido","Solicitud cerrada","Disponible","Reservado","Finalizado","En preparaci\xF3n","Sin publicar","Mis solicitudes","Cerrar","Solicitud recibida. La respuesta con la ubicaci\xF3n aparecer\xE1 aqu\xED.","Solo la persona elegida puede ver esta ubicaci\xF3n.","Encontr\xE9 mi guante","\xBFHas recogido el guante? Confirma la recogida.","Ruta desde mi ubicaci\xF3n","No se pudo cargar la foto. Actualiza.","Este guante no est\xE1 disponible.","Demasiadas solicitudes. Int\xE9ntalo m\xE1s tarde.","Guardado.","Vista previa \xB7 sin recogida","Elige un n\xFAmero."],de:["Glove drop","W\xE4hle eine Stadt. Finde deinen Handschuh.","Aktualisieren","St\xE4dte","Noch keine Drops verf\xFCgbar.","Wird geladen\u2026","Laden fehlgeschlagen. Bitte erneut versuchen.","Mit Google anmelden","Standort anfragen","Anfrage erhalten","Standort erhalten","Abgeholt","Anfrage geschlossen","Verf\xFCgbar","Reserviert","Beendet","In Vorbereitung","Nicht gelistet","Meine Anfragen","Schlie\xDFen","Anfrage erhalten. Die Antwort mit dem Standort erscheint hier.","Dieser Standort ist nur f\xFCr die ausgew\xE4hlte Person sichtbar.","Handschuh gefunden","Hast du den Handschuh abgeholt? Abholung best\xE4tigen.","Route ab meinem Standort","Foto nicht geladen. Bitte aktualisieren.","Dieser Handschuh ist nicht verf\xFCgbar.","Zu viele Anfragen. Bitte sp\xE4ter erneut versuchen.","Gespeichert.","Vorschau \xB7 keine Abholung","W\xE4hle eine Nummer."],pt:["Glove drop","Escolha uma cidade. Encontre sua luva.","Atualizar","Cidades","Ainda n\xE3o h\xE1 drops dispon\xEDveis.","Carregando\u2026","N\xE3o foi poss\xEDvel carregar. Tente novamente.","Entrar com Google","Solicitar localiza\xE7\xE3o","Solicita\xE7\xE3o recebida","Localiza\xE7\xE3o recebida","Retirado","Solicita\xE7\xE3o encerrada","Dispon\xEDvel","Reservado","Encerrado","Em prepara\xE7\xE3o","N\xE3o listado","Minhas solicita\xE7\xF5es","Fechar","Solicita\xE7\xE3o recebida. A resposta com a localiza\xE7\xE3o aparecer\xE1 aqui.","Esta localiza\xE7\xE3o s\xF3 aparece para a pessoa escolhida.","Encontrei minha luva","Voc\xEA retirou a luva? Confirme a retirada.","Rota da minha localiza\xE7\xE3o","N\xE3o foi poss\xEDvel carregar a foto. Atualize.","Esta luva n\xE3o est\xE1 dispon\xEDvel.","Muitas solicita\xE7\xF5es. Tente mais tarde.","Salvo.","Pr\xE9via \xB7 sem retirada","Escolha um n\xFAmero."],it:["Glove drop","Scegli una citt\xE0. Trova il tuo guanto.","Aggiorna","Citt\xE0","Nessun drop ancora disponibile.","Caricamento\u2026","Impossibile caricare. Riprova.","Accedi con Google","Richiedi posizione","Richiesta ricevuta","Posizione ricevuta","Ritirato","Richiesta chiusa","Disponibile","Riservato","Terminato","In preparazione","Non pubblicato","Le mie richieste","Chiudi","Richiesta ricevuta. La risposta con la posizione apparir\xE0 qui.","La posizione \xE8 visibile solo alla persona scelta.","Ho trovato il guanto","Hai ritirato il guanto? Conferma il ritiro.","Indicazioni dalla mia posizione","Impossibile caricare la foto. Aggiorna.","Questo guanto non \xE8 disponibile.","Troppe richieste. Riprova pi\xF9 tardi.","Salvato.","Anteprima \xB7 ritiro non disponibile","Scegli un numero."]};window.SKMGloveText=t=>{let i=n.indexOf(t);return e[window.SKMLanguage?.code]?.[i]||e.en[i]||t}})();var $l=Gr(Kl()),lr=Gr(Sg());var Sb=["ko","en","ja","zh","zh-Hant","ru","fr","es","de","pt","it"],bb={decrease:["1\uB2EC\uB7EC \uC904\uC774\uAE30","Decrease by 1 US dollar","1\u7C73\u30C9\u30EB\u6E1B\u3089\u3059","\u51CF\u5C111\u7F8E\u5143","\u6E1B\u5C111\u7F8E\u5143","\u0423\u043C\u0435\u043D\u044C\u0448\u0438\u0442\u044C \u043D\u0430 1 \u0434\u043E\u043B\u043B\u0430\u0440","R\xE9duire de 1 dollar US","Reducir 1 d\xF3lar estadounidense","Um 1 US-Dollar verringern","Diminuir 1 d\xF3lar americano","Riduci di 1 dollaro USA"],increase:["1\uB2EC\uB7EC \uB298\uB9AC\uAE30","Increase by 1 US dollar","1\u7C73\u30C9\u30EB\u5897\u3084\u3059","\u589E\u52A01\u7F8E\u5143","\u589E\u52A01\u7F8E\u5143","\u0423\u0432\u0435\u043B\u0438\u0447\u0438\u0442\u044C \u043D\u0430 1 \u0434\u043E\u043B\u043B\u0430\u0440","Ajouter 1 dollar US","A\xF1adir 1 d\xF3lar estadounidense","Um 1 US-Dollar erh\xF6hen","Adicionar 1 d\xF3lar americano","Aumenta di 1 dollaro USA"],close:["\uB2EB\uAE30","Close","\u9589\u3058\u308B","\u5173\u95ED","\u95DC\u9589","\u0417\u0430\u043A\u0440\u044B\u0442\u044C","Fermer","Cerrar","Schlie\xDFen","Fechar","Chiudi"],pickupSoon:["\uC2A4\uD29C\uB514\uC624\xB7\uD53D\uC5C5 \uC77C\uC815\uC740 \uCD94\uD6C4 \uC548\uB0B4","Studio and pickup times to be announced","\u30B9\u30BF\u30B8\u30AA\u30FB\u53D7\u53D6\u65E5\u6642\u306F\u5F8C\u65E5\u6848\u5185","\u5DE5\u4F5C\u5BA4\u53CA\u81EA\u53D6\u65F6\u95F4\u7A0D\u540E\u516C\u5E03","\u5DE5\u4F5C\u5BA4\u53CA\u81EA\u53D6\u6642\u9593\u7A0D\u5F8C\u516C\u5E03","\u0421\u0442\u0443\u0434\u0438\u044F \u0438 \u0432\u0440\u0435\u043C\u044F \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0431\u0443\u0434\u0443\u0442 \u043E\u0431\u044A\u044F\u0432\u043B\u0435\u043D\u044B","Studio et horaires de retrait \xE0 venir","Estudio y horario de recogida por anunciar","Studio und Abholzeiten folgen","Est\xFAdio e hor\xE1rios ser\xE3o anunciados","Studio e orari di ritiro da annunciare"],price:["\uC6D0\uD558\uB294 \uAE08\uC561","Your price","\u5E0C\u671B\u91D1\u984D","\u81EA\u9009\u91D1\u989D","\u81EA\u9078\u91D1\u984D","\u0412\u0430\u0448\u0430 \u0446\u0435\u043D\u0430","Votre montant","Tu precio","Dein Betrag","Seu valor","Il tuo prezzo"],minimum:["US$10 \uC774\uC0C1, \uC6D0\uD558\uB294 \uB9CC\uD07C","US$10 minimum. You choose.","US$10\u4EE5\u4E0A\u3001\u304A\u597D\u304D\u306A\u91D1\u984D","\u6700\u4F4E US$10\uFF0C\u91D1\u989D\u81EA\u5B9A","\u6700\u4F4E US$10\uFF0C\u91D1\u984D\u81EA\u8A02","\u041E\u0442 US$10, \u0441\u0443\u043C\u043C\u0443 \u0432\u044B\u0431\u0438\u0440\u0430\u0435\u0442\u0435 \u0432\u044B","\xC0 partir de US$10, \xE0 votre choix","Desde US$10, t\xFA eliges","Ab US$10, du entscheidest","A partir de US$10, voc\xEA escolhe","Da US$10, scegli tu"],pickup:["\uD604\uC7A5 \uD53D\uC5C5 \uC804\uC6A9 \xB7 \uBC30\uC1A1 \uC5C6\uC74C","Pickup at the drop only \xB7 no shipping","\u73FE\u5730\u53D7\u53D6\u306E\u307F\u30FB\u914D\u9001\u306A\u3057","\u4EC5\u9650\u5230\u6389\u843D\u5730\u70B9\u81EA\u53D6 \xB7 \u4E0D\u914D\u9001","\u50C5\u9650\u5230\u6389\u843D\u5730\u9EDE\u81EA\u53D6 \xB7 \u4E0D\u914D\u9001","\u0422\u043E\u043B\u044C\u043A\u043E \u0441\u0430\u043C\u043E\u0432\u044B\u0432\u043E\u0437 \xB7 \u0431\u0435\u0437 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438","Retrait sur place uniquement \xB7 sans livraison","Solo recogida en el lugar \xB7 sin env\xEDos","Nur Abholung am Drop \xB7 kein Versand","Retirada no local \xB7 sem envio","Solo ritiro sul posto \xB7 nessuna spedizione"],buy:["PayPal\uB85C \uAD6C\uB9E4","Buy with PayPal","PayPal\u3067\u8CFC\u5165","\u4F7F\u7528 PayPal \u8D2D\u4E70","\u4F7F\u7528 PayPal \u8CFC\u8CB7","\u041A\u0443\u043F\u0438\u0442\u044C \u0447\u0435\u0440\u0435\u0437 PayPal","Acheter avec PayPal","Comprar con PayPal","Mit PayPal kaufen","Comprar com PayPal","Acquista con PayPal"],held:["\uB4DC\uB86D \uC900\uBE44 \uC911","Drop coming soon","\u30C9\u30ED\u30C3\u30D7\u6E96\u5099\u4E2D","\u6389\u843D\u7B79\u5907\u4E2D","\u6389\u843D\u7C4C\u5099\u4E2D","\u0421\u043A\u043E\u0440\u043E \u0432 \u0434\u043E\u0441\u0442\u0443\u043F\u0435","Drop \xE0 venir","Pr\xF3ximamente","Drop in Vorbereitung","Em breve","Drop in arrivo"],login:["\uB85C\uADF8\uC778\uD558\uACE0 \uAD6C\uB9E4","Sign in to buy","\u30ED\u30B0\u30A4\u30F3\u3057\u3066\u8CFC\u5165","\u767B\u5F55\u8D2D\u4E70","\u767B\u5165\u8CFC\u8CB7","\u0412\u043E\u0439\u0442\u0438 \u0434\u043B\u044F \u043F\u043E\u043A\u0443\u043F\u043A\u0438","Se connecter pour acheter","Entrar para comprar","Zum Kauf anmelden","Entrar para comprar","Accedi per acquistare"],request:["\uD53D\uC5C5 \uC2E0\uCCAD","Request pickup","\u53D7\u53D6\u3092\u7533\u3057\u8FBC\u3080","\u7533\u8BF7\u81EA\u53D6","\u7533\u8ACB\u81EA\u53D6","\u0417\u0430\u043F\u0440\u043E\u0441\u0438\u0442\u044C \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0435","Demander le retrait","Solicitar recogida","Abholung anfragen","Solicitar retirada","Richiedi il ritiro"],pending:["\uD53D\uC5C5 \uD655\uC778 \uC911","Pickup request pending","\u53D7\u53D6\u78BA\u8A8D\u5F85\u3061","\u7B49\u5F85\u786E\u8BA4\u81EA\u53D6","\u7B49\u5F85\u78BA\u8A8D\u81EA\u53D6","\u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F","Retrait en attente","Recogida pendiente","Abholung ausstehend","Retirada pendente","Ritiro in attesa"],invalid:["US$10 \uC774\uC0C1, \uC18C\uC218\uC810 \uB450 \uC790\uB9AC\uAE4C\uC9C0 \uC785\uB825\uD574 \uC8FC\uC138\uC694.","Enter at least US$10, with up to two decimal places.","US$10\u4EE5\u4E0A\u3001\u5C0F\u6570\u70B9\u4EE5\u4E0B2\u6841\u307E\u3067\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002","\u8BF7\u8F93\u5165\u81F3\u5C11 US$10\uFF0C\u6700\u591A\u4E24\u4F4D\u5C0F\u6570\u3002","\u8ACB\u8F38\u5165\u81F3\u5C11 US$10\uFF0C\u6700\u591A\u5169\u4F4D\u5C0F\u6578\u3002","\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043E\u0442 US$10, \u043D\u0435 \u0431\u043E\u043B\u0435\u0435 \u0434\u0432\u0443\u0445 \u0437\u043D\u0430\u043A\u043E\u0432 \u043F\u043E\u0441\u043B\u0435 \u0437\u0430\u043F\u044F\u0442\u043E\u0439.","Saisissez au moins US$10, avec deux d\xE9cimales maximum.","Introduce al menos US$10, con hasta dos decimales.","Mindestens US$10, mit h\xF6chstens zwei Nachkommastellen.","Insira pelo menos US$10, com at\xE9 duas casas decimais.","Inserisci almeno US$10, con massimo due decimali."],verify:["\uC785\uAE08\uC740 \uC2A4\uD29C\uB514\uC624\uC5D0\uC11C \uD655\uC778\uD574\uC694.","The studio confirms payment.","\u5165\u91D1\u306F\u30B9\u30BF\u30B8\u30AA\u304C\u78BA\u8A8D\u3057\u307E\u3059\u3002","\u4ED8\u6B3E\u7531\u5DE5\u4F5C\u5BA4\u786E\u8BA4\u3002","\u4ED8\u6B3E\u7531\u5DE5\u4F5C\u5BA4\u78BA\u8A8D\u3002","\u0421\u0442\u0443\u0434\u0438\u044F \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0430\u0435\u0442 \u043E\u043F\u043B\u0430\u0442\u0443.","Le studio confirme le paiement.","El estudio confirma el pago.","Das Studio best\xE4tigt die Zahlung.","O est\xFAdio confirma o pagamento.","Lo studio conferma il pagamento."],memo:["PayPal \uBA54\uBAA8","PayPal note","PayPal\u306E\u30E1\u30E2","PayPal \u5907\u6CE8","PayPal \u5099\u8A3B","\u041F\u0440\u0438\u043C\u0435\u0447\u0430\u043D\u0438\u0435 PayPal","Note PayPal","Nota de PayPal","PayPal-Notiz","Nota do PayPal","Nota PayPal"],check:["\uD655\uC778 \uC911\u2026","Checking\u2026","\u78BA\u8A8D\u4E2D\u2026","\u6B63\u5728\u786E\u8BA4\u2026","\u6B63\u5728\u78BA\u8A8D\u2026","\u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430\u2026","V\xE9rification\u2026","Comprobando\u2026","Wird gepr\xFCft\u2026","Verificando\u2026","Verifica\u2026"],owner:["\uBCF4\uC720\uC790\uC5D0\uAC8C \uBB38\uC758","Contact owner","\u6240\u6709\u8005\u306B\u554F\u3044\u5408\u308F\u305B","\u8054\u7CFB\u6301\u6709\u8005","\u806F\u7D61\u6301\u6709\u8005","\u0421\u0432\u044F\u0437\u0430\u0442\u044C\u0441\u044F \u0441 \u0432\u043B\u0430\u0434\u0435\u043B\u044C\u0446\u0435\u043C","Contacter le propri\xE9taire","Contactar al propietario","Eigent\xFCmer kontaktieren","Contatar propriet\xE1rio","Contatta il proprietario"]},Xt=n=>bb[n]?.[Math.max(0,Sb.indexOf(window.SKMLanguage?.code||"en"))]||n;var qn=n=>window.SKMGloveText(n);function _t(n,e,t){let i=document.createElement(n);return e!=null&&(i.textContent=e),t&&(i.className=t),i}function wb(n,e){let t=_t("a",n,"glove-map-link");return t.href=e,t.target="_blank",t.rel="noopener noreferrer",t}function Bf(n,{city:e,number:t,itemName:i="",live:r=!1,preview:a=!1,onState:o,navigate:s,locationHost:l=null,pickupPlan:u=null}){let c=window.SKMBooking,d=()=>c?.session()?.user?.id||null,f=!!l,h=0,m=!1,x="10",g=!1,p=(L,b)=>!m&&L===h&&d()===b&&n.isConnected,y=_t("div",null,"glove-purchase");n.replaceChildren(y);function _(L,b){if(!l)return;l.replaceChildren();let S=[u?.address||e.label,u?.area].filter(Boolean).join(" \xB7 "),T=L==="pay"&&b.request.reply||S;l.append(_t("p",T,"glove-pickup-address"))}function v(L,b,S,T){_(L,b);let B=_t("form",null,"glove-purchase-form");B.noValidate=!0;let F=_t("div",null,"glove-price-label");f||F.append(_t("span",Xt("price")));let G=_t("span",null,"glove-price-field"),U=_t("button","\u2212","glove-price-step"),N=_t("button","+","glove-price-step");U.type=N.type="button",U.setAttribute("aria-label",Xt("decrease")),N.setAttribute("aria-label",Xt("increase"));let te=_t("span",null,"glove-price-value");te.append(_t("span","USD"));let D=_t("input");D.type="text",D.inputMode="decimal",D.autocomplete="off",D.value=x,D.required=!0,D.maxLength=18,D.setAttribute("aria-label",Xt("price")),te.append(D),G.append(U,te,N),F.append(G);let k=_t("p",Xt("minimum"),f?"glove-sr-only":"glove-pickup-note");k.id="glove-price-help",D.setAttribute("aria-describedby",k.id);let J=_t("p",Xt("pickup"),"glove-pickup-only"),$=_t("button",null,"glove-buy-button");$.type="submit";let re=_t("span");if($.append(re),!f){let ue=_t("span","\u2197");ue.setAttribute("aria-hidden","true"),$.append(ue)}let le=_t("p",null,"glove-purchase-status");le.setAttribute("role","status"),le.setAttribute("aria-live","polite");let q=["pay","login","request"].includes(L),W={pay:"buy",held:"held",login:"login",request:"request",pending:"pending"},j=W[L]?Xt(W[L]):qn(L==="preview"?"preview":"unavailable"),ae=ue=>{if(!f){re.textContent=ue;return}$.classList.add("glove-paypal-button"),re.className="glove-paypal-brand",re.replaceChildren();for(let[Ce,Te]of[[vg,"glove-paypal-mark"],[yg,"glove-paypal-wordmark"]]){let Pe=_t("img",null,Te);Pe.src=Ce,Pe.alt="",Pe.draggable=!1,re.append(Pe)}};ae(j),f&&($.title=j,$.setAttribute("aria-label","PayPal \xB7 "+j)),$.disabled=!q,D.disabled=g;let fe=()=>{let ue=lr.default.usdAmount(D.value);U.disabled=g||ue==="10.00",N.disabled=g},me=ue=>{if(g||!p(S,T))return;let Ce=lr.default.stepUsdAmount(D.value,ue);x=Ce.endsWith(".00")?Ce.slice(0,-3):Ce,D.value=x,D.removeAttribute("aria-invalid"),le.textContent="",fe(),window.SKMApp?.haptic?.("light")};if(U.onclick=()=>me(-1),N.onclick=()=>me(1),fe(),D.onblur=()=>{lr.default.usdAmount(D.value)||(D.setAttribute("aria-invalid","true"),le.textContent=Xt("invalid"))},D.oninput=()=>{x=D.value,D.removeAttribute("aria-invalid"),le.textContent="",fe()},B.append(F,k),l||B.append(J),L==="pay"&&!l){let ue=_t("p",b.request.reply||qn("shared"),"glove-pickup-address private-note");B.append(ue,wb(qn("map"),$l.default.pickupLink(b.request,!0)))}if(B.append($,le),y.append(B),L==="pay"&&!f){y.append(_t("p",Xt("memo")+": "+i,"glove-pickup-note"),_t("p",Xt("verify"),"glove-pickup-note"));let ue=_t("button",qn("collect"),"glove-map-link glove-confirm-pickup");ue.type="button",ue.onclick=async()=>{if(!(g||!p(S,T)||!window.confirm(qn("confirm")))){g=!0,ue.disabled=!0;try{await c.gloveCollect(b.request.id),p(S,T)&&await I()}catch{p(S,T)&&(ue.disabled=!1,le.textContent=qn("error"))}finally{g=!1}}},y.append(ue)}B.onsubmit=async ue=>{if(ue.preventDefault(),g||!q||!p(S,T))return;let Ce=lr.default.paypalURL(D.value);if(!Ce){D.setAttribute("aria-invalid","true"),le.textContent=Xt("invalid"),D.focus();return}if(L==="login"){s("app/login.html?next=account");return}g=!0,$.disabled=!0,$.setAttribute("aria-busy","true"),f||(re.textContent=Xt("check")),D.disabled=!0,fe();try{let Te=await c.dropLive();if(!p(S,T))return;let Pe=$l.default.pickupForPair(await c.gloveList(),e,t);if(!p(S,T))return;if(lr.default.checkoutState({live:Te===!0,preview:a,userId:T,info:Pe})!==L||Pe?.drop.id!==b?.drop.id||Pe?.request?.id!==b?.request?.id){await I();return}if(L==="request"){await c.gloveRequest(b.drop.id),p(S,T)&&await I();return}f||(le.textContent=Xt("verify"));let Oe=document.createElement("a");Oe.href=Ce,Oe.rel="noreferrer",Oe.hidden=!0,y.append(Oe),Oe.click(),Oe.remove()}catch{p(S,T)&&(le.textContent=qn("error"))}finally{g=!1,p(S,T)&&($.disabled=!1,$.removeAttribute("aria-busy"),D.disabled=!1,ae(Xt(W[L])),fe())}}}async function I(){let L=++h,b=d();y.replaceChildren(),_("held",null);let S=null,T=r;if(a||!T||!b){v(lr.default.checkoutState({live:T,preview:a,userId:b,info:S}),S,L,b);return}y.append(_t("p",qn("loading"),"glove-pickup-note"));try{if(T=await c.dropLive(),!p(L,b))return;T&&(S=$l.default.pickupForPair(await c.gloveList(),e,t))}catch{if(p(L,b)){let F=_t("button",qn("refresh"),"glove-map-link");F.type="button",F.onclick=I,y.replaceChildren(_t("p",qn("error"),"glove-pickup-note"),F)}return}if(!p(L,b))return;y.replaceChildren(),S&&o?.(S.drop.status,S.request?.status);let B=lr.default.checkoutState({live:T===!0,preview:a,userId:b,info:S});if(B==="owner"){try{let F=await c.community("owner",{kind:"glove",id:S.drop.id});if(!p(L,b))return;y.append(_t("strong",F.name||qn("mine"))),F.email&&y.append(_t("p",F.email,"glove-pickup-note"));let G=_t("button",Xt("owner"),"glove-buy-button");G.type="button",G.onclick=()=>{p(L,b)&&s(F.mine?"app/community.html?view=profile":"app/community.html?view=thread&kind=glove&subject="+encodeURIComponent(S.drop.id))},y.append(G)}catch{p(L,b)&&y.append(_t("p",qn("collected"),"glove-pickup-note"))}return}v(B,S,L,b)}function E(){document.hidden?(h++,y.replaceChildren(),l?.replaceChildren()):I()}function P(L){(!L.key||L.key==="skm-customer-session-v1")&&I()}return document.addEventListener("visibilitychange",E),window.addEventListener("storage",P),window.addEventListener("skm-account-changed",I),window.addEventListener("skm-language",I),I(),()=>{m=!0,h++,n.replaceChildren(),l?.replaceChildren(),document.removeEventListener("visibilitychange",E),window.removeEventListener("storage",P),window.removeEventListener("skm-account-changed",I),window.removeEventListener("skm-language",I)}}var Cg=Gr(wg());var Ho={1835848:{code:"STG-01",pairs:50,phase:1,window:"2026.11 \xB7 \uCCAB \uB4DC\uB86D \uC608\uC815",photo:"app/earth-assets/gloves/stg-01.jpg",print:"app/earth-assets/gloves/stg-01-print.svg"},1850147:{code:"STG-02",pairs:50,phase:3,window:"\uD64D\uCF69 \uB2E4\uC74C \xB7 \uC77C\uBCF8 \uB4DC\uB86D \uC608\uC815",photo:null},1853909:{code:null,pairs:50,phase:3,window:"\uD64D\uCF69 \uB2E4\uC74C \xB7 \uC77C\uBCF8 \uB4DC\uB86D \uC608\uC815",photo:null},1819729:{code:"STG-04",pairs:50,phase:2,window:"\uC11C\uC6B8 \uB2E4\uC74C \xB7 \uD64D\uCF69 \uB4DC\uB86D \uC608\uC815",photo:null},6167865:{code:null,pairs:50,phase:4,window:"\uC77C\uBCF8 \uB2E4\uC74C \xB7 \uD1A0\uB860\uD1A0 \uB4DC\uB86D \uC608\uC815",photo:null},6173331:{code:"STG-06",pairs:50,phase:null,window:"\uB4DC\uB86D \uC77C\uC815 \uC900\uBE44 \uC911",photo:null},6077243:{code:"STG-07",pairs:50,phase:null,window:"\uB4DC\uB86D \uC77C\uC815 \uC900\uBE44 \uC911",photo:null},5128581:{code:"STG-05",pairs:50,phase:null,window:"\uB4DC\uB86D \uC77C\uC815 \uC900\uBE44 \uC911",photo:"app/earth-assets/gloves/stg-05.jpg",print:"app/earth-assets/gloves/stg-05-print.svg",model:"models/skm-product.glb",publicPickup:{address:"17-17 Troutman Street",area:"Ridgewood, New York",confirmed:!1}},5368361:{code:"STG-09",pairs:50,phase:null,window:"\uB4DC\uB86D \uC77C\uC815 \uC900\uBE44 \uC911",photo:null}};var jl=Gr(Kl());var Ag=()=>Zl({icons:{Hand:Ta,MapPin:Oo,ArrowUpRight:Do,ArrowLeft:Lo,Send:Df,X:ko,UserRound:Ca,LockKeyhole:Fo}}),rt=(n,e,t)=>{let i=document.createElement(n);return e!=null&&(i.textContent=e),t&&(i.className=t),i},Jl=n=>{let e=rt("i");return e.dataset.lucide=n,e.setAttribute("aria-hidden","true"),e};function Vo(n,e,t=""){let i=rt("button",n,t);return i.type="button",i.onclick=e,i}function Ql(n="",e){let t=rt("span",null,"glove-pair-art "+n);for(let i=0;i<2;i++){let r=Br(Ta);if(r.setAttribute("aria-hidden","true"),e){let a=document.createElementNS("http://www.w3.org/2000/svg","image");a.setAttribute("href",e),a.setAttribute("x","7.4"),a.setAttribute("y","9.5"),a.setAttribute("width","13.2"),a.setAttribute("height","12.2"),r.append(a)}t.append(r)}return t}function kf(n){if(!n?.photo)return Ql("glove-large-art");let e=rt("img",null,"glove-detail-photo");return e.alt=n.code,e.onerror=()=>e.replaceWith(Ql("glove-large-art",n.print)),e.src=n.photo,e}var Eg=(n,e,t)=>"skm-glove-direct-preview-v1:"+(n==="5128581"?"STG-08":e)+":"+t;function Rg(n,e){let t=n.querySelector(".earth-drop-panel"),i=t.querySelector(".earth-drop-grid"),r=rt("dialog",null,"glove-direct-sheet");r.setAttribute("aria-label","\uC7A5\uAC11"),n.querySelector(".earth-app").append(r);let a=null,o=null,s=[],l=null,u=0,c=0,d=["#d46682","#cf9644","#a0a044","#559a76","#439fb9","#5f7fc3","#a06db5"],f=D=>["owned","sold","collected"].includes(D);function h(){let D=i.clientWidth,k=i.clientHeight;if(!l||!s.length||D<1||k<1||u===D&&c===k)return;u=D,c=k;let J=Math.max(1,Math.min(k-1,window.innerHeight/2-i.getBoundingClientRect().top)),$=(0,Cg.gloveNetwork)(s.length,D,2*Math.min(J,k-J)),re=J-$.height/2;$.center.y+=re;for(let le of $.points)le.y+=re;i.style.setProperty("--glove-scale",$.scale),i.querySelector(".glove-network-hub").style.top=J/k*100+"%",l.setAttribute("viewBox","0 0 "+D+" "+k),l.replaceChildren(),$.points.forEach((le,q)=>{let W=s[q];W.style.left=le.x/$.width*100+"%",W.style.top=le.y/k*100+"%",W.style.setProperty("--from-x",$.center.x-le.x+"px"),W.style.setProperty("--from-y",$.center.y-le.y+"px"),W.style.setProperty("--spread-delay",q*5+"ms");let j=document.createElementNS("http://www.w3.org/2000/svg","line");j.setAttribute("x1",$.center.x),j.setAttribute("y1",$.center.y),j.setAttribute("x2",le.x),j.setAttribute("y2",le.y),j.setAttribute("stroke",d[q%d.length]),j.setAttribute("pathLength","1"),j.dataset.to=String(q+1),j.dataset.owned=String(f(W.dataset.status)),l.append(j)})}let m=new ResizeObserver(h);m.observe(i);let x=null;function g(){x?.(),x=null}let p=()=>{F(),g(),r.close(),o=null};r.addEventListener("close",()=>{r.open||g()});let y=0,_=0,v=!1;async function I(){let D=++y,k=window.SKMBooking,J=k?.session()?.user?.id,$=a;if(!(!v||!$||t.hidden||!J||P&&P===Ho[$.id]?.code))try{let re=await k.gloveList();if(D!==y||t.hidden||a!==$||k.session()?.user?.id!==J)return;for(let[le,q]of s.entries()){let W=jl.default.pickupForPair(re,$,le+1),j=W?.drop.status||"draft";q.dataset.status=j;let ae=W?window.SKMGloveText(W.request?.status||j):window.SKMGloveText("draft");q.setAttribute("aria-label",q.dataset.itemName+" \xB7 "+ae);let fe=l?.children[le];fe&&(fe.dataset.owned=String(f(j)))}}catch{}}function E(D){let k=++_;if(D||p(),t.hidden=!D,D){n.scrollTop=0,t.scrollTop=0,u=0,h();let J=window.SKMBooking?.dropLive;J&&J().catch(()=>!1).then($=>{k!==_||t.hidden||(v!==($===!0)&&(v=$===!0,L(a),h()),I())})}}r.addEventListener("click",D=>{if(D.target===r){let k=r.getBoundingClientRect();(D.clientX<k.left||D.clientX>k.right||D.clientY<k.top||D.clientY>k.bottom)&&p()}}),window.addEventListener("pagehide",()=>{p(),m.disconnect()}),window.addEventListener("pageshow",()=>{m.observe(i),h()});let P=new URLSearchParams(location.search).get("gloves"),L=D=>{a=D,p();let k=Ho[a.id],J=a.label.toLowerCase().replace(/\b[a-z]/g,ae=>ae.toUpperCase()),$=a.ko||J;t.querySelector("h2").replaceChildren(document.createTextNode($));let le=!!(v&&k?.code&&k.code===P);i.replaceChildren(),s=[],u=0,c=0,i.setAttribute("aria-label",a.ko+" \uC7A5\uAC11"),l=document.createElementNS("http://www.w3.org/2000/svg","svg"),l.classList.add("glove-network-lines"),l.setAttribute("aria-hidden","true"),l.setAttribute("preserveAspectRatio","none");let q=rt("div",null,"glove-network-hub"),W=rt("img");W.src="app/logo-transparent.png",W.alt="SKINOMAKASE",q.append(W),i.append(l,q);let j=k?.pairs??50;for(let ae=1;ae<=j;ae++){let fe=le?jl.default.previewSlot(ae):"draft",me=jl.default.routeGlove({status:fe,preview:le}),ue=k?.code?k.code+" / "+String(ae).padStart(3,"0"):J,Ce=Vo("",()=>S(k,ue,ae,me,le),"earth-drop-pair");Ce.dataset.itemName=ue,Ce.dataset.status=fe,Ce.setAttribute("aria-label",ue+" \xB7 "+me.label),Ce.append(Ql("",k?.print)),i.append(Ce),s.push(Ce)}h(),Ag()};function b(D,k){let J=rt("header",null,"glove-direct-header"),$=Vo("",p,"glove-icon-button");$.setAttribute("aria-label","\uC7A5\uAC11 \uBAA9\uB85D\uC73C\uB85C"),$.append(Jl("arrow-left"));let re=rt("div");re.append(rt("strong",D),rt("span",k.label,"glove-direct-status"));let le=Vo("",p,"glove-icon-button");le.setAttribute("aria-label","\uB2EB\uAE30"),le.append(Jl("x")),J.append($,re,le),r.append(J)}function S(D,k,J,$,re){if(g(),o=J,!(re&&$.view==="chat")){G((0,Tg.glovePreview)(D,a),k,J,$,re);return}if(r.replaceChildren(),r.dataset.view=$.view,b(k,$),re&&r.append(rt("span","\uBBF8\uB9AC\uBCF4\uAE30","glove-preview-mark")),re&&$.view==="chat")te(D,J);else{N(D);let le=rt("section",null,"glove-map-section");r.append(le),x=Bf(le,{city:a,number:J,itemName:k,live:v,preview:re,navigate:q=>{p(),window.openAppPage(q)},onState:(q,W)=>{let j=W?window.SKMGloveText(W):window.SKMGloveText(q);r.querySelector(".glove-direct-status").textContent=j;let ae=s[J-1];ae.dataset.status=q,ae.setAttribute("aria-label",k+" \xB7 "+j)}})}Ag(),r.open||r.showModal()}let T=rt("dialog",null,"glove-model-dialog");T.setAttribute("aria-label","3D"),document.body.append(T);let B=null;function F(){T.open&&T.close(),T.dataset.product&&g(),B?.remove(),B=null}T.addEventListener("close",()=>{T.open||(T.dataset.product&&g(),B?.remove(),B=null)}),window.addEventListener("message",D=>{D.source!==B?.contentWindow||D.data?.skm!=="product-viewer-close"||D.origin!==location.origin&&!(D.origin==="null"&&location.protocol==="skm:")||F()});function G(D,k,J,$,re){F(),r.open&&r.close(),T.dataset.product="true",T.setAttribute("aria-label",k);let le=rt("div",null,"glove-product-shell"),q=rt("header",null,"glove-product-header"),W=rt("strong",D.code),j=Vo("\xD7",F,"glove-product-close");j.setAttribute("aria-label",Xt("close")),q.append(W,j);let ae=rt("section",null,"glove-product-location");ae.setAttribute("aria-label",Xt("pickup")),ae.hidden=D.previewOnly&&!D.publicPickup;let fe=rt("div",null,"glove-product-stage");B=rt("iframe"),B.title=D.code+" \xB7 3D",B.src="app/product-viewer.html?model="+encodeURIComponent(D.model)+"&embedded=1&mosaic=1",fe.append(B);let me=rt("section",null,"glove-product-checkout");me.setAttribute("aria-label",Xt("price")),le.append(q,ae,fe,me),T.replaceChildren(le),T.showModal(),x=Bf(me,{city:a,number:J,itemName:k,live:v&&!D.previewOnly,preview:re,locationHost:ae,pickupPlan:D.publicPickup,navigate:ue=>{p(),window.openAppPage(ue)},onState:(ue,Ce)=>{let Te=s[J-1];Te&&(Te.dataset.status=ue,Te.setAttribute("aria-label",k+" \xB7 "+window.SKMGloveText(Ce||ue)))}})}function U(D){/^models\/[a-zA-Z0-9_-]+\.glb$/.test(D.model||"")&&(F(),delete T.dataset.product,B=rt("iframe"),B.title=D.code+" \xB7 3D",B.src="app/product-viewer.html?model="+encodeURIComponent(D.model),T.replaceChildren(B),T.showModal())}function N(D){let k=rt("div",null,"glove-unavailable");if(D?.model){let J=Vo("",()=>U(D),"glove-model-open");J.setAttribute("aria-label","3D\uB85C \uBCF4\uAE30"),J.append(kf(D),rt("span","3D \u2197","glove-model-badge")),k.append(J)}else k.append(kf(D));r.append(k)}function te(D,k){let J=D.code,$=[];try{let me=JSON.parse(localStorage.getItem(Eg(a.id,J,k)));Array.isArray(me)&&($=me.filter(ue=>typeof ue.text=="string"&&ue.text.length<=1e3&&Number.isFinite(ue.at)).slice(-100))}catch{}let re=rt("div",null,"glove-chat-owner");re.append(D.photo?kf(D):Jl("user-round"),rt("span","\uBCF4\uC720\uC790"),rt("small","\uC2E4\uC81C \uC804\uC1A1 \uC548 \uB428")),r.append(re);let le=rt("div",null,"glove-chat-log");le.setAttribute("role","log"),le.setAttribute("aria-live","polite"),le.setAttribute("aria-label","\uBCF4\uC720\uC790\uC640 \uB300\uD654"),r.append(le);function q(){if(le.replaceChildren(),!$.length){let me=rt("div",null,"glove-chat-empty");me.append(Ql(),rt("p","\uBA54\uC2DC\uC9C0\uB97C \uBCF4\uB0B4\uBCF4\uC138\uC694")),le.append(me)}for(let me of $){let ue=rt("div",null,"glove-chat-message");ue.append(rt("p",me.text),rt("time",new Date(me.at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"}))),le.append(ue)}le.scrollTop=le.scrollHeight}let W=rt("form",null,"glove-chat-compose"),j=rt("textarea"),ae=rt("button");j.rows=1,j.maxLength=1e3,j.placeholder="\uBA54\uC2DC\uC9C0",j.setAttribute("aria-label","\uBA54\uC2DC\uC9C0"),ae.type="submit",ae.setAttribute("aria-label","\uBCF4\uB0B4\uAE30"),ae.append(Jl("send"));let fe=rt("p",null,"glove-chat-error");fe.setAttribute("role","status"),j.oninput=()=>{ae.disabled=!j.value.trim()},ae.disabled=!0,W.onsubmit=me=>{me.preventDefault();let ue=j.value.trim();if(!ue||ue.length>1e3)return;let Ce=[...$,{text:ue,at:Date.now()}].slice(-100);try{localStorage.setItem(Eg(a.id,J,k),JSON.stringify(Ce)),$=Ce,j.value="",ae.disabled=!0,fe.textContent="",q(),j.focus()}catch{fe.textContent="\uC800\uC7A5\uD558\uC9C0 \uBABB\uD588\uC5B4\uC694. \uB2E4\uC2DC \uC2DC\uB3C4\uD574\uC8FC\uC138\uC694."}},W.append(j,ae),r.append(W,fe),q()}return{render:L,close:p,setOpen:E}}var On=class{constructor(){this._partials=new Float64Array(32),this._n=0}add(e){let t=this._partials,i=0;for(let r=0;r<this._n&&r<32;r++){let a=t[r],o=e+a,s=Math.abs(e)<Math.abs(a)?e-(o-a):a-(o-e);s&&(t[i++]=s),e=o}return t[i]=e,this._n=i+1,this}valueOf(){let e=this._partials,t=this._n,i,r,a,o=0;if(t>0){for(o=e[--t];t>0&&(i=o,r=e[--t],o=i+r,a=r-(o-i),!a););t>0&&(a<0&&e[t-1]<0||a>0&&e[t-1]>0)&&(r=a*2,i=o+r,r==i-o&&(o=i))}return o}};function*Eb(n){for(let e of n)yield*e}function Ra(n){return Array.from(Eb(n))}var ct=1e-6,Pg=1e-12,at=Math.PI,Mn=at/2,zf=at/4,dn=at*2,sn=180/at,Ot=at/180,xt=Math.abs,Ig=Math.atan,Xn=Math.atan2,ht=Math.cos;var ot=Math.sin,Lg=Math.sign||function(n){return n>0?1:n<0?-1:0},fn=Math.sqrt;function Dg(n){return n>1?0:n<-1?at:Math.acos(n)}function ci(n){return n>1?Mn:n<-1?-Mn:Math.asin(n)}function Hf(n){return(n=ot(n/2))*n}function tn(){}function ec(n,e){n&&Ng.hasOwnProperty(n.type)&&Ng[n.type](n,e)}var Ug={Feature:function(n,e){ec(n.geometry,e)},FeatureCollection:function(n,e){for(var t=n.features,i=-1,r=t.length;++i<r;)ec(t[i].geometry,e)}},Ng={Sphere:function(n,e){e.sphere()},Point:function(n,e){n=n.coordinates,e.point(n[0],n[1],n[2])},MultiPoint:function(n,e){for(var t=n.coordinates,i=-1,r=t.length;++i<r;)n=t[i],e.point(n[0],n[1],n[2])},LineString:function(n,e){Vf(n.coordinates,e,0)},MultiLineString:function(n,e){for(var t=n.coordinates,i=-1,r=t.length;++i<r;)Vf(t[i],e,0)},Polygon:function(n,e){Fg(n.coordinates,e)},MultiPolygon:function(n,e){for(var t=n.coordinates,i=-1,r=t.length;++i<r;)Fg(t[i],e)},GeometryCollection:function(n,e){for(var t=n.geometries,i=-1,r=t.length;++i<r;)ec(t[i],e)}};function Vf(n,e,t){var i=-1,r=n.length-t,a;for(e.lineStart();++i<r;)a=n[i],e.point(a[0],a[1],a[2]);e.lineEnd()}function Fg(n,e){var t=-1,i=n.length;for(e.polygonStart();++t<i;)Vf(n[t],e,1);e.polygonEnd()}function cr(n,e){n&&Ug.hasOwnProperty(n.type)?Ug[n.type](n,e):ec(n,e)}function Go(n){return[Xn(n[1],n[0]),ci(n[2])]}function bi(n){var e=n[0],t=n[1],i=ht(t);return[i*ht(e),i*ot(e),ot(t)]}function Wo(n,e){return n[0]*e[0]+n[1]*e[1]+n[2]*e[2]}function Pa(n,e){return[n[1]*e[2]-n[2]*e[1],n[2]*e[0]-n[0]*e[2],n[0]*e[1]-n[1]*e[0]]}function tc(n,e){n[0]+=e[0],n[1]+=e[1],n[2]+=e[2]}function qo(n,e){return[n[0]*e,n[1]*e,n[2]*e]}function Xo(n){var e=fn(n[0]*n[0]+n[1]*n[1]+n[2]*n[2]);n[0]/=e,n[1]/=e,n[2]/=e}function Yo(n,e){function t(i,r){return i=n(i,r),e(i[0],i[1])}return n.invert&&e.invert&&(t.invert=function(i,r){return i=e.invert(i,r),i&&n.invert(i[0],i[1])}),t}function Gf(n,e){return xt(n)>at&&(n-=Math.round(n/dn)*dn),[n,e]}Gf.invert=Gf;function zg(n,e,t){return(n%=dn)?e||t?Yo(Bg(n),kg(e,t)):Bg(n):e||t?kg(e,t):Gf}function Og(n){return function(e,t){return e+=n,xt(e)>at&&(e-=Math.round(e/dn)*dn),[e,t]}}function Bg(n){var e=Og(n);return e.invert=Og(-n),e}function kg(n,e){var t=ht(n),i=ot(n),r=ht(e),a=ot(e);function o(s,l){var u=ht(l),c=ht(s)*u,d=ot(s)*u,f=ot(l),h=f*t+c*i;return[Xn(d*r-h*a,c*t-f*i),ci(h*r+d*a)]}return o.invert=function(s,l){var u=ht(l),c=ht(s)*u,d=ot(s)*u,f=ot(l),h=f*r-d*a;return[Xn(d*r+f*a,c*t+h*i),ci(h*t-c*i)]},o}function Vg(n,e,t,i,r,a){if(t){var o=ht(e),s=ot(e),l=i*t;r==null?(r=e+i*dn,a=e-l/2):(r=Hg(o,r),a=Hg(o,a),(i>0?r<a:r>a)&&(r+=i*dn));for(var u,c=r;i>0?c>a:c<a;c-=l)u=Go([o,-s*ht(c),-s*ot(c)]),n.point(u[0],u[1])}}function Hg(n,e){e=bi(e),e[0]-=n,Xo(e);var t=Dg(-e[1]);return((-e[2]<0?-t:t)+dn-ct)%dn}function nc(){var n=[],e;return{point:function(t,i,r){e.push([t,i,r])},lineStart:function(){n.push(e=[])},lineEnd:tn,rejoin:function(){n.length>1&&n.push(n.pop().concat(n.shift()))},result:function(){var t=n;return n=[],e=null,t}}}function Ia(n,e){return xt(n[0]-e[0])<ct&&xt(n[1]-e[1])<ct}function ic(n,e,t,i){this.x=n,this.z=e,this.o=t,this.e=i,this.v=!1,this.n=this.p=null}function rc(n,e,t,i,r){var a=[],o=[],s,l;if(n.forEach(function(m){if(!((x=m.length-1)<=0)){var x,g=m[0],p=m[x],y;if(Ia(g,p)){if(!g[2]&&!p[2]){for(r.lineStart(),s=0;s<x;++s)r.point((g=m[s])[0],g[1]);r.lineEnd();return}p[0]+=2*ct}a.push(y=new ic(g,m,null,!0)),o.push(y.o=new ic(g,null,y,!1)),a.push(y=new ic(p,m,null,!1)),o.push(y.o=new ic(p,null,y,!0))}}),!!a.length){for(o.sort(e),Gg(a),Gg(o),s=0,l=o.length;s<l;++s)o[s].e=t=!t;for(var u=a[0],c,d;;){for(var f=u,h=!0;f.v;)if((f=f.n)===u)return;c=f.z,r.lineStart();do{if(f.v=f.o.v=!0,f.e){if(h)for(s=0,l=c.length;s<l;++s)r.point((d=c[s])[0],d[1]);else i(f.x,f.n.x,1,r);f=f.n}else{if(h)for(c=f.p.z,s=c.length-1;s>=0;--s)r.point((d=c[s])[0],d[1]);else i(f.x,f.p.x,-1,r);f=f.p}f=f.o,c=f.z,h=!h}while(!f.v);r.lineEnd()}}}function Gg(n){if(e=n.length){for(var e,t=0,i=n[0],r;++t<e;)i.n=r=n[t],r.p=i,i=r;i.n=r=n[0],r.p=i}}function Wf(n){return xt(n[0])<=at?n[0]:Lg(n[0])*((xt(n[0])+at)%dn-at)}function Wg(n,e){var t=Wf(e),i=e[1],r=ot(i),a=[ot(t),-ht(t),0],o=0,s=0,l=new On;r===1?i=Mn+ct:r===-1&&(i=-Mn-ct);for(var u=0,c=n.length;u<c;++u)if(f=(d=n[u]).length)for(var d,f,h=d[f-1],m=Wf(h),x=h[1]/2+zf,g=ot(x),p=ht(x),y=0;y<f;++y,m=v,g=E,p=P,h=_){var _=d[y],v=Wf(_),I=_[1]/2+zf,E=ot(I),P=ht(I),L=v-m,b=L>=0?1:-1,S=b*L,T=S>at,B=g*E;if(l.add(Xn(B*b*ot(S),p*P+B*ht(S))),o+=T?L+b*dn:L,T^m>=t^v>=t){var F=Pa(bi(h),bi(_));Xo(F);var G=Pa(a,F);Xo(G);var U=(T^L>=0?-1:1)*ci(G[2]);(i>U||i===U&&(F[0]||F[1]))&&(s+=T^L>=0?1:-1)}}return(o<-ct||o<ct&&l<-Pg)^s&1}function ac(n,e,t,i){return function(r){var a=e(r),o=nc(),s=e(o),l=!1,u,c,d,f={point:h,lineStart:x,lineEnd:g,polygonStart:function(){f.point=p,f.lineStart=y,f.lineEnd=_,c=[],u=[]},polygonEnd:function(){f.point=h,f.lineStart=x,f.lineEnd=g,c=Ra(c);var v=Wg(u,i);c.length?(l||(r.polygonStart(),l=!0),rc(c,Cb,v,t,r)):v&&(l||(r.polygonStart(),l=!0),r.lineStart(),t(null,null,1,r),r.lineEnd()),l&&(r.polygonEnd(),l=!1),c=u=null},sphere:function(){r.polygonStart(),r.lineStart(),t(null,null,1,r),r.lineEnd(),r.polygonEnd()}};function h(v,I){n(v,I)&&r.point(v,I)}function m(v,I){a.point(v,I)}function x(){f.point=m,a.lineStart()}function g(){f.point=h,a.lineEnd()}function p(v,I){d.push([v,I]),s.point(v,I)}function y(){s.lineStart(),d=[]}function _(){p(d[0][0],d[0][1]),s.lineEnd();var v=s.clean(),I=o.result(),E,P=I.length,L,b,S;if(d.pop(),u.push(d),d=null,!!P){if(v&1){if(b=I[0],(L=b.length-1)>0){for(l||(r.polygonStart(),l=!0),r.lineStart(),E=0;E<L;++E)r.point((S=b[E])[0],S[1]);r.lineEnd()}return}P>1&&v&2&&I.push(I.pop().concat(I.shift())),c.push(I.filter(Tb))}}return f}}function Tb(n){return n.length>1}function Cb(n,e){return((n=n.x)[0]<0?n[1]-Mn-ct:Mn-n[1])-((e=e.x)[0]<0?e[1]-Mn-ct:Mn-e[1])}var qf=ac(function(){return!0},Rb,Ib,[-at,-Mn]);function Rb(n){var e=NaN,t=NaN,i=NaN,r;return{lineStart:function(){n.lineStart(),r=1},point:function(a,o){var s=a>0?at:-at,l=xt(a-e);xt(l-at)<ct?(n.point(e,t=(t+o)/2>0?Mn:-Mn),n.point(i,t),n.lineEnd(),n.lineStart(),n.point(s,t),n.point(a,t),r=0):i!==s&&l>=at&&(xt(e-i)<ct&&(e-=i*ct),xt(a-s)<ct&&(a-=s*ct),t=Pb(e,t,a,o),n.point(i,t),n.lineEnd(),n.lineStart(),n.point(s,t),r=0),n.point(e=a,t=o),i=s},lineEnd:function(){n.lineEnd(),e=t=NaN},clean:function(){return 2-r}}}function Pb(n,e,t,i){var r,a,o=ot(n-t);return xt(o)>ct?Ig((ot(e)*(a=ht(i))*ot(t)-ot(i)*(r=ht(e))*ot(n))/(r*a*o)):(e+i)/2}function Ib(n,e,t,i){var r;if(n==null)r=t*Mn,i.point(-at,r),i.point(0,r),i.point(at,r),i.point(at,0),i.point(at,-r),i.point(0,-r),i.point(-at,-r),i.point(-at,0),i.point(-at,r);else if(xt(n[0]-e[0])>ct){var a=n[0]<e[0]?at:-at;r=t*a/2,i.point(-a,r),i.point(0,r),i.point(a,r)}else i.point(e[0],e[1])}function qg(n){var e=ht(n),t=2*Ot,i=e>0,r=xt(e)>ct;function a(c,d,f,h){Vg(h,n,t,f,c,d)}function o(c,d){return ht(c)*ht(d)>e}function s(c){var d,f,h,m,x;return{lineStart:function(){m=h=!1,x=1},point:function(g,p){var y=[g,p],_,v=o(g,p),I=i?v?0:u(g,p):v?u(g+(g<0?at:-at),p):0;if(!d&&(m=h=v)&&c.lineStart(),v!==h&&(_=l(d,y),(!_||Ia(d,_)||Ia(y,_))&&(y[2]=1)),v!==h)x=0,v?(c.lineStart(),_=l(y,d),c.point(_[0],_[1])):(_=l(d,y),c.point(_[0],_[1],2),c.lineEnd()),d=_;else if(r&&d&&i^v){var E;!(I&f)&&(E=l(y,d,!0))&&(x=0,i?(c.lineStart(),c.point(E[0][0],E[0][1]),c.point(E[1][0],E[1][1]),c.lineEnd()):(c.point(E[1][0],E[1][1]),c.lineEnd(),c.lineStart(),c.point(E[0][0],E[0][1],3)))}v&&(!d||!Ia(d,y))&&c.point(y[0],y[1]),d=y,h=v,f=I},lineEnd:function(){h&&c.lineEnd(),d=null},clean:function(){return x|(m&&h)<<1}}}function l(c,d,f){var h=bi(c),m=bi(d),x=[1,0,0],g=Pa(h,m),p=Wo(g,g),y=g[0],_=p-y*y;if(!_)return!f&&c;var v=e*p/_,I=-e*y/_,E=Pa(x,g),P=qo(x,v),L=qo(g,I);tc(P,L);var b=E,S=Wo(P,b),T=Wo(b,b),B=S*S-T*(Wo(P,P)-1);if(!(B<0)){var F=fn(B),G=qo(b,(-S-F)/T);if(tc(G,P),G=Go(G),!f)return G;var U=c[0],N=d[0],te=c[1],D=d[1],k;N<U&&(k=U,U=N,N=k);var J=N-U,$=xt(J-at)<ct,re=$||J<ct;if(!$&&D<te&&(k=te,te=D,D=k),re?$?te+D>0^G[1]<(xt(G[0]-U)<ct?te:D):te<=G[1]&&G[1]<=D:J>at^(U<=G[0]&&G[0]<=N)){var le=qo(b,(-S+F)/T);return tc(le,P),[G,Go(le)]}}}function u(c,d){var f=i?n:at-n,h=0;return c<-f?h|=1:c>f&&(h|=2),d<-f?h|=4:d>f&&(h|=8),h}return ac(o,s,a,i?[0,-n]:[-at,n-at])}function Xg(n,e,t,i,r,a){var o=n[0],s=n[1],l=e[0],u=e[1],c=0,d=1,f=l-o,h=u-s,m;if(m=t-o,!(!f&&m>0)){if(m/=f,f<0){if(m<c)return;m<d&&(d=m)}else if(f>0){if(m>d)return;m>c&&(c=m)}if(m=r-o,!(!f&&m<0)){if(m/=f,f<0){if(m>d)return;m>c&&(c=m)}else if(f>0){if(m<c)return;m<d&&(d=m)}if(m=i-s,!(!h&&m>0)){if(m/=h,h<0){if(m<c)return;m<d&&(d=m)}else if(h>0){if(m>d)return;m>c&&(c=m)}if(m=a-s,!(!h&&m<0)){if(m/=h,h<0){if(m>d)return;m>c&&(c=m)}else if(h>0){if(m<c)return;m<d&&(d=m)}return c>0&&(n[0]=o+c*f,n[1]=s+c*h),d<1&&(e[0]=o+d*f,e[1]=s+d*h),!0}}}}}var Zo=1e9,oc=-Zo;function Xf(n,e,t,i){function r(u,c){return n<=u&&u<=t&&e<=c&&c<=i}function a(u,c,d,f){var h=0,m=0;if(u==null||(h=o(u,d))!==(m=o(c,d))||l(u,c)<0^d>0)do f.point(h===0||h===3?n:t,h>1?i:e);while((h=(h+d+4)%4)!==m);else f.point(c[0],c[1])}function o(u,c){return xt(u[0]-n)<ct?c>0?0:3:xt(u[0]-t)<ct?c>0?2:1:xt(u[1]-e)<ct?c>0?1:0:c>0?3:2}function s(u,c){return l(u.x,c.x)}function l(u,c){var d=o(u,1),f=o(c,1);return d!==f?d-f:d===0?c[1]-u[1]:d===1?u[0]-c[0]:d===2?u[1]-c[1]:c[0]-u[0]}return function(u){var c=u,d=nc(),f,h,m,x,g,p,y,_,v,I,E,P={point:L,lineStart:B,lineEnd:F,polygonStart:S,polygonEnd:T};function L(U,N){r(U,N)&&c.point(U,N)}function b(){for(var U=0,N=0,te=h.length;N<te;++N)for(var D=h[N],k=1,J=D.length,$=D[0],re,le,q=$[0],W=$[1];k<J;++k)re=q,le=W,$=D[k],q=$[0],W=$[1],le<=i?W>i&&(q-re)*(i-le)>(W-le)*(n-re)&&++U:W<=i&&(q-re)*(i-le)<(W-le)*(n-re)&&--U;return U}function S(){c=d,f=[],h=[],E=!0}function T(){var U=b(),N=E&&U,te=(f=Ra(f)).length;(N||te)&&(u.polygonStart(),N&&(u.lineStart(),a(null,null,1,u),u.lineEnd()),te&&rc(f,s,U,a,u),u.polygonEnd()),c=u,f=h=m=null}function B(){P.point=G,h&&h.push(m=[]),I=!0,v=!1,y=_=NaN}function F(){f&&(G(x,g),p&&v&&d.rejoin(),f.push(d.result())),P.point=L,v&&c.lineEnd()}function G(U,N){var te=r(U,N);if(h&&m.push([U,N]),I)x=U,g=N,p=te,I=!1,te&&(c.lineStart(),c.point(U,N));else if(te&&v)c.point(U,N);else{var D=[y=Math.max(oc,Math.min(Zo,y)),_=Math.max(oc,Math.min(Zo,_))],k=[U=Math.max(oc,Math.min(Zo,U)),N=Math.max(oc,Math.min(Zo,N))];Xg(D,k,n,e,t,i)?(v||(c.lineStart(),c.point(D[0],D[1])),c.point(k[0],k[1]),te||c.lineEnd(),E=!1):te&&(c.lineStart(),c.point(U,N),E=!1)}y=U,_=N,v=te}return P}}function Yf(n,e){var t=n[0]*Ot,i=n[1]*Ot,r=e[0]*Ot,a=e[1]*Ot,o=ht(i),s=ot(i),l=ht(a),u=ot(a),c=o*ht(t),d=o*ot(t),f=l*ht(r),h=l*ot(r),m=2*ci(fn(Hf(a-i)+o*l*Hf(r-t))),x=ot(m),g=m?function(p){var y=ot(p*=m)/x,_=ot(m-p)/x,v=_*c+y*f,I=_*d+y*h,E=_*s+y*u;return[Xn(I,v)*sn,Xn(E,fn(v*v+I*I))*sn]}:function(){return[t*sn,i*sn]};return g.distance=m,g}var Ko=n=>n;var Zf=new On,Kf=new On,Yg,Zg,$f,Jf,ur={point:tn,lineStart:tn,lineEnd:tn,polygonStart:function(){ur.lineStart=Lb,ur.lineEnd=Ub},polygonEnd:function(){ur.lineStart=ur.lineEnd=ur.point=tn,Zf.add(xt(Kf)),Kf=new On},result:function(){var n=Zf/2;return Zf=new On,n}};function Lb(){ur.point=Db}function Db(n,e){ur.point=Kg,Yg=$f=n,Zg=Jf=e}function Kg(n,e){Kf.add(Jf*n-$f*e),$f=n,Jf=e}function Ub(){Kg(Yg,Zg)}var jf=ur;var La=1/0,sc=La,$o=-La,lc=$o,Nb={point:Fb,lineStart:tn,lineEnd:tn,polygonStart:tn,polygonEnd:tn,result:function(){var n=[[La,sc],[$o,lc]];return $o=lc=-(sc=La=1/0),n}};function Fb(n,e){n<La&&(La=n),n>$o&&($o=n),e<sc&&(sc=e),e>lc&&(lc=e)}var Da=Nb;var Qf=0,eh=0,Jo=0,cc=0,uc=0,Ua=0,th=0,nh=0,jo=0,jg,Qg,wi,Ai,ui={point:kr,lineStart:$g,lineEnd:Jg,polygonStart:function(){ui.lineStart=kb,ui.lineEnd=zb},polygonEnd:function(){ui.point=kr,ui.lineStart=$g,ui.lineEnd=Jg},result:function(){var n=jo?[th/jo,nh/jo]:Ua?[cc/Ua,uc/Ua]:Jo?[Qf/Jo,eh/Jo]:[NaN,NaN];return Qf=eh=Jo=cc=uc=Ua=th=nh=jo=0,n}};function kr(n,e){Qf+=n,eh+=e,++Jo}function $g(){ui.point=Ob}function Ob(n,e){ui.point=Bb,kr(wi=n,Ai=e)}function Bb(n,e){var t=n-wi,i=e-Ai,r=fn(t*t+i*i);cc+=r*(wi+n)/2,uc+=r*(Ai+e)/2,Ua+=r,kr(wi=n,Ai=e)}function Jg(){ui.point=kr}function kb(){ui.point=Hb}function zb(){e0(jg,Qg)}function Hb(n,e){ui.point=e0,kr(jg=wi=n,Qg=Ai=e)}function e0(n,e){var t=n-wi,i=e-Ai,r=fn(t*t+i*i);cc+=r*(wi+n)/2,uc+=r*(Ai+e)/2,Ua+=r,r=Ai*n-wi*e,th+=r*(wi+n),nh+=r*(Ai+e),jo+=r*3,kr(wi=n,Ai=e)}var ih=ui;function dc(n){this._context=n}dc.prototype={_radius:4.5,pointRadius:function(n){return this._radius=n,this},polygonStart:function(){this._line=0},polygonEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){this._line===0&&this._context.closePath(),this._point=NaN},point:function(n,e){switch(this._point){case 0:{this._context.moveTo(n,e),this._point=1;break}case 1:{this._context.lineTo(n,e);break}default:{this._context.moveTo(n+this._radius,e),this._context.arc(n,e,this._radius,0,dn);break}}},result:tn};var ah=new On,rh,t0,n0,Qo,es,fc={point:tn,lineStart:function(){fc.point=Vb},lineEnd:function(){rh&&i0(t0,n0),fc.point=tn},polygonStart:function(){rh=!0},polygonEnd:function(){rh=null},result:function(){var n=+ah;return ah=new On,n}};function Vb(n,e){fc.point=i0,t0=Qo=n,n0=es=e}function i0(n,e){Qo-=n,es-=e,ah.add(fn(Qo*Qo+es*es)),Qo=n,es=e}var oh=fc;var r0,hc,a0,o0,Na=class{constructor(e){this._append=e==null?s0:Gb(e),this._radius=4.5,this._=""}pointRadius(e){return this._radius=+e,this}polygonStart(){this._line=0}polygonEnd(){this._line=NaN}lineStart(){this._point=0}lineEnd(){this._line===0&&(this._+="Z"),this._point=NaN}point(e,t){switch(this._point){case 0:{this._append`M${e},${t}`,this._point=1;break}case 1:{this._append`L${e},${t}`;break}default:{if(this._append`M${e},${t}`,this._radius!==a0||this._append!==hc){let i=this._radius,r=this._;this._="",this._append`m0,${i}a${i},${i} 0 1,1 0,${-2*i}a${i},${i} 0 1,1 0,${2*i}z`,a0=i,hc=this._append,o0=this._,this._=r}this._+=o0;break}}}result(){let e=this._;return this._="",e.length?e:null}};function s0(n){let e=1;this._+=n[0];for(let t=n.length;e<t;++e)this._+=arguments[e]+n[e]}function Gb(n){let e=Math.floor(n);if(!(e>=0))throw new RangeError(`invalid digits: ${n}`);if(e>15)return s0;if(e!==r0){let t=10**e;r0=e,hc=function(r){let a=1;this._+=r[0];for(let o=r.length;a<o;++a)this._+=Math.round(arguments[a]*t)/t+r[a]}}return hc}function pc(n,e){let t=3,i=4.5,r,a;function o(s){return s&&(typeof i=="function"&&a.pointRadius(+i.apply(this,arguments)),cr(s,r(a))),a.result()}return o.area=function(s){return cr(s,r(jf)),jf.result()},o.measure=function(s){return cr(s,r(oh)),oh.result()},o.bounds=function(s){return cr(s,r(Da)),Da.result()},o.centroid=function(s){return cr(s,r(ih)),ih.result()},o.projection=function(s){return arguments.length?(r=s==null?(n=null,Ko):(n=s).stream,o):n},o.context=function(s){return arguments.length?(a=s==null?(e=null,new Na(t)):new dc(e=s),typeof i!="function"&&a.pointRadius(i),o):e},o.pointRadius=function(s){return arguments.length?(i=typeof s=="function"?s:(a.pointRadius(+s),+s),o):i},o.digits=function(s){if(!arguments.length)return t;if(s==null)t=null;else{let l=Math.floor(s);if(!(l>=0))throw new RangeError(`invalid digits: ${s}`);t=l}return e===null&&(a=new Na(t)),o},o.projection(n).digits(t).context(e)}function ts(n){return function(e){var t=new sh;for(var i in n)t[i]=n[i];return t.stream=e,t}}function sh(){}sh.prototype={constructor:sh,point:function(n,e){this.stream.point(n,e)},sphere:function(){this.stream.sphere()},lineStart:function(){this.stream.lineStart()},lineEnd:function(){this.stream.lineEnd()},polygonStart:function(){this.stream.polygonStart()},polygonEnd:function(){this.stream.polygonEnd()}};function lh(n,e,t){var i=n.clipExtent&&n.clipExtent();return n.scale(150).translate([0,0]),i!=null&&n.clipExtent(null),cr(t,n.stream(Da)),e(Da.result()),i!=null&&n.clipExtent(i),n}function ch(n,e,t){return lh(n,function(i){var r=e[1][0]-e[0][0],a=e[1][1]-e[0][1],o=Math.min(r/(i[1][0]-i[0][0]),a/(i[1][1]-i[0][1])),s=+e[0][0]+(r-o*(i[1][0]+i[0][0]))/2,l=+e[0][1]+(a-o*(i[1][1]+i[0][1]))/2;n.scale(150*o).translate([s,l])},t)}function l0(n,e,t){return ch(n,[[0,0],e],t)}function c0(n,e,t){return lh(n,function(i){var r=+e,a=r/(i[1][0]-i[0][0]),o=(r-a*(i[1][0]+i[0][0]))/2,s=-a*i[0][1];n.scale(150*a).translate([o,s])},t)}function u0(n,e,t){return lh(n,function(i){var r=+e,a=r/(i[1][1]-i[0][1]),o=-a*i[0][0],s=(r-a*(i[1][1]+i[0][1]))/2;n.scale(150*a).translate([o,s])},t)}var d0=16,Wb=ht(30*Ot);function uh(n,e){return+e?Xb(n,e):qb(n)}function qb(n){return ts({point:function(e,t){e=n(e,t),this.stream.point(e[0],e[1])}})}function Xb(n,e){function t(i,r,a,o,s,l,u,c,d,f,h,m,x,g){var p=u-i,y=c-r,_=p*p+y*y;if(_>4*e&&x--){var v=o+f,I=s+h,E=l+m,P=fn(v*v+I*I+E*E),L=ci(E/=P),b=xt(xt(E)-1)<ct||xt(a-d)<ct?(a+d)/2:Xn(I,v),S=n(b,L),T=S[0],B=S[1],F=T-i,G=B-r,U=y*F-p*G;(U*U/_>e||xt((p*F+y*G)/_-.5)>.3||o*f+s*h+l*m<Wb)&&(t(i,r,a,o,s,l,T,B,b,v/=P,I/=P,E,x,g),g.point(T,B),t(T,B,b,v,I,E,u,c,d,f,h,m,x,g))}}return function(i){var r,a,o,s,l,u,c,d,f,h,m,x,g={point:p,lineStart:y,lineEnd:v,polygonStart:function(){i.polygonStart(),g.lineStart=I},polygonEnd:function(){i.polygonEnd(),g.lineStart=y}};function p(L,b){L=n(L,b),i.point(L[0],L[1])}function y(){d=NaN,g.point=_,i.lineStart()}function _(L,b){var S=bi([L,b]),T=n(L,b);t(d,f,c,h,m,x,d=T[0],f=T[1],c=L,h=S[0],m=S[1],x=S[2],d0,i),i.point(d,f)}function v(){g.point=p,i.lineEnd()}function I(){y(),g.point=E,g.lineEnd=P}function E(L,b){_(r=L,b),a=d,o=f,s=h,l=m,u=x,g.point=_}function P(){t(d,f,c,h,m,x,a,o,r,s,l,u,d0,i),g.lineEnd=v,v()}return g}}var Yb=ts({point:function(n,e){this.stream.point(n*Ot,e*Ot)}});function Zb(n){return ts({point:function(e,t){var i=n(e,t);return this.stream.point(i[0],i[1])}})}function Kb(n,e,t,i,r){function a(o,s){return o*=i,s*=r,[e+n*o,t-n*s]}return a.invert=function(o,s){return[(o-e)/n*i,(t-s)/n*r]},a}function f0(n,e,t,i,r,a){if(!a)return Kb(n,e,t,i,r);var o=ht(a),s=ot(a),l=o*n,u=s*n,c=o/n,d=s/n,f=(s*t-o*e)/n,h=(s*e+o*t)/n;function m(x,g){return x*=i,g*=r,[l*x-u*g+e,t-u*x-l*g]}return m.invert=function(x,g){return[i*(c*x-d*g+f),r*(h-d*x-c*g)]},m}function dh(n){return $b(function(){return n})()}function $b(n){var e,t=150,i=480,r=250,a=0,o=0,s=0,l=0,u=0,c,d=0,f=1,h=1,m=null,x=qf,g=null,p,y,_,v=Ko,I=.5,E,P,L,b,S;function T(U){return L(U[0]*Ot,U[1]*Ot)}function B(U){return U=L.invert(U[0],U[1]),U&&[U[0]*sn,U[1]*sn]}T.stream=function(U){return b&&S===U?b:b=Yb(Zb(c)(x(E(v(S=U)))))},T.preclip=function(U){return arguments.length?(x=U,m=void 0,G()):x},T.postclip=function(U){return arguments.length?(v=U,g=p=y=_=null,G()):v},T.clipAngle=function(U){return arguments.length?(x=+U?qg(m=U*Ot):(m=null,qf),G()):m*sn},T.clipExtent=function(U){return arguments.length?(v=U==null?(g=p=y=_=null,Ko):Xf(g=+U[0][0],p=+U[0][1],y=+U[1][0],_=+U[1][1]),G()):g==null?null:[[g,p],[y,_]]},T.scale=function(U){return arguments.length?(t=+U,F()):t},T.translate=function(U){return arguments.length?(i=+U[0],r=+U[1],F()):[i,r]},T.center=function(U){return arguments.length?(a=U[0]%360*Ot,o=U[1]%360*Ot,F()):[a*sn,o*sn]},T.rotate=function(U){return arguments.length?(s=U[0]%360*Ot,l=U[1]%360*Ot,u=U.length>2?U[2]%360*Ot:0,F()):[s*sn,l*sn,u*sn]},T.angle=function(U){return arguments.length?(d=U%360*Ot,F()):d*sn},T.reflectX=function(U){return arguments.length?(f=U?-1:1,F()):f<0},T.reflectY=function(U){return arguments.length?(h=U?-1:1,F()):h<0},T.precision=function(U){return arguments.length?(E=uh(P,I=U*U),G()):fn(I)},T.fitExtent=function(U,N){return ch(T,U,N)},T.fitSize=function(U,N){return l0(T,U,N)},T.fitWidth=function(U,N){return c0(T,U,N)},T.fitHeight=function(U,N){return u0(T,U,N)};function F(){var U=f0(t,0,0,f,h,d).apply(null,e(a,o)),N=f0(t,i-U[0],r-U[1],f,h,d);return c=zg(s,l,u),P=Yo(e,N),L=Yo(c,P),E=uh(P,I),G()}function G(){return b=S=null,T}return function(){return e=n.apply(this,arguments),T.invert=e.invert&&B,F()}}function mc(n,e){return[n,e]}mc.invert=mc;function gc(){return dh(mc).scale(152.63)}function fh(n){return n}function xc(n){if(n==null)return fh;var e,t,i=n.scale[0],r=n.scale[1],a=n.translate[0],o=n.translate[1];return function(s,l){l||(e=t=0);var u=2,c=s.length,d=new Array(c);for(d[0]=(e+=s[0])*i+a,d[1]=(t+=s[1])*r+o;u<c;)d[u]=s[u],++u;return d}}function h0(n,e){for(var t,i=n.length,r=i-e;r<--i;)t=n[r],n[r++]=n[i],n[i]=t}function hh(n,e){return typeof e=="string"&&(e=n.objects[e]),e.type==="GeometryCollection"?{type:"FeatureCollection",features:e.geometries.map(function(t){return p0(n,t)})}:p0(n,e)}function p0(n,e){var t=e.id,i=e.bbox,r=e.properties==null?{}:e.properties,a=vc(n,e);return t==null&&i==null?{type:"Feature",properties:r,geometry:a}:i==null?{type:"Feature",id:t,properties:r,geometry:a}:{type:"Feature",id:t,bbox:i,properties:r,geometry:a}}function vc(n,e){var t=xc(n.transform),i=n.arcs;function r(c,d){d.length&&d.pop();for(var f=i[c<0?~c:c],h=0,m=f.length;h<m;++h)d.push(t(f[h],h));c<0&&h0(d,m)}function a(c){return t(c)}function o(c){for(var d=[],f=0,h=c.length;f<h;++f)r(c[f],d);return d.length<2&&d.push(d[0]),d}function s(c){for(var d=o(c);d.length<4;)d.push(d[0]);return d}function l(c){return c.map(s)}function u(c){var d=c.type,f;switch(d){case"GeometryCollection":return{type:d,geometries:c.geometries.map(u)};case"Point":f=a(c.coordinates);break;case"MultiPoint":f=c.coordinates.map(a);break;case"LineString":f=o(c.arcs);break;case"MultiLineString":f=c.arcs.map(o);break;case"Polygon":f=l(c.arcs);break;case"MultiPolygon":f=c.arcs.map(l);break;default:return null}return{type:d,coordinates:f}}return u(e)}function ph(n,e){var t={},i={},r={},a=[],o=-1;e.forEach(function(u,c){var d=n.arcs[u<0?~u:u],f;d.length<3&&!d[1][0]&&!d[1][1]&&(f=e[++o],e[o]=u,e[c]=f)}),e.forEach(function(u){var c=s(u),d=c[0],f=c[1],h,m;if(h=r[d])if(delete r[h.end],h.push(u),h.end=f,m=i[f]){delete i[m.start];var x=m===h?h:h.concat(m);i[x.start=h.start]=r[x.end=m.end]=x}else i[h.start]=r[h.end]=h;else if(h=i[f])if(delete i[h.start],h.unshift(u),h.start=d,m=r[d]){delete r[m.end];var g=m===h?h:m.concat(h);i[g.start=m.start]=r[g.end=h.end]=g}else i[h.start]=r[h.end]=h;else h=[u],i[h.start=d]=r[h.end=f]=h});function s(u){var c=n.arcs[u<0?~u:u],d=c[0],f;return n.transform?(f=[0,0],c.forEach(function(h){f[0]+=h[0],f[1]+=h[1]})):f=c[c.length-1],u<0?[f,d]:[d,f]}function l(u,c){for(var d in u){var f=u[d];delete c[f.start],delete f.start,delete f.end,f.forEach(function(h){t[h<0?~h:h]=1}),a.push(f)}}return l(r,i),l(i,r),e.forEach(function(u){t[u<0?~u:u]||a.push([u])}),a}function mh(n){return vc(n,m0.apply(this,arguments))}function m0(n,e,t){var i,r,a;if(arguments.length>1)i=Jb(n,e,t);else for(r=0,i=new Array(a=n.arcs.length);r<a;++r)i[r]=r;return{type:"MultiLineString",arcs:ph(n,i)}}function Jb(n,e,t){var i=[],r=[],a;function o(d){var f=d<0?~d:d;(r[f]||(r[f]=[])).push({i:d,g:a})}function s(d){d.forEach(o)}function l(d){d.forEach(s)}function u(d){d.forEach(l)}function c(d){switch(a=d,d.type){case"GeometryCollection":d.geometries.forEach(c);break;case"LineString":s(d.arcs);break;case"MultiLineString":case"Polygon":l(d.arcs);break;case"MultiPolygon":u(d.arcs);break}}return c(e),r.forEach(t==null?function(d){i.push(d[0].i)}:function(d){t(d[0].g,d[d.length-1].g)&&i.push(d[0].i)}),i}var I0={createIcons:()=>Zl({icons:{Languages:wf,UserRound:Ca,Minus:Tf,Plus:If,Move3d:Yl,LockKeyhole:Fo,Hand:Ta,ArrowUpRight:Do,X:ko,PenTool:Pf,Headphones:No,Play:Bo,ChevronRight:_f,ArrowLeft:Lo,Grid2x2:ql}})},Be=document.getElementById("skm-earth-preview"),st=Be.querySelector(".earth-stage"),ew=Be.querySelector("canvas"),Zn=Be.querySelector(".earth-message"),Nc=Be.querySelector(".earth-markers"),Tc=JSON.parse(document.getElementById("skm-earth-geography").textContent),g0=JSON.parse(document.getElementById("skm-earth-cities").textContent),Cc={KR:"\uB300\uD55C\uBBFC\uAD6D",JP:"\uC77C\uBCF8",GB:"\uC601\uAD6D",FR:"\uD504\uB791\uC2A4",CA:"\uCE90\uB098\uB2E4",US:"\uBBF8\uAD6D",HK:"\uD64D\uCF69",SG:"\uC2F1\uAC00\uD3EC\uB974"};var tw=["1835848","1850147","1853909","2643743","2988507","6167865","6173331","6077243","5368361","5128581","1819729","1880252"],nw=["\uC11C\uC6B8","\uB3C4\uCFC4","\uC624\uC0AC\uCE74","\uB7F0\uB358","\uD30C\uB9AC","\uD1A0\uB860\uD1A0","\uBC34\uCFE0\uBC84","\uBAAC\uD2B8\uB9AC\uC62C","\uB85C\uC2A4\uC564\uC824\uB808\uC2A4","\uB274\uC695","\uD64D\uCF69","\uC2F1\uAC00\uD3EC\uB974"],Kt=tw.map((n,e)=>({...g0.find(t=>t.id===n),ko:nw[e],label:e===9?"NEW YORK":e===8?"LOS ANGELES":g0.find(t=>t.id===n).ascii.toUpperCase(),features:["tattoo","gloves","music","dgtg","more"]})),Lh=hh(Tc,Tc.objects.features).features,K3=mh(Tc,Tc.objects.features),Rt=5,Rn=Math.PI/180,vt=(n,e,t)=>Math.max(e,Math.min(t,n)),qa=matchMedia("(prefers-reduced-motion: reduce)").matches,Rc={lon:100,lat:24},ye={...Rc,logoMode:"survey-earth-v1",zoom:1,selected:"1835848",elasticity:60,relief:65,engraving:70,connections:!0,cityFocus:!1},pt={...Rc,zoom:1,focus:0},Wi={lon:0,lat:0,zoom:0,focus:0},it={x:0,y:0,vx:0,vy:0,tx:0,ty:0},It=736,Lt=490,_h=17,L0=17,Kn=0,Mh=0,Sh=0,Bt=null,rs=null,cs=0,wc=0,Pc=0,Cn=!1,is=null,Pn=new Map,D0=(0,Uc.createShakeDetector)(),zr=0;function hs(){zr=0,D0.reset()}function hr(n,e,t=Rt){return new z(Math.cos(n*Rn)*Math.cos(e*Rn)*t,Math.sin(n*Rn)*t,-Math.cos(n*Rn)*Math.sin(e*Rn)*t)}function pr(){clearTimeout(Sh),Sh=setTimeout(()=>{try{localStorage.setItem("skm-earth-view-v1",JSON.stringify({privateContent:{skmBlueEarth:{...ye}}}))}catch{}},180)}function iw(n){let e=n?.privateContent?.skmBlueEarth;if(e){for(let t of["lon","lat","zoom","elasticity","relief","engraving"])Number.isFinite(e[t])&&(!["lon","lat"].includes(t)||e.logoMode===ye.logoMode)&&(ye[t]=e[t]);ye.engraving=vt(ye.engraving,0,100),ye.lat=vt(ye.lat,-75,75),ye.zoom=vt(ye.zoom,.75,2.6),Kt.some(t=>t.id===e.selected)&&(ye.selected=e.selected),ye.connections=e.connections!==!1,ye.cityFocus=!1,ye.zoom=1,Object.assign(pt,{lon:ye.lon,lat:ye.lat,zoom:ye.zoom,focus:ye.cityFocus?1:0})}}try{iw(JSON.parse(localStorage.getItem("skm-earth-view-v1")||"null"))}catch{}var mr=new wl,Bn=new _n;mr.add(Bn);var Pt=new yn(46,1,.1,100),Sn;try{Sn=new bl({canvas:ew,antialias:!0,alpha:!0,powerPreference:"low-power"})}catch(n){throw Zn.textContent="\uC774 \uD654\uBA74\uC5D0\uC11C\uB294 \uC9C0\uAD6C\uBCF8\uC744 \uC2DC\uC791\uD558\uC9C0 \uBABB\uD588\uC5B4\uC694. \uBE0C\uB77C\uC6B0\uC800\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4\uC8FC\uC138\uC694.",n}Sn.setPixelRatio(Math.min(devicePixelRatio||1,2));Sn.outputColorSpace=zt;Sn.toneMapping=nf;Sn.toneMappingExposure=1.2;mr.add(new Bl("#d6e4ff",.9));var Ic=new Ol("#fffaf1",3.8);mr.add(Ic);mr.add(new Fl("#d4e7ff","#91a2b8",.55));var je=2048,Ct=1024,Fc=document.createElement("canvas"),Dh=document.createElement("canvas"),fr=Math.min(4096,Sn.capabilities.maxTextureSize),Ba=fr/2;Fc.width=fr;Fc.height=Ba;Dh.width=je;Dh.height=Ct;var Yn=Fc.getContext("2d"),us=Dh.getContext("2d",{willReadFrequently:!0}),rw=gc().scale(je/(2*Math.PI)).translate([je/2,Ct/2]),aw=gc().scale(fr/(2*Math.PI)).translate([fr/2,Ba/2]),ow=pc(aw,Yn),sw=pc(rw,us);st.dataset.surfaceResolution=fr+"\xD7"+Ba;us.fillStyle="#ffffff";for(let n of Lh)us.beginPath(),sw(n),us.fill();var Uh=us.getImageData(0,0,je,Ct).data;function Nh(n,e){let t=vt(Math.floor((n+180)/360*je),0,je-1),i=vt(Math.floor((90-e)/180*Ct),0,Ct-1);return Uh[(i*je+t)*4+3]>100}var ps=new or(Fc);ps.colorSpace=zt;ps.anisotropy=Math.min(8,Sn.capabilities.getMaxAnisotropy());var yc=null,bh=null,gh=null,di=null,Fa=null,wh=null,Ah=null,dr={lon:-158,lat:3,width:56,height:28},Fh=document.createElement("canvas");Fh.width=je;Fh.height=Ct;var ns=Fh.getContext("2d",{willReadFrequently:!0}),Oc=document.createElement("canvas");Oc.width=je;Oc.height=Ct;var x0=Oc.getContext("2d"),Eh=new or(Oc);Eh.anisotropy=Math.min(8,Sn.capabilities.getMaxAnisotropy());function ms(){if(Yn.fillStyle="#042444",Yn.fillRect(0,0,fr,Ba),wh)Yn.drawImage(wh,0,0,fr,Ba);else{Yn.fillStyle="#466356";for(let n of Lh)Yn.beginPath(),ow(n),Yn.fill()}Fa&&(Yn.save(),Yn.globalCompositeOperation="source-over",Yn.globalAlpha=ye.engraving/100*.76,Yn.drawImage(Fa,0,0,fr,Ba),Yn.restore()),ps.needsUpdate=!0}ms();var fi=new Co({map:ps,roughness:.9,metalness:0,bumpScale:.025,transparent:!0}),gs={value:Wl(new Date)};fi.userData.solar=gs;fi.onBeforeCompile=n=>{n.uniforms.skmSun=gs,n.vertexShader=`varying vec3 skmEarthNormal;
`+n.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
 skmEarthNormal=normalize(position);`),n.fragmentShader=n.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
 float surveyLuma=dot(diffuseColor.rgb,vec3(.2126,.7152,.0722)); diffuseColor.rgb=mix(vec3(surveyLuma),diffuseColor.rgb,.24)*vec3(.8,.94,.96);`),n.fragmentShader=`uniform vec3 skmSun; varying vec3 skmEarthNormal;
`+n.fragmentShader.replace("#include <opaque_fragment>",`outgoingLight*=mix(.66,1.,smoothstep(-.18,.18,dot(normalize(skmEarthNormal),skmSun)));
#include <opaque_fragment>`)};var Bc=document.createElement("canvas");Bc.width=je;Bc.height=Ct;var Oh=Bc.getContext("2d"),Ei=Oh.createImageData(je,Ct);for(let n=0;n<Ei.data.length;n+=4){let e=Uh[n+3]>100?235:72;Ei.data[n]=Ei.data[n+1]=Ei.data[n+2]=e,Ei.data[n+3]=255}Oh.putImageData(Ei,0,0);fi.roughnessMap=new or(Bc);var v0=matchMedia("(pointer:coarse)").matches?320:480,Oa=new Wn(Rt,v0,v0/2),xh=new Float32Array(Oa.attributes.position.array),U0=new Ft(Oa,fi);Bn.add(U0);var Th=tg(Bn,hr,Nh,Rt);function y0(n,e){let t=Math.floor(n),i=Math.floor(e),r=n-t,a=e-i,o=r*r*(3-2*r),s=a*a*(3-2*a),l=(d,f)=>{let h=Math.sin(d*127.1+f*311.7)*43758.5453;return h-Math.floor(h)},u=l(t,i)*(1-o)+l(t+1,i)*o,c=l(t,i+1)*(1-o)+l(t+1,i+1)*o;return u*(1-s)+c*s}function lw(n,e){let t=y0(n*.11,e*.11)*2.4,i=r=>Math.pow(1-Math.abs(2*y0(n*r+t,e*r-t)-1),2);return .38+.34*i(.2)+.19*i(.43)+.09*i(.91)}function cw(n,e){if(!di)return 0;let t=vt(n*(je-1),0,je-1),i=vt((1-e)*(Ct-1),0,Ct-1),r=Math.floor(t),a=Math.floor(i),o=Math.min(r+1,je-1),s=Math.min(a+1,Ct-1),l=t-r,u=i-a,c=di[a*je+r]*(1-l)+di[a*je+o]*l,d=di[s*je+r]*(1-l)+di[s*je+o]*l;return c*(1-u)+d*u}function N0(){let n=x0.createImageData(je,Ct),e=ye.engraving/100;for(let t=0;t<n.data.length;t+=4){let i=bh?bh[t]*.3:0,r=di?di[t/4]*145*e:0,a=vt(Math.round(100+i+r),0,255);n.data[t]=n.data[t+1]=n.data[t+2]=a,n.data[t+3]=255}x0.putImageData(n,0,0),Eh.needsUpdate=!0,fi.bumpMap=Eh,fi.needsUpdate=!0}function uw(){if(!di||Ah===ye.engraving)return;Ah=ye.engraving;let n=Oa.attributes.position,e=Oa.attributes.uv,t=.11*ye.engraving/100,i=0,r=Rt,a=0;for(let o=0;o<n.count;o++){let s=cw(e.getX(o),e.getY(o))*t,l=(Rt+s)/Rt,u=o*3;n.setXYZ(o,xh[u]*l,xh[u+1]*l,xh[u+2]*l),s>1e-4&&i++,r=Math.min(r,Rt+s),a=Math.max(a,Rt+s)}n.needsUpdate=!0,Oa.computeVertexNormals(),Oa.computeBoundingSphere(),st.dataset.logoRelief="raised-ocean-ridge",st.dataset.logoLongitude=String(dr.lon),st.dataset.logoLatitude=String(dr.lat),st.dataset.raisedVertices=String(i),st.dataset.minimumRadius=r.toFixed(4),st.dataset.maximumRadius=a.toFixed(4),st.dataset.engraving=String(ye.engraving),N0(),ms(),lt()}function _0(){let n=Be.querySelector(".earth-logo img");if(!n.naturalWidth)return;let e=(dr.lon+180-dr.width/2)/360*je,t=(90-dr.lat-dr.height/2)/180*Ct,i=dr.width/360*je,r=dr.height/180*Ct;ns.clearRect(0,0,je,Ct),ns.filter="blur(1px)";for(let s of[-je,0,je])ns.drawImage(n,127,395,1020,507,e+s,t,i,r);ns.filter="none",gh=ns.getImageData(0,0,je,Ct).data,di=new Float32Array(je*Ct),Fa=document.createElement("canvas"),Fa.width=je,Fa.height=Ct;let a=Fa.getContext("2d"),o=a.createImageData(je,Ct);for(let s=Math.max(0,Math.floor(t)-5);s<Math.min(Ct,Math.ceil(t+r)+5);s++)for(let l=Math.floor(e)-5;l<Math.ceil(e+i)+5;l++){let u=(l%je+je)%je,c=s*je+u,d=c*4,f=gh[d+3]/255;if(!f)continue;let h=lw(l-e,s-t);di[c]=Math.pow(f,.85)*h,o.data[d]=9+h*20,o.data[d+1]=47+h*55,o.data[d+2]=72+h*58,o.data[d+3]=Math.round(f*220);let m=72+133*f;Ei.data[d]=Ei.data[d+1]=Ei.data[d+2]=m}a.putImageData(o,0,0),Oh.putImageData(Ei,0,0),fi.roughnessMap.needsUpdate=!0,Th.setLogo(gh,di,je,Ct,ye.engraving/100),st.dataset.logoDots=String(Th.logoCount()),Ah=null,uw()}var Ch=new Vn({side:Qt,toneMapped:!1,depthWrite:!1,depthTest:!1}),gr=new Ft(new Wn(70,64,32),Ch);gr.rotation.set(27*Rn,36*Rn,0,"YXZ");gr.renderOrder=-100;gr.visible=!1;mr.add(gr);new sr().load("app/earth-assets/deep-star-map.jpg",n=>{n.colorSpace=zt,Ch.map=n,Ch.needsUpdate=!0,gr.visible=!0,st.dataset.starTexture="loaded",lt()});var ds=ig(mr,gr,st,lt),F0=new sr;F0.load("app/earth-assets/earth-day.jpg",n=>{wh=n.image,st.dataset.dayTexture="loaded",ms(),n.colorSpace=zt,n.anisotropy=Math.min(8,Sn.capabilities.getMaxAnisotropy()),fi.map=ps,fi.needsUpdate=!0,n.dispose(),lt()},void 0,()=>{Zn.textContent="\uC9C0\uAD6C \uD45C\uBA74 \uC774\uBBF8\uC9C0\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC5B4\uC694."});var ka=new Co({transparent:!0,opacity:.92,depthWrite:!1,roughness:1}),dw=2*Math.PI/240,za=new Ft(new Wn(Rt*1.018,128,64),ka);za.visible=!1;Bn.add(za);F0.load("app/earth-assets/earth-clouds.png",n=>{n.colorSpace=zt,n.anisotropy=Math.min(8,Sn.capabilities.getMaxAnisotropy()),ka.map=n,ka.needsUpdate=!0,za.visible=!0,st.dataset.cloudTexture="loaded",lt()},void 0,()=>{Zn.textContent="\uAD6C\uB984 \uC774\uBBF8\uC9C0\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC5B4\uC694."});new sr().load("app/earth-assets/earth-topology.png",n=>{n.anisotropy=Math.min(8,Sn.capabilities.getMaxAnisotropy());let e=document.createElement("canvas");e.width=je,e.height=Ct;let t=e.getContext("2d");t.drawImage(n.image,0,0,je,Ct);try{let i=t.getImageData(0,0,je,Ct).data;bh=i,yc=document.createElement("canvas"),yc.width=je,yc.height=Ct;let r=yc.getContext("2d"),a=r.createImageData(je,Ct);for(let o=1;o<Ct-1;o++)for(let s=1;s<je-1;s++){let l=(o*je+s)*4;if(Uh[l+3]<100)continue;let u=(i[l-4]-i[l+4])*.7+(i[l-je*4]-i[l+je*4])*.9,c=u<0?[65,105,142]:[255,255,255];a.data[l]=c[0],a.data[l+1]=c[1],a.data[l+2]=c[2],a.data[l+3]=Math.min(155,Math.abs(u)*6)}r.putImageData(a,0,0),N0(),ms()}catch{}n.dispose(),lt()},void 0,()=>{Zn.textContent="\uC9C0\uD615 \uC74C\uC601\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD574 \uAD6D\uAC00 \uC724\uACFD\uC73C\uB85C \uD45C\uC2DC\uD558\uACE0 \uC788\uC5B4\uC694."});var Bh=[];for(let n=-78;n<84;n+=.7){let e=.7/Math.max(.25,Math.cos(n*Rn));for(let t=-180;t<180;t+=e){let i=Math.sin(n*197+t*153)*.2;if(Nh(t+i,n-i)){let r=hr(n-i,t+i,Rt+.006);Bh.push(r.x,r.y,r.z)}}}var $3=new Float32Array(Bh),fw=new Si(new Vt().setAttribute("position",new Tt(Bh,3)),new si({color:"#7198b8",size:.009,transparent:!0,opacity:.24,depthWrite:!1}));fw.visible=!1;var kh=new Ft(new Wn(Rt*1.014,96,64),new Tn({transparent:!0,depthWrite:!1,uniforms:{tint:{value:new Je("#1f9fe5")},lightDirection:{value:new z(1,1,1).normalize()}},vertexShader:"varying vec3 n; varying vec3 v; void main(){vec4 p=modelViewMatrix*vec4(position,1.);n=normalize(normalMatrix*normal);v=normalize(-p.xyz);gl_Position=projectionMatrix*p;}",fragmentShader:"uniform vec3 tint;uniform vec3 lightDirection;varying vec3 n;varying vec3 v;void main(){float rim=pow(1.-max(0.,dot(normalize(n),normalize(v))),2.4);float day=smoothstep(-.25,.7,dot(normalize(n),normalize(lightDirection)));gl_FragColor=vec4(tint,rim*day*.94);}"}));Bn.add(kh);var M0=new z,S0=new z,xs=new _n;Bn.add(xs);var O0=[],b0=Kt[0];for(let n of Kt.slice(1)){let e=Yf([b0.lon,b0.lat],[n.lon,n.lat]),t=e.distance,i=[];for(let r=0;r<=96;r++){let a=r/96,[o,s]=e(a);i.push(hr(s,o,Rt+.025+Math.sin(a*Math.PI)*Math.min(.65,t*.32)))}O0.push(i),xs.add(new Sa(new Vt().setFromPoints(i),new Ur({color:"#7ebfff",transparent:!0,opacity:.27})))}var kc=lg(O0);kc.group.scale.setScalar(1);kc.group.children.forEach(n=>n.scale.setScalar(.045));xs.add(kc.group);var fs=cg(Kt,hr,Nh,Rt);Bn.add(fs);fs.material.userData.solar=gs;fs.material.onBeforeCompile=n=>{n.uniforms.skmSun=gs,n.vertexShader=`uniform vec3 skmSun; varying float lightLevel;
`+n.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
 lightLevel=1.-smoothstep(-.22,.08,dot(normalize(position),skmSun));`),n.fragmentShader=`varying float lightLevel;
`+n.fragmentShader.replace("#include <opaque_fragment>",`diffuseColor.a*=lightLevel;
#include <opaque_fragment>`)};var _c=0,as=null,w0=-1,Mc=0,Ha=0;function B0(n){as!==null&&!qa&&(_c+=Math.min((n-as)/1e3,.3)),as=n;let e=Date.now(),t=Math.floor(e/6e4);if(w0!==t){w0=t;let r=new Date(e),a=Wl(r);Mc=sg(r,a),gs.value.copy(a),ds.date(r,a),Ic.intensity=3.8-1.9*Mc,ka.opacity=.92-.26*Mc,fs.material.opacity=Mc*.7+.25}za.rotation.y=_c*dw,kc.update(_c);let i=pt.focus;Th.update(i,_c),U0.visible=i>.005,fi.opacity=i,za.visible=i>.005&&!!ka.map,ka.opacity=i*.55,kh.visible=i>.025,xs.visible=ye.connections&&i>.3,fs.visible=!1,gr.visible=!1,st.dataset.cloudAngle=za.rotation.y.toFixed(5),st.dataset.mapMode=i>.5?"terrain":"survey"}function Hr(){return!document.hidden&&!document.body.classList.contains("bm-open")&&!document.body.classList.contains("district-open")&&!Be.classList.contains("feature-open")&&!document.querySelector("dialog[open]")}function k0(){clearTimeout(Ha),Hr()&&(Ha=setTimeout(()=>{!Hr()||Kn||(B0(performance.now()),Sn.render(mr,Pt),Z0(),k0())},qa?3e4:65))}for(let n of Kt)n.point=hr(n.lat,n.lon,Rt+.025);var Lc=Be.querySelector("select"),A0=Be.querySelector(".earth-city-title h2"),hw=Be.querySelector(".earth-country"),os=Be.querySelector(".earth-focus-label");for(let n of Object.keys(Cc)){let e=document.createElement("optgroup");e.label=Cc[n];for(let t of Kt.filter(i=>i.country===n)){let i=document.createElement("option");i.value=t.id,i.textContent=t.ko,e.appendChild(i)}Lc.appendChild(e)}var J3=Be.querySelector(".earth-drop-panel"),j3=Be.querySelector(".earth-drop-grid"),Ci=Be.querySelector(".earth-booking-panel"),E0=Be.querySelector(".earth-features"),pw={dgtg:{icon:"grid-2x2",title:"DGTG-01",menu:"DGTG-01",subtitle:""},gloves:{icon:"hand",title:"\uC7A5\uAC11 \uB4DC\uB86D",menu:"GLOVE DROP",subtitle:"\uC7A5\uAC11 \uD53D\uC5C5"},tattoo:{icon:"pen-tool",title:"\uC138\uC158 \uC608\uC57D",menu:"SESSION BOOKING",subtitle:"\uC138\uC158 \uC608\uC57D"},music:{icon:"headphones",title:"\uC74C\uC545",menu:"SOUND SYSTEM",subtitle:"\uB3C4\uC2DC\uC758 \uC74C\uC545"},more:{icon:"grid-2x2",title:"\uAE30\uD0C0 \uAE30\uB2A5",menu:"EXPLORE",subtitle:"\uAE30\uD0C0 \uAE30\uB2A5"}},hi=Rg(Be,Lh);function mw(n){$n(),Ci.hidden=!0,hi.render(n),hi.setOpen(!0)}mg(Be);var In=Be.querySelector(".earth-music-panel"),Gt=In.querySelector("audio"),Rh=In.querySelector(".earth-music-play"),ss=In.querySelector(".earth-music-seek"),Dc=In.querySelector(".earth-music-error"),gw="assets/music/",z0={1835848:"bogwangdong-59",1850147:"3HM",1853909:"BABIapk",2643743:"rh042",2988507:"paris-1",6167865:"skinomakase-2025",6173331:"sleep",6077243:"wolf-guide",5368361:"never-stop",5128581:"banban",1819729:"my-love-cantonese",1880252:"skinomakase-2025"},H0=n=>z0[n.id].replaceAll("-"," "),Ph=null;function T0(n){return Number.isFinite(n)?Math.floor(n/60)+":"+String(Math.floor(n%60)).padStart(2,"0"):"\u2014:\u2014"}function vs(){let n=!Gt.paused&&!Gt.ended,e=Number.isFinite(Gt.duration)&&Gt.duration>0;Rh.setAttribute("aria-label",n?"\uC77C\uC2DC\uC815\uC9C0":"\uC7AC\uC0DD"),Rh.querySelector("span").textContent=n?"PAUSE":"PLAY",In.dataset.playing=String(n),In.dataset.city=Ph||"",In.querySelector('[data-audio-time="elapsed"]').textContent=T0(Gt.currentTime),In.querySelector('[data-audio-time="duration"]').textContent=T0(Gt.duration),ss.disabled=!e,ss.max=e?Gt.duration:100,ss.value=Gt.currentTime||0}function $n(){Gt.pause(),In.hidden=!0}function xw(n){hi.setOpen(!1),Ci.hidden=!0,In.hidden=!1,In.querySelector("h2").textContent=n.label.toLowerCase().replace(/\b[a-z]/g,e=>e.toUpperCase()),In.querySelector("h3").textContent=H0(n),Ph!==n.id&&(Gt.pause(),Ph=n.id,Dc.textContent="",Gt.src=gw+z0[n.id]+".mp3",Gt.preload="metadata",Gt.load()),vs()}Rh.addEventListener("click",async()=>{if(!Gt.paused){Gt.pause();return}Dc.textContent="";try{await Gt.play()}catch{Dc.textContent="\uC74C\uC6D0\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC5B4\uC694. \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694."}vs()});In.querySelector(".earth-music-close").addEventListener("click",$n);ss.addEventListener("input",()=>{Number.isFinite(Gt.duration)&&(Gt.currentTime=Number(ss.value)),vs()});for(let n of["play","pause","ended","timeupdate","loadedmetadata","emptied"])Gt.addEventListener(n,vs);Gt.addEventListener("error",()=>{Dc.textContent="\uC74C\uC6D0\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC5B4\uC694. \uC5F0\uACB0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD574\uC8FC\uC138\uC694.",vs()});Be.addEventListener("keydown",n=>{n.key==="Escape"&&(Be.querySelector(".earth-extra-menu").hidden=!0,$n(),hi.setOpen(!1),Ci.hidden=!0)});function V0(n){E0.replaceChildren();for(let e of n.features){let t=pw[e];if(!t)continue;let i=document.createElement("button");i.type="button",i.className="earth-feature cursor-interaction",i.dataset.feature=e,i.setAttribute("aria-label",n.ko+" "+t.title+" \uBCF4\uAE30"),i.innerHTML='<span class="earth-feature-icon"><i data-lucide="'+t.icon+'" aria-hidden="true"></i></span><span><strong>'+t.menu+"</strong><small>"+(e==="music"?H0(n):t.subtitle)+'</small></span><i data-lucide="chevron-right" aria-hidden="true"></i>',i.addEventListener("click",()=>{e!=="more"&&(Be.querySelector(".earth-extra-menu").hidden=!0),e==="more"?($n(),hi.setOpen(!1),Ci.hidden=!0,Be.querySelector(".earth-extra-menu").hidden=!Be.querySelector(".earth-extra-menu").hidden):e==="music"?xw(n):e==="dgtg"?window.open("https://4thdeath.com/products/dgtg-01","_blank","noopener,noreferrer"):e==="gloves"?mw(n):bw(n),pr()}),E0.appendChild(i)}I0.createIcons()}function vw(n){hi.render(n)}function G0(){let n=Kt.find(t=>t.id===ye.selected);Lc.value=n.id,hw.textContent=Cc[n.country],A0.replaceChildren(document.createTextNode(n.label));let e=document.createElement("span");e.textContent=n.ko,A0.appendChild(e),Be.querySelector(".survey-coordinates").textContent=Math.abs(n.lat).toFixed(2)+"\xB0 "+(n.lat>=0?"N":"S")+" / "+Math.abs(n.lon).toFixed(2)+"\xB0 "+(n.lon>=0?"E":"W"),vw(n),os.querySelector("span").textContent=Cc[n.country],os.querySelector("strong").textContent=n.label,V0(n)}function zc(n,e=!0){hs(),Vr.dismissSatellite(),Vr.hide(),Be.querySelector(".survey-cities").hidden=!0,Be.querySelector("[data-survey=cities]").setAttribute("aria-expanded","false"),Vc();let t=Kt.find(i=>i.id===n);t&&(ye.selected!==t.id&&(Be.querySelector(".earth-extra-menu").hidden=!0,$n(),hi.setOpen(!1),Ci.hidden=!0),ye.selected=t.id,e&&(ye.cityFocus=!0,ye.zoom=1,ys(),ye.lon=pt.lon+(((t.lon-pt.lon+180)%360+360)%360-180),ye.lat=t.lat-18),ms(),G0(),lt(),pr())}var ls=Be.querySelector(".survey-cities");for(let n of Kt){let e=document.createElement("button");e.type="button",e.textContent=n.label,e.onclick=()=>zc(n.id),ls.append(e)}Be.querySelector("[data-survey=cities]").onclick=n=>{ls.hidden=!ls.hidden,n.currentTarget.setAttribute("aria-expanded",String(!ls.hidden))};Be.querySelector(".survey-date").textContent=new Date().toISOString().slice(0,10).replaceAll("-"," / ");var W0=Be.querySelector(".earth-world");function ys(){Be.classList.toggle("city-focus",ye.cityFocus),Be.dataset.view=ye.cityFocus?"city":"world",W0.hidden=!ye.cityFocus,Be.querySelector(".earth-city-panel").hidden=!ye.cityFocus}ys();W0.addEventListener("click",Hh);Lc.addEventListener("change",()=>zc(Lc.value));Ci.querySelector("button").addEventListener("click",()=>Ci.hidden=!0);Be.querySelector(".earth-glove-close").addEventListener("click",()=>{let n=Be.querySelector(".earth-feature[data-feature="+(Be.classList.contains("gloves-open")?"gloves":In.hidden?"more":"music")+"]");hi.setOpen(!1),$n(),Ci.hidden=!0,Be.querySelector(".earth-extra-menu").hidden=!0,requestAnimationFrame(()=>n?.focus({preventScroll:!0}))});G0();I0.createIcons();var q0=!0,X0=[],Hc=document.createElementNS("http://www.w3.org/2000/svg","svg");Hc.classList.add("earth-pin-leaders");Hc.setAttribute("aria-hidden","true");Nc.append(Hc);var yw=Kt.map(()=>{let n=document.createElementNS("http://www.w3.org/2000/svg","line");return Hc.append(n),n});for(let n=0;n<Kt.length;n++){let e=document.createElement("button");e.type="button",e.className="earth-pin cursor-interaction",e.hidden=!0,e.innerHTML='<span class="earth-cluster-count" hidden></span><span class="survey-pin-label"></span>',e.addEventListener("click",()=>{if(performance.now()<cs)return;let t=e.dataset.ids.split(","),i=t.indexOf(ye.selected);zc(t[(i+1)%t.length])}),Nc.appendChild(e),X0.push(e)}function vh(n){let e=n.clone().project(Pt);return{x:(e.x*.5+.5)*It,y:(-.5*e.y+.5)*Lt}}var Y0=ag(Nc,(n,e)=>hr(n,e,Rt+.04),n=>window.SKMLanguage?.t(n)||n,()=>performance.now()>=cs),Vr=pp({root:Be,layer:Nc,vector:hr,R:Rt,cities:Kt,selectedCity:()=>Kt.find(n=>n.id===ye.selected),wake:lt,setCameras:n=>{q0=n,lt()},openCamera:n=>Y0.open(n),isVisible:()=>Hr(),followPoint:(n,e)=>{ye.lon=pt.lon+(((e-pt.lon+180)%360+360)%360-180),ye.lat=n,lt()},focusPoint:(n,e)=>{ye.cityFocus=!1,ys(),ye.lon=pt.lon+(((e-pt.lon+180)%360+360)%360-180),ye.lat=n,ye.zoom=1.15,lt(),pr()}}),Va=document.createElement("div"),Ti=document.createElement("span");Va.className="sky-finder";Ti.className="sky-target-name";Ti.hidden=!0;st.append(Ti);Be.querySelector(".earth-app").append(Va);var C0={ko:["\uD0DC\uC591","\uB2EC"],en:["Sun","Moon"],ja:["\u592A\u967D","\u6708"],zh:["\u592A\u9633","\u6708\u4EAE"],"zh-Hant":["\u592A\u967D","\u6708\u4EAE"],ru:["\u0421\u043E\u043B\u043D\u0446\u0435","\u041B\u0443\u043D\u0430"],fr:["Soleil","Lune"],es:["Sol","Luna"],de:["Sonne","Mond"],pt:["Sol","Lua"],it:["Sole","Luna"]},Ga=null;function zh(){let n=C0[window.SKMLanguage?.code]||C0.en;[...Va.children].forEach((e,t)=>{e.title=n[t],e.setAttribute("aria-label",n[t])}),Ga&&(Ti.textContent=n[Ga==="sun"?0:1])}function Vc(){Ga=null,Ti.hidden=!0;for(let n of Va.children)n.setAttribute("aria-pressed","false")}for(let[n,e]of[["sun","\u2600"],["moon","\u263E"]]){let t=document.createElement("button");t.type="button",t.dataset.aim=n,t.textContent=e,t.setAttribute("aria-pressed","false"),Va.append(t),t.onclick=()=>{let i=new Date;ds.date(i,Wl(i));let r=ds.direction(n),a=Math.atan2(-r.z,r.x)/Rn+180;ye.lon=pt.lon+(((a-pt.lon+180)%360+360)%360-180),ye.lat=vt(-Math.asin(r.y)/Rn+Math.atan(.6*Math.tan(Pt.fov*Rn/2))/Rn,-75,75),ye.zoom=.85,Ga=n,zh(),it.tx=it.ty=0;for(let o of Va.children)o.setAttribute("aria-pressed",String(o===t));lt()}}window.addEventListener("skm-language",zh);zh();function Z0(){if(Ga&&!ye.cityFocus){let i=ds.screenPoint(Ga,Pt);Ti.hidden=i.z>=1||i.z<0||Math.abs(i.x)>.94||Math.abs(i.y)>.85,Ti.hidden||(Ti.style.left=(i.x+1)*It/2+"px",Ti.style.top=(1-i.y)*Lt/2+17+"px")}else Ti.hidden=!0;let n=Pt.position.clone().normalize(),e=[],t=null;for(let i of Kt){if(ye.cityFocus&&i.id!==ye.selected)continue;let r=Bn.localToWorld(i.point.clone());if(r.clone().normalize().dot(n)<Rt/Pt.position.length()+.015)continue;let o=vh(r);o.x<12||o.x>It-12||o.y<14||o.y>Lt-64||(i.id===ye.selected&&(t=o),e.push({x:o.x,y:o.y,anchorX:o.x,anchorY:o.y,ids:[i.id]}))}for(let i=0;i<16;i++)for(let r=0;r<e.length;r++)for(let a=r+1;a<e.length;a++){let o=e[r],s=e[a],l=s.x-o.x,u=s.y-o.y,c=Math.hypot(l,u);if(c>=48)continue;c<.001&&(l=0,u=1,c=1);let d=(48-c)/2,f=l/c,h=u/c;o.x=vt(o.x-f*d,28,It-28),o.y=vt(o.y-h*d,28,Lt-64),s.x=vt(s.x+f*d,28,It-28),s.y=vt(s.y+h*d,28,Lt-64)}yw.forEach((i,r)=>{let a=e[r],o=a&&Math.hypot(a.x-a.anchorX,a.y-a.anchorY)>4;i.style.display=o?"":"none",o&&(i.setAttribute("x1",a.anchorX),i.setAttribute("y1",a.anchorY),i.setAttribute("x2",a.x),i.setAttribute("y2",a.y))}),X0.forEach((i,r)=>{let a=e[r];if(i.hidden=!a,i.style.display=a?"grid":"none",!a)return;i.style.left=a.x+"px",i.style.top=a.y+"px",i.dataset.ids=a.ids.join(","),i.dataset.cityName=Kt.find(s=>s.id===a.ids[0])?.label||"",i.dataset.labelSide=a.x>It-115?"left":"right",i.querySelector(".survey-pin-label").textContent=Kt.find(s=>s.id===a.ids[0]).label,i.setAttribute("aria-label",a.ids.map(s=>Kt.find(l=>l.id===s).ko).join(" \xB7 ")+" \uB3C4\uC2DC \uAE30\uB2A5 \uBCF4\uAE30"),i.setAttribute("aria-pressed",String(a.ids.includes(ye.selected)));let o=i.firstElementChild;o.hidden=a.ids.length===1,o.style.display=a.ids.length===1?"none":"grid",o.textContent=a.ids.length}),Y0(i=>{if(!q0)return null;let r=Bn.localToWorld(i.clone());if(r.clone().normalize().dot(n)<Rt/Pt.position.length()+.015)return null;let a=vh(r);return a.x<10||a.x>It-10||a.y<24||a.y>Lt-32?null:a},e,It,Lt),Vr.render(i=>{let r=Bn.localToWorld(i.clone());if(r.clone().normalize().dot(n)<Rt/Pt.position.length()+.015)return null;let a=vh(r);return a.x<20||a.x>It-20||a.y<60||a.y>Lt-80?null:a}),os.style.display=t?"flex":"none",t&&(os.style.left=vt(t.x+18,10,It-125)+"px",os.style.top=vt(t.y+15,12,Lt-95)+"px")}function Sc(n,e,t,i,r,a=115,o=21){return qa||(n[t]+=(i-n[e])*a*r,n[t]*=Math.exp(-o*r),n[e]+=n[t]*r,Math.abs(n[e]-i)<3e-4&&Math.abs(n[t])<3e-4)?(n[e]=i,n[t]=0,!1):!0}function _w(n){Kn=0;let e=Math.min((n-Mh)/1e3||1/60,1/30);Mh=n;let t=!1;if(zr&&!Hr()&&hs(),zr){let s=(0,Uc.stepGlobeSpin)(zr,e);ye.lon+=s.delta,pt.lon=ye.lon,Wi.lon=0,zr=s.speed,t=!0,zr||pr()}for(let s of["lon","lat","zoom"]){let l={p:pt[s],v:Wi[s]};t=Sc(l,"p","v",ye[s],e)||t,pt[s]=l.p,Wi[s]=l.v}let i={p:pt.focus,v:Wi.focus};t=Sc(i,"p","v",ye.cityFocus?1:0,e,100,19)||t,pt.focus=vt(i.p,0,1),Wi.focus=i.v,Pt.setViewOffset(It,Lt,-It*.3*pt.focus,0,It,Lt);let r=ye.elasticity/100;t=Sc(it,"x","vx",it.tx,e,110-r*50,21-r*8)||t,t=Sc(it,"y","vy",it.ty,e,110-r*50,21-r*8)||t;let a=_h+(L0-_h)*pt.focus,o=Rt+(a-Rt)/pt.zoom;Pt.position.copy(hr(pt.lat+it.y*.9,pt.lon+it.x*1.2,o)),gr.position.copy(Pt.position),Pt.lookAt(0,0,0),Pt.setViewOffset(It,Lt,-It*.18*pt.focus,-Lt*.78*pt.focus,It,Lt),Pt.updateProjectionMatrix(),Pt.updateMatrixWorld(),M0.setFromMatrixColumn(Pt.matrixWorld,0),S0.setFromMatrixColumn(Pt.matrixWorld,1),Ic.position.copy(Pt.position).normalize().multiplyScalar(15).addScaledVector(M0,22).addScaledVector(S0,10),kh.material.uniforms.lightDirection.value.copy(Ic.position).transformDirection(Pt.matrixWorldInverse),Bn.scale.set(1+it.x*.006,1-it.x*.004+it.y*.004,1),Bn.rotation.z=it.x*.004,Bn.updateMatrixWorld(!0),fi.bumpScale=.015+ye.relief/100*.025,xs.visible=ye.connections,ds.view(Pt),B0(n),Sn.render(mr,Pt),Z0(),Be.querySelector('[data-view="reset"]').textContent=Math.round(pt.zoom*100)+"%",st.dataset.zoom=String(Math.round(pt.zoom*100)),st.dataset.longitude=String(Math.round(pt.lon)),st.dataset.city=ye.selected,st.dataset.focus=pt.focus.toFixed(3),st.dataset.tilt=String(Math.round(Math.hypot(it.x,it.y)*100)),t?lt():k0()}function lt(){clearTimeout(Ha),!Kn&&!document.hidden&&!document.body.classList.contains("bm-open")&&!document.body.classList.contains("district-open")&&(Kn=requestAnimationFrame(_w))}function K0(){let n=st.getBoundingClientRect();if(n.width<1||n.height<1)return;It=n.width,Lt=n.height,Pt.aspect=It/Lt,Pt.setViewOffset(It,Lt,0,0,It,Lt),Pt.updateProjectionMatrix(),Sn.setSize(It,Lt,!1);let e=Math.min(It*.39,Lt*.29),t=Lt/(2*Math.tan(Pt.fov*Rn/2));_h=Math.sqrt(Math.pow(t*Rt/e,2)+Rt*Rt);let i=Lt*1.15;L0=Math.sqrt(Math.pow(t*Rt/i,2)+Rt*Rt),lt()}new ResizeObserver(K0).observe(st);K0();Zn.textContent="";function Gc(n){ye.zoom=vt(n,.75,2.6),lt(),pr()}function Hh(){hs(),Vr.dismissSatellite(),Vc(),Object.assign(ye,{lon:pt.lon+(((Rc.lon-pt.lon+180)%360+360)%360-180),lat:Rc.lat,zoom:1,cityFocus:!1}),$n(),hi.setOpen(!1),Ci.hidden=!0,Be.querySelector(".earth-extra-menu").hidden=!0,ys(),it.tx=it.ty=0,lt(),pr()}Be.querySelector('[data-view="in"]').addEventListener("click",()=>Gc(ye.zoom*1.25));Be.querySelector('[data-view="out"]').addEventListener("click",()=>Gc(ye.zoom/1.25));Be.querySelector('[data-view="reset"]').addEventListener("click",Hh);Be.querySelector(".earth-brand").addEventListener("click",Sw);Be.querySelector(".earth-brand").setAttribute("aria-label","\uB85C\uADF8\uC778 \xB7 \uB0B4 \uB300\uD654");Be.querySelector(".earth-zoom").addEventListener("keydown",n=>{(n.key==="ArrowLeft"||n.key==="ArrowRight")&&(n.preventDefault(),ye.lon+=n.key==="ArrowRight"?18:-18,lt(),pr())});function Vh(n){return n.closest(".earth-zoom,.earth-tilt,.earth-message")}st.addEventListener("wheel",n=>{Vh(n.target)||(n.preventDefault(),Gc(ye.zoom*Math.exp(-vt(n.deltaY*(n.deltaMode===1?16:1),-100,100)*.003)))},{passive:!1});function $0(n,e,t,i){return Vr.stopFollowing(),{id:n,x:e,y:t,lon:pt.lon,lat:pt.lat,lastX:e,lastY:t,lastTime:i,speedX:0,speedY:0,moved:!1}}st.addEventListener("pointerdown",n=>{if(!Vh(n.target)){if(hs(),Vc(),Pn.set(n.pointerId,{x:n.clientX,y:n.clientY}),Pn.size===1)Bt=$0(n.pointerId,n.clientX,n.clientY,performance.now());else if(Pn.size===2){let[e,t]=Pn.values();rs={distance:Math.max(1,Math.hypot(e.x-t.x,e.y-t.y)),zoom:ye.zoom},Bt=null;for(let i of Pn.keys())st.setPointerCapture(i);cs=performance.now()+500}}});st.addEventListener("pointermove",n=>{if(!Pn.has(n.pointerId)){if(n.pointerType==="mouse"&&!Cn&&!Vh(n.target)){let c=st.getBoundingClientRect();it.tx=vt((n.clientX-c.left-It/2)/(It/2),-1,1)*.6,it.ty=vt((n.clientY-c.top-Lt/2)/(Lt/2),-1,1)*.6,lt()}return}if(Pn.set(n.pointerId,{x:n.clientX,y:n.clientY}),Pn.size>=2&&rs){let[c,d]=Pn.values();ye.zoom=vt(rs.zoom*Math.hypot(c.x-d.x,c.y-d.y)/rs.distance,.75,2.6),cs=performance.now()+500,lt();return}if(!Bt||Bt.id!==n.pointerId)return;let e=n.clientX-Bt.x,t=n.clientY-Bt.y;if(!Bt.moved&&Math.hypot(e,t)<4)return;let i=performance.now(),r=Math.max(8,i-Bt.lastTime),a=195/(It*ye.zoom),o=154/(Lt*ye.zoom),s=1-Math.exp(-r/30),l=-(n.clientX-Bt.lastX)*a/r,u=(n.clientY-Bt.lastY)*o/r;Bt.speedX+=(l-Bt.speedX)*s,Bt.speedY+=(u-Bt.speedY)*s,Bt.lastX=n.clientX,Bt.lastY=n.clientY,Bt.lastTime=i,Bt.moved=!0,st.setPointerCapture(n.pointerId),cs=i+350,ye.lon=Bt.lon-e*a,ye.lat=vt(Bt.lat+t*o,-75,75),pt.lon=ye.lon,pt.lat=ye.lat,Wi.lon=0,Wi.lat=0,Cn||(it.tx=vt(e/85,-1,1),it.ty=vt(t/85,-1,1)),lt()});function J0(n){let e=Bt;if(Pn.delete(n.pointerId)){if(st.hasPointerCapture(n.pointerId)&&st.releasePointerCapture(n.pointerId),n.type==="pointerup"&&!qa&&e?.id===n.pointerId&&e.moved&&performance.now()-e.lastTime<90&&(ye.lon+=vt(e.speedX*90,-26,26),ye.lat=vt(ye.lat+vt(e.speedY*75,-13,13),-75,75)),rs=null,Pn.size===1){let[t,i]=Pn.entries().next().value;Bt=$0(t,i.x,i.y,performance.now())}else Bt=null,Cn||(it.tx=it.ty=0);lt(),pr()}}st.addEventListener("pointerup",J0);st.addEventListener("pointercancel",J0);st.addEventListener("pointerleave",()=>{!Pn.size&&!Cn&&(it.tx=it.ty=0,lt())});var j0=1;st.addEventListener("gesturestart",n=>{n.preventDefault(),j0=ye.zoom},{passive:!1});st.addEventListener("gesturechange",n=>{n.preventDefault(),Gc(j0*n.scale)},{passive:!1});function yh(){clearTimeout(wc),it.tx=.95,it.ty=-.55,lt(),wc=setTimeout(()=>{it.tx=-.55,it.ty=.3,lt(),wc=setTimeout(()=>{it.tx=it.ty=0,lt()},420)},480)}var Ac=Be.querySelector(".earth-tilt"),Mw=matchMedia("(pointer:coarse)").matches;function Ec(n){if(!Cn||!Number.isFinite(n.beta)||!Number.isFinite(n.gamma))return;clearTimeout(Pc),is||(is={beta:n.beta,gamma:n.gamma});let e=(n.gamma-is.gamma)/25,t=(n.beta-is.beta)/28,i=(screen.orientation?.angle||0)*Rn;it.tx=vt(e*Math.cos(i)+t*Math.sin(i),-1,1),it.ty=vt(t*Math.cos(i)-e*Math.sin(i),-1,1),Zn.textContent="",Ac.querySelector("span").textContent="\uAE30\uC6B8\uAE30 \uCF1C\uC9D0",lt()}Ac.addEventListener("click",async()=>{if(ex){Cn=!Cn,it.tx=it.ty=0,Ac.setAttribute("aria-pressed",String(Cn)),lt();return}if(!Mw){yh();return}if(Cn){Cn=!1,window.removeEventListener("deviceorientation",Ec),clearTimeout(Pc),it.tx=it.ty=0,Ac.querySelector("span").textContent="\uAE30\uC6B8\uAE30",lt();return}try{if(!window.DeviceOrientationEvent)throw new Error("unavailable");if(typeof DeviceOrientationEvent.requestPermission=="function"&&await DeviceOrientationEvent.requestPermission()!=="granted"){Zn.textContent="\uAE30\uC6B8\uAE30 \uAD8C\uD55C\uC774 \uC5C6\uC5B4 \uD130\uCE58\uB85C \uC870\uC791\uD560 \uC218 \uC788\uC5B4\uC694.";return}Cn=!0,is=null,window.addEventListener("deviceorientation",Ec),Pc=setTimeout(()=>{Cn=!1,window.removeEventListener("deviceorientation",Ec),Zn.textContent="\uC774 \uBBF8\uB9AC\uBCF4\uAE30\uB294 \uC13C\uC11C \uC2E0\uD638\uB97C \uBC1B\uC9C0 \uBABB\uD588\uC5B4\uC694. \uC544\uC774\uD3F0 \uC571\uC5D0\uC11C \uD655\uC778\uC774 \uD544\uC694\uD574\uC694.",yh()},2200)}catch{Zn.textContent="\uAE30\uC6B8\uAE30 \uC5F0\uACB0\uC740 \uC544\uC774\uD3F0 \uC571\uC5D0\uC11C \uD655\uC778\uC774 \uD544\uC694\uD574\uC694. \uC6C0\uC9C1\uC784\uC744 \uBBF8\uB9AC \uBCF4\uC5EC\uC904\uAC8C\uC694.",yh()}});document.addEventListener("visibilitychange",()=>{document.hidden?(hs(),clearTimeout(Ha),as=null,Kn&&cancelAnimationFrame(Kn),Kn=0):(Mh=performance.now(),lt())});window.addEventListener("pagehide",()=>{clearTimeout(Ha),Gt.pause(),Kn&&cancelAnimationFrame(Kn),clearTimeout(Sh),clearTimeout(wc),clearTimeout(Pc),window.removeEventListener("deviceorientation",Ec),Sn.dispose()});new MutationObserver(()=>{Hr()?lt():clearTimeout(Ha)}).observe(Be,{attributes:!0,attributeFilter:["class"]});document.addEventListener("close",()=>{Hr()&&lt()},!0);window.addEventListener("pageshow",()=>{as=null,lt()});var bc=Be.querySelector(".earth-logo img");bc&&(bc.complete&&bc.naturalWidth?_0():bc.addEventListener("load",_0,{once:!0}));var Ih=n=>window.SKMLanguage?.t(n)||n;async function Sw(){let n=Be.querySelector(".earth-brand");n.disabled=!0,$n(),Zn.textContent=Ih("checkingLogin");try{await window.SKMEnterHome(window.SKMBooking,!!window.webkit?.messageHandlers?.skmAuth),await window.SKMTheme?.refresh(),Zn.textContent="",window.SKMTheme?.eligible?await window.SKMTheme.openConversation():Be.querySelector(".earth-city-panel").scrollIntoView({block:"nearest",behavior:qa?"instant":"smooth"})}catch(e){Zn.textContent=e.code==="native-only"?e.message:Ih("loginFailed")}finally{n.disabled=!1}}function bw(n){$n(),hi.setOpen(!1),Ci.hidden=!0,sessionStorage.setItem("skm-booking-city-v1",JSON.stringify({id:n.id,label:n.label})),window.openBodyMap()}function Q0(){let n=window.SKMLanguage?.code||"ko";Be.querySelector(".earth-language span").textContent=n.toUpperCase(),Be.querySelector(".earth-language").setAttribute("aria-label",Ih("language")),Be.querySelector(".earth-account").setAttribute("aria-label","SKINOMAKASE SESSION"),V0(Kt.find(e=>e.id===ye.selected))}Be.querySelector(".earth-language").addEventListener("click",()=>document.getElementById("skm-language-button")?.click());Be.querySelector(".earth-account").addEventListener("click",()=>{$n(),window.openAppPage("app/account.html")});window.addEventListener("skm-language",Q0);Q0();var Wa=Be.querySelector(".earth-extra-menu");Be.querySelector(".earth-more").addEventListener("click",()=>{Wa.hidden=!Wa.hidden});Wa.querySelector(".earth-extra-close").addEventListener("click",()=>{Wa.hidden=!0});Wa.querySelectorAll("[data-extra]").forEach(n=>n.addEventListener("click",()=>{Wa.hidden=!0,$n();let e=n.dataset.extra;e==="venues"?window.openAppPage("app/community.html?view=venues&city="+encodeURIComponent(ye.selected)):e==="strobe"||e==="shelter"?window.openAppPage("app/"+e+".html"):e==="video"?window.openVideoPlayer():e==="accessory"&&document.getElementById("accModal").classList.add("active")}));window.SKMApp=window.SKMApp||{};var ww=window.SKMApp.onMotion;window.SKMApp.onMotion=(n,e,t)=>{ww?.(n,e,t);let i=Hr()&&!Pn.size&&ls.hidden,r=D0.sample({x:n,y:e,z:t},performance.now(),i);r&&(qa||(Vr.stopFollowing(),Vc(),ye.cityFocus&&(ye.cityFocus=!1,ye.zoom=1,ys()),ye.lon=pt.lon,ye.lat=pt.lat,Wi.lon=Wi.lat=0,zr=r*760,lt()),window.SKMApp.haptic?.("medium"),Vr.randomRadio())};var ex=!!window.webkit?.messageHandlers?.haptic;if(ex){let n=window.SKMApp?.onTilt,e=null;Cn=!0,window.SKMApp.onTilt=(t,i,r,...a)=>{n?.(t,i,r,...a),!(!Cn||document.body.classList.contains("bm-open")||document.hidden)&&(e||(e={x:t,z:r}),it.tx=vt((t-e.x)*2.6,-1,1),it.ty=vt((r-e.z)*2.6,-1,1),e.x+=(t-e.x)*.002,e.z+=(r-e.z)*.002,lt())}}new MutationObserver(()=>{document.body.classList.contains("bm-open")?($n(),Kn&&(cancelAnimationFrame(Kn),Kn=0)):lt()}).observe(document.body,{attributes:!0,attributeFilter:["class"]});window.addEventListener("skm-return-home",()=>lt());var R0=new URLSearchParams(location.search).get("gloves"),P0=R0&&Kt.find(n=>Ho[n.id]?.code===R0);P0&&(zc(P0.id),hi.setOpen(!0));pg(Be);hg();window.addEventListener("skm-booking-home",()=>{Hh(),Be.scrollTop=0,window.SKMTheme?.returnHome?.()});})();
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
lucide/dist/esm/icons/arrow-right.js:
lucide/dist/esm/icons/arrow-up-right.js:
lucide/dist/esm/icons/book-open-text.js:
lucide/dist/esm/icons/chevron-right.js:
lucide/dist/esm/icons/compass.js:
lucide/dist/esm/icons/earth.js:
lucide/dist/esm/icons/external-link.js:
lucide/dist/esm/icons/flashlight.js:
lucide/dist/esm/icons/grid-2x2.js:
lucide/dist/esm/icons/hand.js:
lucide/dist/esm/icons/headphones.js:
lucide/dist/esm/icons/languages.js:
lucide/dist/esm/icons/list.js:
lucide/dist/esm/icons/lock-keyhole.js:
lucide/dist/esm/icons/map-pin.js:
lucide/dist/esm/icons/map-pinned.js:
lucide/dist/esm/icons/messages-square.js:
lucide/dist/esm/icons/minus.js:
lucide/dist/esm/icons/move-3d.js:
lucide/dist/esm/icons/move-horizontal.js:
lucide/dist/esm/icons/notebook-pen.js:
lucide/dist/esm/icons/pen-tool.js:
lucide/dist/esm/icons/play.js:
lucide/dist/esm/icons/plus.js:
lucide/dist/esm/icons/pointer.js:
lucide/dist/esm/icons/send.js:
lucide/dist/esm/icons/shopping-bag.js:
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
