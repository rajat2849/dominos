import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Input, Label } from 'reactstrap';

export default class TextareaFormControl extends Component {

  render () {
    const { placeholder, type, input, meta, cols, rows } = this.props;
    let validationStateLabel = null;
    if(meta.error) {
      validationStateLabel = 'danger';
    }
    return (
      <FormGroup color={validationStateLabel}>
        {this.props.children && <Label className='form-control-label' for={input.name}>{this.props.children}</Label>}
        <Input
          cols={cols}
          rows={rows}
          type={type}
          id={input.name}
          name={input.name}
          placeholder={placeholder}
          value={input.value}
          onChange={input.onChange} />
      </FormGroup>
    );
  }
}

TextareaFormControl.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.string,
  input: PropTypes.object,
  meta: PropTypes.object,
  children: PropTypes.string,
  cols: PropTypes.string,
  rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
