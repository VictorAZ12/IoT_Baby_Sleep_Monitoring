import{L as k,a as b,bL as h,b as R,c as v,b$ as O,s as M,bV as A,aC as c,o as B,i as T,p as o,y as i,z as p,B as u,r as $,eA as F,l as g,cc as f,em as N,en as P,E as V}from"./index.63bdb61e.js";import{C as j}from"./CopyOutlined.2df3bc61.js";import{R as w}from"./useSortable.cc16dde4.js";import"./_baseIteratee.60ace240.js";import"./_baseIsEqual.0a7c7879.js";import"./get.5a71a4ec.js";const x=b({name:"SettingFooter",components:{CopyOutlined:j,RedoOutlined:w},setup(){const e=h(),{prefixCls:d}=R("setting-footer"),{t:s}=v(),{createSuccessModal:m,createMessage:r}=V(),C=O(),l=M(),t=A();function a(){const{isSuccessRef:n}=F(JSON.stringify(g(t.getProjectConfig),null,2));g(n)&&m({title:s("layout.setting.operatingTitle"),content:s("layout.setting.operatingContent")})}function y(){try{t.setProjectConfig(f);const{colorWeak:n,grayMode:_}=f;N(n),P(_),r.success(s("layout.setting.resetSuccess"))}catch(n){r.error(n)}}function S(){localStorage.clear(),t.resetAllState(),e.resetState(),C.resetState(),l.resetState(),location.reload()}return{prefixCls:d,t:s,handleCopy:a,handleResetSetting:y,handleClearAndRedo:S}}});function z(e,d,s,m,r,C){const l=c("CopyOutlined"),t=c("a-button"),a=c("RedoOutlined");return B(),T("div",{class:$(e.prefixCls)},[o(t,{type:"primary",block:"",onClick:e.handleCopy},{default:i(()=>[o(l,{class:"mr-2"}),p(" "+u(e.t("layout.setting.copyBtn")),1)]),_:1},8,["onClick"]),o(t,{color:"warning",block:"",onClick:e.handleResetSetting,class:"my-3"},{default:i(()=>[o(a,{class:"mr-2"}),p(" "+u(e.t("common.resetText")),1)]),_:1},8,["onClick"]),o(t,{color:"error",block:"",onClick:e.handleClearAndRedo},{default:i(()=>[o(a,{class:"mr-2"}),p(" "+u(e.t("layout.setting.clearBtn")),1)]),_:1},8,["onClick"])],2)}var J=k(x,[["render",z],["__scopeId","data-v-2d4de409"]]);export{J as default};
