import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';


class AlreadyExist extends React.Component {
  render() {
    return (  
        <Modal isOpen={this.props.show} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
          toggle={this.props.handleModal} className={`selected-store-modal modal-dialog-center ${this.props.className}`} backdrop={false}>
          <ModalHeader className="border-bottom-0">
            <h5>{this.props.header}</h5>
          </ModalHeader>
          <ModalBody className = "border-bottom-0">
            <div className='col-12 d-flex'>
              <p>{this.props.message}</p>
            </div>
          </ModalBody>
          <ModalFooter className = "border-top-0">
            <Button onClick={this.props.handleModal} color=' ' className='theme-btn big-btn col-12'>OK</Button>
          </ModalFooter>
        </Modal>
    );
  }
}

export default AlreadyExist;