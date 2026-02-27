import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../db/supabaseClient";
import Section from "../pages/Section";

export default function DynamicSection() {
  const { slug } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const { data: section, error: sectionError } = await supabase
        .from("section")
        .select("*")
        .eq("slug", slug)
        .single();

      if (sectionError || !section) {
        console.error("Section not found");
        return;
      }

      const { data: blocks, error: blocksError } = await supabase
        .from("content_block")
        .select("*")
        .eq("section_id", section.id)
        .order("position", { ascending: true });

      if (blocksError) {
        console.error("Error loading blocks", blocksError);
        return;
      }

      const list = blocks || [];
      const rootBlocks = list.filter((b) => b.parent_id == null || b.parent_id === "");
      const childrenByParentId = {};
      for (const b of list) {
        if (b.parent_id != null && b.parent_id !== "") {
          const key = String(b.parent_id);
          if (!childrenByParentId[key]) childrenByParentId[key] = [];
          childrenByParentId[key].push(b);
        }
      }
      // Ordenar hijos por position
      for (const key of Object.keys(childrenByParentId)) {
        childrenByParentId[key].sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
      }

      setData({
        ...section,
        rootBlocks,
        childrenByParentId,
      });
    }

    fetchData();
  }, [slug]);

  if (!data) return <div>Cargando...</div>;

  return <Section data={data} />;
}