import React from "react";

export default class DeleteVehicle extends React.Component {
  constructor() {
    super();
    this.state = {
      Vehicle_id: "",
      Make: "",
      Model: "",
      Year: "",
      Licence_Plate: "",
      Tag_Number: "",
      tag_Status: "",
      DeleteStudent_info: ""
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
        <br />
        <button
          //Check if user input is not blank
          onClick={e => {
            fetch("http://localhost:3000/delete/vehicledata/:VehicleID", {
              method: "DELETE",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                VehicleID: this.state.Vehicle_id,
                Make: this.state.Make,
                Model: this.state.Model,
                Year: this.state.Year,
                LicencePlate: this.state.Licence_Plate,
                TagNum: this.state.Tag_Number,
                TagStatus: this.state.Tag_Status
              })
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
