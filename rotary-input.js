/* form-elements 
   0.0.2
   By Stephen Band
   Built 2022-06-07 03:20 */

var pe=Object.defineProperty;var vt=Object.getOwnPropertySymbols;var le=Object.prototype.hasOwnProperty,fe=Object.prototype.propertyIsEnumerable;var Et=(t,e)=>{var r={};for(var o in t)le.call(t,o)&&e.indexOf(o)<0&&(r[o]=t[o]);if(t!=null&&vt)for(var o of vt(t))e.indexOf(o)<0&&fe.call(t,o)&&(r[o]=t[o]);return r};var Nt=(t,e)=>{for(var r in e)pe(t,r,{get:e[r],enumerable:!0})};function w(t){return t}function m(t,e){return function(){let o=t.apply(this,arguments),i=e[o]||e.default;if(!i)throw new Error('overload() no handler for "'+o+'"');return i.apply(this,arguments)}}function G(t){var e=new Map;return function(o){if(e.has(o))return e.get(o);var i=t(o);return e.set(o,i),i}}var me=Array.prototype;function de(t,e){return typeof t=="function"?t.apply(null,e):t}function Tt(t,e,r){r=r||t.length;var o=r===1?e?t:G(t):G(function(i){return Tt(function(){var s=[i];return s.push.apply(s,arguments),t.apply(null,s)},e,r-1)});return function i(s){return arguments.length===0?i:arguments.length===1?o(s):arguments.length>=r?t.apply(null,arguments):de(o(s),me.slice.call(arguments,1))}}var d=Tt;function h(){}var he=m(w,{is:h,tag:h,html:function(t,e,r){e.innerHTML=r},text:function(t,e,r){e.textContent=r},children:function(t,e,r){e.innerHTML="",e.append.apply(e,r)},points:P,cx:P,cy:P,r:P,preserveAspectRatio:P,viewBox:P,default:function(t,e,r){t in e?e[t]=r:e.setAttribute(t,r)}});function P(t,e,r){e.setAttribute(t,r)}function be(t,e){for(var r=Object.keys(e),o=r.length;o--;)he(r[o],t,e[r[o]]);return t}var B=d(be,!0);var et="http://www.w3.org/2000/svg",Mt=document.createElement("div"),nt=(t,e)=>e&&typeof e;function St(t,e){let r=document.createRange();return r.selectNode(t),r.createContextualFragment(e)}var v=m(nt,{string:function(t,e){let r=document.createElementNS(et,t);return r.innerHTML=e,r},object:function(t,e){let r=document.createElementNS(et,t);return typeof e.length=="number"?r.append.apply(r,e):B(r,e),r},default:t=>document.createElementNS(et,t)}),we=m(nt,{string:function(t,e){let r=document.createElement(t);return r.innerHTML=e,r},object:function(t,e){let r=document.createElement(t);return typeof e.length=="number"?r.append.apply(r,e):B(r,e),r},default:t=>document.createElement(t)}),ge=m(w,{comment:function(t,e){return document.createComment(e||"")},fragment:m(nt,{string:function(t,e,r){if(r)return St(r,e);let o=document.createDocumentFragment();Mt.innerHTML=e;let i=Mt.childNodes;for(;i[0];)o.appendChild(i[0]);return o},object:function(t,e,r){let o=r?St(r):document.createDocumentFragment();return typeof e.length=="number"?o.append.apply(o,e):B(o,e),o},default:()=>document.createDocumentFragment()}),text:function(t,e){return document.createTextNode(e||"")},circle:v,ellipse:v,g:v,glyph:v,image:v,line:v,rect:v,use:v,path:v,pattern:v,polygon:v,polyline:v,svg:v,default:we}),E=ge;function rt(t,e,r){let o;typeof r!="string"&&r.input!==void 0&&r.index!==void 0&&(o=r,r=o.input.slice(r.index+r[0].length+(r.consumed||0)));let i=t.exec(r);if(!i)return;let s=e(i);return o&&(o.consumed=(o.consumed||0)+i.index+i[0].length+(i.consumed||0)),s}var jn=d(rt,!0);function ye(t,e,r){throw r.input!==void 0&&r.index!==void 0&&(r=r.input),new Error('Cannot parse string "'+(r.length>128?r.length.slice(0,128)+"…":r)+'"')}function xe(t,e,r){let o=-1;for(;++o<r.length;)e=r[o]!==void 0&&t[o]?t[o](e,r):e;return t.done?t.done(e,r):t.close?t.close(e,r):e}function ve(t,e,r,o){let i=rt(t,s=>xe(e,r,s),o);return i===void 0?e.catch?e.catch(r,o):ye(t,e,o):i}var Ft=d(ve,!0);var ot=h;var N=Symbol("internals"),k=Symbol("shadow"),At=Object.defineProperties,Ee={a:HTMLAnchorElement,dl:HTMLDListElement,p:HTMLParagraphElement,br:HTMLBRElement,fieldset:HTMLFieldSetElement,hr:HTMLHRElement,img:HTMLImageElement,li:HTMLLIElement,ol:HTMLOListElement,optgroup:HTMLOptGroupElement,q:HTMLQuoteElement,textarea:HTMLTextAreaElement,td:HTMLTableCellElement,th:HTMLTableCellElement,tr:HTMLTableRowElement,tbody:HTMLTableSectionElement,thead:HTMLTableSectionElement,tfoot:HTMLTableSectionElement,ul:HTMLUListElement},Ne={name:{set:function(t){return this.setAttribute("name",t)},get:function(){return this.getAttribute("name")||""}},form:{get:function(){return this[N].form}},labels:{get:function(){return this[N].labels}},validity:{get:function(){return this[N].validity}},validationMessage:{get:function(){return this[N].validationMessage}},willValidate:{get:function(){return this[N].willValidate}},checkValidity:{value:function(){return this[N].checkValidity()}},reportValidity:{value:function(){return this[N].reportValidity()}}},Te={},kt={once:!0},Me=0,Lt=!1;function Se(t){return Ee[t]||window["HTML"+t[0].toUpperCase()+t.slice(1)+"Element"]||(()=>{throw new Error('Constructor not found for tag "'+t+'"')})()}var Fe=Ft(/^\s*<?([a-z][\w]*-[\w]+)>?\s*$|^\s*<?([a-z][\w]*)\s+is=["']?([a-z][\w]*-[\w]+)["']?>?\s*$/,{1:(t,e)=>({name:e[1]}),2:(t,e)=>({name:e[3],tag:e[2]}),catch:function(t,e){throw new SyntaxError(`dom element() – name must be of the form 'element-name' or 'tag is="element-name"' (`+e+")")}},null);function Ae(t,e){if(t.hasOwnProperty(e)){let r=t[e];delete t[e],t[e]=r}return t}function ke(t,e,r){t._initialLoad=!0;let o=t.attachShadow({mode:e.mode||"closed",delegatesFocus:e.focusable||!1});if(r){let i=E("link",{rel:"stylesheet",href:r});o.append(i)}return t[k]=o,o}function Le(t){var e;if(t.attachInternals){if(e=t.attachInternals(),e.setFormValue)return e}else e={shadowRoot:t.shadowRoot};return e.input=E("input",{type:"hidden",name:t.name}),t.appendChild(e.input),e.setFormValue=function(r){this.input.value=r},e}function Ce(t){t._initialAttributes={},t._n=0}function Pe(t,e,r){let o=t._initialAttributes;for(;t._n<e.length&&o[e[t._n]]!==void 0;)r[e[t._n]].call(t,o[e[t._n]]),++t._n}function Ct(t,e,r){if(!t._initialAttributes)return;let o=t._initialAttributes;for(;t._n<e.length;)o[e[t._n]]!==void 0&&r[e[t._n]]&&r[e[t._n]].call(t,o[e[t._n]]),++t._n;delete t._initialAttributes,delete t._n}function _e(t){return!!t.attribute}function He(t){return t.set||t.get||t.hasOwnProperty("value")}function Pt(t,e){return _e(e[1])&&(t.attributes[e[0]]=e[1].attribute),He(e[1])&&(t.properties[e[0]]=e[1]),t}function it(t,e,r,o){let{name:i,tag:s}=Fe(t),f=typeof s=="string"?Se(s):HTMLElement,{attributes:l,properties:a}=r?Object.entries(r).reduce(Pt,{attributes:{},properties:{}}):e.properties?Object.entries(e.properties).reduce(Pt,{attributes:{},properties:{}}):Te;function c(){let u=Reflect.construct(f,arguments,c),p=e.construct&&e.construct.length>Me?ke(u,e,o||e.stylesheet):void 0,y=c.formAssociated&&Le(u);return s&&(Lt=!0),e.construct&&e.construct.call(u,p,y),l&&(Ce(u),Promise.resolve(1).then(function(){Ct(u,c.observedAttributes,l)})),a&&Object.keys(a).reduce(Ae,u),u}return c.prototype=Object.create(f.prototype,a),a&&a.value&&(c.formAssociated=!0,At(c.prototype,Ne),(e.enable||e.disable)&&(c.prototype.formDisabledCallback=function(u){return u?e.disable&&e.disable.call(this,this[k],this[N]):e.enable&&e.enable.call(this,this[k],this[N])}),e.reset&&(c.prototype.formResetCallback=function(){return e.reset.call(this,this[k],this[N])}),e.restore&&(c.prototype.formStateRestoreCallback=function(){return e.restore.call(this,this[k],this[N])})),l&&(c.observedAttributes=Object.keys(l),c.prototype.attributeChangedCallback=function(u,p,y){if(!this._initialAttributes)return l[u].call(this,y);this._initialAttributes[u]=y,Pe(this,c.observedAttributes,l)}),c.prototype.connectedCallback=function(){let u=this,p=u[k],y=u[N];if(u._initialAttributes&&Ct(u,c.observedAttributes,l),u._initialLoad){let x=p.querySelectorAll('link[rel="stylesheet"]');if(x.length){let tt=0,C=x.length,xt=function(ae){++tt>=x.length&&(delete u._initialLoad,e.load&&(ot("element()","loaded",Array.from(x).map(ce=>ce.href).join(`
`)),e.load.call(u,p)))},se=xt;for(;C--;)x[C].addEventListener("load",xt,kt),x[C].addEventListener("error",se,kt);e.connect&&e.connect.call(this,p,y)}else e.connect&&e.connect.call(this,p,y),e.load&&e.load.call(this,p,y)}else e.connect&&e.connect.call(this,p,y)},e.disconnect&&(c.prototype.disconnectedCallback=function(){return e.disconnect.call(this,this[k],this[N])}),ot("element()","<"+(s?s+" is="+i:i)+">"),window.customElements.define(i,c,s&&{extends:s}),s&&!Lt&&document.querySelectorAll('[is="'+i+'"]').forEach(u=>{r&&At(u,r),e.construct&&e.construct.apply(u);let p;for(p in l){let y=u.attributes[p];y&&l[p].call(u,y.value)}e.connect&&e.connect.apply(u)}),c}var st=Symbol("privates");function b(t){return t[st]||Object.defineProperty(t,st,{value:{}})[st]}function z(t,e,r){return r>e?e:r<t?t:r}var er=d(z);var Ie=.9965784284662086;function D(t){return 20*Math.log10(t)*Ie}function ut(t){return Math.pow(2,t/6)}function j(t){return t.replace(/-(\w)?/g,function(e,r){return r?r.toUpperCase():""})}var pt={};Nt(pt,{cubic:()=>De,cubicBezier:()=>Ue,linear:()=>M,linearLogarithmic:()=>Re,logarithmic:()=>je,quadratic:()=>ze});var at=!1,_t={any:h,array:t=>Array.isArray(t),"array-like":t=>typeof t.length=="number",boolean:t=>typeof t=="boolean",date:t=>t instanceof Date&&!Number.isNaN(t.getTime()),error:t=>t instanceof Error,function:t=>typeof t=="function",int:t=>Number.isInteger(t)&&Number.MIN_SAFE_INTEGER<=t&&Number.MAX_SAFE_INTEGER>=t,"int<0":t=>Number.isInteger(t)&&Number.MIN_SAFE_INTEGER<=t&&Number.MAX_SAFE_INTEGER>=t&&t<0,"int<=0":t=>Number.isInteger(t)&&Number.MIN_SAFE_INTEGER<=t&&Number.MAX_SAFE_INTEGER>=t&&t<=0,"int>0":t=>Number.isInteger(t)&&Number.MIN_SAFE_INTEGER<=t&&Number.MAX_SAFE_INTEGER>=t&&t>0,"int>=0":t=>Number.isInteger(t)&&Number.MIN_SAFE_INTEGER<=t&&Number.MAX_SAFE_INTEGER>=t&&t>=0,number:t=>typeof t=="number"&&!Number.isNaN(t),"number<0":t=>typeof t=="number"&&t<0,"number<=0":t=>typeof t=="number"&&t<=0,"number>0":t=>typeof t=="number"&&t>0,"number>=0":t=>typeof t=="number"&&t>=0,object:t=>!!t&&typeof t=="object",regexp:t=>t instanceof RegExp,symbol:t=>typeof t=="symbol",null:t=>t===null},Ht=at?function(e,r,o){if(!_t[e]){if(/^[A-Z]/.test(e)){if(r.constructor.name===e)return;throw new Error(o||'value not of type "'+e+'": '+r)}throw new Error('Type "'+e+'" not recognised')}if(!_t[e](r))throw new Error(o||'value not of type "'+e+'": '+r)}:h,Ve=at?function(e,r){Object.entries(e).forEach(([o,i])=>Ht(i,r[o],o+' not of type "'+i+'" ('+r[o]+")"))}:h,g=at?function(e,r,o,i){var s=e.split(/\s*[=-]>\s*/),f=s[0].split(/\s*,\s*/),l=s[1];return function(){Ve(f,arguments);let a=r.apply(this,arguments);return Ht(l,a,'return value not of type "'+l+'": '+a),a}}:function(e,r){return r};function ct(t,e,r,o){return((t*o+e)*o+r)*o}function Oe(t,e,r,o){return(3*t*o+2*e)*o+r}function Ge(t,e,r,o,i){var s,f,l,a=o;for(l=0;l<8;l++){if(s=ct(t,e,r,a)-o,Math.abs(s)<i)return a;if(f=Oe(t,e,r,a),Math.abs(f)<1e-6)break;a=a-s/f}var c=0,u=1;if(a=o,a<c)return c;if(a>u)return u;for(;c<u;){if(s=ct(t,e,r,a),Math.abs(s-o)<i)return a;o>s?c=a:u=a,a=(u-c)*.5+c}return a}function Be(t,e,r,o){var i=1/(200*r),s=3*t[0],f=3*(e[0]-t[0])-s,l=1-s-f,a=3*t[1],c=3*(e[1]-t[1])-a,u=1-a-c,p=Ge(l,f,s,o,i);return ct(u,c,a,p)}var R=d(Be,!0,4);var M=g("Number, Number, Number => Number",(t,e,r)=>(r-t)/(e-t)),ze=g("Number, Number, Number => Number",(t,e,r)=>Math.pow((r-t)/(e-t),1/2)),De=g("Number, Number, Number => Number",(t,e,r)=>Math.pow((r-t)/(e-t),1/3)),je=g("PositiveNumber, PositiveNumber, NonNegativeNumber => Number",(t,e,r)=>Math.log(r/t)/Math.log(e/t)),Re=g("PositiveNumber, PositiveNumber, NonNegativeNumber => Number",(t,e,r)=>r<=t?r/t/9:.1111111111111111+Math.log(r/t)/Math.log(e/t)/1.125),Ue=g("Object, Object, Number => Number",(t,e,r)=>R({0:M(t.point[0],e.point[0],t.handle[0]),1:M(t.point[0],e.point[0],t.handle[0])},{0:M(t.point[0],e.point[0],e.handle[0]),1:M(t.point[0],e.point[0],e.handle[0])},1,M(t.point[0],e.point[0],r)));var lt={};Nt(lt,{cubic:()=>$e,cubicBezier:()=>qe,linear:()=>It,linearLogarithmic:()=>Ye,logarithmic:()=>We,quadratic:()=>Xe,tanh:()=>Ze});var It=g("Number, Number, Number => Number",(t,e,r)=>r*(e-t)+t),Xe=g("Number, Number, Number => Number",(t,e,r)=>Math.pow(r,2)*(e-t)+t),$e=g("Number, Number, Number => Number",(t,e,r)=>Math.pow(r,3)*(e-t)+t),We=g("PositiveNumber, PositiveNumber, Number => Number",(t,e,r)=>t*Math.pow(e/t,r)),Ye=g("PositiveNumber, PositiveNumber, Number => Number",(t,e,r)=>r<=.1111111111111111?r*9*t:t*Math.pow(e/t,(r-.1111111111111111)*1.125)),qe=g("Object, Object, Number => Number",(t,e,r)=>It(t.point[1],e.point[1],R({0:M(t.point[0],e.point[0],t.handle[0]),1:M(t.point[1],e.point[1],t.handle[1])},{0:M(t.point[0],e.point[0],e.handle[0]),1:M(t.point[1],e.point[1],e.handle[1])},1,r))),Ze=g("Number, Number, Number => Number",(t,e,r)=>(Math.tanh(r)/2+.5)*(e-t)+t);function H(t,e,r,o){return lt[j(t)](r,o,e)}function S(t,e,r,o){return pt[j(t)](r,o,e)}function Ke(t,e){return e<.001?(e*1e3).toFixed(2):e<1?(e*1e3).toPrecision(3):e>1e3?(e/1e3).toPrecision(3):e.toPrecision(3)}var Ot=m(w,{pan:function(t,e){return e===-1?"-1.00":e===0?"0.00":e===1?"1.00":e.toFixed(2)},dB:function(t,e){let r=D(e);return isFinite(r)?r<-1?r.toPrecision(3):r.toFixed(2):r<0?"-∞":"∞"},Hz:function(t,e){return e<1?e.toFixed(2):e>1e3?(e/1e3).toPrecision(3):e.toPrecision(3)},semitone:function(t,e){return e===0?"0":e<0?"♭"+(-e/100).toFixed(2):"♯"+(e/100).toFixed(2)},s:Ke,bpm:function(t,e){let r=e*60;return r<100?r.toFixed(1):r.toFixed(0)},int:function(t,e){return Math.round(e)},default:function(t,e){return e<.1?e.toFixed(3):e<999.5?e.toPrecision(3):e.toFixed(0)}});function Qe(t,e){return e<1?(e*1e3).toFixed(0):e<10?e.toFixed(1):e<1e3?e.toPrecision(1):(e/1e3).toPrecision(1)+"k"}var Gt=m(w,{pan:function(t,e){return e===-1?"left":e===0?"centre":e===1?"right":e.toFixed(1)},dB:function(t,e){let r=D(e);return isFinite(r)?r.toFixed(0):r<0?"-∞":"∞"},Hz:function(t,e){return e<10?e.toFixed(1):e<1e3?e.toFixed(0):(e/1e3).toFixed(0)+"k"},semitone:function(t,e){return(e/100).toFixed(0)},s:Qe,default:function(t,e){return(e<99.5?e.toPrecision(3):e.toFixed(0)).replace(/(\d+)(\.\d*?)0+$/,(r,o,i)=>o+(i.length>1?i:""))}});function Je(t,e){return e>1e3?"k"+t:t}function tn(t,e){return e<1?"m"+t:e>1e3?"k"+t:t}function Vt(){return""}var Bt=m(w,{pan:Vt,dB:w,Hz:Je,semitone:Vt,s:tn,int:()=>"",default:function(t,e){return t||""}});function _(t){if(!t)return 0;let e=+t;if(e||e===0)return e;let r=/^(-?[\d.]+)(?:(db|bpm)|(m|k)?(\w+))$/.exec(t.toLowerCase());if(!r)return 0;let o=parseFloat(r[1]);return r[2]==="dB"?ut(o):r[2]==="bpm"?o/60:r[3]==="m"?o/1e3:r[3]==="k"?o*1e3:o}function en(t,e){return e[t]}var U=d(en,!0);function ft(t,e){t.remove&&t.remove(e);let r;for(;(r=t.indexOf(e))!==-1;)t.splice(r,1);return e}var Tr=d(ft,!0);function mt(t){return t&&t[Symbol.iterator]}var nn=Object.assign;function rn(t){return t.stop?t.stop():t()}function I(){}nn(I.prototype,{stop:function(){let t=this.stopables;return this.stopables=void 0,t&&t.forEach(rn),this},done:function(t){return(this.stopables||(this.stopables=[])).push(t),this}});var F=Object.assign,A=Object.create;function zt(t,e){t[0]=e,e.done(t)}function Dt(t,e){let r=t[e].stopables;r&&ft(r,t),t[e]=void 0}function L(t,e){t&&t.push(e)}function X(t){I.prototype.stop.apply(t);let e=-1,r;for(;r=t[++e];)t[e]=void 0,r.stop()}function T(t){this.input=t}F(T.prototype,I.prototype,{push:function(t){L(this[0],t)},pipe:function(t){if(this[0])throw new Error("Stream: Attempt to .pipe() a unicast stream multiple times. Create a multicast stream with stream.broadcast().");return this[0]=t,t.done(this),this.input.pipe(this),t},map:function(t){return new jt(this,t)},filter:function(t){return new Rt(this,t)},split:function(t){return new Xt(this,t)},flatMap:function(t){return new Ut(this,t)},take:function(t){return new $t(this,t)},each:function(t){return this.pipe(new qt(t))},reduce:function(t,e){return this.pipe(new Wt(t,e)).value},scan:function(t,e){return new Yt(this,t,e)},stop:function(){return X(this),this}});function jt(t,e){this.input=t,this.fn=e}jt.prototype=F(A(T.prototype),{push:function(e){let o=this.fn(e);o!==void 0&&L(this[0],o)}});function Rt(t,e){this.input=t,this.fn=e}Rt.prototype=F(A(T.prototype),{push:function(e){this.fn(e)&&L(this[0],e)}});function Ut(t,e){this.input=t,this.fn=e}Ut.prototype=F(A(T.prototype),{push:function(e){let o=this.fn(e);if(o!==void 0)if(mt(o))for(let i of o)L(this[0],i);else throw new Error("Stream: Cannot .flatMap() non-iterable values")}});function Xt(t,e){this.input=t,this.chunk=[],typeof n=="number"?this.n=e:this.fn=e}Xt.prototype=F(A(T.prototype),{fn:function(){return this.chunk.length===this.n},push:function(e){let r=this.chunk;this.fn(e)?(L(this[0],r),this.chunk=[]):r.push(e)}});function $t(t,e){this.input=t,this.count=e}$t.prototype=F(A(T.prototype),{push:function(e){this[0].push(e),--this.count||this.stop()}});var on=0;function Wt(t,e){this.fn=t,this.value=e,this.i=0,this.n=++on}Wt.prototype=F(A(T.prototype),{push:function(t){let e=this.fn;this.value=e(this.value,t,this.i++,this)}});function Yt(t,e,r){this.input=t,this.fn=e,this.value=r}Yt.prototype=F(A(T.prototype),{push:function(t){let e=this.fn;this.value=e(this.value,t),this[0].push(this.value)}});function qt(t){this.push=t}qt.prototype=F(A(T.prototype),{each:null,reduce:null,pipe:null});function dt(t){return typeof t}var sn=/^\s*([+-]?\d*\.?\d+)([^\s\d]*)\s*$/;function ht(t){return function(r){if(typeof r=="number")return r;var o=sn.exec(r);if(!o||!t[o[2]||""]){if(!t.catch)throw new Error('Cannot parse value "'+r+'" (accepted units '+Object.keys(t).join(", ")+")");return o?t.catch(parseFloat(o[1]),o[2]):t.catch(parseFloat(r))}return t[o[2]||""](parseFloat(o[1]))}}var un=/px$/,Zt={"transform:translateX":function(t){var e=V("transform",t);if(!e||e==="none")return 0;var r=$(e);return parseFloat(r[4])},"transform:translateY":function(t){var e=V("transform",t);if(!e||e==="none")return 0;var r=$(e);return parseFloat(r[5])},"transform:scale":function(t){var e=V("transform",t);if(!e||e==="none")return 0;var r=$(e),o=parseFloat(r[0]),i=parseFloat(r[1]);return Math.sqrt(o*o+i*i)},"transform:rotate":function(t){var e=V("transform",t);if(!e||e==="none")return 0;var r=$(e),o=parseFloat(r[0]),i=parseFloat(r[1]);return Math.atan2(i,o)}};function $(t){return t.split("(")[1].split(")")[0].split(/\s*,\s*/)}function V(t,e){return window.getComputedStyle?window.getComputedStyle(e,null).getPropertyValue(t):0}function W(t,e){if(Zt[t])return Zt[t](e);var r=V(t,e);return typeof r=="string"&&un.test(r)?parseFloat(r):r}var Y,q;function an(){if(!Y){let t=document.documentElement.style.fontSize;document.documentElement.style.fontSize="100%",Y=W("font-size",document.documentElement),document.documentElement.style.fontSize=t||""}return Y}function cn(){return q||(q=W("font-size",document.documentElement)),q}window.addEventListener("resize",()=>{Y=void 0,q=void 0});var pn=m(dt,{number:w,string:ht({px:w,em:t=>an()*t,rem:t=>cn()*t,vw:t=>window.innerWidth*t/100,vh:t=>window.innerHeight*t/100,vmin:t=>window.innerWidth<window.innerHeight?window.innerWidth*t/100:window.innerHeight*t/100,vmax:t=>window.innerWidth<window.innerHeight?window.innerHeight*t/100:window.innerWidth*t/100})}),Z=pn;var ln=Array.prototype,wt=Object.assign,bt="webkitUserSelect"in document.body.style?"webkitUserSelect":"userSelect",K={threshold:4,ignoreTags:{textarea:!0,input:!0,select:!0}};function fn(t,e,r){return e*e+r*r>=t*t}function Kt(t,e,r){if(this.stream=t,this.events=e,this.options=r,this.pointerId=e[0].pointerId,typeof r.threshold=="function")this.checkThreshold=r.threshold;else{let o=Z(r.threshold);this.checkThreshold=(i,s)=>fn(o,i,s)}document.addEventListener("pointermove",this),document.addEventListener("pointerup",this),document.addEventListener("pointercancel",this)}wt(Kt.prototype,{handleEvent:m(U("type"),{pointermove:function(t){if(this.pointerId!==t.pointerId){console.log("Not the same pointer");return}if(this.events.push(t),!this.isGesture){let e=this.events[0],r=t.clientX-e.clientX,o=t.clientY-e.clientY,i=(t.timeStamp-e.timeStamp)/1e3;this.checkThreshold(r,o,i)&&this.createGesture()}},default:function(t){if(this.pointerId!==t.pointerId){console.log("Not the same pointer");return}this.events.push(t),this.stop()}}),createGesture:function(){this.isGesture=!0,this.userSelectState=document.body.style[bt],document.body.style[bt]="none",this.stream.push(new T(this))},pipe:function(t){for(zt(this,t);this.events.length;)L(this[0],ln.shift.apply(this.events));this.events=t},stop:function(){if(document.removeEventListener("pointermove",this),document.removeEventListener("pointerup",this),document.removeEventListener("pointercancel",this),this.isGesture&&(document.body.style[bt]=this.userSelectState),this[0]){let t=this[0];Dt(this,0),X(t)}}});function mn(t){var e=t.target.tagName;return e&&(!!K.ignoreTags[e.toLowerCase()]||t.target.draggable)}function Qt(t,e){this.node=t,this.options=e}wt(Qt.prototype,{pipe:function(t){return this[0]=t,this.node.addEventListener("pointerdown",this),t},handleEvent:function(t){if(t.button===0&&!(this.options.device&&!this.options.device.includes(t.pointerType))&&!mn(t)&&!(this.options.select&&!t.target.closest(this.options.select))){var e={type:t.type,target:t.target,currentTarget:t.currentTarget,clientX:t.clientX,clientY:t.clientY,timeStamp:t.timeStamp,pointerId:t.pointerId};new Kt(this[0],[e],this.options)}},stop:function(){return this[0]&&(this.node.removeEventListener("pointerdown",this),X(this[0])),this}});function gt(t,e){return t=e&&t?wt({},K,t):K,e=e||t,new T(new Qt(e,t))}var dn=Object.assign,O={bubbles:!0,cancelable:!0};function hn(t,e){var c;let r=O,o,i,s,f,l,a;return typeof t=="object"?(c=t,{type:t,detail:i,bubbles:s,cancelable:f,composed:l}=c,o=Et(c,["type","detail","bubbles","cancelable","composed"]),a=dn(new CustomEvent(t,{detail:i,bubbles:s||O.bubbles,cancelable:f||O.cancelable,composed:l||O.composed}),o)):a=new CustomEvent(t,O),e.dispatchEvent(a)}var Q=d(hn,!0);function Jt(t){let e=t.target.closest("button");if(!e)return;let r=parseFloat(e.value),o=H(this.data.law,r,this.data.min,this.data.max);this.element.value=o,Q("input",this.element)}function bn(t){let e=parseFloat(t.target.value),r=H(this.data.law,e,this.data.min,this.data.max);this.element.value=r,this.data.steps&&(t.target.value=this.data.unitValue)}var te=m(t=>t.type,{touchstart:Jt,mousedown:Jt,input:bn});var wn=Object.assign,gn={law:"linear",min:0,max:1};function yn(t,e,r){let o=E("style",":host {}"),i=E("label",{for:"input",part:"label",html:"<slot></slot>"}),s=E("div",{class:"handle"}),f=E("text"),l=E("abbr"),a=E("output",{children:[f,l],part:"output"}),c=E("text","");e.appendChild(o),e.appendChild(i),e.appendChild(s),e.appendChild(a),e.appendChild(c);let u=o.sheet.cssRules[0].style;return{unitValue:function(p){u.setProperty("--unit-value",p)},unitZero:function(p){u.setProperty("--unit-zero",p)},displayValue:function(p){f.textContent=p,u.setProperty("--display-value",p)},displayUnit:function(p){p?(l.parentNode||a.appendChild(l),l.textContent=p):l.parentNode&&l.remove()},ticks:function(p){return function(y){p.forEach(x=>x.remove()),p.length=0,y.forEach(function(x){let tt=E("span",{text:x.displayValue,style:"transform: translate3d(-50%, 0, 0) rotate3d(0, 0, 1, calc(-1 * (var(--rotation-start) + "+x.unitValue+" * var(--rotation-range)))) translate3d(calc("+Math.sin(x.unitValue*6.28318531)+" * -33%), 0, 0);"}),C=E("button",{type:"button",name:"unit-value",value:x.unitValue,style:"--unit-value: "+x.unitValue+";",children:[tt],part:"tick"});c.before(C),p.push(C)})}}([])}}var xn=m((t,e)=>e.type,{pointerdown:(t,e)=>({host:t.host,law:t.law,min:t.min,max:t.max,e0:e,y0:e.clientY,y:t.unitValue,touchRange:Z(t.style.getPropertyValue("--touch-range"))}),default:(t,e)=>{let{host:r,law:o,min:i,max:s,y:f,y0:l,touchRange:a}=t,c=l-e.clientY,u=z(0,1,f+c/a),p=H(o,u,i,s);return r.value=p,Q("input",r),t}}),ee={mode:"closed",focusable:!0,construct:function(t,e){let r=b(this),o=r.data=wn({},gn);o.host=this,o.style=getComputedStyle(this),r.scope=yn(this,t),r.element=this,r.shadow=t,r.internals=e,r.handleEvent=te,t.addEventListener("mousedown",r),gt({threshold:1,select:".handle"},t).each(i=>i.reduce(xn,o))},connect:function(t){let r=b(this).data;r.value===void 0&&(this.value=z(r.min,r.max,0))}};function vn(t,e,r){let o=t(e),i=t(r);return i===o?0:o>i?1:-1}var ne=d(vn,!0);var En=Object.freeze;function re(){return this}var oe=En({shift:h,push:h,forEach:h,join:function(){return""},map:re,filter:re,includes:function(){return!1},reduce:function(t,e){return e},length:0,each:h,pipe:w,start:h,stop:h,done:h,valueOf:function(){return null}});function J(t,e){return e?e.split(/\s+/).map(_).filter(r=>r>=(t.law==="linear-logarithmic"?0:t.min)&&r<=t.max).map(r=>Object.freeze({value:r,unitValue:S(t.law,r,t.min,t.max),displayValue:Gt(t.unit,r)})):oe}function yt(t,e){if(!e||/\s+any\s+/.test(e))return null;let r=e.split(/\s+/);return r.length===1?null:r.map(_).map(o=>({value:o,unitValue:S(t.law,o,t.min,t.max)})).sort(ne(U("unitValue")))}function Nn(t,e){let r=t.length,o=1/0,i;for(;r--;){let s=Math.abs(e-t[r].unitValue);s<o&&(o=s,i=t[r])}return i}var ie={type:{value:"number",enumerable:!0},min:{attribute:function(t){this.min=t},get:function(){return b(this).data.min},set:function(t){let e=b(this),r=e.data,o=e.scope;r.min=_(t),r.max!==void 0&&(o.ticks(J(r,r.ticksAttribute)),o.unitZero(S(r.law,0,r.min,r.max)),r.value!==void 0&&(r.unitValue=S(r.law,r.value,r.min,r.max)))},enumerable:!0},max:{attributes:function(t){this.max=t},get:function(){return b(this).data.max},set:function(t){let e=b(this),r=e.data,o=e.scope;r.max=_(t),r.min!==void 0&&(o.ticks(J(r,r.ticksAttribute)),o.unitZero(S(r.law,0,r.min,r.max)),r.value!==void 0&&(r.unitValue=S(r.law,r.value,r.min,r.max)))},enumerable:!0},law:{attribute:function(t){let e=b(this),r=e.data,o=e.scope;r.law=t||"linear",r.ticksAttribute&&(r.ticks=J(r,r.ticksAttribute)),r.step&&(r.steps=yt(r,t==="ticks"?r.ticksAttribute||"":r.stepsAttribute)),o.unitZero(S(r.law,0,r.min,r.max))}},unit:{attribute:function(t){b(this).data.unit=t}},ticks:{attribute:function(t){let e=b(this),r=e.data,o=e.scope;r.ticksAttribute=t,o.ticks(J(r,t)),r.stepsAttribute==="ticks"&&(r.steps=yt(r,t||""))}},steps:{attribute:function(t){let r=b(this).data;r.stepsAttribute=t,r.steps=yt(r,t==="ticks"?r.ticksAttribute||"":t)}},prefix:{attribute:function(t){b(this).data.prefix=t}},value:{attribute:function(t){this.value=t},get:function(){return b(this).data.value},set:function(t){let e=b(this),r=e.data,o=e.scope,i=e.internals;if(t=_(t),t===r.value)return;let s=S(r.law,t,r.min,r.max);if(r.steps){let f=Nn(r.steps,s);t=f.value,s=f.unitValue}t!==r.value&&(r.value=t,r.unitValue=s,i.setFormValue(t),o.displayValue(Ot(r.unit,t)),o.displayUnit(Bt(r.unit,t)),o.unitValue(s))},enumerable:!0}};var Tn=window.rotaryInputStylesheet||import.meta.url.replace(/\/[^\/]*([?#].*)?$/,"/")+"rotary-input-shadow.css",Mo=it("<rotary-input>",ee,ie,Tn);export{Mo as default};
