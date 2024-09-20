import Link from "next/link";
import { notes } from "@/app/note/notes";
import { IconContext } from "react-icons";
import { FaRegCopy } from "react-icons/fa";
import { marked } from 'marked';
import "@/app/notemarkdown.css";

export default function NoteItem(props: { onDuplicate: (note:  { id: string, title: string, body: string, category: string, date_edit: Date, date_create: Date, marked: boolean }) => Promise<void>,
                                          note:  {
                                            id: string,
                                            title: string
                                            body: string
                                            category: string
                                            date_edit: Date
                                            date_create: Date
                                            marked: boolean
                                          }}) {

  let title = props.note.title;
  let body = props.note.body;
  let id = props.note.id;
  let date_edit = new Date(props.note.date_edit);
  let date_create = new Date(props.note.date_create);

  function formatDate (date: Date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = String(date.getMinutes()).padStart(2, "0");;
    let formattedDate = year + "/" + month + "/" + day + ", " + hours + ":" + minutes;
    return formattedDate;
  }

  function markdown () {
    console.log(props.note);
    if (props.note.marked) {
      body = marked.parse(body);
      return <div className="text-base note-markdown" dangerouslySetInnerHTML={{ __html: body }}></div>
    }
    else {
      return <p className="text-base" >{body.length > 60 ? body.substring(0, 60) + "..." : body}</p>
    }
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
      {markdown()}
      <p className="text-sm mt-1 text-slate-700">{"Modifica: " + formatDate(date_edit)}</p>
      <p className="text-sm mb-8 text-slate-700">{"Creazione: " + formatDate(date_create)}</p>
      <div className="absolute bottom-0 flex gap-1">
        <Link href={"/note/" + id} className="text-sm text-white mb-2 rounded px-1 bg-slate-500 hover:bg-slate-700" >Modifica</Link>
        <button onClick={() => props.onDuplicate(props.note)} className="text-sm text-white mb-2 rounded px-1 bg-slate-500 hover:bg-slate-700" >Duplica</button>
        <button onClick={() => null} className="text-sm text-white mb-2 rounded px-1 bg-red-700 hover:bg-red-900" >Elimina</button>
      </div>
    </div>
  )
}