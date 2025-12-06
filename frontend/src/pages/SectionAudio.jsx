import BtnBack from "../components/common/BtnBack";
import Navbar from "../components/layout/Navbar";
import Step from "../components/sections/Step";
import { Title } from "../components/Typography";
import { Text } from "../components/Typography";
import Button from "../components/common/Button";

export default function SectionAudio({
    data
}) {
    if (!data) return null;

    return (
        <div className="bg-white min-h-screen flex flex-col items-center text-lg md:text-2xl">
            <Navbar></Navbar>
            <h1>Sección modo audio</h1>
            <div className="absolute top-23 left-4 md:top-25 md:left-10 z-10">
                <BtnBack></BtnBack>
            </div>
            <div className="p-3 md:w-[70%] pt-20 md:pt-3">
                <section className="flex flex-col items-center text-center mb-8" aria-labelledby="section-title">
                    <img
                        src={data.image}
                        alt={`Imagen de portada para ${data.name}`}
                        className="w-full max-h-64 object-cover rounded-lg mb-6"
                    />
                    <Title className="text-center mb-3">{data.name}</Title>
                    <Text>{data.description}</Text>
                </section>

                {data.contentBlocks.map((block) => {

                    if (block.type === "steps") {
                        return (
                            <section key={block.id} aria-label="Lista de pasos" className="my-6 space-y-4">
                                <h2 className="text-xl font-semibold mb-4">Pasos para tramitar</h2>
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

                <Button className="main-button" href="/map-test" >
                    <Text>Ver mapa</Text>
                </Button>

            </div>
        </div>

    );
}