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
    <section className="flex min-h-screen flex-col items-center justify-center">
      {allPortfolio.data.map((portfolio) => (
        <div
          key={portfolio.id}
          className="rounded-lg bg-white p-4 max-w-md w-full mb-4"
        >
          {portfolio.user?.image && ( // Vérifier si l'utilisateur a une image
            <img
              src={portfolio.user.image}
              alt="User Image"
              className="w-10 h-10 rounded-full"
            />
          )}
          <p className="text-2xl text-gray-800">{portfolio.title}</p>
          <a
            href={portfolio.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {portfolio.url}
          </a>
          <p className="text-gray-600">User: {portfolio.user?.name}</p>
        </div>
      ))}
    </section>
  );
}
