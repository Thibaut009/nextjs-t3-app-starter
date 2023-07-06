import { useState } from "react";
import { useSession } from "next-auth/react";
import Signout from "~/components/auth/signout";
import Signin from "~/components/auth/signin";
import Header from "~/components/header";
import Home from "~/components/home";
import Portfolio from "~/components/portfolio";
import Profile from "~/components/profile";

export default function Index() {
  const { data: sessionData, status } = useSession();
  const [activeComponent, setActiveComponent] = useState("home");

  const handleHomeClick = () => {
    setActiveComponent("home");
  };

  const handleProfileClick = () => {
    setActiveComponent("profile");
  };

  const handlePortfolioClick = () => {
    setActiveComponent("portfolio");
  };

  return (
    <main>
      <section className="flex min-h-screen">
        <div className="fixed bg-gray-800 text-white w-16 flex flex-col items-center justify-between h-full">
          <div className="flex flex-col items-center py-8">
            <h1 className="text-2xl">Logo</h1>
          </div>
          <div className="flex flex-col flex-grow items-center justify-center">
            <div className="flex flex-col items-center">
              <button
                className={`text-white hover:text-gray-300 ${
                  activeComponent === "home" ? "font-bold" : ""
                }`}
                onClick={handleHomeClick}
              >
                Home
              </button>
              <button
                className={`text-white hover:text-gray-300 ${
                  activeComponent === "portfolio" ? "font-bold" : ""
                }`}
                onClick={handlePortfolioClick}
              >
                Portfolio
              </button>
              {status === "authenticated" && (
                <button
                  className={`text-white hover:text-gray-300 ${
                    activeComponent === "profile" ? "font-bold" : ""
                  }`}
                  onClick={handleProfileClick}
                >
                  Profile
                </button>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center pb-8">
            {status === "authenticated" ? <Signout /> : <Signin />}
          </div>
        </div>

        <div className="flex flex-col flex-1 overflow-y-auto">
          <section className="bg-gradient-to-b from-[#2e026d] to-[#15162c] min-h-screen">
            <Header />
            {activeComponent === "home" && <Home />}
            {activeComponent === "profile" && <Profile />}
            {activeComponent === "portfolio" && <Portfolio />}
          </section>
        </div>
      </section>
    </main>
  );
}
