import homeIcon from "../../public/home-icon.png";
import cartIcon from "../../public/cart.png";
import logoImage from "../../public/logo_dominos.png";
import orderImage from "../../public/your-order.png";
import orderImageActive from "../../public/your-orderActive.png";
import paymentImage from "../../public/payment.png";
import paymentImageActive from "../../public/paymentActive.png";
import detailImage from "../../public/details.png";
import detailImageActive from "../../public/detailsActive.png";
import placedImage from "../../public/placed-img.png";
import makingImage from "../../public/making-img.png";
import ovenImage from "../../public/oven.png";
import pickUpImage from "../../public/pickup.png";
import deliveryImage from "../../public/out-delivery.png";
import OrderCompleteImage from "../../public/pizza-delivered.png";
import placedImageActive from "../../public/placed-img-active.png";
import makingImageActive from "../../public/making-img-active.png";
import ovenImageActive from "../../public/oven-active.png";
import pickUpImageActive from "../../public/pickup-active.png";
import deliveryImageActive from "../../public/out-delivery-active.png";
import OrderCompleteImageActive from "../../public/pizza-delivered-active.png";
import home from "../../public/newimages/home.png";
import setting from "../../public/newimages/setting.png";
import track from "../../public/newimages/track.png";
import nearby from "../../public/newimages/nearby.png";
import pizza from "../../public/newimages/pizza.png";
import cola from "../../public/newimages/cola.png";
import { translate } from "components/Helpers";

export const Config = {
  url: `${API.url}`,
  app_url: `${DANA.url}`,
  token: "lER2MLyGC6Go3rNdE7diPVf0umanUuTf8KhVwPB9ViyZJldnsqFhmViQisdcW6s4",
  devicetype: "pwa",
  Accept: "application/json",
  googleApiKey: `${GoogleAPI.MAP_KEY}`,
  orderEndTime: "22:45",
  orderStartTime: "10:45",
  GoogleAnalyticsKey: `${GoogleAnalytics.API_KEY}`,
  fbPixelKey: `${FacebookPixel.PIXEL_ID}`,
  Facebook: `${Facebook.APP_ID}`
};

export const Url = {
  //NEW_HOME:'/choose_language',
  HOME_PAGE: "/",
  DASHBOARD: "/#",
  MENU_PAGE: "/menu",
  LOGIN_PAGE: "/user",
  CONTACT_US: "/contacts",
  VIEW_CART: "/viewCart",
  NEW_SERVICE_METHOD: "/online-order/servicemethod",
  TOPPINGS: "/pizza",
  NEW_SETTING: "/setting",
  THANK_YOU: "/online-order/success",
  PIZZA_TRACKER_PAGE: "/tracking-order",
  NEW_PROMOTION_DETAIL: "/special-offers",
  NEW_PAKET_HEMAT: "/paket-hemat",
  ACCOUNT_PAGE: "/customer/account",
  NEW_TERM_OF_USE: "/terms-of-use",
  TERM_AND_CONDITIONS: "/terms-and-conditions",
  NEW_MY_ORDER: "/new/dashboard/order",
  HISTORY: "/history",
  NEWS_AND_UPDATES: "/news",
  PRIVACY_POLICY: "/privacy-policy",
  REGISTER_PAGE: "/register",
  VERIFY_PAGE: "/verify",
  SIDES_DESSERTS: "/sides-desserts",
  DRINKS: "/beverages",
  ERROR_PAGE: "/dana-response",
  SPECIAL_OFFERS: "special-offers",
  CHAT_BOT: "/ChatBot"
};

export const Title = {
  NOT_AVAILABLE: translate("Title Not Available"),
  CUSTOMER_DETAIL: translate("CUSTOMER DETAIL"),
  DELIVERY: translate("DELIVERY"),
  PROMOTIONS: translate("PROMOTIONS"),
  VALUE_DEALS: translate("VALUE DEALS"),
  PIZZA: translate("PIZZA"),
  SIDES_DESSERTS: translate("SIDES & DESSERTS"),
  BEVERAGE: translate("BEVERAGE"),
  MY_CART: translate("MY CART"),
  STORE_LOCATOR: translate("STORE LOCATOR")
};

export const NavIcon = [
  { title: translate("PROMOS") },
  { title: translate("PAKET HEMAT") },
  { title: translate("PIZZA") },
  { title: translate("SIDES") },
  { title: translate("BEVERAGE") }
];

export const HeaderIcon = {
  CART: cartIcon,
  HOME: homeIcon,
  HMLOGO: logoImage
};

export const FooterImages = {
  HOME: home,
  ACCOUNT: setting,
  TRACK: track,
  NEARBY: nearby,
  MENU: pizza,
  COLA: cola
};

export const MenuType = {
  PROMOTION: "promotion",
  VALUEDEALS: "valuedeal",
  PIZZA: "pizza",
  SIDES: "sides",
  BEVERAGES: "beverages"
};

export const OrderProgress = [
  {
    id: "order",
    title: translate("order detail"),
    active: orderImageActive,
    inactive: orderImage
  },
  {
    id: "payment",
    title: translate("choose payment"),
    active: paymentImageActive,
    inactive: paymentImage
  },
  {
    id: "placeorder",
    title: translate("place order"),
    active: detailImageActive,
    inactive: detailImage
  }
];

export const Tax = {
  rate: 10
};

export const Cart = {
  MAX_QTY_PER_ITEM: 10
};

export const AccountInfoTab = [
  { name: translate("Login information") },
  { name: translate("Personal information") }
];
export const OrderInfoTab = [
  { name: translate("My Favourite Order") },
  { name: translate("My Previous Order") }
];

export const TrackProgressDelivery = [
  {
    id: "order_placed",
    title: translate("order Placed"),
    img: placedImage
  },
  {
    id: "preparation",
    title: translate("Preparation"),
    img: makingImage
  },
  {
    id: "in_the_oven",
    title: translate("Order Is In oven"),
    img: ovenImage
  },
  {
    id: "ready_to_pickup",
    title: translate("Out for Delivery"),
    img: pickUpImage
  },
  {
    id: "ready",
    title: translate("Out for Delivery"),
    img: pickUpImage
  },
  {
    id: "out_for_delivery",
    title: translate("Out for Delivery"),
    img: deliveryImage
  },
  {
    id: "complete",
    title: translate("Order Delivered"),
    img: OrderCompleteImage
  }
];

export const TrackProgressCarryOut = [
  {
    id: "order_placed",
    title: translate("Order Placed"),
    img: placedImageActive
  },
  {
    id: "preparation",
    title: translate("Preparation"),
    img: makingImageActive
  },
  {
    id: "in_the_oven",
    title: "In the oven",
    img: ovenImageActive
  },
  {
    id: "ready_to_pickup",
    title: translate("Ready To Pickup"),
    img: pickUpImageActive
  },
  {
    id: "complete",
    title: translate("Order Complete"),
    img: OrderCompleteImageActive
  }
];

export const LanguageId = {
  en: "en",
  id: "idn"
};

export const WeekDay = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

export const DEFAULT_SITE_LANGUAGE = "id";

export const AVAILABLE_LANGUAGE = ["id", "en"];

export const PaymentOption = {
  cash: "cashondelivery",
  credit: "banktransfer",
  snapbin: "snapbin",
  snapmigs: "snapmigs"
};

export default Config;
