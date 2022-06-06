/* form-elements 
   0.0.2
   By Stephen Band
   Built 2022-06-06 20:40 */

var kt=Object.defineProperty;var J=Object.getOwnPropertySymbols;var Ct=Object.prototype.hasOwnProperty,Pt=Object.prototype.propertyIsEnumerable;var W=(t,e)=>{var n={};for(var r in t)Ct.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&J)for(var r of J(t))e.indexOf(r)<0&&Pt.call(t,r)&&(n[r]=t[r]);return n};var tt=(t,e)=>{for(var n in e)kt(t,n,{get:e[n],enumerable:!0})};function N(t){return t}function g(t,e){return function(){let r=t.apply(this,arguments),o=e[r]||e.default;if(!o)throw new Error('overload() no handler for "'+r+'"');return o.apply(this,arguments)}}function k(t){var e=new Map;return function(r){if(e.has(r))return e.get(r);var o=t(r);return e.set(r,o),o}}var St=Array.prototype;function Ht(t,e){return typeof t=="function"?t.apply(null,e):t}function et(t,e,n){n=n||t.length;var r=n===1?e?t:k(t):k(function(o){return et(function(){var i=[o];return i.push.apply(i,arguments),t.apply(null,i)},e,n-1)});return function o(i){return arguments.length===0?o:arguments.length===1?r(i):arguments.length>=n?t.apply(null,arguments):Ht(r(i),St.slice.call(arguments,1))}}var m=et;function f(){}var Ot=g(N,{is:f,tag:f,html:function(t,e,n){e.innerHTML=n},text:function(t,e,n){e.textContent=n},children:function(t,e,n){e.innerHTML="",e.append.apply(e,n)},points:T,cx:T,cy:T,r:T,preserveAspectRatio:T,viewBox:T,default:function(t,e,n){t in e?e[t]=n:e.setAttribute(t,n)}});function T(t,e,n){e.setAttribute(t,n)}function It(t,e){for(var n=Object.keys(e),r=n.length;r--;)Ot(n[r],t,e[n[r]]);return t}var C=m(It,!0);var B="http://www.w3.org/2000/svg",nt=document.createElement("div"),V=(t,e)=>e&&typeof e;function rt(t,e){let n=document.createRange();return n.selectNode(t),n.createContextualFragment(e)}var x=g(V,{string:function(t,e){let n=document.createElementNS(B,t);return n.innerHTML=e,n},object:function(t,e){let n=document.createElementNS(B,t);return typeof e.length=="number"?n.append.apply(n,e):C(n,e),n},default:t=>document.createElementNS(B,t)}),Bt=g(V,{string:function(t,e){let n=document.createElement(t);return n.innerHTML=e,n},object:function(t,e){let n=document.createElement(t);return typeof e.length=="number"?n.append.apply(n,e):C(n,e),n},default:t=>document.createElement(t)}),Vt=g(N,{comment:function(t,e){return document.createComment(e||"")},fragment:g(V,{string:function(t,e,n){if(n)return rt(n,e);let r=document.createDocumentFragment();nt.innerHTML=e;let o=nt.childNodes;for(;o[0];)r.appendChild(o[0]);return r},object:function(t,e,n){let r=n?rt(n):document.createDocumentFragment();return typeof e.length=="number"?r.append.apply(r,e):C(r,e),r},default:()=>document.createDocumentFragment()}),text:function(t,e){return document.createTextNode(e||"")},circle:x,ellipse:x,g:x,glyph:x,image:x,line:x,rect:x,use:x,path:x,pattern:x,polygon:x,polyline:x,svg:x,default:Bt}),w=Vt;function G(t,e,n){let r;typeof n!="string"&&n.input!==void 0&&n.index!==void 0&&(r=n,n=r.input.slice(n.index+n[0].length+(n.consumed||0)));let o=t.exec(n);if(!o)return;let i=e(o);return r&&(r.consumed=(r.consumed||0)+o.index+o[0].length+(o.consumed||0)),i}var Qe=m(G,!0);function Gt(t,e,n){throw n.input!==void 0&&n.index!==void 0&&(n=n.input),new Error('Cannot parse string "'+(n.length>128?n.length.slice(0,128)+"…":n)+'"')}function Dt(t,e,n){let r=-1;for(;++r<n.length;)e=n[r]!==void 0&&t[r]?t[r](e,n):e;return t.done?t.done(e,n):t.close?t.close(e,n):e}function Rt(t,e,n,r){let o=G(t,i=>Dt(e,n,i),r);return o===void 0?e.catch?e.catch(n,r):Gt(t,e,r):o}var ot=m(Rt,!0);var D=f;var y=Symbol("internals"),M=Symbol("shadow"),it=Object.defineProperties,jt={a:HTMLAnchorElement,dl:HTMLDListElement,p:HTMLParagraphElement,br:HTMLBRElement,fieldset:HTMLFieldSetElement,hr:HTMLHRElement,img:HTMLImageElement,li:HTMLLIElement,ol:HTMLOListElement,optgroup:HTMLOptGroupElement,q:HTMLQuoteElement,textarea:HTMLTextAreaElement,td:HTMLTableCellElement,th:HTMLTableCellElement,tr:HTMLTableRowElement,tbody:HTMLTableSectionElement,thead:HTMLTableSectionElement,tfoot:HTMLTableSectionElement,ul:HTMLUListElement},zt={name:{set:function(t){return this.setAttribute("name",t)},get:function(){return this.getAttribute("name")||""}},form:{get:function(){return this[y].form}},labels:{get:function(){return this[y].labels}},validity:{get:function(){return this[y].validity}},validationMessage:{get:function(){return this[y].validationMessage}},willValidate:{get:function(){return this[y].willValidate}},checkValidity:{value:function(){return this[y].checkValidity()}},reportValidity:{value:function(){return this[y].reportValidity()}}},Ut={},ut={once:!0},$t=0,at=!1;function Xt(t){return jt[t]||window["HTML"+t[0].toUpperCase()+t.slice(1)+"Element"]||(()=>{throw new Error('Constructor not found for tag "'+t+'"')})()}var qt=ot(/^\s*<?([a-z][\w]*-[\w]+)>?\s*$|^\s*<?([a-z][\w]*)\s+is=["']?([a-z][\w]*-[\w]+)["']?>?\s*$/,{1:(t,e)=>({name:e[1]}),2:(t,e)=>({name:e[3],tag:e[2]}),catch:function(t,e){throw new SyntaxError(`dom element() – name must be of the form 'element-name' or 'tag is="element-name"' (`+e+")")}},null);function Zt(t,e){if(t.hasOwnProperty(e)){let n=t[e];delete t[e],t[e]=n}return t}function Kt(t,e,n){t._initialLoad=!0;let r=t.attachShadow({mode:e.mode||"closed",delegatesFocus:e.focusable||!1});if(n){let o=w("link",{rel:"stylesheet",href:n});r.append(o)}return t[M]=r,r}function Qt(t){var e;if(t.attachInternals){if(e=t.attachInternals(),e.setFormValue)return e}else e={shadowRoot:t.shadowRoot};return e.input=w("input",{type:"hidden",name:t.name}),t.appendChild(e.input),e.setFormValue=function(n){this.input.value=n},e}function Yt(t){t._initialAttributes={},t._n=0}function Jt(t,e,n){let r=t._initialAttributes;for(;t._n<e.length&&r[e[t._n]]!==void 0;)n[e[t._n]].call(t,r[e[t._n]]),++t._n}function st(t,e,n){if(!t._initialAttributes)return;let r=t._initialAttributes;for(;t._n<e.length;)r[e[t._n]]!==void 0&&n[e[t._n]]&&n[e[t._n]].call(t,r[e[t._n]]),++t._n;delete t._initialAttributes,delete t._n}function Wt(t){return!!t.attribute}function te(t){return t.set||t.get||t.hasOwnProperty("value")}function ct(t,e){return Wt(e[1])&&(t.attributes[e[0]]=e[1].attribute),te(e[1])&&(t.properties[e[0]]=e[1]),t}function R(t,e,n,r){let{name:o,tag:i}=qt(t),p=typeof i=="string"?Xt(i):HTMLElement,{attributes:l,properties:a}=n?Object.entries(n).reduce(ct,{attributes:{},properties:{}}):e.properties?Object.entries(e.properties).reduce(ct,{attributes:{},properties:{}}):Ut;function s(){let u=Reflect.construct(p,arguments,s),c=e.construct&&e.construct.length>$t?Kt(u,e,r||e.stylesheet):void 0,b=s.formAssociated&&Qt(u);return i&&(at=!0),e.construct&&e.construct.call(u,c,b),l&&(Yt(u),Promise.resolve(1).then(function(){st(u,s.observedAttributes,l)})),a&&Object.keys(a).reduce(Zt,u),u}return s.prototype=Object.create(p.prototype,a),a&&a.value&&(s.formAssociated=!0,it(s.prototype,zt),(e.enable||e.disable)&&(s.prototype.formDisabledCallback=function(u){return u?e.disable&&e.disable.call(this,this[M],this[y]):e.enable&&e.enable.call(this,this[M],this[y])}),e.reset&&(s.prototype.formResetCallback=function(){return e.reset.call(this,this[M],this[y])}),e.restore&&(s.prototype.formStateRestoreCallback=function(){return e.restore.call(this,this[M],this[y])})),l&&(s.observedAttributes=Object.keys(l),s.prototype.attributeChangedCallback=function(u,c,b){if(!this._initialAttributes)return l[u].call(this,b);this._initialAttributes[u]=b,Jt(this,s.observedAttributes,l)}),s.prototype.connectedCallback=function(){let u=this,c=u[M],b=u[y];if(u._initialAttributes&&st(u,s.observedAttributes,l),u._initialLoad){let E=c.querySelectorAll('link[rel="stylesheet"]');if(E.length){let L=0,I=E.length,Y=function(_t){++L>=E.length&&(delete u._initialLoad,e.load&&(D("element()","loaded",Array.from(E).map(Lt=>Lt.href).join(`
`)),e.load.call(u,c)))},Tt=Y;for(;I--;)E[I].addEventListener("load",Y,ut),E[I].addEventListener("error",Tt,ut);e.connect&&e.connect.call(this,c,b)}else e.connect&&e.connect.call(this,c,b),e.load&&e.load.call(this,c,b)}else e.connect&&e.connect.call(this,c,b)},e.disconnect&&(s.prototype.disconnectedCallback=function(){return e.disconnect.call(this,this[M],this[y])}),D("element()","<"+(i?i+" is="+o:o)+">"),window.customElements.define(o,s,i&&{extends:i}),i&&!at&&document.querySelectorAll('[is="'+o+'"]').forEach(u=>{n&&it(u,n),e.construct&&e.construct.apply(u);let c;for(c in l){let b=u.attributes[c];b&&l[c].call(u,b.value)}e.connect&&e.connect.apply(u)}),s}var j=Symbol("privates");function d(t){return t[j]||Object.defineProperty(t,j,{value:{}})[j]}function z(t,e,n){return n>e?e:n<t?t:n}var ln=m(z);var ee=Object.assign,_={bubbles:!0,cancelable:!0};function ne(t,e){var s;let n=_,r,o,i,p,l,a;return typeof t=="object"?(s=t,{type:t,detail:o,bubbles:i,cancelable:p,composed:l}=s,r=W(s,["type","detail","bubbles","cancelable","composed"]),a=ee(new CustomEvent(t,{detail:o,bubbles:i||_.bubbles,cancelable:p||_.cancelable,composed:l||_.composed}),r)):a=new CustomEvent(t,_),e.dispatchEvent(a)}var lt=m(ne,!0);var re=.9965784284662086;function P(t){return 20*Math.log10(t)*re}function U(t){return Math.pow(2,t/6)}function S(t){return t.replace(/-(\w)?/g,function(e,n){return n?n.toUpperCase():""})}var q={};tt(q,{cubic:()=>ce,cubicBezier:()=>fe,linear:()=>v,linearLogarithmic:()=>pe,logarithmic:()=>le,quadratic:()=>se});var $=!1,pt={any:f,array:t=>Array.isArray(t),"array-like":t=>typeof t.length=="number",boolean:t=>typeof t=="boolean",date:t=>t instanceof Date&&!Number.isNaN(t.getTime()),error:t=>t instanceof Error,function:t=>typeof t=="function",int:t=>Number.isInteger(t)&&Number.MIN_SAFE_INTEGER<=t&&Number.MAX_SAFE_INTEGER>=t,"int<0":t=>Number.isInteger(t)&&Number.MIN_SAFE_INTEGER<=t&&Number.MAX_SAFE_INTEGER>=t&&t<0,"int<=0":t=>Number.isInteger(t)&&Number.MIN_SAFE_INTEGER<=t&&Number.MAX_SAFE_INTEGER>=t&&t<=0,"int>0":t=>Number.isInteger(t)&&Number.MIN_SAFE_INTEGER<=t&&Number.MAX_SAFE_INTEGER>=t&&t>0,"int>=0":t=>Number.isInteger(t)&&Number.MIN_SAFE_INTEGER<=t&&Number.MAX_SAFE_INTEGER>=t&&t>=0,number:t=>typeof t=="number"&&!Number.isNaN(t),"number<0":t=>typeof t=="number"&&t<0,"number<=0":t=>typeof t=="number"&&t<=0,"number>0":t=>typeof t=="number"&&t>0,"number>=0":t=>typeof t=="number"&&t>=0,object:t=>!!t&&typeof t=="object",regexp:t=>t instanceof RegExp,symbol:t=>typeof t=="symbol",null:t=>t===null},ft=$?function(e,n,r){if(!pt[e]){if(/^[A-Z]/.test(e)){if(n.constructor.name===e)return;throw new Error(r||'value not of type "'+e+'": '+n)}throw new Error('Type "'+e+'" not recognised')}if(!pt[e](n))throw new Error(r||'value not of type "'+e+'": '+n)}:f,oe=$?function(e,n){Object.entries(e).forEach(([r,o])=>ft(o,n[r],r+' not of type "'+o+'" ('+n[r]+")"))}:f,h=$?function(e,n,r,o){var i=e.split(/\s*[=-]>\s*/),p=i[0].split(/\s*,\s*/),l=i[1];return function(){oe(p,arguments);let a=n.apply(this,arguments);return ft(l,a,'return value not of type "'+l+'": '+a),a}}:function(e,n){return n};function X(t,e,n,r){return((t*r+e)*r+n)*r}function ie(t,e,n,r){return(3*t*r+2*e)*r+n}function ue(t,e,n,r,o){var i,p,l,a=r;for(l=0;l<8;l++){if(i=X(t,e,n,a)-r,Math.abs(i)<o)return a;if(p=ie(t,e,n,a),Math.abs(p)<1e-6)break;a=a-i/p}var s=0,u=1;if(a=r,a<s)return s;if(a>u)return u;for(;s<u;){if(i=X(t,e,n,a),Math.abs(i-r)<o)return a;r>i?s=a:u=a,a=(u-s)*.5+s}return a}function ae(t,e,n,r){var o=1/(200*n),i=3*t[0],p=3*(e[0]-t[0])-i,l=1-i-p,a=3*t[1],s=3*(e[1]-t[1])-a,u=1-a-s,c=ue(l,p,i,r,o);return X(u,s,a,c)}var H=m(ae,!0,4);var v=h("Number, Number, Number => Number",(t,e,n)=>(n-t)/(e-t)),se=h("Number, Number, Number => Number",(t,e,n)=>Math.pow((n-t)/(e-t),1/2)),ce=h("Number, Number, Number => Number",(t,e,n)=>Math.pow((n-t)/(e-t),1/3)),le=h("PositiveNumber, PositiveNumber, NonNegativeNumber => Number",(t,e,n)=>Math.log(n/t)/Math.log(e/t)),pe=h("PositiveNumber, PositiveNumber, NonNegativeNumber => Number",(t,e,n)=>n<=t?n/t/9:.1111111111111111+Math.log(n/t)/Math.log(e/t)/1.125),fe=h("Object, Object, Number => Number",(t,e,n)=>H({0:v(t.point[0],e.point[0],t.handle[0]),1:v(t.point[0],e.point[0],t.handle[0])},{0:v(t.point[0],e.point[0],e.handle[0]),1:v(t.point[0],e.point[0],e.handle[0])},1,v(t.point[0],e.point[0],n)));var Z={};tt(Z,{cubic:()=>de,cubicBezier:()=>ge,linear:()=>mt,linearLogarithmic:()=>be,logarithmic:()=>he,quadratic:()=>me,tanh:()=>xe});var mt=h("Number, Number, Number => Number",(t,e,n)=>n*(e-t)+t),me=h("Number, Number, Number => Number",(t,e,n)=>Math.pow(n,2)*(e-t)+t),de=h("Number, Number, Number => Number",(t,e,n)=>Math.pow(n,3)*(e-t)+t),he=h("PositiveNumber, PositiveNumber, Number => Number",(t,e,n)=>t*Math.pow(e/t,n)),be=h("PositiveNumber, PositiveNumber, Number => Number",(t,e,n)=>n<=.1111111111111111?n*9*t:t*Math.pow(e/t,(n-.1111111111111111)*1.125)),ge=h("Object, Object, Number => Number",(t,e,n)=>mt(t.point[1],e.point[1],H({0:v(t.point[0],e.point[0],t.handle[0]),1:v(t.point[1],e.point[1],t.handle[1])},{0:v(t.point[0],e.point[0],e.handle[0]),1:v(t.point[1],e.point[1],e.handle[1])},1,n))),xe=h("Number, Number, Number => Number",(t,e,n)=>(Math.tanh(n)/2+.5)*(e-t)+t);function K(t,e,n,r){return Z[S(t)](n,r,e)}function A(t,e,n,r){return q[S(t)](n,r,e)}function we(t,e){return e<.001?(e*1e3).toFixed(2):e<1?(e*1e3).toPrecision(3):e>1e3?(e/1e3).toPrecision(3):e.toPrecision(3)}var ht=g(N,{pan:function(t,e){return e===-1?"-1.00":e===0?"0.00":e===1?"1.00":e.toFixed(2)},dB:function(t,e){let n=P(e);return isFinite(n)?n<-1?n.toPrecision(3):n.toFixed(2):n<0?"-∞":"∞"},Hz:function(t,e){return e<1?e.toFixed(2):e>1e3?(e/1e3).toPrecision(3):e.toPrecision(3)},semitone:function(t,e){return e===0?"0":e<0?"♭"+(-e/100).toFixed(2):"♯"+(e/100).toFixed(2)},s:we,bpm:function(t,e){let n=e*60;return n<100?n.toFixed(1):n.toFixed(0)},int:function(t,e){return Math.round(e)},default:function(t,e){return e<.1?e.toFixed(3):e<999.5?e.toPrecision(3):e.toFixed(0)}});function ye(t,e){return e<1?(e*1e3).toFixed(0):e<10?e.toFixed(1):e<1e3?e.toPrecision(1):(e/1e3).toPrecision(1)+"k"}var bt=g(N,{pan:function(t,e){return e===-1?"left":e===0?"centre":e===1?"right":e.toFixed(1)},dB:function(t,e){let n=P(e);return isFinite(n)?n.toFixed(0):n<0?"-∞":"∞"},Hz:function(t,e){return e<10?e.toFixed(1):e<1e3?e.toFixed(0):(e/1e3).toFixed(0)+"k"},semitone:function(t,e){return(e/100).toFixed(0)},s:ye,default:function(t,e){return(e<99.5?e.toPrecision(3):e.toFixed(0)).replace(/(\d+)(\.\d*?)0+$/,(n,r,o)=>r+(o.length>1?o:""))}});function Ee(t,e){return e>1e3?"k"+t:t}function Ne(t,e){return e<1?"m"+t:e>1e3?"k"+t:t}function dt(){return""}var gt=g(N,{pan:dt,dB:N,Hz:Ee,semitone:dt,s:Ne,int:()=>"",default:function(t,e){return t||""}});function F(t){if(!t)return 0;let e=+t;if(e||e===0)return e;let n=/^(-?[\d.]+)(?:(db|bpm)|(m|k)?(\w+))$/.exec(t.toLowerCase());if(!n)return 0;let r=parseFloat(n[1]);return n[2]==="dB"?U(r):n[2]==="bpm"?r/60:n[3]==="m"?r/1e3:n[3]==="k"?r*1e3:r}function xt(t){let e=t.target.closest("button");if(console.log("YEAH"),!e)return;let n=parseFloat(e.value),r=K(this.data.law,n,this.data.min,this.data.max);this.element.value=r,lt("input",this.element)}function ve(t){let e=parseFloat(t.target.value),n=K(this.data.law,e,this.data.min,this.data.max);this.element.value=n,this.data.steps&&(t.target.value=this.data.unitValue)}var wt=g(t=>t.type,{touchstart:xt,mousedown:xt,input:ve});var Ae=Object.assign;var Me=import.meta.url.replace(/\/[^\/]*([?#].*)?$/,"/"),Te={law:"linear",min:0,max:1};function Fe(t,e){let n=w("link",{rel:"stylesheet",href:Me+"module.css"}),r=w("style",":host {}"),o=w("label",{for:"input",html:"<slot></slot>",part:"label"}),i=w("input",{type:"range",id:"input",name:"unit-value",min:"0",max:"1",step:"any"}),p=w("text"),l=w("abbr"),a=w("output",{children:[p,l],part:"output"}),s=w("text","");e.appendChild(n),e.appendChild(r),e.appendChild(o),e.appendChild(i),e.appendChild(a),e.appendChild(s);let u=r.sheet.cssRules[0].style;return{unitValue:function(c){i.value!==c+""&&(i.value=c+""),u.setProperty("--unit-value",c)},unitZero:function(c){u.setProperty("--unit-zero",c)},displayValue:function(c){p.textContent=c,u.setProperty("--display-value",c)},displayUnit:function(c){c?(l.parentNode||a.appendChild(l),l.textContent=c):l.parentNode&&l.remove()},ticks:function(c){return function(b){c.forEach(E=>E.remove()),c.length=0,b.forEach(function(E){let L=w("button",{type:"button",name:"unit-value",value:E.unitValue,style:"--tick-value: "+E.unitValue+";",text:E.displayValue,part:"tick"});s.before(L),c.push(L)})}}([])}}var yt={mode:"closed",focusable:!0,construct:function(t,e){let n=d(this),r=n.data=Ae({},Te);n.scope=Fe(this,t),n.element=this,n.shadow=t,n.internals=e,n.handleEvent=wt,t.addEventListener("mousedown",n),t.addEventListener("touchstart",n),t.addEventListener("input",n)},connect:function(t){let n=d(this).data;n.value===void 0&&(this.value=z(n.min,n.max,0))}};function _e(t,e,n){let r=t(e),o=t(n);return o===r?0:r>o?1:-1}var Et=m(_e,!0);function Le(t,e){return e[t]}var Nt=m(Le,!0);var ke=Object.freeze;function vt(){return this}var At=ke({shift:f,push:f,forEach:f,join:function(){return""},map:vt,filter:vt,includes:function(){return!1},reduce:function(t,e){return e},length:0,each:f,pipe:N,start:f,stop:f,done:f,valueOf:function(){return null}});function O(t,e){return e?e.split(/\s+/).map(F).filter(n=>n>=(t.law==="linear-logarithmic"?0:t.min)&&n<=t.max).map(n=>Object.freeze({value:n,unitValue:A(t.law,n,t.min,t.max),displayValue:bt(t.unit,n)})):At}function Q(t,e){if(!e||/\s+any\s+/.test(e))return null;let n=e.split(/\s+/);return n.length===1?null:n.map(F).map(r=>({value:r,unitValue:A(t.law,r,t.min,t.max)})).sort(Et(Nt("unitValue")))}function Ce(t,e){let n=t.length,r=1/0,o;for(;n--;){let i=Math.abs(e-t[n].unitValue);i<r&&(r=i,o=t[n])}return o}var Mt={type:{value:"number",enumerable:!0},min:{attribute:function(t){this.min=t},get:function(){return d(this).data.min},set:function(t){let e=d(this),n=e.data,r=e.scope;n.min=F(t),n.max!==void 0&&(r.ticks(O(n,n.ticksAttribute)),r.unitZero(A(n.law,0,n.min,n.max)),n.value!==void 0&&(n.unitValue=A(n.law,n.value,n.min,n.max)))},enumerable:!0},max:{attributes:function(t){this.max=t},get:function(){return d(this).data.max},set:function(t){let e=d(this),n=e.data,r=e.scope;n.max=F(t),n.min!==void 0&&(r.ticks(O(n,n.ticksAttribute)),r.unitZero(A(n.law,0,n.min,n.max)),n.value!==void 0&&(n.unitValue=A(n.law,n.value,n.min,n.max)))},enumerable:!0},law:{attribute:function(t){let e=d(this),n=e.data,r=e.scope;n.law=t||"linear",n.ticksAttribute&&(n.ticks=O(n,n.ticksAttribute)),n.step&&(n.steps=Q(n,t==="ticks"?n.ticksAttribute||"":n.stepsAttribute)),r.unitZero(A(n.law,0,n.min,n.max))}},unit:{attribute:function(t){d(this).data.unit=t}},ticks:{attribute:function(t){let e=d(this),n=e.data,r=e.scope;n.ticksAttribute=t,r.ticks(O(n,t)),n.stepsAttribute==="ticks"&&(n.steps=Q(n,t||""))}},steps:{attribute:function(t){let n=d(this).data;n.stepsAttribute=t,n.steps=Q(n,t==="ticks"?n.ticksAttribute||"":t)}},prefix:{attribute:function(t){d(this).data.prefix=t}},value:{attribute:function(t){this.value=t},get:function(){return d(this).data.value},set:function(t){let e=d(this),n=e.data,r=e.scope,o=e.internals;if(t=F(t),t===n.value)return;let i=A(n.law,t,n.min,n.max);if(n.steps){let p=Ce(n.steps,i);t=p.value,i=p.unitValue}t!==n.value&&(n.value=t,n.unitValue=i,o.setFormValue(t),r.displayValue(ht(n.unit,t)),r.displayUnit(gt(n.unit,t)),r.unitValue(i))},enumerable:!0}};var Pe=window.rangeInputStylesheet||import.meta.url.replace(/\/[^\/]*([?#].*)?$/,"/")+"range-input-shadow.css",ar=R("<range-input>",yt,Mt,Pe);export{ar as default};
