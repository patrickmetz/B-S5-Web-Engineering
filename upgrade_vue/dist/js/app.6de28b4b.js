(function(e){function t(t){for(var n,a,i=t[0],u=t[1],p=t[2],l=0,m=[];l<i.length;l++)a=i[l],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&m.push(o[a][0]),o[a]=0;for(n in u)Object.prototype.hasOwnProperty.call(u,n)&&(e[n]=u[n]);c&&c(t);while(m.length)m.shift()();return s.push.apply(s,p||[]),r()}function r(){for(var e,t=0;t<s.length;t++){for(var r=s[t],n=!0,i=1;i<r.length;i++){var u=r[i];0!==o[u]&&(n=!1)}n&&(s.splice(t--,1),e=a(a.s=r[0]))}return e}var n={},o={app:0},s=[];function a(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=e,a.c=n,a.d=function(e,t,r){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)a.d(r,n,function(t){return e[t]}.bind(null,n));return r},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/~pmetz2s/upgrade_vue/dist/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],u=i.push.bind(i);i.push=t,i=i.slice();for(var p=0;p<i.length;p++)t(i[p]);var c=u;s.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"034f":function(e,t,r){"use strict";r("85ec")},"0f42":function(e,t,r){"use strict";r("5d03")},"56d7":function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var n=r("2b0e"),o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"}},[r("LoginForm")],1)},s=[],a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"login"}},[r("form",{attrs:{method:"post",action:"./index.php"},on:{submit:e.submitForm,mouseleave:function(t){e.showForm=!1}}},[r("input",{attrs:{type:"hidden",name:"session_action",value:"login"}}),r("input",{directives:[{name:"show",rawName:"v-show",value:!e.showForm,expression:"!showForm"}],attrs:{type:"button",value:"Anmelden"},on:{click:function(t){e.showForm=!e.showForm}}}),r("input",{directives:[{name:"show",rawName:"v-show",value:e.showForm,expression:"showForm"},{name:"model",rawName:"v-model",value:e.username,expression:"username"}],class:{error:e.usernameIsEmpty},attrs:{type:"text",name:"username",placeholder:"Benutzer"},domProps:{value:e.username},on:{input:function(t){t.target.composing||(e.username=t.target.value)}}}),r("input",{directives:[{name:"show",rawName:"v-show",value:e.showForm,expression:"showForm"},{name:"model",rawName:"v-model",value:e.password,expression:"password"}],class:{error:e.passwordIsEmpty},attrs:{type:"password",name:"password",placeholder:"Passwort"},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}}),r("input",{directives:[{name:"show",rawName:"v-show",value:e.showForm,expression:"showForm"}],attrs:{type:"submit",value:"Abschicken"}})])])},i=[],u={name:"LoginForm",props:{username:String,usernameIsEmpty:{type:Boolean,default:!1},password:String,passwordIsEmpty:{type:Boolean,default:!1},showForm:{type:Boolean,default:!1}},methods:{submitForm:function(e){if(this.resetEmptyStates(),this.checkFields(),this.username&&this.password)return!0;e.preventDefault()},checkUsername:function(){this.usernameIsEmpty=!this.username},checkPassword:function(){this.passwordIsEmpty=!this.password},checkFields:function(){this.checkUsername(),this.checkPassword()},resetEmptyStates:function(){this.usernameIsEmpty=this.passwordIsEmpty=!1}}},p=u,c=(r("0f42"),r("2877")),l=Object(c["a"])(p,a,i,!1,null,"41c04746",null),m=l.exports,d={name:"App",components:{LoginForm:m}},f=d,h=(r("034f"),Object(c["a"])(f,o,s,!1,null,null,null)),w=h.exports;n["a"].config.productionTip=!1,new n["a"]({render:function(e){return e(w)}}).$mount("#app")},"5d03":function(e,t,r){},"85ec":function(e,t,r){}});
//# sourceMappingURL=app.6de28b4b.js.map