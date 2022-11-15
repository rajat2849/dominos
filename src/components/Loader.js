import React from 'react';
import PropTypes from 'prop-types';

import './Loader.scss';

export const Loader = (props) => {
	setTimeout(() => {
  }, 6000);
  if (props.loading === false) {
    return null;
  }
  return <div className='loader'></div>;
}

Loader.propTypes = {
  loading: PropTypes.bool
};

export default Loader;
