import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// import { Link } from 'react-router';
// import {Url} from 'config/Config';
// import addressIcon from '../../../../public/newimages/track.png';
// import timeIcon from '../../../../public/newimages/clock.png';
// import phoneIcon from '../../../../public/newimages/phone-icon.png';
import { browserHistory } from "react-router";
import { formatPrice, getPrice } from "../../../lib/Util";
import { Url } from "config/Config";
import "./ViewCart.scss";
import {
  saveLocalStorage,
  getLocalStorage,
  removeLocalStorage
} from "components/Helpers";

class OrderModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
      backdrop: false
    };

    this.toggle = this.toggle.bind(this);
    this.addTax = this.addTax.bind(this);
  }

  toggle() {
    this.setState({
      modal: false
    });
    browserHistory.push(Url.MENU_PAGE);
    // removeLocalStorage("orderFailed");
    // this.props.replaceOrder();
    // this.props.loadingImage(false);
  }

  addTax() {
    this.setState({
      modal: false
    });
    this.props.getTaxData();
    // let category = "tax";
    // this.props.addToCart(
    //   category,
    //   this.props.taxData,
    //   this.props.taxData,
    //   this.props.taxData,
    //   false,
    //   this.props.totalToppings
    // );
    setTimeout(() => {
      const cartItem = JSON.parse(localStorage.getItem("cartItems"));
      let category = "tax";
      let items = this.props.taxData;
      const obj = {
        id: items.sku,
        quantity: 1,
        price: items.price,
        thumbnail:items.thumbnail,
        baseimage:items.baseimage,
        description: "No Available",
        name_en: items.name,
        item: {
          url_key: items.urlkey,
          id: items.sku,
          type: "simple",
          thumbnail:items.thumbnail,
           
          name_en: items.name,
          description_en: items.description,
          description_idn: items.description,
          category: category,
          sku: items.sku
        },
        [items.id + "_" + "tax"]: {
          qty: 1,
          topping: "",
          type: "simple",
          parent_sku: "DELVYFEE"
        }
      };
      cartItem.push(obj);
      localStorage.setItem("cartItems", JSON.stringify(cartItem));
      this.props.taxToggle();
         const taxes = JSON.parse(localStorage.getItem("showTax"));
        this.props.setDelivery(false)
    });
  }

  render() {
    const lang = getLocalStorage("siteLanguage");
    return (
      <Modal
        isOpen={this.state.modal}
        modalTransition={{ timeout: 700 }}
        backdropTransition={{ timeout: 1300 }}
        toggle={this.toggle}
        className={`selected-store-modal modal-dialog-center ${this.props.className}`}
        backdrop={this.state.backdrop}
      >
        {/* <ModalHeader className="border-bottom-0"></ModalHeader> */}
        <ModalBody>
          {lang === "en" ? this.props.message : this.props.messageId}
        </ModalBody>
        <ModalFooter className="border-top-0">
          <Button
            onClick={this.toggle}
            color=" "
            className="theme-btn big-btn col-5"
          >
            No
          </Button>
          <Button
            onClick={this.addTax}
            color=" "
            className="theme-btn big-btn col-5 mr-3"
          >
            Yes
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default OrderModal;
