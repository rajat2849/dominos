import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Form } from "reactstrap";

import { Field } from "redux-form";

import RenderField from "components/RenderField";
import SubmitButtons from "components/SubmitButton";
import VerificationAlert from "./VerificationAlert";
import NewHeader from "../../../../src/components/NewHeader";
import "../../../styles/main.scss";
import {browserHistory} from 'react-router';
import {Url} from 'config/Config';
import {
  saveLocalStorage,
  saveSessionStorage,
  getLocalStorage
} from "components/Helpers";

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
      backdrop: false,
      showModal: false,
      resendModal: false
    };

    // branch.logEvent("User verification", function(err) {
    //   console.log(err);
    // });

    this.toggle = this.toggle.bind(this);
    this.verifyAccount = this.verifyAccount.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.resendCode = this.resendCode.bind(this);
    this.newModal = this.newModal.bind(this);
  }

  toggle() {
    this.setState({
      modal: false
    });
  }

  componentWillUnmount() {
    this.props.resetVerifyForm();
  }

  resendCode() {
    this.newModal();
    if (typeof this.props.location.state.mail !== "undefined") {
      let mail = this.props.location.state.mail;
      this.props.resendActivationCode(mail);
    }
  }

  verifyAccount(values) {
    this.props.accountVerification(values);
   
  }

  handleModal() {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  newModal() {
    this.setState({
      resendModal: !this.state.resendModal
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="col-12 verify-account mt-3">
        {this.state.showModal &&
          this.props.fetching === false &&
          !this.props.verifying &&
          this.props.alertMessage === "Invalid activation code" && (
            <VerificationAlert
              setAlertMeassage={this.props.setAlertMeassage}
              handleModal={this.handleModal}
              header="Sorry"
              message="Invalid Activation Code"
              alertMessage={this.props.alertMessage}
            />
          )}

        {this.state.showModal &&
          this.props.fetching === false &&
          !this.props.verifying &&
          this.props.alertMessage === "Email not exist" && (
            <VerificationAlert
              setAlertMeassage={this.props.setAlertMeassage}
              handleModal={this.handleModal}
              header="Sorry"
              message="Email not exist"
              alertMessage={this.props.alertMessage}
            />
          )}

        {this.state.showModal &&
          this.props.fetching === false &&
          !this.props.verifying &&
          this.props.alertMessage === "Activation success" && (
            <VerificationAlert
              setAlertMeassage={this.props.setAlertMeassage}
              activationSuccess={true}
              handleModal={this.handleModal}
              header="Success"
              message="Activation Successful"
              {...this.props}
            />
          )}

        {this.state.resendModal &&
          !this.props.verifying &&
          this.props.fetching === false &&
          this.props.alertMessage.includes(
            "Confirmation mail has been resent to"
          ) && (
            <VerificationAlert
              setAlertMeassage={this.props.setAlertMeassage}
              handleModal={this.newModal}
              header="Success"
              message="Confirmation mail has been resent"
            />
          )}

        {this.state.showModal &&
          !this.props.verifying &&
          this.props.fetching === false &&
          this.props.alertMessage ===
            "Undefined email in request parameter" && (
            <VerificationAlert
              setAlertMeassage={this.props.setAlertMeassage}
              handleModal={this.handleModal}
              header="Sorry"
              message="Undefined Email"
            />
          )}
        <Row>
          <NewHeader page={this.context.t("Verify Account")} />
          <div className="col-12 login-box mt-5">
            <h2 className="item-title text-center col-12">
              {this.context.t("PLEASE ENTER YOUR EMAIL AND ACTIVATION CODE")}
            </h2>
            <Form
              className="mt-2"
              onSubmit={this.props.handleSubmit(this.verifyAccount)}
            >
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
                      placeholder="Enter Email"
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
                      placeholder="Enter Activation Code"
                    />
                  </Col>
                </Row>
              </div>
              <div
                onClick={this.handleModal}
                className="col-12 text-center text-uppercase px-4 mt-2"
              >
                <SubmitButtons
                  submitLabel={this.context.t("VERIFY ACCOUNT")}
                  className="theme-btn col-12 text-center my-1 px-4 text-uppercase verifyButton"
                  submitting={this.props.submitting}
                />
                <Row>
                  <Col className="col-12 mb-2 mt-3 text-center">
                    <a className="theme-text f-14" onClick={this.resendCode}>
                      {this.context.t("RESEND ACTIVATION CODE")}
                    </a>
                  </Col>
                </Row>
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

VerifyAccount.contextTypes = {
  t: PropTypes.func.isRequired
};

export default VerifyAccount;
