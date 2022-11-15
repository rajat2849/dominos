import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";
import { Row, Col } from "reactstrap";
import Badge from "material-ui/Badge";
import { HeaderIcon, Url } from "config/Config";
import "./Header.scss";

const badgeIconStyles = {
  top: 10,
  right: 5,
  width: 20,
  height: 20,
  fontSize: 10,
  backgroundColor: "#cf152d"
};
const secondryTheme = true;
export const Header = props => {
  const {
    to = "/",
    icon = HeaderIcon.CART,
    homeLogo = HeaderIcon.HMLOGO,
    cartItem = 0,
    showCartIcon = true
  } = props;
  return (
    <div className="header-section col-12 col-sm-12 col-xl-12 mb-2 px-4 inner-header-fixed">
      <Row>
        <Col xs="8" sm="8" xl="8" className="pl-3 pr-0 pt-2">
          <Link to={to} className="d-block">
            <img alt="logo" className="logo" src={homeLogo} />
          </Link>
        </Col>
        <Col xs="4" sm="4" xl="4">
          {cartItem > 0 && showCartIcon && (
            <Link
              to={Url.VIEW_CART}
              className="d-block text-right cart pr-0 pt-sm-4 mt-sm-2 cart-box"
            >
              <Badge
                badgeContent={cartItem}
                secondary={secondryTheme}
                badgeStyle={badgeIconStyles}
              >
                <svg
                  fill="#ffffff"
                  height="32"
                  viewBox="0 0 24 24"
                  width="32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                  <path d="M0 0h24v24H0z" fill="none" />
                </svg>
              </Badge>
            </Link>
          )}
          {showCartIcon === true &&
            (cartItem === "" ||
              cartItem === 0 ||
              typeof cartItem === "undefined") && (
              <Link
                to={Url.VIEW_CART}
                className="d-block text-right cart pt-3 pr-0 pt-sm-5"
              >
                <svg
                  fill="#ffffff"
                  height="32"
                  viewBox="0 0 24 24"
                  width="32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                  <path d="M0 0h24v24H0z" fill="none" />
                </svg>
              </Link>
            )}
        </Col>
      </Row>
    </div>
  );
};

Header.propTypes = {
  to: PropTypes.string,
  icon: PropTypes.string,
  homeLogo: PropTypes.string
};

export default Header;
