import Header from "../components/Header"
import Hero from "../components/Hero"
import CardTeste from "../components/CardTeste"

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
        <Hero/>
        <CardTeste />
    </div>
  )
}

export default Home