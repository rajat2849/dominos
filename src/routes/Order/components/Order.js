import React from "react";
import PropTypes from "prop-types";
import { Row, TabContent, TabPane } from "reactstrap";
import { browserHistory } from "react-router";

import ProgressBar from "./ProgressBar";
import OrderDetail from "./OrderDetail";
import Payment from "./Payment";
import PlaceOrder from "./PlaceOrder";
import InnerHeader from "components/InnerHeader";
import Loader from "components/Loader";
import { Url } from "config/Config";
import { getLocalStorage, saveLocalStorage } from "components/Helpers";

import "./OrderDetail.scss";
import Alert from "components/Alert";
import ConfirmBox from "components/ConfirmBox";

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "order",
      progress: ["order"],
      paymentMethod: "",
      enablePlaceOrderBtn: false,
      showFavouriteConfirm: false,
      additionalInstruction: "",
      isPaymentOptionSelected: false
    };
    this.toggle = this.toggle.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.setPayment = this.setPayment.bind(this);
    this.handleAlertBox = this.handleAlertBox.bind(this);
    this.agreeForOrder = this.agreeForOrder.bind(this);
    this.handleConfirmBox = this.handleConfirmBox.bind(this);
    // branch.logEvent("Order Detail Screen", function(err) {
    //   console.log(err);
    // });
  }

  componentWillMount() {
    /*
     * Google tag manager
     */
    const tagManagerData = {
      event: "Pageview",
      url: window.location.pathname
    };
    window.dataLayer.push(tagManagerData);

    this.props.getStoreTime();
    this.props.fetchUser();
  }

  componentWillUnmount() {
    // reset payment method
    this.props.setPaymentOption("", "reset");
    this.handleAlertBox();
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      // order will be placed when payment method will be selected
      if (tab === "placeorder" && this.props.paymentOption === "") {
        this.props.setAlert();
        return false;
      }
      if (this.state.progress.indexOf(tab) < 0) {
        this.state.progress.push(tab);
      }
      this.setState({ activeTab: tab });
    }
  }

  async setPayment(paymentMethod) {
    await this.setState({ isPaymentOptionSelected: true });
    this.props.setPaymentOption(paymentMethod, "set");
  }

  agreeForOrder(obj, currentVal) {
    if (currentVal === true) {
      this.setState({ enablePlaceOrderBtn: true });
    } else {
      this.setState({ enablePlaceOrderBtn: false });
    }
  }

  async placeOrder(formValue) {
    if (this.state.enablePlaceOrderBtn === true) {
      // set payment detail and order detail (address, store) in case of login user
      const loggedinUserInfo = getLocalStorage("receivedLoginDetail");
      if (
        typeof loggedinUserInfo !== "undefined" &&
        typeof loggedinUserInfo.customer_id !== "undefined"
      ) {
        this.setState({
          showFavouriteConfirm: true,
          additionalInstruction: formValue.additional_instruction
        });
      } else {
        await this.props.placeOrder({
          additional_instruction: formValue.additional_instruction
        });
        let lstorage = getLocalStorage("orderConfirm");
        this.props.setPaymentOnline(lstorage.orderId);
      }
    } else {
      this.props.resetAlertBox(
        true,
        this.context.t("Please check agreed to continue order")
      );
    }
  }

  async handleConfirmBox(status = null) {
    this.setState({ showFavouriteConfirm: false });
    await this.props.setLoginUserPaymentMethod();
    await this.props.setOrderDetail();
    this.setState({ showFavouriteConfirm: false });
    let order = getLocalStorage("order");
    order.favouriteOrder = status;
    saveLocalStorage("order", order);
    this.props.placeOrder({
      additional_instruction: this.state.additionalInstruction
    });
  }

  handleAlertBox() {
    this.props.resetAlertBox(false, "");
    if (this.props.isPgPaymentFailed) {
      browserHistory.push(Url.MENU_PAGE);
    }
  }

  render() {
    const { cart, price } = this.props.user;
    return (
      <div className="col-12 order-wrapper  main-wrapper content-wrapper">
        <Alert
          showAlert={
            typeof this.props.showAlert !== "undefined"
              ? this.props.showAlert
              : false
          }
          message={
            typeof this.props.alertMessage !== "undefined"
              ? this.props.alertMessage
              : ""
          }
          handleAlertBox={this.handleAlertBox}
          className="view-cart-alert"
        />
        <ConfirmBox
          showConfirmBox={this.state.showFavouriteConfirm}
          boxMessage={this.context.t("Add this order to your favorite order?")}
          handleConfirmBox={this.handleConfirmBox}
        />
        <Loader loading={this.props.placingOrder} />
        <Row>
          <InnerHeader
            to={Url.ORDER_PLACED}
            cartItem={this.props.app.cartItemCount}
          />
        </Row>
        <div className="container">
          <div className="row">
            <ProgressBar
              toggle={this.toggle}
              activeTab={this.state.activeTab}
              progress={this.state.progress}
            />
            <TabContent
              activeTab={this.state.activeTab}
              className="my-4 col-12 px-0"
            >
              {this.state.activeTab === "order" && (
                <TabPane
                  tabId={this.state.activeTab}
                  className="tab-item box-bg"
                >
                  {typeof cart !== "undefined" && (
                    <OrderDetail cartItem={cart} price={price} />
                  )}
                </TabPane>
              )}
              {this.state.activeTab === "payment" && (
                <TabPane tabId={this.state.activeTab} className="tab-item">
                  <Payment
                    setPayment={this.setPayment}
                    selectedPaymentOption={this.props.paymentOption}
                    isPaymentOptionSelected={this.state.isPaymentOptionSelected}
                  />
                </TabPane>
              )}
              {this.state.activeTab === "placeorder" && (
                <TabPane tabId={this.state.activeTab} className="tab-item">
                  {typeof this.props.user !== "undefined" && (
                    <PlaceOrder
                      {...this.props}
                      user={this.props.user}
                      placeOrder={this.placeOrder}
                      agreeForOrder={this.agreeForOrder}
                    />
                  )}
                </TabPane>
              )}
            </TabContent>
          </div>
        </div>
      </div>
    );
  }
}

Order.propTypes = {
  app: PropTypes.object.isRequired,
  fetchUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  paymentOption: PropTypes.string,
  setPaymentOption: PropTypes.func.isRequired,
  placeOrder: PropTypes.func.isRequired,
  setPaymentOnline: PropTypes.func.isRequired
};

Order.contextTypes = {
  t: PropTypes.func.isRequired
};

Order.childContextTypes = {
  t: PropTypes.func.isRequired
};

export default Order;
