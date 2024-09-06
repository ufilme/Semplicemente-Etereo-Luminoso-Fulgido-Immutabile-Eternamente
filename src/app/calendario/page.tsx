"use client";

import "../global.css";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import { startOfWeek, getDay } from "date-fns";
//import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useState } from "react";
import { it } from "date-fns/locale";
import EventCreateModal from "@/app/components/EventCreateModal";
import EventModal from "@/app/components/EventModal"; // Importa il componente del modal

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

// Eventi di esempio
let dummy_events: {
  title: string;
  start: Date | null;
  end: Date | null;
  allDay: boolean;
  id: string;
}[];

dummy_events = [
  {
    title: "Team Meeting",
    start: new Date(2024, 7, 30, 10, 0), // 30 Agosto 2024, 10:00
    end: new Date(2024, 7, 30, 11, 0), // 30 Agosto 2024, 11:00
    allDay: false,
    id: "de8c0c9c-c9ba-4046-9b4f-b8b0e7504af8",
  },
  {
    title: "Project Deadline",
    start: new Date(2024, 7, 31, 17, 0), // 31 Agosto 2024, 17:00
    end: new Date(2024, 7, 31, 18, 0), // 31 Agosto 2024, 18:00
    allDay: false,
    id: "71b29ee7-373f-494d-9081-41d70876a565",
  },
  {
    title: "Client Call",
    start: new Date(2024, 7, 5, 14, 0), // 5 Agosto 2024, 14:00
    end: new Date(2024, 7, 6, 15, 0), // 6 Agosto 2024, 15:00
    allDay: false,
    id: "e69e9448-766c-4fbe-b49a-988ff493c025",
  },
  {
    title: "Company Workshop",
    start: new Date(2024, 7, 2, 9, 0), // 2 Agosto 2024, 09:00
    end: new Date(2024, 7, 2, 12, 0), // 2 Agosto 2024, 12:00
    allDay: false,
    id: "f4100c25-c0dd-4d50-8c15-8ff887060edb",
  },
  {
    title: "Holiday",
    start: new Date(2024, 7, 3), // 3 Agosto 2024, tutto il giorno
    end: new Date(2024, 7, 3), // 3 Agosto 2024, tutto il giorno
    allDay: true,
    id: "b772b347-e524-4829-85ef-645570a08c96",
  },
];

export default function MyCalendar() {
  /*const [newEvent, setNewEvent] = useState<{
    title: string;
    start: Date | null;
    end: Date | null;
    allDay: boolean;
    id: string;
  }>({ title: "", start: new Date(), end: new Date(), allDay: false, id: "" });*/
  const [events, setEvents] = useState(dummy_events);
  const [selectedEvent, setSelectedEvent] = useState<{ title: string; start: Date | null; end: Date | null; allDay: boolean; id: string } | null>(null);
  const [eventCreateModalOpen, setEventCreateModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [view, setView] = useState<
    typeof Views.DAY | typeof Views.WEEK | typeof Views.WORK_WEEK | typeof Views.MONTH | typeof Views.AGENDA
  >(Views.WEEK);
  const [date, setDate] = useState(new Date());

  function handleAddEvent(newEvent: { title: string; start: Date | null; end: Date | null; allDay: boolean; id: string }) {
    /*if (!newEvent.title) {
      alert("Inserire titolo!");
      return;
    }

    if (newEvent.start && newEvent.end && newEvent.end < newEvent.start) {
      alert("La data e ora di fine non può essere antecedente a quella di inizio!");
      return;
    }*/

    //setNewEvent({ ...newEvent, id: crypto.randomUUID() });
    newEvent.id = crypto.randomUUID();
    setEvents([...events, newEvent]);

    handleCloseEventCreateModal();
  }

  /*
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    if (name === "start" || name === "end") {
      const datePart = new Date(value);
      const timePart = newEvent[name as "start" | "end"];

      if (timePart) {
        datePart.setHours(timePart.getHours());
        datePart.setMinutes(timePart.getMinutes());
      }

      setNewEvent({ ...newEvent, [name]: datePart });
    } else if (name === "startTime" || name === "endTime") {
      const [hours, minutes] = value.split(":").map(Number);
      const datePart = newEvent[name === "startTime" ? "start" : "end"];

      if (datePart) {
        datePart.setHours(hours);
        datePart.setMinutes(minutes);

        if (name === "endTime" && newEvent.start && datePart < newEvent.start) {
          alert("L'orario di fine non può essere antecedente all'orario di inizio!");
          return;
        }

        setNewEvent({ ...newEvent, [name === "startTime" ? "start" : "end"]: datePart });
      }
    } else {
      setNewEvent({ ...newEvent, [name]: value });
    }
  }
  */

  // Funzione per gestire l'apertura del modal
  function handleEventClick(event: { title: string; start: Date | null; end: Date | null; allDay: boolean; id: string }) {
    setSelectedEvent(event);
    setModalOpen(true);
  }

  function handleCloseEventCreateModal() {
    setEventCreateModalOpen(false);
  }

  // Funzione per chiudere il modal
  function handleCloseModal() {
    setModalOpen(false);
    setSelectedEvent(null);
  }

  // Funzione per eliminare l'evento selezionato
  function handleDeleteEvent(eventToDelete: { title: string; start: Date | null; end: Date | null; allDay: boolean; id: string }) {
    console.log("Eliminazione in corso");
    setEvents(events.filter(event => event.id !== eventToDelete.id));
    handleCloseModal();
  }

  // Funzione per aggiornare un evento esistente
  function handleUpdateEvent(updatedEvent: { title: string; start: Date | null; end: Date | null; allDay: boolean; id: string }) {
    setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event));
    handleCloseModal();
  }

  // Funzione helper per formattare la data
  function formatDate(date: Date | null): string {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // Funzione helper per formattare l'ora
  function formatTime(date: Date | null): string {
    if (!date) return "";
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  return (
    <div className="min-h-[96vh] bg-amber-600">
      <h1 className="pt-6 text-center text-4xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
        Calendario
      </h1>

      <div className="text-center mt-4 mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setEventCreateModalOpen(true)}
        >
          Aggiungi Evento
        </button>
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
        scrollToTime={new Date()}
        onView={(view) => setView(view)}
        onNavigate={(date) => {
          setDate(new Date(date));
        }}
        onSelectEvent={handleEventClick} // Gestore del clic per gli eventi
        startAccessor="start"
        endAccessor="end"
        style={{ height: "70vh" }}
      />

      <EventCreateModal
        isOpen={eventCreateModalOpen}
        onClose={handleCloseEventCreateModal}
        onAdd={handleAddEvent} // Passa la funzione di aggiunta evento al modal
      />

      {/* Modal per visualizzare le informazioni dell'evento */}
      <EventModal
        isOpen={modalOpen}
        event={selectedEvent}
        onClose={handleCloseModal}
        onDelete={handleDeleteEvent} // Passa la funzione di eliminazione
        onUpdate={handleUpdateEvent} // Passa la funzione di aggiornamento al modal
      />
    </div>
  );
}