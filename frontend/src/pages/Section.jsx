import BtnBack from "../components/common/BtnBack";
import Navbar from "../components/layout/Navbar";
import { Title, Text } from "../components/Typography";
import SectionBlock from "../components/sections/SectionBlock";

export default function Section({ data }) {
    if (!data) return null;

    return (
        <div className=" min-h-screen flex flex-col items-center">
            <Navbar />
            <div className="absolute top-23 left-4 md:top-25 md:left-10 z-10">
                <BtnBack />
            </div>
            <div className="p-3 md:w-[70%] pt-20 md:pt-3">
                <section className="flex flex-col items-center text-center md:text-left md:items-start mb-8">
                    <img
                        src={data.image}
                        alt="Imagen de Portada"
                        className="w-full max-h-64 object-cover rounded-lg mb-6"
                    />
                    <Title>{data.name}</Title>
                    <Text>{data.description}</Text>
                </section>

            {data.contentBlocks.map(block => (
                <SectionBlock block={block} key={block.id} />
            ))}

           
            </div>
        </div>
    );
}
