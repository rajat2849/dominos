import React from "react";
import { Link } from "react-router";
import { Button } from "reactstrap";
import PropTypes from "prop-types";
import { Url } from "config/Config";
import delivery from "../../../../public/newimages/ICON-FOR-KEVIN-DELIVERY-01.png";
import deliveryNew from "../../../../public/newimages/ICON-FOR-KEVIN-DELIVERY-02.png";
import newcarryout from "../../../../public/newimages/ICON-FOR-KEVIN-TAKEAWAY-01-04.png";
import takeawayNew from "../../../../public/newimages/ICON-FOR-KEVIN-TAKEAWAY-02-02.png";

import neworderdelivery from "../../../../public/newimages/Vector.png";
import newordertakeaway from "../../../../public/newimages/Vector01.png";
import {getLocalStorage} from '../../../components/Helpers';
import { saveLocalStorage } from "components/Helpers";
import "./NewDashboard.scss";

class GroupButton extends React.Component {
  constructor(props) {
    super(props);
    this.confirmOrder = this.confirmOrder.bind(this);

    // this.state = {
    //   isActive: 'delivery'
    // }
  }

  confirmOrder = (btn) => {
    saveLocalStorage("confirmOrderAtViewCart", false);
    saveLocalStorage("active_Btn", btn);
    // this.setState({isActive: (btn === 'delivery') ? 'delivery' : 'carryout'});
    const deliveryType = btn === "delivery" ? "Delivery" : "Carryout";
    
    const order = { deliveryType: deliveryType };
    saveLocalStorage("order", order);

    this.props.handleGroupBtnToggle(btn);
  }
  componentWillMount() {
    const deliveryAddress = getLocalStorage('delivery_address');
    const takeawayAddress = getLocalStorage('takeawayDetail');
    this.setDeliveryAddress(deliveryAddress);
    this.setTakeawayAddress(takeawayAddress);
    const {isActive} = this.props;
    const deliveryType = isActive === "delivery" ? "Delivery" : "Carryout";
    
    const order = { deliveryType: deliveryType };
  }

  setDeliveryAddress(address) {
      this.setState({deliveryAddress: address});
  }
  setTakeawayAddress(address) {
    this.setState({takewayAddress: address});
  }
  render() {
     let loginDetails = JSON.parse(localStorage.getItem("receivedLoginDetail"));
    {
      this.loginDetails;
    }
    const {isActive} = this.props;
    const {deliveryAddress} = this.state;
    const {takewayAddress} = this.state;
    return (
      <div className="col-12 pb-3 border">
        <div className={(isActive === 'delivery') ? "col-12 pb-3 innerborder innerBorderColorDelivery" : "col-12 pb-3 innerborder innerBorderColorTakeaway"}>
        <div className="bannerBtn pb-3 text-left" style={{backgroundColor:"#fff",borderRadius: "10px"}}>
          <div className={`col-6 pr-2 ${(isActive) ? 'bannerBtnLeft' : 'bannerLeft'}`}>
            <Button
              onClick={() => this.confirmOrder('delivery')}
              className={(isActive === 'delivery') ? 'freeBts font-weight-bold btn col-12 px-2 d-flex align-items-center text-uppercase deliveryBts' : 'freeBts font-weight-bold btn col-12 px-2 d-flex align-items-center text-uppercase'}
             style={(isActive === 'delivery') ? {backgroundColor:"#3dc16f"} : {backgroundColor: "#fff"}}
            >
              <div className="row mx-0 align-items-center col-12 px-0">
                <div className="col-3 px-0" style={{position: "relative",left: "6px"}}>
                  <img
                    className="btn-image img-fluid mr-2"
                    src={(isActive === 'delivery') ? delivery : deliveryNew}
                    alt="icon"
                  />
                </div>
                <div className="col-9 px-0 text-center">
                  <span className="d-inline-flex montserrat">Delivery</span>
                  <br /><span className="d-inline-flex montserrat" style={{fontSize: "9px",fontWeight: "600"}}>30 MINUTES OR FREE*</span>
                </div>
              </div>
            </Button>
          </div>
          <div className="col-6 pl-2 bannerBtnRight">
            <Button
              onClick={() => this.confirmOrder('carryout')}
              className={(isActive === 'carryout') ? "carryBts font-weight-bold btn col-12 px-2 d-flex align-items-center text-uppercase takeawayBts" : 'carryBts font-weight-bold btn col-12 px-2 d-flex align-items-center text-uppercase'}
            >
              <div className="row mx-0 align-items-center col-12 px-0">
                <div className="col-3 px-0" style={{position: "relative",left: "8px"}}>
                  <img
                    className="btn-image-carryout img-fluid mr-3"
                    src={(isActive === 'delivery') ? newcarryout : takeawayNew }
                    alt="icon"
                  />
                </div>
                <div className="col-9 px-0 text-center">
                  <span className="d-inline-flex montserrat">Takeaway</span>
                  <br /><span className="d-inline-flex montserrat" style={{fontSize: "9px",fontWeight: "600"}}>2 MINUTES OR FREE*</span>
                </div>
              </div>
            </Button>
          </div>
        </div>
        <div className="row bannerBtnDelivery pb-3">
          <div className= {(isActive === 'delivery') ? "deliveryTextSection" : "takeawayTextSection"} onClick={() => this.props.handleAddress(isActive)}>
            <div className="col-9 pr-2 montserrat" style={{float:"left",position:"absolute",top: "0px",fontSize: "15px",fontWeight: "600",backgroundColor: "#fff",height: "32px",borderTopLeftRadius: "10px",borderBottomLeftRadius: "10px"}}>
              {/* <span style={{position:"relative",top:"4px"}}>{(isActive) ? 'deliveryyy' : 'carryout'}</span> */}
              {(isActive === 'delivery') ? <span style={{position:"relative",top:"4px",fontSize: "11px"}}>{((deliveryAddress.address_slug) && (deliveryAddress.address_slug.split(',')[0])) || 'Choose delivery address...'}</span> 
                : 
                <span style={{position:"relative",top:"-2px",fontSize: "11px"}}>
                  <span style={{fontSize:"11px",fontWeight:"bold"}}>
                    {((takewayAddress.store_title_en) && (takewayAddress.store_title_en.substring(0, 25))) || <span style={{position:"relative",top:"6px",fontWeight:"600"}}>Find nearest store...</span>}
                  </span>
                  <br />
                  <span style={{fontSize:"10px",position:"relative",top:"-11px"}}>
                    {((takewayAddress.store_address_en) && (takewayAddress.store_address_en.substring(0, 30)))}
                  </span>
                </span>
              }
              

              <img
                    className="btn-image-delivery img-fluid mr-3"
                    src={(isActive === 'delivery') ? neworderdelivery : newordertakeaway}
                    alt="icon"
                  /> 

            </div>
            <div className = {(isActive === 'delivery') ? 'col-3 pr-2 orderDeliveryText montserrat' : 'col-3 pr-2 orderTakeawayText montserrat'} >
              {(isActive === 'delivery') ? 
                <span>Order<br />Delivery</span>
                :
                <span>Order<br />Takeaway</span>
              }
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

GroupButton.contextTypes = {
  t: PropTypes.func.isRequired
};

export default GroupButton;
