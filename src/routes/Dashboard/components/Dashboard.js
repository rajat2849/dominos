import React from "react";
import {browserHistory} from 'react-router';
import BannerCrousel from "./BannerCrousel";
import Promotion from "./Promotion";
import AppExclusive from "./AppExclusive";
import ExclusiveVoucher from "./ExclusiveVoucher";
import PacketHemat from "./PacketHemat";
import GroupButton from "./GroupButton";
import ExploreCategories from "./ExploreCategories";
import Footer from "./Footer";
import "./NewDashboard.scss";
// import "./newFontfamily.scss";

import NewHeader from "../../../../src/components/NewHeader";
import NewHeaderjune from "../../../../src/components/NewHeaderjune";
import moment from 'moment';
import {
  saveSessionStorage,
  saveLocalStorage,
  getLocalStorage
} from "components/Helpers";
import Loader from "components/Loader";
import HomeView from "../../NewHomeView/components/HomeView";
import BestSeller from "./BestSeller.js"
import {get} from "lodash";
import ModalSheet from "../../../components/ModalSheet";
import { Url } from "config/Config";
import DeliverySheet from './DeliverySheet';
import percentimg from "../../../../public/newimages/percentimg.jpg";
import forwardimg from "../../../../public/newimages/forwardimg.jpg";
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddress = this.handleAddress.bind(this);
    this.handleModalToggle = this.handleModalToggle.bind(this);
    this.checkUserNearestStore = this.checkUserNearestStore.bind(this);
    this.handleAddressList = this.handleAddressList.bind(this);
    this.handleAddAddress = this.handleAddAddress.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleBtn = this.toggleBtn.bind(this);
    this.handleGroupBtnToggle = this.handleGroupBtnToggle.bind(this);
    this.state = {
      isToggleOn: false,
      isModalOpen: false,
      activeTab: props.page === "delivery" ? "1" : "2",
      isActive: "carryout",
      showMap:
        props.location.state && props.location.state.page === "carryout"
          ? true
          : false,
      toggleBtn: this.toggleBtn
    };
  }

  componentWillMount() {
    // initializing the allToppings to default [] cause it is needed to render pizza from Menu screen.
    /*
      case handled: if you're visited to Menu page yet and clicked the pizza from dashboard screen (best selling products)
                    then screen goes off white because pizza screen required allToppings and it was only initialised
                    by the Menu screen.
    */
    const allToppings = [];
    localStorage.setItem("allToppings", JSON.stringify(allToppings));
    // this.props.getPizzaList();
    // this.props.getPromotionList();
    // this.props.getValueDealsList();
    // this.props.getSidesDessertsList();
    // this.props.getBeverageList();
    // this.props.getPizzaList();
    /*
     *  Involve Asia Conversion Pixel
     *  =============== start ==================
     */

    let affiliateInformation = getLocalStorage("affiliateInformation");
    if (_.isEmpty(affiliateInformation)) {
      affiliateInformation = {};
      if (
        typeof this.props.location !== "undefined" &&
        _.isEmpty(this.props.location.query) !== true
      ) {
        affiliateInformation.isOrderFromAffiliate = true;
        if (this.props.location.query.utm_source === "InvolveAsia") {
          affiliateInformation.affiliateSource = "IA";
        } else if (this.props.location.query.utm_source === "BIDMATH") {
          affiliateInformation.affiliateSource = "Bidmath";
        } else if (this.props.location.query.utm_source === "theinthings.com") {
          affiliateInformation.affiliateSource = "theinthings.com";
        } else if (
          this.props.location.query.tduid !== undefined &&
          this.props.location.query.tduid !== null
        ) {
          affiliateInformation.affiliateSource = "TD";
        } else if (
          this.props.location.query._branch_match_id !== undefined &&
          this.props.location.query._branch_match_id !== null &&
          this.props.location.query._branch_match_id !== ""
        ) {
          affiliateInformation.affiliateSource = "OP";
        } else {
          affiliateInformation.affiliateSource = this.props.location.query.utm_source;
        }
      }
      saveLocalStorage("affiliateInformation", affiliateInformation);
    }
    /*
     *  ========== End =============
     */
    saveSessionStorage("referalPage", "dashboard");

       this.props.getBannerList();

    let cartItems = JSON.parse(localStorage.getItem("cartItems"));
    let productId = JSON.parse(localStorage.getItem("productId"));
    let sessionCart = [];
    saveSessionStorage("cart", sessionCart);
    if (cartItems === null || cartItems === "") {
      cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
    if (productId === null || productId === "") {
      productId = [];
      saveLocalStorage("productId", productId);
    }
    const deliveryAddressEntityId = getLocalStorage('delivery_address');
    this.setState({deliveryAddressEntityId: deliveryAddressEntityId});
  }


  componentDidMount() {
    let data = getLocalStorage("receivedLoginDetail");
    let date = moment().format('DD-MM-YYYY');
    saveLocalStorage("date", date);
    this.props.getChatbotStatus()
    this.props.fetchConfig()
    this.props.getPromotionList();
    this.props.getBestSellerPizzaList()
    this.props.getValueDealsList();
    this.props.getBestSellerList();
    this.props.getAppExclusiveList();
    this.props.getVoucherExclusiveList();
   
    let dashboard = "dashboard";
    saveLocalStorage("page", dashboard);
    if(data != null || data != undefined || data.length!= 0){
      this.props.geCustomerOrders(data.customer_id)
    }
  }

  toggle = () => {
    this.setState({
      isToggleOn: !this.state.isToggleOn
    });
  };

  handleModalToggle (status) {
    this.setState({isModalOpen: status});
  }

  handleAddress (btn) {
    saveLocalStorage("active_Btn", btn);
    this.handleModalToggle(true);
  }

  checkUserNearestStore(position, callback, item) {
    this.props.loadingImage(true);
    this.props.setUserNearestStore(position.lat, position.lng, callback, item);
      saveLocalStorage("entity_id",item.entity_id)
    saveLocalStorage("delivery_address", item);
    saveLocalStorage("takeawayDetail",position);
    this.props.setAddressDetails(item, this.state.isActive);
    browserHistory.push(Url.MENU_PAGE);
  }

  handleAddressList(address) {
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
      //  this.props.addDeliveryAddress(userSelectedAddress);

    } else {
      // console.log('\n\n else \n\n');
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

  toggleBtn(tab) {
    this.setState({
      showMap: true
    });
    // if (this.state.activeTab !== tab) {
    //   this.setState(
    //     {
    //       activeTab: tab
    //     },
    //     () => this.setDeliveryType(this.state.activeTab)
    //   );
    // }
    // if (tab === "1") {
    //   this.props.toggle(false);
    // }
    // if (tab === "2") {
    //   this.props.getStoreLocation();
    //   this.props.toggle(true);
    // }
  }

  handleGroupBtnToggle (btn) {
    saveLocalStorage("active_Btn", btn);
     this.setState({
        isActive: btn
      });
  }

  render() {
    // console.log('configuration', this.props.configuration);
    const {loadingImage}=this.props;
    const languageSet = getLocalStorage("languageSet");
    let details = getLocalStorage("receivedLoginDetail");
    const {isModalOpen} = this.state;
    return (
      <React.Fragment>
        {languageSet !== true ? (
          <HomeView setLanguage={this.props.setLanguage} />
        ) : (
          <div className="col-12 dashboard-bg m-0">
            {this.props.isBannerFetched === false && (<Loader loading={!this.props.isBannerFetched} />)}
            <div className="row">
            {/* <NewHeader page="Dashboard" chatBotData={this.props.chatBotData}/> */}
              {/* {console.log(get(details,'firstname'))} */}
              <NewHeaderjune page="Dashboard" chatBotData={this.props.chatBotData}/>
              {get(details,'firstname') ?
                <div>
                  <p className="mb-0 product-title mt-3 ml-3" style={{fontSize:"12px"}}>
                  <strong style={{color:"#1F1F1F"}} className="text-capitalize montserrat">Hi, {" "}{details.firstname}</strong><br />
                    <strong className="montserrat" style={{fontSize:"16px",color:"#808080"}}>Welcome Back!</strong>
                  </p>
                </div>
                :
                <div>
                  <p className="mb-0 product-title mt-3 ml-3 product-title-logout" style={{fontSize:"12px"}}>
                    <strong>Welcome,{" "}Dominos Lover </strong>
                  </p>
                </div>
              }
              <div className="col-12 px-0 white pt-1 slickContainer">
                <BannerCrousel
                  bannerList={this.props.bannerList}
                  getBannerList={this.props.getBannerList}
                  loader={this.props.loader}
                  loadingImage={this.props.loadingImage}
                />
                <GroupButton
                  details={details}
                  handleAddress={this.handleAddress}
                  handleGroupBtnToggle={this.handleGroupBtnToggle}
                  isActive={this.state.isActive}
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
              </div>
              <div className="col-12 white pt-3 mb-5 pb-5">
                {/* <AppExclusive
                  appExclusiveList={_.get(this.props.appExclusiveList , "data" , [])}
                  loader={this.props.loader}
                  categoryName={_.get(this.props.appExclusiveList , "" , 'App exclusive promos')}
                  loadingImage={this.props.loadingImage}
                  getPromotionList={this.props.getAppExclusiveList}
                />
                <div className="col-12 my-2 px-0">
                  <hr className="mx-0" style={{borderTop:"0px solid"}} />
                </div> */}
                <Promotion
                  promotionList={_.get(this.props.promotionList , "data" , [])}
                  loader={this.props.loader}
                  categoryName={_.get(this.props.promotionList , "" , )}
                  loadingImage={this.props.loadingImage}
                  getPromotionList={this.props.getPromotionList}
                  configuration={this.props.configuration}
                  isActive={this.state.isActive}
                />
                <div className="col-12 my-2 px-0">
                  <hr className="mx-0" style={{borderTop:"0px solid"}} />
                </div>
                <PacketHemat
                  valueDealsList={_.get(this.props.valueDealsList , "data" , [] )}
                  categoryName = {_.get(this.props.valueDealsList  , "categoryName" , "")}
                  loader={this.props.loader}
                  loadingImage={this.props.loadingImage}
                  getValueDealsList={this.props.getValueDealsList}
                />
                <div className="col-12 my-2 px-0">
                  <hr style={{borderTop:"0px solid"}} />
                </div>
                <ExploreCategories
                  loader={this.props.loader}
                  loadingImage={this.props.loadingImage}
                  applyVoucherCode={this.props.applyVoucherCode}
                  setAlertMeassage={this.props.setAlertMeassage}
                  {...this.props}
                />
                 <div className="col-12 my-2 px-0">
                  <hr style={{borderTop:"0px solid"}} />
                </div>
                 <BestSeller
                  sellerList={this.props.sellerList}
                  loader={this.props.loader}
                  loadingImage={this.props.loadingImage}
                  getBestSellerList={this.props.getBestSellerList}
                  pizzaList={this.props.pizzaList}
                />
              </div>
              <Footer pathname={this.props.location.pathname} chatBotData={this.props.chatBotData}/>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}
export default Dashboard;
