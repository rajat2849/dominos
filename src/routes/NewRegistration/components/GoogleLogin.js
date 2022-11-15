import React from "react";
import { GoogleLogin } from 'react-google-login';
import { saveLocalStorage } from "../../../components/Helpers";
import { Config } from "config/Config";

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
  window.location.reload()
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
          className="w-25 justify-content-center"
        />
      </div>
    );
  }
}

export default GoogleForm;
