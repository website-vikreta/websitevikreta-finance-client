"use strict";(self.webpackChunknewproject1801=self.webpackChunknewproject1801||[]).push([[979],{4979:function(e,t,n){n.r(t),n.d(t,{default:function(){return D}});var r=n(1413),a=n(4165),l=n(5861),o=n(9439),i=n(2791),u=n(8977),c=n(3513),s={table:{style:{padding:"0",margin:"0",overflow:"visible",whiteSpace:"nowrap",textOverflow:"none"}},rows:{style:{fontSize:".9rem",padding:"10px 0","&:nth-of-type(even)":{backgroundColor:"rgba(119, 0, 255, 5%)"}}},headCells:{style:{fontSize:"0.9rem ",margin:"0",backgroundColor:"#7700ff",color:"#FFFFFF",whiteSpace:"pre-wrap"}},cells:{style:{margin:"0",overflow:"hidden","&:hover":{content:"attr(title)",position:"static",whiteSpace:"nowrap",opacity:"1",transition:"opacity 0.3s",zIndex:"1"}}},pagination:{style:{fontSize:"0.9rem",padding:"10px"}},subHeaderComponent:{style:{padding:"0"}}},d=n(5985),g=(n(5462),n(3400)),p=n(7247),f=n(1286),h=n(3746),m=n(1889),x=n(3211),w=n(1363),v=n(184),y=i.lazy((function(){return n.e(968).then(n.bind(n,6968))})),F=i.lazy((function(){return Promise.all([n.e(962),n.e(575)]).then(n.bind(n,3575))})),j=i.lazy((function(){return n.e(76).then(n.bind(n,7076))})),D=function(e){var t=e.items,n=e.setItems,D=e.render,Y=e.setRender,M=e.type,b=e.dateFilter,Z=e.startDate,S=e.endDate,I=(0,i.useState)(""),P=(0,o.Z)(I,2),k=P[0],C=P[1],N=(0,i.useState)(""),T=(0,o.Z)(N,2),O=T[0],R=T[1],z=(0,i.useState)({openDialog:!1,currItem:""}),A=(0,o.Z)(z,2),H=A[0],E=A[1],_=(0,i.useState)({openImgDialog:!1,id:"",paymentType:"",image:""}),L=(0,o.Z)(_,2),B=L[0],J=L[1],U=(0,i.useState)({openDelDialog:!1,deleteId:null}),W=(0,o.Z)(U,2),G=W[0],K=W[1],Q=(0,i.useState)(!1),V=(0,o.Z)(Q,2),q=V[0],X=V[1],$=(0,i.useState)(1),ee=(0,o.Z)($,2),te=ee[0],ne=ee[1],re=function(){var e=(0,l.Z)((0,a.Z)().mark((function e(){var t,r;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=localStorage.getItem("user-info"),e.next=3,(0,x.kk)(JSON.parse(t).id);case 3:r=e.sent,n(r.data);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();(0,i.useEffect)((function(){var e=function(){var e=(0,l.Z)((0,a.Z)().mark((function e(){var t,r;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=localStorage.getItem("user-info"),e.next=3,(0,x.kk)(JSON.parse(t).id);case 3:r=e.sent,n(r.data);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e(),Y("unset")}),[D,n,Y]),(0,i.useEffect)((function(){function e(e){return e>=4&&e<=6?1:e>=7&&e<=9?2:e>=10&&e<=12?3:4}function n(e,t,n,r,a){return 4===r?e.getFullYear()===t.getFullYear()&&n<=3?a:null:e.getFullYear()!==t.getFullYear()?null:1===r?e.getFullYear()===t.getFullYear()&&n>=4&&n<=6?a:null:2===r?e.getFullYear()===t.getFullYear()&&n>=7&&n<=9?a:null:3===r?e.getFullYear()===t.getFullYear()&&n>=10&&n<=12?a:null:void 0}function r(e,t,n){if(t.getMonth()<3){if(e===t.getFullYear())return n}else if(e-1===t.getFullYear()&&t.getMonth()>=3)return n;return null}var a=t.filter((function(t){return function(t,a,l,o){var i=new Date,u=new Date(t.dateOfInvoice),c=new Date(u.getFullYear(),u.getMonth(),u.getDate()),s=c.getMonth()+1,d=0;switch(a){case 1:default:return t;case 2:return c.getTime()===i.getTime()?t:null;case 3:return c.getFullYear()===i.getFullYear()&&c.getMonth()===i.getMonth()?t:null;case 4:return d=e(i.getMonth()+1),n(c,i,s,d,t);case 5:return i.getMonth()<3&&c.getMonth()<3&&i.getFullYear()===c.getFullYear()||i.getMonth()>=3&&c.getMonth()>=3&&i.getFullYear()===c.getFullYear()||i.getMonth()<3&&c.getMonth()>=3&&i.getFullYear()-1===c.getFullYear()||i.getMonth()>=3&&c.getMonth()<3&&i.getFullYear()+1===c.getFullYear()?t:null;case 6:var g=0===i.getMonth()?11:i.getMonth()-1;return c.getFullYear()===i.getFullYear()&&c.getMonth()===g?t:null;case 7:return 1===(d=e(i.getMonth()+1))?n(c,i,s,4,t):4===d?function(e,t,n,r){return e.getFullYear()===t.getFullYear()-1&&n>=10&&n<=12?r:null}(c,i,s,t):n(c,i,s,d-1,t);case 8:return i.getMonth()<3&&c.getMonth()<3&&i.getFullYear()-1===c.getFullYear()||i.getMonth()>=3&&c.getMonth()>=3&&i.getFullYear()-1===c.getFullYear()||i.getMonth()<3&&c.getMonth()>=3&&i.getFullYear()-2===c.getFullYear()||i.getMonth()>=3&&c.getMonth()<3&&i.getFullYear()-1===c.getFullYear()?t:null;case 9:if(l&&o){var p=new Date(l),f=new Date(o);return c>=p&&c<=f?t:null}return t;case 10:return r(i.getFullYear()-3,c,t);case 11:return r(i.getFullYear()-2,c,t);case 12:return r(i.getFullYear()-1,c,t)}}(t,b)})).filter((function(e){return function(e,t){return"_id"===t||void 0===t||e.paymentType===t?e:null}(e,M)})).filter((function(e){return String(Object.values(e)).toLowerCase().includes(k.toLowerCase())}));R(a)}),[k,b,t,M,Z,S]);var ae=function(){var e=(0,l.Z)((0,a.Z)().mark((function e(t){return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,x.wz)(t);case 2:(0,d.Am)(" Successfully Deleted",{position:"top-center",autoClose:2e3,hideProgressBar:!1,closeOnClick:!0,theme:"light"}),re();case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),le=function(e){return e.getDate()+"/"+(e.getMonth()+1)+"/"+e.getFullYear()},oe=function(){var e=(0,l.Z)((0,a.Z)().mark((function e(t){var n;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return J((0,r.Z)((0,r.Z)({},B),{},{openImgDialog:!0,loading:!0})),e.next=3,(0,x.om)(t);case 3:n=e.sent,setTimeout((function(){J({openImgDialog:!0,id:n.data._id,paymentType:n.data.paymentType,image:n.data.paymentProof,loading:!1})}),2e3);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),ie=[{name:"Sr.No.",cell:function(e,t){return 10*(te-1)+t+1},sortable:!0,width:"90px"},{name:"Title",selector:function(e){return e.title},cell:function(e){return(0,v.jsx)(v.Fragment,{children:(0,v.jsx)("div",{className:"cell-with-tooltip",title:e.title,children:e.title})})},sortable:!0},{name:"Amount",selector:function(e){return e.amount},cell:function(e){return(0,v.jsx)(v.Fragment,{children:(0,v.jsx)("div",{className:"cell-with-tooltip",title:e.amount,children:e.amount})})},sortable:!0},{name:"Category",cell:function(e){return(0,v.jsx)(v.Fragment,{children:(0,v.jsx)("div",{className:"cell-with-tooltip",title:e.category,children:e.category})})},sortable:!0},{name:"Payment Type",cell:function(e){return(0,v.jsx)(v.Fragment,{children:(0,v.jsx)("div",{className:"cell-with-tooltip",title:e.paymentType,children:e.paymentType})})}},{name:"Date of Invoice",selector:function(e){return le(new Date(e.dateOfInvoice))},cell:function(e){return(0,v.jsx)(v.Fragment,{children:(0,v.jsx)("div",{className:"cell-with-tooltip",title:le(new Date(e.dateOfInvoice)),children:le(new Date(e.dateOfInvoice))})})},sortable:!0,width:"135px"},{name:"Date of Payment",selector:function(e){return le(new Date(e.dateOfPayment))},cell:function(e){return(0,v.jsx)(v.Fragment,{children:(0,v.jsx)("div",{className:"cell-with-tooltip",title:le(new Date(e.dateOfPayment)),children:le(new Date(e.dateOfPayment))})})},sortable:!0,width:"145px"},{name:"Description",cell:function(e){return(0,v.jsx)(v.Fragment,{children:(0,v.jsx)("div",{className:"cell-with-tooltip",title:e.description,children:e.description})})}},{name:"Payment Proof",cell:function(e){return(0,v.jsx)(v.Fragment,{children:e.hasPaymentProof?(0,v.jsx)(g.Z,{title:"View/Download Payment Proof",sx:{color:"#7700ff",padding:"0 2px"},variant:"contained",style:{marginRight:10},onClick:function(){return oe(e._id)},children:(0,v.jsx)(h.Z,{fontSize:"small"})}):(0,v.jsx)("div",{children:"No Proof"})})},width:"120px"},{name:"Action",cell:function(e){return(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(g.Z,{title:"Edit Item",sx:{color:"#7700ff",padding:"0 2px"},variant:"contained",style:{marginRight:10},onClick:function(){return E({openDialog:!0,currItem:e})},children:(0,v.jsx)(f.Z,{fontSize:"small"})}),(0,v.jsx)(g.Z,{title:"Delete Item",sx:{color:"red",padding:"0 2px"},variant:"contained",onClick:function(){return t=e._id,void K({openDelDialog:!0,deleteId:t});var t},children:(0,v.jsx)(p.Z,{fontSize:"small"})})]})},width:"90px"}],ue=function(){var e=(0,l.Z)((0,a.Z)().mark((function e(){var t,n,r,l,o,i,c;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return X(!0),e.prev=1,t=O.map((function(e){return e._id})),e.next=5,(0,x.QP)(t);case 5:n=e.sent,r=new Blob([n.data],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}),l=window.URL.createObjectURL(r),(o=document.createElement("a")).href=l,i=new Date,c=(0,u.Z)(i,"ddMMyyyy_HHmmss",{timeZone:"Asia/Kolkata"}),o.setAttribute("download","FinanceReport_".concat(c,".xlsx")),document.body.appendChild(o),o.click(),document.body.removeChild(o),X(!1),console.log("exported"),e.next=23;break;case 20:e.prev=20,e.t0=e.catch(1),console.log(e.t0);case 23:case"end":return e.stop()}}),e,null,[[1,20]])})));return function(){return e.apply(this,arguments)}}();return(0,v.jsxs)(m.ZP,{className:"tableWrapper",container:!0,alignContent:"center",children:[(0,v.jsx)(y,{setRender:Y,showModal:H,setShowModal:E,formType:"Edit"}),(0,v.jsx)(F,{delModal:G,setDelModal:K,confirm:function(){ae(G.deleteId),K({openDelDialog:!1,deleteId:null})}}),(0,v.jsx)(j,{showImgModal:B,setShowImgModal:J}),(0,v.jsx)(d.Ix,{}),(0,v.jsx)(c.ZP,{columns:ie,data:O,sortFunction:function(e,t,n){return e.sort((function(e,r){var a=t(e),l=t(r),o=0;if("number"===typeof a)a>l?o=1:a<l&&(o=-1);else if(a.match(/\d{1,2}\/\d{1,2}\/\d{4}/)){var i=a.split("/"),u=new Date(i[i.length-1],i[1]-1,i[0]);i=l.split("/"),o=u<new Date(i[i.length-1],i[1]-1,i[0])?1:-1}else a>l?o=1:a<l&&(o=-1);return"desc"===n?-1*o:o}))},customStyles:s,fixedHeader:!0,pagination:!0,paginationResetDefaultPage:!0,paginationTotalRows:O.length,paginationComponentOptions:{rowsPerPageText:"Rows per page:",rangeSeparatorText:"of",noRowsPerPage:!1,selectAllRowsItem:!1,selectAllRowsItemText:"All"},subHeader:!0,subHeaderComponent:(0,v.jsxs)("div",{className:"tableSubHeaderComponent",children:[(0,v.jsxs)("div",{className:"headingWrapper",children:[(0,v.jsx)("h5",{className:"heading heading-two",children:"All records"}),(0,v.jsxs)("button",{className:"btn btn-primary",disabled:q,onClick:ue,children:[q?"Export Data...":"Export Data",q&&(0,v.jsx)(w.G,{icon:"spinner",spin:!0})]})]}),(0,v.jsx)("input",{type:"text",placeholder:"Search Here",className:"form-control",value:k,onChange:function(e){return C(e.target.value)}})]}),onChangePage:function(e){return ne(e)},highlightOnHover:!0})]})}}}]);
//# sourceMappingURL=979.668b24a9.chunk.js.map