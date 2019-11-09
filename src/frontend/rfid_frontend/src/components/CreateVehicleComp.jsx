import React from "react";

export default class CreateVehicleComp extends React.Component {
  constructor() {
    super();
    this.state = {
      student_id: "",
      Make: "",
      Model: "",
      Year: "",
      Licence_Plate: "",
      Tag_Number: "",
      postVehicle_info: ""
    };

    this.handleChangeStudentid = this.handleChangeStudentid.bind(this);
    this.handleChangeMake = this.handleChangeMake.bind(this);
    this.handleChangeModel = this.handleChangeModel.bind(this);
    this.handleChangeYear = this.handleChangeYear.bind(this);
    this.handleChangeLicencePlate = this.handleChangeLicencePlate.bind(this);
    this.handleChangeTagNumber = this.handleChangeTagNumber.bind(this);
  }

  handleChangeStudentid(event) {
    this.setState({
      student_id: event.target.value
    });
  }

  handleChangeMake(event) {
    this.setState({
      Make: event.target.value
    });
  }

  handleChangeModel(event) {
    this.setState({
      Model: event.target.value
    });
  }

  handleChangeYear(event) {
    this.setState({
      Year: event.target.value
    });
  }

  handleChangeLicencePlate(event) {
    this.setState({
      Licence_Plate: event.target.value
    });
  }

  handleChangeTagNumber(event) {
    this.setState({
      Tag_Number: event.target.value
    });
  }

  render() {
    return (
      <React.Fragment>
        <h1>Create New Vehicle</h1>
        Student ID
        <input
          type="text"
          name="SID"
          value={this.state.student_id}
          onChange={this.handleChangeStudentid}
        />
        <br></br>
        Make
        <input
          type="text"
          name="mk"
          value={this.state.Make}
          onChange={this.handleChangeMake}
        />
        <br></br>
        Model
        <input
          type="text"
          name="mo"
          value={this.state.Model}
          onChange={this.handleChangeModel}
        />
        <br></br>
        Year
        <input
          type="text"
          name="year"
          value={this.state.Year}
          onChange={this.handleChangeYear}
        />
        <br></br>
        Licence Plate
        <input
          type="text"
          name="LP"
          value={this.state.Licence_Plate}
          onChange={this.handleChangeLicencePlate}
        />
        <br></br>
        Tag #
        <input
          type="text"
          name="Tnum"
          value={this.state.Tag_Number}
          onChange={this.handleChangeTagNumber}
        />
        <br></br>
        <br></br>
        <button
          onClick={e => {
            fetch("http://localhost:3000/createvehicle/", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                StudentID: this.state.student_id,
                Make: this.state.Make,
                Model: this.state.Model,
                Year: this.state.Year,
                LicencePlate: this.state.Licence_Plate,
                TagNum: this.state.Tag_Number
              })
            })
              .then(res => res.json())
              .then(result => {
                alert(result.message);
              });
          }}
        >
          Post Vehicle Info
        </button>
        <br></br>
        <br></br>
      </React.Fragment>
    );
  }
}
