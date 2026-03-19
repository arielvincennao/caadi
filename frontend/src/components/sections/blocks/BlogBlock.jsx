import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { ContentBlockService } from "../../../api/services/ContentBlockService";
import BlogCard from "../BlogCard";
import Modal from "../../common/Modal";
import BlogForm from "../../forms/BlogForm";

export default function BlogBlock({ block, isEditing }) {
  const { isAuthenticated } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cards = block.children || [];

  const handleAdd = async (formData) => {
    try {
      await ContentBlockService.createBlock(
        block.section_id,
        'card',
        formData,
        cards.length,
        block.id
      );
      window.location.reload();
    } catch (err) {
      console.error("Error agregando card:", err);
    }
  };

  const handleCardDelete = async (cardId) => {
    try {
      await ContentBlockService.deleteBlock(cardId);
      window.location.reload();
    } catch (err) {
      console.error("Error eliminando card:", err);
    }
  };

  return (
    <section className="mb-10">
      {isAuthenticated && isEditing && (
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
            onDelete={isAuthenticated && isEditing ? handleCardDelete : null}
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