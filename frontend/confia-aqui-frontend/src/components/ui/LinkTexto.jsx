import { Link } from "react-router-dom"

function LinkTexto({text, to}) {
    return (
        <Link to={to} className="text-xs underline text-cinza-600 hover:text-cinza-500 transition">{text}</Link>
    )
}

export default LinkTexto