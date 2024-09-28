"use client"
import { Suspense } from "react";
import "../global.css";
import Timer from "@/app/components/Timer";
import { useState, useEffect } from "react";

export default function Pomodoro() {
  const [date, setDate] = useState(new Date())
  const [timeMachine, setTimeMachine] = useState({
    active: false,
    date: new Date(),
  });

  useEffect(() => {
    const storedTimeMachine = localStorage.getItem("timeMachine");
    if (storedTimeMachine) {
      setTimeMachine(JSON.parse(storedTimeMachine));
      setDate(new Date(timeMachine.date))
    }
  }, []);

  useEffect(() => {
    const int = setInterval(() => {
      if (timeMachine.active){
        setDate(new Date(timeMachine.date))
      } else {
        setDate(new Date())
      }
    }, 2000)
  
    return () => clearInterval(int)
  })

  return (
    <div className="flex flex-col min-h-[92vh] bg-red-700">
      <h1 className="pt-10 text-center text-3xl sm:text-4xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
        Applicazione Pomodoro
      </h1>
      <div className="my-auto flex flex-col justify-center px-4 sm:px-8 md:px-16">
        <Suspense fallback={<div className="text-white">Caricamento...</div>}>
          <Timer />
        </Suspense>
      </div>
    </div>
  );  
}