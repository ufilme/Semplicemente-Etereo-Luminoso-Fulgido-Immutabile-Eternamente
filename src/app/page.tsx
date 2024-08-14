import { ViewPreview } from "@/app/components/ViewPreview";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const allUsers = await prisma.test.findMany();
  console.log(allUsers);
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export default function Home() {
  return (
    <div className="h-full">
      <h1 className="h-1/4 flex items-center justify-center text-4xl text-center font-bold text-gray-200 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
        Semplicemente Etereo Luminoso Fulgido Immutabile Eternamente
      </h1>
      <div className="home grid grid-cols-2 gap-4 pb-8 mx-8 h-3/4">
        <Link href="/calendario">
          <ViewPreview
            viewbg="bg-amber-500"
            hoverbg="hover:bg-amber-600"
            id="calendar"
            title="Calendario"
            p="Eventi di questa settimana"
          />
        </Link>
        <Link href="/note">
          <ViewPreview
            viewbg="bg-lime-500"
            hoverbg="hover:bg-lime-600"
            id="notes"
            title="Note"
            p="Ultima nota modificata"
          />
        </Link>
        <Link href="/pomodoro">
          <ViewPreview
            viewbg="bg-red-600"
            hoverbg="hover:bg-red-700"
            id="tomato"
            title="Pomodoro"
            p="Riepilogo ultima sessione"
          />
        </Link>
        <Link href="/progetti">
          <ViewPreview
            viewbg="bg-teal-500"
            hoverbg="hover:bg-teal-600"
            id="projects"
            title="Gestione progetti"
            p="Passa alla versione premium per sbloccare tutte le funzionalità"
          />
        </Link>
      </div>
    </div>
  );
}
