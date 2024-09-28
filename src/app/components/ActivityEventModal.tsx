"use client"
import React, { useState, useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { ActivityState } from "../type";

interface ActivityModalProps {
  isOpen: boolean;
  activity: ActivityState | null;
  onClose: () => void;
  onDelete: (activity: ActivityState) => void;
  onUpdate: (updatedActivity: ActivityState) => void;
}

const ActivityModal: React.FC<ActivityModalProps> = ({ isOpen, activity, onClose, onDelete, onUpdate }) => {
  const [editableActivity, setEditableActivity] = useState(activity);

  useEffect(() => {
    if (activity) {
      setEditableActivity(activity);
    }
  }, [activity]);

  if (!isOpen || !editableActivity) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setEditableActivity({
      ...editableActivity,
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
    const activityToSave = editableActivity;

    if (!activityToSave.title) {
      alert("Il titolo non può essere vuoto!");
      return;
    }
    if (!activityToSave.end) {
      alert("Inserire scadenza!");
      return;
    }
    onUpdate(activityToSave); // Chiama la funzione di aggiornamento con l'attività modificata
  };

  return (
    isOpen && (
      <div
        className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
        role="dialog"
        aria-modal="true"
        aria-labelledby="activity-modal-title"
        tabIndex={-1}
      >
        <div className="bg-white p-6 rounded shadow-lg w-full max-w-md sm:max-w-lg lg:max-w-2xl">
          <h2 id="activity-modal-title" className="text-2xl font-bold mb-4">
            Modifica Attività
          </h2>
  
          <label htmlFor="activity-title" className="sr-only">
            Titolo
          </label>
          <input
            id="activity-title"
            type="text"
            name="title"
            value={editableActivity.title}
            onChange={handleInputChange}
            className="border rounded mb-2 p-1 w-full"
            placeholder="Titolo"
          />
  
          <label htmlFor="activity-end-date" className="sr-only">
            Data di Fine
          </label>
          <input
            id="activity-end-date"
            type="date"
            name="end"
            value={formatDate(editableActivity.end)}
            onChange={(e) => {
              const timePart = editableActivity["end"];
              const newEnd = new Date(e.target.value);
              newEnd.setHours(timePart!.getHours());
              newEnd.setMinutes(timePart!.getMinutes());
  
              const start = new Date(newEnd);
              start.setHours(start!.getHours() - 1);
              start.setMinutes(start!.getMinutes());
  
              setEditableActivity({ ...editableActivity, end: newEnd, start: start });
            }}
            className="border rounded mb-2 p-1 w-full"
          />
  
          <label htmlFor="activity-end-time" className="sr-only">
            Ora di Fine
          </label>
          <input
            id="activity-end-time"
            type="time"
            name="endTime"
            value={formatTime(editableActivity.end)}
            onChange={(e) => {
              const [hours, minutes] = e.target.value.split(":").map(Number);
              const newEnd = new Date(editableActivity.end!);
              newEnd.setHours(hours);
              newEnd.setMinutes(minutes);
  
              const start = new Date(newEnd);
              start.setHours(start.getHours() - 1);
              start.setMinutes(start.getMinutes());
  
              setEditableActivity({ ...editableActivity, end: newEnd, start: start });
            }}
            className="border rounded mb-2 p-1 w-full"
          />
  
          <div className="mb-4">
            <label className="mr-2">Completata:</label>
            <input
              type="checkbox"
              name="completed"
              checked={editableActivity.completed}
              onChange={handleInputChange}
              aria-checked={editableActivity.completed}
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
              onClick={() => onDelete(editableActivity)}
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

export default ActivityModal;
