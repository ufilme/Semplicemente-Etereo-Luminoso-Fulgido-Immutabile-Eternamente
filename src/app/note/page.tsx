"use client";

import Link from "next/link";
import React from "react";

import NoteItem from "@/app/components/NoteItem";
import "../global.css";
import { useState, useEffect } from "react";
import { NoteState } from "../type";
import { Notifications } from "@/app/components/Notifications";
import toast, { Toaster } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

export default function Note() {
  const [notes, setNotes] = useState<NoteState[]>([]);
  const [fetched, setFetched] = useState(false)
  const orders = [
    "Alfabetico",
    "Lunghezza",
    "Modifica"
  ]
  const [order, setOrder] = useState(orders[0]);
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
  

  useEffect(() => {
    if (!fetched){
      setFetched(true)
      fetch('/api/data/notes').then(r => r.json()).then(data => {
          setNotes(data.data)
        }
      ).catch((e) => {
        console.log(e)
      })
    }
  }, [fetched])

  const duplicateNote = async (note:  NoteState) => {
    let uuid = uuidv4();

    try {
      //console.log("Adding to the database");
      const response = await fetch(
        '/api/data/notes',
        {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({...note, id: uuid, date_edit: date, date_create: date}),
        }
      );
      if (!response.ok) {
        // console.log(await response.json())
      }
      else {
        setFetched(false);
      }
    } catch {}
  }

  function handleDeleteNote (note: NoteState) {
    deleteNote(note);
    setFetched(false);

  }

  const deleteNote = async (note: NoteState) => {

    try {
      const response = await fetch(
        `/api/data/notes?id=${note.id}`,
        {
          method: "DELETE",
          headers: {
              "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        // console.log(await response.json())
      }
    } catch {}
  }

  function changeOrder(e: React.ChangeEvent<HTMLSelectElement>) {
    const orderedNotes = [...notes]
    switch (e.target.value) {
      case "Alfabetico":
        setNotes(orderedNotes.sort((a, b) => a.title.localeCompare(b.title)));
        break;
      case "Lunghezza":
        setNotes(orderedNotes.sort((a, b) => a.body.length - b.body.length));
        break;
      case "Modifica":
        setNotes(orderedNotes.sort((a, b) => {
          const dateA = a.date_edit ? new Date(a.date_edit) : new Date(0);
          const dateB = b.date_edit ? new Date(b.date_edit) : new Date(0);
          return dateB.getTime() - dateA.getTime();
        }));
        break;
      default:
        break;
    }
    setOrder(e.target.value);
  }

  return (
    <div className="flex flex-col min-h-[92vh] bg-lime-800">
      <div><Toaster /></div>
      <Notifications date={date} />

      <h1
        className="pt-6 text-center text-3xl sm:text-4xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
        id="notes-header"
      >
        Note
      </h1>
  
      <div
        className="notes-container mx-4 mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
        aria-labelledby="notes-header"
      >
        {notes && notes.map((note) => (
          <NoteItem 
            onDuplicate={duplicateNote} 
            onDelete={handleDeleteNote} 
            note={note} 
            key={note.id} 
            aria-label={`Nota: ${note.title}`}
          />
        ))}
      </div>
  
      <div className="my-4 mx-auto flex flex-col sm:flex-row gap-2 items-center">
        <Link 
          href="/note/new" 
          className="text-base sm:text-lg text-white rounded-lg px-2 py-1 bg-sky-500 hover:bg-sky-800"
          aria-label="Aggiungi nuova nota"
        >
          Aggiungi nota
        </Link>
        <div className="flex gap-1 rounded-lg px-2 py-1 bg-indigo-500">
          <label htmlFor="order" className="text-base sm:text-lg text-white">
            Ordine:
          </label>
          <select
            id="order"
            value={order}
            onChange={changeOrder}
            className="text-base sm:text-lg rounded"
            aria-label="Seleziona ordine delle note"
          >
            {orders.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );  
}