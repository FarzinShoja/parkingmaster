import React from "react";

import backendurl from "../config.js";


export default class CreateStudentComp extends React.Component {
  constructor() {
    super();
    this.state = {
      student_id: "",
      Firstname: "",
      Lastname: "",
      postStudent_info: ""
    };

    this.handleChangeStudentid = this.handleChangeStudentid.bind(this);
    this.handleChangeFirstname = this.handleChangeFirstname.bind(this);
    this.handleChangeLastname = this.handleChangeLastname.bind(this);
    this.togglePop = this.togglePopup.bind(this);
  }

  componentDidMount() {
  this.setState({
    student_id: this.props.sID,
    Firstname: this.props.fN,
    Lastname: this.props.lN,
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

render() {
    return (
      <div className="popup">
        <div className="popup_inner_S">
          <div>
            <label>First Name :</label>
            <br />
            <input
              type="text"
              name="FName"
              value={this.state.Firstname}
              onChange={this.handleChangeFirstname}
            />
            <br />
            <label>Last Name :</label>
            <br />
            <input
              type="text"
              name="LName"
              value={this.state.Lastname}
              onChange={this.handleChangeLastname}
            />
            <br />
            <br />
            <button
              id="submitBTN"
              onClick={e => {
                let v_holder = null;
                if (this.state.VehicleID !== "") {
                  v_holder = this.state.VehicleID;
                }

                fetch(backendurl.backend + "/updatestudent/", {
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
                      alert(result.message);
                      this.props.reloadTable();
                    }
                  );
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
