import { useState } from "react";
import Step from "../components/sections/blocks/StepsBlock";
import Card from "../components/sections/blocks/CardBlock";
import { supabase } from "../../db/supabaseClient";

export default function ComponentsTest() {
  const [blocks, setBlocks] = useState([]);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchBlocks = async () => {
    setLoading(true);
    try {
      // Traemos la sección "cud" solo para test
      const { data: section } = await supabase
        .from("section")
        .select("")
        .eq("slug", "cud")
        .single();

      if (!section) {
        alert("No se encontró la sección CUD");
        setLoading(false);
        return;
      }

      const { data: blocksData } = await supabase
        .from("content_block")
        .select("")
        .eq("section_id", section.id)
        .order("position", { ascending: true });

      setBlocks(blocksData || []);
      setStep(0);
      console.log(blocksData)
    } catch (error) {
      console.error(error);
      alert("Error al traer datos");
    } finally {
      setLoading(false);
    }
  };

  const stepBlocks = blocks.filter(b => b.type === "step"); // ahora Step
  const cardBlocks = blocks.filter(b => b.type === "card"); // ahora Card

  return (
    <div style={{ padding: 20 }}>
        {cardBlocks.length > 0 && (
        <div>
          <h2>Card</h2>
          {cardBlocks.map(block => (
            <Card key={block.id} title={block.title}>
              <p>{block.description}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}