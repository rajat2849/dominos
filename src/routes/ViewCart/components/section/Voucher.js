import React from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row
} from 'reactstrap';
import checkIcon from '../../../../../public/arrow-right.png';
import { translate } from 'components/Helpers';

export const Voucher = (props) => (
  <Form className='text-center'>
    <Label for="voucherCode" className='col-12 col-sm-12 col-xl-12 px-1'>{translate('Use Voucher')}</Label>
    <FormGroup className='mb-0 col-12 col-sm-12 col-xl-12 text-center px-2'>
      <Row>
        <Input 
          type="text" 
          className='col-8 col-sm-4 col-xl-3 text-uppercase' 
          name="voucherCode" 
          id="voucherCode" 
          placeholder={translate("Enter Voucher Code")}
          onChange={(e) => props.handleOnChange(e.target.value)} 
        />
        <Button 
          className='ml-1 col-2 col-sm-1 col-xl-1'
          onClick={() => props.applyVoucher()}
        >
          <img src={checkIcon} alt='check' />
        </Button>
      </Row>
    </FormGroup>
  </Form>
);

export default Voucher;
