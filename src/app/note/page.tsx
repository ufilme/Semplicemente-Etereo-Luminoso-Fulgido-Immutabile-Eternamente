"use client";

import Link from "next/link";

import NoteItem from "@/app/components/NoteItem";
import "../global.css";
import { useState, useRef } from "react";
import { useSearchParams } from "next/navigation";

import { notes, categories } from "@/app/note/notes"

export default function Note() {
  //let note = notePlaceholder;
  const noteParams = useSearchParams();

  const orders = [
    "Alfabetico",
    "Lunghezza",
    "Modifica"
  ]
  const [order, setOrder] = useState(orders[0]);

  function noteItems () {
    let n = noteParams.get("new_edit_nota");
    if (n != null){
      let new_n:  {
        id: string,
        title: string
        body: string
        category: string
        date_edit: Date
        date_create: Date
      }
      new_n = JSON.parse(n);
      new_n.date_create = new Date();
      new_n.date_edit = new_n.date_create;

      let exist = false;
      let modified = false;
      notes.forEach(n => {
        if (n.id == new_n.id) {
          exist = true;
          if (n.title != new_n.title || n.body != new_n.body || n.category != new_n.category)
            modified = true;
        }
      })
      
      if (exist && modified) {
        notes.forEach(n => {
          if (n.id == new_n.id) {
            n.title = new_n.title;
            n.body = new_n.body;
            n.date_edit = new Date();
            n.category = new_n.category;
            console.log("Nota aggiornata")
          }
        })
      }
      else if (!exist) {
        console.log("pre push");
        console.log(notes);
        notes.push(new_n);
        console.log("post push");
      }

      console.log(notes);
    }
    else
      console.log("Nessuna nota");

    //console.log(note);
    switch (order) {
      case "Alfabetico":
        notes.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "Lunghezza":
        notes.sort((a, b) => a.body.length - b.body.length);
        break;
      case "Modifica":
        notes.sort((a, b) => b.date_edit.getTime() - a.date_edit.getTime());
        break;
      default:
        break;
    }
    return notes.map((note) => <NoteItem note={note} key={note.id} />);
  }

  function changeOrder(e: React.ChangeEvent<HTMLSelectElement>) {
    setOrder(e.target.value);
  }

  return <div className="flex flex-col h-full bg-lime-800">
      <h1 className="pt-6 text-center text-4xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Note</h1>
      
      <div className="notes-container mx-2 mt-4 grid grid-cols-5 gap-4">
        {noteItems()}
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