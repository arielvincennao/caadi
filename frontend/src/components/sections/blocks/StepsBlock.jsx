import Step from "../Step";
import { Subtitle } from "../../Typography";

export default function StepsBlock( { block }){ 
return (
            <section key={block.id} className="">
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