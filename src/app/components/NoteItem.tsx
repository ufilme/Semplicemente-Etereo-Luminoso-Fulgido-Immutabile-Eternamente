import Link from "next/link";
import { notes } from "@/app/note/notes";
import { IconContext } from "react-icons";
import { FaRegCopy } from "react-icons/fa";

export default function NoteItem(props: { note:  {
                                            id: string,
                                            title: string
                                            body: string
                                            category: string
                                            date_edit: Date
                                            date_create: Date
                                          }}) {

  let title = props.note.title;
  let body = props.note.body;
  let id = props.note.id;

  function formatDate (date: Date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = String(date.getMinutes()).padStart(2, "0");;
    let formattedDate = year + "/" + month + "/" + day + ", " + hours + ":" + minutes;
    return formattedDate;
  }  

  return (
    <div className="notes-item relative rounded-xl bg-lime-500 p-2">
      <div className="flex flex-row justify-between mb-2">
        <h5 className="text-sm text-white rounded px-1 bg-slate-900 w-fit">{props.note.category}</h5>
        <button onClick={() => {navigator.clipboard.writeText(body)}}>
        <IconContext.Provider value={{  }}>
            <FaRegCopy />
          </IconContext.Provider>
        </button>
      </div>
      <h4 className="text-lg font-semibold">{title.length > 25 ? title.substring(0, 25) + "..." : title}</h4>
      <p className="text-base">{body.length > 60 ? body.substring(0, 60) + "..." : body}</p>
      <p className="text-sm mt-1 text-slate-700">{"Modifica: " + formatDate(props.note.date_edit)}</p>
      <p className="text-sm mb-8 text-slate-700">{"Creazione: " + formatDate(props.note.date_create)}</p>
      <div className="absolute bottom-0 flex gap-1">
        <Link href={"/note/" + id} className="text-sm text-white mb-2 rounded px-1 bg-slate-500 hover:bg-slate-700" >Modifica</Link>
        <button onClick={() => null} className="text-sm text-white mb-2 rounded px-1 bg-red-700 hover:bg-red-900" >Elimina</button>
      </div>
    </div>
  )
}