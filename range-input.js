/* form-elements 
   0.0.4
   By Stephen Band
   Built 2022-06-12 22:51 */

var ht=Object.getOwnPropertySymbols;var me=Object.prototype.hasOwnProperty,de=Object.prototype.propertyIsEnumerable;var mt=(t,e)=>{var o={};for(var r in t)me.call(t,r)&&e.indexOf(r)<0&&(o[r]=t[r]);if(t!=null&&ht)for(var r of ht(t))e.indexOf(r)<0&&de.call(t,r)&&(o[r]=t[r]);return o};function F(t){return t}function S(t,e){return function(){let r=t.apply(this,arguments),i=e[r]||e.default;if(!i)throw new Error('overload() no handler for "'+r+'"');return i.apply(this,arguments)}}function N(t){var e=new Map;return function(r){if(e.has(r))return e.get(r);var i=t(r);return e.set(r,i),i}}var ge=Array.prototype;function we(t,e){return typeof t=="function"?t.apply(null,e):t}function dt(t,e,o){o=o||t.length;var r=o===1?e?t:N(t):N(function(i){return dt(function(){var s=[i];return s.push.apply(s,arguments),t.apply(null,s)},e,o-1)});return function i(s){return arguments.length===0?i:arguments.length===1?r(s):arguments.length>=o?t.apply(null,arguments):we(r(s),ge.slice.call(arguments,1))}}var v=dt;function m(){}var be=S(F,{is:m,tag:m,html:function(t,e,o){e.innerHTML=o},text:function(t,e,o){e.textContent=o},children:function(t,e,o){e.innerHTML="",e.append.apply(e,o)},points:V,cx:V,cy:V,r:V,preserveAspectRatio:V,viewBox:V,default:function(t,e,o){t in e?e[t]=o:e.setAttribute(t,o)}});function V(t,e,o){e.setAttribute(t,o)}function ye(t,e){for(var o=Object.keys(e),r=o.length;r--;)be(o[r],t,e[o[r]]);return t}var z=v(ye,!0);var X="http://www.w3.org/2000/svg",gt=document.createElement("div"),Y=(t,e)=>e&&typeof e;function wt(t,e){let o=document.createRange();return o.selectNode(t),o.createContextualFragment(e)}var x=S(Y,{string:function(t,e){let o=document.createElementNS(X,t);return o.innerHTML=e,o},object:function(t,e){let o=document.createElementNS(X,t);return typeof e.length=="number"?o.append.apply(o,e):z(o,e),o},default:t=>document.createElementNS(X,t)}),ve=S(Y,{string:function(t,e){let o=document.createElement(t);return o.innerHTML=e,o},object:function(t,e){let o=document.createElement(t);return typeof e.length=="number"?o.append.apply(o,e):z(o,e),o},default:t=>document.createElement(t)}),xe=S(F,{comment:function(t,e){return document.createComment(e||"")},fragment:S(Y,{string:function(t,e,o){if(o)return wt(o,e);let r=document.createDocumentFragment();gt.innerHTML=e;let i=gt.childNodes;for(;i[0];)r.appendChild(i[0]);return r},object:function(t,e,o){let r=o?wt(o):document.createDocumentFragment();return typeof e.length=="number"?r.append.apply(r,e):z(r,e),r},default:()=>document.createDocumentFragment()}),text:function(t,e){return document.createTextNode(e||"")},circle:x,ellipse:x,g:x,glyph:x,image:x,line:x,rect:x,use:x,path:x,pattern:x,polygon:x,polyline:x,svg:x,default:ve}),T=xe;function Z(t,e,o){let r;typeof o!="string"&&o.input!==void 0&&o.index!==void 0&&(r=o,o=r.input.slice(o.index+o[0].length+(o.consumed||0)));let i=t.exec(o);if(!i)return;let s=e(i);return r&&(r.consumed=(r.consumed||0)+i.index+i[0].length+(i.consumed||0)),s}var qn=v(Z,!0);function Ee(t,e,o){throw o.input!==void 0&&o.index!==void 0&&(o=o.input),new Error('Cannot parse string "'+(o.length>128?o.length.slice(0,128)+"…":o)+'"')}function Se(t,e,o){let r=-1;for(;++r<o.length;)e=o[r]!==void 0&&t[r]?t[r](e,o):e;return t.done?t.done(e,o):t.close?t.close(e,o):e}function Te(t,e,o,r){let i=Z(t,s=>Se(e,o,s),r);return i===void 0?e.catch?e.catch(o,r):Ee(t,e,r):i}var bt=v(Te,!0);var tt=m;var E=Symbol("internals"),D=Symbol("shadow"),yt=Object.defineProperties,Me={a:HTMLAnchorElement,dl:HTMLDListElement,p:HTMLParagraphElement,br:HTMLBRElement,fieldset:HTMLFieldSetElement,hr:HTMLHRElement,img:HTMLImageElement,li:HTMLLIElement,ol:HTMLOListElement,optgroup:HTMLOptGroupElement,q:HTMLQuoteElement,textarea:HTMLTextAreaElement,td:HTMLTableCellElement,th:HTMLTableCellElement,tr:HTMLTableRowElement,tbody:HTMLTableSectionElement,thead:HTMLTableSectionElement,tfoot:HTMLTableSectionElement,ul:HTMLUListElement},Be={name:{set:function(t){return this.setAttribute("name",t)},get:function(){return this.getAttribute("name")||""}},form:{get:function(){return this[E].form}},labels:{get:function(){return this[E].labels}},validity:{get:function(){return this[E].validity}},validationMessage:{get:function(){return this[E].validationMessage}},willValidate:{get:function(){return this[E].willValidate}},checkValidity:{value:function(){return this[E].checkValidity()}},reportValidity:{value:function(){return this[E].reportValidity()}}},ke={},vt={once:!0},Le=0,xt=!1;function Oe(t){return Me[t]||window["HTML"+t[0].toUpperCase()+t.slice(1)+"Element"]||(()=>{throw new Error('Constructor not found for tag "'+t+'"')})()}var Ae=bt(/^\s*<?([a-z][\w]*-[\w]+)>?\s*$|^\s*<?([a-z][\w]*)\s+is=["']?([a-z][\w]*-[\w]+)["']?>?\s*$/,{1:(t,e)=>({name:e[1]}),2:(t,e)=>({name:e[3],tag:e[2]}),catch:function(t,e){throw new SyntaxError(`dom element() – name must be of the form 'element-name' or 'tag is="element-name"' (`+e+")")}},null);function Pe(t,e){if(t.hasOwnProperty(e)){let o=t[e];delete t[e],t[e]=o}return t}function Fe(t,e,o){t._initialLoad=!0;let r=t.attachShadow({mode:e.mode||"closed",delegatesFocus:e.focusable||!1});if(o){let i=T("link",{rel:"stylesheet",href:o});r.append(i)}return t[D]=r,r}function De(t){var e;if(t.attachInternals){if(e=t.attachInternals(),e.setFormValue)return e}else e={shadowRoot:t.shadowRoot};return e.input=T("input",{type:"hidden",name:t.name}),t.appendChild(e.input),e.setFormValue=function(o){this.input.value=o},e}function Ce(t){t._initialAttributes={},t._n=0}function Ve(t,e,o){let r=t._initialAttributes;for(;t._n<e.length&&r[e[t._n]]!==void 0;)o[e[t._n]].call(t,r[e[t._n]]),++t._n}function Et(t,e,o){if(!t._initialAttributes)return;let r=t._initialAttributes;for(;t._n<e.length;)r[e[t._n]]!==void 0&&o[e[t._n]]&&o[e[t._n]].call(t,r[e[t._n]]),++t._n;delete t._initialAttributes,delete t._n}function je(t){return!!t.attribute}function He(t){return t.set||t.get||t.hasOwnProperty("value")}function St(t,e){return je(e[1])&&(t.attributes[e[0]]=e[1].attribute),He(e[1])&&(t.properties[e[0]]=e[1]),t}function et(t,e,o,r){let{name:i,tag:s}=Ae(t),p=typeof s=="string"?Oe(s):HTMLElement,{attributes:c,properties:b}=o?Object.entries(o).reduce(St,{attributes:{},properties:{}}):e.properties?Object.entries(e.properties).reduce(St,{attributes:{},properties:{}}):ke;function h(){let u=Reflect.construct(p,arguments,h),f=e.construct&&e.construct.length>Le?Fe(u,e,r||e.stylesheet):void 0,g=h.formAssociated&&De(u);return s&&(xt=!0),e.construct&&e.construct.call(u,f,g),c&&(Ce(u),Promise.resolve(1).then(function(){Et(u,h.observedAttributes,c)})),b&&Object.keys(b).reduce(Pe,u),u}return h.prototype=Object.create(p.prototype,b),b&&b.value&&(h.formAssociated=!0,yt(h.prototype,Be),(e.enable||e.disable)&&(h.prototype.formDisabledCallback=function(u){return u?e.disable&&e.disable.call(this,this[D],this[E]):e.enable&&e.enable.call(this,this[D],this[E])}),e.reset&&(h.prototype.formResetCallback=function(){return e.reset.call(this,this[D],this[E])}),e.restore&&(h.prototype.formStateRestoreCallback=function(){return e.restore.call(this,this[D],this[E])})),c&&(h.observedAttributes=Object.keys(c),h.prototype.attributeChangedCallback=function(u,f,g){if(!this._initialAttributes)return c[u].call(this,g);this._initialAttributes[u]=g,Ve(this,h.observedAttributes,c)}),h.prototype.connectedCallback=function(){let u=this,f=u[D],g=u[E];if(u._initialAttributes&&Et(u,h.observedAttributes,c),u._initialLoad){let L=f.querySelectorAll('link[rel="stylesheet"]');if(L.length){let R=0,l=L.length,w=function(fe){++R>=L.length&&(delete u._initialLoad,e.load&&(tt("element()","loaded",Array.from(L).map(he=>he.href).join(`
`)),e.load.call(u,f)))},W=w;for(;l--;)L[l].addEventListener("load",w,vt),L[l].addEventListener("error",W,vt);e.connect&&e.connect.call(this,f,g)}else e.connect&&e.connect.call(this,f,g),e.load&&e.load.call(this,f,g)}else e.connect&&e.connect.call(this,f,g)},e.disconnect&&(h.prototype.disconnectedCallback=function(){return e.disconnect.call(this,this[D],this[E])}),tt("element()","<"+(s?s+" is="+i:i)+">"),window.customElements.define(i,h,s&&{extends:s}),s&&!xt&&document.querySelectorAll('[is="'+i+'"]').forEach(u=>{o&&yt(u,o),e.construct&&e.construct.apply(u);let f;for(f in c){let g=u.attributes[f];g&&c[f].call(u,g.value)}e.connect&&e.connect.apply(u)}),h}var nt=Symbol("privates");function y(t){return t[nt]||Object.defineProperty(t,nt,{value:{}})[nt]}function ot(t,e,o){return o>e?e:o<t?t:o}var so=v(ot);var _e=Object.freeze;function Tt(){return this}var O=_e({shift:m,push:m,forEach:m,join:function(){return""},map:Tt,filter:Tt,includes:function(){return!1},reduce:function(t,e){return e},length:0,each:m,pipe:F,start:m,stop:m,done:m,valueOf:function(){return null}});function rt(){return this}function Mt(t,e){t.remove&&t.remove(e);let o;for(;(o=t.indexOf(e))!==-1;)t.splice(o,1);return e}var ho=v(Mt,!0);function it(t){return t&&t[Symbol.iterator]}var Ge=Object.assign;function Ue(t){return t.stop?t.stop():t()}function j(){}Ge(j.prototype,{stop:function(){let t=this.stopables;return this.stopables=void 0,t&&t.forEach(Ue),this},done:function(t){return(this.stopables||(this.stopables=[])).push(t),this}});var B=Object.assign,A=Object.create;function st(t,e){t[0]=e,e.done(t)}function d(t,e){t&&t.push(e)}function M(t){j.prototype.stop.apply(t);let e=-1,o;for(;o=t[++e];)t[e]=void 0,o.stop()}function a(t){this.input=t}B(a.prototype,j.prototype,{push:function(t){d(this[0],t)},pipe:function(t){if(this[0])throw new Error("Stream: Attempt to .pipe() a unicast stream multiple times. Create a multicast stream with stream.broadcast().");return this[0]=t,t.done(this),this.input.pipe(this),t},map:function(t){return new Bt(this,t)},filter:function(t){return new kt(this,t)},split:function(t){return new Ot(this,t)},flatMap:function(t){return new Lt(this,t)},take:function(t){return new At(this,t)},each:function(t){return this.pipe(new Dt(t))},reduce:function(t,e){return this.pipe(new Pt(t,e)).value},scan:function(t,e){return new Ft(this,t,e)},stop:function(){return M(this),this}});function Bt(t,e){this.input=t,this.fn=e}Bt.prototype=B(A(a.prototype),{push:function(e){let r=this.fn(e);r!==void 0&&d(this[0],r)}});function kt(t,e){this.input=t,this.fn=e}kt.prototype=B(A(a.prototype),{push:function(e){this.fn(e)&&d(this[0],e)}});function Lt(t,e){this.input=t,this.fn=e}Lt.prototype=B(A(a.prototype),{push:function(e){let r=this.fn(e);if(r!==void 0)if(it(r))for(let i of r)d(this[0],i);else throw new Error("Stream: Cannot .flatMap() non-iterable values")}});function Ot(t,e){this.input=t,this.chunk=[],typeof n=="number"?this.n=e:this.fn=e}Ot.prototype=B(A(a.prototype),{fn:function(){return this.chunk.length===this.n},push:function(e){let o=this.chunk;this.fn(e)?(d(this[0],o),this.chunk=[]):o.push(e)}});function At(t,e){this.input=t,this.count=e}At.prototype=B(A(a.prototype),{push:function(e){this[0].push(e),--this.count||this.stop()}});var Ie=0;function Pt(t,e){this.fn=t,this.value=e,this.i=0,this.n=++Ie}Pt.prototype=B(A(a.prototype),{push:function(t){let e=this.fn;this.value=e(this.value,t,this.i++,this)}});function Ft(t,e,o){this.input=t,this.fn=e,this.value=o}Ft.prototype=B(A(a.prototype),{push:function(t){let e=this.fn;this.value=e(this.value,t),this[0].push(this.value)}});function Dt(t){this.push=t}Dt.prototype=B(A(a.prototype),{each:null,reduce:null,pipe:null});var Re=Object.assign,Ne=Object.create;function ze(t,e){if(t[1]){let o=-1;for(;t[++o]&&t[o]!==e;);for(;t[o++];)t[o-1]=t[o]}else t.stop()}function H(t,e){a.apply(this,arguments),this.memory=!!(e&&e.memory),e&&e.hot&&this.pipe(O)}H.prototype=Re(Ne(a.prototype),{push:function(t){if(t===void 0)return;this.memory&&(this.value=t);let e=-1;for(;this[++e];)this[e].push(t)},pipe:function(t){let e=-1;for(;this[++e];);return this.memory&&e===0&&this.input.pipe(this),this[e]=t,t.done(()=>ze(this,t)),this.value!==void 0&&t.push(this.value),!this.memory&&e===0&&this.input.pipe(this),t}});var $e=Array.prototype,Ke=Object.assign,qe=Object.create;function Qe(t){return t!==void 0}function _(t){this.buffer=t?t.filter?t.filter(Qe):t:[]}_.prototype=Ke(qe(a.prototype),{push:function(t){t!==void 0&&d(this.buffer,t)},pipe:function(t){for(t.done(this),this[0]=t;this.buffer.length;)d(this[0],$e.shift.apply(this.buffer));return this.buffer=t,t},stop:function(){return this.buffer=void 0,M(this),this}});var Ct=Object.assign,Je=Object.create,We=Promise.resolve(),Xe={schedule:function(){We.then(this.fire)},unschedule:m},Ye={schedule:function(){this.timer=requestAnimationFrame(this.fire)},unschedule:function(){cancelAnimationFrame(this.timer),this.timer=void 0}},Ze={schedule:function(){this.timer=setTimeout(this.fire,this.duration*1e3)},unschedule:function(){clearTimeout(this.timer),this.timer=void 0}};function C(t,e){a.apply(this,arguments),this.duration=e,this.timer=void 0,this.fire=()=>{this.timer=void 0,this.output.stop()},Ct(this,e==="tick"?Xe:e==="frame"?Ye:Ze)}C.prototype=Ct(Je(a.prototype),{push:function(t){this.timer?(this.unschedule(),this.schedule(),this.output.push(t)):(this.output=a.of(t),this[0].push(this.output),this.schedule())},stop:function(){return this.timer&&this.fire(),a.prototype.stop.apply(this,arguments)}});var ut=Object.assign,tn=Object.create,Vt=Object.keys;function at(t,e,o,r,i){this.stream=t,this.names=e,this.values=o,this.name=r,this.input=i}ut(at.prototype,{push:function(t){let e=this.stream,o=this.values,r=this.name;o[r]=t,(e.active||(e.active=Vt(o).length===this.names.length))&&d(e[0],ut({},o))},stop:function(){--this.stream.count===0&&M(this.stream)},done:function(t){this.stream.done(t)}});function $(t){this.inputs=t,this.active=!1}$.prototype=ut(tn(a.prototype),{push:null,pipe:function(t){let e=this.inputs,o=Vt(e),r={};this.count=o.length,this[0]=t,t.done(this);let i;for(i in e){let s=e[i];if(s.pipe){let p=new at(this,o,r,i,s);s.pipe(p)}else if(s.then){let p=new at(this,o,r,i,s);s.then(c=>p.push(c)),s.finally(()=>p.stop())}else r[i]=s,--this.count}return t}});var jt=Object.assign,en=Object.create;function Ht(t){this.stream=t}jt(Ht.prototype,{push:function(t){d(this.stream[0],t)},stop:function(){--this.stream.count===0&&M(this.stream)},done:function(t){this.stream.done(t)}});function K(t){this.inputs=t}K.prototype=jt(en(a.prototype),{push:null,pipe:function(t){let e=this.inputs;this.count=e.length,this[0]=t,t.done(this);let o=new Ht(this),r=-1,i;for(;i=e[++r];)if(i.pipe)i.pipe(o);else if(i.then)i.then(s=>o.push(s)),i.finally(()=>o.stop());else{let s=-1;for(;++s<i.length;)o.push(i[s]);o.stop()}return t}});var nn=Object.assign,on=Object.create;function q(t){this.promise=t}q.prototype=nn(on(a.prototype),{push:null,pipe:function(t){let e=this.promise;return this[0]=t,t.done(this),e.then(o=>d(this,o)),e.finally(()=>M(this)),t}});var rn=Array.prototype,_t=Object.assign;function sn(t){throw new TypeError("Stream cannot be created from "+typeof object)}_t(a,{of:function(){return new _(rn.slice.apply(arguments))},from:function(t){return t.pipe?new a(t):t.then?new q(t):typeof t.length=="number"?new _(t):sn(t)},batch:t=>new C(O,t),burst:t=>(console.warn("Stream.burst() is now Stream.batch()"),new C(O,t)),broadcast:t=>new H(O,t),combine:t=>new $(t),merge:function(){return new K(arguments)}});_t(a.prototype,{log:rt,batch:function(t){return new C(this,t)},burst:function(t){return console.warn("stream.burst() is now stream.batch()"),new C(this,t)},broadcast:function(t){return new H(this,t)}});var un=Object.assign,an=/\s+/,Gt={fullscreenchange:"fullscreenElement"in document?"fullscreenchange":"webkitFullscreenElement"in document?"webkitfullscreenchange":"fullscreenchange"};var Ut=0;window.addEventListener("click",t=>Ut=t.timeStamp);function cn(t,e){return t.node.addEventListener(Gt[e]||e,t,t.options),t}function pn(t,e){return t.node.removeEventListener(Gt[e]||e,t),t}function It(t,e,o){this.types=t.split(an),this.options=e,this.node=o,this.select=e&&e.select}un(It.prototype,{pipe:function(t){st(this,t),this.types.reduce(cn,this)},handleEvent:function(t){if(!(t.type==="click"&&t.timeStamp<=Ut)){if(this.select){let e=t.target.closest(this.select);if(!e)return;t.selectedTarget=e}d(this[0],t)}},stop:function(){this.types.reduce(pn,this),M(this[0])}});function G(t,e){let o;return typeof t=="object"&&(o=t,t=o.type),new a(new It(t,o,e))}var ln=Object.assign,U={bubbles:!0,cancelable:!0};function fn(t,e){var h;let o=U,r,i,s,p,c,b;return typeof t=="object"?(h=t,{type:t,detail:i,bubbles:s,cancelable:p,composed:c}=h,r=mt(h,["type","detail","bubbles","cancelable","composed"]),b=ln(new CustomEvent(t,{detail:i,bubbles:s||U.bubbles,cancelable:p||U.cancelable,composed:c||U.composed}),r)):b=new CustomEvent(t,U),e.dispatchEvent(b)}var ct=v(fn,!0);function pt(t){return Math.pow(2,t/6)}function P(t){if(!t)return 0;let e=+t;if(e||e===0)return e;let o=/^(?:(-?[\d.]+)|(-?∞))(?:(db|bpm)|(m|k)?(\w+))$/.exec(t.toLowerCase());if(!o)return 0;let r=o[2]?o[2]==="-∞"?-1/0:1/0:parseFloat(o[1]);return o[3]==="db"?pt(r):o[3]==="bpm"?r/60:o[4]==="m"?r/1e3:o[4]==="k"?r*1e3:r}function hn(t,e){let o=t[t.length-1];return o&&!/^-?\d/.test(e)?o.label=e:t.push({label:e,value:P(e)}),t}function I(t){let e=t.trim();return e?e.split(/\s*,\s*|\s+/).reduce(hn,[]):null}function Rt(t,e){let o=t.length,r=1/0,i;for(;o--;){let s=Math.abs(e-t[o].normalValue);s<r&&(r=s,i=t[o])}return i}function Nt(t,e){let o=t.length;for(;t[--o]&&t[o].unitValue>=e;);return t[o]||t[0]}function zt(t,e){let o=-1;for(;t[++o]&&t[o].unitValue<=e;);return t[o]||t[t.length-1]}function $t(t,e,o,r){return t.normalValue=e.normalise(o,r,t.value),t}function Kt(t,e,o,r,i,s,p){return t.scale=e,t.min=o,t.max=r,t.ticks=(i||(p?generateTicks(p,o,r):O)).filter(c=>c.value>=t.min&&c.value<=t.max).map(c=>$t(c,e,o,r)),t.step=s==="any"?void 0:s==="tick"?t.ticks:I(s).filter(c=>c.value>=t.min&&c.value<=t.max).map(c=>$t(c,e,o,r)),t.display=p,t}function qt(t,e,o,r,i){if(t.value=ot(o,r,i),t.normalValue=e.normalise(o,r,t.value),t.step){let s=Rt(t.step,t.normalValue);t.value=s.value,t.normalValue=s.normalValue}return t}var Qt=.00390625;var Jt=.0009765625,Wt=.00048828125,Xt=.000244140625;var Yt=1525878906e-14;var cr=Symbol("state");var Zt=Object.assign,J={};function lt(t,e,o){let r=o/(e*t);return(r<=1?r:Math.log(r)+1)/J[t]}function wn(t,e,o){let r=o*J[t];return e*t*(r<=1?r:Math.pow(Math.E,r-1))}function k(t){this.xover=t,J[t]||(J[t]=Math.log(1/t)+1)}Zt(k.prototype,{normalise:function(t,e,o){let r=lt(this.xover,e,t);return(lt(this.xover,e,o)-r)/(1-r)},denormalise:function(t,e,o){let r=lt(this.xover,e,t),i=o*(1-r)+r;return wn(this.xover,e,i)}});function Q(t){this.power=t}Zt(Q.prototype,{normalise:function(t,e,o){return Math.pow((o-t)/(e-t),1/this.power)},denormalise:function(t,e,o){return Math.pow(o,this.power)*(e-t)+t}});var bn={linear:{normalise:function(t,e,o){return(o-t)/(e-t)},denormalise:function(t,e,o){return t+o*(e-t)}},"pow-2":new Q(2),"pow-3":new Q(3),"pow-4":new Q(4),log:{normalise:function(t,e,o){return Math.log(o/t)/Math.log(e/t)},denormalise:function(t,e,o){return t*Math.pow(e/t,o)}},"log-24db":new k(.0625),"log-30db":new k(.03125),"log-36db":new k(.015625),"log-48db":new k(Qt),"log-60db":new k(Jt),"log-66db":new k(Wt),"log-72db":new k(Xt),"log-96db":new k(Yt)};function te(t){return bn[t&&t.toLowerCase()||"linear"]}var yn=.9965784284662086;function ft(t){return 20*Math.log10(t)*yn}function ee(t,e){return{unit:e<1?"m"+t:e>=1e3?"k"+t:t,value:e<.001?(e*1e3).toFixed(2):e<1?(e*1e3).toPrecision(3):e>=1e3?(e/1e3).toPrecision(3):e.toPrecision(3)}}var ne=S(t=>t.toLowerCase(),{pan:(t,e)=>({unit:"",value:e===-1?"-1.00":e===0?"0.00":e===1?"1.00":e.toFixed(2)}),db:(t,e)=>{let o=ft(e);return{unit:"dB",value:isFinite(o)?o<-1?o.toPrecision(3):o.toFixed(2):o<0?"-∞":"∞"}},hz:(t,e)=>({unit:e>=1e3?"kHz":"Hz",value:e<1?e.toFixed(2):e>=1e3?(e/1e3).toPrecision(3):e.toPrecision(3)}),semitone:(t,e)=>({unit:"",value:e===0?"0":e<0?"♭"+(-e/100).toFixed(2):"♯"+(e/100).toFixed(2)}),s:ee,bpm:(t,e)=>{let o=e*60;return{unit:"bpm",value:o<100?o.toFixed(1):o.toFixed(0)}},int:(t,e)=>({unit:"",value:Math.round(e)}),"":(t,e)=>({unit:"",value:e>-1&&e<1?e.toFixed(2):e.toPrecision(3)}),default:ee});function vn(t,e){return e[t]}var oe=v(vn,!0);var re=S(oe("keyCode"),{38:(t,e,o,r,i,s)=>{if(t.preventDefault(),i)return zt(i,s).value;let p=t.shiftKey?10:1;return e.denormalise(o,r,(Math.round(100*s)+p)*.01)},40:(t,e,o,r,i,s)=>{if(t.preventDefault(),i)return Nt(i,s).value;let p=t.shiftKey?10:1;return e.denormalise(o,r,(Math.round(100*s)-p)*.01)},default:m});var ie="linear";var se="",ue="any",ae="";var Gr=import.meta.url.replace(/\/[^\/]*([?#].*)?$/,"/");function Mn(t){let e=t.target.closest('[name="value"]');return parseFloat(e.value)}function Bn(t,e){return t.push(T("button",{type:"button",part:"tick",name:"value",value:e.value,style:"--normal-value: "+e.normalValue+";",text:e.label})),t}function kn(t,e,o,r,i,s,p){t.setProperty("--normal-zero",e.normalise(o,r,0)),s.forEach(c=>c.remove()),s.length=0,s=i.reduce(Bn,s),p.after.apply(p,s)}function Ln(t,e,o,r,i,s,p,c){e.value=c;let b=ne(s,p);r.textContent=b.value,i.textContent=b.unit,o.setFormValue(p)}var ce={mode:"closed",focusable:!0,construct:function(t,e){let o=T("style",":host {} :host > * { visibility: hidden; }"),r=T("label",{for:"input",html:"<slot></slot>",part:"label"}),i=T("input",{type:"range",id:"input",name:"unit-value",min:"0",max:"1",step:"any"}),s=T("text"),p=T("abbr"),c=T("output",{children:[s,p],part:"output"}),b=T("text",""),h=[];t.append(o,r,i,c,b);let u=y(this),f={},g=o.sheet.cssRules[0].style,L=o.sheet.cssRules[1].style;u.host=this,u.shadow=t,u.hostStyle=g,u.childStyle=L,u.internals=e,u.data=f,u.shadow=new Promise(l=>u.load=l),u.scale=a.of(ie),u.min=a.of(0),u.max=a.of(1),u.step=a.of(ue),u.ticks=a.of(se),u.display=a.of(ae),u.value=a.of(0);let R=a.combine({shadow:u.shadow,scale:u.scale.map(te),min:u.min.map(P),max:u.max.map(P),ticks:u.ticks.map(I),display:u.display,step:u.step}).scan((l,w)=>Kt(l,w.scale,w.min,w.max,w.ticks,w.step,w.display),f).broadcast();R.each(l=>kn(g,l.scale,l.min,l.max,l.ticks,h,b)),a.combine({data:R,value:u.value}).scan((l,w)=>qt(l,w.data.scale,w.data.min,w.data.max,w.value),f).each(l=>Ln(g,i,e,s,p,l.display,l.value,l.normalValue)),G({type:"pointerdown",select:'[name="value"]'},t).map(Mn).each(l=>{u.value.push(l),ct("input",this)}),G("input",t).each(l=>{let w=parseFloat(l.target.value),W=f.scale.denormalise(f.min,f.max,w);u.value.push(W)}),G("keydown",this).filter(()=>document.activeElement===this||this.contains(document.activeElement)).map(l=>re(l,f.scale,f.min,f.max,f.step,f.normalValue)).each(l=>{u.value.push(l),ct("input",this)})},load:function(t){let e=y(this);e.childStyle.visibility="",e.load(t)}};var pe={type:{value:"number",enumerable:!0},min:{attribute:function(t){this.min=t},set:function(t){y(this).min.push(t)},get:function(){return y(this).data.min},enumerable:!0},max:{attribute:function(t){this.max=t},set:function(t){y(this).max.push(t)},get:function(){return y(this).data.max},enumerable:!0},scale:{attribute:function(t){y(this).scale.push(t||"linear")}},display:{attribute:function(t){y(this).display.push(t||"")}},ticks:{attribute:function(t){y(this).ticks.push(t)}},step:{attribute:function(t){y(this).step.push(t)}},value:{attribute:function(t){this.value=t},get:function(){return y(this).data.value},set:function(t){y(this).value.push(P(t))},enumerable:!0}};var On=window.rangeInputStylesheet||import.meta.url.replace(/\/[^\/]*([?#].*)?$/,"/")+"range-input-shadow.css",qr=et("<range-input>",ce,pe,On);export{qr as default};
