import { useState, useRef, useEffect } from "react";
import CardSection from "../CardSection";
import SectionBlock from "../SectionBlock";

export default function ExpandedCardsGroup({ block }) {
  const [activeId, setActiveId] = useState(null);
  const cardRefs = useRef({});
  const desktopContentRef = useRef(null);

  const cards = block.children || [];
  const activeCard = cards.find(card => card.id === activeId);

  useEffect(() => {
    if (!activeCard) return;
    const isDesktop = window.innerWidth >= 768;
    if (isDesktop) {
      desktopContentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      const el = cardRefs.current[activeCard.id];
      if (!el) return;
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [activeCard]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        {cards.map(card => {
          const isActive = card.id === activeId;
          return (
            <div key={card.id} className="w-full">
              <CardSection
                card={card.data}
                isActive={isActive}
                onClick={() => setActiveId(isActive ? null : card.id)}
              />
              {isActive && (
                <div
                  ref={el => (cardRefs.current[card.id] = el)}
                  className="md:hidden p-6 rounded-xl mt-4 bg-white shadow-sm"
                >
                  {card.children?.map(innerBlock => (
                    <SectionBlock key={innerBlock.id} block={innerBlock} />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {activeCard && (
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