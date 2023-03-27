/* form-elements 
   0.0.4
   By Stephen Band
   Built 2023-03-27 06:04 */

var me=Object.getOwnPropertySymbols;var jn=Object.prototype.hasOwnProperty,In=Object.prototype.propertyIsEnumerable;var ge=(t,e)=>{var o={};for(var r in t)jn.call(t,r)&&e.indexOf(r)<0&&(o[r]=t[r]);if(t!=null&&me)for(var r of me(t))e.indexOf(r)<0&&In.call(t,r)&&(o[r]=t[r]);return o};function w(t){return t}function d(t,e){return function(){let r=t.apply(this,arguments),i=e[r]||e.default;if(!i)throw new Error('overload() no handler for "'+r+'"');return i.apply(this,arguments)}}function X(t){var e=new Map;return function(r){if(e.has(r))return e.get(r);var i=t(r);return e.set(r,i),i}}var An=Array.prototype;function Vn(t,e){return typeof t=="function"?t.apply(null,e):t}function we(t,e,o){o=o||t.length;var r=o===1?e?t:X(t):X(function(i){return we(function(){var s=[i];return s.push.apply(s,arguments),t.apply(null,s)},e,o-1)});return function i(s){return arguments.length===0?i:arguments.length===1?r(s):arguments.length>=o?t.apply(null,arguments):Vn(r(s),An.slice.call(arguments,1))}}var g=we;function L(){}var Gn=d(w,{is:L,tag:L,data:function(t,e,o){Object.assign(e.dataset,o)},html:function(t,e,o){e.innerHTML=o},text:function(t,e,o){e.textContent=o},children:function(t,e,o){e.innerHTML="",e.append.apply(e,o)},points:U,cx:U,cy:U,r:U,transform:U,preserveAspectRatio:U,viewBox:U,default:function(t,e,o){t in e?e[t]=o:e.setAttribute(t,o)}});function U(t,e,o){e.setAttribute(t,o)}function zn(t,e){for(var o=Object.keys(e),r=o.length;r--;)Gn(o[r],t,e[o[r]]);return t}var pt=g(zn,!0);var It="http://www.w3.org/2000/svg",be=document.createElement("template"),At=(t,e)=>e&&typeof e;function ye(t,e){let o=document.createRange();return o.selectNode(t),o.createContextualFragment(e)}var E=d(At,{string:function(t,e){let o=document.createElementNS(It,t);return o.innerHTML=e,o},object:function(t,e){let o=document.createElementNS(It,t);return typeof e.length=="number"?o.append.apply(o,e):pt(o,e),o},default:t=>document.createElementNS(It,t)}),Un=d(At,{string:function(t,e){let o=document.createElement(t);return o.innerHTML=e,o},object:function(t,e){let o=document.createElement(t);return typeof e.length=="number"?o.append.apply(o,e):pt(o,e),o},default:t=>document.createElement(t)}),Wn=d(w,{comment:function(t,e){return document.createComment(e||"")},fragment:d(At,{string:function(t,e,o){return o?ye(o,e):(be.innerHTML=e,be.content.cloneNode(!0))},object:function(t,e,o){let r=o?ye(o):document.createDocumentFragment();return typeof e.length=="number"?r.append.apply(r,e):pt(r,e),r},default:()=>document.createDocumentFragment()}),text:function(t,e){return document.createTextNode(e||"")},circle:E,ellipse:E,g:E,glyph:E,image:E,line:E,rect:E,use:E,path:E,pattern:E,polygon:E,polyline:E,svg:E,default:Un}),T=Wn;function Vt(t,e,o){let r;typeof o!="string"&&o.input!==void 0&&o.index!==void 0&&(r=o,o=r.input.slice(o.index+o[0].length+(o.consumed||0)));let i=t.exec(o);if(!i)return;let s=e(i);return r&&(r.consumed=(r.consumed||0)+i.index+i[0].length+(i.consumed||0)),s}var Gt=g(Vt,!0);function _n(t,e,o){throw o.input!==void 0&&o.index!==void 0&&(o=o.input),new Error('Cannot parse string "'+(o.length>128?o.length.slice(0,128)+"…":o)+'"')}function Rn(t,e,o){let r=-1;for(;++r<o.length;)e=o[r]!==void 0&&t[r]?t[r](e,o):e;return t.done?t.done(e,o):t.close?t.close(e,o):e}function Nn(t,e,o,r){let i=Vt(t,s=>Rn(e,o,s),r);return i===void 0?e.catch?e.catch(o,r):_n(t,e,r):i}var lt=g(Nn,!0);var M=Symbol("internals"),W=Symbol("shadow"),xe=Object.defineProperties,Yn={a:HTMLAnchorElement,article:HTMLElement,dl:HTMLDListElement,p:HTMLParagraphElement,br:HTMLBRElement,fieldset:HTMLFieldSetElement,hr:HTMLHRElement,img:HTMLImageElement,li:HTMLLIElement,ol:HTMLOListElement,optgroup:HTMLOptGroupElement,q:HTMLQuoteElement,section:HTMLElement,textarea:HTMLTextAreaElement,td:HTMLTableCellElement,th:HTMLTableCellElement,tr:HTMLTableRowElement,tbody:HTMLTableSectionElement,thead:HTMLTableSectionElement,tfoot:HTMLTableSectionElement,ul:HTMLUListElement},$n={name:{set:function(t){return this.setAttribute("name",t)},get:function(){return this.getAttribute("name")||""}},form:{get:function(){return this[M].form}},labels:{get:function(){return this[M].labels}},validity:{get:function(){return this[M].validity}},validationMessage:{get:function(){return this[M].validationMessage}},willValidate:{get:function(){return this[M].willValidate}},checkValidity:{value:function(){return this[M].checkValidity()}},reportValidity:{value:function(){return this[M].reportValidity()}}},qn={},ve={once:!0},Se=0,Ee=!1;function Xn(t){return Yn[t]||window["HTML"+t[0].toUpperCase()+t.slice(1)+"Element"]||(()=>{throw new Error('Constructor not found for tag "'+t+'"')})()}var Kn=lt(/^\s*<?([a-z][\w]*-[\w-]+)>?\s*$|^\s*<?([a-z][\w]*)\s+is[=\s]*["']?([a-z][\w]*-[\w]+)["']?>?\s*$/,{1:(t,e)=>({name:e[1]}),2:(t,e)=>({name:e[3],tag:e[2]}),catch:function(t,e){throw new SyntaxError(`dom element() – name must be of the form 'element-name' or 'tag is="element-name"' (`+e+")")}},null);function Qn(t,e){if(t.hasOwnProperty(e)){let o=t[e];delete t[e],t[e]=o}return t}function Te(t,e,o){t._initialLoad=!0;let r=t.attachShadow({mode:e.mode||"closed",delegatesFocus:e.focusable||!1});if(o){let i=T("link",{rel:"stylesheet",href:o});r.append(i)}return t[W]=r,r}function Jn(t){var e;if(t.attachInternals){if(e=t.attachInternals(),e.setFormValue)return e}else e={shadowRoot:t.shadowRoot};return e.input=T("input",{type:"hidden",name:t.name}),t.appendChild(e.input),e.setFormValue=function(o){this.input.value=o},e}function Zn(t){return!!t.attribute}function to(t){return t.set||t.get||t.hasOwnProperty("value")}function eo(t,e){return Zn(e[1])&&(t.attributes[e[0]]=e[1].attribute),to(e[1])&&(t.properties[e[0]]=e[1]),t}function zt(t,e,o,r,i=""){let{name:s,tag:a}=Kn(t),l=typeof a=="string"?Xn(a):HTMLElement,{attributes:p,properties:m}=o?Object.entries(o).reduce(eo,{attributes:{},properties:{}}):qn;function h(){let u=Reflect.construct(l,arguments,h),k=e.construct&&e.construct.length>Se?Te(u,e,r||e.stylesheet):void 0,x=h.formAssociated?Jn(u):{};return a&&(Ee=!0),e.construct&&e.construct.call(u,k,x),m&&Object.keys(m).reduce(Qn,u),u}return h.prototype=Object.create(l.prototype,m),m.value&&(h.formAssociated=!0,xe(h.prototype,$n),(e.enable||e.disable)&&(h.prototype.formDisabledCallback=function(u){return u?e.disable&&e.disable.call(this,this[W],this[M]):e.enable&&e.enable.call(this,this[W],this[M])}),e.reset&&(h.prototype.formResetCallback=function(){return e.reset.call(this,this[W],this[M])}),e.restore&&(h.prototype.formStateRestoreCallback=function(){return e.restore.call(this,this[W],this[M])})),p&&(h.observedAttributes=Object.keys(p),h.prototype.attributeChangedCallback=function(u,k,x){return p[u].call(this,x)}),h.prototype.connectedCallback=function(){let u=this,k=u[W],x=u[M];if(u._initialLoad){let F=k.querySelectorAll('link[rel="stylesheet"]');if(F.length){let ct=0,j=F.length,$=function(q){++ct>=F.length&&(delete u._initialLoad,e.load&&e.load.call(u,k))},f=$;for(;j--;)F[j].addEventListener("load",$,ve),F[j].addEventListener("error",f,ve)}else e.load&&Promise.resolve(1).then(()=>e.load.call(this,k,x))}e.connect&&e.connect.call(this,k,x)},e.disconnect&&(h.prototype.disconnectedCallback=function(){return e.disconnect.call(this,this[W],this[M])}),window.console&&window.console.log("%c<"+(a?a+" is="+s:s)+">%c "+i,"color: #3a8ab0; font-weight: 600;","color: #888888; font-weight: 400;"),window.customElements.define(s,h,a&&{extends:a}),a&&!Ee&&document.querySelectorAll('[is="'+s+'"]').forEach(u=>{m&&xe(u,m);let k=e.construct&&e.construct.length>Se?Te(u,e,r||e.stylesheet):void 0;e.construct&&e.construct.call(u,k);let x;for(x in p){let F=u.attributes[x];F&&p[x].call(u,F.value)}e.connect&&e.connect.apply(u)}),h}var Ut=Symbol("privates");function B(t){return t[Ut]||Object.defineProperty(t,Ut,{value:{}})[Ut]}function Wt(t,e,o){return o>e?e:o<t?t:o}var ni=g(Wt);function _t(t){return function(){return arguments[t]}}function O(){return this}var no=Object.create,oo=Object.freeze;function ro(){return!0}function Me(){return-1}var I=oo(no({shift:L,push:L,forEach:L,join:function(){return""},every:ro,filter:O,find:L,findIndex:Me,flat:O,flatMap:O,includes:function(){return!1},indexOf:Me,map:O,reduce:_t(1),sort:O,each:O,pipe:w,start:O,stop:O,done:O,valueOf:function(){return null}},{length:{value:0}}));function Rt(t,e){t.remove&&t.remove(e);let o;for(;(o=t.indexOf(e))!==-1;)t.splice(o,1);return t}var fi=g(Rt,!0);function Nt(t){return t&&t[Symbol.iterator]}var io=Object.assign;function so(t){return t.stop?t.stop():t()}function tt(){}io(tt.prototype,{stop:function(){let t=this.stopables;return this.stopables=void 0,t&&t.forEach(so),this},done:function(t){return(this.stopables||(this.stopables=[])).push(t),this}});var D=Object.assign,A=Object.create;function et(t,e){t[0]=e,e.done(t)}function Be(t,e){let o=t[e].stopables;o&&Rt(o,t),t[e]=void 0}function b(t,e){t&&t.push(e)}function v(t){tt.prototype.stop.apply(t);let e=-1,o;for(;o=t[++e];)t[e]=void 0,o.stop()}function Oe(t){return c.prototype.isPrototypeOf(t)}function c(t){this.input=t}D(c.prototype,tt.prototype,{push:function(t){b(this[0],t)},pipe:function(t){if(this[0])throw new Error("Stream: Attempt to .pipe() a unicast stream multiple times. Create a multicast stream with .broadcast().");return this[0]=t,t.done(this),this.input.pipe(this),t},map:function(t){return new ke(this,t)},filter:function(t){return new Pe(this,t)},split:function(t){return new Fe(this,t)},flatMap:function(t){return new Le(this,t)},slice:function(t,e){return new Yt(this,t,e)},take:function(t){return console.warn(".take(a) superseded by .slice(0, a)"),new Yt(this,0,t)},each:function(t){return this.pipe(new Ce(t))},reduce:function(t,e){return this.pipe(new He(t,e)).value},scan:function(t,e){return new De(this,t,e)},stop:function(){return v(this),this}});function ke(t,e){this.input=t,this.fn=e}ke.prototype=D(A(c.prototype),{push:function(e){let r=this.fn(e);r!==void 0&&b(this[0],r)}});function Pe(t,e){this.input=t,this.fn=e}Pe.prototype=D(A(c.prototype),{push:function(e){this.fn(e)&&b(this[0],e)}});function Le(t,e){this.input=t,this.fn=e}Le.prototype=D(A(c.prototype),{push:function(e){let r=this.fn(e);if(r!==void 0)if(Nt(r))for(let i of r)b(this[0],i);else r.pipe&&this.done(r.each(i=>b(this[0],i)))}});function Fe(t,e){this.input=t,this.chunk=[],typeof n=="number"?this.n=e:this.fn=e}Fe.prototype=D(A(c.prototype),{fn:function(){return this.chunk.length===this.n},push:function(e){let o=this.chunk;this.fn(e)?(b(this[0],o),this.chunk=[]):o.push(e)}});function Yt(t,e,o=1/0){this.input=t,this.index=-e,this.indexEnd=e+o}Yt.prototype=D(A(c.prototype),{push:function(e){++this.index>0&&this[0].push(e),this.index===this.indexEnd&&this.stop()}});function He(t,e){this.fn=t,this.value=e,this.i=0}He.prototype=D(A(c.prototype),{push:function(t){let e=this.fn;this.value=e(this.value,t,this.i++,this)}});function De(t,e,o){this.input=t,this.fn=e,this.value=o}De.prototype=D(A(c.prototype),{push:function(t){let e=this.fn;this.value=e(this.value,t),this[0].push(this.value)}});function Ce(t){this.push=t}Ce.prototype=D(A(c.prototype),{each:null,reduce:null,pipe:null});var uo=Object.assign,ao=Object.create;function co(t,e){if(t[1]){let o=-1;for(;t[++o]&&t[o]!==e;);for(;t[o++];)t[o-1]=t[o]}else t.stop()}function nt(t,e){c.apply(this,arguments),this.memory=!!(e&&e.memory),e&&e.hot&&this.pipe(I)}nt.prototype=uo(ao(c.prototype),{push:function(t){if(t===void 0)return;this.memory&&(this.value=t);let e=-1;for(;this[++e];)this[e].push(t)},pipe:function(t){let e=-1;for(;this[++e];);return this.memory&&e===0&&this.input.pipe(this),this[e]=t,t.done(()=>co(this,t)),this.value!==void 0&&t.push(this.value),!this.memory&&e===0&&this.input.pipe(this),t}});var po=Array.prototype,lo=Object.assign,fo=Object.create;function ho(t){return t!==void 0}function ot(t){this.buffer=t?t.filter?t.filter(ho):t:[]}ot.prototype=lo(fo(c.prototype),{push:function(t){t!==void 0&&b(this.buffer,t)},pipe:function(t){for(t.done(this),this[0]=t;this.buffer.length;)b(this[0],po.shift.apply(this.buffer));return this.buffer=t,t},stop:function(){return this.buffer=void 0,v(this),this}});var je=Object.assign,mo=Object.create,go=Promise.resolve(),wo={schedule:function(){go.then(this.fire)},unschedule:L},bo={schedule:function(){this.timer=requestAnimationFrame(this.fire)},unschedule:function(){cancelAnimationFrame(this.timer),this.timer=void 0}},yo={schedule:function(){this.timer=setTimeout(this.fire,this.duration*1e3)},unschedule:function(){clearTimeout(this.timer),this.timer=void 0}};function K(t,e){c.apply(this,arguments),this.duration=e,this.timer=void 0,this.fire=()=>{this.timer=void 0,this.output.stop()},je(this,e==="tick"?wo:e==="frame"?bo:yo)}K.prototype=je(mo(c.prototype),{push:function(t){this.timer?(this.unschedule(),this.schedule(),this.output.push(t)):(this.output=c.of(t),this[0].push(this.output),this.schedule())},stop:function(){return this.timer&&this.fire(),c.prototype.stop.apply(this,arguments)}});var $t=Object.assign,xo=Object.create;function vo(t){return!!t.active}function So(t){return!!t.stopped}function qt(t,e,o,r,i,s){this.stream=t,this.values=e,this.pipes=o,this.name=r,this.input=i,this.mutable=s,this.active=!1,this.stopped=!1}$t(qt.prototype,{push:function(t){let e=this.stream,o=this.values,r=this.name;if(o[r]=t,this.active=!0,e.active||(e.active=this.pipes.every(vo)))if(this.mutable)b(e[0],o);else{let i=new this.values.constructor;b(e[0],$t(i,o))}},stop:function(){this.stopped=!0,this.pipes.every(So)&&v(this.stream)},done:function(t){this.stream.done(t)}});var Eo={};function ft(t,e=Eo){this.inputs=t,this.mutable=!!e.mutable,this.active=!1}ft.prototype=$t(xo(c.prototype),{push:null,pipe:function(t){let e=this.inputs,o=[];this[0]=t,t.done(this);let r;for(r in e){let i=e[r];if(i.pipe){let s=new qt(this,e,o,r,i,this.mutable);o.push(s),i.pipe(s)}else if(i.then){let s=new qt(this,e,o,r,i,this.mutable);o.push(s),i.then(a=>s.push(a)),i.finally(()=>s.stop())}}return t}});var To=Object.assign,Mo=Object.create;function ht(t){this.fn=t}ht.prototype=To(Mo(c.prototype),{pipe:function(t){return t.done(this),this[0]=t,this.fn(e=>this.push(e),e=>this.stop(e)),t}});var Ie=Object.assign,Bo=Object.create;function Ae(t){this.stream=t}Ie(Ae.prototype,{push:function(t){b(this.stream[0],t)},stop:function(){--this.stream.count===0&&v(this.stream)},done:function(t){this.stream.done(t)}});function dt(t){this.inputs=t}dt.prototype=Ie(Bo(c.prototype),{push:null,pipe:function(t){let e=this.inputs;this.count=e.length,this[0]=t,t.done(this);let o=new Ae(this),r=-1,i;for(;i=e[++r];)if(i.pipe)i.pipe(o);else if(i.then)i.then(s=>o.push(s)),i.finally(()=>o.stop());else{let s=-1;for(;++s<i.length;)o.push(i[s]);o.stop()}return t}});var Oo=Object.assign,ko=Object.create;function mt(t){this.promise=t}mt.prototype=Oo(ko(c.prototype),{push:null,pipe:function(t){let e=this.promise;return this[0]=t,t.done(this),e.then(o=>b(this,o)),e.finally(()=>v(this)),t}});var Po=Array.prototype,Ve=Object.assign;function Lo(t){throw new TypeError("Stream cannot be created from "+typeof object)}Ve(c,{isStream:Oe,of:function(){return new ot(Po.slice.apply(arguments))},from:function(t){return t.pipe?new c(t):t.then?new mt(t):typeof t.length=="number"?typeof t=="function"?new ht(t):new ot(t):Lo(t)},batch:t=>new K(I,t),broadcast:t=>new nt(I,t),combine:(t,e)=>new ft(t,e),merge:function(){return new dt(arguments)},writeable:function(t){let e=new c(I);return t(e),e}});Ve(c.prototype,{log:O,batch:function(t){return new K(this,t)},burst:function(t){return console.warn("stream.burst() is now stream.batch()"),new K(this,t)},broadcast:function(t){return new nt(this,t)}});function Fo(t,e){return e[t]}var gt=g(Fo,!0);function wt(t){if(typeof t.length=="number")return t[t.length-1]}function Xt(t,e,o){return(o-t)/(e-t)}function rt(t,e,o){return o*(e-t)+t}var Ho=Object.assign,Do=Object.defineProperties,Co=Object.isExtensible,jo=Object.prototype,_=Symbol("observe");function Io(t,e){let o=t.indexOf(e);return o>-1&&t.splice(o,1),t}var Ge={[_]:{}};function bt(t,e){if(!t||!t.length)return 0;t=t.slice(0);for(var o=-1;t[++o];)t[o].status!=="stopped"&&t[o].push(e);return o}function ze(t){this.observables={},this.gets=[],this.sets=void 0,this.target=t,this.observer=new Proxy(t,this),Ge[_].value=this,Do(t,Ge)}Ho(ze.prototype,{notify:function(t){bt(this.observables[t],this.target[t]),bt(this.sets,this.target)},listen:function(t,e){(t===null?this.sets||(this.sets=[]):this.observables[t]||(this.observables[t]=[])).push(e)},unlisten:function(t,e){let o=t===null?this.sets:this.observables[t];o&&Io(o,e)},get:function(e,o,r){let i=e[o];if(typeof o=="symbol"||o==="__proto__")return i;let s=Object.getOwnPropertyDescriptor(e,o);if((s?s.writable||s.set:i===void 0)&&bt(this.gets,o),!jo.hasOwnProperty.call(e,o))return i;let l=Q(i);if(!l)return i;for(var p=-1;this.gets[++p];)this.gets[p].listen(o);return l},set:function(e,o,r,i){if(typeof o=="symbol"||o==="__proto__")return e[o]=r,!0;let s=R(r);if(e[o]===r||e[o]===s)return!0;let a=e.length;for(var l=-1;this.gets[++l];)this.gets[l].unlisten(o);return e[o]=s,o!=="length"&&e.length!==a&&bt(this.observables.length,e.length),this.notify(o),!0},deleteProperty:function(t,e){return typeof e=="symbol"||e==="__proto__"?(delete t[e],!0):(t.hasOwnProperty(e)&&(delete t[e],this.notify(e)),!0)}});function yt(t){return t&&Co(t)&&!Node.prototype.isPrototypeOf(t)&&(typeof BaseAudioContext>"u"||!BaseAudioContext.prototype.isPrototypeOf(t))&&!(t instanceof Date)&&!(t instanceof RegExp)&&!(t instanceof Map)&&!(t instanceof WeakMap)&&!(t instanceof Set)&&!(window.WeakSet&&t instanceof WeakSet)&&!ArrayBuffer.isView(t)}function Q(t,e){return t?t[_]?t[_].observer:e||yt(t)?new ze(t).observer:void 0:void 0}function R(t){return t&&t[_]&&t[_].target||t}function Kt(t){return Q(t)&&t[_]}var Ue=Object.assign,Ao=Object.create,Qt=/(^\.?|\.)\s*([\w-]*)\s*/g;function Vo(t){this.producer.push(t)}function Jt(t,e,o,r){Qt.lastIndex=e;let i=Qt.exec(t);this.path=t,this.object=o,this.producer=r,this.key=i[2]||i[1],this.index=Qt.lastIndex,this.isMuteableObserver=this.path.slice(this.index)===".",this.index>=this.path.length&&(this.push=Vo),this.listen(),this.push(this.key==="."?this.object:R(this.object)[this.key])}Ue(Jt.prototype,{push:function(t){yt(t)?this.child?this.child.relisten(t):this.child=new Jt(this.path,this.index,t,this.producer):(this.child&&(this.child.stop(),this.child=void 0),this.producer.push(this.isMuteableObserver?t:void 0))},listen:function(){let t=Kt(this.object);t&&t.listen(this.key==="."?null:this.key,this)},unlisten:function(){Kt(this.object).unlisten(this.key==="."?null:this.key,this)},relisten:function(t){this.unlisten(),this.object=t,this.listen(),this.push(R(this.object)[this.key])},stop:function(){this.unlisten(),this.child&&this.child.stop(),this.child=void 0,this.status="stopped"}});function We(t,e,o){this.path=t,this.object=e,this.value=o}We.prototype=Ue(Ao(c.prototype),{push:function(t){this.value===t&&(!this.isMutationProducer||!yt(t))||(this.value=t,this[0].push(t))},pipe:function(t){return this[0]=t,t.done(this),this.pathObserver=new Jt(this.path,0,this.object,this),this.isMutationProducer=this.path[this.path.length-1]===".",t},stop:function(){return this.pathObserver.stop(),c.prototype.stop.apply(this,arguments)}});function xt(t,e,o){return new c(new We(t,e,o))}var Go=Object.assign,zo=/\s+/,vt={fullscreenchange:X(()=>"fullscreenElement"in document?"fullscreenchange":"webkitFullscreenElement"in document?"webkitfullscreenchange":"mozFullScreenElement"in document?"mozfullscreenchange":"msFullscreenElement"in document?"MSFullscreenChange":"fullscreenchange")},_e=0;window.addEventListener("click",t=>_e=t.timeStamp);function Uo(t,e){return t.node.addEventListener(vt[e]?vt[e]():e,t,t.options),t}function Wo(t,e){return t.node.removeEventListener(vt[e]?vt[e]():e,t),t}function Re(t,e,o){this.types=t.split(zo),this.options=e,this.node=o,this.select=e&&e.select}Go(Re.prototype,{pipe:function(t){et(this,t),this.types.reduce(Uo,this)},handleEvent:function(t){if(!(t.type==="click"&&t.timeStamp<=_e)){if(this.select){let e=t.target.closest(this.select);if(!e)return;t.selectedTarget=e}b(this[0],t)}},stop:function(){this.types.reduce(Wo,this),v(this[0])}});function J(t,e){let o;return typeof t=="object"&&(o=t,t=o.type),new c(new Re(t,o,e))}var _o=Object.assign,it={bubbles:!0,cancelable:!0};function St(t,e){var m;let o=it,r,i,s,a,l,p;return typeof t=="object"?(m=t,{type:t,detail:i,bubbles:s,cancelable:a,composed:l}=m,r=ge(m,["type","detail","bubbles","cancelable","composed"]),p=_o(new CustomEvent(t,{detail:i,bubbles:s||it.bubbles,cancelable:a||it.cancelable,composed:l||it.composed}),r)):p=new CustomEvent(t,it),e.dispatchEvent(p)}var ls=g(St,!0);function V(t){return typeof t}var Ro=/^\s*([+-]?\d*\.?\d+)([^\s\d]*)\s*$/;function Zt(t){return function(o){if(typeof o=="number")return o;var r=Ro.exec(o);if(!r||!t[r[2]||""]){if(!t.catch)throw new Error('Cannot parse value "'+o+'" (accepted units '+Object.keys(t).join(", ")+")");return r?t.catch(parseFloat(r[1]),r[2]):t.catch(parseFloat(o))}return t[r[2]||""](parseFloat(r[1]))}}var No=/px$/,Ne={"transform:translateX":function(t){var e=st("transform",t);if(!e||e==="none")return 0;var o=Et(e);return parseFloat(o[4])},"transform:translateY":function(t){var e=st("transform",t);if(!e||e==="none")return 0;var o=Et(e);return parseFloat(o[5])},"transform:scale":function(t){var e=st("transform",t);if(!e||e==="none")return 0;var o=Et(e),r=parseFloat(o[0]),i=parseFloat(o[1]);return Math.sqrt(r*r+i*i)},"transform:rotate":function(t){var e=st("transform",t);if(!e||e==="none")return 0;var o=Et(e),r=parseFloat(o[0]),i=parseFloat(o[1]);return Math.atan2(i,r)}};function Et(t){return t.split("(")[1].split(")")[0].split(/\s*,\s*/)}function st(t,e){return window.getComputedStyle?window.getComputedStyle(e,null).getPropertyValue(t):0}function Tt(t,e){if(Ne[t])return Ne[t](e);var o=st(t,e);return typeof o=="string"&&No.test(o)?parseFloat(o):o}var Mt,Bt;function Yo(){if(!Mt){let t=document.documentElement.style.fontSize;document.documentElement.style.fontSize="100%",Mt=Tt("font-size",document.documentElement),document.documentElement.style.fontSize=t||""}return Mt}function $o(){return Bt||(Bt=Tt("font-size",document.documentElement)),Bt}window.addEventListener("resize",()=>{Mt=void 0,Bt=void 0});var N=d(V,{number:w,string:Zt({px:w,em:t=>Yo()*t,rem:t=>$o()*t,vw:t=>window.innerWidth*t/100,vh:t=>window.innerHeight*t/100,vmin:t=>window.innerWidth<window.innerHeight?window.innerWidth*t/100:window.innerHeight*t/100,vmax:t=>window.innerWidth<window.innerHeight?window.innerHeight*t/100:window.innerWidth*t/100})}),Ye=N;function te(t){t.stopPropagation(),t.preventDefault()}var qo=Array.prototype,ne=Object.assign,ee="webkitUserSelect"in document.body.style?"webkitUserSelect":"userSelect",Ot={},kt={threshold:4,ignoreTags:{textarea:!0,input:!0,select:!0}};function Xo(t,e,o){return e*e+o*o>=t*t}function $e(t,e,o){if(this.stream=t,this.events=[e],this.options=o,this.pointerId=e.pointerId,typeof o.threshold=="function")this.checkThreshold=o.threshold;else{let r=Ye(o.threshold);this.checkThreshold=(i,s,a)=>Xo(r,i,s,a)}document.addEventListener("pointermove",this),document.addEventListener("pointerup",this),document.addEventListener("pointercancel",this)}ne($e.prototype,{handleEvent:d(gt("type"),{pointermove:function(t){if(this.pointerId===t.pointerId){if(this.pointerId in Ot&&this!==Ot[this.pointerId]){this.stop();return}if(this.events.push(t),!this.isGesture){let e=this.events[0],o=t.clientX-e.clientX,r=t.clientY-e.clientY,i=(t.timeStamp-e.timeStamp)/1e3;this.checkThreshold(o,r,i)&&this.createGesture()}}},pointerup:function(t){this.pointerId===t.pointerId&&(this.events.push(t),this.stop(),this.isGesture&&document.addEventListener("click",te,{capture:!0,once:!0}))},default:function(t){this.pointerId===t.pointerId&&(this.events.push(t),this.stop())}}),createGesture:function(){this.isGesture=!0,this.userSelectState=document.body.style[ee],document.body.style[ee]="none",Ot[this.pointerId]=this,this.stream.push(new c(this))},pipe:function(t){for(et(this,t);this.events.length;)b(this[0],qo.shift.apply(this.events));this.events=t},stop:function(){if(document.removeEventListener("pointermove",this),document.removeEventListener("pointerup",this),document.removeEventListener("pointercancel",this),this.isGesture&&(document.body.style[ee]=this.userSelectState,delete Ot[this.pointerId]),this[0]){let t=this[0];Be(this,0),v(t)}}});function Ko(t){var e=t.target.tagName;return e&&(!!kt.ignoreTags[e.toLowerCase()]||t.target.draggable)}function qe(t,e){this.node=t,this.options=e}ne(qe.prototype,{pipe:function(t){return this[0]=t,this.node.addEventListener("pointerdown",this),t},handleEvent:function(t){if(t.button===0&&!(this.options.device&&!this.options.device.includes(t.pointerType))&&!Ko(t)&&!(this.options.select&&!t.target.closest(this.options.select))){var e={type:t.type,target:t.target,currentTarget:t.currentTarget,clientX:t.clientX,clientY:t.clientY,timeStamp:t.timeStamp,pointerId:t.pointerId};new $e(this[0],e,this.options)}},stop:function(){return this[0]&&(this.node.removeEventListener("pointerdown",this),v(this[0])),this}});function oe(t,e){return t=e&&t?ne({},kt,t):kt,e=e||t,new c(new qe(e,t))}function Qo(){return{x:0,y:0,left:0,top:0,right:window.innerWidth,bottom:window.innerHeight,width:window.innerWidth,height:window.innerHeight}}function Pt(t){return t===window?Qo():t.getClientRects()[0]||t.getBoundingClientRect()}var Xe=J("load",window).broadcast(),Ke=J("resize",window).broadcast();function y(t){return Math.pow(10,t/20)}function H(t){if(!t)return 0;let e=+t;if(e||e===0)return e;let o=/^(?:(-?[\d.]+)|(-?∞))(?:(db|bpm)|(m|k)?(\w+))$/.exec(t.toLowerCase());if(!o)return 0;let r=o[2]?o[2]==="-∞"?-1/0:1/0:parseFloat(o[1]);return o[3]==="db"?y(r):o[3]==="bpm"?r/60:o[4]==="m"?r/1e3:o[4]==="k"?r*1e3:r}var Qe=lt(/^([+\-]?(?:0|[1-9]\d*|∞)(?:\.\d+)?(?:[eE][+\-]?\d+)?\w*)\s*(?:\[([^\]]+)\]|([^\d\s-]\S*))?\s*/,{1:(t,e)=>{let o=H(e[1]);return t.push({value:o,label:e[1]}),t},2:(t,e)=>(wt(t).label=e[2],t),3:(t,e)=>(wt(t).label=e[3],t),done:(t,e)=>Qe(t,e),catch:w}),Z=d(V,{string:t=>Qe([],t.trim()),object:w});function Je(t,e,o){let r=t,i=[{value:r}];for(;(r=r+o)<=e;)i.push({value:r});return i}function Ze(t,e){let o=t.length,r=1/0,i;for(;o--;){let s=Math.abs(e-t[o].normal);s<r&&(r=s,i=t[o])}return i}function S(t,e){return Math.ceil(e/t)*t}var tn=d(t=>t.toLowerCase(),{db:(t,e,o)=>Z("-∞dB -96dB -90dB -84dB -78dB -72dB -66dB -60dB -54dB -48dB -42dB -36dB -30dB -24dB -18dB -12dB -6dB 0dB 6dB 12dB 18dB 24dB"),default:(t,e,o)=>{let r=o-e,i=r<.8?S(.05,r/10):r<2?S(.2,r/10):r<8?S(.5,r/10):r<20?S(2,r/10):r<80?S(5,r/10):r<200?S(20,r/10):S(200,r),s=[],a=r<.8?S(.05,e):r<2?S(.2,e):r<8?S(.5,e):r<20?S(2,e):r<80?S(5,e):r<200?S(20,e):S(200,e);for(;a<=o;)s.push({label:r<2?a.toFixed(1):a,value:a}),a+=i;return s}});function at(t,e,o,r,i){return t.normal=e.normalise(o,r,i),t}function en(t,e){let{scale:o,min:r,max:i,step:s,ticks:a,display:l}=e;return t.scale=o,t.min=r,t.max=i,t.ticks=(a?a.length?a:tn(l,r,i):I).filter(p=>p.value>=t.min&&p.value<=t.max).map(p=>at(p,o,r,i,p.value)),t.step=s==="any"?void 0:s==="ticks"?t.ticks:/\s|,/.test(s)?Z(s).filter(p=>p.value>=t.min&&p.value<=t.max).map(p=>at(p,o,r,i,p.value)):Je(r,i,H(s)).map(p=>at(p,o,r,i,p.value)),t.display=l,t}var ut={};function nn(t,e,o,r,i){return ut.normal=Wt(0,1,i),ut.value=t.denormalise(e,o,ut.normal),r?Ze(r,ut.normal):ut}function re(t){return 20*Math.log10(t)}function G(t,e){var o=e%t;return o<0?o+t:o}var ou=g(G);function ie(t){return function(o,...r){var i=t[o]||t.default;return i&&i.apply(this,r)}}var an=9,Jo=/(`[^`]*`)|(ms|[YMwdhms]{1,3}|±)/g;function Zo(t){return t*60}function tr(t){return t*3600}function er(t){return t*1e3}function on(t){return t/60}function rn(t){return t/3600}function se(t){return t/86400}function nr(t){return t/604800}function sn(t){return t/2629800}function or(t){return t/31557600}function z(t){return t>=10?"":"0"}var rr=/^([+-])?(\d{2,}):([0-5]\d)(?::((?:[0-5]\d|60)(?:.\d+)?))?$/,ir=/^([+-])?(\d{2,}):(\d{2,})(?::(\d{2,}(?:.\d+)?))?$/,Y=d(V,{number:w,string:Gt(rr,pn),default:function(t){throw new Error("parseTime() does not accept objects of type "+typeof t)}}),cn=d(V,{number:w,string:Gt(ir,pn),default:function(t){throw new Error("parseTime() does not accept objects of type "+typeof t)}});function pn(t){let[e,o,r,i,s]=t;var a=tr(parseInt(r,10))+(i?Zo(parseInt(i,10))+(s?parseFloat(s,10):0):0);return o==="-"?-a:a}function sr(t,e){return t.replace(Jo,(o,r,i)=>r?r.slice(1,-1):un[o]?un[o](e):o)}function ur(t){var e=t<0?"-":"";t<0&&(t=-t);var o=Math.floor(t/3600),r=z(o)+o;if(t=t%3600,t===0)return e+r+":00";var i=Math.floor(t/60),s=z(i)+i;if(t=t%60,t===0)return e+r+":"+s;var a=z(t)+ln(an,t);return e+r+":"+s+":"+a}function ln(t,e){return e.toFixed(t).replace(/\.?0+$/,"")}var un={"±":function(e){return e<0?"-":""},Y:function(e){return e=e<0?-e:e,Math.floor(or(e))},M:function(e){return e=e<0?-e:e,Math.floor(sn(e))},MM:function(e){return e=e<0?-e:e,Math.floor(sn(e%31557600))},w:function(e){return e=e<0?-e:e,Math.floor(nr(e))},ww:function(e){return e=e<0?-e:e,Math.floor(se(e%2629800))},d:function(e){return e=e<0?-e:e,Math.floor(se(e))},dd:function(e){return e=e<0?-e:e,Math.floor(se(e%604800))},h:function(e){return e=e<0?-e:e,Math.floor(rn(e))},hh:function(e){e=e<0?-e:e;var o=Math.floor(rn(e%86400));return z(o)+o},m:function(e){e=e<0?-e:e;var o=Math.floor(on(e));return z(o)+o},mm:function(e){e=e<0?-e:e;var o=Math.floor(on(e%3600));return z(o)+o},s:function(e){return e=e<0?-e:e,Math.floor(e)},ss:function(e){e=e<0?-e:e;var o=Math.floor(e%60);return z(o)+o},sss:function(e){e=e<0?-e:e;var o=e%60;return z(o)+ln(an,o)},ms:function(e){e=e<0?-e:e;var o=Math.floor(er(e%1));return o>=100?o:o>=10?"0"+o:"00"+o}},fn=g(function(t,e){return t==="ISO"?ur(Y(e)):sr(t,Y(e))});var hu=g(function(t,e){return Y(e)+cn(t)}),du=g(function(t,e){return Y(e)-cn(t)}),mu=g(function(t,e){return Y(t)-Y(e)}),ar=ie({w:function(t){return t-G(604800,t)},d:function(t){return t-G(86400,t)},h:function(t){return t-G(3600,t)},m:function(t){return t-G(60,t)},s:function(t){return t-G(1,t)},ms:function(t){return t-G(.001,t)}}),gu=g(function(t,e){return ar(t,Y(e))});function cr(){return{unit:value<1?"m"+unit:unit,value:value<.001?(value*1e3).toFixed(2):value<1?(value*1e3).toPrecision(3):value.toPrecision(3)}}function pr(t,e){return{unit:e<1?"m"+t:e>=1e3?"k"+t:t,value:e<.001?(e*1e3).toFixed(2):e<1?(e*1e3).toPrecision(3):e>=1e3?(e/1e3).toPrecision(3):e.toPrecision(3)}}function lr(t,e){return{unit:e<.01?"m"+t:e<1?"c"+t:e>=1e3?"k"+t:t,value:e<.001?(e*1e3).toFixed(2):e<.01?(e*1e3).toPrecision(3):e<1?(e*100).toPrecision(3):e>=1e3?(e/1e3).toPrecision(3):e.toPrecision(3)}}var fr={pan:(t,e)=>({unit:"",value:e===-1?"-1.00":e===0?"0.00":e===1?"1.00":e.toFixed(2)}),db:(t,e)=>{let o=re(e);return{unit:"dB",value:isFinite(o)?o<-1?o.toPrecision(3):o.toFixed(2):o<0?"-∞":"∞"}},hz:(t,e)=>({unit:e>=1e3?"kHz":"Hz",value:e<1?e.toFixed(2):e>=1e3?(e/1e3).toPrecision(3):e.toPrecision(3)}),semitone:(t,e)=>({unit:"",value:e===0?"0":e<0?"♭"+(-e/100).toFixed(2):"♯"+(e/100).toFixed(2)}),s:cr,m:lr,bpm:(t,e)=>{let o=e*60;return{unit:"bpm",value:o<100?o.toFixed(1):o.toFixed(0)}},int:(t,e)=>({unit:"",value:Math.round(e)}),"":(t,e)=>({unit:"",value:e>-1&&e<1?e.toFixed(2):e.toPrecision(3)}),default:d(t=>/[YMWwdhms]/.test(t)?"time":"default",{time:(t,e)=>({unit:"",value:fn(t,e)}),default:pr})},vu=d(t=>t.toLowerCase(),fr);var Tu=y(-6),Mu=y(-12),Bu=y(-18),hn=y(-24),dn=y(-30),mn=y(-36),Ou=y(-42),gn=y(-48),ku=y(-54),wn=y(-60),bn=y(-66),yn=y(-72),Pu=y(-78),Lu=y(-84),Fu=y(-90),xn=y(-96),ue=.25,vn=.4,Hu=Symbol("state");var Sn=Object.assign,Ft={};function ae(t,e,o){let r=o/(e*t);return(r<=1?r:Math.log(r)+1)/Ft[t]}function hr(t,e,o){let r=o*Ft[t];return e*t*(r<=1?r:Math.pow(Math.E,r-1))}function C(t){this.xover=t,Ft[t]||(Ft[t]=Math.log(1/t)+1)}Sn(C.prototype,{normalise:function(t,e,o){let r=ae(this.xover,e,t);return(ae(this.xover,e,o)-r)/(1-r)},denormalise:function(t,e,o){let r=ae(this.xover,e,t),i=o*(1-r)+r;return hr(this.xover,e,i)}});function Lt(t){this.power=t}Sn(Lt.prototype,{normalise:function(t,e,o){return Math.pow((o-t)/(e-t),1/this.power)},denormalise:function(t,e,o){return Math.pow(o,this.power)*(e-t)+t}});var dr={linear:{normalise:Xt,denormalise:rt},"pow-2":new Lt(2),"pow-3":new Lt(3),"pow-4":new Lt(4),log:{normalise:function(t,e,o){return Math.log(o/t)/Math.log(e/t)},denormalise:function(t,e,o){return t*Math.pow(e/t,o)}},"log-24db":new C(hn),"log-30db":new C(dn),"log-36db":new C(mn),"log-48db":new C(gn),"log-60db":new C(wn),"log-66db":new C(bn),"log-72db":new C(yn),"log-96db":new C(xn)};function Ht(t){return dr[t&&t.toLowerCase()||"linear"]}var En=Ht("linear"),Tn=0,Mn=1,Bn=null,On="any",kn="";function Pn(t,e,o,r){return e.delete(o),r.forEach(i=>e.append(o,i.y)),t.setFormValue(e),e}var Dt={mutable:!0};function gr(t){t.stop()}function wr(t,e){return t&&t.stop(),xt(".",e)}function Ln(t,e,o,r,i,s){let a=Pt(t),l=N(e["font-size"]),p=N(e.borderTopWidth)||0,m=N(e.borderBottomWidth)||0,h=N(e.paddingTop)||0,u=N(e.paddingBottom)||0;return o.y=a.y+p+h,o.height=a.height-p-h-m-u,r.y=0,r.height=a.height-p-m,i.y=h,i.height=a.height-p-h-m-u,s.y=(0-u-m)/l,s.height=-i.height/l,a}function br(t,e,o,r,i){r.style.width="",r.style.height="0",i.box=Ln(t,o,i.pxbox,i.paddingbox,i.contentbox,i.rangebox),e.setProperty("--range-y",i.rangebox.y),e.setProperty("--range-height",i.rangebox.height),r.setAttribute("viewBox",0+" "+(i.rangebox.y+i.rangebox.height)+" "+1+" "+-i.rangebox.height),r.style.width="1em",r.style.height=-i.rangebox.height+"em"}function yr(t,e){let r=e.axis.scale,i=e.pxbox,s=i.height-(t.clientY-i.y-e.offset.y);e.normal=s/i.height}var xr=d((t,e)=>e.type,{pointerdown:(t,e)=>{t.target=e.target,t.time=e.timeStamp/1e3,t.previous&&t.previous.type==="tap"&&t.time-t.previous.time<vn&&(t.type="double-tap",t.target=t.previous.target);let o=Pt(e.target);return t.offset=e.target===e.currentTarget?{y:0}:{y:e.clientY-(o.y+o.height/2)},t.events.length=0,t.events.push(e),t},pointermove:(t,e)=>{t.events.push(e);let o=t.events[0];return e.timeStamp-o.timeStamp<ue&&e.clientY-o.clientY<4||(t.type="move",yr(e,t)),t},default:(t,e)=>(t.events.push(e),t.duration=e.timeStamp/1e3-t.time,!t.type&&t.duration<ue?t.type="tap":t.type==="move"&&(t.type="moveend"),t)}),vr=d(t=>t.type,{"double-tap":function(t){console.log("TODO: Implement double tap to reset to default")},move:function(t){let{target:e,axis:o,host:r,value:i,y:s,normal:a}=t,l=e.dataset.index,p=i[l],m=nn(o.scale,o.min,o.max,o.step,a);if(p.value===m.value)return;let h=Q(p);h.value=m.value,h.normal=m.normal,St("input",r)},moveend:function(t){let{internals:e,formdata:o,host:r,value:i}=t;Pn(e,o,r.name,i),St("change",r)},default:function(t){console.log("Untyped gesture, shouldnt happen",t)}});function Sr(t,e,o){return t.push(T("label",{part:o+"-tick tick",style:"--normal-"+o+": "+e.normal+";",html:"<span>"+e.label+"</span>"})),t}function pe(t,e,o,r,i,s,a,l){t.setAttribute("transform","translate("+.5+" "+rt(o.y,o.y+o.height,a.normal)+")"),t.firstElementChild.textContent=(a.label?a.label+" ":"")+a.value,t.dataset.index=l,e.setProperty("--normal-value-"+(l+1),a.normal)}function Er(t,e,o,r,i,s){return T("path",{part:"handle",class:"control control-handle control-point",d:"M 0 0 m -0.5 0 a 0.5 0.5 0 1 0 1 0 a 0.5 0.5 0 1 0 -1 0",tabindex:"0",html:"<title></title>"})}function Tr(t,e,o,r,i,s){let a=-1,l,p;for(;l=s[++a];)t[a]?(p=t[a],pe(p,e,r,i.scale,i.min,i.max,l,a)):(p=Er(r,i.scale,i.min,i.max,l,a),pe(p,e,r,i.scale,i.min,i.max,l,a),t.push(p),o.append(p));for(--a;p=t[++a];)p.remove()}function Mr(t,e,o,r,i,s,a,l){e.setProperty("--normal-zero",o.normalise(r,i,0)),a.forEach(p=>p.remove()),a.length=0,a=s.reduce((p,m)=>Sr(p,m,t),a),l.after.apply(l,a)}function ce(t,e){t.value=e.value.toPrecision(3)}var Fn={mode:"closed",focusable:!0,construct:function(t,e){let o=T("style",":host {} :host > * { visibility: hidden; }"),r=T("label",{for:"input",part:"label",html:"<slot></slot>"}),i=T("div",{part:"track"}),s=T("svg"),a=T("text",""),l=T("output",{for:"number",part:"output"}),p=T("input",{type:"number",id:"number"}),m=[],h=[];i.append(s),l.append(p),t.append(o,r,i,a,l);let u=B(this),k=getComputedStyle(i),x=o.sheet.cssRules[0].style,F=o.sheet.cssRules[1].style;u.host=this,u.childStyle=F,u.internals=e,u.formdata=new FormData,u.load=new Promise(f=>u.resolveLoad=f),u.pxbox={},u.paddingbox={},u.contentbox={},u.rangebox={y:6.75,width:6.75},u.scale=c.of(En),u.min=c.of(Tn),u.max=c.of(Mn),u.step=c.of(On),u.ticks=c.of(Bn),u.display=c.of(kn),u.values=c.of([{value:0,normal:0}]);let ct=c.merge(u.load,Xe,Ke).broadcast(),j=c.combine({load:u.load,scale:u.scale,min:u.min,max:u.max,ticks:u.ticks,step:u.step,display:u.display},Dt).scan(en,{}).broadcast(),$=c.combine({axis:j,points:u.values},Dt).map(({axis:f,points:P})=>(P.forEach(q=>at(q,f.scale,f.min,f.max,q.value)),P)).scan(wr,null).flatMap(w).broadcast();ct.each(()=>br(i,x,k,s,u)),j.each(f=>Mr("y",x,f.scale,f.min,f.max,f.ticks,m,a)),$.each(f=>u.data=f),c.combine({axis:j,reflows:ct,value:$},Dt).each(f=>{u.state=f,Tr(h,x,s,u.rangebox,f.axis,f.value),ce(l,f.value[0])}),u.valueObservers=$.reduce((f,P)=>(f.forEach(gr),f.push.apply(f,P.map((q,he,Pr)=>xt(".",q,q).each(de=>{let Cn=s.querySelectorAll("[part=handle]")[he];pe(Cn,x,u.rangebox,u.state.axis.scale,u.state.axis.min,u.state.axis.max,de,he),ce(l,de)}))),ce(l,P[0]),f),[]),c.combine({axis:j,gesture:oe({select:"[part=handle]",threshold:0},t)},Dt).each(({axis:f,gesture:P})=>{Ln(i,k,u.pxbox,u.paddingbox,u.contentbox,u.rangebox),P.scan(xr,{axis:f,handles:h,internals:e,host:this,track:i,pxbox:u.pxbox,formdata:u.formdata,value:u.state.value,events:[]}).filter(gt("type")).each(vr),this.focus()}),J("pointerup",l).reduce((f,P)=>{if(f&&P.timeStamp-f.timeStamp<800){p.focus();return}return P})},load:function(t){let e=B(this);e.childStyle.visibility="",e.resolveLoad()}};function Br(t,e){let o=t[t.length-1];return o&&!/^-?\d/.test(e)?o.label=e:t.push({value:H(e)}),t}function le(t){return t.split(/\s*,\s*|\s+/).reduce(Br,[])}function Or(t){return t.value+(t.label?" "+t.label:"")}function fe(t){return t.map(Or).join(", ")}function Ct(t,e,o=w){return{attribute:function(r){let i=B(this),s=o(r===null?e:r.trim());i[t].push(s)}}}function jt(t,e,o=w){return{attribute:function(r){this[t]=r===null?void 0:r},set:function(r){let i=B(this),s=o(typeof r=="string"?r.trim():r===void 0?e:r);i[t].push(s)},get:function(){return B(this).data[t]},enumerable:!0}}var Hn={type:{value:"number",enumerable:!0},min:jt("min",0,H),max:jt("max",1,H),scale:Ct("scale","linear",Ht),ticks:Ct("ticks","",Z),display:Ct("display"),step:jt("step","any")};var Dn=Object.assign({},Hn,{value:{attribute:function(t){this.value=t},get:function(){let t=B(this);return t.state?fe(t.state.value):""},set:function(t){B(this).values.push(typeof t=="string"?le(t):typeof t=="number"?[{value:t}]:R(t))},enumerable:!0},data:{get:function(){let t=B(this);return Q(t.data)},set:function(t){B(this).values.push(R(t))},enumerable:!0}});var kr=window.yInputStylesheet||import.meta.url.replace(/\/[^\/]*([?#].*)?$/,"/")+"shadow.css",za=zt("<y-input>",Fn,Dn,kr);export{za as default};
