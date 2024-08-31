import React, { useState } from "react";

interface EventCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (event: { title: string; start: Date | null; end: Date | null; allDay: boolean; id: string }) => void;
}

const EventCreateModal: React.FC<EventCreateModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: new Date(),
    end: new Date(),
    allDay: false,
    id: "",
  });

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
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
  };

  const handleSave = () => {
    if (!newEvent.title) {
      alert("Inserire titolo!");
      return;
    }

    if (newEvent.start && newEvent.end && newEvent.end < newEvent.start) {
      alert("La data e ora di fine non può essere antecedente a quella di inizio!");
      return;
    }

    setNewEvent({ ...newEvent, id: crypto.randomUUID() });
    onAdd(newEvent);
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

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Crea Nuovo Evento</h2>
        <input
          type="text"
          name="title"
          value={newEvent.title}
          onChange={handleInputChange}
          className="border rounded mb-2 p-1 w-full"
          placeholder="Titolo"
        />
        <input
          type="date"
          name="start"
          value={formatDate(newEvent.start)}
          onChange={handleInputChange}
          className="border rounded mb-2 p-1 w-full"
        />
        <input
          type="time"
          name="startTime"
          value={formatTime(newEvent.start)}
          onChange={handleInputChange}
          className="border rounded mb-2 p-1 w-full"
        />
        <input
          type="date"
          name="end"
          value={formatDate(newEvent.end)}
          onChange={handleInputChange}
          className="border rounded mb-2 p-1 w-full"
        />
        <input
          type="time"
          name="endTime"
          value={formatTime(newEvent.end)}
          onChange={handleInputChange}
          className="border rounded mb-2 p-1 w-full"
        />
        <div className="mb-4">
          <label className="mr-2">Tutto il giorno:</label>
          <input
            type="checkbox"
            name="allDay"
            checked={newEvent.allDay}
            onChange={(e) => setNewEvent({ ...newEvent, allDay: e.target.checked })}
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

export default EventCreateModal;
