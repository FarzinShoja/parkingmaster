import React from "react";

import backendurl from "../config.js";

export default class SpotCounter extends React.Component {
  constructor() {
    super();
    this.state = {
      parkingDeck_Counter: "-",
      parkingA_Counter: "-",
      parkingL_Counter: "-",
      parkingD_Counter: "-",
      parkingF_Counter: "-",
      parkingI_Counter: "-"
    };
  }
  componentDidMount() {
    this.updateCounter();
    this.interval = setInterval(() => {
      this.updateCounter();
    }, 10000);
  }

  updateCounter() {
    fetch("http://" + backendurl.backend + "/parkingDeck_Counter", {
      method: "GET"
    })
      .then(res => res.json())
      .then(result => {
        this.setState({
          parkingDeck_Counter: result.lots
        });
      });
  }

  render() {
    return (
      <React.Fragment>
        <h1>
          {" "}
          Parking Deck Spaces Available :{" "}
          <span style={{ color: "red" }}>{this.state.parkingDeck_Counter}</span>
        </h1>
        <h1>
          {" "}
          Parking Lot 'A' Spaces Available :{" "}
          <span style={{ color: "red" }}>{this.state.parkingA_Counter}</span>
        </h1>
        <h1>
          {" "}
          Parking Lot 'L' Spaces Available :{" "}
          <span style={{ color: "red" }}>{this.state.parkingL_Counter}</span>
        </h1>
        <h1>
          {" "}
          Parking Lot 'D' Spaces Available :{" "}
          <span style={{ color: "red" }}>{this.state.parkingD_Counter}</span>
        </h1>
        <h1>
          {" "}
          Parking Lot 'F' Spaces Available :{" "}
          <span style={{ color: "red" }}>{this.state.parkingF_Counter}</span>
        </h1>
        <h1>
          {" "}
          Parking Lot 'I' Spaces Available :{" "}
          <span style={{ color: "red" }}>{this.state.parkingI_Counter}</span>
        </h1>
      </React.Fragment>
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
}
