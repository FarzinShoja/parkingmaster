import React, { Component } from "react";
import GetTag from "./components/GetTag";
import GetAllComponent from "./components/GetAllComponent.jsx";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <GetAllComponent></GetAllComponent>
        <hr />
        <GetTag />
        <hr />
      </div>
    );
  }
}

export default App;
