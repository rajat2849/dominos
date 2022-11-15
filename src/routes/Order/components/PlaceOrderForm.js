import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import { Field } from 'redux-form';
import TextareaFormControl from 'components/TextareaFormControl';
import CheckboxFormControl from 'components/CheckboxFormControl';
import FormSubmitButtons from 'components/FormSubmitButtons';

class PlaceOrderForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className='place-order-form'>
        <form name='placeorder=' onSubmit={this.props.handleSubmit} className='text-left'>
          <Col sm="12" xs='12' xl='12' className='box-bg my-2 pt-2'>
            <Row>
              <Col xs='12' sm='12' xl='12'>
                <Col xs='12' sm='12' xl='12' className='text-uppercase px-0'>
                  <Field type='textarea' name='additional_instruction' placeholder={this.context.t('Additional information, i.e: payment by MAP Voucher, use west gate, extra chili sauce.')} rows={4} component={TextareaFormControl}>{this.context.t("Additional Instruction")}</Field>
                </Col>
              </Col>
            </Row>
          </Col>
          <Col sm="12" xs='12' xl='12' className='box-bg my-2'>
            <Row>
              <Col xs='12' sm='12' xl='12'>
                <h6 className='col-12 col-sm-12 col-xl-12 text-center bdr-B px-0 pb-3 pt-2'>
                  {this.context.t('Important! once you click the "Order Now" button you cannot cancel and are obligated to pay according to the amount shown.')}
                </h6>
                <Col xs='12' sm='12' xl='12' className='text-center f-12 agree-box'>
                  <Field type='checkbox' name='agree' onChange={this.props.agreeForOrder} labelClass='' component={CheckboxFormControl}>
                    {this.context.t('Agree')}
                  </Field>
                </Col>
              </Col>
            </Row>
          </Col>
          <FormSubmitButtons
            displayBackButton={false}
            className='mt-4 mb-3'
            buttonSize={''}
          />
          {this.props.error && <strong>{this.props.error}</strong>}
        </form>
      </div>
    );
  }
}

PlaceOrderForm.propTypes = {
  handleSubmit : PropTypes.func.isRequired,
  error: PropTypes.string
};

PlaceOrderForm.contextTypes = {
  t: PropTypes.func.isRequired
}

export default PlaceOrderForm;
