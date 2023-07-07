import { useSession } from "next-auth/react";
import Link from "next/link";
import Signout from "~/components/auth/signout";
import Signin from "~/components/auth/signin";

interface NavbarProps {
  children: React.ReactNode;
}

export default function Navbar({ children }: NavbarProps) {
  const { data: sessionData, status } = useSession();
  return (
    <section className="flex min-h-screen">
      <div className="fixed text-white bg-gray-800 w-52 flex flex-col items-center justify-between h-full">
        <div className="flex flex-col items-center py-8">
          <h1 className="text-2xl">Logo</h1>
        </div>
        <div className="flex flex-col flex-grow items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <Link href="/">Home</Link>
            <Link href="/portfolio">Portfolio</Link>
            {status === "authenticated" && <Link href="/profile">Profile</Link>}
          </div>
        </div>
        <div className="flex flex-col items-center pb-8">
          {status === "authenticated" ? <Signout /> : <Signin />}
        </div>
      </div>
      <div className="flex-grow ml-52">
        {children} {/* Affiche les composants enfants */}
      </div>
    </section>
  );
}
