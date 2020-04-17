import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";

export default class EditDepModal extends Component {
  constructor(props) {
    super(props);
    this.state = { snackbaropen: false, snackbbarmsg: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  snackbarClose = (event) => {
    console.log(event);
    console.log("snacbkbar close");
    this.setState({ snackbaropen: false });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://localhost:44351/api/department", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        DepartmentID: e.target.DepartmentID.value,
        DepartmentName: e.target.DepartmentName.value,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({ snackbaropen: true, snackbbarmsg: res });
        const { usrEditedDepartment } = this.props;
        usrEditedDepartment();
      })
      .catch((err) => {
        this.setState({ snackbaropen: true, snackbbarmsg: err });
      });
  };

  render() {
    return (
      <div className="container">
        <Snackbar
          open={this.state.snackbaropen}
          autoHideDuration={3000}
          onClose={this.snackbarClose}
          message={this.state.snackbbarmsg}
          action={[
            <IconButton
              key="close"
              arial-label="Close"
              color="inherit"
              onClick={this.snackbarClose}
            >
              X
            </IconButton>,
          ]}
        />
        <Modal
          show={this.props.show}
          onHide={this.props.onHide}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Edit Department
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="DepartmentID">
                    <Form.Label>DepartmentID</Form.Label>
                    <Form.Control
                      type="text"
                      name="DepartmentID"
                      required
                      disabled
                      defaultValue={this.props.depid}
                      placeholder="DepartmentID"
                    />
                  </Form.Group>
                  <Form.Group controlId="DepartmentName">
                    <Form.Label>DepartmentName</Form.Label>
                    <Form.Control
                      type="text"
                      name="DepartmentName"
                      defaultValue={this.props.depname}
                      required
                      placeholder="DepartmentName"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Button variant="primary" type="submit">
                      Update department
                    </Button>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.props.onHide}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
