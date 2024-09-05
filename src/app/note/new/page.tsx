"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { categories } from "@/app/note/notes"

export default function CreaNote() {
  const [title, setTitle] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);
  const [body, setBody] = useState("");
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const [category, setCategory] = useState(categories[0].name);

  let uuid = crypto.randomUUID();
  let new_nota = {id: uuid, title: title, body: body, date_edit: new Date(), date_create: new Date()};
  
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

  const handleSubmit = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (title && body){
      //let uuid = crypto.randomUUID();
      new_nota = {id: uuid, title: title, body: body, date_edit: new Date(), date_create: new Date()};
      console.log(new_nota);
    }
    else {
      e.preventDefault();
      alert("Inserire titolo e testo!");
    }
  }

  return <div className="flex flex-col items-center h-full bg-lime-800">
      <h1 className="pt-6 text-center text-4xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Crea nota</h1>

      <form className="h-full mt-8 w-3/5 note-edit flex flex-col rounded-xl bg-lime-500 p-2">
        <input type="text" onChange={changeTitle} ref={titleRef} placeholder="Titolo" className="text-lg font-semibold placeholder-black bg-lime-500" value={title}/>
        <textarea onChange={changeBody} ref={bodyRef} placeholder="Scrivi qualcosa..." className="h-full text-base placeholder-black bg-lime-500" value={body}></textarea>
        <label htmlFor="category">Categoria:</label>
        <select
          id="category"
          value={category}
          onChange={changeCategory}
          className="mt-1 bg-white p-2 rounded-md"
        >
          {categories.map((cat) => (
            <option key={cat.name} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </form>

      <Link href={{ pathname: "/note", query: {new_edit_nota: JSON.stringify(new_nota)} }} onClick={handleSubmit} className="mt-2 mb-12 rounded-lg text-white bg-sky-600 hover:bg-sky-900 p-1">Salva</Link>
    </div>
}