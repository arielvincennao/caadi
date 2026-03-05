import { useState, useRef, useEffect } from "react";
import CardSection from "../CardSection";
import SectionBlock from "../SectionBlock";

export default function ExpandedCardsGroup({ block }) {
  const [activeId, setActiveId] = useState(null);

  const cardRefs = useRef({});
  const desktopContentRef = useRef(null);


  const cards = block.children || [];
  const activeCard = cards.find(card => card.id === activeId);

  //scroll automatico al contenido de la card clickeada
  useEffect(() => {

    if (!activeCard) return;

    const isDesktop = window.innerWidth >= 768;

    //en desktop puedo usar scrollIntoView, puedo ir porque siempre es un solo contenedor expandido

    if (isDesktop) {
      desktopContentRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    } else {
      //en mobile se expande debajo de la card, no es siempre el mismo contenedor, tengo que buscar la posición exacta para mostrar el contenido

      const active = cardRefs.current[activeCard.id];
      if (!active) return;

      //el -100 es para que no desaparezca la card por completo de la pantalla y se note que es la clickeada (se ve un poco la descripción, da contexto)

      const y = active.getBoundingClientRect().top + window.scrollY - 100;

      window.scrollTo({
        top: y,
        behavior: "smooth"
      });
    }

  }, [activeCard]);

  console.log("ExpandedCardsGroup render", block);

  return (
  <>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
      {cards.map(card => {
        const isActive = card.id === activeId;
        return (
          <div key={card.id} className="w-full">
            <CardSection
              card={card.data}
              onClick={() => setActiveId(isActive ? null : card.id)}
              isActive={isActive}
            />
            {isActive && (
              <div ref={active => (cardRefs.current[card.id] = active)} className="md:hidden p-6 rounded-xl mt-4 bg-white shadow-sm">
                {card.children?.map(innerBlock => (
                  <SectionBlock key={innerBlock.id} block={innerBlock} />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>  {/* ← cierra el grid acá */}

    {activeCard && (  // ← ahora está afuera del grid
      <div key={activeCard.id} className="hidden md:block w-full bg-white shadow-sm rounded-2xl py-5 mb-15">
        <div ref={desktopContentRef} className="max-w-5xl mx-auto px-6 space-y-5">
          {activeCard.children?.map(innerBlock => (
            <SectionBlock key={innerBlock.id} block={innerBlock} />
          ))}
        </div>
      </div>
    )}
  </>
);
}