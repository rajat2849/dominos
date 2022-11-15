import React from "react";
import { GoogleLogin } from 'react-google-login';
import { saveLocalStorage } from "../../../components/Helpers";
import { Config } from "config/Config";
import { sha256, sha224 } from 'js-sha256'
const utf8 = require('utf8');

class GoogleForm extends React.Component {
  constructor(props) {
    super(props);
    // branch.logEvent("Google Form", function(err) {
    //   console.log(err);
    // });
  }


onFailure = (error) =>{
  console.log(error)
}

onSuccess = (response) =>{
  saveLocalStorage("googleInfo",response.profileObj)
  let securedEmail = `domino-${response.profileObj.email}incaendo-indo`;
  console.log(securedEmail)
   let convertToSha = sha256(securedEmail)
  let values = {}
  values.Email = "nitin.chauhan11@incaendo.com"
  values.Social = true
  values.Bundle = "69d7a8acba6ee438c7a6b34b03bad9a999b2fee12eea4542eff832988365ea44"
  this.props.loggedIn(values)
}

  render() {
    return (
      <div>
        <GoogleLogin
          clientId="940638470682-5oskmuu1fmnk3sl4rf2kkpkaocophn8p.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={this.onSuccess}
          onFailure={this.onFailure}
          cookiePolicy={'single_host_origin'}
          className="w-50 justify-content-center"
        />
      </div>
    );
  }
}

export default GoogleForm;
