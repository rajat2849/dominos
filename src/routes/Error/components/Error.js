import React from "react";
import PropTypes from "prop-types";
import { browserHistory } from "react-router";
import Alert from "components/Alert";
import { Url } from "config/Config";
import InnerHeader from "components/InnerHeader";
import Loader from "components/Loader";

class Errors extends React.Component {
  constructor(props) {
    super(props);
    this.handleAlertBox = this.handleAlertBox.bind(this);
    // branch.logEvent("online payment", function(err) {
    //   console.log(err);
    // });
  }

  componentWillMount() {
    this.props.onlineOrderResponse();
  }

  handleAlertBox() {
    this.props.resetAlertBox(false, "");
    if (this.props.isPgPaymentFailed) {
      browserHistory.push(Url.MENU_PAGE);
    }
  }

  render() {
    return (
      <div className="col-12 px-0">
        {/* <InnerHeader to={Url.HOME_PAGE} /> */}
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
          user={this.props.user}
        />
        <Loader loading={this.props.placingOrder} />
      </div>
    );
  }
}

Errors.propTypes = {};

export default Errors;
