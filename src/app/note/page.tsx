"use client";

import Link from "next/link";
import React from "react";

import NoteItem from "@/app/components/NoteItem";
import "../global.css";
import { useState, useEffect } from "react";

export default function Note() {
  const [notes, setNotes] = useState([]);
  const [fetched, setFetched] = useState(false)
  const orders = [
    "Alfabetico",
    "Lunghezza",
    "Modifica"
  ]
  const [order, setOrder] = useState(orders[0]);

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

  const duplicateNote = async (note:  {
                                id: string,
                                title: string
                                body: string
                                category: string
                                date_edit: Date
                                date_create: Date
                                marked: boolean
                              }) => {
    let uuid = crypto.randomUUID();

    try {
      console.log("Adding to the database");
      const response = await fetch(
        '/api/data/notes',
        {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({...note, id: uuid, date_edit: new Date(), date_create: new Date()}),
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

  function handleDeleteNote (note:  {
                              id: string,
                              title: string
                              body: string
                              category: string
                              date_edit: Date
                              date_create: Date
                              marked: boolean
                            }) {
    deleteNote(note);
    setFetched(false);

  }

  const deleteNote = async (note:  {
                              id: string,
                              title: string
                              body: string
                              category: string
                              date_edit: Date
                              date_create: Date
                              marked: boolean
                            }) => {

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
        setNotes(orderedNotes.sort((a, b) => new Date(b.date_edit) - new Date(a.date_edit)));
        break;
      default:
        break;
    }
    setOrder(e.target.value);
  }

  return <div className="flex flex-col min-h-[96vh] bg-lime-800">
      <h1 className="pt-6 text-center text-4xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Note</h1>
      
      <div className="notes-container mx-2 mt-4 grid grid-cols-5 gap-4">
        {notes && notes.map((note) => <NoteItem onDuplicate={duplicateNote} onDelete={handleDeleteNote} note={note} key={note.id} />)}
      </div>

      <div className="my-4 mx-auto flex gap-2 items-center">
        <Link href="/note/new" className="text-lg text-white rounded-lg px-2 py-1 bg-sky-500 hover:bg-sky-800">Aggiungi nota</Link>
        <div className="flex gap-1 rounded-lg px-1 py-1 bg-indigo-500">
          <label htmlFor="order" className="text-lg text-white">Ordine:</label>
          <select
            id="order"
            value={order}
            onChange={changeOrder}
            className="text-lg rounded"
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
}