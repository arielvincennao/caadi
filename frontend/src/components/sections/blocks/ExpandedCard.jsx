import { useState } from "react";
import CardSection from "../CardSection";
import SectionBlock from "../SectionBlock";


export default function ExpandedCard( { block }){
    const [selected, setSelected] = useState(false);

    return(
        <section key={block.id} className="">
            <CardSection card={block.card} onClick={() => setSelected(!selected)} className="md:mr-5 mb-2.5" />
            {selected && (
                <div>
                    {block.content.map((currentBlock) => (
                        <SectionBlock key={currentBlock.id} block={currentBlock} />
                    ))}
                </div>
                )   
            }
        </section>

    );
}