import DangerZone from "../components/perfil/DangerZone"
import Header from "../components/ui/Header"
import PerfilSection from "../components/perfil/PerfilSection"


function Perfil() {

  return (
    <div className="flex flex-col w-full">
    <Header /> 
    <PerfilSection />
    <DangerZone />
    </div>
  )
}
export default Perfil