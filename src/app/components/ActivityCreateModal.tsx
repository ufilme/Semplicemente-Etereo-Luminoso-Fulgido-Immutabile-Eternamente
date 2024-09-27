"use client"
import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { ActivityState } from "../type";

interface ActivityCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (activity: ActivityState) => void;
}

const ActivityCreateModal: React.FC<ActivityCreateModalProps> = ({ isOpen, onClose, onAdd }) => {
  const now = new Date();
  const later = new Date();
  now.setSeconds(0);
  later.setSeconds(0);
  later.setHours(later.getHours() + 1);

  const [newActivity, setNewActivity] = useState({
    title: "",
    start: now,
    end: later,
    id: "",
    completed: false,
    notifyState: -1,
  });

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "end") {
      const datePart = new Date(value);
      const timePart = newActivity[name];
      if (timePart) {
        datePart.setHours(timePart.getHours());
        datePart.setMinutes(timePart.getMinutes());
      }
      const start = new Date(datePart);
      start.setHours(timePart.getHours() - 1);
      start.setMinutes(timePart.getMinutes());

      setNewActivity({ ...newActivity, [name]: datePart, ["start"]: start });
    }
    else if (name === "endTime") {
      const [hours, minutes] = value.split(":").map(Number);
      const datePart = newActivity["end"];
      if (datePart) {
        datePart.setHours(hours);
        datePart.setMinutes(minutes);

        const start = new Date(datePart);
        start.setHours(start.getHours() - 1);
        start.setMinutes(start.getMinutes());

        setNewActivity({ ...newActivity, ["end"]: datePart, ["start"]: start });
      }
    }
    else {
      setNewActivity({ ...newActivity, [name]: value });
    }
  };

  const handleSave = () => {
    const activityToAdd = newActivity;

    if (!activityToAdd.title) {
      alert("Inserire titolo!");
      return;
    }
    if (!activityToAdd.end) {
      alert("Inserire scadenza!");
      return;
    }
    activityToAdd.id = crypto.randomUUID();

    onAdd(activityToAdd);
    onClose();

    // Resetta newActivity per un nuovo inserimento
    const now = new Date();
    const later = new Date();
    later.setHours(later.getHours() + 1);
    setNewActivity({
      title: "",
      start: now,
      end: later,
      id: "",
      completed: false,
      notifyState: -1,
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

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md sm:max-w-lg lg:max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Crea Nuova Attività</h2>
        <input
          type="text"
          name="title"
          value={newActivity.title}
          onChange={handleInputChange}
          className="border rounded mb-2 p-1 w-full"
          placeholder="Titolo"
        />
        <input
          type="date"
          name="end"
          value={formatDate(newActivity.end)}
          onChange={handleInputChange}
          className="border rounded mb-2 p-1 w-full"
        />
        <input
          type="time"
          name="endTime"
          value={formatTime(newActivity.end)}
          onChange={handleInputChange}
          className="border rounded mb-2 p-1 w-full"
        />

        <div className="flex justify-end mt-4 space-x-2">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
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

export default ActivityCreateModal;
