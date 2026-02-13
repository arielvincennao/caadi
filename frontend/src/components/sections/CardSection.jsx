import { Text } from "../Typography";
import { Icon } from "../common/Icon";

export default function CardSection({ card, className, onClick }) {
    const isLink = Boolean(card.href);
    const isExpanded = Boolean(onClick);
    const Wrapper = isLink ? "a" : isExpanded ? "button" : "div";
    return (
        <Wrapper
            {...(isLink && {
                href:card.href,
                target:"_blank"
            })}
            {...(isExpanded && {
                type:"button",
                onClick
            })}

            className={`flex flex-col items-center text-center max-w-sm p-6 border rounded-2xl bg-[#FCFCFC] border-gray-400 cursor-pointer ${className}`}
        >
    
            <Icon name={card.icon} className="w-16 h-16" />
            <h4 className={`mb-3 text-2xl font-semibold leading-8`}>{card.title}</h4>
            <Text>{card.description}</Text>
        </Wrapper>
    );
}