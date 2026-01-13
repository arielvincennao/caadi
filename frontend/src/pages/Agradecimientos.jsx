import Navbar from "../components/layout/Navbar";
import { Title, Subtitle, Subsubtitle, Text } from "../components/Typography";
import BtnBack from "../components/common/BtnBack";

function Agradecimientos() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="absolute top-23 left-4 md:top-25 md:left-10 z-10">
        <BtnBack />
      </div>

      <section className="flex justify-center px-4 pt-24 pb-16">
        <div className="w-full max-w-3xl space-y-10">

          <div className="text-center space-y-4">
            <Title>Gracias por ser parte de CAADI</Title>
            <Text className="text-slate-600">
              Queremos agradecerte por tomarte el tiempo de visitar este espacio.
              CAADI existe gracias al aporte, la escucha y la participación de personas,
              familias y comunidades que creen en una cultura más accesible e inclusiva.
              Este proyecto se construye día a día con el compromiso y la sensibilidad
              de quienes comparten sus experiencias, sus conocimientos y sus necesidades.
            </Text>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 space-y-6">
            <Subtitle>Agradecimientos especiales</Subtitle>

            <Subsubtitle>Agradecemos profundamente:</Subsubtitle>

            <ul className="space-y-4 list-disc list-inside marker:text-primary">
              <li>
                  A las personas con discapacidad, que inspiran este proyecto con
                  sus recorridos y su presencia.
              </li>
              <li>A las familias y a toda la comunidad, que acompañan, sostienen
                  y participan activamente.
              </li>
              <li>
                  A los espacios culturales, educativos y sociales que trabajan
                  para ser más accesibles.
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 space-y-6">
            <Subtitle>Agradecimientos personales</Subtitle>

            <ul className="space-y-4 list-disc list-inside marker:text-primary">
              <li>
                  A mi mamá, Marta, que siempre encendió en mí la chispa para aprender,
                  ayudar y seguir caminando hacia espacios más accesibles.
              </li>
              <li>
                  A las personas que están trabajando para llevar adelante esta página,
                  especialmente a los estudiantes de la Universidad Nacional del Centro
                  (UNICEN), Tandil. Por su compromiso y dedicación para que este proyecto
                  sea posible.
              </li>
            </ul>
          </div>

          <div className="text-center">
            <Text className="font-medium text-slate-700">
              CAADI es un proyecto colectivo: está hecho con y para la comunidad.
            </Text>
          </div>

        </div>
      </section>
    </div>
  );
}

export default Agradecimientos;
