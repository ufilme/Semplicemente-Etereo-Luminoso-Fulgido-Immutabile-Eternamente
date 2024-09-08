import { ViewPreview } from "@/app/components/ViewPreview";
import Link from "next/link";

import { notes } from "@/app/note/notes"

export default function Home() {
  function newestNote() {
    let note: {
      id: string,
      title: string
      body: string
      category: string
      date_edit: Date
      date_create: Date
    };
    note =   {
      id: "-1",
      title: "Nessuna nota",
      body: "Non ci sono ancora note",
      category: "Altro",
      date_edit: new Date(0),
      date_create: new Date(0)
    };
    notes.forEach(n => {
                    if (n.date_edit > note.date_edit)
                      note = n;
                });

    let title = note.title.length > 18 ? note.title.substring(0, 18) + "..." : note.title;
    let body = note.body.length > 30 ? note.body.substring(0, 30) + "..." : note.body;

    let year = note.date_edit.getFullYear();
    let month = note.date_edit.getMonth() + 1;
    let day = note.date_edit.getDate();
    let editDate = year + "/" + month + "/" + day;

    return title + " | " + body + " | " + editDate;
  }

  return (
    <div className="h-[96vh]">
      <h1 className="h-1/4 flex items-center justify-center text-4xl text-center font-bold text-gray-200 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
        Semplicemente Etereo Luminoso Fulgido Immutabile Eternamente
      </h1>
      <div className="home grid grid-cols-2 gap-4 pb-8 mx-8 h-3/4">
        <Link href="/calendario">
          <ViewPreview
            viewbg="bg-amber-500"
            hoverbg="hover:bg-amber-600"
            id="calendar"
            title="Calendario"
            p="Eventi di questa settimana"
          />
        </Link>
        <Link href="/note">
          <ViewPreview
            viewbg="bg-lime-500"
            hoverbg="hover:bg-lime-600"
            id="notes"
            title="Note"
            p={newestNote()}
          />
        </Link>
        <Link href="/pomodoro">
          <ViewPreview
            viewbg="bg-red-600"
            hoverbg="hover:bg-red-700"
            id="tomato"
            title="Pomodoro"
            p="Riepilogo ultima sessione"
          />
        </Link>
        <Link href="/progetti">
          <ViewPreview
            viewbg="bg-teal-500"
            hoverbg="hover:bg-teal-600"
            id="projects"
            title="Gestione progetti"
            p="Passa alla versione premium per sbloccare tutte le funzionalità"
          />
        </Link>
      </div>
    </div>
  );
}
