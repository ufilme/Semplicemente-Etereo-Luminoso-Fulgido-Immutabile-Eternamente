"use client"
import Link from "next/link";
import { BsClipboard2CheckFill } from "react-icons/bs";
import { BsClipboard2XFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import ActivityEventModal from "@/app/components/ActivityEventModal";
import { useState } from "react";
import { ActivityState } from "../type";

export default function ActivityItem(props: { onUpdate: (act:  ActivityState) => void,
                                          onDelete: (act:  ActivityState) => void,
                                          activity:  ActivityState}) {

  const [activityModalOpen, setActivityModalOpen] = useState(false);

  let title = props.activity.title;
  let id = props.activity.id;
  let start = new Date(props.activity.start);
  let end = new Date(props.activity.end);
  let completed = props.activity.completed;

  function formatDate (date: Date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = String(date.getMinutes()).padStart(2, "0");;
    let formattedDate = year + "/" + month + "/" + day + ", " + hours + ":" + minutes;
    return formattedDate;
  }

  function handleDeleteActivity (actToDelete: ActivityState) {
    props.onDelete(actToDelete);
    setActivityModalOpen(false);
  }

  function handleUpdateActivity (actToUpdate: ActivityState) {
    props.onUpdate(actToUpdate);
    setActivityModalOpen(false);
  }

  return (
    <div
      className="activity-item w-full sm:w-60 md:w-60 lg:w-60 xl:w-72 relative rounded-xl bg-blue-200 p-4 shadow-lg"
      role="article"
      aria-labelledby={`activity-${id}-title`}
      aria-describedby={`activity-${id}-description`}
    >
      <div className="flex flex-row justify-between items-center">
        <h4 id={`activity-${id}-title`} className="text-lg font-semibold">
          {title.length > 25 ? title.substring(0, 25) + "..." : title}
        </h4>
        <div className="text-sm">
          {completed ? (
            <IconContext.Provider value={{ color: "green" }}>
              <BsClipboard2CheckFill />
            </IconContext.Provider>
          ) : (
            <IconContext.Provider value={{ color: "red" }}>
              <BsClipboard2XFill />
            </IconContext.Provider>
          )}
        </div>
      </div>
  
      <p id={`activity-${id}-description`} className="text-sm mb-2 text-slate-700">
        {"Scadenza: " + formatDate(end)}
      </p>
  
      <div className="flex gap-1">
        <button
          onClick={() => setActivityModalOpen(true)}
          className="text-sm text-white rounded px-1 bg-slate-500 hover:bg-slate-700"
          aria-haspopup="dialog"
          aria-expanded={activityModalOpen}
        >
          Modifica
        </button>
        <button
          onClick={() => handleDeleteActivity(props.activity)}
          className="text-sm text-white rounded px-1 bg-red-700 hover:bg-red-900"
        >
          Elimina
        </button>
      </div>
  
      <ActivityEventModal
        isOpen={activityModalOpen}
        activity={props.activity}
        onClose={() => setActivityModalOpen(false)}
        onDelete={handleDeleteActivity}
        onUpdate={handleUpdateActivity}
      />
    </div>
  );
   
}