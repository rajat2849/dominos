import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class AlreadyExist extends React.Component {
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
    this.props.handleModal();
    if (this.props.activationSuccess) {
      const values = {
        Email: this.props.userRegistrationDetail.data.email,
        Password: this.props.userRegistrationDetail.data.password
      };
      this.props.loggedIn(values);
    }
    this.props.setAlertMeassage(false, "");
  }

  componentWillReceiveProps() {
    this.setState({
      modal: true
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
        <ModalHeader className="border-bottom-0">
          <h5>{this.props.header}</h5>
        </ModalHeader>
        <ModalBody className="border-bottom-0">
          <div className="col-12 d-flex">
            <p>{this.props.message}</p>
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

export default AlreadyExist;
