import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        Bonjour, <br />
        ceci est un site en construction, il sera modifié en fonction de mon
        temps libre.
        <p>
          Pour l&apos;instant une seule demo:
          <Link href="game-of-life" className="pl-5 text-blue-200">
            Jeu de la vie
          </Link>
        </p>
      </div>
    </main>
  );
}
