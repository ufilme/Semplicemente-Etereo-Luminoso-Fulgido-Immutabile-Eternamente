import Link from "next/link";
import { BsClipboard2CheckFill } from "react-icons/bs";
import { BsClipboard2XFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import TomatoEventModal from "@/app/components/TomatoEventModal";
import { useState } from "react";

export default function TomatoItem(props: { onUpdate: (tom:  { tStudio: number,
  tPausa: number,
  nCicli: number, id: string, title: string, start: Date | null, end: Date | null, completed: boolean }) => Promise<void>,
                                          onDelete: (tom:  { tStudio: number,
                                            tPausa: number,
                                            nCicli: number, id: string, title: string, start: Date | null, end: Date | null, completed: boolean }) => Promise<void>,
                                          Tomato:  {
                                            tStudio: number,
                                            tPausa: number,
                                            nCicli: number,
                                            title: string,
                                            id: string,
                                            start: Date,
                                            end: Date,
                                            completed: boolean
                                          }}) {

  const [TomatoModalOpen, setTomatoModalOpen] = useState(false);

  let title = props.Tomato.title;
  let id = props.Tomato.id;
  let start = new Date(props.Tomato.start);
  let end = new Date(props.Tomato.end);
  let completed = props.Tomato.completed;

  function formatDate (date: Date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = String(date.getMinutes()).padStart(2, "0");;
    let formattedDate = year + "/" + month + "/" + day + ", " + hours + ":" + minutes;
    return formattedDate;
  }

  function handleDeleteTomato (tomToDelete: {
    tStudio: number,
                                            tPausa: number,
                                            nCicli: number,
                                  title: string;
                                  start: Date | null;
                                  end: Date | null;
                                  id: string;
                                  completed: boolean;
                                }) {
    props.onDelete(tomToDelete);
    setTomatoModalOpen(false);
  }

  function handleUpdateTomato (tomToUpdate: {
    tStudio: number,
                                            tPausa: number,
                                            nCicli: number,
                                  title: string;
                                  start: Date | null;
                                  end: Date | null;
                                  id: string;
                                  completed: boolean;
                                }) {
    props.onUpdate(tomToUpdate);
    setTomatoModalOpen(false);
  }

  return (
    <div className="Tomato-item w-full sm:w-60 md:w-60 lg:w-60 xl:w-72 relative rounded-xl bg-blue-200 p-4 shadow-lg">
      <div className="flex flex-row justify-between items-center">
        <h4 className="text-lg font-semibold">
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
  
      <p className="text-sm mb-2 text-slate-700">
        {"Scadenza: " + formatDate(end)}
      </p>
  
      <div className="flex gap-1">
        <Link
          href={{pathname: "/pomodoro", query: {query: JSON.stringify(props.Tomato)}}}
          className="text-sm text-white rounded px-1 bg-green-500 hover:bg-green-700"
        >
          Studia
        </Link>
        <button
          onClick={() => setTomatoModalOpen(true)}
          className="text-sm text-white rounded px-1 bg-slate-500 hover:bg-slate-700"
        >
          Modifica
        </button>
        <button
          onClick={() => handleDeleteTomato(props.Tomato)}
          className="text-sm text-white rounded px-1 bg-red-700 hover:bg-red-900"
        >
          Elimina
        </button>
      </div>
  
      <TomatoEventModal
        isOpen={TomatoModalOpen}
        Tomato={props.Tomato}
        onClose={() => setTomatoModalOpen(false)}
        onDelete={handleDeleteTomato}
        onUpdate={handleUpdateTomato}
      />
    </div>
  );   
}