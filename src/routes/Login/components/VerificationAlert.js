import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import PropTypes from "prop-types";

class VerificationAlert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
      backdrop: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: false
    });
  }

  render() {
    return (
      <Modal
        isOpen={this.state.modal}
        modalTransition={{ timeout: 700 }}
        backdropTransition={{ timeout: 1300 }}
        toggle={this.toggle}
        className={`selected-store-modal modal-dialog-center ${this.props.className}`}
        backdrop={this.state.backdrop}
      >
        <ModalHeader>
          <h3>{this.context.t("THANKS FOR YOUR REGISTRATION")}</h3>
        </ModalHeader>
        <ModalBody>
          <div className="col-12 d-flex">
            <p>
              {this.context.t("WE HAVE SENT AN ACTIVATION CODE TO YOUR EMAIL")}
            </p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={this.toggle}
            color=" "
            className="theme-btn big-btn col-12"
          >
            {this.context.t("OK")}
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

VerificationAlert.contextTypes = {
  t: PropTypes.func.isRequired
};

export default VerificationAlert;
