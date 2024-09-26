import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast";

async function checkDeadlines(activities, events, date, myToast){
  console.log("checkDeadlines - " + new Date(date));
  
  const nowDate = new Date(date);
  const hourDate = new Date();
  nowDate.setHours(hourDate.getHours());
  nowDate.setMinutes(hourDate.getMinutes());

  const actNotifyTimes = [0, 24, 48, 168]; // in ore
  const MS_IN_HR = 1000 * 3600;
  let notifyLevel = -1;

  let expiredActivities = activities.filter(act => {
    const actEndDate = new Date(act.end);
    return !act.completed && nowDate.getTime() >= actEndDate.getTime();
  });

  console.log("Att. scadute: ");
  console.log(expiredActivities);
  
  for (let eact of expiredActivities) {
    const actEndDate = new Date(eact.end);
  
    for (let i = actNotifyTimes.length - 1; i >= 0; i--) {
      if (nowDate.getTime() - actEndDate.getTime() >= actNotifyTimes[i] * MS_IN_HR) {
        notifyLevel = i;
        break;
      }
    }
  
    if (notifyLevel > eact.notifyState) {
        console.log("Notifica");
      const message = "Attività scaduta: \"" + eact.title + "\"";
      myToast(message, notifyLevel);
        
      try {
        const response = await fetch('/api/data/activities', {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...eact,
            notifyState: notifyLevel,
          }),
        });

        if (!response.ok) {
          console.error('Errore aggiornamento attività');
        }
      } catch (error) {
        console.error('Errore nel fetch:', error);
      }
    }
  }
  
  events.forEach(evt => {
    for (let i = 0; i < evt.advanceRepCount; i++) {
      let notifyDate = new Date(evt.start);
      notifyDate.setMinutes(notifyDate.getMinutes() - evt.advanceTime * (i + 1));

      if (Math.abs(notifyDate.getTime() - new Date().getTime()) <= 1000) {
        const message = "\"" + evt.title + "\" il giorno " + formatDate(evt.start);
        myToast(message, -1);
      }
    }
  });
  
}

export function Notifications({date}) {
  const [events, setEvents] = useState([])
  const [activities, setActivities] = useState([])
  const [fetched, setFetched] = useState(false)
  const [checked, setChecked] = useState(false)

  function myToast (message, notifyLevel) {
    let bgcolor: string;
    switch (notifyLevel) {
      case 1:
        bgcolor = "bg-yellow-300";
        break;
      case 2:
        bgcolor = "bg-orange-400";
        break;
      case 3:
        bgcolor = "bg-red-600";
        break;
      default:
        bgcolor = "bg-white";
        break;
    }
  
    toast((t) => (
      <span className={bgcolor + " flex gap-2 p-1"}>
        {message}
        <button className="bg-slate-200 hover:bg-slate-400 rounded px-1" onClick={() => toast.dismiss(t.id)}>Chiudi</button>
      </span>
    ), { duration: 10000 });
  }

  useEffect(() => {
    let evts = events;
    let acts = activities;
      const interval = setInterval(() => {
        console.log("Fetching...");
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
      fetch('/api/data/events').then(r => r.json()).then(data => {
        setEvents(data.data.map((d) => {
          return {
            ...d,
            start: new Date(d.start),
            end: new Date(d.end)
          }
        }))
        setFetched(true)
        
        console.log("Fetched, activities:");
        console.log(activities);
      }
      ).catch((e) => {
        console.log(e)
      })
        console.log("###################################");
        const now = new Date(date);
        checkDeadlines(activities, events, now, myToast);
      }, 2000);
      
      return () => clearInterval(interval);
  })


  return (<></>);
}
  

function formatDate (date: Date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = String(date.getMinutes()).padStart(2, "0");;
    let formattedDate = year + "/" + month + "/" + day + ", " + hours + ":" + minutes;
    return formattedDate;
}