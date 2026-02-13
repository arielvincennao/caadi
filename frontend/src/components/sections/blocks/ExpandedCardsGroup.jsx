import { useState } from "react";
import CardSection from "../CardSection";
import SectionBlock from "../SectionBlock";

export default function ExpandedCardsGroup({ block }) {
  const [activeId, setActiveId] = useState(null);

  const activeCard = block.cards.find(card => card.id === activeId);

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
                className={isActive ? "bg-slate-400" : ""}
              />

              {/* renderizo el contenido debajo de cada card en mobile */}
              {isActive && (
                <div className="md:hidden p-6 rounded-xl mt-4 bg-white">
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
        <div className="hidden md:block w-full bg-white shadow-sm rounded-2xl py-5 mb-15">
          <div className="max-w-5xl mx-auto px-6">
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
