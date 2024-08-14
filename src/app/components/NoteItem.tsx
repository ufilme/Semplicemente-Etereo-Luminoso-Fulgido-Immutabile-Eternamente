import Link from "next/link";
import note from "@/app/note/notes";

export default function NoteItem(props: { nota:  {
                                            id: string,
                                            title: string
                                            body: string
                                            date: Date
                                          }}) {
                                    
  let title = props.nota.title;
  let body = props.nota.body;
  let id = props.nota.id;
  let year = props.nota.date.getFullYear();
  let month = props.nota.date.getMonth() + 1;
  let day = props.nota.date.getDate();
  let hours = props.nota.date.getHours();
  let minutes = String(props.nota.date.getMinutes()).padStart(2, "0");;
  let editDate = year + "/" + month + "/" + day + ", " + hours + ":" + minutes;

  return (
    <div className="notes-item relative rounded-xl bg-lime-500 p-2">
      <h4 className="text-lg font-semibold">{title.length > 25 ? title.substring(0, 25) + "..." : title}</h4>
      <p className="text-base">{body.length > 60 ? body.substring(0, 60) + "..." : body}</p>
      <p className="text-sm mt-1 mb-8 text-slate-700">{editDate}</p>
      <div className="absolute bottom-0 flex gap-1">
        <Link href={"/note/" + id} className="text-sm text-white mb-2 rounded px-1 bg-slate-500 hover:bg-slate-700" >Modifica</Link>
        <button onClick={() => null} className="text-sm text-white mb-2 rounded px-1 bg-red-700 hover:bg-red-900" >Elimina</button>
      </div>
    </div>
  )
}