"use client"
import { ViewPreview } from "@/app/components/ViewPreview";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [fetched, setFetched] = useState(false)
  const [tomatoes, setTomatoes] = useState([])
  const [notes, setNotes] = useState([])
  const [events, setEvents] = useState([])
  const [newestNote, setNewestNote] = useState("Loading...")
  const [latestTomatoes, setLatestTomatoes] = useState(false)
  const [weekEvents, setWeekEvents] = useState(false)

  useEffect(() => {
    if (!fetched){
      fetch('/api/data/tomatoes').then(r => r.json()).then(data => {
          setTomatoes(data.data.splice(-3))
        }
      ).catch((e) => {
        console.log(e)
      })
      fetch('/api/data/notes').then(r => r.json()).then(data => {
        setNotes(data.data.map((n) => {
          return {
            ...n,
            date_edit: new Date(n.date_edit),
            date_create: new Date(n.date_create)
          }
        }))
        }
      ).catch((e) => {
        console.log(e)
      })
      fetch('/api/data/events').then(r => r.json()).then(data => {
        setEvents(data.data.map((d) => {
          return {
            ...d,
            start: new Date(d.start),
            end: new Date(d.end)
          }
        }))
        setFetched(true)
        }
      ).catch((e) => {
        console.log(e)
      })
    }
  }, [fetched])

  useEffect(() => {
    if (fetched){
      getNewestNote()
      setLatestTomatoes(true)
      getEventsThisWeek()
      setWeekEvents(true)
    }
  }, [fetched])

  function getNewestNote() {
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
                    if (n.date_edit.getDate() > note.date_edit.getDate()) note = n;
                });

    let title = note.title.length > 18 ? note.title.substring(0, 18) + "..." : note.title;
    let body = note.body.length > 30 ? note.body.substring(0, 30) + "..." : note.body;

    let year = note.date_edit.getFullYear();
    let month = note.date_edit.getMonth() + 1;
    let day = note.date_edit.getDate();
    let editDate = year + "/" + month + "/" + day;

    setNewestNote(title + " | " + body + " | " + editDate)
  }

  function getEventsThisWeek(){
    const getStartOfWeek = () => {
      const now = new Date();
      const dayOfWeek = now.getDay(); // 0 (Sunday) to 6 (Saturday)
      const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust when day is Sunday
      const startOfWeek = new Date(now.setDate(diff));
      startOfWeek.setHours(0, 0, 0, 0);
      return startOfWeek;
    };
    
    const getEndOfWeek = () => {
      const startOfWeek = getStartOfWeek();
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6); // Add 6 days to get the end of the week
      endOfWeek.setHours(23, 59, 59, 999);
      return endOfWeek;
    };

    const startOfWeek = getStartOfWeek();
    const endOfWeek = getEndOfWeek();

    // Filter events for the current week
    setEvents(events.filter(e => {
      const eventDate = new Date(e.start);
      return eventDate >= startOfWeek && eventDate <= endOfWeek;
    }));
  }

  return (
    <div className="h-[92vh]">
      <h1 className="h-1/4 flex items-center justify-center text-4xl text-center font-bold text-gray-200 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
        Semplicemente Etereo Luminoso Fulgido Immutabile Eternamente
      </h1>
      <div className="home grid grid-cols-2 gap-4 pb-8 mx-8 h-3/4">
        <Link href="/calendario">
          <div className="bg-amber-500 hover:bg-amber-600 home-view w-full h-full mb-6 flex flex-col justify-center items-center text-center rounded-3xl">
          <h2 className="text-3xl font-bold">Calendario</h2>
          {!weekEvents && ( <p className="text-lg font-medium">Loading...</p>)}
          {weekEvents && events.length == 0 && (
            <p className="text-lg font-medium">Nessun evento questa settimana</p>
          )}
          {events.map((e, index) => (
            <p key={index} className="text-lg font-medium">{e.title} on {e.start.toLocaleDateString()}</p>
          ))}
        </div>
        </Link>
        <Link href="/note">
          <ViewPreview
            viewbg="bg-lime-500"
            hoverbg="hover:bg-lime-600"
            id="notes"
            title="Note"
            p={newestNote}
          />
        </Link>
        <Link href="/pomodoro">
        <div className="bg-red-600 hover:bg-red-700 home-view w-full h-full mb-6 flex flex-col justify-center items-center text-center rounded-3xl">
          <h2 className="text-3xl font-bold">Pomodoro</h2>
          {!latestTomatoes && ( <p className="text-lg font-medium">Loading...</p>)}
          {latestTomatoes && tomatoes.length == 0 && (
            <p className="text-lg font-medium">Nessuna sessione recente</p>
          )}
          {tomatoes.map((t, index) => (
            <p key={index} className="text-lg font-medium">Studio: {t.tStudio} Pausa: {t.tPausa} Cicli: {t.nCicli}</p>
          ))}
        </div>
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
