(this.webpackJsonpparkingmaster=this.webpackJsonpparkingmaster||[]).push([[0],{45:function(e,t,a){e.exports=a(57)},51:function(e,t,a){},57:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),i=a(21),r=a.n(i),c=(a(50),a(51),a(8)),o=a(7),s=a(9),u=a(10),h=a(12),d=a(30),m=a(4),g=a(80),p=a(78),b=a(83),f=a(81),v=a(82),E=a(39),C=a.n(E),S=a(38),k=a.n(S),D=a(37),T=a.n(D),j=a(79),y=a(40),O=a.n(y),I="https://js-168-142.jetstream-cloud.org:3000",P=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(s.a)(this,Object(u.a)(t).call(this))).state={parkingDeck_Counter:"-",parkingA_Counter:"-",parkingL_Counter:"-",parkingD_Counter:"-",parkingF_Counter:"-",parkingI_Counter:"-"},e}return Object(h.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.updateCounter(),this.interval=setInterval((function(){e.updateCounter()}),1e4)}},{key:"updateCounter",value:function(){var e=this;fetch(I+"/parkingDeck_Counter",{method:"GET"}).then((function(e){return e.json()})).then((function(t){e.setState({parkingDeck_Counter:t.lots})}))}},{key:"render",value:function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement("h1",null," ","Parking Deck Spaces Available :"," ",l.a.createElement("span",{style:{color:"red"}},this.state.parkingDeck_Counter)),l.a.createElement("h1",null," ","Parking Lot 'A' Spaces Available :"," ",l.a.createElement("span",{style:{color:"red"}},this.state.parkingA_Counter)),l.a.createElement("h1",null," ","Parking Lot 'L' Spaces Available :"," ",l.a.createElement("span",{style:{color:"red"}},this.state.parkingL_Counter)),l.a.createElement("h1",null," ","Parking Lot 'D' Spaces Available :"," ",l.a.createElement("span",{style:{color:"red"}},this.state.parkingD_Counter)),l.a.createElement("h1",null," ","Parking Lot 'F' Spaces Available :"," ",l.a.createElement("span",{style:{color:"red"}},this.state.parkingF_Counter)),l.a.createElement("h1",null," ","Parking Lot 'I' Spaces Available :"," ",l.a.createElement("span",{style:{color:"red"}},this.state.parkingI_Counter)))}},{key:"componentWillUnmount",value:function(){clearInterval(this.interval)}}]),t}(l.a.Component),L=a(3),N=a(23),M=(a(32),function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(s.a)(this,Object(u.a)(t).call(this))).state={LogID:"",VehicleID:"",StudentID:"",Location:"",DateLog:"",TagStatus:"",fetchedData:[{}],showPopup:!1},e.togglePop=e.togglePopup.bind(Object(L.a)(e)),e.reloadTable=e.reloadTable.bind(Object(L.a)(e)),e}return Object(h.a)(t,e),Object(o.a)(t,[{key:"togglePopup",value:function(){this.setState({showPopup:!this.state.showPopup})}},{key:"reloadTable",value:function(){this.setState({fetchedData:[{}]}),this.loadTableData()}},{key:"loadTableData",value:function(){var e=this;fetch(I+"/datalog",{method:"GET"}).then((function(e){return e.json()})).then((function(t){e.setState({fetchedData:t})}))}},{key:"componentDidMount",value:function(){var e=this;this.loadTableData(),this.interval=setInterval((function(){e.loadTableData()}),5e4)}},{key:"render",value:function(){var e=this.state.fetchedData;return l.a.createElement(l.a.Fragment,null,l.a.createElement(N.a,{data:e,columns:[{Header:"Student ID",accessor:"StudentID",filterable:!0,PivotValue:function(e){var t=e.value;return l.a.createElement("span",{style:{color:"darkgreen"}},t)},minWidth:100},{Header:"Vehicle ID",accessor:"VehicleID",filterable:!0,minWidth:100,PivotValue:function(e){var t=e.value;return l.a.createElement("span",{style:{color:"darkred"}},t)}},{Header:"Location",accessor:"Location",filterable:!1,minWidth:100},{Header:"Date Log",accessor:"DateLog",filterable:!1,minWidth:100},{Header:"Tag Status",accessor:"TagStatus",filterable:!1,minWidth:100}],filterable:!0,loadingText:"Loading.....",defaultPageSize:5,className:"-striped -highlight"}))}}]),t}(l.a.Component)),V=a(26),_=a.n(V),F=a(28),x=a.n(F),w=a(29),Y=a.n(w),H=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(s.a)(this,Object(u.a)(t).call(this))).state={student_id:"",Firstname:"",Lastname:"",VehicleID:""},e.handleChangeFirstname=e.handleChangeFirstname.bind(Object(L.a)(e)),e.handleChangeLastname=e.handleChangeLastname.bind(Object(L.a)(e)),e.handleChangeVehicleID=e.handleChangeVehicleID.bind(Object(L.a)(e)),e.togglePop=e.togglePopup.bind(Object(L.a)(e)),e}return Object(h.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e="";e=null!==this.props.vID?this.props.vID:"",this.setState({student_id:this.props.sID,Firstname:this.props.fN,Lastname:this.props.lN,VehicleID:e})}},{key:"togglePopup",value:function(){this.setState({showPopup:!this.state.showPopup})}},{key:"handleChangeFirstname",value:function(e){this.setState({Firstname:e.target.value})}},{key:"handleChangeLastname",value:function(e){this.setState({Lastname:e.target.value})}},{key:"handleChangeVehicleID",value:function(e){this.setState({VehicleID:e.target.value})}},{key:"render",value:function(){var e=this;return l.a.createElement("div",{className:"popup"},l.a.createElement("div",{className:"popup_inner_S"},l.a.createElement("div",null,l.a.createElement("label",null,"First Name :"),l.a.createElement("br",null),l.a.createElement("input",{type:"text",name:"FName",value:this.state.Firstname,onChange:this.handleChangeFirstname}),l.a.createElement("br",null),l.a.createElement("label",null,"Last Name :"),l.a.createElement("br",null),l.a.createElement("input",{type:"text",name:"LName",value:this.state.Lastname,onChange:this.handleChangeLastname}),l.a.createElement("br",null),l.a.createElement("label",null,"Vehicle ID :"),l.a.createElement("br",null),l.a.createElement("input",{type:"text",name:"Vid",value:this.state.VehicleID,onChange:this.handleChangeVehicleID}),l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("button",{id:"submitBTN",onClick:function(t){var a=null;""!==e.state.VehicleID&&(a=e.state.VehicleID),fetch(I+"/updatestudent/",{method:"PUT",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({StudentID:e.state.student_id,FirstName:e.state.Firstname,LastName:e.state.Lastname,VehicleID:a})}).then((function(e){return e.json()})).then((function(t){null!==t.sqlError?1062===t.sqlError.errno?alert("That Vehicle ID  is USED by another... try another Vehicle ID."):1452===t.sqlError.errno&&alert("That Vehicle ID does NOT EXIST try another Vehicle ID."):(alert(t.message),e.props.reloadTable())})),e.props.closePopup()}},"Submit"),l.a.createElement("button",{id:"closeBTN",onClick:this.props.closePopup},"Close"))))}}]),t}(l.a.Component),W=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(s.a)(this,Object(u.a)(t).call(this))).state={student_id:"",Firstname:"",Lastname:"",VehicleID:"",fetchedData:[{}],showPopup:!1},e.togglePop=e.togglePopup.bind(Object(L.a)(e)),e.reloadTable=e.reloadTable.bind(Object(L.a)(e)),e}return Object(h.a)(t,e),Object(o.a)(t,[{key:"togglePopup",value:function(){this.setState({showPopup:!this.state.showPopup})}},{key:"reloadTable",value:function(){this.setState({fetchedData:[{}]}),this.loadTableData()}},{key:"loadTableData",value:function(){var e=this;fetch(I+"/students",{method:"GET"}).then((function(e){return e.json()})).then((function(t){e.setState({fetchedData:t})}))}},{key:"componentDidMount",value:function(){var e=this;this.loadTableData(),this.interval=setInterval((function(){e.loadTableData()}),5e4)}},{key:"render",value:function(){var e=this,t=this.state.fetchedData;return l.a.createElement(l.a.Fragment,null,l.a.createElement(N.a,{data:t,columns:[{Header:"Student ID",accessor:"StudentID",filterable:!0},{Header:"First Name",accessor:"FirstName",filterable:!1},{Header:"Last Name",accessor:"LastName",filterable:!1},{Header:"Vehicle ID",accessor:"VehicleID",filterable:!0},{Header:l.a.createElement("div",null,"  Actions ",l.a.createElement("span",null)," ",l.a.createElement(_.a,{fontSize:"large",color:"inherit",onClick:function(e){alert("hello")}})),filterable:!1,Cell:function(t){return l.a.createElement("div",null,l.a.createElement(x.a,{fontSize:"large",color:"inherit",onClick:function(a){e.setState({student_id:t.original.StudentID,Firstname:t.original.FirstName,Lastname:t.original.LastName,VehicleID:t.original.VehicleID}),e.togglePop()}}),e.state.showPopup?l.a.createElement(H,{sID:e.state.student_id,fN:e.state.Firstname,lN:e.state.Lastname,vID:e.state.VehicleID,closePopup:e.togglePopup.bind(e),reloadTable:e.reloadTable.bind(e)}):null,l.a.createElement("span",null," "),l.a.createElement(Y.a,{fontSize:"large",color:"error",onClick:function(a){fetch(I+"/delete/studentdata/"+t.original.StudentID,{method:"DELETE"}).then((function(e){return e.json()})).then((function(t){e.reloadTable(),alert(t.message)}))}}))}}],filterable:!0,loadingText:"Loading.....",defaultPageSize:5,className:"-striped -highlight"}))}}]),t}(l.a.Component),A=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(s.a)(this,Object(u.a)(t).call(this))).state={student_id:"",Firstname:"",Lastname:"",postStudent_info:""},e.handleChangeStudentid=e.handleChangeStudentid.bind(Object(L.a)(e)),e.handleChangeFirstname=e.handleChangeFirstname.bind(Object(L.a)(e)),e.handleChangeLastname=e.handleChangeLastname.bind(Object(L.a)(e)),e}return Object(h.a)(t,e),Object(o.a)(t,[{key:"handleChangeStudentid",value:function(e){this.setState({student_id:e.target.value})}},{key:"handleChangeFirstname",value:function(e){this.setState({Firstname:e.target.value})}},{key:"handleChangeLastname",value:function(e){this.setState({Lastname:e.target.value})}},{key:"convertJSON2Table",value:function(e){for(var t=[],a=0;a<e.length;a++)for(var n in e[a])-1===t.indexOf(n)&&t.push(n);for(var l=document.createElement("table"),i=l.insertRow(-1),r=0;r<t.length;r++){var c=document.createElement("th");c.innerHTML=t[r],i.appendChild(c)}for(var o=0;o<e.length;o++){i=l.insertRow(-1);for(var s=0;s<t.length;s++){i.insertCell(-1).innerHTML=e[o][t[s]]}}this.setState({postStudent_info:l.outerHTML,userinput:""})}},{key:"render",value:function(){var e=this;return l.a.createElement(l.a.Fragment,null,l.a.createElement("h1",null,"Create New Student"),"Student ID",l.a.createElement("input",{type:"text",name:"SID",value:this.state.student_id,onChange:this.handleChangeStudentid}),l.a.createElement("br",null),"First Name",l.a.createElement("input",{type:"text",name:"First",value:this.state.Firstname,onChange:this.handleChangeFirstname}),l.a.createElement("br",null),"Last Name",l.a.createElement("input",{type:"text",name:"Last",value:this.state.Lastname,onChange:this.handleChangeLastname}),l.a.createElement("br",null),l.a.createElement("button",{onClick:function(t){fetch(I+"/createstudent/",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({StudentID:e.state.student_id,FirstName:e.state.Firstname,LastName:e.state.Lastname})}).then((function(e){return e.json()})).then((function(e){alert(e.message)}))}},"Post Student Info"),l.a.createElement("br",null),l.a.createElement("br",null))}}]),t}(l.a.Component),z=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(s.a)(this,Object(u.a)(t).call(this))).state={VehicleID:"",StudentID:"",Make:"",Model:"",Year:"",LicencePlate:"",TagNum:"",TagStatus:""},e.handleChangeVehicleID=e.handleChangeVehicleID.bind(Object(L.a)(e)),e.handleChangeStudentID=e.handleChangeStudentID.bind(Object(L.a)(e)),e.handleChangeMake=e.handleChangeMake.bind(Object(L.a)(e)),e.handleChangeModel=e.handleChangeModel.bind(Object(L.a)(e)),e.handleChangeYear=e.handleChangeYear.bind(Object(L.a)(e)),e.handleChangeLicencePlate=e.handleChangeLicencePlate.bind(Object(L.a)(e)),e.handleChangeTagNum=e.handleChangeTagNum.bind(Object(L.a)(e)),e.handleChangeTagStatus=e.handleChangeTagStatus.bind(Object(L.a)(e)),e.togglePop=e.togglePopup.bind(Object(L.a)(e)),e}return Object(h.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){this.setState({VehicleID:this.props.vID,StudentID:this.props.sID,Make:this.props.mK,Model:this.props.mO,Year:this.props.yR,LicencePlate:this.props.lP,TagNum:this.props.tN,TagStatus:this.props.tS})}},{key:"togglePopup",value:function(){this.setState({showPopup:!this.state.showPopup})}},{key:"handleChangeVehicleID",value:function(e){this.setState({VehicleID:e.target.value})}},{key:"handleChangeStudentID",value:function(e){this.setState({StudentID:e.target.value})}},{key:"handleChangeMake",value:function(e){this.setState({Make:e.target.value})}},{key:"handleChangeModel",value:function(e){this.setState({Model:e.target.value})}},{key:"handleChangeYear",value:function(e){this.setState({Year:e.target.value})}},{key:"handleChangeLicencePlate",value:function(e){this.setState({LicencePlate:e.target.value})}},{key:"handleChangeTagNum",value:function(e){this.setState({TagNum:e.target.value})}},{key:"handleChangeTagStatus",value:function(e){this.setState({TagStatus:e.target.value})}},{key:"render",value:function(){var e=this;return l.a.createElement("div",{className:"popup"},l.a.createElement("div",{className:"popup_inner_V"},l.a.createElement("div",null,l.a.createElement("label",null,"Vehicle ID :"),l.a.createElement("br",null),l.a.createElement("input",{type:"text",name:"Vid",value:this.state.VehicleID,onChange:this.handleChangeVehicleID}),l.a.createElement("br",null),l.a.createElement("label",null,"Student ID :"),l.a.createElement("br",null),l.a.createElement("input",{type:"text",name:"Sid",value:this.state.StudentID,onChange:this.handleChangeStudentID}),l.a.createElement("br",null),l.a.createElement("label",null,"Make :"),l.a.createElement("br",null),l.a.createElement("input",{type:"text",name:"Mk",value:this.state.Make,onChange:this.handleChangeMake})),l.a.createElement("div",null,l.a.createElement("label",null,"Model :"),l.a.createElement("br",null),l.a.createElement("input",{type:"text",name:"Mo",value:this.state.Model,onChange:this.handleChangeModel}),l.a.createElement("br",null),l.a.createElement("label",null,"Year :"),l.a.createElement("br",null),l.a.createElement("input",{type:"text",name:"Yr",value:this.state.Year,onChange:this.handleChangeYear}),l.a.createElement("br",null),l.a.createElement("label",null,"Licence Plate :"),l.a.createElement("br",null),l.a.createElement("input",{type:"text",name:"Lp",value:this.state.LicencePlate,onChange:this.handleChangeLicencePlate})),l.a.createElement("div",null,l.a.createElement("label",null,"Tag Number :"),l.a.createElement("br",null),l.a.createElement("input",{type:"text",name:"Tn",value:this.state.TagNum,onChange:this.handleChangeTagNum}),l.a.createElement("br",null),l.a.createElement("label",null,"Tag Status :"),l.a.createElement("br",null),l.a.createElement("input",{type:"text",name:"Ts",value:this.state.TagStatus,onChange:this.handleChangeTagStatus}),l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("button",{id:"submitBTN",onClick:function(t){fetch(I+"/updatevehicle",{method:"PUT",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({VehicleID:e.state.VehicleID,StudentID:e.state.StudentID,Make:e.state.Make,Model:e.state.Model,Year:e.state.Year,LicencePlate:e.state.LicencePlate,TagNum:e.state.TagNum,TagStatus:e.state.TagStatus})}).then((function(e){return e.json()})).then((function(t){alert(t.message),e.props.reloadTable()})),e.props.closePopup()}},"Submit"),l.a.createElement("button",{id:"closeBTN",onClick:this.props.closePopup},"Close"))))}}]),t}(l.a.Component),J=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(s.a)(this,Object(u.a)(t).call(this))).state={Vehicle_id:"",student_id:"",Make:"",Model:"",Year:"",LicencePlate:"",TagNum:"",TagStatus:"",fetchedData:[{}],showPopup:!1},e.togglePop=e.togglePopup.bind(Object(L.a)(e)),e.reloadTable=e.reloadTable.bind(Object(L.a)(e)),e}return Object(h.a)(t,e),Object(o.a)(t,[{key:"togglePopup",value:function(){this.setState({showPopup:!this.state.showPopup})}},{key:"reloadTable",value:function(){this.setState({fetchedData:[{}]}),this.loadTableData()}},{key:"loadTableData",value:function(){var e=this;fetch(I+"/Vehicles",{method:"GET"}).then((function(e){return e.json()})).then((function(t){e.setState({fetchedData:t})}))}},{key:"componentDidMount",value:function(){var e=this;this.loadTableData(),this.interval=setInterval((function(){e.loadTableData()}),5e4)}},{key:"render",value:function(){var e=this,t=this.state.fetchedData;return l.a.createElement(l.a.Fragment,null,l.a.createElement(N.a,{data:t,columns:[{Header:"Vehicle ID",accessor:"VehicleID",filterable:!0,minWidth:100},{Header:"Student ID",accessor:"StudentID",filterable:!0,minWidth:100},{Header:"Make",accessor:"Make",filterable:!1,minWidth:100},{Header:"Model",accessor:"Model",filterable:!1,minWidth:100},{Header:"Year",accessor:"Year",filterable:!1,minWidth:100},{Header:"Licence Plate",accessor:"LicencePlate",filterable:!1},{Header:"Tag Number",accessor:"TagNum",filterable:!1,minWidth:250},{Header:"Tag Status",accessor:"TagStatus",filterable:!1,maxWidth:100},{Header:l.a.createElement("div",null,"  Actions ",l.a.createElement("span",null)," ",l.a.createElement(_.a,{fontSize:"large",color:"inherit",onClick:function(e){alert("hello")}})),filterable:!1,Cell:function(t){return l.a.createElement("div",null,l.a.createElement(x.a,{fontSize:"large",color:"inherit",onClick:function(a){e.setState({Vehicle_id:t.original.VehicleID,student_id:t.original.StudentID,Make:t.original.Make,Model:t.original.Model,Year:t.original.Year,LicencePlate:t.original.LicencePlate,TagNum:t.original.TagNum,TagStatus:t.original.TagStatus}),e.togglePop()}}),e.state.showPopup?l.a.createElement(z,{vID:e.state.Vehicle_id,sID:e.state.student_id,mK:e.state.Make,mO:e.state.Model,yR:e.state.Year,lP:e.state.LicencePlate,tN:e.state.TagNum,tS:e.state.TagStatus,closePopup:e.togglePopup.bind(e),reloadTable:e.reloadTable.bind(e)}):null,l.a.createElement("span",null," "),l.a.createElement(Y.a,{fontSize:"large",color:"error",onClick:function(a){fetch(I+"/delete/vehicledata/"+t.original.VehicleID,{method:"DELETE"}).then((function(e){return e.json()})).then((function(t){e.reloadTable(),alert(t.message)}))}}))}}],filterable:!0,loadingText:"Loading.....",defaultPageSize:7,className:"-striped -highlight"}))}}]),t}(l.a.Component),B=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(s.a)(this,Object(u.a)(t).call(this))).state={student_id:"",Make:"",Model:"",Year:"",Licence_Plate:"",Tag_Number:"",postVehicle_info:""},e.handleChangeStudentid=e.handleChangeStudentid.bind(Object(L.a)(e)),e.handleChangeMake=e.handleChangeMake.bind(Object(L.a)(e)),e.handleChangeModel=e.handleChangeModel.bind(Object(L.a)(e)),e.handleChangeYear=e.handleChangeYear.bind(Object(L.a)(e)),e.handleChangeLicencePlate=e.handleChangeLicencePlate.bind(Object(L.a)(e)),e.handleChangeTagNumber=e.handleChangeTagNumber.bind(Object(L.a)(e)),e}return Object(h.a)(t,e),Object(o.a)(t,[{key:"handleChangeStudentid",value:function(e){this.setState({student_id:e.target.value})}},{key:"handleChangeMake",value:function(e){this.setState({Make:e.target.value})}},{key:"handleChangeModel",value:function(e){this.setState({Model:e.target.value})}},{key:"handleChangeYear",value:function(e){this.setState({Year:e.target.value})}},{key:"handleChangeLicencePlate",value:function(e){this.setState({Licence_Plate:e.target.value})}},{key:"handleChangeTagNumber",value:function(e){this.setState({Tag_Number:e.target.value})}},{key:"render",value:function(){var e=this;return l.a.createElement(l.a.Fragment,null,l.a.createElement("h1",null,"Create New Vehicle"),"Student ID",l.a.createElement("input",{type:"text",name:"SID",value:this.state.student_id,onChange:this.handleChangeStudentid}),l.a.createElement("br",null),"Make",l.a.createElement("input",{type:"text",name:"mk",value:this.state.Make,onChange:this.handleChangeMake}),l.a.createElement("br",null),"Model",l.a.createElement("input",{type:"text",name:"mo",value:this.state.Model,onChange:this.handleChangeModel}),l.a.createElement("br",null),"Year",l.a.createElement("input",{type:"text",name:"year",value:this.state.Year,onChange:this.handleChangeYear}),l.a.createElement("br",null),"Licence Plate",l.a.createElement("input",{type:"text",name:"LP",value:this.state.Licence_Plate,onChange:this.handleChangeLicencePlate}),l.a.createElement("br",null),"Tag #",l.a.createElement("input",{type:"text",name:"Tnum",value:this.state.Tag_Number,onChange:this.handleChangeTagNumber}),l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("button",{onClick:function(t){fetch(I+"/createvehicle/",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({StudentID:e.state.student_id,Make:e.state.Make,Model:e.state.Model,Year:e.state.Year,LicencePlate:e.state.Licence_Plate,TagNum:e.state.Tag_Number})}).then((function(e){return e.json()})).then((function(e){alert(e.message)}))}},"Post Vehicle Info"),l.a.createElement("br",null),l.a.createElement("br",null))}}]),t}(l.a.Component),G=Object(p.a)({root:{backgroundColor:"#333",color:"white",flexGrow:1}});function q(e){var t=e.children,a=e.value,n=e.index,i=Object(m.a)(e,["children","value","index"]);return l.a.createElement(j.a,Object.assign({component:"div",role:"tabpanel",hidden:a!==n,id:"full-width-tabpanel-".concat(n),"aria-labelledby":"full-width-tab-".concat(n)},i),l.a.createElement(v.a,{p:3},t))}function R(e){return{id:"full-width-tab-".concat(e),"aria-controls":"full-width-tabpanel-".concat(e)}}function U(){var e=G(),t=l.a.useState(0),a=Object(d.a)(t,2),n=a[0],i=a[1];return l.a.createElement(g.a,{square:!0,className:e.root},l.a.createElement(b.a,{value:n,onChange:function(e,t){i(t)},variant:"fullWidth",TabIndicatorProps:{style:{background:"green"}},textColor:"inherit","aria-label":"icon label tabs example",centered:!0},l.a.createElement(f.a,Object.assign({icon:l.a.createElement(T.a,null),label:"Data Log"},R(0))),l.a.createElement(f.a,Object.assign({icon:l.a.createElement(k.a,null),label:"Student"},R(1))),l.a.createElement(f.a,Object.assign({icon:l.a.createElement(C.a,null),label:"Vehicles"},R(2))),l.a.createElement(f.a,Object.assign({icon:l.a.createElement(O.a,null),label:"Space Counter"},R(3)))),l.a.createElement(q,{value:n,index:0},l.a.createElement(M,null," ")),l.a.createElement(q,{value:n,index:1},l.a.createElement(W,null),l.a.createElement(A,null)),l.a.createElement(q,{value:n,index:2},l.a.createElement(J,null),l.a.createElement(B,null)),l.a.createElement(q,{value:n,index:3},l.a.createElement(P,null)))}var K=function(e){function t(){return Object(c.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement(U,null))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(l.a.createElement(K,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[45,1,2]]]);
//# sourceMappingURL=main.96bbb00d.chunk.js.map