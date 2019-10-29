import React, { Component } from "react";
import GetTag from "./components/GetTagComponent.jsx";
import GetAllComponent from "./components/GetAllComponent.jsx";
import CreateStudentComp from "./components/CreateStudentComp.jsx";
import CreateVehicleComp from "./components/CreateVehicleComp.jsx";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <GetAllComponent></GetAllComponent>
        <hr />
        <GetTag />
        <hr />
        <CreateStudentComp />
        <hr />
        <CreateVehicleComp></CreateVehicleComp>
        <hr />
      </div>
    );
  }
}

export default App;
