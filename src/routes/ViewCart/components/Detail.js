import React from "react";
import { Url } from "config/Config";
import { Link } from "react-router";
import { getLocalStorage, saveLocalStorage } from "../../../components/Helpers";
import RenderField from "DashboardSubComponent/RenderField";
import { Field, reduxForm } from "redux-form";
import account from "../../../../public/newimages/account.png";
import phone from "../../../../public/newimages/phone-icon.png";
import Email from "../../../../public/newimages/email-icon.png";

const required = value =>
  value || typeof value === "number" ? undefined : "This Field Can't be Blank";
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxlength = max => value =>
  value && value.length > max ? `Must be 13 digits or less` : undefined;
const Maxlength = max => value =>
  value && value.length > max ? `Must be 25 digits or less` : undefined;
const maxLength15 = maxLength(15);
const maxlength11 = maxlength(11);
const Maxlength24 = Maxlength(24);
export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} digits or more` : undefined;
const number = value =>
  value && isNaN(Number(value)) ? "Must be a number" : undefined;
export const minLength9 = minLength(9);
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;

const normalizePhone = value => {
  if (!value) {
    return value;
  }

  const onlyNums = value.replace(/[^\d]/g, "");

  if (onlyNums.length > 13) {
    return onlyNums.slice(0, 13);
  } else {
    return onlyNums;
  }
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

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
    this.state = {
      contact_type: "mobile",
      ext: ""
    };
  }
  save(value) {
    this.props.detailForm(value);
  }
  componentDidMount() {
    this.handleInitialize();
  }
  handleInitialize() {
    //let user = getLocalStorage("receivedLoginDetail");
    const user = getLocalStorage("user");
    // if(user.length===0){
    //   user = getLocalStorage("user")
    // }
    // ? user.phoneNumber : user.contact_number
    const data = {
      firstname: user.firstname,
      lastname: user.lastname,
      mobile_number: user.phoneNumber,
      email: user.email
    };
    this.props.initialize(data);
  }

  handleContactType(e) {
    this.setState({
      contact_type: e.target.value
    });
  }

  handleExt(e) {
    this.setState({
      ext: e.target.value
    });
  }
  render() {
    const userLogin = JSON.parse(localStorage.getItem("receivedLoginDetail"));
    const userDetails = JSON.parse(localStorage.getItem("user"));
    const deliveryAddress = JSON.parse(localStorage.getItem("deliveryAddress"));
    const address =
      deliveryAddress !== undefined && deliveryAddress !== null
        ? deliveryAddress[0].address
        : "address";
    const obj =
      userLogin !== null
        ? {
            address: address,
            contact_ext: "",
            firstname: userDetails[0].firstname,
            lastname: userDetails[0].lastname,
            email: userDetails[0].email,
            contact_type: this.state.contact_type,
            phoneNumber: userDetails[0].phoneNumber
          }
        : {
            address: address,
            firstname: this.props.firstName
              ? this.props.firstName
              : userDetails !== null
              ? userDetails[0].firstname
              : "",
            contact_ext: "",
            lastname: this.props.lastName
              ? this.props.lastName
              : userDetails !== null
              ? userDetails[0].lastname
              : "",
            email: this.props.email
              ? this.props.email
              : userDetails !== null
              ? userDetails[0].email
              : "",
            contact_type: this.state.contact_type,
            phoneNumber: this.props.mobile
              ? this.props.mobile
              : userDetails !== null
              ? userDetails[0].phoneNumber
              : ""
          };
    saveLocalStorage("user", obj);
    saveLocalStorage("confirmOrderAtViewCart", true);
    let details = getLocalStorage("receivedLoginDetail");
    return (
      <div className="row your-details">
        {/*<h2 className="item-title col-6">Your Details</h2>*/}
        <div className="col-6 text-right ">
          {details.length === 0 && (
            <Link
              className="theme-text"
              to={Url.LOGIN_PAGE}
              onClick={sessionStorage.setItem(
                "fromPage",
                JSON.stringify(Url.VIEW_CART)
              )}
            >
              {" "}
              Sign in{" "}
            </Link>
          )}
        </div>
        <div className="col-12 mt-2">
          <form onSubmit={this.props.handleSubmit(this.save)}>
            <div className="row">
              <div className="col-2">
                {" "}
                <span>
                  <img src={account} className="img-fluid" />
                </span>
              </div>
              <div className="col-10 pl-0 pr-4">
                <Field
                  label="FirstName"
                  name="firstname"
                  type="text"
                  component={RenderField}
                  validate={[required, Maxlength24]}
                  onChange={e => this.props.handleDetails(e, "firstName")}
                  normalize={normalizeName}
                />
              </div>
            </div>
            <div className="row justify-content-end">
              <div className="col-10 pl-0 pr-4">
                <Field
                  label="LastName"
                  name="lastname"
                  type="text"
                  component={RenderField}
                  validate={[required, Maxlength24]}
                  onChange={e => this.props.handleDetails(e, "lastName")}
                  normalize={normalizeName}
                />
              </div>
            </div>
            <div className="justify-content-center px-0 row">
              <div className="col-2">
                <div className="text-center col-2 pl-0 d-flex justify-content-start">
                  <span>
                    <img
                      src={phone}
                      style={{ maxWidth: "26px" }}
                      className="img-fluid"
                    />
                  </span>
                </div>
              </div>
              <div class="col-10 px-0">
                <div class="row mx-0">
                  {this.state.contact_type === "office" ||
                  this.state.contact_type === "home" ? (
                    <div className="text-center col-2 pr-0 pl-0">
                      <Field
                        name="Ext"
                        className="form-control"
                        type="text"
                        component={RenderField}
                        label="Ext"
                        normalize={normalizePhone}
                        onChange={e => this.handleExt(e)}
                      />
                    </div>
                  ) : null}
                  <div
                    className={
                      this.state.contact_type === "mobile"
                        ? "col-7  pl-0"
                        : "col-5 px-1"
                    }
                  >
                    <Field
                      label="PhoneNumber"
                      type="text"
                      name="mobile_number"
                      component={RenderField}
                      validate={[required, number, minLength9, maxlength11]}
                      onChange={e => this.props.handleDetails(e, "mobile")}
                      normalize={normalizePhone}
                    />
                  </div>
                  <div className="col-4 md-form pl-0 pr-0">
                    <select
                      className="white outline-0 form-control custom"
                      value={this.state.contact_type}
                      onChange={e => this.handleContactType(e)}
                    >
                      <option value="mobile">Mobile</option>
                      <option value="home">Home</option>
                      <option value="office">Office</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className=" row">
              <div className="col-2">
                <span>
                  <img src={Email} className="img-fluid" />
                </span>
              </div>
              <div className="col-10 pl-0 pr-4">
                <Field
                  label="Email"
                  name="email"
                  type="text"
                  component={RenderField}
                  validate={[required, email]}
                  onChange={e => this.props.handleDetails(e, "email")}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: "Detail"
})(Detail);

// class Detail extends React.Component {
// 	constructor(props) {
// 		super(props);
//   }

// 	render() {
//     const userLogin = JSON.parse(localStorage.getItem("receivedLoginDetail"))
//     const userDetails = JSON.parse(localStorage.getItem("user"))
//     const deliveryAddress = JSON.parse(localStorage.getItem("deliveryAddress"))
//     const  address = (deliveryAddress !== undefined && deliveryAddress !== null) ? deliveryAddress[0].address : "address"
//     const obj = userLogin!== null ? {
//       address : address,
//       contact_ext : "",
//       firstname : userDetails[0].firstname,
//       lastname : userDetails[0].lastname,
//       email : userDetails[0].email,
//       contact_type : "mobile",
//       phoneNumber : userDetails[0].phoneNumber,
//     } : {
//       address : address,
//       firstname : this.props.firstName,
//       contact_ext : "",
//       lastname : this.props.lastName,
//       email : this.props.email,
//       contact_type : "mobile",
//       phoneNumber : this.props.mobile,
//     }
//     saveLocalStorage("user",obj)
//     saveLocalStorage('confirmOrderAtViewCart', true)

// 		return (
// 			<div className='row'>
// 				<h2 className='item-title col-6'>Your details</h2>
//         <div className='col-6 text-right '>
//           {(userLogin === undefined || userLogin === null) &&
//             <Link className='theme-text' to={Url.LOGIN_PAGE}
//               onClick={sessionStorage.setItem("fromPage",JSON.stringify(Url.VIEW_CART))}>Sign in</Link>}
//         </div>
//         <div className='col-12'>
//             <FirstName
//               firstName={obj===null ? this.props.firstName : obj.firstName}
//               handleFirstName={(e) => this.props.handleDetails(e,"firstName")}
//             />
//             <LastName
//               lastName={obj === null ? this.props.lastName : obj.lastName}
//               handleLastName={(e) => this.props.handleDetails(e,"lastName")}
//             />
//             <MobileNumber
//               mobile={obj === null ? this.props.mobile : obj.mobile}
//               handleMobile={(e) => this.props.handleDetails(e,"mobile")}
//             />
//             <Email
//               email={obj === null ? this.props.email : obj.email}
//               handleEmail={(e) => this.props.handleDetails(e,"email")}
//             />
// 			    </div>
// 			</div>
// 		)
// 	}
// }

// Detail = reduxForm ({
//   form: 'detail',
// }) (Detail);
// Detail.contextTypes ={
//   t:PropTypes.func.isRequired
// }

// export default Detail;
