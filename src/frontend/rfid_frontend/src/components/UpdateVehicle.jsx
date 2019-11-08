import React from "react";

export default class UpdateVehicle extends React.Component {
  constructor() {
    super();
    this.state = {
      Vehicle_id: "",
      Make: "",
      Model: "",
      Year: "",
      Licence_Plate: "",
      Tag_Number: "",
      showPopup: false
    };

    this.handleChangeVehicleid = this.handleChangeVehicleid.bind(this);
    this.handleChangeMake = this.handleChangeMake.bind(this);
    this.handleChangeModel = this.handleChangeModel.bind(this);
    this.handleChangeYear = this.handleChangeYear.bind(this);
    this.handleChangeLicencePlate = this.handleChangeLicencePlate.bind(this);
    this.handleChangeTagNumber = this.handleChangeTagNumber.bind(this);
    this.togglePop = this.togglePopup.bind(this);
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  handleChangeVehicleid(event) {
    this.setState({
      Vehicle_id: event.target.value
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
        <h1>Update Vehicle</h1>
        Enter Vehicle ID:
        <input
          type="text"
          name="VID"
          value={this.state.Vehicle_id}
          onChange={this.handleChangeVehicleid}
        />
        <br></br>
        <button
          //Check if user input is not blank
          onClick={e => {
            if (this.state.Vehicle_id !== "") {
              fetch("http://localhost:3000/vehicles/" + this.state.Vehicle_id, {
                method: "GET"
              })
                .then(res => res.json())
                .then(result => {
                  this.setState({
                    Make: JSON.stringify(result[0].Make),
                    Model: JSON.stringify(result[0].Model),
                    Year: JSON.stringify(result[0].Year),
                    LicencePlate: JSON.stringify(result[0].LicencePlate),
                    TagNum: JSON.stringify(result[0].TagNum)
                  });
                  this.togglePop();
                });
            } else {
              alert("Enter a Vehicle ID");
            }
          }}
        >
          Update
        </button>
        {this.state.showPopup ? (
          <Popup
            vID={this.state.Vehicle_id}
            mK={this.state.Make}
            mO={this.state.Model}
            Yr={this.state.Year}
            lP={this.state.LicencePlate}
            tN={this.state.TagNum}
            closePopup={this.togglePopup.bind(this)}
          />
        ) : null}
        <br></br>
        <br></br>
      </React.Fragment>
    );
  }
}
//=================================================================================================
//=================================================================================================
//=================================================================================================
//=================================================================================================
class Popup extends React.Component {
  constructor() {
    super();
    this.state = {
      Vehicle_id: "",
      Make: "",
      Model: "",
      Year: "",
      Licence_Plate: "",
      Tag_Number: ""
    };

    this.handleChangeMake = this.handleChangeMake.bind(this);
    this.handleChangeModel = this.handleChangeModel.bind(this);
    this.handleChangeYear = this.handleChangeYear.bind(this);
    this.handleChangeLicencePlate = this.handleChangeLicencePlate.bind(this);
    this.handleChangeTagNumber = this.handleChangeTagNumber.bind(this);
  }

  componentDidMount() {
    this.setState({
      Vehicle_id: this.props.vID.replace(/['"]+/g, ""),
      Make: this.props.mK.replace(/['"]+/g, ""),
      Model: this.props.mO.replace(/['"]+/g, ""),
      Year: this.props.Yr.replace(/['"]+/g, ""),
      Licence_Plate: this.props.lP.replace(/['"]+/g, ""),
      Tag_Number: this.props.tN.replace(/['"]+/g, "")
    });
  }

  handleChangeVehicleid(event) {
    this.setState({
      Vehicle_id: event.target.value
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
      <div className="popup">
        <div className="popup_inner">
          Make =
          <input
            type="text"
            name="mk"
            value={this.state.Make}
            onChange={this.handleChangeMake}
          />
          <br></br>
          Model =
          <input
            type="text"
            name="mo"
            value={this.state.Model}
            onChange={this.handleChangeModel}
          />
          <br></br>
          Year =
          <input
            type="text"
            name="year"
            value={this.state.Year}
            onChange={this.handleChangeYear}
          />
          <br></br>
          Licence Plate =
          <input
            type="text"
            name="LP"
            value={this.state.Licence_Plate}
            onChange={this.handleChangeLicencePlate}
          />
          <br></br>
          Tag # =
          <input
            type="text"
            name="Tnum"
            value={this.state.Tag_Number}
            onChange={this.handleChangeTagNumber}
          />
          <br />
          <button
            onClick={e => {
              fetch("http://localhost:3000/updatevehicle/", {
                method: "PUT",
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
                  Tag_Number: this.state.Tag_Number
                })
              })
                .then(res => res.json())
                .then(result => {
                  alert(result.message);
                });
            }}
          >
            Submit Updates
          </button>
          <button onClick={this.props.closePopup}>Close</button>
        </div>
      </div>
    );
  }
}