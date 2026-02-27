import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../db/supabaseClient";
import Section from "../pages/Section";

export default function DynamicSection() {
  const { slug } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      // 1️⃣ Traer section por slug
      const { data: section, error: sectionError } = await supabase
        .from("section")
        .select("")
        .eq("slug", slug)
        .single();

      if (sectionError || !section) {
        console.error("Section not found");
        return;
      }

      // 2️⃣ Traer bloques
      const { data: blocks } = await supabase
        .from("content_block")
        .select("")
        .eq("section_id", section.id)
        .order("position");

      setData({
        ...section,
        blocks,
      });
    }

    fetchData();
  }, [slug]);

  if (!data) return <div>Cargando...</div>;

  return <Section data={data} />;
}