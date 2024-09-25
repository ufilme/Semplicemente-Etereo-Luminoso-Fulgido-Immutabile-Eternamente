"use client";

import "../global.css";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import { startOfWeek, getDay } from "date-fns";
//import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useState, useEffect, useCallback } from "react";
import { it } from "date-fns/locale";
import EventCreateModal from "@/app/components/EventCreateModal";
import ActivityCreateModal from "@/app/components/ActivityCreateModal";
import EventModal from "@/app/components/EventModal";
import ActivityEventModal from "@/app/components/ActivityEventModal";
import Link from "next/link";


// Configurazione delle lingue
const locales = {
  it: it,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (date: Date) => startOfWeek(date, { weekStartsOn: 1 }), // Lunedì come primo giorno della settimana
  getDay,
  locales,
});

const messages = {
  allDay: "Tutti i giorni",
  previous: "Precedente",
  next: "Successivo",
  today: "Oggi",
  month: "Mese",
  week: "Settimana",
  day: "Giorno",
  agenda: "Agenda",
  date: "Data",
  time: "Ora",
  event: "Evento",
};

export default function MyCalendar() {
  const [events, setEvents] = useState([]);
  const [fetched, setFetched] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<{ title: string; start: Date | null; end: Date | null; allDay: boolean; location:string; id: string; repetitionEvery: number; repetitionCount: number; } | { title: string; start: Date | null; end: Date | null; id: string; completed: boolean; } | null>(null);
  const [eventCreateModalOpen, setEventCreateModalOpen] = useState(false);
  const [activityCreateModalOpen, setActivityCreateModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [activityModalOpen, setActivityModalOpen] = useState(false);
  const [timeMachine, setTimeMachine] = useState(() => {
    const timeMachine = localStorage.getItem("timeMachine");
    return timeMachine ? JSON.parse(timeMachine) : null;
});

  const [view, setView] = useState<Views.DAY | Views.WEEK | Views.WORK_WEEK | Views.MONTH | Views.AGENDA>(Views.WEEK);
  // const [date, setDate] = useState(new Date());
  const [date, setDate] = useState(new Date(timeMachine.date))

  addEventListener('storage', () => {
    const tm = JSON.parse(localStorage.getItem("timeMachine"))
    setDate(new Date(tm.date))
  })

  const [evts, setEvts] = useState([]);
  const [acts, setActs] = useState([]);

  const addEvent = async (event) => {
    if (Object.hasOwn(event, 'completed')) {
      try {
        const response = await fetch(
          '/api/data/activities',
          {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(event),
          }
        );
        if (!response.ok) {
          // console.log(await response.json())
        }
      } catch {}
    }
    else {
      try {
        const response = await fetch(
          '/api/data/events',
          {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(event),
          }
        );
        if (!response.ok) {
          // console.log(await response.json())
        }
      } catch {}
    }
  }

  function handleAddEvent(newEvent:
    { title: string;
      start: Date | null;
      end: Date | null;
      allDay: boolean;
      location: string;
      id: string;
      repetitionEvery: number;
      repetitionCount: number;
    } |
    {
      title: string,
      start: Date | null,
      end: Date | null,
      id: string,
      completed: boolean
    }) {
      
    const eventsToAdd = [];

    // Aggiungi l'evento iniziale
    // eventsToAdd.push(newEvent);
    addEvent(newEvent)

    // Se l'evento si ripete più di una volta
    if (newEvent.repetitionCount > 1) {
      const startDate = newEvent.start;
      const endDate = newEvent.end;

      // Crea le ripetizioni
      for (let i = 1; i < newEvent.repetitionCount; i++) {
        const repeatedStartDate = new Date(startDate!);
        repeatedStartDate.setDate(repeatedStartDate.getDate() + i * newEvent.repetitionEvery);

        const repeatedEndDate = new Date(endDate!);
        repeatedEndDate.setDate(repeatedEndDate.getDate() + i * newEvent.repetitionEvery);

        // Aggiungi l'evento ripetuto
        // eventsToAdd.push({
        //   ...newEvent,
        //   start: repeatedStartDate,
        //   end: repeatedEndDate,
        // });
        addEvent({
          ...newEvent,
          start: repeatedStartDate,
          end: repeatedEndDate,
        });
      }
    }

    setFetched(false)
    
    // setEvents([...events, ...eventsToAdd]);
  }

  // Funzione per gestire l'apertura del modal
  function handleEventClick(event: { title: string; start: Date | null; end: Date | null; allDay: boolean; location: string; id: string; repetitionEvery: number; repetitionCount: number; activity: boolean }) {
    setSelectedEvent(event);
    
    if (Object.hasOwn(event, 'completed')) {
      setActivityModalOpen(true);
    }
    else {
      setModalOpen(true);
    }
  }

  function handleCloseEventCreateModal() {
    setEventCreateModalOpen(false);
  }

  function handleCloseActivityCreateModal() {
    setActivityCreateModalOpen(false);
  }

  function handleActivityCloseModal() {
    setActivityModalOpen(false);
    setSelectedEvent(null);
  }

  function handleCloseModal() {
    setModalOpen(false);
    setSelectedEvent(null);
  }

  const deleteEvent = async (event) => {
    if (Object.hasOwn(event, 'completed')) {
      try {
        const response = await fetch(
          `/api/data/activities?id=${event.id}`,
          {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          // console.log(await response.json())
        }
      } catch {}
    }
    else {
      try {
        const response = await fetch(
          `/api/data/events?id=${event.id}`,
          {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          // console.log(await response.json())
        }
      } catch {}
    }
  }

  // Funzione per eliminare l'evento selezionato
  function handleDeleteEvent(eventToDelete: { title: string; start: Date | null; end: Date | null; id: string }) {
    console.log("Eliminazione in corso");
    // setEvents(events.filter(event => event.id !== eventToDelete.id));
    deleteEvent(eventToDelete)
    setFetched(false)
    handleCloseModal();
    handleActivityCloseModal();
  }

  const updateEvent = async (event) => {
    if (Object.hasOwn(event, 'completed')) {
      try {
        const response = await fetch(
          '/api/data/activities',
          {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(event),
          }
        );
        if (!response.ok) {
          // console.log(await response.json())
        }
      } catch {}
    }
    else {
      try {
        const response = await fetch(
          '/api/data/events',
          {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(event),
          }
        );
        if (!response.ok) {
          // console.log(await response.json())
        }
      } catch {}
    }
  }

  // Funzione per aggiornare un evento esistente
  function handleUpdateEvent(updatedEvent: { title: string; start: Date | null; end: Date | null; allDay: boolean; location: string; id: string; repetitionEvery: number; repetitionCount: number } | { title: string; start: Date | null; end: Date | null; id: string; completed: string }) {
    // setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event));
    updateEvent(updatedEvent)
    setFetched(false)
    handleCloseModal();
    handleActivityCloseModal();
  }

  useEffect(() => {
    if (!fetched){
      fetch('/api/data/events').then(r => r.json()).then(data => {
          setEvts(data.data.map((d) => {
            return {
              ...d,
              start: new Date(d.start),
              end: new Date(d.end)
            }
          }))
        }
      ).catch((e) => {
        console.log(e)
      })

      fetch('/api/data/activities').then(r => r.json()).then(data => {
          setActs(data.data.map((d) => {
            return {
              ...d,
              start: new Date(d.start),
              end: new Date(d.end)
            }
          }))
          setFetched(true);
        }
      ).catch((e) => {
        console.log(e)
      })      
    }
  }, [fetched])

  useEffect(() => {
    if (fetched){
      const evt_act = evts.concat(acts);
      setEvents(evt_act);
    }
  }, [fetched])

  const [todayDate, setTodayDate] = useState(new Date());

  // Example events (you can load your events here)
  const eventi = [
    {
      title: "Meeting",
      start: new Date(),
      end: new Date(),
    },
  ];

  const onNavigate = useCallback((newDate) => setDate(newDate), [setDate])

  return (
    <div className="min-h-[92vh] bg-amber-600">
      <h1 className="pt-6 text-center text-4xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
        Calendario
      </h1>

      <div className="text-center mt-4 mb-2 flex gap-2 justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setEventCreateModalOpen(true)}
        >
          Aggiungi Evento
        </button>
        <button
          className="bg-[rgb(0,204,61)] hover:bg-[rgb(0,153,45)] text-white font-bold py-2 px-4 rounded"
          onClick={() => setActivityCreateModalOpen(true)}
        >
          Aggiungi Attività
        </button>
      </div>
      <div className="flex flex-row justify-center">
        <Link href="/calendario/attivita" className="text-center text-white bg-slate-500 hover:bg-slate-600 text-sm py-1 px-2 rounded">Lista attività</Link>
      </div>

      <Calendar
        className="m-8 p-6 bg-white"
        localizer={localizer}
        culture="it"
        messages={messages}
        events={events}
        views={[Views.MONTH, Views.WEEK, Views.DAY]}
        defaultView={view}
        view={view}
        date={date}
        getNow={() => date}
        scrollToTime={new Date()}
        onView={(view: Views.DAY | Views.WEEK | Views.WORK_WEEK | Views.MONTH | Views.AGENDA ) => setView(view)}
        onNavigate={onNavigate}
        onSelectEvent={handleEventClick} // Gestore del clic per gli eventi
        startAccessor="start"
        endAccessor="end"
        style={{ height: "70vh" }}
      />

      <EventCreateModal
        isOpen={eventCreateModalOpen}
        onClose={handleCloseEventCreateModal}
        onAdd={handleAddEvent}
      />

      <ActivityCreateModal
        isOpen={activityCreateModalOpen}
        onClose={handleCloseActivityCreateModal}
        onAdd={handleAddEvent}
      />

      <ActivityEventModal
        isOpen={activityModalOpen}
        activity={selectedEvent}
        onClose={handleActivityCloseModal}
        onDelete={handleDeleteEvent}
        onUpdate={handleUpdateEvent}
      />

      <EventModal
        isOpen={modalOpen}
        event={selectedEvent}
        onClose={handleCloseModal}
        onDelete={handleDeleteEvent}
        onUpdate={handleUpdateEvent}
      />
    </div>
  );
}