var L=Object.defineProperty,T=Object.defineProperties;var V=Object.getOwnPropertyDescriptors;var $=Object.getOwnPropertySymbols;var z=Object.prototype.hasOwnProperty,O=Object.prototype.propertyIsEnumerable;var M=(e,t,r)=>t in e?L(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,k=(e,t)=>{for(var r in t||(t={}))z.call(t,r)&&M(e,r,t[r]);if($)for(var r of $(t))O.call(t,r)&&M(e,r,t[r]);return e},B=(e,t)=>T(e,V(t));var P=(e,t,r)=>new Promise((h,d)=>{var b=l=>{try{f(r.next(l))}catch(c){d(c)}},p=l=>{try{f(r.throw(l))}catch(c){d(c)}},f=l=>l.done?h(l.value):Promise.resolve(l.value).then(b,p);f((r=r.apply(e,t)).next())});import{L as q,a as G,bl as H,aJ as J,t as j,bs as F,b as K,bR as Q,b5 as U,c as W,an as X,bu as Y,bN as Z,bq as x,ev as ee,aC as y,o as g,i as E,p as te,y as w,k as A,m as ne,B as N,z as ae,r as re,H as se}from"./index.34bd6b67.js";import{B as S}from"./index.ddf1ac1a.js";const oe=G({name:"LayoutBreadcrumb",components:{Icon:H,[S.name]:S},props:{theme:J.oneOf(["dark","light"])},setup(){const e=j([]),{currentRoute:t}=F(),{prefixCls:r}=K("layout-breadcrumb"),{getShowBreadCrumbIcon:h}=Q(),d=U(),{t:b}=W();X(()=>P(this,null,function*(){var C,I,R;if(t.value.name===Y)return;const s=yield Z(),n=t.value.matched,a=n==null?void 0:n[n.length-1];let o=t.value.path;a&&((C=a==null?void 0:a.meta)==null?void 0:C.currentActiveMenu)&&(o=a.meta.currentActiveMenu);const u=x(s,o),m=s.filter(D=>D.path===u[0]),i=p(m,u);if(!i||i.length===0)return;const _=f(i);(I=t.value.meta)!=null&&I.currentActiveMenu&&_.push(B(k({},t.value),{name:((R=t.value.meta)==null?void 0:R.title)||t.value.name})),e.value=_}));function p(s,n){const a=[];return s.forEach(o=>{var u,m;n.includes(o.path)&&a.push(B(k({},o),{name:((u=o.meta)==null?void 0:u.title)||o.name})),(m=o.children)!=null&&m.length&&a.push(...p(o.children,n))}),a}function f(s){return ee(s,n=>{const{meta:a,name:o}=n;if(!a)return!!o;const{title:u,hideBreadcrumb:m,hideMenu:i}=a;return!(!u||m||i)}).filter(n=>{var a;return!((a=n.meta)!=null&&a.hideBreadcrumb)})}function l(s,n,a){a==null||a.preventDefault();const{children:o,redirect:u,meta:m}=s;if((o==null?void 0:o.length)&&!u){a==null||a.stopPropagation();return}if(!(m!=null&&m.carryParam))if(u&&se(u))d(u);else{let i="";n.length===1?i=n[0]:i=`${n.slice(1).pop()||""}`,i=/^\//.test(i)?i:`/${i}`,d(i)}}function c(s,n){return s.indexOf(n)!==s.length-1}function v(s){var n;return s.icon||((n=s.meta)==null?void 0:n.icon)}return{routes:e,t:b,prefixCls:r,getIcon:v,getShowBreadCrumbIcon:h,handleClick:l,hasRedirect:c}}}),ce={key:1};function ie(e,t,r,h,d,b){const p=y("Icon"),f=y("router-link"),l=y("a-breadcrumb");return g(),E("div",{class:re([e.prefixCls,`${e.prefixCls}--${e.theme}`])},[te(l,{routes:e.routes},{itemRender:w(({route:c,routes:v,paths:s})=>[e.getShowBreadCrumbIcon&&e.getIcon(c)?(g(),A(p,{key:0,icon:e.getIcon(c)},null,8,["icon"])):ne("",!0),e.hasRedirect(v,c)?(g(),A(f,{key:2,to:"",onClick:n=>e.handleClick(c,s,n)},{default:w(()=>[ae(N(e.t(c.name||c.meta.title)),1)]),_:2},1032,["onClick"])):(g(),E("span",ce,N(e.t(c.name||c.meta.title)),1))]),_:1},8,["routes"])],2)}var fe=q(oe,[["render",ie]]);export{fe as default};
