/* form-elements 
   0.0.4
   By Stephen Band
   Built 2022-06-12 22:57 */

var ht=Object.getOwnPropertySymbols;var de=Object.prototype.hasOwnProperty,ge=Object.prototype.propertyIsEnumerable;var mt=(t,e)=>{var o={};for(var r in t)de.call(t,r)&&e.indexOf(r)<0&&(o[r]=t[r]);if(t!=null&&ht)for(var r of ht(t))e.indexOf(r)<0&&ge.call(t,r)&&(o[r]=t[r]);return o};function F(t){return t}function v(t,e){return function(){let r=t.apply(this,arguments),i=e[r]||e.default;if(!i)throw new Error('overload() no handler for "'+r+'"');return i.apply(this,arguments)}}function N(t){var e=new Map;return function(r){if(e.has(r))return e.get(r);var i=t(r);return e.set(r,i),i}}var we=Array.prototype;function be(t,e){return typeof t=="function"?t.apply(null,e):t}function dt(t,e,o){o=o||t.length;var r=o===1?e?t:N(t):N(function(i){return dt(function(){var s=[i];return s.push.apply(s,arguments),t.apply(null,s)},e,o-1)});return function i(s){return arguments.length===0?i:arguments.length===1?r(s):arguments.length>=o?t.apply(null,arguments):be(r(s),we.slice.call(arguments,1))}}var x=dt;function m(){}var ye=v(F,{is:m,tag:m,html:function(t,e,o){e.innerHTML=o},text:function(t,e,o){e.textContent=o},children:function(t,e,o){e.innerHTML="",e.append.apply(e,o)},points:j,cx:j,cy:j,r:j,preserveAspectRatio:j,viewBox:j,default:function(t,e,o){t in e?e[t]=o:e.setAttribute(t,o)}});function j(t,e,o){e.setAttribute(t,o)}function ve(t,e){for(var o=Object.keys(e),r=o.length;r--;)ye(o[r],t,e[o[r]]);return t}var z=x(ve,!0);var X="http://www.w3.org/2000/svg",gt=document.createElement("div"),Y=(t,e)=>e&&typeof e;function wt(t,e){let o=document.createRange();return o.selectNode(t),o.createContextualFragment(e)}var E=v(Y,{string:function(t,e){let o=document.createElementNS(X,t);return o.innerHTML=e,o},object:function(t,e){let o=document.createElementNS(X,t);return typeof e.length=="number"?o.append.apply(o,e):z(o,e),o},default:t=>document.createElementNS(X,t)}),xe=v(Y,{string:function(t,e){let o=document.createElement(t);return o.innerHTML=e,o},object:function(t,e){let o=document.createElement(t);return typeof e.length=="number"?o.append.apply(o,e):z(o,e),o},default:t=>document.createElement(t)}),Ee=v(F,{comment:function(t,e){return document.createComment(e||"")},fragment:v(Y,{string:function(t,e,o){if(o)return wt(o,e);let r=document.createDocumentFragment();gt.innerHTML=e;let i=gt.childNodes;for(;i[0];)r.appendChild(i[0]);return r},object:function(t,e,o){let r=o?wt(o):document.createDocumentFragment();return typeof e.length=="number"?r.append.apply(r,e):z(r,e),r},default:()=>document.createDocumentFragment()}),text:function(t,e){return document.createTextNode(e||"")},circle:E,ellipse:E,g:E,glyph:E,image:E,line:E,rect:E,use:E,path:E,pattern:E,polygon:E,polyline:E,svg:E,default:xe}),B=Ee;function Z(t,e,o){let r;typeof o!="string"&&o.input!==void 0&&o.index!==void 0&&(r=o,o=r.input.slice(o.index+o[0].length+(o.consumed||0)));let i=t.exec(o);if(!i)return;let s=e(i);return r&&(r.consumed=(r.consumed||0)+i.index+i[0].length+(i.consumed||0)),s}var Qn=x(Z,!0);function Se(t,e,o){throw o.input!==void 0&&o.index!==void 0&&(o=o.input),new Error('Cannot parse string "'+(o.length>128?o.length.slice(0,128)+"…":o)+'"')}function Be(t,e,o){let r=-1;for(;++r<o.length;)e=o[r]!==void 0&&t[r]?t[r](e,o):e;return t.done?t.done(e,o):t.close?t.close(e,o):e}function Te(t,e,o,r){let i=Z(t,s=>Be(e,o,s),r);return i===void 0?e.catch?e.catch(o,r):Se(t,e,r):i}var bt=x(Te,!0);var tt=m;var S=Symbol("internals"),C=Symbol("shadow"),yt=Object.defineProperties,Me={a:HTMLAnchorElement,dl:HTMLDListElement,p:HTMLParagraphElement,br:HTMLBRElement,fieldset:HTMLFieldSetElement,hr:HTMLHRElement,img:HTMLImageElement,li:HTMLLIElement,ol:HTMLOListElement,optgroup:HTMLOptGroupElement,q:HTMLQuoteElement,textarea:HTMLTextAreaElement,td:HTMLTableCellElement,th:HTMLTableCellElement,tr:HTMLTableRowElement,tbody:HTMLTableSectionElement,thead:HTMLTableSectionElement,tfoot:HTMLTableSectionElement,ul:HTMLUListElement},ke={name:{set:function(t){return this.setAttribute("name",t)},get:function(){return this.getAttribute("name")||""}},form:{get:function(){return this[S].form}},labels:{get:function(){return this[S].labels}},validity:{get:function(){return this[S].validity}},validationMessage:{get:function(){return this[S].validationMessage}},willValidate:{get:function(){return this[S].willValidate}},checkValidity:{value:function(){return this[S].checkValidity()}},reportValidity:{value:function(){return this[S].reportValidity()}}},Le={},vt={once:!0},Oe=0,xt=!1;function Ae(t){return Me[t]||window["HTML"+t[0].toUpperCase()+t.slice(1)+"Element"]||(()=>{throw new Error('Constructor not found for tag "'+t+'"')})()}var Pe=bt(/^\s*<?([a-z][\w]*-[\w]+)>?\s*$|^\s*<?([a-z][\w]*)\s+is=["']?([a-z][\w]*-[\w]+)["']?>?\s*$/,{1:(t,e)=>({name:e[1]}),2:(t,e)=>({name:e[3],tag:e[2]}),catch:function(t,e){throw new SyntaxError(`dom element() – name must be of the form 'element-name' or 'tag is="element-name"' (`+e+")")}},null);function Fe(t,e){if(t.hasOwnProperty(e)){let o=t[e];delete t[e],t[e]=o}return t}function Ce(t,e,o){t._initialLoad=!0;let r=t.attachShadow({mode:e.mode||"closed",delegatesFocus:e.focusable||!1});if(o){let i=B("link",{rel:"stylesheet",href:o});r.append(i)}return t[C]=r,r}function De(t){var e;if(t.attachInternals){if(e=t.attachInternals(),e.setFormValue)return e}else e={shadowRoot:t.shadowRoot};return e.input=B("input",{type:"hidden",name:t.name}),t.appendChild(e.input),e.setFormValue=function(o){this.input.value=o},e}function Ve(t){t._initialAttributes={},t._n=0}function je(t,e,o){let r=t._initialAttributes;for(;t._n<e.length&&r[e[t._n]]!==void 0;)o[e[t._n]].call(t,r[e[t._n]]),++t._n}function Et(t,e,o){if(!t._initialAttributes)return;let r=t._initialAttributes;for(;t._n<e.length;)r[e[t._n]]!==void 0&&o[e[t._n]]&&o[e[t._n]].call(t,r[e[t._n]]),++t._n;delete t._initialAttributes,delete t._n}function He(t){return!!t.attribute}function _e(t){return t.set||t.get||t.hasOwnProperty("value")}function St(t,e){return He(e[1])&&(t.attributes[e[0]]=e[1].attribute),_e(e[1])&&(t.properties[e[0]]=e[1]),t}function et(t,e,o,r){let{name:i,tag:s}=Pe(t),p=typeof s=="string"?Ae(s):HTMLElement,{attributes:c,properties:b}=o?Object.entries(o).reduce(St,{attributes:{},properties:{}}):e.properties?Object.entries(e.properties).reduce(St,{attributes:{},properties:{}}):Le;function h(){let u=Reflect.construct(p,arguments,h),f=e.construct&&e.construct.length>Oe?Ce(u,e,r||e.stylesheet):void 0,g=h.formAssociated&&De(u);return s&&(xt=!0),e.construct&&e.construct.call(u,f,g),c&&(Ve(u),Promise.resolve(1).then(function(){Et(u,h.observedAttributes,c)})),b&&Object.keys(b).reduce(Fe,u),u}return h.prototype=Object.create(p.prototype,b),b&&b.value&&(h.formAssociated=!0,yt(h.prototype,ke),(e.enable||e.disable)&&(h.prototype.formDisabledCallback=function(u){return u?e.disable&&e.disable.call(this,this[C],this[S]):e.enable&&e.enable.call(this,this[C],this[S])}),e.reset&&(h.prototype.formResetCallback=function(){return e.reset.call(this,this[C],this[S])}),e.restore&&(h.prototype.formStateRestoreCallback=function(){return e.restore.call(this,this[C],this[S])})),c&&(h.observedAttributes=Object.keys(c),h.prototype.attributeChangedCallback=function(u,f,g){if(!this._initialAttributes)return c[u].call(this,g);this._initialAttributes[u]=g,je(this,h.observedAttributes,c)}),h.prototype.connectedCallback=function(){let u=this,f=u[C],g=u[S];if(u._initialAttributes&&Et(u,h.observedAttributes,c),u._initialLoad){let L=f.querySelectorAll('link[rel="stylesheet"]');if(L.length){let R=0,l=L.length,w=function(he){++R>=L.length&&(delete u._initialLoad,e.load&&(tt("element()","loaded",Array.from(L).map(me=>me.href).join(`
`)),e.load.call(u,f)))},W=w;for(;l--;)L[l].addEventListener("load",w,vt),L[l].addEventListener("error",W,vt);e.connect&&e.connect.call(this,f,g)}else e.connect&&e.connect.call(this,f,g),e.load&&e.load.call(this,f,g)}else e.connect&&e.connect.call(this,f,g)},e.disconnect&&(h.prototype.disconnectedCallback=function(){return e.disconnect.call(this,this[C],this[S])}),tt("element()","<"+(s?s+" is="+i:i)+">"),window.customElements.define(i,h,s&&{extends:s}),s&&!xt&&document.querySelectorAll('[is="'+i+'"]').forEach(u=>{o&&yt(u,o),e.construct&&e.construct.apply(u);let f;for(f in c){let g=u.attributes[f];g&&c[f].call(u,g.value)}e.connect&&e.connect.apply(u)}),h}var nt=Symbol("privates");function y(t){return t[nt]||Object.defineProperty(t,nt,{value:{}})[nt]}function ot(t,e,o){return o>e?e:o<t?t:o}var uo=x(ot);var Ge=Object.freeze;function Bt(){return this}var O=Ge({shift:m,push:m,forEach:m,join:function(){return""},map:Bt,filter:Bt,includes:function(){return!1},reduce:function(t,e){return e},length:0,each:m,pipe:F,start:m,stop:m,done:m,valueOf:function(){return null}});function rt(){return this}function Tt(t,e){t.remove&&t.remove(e);let o;for(;(o=t.indexOf(e))!==-1;)t.splice(o,1);return e}var mo=x(Tt,!0);function it(t){return t&&t[Symbol.iterator]}var Ue=Object.assign;function Ie(t){return t.stop?t.stop():t()}function H(){}Ue(H.prototype,{stop:function(){let t=this.stopables;return this.stopables=void 0,t&&t.forEach(Ie),this},done:function(t){return(this.stopables||(this.stopables=[])).push(t),this}});var M=Object.assign,A=Object.create;function st(t,e){t[0]=e,e.done(t)}function d(t,e){t&&t.push(e)}function T(t){H.prototype.stop.apply(t);let e=-1,o;for(;o=t[++e];)t[e]=void 0,o.stop()}function a(t){this.input=t}M(a.prototype,H.prototype,{push:function(t){d(this[0],t)},pipe:function(t){if(this[0])throw new Error("Stream: Attempt to .pipe() a unicast stream multiple times. Create a multicast stream with stream.broadcast().");return this[0]=t,t.done(this),this.input.pipe(this),t},map:function(t){return new Mt(this,t)},filter:function(t){return new kt(this,t)},split:function(t){return new Ot(this,t)},flatMap:function(t){return new Lt(this,t)},take:function(t){return new At(this,t)},each:function(t){return this.pipe(new Ct(t))},reduce:function(t,e){return this.pipe(new Pt(t,e)).value},scan:function(t,e){return new Ft(this,t,e)},stop:function(){return T(this),this}});function Mt(t,e){this.input=t,this.fn=e}Mt.prototype=M(A(a.prototype),{push:function(e){let r=this.fn(e);r!==void 0&&d(this[0],r)}});function kt(t,e){this.input=t,this.fn=e}kt.prototype=M(A(a.prototype),{push:function(e){this.fn(e)&&d(this[0],e)}});function Lt(t,e){this.input=t,this.fn=e}Lt.prototype=M(A(a.prototype),{push:function(e){let r=this.fn(e);if(r!==void 0)if(it(r))for(let i of r)d(this[0],i);else throw new Error("Stream: Cannot .flatMap() non-iterable values")}});function Ot(t,e){this.input=t,this.chunk=[],typeof n=="number"?this.n=e:this.fn=e}Ot.prototype=M(A(a.prototype),{fn:function(){return this.chunk.length===this.n},push:function(e){let o=this.chunk;this.fn(e)?(d(this[0],o),this.chunk=[]):o.push(e)}});function At(t,e){this.input=t,this.count=e}At.prototype=M(A(a.prototype),{push:function(e){this[0].push(e),--this.count||this.stop()}});var Re=0;function Pt(t,e){this.fn=t,this.value=e,this.i=0,this.n=++Re}Pt.prototype=M(A(a.prototype),{push:function(t){let e=this.fn;this.value=e(this.value,t,this.i++,this)}});function Ft(t,e,o){this.input=t,this.fn=e,this.value=o}Ft.prototype=M(A(a.prototype),{push:function(t){let e=this.fn;this.value=e(this.value,t),this[0].push(this.value)}});function Ct(t){this.push=t}Ct.prototype=M(A(a.prototype),{each:null,reduce:null,pipe:null});var Ne=Object.assign,ze=Object.create;function $e(t,e){if(t[1]){let o=-1;for(;t[++o]&&t[o]!==e;);for(;t[o++];)t[o-1]=t[o]}else t.stop()}function _(t,e){a.apply(this,arguments),this.memory=!!(e&&e.memory),e&&e.hot&&this.pipe(O)}_.prototype=Ne(ze(a.prototype),{push:function(t){if(t===void 0)return;this.memory&&(this.value=t);let e=-1;for(;this[++e];)this[e].push(t)},pipe:function(t){let e=-1;for(;this[++e];);return this.memory&&e===0&&this.input.pipe(this),this[e]=t,t.done(()=>$e(this,t)),this.value!==void 0&&t.push(this.value),!this.memory&&e===0&&this.input.pipe(this),t}});var Ke=Array.prototype,qe=Object.assign,Qe=Object.create;function Je(t){return t!==void 0}function G(t){this.buffer=t?t.filter?t.filter(Je):t:[]}G.prototype=qe(Qe(a.prototype),{push:function(t){t!==void 0&&d(this.buffer,t)},pipe:function(t){for(t.done(this),this[0]=t;this.buffer.length;)d(this[0],Ke.shift.apply(this.buffer));return this.buffer=t,t},stop:function(){return this.buffer=void 0,T(this),this}});var Dt=Object.assign,We=Object.create,Xe=Promise.resolve(),Ye={schedule:function(){Xe.then(this.fire)},unschedule:m},Ze={schedule:function(){this.timer=requestAnimationFrame(this.fire)},unschedule:function(){cancelAnimationFrame(this.timer),this.timer=void 0}},tn={schedule:function(){this.timer=setTimeout(this.fire,this.duration*1e3)},unschedule:function(){clearTimeout(this.timer),this.timer=void 0}};function D(t,e){a.apply(this,arguments),this.duration=e,this.timer=void 0,this.fire=()=>{this.timer=void 0,this.output.stop()},Dt(this,e==="tick"?Ye:e==="frame"?Ze:tn)}D.prototype=Dt(We(a.prototype),{push:function(t){this.timer?(this.unschedule(),this.schedule(),this.output.push(t)):(this.output=a.of(t),this[0].push(this.output),this.schedule())},stop:function(){return this.timer&&this.fire(),a.prototype.stop.apply(this,arguments)}});var ut=Object.assign,en=Object.create,Vt=Object.keys;function at(t,e,o,r,i){this.stream=t,this.names=e,this.values=o,this.name=r,this.input=i}ut(at.prototype,{push:function(t){let e=this.stream,o=this.values,r=this.name;o[r]=t,(e.active||(e.active=Vt(o).length===this.names.length))&&d(e[0],ut({},o))},stop:function(){--this.stream.count===0&&T(this.stream)},done:function(t){this.stream.done(t)}});function $(t){this.inputs=t,this.active=!1}$.prototype=ut(en(a.prototype),{push:null,pipe:function(t){let e=this.inputs,o=Vt(e),r={};this.count=o.length,this[0]=t,t.done(this);let i;for(i in e){let s=e[i];if(s.pipe){let p=new at(this,o,r,i,s);s.pipe(p)}else if(s.then){let p=new at(this,o,r,i,s);s.then(c=>p.push(c)),s.finally(()=>p.stop())}else r[i]=s,--this.count}return t}});var jt=Object.assign,nn=Object.create;function Ht(t){this.stream=t}jt(Ht.prototype,{push:function(t){d(this.stream[0],t)},stop:function(){--this.stream.count===0&&T(this.stream)},done:function(t){this.stream.done(t)}});function K(t){this.inputs=t}K.prototype=jt(nn(a.prototype),{push:null,pipe:function(t){let e=this.inputs;this.count=e.length,this[0]=t,t.done(this);let o=new Ht(this),r=-1,i;for(;i=e[++r];)if(i.pipe)i.pipe(o);else if(i.then)i.then(s=>o.push(s)),i.finally(()=>o.stop());else{let s=-1;for(;++s<i.length;)o.push(i[s]);o.stop()}return t}});var on=Object.assign,rn=Object.create;function q(t){this.promise=t}q.prototype=on(rn(a.prototype),{push:null,pipe:function(t){let e=this.promise;return this[0]=t,t.done(this),e.then(o=>d(this,o)),e.finally(()=>T(this)),t}});var sn=Array.prototype,_t=Object.assign;function un(t){throw new TypeError("Stream cannot be created from "+typeof object)}_t(a,{of:function(){return new G(sn.slice.apply(arguments))},from:function(t){return t.pipe?new a(t):t.then?new q(t):typeof t.length=="number"?new G(t):un(t)},batch:t=>new D(O,t),burst:t=>(console.warn("Stream.burst() is now Stream.batch()"),new D(O,t)),broadcast:t=>new _(O,t),combine:t=>new $(t),merge:function(){return new K(arguments)}});_t(a.prototype,{log:rt,batch:function(t){return new D(this,t)},burst:function(t){return console.warn("stream.burst() is now stream.batch()"),new D(this,t)},broadcast:function(t){return new _(this,t)}});var an=Object.assign,cn=/\s+/,Gt={fullscreenchange:"fullscreenElement"in document?"fullscreenchange":"webkitFullscreenElement"in document?"webkitfullscreenchange":"fullscreenchange"};var Ut=0;window.addEventListener("click",t=>Ut=t.timeStamp);function pn(t,e){return t.node.addEventListener(Gt[e]||e,t,t.options),t}function ln(t,e){return t.node.removeEventListener(Gt[e]||e,t),t}function It(t,e,o){this.types=t.split(cn),this.options=e,this.node=o,this.select=e&&e.select}an(It.prototype,{pipe:function(t){st(this,t),this.types.reduce(pn,this)},handleEvent:function(t){if(!(t.type==="click"&&t.timeStamp<=Ut)){if(this.select){let e=t.target.closest(this.select);if(!e)return;t.selectedTarget=e}d(this[0],t)}},stop:function(){this.types.reduce(ln,this),T(this[0])}});function U(t,e){let o;return typeof t=="object"&&(o=t,t=o.type),new a(new It(t,o,e))}var fn=Object.assign,I={bubbles:!0,cancelable:!0};function hn(t,e){var h;let o=I,r,i,s,p,c,b;return typeof t=="object"?(h=t,{type:t,detail:i,bubbles:s,cancelable:p,composed:c}=h,r=mt(h,["type","detail","bubbles","cancelable","composed"]),b=fn(new CustomEvent(t,{detail:i,bubbles:s||I.bubbles,cancelable:p||I.cancelable,composed:c||I.composed}),r)):b=new CustomEvent(t,I),e.dispatchEvent(b)}var ct=x(hn,!0);function pt(t){return Math.pow(2,t/6)}function P(t){if(!t)return 0;let e=+t;if(e||e===0)return e;let o=/^(?:(-?[\d.]+)|(-?∞))(?:(db|bpm)|(m|k)?(\w+))$/.exec(t.toLowerCase());if(!o)return 0;let r=o[2]?o[2]==="-∞"?-1/0:1/0:parseFloat(o[1]);return o[3]==="db"?pt(r):o[3]==="bpm"?r/60:o[4]==="m"?r/1e3:o[4]==="k"?r*1e3:r}function mn(t,e){let o=t[t.length-1];return o&&!/^-?\d/.test(e)?o.label=e:t.push({label:e,value:P(e)}),t}function V(t){let e=t.trim();return e?e.split(/\s*,\s*|\s+/).reduce(mn,[]):null}function Rt(t,e){let o=t.length,r=1/0,i;for(;o--;){let s=Math.abs(e-t[o].normalValue);s<r&&(r=s,i=t[o])}return i}function Nt(t,e){let o=t.length;for(;t[--o]&&t[o].unitValue>=e;);return t[o]||t[0]}function zt(t,e){let o=-1;for(;t[++o]&&t[o].unitValue<=e;);return t[o]||t[t.length-1]}var $t=v(t=>t.toLowerCase(),{db:(t,e,o)=>V("-∞dB -96dB -90dB -84dB -78dB -72dB -66dB -60dB -54dB -48dB -42dB -36dB -30dB -24dB -18dB -12dB -6dB 0dB 6dB 12dB 18dB 24dB"),default:(t,e,o)=>[{label:"0",value:0},{label:"1",value:1}]});function Kt(t,e,o,r){return t.normalValue=e.normalise(o,r,t.value),t}function qt(t,e,o,r,i,s,p){return t.scale=e,t.min=o,t.max=r,t.ticks=(i||(p?$t(p,o,r):O)).filter(c=>c.value>=t.min&&c.value<=t.max).map(c=>Kt(c,e,o,r)),t.step=s==="any"?void 0:s==="tick"?t.ticks:V(s).filter(c=>c.value>=t.min&&c.value<=t.max).map(c=>Kt(c,e,o,r)),t.display=p,t}function Qt(t,e,o,r,i){if(t.value=ot(o,r,i),t.normalValue=e.normalise(o,r,t.value),t.step){let s=Rt(t.step,t.normalValue);t.value=s.value,t.normalValue=s.normalValue}return t}var Jt=.00390625;var Wt=.0009765625,Xt=.00048828125,Yt=.000244140625;var Zt=1525878906e-14;var mr=Symbol("state");var te=Object.assign,J={};function lt(t,e,o){let r=o/(e*t);return(r<=1?r:Math.log(r)+1)/J[t]}function bn(t,e,o){let r=o*J[t];return e*t*(r<=1?r:Math.pow(Math.E,r-1))}function k(t){this.xover=t,J[t]||(J[t]=Math.log(1/t)+1)}te(k.prototype,{normalise:function(t,e,o){let r=lt(this.xover,e,t);return(lt(this.xover,e,o)-r)/(1-r)},denormalise:function(t,e,o){let r=lt(this.xover,e,t),i=o*(1-r)+r;return bn(this.xover,e,i)}});function Q(t){this.power=t}te(Q.prototype,{normalise:function(t,e,o){return Math.pow((o-t)/(e-t),1/this.power)},denormalise:function(t,e,o){return Math.pow(o,this.power)*(e-t)+t}});var yn={linear:{normalise:function(t,e,o){return(o-t)/(e-t)},denormalise:function(t,e,o){return t+o*(e-t)}},"pow-2":new Q(2),"pow-3":new Q(3),"pow-4":new Q(4),log:{normalise:function(t,e,o){return Math.log(o/t)/Math.log(e/t)},denormalise:function(t,e,o){return t*Math.pow(e/t,o)}},"log-24db":new k(.0625),"log-30db":new k(.03125),"log-36db":new k(.015625),"log-48db":new k(Jt),"log-60db":new k(Wt),"log-66db":new k(Xt),"log-72db":new k(Yt),"log-96db":new k(Zt)};function ee(t){return yn[t&&t.toLowerCase()||"linear"]}var vn=.9965784284662086;function ft(t){return 20*Math.log10(t)*vn}function ne(t,e){return{unit:e<1?"m"+t:e>=1e3?"k"+t:t,value:e<.001?(e*1e3).toFixed(2):e<1?(e*1e3).toPrecision(3):e>=1e3?(e/1e3).toPrecision(3):e.toPrecision(3)}}var oe=v(t=>t.toLowerCase(),{pan:(t,e)=>({unit:"",value:e===-1?"-1.00":e===0?"0.00":e===1?"1.00":e.toFixed(2)}),db:(t,e)=>{let o=ft(e);return{unit:"dB",value:isFinite(o)?o<-1?o.toPrecision(3):o.toFixed(2):o<0?"-∞":"∞"}},hz:(t,e)=>({unit:e>=1e3?"kHz":"Hz",value:e<1?e.toFixed(2):e>=1e3?(e/1e3).toPrecision(3):e.toPrecision(3)}),semitone:(t,e)=>({unit:"",value:e===0?"0":e<0?"♭"+(-e/100).toFixed(2):"♯"+(e/100).toFixed(2)}),s:ne,bpm:(t,e)=>{let o=e*60;return{unit:"bpm",value:o<100?o.toFixed(1):o.toFixed(0)}},int:(t,e)=>({unit:"",value:Math.round(e)}),"":(t,e)=>({unit:"",value:e>-1&&e<1?e.toFixed(2):e.toPrecision(3)}),default:ne});function xn(t,e){return e[t]}var re=x(xn,!0);var ie=v(re("keyCode"),{38:(t,e,o,r,i,s)=>{if(t.preventDefault(),i)return zt(i,s).value;let p=t.shiftKey?10:1;return e.denormalise(o,r,(Math.round(100*s)+p)*.01)},40:(t,e,o,r,i,s)=>{if(t.preventDefault(),i)return Nt(i,s).value;let p=t.shiftKey?10:1;return e.denormalise(o,r,(Math.round(100*s)-p)*.01)},default:m});var se="linear";var ue="",ae="any",ce="";var zr=import.meta.url.replace(/\/[^\/]*([?#].*)?$/,"/");function Mn(t){let e=t.target.closest('[name="value"]');return parseFloat(e.value)}function kn(t,e){return t.push(B("button",{type:"button",part:"tick",name:"value",value:e.value,style:"--normal-value: "+e.normalValue+";",text:e.label})),t}function Ln(t,e,o,r,i,s,p){t.setProperty("--normal-zero",e.normalise(o,r,0)),s.forEach(c=>c.remove()),s.length=0,s=i.reduce(kn,s),p.after.apply(p,s)}function On(t,e,o,r,i,s,p,c){e.value=c;let b=oe(s,p);r.textContent=b.value,i.textContent=b.unit,o.setFormValue(p)}var pe={mode:"closed",focusable:!0,construct:function(t,e){let o=B("style",":host {} :host > * { visibility: hidden; }"),r=B("label",{for:"input",html:"<slot></slot>",part:"label"}),i=B("input",{type:"range",id:"input",name:"unit-value",min:"0",max:"1",step:"any"}),s=B("text"),p=B("abbr"),c=B("output",{children:[s,p],part:"output"}),b=B("text",""),h=[];t.append(o,r,i,c,b);let u=y(this),f={},g=o.sheet.cssRules[0].style,L=o.sheet.cssRules[1].style;u.host=this,u.shadow=t,u.hostStyle=g,u.childStyle=L,u.internals=e,u.data=f,u.shadow=new Promise(l=>u.load=l),u.scale=a.of(se),u.min=a.of(0),u.max=a.of(1),u.step=a.of(ae),u.ticks=a.of(ue),u.display=a.of(ce),u.value=a.of(0);let R=a.combine({shadow:u.shadow,scale:u.scale.map(ee),min:u.min.map(P),max:u.max.map(P),ticks:u.ticks.map(V),display:u.display,step:u.step}).scan((l,w)=>qt(l,w.scale,w.min,w.max,w.ticks,w.step,w.display),f).broadcast();R.each(l=>Ln(g,l.scale,l.min,l.max,l.ticks,h,b)),a.combine({data:R,value:u.value}).scan((l,w)=>Qt(l,w.data.scale,w.data.min,w.data.max,w.value),f).each(l=>On(g,i,e,s,p,l.display,l.value,l.normalValue)),U({type:"pointerdown",select:'[name="value"]'},t).map(Mn).each(l=>{u.value.push(l),ct("input",this)}),U("input",t).each(l=>{let w=parseFloat(l.target.value),W=f.scale.denormalise(f.min,f.max,w);u.value.push(W)}),U("keydown",this).filter(()=>document.activeElement===this||this.contains(document.activeElement)).map(l=>ie(l,f.scale,f.min,f.max,f.step,f.normalValue)).each(l=>{u.value.push(l),ct("input",this)})},load:function(t){let e=y(this);e.childStyle.visibility="",e.load(t)}};var le={type:{value:"number",enumerable:!0},min:{attribute:function(t){this.min=t},set:function(t){y(this).min.push(t)},get:function(){return y(this).data.min},enumerable:!0},max:{attribute:function(t){this.max=t},set:function(t){y(this).max.push(t)},get:function(){return y(this).data.max},enumerable:!0},scale:{attribute:function(t){y(this).scale.push(t||"linear")}},display:{attribute:function(t){y(this).display.push(t||"")}},ticks:{attribute:function(t){y(this).ticks.push(t)}},step:{attribute:function(t){y(this).step.push(t)}},value:{attribute:function(t){this.value=t},get:function(){return y(this).data.value},set:function(t){y(this).value.push(P(t))},enumerable:!0}};var An=window.rangeInputStylesheet||import.meta.url.replace(/\/[^\/]*([?#].*)?$/,"/")+"range-input-shadow.css",Yr=et("<range-input>",pe,le,An);export{Yr as default};
