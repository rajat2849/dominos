import React from 'react';
import PropTypes from 'prop-types';
import { Link, browserHistory } from 'react-router';
import Badge from 'material-ui/Badge';
import FontIcon from 'material-ui/FontIcon';
import { Button } from 'reactstrap';

import { HeaderIcon, Url } from 'config/Config';
import './InnerHeader.scss';

const badgeIconStyles = {
  top: -5,
  width: 20,
  height: 20,
  fontSize: 10,
  backgroundColor: '#cf152d'
};

const InnerHeader = (props) => {
  const {
    to = '/',
    home = HeaderIcon.HOME,
    cartItem = 0,
    showCartIcon = true
  } = props;
  const secondryTheme = true;
  return (
    <div className='col-sm-12 col-xl-12 inner-pg-header inner-header-fixed'>
      <div className='row'>
        <a className='col-sm-3 col-3 text-center pl-0 pr-4' onClick={() => browserHistory.goBack()}>
        <svg fill="#ffffff" height="36" viewBox="0 0 24 24" width="36" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/>
            <path d="M0-.5h24v24H0z" fill="none"/>
        </svg>
        </a>
        <Link className='col-sm-6 col-6 text-center pt-1' to={Url.HOME_PAGE}>
          <span className='header-btn'><img src={home} alt='' /></span>
        </Link>
        { cartItem > 0 && showCartIcon &&
          <Link to={Url.VIEW_CART} className={props.isShakeCartIcon === true ? 'col-sm-3 col-3 text-center cart-icon pr-3 pt-1 shake' : 'col-sm-3 col-3 text-center cart-icon pr-3 pt-1'}>
            <Badge
              badgeContent={cartItem}
              secondary={secondryTheme}
              badgeStyle={badgeIconStyles}
            >
              <svg fill="#ffffff" height="28" viewBox="0 0 24 24" width="28" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
              </svg>
            </Badge>
          </Link>
        }
        { (showCartIcon === true && (cartItem === '' || cartItem === 0 || typeof cartItem === 'undefined')) &&
          <Link to={Url.VIEW_CART} className='col-sm-3 col-3 text-center cart-icon pr-1 pt-1'>
            <svg fill="#ffffff" height="28" viewBox="0 0 24 24" width="28" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
              </svg>
          </Link>
        }
      </div>
    </div>
  );
};

InnerHeader.propTypes = {
  to: PropTypes.string,
  home: PropTypes.string,
  cartItem: PropTypes.number
};

export default InnerHeader;
