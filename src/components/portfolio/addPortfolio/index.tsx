import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { api } from '~/utils/api';

export default function AddPortfolioForm() {
  const { data: sessionData, status } = useSession();
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const addPortfolio = api.portfolio.add.useMutation();

  // Utilisation de useQuery pour la requête getUserPortfolio
  const getUserPortfolioQuery = api.portfolio.getUserPortfolio.useQuery();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const response = await addPortfolio.mutateAsync({ title, url });
      console.log(response);

      setTitle('');
      setUrl('');

      // Mettre à jour les données du portfolio après la création ou la mise à jour
      getUserPortfolioQuery.refetch();
    } catch (error) {
      console.error(error);
    }
  };

  if (status === 'authenticated') {
    return (
      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 shadow-md w-80">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="url" className="block text-gray-700 text-sm font-bold mb-2">
            Url:
          </label>
          <input
            type="text"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Portfolio
          </button>
        </div>
      </form>
    );
  }
}
