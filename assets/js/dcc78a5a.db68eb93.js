"use strict";(self.webpackChunkgreen_software_training=self.webpackChunkgreen_software_training||[]).push([[386],{4137:(e,t,a)=>{a.d(t,{Zo:()=>u,kt:()=>m});var n=a(7294);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,i=function(e,t){if(null==e)return{};var a,n,i={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(i[a]=e[a]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(i[a]=e[a])}return i}var s=n.createContext({}),p=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},u=function(e){var t=p(e.components);return n.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var a=e.components,i=e.mdxType,r=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),d=p(a),m=i,h=d["".concat(s,".").concat(m)]||d[m]||c[m]||r;return a?n.createElement(h,o(o({ref:t},u),{},{components:a})):n.createElement(h,o({ref:t},u))}));function m(e,t){var a=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=a.length,o=new Array(r);o[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:i,o[1]=l;for(var p=2;p<r;p++)o[p]=a[p];return n.createElement.apply(null,o)}return n.createElement.apply(null,a)}d.displayName="MDXCreateElement"},8686:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>c,frontMatter:()=>r,metadata:()=>l,toc:()=>p});var n=a(7462),i=(a(7294),a(4137));const r={author:"Asim Hussain (@jawache)",abstract:"Standardising the interface to measurement models."},o="Model Plugin",l={unversionedId:"specification/model-plugin",id:"specification/model-plugin",title:"Model Plugin",description:"Calculating outputs for every component in a Graph (graph) requires the use of an Impact Model (model) called through an Impact Model Plugin (model plugin).",source:"@site/docs/06-specification/model-plugin.md",sourceDirName:"06-specification",slug:"/specification/model-plugin",permalink:"/specification/model-plugin",draft:!1,editUrl:"https://github.com/Green-Software-Foundation/ief/docs/06-specification/model-plugin.md",tags:[],version:"current",frontMatter:{author:"Asim Hussain (@jawache)",abstract:"Standardising the interface to measurement models."},sidebar:"tutorialSidebar",previous:{title:"Model Plugin Configuration",permalink:"/specification/model-plugin-config"},next:{title:"Observations",permalink:"/specification/observations"}},s={},p=[{value:"What are Impact Models?",id:"what-are-impact-models",level:2},{value:"Why do we need to standardize the interface to models?",id:"why-do-we-need-to-standardize-the-interface-to-models",level:2},{value:"Specification",id:"specification",level:2},{value:"Data Types",id:"data-types",level:2},{value:"Configuration",id:"configuration",level:3},{value:"input",id:"input",level:3},{value:"Exceptions",id:"exceptions",level:2},{value:"Class Interface",id:"class-interface",level:2},{value:"Configure",id:"configure",level:3},{value:"Signature",id:"signature",level:4},{value:"Example usage",id:"example-usage",level:4},{value:"Responsibilities",id:"responsibilities",level:4},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns",level:4},{value:"Raises",id:"raises",level:4},{value:"Execute",id:"execute",level:3},{value:"Signature",id:"signature-1",level:4},{value:"Example usage",id:"example-usage-1",level:4},{value:"Responsibilities",id:"responsibilities-1",level:4},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns-1",level:4},{value:"Raises",id:"raises-1",level:4}],u={toc:p};function c(e){let{components:t,...a}=e;return(0,i.kt)("wrapper",(0,n.Z)({},u,a,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"model-plugin"},"Model Plugin"),(0,i.kt)("p",null,"Calculating outputs for every component in a ",(0,i.kt)("a",{parentName:"p",href:"/specification/graph"},"Graph")," (graph) requires the use of an ",(0,i.kt)("strong",{parentName:"p"},"Impact Model")," (model) called through an ",(0,i.kt)("a",{parentName:"p",href:"Impact%20Model%20Plugin.md"},"Impact Model Plugin")," (model plugin)."),(0,i.kt)("h2",{id:"what-are-impact-models"},"What are Impact Models?"),(0,i.kt)("p",null,"A model converts an input ",(0,i.kt)("a",{parentName:"p",href:"inputs.md"},"input")," into some output ",(0,i.kt)("a",{parentName:"p",href:"Impact%20Metric"},"Impact Metric"),", for example, models that convert an input of CPU utilization into an impact of energy."),(0,i.kt)("p",null,"There are many different ",(0,i.kt)("strong",{parentName:"p"},"models"),", ",(0,i.kt)("a",{parentName:"p",href:"https://dataviz.boavizta.org/"},"Boavizta"),", ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/cloud-carbon-footprint/ccf-coefficients"},"Cloud Carbon Footprint"),", ",(0,i.kt)("a",{parentName:"p",href:"https://www.climatiq.io/data"},"Climatiq")," are some great examples of open-source IMs, there are ",(0,i.kt)("strong",{parentName:"p"},"many other")," closed source, commercial and private models being built in-house inside organizations."),(0,i.kt)("p",null,"The set of models is increasing; however, no single model can cover all impacts, scenarios, environments, contexts, and use cases. To calculate the end-to-end impact of a software application, you need to stitch together many different models. Models differ in fundamental ways in the inputs inputs they accept, their interface, their calculation methodology, their outputs, their granularity, and their coverage. "),(0,i.kt)("p",null,"We expect the choice of which model to use for which software component to come down to an expert decision by a green software professional."),(0,i.kt)("h2",{id:"why-do-we-need-to-standardize-the-interface-to-models"},"Why do we need to standardize the interface to models?"),(0,i.kt)("p",null,"Currently, suppose you want to consume a model in your measurement application. In that case, you must craft custom code to interact with a custom interface since every model has its unique interface. Swapping one model for another requires code changes, and comparing models or validating their accuracy/precision is challenging. "),(0,i.kt)("p",null,"If every model ",(0,i.kt)("strong",{parentName:"p"},"exposed the same interface"),", then those models can easily be plugged into different applications, swapped in and out, upgraded, and compared. "),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Our thesis is simple: if we want a large, vibrant ecosystem of people and tooling around measurement, we need a standard, common interface for all models.")),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"Ecosystems grow and thrive through standards.")),(0,i.kt)("p",null,"This Impact Model Plugin Spec aims to define a common standardized interface to every model, current and future. "),(0,i.kt)("h2",{id:"specification"},"Specification"),(0,i.kt)("p",null,"The Impact Model Plugin Specification project is here to standardize an interface to existing and future impact models."),(0,i.kt)("p",null,"The interface describes the bidirectional communication between a plugin and what's calling the plugin. It describes the function signature, the data types, and the exceptions used to pass back information to the caller."),(0,i.kt)("p",null,"This specification version does not pick any specific language, but it assumes the language is OO and has support for exception handling."),(0,i.kt)("h2",{id:"data-types"},"Data Types"),(0,i.kt)("h3",{id:"configuration"},"Configuration"),(0,i.kt)("p",null,"This is a simple dictionary used to set up a model. Each model is different and can have a wide variety of parameters. The specification cannot define these parameters, so we choose a simple dictionary data type that accepts all types and quantities of parameters."),(0,i.kt)("h3",{id:"input"},"input"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"An ",(0,i.kt)("a",{parentName:"li",href:"inputs.md"},"input")," is a data unit describing some inputs to a model. "),(0,i.kt)("li",{parentName:"ul"},"Since every model differs, we can only specify a little. However, the only two fields that would be mandatory for each input are the date/time when the measurement was gathered and the duration for which the input is valid. "),(0,i.kt)("li",{parentName:"ul"},"For example, you might have some input for CPU utilization, but we also need to know when this input was gathered and for what period the input spans.")),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"![note]"," We will likely need to add a location for grid emissions enrichment and also something regarding the context in which it was measured (e.g., utilization on a ten-year-old chip won't match utilization on a 2023 processor)"),(0,i.kt)("h3",{parentName:"blockquote",id:"impactmetric"},"ImpactMetric")),(0,i.kt)("p",null,"This data type holds the results of a model call, the estimated energy, carbon, and water values. It also might contain information about the calculation for debugging purposes. "),(0,i.kt)("h2",{id:"exceptions"},"Exceptions"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"MissingConfig"),": Some static parameters are not available."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"IncorrectConfig"),": A param has been input, but the value is weird, incorrect, or doesn't work with this model."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"ExternalError"),": Other problems with an external service, networking, disk, etc.")),(0,i.kt)("h2",{id:"class-interface"},"Class Interface"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"interface ModelPluginInterface {\n  public configure(name: string, config: Configuration): ModelPluginInterface\n  public execute(inputs: Arrray<ModelParam>): Array<ModelParam>\n}\n")),(0,i.kt)("h3",{id:"configure"},"Configure"),(0,i.kt)("h4",{id:"signature"},"Signature"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"public configure(name: string, config: Configuration): ModelPluginInterface\n")),(0,i.kt)("h4",{id:"example-usage"},"Example usage"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},'class ConcreteVM extends ModelPluginInterface { ... }\n\nlet model = new ConcreteVM().configure("backend-server", {vendor: "GCP"});\n')),(0,i.kt)("h4",{id:"responsibilities"},"Responsibilities"),(0,i.kt)("p",null,(0,i.kt)("em",{parentName:"p"},"Due to the limitations of the JSII interface, we cannot use static methods and factory patterns.")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Configures an instantiated instance. "),(0,i.kt)("li",{parentName:"ul"},"Performs validation on any of the input static parameters. Each model is different and will require a different set of input static parameters, but at the same time, we need each model to expose the same function signature. If you are passing incorrect params, the model will inform you through"),(0,i.kt)("li",{parentName:"ul"},"Performs any setup work for the model."),(0,i.kt)("li",{parentName:"ul"},"This step is necessary before any other function call in the spec."),(0,i.kt)("li",{parentName:"ul"},"Return an instance to the Impact Model, which holds any required state.")),(0,i.kt)("h4",{id:"parameters"},"Parameters"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"name")," is a simple string identifier, so we can distinguish and refer to this model separately from others."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"config")," is a dictionary of Configuration required to set up this model. Each model is different and can have a variety of parameters; the specification cannot define what these parameters will be, so we choose to have a simple data type of a dictionary.")),(0,i.kt)("h4",{id:"returns"},"Returns"),(0,i.kt)("p",null,"An instance of a ",(0,i.kt)("strong",{parentName:"p"},"Model Plugin")," exposes the ",(0,i.kt)("strong",{parentName:"p"},"Model Plugin Interface"),", which holds any state for this model."),(0,i.kt)("h4",{id:"raises"},"Raises"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"MissingConfig")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"IncorrectConfig")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"ExternalError"))),(0,i.kt)("h3",{id:"execute"},"Execute"),(0,i.kt)("p",null,"This function estimates the emissions based on a single input input. For each input input, we calculate one output Impact Metric. inputs and Impact Metrics have a 1-1 mapping and relationship."),(0,i.kt)("h4",{id:"signature-1"},"Signature"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"public execute(inputs: Array<ModelParams>): Arrray<ModelParams>\n")),(0,i.kt)("h4",{id:"example-usage-1"},"Example usage"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},'class ConcreteVM extends ImpactModelInterface { ... }\nlet model = new ConcreteVM().configure("backend-server", {vendor: "GCP"});\ntry {\n    let input = {\u201cdate-time\u201d: xxxx, \u201cduration\u201d: xxx, \u201ccpu-util\u201d: 0.5};\n    let outputs = model.execute([input]);\n    console.log(outputs);\n} catch {\n    ...\n}\n')),(0,i.kt)("h4",{id:"responsibilities-1"},"Responsibilities"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Checked that the passed in inputs have all the required fields for this model."),(0,i.kt)("li",{parentName:"ul"},"Performs what validations it can that the provided inputs are not malformed."),(0,i.kt)("li",{parentName:"ul"},"Passes the inputs to the underlying carbon model, executes the model, and translates the response to match the emissions data type.")),(0,i.kt)("h4",{id:"parameters-1"},"Parameters"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"inputs")," ",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"This is an array of inputs. "),(0,i.kt)("li",{parentName:"ul"},"Each model can work with different types of inputs; the spec cannot predict what kinds of inputs will be used by all models, so we need to keep this very open. "),(0,i.kt)("li",{parentName:"ul"},"It's an array since we will (in the future) need to deal with GridEMissions (",(0,i.kt)("inlineCode",{parentName:"li"},"I"),"), and that requires input data in a fine grain to make sure we map to ",(0,i.kt)("inlineCode",{parentName:"li"},"I")," at the same granularity. E.g., we might want to output carbon per hour, but the input energy data is in 5min increments so that we can make the grid emissions in the same 5 min increments.")))),(0,i.kt)("h4",{id:"returns-1"},"Returns"),(0,i.kt)("p",null,"An array of instances of an ",(0,i.kt)("inlineCode",{parentName:"p"},"ImpactMetric")," holds the estimate of emissions."),(0,i.kt)("h4",{id:"raises-1"},"Raises"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"NotAuthorized")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"MissingTelemetry")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"MalformedTelemetry")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"ExternalError"))))}c.isMDXComponent=!0}}]);