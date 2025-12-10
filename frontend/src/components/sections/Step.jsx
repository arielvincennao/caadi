import { Subsubtitle } from "../Typography";

export default function Step({ step }) {
  return (
    <li className="flex items-center gap-4">
      <img src={step.icon} alt="" className="w-10 h-10" />
      <div>
        <Subsubtitle>Paso {step.id}</Subsubtitle>
        <p>{step.description}</p>
      </div>
    </li>
  );
}
