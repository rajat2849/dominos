import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup ,Label ,Input ,FormText} from 'reactstrap';
import { Link } from 'react-router';
import {Url} from 'config/Config';
import addressIcon from '../../../../public/newimages/track.png';
import timeIcon from '../../../../public/newimages/clock.png';
import phoneIcon from '../../../../public/newimages/phone-icon.png';
import { getLocalStorage, saveLocalStorage, removeLocalStorage } from '../../../components/Helpers';
import { browserHistory} from "react-router";
import './Loader.scss'

class MenuAlert extends React.Component {
  constructor(props) {
    super(props);
  }

  pushTo = () =>{
     let loginDetails = JSON.parse(localStorage.getItem("receivedLoginDetail"));
     if(loginDetails != null){
      browserHistory.push(Url.VIEW_CART)
     }
    else(
       browserHistory.push(Url.REGISTER_PAGE)
      )
  }

  render() {
    return (
        <Modal isOpen={this.props.showModal || this.props.showRemoveModal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
          toggle={this.close} className={`selected-store-modal modal-dialog-center ${this.props.className}`} backdrop={false}>
          <ModalHeader className = "border-bottom-0">
            <div>
              <h5>{this.props.header}</h5>
            </div>
          </ModalHeader>
          <ModalBody className="new-text-size">
            <div className='col-12 d-flex new-text-size'>
              <p className="new-text-size">{this.props.message}</p>
            </div>
          </ModalBody>
          <ModalFooter className = "border-top-0 btn-div">
            <button onClick={this.props.close} color=' ' className='theme-btn col-5 py-2 text-size'>No</button>
            <button onClick={this.pushTo} color=' ' className='theme-btn  col-5 py-2 text-size'>Yes</button>
          </ModalFooter>
        </Modal>
    );
  }
}

export default MenuAlert;
