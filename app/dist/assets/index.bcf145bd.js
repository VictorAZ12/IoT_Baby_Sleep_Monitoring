var it=Object.defineProperty,rt=Object.defineProperties;var at=Object.getOwnPropertyDescriptors;var Te=Object.getOwnPropertySymbols;var lt=Object.prototype.hasOwnProperty,ut=Object.prototype.propertyIsEnumerable;var fe=(e,o,i)=>o in e?it(e,o,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[o]=i,b=(e,o)=>{for(var i in o||(o={}))lt.call(o,i)&&fe(e,i,o[i]);if(Te)for(var i of Te(o))ut.call(o,i)&&fe(e,i,o[i]);return e},ge=(e,o)=>rt(e,at(o));var De=(e,o,i)=>new Promise((c,d)=>{var E=g=>{try{u(i.next(g))}catch(O){d(O)}},a=g=>{try{u(i.throw(g))}catch(O){d(O)}},u=g=>g.done?c(g.value):Promise.resolve(g.value).then(E,a);u((i=i.apply(e,o)).next())});import{c as ae,a as z,b as Se,f as M,L as le,aC as R,o as f,i as U,F as H,aG as D,k as x,y as N,z as Oe,B as re,aD as Y,m as K,r as m,bB as Le,db as _t,aJ as ce,j as Ce,p as s,bT as gt,t as j,dP as ct,dY as Ae,l as t,ay as X,d0 as dt,K as Me,U as Et,az as Be,aB as Ot,c3 as St,aE as Ne,w as pt,aF as Tt,aH as ft,aI as Dt,v as we,aA as Ct,de as At,dg as Mt,N as Nt,bH as P,eg as Re,eh as de,ei as w,bi as se,bj as V,ej as ye,c4 as ie,bV as me,ek as Ue,el as Pe,bR as ke,em as Rt,en as yt,eo as It,ep as bt,c0 as ht,bn as Lt,A as Bt,eq as wt,er as mt,es as Ut,bl as Pt}from"./index.63bdb61e.js";import{D as kt,c as k,u as Ft,a as vt}from"./index.13c0f328.js";import{A as Gt}from"./ArrowLeftOutlined.9b340ad8.js";import{i as Wt}from"./isEqual.12cd14ac.js";import{D as A}from"./index.be9b02a2.js";const{t:Ie}=ae(),Fe={confirmLoading:{type:Boolean},showCancelBtn:{type:Boolean,default:!0},cancelButtonProps:Object,cancelText:{type:String,default:Ie("common.cancelText")},showOkBtn:{type:Boolean,default:!0},okButtonProps:Object,okText:{type:String,default:Ie("common.okText")},okType:{type:String,default:"primary"},showFooter:{type:Boolean},footerHeight:{type:[String,Number],default:60}},$t=b({isDetail:{type:Boolean},title:{type:String,default:""},loadingText:{type:String},showDetailBack:{type:Boolean,default:!0},visible:{type:Boolean},loading:{type:Boolean},maskClosable:{type:Boolean,default:!0},getContainer:{type:[Object,String]},closeFunc:{type:[Function,Object],default:null},destroyOnClose:{type:Boolean}},Fe);const Ht=z({name:"BasicDrawerFooter",props:ge(b({},Fe),{height:{type:String,default:"60px"}}),emits:["ok","close"],setup(e,{emit:o}){const{prefixCls:i}=Se("basic-drawer-footer"),c=M(()=>{const a=`${e.height}`;return{height:a,lineHeight:a}});function d(){o("ok")}function E(){o("close")}return{handleOk:d,prefixCls:i,handleClose:E,getStyle:c}}});function Xt(e,o,i,c,d,E){const a=R("a-button");return e.showFooter||e.$slots.footer?(f(),U("div",{key:0,class:m(e.prefixCls),style:Le(e.getStyle)},[e.$slots.footer?D(e.$slots,"footer",{key:1}):(f(),U(H,{key:0},[D(e.$slots,"insertFooter"),e.showCancelBtn?(f(),x(a,Y({key:0},e.cancelButtonProps,{onClick:e.handleClose,class:"mr-2"}),{default:N(()=>[Oe(re(e.cancelText),1)]),_:1},16,["onClick"])):K("",!0),D(e.$slots,"centerFooter"),e.showOkBtn?(f(),x(a,Y({key:1,type:e.okType,onClick:e.handleOk},e.okButtonProps,{class:"mr-2",loading:e.confirmLoading}),{default:N(()=>[Oe(re(e.okText),1)]),_:1},16,["type","onClick","loading"])):K("",!0),D(e.$slots,"appendFooter")],64))],6)):K("",!0)}var Vt=le(Ht,[["render",Xt]]);const Kt=z({name:"BasicDrawerHeader",components:{BasicTitle:_t,ArrowLeftOutlined:Gt},props:{isDetail:ce.bool,showDetailBack:ce.bool,title:ce.string},emits:["close"],setup(e,{emit:o}){const{prefixCls:i}=Se("basic-drawer-header");function c(){o("close")}return{prefixCls:i,handleClose:c}}}),jt={key:1};function xt(e,o,i,c,d,E){const a=R("BasicTitle"),u=R("ArrowLeftOutlined");return e.isDetail?(f(),U("div",{key:1,class:m([e.prefixCls,`${e.prefixCls}--detail`])},[Ce("span",{class:m(`${e.prefixCls}__twrap`)},[e.showDetailBack?(f(),U("span",{key:0,onClick:o[0]||(o[0]=(...g)=>e.handleClose&&e.handleClose(...g))},[s(u,{class:m(`${e.prefixCls}__back`)},null,8,["class"])])):K("",!0),e.title?(f(),U("span",jt,re(e.title),1)):K("",!0)],2),Ce("span",{class:m(`${e.prefixCls}__toolbar`)},[D(e.$slots,"titleToolbar")],2)],2)):(f(),x(a,{key:0,class:m(e.prefixCls)},{default:N(()=>[D(e.$slots,"title"),Oe(" "+re(e.$slots.title?"":e.title),1)]),_:3},8,["class"]))}var Yt=le(Kt,[["render",xt]]);const zt=z({components:{Drawer:kt,ScrollContainer:gt,DrawerFooter:Vt,DrawerHeader:Yt},inheritAttrs:!1,props:$t,emits:["visible-change","ok","close","register"],setup(e,{emit:o}){const i=j(!1),c=ct(),d=j(null),{t:E}=ae(),{prefixVar:a,prefixCls:u}=Se("basic-drawer"),g={setDrawerProps:v,emitVisible:void 0},O=Be();O&&o("register",g,O.uid);const C=M(()=>Ae(X(e),t(d))),T=M(()=>{const l=ge(b(b({placement:"right"},t(c)),t(C)),{visible:t(i)});l.title=void 0;const{isDetail:S,width:G,wrapClassName:J,getContainer:ee}=l;if(S){G||(l.width="100%");const te=`${u}__detail`;l.wrapClassName=J?`${J} ${te}`:te,ee||(l.getContainer=`.${a}-layout-content`)}return l}),F=M(()=>b(b({},c),t(T))),Q=M(()=>{const{footerHeight:l,showFooter:S}=t(T);return S&&l?dt(l)?`${l}px`:`${l.replace("px","")}px`:"0px"}),ue=M(()=>{const l=t(Q);return{position:"relative",height:`calc(100% - ${l})`}}),q=M(()=>{var l;return!!((l=t(T))!=null&&l.loading)});Me(()=>e.visible,(l,S)=>{l!==S&&(i.value=l)},{deep:!0}),Me(()=>i.value,l=>{Et(()=>{var S;o("visible-change",l),O&&((S=g.emitVisible)==null||S.call(g,l,O.uid))})});function _e(l){return De(this,null,function*(){const{closeFunc:S}=t(T);if(o("close",l),S&&Ot(S)){const G=yield S();i.value=!G;return}i.value=!1})}function v(l){d.value=Ae(t(d)||{},l),Reflect.has(l,"visible")&&(i.value=!!l.visible)}function Z(){o("ok")}return{onClose:_e,t:E,prefixCls:u,getMergeProps:C,getScrollContentStyle:ue,getProps:T,getLoading:q,getBindValues:F,getFooterHeight:Q,handleOk:Z}}});function Qt(e,o,i,c,d,E){const a=R("DrawerHeader"),u=R("ScrollContainer"),g=R("DrawerFooter"),O=R("Drawer"),C=St("loading");return f(),x(O,Y({class:e.prefixCls,onClose:e.onClose},e.getBindValues),Ne({default:N(()=>[pt((f(),x(u,{style:Le(e.getScrollContentStyle),"loading-tip":e.loadingText||e.t("common.loadingText")},{default:N(()=>[D(e.$slots,"default")]),_:3},8,["style","loading-tip"])),[[C,e.getLoading]]),s(g,Y(e.getProps,{onClose:e.onClose,onOk:e.handleOk,height:e.getFooterHeight}),Ne({_:2},[Tt(Object.keys(e.$slots),T=>({name:T,fn:N(F=>[D(e.$slots,T,ft(Dt(F||{})))])}))]),1040,["onClose","onOk","height"])]),_:2},[e.$slots.title?{name:"title",fn:N(()=>[D(e.$slots,"title")]),key:"1"}:{name:"title",fn:N(()=>[s(a,{title:e.getMergeProps.title,isDetail:e.isDetail,showDetailBack:e.showDetailBack,onClose:e.onClose},{titleToolbar:N(()=>[D(e.$slots,"titleToolbar")]),_:3},8,["title","isDetail","showDetailBack","onClose"])]),key:"0"}]),1040,["class","onClose"])}var qt=le(zt,[["render",Qt]]);const W=we({}),be=we({});function Zt(){if(!Be())throw new Error("useDrawer() can only be used inside setup() or functional components!");const e=j(null),o=j(!1),i=j("");function c(a,u){Ct(()=>{e.value=null,o.value=null,W[t(i)]=null}),!(t(o)&&At()&&a===t(e))&&(i.value=u,e.value=a,o.value=!0,a.emitVisible=(g,O)=>{be[O]=g})}const d=()=>{const a=t(e);return a||Mt("useDrawer instance is undefined!"),a},E={setDrawerProps:a=>{var u;(u=d())==null||u.setDrawerProps(a)},getVisible:M(()=>be[~~t(i)]),openDrawer:(a=!0,u,g=!0)=>{var C;if((C=d())==null||C.setDrawerProps({visible:a}),!u)return;if(g){W[t(i)]=null,W[t(i)]=X(u);return}Wt(X(W[t(i)]),X(u))||(W[t(i)]=X(u))},closeDrawer:()=>{var a;(a=d())==null||a.setDrawerProps({visible:!1})}};return[c,E]}const Jt=Nt(qt),eo=k(()=>P(()=>import("./TypePicker.0cc40a71.js"),["assets/TypePicker.0cc40a71.js","assets/TypePicker.8770fc04.css","assets/index.63bdb61e.js","assets/index.02f9de5f.css"])),Ee=k(()=>P(()=>import("./ThemeColorPicker.5f2204a9.js"),["assets/ThemeColorPicker.5f2204a9.js","assets/ThemeColorPicker.8eb61909.css","assets/index.63bdb61e.js","assets/index.02f9de5f.css","assets/index.13c0f328.js","assets/index.e4466aa1.css","assets/FullscreenOutlined.c8b6fc93.js","assets/index.8e47476b.js","assets/index.55076fdd.css","assets/useWindowSizeFn.4b61d293.js","assets/useContentViewHeight.21538ef6.js","assets/useSortable.cc16dde4.js","assets/_baseIteratee.60ace240.js","assets/_baseIsEqual.0a7c7879.js","assets/get.5a71a4ec.js","assets/index.0c73afc2.js","assets/index.d1fb21df.css","assets/warning.5dec2cdf.js","assets/lock.fed68270.js","assets/ArrowLeftOutlined.9b340ad8.js","assets/isEqual.12cd14ac.js","assets/index.be9b02a2.js","assets/index.17eb4c41.css"])),to=k(()=>P(()=>import("./SettingFooter.5883d6c7.js"),["assets/SettingFooter.5883d6c7.js","assets/SettingFooter.9c0370f9.css","assets/index.63bdb61e.js","assets/index.02f9de5f.css","assets/CopyOutlined.2df3bc61.js","assets/useSortable.cc16dde4.js","assets/_baseIteratee.60ace240.js","assets/_baseIsEqual.0a7c7879.js","assets/get.5a71a4ec.js"])),_=k(()=>P(()=>import("./SwitchItem.dbd3865f.js"),["assets/SwitchItem.dbd3865f.js","assets/SwitchItem.458f0d56.css","assets/index.63bdb61e.js","assets/index.02f9de5f.css","assets/index.ac95831d.js","assets/index.9905f316.css","assets/index.13c0f328.js","assets/index.e4466aa1.css","assets/FullscreenOutlined.c8b6fc93.js","assets/index.8e47476b.js","assets/index.55076fdd.css","assets/useWindowSizeFn.4b61d293.js","assets/useContentViewHeight.21538ef6.js","assets/useSortable.cc16dde4.js","assets/_baseIteratee.60ace240.js","assets/_baseIsEqual.0a7c7879.js","assets/get.5a71a4ec.js","assets/index.0c73afc2.js","assets/index.d1fb21df.css","assets/warning.5dec2cdf.js","assets/lock.fed68270.js","assets/ArrowLeftOutlined.9b340ad8.js","assets/isEqual.12cd14ac.js","assets/index.be9b02a2.js","assets/index.17eb4c41.css"])),$=k(()=>P(()=>import("./SelectItem.0fb66f11.js"),["assets/SelectItem.0fb66f11.js","assets/SelectItem.809be52d.css","assets/index.63bdb61e.js","assets/index.02f9de5f.css","assets/index.13c0f328.js","assets/index.e4466aa1.css","assets/FullscreenOutlined.c8b6fc93.js","assets/index.8e47476b.js","assets/index.55076fdd.css","assets/useWindowSizeFn.4b61d293.js","assets/useContentViewHeight.21538ef6.js","assets/useSortable.cc16dde4.js","assets/_baseIteratee.60ace240.js","assets/_baseIsEqual.0a7c7879.js","assets/get.5a71a4ec.js","assets/index.0c73afc2.js","assets/index.d1fb21df.css","assets/warning.5dec2cdf.js","assets/lock.fed68270.js","assets/ArrowLeftOutlined.9b340ad8.js","assets/isEqual.12cd14ac.js","assets/index.be9b02a2.js","assets/index.17eb4c41.css"])),he=k(()=>P(()=>import("./InputNumberItem.cc93e6ec.js"),["assets/InputNumberItem.cc93e6ec.js","assets/InputNumberItem.228b843e.css","assets/index.63bdb61e.js","assets/index.02f9de5f.css","assets/index.0cb822fd.js","assets/index.e0a015a1.css","assets/warning.5dec2cdf.js","assets/index.13c0f328.js","assets/index.e4466aa1.css","assets/FullscreenOutlined.c8b6fc93.js","assets/index.8e47476b.js","assets/index.55076fdd.css","assets/useWindowSizeFn.4b61d293.js","assets/useContentViewHeight.21538ef6.js","assets/useSortable.cc16dde4.js","assets/_baseIteratee.60ace240.js","assets/_baseIsEqual.0a7c7879.js","assets/get.5a71a4ec.js","assets/index.0c73afc2.js","assets/index.d1fb21df.css","assets/lock.fed68270.js","assets/ArrowLeftOutlined.9b340ad8.js","assets/isEqual.12cd14ac.js","assets/index.be9b02a2.js","assets/index.17eb4c41.css"])),{t:p}=ae();var n=(e=>(e[e.CHANGE_LAYOUT=0]="CHANGE_LAYOUT",e[e.CHANGE_THEME_COLOR=1]="CHANGE_THEME_COLOR",e[e.CHANGE_THEME=2]="CHANGE_THEME",e[e.MENU_HAS_DRAG=3]="MENU_HAS_DRAG",e[e.MENU_ACCORDION=4]="MENU_ACCORDION",e[e.MENU_TRIGGER=5]="MENU_TRIGGER",e[e.MENU_TOP_ALIGN=6]="MENU_TOP_ALIGN",e[e.MENU_COLLAPSED=7]="MENU_COLLAPSED",e[e.MENU_COLLAPSED_SHOW_TITLE=8]="MENU_COLLAPSED_SHOW_TITLE",e[e.MENU_WIDTH=9]="MENU_WIDTH",e[e.MENU_SHOW_SIDEBAR=10]="MENU_SHOW_SIDEBAR",e[e.MENU_THEME=11]="MENU_THEME",e[e.MENU_SPLIT=12]="MENU_SPLIT",e[e.MENU_FIXED=13]="MENU_FIXED",e[e.MENU_CLOSE_MIX_SIDEBAR_ON_CHANGE=14]="MENU_CLOSE_MIX_SIDEBAR_ON_CHANGE",e[e.MENU_TRIGGER_MIX_SIDEBAR=15]="MENU_TRIGGER_MIX_SIDEBAR",e[e.MENU_FIXED_MIX_SIDEBAR=16]="MENU_FIXED_MIX_SIDEBAR",e[e.HEADER_SHOW=17]="HEADER_SHOW",e[e.HEADER_THEME=18]="HEADER_THEME",e[e.HEADER_FIXED=19]="HEADER_FIXED",e[e.HEADER_SEARCH=20]="HEADER_SEARCH",e[e.TABS_SHOW_QUICK=21]="TABS_SHOW_QUICK",e[e.TABS_SHOW_REDO=22]="TABS_SHOW_REDO",e[e.TABS_SHOW=23]="TABS_SHOW",e[e.TABS_SHOW_FOLD=24]="TABS_SHOW_FOLD",e[e.LOCK_TIME=25]="LOCK_TIME",e[e.FULL_CONTENT=26]="FULL_CONTENT",e[e.CONTENT_MODE=27]="CONTENT_MODE",e[e.SHOW_BREADCRUMB=28]="SHOW_BREADCRUMB",e[e.SHOW_BREADCRUMB_ICON=29]="SHOW_BREADCRUMB_ICON",e[e.GRAY_MODE=30]="GRAY_MODE",e[e.COLOR_WEAK=31]="COLOR_WEAK",e[e.SHOW_LOGO=32]="SHOW_LOGO",e[e.SHOW_FOOTER=33]="SHOW_FOOTER",e[e.ROUTER_TRANSITION=34]="ROUTER_TRANSITION",e[e.OPEN_PROGRESS=35]="OPEN_PROGRESS",e[e.OPEN_PAGE_LOADING=36]="OPEN_PAGE_LOADING",e[e.OPEN_ROUTE_TRANSITION=37]="OPEN_ROUTE_TRANSITION",e))(n||{});const oo=[{value:Re.FULL,label:p("layout.setting.contentModeFull")},{value:Re.FIXED,label:p("layout.setting.contentModeFixed")}],no=[{value:de.CENTER,label:p("layout.setting.topMenuAlignRight")},{value:de.START,label:p("layout.setting.topMenuAlignLeft")},{value:de.END,label:p("layout.setting.topMenuAlignCenter")}],so=e=>[{value:ie.NONE,label:p("layout.setting.menuTriggerNone")},{value:ie.FOOTER,label:p("layout.setting.menuTriggerBottom")},...e?[]:[{value:ie.HEADER,label:p("layout.setting.menuTriggerTop")}]],io=[w.ZOOM_FADE,w.FADE,w.ZOOM_OUT,w.FADE_SIDE,w.FADE_BOTTOM,w.FADE_SCALE].map(e=>({label:e,value:e})),ro=[{title:p("layout.setting.menuTypeSidebar"),mode:se.INLINE,type:V.SIDEBAR},{title:p("layout.setting.menuTypeMix"),mode:se.INLINE,type:V.MIX},{title:p("layout.setting.menuTypeTopMenu"),mode:se.HORIZONTAL,type:V.TOP_MENU},{title:p("layout.setting.menuTypeMixSidebar"),mode:se.INLINE,type:V.MIX_SIDEBAR}],ao=[{value:ye.HOVER,label:p("layout.setting.triggerHover")},{value:ye.CLICK,label:p("layout.setting.triggerClick")}];function lo(e,o){const i=me(),c=uo(e,o);i.setProjectConfig(c),e===n.CHANGE_THEME&&(Ue(),Pe())}function uo(e,o){const i=me(),{getThemeColor:c,getDarkMode:d}=ke();switch(e){case n.CHANGE_LAYOUT:const{mode:E,type:a,split:u}=o;return{menuSetting:b({mode:E,type:a,collapsed:!1,show:!0,hidden:!1},u===void 0?{split:u}:{})};case n.CHANGE_THEME_COLOR:return c.value===o?{}:(bt(o),{themeColor:o});case n.CHANGE_THEME:return d.value===o?{}:(It(o),{});case n.MENU_HAS_DRAG:return{menuSetting:{canDrag:o}};case n.MENU_ACCORDION:return{menuSetting:{accordion:o}};case n.MENU_TRIGGER:return{menuSetting:{trigger:o}};case n.MENU_TOP_ALIGN:return{menuSetting:{topMenuAlign:o}};case n.MENU_COLLAPSED:return{menuSetting:{collapsed:o}};case n.MENU_WIDTH:return{menuSetting:{menuWidth:o}};case n.MENU_SHOW_SIDEBAR:return{menuSetting:{show:o}};case n.MENU_COLLAPSED_SHOW_TITLE:return{menuSetting:{collapsedShowTitle:o}};case n.MENU_THEME:return Pe(o),{menuSetting:{bgColor:o}};case n.MENU_SPLIT:return{menuSetting:{split:o}};case n.MENU_CLOSE_MIX_SIDEBAR_ON_CHANGE:return{menuSetting:{closeMixSidebarOnChange:o}};case n.MENU_FIXED:return{menuSetting:{fixed:o}};case n.MENU_TRIGGER_MIX_SIDEBAR:return{menuSetting:{mixSideTrigger:o}};case n.MENU_FIXED_MIX_SIDEBAR:return{menuSetting:{mixSideFixed:o}};case n.OPEN_PAGE_LOADING:return i.setPageLoading(!1),{transitionSetting:{openPageLoading:o}};case n.ROUTER_TRANSITION:return{transitionSetting:{basicTransition:o}};case n.OPEN_ROUTE_TRANSITION:return{transitionSetting:{enable:o}};case n.OPEN_PROGRESS:return{transitionSetting:{openNProgress:o}};case n.LOCK_TIME:return{lockTime:o};case n.FULL_CONTENT:return{fullContent:o};case n.CONTENT_MODE:return{contentMode:o};case n.SHOW_BREADCRUMB:return{showBreadCrumb:o};case n.SHOW_BREADCRUMB_ICON:return{showBreadCrumbIcon:o};case n.GRAY_MODE:return yt(o),{grayMode:o};case n.SHOW_FOOTER:return{showFooter:o};case n.COLOR_WEAK:return Rt(o),{colorWeak:o};case n.SHOW_LOGO:return{showLogo:o};case n.TABS_SHOW_QUICK:return{multiTabsSetting:{showQuick:o}};case n.TABS_SHOW:return{multiTabsSetting:{show:o}};case n.TABS_SHOW_REDO:return{multiTabsSetting:{showRedo:o}};case n.TABS_SHOW_FOLD:return{multiTabsSetting:{showFold:o}};case n.HEADER_THEME:return Ue(o),{headerSetting:{bgColor:o}};case n.HEADER_SEARCH:return{headerSetting:{showSearch:o}};case n.HEADER_FIXED:return{headerSetting:{fixed:o}};case n.HEADER_SHOW:return{headerSetting:{show:o}};default:return{}}}const{t:r}=ae();var _o=z({name:"SettingDrawer",setup(e,{attrs:o}){const{getContentMode:i,getShowFooter:c,getShowBreadCrumb:d,getShowBreadCrumbIcon:E,getShowLogo:a,getFullContent:u,getColorWeak:g,getGrayMode:O,getLockTime:C,getShowDarkModeToggle:T,getThemeColor:F}=ke(),{getOpenPageLoading:Q,getBasicTransition:ue,getEnableTransition:q,getOpenNProgress:_e}=ht(),{getIsHorizontal:v,getShowMenu:Z,getMenuType:l,getTrigger:S,getCollapsedShowTitle:G,getMenuFixed:J,getCollapsed:ee,getCanDrag:te,getTopMenuAlign:ve,getAccordion:Ge,getMenuWidth:We,getMenuBgColor:$e,getIsTopMenu:He,getSplit:oe,getIsMixSidebar:y,getCloseMixSidebarOnChange:Xe,getMixSideTrigger:Ve,getMixSideFixed:Ke}=Lt(),{getShowHeader:h,getFixed:je,getHeaderBgColor:xe,getShowSearch:Ye}=Ft(),{getShowMultipleTab:ne,getShowQuick:ze,getShowRedo:Qe,getShowFold:qe}=vt(),I=M(()=>t(Z)&&!t(v));function Ze(){return s(H,null,[s(eo,{menuTypeList:ro,handler:L=>{lo(n.CHANGE_LAYOUT,{mode:L.mode,type:L.type,split:t(v)?!1:void 0})},def:t(l)},null)])}function Je(){return s(Ee,{colorList:wt,def:t(xe),event:n.HEADER_THEME},null)}function et(){return s(Ee,{colorList:mt,def:t($e),event:n.MENU_THEME},null)}function tt(){return s(Ee,{colorList:Ut,def:t(F),event:n.CHANGE_THEME_COLOR},null)}function ot(){let L=t(S);const pe=so(t(oe));return pe.some(B=>B.value===L)||(L=ie.FOOTER),s(H,null,[s(_,{title:r("layout.setting.splitMenu"),event:n.MENU_SPLIT,def:t(oe),disabled:!t(I)||t(l)!==V.MIX},null),s(_,{title:r("layout.setting.mixSidebarFixed"),event:n.MENU_FIXED_MIX_SIDEBAR,def:t(Ke),disabled:!t(y)},null),s(_,{title:r("layout.setting.closeMixSidebarOnChange"),event:n.MENU_CLOSE_MIX_SIDEBAR_ON_CHANGE,def:t(Xe),disabled:!t(y)},null),s(_,{title:r("layout.setting.menuCollapse"),event:n.MENU_COLLAPSED,def:t(ee),disabled:!t(I)},null),s(_,{title:r("layout.setting.menuDrag"),event:n.MENU_HAS_DRAG,def:t(te),disabled:!t(I)},null),s(_,{title:r("layout.setting.menuSearch"),event:n.HEADER_SEARCH,def:t(Ye),disabled:!t(h)},null),s(_,{title:r("layout.setting.menuAccordion"),event:n.MENU_ACCORDION,def:t(Ge),disabled:!t(I)},null),s(_,{title:r("layout.setting.collapseMenuDisplayName"),event:n.MENU_COLLAPSED_SHOW_TITLE,def:t(G),disabled:!t(I)||!t(ee)||t(y)},null),s(_,{title:r("layout.setting.fixedHeader"),event:n.HEADER_FIXED,def:t(je),disabled:!t(h)},null),s(_,{title:r("layout.setting.fixedSideBar"),event:n.MENU_FIXED,def:t(J),disabled:!t(I)||t(y)},null),s($,{title:r("layout.setting.mixSidebarTrigger"),event:n.MENU_TRIGGER_MIX_SIDEBAR,def:t(Ve),options:ao,disabled:!t(y)},null),s($,{title:r("layout.setting.topMenuLayout"),event:n.MENU_TOP_ALIGN,def:t(ve),options:no,disabled:!t(h)||t(oe)||!t(He)&&!t(oe)||t(y)},null),s($,{title:r("layout.setting.menuCollapseButton"),event:n.MENU_TRIGGER,def:L,options:pe,disabled:!t(I)||t(y)},null),s($,{title:r("layout.setting.contentMode"),event:n.CONTENT_MODE,def:t(i),options:oo},null),s(he,{title:r("layout.setting.autoScreenLock"),min:0,event:n.LOCK_TIME,defaultValue:t(C),formatter:B=>parseInt(B)===0?`0(${r("layout.setting.notAutoScreenLock")})`:`${B}${r("layout.setting.minute")}`},null),s(he,{title:r("layout.setting.expandedMenuWidth"),max:600,min:100,step:10,event:n.MENU_WIDTH,disabled:!t(I),defaultValue:t(We),formatter:B=>`${parseInt(B)}px`},null)])}function nt(){return s(H,null,[s(_,{title:r("layout.setting.breadcrumb"),event:n.SHOW_BREADCRUMB,def:t(d),disabled:!t(h)},null),s(_,{title:r("layout.setting.breadcrumbIcon"),event:n.SHOW_BREADCRUMB_ICON,def:t(E),disabled:!t(h)},null),s(_,{title:r("layout.setting.tabs"),event:n.TABS_SHOW,def:t(ne)},null),s(_,{title:r("layout.setting.tabsRedoBtn"),event:n.TABS_SHOW_REDO,def:t(Qe),disabled:!t(ne)},null),s(_,{title:r("layout.setting.tabsQuickBtn"),event:n.TABS_SHOW_QUICK,def:t(ze),disabled:!t(ne)},null),s(_,{title:r("layout.setting.tabsFoldBtn"),event:n.TABS_SHOW_FOLD,def:t(qe),disabled:!t(ne)},null),s(_,{title:r("layout.setting.sidebar"),event:n.MENU_SHOW_SIDEBAR,def:t(Z),disabled:t(v)},null),s(_,{title:r("layout.setting.header"),event:n.HEADER_SHOW,def:t(h)},null),s(_,{title:"Logo",event:n.SHOW_LOGO,def:t(a),disabled:t(y)},null),s(_,{title:r("layout.setting.footer"),event:n.SHOW_FOOTER,def:t(c)},null),s(_,{title:r("layout.setting.fullContent"),event:n.FULL_CONTENT,def:t(u)},null),s(_,{title:r("layout.setting.grayMode"),event:n.GRAY_MODE,def:t(O)},null),s(_,{title:r("layout.setting.colorWeak"),event:n.COLOR_WEAK,def:t(g)},null)])}function st(){return s(H,null,[s(_,{title:r("layout.setting.progress"),event:n.OPEN_PROGRESS,def:t(_e)},null),s(_,{title:r("layout.setting.switchLoading"),event:n.OPEN_PAGE_LOADING,def:t(Q)},null),s(_,{title:r("layout.setting.switchAnimation"),event:n.OPEN_ROUTE_TRANSITION,def:t(q)},null),s($,{title:r("layout.setting.animationType"),event:n.ROUTER_TRANSITION,def:t(ue),options:io,disabled:!t(q)},null)])}return()=>s(Jt,Y(o,{title:r("layout.setting.drawerTitle"),width:330,class:"setting-drawer"}),{default:()=>[t(T)&&s(A,null,{default:()=>r("layout.setting.darkMode")}),t(T)&&s(Bt,{class:"mx-auto"},null),s(A,null,{default:()=>r("layout.setting.navMode")}),Ze(),s(A,null,{default:()=>r("layout.setting.sysTheme")}),tt(),s(A,null,{default:()=>r("layout.setting.headerTheme")}),Je(),s(A,null,{default:()=>r("layout.setting.sidebarTheme")}),et(),s(A,null,{default:()=>r("layout.setting.interfaceFunction")}),ot(),s(A,null,{default:()=>r("layout.setting.interfaceDisplay")}),nt(),s(A,null,{default:()=>r("layout.setting.animation")}),st(),s(A,null,null),s(to,null,null)]})}});const go=z({name:"SettingButton",components:{SettingDrawer:_o,Icon:Pt},setup(){const[e,{openDrawer:o}]=Zt();return{register:e,openDrawer:o}}});function co(e,o,i,c,d,E){const a=R("Icon"),u=R("SettingDrawer");return f(),U("div",{onClick:o[0]||(o[0]=g=>e.openDrawer(!0))},[s(a,{icon:"ion:settings-outline"}),s(u,{onRegister:e.register},null,8,["onRegister"])])}var Eo=le(go,[["render",co]]),Ao=Object.freeze(Object.defineProperty({__proto__:null,default:Eo},Symbol.toStringTag,{value:"Module"}));export{lo as b,Ao as i};
