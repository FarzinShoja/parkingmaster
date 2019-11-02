import React from "react";

export default class CreateVehicleComp extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>Create New Vehicle</h1>
        Student ID <input type="text" name="SID" />
        <br></br>
        Make <input type="text" name="mk" />
        <br></br>
        Model <input type="text" name="mo" />
        <br></br>
        Year <input type="text" name="yewar" />
        <br></br>
        Licence Plate <input type="text" name="LP" />
        <br></br>
        Tag # <input type="text" name="Tnum" />
        <br></br>
        Tag Status <input type="text" name="Status" />
        <br></br>
        <button
          onClick={e => {
            e.preventDefault();
            this.clicked();
          }}
        >
          {" "}
          Send
        </button>
      </React.Fragment>
    );
  }
}
