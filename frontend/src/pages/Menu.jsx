import Navbar from "../components/layout/Navbar";
import { Title } from "../components/Typography";
import Card from "../components/common/Card";
import BtnBack from "../components/common/BtnBack";


const menuOptions = [
  { icon: "assets/icons/cud.svg", name: "CUD", to:"/cud"},
  { icon: "assets/icons/transporte.svg", name: "Pases de transporte", to:"/transporte"},
  { icon: "assets/icons/cnrt.svg", name: "Reserva de pasajes CNRT", to:"/cnrt"},
  { icon: "assets/icons/beneficios.svg", name: "Beneficios sociales", to:"/beneficios"},
  { icon: "assets/icons/cultura.svg", name: "Cultura y arte", to:"/cultura" },
  { icon: "assets/icons/turismo.svg", name: "Turismo accesible", to:"/turismo"},
  { icon: "assets/icons/centrodia.svg", name: "Centros de día", to:"/centrosdia"},
  { icon: "assets/icons/reportes.svg", name: "Reclamos de accesibilidad", to:"/reportes"},
];

function Menu() {
  return (
    <div>
      <Navbar/>
      <div className="absolute top-23 left-4 md:top-25 md:left-10 z-10">
        <BtnBack />
      </div>
      <section className="flex flex-col items-center pb-10 pt-20 md:pt-4">
        <Title className="m-4 md:text-2xl">Menú principal</Title>
        <ul className="space-y-5">
          {menuOptions.map((option) => (
          <li key={option.name} >
            <Card icon={option.icon}  to={option.to} className="text-start">
              <span>{option.name}</span>
            </Card> 
          </li>
          ))}
        </ul>
      </section>
    </div>  
  )
}

export default Menu

