import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class CodeVerification extends React.Component {
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

  // componentWillReceiveProps(nextProps){
  //   if(nextProps.alertMessage==="Invalid activation code"){
  //     this.setState({
  //       modal : true
  //     })
  //   }
  // }

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
          <h3>Sorry</h3>
        </ModalHeader>
        <ModalBody>
          <div className="col-12 d-flex">
            <p>Incorrect Activation Code</p>
          </div>
        </ModalBody>
        <ModalFooter>
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

export default CodeVerification;
