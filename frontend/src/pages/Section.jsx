import BtnBack from "../components/common/BtnBack";
import Navbar from "../components/layout/Navbar";
import { Title, Text } from "../components/Typography";
import Button from "../components/common/Button";
import SectionBlock from "../components/sections/SectionBlock";

export default function Section({ data }) {
    if (!data) return null;

    return (
        <div className="bg-white min-h-screen flex flex-col items-center">
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

            <Button href="/map-test">
                <svg className="me-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                </svg>
                <Text>Ver mapa</Text>
            </Button>
            </div>
        </div>
    );
}
