import React from 'react'
import {browserHistory} from 'react-router'
import {Url} from 'config/Config';
import Loader from '../../../components/Loader';
import { saveLocalStorage, saveSessionStorage, getLocalStorage } from "../../../components/Helpers";

export default class SpecialOffers extends React.Component {
    componentWillMount() {
        /*
         *  Involve Asia Conversion Pixel
         *  =============== start ==================
         */
        console.log("source",this.props.location.query.utm_source)
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
            } else if(this.props.location.query.utm_source === 'BIDMATH') {
              affiliateInformation.affiliateSource = 'Bidmath';
             }
             else if(this.props.location.query.utm_source === 'theinthings.com') {
              affiliateInformation.affiliateSource = 'theinthings.com';
             } 
            else if (
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
    componentDidMount(){
        setTimeout(function() {
            browserHistory.push({
                pathname: Url.MENU_PAGE,
                //state: { name: 'Beverages' }
            })
        },1500)
    }
    render(){
      console.log("Special offers-----------")
        return(
            <Loader loading={true}/>
        )
    }
}