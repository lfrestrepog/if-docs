"use strict";(self.webpackChunkgreen_software_training=self.webpackChunkgreen_software_training||[]).push([[954],{4137:(e,t,a)=>{a.d(t,{Zo:()=>p,kt:()=>g});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var d=n.createContext({}),s=function(e){var t=n.useContext(d),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},p=function(e){var t=s(e.components);return n.createElement(d.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,i=e.originalType,d=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),m=s(a),g=r,h=m["".concat(d,".").concat(g)]||m[g]||u[g]||i;return a?n.createElement(h,l(l({ref:t},p),{},{components:a})):n.createElement(h,l({ref:t},p))}));function g(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=a.length,l=new Array(i);l[0]=m;var o={};for(var d in t)hasOwnProperty.call(t,d)&&(o[d]=t[d]);o.originalType=e,o.mdxType="string"==typeof e?e:r,l[1]=o;for(var s=2;s<i;s++)l[s]=a[s];return n.createElement.apply(null,l)}return n.createElement.apply(null,a)}m.displayName="MDXCreateElement"},8606:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>d,contentTitle:()=>l,default:()=>u,frontMatter:()=>i,metadata:()=>o,toc:()=>s});var n=a(7462),r=(a(7294),a(4137));const i={},l="Errors",o={unversionedId:"reference/errors",id:"reference/errors",title:"Errors",description:"IF defines a finite set of error classes. All error messages emitted by IF are attached to one of these classes.",source:"@site/docs/reference/errors.md",sourceDirName:"reference",slug:"/reference/errors",permalink:"/reference/errors",draft:!1,editUrl:"https://github.com/Green-Software-Foundation/if-docs/edit/master/docs/reference/errors.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Command line tool",permalink:"/reference/cli"},next:{title:"IF features",permalink:"/reference/features"}},d={},s=[{value:"IF errors",id:"if-errors",level:2},{value:"<code>ParseCliParamsError</code>",id:"parsecliparamserror",level:3},{value:"Messages",id:"messages",level:4},{value:"<code>ManifestValidationError</code>",id:"manifestvalidationerror",level:3},{value:"<code>InvalidGroupingError</code>",id:"invalidgroupingerror",level:3},{value:"<code>WriteFileError</code>",id:"writefileerror",level:3},{value:"Messages",id:"messages-1",level:4},{value:"<code>CliSourceFileError</code>",id:"clisourcefileerror",level:3},{value:"Messages",id:"messages-2",level:4},{value:"<code>CliTargetFileError</code>",id:"clitargetfileerror",level:3},{value:"<code>PluginInitializationError</code>",id:"plugininitializationerror",level:3},{value:"<code>InvalidAggregationMethodError</code>",id:"invalidaggregationmethoderror",level:3},{value:"<code>MissingAggregationParamError</code>",id:"missingaggregationparamerror",level:3},{value:"Messages",id:"messages-3",level:4},{value:"<code>MissingPluginMethodError</code>",id:"missingpluginmethoderror",level:2},{value:"<code>MissingPluginPathError</code>",id:"missingpluginpatherror",level:2},{value:"<code>InvalidExhaustPluginError</code>",id:"invalidexhaustpluginerror",level:2},{value:"Plugin Errors",id:"plugin-errors",level:2},{value:"<code>GlobalConfigError</code>",id:"globalconfigerror",level:3},{value:"<code>MissingInputDataError</code>",id:"missinginputdataerror",level:3},{value:"<code>ProcessExecutionError</code>",id:"processexecutionerror",level:3},{value:"<code>RegexMismatchError</code>",id:"regexmismatcherror",level:3},{value:"<code>FetchingFileError</code>",id:"fetchingfileerror",level:3},{value:"<code>ReadFileError</code>",id:"readfileerror",level:3},{value:"<code>MissingCSVColumnError</code>",id:"missingcsvcolumnerror",level:3},{value:"<code>QueryDataNotFoundError</code>",id:"querydatanotfounderror",level:3},{value:"<code>InvalidDateInInputError</code>",id:"invaliddateininputerror",level:3},{value:"<code>InvalidPaddingError</code>",id:"invalidpaddingerror",level:3},{value:"<code>InvalidInputError</code>",id:"invalidinputerror",level:3},{value:"<code>ExhaustOutputArgError</code>",id:"exhaustoutputargerror",level:2},{value:"<code>CSVParseError</code>",id:"csvparseerror",level:2},{value:"Capturing errors in manifests",id:"capturing-errors-in-manifests",level:2}],p={toc:s};function u(e){let{components:t,...a}=e;return(0,r.kt)("wrapper",(0,n.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"errors"},"Errors"),(0,r.kt)("p",null,"IF defines a finite set of error classes. All error messages emitted by IF are attached to one of these classes."),(0,r.kt)("p",null,"This page enumerates the error classes. For each error class, we list the messages associated with them along with the likely causes and possible remedies. This should help you to debug issues you are having with IF."),(0,r.kt)("h2",{id:"if-errors"},"IF errors"),(0,r.kt)("h3",{id:"parsecliparamserror"},(0,r.kt)("inlineCode",{parentName:"h3"},"ParseCliParamsError")),(0,r.kt)("p",null,"Errors of this class are caused by invalid input arguments being passed to the ",(0,r.kt)("a",{parentName:"p",href:"/reference/cli"},"CLI"),"."),(0,r.kt)("h4",{id:"messages"},"Messages"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"message"),(0,r.kt)("th",{parentName:"tr",align:null},"cause"),(0,r.kt)("th",{parentName:"tr",align:null},"remedy"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"Unknown option: -<x>")),(0,r.kt)("td",{parentName:"tr",align:null},"Your cli command is not supported by the framework"),(0,r.kt)("td",{parentName:"tr",align:null},"add supported ",(0,r.kt)("inlineCode",{parentName:"td"},"-<x>")," flag to yor run command")))),(0,r.kt)("h3",{id:"manifestvalidationerror"},(0,r.kt)("inlineCode",{parentName:"h3"},"ManifestValidationError")),(0,r.kt)("p",null,"Errors of the ",(0,r.kt)("inlineCode",{parentName:"p"},"ManifestValidationError")," class arise due to a problem in the manifest (yaml) file. Validation of the manifest is done using the ",(0,r.kt)("a",{parentName:"p",href:"https://zod.dev/"},"Zod")," library."),(0,r.kt)("p",null,"The error message will be the error surfaced by Zod, and will include the name of the manifest element that is invalid. Since the set of error messages is very large and all conform to a simple schema, we do not list them exhaustively here, but instead demonstrate using the following example:"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},'ManifestValidationError: "initialize" parameter is required. Error code: invalid_type.')),(0,r.kt)("p",null,"You can infer from the error code that the issue is related to an invalid or missing value encountered during the manifest validation.\nThe message itself indicates that the problematic element is ",(0,r.kt)("inlineCode",{parentName:"p"},"initialize")," and the problem is that it is missing."),(0,r.kt)("p",null,"The remedy for this issue is to add an ",(0,r.kt)("inlineCode",{parentName:"p"},"initialize")," block into the manifest."),(0,r.kt)("h3",{id:"invalidgroupingerror"},(0,r.kt)("inlineCode",{parentName:"h3"},"InvalidGroupingError")),(0,r.kt)("p",null,"Errors of the ",(0,r.kt)("inlineCode",{parentName:"p"},"InvalidGroupingError")," are only emitted by the ",(0,r.kt)("inlineCode",{parentName:"p"},"group-by")," plugin. There is only one associated message; it is emitted when the requested groups do not exist in the tree."),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"message"),(0,r.kt)("th",{parentName:"tr",align:null},"cause"),(0,r.kt)("th",{parentName:"tr",align:null},"remedy"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"Invalid group ${type}.")),(0,r.kt)("td",{parentName:"tr",align:null},"you are requested groupby to regroup the tree based on fields that do not exist"),(0,r.kt)("td",{parentName:"tr",align:null},"Check the spelling of the values passed to ",(0,r.kt)("inlineCode",{parentName:"td"},"groupby")," and ensure the values exist in the tree")))),(0,r.kt)("h3",{id:"writefileerror"},(0,r.kt)("inlineCode",{parentName:"h3"},"WriteFileError")),(0,r.kt)("p",null,"Errors of the ",(0,r.kt)("inlineCode",{parentName:"p"},"WriteFileError")," class are caused by problems writing output data to files. Typically, this can occur when the user does not have sufficient permissions to write to a given file."),(0,r.kt)("h4",{id:"messages-1"},"Messages"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"message"),(0,r.kt)("th",{parentName:"tr",align:null},"cause"),(0,r.kt)("th",{parentName:"tr",align:null},"remedy"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"Failed to write CSV to ${outputPath}: ${error}")),(0,r.kt)("td",{parentName:"tr",align:null},"There was a problem writing data to file"),(0,r.kt)("td",{parentName:"tr",align:null},"check that you have provided a valid output path and that you have valid permissions to write to that location")))),(0,r.kt)("h3",{id:"clisourcefileerror"},(0,r.kt)("inlineCode",{parentName:"h3"},"CliSourceFileError")),(0,r.kt)("p",null,"Errors of the ",(0,r.kt)("inlineCode",{parentName:"p"},"CliSourceFileError")," class are caused by problems with source manifest."),(0,r.kt)("h4",{id:"messages-2"},"Messages"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"message"),(0,r.kt)("th",{parentName:"tr",align:null},"cause"),(0,r.kt)("th",{parentName:"tr",align:null},"remedy"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"Manifest is missing.")),(0,r.kt)("td",{parentName:"tr",align:null},"Source manifest is not provided"),(0,r.kt)("td",{parentName:"tr",align:null},"check that you have provided a path to source manifest")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"Given source file is not in yaml format.")),(0,r.kt)("td",{parentName:"tr",align:null},"Source file is provided, but format is not a yaml format"),(0,r.kt)("td",{parentName:"tr",align:null},"check that you have provided valid yaml manifest")))),(0,r.kt)("h3",{id:"clitargetfileerror"},(0,r.kt)("inlineCode",{parentName:"h3"},"CliTargetFileError")),(0,r.kt)("p",null,"Errors of the ",(0,r.kt)("inlineCode",{parentName:"p"},"CliTargetFileError")," class are caused by problems with target manifest."),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"message"),(0,r.kt)("th",{parentName:"tr",align:null},"cause"),(0,r.kt)("th",{parentName:"tr",align:null},"remedy"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"Given target file is not in yaml format.")),(0,r.kt)("td",{parentName:"tr",align:null},"Target file is provided, but format is not a yaml format"),(0,r.kt)("td",{parentName:"tr",align:null},"check that you have provided valid yaml manifest")))),(0,r.kt)("h3",{id:"plugininitializationerror"},(0,r.kt)("inlineCode",{parentName:"h3"},"PluginInitializationError")),(0,r.kt)("p",null,"Errors of the ",(0,r.kt)("inlineCode",{parentName:"p"},"PluginInitializationError")," arise when a plugin is invoked in a pipeline without having been initialized in the ",(0,r.kt)("inlineCode",{parentName:"p"},"initialize")," block of the manifest being executed."),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"message"),(0,r.kt)("th",{parentName:"tr",align:null},"cause"),(0,r.kt)("th",{parentName:"tr",align:null},"remedy"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"Not initalized plugin: ${name}. Check if ${name} is in 'manifest.initalize.plugins'.")),(0,r.kt)("td",{parentName:"tr",align:null},"a plugin invoked in a pipeline is not initialized"),(0,r.kt)("td",{parentName:"tr",align:null},"ensure all plugins that exist in pipelines across your manifest have been included in the manifest's ",(0,r.kt)("inlineCode",{parentName:"td"},"initialize")," block")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"Provided module ${path} is invalid or not found. ${error ?? ''}")),(0,r.kt)("td",{parentName:"tr",align:null},"a plugin invoked in a pipeline is not initialized"),(0,r.kt)("td",{parentName:"tr",align:null},"ensure all plugins that exist in pipelines across your manifest have been included in the manifest's ",(0,r.kt)("inlineCode",{parentName:"td"},"initialize")," block")))),(0,r.kt)("h3",{id:"invalidaggregationmethoderror"},(0,r.kt)("inlineCode",{parentName:"h3"},"InvalidAggregationMethodError")),(0,r.kt)("p",null,"Errors of the ",(0,r.kt)("inlineCode",{parentName:"p"},"InvalidAggregationMethodError")," class are caused by problems in the configuration of the ",(0,r.kt)("inlineCode",{parentName:"p"},"aggregation")," feature."),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"message"),(0,r.kt)("th",{parentName:"tr",align:null},"cause"),(0,r.kt)("th",{parentName:"tr",align:null},"remedy"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"Aggregation is not possible for given ${metric} since method is 'none'.")),(0,r.kt)("td",{parentName:"tr",align:null},"You are trying to aggregate a metric whose method is set to ",(0,r.kt)("inlineCode",{parentName:"td"},"none")),(0,r.kt)("td",{parentName:"tr",align:null},"Update the aggregation method, or choose a different metric to aggregate.")))),(0,r.kt)("h3",{id:"missingaggregationparamerror"},(0,r.kt)("inlineCode",{parentName:"h3"},"MissingAggregationParamError")),(0,r.kt)("p",null,"Errors of the ",(0,r.kt)("inlineCode",{parentName:"p"},"MissingAggregationParamError")," class are caused by problems in the configuration of the ",(0,r.kt)("inlineCode",{parentName:"p"},"aggregation")," feature. Typically, the aggregation method may be undefined or you have tried to aggregate a metric that IF cannot find in the input data."),(0,r.kt)("h4",{id:"messages-3"},"Messages"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"message"),(0,r.kt)("th",{parentName:"tr",align:null},"cause"),(0,r.kt)("th",{parentName:"tr",align:null},"remedy"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"Aggregation metric ${metric} is not found in inputs[${index}].")),(0,r.kt)("td",{parentName:"tr",align:null},"You are trying to aggegate a metric that doesn't exist in the input data"),(0,r.kt)("td",{parentName:"tr",align:null},"Check that your chosen metric is spelled correctly and that it exists in the input data by the time the ",(0,r.kt)("inlineCode",{parentName:"td"},"aggregate")," feature executes.")))),(0,r.kt)("h2",{id:"missingpluginmethoderror"},(0,r.kt)("inlineCode",{parentName:"h2"},"MissingPluginMethodError")),(0,r.kt)("p",null,"Errors of the ",(0,r.kt)("inlineCode",{parentName:"p"},"MissingPluginMethodError")," class are caused by missing information in manifest's ",(0,r.kt)("inlineCode",{parentName:"p"},"initalize.plugins")," section."),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"message"),(0,r.kt)("th",{parentName:"tr",align:null},"cause"),(0,r.kt)("th",{parentName:"tr",align:null},"remedy"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"Initalization param 'method' is missing.")),(0,r.kt)("td",{parentName:"tr",align:null},"The required ",(0,r.kt)("inlineCode",{parentName:"td"},"method")," field is missing from the ",(0,r.kt)("inlineCode",{parentName:"td"},"initialize")," block for a given plugin."),(0,r.kt)("td",{parentName:"tr",align:null},"Ensure the ",(0,r.kt)("inlineCode",{parentName:"td"},"method")," field is added to the ",(0,r.kt)("inlineCode",{parentName:"td"},"initialize")," block for each plugin. The value should be the name of the function exported by the plugin.")))),(0,r.kt)("h2",{id:"missingpluginpatherror"},(0,r.kt)("inlineCode",{parentName:"h2"},"MissingPluginPathError")),(0,r.kt)("p",null,"Errors of the ",(0,r.kt)("inlineCode",{parentName:"p"},"MissingPluginPathError")," class are caused by missing information in manifest's ",(0,r.kt)("inlineCode",{parentName:"p"},"initalize.plugins")," section."),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"message"),(0,r.kt)("th",{parentName:"tr",align:null},"cause"),(0,r.kt)("th",{parentName:"tr",align:null},"remedy"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"Initalization param 'path' is missing.")),(0,r.kt)("td",{parentName:"tr",align:null},"The required ",(0,r.kt)("inlineCode",{parentName:"td"},"path")," field is missing from the ",(0,r.kt)("inlineCode",{parentName:"td"},"initialize")," block for a given plugin"),(0,r.kt)("td",{parentName:"tr",align:null},"Ensure the ",(0,r.kt)("inlineCode",{parentName:"td"},"path")," field is added to the ",(0,r.kt)("inlineCode",{parentName:"td"},"initialize")," block for each plugin. The value should be the path to the directory in ",(0,r.kt)("inlineCode",{parentName:"td"},"if/node_modules")," for your plugin.")))),(0,r.kt)("h2",{id:"invalidexhaustpluginerror"},(0,r.kt)("inlineCode",{parentName:"h2"},"InvalidExhaustPluginError")),(0,r.kt)("p",null,"Errors of the ",(0,r.kt)("inlineCode",{parentName:"p"},"InvalidExhaustPluginError")," class are caused by using unsupported exhaust plugin."),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"message"),(0,r.kt)("th",{parentName:"tr",align:null},"cause"),(0,r.kt)("th",{parentName:"tr",align:null},"remedy"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"Invalid exhaust plugin: ${pluginName}.")),(0,r.kt)("td",{parentName:"tr",align:null},"Unsupported or misspelled plugin was used as output method"),(0,r.kt)("td",{parentName:"tr",align:null},"Ensure the ",(0,r.kt)("inlineCode",{parentName:"td"},"pluginName")," corresponds to supported plugins.")))),(0,r.kt)("h2",{id:"plugin-errors"},"Plugin Errors"),(0,r.kt)("p",null,"Plugins can emit their own custom error messages, but we still prefer those messages to be attached to one of a finite set of predefined error classes.\nThose classes are listed in this section."),(0,r.kt)("h3",{id:"globalconfigerror"},(0,r.kt)("inlineCode",{parentName:"h3"},"GlobalConfigError")),(0,r.kt)("p",null,"Errors of the ",(0,r.kt)("inlineCode",{parentName:"p"},"GlobalConfigError")," are used when part of the config data provided to a plugin is invalid or missing."),(0,r.kt)("p",null,"For example the ",(0,r.kt)("inlineCode",{parentName:"p"},"Divide")," plugin throws a ",(0,r.kt)("inlineCode",{parentName:"p"},"GlobalConfigError")," when it receives a denominator equal to zero."),(0,r.kt)("p",null,"The message should name the config element that was invalid and describe the reason why. For example:"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},'GlobalConfigError: "denominator" parameter is number must be greater than 0. Error code: too_small.')),(0,r.kt)("h3",{id:"missinginputdataerror"},(0,r.kt)("inlineCode",{parentName:"h3"},"MissingInputDataError")),(0,r.kt)("p",null,"Errors of the ",(0,r.kt)("inlineCode",{parentName:"p"},"MissingInputDataError")," class arise because your plugin is not receiving the data it expects in ",(0,r.kt)("inlineCode",{parentName:"p"},"input")," data, global config or node-level config.\nThe specific messages depend on the plugin. It is expected that the messages emitted by each plugin are listed in their own documentation."),(0,r.kt)("p",null,"The example below is a message emitted by the ",(0,r.kt)("inlineCode",{parentName:"p"},"interpolation")," plugin when the ",(0,r.kt)("inlineCode",{parentName:"p"},"method")," given in global config is ",(0,r.kt)("em",{parentName:"p"},"not")," one of the expected enum variants:"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"MissingInputDataError:   \"interpolation\" parameter is invalid enum value. expected 'spline' | 'linear', received 'dummy'. Error code: invalid_enum_value.")),(0,r.kt)("h3",{id:"processexecutionerror"},(0,r.kt)("inlineCode",{parentName:"h3"},"ProcessExecutionError")),(0,r.kt)("p",null,"Errors of the ",(0,r.kt)("inlineCode",{parentName:"p"},"ProcessExecutionError")," class arise because ",(0,r.kt)("inlineCode",{parentName:"p"},"shell")," plugin have faced problems while executing the script you have provided."),(0,r.kt)("h3",{id:"regexmismatcherror"},(0,r.kt)("inlineCode",{parentName:"h3"},"RegexMismatchError")),(0,r.kt)("p",null,"Errors of the ",(0,r.kt)("inlineCode",{parentName:"p"},"RegexMismatchError")," class arise because ",(0,r.kt)("inlineCode",{parentName:"p"},"regex")," plugin have faced problems while parsing given string with specified ",(0,r.kt)("inlineCode",{parentName:"p"},"regex"),"."),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"message"),(0,r.kt)("th",{parentName:"tr",align:null},"cause"),(0,r.kt)("th",{parentName:"tr",align:null},"remedy"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"${input} does not match the ${match} regex expression")),(0,r.kt)("td",{parentName:"tr",align:null},"Given string doesn't contain anything matching given ",(0,r.kt)("inlineCode",{parentName:"td"},"regex")),(0,r.kt)("td",{parentName:"tr",align:null},"Ensure that input contains string which can be matched by your ",(0,r.kt)("inlineCode",{parentName:"td"},"regex"),".")))),(0,r.kt)("h3",{id:"fetchingfileerror"},(0,r.kt)("inlineCode",{parentName:"h3"},"FetchingFileError")),(0,r.kt)("p",null,"Errors of the ",(0,r.kt)("inlineCode",{parentName:"p"},"FetchingFileError")," class arise because ",(0,r.kt)("inlineCode",{parentName:"p"},"csv-lookup")," plugin have faced problems fetching given ",(0,r.kt)("inlineCode",{parentName:"p"},"url"),"."),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"message"),(0,r.kt)("th",{parentName:"tr",align:null},"cause"),(0,r.kt)("th",{parentName:"tr",align:null},"remedy"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"Failed fetching the file: ${filepath}.")),(0,r.kt)("td",{parentName:"tr",align:null},"Fetching the file with given URL failed"),(0,r.kt)("td",{parentName:"tr",align:null},"Ensure that file's url is accessible")))),(0,r.kt)("h3",{id:"readfileerror"},(0,r.kt)("inlineCode",{parentName:"h3"},"ReadFileError")),(0,r.kt)("p",null,"Errors of the ",(0,r.kt)("inlineCode",{parentName:"p"},"ReadFileError")," class arise because ",(0,r.kt)("inlineCode",{parentName:"p"},"csv-lookup")," plugin have faced problems reading given file ",(0,r.kt)("inlineCode",{parentName:"p"},"path"),". The error should include the file path and the system error that was encountered when IF attempted to read data from the file:"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"message"),(0,r.kt)("th",{parentName:"tr",align:null},"cause"),(0,r.kt)("th",{parentName:"tr",align:null},"remedy"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"Failed reading the file: ${filepath}.")),(0,r.kt)("td",{parentName:"tr",align:null},"Reading the file with given path failed"),(0,r.kt)("td",{parentName:"tr",align:null},"Ensure that file's path is correct")))),(0,r.kt)("h3",{id:"missingcsvcolumnerror"},(0,r.kt)("inlineCode",{parentName:"h3"},"MissingCSVColumnError")),(0,r.kt)("p",null,"Errors of the ",(0,r.kt)("inlineCode",{parentName:"p"},"MissingCSVColumnError")," class arise because ",(0,r.kt)("inlineCode",{parentName:"p"},"csv-lookup")," plugin can't access given csv file column."),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"message"),(0,r.kt)("th",{parentName:"tr",align:null},"cause"),(0,r.kt)("th",{parentName:"tr",align:null},"remedy"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"There is no column with the name: ${columnName}.")),(0,r.kt)("td",{parentName:"tr",align:null},"CSV file doens't contain such column"),(0,r.kt)("td",{parentName:"tr",align:null},"Ensure that specified ",(0,r.kt)("inlineCode",{parentName:"td"},"query")," is correct and contains existing column name.")))),(0,r.kt)("h3",{id:"querydatanotfounderror"},(0,r.kt)("inlineCode",{parentName:"h3"},"QueryDataNotFoundError")),(0,r.kt)("p",null,"Errors of the ",(0,r.kt)("inlineCode",{parentName:"p"},"QueryDataNotFoundError")," class arise because ",(0,r.kt)("inlineCode",{parentName:"p"},"csv-lookup")," plugin can't find ",(0,r.kt)("inlineCode",{parentName:"p"},"query")," related data in given CSV file."),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"message"),(0,r.kt)("th",{parentName:"tr",align:null},"cause"),(0,r.kt)("th",{parentName:"tr",align:null},"remedy"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"One or more of the given query parameters are not found in the target CSV file column headers.")),(0,r.kt)("td",{parentName:"tr",align:null},"CSV file doens't contain data with given criteria."),(0,r.kt)("td",{parentName:"tr",align:null},"Ensure that specified ",(0,r.kt)("inlineCode",{parentName:"td"},"query")," and ",(0,r.kt)("inlineCode",{parentName:"td"},"input")," values have intersection with CSV file's data.")))),(0,r.kt)("h3",{id:"invaliddateininputerror"},(0,r.kt)("inlineCode",{parentName:"h3"},"InvalidDateInInputError")),(0,r.kt)("p",null,"Errors of the ",(0,r.kt)("inlineCode",{parentName:"p"},"InvalidDateInInputError")," class arise because ",(0,r.kt)("inlineCode",{parentName:"p"},"time-sync")," plugin can't parse date from inputs."),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"message"),(0,r.kt)("th",{parentName:"tr",align:null},"cause"),(0,r.kt)("th",{parentName:"tr",align:null},"remedy"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"Unexpected date datatype: ${typeof date}: ${date}")),(0,r.kt)("td",{parentName:"tr",align:null},"Unsupported type for date."),(0,r.kt)("td",{parentName:"tr",align:null},"Ensure that dates in inputs are correct timestamps.")))),(0,r.kt)("h3",{id:"invalidpaddingerror"},(0,r.kt)("inlineCode",{parentName:"h3"},"InvalidPaddingError")),(0,r.kt)("p",null,"Errors of the ",(0,r.kt)("inlineCode",{parentName:"p"},"InvalidPaddingError")," class arise when there is misconfiguration of ",(0,r.kt)("inlineCode",{parentName:"p"},"time-sync")," plugin."),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"message"),(0,r.kt)("th",{parentName:"tr",align:null},"cause"),(0,r.kt)("th",{parentName:"tr",align:null},"remedy"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"Avoiding padding at ${start or end}")),(0,r.kt)("td",{parentName:"tr",align:null},"Error on padding is enabled and config is missing padding configuration."),(0,r.kt)("td",{parentName:"tr",align:null},"Make sure padding is correctly configured.")))),(0,r.kt)("h3",{id:"invalidinputerror"},(0,r.kt)("inlineCode",{parentName:"h3"},"InvalidInputError")),(0,r.kt)("p",null,"Errors of the ",(0,r.kt)("inlineCode",{parentName:"p"},"InvalidInputError")," class arise when there is input timestamps incompatibility while using ",(0,r.kt)("inlineCode",{parentName:"p"},"time-sync")," plugin."),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"message"),(0,r.kt)("th",{parentName:"tr",align:null},"cause"),(0,r.kt)("th",{parentName:"tr",align:null},"remedy"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"Observation timestamps overlap, please check inputs.")),(0,r.kt)("td",{parentName:"tr",align:null},"Input timestamps have overlap."),(0,r.kt)("td",{parentName:"tr",align:null},"Make sure that input timestamps are continuous.")))),(0,r.kt)("h2",{id:"exhaustoutputargerror"},(0,r.kt)("inlineCode",{parentName:"h2"},"ExhaustOutputArgError")),(0,r.kt)("p",null,"Errors of the ",(0,r.kt)("inlineCode",{parentName:"p"},"ExhaustOutputArgError")," class arise when there is output path issues while exporting file or exporting criteria misconfiguration."),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"message"),(0,r.kt)("th",{parentName:"tr",align:null},"cause"),(0,r.kt)("th",{parentName:"tr",align:null},"remedy"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"Output path is required, please make sure output is configured properly.")),(0,r.kt)("td",{parentName:"tr",align:null},"Missed output path."),(0,r.kt)("td",{parentName:"tr",align:null},"Make sure that output path is present in your cli command.")))),(0,r.kt)("h2",{id:"csvparseerror"},(0,r.kt)("inlineCode",{parentName:"h2"},"CSVParseError")),(0,r.kt)("p",null,"Errors of the ",(0,r.kt)("inlineCode",{parentName:"p"},"CSVParseError")," occur due to a problem reading CSV file. Typically, this can occur when provided file is not a CSV."),(0,r.kt)("h2",{id:"capturing-errors-in-manifests"},"Capturing errors in manifests"),(0,r.kt)("p",null,"When you run a ",(0,r.kt)("a",{parentName:"p",href:"/major-concepts/manifest-file"},"manifest"),", IF generates output data and either displays it in the console or saves it to a file. If IF or one of the plugins being executed throws an exception, IF can still return an output file, except instead of adding ",(0,r.kt)("inlineCode",{parentName:"p"},"outputs"),", it captures the error message that caused IF to fail in the manifest's ",(0,r.kt)("inlineCode",{parentName:"p"},"execution")," section. Inside the ",(0,r.kt)("inlineCode",{parentName:"p"},"execution")," section, you will find two fields: ",(0,r.kt)("inlineCode",{parentName:"p"},"status")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"error"),". The ",(0,r.kt)("inlineCode",{parentName:"p"},"status")," field is either ",(0,r.kt)("inlineCode",{parentName:"p"},"success")," or ",(0,r.kt)("inlineCode",{parentName:"p"},"fail"),", and the ",(0,r.kt)("inlineCode",{parentName:"p"},"error")," field contains the error message."),(0,r.kt)("p",null,"For example, the following is an output file generated by running a manifest whose ",(0,r.kt)("inlineCode",{parentName:"p"},"input")," data omitted the required ",(0,r.kt)("inlineCode",{parentName:"p"},"duration")," field:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},"name: basic-error-demo\ndescription:\ntags:\ninitialize:\n  plugins:\n    teads-curve:\n      path: '@grnsft/if-unofficial-plugins'\n      method: TeadsCurve\n      global-config:\n        interpolation: spline\nexecution:\n  status: fail\n  error: 'InputValidationError: \"duration\" parameter is required. Error code: invalid_type'.\ntree:\n  children:\n    child-0:\n      defaults:\n        cpu/thermal-design-power: 100\n      pipeline:\n        observe:\n        regroup:\n        compute:\n          - teads-curve\n      inputs:\n        - timestamp: 2023-07-06T00:00\n          cpu/utilization: 20\n")),(0,r.kt)("p",null,"No configuration is necessary - this is the default behaviour for IF if the output is configured to save to yaml and the manifest has an error causing IF to fail."))}u.isMDXComponent=!0}}]);