/*Created By: Austin Lomax
This code allows for the user to enter their information
*/
import React, { Component } from "react";

class GetTag extends Component {
  clicked() {
    console.log("Info has been sent");
  }
  clicked1() {
    console.log("Button has be clicked");
  }
  render() {
    return (
      <React.Fragment>
        <hr></hr>
        <div>
          <h1>Tags</h1>
          <form>
            <label>
              Tag ID:
              <input type="text" name="tagid" />
            </label>
          </form>
          <button
            onClick={e => {
              e.preventDefault();
              this.clicked();
            }}
          >
            {" "}
            Send
          </button>
        </div>
        <hr></hr>
        <div>
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
          <hr></hr>
          <h1>Vehicle</h1>
          Student ID <input type="text" name="SID" />
          <br></br>
          Make <input type="text" name="mk" />
          <br></br>
          Model <input type="text" name="mo" />
          <br></br>
          Year <input type="text" name="yewar" />
          <br></br>
          Licence Plate <input type="text" name="LP" />
          <br></br>
          Tag # <input type="text" name="Tnum" />
          <br></br>
          Tag Status <input type="text" name="Status" />
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
        </div>
      </React.Fragment>
    );
  }
}

export default GetTag;
