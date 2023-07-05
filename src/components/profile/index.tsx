import { useSession } from "next-auth/react";

export default function Profile() {
  const { data: sessionData, status } = useSession();

  if (status === "authenticated") {
    return (
      <section className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <h1 className="text-2xl text-white">Post component</h1>
        <p className="text-2xl text-white">{sessionData.user.name}</p>
        <p className="text-2xl text-white">{sessionData.user.email}</p>
        {sessionData.user.image && <img src={sessionData.user.image} alt="User Image" />}
      </section>
    );
  }
}
