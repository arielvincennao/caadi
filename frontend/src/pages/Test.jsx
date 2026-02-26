import { useEffect, useState, useMemo } from "react";
import { supabase } from "../../db/supabaseClient";
import SectionBlock from "../components/sections/SectionBlock";

const DB_TYPE_TO_SECTION_TYPE = {
  collapsible: "expandedCardsGroup",
  stepper: "steps",
};

function toSectionBlock(block) {
  const sectionType = DB_TYPE_TO_SECTION_TYPE[block.type] ?? block.type;
  return { id: block.id, type: sectionType, ...(block.data || {}) };
}

export default function ComponentsTest() {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBlocks = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: blocksData, error: fetchError } = await supabase
        .from("content_block")
        .select("*")
        .order("position", { ascending: true });

      if (fetchError) {
        console.error(fetchError);
        setError(fetchError.message);
        return;
      }

      setBlocks(blocksData || []);
    } catch (error) {
      console.error(error);
      setError("Error al traer datos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlocks();
  }, []);

  const { childrenByParentId, rootBlocks } = useMemo(() => {
    const byParent = {};
    blocks.forEach((b) => {
      if (b.parent_id != null) {
        if (!byParent[b.parent_id]) byParent[b.parent_id] = [];
        byParent[b.parent_id].push(b);
      }
    });
    const roots = blocks.filter((b) => b.parent_id == null);
    return { childrenByParentId: byParent, rootBlocks: roots };
  }, [blocks]);

  const blockToComponent = (block) => {
    if (block.type === "collapsible") {
      const children = (childrenByParentId[block.id] || []).map(toSectionBlock);
      const blockForSection = {
        id: block.id,
        type: "expandedCardsGroup",
        cards: [
          {
            id: block.id,
            card: {
              icon: block.data?.icon,
              title: block.data?.title,
              description: block.data?.description,
            },
            content: children,
          },
        ],
      };
      return (
        <div key={block.id} style={{ marginBottom: 24 }}>
          <SectionBlock block={blockForSection} />
        </div>
      );
    }

    const blockForSection = toSectionBlock(block);
    return (
      <div key={block.id} style={{ marginBottom: 24 }}>
        <SectionBlock block={blockForSection} />
      </div>
    );
  };

  return (
    <div style={{ padding: 20 }}>
      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <h2>Contenido de content_block</h2>
      {rootBlocks.map(blockToComponent)}
    </div>
  );
}