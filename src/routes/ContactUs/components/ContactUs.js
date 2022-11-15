import React from 'react';
import PropTypes from 'prop-types';

import ContactUsForm from './ContactUsForm';
import Header from '../../../DashboardSubComponent/Header';
import logoImage from '../../../../public/logo_dominos.png';
import validate from './ContactUsValidation';
import NewHeader from '../../../../src/components/NewHeader';
import "./ContactUs.scss"

class ContactUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: {}
    }
    // branch.logEvent(
    //   "Contact Us Screen",
    //  function(err) { console.log(err); })
    this.submitFeedback = this.submitFeedback.bind(this);
  }

  componentWillMount() {
    this.props.fetchStoreList();
  }

  submitFeedback(values) {
    if(Object.keys(validate(values)).length === 0 && validate(values).constructor === Object){
      this.props.sendFeedback(values);
    }
    else {
      this.setState({
        error: validate(values)
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sending === false) {
    }
  }

  render() {
    return(
      <div className='col-12 px-0'>
        <NewHeader page="Contact us" />
        <div className='col-12 pt-4'>
          <p>
          We would love to hear what you think about Domino's, 
          out pizza and our service - both the good and the bad. 
          Please submit us your feedback and we will get back to you soon.
          </p>
          <p>
            - If you wish to make an order modification or cancel your order, Please 
            call our customer service hotline on 1500-366 for immediate attantion. 
          </p>
          <h5 className='heading'>Dominos Email</h5>
          <p>rateourpizza@dominos.co.id</p>
          {/* <h5 className='heading'>Dominos Contact Address</h5> */}
          {/* <p>Gedung I Lantai 3, Jalan M.I. Ridwan Rais No. 5, Jakarta Pusat 10110</p> */}
          <ContactUsForm
            {...this.props}
            onSubmit={this.submitFeedback}
            storeList={this.props.storeList}
            fetching={this.props.fetching}
            fieldError={this.state.error}
            showAlert={this.props.showAlert}
            alertMessage={this.props.alertMessage}
          />
          <p >
            * Layanan Pengaduan Konsumen <br/>
              DIREKTORAT JENDERAL PERLINDUNGAN KONSUMEN DAN TERTIB NIAGA
              KEMENTERIAN PERDAGANGAN REPUBLIK INDONESIA
          </p>
          <div>Alamat : Gedung I Lantai 3, Jalan M.I. Ridwan Rais No. 5, Jakarta Pusat 10110</div>
          <p>WhatsApp : 0853-1111-1010</p>
        </div>
      </div>
    )
  }
}

export default ContactUs;
