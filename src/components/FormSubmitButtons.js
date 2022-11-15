import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { Link } from 'react-router';
// import './FormSubmitButtons.scss'
import { translate } from 'components/Helpers';

const FormSubmitButtons = (props) => {
  const {
    submitLabel = translate('Save'),
    backLabel = translate('Back'),
    submitColor = 'success',
    backColor = 'secondary',
    backLink = '/',
    displaySubmitButton = true,
    displayBackButton = true,
    onSubmit,
    buttonColSize = 'col-6',
    displayEmptyCols = true,
    children = '',
    buttonSize = 'lg text-uppercase px-1 py-2',
    orderNow = translate('Order Now'),
    disabled = false
  } = props;
  return (
    <div className={'row ' + (props.className || '')}>
      {displayEmptyCols && <div className='col'>{' '}</div>}
      {displaySubmitButton && <div className={buttonColSize}>
        <Button
          color={submitColor}
          disabled={disabled}
          type='submit'
          size={buttonSize}
          block
          className='order-btn'
          onClick={(event) => {
            if (typeof onSubmit === 'function') {
              event.preventDefault();
              return onSubmit();
            }
          }
          }>{orderNow}</Button>
      </div>}
      {displayBackButton && <div className={buttonColSize}>
        <Link to={backLink}><Button color={backColor} size={buttonSize} block>{backLabel}</Button></Link>
      </div>}
      {displayEmptyCols && <div className='col'>{' '}</div>}
      {children}
    </div>
  );
};

FormSubmitButtons.propTypes = {
  className: PropTypes.string,
  submitLabel: PropTypes.string,
  backLabel: PropTypes.string,
  submitColor: PropTypes.string,
  backColor: PropTypes.string,
  backLink: PropTypes.string,
  displaySubmitButton: PropTypes.bool,
  displayBackButton: PropTypes.bool,
  onSubmit: PropTypes.func,
  buttonColSize: PropTypes.string,
  buttonSize: PropTypes.string,
  displayEmptyCols: PropTypes.string,
  children: PropTypes.string,
  orderNow: PropTypes.string,
  disabled: PropTypes.bool
};

export default FormSubmitButtons;
