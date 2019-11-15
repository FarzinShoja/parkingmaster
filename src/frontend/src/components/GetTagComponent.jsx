/*Created By: Austin Lomax
This code allows for the user to enter their information
*/
import React, { Component } from "react";

import backendurl from "../config.js";


class GetTag extends Component {
  constructor() {
    super();
    this.state = {
      userinput: "",
      getTagbynum_data: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      userinput: event.target.value
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
      getTagbynum_data: table.outerHTML,
      userinput: ""
    });
  }

  render() {
    return (
      <React.Fragment>
        <h1>Get Log Data by Tag #</h1>
          <label>
            Tag Num:
            <input
              type="text"
              value={this.state.userinput}
              onChange={this.handleChange}
            />
          </label>
        <span>     </span>
        <button
          onClick={e => {
            fetch(
              "https://" + backendurl.backend + "/Vehicles/ByTagNum/" + this.state.userinput,
              {
                method: "GET"
              }
            )
              .then(res => res.json())
              .then(result => {
                if (result.length === 1) {
                  this.convertJSON2Table(result);
                } else {
                  this.setState({
                    getTagbynum_data:
                      "This tag number: " +
                      this.state.userinput +
                      " does not exist in the database",

                    userinput: ""
                  });
                }
              });
          }}
        >
          Get Tag Num
        </button>
        <br></br>
        <br></br>
        <div
          className="dataholder"
          dangerouslySetInnerHTML={{ __html: this.state.getTagbynum_data }}
        ></div>
      </React.Fragment>
    );
  }
}

export default GetTag;
