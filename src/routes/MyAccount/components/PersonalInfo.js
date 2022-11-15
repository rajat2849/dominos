import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React from "react";
import PropTypes from "prop-types";
import {
  Col,
  Form,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import { Field, reduxForm } from "redux-form";
import RenderField from "../../../components/RenderField";
import FreeModal from "../../ViewCart/components/freeModal"
import NormalizePhone from "components/NormalizePhone";
import { getLocalStorage } from "components/Helpers";
import "./LogInInfo.scss";
import { browserHistory } from "react-router";
import { Url } from "config/Config";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const mobileOptions = [
  { key: "mobile", value: "Mobile" }
];

const RenderTextField = props => {

  const classes = useStyles();
  const [values, setValues] = React.useState({});
  const {
    input,
    label,
    value,
    meta: { touched, invalid, error },
    ...custom
  } = props;
  return (
    <div> 
    <TextField
      label={label}
      placeholder={label}
      value={value}
      error={touched && invalid}
      helperText={touched && error}
      {...input}
      {...custom}
    />
    </div>
  );
};

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

const required = value =>
  value || typeof value === "number" ? undefined : "Required";
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxlength = max => value =>
  value && value.length > max ? `Must be 12 digits or less` : undefined;
const Maxlength = max => value =>
  value && value.length > max ? `Must be 25 digits or less` : undefined;
const maxLength15 = maxLength(15);
const maxlength11 = maxlength(11);
const Maxlength24 = Maxlength(24);
export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
const number = value =>
  value && isNaN(Number(value)) ? "Must be a number" : undefined;
export const minLength9 = minLength(9);
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;

class PersonalInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
      backdrop: false,
      showModal: false,
      Firstname: "",
      Lastname: "",
      Dob: "",
      phoneNumber: "",
      extPhoneNumber: "",
      Ext: "",
      password:"",
      disable:true,
      timer : 0
    };
    this.Styles = this.Styles.bind(this);
    this.toggle = this.toggle.bind(this);
    this.SendData = this.SendData.bind(this);
    this.SetData = this.SetData.bind(this);
    // branch.logEvent("Personal Info Screen", function(err) {
    //   console.log(err);
    // });
  }

  componentDidMount() {
    let MobileType = mobileOptions[0].key;
    if (typeof this.props.initialValues.MobileType !== "undefined") {
      MobileType = this.props.initialValues.MobileType;
    }
    this.props.contactNumberType(MobileType);
    this.setState({
      Firstname:this.props.initialValues.Firstname,
      Lastname:this.props.initialValues.Lastname,
    })
  }

   SendData = () => {
    const id = getLocalStorage("receivedLoginDetail");
    const details = {
      customer_id: id.customer_id,
      Firstname: this.state.Firstname,
      Lastname: this.state.Lastname,
      Dob: this.state.Dob,
      phoneNumber: this.state.phoneNumber,
      extPhoneNumber: this.state.extPhoneNumber,
      MobileType: "mobile",
      Ext: this.state.Ext,
      password:this.state.password
    };
    this.props.updateCustomer(details);
    this.setState({
      showModal: true
    });
  }


// used to open otp options list. 
openOptionList = () => {
  const { sentOrderPlacedStatus} = this.props;
  sentOrderPlacedStatus("listOpen")
}

// used to sent the otp at the time of place order.
sentOtp = () => {
  const { phoneNumber } = this.state
  const { sentOrderVeriOtp, sentOrderPlacedStatus} = this.props;
  const user = getLocalStorage("user");
  sentOrderVeriOtp({
    email: user.email,
    mobile: phoneNumber ? phoneNumber : user.phoneNumber
  });
  sentOrderPlacedStatus("sentOtp")
}
  
  cancelPopup = () => {
    const { sentOrderPlacedStatus} = this.props;
    sentOrderPlacedStatus("")
  }


