import BlogCard from "../BlogCard";

export default function CardBlock({ block }){
     return (
            <section key={block.id} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {block.cards.map((card) => (
                    <BlogCard card={card} key={card.id} />
                ))
                }
            </section>
        );
}