import Header from "~/components/header";
import Navbar from "~/components/navbar"
import Message from "~/components/message";
import { GetSessionParams, getSession } from 'next-auth/react';

export default function MessagePage() {
  return (
    <main>
      <Header />
      <Message />
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