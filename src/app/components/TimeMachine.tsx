"use client";

import TMClock from "@/public/Clock";
import { useState, useEffect } from "react";

export function TimeMachine() {
  const [timeMachine, setTimeMachine] = useState({
    active: false,
    date: new Date(),
  });
  const [selectedDate, setSelectedDate] = useState(timeMachine.date.toString())
  const [fetched, setFetched] = useState(false)

  useEffect(() => {
    const storedTimeMachine = localStorage.getItem("timeMachine");
    if (storedTimeMachine) {
      console.log("updating")
      setTimeMachine(JSON.parse(storedTimeMachine));
      setSelectedDate(JSON.parse(storedTimeMachine).date.toString())
    }
    setFetched(true)
  }, []);

  // useEffect(() => {
  //   const [timeMachine, setTimeMachine] = useState(() => {
  //     const timeMachine = localStorage.getItem("timeMachine");
  //     const newTimeMachine = {active: false, date: new Date()}
  //     if (timeMachine == null){
  //       localStorage.setItem("timeMachine", JSON.stringify(newTimeMachine));
  //       dispatchEvent(new Event("storage"));
  //     }
  //     return timeMachine ? JSON.parse(timeMachine) : newTimeMachine;
  // });
  //   const [selectedDate, setSelectedDate] = useState(timeMachine.date.toString())
  // }, [])

  useEffect(() => {
    if (fetched){
      localStorage.setItem("timeMachine", JSON.stringify(timeMachine));
      dispatchEvent(new Event("storage"));
    }
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
    <div className={`${timeMachine.active ? "tm-enabled" : "tm-disabled"} h-[4vh] bg-gray-200 flex flex-row justify-start items-center px-2 py-2 box-border`} >
      <div className="flex flex-row justify-start gap-2 items-center w-full h-full">
        <h3 className="text-sm sm:text-base md:text-lg">Time Machine</h3>
        <input 
          onChange={(e) => setSelectedDate(e.target.value)} 
          value={new Date(selectedDate).toISOString().split('T')[0]} 
          className="p-0.5 text-xs sm:text-sm" 
          type="date" 
          title="tm-calendar" 
        />
        <button 
          onClick={(e) => activateTimeMachine()} 
          className="text-xs sm:text-sm hover:bg-gray-300 rounded"
        >
          <TMClock />
        </button>
      </div>
    </div>
  );  
}