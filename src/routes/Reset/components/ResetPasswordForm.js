import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Form } from "reactstrap";
import { Field } from "redux-form";

import RenderField from "components/RenderField";
import InnerHeader from "components/InnerHeader";
import { Url } from "config/Config";
import SubmitButtons from "components/SubmitButton";
import "./ResetPassword.scss";
import "components/Form.scss";

class ResetPasswordForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="col-12 col-sm-12 col-xl-12 px-0">
        <Form className="mt-2 text-left" onSubmit={handleSubmit}>
          <div className="col-12 col-sm-12 col-xl-12 py-3 px-0">
            <Row>
              <div className="col-12 col-sm-12 col-xl-12">
                <Row>
                  <Col xs="12" sm="12" xl="12" className="my-2">
                    <Field
                      name="Password"
                      className="form-control"
                      type="Password"
                      component={RenderField}
                      label={this.context.t("Enter New Password*")}
                    />
                  </Col>
                  <Col xs="12" sm="12" xl="12" className="my-2">
                    <Field
                      name="ConfirmPassword"
                      className="form-control"
                      type="Password"
                      component={RenderField}
                      label={this.context.t("Confirm Password*")}
                    />
                  </Col>
                </Row>
              </div>
            </Row>
          </div>
          <div className="form-group">
            <div className="col-12 col-sm-12 col-xl-12 text-center text-uppercase register-btn-group">
              <Row>
                <Col className="col-12 col-sm-12 col-xl-12 px-0 mt-1 mb-1">
                  <Col className="col text-center">
                    <SubmitButtons
                      submitLabel={this.context.t("SUBMIT")}
                      className="btn btn-primary order-btn col-7 col-sm-8 col-xl-8 text-center my-1 px-3 text-uppercase"
                      submitting={this.props.submitting}
                    />
                  </Col>
                </Col>
              </Row>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}

ResetPasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool
};

ResetPasswordForm.contextTypes = {
  t: PropTypes.func.isRequired
};

ResetPasswordForm.childContextTypes = {
  t: PropTypes.func.isRequired
};

export default ResetPasswordForm;
