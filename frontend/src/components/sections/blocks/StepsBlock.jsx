import { useState, useEffect } from "react";
import Step from "../Step";
import { Subtitle } from "../../Typography";

export default function StepsBlock({ block, isEditing, isAdmin, onChange }) {
  const { title, steps } = block.data || {};
  const [localTitle, setLocalTitle] = useState(title || "");
  const [localEditing, setLocalEditing] = useState(false);

  useEffect(() => {
    setLocalTitle(title || "");
  }, [title]);

  const handleTitleChange = (e) => {
    setLocalTitle(e.target.value);
    onChange && onChange(block.id, { ...block.data, title: e.target.value });
  };

  const handleAddStep = () => {
    const nextId = steps ? steps.length + 1 : 1;
    const newStep = { id: nextId, description: "" };
    const updated = { ...(block.data || {}), steps: [...(steps || []), newStep] };
    onChange && onChange(block.id, updated);
  };

  const handleStepUpdate = (updatedStep) => {
    const updatedSteps = (steps || []).map(s =>
      s.id === updatedStep.id ? updatedStep : s
    );
    const updated = { ...(block.data || {}), steps: updatedSteps };
    onChange && onChange(block.id, updated);
  };

  return (
    <section className={`relative ${isAdmin && isEditing ? 'pt-12' : ''} mb-6`}>
      {isAdmin && isEditing && (
        <div className="absolute top-1 right-2 z-10">
          {!localEditing ? (
            <button onClick={() => setLocalEditing(true)} className="p-1 bg-blue-600 text-white rounded-full">✏️</button>
          ) : (
            <button onClick={() => setLocalEditing(false)} className="p-1 bg-gray-500 text-white rounded-full">✖</button>
          )}
        </div>
      )}
      {isAdmin && isEditing && localEditing ? (
        <input
          className="w-full mb-2 p-1 border rounded"
          value={localTitle}
          onChange={handleTitleChange}
          placeholder="Título"
        />
      ) : (
        <Subtitle>{title}</Subtitle>
      )}
      <ol className="space-y-2">
        {steps?.map((step) => (
          <Step
            step={step}
            key={step.id}
            blockId={block.id}
            allSteps={steps}
            isEditing={isEditing}
            isAdmin={isAdmin}
            onUpdate={handleStepUpdate}
            onDelete={(id) => {
              const remaining = (steps || []).filter(s => s.id !== id);
              const updated = { ...(block.data || {}), steps: remaining };
              onChange && onChange(block.id, updated);
              // ensure page refresh when child signals deletion
              window.location.reload();
            }}
          />
        ))}
      </ol>
      {isAdmin && isEditing && (
        <button
          onClick={handleAddStep}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg cursor-pointer"
        >
          + Añadir paso
        </button>
      )}
    </section>
  );
}

StepsBlock.hasEditor = true;
