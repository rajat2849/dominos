import React from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import dana_wallet from "../../../../public/newimages/dana_wallet.png";
import card_delivery from "../../../../public/newimages/card_delivery.png";
import cash_on_delivery from "../../../../public/newimages/cash_on_delivery.png";
import online_payment from "../../../../public/newimages/online_payment.png";
import PropTypes from "prop-types";
import GoPay from "../../../../public/newimages/tmLLs4j.png";
import ShopeePay from "../../../../public/newimages/shopeepay.png";
import { saveLocalStorage } from "components/Helpers";

class PaymentMethod extends React.Component {
  constructor(props) {
    super(props);
    // branch.logEvent("Payment Options Screen", function(err) {
    //   console.log(err);
    // });
  }
  
  componentWillMount() {
    this.props.getPaymentMethod();
  }
  componentDidMount() {
    const paymentMode = { option: "cash" };
    saveLocalStorage("payment", paymentMode);
  }
  render() {
    // console.log("this.props.aboveOrderPrice-----------" , this.props.aboveOrderPrice)
    return (
      <Form className="row payment-wrapper mb-3 px-3">
        <div className="col-12 px-0">
          <h2 className="item-title">{this.context.t("Payment Method")}</h2>
        </div>
        <React.Fragment>
        <FormGroup check className="col-12 row mx-0 d-flex px-0">
          <div className="col-1 px-0">
            <img className="btn-image" src={card_delivery} alt="icon" />
          </div>
          <Label check className="col-11 row mx-0 px-2 container1">
            Cash on Delivery
            <Input
              type="radio"
              name="paymentmethod"
              className="ml-auto "
              value="cash"
              onChange={e => this.props.handlePaymentMethod(e)} 
              checked={this.props.aboveOrderPrice === false && true}
              disabled={this.props.aboveOrderPrice === true ? true : false}

            />{" "}
            <span className={this.props.aboveOrderPrice === true ? "" : "checkmark"}></span>
          </Label>
        </FormGroup>
        <FormGroup check className="col-12 row mx-0 d-flex px-0">
          <div className="col-1 px-0">
            <img className="btn-image" src={cash_on_delivery} alt="icon" />
          </div>
          <Label check className="col-11 row mx-0 px-2 container1">
            {this.context.t("BCA Debit / Credit Card")}
            <Input
              type="radio"
              name="paymentmethod"
              className="ml-auto"
              value="credit"
              onChange={e => this.props.handlePaymentMethod(e)}
              // disabled={this.props.aboveOrderPrice === true ? true : false}
            />{" "}
            <span className="checkmark"></span>
          </Label>
        </FormGroup>
        <FormGroup check className="col-12 row mx-0 d-flex px-0">
          <div className="col-1 px-0">
            <img className="btn-image" src={online_payment} alt="icon" />
          </div>
          <Label check className="col-11 row mx-0 px-2 container1">
            Online Credit / Debit
            <Input
              type="radio"
              name="paymentmethod"
              className="ml-auto"
              value="snapbin"
              onChange={e => this.props.handlePaymentMethod(e)}
             
           
            />{" "}
              <span className="checkmark"></span>
          </Label>
        </FormGroup>
        <FormGroup check className="col-12 row mx-0 d-flex px-0">
          <div className="col-1 px-0">
            <img className="btn-image" src={dana_wallet} alt="icon" />
          </div>
          <Label check className="col-11 row mx-0 px-2 container1">
            DANA Wallet
            <Input
              type="radio"
              name="paymentmethod"
              className="ml-auto"
              value="snapmigs"
              onChange={e => this.props.handlePaymentMethod(e)}
            />{" "}
            <span className="checkmark"></span>
          </Label>
        </FormGroup>
        </React.Fragment>
  {/*      {this.props.paymentMethods &&
          this.props.paymentMethods.map(method => {
            return (
              method.value !== "free" && (
                <FormGroup check className="col-12 row mx-0 d-flex px-0">
                  <div className="col-1 px-0">
                    {method.value === "cashondelivery" ? (
                      <img
                        className="btn-image"
                        src={card_delivery}
                        alt="icon"
                      />
                    ) : method.value === "banktransfer" ? (
                      <img
                        className="btn-image"
                        src={cash_on_delivery}
                        alt="icon"
                      />
                    ) : method.value === "snapbin" ? (
                      <img
                        className="btn-image"
                        src={online_payment}
                        alt="icon"
                      />
                    ) : method.value === "snapmigs" ? (
                      <img className="btn-image" src={dana_wallet} alt="icon" />
                    ) : (
                      ""
                    )}
                  </div>
                  <Label check className="col-11 row mx-0 px-2 container1">
                    {method.label}
                    <Input
                      type="radio"
                      name="paymentmethod"
                      className="ml-auto"
                      value={method.value}
                      onClick={e => this.props.handlePaymentMethod(e)}
                      onChange={() => this.changeMethod()}
                      defaultChecked={
                        method.value === "cashondelivery"? true : false
                      }
                    />{" "}
                    <span class="checkmark"></span>
                  </Label>
                </FormGroup>
              )
            );
          })}*/}
            {this.props.paymentMethods &&
          this.props.paymentMethods.map(method => { 
            
            return(
                method.value == "snapbin" && ( 
                  <React.Fragment>
                  <FormGroup check className="col-12 row mx-0 d-flex px-0" key={method.value}>
                    <div className="col-1 px-0">
                      <img style={{width:"24px",height:"24px"}} src={GoPay} alt="icon" />
                    </div>
                    <Label check className="col-11 row mx-0 px-2 container1">
                      GoPay
                      <Input
                        type="radio"
                        name="paymentmethod"
                        className="ml-auto"
                        value="snapbin"
                        onChange={e => this.props.handlePaymentMethod(e)}
                      />{" "}
                      <span className="checkmark"></span>
                    </Label>
                  </FormGroup>
                  <FormGroup check className="col-12 row mx-0 d-flex px-0" key={method.label}>
                    <div className="col-1 px-0">
                      <img style={{width:"24px",height:"24px"}} src={ShopeePay} alt="icon" />
                    </div>
                    <Label check className="col-11 row mx-0 px-2 container1">
                      ShopeePay
                      <Input
                        type="radio"
                        name="paymentmethod"
                        className="ml-auto"
                        value="snapbin"
                        onChange={e => this.props.handlePaymentMethod(e)}
                      />{" "}
                      <span className="checkmark"></span>
                    </Label>
                  </FormGroup>
                  </React.Fragment>
                  )
              )
          })}
     
        
      </Form>
    );
  }
}
PaymentMethod.contextTypes = {
  t: PropTypes.func.isRequired
};
export default PaymentMethod;
