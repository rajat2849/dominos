import React from "react";
import { Link } from "react-router";
import PropTypes from "prop-types";

import { Url, FooterImages } from "config/Config";
import MenuList from "./MenuList";
import { getLocalStorage } from "components/Helpers"; 

// statefull component
class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const lang = getLocalStorage("siteLanguage")
    const HomeIcon = props => {
      return (
          <div className="home item">
          <Link to={props.url.DASHBOARD} className="active">
            <div className="section">
              <defs variant="contained" color="primary">
                <img
                  className="item-image img-fluid"
                  src={props.icon}
                  alt="icon"
                />
                <div>Home</div>
              </defs>
            </div>
          </Link>
        </div>
      );
    };
    const NearBy = props => {
      return (
        <div className={lang === 'id' ? "nearby item  footer" : "nearby item footer"}>
        <Link  to= {{
                pathname: Url.NEW_SERVICE_METHOD,
                state : {
                    page : "carryout"
                }
              }}>
              <div className="section">
                <defs variant="contained" color="primary">
                  <img
                    className="item-image img-fluid"
                    src={props.icon}
                    alt="icon"
                  />
                  <div>Near by</div>
                </defs>
              </div>
            </Link>
        </div>
      );
    };
    const Track = props => {
      return (
        <div className="track item  footer">
            <Link to={props.url.PIZZA_TRACKER_PAGE}>
              <div className="section">
                <defs variant="contained" color="primary">
                  <img
                    className="item-image img-fluid"
                    src={props.icon}
                    alt="icon"
                  />
                  <div>Track</div>
                </defs>
              </div>
            </Link>
        </div>
      );
    };
    const Setting = props => {
      return (
        <div className="track item footer">
            <Link
             to= {{
                pathname:props.url.NEW_SETTING,
                state : {
                    chatBotData : this.props.chatBotData
                }
              }}
             >
              <div className="section">
                <defs variant="contained" color="primary">
                  <img
                    className="item-image img-fluid"
                    src={props.icon}
                    alt="icon"
                  />
                  <div>Settings</div>
                </defs>
              </div>
            </Link>
        </div>
      );
    };

    return (
      <div className="row mx-0 footer">
        <div className="menuWapper fixed-bottom white col-12 px-2">
          <div className="row justify-content-center position-relative  text-center">
          <HomeIcon url={Url} icon={FooterImages.HOME} />
            <NearBy url={Url} icon={FooterImages.NEARBY} />
              <MenuList
                pathname={this.props.pathname}
                imageUrl={Url}
              />
            <div className="menu-btn-text f-14">Menu</div>
            <Track url={Url} icon={FooterImages.TRACK} />
            <Setting url={Url} icon={FooterImages.ACCOUNT} />

          </div>
        </div>
      </div>
    );
  }
}
Footer.contextTypes = {
  t: PropTypes.func.isRequired
};

export default Footer;
