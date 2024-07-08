"use strict";(self.webpackChunkgreen_software_training=self.webpackChunkgreen_software_training||[]).push([[960],{4137:(e,n,t)=>{t.d(n,{Zo:()=>s,kt:()=>f});var i=t(7294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,i)}return t}function r(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,i,a=function(e,n){if(null==e)return{};var t,i,a={},o=Object.keys(e);for(i=0;i<o.length;i++)t=o[i],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(i=0;i<o.length;i++)t=o[i],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var p=i.createContext({}),d=function(e){var n=i.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):r(r({},n),e)),t},s=function(e){var n=d(e.components);return i.createElement(p.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return i.createElement(i.Fragment,{},n)}},m=i.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,p=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),m=d(t),f=a,c=m["".concat(p,".").concat(f)]||m[f]||u[f]||o;return t?i.createElement(c,r(r({ref:n},s),{},{components:t})):i.createElement(c,r({ref:n},s))}));function f(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,r=new Array(o);r[0]=m;var l={};for(var p in n)hasOwnProperty.call(n,p)&&(l[p]=n[p]);l.originalType=e,l.mdxType="string"==typeof e?e:a,r[1]=l;for(var d=2;d<o;d++)r[d]=t[d];return i.createElement.apply(null,r)}return i.createElement.apply(null,t)}m.displayName="MDXCreateElement"},8699:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>r,default:()=>u,frontMatter:()=>o,metadata:()=>l,toc:()=>d});var i=t(7462),a=(t(7294),t(4137));const o={},r="Command line tool",l={unversionedId:"reference/cli",id:"reference/cli",title:"Command line tool",description:"A core feature of the Impact Framework is the if-run command line tool (CLI). This is how you trigger Impact Framework to execute a certain manifest file.",source:"@site/docs/reference/cli.md",sourceDirName:"reference",slug:"/reference/cli",permalink:"/reference/cli",draft:!1,editUrl:"https://github.com/Green-Software-Foundation/if-docs/edit/master/docs/reference/cli.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Reference",permalink:"/reference/"},next:{title:"Errors",permalink:"/reference/errors"}},p={},d=[{value:"<code>if-run</code>",id:"if-run",level:2},{value:"<code>--manifest</code> , <code>-m</code>",id:"--manifest---m",level:3},{value:"<code>--output</code> , <code>-o</code>",id:"--output---o",level:3},{value:"CSV export identifiers",id:"csv-export-identifiers",level:4},{value:"<code>--override-params</code> , <code>-p</code>",id:"--override-params---p",level:3},{value:"<code>--help</code> , <code>-h</code>",id:"--help---h",level:3},{value:"<code>--debug</code>",id:"--debug",level:3},{value:"<code>if-diff</code>",id:"if-diff",level:2},{value:"<code>if-diff</code> matching rules",id:"if-diff-matching-rules",level:3},{value:"<code>if-diff</code> outputs",id:"if-diff-outputs",level:3},{value:"<code>if-env</code>",id:"if-env",level:2},{value:"commands",id:"commands",level:3},{value:"Setting up new development environments using <code>if-env</code>",id:"setting-up-new-development-environments-using-if-env",level:3},{value:"Replicating runtime environments using <code>if-env</code>",id:"replicating-runtime-environments-using-if-env",level:3},{value:"<code>if-check</code>",id:"if-check",level:2},{value:"Running IF over multiple manifests with <code>--d</code>",id:"running-if-over-multiple-manifests-with---d",level:3}],s={toc:d};function u(e){let{components:n,...t}=e;return(0,a.kt)("wrapper",(0,i.Z)({},s,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"command-line-tool"},"Command line tool"),(0,a.kt)("p",null,"A core feature of the Impact Framework is the ",(0,a.kt)("inlineCode",{parentName:"p"},"if-run")," command line tool (CLI). This is how you trigger Impact Framework to execute a certain manifest file."),(0,a.kt)("p",null,"We also provide several other command line tools that work in concert with ",(0,a.kt)("inlineCode",{parentName:"p"},"if-run")," to enable flows such as comparing, re-executing and verifying IF output files."),(0,a.kt)("p",null,"This page includes reference documentation for the CLI tools, including the various commands and flags each tool exposes."),(0,a.kt)("p",null,"We also provide tutorial-style user documentation for these tools in the ",(0,a.kt)("a",{parentName:"p",href:"../users/"},(0,a.kt)("inlineCode",{parentName:"a"},"Users"))," section."),(0,a.kt)("h2",{id:"if-run"},(0,a.kt)("inlineCode",{parentName:"h2"},"if-run")),(0,a.kt)("p",null,"If you have globally installed our ",(0,a.kt)("inlineCode",{parentName:"p"},"if")," npm package, you can invoke the CLI using the ",(0,a.kt)("inlineCode",{parentName:"p"},"if-run")," command directly in your terminal. The ",(0,a.kt)("inlineCode",{parentName:"p"},"if-run")," command is an alias to ",(0,a.kt)("inlineCode",{parentName:"p"},"npx ts-node src/index.ts"),", which executes the Impact Framework's ",(0,a.kt)("inlineCode",{parentName:"p"},"src/index.ts")," script and acts as the entry point for Impact Framework."),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"if-run <args>")),(0,a.kt)("h3",{id:"--manifest---m"},(0,a.kt)("inlineCode",{parentName:"h3"},"--manifest")," , ",(0,a.kt)("inlineCode",{parentName:"h3"},"-m")),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"--manifest")," flag is the only required flag and tells ",(0,a.kt)("inlineCode",{parentName:"p"},"if-run")," where to find the manifest file that you want to execute. This command expects to receive the path where your manifest file is saved, as shown in the following example:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"if-run --manifest examples/manifests/my-manifest.yml\n")),(0,a.kt)("h3",{id:"--output---o"},(0,a.kt)("inlineCode",{parentName:"h3"},"--output")," , ",(0,a.kt)("inlineCode",{parentName:"h3"},"-o")),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"--output")," flag is optional and is used for defining a path to save your output data."),(0,a.kt)("p",null,"Here is an example of ",(0,a.kt)("inlineCode",{parentName:"p"},"--output")," being used to define a path:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"if-run --manifest examples/manifests/my-manifest.yml --output examples/outputs/my-outdata\n## or using aliases\nif-run -m examples/manifests/my-manifest.yml -o examples/outputs/my-outdata\n")),(0,a.kt)("p",null,"If ",(0,a.kt)("inlineCode",{parentName:"p"},"my-manifest.yml")," contains the following config, then a ",(0,a.kt)("inlineCode",{parentName:"p"},"yaml")," file named ",(0,a.kt)("inlineCode",{parentName:"p"},"my-outdata.yml")," will be created, containing the results from your IF run."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml"},"initialize:\n  output:\n    - yaml\n")),(0,a.kt)("h4",{id:"csv-export-identifiers"},"CSV export identifiers"),(0,a.kt)("p",null,"If you want to save data to CSV, you have to select a specific metric to export. You do this by adding a hashtag and the metric name after the savepath provided to the output command. For example, you could save the ",(0,a.kt)("inlineCode",{parentName:"p"},"carbon")," data to a CSV file called ",(0,a.kt)("inlineCode",{parentName:"p"},"demo.csv")," as follows:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"if-run --manifest demo.yml --output demo#carbon\n## or\nif-run -m demo.yml -o demo#carbon\n")),(0,a.kt)("h3",{id:"--override-params---p"},(0,a.kt)("inlineCode",{parentName:"h3"},"--override-params")," , ",(0,a.kt)("inlineCode",{parentName:"h3"},"-p")),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"override-params")," command is used when you want to discard our recommended set of parameters and associated units and aggregation methods and instead provide your own. We do not recommend this, and if you use this feature you take full responsibility for any errors you introduce downstream, including unit or aggregation errors. This is why we hide the ability to override the parameters behind a CLI command - it is an advanced feature that you should only use if you really know what you are doing."),(0,a.kt)("p",null,"You pass the path to your new parameter file as an argument. The file is expected to conform to the same structure as our ",(0,a.kt)("inlineCode",{parentName:"p"},"src/config/params.ts")," file."),(0,a.kt)("p",null,"For example:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"if-run --manifest <your manifest> --override-params <path-to-your-params-file>\n## or using aliases\nif-run -m <your manifest> -p <path-to-your-params-file>\n")),(0,a.kt)("h3",{id:"--help---h"},(0,a.kt)("inlineCode",{parentName:"h3"},"--help")," , ",(0,a.kt)("inlineCode",{parentName:"h3"},"-h")),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"--help")," command provides information about all available commands in order to help you easily find the command you need."),(0,a.kt)("p",null,"Example:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"if-run --help\n## or using alias\nif-run -h\n")),(0,a.kt)("h3",{id:"--debug"},(0,a.kt)("inlineCode",{parentName:"h3"},"--debug")),(0,a.kt)("p",null,"You can provide the ",(0,a.kt)("inlineCode",{parentName:"p"},"--debug")," flag to ",(0,a.kt)("inlineCode",{parentName:"p"},"ie")," in order to display execution logs to the console. These logs show messages for each operation IF and its plugins are executing. For example, your ",(0,a.kt)("inlineCode",{parentName:"p"},"debug")," logs will look similar to the following:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"INFO: 2024-06-12T08:48:02.918Z: Starting IF\nDEBUG: 2024-06-12T08:48:02.919Z: Loading manifest\nDEBUG: 2024-06-12T08:48:02.924Z: Capturing runtime environment data\nDEBUG: 2024-06-12T08:48:03.978Z: Validating manifest\nDEBUG: 2024-06-12T08:48:03.980Z: Syncing parameters\nDEBUG: 2024-06-12T08:48:03.980Z: Initializing plugins\nDEBUG: 2024-06-12T08:48:03.981Z: Initializing Sum\nDEBUG: 2024-06-12T08:48:03.981Z: Loading Sum from builtin\nDEBUG: 2024-06-12T08:48:04.859Z: Initializing Coefficient\nDEBUG: 2024-06-12T08:48:04.859Z: Loading Coefficient from builtin\nDEBUG: 2024-06-12T08:48:04.860Z: Initializing Multiply\nDEBUG: 2024-06-12T08:48:04.860Z: Loading Multiply from builtin\nDEBUG: 2024-06-12T08:48:04.860Z: Computing pipeline for `sum`\nDEBUG: 2024-06-12T08:48:04.861Z: Computing pipeline for `coefficient`\nDEBUG: 2024-06-12T08:48:04.861Z: Computing pipeline for `multiply`\nDEBUG: 2024-06-12T08:48:04.862Z: Aggregating outputs\nDEBUG: 2024-06-12T08:48:04.862Z: Preparing output data\n")),(0,a.kt)("p",null,"You can use the ",(0,a.kt)("inlineCode",{parentName:"p"},"--debug")," flag to help debug failing IF runs. You will see exactly where in the execution pipeline an error arose. If the error arose from a plugin, this will be clear from the execution logs, for example:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"INFO: 2024-06-12T08:53:21.376Z: Starting IF\nDEBUG: 2024-06-12T08:53:21.376Z: Loading manifest\nDEBUG: 2024-06-12T08:53:21.381Z: Capturing runtime environment data\nDEBUG: 2024-06-12T08:53:22.367Z: Validating manifest\nDEBUG: 2024-06-12T08:53:22.369Z: Syncing parameters\nDEBUG: 2024-06-12T08:53:22.369Z: Initializing plugins\nDEBUG: 2024-06-12T08:53:22.369Z: Initializing Sum\nDEBUG: 2024-06-12T08:53:22.370Z: Loading Sum from builtin\nDEBUG: 2024-06-12T08:53:23.165Z: Initializing Coefficient\nDEBUG: 2024-06-12T08:53:23.165Z: Loading Coefficient from builtin\nDEBUG: 2024-06-12T08:53:23.165Z: Initializing Multiply\nDEBUG: 2024-06-12T08:53:23.165Z: Loading Multiply from builtin\nDEBUG: 2024-06-12T08:53:23.165Z: Computing pipeline for `sum`\n[2024-06-12 09:53:23.166 AM] error:     cpu/energy is missing from the input array.\n")),(0,a.kt)("h2",{id:"if-diff"},(0,a.kt)("inlineCode",{parentName:"h2"},"if-diff")),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"if-diff")," command line tool allows you to determine whether two manifest or output files are the same, and if not, how they differ."),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"if-diff")," needs two files to compare - a ",(0,a.kt)("inlineCode",{parentName:"p"},"source")," and a ",(0,a.kt)("inlineCode",{parentName:"p"},"target"),". The ",(0,a.kt)("inlineCode",{parentName:"p"},"source"),' file is considered to be the "true" file that another file, the ',(0,a.kt)("inlineCode",{parentName:"p"},"target"),", is compared against. Note that for most purposes, it doesn't matter which file is assigned as ",(0,a.kt)("inlineCode",{parentName:"p"},"source")," or ",(0,a.kt)("inlineCode",{parentName:"p"},"target")," - the important thing is that ",(0,a.kt)("inlineCode",{parentName:"p"},"if-diff")," receives two files. Both files should be ",(0,a.kt)("inlineCode",{parentName:"p"},"yaml")," files. They are expected to be IF output files, meaning they contain all the required fields of a ",(0,a.kt)("inlineCode",{parentName:"p"},"manifest")," plus the IF-generated ",(0,a.kt)("inlineCode",{parentName:"p"},"output")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"execution")," blocks."),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"if-diff")," is run as follows:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"if-diff --source file-1.yml --target file2.yml\n")),(0,a.kt)("p",null,"You can also pipe the outputs from ",(0,a.kt)("inlineCode",{parentName:"p"},"if-run")," directly into ",(0,a.kt)("inlineCode",{parentName:"p"},"if-diff"),". This means you only provide ",(0,a.kt)("em",{parentName:"p"},"one")," file to ",(0,a.kt)("inlineCode",{parentName:"p"},"if-diff")," and the other comes from a new ",(0,a.kt)("inlineCode",{parentName:"p"},"if-run")," run configured to send its output data to the console. This is an important feature because it allows you to receive an output file and verify that it was computed correctly and not tampered with post-execution. For example, if someone provides you with an output file, you can strip out the ",(0,a.kt)("inlineCode",{parentName:"p"},"outputs")," section and re-run it with ",(0,a.kt)("inlineCode",{parentName:"p"},"if-run"),", piping the outputs straight to ",(0,a.kt)("inlineCode",{parentName:"p"},"if-diff")," to compare against the original you received."),(0,a.kt)("p",null,"If the original was correctly and honestly reported, ",(0,a.kt)("inlineCode",{parentName:"p"},"if-diff")," will return a success response."),(0,a.kt)("p",null,"e.g."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"if-run -m my-manifest | if-diff --target my-output-file.yml\n")),(0,a.kt)("h3",{id:"if-diff-matching-rules"},(0,a.kt)("inlineCode",{parentName:"h3"},"if-diff")," matching rules"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"if-diff")," looks for differences between the ",(0,a.kt)("inlineCode",{parentName:"p"},"source")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"target"),". However, ",(0,a.kt)("inlineCode",{parentName:"p"},"if-diff")," applies its own IF-specific matching rules, ensuring that the outputs are functionally identical even if they are not precisely identical. For example, ",(0,a.kt)("inlineCode",{parentName:"p"},"if-diff")," allows the order of nodes in a tree to vary between files as long as identically named components contain identical data."),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Difference identified"),(0,a.kt)("th",{parentName:"tr",align:null},"Report or ignore?"),(0,a.kt)("th",{parentName:"tr",align:null},"Note"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"trees contain different number of nodes"),(0,a.kt)("td",{parentName:"tr",align:null},"report"),(0,a.kt)("td",{parentName:"tr",align:null},"works the same regardless whether ",(0,a.kt)("inlineCode",{parentName:"td"},"source")," or ",(0,a.kt)("inlineCode",{parentName:"td"},"target")," has more nodes")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"nodes in tree have different names"),(0,a.kt)("td",{parentName:"tr",align:null},"report"),(0,a.kt)("td",{parentName:"tr",align:null},"There should be no named nodes existing in one file that aren't also in the other")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"nodes in tree contain non-identical fields and/or values"),(0,a.kt)("td",{parentName:"tr",align:null},"report"),(0,a.kt)("td",{parentName:"tr",align:null},"the data inside each tree component should contain identical keys/values")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"keys and values in context field are non- identical"),(0,a.kt)("td",{parentName:"tr",align:null},"report"),(0,a.kt)("td",{parentName:"tr",align:null},"the same fields should exist in the ",(0,a.kt)("inlineCode",{parentName:"td"},"context")," section and their values should be identical")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},(0,a.kt)("inlineCode",{parentName:"td"},"status")," and ",(0,a.kt)("inlineCode",{parentName:"td"},"error")," fields in ",(0,a.kt)("inlineCode",{parentName:"td"},"execution")," block"),(0,a.kt)("td",{parentName:"tr",align:null},"report"),(0,a.kt)("td",{parentName:"tr",align:null},"Only these two fields in ",(0,a.kt)("inlineCode",{parentName:"td"},"execution")," are considered")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"order of nodes in tree are different"),(0,a.kt)("td",{parentName:"tr",align:null},"ignore"),(0,a.kt)("td",{parentName:"tr",align:null},"if data is identical, position of node in tree is ignored")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"order of fields in context"),(0,a.kt)("td",{parentName:"tr",align:null},"ignore"),(0,a.kt)("td",{parentName:"tr",align:null},"if data is identical, position of field in context is ignored")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"content of execution block EXCEPT ",(0,a.kt)("inlineCode",{parentName:"td"},"status")," and ",(0,a.kt)("inlineCode",{parentName:"td"},"error")),(0,a.kt)("td",{parentName:"tr",align:null},"ignore"),(0,a.kt)("td",{parentName:"tr",align:null},"environment information is ignored")))),(0,a.kt)("h3",{id:"if-diff-outputs"},(0,a.kt)("inlineCode",{parentName:"h3"},"if-diff")," outputs"),(0,a.kt)("p",null,"If ",(0,a.kt)("inlineCode",{parentName:"p"},"if-diff")," finds no in-scope differences between the ",(0,a.kt)("inlineCode",{parentName:"p"},"source")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"target")," then it returns a success message and exit code ",(0,a.kt)("inlineCode",{parentName:"p"},"0"),":"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"FILES MATCH and exit code 0.\n")),(0,a.kt)("p",null,"If ",(0,a.kt)("inlineCode",{parentName:"p"},"if-diff")," detects an in-scope difference between the files, it halts execution, returns exit code ",(0,a.kt)("inlineCode",{parentName:"p"},"1")," and reports the difference to the command line."),(0,a.kt)("p",null,"The report includes the yaml path to the differing element in the tree, the value in the ",(0,a.kt)("inlineCode",{parentName:"p"},"source")," and the value in the ",(0,a.kt)("inlineCode",{parentName:"p"},"target"),", using the following schema:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"Files do not match!\n<yaml path to non-matching element>\nsource: <value in source file>\ntarget: <value in target file>\n")),(0,a.kt)("p",null,"If the difference relates to a missing node in the tree for source or target then ",(0,a.kt)("inlineCode",{parentName:"p"},"<value in x file>")," should be either exists or missing and the yaml path should point to the highest level element that is missing (e.g. if an entire child component is missing, provide the path to the child component)."),(0,a.kt)("p",null,"e.g. different values detected for a given key in an input array:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"Files do not match!\ntree.children.vm1[4].cpu/utilization\nsource: 45\ntarget:  43\n")),(0,a.kt)("p",null,"e.g. different components in ",(0,a.kt)("inlineCode",{parentName:"p"},"tree")," in ",(0,a.kt)("inlineCode",{parentName:"p"},"source")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"target"),":"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"Files do not match!\ntree.children.child1\nsource: missing\ntarget:  exists\n")),(0,a.kt)("h2",{id:"if-env"},(0,a.kt)("inlineCode",{parentName:"h2"},"if-env")),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"if-env")," is a command line tool that helps you to create local development environments where you can run manifests."),(0,a.kt)("p",null,"There are two use cases for this:"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"setting up a new development environment for plugin building"),(0,a.kt)("li",{parentName:"ol"},"replicating a runtime environment for a given manifest, so you can re-execute it")),(0,a.kt)("h3",{id:"commands"},"commands"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"--manifest")," or ",(0,a.kt)("inlineCode",{parentName:"li"},"-m"),": the path to a manifest whose dependencies you want to install"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"--install")," or ",(0,a.kt)("inlineCode",{parentName:"li"},"-i"),": instructs ",(0,a.kt)("inlineCode",{parentName:"li"},"if-env")," to automatically install the dependencies in the local ",(0,a.kt)("inlineCode",{parentName:"li"},"package.json")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"--cwd")," or ",(0,a.kt)("inlineCode",{parentName:"li"},"-c"),": forces ",(0,a.kt)("inlineCode",{parentName:"li"},"if-env")," to create or update the package.json in the current working directory. This is already default behaviour when no arguments are passed to ",(0,a.kt)("inlineCode",{parentName:"li"},"if-env"),", but when a manifest is passed to ",(0,a.kt)("inlineCode",{parentName:"li"},"-m"),", ",(0,a.kt)("inlineCode",{parentName:"li"},"if-env")," defaults to saving a package.json in the same folder as the manifest. using ",(0,a.kt)("inlineCode",{parentName:"li"},"-cwd")," overrides that behaviour and uses the current working directory as the ",(0,a.kt)("inlineCode",{parentName:"li"},"package.json")," target path.")),(0,a.kt)("h3",{id:"setting-up-new-development-environments-using-if-env"},"Setting up new development environments using ",(0,a.kt)("inlineCode",{parentName:"h3"},"if-env")),(0,a.kt)("p",null,"If you are creating a new manifest from scratch and want to bootstrap your way in, you can use ",(0,a.kt)("inlineCode",{parentName:"p"},"if-env")," with no arguments to generate a template manifest and package.json in your current working directory. Then, all you need to do is tweak the templates for your specific use case."),(0,a.kt)("p",null,"For example:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"mkdir my-manifest && cd my-manifest\nif-env\n")),(0,a.kt)("p",null,"After running these commands, you will see the following files in ",(0,a.kt)("inlineCode",{parentName:"p"},"my-manifest"),":"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"ls my-manifest\n\n> package.json manifest.yaml\n")),(0,a.kt)("p",null,"Now, you can use these files as templates for your manifest development."),(0,a.kt)("h3",{id:"replicating-runtime-environments-using-if-env"},"Replicating runtime environments using ",(0,a.kt)("inlineCode",{parentName:"h3"},"if-env")),(0,a.kt)("p",null,"If you are given an IF output file and you want to re-run it, you can use ",(0,a.kt)("inlineCode",{parentName:"p"},"if-env")," to install that output file's dependencies so that all the plugins in its execution pipeline can be executed."),(0,a.kt)("p",null,"For example, if you are given a file, ",(0,a.kt)("inlineCode",{parentName:"p"},"output-file.yml"),", you can save the file to ",(0,a.kt)("inlineCode",{parentName:"p"},"if")," and run"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"cd if\nif-env -m output-file.yml\n")),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"if-env")," will compare the installed dependencies in the ",(0,a.kt)("inlineCode",{parentName:"p"},"package.json")," it sees in ",(0,a.kt)("inlineCode",{parentName:"p"},"if")," with the dependencies listed in ",(0,a.kt)("inlineCode",{parentName:"p"},"output-file.yaml"),". Any dependencies that are in ",(0,a.kt)("inlineCode",{parentName:"p"},"output-file.yaml")," and not in ",(0,a.kt)("inlineCode",{parentName:"p"},"if/package.json")," will be added to ",(0,a.kt)("inlineCode",{parentName:"p"},"if-package.json"),". Then, you can run:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"npm i\n")),(0,a.kt)("p",null,"and you are ready to re-execute ",(0,a.kt)("inlineCode",{parentName:"p"},"output-file.yaml")," in your local environment. We also provide the ",(0,a.kt)("inlineCode",{parentName:"p"},"--install")," flag to instruct ",(0,a.kt)("inlineCode",{parentName:"p"},"if-env")," to automatically run ",(0,a.kt)("inlineCode",{parentName:"p"},"npm i")," after merging the dependencies, so you could craft a single command to install all the relevant dependencies and then run the manifest, as follows:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"if-env -m output-file.yml -i && if-run -m output-file.yml\n")),(0,a.kt)("h2",{id:"if-check"},(0,a.kt)("inlineCode",{parentName:"h2"},"if-check")),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"if-check")," is a manifest verification tool that is equivalent to running ",(0,a.kt)("inlineCode",{parentName:"p"},"if-env")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"if-diff")," on a given manifest file. The manifest file must have ",(0,a.kt)("inlineCode",{parentName:"p"},"outputs")," and an ",(0,a.kt)("inlineCode",{parentName:"p"},"execution")," section for ",(0,a.kt)("inlineCode",{parentName:"p"},"if-check")," to run."),(0,a.kt)("p",null,"The intended use case is to verify that a manifest's outputs are correct and honest. Say someone handed you a manifest as evidence of their environmental impact. You could choose to trust them, or you could run ",(0,a.kt)("inlineCode",{parentName:"p"},"if-check")," to verify that their calculations are correct. Under the hood, IF is creating a development environment using the dependencies listed in the given file's ",(0,a.kt)("inlineCode",{parentName:"p"},"execution")," section and then executing the file locally, then comparing the newly generated results to those in the given file."),(0,a.kt)("p",null,"To check a file:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"if-check -m <path-to-file>\n")),(0,a.kt)("p",null,"If the ",(0,a.kt)("inlineCode",{parentName:"p"},"if-check")," is successful you will receive the following response:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"if-check: successfully verified <filename>\n")),(0,a.kt)("p",null,"If ",(0,a.kt)("inlineCode",{parentName:"p"},"if-check")," was not able to verify the file because there were differences in the given and re-executed files, then you will receive the following response which includes the details of how the files differ, as per ",(0,a.kt)("inlineCode",{parentName:"p"},"if-diff"),"."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"if-check: could not verify <filename>. The re-executed file does not match the original.\n")),(0,a.kt)("h3",{id:"running-if-over-multiple-manifests-with---d"},"Running IF over multiple manifests with ",(0,a.kt)("inlineCode",{parentName:"h3"},"--d")),(0,a.kt)("p",null,"Alice could also run ",(0,a.kt)("inlineCode",{parentName:"p"},"if-check")," over any number of manifests in a single command, using the ",(0,a.kt)("inlineCode",{parentName:"p"},"--directory")," or ",(0,a.kt)("inlineCode",{parentName:"p"},"-d")," subcommand. For a folder containing multiple manifests, pass the folder path:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"if-check -d /my-folder-of-manifests\n")),(0,a.kt)("p",null,"Each manifest will be run through ",(0,a.kt)("inlineCode",{parentName:"p"},"if-check")," in sequence."))}u.isMDXComponent=!0}}]);