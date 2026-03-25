import { useState, useEffect } from "react";
import Step from "../Step";
import { Subtitle } from "../../Typography";
import { useLocalEditing } from "../../../hooks/useLocalEditing";
import { updateBlockData } from "../../../utils/blockHelpers";
import BtnControl from "../../common/BtnControl";
import { Icon } from "../../common/Icon";
import Modal from "../../common/Modal";
import StepForm from "../../forms/StepForm";

export default function StepsBlock({ block, isEditing, isAdmin, onChange }) {
  const { title, steps } = block.data || {};
  const [localTitle, setLocalTitle] = useState(title || "");
  const { localEditing, startEditing, stopEditing } = useLocalEditing();
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    setLocalTitle(title || "");
  }, [title]);

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setLocalTitle(value);
    updateBlockData(block, onChange, { title: value });

  };

  const handleAddStep = (stepData) => {
    const newStep = {
      id: Date.now(),
      description: stepData.description,
      icon: stepData.icon
    }
    updateBlockData(block, onChange, { steps: [...(steps || []), newStep] });
    setIsModalOpen(false);
  };

  const handleStepUpdate = (updatedStep) => {
    const updatedSteps = (steps || []).map(s =>
      s.id === updatedStep.id ? updatedStep : s
    );
    updateBlockData(block, onChange, { steps: updatedSteps });
  };

  const handleStepDelete = (id) => {
    const remaining = (steps || []).filter(s => s.id !== id);
    updateBlockData(block, onChange, { steps: remaining });
  }

  return (
    <>
      <section className={`relative ${isAdmin && isEditing ? 'pt-12' : ''} mb-6`}>
        {isAdmin && isEditing && (
          <div className="absolute top-6 -right-2 z-10">
            {!localEditing ? (
              <BtnControl onClick={startEditing} title={"Editar bloque"} className={"p-2 bg-blue-600 hover:bg-blue-700 text-white"}><Icon name={"editar"} className={"w-5 h-5"} /></BtnControl>

            ) : (
              <BtnControl onClick={stopEditing} title={"Dejar de editar bloque"} className={"p-2 bg-green-600 hover:bg-green-700 text-white cursor-pointer"}><Icon name={"check"} className={"w-5 h-5"} /></BtnControl>
            )}
          </div>
        )}
        {isAdmin && isEditing && localEditing ? (
          <div>
            <label className="text-xs font-bold text-blue-600 uppercase">Titulo</label>
            <input
              className="text-3xl font-bold border-b-2 border-blue-500 bg-transparent outline-none w-full py-2"
              value={localTitle}
              onChange={handleTitleChange}
              placeholder="Título"
            />
          </div>
        ) : (
          <Subtitle>{title}</Subtitle>
        )}
        <ol className="space-y-2">
          {steps?.map((step, index) => (
            <Step
              step={step}
              key={step.id}
              stepNumber={index + 1}
              isEditing={isEditing}
              isAdmin={isAdmin}
              onUpdate={handleStepUpdate}
              onDelete={handleStepDelete}
            />
          ))}
        </ol>
        {isAdmin && isEditing && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg cursor-pointer hover:bg-blue-700"
          >
            + Añadir paso
          </button>
        )}
      </section>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <StepForm
          onSubmit={(stepData) => {
            handleAddStep(stepData);
            setIsModalOpen(false);
          }}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </>
  );
}

StepsBlock.hasEditor = true;
