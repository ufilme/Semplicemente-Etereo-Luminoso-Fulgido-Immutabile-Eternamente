"use client"
import React, { useState, useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { EventState } from "../type";

interface EventModalProps {
  isOpen: boolean;
  event: EventState | null;
  onClose: () => void;
  onDelete: (event: EventState) => void;
  onUpdate: (updatedEvent: EventState) => void;
}

const EventModal: React.FC<EventModalProps> = ({ isOpen, event, onClose, onDelete, onUpdate }) => {
  const [editableEvent, setEditableEvent] = useState(event);

  useEffect(() => {
    if (event) {
      setEditableEvent(event);
    }
  }, [event]);

  if (!isOpen || !editableEvent) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setEditableEvent({
      ...editableEvent,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatTime = (date: Date | null) => {
    if (!date) return "";
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const handleSave = () => {
    const eventToSave = editableEvent;

    if (!eventToSave.title) {
      alert("Il titolo non può essere vuoto!");
      return;
    }
    if (!eventToSave.start) {
      alert("Inserire inizio!");
      return;
    }
    if (!eventToSave.allDay && !eventToSave.end) {
      alert("Inserire fine!");
      return;
    }
    if (eventToSave.allDay === true) {
      //set end date later than start date not to trigger end >= start check
      const endDate = new Date(editableEvent.start!);
      endDate.setHours(endDate.getHours() + 1);
      eventToSave.end = endDate;
    }
    if (eventToSave.start && eventToSave.end && eventToSave.end < eventToSave.start) {
      alert("La data e ora di fine non può essere antecedente a quella di inizio!");
      return;
    }
    onUpdate(eventToSave); // Chiama la funzione di aggiornamento con l'evento modificato
  };

  return (
    isOpen && (
      <div
        className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-modal-title"
        tabIndex={-1}
      >
        <div className="bg-white p-6 rounded shadow-lg w-full max-w-md sm:max-w-lg lg:max-w-2xl max-h-[90vh] overflow-auto">
          <h2 id="event-modal-title" className="text-2xl font-bold mb-4">
            Modifica Evento
          </h2>
  
          <label htmlFor="event-title" className="sr-only">
            Titolo
          </label>
          <input
            id="event-title"
            type="text"
            name="title"
            value={editableEvent.title}
            onChange={handleInputChange}
            className="border rounded mb-2 p-1 w-full"
            placeholder="Titolo"
          />
  
          <label htmlFor="event-start-date" className="sr-only">
            Data di Inizio
          </label>
          <input
            id="event-start-date"
            type="date"
            name="start"
            value={formatDate(editableEvent.start)}
            onChange={(e) => {
              const timePart = editableEvent["start"];
              const newStart = new Date(e.target.value);
              newStart.setHours(timePart!.getHours());
              newStart.setMinutes(timePart!.getMinutes());
  
              setEditableEvent({ ...editableEvent, start: newStart });
            }}
            className="border rounded mb-2 p-1 w-full"
          />
  
          {!editableEvent.allDay && (
            <>
              <label htmlFor="event-start-time" className="sr-only">
                Ora di Inizio
              </label>
              <input
                id="event-start-time"
                type="time"
                name="startTime"
                value={formatTime(editableEvent.start)}
                onChange={(e) => {
                  const [hours, minutes] = e.target.value.split(":").map(Number);
                  const newStart = new Date(editableEvent.start!);
                  newStart.setHours(hours);
                  newStart.setMinutes(minutes);
  
                  setEditableEvent({ ...editableEvent, start: newStart });
                }}
                className="border rounded mb-2 p-1 w-full"
              />
  
              <label htmlFor="event-end-date" className="sr-only">
                Data di Fine
              </label>
              <input
                id="event-end-date"
                type="date"
                name="end"
                value={formatDate(editableEvent.end)}
                onChange={(e) => {
                  const timePart = editableEvent["end"];
                  const newEnd = new Date(e.target.value);
                  newEnd.setHours(timePart!.getHours());
                  newEnd.setMinutes(timePart!.getMinutes());
  
                  setEditableEvent({ ...editableEvent, end: newEnd });
                }}
                className="border rounded mb-2 p-1 w-full"
              />
  
              <label htmlFor="event-end-time" className="sr-only">
                Ora di Fine
              </label>
              <input
                id="event-end-time"
                type="time"
                name="endTime"
                value={formatTime(editableEvent.end)}
                onChange={(e) => {
                  const [hours, minutes] = e.target.value.split(":").map(Number);
                  const newEnd = new Date(editableEvent.end!);
                  newEnd.setHours(hours);
                  newEnd.setMinutes(minutes);
  
                  setEditableEvent({ ...editableEvent, end: newEnd });
                }}
                className="border rounded mb-2 p-1 w-full"
              />
            </>
          )}
  
          <div className="flex items-center gap-2 mb-2">
            <FaLocationDot className="h-8" aria-hidden="true" />
            <label htmlFor="event-location" className="sr-only">
              Luogo
            </label>
            <input
              id="event-location"
              type="text"
              name="location"
              value={editableEvent.location}
              onChange={handleInputChange}
              className="border rounded p-1 w-full"
              placeholder="Luogo"
            />
          </div>
  
          <div className="mb-4">
            <label htmlFor="event-all-day" className="mr-2">
              Tutto il giorno:
            </label>
            <input
              id="event-all-day"
              type="checkbox"
              name="allDay"
              checked={editableEvent.allDay}
              onChange={handleInputChange}
              aria-checked={editableEvent.allDay}
            />
          </div>
  
          <div className="flex justify-end mt-4 space-x-2">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleSave}
            >
              Salva
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => onDelete(editableEvent)}
            >
              Elimina
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={onClose}
            >
              Chiudi
            </button>
          </div>
        </div>
      </div>
    )
  );  
};

export default EventModal;
