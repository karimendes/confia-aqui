import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faEnvelope, faLock} from "@fortawesome/free-solid-svg-icons"

function Input({type = "text", placeholder, value, onChange, icon }){
    return (
        <div className="relative w-full">
            <FontAwesomeIcon icon={icon} className="absolute left-3 top-1/2 -translate-y-1/2 text-cinza-500"/>
        <input type={type} placeholder={placeholder} className="border rounded-xl pl-10 pr-3 py-2 w-full border-cinza-500 focus-visible:ring-azul focus:outline-none" value={value} onChange={onChange} required />
        </div>
    )
}

export default Input