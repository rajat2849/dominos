import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import { Link } from 'react-router';
// import {Url} from 'config/Config';
// import addressIcon from '../../../../public/newimages/track.png';
// import timeIcon from '../../../../public/newimages/clock.png';
// import phoneIcon from '../../../../public/newimages/phone-icon.png';
import { saveLocalStorage,removeLocalStorage } from '../../../components/Helpers';
import { browserHistory } from 'react-router';
import { Url } from 'config/Config';
import PropTypes from 'prop-types';

class OrderModal extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
   modal: true,
   backdrop: false
  };

  this.toggle = this.toggle.bind(this);
 }

 toggle(message) {
   const prevOrder = JSON.parse(localStorage.getItem("prevOrder"))
  this.setState(prevState => ({
   modal: false
  }));
  if(message === "you can add this coupon"){
  null
  }
  else{ browserHistory.push(Url.DASHBOARD);}
 
  saveLocalStorage("prevOrder",false)
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
    {this.props.message === "you can add this coupon" ? <h5>{this.context.t("Congratulations")}</h5> : <h5>{this.context.t("Sorry")}</h5>}
    </ModalHeader>
    <ModalBody> {this.context.t(this.props.message)}</ModalBody>
    <ModalFooter className="border-top-0">
     <Button
      onClick={() =>this.toggle(this.props.message)}
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

OrderModal.contextTypes = {
  t: PropTypes.func.isRequired
}

export default OrderModal;
