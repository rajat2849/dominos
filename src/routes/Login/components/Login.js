import React from "react";
import PropTypes from "prop-types";
import LoginForm from "./LoginForm";
import { Row, Col } from "reactstrap";
import validate from "./Validation";
import NewHeader from "../../../../src/components/NewHeader";
import FacebookLogin from "react-facebook-login";
import { Link } from "react-router";
import { Url } from "config/Config";
import AlreadyExist from "./AlreadyExist";
import GoogleForm from "./GoogleLogin"
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from "reactstrap";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true,
      error: {},
      userFbDetails: {},
      modal: true,
      backdrop: false,
      showModal: false
    };

    // branch.logEvent("Login Screen", function(err) {
    //   console.log(err);
    // });

    this.saveLoginDetail = this.saveLoginDetail.bind(this);
    this.showFacebookRegisterForm = this.showFacebookRegisterForm.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);
    this.contactNumberType = this.contactNumberType.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleModal = this.handleModal.bind(this);
  }

  saveLoginDetail(values) {
    this.props.loggedIn(values);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      modal: true
    });
  }
  componentDidMount() {
    this.props.loadingImage(true);
  }
  showFacebookRegisterForm() {
    this.props.facebookForm();
  }
  toggle() {
    this.setState({
      modal: false
    });
  }

  responseFacebook(response) {
    let fullName = response.name.split(" ");
    fullName.map((name, index) => {
      if (index === 0) {
        response.firstname = name;
      } else {
        response.lastname = name;
      }
    });
    let data = {
      Email: response.email,
      Firstname: response.firstname,
      Lastname: response.lastname
    };
    this.setState({ userFbDetails: response });
    this.props.initialize(data);
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
    const { showRegisterForm, showVerifyForm } = this.props;
    return (
      <div className="container">
        {this.state.showModal &&
          !this.props.verifying &&
          this.props.fetching === false &&
          this.props.alertMessage == "Invalid login or password." && (
            <AlreadyExist
              handleModal={this.handleModal}
              setAlertMeassage={this.props.setAlertMeassage}
              header="Sorry"
              message="Invalid email or Password"
            />
          )}
        {this.state.showModal &&
          this.props.forgotAlert === false &&
          this.props.forgotMessage === "Invalid email" && (
            <AlreadyExist
              handleModal={this.handleModal}
              setAlertMeassage={this.props.setAlertMeassage}
              header="Sorry"
              message="Invalid Email ID"
            />
          )}
        {this.state.showModal &&
          this.props.forgotAlert === true &&
          this.props.alertMessage.includes("An email sent to") && (
            <AlreadyExist
              handleModal={this.handleModal}
              setAlertMeassage={this.props.setAlertMeassage}
              header="Success"
              message="Recovery Email has been sent"
            />
          )}
        <Row>
          <NewHeader
            page={this.props.showRegisterForm === true ? "Sign up" : "Login"}
          />
          {this.props.showFacebookForm && <FacebookForm />}
          <Row className="col-12 px-0 mx-0">
            <LoginForm
              {...this.props}
              handleSubmit={this.props.handleSubmit(this.saveLoginDetail)}
              handleModal={this.handleModal}
            />
            <Col className="regiter-btn-group col-12 text-center f-14">
              <span className="text-black-50">
                {this.context.t("Do not have an account?")}{" "}
              </span>
              <Link to={Url.DASHBOARD}></Link>
              <Link to={Url.REGISTER_PAGE}>{this.context.t("Sign Up")}</Link>
            </Col>
         {/*   <Col>
               <div className="text-center m-5">
                <GoogleForm loggedIn={this.props.loggedIn}/>
              </div>
            
            </Col>*/}
          </Row>
        </Row>
      </div>
    );
  }
}

Login.propTypes = {};

Login.contextTypes = {
  t: PropTypes.func.isRequired
};

Login.childContextTypes = {
  t: PropTypes.func.isRequired
};

export default Login;
