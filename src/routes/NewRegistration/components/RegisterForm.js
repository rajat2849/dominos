import React from "react";
import PropTypes from "prop-types";
import { Form } from "reactstrap";
import { reduxForm, Field } from "redux-form";
import { Row, Col } from "reactstrap";
import { get } from 'lodash';
import RenderField from "../../../../src/DashboardSubComponent/RenderField";
import { Link } from "react-router";
import { Url } from "config/Config";
import NormalizePhone from "components/NormalizePhone";
import SubmitButtons from "components/SubmitButton";
//import DOB from 'DashboardSubComponent/DateOfBirthComponent';
import FacebookForm from "./FacebookForm";
import { getLocalStorage } from "../../../components/Helpers";
import AgeAlert from "./AgeAlert";
import "./RegisterForm.scss";
import Captha from "./Recaptcha.js";

const contact = ["Mobile", "Office", "Home"];

const required = value => (value ? undefined : "Required");
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength13 = maxLength(13)
const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined;
const minValue9 = minValue(9);
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;

const normalizeName = value => {
  if (!value) {
    return value;
  }

  if (value.length > 25) {
    return value.slice(0, 25);
  } else {
    return value;
  }
};

export const FirstName = props => {
  return (
    <div className="col-12">
      <Field
        name="Firstname"
        className="form-control"
        type="text"
        component={RenderField}
        label="First Name"
        validate={[required]}
        normalize={normalizeName}
      />
    </div>
  );
};

export const LastName = props => {
  return (
    <div className="col-12">
      <Field
        name="Lastname"
        className="form-control"
        type="text"
        component={RenderField}
        label="Last Name"
        validate={[required]}
        normalize={normalizeName}
      />
    </div>
  );
};

export class MobileNumber extends React.Component {
  render() {
    let lang = getLocalStorage("siteLanguage");
    let mobileOptions = [];
    if (lang == "id") mobileOptions = ["Mobile", "Home", "Kantor"];
    else {
      mobileOptions = ["Mobile", "Home", "Office"];
    }
    const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength13 = maxLength(13)
    return (
      <div className="row mx-0">
        <div className="col-12 radio-box">
          <Row>
            {mobileOptions.map((option, index) => {
              let check = false;
              if (this.props.contactType === option) {
                check = true;
              }
              return (
                <Col key={index} className="col-4 pr-0">
                  <label>
                    <Field
                      name="MobileType"
                      className="mr-2"
                      component="input"
                      type="radio"
                      checked={check}
                      value={option}
                      onChange={e =>
                        this.props.contactNumberType(e.target.value, e)
                      }
                    />
                    {option}
                  </label>
                </Col>
              );
            })}
          </Row>
        </div>
        <Col className="col-12 col-sm-12 col-xl-12 mt-2">
          <Row>
            <Col className="text-center">
              <Field
                name="Number"
                className="form-control"
                type="tel"
                component={RenderField}
                label="Phone Number"
                normalize={NormalizePhone}
                validate={[required, minValue9]}
              />
            </Col>
            {this.props.contactType === "Office" ||
            this.props.contactType === "Home" ? (
              <Col className="text-center col-3">
                <Field
                  name="ext"
                  className="form-control"
                  type="text"
                  component={RenderField}
                  label="Ext"
                  normalize={NormalizePhone}
                />
              </Col>
            ) : null}
          </Row>
        </Col>
      </div>
    );
  }
}

export const Email = props => {
  return (
    <div className="col-12">
      <Field
        name="Email"
        className="form-control"
        type="text"
        component={RenderField}
        label="Type your Email"
        validate={[required, email]}
      />
    </div>
  );
};

export const Password = props => {
  return (
    <div className="col-12">
      <Field
        name="Password"
        className="form-control"
        type="password"
        component={RenderField}
        label="Type Password"
        validate={required}
      />
    </div>
  );
};

export const DateOfBirth = props => {
  return (
    <div className="col-12">
      <Field
        name="DateOfBirth"
        className="form-control"
        type="date"
        component={RenderField}
        label="Date of birth"
        validate={required}
        onChange={e => props.checkDate(e)}
      />
    </div>
  );
};
export const Confirmpassword = props => {
  return (
    <div className="col-12">
      <Field
        name="Confirmpassword"
        className="form-control"
        type="password"
        component={RenderField}
        label="Type Confirm Password"
        validate={required}
      />
    </div>
  );
};

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDate: false,
      Dob: ""
    };
    // branch.logEvent("User Registeration Page", function(err) {
    //   console.log(err);
    // });
    this.checkDate = this.checkDate.bind(this);
  }


  initializeForm = async () => {
    const {initialize} = this.props
   const googleInfo = getLocalStorage("googleInfo")
    const Firstname = get(googleInfo, 'givenName', '');
    const Lastname = get(googleInfo, 'familyName', '');
    const Email = get(googleInfo, 'email', '');
    initialize({
      Firstname: Firstname,
      Lastname: Lastname,
      Email: Email,
    });
   };

  checkDate(e) {
    if (new Date().getFullYear() - e.target.value.split("-")[0] < 13) {
      this.setState({
        confirmDate: true
      });
    }
  }

  modalFalse = () => {
    this.setState({
      confirmDate: false
    });
  };

  componentDidMount() {
    this.initializeForm();
    this.props.Recaptcha(false);
  }

  render() {
    let token = getLocalStorage("recaptcha");
    let allowRegister = false;
    if (token != null) {
      allowRegister = true;
    }
    const { handleSubmit } = this.props;
    return (
      <div className="col-12">
        <AgeAlert
          confirmDate={this.state.confirmDate}
          modalFalse={this.modalFalse}
        />
        <div className="ml-5 mt-4">Register To Proceed Or</div>

        <Link className="ml-5" to={Url.LOGIN_PAGE}>
          {"Login If Already Registered"}
        </Link>
        <Form className="pt-5" onSubmit={handleSubmit}>
          <Row>
            <FirstName />
            <LastName />
            <MobileNumber {...this.props} />
            <Email />
            <Password />
            <Confirmpassword />
            <DateOfBirth checkDate={this.checkDate} />

          {/*  <Captha {...this.props} Recaptcha={this.props.Recaptcha} />*/}

            <div
              className="btn theme-btn mx-auto mt-4 col-4"
              onClick={this.props.handleModal}
            >
              <SubmitButtons
                {...this.props}
                submitLabel="Sign up"
                className="btn theme-btn mx-auto col-4"
                submitting={this.props.submitting}
                //disabled={this.props.recaptcha ? false : true}
              />
            </div>
          </Row>
        </Form>
      </div>
    );
  }
}

RegisterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  t: PropTypes.func.isRequired
};
RegisterForm = reduxForm({
  form: "login"
})(RegisterForm);

MobileNumber.contextTypes = {
  t: PropTypes.func.isRequired
};
export default RegisterForm;
