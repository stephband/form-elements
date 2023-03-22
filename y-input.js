/* form-elements 
   0.0.4
   By Stephen Band
   Built 2023-03-22 18:03 */

var de=Object.getOwnPropertySymbols;var Fn=Object.prototype.hasOwnProperty,Hn=Object.prototype.propertyIsEnumerable;var me=(t,e)=>{var o={};for(var r in t)Fn.call(t,r)&&e.indexOf(r)<0&&(o[r]=t[r]);if(t!=null&&de)for(var r of de(t))e.indexOf(r)<0&&Hn.call(t,r)&&(o[r]=t[r]);return o};function g(t){return t}function h(t,e){return function(){let r=t.apply(this,arguments),i=e[r]||e.default;if(!i)throw new Error('overload() no handler for "'+r+'"');return i.apply(this,arguments)}}function N(t){var e=new Map;return function(r){if(e.has(r))return e.get(r);var i=t(r);return e.set(r,i),i}}var Dn=Array.prototype;function Cn(t,e){return typeof t=="function"?t.apply(null,e):t}function we(t,e,o){o=o||t.length;var r=o===1?e?t:N(t):N(function(i){return we(function(){var s=[i];return s.push.apply(s,arguments),t.apply(null,s)},e,o-1)});return function i(s){return arguments.length===0?i:arguments.length===1?r(s):arguments.length>=o?t.apply(null,arguments):Cn(r(s),Dn.slice.call(arguments,1))}}var m=we;function L(){}var Vn=h(g,{is:L,tag:L,data:function(t,e,o){Object.assign(e.dataset,o)},html:function(t,e,o){e.innerHTML=o},text:function(t,e,o){e.textContent=o},children:function(t,e,o){e.innerHTML="",e.append.apply(e,o)},points:G,cx:G,cy:G,r:G,transform:G,preserveAspectRatio:G,viewBox:G,default:function(t,e,o){t in e?e[t]=o:e.setAttribute(t,o)}});function G(t,e,o){e.setAttribute(t,o)}function In(t,e){for(var o=Object.keys(e),r=o.length;r--;)Vn(o[r],t,e[o[r]]);return t}var ct=m(In,!0);var Vt="http://www.w3.org/2000/svg",ge=document.createElement("template"),It=(t,e)=>e&&typeof e;function ye(t,e){let o=document.createRange();return o.selectNode(t),o.createContextualFragment(e)}var E=h(It,{string:function(t,e){let o=document.createElementNS(Vt,t);return o.innerHTML=e,o},object:function(t,e){let o=document.createElementNS(Vt,t);return typeof e.length=="number"?o.append.apply(o,e):ct(o,e),o},default:t=>document.createElementNS(Vt,t)}),An=h(It,{string:function(t,e){let o=document.createElement(t);return o.innerHTML=e,o},object:function(t,e){let o=document.createElement(t);return typeof e.length=="number"?o.append.apply(o,e):ct(o,e),o},default:t=>document.createElement(t)}),jn=h(g,{comment:function(t,e){return document.createComment(e||"")},fragment:h(It,{string:function(t,e,o){return o?ye(o,e):(ge.innerHTML=e,ge.content.cloneNode(!0))},object:function(t,e,o){let r=o?ye(o):document.createDocumentFragment();return typeof e.length=="number"?r.append.apply(r,e):ct(r,e),r},default:()=>document.createDocumentFragment()}),text:function(t,e){return document.createTextNode(e||"")},circle:E,ellipse:E,g:E,glyph:E,image:E,line:E,rect:E,use:E,path:E,pattern:E,polygon:E,polyline:E,svg:E,default:An}),T=jn;function At(t,e,o){let r;typeof o!="string"&&o.input!==void 0&&o.index!==void 0&&(r=o,o=r.input.slice(o.index+o[0].length+(o.consumed||0)));let i=t.exec(o);if(!i)return;let s=e(i);return r&&(r.consumed=(r.consumed||0)+i.index+i[0].length+(i.consumed||0)),s}var jt=m(At,!0);function Gn(t,e,o){throw o.input!==void 0&&o.index!==void 0&&(o=o.input),new Error('Cannot parse string "'+(o.length>128?o.length.slice(0,128)+"…":o)+'"')}function zn(t,e,o){let r=-1;for(;++r<o.length;)e=o[r]!==void 0&&t[r]?t[r](e,o):e;return t.done?t.done(e,o):t.close?t.close(e,o):e}function Un(t,e,o,r){let i=At(t,s=>zn(e,o,s),r);return i===void 0?e.catch?e.catch(o,r):Gn(t,e,r):i}var pt=m(Un,!0);var M=Symbol("internals"),z=Symbol("shadow"),be=Object.defineProperties,Wn={a:HTMLAnchorElement,article:HTMLElement,dl:HTMLDListElement,p:HTMLParagraphElement,br:HTMLBRElement,fieldset:HTMLFieldSetElement,hr:HTMLHRElement,img:HTMLImageElement,li:HTMLLIElement,ol:HTMLOListElement,optgroup:HTMLOptGroupElement,q:HTMLQuoteElement,section:HTMLElement,textarea:HTMLTextAreaElement,td:HTMLTableCellElement,th:HTMLTableCellElement,tr:HTMLTableRowElement,tbody:HTMLTableSectionElement,thead:HTMLTableSectionElement,tfoot:HTMLTableSectionElement,ul:HTMLUListElement},_n={name:{set:function(t){return this.setAttribute("name",t)},get:function(){return this.getAttribute("name")||""}},form:{get:function(){return this[M].form}},labels:{get:function(){return this[M].labels}},validity:{get:function(){return this[M].validity}},validationMessage:{get:function(){return this[M].validationMessage}},willValidate:{get:function(){return this[M].willValidate}},checkValidity:{value:function(){return this[M].checkValidity()}},reportValidity:{value:function(){return this[M].reportValidity()}}},Rn={},xe={once:!0},ve=0,Se=!1;function Yn(t){return Wn[t]||window["HTML"+t[0].toUpperCase()+t.slice(1)+"Element"]||(()=>{throw new Error('Constructor not found for tag "'+t+'"')})()}var $n=pt(/^\s*<?([a-z][\w]*-[\w-]+)>?\s*$|^\s*<?([a-z][\w]*)\s+is[=\s]*["']?([a-z][\w]*-[\w]+)["']?>?\s*$/,{1:(t,e)=>({name:e[1]}),2:(t,e)=>({name:e[3],tag:e[2]}),catch:function(t,e){throw new SyntaxError(`dom element() – name must be of the form 'element-name' or 'tag is="element-name"' (`+e+")")}},null);function Nn(t,e){if(t.hasOwnProperty(e)){let o=t[e];delete t[e],t[e]=o}return t}function Ee(t,e,o){t._initialLoad=!0;let r=t.attachShadow({mode:e.mode||"closed",delegatesFocus:e.focusable||!1});if(o){let i=T("link",{rel:"stylesheet",href:o});r.append(i)}return t[z]=r,r}function qn(t){var e;if(t.attachInternals){if(e=t.attachInternals(),e.setFormValue)return e}else e={shadowRoot:t.shadowRoot};return e.input=T("input",{type:"hidden",name:t.name}),t.appendChild(e.input),e.setFormValue=function(o){this.input.value=o},e}function Xn(t){return!!t.attribute}function Kn(t){return t.set||t.get||t.hasOwnProperty("value")}function Qn(t,e){return Xn(e[1])&&(t.attributes[e[0]]=e[1].attribute),Kn(e[1])&&(t.properties[e[0]]=e[1]),t}function Gt(t,e,o,r,i=""){let{name:s,tag:a}=$n(t),p=typeof a=="string"?Yn(a):HTMLElement,{attributes:l,properties:w}=o?Object.entries(o).reduce(Qn,{attributes:{},properties:{}}):Rn;function d(){let u=Reflect.construct(p,arguments,d),P=e.construct&&e.construct.length>ve?Ee(u,e,r||e.stylesheet):void 0,S=d.formAssociated?qn(u):{};return a&&(Se=!0),e.construct&&e.construct.call(u,P,S),w&&Object.keys(w).reduce(Nn,u),u}return d.prototype=Object.create(p.prototype,w),w.value&&(d.formAssociated=!0,be(d.prototype,_n),(e.enable||e.disable)&&(d.prototype.formDisabledCallback=function(u){return u?e.disable&&e.disable.call(this,this[z],this[M]):e.enable&&e.enable.call(this,this[z],this[M])}),e.reset&&(d.prototype.formResetCallback=function(){return e.reset.call(this,this[z],this[M])}),e.restore&&(d.prototype.formStateRestoreCallback=function(){return e.restore.call(this,this[z],this[M])})),l&&(d.observedAttributes=Object.keys(l),d.prototype.attributeChangedCallback=function(u,P,S){return l[u].call(this,S)}),d.prototype.connectedCallback=function(){let u=this,P=u[z],S=u[M];if(u._initialLoad){let k=P.querySelectorAll('link[rel="stylesheet"]');if(k.length){let Ct=0,Q=k.length,J=function(f){++Ct>=k.length&&(delete u._initialLoad,e.load&&e.load.call(u,P))},Z=J;for(;Q--;)k[Q].addEventListener("load",J,xe),k[Q].addEventListener("error",Z,xe)}else e.load&&Promise.resolve(1).then(()=>e.load.call(this,P,S))}e.connect&&e.connect.call(this,P,S)},e.disconnect&&(d.prototype.disconnectedCallback=function(){return e.disconnect.call(this,this[z],this[M])}),window.console&&window.console.log("%c<"+(a?a+" is="+s:s)+">%c "+i,"color: #3a8ab0; font-weight: 600;","color: #888888; font-weight: 400;"),window.customElements.define(s,d,a&&{extends:a}),a&&!Se&&document.querySelectorAll('[is="'+s+'"]').forEach(u=>{w&&be(u,w);let P=e.construct&&e.construct.length>ve?Ee(u,e,r||e.stylesheet):void 0;e.construct&&e.construct.call(u,P);let S;for(S in l){let k=u.attributes[S];k&&l[S].call(u,k.value)}e.connect&&e.connect.apply(u)}),d}var zt=Symbol("privates");function B(t){return t[zt]||Object.defineProperty(t,zt,{value:{}})[zt]}function lt(t,e,o){return o>e?e:o<t?t:o}var Xr=m(lt);function Ut(t){return function(){return arguments[t]}}function O(){return this}var Jn=Object.create,Zn=Object.freeze;function to(){return!0}function Te(){return-1}var F=Zn(Jn({shift:L,push:L,forEach:L,join:function(){return""},every:to,filter:O,find:L,findIndex:Te,flat:O,flatMap:O,includes:function(){return!1},indexOf:Te,map:O,reduce:Ut(1),sort:O,each:O,pipe:g,start:O,stop:O,done:O,valueOf:function(){return null}},{length:{value:0}}));function Wt(t,e){t.remove&&t.remove(e);let o;for(;(o=t.indexOf(e))!==-1;)t.splice(o,1);return t}var ii=m(Wt,!0);function _t(t){return t&&t[Symbol.iterator]}var eo=Object.assign;function no(t){return t.stop?t.stop():t()}function nt(){}eo(nt.prototype,{stop:function(){let t=this.stopables;return this.stopables=void 0,t&&t.forEach(no),this},done:function(t){return(this.stopables||(this.stopables=[])).push(t),this}});var H=Object.assign,V=Object.create;function ot(t,e){t[0]=e,e.done(t)}function Me(t,e){let o=t[e].stopables;o&&Wt(o,t),t[e]=void 0}function y(t,e){t&&t.push(e)}function x(t){nt.prototype.stop.apply(t);let e=-1,o;for(;o=t[++e];)t[e]=void 0,o.stop()}function Be(t){return c.prototype.isPrototypeOf(t)}function c(t){this.input=t}H(c.prototype,nt.prototype,{push:function(t){y(this[0],t)},pipe:function(t){if(this[0])throw new Error("Stream: Attempt to .pipe() a unicast stream multiple times. Create a multicast stream with .broadcast().");return this[0]=t,t.done(this),this.input.pipe(this),t},map:function(t){return new Oe(this,t)},filter:function(t){return new ke(this,t)},split:function(t){return new Le(this,t)},flatMap:function(t){return new Pe(this,t)},slice:function(t,e){return new Rt(this,t,e)},take:function(t){return console.warn(".take(a) superseded by .slice(0, a)"),new Rt(this,0,t)},each:function(t){return this.pipe(new De(t))},reduce:function(t,e){return this.pipe(new Fe(t,e)).value},scan:function(t,e){return new He(this,t,e)},stop:function(){return x(this),this}});function Oe(t,e){this.input=t,this.fn=e}Oe.prototype=H(V(c.prototype),{push:function(e){let r=this.fn(e);r!==void 0&&y(this[0],r)}});function ke(t,e){this.input=t,this.fn=e}ke.prototype=H(V(c.prototype),{push:function(e){this.fn(e)&&y(this[0],e)}});function Pe(t,e){this.input=t,this.fn=e}Pe.prototype=H(V(c.prototype),{push:function(e){let r=this.fn(e);if(r!==void 0)if(_t(r))for(let i of r)y(this[0],i);else r.pipe&&this.done(r.each(i=>y(this[0],i)))}});function Le(t,e){this.input=t,this.chunk=[],typeof n=="number"?this.n=e:this.fn=e}Le.prototype=H(V(c.prototype),{fn:function(){return this.chunk.length===this.n},push:function(e){let o=this.chunk;this.fn(e)?(y(this[0],o),this.chunk=[]):o.push(e)}});function Rt(t,e,o=1/0){this.input=t,this.index=-e,this.indexEnd=e+o}Rt.prototype=H(V(c.prototype),{push:function(e){++this.index>0&&this[0].push(e),this.index===this.indexEnd&&this.stop()}});function Fe(t,e){this.fn=t,this.value=e,this.i=0}Fe.prototype=H(V(c.prototype),{push:function(t){let e=this.fn;this.value=e(this.value,t,this.i++,this)}});function He(t,e,o){this.input=t,this.fn=e,this.value=o}He.prototype=H(V(c.prototype),{push:function(t){let e=this.fn;this.value=e(this.value,t),this[0].push(this.value)}});function De(t){this.push=t}De.prototype=H(V(c.prototype),{each:null,reduce:null,pipe:null});var oo=Object.assign,ro=Object.create;function io(t,e){if(t[1]){let o=-1;for(;t[++o]&&t[o]!==e;);for(;t[o++];)t[o-1]=t[o]}else t.stop()}function rt(t,e){c.apply(this,arguments),this.memory=!!(e&&e.memory),e&&e.hot&&this.pipe(F)}rt.prototype=oo(ro(c.prototype),{push:function(t){if(t===void 0)return;this.memory&&(this.value=t);let e=-1;for(;this[++e];)this[e].push(t)},pipe:function(t){let e=-1;for(;this[++e];);return this.memory&&e===0&&this.input.pipe(this),this[e]=t,t.done(()=>io(this,t)),this.value!==void 0&&t.push(this.value),!this.memory&&e===0&&this.input.pipe(this),t}});var so=Array.prototype,uo=Object.assign,ao=Object.create;function co(t){return t!==void 0}function it(t){this.buffer=t?t.filter?t.filter(co):t:[]}it.prototype=uo(ao(c.prototype),{push:function(t){t!==void 0&&y(this.buffer,t)},pipe:function(t){for(t.done(this),this[0]=t;this.buffer.length;)y(this[0],so.shift.apply(this.buffer));return this.buffer=t,t},stop:function(){return this.buffer=void 0,x(this),this}});var Ce=Object.assign,po=Object.create,lo=Promise.resolve(),fo={schedule:function(){lo.then(this.fire)},unschedule:L},ho={schedule:function(){this.timer=requestAnimationFrame(this.fire)},unschedule:function(){cancelAnimationFrame(this.timer),this.timer=void 0}},mo={schedule:function(){this.timer=setTimeout(this.fire,this.duration*1e3)},unschedule:function(){clearTimeout(this.timer),this.timer=void 0}};function U(t,e){c.apply(this,arguments),this.duration=e,this.timer=void 0,this.fire=()=>{this.timer=void 0,this.output.stop()},Ce(this,e==="tick"?fo:e==="frame"?ho:mo)}U.prototype=Ce(po(c.prototype),{push:function(t){this.timer?(this.unschedule(),this.schedule(),this.output.push(t)):(this.output=c.of(t),this[0].push(this.output),this.schedule())},stop:function(){return this.timer&&this.fire(),c.prototype.stop.apply(this,arguments)}});var Yt=Object.assign,wo=Object.create,Ve=Object.keys;function $t(t,e,o,r,i){this.stream=t,this.names=e,this.values=o,this.name=r,this.input=i}Yt($t.prototype,{push:function(t){let e=this.stream,o=this.values,r=this.name;o[r]=t,(e.active||(e.active=Ve(o).length===this.names.length))&&y(e[0],Yt({},o))},stop:function(){--this.stream.count===0&&x(this.stream)},done:function(t){this.stream.done(t)}});function ft(t){this.inputs=t,this.active=!1}ft.prototype=Yt(wo(c.prototype),{push:null,pipe:function(t){let e=this.inputs,o=Ve(e),r={};this.count=o.length,this[0]=t,t.done(this);let i;for(i in e){let s=e[i];if(s.pipe){let a=new $t(this,o,r,i,s);s.pipe(a)}else if(s.then){let a=new $t(this,o,r,i,s);s.then(p=>a.push(p)),s.finally(()=>a.stop())}else r[i]=s,--this.count}return t}});var go=Object.assign,yo=Object.create;function ht(t){this.fn=t}ht.prototype=go(yo(c.prototype),{pipe:function(t){return t.done(this),this[0]=t,this.fn(e=>this.push(e),e=>this.stop(e)),t}});var Ie=Object.assign,bo=Object.create;function Ae(t){this.stream=t}Ie(Ae.prototype,{push:function(t){y(this.stream[0],t)},stop:function(){--this.stream.count===0&&x(this.stream)},done:function(t){this.stream.done(t)}});function dt(t){this.inputs=t}dt.prototype=Ie(bo(c.prototype),{push:null,pipe:function(t){let e=this.inputs;this.count=e.length,this[0]=t,t.done(this);let o=new Ae(this),r=-1,i;for(;i=e[++r];)if(i.pipe)i.pipe(o);else if(i.then)i.then(s=>o.push(s)),i.finally(()=>o.stop());else{let s=-1;for(;++s<i.length;)o.push(i[s]);o.stop()}return t}});var xo=Object.assign,vo=Object.create;function mt(t){this.promise=t}mt.prototype=xo(vo(c.prototype),{push:null,pipe:function(t){let e=this.promise;return this[0]=t,t.done(this),e.then(o=>y(this,o)),e.finally(()=>x(this)),t}});var So=Array.prototype,je=Object.assign;function Eo(t){throw new TypeError("Stream cannot be created from "+typeof object)}je(c,{isStream:Be,of:function(){return new it(So.slice.apply(arguments))},from:function(t){return t.pipe?new c(t):t.then?new mt(t):typeof t.length=="number"?typeof t=="function"?new ht(t):new it(t):Eo(t)},batch:t=>new U(F,t),burst:t=>(console.warn("Stream.burst() is now Stream.batch()"),new U(F,t)),broadcast:t=>new rt(F,t),combine:t=>new ft(t),merge:function(){return new dt(arguments)},writeable:function(t){let e=new c(F);return t(e),e}});je(c.prototype,{log:O,batch:function(t){return new U(this,t)},burst:function(t){return console.warn("stream.burst() is now stream.batch()"),new U(this,t)},broadcast:function(t){return new rt(this,t)}});function To(t,e){return e[t]}var wt=m(To,!0);function q(t){if(typeof t.length=="number")return t[t.length-1]}function Nt(t,e,o){return(o-t)/(e-t)}function W(t,e,o){return o*(e-t)+t}var Mo=Object.assign,Bo=Object.defineProperties,Oo=Object.isExtensible,ko=Object.prototype,_=Symbol("observe");function Po(t,e){let o=t.indexOf(e);return o>-1&&t.splice(o,1),t}var Ge={[_]:{}};function gt(t,e){if(!t||!t.length)return 0;t=t.slice(0);for(var o=-1;t[++o];)t[o].status!=="stopped"&&t[o].push(e);return o}function ze(t){this.observables={},this.gets=[],this.sets=void 0,this.target=t,this.observer=new Proxy(t,this),Ge[_].value=this,Bo(t,Ge)}Mo(ze.prototype,{notify:function(t){gt(this.observables[t],this.target[t]),gt(this.sets,this.target)},listen:function(t,e){(t===null?this.sets||(this.sets=[]):this.observables[t]||(this.observables[t]=[])).push(e)},unlisten:function(t,e){let o=t===null?this.sets:this.observables[t];o&&Po(o,e)},get:function(e,o,r){let i=e[o];if(typeof o=="symbol"||o==="__proto__")return i;let s=Object.getOwnPropertyDescriptor(e,o);if((s?s.writable||s.set:i===void 0)&&gt(this.gets,o),!ko.hasOwnProperty.call(e,o))return i;let p=X(i);if(!p)return i;for(var l=-1;this.gets[++l];)this.gets[l].listen(o);return p},set:function(e,o,r,i){if(typeof o=="symbol"||o==="__proto__")return e[o]=r,!0;let s=R(r);if(e[o]===r||e[o]===s)return!0;let a=e.length;for(var p=-1;this.gets[++p];)this.gets[p].unlisten(o);return e[o]=s,o!=="length"&&e.length!==a&&gt(this.observables.length,e.length),this.notify(o),!0},deleteProperty:function(t,e){return typeof e=="symbol"||e==="__proto__"?(delete t[e],!0):(t.hasOwnProperty(e)&&(delete t[e],this.notify(e)),!0)}});function yt(t){return t&&Oo(t)&&!Node.prototype.isPrototypeOf(t)&&(typeof BaseAudioContext>"u"||!BaseAudioContext.prototype.isPrototypeOf(t))&&!(t instanceof Date)&&!(t instanceof RegExp)&&!(t instanceof Map)&&!(t instanceof WeakMap)&&!(t instanceof Set)&&!(window.WeakSet&&t instanceof WeakSet)&&!ArrayBuffer.isView(t)}function X(t,e){return t?t[_]?t[_].observer:e||yt(t)?new ze(t).observer:void 0:void 0}function R(t){return t&&t[_]&&t[_].target||t}function qt(t){return X(t)&&t[_]}var Ue=Object.assign,Lo=Object.create,Xt=/(^\.?|\.)\s*([\w-]*)\s*/g;function Fo(t){this.producer.push(t)}function Kt(t,e,o,r){Xt.lastIndex=e;let i=Xt.exec(t);this.path=t,this.object=o,this.producer=r,this.key=i[2]||i[1],this.index=Xt.lastIndex,this.isMuteableObserver=this.path.slice(this.index)===".",this.index>=this.path.length&&(this.push=Fo),this.listen(),this.push(this.key==="."?this.object:R(this.object)[this.key])}Ue(Kt.prototype,{push:function(t){yt(t)?this.child?this.child.relisten(t):this.child=new Kt(this.path,this.index,t,this.producer):(this.child&&(this.child.stop(),this.child=void 0),this.producer.push(this.isMuteableObserver?t:void 0))},listen:function(){let t=qt(this.object);t&&t.listen(this.key==="."?null:this.key,this)},unlisten:function(){qt(this.object).unlisten(this.key==="."?null:this.key,this)},relisten:function(t){this.unlisten(),this.object=t,this.listen(),this.push(R(this.object)[this.key])},stop:function(){this.unlisten(),this.child&&this.child.stop(),this.child=void 0,this.status="stopped"}});function We(t,e,o){this.path=t,this.object=e,this.value=o}We.prototype=Ue(Lo(c.prototype),{push:function(t){this.value===t&&(!this.isMutationProducer||!yt(t))||(this.value=t,this[0].push(t))},pipe:function(t){return this[0]=t,t.done(this),this.pathObserver=new Kt(this.path,0,this.object,this),this.isMutationProducer=this.path[this.path.length-1]===".",t},stop:function(){return this.pathObserver.stop(),c.prototype.stop.apply(this,arguments)}});function bt(t,e,o){return new c(new We(t,e,o))}function Qt(t){if(typeof t!="object"||arguments.length>1)throw new Error("delegate() now takes an object of selector:fn pairs.");return function(o){let r=o.target,i;for(i in t){let s=r.closest(i);if(s)return t[i](s,...arguments)}}}var Ho=Object.assign,Do=/\s+/,xt={fullscreenchange:N(()=>"fullscreenElement"in document?"fullscreenchange":"webkitFullscreenElement"in document?"webkitfullscreenchange":"mozFullScreenElement"in document?"mozfullscreenchange":"msFullscreenElement"in document?"MSFullscreenChange":"fullscreenchange")},_e=0;window.addEventListener("click",t=>_e=t.timeStamp);function Co(t,e){return t.node.addEventListener(xt[e]?xt[e]():e,t,t.options),t}function Vo(t,e){return t.node.removeEventListener(xt[e]?xt[e]():e,t),t}function Re(t,e,o){this.types=t.split(Do),this.options=e,this.node=o,this.select=e&&e.select}Ho(Re.prototype,{pipe:function(t){ot(this,t),this.types.reduce(Co,this)},handleEvent:function(t){if(!(t.type==="click"&&t.timeStamp<=_e)){if(this.select){let e=t.target.closest(this.select);if(!e)return;t.selectedTarget=e}y(this[0],t)}},stop:function(){this.types.reduce(Vo,this),x(this[0])}});function vt(t,e){let o;return typeof t=="object"&&(o=t,t=o.type),new c(new Re(t,o,e))}var Io=Object.assign,st={bubbles:!0,cancelable:!0};function St(t,e){var w;let o=st,r,i,s,a,p,l;return typeof t=="object"?(w=t,{type:t,detail:i,bubbles:s,cancelable:a,composed:p}=w,r=me(w,["type","detail","bubbles","cancelable","composed"]),l=Io(new CustomEvent(t,{detail:i,bubbles:s||st.bubbles,cancelable:a||st.cancelable,composed:p||st.composed}),r)):l=new CustomEvent(t,st),e.dispatchEvent(l)}var rs=m(St,!0);function I(t){return typeof t}var Ao=/^\s*([+-]?\d*\.?\d+)([^\s\d]*)\s*$/;function Jt(t){return function(o){if(typeof o=="number")return o;var r=Ao.exec(o);if(!r||!t[r[2]||""]){if(!t.catch)throw new Error('Cannot parse value "'+o+'" (accepted units '+Object.keys(t).join(", ")+")");return r?t.catch(parseFloat(r[1]),r[2]):t.catch(parseFloat(o))}return t[r[2]||""](parseFloat(r[1]))}}var jo=/px$/,Ye={"transform:translateX":function(t){var e=ut("transform",t);if(!e||e==="none")return 0;var o=Et(e);return parseFloat(o[4])},"transform:translateY":function(t){var e=ut("transform",t);if(!e||e==="none")return 0;var o=Et(e);return parseFloat(o[5])},"transform:scale":function(t){var e=ut("transform",t);if(!e||e==="none")return 0;var o=Et(e),r=parseFloat(o[0]),i=parseFloat(o[1]);return Math.sqrt(r*r+i*i)},"transform:rotate":function(t){var e=ut("transform",t);if(!e||e==="none")return 0;var o=Et(e),r=parseFloat(o[0]),i=parseFloat(o[1]);return Math.atan2(i,r)}};function Et(t){return t.split("(")[1].split(")")[0].split(/\s*,\s*/)}function ut(t,e){return window.getComputedStyle?window.getComputedStyle(e,null).getPropertyValue(t):0}function Tt(t,e){if(Ye[t])return Ye[t](e);var o=ut(t,e);return typeof o=="string"&&jo.test(o)?parseFloat(o):o}var Mt,Bt;function Go(){if(!Mt){let t=document.documentElement.style.fontSize;document.documentElement.style.fontSize="100%",Mt=Tt("font-size",document.documentElement),document.documentElement.style.fontSize=t||""}return Mt}function zo(){return Bt||(Bt=Tt("font-size",document.documentElement)),Bt}window.addEventListener("resize",()=>{Mt=void 0,Bt=void 0});var Y=h(I,{number:g,string:Jt({px:g,em:t=>Go()*t,rem:t=>zo()*t,vw:t=>window.innerWidth*t/100,vh:t=>window.innerHeight*t/100,vmin:t=>window.innerWidth<window.innerHeight?window.innerWidth*t/100:window.innerHeight*t/100,vmax:t=>window.innerWidth<window.innerHeight?window.innerHeight*t/100:window.innerWidth*t/100})}),$e=Y;function Zt(t){t.stopPropagation(),t.preventDefault()}var Uo=Array.prototype,ee=Object.assign,te="webkitUserSelect"in document.body.style?"webkitUserSelect":"userSelect",Ot={},kt={threshold:4,ignoreTags:{textarea:!0,input:!0,select:!0}};function Wo(t,e,o){return e*e+o*o>=t*t}function Ne(t,e,o){if(this.stream=t,this.events=[e],this.options=o,this.pointerId=e.pointerId,typeof o.threshold=="function")this.checkThreshold=o.threshold;else{let r=$e(o.threshold);this.checkThreshold=(i,s,a)=>Wo(r,i,s,a)}document.addEventListener("pointermove",this),document.addEventListener("pointerup",this),document.addEventListener("pointercancel",this)}ee(Ne.prototype,{handleEvent:h(wt("type"),{pointermove:function(t){if(this.pointerId===t.pointerId){if(this.pointerId in Ot&&this!==Ot[this.pointerId]){this.stop();return}if(this.events.push(t),!this.isGesture){let e=this.events[0],o=t.clientX-e.clientX,r=t.clientY-e.clientY,i=(t.timeStamp-e.timeStamp)/1e3;this.checkThreshold(o,r,i)&&this.createGesture()}}},pointerup:function(t){this.pointerId===t.pointerId&&(this.events.push(t),this.stop(),this.isGesture&&document.addEventListener("click",Zt,{capture:!0,once:!0}))},default:function(t){this.pointerId===t.pointerId&&(this.events.push(t),this.stop())}}),createGesture:function(){this.isGesture=!0,this.userSelectState=document.body.style[te],document.body.style[te]="none",Ot[this.pointerId]=this,this.stream.push(new c(this))},pipe:function(t){for(ot(this,t);this.events.length;)y(this[0],Uo.shift.apply(this.events));this.events=t},stop:function(){if(document.removeEventListener("pointermove",this),document.removeEventListener("pointerup",this),document.removeEventListener("pointercancel",this),this.isGesture&&(document.body.style[te]=this.userSelectState,delete Ot[this.pointerId]),this[0]){let t=this[0];Me(this,0),x(t)}}});function _o(t){var e=t.target.tagName;return e&&(!!kt.ignoreTags[e.toLowerCase()]||t.target.draggable)}function qe(t,e){this.node=t,this.options=e}ee(qe.prototype,{pipe:function(t){return this[0]=t,this.node.addEventListener("pointerdown",this),t},handleEvent:function(t){if(t.button===0&&!(this.options.device&&!this.options.device.includes(t.pointerType))&&!_o(t)&&!(this.options.select&&!t.target.closest(this.options.select))){var e={type:t.type,target:t.target,currentTarget:t.currentTarget,clientX:t.clientX,clientY:t.clientY,timeStamp:t.timeStamp,pointerId:t.pointerId};new Ne(this[0],e,this.options)}},stop:function(){return this[0]&&(this.node.removeEventListener("pointerdown",this),x(this[0])),this}});function ne(t,e){return t=e&&t?ee({},kt,t):kt,e=e||t,new c(new qe(e,t))}function Ro(){return{x:0,y:0,left:0,top:0,right:window.innerWidth,bottom:window.innerHeight,width:window.innerWidth,height:window.innerHeight}}function Pt(t){return t===window?Ro():t.getClientRects()[0]||t.getBoundingClientRect()}function b(t){return Math.pow(10,t/20)}function D(t){if(!t)return 0;let e=+t;if(e||e===0)return e;let o=/^(?:(-?[\d.]+)|(-?∞))(?:(db|bpm)|(m|k)?(\w+))$/.exec(t.toLowerCase());if(!o)return 0;let r=o[2]?o[2]==="-∞"?-1/0:1/0:parseFloat(o[1]);return o[3]==="db"?b(r):o[3]==="bpm"?r/60:o[4]==="m"?r/1e3:o[4]==="k"?r*1e3:r}var Xe=pt(/^([+\-]?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+\-]?\d+)?\w*)\s*(?:\[([^\]]+)\]|([^\d\s]\S*))?\s*/,{1:(t,e)=>(t.push({value:D(e[1])}),t),2:(t,e)=>(q(t).label=e[2],t),3:(t,e)=>(q(t).label=e[3],t),done:(t,e)=>Xe(t,e),catch:(t,e)=>t}),K=h(I,{string:t=>Xe([],t.trim()),object:g});function v(t,e){return Math.ceil(e/t)*t}var Ke=h(t=>t.toLowerCase(),{db:(t,e,o)=>K("-∞dB -96dB -90dB -84dB -78dB -72dB -66dB -60dB -54dB -48dB -42dB -36dB -30dB -24dB -18dB -12dB -6dB 0dB 6dB 12dB 18dB 24dB"),default:(t,e,o)=>{let r=o-e,i=r<.8?v(.05,r/10):r<2?v(.2,r/10):r<8?v(.5,r/10):r<20?v(2,r/10):r<80?v(5,r/10):r<200?v(20,r/10):v(200,r),s=[],a=r<.8?v(.05,e):r<2?v(.2,e):r<8?v(.5,e):r<20?v(2,e):r<80?v(5,e):r<200?v(20,e):v(200,e);for(;a<=o;)s.push({label:r<2?a.toFixed(1):a,value:a}),a+=i;return s}});function Qe(t,e,o,r){return t.normalValue=e.normalise(o,r,t.value),t}function Je(t,e){let{scale:o,min:r,max:i,ticks:s,step:a,display:p}=e;return t.scale=o,t.min=r,t.max=i,t.ticks=(s?s.length?s:Ke(p,r,i):F).filter(l=>l.value>=t.min&&l.value<=t.max).map(l=>Qe(l,o,r,i)),t.step=a==="any"?void 0:a==="tick"?t.ticks:K(a).filter(l=>l.value>=t.min&&l.value<=t.max).map(l=>Qe(l,o,r,i)),t.display=p,t}function oe(t){return 20*Math.log10(t)}function A(t,e){var o=e%t;return o<0?o+t:o}var qs=m(A);function re(t){return function(o,...r){var i=t[o]||t.default;return i&&i.apply(this,r)}}var on=9,Yo=/(`[^`]*`)|(ms|[YMwdhms]{1,3}|±)/g;function $o(t){return t*60}function No(t){return t*3600}function qo(t){return t*1e3}function Ze(t){return t/60}function tn(t){return t/3600}function ie(t){return t/86400}function Xo(t){return t/604800}function en(t){return t/2629800}function Ko(t){return t/31557600}function j(t){return t>=10?"":"0"}var Qo=/^([+-])?(\d{2,}):([0-5]\d)(?::((?:[0-5]\d|60)(?:.\d+)?))?$/,Jo=/^([+-])?(\d{2,}):(\d{2,})(?::(\d{2,}(?:.\d+)?))?$/,$=h(I,{number:g,string:jt(Qo,sn),default:function(t){throw new Error("parseTime() does not accept objects of type "+typeof t)}}),rn=h(I,{number:g,string:jt(Jo,sn),default:function(t){throw new Error("parseTime() does not accept objects of type "+typeof t)}});function sn(t){let[e,o,r,i,s]=t;var a=No(parseInt(r,10))+(i?$o(parseInt(i,10))+(s?parseFloat(s,10):0):0);return o==="-"?-a:a}function Zo(t,e){return t.replace(Yo,(o,r,i)=>r?r.slice(1,-1):nn[o]?nn[o](e):o)}function tr(t){var e=t<0?"-":"";t<0&&(t=-t);var o=Math.floor(t/3600),r=j(o)+o;if(t=t%3600,t===0)return e+r+":00";var i=Math.floor(t/60),s=j(i)+i;if(t=t%60,t===0)return e+r+":"+s;var a=j(t)+un(on,t);return e+r+":"+s+":"+a}function un(t,e){return e.toFixed(t).replace(/\.?0+$/,"")}var nn={"±":function(e){return e<0?"-":""},Y:function(e){return e=e<0?-e:e,Math.floor(Ko(e))},M:function(e){return e=e<0?-e:e,Math.floor(en(e))},MM:function(e){return e=e<0?-e:e,Math.floor(en(e%31557600))},w:function(e){return e=e<0?-e:e,Math.floor(Xo(e))},ww:function(e){return e=e<0?-e:e,Math.floor(ie(e%2629800))},d:function(e){return e=e<0?-e:e,Math.floor(ie(e))},dd:function(e){return e=e<0?-e:e,Math.floor(ie(e%604800))},h:function(e){return e=e<0?-e:e,Math.floor(tn(e))},hh:function(e){e=e<0?-e:e;var o=Math.floor(tn(e%86400));return j(o)+o},m:function(e){e=e<0?-e:e;var o=Math.floor(Ze(e));return j(o)+o},mm:function(e){e=e<0?-e:e;var o=Math.floor(Ze(e%3600));return j(o)+o},s:function(e){return e=e<0?-e:e,Math.floor(e)},ss:function(e){e=e<0?-e:e;var o=Math.floor(e%60);return j(o)+o},sss:function(e){e=e<0?-e:e;var o=e%60;return j(o)+un(on,o)},ms:function(e){e=e<0?-e:e;var o=Math.floor(qo(e%1));return o>=100?o:o>=10?"0"+o:"00"+o}},an=m(function(t,e){return t==="ISO"?tr($(e)):Zo(t,$(e))});var ru=m(function(t,e){return $(e)+rn(t)}),iu=m(function(t,e){return $(e)-rn(t)}),su=m(function(t,e){return $(t)-$(e)}),er=re({w:function(t){return t-A(604800,t)},d:function(t){return t-A(86400,t)},h:function(t){return t-A(3600,t)},m:function(t){return t-A(60,t)},s:function(t){return t-A(1,t)},ms:function(t){return t-A(.001,t)}}),uu=m(function(t,e){return er(t,$(e))});function nr(){return{unit:value<1?"m"+unit:unit,value:value<.001?(value*1e3).toFixed(2):value<1?(value*1e3).toPrecision(3):value.toPrecision(3)}}function or(t,e){return{unit:e<1?"m"+t:e>=1e3?"k"+t:t,value:e<.001?(e*1e3).toFixed(2):e<1?(e*1e3).toPrecision(3):e>=1e3?(e/1e3).toPrecision(3):e.toPrecision(3)}}function rr(t,e){return{unit:e<.01?"m"+t:e<1?"c"+t:e>=1e3?"k"+t:t,value:e<.001?(e*1e3).toFixed(2):e<.01?(e*1e3).toPrecision(3):e<1?(e*100).toPrecision(3):e>=1e3?(e/1e3).toPrecision(3):e.toPrecision(3)}}var ir={pan:(t,e)=>({unit:"",value:e===-1?"-1.00":e===0?"0.00":e===1?"1.00":e.toFixed(2)}),db:(t,e)=>{let o=oe(e);return{unit:"dB",value:isFinite(o)?o<-1?o.toPrecision(3):o.toFixed(2):o<0?"-∞":"∞"}},hz:(t,e)=>({unit:e>=1e3?"kHz":"Hz",value:e<1?e.toFixed(2):e>=1e3?(e/1e3).toPrecision(3):e.toPrecision(3)}),semitone:(t,e)=>({unit:"",value:e===0?"0":e<0?"♭"+(-e/100).toFixed(2):"♯"+(e/100).toFixed(2)}),s:nr,m:rr,bpm:(t,e)=>{let o=e*60;return{unit:"bpm",value:o<100?o.toFixed(1):o.toFixed(0)}},int:(t,e)=>({unit:"",value:Math.round(e)}),"":(t,e)=>({unit:"",value:e>-1&&e<1?e.toFixed(2):e.toPrecision(3)}),default:h(t=>/[YMWwdhms]/.test(t)?"time":"default",{time:(t,e)=>({unit:"",value:an(t,e)}),default:or})},fu=h(t=>t.toLowerCase(),ir);var mu=b(-6),wu=b(-12),gu=b(-18),cn=b(-24),pn=b(-30),ln=b(-36),yu=b(-42),fn=b(-48),bu=b(-54),hn=b(-60),dn=b(-66),mn=b(-72),xu=b(-78),vu=b(-84),Su=b(-90),wn=b(-96),se=.25,gn=.4,Eu=Symbol("state");var yn=Object.assign,Ft={};function ue(t,e,o){let r=o/(e*t);return(r<=1?r:Math.log(r)+1)/Ft[t]}function sr(t,e,o){let r=o*Ft[t];return e*t*(r<=1?r:Math.pow(Math.E,r-1))}function C(t){this.xover=t,Ft[t]||(Ft[t]=Math.log(1/t)+1)}yn(C.prototype,{normalise:function(t,e,o){let r=ue(this.xover,e,t);return(ue(this.xover,e,o)-r)/(1-r)},denormalise:function(t,e,o){let r=ue(this.xover,e,t),i=o*(1-r)+r;return sr(this.xover,e,i)}});function Lt(t){this.power=t}yn(Lt.prototype,{normalise:function(t,e,o){return Math.pow((o-t)/(e-t),1/this.power)},denormalise:function(t,e,o){return Math.pow(o,this.power)*(e-t)+t}});var ur={linear:{normalise:Nt,denormalise:W},"pow-2":new Lt(2),"pow-3":new Lt(3),"pow-4":new Lt(4),log:{normalise:function(t,e,o){return Math.log(o/t)/Math.log(e/t)},denormalise:function(t,e,o){return t*Math.pow(e/t,o)}},"log-24db":new C(cn),"log-30db":new C(pn),"log-36db":new C(ln),"log-48db":new C(fn),"log-60db":new C(hn),"log-66db":new C(dn),"log-72db":new C(mn),"log-96db":new C(wn)};function Ht(t){return ur[t&&t.toLowerCase()||"linear"]}var bn=Ht("linear"),xn=0,vn=1;var Sn="any",En="";function Tn(t,e,o,r){return e.delete(o),r.forEach(i=>e.append(o,i.y)),t.setFormValue(e),e}function cr(t){t.stop()}function pr(t,e){return t&&t.stop(),bt(".",e)}function Mn(t,e,o,r,i,s){let a=Pt(t),p=Y(e["font-size"]),l=Y(e.borderTopWidth)||0,w=Y(e.borderBottomWidth)||0,d=Y(e.paddingTop)||0,u=Y(e.paddingBottom)||0;return o.y=a.y+l+d,o.height=a.height-l-d-w-u,r.y=0,r.height=a.height-l-w,i.y=d,i.height=a.height-l-d-w-u,s.y=(0-u-w)/p,s.height=-i.height/p,a}function lr(t,e,o,r,i){r.style.width="",r.style.height="0",i.box=Mn(t,o,i.pxbox,i.paddingbox,i.contentbox,i.rangebox),e.setProperty("--range-y",i.rangebox.y),e.setProperty("--range-height",i.rangebox.height),r.setAttribute("viewBox",0+" "+(i.rangebox.y+i.rangebox.height)+" "+1+" "+-i.rangebox.height),r.style.width="1em",r.style.height=-i.rangebox.height+"em"}function fr(t,e){let o=e.pxbox,r=e.valuebox,i=o.height-(t.clientY-o.y-e.offset.y);e.y=lt(r.y,r.y+r.height,W(r.y,r.y+r.height,i/o.height))}var hr=h((t,e)=>e.type,{pointerdown:(t,e)=>{t.target=e.target,t.time=e.timeStamp/1e3,t.previous&&t.previous.type==="tap"&&t.time-t.previous.time<gn&&(t.type="double-tap",t.target=t.previous.target);let o=Pt(e.target);return t.offset=e.target===e.currentTarget?{y:0}:{y:e.clientY-(o.y+o.height/2)},t.events.length=0,t.events.push(e),t},pointermove:(t,e)=>{t.events.push(e);let o=t.events[0];return e.timeStamp-o.timeStamp<se&&e.clientY-o.clientY<4||(t.type="move",fr(e,t)),t},default:(t,e)=>(t.events.push(e),t.duration=e.timeStamp/1e3-t.time,!t.type&&t.duration<se&&(t.type="tap"),t)}),dr=Qt({".control-handle":h((t,e)=>e.type,{"double-tap":function(t,e){return e},move:function(t,e){let{internals:o,formdata:r,events:i,host:s,value:a,y:p}=e,l=t.dataset.index,w=X(a[l]);return w.value=p,q(i).type!=="pointermove"?(Tn(o,r,s.name,a),St("change",s)):St("input",s),e},default:function(t){console.log("Untyped gesture",t)}})});function mr(t,e,o){return t.push(T("label",{part:o+"-tick tick",style:"--normal-"+o+": "+e.normalValue+";",html:"<span>"+e.label+"</span>"})),t}function Bn(t,e,o,r,i,s,a){t.setAttribute("transform","translate("+.5+" "+W(e.y,e.y+e.height,o.normalise(r,i,s.value))+")"),t.firstElementChild.innerHTML=(s.label?s.label+" ":"")+s.value,t.dataset.index=a}function wr(t,e,o,r,i,s){return T("path",{part:"handle",class:"control control-handle control-point",d:"M 0 0 m -0.5 0 a 0.5 0.5 0 1 0 1 0 a 0.5 0.5 0 1 0 -1 0",tabindex:"0",transform:"translate("+.5+" "+W(t.y,t.y+t.height,e.normalise(o,r,i.value))+")",html:"<title>"+(i.label?i.label+" ":"")+i.value+"</title>",data:{index:s}})}function gr(t,e,o,r,i){let s=-1,a,p;for(;a=i[++s];)t[s]?(p=t[s],Bn(p,o,r.scale,r.min,r.max,a,s)):(p=wr(o,r.scale,r.min,r.max,a,s),t.push(p),e.append(p));for(--s;p=t[++s];)p.remove()}function yr(t,e,o,r,i,s,a,p){e.setProperty("--"+t+"-normal-zero",o.normalise(r,i,0)),a.forEach(l=>l.remove()),a.length=0,a=s.reduce((l,w)=>mr(l,w,t),a),p.after.apply(p,a)}function ae(t,e){t.value=e.value.toPrecision(3)}var On={mode:"closed",focusable:!0,construct:function(t,e){let o=T("style",":host {} :host > * { visibility: hidden; }"),r=T("label",{for:"input",part:"label",html:"<slot></slot>"}),i=T("div",{part:"track"}),s=T("svg"),a=T("text",""),p=T("output",{for:"number",part:"output"}),l=T("input",{type:"number",id:"number"}),w=[],d=[];i.append(s),p.append(l),t.append(o,r,i,a,p);let u=B(this),P={value:[]},S=getComputedStyle(i),k=o.sheet.cssRules[0].style,Ct=o.sheet.cssRules[1].style,Q=new FormData;u.host=this,u.hostStyle=k,u.childStyle=Ct,u.internals=e,u.data=P,u.formdata=Q,u.shadow=new Promise(f=>u.load=f),u.pxbox={},u.paddingbox={},u.contentbox={},u.rangebox={y:6.75,width:6.75},u.valuebox={y:0,width:1},u.scale=c.of(bn),u.min=c.of(xn),u.max=c.of(vn),u.step=c.of(Sn),u.ticks=c.of(null),u.display=c.of(En),u.values=c.of([{value:0}]);let J=c.merge(u.shadow,vt("resize",window)).broadcast();J.each(()=>lr(i,k,S,s,u));let Z=c.combine({shadow:u.shadow,scale:u.scale,min:u.min,max:u.max,ticks:u.ticks,step:u.step,display:u.display}).scan(Je,{}).broadcast();Z.each(f=>{u.valuebox.y=f.min,u.valuebox.height=f.max-f.min}),Z.each(f=>yr("y",k,f.scale,f.min,f.max,f.ticks,w,a));let tt=u.values.scan(pr,null).flatMap(g).broadcast();tt.each(f=>u.value=f),c.combine({axis:Z,resizes:J,value:tt}).each(f=>{u.state=f,gr(d,s,u.rangebox,f.axis,f.value),ae(p,f.value[0])}),u.valueObservers=tt.reduce((f,et)=>(f.forEach(cr),f.push.apply(f,et.map((le,fe,Sr)=>bt(".",le,le).each(he=>{let Ln=s.querySelectorAll("[part=handle]")[fe];Bn(Ln,u.rangebox,u.state.axis.scale,u.state.axis.min,u.state.axis.max,he,fe),ae(p,he)}))),ae(p,et[0]),f),[]),ne({select:"[part=handle]",threshold:1},t).each(f=>{Mn(i,S,u.pxbox,u.paddingbox,u.contentbox,u.rangebox),f.scan(hr,{handles:d,internals:e,host:this,track:i,pxbox:u.pxbox,valuebox:u.valuebox,formdata:u.formdata,value:u.state.value,events:[]}).filter(wt("type")).each(dr),this.focus()}),vt("pointerup",p).reduce((f,et)=>{if(f&&et.timeStamp-f.timeStamp<800){l.focus();return}return et})},load:function(t){let e=B(this);e.childStyle.visibility="",e.load(t)}};function br(t,e){let o=t[t.length-1];return o&&!/^-?\d/.test(e)?o.label=e:t.push({value:D(e)}),t}function ce(t){return t.split(/\s*,\s*|\s+/).reduce(br,[])}function xr(t){return t.value+(t.label?" "+t.label:"")}function pe(t){return t.map(xr).join(", ")}function at(t,e,o=g){return{attribute:function(r){let i=B(this),s=o(r||e);i[t].push(s)}}}function Dt(t,e,o=g){return{attribute:function(r){this[t]=r},set:function(r){let i=B(this),s=o(r===void 0?e:r);i[t].push(s)},get:function(){return B(this).data[t]},enumerable:!0}}var kn={type:{value:"number",enumerable:!0},min:Dt("min",0,D),max:Dt("max",1,D),scale:at("scale","linear",Ht),ticks:at("ticks","",K),display:at("display"),step:at("step","any"),value:Dt("value",D)};var Pn=Object.assign({},kn,{value:{attribute:function(t){this.value=t},get:function(){let t=B(this);return t.state?pe(t.value):""},set:function(t){B(this).values.push(typeof t=="string"?ce(t):typeof t=="number"?[{value:t}]:R(t))},enumerable:!0},data:{get:function(){let t=B(this);return X(t.value)},set:function(t){B(this).values.push(R(t))},enumerable:!0}});var vr=window.yInputStylesheet||import.meta.url.replace(/\/[^\/]*([?#].*)?$/,"/")+"shadow.css",Oa=Gt("<y-input>",On,Pn,vr);export{Oa as default};
