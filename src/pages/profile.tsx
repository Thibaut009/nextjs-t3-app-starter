import Header from "~/components/header";
import Navbar from "~/components/navbar";
import Profile from "~/components/profile";
import { GetSessionParams, getSession } from 'next-auth/react';

export default function ProfilePage() {
  return (
    <main className="bg-gradient-to-b from-[#2e026d] to-[#15162c] min-h-screen">
      <Header />
      <Navbar>
        <Profile />
      </Navbar>
    </main>
  );
}

export async function getServerSideProps(context: GetSessionParams | undefined) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
