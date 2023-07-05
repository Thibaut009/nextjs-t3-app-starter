import { useSession } from "next-auth/react";
import Header from "~/components/header";
import Home from "~/components/home";
import Navbar from "~/components/navbar";
import Profile from "~/components/profile";
import Post from "../components/post";
import CreatePostForm from "~/components/post/createPost";

export default function Index() {
  const { data: sessionData, status } = useSession();

  if (status != "authenticated") {
    return (
      <main>      
        <Header />
        <Home />
      </main>
    );
  } else {
    return (
      <main>
        <Header />
        <Navbar />
        <Profile />
        <Post />
        <CreatePostForm />
      </main>
    );
  }
}

