(function(){"use strict";var e={2543:function(e,t,n){var a=n(9242),l=n(3396),o=n(4870),r=(n(560),n(7139)),u=n(4213),i=n(4268),s=n(7180),c=n(1649),v=n(7435);const f={class:"quesiton-box"},d={key:1,class:"empty-container"};var p={__name:"Home",setup(e){const t=v.Z.PRESENTED_IMAGE_SIMPLE,n=(0,o.iH)("en"),a=(0,o.qj)({questionPlaceholder:{zh:"输入您的代码问题",en:"Enter your code question"},user:{zh:"我",en:"User"},assistant:{zh:"AI助手",en:"AI Assistant"},noContent:{zh:"暂无内容",en:"No Content"}}),p=(0,l.Fl)((()=>a.questionPlaceholder[n.value])),m=(0,l.Fl)((()=>a.user[n.value])),h=(0,l.Fl)((()=>a.assistant[n.value])),g=(0,l.Fl)((()=>a.noContent[n.value])),y=window.acquireVsCodeApi(),w=(0,o.iH)(null),k=(0,o.iH)(null),b=(0,o.iH)(""),_=(0,o.iH)([]),x=(0,o.iH)(!1);let S=!0;const O=()=>{n.value="zh"===n.value?"en":"zh",y.setState({langFlag:n.value})},j=()=>{_.value=[],H()},z=()=>{b.value&&!x.value&&(_.value.push({role:"user",content:b.value}),b.value="",x.value=!0,S=!0,(0,l.Y3)((()=>{y.postMessage({command:"fetch",messages:JSON.stringify(_.value)})})))},U=()=>{y.postMessage({command:"abort-fetch"}),x.value=!1,H()},P=async e=>{"Enter"===e.key&&(e.preventDefault(),e.shiftKey?b.value+="\n":b.value&&!x.value&&await z())};(0,l.bv)((()=>{(0,l.YP)(_,(()=>{S&&(0,l.Y3)((()=>{const e=w.value;e.scrollTop=e.scrollHeight}))}),{immediate:!0,deep:!0}),(0,l.YP)(b,(()=>{(0,l.Y3)((()=>{const e=k.value.$el;e.scrollTop=e.scrollHeight}))}),{immediate:!0,deep:!0}),window.addEventListener("message",(e=>{const{data:t}=e;switch(t.command){case"response":{let e=t.text;_.value.length>0&&"assistant"===_.value[_.value.length-1].role?_.value[_.value.length-1].content+=e:_.value.push({role:"assistant",content:e}),t.finished&&(x.value=!1,H());break}case"reload":C();break;case"select":b.value=t.text?t.text+"\r\n":"";break;default:break}}))}));const H=()=>{y.setState({history:_.value})},C=()=>{let e=y.getState();e&&(_.value=e.history||[],n.value=e.langFlag||"en")},A=()=>{const e=w.value;S=(e.scrollTop,e.scrollHeight,!0)};return(e,n)=>{const a=(0,l.up)("a-textarea"),v=(0,l.up)("a-avatar"),y=(0,l.up)("MdPreview"),S=(0,l.up)("a-comment"),H=(0,l.up)("a-empty");return(0,l.wg)(),(0,l.iD)("div",null,[(0,l._)("div",f,[(0,l.Wm)((0,o.SU)(u.Z),{onClick:O,style:{"font-size":"20px","margin-right":"12px"}}),(0,l.Wm)((0,o.SU)(i.Z),{onClick:j,style:{"font-size":"20px"}}),(0,l.Wm)(a,{value:b.value,"onUpdate:value":n[0]||(n[0]=e=>b.value=e),placeholder:p.value,maxlength:4e3,"auto-size":{maxRows:5},style:{width:"86vw",margin:"0 12px"},onKeydown:P,ref_key:"textArea",ref:k},null,8,["value","placeholder"]),x.value?((0,l.wg)(),(0,l.j4)((0,o.SU)(c.Z),{key:1,onClick:U,style:{"font-size":"20px"}})):((0,l.wg)(),(0,l.j4)((0,o.SU)(s.Z),{key:0,onClick:z,style:{"font-size":"20px"}}))]),_.value.length>0?((0,l.wg)(),(0,l.iD)("div",{key:0,class:"display-box",ref_key:"displayBox",ref:w,onScroll:A},[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(_.value,((e,t)=>((0,l.wg)(),(0,l.j4)(S,{key:t},(0,l.Nv)({content:(0,l.w5)((()=>[(0,l.Wm)(y,{modelValue:e.content,theme:"dark"},null,8,["modelValue"])])),_:2},["user"===e.role?{name:"author",fn:(0,l.w5)((()=>[(0,l.Uk)((0,r.zw)(m.value),1)])),key:"0"}:{name:"author",fn:(0,l.w5)((()=>[(0,l.Uk)((0,r.zw)(h.value),1)])),key:"1"},"user"===e.role?{name:"avatar",fn:(0,l.w5)((()=>[(0,l.Wm)(v,{style:{color:"#f56a00","background-color":"#fde3cf"}},{default:(0,l.w5)((()=>[(0,l.Uk)("Q")])),_:1})])),key:"2"}:{name:"avatar",fn:(0,l.w5)((()=>[(0,l.Wm)(v,{style:{color:"#87ceeb","background-color":"#a0ffff"}},{default:(0,l.w5)((()=>[(0,l.Uk)("A")])),_:1})])),key:"3"}]),1024)))),128))],544)):((0,l.wg)(),(0,l.iD)("div",d,[(0,l.Wm)(H,{image:(0,o.SU)(t),description:g.value},null,8,["image","description"])]))])}}},m=n(89);const h=(0,m.Z)(p,[["__scopeId","data-v-45256f95"]]);var g=h,y=n(9805),w=n(7334),k={__name:"App",setup(e){return(e,t)=>{const n=(0,l.up)("a-app"),a=(0,l.up)("a-config-provider");return(0,l.wg)(),(0,l.j4)(a,{locale:(0,o.SU)(y.Z),theme:{algorithm:(0,o.SU)(w.Z).darkAlgorithm}},{default:(0,l.w5)((()=>[(0,l.Wm)(n,null,{default:(0,l.w5)((()=>[(0,l.Wm)(g)])),_:1})])),_:1},8,["locale","theme"])}}};const b=k;var _=b,x=n(3706),S=(n(7424),n(5419));n(1849);const O=(0,a.ri)(_);O.use(x.M),O.use(S.ZP),O.mount("#app")}},t={};function n(a){var l=t[a];if(void 0!==l)return l.exports;var o=t[a]={exports:{}};return e[a].call(o.exports,o,o.exports,n),o.exports}n.m=e,function(){var e=[];n.O=function(t,a,l,o){if(!a){var r=1/0;for(c=0;c<e.length;c++){a=e[c][0],l=e[c][1],o=e[c][2];for(var u=!0,i=0;i<a.length;i++)(!1&o||r>=o)&&Object.keys(n.O).every((function(e){return n.O[e](a[i])}))?a.splice(i--,1):(u=!1,o<r&&(r=o));if(u){e.splice(c--,1);var s=l();void 0!==s&&(t=s)}}return t}o=o||0;for(var c=e.length;c>0&&e[c-1][2]>o;c--)e[c]=e[c-1];e[c]=[a,l,o]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var a in t)n.o(t,a)&&!n.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={143:0};n.O.j=function(t){return 0===e[t]};var t=function(t,a){var l,o,r=a[0],u=a[1],i=a[2],s=0;if(r.some((function(t){return 0!==e[t]}))){for(l in u)n.o(u,l)&&(n.m[l]=u[l]);if(i)var c=i(n)}for(t&&t(a);s<r.length;s++)o=r[s],n.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return n.O(c)},a=self["webpackChunksimple_vue"]=self["webpackChunksimple_vue"]||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))}();var a=n.O(void 0,[998],(function(){return n(2543)}));a=n.O(a)})();
//# sourceMappingURL=app.ad36392b.js.map