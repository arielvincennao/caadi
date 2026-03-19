import { useState } from "react";
import { ContentBlockService } from "../../../api/services/ContentBlockService";
import BlogCard from "../BlogCard";
import Modal from "../../common/Modal";
import BlogForm from "../../forms/BlogForm";

export default function BlogBlock({ block, isAdmin, isEditing, onChildrenChange }) {
  const [file, setFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cards = block.children || [];

  const handleAdd = (formData) => {
    const newCard = {
      id: `new-${Date.now()}`,
      type: "card",
      data: formData
    };

    onChildrenChange(block.id, [...cards, newCard]);
  };

  const handleDelete = async (id) => {
    const newChildren = cards.filter(c => c.id !== id);

    onChildrenChange(block.id, newChildren);

    if (!String(id).startsWith("new-")) {
      await ContentBlockService.deleteBlock(id);
    }
  };
  return (
    <section className="mb-10">
      {isAdmin && isEditing && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full mb-4 bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700"
        >
          + Añadir entrada de blog
        </button>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <BlogCard
            card={card.data}
            key={card.id}
            blockId={card.id}
            onDelete={isAdmin && isEditing ? handleDelete : null}
          />
        ))}
      </div>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <BlogForm
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