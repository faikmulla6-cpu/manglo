import{i as e,n as t,r as n,t as r}from"./index-CK_Ms_y1.js";var i={name:`arrow-right`,size:24,node:[[`path`,{d:`M5 12h14`,key:`1ays0h`}],[`path`,{d:`m12 5 7 7-7 7`,key:`xquz4c`}]]};i.node;var a=t(i),o={name:`arrow-up-right`,size:24,node:[[`path`,{d:`M7 7h10v10`,key:`1tivn9`}],[`path`,{d:`M7 17 17 7`,key:`1vkiza`}]]};o.node;var s=t(o),c=e(n(),1),l=(0,c.createContext)({});function u(e){let t=(0,c.useRef)(null);return t.current===null&&(t.current=e()),t.current}var d=typeof window<`u`?c.useLayoutEffect:c.useEffect,f=(0,c.createContext)(null);function p(e,t){e.indexOf(t)===-1&&e.push(t)}function m(e,t){let n=e.indexOf(t);n>-1&&e.splice(n,1)}var h=(e,t,n)=>n>t?t:n<e?e:n,g={},_=e=>/^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e),v=e=>typeof e==`object`&&!!e,y=e=>/^0[^.\s]+$/u.test(e);function b(e){let t;return()=>(t===void 0&&(t=e()),t)}var x=e=>e,S=(...e)=>e.reduce((e,t)=>n=>t(e(n))),C=(e,t,n)=>{let r=t-e;return r?(n-e)/r:1},w=class{constructor(){this.subscriptions=[]}add(e){return p(this.subscriptions,e),()=>this.remove(e)}remove(e){m(this.subscriptions,e)}notify(e,t,n){let r=this.subscriptions.length;if(r){if(r===1)this.subscriptions[0](e,t,n);else for(let i=0;i<r;i++){let r=this.subscriptions[i];r&&r(e,t,n)}}}getSize(){return this.subscriptions.length}clear(){this.subscriptions.length=0}},T=e=>e*1e3,E=e=>e/1e3,D=(e,t)=>t?1e3/t*e:0,O=(e,t,n)=>{let r=t-e;return((n-e)%r+r)%r+e},k=(e,t,n)=>e*(3*(1-e)*((1-e)*t+e*n)+e*e);function A(e,t,n,r){return e===t&&n===r?x:i=>{let a=0,o=1,s=i;for(let t=0;;t++){s>=a&&s<=o||(s=(a+o)/2);let r=k(s,e,n)-i;if(r*r<1e-28||t===40)break;r>0?o=s:a=s,s-=r*1e-7/(k(s+1e-7,e,n)-i-r)}return k(s,t,r)}}var ee=e=>t=>t<=.5?e(2*t)/2:(2-e(2*(1-t)))/2,j=e=>t=>1-e(1-t),te=A(.33,1.53,.69,.99),ne=j(te),M=ee(ne),N=e=>e>=1?1:(e*=2)<1?.5*ne(e):.5*(2-2**(-10*(e-1))),re=e=>1-Math.sin(Math.acos(e)),ie=j(re),ae=ee(re),oe=A(.42,0,1,1),se=A(0,0,.58,1),ce=A(.42,0,.58,1),le=e=>Array.isArray(e)&&typeof e[0]!=`number`;function ue(e,t){return le(e)?e[O(0,e.length,t)]:e}var de=e=>Array.isArray(e)&&typeof e[0]==`number`,fe={linear:x,easeIn:oe,easeInOut:ce,easeOut:se,circIn:re,circInOut:ae,circOut:ie,backIn:ne,backInOut:M,backOut:te,anticipate:N},pe=e=>typeof e==`string`,me=e=>{if(de(e)){let[t,n,r,i]=e;return A(t,n,r,i)}return pe(e)?fe[e]:e},P={delta:0,timestamp:0,isProcessing:!1},he;function ge(){he=void 0}var F={now:()=>(he===void 0&&F.set(P.isProcessing||g.useManualTiming?P.timestamp:performance.now()),he),set:e=>{he=e,queueMicrotask(ge)}},_e=e=>Math.round(e*1e5)/1e5,ve=e=>t=>typeof t==`string`&&t.startsWith(e),ye=ve(`--`),be=ve(`var(--`),xe=e=>be(e)?Se.test(e.split(`/*`)[0].trim()):!1,Se=/var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;function Ce(e){return typeof e==`string`&&e.split(`/*`)[0].includes(`var(--`)}var we={test:e=>typeof e==`number`,parse:parseFloat,transform:e=>e},Te={...we,transform:e=>h(0,1,e)},Ee={...we,default:1},De=/-?(?:\d+(?:\.\d+)?|\.\d+)/gu;function Oe(e){return e==null}var ke=/^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,Ae=(e,t)=>n=>!!(typeof n==`string`&&ke.test(n)&&n.startsWith(e)||t&&!Oe(n)&&Object.prototype.hasOwnProperty.call(n,t)),je=(e,t,n)=>r=>{if(typeof r!=`string`)return r;let[i,a,o,s]=r.match(De);return{[e]:parseFloat(i),[t]:parseFloat(a),[n]:parseFloat(o),alpha:s===void 0?1:parseFloat(s)}},Me=e=>h(0,255,e),Ne={...we,transform:e=>Math.round(Me(e))},Pe={test:Ae(`rgb`,`red`),parse:je(`red`,`green`,`blue`),transform:({red:e,green:t,blue:n,alpha:r=1})=>`rgba(`+Ne.transform(e)+`, `+Ne.transform(t)+`, `+Ne.transform(n)+`, `+_e(Te.transform(r))+`)`},Fe=(e,t,n)=>{let r=e.substring(1+t*n,1+(t+1)*n);return n>1?r:r+r};function Ie(e){let t=e.length>5?2:1,n=Fe(e,3,t);return{red:parseInt(Fe(e,0,t),16),green:parseInt(Fe(e,1,t),16),blue:parseInt(Fe(e,2,t),16),alpha:n?parseInt(n,16)/255:1}}var Le={test:Ae(`#`),parse:Ie,transform:Pe.transform},Re=e=>({test:t=>typeof t==`string`&&t.endsWith(e)&&t.split(` `).length===1,parse:parseFloat,transform:t=>`${t}${e}`}),I=Re(`deg`),ze=Re(`%`),L=Re(`px`),Be=Re(`vh`),Ve=Re(`vw`),He={...ze,parse:e=>ze.parse(e)/100,transform:e=>ze.transform(e*100)},Ue={test:Ae(`hsl`,`hue`),parse:je(`hue`,`saturation`,`lightness`),transform:({hue:e,saturation:t,lightness:n,alpha:r=1})=>`hsla(`+Math.round(e)+`, `+ze.transform(_e(t))+`, `+ze.transform(_e(n))+`, `+_e(Te.transform(r))+`)`},R={test:e=>Pe.test(e)||Le.test(e)||Ue.test(e),parse:e=>Pe.test(e)?Pe.parse(e):Ue.test(e)?Ue.parse(e):Le.parse(e),transform:e=>typeof e==`string`?e:e.hasOwnProperty(`red`)?Pe.transform(e):Ue.transform(e),getAnimatableNone:e=>{let t=R.parse(e);return t.alpha=0,R.transform(t)}},We=/(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu,Ge=new RegExp(De.source),Ke=new RegExp(We.source,`i`);function qe(e){return isNaN(e)&&typeof e==`string`&&(Ge.test(e)||Ke.test(e))}var Je=`number`,Ye=`color`,Xe=`var`,Ze=`var(`,Qe="${}",$e=/var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)(?![a-z]*\()/giu;function et(e){let t=e.toString();return Ge.test(t)||Ke.test(t)}function tt(e){let t=e.toString(),n=[],r={color:[],number:[],var:[]},i=[],a=0;return{values:n,split:t.replace($e,e=>(R.test(e)?(r.color.push(a),i.push(Ye),n.push(R.parse(e))):e.startsWith(Ze)?(r.var.push(a),i.push(Xe),n.push(e)):(r.number.push(a),i.push(Je),n.push(parseFloat(e))),++a,Qe)).split(Qe),indexes:r,types:i}}function nt(e){return tt(e).values}function rt({split:e,types:t}){let n=e.length;return r=>{let i=``;for(let a=0;a<n;a++)if(i+=e[a],r[a]!==void 0){let e=t[a];i+=e===Je?_e(r[a]):e===Ye?R.transform(r[a]):r[a]}return i}}function it(e){return rt(tt(e))}var at=e=>typeof e==`number`?0:R.test(e)?R.getAnimatableNone(e):e,ot=(e,t)=>typeof e==`number`?t?.trim().endsWith(`/`)?e:0:at(e);function st(e){let t=tt(e);return rt(t)(t.values.map((e,n)=>ot(e,t.split[n])))}var z={test:qe,parse:nt,createTransformer:it,getAnimatableNone:st};function ct(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<.5?t:n<2/3?e+(t-e)*(2/3-n)*6:e}function lt({hue:e,saturation:t,lightness:n,alpha:r}){e/=360,t/=100,n/=100;let i=0,a=0,o=0;if(!t)i=a=o=n;else{let r=n<.5?n*(1+t):n+t-n*t,s=2*n-r;i=ct(s,r,e+1/3),a=ct(s,r,e),o=ct(s,r,e-1/3)}return{red:Math.round(i*255),green:Math.round(a*255),blue:Math.round(o*255),alpha:r}}function ut(e,t){return n=>n>0?t:e}var dt=(e,t,n)=>e+(t-e)*n,ft=(e,t,n)=>{let r=e*e,i=n*(t*t-r)+r;return i<0?0:Math.sqrt(i)},pt=[Le,Pe,Ue],mt=e=>pt.find(t=>t.test(e));function ht(e){let t=mt(e);if(!t)return!1;let n=t.parse(e);return t===Ue&&(n=lt(n)),n}var gt=(e,t)=>{let n=ht(e),r=ht(t);if(!n||!r)return ut(e,t);let i={...n};return e=>(i.red=ft(n.red,r.red,e),i.green=ft(n.green,r.green,e),i.blue=ft(n.blue,r.blue,e),i.alpha=dt(n.alpha,r.alpha,e),Pe.transform(i))},_t=new Set([`none`,`hidden`]);function vt(e,t){return _t.has(e)?n=>n<=0?e:t:n=>n>=1?t:e}function yt(e,t){return n=>dt(e,t,n)}function bt(e){return typeof e==`number`?yt:typeof e==`string`?xe(e)?ut:R.test(e)?gt:wt:Array.isArray(e)?xt:typeof e==`object`?R.test(e)?gt:St:ut}function xt(e,t){let n=[...e],r=n.length,i=e.map((e,n)=>bt(e)(e,t[n]));return e=>{for(let t=0;t<r;t++)n[t]=i[t](e);return n}}function St(e,t){let n={...e,...t},r={};for(let i in n)e[i]!==void 0&&t[i]!==void 0&&(r[i]=bt(e[i])(e[i],t[i]));return e=>{for(let t in r)n[t]=r[t](e);return n}}function Ct(e,t){let n=[],r={color:0,var:0,number:0};for(let i=0;i<t.values.length;i++){let a=t.types[i],o=e.indexes[a][r[a]],s=e.values[o]??0;n[i]=s,r[a]++}return n}var wt=(e,t)=>{let n=tt(e),r=tt(t);return n.indexes.var.length===r.indexes.var.length&&n.indexes.color.length===r.indexes.color.length&&n.indexes.number.length>=r.indexes.number.length?_t.has(e)&&!r.values.length||_t.has(t)&&!n.values.length?vt(e,t):S(xt(Ct(n,r),r.values),rt(r)):ut(e,t)},Tt=/^(-?(?:\d+(?:\.\d*)?|\.\d+))([a-z%]*)$/iu;function Et(e,t){let n=Tt.exec(e);if(!n)return;let r=Tt.exec(t);if(!r||n[2]!==r[2])return;let i=n[2],a=parseFloat(n[1]),o=parseFloat(r[1]);return e=>_e(dt(a,o,e))+i}function Dt(e,t,n){if(typeof e==`number`&&typeof t==`number`&&typeof n==`number`)return dt(e,t,n);if(typeof e==`string`&&typeof t==`string`){let n=Et(e,t);if(n)return n}return bt(e)(e,t)}var Ot=[`setup`,`read`,`resolveKeyframes`,`preUpdate`,`update`,`preRender`,`render`,`postRender`];function kt(e){let t=new Set,n=new Set,r=!1,i=!1,a,o=new Set,s={delta:0,timestamp:0,isProcessing:!1};function c(t){o.has(t)&&(n.add(t),e()),(a=t)(s)}let l={schedule:(e,i=!1,s=!1)=>{let c=s&&r,l=c?t:n;return i&&o.add(e),c&&e!==a&&l.delete(e),l.add(e),e},cancel:e=>{n.delete(e),o.delete(e)},process:e=>{if(s=e,r){i=!0;return}r=!0;let o=t;t=n,n=o,t.forEach(c),t.clear(),a=void 0,r=!1,i&&(i=!1,l.process(e))}};return l}var At=40;function jt(e,t,n={delta:0,timestamp:0,isProcessing:!1}){let r=!1,i=!0,a=()=>r=!0,o=Ot.reduce((e,t)=>(e[t]=kt(a),e),{}),{setup:s,read:c,resolveKeyframes:l,preUpdate:u,update:d,preRender:f,render:p,postRender:m}=o,h=()=>{let a=g.useManualTiming,o=a?n.timestamp:performance.now();r=!1,a||(n.delta=i?1e3/60:Math.max(Math.min(o-n.timestamp,At),1)),n.timestamp=o,n.isProcessing=!0,s.process(n),c.process(n),l.process(n),u.process(n),d.process(n),f.process(n),p.process(n),m.process(n),n.isProcessing=!1,r&&t&&(i=!1,e(h))},_=()=>{r=!0,i=!0,n.isProcessing||e(h)};return{schedule:Ot.reduce((e,t)=>{let n=o[t];return e[t]=(e,t=!1,i=!1)=>(r||_(),n.schedule(e,t,i)),e},{}),cancel:e=>{for(let t=0;t<Ot.length;t++)o[Ot[t]].cancel(e)},state:n,steps:o}}var{schedule:B,cancel:V,steps:Mt}=jt(typeof requestAnimationFrame<`u`?requestAnimationFrame:x,!0,P),Nt=e=>{let t=({timestamp:t})=>e(t);return{start:(e=!0)=>B.update(t,e),stop:()=>V(t),now:()=>P.isProcessing?P.timestamp:F.now()}},Pt=(e,t,n=10)=>{let r=``,i=Math.max(Math.round(t/n),2);for(let t=0;t<i;t++)r+=Math.round(e(t/(i-1))*1e4)/1e4+`, `;return`linear(${r.substring(0,r.length-2)})`},Ft=2e4;function It(e,t=50,n=Ft,r){let i=0,a=e.next(i);for(r?.push(a.value);!a.done&&i<n;)i+=t,a=e.next(i),r?.push(a.value);return i>=n?1/0:i}function Lt(e,t=100,n){let{keyframes:r,velocity:i}=e,a=r&&r[r.length-1]-r[0],o=n({...e,velocity:i&&a?i*t/a:i,keyframes:[0,t]}),s=Math.min(It(o),Ft);return{type:`keyframes`,ease:e=>o.next(s*e).value/t,duration:E(s)}}var Rt=100,zt=10,Bt=1,Vt=800,Ht=.3,Ut=.3,Wt=.01,Gt=2,Kt=.005,qt=.5,Jt=.01,Yt=10,Xt=.05,Zt=e=>e<0?1/Math.max(1+e,Xt):Math.max(1-e,Xt);function Qt(e,t){if(!(e>1))return 1;let n=Math.sqrt(e*e-1),r=e-n,i=e+n,a=2*n*Math.exp(-t)*(1+t);return tn(e=>i*Math.exp(-r*e)-r*Math.exp(-i*e)-a,e=>Math.exp(-i*e)-Math.exp(-r*e),t)/t}function $t(e,t){return e*Math.sqrt(1-t*t)}var en=12;function tn(e,t,n){let r=n;for(let n=1;n<en;n++)r-=e(r)/t(r);return r}var nn=.001;function rn({duration:e=Vt,bounce:t=Ht}){let n,r,i=Zt(t);e=h(Jt,Yt,E(e)),i<1?(n=t=>{let n=t*i,r=n*e,a=$t(t,i),o=Math.exp(-r);return nn-n/a*o},r=t=>{let r=t*i*e,a=i*i*t*t*e,o=Math.exp(-r),s=$t(t*t,i);return(-n(t)+nn>0?-1:1)*-a*o/s}):(n=t=>-.001+Math.exp(-t*e)*(t*e+1),r=t=>Math.exp(-t*e)*(-t*(e*e)));let a=5/e,o=tn(n,r,a),s=o*Qt(i,o*e),c=s*s;return{stiffness:c,damping:i*2*Math.sqrt(c),duration:T(e)}}var an=(e,t)=>(t?e>=0:e>0)&&e<1/0;function on(e,t){if(an(e,t))return e}function sn(e){let t=on(e.stiffness),n=on(e.damping,!0),r=on(e.mass),i={...e,stiffness:t??Rt,damping:n??zt,mass:r??Bt,isResolvedFromDuration:!1,isTimeDefined:(t??n??r)===void 0&&(e.duration!==void 0||e.bounce!==void 0)};if(i.isTimeDefined){if(e.visualDuration){let t=Zt(e.bounce||0),n=2*Math.PI/(e.visualDuration*1.2)*Qt(t,2*Math.PI/1.2);i.stiffness=n*n,i.damping=2*t*Math.sqrt(i.stiffness)}else Object.assign(i,rn(i)),i.isResolvedFromDuration=!0;an(i.stiffness)&&an(i.damping,!0)||(i.stiffness=Rt,i.damping=zt)}return i}function cn(e=Ut,t=Ht){let n=typeof e==`object`?e:{visualDuration:e,keyframes:[0,1],bounce:t},r=n.keyframes[0],i=n.keyframes[n.keyframes.length-1],a={done:!1,value:r},{stiffness:o,damping:s,mass:c,duration:l,isResolvedFromDuration:u,isTimeDefined:d}=sn({...n}),f=e=>u?0:-E(e),p=s/(2*Math.sqrt(o*c)),m=E(Math.sqrt(o/c)),h=p*m,g={target:i,delta:i-r,velocity:f(n.velocity)||0,restSpeed:0,restDelta:0},_=()=>{let e=Math.abs(g.delta)<5;g.restSpeed=n.restSpeed||(e?Wt:Gt),g.restDelta=n.restDelta||(e?Kt:qt)};_();let v,y,b;if(p<1){let e=$t(m,p),t={A:0,sinC:0,cosC:0,t:-1,env:0,sin:0,cos:0};b=()=>{t.A=(g.velocity+h*g.delta)/e,t.sinC=h*t.A+g.delta*e,t.cosC=h*g.delta-t.A*e};let n=n=>{n!==t.t&&(t.t=n,t.env=Math.exp(-h*n),t.sin=Math.sin(e*n),t.cos=Math.cos(e*n))};v=e=>(n(e),g.target-t.env*(t.A*t.sin+g.delta*t.cos)),y=e=>(n(e),t.env*(t.sinC*t.sin+t.cosC*t.cos))}else if(p===1){v=e=>g.target-Math.exp(-m*e)*(g.delta+(g.velocity+m*g.delta)*e);let e={C:0};b=()=>{e.C=g.velocity+m*g.delta},y=t=>Math.exp(-m*t)*(m*e.C*t-g.velocity)}else{let e=m*Math.sqrt(p*p-1),t=h-e,n=h+e,r=e<1||d?1/0:300/e,i=(e,t)=>Math.exp(t>r?(h-e)*r-h*t:-e*t),a={S:0,F:0};b=()=>{let t=(g.velocity+h*g.delta)/e;a.S=(g.delta+t)/2,a.F=(g.delta-t)/2},v=e=>g.target-a.S*i(t,e)-a.F*i(n,e),y=e=>t*a.S*i(t,e)+n*a.F*i(n,e)}b();let x=u&&l||null,S={calculatedDuration:x,retarget:(e,t)=>{g.target=e[e.length-1],g.delta=g.target-e[0],g.velocity=f(t),n.restSpeed&&n.restDelta||_(),S.calculatedDuration=x,a.done=!1,b()},velocity:e=>T(y(e)),next:e=>{let t=v(e);if(u)a.done=e>=l;else{let n=T(y(e));a.done=Math.abs(n)<=g.restSpeed&&Math.abs(g.target-t)<=g.restDelta}return a.value=a.done?g.target:t,a},toString:()=>{let e=Math.min(It(S),Ft),t=Pt(t=>S.next(e*t).value,e,30);return e+`ms `+t}};return S}var ln=Object.assign(cn,{applyToOptions:e=>{let t=Lt(e,100,cn);return e.ease=t.ease,e.duration=T(t.duration),e.type=`keyframes`,e}});function un({keyframes:e,velocity:t=0,power:n=.8,timeConstant:r=325,bounceDamping:i=10,bounceStiffness:a=500,modifyTarget:o,min:s,max:c,restDelta:l=.5,restSpeed:u}){let d=e[0],f={done:!1,value:d},p=e=>e<s||e>c,m=e=>s===void 0?c:c===void 0||Math.abs(s-e)<Math.abs(c-e)?s:c,h=n*t,g=d+h,_=o?o(g):g;_!==g&&(h=_-d);let v=e=>-h*Math.exp(-e/r),y=e=>{let t=v(e);f.done=Math.abs(t)<=l,f.value=f.done?_:e?_+t:d},b,x,S=e=>{p(f.value)&&(b=e,x=ln({keyframes:[f.value,m(f.value)],velocity:-v(e)/r*1e3,damping:i,stiffness:a,restDelta:l,restSpeed:u}))};return S(0),{calculatedDuration:null,next:e=>{let t=!1;return!x&&b===void 0&&(t=!0,y(e),S(e)),b!==void 0&&e>=b?x.next(e-b):(!t&&y(e),f)}}}function dn(e,t,n){let r=[],i=g.mix||Dt,a=e.length-1;for(let o=0;o<a;o++){let a=n?.(e[o],e[o+1])||i(e[o],e[o+1]);t&&(a=S(Array.isArray(t)?t[o]||x:t,a)),r.push(a)}return r}function fn(e,t,{clamp:n=!0,ease:r,mixer:i}={}){let a=e.length;if(a===1)return()=>t[0];if(a===2&&t[0]===t[1])return()=>t[1];let o=e[0]===e[1];e[0]>e[a-1]&&(e=[...e].reverse(),t=[...t].reverse());let s=dn(t,r,i),c=s.length,l=n=>{if(o&&n<e[0])return t[0];let r=0;if(c>1)for(;r<e.length-2&&!(n<e[r+1]);r++);let i=C(e[r],e[r+1],n);return s[r](i)};return n?t=>l(h(e[0],e[a-1],t)):l}function pn(e,t){let n=e[e.length-1];for(let r=1;r<=t;r++){let i=C(0,t,r);e.push(dt(n,1,i))}}function mn(e){let t=[0];return pn(t,e.length-1),t}function hn(e,t){return e.map(e=>e*t)}function gn(e,t){return e.map(()=>t||ce).splice(0,e.length-1)}function _n({duration:e=300,keyframes:t,times:n,ease:r=`easeInOut`,mixer:i}){let a=typeof t[0]==`number`?void 0:i,o=le(r)?r.map(me):me(r)||ce,s={done:!1,value:t[0]},c=-1;if(!a){for(let e=1;e<t.length;e++)if(t[e]!==t[e-1]){if(c>=0){c=-2;break}c=e-1}}if(c>=0){let r=n&&n.length===t.length?n:mn(t),i=r[c]*e,a=r[c+1]*e,l=t[c],u=t[c+1],d=Array.isArray(o)?o[c]:o,f=(g.mix||Dt)(l,u),p=t.length-2;return{calculatedDuration:e,next:t=>(s.value=c&&t<i?f(0):c<p&&(t>=a||!e)?typeof u==`number`?u:f(1):f(d(t>=a||!e?1:t<=i?0:(t-i)/(a-i))),s.done=t>=e,s)}}let l=fn(hn(n&&n.length===t.length?n:mn(t),e),t,{ease:Array.isArray(o)?o:gn(t,o),mixer:a});return{calculatedDuration:e,next:t=>(s.value=l(t),s.done=t>=e,s)}}var vn=5;function yn(e,t,n){let r=Math.max(t-vn,0);return D(n-e(r),t-r)}function bn(e,t,n=0){return t<=0?n:e.velocity?e.velocity(t):yn(t=>e.next(t).value,t,e.next(t).value)}function xn(e,{repeat:t,repeatType:n=`loop`},r,i=1){let a,o,s=0;for(let t=0;t<e.length;t++){let n=e[t];n!==null&&(s++||(a=n),o=n)}let c=i<0||t&&n!==`loop`&&t%2==1?0:s-1;return!c||r===void 0?c?o:a:r}var Sn={decay:un,inertia:un,tween:_n,keyframes:_n,spring:ln};function Cn(e){typeof e.type==`string`&&(e.type=Sn[e.type])}var wn=40,Tn=(e,t)=>t-e>wn&&!g.useManualTiming?t:e;function En(e,t){return{kind:e,animation:t,timestamp:F.now(),frameTimestamp:P.timestamp,frameIsProcessing:P.isProcessing}}function Dn(e,t,n){let r=globalThis.__MOTION_INSPECT__;if(r)try{r({...En(`animation-start`,e),options:n?{...t,...n}:t})}catch{}}var On=class{constructor(){this.isResolved=!1}get finished(){return this._finished||=this.isResolved?Promise.resolve():new Promise(e=>{this._resolve=e}),this._finished}updateFinished(){this._finished=this._resolve=void 0,this.isResolved=!1}notifyFinished(){this.isResolved=!0,this._resolve?.()}then(e,t){return this.finished.then(e,t)}},kn=e=>e/100,An=e=>Math.round(e*1e4)/1e4,jn=class extends On{constructor(e){super(),this.state=`idle`,this.startTime=null,this.isStopped=!1,this.currentTime=0,this.holdTime=null,this.playbackSpeed=1,this.delayState={done:!1,value:void 0},this.stop=()=>{let{motionValue:e}=this.options,t=F.now();e&&e.updatedAt!==t&&this.tick(e.updatedAt=t),this.isStopped=!0,this.state!==`idle`&&(this.teardown(),this.options.onStop?.())},this.options=e,this.initAnimation(),this.play(),e.autoplay===!1&&this.pause(),Dn(this,this.options)}initAnimation(){let{options:e}=this;Cn(e);let{type:t=_n,repeat:n=0,repeatDelay:r=0,repeatType:i,velocity:a=0}=e,{keyframes:o}=e,s=t||_n;this.mixKeyframes=void 0,s!==_n&&typeof o[0]!=`number`&&(this.mixKeyframes=S(kn,e.mixer?.(o[0],o[1])||Dt(o[0],o[1])),o=[0,100]);let c=s(o===e.keyframes?e:{...e,keyframes:o});i===`mirror`&&(this.mirroredGenerator=s({...e,keyframes:[...o].reverse(),velocity:-a})),c.calculatedDuration===null&&(c.calculatedDuration=It(c));let{calculatedDuration:l}=c;this.calculatedDuration=l,this.resolvedDuration=l+r,this.totalDuration=this.resolvedDuration*(n+1)-r,this.generator=c}updateTime(e){this.currentTime=this.holdTime??Math.round(e-this.startTime)*this.playbackSpeed}tick(e,t=!1){let{generator:n,totalDuration:r,calculatedDuration:i}=this;if(this.startTime===null)return n.next(0);let{delay:a=0,keyframes:o,type:s,onUpdate:c,finalKeyframe:l}=this.options;this.startTime===this.pendingStartTime&&(this.startTime=Tn(this.startTime,e)),this.pendingStartTime=void 0,this.speed>0?this.startTime=Math.min(this.startTime,e):this.speed<0&&(this.startTime=Math.min(e-r/this.speed,this.startTime)),t?this.currentTime=e:this.updateTime(e);let u=this.currentTime-a*(this.playbackSpeed>=0?1:-1),d=this.playbackSpeed>=0?u<0:u>r;this.currentTime=Math.max(u,0),this.state===`finished`&&this.holdTime===null&&(this.currentTime=r);let f=this.generate(this.currentTime,d),{done:p}=f;d||(p=this.playbackSpeed>=0?i<1/0?this.currentTime>=r:p:this.currentTime<=0);let m=this.holdTime===null&&(this.state===`finished`||this.state===`running`&&p);return m&&s!==un&&(f.value=xn(o,this.options,l,this.speed)),c&&c(f.value),m&&this.finish(),f}at(e){return this.holdTime??An((e-this.startTime)*this.playbackSpeed)}sampleAt(e,t){let{options:n,totalDuration:r}=this,i=this.at(e)-(n.delay||0);return i>=r&&n.type!==un?xn(n.keyframes,n,t?void 0:n.finalKeyframe):this.generate(Math.max(i,0),i<0).value}generate(e,t){let{generator:n,totalDuration:r,mixKeyframes:i,mirroredGenerator:a,resolvedDuration:o}=this,{keyframes:s,repeat:c,repeatType:l,repeatDelay:u}=this.options,d=e,f=n;if(c){let t=Math.min(e,r)/o,n=Math.floor(t),i=t%1;!i&&t>=1&&(i=1),i===1&&n--,n=Math.min(n,c+1),n%2&&(l===`reverse`?(i=1-i,u&&(i-=u/o)):l===`mirror`&&(f=a)),d=h(0,1,i)*o}let p;return t?(this.delayState.value=s[0],p=this.delayState):p=f.next(d),i&&!t&&(p.value=i(p.value)),p}get duration(){return E(this.calculatedDuration)}get iterationDuration(){return this.duration+E(this.options.delay??0)}get time(){return E(this.currentTime)}set time(e){this.state===`finished`&&this.updateFinished(),e=T(e),this.currentTime=e,this.startTime===null||this.holdTime!==null||this.playbackSpeed===0?this.holdTime=e:this.driver&&(this.startTime=this.driver.now()-e/this.playbackSpeed),this.driver?this.driver.start(!1):(this.startTime=0,this.state=`paused`,this.holdTime=e,this.tick(e))}getGeneratorVelocity(){return bn(this.generator,this.currentTime,this.options.velocity)}get speed(){return this.playbackSpeed}set speed(e){let t=this.playbackSpeed!==e;t&&this.driver&&this.updateTime(F.now()),this.playbackSpeed=e,t&&this.driver&&(this.time=E(this.currentTime))}play(){if(this.isStopped)return;let{driver:e=Nt,startTime:t}=this.options;this.driver||=e(e=>this.tick(e)),this.options.onPlay?.();let n=this.driver.now();this.state===`finished`?(this.updateFinished(),this.startTime=n):this.holdTime===null?this.startTime||=t??(this.pendingStartTime=n):this.startTime=n-this.holdTime/(this.playbackSpeed||1),this.state===`finished`&&this.speed<0&&(this.startTime+=this.calculatedDuration),this.holdTime=null,this.state=`running`,this.driver.start()}pause(){this.state=`paused`,this.updateTime(F.now()),this.holdTime=this.currentTime}complete(){this.state!==`running`&&this.play(),this.state=`finished`,this.holdTime=null}finish(){this.notifyFinished(),this.teardown(),this.state=`finished`,this.options.onComplete?.()}cancel(){this.holdTime=null,this.startTime=0,this.tick(0),this.teardown(),this.options.onCancel?.()}teardown(){this.state=`idle`,this.driver?.stop(),this.driver=void 0,this.startTime=this.holdTime=null}sample(e){return this.startTime=0,this.tick(e,!0)}attachTimeline(e){return this.options.allowFlatten&&(this.options.type=`keyframes`,this.options.ease=`linear`,this.initAnimation()),this.driver?.stop(),e.observe(this)}},Mn=new Set([`brightness`,`contrast`,`saturate`,`opacity`]);function Nn(e){let[t,n]=e.slice(0,-1).split(`(`);if(t===`drop-shadow`)return e;let[r]=n.match(De)||[];if(!r)return e;let i=n.replace(r,``),a=+!!Mn.has(t);return r!==n&&(a*=100),t+`(`+a+i+`)`}var Pn=/\b([a-z-]*)\(.*?\)/gu,Fn={...z,getAnimatableNone:e=>{let t=e.match(Pn);return t?t.map(Nn).join(` `):e}},In={...z,getAnimatableNone:e=>{let t=z.parse(e);return z.createTransformer(e)(t.map(e=>typeof e==`number`?0:typeof e==`object`?{...e,alpha:1}:e))}},Ln={...we,transform:Math.round},Rn={rotate:I,pathRotation:I,rotateX:I,rotateY:I,rotateZ:I,scale:Ee,scaleX:Ee,scaleY:Ee,scaleZ:Ee,skew:I,skewX:I,skewY:I,distance:L,translateX:L,translateY:L,translateZ:L,x:L,y:L,z:L,perspective:L,transformPerspective:L,opacity:Te,originX:He,originY:He,originZ:L},H={borderWidth:L,borderTopWidth:L,borderRightWidth:L,borderBottomWidth:L,borderLeftWidth:L,borderRadius:L,borderTopLeftRadius:L,borderTopRightRadius:L,borderBottomRightRadius:L,borderBottomLeftRadius:L,width:L,maxWidth:L,height:L,maxHeight:L,top:L,right:L,bottom:L,left:L,inset:L,insetBlock:L,insetBlockStart:L,insetBlockEnd:L,insetInline:L,insetInlineStart:L,insetInlineEnd:L,padding:L,paddingTop:L,paddingRight:L,paddingBottom:L,paddingLeft:L,paddingBlock:L,paddingBlockStart:L,paddingBlockEnd:L,paddingInline:L,paddingInlineStart:L,paddingInlineEnd:L,margin:L,marginTop:L,marginRight:L,marginBottom:L,marginLeft:L,marginBlock:L,marginBlockStart:L,marginBlockEnd:L,marginInline:L,marginInlineStart:L,marginInlineEnd:L,fontSize:L,backgroundPositionX:L,backgroundPositionY:L,...Rn,zIndex:Ln,fillOpacity:Te,strokeOpacity:Te,numOctaves:Ln},zn={...H,color:R,backgroundColor:R,outlineColor:R,fill:R,stroke:R,borderColor:R,borderTopColor:R,borderRightColor:R,borderBottomColor:R,borderLeftColor:R,filter:Fn,WebkitFilter:Fn,mask:In,WebkitMask:In},Bn=e=>zn[e],Vn=new Set([Fn,In]),Hn,Un,Wn;function Gn(e,t){if(e===Hn&&t===Un)return Wn;let n=Bn(e);return Vn.has(n)||(n=z),Wn=n.getAnimatableNone?n.getAnimatableNone(t):void 0,Hn=e,Un=t,Wn}function Kn(e){for(let t=1;t<e.length;t++)e[t]??(e[t]=e[t-1])}var qn=e=>e*180/Math.PI,Jn=e=>Xn(qn(Math.atan2(e[1],e[0]))),Yn={x:4,y:5,translateX:4,translateY:5,scaleX:0,scaleY:3,scaleZ:()=>1,scale:e=>(Math.abs(e[0])+Math.abs(e[3]))/2,rotate:Jn,rotateZ:Jn,skewX:e=>qn(Math.atan(e[1])),skewY:e=>qn(Math.atan(e[2])),skew:e=>(Math.abs(e[1])+Math.abs(e[2]))/2},Xn=e=>(e%=360,e<0&&(e+=360),e),Zn=Jn,Qn=e=>Math.hypot(e[0],e[1]),$n=e=>Math.hypot(e[4],e[5]),er={x:12,y:13,z:14,translateX:12,translateY:13,translateZ:14,scaleX:Qn,scaleY:$n,scaleZ:e=>Math.hypot(e[8],e[9],e[10]),scale:e=>(Qn(e)+$n(e))/2,rotateX:e=>Xn(qn(Math.atan2(e[6],e[5]))),rotateY:e=>Xn(qn(Math.atan2(-e[2],e[0]))),rotateZ:Zn,rotate:Zn,skewX:e=>qn(Math.atan(e[4])),skewY:e=>qn(Math.atan(e[1])),skew:e=>(Math.abs(e[1])+Math.abs(e[4]))/2};function tr(e){return+!!e.includes(`scale`)}function nr(e,t){if(!e||e===`none`)return tr(t);let n=e.match(/^matrix(3d)?\(([-\d.e\s,]+)\)$/u);if(!n)return tr(t);let r=(n[1]?er:Yn)[t],i=n[2].split(`,`).map(e=>parseFloat(e));return typeof r==`function`?r(i):i[r]}var rr=(e,t)=>{let{transform:n=`none`}=getComputedStyle(e);return nr(n,t)},U=[`transformPerspective`,`x`,`y`,`z`,`translateX`,`translateY`,`translateZ`,`scale`,`scaleX`,`scaleY`,`scaleZ`,`rotate`,`rotateX`,`rotateY`,`rotateZ`,`skew`,`skewX`,`skewY`],W=new Set([...U,`pathRotation`]),ir=e=>e===we||e===L,ar=new Set([`x`,`y`,`z`]),or=U.filter(e=>!ar.has(e));function sr(e){let t=[];return or.forEach(n=>{let r=e.getValue(n);if(r!==void 0){let e=r.get(),i=+!!n.startsWith(`scale`);if(e===i)return;t.push([n,e]),r.set(i)}}),t}var cr=new Set([`bottom`,`right`]);function lr(e,t,n,r,i,a){let o=parseFloat(e);if(!isNaN(o))return o;let{min:s,max:c}=t()[n],l=c-s;return a===`border-box`?l:l-parseFloat(r)-parseFloat(i)}var ur=({transform:e})=>nr(e,`x`),dr=({transform:e})=>nr(e,`y`),fr={width:({width:e,paddingLeft:t=`0`,paddingRight:n=`0`,boxSizing:r},i)=>lr(e,i,`x`,t,n,r),height:({height:e,paddingTop:t=`0`,paddingBottom:n=`0`,boxSizing:r},i)=>lr(e,i,`y`,t,n,r),top:({top:e})=>parseFloat(e),left:({left:e})=>parseFloat(e),bottom:({top:e},t)=>{let{y:n}=t();return parseFloat(e)+(n.max-n.min)},right:({left:e},t)=>{let{x:n}=t();return parseFloat(e)+(n.max-n.min)},x:ur,y:dr,translateX:ur,translateY:dr},pr=new Set,mr=!1,hr=!1,gr=!1;function _r(){if(hr){let e=[],t=new Set,n=new Set;pr.forEach(r=>{r.needsMeasurement&&(e.push(r),t.add(r.element),cr.has(r.name)&&n.add(r.element))});let r=new Map;n.forEach(e=>{let t=sr(e);t.length&&(r.set(e,t),e.render())}),e.forEach(e=>e.measureInitialState()),t.forEach(e=>{e.render();let t=r.get(e);t&&t.forEach(([t,n])=>{e.getValue(t)?.set(n)})}),e.forEach(e=>e.measureEndState()),e.forEach(e=>{e.suspendedScrollY!==void 0&&window.scrollTo(0,e.suspendedScrollY)})}hr=!1,mr=!1,pr.forEach(e=>e.complete(gr)),pr.clear()}function vr(){pr.forEach(e=>{e.readKeyframes(),e.needsMeasurement&&(hr=!0)})}function yr(){gr=!0,vr(),_r(),gr=!1}function br(e,t,n){if(typeof e==`string`){if(_(e)||y(e))return parseFloat(e);if(!z.test(e)&&z.test(n))return Gn(t,n)}return e??void 0}var xr=class{constructor(e,t,n,r,i,a=!1){this.state=`pending`,this.isAsync=!1,this.needsMeasurement=!1,this.unresolvedKeyframes=[...e],this.onComplete=t,this.name=n,this.motionValue=r,this.element=i,this.isAsync=a}scheduleResolve(){this.state=`scheduled`,this.isAsync?(pr.add(this),mr||(mr=!0,B.read(vr),B.resolveKeyframes(_r))):(this.readKeyframes(),this.complete())}readKeyframes(){let{unresolvedKeyframes:e,name:t,element:n,motionValue:r}=this;if(e[0]===null){let i=r?.get(),a=e[e.length-1];if(i!==void 0)e[0]=i;else if(n&&t){let r=br(n.readValue(t,a),t,a);r!==void 0&&(e[0]=r)}e[0]===void 0&&(e[0]=a),r&&i===void 0&&r.set(e[0])}Kn(e)}setFinalKeyframe(){}measureInitialState(){}renderEndStyles(){}measureEndState(){}complete(e=!1){this.state=`complete`,this.onComplete(this.unresolvedKeyframes,this.finalKeyframe,e),pr.delete(this)}cancel(){this.state===`scheduled`&&(pr.delete(this),this.state=`pending`)}resume(){this.state===`pending`&&this.scheduleResolve()}},Sr=e=>e.startsWith(`--`);function Cr(e,t,n){Sr(t)?e.style.setProperty(t,n):e.style[t]=n}var wr={};function Tr(e,t){let n=b(e);return()=>wr[t]??n()}var Er=Tr(()=>window.ScrollTimeline!==void 0,`scrollTimeline`),Dr=Tr(()=>{try{document.createElement(`div`).animate({opacity:0},{easing:`linear(0, 1)`})}catch{return!1}return!0},`linearEasing`),Or=([e,t,n,r])=>`cubic-bezier(${e}, ${t}, ${n}, ${r})`,kr={linear:`linear`,ease:`ease`,easeIn:`ease-in`,easeOut:`ease-out`,easeInOut:`ease-in-out`,circIn:Or([0,.65,.55,1]),circOut:Or([.55,0,1,.45]),backIn:Or([.31,.01,.66,-.59]),backOut:Or([.33,1.53,.69,.99])};function Ar(e,t){if(e)return typeof e==`function`?Dr()?Pt(e,t):`ease-out`:de(e)?Or(e):Array.isArray(e)?e.map(e=>Ar(e,t)||kr.easeOut):kr[e]}function jr(e,t,n,{delay:r=0,duration:i=300,repeat:a=0,repeatType:o=`loop`,ease:s=`easeOut`,times:c}={},l=void 0){let u={[t]:n};c&&(u.offset=c);let d=Ar(s,i);Array.isArray(d)&&(u.easing=d);let f={delay:r,duration:i,easing:Array.isArray(d)?`linear`:d,fill:`both`,iterations:a+1,direction:o===`reverse`?`alternate`:`normal`};return l&&(f.pseudoElement=l),e.animate(u,f)}function Mr(e){return typeof e==`function`&&`applyToOptions`in e}function Nr({type:e,...t}){return Mr(e)&&Dr()?e.applyToOptions(t):(t.duration??=300,t.ease??=`easeOut`,t)}var Pr=class extends On{constructor(e){if(super(),this.finishedTime=null,this.isStopped=!1,this.manualStartTime=null,!e)return;let{element:t,name:n,keyframes:r,pseudoElement:i,allowFlatten:a=!1,finalKeyframe:o,onComplete:s}=e;this.isPseudoElement=!!i,this.allowFlatten=a,this.options=e;let c=Nr(e);this.animation=jr(t,n,r,c,i),c.autoplay===!1&&this.animation.pause(),this.animation.onfinish=this.onFinish=()=>{if(this.animation.onfinish=null,this.finishedTime=this.time,!i){let e=xn(r,this.options,o,this.speed);this.updateMotionValue?.(e),Cr(t,n,e),this.animation.cancel()}s?.(),this.notifyFinished()},Dn(this,e,c)}play(){this.isStopped||(this.manualStartTime=null,this.animation.onfinish=this.onFinish,this.animation.play(),this.state===`finished`&&this.updateFinished())}pause(){this.animation.pause()}complete(){this.isStopped||(this.animation.onfinish=this.onFinish),this.animation.finish?.()}cancel(){this.animation.onfinish=null;try{this.animation.cancel()}catch{}}stop(){this.isStopped||(this.isStopped=!0,this.state!==`idle`&&this.finishedTime===null&&(this.updateMotionValue?this.updateMotionValue():this.commitStyles(),this.isPseudoElement||this.cancel()))}commitStyles(){let e=this.options?.element;!this.isPseudoElement&&e?.isConnected&&this.animation.commitStyles?.()}get duration(){let e=this.animation.effect?.getComputedTiming?.().duration||0;return E(Number(e))}get iterationDuration(){let{delay:e=0}=this.options||{};return this.duration+E(e)}get time(){return E(Number(this.animation.currentTime)||0)}set time(e){let t=this.finishedTime!==null;this.manualStartTime=null,this.finishedTime=null,this.animation.currentTime=T(e),t&&(this.animation.pause(),this.updateFinished())}get speed(){return this.animation.playbackRate}set speed(e){e<0&&(this.finishedTime=null),this.animation.playbackRate=e}get state(){return this.finishedTime===null?this.animation.playState:`finished`}get startTime(){return this.manualStartTime??Number(this.animation.startTime)}set startTime(e){this.manualStartTime=this.animation.startTime=e}attachTimeline({timeline:e,onAttach:t,observe:n}){return this.allowFlatten&&this.animation.effect?.updateTiming({easing:`linear`}),this.animation.onfinish=this.onFinish=null,e&&Er()?(this.animation.timeline=e,t?.(this.animation),x):n(this)}},Fr={anticipate:N,backInOut:M,circInOut:ae};function Ir(e){return e in Fr}function Lr(e){typeof e.ease==`string`&&Ir(e.ease)&&(e.ease=Fr[e.ease])}var Rr=class extends Pr{constructor(e){Lr(e),Cn(e),super(e),e.startTime!==void 0&&e.autoplay!==!1&&(this.startTime=e.startTime),this.options=e}elapsed(){return this.state===`running`?(F.now()-this.startTime)*this.speed:this.time*1e3}sample(e){if(!this.sampler){let{motionValue:e,onUpdate:t,onComplete:n,onPlay:r,onStop:i,element:a,...o}=this.options;this.sampler=new jn({...o,autoplay:!1}),this.sampler.stop()}return this.sampler.sample(Math.max(0,e)).value}liveValue(){let{state:e}=this;if(e===`running`||e===`paused`)return this.sample(this.elapsed())}updateMotionValue(e){let{motionValue:t,element:n,name:r}=this.options;if(!t)return;if(e!==void 0){t.set(e);return}let{speed:i}=this,a=this.elapsed(),o=this.state===`running`&&i?h(0,10,a):0,s=this.sample(a);n&&r&&Cr(n,r,s),t.setWithVelocity(this.sample(a-o*Math.sign(i)),s,o/Math.abs(i||1))}},zr=(e,t)=>t!==`zIndex`&&!!(typeof e==`number`||Array.isArray(e)||typeof e==`string`&&(z.test(e)||e===`0`)&&!e.startsWith(`url(`));function Br(e){let t=e[0];if(e.length===1)return!0;for(let n=0;n<e.length;n++)if(e[n]!==t)return!0}function Vr(e,t,n,r){let i=e[0];if(i===null)return!1;if(t===`display`||t===`visibility`)return!0;let a=e[e.length-1],o=zr(i,t),s=zr(a,t);return!o||!s?!1:Br(e)||(n===`spring`||Mr(n))&&r}function Hr(e){e.duration=0,e.type=`keyframes`}var Ur=new Set([`opacity`,`clipPath`,`filter`,`transform`]),Wr=/^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;function Gr(e){for(let t=0;t<e.length;t++)if(typeof e[t]==`string`&&Wr.test(e[t]))return!0;return!1}var Kr=({mixer:e,keyframes:t})=>e&&typeof t[0]!=`number`&&t.some((n,r)=>r&&e(t[r-1],n)),qr=new Set([`color`,`backgroundColor`,`outlineColor`,`fill`,`stroke`,`borderColor`,`borderTopColor`,`borderRightColor`,`borderBottomColor`,`borderLeftColor`]),Jr=()=>!g.useManualTiming&&Object.hasOwnProperty.call(Element.prototype,`animate`);function Yr(e){let{motionValue:t,name:n,repeatDelay:r,repeatType:i,damping:a,type:o,keyframes:s}=e;if(!n||!(Ur.has(n)||qr.has(n)))return!1;let c=t?.owner?.current;if(!(c instanceof HTMLElement)&&!(c instanceof SVGElement))return!1;let{onUpdate:l,transformTemplate:u}=t.owner.getProps();return Jr()&&(Ur.has(n)||qr.has(n)&&Gr(s))&&(n!==`transform`||!u)&&!l&&!r&&i!==`mirror`&&a!==0&&o!==`inertia`&&!Kr(e)}var Xr=(e,t)=>t&&typeof e==`number`?t.transform(e):e,Zr={x:`translateX`,y:`translateY`,z:`translateZ`,transformPerspective:`perspective`},Qr=U.length,$r={},ei=(e,t,n=Xr(t,Rn[e]))=>($r[e]||($r[e]=(Zr[e]||e)+`(`))+n+`)`,ti=(e,t)=>(typeof t==`number`?t:parseFloat(t))===+!!e.startsWith(`scale`);function ni(e,t,n){let r=``;for(let i=0;i<Qr;i++){let a=U[i],o=e[a];if(o===void 0)continue;let s=n&&(t[a]=Xr(o,H[a]));ti(a,o)||(r+=ei(a,o,s||void 0)+` `)}let i=e.pathRotation;return i&&(r+=ei(`rotate`,i)),r=r.trim(),n?n(t,r):r||`none`}var ri=new WeakMap,ii=200,ai=.001,oi=.1,si=.001,ci=100,li=100,ui=new Set([`linear`,`easeIn`,`easeOut`,`easeInOut`]),di=e=>ui.has(e),fi=new WeakMap,pi=(e,t)=>{let n=fi.get(e);return n?.[0]!==t&&(n=[t,`linear(`+mn(Array(t+1)).map(t=>An(e(t))+` `+An(t*100)+`%`)+`)`],fi.set(e,n)),n[1]},mi=(e,t)=>Math.min(ii,Math.max(2,Math.ceil((t-e)/10))),hi=(e,t)=>Math.abs(e-t)<=ai,gi=(e,t)=>e-t,_i=(e,t,n)=>mn(Array(n+1)).map(n=>dt(e,t,n)),vi=e=>e.motionValue.owner,yi=e=>ri.get(e),bi=({state:e})=>e===`idle`||e===`finished`,xi=(e,t)=>e.latestValues?e.latestValues[t]:e.getValue(t)?.get(),Si=({name:e,motionValue:t})=>e&&U.includes(e)&&t?.owner?.current instanceof HTMLElement&&Jr()&&Dr();function Ci(e){let t=vi(e),{onUpdate:n,transformTemplate:r}=t.getProps();return!e.isHandoff&&!n&&!e.hasOnUpdate&&!r&&e.type!==`inertia`&&(xi(t,`transform`)||`none`)===`none`&&!xi(t,`pathRotation`)&&!t.projection?.isProjecting()&&!Kr(e)}var wi=class{constructor(e,t,n,r){this.element=e,this.update=t,this.makeDriver=n,this.animation=r}get js(){return this.driver||=this.makeDriver(this.update)}now(){return this.driver||this.makeDriver!==Nt?this.js.now():P.isProcessing?P.timestamp:F.now()}start(e=!0){let t=yi(this.element);!t||t.isJS?this.js.start(e):t.schedule(!1,!e)}stopJS(){this.driver?.stop()}stop(){this.stopJS();let e=yi(this.element);e&&!e.isFinishing&&e.release(this.animation)}},Ti,Ei=class extends jn{constructor(e){let t=vi(e).current,{driver:n=Nt}=e,r,i=Ci(e);e.driver=e=>new wi(t,e,n,r),super(e),r=this;let a=this.driver;a&&(a.animation=this),this.canAccelerate=i;let{stop:o}=this;this.stop=()=>{this.isAccelerated()&&this.sync(),o()}}offsets(){let{keyframes:e,times:t}=this.options;return t||(this.offsetsOf!==e&&(this.offsetsOf=e,this.cachedOffsets=mn(e)),this.cachedOffsets)}get group(){return yi(vi(this.options).current)}get js(){return this.driver?.js}stopJS(){this.driver?.stopJS()}get name(){return this.options.name}timing(){let{startTime:e,speed:t,totalDuration:n}=this,{delay:r=0,repeatType:i}=this.options;return this.holdTime===null?n===1/0?[e+r/t,this.resolvedDuration*(i===`loop`?1:2)/t||1]:[e+(r+n)/t,0]:[1/0,0]}isAccelerated(){let{group:e,state:t}=this;return e?.tracks.has(this)&&!e.isJS&&this.canAccelerate&&(t===`running`||t===`paused`)}liveValue(){return this.isAccelerated()?this.sampleAt(F.now()):void 0}tween(){let{keyframes:e,type:t,repeat:n,delay:r=0}=this.options,i=-1;if(n||t!==_n||this.holdTime!==null)return;for(let t=1;t<e.length;t++)if(e[t]!==e[t-1]){if(i>=0)return;i=t-1}let{ease:a}=this.options;le(a)&&(a=a[i]);let o=this.offsets(),s=e=>this.startTime+(r+o[e]*this.totalDuration)/this.speed;if(i>=0){let e=de(a)?Or(a):di(a)?kr[a]:me(a);return[s(i),s(i+1),typeof e==`string`||hi(e(0),0)&&hi(e(1),1)?e:void 0]}}boundaries(e,t){let{startTime:n,speed:r,resolvedDuration:i,options:a}=this,{delay:o=0,repeat:s=0,repeatDelay:c=0,repeatType:l,type:u}=a,d=(u||_n)===_n?this.offsets():[0,1],f=n+o/r,p=[];if(this.holdTime!==null||!(i>0))return p;for(let n=Math.max(0,Math.floor((e-f)*r/i));n<=s;n++){let a=f+n*i/r;if(a>t)break;for(let o of d){let s=a+(n%2&&l&&l!==`loop`?1-o:o)*(i-c)/r;s>e&&s<t&&p.push(s)}}return p}numberAt(e){return parseFloat(this.sampleAt(e,!0))}sync(){let e=F.now(),t=this.sampleAt(e,!0);this.options.motionValue.setWithVelocity(this.holdTime===null?this.sampleAt(e-10,!0):t,t,10)}play(){this.isStopped||((this.group||ki(vi(this.options))).tracks.add(this),super.play())}pause(){super.pause(),this.isAccelerated()&&this.group.schedule(!1)}complete(){super.complete();let{group:e}=this;e&&!e.isJS&&this.tick(F.now())}get time(){return this.isAccelerated()?E(h(0,this.totalDuration,this.at(F.now())-(this.options.delay||0))):super.time}set time(e){(Ti??=Object.getOwnPropertyDescriptor(jn.prototype,`time`).set).call(this,e)}attachTimeline(e){return this.canAccelerate=!1,this.group?.demote(!0),super.attachTimeline(e)}},Di,Oi=e=>{Di||queueMicrotask(()=>{let e=Di;Di=void 0,e.forEach(e=>e())}),(Di||=[]).push(e)};function ki(e){let t=e.current,n=new Set,r=new Map,i={},a=[],o=new Map,s=[],c=!1,l=!1,u=!1,d=!1,f=-1/0,p,m=1/0,h,g=e=>{for(let t of n)if(t.name===e)return!0},_=(t,n)=>{let o={};for(let s of t===void 0?U:a){let a=r.get(s),c=t===void 0?xi(e,s):a?a.sampleAt(n>t&&!a.timing()[1]?n:t):i[s];c!==void 0&&(o[s]=c)}return o},v=(e,t)=>{let n=``;for(let r in e){let i=e[r];t&&ti(r,i)||(n+=ei(r,i)+` `)}return(t?n.trim():n)||`none`},y=(e,t)=>v(_(e,t)),b=(e=_())=>{t.style.transform=v(e,!0)},x=e=>{e.onfinish=e.oncancel=null,e.cancel()},S=(e=!0)=>{clearTimeout(p),m=1/0,h=void 0,e&&b(),s.forEach(({animation:e})=>x(e)),s=[]},w=(e,n)=>new Animation(new KeyframeEffect(t,e,n)),T=(e,t,n=1/0)=>{let r={animation:e,offset:t,end:n};e.startTime=F.now()+t,n<1/0&&(e.onfinish=()=>{r.isDone=!0,s.some(e=>e.end===1/0)&&(x(e),s=s.filter(e=>e!==r)),N.schedule(!1)}),e.oncancel=()=>s.includes(r)&&N.demote(),s.push(r)},E=(e,t,n)=>{let r=(t,n)=>Math.abs(e(n)-e(t)),i=r(t,n);for(;n-t>.01;){let e=(t+n)/2;r(t,e)>r(e,n)?n=e:t=e}return r(t,n)>i/2?[t,n]:[]},D=(e,t,n,r)=>{let i=mi(t,n);if(r.length*4>i)return;let a;for(let r of e){let e=r.numberAt(t),i=(r.numberAt((t+n)/2)-e)/(r.numberAt(n)-e);if(i===i){if(a===void 0)a=i;else if(!hi(i,a))return}}let o=_i(t,n,i).concat(r).sort(gi),s=e=>C(t,n,e),c,l;for(let n of e){let e=n.numberAt(t),r=o.map(t=>n.numberAt(t)-e),i=r[r.length-1],a=r.some(e=>Math.abs(e)*ai>Math.abs(i))?0:i,s=r.map(e=>a?e/a:e);if(a&&!c)c=s,l=t=>(n.numberAt(t)-e)/a;else if(s.some((e,t)=>!hi(e,a&&c[t])))return}if(!c||c.every((e,t)=>hi(e,s(o[t]))))return`linear`;let u=[],d=(e,t=l(e))=>u.push(An(t)+` `+An(s(e)*100)+`%`);return c.forEach((e,t)=>{t&&Math.abs(e-c[t-1])>.2&&E(l,o[t-1],o[t]).forEach(e=>d(e)),d(o[t],e)}),`linear(`+u+`)`},O=(e,t,n,r)=>{let i=[t],a=[],o=n,s=t;for(let r of e){let e=r.tween();if(e?.[2]!==`linear`){let[i,c]=r.timing(),[l,u]=e||[t,c?n:i];o=Math.min(o,l),s=Math.max(s,u),a.push(r)}}o=Math.max(t,o),s=Math.min(n,s);let c=(e,t)=>a.every(n=>!(Math.abs(n.numberAt((e+t)/2)-(n.numberAt(e)+n.numberAt(t))/2)>(n.name.startsWith(`scale`)?si:oi))),l=(t,n,r)=>{if(n-t<1||c(t,n))i.push(n);else if(r<4)l(t,(t+n)/2,r+1),l((t+n)/2,n,r+1);else{for(let r of e)i.push(...E(e=>r.numberAt(e),t,n));i.push(n)}},u=s>o?_i(o,s,Math.ceil((s-o)/100)):[];u.push(n);for(let e of r)u.push(e,Math.min(e+.01,n));let d=t;for(let e of u.sort(gi))e>d&&l(d,e,0),d=e;return i.sort(gi)},k=e=>{let t;for(let n of e){let e=n.tween();if(!e||t&&(Math.abs(e[0]-t[0])>1||Math.abs(e[1]-t[1])>1))return;t=[e[0],e[1],!t||e[2]===t[2]?e[2]:void 0]}return t},A=(e,t,n,r,i={fill:`both`},a)=>{let o=r?[]:e.flatMap(e=>e.boundaries(t,n)),s=r||D(e,t,n,o),c=s?[t,n]:O(e,t,n,o),l=c.map(e=>y(e,a)),u={transform:l};return s||(u.offset=c.map(e=>C(t,n,e))),l.every(e=>e===l[0])&&(b(_(t,a)),u=null),w(u,{...i,duration:n-t,easing:s||`linear`})},ee=e=>{let t=F.now()+e;t<m&&(clearTimeout(p),m=t,p=setTimeout(()=>{m=1/0,N.schedule(!1)},e))},j=t=>{let c=t,l=0,u=0,d=[],f=[],p=new Set;r.clear(),o=new Map;for(let e of n){r.set(e.name,e);let[n,i]=e.timing(),a=n===1/0;if(o.set(e,[e.at(t),e.speed,a]),!a){if(e.speed<0)return;if(i){if(l){let e=(n-u)/i;if(Math.abs(i-l)>1||Math.abs(e-Math.round(e))*l>1)return}else l=i,u=n;f.push(e)}else p.add(n);d.push(e),c=Math.max(c,n)}}i={},a=U.filter(t=>{if(r.has(t))return!0;let n=i[t]=xi(e,t);return n!==void 0&&!ti(t,n)}),S(!1);let m=!l&&k(d);try{if(c>t){let e;if(m&&m[1]>t){let[n,r,i]=m;if(n-t>li)return d.forEach(e=>e.sync()),ee(h=n-t-li),!0;e=typeof i==`string`?i:i?pi(i,mi(n,r)):D(d,n,r,[]),e&&T(A(d,n,r,e,{fill:`both`,endDelay:c-r}),n-t,c-n)}e||T(A(d,t,c),0,c-t),p.forEach(e=>e<c-1&&T(w(null,{duration:e-t}),0,e-t))}if(l){let e=u+Math.floor((c-u)/l)*l;T(A(f,e,e+l,void 0,{iterations:1/0,iterationStart:(c-e)/l,fill:`forwards`},c),c-t)}}catch{return}return s.length||S(),!0},te=(e,t)=>{let r,i=0;for(let t of n){let n=o.get(t);if(!n)return!1;let[a,c,l]=n,u=t.at(e),d=t.timing()[0]===1/0;if(l){if(d&&(u===a||!s.length))continue;return!1}let f=(u-a)/c,p=d?0:t.speed/c;if(r===void 0)r=f,i=p;else if(Math.abs(f-r)>1||p!==i)return!1}if(r===void 0)return!0;if(!s.length){if(h===void 0||t&&i)return!1;if(i){let e=(h-r)/i;if(e<1)return!1;ee(e)}return!0}for(let{offset:e,end:n,isDone:i}of s){let a=r-e;if(n<1/0&&(i?a<n-1:a<0&&(t||e<=0)||a>=n))return!1}for(let{animation:t,offset:n,isDone:a}of s){if(a)continue;let o=r-n;i&&t.updatePlaybackRate&&t.playState===`running`&&Math.abs(Number(t.currentTime)-o)<20?t.playbackRate!==i&&t.updatePlaybackRate(i):i?(t.playbackRate!==i&&(t.playbackRate=i),t.startTime=e-o/i):(t.startTime=null,t.currentTime=o)}return!0},ne=()=>!n.size&&(u=!0,yi(t)===N&&ri.delete(t),N.isJS||S(),!0),M=()=>{let t=F.now();if(N.isJS||(N.isFinishing=!0,n.forEach(n=>{let[r,a]=n.timing();n.state===`running`&&n.speed>0&&!a&&r<=t+1&&(n.complete(),i[n.name]=xi(e,n.name),o.has(n)||(c=!0))}),N.isFinishing=!1),l=!1,u||(n.forEach(e=>bi(e)&&n.delete(e)),ne()))return;for(let e of n)if(!e.canAccelerate)return N.demote(!0);N.isJS&&(N.isJS=!1,c=!0,n.forEach(e=>e.stopJS()));let r=c,a=d;if(c=d=!1,r||!te(t,a)){if(a){if(t-f<ci)return N.demote();f=t}if(!j(t))return N.demote()}else if(h!==void 0&&!a)return;n.forEach(e=>e.timing()[0]===1/0&&e.sync())},N={tracks:n,isJS:!1,isFinishing:!1,schedule(e,t){u||(c||=e,d||=!!t,l||(l=!0,P.isProcessing?B.render(M,!1,!0):Oi(M)))},release(e){bi(e)&&n.delete(e),ne()||N.schedule(!0)},check(){if(!N.isJS){for(let t in i)if(xi(e,t)!==i[t]&&!g(t))return N.schedule(!0,!0)}},demote(e){if(!(N.isJS||u))return n.forEach(t=>{t.isAccelerated()&&t.sync(),e||(t.canAccelerate=!1)}),N.isJS=!0,o=new Map,S(),n.forEach(e=>e.state===`running`&&e.js?.start()),!0}};return ri.set(t,N),N}var Ai=class extends On{constructor(e){super(),this.stop=()=>{this._animation&&(this._animation.stop(),this.stopTimeline?.()),this.keyframeResolver?.cancel()},this.createdAt=F.now();let{keyframes:t,name:n,motionValue:r,element:i}=e,a=e;a.autoplay??=!0,a.delay??=0,a.type??=`keyframes`,a.repeat??=0,a.repeatDelay??=0,a.repeatType??=`loop`;let o=i?.KeyframeResolver||xr;this.keyframeResolver=new o(t,(e,t,n)=>this.onKeyframesResolved(e,t,a,!n),n,r,i),this.keyframeResolver?.scheduleResolve()}onKeyframesResolved(e,t,n,r){this.keyframeResolver=void 0;let{name:i,type:a,velocity:o,delay:s,isHandoff:c,onUpdate:l}=n;this.resolvedAt=F.now();let u=Vr(e,i,a,o);u||((g.instantAnimations||!s)&&l?.(xn(e,n,t)),e[0]=e[e.length-1],Hr(n),n.repeat=0);let{onComplete:d}=n;n.finalKeyframe=t,n.keyframes=e,n.onComplete=()=>{d?.(),this.notifyFinished()};let f=u&&!c&&Yr(n),p=!f&&Si(n);r&&(f||p||this.resolvedAt!==this.createdAt)&&(n.startTime??=Tn(this.createdAt,this.resolvedAt));let m;if(f){n.element=n.motionValue?.owner?.current;try{m=new Rr(n)}catch{m=new jn(n)}}else m=p?new Ei(n):new jn(n);this.pendingTimeline&&=(this.stopTimeline=m.attachTimeline(this.pendingTimeline),void 0),this._animation=m}get finished(){return this._animation?this._animation.finished:super.finished}then(e,t){return this.finished.finally(e).then(()=>{})}liveValue(){return this._animation?.liveValue?.()}get animation(){return this._animation||(this.keyframeResolver?.resume(),yr()),this._animation}get duration(){return this.animation.duration}get iterationDuration(){return this.animation.iterationDuration}get time(){return this.animation.time}set time(e){this.animation.time=e}get speed(){return this.animation.speed}get state(){return this.animation.state}set speed(e){this.animation.speed=e}get startTime(){return this.animation.startTime}attachTimeline(e){return this._animation?this.stopTimeline=this.animation.attachTimeline(e):this.pendingTimeline=e,()=>this.stop()}play(){this.animation.play()}pause(){this.animation.pause()}complete(){this.animation.complete()}cancel(){this._animation?.cancel(),this.keyframeResolver?.cancel()}},ji=class{constructor(e){this.stop=()=>{for(let e of this.animations)e.stop()},this.animations=e.filter(Boolean)}get finished(){return Promise.all(this.animations.map(e=>e.finished))}getAll(e){return this.animations[0][e]}attachTimeline(e){let t=this.animations.map(t=>t.attachTimeline(e));return()=>{t.forEach((e,t)=>{e&&e(),this.animations[t].stop()})}}get time(){return this.getAll(`time`)}set time(e){for(let t of this.animations)t.time=e}get speed(){return this.getAll(`speed`)}set speed(e){for(let t of this.animations)t.speed=e}get state(){return this.getAll(`state`)}get startTime(){return this.getAll(`startTime`)}get duration(){return Mi(this.animations,`duration`)}get iterationDuration(){return Mi(this.animations,`iterationDuration`)}play(){for(let e of this.animations)e.play()}pause(){for(let e of this.animations)e.pause()}cancel(){for(let e of this.animations)e.cancel()}complete(){for(let e of this.animations)e.complete()}};function Mi(e,t){let n=0;for(let r=0;r<e.length;r++){let i=e[r][t];i!==null&&i>n&&(n=i)}return n}var Ni=class extends ji{then(e,t){return this.finished.finally(e).then(()=>{})}};function Pi(e,t,n,r=0,i=1){let a=Array.from(e).sort((e,t)=>e.sortNodePosition(t)).indexOf(t),o=e.size,s=(o-1)*r;return typeof n==`function`?n(a,o):i===1?a*r:s-a*r}var Fi=30,Ii=e=>!isNaN(parseFloat(e)),Li={current:void 0},Ri=class{constructor(e,t={}){this.canTrackVelocity=null,this.events={},this.updateAndNotify=e=>{let t=F.now();if(this.updatedAt!==t&&this.setPrevFrameValue(),this.prev=this.current,this.setCurrent(e),this.current!==this.prev&&(this.dirty(),this.dependents))for(let e of this.dependents)e.dirty()},this.hasAnimated=!1,this.setCurrent(e),this.owner=t.owner}setCurrent(e){this.current=e,this.updatedAt=F.now(),this.canTrackVelocity===null&&e!==void 0&&(this.canTrackVelocity=Ii(this.current))}setPrevFrameValue(e=this.current){this.prevFrameValue=e,this.prevUpdatedAt=this.updatedAt}onChange(e){return this.on(`change`,e)}on(e,t){var n;return e===`change`?this.onChangeSubscribe(t):((n=this.events)[e]||(n[e]=new w)).add(t)}onChangeSubscribe(e){let{events:t}=this;return!t.change&&!this.changeSubscriber?this.changeSubscriber=e:(t.change||(t.change=new w,t.change.add(this.changeSubscriber),this.changeSubscriber=void 0),t.change.add(e)),()=>{this.changeSubscriber===e?this.changeSubscriber=void 0:t.change?.remove(e),this.stopIfUnobserved()}}stopIfUnobserved(){B.read(()=>{!this.changeSubscriber&&!this.events.change?.getSize()&&this.stop()})}clearListeners(){this.changeSubscriber=void 0;for(let e in this.events)this.events[e].clear()}attach(e,t){this.passiveEffect=e,this.stopPassiveEffect=t}set(e){this.passiveEffect?this.passiveEffect(e,this.updateAndNotify):this.updateAndNotify(e)}setWithVelocity(e,t,n){this.set(t),this.prev=void 0,this.prevFrameValue=e,this.prevUpdatedAt=this.updatedAt-n}jump(e,t=!0){t&&(this.updatedAt=F.now(),this.stop()),this.updateAndNotify(e),this.prev=e,this.prevUpdatedAt=this.prevFrameValue=void 0,this.stopPassiveEffect?.()}dirty(){let{current:e,changeSubscriber:t}=this;t?t(e):this.events.change?.notify(e)}addDependent(e){(this.dependents||=new Set).add(e)}removeDependent(e){this.dependents?.delete(e)}get(){Li.current?.push(this);let e=this.animation?.liveValue?.();return e===void 0?this.current:e}getCurrent(){return this.current}getPrevious(){return this.prev}getVelocity(){let e=F.now();if(!this.canTrackVelocity||this.prevFrameValue===void 0||e-this.updatedAt>Fi)return 0;let t=Math.min(this.updatedAt-this.prevUpdatedAt,Fi);return D(parseFloat(this.current)-parseFloat(this.prevFrameValue),t)}start(e){return new Promise(t=>this.run(e,t))}run(e,t){this.stop(),this.hasAnimated=!0;let n=!1,r;r=e(()=>{n=!0,this.events.animationComplete?.notify(),this.animation===r&&(this.animation=void 0),t?.()}),n||(this.animation=r),this.events.animationStart?.notify()}stop(){this.animation&&(this.animation.stop(),this.events.animationCancel?.notify()),this.animation=void 0}isAnimating(){return!!this.animation}destroy(){this.dependents?.clear(),this.events.destroy?.notify(),this.clearListeners(),this.stop(),this.stopPassiveEffect?.()}};function zi(e,t){return new Ri(e,t)}function Bi(e,t){if(e?.inherit&&t){let{inherit:n,...r}=e;return{...t,...r}}return e}function Vi(e,t){let n=e?.[t]??e?.default??e;return n===e?n:Bi(n,e)}var Hi={type:`spring`,stiffness:500,damping:25,restSpeed:10},Ui=e=>({type:`spring`,stiffness:550,damping:e===0?2*Math.sqrt(550):30,restSpeed:10}),Wi={type:`keyframes`,duration:.8},Gi={type:`keyframes`,ease:[.25,.1,.35,1],duration:.3},Ki=(e,{keyframes:t})=>t.length>2?Wi:W.has(e)?e.startsWith(`scale`)?Ui(t[1]):Hi:Gi,qi=new Set([`when`,`delay`,`delayChildren`,`staggerChildren`,`staggerDirection`,`repeat`,`repeatType`,`repeatDelay`,`from`,`elapsed`,`out`,`mixer`]);function Ji(e){for(let t in e)if(!qi.has(t))return!0;return!1}var Yi=(e,t,n,r={},i,a)=>o=>{let s=Vi(r,e)||{},c=s.delay||r.delay||0,{elapsed:l=0}=r;l-=T(c);let u={keyframes:Array.isArray(n)?n:[null,n],ease:`easeOut`,velocity:t.getVelocity(),...s,delay:-l,onUpdate:e=>{t.set(e),s.onUpdate&&s.onUpdate(e)},onComplete:()=>{o(),s.onComplete&&s.onComplete()},name:e,motionValue:t,element:a?void 0:i,hasOnUpdate:!!s.onUpdate};Ji(s)||Object.assign(u,Ki(e,u)),u.duration&&=T(u.duration),u.repeatDelay&&=T(u.repeatDelay),u.from!==void 0&&(u.keyframes[0]=u.from);let d=!1;if((u.type===!1||u.duration===0&&!u.repeatDelay)&&(Hr(u),u.delay===0&&(d=!0)),(g.instantAnimations||g.skipAnimations||i?.shouldSkipAnimations||s.skipAnimations)&&(d=!0,Hr(u),u.delay=0),u.allowFlatten=!s.type&&!s.ease,d&&!a&&t.get()!==void 0){let e=xn(u.keyframes,s);if(e!==void 0){B.update(()=>{u.onUpdate(e),u.onComplete()});return}}return s.isSync?new jn(u):new Ai(u)},Xi=/^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;function Zi(e){let t=Xi.exec(e);if(!t)return[,];let[,n,r,i]=t;return[`--${n??r}`,i]}function Qi(e,t,n=1){let[r,i]=Zi(e);if(!r)return;let a=window.getComputedStyle(t).getPropertyValue(r);if(a){let e=a.trim();return _(e)?parseFloat(e):e}return xe(i)?Qi(i,t,n+1):i}function $i(e){let t=[{},{}];return e?.values.forEach((e,n)=>{t[0][n]=e.get(),t[1][n]=e.getVelocity()}),t}function ea(e,t,n,r){let i=t=>typeof t==`function`?t(n===void 0?e.custom:n,...$i(r)):t;return t=i(t),typeof t==`string`&&(t=e.variants&&e.variants[t]),i(t)}function ta(e,t,n){return ea(e.getProps(),t,n,e)}var na=(e,t)=>t===`exit`?e.presenceContext?.custom:void 0,ra=new Set([`width`,`height`,`top`,`left`,`right`,`bottom`,...U]),ia=e=>Array.isArray(e);function aa(e,t,n){e.hasValue(t)?e.getValue(t).set(n):e.addValue(t,zi(n))}function oa(e){return ia(e)?e[e.length-1]||0:e}function sa(e,t){let{transitionEnd:n={},transition:r={},...i}=ta(e,t)||{};i={...i,...n};for(let t in i)aa(e,t,oa(i[t]))}var G=e=>!!(e&&e.getVelocity);function ca(e){return!!(G(e)&&e.add)}function la(e,t){let n=e.getValue(`willChange`);if(ca(n))return n.add(t);if(!n&&g.WillChange){let n=new g.WillChange(`auto`);e.addValue(`willChange`,n),n.add(t)}}var ua=`data-framer-appear-id`;function da(e){return e.props[ua]}var fa=typeof window<`u`;function pa({protectedKeys:e,needsAnimating:t},n){let r=n in e&&!t[n];return t[n]=!1,r}function ma(e,t,{delay:n=0,transitionOverride:r,type:i}={}){let{transition:a,transitionEnd:o,...s}=t,c=e.getDefaultTransition();a=a?Bi(a,c):c;let l=a?.reduceMotion,u=a?.skipAnimations;r&&(a=r);let d=[],f=i&&e.animationState?.getState()[i],p=a?.path;p&&(p.animateValues?p.animateValues(t=>e.getValue(t,e.latestValues[t]??0),s,a,n,d):p.animateVisualElement?.(e,s,a,n,d));for(let t in s){let r=e.getValue(t,e.latestValues[t]??null),i=s[t];if(i===void 0||f&&pa(f,t))continue;let o={delay:n,...Vi(f?.out[t]||a||{},t)};u&&(o.skipAnimations=!0);let c=r.get();if(c!==void 0&&!r.isAnimating()&&!Array.isArray(i)&&i===c&&!o.velocity){B.update(()=>r.set(i));continue}let p=!1;if(fa&&window.MotionHandoffAnimation){let n=da(e);if(n){let e=window.MotionHandoffAnimation(n,t,B);e!==null&&(o.startTime=e,p=!0)}}la(e,t);let m=l??e.shouldReduceMotion;r.run(Yi(t,r,i,m&&ra.has(t)?{type:!1}:o,e,p));let h=r.animation;h&&d.push(h)}if(o){let t=()=>B.update(()=>{o&&sa(e,o)});d.length?Promise.all(d).then(t):t()}return d}function ha(e,t,n={}){let r=ta(e,t,na(e,n.type)),i=n.transitionOverride||(r?.transition??(e.getDefaultTransition()||{})),a=()=>Promise.all(r?ma(e,r,n):[]),o=(r=0)=>{let{variantChildren:a}=e,{delayChildren:o=0,staggerChildren:s,staggerDirection:c}=i,l=[];return a?.forEach(e=>{e.notify(`AnimationStart`,t),l.push(ha(e,t,{...n,delay:r+(typeof o==`function`?0:o)+Pi(a,e,o,s,c)}).then(()=>e.notify(`AnimationComplete`,t)))}),Promise.all(l)},{when:s}=i;return s?s===`beforeChildren`?a().then(()=>o()):o().then(a):Promise.all([a(),o(n.delay)])}function ga(e,t,n={}){return e.notify(`AnimationStart`,t),(Array.isArray(t)?Promise.all(t.map(t=>ha(e,t,n))):typeof t==`string`?ha(e,t,n):Promise.all(ma(e,ta(e,t,n.custom),n))).then(()=>{e.notify(`AnimationComplete`,t)})}var _a={test:e=>e===`auto`,parse:e=>e},va=e=>t=>t.test(e),ya=[we,L,ze,I,Ve,Be,_a],ba=e=>ya.find(va(e));function xa(e){return typeof e==`number`?e===0:e===null||e===`none`||e===`0`||y(e)}var Sa=new Set([`auto`,`none`,`0`]);function Ca(e,t,n){let r=0,i;for(;r<e.length&&!i;){let t=e[r];typeof t==`string`&&!Sa.has(t)&&et(t)&&(i=e[r]),r++}if(i&&n)for(let r of t)e[r]!==i&&(e[r]=Gn(n,i))}var wa=class extends xr{constructor(e,t,n,r,i){super(e,t,n,r,i,!0)}scheduleResolve(){if(this.canReadNow()&&(this.readKeyframes(),!this.needsMeasurement))return this.complete();super.scheduleResolve()}canReadNow(){let{unresolvedKeyframes:e,element:t,motionValue:n}=this,r=e[0]??n?.get();if(!t?.current||r===void 0)return!1;for(let t=0;t<e.length;t++)if(Ce(t?e[t]:r))return!1;return!0}readKeyframes(){let{unresolvedKeyframes:e,element:t,name:n}=this;if(!t?.current)return;super.readKeyframes();for(let n=0;n<e.length;n++){let r=e[n];if(typeof r==`string`&&(r=r.trim(),xe(r))){let i=Qi(r,t.current);i!==void 0&&(e[n]=i),n===e.length-1&&(this.finalKeyframe=r)}}if(this.resolveNoneKeyframes(),!ra.has(n)||e.length!==2)return;let[r,i]=e;if(typeof r==`number`&&typeof i==`number`)return;let a=ba(r),o=ba(i);if(Ce(r)!==Ce(i)&&fr[n])this.needsMeasurement=!0;else if(a!==o){if(ir(a)&&ir(o))for(let t=0;t<e.length;t++){let n=e[t];typeof n==`string`&&(e[t]=parseFloat(n))}else fr[n]&&(this.needsMeasurement=!0)}}resolveNoneKeyframes(){let{unresolvedKeyframes:e,name:t}=this,n=[];for(let t=0;t<e.length;t++)(e[t]===null||xa(e[t]))&&n.push(t);n.length&&Ca(e,n,t)}measure(){let{element:e,name:t}=this;return fr[t](window.getComputedStyle(e.current),()=>e.measureViewportBox())}measureInitialState(){let{element:e,unresolvedKeyframes:t,name:n}=this;if(!e?.current)return;n===`height`&&(this.suspendedScrollY=window.pageYOffset),this.measuredOrigin=this.measure(),t[0]=this.measuredOrigin;let r=t[t.length-1];r!==void 0&&this.motionValue?.jump(r,!1)}measureEndState(){let{element:e,unresolvedKeyframes:t}=this;if(!e?.current)return;this.motionValue?.jump(this.measuredOrigin,!1);let n=t.length-1,r=t[n];t[n]=this.measure(),r!==null&&this.finalKeyframe===void 0&&(this.finalKeyframe=r),this.resolveNoneKeyframes()}},Ta=[];function Ea(e){Da(e),Ta.unshift(e)}function Da(e){m(Ta,e)}function Oa(e){return Ta.find(t=>t.test(e))}function ka(e,t,n={},r){let i=[],{velocity:a,path:o}=n,s=n.reduceMotion??r?.shouldReduceMotion;o?.animateValues&&r&&(t={...t},o.animateValues(e,t,n,0,i));for(let o in t){if(o===`transition`||o===`transitionEnd`)continue;let c=t[o];if(c===void 0)continue;let l=e(o),u=l.get();u!==void 0&&!l.isAnimating()&&!Array.isArray(c)&&c===u&&!a?B.update(()=>l.set(c)):(l.run(Yi(o,l,c,s&&ra.has(o)?{type:!1}:n,r)),l.animation&&i.push(l.animation))}let{transitionEnd:c}=t;if(c){let t=()=>B.update(()=>{for(let t in c)e(t).set(c[t])});i.length?Promise.all(i).then(t):t()}return i}function Aa(e,t,n,r,i){let a,o=!1,s=ka(r=>{let s=a?.[r]??e.get(t,r);if(!s){let c;if(!i){let i=n[r];c=ja(i)??e.read(t,r,i)}s=zi(c,{owner:i}),o?e(t,{[r]:s}):(a||={})[r]=s}return s},n,r,i);return o=!0,a&&e(t,a),s}function ja(e){let t=Array.isArray(e)?e[0]:void 0;return t===null?void 0:t}function Ma(e){return v(e)&&`offsetHeight`in e&&!(`ownerSVGElement`in e)}function Na(e){return v(e)&&`ownerSVGElement`in e}var K={};function Pa(e){return K.current?.add(e),e}var Fa=e=>K.current?K.current.bind(e):e;function Ia(e,t,n){if(e==null)return[];if(e instanceof EventTarget)return[e];if(typeof e==`string`){let r=t?t.current:K.current?.root||document,i=n?.[e]??r.querySelectorAll(e);return i?Array.from(i):[]}return Array.from(e).filter(e=>e!=null)}var La=class{constructor(e=B.render){this.step=e,this.values=new Map,this.pending=[],this.numPending=0,this.flush=()=>{let{pending:e,numPending:t}=this;this.numPending=0;for(let n=0;n<t;n++)e[n]()}}set(e,t,n,r){if(this.values.get(e)?.onRemove(),r)for(let e of this.values.values())e.value===r&&(n=e.render);let i=()=>n&&this.schedule(n);t.get()!==void 0&&i();let a=t.on(`change`,i),o=()=>{a(),n&&!r&&this.cancel(n),this.values.get(e)?.onRemove===o&&this.values.delete(e)};return this.values.set(e,{value:t,render:r?void 0:n,onRemove:o}),o}get(e){return this.values.get(e)?.value}release(){let e=new Map;return this.values.forEach((t,n)=>{e.set(n,t.value),t.onRemove()}),this.transformKeys=this.transformValues=void 0,e}schedule(e){let{pending:t,numPending:n}=this;for(let r=0;r<n;r++)if(t[r]===e)return;n||this.step(this.flush),t[this.numPending++]=e}cancel(e){let{pending:t}=this;for(let n=0;n<this.numPending;n++)if(t[n]===e){t[n]=t[--this.numPending];return}}};function Ra(e,{step:t,...n}={}){let r=new WeakMap;return Object.assign((n,i)=>{let a=r.get(n)??new La(t);r.set(n,a);let o=[];for(let t in i){let r=e(n,a,t,i[t]);o.push(r)}return()=>{for(let e of o)e()}},n,{get:(e,t)=>r.get(e)?.get(t),flush:e=>r.get(e)?.flush(),state:e=>r.get(e)})}function za(e){let t=``,{transformKeys:n=[],transformValues:r={}}=e;for(let e=0;e<n.length;e++){let i=n[e],a=r[i].getCurrent();a!==void 0&&(ti(i,a)||(t+=(t&&` `)+ei(i,a)))}let i=e.get(`pathRotation`)?.get();return i&&(t+=(t&&` `)+ei(`rotate`,i)),t||`none`}var Ba=new Set([`originX`,`originY`,`originZ`]),Va=(e,t)=>Xr(e.get(t)?.get(),H[t]),Ha=(e,t,n,r)=>{let i,a;if(W.has(n)){if(n!==`pathRotation`){let e=t.transformKeys??=[];(t.transformValues??={})[n]=r,e.includes(n)||(e.push(n),e.sort((e,t)=>U.indexOf(e)-U.indexOf(t)))}t.get(`transform`)||(!Ma(e)&&!t.get(`transformBox`)&&Ha(e,t,`transformBox`,new Ri(`fill-box`)),t.set(`transform`,new Ri(`none`),()=>{ri.get(e)?.check(),e.style.transform=za(t)})),a=t.get(`transform`)}else Ba.has(n)?(t.get(`transformOrigin`)||t.set(`transformOrigin`,new Ri(``),()=>{let n=Va(t,`originX`)??`50%`,r=Va(t,`originY`)??`50%`,i=Va(t,`originZ`)??0;e.style.transformOrigin=`${n} ${r} ${i}`}),a=t.get(`transformOrigin`)):i=Sr(n)?()=>{e.style.setProperty(n,r.getCurrent())}:()=>{e.style[n]=Xr(r.getCurrent(),H[n])};return t.set(n,r,i,a)},Ua=e=>Ma(e)||Na(e),Wa=(e,t)=>{if(W.has(t))return rr(e,t);let n=getComputedStyle(e),r=Sr(t)?n.getPropertyValue(t):n[t];return typeof r==`string`&&r.trim()||0},Ga=Ra(Ha,{test:Ua,read:Wa});function Ka(e){return e.replace(/([A-Z])/g,e=>`-${e.toLowerCase()}`)}function qa(e,t,n){let{style:r,vars:i,transformOrigin:a}=e,o=!1,s=!1;for(let e in t){let n=t[e];if(W.has(e))o=!0;else if(ye(e))i[e]=n;else{let t=Xr(n,H[e]);e.startsWith(`origin`)?(s=!0,a[e]=t):r[e]=t}}if(t.transform||(o||n?r.transform=ni(t,e.transform,n):r.transform&&=`none`),s){let{originX:e=`50%`,originY:t=`50%`,originZ:n=0}=a;r.transformOrigin=`${e} ${t} ${n}`}}var Ja={offset:`stroke-dashoffset`,array:`stroke-dasharray`},Ya={offset:`strokeDashoffset`,array:`strokeDasharray`};function Xa(e,t,n=1,r=0,i=!0){e.pathLength=1;let a=i?Ja:Ya;e[a.offset]=`${-r}`,e[a.array]=`${t} ${n}`}var Za=[`transform`,`opacity`,`clipPath`,`filter`,`offsetDistance`,`offsetPath`,`offsetRotate`,`offsetAnchor`];function Qa(e,{attrX:t,attrY:n,attrScale:r,pathLength:i,pathSpacing:a=1,pathOffset:o=0,...s},c,l,u){if(qa(e,s,l),c){e.style.viewBox&&(e.attrs.viewBox=e.style.viewBox);return}e.attrs=e.style,e.style={};let{attrs:d,style:f}=e;for(let e of Za)d[e]!==void 0&&(f[e]=d[e],delete d[e]);(f.transform||d.transformOrigin)&&(f.transformOrigin=d.transformOrigin??`50% 50%`,delete d.transformOrigin),f.transform&&(f.transformBox=u?.transformBox??`fill-box`,delete d.transformBox),t!==void 0&&(d.x=t),n!==void 0&&(d.y=n),r!==void 0&&(d.scale=r),i!==void 0&&Xa(d,i,a,o,!1)}function $a(e,t){if(!(t in e))return!1;let n=Object.getOwnPropertyDescriptor(Object.getPrototypeOf(e),t)||Object.getOwnPropertyDescriptor(e,t);return n&&typeof n.set==`function`}var eo=(e,t,n,r,i=n)=>{let a=$a(e,i);!a&&(i.startsWith(`data`)||i.startsWith(`aria`))&&(i=Ka(i));let o=H[n]||H[i],s=a?()=>{e[i]=Xr(r.get(),H[n])}:()=>{let t=Xr(r.get(),o);t==null?e.removeAttribute(i):e.setAttribute(i,String(t))};return t.set(n,r,s)};function to(e,t,n,r){return B.render(()=>e.setAttribute(`pathLength`,`1`)),n===`pathOffset`?t.set(n,r,()=>{let t=r.get();e.setAttribute(`stroke-dashoffset`,`${-t}`)}):(t.get(`stroke-dasharray`)||t.set(`stroke-dasharray`,new Ri(`1 1`),()=>{let n=t.get(`pathLength`)?.get()??1,r=t.get(`pathSpacing`)?.get();e.setAttribute(`stroke-dasharray`,`${n} ${r??1-Number(n)}`)}),t.set(n,r,void 0,t.get(`stroke-dasharray`)))}var no=Ra((e,t,n,r)=>n.startsWith(`path`)&&!W.has(n)?to(e,t,n,r):n.startsWith(`attr`)?eo(e,t,n,r,ro(n)):n===`d`?t.set(n,r,()=>{let t=r.get()?.replace(/path\(|["')]/g,``);t===void 0?e.removeAttribute(n):e.setAttribute(n,t)}):(W.has(n)||Ba.has(n)||Sr(n)||n in e.style?Ha:eo)(e,t,n,r),{test:Na,read:(e,t)=>W.has(t)?H[t]?.default||0:Sr(t)||Za.includes(t)?Wa(e,t)||e.getAttribute(Ka(t))||0:(t=ro(t),e.getAttribute(Ka(t))??e.getAttribute(t)??void 0)});function ro(e){return e.replace(/^attr([A-Z])/,(e,t)=>t.toLowerCase())}function io({top:e,left:t,right:n,bottom:r}){return{x:{min:t,max:n},y:{min:e,max:r}}}function ao(e,t){if(!t)return e;let n=t({x:e.left,y:e.top}),r=t({x:e.right,y:e.bottom});return{top:n.y,left:n.x,bottom:r.y,right:r.x}}function oo(e,t){return io(ao(e.getBoundingClientRect(),t))}var so={},co=e=>Na(e)?no:Ga,lo=class{constructor(e,t){this.effect=e,this.current=t,this.KeyframeResolver=wa}getValue(e){return this.effect.get(this.current,e)}readValue(e,t){return this.effect.read(this.current,e,t)}render(){this.effect.flush(this.current)}measureViewportBox(){return oo(this.current)}getProps(){return so}};function uo(e,t,n,r){if(K.current?.track(e),r)return ka(e=>r.getValue(e,null),t,n,r);let i=co(e);return Aa(i,e,t,n,new lo(i,e))}var fo=Ra((e,t,n,r)=>t.set(n,r,()=>{e[n]=r.get()}),{test:e=>v(e),read:(e,t)=>{let n=e[t];return typeof n==`string`||typeof n==`number`?n:void 0}}),{schedule:po,cancel:mo}=jt(queueMicrotask,!1);function ho(e,t,n){let r=G(e)?e:zi(e);return r.run(Yi(``,r,t,n)),r.animation}var go={};function _o(e){return G(e)?e.get():e}var vo=e=>typeof e==`number`?e:parseFloat(e),yo=()=>({min:0,max:0}),bo=()=>({x:yo(),y:yo()});function xo(e,t,n,r={passive:!0}){return e.addEventListener(t,n,r),()=>e.removeEventListener(t,n,r)}var So={current:void 0},Co=new WeakMap;function wo(e){return typeof e==`object`&&!!e&&typeof e.start==`function`}function To(e){return typeof e==`string`||Array.isArray(e)}var Eo=[`animate`,`whileInView`,`whileFocus`,`whileHover`,`whileTap`,`whileDrag`,`whilePinch`,`exit`],Do=[`initial`].concat(Eo);function Oo(e){if(wo(e.animate))return!0;for(let t=0;t<Do.length;t++)if(To(e[Do[t]]))return!0;return!1}function ko(e){return!!(Oo(e)||e.variants)}function Ao(e,t,n){for(let r in t){let i=t[r],a=n[r];if(G(i))e.addValue(r,i);else if(G(a))e.addValue(r,zi(i,{owner:e}));else if(a!==i){if(e.hasValue(r)){let t=e.getValue(r);t.liveStyle===!0?t.jump(i):t.hasAnimated||t.set(i)}else{let t=e.getStaticValue(r);e.addValue(r,zi(t===void 0?i:t,{owner:e}))}}}for(let r in n)t[r]===void 0&&e.removeValue(r);return t}var jo={current:null},Mo={current:!1},No=typeof window<`u`;function Po(){if(Mo.current=!0,No){if(window.matchMedia){let e=window.matchMedia(`(prefers-reduced-motion)`),t=()=>jo.current=e.matches;e.addEventListener(`change`,t),t()}else jo.current=!1}}var Fo=[`AnimationStart`,`AnimationComplete`,`Update`,`BeforeLayoutMeasure`,`LayoutMeasure`,`LayoutAnimationStart`,`LayoutAnimationComplete`],Io={};function Lo(e){Io=e}function Ro(){return Io}var zo=class{scrapeMotionValuesFromProps(e,t,n){return{}}constructor({parent:e,props:t,presenceContext:n,reducedMotionConfig:r,skipAnimations:i,blockInitialAnimation:a,visualState:o},s={}){this.current=null,this.children=new Set,this.isVariantNode=!1,this.isControllingVariants=!1,this.shouldReduceMotion=null,this.shouldSkipAnimations=!1,this.values=new Map,this.KeyframeResolver=xr,this.features={},this.valueSubscriptions=new Map,this.prevMotionValues={},this.hasBeenMounted=!1,this.events={},this.propEventSubscriptions={},this.notifyUpdate=()=>this.notify(`Update`,this.latestValues),this.render=()=>{this.current&&(this.triggerBuild(),this.renderInstance(this.current,this.renderState,this.props.style,this.projection))},this.renderScheduledAt=0,this.scheduleRender=()=>{let e=F.now();this.renderScheduledAt<e&&(this.renderScheduledAt=e,B.render(this.render,!1,!0))};let{latestValues:c,renderState:l}=o;this.latestValues=c,this.baseTarget={...c},this.initialValues=t.initial?{...c}:{},this.renderState=l,this.parent=e,this.props=t,this.presenceContext=n,this.depth=e?e.depth+1:0,this.reducedMotionConfig=r,this.skipAnimationsConfig=i,this.options=s,this.blockInitialAnimation=!!a,this.isControllingVariants=Oo(t),this.isVariantNode=ko(t),this.isVariantNode&&(this.variantChildren=new Set),this.manuallyAnimateOnMount=!!(e&&e.current);let{willChange:u,...d}=this.scrapeMotionValuesFromProps(t,{},this);for(let e in d){let t=d[e];c[e]!==void 0&&G(t)&&t.set(c[e])}}mount(e){let t=this.presenceContext;if(this.hasBeenMounted&&t?.isPresent!==!1&&!t?.keepValuesOnRemount)for(let e in this.initialValues)this.values.get(e)?.jump(this.initialValues[e]),this.latestValues[e]=this.initialValues[e];if(this.current=e,Co.set(e,this),this.projection?.instance||this.projection?.mount(e),this.isVariantNode&&!this.isControllingVariants){let e=this;do e=e.props.inherit!==!1&&e.parent;while(e&&!e.isVariantNode);if(e){let{variantChildren:t}=e;t.add(this),this.removeFromVariantTree=()=>t.delete(this)}}this.values.forEach((e,t)=>this.bindToMotionValue(t,e)),this.reducedMotionConfig===`never`?this.shouldReduceMotion=!1:this.reducedMotionConfig===`always`?this.shouldReduceMotion=!0:(Mo.current||Po(),this.shouldReduceMotion=jo.current),this.shouldSkipAnimations=this.skipAnimationsConfig??!1,this.parent?.addChild(this),this.update(this.props,this.presenceContext),this.hasBeenMounted=!0}unmount(){this.projection?.unmount(),V(this.notifyUpdate),V(this.render),this.valueSubscriptions.forEach(e=>e()),this.valueSubscriptions.clear(),this.removeFromVariantTree?.(),this.parent?.removeChild(this);for(let e in this.events)this.events[e].clear();for(let e in this.features){let t=this.features[e];t&&(t.unmount(),t.isMounted=!1)}this.current=null}addChild(e){this.children.add(e),(this.enteringChildren||=new Set).add(e)}removeChild(e){this.children.delete(e),this.enteringChildren?.delete(e)}bindToMotionValue(e,t){if(this.valueSubscriptions.get(e)?.(),t.accelerate&&Ur.has(e)&&this.current instanceof HTMLElement){let{factory:n,keyframes:r,times:i,ease:a,duration:o}=t.accelerate,s=new Pr({element:this.current,name:e,keyframes:r,times:i,ease:a,duration:T(o)}),c=n(s);this.valueSubscriptions.set(e,()=>{c(),s.cancel()});return}let n=W.has(e);n&&this.onBindTransform&&this.onBindTransform();let r=t.on(`change`,t=>{this.latestValues[e]=t,this.props.onUpdate&&B.preRender(this.notifyUpdate),n&&(this.projection&&(this.projection.isTransformDirty=!0),ri.get(this.current)?.check()),this.scheduleRender()}),i;typeof window<`u`&&window.MotionCheckAppearSync&&(i=window.MotionCheckAppearSync(this,e,t)),this.valueSubscriptions.set(e,()=>{r(),i?.()})}sortNodePosition(e){return!this.current||!e.current||!this.sortInstanceNodePosition||this.type!==e.type?0:this.sortInstanceNodePosition(this.current,e.current)}updateFeatures(){let e=`animation`;for(e in Io){let t=Io[e];if(!t)continue;let{isEnabled:n,Feature:r}=t;if(!this.features[e]&&r&&n(this.props)&&(this.features[e]=new r(this)),this.features[e]){let t=this.features[e];t.isMounted?t.update():(t.mount(),t.isMounted=!0)}}}triggerBuild(){this.build(this.renderState,this.latestValues,this.props)}measureViewportBox(){return this.current?this.measureInstanceViewportBox(this.current,this.props):bo()}getStaticValue(e){return this.latestValues[e]}setStaticValue(e,t){this.latestValues[e]=t}update(e,t){let{transformTemplate:n,onUpdate:r}=this.props;(e.transformTemplate||n)&&this.scheduleRender(),(e.transformTemplate&&!n||e.onUpdate&&!r)&&ri.get(this.current)?.demote(),this.prevProps=this.props,this.props=e,this.prevPresenceContext=this.presenceContext,this.presenceContext=t;for(let t=0;t<Fo.length;t++){let n=Fo[t];this.propEventSubscriptions[n]?.(),delete this.propEventSubscriptions[n];let r=e[`on`+n];r&&(this.propEventSubscriptions[n]=this.on(n,r))}this.prevMotionValues=Ao(this,this.scrapeMotionValuesFromProps(e,this.prevProps||{},this),this.prevMotionValues),this.handleChildMotionValue?.()}getProps(){return this.props}getVariant(e){return this.props.variants?.[e]}getDefaultTransition(){return this.props.transition}getTransformPagePoint(){return this.props.transformPagePoint}addValue(e,t){let n=this.values.get(e);if(t!==n){n&&this.removeValue(e),this.bindToMotionValue(e,t),this.values.set(e,t);let r=t.get();r!==void 0&&(this.latestValues[e]=r)}}removeValue(e){this.values.delete(e),this.valueSubscriptions.get(e)?.(),this.valueSubscriptions.delete(e),delete this.latestValues[e],this.removeValueFromRenderState(e,this.renderState)}hasValue(e){return this.values.has(e)}getValue(e,t){let n=this.props.values?.[e];return n||(n=this.values.get(e),n===void 0&&t!==void 0&&(n=zi(t??this.getDefaultValue?.(e),{owner:this}),this.addValue(e,n)),n)}readValue(e,t){let n=this.latestValues[e]!==void 0||!this.current?this.latestValues[e]:this.getBaseTargetFromProps(this.props,e)??this.readValueFromInstance(this.current,e,this.options);return n!=null&&(typeof n==`string`&&(_(n)||y(n))?n=parseFloat(n):typeof n!=`number`&&!z.test(n)&&z.test(t)&&(n=Gn(e,t)),this.setBaseTarget(e,G(n)?n.get():n)),G(n)?n.get():n}setBaseTarget(e,t){this.baseTarget[e]=t}on(e,t){return(this.events[e]||(this.events[e]=new w)).add(t)}notify(e,...t){this.events[e]?.notify(...t)}scheduleRenderMicrotask(){po.render(this.render)}},Bo=class extends zo{constructor(){super(...arguments),this.KeyframeResolver=wa}sortInstanceNodePosition(e,t){return e.compareDocumentPosition(t)&2?1:-1}getBaseTargetFromProps(e,t){let n=e.style;return n?n[t]:void 0}removeValueFromRenderState(e,{vars:t,style:n}){delete t[e],delete n[e]}handleChildMotionValue(){this.childSubscription&&(this.childSubscription(),delete this.childSubscription);let{children:e}=this.props;G(e)&&(this.childSubscription=e.on(`change`,e=>{this.current&&(this.current.textContent=`${e}`)}))}};function Vo(e,{style:t,vars:n},r,i){let a=e.style,o;for(o in t)a[o]=t[o];for(o in i?.applyProjectionStyles(a,r),n)a.setProperty(o,n[o])}function Ho(e,{layout:t,layoutId:n}){return W.has(e)||e.startsWith(`origin`)||(t||n!==void 0)&&(!!go[e]||e===`opacity`)}function Uo(e,t,n){let r=e.style,i=t?.style,a={};if(!r)return a;for(let t in r)(G(r[t])||i&&G(i[t])||Ho(t,e)||n?.getValue(t)?.liveStyle!==void 0)&&(a[t]=r[t]);return a}function Wo(e){return window.getComputedStyle(e)}var Go=class extends Bo{constructor(){super(...arguments),this.type=`html`,this.renderInstance=Vo}mount(e){super.mount(e)}readValueFromInstance(e,t){if(W.has(t))return this.projection?.isProjecting?tr(t):rr(e,t);{let n=Wo(e),r=(ye(t)?n.getPropertyValue(t):n[t])||0;return typeof r==`string`?r.trim():r}}measureInstanceViewportBox(e,{transformPagePoint:t}){return oo(e,t)}build(e,t,n){qa(e,t,n.transformTemplate)}scrapeMotionValuesFromProps(e,t,n){return Uo(e,t,n)}},Ko=e=>e.pointerType===`mouse`?typeof e.button!=`number`||e.button<=0:e.isPrimary!==!1;function qo(e){return{point:{x:e.pageX,y:e.pageY}}}var Jo=new Set([`BUTTON`,`INPUT`,`SELECT`,`TEXTAREA`,`A`]);function Yo(e){return Jo.has(e.tagName)||e.isContentEditable===!0}var Xo={x:!1,y:!1};function Zo(){return Xo.x||Xo.y}function Qo(e,t){let n=Ia(e),r=new AbortController;return[n,{passive:!0,...t,signal:r.signal},Pa(()=>r.abort())]}function $o(e){return!(e.pointerType===`touch`||Zo())}function es(e,t,n={}){t=Fa(t);let[r,i,a]=Qo(e,n);return r.forEach(e=>{let n=!1,r=!1,a,o=()=>{e.removeEventListener(`pointerleave`,u)},s=e=>{a&&=(a(e),void 0),o()},c=e=>{n=!1,window.removeEventListener(`pointerup`,c),window.removeEventListener(`pointercancel`,c),r&&(r=!1,s(e))},l=()=>{n=!0,window.addEventListener(`pointerup`,c,i),window.addEventListener(`pointercancel`,c,i)},u=e=>{e.pointerType!==`touch`&&(n?r=!0:s(e))};e.addEventListener(`pointerenter`,n=>{if(!$o(n))return;r=!1;let o=t(e,n);typeof o==`function`&&(a=o,e.addEventListener(`pointerleave`,u,i))},i),e.addEventListener(`pointerdown`,l,i)}),a}var ts=(e,t)=>t?e===t||ts(e,t.parentElement):!1,ns=new WeakSet;function rs(e){return t=>{t.key===`Enter`&&e(t)}}function is(e,t){e.dispatchEvent(new PointerEvent(`pointer`+t,{isPrimary:!0,bubbles:!0}))}var as=(e,t)=>{let n=!1,r=rs(()=>{n||ns.has(e)||(n=!0,is(e,`down`))}),i=rs(()=>{n&&(n=!1,is(e,`up`))});e.addEventListener(`keydown`,r,t),e.addEventListener(`keyup`,i,t),e.addEventListener(`blur`,()=>{e.removeEventListener(`keydown`,r),e.removeEventListener(`keyup`,i),n&&is(e,`cancel`)},{...t,once:!0})};function os(e){return Ko(e)&&!Zo()}var ss=new WeakSet,cs=100,ls=8,us=(e,t,n)=>Math.hypot(e.clientX-t.clientX,e.clientY-t.clientY)>n,ds=e=>e.preventDefault();function fs(e,t,n={}){t=Fa(t);let[r,i,a]=Qo(e,n),o=new WeakMap,s=e=>{let r=e.currentTarget;if(!os(e)||ss.has(e))return;n.stopPropagation&&ss.add(e);let{count:a=1,countTimeout:s=.3,hold:c=0,repeat:l}=n,u=F.now(),d=T(c),f=T(s),p=o.get(r);p?.expire(us(p.event,e,cs))?p=void 0:p&&(V(p.expire),o.delete(r));let m=p?p.count+1:1,h=m>=a,g=h&&(c||l),_=!c,v=0,y;if(ns.add(r),p)y=p.handlers;else{let n=t(r,e);y=typeof n==`function`?{onComplete:n}:n||{}}h&&_&&y.onActive?.();let b=T(l),x=d||b,S=u+x,C=!0,w=()=>{if(i.signal.aborted)return V(w);let e=Math.min(1-(S-F.now())/x,1);C&&e<1&&(e=0),C=!1,y.onHold?.(e),e<1||(_?y.onRepeat?.(++v):(_=!0,y.onActive?.()),l?(C=!0,S+=x=b):V(w))},E={...i,capture:!0},D=(t,n)=>{if(Ko(t)){if(window.removeEventListener(`pointerup`,O,E),window.removeEventListener(`pointercancel`,k,E),window.removeEventListener(`pointermove`,A,E),r.removeEventListener(`contextmenu`,ds),V(w),ns.delete(r),Zo()&&(n=!1),n&&!h){let n=F.now(),a=e=>{let s=i.signal.aborted;if(s||e===!0||F.now()-n>f)return V(a),o.delete(r),s||y.onComplete?.(t,{success:!1}),!0};o.set(r,{count:m,event:e,handlers:y,expire:a}),B.update(a,!0)}else y.onComplete?.(t,{success:n&&_})}},O=e=>{D(e,r===window||r===document||n.useGlobalTarget||ts(r,e.target))},k=e=>{D(e,!1)},A=t=>{Ko(t)&&((l||!_)&&us(e,t,ls)||a>1&&Zo())&&k(t)};window.addEventListener(`pointerup`,O,E),window.addEventListener(`pointercancel`,k,E),(g||a>1)&&window.addEventListener(`pointermove`,A,E),g&&(B.update(w,!0),r.addEventListener(`contextmenu`,ds,{...i,passive:!1}))};return r.forEach(e=>{(n.useGlobalTarget?window:e).addEventListener(`pointerdown`,s,i),Ma(e)&&(e.addEventListener(`focus`,()=>as(e,i),i),!Yo(e)&&!e.hasAttribute(`tabindex`)&&(e.tabIndex=0))}),a}function ps(...e){let t=!Array.isArray(e[0]),n=t?0:-1,r=e[0+n],i=fn(e[1+n],e[2+n],e[3+n]);return t?i(r):i}var ms=new Set,hs=({timestamp:e})=>{ms.forEach(t=>t.tick(e))},gs=class extends On{constructor(e){super(),this.state=`idle`,this.startTime=0,this.currentTime=0,this.started=!1,this.hasNextTarget=!1,this.nextTarget=0,this.stop=()=>{this.state!==`idle`&&(this.teardown(),this.options.onStop?.())},this.options=e,this.factory=e.type,this.generator=this.factory(e);let{driver:t}=e;t&&(this.driver=t(e=>this.tick(e))),this.startTime=this.now(),this.state=`running`,this.driver?this.driver.start():(ms.size||B.update(hs,!0),ms.add(this))}setTarget(e,t){this.nextTarget=e,this.nextVelocity=t,this.hasNextTarget=!0}retarget(e,t){let{options:n,generator:r}=this;n.keyframes=e,n.velocity=t,this.startTime=this.now(),this.currentTime=0,r.retarget?r.retarget(e,t):this.generator=this.factory(n)}tick(e){let{options:t,hasNextTarget:n}=this,{delay:r=0,onUpdate:i,onPlay:a}=t;this.started||(this.startTime=Tn(this.startTime,e));let o=Math.round(e-this.startTime)-r,s=this.currentTime=Math.max(0,o),c=this.generator.next(s),l=o<0?t.keyframes[0]:c.value;if(n){this.hasNextTarget=!1;let{keyframes:e}=t;e[0]=l,e[1]=this.nextTarget,this.retarget(e,this.nextVelocity??this.getGeneratorVelocity())}(n||!this.started)&&(this.started=!0,a?.()),this.state===`running`&&(i?.(l),c.done&&o>=0&&!n&&!this.hasNextTarget&&this.state===`running`&&(this.notifyFinished(),this.teardown(),this.state=`finished`,t.onComplete?.()))}getGeneratorVelocity(){return bn(this.generator,this.currentTime,this.options.velocity)}now(){return this.driver?this.driver.now():F.now()}teardown(){this.state=`idle`,this.driver?this.driver.stop():(ms.delete(this),ms.size||V(hs))}};function _s(e,t,n){let r=e.get(),i=null,a,o=typeof r==`string`?r.replace(/[\d.-]/g,``):void 0,s=e=>a(o?e+o:e),c=()=>e.events.animationStart?.notify(),l=()=>{i&&=(i.stop(),null),e.animation=void 0};if(e.attach((t,r)=>{a=r;let o=vo(t);if(i?.state===`running`){i.setTarget(o,n.velocity);return}let u=vo(e.get()),d=i?i.getGeneratorVelocity():e.getVelocity();if(l(),u===o)return;let f=i=new gs({keyframes:[u,o],velocity:d,restDelta:.001,restSpeed:.01,...n,onUpdate:s,onPlay:c});e.animation=f,f.then(()=>{i===f&&(i=null,e.animation=void 0,e.events.animationComplete?.notify())})},l),G(t)){let r=n.skipInitialAnimation===!0,i=t=>{r?(r=!1,e.jump(vs(t,o),!1)):e.set(vs(t,o))},a=t.on(`change`,i),s=t.get();vo(s)-vo(e.get())&&i(s);let c=e.on(`destroy`,a);return()=>{a(),c(),l()}}return l}function vs(e,t){return t?e+t:e}function ys(e,t,n){return _s(e,t,{...n,type:ln})}var bs=class{constructor(e){this.isMounted=!1,this.node=e}update(){}},xs=new Set([`baseFrequency`,`diffuseConstant`,`kernelMatrix`,`kernelUnitLength`,`keySplines`,`keyTimes`,`limitingConeAngle`,`markerHeight`,`markerWidth`,`numOctaves`,`targetX`,`targetY`,`surfaceScale`,`specularConstant`,`specularExponent`,`stdDeviation`,`tableValues`,`viewBox`,`gradientTransform`,`pathLength`,`startOffset`,`textLength`,`lengthAdjust`]),Ss=e=>typeof e==`string`&&e.toLowerCase()===`svg`;function Cs(e,t,n,r){Vo(e,t,void 0,r);for(let n in t.attrs)e.setAttribute(xs.has(n)?n:Ka(n),t.attrs[n])}function ws(e,t,n){let r=Uo(e,t,n);for(let n in e)if(n!==`children`&&(G(e[n])||G(t[n]))){let t=U.indexOf(n)===-1?n:`attr`+n.charAt(0).toUpperCase()+n.substring(1);r[t]=e[n]}return r}var Ts=class extends Bo{constructor(){super(...arguments),this.type=`svg`,this.isSVGTag=!1,this.measureInstanceViewportBox=bo}getBaseTargetFromProps(e,t){return W.has(t)?super.getBaseTargetFromProps(e,t)??tr(t):e[t]}getDefaultValue(e){return W.has(e)?this.latestValues[e]??tr(e):void 0}readValueFromInstance(e,t){if(W.has(t)){let e=Bn(t);return e&&e.default||0}if(Za.includes(t)){let n=getComputedStyle(e)[t];if(typeof n==`string`&&n)return n.trim()}return t=xs.has(t)?t:Ka(t),e.getAttribute(t)}scrapeMotionValuesFromProps(e,t,n){return ws(e,t,n)}build(e,t,n){Qa(e,t,this.isSVGTag,n.transformTemplate,n.style)}renderInstance(e,t,n,r){Cs(e,t,n,r)}mount(e){this.isSVGTag=Ss(e.tagName),super.mount(e)}};function Es(e,t){if(!Array.isArray(t))return!1;let n=t.length;if(n!==e.length)return!1;for(let r=0;r<n;r++)if(t[r]!==e[r])return!1;return!0}var Ds=[...Eo].reverse(),Os=e=>e?.out===!0?e:e?.out;function ks(e){let t=t=>Promise.all(t.map(({animation:t,options:n})=>ga(e,t,n))),n=js(),r=!0,i=!1;function a(a){let{props:o,parent:s,manuallyAnimateOnMount:c}=e,{initial:l}=o,u=r||i,d=[],f=(t=l)=>typeof t!=`boolean`&&ta(e,Array.isArray(t)?t[0]:t,e.presenceContext?.custom)||void 0,p=new Map,m={},h=1/0,g=e;do g=g.props.inherit!==!1&&g.parent;while(g&&!g.isControllingVariants);let _=u&&Os(f(l??(g&&g.props.initial))?.transition);if(Ds.forEach((t,r)=>{let i=n[t],l=o[t],f=g&&g.props[t],v=l===void 0?To(f)||f===!1?f:void 0:l,y=To(v),b=t===a?i.isActive:null,x=y&&l===void 0&&!(u&&c);if(i.protectedKeys={...m},!i.isActive&&b===null||!v&&!i.prevProp||wo(v)||typeof v==`boolean`)return;if(b===!1&&(h=r),t===`exit`&&i.isActive&&b!==!0){m={...m,...i.prevResolvedValues};return}let S=As(i.prevProp,v),C=S||y&&(b&&!x||r>h),w=!1,T=Array.isArray(v)?v:[v],E={},D;if(b!==!1)for(let n of T){let{transition:r,transitionEnd:i,...a}=ta(e,n,na(e,t))||{};E={...E,...a,...i},D=Os(r)||D}let{prevResolvedValues:O}=i;for(let t in{...O,...E}){if(t in m)continue;let n=E[t],r=O[t],a=Array.isArray(n)&&Array.isArray(r)?!Es(n,r)||S:n!==r,o;if(a&&n==null)p.has(t)||p.set(t,i.prevOut);else if(a||n!==void 0&&p.has(t)){C=!0,o=p.get(t)||_,p.delete(t)&&(w=!0),i.needsAnimating[t]=!0;let n=e.getValue(t);n&&(n.liveStyle=!1)}else i.protectedKeys[t]=!0;i.out[t]=o}if(i.prevProp=v,i.prevResolvedValues=E,i.prevOut=D,i.isActive&&(m={...m,...E}),C&&(!(x&&S)||w))for(let n of T){let r={type:t};if(typeof n==`string`&&u&&c&&s?.enteringChildren){let t=ta(s,n)?.transition?.delayChildren;r.delay=Pi(s.enteringChildren,e,t)}d.push({animation:n,options:r})}}),p.size){let t={},n=f(),r=n?.transition;p.forEach((i,a)=>{i&&(r={...r||e.getDefaultTransition(),[a]:i});let s=e.getValue(a);s&&(s.liveStyle=!0);let c=n&&!Array.isArray(l)?n[a]:void 0,u=e.getBaseTargetFromProps(o,a);t[a]=(c===void 0?u!==void 0&&!G(u)?u:e.initialValues[a]===void 0?e.baseTarget[a]:void 0:c)??null}),r&&(t.transition=r),d.push({animation:t})}let v=u&&e.blockInitialAnimation||r&&!c&&(o.initial===!1||o.initial===o.animate);return r=i=!1,!v&&d.length?t(d):Promise.resolve()}function o(t,r){if(n[t].isActive===r)return Promise.resolve();e.variantChildren?.forEach(e=>e.animationState?.setActive(t,r)),n[t].isActive=r;let i=a(t);for(let e in n)n[e].protectedKeys={};return i}return{animateChanges:a,setActive:o,setAnimateFunction:n=>{t=n(e)},getState:()=>n,reset:()=>{n=js(),i=!0}}}function As(e,t){return typeof t==`string`?t!==e:Array.isArray(t)?!Es(t,e):!1}function js(){let e={};for(let t of Eo)e[t]={isActive:t===`animate`,protectedKeys:{},needsAnimating:{},prevResolvedValues:{},out:{}};return e}var Ms=(0,c.createContext)({transformPagePoint:e=>e,isStatic:!1,reducedMotion:`never`});function Ns(e,t){if(typeof e==`function`)return e(t);e!=null&&(e.current=t)}function Ps(...e){return t=>{let n=!1,r=e.map(e=>{let r=Ns(e,t);return!n&&typeof r==`function`&&(n=!0),r});if(n)return()=>{for(let t=0;t<r.length;t++){let n=r[t];typeof n==`function`?n():Ns(e[t],null)}}}}function Fs(...e){return c.useCallback(Ps(...e),e)}var q=r(),Is=e=>{let{width:t,height:n}=e?.getBoundingClientRect()||{};return[t/e?.offsetWidth||1,n/e?.offsetHeight||1]},Ls=e=>{let{left:t,top:n}=e.getBoundingClientRect(),r=e;for(;r=r.parentElement||r.parentNode?.host;){let{scrollLeft:e,scrollTop:i}=r;if(e||i){let[a,o]=Is(r);t+=e*a,n+=i*o}if(getComputedStyle(r).position===`fixed`)break}let[i,a]=Is(e.offsetParent);return[t/i,n/a]},Rs=class extends c.Component{getSnapshotBeforeUpdate(e){let t=this.props.getElement();if(Ma(t)&&e.isPresent&&!this.props.isPresent&&this.props.pop!==!1){let e=t.offsetParent,n=Ma(e)&&e.offsetWidth||0,r=Ma(e)&&e.offsetHeight||0,i=getComputedStyle(t),a=this.props.sizeRef.current;a.height=parseFloat(i.height),a.width=parseFloat(i.width),a.top=t.offsetTop,a.left=t.offsetLeft,a.right=n-a.width-a.left,a.bottom=r-a.height-a.top,a.direction=i.direction,a.point=Ls(t)}return null}componentDidUpdate(){}render(){return this.props.children}};function zs({children:e,isPresent:t,anchorX:n,anchorY:r,root:i,pop:a,popNode:o}){let s=(0,c.useId)(),l=(0,c.useRef)(null),u=(0,c.useRef)({width:0,height:0,top:0,left:0,right:0,bottom:0,direction:`ltr`}),{nonce:d}=(0,c.useContext)(Ms),f=Fs(l,a===!1?void 0:e.props?.ref??e?.ref),p=()=>l.current||o?.current?.current,m=e=>{let{width:t,height:i,top:a,left:o,right:c,bottom:l,direction:d}=u.current,f=d===`rtl`,p=n===`left`?f?`right:${c}`:`left:${o}`:f?`left:${o}`:`right:${c}`,m=r===`bottom`?`bottom:${l}`:`top:${a}`;e?.insertRule(`[data-motion-pop-id="${s}"]{position:absolute!important;width:${t}px!important;height:${i}px!important;${p}px!important;${m}px!important}`)};return(0,c.useInsertionEffect)(()=>{let{width:e,height:n}=u.current,r=p();if(t||a===!1||!r||!e||!n)return;r.dataset.motionPopId=s;let o=r.ownerDocument,c=o.createElement(`style`);d&&(c.nonce=d);let l=i??o.head;l.appendChild(c),m(c.sheet);let f=0,h=0;return po.setup(()=>{let[e,t]=Ls(r);f=u.current.point[0]-e,h=u.current.point[1]-t}),po.read(()=>{let{sheet:e}=c;if(!e||!f&&!h)return;let t=u.current;t.left+=f,t.right-=f,t.top+=h,t.bottom-=h,e.deleteRule(0),m(e)}),()=>{r.removeAttribute(`data-motion-pop-id`),l.contains(c)&&l.removeChild(c)}},[t]),(0,q.jsx)(Rs,{isPresent:t,getElement:p,sizeRef:u,pop:a,children:a===!1?e:c.cloneElement(e,{ref:f})})}var Bs=({children:e,initial:t,isPresent:n,onExitComplete:r,custom:i,presenceAffectsLayout:a,mode:o,anchorX:s,anchorY:l,root:p})=>{let m=u(Vs),h=(0,c.useId)(),g=(0,c.useRef)(),_=(0,c.useRef)(n),v=(0,c.useRef)(r);d(()=>{_.current=n,v.current=r});let y=!0,b=(0,c.useMemo)(()=>(y=!1,{id:h,initial:t,isPresent:n,custom:i,onExitComplete:e=>{m.set(e,!0);for(let e of m.values())if(!e)return;r&&r()},register:(e,t)=>(m.set(e,!1),t&&t.parent?.presenceContext?.id!==h&&(g.current=t),()=>{m.delete(e),!_.current&&!m.size&&v.current?.()})}),[n,m,r]);return a&&y&&(b={...b}),(0,c.useMemo)(()=>{m.forEach((e,t)=>m.set(t,!1))},[n]),c.useEffect(()=>{!n&&!m.size&&r&&r()},[n]),e=(0,q.jsx)(zs,{pop:o===`popLayout`,isPresent:n,anchorX:s,anchorY:l,root:p,popNode:g,children:e}),(0,q.jsx)(f.Provider,{value:b,children:e})};function Vs(){return new Map}function Hs(e=!0){let t=(0,c.useContext)(f);if(t===null)return[!0,null];let{isPresent:n,onExitComplete:r,register:i}=t,a=(0,c.useId)();(0,c.useEffect)(()=>{if(e)return i(a)},[e]);let o=(0,c.useCallback)(()=>e&&r&&r(a),[a,r,e]);return!n&&r?[!1,o]:[!0]}var Us=e=>e.key||``;function Ws(e){let t=[];return c.Children.forEach(e,e=>{(0,c.isValidElement)(e)&&t.push(e)}),t}var Gs=({children:e,custom:t,initial:n=!0,onExitComplete:r,presenceAffectsLayout:i=!0,mode:a=`sync`,propagate:o=!1,anchorX:s=`left`,anchorY:f=`top`,root:p})=>{let[m,h]=Hs(o),g=(0,c.useMemo)(()=>Ws(e),[e]),_=o&&!m?[]:g.map(Us),v=(0,c.useRef)(!0),y=u(()=>new Map),b=(0,c.useRef)(new Set),[x,S]=(0,c.useState)(g),[C,w]=(0,c.useState)(g);d(()=>{o&&!m&&!C.length&&h?.()},[m,o,C.length,h]);let T=(0,c.useRef)();(0,c.useEffect)(()=>()=>{let e=T.current;T.current=void 0,e?.()},[C]),d(()=>{v.current=!1;for(let e=0;e<C.length;e++){let t=Us(C[e]);_.includes(t)?(y.delete(t),b.current.delete(t)):y.get(t)!==!0&&y.set(t,!1)}},[C,_.length,_.join(`-`)]);let E=[];if(g!==x){let e=[...g],t=0;for(let n of C){let r=_.indexOf(Us(n));r===-1?(e.splice(t++,0,n),E.push(n)):t=r+E.length+1}return E.every(e=>y.get(Us(e)))?e=g:a===`wait`&&(e=E),w(Ws(e)),S(g),null}let{forceRender:D}=(0,c.useContext)(l);return(0,q.jsx)(q.Fragment,{children:C.map(e=>{let c=Us(e),l=o&&!m?!1:g===C||_.includes(c);return(0,q.jsx)(Bs,{isPresent:l,initial:!v.current||n?void 0:!1,custom:t,presenceAffectsLayout:i,mode:a,root:p,onExitComplete:l?void 0:()=>{if(b.current.has(c))return;if(y.has(c))b.current.add(c),y.set(c,!0);else return;let e=!0;y.forEach(t=>{t||(e=!1)}),e&&(D?.(),S([]),o&&h?.(),T.current=r)},anchorX:s,anchorY:f,children:e},c)})})},Ks=(0,c.createContext)({strict:!1}),qs={animation:[`variants`,...Eo],exit:[`exit`],drag:[`drag`,`dragControls`],focus:[`whileFocus`],hover:[`whileHover`,`onHoverStart`,`onHoverEnd`],tap:[`whileTap`,`onTap`,`onTapStart`,`onTapCancel`],pan:[`onPan`,`onPanStart`,`onPanSessionStart`,`onPanEnd`],inView:[`whileInView`,`onViewportEnter`,`onViewportLeave`],layout:[`layout`,`layoutId`]},Js=!1;function Ys(){if(Js)return;let e={};for(let t in qs)e[t]={isEnabled:e=>qs[t].some(t=>!!e[t])};Lo(e),Js=!0}function Xs(){return Ys(),Ro()}function Zs(e){let t=Xs();for(let n in e)t[n]={...t[n],...e[n]};Lo(t)}function Qs({children:e,features:t,strict:n=!1}){let[,r]=(0,c.useState)(!$s(t)),i=(0,c.useRef)(void 0);if(!$s(t)){let{renderer:e,...n}=t;i.current=e,Zs(n)}return(0,c.useEffect)(()=>{$s(t)&&t().then(({renderer:e,...t})=>{Zs(t),i.current=e,(0,c.startTransition)(()=>r(!0))})},[]),(0,q.jsx)(Ks.Provider,{value:{renderer:i.current,strict:n},children:e})}function $s(e){return typeof e==`function`}var ec=(0,c.createContext)({});function tc(e,t){if(Oo(e)){let{initial:t,animate:n}=e;return{initial:t===!1||To(t)?t:void 0,animate:To(n)?n:void 0}}return e.inherit===!1?{}:t}function nc(e){let{initial:t,animate:n}=tc(e,(0,c.useContext)(ec));return(0,c.useMemo)(()=>({initial:t,animate:n}),[rc(t),rc(n)])}function rc(e){return Array.isArray(e)?e.join(` `):e}var ic=()=>({style:{},transform:{},transformOrigin:{},vars:{}});function ac(e,t,n){for(let r in t)!G(t[r])&&!Ho(r,n)&&(e[r]=t[r])}function oc({transformTemplate:e},t){return(0,c.useMemo)(()=>{let n=ic();return qa(n,t,e),Object.assign({},n.vars,n.style)},[t])}function sc(e,t){let n=e.style||{},r={};return ac(r,n,e),Object.assign(r,oc(e,t)),r}function cc(e,t){let n={},r=sc(e,t);return e.drag&&e.dragListener!==!1&&(n.draggable=!1,r.userSelect=r.WebkitUserSelect=r.WebkitTouchCallout=`none`,r.touchAction=e.drag===!0?`none`:`pan-${e.drag===`x`?`y`:`x`}`),e.tabIndex===void 0&&(e.onTap||e.onTapStart||e.whileTap)&&(n.tabIndex=0),n.style=r,n}var lc=()=>({...ic(),attrs:{}});function uc(e,t,n,r){let i=(0,c.useMemo)(()=>{let n=lc();return Qa(n,t,Ss(r),e.transformTemplate,e.style),{...n.attrs,style:{...n.style}}},[t]);if(e.style){let t={};return ac(t,e.style,e),{...i,style:{...t,...i.style}}}return i}var dc=new Set(`animate.exit.variants.initial.style.values.transition.transformTemplate.custom.inherit.onBeforeLayoutMeasure.onAnimationStart.onAnimationComplete.onUpdate.onDragStart.onDrag.onDragEnd.onMeasureDragConstraints.onDirectionLock.onDragTransitionEnd._dragX._dragY.onHoverStart.onHoverEnd.onViewportEnter.onViewportLeave.globalTapTarget.tap.propagate.ignoreStrict.viewport.pinch`.split(`.`));function fc(e){return e.startsWith(`while`)||e.startsWith(`drag`)&&e!==`draggable`||e.startsWith(`layout`)||e.startsWith(`onTap`)||e.startsWith(`onPan`)||e.startsWith(`onLayout`)||dc.has(e)}function pc(e,t){return e.startsWith(`on`)?!fc(e):t?.(e)??!fc(e)}function mc(e,t,n,r){let i={};for(let a in e)a===`values`&&typeof e.values==`object`||G(e[a])||(a===`fx`?e.fx&&(i.fx=``):(pc(a,r)||n===!0&&fc(a)||!t&&!fc(a)||e.draggable&&a.startsWith(`onDrag`))&&(i[a]=e[a]));return i}var hc=[`animate`,`circle`,`defs`,`desc`,`ellipse`,`g`,`image`,`line`,`filter`,`marker`,`mask`,`metadata`,`path`,`pattern`,`polygon`,`polyline`,`rect`,`stop`,`switch`,`symbol`,`svg`,`text`,`tspan`,`use`,`view`];function gc(e){return typeof e!=`string`||e.includes(`-`)?!1:!!(hc.indexOf(e)>-1||/[A-Z]/u.test(e))}function _c(e,t,n,{latestValues:r},i,a=!1,o,s){let l=(o??gc(e)?uc:cc)(t,r,i,e),u=mc(t,typeof e==`string`,a,s),d=e===c.Fragment?{}:{...u,...l,ref:n},{children:f}=t,p=(0,c.useMemo)(()=>G(f)?f.get():f,[f]);return(0,c.createElement)(e,{...d,children:p})}function vc({scrapeMotionValuesFromProps:e,createRenderState:t},n,r,i){return{latestValues:yc(n,r,i,e),renderState:t()}}function yc(e,t,n,r){let i={},a=r(e,{});for(let e in a)i[e]=_o(a[e]);let{initial:o,animate:s}=e,c=Oo(e),l=ko(e);t&&l&&!c&&e.inherit!==!1&&(o===void 0&&(o=t.initial),s===void 0&&(s=t.animate));let u=n?n.initial===!1:!1;u||=o===!1;let d=u?s:o;if(d&&typeof d!=`boolean`&&!wo(d)){let t=Array.isArray(d)?d:[d];for(let n=0;n<t.length;n++){let r=ea(e,t[n]);if(r){let{transitionEnd:e,transition:t,...n}=r;for(let e in n){let t=n[e];if(Array.isArray(t)){let e=u?t.length-1:0;t=t[e]}t!==null&&(i[e]=t)}for(let t in e)i[t]=e[t]}}}return i}var bc=e=>(t,n)=>{let r=(0,c.useContext)(ec),i=(0,c.useContext)(f),a=()=>vc(e,t,r,i);return n?a():u(a)},xc=bc({scrapeMotionValuesFromProps:Uo,createRenderState:ic}),Sc=bc({scrapeMotionValuesFromProps:ws,createRenderState:lc}),Cc=Symbol.for(`motionComponentSymbol`);function wc(e,t,n){let r=(0,c.useRef)(n);(0,c.useInsertionEffect)(()=>{r.current=n});let i=(0,c.useRef)(null);return(0,c.useCallback)(n=>{n&&e.onMount?.(n),t&&(n?t.mount(n):t.unmount());let a=r.current;if(typeof a==`function`){if(n){let e=a(n);typeof e==`function`&&(i.current=e)}else i.current?(i.current(),i.current=null):a(n)}else a&&(a.current=n)},[t])}var Tc=(0,c.createContext)({});function Ec(e,t,n,r,i,a){let{visualElement:o}=(0,c.useContext)(ec),s=(0,c.useContext)(Ks),l=(0,c.useContext)(f),u=(0,c.useContext)(Ms),p=u.reducedMotion,m=u.skipAnimations,h=(0,c.useRef)(null),g=(0,c.useRef)(!1);r||=s.renderer,!h.current&&r&&(h.current=r(e,{visualState:t,parent:o,props:n,presenceContext:l,blockInitialAnimation:l?l.initial===!1:!1,reducedMotionConfig:p,skipAnimations:m,isSVG:a}),g.current&&h.current&&(h.current.manuallyAnimateOnMount=!0));let _=h.current,v=(0,c.useContext)(Tc);_&&!_.projection&&i&&(_.type===`html`||_.type===`svg`)&&i.create(_,n,v),(0,c.useInsertionEffect)(()=>{_&&_.props!==n&&_.update(n,l)});let y=n[ua],b=(0,c.useRef)(!!y&&typeof window<`u`&&!window.MotionHandoffIsComplete?.(y)&&window.MotionHasOptimisedAnimation?.(y));return d(()=>{g.current&&_&&(_.animationState?.animateChanges(),_.enteringChildren=void 0)},[]),d(()=>{g.current=!0,_&&(window.MotionIsMounted=!0,_.updateFeatures(),_.scheduleRenderMicrotask(),b.current&&_.animationState&&_.animationState.animateChanges())}),(0,c.useEffect)(()=>{_&&(!b.current&&_.animationState&&_.animationState.animateChanges(),b.current&&=(queueMicrotask(()=>{window.MotionHandoffMarkAsComplete?.(y)}),!1),_.enteringChildren=void 0)}),_}function Dc(e,{forwardMotionProps:t=!1,type:n}={},r,i){r&&Zs(r);let a=n?n===`svg`:gc(e),o=a?Sc:xc;function s(n,s){let l,d=Oc(n);u(()=>!!So.current?.sharedNodes.get(d)?.lead&&n.initial)&&(n={...n,initial:!1});let f={...(0,c.useContext)(Ms),...n,layoutId:d},{isStatic:p,isValidProp:m}=f,h=nc(n),g=o(n,p);if(!p&&typeof window<`u`){kc(f,r);let t=Ac(f);h.visualElement=Ec(e,g,f,i,t.ProjectionNode,a),(t.isEnabled||h.visualElement?.projection?.options.layoutId)&&(l=t.MeasureLayout)}return(0,q.jsxs)(ec.Provider,{value:h,children:[l&&h.visualElement?(0,q.jsx)(l,{visualElement:h.visualElement,...f}):null,_c(e,n,wc(g,h.visualElement,s),g,p,t,a,m)]})}s.displayName=`motion.${typeof e==`string`?e:`create(${e.displayName??e.name??``})`}`;let l=(0,c.forwardRef)(s);return l[Cc]=e,l}function Oc({layoutId:e}){let t=(0,c.useContext)(l).id;return t&&e!==void 0?t+`-`+e:e}function kc(e,t){(0,c.useContext)(Ks).strict}function Ac(e){let{drag:t,layout:n}=Xs();if(!t&&!n)return{};let r={...t,...n};return{MeasureLayout:r.MeasureLayout,isEnabled:t?.isEnabled(e)||n?.isEnabled(e),ProjectionNode:r.ProjectionNode}}function jc(e,t){if(typeof Proxy>`u`)return Dc;let n=new Map,r=(n,r)=>Dc(n,r,e,t);return new Proxy((e,t)=>r(e,t),{get:(i,a)=>a===`create`?r:(n.has(a)||n.set(a,Dc(a,void 0,e,t)),n.get(a))})}var Mc=jc(),Nc=(e,t)=>t.isSVG??gc(e)?new Ts(t):new Go(t,{allowProjection:e!==c.Fragment}),Pc=class extends bs{constructor(e){super(e),e.animationState||=ks(e)}updateAnimationControlsSubscription(){let{animate:e}=this.node.getProps();wo(e)&&(this.unmountControls=e.subscribe(this.node))}mount(){this.updateAnimationControlsSubscription()}update(){this.node.getProps().animate!==this.node.prevProps?.animate&&this.updateAnimationControlsSubscription()}unmount(){this.node.animationState.reset(),this.unmountControls?.()}},Fc=0,Ic={animation:{Feature:Pc},exit:{Feature:class extends bs{constructor(){super(...arguments),this.id=Fc++}update(){let{presenceContext:e,animationState:t}=this.node;if(!e||!t)return;let{isPresent:n,onExitComplete:r}=e;if(n===!this.exit)return;if(n){if(this.exit===!0){let{initial:e}=this.node.getProps();if(e&&!Array.isArray(e)){let{transition:t,transitionEnd:n,...r}=ta(this.node,e)||{};for(let e in r)this.node.getValue(e)?.jump(r[e])}this.node.blockInitialAnimation=!1,t.reset(),t.animateChanges()}else t.setActive(`exit`,!1);this.exit=void 0;return}let i=this.exit=t.setActive(`exit`,!0);r&&i.then(()=>{this.exit===i&&(this.exit=!0,r(this.id))})}mount(){let{register:e}=this.node.presenceContext||{};e&&(this.unmount=e(this.id,this.node)),this.update()}unmount(){}}}};function Lc(e,t,n,r,i){let{props:a}=e,o=`while`+n;!i&&e.animationState&&a[o]&&e.animationState.setActive(o,r===`Start`);let s=a[`on`+n+r];s&&B.postRender(()=>s(t,qo(t)))}var Rc=class extends bs{mount(){let{current:e}=this.node;e&&(this.unmount=es(e,(e,t)=>(Lc(this.node,t,`Hover`,`Start`),e=>Lc(this.node,e,`Hover`,`End`))))}unmount(){}},zc=class extends bs{constructor(){super(...arguments),this.isActive=!1}onFocus(){let e=!1;try{e=this.node.current.matches(`:focus-visible`)}catch{e=!0}e&&this.node.animationState&&(this.node.animationState.setActive(`whileFocus`,!0),this.isActive=!0)}onBlur(){this.isActive&&this.node.animationState&&(this.node.animationState.setActive(`whileFocus`,!1),this.isActive=!1)}mount(){this.unmount=S(xo(this.node.current,`focus`,()=>this.onFocus()),xo(this.node.current,`blur`,()=>this.onBlur()))}unmount(){}};function Bc(e,t,n,r){e.current instanceof HTMLButtonElement&&e.current.disabled||Lc(e,t,`Tap`,n,r)}var Vc=class extends bs{constructor(){super(...arguments),this.options={}}mount(){let{current:e}=this.node;e&&(this.update(),this.unmount=fs(e,(e,t)=>(Bc(this.node,t,`Start`),{onComplete:(e,{success:t})=>Bc(this.node,e,t?``:`Cancel`),onRepeat:()=>Bc(this.node,t,``,!0)}),this.options))}update(){let{options:e,node:t}=this,{globalTapTarget:n,propagate:r,tap:i}=t.props;for(let t in e)delete e[t];Object.assign(e,i,{useGlobalTarget:n,stopPropagation:r?.tap===!1})}unmount(){}},Hc=new WeakMap,Uc=new WeakMap,Wc=e=>{let t=Hc.get(e.target);t&&t(e)},Gc=e=>{e.forEach(Wc)};function Kc({root:e,...t}){let n=e||document;Uc.has(n)||Uc.set(n,{});let r=Uc.get(n),i=JSON.stringify(t);return r[i]||(r[i]=new IntersectionObserver(Gc,{root:e,...t})),r[i]}function qc(e,t,n){let r=Kc(t);return Hc.set(e,n),r.observe(e),()=>{Hc.delete(e),r.unobserve(e)}}var Jc={some:0,all:1},Yc=class extends bs{constructor(){super(...arguments),this.hasEnteredView=!1,this.isInView=!1}startObserver(){this.stopObserver?.();let{viewport:e={}}=this.node.getProps(),{root:t,margin:n,amount:r=`some`,once:i}=e,a={root:t?t.current:void 0,rootMargin:n,threshold:typeof r==`number`?r:Jc[r]},o=e=>{let{isIntersecting:t}=e;if(this.isInView===t||(this.isInView=t,i&&!t&&this.hasEnteredView))return;t&&(this.hasEnteredView=!0),this.node.animationState&&this.node.animationState.setActive(`whileInView`,t);let{onViewportEnter:n,onViewportLeave:r}=this.node.getProps(),a=t?n:r;a&&a(e)};this.stopObserver=qc(this.node.current,a,o)}mount(){this.startObserver()}update(){if(typeof IntersectionObserver>`u`)return;let{props:e,prevProps:t}=this.node;[`amount`,`margin`,`root`].some(Xc(e,t))&&this.startObserver()}unmount(){this.stopObserver?.(),this.hasEnteredView=!1,this.isInView=!1}};function Xc({viewport:e={}},{viewport:t={}}={}){return n=>e[n]!==t[n]}var Zc=Object.assign({renderer:Nc},Ic,{inView:{Feature:Yc},tap:{Feature:Vc},focus:{Feature:zc},hover:{Feature:Rc}});function J(e){let t=u(()=>zi(e)),{isStatic:n}=(0,c.useContext)(Ms);if(n){let[,n]=(0,c.useState)(e);(0,c.useEffect)(()=>t.on(`change`,n),[])}return t}function Qc(e,t){let n=J(t()),r=()=>n.set(t());return r(),d(()=>{let t=()=>B.preRender(r,!1,!0),n=e.map(e=>e.on(`change`,t));return r(),()=>{n.forEach(e=>e()),V(r)}}),n}function $c(e,...t){let n=e.length;function r(){let r=``;for(let i=0;i<n;i++){r+=e[i];let n=t[i];n&&(r+=G(n)?n.get():n)}return r}return Qc(t.filter(G),r)}function el(e){Li.current=[],e();let t=Qc(Li.current,e);return Li.current=void 0,t}function tl(e,t,n){let{isStatic:r}=(0,c.useContext)(Ms),i=()=>G(e)?e.get():e;if(r)return el(i);let a=J(i());return(0,c.useInsertionEffect)(()=>n(a,e,t),[a,JSON.stringify(t)]),a}function Y(e,t={}){return tl(e,t,ys)}function X(e,t,n,r){if(typeof e==`function`)return el(e);if(n!==void 0&&!Array.isArray(n)&&typeof t!=`function`)return rl(e,t,n,r);let i=typeof t==`function`?t:ps(t,n,r),a=Array.isArray(e)?nl(e,i):nl([e],([e])=>i(e)),o=Array.isArray(e)?void 0:e.accelerate;if(o&&!o.isTransformed&&typeof t!=`function`&&Array.isArray(n)&&r?.clamp!==!1&&!r?.mixer){let e=r?.ease;a.accelerate={...o,times:[0,...t,1],keyframes:[n[0],...n,n[n.length-1]],isTransformed:!0,...e?{ease:Array.isArray(e)?[e[0],...e]:e}:{}}}return a}function nl(e,t){let n=u(()=>[]);return Qc(e,()=>{n.length=0;let r=e.length;for(let t=0;t<r;t++)n[t]=e[t].get();return t(n)})}function rl(e,t,n,r){let i=u(()=>Object.keys(n)),a=u(()=>({}));for(let o of i)a[o]=X(e,t,n[o],r);return a}function il(){!Mo.current&&Po();let[e]=(0,c.useState)(jo.current);return e}function al(e){return typeof e==`object`&&!Array.isArray(e)}function ol(e,t,n,r){return e==null?[]:typeof e==`string`&&al(t)?Ia(e,n,r):e instanceof NodeList?Array.from(e):Array.isArray(e)?e.filter(e=>e!=null):[e]}function sl(e,t,n){return e*(t+1)+n*t}function cl(e,t){if(t.has(e))return t.get(e);let[,n,r]=e.match(/^(.+?)([+-][\d.]+)$/)||[];return t.has(n)?Math.max(0,t.get(n)+parseFloat(r)):void 0}function ll(e,t,n,r){return typeof t==`number`?t:t.startsWith(`-`)||t.startsWith(`+`)?Math.max(0,e+parseFloat(t)):t===`<`?n:t.startsWith(`<`)?Math.max(0,n+parseFloat(t.slice(1))):cl(t,r)??e}function ul(e,t,n){for(let r=0;r<e.length;r++){let i=e[r];i.at>t&&i.at<n&&(m(e,i),r--)}}function dl(e,t,n,r,i,a){ul(e,i,a);for(let o=0;o<t.length;o++)e.push({value:t[o],at:dt(i,a,r[o]),easing:ue(n,o)})}function fl(e,t,n=0){let r=t+1+t*n;for(let t=0;t<e.length;t++)e[t]=e[t]/r}function pl(e,t){return e.at===t.at?e.value===null?1:t.value===null?-1:0:e.at-t.at}var ml=`easeInOut`,hl=20;function gl(e,{defaultTransition:t={},...n}={},r,i,a){let o=t.duration||.3,s=new Map,c=new Map,l={},u=new Map,d=0,f=0,p=0,m=(e,n)=>{let a=n,s=e=>typeof e==`number`?n+e:ll(f,e,d,u);for(let n=0;n<e.length;n++){let h=e[n];if(typeof h==`string`){u.set(h,f);continue}if(!Array.isArray(h)){let e=h.at===void 0?f:s(h.at);`sequence`in h?(d=f=e,f=m(h.sequence,e),d=e,a=Math.max(a,f)):u.set(h.name,e);continue}let[g,_,v={}]=h;v.at!==void 0&&(f=s(v.at));let y=0,b=(e,n,r,a=0,s=0)=>{let c=yl(e),{delay:l=0,times:u=mn(c),type:d=t.type||`keyframes`,repeat:m,repeatType:h,repeatDelay:g=0,..._}=n,{ease:v=t.ease||`easeOut`,duration:b}=n;r.mixer||=n.mixer;let x=typeof l==`function`?l(a,s):l,S=c.length,C=Mr(d)?d:i?.[d||`keyframes`];if(S<=2&&C){let e=100;if(S===2&&Sl(c)){let t=c[1]-c[0];e=Math.abs(t)}let n={...t,..._};b!==void 0&&(n.duration=T(b));let r=Lt(n,e,C);v=r.ease,b=r.duration}b??=o;let w=f+x;u.length===1&&u[0]===0&&(u[1]=1);let E=u.length-c.length;if(E>0&&pn(u,E),c.length===1&&c.unshift(null),m&&m<hl){let e=b>0?g/b:0;b=sl(b,m,g);let t=[...c],n=[...u];v=Array.isArray(v)?[...v]:[v];let r=[...v],i=h===`reverse`||h===`mirror`,a=t,o=r;i&&(a=[...t].reverse(),h===`reverse`&&(o=[...r].reverse().map(e=>typeof e==`function`?j(e):e)));for(let s=0;s<m;s++){let l=i&&s%2==0,d=l?a:t,f=l?o:r,p=(s+1)*(1+e);e>0&&(c.push(c[c.length-1]),u.push(p),v.push(`linear`)),c.push(...d);for(let e=0;e<d.length;e++)u.push(n[e]+p),v.push(e===0?`linear`:ue(f,e-1))}fl(u,m,e)}let D=w+b;dl(r,c,v,u,w,D),y=Math.max(x+b,y),p=Math.max(D,p)};if(G(g)){let e=_l(g,c);b(_,v,vl(`default`,e))}else{let e=ol(g,_,r,l),t=e.length;for(let n=0;n<t;n++){_=_,v=v;let r=_l(e[n],c);for(let e in _)b(_[e],bl(v,e),vl(e,r),n,t)}}d=f,f+=y,a=Math.max(a,f)}return a};m(e,0),a&&(a.duration=p,a.labels=u);let{type:h,...g}=t;return c.forEach((e,r)=>{for(let i in e){let a=e[i];a.sort(pl);let o=[],c=[],l=[];for(let e=0;e<a.length;e++){let{at:t,value:n,easing:r}=a[e];o.push(n),c.push(C(0,p,t)),l.push(r||`easeOut`)}c[0]!==0&&(c.unshift(0),o.unshift(o[0]),l.unshift(ml)),c[c.length-1]!==1&&(c.push(1),o.push(null)),s.has(r)||s.set(r,{keyframes:{},transition:{}});let u=s.get(r);u.keyframes[i]=o,u.transition[i]={...g,duration:p,ease:l,times:c,mixer:a.mixer||t.mixer,...n}}}),s}function _l(e,t){return!t.has(e)&&t.set(e,{}),t.get(e)}function vl(e,t){return t[e]||(t[e]=[]),t[e]}function yl(e){return Array.isArray(e)?e:[e]}function bl(e,t){return e&&e[t]?{...e,...e[t]}:{...e}}var xl=e=>typeof e==`number`,Sl=e=>e.every(xl);function Cl(e,t){return G(e)||typeof e==`number`||typeof e==`string`&&!al(t)}function wl(e,t,n,r){let i=[];if(Cl(e,t))i.push(ho(e,al(t)&&t.default||t,n&&(n.default||n)));else{if(e==null)return i;let a=ol(e,t,r),o=a.length;for(let e=0;e<o;e++){let r=a[e],s={...n};`delay`in s&&typeof s.delay==`function`&&(s.delay=s.delay(e,o)),r instanceof Element?i.push(...uo(r,t,s,Co.get(r))):i.push(...Aa(Oa(r)??fo,r,t,s))}}return i}function Tl(e,t,n,r){let i=[],a=gl(e.map(e=>{if(Array.isArray(e)&&typeof e[0]==`function`){let t=e[0],n=zi(0);return n.on(`change`,t),e.length===1?[n,[0,1]]:e.length===2?[n,[0,1],e[1]]:[n,e[1],e[2]]}return e}),t,n,{spring:ln},r),o=t?.reduceMotion??t?.defaultTransition?.reduceMotion;return a.forEach(({keyframes:e,transition:t},n)=>{i.push(...wl(n,e,{...t,reduceMotion:o}))}),i}var El=0;function Dl({repeat:e=0,repeatDelay:t=0,repeatType:n=`loop`,delay:r=0},i,a,o){let s=i+t,c=o===void 0;if(c){let t=Math.max(0,a-r);o=s&&t>0?Math.min(e,Math.ceil(t/s-1e-9)-1):0,a=Math.min(t-o*s,i)}return n!==`loop`&&o%2&&(a=i-a),[o,c?a:r+o*s+a]}function Ol(e,t){let n=[...e],r=typeof n[0]==`function`?Math.max(1,n.length-1):2;return n[r]={...n[r],at:t},n}var kl=(e,t)=>t===void 0?e:{name:e,at:t};function Al(e){e.pause(),e.time=0,e.stop()}var jl=class e{constructor(e=[],t={},n){this.options=t,this.entries=[],this.repeatIndex=0,this.prevTime=0,this.markers=[],this.labels=new Map,this.totalDuration=0,this.isDirty=!1,this.isDone=!1,this.isRebuilding=!1,this.playbackSpeed=1,this.motionScope=K.current,this.isKilled=!1,this.isWrapped=!1,this.stop=()=>{this.flush(),this.group?.stop()},this.isPaused=t.autoplay===!1,this.newFinished(),e.forEach(e=>this.add(e)),n?(this.isDirty=!1,this.isWrapped=!0,this.group=new Ni(n),this.watch()):(this.invalidate(),this.flush())}add(t,n){return t instanceof e&&t.adopt(this),this.push({item:t,at:n})}call(e,t){return this.push({item:e,at:t,marker:{name:`_m`+El++,time:0,callback:e}})}addPause(e,t){return this.push({item:t||{},at:e,marker:{name:`_m`+El++,time:0,callback:t,pause:!0}})}move(e,t){return this.entries.forEach(n=>{n.item===e&&(n.at=t)}),this.invalidate()}remove(t){return t instanceof e&&(t.parent=void 0),this.entries=this.entries.filter(e=>e.item!==t),this.invalidate()}clear(){return this.entries=[],this.invalidate()}getLabelTime(e){return this.flush(),this.labels.get(e)}seek(e){return this.time=this.resolve(e),this}playTo(e){let t=this.resolve(e),n=this.iterationDuration,r=this.time,[i]=Dl(this.options,n,r),a=Dl(this.options,n,t,i)[1],o=Math.abs(this.speed);return this.speed=a<r?-o:o,this.stopAt=t,this.clock||this.invalidate(),this.play(),this}reverse(){return this.speed=-this.speed,this.play(),this}get progress(){return this.duration?this.time/this.duration:0}set progress(e){this.time=e*this.duration}get time(){return this.active()?.time??0}set time(e){this.flush(),this.prevTime=e,this.group&&(this.group.time=e),this.repeatIndex=this.currentRepeat()}get speed(){return this.playbackSpeed}set speed(e){this.playbackSpeed=e,this.group&&(this.group.speed=e)}get duration(){return this.flush(),this.isWrapped?this.group.duration:this.totalDuration}get iterationDuration(){return this.flush(),this.isWrapped?this.group.iterationDuration:this.totalDuration}get state(){return this.active()?.state??`idle`}get startTime(){return this.active()?.startTime??null}play(){this.flush(),this.isPaused=!1,this.group?.play(),this.isDone&&(this.newFinished(),this.watch())}pause(){this.flush(),this.isPaused=!0,this.group?.pause()}cancel(){this.flush(),this.group?.cancel()}complete(){this.flush(),this.group?.complete()}attachTimeline(e){return this.flush(),this.scrollTimeline=e,this.detachScroll=this.group?.attachTimeline(e),()=>{this.scrollTimeline=void 0,this.detachScroll?.()}}then(e,t){return this.finished.then(e,t)}active(){return this.flush(),this.group?.animations.length?this.group:void 0}push(e){return this.entries.push(e),this.invalidate()}invalidate(){return this.parent?this.parent.invalidate():this.isDirty||(this.isDirty=!0,queueMicrotask(()=>this.flush())),this}flush(){this.isDirty&&!this.parent&&!this.isKilled&&this.build()}adopt(e){this.group&&=(Al(this.group),void 0),this.isDirty=!1,this.parent=e}build(){let e=this.isWrapped?this.group.iterationDuration:this.totalDuration;this.isDirty=!1,this.isWrapped=!1;let t=this.group,n=0;t&&(this.isRebuilding=!0,this.scrollTimeline?(this.detachScroll?.(),t.cancel()):(n=t.animations.length?t.time:0,Al(t)),this.isRebuilding=!1);let{defaultTransition:r,onComplete:i,onUpdate:a,onRepeat:o,onReverseComplete:s,autoplay:c,scope:l,...u}=this.options,d={};l?.reduceMotion!==void 0&&(d.reduceMotion=l.reduceMotion),l?.skipAnimations!==void 0&&(d.skipAnimations=l.skipAnimations),Object.assign(d,u);let f=new Map,p={},m=K.current;K.current=this.motionScope;let h;try{h=Tl(this.toSequence(f),{defaultTransition:r,...d},l,p)}finally{K.current=m}let g=p.labels,_=d.duration??p.duration,v=p.duration?_/p.duration:1;if(g.forEach((e,t)=>g.set(t,e*v)),this.markers=[],f.forEach((e,t)=>{e.time=g.get(t),g.delete(t),_=Math.max(_,e.time),this.markers.push(e)}),this.markers.sort((e,t)=>e.time-t.time),this.labels=g,this.totalDuration=_,this.clock=this.clockAnimation=void 0,this.markers.length||this.stopAt!==void 0||a||o){let e=this.clock=zi(0);e.on(`change`,t=>e===this.clock&&this.onClock(t)),h.unshift(this.clockAnimation=ho(e,[0,_],{...d,duration:_,ease:`linear`}))}let y=this.group=new Ni(h),{delay:b=0,repeat:x=0,repeatDelay:S=0}=this.options,[C,w]=Dl(this.options,e,n);n>b&&(n=Dl(this.options,_,Math.min(w,_),C)[1]),this.isDone&&n<b+(x+1)*(_+S)-S&&this.newFinished(),this.scrollTimeline?this.detachScroll=y.attachTimeline(this.scrollTimeline):(y.speed=this.playbackSpeed,this.isPaused&&y.pause(),n&&(y.time=n)),this.repeatIndex=this.currentRepeat(),this.prevTime=n||-1,this.watch()}toSequence(t){return this.entries.map(({item:n,at:r,marker:i})=>i?(t.set(i.name,i),kl(i.name,r)):n instanceof e?{sequence:n.toSequence(t),at:r}:typeof n==`string`?kl(n,r):r===void 0?n:Array.isArray(n)?Ol(n,r):{...n,at:r})}resolve(e){return this.flush(),typeof e==`number`?e:cl(e,this.labels)??this.time}currentRepeat(){return Dl(this.options,this.totalDuration,this.clockAnimation?.time??0)[0]}onClock(e){let t=this.prevTime;if(this.prevTime=e,this.isRebuilding)return;let{onUpdate:n,onRepeat:r,repeatType:i=`loop`}=this.options;n?.(e);let a=this.currentRepeat(),o=a>this.repeatIndex?1:-1;for(;a!==this.repeatIndex;){let e=this.speed>0==(i===`loop`||!(this.repeatIndex%2)),n=e?this.totalDuration:0;if(this.cross(t,n))return;this.repeatIndex+=o,r?.(),t=i===`loop`?e?-1:1/0:n}this.cross(t,e)}cross(e,t){if(e===t)return;let n=t>e,r=r=>n?r>e&&r<=t:r<e&&r>=t,i=n?this.markers:[...this.markers].reverse();for(let e of i)if(r(e.time)&&(e.callback?.(n?1:-1),e.pause))return this.pauseAt(e.time);if(this.stopAt!==void 0&&r(this.stopAt))return this.pauseAt(this.stopAt),this.stopAt=void 0,!0}pauseAt(e){return this.pause(),this.time=Dl(this.options,this.totalDuration,e,this.repeatIndex)[1],!0}watch(){let e=this.group;e.finished.then(()=>{if(e!==this.group||this.isDone)return;this.isDone=!0;let{onComplete:t,onReverseComplete:n}=this.options,r=this.speed<0&&n||t,i=this.resolveFinished;r?.(),i()})}newFinished(){this.isDone=!1,this.finished=new Promise(e=>{this.resolveFinished=e});let{scope:e}=this.options,t=this.motionScope?.add(()=>{this.isKilled=!0,this.stop()});e?.animations.push(this),this.finished.then(()=>{t?.(),e&&m(e.animations,this)})}};function Ml(e){return Array.isArray(e)&&e.some(e=>Array.isArray(e)||e?.sequence)}function Nl(e={}){let{scope:t,reduceMotion:n,skipAnimations:r}=e;function i(e,i,a){let o=K.current?.transition,s={};n!==void 0&&(s.reduceMotion=n),r!==void 0&&(s.skipAnimations=r);let c;if(Ml(e)){let r={...s,...i,scope:t};o&&(r.defaultTransition={...o,...r.defaultTransition}),r.reduceMotion=i?.reduceMotion??r.defaultTransition?.reduceMotion??n,c=new jl(e,r)}else{let{onComplete:n,...r}=a||{},l={...s,...o,...r},{onUpdate:u}=r;c=new jl([typeof e==`number`||typeof e==`string`&&(typeof i==`string`||Array.isArray(i))?[u||(()=>{}),Array.isArray(i)?i:[e,i],{...l,onUpdate:void 0}]:[e,i,l]],{...s,onComplete:n,scope:t},wl(e,i,l,t))}return c}return i}var Pl=Object.assign(Nl(),{addEffect:Ea,removeEffect:Da}),Z=Mc,Fl=(...e)=>e.filter(Boolean).join(` `),Il=[.16,1,.3,1],Ll={delays:{nav:0,first:.1,last:.25,portrait:.4,book:.6,pad:.7,intro:.8,socials:1.15},letterStagger:.055,depth:{portrait:14,first:6,last:9},letter:{perCharacter:.075,pauseAfterPunctuation:.36,beforeSeal:1.4,press:.8,sealHold:4.8},bookTilt:14,bookOpen:34,bookCycle:3,spotlight:{radius:145,readyAfter:2.1},cursor:{dot:10,ring:44,disc:72,readLabel:`Click`}},Rl={drawAt:.1,drawDuration:.75,floodAt:.7,floodDuration:.65,openAt:1.4,openDuration:.85,fontTimeout:1.2},zl={finePointer:`(hover: hover) and (pointer: fine)`,composition:`(min-width: 1024px) and (min-aspect-ratio: 5/4)`,reducedMotion:`(prefers-reduced-motion: reduce)`},Bl={eyebrow:``,greeting:``,stamp:``,postmark:``,seal:``,sealing:``,messages:[],counter:``},Vl=(0,c.createContext)(null),Q=()=>{let e=(0,c.useContext)(Vl);if(!e)throw Error(`Elias parts must render inside <Elias>`);return e},Hl=()=>{let{REDUCED:e}=Q(),t=il();return e??t},Ul=(0,c.createContext)(!0),Wl=()=>(0,c.useContext)(Ul),Gl=(0,c.createContext)(!0),Kl=()=>(0,c.useContext)(Gl),ql=e=>{let t=(0,c.useCallback)(t=>{let n=window.matchMedia(e);return n.addEventListener(`change`,t),()=>n.removeEventListener(`change`,t)},[e]);return(0,c.useSyncExternalStore)(t,()=>window.matchMedia(e).matches,()=>!1)},$=(e,t,n=1)=>e?{duration:0}:{delay:t,duration:n,ease:Il},Jl=e=>(0,q.jsxs)(`svg`,{width:`0`,height:`0`,"aria-hidden":!0,focusable:`false`,className:`absolute`,...e,children:[(0,q.jsxs)(`filter`,{id:`ea-ink-duotone`,colorInterpolationFilters:`sRGB`,children:[(0,q.jsx)(`feColorMatrix`,{type:`matrix`,values:`0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0 0 0 1 0`}),(0,q.jsxs)(`feComponentTransfer`,{children:[(0,q.jsx)(`feFuncR`,{type:`table`,tableValues:`0.090 0.25 1 0.965`}),(0,q.jsx)(`feFuncG`,{type:`table`,tableValues:`0.078 0.215 0.282 0.957`}),(0,q.jsx)(`feFuncB`,{type:`table`,tableValues:`0.071 0.195 0.161 0.941`})]})]}),(0,q.jsxs)(`filter`,{id:`ea-ink-outline`,children:[(0,q.jsx)(`feMorphology`,{in:`SourceAlpha`,operator:`erode`,radius:`2`,result:`inside`}),(0,q.jsx)(`feComposite`,{in:`SourceGraphic`,in2:`inside`,operator:`out`})]})]}),Yl=e=>{let t=Array.from({length:20},(e,t)=>({x:20+t%5*15,y:84+Math.floor(t/5)*11,marked:t===12}));return(0,q.jsxs)(`svg`,{viewBox:`0 0 100 139`,preserveAspectRatio:`xMidYMid slice`,"aria-hidden":!0,...e,children:[(0,q.jsx)(`rect`,{width:`100`,height:`139`,fill:`#d3e6f1`}),t.map(e=>(0,q.jsx)(`circle`,{cx:e.x,cy:e.y,r:e.marked?5:3.4,fill:e.marked?`#ff9f80`:`#a3c8de`},`${e.x}-${e.y}`))]})},Xl=e=>(0,q.jsxs)(`svg`,{viewBox:`0 0 100 139`,preserveAspectRatio:`xMidYMid slice`,"aria-hidden":!0,...e,children:[(0,q.jsx)(`rect`,{width:`100`,height:`139`,fill:`#d3e3d2`}),(0,q.jsx)(`circle`,{cx:`70`,cy:`86`,r:`30`,fill:`#e6efdf`}),(0,q.jsx)(`circle`,{cx:`70`,cy:`86`,r:`14`,fill:`#f6efd9`}),(0,q.jsx)(`rect`,{x:`12`,y:`112`,width:`56`,height:`10`,rx:`1.5`,fill:`#8fb59a`}),(0,q.jsx)(`rect`,{x:`18`,y:`102`,width:`46`,height:`10`,rx:`1.5`,fill:`#a9c8b1`}),(0,q.jsx)(`rect`,{x:`14`,y:`92`,width:`40`,height:`10`,rx:`1.5`,fill:`#f2e9d6`}),(0,q.jsx)(`rect`,{x:`0`,y:`122`,width:`100`,height:`17`,fill:`#bcd4bd`})]}),Zl=e=>(0,q.jsxs)(`svg`,{viewBox:`0 0 100 139`,preserveAspectRatio:`xMidYMid slice`,"aria-hidden":!0,...e,children:[(0,q.jsx)(`rect`,{width:`100`,height:`139`,fill:`#e2daf0`}),(0,q.jsx)(`circle`,{cx:`84`,cy:`30`,r:`7`,fill:`#f6f1fb`}),(0,q.jsx)(`path`,{d:`M92 139c-10-14-34-14-30-28s24-12 14-26-46-6-50-18`,fill:`none`,stroke:`#b4a6d8`,strokeWidth:`8`,strokeLinecap:`round`}),(0,q.jsxs)(`g`,{fill:`#f6f1fb`,children:[(0,q.jsx)(`circle`,{cx:`79`,cy:`128`,r:`1.6`}),(0,q.jsx)(`circle`,{cx:`65`,cy:`116`,r:`1.6`}),(0,q.jsx)(`circle`,{cx:`73`,cy:`100`,r:`1.6`}),(0,q.jsx)(`circle`,{cx:`60`,cy:`88`,r:`1.6`}),(0,q.jsx)(`circle`,{cx:`42`,cy:`82`,r:`1.6`})]})]}),Ql=e=>(0,q.jsxs)(`svg`,{viewBox:`0 0 100 139`,preserveAspectRatio:`xMidYMid slice`,"aria-hidden":!0,...e,children:[(0,q.jsx)(`rect`,{width:`100`,height:`139`,fill:`#f8dccb`}),(0,q.jsx)(`circle`,{cx:`50`,cy:`96`,r:`38`,fill:`#fbe7da`}),(0,q.jsx)(`path`,{d:`M20 96a30 30 0 0 1 60 0Z`,fill:`#ff9f80`}),(0,q.jsx)(`rect`,{y:`96`,width:`100`,height:`43`,fill:`#f3c7ae`}),(0,q.jsx)(`rect`,{x:`14`,y:`104`,width:`72`,height:`2.4`,rx:`1.2`,fill:`#eab295`}),(0,q.jsx)(`rect`,{x:`24`,y:`112`,width:`52`,height:`2.4`,rx:`1.2`,fill:`#eab295`}),(0,q.jsx)(`rect`,{x:`34`,y:`120`,width:`32`,height:`2.4`,rx:`1.2`,fill:`#eab295`})]}),$l=({label:e,icon:t=`right`,href:n,disabled:r=!1,onClick:i,className:o})=>{let c=t===`up-right`?s:a,l=Fl(`ea-cta`,t===`up-right`&&`ea-cta-diagonal`,o),u=(0,q.jsxs)(q.Fragment,{children:[(0,q.jsx)(`span`,{className:`ea-cta-label`,children:e}),(0,q.jsxs)(`span`,{"aria-hidden":!0,className:`ea-cta-mark`,children:[(0,q.jsx)(c,{className:`ea-cta-arrow ea-cta-arrow-out`,strokeWidth:2}),(0,q.jsx)(c,{className:`ea-cta-arrow ea-cta-arrow-in`,strokeWidth:2})]})]});return n?(0,q.jsx)(`a`,{href:n,className:l,children:u}):(0,q.jsx)(`button`,{type:`button`,className:l,disabled:r,onClick:i,children:u})},eu=(e,t)=>{let n=document.createElement(`canvas`).getContext(`2d`);if(!n)return[];let r=getComputedStyle(e),i=r.textTransform===`uppercase`?t.toUpperCase():t;n.font=`${r.fontWeight} 100px ${r.fontFamily}`;let a=e=>n.measureText(e).width;return[...i].map((e,t)=>{let n=i[t+1];return n?(a(e+n)-a(e)-a(n))/100:0})},tu=({text:e,delay:t,from:n,reverse:r=!1})=>{let{MOTION:i}=Q(),[a,o]=(0,c.useState)([]),s=(0,c.useRef)(null),l=Hl(),u=Wl(),d=[...e],f=n===`below`?`105%`:`-105%`;return(0,c.useEffect)(()=>{let t=!0;return document.fonts.ready.then(()=>{t&&s.current&&o(eu(s.current,e))}),()=>{t=!1}},[e]),(0,q.jsx)(`span`,{ref:s,"aria-hidden":!0,className:`inline-block whitespace-nowrap`,children:d.map((e,n)=>{let o=r?d.length-1-n:n;return(0,q.jsx)(`span`,{className:`ea-letter-mask inline-block`,style:a[n]?{marginRight:`${a[n]}em`}:void 0,children:(0,q.jsx)(Z.span,{className:`inline-block`,initial:{transform:`translateY(${f})`},animate:u?{transform:`translateY(0%)`}:void 0,transition:$(l,t+o*i.letterStagger,1.05),children:e})},`${e}-${n}`)})})},nu={stiffness:420,damping:34,mass:.5},ru=e=>e instanceof Element?e.closest(`.ea-book-frame`)?`read`:e.closest(`a, button`)?`link`:`dot`:`dot`,iu=()=>{let[e,t]=(0,c.useState)(`dot`),n=(0,c.useRef)(null),r=(0,c.useRef)(`dot`),i=J(-100),a=J(-100),o=J(0),s=Y(i,nu),l=Y(a,nu),{MOTION:u}=Q(),{dot:d,ring:f,disc:p,readLabel:m}=u.cursor;return(0,c.useEffect)(()=>{let e=n.current?.parentElement;if(!e)return;let s=n=>{let s=e.getBoundingClientRect(),c=ru(n.target);i.set(n.clientX-s.left),a.set(n.clientY-s.top),o.set(1),c!==r.current&&(r.current=c,t(c))},c=()=>o.set(0);return e.addEventListener(`pointermove`,s,{passive:!0}),e.addEventListener(`pointerleave`,c),()=>{e.removeEventListener(`pointermove`,s),e.removeEventListener(`pointerleave`,c)}},[i,a,o]),(0,q.jsxs)(`div`,{ref:n,"aria-hidden":!0,className:`pointer-events-none absolute inset-0 z-[60] overflow-hidden`,children:[(0,q.jsxs)(Z.div,{className:`absolute top-0 left-0`,style:{x:s,y:l,opacity:o},children:[(0,q.jsx)(Z.div,{className:`border-ea-accent absolute rounded-full border-[1.5px]`,style:{width:f,height:f,left:-f/2,top:-f/2},initial:{transform:`scale(0.2)`,opacity:0},animate:e===`link`?{transform:`scale(1)`,opacity:1}:{transform:`scale(0.2)`,opacity:0},transition:{duration:.35,ease:Il}}),(0,q.jsx)(Z.div,{className:`bg-ea-accent text-ea-page absolute grid place-items-center rounded-full text-[11px] font-medium tracking-[0.18em] uppercase`,style:{width:p,height:p,left:-p/2,top:-p/2},initial:{transform:`scale(0)`,opacity:0},animate:e===`read`?{transform:`scale(1)`,opacity:1}:{transform:`scale(0)`,opacity:0},transition:{duration:.4,ease:Il},children:m})]}),(0,q.jsx)(Z.div,{className:`absolute top-0 left-0`,style:{x:i,y:a,opacity:o},children:(0,q.jsx)(Z.div,{className:`bg-ea-accent ring-ea-page absolute rounded-full ring-2`,style:{width:d,height:d,left:-d/2,top:-d/2},animate:{transform:e===`dot`?`scale(1)`:e===`link`?`scale(0.5)`:`scale(0)`},transition:{duration:.3,ease:Il}})})]})},au=[.76,0,.24,1],ou={fromRadius:70,toRadius:760},su=({onOpen:e})=>{let{INTRO:t,NAME:n,SPLASH:r}=Q(),[i,a]=(0,c.useState)(!1),[o,s]=(0,c.useState)(!1),l=(0,c.useRef)(!1),u=(0,c.useId)(),d=J(0),f=$c`radial-gradient(circle ${d}px at 50% 50%, transparent ${X(d,e=>e-1)}px, #000 ${d}px)`,p=(0,c.useId)(),m=(0,c.useCallback)(()=>{if(l.current)return;l.current=!0,e();let t=Math.hypot(window.innerWidth,window.innerHeight)/2+24;Pl(d,t,{duration:r.openDuration,ease:au}).then(()=>s(!0))},[d,e]);return(0,c.useEffect)(()=>{let e=!0,t=new Promise(e=>window.setTimeout(e,r.fontTimeout*1e3));return Promise.race([document.fonts.ready,t]).then(()=>{e&&a(!0)}),()=>{e=!1}},[]),(0,c.useEffect)(()=>{if(!i)return;let e=window.setTimeout(m,r.openAt*1e3);return()=>window.clearTimeout(e)},[i,m]),(0,c.useEffect)(()=>{if(o)return;let e=document.documentElement,t=e.style.overflow;return e.style.overflow=`hidden`,window.addEventListener(`keydown`,m),()=>{e.style.overflow=t,window.removeEventListener(`keydown`,m)}},[o,m]),o?null:(0,q.jsxs)(Z.div,{"aria-hidden":!0,className:`ea-splash bg-ea-ink fixed top-0 left-0 z-50 flex h-svh w-full flex-col`,style:{maskImage:f,WebkitMaskImage:f},onPointerDown:m,children:[(0,q.jsx)(`div`,{className:`ea-wrap flex h-19 shrink-0 items-center`,children:(0,q.jsx)(Z.p,{className:`text-ea-page/70 flex gap-[0.6em] text-[11px] font-medium tracking-[0.2em] uppercase`,initial:{opacity:0},animate:i?{opacity:1}:void 0,transition:{delay:.2,duration:.8},children:t.roles.map((e,t)=>(0,q.jsxs)(c.Fragment,{children:[t>0&&(0,q.jsx)(`span`,{className:`text-ea-accent`,children:`/`}),(0,q.jsx)(`span`,{children:e})]},e))})}),(0,q.jsx)(`div`,{className:`pointer-events-none absolute inset-0 flex items-center justify-center`,children:(0,q.jsxs)(`svg`,{viewBox:`0 23 1000 414`,className:`ea-splash-name font-ea-display font-black`,children:[(0,q.jsxs)(`defs`,{children:[(0,q.jsx)(`clipPath`,{id:p,children:(0,q.jsx)(Z.rect,{x:0,y:0,width:1e3,height:440,style:{originX:0},initial:{scaleX:0},animate:i?{scaleX:1}:void 0,transition:{delay:r.drawAt,duration:r.drawDuration,ease:Il}})}),(0,q.jsx)(`clipPath`,{id:u,children:(0,q.jsx)(Z.circle,{cx:0,cy:230,r:ou.fromRadius,initial:{x:-260,scale:1},animate:i?{x:500,scale:ou.toRadius/ou.fromRadius}:void 0,transition:{delay:r.floodAt,duration:r.floodDuration,ease:au}})})]}),(0,q.jsxs)(`g`,{clipPath:`url(#${p})`,filter:`url(#ea-ink-outline)`,textAnchor:`middle`,children:[(0,q.jsx)(`text`,{x:500,y:255,fontSize:n.first.length>5?210:300,letterSpacing:`0.02em`,fill:`var(--color-ea-accent)`,children:n.first.toUpperCase()}),(0,q.jsx)(`text`,{x:500,y:424,fontSize:196,letterSpacing:`0.02em`,fill:`var(--color-ea-page)`,children:n.last.toUpperCase()})]}),(0,q.jsxs)(`g`,{clipPath:`url(#${u})`,textAnchor:`middle`,children:[(0,q.jsx)(`text`,{x:500,y:255,fontSize:n.first.length>5?210:300,letterSpacing:`0.02em`,fill:`var(--color-ea-accent)`,children:n.first.toUpperCase()}),(0,q.jsx)(`text`,{x:500,y:424,fontSize:196,letterSpacing:`0.02em`,fill:`var(--color-ea-page)`,children:n.last.toUpperCase()})]})]})})]})},cu=({label:e,href:t,active:n=!1,step:r})=>{let{MOTION:i}=Q(),a=Hl(),o=Wl();return(0,q.jsx)(Z.li,{initial:{opacity:0,transform:`translateY(8px)`},animate:o?{opacity:1,transform:`translateY(0px)`}:void 0,transition:$(a,i.delays.nav+.15+r*.08,.8),children:(0,q.jsx)(`a`,{href:t,"aria-current":n?`page`:void 0,className:Fl(`ea-nav-link inline-flex min-h-10 items-center gap-2 font-medium uppercase`,n?`text-ea-accent`:`text-ea-ink`),children:(0,q.jsxs)(`span`,{className:`ea-roll`,children:[(0,q.jsx)(`span`,{children:e}),(0,q.jsx)(`span`,{"aria-hidden":!0,children:e})]})})})},lu=()=>{let{BRAND:e,MOTION:t,NAV_CTA:n,NAV_LINKS:r,NAV_STATUS:i}=Q(),a=Hl(),o=Wl(),{left:s,right:c}=r;return(0,q.jsx)(`header`,{className:`ea-wrap`,children:(0,q.jsxs)(`nav`,{"aria-label":`Main`,className:`ea-nav`,children:[(0,q.jsx)(`a`,{href:e.href,className:`ea-nav-logo font-ea-display text-ea-accent overflow-y-clip leading-none font-black tracking-[-0.045em] uppercase`,children:(0,q.jsx)(Z.span,{className:`block`,initial:{transform:`translateY(105%)`},animate:o?{transform:`translateY(0%)`}:void 0,transition:$(a,t.delays.nav,.9),children:e.name})}),(0,q.jsxs)(Z.p,{className:`ea-nav-status`,initial:{opacity:0},animate:o?{opacity:1}:void 0,transition:$(a,t.delays.nav+.5,.8),children:[(0,q.jsx)(`span`,{"aria-hidden":!0,className:`ea-nav-status-dot`}),i.label,(0,q.jsx)(`span`,{"aria-hidden":!0,className:`text-ea-accent`,children:`·`}),(0,q.jsx)(`span`,{className:`text-ea-ink`,children:i.detail})]}),(0,q.jsx)(`ul`,{className:`ea-nav-left`,children:s.map((e,t)=>(0,q.jsx)(cu,{...e,step:s.length-1-t},e.label))}),(0,q.jsx)(`ul`,{className:`ea-nav-right`,children:c.map((e,t)=>(0,q.jsx)(cu,{...e,step:t},e.label))}),(0,q.jsx)(Z.div,{className:`ea-nav-cta`,initial:{opacity:0,transform:`translateY(8px)`},animate:o?{opacity:1,transform:`translateY(0px)`}:void 0,transition:$(a,t.delays.nav+.15+c.length*.08,.8),children:n&&(0,q.jsx)($l,{label:n.label,href:n.href,icon:`up-right`})})]})})},uu={hidden:{opacity:0,transform:`translateY(0.45em)`,clipPath:`inset(0% 0% 100% 0%)`},shown:{opacity:1,transform:`translateY(0em)`,clipPath:`inset(-20% -5% -35% -5%)`}},du=()=>{let{INTRO:e,MOTION:t}=Q(),n=Hl(),r=Wl(),i=t.delays.intro;return(0,q.jsxs)(`div`,{className:`ea-intro`,children:[(0,q.jsx)(Z.p,{className:`ea-intro-roles text-ea-ink font-medium uppercase`,initial:uu.hidden,animate:r?uu.shown:void 0,transition:$(n,i,.9),children:e.roles.map((e,t)=>(0,q.jsxs)(c.Fragment,{children:[t>0&&(0,q.jsx)(`span`,{"aria-hidden":!0,className:`text-ea-accent`,children:`/`}),(0,q.jsx)(`span`,{children:e})]},e))}),(0,q.jsx)(`p`,{className:`ea-intro-headline text-ea-ink font-medium`,children:e.headline.map((e,t)=>(0,q.jsx)(Z.span,{className:`block`,initial:uu.hidden,animate:r?uu.shown:void 0,transition:$(n,i+.1+t*.09,1),children:e},e))}),(0,q.jsx)(Z.hr,{className:`ea-intro-rule bg-ea-accent origin-left border-0`,initial:{transform:`scaleX(0)`},animate:r?{transform:`scaleX(1)`}:void 0,transition:$(n,i+.45,.9)}),(0,q.jsx)(Z.p,{className:`ea-intro-description text-ea-muted font-light`,initial:{opacity:0,transform:`translateY(10px)`},animate:r?{opacity:1,transform:`translateY(0px)`}:void 0,transition:$(n,i+.55,.9),children:e.description})]})},fu=()=>{let{MOTION:e,SOCIAL_LINKS:t}=Q(),n=Hl(),r=Wl(),i=t=>$(n,e.delays.socials+t*.07,.8);return(0,q.jsx)(`ul`,{"aria-label":`Social links`,className:`ea-socials text-ea-ink flex items-center gap-2.5 text-[14px] lg:gap-2 lg:text-[13px]`,children:t.map((e,t)=>(0,q.jsxs)(c.Fragment,{children:[t>0&&(0,q.jsx)(Z.li,{"aria-hidden":!0,className:`text-ea-accent`,initial:{opacity:0},animate:r?{opacity:1}:void 0,transition:i(t*2-1),children:`/`}),(0,q.jsx)(Z.li,{initial:{opacity:0,transform:`translateY(8px)`},animate:r?{opacity:1,transform:`translateY(0px)`}:void 0,transition:i(t*2),children:(0,q.jsx)(`a`,{href:e.href,target:`_blank`,rel:`noreferrer`,className:`ea-link inline-flex min-h-10 items-center`,children:e.label})})]},e.label))})},pu=()=>{let e=new Date;return e.setDate(e.getDate()+1),e.toLocaleDateString(`en-US`,{month:`short`,day:`numeric`})},mu=e=>String(e).padStart(2,`0`),hu=({date:e})=>{let{LETTER:t}=Q(),n=Hl(),r=(e,t)=>n?{duration:0}:{delay:e,duration:t,ease:Il};return(0,q.jsxs)(`span`,{"aria-hidden":!0,className:`ea-envelope`,children:[(0,q.jsx)(Z.span,{className:`ea-envelope-letter`,initial:{transform:`translateY(-78%)`},animate:{transform:`translateY(6%)`},transition:r(.2,1.05)}),(0,q.jsx)(`span`,{className:`ea-envelope-side ea-envelope-left`}),(0,q.jsx)(`span`,{className:`ea-envelope-side ea-envelope-right`}),(0,q.jsx)(`span`,{className:`ea-envelope-bottom`}),(0,q.jsx)(Z.span,{className:`ea-envelope-flap`,initial:{transform:`rotateX(180deg)`,opacity:0},animate:{transform:`rotateX(0deg)`,opacity:1},transition:r(1.2,.95),children:(0,q.jsx)(`span`,{className:`ea-envelope-flap-shape`})}),(0,q.jsx)(Z.span,{className:`ea-wax-seal font-ea-display`,initial:{transform:`scale(2.2)`,opacity:0},animate:{transform:`scale(1)`,opacity:1},transition:r(2.25,.55),children:t.seal}),(0,q.jsxs)(Z.span,{className:`ea-postmark`,initial:{transform:`scale(1.7) rotate(-34deg)`,opacity:0},animate:{transform:`scale(1) rotate(-12deg)`,opacity:1},transition:r(2.75,.55),children:[(0,q.jsx)(`span`,{children:t.postmark}),(0,q.jsx)(`span`,{className:`ea-postmark-date`,children:e})]})]})},gu=()=>{let{LETTER:e,MOTION:t}=Q(),[n,r]=(0,c.useState)(0),[i,a]=(0,c.useState)(0),[o,s]=(0,c.useState)(`typing`),l=(0,c.useRef)({step:``,ms:0}),u=Hl(),d=Wl(),f=Kl(),p=t.letter,m=e.messages[n],h=u?m:m.slice(0,i),g=h.length===m.length,_=u?{duration:0}:{duration:.75,ease:Il};return(0,c.useEffect)(()=>{if(!d||u||!f)return;let t,c;if(o===`typing`&&i<m.length){let e=m[i-1]??``;t=p.perCharacter+(/[,.]/.test(e)?p.pauseAfterPunctuation:0),c=()=>a(e=>e+1)}else o===`typing`?(t=p.beforeSeal,c=()=>s(`pressing`)):o===`pressing`?(t=p.press,c=()=>s(`sealing`)):(t=p.sealHold,c=()=>{r(t=>(t+1)%e.messages.length),a(0),s(`typing`)});let h=`${n}:${o}:${i}`,g=l.current.step===h?l.current.ms:0,_=performance.now()-g,v=window.setTimeout(c,Math.max(0,t*1e3-g));return()=>{l.current={step:h,ms:performance.now()-_},window.clearTimeout(v)}},[d,u,f,n,o,i,m,p]),(0,q.jsxs)(Z.section,{"aria-label":e.eyebrow,className:`ea-pad`,initial:{clipPath:`inset(0% 0% 0% 100%)`},animate:d?{clipPath:`inset(-10% -10% 0% -10%)`}:void 0,transition:$(u,t.delays.pad,1.15),children:[(0,q.jsx)(`p`,{className:`sr-only`,children:`${e.greeting} ${e.messages[0]}`}),(0,q.jsx)(`div`,{"aria-hidden":!0,className:`ea-pad-inner`,children:(0,q.jsx)(Gs,{mode:`wait`,initial:!1,children:o===`sealing`?(0,q.jsxs)(Z.div,{className:`ea-letter-envelope-view`,initial:{opacity:0},animate:{opacity:1},exit:{opacity:0,x:`70%`,rotate:8},transition:u?{duration:0}:{duration:.9,ease:[.6,0,.35,1]},children:[(0,q.jsxs)(`p`,{className:`ea-letter-eyebrow`,children:[e.sealing,` · `,pu()]}),(0,q.jsx)(hu,{date:pu()})]},`envelope-${n}`):(0,q.jsxs)(Z.div,{className:`ea-letter-sheet`,initial:{opacity:0,transform:`translateY(28px) rotate(-1.4deg)`},animate:{opacity:1,transform:`translateY(0px) rotate(-1.4deg)`},exit:{opacity:0,transform:`translateY(40px) scale(0.94) rotate(-1.4deg)`},transition:_,children:[(0,q.jsx)(`p`,{className:`ea-letter-eyebrow`,children:e.eyebrow}),(0,q.jsx)(`span`,{className:Fl(`ea-letter-stamp`,g&&`is-ready`,o===`pressing`&&`is-pressed`),children:e.stamp}),(0,q.jsx)(`p`,{className:`ea-letter-greeting`,children:e.greeting}),(0,q.jsxs)(`p`,{className:`ea-letter-field ea-letter-read`,children:[h,o===`typing`&&!u&&(0,q.jsx)(`span`,{className:`ea-letter-caret`})]}),(0,q.jsxs)(`p`,{className:`ea-letter-meta`,children:[e.counter,` `,mu(n+1),` / `,mu(e.messages.length)]})]},`sheet-${n}`)})})]})},_u={sunrise:Ql,lamp:Xl,path:Zl,days:Yl},vu={stiffness:160,damping:20,mass:.7},yu={stiffness:90,damping:17,mass:.9},bu={rotateY:-24,rotateX:6},xu=()=>{let{BOOK_CARD:e,BOOKS:t,MOTION:n,NAME:r}=Q(),[i,a]=(0,c.useState)(0),[o,l]=(0,c.useState)(!1),[u,d]=(0,c.useState)(!1),[f,p]=(0,c.useState)(!1),m=(0,c.useRef)(null),h=(0,c.useRef)(null),g=Hl(),_=Wl(),v=Kl(),y=ql(zl.finePointer),b=J(0),x=J(0),S=J(0),C=J(0),w=Y(b,vu),T=Y(x,vu),E=Y(S,vu),D=Y(C,yu),O=X([w,D],([e,t])=>(bu.rotateY+e*n.bookTilt)*(1-t)+e*3*t),k=X([T,D],([e,t])=>(bu.rotateX-e*n.bookTilt*.5)*(1-t)-e*2*t),A=X(D,e=>`${e*50}%`),ee=X(D,e=>1+e*.2),j=X(D,e=>1+e*1.1),te=X([E,D],([e,t])=>-Math.max(e*n.bookOpen,t*178)),ne=y&&!g,{delays:M}=n,N=t[i],re=_u[N.art],ie={rotateY:O,rotateX:k,x:A,scale:ee,"--ea-cover":N.colors.cover,"--ea-cover-type":N.colors.type,"--ea-spine":N.colors.spine},ae=()=>{l(!1),C.set(0)};return(0,c.useEffect)(()=>{if(!o)return;let e=e=>{e.key===`Escape`&&ae()};return window.addEventListener(`keydown`,e),()=>window.removeEventListener(`keydown`,e)}),(0,c.useEffect)(()=>()=>{m.current&&window.clearTimeout(m.current)},[]),(0,c.useEffect)(()=>{if(!_||f||o||g||!v)return;let e=h.current?.index===i?h.current.ms:0,r=performance.now()-e,s=window.setTimeout(()=>{d(!0),a(e=>(e+1)%t.length)},Math.max(0,n.bookCycle*1e3-e));return()=>{h.current={index:i,ms:performance.now()-r},window.clearTimeout(s)}},[_,f,o,g,v,i]),(0,c.useEffect)(()=>{h.current=null},[f,o]),(0,q.jsxs)(`figure`,{className:`ea-book`,children:[(0,q.jsx)(Z.button,{type:`button`,"aria-expanded":o,"aria-label":`${o?e.close:e.open} ${N.title}`,className:`ea-book-frame block w-full overflow-hidden`,initial:{clipPath:`inset(0% 0% 100% 0%)`},animate:_?{clipPath:`inset(0% 0% 0% 0%)`}:void 0,transition:$(g,M.book,1.05),onPointerEnter:()=>{p(!0),ne&&!o&&S.set(1)},onPointerMove:e=>{if(!ne)return;let t=e.currentTarget.getBoundingClientRect();b.set((e.clientX-t.left)/t.width*2-1),x.set((e.clientY-t.top)/t.height*2-1)},onPointerLeave:()=>{p(!1),b.set(0),x.set(0),S.set(0)},onClick:()=>{S.set(0),o?(ae(),g&&D.jump(0),m.current=window.setTimeout(()=>{d(!0),a(e=>(e+1)%t.length)},g?0:650)):(l(!0),g&&D.jump(1),C.set(1))},children:(0,q.jsxs)(`span`,{"aria-hidden":!0,className:`ea-book-stage`,children:[(0,q.jsx)(Z.span,{className:`ea-book-shadow`,style:{scaleX:j}}),(0,q.jsx)(Gs,{initial:!1,children:(0,q.jsx)(Z.span,{className:`ea-book-slot`,initial:{transform:`translateX(100%)`},animate:{transform:`translateX(0%)`},exit:{transform:`translateX(-100%)`},transition:g?{duration:0}:{duration:.9,ease:[.65,0,.35,1]},children:(0,q.jsxs)(Z.span,{className:`ea-book-3d`,style:ie,initial:!u&&{y:`18%`,opacity:0},animate:_?{y:`0%`,opacity:1}:void 0,transition:$(g,M.book+.35,1.1),children:[(0,q.jsx)(`span`,{className:`ea-book-back`}),(0,q.jsx)(`span`,{className:`ea-book-edge`}),(0,q.jsx)(`span`,{className:`ea-book-spine`,children:(0,q.jsx)(`span`,{children:N.title})}),(0,q.jsxs)(`span`,{className:`ea-book-page`,children:[(0,q.jsx)(`span`,{className:`ea-book-page-text`,children:N.text}),(0,q.jsx)(`span`,{className:`ea-book-folio`,children:e.folio})]}),(0,q.jsx)(`span`,{className:`ea-book-hinge`,children:(0,q.jsxs)(Z.span,{className:`ea-book-cover`,style:{rotateY:te},children:[(0,q.jsxs)(`span`,{className:`ea-book-cover-front`,children:[(0,q.jsx)(re,{className:`ea-book-art`}),(0,q.jsx)(`span`,{className:`ea-book-title font-ea-display`,children:N.coverLines.map(e=>(0,q.jsx)(`span`,{className:`block`,children:e},e))}),(0,q.jsx)(`span`,{className:`ea-book-byline`,children:(0,q.jsx)(`span`,{children:`${r.first} ${r.last}`.trim()})})]}),(0,q.jsxs)(`span`,{className:`ea-book-cover-inside`,children:[(0,q.jsx)(`span`,{className:`ea-book-page-chapter`,children:N.chapter}),(0,q.jsx)(`span`,{className:`ea-book-inside-title font-ea-display`,children:N.chapterTitle})]})]})})]})},i)})]})}),(0,q.jsx)(`p`,{className:`sr-only`,"aria-live":`polite`,children:o?`${N.title}. ${N.chapter}: ${N.chapterTitle}. ${N.text}`:``}),(0,q.jsxs)(`figcaption`,{className:`ea-book-caption flex items-center gap-3`,children:[(0,q.jsx)(Z.span,{className:`ea-book-label text-ea-ink mr-auto text-[15px] font-medium whitespace-nowrap`,initial:{opacity:0,transform:`translateX(-12px)`},animate:_?{opacity:1,transform:`translateX(0px)`}:void 0,transition:$(g,M.book+.45,.8),children:(0,q.jsx)(Z.span,{className:`block`,initial:{opacity:0,transform:`translateY(6px)`},animate:{opacity:1,transform:`translateY(0px)`},children:N.label},i)}),(0,q.jsx)(Z.span,{className:`ea-book-topics text-ea-muted text-[13px] whitespace-nowrap`,initial:{opacity:0},animate:_?{opacity:1}:void 0,transition:$(g,M.book+.6,.8),children:(0,q.jsx)(Z.span,{className:`block`,initial:{opacity:0,transform:`translateY(6px)`},animate:{opacity:1,transform:`translateY(0px)`},children:N.topics.map((e,t)=>(0,q.jsxs)(c.Fragment,{children:[t>0&&(0,q.jsx)(`span`,{"aria-hidden":!0,className:`text-ea-accent`,children:` / `}),e]},e))},i)}),(0,q.jsx)(Z.a,{href:e.href,"aria-label":`Read about ${N.title}`,className:`ea-book-arrow relative shrink-0 rounded-full after:absolute after:-inset-2`,initial:{transform:`scale(0) rotate(-90deg)`},animate:_?{transform:`scale(1) rotate(0deg)`}:void 0,transition:$(g,M.book+.7,.7),children:(0,q.jsxs)(`span`,{className:`ea-cta-mark ea-cta-diagonal`,children:[(0,q.jsx)(s,{"aria-hidden":!0,className:`ea-cta-arrow ea-cta-arrow-out`,strokeWidth:2}),(0,q.jsx)(s,{"aria-hidden":!0,className:`ea-cta-arrow ea-cta-arrow-in`,strokeWidth:2})]})})]})]})},Su={stiffness:50,damping:18,mass:.9},Cu={stiffness:380,damping:36,mass:.6},wu=()=>{let{BOOKS:e,IMAGES:t,LETTER:n,MOTION:r,NAME:i,REDUCED:a}=Q(),[o,s]=(0,c.useState)(!1),[l,u]=(0,c.useState)(!1),[d,f]=(0,c.useState)(!0),p=(0,c.useRef)(null),m=(0,c.useRef)(null),h=(0,c.useRef)(!1),g=Hl(),_=ql(zl.finePointer),v=ql(zl.composition),y=ql(zl.reducedMotion),b=a??y,x=J(0),S=J(0),C=Y(x,Su),w=Y(S,Su),T=X(C,e=>e*-r.depth.first),E=X(w,e=>e*-r.depth.first*.4),D=X(C,e=>e*-r.depth.last),O=X(w,e=>e*-r.depth.last*.3),k=X(C,e=>e*r.depth.portrait),A=J(0),ee=J(0),j=J(0),te=Y(A,Cu),ne=Y(ee,Cu),M=$c`${te}px`,N=$c`${ne}px`,re=$c`${j}px`,{delays:ie,spotlight:ae}=r,oe=_&&!g,se=oe&&v&&l,ce=o||b,le=_&&!b,ue={"--ea-spot-x":M,"--ea-spot-y":N,"--ea-spot-r":re};(0,c.useEffect)(()=>{if(!ce)return;let e=window.setTimeout(()=>u(!0),ae.readyAfter*1e3);return()=>window.clearTimeout(e)},[ce,ae.readyAfter]),(0,c.useEffect)(()=>{let e=p.current;if(!e)return;let t=!0,n=()=>f(t&&!document.hidden),r=new IntersectionObserver(([e])=>{t=e.isIntersecting,n()});return r.observe(e),document.addEventListener(`visibilitychange`,n),()=>{r.disconnect(),document.removeEventListener(`visibilitychange`,n)}},[]);let de=(0,c.useCallback)(()=>s(!0),[]);return(0,q.jsxs)(`section`,{ref:p,id:`top`,"aria-label":`${i.first} ${i.last}`,className:Fl(`ea-hero bg-ea-page text-ea-ink font-ea-sans relative`,le&&`ea-has-cursor`),onPointerMove:e=>{if(!oe||(x.set(e.clientX/window.innerWidth*2-1),S.set(e.clientY/window.innerHeight*2-1),!se||!m.current))return;let t=m.current.getBoundingClientRect(),n=e.clientX-t.left,r=e.clientY-t.top;h.current||(h.current=!0,j.get()<1&&(te.jump(n),ne.jump(r)),Pl(j,ae.radius,{duration:.6,ease:Il})),A.set(n),ee.set(r)},onPointerLeave:()=>{x.set(0),S.set(0),h.current=!1,Pl(j,0,{duration:.45,ease:Il})},children:[(0,q.jsx)(Jl,{}),le&&(0,q.jsx)(iu,{}),!b&&(0,q.jsx)(su,{onOpen:de}),(0,q.jsxs)(Ul.Provider,{value:ce,children:[(0,q.jsx)(lu,{}),(0,q.jsx)(`div`,{className:`ea-wrap ea-stage`,children:(0,q.jsxs)(Z.div,{ref:m,className:`ea-canvas`,style:ue,children:[(0,q.jsxs)(`div`,{className:`ea-figure`,children:[(0,q.jsx)(`div`,{className:`ea-layer ea-layer-name ea-layer-base`,children:(0,q.jsxs)(`h1`,{className:`ea-name font-ea-display font-black uppercase`,children:[(0,q.jsx)(`span`,{className:`sr-only`,children:`${i.first} ${i.last}`}),(0,q.jsx)(Z.span,{className:`ea-name-first text-ea-accent`,style:{x:T,y:E},children:(0,q.jsx)(tu,{text:i.first,delay:ie.first,from:`below`})}),(0,q.jsx)(Z.span,{className:`ea-name-last text-ea-ink`,style:{x:D,y:O},children:(0,q.jsx)(tu,{text:i.last,delay:ie.last,from:`above`,reverse:!0})})]})}),se&&(0,q.jsx)(`div`,{"aria-hidden":!0,className:`ea-layer ea-layer-name ea-layer-ink`,children:(0,q.jsxs)(`div`,{className:`ea-name font-ea-display font-black uppercase`,children:[(0,q.jsx)(Z.span,{className:`ea-name-first ea-ink-first`,style:{x:T,y:E},children:i.first}),(0,q.jsx)(Z.span,{className:`ea-name-last ea-ink-last`,style:{x:D,y:O},children:i.last})]})}),(0,q.jsx)(`div`,{className:`ea-layer ea-layer-portrait ea-layer-base`,children:t.portrait&&(0,q.jsx)(Z.img,{src:t.portrait.src,alt:t.portrait.alt,width:t.portrait.width,height:t.portrait.height,fetchPriority:`high`,decoding:`async`,className:`ea-portrait origin-bottom`,style:{x:k},initial:{clipPath:`inset(100% 0% 0% 0%)`,scale:1.06},animate:ce?{clipPath:`inset(0% 0% 0% 0%)`,scale:1}:void 0,transition:$(g,ie.portrait,1.3)})}),se&&t.portrait&&(0,q.jsx)(`div`,{"aria-hidden":!0,className:`ea-layer ea-layer-portrait ea-layer-ink`,children:(0,q.jsx)(Z.img,{src:t.portrait.src,alt:``,width:t.portrait.width,height:t.portrait.height,decoding:`async`,className:`ea-portrait ea-ink-portrait`,style:{x:k}})})]}),(0,q.jsx)(du,{}),(0,q.jsxs)(Gl.Provider,{value:d,children:[n.messages.length>0&&(0,q.jsx)(gu,{}),e.length>0&&(0,q.jsx)(xu,{})]}),(0,q.jsx)(fu,{})]})})]})]})},Tu={width:`100%`},Eu=`/* Theme tokens of the block (its @theme), scoped to the component */
[data-slot='elias'],
.ea-hero {
  --color-ea-page: #f6f4f0;
  --color-ea-accent: #ff4829;
  --color-ea-ink: #171412;
  --color-ea-muted: #77716e;
  --color-ea-paper: #efe9df;

  --font-ea-display: 'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-ea-sans: 'Figtree', ui-sans-serif, system-ui, sans-serif;
  --font-ea-mono: 'IBM Plex Mono', ui-monospace, 'Courier New', monospace;
}

/* The utilities the block's @theme generated (bg-ea-page, text-ea-ink, font-ea-display, ...), defined here because the host's Tailwind does not know these tokens */
@layer utilities {
  .bg-ea-page {
    background-color: var(--color-ea-page);
  }
  .bg-ea-ink {
    background-color: var(--color-ea-ink);
  }
  .bg-ea-accent {
    background-color: var(--color-ea-accent);
  }
  .text-ea-page {
    color: var(--color-ea-page);
  }
  .text-ea-page\\/70 {
    color: color-mix(in oklab, var(--color-ea-page) 70%, transparent);
  }
  .text-ea-ink {
    color: var(--color-ea-ink);
  }
  .text-ea-accent {
    color: var(--color-ea-accent);
  }
  .text-ea-muted {
    color: var(--color-ea-muted);
  }
  .border-ea-accent {
    border-color: var(--color-ea-accent);
  }
  .ring-ea-page {
    --tw-ring-color: var(--color-ea-page);
  }
  .font-ea-display {
    font-family: var(--font-ea-display);
  }
  .font-ea-sans {
    font-family: var(--font-ea-sans);
  }
  .font-ea-mono {
    font-family: var(--font-ea-mono);
  }
}

/**
 * The navbar and the composition share one centred container with a 16, 24 then 40px gutter; the hero is the
 * size container they measure it from. On the wide composition the container fills the screen's width up to
 * 1440px (--ea-w) and the design scales with it; past that nothing grows and the extra space goes to the sides.
 */
.ea-hero {
  --ea-gutter: 16px;
  --ea-nav-h: 84px;
  --ea-w: min(100cqw - 2 * var(--ea-gutter), 1440px);
  container-type: inline-size;
  min-height: 100svh;
  overflow: clip;
}

@media (min-width: 640px) {
  .ea-hero {
    --ea-gutter: 24px;
  }
}

@media (min-width: 1024px) {
  .ea-hero {
    --ea-gutter: 40px;
  }
}

.ea-wrap {
  width: var(--ea-w);
  margin-inline: auto;
}

/**
 * Navbar below 1024px: the logo centred on the first row with the contact button at its right end, and the four
 * links spread across the second row with equal space between them (the two link lists dissolve into the grid,
 * which spaces its four columns evenly). From 1024px it becomes a single row.
 */
.ea-nav {
  container-type: inline-size;
  display: grid;
  grid-template-columns: repeat(4, auto);
  justify-content: space-between;
  align-items: center;
  row-gap: 6px;
  padding-block: 14px 6px;
}

.ea-nav-logo {
  grid-row: 1;
  grid-column: 1 / -1;
  justify-self: center;
}

.ea-nav-cta {
  grid-row: 1;
  grid-column: 1 / -1;
  justify-self: end;
}

.ea-nav-left,
.ea-nav-right {
  display: contents;
  white-space: nowrap;
}

.ea-nav-left > li,
.ea-nav-right > li {
  grid-row: 2;
}

/**
 * Below 1024px (phones and tablets) the contact button is its arrow disc alone; its label stays for screen
 * readers. On a desktop it shows the label beside the disc.
 */
@media (max-width: 1023px) {
  .ea-nav-cta .ea-cta {
    gap: 0;
    padding: 4px;
  }

  .ea-nav-cta .ea-cta-label {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
}

/* The note at the navbar's left edge: shown from 1024px, where it balances the contact button */
.ea-nav-status {
  display: none;
}

/* Rolling labels: the visible copy slides up and out as its twin slides up into place */
.ea-roll {
  position: relative;
  display: inline-block;
  overflow: hidden;
  line-height: 1.25;
}

.ea-roll > span {
  display: block;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.ea-roll > span + span {
  position: absolute;
  inset: 0;
  transform: translateY(100%);
}

@media (hover: hover) {
  .ea-nav-link:hover .ea-roll > span:first-child {
    transform: translateY(-100%);
  }

  .ea-nav-link:hover .ea-roll > span + span {
    transform: translateY(0);
  }
}

/* Menu type: medium capitals with open tracking; the current page is marked with a small orange dot */
.ea-nav-link {
  font-size: clamp(12px, 3.4vw, 13px);
  letter-spacing: 0.06em;
}

.ea-nav-link[aria-current='page']::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
}

.ea-nav-logo {
  font-size: 28px;
}

/**
 * From 640px the navbar is one row: the wordmark in the exact centre and the four links mirroring each other
 * around it with one equal gap (--ea-nav-gap); the contact button ends on the right edge. Type and spacing
 * follow the screen only within set limits, tighter on a tablet so everything fits on the row.
 */
@media (min-width: 640px) {
  .ea-nav {
    --ea-nav-u: calc(100cqw / 1280);
    --ea-nav-gap: clamp(16px, 2.6vw, 28px);
    grid-template-columns: 1fr auto 1fr;
    grid-template-areas: 'left logo right';
    justify-content: normal;
    height: var(--ea-nav-h);
    padding-block: 0;
  }

  .ea-nav-logo {
    grid-area: logo;
  }

  .ea-nav-left,
  .ea-nav-right {
    display: flex;
  }

  .ea-nav-left {
    grid-area: left;
    justify-self: end;
    gap: var(--ea-nav-gap);
    margin-right: var(--ea-nav-gap);
  }

  .ea-nav-right {
    grid-area: right;
    justify-self: start;
    gap: var(--ea-nav-gap);
    margin-left: var(--ea-nav-gap);
  }

  .ea-nav-cta {
    grid-area: right;
  }

  .ea-nav-link {
    font-size: clamp(13px, 14 * var(--ea-nav-u), 15px);
  }

  .ea-nav-logo {
    font-size: clamp(26px, 29 * var(--ea-nav-u), 32px);
  }
}

@media (min-width: 1024px) {
  .ea-nav {
    --ea-nav-gap: clamp(36px, 64 * var(--ea-nav-u), 80px);
  }
}

/* The navbar's status note needs the room a wider screen gives, so it appears from 1280px */
@media (min-width: 1280px) {
  .ea-nav-status {
    grid-area: left;
    justify-self: start;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: var(--color-ea-muted);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    white-space: nowrap;
  }

  /* A live dot: a soft ring breathes out from it, slowly, so it reads as present without pulling focus */
  .ea-nav-status-dot {
    position: relative;
    width: 7px;
    height: 7px;
    margin-right: 2px;
    border-radius: 50%;
    background: var(--color-ea-accent);
  }

  .ea-nav-status-dot::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: var(--color-ea-accent);
    animation: ea-breathe 2.4s cubic-bezier(0.16, 1, 0.3, 1) infinite;
  }
}

/**
 * The ink button (CONTACT and the letter's actions): an outlined pill with an orange arrow disc at its end. On
 * hover or keyboard focus a circle of ink grows out of the disc until it fills the pill, the label turns to
 * the page colour, and the arrow leaves its disc as a fresh one arrives from the other side.
 */
.ea-cta {
  --ea-cta-mark: 34px;
  position: relative;
  isolation: isolate;
  display: inline-flex;
  align-items: center;
  gap: 14px;
  height: 44px;
  padding-inline: 20px 5px;
  overflow: hidden;
  border: 1px solid rgb(23 20 18 / 0.4);
  border-radius: 999px;
  color: var(--color-ea-ink);
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  white-space: nowrap;
  transition:
    color 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

/* The ink starts as a dot at the disc's centre; scaled up 14 times it covers any of these pills */
.ea-cta::before {
  content: '';
  position: absolute;
  z-index: -1;
  top: 50%;
  right: calc(5px + var(--ea-cta-mark) / 2);
  width: var(--ea-cta-mark);
  height: var(--ea-cta-mark);
  margin: calc(var(--ea-cta-mark) / -2) calc(var(--ea-cta-mark) / -2) 0 0;
  border-radius: 50%;
  background: var(--color-ea-ink);
  transform: scale(0);
  transition: transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
}

.ea-cta-mark {
  position: relative;
  display: grid;
  place-items: center;
  width: var(--ea-cta-mark);
  height: var(--ea-cta-mark);
  overflow: hidden;
  border-radius: 50%;
  background: var(--color-ea-accent);
  color: var(--color-ea-page);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.ea-cta-arrow {
  position: absolute;
  width: 44%;
  height: 44%;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.ea-cta-arrow-in {
  transform: translateX(-160%);
}

.ea-cta-diagonal .ea-cta-arrow-in {
  transform: translate(-160%, 160%);
}

.ea-cta:disabled {
  opacity: 0.4;
}

@media (hover: hover) {
  .ea-cta:not(:disabled):hover {
    border-color: var(--color-ea-ink);
    color: var(--color-ea-page);
  }

  .ea-cta:not(:disabled):hover::before {
    transform: scale(14);
  }

  .ea-cta:not(:disabled):hover .ea-cta-mark {
    transform: scale(1.06);
  }

  .ea-cta:not(:disabled):hover .ea-cta-arrow-out {
    transform: translateX(160%);
  }

  .ea-cta-diagonal:not(:disabled):hover .ea-cta-arrow-out {
    transform: translate(160%, -160%);
  }

  .ea-cta:not(:disabled):hover .ea-cta-arrow-in {
    transform: translate(0, 0);
  }
}

.ea-cta:focus-visible {
  border-color: var(--color-ea-ink);
  color: var(--color-ea-page);
  outline: 2px solid var(--color-ea-accent);
  outline-offset: 3px;
}

.ea-cta:focus-visible::before {
  transform: scale(14);
}

/**
 * Phones and tablets: the name and portrait form one framed figure, the portrait standing on a sheet of paper;
 * the introduction, the writing pad, the book and the social links follow it
 */
.ea-stage {
  padding-block: 12px 40px;
}

.ea-canvas {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-template-areas:
    'figure'
    'intro'
    'pad'
    'book'
    'socials';
  row-gap: 40px;
}

.ea-figure {
  grid-area: figure;
  position: relative;
  container-type: inline-size;
}

/* The name and portrait layers only matter on the wide composition; on smaller screens they leave no box */
.ea-layer {
  display: contents;
}

/* The ink spotlight's twins: the name as outlined type, the portrait through the ink duotone filter */
.ea-ink-first,
.ea-ink-last {
  color: var(--color-ea-accent);
  filter: url(#ea-ink-outline);
}

.ea-ink-last {
  color: var(--color-ea-ink);
}

.ea-ink-portrait {
  filter: url(#ea-ink-duotone);
}

.ea-name {
  position: relative;
  display: flex;
  flex-direction: column;
  line-height: 0.8;
}

/* Set on each line, not the heading, so the em resolves against the giant size rather than 16px */
.ea-name-first,
.ea-name-last {
  letter-spacing: 0.02em;
}

/**
 * Each letter of the name is revealed inside a mask that hugs the capitals (overshoot included) rather than the
 * line box, so a letter in motion only ever shows within its own line and never crosses the other one
 */
.ea-name {
  --ea-mask-top: 0.015em;
  --ea-mask-bottom: 0.015em;
}

.ea-letter-mask {
  clip-path: inset(var(--ea-mask-top) -0.25em var(--ea-mask-bottom) -0.25em);
}

/**
 * Inter's capitals start 0.039em inside their box and MONROE's box ends 0.05em past its last stroke (its
 * trailing letter-spacing included), so the margins put the ink itself on the container edges
 */

.ea-name-first {
  font-size: 27.4cqw;
  margin-left: -0.039em;
}

.ea-name-last {
  align-self: flex-end;
  font-size: 22.3cqw;
  margin-right: -0.05em;
}

/* The paper the portrait stands on, where the composition's desk sits on a wide screen */
.ea-figure::after {
  content: '';
  display: block;
  width: 64cqw;
  height: 60cqw;
  margin: 3cqw 0 0 auto;
  border-radius: 10px 10px 0 0;
  background: var(--color-ea-paper);
}

.ea-portrait {
  position: absolute;
  z-index: 1;
  top: 9cqw;
  left: -3cqw;
  height: calc(100% - 9cqw);
  width: auto;
  max-width: none;
}

.ea-intro {
  grid-area: intro;
}

.ea-intro-roles {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75em;
  font-size: 11px;
  letter-spacing: 0.2em;
  margin-bottom: 14px;
}

.ea-intro-headline {
  font-size: 24px;
  line-height: 1.14;
  letter-spacing: -0.01em;
  margin-bottom: 22px;
}

.ea-intro-rule {
  width: 52px;
  height: 2px;
  margin-bottom: 22px;
}

.ea-intro-description {
  max-width: 260px;
  font-size: 15px;
  line-height: 1.55;
}

.ea-book {
  grid-area: book;
}

.ea-book-frame {
  position: relative;
  aspect-ratio: 324 / 207;
  border-radius: 10px;
  background: var(--color-ea-paper);
  container-type: size;
}

.ea-book-caption {
  margin-top: 12px;
}

.ea-socials {
  grid-area: socials;
}

@media (min-width: 640px) {
  .ea-canvas {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    grid-template-areas:
      'figure figure'
      'intro book'
      'pad pad'
      'socials socials';
    column-gap: 32px;
  }

  .ea-figure::after {
    height: 48cqw;
  }
}

/**
 * The letter to tomorrow. The area holds one view at a time: the letter sheet, the sealed envelope, the sent note,
 * the waiting envelope, or the opened letter. The sheet is the paper, tipped slightly as if just set down.
 */
.ea-pad {
  grid-area: pad;
  position: relative;
}

.ea-pad-inner {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 380px;
}

.ea-letter-sheet,
.ea-letter-envelope-view {
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
}

.ea-letter-sheet {
  padding: 24px 22px 18px;
  border-radius: 4px;
  background: #fbf9f5;
  box-shadow: 0 18px 40px -18px rgb(23 20 18 / 0.45);
}

.ea-letter-eyebrow {
  padding-right: 64px;
  color: var(--color-ea-muted);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
}

.ea-letter-stamp {
  position: absolute;
  top: 14px;
  right: 14px;
  display: grid;
  place-items: center;
  width: 76px;
  height: 76px;
  padding: 0 0 0 0.16em;
  border: 2px solid var(--color-ea-accent);
  border-radius: 50%;
  color: var(--color-ea-accent);
  font-size: 10.5px;
  font-weight: 700;
  line-height: 1.3;
  text-align: center;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  transform: rotate(12deg);
  transition:
    transform 0.45s cubic-bezier(0.16, 1, 0.3, 1),
    background-color 0.3s,
    color 0.3s,
    opacity 0.4s;
}

/* Dim while the letter is being typed, full once it is finished, and pressed flat in orange as it seals */
.ea-letter-stamp {
  opacity: 0.35;
}

.ea-letter-stamp.is-ready {
  opacity: 1;
}

.ea-letter-stamp.is-pressed {
  background: var(--color-ea-accent);
  color: var(--color-ea-page);
  transform: rotate(0deg) scale(0.86);
}

.ea-letter-greeting {
  display: block;
  margin-top: 20px;
  color: var(--color-ea-ink);
  font-family: var(--font-ea-mono);
  font-size: 17px;
}

.ea-letter-field {
  flex: 1;
  width: 100%;
  min-height: 84px;
  margin-top: 4px;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--color-ea-ink);
  caret-color: var(--color-ea-accent);
  font-family: var(--font-ea-mono);
  font-size: 17px;
  line-height: 1.65;
  resize: none;
  outline: none;
}

.ea-letter-read {
  white-space: pre-wrap;
}

/* The typewriter's caret: an orange block that blinks after the last typed character */
.ea-letter-caret {
  display: inline-block;
  width: 0.55em;
  height: 1.1em;
  margin-left: 2px;
  background: var(--color-ea-accent);
  vertical-align: -0.2em;
  animation: ea-caret 1s steps(2, jump-none) infinite;
}

@keyframes ea-caret {
  50% {
    opacity: 0;
  }
}

.ea-letter-meta {
  margin-top: auto;
  color: var(--color-ea-muted);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.ea-letter-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px 16px;
  margin-top: auto;
}

.ea-letter-row .ea-letter-meta {
  margin-top: 0;
}

/* The sealing view: its label above the envelope, both centred in the letter's space at every width */
.ea-letter-envelope-view {
  align-items: center;
  justify-content: center;
  gap: 18px;
  text-align: center;
}

/* The label here has no stamp to clear, so it drops the sheet's right inset and stays truly centred */
.ea-letter-envelope-view .ea-letter-eyebrow {
  padding-right: 0;
}

/**
 * The envelope from the back: paper body, two side folds and a bottom fold meeting under a top flap that is
 * hinged at the top edge. Sized in its own width (cqw) so the seal and postmark keep their proportions.
 */
.ea-envelope {
  position: relative;
  display: block;
  width: min(100%, 320px);
  aspect-ratio: 1.62;
  border-radius: 6px;
  background: #e6dccb;
  box-shadow:
    0 22px 40px -22px rgb(23 20 18 / 0.55),
    0 2px 6px -2px rgb(23 20 18 / 0.18);
  container-type: inline-size;
  perspective: 900px;
}

.ea-envelope > span {
  position: absolute;
}

/* The letter being packed: a folded sheet with a few typed lines, slid down behind the folds */
.ea-envelope-letter {
  inset: 6% 7% auto;
  height: 86%;
  border-radius: 3px;
  background:
    repeating-linear-gradient(to bottom, transparent 0 9cqw, rgb(23 20 18 / 0.22) 9cqw 9.6cqw) 12% 22% / 62% 40%
      no-repeat,
    #fbf9f5;
  box-shadow: 0 2px 6px rgb(23 20 18 / 0.15);
}

.ea-envelope-side {
  inset: 0;
  border-radius: 6px;
  background: #ece3d4;
}

.ea-envelope-left {
  clip-path: polygon(0 0, 52% 56%, 0 100%);
}

.ea-envelope-right {
  clip-path: polygon(100% 0, 48% 56%, 100% 100%);
}

.ea-envelope-bottom {
  inset: 0;
  border-radius: 6px;
  background: #f4eee4;
  clip-path: polygon(0 100%, 50% 47%, 100% 100%);
}

/* The flap's soft shadow comes from a filter on its wrapper, since a clip-path would cut a box-shadow off */
.ea-envelope-flap {
  inset: 0 0 auto;
  height: 60%;
  filter: drop-shadow(0 3px 3px rgb(23 20 18 / 0.18));
  transform-origin: top center;
}

.ea-envelope-flap-shape {
  position: absolute;
  inset: 0;
  border-radius: 6px 6px 0 0;
  background: linear-gradient(to bottom, #ddd0bb, #e3d7c4);
  clip-path: polygon(0 0, 100% 0, 50% 100%);
}

/* The wax seal, pressed where the flap's tip meets the folds: a slightly domed disc with a raised rim */
.ea-wax-seal {
  top: 60%;
  left: 50%;
  display: grid;
  place-items: center;
  width: 17cqw;
  aspect-ratio: 1;
  margin: -8.5cqw 0 0 -8.5cqw;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #ff7457, var(--color-ea-accent) 55%, #c9361c);
  box-shadow:
    0 3px 6px rgb(23 20 18 / 0.3),
    inset 0 0 0 0.9cqw rgb(255 255 255 / 0.16);
  color: rgb(246 244 240 / 0.9);
  font-size: 7.5cqw;
  font-weight: 900;
  line-height: 1;
}

/* A round postmark on the bottom fold, with cancellation bars running off to its left */
.ea-postmark {
  right: 7%;
  bottom: 9%;
  display: grid;
  place-items: center;
  align-content: center;
  width: 23cqw;
  aspect-ratio: 1;
  border: 0.5cqw solid var(--color-ea-accent);
  border-radius: 50%;
  color: var(--color-ea-accent);
  font-size: 2.6cqw;
  font-weight: 700;
  line-height: 1.35;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  opacity: 0.88;
}

.ea-postmark::before {
  content: '';
  position: absolute;
  inset: 7%;
  border: 0.25cqw solid currentColor;
  border-radius: 50%;
}

.ea-postmark::after {
  content: '';
  position: absolute;
  top: 30%;
  right: 100%;
  width: 26cqw;
  height: 40%;
  background: repeating-linear-gradient(to bottom, currentColor 0 0.4cqw, transparent 0.4cqw 2.2cqw);
  opacity: 0.7;
}

.ea-postmark-date {
  font-family: var(--font-ea-mono);
  font-weight: 400;
  letter-spacing: 0.04em;
}

/**
 * Landscape screens from 1024px: the design's composition, measured on a 1280px grid in units of --ea-u, so
 * it scales with the container (1.0625px at 1440, never more). The canvas fills the hero below the navbar.
 */
@media (min-width: 1024px) and (min-aspect-ratio: 5/4) {
  .ea-hero {
    display: grid;
    grid-template-rows: auto 1fr;
  }

  /**
   * Never shorter than the name, the introduction and the social links need at their smallest scale, so nothing
   * can collide; only a very short window scrolls
   */
  .ea-stage {
    position: relative;
    min-height: calc(var(--ea-w) * 621 / 1600 + 40px);
    padding: 0;
  }

  /**
   * --ea-slack is the height beyond the composition's minimum. A small share opens above the name and the rest
   * lengthens the portrait and the writing pad, which both run to the bottom edge. The portrait stops at
   * 738 units (784px at 1440, never under 640px); past that the name moves down so the head stays over ELIAS.
   */
  /**
   * --ea-u follows the width, but on a wide, short window it follows the height instead (the name, introduction
   * and social links need 621 units plus 40px), so the design still fits one screen while staying anchored to
   * both edges; it never drops below 80% of the width's unit
   */
  .ea-canvas {
    --ea-u: max(min(100cqw / 1280, (100cqh - 40px) / 621), 100cqw / 1600);
    --ea-slack: max(0px, 100cqh - 685 * var(--ea-u));
    --ea-head: calc(55 * var(--ea-u));
    --ea-portrait-max: max(738 * var(--ea-u), 640px);

    /* The portrait keeps its place against MONROE (which is set from the right edge), never nearer than 221px */
    --ea-portrait-left: max(100cqw - 1070 * var(--ea-u), 221px);
    --ea-top: max(10 * var(--ea-u) + var(--ea-slack) * 0.15, 100cqh - var(--ea-portrait-max) - var(--ea-head));
    --ea-portrait-h: min(100cqh - var(--ea-top) - var(--ea-head), var(--ea-portrait-max));
    /* The name's two lines: ELIAS's cap top, then MONROE's, then MONROE's baseline */
    --ea-last-top: calc(var(--ea-top) + 242 * var(--ea-u));
    --ea-last-base: calc(var(--ea-top) + 406 * var(--ea-u));
    position: absolute;
    inset: 0;
    display: block;
    container-type: size;
  }

  .ea-figure {
    display: contents;
  }

  /**
   * Each layer covers the composition exactly, so the twins inside it land on the same pixels as the originals.
   * The originals are masked to everything outside the spotlight and the twins to the inside. The twins reach
   * 1px past the originals' soft edge, so no seam of page shows between them; at a radius of 0 the originals
   * show whole and the twins not at all.
   */
  .ea-layer {
    position: absolute;
    inset: 0;
    display: block;
    pointer-events: none;
  }

  .ea-layer-name {
    z-index: 0;
  }

  .ea-layer-portrait {
    z-index: 2;
  }

  .ea-layer-base {
    --ea-spot: radial-gradient(
      circle var(--ea-spot-r, 0px) at var(--ea-spot-x, 0px) var(--ea-spot-y, 0px),
      transparent calc(var(--ea-spot-r, 0px) - 1px),
      #000 calc(var(--ea-spot-r, 0px) + 1px)
    );
    mask-image: var(--ea-spot);
    -webkit-mask-image: var(--ea-spot);
  }

  .ea-layer-ink {
    --ea-spot: radial-gradient(
      circle var(--ea-spot-r, 0px) at var(--ea-spot-x, 0px) var(--ea-spot-y, 0px),
      #000 calc(var(--ea-spot-r, 0px) + 1px),
      transparent calc(var(--ea-spot-r, 0px) + 2px)
    );
    mask-image: var(--ea-spot);
    -webkit-mask-image: var(--ea-spot);
  }

  /* At a line height of 1 the capitals sit 0.124em below the box top and end 0.124em above its bottom */
  .ea-name {
    --ea-mask-top: 0.115em;
    --ea-mask-bottom: 0.115em;
    position: static;
    display: block;
    line-height: 1;
  }

  /**
   * Placed by their cap tops (0.136em is the gap Inter leaves above a capital at a line height of 1): ELIAS
   * 220px tall and 881px wide, MONROE 164px tall and 1008px wide, with the ink on the container edges
   */
  .ea-name-first,
  .ea-name-last {
    position: absolute;
    white-space: nowrap;
  }

  .ea-name-first {
    top: calc(var(--ea-top) - 0.136em);
    left: -0.039em;
    margin: 0;
    font-size: calc(302 * var(--ea-u));
  }

  .ea-name-last {
    top: calc(var(--ea-last-top) - 0.136em);
    right: -0.05em;
    margin: 0;
    font-size: calc(225 * var(--ea-u));
  }

  .ea-figure::after {
    display: none;
  }

  /* Fills the space under MONROE, sharing the book's right edge; the letter inside runs off the bottom edge */
  .ea-pad {
    position: absolute;
    z-index: 1;
    top: calc(var(--ea-last-base) + 16 * var(--ea-u));
    left: calc(620 * var(--ea-u));
    width: calc(100% - 620 * var(--ea-u));
    height: calc(100% - var(--ea-last-base) - 16 * var(--ea-u));
  }

  /**
   * The letter starts clear of the portrait's coat, which reaches the full width of the cut-out (1072 of its
   * 1336px height) and drifts up to 14px with the cursor; the inset is measured from the portrait's real size
   */
  .ea-pad-inner {
    min-height: 0;
    padding: calc(14 * var(--ea-u)) calc(18 * var(--ea-u)) 0
      max(
        120 * var(--ea-u),
        var(--ea-portrait-left) + var(--ea-portrait-h) * 1072 / 1336 - 620 * var(--ea-u) + 14px + 24 * var(--ea-u)
      );
  }

  .ea-letter-sheet {
    padding: calc(24 * var(--ea-u)) calc(26 * var(--ea-u)) calc(18 * var(--ea-u));
    border-radius: 4px 4px 0 0;
  }

  .ea-letter-eyebrow,
  .ea-letter-meta {
    font-size: max(10px, 11 * var(--ea-u));
  }

  .ea-letter-stamp {
    top: calc(16 * var(--ea-u));
    right: calc(18 * var(--ea-u));
    width: max(64px, 78 * var(--ea-u));
    height: max(64px, 78 * var(--ea-u));
    font-size: max(9px, 10.5 * var(--ea-u));
  }

  .ea-letter-greeting {
    margin-top: calc(22 * var(--ea-u));
    font-size: max(14px, 18 * var(--ea-u));
  }

  .ea-letter-field {
    min-height: 0;
    font-size: max(14px, 18 * var(--ea-u));
  }

  .ea-envelope {
    width: min(100%, 330 * var(--ea-u));
  }

  /**
   * Stands on the bottom edge with the top of its head 55px under the top of ELIAS. Its left edge stays put as
   * it grows, never nearer than 221px, so the coat clears the social links and leaves MONROE's M readable
   */
  .ea-portrait {
    z-index: 2;
    top: calc(100% - var(--ea-portrait-h));
    left: var(--ea-portrait-left);
    height: var(--ea-portrait-h);
  }

  .ea-intro {
    position: absolute;
    z-index: 3;
    top: calc(var(--ea-last-top) + 44 * var(--ea-u));
    left: 0;
    width: calc(250 * var(--ea-u));
  }

  /* Spacing grows down the stack: label to heading, then heading to rule and rule to description */
  .ea-intro-roles {
    gap: 0.4em 0.55em;
    font-size: max(10px, 11 * var(--ea-u));
    letter-spacing: 0.15em;
    margin-bottom: calc(18 * var(--ea-u));
  }

  .ea-intro-headline {
    font-size: max(19px, 26 * var(--ea-u));
    line-height: 1.12;
    margin-bottom: calc(26 * var(--ea-u));
  }

  .ea-intro-rule {
    width: calc(52 * var(--ea-u));
    margin-bottom: calc(26 * var(--ea-u));
  }

  .ea-intro-description {
    max-width: calc(240 * var(--ea-u));
    font-size: max(14px, 15.5 * var(--ea-u));
    line-height: 1.6;
    text-wrap: pretty;
  }

  /* Its image spans ELIAS's upper 200px and its caption ends just above MONROE */
  .ea-book {
    position: absolute;
    z-index: 1;
    top: var(--ea-top);
    right: 0;
    width: calc(344 * var(--ea-u));
  }

  .ea-book-frame {
    border-radius: calc(12 * var(--ea-u));
  }

  .ea-book-frame {
    height: calc(200 * var(--ea-u));
    aspect-ratio: auto;
  }

  .ea-book-caption {
    gap: calc(10 * var(--ea-u));
    margin-top: calc(8 * var(--ea-u));
  }

  .ea-book-label {
    font-size: max(12px, 14 * var(--ea-u));
  }

  .ea-book-topics {
    font-size: max(11px, 12.5 * var(--ea-u));
  }

  .ea-socials {
    position: absolute;
    z-index: 3;
    font-size: max(13px, 13 * var(--ea-u));

    /* Near the bottom edge, or just under the introduction when the screen is too short for that */
    top: max(var(--ea-last-top) + 44 * var(--ea-u) + max(305 * var(--ea-u), 280px), 100% - 78 * var(--ea-u) - 40px);
    left: 0;
  }
}

/**
 * Hover feedback, only where the device can hover: a hairline drawn in from the left and wiped out to the
 * right, the contact button filling with ink from below, and the book's arrow swapping for a fresh one
 */
.ea-link {
  position: relative;
}

/**
 * The book's arrow is the CONTACT disc at a smaller size, shrinking with the composition on a smaller desktop
 * so the caption always clears the top of MONROE (--ea-u exists only there; elsewhere it stays 28px)
 */
.ea-book-arrow .ea-cta-mark {
  --ea-cta-mark: clamp(22px, 28 * var(--ea-u, 1px), 28px);
}

@media (hover: hover) {
  .ea-link::after {
    content: '';
    position: absolute;
    inset-inline: 0;
    bottom: calc(50% - 0.95em);
    height: 1px;
    background: currentColor;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .ea-link:hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }

  .ea-book:hover .ea-book-arrow .ea-cta-arrow-out {
    transform: translate(160%, -160%);
  }

  .ea-book:hover .ea-book-arrow .ea-cta-arrow-in {
    transform: translate(0, 0);
  }
}

/* The splash's name fills most of the width but never grows past its 1440 size, and keeps clear of the edges */
.ea-splash-name {
  width: min(88vw, 130svh);
  max-height: 70%;
  height: auto;
  overflow: visible;
}

/* With reduced motion the splash never shows, even for the moment before the script decides to skip it */
@media (prefers-reduced-motion: reduce) {
  .ea-splash {
    display: none;
  }
}

/* The custom cursor stands in for the system one everywhere in the hero, links and the splash included */
.ea-has-cursor,
.ea-has-cursor * {
  cursor: none;
}

/**
 * The code-built hardcover, sized from its frame (cqh) so it keeps its proportion at every width. It is a box:
 * back, page edges, orange spine, the first page, and a cover hinged on its left edge so it can swing open.
 */
/**
 * Holds one book while it slides in or out, so the book's own turning and opening stay independent of the swap.
 * Each fills the card, so the leaving and arriving books share the same place as they pass.
 */
.ea-book-slot {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  transform-style: preserve-3d;
}

/* Left-aligned like a printed page, rather than centred like the button the book sits in */
.ea-book-stage {
  position: absolute;
  inset: 0;
  text-align: left;
  display: grid;
  place-items: center;
  perspective: 900px;
}

.ea-book-shadow {
  position: absolute;
  bottom: 9cqh;
  width: 46cqh;
  height: 7cqh;
  border-radius: 50%;
  background: radial-gradient(closest-side, rgb(23 20 18 / 0.35), transparent);
  filter: blur(4px);
}

.ea-book-3d {
  --ea-book-depth: 9cqh;
  position: relative;
  display: block;
  height: 74cqh;
  aspect-ratio: 0.72;
  transform-style: preserve-3d;
}

.ea-book-3d > span {
  position: absolute;
}

.ea-book-back {
  display: block;
  inset: 0;
  border-radius: 2px 5px 5px 2px;
  background: color-mix(in srgb, var(--ea-cover, #171412) 78%, black);
  transform: translateZ(calc(var(--ea-book-depth) / -2));
}

/* The page block's fore-edge, finely ruled like stacked leaves */
.ea-book-edge {
  display: block;
  top: 2%;
  right: 0;
  width: var(--ea-book-depth);
  height: 96%;
  background: repeating-linear-gradient(to right, #f3eee6 0 1.5px, #ddd5c8 1.5px 2.5px);
  transform: translateX(50%) rotateY(90deg);
}

.ea-book-spine {
  top: 0;
  left: 0;
  width: var(--ea-book-depth);
  height: 100%;
  display: grid;
  place-items: center;
  overflow: hidden;
  background: var(--ea-spine, var(--color-ea-accent));
  transform: translateX(-50%) rotateY(-90deg);
}

.ea-book-spine > span {
  color: var(--ea-cover-type, var(--color-ea-ink));
  font-size: 3.4cqh;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  white-space: nowrap;
  transform: rotate(90deg);
}

.ea-book-page {
  inset: 2% 3% 2% 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2.5cqh;
  padding: 0 10% 0 14%;
  background: linear-gradient(to right, rgb(23 20 18 / 0.12), transparent 14%), #fbf9f5;
  transform: translateZ(calc(var(--ea-book-depth) / 2 - 2px));
}

.ea-book-page-chapter {
  color: var(--color-ea-accent);
  font-size: 3cqh;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.ea-book-page-text {
  color: #2a2522;
  font-size: 3.8cqh;
  line-height: 1.5;
}

.ea-book-folio {
  position: absolute;
  bottom: 6%;
  left: 0;
  right: 0;
  color: var(--color-ea-muted);
  font-size: 3cqh;
  text-align: center;
}

/* Motion writes the cover's whole transform as it swings, so the front-face depth lives on this wrapper */
.ea-book-hinge {
  inset: 0;
  transform: translateZ(calc(var(--ea-book-depth) / 2));
  transform-style: preserve-3d;
}

.ea-book-cover {
  position: absolute;
  inset: 0;
  transform-origin: left center;
  transform-style: preserve-3d;
}

/* The cover's two faces: the dark front, and the inside that faces the reader once the cover has swung over */
.ea-book-cover-front,
.ea-book-cover-inside {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  backface-visibility: hidden;
}

.ea-book-cover-front {
  justify-content: space-between;
  padding: 11% 10% 9%;
  border-radius: 2px 5px 5px 2px;
  overflow: hidden;
  background: var(--ea-cover, var(--color-ea-ink));
  color: var(--ea-cover-type, var(--color-ea-page));
  box-shadow: inset 3px 0 0 rgb(255 255 255 / 0.25);
}

.ea-book-cover-inside {
  justify-content: center;
  gap: 2.5cqh;
  padding: 0 12%;
  border-radius: 5px 2px 2px 5px;
  background: linear-gradient(to left, rgb(23 20 18 / 0.12), transparent 14%), #fbf9f5;
  transform: rotateY(180deg);
}

.ea-book-inside-title {
  color: var(--color-ea-ink);
  font-size: 8cqh;
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.ea-book-title {
  font-size: 9.6cqh;
  font-weight: 900;
  line-height: 0.92;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.ea-book-byline {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  font-size: 2.8cqh;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

/* The cover's pastel illustration fills the board behind the title and byline */
.ea-book-art {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit;
}

.ea-book-title,
.ea-book-byline {
  position: relative;
}

@keyframes ea-breathe {
  0% {
    opacity: 0.55;
    transform: scale(1);
  }

  70%,
  100% {
    opacity: 0;
    transform: scale(3);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ea-nav-status-dot::after,
  .ea-letter-caret {
    animation: none;
  }
}
`,Du=({brand:e={name:``,href:`#`},navLinks:t={left:[],right:[]},navCta:n,navStatus:r={label:``,detail:``},name:i={first:``,last:``},intro:a={roles:[],headline:[],description:``},portrait:o,books:s=[],bookCard:c={href:`#`,open:`Open`,close:`Close and show the next book`,folio:`1`},letter:l,socialLinks:u=[],motion:d,splash:f,reducedMotion:p,className:m})=>{let h={BRAND:e,NAV_LINKS:t,NAV_CTA:n,NAV_STATUS:r,NAME:i,INTRO:a,IMAGES:{portrait:o},BOOKS:s,BOOK_CARD:c,LETTER:l??Bl,SOCIAL_LINKS:u,MOTION:{...Ll,...d,delays:{...Ll.delays,...d?.delays},depth:{...Ll.depth,...d?.depth},letter:{...Ll.letter,...d?.letter},spotlight:{...Ll.spotlight,...d?.spotlight},cursor:{...Ll.cursor,...d?.cursor}},SPLASH:{...Rl,...f},REDUCED:p};return(0,q.jsx)(Vl.Provider,{value:h,children:(0,q.jsxs)(Qs,{features:Zc,children:[(0,q.jsx)(`style`,{children:Eu}),(0,q.jsx)(`main`,{"data-slot":`elias`,className:Fl(`bg-ea-page`,m),style:Tu,children:(0,q.jsx)(wu,{})})]})})};export{Du as Elias,Du as default};