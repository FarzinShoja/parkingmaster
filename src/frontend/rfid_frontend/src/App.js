import React, { Component } from "react";
import GetTag from "./components/GetTagComponent.jsx";
import GetAllComponent from "./components/GetAllComponent.jsx";
import CreateStudentComp from "./components/CreateStudentComp.jsx";
import CreateVehicleComp from "./components/CreateVehicleComp.jsx";
import SpotCounter from "./components/Counter.jsx";
//import "./App.css";
import GetLog from "./components/GetLog.jsx";
import GetAllStudents from "./components/GetAllStudents.jsx";
import UpdateVehicle from "./components/UpdateVehicle.jsx";
import DeleteVehicle from "./components/DeleteVehicle.jsx";
import DeleteStudent from "./components/DeleteStudent";

class App extends Component {
  render() {
    return (
      <div>
        <SpotCounter />
        <hr />
        <DeleteStudent />
        <hr />
        <GetLog></GetLog>
        <hr></hr>
        <GetAllStudents />
        <hr></hr>
        <GetAllComponent />
        <hr />
        <GetTag />
        <hr />
        <CreateStudentComp />
        <hr />
        <CreateVehicleComp />
        <hr />
        <UpdateVehicle />
        <hr />
        <DeleteVehicle />
        <hr />
      </div>
    );
  }
}

export default App;
