import React, { Component } from "react";
import { ReCaptcha, loadReCaptcha } from "react-recaptcha-google";
import { saveLocalStorage, getLocalStorage } from "components/Helpers";
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
    saveLocalStorage("recaptchaLogin", recaptchaToken);
    this.props.Recaptcha(true);
  }
  render() {
    return (
      <div className="ml-3">
        {/* You can replace captchaDemo with any ref word */}
        <ReCaptcha
          ref={el => {
            this.captchaDemo = el;
          }}
          size="normal"
          render="explicit"
          sitekey="6LflFvYUAAAAAAztfTKH1pFtMGiPUMH-wOc1uhTY"
          onloadCallback={this.onLoadRecaptcha}
          verifyCallback={this.verifyCallback}
        />
      </div>
    );
  }
}

ExampleComponent.contextTypes = {
  t: PropTypes.func.isRequired
};
export default ExampleComponent;
