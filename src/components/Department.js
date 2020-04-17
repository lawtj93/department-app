import React, { Component } from "react";
import { Table, Button, ButtonToolbar } from "react-bootstrap";
import AddDepModal from "./AddDepModal";
import EditDepModal from "./EditDepModal";

export default class Department extends Component {
  constructor(props) {
    super(props);
    this.state = { deps: [], addModalShow: false, editModalShow: false };
  }

  componentDidMount() {
    console.log("componentDidMount refresing list");
    this.refreshList();
  }

  userAddedEditedDepartment = (z) => {
    console.log("userAddedEditedDepartment refresing list");
    this.refreshList();
    this.setState({ addModalShow: false, editModalShow: false });
  };

  deleteDep(depId) {
    if (window.confirm("Are you sure?")) {
      fetch("https://localhost:44351/api/department/" + depId, {
        method: "DELETE",
        header: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then(() => this.refreshList())
      ;
    }
  }

  refreshList() {
    fetch("https://localhost:44351/api/department")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ deps: data });
      });
  }

  render() {
    const { deps, depid, depname } = this.state;
    let addModalClose = () => this.setState({ addModalShow: false });
    let editModalClose = () => this.setState({ editModalShow: false });
    return (
      <div>
        <Table className="mt-4" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>DepartmentID</th>
              <th>DepartmentName</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {deps.map((dep) => (
              <tr key={dep.DepartmentID}>
                <td>{dep.DepartmentID}</td>
                <td>{dep.DepartmentName}</td>
                <td>
                  <ButtonToolbar>
                    <Button
                      className="mr-2"
                      variant="info"
                      onClick={() =>
                        this.setState({
                          editModalShow: true,
                          depid: dep.DepartmentID,
                          depname: dep.DepartmentName,
                        })
                      }
                    >
                      Edit
                    </Button>

                    <Button
                      className="mr-2"
                      onClick={() => this.deleteDep(dep.DepartmentID)}
                      variant="danger"
                    >Delete</Button>

                    <EditDepModal
                      show={this.state.editModalShow}
                      onHide={editModalClose}
                      depid={depid}
                      depname={depname}
                      usrEditedDepartment={this.userAddedEditedDepartment}
                    />
                  </ButtonToolbar>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <ButtonToolbar>
          <Button
            variant="primary"
            onClick={() => this.setState({ addModalShow: true })}
          >
            Add Department
          </Button>

          <AddDepModal
            show={this.state.addModalShow}
            onHide={addModalClose}
            usrAddedDepartment={this.userAddedEditedDepartment}
          />
        </ButtonToolbar>
      </div>
    );
  }
}
