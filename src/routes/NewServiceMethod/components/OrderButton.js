import React from "react";
import { Button } from "reactstrap";
import { Url } from "config/Config";
import { Link } from "react-router";
import PropTypes from "prop-types";

class OrderButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Link className="col-6" to={Url.DASHBOARD}>
          <Button variant="contained" color="primary" className="carryBts">
            {this.context.t("ORDER TO THIS ADDRESS")}
          </Button>
        </Link>
      </div>
    );
  }
}

Delivery.contextTypes = {
  t: PropTypes.func.isRequired
};

export default OrderButton;
