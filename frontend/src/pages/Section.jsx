/* import Steps from {}
import Map from {}
import BtnLink from {}
import Btn from {} */
import Step from "../components/sections/Step";
import { Title } from "../components/Typography";
import { Text } from "../components/Typography";

export default function Section({
    data
}) {
    if (!data) return null;

    /*   const bloques = {
        map: Map,
        steps: Steps,
        btn: Btn,
        btn_link: BtnLink
        }; */
    const blocks = {
        steps: Step,
    }

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

                {/*{data.contentBlocks
            .sort((a, b) => a.order - b.order)
            .map((block) => {
                const Componente = bloques[block.type];

                if (!Componente) {
                console.warn(`No existe componente para el tipo: ${block.type}`, block);
                return null;
                }

                return (
                    <section key={b.id}>
                        <Componente data={b} />
                    </section>
                );
            })} */}
                {data.contentBlocks.map((block) => {
                    if (block.type === "steps") {
                        return (
                            <section key={block.id} className="my-6 space-y-4">
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
                    return null;
                })}
                
            </div>
        </div>

    );
}

