import { translate } from 'components/Helpers';

export const validate = values => {
  const errors = {};
  if(!values.Name) {
    errors.Name = translate('Required');
  }
  if (!values.Name || values.length === 0 || !values.Name.trim()) {
    errors.Name = translate('Name can`t be blank');
  }
  if(!values.Subject) {
    errors.Subject = translate('Required');
  }
  if(!values.Address) {
    errors.Address = translate('Required');
  }
  if(!values.Message) {
    errors.Message = translate('Required');
  }
  if (!values.Email) {
    errors.Email = translate('Required');
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.Email)) {
    errors.Email = translate('Invalid email');
  }
  if (!values.Number) {
    errors.Number = translate('Required');
  }
  return errors;
};

export default validate