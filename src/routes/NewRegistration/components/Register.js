import React from "react";
import PropTypes from "prop-types";
import RegisterForm from "./RegisterForm";
import { Row, Col } from "reactstrap";
import { Link } from "react-router";
import { Url } from "config/Config";
import NewHeader from "../../../../src/components/NewHeader";
import validate from "./Validation";
import AlreadyExist from "./AlreadyExist";
import { removeLocalStorage } from "../../../components/Helpers";


class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true,
      error: {},
      modal: true,
      backdrop: false,
      showModal: false
    };

    // branch.logEvent("User Registeration Page", function(err) {
    //   console.log(err);
    // });

    this.showRegisterForm = this.showRegisterForm.bind(this);
    this.register = this.register.bind(this);
    this.contactNumberType = this.contactNumberType.bind(this);
    this.handleModal = this.handleModal.bind(this);
  }

  componentWillUnmount() {
    this.props.resetRegisterForm();
    removeLocalStorage("recaptcha");
  }

  register(values) {
    if (
      Object.keys(validate(values)).length === 0 &&
      validate(values).constructor === Object
    ) {
      this.props.userRegistration(values);
    } else {
      this.setState({
        error: validate(values)
      });
    }
  }

  showRegisterForm() {
    this.props.registerForm();
  }

  handleModal() {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  contactNumberType(contactType) {
    this.props.setContactType(contactType);
  }

  handleAlertBox() {
    this.props.resetAlertBox(false, "");
  }

  render() {
    const { showRegisterForm } = this.props;
    return (
      <div className="container">
        {this.state.showModal &&
          this.props.alertMessage === "This customer email already exists" && (
            <AlreadyExist
              handleModal={this.handleModal}
              header="Sorry"
              message="This customer email already exists"
            />
          )}

        {this.state.showModal && this.props.alertMessage === "User Created" && (
          <AlreadyExist
            mail={this.props.mail}
            userRegistrationDetail={this.props.userRegistrationDetail}
            verifyPage={true}
            handleModal={this.handleModal}
            header="THANKS FOR YOUR REGISTRATION"
            message="WE HAVE SENT AN ACTIVATION CODE TO YOUR EMAIL"
          />
        )}
        <Row>
          <NewHeader page="Sign up" />
          <Row className="mx-0 mb-5">
            <Col sm={12}>
              <RegisterForm
                {...this.props}
                handleSubmit={this.props.handleSubmit(this.register)}
                contactType={this.props.contactType}
                contactNumberType={this.contactNumberType}
                showRegisterForm={this.props.showRegisterForm}
                handleModal={this.handleModal}
                recaptcha={this.props.recaptcha}
              />
           
            </Col>
            <Col className="login-btn-group col-12 text-center f-14">
              <span className="text-black-50">
                {this.context.t("Already have an account ?")}{" "}
              </span>
              <Link to={Url.LOGIN_PAGE} className="theme-text text-uppercase">
                {this.context.t("Log in")}
              </Link>
            </Col>
          </Row>
        </Row>
      </div>
    );
  }
}

Register.contextTypes = {
  t: PropTypes.func.isRequired
};

Register.childContextTypes = {
  t: PropTypes.func.isRequired
};

export default Register;
