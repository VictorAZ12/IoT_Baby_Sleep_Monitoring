import{aK as q,aL as F,aM as M,aN as H,aO as D,aP as Q,aQ as I,aR as $,aS as x,aT as G,aU as R,aV as J,aW as B}from"./index.34bd6b67.js";function X(n,e){for(var f=-1,a=n==null?0:n.length;++f<a;)if(e(n[f],f,n))return!0;return!1}var Y=1,Z=2;function K(n,e,f,a,g,r){var s=f&Y,u=n.length,l=e.length;if(u!=l&&!(s&&l>u))return!1;var v=r.get(n),d=r.get(e);if(v&&d)return v==e&&d==n;var A=-1,i=!0,p=f&Z?new q:void 0;for(r.set(n,e),r.set(e,n);++A<u;){var T=n[A],O=e[A];if(a)var P=s?a(O,T,A,e,n,r):a(T,O,A,n,e,r);if(P!==void 0){if(P)continue;i=!1;break}if(p){if(!X(e,function(L,_){if(!F(p,_)&&(T===L||g(T,L,f,a,r)))return p.push(_)})){i=!1;break}}else if(!(T===O||g(T,O,f,a,r))){i=!1;break}}return r.delete(n),r.delete(e),i}function W(n){var e=-1,f=Array(n.size);return n.forEach(function(a,g){f[++e]=[g,a]}),f}var m=1,z=2,j="[object Boolean]",V="[object Date]",c="[object Error]",h="[object Map]",o="[object Number]",k="[object RegExp]",nn="[object Set]",en="[object String]",rn="[object Symbol]",an="[object ArrayBuffer]",fn="[object DataView]",N=M?M.prototype:void 0,E=N?N.valueOf:void 0;function sn(n,e,f,a,g,r,s){switch(f){case fn:if(n.byteLength!=e.byteLength||n.byteOffset!=e.byteOffset)return!1;n=n.buffer,e=e.buffer;case an:return!(n.byteLength!=e.byteLength||!r(new D(n),new D(e)));case j:case V:case o:return H(+n,+e);case c:return n.name==e.name&&n.message==e.message;case k:case en:return n==e+"";case h:var u=W;case nn:var l=a&m;if(u||(u=Q),n.size!=e.size&&!l)return!1;var v=s.get(n);if(v)return v==e;a|=z,s.set(n,e);var d=K(u(n),u(e),a,g,r,s);return s.delete(n),d;case rn:if(E)return E.call(n)==E.call(e)}return!1}var gn=1,ln=Object.prototype,un=ln.hasOwnProperty;function vn(n,e,f,a,g,r){var s=f&gn,u=I(n),l=u.length,v=I(e),d=v.length;if(l!=d&&!s)return!1;for(var A=l;A--;){var i=u[A];if(!(s?i in e:un.call(e,i)))return!1}var p=r.get(n),T=r.get(e);if(p&&T)return p==e&&T==n;var O=!0;r.set(n,e),r.set(e,n);for(var P=s;++A<l;){i=u[A];var L=n[i],_=e[i];if(a)var S=s?a(_,L,i,e,n,r):a(L,_,i,n,e,r);if(!(S===void 0?L===_||g(L,_,f,a,r):S)){O=!1;break}P||(P=i=="constructor")}if(O&&!P){var w=n.constructor,t=e.constructor;w!=t&&"constructor"in n&&"constructor"in e&&!(typeof w=="function"&&w instanceof w&&typeof t=="function"&&t instanceof t)&&(O=!1)}return r.delete(n),r.delete(e),O}var An=1,U="[object Arguments]",b="[object Array]",y="[object Object]",Tn=Object.prototype,C=Tn.hasOwnProperty;function On(n,e,f,a,g,r){var s=$(n),u=$(e),l=s?b:x(n),v=u?b:x(e);l=l==U?y:l,v=v==U?y:v;var d=l==y,A=v==y,i=l==v;if(i&&G(n)){if(!G(e))return!1;s=!0,d=!1}if(i&&!d)return r||(r=new R),s||J(n)?K(n,e,f,a,g,r):sn(n,e,l,f,a,g,r);if(!(f&An)){var p=d&&C.call(n,"__wrapped__"),T=A&&C.call(e,"__wrapped__");if(p||T){var O=p?n.value():n,P=T?e.value():e;return r||(r=new R),g(O,P,f,a,r)}}return i?(r||(r=new R),vn(n,e,f,a,g,r)):!1}function dn(n,e,f,a,g){return n===e?!0:n==null||e==null||!B(n)&&!B(e)?n!==n&&e!==e:On(n,e,f,a,dn,g)}export{dn as b};
