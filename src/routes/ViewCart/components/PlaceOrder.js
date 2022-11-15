import React from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import { Link } from "react-router";
import { Url } from "config/Config";
import { Field, reduxForm } from "redux-form";
import RenderField from "../../../components/RenderField";
import { ImageFilterCenterFocus } from "material-ui/svg-icons";
import Loader from "./Loader";
import { getLocalStorage } from "components/Helpers";
import { saveLocalStorage } from "../../../components/Helpers";
import { browserHistory } from "react-router";
import OrderModal from "./OrderModal";
import ErrorModal from "./ErrorModal";
import FreeModal from './freeModal'
import { CommaFormatted } from "../../../components/Helpers";

class YourOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: false,
      showModal: false,
      formValue : {},
      user : {},
    };
    this.placeOrder = this.placeOrder.bind(this);
  }
 
  componentWillReceiveProps() {
    if (this.props.amount > 50000) {
      this.setState({
        showModal: false
      });
    }
  }

  componentDidMount() {
    const { initialize, geCustomerOrders } = this.props;
    const user = getLocalStorage('user');
    this.setState({user : user});
    initialize({email : user.email , mobile : user.phoneNumber});
    geCustomerOrders(user.customer_id)
   }

  // used to open otp options list. 
  openOptionList = (formValue) => {
    const { sentOrderPlacedStatus} = this.props;
    const prevOrder = getLocalStorage('prevOrder');
    this.setState({formValue : formValue});
    localStorage.getItem("timer")&&localStorage.removeItem("timer")
    if(!prevOrder) {
      
      sentOrderPlacedStatus("listOpen");
    } else {
     
      this.placeOrder();
    }
  }

  // used to sent the otp at the time of place order.
  sentOtp = (formValue) => {
    const { sentOrderVeriOtp} = this.props;
    const { user } = this.state;
    sentOrderVeriOtp({ email : user.email , mobile : user.phoneNumber})
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
        this.placeOrder()
      }
    })
  }
  
// used to place the order after verifiaction.
  placeOrder() {
    const {formValue } = this.state;
    let order = getLocalStorage("order");
    if (
      this.props.amount < 50000 &&
      this.state.showModal === false &&
      this.props.user.deliveryType === "Delivery" &&
      this.props.taxData.status === "TRUE"
    ) {
      this.setState({
        showModal: true
      });
      // this.props.showModal(true);
    } else if (this.state.showModal === true) {
      this.props.fetchTimeStamp();
      let timeStamp = getLocalStorage("timeStamp");
      const order = getLocalStorage("order");
      if (timeStamp !== null || timeStamp !== undefined) {
        this.props.loadingImage(true);
        setTimeout(() => this.props.placeOrder(formValue), 500);
      }
    } else {
      this.props.fetchTimeStamp();
      let timeStamp = getLocalStorage("timeStamp");
      const order = getLocalStorage("order");
      if (timeStamp !== null || timeStamp !== undefined) {
        this.props.loadingImage(true);
        setTimeout(() => this.props.placeOrder(formValue), 500);
      }
    }
  }

  render() {
    const { orderPlaceStatus } = this.props;
    const formValue = {
      additional_instruction: this.props.additionalInstruction
    };
    const configData = getLocalStorage("configData");
    
    const order = getLocalStorage("order");
    const lang = getLocalStorage("siteLanguage");
    const time = getLocalStorage("time");
    const form = getLocalStorage("user");
    const payment = getLocalStorage("payment");
    const additionalInstruction = getLocalStorage("additionalInstruction");
    const token = getLocalStorage("recaptchaToken");
    const agree = this.props.agree;
     let selectedProducts = JSON.parse(localStorage.getItem("cartItems"));
            let totalQuantity = 0;
    for (var i=0; i<selectedProducts.length; i++) {
        totalQuantity += selectedProducts[i].quantity;
    }
    let allowOrder = false;

    if (
      order !== undefined &&
      order.length !== 0 &&
      time !== null &&
      time.length !== 0 &&
      // token.length !== 0 && token !== undefined &&
      form.firstname &&
      form.firstname.length > 1 &&
      form.lastname &&
      form.lastname.length > 1 &&
      form.phoneNumber &&
      form.phoneNumber.length > 8 &&
      form.email &&
      form.email.length > 5 &&
      totalQuantity <= configData.max_item.data.limit&&
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(form.email) &&
      agree === true
    ) {
      allowOrder = true;
    } 

    const orderFailed = getLocalStorage("orderFailed");
    const verifyModel= <div>
      <form className="pt-5 col-12" onSubmit={this.props.handleSubmit(this.verifyOtp)}>
            <div className="md-form">
              <Field
                name="mobile"
                component={RenderField}
                type="number"
                className="form-control"
                placeholder="Enter mobile number"
              />
              <Field
                name="otp"
                component={RenderField}
                type="text"
                className="form-control"
                placeholder="Enter otp"
              />
              <Button type="submit"
                  className="theme-btn big-btn col-12"
                >
                Verify Otp
              </Button>
            </div>
      </form>
    </div>
    return (
      <div className="bottom-menu fixed-bottom col-12">
        {this.props.fetchingData === true && (
          <Loader loading={this.props.fetchingData} />
        )}
        {orderFailed !== undefined && orderFailed.length > 0 && (
          <ErrorModal
            orderFailed={orderFailed}
            replaceOrder={this.props.replaceOrder}
            loadingImage={this.props.loadingImage}
          />
        )}
        {orderPlaceStatus && (
          <FreeModal
            isOpen={false}
            closeBtnHandler={this.cancelPopup}
            sentOtp={() => this.sentOtp(formValue)}
            verifyOtp={(data) => this.verifyOtp(data)}
            modelFooter ={false}
            orderPlaceStatus ={this.props.orderPlaceStatus}
          />
        )}
        <div>
      </div>
        {this.state.showModal === true && (
          <OrderModal
            // message={lang === "en" ? this.props.message : this.props.messageId}
            replaceOrder={this.props.replaceOrder}
            loadingImage={this.props.loadingImage}
            hideModal={this.hideModal}
            {...this.props}
          />
        )}
        <div className="row d-flex align-items-center py-2">
          <div className="col-7">
            <span className="total-items">{this.props.quantity} ITEMS</span>
            <h6 className="item-price mb-0">
              {this.context.t("Rp.")}{" "}
              {CommaFormatted(Math.round(parseFloat(this.props.total)))}
            </h6>
          </div>
          <div className="col-5 text-right">
            <Button
              disabled={!allowOrder}
              onClick={() => this.openOptionList(formValue)}
              className="theme-btn btn py-0 d-flex align-items-center justify-content-center ml-auto"
              color=""
            >
              {this.context.t("PLACE ORDER")}
              <span className="mt-1">
                <svg
                  fill="#ffffff"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" />
                  <path d="M0-.25h24v24H0z" fill="none" />
                </svg>
              </span>
            </Button>
          </div>
        </div>
        {this.props.placing === true && <Loader loading={this.props.loader} />}
      </div>
    );
  }
}




YourOrder.contextTypes = {
  t: PropTypes.func.isRequired
};


export default reduxForm({
  form: "verifyOrder"
})(YourOrder);;
