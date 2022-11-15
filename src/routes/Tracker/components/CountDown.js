import React, { useRef, useState, useEffect } from "react";
import moment from "moment";
import 'moment-timezone';

import "./countdown.css"

const Timer = (props) => {
  const [timerMinutes, setTimerMinutes] = useState("0");
  const [timerSeconds, setTimerSeconds] = useState("0");
  let interval = useRef();

  const startTimer = (countdownDate) => {   
    const now = new Date().getTime();
    const distance = countdownDate - now;

    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    // console.log(minutes);
    localStorage.setItem("minutes", minutes);
    if (distance <= 0) {
      clearInterval(interval.current);
      // localStorage.clear("timer")
    } else {
      setTimerMinutes(minutes);
      setTimerSeconds(seconds);
    }
  };

  function saveInLocalStorage(time) {
    localStorage.setItem("timer", time);
  }

  function getTimeFromLocalStorage() {
    return localStorage.getItem("timer");
  }

  useEffect(() => {
    const localTimer = getTimeFromLocalStorage();

    // if (localTimer) {
    //   interval.current = setInterval(() => {
    //     startTimer(+localTimer);
    //   }, 1000);
    // } else {
      const countdownDate = new Date().getTime() + (props.time * 60 * 1000)  +props.remainingSeconds*1000;
      saveInLocalStorage(countdownDate);
      interval.current = setInterval(() => {
        startTimer(+countdownDate);
      }, 1000);
    // }
    return () => clearInterval(interval.current);
  }, []);

  return (
    <div className="timer">
      {timerMinutes>=10?timerMinutes:"0"+timerMinutes} : {timerSeconds>=10?timerSeconds:"0"+timerSeconds}
    </div>
  );
};

export default Timer;