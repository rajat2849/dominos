import React from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import PropTypes from "prop-types";

import { Link } from "react-router";
import pizza from "../../../../public/newimages/pizza.png";
import close from "../../../../public/newimages/close.png";
import { Url } from "config/Config";
import categoriesIcon from "../../../../public/newimages/promo_icon.png";
import P_h_Image from "../../../../public/newimages/paket_hamet_icon.png";
import P_image from "../../../../public/newimages/deliciouspizzas.png";
import S_image from "../../../../public/newimages/delicioussides.png";
import B_image from "../../../../public/newimages/beverages.png";
import { getLocalStorage } from "components/Helpers";
import { saveLocalStorage } from "components/Helpers";

class MenuList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: false,
      menuTitle: [
        { name: "Everyday Special Moment Deals", src: categoriesIcon, scrollTo: "Promo" },
        { name: "Value Deals", src: P_h_Image, scrollTo: "Paket Hemat" },
        { name: "Pizza", src: P_image, scrollTo: "Delicious Pizza" },
        { name: "Sides", src: S_image, scrollTo: "sides" },
        { name: "Beverages", src: B_image, scrollTo: "Beverages" }
      ]
    };
    this.toggle = this.toggle.bind(this);
    saveLocalStorage('previousLocation', 'Promo');
  }

  toggle() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    const { isToggleOn } = this.state;
    const lang = getLocalStorage("siteLanguage");
    const menuList = _.get(this.props , "menuTitle" , this.state.menuTitle);
    return (
      <div className={lang === "id" ? "menu-icon item ml-2" : "menu-icon item"}>
        {this.props.pathname === Url.HOME_PAGE ? (
          <div className="col-auto menu-img-icon">
            <ButtonDropdown
              toggle={this.toggle}
              variant="round"
              className="hide-dropdown"
            >
              <Link
                to={Url.MENU_PAGE}
                className="active"
                className="menu-btn"
                color=" "
              >
                <img
                  className="menu-pizza-img item-image img-fluid"
                  src={pizza}
                  alt="icon"
                />
              </Link>
            </ButtonDropdown>
          </div>
        ) : (
          <div className="col-auto d-flex">
            <ButtonDropdown
              toggle={this.toggle}
              variant="round"
              className={
                // this.state.isToggleOn ? "show-dropdown" : "hide-dropdown"
                this.state.isToggleOn ? "hide-dropdown" : "hide-dropdown"
              }
            >
              <DropdownToggle className="menu-btn" color=" ">
                <img
                  className="menu-pizza-img item-image img-fluid"
                  src={isToggleOn ? pizza : pizza}
                  alt="icon"
                />
              </DropdownToggle>
              {/* {this.state.isToggleOn && (
                <DropdownMenu className="menu-dropdown">
                  {menuList && menuList.map((item, index) => {
                    const trans = item.name;
                    return (
                      <React.Fragment key={item.name}>
                        <DropdownItem
                          onClick={() =>
                            this.props.scrollFromMenu(item.scrollTo)
                          }
                          className="d-flex align-itmes-center mb-2"
                        >
                          <span className="categories-icon col-2 px-0">
                            <img src={item.src} alt="" className="img-fluid" />
                          </span>
                          <span className="categories-title col-10 px-0 ml-1 font-weight-bold	">
                            {trans}
                          </span>
                        </DropdownItem>
                      </React.Fragment>
                    );
                  })}
                </DropdownMenu>
              )} */}
            </ButtonDropdown>
          </div>
        )}
      </div>
    );
  }
}

MenuList.contextTypes = {
  t: PropTypes.func.isRequired
};

export default MenuList;
