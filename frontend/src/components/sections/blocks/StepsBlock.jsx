import Step from "../Step";
import { Subtitle } from "../../Typography";

export default function StepsBlock({ block }) {
  const { title, steps } = block.data || {};

  return (
    <section>
      <Subtitle>{title}</Subtitle>
      <ol>
        {steps?.map((step) => (
          <Step
            step={step}
            key={step.id}
            blockId={block.id}
            allSteps={steps}
          />
        ))}
      </ol>
    </section>
  );
}