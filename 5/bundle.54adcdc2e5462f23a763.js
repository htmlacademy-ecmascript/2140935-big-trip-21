(()=>{var t={10:(t,e,n)=>{"use strict";n.d(e,{Z:()=>a});var i=n(537),s=n.n(i),r=n(645),o=n.n(r)()(s());o.push([t.id,".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n","",{version:3,sources:["webpack://./src/framework/view/abstract-view.css"],names:[],mappings:"AAAA;EACE,qBAAqB;EACrB,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE;;IAEE,wBAAwB;EAC1B;;EAEA;;;;;IAKE,2BAA2B;EAC7B;;EAEA;;;;IAIE,0BAA0B;EAC5B;AACF",sourcesContent:[".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n"],sourceRoot:""}]);const a=o},645:t=>{"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n="",i=void 0!==e[5];return e[4]&&(n+="@supports (".concat(e[4],") {")),e[2]&&(n+="@media ".concat(e[2]," {")),i&&(n+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),n+=t(e),i&&(n+="}"),e[2]&&(n+="}"),e[4]&&(n+="}"),n})).join("")},e.i=function(t,n,i,s,r){"string"==typeof t&&(t=[[null,t,void 0]]);var o={};if(i)for(var a=0;a<this.length;a++){var l=this[a][0];null!=l&&(o[l]=!0)}for(var c=0;c<t.length;c++){var d=[].concat(t[c]);i&&o[d[0]]||(void 0!==r&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=r),n&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=n):d[2]=n),s&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=s):d[4]="".concat(s)),e.push(d))}},e}},537:t=>{"use strict";t.exports=function(t){var e=t[1],n=t[3];if(!n)return e;if("function"==typeof btoa){var i=btoa(unescape(encodeURIComponent(JSON.stringify(n)))),s="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(i),r="/*# ".concat(s," */");return[e].concat([r]).join("\n")}return[e].join("\n")}},484:function(t){t.exports=function(){"use strict";var t=6e4,e=36e5,n="millisecond",i="second",s="minute",r="hour",o="day",a="week",l="month",c="quarter",d="year",u="date",f="Invalid Date",p=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,h=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,v={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},m=function(t,e,n){var i=String(t);return!i||i.length>=e?t:""+Array(e+1-i.length).join(n)+t},_={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),i=Math.floor(n/60),s=n%60;return(e<=0?"+":"-")+m(i,2,"0")+":"+m(s,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var i=12*(n.year()-e.year())+(n.month()-e.month()),s=e.clone().add(i,l),r=n-s<0,o=e.clone().add(i+(r?-1:1),l);return+(-(i+(n-s)/(r?s-o:o-s))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:l,y:d,w:a,d:o,D:u,h:r,m:s,s:i,ms:n,Q:c}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},y="en",g={};g[y]=v;var $=function(t){return t instanceof C},b=function t(e,n,i){var s;if(!e)return y;if("string"==typeof e){var r=e.toLowerCase();g[r]&&(s=r),n&&(g[r]=n,s=r);var o=e.split("-");if(!s&&o.length>1)return t(o[0])}else{var a=e.name;g[a]=e,s=a}return!i&&s&&(y=s),s||!i&&y},M=function(t,e){if($(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new C(n)},w=_;w.l=b,w.i=$,w.w=function(t,e){return M(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var C=function(){function v(t){this.$L=b(t.locale,null,!0),this.parse(t)}var m=v.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(w.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var i=e.match(p);if(i){var s=i[2]-1||0,r=(i[7]||"0").substring(0,3);return n?new Date(Date.UTC(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)):new Date(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return w},m.isValid=function(){return!(this.$d.toString()===f)},m.isSame=function(t,e){var n=M(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return M(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<M(t)},m.$g=function(t,e,n){return w.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,c=!!w.u(e)||e,f=w.p(t),p=function(t,e){var i=w.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return c?i:i.endOf(o)},h=function(t,e){return w.w(n.toDate()[t].apply(n.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},v=this.$W,m=this.$M,_=this.$D,y="set"+(this.$u?"UTC":"");switch(f){case d:return c?p(1,0):p(31,11);case l:return c?p(1,m):p(0,m+1);case a:var g=this.$locale().weekStart||0,$=(v<g?v+7:v)-g;return p(c?_-$:_+(6-$),m);case o:case u:return h(y+"Hours",0);case r:return h(y+"Minutes",1);case s:return h(y+"Seconds",2);case i:return h(y+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var a,c=w.p(t),f="set"+(this.$u?"UTC":""),p=(a={},a[o]=f+"Date",a[u]=f+"Date",a[l]=f+"Month",a[d]=f+"FullYear",a[r]=f+"Hours",a[s]=f+"Minutes",a[i]=f+"Seconds",a[n]=f+"Milliseconds",a)[c],h=c===o?this.$D+(e-this.$W):e;if(c===l||c===d){var v=this.clone().set(u,1);v.$d[p](h),v.init(),this.$d=v.set(u,Math.min(this.$D,v.daysInMonth())).$d}else p&&this.$d[p](h);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[w.p(t)]()},m.add=function(n,c){var u,f=this;n=Number(n);var p=w.p(c),h=function(t){var e=M(f);return w.w(e.date(e.date()+Math.round(t*n)),f)};if(p===l)return this.set(l,this.$M+n);if(p===d)return this.set(d,this.$y+n);if(p===o)return h(1);if(p===a)return h(7);var v=(u={},u[s]=t,u[r]=e,u[i]=1e3,u)[p]||1,m=this.$d.getTime()+n*v;return w.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||f;var i=t||"YYYY-MM-DDTHH:mm:ssZ",s=w.z(this),r=this.$H,o=this.$m,a=this.$M,l=n.weekdays,c=n.months,d=function(t,n,s,r){return t&&(t[n]||t(e,i))||s[n].slice(0,r)},u=function(t){return w.s(r%12||12,t,"0")},p=n.meridiem||function(t,e,n){var i=t<12?"AM":"PM";return n?i.toLowerCase():i},v={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:w.s(a+1,2,"0"),MMM:d(n.monthsShort,a,c,3),MMMM:d(c,a),D:this.$D,DD:w.s(this.$D,2,"0"),d:String(this.$W),dd:d(n.weekdaysMin,this.$W,l,2),ddd:d(n.weekdaysShort,this.$W,l,3),dddd:l[this.$W],H:String(r),HH:w.s(r,2,"0"),h:u(1),hh:u(2),a:p(r,o,!0),A:p(r,o,!1),m:String(o),mm:w.s(o,2,"0"),s:String(this.$s),ss:w.s(this.$s,2,"0"),SSS:w.s(this.$ms,3,"0"),Z:s};return i.replace(h,(function(t,e){return e||v[t]||s.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(n,u,f){var p,h=w.p(u),v=M(n),m=(v.utcOffset()-this.utcOffset())*t,_=this-v,y=w.m(this,v);return y=(p={},p[d]=y/12,p[l]=y,p[c]=y/3,p[a]=(_-m)/6048e5,p[o]=(_-m)/864e5,p[r]=_/e,p[s]=_/t,p[i]=_/1e3,p)[h]||_,f?y:w.a(y)},m.daysInMonth=function(){return this.endOf(l).$D},m.$locale=function(){return g[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),i=b(t,e,!0);return i&&(n.$L=i),n},m.clone=function(){return w.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},v}(),D=C.prototype;return M.prototype=D,[["$ms",n],["$s",i],["$m",s],["$H",r],["$W",o],["$M",l],["$y",d],["$D",u]].forEach((function(t){D[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),M.extend=function(t,e){return t.$i||(t(e,C,M),t.$i=!0),M},M.locale=b,M.isDayjs=$,M.unix=function(t){return M(1e3*t)},M.en=g[y],M.Ls=g,M.p={},M}()},379:t=>{"use strict";var e=[];function n(t){for(var n=-1,i=0;i<e.length;i++)if(e[i].identifier===t){n=i;break}return n}function i(t,i){for(var r={},o=[],a=0;a<t.length;a++){var l=t[a],c=i.base?l[0]+i.base:l[0],d=r[c]||0,u="".concat(c," ").concat(d);r[c]=d+1;var f=n(u),p={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==f)e[f].references++,e[f].updater(p);else{var h=s(p,i);i.byIndex=a,e.splice(a,0,{identifier:u,updater:h,references:1})}o.push(u)}return o}function s(t,e){var n=e.domAPI(e);return n.update(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap&&e.supports===t.supports&&e.layer===t.layer)return;n.update(t=e)}else n.remove()}}t.exports=function(t,s){var r=i(t=t||[],s=s||{});return function(t){t=t||[];for(var o=0;o<r.length;o++){var a=n(r[o]);e[a].references--}for(var l=i(t,s),c=0;c<r.length;c++){var d=n(r[c]);0===e[d].references&&(e[d].updater(),e.splice(d,1))}r=l}}},569:t=>{"use strict";var e={};t.exports=function(t,n){var i=function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}e[t]=n}return e[t]}(t);if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");i.appendChild(n)}},216:t=>{"use strict";t.exports=function(t){var e=document.createElement("style");return t.setAttributes(e,t.attributes),t.insert(e,t.options),e}},565:(t,e,n)=>{"use strict";t.exports=function(t){var e=n.nc;e&&t.setAttribute("nonce",e)}},795:t=>{"use strict";t.exports=function(t){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=t.insertStyleElement(t);return{update:function(n){!function(t,e,n){var i="";n.supports&&(i+="@supports (".concat(n.supports,") {")),n.media&&(i+="@media ".concat(n.media," {"));var s=void 0!==n.layer;s&&(i+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),i+=n.css,s&&(i+="}"),n.media&&(i+="}"),n.supports&&(i+="}");var r=n.sourceMap;r&&"undefined"!=typeof btoa&&(i+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),e.styleTagTransform(i,t,e.options)}(e,t,n)},remove:function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(e)}}}},589:t=>{"use strict";t.exports=function(t,e){if(e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}}},e={};function n(i){var s=e[i];if(void 0!==s)return s.exports;var r=e[i]={id:i,exports:{}};return t[i].call(r.exports,r,r.exports,n),r.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var i in e)n.o(e,i)&&!n.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.nc=void 0,(()=>{"use strict";var t=n(379),e=n.n(t),i=n(795),s=n.n(i),r=n(569),o=n.n(r),a=n(565),l=n.n(a),c=n(216),d=n.n(c),u=n(589),f=n.n(u),p=n(10),h={};h.styleTagTransform=f(),h.setAttributes=l(),h.insert=o().bind(null,"head"),h.domAPI=s(),h.insertStyleElement=d(),e()(p.Z,h),p.Z&&p.Z.locals&&p.Z.locals;const v="shake";class m{#t=null;constructor(){if(new.target===m)throw new Error("Can't instantiate AbstractView, only concrete one.")}get element(){return this.#t||(this.#t=function(t){const e=document.createElement("div");return e.innerHTML=t,e.firstElementChild}(this.template)),this.#t}get template(){throw new Error("Abstract method not implemented: get template")}removeElement(){this.#t=null}shake(t){this.element.classList.add(v),setTimeout((()=>{this.element.classList.remove(v),t?.()}),600)}}function _(t,e,n="beforeend"){if(!(t instanceof m))throw new Error("Can render only components");if(null===e)throw new Error("Container element doesn't exist");e.insertAdjacentElement(n,t.element)}function y(t,e){if(!(t instanceof m&&e instanceof m))throw new Error("Can replace only components");const n=t.element,i=e.element,s=i.parentElement;if(null===s)throw new Error("Parent element doesn't exist");s.replaceChild(n,i)}class g extends m{get template(){return'<ul class="trip-events__list"></ul>'}}class $ extends m{get template(){return'<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n      <div class="trip-sort__item  trip-sort__item--day">\n        <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day">\n        <label class="trip-sort__btn" for="sort-day">Day</label>\n      </div>\n\n      <div class="trip-sort__item  trip-sort__item--event">\n        <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>\n        <label class="trip-sort__btn" for="sort-event">Event</label>\n      </div>\n\n      <div class="trip-sort__item  trip-sort__item--time">\n        <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">\n        <label class="trip-sort__btn" for="sort-time">Time</label>\n      </div>\n\n      <div class="trip-sort__item  trip-sort__item--price">\n        <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" checked>\n        <label class="trip-sort__btn" for="sort-price">Price</label>\n      </div>\n\n      <div class="trip-sort__item  trip-sort__item--offer">\n        <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>\n        <label class="trip-sort__btn" for="sort-offer">Offers</label>\n      </div>\n    </form>'}}var b=n(484),M=n.n(b);function w(t){return t[Math.floor(Math.random()*t.length)]}function C(t){const e=[...t],n=Math.floor(Math.random()*(e.length+1));for(let t=0;t<n&&0!==e.length;t++){const t=Math.floor(Math.random()*e.length);e.splice(t,1)}return e}function D(t,e){return Math.floor(Math.random()*(e-t+1))+t}function A(t,e){t>e&&([t,e]=[e,t]);const n=Math.floor((e-t)/10)+1;return 10*Math.floor(Math.random()*n)+t}function S(){const t=D(26,27),e=D(11,17),n=D(0,59),i=new Date(2023,7,t,e,n),s=D(0,48),r=D(0,59),o=new Date(i.getTime()+60*(60*s+r)*1e3);return{startDate:i,endDate:o}}function k(t,e){return M()(t).format(e)}class x extends m{#e=null;#n=null;#i=null;#s=null;#r=null;#o=null;#a=null;constructor({point:t,destination:e,offers:n,typeOffers:i,allTypes:s,allCities:r,onArrowUpClick:o}){super(),this.#e=t,this.#n=e,this.#i=n,this.#s=i,this.#r=s,this.#o=r,this.#a=o,this.element.querySelector(".event__rollup-btn").addEventListener("click",this.#l)}get template(){return function(t,e,n,i,s,r){const{basePrice:o,dateFrom:a,dateTo:l,type:c}=t,d=k(a,"DD/MM/YY HH:mm"),u=k(l,"DD/MM/YY HH:mm"),f=c.toLowerCase(),p=function(t){let e="";for(const n of t)e+=`\n    <div class="event__type-item">\n      <input id="event-type-${n.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${n.toLowerCase()}">\n      <label class="event__type-label  event__type-label--${n.toLowerCase()}" for="event-type-${n.toLowerCase()}-1">${n}</label>\n    </div>`;return e}(s),h=function(t){let e="";for(const n of t)e+=`<option value="${n}"></option>`;return e}(r),v=function(t,e){const n=function(t,e){const n=e.filter((e=>!t.some((t=>t.id===e.id))));let i="";for(const e of t)i+=`\n    <div class="event__offer-selector">\n      <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>\n      <label class="event__offer-label" for="event-offer-luggage-1">\n        <span class="event__offer-title">${e.title}</span>\n        &plus;&euro;&nbsp;\n        <span class="event__offer-price">${e.price}</span>\n      </label>\n    </div>`;for(const t of n)i+=`\n    <div class="event__offer-selector">\n      <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage">\n      <label class="event__offer-label" for="event-offer-luggage-1">\n        <span class="event__offer-title">${t.title}</span>\n        &plus;&euro;&nbsp;\n        <span class="event__offer-price">${t.price}</span>\n      </label>\n    </div>`;return i}(t,e);return`<section class="event__section  event__section--offers">\n      <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n      <div class="event__available-offers">\n        ${n}\n      </div>\n    </section>`}(n,i),m=function(t){const e=function(t){let e="";if(t)for(const n of t)e+=`<img class="event__photo" src="${n.src}" alt="${n.description}">`;return e}(t.pictures);return`<section class="event__section  event__section--destination">\n      <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n      <p class="event__destination-description">${t.description}</p>\n      <div class="event__photos-container">\n        <div class="event__photos-tape">\n          ${e}\n        </div>\n      </div>\n    </section>`}(e);return`<li class="trip-events__item">\n      <form class="event event--edit" action="#" method="post">\n        <header class="event__header">\n          <div class="event__type-wrapper">\n            <label class="event__type  event__type-btn" for="event-type-toggle-1">\n              <span class="visually-hidden">Choose event type</span>\n              <img class="event__type-icon" width="17" height="17" src="img/icons/${f}.png" alt="Event type icon">\n            </label>\n            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n\n            <div class="event__type-list">\n              <fieldset class="event__type-group">\n                <legend class="visually-hidden">Event type</legend>\n                ${p}\n              </fieldset>\n            </div>\n          </div>\n\n          <div class="event__field-group  event__field-group--destination">\n            <label class="event__label  event__type-output" for="event-destination-1">\n              ${c}\n            </label>\n            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${e.name}" list="destination-list-1">\n            <datalist id="destination-list-1">\n              ${h}\n            </datalist>\n          </div>\n\n          <div class="event__field-group  event__field-group--time">\n            <label class="visually-hidden" for="event-start-time-1">From</label>\n            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${d}">\n            &mdash;\n            <label class="visually-hidden" for="event-end-time-1">To</label>\n            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${u}">\n          </div>\n\n          <div class="event__field-group  event__field-group--price">\n            <label class="event__label" for="event-price-1">\n              <span class="visually-hidden">Price</span>\n              &euro;\n            </label>\n            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${o}">\n          </div>\n\n          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n          <button class="event__reset-btn" type="reset">Delete</button>\n          <button class="event__rollup-btn" type="button">\n            <span class="visually-hidden">Open event</span>\n          </button>\n        </header>\n        <section class="event__details">\n          ${v}\n          ${m}\n        </section>\n      </form>\n    </li>`}(this.#e,this.#n,this.#i,this.#s,this.#r,this.#o)}#l=t=>{t.preventDefault(),this.#a()}}class E extends m{#e=null;#n=null;#i=null;#c=null;constructor({point:t,destination:e,offers:n,onArrowDownClick:i}){super(),this.#e=t,this.#n=e,this.#i=n,this.#c=i,this.element.querySelector(".event__rollup-btn").addEventListener("click",this.#d)}get template(){return function(t,e,n){const{basePrice:i,dateFrom:s,dateTo:r,isFavorite:o,type:a}=t,l=k(s,"MMM DD"),c=k(s,"HH:mm"),d=k(r,"HH:mm"),u=function(t){const e=Math.floor(t/1440),n=Math.floor(t%1440/60),i=t%60;return e>0?`${e.toString()}D ${n.toString().padStart(2,"0")}H ${i.toString().padStart(2,"0")}M`:n>0?`${n.toString().padStart(2,"0")}H ${i.toString().padStart(2,"0")}M`:`${i.toString()}M`}(function(t,e){const n=new Date(t);return(new Date(e)-n)/6e4}(s,r)),f=a.toLowerCase(),p=function(t){let e="";for(const n of t)e+=`\n      <li class="event__offer">\n        <span class="event__offer-title">${n.title}</span>\n        &plus;&euro;&nbsp;\n        <span class="event__offer-price">${n.price}</span>\n      </li>`;return e}(n);return`<li class="trip-events__item">\n      <div class="event">\n        <time class="event__date" datetime="${l}">${l}</time>\n        <div class="event__type">\n          <img class="event__type-icon" width="42" height="42" src="img/icons/${f}.png" alt="Event type icon">\n        </div>\n        <h3 class="event__title">${a} ${e.name}</h3>\n        <div class="event__schedule">\n          <p class="event__time">\n            <time class="event__start-time" datetime="${c}">${c}</time>\n            &mdash;\n            <time class="event__end-time" datetime="${d}">${d}</time>\n          </p>\n          <p class="event__duration">${u}</p>\n        </div>\n        <p class="event__price">\n          &euro;&nbsp;<span class="event__price-value">${i}</span>\n        </p>\n        <h4 class="visually-hidden">Offers:</h4>\n        <ul class="event__selected-offers">\n          ${p}\n        </ul>\n        <button class="event__favorite-btn ${o?"event__favorite-btn--active":""}" type="button">\n          <span class="visually-hidden">Add to favorite</span>\n          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n          </svg>\n        </button>\n        <button class="event__rollup-btn" type="button">\n          <span class="visually-hidden">Open event</span>\n        </button>\n      </div>\n    </li>`}(this.#e,this.#n,this.#i)}#d=t=>{t.preventDefault(),this.#c()}}class U{#u=null;#e=null;#f=null;#p=null;#i=[];#s=[];#r=[];#n=[];#o=[];constructor({pointContainer:t,point:e,offersModel:n,destinationsModel:i}){this.#u=t,this.#e=e,this.#f=n,this.#p=i}init(){this.#i=[...this.#f.getOffersById(this.#e.offers)],this.#s=[...this.#f.getOffersByType(this.#e.type)],this.#r=[...this.#f.allTypes],this.#n=this.#p.getDestination(this.#e.destination),this.#o=[...this.#p.allCities],this.#h(this.#e,this.#p.getDestination(this.#e.destination),this.#f.getOffersById(this.#e.offers),this.#s,this.#r,this.#o)}#h(t,e,n,i,s,r){const o=t=>{"Escape"===t.key&&(t.preventDefault(),c(),document.removeEventListener("keydown",o))},a=new E({point:t,destination:e,offers:n,onArrowDownClick:()=>{y(l,a),document.addEventListener("keydown",o)}}),l=new x({point:t,destination:e,offers:n,typeOffers:i,allTypes:s,allCities:r,onArrowUpClick:()=>{c(),document.removeEventListener("keydown",o)}});function c(){y(a,l)}_(a,this.#u.element)}}const T=[{type:"Taxi",offers:[{id:crypto.randomUUID(),title:"Order Uber",price:A(10,400)}]},{type:"Bus",offers:[{id:crypto.randomUUID(),title:"Book tickets",price:A(10,400)},{id:crypto.randomUUID(),title:"Choose seats",price:A(10,400)}]},{type:"Train",offers:[{id:crypto.randomUUID(),title:"Travel by train",price:A(10,400)},{id:crypto.randomUUID(),title:"Choose seats",price:A(10,400)}]},{type:"Flight",offers:[{id:crypto.randomUUID(),title:"Book tickets",price:A(10,400)},{id:crypto.randomUUID(),title:"Switch to comfort class",price:A(10,400)},{id:crypto.randomUUID(),title:"Add meal",price:A(10,400)},{id:crypto.randomUUID(),title:"Choose seats",price:A(10,400)}]},{type:"Restaurant",offers:[{id:crypto.randomUUID(),title:"Add meal",price:A(10,400)},{id:crypto.randomUUID(),title:"Add breakfast",price:A(10,400)}]},{type:"Drive",offers:[{id:crypto.randomUUID(),title:"Rent a car",price:A(10,400)}]},{type:"Sightseeing",offers:[]},{type:"Check-in",offers:[{id:crypto.randomUUID(),title:"Switch to comfort class",price:A(10,400)},{id:crypto.randomUUID(),title:"Add luggage",price:A(10,400)},{id:crypto.randomUUID(),title:"Choose seats",price:A(10,400)},{id:crypto.randomUUID(),title:"Travel by train",price:A(10,400)},{id:crypto.randomUUID(),title:"Add meal",price:A(10,400)}]},{type:"Ship",offers:[{id:crypto.randomUUID(),title:"Choose seats",price:A(10,400)},{id:crypto.randomUUID(),title:"Add luggage",price:A(10,400)},{id:crypto.randomUUID(),title:"Switch to comfort class",price:A(10,400)}]}],O=["Taxi","Bus","Train","Ship","Drive","Flight","Check-in","Sightseeing","Restaurant"],I=[];function L(t){const e=T.find((e=>e.type===t));return e?e.offers.map((t=>t.id)):[]}for(let t=0;t<20;t++){const e=w(O),{startDate:n,endDate:i}=S(),s={id:t+1,basePrice:A(100,3e3),dateFrom:n.toISOString(),dateTo:i.toISOString(),destination:D(1,5),isFavorite:Math.random()>=.5,offers:C(L(e)),type:e};I.push(s)}function B(){return w(I)}const H="https://loremflickr.com/248/152?random=",F=[{id:1,description:"Amsterdam, is a big and beautiful city in Netherlands.",name:"Amsterdam",pictures:[{src:`${H}${D(1,1e3)}`,description:"Amsterdam long streets 1"},{src:`${H}${D(1,1e3)}`,description:"Amsterdam long streets 2"},{src:`${H}${D(1,1e3)}`,description:"Amsterdam long streets 3"}]},{id:2,description:"Chamonix, is a beautiful city, a true asian pearl, with crowded streets. Chamonix-Mont-Blanc (usually shortened to Chamonix) is a resort area near the junction of France, Switzerland and Italy. At the base of Mont Blanc, the highest summit in the Alps, it's renowned for its skiing.",name:"Chamonix",pictures:[{src:`${H}${D(1,1e3)}`,description:"Chamonix image 1"},{src:`${H}${D(1,1e3)}`,description:"Chamonix image 2"},{src:`${H}${D(1,1e3)}`,description:"Chamonix image 3"},{src:`${H}${D(1,1e3)}`,description:"Chamonix image 4"}]},{id:3,description:"Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.",name:"Geneva",pictures:[{src:`${H}${D(1,1e3)}`,description:"Geneva image 1 2here"},{src:`${H}${D(1,1e3)}`,description:"Geneva image 2 here"},{src:`${H}${D(1,1e3)}`,description:"Geneva image 3 here"},{src:`${H}${D(1,1e3)}`,description:"Geneva image 4 here"},{src:`${H}${D(1,1e3)}`,description:"Geneva image 5 here"}]},{id:4,description:"London, is a beautiful city in South England.",name:"London",pictures:[]},{id:5,description:null,name:"Port Isaac",pictures:[]}],Y=document.querySelector(".trip-main"),P=document.querySelector(".trip-controls__filters"),j=document.querySelector(".trip-events"),N=new class{#v=Array.from({length:22},B);get points(){return this.#v}},W=new class{#i=T;getOffersById(t){const e=[];for(const n of t)for(const t of this.#i)for(const i of t.offers)if(i.id===n){e.push(i);break}return e}getOffersByType(t){const e=[];for(const n of this.#i)if(n.type===t){e.push(...n.offers);break}return e}get allTypes(){const t=new Set;for(const e of this.#i)t.add(e.type);return Array.from(t)}},G=new class{#m=F;getDestination(t){return this.#m.find((e=>e.id===t))}get allCities(){const t=new Set;for(const e of this.#m)t.add(e.name);return Array.from(t)}},q=new class{#_=null;#y=null;#f=null;#p=null;#g=new g;#v=[];constructor({eventsContainer:t,pointsModel:e,offersModel:n,destinationsModel:i}){this.#_=t,this.#y=e,this.#f=n,this.#p=i}init(){this.#v=[...this.#y.points],_(new $,this.#_),_(this.#g,this.#_);for(let t=0;t<this.#v.length;t++)new U({pointContainer:this.#g,point:this.#v[t],offersModel:this.#f,destinationsModel:this.#p}).init()}}({eventsContainer:j,pointsModel:N,offersModel:W,destinationsModel:G});_(new class extends m{get template(){return'<section class="trip-main__trip-info  trip-info">\n    <div class="trip-info__main">\n      <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>\n\n      <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>\n    </div>\n\n    <p class="trip-info__cost">\n      Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>\n    </p>\n  </section>'}},Y,"AFTERBEGIN"),_(new class extends m{get template(){return'<form class="trip-filters" action="#" method="get">\n        <div class="trip-filters__filter">\n          <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything">\n          <label class="trip-filters__filter-label" for="filter-everything">Everything</label>\n        </div>\n\n        <div class="trip-filters__filter">\n          <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">\n          <label class="trip-filters__filter-label" for="filter-future">Future</label>\n        </div>\n\n        <div class="trip-filters__filter">\n          <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present">\n          <label class="trip-filters__filter-label" for="filter-present">Present</label>\n        </div>\n\n        <div class="trip-filters__filter">\n          <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" checked>\n          <label class="trip-filters__filter-label" for="filter-past">Past</label>\n        </div>\n\n        <button class="visually-hidden" type="submit">Accept filter</button>\n      </form>'}},P),q.init()})()})();
//# sourceMappingURL=bundle.54adcdc2e5462f23a763.js.map