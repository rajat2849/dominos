import React from "react";
import "./pizzaTracker.scss";
import SearchBar from "./SearchBar";
import {
  getLocalStorage,
  saveSessionStorage,
  removeLocalStorage
} from "components/Helpers";
import TrackProgressBar from "./TrackProgressBar";
import TrackMap from "./TrackMap";
import {
  Row,
  Col,
  Form,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from "reactstrap";
import TrackerAlert from "./TrackerAlert";
import PropTypes from "prop-types";
import { browserHistory } from "react-router";
import { Url } from "config/Config";
import backImage from "../../../../public/newimages/backImage.png";
import Loader from "components/Loader";
import CancleAlert from "./CancleAlert";

class PizzaTracker extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleAlertBox = this.handleAlertBox.bind(this);
    this.fetching = true;
    this.state = {
      activeTab: "orderPlaced",
      progress: ["orderPlaced"],
      intervalId: "",
      orderReceived: false,
      searchError: true,
      updateMap: false,
      showModal: false,
      cancleModal: false
    };

    // branch.logEvent("Pizza Tracker Screen", function(err) {
    //   console.log(err);
    // });

    this.handleModal = this.handleModal.bind(this);
  }
  componentWillMount() {
    removeLocalStorage("cartItems");
    let orderData = getLocalStorage("orderConfirm");
    if (typeof orderData !== "undefined") {
      if (
        typeof orderData.order_id !== "undefined" &&
        orderData.order_id !== ""
      ) {
        this.setState({ orderReceived: true, cancleModal: false });
        // if (this.props.initialValues.search !== "") {
        //   this.handleSearch({ search: orderData.order_id });
        // }
        let page = getLocalStorage("page");
        if (page === "menu") {
          this.handleSearch({ search: orderData.order_id });
        }
      }
    }
  }

  componentWillReceiveProps(props) {
    if (
      typeof this.props.orderData.status == "undefined" ||
      this.props.orderData.status == "complete" ||
      this.props.orderData.status == "void"
    ) {
      clearInterval(this.state.intervalId);
    }
    if (props.fetching === false && this.fetching === true) {
      this.props.loadingImage(false);
      /*
       * update map as map using componentWillReceiveProps, this state is used
       * for shallow checking so that map can update data
       */
      setTimeout(() => {
        this.setState({ updateMap: true });
      }, 3000);
    }
    this.fetching = props.fetching;
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
    this.props.resetTrackerContent();
  }

  handleModal() {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  cancleHandleModal = () => {
    this.setState({
      cancleModal: false
    });
  };

  async handleSearch(value) {
    let inputValue = value.search;
    //if (typeof inputValue !== "undefined" && inputValue !== "") {
    this.setState({ searchError: false });
    let orderData = getLocalStorage("orderConfirm");
    if (typeof orderData !== "undefined") {
      if (
        typeof orderData.order_id !== "undefined" &&
        orderData.order_id !== ""
      ) {
        if (
          orderData.order_id == inputValue ||
          orderData.email == inputValue ||
          orderData.phone == inputValue
        ) {
          inputValue = orderData.order_id;
        }
      }
      //}
      saveSessionStorage("trackerInput", inputValue);
      this.props.loadingImage(true);
      await this.props.setOrderTrackerDetails();
      if (
        typeof this.props.orderData.status !== "undefined" &&
        this.props.orderData.status !== "complete" &&
        !_.isEmpty(this.props.orderData)
      ) {
        if (this.props.orderData.status === "out_for_delivery") {
          let intervalId = setInterval(this.props.setOrderTrackerDetails, 5000);
          this.setState({ intervalId: intervalId });
        } else {
          let intervalId = setInterval(
            this.props.setOrderTrackerDetails,
            1000 * 60
          );
          this.setState({ intervalId: intervalId });
        }
      }
    } else {
      this.setState({ searchError: true });
    }
    if (this.props.showAlert === true) {
      this.setState({
        showModal: true
      });
    }
    if (this.props.orderData.status === "void") {
      this.setState({
        cancleModal: true
      });
    }
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  }

  handleAlertBox() {
    this.props.resetAlertBox(false, "");
  }
  render() {
    const orderData = getLocalStorage("orderConfirm");
    return (
      <div className="col-12 px-0">
        {this.props.fetching === true && (
          <Loader loading={this.props.fetching} />
        )}
        {this.state.showModal &&
          this.state.searchError === false &&
          this.props.fetching === false &&
          this.props.alertMessage === "Order not found" && (
            <TrackerAlert
              handleModal={this.handleModal}
              header="Sorry"
              message="Order Not found"
            />
          )}

        {this.state.cancleModal && (
          <CancleAlert
            cancleHandleModal={this.cancleHandleModal}
            header="Sorry"
            message="Order Cancelled"
          />
        )}
        <header className="track hm-header text-center fixed-top">
          <div className="row d-flex align-items-center px-3 mx-0">
            <div className="col-2 back-icon px-0 text-left">
              <img
                onClick={() => browserHistory.push(Url.DASHBOARD)}
                src={backImage}
                className="mx-auto img-fluid"
              />
            </div>
            <div className="col-auto hm-title">
              {this.context.t("Track Current Order")}
            </div>
          </div>
        </header>
        <SearchBar
          {...this.props}
          initialValues={
            this.props.initialValues.search !== ""
              ? this.props.initialValues
              : { search: orderData.order_id }
          }
          handleSearch={this.handleSearch}
          searchError={this.state.searchError}
          handleModal={this.handleModal}
        />
        <div className="col-12">
          <Row>
            <div className="col-12 col-sm-12 col-xl-12 pizza-tracker">
              <Row>
                {/* <TrackMap {...this.props} /> */}
                <TrackProgressBar
                  {...this.props}
                  toggle={this.toggle}
                  orderData={this.props.orderData}
                />
              </Row>
              {(this.state.orderReceived ||
                !_.isEmpty(this.props.orderData)) && (
                <div className="col-xl-12 col-sm-12 col-12  menu-wrapper px-0">
                  <TabContent activeTab={this.state.activeTab} className="my-4">
                    <TabPane
                      tabId={this.state.activeTab}
                      className="tab-item"
                    ></TabPane>
                  </TabContent>
                </div>
              )}
            </div>
          </Row>
        </div>
      </div>
    );
  }
}
PizzaTracker.contextTypes = {
  t: PropTypes.func.isRequired
};
export default PizzaTracker;
