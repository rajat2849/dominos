import React from 'react';
import PropTypes from 'prop-types';
import './PageLayout.scss';

export const PageLayout = ({ children }) => (
  <div className='col-12 home-bg'>
        <div className='row'>
          {children}
        </div>
  </div>
);

PageLayout.propTypes = {
  children: PropTypes.node,
};

export default PageLayout;
