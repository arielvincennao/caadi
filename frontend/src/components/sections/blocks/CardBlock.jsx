import CardSection from "../CardSection";

export default function CardBlock({ block }){
     return (
            <section key={block.id} className="my-6 flex flex-col items-center justify-center md:flex-row">
                {block.cards.map((card) => (
                    <CardSection card={card} key={card.id} className="md:mr-5 mb-2.5" />
                ))
                }
            </section>
        );
}