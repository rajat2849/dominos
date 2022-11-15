import React from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { Url } from "config/Config";
import addressIcon from "../../../../public/newimages/track.png";
import timeIcon from "../../../../public/newimages/clock.png";
import phoneIcon from "../../../../public/newimages/phone-icon.png";
import { getLocalStorage, saveLocalStorage } from "../../../components/Helpers";
import { browserHistory } from "react-router";
import FontIcon from "material-ui/FontIcon";
import PropTypes from "prop-types";

class SelectedStore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backdrop: false
    };
  }

  saveStoreLocator(storeDetails) {
    
    saveLocalStorage("store", storeDetails);
    saveLocalStorage("takeawayDetail",storeDetails);
    /*
     *  Set of rules that define how user will land on menu or cart page.
     *  if user coming from cart page and cart is empty then user will land on menu page.
     *  if user coming from cart page and cart having some item then user will land on cart page.
     *  if user coming from home page and cart is empty then user will land on menu page.
     *  if user coming from home page and cart having some value then user will land on menu page.
     */
    let cart = JSON.parse(localStorage.getItem("cartItems"));
    let confirmOrderAtViewCart = getLocalStorage("confirmOrderAtViewCart");
    if (confirmOrderAtViewCart === true && cart.length > 0) {
      browserHistory.push(Url.VIEW_CART);
    } else if (confirmOrderAtViewCart === true && cart.length <= 0) {
      browserHistory.push(Url.MENU_PAGE);
    } else {
      browserHistory.push(Url.MENU_PAGE);
    }
    this.props.handleCarryoutDialog();
  }

  render() {
    return (
      <Modal
        isOpen={this.props.showCarryoutDialog}
        backdrop={this.state.backdrop}
        modalTransition={{ timeout: 700 }}
        backdropTransition={{ timeout: 1300 }}
        toggle={this.props.handleCarryoutDialog}
        className={`selected-store-modal carry-out-modal modal-dialog-bottom ${this.props.className}`}
      >
        <ModalBody className="pt-0">
          <div className="col-12 row mx-0 d-flex px-0">
            <FontIcon
              className="new-close material-icons col-12 pl-0 ml-2"
              color={"#000000"}
              onClick={this.props.handleCarryoutDialog}
            >
              x
            </FontIcon>

            <div className="col-2 col-sm-2 px-0 carryout-icon">
              <img src={addressIcon} alt="" className="img-fluid" />
            </div>
            <div className="col-10 col-sm-11 px-2">
              <span className="text-black-50">Address: </span>
              <p>
                {this.props.activeMarker.AddressLine1 &&
                  this.props.activeMarker.AddressLine1}
              </p>
            </div>
          </div>
          <div className="col-12 row mx-0 d-flex px-0">
            <div className="col col-sm-1 px-0 carryout-icon">
              <img src={timeIcon} alt="" className="img-fluid" />
            </div>
            <div className="col-10 col-sm-11 px-2">
              <span className="text-black-50">Opening hours: </span>
              <p>
                {this.props.activeMarker &&
                  this.props.activeMarker.operationTime &&
                  this.props.activeMarker.operationTime[0].day}
                &nbsp;&nbsp;
                {this.props.activeMarker &&
                  this.props.activeMarker.operationTime &&
                  this.props.activeMarker.operationTime[0].schedule}
              </p>
            </div>
          </div>
          <div className="col-12 row mx-0 d-flex px-0">
            <div className="col col-sm-1 px-0 carryout-icon">
              <img src={phoneIcon} alt="" className="img-fluid" />
            </div>
            <div className="col-10 col-sm-11 px-2">
              {" "}
              <span className="text-black-50">Phone number: </span>
              <p>
                {this.props.activeMarker &&
                  this.props.activeMarker.Phone &&
                  this.props.activeMarker.Phone}
              </p>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="row mx-0 col-12 px-0 text-center">
            <Button
              onClick={() => this.saveStoreLocator(this.props.activeMarker)}
              color=" "
              className="theme-btn big-btn col-12"
            >
              {this.context.t("ORDER TO THIS ADDRESS")}
            </Button>
          </div>{" "}
        </ModalFooter>
      </Modal>
    );
  }
}

SelectedStore.contextTypes = {
  t: PropTypes.func.isRequired
};

export default SelectedStore;
