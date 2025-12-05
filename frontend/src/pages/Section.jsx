import BtnBack from "../components/common/BtnBack";
import Navbar from "../components/layout/Navbar";
import Step from "../components/sections/Step";
import List from "../components/sections/List";
import { Title } from "../components/Typography";
import { Text } from "../components/Typography";
import Button from "../components/common/Button";

export default function Section({ data }) {
  if (!data) return null;

  return (
    <div className="bg-white min-h-screen flex flex-col items-center text-lg md:text-2xl">
      <div className="p-3 md:w-[70%]">
        <section className="flex flex-col items-center text-center mb-8">
          <img
            src={data.image}
            alt="Imagen de Portada"
            className="w-full max-h-64 object-cover rounded-lg mb-6"
          />
          <Title>{data.name}</Title>
          <Text>{data.description}</Text>
        </section>

        {data.contentBlocks.map((block) => {
          if (block.type === "steps") {
            return (
              <section key={block.id} className="my-6 space-y-4">
                <h2>{block.title}</h2>
                {block.steps.map((step) => (
                  <Step
                    key={step.id}
                    stepNumber={step.id}
                    stepIcon={step.icon}
                    text={step.description}
                  />
                ))}
              </section>
            );
          }


          if (block.type === "text") { //ESTA FUNCIONALIDAD LA AGREGUE PORQUE LA SECCION DE CNRT TIENE UNA PARTE QUE NO IMPLICA PASOS
            return (
              <section key={block.id} className="my-6">
                <h2>{block.title}</h2>
                {block.list.map((poslist) => (  
                  <List text={poslist.text} />
                ))}
              </section>
            );
          }
          return null;
        })}

        <Button className="main-button" href="/map-test">
          <Text>Ver mapa</Text>
        </Button>
      </div>
    </div>
  );
}
