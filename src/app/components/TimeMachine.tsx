"use client";

import TMClock from "@/public/Clock";
import { useState } from "react";

export function TimeMachine() {
  const [state, setState] = useState("tm-disabled");

  function activateTimeMachine() {
    setState(state == "tm-disabled" ? "tm-enabled" : "tm-disabled");
    console.log(state);
  }

  return (
    <div className={`${state} h-[4vh] bg-gray-200 flex justify-between items-center p-2`} >
      <div className="flex justify-around items-center">
        <h3>Time Machine</h3>
        <input className="mr-2" type="date" title="tm-calendar" />
        <div onClick={activateTimeMachine}>
          <TMClock />
        </div>
      </div>
    </div>
  );
}