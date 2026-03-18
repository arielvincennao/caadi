import { useState } from "react";
import CardSection from "../CardSection";
import Modal from "../../common/Modal";
import CardForm from "../../forms/CardForm";

export default function CardBlock({ block, isEditing, isAdmin, onChange }) {
  const cards = block.children || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState(null);

  const handleAdd = () => {
    setEditingCard(null);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    const newChildren = cards.filter(c => c.id !== id);

    onChange(block.id, {
      children: newChildren
    });
  };

  return (
    <>
      <section className="my-6 flex flex-col items-center">

        {isAdmin && isEditing && (
          <button
            onClick={handleAdd}
            className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Añadir tarjeta
          </button>
        )}

        <div className="flex flex-wrap gap-6 justify-center">
          {cards.map((card) => (
            <CardSection
              key={card.id}
              card={card.data}
              isAdmin={isAdmin && isEditing}
              onEdit={() => {
                setEditingCard(card);
                setIsModalOpen(true);
              }}
              onDelete={() => handleDelete(card.id)}
            />
          ))}
        </div>
      </section>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <CardForm
            initialData={editingCard?.data}
            onSubmit={(formData) => {
              let updatedChildren;

              if (editingCard) {
                updatedChildren = cards.map(c =>
                  c.id === editingCard.id
                    ? { ...c, data: formData }
                    : c
                );
              } else {
                const newCard = {
                  id: `new-${Date.now()}`,
                  type: "card",
                  data: formData
                };

                updatedChildren = [...cards, newCard];
              }

              onChange(block.id, {
                children: updatedChildren
              });

              setIsModalOpen(false);
              setEditingCard(null);
            }}
            onCancel={() => {
              setIsModalOpen(false);
              setEditingCard(null);
            }}
          />
        </Modal>
      )}
    </>
  );
}
// indicate that this block type has its own editing UI
CardBlock.hasEditor = true;
