import React from "react";
import "./Setting.scss";
import { Row, Col } from "reactstrap";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import NewHeader from "../../../../src/components/NewHeader";
import { Link } from "react-router";
import { Url } from "config/Config";
import Loader from "components/Loader";
import {
  removeLocalStorage,
  saveLocalStorage,
  getLocalStorage
} from "components/Helpers";
import { DEFAULT_SITE_LANGUAGE, AVAILABLE_LANGUAGE } from "config/Config";
import PropTypes from "prop-types";

class SettingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: true,
      isOpen: false
    };
    this.toggle = this.toggle.bind(this);
    this.removeData = this.removeData.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  toggle() {
    this.setState({
      isOpen: !this.state.toggle
    });
  }
  handleChange(e) {
    this.setState(
      {
        checked: e.target.checked
      },
      () => {
        this.changeLanguage(this.state.checked);
      }
    );
  }
  removeData() {
    removeLocalStorage("receivedLoginDetail");
    removeLocalStorage("order");
    removeLocalStorage("deliveryAddress");
    removeLocalStorage("store");
    let cartItems = [];
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }
  componentWillMount() {
    let selectedLang = getLocalStorage("siteLanguage");
    let siteLang = DEFAULT_SITE_LANGUAGE;
    if (
      typeof selectedLang !== "undefined" &&
      AVAILABLE_LANGUAGE.indexOf(selectedLang) >= 0
    ) {
      siteLang = selectedLang;
      if (selectedLang === "en") {
        this.setState({
          checked: true
        });
      } else if (selectedLang === "id") {
        this.setState({
          checked: false
        });
      }
    }
  }

  componentDidMount() {
    let lang = getLocalStorage("siteLanguage");
    if (lang == null) {
      this.props.loadingImage(true);
    } else {
      this.props.loadingImage(false);
    }
  }
  changeLanguage(checked) {
    if (checked === true) {
      saveLocalStorage("siteLanguage", "en");
      this.props.setLanguage("en");
    } else {
      saveLocalStorage("siteLanguage", "id");
      this.props.setLanguage("id");
    }
  }

  render() {
    const language = getLocalStorage("siteLanguage");
        let chatStatus = getLocalStorage("chatBotStatus");
    const lang = language === "en" ? "English" : "Indonesian";
    let loginDetails = JSON.parse(localStorage.getItem("receivedLoginDetail"));
    {
      this.loginDetails;
    }
    return (
      <div className="col-12 px-0">
        <NewHeader page={this.context.t("Settings")} />
        <Row className="pt-4 setting-wrapper mx-0">
          <Col sm={12}>
            <Row>
              <FormControlLabel
                label="Languages"
                className="col-12"
                control={
                  <Switch
                    className="Languages"
                    onChange={e => this.handleChange(e)}
                    checked={this.state.checked}
                  />
                }
              />
              <span className="col-12 d-block text-black-50 selected-lang">
                {lang}
              </span>
              {loginDetails === null ? (
                <div>
                  <div className="col-12 setting-item">
                    <Link
                      onClick={sessionStorage.setItem(
                        "fromPage",
                        JSON.stringify(Url.DASHBOARD)
                      )}
                      to={Url.LOGIN_PAGE}
                    >
                      <p className="mb-0 text-uppercase">
                        {this.context.t("Login")}
                      </p>
                    </Link>
                  </div>
                  <div className="col-12 setting-item">
                    <Link to={Url.CONTACT_US}>
                      <p className="mb-0 text-uppercase">
                        {" "}
                        {this.context.t("Contact Us")}
                      </p>
                      <p className="text-black-50 mb-0 mt-2">
                        {" "}
                        We would love to hear what you think about Domino's
                      </p>
                    </Link>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="col-12 setting-item">
                    <Link to={Url.ACCOUNT_PAGE}>
                      <p className="mb-0 text-uppercase">
                        {this.context.t("MANAGE ACCOUNT")}
                      </p>
                      <p className="text-black-50 mb-0 mt-2">
                        {" "}
                        View and update your log in and personal information
                      </p>
                    </Link>
                  </div>

                     <div className="col-12 setting-item">
                     {chatStatus === "true" ?  <Link to={Url.CHAT_BOT}>
                      <p className="mb-0 text-uppercase">
                        {this.context.t("CONNECT WITH VIRTUAL ASSISTANT")}
                      </p>
                      <p className="text-black-50 mb-0 mt-2">
                        {" "}
                        {this.context.t("Connect To Virtual Assistant")}
                      </p>
                    </Link> : null}
                   
                  </div>

                  <div className="col-12 setting-item">
                    <Link to={Url.CONTACT_US}>
                      <p className="mb-0 text-uppercase">
                        {" "}
                        {this.context.t("Contact Us")}
                      </p>
                      <p className="text-black-50 mb-0 mt-2">
                        {" "}
                        {this.context.t(
                          "We would love to hear what you think about Dominos"
                        )}
                      </p>
                    </Link>
                  </div>
                </div>
              )}
              {loginDetails !== null ? (
                <div className="col-12 setting-item">
                  <Link to={Url.NEW_MY_ORDER}>
                    <p className="mb-0 text-uppercase">
                      {this.context.t("Order History")}{" "}
                    </p>
                    <p className="text-black-50 mb-0 mt-2">
                      {" "}
                      View your favourite and previous orders
                    </p>
                  </Link>
                </div>
              ) : (
                ""
              )}
              <div className="col-12 setting-item">
                <Link to={Url.HISTORY}>
                  <p className="mb-0 text-uppercase">
                    {" "}
                    {this.context.t("Company History")}
                  </p>
                </Link>
              </div>
              <div className="col-12 setting-item">
                <Link to={Url.NEWS_AND_UPDATES}>
                  <p className="mb-0 text-uppercase">
                    {this.context.t("News And Updates")}
                  </p>
                </Link>
              </div>
              
              <div className="col-12 setting-item">
                <Link to={Url.PRIVACY_POLICY}>
                  <p className="mb-0 text-uppercase">
                    {this.context.t("PRIVACY POLICY")}
                  </p>
                </Link>
              </div>
              <div className="col-12 setting-item">
                <Link to={Url.NEW_TERM_OF_USE}>
                  <p className="mb-0 text-uppercase">
                    {this.context.t("TERM OF USE")}
                  </p>
                </Link>
              </div>
              {loginDetails !== null ? (
                <div className="col-12 setting-item text-danger">
                  <Link
                    className="text-danger"
                    onClick={() => this.removeData()}
                    to={Url.DASHBOARD}
                  >
                    <p className="mb-0 text-uppercase">
                      {this.context.t("Logout")}
                    </p>
                  </Link>
                </div>
              ) : (
                ""
              )}
            </Row>
          </Col>
        </Row>
        <Loader loading={this.props.loader} />
      </div>
    );
  }
}

SettingForm.contextTypes = {
  t: PropTypes.func.isRequired
};
export default SettingForm;
