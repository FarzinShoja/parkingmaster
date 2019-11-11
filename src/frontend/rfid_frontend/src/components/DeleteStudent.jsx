import React from "react";

export default class DeleteStudent extends React.Component {
  constructor() {
    super();
    this.state = {
      student_id: "",
      DeleteStudent_info: ""
    };

    this.handleChangeStudentid = this.handleChangeStudentid.bind(this);
  }

  handleChangeStudentid(event) {
    this.setState({
      student_id: event.target.value
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
      DeleteStudent_info: table.innerHTML,
      userinput: ""
    });
  }

  render() {
    return (
      <React.Fragment>
        <h1>Delete Student</h1>
        Student ID:
        <input
          type="text"
          name="SID"
          value={this.state.student_id}
          onChange={this.handleChangeStudentid}
        />
        <br />
        <button
          //Check if user input is not blank
          onClick={e => {
            fetch("http://localhost:3000/delete/studentdata/:StudentID", {
              method: "DELETE",
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
          Delete Student
        </button>
        <br></br>
        <br></br>
      </React.Fragment>
    );
  }
}
