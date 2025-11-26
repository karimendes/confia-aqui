import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../components/auth/AuthContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-regular-svg-icons"
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"

function HeaderAdmin() {
  const [dropDownAberto, setDropDownAberto] = useState(false)
  const { logout } = useAuth()

  return (
    <header className="fixed top-0 left-0 w-full flex items-center justify-between px-6 py-3 bg-white shadow-md z-50">
      {/* Logo */}
      <Link to="/admin/home">
        <h1 className="text-2xl font-bold text-azul hover:opacity-90 transition">
          Confia Aqui
        </h1>
      </Link>

      {/* Navegação e Ícone de Usuário */}
      <div className="flex items-center gap-6">
        {/* Link Dashboard */}
        <Link
          to="/admin/dashboard"
          className="font-bold text-azul hover:opacity-95 transition"
        >
          Dashboard
        </Link>

        {/* Dropdown do Usuário */}
        <div
          className="relative flex items-center justify-center w-10 h-10 cursor-pointer"
          onClick={() => setDropDownAberto(!dropDownAberto)}
        >
          <FontAwesomeIcon
            icon={faUser}
            className="text-azul text-lg hover:bg-gray-300 hover:rounded-full p-2 hover:opacity-80 transition"
          />

          {dropDownAberto && (
            <div className="absolute right-0 top-12 w-48 bg-white border border-gray-200 rounded-lg shadow-lg text-sm animate-fadeIn z-50">
              <div className="border-t border-gray-200">
                <ul className="py-2 text-red-700 font-semibold">
                  <li
                    className="block w-full px-4 py-2 hover:bg-red-200 rounded-md cursor-pointer"
                    onClick={logout}
                  >
                    <span>Sair</span>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} className="px-1" />
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default HeaderAdmin