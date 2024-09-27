"use client";

import { useState,  useEffect, useRef, ChangeEvent } from "react";
import Link from "next/link";

import { categories } from "@/app/note/notes"
import { NoteState } from "@/app/type";

export default function ModificaNote({ params }: { params: { editId: string } }) {
  const [fetched, setFetched] = useState(false)
  const [note, setNote] = useState<NoteState>()
  const [marked, setMarked] = useState(false);

  useEffect(() => {
    if (!fetched){
      fetch('/api/data/notes').then(r => r.json()).then(data => {
        const fetchedNote = data.data.find((n: NoteState) => n.id == params.editId);
        if (fetchedNote) {
          setNote(fetchedNote);
          setMarked(fetchedNote.marked || false);
        }
        setFetched(true);
      }
      ).catch((e) => {
        console.log(e)
      })
    }
  },  [fetched, params.editId])

  function changeTitle (e: ChangeEvent<HTMLInputElement>) {
    setNote({
      ...note,
      title: e.target.value
    } as NoteState)
  }

  function changeBody (e: ChangeEvent<HTMLTextAreaElement>) {
    setNote({
      ...note,
      body: e.target.value
    } as NoteState)
  }

  function changeCategory(e: React.ChangeEvent<HTMLSelectElement>) {
    setNote({
      ...note,
      category: e.target.value
    } as NoteState)
  }

  function toggleMarked() {
    setMarked(!marked);
  }

  function handleSubmit(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
      updateNote({...note, date_edit: new Date(), marked: marked} as NoteState)
  }

  const updateNote = async (note: NoteState) => {
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
        <div className="flex flex-col items-center min-h-[92vh] bg-lime-800">
          <h1 className="pt-6 text-center text-3xl sm:text-4xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            {"Modifica nota"}
          </h1>
  
          <form className="h-full mt-8 w-11/12 sm:w-4/5 md:w-3/5 flex flex-col rounded-xl bg-lime-500 p-4">
            <input
              type="text"
              onChange={(e) => changeTitle(e)}
              className="text-base sm:text-lg font-semibold placeholder-black bg-lime-500 mb-4 p-2"
              value={note?.title || "Non ci sono note con id " + params.editId}
            />

            <textarea
              onChange={(e) => changeBody(e)}
              className="min-h-64 h-full text-sm sm:text-base placeholder-black bg-lime-500 p-2 mb-4"
              value={note?.body || "Nota non trovata"}
            ></textarea>

            <label htmlFor="category" className="text-sm sm:text-base">
              Categoria:
            </label>
            <select
              id="category"
              value={note?.category || ""}
              onChange={(e) => changeCategory(e)}
              className="mt-1 bg-white p-2 rounded-md text-sm sm:text-base mb-4"
            >
              {categories.map((cat) => (
                <option key={cat.name} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>

            <label className="mt-2 flex items-center text-sm sm:text-base">
              <input
                type="checkbox"
                checked={marked}
                onChange={toggleMarked}
                className="mr-2"
              />
              Markdown
            </label>
          </form>

          <Link
            href={{ pathname: "/note" }}
            onClick={handleSubmit}
            className="mt-4 mb-12 text-sm sm:text-base rounded-lg text-white bg-sky-600 hover:bg-sky-900 px-4 py-2"
          >
            Salva
          </Link>
        </div>
      )}
    </div>
  );  
}