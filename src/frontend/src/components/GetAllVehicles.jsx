import React from "react";

//Icon
import PostAddIcon from '@material-ui/icons/PostAdd';
import UpdateIcon from '@material-ui/icons/Update';
import DeleteIcon from '@material-ui/icons/Delete';


import ReactTable from "react-table";
import "react-table/react-table.css";

import UpdateVehicle from "./UpdateVehicle";
import backendurl from "../config.js";


export default class GetAllVehicles extends React.Component {
  constructor() {
    super();
    this.state = {
      Vehicle_id: "",
      student_id: "",
      Make: "",
      Model: "",
      Year: "",
      LicencePlate: "",
      TagNum: "",
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
    fetch(backendurl.backend + "/Vehicles", {
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

    return (
      <React.Fragment>
        {/* <h1> Vehicles</h1>
        <button
          id="getBtn_v"
          hidden={false}
          onClick={e => {
            this.loadTableData();
            document.getElementById("tableDiv_v").hidden = false;
            document.getElementById("closeBtn_v").hidden = false;
            document.getElementById("getBtn_v").hidden = true;
          }}
        >
          Show Vehicle Table
        </button>
        <button
          id="closeBtn_v"
          hidden={true}
          onClick={e => {
            this.loadTableData();
            document.getElementById("tableDiv_v").hidden = true;
            document.getElementById("closeBtn_v").hidden = true;
            document.getElementById("getBtn_v").hidden = false;
          }}
        >
          Close Table
        </button>
        <br />
        <br />
        <div id="tableDiv_v" hidden={true}> */}
          <ReactTable
            data={data}
            columns={[
              {
                Header: "Vehicle ID",
                accessor: "VehicleID",
                filterable: true,
                minWidth: 100
              },
              {
                Header: "Student ID",
                accessor: "StudentID",
                filterable: true,
                minWidth: 100
              },
              {
                Header: "Make",
                accessor: "Make",
                filterable: false,
                minWidth: 100
              },
              {
                Header: "Model",
                accessor: "Model",
                filterable: false,
                minWidth: 100
              },
              {
                Header: "Year",
                accessor: "Year",
                filterable: false,
                minWidth: 100
              },
              {
                Header: "Licence Plate",
                accessor: "LicencePlate",
                filterable: false
              },
              {
                Header: "Tag Number",
                accessor: "TagNum",
                filterable: false,
                minWidth: 250
              },
              {
                Header: "Tag Status",
                accessor: "TagStatus",
                filterable: false,
                maxWidth: 100
              },
              {
                Header: <div>  Actions <span /> <PostAddIcon 
                fontSize="large" 
                color="inherit" 
                onClick={e => {
                  this.togglePop();
                  alert("hello");
                }} /></div>,
                filterable: false,
                Cell: props => {
                  return (
                    <div>
                    <UpdateIcon 
                    fontSize="large" 
                    color= "inherit"
                        onClick={e => {
                          this.setState({
                            Vehicle_id: props.original.VehicleID,
                            student_id: props.original.StudentID,
                            Make: props.original.Make,
                            Model: props.original.Model,
                            Year: props.original.Year,
                            LicencePlate: props.original.LicencePlate,
                            TagNum: props.original.TagNum,
                            TagStatus: props.original.TagStatus
                          });
                          this.togglePop();
                        }}
                      />
                      {this.state.showPopup ? (
                        <UpdateVehicle
                          vID={this.state.Vehicle_id}
                          sID={this.state.student_id}
                          mK={this.state.Make}
                          mO={this.state.Model}
                          yR={this.state.Year}
                          lP={this.state.LicencePlate}
                          tN={this.state.TagNum}
                          tS={this.state.TagStatus}
                          closePopup={this.togglePopup.bind(this)}
                          reloadTable={this.reloadTable.bind(this)}
                        />
                      ) : null}
                      <span> </span>
                      <DeleteIcon
                      fontSize="large" 
                      color="error" 
                        onClick={e => {
                          fetch(
                            backendurl.backend + "/delete/vehicledata/" +
                              props.original.VehicleID,
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
                        />
                    </div>
                  );
                }
              }
            ]}
            filterable
            loadingText="Loading....."
            defaultPageSize={7}
            className="-striped -highlight"
          />
        {/* </div> */}
      </React.Fragment>
    );
  }
}
