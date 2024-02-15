(function(){"use strict";var e={2020:function(e,t,n){var a=n(9242),l=n(3396),o=n(4870),r=(n(560),n(7139)),u=n(4268),i=n(7180),s=n(1649),c=n(6888),f=n(2876),v=n(7435),p=n(2074);const d={class:"quesiton-box"},m={key:"comment-basic-like"},h={key:"comment-basic-dislike"},g={key:1,class:"empty-container"};var y={__name:"Home",setup(e){const t=v.Z.PRESENTED_IMAGE_SIMPLE,n=(0,o.iH)("en"),a=(0,o.qj)({questionPlaceholder:{zh:"Enter发送, Shift+Enter换行",en:"Press Enter to send, Shift+Enter for a new line"},user:{zh:"我",en:"User"},assistant:{zh:"AI助手",en:"AI Assistant"},noContent:{zh:"暂无内容",en:"No Content"}}),y=(0,l.Fl)((()=>a.questionPlaceholder[n.value])),w=(0,l.Fl)((()=>a.user[n.value])),k=(0,l.Fl)((()=>a.assistant[n.value])),b=(0,l.Fl)((()=>a.noContent[n.value])),_=window.acquireVsCodeApi(),x=(0,o.iH)(null),S=(0,o.iH)(null),O=(0,o.iH)(""),U=(0,o.iH)(8192),j=(0,o.iH)([]),C=(0,o.iH)(!1),P=()=>{j.value=[],Z()},z=e=>{navigator.clipboard.writeText(e).then((function(){p.ZP.info("复制成功")}),(function(e){console.error("无法复制内容: ",e)}))},E=e=>{if(C.value)return;if(e)j.value.pop();else{if(!O.value)return;j.value.push({role:"user",content:O.value}),O.value=""}C.value=!0;let t=j.value.reduce(((e,t)=>e+t.content.length),0);while(t>U.value&&j.value.length>1)j.value.shift(),j.value.shift(),t=j.value.reduce(((e,t)=>e+t.content.length),0);(0,l.Y3)((()=>{_.postMessage({command:"fetch",messages:JSON.stringify(j.value)})}))},W=()=>{_.postMessage({command:"abort-fetch"})},H=async e=>{"Enter"===e.key&&(e.shiftKey||!O.value||C.value||(e.preventDefault(),await E()))};(0,l.bv)((()=>{(0,l.YP)(j,(()=>{(0,l.Y3)((()=>{const e=x.value;e.scrollTop=e.scrollHeight}))}),{immediate:!0,deep:!0}),window.addEventListener("message",(e=>{const{data:t}=e;switch(t.command){case"response":{let e=t.text;j.value.length>0&&"assistant"===j.value[j.value.length-1].role?j.value[j.value.length-1].content+=e:j.value.push({role:"assistant",content:e}),t.finished&&(C.value=!1,Z());break}case"reload":A(),U.value=t.maxLength||8192;break;case"select":t.text&&(O.value+=(O.value?"\r\n":"")+t.text+"\r\n",(0,l.Y3)((()=>{const e=S.value.$el;e.scrollTop=e.scrollHeight})));break;default:break}}))}));const Z=()=>{_.setState({history:j.value})},A=()=>{let e=_.getState();e&&(j.value=e.history||[],n.value=e.langFlag||"en")};return(e,n)=>{const a=(0,l.up)("a-textarea"),v=(0,l.up)("a-avatar"),p=(0,l.up)("MdPreview"),_=(0,l.up)("a-tooltip"),Z=(0,l.up)("a-comment"),A=(0,l.up)("a-empty");return(0,l.wg)(),(0,l.iD)("div",null,[(0,l._)("div",d,[(0,l.Wm)((0,o.SU)(u.Z),{onClick:P,style:{"font-size":"20px"}}),(0,l.Wm)(a,{value:O.value,"onUpdate:value":n[0]||(n[0]=e=>O.value=e),placeholder:y.value,maxlength:U.value,"auto-size":{maxRows:5},style:{width:"88vw",margin:"0 12px"},onKeydown:H,ref_key:"textArea",ref:S},null,8,["value","placeholder","maxlength"]),C.value?((0,l.wg)(),(0,l.j4)((0,o.SU)(s.Z),{key:1,onClick:W,style:{"font-size":"20px"}})):((0,l.wg)(),(0,l.j4)((0,o.SU)(i.Z),{key:0,onClick:n[1]||(n[1]=e=>E(!1)),style:{"font-size":"20px"}}))]),j.value.length>0?((0,l.wg)(),(0,l.iD)("div",{key:0,class:"display-box",ref_key:"displayBox",ref:x},[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(j.value,((e,t)=>((0,l.wg)(),(0,l.j4)(Z,{key:t},(0,l.Nv)({content:(0,l.w5)((()=>[(0,l.Wm)(p,{modelValue:e.content,theme:"dark"},null,8,["modelValue"])])),actions:(0,l.w5)((()=>[(0,l._)("span",m,[(0,l.Wm)(_,{title:"Copy"},{default:(0,l.w5)((()=>[(0,l.Wm)((0,o.SU)(c.Z),{style:{"font-size":"16px"},onClick:t=>z(e.content)},null,8,["onClick"])])),_:2},1024)]),"assistant"===e.role&&t==j.value.length-1?((0,l.wg)(),(0,l.iD)("span",h,[(0,l.Wm)(_,{title:"Regenerate"},{default:(0,l.w5)((()=>[(0,l.Wm)((0,o.SU)(f.Z),{style:{"font-size":"16px"},onClick:n[2]||(n[2]=e=>E(!0))})])),_:1})])):(0,l.kq)("",!0)])),_:2},["user"===e.role?{name:"author",fn:(0,l.w5)((()=>[(0,l.Uk)((0,r.zw)(w.value),1)])),key:"0"}:{name:"author",fn:(0,l.w5)((()=>[(0,l.Uk)((0,r.zw)(k.value),1)])),key:"1"},"user"===e.role?{name:"avatar",fn:(0,l.w5)((()=>[(0,l.Wm)(v,{style:{color:"#f56a00","background-color":"#fde3cf"}},{default:(0,l.w5)((()=>[(0,l.Uk)("Q")])),_:1})])),key:"2"}:{name:"avatar",fn:(0,l.w5)((()=>[(0,l.Wm)(v,{style:{color:"#87ceeb","background-color":"#a0ffff"}},{default:(0,l.w5)((()=>[(0,l.Uk)("A")])),_:1})])),key:"3"}]),1024)))),128))],512)):((0,l.wg)(),(0,l.iD)("div",g,[(0,l.Wm)(A,{image:(0,o.SU)(t),description:b.value},null,8,["image","description"])]))])}}},w=n(89);const k=(0,w.Z)(y,[["__scopeId","data-v-0570f9ff"]]);var b=k,_=n(9805),x=n(7334),S={__name:"App",setup(e){return(e,t)=>{const n=(0,l.up)("a-app"),a=(0,l.up)("a-config-provider");return(0,l.wg)(),(0,l.j4)(a,{locale:(0,o.SU)(_.Z),theme:{algorithm:(0,o.SU)(x.Z).darkAlgorithm}},{default:(0,l.w5)((()=>[(0,l.Wm)(n,null,{default:(0,l.w5)((()=>[(0,l.Wm)(b)])),_:1})])),_:1},8,["locale","theme"])}}};const O=S;var U=O,j=n(3706),C=(n(7424),n(1281));n(1849);const P=(0,a.ri)(U);P.use(j.M),P.use(C.ZP),P.mount("#app")}},t={};function n(a){var l=t[a];if(void 0!==l)return l.exports;var o=t[a]={exports:{}};return e[a].call(o.exports,o,o.exports,n),o.exports}n.m=e,function(){var e=[];n.O=function(t,a,l,o){if(!a){var r=1/0;for(c=0;c<e.length;c++){a=e[c][0],l=e[c][1],o=e[c][2];for(var u=!0,i=0;i<a.length;i++)(!1&o||r>=o)&&Object.keys(n.O).every((function(e){return n.O[e](a[i])}))?a.splice(i--,1):(u=!1,o<r&&(r=o));if(u){e.splice(c--,1);var s=l();void 0!==s&&(t=s)}}return t}o=o||0;for(var c=e.length;c>0&&e[c-1][2]>o;c--)e[c]=e[c-1];e[c]=[a,l,o]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var a in t)n.o(t,a)&&!n.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={143:0};n.O.j=function(t){return 0===e[t]};var t=function(t,a){var l,o,r=a[0],u=a[1],i=a[2],s=0;if(r.some((function(t){return 0!==e[t]}))){for(l in u)n.o(u,l)&&(n.m[l]=u[l]);if(i)var c=i(n)}for(t&&t(a);s<r.length;s++)o=r[s],n.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return n.O(c)},a=self["webpackChunksimple_vue"]=self["webpackChunksimple_vue"]||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))}();var a=n.O(void 0,[998],(function(){return n(2020)}));a=n.O(a)})();
//# sourceMappingURL=app.5dff96f9.js.map