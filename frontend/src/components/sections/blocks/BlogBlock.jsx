import BlogCard from "../BlogCard";

export default function BlogBlock({ block }) {
  const cards = block.children || [];

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {cards.map((card) => (
        <BlogCard
          card={card.data}
          key={card.id}
          blockId={card.id}
          allCards={cards}
        />
      ))}
    </section>
  );
}