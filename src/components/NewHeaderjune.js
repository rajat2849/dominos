import React, { PureComponent } from "react";
import logoImage from "../../public/logo_dominos.png";
import logo from "../../public/newimages/whatsappnew.png";
import promoimg from "../../public/newimages/image 30.png";


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


class NewHeaderjune extends PureComponent {

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
    <div className="" style={{position: "absolute",right: "0",top: "15px"}}>
      
    {get(this.props,'page') === "Dashboard" && chatStatus === "true" &&chatStatus && (
        <div className="text-right">
          <Button
            onClick={() =>
              browserHistory.push({
                pathname: checkUrl(url)
                
              })
            }
            className="btn py-0 d-flex ml-auto image" style={{display: "inline-block",paddingRight: "15px"}}
            //color=""
          >
            <div>
              <img src={logo} className="mx-auto img-fluid" />{" "}
            </div>
          </Button>
          {/* <Button
            onClick={() =>
              browserHistory.push({
                pathname: checkUrl(url)
                
              })
            }
            className="btn py-0 d-flex ml-auto image" style={{display: "inline-block",paddingRight: "15px"}}
            //color=""
          >
            <div>
              <img src={promoimg} className="mx-auto img-fluid" />{" "}
            </div>
          </Button> */}
        </div>
      )} 
    </div>
  )
}
}

export default NewHeaderjune;
