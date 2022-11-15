import React from "react";
import BannerCrousel from "./BannerCrousel";
import Promotion from "./Promotion";
import PacketHemat from "./PacketHemat";
import GroupButton from "./GroupButton";
import ExploreCategories from "./ExploreCategories";
import Footer from "./Footer";
import "./NewDashboard.scss";
import NewHeader from "../../../../src/components/NewHeader";
import { Card, CardImg, Col } from "reactstrap";
import { Link } from "react-router";
import { browserHistory } from "react-router";
import { Url } from "config/Config";
import moment from 'moment';
import {
  saveSessionStorage,
  saveLocalStorage,
  getLocalStorage
} from "components/Helpers";
import Loader from "components/Loader";
import HomeView from "../../NewHomeView/components/HomeView";
import { Button } from "reactstrap";
import { getSessionStorage } from "../../../components/Helpers";
import BestSeller from "./BestSeller.js"
import CouponCodeForm from "./CouponCodeForm";
import usecoupon from "../../../../public/newimages/usecoupon.png";
import {get} from "lodash";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    // branch.logEvent("Dashboard Menu", function(err) {
    //   console.log(err);
    // });
        this.state = {

      isToggleOn: false
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
    this.props.getPizzaList();
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
   // saveLocalStorage("chatBotStatus", this.props.chatBotData.status);

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
     this.props.getBestSellerList()
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

  render() {
     // let status =  getLocalStorage("chatBotStatus", this.props.chatBotData.status);
    if(status=== null){
         saveLocalStorage("chatBotStatus", this.props.chatBotData.status);
    }
    const languageSet = getLocalStorage("languageSet");
    let details = getLocalStorage("receivedLoginDetail");
      let bestSellerList = getLocalStorage("sellerList");
    return (
      <React.Fragment>
        {this.state.isToggleOn === true ? (
          <CouponCodeForm
            showForm={this.state.isToggleOn}
            toggle={this.toggle}
            applyVoucherCode={this.props.applyVoucherCode}
            //couponCodeResponse={this.props.couponCodeResponse}
            applying={this.props.applying}
            alertMessage={this.props.alertMessage}
            error={this.props.error}
            setAlertMeassage={this.props.setAlertMeassage}
            loader={this.props.loader}
          />
        ) : (
          ""
        )}
        {languageSet !== true ? (
          <HomeView setLanguage={this.props.setLanguage} />
        ) : (
          <div className="col-12 dashboard-bg">
            {this.props.isBannerFetched === false && (
              <Loader loading={!this.props.isBannerFetched} />
            )}
            <div className="row">
              <NewHeader page="Dashboard" chatBotData={this.props.chatBotData}/>
              {get(details,'firstname') ?  <div>
                <p className="mb-0 product-title mt-3 ml-3" style={{fontSize:"12px"}}>
                    <strong>Welcome, {" "}{details.firstname} {" "}{details.lastname}</strong>
                  </p>
              </div>:  <div>
                <p className="mb-0 product-title mt-3 ml-3" style={{fontSize:"12px"}}>
                    <strong>Welcome,{" "}Dominos Lover</strong>
                  </p>
              </div>}

              <div className="col-12 px-0 white pt-1 slickContainer">
                <BannerCrousel
                  bannerList={this.props.bannerList}
                  getBannerList={this.props.getBannerList}
                  loader={this.props.loader}
                  loadingImage={this.props.loadingImage}
                />
                <GroupButton details={details} />
              </div>
              <div className="col-12 white mt-3 pt-3 mb-5 pb-5">
              {/*   <Col xs="6" className="item-box text-center my-2 m0Auto">
                <Link onClick={this.toggle} className="mb-2">
                  <Card>
                    <CardImg
                      src={usecoupon}
                      alt="menu Image"
                      className="img-fluid"
                    />
                  </Card>
                  <p className="mb-0 product-title mt-2">
                    <strong>Use Coupon</strong>
                  </p>
                </Link>
              </Col>*/}
                <Promotion
                  promotionList={_.get(this.props.promotionList , "data" , [])}
                  loader={this.props.loader}
                  categoryName={_.get(this.props.promotionList , "" , )}
                  loadingImage={this.props.loadingImage}
                  getPromotionList={this.props.getPromotionList}
                />
                <div className="col-12 my-4 px-0">
                  <hr className="mx-0" />
                </div>
                <PacketHemat
                  valueDealsList={_.get(this.props.valueDealsList , "data" , [] )}
                  categoryName = {_.get(this.props.valueDealsList  , "categoryName" , "")}
                  loader={this.props.loader}
                  loadingImage={this.props.loadingImage}
                  getValueDealsList={this.props.getValueDealsList}
                />
                <div className="col-12 my-4 px-0">
                  <hr />
                </div>
                <ExploreCategories
                  loader={this.props.loader}
                  loadingImage={this.props.loadingImage}
                  applyVoucherCode={this.props.applyVoucherCode}
                  setAlertMeassage={this.props.setAlertMeassage}
                  {...this.props}
                />
                 <div className="col-12 my-4 px-0">
                  <hr />
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
