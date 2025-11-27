/* import Steps from {}
import Map from {}
import BtnLink from {}
import Btn from {} */

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

  return (
    <div className="bg-white min-h-screen flex flex-col items-center text-lg md:text-2xl">
        <div className="p-3 md:w-[70%]">
            <section className="flex justify-center">
                <img
                    src={data.image}
                    alt="Imagen de Portada"
                />
                <h1 className="text-2xl md:text-4xl font-bold my-2">{data.name}</h1>
                <p className="text-xl">{data.description}</p>
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
        </div>
    </div>

  );
}

