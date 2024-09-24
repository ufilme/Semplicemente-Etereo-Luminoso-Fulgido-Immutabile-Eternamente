"use client";

import TMClock from "@/public/Clock";
import { useState, useEffect } from "react";

export function TimeMachine() {
  const [timeMachine, setTimeMachine] = useState(() => {
    const timeMachine = localStorage.getItem("timeMachine");
    const newTimeMachine = {active: false, date: new Date()}
    if (timeMachine == null){
      localStorage.setItem("timeMachine", JSON.stringify(newTimeMachine));
      dispatchEvent(new Event("storage"));
    }
    return timeMachine ? JSON.parse(timeMachine) : newTimeMachine;
});
  const [selectedDate, setSelectedDate] = useState(timeMachine.date.toString())

  useEffect(() => {
    localStorage.setItem("timeMachine", JSON.stringify(timeMachine));
    dispatchEvent(new Event("storage"));
  }, [timeMachine]);

  function activateTimeMachine() {
    if (timeMachine.active){
      setTimeMachine({
        active: false,
        date: new Date()
      })
      setSelectedDate(new Date().toString())
    } else {
      if (selectedDate != ""){
        setTimeMachine({
          active: true,
          date: new Date(selectedDate)
        })
      }
    }
  }

  return (
    <div className={`${timeMachine.active ? "tm-enabled" : "tm-disabled"} h-[4vh] bg-gray-200 flex justify-between items-center p-2`} >
      <div className="flex justify-around items-center">
        <h3>Time Machine</h3>
        <input onChange={(e) => setSelectedDate(e.target.value)} value={new Date(selectedDate).toISOString().split('T')[0]} className="mr-2" type="date" title="tm-calendar" />
        <button onClick={(e) => activateTimeMachine()}>
          <TMClock />
        </button>
      </div>
    </div>
  );
}