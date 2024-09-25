import React, { useState } from "react";
import { render } from "react-dom";
import { FaLocationDot } from "react-icons/fa6";

interface EventCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (event: { title: string; start: Date | null; end: Date | null; allDay: boolean; location: string; id: string; repetitionEvery: number; repetitionCount: number; }) => void;
}

const EventCreateModal: React.FC<EventCreateModalProps> = ({ isOpen, onClose, onAdd }) => {
  const now = new Date();
  const later = new Date();
  now.setSeconds(0);
  later.setSeconds(0);
  later.setHours(later.getHours() + 1);

  const [newEvent, setNewEvent] = useState({
    title: "",
    start: now,
    end: later,
    allDay: false,
    location: "",
    id: "",
    repetitionEvery: 7,
    repetitionCount: 1,
    advanceTime: 5,
    advanceRepCount: 0,
  });

  const [repeatEvent, setRepeatEvent] = useState(false); // Stato per controllare la ripetizione
  const [repeatEvery, setRepeatEvery] = useState(1); // Ogni quanti giorni o settimane ripetere
  const [repeatUnit, setRepeatUnit] = useState<"days" | "weeks">("weeks"); // Unità (giorni o settimane)
  const [repeatUntilDate, setRepeatUntilDate] = useState<Date | null>(null); // Data di fine ripetizione
  const [repeatOccurrences, setRepeatOccurrences] = useState<number>(1); // Numero di ripetizioni
  const [useOccurrences, setUseOccurrences] = useState(true); // Stato per scegliere tra numero di ripetizioni o data
  const [useNotify, setUseNotify] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "start" || name === "end") {
      const datePart = new Date(value);
      const timePart = newEvent[name as "start" | "end"];
      if (timePart) {
        datePart.setHours(timePart.getHours());
        datePart.setMinutes(timePart.getMinutes());
      }
      setNewEvent({ ...newEvent, [name]: datePart });
    }
    else if (name === "startTime" || name === "endTime") {
      const [hours, minutes] = value.split(":").map(Number);
      const datePart = newEvent[name === "startTime" ? "start" : "end"];
      if (datePart) {
        datePart.setHours(hours);
        datePart.setMinutes(minutes);
        setNewEvent({ ...newEvent, [name === "startTime" ? "start" : "end"]: datePart });
      }
    }
    else {
      setNewEvent({ ...newEvent, [name]: value });
    }
  };

  const calculateRepetitions = (startDate: Date, endDate: Date, repeatEvery: number): number => {
    // Calcola la differenza in millisecondi tra le due date
    endDate.setHours(0,0,0,0);
    startDate.setHours(0,0,0,0);
    const diffInMs = endDate.getTime() - startDate.getTime();
  
    // Converti la differenza in giorni
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  
    // Calcola il numero di ripetizioni come intero
    const repetitions = Math.floor(diffInDays / repeatEvery) + 1;
  
    console.log("Ripetizioni: " + repetitions);
    return repetitions;
  }

  const handleSave = () => {
    const eventToAdd = newEvent;

    if (!eventToAdd.title) {
      alert("Inserire titolo!");
      return;
    }
    if (!eventToAdd.start) {
      alert("Inserire inizio!");
      return;
    }
    if (!eventToAdd.allDay && !eventToAdd.end) {
      alert("Inserire fine!");
      return;
    }
    if (eventToAdd.allDay === true) {
      //set end date later than start date not to trigger end >= start check
      const endDate = new Date(newEvent.start);
      endDate.setHours(endDate.getHours() + 1);
      eventToAdd.end = endDate;
    }
    if (eventToAdd.start && eventToAdd.end && eventToAdd.end < eventToAdd.start) {
      alert("La data e ora di fine non può essere antecedente a quella di inizio!");
      return;
    }
    if (repeatEvent && !useOccurrences && repeatUntilDate === null){
      alert("Imposta una data di fine ripetizione!");
      return;
    }

    if (repeatEvent) {
      let frequency = repeatEvery;
      if (repeatUnit == "weeks")
        frequency = frequency * 7;

      let repeatN = repeatOccurrences;

      if (!useOccurrences) {
        repeatN = calculateRepetitions(eventToAdd.start, repeatUntilDate!, frequency);
      }

      eventToAdd.repetitionCount = repeatN;
      eventToAdd.repetitionEvery = frequency;
      //setNewEvent({ ...newEvent, repetitionCount: repeatN });
      //setNewEvent({ ...newEvent, repetitionEvery: frequency });
    }
    eventToAdd.id = crypto.randomUUID();

    onAdd(eventToAdd);
    onClose();

    // Resetta newEvent per un nuovo inserimento
    const now = new Date();
    const later = new Date();
    later.setHours(later.getHours() + 1);
    setNewEvent({
      title: "",
      start: now,
      end: later,
      allDay: false,
      location: "",
      id: "",
      repetitionEvery: 7,
      repetitionCount: 1,
      advanceTime: 5,
      advanceRepCount: 0,
    });

    // Resetta la ripetizione
    setRepeatEvent(false);
    setRepeatEvery(1);
    setRepeatUnit("weeks");
    setRepeatUntilDate(null);
    setRepeatOccurrences(1);
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
        {!newEvent.allDay && (
          <>
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
          </>
        )}
        <div className="flex items-center gap-2 mb-2">
          <FaLocationDot className="h-8"/>
          <input
            type="text"
            name="location"
            value={newEvent.location}
            onChange={handleInputChange}
            className="border rounded p-1 w-full"
            placeholder="Luogo"
          />
        </div>
        <div className="mb-2">
          <label className="mr-2">Tutto il giorno:</label>
          <input
            type="checkbox"
            name="allDay"
            checked={newEvent.allDay}
            onChange={(e) => setNewEvent({ ...newEvent, allDay: e.target.checked })}
          />
        </div>

        {/* Ripetizione Evento */}
        <div className="mb-4">
          <label className="mr-2">Ripetizione:</label>
          <input
            type="checkbox"
            checked={repeatEvent}
            onChange={(e) => setRepeatEvent(e.target.checked)}
          />
        </div>

        {repeatEvent && (
          <div className="mb-4">
            <label className="block mb-2">Ripeti ogni:</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                value={repeatEvery}
                onChange={(e) => setRepeatEvery(Number(e.target.value))}
                className="border rounded p-1 max-w-16"
              />
              <select
                value={repeatUnit}
                onChange={(e) => setRepeatUnit(e.target.value as "days" | "weeks")}
                className="border rounded p-1"
              >
                <option value="days">Giorni</option>
                <option value="weeks">Settimane</option>
              </select>
            </div>

            <div className="mt-4">
              <label className="block mb-2">Fino a:</label>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="repeatOption"
                  checked={useOccurrences}
                  onChange={() => setUseOccurrences(true)}
                />
                <label className="ml-2">Numero di occorrenze</label>
                <input
                  type="number"
                  min="1"
                  value={repeatOccurrences || ""}
                  onChange={(e) => setRepeatOccurrences(Number(e.target.value))}
                  disabled={!useOccurrences}
                  className="border rounded mb-2 p-1 ml-4"
                  style={{ width: "100px" }}
                />
              </div>

              <div className="flex items-center">
                <input
                  type="radio"
                  name="repeatOption"
                  checked={!useOccurrences}
                  onChange={() => setUseOccurrences(false)}
                />
                <label className="ml-2">Fino alla data</label>
                <input
                  type="date"
                  value={formatDate(repeatUntilDate)}
                  onChange={(e) => setRepeatUntilDate(new Date(e.target.value))}
                  disabled={useOccurrences}
                  className="border rounded mb-2 p-1 ml-4"
                />
              </div>
            </div>
          </div>
        )}

        <div className="mb-4">
          <label className="mr-2">Notifiche:</label>
          <input
            type="checkbox"
            checked={useNotify}
            onChange={(e) => {
              if (e.target.checked) {
                setNewEvent({ ...newEvent, advanceRepCount: 1})
              }
              else {
                setNewEvent({ ...newEvent, advanceRepCount: 0})
              }
              setUseNotify(e.target.checked)
            }}
          />
        </div>

        {useNotify && (
          <div>
            <div className="mb-4">
              <label className="block mb-2">Anticipo della notifica: </label>
              <input
                type="number"
                min="0"
                value={newEvent.advanceTime}
                onChange={(e) => setNewEvent({ ...newEvent, advanceTime: Number(e.target.value) })}
                className="border rounded p-1 w-full"
                placeholder="Minuti di anticipo"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Numero notifiche: </label>
              <input
                type="number"
                min="0"
                value={newEvent.advanceRepCount}
                onChange={(e) => setNewEvent({ ...newEvent, advanceRepCount: Number(e.target.value) })}
                className="border rounded p-1 w-full"
                placeholder="Numero di notifiche"
              />
            </div>
          </div>
        )}

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
