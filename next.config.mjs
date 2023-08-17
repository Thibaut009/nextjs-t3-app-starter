/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  /**
   * If you have `experimental: { appDir: true }` set, then you must comment the below `i18n` config
   * out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },

  // Ajoutez la configuration PWA ici
  pwa: {
    dest: "public", // Le répertoire de sortie pour les fichiers du service worker
    register: true,
    skipWaiting: true,
    // disable: process.env.NODE_ENV === "development",
  },
  
};

export default config;
