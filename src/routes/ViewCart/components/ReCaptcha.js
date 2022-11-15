import React, { Component } from 'react';
import { ReCaptcha,loadReCaptcha } from 'react-recaptcha-google'
import { saveLocalStorage, getLocalStorage } from 'components/Helpers';
import { Form, FormGroup, Label, Input } from "reactstrap";

import PropTypes from "prop-types";

class ExampleComponent extends Component {
  constructor(props, context) {
    super(props, context);
    this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
  }
  componentDidMount() {
     const script = document.createElement("script");
      script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;

    document.body.appendChild(script);
    if (this.captchaDemo) {
        this.captchaDemo.reset();
    }
  }
  onLoadRecaptcha() {
      if (this.captchaDemo) {
          this.captchaDemo.reset();
      }
  }
  verifyCallback(recaptchaToken) {
    // Here you will get the final recaptchaToken!!!  
    saveLocalStorage("recaptchaToken",recaptchaToken)
  }
  render() {
    return (
      <div className='ml-3'>
        {/* You can replace captchaDemo with any ref word */}
   {/*     <ReCaptcha
            ref={(el) => {this.captchaDemo = el;}}
            size="normal"
            render="explicit"
            sitekey="6LflFvYUAAAAAAztfTKH1pFtMGiPUMH-wOc1uhTY"
            onloadCallback={this.onLoadRecaptcha}
            verifyCallback={this.verifyCallback}
        />*/}
        <div className="col-12 f-14 px-0">
          <h2 className="item-title f-14 mb-0">
            {this.context.t("Important")}
          </h2>
          <p className="item-description mb-2">
            {this.context.t(
              "Once you click the PLACE ORDER button , you cannot cancel and are obligated to pay according to the account shown"
            )}
          </p>
        </div>
        <FormGroup check className="d-flex px-0 agree-checkbox">
          <Label check className="col-12 row mx-0">
            <Input
              type="checkbox"
              className="mr-2"
              name="agreement"
              defaultChecked={true}
              onClick={e => this.props.handleAgreement(e)}
            />{" "}
            {this.context.t("I Agree")}
          </Label>
        </FormGroup>
      </div>
    );
  }
};


ExampleComponent.contextTypes = {
  t: PropTypes.func.isRequired
};
export default ExampleComponent;