import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { Row, Col } from 'reactstrap';

import InnerHeader from 'components/InnerHeader';
import { Url } from 'config/Config';
import ResetPasswordForm from './ResetPasswordForm';
import Loader from 'components/Loader';
import Alert from "components/Alert";

class ResetPassword extends React.Component {
	constructor(props) {
		super(props);
		this.handleAlertBox = this.handleAlertBox.bind(this);
		this.resetPassword = this.resetPassword.bind(this);
	}

	handleAlertBox(){
	// 	branch.logEvent(
    //  	"Reset-Password",
    //  function(err) { console.log(err); }
    // )
	  this.props.resetAlertBox(false, "");
	  browserHistory.push('/user');
	}

	resetPassword(value) {
		this.props.resetPassword(value);
	}

	render() {
	  return (
	    <div className='col-12'>
	      <Alert
	    	  showAlert={(typeof this.props.showAlert !== "undefined" ? this.props.showAlert : false)}
	    	  message={(typeof this.props.alertMessage !== "undefined" ? this.props.alertMessage : "")}
	    	  handleAlertBox={this.handleAlertBox}
	    	/>
		    <Row>
		      <InnerHeader to={Url.OTHERS} />
		    </Row>
		    <h4 className='title col-12' style={{marginTop: '55px'}}><span>{this.context.t("Reset Password")}</span></h4>
		    <div className='main-wrapper content-wrapper'>
		      <Loader loading={(this.props.loader) ? this.props.loader : false} />
		      <ResetPasswordForm
		        {...this.props}
		        handleSubmit={this.props.handleSubmit(this.resetPassword)}
		      />
	      </div>
	    </div>
	  );
	}
}

ResetPassword.propTypes = {};

ResetPassword.contextTypes = {
  t: PropTypes.func.isRequired
}

ResetPassword.childContextTypes = {
  t: PropTypes.func.isRequired
};

export default ResetPassword;