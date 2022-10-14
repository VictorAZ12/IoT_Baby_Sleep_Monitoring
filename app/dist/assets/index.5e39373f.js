import{L as M,a as U,cU as $,bm as v,bH as D,aJ as b,b as N,c as O,s as S,f as A,aC as t,o as n,i as x,p as r,y as d,k as f,m as _,j as a,r as s,B,F as E,aX as P}from"./index.63bdb61e.js";import{D as R}from"./siteSetting.c485f07c.js";import{c as y,u as V}from"./index.13c0f328.js";import{a as T}from"./index.33431172.js";import{h as F}from"./header.d801b988.js";import"./FullscreenOutlined.c8b6fc93.js";import"./index.8e47476b.js";import"./useWindowSizeFn.4b61d293.js";import"./useContentViewHeight.21538ef6.js";import"./useSortable.cc16dde4.js";import"./_baseIteratee.60ace240.js";import"./_baseIsEqual.0a7c7879.js";import"./get.5a71a4ec.js";import"./index.0c73afc2.js";import"./warning.5dec2cdf.js";import"./lock.fed68270.js";import"./isEqual.12cd14ac.js";const H=U({name:"UserDropdown",components:{Dropdown:$,Menu:v,MenuItem:y(()=>D(()=>import("./DropMenuItem.9def099c.js"),["assets/DropMenuItem.9def099c.js","assets/index.63bdb61e.js","assets/index.02f9de5f.css"])),MenuDivider:v.Divider,LockAction:y(()=>D(()=>import("./LockModal.447c672d.js"),["assets/LockModal.447c672d.js","assets/LockModal.0068f88c.css","assets/index.63bdb61e.js","assets/index.02f9de5f.css","assets/index.33431172.js","assets/index.f6def211.css","assets/useWindowSizeFn.4b61d293.js","assets/FullscreenOutlined.c8b6fc93.js","assets/isEqual.12cd14ac.js","assets/_baseIsEqual.0a7c7879.js","assets/useForm.b22e8f59.js","assets/useForm.d6de97a9.css","assets/index.764ee67b.js","assets/index.722537ae.css","assets/index.1f4ef142.js","assets/index.ccc15a38.css","assets/responsiveObserve.44191bdb.js","assets/_baseIteratee.60ace240.js","assets/get.5a71a4ec.js","assets/useSize.66762e65.js","assets/index.be9b02a2.js","assets/index.17eb4c41.css","assets/index.82704bc9.js","assets/index.80a3d8af.css","assets/index.7d14ebdb.js","assets/index.c4896195.css","assets/index.0cb822fd.js","assets/index.e0a015a1.css","assets/warning.5dec2cdf.js","assets/index.ac95831d.js","assets/index.9905f316.css","assets/index.6dbb4560.js","assets/index.7b8b5e30.css","assets/useSortable.cc16dde4.js","assets/download.24ce7505.js","assets/index.6c5c715d.js","assets/index.cb030764.css","assets/index.2efed9da.js","assets/lock.fed68270.js","assets/header.d801b988.js"]))},props:{theme:b.oneOf(["dark","light"])},setup(){const{prefixCls:e}=N("header-user-dropdown"),{t:g}=O(),{getShowDoc:k,getUseLockPage:h}=V(),i=S(),C=A(()=>{const{realName:u="",avatar:L,desc:I}=i.getUserInfo||{};return{realName:u,avatar:L||F,desc:I}}),[o,{openModal:c}]=T();function l(){c(!0)}function p(){i.confirmLoginOut()}function m(){P(R)}function w(u){switch(u.key){case"logout":p();break;case"doc":m();break;case"lock":l();break}}return{prefixCls:e,t:g,getUserInfo:C,handleMenuClick:w,getShowDoc:k,register:o,getUseLockPage:h}}}),j=["src"];function z(e,g,k,h,i,C){const o=t("MenuItem"),c=t("MenuDivider"),l=t("Menu"),p=t("Dropdown"),m=t("LockAction");return n(),x(E,null,[r(p,{placement:"bottomLeft",overlayClassName:`${e.prefixCls}-dropdown-overlay`},{overlay:d(()=>[r(l,{onClick:e.handleMenuClick},{default:d(()=>[e.getShowDoc?(n(),f(o,{key:"doc",text:e.t("layout.header.dropdownItemDoc"),icon:"ion:document-text-outline"},null,8,["text"])):_("",!0),e.getShowDoc?(n(),f(c,{key:1})):_("",!0),e.getUseLockPage?(n(),f(o,{key:"lock",text:e.t("layout.header.tooltipLock"),icon:"ion:lock-closed-outline"},null,8,["text"])):_("",!0),r(o,{key:"logout",text:e.t("layout.header.dropdownItemLoginOut"),icon:"ion:power-outline"},null,8,["text"])]),_:1},8,["onClick"])]),default:d(()=>[a("span",{class:s([[e.prefixCls,`${e.prefixCls}--${e.theme}`],"flex"])},[a("img",{class:s(`${e.prefixCls}__header`),src:e.getUserInfo.avatar},null,10,j),a("span",{class:s(`${e.prefixCls}__info hidden md:block`)},[a("span",{class:s([`${e.prefixCls}__name  `,"truncate"])},B(e.getUserInfo.realName),3)],2)],2)]),_:1},8,["overlayClassName"]),r(m,{onRegister:e.register},null,8,["onRegister"])],64)}var ce=M(H,[["render",z]]);export{ce as default};
