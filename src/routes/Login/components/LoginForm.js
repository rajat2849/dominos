import React from "react";
import { Field, reduxForm } from "redux-form";
import { Button, Label, Row, Col, Modal } from "reactstrap";
import { Link } from "react-router/lib";
import ForgotPasswordActivation from "./ForgotPasswordActivation";
import "./Login.scss";
import RenderField from "../../../components/RenderField";
import AlreadyExist from "./AlreadyExist";
import PropTypes from "prop-types";
import Captha from "./Recaptcha.js";

export class ForgotPassword extends React.Component {
  render() {
    return (
      <Col className="col-12 text-right mb-3 forgot-wrapper">
        <Link to="" className="theme-text f-14" onClick={this.props.toggle}>
          {this.context.t("Forgot Password ?")}
        </Link>
        <Modal
          isOpen={this.props.modal}
          fade={false}
          toggle={this.props.toggle}
          className={this.props.className}
          id="forgot-modal"
          backdrop={false}
        >
          <ForgotPasswordActivation
            userForgotPassword={this.props.userForgotPassword}
            toggle={this.props.toggle}
            loadingImage={this.props.loadingImage}
            handleModal={this.props.handleModal}
            {...this.props}
          />
        </Modal>
      </Col>
    );
  }
}

export class SubmitButton extends React.Component {
  render() {
    return (
      <Col sm={12} className="mt-5 mb-3 text-center">
        <button
          onClick={this.props.handleModal}
          className="theme-btn big-btn"
          type="submit"
          label="submit"
          disabled={this.props.disabled}
        >
          {this.context.t("Log in")}
        </button>
      </Col>
    );
  }
}

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      activeTab: props.page === "register" && "1"
    };
    this.toggle = this.toggle.bind(this);
  }

  componentWillMount() {
    this.props.Recaptcha(false);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form className="pt-5 col-12" onSubmit={handleSubmit}>
        <Row className="mx-2">
          <Col sm={12}>
            <div className="md-form">
              <Field
                name="Email"
                component={RenderField}
                type="text"
                className="form-control"
                placeholder="Enter Email"
              />
            </div>
            <div className="md-form mb-2">
              <Field
                name="Password"
                component={RenderField}
                type="password"
                className="form-control"
                placeholder="Enter Password"
              />
            </div>
            <ForgotPassword
              {...this.props}
              toggle={this.toggle}
              modal={this.state.modal}
            />
          {/*  <div className="mr-2">
              <Captha {...this.props} />
            </div>*/}
            <SubmitButton
              handleModal={this.props.handleModal}
              //disabled={this.props.recaptcha ? false : true}
            />
          </Col>
        </Row>
      </form>
    );
  }
}

LoginForm = reduxForm({
  form: "login"
})(LoginForm);

LoginForm.contextTypes = {
  t: PropTypes.func.isRequired
};
ForgotPassword.contextTypes = {
  t: PropTypes.func.isRequired
};

SubmitButton.contextTypes = {
  t: PropTypes.func.isRequired
};

export default LoginForm;
