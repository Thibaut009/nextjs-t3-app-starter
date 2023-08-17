import Header from "~/components/header";
import Navbar from "~/components/navbar"
import News from "~/components/news";
import { GetSessionParams, getSession } from 'next-auth/react';

export default function NewsPage() {
  return (
    <main>
      <Header />
      <News />
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