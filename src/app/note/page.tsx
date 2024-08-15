"use client";

import Link from "next/link";

import NoteItem from "@/app/components/NoteItem";
import "../global.css";
import { useState, useRef } from "react";
import { useSearchParams } from "next/navigation";

import note from "@/app/note/notes"

export default function Note() {
  //let note = notePlaceholder;
  const noteParams = useSearchParams();

  function noteItems () {
    let n = noteParams.get("new_edit_nota");
    if (n != null){
      let new_n:  {
        id: string,
        title: string
        body: string
        date: Date
      }
      new_n = JSON.parse(n);
      new_n.date = new Date();

      let exist = false;
      let modified = false;
      note.forEach(n => {
        if (n.id == new_n.id) {
          exist = true;
          if (n.title != new_n.title || n.body != new_n.body)
            modified = true;
        }
      })
      
      if (exist && modified) {
        note.forEach(n => {
          if (n.id == new_n.id) {
            n.title = new_n.title;
            n.body = new_n.body;
            n.date = new Date();
            console.log("Nota aggiornata")
          }
        })
      }
      else if (!exist) {
        console.log("pre push");
        console.log(note);
        note.push(new_n);
        console.log("post push");
      }

      console.log(note);
    }
    else
      console.log("Nessuna nota");

    //console.log(note);
    note.sort(function(a, b) {
      if (a.date > b.date)
        return -1;
      else
        return 0;
    });
    return note.map((nota) => <NoteItem nota={nota} key={nota.id} />);
  }

  return <div className="flex flex-col h-full bg-lime-800">
      <h1 className="pt-6 text-center text-4xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Note</h1>
      
      <div className="notes-container mx-2 mt-4 grid grid-cols-5 gap-4">
        {noteItems()}
      </div>

      <Link href="/note/new" className="text-lg text-white rounded-lg mx-auto my-4 px-2 py-1 bg-sky-600 hover:bg-sky-900">Aggiungi nota</Link>
    </div>
}