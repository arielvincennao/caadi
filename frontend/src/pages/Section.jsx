/* import Steps from {}
import Map from {}
import BtnLink from {} */
import BtnBack from "../components/common/BtnBack";
import Navbar from "../components/layout/Navbar";
import Step from "../components/sections/Step";
import { Title } from "../components/Typography";
import { Text } from "../components/Typography";

export default function Section({
    data
}) {
    if (!data) return null;

    return (
        <div className="bg-white min-h-screen flex flex-col items-center text-lg md:text-2xl">
            <Navbar/>
            <div className="absolute top-23 left-4 md:top-25 md:left-10 z-10">
                <BtnBack />
            </div>
            <div className="p-3 md:w-[70%]">
                <section className="flex flex-col mb-8">
                    <img
                        src={data.image}
                        alt="Imagen de Portada"
                        className="w-full max-h-64 object-cover rounded-lg mb-6"
                    />
                    <Title className="text-center mb-3">{data.name}</Title>
                    <Text>{data.description}</Text>
                </section>

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

