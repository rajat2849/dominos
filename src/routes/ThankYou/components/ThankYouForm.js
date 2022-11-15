import React from "react";
import { Row, Col, Button, Card } from "reactstrap";
import ThankYouDetail from "./ThankYouDetail";
import thankYouImg from "../../../../public/newimages/thank-you-img.png";
import PropTypes from "prop-types";

class ThankYouForm extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Col className="thank-you-wrapper col-12 pt-4 px-0">
        <Row className="mx-0">
          <Col sm={12} className="px-0">
            <div className="thankyou-img text-center py-3">
              <img src={thankYouImg} alt="Thank You" className="img-fluid" />
            </div>
            <div className="col-12 my-3 px-0">
              <h1 className="page-title">
                {this.context.t("Thank you for your order")}
              </h1>
              <Card className="z-depth-3 row mb-5 mx-0">
                {!_.isEmpty(this.props.orderSummary) && (
                  <ThankYouDetail orderSummary={this.props.orderSummary} />
                )}
              </Card>
            </div>
            <div className="col-12 tracker-btn text-right ml-auto px-0 py-2">
              <Button
                className="theme-btn big-btn d-flex align-items-center py-1 ml-auto"
                onClick={() => this.props.gotoTracker()}
              >
                Track your order
                <span className="mt-1">
                  <svg
                    fill="#ffffff"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" />
                    <path d="M0-.25h24v24H0z" fill="none" />
                  </svg>
                </span>
              </Button>
            </div>
          </Col>
        </Row>
      </Col>
    );
  }
}

ThankYouForm.contextTypes = {
  t: PropTypes.func.isRequired
};
export default ThankYouForm;
