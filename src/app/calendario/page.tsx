"use client";

import "../global.css";
import { Calendar, dateFnsLocalizer, View } from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import format from "date-fns/format";
import parse from "date-fns/parse";
import { startOfWeek, getDay } from "date-fns";
//import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useState, useEffect, useCallback } from "react";
import { it } from "date-fns/locale";
import EventCreateModal from "@/app/components/EventCreateModal";
import ActivityCreateModal from "@/app/components/ActivityCreateModal";
import TomatoCreateModal from "@/app/components/TomatoCreateModal";
import EventModal from "@/app/components/EventModal";
import ActivityEventModal from "@/app/components/ActivityEventModal";
import TomatoEventModal from "@/app/components/TomatoEventModal";
import Link from "next/link";
import { ActivityState, EventState, TomatoState } from "../type";
import { Notifications } from "@/app/components/Notifications";
import toast, { Toaster } from "react-hot-toast";
import { setTime } from "react-datepicker/dist/date_utils";


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

enum Views {
  MONTH = 'month',
  WEEK = 'week',
  WORK_WEEK = 'work_week',
  DAY = 'day',
  AGENDA = 'agenda',
}

export default function MyCalendar() {
  const [events, setEvents] = useState<(EventState | ActivityState | TomatoState)[]>([]);
  const [fetched, setFetched] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<EventState | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<ActivityState | null>(null);
  const [selectedTomato, setSelectedTomato] = useState<TomatoState | null>(null);
  const [eventCreateModalOpen, setEventCreateModalOpen] = useState(false);
  const [activityCreateModalOpen, setActivityCreateModalOpen] = useState(false);
  const [tomatoCreateModalOpen, setTomatoCreateModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [activityModalOpen, setActivityModalOpen] = useState(false);
  const [tomatoModalOpen, setTomatoModalOpen] = useState(false);
  const [pushNotify, setPushNotify] = useState("");
  const [navigateDate, setNavigateDate] = useState(new Date())
  const [eventRegistered, setEventRegisterd] = useState(false)
//   const [timeMachine, setTimeMachine] = useState(() => {
//     const timeMachine = localStorage.getItem("timeMachine");
//     return timeMachine ? JSON.parse(timeMachine) : null;
// });

//console.log("pushNotify:", pushNotify);

const [date, setDate] = useState(new Date())
const [timeMachine, setTimeMachine] = useState({
  active: false,
  date: new Date(),
});

useEffect(() => {
  const storedTimeMachine = localStorage.getItem("timeMachine");
  if (storedTimeMachine) {
    setTimeMachine(JSON.parse(storedTimeMachine));
    setDate(new Date(timeMachine.date))
  }
}, []);

useEffect(() => {
  const int = setInterval(() => {
    if (timeMachine.active){
      setDate(new Date(timeMachine.date))
    } else {
      setDate(new Date())
    }
  }, 2000)

  return () => clearInterval(int)
})


  const [view, setView] = useState<string>(Views.WEEK);

  useEffect(() => {
    if (!eventRegistered){
      addEventListener('storage', () => {
        const tm = JSON.parse(localStorage.getItem("timeMachine") || "")
        setTimeMachine(tm)
        setDate(new Date(tm.date))
      })
      setEventRegisterd(true)
    }
  }, [])

  const [evts, setEvts] = useState<EventState[]>([]);
  const [acts, setActs] = useState<ActivityState[]>([]);
  const [toms, setToms] = useState<TomatoState[]>([]);

  const addEvent = async (event: EventState | ActivityState | TomatoState) => {
    if (Object.hasOwn(event, 'tStudio')) {
      try {
        const response = await fetch(
          '/api/data/tomatoes',
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
    } else if (Object.hasOwn(event, 'completed')) {
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

  function handleAddEvent(newEvent: EventState | ActivityState | TomatoState) {
      
    const eventsToAdd = [];

    // Aggiungi l'evento iniziale
    // eventsToAdd.push(newEvent);
    addEvent(newEvent)

    // Se l'evento si ripete più di una volta
    if ("repetitionCount" in newEvent && newEvent.repetitionCount > 1) {
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
  function handleEventClick(event: EventState | ActivityState | TomatoState) {
    if (Object.hasOwn(event, "tStudio")){
      setSelectedTomato(event as TomatoState);
      setTomatoModalOpen(true)
    } else if (Object.hasOwn(event, 'completed')) {
      setSelectedActivity(event as ActivityState);
      setActivityModalOpen(true);
    }
    else {
      setSelectedEvent(event as EventState);
      setModalOpen(true);
    }
  }

  function handleCloseEventCreateModal() {
    setEventCreateModalOpen(false);
  }

  function handleCloseTomatoCreateModal() {
    setTomatoCreateModalOpen(false);
  }

  function handleCloseActivityCreateModal() {
    setActivityCreateModalOpen(false);
  }

  function handleTomatoCloseModal() {
    setTomatoModalOpen(false);
    setSelectedTomato(null);
  }

  function handleActivityCloseModal() {
    setActivityModalOpen(false);
    setSelectedActivity(null);
  }

  function handleCloseModal() {
    setModalOpen(false);
    setSelectedEvent(null);
  }

  const deleteEvent = async (event: EventState | ActivityState | TomatoState) => {
    if (Object.hasOwn(event, 'tStudio')) {
      try {
        const response = await fetch(
          `/api/data/tomatoes?id=${event.id}`,
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
    } else if (Object.hasOwn(event, 'completed')) {
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
  function handleDeleteEvent(eventToDelete: EventState | ActivityState | TomatoState) {
    //console.log("Eliminazione in corso");
    // setEvents(events.filter(event => event.id !== eventToDelete.id));
    deleteEvent(eventToDelete)
    setFetched(false)
    handleCloseModal();
    handleActivityCloseModal();
    handleTomatoCloseModal();
  }

  const updateEvent = async (event: EventState | ActivityState | TomatoState) => {
    if (Object.hasOwn(event, 'tStudio')) {
      try {
        const response = await fetch(
          '/api/data/tomatoes',
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
    } else if (Object.hasOwn(event, 'completed')) {
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
  function handleUpdateEvent(updatedEvent: EventState | ActivityState | TomatoState) {
    // setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event));
    updateEvent(updatedEvent)
    setFetched(false)
    handleCloseModal();
    handleActivityCloseModal();
    handleTomatoCloseModal();
  }

  useEffect(() => {
    if (!fetched){
      fetch('/api/data/events').then(r => r.json()).then(data => {
          setEvts(data.data.map((d: EventState) => {
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
          setActs(data.data.map((d: ActivityState) => {
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
      fetch('/api/data/tomatoes').then(r => r.json()).then(data => {
        setToms(data.data.map((d: TomatoState) => {
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
    fetch('/api/data/user')
    .then(r => r.json())
    .then(data => {
      //console.log("fetch", data.notifications)
      setPushNotify(data.notifications);
      setFetched(true);
    })
    .catch((e) => {
      console.error('Error fetching notifications:', e);
    });  
    }
  }, [fetched])

  useEffect(() => {
    if (fetched){
      setEvents([...evts, ...acts, ...toms]);
    }
  }, [fetched])

    const updatePushNotify = async (notifyOption: string) => {
      try {
        const response = await fetch(
          '/api/data/user',
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ notifications: notifyOption})
          }
        );

        if (!response.ok) {
          console.error('Failed to update notifications', await response.json());
        } else {
          setPushNotify(notifyOption)
        }
      } catch (e) {
        console.error('Error updating notifications:', e);
      }
    };

  return (
    <div className="min-h-[92vh] bg-amber-600">
      <div><Toaster /></div>
      <Notifications date={date} />

      <h1
        className="pt-6 text-center text-3xl sm:text-4xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] mb-4"
        aria-label="Calendario"
      >
        Calendario
      </h1>
  
      <div className="text-center mt-4 mb-2 flex flex-col sm:flex-row gap-2 justify-center items-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-3/4 sm:w-auto"
          onClick={() => setEventCreateModalOpen(true)}
          aria-label="Aggiungi evento"
        >
          Aggiungi Evento
        </button>
        <button
          className="bg-[rgb(0,204,61)] hover:bg-[rgb(0,153,45)] text-white font-bold py-2 px-4 rounded w-3/4 sm:w-auto"
          onClick={() => setActivityCreateModalOpen(true)}
          aria-label="Aggiungi attività"
        >
          Aggiungi Attività
        </button>
        <button
          className="bg-[rgb(214,21,0)] hover:bg-[rgb(178,17,0)] text-white font-bold py-2 px-4 rounded w-3/4 sm:w-auto"
          onClick={() => setTomatoCreateModalOpen(true)}
          aria-label="Aggiungi tomato"
        >
          Aggiungi Tomato
        </button>
      </div>

      <div className="mb-2 text-center">
        <label className="mr-2">Notifiche push:</label>
        <input
          type="checkbox"
          checked={pushNotify == "native"}
          onChange={(e) => {updatePushNotify(e.target.checked ? "native" : "in-app");}}
          aria-label="Tipo di notifiche"
          />
      </div>
  
      <div className="flex justify-center mb-4 gap-2">
        <Link
          href="/calendario/attivita"
          className="text-center text-white bg-slate-500 hover:bg-slate-600 text-sm py-1 px-2 rounded"
          aria-label="Vai alla lista attività"
        >
          Lista attività
        </Link>
        <Link
          href="/calendario/tomato"
          className="text-center text-white bg-slate-500 hover:bg-slate-600 text-sm py-1 px-2 rounded"
          aria-label="Vai alla lista tomatoes"
        >
          Lista tomatoes
        </Link>
      </div>
  
      <Calendar
        className="m-4 sm:m-8 mb-0 p-4 sm:p-6 bg-white rounded-lg shadow-lg"
        localizer={localizer}
        culture="it"
        messages={messages}
        events={events}
        views={[Views.MONTH, Views.WEEK, Views.DAY]}
        defaultView={view as any}
        view={view as any}
        date={navigateDate}
        getNow={() => date}
        scrollToTime={new Date()}
        onView={(newView) => setView(newView)}
        onNavigate={(newDate: Date) => setNavigateDate(newDate)}
        onSelectEvent={handleEventClick}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "60vh", maxHeight: "80vh" }}
        aria-label="Calendario eventi"
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

      <TomatoCreateModal
        isOpen={tomatoCreateModalOpen}
        onClose={handleCloseTomatoCreateModal}
        onAdd={handleAddEvent}
      />

      <ActivityEventModal
        isOpen={activityModalOpen}
        activity={selectedActivity}
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

      <TomatoEventModal
        isOpen={tomatoModalOpen}
        Tomato={selectedTomato}
        onClose={handleTomatoCloseModal}
        onDelete={handleDeleteEvent}
        onUpdate={handleUpdateEvent}
      />
    </div>
  );
}