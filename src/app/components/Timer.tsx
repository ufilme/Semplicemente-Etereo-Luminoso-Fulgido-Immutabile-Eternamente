"use client";

import React, { useState, useEffect, useRef } from "react";

export default function Timer() {
  const [isRunning, setIsRunning] = useState(false);
  const started = useRef(false);
  const periodoStudio = useRef(true);   // true -> periodo di studio, false -> periodo di pausa
  const [elapsedTime, setElapsedTime] = useState(0);
  const startTimeRef = useRef(0);

  const [tStudio, settStudio] = useState(25);
  const [tPausa, settPausa] = useState(5);

  const studioRef = useRef<HTMLInputElement>(null);
  const pausaRef = useRef<HTMLInputElement>(null);
  const periodoHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    let intervalId: undefined | ReturnType<typeof setInterval>;
    if (isRunning) {
      intervalId = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 200);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  useEffect(() => {
    if (periodoHeadingRef.current) {
      if (!isRunning)
        periodoHeadingRef.current.innerHTML = "Inizia lo studio!";
      else if (periodoStudio.current)
        periodoHeadingRef.current.innerHTML = "STUDIO";
      else
        periodoHeadingRef.current.innerHTML = "PAUSA";
    }

  }, [periodoStudio.current, isRunning]);

  function changeTStudio () {
    if (!isRunning && !started.current) {
      let val = studioRef.current?.value;
      if (val != null && val != "") {
        settStudio(parseInt(val));
      }
    }
  }

  function changeTPausa () {
    if (!isRunning && !started.current) {
      let val = pausaRef.current?.value;
      if (val != null && val != "") {
        settPausa(parseInt(val));
      }
    }
  }

  function start() {
    setIsRunning(true);
    started.current = true;
    /*if (periodoHeadingRef.current) {
      periodoHeadingRef.current.innerHTML = "Periodo di studio";
    }*/
    console.log("tStudio: " + tStudio);
    console.log("tPausa: " + tPausa);
    startTimeRef.current = Date.now() - elapsedTime;
  }

  function stop() {
    setIsRunning(false);
  }

  function reset() {
    setElapsedTime(0);
    setIsRunning(false);
    started.current = false;
    periodoStudio.current = true;

    //console.log("isRunning: " + isRunning);
    //console.log("started: " + started);

    //changeTStudio();
    let studioInput = studioRef.current?.value;
    if (studioInput != null && studioInput != "") {
      settStudio(parseInt(studioInput));
    }

    //changeTPausa();
    let pausaInput = studioRef.current?.value;
    if (pausaInput != null && pausaInput != "") {
      settPausa(parseInt(pausaInput));
    }
  }

  function formatTime() {
    let time = periodoStudio.current ? tStudio : tPausa;

    //let leftTimeCSec = (tStudio * 60 * 1000 - elapsedTime) / 10;
    let leftTimeSec = (time * 60 * 1000 - elapsedTime) / 1000;

    if (leftTimeSec <= 0){
      periodoStudio.current = !periodoStudio.current;
      time = periodoStudio.current ? tStudio : tPausa;
      setElapsedTime(0);
      startTimeRef.current = Date.now();
    }

    console.log("Periodo attuale: " + periodoStudio.current ? "studio" : "pausa");

    let minutes = Math.floor(leftTimeSec / 60);
    let seconds = Math.floor(leftTimeSec % 60);
    //let cseconds = Math.floor(leftTimeCSec % 100);

    let sminutes = String(minutes).padStart(2, "0");
    let sseconds = String(seconds).padStart(2, "0");
    //let scseconds = String(cseconds).padStart(2, "0");
    return `${sminutes}:${sseconds}`;
  }

  return ( <div className="timer-container mx-auto items-center">
    <div className="timer w-fit rounded-3xl bg-red-400 p-6 flex flex-col gap-6 items-center shadow-xl shadow-black">
        <div className="flex flex-col">
          <h3 ref={periodoHeadingRef} className="text-2xl text-center text-white bg-[color:rgba(0,0,0,0.5);] rounded-lg grow-0 mx-16 px-2">Inizia lo studio!</h3>
          <div className="timer-display font-mono text-8xl font-bold text-white text-center">{formatTime()}</div>
        </div>

        <div className="timer-input-container flex flex-row justify-center gap-2 text-xl font-semibold">
        <input id="input-studio" onChange={changeTStudio} ref={studioRef} className="rounded-md text-center w-1/3" type="number" placeholder="Studio"></input>
        <input id="input-pausa" onChange={changeTPausa} ref={pausaRef} className="rounded-md text-center w-1/3" type="number" placeholder="Pausa"></input>
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
