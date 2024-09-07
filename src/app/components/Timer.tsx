"use client";

import React, { useState, useEffect, useRef } from "react";
import pomodoro from "@/public/pomodoro.png";
import zzz from "@/public/sleeping.png";
import "@/app/pomodoro/animation.css";

export default function Timer() {
  const [isRunning, setIsRunning] = useState(false);
  const started = useRef(false);
  const periodoStudio = useRef(true);   // true -> periodo di studio, false -> periodo di pausa
  const [elapsedTime, setElapsedTime] = useState(0);
  const startTimeRef = useRef(0);

  const [tStudio, settStudio] = useState(30);
  const [tPausa, settPausa] = useState(5);
  const [nCicli, setnCicli] = useState(5);
  const nCicliCompletati = useRef(0);
  const [tTotale, settTotale] = useState(120);

  const [manualMode, setManualMode] = useState(true);

  const studioRef = useRef<HTMLInputElement>(null);
  const pausaRef = useRef<HTMLInputElement>(null);
  const cicliRef = useRef<HTMLInputElement>(null);
  const totaleRef = useRef<HTMLInputElement>(null);
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

  useEffect(() => {
    generatePomodoro();
  }, [tTotale]);

  function changeTStudio () {
    if (!isRunning && !started.current) {
      let val = studioRef.current?.value;
      if (val != null && val != "") {
        let t =  parseInt(val);
        if (t > 0)
          settStudio(t);
      }
    }
  }

  function changeTPausa () {
    if (!isRunning && !started.current) {
      let val = pausaRef.current?.value;
      if (val != null && val != "") {
        let t =  parseInt(val);
        if (t > 0)
          settPausa(t);
      }
    }
  }

  function changeNCicli () {
    if (!isRunning && !started.current) {
      let val = cicliRef.current?.value;
      if (val != null && val != "") {
        let n =  parseInt(val);
        if (n > 0)
          setnCicli(n);
      }
    }
  }

  function changeTTotale () {
    if (!isRunning && !started.current) {
      let val = totaleRef.current?.value;
      if (val != null && val != "") {
        let t =  parseInt(val);
        if (t > 0)
          settTotale(t);
      }
    }
  }

  //generate pomodoro times based on tTotale
  function generatePomodoro() {
    if (!manualMode){
      let t = tTotale;
      console.log(t)
      t = Math.floor((t + 2) / 5) * 5;
      t = t == 0 ? 5 : t;
      console.log(t)
      
      const cycleDurations = [60, 30, 20, 10, 5];
      const studyPeriods = [50, 25, 16, 8, 4];
      const pausePeriods = [];
      for (var i in cycleDurations){
        pausePeriods.push(cycleDurations[i] - studyPeriods[i]);
      }
      let maxDivisor = cycleDurations.length - 1;
      
      console.log(cycleDurations);
      console.log(studyPeriods);
      console.log(pausePeriods);
      
      console.log(cycleDurations.length);
      for (var i in cycleDurations) {
        if (t % cycleDurations[i] == 0 && t >= (2 * cycleDurations[i])) {
          console.log("Key: " + i + ", value: " + cycleDurations[i]);
          maxDivisor = parseInt(i);
          break;
        }
      }
      
      console.log();
      console.log("Numero di cicli: " + t / cycleDurations[maxDivisor]);
      console.log("Tempo di studio: " + studyPeriods[maxDivisor]);
      console.log("Tempo di pausa: " + pausePeriods[maxDivisor]);

      settStudio(studyPeriods[maxDivisor]);
      settPausa(pausePeriods[maxDivisor]);
      setnCicli(t / cycleDurations[maxDivisor]);
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
    console.log("nCicli: " + nCicli);
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
    nCicliCompletati.current = 0;

    //console.log("isRunning: " + isRunning);
    //console.log("started: " + started);

    //changeTStudio();
    let studioInput = studioRef.current?.value;
    if (studioInput != null && studioInput != "") {
      let t =  parseInt(studioInput);
      if (t > 0)
        settStudio(t);
    }

    //changeTPausa();
    let pausaInput = pausaRef.current?.value;
    if (pausaInput != null && pausaInput != "") {
      let t =  parseInt(pausaInput);
      if (t > 0)
        settPausa(t);
    }

    //changeNCicli();
    let cicliInput = cicliRef.current?.value;
    if (cicliInput != null && cicliInput != "") {
      let n =  parseInt(cicliInput);
      if (n > 0)
        setnCicli(n);
    }

    //changeTTotale();
    let totaleInput = totaleRef.current?.value;
    if (totaleInput != null && totaleInput != "") {
      let t =  parseInt(totaleInput);
      if (t > 0)
        settTotale(t);
    }
  }

  function formatTime() {
    let time = periodoStudio.current ? tStudio : tPausa;

    //let leftTimeCSec = (tStudio * 60 * 1000 - elapsedTime) / 10;
    let leftTimeSec = (time * 60 * 1000 - elapsedTime) / 1000;

    if (leftTimeSec <= 0){
      if (!periodoStudio.current) {
        //eravamo in periodo di pausa ed è finito, quindi abbiamo completato un ciclo
        nCicliCompletati.current++;
        console.log("Cicli completati: " + nCicliCompletati.current);
      }

      periodoStudio.current = !periodoStudio.current;
      time = periodoStudio.current ? tStudio : tPausa;
      setElapsedTime(0);
      startTimeRef.current = Date.now();

      if (nCicliCompletati.current == nCicli){
        //tutti i cicli completati, reset
        console.log("FINE");
        reset();
      }
    }

    //console.log("Periodo attuale: " + periodoStudio.current ? "studio" : "pausa");

    let minutes = Math.floor(leftTimeSec / 60);
    let seconds = Math.floor(leftTimeSec % 60);
    //let cseconds = Math.floor(leftTimeCSec % 100);

    let sminutes = String(minutes).padStart(2, "0");
    let sseconds = String(seconds).padStart(2, "0");
    //let scseconds = String(cseconds).padStart(2, "0");
    return `${sminutes}:${sseconds}`;
  }

  function toggleManualMode() {
    setManualMode(!manualMode);
  }

  function timerInput() {
    if (manualMode)
      return (
        <div className="timer-input-container flex flex-row justify-center gap-2 text-xl font-semibold">
          <input id="input-studio" min="1" onChange={changeTStudio} ref={studioRef} className="rounded-md text-center w-1/5" type="number" placeholder="Studio"></input>
          <input id="input-pausa" min="1" onChange={changeTPausa} ref={pausaRef} className="rounded-md text-center w-1/5" type="number" placeholder="Pausa"></input>
          <input id="input-cicli" min="1" onChange={changeNCicli} ref={cicliRef} className="rounded-md text-center w-1/5" type="number" placeholder="Cicli"></input>
        </div>
      );
    else
      return (
        <div className="timer-input-container text-xl font-semibold">
          <input id="input-totale" min="1" onChange={changeTTotale} ref={totaleRef} className="mb-2 rounded-md text-center w-fit" type="number" placeholder="Tempo disponibile"></input>
          <div className="flex flex-row justify-center gap-2 text-base">
            <p id="output-studio" className="rounded-md text-center w-1/3">{"Studio: " + tStudio}</p>
            <p id="output-pausa" className="rounded-md text-center w-1/3">{"Pausa: " + tPausa}</p>
            <p id="output-cicli" className="rounded-md text-center w-1/3">{"Cicli: " + nCicli}</p>
          </div>
        </div>
      );
  }

  function pomodoroAnimation() {
    if (started.current) {
      if (periodoStudio.current) {
        //periodo di studio

        if (isRunning) {
          //timer in funzione
          return (
            <img src={pomodoro.src} alt="Pomodoro animation" id="pomodoro-study" className="w-10 h-10" />
          )
        }
        else {
          //timer fermo
          return (
            <img src={pomodoro.src} alt="Pomodoro animation" id="pomodoro-study-nrun" className="w-10 h-10" />
          )
        }
      }
      else {
        //periodo di pausa

        if (isRunning) {
          //timer in funzione
          return (
            <div className="flex gap-2"> 
               <img src={pomodoro.src} alt="Pomodoro" id="pomodoro-pause" className="w-10 h-10" />
               <img src={zzz.src} alt="Pomodoro animation" id="zzz-pause" className="w-6 h-6" />
             </div>
           )
        }
        else {
          //timer fermo
          return (
            <div className="flex gap-2"> 
               <img src={pomodoro.src} alt="Pomodoro" id="pomodoro-pause-nrun" className="w-10 h-10" />
               <img src={zzz.src} alt="Pomodoro animation" id="zzz-pause-nrun" className="w-6 h-6" />
             </div>
           )
        }
      }
    }
  }

  return ( <div className="timer-container mx-auto items-center">
    <div className="timer w-[50vw] rounded-3xl bg-red-400 p-6 flex flex-col gap-6 items-center shadow-xl shadow-black">
        <div className="flex flex-col">
          <div className="flex justify-center items-center gap-2">
            <h3 ref={periodoHeadingRef} className="text-2xl text-center text-white bg-[color:rgba(0,0,0,0.5)] rounded-lg grow-0 px-2">Inizia lo studio!</h3>
            {pomodoroAnimation()}
          </div>
          <div className="timer-display font-mono text-8xl font-bold text-white text-center">{formatTime()}</div>
        </div>

        {timerInput()}

        <div className="controls flex gap-4 text-3xl font-semibold">
            <button onClick={start} className="start-btn bg-green-600 hover:bg-green-800 text-white p-2 rounded-xl">Start</button>
            <button onClick={stop} className="stop-btn bg-red-700 hover:bg-red-900 text-white p-2 rounded-xl">Stop</button>
            <button onClick={reset} className="reset-btn bg-sky-500 hover:bg-sky-700 text-white p-2 rounded-xl">Reset</button>
        </div>
    </div>
    <div>
      <h3 className="text-center text-xl font-semibold text-gray-200 mt-10">
        <button onClick={toggleManualMode} className="rounded-xl bg-[rgba(0,60,100,0.7)] hover:bg-[rgba(0,30,49,0.7)] px-4 py-2">Modalità {manualMode ? "manuale" : "automatica"}</button>
      </h3>
    </div>
</div>
  );
}
