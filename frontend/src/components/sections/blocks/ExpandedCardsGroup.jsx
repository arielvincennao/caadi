import { useState, useRef, useEffect } from "react";
import CardSection from "../CardSection";
import SectionBlock from "../SectionBlock";

export default function ExpandedCardsGroup({ block }) {
  const [activeId, setActiveId] = useState(null);

  const cards = block.children || [];
  const activeCard = cards.find(card => card.id === activeId);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        {cards.map(card => {
          const isActive = card.id === activeId;

          return (
            <div key={card.id}>
              <CardSection
                card={card.data}
                onClick={() =>
                  setActiveId(isActive ? null : card.id)
                }
              />

              {isActive && (
                <div className="md:hidden">
                  {card.children?.map(innerBlock => (
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

      {activeCard && (
        <div className="hidden md:block">
          {activeCard.children?.map(innerBlock => (
            <SectionBlock
              key={innerBlock.id}
              block={innerBlock}
            />
          ))}
        </div>
      )}
    </>
  );
}