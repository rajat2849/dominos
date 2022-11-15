import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col
} from 'reactstrap';

class Price extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { subtotal, tax, deliveryFee, total } = this.props;
    return (
      <div className='mt-3 mb-2 col-12 col-sm-12 col-xl-12 total-box'>
        <Row>
          <Col>{this.context.t("Subtotal")} </Col>
          <Col>Rp. { subtotal.toLocaleString('id') } </Col>
        </Row>
        <Row>
          <Col>{this.context.t("Tax")} </Col>
          <Col> Rp. { tax.toLocaleString('id') } </Col>
        </Row>
        <Row>
          <Col>{this.context.t("Delivery Fee")} </Col>
          <Col>Rp. { deliveryFee.toLocaleString('id') }  </Col>
        </Row>
        <Row className='total-amount mt-3 mb-0 py-2'>
          <Col className='col-3 col-sm-3 col-xl-9'>{this.context.t("Total")}</Col>
          <Col className='col-9 col-sm-9 col-xl-9'>Rp. { total.toLocaleString('id') } </Col>
        </Row>
      </div>
    );
  }
}

Price.propTypes = {
  subtotal: PropTypes.number.isRequired,
  tax: PropTypes.number.isRequired,
  deliveryFee: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
};

Price.contextTypes = {
  t: PropTypes.func.isRequired
}

export default Price;

