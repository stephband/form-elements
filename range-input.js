/* form-elements 
   0.0.4
   By Stephen Band
   Built 2022-08-31 23:49 */

var dt=Object.getOwnPropertySymbols;var ye=Object.prototype.hasOwnProperty,xe=Object.prototype.propertyIsEnumerable;var gt=(t,e)=>{var o={};for(var r in t)ye.call(t,r)&&e.indexOf(r)<0&&(o[r]=t[r]);if(t!=null&&dt)for(var r of dt(t))e.indexOf(r)<0&&xe.call(t,r)&&(o[r]=t[r]);return o};function M(t){return t}function w(t,e){return function(){let r=t.apply(this,arguments),i=e[r]||e.default;if(!i)throw new Error('overload() no handler for "'+r+'"');return i.apply(this,arguments)}}function N(t){var e=new Map;return function(r){if(e.has(r))return e.get(r);var i=t(r);return e.set(r,i),i}}var ve=Array.prototype;function Ee(t,e){return typeof t=="function"?t.apply(null,e):t}function wt(t,e,o){o=o||t.length;var r=o===1?e?t:N(t):N(function(i){return wt(function(){var s=[i];return s.push.apply(s,arguments),t.apply(null,s)},e,o-1)});return function i(s){return arguments.length===0?i:arguments.length===1?r(s):arguments.length>=o?t.apply(null,arguments):Ee(r(s),ve.slice.call(arguments,1))}}var y=wt;function d(){}var Be=w(M,{is:d,tag:d,data:function(t,e,o){Object.assign(e.dataset,o)},html:function(t,e,o){e.innerHTML=o},text:function(t,e,o){e.textContent=o},children:function(t,e,o){e.innerHTML="",e.append.apply(e,o)},points:C,cx:C,cy:C,r:C,preserveAspectRatio:C,transform:C,viewBox:C,default:function(t,e,o){t in e?e[t]=o:e.setAttribute(t,o)}});function C(t,e,o){e.setAttribute(t,o)}function Se(t,e){for(var o=Object.keys(e),r=o.length;r--;)Be(o[r],t,e[o[r]]);return t}var z=y(Se,!0);var X="http://www.w3.org/2000/svg",bt=document.createElement("div"),Y=(t,e)=>e&&typeof e;function yt(t,e){let o=document.createRange();return o.selectNode(t),o.createContextualFragment(e)}var v=w(Y,{string:function(t,e){let o=document.createElementNS(X,t);return o.innerHTML=e,o},object:function(t,e){let o=document.createElementNS(X,t);return typeof e.length=="number"?o.append.apply(o,e):z(o,e),o},default:t=>document.createElementNS(X,t)}),Te=w(Y,{string:function(t,e){let o=document.createElement(t);return o.innerHTML=e,o},object:function(t,e){let o=document.createElement(t);return typeof e.length=="number"?o.append.apply(o,e):z(o,e),o},default:t=>document.createElement(t)}),Me=w(M,{comment:function(t,e){return document.createComment(e||"")},fragment:w(Y,{string:function(t,e,o){if(o)return yt(o,e);let r=document.createDocumentFragment();bt.innerHTML=e;let i=bt.childNodes;for(;i[0];)r.appendChild(i[0]);return r},object:function(t,e,o){let r=o?yt(o):document.createDocumentFragment();return typeof e.length=="number"?r.append.apply(r,e):z(r,e),r},default:()=>document.createDocumentFragment()}),text:function(t,e){return document.createTextNode(e||"")},circle:v,ellipse:v,g:v,glyph:v,image:v,line:v,rect:v,use:v,path:v,pattern:v,polygon:v,polyline:v,svg:v,default:Te}),B=Me;function Z(t,e,o){let r;typeof o!="string"&&o.input!==void 0&&o.index!==void 0&&(r=o,o=r.input.slice(o.index+o[0].length+(o.consumed||0)));let i=t.exec(o);if(!i)return;let s=e(i);return r&&(r.consumed=(r.consumed||0)+i.index+i[0].length+(i.consumed||0)),s}var to=y(Z,!0);function ke(t,e,o){throw o.input!==void 0&&o.index!==void 0&&(o=o.input),new Error('Cannot parse string "'+(o.length>128?o.length.slice(0,128)+"…":o)+'"')}function Le(t,e,o){let r=-1;for(;++r<o.length;)e=o[r]!==void 0&&t[r]?t[r](e,o):e;return t.done?t.done(e,o):t.close?t.close(e,o):e}function Ae(t,e,o,r){let i=Z(t,s=>Le(e,o,s),r);return i===void 0?e.catch?e.catch(o,r):ke(t,e,r):i}var xt=y(Ae,!0);var tt=d;var E=Symbol("internals"),D=Symbol("shadow"),vt=Object.defineProperties,Oe={a:HTMLAnchorElement,article:HTMLElement,dl:HTMLDListElement,p:HTMLParagraphElement,br:HTMLBRElement,fieldset:HTMLFieldSetElement,hr:HTMLHRElement,img:HTMLImageElement,li:HTMLLIElement,ol:HTMLOListElement,optgroup:HTMLOptGroupElement,q:HTMLQuoteElement,section:HTMLElement,textarea:HTMLTextAreaElement,td:HTMLTableCellElement,th:HTMLTableCellElement,tr:HTMLTableRowElement,tbody:HTMLTableSectionElement,thead:HTMLTableSectionElement,tfoot:HTMLTableSectionElement,ul:HTMLUListElement},Pe={name:{set:function(t){return this.setAttribute("name",t)},get:function(){return this.getAttribute("name")||""}},form:{get:function(){return this[E].form}},labels:{get:function(){return this[E].labels}},validity:{get:function(){return this[E].validity}},validationMessage:{get:function(){return this[E].validationMessage}},willValidate:{get:function(){return this[E].willValidate}},checkValidity:{value:function(){return this[E].checkValidity()}},reportValidity:{value:function(){return this[E].reportValidity()}}},Fe={},Et={once:!0},Ce=0,Bt=!1;function De(t){return Oe[t]||window["HTML"+t[0].toUpperCase()+t.slice(1)+"Element"]||(()=>{throw new Error('Constructor not found for tag "'+t+'"')})()}var He=xt(/^\s*<?([a-z][\w]*-[\w]+)>?\s*$|^\s*<?([a-z][\w]*)\s+is=["']?([a-z][\w]*-[\w]+)["']?>?\s*$/,{1:(t,e)=>({name:e[1]}),2:(t,e)=>({name:e[3],tag:e[2]}),catch:function(t,e){throw new SyntaxError(`dom element() – name must be of the form 'element-name' or 'tag is="element-name"' (`+e+")")}},null);function Ve(t,e){if(t.hasOwnProperty(e)){let o=t[e];delete t[e],t[e]=o}return t}function je(t,e,o){t._initialLoad=!0;let r=t.attachShadow({mode:e.mode||"closed",delegatesFocus:e.focusable||!1});if(o){let i=B("link",{rel:"stylesheet",href:o});r.append(i)}return t[D]=r,r}function _e(t){var e;if(t.attachInternals){if(e=t.attachInternals(),e.setFormValue)return e}else e={shadowRoot:t.shadowRoot};return e.input=B("input",{type:"hidden",name:t.name}),t.appendChild(e.input),e.setFormValue=function(o){this.input.value=o},e}function Ge(t){t._initialAttributes={},t._n=0}function Ue(t,e,o){let r=t._initialAttributes;for(;t._n<e.length&&r[e[t._n]]!==void 0;)o[e[t._n]].call(t,r[e[t._n]]),++t._n}function St(t,e,o){if(!t._initialAttributes)return;let r=t._initialAttributes;for(;t._n<e.length;)r[e[t._n]]!==void 0&&o[e[t._n]]&&o[e[t._n]].call(t,r[e[t._n]]),++t._n;delete t._initialAttributes,delete t._n}function Ie(t){return!!t.attribute}function Re(t){return t.set||t.get||t.hasOwnProperty("value")}function Tt(t,e){return Ie(e[1])&&(t.attributes[e[0]]=e[1].attribute),Re(e[1])&&(t.properties[e[0]]=e[1]),t}function et(t,e,o,r){let{name:i,tag:s}=He(t),c=typeof s=="string"?De(s):HTMLElement,{attributes:l,properties:f}=o?Object.entries(o).reduce(Tt,{attributes:{},properties:{}}):e.properties?Object.entries(e.properties).reduce(Tt,{attributes:{},properties:{}}):Fe;function m(){let u=Reflect.construct(c,arguments,m),h=e.construct&&e.construct.length>Ce?je(u,e,r||e.stylesheet):void 0,b=m.formAssociated&&_e(u);return s&&(Bt=!0),e.construct&&e.construct.call(u,h,b),l&&(Ge(u),Promise.resolve(1).then(function(){St(u,m.observedAttributes,l)})),f&&Object.keys(f).reduce(Ve,u),u}return m.prototype=Object.create(c.prototype,f),f&&f.value&&(m.formAssociated=!0,vt(m.prototype,Pe),(e.enable||e.disable)&&(m.prototype.formDisabledCallback=function(u){return u?e.disable&&e.disable.call(this,this[D],this[E]):e.enable&&e.enable.call(this,this[D],this[E])}),e.reset&&(m.prototype.formResetCallback=function(){return e.reset.call(this,this[D],this[E])}),e.restore&&(m.prototype.formStateRestoreCallback=function(){return e.restore.call(this,this[D],this[E])})),l&&(m.observedAttributes=Object.keys(l),m.prototype.attributeChangedCallback=function(u,h,b){if(!this._initialAttributes)return l[u].call(this,b);this._initialAttributes[u]=b,Ue(this,m.observedAttributes,l)}),m.prototype.connectedCallback=function(){let u=this,h=u[D],b=u[E];if(u._initialAttributes&&St(u,m.observedAttributes,l),u._initialLoad){let p=h.querySelectorAll('link[rel="stylesheet"]');if(p.length){let A=0,j=p.length,mt=function(we){++A>=p.length&&(delete u._initialLoad,e.load&&(tt("element()","loaded",Array.from(p).map(be=>be.href).join(`
`)),e.load.call(u,h)))},de=mt;for(;j--;)p[j].addEventListener("load",mt,Et),p[j].addEventListener("error",de,Et);e.connect&&e.connect.call(this,h,b)}else e.connect&&e.connect.call(this,h,b),e.load&&e.load.call(this,h,b)}else e.connect&&e.connect.call(this,h,b)},e.disconnect&&(m.prototype.disconnectedCallback=function(){return e.disconnect.call(this,this[D],this[E])}),tt("element()","<"+(s?s+" is="+i:i)+">"),window.customElements.define(i,m,s&&{extends:s}),s&&!Bt&&document.querySelectorAll('[is="'+i+'"]').forEach(u=>{o&&vt(u,o),e.construct&&e.construct.apply(u);let h;for(h in l){let b=u.attributes[h];b&&l[h].call(u,b.value)}e.connect&&e.connect.apply(u)}),m}var nt=Symbol("privates");function T(t){return t[nt]||Object.defineProperty(t,nt,{value:{}})[nt]}function ot(t,e,o){return o>e?e:o<t?t:o}var ho=y(ot);var Ne=Object.freeze;function Mt(){return this}var O=Ne({shift:d,push:d,forEach:d,join:function(){return""},map:Mt,filter:Mt,includes:function(){return!1},reduce:function(t,e){return e},length:0,each:d,pipe:M,start:d,stop:d,done:d,valueOf:function(){return null}});function rt(){return this}function kt(t,e){t.remove&&t.remove(e);let o;for(;(o=t.indexOf(e))!==-1;)t.splice(o,1);return e}var vo=y(kt,!0);function it(t){return t&&t[Symbol.iterator]}var ze=Object.assign;function $e(t){return t.stop?t.stop():t()}function _(){}ze(_.prototype,{stop:function(){let t=this.stopables;return this.stopables=void 0,t&&t.forEach($e),this},done:function(t){return(this.stopables||(this.stopables=[])).push(t),this}});var k=Object.assign,P=Object.create;function st(t,e){t[0]=e,e.done(t)}function g(t,e){t&&t.push(e)}function S(t){_.prototype.stop.apply(t);let e=-1,o;for(;o=t[++e];)t[e]=void 0,o.stop()}function a(t){this.input=t}k(a.prototype,_.prototype,{push:function(t){g(this[0],t)},pipe:function(t){if(this[0])throw new Error("Stream: Attempt to .pipe() a unicast stream multiple times. Create a multicast stream with stream.broadcast().");return this[0]=t,t.done(this),this.input.pipe(this),t},map:function(t){return new Lt(this,t)},filter:function(t){return new At(this,t)},split:function(t){return new Pt(this,t)},flatMap:function(t){return new Ot(this,t)},take:function(t){return new Ft(this,t)},each:function(t){return this.pipe(new Ht(t))},reduce:function(t,e){return this.pipe(new Ct(t,e)).value},scan:function(t,e){return new Dt(this,t,e)},stop:function(){return S(this),this}});function Lt(t,e){this.input=t,this.fn=e}Lt.prototype=k(P(a.prototype),{push:function(e){let r=this.fn(e);r!==void 0&&g(this[0],r)}});function At(t,e){this.input=t,this.fn=e}At.prototype=k(P(a.prototype),{push:function(e){this.fn(e)&&g(this[0],e)}});function Ot(t,e){this.input=t,this.fn=e}Ot.prototype=k(P(a.prototype),{push:function(e){let r=this.fn(e);if(r!==void 0)if(it(r))for(let i of r)g(this[0],i);else r.pipe&&this.done(r.each(i=>g(this[0],i)))}});function Pt(t,e){this.input=t,this.chunk=[],typeof n=="number"?this.n=e:this.fn=e}Pt.prototype=k(P(a.prototype),{fn:function(){return this.chunk.length===this.n},push:function(e){let o=this.chunk;this.fn(e)?(g(this[0],o),this.chunk=[]):o.push(e)}});function Ft(t,e){this.input=t,this.count=e}Ft.prototype=k(P(a.prototype),{push:function(e){this[0].push(e),--this.count||this.stop()}});function Ct(t,e){this.fn=t,this.value=e,this.i=0}Ct.prototype=k(P(a.prototype),{push:function(t){let e=this.fn;this.value=e(this.value,t,this.i++,this)}});function Dt(t,e,o){this.input=t,this.fn=e,this.value=o}Dt.prototype=k(P(a.prototype),{push:function(t){let e=this.fn;this.value=e(this.value,t),this[0].push(this.value)}});function Ht(t){this.push=t}Ht.prototype=k(P(a.prototype),{each:null,reduce:null,pipe:null});var Ke=Object.assign,qe=Object.create;function Qe(t,e){if(t[1]){let o=-1;for(;t[++o]&&t[o]!==e;);for(;t[o++];)t[o-1]=t[o]}else t.stop()}function G(t,e){a.apply(this,arguments),this.memory=!!(e&&e.memory),e&&e.hot&&this.pipe(O)}G.prototype=Ke(qe(a.prototype),{push:function(t){if(t===void 0)return;this.memory&&(this.value=t);let e=-1;for(;this[++e];)this[e].push(t)},pipe:function(t){let e=-1;for(;this[++e];);return this.memory&&e===0&&this.input.pipe(this),this[e]=t,t.done(()=>Qe(this,t)),this.value!==void 0&&t.push(this.value),!this.memory&&e===0&&this.input.pipe(this),t}});var Je=Array.prototype,We=Object.assign,Xe=Object.create;function Ye(t){return t!==void 0}function U(t){this.buffer=t?t.filter?t.filter(Ye):t:[]}U.prototype=We(Xe(a.prototype),{push:function(t){t!==void 0&&g(this.buffer,t)},pipe:function(t){for(t.done(this),this[0]=t;this.buffer.length;)g(this[0],Je.shift.apply(this.buffer));return this.buffer=t,t},stop:function(){return this.buffer=void 0,S(this),this}});var Vt=Object.assign,Ze=Object.create,tn=Promise.resolve(),en={schedule:function(){tn.then(this.fire)},unschedule:d},nn={schedule:function(){this.timer=requestAnimationFrame(this.fire)},unschedule:function(){cancelAnimationFrame(this.timer),this.timer=void 0}},on={schedule:function(){this.timer=setTimeout(this.fire,this.duration*1e3)},unschedule:function(){clearTimeout(this.timer),this.timer=void 0}};function H(t,e){a.apply(this,arguments),this.duration=e,this.timer=void 0,this.fire=()=>{this.timer=void 0,this.output.stop()},Vt(this,e==="tick"?en:e==="frame"?nn:on)}H.prototype=Vt(Ze(a.prototype),{push:function(t){this.timer?(this.unschedule(),this.schedule(),this.output.push(t)):(this.output=a.of(t),this[0].push(this.output),this.schedule())},stop:function(){return this.timer&&this.fire(),a.prototype.stop.apply(this,arguments)}});var ut=Object.assign,rn=Object.create,jt=Object.keys;function at(t,e,o,r,i){this.stream=t,this.names=e,this.values=o,this.name=r,this.input=i}ut(at.prototype,{push:function(t){let e=this.stream,o=this.values,r=this.name;o[r]=t,(e.active||(e.active=jt(o).length===this.names.length))&&g(e[0],ut({},o))},stop:function(){--this.stream.count===0&&S(this.stream)},done:function(t){this.stream.done(t)}});function $(t){this.inputs=t,this.active=!1}$.prototype=ut(rn(a.prototype),{push:null,pipe:function(t){let e=this.inputs,o=jt(e),r={};this.count=o.length,this[0]=t,t.done(this);let i;for(i in e){let s=e[i];if(s.pipe){let c=new at(this,o,r,i,s);s.pipe(c)}else if(s.then){let c=new at(this,o,r,i,s);s.then(l=>c.push(l)),s.finally(()=>c.stop())}else r[i]=s,--this.count}return t}});var _t=Object.assign,sn=Object.create;function Gt(t){this.stream=t}_t(Gt.prototype,{push:function(t){g(this.stream[0],t)},stop:function(){--this.stream.count===0&&S(this.stream)},done:function(t){this.stream.done(t)}});function K(t){this.inputs=t}K.prototype=_t(sn(a.prototype),{push:null,pipe:function(t){let e=this.inputs;this.count=e.length,this[0]=t,t.done(this);let o=new Gt(this),r=-1,i;for(;i=e[++r];)if(i.pipe)i.pipe(o);else if(i.then)i.then(s=>o.push(s)),i.finally(()=>o.stop());else{let s=-1;for(;++s<i.length;)o.push(i[s]);o.stop()}return t}});var un=Object.assign,an=Object.create;function q(t){this.promise=t}q.prototype=un(an(a.prototype),{push:null,pipe:function(t){let e=this.promise;return this[0]=t,t.done(this),e.then(o=>g(this,o)),e.finally(()=>S(this)),t}});var cn=Array.prototype,Ut=Object.assign;function pn(t){throw new TypeError("Stream cannot be created from "+typeof object)}Ut(a,{of:function(){return new U(cn.slice.apply(arguments))},from:function(t){return t.pipe?new a(t):t.then?new q(t):typeof t.length=="number"?new U(t):pn(t)},batch:t=>new H(O,t),burst:t=>(console.warn("Stream.burst() is now Stream.batch()"),new H(O,t)),broadcast:t=>new G(O,t),combine:t=>new $(t),merge:function(){return new K(arguments)}});Ut(a.prototype,{log:rt,batch:function(t){return new H(this,t)},burst:function(t){return console.warn("stream.burst() is now stream.batch()"),new H(this,t)},broadcast:function(t){return new G(this,t)}});var ln=Object.assign,fn=/\s+/,It={fullscreenchange:"fullscreenElement"in document?"fullscreenchange":"webkitFullscreenElement"in document?"webkitfullscreenchange":"fullscreenchange"};var Rt=0;window.addEventListener("click",t=>Rt=t.timeStamp);function hn(t,e){return t.node.addEventListener(It[e]||e,t,t.options),t}function mn(t,e){return t.node.removeEventListener(It[e]||e,t),t}function Nt(t,e,o){this.types=t.split(fn),this.options=e,this.node=o,this.select=e&&e.select}ln(Nt.prototype,{pipe:function(t){st(this,t),this.types.reduce(hn,this)},handleEvent:function(t){if(!(t.type==="click"&&t.timeStamp<=Rt)){if(this.select){let e=t.target.closest(this.select);if(!e)return;t.selectedTarget=e}g(this[0],t)}},stop:function(){this.types.reduce(mn,this),S(this[0])}});function I(t,e){let o;return typeof t=="object"&&(o=t,t=o.type),new a(new Nt(t,o,e))}var dn=Object.assign,R={bubbles:!0,cancelable:!0};function Q(t,e){var m;let o=R,r,i,s,c,l,f;return typeof t=="object"?(m=t,{type:t,detail:i,bubbles:s,cancelable:c,composed:l}=m,r=gt(m,["type","detail","bubbles","cancelable","composed"]),f=dn(new CustomEvent(t,{detail:i,bubbles:s||R.bubbles,cancelable:c||R.cancelable,composed:l||R.composed}),r)):f=new CustomEvent(t,R),e.dispatchEvent(f)}var rr=y(Q,!0);function ct(t){return Math.pow(2,t/6)}function F(t){if(!t)return 0;let e=+t;if(e||e===0)return e;let o=/^(?:(-?[\d.]+)|(-?∞))(?:(db|bpm)|(m|k)?(\w+))$/.exec(t.toLowerCase());if(!o)return 0;let r=o[2]?o[2]==="-∞"?-1/0:1/0:parseFloat(o[1]);return o[3]==="db"?ct(r):o[3]==="bpm"?r/60:o[4]==="m"?r/1e3:o[4]==="k"?r*1e3:r}function pt(t){return typeof t}function gn(t,e){let o=t[t.length-1];return o&&!/^-?\d/.test(e)?o.label=e:t.push({label:e,value:F(e)}),t}var V=w(pt,{string:function(e){let o=e.trim();return o?o.split(/\s*,\s*|\s+/).reduce(gn,[]):[]},object:M});function zt(t,e){let o=t.length,r=1/0,i;for(;o--;){let s=Math.abs(e-t[o].normalValue);s<r&&(r=s,i=t[o])}return i}function $t(t,e){let o=t.length;for(;t[--o]&&t[o].unitValue>=e;);return t[o]||t[0]}function Kt(t,e){let o=-1;for(;t[++o]&&t[o].unitValue<=e;);return t[o]||t[t.length-1]}function x(t,e){return Math.ceil(e/t)*t}var qt=w(t=>t.toLowerCase(),{db:(t,e,o)=>V("-∞dB -96dB -90dB -84dB -78dB -72dB -66dB -60dB -54dB -48dB -42dB -36dB -30dB -24dB -18dB -12dB -6dB 0dB 6dB 12dB 18dB 24dB"),default:(t,e,o)=>{let r=o-e,i=r<.8?x(.05,r/10):r<2?x(.2,r/10):r<8?x(.5,r/10):r<20?x(2,r/10):r<80?x(5,r/10):r<200?x(20,r/10):x(200,r),s=[],c=r<.8?x(.05,e):r<2?x(.2,e):r<8?x(.5,e):r<20?x(2,e):r<80?x(5,e):r<200?x(20,e):x(200,e);for(;c<=o;)s.push({label:r<2?c.toFixed(1):c,value:c}),c+=i;return s}});function Qt(t,e,o,r){return t.normalValue=e.normalise(o,r,t.value),t}function Jt(t,e){let{scale:o,min:r,max:i,ticks:s,step:c,display:l}=e;return t.scale=o,t.min=r,t.max=i,t.ticks=(s?s.length?s:qt(l,r,i):O).filter(f=>f.value>=t.min&&f.value<=t.max).map(f=>Qt(f,o,r,i)),t.step=c==="any"?void 0:c==="tick"?t.ticks:V(c).filter(f=>f.value>=t.min&&f.value<=t.max).map(f=>Qt(f,o,r,i)),t.display=l,t}function Wt(t,e,o,r,i){if(t.value=ot(o,r,i),t.normalValue=e.normalise(o,r,t.value),t.step){let s=zt(t.step,t.normalValue);t.value=s.value,t.normalValue=s.normalValue}return t}var Xt=.00390625;var Yt=.0009765625,Zt=.00048828125,te=.000244140625;var ee=1525878906e-14;var Tr=Symbol("state");var ne=Object.assign;function xn(t,e,o){return(o-t)/(e-t)}function vn(t,e,o){return t+o*(e-t)}var W={};function lt(t,e,o){let r=o/(e*t);return(r<=1?r:Math.log(r)+1)/W[t]}function En(t,e,o){let r=o*W[t];return e*t*(r<=1?r:Math.pow(Math.E,r-1))}function L(t){this.xover=t,W[t]||(W[t]=Math.log(1/t)+1)}ne(L.prototype,{normalise:function(t,e,o){let r=lt(this.xover,e,t);return(lt(this.xover,e,o)-r)/(1-r)},denormalise:function(t,e,o){let r=lt(this.xover,e,t),i=o*(1-r)+r;return En(this.xover,e,i)}});function J(t){this.power=t}ne(J.prototype,{normalise:function(t,e,o){return Math.pow((o-t)/(e-t),1/this.power)},denormalise:function(t,e,o){return Math.pow(o,this.power)*(e-t)+t}});var Bn={linear:{normalise:xn,denormalise:vn},"pow-2":new J(2),"pow-3":new J(3),"pow-4":new J(4),log:{normalise:function(t,e,o){return Math.log(o/t)/Math.log(e/t)},denormalise:function(t,e,o){return t*Math.pow(e/t,o)}},"log-24db":new L(.0625),"log-30db":new L(.03125),"log-36db":new L(.015625),"log-48db":new L(Xt),"log-60db":new L(Yt),"log-66db":new L(Zt),"log-72db":new L(te),"log-96db":new L(ee)};function oe(t){return Bn[t&&t.toLowerCase()||"linear"]}var Sn=.9965784284662086;function ft(t){return 20*Math.log10(t)*Sn}function re(t,e){return{unit:e<1?"m"+t:e>=1e3?"k"+t:t,value:e<.001?(e*1e3).toFixed(2):e<1?(e*1e3).toPrecision(3):e>=1e3?(e/1e3).toPrecision(3):e.toPrecision(3)}}var ie=w(t=>t.toLowerCase(),{pan:(t,e)=>({unit:"",value:e===-1?"-1.00":e===0?"0.00":e===1?"1.00":e.toFixed(2)}),db:(t,e)=>{let o=ft(e);return{unit:"dB",value:isFinite(o)?o<-1?o.toPrecision(3):o.toFixed(2):o<0?"-∞":"∞"}},hz:(t,e)=>({unit:e>=1e3?"kHz":"Hz",value:e<1?e.toFixed(2):e>=1e3?(e/1e3).toPrecision(3):e.toPrecision(3)}),semitone:(t,e)=>({unit:"",value:e===0?"0":e<0?"♭"+(-e/100).toFixed(2):"♯"+(e/100).toFixed(2)}),s:re,bpm:(t,e)=>{let o=e*60;return{unit:"bpm",value:o<100?o.toFixed(1):o.toFixed(0)}},int:(t,e)=>({unit:"",value:Math.round(e)}),"":(t,e)=>({unit:"",value:e>-1&&e<1?e.toFixed(2):e.toPrecision(3)}),default:re});function Tn(t,e){return e[t]}var se=y(Tn,!0);var ue=w(se("keyCode"),{38:(t,e,o,r,i,s)=>{if(t.preventDefault(),i)return Kt(i,s).value;let c=t.shiftKey?10:1;return e.denormalise(o,r,(Math.round(100*s)+c)*.01)},40:(t,e,o,r,i,s)=>{if(t.preventDefault(),i)return $t(i,s).value;let c=t.shiftKey?10:1;return e.denormalise(o,r,(Math.round(100*s)-c)*.01)},default:d});var ae="linear";var ce="any",pe="";var ei=import.meta.url.replace(/\/[^\/]*([?#].*)?$/,"/");function Pn(t){let e=t.target.closest('[name="value"]');return parseFloat(e.value)}function Fn(t,e){return t.push(B("button",{type:"button",part:"tick",name:"value",value:e.value,style:"--normal-value: "+e.normalValue+";",text:e.label})),t}function Cn(t,e,o,r,i,s,c){t.setProperty("--normal-zero",e.normalise(o,r,0)),s.forEach(l=>l.remove()),s.length=0,s=i.reduce(Fn,s),c.after.apply(c,s)}function Dn(t,e,o,r,i,s,c,l){t.setProperty("--normal-value",l),e.value=l;let f=ie(s,c);r.textContent=f.value,i.textContent=f.unit,o.setFormValue(c)}function le(t){return t.sheet.cssRules[0].style}function Hn(t){return t.sheet.cssRules[1].style}var fe={mode:"closed",focusable:!0,construct:function(t,e){let o=B("style",":host {} :host > * { visibility: hidden; }"),r=B("label",{for:"input",html:"<slot></slot>",part:"label"}),i=B("input",{type:"range",id:"input",name:"unit-value",min:"0",max:"1",step:"any"}),s=B("text"),c=B("abbr"),l=B("output",{children:[s,c],part:"output"}),f=B("text",""),m=[];t.append(o,r,i,l,f);let u=T(this),h={};u.host=this,u.shadow=t,u.style=o,u.internals=e,u.data=h,u.shadow=new Promise(p=>u.load=p),u.scale=a.of(ae),u.min=a.of(0),u.max=a.of(1),u.step=a.of(ce),u.ticks=a.of(null),u.display=a.of(pe),u.value=a.of(0);let b=a.combine({shadow:u.shadow,scale:u.scale.map(oe),min:u.min.map(F),max:u.max.map(F),ticks:u.ticks.map(V),display:u.display,step:u.step}).scan(Jt,h).broadcast();b.each(p=>Cn(le(o),p.scale,p.min,p.max,p.ticks,m,f)),a.combine({data:b,value:u.value}).scan((p,A)=>Wt(p,A.data.scale,A.data.min,A.data.max,A.value),h).each(p=>Dn(le(o),i,e,s,c,p.display,p.value,p.normalValue)),I({type:"pointerdown",select:'[name="value"]'},t).map(Pn).each(p=>{u.value.push(p),Q("input",this)}),I("input",t).each(p=>{let A=parseFloat(p.target.value),j=h.scale.denormalise(h.min,h.max,A);u.value.push(j)}),I("keydown",this).filter(()=>document.activeElement===this||this.contains(document.activeElement)).map(p=>ue(p,h.scale,h.min,h.max,h.step,h.normalValue)).each(p=>{u.value.push(p),Q("input",this)})},load:function(t){let e=T(this);Hn(e.style).visibility="",e.load(t)}};function ht(t,e){return{attribute:function(o){T(this)[t].push(o||e)}}}function he(t,e){return{attribute:function(o){this[t]=o},set:function(o){T(this)[t].push(o===void 0?e:o)},get:function(){return T(this).data[t]},enumerable:!0}}var me={type:{value:"number",enumerable:!0},min:he("min",0),max:he("max",1),scale:ht("scale","linear"),ticks:ht("ticks",""),display:{attribute:function(t){T(this).display.push(t||"")}},step:ht("step"),value:{attribute:function(t){this.value=t},get:function(){return T(this).data.value},set:function(t){T(this).value.push(F(t))},enumerable:!0}};var Vn=window.rangeInputStylesheet||import.meta.url.replace(/\/[^\/]*([?#].*)?$/,"/")+"range-input-shadow.css",ci=et("<range-input>",fe,me,Vn);export{ci as default};
