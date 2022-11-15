import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import { translate } from 'components/Helpers';
import './OrderDetail.scss';

const priceSection = [
  { key: 'subTotal', label: translate('Subtotal') },
  { key: 'tax', label: translate('Tax') },
  { key: 'deliveryFee', label: translate('Delivery Fee') },
  { key: 'total', label: translate('Total') }
];

const Product = (props) => {
  return (
    <div >
      { props.cartItem.map((productObj, index) => {
        let product = Object.values(productObj)[0];
        let productFullName = (typeof product.crust !== 'undefined' && product.crust !== 'undefined') ? product.crust : '';
        productFullName = `${productFullName} ${product.title}`;
        return (
          <Row key={index} className="bdr-B product-detail-row px-2">
            <Col className='py-2 pl-2'>
              <Row className='text-left'>
                <Col xs='12' sm='12' xl='12' className='text-uppercase'>{productFullName}</Col>
              </Row>
            </Col>
            <Col xs='2' sm='2' xl='2' className='py-2'>{product.qty}</Col>
            <Col xs='4' sm='4' xl='4' className='py-2 px-1 text-right'>{parseInt(product.price).toLocaleString('id')}</Col>
          </Row>
        );
      })}
    </div>
  );
};

Product.propTypes = {
  cartItem: PropTypes.array.isRequired
};

const OrderDetail = (props) => {
  return(
    <Row>
      <Col sm="12" xl="12">
        <div className='col-12 col-sm-12 col-xl-12 order-details pb-2 bdr-green'>
          <div className='col-12 px-0'>
            <div className='row'>
              <div className='col-12 col-sm-12 col-xl-12'>
                  <Row className="bdr-B order-header py-1">
                    <Col>{translate('Items')}</Col>
                    <Col className='text-center col-3 col-sm-3 col-xl-3 px-0'>{translate('Qty')}</Col>
                    <Col xs='4' sm='4' xl='4' className='pl-0 pr-2 text-right'>{translate('Price')}(R<span className='text-lowercase'>p)</span></Col>
                  </Row>
                <Product {...props} />
                { typeof props.price !== 'undefined' &&
                  <div className='col-12 col-sm-12 col-xl-12 total-amount-box px-2'>
                    { priceSection.map((row, index) => {
                      return (
                        <Row key={index}>
                          <Col xs='8' sm='8' xl='8' className='text-right'>{row.label}</Col>
                          <Col xs='4' sm='4' xl='4' className='px-1 text-capitalize'>Rp. {props.price[row.key].toLocaleString('id')}</Col>
                        </Row>
                      );
                    })}
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

OrderDetail.propTypes = {
  price: PropTypes.object.isRequired,
};

export default OrderDetail;
