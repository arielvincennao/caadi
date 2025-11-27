import { pagesSteps } from "../../data/pagesSteps";
import Step from "../../components/sections/Step";
import { Title } from "../../components/Typography";

export default function Cud() {
  const steps = pagesSteps.cud.steps;

  return (
    <div className="p-4 space-y-4">
        <Title>Certificado Único de Discapacidad</Title>

      {steps.map(step => (
        <Step 
          key={step.id}
          stepIcon ={step.icon}
          stepNumber={step.id}
          text={step.description}
        />
      ))}
    </div>
  );
}
