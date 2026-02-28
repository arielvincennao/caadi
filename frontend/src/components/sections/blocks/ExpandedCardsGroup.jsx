import { useState, useRef, useEffect } from "react";
import CardSection from "../CardSection";
import SectionBlock from "../SectionBlock";

export default function ExpandedCardsGroup({ block }) {
  const [activeId, setActiveId] = useState(null);

  const cardRefs = useRef({});
  const desktopContentRef = useRef(null);

  const activeCard = block.cards.find(card => card.id === activeId);

  //scroll automatico al contenido de la card clickeada
  useEffect(() => {
  if (!activeCard) return;

  const isDesktop = window.innerWidth >= 768;

  //en desktop con scrollIntoView puedo ir porque siempre es un solo contenedor expandido
  if (isDesktop) {
    desktopContentRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  } else {
    //en mobile se expande dentro del map, no es siempre el mismo contenedor, tengo que buscar la posición exacta para mostrar el contenido
    const el = cardRefs.current[activeCard.id];
    if (!el) return;

    //el -100 es para que no desaparezca la card por completo de la pantalla y se note que es la clickeada (se ve un poco de la descripción, da contexto)
    const y = el.getBoundingClientRect().top + window.scrollY - 100;

    window.scrollTo({
      top: y,
      behavior: "smooth"
    });
  }
}, [activeCard]);


  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        {block.cards.map(card => {
          const isActive = card.id === activeId;

          return (
            <div key={card.id} className="w-full">
              <CardSection
                card={card.card}
                onClick={() =>
                  setActiveId(isActive ? null : card.id)
                }
                className={isActive ? "border-slate-600 border-3 shadow-sm bg-slate-100" : ""}
              />

              {/* renderizo el contenido debajo de cada card en mobile */}
              {isActive && (
                <div ref={el => (cardRefs.current[card.id] = el)} className="md:hidden p-6 rounded-xl mt-4 bg-white shadow-sm">
                  {card.content.map(innerBlock => (
                    <SectionBlock
                      key={innerBlock.id}
                      block={innerBlock}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* renderizo el contenido debajo de todas las cards en desktop */}
      {activeCard && (
        <div key={activeCard.id} className="hidden md:block w-full bg-white shadow-sm rounded-2xl py-5 mb-15">
          <div ref={desktopContentRef} className="max-w-5xl mx-auto px-6 space-y-5">
            {activeCard.content.map(innerBlock => (
              <SectionBlock
                key={innerBlock.id}
                block={innerBlock}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
