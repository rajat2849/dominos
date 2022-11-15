import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup ,Label ,Input ,FormText} from 'reactstrap';
import { Link } from 'react-router';
import {Url} from 'config/Config';
import { getLocalStorage, saveLocalStorage, removeLocalStorage } from '../../../components/Helpers';
import { browserHistory} from "react-router";

class CouponAlertWrong extends React.Component {
  constructor(props) {
    super(props)
    this.state ={
      backdrop:false
    }
  }
    
  render() {
    return (
        <Modal isOpen={true} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
          toggle={this.props.handleNewError} className={`selected-store-modal modal-dialog-center ${this.props.className}`} backdrop={this.state.backdrop}>
          <ModalHeader className="border-bottom-0">
          <h5>Sorry</h5>
        </ModalHeader>
        <ModalBody>
          <div className="col-12 d-flex px-0">
            <p>Not Found</p>
          </div>
        </ModalBody>
        <ModalFooter className="border-top-0 pt-0">
          <Button
            onClick={this.props.handleNewError}
            color=' ' 
            className='theme-btn big-btn col-12'
          >
            OK
          </Button>
        </ModalFooter>
        </Modal>
    );
  }
}

export default CouponAlertWrong;
