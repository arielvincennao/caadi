import { Text } from "../Typography";
import { Icon } from "../common/Icon";

export default function CardSection({ card, className }) {
    return (
        <a href={card.href} target="_blank" className={`flex flex-col items-center text-center max-w-sm p-6 border rounded-2xl border-gray-400 ${className}`}>
            <Icon name={card.icon} className="w-16 h-16" />
            <h4 className={`mb-3 text-2xl font-semibold leading-8`}>{card.title}</h4>
            <Text>{card.description}</Text>
        </a>
    );
}