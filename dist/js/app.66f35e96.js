(function(){"use strict";var e={3397:function(e,t,l){var n=l(9242),a=l(3396),i=l(4870),o=(l(560),l(7139)),s=l(7098),r=l(4268),c=l(7180),u=l(1649),d=l(6888),p=l(2876),f=l(7435),v=l(2074),m=l(1106),k=l(5747),y=l(681);const g={style:{"max-height":"80vh","overflow-y":"auto"}},h={style:{"margin-top":"20px"}};var w={__name:"FileTreeModal",props:{visible:{type:Boolean,required:!0},treeData:{type:Array,required:!0},clickedFiles:{type:Array,required:!0}},emits:["update:visible","update:clickedFiles"],setup(e,{emit:t}){const l=e,n=t,s=(0,i.iH)(l.visible);(0,a.YP)((()=>l.visible),(e=>{s.value=e}));const r=()=>{n("update:visible",!1)},c=(0,i.iH)(u(l.treeData));function u(e){return e.map((e=>{const t={title:e.name,key:e.key};return e.isFolder&&e.children&&e.children.length&&(t.children=u(e.children)),t}))}(0,a.YP)((()=>l.treeData),(e=>{c.value=u(e)}));const d=(e,t)=>{const a=e[0];if(!t.node.children){const e=l.clickedFiles.indexOf(a),t=[...l.clickedFiles];-1!==e&&t.splice(e,1),a&&t.push(a),n("update:clickedFiles",t)}},p=e=>{if(e>0){const t=[...l.clickedFiles],a=t[e];t.splice(e,1),t.splice(e-1,0,a),n("update:clickedFiles",t)}},f=e=>{if(e<l.clickedFiles.length-1){const t=[...l.clickedFiles],a=t[e];t.splice(e,1),t.splice(e+1,0,a),n("update:clickedFiles",t)}},v=e=>{const t=[...l.clickedFiles];t.splice(e,1),n("update:clickedFiles",t)},w=()=>{n("update:clickedFiles",[])};return(t,l)=>{const n=(0,a.up)("a-tree"),u=(0,a.up)("a-empty"),b=(0,a.up)("a-list-item"),_=(0,a.up)("a-list"),S=(0,a.up)("a-button"),F=(0,a.up)("a-modal");return(0,a.wg)(),(0,a.j4)(F,{visible:s.value,"onUpdate:visible":l[0]||(l[0]=e=>s.value=e),title:"上下文",onCancel:r,width:"90vw",footer:null},{default:(0,a.w5)((()=>[(0,a._)("div",g,[(0,a.Wm)(n,{treeData:c.value,defaultExpandAll:!1,onSelect:d},null,8,["treeData"]),(0,a._)("div",h,[0===e.clickedFiles.length?((0,a.wg)(),(0,a.j4)(u,{key:0,description:"点击选择上下文"})):((0,a.wg)(),(0,a.j4)(_,{key:1,dataSource:e.clickedFiles,bordered:""},{default:(0,a.w5)((()=>[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(e.clickedFiles,((e,t)=>((0,a.wg)(),(0,a.j4)(b,{key:e},{default:(0,a.w5)((()=>[(0,a._)("span",null,(0,o.zw)(e),1)])),actions:(0,a.w5)((()=>[(0,a.Wm)((0,i.SU)(m.Z),{onClick:e=>p(t)},null,8,["onClick"]),(0,a.Wm)((0,i.SU)(k.Z),{onClick:e=>f(t)},null,8,["onClick"]),(0,a.Wm)((0,i.SU)(y.Z),{onClick:e=>v(t)},null,8,["onClick"])])),_:2},1024)))),128))])),_:1},8,["dataSource"])),e.clickedFiles.length>0?((0,a.wg)(),(0,a.j4)(S,{key:2,type:"primary",onClick:w,style:{"margin-top":"10px",display:"block","margin-left":"auto","margin-right":"auto"}},{default:(0,a.w5)((()=>[(0,a.Wm)((0,i.SU)(y.Z)),(0,a.Uk)(" 清空上下文 ")])),_:1})):(0,a.kq)("",!0)])])])),_:1},8,["visible"])}}},b=l(89);const _=(0,b.Z)(w,[["__scopeId","data-v-be2cedd6"]]);var S=_;const F={class:"quesiton-box"},x={key:1,class:"pre-container"},U={key:"comment-basic-like"},C={key:"comment-basic-dislike"},W={key:1,class:"empty-container"};var j={__name:"Home",setup(e){const t=f.Z.PRESENTED_IMAGE_SIMPLE;let l;l=window.acquireVsCodeApi?window.acquireVsCodeApi():{postMessage:e=>{console.log("postMessage",e)},setState:e=>{console.log("setState",e)},getState:()=>({history:[]})};const n=(0,i.iH)(null),m=(0,i.iH)(null),k=(0,i.iH)(""),y=(0,i.iH)([]),g=(0,i.iH)(!1),h=(0,i.iH)(!1),w=(0,i.iH)([]),b=(0,i.iH)([]),_=()=>{l.postMessage({command:"files"}),h.value=!0},j=()=>{y.value=y.value.filter((e=>"system"===e.role)),P()},O=e=>{navigator.clipboard.writeText(e).then((function(){v.ZP.info("复制成功")}),(function(e){console.error("无法复制内容: ",e)}))},Z=e=>{if(!g.value){if(e)y.value.pop();else{if(!k.value)return;y.value.push({role:"user",content:k.value}),k.value=""}g.value=!0,l.postMessage({command:"fetch",messages:JSON.stringify(y.value)})}},D=()=>l.postMessage({command:"abort"}),P=()=>l.postMessage({command:"systemPrompt",clickedFiles:JSON.stringify(b.value)}),H=async e=>{"Enter"===e.key&&(e.shiftKey||!k.value||g.value||(e.preventDefault(),await Z()))};(0,a.bv)((()=>{(0,a.YP)(y,(()=>{M(),(0,a.Y3)((()=>{const e=n.value;e&&(e.scrollTop=e.scrollHeight)}))}),{deep:!0}),(0,a.YP)(b,(()=>{M(),P()}),{deep:!0}),P(),window.addEventListener("message",(e=>{const{data:t}=e;switch(t.command){case"response":{let e=t.text;y.value.length>0&&"assistant"===y.value[y.value.length-1].role?y.value[y.value.length-1].content+=e:y.value.push({role:"assistant",content:e}),t.finished&&(g.value=!1);break}case"reload":E();break;case"files":w.value=JSON.parse(t.files),A();break;case"systemPrompt":{const{prompt:e}=t;0===y.value.length?y.value.push({role:"system",content:e}):"system"===y.value[0].role?y.value[0].content=e:y.value.unshift({role:"system",content:e});break}default:break}}))}));const M=()=>{console.log("save",y.value,b.value),l.setState({history:y.value,clickedFiles:b.value})},E=()=>{let e=l.getState();console.log("load",e),e&&(y.value=e.history||[],b.value=e.clickedFiles||[])},A=()=>{const e=t=>{let l=[];return t.forEach((t=>{l.push(t.key),t.isFolder&&t.children.length>0&&(l=l.concat(e(t.children)))})),l},t=e(w.value);b.value=b.value.filter((e=>t.includes(e)))};return(e,l)=>{const f=(0,a.up)("a-textarea"),v=(0,a.up)("a-avatar"),P=(0,a.up)("MdPreview"),M=(0,a.up)("a-tooltip"),E=(0,a.up)("a-comment"),A=(0,a.up)("a-empty");return(0,a.wg)(),(0,a.iD)("div",null,[(0,a._)("div",F,[(0,a.Wm)((0,i.SU)(s.Z),{onClick:_,style:{"font-size":"20px","margin-right":"12px"}}),(0,a.Wm)((0,i.SU)(r.Z),{onClick:j,style:{"font-size":"20px"}}),(0,a.Wm)(f,{value:k.value,"onUpdate:value":l[0]||(l[0]=e=>k.value=e),placeholder:"Enter发送, Shift+Enter换行","auto-size":{maxRows:5},style:{width:"80vw",margin:"0 12px"},onKeydown:H,ref_key:"textArea",ref:m},null,8,["value"]),g.value?((0,a.wg)(),(0,a.j4)((0,i.SU)(u.Z),{key:1,onClick:D,style:{"font-size":"20px"}})):((0,a.wg)(),(0,a.j4)((0,i.SU)(c.Z),{key:0,onClick:l[1]||(l[1]=e=>Z(!1)),style:{"font-size":"20px"}}))]),y.value.length>0?((0,a.wg)(),(0,a.iD)("div",{key:0,class:"display-box",ref_key:"displayBox",ref:n},[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(y.value,((e,t)=>((0,a.wg)(),(0,a.j4)(E,{key:t},(0,a.Nv)({content:(0,a.w5)((()=>["user"!==e.role?((0,a.wg)(),(0,a.j4)(P,{key:0,modelValue:e.content,theme:"dark"},null,8,["modelValue"])):((0,a.wg)(),(0,a.iD)("pre",x,(0,o.zw)(e.content),1))])),actions:(0,a.w5)((()=>[(0,a._)("span",U,[(0,a.Wm)(M,{title:"复制"},{default:(0,a.w5)((()=>[(0,a.Wm)((0,i.SU)(d.Z),{style:{"font-size":"16px"},onClick:t=>O(e.content)},null,8,["onClick"])])),_:2},1024)]),"assistant"===e.role&&t===y.value.length-1?((0,a.wg)(),(0,a.iD)("span",C,[(0,a.Wm)(M,{title:"重新生成"},{default:(0,a.w5)((()=>[(0,a.Wm)((0,i.SU)(p.Z),{style:{"font-size":"16px"},onClick:l[2]||(l[2]=e=>Z(!0))})])),_:1})])):(0,a.kq)("",!0)])),_:2},["user"===e.role?{name:"author",fn:(0,a.w5)((()=>[(0,a.Uk)("我")])),key:"0"}:"assistant"===e.role?{name:"author",fn:(0,a.w5)((()=>[(0,a.Uk)("AI助手")])),key:"1"}:{name:"author",fn:(0,a.w5)((()=>[(0,a.Uk)("系统")])),key:"2"},"user"===e.role?{name:"avatar",fn:(0,a.w5)((()=>[(0,a.Wm)(v,{style:{color:"#f56a00","background-color":"#fde3cf"}},{default:(0,a.w5)((()=>[(0,a.Uk)("Q")])),_:1})])),key:"3"}:"assistant"===e.role?{name:"avatar",fn:(0,a.w5)((()=>[(0,a.Wm)(v,{style:{color:"#87ceeb","background-color":"#a0ffff"}},{default:(0,a.w5)((()=>[(0,a.Uk)("A")])),_:1})])),key:"4"}:{name:"avatar",fn:(0,a.w5)((()=>[(0,a.Wm)(v,{style:{color:"#ffffff","background-color":"#ffa500"}},{default:(0,a.w5)((()=>[(0,a.Uk)("S")])),_:1})])),key:"5"}]),1024)))),128))],512)):((0,a.wg)(),(0,a.iD)("div",W,[(0,a.Wm)(A,{image:(0,i.SU)(t),description:"暂无内容"},null,8,["image"])])),(0,a.Wm)(S,{visible:h.value,treeData:w.value,clickedFiles:b.value,"onUpdate:visible":l[3]||(l[3]=e=>h.value=e),"onUpdate:clickedFiles":l[4]||(l[4]=e=>b.value=e)},null,8,["visible","treeData","clickedFiles"])])}}};const O=(0,b.Z)(j,[["__scopeId","data-v-f53486c6"]]);var Z=O,D=l(9805),P=l(7334),H={__name:"App",setup(e){return(e,t)=>{const l=(0,a.up)("a-app"),n=(0,a.up)("a-config-provider");return(0,a.wg)(),(0,a.j4)(n,{locale:(0,i.SU)(D.Z),theme:{algorithm:(0,i.SU)(P.Z).darkAlgorithm}},{default:(0,a.w5)((()=>[(0,a.Wm)(l,null,{default:(0,a.w5)((()=>[(0,a.Wm)(Z)])),_:1})])),_:1},8,["locale","theme"])}}};const M=H;var E=M,A=l(3706),z=(l(7424),l(9696));l(1849);const q=(0,n.ri)(E);q.use(A.M),q.use(z.ZP),q.mount("#app")}},t={};function l(n){var a=t[n];if(void 0!==a)return a.exports;var i=t[n]={exports:{}};return e[n].call(i.exports,i,i.exports,l),i.exports}l.m=e,function(){var e=[];l.O=function(t,n,a,i){if(!n){var o=1/0;for(u=0;u<e.length;u++){n=e[u][0],a=e[u][1],i=e[u][2];for(var s=!0,r=0;r<n.length;r++)(!1&i||o>=i)&&Object.keys(l.O).every((function(e){return l.O[e](n[r])}))?n.splice(r--,1):(s=!1,i<o&&(o=i));if(s){e.splice(u--,1);var c=a();void 0!==c&&(t=c)}}return t}i=i||0;for(var u=e.length;u>0&&e[u-1][2]>i;u--)e[u]=e[u-1];e[u]=[n,a,i]}}(),function(){l.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(t,{a:t}),t}}(),function(){l.d=function(e,t){for(var n in t)l.o(t,n)&&!l.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){l.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={143:0};l.O.j=function(t){return 0===e[t]};var t=function(t,n){var a,i,o=n[0],s=n[1],r=n[2],c=0;if(o.some((function(t){return 0!==e[t]}))){for(a in s)l.o(s,a)&&(l.m[a]=s[a]);if(r)var u=r(l)}for(t&&t(n);c<o.length;c++)i=o[c],l.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return l.O(u)},n=self["webpackChunksimple_vue"]=self["webpackChunksimple_vue"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=l.O(void 0,[998],(function(){return l(3397)}));n=l.O(n)})();
//# sourceMappingURL=app.66f35e96.js.map