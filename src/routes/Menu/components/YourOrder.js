import React from "react";
import { Url } from "config/Config";
import { Link } from "react-router";
import { CommaFormatted } from "../../../components/Helpers";
import PropTypes from "prop-types";

class YourOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    };
  }

  componentDidMount() {
    const cartItem = JSON.parse(localStorage.getItem("cartItems"));
    const page = JSON.parse(localStorage.getItem("page"));
    if (page != "ViewCart") {
      for (var i = 0; i < cartItem.length; i++)
        if (cartItem[i].id && cartItem[i].id === "DELVYFEE") {
          cartItem.splice(i, 1);
          localStorage.setItem("cartItems", JSON.stringify(cartItem));
          break;
        }
    }
  }
  render() {
    let orderedItems = {
      quantity: 0,
      amount: 0
    };
    let selectedProducts = JSON.parse(localStorage.getItem("cartItems"));
    selectedProducts.map(item => {
      orderedItems.quantity = orderedItems.quantity + item.quantity;
      orderedItems.amount = orderedItems.amount + item.price * item.quantity;
    });
    let loginDetails = JSON.parse(localStorage.getItem("receivedLoginDetail"));
    {
      this.loginDetails;
    }

    return (
      <div className="row your-order py-1 d-flex align-items-center">
        <div className="col-7 col-sm-5">
          <span className="total-items">{orderedItems.quantity} ITEMS</span>
          <h6 className="item-price mb-0">
            Rp. {CommaFormatted(Math.round(parseFloat(orderedItems.amount)))}
          </h6>
        </div>
        <div className="col-5 col-sm-3 text-right ml-auto">
          <Link
            to={{
              pathname:
                loginDetails === null ? Url.REGISTER_PAGE : Url.VIEW_CART,
              state: {
                page: "register"
              }
            }}
            className="theme-btn btn btn-box py-0 pr-0"
            onClick={() => this.setState({ clicked: true })}
          >
            {this.state.clicked ? "wait..." : this.context.t("YOUR ORDER")}
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
          </Link>
        </div>
      </div>
    );
  }
}
YourOrder.contextTypes = {
  t: PropTypes.func.isRequired
};
export default YourOrder;
