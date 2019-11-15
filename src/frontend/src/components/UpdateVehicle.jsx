import React from "react";

import backendurl from "../config.js";


export default class UpdateVehicle extends React.Component {
  constructor() {
    super();
    this.state = {
      VehicleID: "",
      StudentID: "",
      Make: "",
      Model: "",
      Year: "",
      LicencePlate: "",
      TagNum: "",
      TagStatus: ""
    };

    this.handleChangeVehicleID = this.handleChangeVehicleID.bind(this);
    this.handleChangeStudentID = this.handleChangeStudentID.bind(this);
    this.handleChangeMake = this.handleChangeMake.bind(this);
    this.handleChangeModel = this.handleChangeModel.bind(this);
    this.handleChangeYear = this.handleChangeYear.bind(this);
    this.handleChangeLicencePlate = this.handleChangeLicencePlate.bind(this);
    this.handleChangeTagNum = this.handleChangeTagNum.bind(this);
    this.handleChangeTagStatus = this.handleChangeTagStatus.bind(this);
    this.togglePop = this.togglePopup.bind(this);
  }

  //=========Unclear
  componentDidMount() {
    this.setState({
      VehicleID: this.props.vID,
      StudentID: this.props.sID,
      Make: this.props.mK,
      Model: this.props.mO,
      Year: this.props.yR,
      LicencePlate: this.props.lP,
      TagNum: this.props.tN,
      TagStatus: this.props.tS
    });
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  handleChangeVehicleID(event) {
    this.setState({
      VehicleID: event.target.value
    });
  }

  handleChangeStudentID(event) {
    this.setState({
      StudentID: event.target.value
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
      LicencePlate: event.target.value
    });
  }

  handleChangeTagNum(event) {
    this.setState({
      TagNum: event.target.value
    });
  }

  handleChangeTagStatus(event) {
    this.setState({
      TagStatus: event.target.value
    });
  }

  render() {
    return (
      <div className="popup">
        <div className="popup_inner_V">
          <div>
            <label>Vehicle ID :</label>
            <br />
            <input
              type="text"
              name="Vid"
              value={this.state.VehicleID}
              onChange={this.handleChangeVehicleID}
            />
            <br />
            <label>Student ID :</label>
            <br />
            <input
              type="text"
              name="Sid"
              value={this.state.StudentID}
              onChange={this.handleChangeStudentID}
            />
            <br />
            <label>Make :</label>
            <br />
            <input
              type="text"
              name="Mk"
              value={this.state.Make}
              onChange={this.handleChangeMake}
            />
          </div>
          <div>
            <label>Model :</label>
            <br />
            <input
              type="text"
              name="Mo"
              value={this.state.Model}
              onChange={this.handleChangeModel}
            />
            <br />
            <label>Year :</label>
            <br />
            <input
              type="text"
              name="Yr"
              value={this.state.Year}
              onChange={this.handleChangeYear}
            />
            <br />
            <label>Licence Plate :</label>
            <br />
            <input
              type="text"
              name="Lp"
              value={this.state.LicencePlate}
              onChange={this.handleChangeLicencePlate}
            />
          </div>
          <div>
            <label>Tag Number :</label>
            <br />
            <input
              type="text"
              name="Tn"
              value={this.state.TagNum}
              onChange={this.handleChangeTagNum}
            />
            <br />
            <label>Tag Status :</label>
            <br />
            <input
              type="text"
              name="Ts"
              value={this.state.TagStatus}
              onChange={this.handleChangeTagStatus}
            />
            <br />
            <br />
            <button
              id="submitBTN"
              onClick={e => {
                fetch("http://" + backendurl.backend + "/updatevehicle", {
                  method: "PUT",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    VehicleID: this.state.VehicleID,
                    StudentID: this.state.StudentID,
                    Make: this.state.Make,
                    Model: this.state.Model,
                    Year: this.state.Year,
                    LicencePlate: this.state.LicencePlate,
                    TagNum: this.state.TagNum,
                    TagStatus: this.state.TagStatus
                  })
                })
                  .then(res => res.json())
                  .then(result => {
                    alert(result.message);
                    this.props.reloadTable();
                  });
                this.props.closePopup();
              }}
            >
              Submit
            </button>
            <button id="closeBTN" onClick={this.props.closePopup}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}
