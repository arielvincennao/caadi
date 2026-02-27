import { useEffect, useState, useMemo } from "react";
import { supabase } from "../../db/supabaseClient";
import SectionBlock from "../components/sections/SectionBlock";

function mapBlock(block) {
  return {
    id: block.id,
    type: block.type,
    ...(block.data || {}),
  };
}

function buildExpandedGroup(block, children) {
  return {
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
        content: children.map(mapBlock),
      },
    ],
  };
}

export default function ComponentsTest() {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBlocks() {
      try {
        const { data, error } = await supabase
          .from("content_block")
          .select("*")
          .order("position", { ascending: true });

        if (error) throw error;

        setBlocks(data || []);
      } catch (err) {
        console.error(err);
        setError("Error al traer datos");
      } finally {
        setLoading(false);
      }
    }

    fetchBlocks();
  }, []);

  const { rootBlocks, childrenByParentId } = useMemo(() => {
    const map = {};
    const roots = [];

    for (const block of blocks) {
      if (block.parent_id == null) {
        roots.push(block);
      } else {
        if (!map[block.parent_id]) map[block.parent_id] = [];
        map[block.parent_id].push(block);
      }
    }

    return { rootBlocks: roots, childrenByParentId: map };
  }, [blocks]);

  function renderBlock(block) {
    let blockData;

    if (block.type === "expandedCardsGroup") {
      const children = childrenByParentId[block.id] || [];
      blockData = buildExpandedGroup(block, children);
    } else {
      blockData = mapBlock(block);
    }

    return (
      <div key={block.id} style={{ marginBottom: 24 }}>
        <SectionBlock block={blockData} />
      </div>
    );
  }

  if (loading) return <p>Cargando...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Contenido de content_block</h2>
      {rootBlocks.map(renderBlock)}
    </div>
  );
}