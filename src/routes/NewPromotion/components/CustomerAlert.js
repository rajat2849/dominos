import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import { Link } from 'react-router';
// import {Url} from 'config/Config';
// import addressIcon from '../../../../public/newimages/track.png';
// import timeIcon from '../../../../public/newimages/clock.png';
// import phoneIcon from '../../../../public/newimages/phone-icon.png';
import { removeLocalStorage } from '../../../components/Helpers';
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

 toggle() {
  this.setState(prevState => ({
   modal: false
  }));
  browserHistory.push(Url.DASHBOARD);
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
      <div>
     <h5>Sorry</h5>
     </div>
    </ModalHeader>
    <ModalBody>{this.context.t(this.props.message)} <a href="https://iib8.app.link/PE0xpnaMpab?%243p=a_facebook&%24deeplink_no_attribution=true">Get the App</a></ModalBody>
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


OrderModal.contextTypes = {
  t: PropTypes.func.isRequired
}

export default OrderModal;
