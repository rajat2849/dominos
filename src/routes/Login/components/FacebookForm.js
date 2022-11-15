import React from 'react';
import FacebookLogin from 'react-facebook-login';

class FacebookForm extends React.Component {
	constructor(props) {
		super(props);
	// 	branch.logEvent(
    //  "Facebook Form",
    //  function(err) { console.log(err); }
    // )
	}

  render() {
    return (
    	<div onClick={() => this.props.facebookForm()}>
	      <FacebookLogin
	        appId={`${Facebook.APP_ID}`}
	        autoLoad={true}
	        fields="name,email,gender"
			textButton="FACEBOOK REGISTRATION"
	        callback={this.props.responseFacebook}
	      />
	    </div>
    )
  }
}

export default FacebookForm;
