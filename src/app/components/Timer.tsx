"use client";

import React, { useState, useEffect, useRef } from "react";

export default function Timer() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const startTimeRef = useRef(0);

  const [tStudio, settStudio] = useState(25);
  const studioRef = useRef<HTMLInputElement>(null);
  const pausaRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let intervalId: undefined | ReturnType<typeof setInterval>;
    if (isRunning) {
      intervalId = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 1);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  function changeTStudio () {
    if (!isRunning) {
      let val = studioRef.current?.value;
      if (val != null && val != "") {
        settStudio(parseInt(val));
      }
    }
  }

  function start() {
    setIsRunning(true);
    console.log("tStudio: " + tStudio);
    startTimeRef.current = Date.now() - elapsedTime;
  }

  function stop() {
    setIsRunning(false);
  }

  function reset() {
    setElapsedTime(0);
    setIsRunning(false);
    let val = studioRef.current?.value;
      if (val != null && val != "") {
        settStudio(parseInt(val));
      }
  }

  function formatTime() {
    console.log("tStudio in formatTime(): " + tStudio);
    let leftTimeCSec = (tStudio * 60 * 1000 - elapsedTime) / 10;
    let leftTimeSec = (tStudio * 60 * 1000 - elapsedTime) / 1000;
    let minutes = Math.floor(leftTimeSec / 60);
    let seconds = Math.floor(leftTimeSec % 60);
    let cseconds = Math.floor(leftTimeCSec % 100);

    let sminutes = String(minutes).padStart(2, "0");
    let sseconds = String(seconds).padStart(2, "0");
    let scseconds = String(cseconds).padStart(2, "0");
    return `${sminutes}:${sseconds}`;
  }

  return ( <div className="timer-container mx-auto items-center">
    <div className="timer w-fit rounded-3xl bg-red-400 p-6 flex flex-col gap-6 items-center shadow-xl shadow-black">
        <div className="timer-display font-mono text-8xl font-bold text-white">{formatTime()}</div>

        <div className="timer-input-container flex flex-row justify-center gap-2 text-xl font-semibold">
        <input id="input-studio" onChange={changeTStudio} ref={studioRef} className="rounded-md text-center w-1/3" type="number" placeholder="Studio"></input>
        <input id="input-pausa" ref={pausaRef} className="rounded-md text-center w-1/3" type="number" placeholder="Pausa"></input>
        </div>

        <div className="controls flex gap-4 text-3xl font-semibold">
            <button onClick={start} className="start-btn bg-green-600 hover:bg-green-800 text-white p-2 rounded-xl">Start</button>
            <button onClick={stop} className="stop-btn bg-red-700 hover:bg-red-900 text-white p-2 rounded-xl">Stop</button>
            <button onClick={reset} className="reset-btn bg-sky-500 hover:bg-sky-700 text-white p-2 rounded-xl">Reset</button>
        </div>
    </div>
</div>
  );
}
