import Header from "~/components/header";
import Navbar from "~/components/navbar";
import Portfolio from "~/components/portfolio";

export default function PortfolioPage() {
  return (
    <main className="bg-gradient-to-b from-[#2e026d] to-[#15162c] min-h-screen">
      <Header />
      <Navbar>
        <Portfolio />
      </Navbar>
    </main>
  );
}
