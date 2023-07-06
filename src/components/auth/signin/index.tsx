import { signIn } from "next-auth/react";

export default function Signin() {

  const handleSignIn = () => {
    signIn();
  };

  return (
    <button
      className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
      onClick={handleSignIn}
    >
      Sign in
  </button>
  );
}
