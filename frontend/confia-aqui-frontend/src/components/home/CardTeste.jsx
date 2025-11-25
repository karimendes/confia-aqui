import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"

function CardTeste() {
  return (
    <section className="flex justify-center pb-8 px-4 bg-gray-50">
  <div
  className="max-w-5xl mx-auto bg-azul rounded-xl shadow-[0_4px_4px_rgba(0,0,0,0.25)] p-6"
  style={{ boxShadow: "0 4px 4px rgba(0,0,0,0.25), inset 0 0 2px rgba(0,0,0,0.25)" }}
>
  <h2 className="text-lg font-bold text-white mb-2">Teste seus conhecimentos</h2>
<p className="text-gray-100 mb-2 text-sm font-normal">
  Descubra se você reconhece os principais sinais do Golpe do Presente. Nosso teste é rápido e prático. Ele apresenta situações reais para você identificar o golpe na prática e aprender a agir com mais segurança.
</p>
<p className="text-gray-100 mb-2 text-sm font-normal">
  Quanto mais você treina, mais preparado fica!
</p>

  <Link to="/teste"
    className="inline-flex items-center gap-1 text-sm text-gray-100 hover:text-gray-300 underline transition-colors"
  >Ir para Teste <FontAwesomeIcon icon={faArrowUpRightFromSquare}/>
    </Link>
</div>
</section>

  )
}

export default CardTeste