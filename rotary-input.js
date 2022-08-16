/* form-elements 
   0.0.4
   By Stephen Band
   Built 2022-08-16 21:00 */

var kt=Object.getOwnPropertySymbols;var Ve=Object.prototype.hasOwnProperty,Ae=Object.prototype.propertyIsEnumerable;var Ft=(t,e)=>{var o={};for(var r in t)Ve.call(t,r)&&e.indexOf(r)<0&&(o[r]=t[r]);if(t!=null&&kt)for(var r of kt(t))e.indexOf(r)<0&&Ae.call(t,r)&&(o[r]=t[r]);return o};function L(t){return t}function m(t,e){return function(){let r=t.apply(this,arguments),i=e[r]||e.default;if(!i)throw new Error('overload() no handler for "'+r+'"');return i.apply(this,arguments)}}function q(t){var e=new Map;return function(r){if(e.has(r))return e.get(r);var i=t(r);return e.set(r,i),i}}var He=Array.prototype;function Ce(t,e){return typeof t=="function"?t.apply(null,e):t}function Ot(t,e,o){o=o||t.length;var r=o===1?e?t:q(t):q(function(i){return Ot(function(){var s=[i];return s.push.apply(s,arguments),t.apply(null,s)},e,o-1)});return function i(s){return arguments.length===0?i:arguments.length===1?r(s):arguments.length>=o?t.apply(null,arguments):Ce(r(s),He.slice.call(arguments,1))}}var x=Ot;function g(){}var De=m(L,{is:g,tag:g,data:function(t,e,o){Object.assign(e.dataset,o)},html:function(t,e,o){e.innerHTML=o},text:function(t,e,o){e.textContent=o},children:function(t,e,o){e.innerHTML="",e.append.apply(e,o)},points:A,cx:A,cy:A,r:A,preserveAspectRatio:A,transform:A,viewBox:A,default:function(t,e,o){t in e?e[t]=o:e.setAttribute(t,o)}});function A(t,e,o){e.setAttribute(t,o)}function je(t,e){for(var o=Object.keys(e),r=o.length;r--;)De(o[r],t,e[o[r]]);return t}var X=x(je,!0);var ct="http://www.w3.org/2000/svg",Pt=document.createElement("div"),pt=(t,e)=>e&&typeof e;function Vt(t,e){let o=document.createRange();return o.selectNode(t),o.createContextualFragment(e)}var S=m(pt,{string:function(t,e){let o=document.createElementNS(ct,t);return o.innerHTML=e,o},object:function(t,e){let o=document.createElementNS(ct,t);return typeof e.length=="number"?o.append.apply(o,e):X(o,e),o},default:t=>document.createElementNS(ct,t)}),Ge=m(pt,{string:function(t,e){let o=document.createElement(t);return o.innerHTML=e,o},object:function(t,e){let o=document.createElement(t);return typeof e.length=="number"?o.append.apply(o,e):X(o,e),o},default:t=>document.createElement(t)}),_e=m(L,{comment:function(t,e){return document.createComment(e||"")},fragment:m(pt,{string:function(t,e,o){if(o)return Vt(o,e);let r=document.createDocumentFragment();Pt.innerHTML=e;let i=Pt.childNodes;for(;i[0];)r.appendChild(i[0]);return r},object:function(t,e,o){let r=o?Vt(o):document.createDocumentFragment();return typeof e.length=="number"?r.append.apply(r,e):X(r,e),r},default:()=>document.createDocumentFragment()}),text:function(t,e){return document.createTextNode(e||"")},circle:S,ellipse:S,g:S,glyph:S,image:S,line:S,rect:S,use:S,path:S,pattern:S,polygon:S,polyline:S,svg:S,default:Ge}),B=_e;function lt(t,e,o){let r;typeof o!="string"&&o.input!==void 0&&o.index!==void 0&&(r=o,o=r.input.slice(o.index+o[0].length+(o.consumed||0)));let i=t.exec(o);if(!i)return;let s=e(i);return r&&(r.consumed=(r.consumed||0)+i.index+i[0].length+(i.consumed||0)),s}var xo=x(lt,!0);function ze(t,e,o){throw o.input!==void 0&&o.index!==void 0&&(o=o.input),new Error('Cannot parse string "'+(o.length>128?o.length.slice(0,128)+"…":o)+'"')}function Ie(t,e,o){let r=-1;for(;++r<o.length;)e=o[r]!==void 0&&t[r]?t[r](e,o):e;return t.done?t.done(e,o):t.close?t.close(e,o):e}function Ue(t,e,o,r){let i=lt(t,s=>Ie(e,o,s),r);return i===void 0?e.catch?e.catch(o,r):ze(t,e,r):i}var At=x(Ue,!0);var ft=g;var T=Symbol("internals"),H=Symbol("shadow"),Ht=Object.defineProperties,Re={a:HTMLAnchorElement,article:HTMLElement,dl:HTMLDListElement,p:HTMLParagraphElement,br:HTMLBRElement,fieldset:HTMLFieldSetElement,hr:HTMLHRElement,img:HTMLImageElement,li:HTMLLIElement,ol:HTMLOListElement,optgroup:HTMLOptGroupElement,q:HTMLQuoteElement,section:HTMLElement,textarea:HTMLTextAreaElement,td:HTMLTableCellElement,th:HTMLTableCellElement,tr:HTMLTableRowElement,tbody:HTMLTableSectionElement,thead:HTMLTableSectionElement,tfoot:HTMLTableSectionElement,ul:HTMLUListElement},Ne={name:{set:function(t){return this.setAttribute("name",t)},get:function(){return this.getAttribute("name")||""}},form:{get:function(){return this[T].form}},labels:{get:function(){return this[T].labels}},validity:{get:function(){return this[T].validity}},validationMessage:{get:function(){return this[T].validationMessage}},willValidate:{get:function(){return this[T].willValidate}},checkValidity:{value:function(){return this[T].checkValidity()}},reportValidity:{value:function(){return this[T].reportValidity()}}},We={},Ct={once:!0},$e=0,Dt=!1;function Ke(t){return Re[t]||window["HTML"+t[0].toUpperCase()+t.slice(1)+"Element"]||(()=>{throw new Error('Constructor not found for tag "'+t+'"')})()}var Ye=At(/^\s*<?([a-z][\w]*-[\w]+)>?\s*$|^\s*<?([a-z][\w]*)\s+is=["']?([a-z][\w]*-[\w]+)["']?>?\s*$/,{1:(t,e)=>({name:e[1]}),2:(t,e)=>({name:e[3],tag:e[2]}),catch:function(t,e){throw new SyntaxError(`dom element() – name must be of the form 'element-name' or 'tag is="element-name"' (`+e+")")}},null);function qe(t,e){if(t.hasOwnProperty(e)){let o=t[e];delete t[e],t[e]=o}return t}function Xe(t,e,o){t._initialLoad=!0;let r=t.attachShadow({mode:e.mode||"closed",delegatesFocus:e.focusable||!1});if(o){let i=B("link",{rel:"stylesheet",href:o});r.append(i)}return t[H]=r,r}function Qe(t){var e;if(t.attachInternals){if(e=t.attachInternals(),e.setFormValue)return e}else e={shadowRoot:t.shadowRoot};return e.input=B("input",{type:"hidden",name:t.name}),t.appendChild(e.input),e.setFormValue=function(o){this.input.value=o},e}function Je(t){t._initialAttributes={},t._n=0}function Ze(t,e,o){let r=t._initialAttributes;for(;t._n<e.length&&r[e[t._n]]!==void 0;)o[e[t._n]].call(t,r[e[t._n]]),++t._n}function jt(t,e,o){if(!t._initialAttributes)return;let r=t._initialAttributes;for(;t._n<e.length;)r[e[t._n]]!==void 0&&o[e[t._n]]&&o[e[t._n]].call(t,r[e[t._n]]),++t._n;delete t._initialAttributes,delete t._n}function tn(t){return!!t.attribute}function en(t){return t.set||t.get||t.hasOwnProperty("value")}function Gt(t,e){return tn(e[1])&&(t.attributes[e[0]]=e[1].attribute),en(e[1])&&(t.properties[e[0]]=e[1]),t}function ht(t,e,o,r){let{name:i,tag:s}=Ye(t),c=typeof s=="string"?Ke(s):HTMLElement,{attributes:p,properties:f}=o?Object.entries(o).reduce(Gt,{attributes:{},properties:{}}):e.properties?Object.entries(e.properties).reduce(Gt,{attributes:{},properties:{}}):We;function l(){let a=Reflect.construct(c,arguments,l),h=e.construct&&e.construct.length>$e?Xe(a,e,r||e.stylesheet):void 0,v=l.formAssociated&&Qe(a);return s&&(Dt=!0),e.construct&&e.construct.call(a,h,v),p&&(Je(a),Promise.resolve(1).then(function(){jt(a,l.observedAttributes,p)})),f&&Object.keys(f).reduce(qe,a),a}return l.prototype=Object.create(c.prototype,f),f&&f.value&&(l.formAssociated=!0,Ht(l.prototype,Ne),(e.enable||e.disable)&&(l.prototype.formDisabledCallback=function(a){return a?e.disable&&e.disable.call(this,this[H],this[T]):e.enable&&e.enable.call(this,this[H],this[T])}),e.reset&&(l.prototype.formResetCallback=function(){return e.reset.call(this,this[H],this[T])}),e.restore&&(l.prototype.formStateRestoreCallback=function(){return e.restore.call(this,this[H],this[T])})),p&&(l.observedAttributes=Object.keys(p),l.prototype.attributeChangedCallback=function(a,h,v){if(!this._initialAttributes)return p[a].call(this,v);this._initialAttributes[a]=v,Ze(this,l.observedAttributes,p)}),l.prototype.connectedCallback=function(){let a=this,h=a[H],v=a[T];if(a._initialAttributes&&jt(a,l.observedAttributes,p),a._initialLoad){let F=h.querySelectorAll('link[rel="stylesheet"]');if(F.length){let z=0,D=F.length,d=function(Oe){++z>=F.length&&(delete a._initialLoad,e.load&&(ft("element()","loaded",Array.from(F).map(Pe=>Pe.href).join(`
`)),e.load.call(a,h)))},j=d;for(;D--;)F[D].addEventListener("load",d,Ct),F[D].addEventListener("error",j,Ct);e.connect&&e.connect.call(this,h,v)}else e.connect&&e.connect.call(this,h,v),e.load&&e.load.call(this,h,v)}else e.connect&&e.connect.call(this,h,v)},e.disconnect&&(l.prototype.disconnectedCallback=function(){return e.disconnect.call(this,this[H],this[T])}),ft("element()","<"+(s?s+" is="+i:i)+">"),window.customElements.define(i,l,s&&{extends:s}),s&&!Dt&&document.querySelectorAll('[is="'+i+'"]').forEach(a=>{o&&Ht(a,o),e.construct&&e.construct.apply(a);let h;for(h in p){let v=a.attributes[h];v&&p[h].call(a,v.value)}e.connect&&e.connect.apply(a)}),l}function nn(t,e){return e[t]}var G=x(nn,!0);var mt=Symbol("privates");function y(t){return t[mt]||Object.defineProperty(t,mt,{value:{}})[mt]}function I(t,e,o){return o>e?e:o<t?t:o}var Do=x(I);var on=Object.freeze;function _t(){return this}var O=on({shift:g,push:g,forEach:g,join:function(){return""},map:_t,filter:_t,includes:function(){return!1},reduce:function(t,e){return e},length:0,each:g,pipe:L,start:g,stop:g,done:g,valueOf:function(){return null}});function dt(){return this}function wt(t,e){t.remove&&t.remove(e);let o;for(;(o=t.indexOf(e))!==-1;)t.splice(o,1);return e}var Ro=x(wt,!0);function gt(t){return t&&t[Symbol.iterator]}var rn=Object.assign;function sn(t){return t.stop?t.stop():t()}function U(){}rn(U.prototype,{stop:function(){let t=this.stopables;return this.stopables=void 0,t&&t.forEach(sn),this},done:function(t){return(this.stopables||(this.stopables=[])).push(t),this}});var M=Object.assign,P=Object.create;function R(t,e){t[0]=e,e.done(t)}function zt(t,e){let o=t[e].stopables;o&&wt(o,t),t[e]=void 0}function w(t,e){t&&t.push(e)}function b(t){U.prototype.stop.apply(t);let e=-1,o;for(;o=t[++e];)t[e]=void 0,o.stop()}function u(t){this.input=t}M(u.prototype,U.prototype,{push:function(t){w(this[0],t)},pipe:function(t){if(this[0])throw new Error("Stream: Attempt to .pipe() a unicast stream multiple times. Create a multicast stream with stream.broadcast().");return this[0]=t,t.done(this),this.input.pipe(this),t},map:function(t){return new It(this,t)},filter:function(t){return new Ut(this,t)},split:function(t){return new Nt(this,t)},flatMap:function(t){return new Rt(this,t)},take:function(t){return new Wt(this,t)},each:function(t){return this.pipe(new Yt(t))},reduce:function(t,e){return this.pipe(new $t(t,e)).value},scan:function(t,e){return new Kt(this,t,e)},stop:function(){return b(this),this}});function It(t,e){this.input=t,this.fn=e}It.prototype=M(P(u.prototype),{push:function(e){let r=this.fn(e);r!==void 0&&w(this[0],r)}});function Ut(t,e){this.input=t,this.fn=e}Ut.prototype=M(P(u.prototype),{push:function(e){this.fn(e)&&w(this[0],e)}});function Rt(t,e){this.input=t,this.fn=e}Rt.prototype=M(P(u.prototype),{push:function(e){let r=this.fn(e);if(r!==void 0)if(gt(r))for(let i of r)w(this[0],i);else r.pipe&&this.done(r.each(i=>w(this[0],i)))}});function Nt(t,e){this.input=t,this.chunk=[],typeof n=="number"?this.n=e:this.fn=e}Nt.prototype=M(P(u.prototype),{fn:function(){return this.chunk.length===this.n},push:function(e){let o=this.chunk;this.fn(e)?(w(this[0],o),this.chunk=[]):o.push(e)}});function Wt(t,e){this.input=t,this.count=e}Wt.prototype=M(P(u.prototype),{push:function(e){this[0].push(e),--this.count||this.stop()}});function $t(t,e){this.fn=t,this.value=e,this.i=0}$t.prototype=M(P(u.prototype),{push:function(t){let e=this.fn;this.value=e(this.value,t,this.i++,this)}});function Kt(t,e,o){this.input=t,this.fn=e,this.value=o}Kt.prototype=M(P(u.prototype),{push:function(t){let e=this.fn;this.value=e(this.value,t),this[0].push(this.value)}});function Yt(t){this.push=t}Yt.prototype=M(P(u.prototype),{each:null,reduce:null,pipe:null});var an=Object.assign,un=Object.create;function cn(t,e){if(t[1]){let o=-1;for(;t[++o]&&t[o]!==e;);for(;t[o++];)t[o-1]=t[o]}else t.stop()}function N(t,e){u.apply(this,arguments),this.memory=!!(e&&e.memory),e&&e.hot&&this.pipe(O)}N.prototype=an(un(u.prototype),{push:function(t){if(t===void 0)return;this.memory&&(this.value=t);let e=-1;for(;this[++e];)this[e].push(t)},pipe:function(t){let e=-1;for(;this[++e];);return this.memory&&e===0&&this.input.pipe(this),this[e]=t,t.done(()=>cn(this,t)),this.value!==void 0&&t.push(this.value),!this.memory&&e===0&&this.input.pipe(this),t}});var pn=Array.prototype,ln=Object.assign,fn=Object.create;function hn(t){return t!==void 0}function W(t){this.buffer=t?t.filter?t.filter(hn):t:[]}W.prototype=ln(fn(u.prototype),{push:function(t){t!==void 0&&w(this.buffer,t)},pipe:function(t){for(t.done(this),this[0]=t;this.buffer.length;)w(this[0],pn.shift.apply(this.buffer));return this.buffer=t,t},stop:function(){return this.buffer=void 0,b(this),this}});var qt=Object.assign,mn=Object.create,dn=Promise.resolve(),wn={schedule:function(){dn.then(this.fire)},unschedule:g},gn={schedule:function(){this.timer=requestAnimationFrame(this.fire)},unschedule:function(){cancelAnimationFrame(this.timer),this.timer=void 0}},vn={schedule:function(){this.timer=setTimeout(this.fire,this.duration*1e3)},unschedule:function(){clearTimeout(this.timer),this.timer=void 0}};function C(t,e){u.apply(this,arguments),this.duration=e,this.timer=void 0,this.fire=()=>{this.timer=void 0,this.output.stop()},qt(this,e==="tick"?wn:e==="frame"?gn:vn)}C.prototype=qt(mn(u.prototype),{push:function(t){this.timer?(this.unschedule(),this.schedule(),this.output.push(t)):(this.output=u.of(t),this[0].push(this.output),this.schedule())},stop:function(){return this.timer&&this.fire(),u.prototype.stop.apply(this,arguments)}});var vt=Object.assign,yn=Object.create,Xt=Object.keys;function yt(t,e,o,r,i){this.stream=t,this.names=e,this.values=o,this.name=r,this.input=i}vt(yt.prototype,{push:function(t){let e=this.stream,o=this.values,r=this.name;o[r]=t,(e.active||(e.active=Xt(o).length===this.names.length))&&w(e[0],vt({},o))},stop:function(){--this.stream.count===0&&b(this.stream)},done:function(t){this.stream.done(t)}});function Q(t){this.inputs=t,this.active=!1}Q.prototype=vt(yn(u.prototype),{push:null,pipe:function(t){let e=this.inputs,o=Xt(e),r={};this.count=o.length,this[0]=t,t.done(this);let i;for(i in e){let s=e[i];if(s.pipe){let c=new yt(this,o,r,i,s);s.pipe(c)}else if(s.then){let c=new yt(this,o,r,i,s);s.then(p=>c.push(p)),s.finally(()=>c.stop())}else r[i]=s,--this.count}return t}});var Qt=Object.assign,bn=Object.create;function Jt(t){this.stream=t}Qt(Jt.prototype,{push:function(t){w(this.stream[0],t)},stop:function(){--this.stream.count===0&&b(this.stream)},done:function(t){this.stream.done(t)}});function J(t){this.inputs=t}J.prototype=Qt(bn(u.prototype),{push:null,pipe:function(t){let e=this.inputs;this.count=e.length,this[0]=t,t.done(this);let o=new Jt(this),r=-1,i;for(;i=e[++r];)if(i.pipe)i.pipe(o);else if(i.then)i.then(s=>o.push(s)),i.finally(()=>o.stop());else{let s=-1;for(;++s<i.length;)o.push(i[s]);o.stop()}return t}});var xn=Object.assign,En=Object.create;function Z(t){this.promise=t}Z.prototype=xn(En(u.prototype),{push:null,pipe:function(t){let e=this.promise;return this[0]=t,t.done(this),e.then(o=>w(this,o)),e.finally(()=>b(this)),t}});var Sn=Array.prototype,Zt=Object.assign;function Bn(t){throw new TypeError("Stream cannot be created from "+typeof object)}Zt(u,{of:function(){return new W(Sn.slice.apply(arguments))},from:function(t){return t.pipe?new u(t):t.then?new Z(t):typeof t.length=="number"?new W(t):Bn(t)},batch:t=>new C(O,t),burst:t=>(console.warn("Stream.burst() is now Stream.batch()"),new C(O,t)),broadcast:t=>new N(O,t),combine:t=>new Q(t),merge:function(){return new J(arguments)}});Zt(u.prototype,{log:dt,batch:function(t){return new C(this,t)},burst:function(t){return console.warn("stream.burst() is now stream.batch()"),new C(this,t)},broadcast:function(t){return new N(this,t)}});var Tn=Object.assign,Ln=/\s+/,te={fullscreenchange:"fullscreenElement"in document?"fullscreenchange":"webkitFullscreenElement"in document?"webkitfullscreenchange":"fullscreenchange"};var ee=0;window.addEventListener("click",t=>ee=t.timeStamp);function Mn(t,e){return t.node.addEventListener(te[e]||e,t,t.options),t}function kn(t,e){return t.node.removeEventListener(te[e]||e,t),t}function ne(t,e,o){this.types=t.split(Ln),this.options=e,this.node=o,this.select=e&&e.select}Tn(ne.prototype,{pipe:function(t){R(this,t),this.types.reduce(Mn,this)},handleEvent:function(t){if(!(t.type==="click"&&t.timeStamp<=ee)){if(this.select){let e=t.target.closest(this.select);if(!e)return;t.selectedTarget=e}w(this[0],t)}},stop:function(){this.types.reduce(kn,this),b(this[0])}});function tt(t,e){let o;return typeof t=="object"&&(o=t,t=o.type),new u(new ne(t,o,e))}function $(t){return typeof t}var Fn=/^\s*([+-]?\d*\.?\d+)([^\s\d]*)\s*$/;function bt(t){return function(o){if(typeof o=="number")return o;var r=Fn.exec(o);if(!r||!t[r[2]||""]){if(!t.catch)throw new Error('Cannot parse value "'+o+'" (accepted units '+Object.keys(t).join(", ")+")");return r?t.catch(parseFloat(r[1]),r[2]):t.catch(parseFloat(o))}return t[r[2]||""](parseFloat(r[1]))}}var On=/px$/,oe={"transform:translateX":function(t){var e=K("transform",t);if(!e||e==="none")return 0;var o=et(e);return parseFloat(o[4])},"transform:translateY":function(t){var e=K("transform",t);if(!e||e==="none")return 0;var o=et(e);return parseFloat(o[5])},"transform:scale":function(t){var e=K("transform",t);if(!e||e==="none")return 0;var o=et(e),r=parseFloat(o[0]),i=parseFloat(o[1]);return Math.sqrt(r*r+i*i)},"transform:rotate":function(t){var e=K("transform",t);if(!e||e==="none")return 0;var o=et(e),r=parseFloat(o[0]),i=parseFloat(o[1]);return Math.atan2(i,r)}};function et(t){return t.split("(")[1].split(")")[0].split(/\s*,\s*/)}function K(t,e){return window.getComputedStyle?window.getComputedStyle(e,null).getPropertyValue(t):0}function nt(t,e){if(oe[t])return oe[t](e);var o=K(t,e);return typeof o=="string"&&On.test(o)?parseFloat(o):o}var ot,rt;function Pn(){if(!ot){let t=document.documentElement.style.fontSize;document.documentElement.style.fontSize="100%",ot=nt("font-size",document.documentElement),document.documentElement.style.fontSize=t||""}return ot}function Vn(){return rt||(rt=nt("font-size",document.documentElement)),rt}window.addEventListener("resize",()=>{ot=void 0,rt=void 0});var An=m($,{number:L,string:bt({px:L,em:t=>Pn()*t,rem:t=>Vn()*t,vw:t=>window.innerWidth*t/100,vh:t=>window.innerHeight*t/100,vmin:t=>window.innerWidth<window.innerHeight?window.innerWidth*t/100:window.innerHeight*t/100,vmax:t=>window.innerWidth<window.innerHeight?window.innerHeight*t/100:window.innerWidth*t/100})}),it=An;var Hn=Array.prototype,Et=Object.assign,xt="webkitUserSelect"in document.body.style?"webkitUserSelect":"userSelect",st={threshold:4,ignoreTags:{textarea:!0,input:!0,select:!0}};function Cn(t,e,o){return e*e+o*o>=t*t}function re(t,e,o){if(this.stream=t,this.events=e,this.options=o,this.pointerId=e[0].pointerId,typeof o.threshold=="function")this.checkThreshold=o.threshold;else{let r=it(o.threshold);this.checkThreshold=(i,s)=>Cn(r,i,s)}document.addEventListener("pointermove",this),document.addEventListener("pointerup",this),document.addEventListener("pointercancel",this)}Et(re.prototype,{handleEvent:m(G("type"),{pointermove:function(t){if(this.pointerId!==t.pointerId){console.log("Not the same pointer");return}if(this.events.push(t),!this.isGesture){let e=this.events[0],o=t.clientX-e.clientX,r=t.clientY-e.clientY,i=(t.timeStamp-e.timeStamp)/1e3;this.checkThreshold(o,r,i)&&this.createGesture()}},default:function(t){if(this.pointerId!==t.pointerId){console.log("Not the same pointer");return}this.events.push(t),this.stop()}}),createGesture:function(){this.isGesture=!0,this.userSelectState=document.body.style[xt],document.body.style[xt]="none",this.stream.push(new u(this))},pipe:function(t){for(R(this,t);this.events.length;)w(this[0],Hn.shift.apply(this.events));this.events=t},stop:function(){if(document.removeEventListener("pointermove",this),document.removeEventListener("pointerup",this),document.removeEventListener("pointercancel",this),this.isGesture&&(document.body.style[xt]=this.userSelectState),this[0]){let t=this[0];zt(this,0),b(t)}}});function Dn(t){var e=t.target.tagName;return e&&(!!st.ignoreTags[e.toLowerCase()]||t.target.draggable)}function ie(t,e){this.node=t,this.options=e}Et(ie.prototype,{pipe:function(t){return this[0]=t,this.node.addEventListener("pointerdown",this),t},handleEvent:function(t){if(t.button===0&&!(this.options.device&&!this.options.device.includes(t.pointerType))&&!Dn(t)&&!(this.options.select&&!t.target.closest(this.options.select))){var e={type:t.type,target:t.target,currentTarget:t.currentTarget,clientX:t.clientX,clientY:t.clientY,timeStamp:t.timeStamp,pointerId:t.pointerId};new re(this[0],[e],this.options)}},stop:function(){return this[0]&&(this.node.removeEventListener("pointerdown",this),b(this[0])),this}});function St(t,e){return t=e&&t?Et({},st,t):st,e=e||t,new u(new ie(e,t))}var jn=Object.assign,Y={bubbles:!0,cancelable:!0};function Bt(t,e){var l;let o=Y,r,i,s,c,p,f;return typeof t=="object"?(l=t,{type:t,detail:i,bubbles:s,cancelable:c,composed:p}=l,r=Ft(l,["type","detail","bubbles","cancelable","composed"]),f=jn(new CustomEvent(t,{detail:i,bubbles:s||Y.bubbles,cancelable:c||Y.cancelable,composed:p||Y.composed}),r)):f=new CustomEvent(t,Y),e.dispatchEvent(f)}var Ur=x(Bt,!0);function Tt(t){return Math.pow(2,t/6)}function V(t){if(!t)return 0;let e=+t;if(e||e===0)return e;let o=/^(?:(-?[\d.]+)|(-?∞))(?:(db|bpm)|(m|k)?(\w+))$/.exec(t.toLowerCase());if(!o)return 0;let r=o[2]?o[2]==="-∞"?-1/0:1/0:parseFloat(o[1]);return o[3]==="db"?Tt(r):o[3]==="bpm"?r/60:o[4]==="m"?r/1e3:o[4]==="k"?r*1e3:r}function Gn(t,e){let o=t[t.length-1];return o&&!/^-?\d/.test(e)?o.label=e:t.push({label:e,value:V(e)}),t}var _=m($,{string:function(e){let o=e.trim();return o?o.split(/\s*,\s*|\s+/).reduce(Gn,[]):[]},object:L});function se(t,e){let o=t.length,r=1/0,i;for(;o--;){let s=Math.abs(e-t[o].normalValue);s<r&&(r=s,i=t[o])}return i}function ae(t,e){let o=t.length;for(;t[--o]&&t[o].unitValue>=e;);return t[o]||t[0]}function ue(t,e){let o=-1;for(;t[++o]&&t[o].unitValue<=e;);return t[o]||t[t.length-1]}function E(t,e){return Math.ceil(e/t)*t}var ce=m(t=>t.toLowerCase(),{db:(t,e,o)=>_("-∞dB -96dB -90dB -84dB -78dB -72dB -66dB -60dB -54dB -48dB -42dB -36dB -30dB -24dB -18dB -12dB -6dB 0dB 6dB 12dB 18dB 24dB"),default:(t,e,o)=>{let r=o-e,i=r<.8?E(.05,r/10):r<2?E(.2,r/10):r<8?E(.5,r/10):r<20?E(2,r/10):r<80?E(5,r/10):r<200?E(20,r/10):E(200,r),s=[],c=r<.8?E(.05,e):r<2?E(.2,e):r<8?E(.5,e):r<20?E(2,e):r<80?E(5,e):r<200?E(20,e):E(200,e);for(;c<=o;)s.push({label:r<2?c.toFixed(1):c,value:c}),c+=i;return s}});function pe(t,e,o,r){return t.normalValue=e.normalise(o,r,t.value),t}function le(t,e){let{scale:o,min:r,max:i,ticks:s,step:c,display:p}=e;return t.scale=o,t.min=r,t.max=i,t.ticks=(s?s.length?s:ce(p,r,i):O).filter(f=>f.value>=t.min&&f.value<=t.max).map(f=>pe(f,o,r,i)),t.step=c==="any"?void 0:c==="tick"?t.ticks:_(c).filter(f=>f.value>=t.min&&f.value<=t.max).map(f=>pe(f,o,r,i)),t.display=p,t}function fe(t,e,o,r,i){if(t.value=I(o,r,i),t.normalValue=e.normalise(o,r,t.value),t.step){let s=se(t.step,t.normalValue);t.value=s.value,t.normalValue=s.normalValue}return t}var he=.00390625;var me=.0009765625,de=.00048828125,we=.000244140625;var ge=1525878906e-14;var ui=Symbol("state");var ve=Object.assign;function Un(t,e,o){return(o-t)/(e-t)}function Rn(t,e,o){return t+o*(e-t)}var ut={};function Lt(t,e,o){let r=o/(e*t);return(r<=1?r:Math.log(r)+1)/ut[t]}function Nn(t,e,o){let r=o*ut[t];return e*t*(r<=1?r:Math.pow(Math.E,r-1))}function k(t){this.xover=t,ut[t]||(ut[t]=Math.log(1/t)+1)}ve(k.prototype,{normalise:function(t,e,o){let r=Lt(this.xover,e,t);return(Lt(this.xover,e,o)-r)/(1-r)},denormalise:function(t,e,o){let r=Lt(this.xover,e,t),i=o*(1-r)+r;return Nn(this.xover,e,i)}});function at(t){this.power=t}ve(at.prototype,{normalise:function(t,e,o){return Math.pow((o-t)/(e-t),1/this.power)},denormalise:function(t,e,o){return Math.pow(o,this.power)*(e-t)+t}});var Wn={linear:{normalise:Un,denormalise:Rn},"pow-2":new at(2),"pow-3":new at(3),"pow-4":new at(4),log:{normalise:function(t,e,o){return Math.log(o/t)/Math.log(e/t)},denormalise:function(t,e,o){return t*Math.pow(e/t,o)}},"log-24db":new k(.0625),"log-30db":new k(.03125),"log-36db":new k(.015625),"log-48db":new k(he),"log-60db":new k(me),"log-66db":new k(de),"log-72db":new k(we),"log-96db":new k(ge)};function ye(t){return Wn[t&&t.toLowerCase()||"linear"]}var $n=.9965784284662086;function Mt(t){return 20*Math.log10(t)*$n}function be(t,e){return{unit:e<1?"m"+t:e>=1e3?"k"+t:t,value:e<.001?(e*1e3).toFixed(2):e<1?(e*1e3).toPrecision(3):e>=1e3?(e/1e3).toPrecision(3):e.toPrecision(3)}}var xe=m(t=>t.toLowerCase(),{pan:(t,e)=>({unit:"",value:e===-1?"-1.00":e===0?"0.00":e===1?"1.00":e.toFixed(2)}),db:(t,e)=>{let o=Mt(e);return{unit:"dB",value:isFinite(o)?o<-1?o.toPrecision(3):o.toFixed(2):o<0?"-∞":"∞"}},hz:(t,e)=>({unit:e>=1e3?"kHz":"Hz",value:e<1?e.toFixed(2):e>=1e3?(e/1e3).toPrecision(3):e.toPrecision(3)}),semitone:(t,e)=>({unit:"",value:e===0?"0":e<0?"♭"+(-e/100).toFixed(2):"♯"+(e/100).toFixed(2)}),s:be,bpm:(t,e)=>{let o=e*60;return{unit:"bpm",value:o<100?o.toFixed(1):o.toFixed(0)}},int:(t,e)=>({unit:"",value:Math.round(e)}),"":(t,e)=>({unit:"",value:e>-1&&e<1?e.toFixed(2):e.toPrecision(3)}),default:be});var Ee=m(G("keyCode"),{38:(t,e,o,r,i,s)=>{if(t.preventDefault(),i)return ue(i,s).value;let c=t.shiftKey?10:1;return e.denormalise(o,r,(Math.round(100*s)+c)*.01)},40:(t,e,o,r,i,s)=>{if(t.preventDefault(),i)return ae(i,s).value;let c=t.shiftKey?10:1;return e.denormalise(o,r,(Math.round(100*s)-c)*.01)},default:g});var Se="linear";var Be="0 0.2 0.4 0.6 0.8 1",Te="any",Le="";function Qn(t){let e=t.target.closest('[name="value"]');return parseFloat(e.value)}var Jn=m((t,e)=>e.type,{pointerdown:(t,e)=>({scale:t.scale,min:t.min,max:t.max,e0:e,y0:e.clientY,y:t.normalValue,value:t.value,touchRange:it(getComputedStyle(e.target).getPropertyValue("--touch-range"))}),default:(t,e)=>{let{scale:o,min:r,max:i,y:s,y0:c,touchRange:p}=t,f=c-e.clientY,l=I(0,1,s+f/p),a=o.denormalise(r,i,l);return t.value=a,t}});function Zn(t,e){return t.push(B("button",{type:"button",part:"tick",name:"value",value:e.value,style:"--normal-value: "+e.normalValue+";",children:[B("span",{text:e.label,style:"transform: translate3d(-50%, 0, 0) rotate3d(0, 0, 1, calc(-1 * (var(--rotation-start) + "+e.normalValue+" * var(--rotation-range)))) translate3d(calc("+Math.sin(e.normalValue*6.28318531)+" * -33%), 0, 0);"})]})),t}function to(t,e,o,r,i,s,c){t.setProperty("--normal-value",c);let p=xe(i,s);o.textContent=p.value,r.textContent=p.unit,e.setFormValue(s)}function eo(t,e,o,r,i,s,c){t.setProperty("--normal-zero",e.normalise(o,r,0)),s.forEach(p=>p.remove()),s.length=0,s=i.reduce(Zn,s),c.after.apply(c,s)}var Me={mode:"closed",focusable:!0,construct:function(t,e){let o=B("style",":host {} :host > * { visibility: hidden; }"),r=B("label",{for:"input",part:"label",html:"<slot></slot>"}),i=B("div",{class:"handle"}),s=B("text"),c=B("abbr"),p=B("output",{children:[s,c],part:"output"}),f=B("text",""),l=[];t.append(o,r,i,p,f);let a=y(this),h={},v=o.sheet.cssRules[0].style,F=o.sheet.cssRules[1].style;a.host=this,a.shadow=t,a.hostStyle=v,a.childStyle=F,a.internals=e,a.data=h,a.shadow=new Promise(d=>a.load=d),a.scale=u.of(Se),a.min=u.of(0),a.max=u.of(1),a.step=u.of(Te),a.ticks=u.of(Be),a.display=u.of(Le),a.value=u.of(0);let z=d=>{a.value.push(d),Bt("input",this)},D=u.combine({shadow:a.shadow,scale:a.scale.map(ye),min:a.min.map(V),max:a.max.map(V),ticks:a.ticks.map(_),display:a.display,step:a.step}).scan(le,h).broadcast();D.each(d=>eo(v,d.scale,d.min,d.max,d.ticks,l,f)),u.combine({data:D,value:a.value}).scan((d,j)=>fe(d,j.data.scale,j.data.min,j.data.max,j.value),h).each(d=>to(v,e,s,c,d.display,d.value,d.normalValue)),tt({type:"pointerdown",select:'[name="value"]'},t).map(Qn).each(z),St({threshold:1,select:".handle"},t).each(d=>d.scan(Jn,h).map(G("value")).each(z)),tt("keydown",this).filter(()=>document.activeElement===this||this.contains(document.activeElement)).map(d=>Ee(d,h.scale,h.min,h.max,h.step,h.normalValue)).each(z)},load:function(t){let e=y(this);e.childStyle.visibility="",e.load(t)}};var ke={type:{value:"number",enumerable:!0},min:{attribute:function(t){this.min=t},set:function(t){y(this).min.push(t)},get:function(){return y(this).data.min},enumerable:!0},max:{attribute:function(t){this.max=t},set:function(t){y(this).max.push(t)},get:function(){return y(this).data.max},enumerable:!0},scale:{attribute:function(t){y(this).scale.push(t||"linear")}},display:{attribute:function(t){y(this).display.push(t||"")}},ticks:{attribute:function(t){y(this).ticks.push(t)}},step:{attribute:function(t){y(this).step.push(t)}},value:{attribute:function(t){this.value=t},get:function(){return y(this).data.value},set:function(t){y(this).value.push(V(t))},enumerable:!0}};var no=window.rotaryInputStylesheet||import.meta.url.replace(/\/[^\/]*([?#].*)?$/,"/")+"rotary-input-shadow.css",Ni=ht("<rotary-input>",Me,ke,no);export{Ni as default};
