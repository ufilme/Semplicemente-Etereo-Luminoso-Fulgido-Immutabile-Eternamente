import "../global.css";
import Timer from "@/app/components/Timer";

export default function Pomodoro() {
  return <div className="flex flex-col min-h-[92vh] bg-red-700">
      <h1 className="pt-10 text-center text-4xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Applicazione Pomodoro</h1>
      <div className="my-auto h-4/6 flex flex-col justify-center"><Timer /></div>
    </div>
}