import React from "react";
import FacebookLogin from "react-facebook-login";
import "./RegisterForm.scss";
import { Config } from "config/Config";
class FacebookForm extends React.Component {
  constructor(props) {
    super(props);
    // branch.logEvent("Facebook Form", function(err) {
    //   console.log(err);
    // });
  }

  render() {
    console.log(Config.Facebook);
    return (
      <div /*onClick={() => this.props.facebookForm()}*/>
        <FacebookLogin
          appId={`${Config.Facebook}`}
          autoLoad={true}
          fields="name,email,gender"
          textButton="Sign Up With Facebook"
          callback={this.props.responseFacebook}
          className="btn rounded facebook-btn mx-auto mt-4"
          icon="fa fa-facebook-square mr-2 faceBookSize"
          label="FACEBOOK"
          onClick={()=> this.props.facebookForm()}
        />
      </div>
    );
  }
}

export default FacebookForm;
