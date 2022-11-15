import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// import { Link } from 'react-router';
// import {Url} from 'config/Config';
// import { getLocalStorage, saveLocalStorage, removeLocalStorage } from "../../../components/Helpers";
// import { browserHistory} from "react-router";

class AgeAlert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
      backdrop: false
    };
  }

  componentWillReceiveProps() {
    {
      this.props.checkDate !== undefined && this.props.checkDate(false);
    }
  }

  render() {
    return (
      <Modal
        isOpen={this.props.confirmDate}
        modalTransition={{ timeout: 700 }}
        backdropTransition={{ timeout: 1300 }}
        toggle={this.toggle}
        className={`selected-store-modal modal-dialog-center ${this.props.className}`}
        backdrop={this.state.backdrop}
      >
        <ModalBody>
          <div className="col-12 d-flex">
            <p>You should be Minimum 13 years old</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={this.props.modalFalse}
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

export default AgeAlert;
