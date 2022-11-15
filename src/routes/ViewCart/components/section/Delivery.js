import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { Link } from 'react-router/lib';
import editIcon from '../../../../../public/edit.png';
import { Url } from "../../../../config/Config";
import { translate, saveLocalStorage } from 'components/Helpers';

export const OrderOption = (props) => {
  return (
  <div className='mb-2 col-12 col-sm-12 col-xl-12 py-2 order-option'>
    <Row>
      <Col xs='6' sm='6' xl='6' className='pr-0 pl-4'>
        <Row>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"

                checked={(props.selectLaterOption === true) ? false : true}
                onChange={() => props.changeLaterOrderOption(false)}
                name="radio1" />{' '}
              {translate("Order Now")}
            </Label>
          </FormGroup>
        </Row>
      </Col>
      <Col xs='6' sm='6' xl='6' className='order-later pr-0'>
        <Row>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                checked={(props.selectLaterOption == true) ? true : false}
                onChange={() => props.changeLaterOrderOption(true)}
                name="radio1" />{' '}
              {translate("Order Later")}
            </Label>
          </FormGroup>
        </Row>
      </Col>
      <Col xs='12' sm='12' xl='12' className={(props.isShowLaterOrder ? '' : 'order-later-option')}>
        <Row className='order-later-desc'>
          <Col xs='6' sm='6' xl='6' className='px-1'>
            <Input
              type='select'
              onChange={(e) => props.calculateLateOrderDateTime(e.target.value)}
              name="date"
              value={(typeof props.selectedLaterDate !== "undefined") ? props.selectedLaterDate : ""}
            >
              <option>{translate("Today")}</option>
              {
                (props.date.map((value, key) =>
                  <option
                    key={key}
                  >
                    {value}
                  </option>
                ))
              }
            </Input>
          </Col>
          <Col xs='6' sm='6' xl='6' className='px-1'>
            <Input
              type='select'
              onChange={(e) => props.saveOrderTime("time", e.target.value)}
              name="time"
              value={props.selectedTime}
            >
            {
              (props.time.map((value, key) =>
                <option
                  key={key}
                >
                  {value}
                </option>
              ))
            }
            </Input>
          </Col>
        </Row>
      </Col>
    </Row>
  </div>
);
}

class Delivery extends React.Component {
  constructor(props) {
    super(props);
    this.editServiceMethod = this.editServiceMethod.bind(this);
    this.editAddress = this.editAddress.bind(this);
  }

  editServiceMethod() {
    saveLocalStorage('confirmOrderAtViewCart', true);
  }

  editAddress() {
    saveLocalStorage('confirmOrderAtViewCart', true);
  }

  render() {
    const {
      deliveryType,
      address,
      phoneNumber,
      isShowLaterOrder,
      changeLaterOrderOption,
      date,
      time,
      calculateLateOrderDateTime,
      saveOrderTime,
      selectedTime,
      store,
      selectLaterOption,
      selectedLaterTime,
      selectedLaterDate
    } = this.props;
    let addressLevel = '';
    let selectedAddress = '';
    if (deliveryType === 'Carryout') {
      addressLevel = this.context.t('Store Address');
      selectedAddress = (typeof store.AddressLine1 !== 'undefined') ? store.AddressLine1 : '';
    } else if (deliveryType === 'Delivery') {
      addressLevel = this.context.t('Delivery Address');
      selectedAddress = address;
    }
    return (
      <div className='col-12 col-sm-12 col-xl-12 py-2 px-0'>
        <OrderOption
          isShowLaterOrder={isShowLaterOrder}
          changeLaterOrderOption={changeLaterOrderOption}
          date={date}
          time={time}
          calculateLateOrderDateTime={calculateLateOrderDateTime}
          saveOrderTime={saveOrderTime}
          selectedTime={selectedTime}
          selectLaterOption={selectLaterOption}
          selectedLaterDate={selectedLaterDate}
          selectedLaterTime={selectedLaterTime}
        />
        <div className='mb-3 col-12 col-sm-12 col-xl-12 service-box py-2'>
          <Row>
            <p className='col-12 col-sm-12 col-xl-12 mb-0 p-0 text-left'>{this.context.t("service Method")}</p>
          </Row>
          <Row className='service-description'>
            <Col className='col-9'>{(deliveryType === "Carryout") ? "CARRY OUT" : deliveryType} </Col>
            <Col className='col-3 edit-icon'>
              <Link to={Url.GUEST_DELIVERY} onClick={this.editServiceMethod}><img src={editIcon} alt='edit' />{this.context.t("Edit")}</Link>
            </Col>
          </Row>
          <Row>
            <p className='col-12 col-sm-12 col-xl-12 mb-0 p-0 text-left mt-3'>{addressLevel}</p>
          </Row>
          <Row className='service-description'>
            <Col className='col-9'>
              {selectedAddress} <br />
              {phoneNumber}
            </Col>
            <Col className='col-3 edit-icon'>
              <Link to={(deliveryType === "Carryout") ? Url.STORE_LOCATOR : Url.DELIVERY_PAGE} onClick={this.editAddress}>
                <img src={editIcon} alt='edit' />{this.context.t("Edit")}
              </Link>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

Delivery.propTypes = {
  deliveryType: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  address: PropTypes.string.isRequired,
  phoneNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};


Delivery.contextTypes = {
  t: PropTypes.func.isRequired
}

export default Delivery;
