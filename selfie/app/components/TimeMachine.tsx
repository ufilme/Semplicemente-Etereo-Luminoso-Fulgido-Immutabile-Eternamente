"use client";

import Image from "next/image";
import TMClock from "@/public/Clock";
import { useState } from "react";

import PropTypes from 'prop-types'

export function TimeMachine(props) {
  const [state, setState] = useState("tm-disabled");

  function activateTimeMachine() {
    setState(state == "tm-disabled" ? "tm-enabled" : "tm-disabled");
    console.log(state);
  }

  return (
    <div className={state + " " + props.height + " bg-gray-200 flex justify-between items-center p-2"} id="tm">
      <h3 id="tm-header">Time Machine</h3>
      <div className="flex justify-around items-center">
        <input className="mr-2" type="date" title="tm-calendar" />
        <div onClick={activateTimeMachine}><TMClock /></div>
      </div>
    </div>
  );
}

TimeMachine.propTypes = {
  height: PropTypes.string,
}

TimeMachine.defaultProps = {
  height: "h-[4vh]",
}