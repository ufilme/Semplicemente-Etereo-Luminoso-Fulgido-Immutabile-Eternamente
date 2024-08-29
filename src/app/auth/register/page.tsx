"use client";
import "@/app/global.css";
import Script from 'next/script';

export default function AuthPage() {
  return (
    <>
  <div className="font-[sans-serif]">
    <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
      <div className="items-center gap-10 max-w-6xl w-full">
        <form className="max-w-md w-full" id="loginForm">
          <h3 className="text-white text-3xl font-extrabold mb-8">
            Firma sopra
          </h3>

          <div className="space-y-4">
            <div>
              <input
                id="input-username"
                name="username"
                type="text"
                required
                className="w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 "
                placeholder="Nome proprio di persona"
              />
            </div>
            <div>
              <input
                id="input-password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 "
                placeholder="Password propria di persona"
              />
            </div>
          </div>

          <div className="!mt-8">
            <button
              type="submit"
              className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            >
              REGISTRARE!!!
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <Script src="/scripts/register.js" />
  </>
  )
}
