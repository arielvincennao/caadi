import BtnBack from "../components/common/BtnBack";
import Navbar from "../components/layout/Navbar";
import Step from "../components/sections/Step";
import { Subtitle, Title } from "../components/Typography";
import { Text } from "../components/Typography";
import Button from "../components/common/Button";

export default function SectionVisual({
    data
}) {
    if (!data) return null;

    return (
        <div className="bg-white min-h-screen flex flex-col items-center text-lg md:text-2xl">
            <Navbar></Navbar>
            <div className="absolute top-23 left-4 md:top-25 md:left-10 z-10">
                <BtnBack></BtnBack>
            </div>
            <div className="p-3 md:w-[70%]">
                <section className="flex flex-col items-center md:items-start text-center md:text-left mb-8" aria-labelledby="section-title">
                    <img
                        src={data.image}
                        alt={`Imagen de portada para ${data.name}`}
                        className="w-full max-h-64 object-cover rounded-lg mb-6"
                    />
                    <Title className="mb-3">{data.name}</Title>
                    <div>
                        <video src="/videos/LSA_prueba.mp4" className="mb-4 md:w-lg" controls></video>
                    </div>
                    <Text>{data.description}</Text>
                </section>

                {data.contentBlocks.map((block) => {

                    if (block.type === "steps") {
                        return (
                            <section key={block.id} aria-label="Lista de pasos" className="my-6 space-y-4">
                                <Subtitle>Pasos para tramitarlo</Subtitle>
                                <video src="/videos/LSA_prueba.mp4" className="mb-4 md:w-lg" controls></video>

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