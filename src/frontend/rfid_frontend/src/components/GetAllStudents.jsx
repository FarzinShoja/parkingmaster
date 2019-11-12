import React from "react";

import ReactTable from "react-table";
import "react-table/react-table.css";

import UpdateStudent from "./UpdateStudents";

export default class GetAllStudents extends React.Component {
  constructor() {
    super();
    this.state = {
      student_id: "",
      Firstname: "",
      Lastname: "",
      VehicleID: "",
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
    fetch("http://localhost:3000/students", {
      method: "GET"
    })
      .then(res => res.json())
      .then(result => {
        this.setState({
          fetchedData: result
        });
      });
  }

  // ==========================================================================================================================================
  render() {
    const data = this.state.fetchedData;

    return (
      <React.Fragment>
        <h1> Students</h1>
        <button
          id="getBtn"
          hidden={false}
          onClick={e => {
            this.loadTableData();
            document.getElementById("tableDiv").hidden = false;
            document.getElementById("closeBtn").hidden = false;
            document.getElementById("getBtn").hidden = true;
          }}
        >
          Show Student Table
        </button>
        <button
          id="closeBtn"
          hidden={true}
          onClick={e => {
            document.getElementById("tableDiv").hidden = true;
            document.getElementById("closeBtn").hidden = true;
            document.getElementById("getBtn").hidden = false;
          }}
        >
          Close Table
        </button>
        <br />
        <br />
        <div id="tableDiv" hidden={true}>
          <ReactTable
            data={data}
            columns={[
              {
                Header: "Student ID",
                accessor: "StudentID",
                filterable: true
              },
              {
                Header: "First Name",
                accessor: "FirstName",
                filterable: false
              },
              {
                Header: "Last Name",
                accessor: "LastName",
                filterable: false
              },
              {
                Header: "Vehicle ID",
                accessor: "VehicleID",
                filterable: true
              },
              {
                Header: "Actions",
                filterable: false,
                Cell: props => {
                  return (
                    <div>
                      <button
                        onClick={e => {
                          this.setState({
                            student_id: props.original.StudentID,
                            Firstname: props.original.FirstName,
                            Lastname: props.original.LastName,
                            VehicleID: props.original.VehicleID
                          });
                          this.togglePop();
                        }}
                      >
                        Update
                      </button>
                      {this.state.showPopup ? (
                        <UpdateStudent
                          sID={this.state.student_id}
                          fN={this.state.Firstname}
                          lN={this.state.Lastname}
                          vID={this.state.VehicleID}
                          closePopup={this.togglePopup.bind(this)}
                          reloadTable={this.reloadTable.bind(this)}
                        />
                      ) : null}
                      <span> </span>
                      <button
                        onClick={e => {
                          fetch(
                            "http://localhost:3000/delete/studentdata/" +
                              props.original.StudentID,
                            {
                              method: "DELETE"
                            }
                          )
                            .then(res => res.json())
                            .then(result => {
                              this.reloadTable();
                              alert(result.message);
                            });
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  );
                }
              }
            ]}
            filterable
            loadingText="Loading....."
            defaultPageSize={10}
            className="-striped -highlight"
          />
        </div>
      </React.Fragment>
    );
  }
}
