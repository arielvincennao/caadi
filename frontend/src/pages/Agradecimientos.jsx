import Navbar from "../components/layout/Navbar";
import { Title } from "../components/Typography";
import BtnBack from "../components/common/BtnBack";

function Agradecimientos() {
  return (
    <div>
      <Navbar/>
      <div className="absolute top-23 left-4 md:top-25 md:left-10 z-10">
        <BtnBack />
      </div>
      <section className="flex flex-col items-center justify-center min-h-screen pb-10 pt-20 md:pt-4 px-4">
        <Title className="text-center m-4">Gracias por ser parte de CAADI</Title>
      </section>
    </div>  
  )
}

export default Agradecimientos

