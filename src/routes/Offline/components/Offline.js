import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'components/Helpers';

const Offline = () => {
  return (
    <div>
      <p> {translate('You are currently offline. Please connect to your Internet network')} </p>
    </div>
  );
};

export default Offline;
