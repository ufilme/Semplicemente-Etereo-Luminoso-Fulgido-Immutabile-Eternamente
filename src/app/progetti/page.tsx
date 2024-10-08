"use client"
import "../global.css";

export default function Home() {
  return (
    <div className="min-h-[92vh] bg-teal-600">
      <h1 
        className="pt-6 text-center text-4xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
        aria-level={1}
        role="heading"
        tabIndex={0}
      >
        Progetti
      </h1>
    </div>
  );
}