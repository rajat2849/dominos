import React from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import { Row, Col, Form } from "reactstrap";
import { Field } from "redux-form";
import mailIcon from "../../../../public/newimages/email-icon.png";
import passwordIcon from "../../../../public/newimages/password-icon.png";
import { getLocalStorage } from "components/Helpers";
import PasswordAlert from "./PasswordAlert";
import "./LogInInfo.scss";

const RenderTextField = props => {
  const {
    input,
    label,
    meta: { touched, invalid, error },
    ...custom
  } = props;

  return (
    <TextField
      label={label}
      placeholder={label}
      error={touched && invalid}
      helperText={touched && error}
      {...input}
      {...custom}
    />
  );
};

const required = value =>
  value || typeof value === "number" ? undefined : "Required";

class LogInInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Oldpassword: "",
      Password: "",
      Confirmpassword: "",
      showModal: false,
      msg: "",
      showWrongPassword: false
    };
    this.Styles = this.Styles.bind(this);
    this.SendData = this.SendData.bind(this);
    this.SetData = this.SetData.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.resetData = this.resetData.bind(this);
  }

  Styles() {
    return useStyles();
  }

  SendData(e) {
    e.preventDefault();
    const id = getLocalStorage("receivedLoginDetail");

    const details = {
      customer_id: id.customer_id,
      Oldpassword: this.state.Oldpassword,
      Password: this.state.Password,
      Confirmpassword: this.state.Confirmpassword
    };

    this.handleModal();

    if (this.state.Password === this.state.Confirmpassword) {
      this.props.updateLoginInfo(details);
    } else {
      this.setState({
        showWrongPassword: true
      });
    }
  }

  SetData(e, value) {
    this.setState({
      [value]: e.target.value,
      msg: "",
      showModal: false
    });
  }

  resetData() {
    this.setState({
      Password: "",
      Oldpassword: "",
      Confirmpassword: ""
    });
  }

  cancelCourse = () => {
    document.getElementById("ResetForm").reset();
  };

  handleModal() {
    this.setState({
      showModal: !this.state.showModal,
      showWrongPassword: false
    });
  }

  render() {
    const classes = this.Styles;
    return (
      <div className="login-info">
        {this.state.showModal &&
          this.props.showAlert === true &&
          this.props.alertMessage ===
            "Your Password has been Changed Successfully" && (
            <PasswordAlert
              handleModal={this.handleModal}
              resetData={this.resetData}
              header="Success"
              message="Your Password has been Changed Successfully"
            />
          )}

        {this.state.msg === "" &&
          this.state.showModal &&
          this.props.showAlert === undefined &&
          this.props.alertMessage === undefined && (
            <PasswordAlert
              handleModal={this.handleModal}
              header="Sorry"
              message="Current Password is Incorrect"
            />
          )}

        {this.state.showWrongPassword && (
          <PasswordAlert
            handleModal={this.handleModal}
            header="Sorry"
            message="Password do not match"
          />
        )}
        <Form className={classes.container}>
          <div className="col-12">
            <Row>
              <Col className="col-12">
                <h2 className="page-title text-left">Email Address</h2>
              </Col>
              <Col className="text-center col-12 d-flex">
                <span className="icon">
                  {" "}
                  <img src={mailIcon} alt="" className="img-fluid" />{" "}
                </span>
                <Field
                  name="Email"
                  className={classes.textField}
                  type="email"
                  component={RenderTextField}
                  placeholder={this.context.t("john@mail.com")}
                  onChange={this.handleChange}
                  disabled={true}
                  validate={required}
                />
              </Col>
              <div className="col-12">
                <hr />
              </div>
              <Col className="col-12">
                <h2 className="page-title text-left">Change password</h2>
              </Col>
              <Col className="text-center col-12 my-2 d-flex">
                <span className="icon">
                  <img src={passwordIcon} alt="" className="img-fluid" />
                </span>
                <Field
                  name="Oldpassword"
                  className={classes.textField}
                  type="password"
                  component={RenderTextField}
                  placeholder={this.context.t("Old password")}
                  onChange={e => this.SetData(e, "Oldpassword")}
                  validate={required}
                />
              </Col>
              <Col className="text-center col-12 d-flex my-2">
                <span className="icon">&nbsp; </span>
                <Field
                  name="Password"
                  className={classes.textField}
                  type="password"
                  component={RenderTextField}
                  placeholder={this.context.t("New password")}
                  onChange={e => this.SetData(e, "Password")}
                  validate={required}
                />
              </Col>
              <Col className="text-center col-12 d-flex mt-2 mb-2">
                <span className="icon">&nbsp; </span>
                <Field
                  name="Confirmpassword"
                  className={classes.textField}
                  type="password"
                  component={RenderTextField}
                  placeholder={this.context.t("Confirm password")}
                  onChange={e => this.SetData(e, "Confirmpassword")}
                  validate={required}
                />
              </Col>
              <div>
                <p className="info">{this.state.msg}</p>
              </div>
              <div className="btn-height my-5"></div>
              <Col className="text-center my-1">
                <button
                  //type="submit"
                  className="my-3 theme-btn big-btn mx-auto col btn btn-"
                  onClick={this.SendData}
                  disabled={
                    this.state.Password === "" &&
                    this.state.Confirmpassword === ""
                      ? true
                      : false
                  }
                >
                  Save Updates
                </button>
              </Col>
            </Row>
          </div>
        </Form>
      </div>
    );
  }
}

LogInInfo.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool
};
LogInInfo.contextTypes = {
  t: PropTypes.func.isRequired
};

LogInInfo.childContextTypes = {
  t: PropTypes.func.isRequired
};

export default LogInInfo;
