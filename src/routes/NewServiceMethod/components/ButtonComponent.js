import React from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col
} from "reactstrap";
import DeliveryDetail from "./DeliveryDetail";
import CarryOutForm from "./CarryOutForm";
import PropTypes from "prop-types";
import classnames from "classnames";
import { saveLocalStorage } from "../../../components/Helpers";

class ButtonComponent extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: props.page === "delivery" ? "1" : "2"
    };
  }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState(
        {
          activeTab: tab
        },
        () => this.setDeliveryType(this.state.activeTab)
      );
    }
    if (tab === "1") {
      this.props.toggle(false);
    }
    if (tab === "2") {
      this.props.getStoreLocation();
      this.props.toggle(true);
    }
  }

  componentWillMount() {
    this.setDeliveryType(this.state.activeTab);
  }

  setDeliveryType(tab) {
    const deliveryType = tab === "1" ? "Delivery" : "Carryout";
    const page = tab === "1" ? "delivery" : "carryout";
    const order = { deliveryType: deliveryType };
    saveLocalStorage("order", order);
    this.props.setPage(page);
  }

  render() {
    return (
      <Row className="mx-0">
        <div className="col-12 px-0 custom-tabs">
          <Row className="mx-0">
            {/* <div className="col-12 px-0">
              <Nav tabs>
                <NavItem className="col-6 px-0 text-center">
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "1"
                    })}
                    onClick={() => {
                      this.toggle("1");
                    }}
                  >
                    Free Delivery
                  </NavLink>
                </NavItem>
                <NavItem className="col-6 px-0 text-center">
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "2"
                    })}
                    onClick={() => {
                      this.toggle("2");
                      this.props.toggle(true);
                    }}
                  >
                    Takeaway
                  </NavLink>
                </NavItem>
              </Nav>
            </div> */}
            <TabContent activeTab={this.state.activeTab} className="col-12">
              <TabPane tabId="1">
                <Row>
                  <Col sm="12" className="px-0 mt-1">
                    <DeliveryDetail
                      centerPoint={this.props.centerPoint}
                      isMarkerShown
                      markers={this.props.markers}
                      onSubmit={this.props.onSubmit}
                      fetchAddress={this.props.fetchAddress}
                      selectAddress={this.props.selectAddress}
                      surveyAddress={this.props.surveyAddress}
                      deliveryAddress={this.props.deliveryAddress}
                      showDeliveryForm={this.props.showDeliveryForm}
                      isSelectValue={this.props.isSelectValue}
                      selectedValue={this.props.selectedValue}
                      userAddress={this.props.userAddress}
                      saveStoreLocator={this.props.saveStoreLocator}
                      markers={this.props.markers}
                      fetching={this.props.fetching}
                      inputvalue={this.props.inputvalue}
                      showMenu={this.props.showMenu}
                      selectedValue={this.props.selectedValue}
                      userMarkerChanged={this.props.userMarkerChanged}
                      checkStoreAvaliability={this.props.checkStoreAvaliability}
                      handleMapDialog={this.props.handleMapDialog}
                      showDeliveryDialog={this.props.showDeliveryDialog}
                      surveyAddressFetching={this.props.surveyAddressFetching}
                      userAddressHeading={this.props.userAddressHeading}
                      showMap={this.props.showMap}
                      toggle={this.props.toggle}
                      setUserAddressFromSelectedAddress={
                        this.props.setUserAddressFromSelectedAddress
                      }
                      checkUserNearestStore={this.props.checkUserNearestStore}
                      filterAddress={this.props.filterAddress}
                      getCustomerDeliveryAddress={
                        this.props.getCustomerDeliveryAddress
                      }
                      customerAddress={this.props.customerAddress}
                      handleAddressList={this.props.handleAddressList}
                      showAddressList={this.props.showAddressList}
                      showLoader={this.props.showLoader}
                      loaderShow={this.props.loaderShow}
                      resetAlertBox={this.props.resetAlertBox}
                    />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="2" className="pt-4">
                <Row>
                  <Col sm="12" className="mt-1">
                    <CarryOutForm
                      storeLocations={this.props.storeLocations}
                      handleChangeLocation={this.props.handleChangeLocation} //state
                      isMarkerShown
                      markers={this.props.markers}
                      centerPoint={
                        !_.isEmpty(this.props.markerCenterPoint)
                          ? this.state.markerCenterPoint
                          : this.props.centerPoint
                      }
                      saveStoreLocator={this.props.saveStoreLocator} //state
                      handleInfoWindow={this.props.handleInfoWindow} //state
                      zoom={this.props.zoom !== "" ? this.props.zoom : 12.5}
                      userNearestMarker={this.props.userNearestMarker}
                      showNearestStore={this.props.showNearestStore}
                      closeNearestInfo={this.props.closeNearestInfo} //state
                      activeMarker={this.props.activeMarker}
                      showMap={this.props.showMap}
                      getLocation={this.props.getLocation}
                      fetchStore={this.props.fetchStore}
                      handleCarryoutDialog={this.props.handleCarryoutDialog}
                      showCarryoutDialog={this.props.showCarryoutDialog}
                      getUserNearestStore={this.props.getUserNearestStore}
                      page={this.props.page}
                    />
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </Row>
        </div>
      </Row>
    );
  }
}

ButtonComponent.contextTypes = {
  t: PropTypes.func.isRequired
};
export default ButtonComponent;
