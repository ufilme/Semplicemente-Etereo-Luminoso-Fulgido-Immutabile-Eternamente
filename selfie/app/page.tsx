import "./home.css";
import { ViewPreview } from "@/app/components/ViewPreview";

export default function Home() {
  return <div className="home">
      <ViewPreview id="calendar" title="Calendario" p="Eventi di questa settimana"/>
      <ViewPreview id="notes" title="Note" p="Ultima nota modificata"/>
      <ViewPreview id="tomato" title="Pomodoro" p="Riepilogo ultima sessione"/>
      <ViewPreview id="projects" title="Gestione progetti" p="Passa alla versione premium per sbloccare tutte le funzionalità"/>
    </div>;
}