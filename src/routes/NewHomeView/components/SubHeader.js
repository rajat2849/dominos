import React from "react";
import { Link } from "react-router";
import { saveLocalStorage, getLocalStorage } from "components/Helpers";
import PropTypes from "prop-types";
import { DEFAULT_SITE_LANGUAGE } from "../../../config/Config";
import { Url } from "config/Config";
import { Button } from "reactstrap";

class SubHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLang: DEFAULT_SITE_LANGUAGE
    };
  }

  componentWillMount() {
    let siteLang = getLocalStorage("siteLanguage");
    if (typeof siteLang === "undefined" || siteLang === "") {
      siteLang = DEFAULT_SITE_LANGUAGE;
    }
    saveLocalStorage("siteLanguage", siteLang);
    this.setState({ selectedLang: siteLang });
    this.props.changeLanguage(siteLang);
  }

  changeLanguage(lang) {
    saveLocalStorage("siteLanguage", lang);
    saveLocalStorage("languageSet", true);
    this.setState({ selectedLang: lang });
    this.props.changeLanguage(lang);
    // branch.logEvent("language-section Activity", function(err) {
    //   console.log(err);
    // });
  }

  render() {
    return (
      <div className="col col-xl-12 my-2 language-section px-0 mt-5">
        <h4 className="mb-3 text-center">Silahkan pilih bahasa</h4>
        <div className="row">
          <div className="col pt-1 mb-0">
            <div className="row">
              <Link to={Url.DASHBOARD} className="col-12 px-1 mb-3">
                <Button
                  color=" "
                  className={
                    "flag-icon col " +
                    (this.state.selectedLang === "id"
                      ? "active px-2 ind-bg"
                      : " px-2 ind-bg")
                  }
                  onClick={() => this.changeLanguage("id")}
                >
                  BAHASA INDONESIA
                </Button>
              </Link>
              <Link to={Url.DASHBOARD} className="col-12 px-1">
                <Button
                  color=" "
                  className={
                    "flag-icon col " +
                    (this.state.selectedLang === "en"
                      ? "active eng-bg"
                      : "eng-bg")
                  }
                  onClick={() => this.changeLanguage("en")}
                >
                  ENGLISH
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SubHeader.contextTypes = {
  t: PropTypes.func.isRequired
};

SubHeader.childContextTypes = {
  t: PropTypes.func.isRequired
};

export default SubHeader;
