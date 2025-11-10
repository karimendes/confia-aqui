import Header from "../components/Header"
import Hero from "../components/Hero"
import CardTeste from "../components/CardTeste"
import FAQ from "../components/FAQ"

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
        <Hero/>
        <CardTeste />
        <FAQ />
    </div>
  )
}

export default Home