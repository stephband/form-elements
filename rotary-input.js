/* form-elements 
   0.0.4
   By Stephen Band
   Built 2022-11-09 12:18 */

var Pt=Object.getOwnPropertySymbols;var Ce=Object.prototype.hasOwnProperty,je=Object.prototype.propertyIsEnumerable;var Vt=(t,e)=>{var o={};for(var r in t)Ce.call(t,r)&&e.indexOf(r)<0&&(o[r]=t[r]);if(t!=null&&Pt)for(var r of Pt(t))e.indexOf(r)<0&&je.call(t,r)&&(o[r]=t[r]);return o};function k(t){return t}function m(t,e){return function(){let r=t.apply(this,arguments),i=e[r]||e.default;if(!i)throw new Error('overload() no handler for "'+r+'"');return i.apply(this,arguments)}}function G(t){var e=new Map;return function(r){if(e.has(r))return e.get(r);var i=t(r);return e.set(r,i),i}}var De=Array.prototype;function Ae(t,e){return typeof t=="function"?t.apply(null,e):t}function Ht(t,e,o){o=o||t.length;var r=o===1?e?t:G(t):G(function(i){return Ht(function(){var s=[i];return s.push.apply(s,arguments),t.apply(null,s)},e,o-1)});return function i(s){return arguments.length===0?i:arguments.length===1?r(s):arguments.length>=o?t.apply(null,arguments):Ae(r(s),De.slice.call(arguments,1))}}var g=Ht;function v(){}var Ie=m(k,{is:v,tag:v,data:function(t,e,o){Object.assign(e.dataset,o)},html:function(t,e,o){e.innerHTML=o},text:function(t,e,o){e.textContent=o},children:function(t,e,o){e.innerHTML="",e.append.apply(e,o)},points:D,cx:D,cy:D,r:D,transform:D,preserveAspectRatio:D,viewBox:D,default:function(t,e,o){t in e?e[t]=o:e.setAttribute(t,o)}});function D(t,e,o){e.setAttribute(t,o)}function Ge(t,e){for(var o=Object.keys(e),r=o.length;r--;)Ie(o[r],t,e[o[r]]);return t}var Q=g(Ge,!0);var ft="http://www.w3.org/2000/svg",Ct=document.createElement("template"),mt=(t,e)=>e&&typeof e;function jt(t,e){let o=document.createRange();return o.selectNode(t),o.createContextualFragment(e)}var x=m(mt,{string:function(t,e){let o=document.createElementNS(ft,t);return o.innerHTML=e,o},object:function(t,e){let o=document.createElementNS(ft,t);return typeof e.length=="number"?o.append.apply(o,e):Q(o,e),o},default:t=>document.createElementNS(ft,t)}),ze=m(mt,{string:function(t,e){let o=document.createElement(t);return o.innerHTML=e,o},object:function(t,e){let o=document.createElement(t);return typeof e.length=="number"?o.append.apply(o,e):Q(o,e),o},default:t=>document.createElement(t)}),Ue=m(k,{comment:function(t,e){return document.createComment(e||"")},fragment:m(mt,{string:function(t,e,o){return o?jt(o,e):(Ct.innerHTML=e,Ct.content.cloneNode(!0))},object:function(t,e,o){let r=o?jt(o):document.createDocumentFragment();return typeof e.length=="number"?r.append.apply(r,e):Q(r,e),r},default:()=>document.createDocumentFragment()}),text:function(t,e){return document.createTextNode(e||"")},circle:x,ellipse:x,g:x,glyph:x,image:x,line:x,rect:x,use:x,path:x,pattern:x,polygon:x,polyline:x,svg:x,default:ze}),S=Ue;function ht(t,e,o){let r;typeof o!="string"&&o.input!==void 0&&o.index!==void 0&&(r=o,o=r.input.slice(o.index+o[0].length+(o.consumed||0)));let i=t.exec(o);if(!i)return;let s=e(i);return r&&(r.consumed=(r.consumed||0)+i.index+i[0].length+(i.consumed||0)),s}var Bo=g(ht,!0);function Re(t,e,o){throw o.input!==void 0&&o.index!==void 0&&(o=o.input),new Error('Cannot parse string "'+(o.length>128?o.length.slice(0,128)+"…":o)+'"')}function Ne(t,e,o){let r=-1;for(;++r<o.length;)e=o[r]!==void 0&&t[r]?t[r](e,o):e;return t.done?t.done(e,o):t.close?t.close(e,o):e}function We(t,e,o,r){let i=ht(t,s=>Ne(e,o,s),r);return i===void 0?e.catch?e.catch(o,r):Re(t,e,r):i}var Dt=g(We,!0);var E=Symbol("internals"),A=Symbol("shadow"),At=Object.defineProperties,$e={a:HTMLAnchorElement,article:HTMLElement,dl:HTMLDListElement,p:HTMLParagraphElement,br:HTMLBRElement,fieldset:HTMLFieldSetElement,hr:HTMLHRElement,img:HTMLImageElement,li:HTMLLIElement,ol:HTMLOListElement,optgroup:HTMLOptGroupElement,q:HTMLQuoteElement,section:HTMLElement,textarea:HTMLTextAreaElement,td:HTMLTableCellElement,th:HTMLTableCellElement,tr:HTMLTableRowElement,tbody:HTMLTableSectionElement,thead:HTMLTableSectionElement,tfoot:HTMLTableSectionElement,ul:HTMLUListElement},Ye={name:{set:function(t){return this.setAttribute("name",t)},get:function(){return this.getAttribute("name")||""}},form:{get:function(){return this[E].form}},labels:{get:function(){return this[E].labels}},validity:{get:function(){return this[E].validity}},validationMessage:{get:function(){return this[E].validationMessage}},willValidate:{get:function(){return this[E].willValidate}},checkValidity:{value:function(){return this[E].checkValidity()}},reportValidity:{value:function(){return this[E].reportValidity()}}},qe={},It={once:!0},Gt=0,zt=!1;function Ke(t){return $e[t]||window["HTML"+t[0].toUpperCase()+t.slice(1)+"Element"]||(()=>{throw new Error('Constructor not found for tag "'+t+'"')})()}var Xe=Dt(/^\s*<?([a-z][\w]*-[\w-]+)>?\s*$|^\s*<?([a-z][\w]*)\s+is[=\s]*["']?([a-z][\w]*-[\w]+)["']?>?\s*$/,{1:(t,e)=>({name:e[1]}),2:(t,e)=>({name:e[3],tag:e[2]}),catch:function(t,e){throw new SyntaxError(`dom element() – name must be of the form 'element-name' or 'tag is="element-name"' (`+e+")")}},null);function _e(t,e){if(t.hasOwnProperty(e)){let o=t[e];delete t[e],t[e]=o}return t}function Ut(t,e,o){t._initialLoad=!0;let r=t.attachShadow({mode:e.mode||"closed",delegatesFocus:e.focusable||!1});if(o){let i=S("link",{rel:"stylesheet",href:o});r.append(i)}return t[A]=r,r}function Qe(t){var e;if(t.attachInternals){if(e=t.attachInternals(),e.setFormValue)return e}else e={shadowRoot:t.shadowRoot};return e.input=S("input",{type:"hidden",name:t.name}),t.appendChild(e.input),e.setFormValue=function(o){this.input.value=o},e}function Je(t){return!!t.attribute}function Ze(t){return t.set||t.get||t.hasOwnProperty("value")}function tn(t,e){return Je(e[1])&&(t.attributes[e[0]]=e[1].attribute),Ze(e[1])&&(t.properties[e[0]]=e[1]),t}function dt(t,e,o,r,i=""){let{name:s,tag:u}=Xe(t),h=typeof u=="string"?Ke(u):HTMLElement,{attributes:l,properties:T}=o?Object.entries(o).reduce(tn,{attributes:{},properties:{}}):qe;function c(){let p=Reflect.construct(h,arguments,c),b=e.construct&&e.construct.length>Gt?Ut(p,e,r||e.stylesheet):void 0,L=c.formAssociated?Qe(p):{};return u&&(zt=!0),e.construct&&e.construct.call(p,b,L),T&&Object.keys(T).reduce(_e,p),p}return c.prototype=Object.create(h.prototype,T),T.value&&(c.formAssociated=!0,At(c.prototype,Ye),(e.enable||e.disable)&&(c.prototype.formDisabledCallback=function(p){return p?e.disable&&e.disable.call(this,this[A],this[E]):e.enable&&e.enable.call(this,this[A],this[E])}),e.reset&&(c.prototype.formResetCallback=function(){return e.reset.call(this,this[A],this[E])}),e.restore&&(c.prototype.formStateRestoreCallback=function(){return e.restore.call(this,this[A],this[E])})),l&&(c.observedAttributes=Object.keys(l),c.prototype.attributeChangedCallback=function(p,b,L){return l[p].call(this,L)}),c.prototype.connectedCallback=function(){let p=this,b=p[A],L=p[E];if(p._initialLoad){let M=b.querySelectorAll('link[rel="stylesheet"]');if(M.length){let _=0,f=M.length,j=function(io){++_>=M.length&&(delete p._initialLoad,e.load&&e.load.call(p,b))},Ve=j;for(;f--;)M[f].addEventListener("load",j,It),M[f].addEventListener("error",Ve,It)}else e.load&&Promise.resolve(1).then(()=>e.load.call(this,b,L))}e.connect&&e.connect.call(this,b,L)},e.disconnect&&(c.prototype.disconnectedCallback=function(){return e.disconnect.call(this,this[A],this[E])}),window.console&&window.console.log("%c<"+(u?u+" is="+s:s)+">%c "+i,"color: #3a8ab0; font-weight: 600;","color: #888888; font-weight: 400;"),window.customElements.define(s,c,u&&{extends:u}),u&&!zt&&document.querySelectorAll('[is="'+s+'"]').forEach(p=>{o&&At(p,o);let b=e.construct&&e.construct.length>Gt?Ut(p,e,r||e.stylesheet):void 0;e.construct&&e.construct.call(p,b);let L;for(L in l){let M=p.attributes[L];M&&l[L].call(p,M.value)}e.connect&&e.connect.apply(p)}),c}function en(t,e){return e[t]}var z=g(en,!0);var wt=Symbol("privates");function F(t){return t[wt]||Object.defineProperty(t,wt,{value:{}})[wt]}function R(t,e,o){return o>e?e:o<t?t:o}var Do=g(R);function gt(t){return function(){return arguments[t]}}function B(){return this}var nn=Object.assign,on=Object.create,rn=Object.freeze;function sn(){return!0}function Rt(){return-1}var O=rn(nn(on({shift:v,push:v,forEach:v,join:function(){return""},every:sn,filter:B,find:v,findIndex:Rt,flat:B,flatMap:B,includes:function(){return!1},indexOf:Rt,map:B,reduce:gt(1),sort:B,each:B,pipe:k,start:B,stop:B,done:B,valueOf:function(){return null}}),{length:0}));function yt(t,e){t.remove&&t.remove(e);let o;for(;(o=t.indexOf(e))!==-1;)t.splice(o,1);return t}var Yo=g(yt,!0);function bt(t){return t&&t[Symbol.iterator]}var an=Object.assign;function un(t){return t.stop?t.stop():t()}function N(){}an(N.prototype,{stop:function(){let t=this.stopables;return this.stopables=void 0,t&&t.forEach(un),this},done:function(t){return(this.stopables||(this.stopables=[])).push(t),this}});var P=Object.assign,H=Object.create;function W(t,e){t[0]=e,e.done(t)}function Nt(t,e){let o=t[e].stopables;o&&yt(o,t),t[e]=void 0}function d(t,e){t&&t.push(e)}function w(t){N.prototype.stop.apply(t);let e=-1,o;for(;o=t[++e];)t[e]=void 0,o.stop()}function Wt(t){return a.prototype.isPrototypeOf(t)}function a(t){this.input=t}P(a.prototype,N.prototype,{push:function(t){d(this[0],t)},pipe:function(t){if(this[0])throw new Error("Stream: Attempt to .pipe() a unicast stream multiple times. Create a multicast stream with stream.broadcast().");return this[0]=t,t.done(this),this.input.pipe(this),t},map:function(t){return new $t(this,t)},filter:function(t){return new Yt(this,t)},split:function(t){return new Kt(this,t)},flatMap:function(t){return new qt(this,t)},take:function(t){return new Xt(this,t)},each:function(t){return this.pipe(new Jt(t))},reduce:function(t,e){return this.pipe(new _t(t,e)).value},scan:function(t,e){return new Qt(this,t,e)},stop:function(){return w(this),this}});function $t(t,e){this.input=t,this.fn=e}$t.prototype=P(H(a.prototype),{push:function(e){let r=this.fn(e);r!==void 0&&d(this[0],r)}});function Yt(t,e){this.input=t,this.fn=e}Yt.prototype=P(H(a.prototype),{push:function(e){this.fn(e)&&d(this[0],e)}});function qt(t,e){this.input=t,this.fn=e}qt.prototype=P(H(a.prototype),{push:function(e){let r=this.fn(e);if(r!==void 0)if(bt(r))for(let i of r)d(this[0],i);else r.pipe&&this.done(r.each(i=>d(this[0],i)))}});function Kt(t,e){this.input=t,this.chunk=[],typeof n=="number"?this.n=e:this.fn=e}Kt.prototype=P(H(a.prototype),{fn:function(){return this.chunk.length===this.n},push:function(e){let o=this.chunk;this.fn(e)?(d(this[0],o),this.chunk=[]):o.push(e)}});function Xt(t,e){this.input=t,this.count=e}Xt.prototype=P(H(a.prototype),{push:function(e){this[0].push(e),--this.count||this.stop()}});function _t(t,e){this.fn=t,this.value=e,this.i=0}_t.prototype=P(H(a.prototype),{push:function(t){let e=this.fn;this.value=e(this.value,t,this.i++,this)}});function Qt(t,e,o){this.input=t,this.fn=e,this.value=o}Qt.prototype=P(H(a.prototype),{push:function(t){let e=this.fn;this.value=e(this.value,t),this[0].push(this.value)}});function Jt(t){this.push=t}Jt.prototype=P(H(a.prototype),{each:null,reduce:null,pipe:null});var cn=Object.assign,pn=Object.create;function ln(t,e){if(t[1]){let o=-1;for(;t[++o]&&t[o]!==e;);for(;t[o++];)t[o-1]=t[o]}else t.stop()}function $(t,e){a.apply(this,arguments),this.memory=!!(e&&e.memory),e&&e.hot&&this.pipe(O)}$.prototype=cn(pn(a.prototype),{push:function(t){if(t===void 0)return;this.memory&&(this.value=t);let e=-1;for(;this[++e];)this[e].push(t)},pipe:function(t){let e=-1;for(;this[++e];);return this.memory&&e===0&&this.input.pipe(this),this[e]=t,t.done(()=>ln(this,t)),this.value!==void 0&&t.push(this.value),!this.memory&&e===0&&this.input.pipe(this),t}});var fn=Array.prototype,mn=Object.assign,hn=Object.create;function dn(t){return t!==void 0}function Y(t){this.buffer=t?t.filter?t.filter(dn):t:[]}Y.prototype=mn(hn(a.prototype),{push:function(t){t!==void 0&&d(this.buffer,t)},pipe:function(t){for(t.done(this),this[0]=t;this.buffer.length;)d(this[0],fn.shift.apply(this.buffer));return this.buffer=t,t},stop:function(){return this.buffer=void 0,w(this),this}});var Zt=Object.assign,wn=Object.create,gn=Promise.resolve(),yn={schedule:function(){gn.then(this.fire)},unschedule:v},bn={schedule:function(){this.timer=requestAnimationFrame(this.fire)},unschedule:function(){cancelAnimationFrame(this.timer),this.timer=void 0}},vn={schedule:function(){this.timer=setTimeout(this.fire,this.duration*1e3)},unschedule:function(){clearTimeout(this.timer),this.timer=void 0}};function I(t,e){a.apply(this,arguments),this.duration=e,this.timer=void 0,this.fire=()=>{this.timer=void 0,this.output.stop()},Zt(this,e==="tick"?yn:e==="frame"?bn:vn)}I.prototype=Zt(wn(a.prototype),{push:function(t){this.timer?(this.unschedule(),this.schedule(),this.output.push(t)):(this.output=a.of(t),this[0].push(this.output),this.schedule())},stop:function(){return this.timer&&this.fire(),a.prototype.stop.apply(this,arguments)}});var vt=Object.assign,xn=Object.create,te=Object.keys;function xt(t,e,o,r,i){this.stream=t,this.names=e,this.values=o,this.name=r,this.input=i}vt(xt.prototype,{push:function(t){let e=this.stream,o=this.values,r=this.name;o[r]=t,(e.active||(e.active=te(o).length===this.names.length))&&d(e[0],vt({},o))},stop:function(){--this.stream.count===0&&w(this.stream)},done:function(t){this.stream.done(t)}});function J(t){this.inputs=t,this.active=!1}J.prototype=vt(xn(a.prototype),{push:null,pipe:function(t){let e=this.inputs,o=te(e),r={};this.count=o.length,this[0]=t,t.done(this);let i;for(i in e){let s=e[i];if(s.pipe){let u=new xt(this,o,r,i,s);s.pipe(u)}else if(s.then){let u=new xt(this,o,r,i,s);s.then(h=>u.push(h)),s.finally(()=>u.stop())}else r[i]=s,--this.count}return t}});var ee=Object.assign,Sn=Object.create;function ne(t){this.stream=t}ee(ne.prototype,{push:function(t){d(this.stream[0],t)},stop:function(){--this.stream.count===0&&w(this.stream)},done:function(t){this.stream.done(t)}});function Z(t){this.inputs=t}Z.prototype=ee(Sn(a.prototype),{push:null,pipe:function(t){let e=this.inputs;this.count=e.length,this[0]=t,t.done(this);let o=new ne(this),r=-1,i;for(;i=e[++r];)if(i.pipe)i.pipe(o);else if(i.then)i.then(s=>o.push(s)),i.finally(()=>o.stop());else{let s=-1;for(;++s<i.length;)o.push(i[s]);o.stop()}return t}});var En=Object.assign,Bn=Object.create;function tt(t){this.promise=t}tt.prototype=En(Bn(a.prototype),{push:null,pipe:function(t){let e=this.promise;return this[0]=t,t.done(this),e.then(o=>d(this,o)),e.finally(()=>w(this)),t}});var Tn=Array.prototype,oe=Object.assign;function Ln(t){throw new TypeError("Stream cannot be created from "+typeof object)}oe(a,{isStream:Wt,of:function(){return new Y(Tn.slice.apply(arguments))},from:function(t){return t.pipe?new a(t):t.then?new tt(t):typeof t.length=="number"?new Y(t):Ln(t)},batch:t=>new I(O,t),burst:t=>(console.warn("Stream.burst() is now Stream.batch()"),new I(O,t)),broadcast:t=>new $(O,t),combine:t=>new J(t),merge:function(){return new Z(arguments)},writeable:function(t){let e=new a(O);return t(e),e}});oe(a.prototype,{log:B,batch:function(t){return new I(this,t)},burst:function(t){return console.warn("stream.burst() is now stream.batch()"),new I(this,t)},broadcast:function(t){return new $(this,t)}});var Mn=Object.assign,kn=/\s+/,et={fullscreenchange:G(()=>"fullscreenElement"in document?"fullscreenchange":"webkitFullscreenElement"in document?"webkitfullscreenchange":"mozFullScreenElement"in document?"mozfullscreenchange":"msFullscreenElement"in document?"MSFullscreenChange":"fullscreenchange")},re=0;window.addEventListener("click",t=>re=t.timeStamp);function Fn(t,e){return t.node.addEventListener(et[e]?et[e]():e,t,t.options),t}function On(t,e){return t.node.removeEventListener(et[e]?et[e]():e,t),t}function ie(t,e,o){this.types=t.split(kn),this.options=e,this.node=o,this.select=e&&e.select}Mn(ie.prototype,{pipe:function(t){W(this,t),this.types.reduce(Fn,this)},handleEvent:function(t){if(!(t.type==="click"&&t.timeStamp<=re)){if(this.select){let e=t.target.closest(this.select);if(!e)return;t.selectedTarget=e}d(this[0],t)}},stop:function(){this.types.reduce(On,this),w(this[0])}});function nt(t,e){let o;return typeof t=="object"&&(o=t,t=o.type),new a(new ie(t,o,e))}function q(t){return typeof t}var Pn=/^\s*([+-]?\d*\.?\d+)([^\s\d]*)\s*$/;function St(t){return function(o){if(typeof o=="number")return o;var r=Pn.exec(o);if(!r||!t[r[2]||""]){if(!t.catch)throw new Error('Cannot parse value "'+o+'" (accepted units '+Object.keys(t).join(", ")+")");return r?t.catch(parseFloat(r[1]),r[2]):t.catch(parseFloat(o))}return t[r[2]||""](parseFloat(r[1]))}}var Vn=/px$/,se={"transform:translateX":function(t){var e=K("transform",t);if(!e||e==="none")return 0;var o=ot(e);return parseFloat(o[4])},"transform:translateY":function(t){var e=K("transform",t);if(!e||e==="none")return 0;var o=ot(e);return parseFloat(o[5])},"transform:scale":function(t){var e=K("transform",t);if(!e||e==="none")return 0;var o=ot(e),r=parseFloat(o[0]),i=parseFloat(o[1]);return Math.sqrt(r*r+i*i)},"transform:rotate":function(t){var e=K("transform",t);if(!e||e==="none")return 0;var o=ot(e),r=parseFloat(o[0]),i=parseFloat(o[1]);return Math.atan2(i,r)}};function ot(t){return t.split("(")[1].split(")")[0].split(/\s*,\s*/)}function K(t,e){return window.getComputedStyle?window.getComputedStyle(e,null).getPropertyValue(t):0}function rt(t,e){if(se[t])return se[t](e);var o=K(t,e);return typeof o=="string"&&Vn.test(o)?parseFloat(o):o}var it,st;function Hn(){if(!it){let t=document.documentElement.style.fontSize;document.documentElement.style.fontSize="100%",it=rt("font-size",document.documentElement),document.documentElement.style.fontSize=t||""}return it}function Cn(){return st||(st=rt("font-size",document.documentElement)),st}window.addEventListener("resize",()=>{it=void 0,st=void 0});var jn=m(q,{number:k,string:St({px:k,em:t=>Hn()*t,rem:t=>Cn()*t,vw:t=>window.innerWidth*t/100,vh:t=>window.innerHeight*t/100,vmin:t=>window.innerWidth<window.innerHeight?window.innerWidth*t/100:window.innerHeight*t/100,vmax:t=>window.innerWidth<window.innerHeight?window.innerHeight*t/100:window.innerWidth*t/100})}),at=jn;var Dn=Array.prototype,Bt=Object.assign,Et="webkitUserSelect"in document.body.style?"webkitUserSelect":"userSelect",ut={},ct={threshold:4,ignoreTags:{textarea:!0,input:!0,select:!0}};function An(t,e,o){return e*e+o*o>=t*t}function ae(t,e,o){if(this.stream=t,this.events=[e],this.options=o,this.pointerId=e.pointerId,typeof o.threshold=="function")this.checkThreshold=o.threshold;else{let r=at(o.threshold);this.checkThreshold=(i,s,u)=>An(r,i,s,u)}document.addEventListener("pointermove",this),document.addEventListener("pointerup",this),document.addEventListener("pointercancel",this)}Bt(ae.prototype,{handleEvent:m(z("type"),{pointermove:function(t){if(this.pointerId===t.pointerId){if(this.pointerId in ut&&this!==ut[this.pointerId]){this.stop();return}if(this.events.push(t),!this.isGesture){let e=this.events[0],o=t.clientX-e.clientX,r=t.clientY-e.clientY,i=(t.timeStamp-e.timeStamp)/1e3;this.checkThreshold(o,r,i)&&this.createGesture()}}},default:function(t){if(this.pointerId!==t.pointerId){console.log("Not the same pointer");return}this.events.push(t),this.stop()}}),createGesture:function(){this.isGesture=!0,this.userSelectState=document.body.style[Et],document.body.style[Et]="none",ut[this.pointerId]=this,this.stream.push(new a(this))},pipe:function(t){for(W(this,t);this.events.length;)d(this[0],Dn.shift.apply(this.events));this.events=t},stop:function(){if(document.removeEventListener("pointermove",this),document.removeEventListener("pointerup",this),document.removeEventListener("pointercancel",this),this.isGesture&&(document.body.style[Et]=this.userSelectState,delete ut[this.pointerId]),this[0]){let t=this[0];Nt(this,0),w(t)}}});function In(t){var e=t.target.tagName;return e&&(!!ct.ignoreTags[e.toLowerCase()]||t.target.draggable)}function ue(t,e){this.node=t,this.options=e}Bt(ue.prototype,{pipe:function(t){return this[0]=t,this.node.addEventListener("pointerdown",this),t},handleEvent:function(t){if(t.button===0&&!(this.options.device&&!this.options.device.includes(t.pointerType))&&!In(t)&&!(this.options.select&&!t.target.closest(this.options.select))){var e={type:t.type,target:t.target,currentTarget:t.currentTarget,clientX:t.clientX,clientY:t.clientY,timeStamp:t.timeStamp,pointerId:t.pointerId};new ae(this[0],e,this.options)}},stop:function(){return this[0]&&(this.node.removeEventListener("pointerdown",this),w(this[0])),this}});function Tt(t,e){return t=e&&t?Bt({},ct,t):ct,e=e||t,new a(new ue(e,t))}var Gn=Object.assign,X={bubbles:!0,cancelable:!0};function Lt(t,e){var T;let o=X,r,i,s,u,h,l;return typeof t=="object"?(T=t,{type:t,detail:i,bubbles:s,cancelable:u,composed:h}=T,r=Vt(T,["type","detail","bubbles","cancelable","composed"]),l=Gn(new CustomEvent(t,{detail:i,bubbles:s||X.bubbles,cancelable:u||X.cancelable,composed:h||X.composed}),r)):l=new CustomEvent(t,X),e.dispatchEvent(l)}var Yr=g(Lt,!0);function Mt(t){return Math.pow(10,t/20)}function C(t){if(!t)return 0;let e=+t;if(e||e===0)return e;let o=/^(?:(-?[\d.]+)|(-?∞))(?:(db|bpm)|(m|k)?(\w+))$/.exec(t.toLowerCase());if(!o)return 0;let r=o[2]?o[2]==="-∞"?-1/0:1/0:parseFloat(o[1]);return o[3]==="db"?Mt(r):o[3]==="bpm"?r/60:o[4]==="m"?r/1e3:o[4]==="k"?r*1e3:r}function zn(t,e){let o=t[t.length-1];return o&&!/^-?\d/.test(e)?o.label=e:t.push({label:e,value:C(e)}),t}var U=m(q,{string:function(e){let o=e.trim();return o?o.split(/\s*,\s*|\s+/).reduce(zn,[]):[]},object:k});function ce(t,e){let o=t.length,r=1/0,i;for(;o--;){let s=Math.abs(e-t[o].normalValue);s<r&&(r=s,i=t[o])}return i}function pe(t,e){let o=t.length;for(;t[--o]&&t[o].unitValue>=e;);return t[o]||t[0]}function le(t,e){let o=-1;for(;t[++o]&&t[o].unitValue<=e;);return t[o]||t[t.length-1]}function y(t,e){return Math.ceil(e/t)*t}var fe=m(t=>t.toLowerCase(),{db:(t,e,o)=>U("-∞dB -96dB -90dB -84dB -78dB -72dB -66dB -60dB -54dB -48dB -42dB -36dB -30dB -24dB -18dB -12dB -6dB 0dB 6dB 12dB 18dB 24dB"),default:(t,e,o)=>{let r=o-e,i=r<.8?y(.05,r/10):r<2?y(.2,r/10):r<8?y(.5,r/10):r<20?y(2,r/10):r<80?y(5,r/10):r<200?y(20,r/10):y(200,r),s=[],u=r<.8?y(.05,e):r<2?y(.2,e):r<8?y(.5,e):r<20?y(2,e):r<80?y(5,e):r<200?y(20,e):y(200,e);for(;u<=o;)s.push({label:r<2?u.toFixed(1):u,value:u}),u+=i;return s}});function me(t,e,o,r){return t.normalValue=e.normalise(o,r,t.value),t}function he(t,e){let{scale:o,min:r,max:i,ticks:s,step:u,display:h}=e;return t.scale=o,t.min=r,t.max=i,t.ticks=(s?s.length?s:fe(h,r,i):O).filter(l=>l.value>=t.min&&l.value<=t.max).map(l=>me(l,o,r,i)),t.step=u==="any"?void 0:u==="tick"?t.ticks:U(u).filter(l=>l.value>=t.min&&l.value<=t.max).map(l=>me(l,o,r,i)),t.display=h,t}function de(t,e,o,r,i){if(t.value=R(o,r,i),t.normalValue=e.normalise(o,r,t.value),t.step){let s=ce(t.step,t.normalValue);t.value=s.value,t.normalValue=s.normalValue}return t}var we=.00390625;var ge=.0009765625,ye=.00048828125,be=.000244140625;var ve=1525878906e-14;var fi=Symbol("state");var xe=Object.assign;function Wn(t,e,o){return(o-t)/(e-t)}function $n(t,e,o){return t+o*(e-t)}var lt={};function kt(t,e,o){let r=o/(e*t);return(r<=1?r:Math.log(r)+1)/lt[t]}function Yn(t,e,o){let r=o*lt[t];return e*t*(r<=1?r:Math.pow(Math.E,r-1))}function V(t){this.xover=t,lt[t]||(lt[t]=Math.log(1/t)+1)}xe(V.prototype,{normalise:function(t,e,o){let r=kt(this.xover,e,t);return(kt(this.xover,e,o)-r)/(1-r)},denormalise:function(t,e,o){let r=kt(this.xover,e,t),i=o*(1-r)+r;return Yn(this.xover,e,i)}});function pt(t){this.power=t}xe(pt.prototype,{normalise:function(t,e,o){return Math.pow((o-t)/(e-t),1/this.power)},denormalise:function(t,e,o){return Math.pow(o,this.power)*(e-t)+t}});var qn={linear:{normalise:Wn,denormalise:$n},"pow-2":new pt(2),"pow-3":new pt(3),"pow-4":new pt(4),log:{normalise:function(t,e,o){return Math.log(o/t)/Math.log(e/t)},denormalise:function(t,e,o){return t*Math.pow(e/t,o)}},"log-24db":new V(.0625),"log-30db":new V(.03125),"log-36db":new V(.015625),"log-48db":new V(we),"log-60db":new V(ge),"log-66db":new V(ye),"log-72db":new V(be),"log-96db":new V(ve)};function Se(t){return qn[t&&t.toLowerCase()||"linear"]}function Ft(t){return 20*Math.log10(t)}function Ee(t,e){return{unit:e<1?"m"+t:e>=1e3?"k"+t:t,value:e<.001?(e*1e3).toFixed(2):e<1?(e*1e3).toPrecision(3):e>=1e3?(e/1e3).toPrecision(3):e.toPrecision(3)}}var Be=m(t=>t.toLowerCase(),{pan:(t,e)=>({unit:"",value:e===-1?"-1.00":e===0?"0.00":e===1?"1.00":e.toFixed(2)}),db:(t,e)=>{let o=Ft(e);return{unit:"dB",value:isFinite(o)?o<-1?o.toPrecision(3):o.toFixed(2):o<0?"-∞":"∞"}},hz:(t,e)=>({unit:e>=1e3?"kHz":"Hz",value:e<1?e.toFixed(2):e>=1e3?(e/1e3).toPrecision(3):e.toPrecision(3)}),semitone:(t,e)=>({unit:"",value:e===0?"0":e<0?"♭"+(-e/100).toFixed(2):"♯"+(e/100).toFixed(2)}),s:Ee,bpm:(t,e)=>{let o=e*60;return{unit:"bpm",value:o<100?o.toFixed(1):o.toFixed(0)}},int:(t,e)=>({unit:"",value:Math.round(e)}),"":(t,e)=>({unit:"",value:e>-1&&e<1?e.toFixed(2):e.toPrecision(3)}),default:Ee});var Te=m(z("keyCode"),{38:(t,e,o,r,i,s)=>{if(t.preventDefault(),i)return le(i,s).value;let u=t.shiftKey?10:1;return e.denormalise(o,r,(Math.round(100*s)+u)*.01)},40:(t,e,o,r,i,s)=>{if(t.preventDefault(),i)return pe(i,s).value;let u=t.shiftKey?10:1;return e.denormalise(o,r,(Math.round(100*s)-u)*.01)},default:v});var Le="linear";var Me="any",ke="";function Zn(t){let e=t.target.closest('[name="value"]');return parseFloat(e.value)}var to=m((t,e)=>e.type,{pointerdown:(t,e)=>({scale:t.scale,min:t.min,max:t.max,e0:e,y0:e.clientY,y:t.normalValue,value:t.value,touchRange:at(getComputedStyle(e.target).getPropertyValue("--touch-range"))}),default:(t,e)=>{let{scale:o,min:r,max:i,y:s,y0:u,touchRange:h}=t,l=u-e.clientY,T=R(0,1,s+l/h),c=o.denormalise(r,i,T);return t.value=c,t}});function eo(t,e){return t.push(S("button",{type:"button",part:"tick",name:"value",value:e.value,style:"--normal-value: "+e.normalValue+";",children:[S("span",{text:e.label,style:"transform: translate3d(-50%, 0, 0) rotate3d(0, 0, 1, calc(-1 * (var(--rotation-start) + "+e.normalValue+" * var(--rotation-range)))) translate3d(calc("+Math.sin(e.normalValue*6.28318531)+" * -33%), 0, 0);"})]})),t}function no(t,e,o,r,i,s,u){t.setProperty("--normal-value",u);let h=Be(i,s);o.textContent=h.value,r.textContent=h.unit,e.setFormValue(s)}function oo(t,e,o,r,i,s,u){t.setProperty("--normal-zero",e.normalise(o,r,0)),s.forEach(h=>h.remove()),s.length=0,s=i.reduce(eo,s),u.after.apply(u,s)}var Fe={mode:"closed",focusable:!0,construct:function(t,e){let o=S("style",":host {} :host > * { visibility: hidden; }"),r=S("label",{for:"input",part:"label",html:"<slot></slot>"}),i=S("div",{class:"handle"}),s=S("text"),u=S("abbr"),h=S("output",{children:[s,u],part:"output"}),l=S("text",""),T=[];t.append(o,r,i,h,l);let c=F(this),p={},b=o.sheet.cssRules[0].style,L=o.sheet.cssRules[1].style;c.host=this,c.shadow=t,c.hostStyle=b,c.childStyle=L,c.internals=e,c.data=p,c.shadow=new Promise(f=>c.load=f),c.scale=a.of(Le),c.min=a.of(0),c.max=a.of(1),c.step=a.of(Me),c.ticks=a.of(null),c.display=a.of(ke),c.value=a.of(0);let M=f=>{c.value.push(f),Lt("input",this)},_=a.combine({shadow:c.shadow,scale:c.scale.map(Se),min:c.min.map(C),max:c.max.map(C),ticks:c.ticks.map(U),display:c.display,step:c.step}).scan(he,p).broadcast();_.each(f=>oo(b,f.scale,f.min,f.max,f.ticks,T,l)),a.combine({data:_,value:c.value}).scan((f,j)=>de(f,j.data.scale,j.data.min,j.data.max,j.value),p).each(f=>no(b,e,s,u,f.display,f.value,f.normalValue)),nt({type:"pointerdown",select:'[name="value"]'},t).map(Zn).each(M),Tt({threshold:1,select:".handle"},t).each(f=>f.scan(to,p).map(z("value")).each(M)),nt("keydown",this).filter(()=>document.activeElement===this||this.contains(document.activeElement)).map(f=>Te(f,p.scale,p.min,p.max,p.step,p.normalValue)).each(M)},load:function(t){let e=F(this);e.childStyle.visibility="",e.load(t)}};function Ot(t,e){return{attribute:function(o){F(this)[t].push(o||e)}}}function Oe(t,e){return{attribute:function(o){this[t]=o},set:function(o){F(this)[t].push(o===void 0?e:o)},get:function(){return F(this).data[t]},enumerable:!0}}var Pe={type:{value:"number",enumerable:!0},min:Oe("min",0),max:Oe("max",1),scale:Ot("scale","linear"),ticks:Ot("ticks",""),display:{attribute:function(t){F(this).display.push(t||"")}},step:Ot("step"),value:{attribute:function(t){this.value=t},get:function(){return F(this).data.value},set:function(t){F(this).value.push(C(t))},enumerable:!0}};var ro=window.rotaryInputStylesheet||import.meta.url.replace(/\/[^\/]*([?#].*)?$/,"/")+"rotary-input-shadow.css",Ki=dt("<rotary-input>",Fe,Pe,ro);export{Ki as default};
