import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Form } from "reactstrap";
import { Field } from "redux-form";

import RenderField from "components/RenderField";
import SubmitButtons from "components/SubmitButton";
import "./Login.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const required = value => (value ? undefined : "Can't Leave this field Blank");
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;

class VerifyAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
      backdrop: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: false
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="col-12 verify-account mt-3">
        {this.props.userRegistrationDetail.status == "success" && (
          <Modal
            isOpen={this.state.modal}
            modalTransition={{ timeout: 700 }}
            backdropTransition={{ timeout: 1300 }}
            toggle={this.toggle}
            className={`selected-store-modal modal-dialog-center ${this.props.className}`}
            backdrop={this.state.backdrop}
          >
            <ModalHeader>
              <h5>THANKS FOR YOUR REGISTRATION</h5>
            </ModalHeader>
            <ModalBody>
              <div className="col-12 d-flex">
                <p>WE HAVE SENT AN ACTIVATION CODE TO YOUR EMAIL</p>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={this.toggle}
                color=" "
                className="theme-btn big-btn col-12"
              >
                OK
              </Button>
            </ModalFooter>
          </Modal>
        )}
        <Row>
          <div className="col-12 login-box">
            <h4 className="item-title text-center col-12">
              <span>PLEASE ENTER YOUR EMAIL AND ACTIVATION CODE</span>
            </h4>
            <Form className="mt-2" onSubmit={handleSubmit}>
              <div className="col-12 py-3 px-0">
                <Row>
                  <Col className="text-center col-12">
                    <Field
                      name="Email"
                      className="form-control mb-0"
                      type="email"
                      component={RenderField}
                      label="Email"
                      validate={[required, email]}
                    />
                  </Col>
                  <Col className="text-center col-12 password-box">
                    <Field
                      name="ActivationCode"
                      className="form-control mb-0"
                      type="password"
                      component={RenderField}
                      label="ActivationCode"
                      validate={required}
                    />
                  </Col>
                </Row>
              </div>
              <div
                onClick={this.props.handleModal}
                className="col-12 text-center text-uppercase px-4 mt-2"
              >
                <SubmitButtons
                  submitLabel="VERIFY ACCOUNT"
                  className="theme-btn col-12 text-center my-1 px-4 text-uppercase"
                  submitting={this.props.submitting}
                />
              </div>
            </Form>
          </div>
        </Row>
      </div>
    );
  }
}

VerifyAccount.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool
};

export default VerifyAccount;
