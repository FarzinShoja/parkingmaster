import React from "react";

export default class CreateStudentComp extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>Student</h1>
        Student ID <input type="text" name="SID" />
        <br></br>
        First Name <input type="text" name="First" />
        <br></br>
        Last Name <input type="text" name="Last" />
        <br></br>
        <button
          onClick={e => {
            e.preventDefault();
            this.clicked();
          }}
        >
          {" "}
          Send
        </button>
      </React.Fragment>
    );
  }
}
