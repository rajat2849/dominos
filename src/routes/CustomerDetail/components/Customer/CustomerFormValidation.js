import { translate } from 'components/Helpers';
export const validate = values => {
  const errors = {};
  if(!values.firstname) {
    errors.firstname = translate('Required');
  }
  if (!values.firstname || values.length === 0 || !values.firstname.trim()) {
    errors.firstname = translate('First Name can`t be blank');
  }
  if(!values.lastname) {
    errors.lastname = translate('Required');
  }
  if (!values.lastname || values.length === 0 || !values.lastname.trim()) {
    errors.lastname = translate('Last Name can`t be blank');
  }
  if (!values.email) {
    errors.email = translate('Required');
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = translate('Invalid email');
  }
  if (!values.phoneNumber) {
    errors.phoneNumber = translate('Required');
  } else if(values.phoneNumber.length < 9) {
    errors.phoneNumber = translate('Invalid phone no');
  }
  if (!values.extPhoneNumber) {
      errors.extPhoneNumber = translate('Required');
  } else if(values.extPhoneNumber.length <6) {
      errors.extPhoneNumber = translate('Invalid phone no');
  }
  return errors;
};
