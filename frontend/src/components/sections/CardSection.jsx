import { Text } from "../Typography";

export default function CardSection({ card, className }) {
    return (
        <a href={card.href} target="_blank" className={`flex flex-col items-center text-center max-w-sm p-6 border rounded-2xl border-gray-400 ${className}`}>
            <img src={card.icon} alt="" className="w-16 h-16" />
            <h5 className={`mb-3 text-2xl font-semibold tracking-tight text-heading leading-8`}>{card.title}</h5>
            <Text>{card.description}</Text>
        </a>
    );
}