import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";

interface TomatoModalProps {
  isOpen: boolean;
  Tomato: { tStudio: number,
    tPausa: number,
    nCicli: number, title: string; start: Date | null; end: Date | null; id: string; completed: boolean } | null;
  onClose: () => void;
  onDelete: (Tomato: { tStudio: number,
    tPausa: number,
    nCicli: number,title: string; start: Date | null; end: Date | null; id: string; completed: boolean }) => void;
  onUpdate: (updatedTomato: { tStudio: number,
    tPausa: number,
    nCicli: number,title: string; start: Date | null; end: Date | null; id: string; completed: boolean }) => void;
}

const TomatoModal: React.FC<TomatoModalProps> = ({ isOpen, Tomato, onClose, onDelete, onUpdate }) => {
  const [editableTomato, setEditableTomato] = useState(Tomato);

  useEffect(() => {
    if (Tomato) {
      setEditableTomato(Tomato);
    }
  }, [Tomato]);

  if (!isOpen || !editableTomato) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setEditableTomato({
      ...editableTomato,
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
    const TomatoToSave = editableTomato;

    if (!TomatoToSave.title) {
      alert("Il titolo non può essere vuoto!");
      return;
    }
    if (!TomatoToSave.end) {
      alert("Inserire scadenza!");
      return;
    }
    onUpdate(TomatoToSave); // Chiama la funzione di aggiornamento con l'attività modificata
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md sm:max-w-lg lg:max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">Modifica Tomato</h2>
        <input
          type="text"
          name="title"
          value={editableTomato.title}
          onChange={handleInputChange}
          className="border rounded mb-2 p-1 w-full"
          placeholder="Titolo"
        />
        <input
          type="date"
          name="end"
          value={formatDate(editableTomato.end)}
          onChange={(e) => {
            const timePart = editableTomato["end"];

            const newEnd = new Date(e.target.value);
            newEnd.setHours(timePart!.getHours());
            newEnd.setMinutes(timePart!.getMinutes());

            const start = new Date(newEnd);
            start.setHours(start!.getHours() - 1);
            start.setMinutes(start!.getMinutes());

            setEditableTomato({ ...editableTomato, end: newEnd, start: start })
          }}
          className="border rounded mb-2 p-1 w-full"
        />
        <input
          type="time"
          name="endTime"
          value={formatTime(editableTomato.end)}
          onChange={(e) => {
            const [hours, minutes] = e.target.value.split(":").map(Number);
            const newEnd = new Date(editableTomato.end!);
            newEnd.setHours(hours);
            newEnd.setMinutes(minutes);

            const start = new Date(newEnd);
            start.setHours(start.getHours() - 1);
            start.setMinutes(start.getMinutes());

            setEditableTomato({ ...editableTomato, end: newEnd, start: start });
          }}
          className="border rounded mb-2 p-1 w-full"
        />
        <input
          type="number"
          name="tStudio"
          value={editableTomato.tStudio}
          onChange={handleInputChange}
          className="border rounded mb-2 p-1 w-full"
          placeholder="Titolo"
        />
        <input
          type="number"
          name="tPausa"
          value={editableTomato.tPausa}
          onChange={handleInputChange}
          className="border rounded mb-2 p-1 w-full"
          placeholder="Titolo"
        />
        <input
          type="number"
          name="nCicli"
          value={editableTomato.nCicli}
          onChange={handleInputChange}
          className="border rounded mb-2 p-1 w-full"
          placeholder="Titolo"
        />
        <div className="mb-4">
          <label className="mr-2">Completata:</label>
          <input
            type="checkbox"
            name="completed"
            checked={editableTomato.completed}
            onChange={handleInputChange}
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
            onClick={() => onDelete(editableTomato)}
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

export default TomatoModal;
