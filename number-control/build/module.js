/* form-elements 
   0.0.4
   By Stephen Band
   Built 2023-03-28 02:37 */

var X=Object.getOwnPropertySymbols;var Tt=Object.prototype.hasOwnProperty,Mt=Object.prototype.propertyIsEnumerable;var Y=(t,e)=>{var o={};for(var r in t)Tt.call(t,r)&&e.indexOf(r)<0&&(o[r]=t[r]);if(t!=null&&X)for(var r of X(t))e.indexOf(r)<0&&Mt.call(t,r)&&(o[r]=t[r]);return o};function P(t){return t}function b(t,e){return function(){let r=t.apply(this,arguments),i=e[r]||e.default;if(!i)throw new Error('overload() no handler for "'+r+'"');return i.apply(this,arguments)}}function H(t){var e=new Map;return function(r){if(e.has(r))return e.get(r);var i=t(r);return e.set(r,i),i}}var Ft=Array.prototype;function Ht(t,e){return typeof t=="function"?t.apply(null,e):t}function Z(t,e,o){o=o||t.length;var r=o===1?e?t:H(t):H(function(i){return Z(function(){var a=[i];return a.push.apply(a,arguments),t.apply(null,a)},e,o-1)});return function i(a){return arguments.length===0?i:arguments.length===1?r(a):arguments.length>=o?t.apply(null,arguments):Ht(r(a),Ft.slice.call(arguments,1))}}var f=Z;function k(){}var kt=b(P,{is:k,tag:k,data:function(t,e,o){Object.assign(e.dataset,o)},html:function(t,e,o){e.innerHTML=o},text:function(t,e,o){e.textContent=o},children:function(t,e,o){e.innerHTML="",e.append.apply(e,o)},points:T,cx:T,cy:T,r:T,transform:T,preserveAspectRatio:T,viewBox:T,default:function(t,e,o){t in e?e[t]=o:e.setAttribute(t,o)}});function T(t,e,o){e.setAttribute(t,o)}function Ct(t,e){for(var o=Object.keys(e),r=o.length;r--;)kt(o[r],t,e[o[r]]);return t}var B=f(Ct,!0);var U="http://www.w3.org/2000/svg",tt=document.createElement("template"),j=(t,e)=>e&&typeof e;function et(t,e){let o=document.createRange();return o.selectNode(t),o.createContextualFragment(e)}var m=b(j,{string:function(t,e){let o=document.createElementNS(U,t);return o.innerHTML=e,o},object:function(t,e){let o=document.createElementNS(U,t);return typeof e.length=="number"?o.append.apply(o,e):B(o,e),o},default:t=>document.createElementNS(U,t)}),Pt=b(j,{string:function(t,e){let o=document.createElement(t);return o.innerHTML=e,o},object:function(t,e){let o=document.createElement(t);return typeof e.length=="number"?o.append.apply(o,e):B(o,e),o},default:t=>document.createElement(t)}),Ot=b(P,{comment:function(t,e){return document.createComment(e||"")},fragment:b(j,{string:function(t,e,o){return o?et(o,e):(tt.innerHTML=e,tt.content.cloneNode(!0))},object:function(t,e,o){let r=o?et(o):document.createDocumentFragment();return typeof e.length=="number"?r.append.apply(r,e):B(r,e),r},default:()=>document.createDocumentFragment()}),text:function(t,e){return document.createTextNode(e||"")},circle:m,ellipse:m,g:m,glyph:m,image:m,line:m,rect:m,use:m,path:m,pattern:m,polygon:m,polyline:m,svg:m,default:Pt}),x=Ot;function V(t,e,o){let r;typeof o!="string"&&o.input!==void 0&&o.index!==void 0&&(r=o,o=r.input.slice(o.index+o[0].length+(o.consumed||0)));let i=t.exec(o);if(!i)return;let a=e(i);return r&&(r.consumed=(r.consumed||0)+i.index+i[0].length+(i.consumed||0)),a}var Ee=f(V,!0);function Dt(t,e,o){throw o.input!==void 0&&o.index!==void 0&&(o=o.input),new Error('Cannot parse string "'+(o.length>128?o.length.slice(0,128)+"…":o)+'"')}function At(t,e,o){let r=-1;for(;++r<o.length;)e=o[r]!==void 0&&t[r]?t[r](e,o):e;return t.done?t.done(e,o):t.close?t.close(e,o):e}function Bt(t,e,o,r){let i=V(t,a=>At(e,o,a),r);return i===void 0?e.catch?e.catch(o,r):Dt(t,e,r):i}var nt=f(Bt,!0);var d=Symbol("internals"),M=Symbol("shadow"),ot=Object.defineProperties,It={a:HTMLAnchorElement,article:HTMLElement,dl:HTMLDListElement,p:HTMLParagraphElement,br:HTMLBRElement,fieldset:HTMLFieldSetElement,hr:HTMLHRElement,img:HTMLImageElement,li:HTMLLIElement,ol:HTMLOListElement,optgroup:HTMLOptGroupElement,q:HTMLQuoteElement,section:HTMLElement,textarea:HTMLTextAreaElement,td:HTMLTableCellElement,th:HTMLTableCellElement,tr:HTMLTableRowElement,tbody:HTMLTableSectionElement,thead:HTMLTableSectionElement,tfoot:HTMLTableSectionElement,ul:HTMLUListElement},Gt={name:{set:function(t){return this.setAttribute("name",t)},get:function(){return this.getAttribute("name")||""}},form:{get:function(){return this[d].form}},labels:{get:function(){return this[d].labels}},validity:{get:function(){return this[d].validity}},validationMessage:{get:function(){return this[d].validationMessage}},willValidate:{get:function(){return this[d].willValidate}},checkValidity:{value:function(){return this[d].checkValidity()}},reportValidity:{value:function(){return this[d].reportValidity()}}},Rt={},rt={once:!0},it=0,st=!1;function Ut(t){return It[t]||window["HTML"+t[0].toUpperCase()+t.slice(1)+"Element"]||(()=>{throw new Error('Constructor not found for tag "'+t+'"')})()}var jt=nt(/^\s*<?([a-z][\w]*-[\w-]+)>?\s*$|^\s*<?([a-z][\w]*)\s+is[=\s]*["']?([a-z][\w]*-[\w]+)["']?>?\s*$/,{1:(t,e)=>({name:e[1]}),2:(t,e)=>({name:e[3],tag:e[2]}),catch:function(t,e){throw new SyntaxError(`dom element() – name must be of the form 'element-name' or 'tag is="element-name"' (`+e+")")}},null);function Vt(t,e){if(t.hasOwnProperty(e)){let o=t[e];delete t[e],t[e]=o}return t}function ut(t,e,o){t._initialLoad=!0;let r=t.attachShadow({mode:e.mode||"closed",delegatesFocus:e.focusable||!1});if(o){let i=x("link",{rel:"stylesheet",href:o});r.append(i)}return t[M]=r,r}function Nt(t){var e;if(t.attachInternals){if(e=t.attachInternals(),e.setFormValue)return e}else e={shadowRoot:t.shadowRoot};return e.input=x("input",{type:"hidden",name:t.name}),t.appendChild(e.input),e.setFormValue=function(o){this.input.value=o},e}function qt(t){return!!t.attribute}function zt(t){return t.set||t.get||t.hasOwnProperty("value")}function Kt(t,e){return qt(e[1])&&(t.attributes[e[0]]=e[1].attribute),zt(e[1])&&(t.properties[e[0]]=e[1]),t}function N(t,e,o,r,i=""){let{name:a,tag:s}=jt(t),l=typeof s=="string"?Ut(s):HTMLElement,{attributes:u,properties:h}=o?Object.entries(o).reduce(Kt,{attributes:{},properties:{}}):Rt;function p(){let c=Reflect.construct(l,arguments,p),y=e.construct&&e.construct.length>it?ut(c,e,r||e.stylesheet):void 0,w=p.formAssociated?Nt(c):{};return s&&(st=!0),e.construct&&e.construct.call(c,y,w),h&&Object.keys(h).reduce(Vt,c),c}return p.prototype=Object.create(l.prototype,h),h.value&&(p.formAssociated=!0,ot(p.prototype,Gt),(e.enable||e.disable)&&(p.prototype.formDisabledCallback=function(c){return c?e.disable&&e.disable.call(this,this[M],this[d]):e.enable&&e.enable.call(this,this[M],this[d])}),e.reset&&(p.prototype.formResetCallback=function(){return e.reset.call(this,this[M],this[d])}),e.restore&&(p.prototype.formStateRestoreCallback=function(){return e.restore.call(this,this[M],this[d])})),u&&(p.observedAttributes=Object.keys(u),p.prototype.attributeChangedCallback=function(c,y,w){return u[c].call(this,w)}),p.prototype.connectedCallback=function(){let c=this,y=c[M],w=c[d];if(c._initialLoad){let E=y.querySelectorAll('link[rel="stylesheet"]');if(E.length){let xt=0,R=E.length,W=function(oe){++xt>=E.length&&(delete c._initialLoad,e.load&&e.load.call(c,y))},Lt=W;for(;R--;)E[R].addEventListener("load",W,rt),E[R].addEventListener("error",Lt,rt)}else e.load&&Promise.resolve(1).then(()=>e.load.call(this,y,w))}e.connect&&e.connect.call(this,y,w)},e.disconnect&&(p.prototype.disconnectedCallback=function(){return e.disconnect.call(this,this[M],this[d])}),window.console&&window.console.log("%c<"+(s?s+" is="+a:a)+">%c "+i,"color: #3a8ab0; font-weight: 600;","color: #888888; font-weight: 400;"),window.customElements.define(a,p,s&&{extends:s}),s&&!st&&document.querySelectorAll('[is="'+a+'"]').forEach(c=>{h&&ot(c,h);let y=e.construct&&e.construct.length>it?ut(c,e,r||e.stylesheet):void 0;e.construct&&e.construct.call(c,y);let w;for(w in u){let E=c.attributes[w];E&&u[w].call(c,E.value)}e.connect&&e.connect.apply(c)}),p}var q=Symbol("privates");function I(t){return t[q]||Object.defineProperty(t,q,{value:{}})[q]}function F(t,e,o){return o>e?e:o<t?t:o}var Pe=f(F);function $t(t,e){return e[t]}var at=f($t,!0);function z(t){if(typeof t!="object"||arguments.length>1)throw new Error("delegate() now takes an object of selector:fn pairs.");return function(o){let r=o.target,i;for(i in t){let a=r.closest(i);if(a)return t[i](a,...arguments)}}}function ct(t,e){t.remove&&t.remove(e);let o;for(;(o=t.indexOf(e))!==-1;)t.splice(o,1);return t}var Ge=f(ct,!0);function K(t){return t&&t[Symbol.iterator]}var _t=Object.assign;function Qt(t){return t.stop?t.stop():t()}function O(){}_t(O.prototype,{stop:function(){let t=this.stopables;return this.stopables=void 0,t&&t.forEach(Qt),this},done:function(t){return(this.stopables||(this.stopables=[])).push(t),this}});var v=Object.assign,S=Object.create;function lt(t,e){t[0]=e,e.done(t)}function L(t,e){t&&t.push(e)}function _(t){O.prototype.stop.apply(t);let e=-1,o;for(;o=t[++e];)t[e]=void 0,o.stop()}function g(t){this.input=t}v(g.prototype,O.prototype,{push:function(t){L(this[0],t)},pipe:function(t){if(this[0])throw new Error("Stream: Attempt to .pipe() a unicast stream multiple times. Create a multicast stream with .broadcast().");return this[0]=t,t.done(this),this.input.pipe(this),t},map:function(t){return new pt(this,t)},filter:function(t){return new ft(this,t)},split:function(t){return new mt(this,t)},flatMap:function(t){return new ht(this,t)},slice:function(t,e){return new $(this,t,e)},take:function(t){return console.warn(".take(a) superseded by .slice(0, a)"),new $(this,0,t)},each:function(t){return this.pipe(new wt(t))},reduce:function(t,e){return this.pipe(new dt(t,e)).value},scan:function(t,e){return new gt(this,t,e)},stop:function(){return _(this),this}});function pt(t,e){this.input=t,this.fn=e}pt.prototype=v(S(g.prototype),{push:function(e){let r=this.fn(e);r!==void 0&&L(this[0],r)}});function ft(t,e){this.input=t,this.fn=e}ft.prototype=v(S(g.prototype),{push:function(e){this.fn(e)&&L(this[0],e)}});function ht(t,e){this.input=t,this.fn=e}ht.prototype=v(S(g.prototype),{push:function(e){let r=this.fn(e);if(r!==void 0)if(K(r))for(let i of r)L(this[0],i);else r.pipe&&this.done(r.each(i=>L(this[0],i)))}});function mt(t,e){this.input=t,this.chunk=[],typeof n=="number"?this.n=e:this.fn=e}mt.prototype=v(S(g.prototype),{fn:function(){return this.chunk.length===this.n},push:function(e){let o=this.chunk;this.fn(e)?(L(this[0],o),this.chunk=[]):o.push(e)}});function $(t,e,o=1/0){this.input=t,this.index=-e,this.indexEnd=e+o}$.prototype=v(S(g.prototype),{push:function(e){++this.index>0&&this[0].push(e),this.index===this.indexEnd&&this.stop()}});function dt(t,e){this.fn=t,this.value=e,this.i=0}dt.prototype=v(S(g.prototype),{push:function(t){let e=this.fn;this.value=e(this.value,t,this.i++,this)}});function gt(t,e,o){this.input=t,this.fn=e,this.value=o}gt.prototype=v(S(g.prototype),{push:function(t){let e=this.fn;this.value=e(this.value,t),this[0].push(this.value)}});function wt(t){this.push=t}wt.prototype=v(S(g.prototype),{each:null,reduce:null,pipe:null});var Jt=Object.assign,Wt=/\s+/,G={fullscreenchange:H(()=>"fullscreenElement"in document?"fullscreenchange":"webkitFullscreenElement"in document?"webkitfullscreenchange":"mozFullScreenElement"in document?"mozfullscreenchange":"msFullscreenElement"in document?"MSFullscreenChange":"fullscreenchange")},bt=0;window.addEventListener("click",t=>bt=t.timeStamp);function Xt(t,e){return t.node.addEventListener(G[e]?G[e]():e,t,t.options),t}function Yt(t,e){return t.node.removeEventListener(G[e]?G[e]():e,t),t}function yt(t,e,o){this.types=t.split(Wt),this.options=e,this.node=o,this.select=e&&e.select}Jt(yt.prototype,{pipe:function(t){lt(this,t),this.types.reduce(Xt,this)},handleEvent:function(t){if(!(t.type==="click"&&t.timeStamp<=bt)){if(this.select){let e=t.target.closest(this.select);if(!e)return;t.selectedTarget=e}L(this[0],t)}},stop:function(){this.types.reduce(Yt,this),_(this[0])}});function C(t,e){let o;return typeof t=="object"&&(o=t,t=o.type),new g(new yt(t,o,e))}function Q(t){return t.which===1&&!t.ctrlKey&&!t.altKey&&!t.shiftKey}var Zt=Object.assign,D={bubbles:!0,cancelable:!0};function te(t,e){var h;let o=D,r,i,a,s,l,u;return typeof t=="object"?(h=t,{type:t,detail:i,bubbles:a,cancelable:s,composed:l}=h,r=Y(h,["type","detail","bubbles","cancelable","composed"]),u=Zt(new CustomEvent(t,{detail:i,bubbles:a||D.bubbles,cancelable:s||D.cancelable,composed:l||D.composed}),r)):u=new CustomEvent(t,D),e.dispatchEvent(u)}var A=f(te,!0);function vt(t,e,o,r){return o?r?5*o:o:r?.05*(e-t):.01*(e-t)}var ee=b(at("keyCode"),{38:(t,e,o,r,i)=>(t.preventDefault(),typeof e=="number"&&typeof o=="number"?F(e,o,i+vt(e,o,r,t.shiftKey)):i+1),40:(t,e,o,r,i)=>(t.preventDefault(),typeof e=="number"&&typeof o=="number"?F(e,o,i-vt(e,o,r,t.shiftKey)):i-1),default:k});function J(t,e,o,r,i){let a=parseFloat(r.value||0),s=parseFloat(r.min),l=parseFloat(r.max),u=parseFloat(r.step);r.value=F(s,l,a+(u?i*u:i)),o.preventDefault(),r.focus(),A("input",r),A("change",r)}var Et={mode:"closed",construct:function(t,e){let o=x("style",":host > * { visibility: hidden; }"),r=x("slot"),i=x("button",{type:"button",part:"decrement-button",name:"decrement",value:"-1",html:'<slot name="decrement-button">-</slot>'}),a=x("button",{type:"button",part:"increment-button",name:"increment",value:"1",html:'<slot name="increment-button">+</slot>'});t.append(o,r,i,a);let s=I(this);s.childStyle=o.sheet.cssRules[0].style,C("slotchange",r).each(l=>{let u=this.querySelector('[type="number"], [type="range"]');s.input=u,u.value||(u.value=F(u.min?parseFloat(u.min):-1/0,u.max?parseFloat(u.max):1/0,0))}),C("pointerdown",t).filter(Q).each(z({'[type="button"]':(l,u)=>J(this,e,u,s.input,parseFloat(l.value)*(parseFloat(s.input.step)||1)),'[slot="decrement-button"]':(l,u)=>J(this,e,u,s.input,-1*(parseFloat(s.input.step)||1)),'[slot="increment-button"]':(l,u)=>J(this,e,u,s.input,parseFloat(s.input.step)||1)})),C({type:"input",select:'[type="number"]'},t).each(l=>{let u=parseFloat(s.input.value||0),h=parseFloat(s.input.min),p=parseFloat(s.input.max);(u<h||u>p)&&(s.input.value=F(h,p,u))}),C("keydown",this).filter(()=>document.activeElement===this||document.activeElement===s.input||this.contains(document.activeElement)).map(l=>ee(l,s.input.min&&parseFloat(s.input.min),s.input.max&&parseFloat(s.input.max),parseFloat(s.input.step),parseFloat(s.input.value))).each(l=>{let u=s.input;u.value=Math.abs(l)<.1?l.toPrecision(1):Math.abs(l)<10?l.toPrecision(2):Math.round(l),A("input",u),A("change",u)})},load:function(t){let e=I(this);e.childStyle.visibility=""}};var ne=window.numberControlStylesheet||import.meta.url.replace(/\/[^\/]*([?#].*)?$/,"/")+"shadow.css",pn=N("<number-control>",Et,{},ne);export{pn as default};
