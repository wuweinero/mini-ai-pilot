(function(){"use strict";var e={2977:function(e,l,t){var a=t(9242),i=t(3396),n=t(4870),o=(t(560),t(7139)),s=t(3574),u=t(7098),c=t(3320),r=t(4268),d=t(7180),p=t(1649),f=t(681),v=t(6888),m=t(6407),k=t(2876),g=t(7435),y=t(2074),w=t(9058),h=t(1706),_=t(1106),b=t(5747),W=t(5599);const x={style:{"max-height":"70vh","overflow-y":"auto"}},S={style:{"margin-top":"20px"}},F={class:"file-name"},U={style:{display:"flex","justify-content":"center",gap:"10px","margin-top":"10px"}};var C={__name:"FileTreeModal",props:{visible:{type:Boolean,required:!0},treeData:{type:Array,required:!0},clickedFiles:{type:Array,required:!0}},emits:["update:visible","update:clickedFiles"],setup(e,{emit:l}){const t=e,a=l,s=(0,n.iH)(t.visible);(0,i.YP)((()=>t.visible),(e=>{s.value=e}));const u=()=>{a("update:visible",!1)},c=(0,n.iH)(r(t.treeData));function r(e){return e.map((e=>{const l={title:e.name,key:e.key};return e.isFolder&&e.children&&e.children.length&&(l.children=r(e.children)),l}))}(0,i.YP)((()=>t.treeData),(e=>{c.value=r(e)}));const d=(e,l)=>{const i=e[0];if(!l.node.children){const e=t.clickedFiles.indexOf(i),l=[...t.clickedFiles];-1!==e&&l.splice(e,1),i&&l.push(i),a("update:clickedFiles",l)}},p=e=>{if(e>0){const l=[...t.clickedFiles],i=l[e];l.splice(e,1),l.splice(e-1,0,i),a("update:clickedFiles",l)}},v=e=>{if(e<t.clickedFiles.length-1){const l=[...t.clickedFiles],i=l[e];l.splice(e,1),l.splice(e+1,0,i),a("update:clickedFiles",l)}},m=e=>{if(e>0){const l=[...t.clickedFiles],[i]=l.splice(e,1);l.unshift(i),a("update:clickedFiles",l)}},k=e=>{if(e<t.clickedFiles.length-1){const l=[...t.clickedFiles],[i]=l.splice(e,1);l.push(i),a("update:clickedFiles",l)}},g=e=>{const l=[...t.clickedFiles];l.splice(e,1),a("update:clickedFiles",l)},y=()=>{a("update:clickedFiles",[])};return(l,t)=>{const a=(0,i.up)("a-tree"),r=(0,i.up)("a-empty"),C=(0,i.up)("a-tooltip"),Z=(0,i.up)("a-list-item"),H=(0,i.up)("a-list"),j=(0,i.up)("a-button"),D=(0,i.up)("a-modal");return(0,i.wg)(),(0,i.j4)(D,{open:s.value,"onUpdate:open":t[0]||(t[0]=e=>s.value=e),title:"上下文",onCancel:u,width:"90vw",footer:null},{default:(0,i.w5)((()=>[(0,i._)("div",x,[(0,i.Wm)(a,{treeData:c.value,defaultExpandAll:!1,onSelect:d},null,8,["treeData"]),(0,i._)("div",S,[0===e.clickedFiles.length?((0,i.wg)(),(0,i.j4)(r,{key:0,description:"点击选择上下文"})):((0,i.wg)(),(0,i.j4)(H,{key:1,dataSource:e.clickedFiles,bordered:""},{default:(0,i.w5)((()=>[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(e.clickedFiles,((e,l)=>((0,i.wg)(),(0,i.j4)(Z,{key:e},{default:(0,i.w5)((()=>[(0,i._)("span",F,(0,o.zw)(e),1)])),actions:(0,i.w5)((()=>[(0,i.Wm)(C,{title:"置顶"},{default:(0,i.w5)((()=>[(0,i.Wm)((0,n.SU)(w.Z),{onClick:e=>m(l)},null,8,["onClick"])])),_:2},1024),(0,i.Wm)(C,{title:"置底"},{default:(0,i.w5)((()=>[(0,i.Wm)((0,n.SU)(h.Z),{onClick:e=>k(l)},null,8,["onClick"])])),_:2},1024),(0,i.Wm)(C,{title:"上移"},{default:(0,i.w5)((()=>[(0,i.Wm)((0,n.SU)(_.Z),{onClick:e=>p(l)},null,8,["onClick"])])),_:2},1024),(0,i.Wm)(C,{title:"下移"},{default:(0,i.w5)((()=>[(0,i.Wm)((0,n.SU)(b.Z),{onClick:e=>v(l)},null,8,["onClick"])])),_:2},1024),(0,i.Wm)(C,{title:"删除"},{default:(0,i.w5)((()=>[(0,i.Wm)((0,n.SU)(f.Z),{onClick:e=>g(l)},null,8,["onClick"])])),_:2},1024)])),_:2},1024)))),128))])),_:1},8,["dataSource"])),(0,i._)("div",U,[(0,i.Wm)(j,{type:"primary",onClick:y},{default:(0,i.w5)((()=>[(0,i.Wm)((0,n.SU)(f.Z)),(0,i.Uk)(" 清空上下文 ")])),_:1}),(0,i.Wm)(j,{type:"primary",danger:"",onClick:u},{default:(0,i.w5)((()=>[(0,i.Wm)((0,n.SU)(W.Z)),(0,i.Uk)(" 关闭 ")])),_:1})])])])])),_:1},8,["open"])}}},Z=t(89);const H=(0,Z.Z)(C,[["__scopeId","data-v-90209f40"]]);var j=H;const D={class:"bottom-box"},O={class:"mode-box"},z={class:"mode-box"},M={key:1,class:"pre-container"},P={key:"comment-basic-like"},E={key:"comment-basic-like"},T={key:"comment-basic-like"},A={key:"comment-basic-dislike"},Y={key:1,class:"empty-container"};var q={__name:"Home",setup(e){const l=g.Z.PRESENTED_IMAGE_SIMPLE;let t;t=window.acquireVsCodeApi?window.acquireVsCodeApi():{postMessage:e=>{console.log("postMessage",e)},setState:e=>{console.log("setState",e)},getState:()=>({history:[]})};const a=(0,n.iH)(null),w=(0,n.iH)(null),h=(0,n.iH)(""),_=(0,n.iH)([]),b=(0,n.iH)(!1),W=(0,n.iH)(!1),x=(0,n.iH)([]),S=(0,n.iH)([]),F=(0,n.iH)(!0),U=(0,n.iH)(["默认源","备用源"]),C=(0,n.iH)("默认源"),Z=(0,n.iH)([]),H=(0,n.iH)(""),q=e=>{C.value=e,t.postMessage({command:"mode",mode:C.value})},K=e=>{H.value=e,le()},N=()=>{t.postMessage({command:"currentFile"}),L()},I=()=>{t.postMessage({command:"files"}),W.value=!0},J=()=>{S.value=[],L()},L=()=>{_.value=_.value.filter((e=>"system"===e.role)),X()},V=e=>{navigator.clipboard.writeText(e).then((function(){y.ZP.info("复制成功")}),(function(e){console.error("无法复制内容: ",e)}))},R=e=>{_.value.splice(e,1)},B=e=>{let l="";for(let t=0;t<=e;t++)l+=_.value[t].content+"\n\n";navigator.clipboard.writeText(l).then((function(){y.ZP.info("复制成功")}),(function(e){console.error("无法复制内容: ",e)}))},G=e=>{if(!b.value){if(e)_.value.pop();else{if(!h.value)return void y.ZP.info("请先输入您的问题");let e=h.value;_.value.push({role:"user",content:e}),h.value=""}b.value=!0,t.postMessage({command:"fetch",messages:JSON.stringify(_.value),model:H.value,mode:C.value}),setTimeout((()=>{const e=a.value;e&&(e.scrollTop=e.scrollHeight),F.value=!0}),100)}},Q=()=>t.postMessage({command:"abort"}),X=()=>t.postMessage({command:"systemPrompt",clickedFiles:JSON.stringify(S.value)}),$=async e=>{"Enter"===e.key&&(e.shiftKey||!h.value||b.value||(e.preventDefault(),await G()))};(0,i.bv)((()=>{ee(),(0,i.YP)(_,(()=>{le(),(0,i.Y3)((()=>{const e=a.value;if(e&&F.value){const l=e.scrollHeight-e.scrollTop-e.clientHeight;l<300?e.scrollTop=e.scrollHeight:F.value=!1}}))}),{deep:!0}),(0,i.YP)(S,(()=>{le(),X()}),{deep:!0}),window.addEventListener("message",(e=>{const{data:l}=e;switch(l.command){case"response":{let e=l.text;_.value.length>0&&"assistant"===_.value[_.value.length-1].role?_.value[_.value.length-1].content+=e:_.value.push({role:"assistant",content:e}),l.finished&&(b.value=!1);break}case"files":x.value=JSON.parse(l.files),te();break;case"currentFile":S.value=l.currentFile?[l.currentFile]:[],X();break;case"systemPrompt":{const{prompt:e}=l;0===_.value.length?_.value.push({role:"system",content:e}):"system"===_.value[0].role?_.value[0].content=e:_.value.unshift({role:"system",content:e});break}case"models":Z.value=JSON.parse(l.models),Z.value.includes(H.value)||(H.value=Z.value[0]),le();break;default:break}})),t.postMessage({command:"mode",mode:C.value})}));const ee=()=>{let e=t.getState();e&&(_.value=e.history||[],S.value=e.clickedFiles||[],C.value=e.mode||"默认源",H.value=e.model||"")},le=()=>{t.setState({history:_.value,clickedFiles:S.value,mode:C.value,model:H.value})},te=()=>{const e=l=>{let t=[];return l.forEach((l=>{t.push(l.key),l.isFolder&&l.children.length>0&&(t=t.concat(e(l.children)))})),t},l=e(x.value);S.value=S.value.filter((e=>l.includes(e)))};return(e,t)=>{const g=(0,i.up)("a-tooltip"),y=(0,i.up)("a-select-option"),F=(0,i.up)("a-select"),X=(0,i.up)("a-textarea"),ee=(0,i.up)("a-avatar"),le=(0,i.up)("MdPreview"),te=(0,i.up)("a-comment"),ae=(0,i.up)("a-empty");return(0,i.wg)(),(0,i.iD)("div",null,[(0,i._)("div",D,[(0,i._)("div",O,[(0,i.Wm)(g,{title:"快速上下文"},{default:(0,i.w5)((()=>[(0,i.Wm)((0,n.SU)(s.Z),{onClick:N,style:{"font-size":"20px","margin-right":"12px"}})])),_:1}),(0,i.Wm)(g,{title:"设置上下文"},{default:(0,i.w5)((()=>[(0,i.Wm)((0,n.SU)(u.Z),{onClick:I,style:{"font-size":"20px","margin-right":"12px"}})])),_:1}),(0,i.Wm)(g,{title:"清除全部"},{default:(0,i.w5)((()=>[(0,i.Wm)((0,n.SU)(c.Z),{onClick:J,style:{"font-size":"20px","margin-right":"12px"}})])),_:1}),(0,i.Wm)(g,{title:"清除聊天"},{default:(0,i.w5)((()=>[(0,i.Wm)((0,n.SU)(r.Z),{onClick:L,style:{"font-size":"20px","margin-right":"12px"}})])),_:1}),(0,i.Wm)(F,{value:C.value,"onUpdate:value":t[0]||(t[0]=e=>C.value=e),placement:"topLeft",size:"small",onChange:q,style:{width:"80px","margin-right":"12px"}},{default:(0,i.w5)((()=>[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(U.value,(e=>((0,i.wg)(),(0,i.j4)(y,{key:e,value:e},{default:(0,i.w5)((()=>[(0,i.Uk)((0,o.zw)(e),1)])),_:2},1032,["value"])))),128))])),_:1},8,["value"]),(0,i.Wm)(F,{value:H.value,"onUpdate:value":t[1]||(t[1]=e=>H.value=e),placement:"topLeft",size:"small",onChange:K,style:{width:"160px"}},{default:(0,i.w5)((()=>[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(Z.value,(e=>((0,i.wg)(),(0,i.j4)(y,{key:e,value:e},{default:(0,i.w5)((()=>[(0,i.Uk)((0,o.zw)(e),1)])),_:2},1032,["value"])))),128))])),_:1},8,["value"])]),(0,i._)("div",z,[(0,i.Wm)(X,{value:h.value,"onUpdate:value":t[2]||(t[2]=e=>h.value=e),placeholder:"Enter发送, Shift+Enter换行","auto-size":{maxRows:10,minRows:1},style:{flex:"1","margin-right":"12px"},allowClear:"",onKeydown:$,ref_key:"textArea",ref:w},null,8,["value"]),b.value?((0,i.wg)(),(0,i.j4)(g,{key:1,title:"终止"},{default:(0,i.w5)((()=>[(0,i.Wm)((0,n.SU)(p.Z),{onClick:Q,style:{"font-size":"20px"}})])),_:1})):((0,i.wg)(),(0,i.j4)(g,{key:0,title:"发送"},{default:(0,i.w5)((()=>[(0,i.Wm)((0,n.SU)(d.Z),{onClick:t[3]||(t[3]=e=>G(!1)),style:{"font-size":"20px"}})])),_:1}))])]),_.value.length>0?((0,i.wg)(),(0,i.iD)("div",{key:0,class:"display-box",ref_key:"displayBox",ref:a},[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(_.value,((e,l)=>((0,i.wg)(),(0,i.j4)(te,{key:l},(0,i.Nv)({content:(0,i.w5)((()=>["user"!==e.role?((0,i.wg)(),(0,i.j4)(le,{key:0,modelValue:e.content,theme:"dark",codeFoldable:!1},null,8,["modelValue"])):((0,i.wg)(),(0,i.iD)("pre",M,(0,o.zw)(e.content),1))])),actions:(0,i.w5)((()=>["system"!==e.role?((0,i.wg)(),(0,i.iD)("span",P,[(0,i.Wm)(g,{title:"删除"},{default:(0,i.w5)((()=>[(0,i.Wm)((0,n.SU)(f.Z),{style:{"font-size":"16px"},onClick:e=>R(l)},null,8,["onClick"])])),_:2},1024)])):(0,i.kq)("",!0),(0,i._)("span",E,[(0,i.Wm)(g,{title:"复制"},{default:(0,i.w5)((()=>[(0,i.Wm)((0,n.SU)(v.Z),{style:{"font-size":"16px"},onClick:l=>V(e.content)},null,8,["onClick"])])),_:2},1024)]),"system"!==e.role?((0,i.wg)(),(0,i.iD)("span",T,[(0,i.Wm)(g,{title:"复制至此"},{default:(0,i.w5)((()=>[(0,i.Wm)((0,n.SU)(m.Z),{style:{"font-size":"16px"},onClick:e=>B(l)},null,8,["onClick"])])),_:2},1024)])):(0,i.kq)("",!0),"assistant"===e.role&&l===_.value.length-1?((0,i.wg)(),(0,i.iD)("span",A,[(0,i.Wm)(g,{title:"重新生成"},{default:(0,i.w5)((()=>[(0,i.Wm)((0,n.SU)(k.Z),{style:{"font-size":"16px"},onClick:t[4]||(t[4]=e=>G(!0))})])),_:1})])):(0,i.kq)("",!0)])),_:2},["user"===e.role?{name:"author",fn:(0,i.w5)((()=>[(0,i.Uk)("我")])),key:"0"}:"assistant"===e.role?{name:"author",fn:(0,i.w5)((()=>[(0,i.Uk)("AI助手")])),key:"1"}:{name:"author",fn:(0,i.w5)((()=>[(0,i.Uk)("系统")])),key:"2"},"user"===e.role?{name:"avatar",fn:(0,i.w5)((()=>[(0,i.Wm)(ee,{style:{color:"#f56a00","background-color":"#fde3cf"}},{default:(0,i.w5)((()=>[(0,i.Uk)("Q")])),_:1})])),key:"3"}:"assistant"===e.role?{name:"avatar",fn:(0,i.w5)((()=>[(0,i.Wm)(ee,{style:{color:"#87ceeb","background-color":"#a0ffff"}},{default:(0,i.w5)((()=>[(0,i.Uk)("A")])),_:1})])),key:"4"}:{name:"avatar",fn:(0,i.w5)((()=>[(0,i.Wm)(ee,{style:{color:"#ffffff","background-color":"#ffa500"}},{default:(0,i.w5)((()=>[(0,i.Uk)("S")])),_:1})])),key:"5"}]),1024)))),128))],512)):((0,i.wg)(),(0,i.iD)("div",Y,[(0,i.Wm)(ae,{image:(0,n.SU)(l),description:"暂无内容"},null,8,["image"])])),(0,i.Wm)(j,{visible:W.value,treeData:x.value,clickedFiles:S.value,"onUpdate:visible":t[5]||(t[5]=e=>W.value=e),"onUpdate:clickedFiles":t[6]||(t[6]=e=>{S.value=e,L()})},null,8,["visible","treeData","clickedFiles"])])}}};const K=(0,Z.Z)(q,[["__scopeId","data-v-83a6e344"]]);var N=K,I=t(9805),J=t(7334),L={__name:"App",setup(e){return(e,l)=>{const t=(0,i.up)("a-app"),a=(0,i.up)("a-config-provider");return(0,i.wg)(),(0,i.j4)(a,{locale:(0,n.SU)(I.Z),theme:{algorithm:(0,n.SU)(J.Z).darkAlgorithm}},{default:(0,i.w5)((()=>[(0,i.Wm)(t,null,{default:(0,i.w5)((()=>[(0,i.Wm)(N)])),_:1})])),_:1},8,["locale","theme"])}}};const V=L;var R=V,B=t(3825),G=(t(7424),t(9716));t(1849);const Q=(0,a.ri)(R);Q.use(B.M),Q.use(G.ZP),Q.mount("#app")}},l={};function t(a){var i=l[a];if(void 0!==i)return i.exports;var n=l[a]={exports:{}};return e[a].call(n.exports,n,n.exports,t),n.exports}t.m=e,function(){var e=[];t.O=function(l,a,i,n){if(!a){var o=1/0;for(r=0;r<e.length;r++){a=e[r][0],i=e[r][1],n=e[r][2];for(var s=!0,u=0;u<a.length;u++)(!1&n||o>=n)&&Object.keys(t.O).every((function(e){return t.O[e](a[u])}))?a.splice(u--,1):(s=!1,n<o&&(o=n));if(s){e.splice(r--,1);var c=i();void 0!==c&&(l=c)}}return l}n=n||0;for(var r=e.length;r>0&&e[r-1][2]>n;r--)e[r]=e[r-1];e[r]=[a,i,n]}}(),function(){t.n=function(e){var l=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(l,{a:l}),l}}(),function(){t.d=function(e,l){for(var a in l)t.o(l,a)&&!t.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:l[a]})}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){t.o=function(e,l){return Object.prototype.hasOwnProperty.call(e,l)}}(),function(){t.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={143:0};t.O.j=function(l){return 0===e[l]};var l=function(l,a){var i,n,o=a[0],s=a[1],u=a[2],c=0;if(o.some((function(l){return 0!==e[l]}))){for(i in s)t.o(s,i)&&(t.m[i]=s[i]);if(u)var r=u(t)}for(l&&l(a);c<o.length;c++)n=o[c],t.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return t.O(r)},a=self["webpackChunksimple_vue"]=self["webpackChunksimple_vue"]||[];a.forEach(l.bind(null,0)),a.push=l.bind(null,a.push.bind(a))}();var a=t.O(void 0,[998],(function(){return t(2977)}));a=t.O(a)})();
//# sourceMappingURL=app.eefaf1ff.js.map