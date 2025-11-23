import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"

function CardTeste() {
  return (
    <section className="flex justify-center py-20 md:py-32 px-4 bg-gray-50">
  <div
  className="max-w-5xl mx-auto bg-white rounded-xl shadow-[0_4px_4px_rgba(0,0,0,0.25)] p-6"
  style={{ boxShadow: "0 4px 4px rgba(0,0,0,0.25), inset 0 0 2px rgba(0,0,0,0.25)" }}
>
  <h2 className="text-lg font-bold text-cinza-600 mb-2">Teste</h2>
  <p className="text-cinza-600 mb-2 text-sm font-normal">
    Aprenda a identificar golpes de forma leve e interativa com nosso teste gamificado e 
    melhore sua habilidade de reconhecer situações suspeitas antes de que elas aconteçam.
  </p>
  <Link to="/teste"
    className="inline-flex items-center gap-1 text-sm text-cinza-500 hover:text-cinza-600 underline transition-colors"
  >Ir para Teste <FontAwesomeIcon icon={faArrowUpRightFromSquare}/>
    </Link>
</div>
</section>

  )
}

export default CardTeste