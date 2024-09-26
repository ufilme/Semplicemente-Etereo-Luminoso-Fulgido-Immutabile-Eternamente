"use client";

import Link from "next/link";
import React from "react";
import TomatoCreateModal from "@/app/components/TomatoCreateModal";

import TomatoItem from "@/app/components/TomatoItem";
import "@/app/global.css";
import { useState, useEffect } from "react";

export default function Attivita() {
  const [tomato, setTomato] = useState([]);
  const [fetched, setFetched] = useState(false)
  
  const [tomatoCreateModalOpen, setTomatoCreateModalOpen] = useState(false);

  useEffect(() => {
    if (!fetched){
      setFetched(true)
      fetch('/api/data/tomatoes').then(r => r.json()).then(data => {
          setTomato(data.data.map((d) => {
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
    }
  }, [fetched])

  const deleteEvent = async (event) => {
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
          `/api/data/activity?id=${event.id}`,
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

  function handleDeleteTomato(tomatoToDelete: { title: string; start: Date | null; end: Date | null; id: string; completed: boolean }) {
    console.log("Eliminazione in corso");
    // setEvents(events.filter(event => event.id !== eventToDelete.id));
    deleteEvent(tomatoToDelete)
    setFetched(false)
  }

  const updateTomato = async (tomato) => {
    if (Object.hasOwn(tomato, 'tStudio')) {
      try {
        const response = await fetch(
          '/api/data/tomatoes',
          {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tomato),
          }
        );
        if (!response.ok) {
          // console.log(await response.json())
        }
      } catch {}
    } else if (Object.hasOwn(tomato, 'completed')) {
      try {
        const response = await fetch(
          '/api/data/activity',
          {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tomato),
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
            body: JSON.stringify(tomato),
          }
        );
        if (!response.ok) {
          // console.log(await response.json())
        }
      } catch {}
    }
  }

  // Funzione per aggiornare un evento esistente
  function handleUpdateTomato(updatedTomato: { title: string; start: Date | null; end: Date | null; allDay: boolean; location: string; id: string; repetitionEvery: number; repetitionCount: number } | { title: string; start: Date | null; end: Date | null; id: string; completed: string }) {
    // setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event));
    updateTomato(updatedTomato)
    setFetched(false)
  }

  const addTomato= async (tomato : {
    tStudio: Number,
                                            tPausa: Number,
                                            nCicli: Number,
                              title: string,
                              start: Date | null,
                              end: Date | null,
                              id: string,
                              completed: boolean
                            }) => {
    try {
      const response = await fetch(
        '/api/data/tomatoes',
        {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(tomato),
        }
      );
      if (!response.ok) {
        // console.log(await response.json())
      }
    } catch {}
  }

  function handleAddTomato(newTomato : {
    tStudio: Number,
                                            tPausa: Number,
                                            nCicli: Number,
                              title: string,
                              start: Date | null,
                              end: Date | null,
                              id: string,
                              completed: boolean
                            }) {
    addTomato(newTomato)

    setFetched(false)
  }

  return (
    <div className="flex flex-col items-center gap-4 min-h-[92vh] bg-amber-600">
      <h1 className="pt-6 text-center text-4xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
        Tomato
      </h1>

      <div className="tomato-container mx-2 mt-4 grid gap-2 justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {tomato &&
          tomato.map((tomato) => (
            <TomatoItem
              Tomato={tomato}
              key={tomato.id}
              onDelete={handleDeleteTomato}
              onUpdate={handleUpdateTomato}
            />
          ))}
      </div>

      <button
        onClick={() => setTomatoCreateModalOpen(true)}
        className="text-lg text-white rounded-lg px-2 py-1 bg-blue-500 hover:bg-blue-800"
      >
        Aggiungi tomato
      </button>
  
      <TomatoCreateModal
        isOpen={tomatoCreateModalOpen}
        onClose={() => setTomatoCreateModalOpen(false)}
        onAdd={handleAddTomato}
      />
    </div>
  );   
}