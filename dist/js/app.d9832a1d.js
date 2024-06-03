(function(){"use strict";var e={401:function(e,t,l){var i=l(9242),n=l(3396),a=l(4870),o=(l(560),l(7139)),s=l(3574),u=l(7098),c=l(3320),r=l(4268),d=l(7180),p=l(1649),f=l(681),v=l(6888),m=l(6407),k=l(2876),y=l(7435),w=l(2074),g=l(9058),h=l(1706),_=l(1106),b=l(5747),W=l(5599);const x={style:{"max-height":"70vh","overflow-y":"auto"}},S={style:{"margin-top":"20px"}},F={style:{display:"flex","justify-content":"center",gap:"10px","margin-top":"10px"}};var U={__name:"FileTreeModal",props:{visible:{type:Boolean,required:!0},treeData:{type:Array,required:!0},clickedFiles:{type:Array,required:!0}},emits:["update:visible","update:clickedFiles"],setup(e,{emit:t}){const l=e,i=t,s=(0,a.iH)(l.visible);(0,n.YP)((()=>l.visible),(e=>{s.value=e}));const u=()=>{i("update:visible",!1)},c=(0,a.iH)(r(l.treeData));function r(e){return e.map((e=>{const t={title:e.name,key:e.key};return e.isFolder&&e.children&&e.children.length&&(t.children=r(e.children)),t}))}(0,n.YP)((()=>l.treeData),(e=>{c.value=r(e)}));const d=(e,t)=>{const n=e[0];if(!t.node.children){const e=l.clickedFiles.indexOf(n),t=[...l.clickedFiles];-1!==e&&t.splice(e,1),n&&t.push(n),i("update:clickedFiles",t)}},p=e=>{if(e>0){const t=[...l.clickedFiles],n=t[e];t.splice(e,1),t.splice(e-1,0,n),i("update:clickedFiles",t)}},v=e=>{if(e<l.clickedFiles.length-1){const t=[...l.clickedFiles],n=t[e];t.splice(e,1),t.splice(e+1,0,n),i("update:clickedFiles",t)}},m=e=>{if(e>0){const t=[...l.clickedFiles],[n]=t.splice(e,1);t.unshift(n),i("update:clickedFiles",t)}},k=e=>{if(e<l.clickedFiles.length-1){const t=[...l.clickedFiles],[n]=t.splice(e,1);t.push(n),i("update:clickedFiles",t)}},y=e=>{const t=[...l.clickedFiles];t.splice(e,1),i("update:clickedFiles",t)},w=()=>{i("update:clickedFiles",[])};return(t,l)=>{const i=(0,n.up)("a-tree"),r=(0,n.up)("a-empty"),U=(0,n.up)("a-tooltip"),C=(0,n.up)("a-list-item"),Z=(0,n.up)("a-list"),j=(0,n.up)("a-button"),D=(0,n.up)("a-modal");return(0,n.wg)(),(0,n.j4)(D,{visible:s.value,"onUpdate:visible":l[0]||(l[0]=e=>s.value=e),title:"上下文",onCancel:u,width:"90vw",footer:null},{default:(0,n.w5)((()=>[(0,n._)("div",x,[(0,n.Wm)(i,{treeData:c.value,defaultExpandAll:!1,onSelect:d},null,8,["treeData"]),(0,n._)("div",S,[0===e.clickedFiles.length?((0,n.wg)(),(0,n.j4)(r,{key:0,description:"点击选择上下文"})):((0,n.wg)(),(0,n.j4)(Z,{key:1,dataSource:e.clickedFiles,bordered:""},{default:(0,n.w5)((()=>[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(e.clickedFiles,((e,t)=>((0,n.wg)(),(0,n.j4)(C,{key:e},{default:(0,n.w5)((()=>[(0,n._)("span",null,(0,o.zw)(e),1)])),actions:(0,n.w5)((()=>[(0,n.Wm)(U,{title:"置顶"},{default:(0,n.w5)((()=>[(0,n.Wm)((0,a.SU)(g.Z),{onClick:e=>m(t)},null,8,["onClick"])])),_:2},1024),(0,n.Wm)(U,{title:"置底"},{default:(0,n.w5)((()=>[(0,n.Wm)((0,a.SU)(h.Z),{onClick:e=>k(t)},null,8,["onClick"])])),_:2},1024),(0,n.Wm)(U,{title:"上移"},{default:(0,n.w5)((()=>[(0,n.Wm)((0,a.SU)(_.Z),{onClick:e=>p(t)},null,8,["onClick"])])),_:2},1024),(0,n.Wm)(U,{title:"下移"},{default:(0,n.w5)((()=>[(0,n.Wm)((0,a.SU)(b.Z),{onClick:e=>v(t)},null,8,["onClick"])])),_:2},1024),(0,n.Wm)(U,{title:"删除"},{default:(0,n.w5)((()=>[(0,n.Wm)((0,a.SU)(f.Z),{onClick:e=>y(t)},null,8,["onClick"])])),_:2},1024)])),_:2},1024)))),128))])),_:1},8,["dataSource"])),(0,n._)("div",F,[(0,n.Wm)(j,{type:"primary",onClick:w},{default:(0,n.w5)((()=>[(0,n.Wm)((0,a.SU)(f.Z)),(0,n.Uk)(" 清空上下文 ")])),_:1}),(0,n.Wm)(j,{type:"primary",danger:"",onClick:u},{default:(0,n.w5)((()=>[(0,n.Wm)((0,a.SU)(W.Z)),(0,n.Uk)(" 关闭 ")])),_:1})])])])])),_:1},8,["visible"])}}},C=l(89);const Z=(0,C.Z)(U,[["__scopeId","data-v-75dc5df0"]]);var j=Z;const D={class:"bottom-box"},O={class:"mode-box"},P={class:"question-box"},H={key:1,class:"pre-container"},M={key:"comment-basic-like"},z={key:"comment-basic-like"},E={key:"comment-basic-like"},A={key:"comment-basic-dislike"},q={key:1,class:"empty-container"};var T={__name:"Home",setup(e){const t=y.Z.PRESENTED_IMAGE_SIMPLE;let l;l=window.acquireVsCodeApi?window.acquireVsCodeApi():{postMessage:e=>{console.log("postMessage",e)},setState:e=>{console.log("setState",e)},getState:()=>({history:[]})};const i=(0,a.iH)(null),g=(0,a.iH)(null),h=(0,a.iH)(""),_=(0,a.iH)([]),b=(0,a.iH)(!1),W=(0,a.iH)(!1),x=(0,a.iH)([]),S=(0,a.iH)([]),F=(0,a.iH)("完整代码"),U=()=>{l.postMessage({command:"currentFile"}),T()},C=()=>{l.postMessage({command:"files"}),W.value=!0},Z=()=>{S.value=[],T()},T=()=>{_.value=_.value.filter((e=>"system"===e.role)),J()},Y=e=>{navigator.clipboard.writeText(e).then((function(){w.ZP.info("复制成功")}),(function(e){console.error("无法复制内容: ",e)}))},I=e=>{_.value.splice(e,1)},N=e=>{let t="";for(let l=0;l<=e;l++)t+=_.value[l].content+"\n\n";navigator.clipboard.writeText(t).then((function(){w.ZP.info("复制成功")}),(function(e){console.error("无法复制内容: ",e)}))},K=e=>{if(!b.value){if(e)_.value.pop();else{if(!h.value)return;let e=h.value;F.value.includes("完整")?e+="\n\n请生成完整的代码。":F.value.includes("片段")&&(e+="\n\n只需要告诉我应该怎么修改，不需要生成完整的代码。"),_.value.push({role:"user",content:e}),h.value=""}b.value=!0,l.postMessage({command:"fetch",messages:JSON.stringify(_.value)})}},V=()=>l.postMessage({command:"abort"}),J=()=>l.postMessage({command:"systemPrompt",clickedFiles:JSON.stringify(S.value)}),R=async e=>{"Enter"===e.key&&(e.shiftKey||!h.value||b.value||(e.preventDefault(),await K()))};(0,n.bv)((()=>{(0,n.YP)(_,(()=>{B(),(0,n.Y3)((()=>{const e=i.value;e&&(e.scrollTop=e.scrollHeight)}))}),{deep:!0}),(0,n.YP)(S,(()=>{B(),J()}),{deep:!0}),window.addEventListener("message",(e=>{const{data:t}=e;switch(t.command){case"response":{let e=t.text;_.value.length>0&&"assistant"===_.value[_.value.length-1].role?_.value[_.value.length-1].content+=e:_.value.push({role:"assistant",content:e}),t.finished&&(b.value=!1);break}case"reload":L();break;case"files":x.value=JSON.parse(t.files),G();break;case"currentFile":S.value=t.currentFile?[t.currentFile]:[],J();break;case"systemPrompt":{const{prompt:e}=t;0===_.value.length?_.value.push({role:"system",content:e}):"system"===_.value[0].role?_.value[0].content=e:_.value.unshift({role:"system",content:e});break}default:break}}))}));const B=()=>{console.log("save",_.value,S.value),l.setState({history:_.value,clickedFiles:S.value})},L=()=>{let e=l.getState();console.log("load",e),e&&(_.value=e.history||[],S.value=e.clickedFiles||[])},G=()=>{const e=t=>{let l=[];return t.forEach((t=>{l.push(t.key),t.isFolder&&t.children.length>0&&(l=l.concat(e(t.children)))})),l},t=e(x.value);S.value=S.value.filter((e=>t.includes(e)))};return(e,l)=>{const y=(0,n.up)("a-tooltip"),w=(0,n.up)("a-select-option"),J=(0,n.up)("a-select"),B=(0,n.up)("a-textarea"),L=(0,n.up)("a-avatar"),G=(0,n.up)("MdPreview"),Q=(0,n.up)("a-comment"),X=(0,n.up)("a-empty");return(0,n.wg)(),(0,n.iD)("div",null,[(0,n._)("div",D,[(0,n._)("div",O,[(0,n.Wm)(y,{title:"快速上下文"},{default:(0,n.w5)((()=>[(0,n.Wm)((0,a.SU)(s.Z),{onClick:U,style:{"font-size":"20px","margin-right":"12px"}})])),_:1}),(0,n.Wm)(y,{title:"设置上下文"},{default:(0,n.w5)((()=>[(0,n.Wm)((0,a.SU)(u.Z),{onClick:C,style:{"font-size":"20px","margin-right":"12px"}})])),_:1}),(0,n.Wm)(y,{title:"清除全部"},{default:(0,n.w5)((()=>[(0,n.Wm)((0,a.SU)(c.Z),{onClick:Z,style:{"font-size":"20px","margin-right":"12px"}})])),_:1}),(0,n.Wm)(y,{title:"清除聊天"},{default:(0,n.w5)((()=>[(0,n.Wm)((0,a.SU)(r.Z),{onClick:T,style:{"font-size":"20px","margin-right":"12px"}})])),_:1}),(0,n.Wm)(J,{value:F.value,"onUpdate:value":l[0]||(l[0]=e=>F.value=e),style:{width:"100px"}},{default:(0,n.w5)((()=>[(0,n.Wm)(w,{value:"完整代码"},{default:(0,n.w5)((()=>[(0,n.Uk)("完整代码")])),_:1}),(0,n.Wm)(w,{value:"片段修改"},{default:(0,n.w5)((()=>[(0,n.Uk)("片段修改")])),_:1}),(0,n.Wm)(w,{value:"聊天"},{default:(0,n.w5)((()=>[(0,n.Uk)("聊天")])),_:1})])),_:1},8,["value"])]),(0,n._)("div",P,[(0,n.Wm)(B,{value:h.value,"onUpdate:value":l[1]||(l[1]=e=>h.value=e),placeholder:"Enter发送, Shift+Enter换行","auto-size":{maxRows:5,minRows:1},style:{flex:"1",margin:"0 12px"},onKeydown:R,ref_key:"textArea",ref:g},null,8,["value"]),b.value?((0,n.wg)(),(0,n.j4)(y,{key:1,title:"终止"},{default:(0,n.w5)((()=>[(0,n.Wm)((0,a.SU)(p.Z),{onClick:V,style:{"font-size":"20px"}})])),_:1})):((0,n.wg)(),(0,n.j4)(y,{key:0,title:"发送"},{default:(0,n.w5)((()=>[(0,n.Wm)((0,a.SU)(d.Z),{onClick:l[2]||(l[2]=e=>K(!1)),style:{"font-size":"20px"}})])),_:1}))])]),_.value.length>0?((0,n.wg)(),(0,n.iD)("div",{key:0,class:"display-box",ref_key:"displayBox",ref:i},[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(_.value,((e,t)=>((0,n.wg)(),(0,n.j4)(Q,{key:t},(0,n.Nv)({content:(0,n.w5)((()=>["user"!==e.role?((0,n.wg)(),(0,n.j4)(G,{key:0,modelValue:e.content,theme:"dark",codeFoldable:!1},null,8,["modelValue"])):((0,n.wg)(),(0,n.iD)("pre",H,(0,o.zw)(e.content),1))])),actions:(0,n.w5)((()=>["system"!==e.role?((0,n.wg)(),(0,n.iD)("span",M,[(0,n.Wm)(y,{title:"删除"},{default:(0,n.w5)((()=>[(0,n.Wm)((0,a.SU)(f.Z),{style:{"font-size":"16px"},onClick:e=>I(t)},null,8,["onClick"])])),_:2},1024)])):(0,n.kq)("",!0),(0,n._)("span",z,[(0,n.Wm)(y,{title:"复制"},{default:(0,n.w5)((()=>[(0,n.Wm)((0,a.SU)(v.Z),{style:{"font-size":"16px"},onClick:t=>Y(e.content)},null,8,["onClick"])])),_:2},1024)]),"system"!==e.role?((0,n.wg)(),(0,n.iD)("span",E,[(0,n.Wm)(y,{title:"复制至此"},{default:(0,n.w5)((()=>[(0,n.Wm)((0,a.SU)(m.Z),{style:{"font-size":"16px"},onClick:e=>N(t)},null,8,["onClick"])])),_:2},1024)])):(0,n.kq)("",!0),"assistant"===e.role&&t===_.value.length-1?((0,n.wg)(),(0,n.iD)("span",A,[(0,n.Wm)(y,{title:"重新生成"},{default:(0,n.w5)((()=>[(0,n.Wm)((0,a.SU)(k.Z),{style:{"font-size":"16px"},onClick:l[3]||(l[3]=e=>K(!0))})])),_:1})])):(0,n.kq)("",!0)])),_:2},["user"===e.role?{name:"author",fn:(0,n.w5)((()=>[(0,n.Uk)("我")])),key:"0"}:"assistant"===e.role?{name:"author",fn:(0,n.w5)((()=>[(0,n.Uk)("AI助手")])),key:"1"}:{name:"author",fn:(0,n.w5)((()=>[(0,n.Uk)("系统")])),key:"2"},"user"===e.role?{name:"avatar",fn:(0,n.w5)((()=>[(0,n.Wm)(L,{style:{color:"#f56a00","background-color":"#fde3cf"}},{default:(0,n.w5)((()=>[(0,n.Uk)("Q")])),_:1})])),key:"3"}:"assistant"===e.role?{name:"avatar",fn:(0,n.w5)((()=>[(0,n.Wm)(L,{style:{color:"#87ceeb","background-color":"#a0ffff"}},{default:(0,n.w5)((()=>[(0,n.Uk)("A")])),_:1})])),key:"4"}:{name:"avatar",fn:(0,n.w5)((()=>[(0,n.Wm)(L,{style:{color:"#ffffff","background-color":"#ffa500"}},{default:(0,n.w5)((()=>[(0,n.Uk)("S")])),_:1})])),key:"5"}]),1024)))),128))],512)):((0,n.wg)(),(0,n.iD)("div",q,[(0,n.Wm)(X,{image:(0,a.SU)(t),description:"暂无内容"},null,8,["image"])])),(0,n.Wm)(j,{visible:W.value,treeData:x.value,clickedFiles:S.value,"onUpdate:visible":l[4]||(l[4]=e=>W.value=e),"onUpdate:clickedFiles":l[5]||(l[5]=e=>{S.value=e,T()})},null,8,["visible","treeData","clickedFiles"])])}}};const Y=(0,C.Z)(T,[["__scopeId","data-v-d75dc402"]]);var I=Y,N=l(9805),K=l(7334),V={__name:"App",setup(e){return(e,t)=>{const l=(0,n.up)("a-app"),i=(0,n.up)("a-config-provider");return(0,n.wg)(),(0,n.j4)(i,{locale:(0,a.SU)(N.Z),theme:{algorithm:(0,a.SU)(K.Z).darkAlgorithm}},{default:(0,n.w5)((()=>[(0,n.Wm)(l,null,{default:(0,n.w5)((()=>[(0,n.Wm)(I)])),_:1})])),_:1},8,["locale","theme"])}}};const J=V;var R=J,B=l(3825),L=(l(7424),l(9716));l(1849);const G=(0,i.ri)(R);G.use(B.M),G.use(L.ZP),G.mount("#app")}},t={};function l(i){var n=t[i];if(void 0!==n)return n.exports;var a=t[i]={exports:{}};return e[i].call(a.exports,a,a.exports,l),a.exports}l.m=e,function(){var e=[];l.O=function(t,i,n,a){if(!i){var o=1/0;for(r=0;r<e.length;r++){i=e[r][0],n=e[r][1],a=e[r][2];for(var s=!0,u=0;u<i.length;u++)(!1&a||o>=a)&&Object.keys(l.O).every((function(e){return l.O[e](i[u])}))?i.splice(u--,1):(s=!1,a<o&&(o=a));if(s){e.splice(r--,1);var c=n();void 0!==c&&(t=c)}}return t}a=a||0;for(var r=e.length;r>0&&e[r-1][2]>a;r--)e[r]=e[r-1];e[r]=[i,n,a]}}(),function(){l.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(t,{a:t}),t}}(),function(){l.d=function(e,t){for(var i in t)l.o(t,i)&&!l.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})}}(),function(){l.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={143:0};l.O.j=function(t){return 0===e[t]};var t=function(t,i){var n,a,o=i[0],s=i[1],u=i[2],c=0;if(o.some((function(t){return 0!==e[t]}))){for(n in s)l.o(s,n)&&(l.m[n]=s[n]);if(u)var r=u(l)}for(t&&t(i);c<o.length;c++)a=o[c],l.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return l.O(r)},i=self["webpackChunksimple_vue"]=self["webpackChunksimple_vue"]||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))}();var i=l.O(void 0,[998],(function(){return l(401)}));i=l.O(i)})();
//# sourceMappingURL=app.d9832a1d.js.map