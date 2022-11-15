import React from 'react';
import PropTypes from 'prop-types';
import { Row, Nav, NavItem, NavLink } from 'reactstrap';

import { OrderProgress } from 'config/Config';

import classnames from 'classnames';
import './OrderDetail.scss';

class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='progress-bar-container col-12 col-sm-12 col-xl-12 px-0'>
        <h4 className='title col-12 col-sm-12 col-xl-12'><span>{this.context.t("order confirmation")}</span></h4>
        <Nav tabs className='tab-sub-menu'>
          { OrderProgress.map((item, index) => {
            let title = item.title.split(' ');
            return (
              <NavItem className='col-4' key={item.id}>
                <Row>
                  <NavLink
                    className={classnames({ active: this.props.activeTab === item.id, 'processed-tab': this.props.activeTab !== item.id && this.props.progress.indexOf(item.id) > -1 })}
                    onClick={() => { this.props.toggle(item.id); }}
                  >
                    <span className='tab-img'>
                      <img src={item.inactive} alt='' />
                      <img className='active-icon' src={item.active} alt='' />
                    </span>
                    {title[0]}
                    <br/>
                    {title[1]}
                    <span className='tab-down-arrow' />
                  </NavLink>
                </Row>
              </NavItem>
            );
          })}
        </Nav>
      </div>
    );
  }
}

ProgressBar.propTypes = {
  activeTab: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
  progress: PropTypes.array.isRequired
};

ProgressBar.contextTypes = {
  t: PropTypes.func.isRequired
}

export default ProgressBar;
