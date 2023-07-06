import { signOut } from "next-auth/react";

export default function Signout() {

  const handleSignIn = () => {
    signOut();
  };

  return (
    <button
      className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
      onClick={handleSignIn}
    >
      Sign out
  </button>
  );
}
