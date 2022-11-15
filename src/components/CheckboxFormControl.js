import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Input, Label } from 'reactstrap';

export default class CheckboxFormControl extends Component {

  render () {

    const { type, input, meta } = this.props;
    let validationStateLabel = null;
    if(meta.error) {
      validationStateLabel = 'danger';
    }
    return (
      <FormGroup check color={validationStateLabel}>
        <Label className='custom-control custom-checkbox' check>
          <Input
            checked={input.checked}
            className='custom-control-input'
            disabled={this.props.disabled}
            type={type}
            id={input.name}
            value={input.value}
            onChange={input.onChange} />
          <span className='custom-control-indicator' />
          {this.props.children && <div className={'custom-checkbox-label ' + this.props.labelClass}>{this.props.children}</div>}
        </Label>
      </FormGroup>
    );
  }
}

CheckboxFormControl.propTypes = {
  type: PropTypes.string,
  input: PropTypes.object,
  meta: PropTypes.object,
  disabled: PropTypes.bool,
  children: PropTypes.string,
  labelClass: PropTypes.string
};
