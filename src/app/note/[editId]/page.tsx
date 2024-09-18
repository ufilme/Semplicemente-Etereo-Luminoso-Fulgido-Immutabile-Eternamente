"use client";

import { useState,  useEffect, useRef } from "react";
import Link from "next/link";

import { categories } from "@/app/note/notes"

export default function ModificaNote({ params }: { params: { editId: string } }) {
  const [fetched, setFetched] = useState(false)
  const [note, setNote] = useState({})

  useEffect(() => {
    if (!fetched){
      fetch('/api/data/notes').then(r => r.json()).then(data => {
          setNote(data.data.find(n => n.id == params.editId))
          setFetched(true)
        }
      ).catch((e) => {
        console.log(e)
      })
    }
  })

  function changeTitle (e) {
    setNote({
      ...note,
      title: e.target.value
    })
  }

  function changeBody (e) {
    setNote({
      ...note,
      body: e.target.value
    })
  }

  function changeCategory(e: React.ChangeEvent<HTMLSelectElement>) {
    setNote({
      ...note,
      category: e.target.value
    })
  }

  function handleSubmit(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
      updateNote({...note, date_edit: new Date()})
  }

  const updateNote = async (note) => {
    try {
      const response = await fetch(
        '/api/data/notes',
        {
          method: "PATCH",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(note),
        }
      );
      if (!response.ok) {
        // console.log(await response.json())
      }
    } catch {}
  }
  
  return (
    <div>
      {fetched && (
    <div className="flex flex-col items-center h-full bg-lime-800">
      <h1 className="pt-6 text-center text-4xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">{"Modifica nota " + params.editId}</h1>

      <form className="h-full mt-8 w-3/5 note-edit flex flex-col rounded-xl bg-lime-500 p-2">
        <input type="text" onChange={(e) => changeTitle(e)} className="text-lg font-semibold placeholder-black bg-lime-500" value={note?.title || "Non ci sono note con id " + params.editId}/>
        <textarea onChange={(e) => changeBody(e)} className="h-full text-base placeholder-black bg-lime-500" value={note?.body || "Nota non trovata"}></textarea>
        <label htmlFor="category">Categoria:</label>
        <select
          id="category"
          value={note?.category || ""}
          onChange={(e) => changeCategory(e)}
          className="mt-1 bg-white p-2 rounded-md"
        >
          {categories.map((cat) => (
            <option key={cat.name} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </form>

      <Link href={{ pathname: "/note"}} onClick={handleSubmit} className="mt-2 mb-12 rounded-lg text-white bg-sky-600 hover:bg-sky-900 p-1">Salva</Link>
    </div>
      )}
    </div>
  )
}