import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

import { getSessionStorage, getLocalStorage } from 'components/Helpers';
import CustomerDetailForm from './Customer/CustomerDetailForm';
import { saveLocalStorage } from 'components/Helpers';
import InnerHeader from 'components/InnerHeader';
import Loader from 'components/Loader';
import { Url } from 'config/Config';
import './customerDetail.scss';

class CustomerDetail extends React.Component {
  constructor(props) {
    super(props);
    this.saveCustomerDetail = this.saveCustomerDetail.bind(this);
    this.selectExtension = this.selectExtension.bind(this);
    // branch.logEvent(
    //  "Customer Detail",
    //  function(err) { console.log(err); }
    // )
  }

  componentWillMount() {
    /*
     * Google tag manager
    */
     const tagManagerData = {
       event: 'Pageview',
       url: window.location.pathname,
     }
     window.dataLayer.push(tagManagerData);
   }

  componentWillUnmount() {
    let confirmOrderAtViewCart = getLocalStorage('confirmOrderAtViewCart');
    if (confirmOrderAtViewCart === true) {
      saveLocalStorage('confirmOrderAtViewCart', false);
    }
  }

  saveCustomerDetail(formdata){
    this.props.loadingImage(true);
    const customer_detail = {
      firstname: formdata.firstname,
      lastname: formdata.lastname,
      email: formdata.email,
      phoneNumber: (this.props.selectedExtension !== 'mobile') ? formdata.extPhoneNumber : formdata.phoneNumber,
      contact_type: this.props.selectedExtension,
      contact_ext: (this.props.selectedExtension !== 'mobile') ? formdata.ext : ''
    }
    let deliveryAddress = getLocalStorage('deliveryAddress');
    customer_detail.address = deliveryAddress.address;
    saveLocalStorage('user', customer_detail);
    let slug = getSessionStorage('order-type');
    this.props.loadingImage(false);
    let path = Url.ORDER;
    browserHistory.push(path);
  }

  selectExtension(extension) {
    this.props.setMobileExtension(extension);
  }

  render() {
    return (
      <div className='customer-detail'>
        <Loader loading={this.props.loader} />
        <InnerHeader
          to={Url.HOME_PAGE}
          cartItem={this.props.app.cartItemCount}
        />
        <CustomerDetailForm
          {...this.props}
          initialValues={this.props.initialValues}
          handleSubmit={this.props.handleSubmit(this.saveCustomerDetail)}
          selectExtension={this.selectExtension}
          selectedExtension={this.props.selectedExtension}
        />
      </div>
    );
  }
}

CustomerDetail.propTypes = {
  setMobileExtension: PropTypes.func.isRequired,
  selectedExtension: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object
};

CustomerDetail.contextTypes = {
  t: PropTypes.func.isRequired
}

CustomerDetail.childContextTypes = {
  t: PropTypes.func.isRequired
};

export default CustomerDetail;
