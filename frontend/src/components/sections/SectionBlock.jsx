import Step from "./Step";
import List from "./List";
import CardSection from "./CardSection";
import { Subtitle } from "../Typography";
import Button from "../common/Button";

export default function SectionBlock({ block }) {
    if (block.type === "steps") {
        return (
            <section key={block.id} className="my-6 space-y-4">
                <Subtitle>{block.title}</Subtitle>
                <ol>
                    {block.steps.map((step) => (
                        <Step step={step} key={step.id} />
                    ))
                    }
                </ol>
            </section>
        );
    }

    if (block.type === "text") {
        return (
            <section key={block.id} className="my-6">
                <Subtitle>{block.title}</Subtitle>
                {block.list.map((poslist) => (
                    <List text={poslist.text} key={poslist.id} />
                ))}
            </section>
        );
    }

    if (block.type === "link") {
        return (
            <Button className="main-button mb-5" href={block.href} key={block.id} icon={block.icon}>
                {block.name}
            </Button>
        )
    }

    if (block.type === "card") {
        return (
            <section key={block.id} className="my-6 flex flex-col items-center justify-center md:flex-row">
                {block.cards.map((card) => (
                    <CardSection card={card} key={card.id} className="md:mr-5 mb-2.5" />
                ))
                }
            </section>
        );
    }
}