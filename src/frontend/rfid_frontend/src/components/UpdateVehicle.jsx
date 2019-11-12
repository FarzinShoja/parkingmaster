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
      tag_Status: "",
      showPopup: false
    };

    this.handleChangeVehicleid = this.handleChangeVehicleid.bind(this);
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
                  console.log(result);
                  if(result.errorCode === 404) {
                    alert("This Vehicle ID Does Not Exist in Our Data Base");
                    console.log("This Vehicle ID Does Not Exist in Our Data Base");
                  } else {
                  this.setState({
                    Make: JSON.stringify(result[0].Make),
                    Model: JSON.stringify(result[0].Model),
                    Year: JSON.stringify(result[0].Year),
                    Licence_Plate: JSON.stringify(result[0].LicencePlate),
                    Tag_Number: JSON.stringify(result[0].TagNum),
                    Tag_Status: JSON.stringify(result[0].TagStatus)
                  });
                  this.togglePop();
                }
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
            lP={this.state.Licence_Plate}
            tN={this.state.Tag_Number}
            tS={this.state.Tag_Status}
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
      Tag_Number: "",
      Tag_Status: ""
    };

    this.handleChangeMake = this.handleChangeMake.bind(this);
    this.handleChangeModel = this.handleChangeModel.bind(this);
    this.handleChangeYear = this.handleChangeYear.bind(this);
    this.handleChangeLicencePlate = this.handleChangeLicencePlate.bind(this);
    this.handleChangeTagNumber = this.handleChangeTagNumber.bind(this);
    this.handleChangeTagStatus = this.handleChangeTagStatus.bind(this);
  }

  componentDidMount() {
    this.setState({
      Vehicle_id: this.props.vID.replace(/['"]+/g, ""),
      Make: this.props.mK.replace(/['"]+/g, ""),
      Model: this.props.mO.replace(/['"]+/g, ""),
      Year: this.props.Yr.replace(/['"]+/g, ""),
      Licence_Plate: this.props.lP.replace(/['"]+/g, ""),
      Tag_Number: this.props.tN.replace(/['"]+/g, ""),
      Tag_Status: this.props.tS.replace(/['"]+/g, "")
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

  handleChangeTagStatus(event) {
    this.setState({
      Tag_Status: event.target.value
    });
  }
  render() {
    return (
      <div className="popup">
        <div className="popup_inner">
        <br></br>
          Make :
          <input
            type="text"
            name="mk"
            value={this.state.Make}
            onChange={this.handleChangeMake}
          />
          <br></br>
          Model :
          <input
            type="text"
            name="mo"
            value={this.state.Model}
            onChange={this.handleChangeModel}
          />
          <br></br>
          Year :
          <input
            type="text"
            name="year"
            value={this.state.Year}
            onChange={this.handleChangeYear}
          />
          <br></br>
          Licence Plate:
          <input
            type="text"
            name="LP"
            value={this.state.Licence_Plate}
            onChange={this.handleChangeLicencePlate}
          />
          <br></br>
          Tag # : 
          <input
            type="text"
            name="Tnum"
            value={this.state.Tag_Number}
            onChange={this.handleChangeTagNumber}
          />
<<<<<<< HEAD
              <br></br>
          Tag Status:
=======
          <br></br>
          Tag Status =
>>>>>>> c158cb792ee8bf660a26be374d33639230187c48
          <input
            type="text"
            name="Tstat"
            value={this.state.Tag_Status}
            onChange={this.handleChangeTagStatus}
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
            Submit Updates
          </button>
          <button onClick={this.props.closePopup}>Close</button>
        </div>
      </div>
    );
  }
}
