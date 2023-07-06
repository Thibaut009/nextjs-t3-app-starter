import { api } from "~/utils/api";

export default function Portfolio() {
  const allPortfolio = api.portfolio.getAll.useQuery();

  if (allPortfolio.isLoading) {
    return <p>Loading...</p>;
  }

  if (allPortfolio.error) {
    return <p>Error: {allPortfolio.error.message}</p>;
  }

  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      {allPortfolio.data.map((portfolio) => (
        <div key={portfolio.id} className="text-2xl text-white">
          <p>{portfolio.title}</p>
          <a href={portfolio.url} target="blank">{portfolio.url}</a>
          <p>User: {portfolio.user?.name}</p> {/* Affichage du nom de l'utilisateur */}
        </div>
      ))}
    </section>
  );
}
