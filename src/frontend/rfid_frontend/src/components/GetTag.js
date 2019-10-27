/*Created By: Austin Lomax
This code allows for the user to enter their information
*/
import React, { Component } from "react";

class GetTag extends Component {
  constructor() {
    super();
    this.state = {
      getAll_data1: ""
    };
  }

  // ==================================== This will create a table based on JSON response change the STATE of the div ===================
  convertJSON2Table4data1(jData) {
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
      getAll_data1: table.outerHTML
    });
  }

  // ==========================================================================================================================================

  clicked() {
    console.log("Info has been sent");
  }
  clicked1() {
    console.log("Button has be clicked");
  }
  render() {
    return (
      <React.Fragment>
        <h1>Get All Vehicles</h1>
        <button
          onClick={e => {
            fetch("http://localhost:3000/Vehicles", {
              method: "GET"
            })
              .then(res => res.json())
              .then(result => {
                this.convertJSON2Table4data1(result);
              });
          }}
        >
          GET ALL
        </button>
        <br />
        <br />
        <div
          className="data1"
          dangerouslySetInnerHTML={{ __html: this.state.getAll_data1 }}
        ></div>

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
