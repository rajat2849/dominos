import React from "react";
import PropTypes from "prop-types";
import { saveLocalStorage, getLocalStorage } from "components/Helpers";
import _ from "lodash";
import Alert from "components/Alert";
import ButtonComponent from "./ButtonComponent";
import "./Delivery.scss";
import { browserHistory } from "react-router";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { Url } from "config/Config";
import NewHeader from "../../../../src/components/NewHeader";
import searchIcon from "../../../../public/newimages/search-icon.png";
import mapIcon from "../../../../public/newimages/map-icon.png";

class Delivery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputvalue: "",
      selectedAddressValue: "",
      userCurrentLat: "",
      userCurrentLng: "",
      loader: false,
      showDeliveryDialog: true,
      showCarryoutDialog: false,
      page:
        props.location.state && props.location.state.page === "carryout"
          ? "carryout"
          : "delivery",
      storeView: "map",
      activeInfoWindow: "",
      activeMarker: {},
      currentAreaId: "",
      markerCenterPoint: {},
      zoom: "",
      showNearestStore: false,
      isToggleOn: false,
      showMap:
        props.location.state && props.location.state.page === "carryout"
          ? true
          : false,
      showAddressList: true
    };
    this.fetchAddress = this.fetchAddress.bind(this);
    this.selectAddress = this.selectAddress.bind(this);
    this.submitAddressDetail = this.submitAddressDetail.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.userMarkerChanged = this.userMarkerChanged.bind(this);
    this.checkStoreAvaliability = this.checkStoreAvaliability.bind(this);
    this.handleMapDialog = this.handleMapDialog.bind(this);
    this.handleAlertBox = this.handleAlertBox.bind(this);
    this.handleChangeLocation = this.handleChangeLocation.bind(this);
    this.saveStoreLocator = this.saveStoreLocator.bind(this);
    this.handleInfoWindow = this.handleInfoWindow.bind(this);
    this.closeNearestInfo = this.closeNearestInfo.bind(this);
    this.toggle = this.toggle.bind(this);

    // branch.logEvent("Service Method", function(err) {
    //   console.log(err);
    // });
  }

  toggle(value) {
    this.setState({
      showMap: value
    });
    // ,() =>
    //     this.state.showMap === true &&
    //     this.state.page === "delivery" &&
    //     this.checkStoreAvaliability(this.props.centerPoint)
  }

  setPage = value => {
    this.setState({
      page: value
    });
  };

  componentWillMount() {
    //this.props.getStoreLocation();
    /*
     * Google tag manager
     */
    const tagManagerData = {
      event: "Pageview",
      url: window.location.pathname
    };
    window.dataLayer.push(tagManagerData);
    let lat = 1;
    let lng = 1;
    this.props.loadingImage(true);
    this.props.resetSurveyAddressArray();
    let promise = new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(position => {
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        this.setState({
          userCurrentLat: position.coords.latitude,
          userCurrentLng: position.coords.longitude
        });
        //this.setState({userCurrentLat: -6.20847966808014, userCurrentLng: 106.82255744934082})
        // this.setState({userCurrentLat: -6.311333, userCurrentLng: 106.7546})
        resolve(position);
      },
      error => {
        resolve(error);
        this.setState({ loader: false });
        /*this.props.resetAlertBox(
          true,
          this.context.t(
            "Oops! we could not detect your location. Please type your address."
          )
        );*/
      },
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 });
    });
    promise.then(async () => {
      //this.state.page === "delivery" &&
      // await this.props.setAddressByLatLng
      //   this.state.userCurrentLat,
      //   this.state.userCurrentLng
      // );
      this.props.loadingImage(false);
      this.state.page === "carryout" && this.props.getStoreLocation();
      this.props.getUserNearestStore(lat, lng);
      // this.state.page==="delivery" && !this.state.showAddressList && this.checkUserNearestStore({
      //   lat: this.state.userCurrentLat,
      //   lng: this.state.userCurrentLng
      // });
    });
  }

  componentWillReceiveProps(props) {
    if (
      typeof props.storeDetail !== "undefined" &&
      !_.isEmpty(props.storeDetail)
    ) {
      this.setState({ inputvalue: props.userAddress });
      props.setFormprops(props.userAddress);
      this.handleInfoWindow(props.nearestMarker);
      this.props.loadingImage(false);
    } else if (props.loaderFlag) {
      props.loadingImage(true);
      props.setLoadingFlag(false);
    }
  }

  componentWillUnmount() {
    this.props.resetFormprops();
    this.props.resetSurveyAddressArray();
  }

  async userMarkerChanged(lat, lng) {
    this.setState({ showDeliveryDialog: true });
    this.setState({ userCurrentLat: lat, userCurrentLng: lng });
    await this.props.setAddressByLatLng(lat, lng);
  }

  checkStoreAvaliability(position) {
    this.props.loadingImage(true);
    position !== undefined
      ? this.props.setUserNearestStore(position.lat, position.lng)
      : this.props.setUserNearestStore(-6.1772843, 106.800065);
    this.setState({
      showDeliveryDialog: true
    });
  }

  checkUserNearestStore = (position, callback, item) => {
   
    this.props.loadingImage(true);
    this.props.setUserNearestStore(position.lat, position.lng, callback, item);
     if(item.entity_id != '' || item.entity_id != undefined){
       saveLocalStorage("entity_id",item.entity_id)
     }
     saveLocalStorage("takeawayDetail",position);
     browserHistory.push(Url.MENU_PAGE);
  };


  setUserAddressFromSelectedAddress = data => {
    saveLocalStorage("choosenAddress", {});
    if (typeof data.address_components !== "undefined") {
      const latLng = data.geometry.location;
      this.setState({ showDeliveryDialog: true });
      let addressHeading = data.name;
      let address =
        data.name !== undefined
          ? data.name + " " + data.formatted_address
          : data.formatted_address;
      this.props.setGeoUserAddress(address, addressHeading);
      this.setState({
        userCurrentLat: latLng.lat(),
        userCurrentLng: latLng.lng()
      });
      this.props.setGeoCenterPoint({ lat: latLng.lat(), lng: latLng.lng() });
      saveLocalStorage("choosenAddress", data);
    }
  };

  filterAddress = result => {
    let returnData = {};
    if (typeof result.address_components !== "undefined") {
      let data = result.address_components;

      data.forEach((row, index) => {
        if (typeof row.types !== "undefined") {
          if (row.types.indexOf("floor") !== -1) {
            returnData.floor = data[index];
          }

          if (row.types.indexOf("premise") !== -1) {
            returnData.premise = data[index];
          }

          if (row.types.indexOf("subpremise") !== -1) {
            returnData.subpremise = data[index];
          }

          if (row.types.indexOf("neighborhood") !== -1) {
            returnData.neighborhood = data[index];
          }

          if (row.types.indexOf("route") !== -1) {
            returnData.route = data[index];
          }

          if (row.types.indexOf("street_number") !== -1) {
            returnData.street_number = data[index];
          }

          if (row.types.indexOf("street_address") !== -1) {
            returnData.street_address = data[index];
          }
        }
      });
    }

    return returnData;
  };

  submitAddressDetail(address) {
    this.props.loadingImage(true);
    let user = !_.isEmpty(getLocalStorage("user"))
      ? getLocalStorage("user")
      : {};
    let userSelectedAddress = {};
    userSelectedAddress = {
      address:
        this.props.selectedValue !== ""
          ? this.props.selectedValue
          : address.place,
      floor: address.floor ? address.floor : "",
      kavnumber: address.kavnumber ? address.kavnumber : "",
      substreet: address.substreet ? address.substreet : "",
      tower: address.tower ? address.tower : "",
      unit: address.unit ? address.unit : "",
      type: address.type ? address.type : ""
    };
    user.address = userSelectedAddress;
    saveLocalStorage("user", user);
    saveLocalStorage("deliveryAddress", user);
    this.props.loadingImage(false);
    let login = getLocalStorage("receivedLoginDetail");
    if (typeof login.customer_id !== "undefined" && login.customer_id !== "") {
      this.props.addDeliveryAddress(userSelectedAddress);
    } else {
      /*
       *  Set of rules that define how user will land on menu or cart page.
       *  if user coming from cart page and cart is empty then user will land on menu page.
       *  if user coming from cart page and cart having some item then user will land on cart page.
       *  if user coming from home page and cart is empty then user will land on menu page.
       *  if user coming from home page and cart having some value then user will land on menu page.
       */
      //let cart = getLocalStorage('cartItems');
      let cart = localStorage.getItem("cartItems");
      let confirmOrderAtViewCart = getLocalStorage("confirmOrderAtViewCart");
      if (confirmOrderAtViewCart === true && cart.length > 0) {
        browserHistory.push(Url.VIEW_CART);
      } else if (confirmOrderAtViewCart === true && cart.length <= 0) {
        browserHistory.push(Url.MENU_PAGE);
      } else {
        browserHistory.push(Url.MENU_PAGE);
      }
    }
  }

  fetchAddress(address) {
    this.setState({ inputvalue: address });
    address !== "" && this.props.fetchSurveyAddress(address);
  }

  selectAddress(address) {
    let storeDetail = {};
    if (address != "address not found") {
      this.setState({ selectedAddressValue: address });
      this.setState({ inputvalue: address });
      this.props.setFormprops(address);
      let selectedAddress = address.split(",");
      let selectedAddressId = selectedAddress[selectedAddress.length - 1];
      this.props.surveyAddress.map((storeAddress, index) => {
        /*
         *  it seems that selectedAddressId may be matched in multiple survey_address.
         *  for now we are going to forward. need to be checked later.
         */
        if (storeAddress.survey_address.indexOf(selectedAddressId) > 0) {
          storeDetail = storeAddress;
        }
      });
      saveLocalStorage("storeDetail", storeDetail);
    }
  }

  componentDidMount() {
    this.props.loadingImage(true);
  }

  showMenu() {
    if (empty(this.props.surveyAddress)) {
      return "{'none'}";
    }
  }

  handleMapDialog() {
    this.setState({ showDeliveryDialog: false });
  }

  handleCarryoutDialog = () => {
    this.setState({
      showCarryoutDialog: false
    });
  };

  handleAlertBox() {
    this.props.resetAlertBox(false, "");
    this.setState({ inputvalue: "" });
  }

  handlePage(page) {
    this.setState({
      page: page
    });
  }

  handleChangeLocation(obj) {
    this.setState({ showNearestStore: false });
    this.props.resetNearestMarker();
    this.handleMapDialog();
    let areaId = obj.id;
    let lat = "";
    let lng = "";

    if (typeof areaId !== "undefined" && areaId !== "undefined") {
      let address = "";
      this.props.storeLocations.map(function(item, index) {
        if (item.id == areaId) {
          address = item.name;
        }
      });
      geocodeByAddress(address)
        .then(results => getLatLng(results[0]))
        .then(latLng => {
          if (areaId == 7) {
            lat = -8.670458;
            lng = 115.212629;
          } else {
            lat = latLng.lat;
            lng = latLng.lng;
          }

          this.props.getNearestStores(lat, lng, areaId, this.state.page);
          this.props.setAddressByLatLng(lat, lng);
        })
        .catch(error => console.error("Error", error));
    }
  }

  saveStoreLocator(storeDetails) {
    
    saveLocalStorage("store", storeDetails);
    /*
     *  Set of rules that define how user will land on menu or cart page.
     *  if user coming from cart page and cart is empty then user will land on menu page.
     *  if user coming from cart page and cart having some item then user will land on cart page.
     *  if user coming from home page and cart is empty then user will land on menu page.
     *  if user coming from home page and cart having some value then user will land on menu page.
     */
    let cart = getLocalStorage("cart");
    let confirmOrderAtViewCart = getLocalStorage("confirmOrderAtViewCart");
    if (confirmOrderAtViewCart === true && cart.length > 0) {
      browserHistory.push(Url.VIEW_CART);
    } else if (confirmOrderAtViewCart === true && cart.length <= 0) {
      browserHistory.push(Url.MENU_PAGE);
    } else {
      browserHistory.push(Url.MENU_PAGE);
    }
  }

  handleInfoWindow(marker, action) {
    // if (
    //   typeof this.props.nearestMarker.StoreName !== "undefined" &&
    //   this.props.nearestMarker.StoreName !== ""
    // ) {
    //   this.setState({
    //     showNearestStore: true,
    //   });
    // }
    if (action === "markerClicked") {
      this.setState({
        showCarryoutDialog: true
      });
    }
    let markerCenterPoint = { lat: marker.Latitude, lng: marker.Longitude };
    this.setState({
      activeMarker: marker,
      markerCenterPoint: markerCenterPoint
    });
  }

  closeNearestInfo() {
    this.setState({ showNearestStore: false });
  }

  handleAddressList = (id) => {
    this.setState({
      showAddressList: false
    });
 
  };

  render() {
    return (
      <div className="col-12 px-0 service-method-wrapper abc">
        <NewHeader page="Service Method" />
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
        />
        <ButtonComponent
          toggle={this.toggle}
          page={this.state.page}
          setPage={this.setPage}
          storeLocations={this.props.storeLocations}
          handleChangeLocation={this.handleChangeLocation}
          handlePage={this.handlePage.bind(this)}
          isMarkerShown
          markers={this.props.markers}
          centerPoint={this.props.centerPoint}
          saveStoreLocator={this.saveStoreLocator}
          deliveryAddress={this.props.deliveryAddress}
          //activePage={"storelocator"}
          handleInfoWindow={this.handleInfoWindow}
          zoom={this.state.zoom !== "" ? this.state.zoom : 11}
          userNearestMarker={this.props.nearestMarker}
          showNearestStore={this.state.showNearestStore}
          closeNearestInfo={this.closeNearestInfo}
          surveyAddress={this.props.surveyAddress}
          isSelectValue={this.props.isSelectValue}
          selectedValue={this.props.selectedValue}
          fetching={this.props.fetching}
          onSubmit={this.submitAddressDetail}
          fetchAddress={this.fetchAddress}
          selectAddress={this.selectAddress}
          userAddress={this.props.userAddress}
          inputvalue={this.state.inputvalue}
          showMenu={this.showMenu}
          userMarkerChanged={this.userMarkerChanged}
          checkStoreAvaliability={this.checkStoreAvaliability}
          handleMapDialog={this.handleMapDialog}
          showDeliveryDialog={this.state.showDeliveryDialog}
          surveyAddressFetching={this.props.surveyAddressFetching}
          activeMarker={this.state.activeMarker}
          showAlert={this.props.showAlert}
          alertMessage={this.props.alertMessage}
          storeDetail={this.props.storeDetail}
          getUserNearestStore={this.props.getUserNearestStore}
          showMap={this.state.showMap}
          setUserAddressFromSelectedAddress={
            this.setUserAddressFromSelectedAddress
          }
          checkUserNearestStore={this.checkUserNearestStore}
          filterAddress={this.filterAddress}
          getStoreLocation={this.props.getStoreLocation}
          getLocation={this.props.getLocation}
          fetchStore={this.props.fetchStore}
          showCarryoutDialog={this.state.showCarryoutDialog}
          handleCarryoutDialog={this.handleCarryoutDialog}
          getCustomerDeliveryAddress={this.props.getCustomerDeliveryAddress}
          customerAddress={this.props.customerAddress}
          handleAddressList={this.handleAddressList}
          showAddressList={this.state.showAddressList}
          showLoader={this.props.showLoader}
          loaderShow={this.props.loaderShow}
          resetAlertBox={this.props.resetAlertBox}
        />
        {((this.state.page === "delivery" && !this.state.showAddressList) ||
          this.state.page === "carryout") && (
          <div className="fixed-top toggle-btn z-depth-3 xyz">
            <button
              className={this.state.showMap === false ? "btn active" : "btn"}
              onClick={() => this.toggle(false)}
            >
              <img src={searchIcon} alt="" />
            </button>
            <button
              className={this.state.showMap === true ? "btn active" : "btn"}
              onClick={() => this.toggle(true)}
            >
              <img src={mapIcon} alt="" />
            </button>
          </div>
        )}
      </div>
    );
  }
}
Delivery.propTypes = {
  fetchSurveyAddress: PropTypes.func,
  setFormprops: PropTypes.func,
  resetFormprops: PropTypes.func,
  map: PropTypes.func,
  surveyAddress: PropTypes.array,
  deliveryAddress: PropTypes.array,
  showDeliveryForm: PropTypes.bool,
  isSelectValue: PropTypes.bool,
  selectedValue: PropTypes.string,
  isViewMap: PropTypes.bool,
  inputvalue: PropTypes.string,
  position: PropTypes.string,
  userAddress: PropTypes.string,
  saveStoreLocator: PropTypes.func,
  showMenu: PropTypes.func,
  getSetUserLocation: PropTypes.func
};

Delivery.contextTypes = {
  t: PropTypes.func.isRequired
};

// Delivery.childContextTypes = {
//   t: PropTypes.func.isRequired
// };

export default Delivery;
