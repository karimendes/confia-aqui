import Header from "../components/ui/Header";
import Hero from "../components/home/Hero";
import CardTeste from "../components/home/CardTeste";
import FAQ from "../components/home/FAQ";
import ChatBot from "../components/chatbot/ChatBot";
import Footer from "../components/ui/Footer";

function Home() {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Header />
      <Hero />
      <CardTeste />
      <FAQ />
      <Footer />

      <div className="fixed bottom-4 right-4 z-50">
        <ChatBot />
      </div>
    </div>
  );
}

export default Home;