import React from "react";
import moment from "moment";
import moment_timezone from "moment-timezone";

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elapsed: 0
    };
    this.tick = this.tick.bind(this);
    this.dateTime = this.dateTime.bind(this);
  }

  componentDidMount() {
    this.timer = setInterval(this.tick, 50);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick() {
    this.setState({ elapsed: new Date() - this.props.start });
  }

  dateTime() {
    let date = new Date();
    let am_pm = "AM";
    let hour = date.getHours();
    if (hour >= 12) {
      am_pm = "PM";
    }
    if (hour > 12) {
      hour = hour - 12;
    }
    if (hour < 10) {
      hour = "0" + hour;
    }

    var minute = date.getMinutes();
    if (minute < 10) {
      minute = "0" + minute;
    }
    var sec = date.getSeconds();
    if (sec < 10) {
      sec = "0" + sec;
    }
    return hour + ":" + minute + ":" + sec;
  }

  render() {
    moment_timezone.tz.setDefault("Asia/Jakarta");
    let elapsed = Math.round(this.state.elapsed / 100);
    let seconds = (elapsed / 10).toFixed(1);
    let time = moment.utc(seconds * 1000).format("HH:mm:ss");
    return (
      <div>{this.props.orderStatus !== "complete" && <span>{time}</span>}</div>
    );
  }
}
export default Timer;
