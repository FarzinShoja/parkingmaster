import React from "react";


import ReactTable from "react-table";
import "react-table/react-table.css";

import backendurl from "../config.js";



export default class GetLog extends React.Component {
  constructor() {
    super();
    this.state = {
      LogID: "",
      VehicleID: "",
      StudentID: "",
      Location: "",
      DateLog: "",
      TagStatus: "",
      fetchedData: [{}],
      showPopup: false
    };
    this.togglePop = this.togglePopup.bind(this);
    this.reloadTable = this.reloadTable.bind(this);
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }
  reloadTable() {
    this.setState({
      fetchedData: [{}]
    });
    this.loadTableData();
  }

  loadTableData() {
    fetch(backendurl.backend + "/datalog", {
      method: "GET"
    })
      .then(res => res.json())
      .then(result => {
        this.setState({
          fetchedData: result
        });
      });
  }

  componentDidMount() {
    this.loadTableData();
    this.interval = setInterval(() => {
      this.loadTableData();
    }, 50000);
  }

  // =============
  render() {
    const data = this.state.fetchedData;

    return(
      <React.Fragment>
        {/* <h1>Data Log</h1>
        <button
        id="getBtn_d"
        hidden={false}
        onClick={e => {
          this.loadTableData();
          document.getElementById("tableDiv_d").hidden = false;
          document.getElementById("closeBtn_d").hidden = false;
          document.getElementById("getBtn_d").hidden = true;
        }}
        >
          Show Data Log Table
        </button>
        <button
          id="closeBtn_d"
          hidden={true}
          onClick={e => {
            this.loadTableData();
            document.getElementById("tableDiv_d").hidden = true;
            document.getElementById("closeBtn_d").hidden = true;
            document.getElementById("getBtn_d").hidden = false;
          }}
          >
            Close Table
          </button>
          <br />
          <br />
          <div id="tableDiv_d" 
          hidden={true}
          > */}
          <ReactTable
            data={data}
            columns={[
              {
                Header: "Student ID",
                accessor: "StudentID",
                filterable: true,
                PivotValue: ({ value }) => (
                  <span style={{ color: "darkgreen" }}>{value}</span>
                ),
                minWidth: 100
              },
              {
                Header: "Vehicle ID",
                accessor: "VehicleID",
                filterable: true,
                minWidth: 100,
                PivotValue: ({ value }) => (
                <span style={{ color: "darkred" }}>{value}</span>
                )
              },
              {
                Header: "Location",
                accessor: "Location",
                filterable: false,
                minWidth: 100
              },
              {
                Header: "Date Log",
                accessor: "DateLog",
                filterable: false,
                minWidth: 100
              },
              {
                Header: "Tag Status",
                accessor: "TagStatus",
                filterable: false,
                minWidth: 100
              },
            ]}
            filterable
            //pivotBy={["StudentID", "VehicleID", "Location", "DateLog", "TagStatus"]}
            loadingText="Loading....."
            defaultPageSize={5}
            className="-striped -highlight"
            />
          {/* </div> */}
      </React.Fragment>
    )
  }
}
