"use strict";(self.webpackChunkgreen_software_training=self.webpackChunkgreen_software_training||[]).push([[109],{4137:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>f});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),p=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),c=p(n),f=r,d=c["".concat(s,".").concat(f)]||c[f]||m[f]||i;return n?a.createElement(d,o(o({ref:t},u),{},{components:n})):a.createElement(d,o({ref:t},u))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=c;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:r,o[1]=l;for(var p=2;p<i;p++)o[p]=n[p];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},1652:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>m,frontMatter:()=>i,metadata:()=>l,toc:()=>p});var a=n(7462),r=(n(7294),n(4137));const i={sidebar_position:1},o="Quick start",l={unversionedId:"users/quick-start",id:"users/quick-start",title:"Quick start",description:"This page will provide the basic instructions for getting up and running with Impact Framework.",source:"@site/docs/users/quick-start.md",sourceDirName:"users",slug:"/users/quick-start",permalink:"/users/quick-start",draft:!1,editUrl:"https://github.com/Green-Software-Foundation/if-docs/edit/master/docs/users/quick-start.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Users",permalink:"/users/"},next:{title:"How to install Impact Framework",permalink:"/users/how-to-install-if"}},s={},p=[{value:"1: Install Impact Framework",id:"1-install-impact-framework",level:2},{value:"2: Install some plugins",id:"2-install-some-plugins",level:2},{value:"3: Create a manifest file",id:"3-create-a-manifest-file",level:2},{value:"4: Compute your manifest file",id:"4-compute-your-manifest-file",level:2},{value:"Next steps",id:"next-steps",level:2}],u={toc:p};function m(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"quick-start"},"Quick start"),(0,r.kt)("p",null,"This page will provide the basic instructions for getting up and running with Impact Framework."),(0,r.kt)("h2",{id:"1-install-impact-framework"},"1: Install Impact Framework"),(0,r.kt)("p",null,"Install the Impact Framework globally using npm."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sh"},"npm install -g @grnsft/if\n")),(0,r.kt)("p",null,"Read our detailed guide to ",(0,r.kt)("a",{parentName:"p",href:"/users/how-to-install-if"},"installing IF"),"."),(0,r.kt)("h2",{id:"2-install-some-plugins"},"2: Install some plugins"),(0,r.kt)("p",null,"Install some of the plugins you want to include in your pipeline. The following commands will install both the official and unofficial IF model packages."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sh"},"npm install -g @grnsft/if-plugins\nnpm install -g @grnsft/if-unofficial-plugins\n")),(0,r.kt)("p",null,"Read our detailed guide to ",(0,r.kt)("a",{parentName:"p",href:"/users/how-to-import-plugins"},"loading plugins"),"."),(0,r.kt)("h2",{id:"3-create-a-manifest-file"},"3: Create a manifest file"),(0,r.kt)("p",null,"A manifest file contains all the configuration and input data required to measure your application's energy and carbon impacts and should have a ",(0,r.kt)("inlineCode",{parentName:"p"},".yml")," extension. "),(0,r.kt)("p",null,"Open the file, add your data and save the file. The simple example below runs a single snapshot observation through a single plugin."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},"name: basic-demo\ndescription:\ntags:\ninitialize:\n  plugins:\n    teads-curve: \n      path: '@grnsft/if-unofficial-plugins'\n      method: TeadsCurve\n      global-config:\n        interpolation: spline\ntree:\n  children:\n    child-0:\n      defaults:\n        cpu/thermal-design-power: 100\n      pipeline:\n        - teads-curve\n      inputs:\n        - timestamp: 2023-07-06T00:00\n          duration: 1\n          cpu/utilization: 20\n        - timestamp: 2023-07-06T00:01\n          duration: 1\n          cpu/utilization: 80\n        - timestamp: 2023-07-06T00:02\n          duration: 1\n          cpu/utilization: 20\n")),(0,r.kt)("p",null,"Read our detailed guide to ",(0,r.kt)("a",{parentName:"p",href:"/users/how-to-write-manifests"},"writing manifest files"),"."),(0,r.kt)("h2",{id:"4-compute-your-manifest-file"},"4: Compute your manifest file"),(0,r.kt)("p",null,"Run the pipeline by passing the path to your manifest file to the ",(0,r.kt)("inlineCode",{parentName:"p"},"if-run")," command line tool:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sh"},"if-run --manifest <path-to-your-manifest>\n")),(0,r.kt)("p",null,"\ud83c\udf89",(0,r.kt)("strong",{parentName:"p"},"Congratulations")," \ud83c\udf89! You have just used the Impact Framework to compute the energy consumed by an application! "),(0,r.kt)("h2",{id:"next-steps"},"Next steps"),(0,r.kt)("p",null,"Now you know how to use the ",(0,r.kt)("inlineCode",{parentName:"p"},"if-run")," you can start building more complex pipelines of plugins and more complicated manifest files. Your overall aim is to create a manifest file that accurately represents a real software application, and a plugin pipeline that yields an environmental metric that's important to you (e.g. ",(0,r.kt)("inlineCode",{parentName:"p"},"carbon"),")."),(0,r.kt)("p",null,"Experiment by adding more plugins to the pipeline, for example add ",(0,r.kt)("inlineCode",{parentName:"p"},"sci-o")," to convert energy into ",(0,r.kt)("inlineCode",{parentName:"p"},"operational-carbon"),". Your output data will be displayed in your console. "),(0,r.kt)("p",null,"You can also configure ",(0,r.kt)("inlineCode",{parentName:"p"},"if")," to save your output data to another ",(0,r.kt)("inlineCode",{parentName:"p"},"yaml")," file. To do this, add the ",(0,r.kt)("inlineCode",{parentName:"p"},"--output")," flag and the path to the output file where the results are saved."),(0,r.kt)("p",null,"The command is then as follows:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sh"},"if-run --manifest <path-to-your-impl> --output <save-path>\n")),(0,r.kt)("p",null,"Explore our user documentation for walkthrough guides to common Impact Framework tasks:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/users/how-to-install-if"},"How to install Impact Framework")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/users/how-to-import-plugins"},"How to load plugins")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/users/how-to-write-manifests"},"How to write manifest files"))))}m.isMDXComponent=!0}}]);