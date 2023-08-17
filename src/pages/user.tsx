import Header from "~/components/header";
import Navbar from "~/components/navbar"
import User from "~/components/user";
import { GetSessionParams, getSession } from 'next-auth/react';

export default function UserPage() {
  return (
    <main>
      <Header />
      <User />
      <Navbar />
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