import React from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
// import _ from "lodash";

import {
  saveSessionStorage,
  saveLocalStorage,
  getLocalStorage
} from "components/Helpers";
import SubHeader from "./SubHeader";
import { Url } from "config/Config";
import { browserHistory } from "react-router";
import { DEFAULT_SITE_LANGUAGE, AVAILABLE_LANGUAGE } from "config/Config";
import "./HomeView.scss";
import "../../../styles/main.scss";

import Branch from "components/Branch";

export const FeedbackButton = (props, context) => (
  <div className="col-sm-12 col-xl-12 col-12 feedback-btn text-center">
    <Button className="text-center">{context.t("Send Feedback")}</Button>
  </div>
);

FeedbackButton.contextTypes = {
  t: PropTypes.func.isRequired
};

export const saveSession = slug => {
  // new Branch().logEvent(slug);
  if (slug === "Delivery" || slug === "Carryout") {
    saveSessionStorage("order-type", slug);
    const order = { deliveryType: slug };
    saveLocalStorage("order", order);
    /*
     *  Setting confirmOrderAtViewCart to false in order to land on menu page.
     *  User must land on menu page if user follow the positive flow rather cart having item or not.
     *  User will land on cart page only user edit the service method, shipping address or click confirm order
     *  button(if service method and shipping address not available on cart page).
     */
    saveLocalStorage("confirmOrderAtViewCart", false);
  }
};

class HomeView extends React.Component {
  constructor(props) {
    super(props);
    this.changeLanguage = this.changeLanguage.bind(this);
    // branch.logEvent("Home", function(err) {
    //   console.log(err);
    // });
  }

  componentWillMount() {
    const tagManagerData = {
      event: "Pageview",
      url: window.location.pathname
    };
    window.dataLayer.push(tagManagerData);
    // self.addEventListener("fetch", event => {
    //   if (event.request.mode === "navigate") {
    //     event.respondWith(fetch("/pwa"));

    //     // Immediately start downloading the actual resource.
    //     fetch(event.request.url);
    //   }
    // });
    let user = getLocalStorage("user");
    user =
      user !== "undefined" && !_.isEmpty(user) && user.address !== "undefined"
        ? saveLocalStorage("user", user)
        : saveLocalStorage("user", {});
    //this.showSplashScreen();
    let loginDetail = getLocalStorage("receivedLoginDetail");
    // set language
    let selectedLang = getLocalStorage("siteLanguage");
    let siteLang = DEFAULT_SITE_LANGUAGE;
    if (
      typeof selectedLang !== "undefined" &&
      AVAILABLE_LANGUAGE.indexOf(selectedLang) > 0
    ) {
      siteLang = selectedLang;
    }
    this.props.setLanguage(siteLang);
    saveLocalStorage("siteLanguage", siteLang);
    if (
      typeof loginDetail !== undefined &&
      typeof loginDetail.customer_id !== undefined &&
      loginDetail.customer_id !== "" &&
      Object.keys(loginDetail).length > 0
    ) {
      browserHistory.push("/dashboard");
    }
    saveSessionStorage("referalPage", "home");
  }

  // showSplashScreen() {
  //   let splashScreen = getSessionStorage('splashScreen');
  //   if (splashScreen !== 'alreadyShown') {
  //     this.props.splashScreen(true);
  //     saveSessionStorage('splashScreen', 'alreadyShown');
  //     setTimeout(() => {
  //       this.props.splashScreen(false);
  //     }, 8000);
  //   }
  //   branch.logEvent(
  //    "Splash Screen",
  //    function(err) { console.log(err); }
  //   )
  // }

  changeLanguage(lang) {
    this.props.setLanguage(lang);
  }

  contactus() {
    browserHistory.push(Url.CONTACT_US);
  }

  render() {
    return (
      <div className="col-12">
        {/* <SplashScreen show={this.props.showSplash} />
        {this.props.showSplash === false &&} */}
        <div className="col-12">
          <div className="p-0 main-wrapper">
            <SubHeader changeLanguage={this.changeLanguage} />
          </div>
        </div>
      </div>
    );
  }
}

HomeView.contextTypes = {
  t: PropTypes.func.isRequired
};

HomeView.childContextTypes = {
  t: PropTypes.func.isRequired
};

export default HomeView;
