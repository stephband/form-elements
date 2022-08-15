/* form-elements 
   0.0.4
   By Stephen Band
   Built 2022-08-15 17:00 */

var mt=Object.getOwnPropertySymbols;var be=Object.prototype.hasOwnProperty,ye=Object.prototype.propertyIsEnumerable;var dt=(t,e)=>{var o={};for(var r in t)be.call(t,r)&&e.indexOf(r)<0&&(o[r]=t[r]);if(t!=null&&mt)for(var r of mt(t))e.indexOf(r)<0&&ye.call(t,r)&&(o[r]=t[r]);return o};function M(t){return t}function w(t,e){return function(){let r=t.apply(this,arguments),i=e[r]||e.default;if(!i)throw new Error('overload() no handler for "'+r+'"');return i.apply(this,arguments)}}function N(t){var e=new Map;return function(r){if(e.has(r))return e.get(r);var i=t(r);return e.set(r,i),i}}var ve=Array.prototype;function xe(t,e){return typeof t=="function"?t.apply(null,e):t}function gt(t,e,o){o=o||t.length;var r=o===1?e?t:N(t):N(function(i){return gt(function(){var s=[i];return s.push.apply(s,arguments),t.apply(null,s)},e,o-1)});return function i(s){return arguments.length===0?i:arguments.length===1?r(s):arguments.length>=o?t.apply(null,arguments):xe(r(s),ve.slice.call(arguments,1))}}var v=gt;function d(){}var Ee=w(M,{is:d,tag:d,data:function(t,e,o){Object.assign(e.dataset,o)},html:function(t,e,o){e.innerHTML=o},text:function(t,e,o){e.textContent=o},children:function(t,e,o){e.innerHTML="",e.append.apply(e,o)},points:C,cx:C,cy:C,r:C,preserveAspectRatio:C,transform:C,viewBox:C,default:function(t,e,o){t in e?e[t]=o:e.setAttribute(t,o)}});function C(t,e,o){e.setAttribute(t,o)}function Be(t,e){for(var o=Object.keys(e),r=o.length;r--;)Ee(o[r],t,e[o[r]]);return t}var z=v(Be,!0);var X="http://www.w3.org/2000/svg",wt=document.createElement("div"),Y=(t,e)=>e&&typeof e;function bt(t,e){let o=document.createRange();return o.selectNode(t),o.createContextualFragment(e)}var E=w(Y,{string:function(t,e){let o=document.createElementNS(X,t);return o.innerHTML=e,o},object:function(t,e){let o=document.createElementNS(X,t);return typeof e.length=="number"?o.append.apply(o,e):z(o,e),o},default:t=>document.createElementNS(X,t)}),Se=w(Y,{string:function(t,e){let o=document.createElement(t);return o.innerHTML=e,o},object:function(t,e){let o=document.createElement(t);return typeof e.length=="number"?o.append.apply(o,e):z(o,e),o},default:t=>document.createElement(t)}),Te=w(M,{comment:function(t,e){return document.createComment(e||"")},fragment:w(Y,{string:function(t,e,o){if(o)return bt(o,e);let r=document.createDocumentFragment();wt.innerHTML=e;let i=wt.childNodes;for(;i[0];)r.appendChild(i[0]);return r},object:function(t,e,o){let r=o?bt(o):document.createDocumentFragment();return typeof e.length=="number"?r.append.apply(r,e):z(r,e),r},default:()=>document.createDocumentFragment()}),text:function(t,e){return document.createTextNode(e||"")},circle:E,ellipse:E,g:E,glyph:E,image:E,line:E,rect:E,use:E,path:E,pattern:E,polygon:E,polyline:E,svg:E,default:Se}),S=Te;function Z(t,e,o){let r;typeof o!="string"&&o.input!==void 0&&o.index!==void 0&&(r=o,o=r.input.slice(o.index+o[0].length+(o.consumed||0)));let i=t.exec(o);if(!i)return;let s=e(i);return r&&(r.consumed=(r.consumed||0)+i.index+i[0].length+(i.consumed||0)),s}var Yn=v(Z,!0);function Me(t,e,o){throw o.input!==void 0&&o.index!==void 0&&(o=o.input),new Error('Cannot parse string "'+(o.length>128?o.length.slice(0,128)+"…":o)+'"')}function ke(t,e,o){let r=-1;for(;++r<o.length;)e=o[r]!==void 0&&t[r]?t[r](e,o):e;return t.done?t.done(e,o):t.close?t.close(e,o):e}function Le(t,e,o,r){let i=Z(t,s=>ke(e,o,s),r);return i===void 0?e.catch?e.catch(o,r):Me(t,e,r):i}var yt=v(Le,!0);var tt=d;var B=Symbol("internals"),D=Symbol("shadow"),vt=Object.defineProperties,Oe={a:HTMLAnchorElement,article:HTMLElement,dl:HTMLDListElement,p:HTMLParagraphElement,br:HTMLBRElement,fieldset:HTMLFieldSetElement,hr:HTMLHRElement,img:HTMLImageElement,li:HTMLLIElement,ol:HTMLOListElement,optgroup:HTMLOptGroupElement,q:HTMLQuoteElement,section:HTMLElement,textarea:HTMLTextAreaElement,td:HTMLTableCellElement,th:HTMLTableCellElement,tr:HTMLTableRowElement,tbody:HTMLTableSectionElement,thead:HTMLTableSectionElement,tfoot:HTMLTableSectionElement,ul:HTMLUListElement},Ae={name:{set:function(t){return this.setAttribute("name",t)},get:function(){return this.getAttribute("name")||""}},form:{get:function(){return this[B].form}},labels:{get:function(){return this[B].labels}},validity:{get:function(){return this[B].validity}},validationMessage:{get:function(){return this[B].validationMessage}},willValidate:{get:function(){return this[B].willValidate}},checkValidity:{value:function(){return this[B].checkValidity()}},reportValidity:{value:function(){return this[B].reportValidity()}}},Pe={},xt={once:!0},Fe=0,Et=!1;function Ce(t){return Oe[t]||window["HTML"+t[0].toUpperCase()+t.slice(1)+"Element"]||(()=>{throw new Error('Constructor not found for tag "'+t+'"')})()}var De=yt(/^\s*<?([a-z][\w]*-[\w]+)>?\s*$|^\s*<?([a-z][\w]*)\s+is=["']?([a-z][\w]*-[\w]+)["']?>?\s*$/,{1:(t,e)=>({name:e[1]}),2:(t,e)=>({name:e[3],tag:e[2]}),catch:function(t,e){throw new SyntaxError(`dom element() – name must be of the form 'element-name' or 'tag is="element-name"' (`+e+")")}},null);function He(t,e){if(t.hasOwnProperty(e)){let o=t[e];delete t[e],t[e]=o}return t}function Ve(t,e,o){t._initialLoad=!0;let r=t.attachShadow({mode:e.mode||"closed",delegatesFocus:e.focusable||!1});if(o){let i=S("link",{rel:"stylesheet",href:o});r.append(i)}return t[D]=r,r}function je(t){var e;if(t.attachInternals){if(e=t.attachInternals(),e.setFormValue)return e}else e={shadowRoot:t.shadowRoot};return e.input=S("input",{type:"hidden",name:t.name}),t.appendChild(e.input),e.setFormValue=function(o){this.input.value=o},e}function _e(t){t._initialAttributes={},t._n=0}function Ge(t,e,o){let r=t._initialAttributes;for(;t._n<e.length&&r[e[t._n]]!==void 0;)o[e[t._n]].call(t,r[e[t._n]]),++t._n}function Bt(t,e,o){if(!t._initialAttributes)return;let r=t._initialAttributes;for(;t._n<e.length;)r[e[t._n]]!==void 0&&o[e[t._n]]&&o[e[t._n]].call(t,r[e[t._n]]),++t._n;delete t._initialAttributes,delete t._n}function Ue(t){return!!t.attribute}function Ie(t){return t.set||t.get||t.hasOwnProperty("value")}function St(t,e){return Ue(e[1])&&(t.attributes[e[0]]=e[1].attribute),Ie(e[1])&&(t.properties[e[0]]=e[1]),t}function et(t,e,o,r){let{name:i,tag:s}=De(t),c=typeof s=="string"?Ce(s):HTMLElement,{attributes:l,properties:f}=o?Object.entries(o).reduce(St,{attributes:{},properties:{}}):e.properties?Object.entries(e.properties).reduce(St,{attributes:{},properties:{}}):Pe;function m(){let u=Reflect.construct(c,arguments,m),h=e.construct&&e.construct.length>Fe?Ve(u,e,r||e.stylesheet):void 0,b=m.formAssociated&&je(u);return s&&(Et=!0),e.construct&&e.construct.call(u,h,b),l&&(_e(u),Promise.resolve(1).then(function(){Bt(u,m.observedAttributes,l)})),f&&Object.keys(f).reduce(He,u),u}return m.prototype=Object.create(c.prototype,f),f&&f.value&&(m.formAssociated=!0,vt(m.prototype,Ae),(e.enable||e.disable)&&(m.prototype.formDisabledCallback=function(u){return u?e.disable&&e.disable.call(this,this[D],this[B]):e.enable&&e.enable.call(this,this[D],this[B])}),e.reset&&(m.prototype.formResetCallback=function(){return e.reset.call(this,this[D],this[B])}),e.restore&&(m.prototype.formStateRestoreCallback=function(){return e.restore.call(this,this[D],this[B])})),l&&(m.observedAttributes=Object.keys(l),m.prototype.attributeChangedCallback=function(u,h,b){if(!this._initialAttributes)return l[u].call(this,b);this._initialAttributes[u]=b,Ge(this,m.observedAttributes,l)}),m.prototype.connectedCallback=function(){let u=this,h=u[D],b=u[B];if(u._initialAttributes&&Bt(u,m.observedAttributes,l),u._initialLoad){let p=h.querySelectorAll('link[rel="stylesheet"]');if(p.length){let O=0,j=p.length,ht=function(ge){++O>=p.length&&(delete u._initialLoad,e.load&&(tt("element()","loaded",Array.from(p).map(we=>we.href).join(`
`)),e.load.call(u,h)))},me=ht;for(;j--;)p[j].addEventListener("load",ht,xt),p[j].addEventListener("error",me,xt);e.connect&&e.connect.call(this,h,b)}else e.connect&&e.connect.call(this,h,b),e.load&&e.load.call(this,h,b)}else e.connect&&e.connect.call(this,h,b)},e.disconnect&&(m.prototype.disconnectedCallback=function(){return e.disconnect.call(this,this[D],this[B])}),tt("element()","<"+(s?s+" is="+i:i)+">"),window.customElements.define(i,m,s&&{extends:s}),s&&!Et&&document.querySelectorAll('[is="'+i+'"]').forEach(u=>{o&&vt(u,o),e.construct&&e.construct.apply(u);let h;for(h in l){let b=u.attributes[h];b&&l[h].call(u,b.value)}e.connect&&e.connect.apply(u)}),m}var nt=Symbol("privates");function y(t){return t[nt]||Object.defineProperty(t,nt,{value:{}})[nt]}function ot(t,e,o){return o>e?e:o<t?t:o}var lo=v(ot);var Re=Object.freeze;function Tt(){return this}var A=Re({shift:d,push:d,forEach:d,join:function(){return""},map:Tt,filter:Tt,includes:function(){return!1},reduce:function(t,e){return e},length:0,each:d,pipe:M,start:d,stop:d,done:d,valueOf:function(){return null}});function rt(){return this}function Mt(t,e){t.remove&&t.remove(e);let o;for(;(o=t.indexOf(e))!==-1;)t.splice(o,1);return e}var yo=v(Mt,!0);function it(t){return t&&t[Symbol.iterator]}var Ne=Object.assign;function ze(t){return t.stop?t.stop():t()}function _(){}Ne(_.prototype,{stop:function(){let t=this.stopables;return this.stopables=void 0,t&&t.forEach(ze),this},done:function(t){return(this.stopables||(this.stopables=[])).push(t),this}});var k=Object.assign,P=Object.create;function st(t,e){t[0]=e,e.done(t)}function g(t,e){t&&t.push(e)}function T(t){_.prototype.stop.apply(t);let e=-1,o;for(;o=t[++e];)t[e]=void 0,o.stop()}function a(t){this.input=t}k(a.prototype,_.prototype,{push:function(t){g(this[0],t)},pipe:function(t){if(this[0])throw new Error("Stream: Attempt to .pipe() a unicast stream multiple times. Create a multicast stream with stream.broadcast().");return this[0]=t,t.done(this),this.input.pipe(this),t},map:function(t){return new kt(this,t)},filter:function(t){return new Lt(this,t)},split:function(t){return new At(this,t)},flatMap:function(t){return new Ot(this,t)},take:function(t){return new Pt(this,t)},each:function(t){return this.pipe(new Dt(t))},reduce:function(t,e){return this.pipe(new Ft(t,e)).value},scan:function(t,e){return new Ct(this,t,e)},stop:function(){return T(this),this}});function kt(t,e){this.input=t,this.fn=e}kt.prototype=k(P(a.prototype),{push:function(e){let r=this.fn(e);r!==void 0&&g(this[0],r)}});function Lt(t,e){this.input=t,this.fn=e}Lt.prototype=k(P(a.prototype),{push:function(e){this.fn(e)&&g(this[0],e)}});function Ot(t,e){this.input=t,this.fn=e}Ot.prototype=k(P(a.prototype),{push:function(e){let r=this.fn(e);if(r!==void 0)if(it(r))for(let i of r)g(this[0],i);else r.pipe&&this.done(r.each(i=>g(this[0],i)))}});function At(t,e){this.input=t,this.chunk=[],typeof n=="number"?this.n=e:this.fn=e}At.prototype=k(P(a.prototype),{fn:function(){return this.chunk.length===this.n},push:function(e){let o=this.chunk;this.fn(e)?(g(this[0],o),this.chunk=[]):o.push(e)}});function Pt(t,e){this.input=t,this.count=e}Pt.prototype=k(P(a.prototype),{push:function(e){this[0].push(e),--this.count||this.stop()}});function Ft(t,e){this.fn=t,this.value=e,this.i=0}Ft.prototype=k(P(a.prototype),{push:function(t){let e=this.fn;this.value=e(this.value,t,this.i++,this)}});function Ct(t,e,o){this.input=t,this.fn=e,this.value=o}Ct.prototype=k(P(a.prototype),{push:function(t){let e=this.fn;this.value=e(this.value,t),this[0].push(this.value)}});function Dt(t){this.push=t}Dt.prototype=k(P(a.prototype),{each:null,reduce:null,pipe:null});var $e=Object.assign,Ke=Object.create;function qe(t,e){if(t[1]){let o=-1;for(;t[++o]&&t[o]!==e;);for(;t[o++];)t[o-1]=t[o]}else t.stop()}function G(t,e){a.apply(this,arguments),this.memory=!!(e&&e.memory),e&&e.hot&&this.pipe(A)}G.prototype=$e(Ke(a.prototype),{push:function(t){if(t===void 0)return;this.memory&&(this.value=t);let e=-1;for(;this[++e];)this[e].push(t)},pipe:function(t){let e=-1;for(;this[++e];);return this.memory&&e===0&&this.input.pipe(this),this[e]=t,t.done(()=>qe(this,t)),this.value!==void 0&&t.push(this.value),!this.memory&&e===0&&this.input.pipe(this),t}});var Qe=Array.prototype,Je=Object.assign,We=Object.create;function Xe(t){return t!==void 0}function U(t){this.buffer=t?t.filter?t.filter(Xe):t:[]}U.prototype=Je(We(a.prototype),{push:function(t){t!==void 0&&g(this.buffer,t)},pipe:function(t){for(t.done(this),this[0]=t;this.buffer.length;)g(this[0],Qe.shift.apply(this.buffer));return this.buffer=t,t},stop:function(){return this.buffer=void 0,T(this),this}});var Ht=Object.assign,Ye=Object.create,Ze=Promise.resolve(),tn={schedule:function(){Ze.then(this.fire)},unschedule:d},en={schedule:function(){this.timer=requestAnimationFrame(this.fire)},unschedule:function(){cancelAnimationFrame(this.timer),this.timer=void 0}},nn={schedule:function(){this.timer=setTimeout(this.fire,this.duration*1e3)},unschedule:function(){clearTimeout(this.timer),this.timer=void 0}};function H(t,e){a.apply(this,arguments),this.duration=e,this.timer=void 0,this.fire=()=>{this.timer=void 0,this.output.stop()},Ht(this,e==="tick"?tn:e==="frame"?en:nn)}H.prototype=Ht(Ye(a.prototype),{push:function(t){this.timer?(this.unschedule(),this.schedule(),this.output.push(t)):(this.output=a.of(t),this[0].push(this.output),this.schedule())},stop:function(){return this.timer&&this.fire(),a.prototype.stop.apply(this,arguments)}});var ut=Object.assign,on=Object.create,Vt=Object.keys;function at(t,e,o,r,i){this.stream=t,this.names=e,this.values=o,this.name=r,this.input=i}ut(at.prototype,{push:function(t){let e=this.stream,o=this.values,r=this.name;o[r]=t,(e.active||(e.active=Vt(o).length===this.names.length))&&g(e[0],ut({},o))},stop:function(){--this.stream.count===0&&T(this.stream)},done:function(t){this.stream.done(t)}});function $(t){this.inputs=t,this.active=!1}$.prototype=ut(on(a.prototype),{push:null,pipe:function(t){let e=this.inputs,o=Vt(e),r={};this.count=o.length,this[0]=t,t.done(this);let i;for(i in e){let s=e[i];if(s.pipe){let c=new at(this,o,r,i,s);s.pipe(c)}else if(s.then){let c=new at(this,o,r,i,s);s.then(l=>c.push(l)),s.finally(()=>c.stop())}else r[i]=s,--this.count}return t}});var jt=Object.assign,rn=Object.create;function _t(t){this.stream=t}jt(_t.prototype,{push:function(t){g(this.stream[0],t)},stop:function(){--this.stream.count===0&&T(this.stream)},done:function(t){this.stream.done(t)}});function K(t){this.inputs=t}K.prototype=jt(rn(a.prototype),{push:null,pipe:function(t){let e=this.inputs;this.count=e.length,this[0]=t,t.done(this);let o=new _t(this),r=-1,i;for(;i=e[++r];)if(i.pipe)i.pipe(o);else if(i.then)i.then(s=>o.push(s)),i.finally(()=>o.stop());else{let s=-1;for(;++s<i.length;)o.push(i[s]);o.stop()}return t}});var sn=Object.assign,un=Object.create;function q(t){this.promise=t}q.prototype=sn(un(a.prototype),{push:null,pipe:function(t){let e=this.promise;return this[0]=t,t.done(this),e.then(o=>g(this,o)),e.finally(()=>T(this)),t}});var an=Array.prototype,Gt=Object.assign;function cn(t){throw new TypeError("Stream cannot be created from "+typeof object)}Gt(a,{of:function(){return new U(an.slice.apply(arguments))},from:function(t){return t.pipe?new a(t):t.then?new q(t):typeof t.length=="number"?new U(t):cn(t)},batch:t=>new H(A,t),burst:t=>(console.warn("Stream.burst() is now Stream.batch()"),new H(A,t)),broadcast:t=>new G(A,t),combine:t=>new $(t),merge:function(){return new K(arguments)}});Gt(a.prototype,{log:rt,batch:function(t){return new H(this,t)},burst:function(t){return console.warn("stream.burst() is now stream.batch()"),new H(this,t)},broadcast:function(t){return new G(this,t)}});var pn=Object.assign,ln=/\s+/,Ut={fullscreenchange:"fullscreenElement"in document?"fullscreenchange":"webkitFullscreenElement"in document?"webkitfullscreenchange":"fullscreenchange"};var It=0;window.addEventListener("click",t=>It=t.timeStamp);function fn(t,e){return t.node.addEventListener(Ut[e]||e,t,t.options),t}function hn(t,e){return t.node.removeEventListener(Ut[e]||e,t),t}function Rt(t,e,o){this.types=t.split(ln),this.options=e,this.node=o,this.select=e&&e.select}pn(Rt.prototype,{pipe:function(t){st(this,t),this.types.reduce(fn,this)},handleEvent:function(t){if(!(t.type==="click"&&t.timeStamp<=It)){if(this.select){let e=t.target.closest(this.select);if(!e)return;t.selectedTarget=e}g(this[0],t)}},stop:function(){this.types.reduce(hn,this),T(this[0])}});function I(t,e){let o;return typeof t=="object"&&(o=t,t=o.type),new a(new Rt(t,o,e))}var mn=Object.assign,R={bubbles:!0,cancelable:!0};function Q(t,e){var m;let o=R,r,i,s,c,l,f;return typeof t=="object"?(m=t,{type:t,detail:i,bubbles:s,cancelable:c,composed:l}=m,r=dt(m,["type","detail","bubbles","cancelable","composed"]),f=mn(new CustomEvent(t,{detail:i,bubbles:s||R.bubbles,cancelable:c||R.cancelable,composed:l||R.composed}),r)):f=new CustomEvent(t,R),e.dispatchEvent(f)}var nr=v(Q,!0);function ct(t){return Math.pow(2,t/6)}function F(t){if(!t)return 0;let e=+t;if(e||e===0)return e;let o=/^(?:(-?[\d.]+)|(-?∞))(?:(db|bpm)|(m|k)?(\w+))$/.exec(t.toLowerCase());if(!o)return 0;let r=o[2]?o[2]==="-∞"?-1/0:1/0:parseFloat(o[1]);return o[3]==="db"?ct(r):o[3]==="bpm"?r/60:o[4]==="m"?r/1e3:o[4]==="k"?r*1e3:r}function pt(t){return typeof t}function dn(t,e){let o=t[t.length-1];return o&&!/^-?\d/.test(e)?o.label=e:t.push({label:e,value:F(e)}),t}var V=w(pt,{string:function(e){let o=e.trim();return o?o.split(/\s*,\s*|\s+/).reduce(dn,[]):[]},object:M});function Nt(t,e){let o=t.length,r=1/0,i;for(;o--;){let s=Math.abs(e-t[o].normalValue);s<r&&(r=s,i=t[o])}return i}function zt(t,e){let o=t.length;for(;t[--o]&&t[o].unitValue>=e;);return t[o]||t[0]}function $t(t,e){let o=-1;for(;t[++o]&&t[o].unitValue<=e;);return t[o]||t[t.length-1]}function x(t,e){return Math.ceil(e/t)*t}var Kt=w(t=>t.toLowerCase(),{db:(t,e,o)=>V("-∞dB -96dB -90dB -84dB -78dB -72dB -66dB -60dB -54dB -48dB -42dB -36dB -30dB -24dB -18dB -12dB -6dB 0dB 6dB 12dB 18dB 24dB"),default:(t,e,o)=>{let r=o-e,i=r<.8?x(.05,r/10):r<2?x(.2,r/10):r<8?x(.5,r/10):r<20?x(2,r/10):r<80?x(5,r/10):r<200?x(20,r/10):x(200,r),s=[],c=r<.8?x(.05,e):r<2?x(.2,e):r<8?x(.5,e):r<20?x(2,e):r<80?x(5,e):r<200?x(20,e):x(200,e);for(;c<=o;)s.push({label:r<2?c.toFixed(1):c,value:c}),c+=i;return s}});function qt(t,e,o,r){return t.normalValue=e.normalise(o,r,t.value),t}function Qt(t,e){let{scale:o,min:r,max:i,ticks:s,step:c,display:l}=e;return t.scale=o,t.min=r,t.max=i,t.ticks=(s?s.length?s:Kt(l,r,i):A).filter(f=>f.value>=t.min&&f.value<=t.max).map(f=>qt(f,o,r,i)),t.step=c==="any"?void 0:c==="tick"?t.ticks:V(c).filter(f=>f.value>=t.min&&f.value<=t.max).map(f=>qt(f,o,r,i)),t.display=l,t}function Jt(t,e,o,r,i){if(t.value=ot(o,r,i),t.normalValue=e.normalise(o,r,t.value),t.step){let s=Nt(t.step,t.normalValue);t.value=s.value,t.normalValue=s.normalValue}return t}var Wt=.00390625;var Xt=.0009765625,Yt=.00048828125,Zt=.000244140625;var te=1525878906e-14;var Br=Symbol("state");var ee=Object.assign;function yn(t,e,o){return(o-t)/(e-t)}function vn(t,e,o){return t+o*(e-t)}var W={};function lt(t,e,o){let r=o/(e*t);return(r<=1?r:Math.log(r)+1)/W[t]}function xn(t,e,o){let r=o*W[t];return e*t*(r<=1?r:Math.pow(Math.E,r-1))}function L(t){this.xover=t,W[t]||(W[t]=Math.log(1/t)+1)}ee(L.prototype,{normalise:function(t,e,o){let r=lt(this.xover,e,t);return(lt(this.xover,e,o)-r)/(1-r)},denormalise:function(t,e,o){let r=lt(this.xover,e,t),i=o*(1-r)+r;return xn(this.xover,e,i)}});function J(t){this.power=t}ee(J.prototype,{normalise:function(t,e,o){return Math.pow((o-t)/(e-t),1/this.power)},denormalise:function(t,e,o){return Math.pow(o,this.power)*(e-t)+t}});var En={linear:{normalise:yn,denormalise:vn},"pow-2":new J(2),"pow-3":new J(3),"pow-4":new J(4),log:{normalise:function(t,e,o){return Math.log(o/t)/Math.log(e/t)},denormalise:function(t,e,o){return t*Math.pow(e/t,o)}},"log-24db":new L(.0625),"log-30db":new L(.03125),"log-36db":new L(.015625),"log-48db":new L(Wt),"log-60db":new L(Xt),"log-66db":new L(Yt),"log-72db":new L(Zt),"log-96db":new L(te)};function ne(t){return En[t&&t.toLowerCase()||"linear"]}var Bn=.9965784284662086;function ft(t){return 20*Math.log10(t)*Bn}function oe(t,e){return{unit:e<1?"m"+t:e>=1e3?"k"+t:t,value:e<.001?(e*1e3).toFixed(2):e<1?(e*1e3).toPrecision(3):e>=1e3?(e/1e3).toPrecision(3):e.toPrecision(3)}}var re=w(t=>t.toLowerCase(),{pan:(t,e)=>({unit:"",value:e===-1?"-1.00":e===0?"0.00":e===1?"1.00":e.toFixed(2)}),db:(t,e)=>{let o=ft(e);return{unit:"dB",value:isFinite(o)?o<-1?o.toPrecision(3):o.toFixed(2):o<0?"-∞":"∞"}},hz:(t,e)=>({unit:e>=1e3?"kHz":"Hz",value:e<1?e.toFixed(2):e>=1e3?(e/1e3).toPrecision(3):e.toPrecision(3)}),semitone:(t,e)=>({unit:"",value:e===0?"0":e<0?"♭"+(-e/100).toFixed(2):"♯"+(e/100).toFixed(2)}),s:oe,bpm:(t,e)=>{let o=e*60;return{unit:"bpm",value:o<100?o.toFixed(1):o.toFixed(0)}},int:(t,e)=>({unit:"",value:Math.round(e)}),"":(t,e)=>({unit:"",value:e>-1&&e<1?e.toFixed(2):e.toPrecision(3)}),default:oe});function Sn(t,e){return e[t]}var ie=v(Sn,!0);var se=w(ie("keyCode"),{38:(t,e,o,r,i,s)=>{if(t.preventDefault(),i)return $t(i,s).value;let c=t.shiftKey?10:1;return e.denormalise(o,r,(Math.round(100*s)+c)*.01)},40:(t,e,o,r,i,s)=>{if(t.preventDefault(),i)return zt(i,s).value;let c=t.shiftKey?10:1;return e.denormalise(o,r,(Math.round(100*s)-c)*.01)},default:d});var ue="linear";var ae="0 0.2 0.4 0.6 0.8 1",ce="any",pe="";var Zr=import.meta.url.replace(/\/[^\/]*([?#].*)?$/,"/");function On(t){let e=t.target.closest('[name="value"]');return parseFloat(e.value)}function An(t,e){return t.push(S("button",{type:"button",part:"tick",name:"value",value:e.value,style:"--normal-value: "+e.normalValue+";",text:e.label})),t}function Pn(t,e,o,r,i,s,c){t.setProperty("--normal-zero",e.normalise(o,r,0)),s.forEach(l=>l.remove()),s.length=0,s=i.reduce(An,s),c.after.apply(c,s)}function Fn(t,e,o,r,i,s,c,l){t.setProperty("--normal-value",l),e.value=l;let f=re(s,c);r.textContent=f.value,i.textContent=f.unit,o.setFormValue(c)}function le(t){return t.sheet.cssRules[0].style}function Cn(t){return t.sheet.cssRules[1].style}var fe={mode:"closed",focusable:!0,construct:function(t,e){let o=S("style",":host {} :host > * { visibility: hidden; }"),r=S("label",{for:"input",html:"<slot></slot>",part:"label"}),i=S("input",{type:"range",id:"input",name:"unit-value",min:"0",max:"1",step:"any"}),s=S("text"),c=S("abbr"),l=S("output",{children:[s,c],part:"output"}),f=S("text",""),m=[];t.append(o,r,i,l,f);let u=y(this),h={};u.host=this,u.shadow=t,u.style=o,u.internals=e,u.data=h,u.shadow=new Promise(p=>u.load=p),u.scale=a.of(ue),u.min=a.of(0),u.max=a.of(1),u.step=a.of(ce),u.ticks=a.of(ae),u.display=a.of(pe),u.value=a.of(0);let b=a.combine({shadow:u.shadow,scale:u.scale.map(ne),min:u.min.map(F),max:u.max.map(F),ticks:u.ticks.map(V),display:u.display,step:u.step}).scan(Qt,h).broadcast();b.each(p=>Pn(le(o),p.scale,p.min,p.max,p.ticks,m,f)),a.combine({data:b,value:u.value}).scan((p,O)=>Jt(p,O.data.scale,O.data.min,O.data.max,O.value),h).each(p=>Fn(le(o),i,e,s,c,p.display,p.value,p.normalValue)),I({type:"pointerdown",select:'[name="value"]'},t).map(On).each(p=>{u.value.push(p),Q("input",this)}),I("input",t).each(p=>{let O=parseFloat(p.target.value),j=h.scale.denormalise(h.min,h.max,O);u.value.push(j)}),I("keydown",this).filter(()=>document.activeElement===this||this.contains(document.activeElement)).map(p=>se(p,h.scale,h.min,h.max,h.step,h.normalValue)).each(p=>{u.value.push(p),Q("input",this)})},load:function(t){let e=y(this);Cn(e.style).visibility="",e.load(t)}};var he={type:{value:"number",enumerable:!0},min:{attribute:function(t){this.min=t},set:function(t){y(this).min.push(t)},get:function(){return y(this).data.min},enumerable:!0},max:{attribute:function(t){this.max=t},set:function(t){y(this).max.push(t)},get:function(){return y(this).data.max},enumerable:!0},scale:{attribute:function(t){y(this).scale.push(t||"linear")}},display:{attribute:function(t){y(this).display.push(t||"")}},ticks:{attribute:function(t){y(this).ticks.push(t)}},step:{attribute:function(t){y(this).step.push(t)}},value:{attribute:function(t){this.value=t},get:function(){return y(this).data.value},set:function(t){y(this).value.push(F(t))},enumerable:!0}};var Dn=window.rangeInputStylesheet||import.meta.url.replace(/\/[^\/]*([?#].*)?$/,"/")+"range-input-shadow.css",ui=et("<range-input>",fe,he,Dn);export{ui as default};
