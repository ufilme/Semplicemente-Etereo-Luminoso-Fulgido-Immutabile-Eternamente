"use client"
import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { TomatoState } from "../type";

interface TomatoCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (Tomato: TomatoState) => void;
}

const TomatoCreateModal: React.FC<TomatoCreateModalProps> = ({ isOpen, onClose, onAdd }) => {
  const now = new Date();
  const later = new Date();
  now.setSeconds(0);
  later.setSeconds(0);
  later.setHours(later.getHours() + 1);

  const [newTomato, setNewTomato] = useState({
    title: "",
    start: now,
    end: later,
    tStudio: 0,
    tPausa: 0,
    nCicli: 0,
    id: "",
    completed: false,
    notifyState: -1,
  });

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "end") {
      const datePart = new Date(value);
      const timePart = newTomato[name];
      if (timePart) {
        datePart.setHours(timePart.getHours());
        datePart.setMinutes(timePart.getMinutes());
      }
      const start = new Date(datePart);
      start.setHours(timePart.getHours() - 1);
      start.setMinutes(timePart.getMinutes());

      setNewTomato({ ...newTomato, [name]: datePart, ["start"]: start });
    }
    else if (name === "endTime") {
      const [hours, minutes] = value.split(":").map(Number);
      const datePart = newTomato["end"];
      if (datePart) {
        datePart.setHours(hours);
        datePart.setMinutes(minutes);

        const start = new Date(datePart);
        start.setHours(start.getHours() - 1);
        start.setMinutes(start.getMinutes());

        setNewTomato({ ...newTomato, ["end"]: datePart, ["start"]: start });
      }
    }
    else {
      setNewTomato({ ...newTomato, [name]: value });
    }
  };

  const handleSave = () => {
    const TomatoToAdd = newTomato;

    if (!TomatoToAdd.title) {
      alert("Inserire titolo!");
      return;
    }
    if (!TomatoToAdd.end) {
      alert("Inserire scadenza!");
      return;
    }
    TomatoToAdd.id = crypto.randomUUID();

    onAdd(TomatoToAdd);
    onClose();

    // Resetta newTomato per un nuovo inserimento
    const now = new Date();
    const later = new Date();
    later.setHours(later.getHours() + 1);
    setNewTomato({
      title: "",
      start: now,
      end: later,
      tStudio: 0,
                                            tPausa: 0,
                                            nCicli: 0,
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
    isOpen && (
      <div
        className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tomato-modal-title"
        tabIndex={-1}
      >
        <div className="bg-white p-6 rounded shadow-lg w-full max-w-md sm:max-w-lg lg:max-w-2xl">
          <h2 id="tomato-modal-title" className="text-2xl font-bold mb-4">
            Crea Nuovo Tomato
          </h2>
  
          <label htmlFor="tomato-title" className="sr-only">
            Titolo
          </label>
          <input
            id="tomato-title"
            type="text"
            name="title"
            value={newTomato.title}
            onChange={handleInputChange}
            className="border rounded mb-2 p-1 w-full"
            placeholder="Titolo"
          />
  
          <label htmlFor="tomato-end-date" className="sr-only">
            Data fine
          </label>
          <input
            id="tomato-end-date"
            type="date"
            name="end"
            value={formatDate(newTomato.end)}
            onChange={handleInputChange}
            className="border rounded mb-2 p-1 w-full"
          />
  
          <label htmlFor="tomato-end-time" className="sr-only">
            Ora fine
          </label>
          <input
            id="tomato-end-time"
            type="time"
            name="endTime"
            value={formatTime(newTomato.end)}
            onChange={handleInputChange}
            className="border rounded mb-2 p-1 w-full"
          />
  
          <label htmlFor="tomato-tStudio" className="sr-only">
            Tempo studio
          </label>
          <input
            id="tomato-tStudio"
            type="number"
            name="tStudio"
            value={newTomato.tStudio}
            onChange={handleInputChange}
            className="border rounded mb-2 p-1 w-full"
          />
  
          <label htmlFor="tomato-tPausa" className="sr-only">
            Tempo pausa
          </label>
          <input
            id="tomato-tPausa"
            type="number"
            name="tPausa"
            value={newTomato.tPausa}
            onChange={handleInputChange}
            className="border rounded mb-2 p-1 w-full"
          />
  
          <label htmlFor="tomato-nCicli" className="sr-only">
            Numero di cicli
          </label>
          <input
            id="tomato-nCicli"
            type="number"
            name="nCicli"
            value={newTomato.nCicli}
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
    )
  );
};

export default TomatoCreateModal;
