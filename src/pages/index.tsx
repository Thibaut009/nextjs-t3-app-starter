import Header from "~/components/header";
import Navbar from "~/components/navbar"
import Home from "~/components/home";

export default function IndexPage() {
  return (
    <main>
      <Header />
      <Home />
      <Navbar />
    </main>
  );
}
