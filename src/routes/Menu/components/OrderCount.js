import React from "react";
import { Link } from "react-router";
import { Url } from "config/Config";
import editIcon from "../../../../public/newimages/edit-black.png";
import rectangleIcon from "../../../../public/newimages/Rectangle 1111.png";
import incIcon from "../../../../public/newimages/inc.png";
import decIcon from "../../../../public/newimages/dec.png";
import MenuAlert from "./MenuAlert";
import { browserHistory } from "react-router";
import {
  getLocalStorage
} from "components/Helpers";
import { get } from 'lodash';
import EmptyCart from "./QunatityModal"


class OrderCount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showRemoveModal: false,
      maxItemReached:""

    };
  }

  checkItemLimit = () => {
    const limitData = getLocalStorage("configurationData")
    const cartItems = JSON.parse(localStorage.getItem("cartItems"));
    const maxItem = _.get(limitData , "max_item.data.limit" , "")
    const msg = _.get(limitData , "max_item.msg.en" , "")

    let cartQuantity = 0;
    if(cartItems.length > 0){
      cartItems.forEach(item => {
        cartQuantity = cartQuantity + item.quantity
      })
    } 
    if(cartQuantity >= maxItem) {
      this.setState({
        maxItemReached : msg
      })
      return false;
    } else {
      this.setState({
        maxItemReached : ""
      })
      return true;
    }
  }

  onClickAdd(selectedProducts) {
    const status = this.checkItemLimit();
    if(status) {
    this.props.addToCart(
      this.props.category,
      this.props.item,
      selectedProducts,
      this.props.product,
      false,
      this.props.toppings
    );
  }
  }

  onClickSubtract(selectedProducts, quantity) {
    if (
      this.props.fromPizza ||
      this.props.fromPromotion ||
      this.props.fromPaketHemat
    ) {
      quantity === 1
        ? this.props.removeCart(
            this.props.category,
            this.props.item,
            selectedProducts,
            this.props.product,
            false,
            this.props.toppings
          )
        : this.setState({
            showRemoveModal: true
          });
    } else {
      this.props.removeCart(
        this.props.category,
        this.props.item,
        selectedProducts,
        this.props.product,
        false,
        this.props.toppings
      );
    }
  }

  open = (itemType, quantity) => {
    if (quantity > 1) {
      this.setState({
        showModal: true
      });
    } else {
      let pathname = "";
      let state = {};
      if (itemType === "pizza") {
        pathname = `${Url.TOPPINGS}/${this.props.product.url_key}`;
        state = {
          product: this.props.product,
          fromMenu: true
        };
      } else if (itemType === "promotion") {
        pathname = `${Url.NEW_PROMOTION_DETAIL}/${this.props.item.url_key}`;
        state = {
          item: this.props.item,
          sku: this.props.item.sku,
          fromMenu: true
        };
      } else if (itemType === "paketHamet") {
        pathname = `${Url.NEW_PAKET_HEMAT}/${this.props.item.url_key}`;
        state = {
          item: this.props.item,
          sku: this.props.item.sku,
          fromMenu: true
        };
      }

      browserHistory.push({
        pathname: pathname,
        state: state
      });
    }
  };

  close = () => {
    this.setState({
      showModal: false,
      showRemoveModal: false
    });
  };

  render() {
    let quantity = 0;
    let selectedProducts = JSON.parse(localStorage.getItem("cartItems"));
     const restrictedCoupons =JSON.parse(localStorage.getItem("restrictedCoupon"));
     const res = get(restrictedCoupons,'[0]',[])
    for (let i = 0; i < selectedProducts.length; i++) {
      //this.props.item.sku===selectedProducts[i].id
      //this.props.product.sku===selectedProducts[i].product.sku
      if (this.props.category === "pizza") {
        if (
          selectedProducts[i].product &&
          this.props.product.sku === selectedProducts[i].product.sku
        ) {
          quantity = quantity + selectedProducts[i].quantity;
        }
      } else {
        if (this.props.item.sku === selectedProducts[i].id) {
          quantity = quantity + selectedProducts[i].quantity;
        }
      }
    }
    return (
      <div className="text-right row mx-0">
        {this.state.showModal && (
          <MenuAlert
            header={"Edit item from cart"}
            message={
              "This item has multiple customizations. Proceed to cart to edit item?"
            }
            showModal={this.state.showModal}
            close={this.close}
          />
        )}

{this.state.maxItemReached && (
        <EmptyCart message ={this.state.maxItemReached} successHandler = {() =>  this.setState({
          maxItemReached : ""
        })}/>
)}

        {this.state.showRemoveModal && (
          <MenuAlert
            header={"Remove item from cart"}
            message={
              "This item has multiple customizations. Proceed to cart to remove item?"
            }
            showRemoveModal={this.state.showRemoveModal}
            close={this.close}
          />
        )}

        

        {this.props.fromPizza === true && (
          <div
            onClick={() => this.open("pizza", quantity)}
            className="col-3 px-0 edit-icon edit-icon-img-div"
          >
            <div className="edit-icon-img">
              <img src={editIcon} alt="edit" title="edit" className="img-fluid" />
            </div>
          </div>
        )}

        {this.props.fromPromotion === true && (
          <div
            onClick={() => this.open("promotion", quantity)}
            className="col-3 px-0 edit-icon"
          >
            <img src={editIcon} alt="edit" title="edit" className="img-fluid" />
          </div>
        )}

        {this.props.fromPaketHemat === true && (
          <div
            onClick={() => this.open("paketHamet", quantity)}
            className="col-3 px-0 edit-icon"
          >
            <img src={editIcon} alt="edit" title="edit" className="img-fluid" />
          </div>
        )}
        <div className = {(this.props.fromPizza === true || this.props.fromPromotion === true || this.props.fromPaketHemat === true) ? 'col-7 col-sm-8 row mx-0 px-0 item-increase mr-1 ml-auto' : 'col-12 col-sm-8 row mx-0 px-0 item-increase mr-1 ml-auto'}>
          <div
            className="col-4 decrease-icon"
            onClick={() => this.onClickSubtract(selectedProducts, quantity)}
          >
           <img src={decIcon} alt="edit" title="edit" className="img-fluid" />
          </div>
          <div className="col-4 item-count">{quantity}</div>
          {(res.length > 0 && restrictedCoupons[0].indexOf(this.props.item.sku) <= -1) ? <div
            className="col-4 increase-icon"
            onClick={() => this.onClickAdd(selectedProducts)}
          >
           <img src={incIcon} alt="edit" title="edit" className="img-fluid" />
          </div> : <div
            className="col-4 increase-icon disabledButton"
            
          >
            +
          </div> }
        
        
        </div>
      </div>
    );
  }
}

export default OrderCount;
