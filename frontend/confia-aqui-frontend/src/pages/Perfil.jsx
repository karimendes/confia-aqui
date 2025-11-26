import DangerZone from "../components/perfil/DangerZone"
import Header from "../components/ui/Header"
import PerfilSection from "../components/perfil/PerfilSection"
import Footer from "../components/ui/Footer"


function Perfil() {

  return (
    <div className="flex flex-col w-full">
    <Header /> 
    <PerfilSection />
    <DangerZone />
    <Footer />
    </div>
  )
}
export default Perfil