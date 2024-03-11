"use strict";(self.webpackChunkgreen_software_training=self.webpackChunkgreen_software_training||[]).push([[112],{4137:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>d});var o=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},i=Object.keys(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=o.createContext({}),s=function(e){var t=o.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},u=function(e){var t=s(e.components);return o.createElement(p.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},c=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,p=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),c=s(n),d=r,f=c["".concat(p,".").concat(d)]||c[d]||m[d]||i;return n?o.createElement(f,a(a({ref:t},u),{},{components:n})):o.createElement(f,a({ref:t},u))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,a=new Array(i);a[0]=c;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:r,a[1]=l;for(var s=2;s<i;s++)a[s]=n[s];return o.createElement.apply(null,a)}return o.createElement.apply(null,n)}c.displayName="MDXCreateElement"},4851:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>a,default:()=>m,frontMatter:()=>i,metadata:()=>l,toc:()=>s});var o=n(7462),r=(n(7294),n(4137));const i={sidebar_position:3},a="How to load plugins",l={unversionedId:"users/how-to-import-plugins",id:"users/how-to-import-plugins",title:"How to load plugins",description:"Plugins are developed separately to the Impact Framework core. However, the IF core developers maintain a standard library of plugins that can be found in this Github repository. We also provide some implementations of popular community plugins, although we rely on other members of the community to maintain them.",source:"@site/docs/users/how-to-import-plugins.md",sourceDirName:"users",slug:"/users/how-to-import-plugins",permalink:"/users/how-to-import-plugins",draft:!1,editUrl:"https://github.com/Green-Software-Foundation/ief/docs/users/how-to-import-plugins.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"How to install Impact Framework",permalink:"/users/how-to-install-if"},next:{title:"How to write a manifest file",permalink:"/users/how-to-write-manifests"}},p={},s=[],u={toc:s};function m(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,o.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"how-to-load-plugins"},"How to load plugins"),(0,r.kt)("p",null,"Plugins are developed separately to the Impact Framework core. However, the IF core developers maintain a standard library of plugins that can be found in this ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/Green-Software-Foundation/if-plugins"},"Github repository"),". We also provide some implementations of popular community plugins, although we rely on other members of the community to maintain them."),(0,r.kt)("p",null,"Use the following commands to install the ",(0,r.kt)("inlineCode",{parentName:"p"},"if-plugins")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"if-unofficial-plugins")," repositories:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"npm -i -g @grnsft/if-plugins\nnpm -i -g @grnsft/if-unofficial-plugins\n")),(0,r.kt)("p",null,"Plugins in these packages can then be invoked in an manifest by providing their path in the plugin initialization, as shown in the following example:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},'name: if-demo\ndescription: demo pipeline\ntags:\ninitialize:\n  plugins:\n    azure-importer:\n      method: AzureImporterModel\n      path: "@grnsft/if-unofficial-plugins"\n    cloud-instance-metadata:\n      method: CloudInstanceMetadataModel\n      path: "@grnsft/if-plugins"\n')),(0,r.kt)("p",null,"Load your plugin directly from your Github repository, or from ",(0,r.kt)("inlineCode",{parentName:"p"},"npm")," if you have published your plugin there. First, you'll need to install it by providing the path to the repository to ",(0,r.kt)("inlineCode",{parentName:"p"},"npm install")," as follows:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sh"},"npm install https://github.com/Green-Software-Foundation/if-plugins\n")),(0,r.kt)("p",null,"You'll need to provide the following fields:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"YOUR-PLUGIN-HERE"),": the same name has to be used to refer to this plugin everywhere across the manifest"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"method"),": the class name for your plugin, e.g. ",(0,r.kt)("inlineCode",{parentName:"li"},"AzureImporter")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"path"),": the path to the plugin")),(0,r.kt)("p",null,"And, if your plugin requires it, add ",(0,r.kt)("inlineCode",{parentName:"p"},"global-config")," too."),(0,r.kt)("p",null,"Then, in your manifest, initialize the plugin as follows:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},"name: plugin-demo\ndescription: loads plugin\ntags: null\ninitialize:\n  plugins:\n    <YOUR-PLUGIN-HERE:\n      method: OutputPlugin\n      path: https://github.com/my-repo/my-plugin\n")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Anyone can develop plugins"),". As long as you conform to our plugin specification, you can load your plugin into the Impact Framework and run it as part of a pipeline. We provide a guide to ",(0,r.kt)("a",{parentName:"p",href:"./how-to-build-plugins.md"},"building plugins")," and a ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/Green-Software-Foundation/if-model-template"},"template")," to help you structure them correctly."))}m.isMDXComponent=!0}}]);