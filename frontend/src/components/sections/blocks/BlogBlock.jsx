import BlogCard from "../BlogCard";

export default function BlogBlock({ block, isEditing, isAdmin, onChange }) {
  // cards are stored directly in the block's data under `cards` array
  const cards = (block.data && block.data.cards) || [];

  const handleAdd = () => {
    const newCard = { id: `new-${Date.now()}` };
    const updatedData = { ...(block.data || {}), cards: [...cards, newCard] };
    onChange && onChange(block.id, updatedData);
  };

  const handleCardUpdate = (updatedCard) => {
    const updatedCards = cards.map(c => (c.id === updatedCard.id ? updatedCard : c));
    const updatedData = { ...(block.data || {}), cards: updatedCards };
    onChange && onChange(block.id, updatedData);
  };

  const handleCardDelete = async (id) => {
    const remaining = cards.filter(c => c.id !== id);
    const updatedData = { ...(block.data || {}), cards: remaining };
    // persist immediately if block exists
    if (block.id && !String(block.id).startsWith('new-')) {
      await ContentBlockService.updateBlock(block.id, updatedData);
    }
    onChange && onChange(block.id, updatedData);
    window.location.reload();
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {isAdmin && isEditing && (
        <button
          onClick={handleAdd}
          className="col-span-full mb-4 bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
        >
          Añadir entrada de blog
        </button>
      )}
      {cards.map((card) => (
        <BlogCard
          card={card}
          key={card.id}
          blockId={block.id}          
          allCards={cards}
          isEditing={isEditing}
          isAdmin={isAdmin}
          onUpdate={handleCardUpdate}
          onDelete={handleCardDelete}
        />
      ))}
    </section>
  );
}

BlogBlock.hasEditor = true;
