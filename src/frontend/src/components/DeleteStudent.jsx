import React from "react";

import backendurl from "../config.js";

export default class DeleteStudent extends React.Component {
  constructor() {
    super();
    this.state = {
      student_id: ""
    };

    this.handleChangeStudentid = this.handleChangeStudentid.bind(this);
  }

  handleChangeStudentid(event) {
    this.setState({
      student_id: event.target.value
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
            fetch(
              backendurl.backend + "/delete/studentdata/" +
                this.state.student_id,
              {
                method: "DELETE"
              }
            )
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
