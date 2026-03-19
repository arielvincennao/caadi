import { useState } from "react";
import CardSection from "../CardSection";
import Modal from "../../common/Modal";
import CardForm from "../../forms/CardForm";

export default function CardBlock({ block, isEditing, isAdmin, onChildrenChange }) {
  const cards = block.children?.length > 0 ? block.children : [block];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState(null);

  const handleAdd = () => {
    setEditingCard(null);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    const newChildren = cards.filter(c => c.id !== id);

    onChildrenChange(block.id, newChildren);
  };

  return (
    <>
      <section className="my-6 flex flex-col items-center">
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
        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <CardForm
            initialData={editingCard?.data}
            onSubmit={(formData) => {
              let updatedChildren;

              const newCard = {
                id: `new-${Date.now()}`,
                type: "card",
                data: formData
              };

              updatedChildren = [...cards, newCard];

              onChildrenChange?.(block.id, updatedChildren);

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
      {isAdmin && isEditing && (
          <button
            onClick={handleAdd}
            className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
          >
            + Añadir tarjeta
          </button>
        )}
    </>
  );
}
// indicate that this block type has its own editing UI
CardBlock.hasEditor = true;
