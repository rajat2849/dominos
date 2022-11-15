import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// import { Link } from 'react-router';
import { Url } from "config/Config";
// import addressIcon from '../../../../public/newimages/track.png';
// import timeIcon from '../../../../public/newimages/clock.png';
// import phoneIcon from '../../../../public/newimages/phone-icon.png';
// import { getLocalStorage, saveLocalStorage, removeLocalStorage } from '../../../components/Helpers';
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
    this.setState(prevState => ({
      modal: false
    }));
    browserHistory.push(Url.MENU_PAGE);
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
          <p>Sorry</p>
        </ModalHeader>
        <ModalBody>
          <div className="col-12 d-flex">
            <p>
              There is no item on your cart. Please select the menu item first
              in the menu screen
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

export default EmptyCart;
