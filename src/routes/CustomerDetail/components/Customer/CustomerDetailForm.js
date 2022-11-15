import React from 'react';
import PropTypes from 'prop-types';
import { Form, Col } from 'reactstrap';
import { Field } from 'redux-form';

import NormalizePhone from 'components/NormalizePhone';
import RenderField from '../RenderField';
import SubmitButtons from 'components/SubmitButton';
import '../customerDetail.scss';
import 'components/Form.scss';

const mobileOptions = [
  {'key': 'mobile', 'value': 'Mobile'},
  {'key': 'home', 'value': 'Home'},
  {'key': 'office', 'value': 'Office'},
];

class CustomerDetailForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  componentDidMount() {
    let extname = mobileOptions[0].key;
    if (typeof this.props.initialValues.extname !== 'undefined') {
      extname = this.props.initialValues.extname;
    }
    this.props.selectExtension(extname);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className='customer-detail col-12 main-wrapper content-wrapper'>
        <h4 className='title text-center col-12 mb-0 py-3'><span>{this.context.t('Customer details')}</span></h4>
        <div className='col-xl-12 col-sm-12 p-0'>
          <Form inline className='customer-detail-form' onSubmit={handleSubmit}>
            <div className='col-sm-12 col-12 form-group text-left p-1 mb-0'>
              <div className='row'>
                <div className='col-sm-6 col-6 form-group text-left pr-1 '>
                  <Field
                    name='firstname'
                    className='form-control'
                    type='text'
                    component={RenderField}
                    label={this.context.t('First Name')}
                  />
                </div>
                <div className='col-sm-6 col-6 form-group text-left'>
                  <Field
                    name='lastname'
                    className='form-control'
                    type='text'
                    component={RenderField}
                    label={this.context.t('Last Name')}
                  />
                </div>
              </div>
            </div>
            <div className='col-sm-12 col-12 form-group text-left pl-1 pr-1 mb-0'>
              <div className='row'>
                <div className='col-sm-4 col-4 form-group text-left pr-1'>
                  <select className='form-control' name='extname' onChange={(e) => this.props.selectExtension(e.target.value, e)}>
                    {mobileOptions.map((data, i) => {
                      return (
                        <option selected={this.props.initialValues.extname === data.key} value={data.key} key={i} >{data.value}</option>
                      );
                    })}
                  </select>
                </div>
                {(this.props.selectedExtension ==='mobile') ?
                  <div className='col text-left'>
                    <Field
                      name='phoneNumber'
                      className="form-control"
                      type='text'
                      component={RenderField}
                      label={this.context.t('Number')}
                      normalize={NormalizePhone}
                    />
                  </div>
                 :<div className='col text-left'>
                    <Field
                      name='extPhoneNumber'
                      className="form-control"
                      type='text'
                      component={RenderField}
                      label={this.context.t('Number')}
                      normalize={NormalizePhone}
                    />
                  </div>
                }
                {(this.props.selectedExtension === 'office' || this.props.selectedExtension === 'home') &&
                  <div className='col-3 form-group text-left pl-1'>
                    <Field
                      name='ext'
                      className='form-control'
                      type='text'
                      component={RenderField}
                      label={this.context.t('Ext')}
                      normalize={NormalizePhone}
                    />
                  </div>
                }
              </div>
            </div>
            <div className='col-sm-12 col-12 form-group text-left p-1 mb-0'>
              <Field
                name='email'
                className='form-control'
                type='email'
                component={RenderField}
                label={this.context.t('Email')}
              />
            </div>
            <div className='col-sm-12 col-12 form-group text-left p-1 mb-0'>
              <SubmitButtons
                submitLabel={this.context.t('Next')}
                className=''
                submitting={this.props.submitting}
              />
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

CustomerDetailForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  selectExtension: PropTypes.func,
  selectedExtension: PropTypes.string,
  submitting: PropTypes.bool
};

CustomerDetailForm.contextTypes = {
  t: PropTypes.func.isRequired
}

export default CustomerDetailForm;
