import Header from "~/components/header";
import Navbar from "~/components/navbar"
import Home from "~/components/home";

export default function IndexPage() {
  return (
    <main className="bg-gradient-to-b from-[#2e026d] to-[#15162c] min-h-screen">
      <Header />
      <Navbar>
        <Home />
      </Navbar>
    </main>
  );
}
