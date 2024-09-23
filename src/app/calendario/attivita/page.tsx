"use client";

import Link from "next/link";
import React from "react";
import ActivityCreateModal from "@/app/components/ActivityCreateModal";

import ActivityItem from "@/app/components/ActivityItem";
import "@/app/global.css";
import { useState, useEffect } from "react";

export default function Attivita() {
  const [activities, setActivities] = useState([]);
  const [fetched, setFetched] = useState(false)
  
  const [activityCreateModalOpen, setActivityCreateModalOpen] = useState(false);

  useEffect(() => {
    if (!fetched){
      setFetched(true)
      fetch('/api/data/activities').then(r => r.json()).then(data => {
          setActivities(data.data.map((d) => {
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
    if (Object.hasOwn(event, 'completed')) {
      try {
        const response = await fetch(
          `/api/data/activities?id=${event.id}`,
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

  function handleDeleteActivity(activityToDelete: { title: string; start: Date | null; end: Date | null; id: string; completed: boolean }) {
    console.log("Eliminazione in corso");
    // setEvents(events.filter(event => event.id !== eventToDelete.id));
    deleteEvent(activityToDelete)
    setFetched(false)
  }

  const updateEvent = async (event) => {
    if (Object.hasOwn(event, 'completed')) {
      try {
        const response = await fetch(
          '/api/data/activities',
          {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(event),
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
            body: JSON.stringify(event),
          }
        );
        if (!response.ok) {
          // console.log(await response.json())
        }
      } catch {}
    }
  }

  // Funzione per aggiornare un evento esistente
  function handleUpdateActivity(updatedActivity: { title: string; start: Date | null; end: Date | null; allDay: boolean; location: string; id: string; repetitionEvery: number; repetitionCount: number } | { title: string; start: Date | null; end: Date | null; id: string; completed: string }) {
    // setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event));
    updateEvent(updatedActivity)
    setFetched(false)
  }

  const addActivity = async (activity : {
                              title: string,
                              start: Date | null,
                              end: Date | null,
                              id: string,
                              completed: boolean
                            }) => {
    try {
      const response = await fetch(
        '/api/data/activities',
        {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(activity),
        }
      );
      if (!response.ok) {
        // console.log(await response.json())
      }
    } catch {}
  }

  function handleAddActivity(newActivity : {
                              title: string,
                              start: Date | null,
                              end: Date | null,
                              id: string,
                              completed: boolean
                            }) {
    addActivity(newActivity)

    setFetched(false)
  }

  return (
    <div className="flex flex-col items-center gap-4 min-h-[92vh] bg-amber-600">
      <h1 className="pt-6 text-center text-4xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Attività</h1>
      
      <div className="activities-container mx-2 mt-4 flex flex-row gap-2 justify-items-center">
        {activities && activities.map((activity) => <ActivityItem activity={activity} key={activity.id} onDelete={handleDeleteActivity} onUpdate={handleUpdateActivity} />)}
      </div>

      <button onClick={() => setActivityCreateModalOpen(true)} className="text-lg text-white rounded-lg px-2 py-1 bg-blue-500 hover:bg-blue-800">Aggiungi attività</button>

      <ActivityCreateModal
        isOpen={activityCreateModalOpen}
        onClose={() => setActivityCreateModalOpen(false)}
        onAdd={handleAddActivity}
      />
    </div>
  )
}