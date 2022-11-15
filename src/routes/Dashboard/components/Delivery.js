import React from "react";
import { Link } from "react-router";
import PropTypes from "prop-types";
import { Url } from "config/Config";
import delivery from "../../../../public/newimages/delivery.png";


class Delivery extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-12 pb-3 border">
        <div className="row bannerBtn pb-3 text-left">
          <div className="col-6 pr-2">
            <Link
              onClick={this.props.confirmOrder}
              className="freeBts font-weight-bold btn col-12 px-2 d-flex align-items-center text-uppercase"
              to={{
                pathname: this.props.loginDetails === null  ? Url.REGISTER_PAGE : Url.NEW_SERVICE_METHOD,
                state: {
                  page: "delivery"
                },
              }}
            >
              <div className="row mx-0 align-items-center col-12 px-0">
                <div className="col-2 px-0">
                  <img
                    className="btn-image img-fluid mr-2"
                    src={delivery}
                    alt="icon"
                  />
                </div>
                <div className="col-10 px-0 text-center">
                  <span className="d-inline-flex">Free Delivery</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

Delivery.contextTypes = {
  t: PropTypes.func.isRequired
};

export default Delivery;
