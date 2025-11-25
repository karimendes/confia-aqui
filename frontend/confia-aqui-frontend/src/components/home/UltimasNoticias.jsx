function UltimasNoticias() {
  const noticias = [
    {
      titulo: "CNN Brasil — Golpe do Presente no WhatsApp",
      imagem: "/imagemteste.webp",
      descricao: "Alerta da CNN Brasil: golpistas usam a desculpa de um presente surpresa para roubar seus dados pelo WhatsApp",
      link: "https://www.cnnbrasil.com.br/nacional/especialista-alerta-sobre-golpe-do-presente-veja-cuidados/",
    },
    {
      titulo: "Record — Golpe do Falso Presente",
      imagem: "/imagemJornal.jpg",
      descricao: "Matéria Record mostra a tática de golpistas que usam um falso “presente” para enganar vítimas e aplicar cobranças indevidas.",
      link: "https://youtu.be/dv2TYZFpU4s?utm_source=chatgpt.com",
    },
    {
      titulo: "Reuters — Oferta falsa Cacau Show vira isca para golpe",
      imagem: "/imagemCacauShow.jpg",
      descricao: "Ovos de Páscoa da Cacau Show são usados em golpe",
      link: "https://www.reuters.com/fact-check/portugues/CBUZSCH3SFOYFMA4XQCWOACZPE-2024-03-13/?utm_source=chatgpt.com",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4 text-cinza-600 flex items-center gap-2">
        Últimas Notícias
        <span className="w-2 h-2 bg-red-600 inline-block rounded-sm"></span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {noticias.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border hover:shadow-md transition">
              <img
                src={item.imagem}
                alt={item.titulo}
                className="w-full h-40 object-cover"
              />

              <h3 className="font-semibold p-3 text-cinza-600 group-hover:text-cinza-500 leading-snug">
                {item.titulo}
              </h3>

              <p className="text-sm p-3 text-cinza-600 group-hover:text-cinza-500 leading-snug">{item.descricao}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default UltimasNoticias