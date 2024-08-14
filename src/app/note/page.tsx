"use client";

import Link from "next/link";

import NoteItem from "@/app/components/NoteItem";
import "../global.css";
import { useState } from "react";
import { Dispatch, SetStateAction } from "react";

import notePlaceholder from "@/app/note/notes"

export default function Note() {
  const [note, setNote] = useState(notePlaceholder);

  return <div className="flex flex-col h-full bg-lime-800">
      <h1 className="pt-6 text-center text-4xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Note</h1>
      
      <div className="notes-container mx-2 mt-4 grid grid-cols-5 gap-4">
        {note.map((nota) => <NoteItem nota={nota} key={nota.id} />)}
      </div>

      <Link href="/note/new" className="text-lg text-white rounded-lg mx-auto my-4 px-2 py-1 bg-sky-600 hover:bg-sky-900">Aggiungi nota</Link>
    </div>
}