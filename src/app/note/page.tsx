"use client";

import "../global.css";
import { useState } from "react";

export default function Note() {
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [notes, setNotes] = useState(data);
  const [count, setCount] = useState(4);

  function remove(id: number) {
    setNotes(notes.filter((e) => e.key !== id));
  }
  
  function handle() {
    if (!title || !des) {
      window.alert("Incomplete input");
      return;
    }
    setNotes([...notes, { key: count, title: title, des: des }]);
    setCount(count + 1);
    setTitle("");
    setDes("");
    console.log(notes);
  }

  return <div className="flex flex-col h-full bg-lime-800">
      <h1 className="pt-6 text-center text-4xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Note</h1>

      <div className="notes flex flex-row flex-wrap gap-2 justify-start m-4">
        {notes.map((e) => (
          <div className="notes-item rounded-xl bg-lime-500 p-2">
            <div>
              <h4 className="text-lg font-semibold">{e.title}</h4>
              <p className="text-base">{e.des}</p>
            </div>
            <button className="text-sm text-white rounded px-1 bg-slate-500 hover:bg-slate-900" onClick={() => remove(e.key)}>Elimina</button>
          </div>
        ))}
      </div>

      <div className="add flex flex-row gap-2 justify-center">
        <h3 className="text-white font-semibold">Nuova nota</h3>
        <input type="text" id="title" placeholder="Titolo" value={title} className="rounded-md px-1 w-1/6"
          onChange={(e) => setTitle(e.target.value)}></input>
        <input type="text" id="description" placeholder="Testo" value={des} className="rounded-md px-1 w-1/6"
          onChange={(e) => {setDes(e.target.value);}}></input>
        <button className="text-white font-semibold rounded-md px-1 bg-slate-400 hover:bg-slate-500" type="submit" onClick={handle}>Aggiungi</button>
      </div>
    </div>
}

//dummy data
const data = [
  {
    key: 0,
    title: "Html",
    des: "HyperText MarkUp Language",
  },
  { key: 1, title: "CSS", des: "StyleSheet" },
  {
    key: 2,
    title: "JavaScript",
    des: "Scripting language for web",
  },
  {
    key: 3,
    title: "React",
    des: "JavaScript framework",
  },
];