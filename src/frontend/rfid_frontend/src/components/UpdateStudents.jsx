import React from "react";

export default class UpdateStudent extends React.Component {
  constructor() {
    super();
    this.state = {
      student_id: "",
      Firstname: "",
      Lastname: "",
      showPopup: false
    };

    this.handleChangeStudentid = this.handleChangeStudentid.bind(this);
    this.handleChangeFirstname = this.handleChangeFirstname.bind(this);
    this.handleChangeLastname = this.handleChangeLastname.bind(this);
    this.togglePop = this.togglePopup.bind(this);
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  handleChangeStudentid(event) {
    this.setState({
      student_id: event.target.value
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
      <React.Fragment>
        <h1>Update Student</h1>
        Enter Student ID:
        <input
          type="text"
          name="SID"
          value={this.state.student_id}
          onChange={this.handleChangeStudentid}
        />
        <br></br>
        <button
          //Check if user input is not blank
          onClick={e => {
            if (this.state.student_id !== "") {
              fetch("http://localhost:3000/students/" + this.state.student_id, {
                method: "GET"
              })
                .then(res => res.json())
                .then(result => {
                  console.log(result);
                  if(result.errorCode === 404){
                    alert("use right student id foll");
                    console.log("HELLO AUSTIN!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
                  } else {
                    this.setState({
                      Firstname: JSON.stringify(result[0].FirstName),
                      Lastname: JSON.stringify(result[0].LastName)
                    });
                    this.togglePop();
                }
                })
                // .catch(error => alert("HJJJJ" + error));
            } else {
              alert("Enter a student ID");
            }
          }}
        >
          Update
        </button>
        {this.state.showPopup ? (
          <Popup
            sID={this.state.student_id}
            fN={this.state.Firstname}
            lN={this.state.Lastname}
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
      student_id: "",
      Firstname: "",
      Lastname: ""
    };

    this.handleChangeFirstname = this.handleChangeFirstname.bind(this);
    this.handleChangeLastname = this.handleChangeLastname.bind(this);
  }

  componentDidMount() {
    this.setState({
      student_id: this.props.sID.replace(/['"]+/g, ""),
      Firstname: this.props.fN.replace(/['"]+/g, ""),
      Lastname: this.props.lN.replace(/['"]+/g, "")
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
          <br />
          <button
            onClick={e => {
              fetch("http://localhost:3000/updatestudent/", {
                method: "PUT",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  StudentID: this.state.student_id,
                  FirstName: this.state.Firstname,
                  LastName: this.state.Lastname
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
