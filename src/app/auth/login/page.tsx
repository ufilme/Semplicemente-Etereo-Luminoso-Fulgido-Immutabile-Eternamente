"use client";
import "@/app/global.css";
import Script from 'next/script';
import Link from "next/link";

export default function AuthPage() {
  return (
    <>
      <div className="font-[sans-serif]">
        <main className="min-h-[92vh] flex flex-col items-center justify-center py-6 px-4">
          <section className="items-center gap-10 max-w-6xl w-full mb-2">
            <form
              className="max-w-md w-full mb-2"
              id="loginForm"
              aria-labelledby="form-heading"
            >
              <h3
                id="form-heading"
                className="text-white text-3xl font-extrabold mb-8"
              >
                Firma dentro
              </h3>

              <div className="space-y-4">
                <div>
                  <label htmlFor="input-username" className="sr-only">
                    Nome proprio di persona
                  </label>
                  <input
                    id="input-username"
                    name="username"
                    type="text"
                    required
                    aria-required="true"
                    className="w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600"
                    placeholder="Nome proprio di persona"
                  />
                </div>

                <div>
                  <label htmlFor="input-password" className="sr-only">
                    Password propria di persona
                  </label>
                  <input
                    id="input-password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    aria-required="true"
                    className="w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600"
                    placeholder="Password propria di persona"
                  />
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  aria-label="Accedi al tuo account"
                >
                  ENTRARE!!!
                </button>
              </div>
            </form>

            <p className="text-white text-sm">
              Non hai un account?{" "}
              <Link href="/auth/register" className="text-sky-200 underline">
                Registrati
              </Link>
            </p>
          </section>
        </main>
      </div>
      <Script src="/scripts/login.js" />
    </>
  )
}
