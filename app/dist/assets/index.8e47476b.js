import{a as h,aJ as y,t as a,b as v,f as x,o as H,i as w,p as S,y as R,j as b,r as f,l as e,bB as u,bg as z,L as B}from"./index.63bdb61e.js";import{u as C}from"./useWindowSizeFn.4b61d293.js";import{a as L}from"./useContentViewHeight.21538ef6.js";const k=["src"],$=h({__name:"index",props:{frameSrc:y.string.def("")},setup(p){const n=a(!0),m=a(50),i=a(window.innerHeight),r=a(),{headerHeightRef:d}=L(),{prefixCls:o}=v("iframe-page");C(l,150,{immediate:!0});const c=x(()=>({height:`${e(i)}px`}));function l(){const s=e(r);if(!s)return;const t=d.value;m.value=t,i.value=window.innerHeight-t;const g=document.documentElement.clientHeight-t;s.style.height=`${g}px`}function _(){n.value=!1,l()}return(s,t)=>(H(),w("div",{class:f(e(o)),style:u(e(c))},[S(e(z),{spinning:n.value,size:"large",style:u(e(c))},{default:R(()=>[b("iframe",{src:p.frameSrc,class:f(`${e(o)}__main`),ref_key:"frameRef",ref:r,onLoad:_},null,42,k)]),_:1},8,["spinning","style"])],6))}});var V=B($,[["__scopeId","data-v-179381bf"]]);export{V as default};
