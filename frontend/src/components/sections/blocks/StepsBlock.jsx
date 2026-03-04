import Step from "../Step";
import { Subtitle } from "../../Typography";

export default function StepsBlock({ block }) {
  const { title, steps } = block.data || {};

  return (
    <section className="">
      <Subtitle>{title}</Subtitle>

      <ol>
        {steps?.map((step) => (
          <Step step={step} key={step.id} />
        ))}
      </ol>
    </section>
  );
}