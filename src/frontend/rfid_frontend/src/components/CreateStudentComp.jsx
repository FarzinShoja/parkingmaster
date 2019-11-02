import React from "react";

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

  convertJSON2Table(jData) {
    var col = [];
    for (let x = 0; x < jData.length; x++) {
      for (let key in jData[x]) {
        if (col.indexOf(key) === -1) {
          col.push(key);
        }
      }
    }

    var table = document.createElement("table");

    var tr = table.insertRow(-1);
    for (let x = 0; x < col.length; x++) {
      var th = document.createElement("th");
      th.innerHTML = col[x];
      tr.appendChild(th);
    }

    for (let x = 0; x < jData.length; x++) {
      tr = table.insertRow(-1);

      for (let y = 0; y < col.length; y++) {
        var tabCell = tr.insertCell(-1);
        tabCell.innerHTML = jData[x][col[y]];
      }
    }

    this.setState({
      postStudent_info: table.outerHTML,
      userinput: ""
    });
  }

  render() {
    return (
      <React.Fragment>
        <h1>Create New Student</h1>
        Student ID
        <input
          type="text"
          name="SID"
          value={this.state.student_id}
          onChange={this.handleChangeStudentid}
        />
        <br></br>
        First Name
        <input
          type="text"
          name="First"
          value={this.state.Firstname}
          onChange={this.handleChangeFirstname}
        />
        <br></br>
        Last Name
        <input
          type="text"
          name="Last"
          value={this.state.Lastname}
          onChange={this.handleChangeLastname}
        />
        <br></br>
        <button
          //Check if user input is not blank
          onClick={e => {
            fetch("http://localhost:3000/createstudent/", {
              method: "POST",
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
              .then(result => {
                return result;
              })
              .then(response => {
                var ms = JSON.stringify(response);
                console.log(ms);
                alert(JSON.stringify(response.message));
              });
          }}
        >
          Post Student Info
        </button>
        <br></br>
        <br></br>
      </React.Fragment>
    );
  }
}
