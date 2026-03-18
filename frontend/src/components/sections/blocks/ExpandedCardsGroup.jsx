import { useState, useRef, useEffect } from "react";
import { ContentBlockService } from "../../../api/services/ContentBlockService";
import Modal from "../../common/Modal";
import CardForm from "../../forms/CardForm";
import CardSection from "../CardSection";
import SectionBlock from "../SectionBlock";

export default function ExpandedCardsGroup({ block, isEditing, isAdmin }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const cardRefs = useRef({});
  const desktopContentRef = useRef(null);

  const cards = block.children || [];

  const activeCard = cards.find(card => card.id === activeId);

  //busco el id de la card actual y busco la siguiente. Lógica para poder navegar a la siguiente card con el lector de pantalla con el TAB
  const currentIndex = cards.findIndex(card => card.id === activeId);
  const nextCard = currentIndex >= 0 ? cards[currentIndex + 1] : null;

  const handleAdd = async (formData) => {
    console.log('block.section_id:', block.section_id)
    console.log('block.id:', block.id)
    try {
      await ContentBlockService.createBlock(
        block.section_id,
        'card',
        formData,
        cards.length,
        block.id
      );
      window.location.reload();
    } catch (err) {
      console.error("Error agregando card:", err);
    }
  };

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

      //focus para que cuando se despliegue el contenido, el lector de pantalla haga el foco en el desplegable
      desktopContentRef.current?.focus();
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


  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        {cards.map(card => {
          const isActive = card.id === activeId;
          return (
            <div key={card.id} className="w-full" ref={el => (cardRefs.current[card.id] = el)}>
              <CardSection
                card={card.data}
                blockId={card.id}
                onClick={() => setActiveId(isActive ? null : card.id)}
                isActive={isActive}
                isEditing={isEditing}
                isAdmin={isAdmin}
                onUpdate={(newData) => onChange && onChange(card.id, newData)}
              />
              {isActive && (
                <div id={`card-content-${card.id}`} className="md:hidden p-6 rounded-xl mt-4 bg-white shadow-sm">
                  {card.children?.map(innerBlock => (
                    <SectionBlock key={innerBlock.id} block={innerBlock} isEditing={isEditing} isAdmin={isAdmin} onChange={onChange} />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>  {/* ← cierra el grid acá */}

      {activeCard && (  // ← ahora está afuera del grid
        <div key={activeCard.id} className="hidden md:block w-full bg-white shadow-sm rounded-2xl py-5 mb-15">
          <div ref={desktopContentRef}
            tabIndex="-1"
            role="region"
            aria-labelledby={`card-title-${activeCard.id}`}
            aria-live="polite"
            className="max-w-5xl mx-auto px-6 space-y-5"

            onKeyDown={(e) => {
              if (e.key === "Tab" && !e.shiftKey && nextCard) {
                {/* si se presiona tab, se puede seguir navegando a la siguiente luego de leer el contenido expandido. shift + tab, vuelve a la card anterior */ }
                e.preventDefault();
                const next = cardRefs.current[nextCard.id];
                next?.querySelector("button, a")?.focus();
              }
            }}>
            {activeCard.children?.map(innerBlock => (
              <SectionBlock key={innerBlock.id} block={innerBlock} isEditing={isEditing} isAdmin={isAdmin} onChange={onChange} />
            ))}

          </div>
        </div>
      )}

      {isAdmin && isEditing && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg cursor-pointer hover:bg-blue-700"
        >
          + Añadir card
        </button>
      )}

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CardForm
          onSubmit={(formData) => {
            handleAdd(formData);
            setIsModalOpen(false);
          }}
          onCancel={() => setIsModalOpen(false)}
          showHref={false}
        />
      </Modal>
    </>
  );
}

ExpandedCardsGroup.hasEditor = true;
