"use strict";(self.webpackChunknewproject1801=self.webpackChunknewproject1801||[]).push([[848],{848:function(e,t,n){n.r(t),n.d(t,{default:function(){return z}});var l=n(1413),a=n(4165),s=n(5861),r=n(9439),i=n(2791),o=n(3513),d={table:{style:{padding:"0",margin:"0",overflow:"visible",whiteSpace:"nowrap",textOverflow:"none"}},rows:{style:{fontSize:".9rem",padding:"10px 0","&:nth-of-type(even)":{backgroundColor:"rgba(119, 0, 255, 5%)"}}},headCells:{style:{fontSize:"0.9rem ",margin:"0",backgroundColor:"#7700ff",color:"#FFFFFF",whiteSpace:"pre-wrap"}},cells:{style:{margin:"0",overflow:"hidden","&:hover":{content:"attr(title)",position:"static",whiteSpace:"nowrap",opacity:"1",transition:"opacity 0.3s",zIndex:"1"}}},pagination:{style:{fontSize:"0.9rem",padding:"10px"}},subHeaderComponent:{style:{padding:"0"}}},c=n(5985),u=(n(5462),n(3400)),m=n(7247),h=n(1286),p=n(3746),g=n(1889),x=n(3211),f=n(1363),v=n(9201),j=n(184),Z=(0,v.Z)((0,j.jsx)("path",{d:"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm-1 4 6 6v10c0 1.1-.9 2-2 2H7.99C6.89 23 6 22.1 6 21l.01-14c0-1.1.89-2 1.99-2h7zm-1 7h5.5L14 6.5V12z"}),"FileCopy"),y=n(5574),D=n(5661),b=n(890),w=n(6151),N=n(9157),F=n(1614),I=n(7133),M=n(8550),P=n(9823);function Y(e){var t=e.showDetailsModal,n=e.setShowDetailsModal,r=t.openDetailsDialog,i=t.currInvestment,o=function(e){return e.getDate()+"/"+(e.getMonth()+1)+"/"+e.getFullYear()},d=function(e){var t='<html><body><img src="'.concat(e,'" /></body></html>'),n=new Blob([t],{type:"text/html"}),l=URL.createObjectURL(n),a=window.open(l,"_blank");return URL.revokeObjectURL(l),a},c=function(){var e=(0,s.Z)((0,a.Z)().mark((function e(t){var n,l;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,x.F7)(t);case 2:n=e.sent,l="",l+=n.data.cashReceipt,d(l);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return(0,j.jsxs)(y.Z,{open:r,onClose:function(){n((0,l.Z)((0,l.Z)({},t),{},{openDetailsDialog:!1}))},maxWidth:"lg",children:[(0,j.jsx)(D.Z,{children:(0,j.jsxs)("div",{style:{display:"flex"},children:[(0,j.jsx)(b.Z,{variant:"h6",component:"div",style:{flexGrow:1},children:"Investment Details"}),(0,j.jsx)(w.Z,{color:"secondary",onClick:function(){return n((0,l.Z)((0,l.Z)({},t),{},{openDetailsDialog:!1}))},children:(0,j.jsx)(P.Z,{})})]})}),(0,j.jsx)(N.Z,{dividers:!0,sx:{paddingY:2,paddingX:0},children:(0,j.jsx)(F.Z,{children:(0,j.jsxs)("div",{className:"item-form",children:[(0,j.jsxs)("div",{children:[(0,j.jsxs)(I.Z,{className:"label",id:"demo-controlled-radio-buttons-group",children:["Investment Name ",(0,j.jsx)("span",{className:"text-danger",children:"*"})]}),(0,j.jsx)(M.Z,{InputProps:{readOnly:!0},variant:"outlined",fullWidth:!0,type:"text",value:i.investmentName,size:"small"})]}),(0,j.jsxs)("div",{children:[(0,j.jsxs)(I.Z,{className:"label",id:"demo-controlled-radio-buttons-group",children:["Investment Vender ",(0,j.jsx)("span",{className:"text-danger",children:"*"})]}),(0,j.jsx)(M.Z,{InputProps:{readOnly:!0},variant:"outlined",fullWidth:!0,type:"text",value:i.investmentVendor,size:"small"})]}),(0,j.jsxs)("div",{className:"grid grid-2",children:[(0,j.jsxs)("div",{sx:{padding:"20px"},children:[(0,j.jsxs)(I.Z,{className:"label",id:"demo-controlled-radio-buttons-group",children:["Investment Amount ",(0,j.jsx)("span",{className:"text-danger",children:"*"})]}),(0,j.jsx)(M.Z,{InputProps:{readOnly:!0},type:"text",fullWidth:!0,value:i.investmentAmount,size:"small"})]}),(0,j.jsxs)("div",{children:[(0,j.jsxs)(I.Z,{className:"label",id:"demo-controlled-radio-buttons-group",children:["Investment Date ",(0,j.jsx)("span",{className:"text-danger",children:"*"})]}),(0,j.jsx)(M.Z,{InputProps:{readOnly:!0},type:"text",fullWidth:!0,value:o(new Date(i.investmentDate)),size:"small"})]})]}),(0,j.jsxs)("div",{className:"grid grid-2",children:[(0,j.jsxs)("div",{sx:{padding:"20px"},children:[(0,j.jsxs)(I.Z,{className:"label",id:"demo-controlled-radio-buttons-group",children:["Investment Duration ",(0,j.jsx)("span",{className:"text-danger",children:"*"})]}),(0,j.jsx)(M.Z,{InputProps:{readOnly:!0},type:"text",fullWidth:!0,value:i.investmentDuration,size:"small"})]}),(0,j.jsxs)("div",{children:[(0,j.jsxs)(I.Z,{className:"label",id:"demo-controlled-radio-buttons-group",children:["Date of Mature ",(0,j.jsx)("span",{className:"text-danger",children:"*"})]}),(0,j.jsx)(M.Z,{InputProps:{readOnly:!0},type:"text",fullWidth:!0,value:o(new Date(i.dateOfMature)),size:"small"})]})]}),(0,j.jsxs)("div",{children:[(0,j.jsxs)(I.Z,{className:"label",id:"demo-controlled-radio-buttons-group",children:["Mode of Payment ",(0,j.jsx)("span",{className:"text-danger",children:"*"})]}),(0,j.jsx)(M.Z,{InputProps:{readOnly:!0},fullWidth:!0,variant:"outlined",size:"small",value:i.modeOfPayment})]}),"Online"===i.modeOfPayment&&(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(I.Z,{className:"label",id:"demo-controlled-radio-buttons-group",children:"Online Payment Details"}),(0,j.jsxs)("div",{children:[(0,j.jsx)(I.Z,{className:"sub-label",children:"Bank"}),(0,j.jsx)(M.Z,{InputProps:{readOnly:!0},fullWidth:!0,variant:"outlined",size:"small",value:i.onlinePaymentDetails.onlinebank})]}),(0,j.jsxs)("div",{className:"grid grid-2",children:[(0,j.jsxs)("div",{sx:{padding:"20px"},children:[(0,j.jsxs)(I.Z,{className:"label",id:"demo-controlled-radio-buttons-group",children:["Date of Payment",(0,j.jsx)("span",{className:"text-danger",children:"*"})]}),(0,j.jsx)(M.Z,{InputProps:{readOnly:!0},type:"text",fullWidth:!0,value:o(new Date(i.onlinePaymentDetails.onlinepaymentDate)),size:"small"})]}),(0,j.jsxs)("div",{children:[(0,j.jsxs)(I.Z,{className:"label",id:"demo-controlled-radio-buttons-group",children:["Payment ID",(0,j.jsx)("span",{className:"text-danger",children:"*"})]}),(0,j.jsx)(M.Z,{InputProps:{readOnly:!0},fullWidth:!0,variant:"outlined",size:"small",value:i.onlinePaymentDetails.paymentId})]})]})]}),"Cash"===i.modeOfPayment&&(0,j.jsxs)("div",{className:"grid grid-2",children:[(0,j.jsx)("div",{sx:{padding:"20px"},children:(0,j.jsxs)(I.Z,{className:"label",children:["Cash Receipt",(0,j.jsx)("span",{className:"text-danger",children:"*"})]})}),(0,j.jsx)("div",{className:"cell-with-tooltip",title:"Show Details",children:(0,j.jsxs)(w.Z,{title:"Display all details",sx:{color:"#fffff",padding:"0 2px"},variant:"contained",style:{marginRight:10},onClick:function(){return c(i._id)},children:["View \xa0",(0,j.jsx)(p.Z,{fontSize:"small"})]})})]}),"Cheque"===i.modeOfPayment&&(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(I.Z,{className:"label",children:"Cheque Details"}),(0,j.jsxs)("div",{children:[(0,j.jsx)(I.Z,{className:"sub-label",children:"Bank"}),(0,j.jsx)(M.Z,{InputProps:{readOnly:!0},fullWidth:!0,variant:"outlined",size:"small",value:i.chequeDetails.chequebank})]}),(0,j.jsxs)("div",{className:"grid grid-2",children:[(0,j.jsxs)("div",{sx:{padding:"20px"},children:[(0,j.jsxs)(I.Z,{className:"label",id:"demo-controlled-radio-buttons-group",children:["Payment Date ",(0,j.jsx)("span",{className:"text-danger",children:"*"})]}),(0,j.jsx)(M.Z,{InputProps:{readOnly:!0},fullWidth:!0,variant:"outlined",size:"small",value:o(new Date(i.chequeDetails.chequepaymentDate))})]}),(0,j.jsxs)("div",{children:[(0,j.jsxs)(I.Z,{className:"label",id:"demo-controlled-radio-buttons-group",children:["Cheque Number",(0,j.jsx)("span",{className:"text-danger",children:"*"})]}),(0,j.jsx)(M.Z,{InputProps:{readOnly:!0},fullWidth:!0,variant:"outlined",size:"small",value:i.chequeDetails.chequeNumber})]})]})]}),(0,j.jsxs)("div",{className:"grid grid-2",children:[(0,j.jsxs)("div",{sx:{padding:"20px"},children:[(0,j.jsxs)(I.Z,{className:"label",id:"demo-controlled-radio-buttons-group",children:["Investment Qualify",(0,j.jsx)("span",{className:"text-danger",children:"*"})]}),(0,j.jsx)(M.Z,{InputProps:{readOnly:!0},fullWidth:!0,type:"text",value:i.investmentQualify,size:"small"})]}),(0,j.jsxs)("div",{children:[(0,j.jsxs)(I.Z,{className:"label",id:"demo-controlled-radio-buttons-group",children:["Investment Category",(0,j.jsx)("span",{className:"text-danger",children:"*"})]}),(0,j.jsx)(M.Z,{InputProps:{readOnly:!0},fullWidth:!0,type:"text",value:i.investmentCategory,size:"small"})]})]}),(0,j.jsxs)("div",{children:[(0,j.jsxs)(I.Z,{className:"label",id:"demo-controlled-radio-buttons-group",children:["Investment Description",(0,j.jsx)("span",{className:"text-danger",children:"*"})]}),(0,j.jsx)(M.Z,{InputProps:{readOnly:!0},fullWidth:!0,type:"text",value:i.description,size:"small"})]}),(0,j.jsxs)("div",{children:[(0,j.jsxs)(I.Z,{className:"label",id:"demo-controlled-radio-buttons-group",children:["Point Of Contact",(0,j.jsx)("span",{className:"text-danger"})]}),(0,j.jsxs)("div",{className:"grid grid-2",children:[(0,j.jsxs)("div",{sx:{padding:"20px"},children:[(0,j.jsxs)(I.Z,{className:"label",id:"demo-controlled-radio-buttons-group",children:["Name",(0,j.jsx)("span",{className:"text-danger"})]}),(0,j.jsx)(M.Z,{InputProps:{readOnly:!0},variant:"outlined",fullWidth:!0,type:"text",value:i.contactPerson?i.contactPerson.personName:"",size:"small"})]}),(0,j.jsxs)("div",{children:[(0,j.jsxs)(I.Z,{className:"label",id:"demo-controlled-radio-buttons-group",children:["Contact Number",(0,j.jsx)("span",{className:"text-danger"})]}),(0,j.jsx)(M.Z,{InputProps:{readOnly:!0},variant:"outlined",fullWidth:!0,type:"text",value:i.contactPerson?i.contactPerson.contactNumber:"",size:"small"})]})]})]})]})})})]})}var O=i.lazy((function(){return n.e(968).then(n.bind(n,6968))})),S=i.lazy((function(){return Promise.all([n.e(962),n.e(575)]).then(n.bind(n,3575))})),C=i.lazy((function(){return Promise.all([n.e(476),n.e(623)]).then(n.bind(n,9623))})),z=function(e){var t=e.investments,n=e.setInvestments,v=e.render,y=e.setRender,D=e.type,b=e.dateFilter,w=e.startDate,N=e.endDate,F=(0,i.useState)(""),I=(0,r.Z)(F,2),M=I[0],P=I[1],z=(0,i.useState)(""),k=(0,r.Z)(z,2),W=k[0],R=k[1],A=(0,i.useState)({openDialog:!1,currInvestment:""}),q=(0,r.Z)(A,2),H=q[0],T=q[1],L=(0,i.useState)({openDetailsDialog:!1,currInvestment:""}),E=(0,r.Z)(L,2),V=E[0],_=E[1],B=(0,i.useState)({openImgDialog:!1,id:"",documents:[]}),U=(0,r.Z)(B,2),J=U[0],X=U[1],G=(0,i.useState)({openDelDialog:!1,deleteId:null}),Q=(0,r.Z)(G,2),K=Q[0],$=Q[1],ee=(0,i.useState)(1),te=(0,r.Z)(ee,2),ne=te[0],le=te[1],ae=(0,i.useState)(!1),se=(0,r.Z)(ae,2),re=se[0],ie=se[1],oe=function(){var e=(0,s.Z)((0,a.Z)().mark((function e(){var t,l;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=localStorage.getItem("user-info"),e.next=3,(0,x.l4)(JSON.parse(t).id);case 3:l=e.sent,n(l.data);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();(0,i.useEffect)((function(){var e=function(){var e=(0,s.Z)((0,a.Z)().mark((function e(){var t,l;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=localStorage.getItem("user-info"),e.next=3,(0,x.l4)(JSON.parse(t).id);case 3:l=e.sent,n(l.data);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e(),y("unset")}),[v,n,y]),(0,i.useEffect)((function(){function e(e){return e>=4&&e<=6?1:e>=7&&e<=9?2:e>=10&&e<=12?3:4}function n(e,t,n,l,a){return 4===l?e.getFullYear()===t.getFullYear()&&n<=3?a:null:e.getFullYear()!==t.getFullYear()?null:1===l?e.getFullYear()===t.getFullYear()&&n>=4&&n<=6?a:null:2===l?e.getFullYear()===t.getFullYear()&&n>=7&&n<=9?a:null:3===l?e.getFullYear()===t.getFullYear()&&n>=10&&n<=12?a:null:void 0}function l(e,n,l){if(n.getMonth()<3){if(e===n.getFullYear())return t}else if(e-1===n.getFullYear()&&n.getMonth()>=3)return l;return null}var a=t.filter((function(t){return function(t,a,s,r){var i=new Date,o=new Date(t.dateOfMature),d=new Date(o.getFullYear(),o.getMonth(),o.getDate()),c=d.getMonth()+1,u=0;switch(a){case 1:default:return t;case 2:return d.getTime()===i.getTime()?t:null;case 3:return d.getFullYear()===i.getFullYear()&&d.getMonth()===i.getMonth()?t:null;case 4:return u=e(i.getMonth()+1),n(d,i,c,u,t);case 5:return i.getMonth()<3&&d.getMonth()<3&&i.getFullYear()===d.getFullYear()||i.getMonth()>=3&&d.getMonth()>=3&&i.getFullYear()===d.getFullYear()||i.getMonth()<3&&d.getMonth()>=3&&i.getFullYear()-1===d.getFullYear()||i.getMonth()>=3&&d.getMonth()<3&&i.getFullYear()+1===d.getFullYear()?t:null;case 6:var m=0===i.getMonth()?11:i.getMonth()-1;return d.getFullYear()===i.getFullYear()&&d.getMonth()===m?t:null;case 7:return 1===(u=e(i.getMonth()+1))?n(d,i,c,4,t):4===u?function(e,t,n,l){return e.getFullYear()===t.getFullYear()-1&&n>=10&&n<=12?l:null}(d,i,c,t):n(d,i,c,u-1,t);case 8:return i.getMonth()<3&&d.getMonth()<3&&i.getFullYear()-1===d.getFullYear()||i.getMonth()>=3&&d.getMonth()>=3&&i.getFullYear()-1===d.getFullYear()||i.getMonth()<3&&d.getMonth()>=3&&i.getFullYear()-2===d.getFullYear()||i.getMonth()>=3&&d.getMonth()<3&&i.getFullYear()-1===d.getFullYear()?t:null;case 9:if(s&&r){var h=new Date(s),p=new Date(r);return d>=h&&d<=p?t:null}return t;case 10:return l(i.getFullYear()-3,d,t);case 11:return l(i.getFullYear()-2,d,t);case 12:return l(i.getFullYear()-1,d,t)}}(t,b)})).filter((function(e){return function(e,t){return"_id"===t||void 0===t||e.investmentCategory===t?e:null}(e,D)})).filter((function(e){return String(Object.values(e)).toLowerCase().includes(M.toLowerCase())}));R(a)}),[M,b,t,D,w,N]);var de=function(){var e=(0,s.Z)((0,a.Z)().mark((function e(t){return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,x.JX)(t);case 2:(0,c.Am)(" Successfully Deleted",{position:"top-center",autoClose:2e3,hideProgressBar:!1,closeOnClick:!0,theme:"light"}),oe();case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),ce=function(e){return e.getDate()+"/"+(e.getMonth()+1)+"/"+e.getFullYear()},ue=function(){var e=(0,s.Z)((0,a.Z)().mark((function e(t){var n;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return X((0,l.Z)((0,l.Z)({},J),{},{openImgDialog:!0,loading:!0})),e.next=3,(0,x.gX)(t);case 3:n=e.sent,setTimeout((function(){X({openImgDialog:!0,id:n.data._id,documents:n.data.investmentDocuments,loading:!1})}),2e3);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),me=[{name:"Sr No",cell:function(e,t){return 10*(ne-1)+t+1},sortable:!0,width:"90px"},{name:"Amount",selector:function(e){return e.investmentAmount},cell:function(e){return(0,j.jsx)(j.Fragment,{children:(0,j.jsx)("div",{className:"cell-with-tooltip",title:e.investmentAmount,children:e.investmentAmount})})},sortable:!0},{name:"Name",selector:function(e){return e.investmentName},cell:function(e){return(0,j.jsx)(j.Fragment,{children:(0,j.jsx)("div",{className:"cell-with-tooltip",title:e.investmentName,children:e.investmentName})})},sortable:!0},{name:"Investment Date",selector:function(e){return ce(new Date(e.investmentDate))},cell:function(e){return(0,j.jsx)(j.Fragment,{children:(0,j.jsx)("div",{className:"cell-with-tooltip",title:ce(new Date(e.investmentDate)),children:ce(new Date(e.investmentDate))})})}},{name:"Mature Date",selector:function(e){return ce(new Date(e.dateOfMature))},cell:function(e){return(0,j.jsx)(j.Fragment,{children:(0,j.jsx)("div",{className:"cell-with-tooltip",title:ce(new Date(e.dateOfMature)),children:ce(new Date(e.dateOfMature))})})}},{name:"Details",cell:function(e){return(0,j.jsx)(j.Fragment,{children:(0,j.jsx)("div",{className:"cell-with-tooltip",title:"Show Details",children:(0,j.jsx)(u.Z,{title:"Display all details",sx:{color:"#7700ff",padding:"0 2px"},variant:"contained",style:{marginRight:10},onClick:function(){return _({openDetailsDialog:!0,currInvestment:e})},children:(0,j.jsx)(p.Z,{fontSize:"small"})})})})}},{name:"Documents",cell:function(e){return(0,j.jsx)(j.Fragment,{children:(0,j.jsx)("div",{className:"cell-with-tooltip",title:"Show Documents",children:(0,j.jsx)(u.Z,{title:"Investment Documents",sx:{color:"#7700ff",padding:"0 2px"},variant:"contained",style:{marginRight:10},onClick:function(){return ue(e._id)},children:(0,j.jsx)(Z,{fontSize:"small"})})})})},sortable:!0},{name:"Action",cell:function(e){return(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(u.Z,{title:"Edit Investment",sx:{color:"#7700ff",padding:"0 2px"},variant:"contained",style:{marginRight:10},onClick:function(){return T({openDialog:!0,currInvestment:e})},children:(0,j.jsx)(h.Z,{fontSize:"small"})}),(0,j.jsx)(u.Z,{title:"Delete Investment",sx:{color:"red",padding:"0 2px"},variant:"contained",onClick:function(){return t=e._id,void $({openDelDialog:!0,deleteId:t});var t},children:(0,j.jsx)(m.Z,{fontSize:"small"})})]})},width:"90px"}],he=function(){var e=(0,s.Z)((0,a.Z)().mark((function e(){return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:ie(!0);case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,j.jsxs)(g.ZP,{className:"tableWrapper",container:!0,alignContent:"center",children:[(0,j.jsx)(Y,{showDetailsModal:V,setShowDetailsModal:_}),(0,j.jsx)(O,{setRender:y,showModal:H,setShowModal:T,formType:"Edit Investment"}),(0,j.jsx)(S,{delModal:K,setDelModal:$,confirm:function(){de(K.deleteId),$({openDelDialog:!1,deleteId:null})}}),(0,j.jsx)(C,{showDocsModal:J,setShowDocsModal:X}),(0,j.jsx)(c.Ix,{}),(0,j.jsx)(o.ZP,{columns:me,data:W,sortFunction:function(e,t,n){return e.sort((function(e,l){var a=t(e),s=t(l),r=0;if("number"===typeof a)a>s?r=1:a<s&&(r=-1);else if(a.match(/\d{1,2}\/\d{1,2}\/\d{4}/)){var i=a.split("/"),o=new Date(i[i.length-1],i[1]-1,i[0]);i=s.split("/"),r=o<new Date(i[i.length-1],i[1]-1,i[0])?1:-1}else a>s?r=1:a<s&&(r=-1);return"desc"===n?-1*r:r}))},customStyles:d,fixedHeader:!0,pagination:!0,paginationResetDefaultPage:!0,paginationTotalRows:W.length,paginationComponentOptions:{rowsPerPageText:"Rows per page:",rangeSeparatorText:"of",noRowsPerPage:!1,selectAllRowsItem:!1,selectAllRowsItemText:"All"},subHeader:!0,subHeaderComponent:(0,j.jsxs)("div",{className:"tableSubHeaderComponent",children:[(0,j.jsxs)("div",{className:"headingWrapper",children:[(0,j.jsx)("h5",{className:"heading heading-two",children:"All records"}),(0,j.jsxs)("button",{className:"btn btn-primary",disabled:re,onClick:he,children:[re?"Export Data...":"Export Data",re&&(0,j.jsx)(f.G,{icon:"spinner",spin:!0})]})]}),(0,j.jsx)("input",{type:"text",placeholder:"Search Here",className:"form-control",value:M,onChange:function(e){return P(e.target.value)}})]}),onChangePage:function(e){return le(e)},highlightOnHover:!0})]})}}}]);
//# sourceMappingURL=848.d1a77a12.chunk.js.map