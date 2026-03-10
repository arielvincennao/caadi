import BlogCard from "../BlogCard";

export default function BlogBlock({ block }) {
  const cards = block.data?.cards || [];

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {cards.map((card) => (
        <BlogCard
          card={card}
          key={card.id}
          blockId={block.id}
          allCards={cards}
        />
      ))}
    </section>
  );
}