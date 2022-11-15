import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Url } from "config/Config";
import PropTypes from "prop-types";
import { browserHistory } from "react-router";

class PromotionModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOn: false,
      backdrop: false
    };

    this.toggle_promo = this.toggle_promo.bind(this);
  }

  toggle_promo() {
    this.props.handleModalClick(false);
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isModalOn}
        modalTransition={{ timeout: 700 }}
        backdropTransition={{ timeout: 1300 }}
        toggle_promo={this.toggle_promo}
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
            onClick={this.toggle_promo}
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

PromotionModal.contextTypes = {
  t: PropTypes.func.isRequired
};

export default PromotionModal;
