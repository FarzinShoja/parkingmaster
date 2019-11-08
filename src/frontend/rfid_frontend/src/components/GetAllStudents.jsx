import React from "react";

export default class GetAllStudents extends React.Component {
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
  render() {
    return (
      <React.Fragment>
        <h1> Get All Students</h1>
        <button
          onClick={e => {
            fetch("http://localhost:3000/students", {
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
      </React.Fragment>
    );
  }
}
