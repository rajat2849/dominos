import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';

import CCImage from '../../../../public/Credit-card.png';
import CODImage from '../../../../public/COD.png';
import ONLINEImage from '../../../../public/ONLINE-PAYMENT.png';
import DANAImage from '../../../../public/dana.png';
import { translate } from 'components/Helpers'; 

const paymentOptions = [
  { key: 'credit', name: translate('Credit Card/Bca Debit'), value: 'credit', image: CCImage },
  { key: 'cash', name: translate('Cash on Delivery'), value: 'cash', image: CODImage },
  { key: 'snapbin', name: translate('Online Payment'), value: 'snapbin', image: ONLINEImage },
  {key: 'snapmigs', name: translate('DANA Wallet'), value: 'snapmigs',image:DANAImage },
];

// branch.logEvent(
//   "Payment Options Screen",
//   function(err) { console.log(err); }
// )

const Payment = (props) => (
  <div className='payment-container'>
    <Col sm="12" className='payment-option col-12 f-14'>
      <Row>
        { paymentOptions.map((option, index) => {
          let activeClass = (props.selectedPaymentOption === option.value) ? 'blue-box' : '';
          return (
            <Col key={index} xs='6' sm='6' xl='6' className='pt-2 pb-2 px-1'>
              <div className={'col-12 col-sm-12 col-xl-12 px-0 box-bg py-3 ' + activeClass} onClick={() => props.setPayment(option.value)} >
                <Row>
                  <span className='col-12 col-sm-12 col-xl-12 text-center'>
                    <img src={option.image} alt={option.name} title={option.name} />
                  </span>
                  <span className='col-12 col-sm-12 col-xl-12 text-center pt-2'>
                    {option.name}
                  </span>
                </Row>
              </div>
            </Col>
          );
        })}
      </Row>
    </Col>
    <Col xs='12' sm='12' xl='12' className={(props.isPaymentOptionSelected) ? 'box-bg payment-text p-2 my-3 text-left f-12' : 'd-none'}>
     {  
      (props.selectedPaymentOption === 'credit') ?
        <span>{translate('Our crew member will carry a portable EDC machine for credit card/debit card payment during delivery payments made on delivery')}.</span>
       :(props.selectedPaymentOption === 'cash') ?
        <span>{translate('Cash Payment on delivery')}.</span>
       :(props.selectedPaymentOption === 'snapbin') ?
        <span>{translate('Online Payment on Domino’s Pizza Website / Apps')}.</span>
        :(props.selectedPaymentOption === 'snapmigs') ?
        <span>{translate('Amount will be deducted from your DANA account')}.</span>
       : <span />
     }
    </Col>
  </div>
);

Payment.propTypes = {
  selectedPaymentOption: PropTypes.string
};

export default Payment;
