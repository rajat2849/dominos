import CoreLayout from "../layouts/PageLayout/PageLayout";
import { browserHistory } from "react-router";
import {
  getLocalStorage,
  saveSessionStorage,
  customizePath,
  saveLocalStorage
} from "../components/Helpers";
const _ = require("lodash");
import { webRedirectMenuSlide } from "../lib/RouteHelper";
//import DanaResponseRoutes from './DanaResponse';
import ErrorRoutes from "./Error";
import DashboardRoutes from "./Dashboard";
import MenuRoutes from "./Menu";
import LoginRoutes from "./Login";
import RegisterRoutes from "./NewRegistration";
import ContactRoutes from "./ContactUs";
import ViewCartRoutes from "./ViewCart";
import NewServiceMethodRoutes from "./NewServiceMethod";
import ToppingsRoutes from "./Toppings";
import NewSettingRoutes from "./NewSetting";
import ThankYouRoutes from "./ThankYou";
import TrackerRoutes from "./Tracker";
import NewHomeRoutes from "./NewHomeView";
import NewPromotionRoutes from "./NewPromotion";
import NewPaketHematRoutes from "./NewPaketHemat";
import MyAccountRoutes from "./MyAccount";
import NewTermOfUseRoutes from "./NewTermOfUse";
import TermAndConditionRoutes from "./TermConditions";
import NewMyOrderRoutes from "./NewMyOrder";
import HistoryRoutes from "./History";
import NewsAndUpdatesRoutes from "./NewsAndUpdates";
import PrivacyAndPolicyRoutes from "./PrivacyPolicy";
import verifyRoutes from "./Verify";
import SidesRoutes from "./Sides";
import BeveragesRoutes from "./Beverages";
import SpecialOffersRoutes from "./SpecialOffers";
import ChatBotRoutes from "./ChatBot";
//import fileauth from "src/routes/well-known/pki-validation/fileauth.txt";

export function checkPageRestriction(nextState, replace, callback) {
  let access = false;
  let localStorage = {};
  if (
    window.location.search !== "" &&
    window.location.href.includes("customer")
  ) {
    var queryParamater = customizePath(window.location.search);
    saveLocalStorage("resetPassword", queryParamater);
  }

  const path = require("../config/Config").Url;

  const pathname = nextState.location.pathname;
  if (!_.isEmpty(queryParamater)) {
    access = true;
    browserHistory.push(path.RESET);
  }

  switch (pathname) {
    case path.CUSTOMER_DETAIL_PAGE:
      localStorage = getLocalStorage("order");
      access = typeof localStorage.deliveryType !== "undefined" ? true : false;
      break;
    case path.VIEW_CART:
      localStorage = getLocalStorage("cart");
      access = localStorage.length >= 0 ? true : false;
      break;
    case path.ORDER:
      let cart = getLocalStorage("cart");
      localStorage = getLocalStorage("order");
      access = cart.length >= 0 ? true : false;
      break;
    case path.THANK_YOU:
      localStorage = getLocalStorage("order");
      //access = ( typeof localStorage.placeOrder !== 'undefined' ) ? true : false;
      access = true;
      break;
    case path.LOGIN_PAGE:
      access = true;
    case path.VERIFY_PAGE:
      access = true;
    case path.REGISTER_PAGE:
      access = true;
    case "/":
    case path.DELIVERY_PAGE:
    case path.MENU_PAGE:
      access = true;
      break;
    case path.ERROR_PAGE:
      access = true;
      break;
    case path.PRODUCT_DETAIL:
    case path.STORE_LOCATOR:
    case path.STORE_FINDER:
      access = true;
      break;
    case path.DASHBOARD:
      // const splitPath = pathname.split('/');
      // localStorage = getLocalStorage('receivedLoginDetail');
      // access = (typeof localStorage.customer_id === 'undefined' && splitPath[1] === 'dashboard') ? true : false;
      access = true;
      break;
    case path.SPECIAL_OFFERS:
    case path.MENU_PAGE:
    case path.LOGIN_PAGE:
    case path.CONTACT_US:
    case path.VIEW_CART:
    case path.NEW_SERVICE_METHOD:
    case path.TOPPINGS:
    case path.NEW_SETTING:
    case path.THANK_YOU:
    case path.PIZZA_TRACKER_PAGE:
    case path.NEW_PROMOTION_DETAIL:
    case path.NEW_PAKET_HEMAT:
    case path.SIDES_DESSERTS:
    case path.DRINKS:
    case path.NEW_HOME:
    case path.ACCOUNT_PAGE:
    case path.NEW_TERM_OF_USE:
    case path.TERM_AND_CONDITIONS:
    case path.NEW_MY_ORDER:
    case path.HISTORY:
    case path.NEWS_AND_UPDATES:

    case path.PRIVACY_POLICY:
      access = true;
      break;
    case path.CHAT_BOT:
      access = true;
      break;
  }
  // check product detail url
  if (access === false) {
    const splitPath = pathname.split("/");
    if (splitPath[1] === "menu") {
      access = true;
    }
    if (
      [
        "pizza",
        "paket-hemat",
        "sides-desserts",
        "beverages",
        "special-offers"
      ].indexOf(splitPath[1]) > -1
    ) {
      if (typeof splitPath[2] !== "undefined" && splitPath[2] !== "") {
        access = true;
      } else {
        const slideIndex = webRedirectMenuSlide(splitPath[1]);
        saveSessionStorage("referalPage", "website-menu-page");
        saveSessionStorage("menuSlideIndex", slideIndex);
        browserHistory.push(path.MENU_PAGE);
        return false;
      }
    }
  }
  if (access === false) {
    console.log("access denied !!!");
    // window.location.href = `/`;
  } else {
    return callback();
  }
}

export const createRoutes = store => ({
  path: "/",
  component: CoreLayout,
  //indexRoute  : Home(store),
  indexRoute: DashboardRoutes(store),
  onEnter: checkPageRestriction,
  childRoutes: [
    ErrorRoutes(store),
    DashboardRoutes(store),
    MenuRoutes(store),
    LoginRoutes(store),
    ContactRoutes(store),
    ViewCartRoutes(store),
    NewServiceMethodRoutes(store),
    ToppingsRoutes(store),
    NewSettingRoutes(store),
    ThankYouRoutes(store),
    TrackerRoutes(store),
    NewPromotionRoutes(store),
    NewPaketHematRoutes(store),
    NewPromotionRoutes(store),
    NewHomeRoutes(store),
    MyAccountRoutes(store),
    NewTermOfUseRoutes(store),
    TermAndConditionRoutes(store),
    NewMyOrderRoutes(store),
    HistoryRoutes(store),
    NewsAndUpdatesRoutes(store),
    PrivacyAndPolicyRoutes(store),
    RegisterRoutes(store),
    //DanaResponseRoutes(store),
    verifyRoutes(store),
    SidesRoutes(store),
    BeveragesRoutes(store),
    SpecialOffersRoutes(store),
    ChatBotRoutes(store)
  ]
});

export default createRoutes;
