import{R as n,a as O,O as K,Q as H,a1 as L,a0 as W,X as h,b8 as V,_ as f,W as _,aq as R,p as v,V as D,b9 as g,T as X,Y as b,aw as G,ar as Y,t as J,J as Q,U as Z,Z as tt,$ as et,cn as it}from"./index.34bd6b67.js";import{U as st}from"./warning.fe8ee07c.js";var rt={disabled:n.looseBool,activeClassName:n.string,activeStyle:n.any},nt=O({name:"TouchFeedback",mixins:[K],inheritAttrs:!1,props:H(rt,{disabled:!1}),data:function(){return this.child=null,{active:!1}},mounted:function(){var t=this;this.$nextTick(function(){t.disabled&&t.active&&t.setState({active:!1})})},methods:{triggerEvent:function(t,e,i){var s="on".concat(t),a=this.child;a.props[s]&&a.props[s](i),e!==this.active&&this.setState({active:e})},onTouchStart:function(t){this.triggerEvent("Touchstart",!0,t)},onTouchMove:function(t){this.triggerEvent("Touchmove",!1,t)},onTouchEnd:function(t){this.triggerEvent("Touchend",!1,t)},onTouchCancel:function(t){this.triggerEvent("Touchcancel",!1,t)},onMouseDown:function(t){this.triggerEvent("Mousedown",!0,t)},onMouseUp:function(t){this.triggerEvent("Mouseup",!1,t)},onMouseLeave:function(t){this.triggerEvent("Mouseleave",!1,t)}},render:function(){var t,e=this.$props,i=e.disabled,s=e.activeClassName,a=s===void 0?"":s,o=e.activeStyle,u=o===void 0?{}:o,l=L(this);if(l.length!==1)return W(!1,"m-feedback\u7EC4\u4EF6\u53EA\u80FD\u5305\u542B\u4E00\u4E2A\u5B50\u5143\u7D20"),null;var c=i?void 0:(t={},h(t,V?"onTouchstartPassive":"onTouchstart",this.onTouchStart),h(t,V?"onTouchmovePassive":"onTouchmove",this.onTouchMove),h(t,"onTouchend",this.onTouchEnd),h(t,"onTouchcancel",this.onTouchCancel),h(t,"onMousedown",this.onMouseDown),h(t,"onMouseup",this.onMouseUp),h(t,"onMouseleave",this.onMouseLeave),t);if(l=l[0],this.child=l,!i&&this.active){var p=l.props,d=p.style,m=p.class;return u!==!1&&(u&&(d=f(f({},d),u)),m=_(m,a)),R(l,f({class:m,style:d},c))}return R(l,c)}}),at={name:"InputHandler",inheritAttrs:!1,props:{prefixCls:n.string,disabled:n.looseBool},render:function(){var t=this,e=this.$props,i=e.prefixCls,s=e.disabled,a={disabled:s,activeClassName:"".concat(i,"-handler-active")};return v(nt,a,{default:function(){return[v("span",t.$attrs,[L(t)])]}})}},B=at;function U(r){r.preventDefault()}function ot(r){return r.replace(/[^\w\.-]+/g,"")}var ut=200,lt=600,ct=Number.MAX_SAFE_INTEGER||Math.pow(2,53)-1,w=function(t){return t!=null},M=function(t,e){return e===t||typeof e=="number"&&typeof t=="number"&&isNaN(e)&&isNaN(t)},ht={value:n.oneOfType([n.number,n.string]),defaultValue:n.oneOfType([n.number,n.string]),focusOnUpDown:n.looseBool,autofocus:n.looseBool,prefixCls:n.string,tabindex:n.oneOfType([n.string,n.number]),placeholder:n.string,disabled:n.looseBool,readonly:n.looseBool,max:n.number,min:n.number,step:n.oneOfType([n.number,n.string]),upHandler:n.any,downHandler:n.any,useTouch:n.looseBool,formatter:n.func,parser:n.func,precision:n.number,required:n.looseBool,pattern:n.string,decimalSeparator:n.string,autocomplete:n.string,title:n.string,name:n.string,id:n.string,type:n.string,maxlength:n.any},pt=O({name:"VCInputNumber",mixins:[K],inheritAttrs:!1,props:H(ht,{focusOnUpDown:!0,useTouch:!1,prefixCls:"rc-input-number",min:-ct,step:1,parser:ot,required:!1,autocomplete:"off"}),data:function(){var t=D(this);this.prevProps=f({},t);var e;"value"in t?e=this.value:e=this.defaultValue;var i=this.getValidValue(this.toNumber(e));return{inputValue:this.toPrecisionAsStep(i),sValue:i,focused:this.autofocus}},mounted:function(){var t=this;this.$nextTick(function(){t.updatedFunc()})},updated:function(){var t=this,e=this.$props,i=e.value,s=e.max,a=e.min,o=this.$data.focused,u=this.prevProps,l=D(this);if(u){if(!M(u.value,i)||!M(u.max,s)||!M(u.min,a)){var c=o?i:this.getValidValue(i),p;this.pressingUpOrDown?p=c:this.inputting?p=this.rawInput:p=this.toPrecisionAsStep(c),this.setState({sValue:c,inputValue:p})}var d="value"in l?i:this.$data.sValue;"max"in l&&u.max!==s&&typeof d=="number"&&d>s&&(this.__emit("update:value",s),this.__emit("change",s)),"min"in l&&u.min!==a&&typeof d=="number"&&d<a&&(this.__emit("update:value",a),this.__emit("change",a))}this.prevProps=f({},l),this.$nextTick(function(){t.updatedFunc()})},beforeUnmount:function(){this.stop()},methods:{updatedFunc:function(){var t=this.inputRef;try{if(this.cursorStart!==void 0&&this.$data.focused){if(!this.partRestoreByAfter(this.cursorAfter)&&this.$data.sValue!==this.value){var e=this.cursorStart+1;this.cursorAfter?this.lastKeyCode===g.BACKSPACE?e=this.cursorStart-1:this.lastKeyCode===g.DELETE&&(e=this.cursorStart):e=t.value.length,this.fixCaret(e,e)}else if(this.currentValue===t.value)switch(this.lastKeyCode){case g.BACKSPACE:this.fixCaret(this.cursorStart-1,this.cursorStart-1);break;case g.DELETE:this.fixCaret(this.cursorStart+1,this.cursorStart+1);break;default:}}}catch(i){}this.lastKeyCode=null,this.pressingUpOrDown&&(this.focusOnUpDown&&this.$data.focused&&document.activeElement!==t&&this.focus(),this.pressingUpOrDown=!1)},onKeyDown:function(t){if(t.keyCode===g.UP){var e=this.getRatio(t);this.up(t,e),this.stop()}else if(t.keyCode===g.DOWN){var i=this.getRatio(t);this.down(t,i),this.stop()}else t.keyCode===g.ENTER&&this.__emit("pressEnter",t);this.recordCursorPosition(),this.lastKeyCode=t.keyCode;for(var s=arguments.length,a=new Array(s>1?s-1:0),o=1;o<s;o++)a[o-1]=arguments[o];this.__emit.apply(this,["keydown",t].concat(a))},onKeyUp:function(t){this.stop(),this.recordCursorPosition();for(var e=arguments.length,i=new Array(e>1?e-1:0),s=1;s<e;s++)i[s-1]=arguments[s];this.__emit.apply(this,["keyup",t].concat(i))},onTrigger:function(t){if(t.target.composing)return!1;this.onChange(t)},onChange:function(t){this.$data.focused&&(this.inputting=!0),this.rawInput=this.parser(this.getValueFromEvent(t)),this.setState({inputValue:this.rawInput});var e=this.toNumber(this.rawInput);this.__emit("update:value",e),this.__emit("change",e)},onFocus:function(){this.setState({focused:!0});for(var t=arguments.length,e=new Array(t),i=0;i<t;i++)e[i]=arguments[i];this.__emit.apply(this,["focus"].concat(e))},onBlur:function(){this.inputting=!1,this.setState({focused:!1});var t=this.getCurrentValidValue(this.$data.inputValue),e=this.setValue(t);if(this.$attrs.onBlur&&this.inputRef){var i=this.inputRef.value,s=this.getInputDisplayValue({focused:!1,sValue:e});this.inputRef.value=s;for(var a=arguments.length,o=new Array(a),u=0;u<a;u++)o[u]=arguments[u];this.__emit.apply(this,["blur"].concat(o)),this.inputRef.value=i}},getCurrentValidValue:function(t){var e=t;return e===""?e="":this.isNotCompleteNumber(parseFloat(e,10))?e=this.$data.sValue:e=this.getValidValue(e),this.toNumber(e)},getRatio:function(t){var e=1;return t.metaKey||t.ctrlKey?e=.1:t.shiftKey&&(e=10),e},getValueFromEvent:function(t){var e=t.target.value.trim().replace(/。/g,".");return w(this.decimalSeparator)&&(e=e.replace(this.decimalSeparator,".")),e},getValidValue:function(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:this.min,i=arguments.length>2&&arguments[2]!==void 0?arguments[2]:this.max,s=parseFloat(t,10);return isNaN(s)?t:(s<e&&(s=e),s>i&&(s=i),s)},setValue:function(t,e){var i=this.$props.precision,s=this.isNotCompleteNumber(parseFloat(t,10))?null:parseFloat(t,10),a=this.$data,o=a.sValue,u=o===void 0?null:o,l=a.inputValue,c=l===void 0?null:l,p=typeof s=="number"?s.toFixed(i):"".concat(s),d=s!==u||p!=="".concat(c);return X(this,"value")?this.setState({inputValue:this.toPrecisionAsStep(this.$data.sValue)},e):this.setState({sValue:s,inputValue:this.toPrecisionAsStep(t)},e),d&&(this.__emit("update:value",s),this.__emit("change",s)),s},getPrecision:function(t){if(w(this.precision))return this.precision;var e=t.toString();if(e.indexOf("e-")>=0)return parseInt(e.slice(e.indexOf("e-")+2),10);var i=0;return e.indexOf(".")>=0&&(i=e.length-e.indexOf(".")-1),i},getMaxPrecision:function(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:1;if(w(this.precision))return this.precision;var i=this.step,s=this.getPrecision(e),a=this.getPrecision(i),o=this.getPrecision(t);return t?Math.max(o,s+a):s+a},getPrecisionFactor:function(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:1,i=this.getMaxPrecision(t,e);return Math.pow(10,i)},getInputDisplayValue:function(t){var e=t||this.$data,i=e.focused,s=e.inputValue,a=e.sValue,o;i?o=s:o=this.toPrecisionAsStep(a),o==null&&(o="");var u=this.formatWrapper(o);return w(this.$props.decimalSeparator)&&(u=u.toString().replace(".",this.$props.decimalSeparator)),u},recordCursorPosition:function(){try{var t=this.inputRef;this.cursorStart=t.selectionStart,this.cursorEnd=t.selectionEnd,this.currentValue=t.value,this.cursorBefore=t.value.substring(0,this.cursorStart),this.cursorAfter=t.value.substring(this.cursorEnd)}catch(e){}},fixCaret:function(t,e){if(!(t===void 0||e===void 0||!this.inputRef||!this.inputRef.value))try{var i=this.inputRef,s=i.selectionStart,a=i.selectionEnd;(t!==s||e!==a)&&i.setSelectionRange(t,e)}catch(o){}},restoreByAfter:function(t){if(t===void 0)return!1;var e=this.inputRef.value,i=e.lastIndexOf(t);if(i===-1)return!1;var s=this.cursorBefore.length;return this.lastKeyCode===g.DELETE&&this.cursorBefore.charAt(s-1)===t[0]?(this.fixCaret(s,s),!0):i+t.length===e.length?(this.fixCaret(i,i),!0):!1},partRestoreByAfter:function(t){var e=this;return t===void 0?!1:Array.prototype.some.call(t,function(i,s){var a=t.substring(s);return e.restoreByAfter(a)})},focus:function(){this.inputRef.focus(),this.recordCursorPosition()},blur:function(){this.inputRef.blur()},formatWrapper:function(t){return this.formatter?this.formatter(t):t},toPrecisionAsStep:function(t){if(this.isNotCompleteNumber(t)||t==="")return t;var e=Math.abs(this.getMaxPrecision(t));return isNaN(e)?t.toString():Number(t).toFixed(e)},isNotCompleteNumber:function(t){return isNaN(t)||t===""||t===null||t&&t.toString().indexOf(".")===t.toString().length-1},toNumber:function(t){var e=this.$props,i=e.precision,s=e.autofocus,a=this.$data.focused,o=a===void 0?s:a,u=t&&t.length>16&&o;return this.isNotCompleteNumber(t)||u?t:w(i)?Math.round(t*Math.pow(10,i))/Math.pow(10,i):Number(t)},upStep:function(t,e){var i=this.step,s=this.getPrecisionFactor(t,e),a=Math.abs(this.getMaxPrecision(t,e)),o=((s*t+s*i*e)/s).toFixed(a);return this.toNumber(o)},downStep:function(t,e){var i=this.step,s=this.getPrecisionFactor(t,e),a=Math.abs(this.getMaxPrecision(t,e)),o=((s*t-s*i*e)/s).toFixed(a);return this.toNumber(o)},stepFn:function(t,e){var i=this,s=arguments.length>2&&arguments[2]!==void 0?arguments[2]:1,a=arguments.length>3?arguments[3]:void 0;if(this.stop(),e&&e.preventDefault(),!this.disabled){var o=this.max,u=this.min,l=this.getCurrentValidValue(this.$data.inputValue)||0;if(!this.isNotCompleteNumber(l)){var c=this["".concat(t,"Step")](l,s),p=c>o||c<u;c>o?c=o:c<u&&(c=u),this.setValue(c),this.setState({focused:!0}),!p&&(this.autoStepTimer=setTimeout(function(){i[t](e,s,!0)},a?ut:lt))}}},stop:function(){this.autoStepTimer&&clearTimeout(this.autoStepTimer)},down:function(t,e,i){this.pressingUpOrDown=!0,this.stepFn("down",t,e,i)},up:function(t,e,i){this.pressingUpOrDown=!0,this.stepFn("up",t,e,i)},handleInputClick:function(){this.__emit("click")},saveUp:function(t){this.upHandlerRef=t},saveDown:function(t){this.downHandlerRef=t},saveInput:function(t){this.inputRef=t},onCompositionstart:function(t){t.target.composing=!0},onCompositionend:function(t){this.onChange(t),t.target.composing=!1}},render:function(){var t,e=f(f({},this.$props),this.$attrs),i=e.prefixCls,s=e.disabled,a=e.readonly,o=e.useTouch,u=e.autocomplete,l=e.upHandler,c=e.downHandler,p=e.class,d=_((t={},h(t,p,p),h(t,i,!0),h(t,"".concat(i,"-disabled"),s),h(t,"".concat(i,"-focused"),this.$data.focused),t)),m="",C="",x=this.$data.sValue;if(x||x===0)if(isNaN(x))m="".concat(i,"-handler-up-disabled"),C="".concat(i,"-handler-down-disabled");else{var E=Number(x);E>=this.max&&(m="".concat(i,"-handler-up-disabled")),E<=this.min&&(C="".concat(i,"-handler-down-disabled"))}var A={};for(var y in e)e.hasOwnProperty(y)&&(y.substr(0,5)==="data-"||y.substr(0,5)==="aria-"||y==="role")&&(A[y]=e[y]);var P=!this.readonly&&!this.disabled,q=this.getInputDisplayValue(),N,$;if(o){var S,T;N=(S={},h(S,V?"onTouchstartPassive":"onTouchstart",P&&!m&&this.up),h(S,"onTouchend",this.stop),S),$=(T={},h(T,V?"onTouchstartPassive":"onTouchstart",P&&!C&&this.down),h(T,"onTouchend",this.stop),T)}else N={onMousedown:P&&!m&&this.up,onMouseup:this.stop,onMouseleave:this.stop},$={onMousedown:P&&!C&&this.down,onMouseup:this.stop,onMouseleave:this.stop};var F=!!m||s||a,I=!!C||s||a,j=f(f({disabled:F,prefixCls:i,unselectable:"unselectable",role:"button","aria-label":"Increase Value","aria-disabled":!!F,class:"".concat(i,"-handler ").concat(i,"-handler-up ").concat(m)},N),{ref:this.saveUp}),k=f(f({disabled:I,prefixCls:i,unselectable:"unselectable",role:"button","aria-label":"Decrease Value","aria-disabled":!!I,class:"".concat(i,"-handler ").concat(i,"-handler-down ").concat(C)},$),{ref:this.saveDown});return v("div",{class:d,style:e.style,title:e.title,onMouseenter:e.onMouseenter,onMouseleave:e.onMouseleave,onMouseover:e.onMouseover,onMouseout:e.onMouseout},[v("div",{class:"".concat(i,"-handler-wrap")},[v("span",null,[v(B,b(b({},j),{},{key:"upHandler"}),{default:function(){return[l||v("span",{unselectable:"unselectable",class:"".concat(i,"-handler-up-inner"),onClick:U},null)]}})]),v(B,b(b({},k),{},{key:"downHandler"}),{default:function(){return[c||v("span",{unselectable:"unselectable",class:"".concat(i,"-handler-down-inner"),onClick:U},null)]}})]),v("div",{class:"".concat(i,"-input-wrap")},[v("input",b({role:"spinbutton","aria-valuemin":this.min,"aria-valuemax":this.max,"aria-valuenow":x,required:this.required,type:e.type,placeholder:this.placeholder,onClick:this.handleInputClick,class:"".concat(i,"-input"),tabindex:this.tabindex,autocomplete:u,onFocus:this.onFocus,onBlur:this.onBlur,onKeydown:P&&this.onKeyDown,onKeyup:P&&this.onKeyUp,autofocus:this.autofocus,maxlength:this.maxlength,readonly:this.readonly,disabled:this.disabled,max:this.max,min:this.min,step:this.step,name:this.name,title:this.title,id:this.id,onInput:this.onTrigger,onCompositionstart:this.onCompositionstart,onCompositionend:this.onCompositionend,ref:this.saveInput,value:q,pattern:this.pattern},A),null)])])}}),ft=globalThis&&globalThis.__rest||function(r,t){var e={};for(var i in r)Object.prototype.hasOwnProperty.call(r,i)&&t.indexOf(i)<0&&(e[i]=r[i]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,i=Object.getOwnPropertySymbols(r);s<i.length;s++)t.indexOf(i[s])<0&&Object.prototype.propertyIsEnumerable.call(r,i[s])&&(e[i[s]]=r[i[s]]);return e},dt={prefixCls:n.string,min:n.number,max:n.number,value:n.oneOfType([n.number,n.string]),step:n.oneOfType([n.number,n.string]).def(1),defaultValue:n.oneOfType([n.number,n.string]),tabindex:n.oneOfType([n.number,n.string]),disabled:n.looseBool,size:n.oneOf(Y("large","small","default")),formatter:n.func,parser:n.func,decimalSeparator:n.string,placeholder:n.string,name:n.string,id:n.string,precision:n.number,autofocus:n.looseBool,onPressEnter:{type:Function},onChange:Function},vt=O({name:"AInputNumber",inheritAttrs:!1,props:dt,setup:function(t){var e=J(null),i=function(){e.value.focus()},s=function(){e.value.blur()};return Q(function(){Z(function(){})}),{configProvider:tt("configProvider",et),inputNumberRef:e,focus:i,blur:s}},render:function(){var t,e=f(f({},D(this)),this.$attrs),i=e.prefixCls,s=e.size,a=e.class,o=ft(e,["prefixCls","size","class"]),u=this.configProvider.getPrefixCls,l=u("input-number",i),c=_((t={},h(t,"".concat(l,"-lg"),s==="large"),h(t,"".concat(l,"-sm"),s==="small"),t),a),p=v(st,{class:"".concat(l,"-handler-up-inner")},null),d=v(it,{class:"".concat(l,"-handler-down-inner")},null),m=f(f({prefixCls:l,upHandler:p,downHandler:d},o),{class:c});return v(pt,b(b({},m),{},{ref:"inputNumberRef"}),null)}}),bt=G(vt);export{bt as I};
