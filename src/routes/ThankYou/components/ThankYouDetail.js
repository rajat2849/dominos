import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import { translate } from 'components/Helpers';

const summaryField = [
  { key: 'orderId', label: translate('Order Id') },
  { key: 'deliveryType', label: translate('Service Method') },
  { key: 'storeAddress', label: translate('Store Address') },
  { key: 'phoneNumber', label: translate('Contact Number') }
];

class ThankYouDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let summaryFieldKey = '';
    let summaryFieldLabel = '';
    return(
      <div className='col-12 thank-you-details text-left py-2 px-0'>
      { summaryField.map((row, index) => {
        summaryFieldKey = row.key;
        summaryFieldLabel = row.label;
        if (row.key === 'storeAddress' && this.props.orderSummary.deliveryType === 'Delivery') {
          summaryFieldLabel = translate('Delivery Address');
          summaryFieldKey = 'userAddress';
        }
        return (
          <Row key={index} className='mx-0 my-2'>
            <Col xs='6' sm='5' className='text-left pl-2 order-title pr-0 f-14'>{summaryFieldLabel}</Col>
            <Col xs='6' sm='7' className='pr-2 order-description pl-0'>
              {(summaryFieldKey === "deliveryType" && this.props.orderSummary[summaryFieldKey] === "Carryout") ? "TAKEAWAY" : this.props.orderSummary[summaryFieldKey]}
            </Col>
          </Row>
        );
      })}
    </div>
    );
  }
}

ThankYouDetail.propTypes = {
  orderSummary: PropTypes.object.isRequired
};

export default ThankYouDetail;
