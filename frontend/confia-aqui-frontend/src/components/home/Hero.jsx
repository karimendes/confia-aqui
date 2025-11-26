import imagemHero from "../../images/imagemHero.png"

function Hero() {
  return (
    <section
  className="relative w-screen min-h-[70vh] md:min-h-[100vh] flex items-center justify-start px-8 pt-16 text-white" style={{backgroundImage: `url(${imagemHero})`, backgroundSize: "cover", backgroundPosition: "center"}}>

  <div className="relative text-start max-w-2xl px-4">
    <h2 className="text-4xl md:text-5xl font-bold mb-4">Passou por um golpe?</h2>
    <p className="text-xl font-normal mb-6">
      Denuncie diretamente nos canais oficiais e ajude as autoridades a combater fraudes com segurança e eficácia.
    </p>
    <a href="https://www.gov.br/pt-br/servicos/registrar-ocorrencia-policial-online" target="_blank" className="bg-azul hover:opacity-80 text-white hover:text-white px-7 py-4 rounded-2xl font-normal text-lg transition">
      Denunciar golpe
    </a>
  </div>
</section>

  )
}

export default Hero