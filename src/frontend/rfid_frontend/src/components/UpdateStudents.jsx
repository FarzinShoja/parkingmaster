import React from "react";

export default class UpdateStudent extends React.Component {
  constructor() {
    super();
    this.state = {
      student_id: "",
      Firstname: "",
      Lastname: "",
      VehicleID: ""
    };

    this.handleChangeFirstname = this.handleChangeFirstname.bind(this);
    this.handleChangeLastname = this.handleChangeLastname.bind(this);
    this.handleChangeVehicleID = this.handleChangeVehicleID.bind(this);
    this.togglePop = this.togglePopup.bind(this);
  }

  componentDidMount() {
    let vID_Holder = "";
    if (this.props.vID !== null) {
      vID_Holder = this.props.vID;
    } else {
      vID_Holder = "";
    }

    this.setState({
      student_id: this.props.sID,
      Firstname: this.props.fN,
      Lastname: this.props.lN,
      VehicleID: vID_Holder
    });
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  handleChangeFirstname(event) {
    this.setState({
      Firstname: event.target.value
    });
  }

  handleChangeLastname(event) {
    this.setState({
      Lastname: event.target.value
    });
  }

  handleChangeVehicleID(event) {
    this.setState({
      VehicleID: event.target.value
    });
  }

  render() {
    return (
      <div className="popup">
        <div className="popup_inner">
          First Name =
          <input
            type="text"
            name="FName"
            value={this.state.Firstname}
            onChange={this.handleChangeFirstname}
          />
          <br />
          Last Name =
          <input
            type="text"
            name="LName"
            value={this.state.Lastname}
            onChange={this.handleChangeLastname}
          />
          Vehicle ID =
          <input
            type="text"
            name="Vid"
            value={this.state.VehicleID}
            onChange={this.handleChangeVehicleID}
          />
          <br />
          <button
            onClick={e => {
              let v_holder = null;
              if (this.state.VehicleID !== "") {
                v_holder = this.state.VehicleID;
              }

              fetch("http://localhost:3000/updatestudent/", {
                method: "PUT",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  StudentID: this.state.student_id,
                  FirstName: this.state.Firstname,
                  LastName: this.state.Lastname,
                  VehicleID: v_holder
                })
              })
                .then(res => res.json())
                .then(result => {
                  if (result.sqlError.errno === 1062) {
                    alert(
                      "That Vehicle ID  is USED by another... try another Vehicle ID."
                    );
                  } else if (result.sqlError.errno === 1452) {
                    alert(
                      "That Vehicle ID does NOT EXIST try another Vehicle ID."
                    );
                  } else {
                    alert(result.message);
                    this.props.reloadTable();
                  }
                });
              this.props.closePopup();
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
