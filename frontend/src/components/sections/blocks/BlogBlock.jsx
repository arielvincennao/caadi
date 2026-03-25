import { useState } from "react";
import { ContentBlockService } from "../../../api/services/ContentBlockService";
import BlogCard from "../BlogCard";
import Modal from "../../common/Modal";
import BlogForm from "../../forms/BlogForm";

export default function BlogBlock({ block, isAdmin, isEditing, onChildrenChange }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cards = block.children || [];
  const subtype = block.data?.subtype;

const handleAdd = (formData) => {
    const newCard = {
      id: `new-${Date.now()}`,
      type: "card",
      data: {...formData, subtype}
    };

    onChildrenChange(block.id, [...cards, newCard]);
  };

  const handleDelete = async (identifier) => {
    const newChildren = cards.filter(c => c.id !== identifier && c.tempId !== identifier);

    onChildrenChange(block.id, newChildren);

    // Si no tiene el prefijo "new-", es un registro real y lo borramos de la BD
    if (!String(identifier).startsWith("new-")) {
      await ContentBlockService.deleteBlock(identifier);
    }
  };

  const handleUpdate = (identifier, updatedData) => {
    const newChildren = cards.map(c => {
      const currentId = c.id || c.tempId;
      if (currentId === identifier) {
        return { ...c, data: updatedData };
      }
      return c;
    });
    
    onChildrenChange(block.id, newChildren);
  };

  return (
    <section className="mb-10">
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => {
          const cardKey = card.id || card.tempId;
          return (
            <BlogCard
              card={card.data}
              key={cardKey}
              blockId={card.id}
              isEditable={isAdmin && isEditing}
              onDelete={isAdmin && isEditing ? handleDelete : null}
              onUpdate={isAdmin && isEditing ? (updatedData) => handleUpdate(cardKey, updatedData) : null}
            />
          );
        })}
      </div>
      {isAdmin && isEditing && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full mt-10 bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700"
        >
          + Añadir entrada de blog
        </button>
      )}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <BlogForm
          variant={subtype}
          onSubmit={(formData) => {
            handleAdd(formData);
            setIsModalOpen(false);
          }}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </section>
  );
}