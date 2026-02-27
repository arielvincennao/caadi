import { useState } from "react";
import BtnBack from "../components/common/BtnBack";
import Navbar from "../components/layout/Navbar";
import { Title, Text } from "../components/Typography";
import SectionBlock from "../components/sections/SectionBlock";
import CardSection from "../components/sections/CardSection";

function getBlockData(block) {
  const raw = block.data;
  if (raw == null) return {};
  if (typeof raw === "object") return raw;
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw);
    } catch {
      return {};
    }
  }
  return {};
}

function mapBlock(block) {
  const data = getBlockData(block);
  return {
    id: block.id,
    type: String(block.type || ""),
    data,
    ...data,
  };
}

export default function Section({ data }) {
  const [expandedId, setExpandedId] = useState(null);

  if (!data) return null;

  const rootBlocks = data.rootBlocks ?? [];
  const childrenByParentId = data.childrenByParentId ?? {};

  return (
    <div className="min-h-screen flex flex-col items-center">
      <Navbar />

      <div className="absolute top-23 left-4 mt-5 md:top-25 md:left-10 z-10">
        <BtnBack />
      </div>

      <div className="p-3 md:w-6xl pt-20 md:pt-3 w-full mx-auto">
        <section className="flex flex-col items-center text-center md:text-left md:items-start mb-8">
          {data.image && (
            <img
              src={data.image}
              alt="Imagen de Portada"
              className="w-full max-h-64 md:max-h-96 object-cover rounded-lg mb-6"
            />
          )}

          <Title>{data.title}</Title>
          <Text>{data.description}</Text>
        </section>

        {rootBlocks.map((block) => {
          const children = childrenByParentId[String(block.id)] ?? [];

          if (block.type === "expandedCardsGroup") {
            const cardData = (() => {
              const d = getBlockData(block);
              return typeof d === "object" && d !== null && ("icon" in d || "title" in d || "description" in d)
                ? d
                : { icon: "", title: "", description: "" };
            })();
            const isActive = expandedId !== null && String(expandedId) === String(block.id);

            return (
              <div key={block.id} className="mb-6">
                <CardSection
                  card={cardData}
                  onClick={() => setExpandedId(isActive ? null : block.id)}
                />
                {isActive && children.length > 0 && (
                  <div className="mt-4 pl-0 md:pl-4">
                    {children.map((child) => (
                      <SectionBlock key={child.id} block={mapBlock(child)} />
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <SectionBlock key={block.id} block={mapBlock(block)} />
          );
        })}
      </div>
    </div>
  );
}
