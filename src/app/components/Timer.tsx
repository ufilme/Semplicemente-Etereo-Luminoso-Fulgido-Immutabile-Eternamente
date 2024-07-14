"use client";

import React, { useState, useEffect, useRef } from "react";

export default function Timer() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  //const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

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

  function start() {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  }

  function stop() {
    setIsRunning(false);
  }

  function reset() {
    setElapsedTime(0);
    setIsRunning(false);
  }

  function formatTime() {
    let leftTimeCSec = (25 * 60 * 1000 - elapsedTime) / 10;
    let leftTimeSec = (25 * 60 * 1000 - elapsedTime) / 1000;
    let minutes = Math.floor(leftTimeSec / 60);
    let seconds = Math.floor(leftTimeSec % 60);
    let cseconds = Math.floor(leftTimeCSec % 100);

    let sminutes = String(minutes).padStart(2, "0");
    let sseconds = String(seconds).padStart(2, "0");
    let scseconds = String(cseconds).padStart(2, "0");
    return `${sminutes}:${sseconds}`;
  }

  return (
    <div className="timer-container flex flex-col items-center">
      <div className="timer w-fit rounded-3xl bg-red-400 p-6 flex flex-col gap-6 items-center shadow-xl shadow-black">
        <div className="timer-display font-mono text-8xl font-bold text-white">
          {formatTime()}
        </div>
        <div className="controls flex gap-4 text-3xl font-semibold">
          <button
            onClick={start}
            className="start-btn bg-green-600 hover:bg-green-800 text-white p-2 rounded-xl"
          >
            Start
          </button>
          <button
            onClick={stop}
            className="stop-btn bg-red-700 hover:bg-red-900 text-white p-2 rounded-xl"
          >
            Stop
          </button>
          <button
            onClick={reset}
            className="reset-btn bg-sky-500 hover:bg-sky-700 text-white p-2 rounded-xl"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
