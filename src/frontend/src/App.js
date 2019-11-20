import React, { Component } from "react";
// import GetTag from "./components/GetTagComponent.jsx";
// import GetAllVehicles from "./components/GetAllVehicles.jsx";
// import CreateStudentComp from "./components/CreateStudentComp.jsx";
// import CreateVehicleComp from "./components/CreateVehicleComp.jsx";
// import SpotCounter from "./components/Counter.jsx";
import MainPage from "./components/MainPage.jsx";
//import "./App.css";
// import GetLog from "./components/GetLog.jsx";
// import GetAllStudents from "./components/GetAllStudents.jsx";

class App extends Component {
  render() {
    return (
      <div>
        <MainPage />
        {/* <SpotCounter />
        <hr />
        <GetLog></GetLog>
        <hr></hr>
        <GetAllStudents />
        <hr></hr>
        <GetAllVehicles />
        <hr />
        <CreateStudentComp />
        <hr />
        <CreateVehicleComp />
        <hr /> */}
      </div>
    );
  }
}

export default App;
