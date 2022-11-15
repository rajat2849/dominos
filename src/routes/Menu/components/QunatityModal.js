import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Url } from "config/Config";
import PropTypes from "prop-types";
import { browserHistory } from "react-router";

class EmptyCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
      backdrop: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
      const { successHandler} = this.props
      successHandler()
    this.setState(prevState => ({
      modal: false
    }));
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
        <ModalHeader className="border-bottom-0">
          <p>{this.context.t("Sorry")}</p>
        </ModalHeader>
        <ModalBody>
          <div className="col-12 d-flex">
            <p>
            {this.context.t(this.props.message)}
            </p>
          </div>
        </ModalBody>
        <ModalFooter className="border-top-0">
          <Button
            onClick={this.toggle}
            color=" "
            className="theme-btn big-btn col-12"
          >
            OK
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

EmptyCart.contextTypes = {
  t: PropTypes.func.isRequired
};

export default EmptyCart;
