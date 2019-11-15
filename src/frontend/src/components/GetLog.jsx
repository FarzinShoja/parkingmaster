import React from "react";

import backendurl from "../config.js";



export default class GetLog extends React.Component {
  constructor() {
    super();
    this.state = {
      getlog_data: ""
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
      getlog_data: table.outerHTML
    });
  }

  // ==========================================================================================================================================
  render() {
    return (
      <React.Fragment>
        <h1> Get Log Data</h1>
        <button
          onClick={e => {
            fetch(backendurl.backend + "/datalog", {
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
          dangerouslySetInnerHTML={{ __html: this.state.getlog_data }}
        ></div>
      </React.Fragment>
    );
  }
}
