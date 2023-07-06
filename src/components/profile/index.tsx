import { useSession } from "next-auth/react";
import AddPortfolioForm from "../portfolio/addPortfolio";
import { api } from "~/utils/api";

export default function Profile() {
  const { data: sessionData, status } = useSession();
  const userPortfolio = api.portfolio.getUserPortfolio.useQuery();

  if (status === "authenticated") {
    return (
      <section className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <p className="text-2xl text-white">{sessionData.user.name}</p>
        <p className="text-2xl text-white">{sessionData.user.email}</p>
        {sessionData.user.image && (
          <div className="rounded-full overflow-hidden w-40 h-40">
            <img
              src={sessionData.user.image}
              alt="User Image"
              className="object-cover w-full h-full"
            />
          </div>
        )}
        {userPortfolio.isLoading && <p>Loading...</p>}
        {userPortfolio.error && <p>Error: {userPortfolio.error.message}</p>}
        {userPortfolio.data && (
          <div>
            <p className="text-2xl text-white">{userPortfolio.data.title}</p>
            <a href={userPortfolio.data.url} target="blank" className="text-2xl text-white">{userPortfolio.data.url}</a>
          </div>
        )}
        <AddPortfolioForm />
      </section>
    );
  }
}
