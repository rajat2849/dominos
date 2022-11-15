import { translate } from 'components/Helpers';

export const validate = values => {
  const errors = {};
  if(!values.Password) {
    errors.Password = '!Required';
  }
  if (!values.ConfirmPassword) {
    errors.ConfirmPassword = '!Required';
  } else if(values.Password != values.ConfirmPassword) {
    errors.ConfirmPassword = '!Confirm password not matched'
  }
  return errors;
};
