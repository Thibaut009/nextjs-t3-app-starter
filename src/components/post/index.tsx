import { useSession } from "next-auth/react";
import { api } from "~/utils/api";

export default function Post() {
  const { data: sessionData, status } = useSession();
  const allPost = api.post.getAll.useQuery();

  if (allPost.isLoading) {
    return <p>Loading...</p>;
  }

  if (allPost.error) {
    return <p>Error: {allPost.error.message}</p>;
  }

  if (status === "authenticated") {
    return (
      <section className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <h1 className="text-2xl text-white">Post component</h1>
        <p className="text-2xl text-white">{sessionData.user.email}</p>
        {allPost.data.map((post) => (
          <p key={post.id} className="text-2xl text-white">
            {post.title}
            {post.content}
          </p>
        ))}
      </section>
    );
  }
}
