import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from "reactstrap";

class CouponAlert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backdrop:false
    }
  }

  render() {
    return (
      <Modal
        isOpen={this.props.showError}
        modalTransition={{ timeout: 700 }}
        backdropTransition={{ timeout: 1300 }}
        toggle={this.props.handleShowError}
        className={`selected-store-modal modal-dialog-center ${this.props.className}`} 
        backdrop={this.state.backdrop}
      >
        <ModalHeader className="border-bottom-0">
          <p>Sorry</p>
        </ModalHeader>
        <ModalBody>
          <div className="col-12 d-flex px-0">
            <p>Please enter Coupon Code.</p>
          </div>
        </ModalBody>
        <ModalFooter className="border-top-0">
          <Button
            onClick={this.props.handleShowError}
            className="theme-btn big-btn col-12"
            color=' '
          >
            OK
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default CouponAlert;
