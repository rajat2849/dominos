import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import OrderForm from './PlaceOrderForm';
import { translate } from 'components/Helpers';

export const PlaceOrder = (props) => {
  let userInfo = [
    { key: 'orderDate', label: translate('Order Date'), section: 'order' },
    { key: 'fullName', label: translate('Customer Name'), section: 'profile'},
    { key: 'phoneNumber', label: translate('Contact Number'), section: 'profile'},
    { key: 'email', label: translate('Email'), section: 'profile'},
    { key: 'deliveryType', label: translate('Service Method'), section: 'order'},
  ];
  let addressObj = '';
  if (typeof props.user.order !== 'undefined' && typeof props.user.order.deliveryType !== 'undefined') {
    if (props.user.order.deliveryType === 'Delivery') {
      addressObj = { key: 'fullAddress', label: translate('Delivery Address'), section: 'profile'};
    } else if (props.user.order.deliveryType === 'Carryout') {
      addressObj = { key: 'AddressLine1', label: translate('Store Address'), section: 'store'};
    }
  }
  if (addressObj !== '') {
    userInfo.push(addressObj);
  }
  return (
    <div className='place-order'>
      <Col sm="12" xs='12' xl='12' className='py-3 mb-2 text-left text-uppercase detail-description box-bg'>
        { typeof props.user !== 'undefined' && typeof props.user.order !== 'undefined' && userInfo.map((row, index) => {
          return (
            <Row key={index}>
              <Col xs='5' sm='5' xl='5' className='pr-1 pl-2'>{row.label}</Col>
              <Col xs='7' sm='7' xl='7' className='pr-2 user-info'>
                {(row.key === "deliveryType" && props.user[row.section][row.key] === "Carryout") ? "CARRY OUT" : props.user[row.section][row.key]}
              </Col>
            </Row>
          );
        }) }
      </Col>
      <OrderForm
        handleSubmit={props.handleSubmit(props.placeOrder)}
        agreeForOrder={props.agreeForOrder}
      />
      <Col sm="12" xs='12' xl='12' className='text-uppercase'>
        <Row>
          <h6 className='text-center col-12 col-sm-12 col-xl-12 f-12'>
            {translate("Please check your email for order confirmation")}.
          </h6>
        </Row>
      </Col>
    </div>
  );
};

PlaceOrder.propTypes = {
  user: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  placeOrder: PropTypes.func.isRequired
};

export default PlaceOrder;
