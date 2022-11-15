import React from "react";

import MenuList from "../../Dashboard/components/MenuList";
import PromotionWrapper from "./PromotionWrapper";
import PaketHematWrapper from "./PaketHematWrapper";
import PizzaListWrapper from "./PizzaListWrapper";
import SidesListWrapper from "./SidesListWrapper";
import BeverageListWrapper from "./BeverageListWrapper";
import TaxWrapper from "./TaxWrapper";
import moment from 'moment';
import YourOrder from "./YourOrder";
import PropTypes from "prop-types";
import backImage from "../../../../public/newimages/backImage.png";
import Vectordwn from "../../../../public/newimages/Vectordwn.png";
import menudelivery from "../../../../public/newimages/ICON-FOR-KEVIN-DELIVERY-01.png";

import { browserHistory } from "react-router";
import { Url } from "config/Config";
import {
  saveLocalStorage,
  saveSessionStorage,
  getLocalStorage
} from "components/Helpers";
import LazyLoad from "react-lazy-load";
import NewLoader from "components/NewLoader";
import QunatityModal from "./QunatityModal"
import Loader from "../components/Loader";
import MenuHeader from './MenuHeader';
import categoriesIcon from "../../../../public/newimages/promo_icon.png";
import P_h_Image from "../../../../public/newimages/paket_hamet_icon.png";
import P_image from "../../../../public/newimages/deliciouspizzas.png";
import S_image from "../../../../public/newimages/delicioussides.png";
import B_image from "../../../../public/newimages/beverages.png";
import ModalSheet from "../../../components/ModalSheet";
import DeliverySheet from "../../Dashboard/components/DeliverySheet";

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sideName: "",
      pageMounted: false,
      maxItemReached:"",
      activeTab: 'Promo',

      isActive: 'delivery',
      location: {
        lat: '',
        lng: ''
      },
      isModalOpen: false
    };
    this.scrollFromMenu = this.scrollFromMenu.bind(this);
    this.handleTabsClick = this.handleTabsClick.bind(this);
    this.handleGroupBtnToggle = this.handleGroupBtnToggle.bind(this);
    this.checkUserNearestStore = this.checkUserNearestStore.bind(this);
    this.handleAddAddress = this.handleAddAddress.bind(this);

    // branch.logEvent(
    //   "Menu",
    //   function(err,data) { console.log(err,data); }
    //  )
    // var options = { no_journeys: false };
    // branch.init("key_live_fgUjrDY06rcHjdJNirdescdiwzmYjUQj", options, function(
    //   err,
    //   data
    // ) {});

    //     branch.init("key_live_fgUjrDY06rcHjdJNirdescdiwzmYjUQj", function(err, data) {
    //     // window.data = data.data_parsed;
    //     // window.branch = branch;
    //     console.log(data,err)
    // });
  }

  componentWillMount() {
    let cartItems = JSON.parse(localStorage.getItem("cartItems"));
    let productId = JSON.parse(localStorage.getItem("productId"));
    let sessionCart = JSON.parse(sessionStorage.getItem("cart"));

    if (cartItems === null || cartItems === "") {
      cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
    if (productId === null || productId === "") {
      productId = [];
      saveLocalStorage("productId", productId);
    }
    if (sessionCart === null || sessionCart === "") {
      sessionCart = [];
      saveSessionStorage("cart", sessionCart);
    }

    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({location: {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }});
    });
    const deliveryAddressEntityId = getLocalStorage('delivery_address');
    this.setState({deliveryAddressEntityId: deliveryAddressEntityId});

  }

  componentWillReceiveProps(nextProps) {
    localStorage.setItem("allToppings", JSON.stringify(nextProps.allToppings));
    if (nextProps.isPromotionFetched === false && this.props.loader === true) {
      this.props.loadingImage(false);
    }
  }

  componentDidMount() {
    // const customerId = getLocalStorage('receivedLoginDetail').customer_id
    // customerId!==undefined && this.props.getCartItems(customerId);
      const cartItem = JSON.parse(localStorage.getItem("cartItems"));
     const date = JSON.parse(localStorage.getItem("date"));
       let newDate = moment().format('DD-MM-YYYY');
       // if(date != newDate){
       //  console.log("-----")
       //  cartItem.splice(0,cartItem.length)
       //  localStorage.setItem("cartItems",JSON.stringify(cartItem))
       // }
        this.props.fetchConfig();


    let menu = "menu";
    saveLocalStorage("page", menu);
    this.props.getPromotionList();
    this.props.getValueDealsList();
    this.props.getPizzaList();
    
    const previousLocation = getLocalStorage('previousLocation');
    let id = previousLocation ? previousLocation : "";
    if(id === '' || id === 'undefine'){
      this.setState({activeTab: 'Promo'});
    }else{
      this.setState({activeTab: id});
    }

    let sideName = "";
    if (
      id === "Delicious Sides" ||
      id === "Tasty Chicken" ||
      id === "Yummy Desserts"
    ) {
      sideName = id;
      id = "Sides";
      this.setState({
        sideName: sideName
      });
    }

    this.props.location.state &&
      this.props.location.state.name &&
      sideName !== "Tasty Chicken" &&
      sideName !== "Yummy Deserts" &&
      setTimeout(function() {
        let element = document.getElementById(id);
        element !== null &&
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "start"
          });
      }, 100);
  }

  scrollFromMenu(section) {
    let element = document.getElementById(section);
    element !== null &&
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start"
      });
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

  handleTabsClick(id) {
    this.setState({activeTab: id});
  }

  handleAddress = (btn) => {
// console.log('on click menu page address',btn);
     saveLocalStorage("active_Btn", btn);
    this.handleModalToggle(true);
    // this.setState({isActive: btn});
  }

  handleModalToggle = (status) => {
    this.setState({isModalOpen: status});
  }
  handleGroupBtnToggle (btn) {

    saveLocalStorage("active_Btn", btn);
    const deliveryType = btn === "delivery" ? "Delivery" : "Carryout";
    
    const order = { deliveryType: deliveryType };
    saveLocalStorage("order", order);
     this.setState({
        isActive: btn
      });
  }
  checkUserNearestStore(position, callback, item) {
    
    this.handleModalToggle(false);
    this.props.loadingImage(true);
    this.props.setUserNearestStore(position.lat, position.lng, callback, item);
     saveLocalStorage("entity_id",item.entity_id)
     saveLocalStorage("delivery_address", item);
     saveLocalStorage("takeawayDetail",position);
     this.props.setAddressDetails(item, this.state.isActive);
     browserHistory.push(Url.MENU_PAGE);
  }
  handleAddAddress () {
    this.handleModalToggle(false);
    browserHistory.push({
      pathname: Url.NEW_SERVICE_METHOD,
      state: {
        activeTab: this.state.activeTab,
        page: this.state.isActive
      }
    });
  }
  render() {
    let selectedProducts = JSON.parse(localStorage.getItem("cartItems"));
   const menuTitle = [
      { name: _.get(this.props.promotionList, "categoryName", "Everyday Special Moment Deals"),
       src: categoriesIcon,
       scrollTo: "Promo"
      },
      { name: _.get(this.props.valueDealsList, "categoryName", "Value Deals"),
        src: P_h_Image,
        scrollTo: "Paket Hemat"
      },
      { name: "Pizza",
        src: P_image,
        scrollTo: "Delicious Pizza"
      },
      { name: "Sides",
        src: S_image,
        scrollTo: "sides"
      },
      { name: "Beverages",
        src: B_image,
        scrollTo: "Beverages"
      }
    ]

    const {activeTab, isModalOpen} = this.state;
    const {isActive} = this.state;

    return (
      <div className="m-0">
        {this.props.showLoader === true && (
          <Loader loading={this.props.showLoader} />
        )}
        {this.state.maxItemReached && (
        <QunatityModal message ={this.state.maxItemReached} successHandler = {() =>  this.setState({
          maxItemReached : ""
        })}/>
        )}
        <MenuHeader
          {...this.props}
          handleTabsClick={this.handleTabsClick}
          activeTab={activeTab}
          sideName={this.state.sideName}
          location={this.state.location}
          handleAddress={this.handleAddress}
          handleGroupBtnToggle={this.handleGroupBtnToggle}

        />
        {(isModalOpen) &&
          <ModalSheet
          {...this.props}
            isOpen={isModalOpen}
            close={this.handleModalToggle}
            activeContent={this.state.activeTab}
            fetchDeliveryAddress={this.props.getCustomerDeliveryAddress}
            deliveryAddress={this.props.customerAddress}
            handleAddressList={this.handleAddressList}
            checkUserNearestStore={this.checkUserNearestStore}
            handleAddAddress={this.handleAddAddress}
            toggleBtn={this.toggleBtn}
            sheetContent={DeliverySheet}
            deliveryAddressEntityId={this.state.deliveryAddressEntityId}
            toggle={this.state.toggle}
            showMap={this.state.showMap}
            getStoreLocation={this.props.getStoreLocation}
            handleGroupBtnToggle={this.handleGroupBtnToggle}
            isActive={this.state.isActive}
            getNearestStores={this.props.getNearestStores}
          />
        }
        <div className="col-12 menu-list-container pb-5 mb-5 menu_content">
          {this.props.isPizzaFetched === false ||
          this.props.isPromotionFetched === false ||
          this.props.isValueDealsFetched === false ? (
            <Loader />
          ) : (
            <div className="row">
              {/*<div>
                  <MenuTabs/>
                </div>*/}
              {(activeTab === 'Promo') && <div id="Promo" className="col-12 px-0">
                <LazyLoad offset={0}>
                  <PromotionWrapper
                    promotionList={_.get(this.props.promotionList , "data" , [])}
                    addToCart={this.props.addToCart}
                    removeCart={this.props.removeCart}
                    deleteToCart={this.props.deleteToCart}
                    getCouponProductDetail={this.props.getCouponProductDetail}
                    couponProduct={this.props.couponProduct}
                    getPromotionList={this.props.getPromotionList}
                    categoryName={_.get(this.props.promotionList , "categoryName" , "")}
                    loader={this.props.loader}
                    loadingImage={this.props.loadingImage}
                    config={this.props.config}
                    checkItemLimit = {this.checkItemLimit}
                    // checkItemLimit = {this.checkItemLimit}
                    activeTab={activeTab}
                    configuration={this.props.configuration}
                    activeBtn={this.props.activeBtn}
                    
                  />
                </LazyLoad>
              </div>
              }
              {(activeTab === 'PacketHemat') && <div id="Paket_Hemat" className="col-12 px-0">
                <LazyLoad offset={0}>
                  <PaketHematWrapper
                    valueDealsList={this.props.valueDealsList}
                    addToCart={this.props.addToCart}
                    removeCart={this.props.removeCart}
                    deleteToCart={this.props.deleteToCart}
                    getValueDealsList={_.get(this.props.getValueDealsList , "data" , [])}
                    categoryName={_.get(this.props.valueDealsList , "categoryName" , "")}
                    loader={this.props.loader}
                    loadingImage={this.props.loadingImage}
                    checkItemLimit = {this.checkItemLimit}

                  />
                </LazyLoad>
              </div>}
              {(activeTab === 'Pizza') && <div id="Delicious_Pizza" className="col-12 px-0">
                <LazyLoad offset={0}>
                  <PizzaListWrapper
                    addToCart={this.props.addToCart}
                    removeCart={this.props.removeCart}
                    deleteToCart={this.props.deleteToCart}
                    fetchAllToppings={this.props.fetchAllTopings}
                    pizzaList={this.props.pizzaList}
                    getPizzaList={this.props.getPizzaList}
                    loader={this.props.loader}
                    loadingImage={this.props.loadingImage}
                    checkItemLimit = {this.checkItemLimit}
                  />
                </LazyLoad>
              </div>}
              {(activeTab === 'Sides' || activeTab === 'Pasta' || activeTab === 'Desserts') && <div id="sides" className="col-12 px-0">
                <LazyLoad offset={0}>
                  <SidesListWrapper
                    activeTab={activeTab}
                    sidesDessertList={this.props.sidesDessertList}
                    addToCart={this.props.addToCart}
                    removeCart={this.props.removeCart}
                    deleteToCart={this.props.deleteToCart}
                    sideName={this.state.sideName}
                    getSidesDessertsList={this.props.getSidesDessertsList}
                    loader={this.props.loader}
                    loadingImage={this.props.loadingImage}
                    checkItemLimit = {this.checkItemLimit}

                  />
                </LazyLoad>
              </div>}
              {(activeTab === 'Beverages') && <div id="Beverages" className="col-12 px-0">
                <LazyLoad offset={0}>
                  <BeverageListWrapper
                    beverageList={this.props.beverageList}
                    addToCart={this.props.addToCart}
                    removeCart={this.props.removeCart}
                    deleteToCart={this.props.deleteToCart}
                    getBeverageList={this.props.getBeverageList}
                    loader={this.props.loader}
                    loadingImage={this.props.loadingImage}
                    checkItemLimit = {this.checkItemLimit}
                  />
                </LazyLoad>
              </div>}
              {/* <div id="tax" className="col-12 px-0">
                <TaxWrapper
                  beverageList={this.props.beverageList}
                  addToCart={this.props.addToCart}
                  removeCart={this.props.removeCart}
                  deleteToCart={this.props.deleteToCart}
                  getBeverageList={this.props.getBeverageList}
                  loader={this.props.loader}
                  loadingImage={this.props.loadingImage}
                />
              </div> */}
            </div>
          )}
        </div>
        <div className="bottom-menu fixed-bottom col-12">
          <div className="row d-flex align-items-center">
            {/* <MenuList scrollFromMenu={this.scrollFromMenu} menuTitle={menuTitle} /> */}
            <div className="col-12">
              {selectedProducts.length > 0 && <YourOrder />}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Menu.propTypes = {
  isPromotionFetched: PropTypes.bool
};
export default Menu;
