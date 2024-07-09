"use client";

import Image from "next/image";
import TMClock from "@/public/Clock";
import { useState } from "react";

function activateTimeMachine() {}

export function TimeMachine() {
  const [state, setState] = useState("tm-disabled");

  function activateTimeMachine() {
    setState(state == "tm-disabled" ? "tm-enabled" : "tm-disabled");
    console.log(state);
  }

  return (
    <div id="tm" onClick={activateTimeMachine} className={state}>
      <h3 id="tm-header">Time Machine</h3>
      <div>
        <input type="date" title="tm-calendar" />
        <TMClock />
      </div>
    </div>
  );
}
