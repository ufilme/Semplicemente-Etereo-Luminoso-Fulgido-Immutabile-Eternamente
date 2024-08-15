"use client";

import { useState, useRef } from "react";
import Link from "next/link";

import note from "@/app/note/notes"

export default function ModificaNote({ params }: { params: { editId: string } }) {
  let nota:  {
    id: string,
    title: string
    body: string
    date: Date
  } | null;
  
  nota = null;
  for (let i in note) {
    if (note[i].id == params.editId) {
      nota = note[i];
    }
  }

  let b = "Non ci sono note con id " + params.editId;
  let t = "Nota non trovata";
  if (nota != null) {
    t = nota.title;
    b = nota.body;
  }

  const [title, setTitle] = useState(t);
  const titleRef = useRef<HTMLInputElement>(null);
  const [body, setBody] = useState(b);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  let edit_nota = {id: params.editId, title: title, body: body, date: new Date()};

  function changeTitle () {
    let t = titleRef.current?.value;
    if (t != null)
      setTitle(t);
  }

  function changeBody () {
    let b = bodyRef.current?.value;
    if (b != null)
      setBody(b);
  }

  const handleSubmit = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (title && body){
      //let uuid = crypto.randomUUID();
      edit_nota = {id: params.editId, title: title, body: body, date: new Date()};
      console.log(edit_nota);
    }
    else {
      e.preventDefault();
      alert("Inserire titolo e testo!");
    }
  }
  
  return <div className="flex flex-col items-center h-full bg-lime-800">
      <h1 className="pt-6 text-center text-4xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">{"Modifica nota " + params.editId}</h1>

      <form className="h-full mt-8 w-3/5 note-edit flex flex-col rounded-xl bg-lime-500 p-2">
        <input type="text" onChange={changeTitle} ref={titleRef} className="text-lg font-semibold placeholder-black bg-lime-500" value={title}/>
        <textarea onChange={changeBody} ref={bodyRef} className="h-full text-base placeholder-black bg-lime-500" value={body}></textarea>
      </form>

      <Link href={{ pathname: "/note", query: {new_edit_nota: JSON.stringify(edit_nota)} }} onClick={handleSubmit} className="mt-2 mb-12 rounded-lg text-white bg-sky-600 hover:bg-sky-900 p-1">Salva</Link>
    </div>
}