import React, { useState, useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";

interface EventModalProps {
  isOpen: boolean;
  event: { title: string; start: Date | null; end: Date | null; allDay: boolean; location: string; id: string; repetitionEvery: number; repetitionCount: number; } | null;
  onClose: () => void;
  onDelete: (event: { title: string; start: Date | null; end: Date | null; allDay: boolean; location: string; id: string; repetitionEvery: number; repetitionCount: number; }) => void;
  onUpdate: (updatedEvent: { title: string; start: Date | null; end: Date | null; allDay: boolean; location: string; id: string; repetitionEvery: number; repetitionCount: number; }) => void;
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
    if (!editableEvent.title) {
      alert("Il titolo non può essere vuoto!");
      return;
    }
    onUpdate(editableEvent); // Chiama la funzione di aggiornamento con l'evento modificato
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Modifica Evento</h2>
        <input
          type="text"
          name="title"
          value={editableEvent.title}
          onChange={handleInputChange}
          className="border rounded mb-2 p-1 w-full"
          placeholder="Titolo"
        />
        <input
          type="date"
          name="start"
          value={formatDate(editableEvent.start)}
          onChange={(e) => setEditableEvent({ ...editableEvent, start: new Date(e.target.value) })}
          className="border rounded mb-2 p-1 w-full"
        />
        <input
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
        <input
          type="date"
          name="end"
          value={formatDate(editableEvent.end)}
          onChange={(e) => setEditableEvent({ ...editableEvent, end: new Date(e.target.value) })}
          className="border rounded mb-2 p-1 w-full"
        />
        <input
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
        <div className="flex items-center gap-2 mb-2">
          <FaLocationDot className="h-8"/>
          <input
            type="text"
            name="location"
            value={editableEvent.location}
            onChange={handleInputChange}
            className="border rounded p-1 w-full"
            placeholder="Luogo"
          />
        </div>
        <div className="mb-4">
          <label className="mr-2">Tutto il giorno:</label>
          <input
            type="checkbox"
            name="allDay"
            checked={editableEvent.allDay}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={handleSave}
          >
            Salva
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
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
  );
};

export default EventModal;
