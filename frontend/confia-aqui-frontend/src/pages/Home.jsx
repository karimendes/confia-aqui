import Header from "../components/ui/Header";
import Hero from "../components/home/Hero";
import CardTeste from "../components/home/CardTeste";
import FAQ from "../components/home/FAQ";
import ChatBot from "../components/chatbot/ChatBot";
import Footer from "../components/ui/Footer";
import CardGolpePresente from "../components/home/CardGolpePresente";
import UltimasNoticias from "../components/home/UltimasNoticias";

function Home() {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Header />
      <Hero />
      <CardGolpePresente />
      <CardTeste />

      <div className="max-w-5xl mx-auto">
        <UltimasNoticias />
      </div>
      <FAQ />
      <Footer />

      <div className="fixed bottom-4 right-4 z-50">
        <ChatBot />
      </div>
    </div>
  );
}

export default Home;