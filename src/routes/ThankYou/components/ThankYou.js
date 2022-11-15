import React from "react";
import "./ThankYou.scss";
// import Header from '../../../DashboardSubComponent/Header';
// import NewHeader from '../../../../src/components/NewHeader';
// import logoImage from '../../../../public/logo_dominos.png';
// import backImage from '../../../../public/newimages/backImage.png';
import ThankYouForm from "./ThankYouForm";
import { Url } from "config/Config";
import { browserHistory } from "react-router";
import { getLocalStorage, saveLocalStorage } from "components/Helpers";

class ThankYou extends React.Component {
  constructor(props) {
    super(props);
    this.isOrderFromAffiliate = false;
    this.conversionPixelData = {};
    // branch.logEvent("Thank You Screen", function(err) {
    //   console.log(err);
    // });
  }

  componentWillMount() {
    /*
     *  Involve Asia Conversion Pixel
     *  =============== start ==================
     */
    this.conversionPixelData = getLocalStorage("conversionPixelData");
    let affiliateInformation = getLocalStorage("affiliateInformation");

    this.isOrderFromAffiliate =
      !_.isEmpty(affiliateInformation) &&
      affiliateInformation.isOrderFromAffiliate === true
        ? true
        : false;
         console.log(affiliateInformation,"thank tou afflicate")
    /*
     *  ========== End =============
     */

    // /*
    //  * Google tag manager
    //  */
    let tagManagerData = getLocalStorage("gtmdata");
    tagManagerData.url = window.location.pathname;
    window.dataLayer.push(tagManagerData);

    this.props.fetchOrderSummary();
  }

  componentWillUnmount() {
    this.props.resetOrderSummary();
    let affiliateInformation = {};
    saveLocalStorage("affiliateInformation", affiliateInformation);
  }

  gotoTracker() {
    browserHistory.push(Url.PIZZA_TRACKER_PAGE);
  }

  componentWillMount() {
    this.props.fetchOrderSummary();
  }
  componentDidMount() {
    setTimeout(function() {
      browserHistory.push(Url.PIZZA_TRACKER_PAGE);
    }, 5000);
  }
  render() {
     let selectedProducts = JSON.parse(localStorage.getItem("orderConfirm"))
          let productsArray = []
  
     let products = selectedProducts[0].items.map(item =>{
   let productsCart = {}
      productsCart.productID = item.item_id;
      productsCart.unit = item.qty;
     productsCart.price = item.price

     productsArray.push(productsCart)
     })

     let appierRtorderId = selectedProducts.order_id;
let appierRtItemList = productsArray;
let appierRtPrice = selectedProducts.total;
let appierRtCurrency = "IDR";
     window.appier_q = window.appier_q || [];
window.appier_q.push(
   { t: "register", "content": { "id": "662d", "site": "dominos.co.id" } },
   {"t":"type_purchase",  "itemList":appierRtItemList, "totalvalue":appierRtPrice, "currency":appierRtCurrency, "action_id": "Purchase_1ab0","track_id":"db5c7c4ffaf9d22","opts":{"uu":appierRtorderId, "action_param1" : JSON.stringify(appierRtItemList), "action_param2": appierRtorderId,
"total_revenue" : appierRtPrice, "currency" : appierRtCurrency}}
);

    return (
      <div className="col-12">
        <header className="track hm-header text-center fixed-top">
          <div className="row d-flex align-items-center px-3 mx-0">
            {/* <div className='col-2 back-icon px-0 text-left'><img onClick={() => browserHistory.push(Url.MENU_PAGE)} src={backImage} className="mx-auto img-fluid"/></div> */}
            <div className="col-auto hm-title pl-2">Thank you</div>
          </div>
        </header>
        <ThankYouForm
          orderSummary={this.props.orderSummary}
          gotoTracker={this.gotoTracker}
        />
      </div>
    );
  }
}
export default ThankYou;
