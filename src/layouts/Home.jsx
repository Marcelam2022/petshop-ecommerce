
import { useEffect } from "react";
import Main from "../components/Main";
import Header from "../components/Header";

function Home() {
  useEffect(() => {
    document.title = "🏠 Inicio - PetShop";
  }, []);

  return (
    <>
      <Header />
      <Main />
    </>
  );
}

export default Home;

