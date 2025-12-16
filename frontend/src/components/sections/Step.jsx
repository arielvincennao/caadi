import { Subsubtitle } from "../Typography";
import { Icon } from "../common/Icon";

export default function Step({ step }) {
  return (
    <li className="flex items-center gap-4 my-4">
      <Icon name={step.icon} className="w-10 h-10" />
      <div>
        <Subsubtitle className="md:text-xl">Paso {step.id}</Subsubtitle>
        <p>{step.description}</p>
      </div>
    </li>
  );
}
