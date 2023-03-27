/* form-elements 
   0.0.4
   By Stephen Band
   Built 2023-03-27 05:40 */

var _t=Object.getOwnPropertySymbols;var pn=Object.prototype.hasOwnProperty,ln=Object.prototype.propertyIsEnumerable;var Kt=(t,e)=>{var o={};for(var r in t)pn.call(t,r)&&e.indexOf(r)<0&&(o[r]=t[r]);if(t!=null&&_t)for(var r of _t(t))e.indexOf(r)<0&&ln.call(t,r)&&(o[r]=t[r]);return o};function v(t){return t}function f(t,e){return function(){let r=t.apply(this,arguments),i=e[r]||e.default;if(!i)throw new Error('overload() no handler for "'+r+'"');return i.apply(this,arguments)}}function W(t){var e=new Map;return function(r){if(e.has(r))return e.get(r);var i=t(r);return e.set(r,i),i}}var fn=Array.prototype;function hn(t,e){return typeof t=="function"?t.apply(null,e):t}function Xt(t,e,o){o=o||t.length;var r=o===1?e?t:W(t):W(function(i){return Xt(function(){var s=[i];return s.push.apply(s,arguments),t.apply(null,s)},e,o-1)});return function i(s){return arguments.length===0?i:arguments.length===1?r(s):arguments.length>=o?t.apply(null,arguments):hn(r(s),fn.slice.call(arguments,1))}}var d=Xt;function E(){}var dn=f(v,{is:E,tag:E,data:function(t,e,o){Object.assign(e.dataset,o)},html:function(t,e,o){e.innerHTML=o},text:function(t,e,o){e.textContent=o},children:function(t,e,o){e.innerHTML="",e.append.apply(e,o)},points:z,cx:z,cy:z,r:z,transform:z,preserveAspectRatio:z,viewBox:z,default:function(t,e,o){t in e?e[t]=o:e.setAttribute(t,o)}});function z(t,e,o){e.setAttribute(t,o)}function mn(t,e){for(var o=Object.keys(e),r=o.length;r--;)dn(o[r],t,e[o[r]]);return t}var ot=d(mn,!0);var Et="http://www.w3.org/2000/svg",Qt=document.createElement("template"),Tt=(t,e)=>e&&typeof e;function Jt(t,e){let o=document.createRange();return o.selectNode(t),o.createContextualFragment(e)}var T=f(Tt,{string:function(t,e){let o=document.createElementNS(Et,t);return o.innerHTML=e,o},object:function(t,e){let o=document.createElementNS(Et,t);return typeof e.length=="number"?o.append.apply(o,e):ot(o,e),o},default:t=>document.createElementNS(Et,t)}),wn=f(Tt,{string:function(t,e){let o=document.createElement(t);return o.innerHTML=e,o},object:function(t,e){let o=document.createElement(t);return typeof e.length=="number"?o.append.apply(o,e):ot(o,e),o},default:t=>document.createElement(t)}),gn=f(v,{comment:function(t,e){return document.createComment(e||"")},fragment:f(Tt,{string:function(t,e,o){return o?Jt(o,e):(Qt.innerHTML=e,Qt.content.cloneNode(!0))},object:function(t,e,o){let r=o?Jt(o):document.createDocumentFragment();return typeof e.length=="number"?r.append.apply(r,e):ot(r,e),r},default:()=>document.createDocumentFragment()}),text:function(t,e){return document.createTextNode(e||"")},circle:T,ellipse:T,g:T,glyph:T,image:T,line:T,rect:T,use:T,path:T,pattern:T,polygon:T,polyline:T,svg:T,default:wn}),M=gn;function Mt(t,e,o){let r;typeof o!="string"&&o.input!==void 0&&o.index!==void 0&&(r=o,o=r.input.slice(o.index+o[0].length+(o.consumed||0)));let i=t.exec(o);if(!i)return;let s=e(i);return r&&(r.consumed=(r.consumed||0)+i.index+i[0].length+(i.consumed||0)),s}var Bt=d(Mt,!0);function vn(t,e,o){throw o.input!==void 0&&o.index!==void 0&&(o=o.input),new Error('Cannot parse string "'+(o.length>128?o.length.slice(0,128)+"…":o)+'"')}function yn(t,e,o){let r=-1;for(;++r<o.length;)e=o[r]!==void 0&&t[r]?t[r](e,o):e;return t.done?t.done(e,o):t.close?t.close(e,o):e}function bn(t,e,o,r){let i=Mt(t,s=>yn(e,o,s),r);return i===void 0?e.catch?e.catch(o,r):vn(t,e,r):i}var rt=d(bn,!0);var B=Symbol("internals"),U=Symbol("shadow"),Zt=Object.defineProperties,xn={a:HTMLAnchorElement,article:HTMLElement,dl:HTMLDListElement,p:HTMLParagraphElement,br:HTMLBRElement,fieldset:HTMLFieldSetElement,hr:HTMLHRElement,img:HTMLImageElement,li:HTMLLIElement,ol:HTMLOListElement,optgroup:HTMLOptGroupElement,q:HTMLQuoteElement,section:HTMLElement,textarea:HTMLTextAreaElement,td:HTMLTableCellElement,th:HTMLTableCellElement,tr:HTMLTableRowElement,tbody:HTMLTableSectionElement,thead:HTMLTableSectionElement,tfoot:HTMLTableSectionElement,ul:HTMLUListElement},Sn={name:{set:function(t){return this.setAttribute("name",t)},get:function(){return this.getAttribute("name")||""}},form:{get:function(){return this[B].form}},labels:{get:function(){return this[B].labels}},validity:{get:function(){return this[B].validity}},validationMessage:{get:function(){return this[B].validationMessage}},willValidate:{get:function(){return this[B].willValidate}},checkValidity:{value:function(){return this[B].checkValidity()}},reportValidity:{value:function(){return this[B].reportValidity()}}},En={},te={once:!0},ee=0,ne=!1;function Tn(t){return xn[t]||window["HTML"+t[0].toUpperCase()+t.slice(1)+"Element"]||(()=>{throw new Error('Constructor not found for tag "'+t+'"')})()}var Mn=rt(/^\s*<?([a-z][\w]*-[\w-]+)>?\s*$|^\s*<?([a-z][\w]*)\s+is[=\s]*["']?([a-z][\w]*-[\w]+)["']?>?\s*$/,{1:(t,e)=>({name:e[1]}),2:(t,e)=>({name:e[3],tag:e[2]}),catch:function(t,e){throw new SyntaxError(`dom element() – name must be of the form 'element-name' or 'tag is="element-name"' (`+e+")")}},null);function Bn(t,e){if(t.hasOwnProperty(e)){let o=t[e];delete t[e],t[e]=o}return t}function oe(t,e,o){t._initialLoad=!0;let r=t.attachShadow({mode:e.mode||"closed",delegatesFocus:e.focusable||!1});if(o){let i=M("link",{rel:"stylesheet",href:o});r.append(i)}return t[U]=r,r}function Ln(t){var e;if(t.attachInternals){if(e=t.attachInternals(),e.setFormValue)return e}else e={shadowRoot:t.shadowRoot};return e.input=M("input",{type:"hidden",name:t.name}),t.appendChild(e.input),e.setFormValue=function(o){this.input.value=o},e}function Fn(t){return!!t.attribute}function kn(t){return t.set||t.get||t.hasOwnProperty("value")}function Pn(t,e){return Fn(e[1])&&(t.attributes[e[0]]=e[1].attribute),kn(e[1])&&(t.properties[e[0]]=e[1]),t}function Lt(t,e,o,r,i=""){let{name:s,tag:a}=Mn(t),g=typeof a=="string"?Tn(a):HTMLElement,{attributes:l,properties:b}=o?Object.entries(o).reduce(Pn,{attributes:{},properties:{}}):En;function c(){let p=Reflect.construct(g,arguments,c),S=e.construct&&e.construct.length>ee?oe(p,e,r||e.stylesheet):void 0,F=c.formAssociated?Ln(p):{};return a&&(ne=!0),e.construct&&e.construct.call(p,S,F),b&&Object.keys(b).reduce(Bn,p),p}return c.prototype=Object.create(g.prototype,b),b.value&&(c.formAssociated=!0,Zt(c.prototype,Sn),(e.enable||e.disable)&&(c.prototype.formDisabledCallback=function(p){return p?e.disable&&e.disable.call(this,this[U],this[B]):e.enable&&e.enable.call(this,this[U],this[B])}),e.reset&&(c.prototype.formResetCallback=function(){return e.reset.call(this,this[U],this[B])}),e.restore&&(c.prototype.formStateRestoreCallback=function(){return e.restore.call(this,this[U],this[B])})),l&&(c.observedAttributes=Object.keys(l),c.prototype.attributeChangedCallback=function(p,S,F){return l[p].call(this,F)}),c.prototype.connectedCallback=function(){let p=this,S=p[U],F=p[B];if(p._initialLoad){let k=S.querySelectorAll('link[rel="stylesheet"]');if(k.length){let nt=0,h=k.length,j=function(No){++nt>=k.length&&(delete p._initialLoad,e.load&&e.load.call(p,S))},an=j;for(;h--;)k[h].addEventListener("load",j,te),k[h].addEventListener("error",an,te)}else e.load&&Promise.resolve(1).then(()=>e.load.call(this,S,F))}e.connect&&e.connect.call(this,S,F)},e.disconnect&&(c.prototype.disconnectedCallback=function(){return e.disconnect.call(this,this[U],this[B])}),window.console&&window.console.log("%c<"+(a?a+" is="+s:s)+">%c "+i,"color: #3a8ab0; font-weight: 600;","color: #888888; font-weight: 400;"),window.customElements.define(s,c,a&&{extends:a}),a&&!ne&&document.querySelectorAll('[is="'+s+'"]').forEach(p=>{b&&Zt(p,b);let S=e.construct&&e.construct.length>ee?oe(p,e,r||e.stylesheet):void 0;e.construct&&e.construct.call(p,S);let F;for(F in l){let k=p.attributes[F];k&&l[F].call(p,k.value)}e.connect&&e.connect.apply(p)}),c}function On(t,e){return e[t]}var Y=d(On,!0);var Ft=Symbol("privates");function C(t){return t[Ft]||Object.defineProperty(t,Ft,{value:{}})[Ft]}function _(t,e,o){return o>e?e:o<t?t:o}var br=d(_);function kt(t){return function(){return arguments[t]}}function L(){return this}var Hn=Object.create,jn=Object.freeze;function Cn(){return!0}function re(){return-1}var V=jn(Hn({shift:E,push:E,forEach:E,join:function(){return""},every:Cn,filter:L,find:E,findIndex:re,flat:L,flatMap:L,includes:function(){return!1},indexOf:re,map:L,reduce:kt(1),sort:L,each:L,pipe:v,start:L,stop:L,done:L,valueOf:function(){return null}},{length:{value:0}}));function Pt(t,e){t.remove&&t.remove(e);let o;for(;(o=t.indexOf(e))!==-1;)t.splice(o,1);return t}var Pr=d(Pt,!0);function Ot(t){return t&&t[Symbol.iterator]}var Vn=Object.assign;function Dn(t){return t.stop?t.stop():t()}function K(){}Vn(K.prototype,{stop:function(){let t=this.stopables;return this.stopables=void 0,t&&t.forEach(Dn),this},done:function(t){return(this.stopables||(this.stopables=[])).push(t),this}});var O=Object.assign,D=Object.create;function X(t,e){t[0]=e,e.done(t)}function ie(t,e){let o=t[e].stopables;o&&Pt(o,t),t[e]=void 0}function m(t,e){t&&t.push(e)}function y(t){K.prototype.stop.apply(t);let e=-1,o;for(;o=t[++e];)t[e]=void 0,o.stop()}function se(t){return u.prototype.isPrototypeOf(t)}function u(t){this.input=t}O(u.prototype,K.prototype,{push:function(t){m(this[0],t)},pipe:function(t){if(this[0])throw new Error("Stream: Attempt to .pipe() a unicast stream multiple times. Create a multicast stream with .broadcast().");return this[0]=t,t.done(this),this.input.pipe(this),t},map:function(t){return new ue(this,t)},filter:function(t){return new ae(this,t)},split:function(t){return new pe(this,t)},flatMap:function(t){return new ce(this,t)},slice:function(t,e){return new Ht(this,t,e)},take:function(t){return console.warn(".take(a) superseded by .slice(0, a)"),new Ht(this,0,t)},each:function(t){return this.pipe(new he(t))},reduce:function(t,e){return this.pipe(new le(t,e)).value},scan:function(t,e){return new fe(this,t,e)},stop:function(){return y(this),this}});function ue(t,e){this.input=t,this.fn=e}ue.prototype=O(D(u.prototype),{push:function(e){let r=this.fn(e);r!==void 0&&m(this[0],r)}});function ae(t,e){this.input=t,this.fn=e}ae.prototype=O(D(u.prototype),{push:function(e){this.fn(e)&&m(this[0],e)}});function ce(t,e){this.input=t,this.fn=e}ce.prototype=O(D(u.prototype),{push:function(e){let r=this.fn(e);if(r!==void 0)if(Ot(r))for(let i of r)m(this[0],i);else r.pipe&&this.done(r.each(i=>m(this[0],i)))}});function pe(t,e){this.input=t,this.chunk=[],typeof n=="number"?this.n=e:this.fn=e}pe.prototype=O(D(u.prototype),{fn:function(){return this.chunk.length===this.n},push:function(e){let o=this.chunk;this.fn(e)?(m(this[0],o),this.chunk=[]):o.push(e)}});function Ht(t,e,o=1/0){this.input=t,this.index=-e,this.indexEnd=e+o}Ht.prototype=O(D(u.prototype),{push:function(e){++this.index>0&&this[0].push(e),this.index===this.indexEnd&&this.stop()}});function le(t,e){this.fn=t,this.value=e,this.i=0}le.prototype=O(D(u.prototype),{push:function(t){let e=this.fn;this.value=e(this.value,t,this.i++,this)}});function fe(t,e,o){this.input=t,this.fn=e,this.value=o}fe.prototype=O(D(u.prototype),{push:function(t){let e=this.fn;this.value=e(this.value,t),this[0].push(this.value)}});function he(t){this.push=t}he.prototype=O(D(u.prototype),{each:null,reduce:null,pipe:null});var In=Object.assign,An=Object.create;function Gn(t,e){if(t[1]){let o=-1;for(;t[++o]&&t[o]!==e;);for(;t[o++];)t[o-1]=t[o]}else t.stop()}function Q(t,e){u.apply(this,arguments),this.memory=!!(e&&e.memory),e&&e.hot&&this.pipe(V)}Q.prototype=In(An(u.prototype),{push:function(t){if(t===void 0)return;this.memory&&(this.value=t);let e=-1;for(;this[++e];)this[e].push(t)},pipe:function(t){let e=-1;for(;this[++e];);return this.memory&&e===0&&this.input.pipe(this),this[e]=t,t.done(()=>Gn(this,t)),this.value!==void 0&&t.push(this.value),!this.memory&&e===0&&this.input.pipe(this),t}});var zn=Array.prototype,Un=Object.assign,Rn=Object.create;function Wn(t){return t!==void 0}function J(t){this.buffer=t?t.filter?t.filter(Wn):t:[]}J.prototype=Un(Rn(u.prototype),{push:function(t){t!==void 0&&m(this.buffer,t)},pipe:function(t){for(t.done(this),this[0]=t;this.buffer.length;)m(this[0],zn.shift.apply(this.buffer));return this.buffer=t,t},stop:function(){return this.buffer=void 0,y(this),this}});var de=Object.assign,Yn=Object.create,Nn=Promise.resolve(),$n={schedule:function(){Nn.then(this.fire)},unschedule:E},qn={schedule:function(){this.timer=requestAnimationFrame(this.fire)},unschedule:function(){cancelAnimationFrame(this.timer),this.timer=void 0}},_n={schedule:function(){this.timer=setTimeout(this.fire,this.duration*1e3)},unschedule:function(){clearTimeout(this.timer),this.timer=void 0}};function N(t,e){u.apply(this,arguments),this.duration=e,this.timer=void 0,this.fire=()=>{this.timer=void 0,this.output.stop()},de(this,e==="tick"?$n:e==="frame"?qn:_n)}N.prototype=de(Yn(u.prototype),{push:function(t){this.timer?(this.unschedule(),this.schedule(),this.output.push(t)):(this.output=u.of(t),this[0].push(this.output),this.schedule())},stop:function(){return this.timer&&this.fire(),u.prototype.stop.apply(this,arguments)}});var jt=Object.assign,Kn=Object.create;function Xn(t){return!!t.active}function Qn(t){return!!t.stopped}function Ct(t,e,o,r,i,s){this.stream=t,this.values=e,this.pipes=o,this.name=r,this.input=i,this.mutable=s,this.active=!1,this.stopped=!1}jt(Ct.prototype,{push:function(t){let e=this.stream,o=this.values,r=this.name;if(o[r]=t,this.active=!0,e.active||(e.active=this.pipes.every(Xn)))if(this.mutable)m(e[0],o);else{let i=new this.values.constructor;m(e[0],jt(i,o))}},stop:function(){this.stopped=!0,this.pipes.every(Qn)&&y(this.stream)},done:function(t){this.stream.done(t)}});var Jn={};function it(t,e=Jn){this.inputs=t,this.mutable=!!e.mutable,this.active=!1}it.prototype=jt(Kn(u.prototype),{push:null,pipe:function(t){let e=this.inputs,o=[];this[0]=t,t.done(this);let r;for(r in e){let i=e[r];if(i.pipe){let s=new Ct(this,e,o,r,i,this.mutable);o.push(s),i.pipe(s)}else if(i.then){let s=new Ct(this,e,o,r,i,this.mutable);o.push(s),i.then(a=>s.push(a)),i.finally(()=>s.stop())}}return t}});var Zn=Object.assign,to=Object.create;function st(t){this.fn=t}st.prototype=Zn(to(u.prototype),{pipe:function(t){return t.done(this),this[0]=t,this.fn(e=>this.push(e),e=>this.stop(e)),t}});var me=Object.assign,eo=Object.create;function we(t){this.stream=t}me(we.prototype,{push:function(t){m(this.stream[0],t)},stop:function(){--this.stream.count===0&&y(this.stream)},done:function(t){this.stream.done(t)}});function ut(t){this.inputs=t}ut.prototype=me(eo(u.prototype),{push:null,pipe:function(t){let e=this.inputs;this.count=e.length,this[0]=t,t.done(this);let o=new we(this),r=-1,i;for(;i=e[++r];)if(i.pipe)i.pipe(o);else if(i.then)i.then(s=>o.push(s)),i.finally(()=>o.stop());else{let s=-1;for(;++s<i.length;)o.push(i[s]);o.stop()}return t}});var no=Object.assign,oo=Object.create;function at(t){this.promise=t}at.prototype=no(oo(u.prototype),{push:null,pipe:function(t){let e=this.promise;return this[0]=t,t.done(this),e.then(o=>m(this,o)),e.finally(()=>y(this)),t}});var ro=Array.prototype,ge=Object.assign;function io(t){throw new TypeError("Stream cannot be created from "+typeof object)}ge(u,{isStream:se,of:function(){return new J(ro.slice.apply(arguments))},from:function(t){return t.pipe?new u(t):t.then?new at(t):typeof t.length=="number"?typeof t=="function"?new st(t):new J(t):io(t)},batch:t=>new N(V,t),broadcast:t=>new Q(V,t),combine:(t,e)=>new it(t,e),merge:function(){return new ut(arguments)},writeable:function(t){let e=new u(V);return t(e),e}});ge(u.prototype,{log:L,batch:function(t){return new N(this,t)},burst:function(t){return console.warn("stream.burst() is now stream.batch()"),new N(this,t)},broadcast:function(t){return new Q(this,t)}});var so=Object.assign,uo=/\s+/,ct={fullscreenchange:W(()=>"fullscreenElement"in document?"fullscreenchange":"webkitFullscreenElement"in document?"webkitfullscreenchange":"mozFullScreenElement"in document?"mozfullscreenchange":"msFullscreenElement"in document?"MSFullscreenChange":"fullscreenchange")},ve=0;window.addEventListener("click",t=>ve=t.timeStamp);function ao(t,e){return t.node.addEventListener(ct[e]?ct[e]():e,t,t.options),t}function co(t,e){return t.node.removeEventListener(ct[e]?ct[e]():e,t),t}function ye(t,e,o){this.types=t.split(uo),this.options=e,this.node=o,this.select=e&&e.select}so(ye.prototype,{pipe:function(t){X(this,t),this.types.reduce(ao,this)},handleEvent:function(t){if(!(t.type==="click"&&t.timeStamp<=ve)){if(this.select){let e=t.target.closest(this.select);if(!e)return;t.selectedTarget=e}m(this[0],t)}},stop:function(){this.types.reduce(co,this),y(this[0])}});function pt(t,e){let o;return typeof t=="object"&&(o=t,t=o.type),new u(new ye(t,o,e))}function I(t){return typeof t}var po=/^\s*([+-]?\d*\.?\d+)([^\s\d]*)\s*$/;function Vt(t){return function(o){if(typeof o=="number")return o;var r=po.exec(o);if(!r||!t[r[2]||""]){if(!t.catch)throw new Error('Cannot parse value "'+o+'" (accepted units '+Object.keys(t).join(", ")+")");return r?t.catch(parseFloat(r[1]),r[2]):t.catch(parseFloat(o))}return t[r[2]||""](parseFloat(r[1]))}}var lo=/px$/,be={"transform:translateX":function(t){var e=Z("transform",t);if(!e||e==="none")return 0;var o=lt(e);return parseFloat(o[4])},"transform:translateY":function(t){var e=Z("transform",t);if(!e||e==="none")return 0;var o=lt(e);return parseFloat(o[5])},"transform:scale":function(t){var e=Z("transform",t);if(!e||e==="none")return 0;var o=lt(e),r=parseFloat(o[0]),i=parseFloat(o[1]);return Math.sqrt(r*r+i*i)},"transform:rotate":function(t){var e=Z("transform",t);if(!e||e==="none")return 0;var o=lt(e),r=parseFloat(o[0]),i=parseFloat(o[1]);return Math.atan2(i,r)}};function lt(t){return t.split("(")[1].split(")")[0].split(/\s*,\s*/)}function Z(t,e){return window.getComputedStyle?window.getComputedStyle(e,null).getPropertyValue(t):0}function ft(t,e){if(be[t])return be[t](e);var o=Z(t,e);return typeof o=="string"&&lo.test(o)?parseFloat(o):o}var ht,dt;function fo(){if(!ht){let t=document.documentElement.style.fontSize;document.documentElement.style.fontSize="100%",ht=ft("font-size",document.documentElement),document.documentElement.style.fontSize=t||""}return ht}function ho(){return dt||(dt=ft("font-size",document.documentElement)),dt}window.addEventListener("resize",()=>{ht=void 0,dt=void 0});var mo=f(I,{number:v,string:Vt({px:v,em:t=>fo()*t,rem:t=>ho()*t,vw:t=>window.innerWidth*t/100,vh:t=>window.innerHeight*t/100,vmin:t=>window.innerWidth<window.innerHeight?window.innerWidth*t/100:window.innerHeight*t/100,vmax:t=>window.innerWidth<window.innerHeight?window.innerHeight*t/100:window.innerWidth*t/100})}),mt=mo;function Dt(t){t.stopPropagation(),t.preventDefault()}var wo=Array.prototype,At=Object.assign,It="webkitUserSelect"in document.body.style?"webkitUserSelect":"userSelect",wt={},gt={threshold:4,ignoreTags:{textarea:!0,input:!0,select:!0}};function go(t,e,o){return e*e+o*o>=t*t}function xe(t,e,o){if(this.stream=t,this.events=[e],this.options=o,this.pointerId=e.pointerId,typeof o.threshold=="function")this.checkThreshold=o.threshold;else{let r=mt(o.threshold);this.checkThreshold=(i,s,a)=>go(r,i,s,a)}document.addEventListener("pointermove",this),document.addEventListener("pointerup",this),document.addEventListener("pointercancel",this)}At(xe.prototype,{handleEvent:f(Y("type"),{pointermove:function(t){if(this.pointerId===t.pointerId){if(this.pointerId in wt&&this!==wt[this.pointerId]){this.stop();return}if(this.events.push(t),!this.isGesture){let e=this.events[0],o=t.clientX-e.clientX,r=t.clientY-e.clientY,i=(t.timeStamp-e.timeStamp)/1e3;this.checkThreshold(o,r,i)&&this.createGesture()}}},pointerup:function(t){this.pointerId===t.pointerId&&(this.events.push(t),this.stop(),this.isGesture&&document.addEventListener("click",Dt,{capture:!0,once:!0}))},default:function(t){this.pointerId===t.pointerId&&(this.events.push(t),this.stop())}}),createGesture:function(){this.isGesture=!0,this.userSelectState=document.body.style[It],document.body.style[It]="none",wt[this.pointerId]=this,this.stream.push(new u(this))},pipe:function(t){for(X(this,t);this.events.length;)m(this[0],wo.shift.apply(this.events));this.events=t},stop:function(){if(document.removeEventListener("pointermove",this),document.removeEventListener("pointerup",this),document.removeEventListener("pointercancel",this),this.isGesture&&(document.body.style[It]=this.userSelectState,delete wt[this.pointerId]),this[0]){let t=this[0];ie(this,0),y(t)}}});function vo(t){var e=t.target.tagName;return e&&(!!gt.ignoreTags[e.toLowerCase()]||t.target.draggable)}function Se(t,e){this.node=t,this.options=e}At(Se.prototype,{pipe:function(t){return this[0]=t,this.node.addEventListener("pointerdown",this),t},handleEvent:function(t){if(t.button===0&&!(this.options.device&&!this.options.device.includes(t.pointerType))&&!vo(t)&&!(this.options.select&&!t.target.closest(this.options.select))){var e={type:t.type,target:t.target,currentTarget:t.currentTarget,clientX:t.clientX,clientY:t.clientY,timeStamp:t.timeStamp,pointerId:t.pointerId};new xe(this[0],e,this.options)}},stop:function(){return this[0]&&(this.node.removeEventListener("pointerdown",this),y(this[0])),this}});function Gt(t,e){return t=e&&t?At({},gt,t):gt,e=e||t,new u(new Se(e,t))}var yo=Object.assign,tt={bubbles:!0,cancelable:!0};function zt(t,e){var b;let o=tt,r,i,s,a,g,l;return typeof t=="object"?(b=t,{type:t,detail:i,bubbles:s,cancelable:a,composed:g}=b,r=Kt(b,["type","detail","bubbles","cancelable","composed"]),l=yo(new CustomEvent(t,{detail:i,bubbles:s||tt.bubbles,cancelable:a||tt.cancelable,composed:g||tt.composed}),r)):l=new CustomEvent(t,tt),e.dispatchEvent(l)}var Ii=d(zt,!0);function w(t){return Math.pow(10,t/20)}function P(t){if(!t)return 0;let e=+t;if(e||e===0)return e;let o=/^(?:(-?[\d.]+)|(-?∞))(?:(db|bpm)|(m|k)?(\w+))$/.exec(t.toLowerCase());if(!o)return 0;let r=o[2]?o[2]==="-∞"?-1/0:1/0:parseFloat(o[1]);return o[3]==="db"?w(r):o[3]==="bpm"?r/60:o[4]==="m"?r/1e3:o[4]==="k"?r*1e3:r}function vt(t){if(typeof t.length=="number")return t[t.length-1]}var Ee=rt(/^([+\-]?(?:0|[1-9]\d*|∞)(?:\.\d+)?(?:[eE][+\-]?\d+)?\w*)\s*(?:\[([^\]]+)\]|([^\d\s-]\S*))?\s*/,{1:(t,e)=>{let o=P(e[1]);return t.push({value:o,label:e[1]}),t},2:(t,e)=>(vt(t).label=e[2],t),3:(t,e)=>(vt(t).label=e[3],t),done:(t,e)=>Ee(t,e),catch:v}),$=f(I,{string:t=>Ee([],t.trim()),object:v});function Te(t,e,o){let r=t,i=[{value:r}];for(;(r=r+o)<=e;)i.push({value:r});return i}function Me(t,e){let o=t.length,r=1/0,i;for(;o--;){let s=Math.abs(e-t[o].normal);s<r&&(r=s,i=t[o])}return i}function Be(t,e){let o=t.length;for(;t[--o]&&t[o].unitValue>=e;);return t[o]||t[0]}function Le(t,e){let o=-1;for(;t[++o]&&t[o].unitValue<=e;);return t[o]||t[t.length-1]}function x(t,e){return Math.ceil(e/t)*t}var Fe=f(t=>t.toLowerCase(),{db:(t,e,o)=>$("-∞dB -96dB -90dB -84dB -78dB -72dB -66dB -60dB -54dB -48dB -42dB -36dB -30dB -24dB -18dB -12dB -6dB 0dB 6dB 12dB 18dB 24dB"),default:(t,e,o)=>{let r=o-e,i=r<.8?x(.05,r/10):r<2?x(.2,r/10):r<8?x(.5,r/10):r<20?x(2,r/10):r<80?x(5,r/10):r<200?x(20,r/10):x(200,r),s=[],a=r<.8?x(.05,e):r<2?x(.2,e):r<8?x(.5,e):r<20?x(2,e):r<80?x(5,e):r<200?x(20,e):x(200,e);for(;a<=o;)s.push({label:r<2?a.toFixed(1):a,value:a}),a+=i;return s}});function Ut(t,e,o,r,i){return t.normal=e.normalise(o,r,i),t}function ke(t,e){let{scale:o,min:r,max:i,step:s,ticks:a,display:g}=e;return t.scale=o,t.min=r,t.max=i,t.ticks=(a?a.length?a:Fe(g,r,i):V).filter(l=>l.value>=t.min&&l.value<=t.max).map(l=>Ut(l,o,r,i,l.value)),t.step=s==="any"?void 0:s==="ticks"?t.ticks:/\s|,/.test(s)?$(s).filter(l=>l.value>=t.min&&l.value<=t.max).map(l=>Ut(l,o,r,i,l.value)):Te(r,i,P(s)).map(l=>Ut(l,o,r,i,l.value)),t.display=g,t}var et={};function Pe(t,e,o,r,i){return et.value=_(e,o,i),et.normal=t.normalise(e,o,et.value),r?Me(r,et.normal):et}function Rt(t){return 20*Math.log10(t)}function A(t,e){var o=e%t;return o<0?o+t:o}var cs=d(A);function Wt(t){return function(o,...r){var i=t[o]||t.default;return i&&i.apply(this,r)}}var Ve=9,bo=/(`[^`]*`)|(ms|[YMwdhms]{1,3}|±)/g;function xo(t){return t*60}function So(t){return t*3600}function Eo(t){return t*1e3}function Oe(t){return t/60}function He(t){return t/3600}function Yt(t){return t/86400}function To(t){return t/604800}function je(t){return t/2629800}function Mo(t){return t/31557600}function G(t){return t>=10?"":"0"}var Bo=/^([+-])?(\d{2,}):([0-5]\d)(?::((?:[0-5]\d|60)(?:.\d+)?))?$/,Lo=/^([+-])?(\d{2,}):(\d{2,})(?::(\d{2,}(?:.\d+)?))?$/,R=f(I,{number:v,string:Bt(Bo,Ie),default:function(t){throw new Error("parseTime() does not accept objects of type "+typeof t)}}),De=f(I,{number:v,string:Bt(Lo,Ie),default:function(t){throw new Error("parseTime() does not accept objects of type "+typeof t)}});function Ie(t){let[e,o,r,i,s]=t;var a=So(parseInt(r,10))+(i?xo(parseInt(i,10))+(s?parseFloat(s,10):0):0);return o==="-"?-a:a}function Fo(t,e){return t.replace(bo,(o,r,i)=>r?r.slice(1,-1):Ce[o]?Ce[o](e):o)}function ko(t){var e=t<0?"-":"";t<0&&(t=-t);var o=Math.floor(t/3600),r=G(o)+o;if(t=t%3600,t===0)return e+r+":00";var i=Math.floor(t/60),s=G(i)+i;if(t=t%60,t===0)return e+r+":"+s;var a=G(t)+Ae(Ve,t);return e+r+":"+s+":"+a}function Ae(t,e){return e.toFixed(t).replace(/\.?0+$/,"")}var Ce={"±":function(e){return e<0?"-":""},Y:function(e){return e=e<0?-e:e,Math.floor(Mo(e))},M:function(e){return e=e<0?-e:e,Math.floor(je(e))},MM:function(e){return e=e<0?-e:e,Math.floor(je(e%31557600))},w:function(e){return e=e<0?-e:e,Math.floor(To(e))},ww:function(e){return e=e<0?-e:e,Math.floor(Yt(e%2629800))},d:function(e){return e=e<0?-e:e,Math.floor(Yt(e))},dd:function(e){return e=e<0?-e:e,Math.floor(Yt(e%604800))},h:function(e){return e=e<0?-e:e,Math.floor(He(e))},hh:function(e){e=e<0?-e:e;var o=Math.floor(He(e%86400));return G(o)+o},m:function(e){e=e<0?-e:e;var o=Math.floor(Oe(e));return G(o)+o},mm:function(e){e=e<0?-e:e;var o=Math.floor(Oe(e%3600));return G(o)+o},s:function(e){return e=e<0?-e:e,Math.floor(e)},ss:function(e){e=e<0?-e:e;var o=Math.floor(e%60);return G(o)+o},sss:function(e){e=e<0?-e:e;var o=e%60;return G(o)+Ae(Ve,o)},ms:function(e){e=e<0?-e:e;var o=Math.floor(Eo(e%1));return o>=100?o:o>=10?"0"+o:"00"+o}},Ge=d(function(t,e){return t==="ISO"?ko(R(e)):Fo(t,R(e))});var ys=d(function(t,e){return R(e)+De(t)}),bs=d(function(t,e){return R(e)-De(t)}),xs=d(function(t,e){return R(t)-R(e)}),Po=Wt({w:function(t){return t-A(604800,t)},d:function(t){return t-A(86400,t)},h:function(t){return t-A(3600,t)},m:function(t){return t-A(60,t)},s:function(t){return t-A(1,t)},ms:function(t){return t-A(.001,t)}}),Ss=d(function(t,e){return Po(t,R(e))});function Oo(){return{unit:value<1?"m"+unit:unit,value:value<.001?(value*1e3).toFixed(2):value<1?(value*1e3).toPrecision(3):value.toPrecision(3)}}function Ho(t,e){return{unit:e<1?"m"+t:e>=1e3?"k"+t:t,value:e<.001?(e*1e3).toFixed(2):e<1?(e*1e3).toPrecision(3):e>=1e3?(e/1e3).toPrecision(3):e.toPrecision(3)}}function jo(t,e){return{unit:e<.01?"m"+t:e<1?"c"+t:e>=1e3?"k"+t:t,value:e<.001?(e*1e3).toFixed(2):e<.01?(e*1e3).toPrecision(3):e<1?(e*100).toPrecision(3):e>=1e3?(e/1e3).toPrecision(3):e.toPrecision(3)}}var Co={pan:(t,e)=>({unit:"",value:e===-1?"-1.00":e===0?"0.00":e===1?"1.00":e.toFixed(2)}),db:(t,e)=>{let o=Rt(e);return{unit:"dB",value:isFinite(o)?o<-1?o.toPrecision(3):o.toFixed(2):o<0?"-∞":"∞"}},hz:(t,e)=>({unit:e>=1e3?"kHz":"Hz",value:e<1?e.toFixed(2):e>=1e3?(e/1e3).toPrecision(3):e.toPrecision(3)}),semitone:(t,e)=>({unit:"",value:e===0?"0":e<0?"♭"+(-e/100).toFixed(2):"♯"+(e/100).toFixed(2)}),s:Oo,m:jo,bpm:(t,e)=>{let o=e*60;return{unit:"bpm",value:o<100?o.toFixed(1):o.toFixed(0)}},int:(t,e)=>({unit:"",value:Math.round(e)}),"":(t,e)=>({unit:"",value:e>-1&&e<1?e.toFixed(2):e.toPrecision(3)}),default:f(t=>/[YMWwdhms]/.test(t)?"time":"default",{time:(t,e)=>({unit:"",value:Ge(t,e)}),default:Ho})},ze=f(t=>t.toLowerCase(),Co);var Ue=f(Y("keyCode"),{38:(t,e,o,r,i,s)=>{if(t.preventDefault(),i)return Le(i,s).value;let a=t.shiftKey?10:1;return e.denormalise(o,r,(Math.round(100*s)+a)*.01)},40:(t,e,o,r,i,s)=>{if(t.preventDefault(),i)return Be(i,s).value;let a=t.shiftKey?10:1;return e.denormalise(o,r,(Math.round(100*s)-a)*.01)},default:E});function Nt(t,e,o){return(o-t)/(e-t)}function $t(t,e,o){return o*(e-t)+t}var Ds=w(-6),Is=w(-12),As=w(-18),Re=w(-24),We=w(-30),Ye=w(-36),Gs=w(-42),Ne=w(-48),zs=w(-54),$e=w(-60),qe=w(-66),_e=w(-72),Us=w(-78),Rs=w(-84),Ws=w(-90),Ke=w(-96);var Ys=Symbol("state");var Xe=Object.assign,bt={};function qt(t,e,o){let r=o/(e*t);return(r<=1?r:Math.log(r)+1)/bt[t]}function Vo(t,e,o){let r=o*bt[t];return e*t*(r<=1?r:Math.pow(Math.E,r-1))}function H(t){this.xover=t,bt[t]||(bt[t]=Math.log(1/t)+1)}Xe(H.prototype,{normalise:function(t,e,o){let r=qt(this.xover,e,t);return(qt(this.xover,e,o)-r)/(1-r)},denormalise:function(t,e,o){let r=qt(this.xover,e,t),i=o*(1-r)+r;return Vo(this.xover,e,i)}});function yt(t){this.power=t}Xe(yt.prototype,{normalise:function(t,e,o){return Math.pow((o-t)/(e-t),1/this.power)},denormalise:function(t,e,o){return Math.pow(o,this.power)*(e-t)+t}});var Do={linear:{normalise:Nt,denormalise:$t},"pow-2":new yt(2),"pow-3":new yt(3),"pow-4":new yt(4),log:{normalise:function(t,e,o){return Math.log(o/t)/Math.log(e/t)},denormalise:function(t,e,o){return t*Math.pow(e/t,o)}},"log-24db":new H(Re),"log-30db":new H(We),"log-36db":new H(Ye),"log-48db":new H(Ne),"log-60db":new H($e),"log-66db":new H(qe),"log-72db":new H(_e),"log-96db":new H(Ke)};function xt(t){return Do[t&&t.toLowerCase()||"linear"]}var Qe=xt("linear"),Je=0,Ze=1,tn=null,en="any",nn="",on=0;function Ao(t){let e=t.target.closest('[name="value"]');return parseFloat(e.value)}var Go=f((t,e)=>e.type,{pointerdown:(t,e)=>({scale:t.scale,min:t.min,max:t.max,e0:e,y0:e.clientY,y:t.normal,value:t.value,touchRange:mt(getComputedStyle(e.target).getPropertyValue("--touch-range"))}),default:(t,e)=>{let{scale:o,min:r,max:i,y:s,y0:a,touchRange:g}=t,l=a-e.clientY,b=_(0,1,s+l/g),c=o.denormalise(r,i,b);return t.value=c,t}});function zo(t,e){return t.push(M("button",{type:"button",part:"tick",name:"value",value:e.value,style:"--normal-value: "+e.normal+";",children:[M("span",{text:e.label,style:"transform: translate3d(-50%, 0, 0) rotate3d(0, 0, 1, calc(-1 * (var(--rotation-start) + "+e.normal+" * var(--rotation-range)))) translate3d(calc("+Math.sin(e.normal*6.28318531)+" * -33%), 0, 0);"})]})),t}function Uo(t,e,o,r,i,s){let a=Pe(e,o,r,i,s);return t.value=a.value,t.normal=a.normal,t}function Ro(t,e,o,r,i,s,a){t.setProperty("--normal-value",a);let g=ze(i,s);o.textContent=g.value,r.textContent=g.unit,e.setFormValue(s)}function Wo(t,e,o,r,i,s,a){t.setProperty("--normal-zero",e.normalise(o,r,0)),s.forEach(g=>g.remove()),s.length=0,s=i.reduce(zo,s),a.after.apply(a,s)}var rn={mode:"closed",focusable:!0,construct:function(t,e){let o=M("style",":host {} :host > * { visibility: hidden; }"),r=M("label",{for:"input",part:"label",html:"<slot></slot>"}),i=M("div",{class:"handle"}),s=M("text"),a=M("abbr"),g=M("output",{children:[s,a],part:"output"}),l=M("text",""),b=[];t.append(o,r,i,g,l);let c=C(this),p={},S=o.sheet.cssRules[0].style,F=o.sheet.cssRules[1].style;c.host=this,c.shadow=t,c.hostStyle=S,c.childStyle=F,c.internals=e,c.data=p,c.shadow=new Promise(h=>c.load=h),c.scale=u.of(Qe),c.min=u.of(Je),c.max=u.of(Ze),c.step=u.of(en),c.ticks=u.of(tn),c.display=u.of(nn),c.value=u.of(on);let k=h=>{c.value.push(h),zt("input",this)},nt=u.combine({shadow:c.shadow,scale:c.scale,min:c.min,max:c.max,ticks:c.ticks,display:c.display,step:c.step}).scan(ke,p).broadcast();nt.each(h=>Wo(S,h.scale,h.min,h.max,h.ticks,b,l)),u.combine({data:nt,value:c.value}).scan((h,j)=>Uo(h,j.data.scale,j.data.min,j.data.max,j.data.step,j.value),p).each(h=>Ro(S,e,s,a,h.display,h.value,h.normal)),pt({type:"pointerdown",select:'[name="value"]'},t).map(Ao).each(k),Gt({threshold:1,select:".handle"},t).each(h=>h.scan(Go,p).map(Y("value")).each(k)),pt("keydown",this).filter(()=>document.activeElement===this||this.contains(document.activeElement)).map(h=>Ue(h,p.scale,p.min,p.max,p.step,p.normal)).each(k)},load:function(t){let e=C(this);e.childStyle.visibility="",e.load(t)}};function St(t,e,o=v){return{attribute:function(r){let i=C(this),s=o(r===null?e:r.trim());i[t].push(s)}}}function q(t,e,o=v){return{attribute:function(r){this[t]=r===null?void 0:r},set:function(r){let i=C(this),s=o(typeof r=="string"?r.trim():r===void 0?e:r);i[t].push(s)},get:function(){return C(this).data[t]},enumerable:!0}}var sn={type:{value:"number",enumerable:!0},min:q("min",0,P),max:q("max",1,P),scale:St("scale","linear",xt),ticks:St("ticks","",$),display:St("display"),step:q("step","any")};var un=Object.assign({},sn,{value:q("value",0,P)});var Yo=window.rotaryInputStylesheet||import.meta.url.replace(/\/[^\/]*([?#].*)?$/,"/")+"rotary-input-shadow.css",ku=Lt("<rotary-input>",rn,un,Yo);export{ku as default};