// used to verify the otp.
  verifyOtp = (formValue) => {
    const { verifyOrderVeriOtp } = this.props
    verifyOrderVeriOtp(formValue).then(res=> {
      if(res === "success") {
        this.SendData()
      }
    })
  }

  SetData(e, value) {
    this.setState({
      [value]: e.target.value
    });      
  }

  toggle(status) {
    this.setState({
      showModal: !this.state.showModal
    });
    this.props.setAlertMeassage(false, "");
    if(status === "success"){
       browserHistory.push(Url.DASHBOARD);
    }
  }

  Styles() {
    return useStyles();
  }

  cancelPopup = () => {
    const { sentOrderPlacedStatus} = this.props;
    const { timer} = this.state;
    clearInterval(timer);
    sentOrderPlacedStatus("")
  }
  

  render() {
    const MobileTypes = getLocalStorage("receivedLoginDetail");
    const classes = this.Styles;
    const { handleSubmit, errorMessage } = this.props;
    let allow = false
    if( this.state.Firstname.length >1 && this.state.Lastname.length >1 && this.state.password.length  >1){
      allow=true
    }
    return (
      <div className="row mx-0">
        {this.props.orderPlaceStatus && (
          <FreeModal
            isOpen={false}
            closeBtnHandler={this.cancelPopup}
            sentOtp={() => this.sentOtp()}
            verifyOtp={(data) => this.verifyOtp(data)}
            modelFooter ={false}
            orderPlaceStatus ={this.props.orderPlaceStatus}
            phoneNumber = {this.state.phoneNumber}
          />
        )}
        {this.state.showModal &&
          this.props.showAlert === true &&
          this.props.alertMessage === "User Data Updated" && (
            <Modal
              isOpen={this.state.modal}
              modalTransition={{ timeout: 700 }}
              backdropTransition={{ timeout: 1300 }}
              toggle={this.toggle}
              className={`selected-store-modal modal-dialog-center ${this.props.className}`}
              backdrop={this.state.backdrop}
            >
              <ModalHeader>
                <h5>Success</h5>
              </ModalHeader>
              <ModalBody>
                <div className="col-12 d-flex">
                  <h5>User Data Updated</h5>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={() => this.toggle("success")}
                  color=" "
                  className="theme-btn big-btn col-12"
                >
                  OK
                </Button>
              </ModalFooter>
            </Modal>
          )}
 {this.state.showModal &&
          this.props.showAlert === true &&
          this.props.alertMessage === "Wrong Password" && (
            <Modal
              isOpen={this.state.modal}
              modalTransition={{ timeout: 700 }}
              backdropTransition={{ timeout: 1300 }}
              toggle={this.toggle}
              className={`selected-store-modal modal-dialog-center ${this.props.className}`}
              backdrop={this.state.backdrop}
            >
              <ModalHeader>
                <h5>Sorry</h5>
              </ModalHeader>
              <ModalBody>
                <div className="col-12 d-flex">
                  <h5>Wrong Password</h5>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={() =>this.toggle("failed")}
                  color=" "
                  className="theme-btn big-btn col-12"
                >
                  OK
                </Button>
              </ModalFooter>
            </Modal>
          )}
        <Form className="text-left col" >
          <div className="col-12 px-0">
            <Row>
              <div className="col-12">
                <h4 className="categories-title font-weight-bold">
                  Your details
                </h4>
              </div>
              <Col className="text-left col-12 dob-input">
                <Field
                  name="Dob"
                  className="form-control"
                  type="text"
                  component={RenderTextField}
                  //label="Date of Birth"
                  placeholder={this.context.t("Date of Birth")}
                  validate={required}
                  onChange={e => this.SetData(e, "Dob")}
                />
              </Col>
              <Col className="text-left col-6 col-sm-6 col-xl-6 my-2 pr-1">
                <Field
                  name="Firstname"
                  className="form-control mt-3"
                  type="text"
                  component={RenderTextField}
                  //label={this.context.t("First Name")}
                  onChange={e => this.SetData(e, "Firstname")}
                  normalize={normalizeName}
                  validate={required}
                  value={MobileTypes.firstname}
                   placeholder={this.context.t("First Name")}
                />

              </Col>
              <Col className="text-left col-6 col-sm-6 col-xl-6 my-2 pl-1">
                <Field
                  name="Lastname"
                  className="form-control mt-3"
                  type="text"
                  component={RenderTextField}
                  //label={this.context.t("Last Name")}
                  onChange={e => this.SetData(e, "Lastname")}
                  normalize={normalizeName}
                  validate={required}
                   placeholder={this.context.t("Last Name")}
                />
              </Col>
              <Col className="text-left col-12 dob-input ">
                <Field
                  name="Password"
                  className="form-control mt-3"
                  type="password"
                  component={RenderTextField}
                  //label={this.context.t("Password")}
                  placeholder={"Password"}
                  onChange={e => this.SetData(e, "password")}
                  normalize={normalizeName}
                  validate={required}
                />
                </Col>
            </Row>
            <Row>
              <div className="col-12 mt-3">
                <h4 className="categories-title font-weight-bold">
                  Contact details
                </h4>
              </div>
              <Col className="col-12 my-2 radio-box">
                <Row className="mx-0">
                  {mobileOptions.map((option, index) => {
                    return (
                      <Col xs="4" key={index}>
                        <label>
                          <Field
                            name="MobileType"
                            className="mr-2"
                            component="input"
                            type="radio"
                            check={true}
                            value={option.key}
                            onChange={e =>
                              this.props.contactNumberType(e.target.value, e)
                            }
                          />
                          {option.value}
                        </label>
                      </Col>
                    );
                  })}
                </Row>
              </Col>
              <Col className="col text-left">
                  <Field
                    name="phoneNumber"
                    className="form-control"
                    type="text"
                    component={RenderTextField}
                    //label={this.context.t("Number")}
                     placeholder={this.context.t("Number")}
                    normalize={NormalizePhone}
                    onChange={e => this.SetData(e, "phoneNumber")}
                    validate={[maxlength11, minLength9]}
                  />
                </Col>
              {/* {this.props.contactType === "mobile" ? (
                <Col className="col text-left">
                  <Field
                    name="phoneNumber"
                    className="form-control"
                    type="text"
                    component={RenderTextField}
                    //label={this.context.t("Number")}
                     placeholder={this.context.t("Number")}
                    normalize={NormalizePhone}
                    onChange={e => this.SetData(e.target.value, "phoneNumber")}
                    validate={[maxlength11, minLength9]}
                  />
                </Col>
              ) : (
                <Col className="col text-left">
                  <Field
                    name="extPhoneNumber"
                    className="form-control"
                    type="text"
                    component={RenderTextField}
                    label={this.context.t("Number")}
                    normalize={NormalizePhone}
                    onChange={e => this.SetData(e.target.value, "extPhoneNumber")}
                  />
                </Col>
              )} */}
              {this.props.contactType === "office" ||
              this.props.contactType === "home" ? (
                <Col className="col-3 text-left pl-1">
                  <Field
                    name="Ext"
                    className="form-control"
                    type="number"
                    component={RenderTextField}
                    label={this.context.t("Ext")}
                    normalize={NormalizePhone}
                    onChange={e => this.SetData(e, "Ext")}
                  />
                </Col>
              ) : null}
             
            </Row>

            <div className="btn-height"></div>
            <Col className="text-center my-1">
              <button
              type ="button"
                className="my-3 theme-btn big-btn mx-auto col btn btn-"
                onClick={this.openOptionList}
                disabled={!allow}
              >
                Save Updates
              </button>
            </Col>
          </div>
        </Form>
      </div>
    );
  }
}

PersonalInfo.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool
};

PersonalInfo.contextTypes = {
  t: PropTypes.func.isRequired
};
export default PersonalInfo;
