import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Collapse, Button, Card } from "reactstrap";

import "./pizzaTracker.scss";
import GpsTracker from "./GpsTracker";
// import OpenArrow from '../../../../public/open-Arrow.png'
// import CloseArrow from '../../../../public/close-arrow.png'
import _ from "lodash";
import DefaultDriverIcon from "../../../../public/tracker_default.png";
// import Timer from './Timer';
// import moment from 'moment';
// import CallButton from './CallButton';

class TrackerContent extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      collapse: true
    };
  }

  onEntered() {
    this.setState({ status: "Open" });
  }

  onExited() {
    this.setState({ status: "Close" });
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    return (
      <Row>
        <div className="col-12 content-collpase-box">
          <Button
            className="col-12 col-sm-12 col-xl-12 btn-collapse px-0 mb-2 f-14"
            onClick={this.toggle}
            style={{ marginBottom: "1rem" }}
          >
            {this.state.status}
            <span className="date-time-box col pl-2 text-red">
              {this.context.t("WHERE IS MY PIZZA")}?
            </span>
          </Button>
          <Collapse
            className="col-12 col-sm-12 col-xl-12 py-2 px-0"
            isOpen={this.state.collapse}
          >
            <Card className="col-12 col-sm-12 col-xl-12 py-3">
              <div className="col-12 col-sm-12 col-xl-12 text-center py-0 px-0">
                {this.props.orderData.shipping_method === "Carryout" && (
                  <div className="col-12 col-sm-12 col-xl-12 text-center">
                    <p className="m-0 f-14">
                      {this.props.orderData.order_date}
                    </p>
                    <p className="m-0 f-12">{this.props.orderData.address}</p>
                    <p className="m-0 f-12">
                      {this.props.orderData.label_status}
                    </p>
                  </div>
                )}
                {this.props.orderData.shipping_method === "Delivery" && (
                  <Row>
                    <div></div>
                    <Col xs="12" sm="12" xl="12" className="px-2">
                      <div className="status-box text-left">
                        <Row className="m-0">
                          <Col className="status-wrapper col-8 col-sm-8 col-xl-8 px-0">
                            <h6 className=" col-12 col-sm-12 col-xl-12 f-10 px-0 mb-0 text-uppercase">
                              <span className="status-box-heading">
                                {this.context.t("Status order")} :
                              </span>
                              <span className="order-status">
                                {" "}
                                {typeof this.props.orderData.label_status !==
                                "undefined"
                                  ? this.props.orderData.label_status
                                  : ""}
                              </span>
                            </h6>
                            <p className="f-10 col-12 col-sm-12 col-xl-12 mb-3 px-0">
                              {this.context.t(
                                "Track your order from the store to your door"
                              )}
                              .
                            </p>
                            <h6 className=" col-12 col-sm-12 col-xl-12 f-10 px-0 mb-0 text-uppercase">
                              <span className="status-box-heading">
                                {this.context.t("Tracking Code")} :
                              </span>
                              <span className="order-status">
                                {" "}
                                {typeof this.props.orderData.order_id !==
                                "undefined"
                                  ? this.props.orderData.order_id
                                  : ""}
                              </span>
                            </h6>
                            <h6 className=" col-12 col-sm-12 col-xl-12 f-10 px-0 mb-0 text-uppercase">
                              <span className="status-box-heading">
                                {this.context.t("order placed")} :
                              </span>
                              <span className="order-status">
                                {" "}
                                {typeof this.props.orderData.order_date !==
                                "undefined"
                                  ? this.props.orderData.order_date
                                  : ""}
                              </span>
                            </h6>
                          </Col>
                          <Col className="status-wrapper col-4 col-sm-4 col-xl-4 px-0">
                            <Col className="deliver-timer-box col-12 col-sm-12 col-xl-12 f-12 px-0 text-center">
                              {typeof this.props.orderData.status !==
                                "undefined" &&
                                this.props.orderData.status ===
                                  "out_for_delivery" && (
                                  <Row>
                                    <p className="time-box mb-0 col-12"></p>
                                  </Row>
                                )}
                            </Col>
                            <Col className="rider-detail-box col-12 col-sm-12 col-xl-12 f-10 px-1 text-center">
                              <span className="rider-detail text-uppercase">
                                {this.context.t("Rider name")} :
                              </span>
                              <p className="rider-name mb-0">
                                {" "}
                                {typeof this.props.orderData.driver_name !==
                                "undefined"
                                  ? this.props.orderData.driver_name
                                  : ""}
                              </p>
                              <p className="rider-photo mb-0">
                                <img
                                  className="rider-image"
                                  src={
                                    typeof this.props.orderData.driver_name !==
                                    "undefined"
                                      ? DefaultDriverIcon
                                      : ""
                                  }
                                />
                              </p>
                            </Col>
                          </Col>
                        </Row>
                      </div>
                      <div className="gps-tracker-map col-12">
                        <GpsTracker
                          orderData={this.props.orderData}
                          updateMap={this.props.updateMap}
                        />
                      </div>
                    </Col>
                  </Row>
                )}
              </div>
            </Card>
          </Collapse>
        </div>
      </Row>
    );
  }
}

TrackerContent.propTypes = {};

TrackerContent.contextTypes = {
  t: PropTypes.func.isRequired
};

export default TrackerContent;
