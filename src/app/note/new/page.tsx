"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { categories } from "@/app/note/notes"
import { NoteState } from "@/app/type";
import { v4 as uuidv4 } from "uuid";

export default function CreaNote() {
  const [title, setTitle] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);
  const [body, setBody] = useState("");
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const [category, setCategory] = useState(categories[0].name);
  const [marked, setMarked] = useState(false);

  let uuid = uuidv4();
  let new_nota = {id: uuid, title: title, body: body, date_edit: new Date(), date_create: new Date(), category: category, marked: marked};
  
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

  function changeCategory(e: React.ChangeEvent<HTMLSelectElement>) {
    setCategory(e.target.value);
  }

  function toggleMarked() {
    setMarked(!marked);
  }

  const handleSubmit = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (title && body){
      new_nota = {id: uuid, title: title, body: body, date_edit: new Date(), date_create: new Date(), category: category, marked: marked};
      // console.log(new_nota);
      addNote(new_nota)
    }
    else {
      e.preventDefault();
      alert("Inserire titolo e testo!");
    }
  }

  const addNote = async (note: NoteState) => {
    try {
      const response = await fetch(
        '/api/data/notes',
        {
          method: "POST",
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
    <div className="flex flex-col items-center min-h-[92vh] bg-lime-800">
      <h1
        className="pt-6 text-center text-3xl sm:text-4xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
        id="create-note-header"
      >
        Crea nota
      </h1>
  
      <form
        className="h-full mt-8 w-11/12 sm:w-4/5 md:w-3/5 flex flex-col rounded-xl bg-lime-500 p-4"
        aria-labelledby="create-note-header"
      >
        <label htmlFor="note-title" className="sr-only">
          Titolo
        </label>
        <input
          type="text"
          onChange={changeTitle}
          ref={titleRef}
          placeholder="Titolo"
          className="text-base sm:text-lg font-semibold placeholder-black bg-lime-500 mb-4 p-2"
          value={title}
          id="note-title"
          required
          aria-required="true"
        />
  
        <label htmlFor="note-body" className="sr-only">
          Scrivi qualcosa...
        </label>
        <textarea
          onChange={changeBody}
          ref={bodyRef}
          placeholder="Scrivi qualcosa..."
          className="min-h-64 h-full text-sm sm:text-base placeholder-black bg-lime-500 p-2 mb-4"
          value={body}
          id="note-body"
          required
          aria-required="true"
        ></textarea>
  
        <label htmlFor="category" className="text-sm sm:text-base">
          Categoria:
        </label>
        <select
          id="category"
          value={category}
          onChange={changeCategory}
          className="mt-1 bg-white p-2 rounded-md text-sm sm:text-base mb-4"
          aria-label="Seleziona una categoria"
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
            aria-checked={marked}
          />
          Markdown
        </label>

        <Link
        href={{ pathname: "/note" }}
        onClick={handleSubmit}
        className="mt-4 mb-12 text-center text-sm sm:text-base rounded-lg text-white bg-sky-600 hover:bg-sky-900 px-4 py-2"
        >
          <button
            type="submit"
            aria-label="Salva la nota"
          >
            Salva
          </button>
        </Link>
      </form>
    </div>
  );
}