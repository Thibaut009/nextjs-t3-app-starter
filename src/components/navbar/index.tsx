import {signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: sessionData, status } = useSession();

  const handleSignOut = () => {
    signOut();
  };

  if (status === "authenticated" ) {
    return (
        <section className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
            <h1 className="text-2xl text-white">Navbar component</h1>
            <button
              className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
              onClick={handleSignOut}
            >
              Sign out
            </button>
        </section>
    );
  }
}


