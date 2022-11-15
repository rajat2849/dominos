
import React, { useState ,useEffect} from "react";
import ReactDOM from "react-dom";
import {  browserHistory } from "react-router";
import {
  getLocalStorage
} from "components/Helpers";
import "./chatbot.scss"


import {  Url } from "config/Config";


function App() {
  const [menuItem, setMenuItem] = useState("pizza");
  const [displayToggler, setDisplayToggler] = useState(true);

  const openBot = () => {
    // alert("Hi Nitin");
    setDisplayToggler(true);
  };


  useEffect((props) => {
      const details = getLocalStorage('receivedLoginDetail')
    if(details === null || details === undefined || details.length === 0){
        browserHistory.push({
                pathname:
                    Url.REGISTER_PAGE
              })
        window.location.reload();
    }
  });



  const hide = () => {
    setDisplayToggler(false);
     browserHistory.push({
                pathname:
                     Url.HOME_PAGE
              })
       window.location.reload();
  };

   const customerId = getLocalStorage('receivedLoginDetail').customer_id
  const botUrl = `https://app.yellowmessenger.com/pwa/live/x1593573440944?ym.payload={"customer_id":"${customerId}"}&fullScreen=true`;
  // const iframeTag = `<iframe  className="bot" scrolling="no"  src=${botUrl}  frameBorder="0" height="100%"  width="100%"
  // title="bot"></iframe>`;

  const iframeFunction = () => {
    return {
      __html: `<iframe  className="bot" scrolling="no"  src=${botUrl} allowfullscreen=true frameBorder="0" height="100%"  width="100%"
      title="bot"></iframe>`
    };
  };

  return (
    <div className="App">

      {displayToggler ? (
          <div>
          <div className="bot" dangerouslySetInnerHTML={iframeFunction()}></div>
          <h1 className="close-icon" onClick={hide}>
            x
          </h1>
     </div>
      ) : (
      <div></div>
      )}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
