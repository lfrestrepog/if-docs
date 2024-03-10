"use strict";(self.webpackChunkgreen_software_training=self.webpackChunkgreen_software_training||[]).push([[491],{4137:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>u});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var g=a.createContext({}),l=function(e){var t=a.useContext(g),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=l(e.components);return a.createElement(g.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,g=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),c=l(n),u=r,d=c["".concat(g,".").concat(u)]||c[u]||m[u]||o;return n?a.createElement(d,i(i({ref:t},p),{},{components:n})):a.createElement(d,i({ref:t},p))}));function u(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=c;var s={};for(var g in t)hasOwnProperty.call(t,g)&&(s[g]=t[g]);s.originalType=e,s.mdxType="string"==typeof e?e:r,i[1]=s;for(var l=2;l<o;l++)i[l]=n[l];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},1802:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>g,contentTitle:()=>i,default:()=>m,frontMatter:()=>o,metadata:()=>s,toc:()=>l});var a=n(7462),r=(n(7294),n(4137));const o={sidebar_position:6},i="Aggregation",s={unversionedId:"major-concepts/aggregation",id:"major-concepts/aggregation",title:"Aggregation",description:"Aggregation is the process of summarizing a set of metrics.",source:"@site/docs/major-concepts/aggregation.md",sourceDirName:"major-concepts",slug:"/major-concepts/aggregation",permalink:"/major-concepts/aggregation",draft:!1,editUrl:"https://github.com/Green-Software-Foundation/ief/docs/major-concepts/aggregation.md",tags:[],version:"current",sidebarPosition:6,frontMatter:{sidebar_position:6},sidebar:"tutorialSidebar",previous:{title:"Design philosophy",permalink:"/major-concepts/design-philosophy"},next:{title:"Group-by",permalink:"/major-concepts/groupby"}},g={},l=[{value:"Configuration",id:"configuration",level:2},{value:"Aggregation methods",id:"aggregation-methods",level:2},{value:"Aggregation outputs",id:"aggregation-outputs",level:2}],p={toc:l};function m(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"aggregation"},"Aggregation"),(0,r.kt)("p",null,"Aggregation is the process of summarizing a set of metrics. "),(0,r.kt)("p",null,"Two types of aggregation can be executed in IF. The first takes a time series and condenses it down into a single number representing an entire observation period, for example, if your time series contains three timesteps, the value of the metric being aggregated is ",(0,r.kt)("inlineCode",{parentName:"p"},"1")," in each timestep and the aggregate is being computed as a sum, the aggregated value for the whole observation period is ",(0,r.kt)("inlineCode",{parentName:"p"},"3"),'. We refer to this as "time series aggregation" or "horizontal aggregation".'),(0,r.kt)("p",null,"The second type of aggregation happens across components in a tree. Where time series exist for multiple child nodes under a parent, their time series are aggregated together into one summary time series that is pushed to the parent node. For example, in the following tree, each child has a time series with three timesteps. At each timestep, the metric value is ",(0,r.kt)("inlineCode",{parentName:"p"},"1")," for both children:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"         parent\n        /      \\\n       /        \\\nchild-1          child-2\ndata: [1,1,1]    data: [1,1,1]\n")),(0,r.kt)("p",null,"Assuming the aggregation method is ",(0,r.kt)("inlineCode",{parentName:"p"},"sum"),", the parent would receive an aggregated time series ","[2,2,2]",', representing the aggregated values from both children. We refer to this as "tree aggregation" or "vertical aggregation".'),(0,r.kt)("h2",{id:"configuration"},"Configuration"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"Aggregate")," is a built-in feature of the IF. This means you do not need to initialize it along with the plugins you are using in your pipeline. All you need to do is to add a small piece of config to your manifest file."),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"aggregate")," config looks as follows:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},'aggregation:\n  metrics:\n    - "carbon"\n    - "energy"\n  type: "both"\n')),(0,r.kt)("p",null,"There are two fields: ",(0,r.kt)("inlineCode",{parentName:"p"},"metrics")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"type"),"."),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"metrics")," is an array of metrics that you want to aggregate. You can provide any value here, but they must match a key that exists in your output data (i.e. if you tell IF to aggregate ",(0,r.kt)("inlineCode",{parentName:"p"},"carbon")," but ",(0,r.kt)("inlineCode",{parentName:"p"},"carbon")," is not in your outputs you will receive an error message and aggregation will fail). You can provide any number of metrics. In the example above, the aggregation feature will operate on the ",(0,r.kt)("inlineCode",{parentName:"p"},"carbon")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"energy")," values."),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"type")," determines which kind of aggregation you want to perform. The choices are ",(0,r.kt)("inlineCode",{parentName:"p"},"horizontal")," (time-series aggregation only), ",(0,r.kt)("inlineCode",{parentName:"p"},"vertical")," (tree aggregation only) or ",(0,r.kt)("inlineCode",{parentName:"p"},"both")," (both kinds of aggregation will be performed). In the example above, both types of aggregation will be performed over the two selected metrics."),(0,r.kt)("h2",{id:"aggregation-methods"},"Aggregation methods"),(0,r.kt)("p",null,"Aggregation can happen in several ways. In the example above, both of the selected metrics are absolute values measured in gCO2eq (carbon) and kWh (energy). To aggregate, it makes sense to add the values in each timestep for time-series aggregation and element-wise across components for tree aggregation. However, summing the values is not always the right way to aggregate. "),(0,r.kt)("p",null,"For example, some values are constants that apply to every timestep - these should simply be copied into the aggregated metric and not summed. For example, if you are using a hard-coded value for grid carbon intensity that applies globally, then you simply want to persist that value into the aggregate - adding them together would provide a misleading result. "),(0,r.kt)("p",null,"Similarly, some values are proportions or percentages. In these cases, the right way to aggregate is usually to take an average rather than summing over a set of values. "),(0,r.kt)("p",null,"The decisions about how to aggregate are made on a case-by-case basis for each individual parameter. We track the aggregation method for each parameter in our ",(0,r.kt)("inlineCode",{parentName:"p"},"params.ts")," file, which contains the canonical set of parameters, their units and aggregation methods. You can append to the parameters in this file by providing ",(0,r.kt)("inlineCode",{parentName:"p"},"params")," data in your manifest file, or you can override our recommended set of parameters entirely by providing a new file to the ",(0,r.kt)("inlineCode",{parentName:"p"},"--override-params")," command in the CLI. In either case, you need to provide an ",(0,r.kt)("inlineCode",{parentName:"p"},"aggregation")," method with your parameters so that IF can look up the right way to aggregate the values."),(0,r.kt)("h2",{id:"aggregation-outputs"},"Aggregation outputs"),(0,r.kt)("p",null,"The aggregation process adds new output data to your manifest file. The two types of aggregation add different outputs. The horizontal (time-series) aggregation adds a new field called ",(0,r.kt)("inlineCode",{parentName:"p"},"aggregated")," to each node whose time series has been aggregated. In the ",(0,r.kt)("inlineCode",{parentName:"p"},"aggregated")," block, you will find the aggregated value for each of the aggregation metrics defined in the aggregation config."),(0,r.kt)("p",null,"The vertical aggregation adds a new array of output observations. These are simply named ",(0,r.kt)("inlineCode",{parentName:"p"},"outputs")," and they always contain a timestamp and duration along with the aggregated metrics for each timestep. "),(0,r.kt)("p",null,"The example below shows the result of running both kinds of aggregation for a single component:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},'   "outputs": [\n      {\n        "carbon": 0.04846481793320214,\n        "energy": 0.00030285447154471535,\n        "timestamp": "2023-12-12T00:00:00.000Z"\n      },\n      {\n        "carbon": 0.037777724630840566,\n        "energy": 0.00023606013840495548,\n        "timestamp": "2023-12-12T00:00:05.000Z"\n      },\n      {\n        "carbon": 0.03630388278027921,\n        "energy": 0.000226848626838947,\n        "timestamp": "2023-12-12T00:00:10.000Z"\n      },\n      {\n        "carbon": 0.0360935970659935,\n        "energy": 0.0002255343411246613,\n        "timestamp": "2023-12-12T00:00:15.000Z"\n      },\n      {\n        "carbon": 0.0360935970659935,\n        "energy": 0.0002255343411246613,\n        "timestamp": "2023-12-12T00:00:20.000Z"\n      },\n      {\n        "carbon": 0.0360935970659935,\n        "energy": 0.0002255343411246613,\n        "timestamp": "2023-12-12T00:00:25.000Z"\n      },\n      {\n        "carbon": 0.0360935970659935,\n        "energy": 0.0002255343411246613,\n        "timestamp": "2023-12-12T00:00:30.000Z"\n      },\n      {\n        "carbon": 0.0360935970659935,\n        "energy": 0.0002255343411246613,\n        "timestamp": "2023-12-12T00:00:35.000Z"\n      },\n    ],\n    "aggregated": {\n      "carbon": 0.3246705689138855,\n      "energy": 0.0020287555470867216\n    }\n')))}m.isMDXComponent=!0}}]);