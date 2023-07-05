import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { api } from '~/utils/api';

export default function CreatePostForm() {
  const { data: sessionData, status } = useSession();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const createPost = api.post.create.useMutation();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const response = await createPost.mutateAsync({ title, content });
      console.log(response); // Faites quelque chose avec la réponse
      // Réinitialisez les valeurs du formulaire
      setTitle('');
      setContent('');
    } catch (error) {
      console.error(error);
    }
  };

  if (status === 'authenticated') {
    return (
      <section className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
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
            <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">
              Content:
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            ></textarea>
          </div>
          <div className="flex justify-center"> {/* Ajout de la classe flex justify-center pour centrer le bouton */}
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            >
              Create Post
            </button>
          </div>
        </form>
      </section>
    );
  }
}
