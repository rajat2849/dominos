import React from "react";
import PropTypes from "prop-types";
import { Link, browserHistory } from "react-router";
import Badge from "material-ui/Badge";
import FontIcon from "material-ui/FontIcon";

import { HeaderIcon, Url } from "config/Config";
import "./InnerHeader.scss";

const badgeIconStyles = {
  top: -5,
  width: 20,
  height: 20,
  fontSize: 10,
  backgroundColor: "#cf152d"
};

const ModalHeader = props => {
  const {
    to = "/",
    home = HeaderIcon.HOME,
    cartItem = 0,
    showCartIcon = true
  } = props;
  const secondryTheme = true;
  return (
    <div className="col-sm-12 col-xl-12 inner-pg-header inner-header-fixed">
      <div className="row">
        {/*<Link to={to} className='col-sm-3 col-3 text-center pl-0 pr-4'>
          <FontIcon className="material-icons md-36" color={'#fff'}>&#xE5CB;</FontIcon>
        </Link>*/}
        <a
          className="col-sm-3 col-3 text-center pl-0 pr-4"
          onClick={() =>
            props.handleCloseModal(
              props.defaultSize === "Personal"
                ? props.defaultPersonalToppings
                : props.defaultToppings,
              props.defaultSize
            )
          }
        >
          <FontIcon className="material-icons md-36" color={"#fff"}>
            &#xE5CB;
          </FontIcon>
        </a>
        <Link className="col-sm-6 col-6 text-center pt-1" to={Url.HOME_PAGE}>
          <span className="header-btn">
            <img src={home} alt="" />
          </span>
        </Link>
        {cartItem > 0 && showCartIcon && (
          <Link
            to={Url.VIEW_CART}
            className="col-sm-3 col-3 text-center cart-icon pr-3 pt-1"
          >
            <Badge
              badgeContent={cartItem}
              secondary={secondryTheme}
              badgeStyle={badgeIconStyles}
            >
              <FontIcon className="material-icons md-28" color={"#fff"}>
                &#xE8CC;
              </FontIcon>
            </Badge>
          </Link>
        )}
        {showCartIcon === true &&
          (cartItem === "" ||
            cartItem === 0 ||
            typeof cartItem === "undefined") && (
            <Link className="col-sm-3 col-3 text-center cart-icon pr-1 pt-1">
              <FontIcon className="material-icons md-28" color={"#fff"}>
                &#xE8CC;
              </FontIcon>
            </Link>
          )}
      </div>
    </div>
  );
};

ModalHeader.propTypes = {
  to: PropTypes.string,
  home: PropTypes.string,
  cartItem: PropTypes.number
};

export default ModalHeader;
