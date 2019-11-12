import React from "react";

export default class DeleteVehicle extends React.Component {
  constructor() {
    super();
    this.state = {
      Vehicle_id: ""
    };

    this.handleChangeVehicleid = this.handleChangeVehicleid.bind(this);
  }

  handleChangeVehicleid(event) {
    this.setState({
      Vehicle_id: event.target.value
    });
  }

  render() {
    return (
      <React.Fragment>
        <h1>Delete Vehicle</h1>
        Enter Vehicle ID:
        <input
          type="text"
          name="VID"
          value={this.state.Vehicle_id}
          onChange={this.handleChangeVehicleid}
        />
        <span>     </span>
        <button
          //Check if user input is not blank
          onClick={e => {
            fetch("http://localhost:3000/delete/vehicledata/" + this.state.Vehicle_id, {
              method: "DELETE",
            })
              .then(res => res.json())
              .then(result => {
                alert(result.message);
              });
          }}
        >
          Delete Vehicle
        </button>
        <br></br>
        <br></br>
      </React.Fragment>
    );
  }
}
