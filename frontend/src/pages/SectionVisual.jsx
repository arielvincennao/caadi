import BtnBack from "../components/common/BtnBack";
import Navbar from "../components/layout/Navbar";
import Step from "../components/sections/Step";
import List from "../components/sections/List";

import { Subtitle, Title, Text } from "../components/Typography";

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
            <div className="p-3 md:w-[70%] pt-20 md:pt-3">
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
                                <Subtitle>{block.title}</Subtitle>
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
                    
                    if (block.type === "text") { //ESTA FUNCIONALIDAD LA AGREGUE PORQUE LA SECCION DE CNRT TIENE UNA PARTE QUE NO IMPLICA PASOS
                        return (
                            <section key={block.id} className="my-6">
                            <Subtitle>{block.title}</Subtitle>
                            {block.list.map((poslist) => (  
                                <List text={poslist.text} key={poslist.id} />
                            ))}
                            </section>
                        );
                    }

                    return null;
                })}

                <Button href="/map-test">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                    </svg>
                    <Text>Ver mapa</Text>
                </Button>
            </div>
        </div>

    );
}