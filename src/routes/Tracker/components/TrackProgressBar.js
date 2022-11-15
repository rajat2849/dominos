import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import { TrackProgressDelivery, TrackProgressCarryOut } from "config/Config";
import { element } from "prop-types";
import Timer from "./CountDown";
import moment from "moment";
import 'moment-timezone';
import CarryoutButton from './CheckinButton'
class TrackProgressBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let processedStep = false;
    let processedStatusIndex = "";
    let time = "";
    let address = "";
    if (typeof this.props.orderData.status !== "undefined") {
      let dateArr = this.props.orderData.order_date.split(" ");
      let timeArr = dateArr[1].split(":");
      time = timeArr[0] + ":" + timeArr[1];
      // console.log(time)
      address = this.props.orderData.address;
      if (this.props.orderData.shipping_method === "Carryout") {
        TrackProgressCarryOut.map((item, index) => {
          if (item.id === this.props.orderData.status) {
            processedStatusIndex = index;
            processedStep = true;
          }
        })
      }
      else {
        TrackProgressDelivery.map((item, index) => {
          if (item.id === this.props.orderData.status) {
            processedStatusIndex = index;
            processedStep = true;
          }
        });
      }
    }
    // this.props.orderData.status_time && console.log("this.props.orderData.status_time.status_time", this.props.orderData);
    let orderTime = this.props.orderData.order_date ? this.props.orderData.order_date.split(' ') : ""
    let localTime = moment.tz(`${orderTime[0]} ${orderTime[1]}`, 'Asia/Jakarta').tz('Asia/Kolkata').format('HH:mm:ss')
    const startTime = moment(localTime);
    const endTime = moment().format("HH:mm:ss"); 
    var mins = moment.utc(moment(endTime, "HH:mm:ss").diff(moment(localTime, "HH:mm:ss"))).format("HH:mm:ss")
    var diffMins = mins.split(':')
    let remainingMinutesTakeAway = 15-diffMins[1];
    let remainingSecondsTakeAway = 60 -diffMins[2]-50
    let remainingMinutesDelivery = 30-diffMins[1];
    let remainingSecondsDelivery = 60-diffMins[2]-50
    let diffMinutes = localStorage.getItem("minutes");
    
    
    return (
      <div className="col-xl-12 col-sm-12 col-12 track-progress-container">
        <Nav tabs className="tab-sub-menu">
          {this.props.orderData.shipping_method === "Delivery" ? TrackProgressDelivery.map((item, index) => {
            return (
              <NavItem className="col-12 px-0" key={item.id}>
                <div className="col-md-4 p-2 bg-dark">
                  {item.id === this.props.orderData.status && <img src={item.img} className="img-fluid" alt="Responsive image" />}
                </div>
                {item.id === this.props.orderData.status && this.props.orderData.shipping_method === "Delivery" && <Timer time={remainingMinutesDelivery} remainingSeconds={remainingSecondsDelivery} />}
              </NavItem>
            );
          })
            : TrackProgressCarryOut.map((item, index) => {
              // {console.log("this.props.orderData.shipping_method",this.props.orderData.shipping_method)}
              // console.log("this.props.orderData.status", this.props.orderData.status)
              return (
                <NavItem className="col-12 px-0" key={item.id}>
                  <div className="col-md-4 p-2 bg-dark">
                    {(this.props.orderData.status === 'complete' && item.id === 'ready_to_pickup' && diffMinutes > 2) && <img src={item.img} className="img-fluid" alt="Responsive image" />}
                    {(this.props.orderData.status === 'complete' && item.id === 'complete' && diffMinutes <= 2) &&
                      <div>
                        <img src={item.img} className="img-fluid" alt="Responsive image" />
                        {/* <CarryoutButton /> */}
                      </div>
                    }
                    {(item.id === this.props.orderData.status && this.props.orderData.status !== 'complete') && <img src={item.img} className="img-fluid" alt="Responsive image" />}
                  </div>
                  {item.id === this.props.orderData.status && this.props.orderData.shipping_method === "Carryout" && <Timer time={remainingMinutesTakeAway} remainingSeconds={remainingSecondsTakeAway} />}
                </NavItem>
              );
            })
          }
        </Nav>
      </div>
    );
  }
}
TrackProgressBar.propTypes = {};

export default TrackProgressBar;
