import React, { PureComponent } from "react";
import logoImage from "../../public/logo_dominos.png";
import logo from "../../public/icons8-whatsapp-100-2.png";
import backImage from "../../public/newimages/backImage.png";
import { Link } from "react-router";
import { browserHistory } from "react-router";
import { Button } from "reactstrap";
import { Url } from "config/Config";
import { saveLocalStorage, getLocalStorage } from "components/Helpers";
import "./Newheader.scss";
import {get} from 'lodash';

 export const checkUrl = url => {
    let openUrl = url;
    if (!url.match(/^https?:\/\//i)) {
      openUrl = `https://${url}`;
    }
    window.location.href = openUrl
  };


class NewHeader extends PureComponent {

  goBack = () => {
    const {goBackFunc} = this.props;
    if(goBackFunc) {
      goBackFunc()
    } else {
      window.history.back();
    }
  }

  render() {
  let data = getLocalStorage("receivedLoginDetail");
  let configData = getLocalStorage("configurationData");
  let url  = get(configData,'whatsapp-chatbot.data.url','')
  let chatStatus = get(configData,'whatsapp-chatbot.data.status',false)

  return (
    <header className="track hm-header fixed-top">
      <div className="row d-flex align-items-center px-2 mx-0">
        {this.props.page === "Dashboard" ? (
          <div className="col-12 logo px-0">
            <img src={logoImage} className="mx-auto img-fluid pl-2" />{" "}
          </div>
        ) : (
          <div className="col-2 back-icon px-0 text-left">
            <img
              onClick={this.goBack}
              src={backImage}
              className="mx-auto img-fluid"
            />
          </div>
        )}
        {this.props.page === "Dashboard" ? null : (
          <div className="col-auto hm-title">{this.props.page}</div>
        )}
      </div>
    {get(this.props,'page') === "Dashboard" && chatStatus === "true" &&chatStatus && (
        <div className="text-right fixed-top">
          <Button
            onClick={() =>
              browserHistory.push({
                pathname: checkUrl(url)
                
              })
            }
            className="btn py-0 d-flex ml-auto image"
            //color=""
          >
            <div>
              <img src={logo} className="mx-auto img-fluid" />{" "}
            </div>
          </Button>
        </div>
      )} 
    </header>
  )
}
}

export default NewHeader;
