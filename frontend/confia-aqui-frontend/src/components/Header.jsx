import { useState } from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-regular-svg-icons"
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons"

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="relative flex items-center justify-between px-4 py-3 bg-white shadow-md z-50">
      <button
        className="md:hidden text-gray-700 flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <FontAwesomeIcon
          icon={menuOpen ? faTimes : faBars}
          size="lg"
          className="transition-all duration-200"
        />
      </button>

      <h1 className="text-2xl font-bold text-azul absolute left-1/2 transform -translate-x-1/2 md:static md:transform-none">
  Confia Aqui
</h1>

      <Link to="/perfil" className="flex items-center justify-center w-10 h-10">
        <FontAwesomeIcon
          icon={faUser}
          className="text-cinza-600 text-lg hover:bg-gray-300 hover:rounded-full p-1 hover:opacity-80"
        />
      </Link>

      <nav className="hidden md:flex gap-6 absolute right-20">
        <Link to="/home" className="font-bold text-cinza-600 hover:text-cinza-500">
          Página Inicial
        </Link>
        <Link to="/teste" className="font-bold text-cinza-600 hover:text-cinza-500">
          Teste
        </Link>
      </nav>

      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-t border-gray-200 shadow-md md:hidden animate-slideDown">
          <nav className="flex flex-col px-6 py-4 space-y-3 text-cinza-600">
            <Link
              to="/home"
              className="font-medium hover:text-cinza-500 transition"
              onClick={() => setMenuOpen(false)}
            >
              Página Inicial
            </Link>
            <Link
              to="/teste"
              className="font-medium hover:text-cinza-500 transition"
              onClick={() => setMenuOpen(false)}
            >
              Teste
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
