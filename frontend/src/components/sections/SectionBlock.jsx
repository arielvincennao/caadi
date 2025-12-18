import CardBlock from "./blocks/CardBlock";
import LinkBlock from "./blocks/LinkBlock";
import StepsBlock from "./blocks/StepsBlock";
import TextBlock from "./blocks/TextBlock";
import ExpandedCard from "./blocks/ExpandedCard";


const BLOCK_RENDER = {
    card: CardBlock,
    link: LinkBlock,
    steps: StepsBlock,
    text: TextBlock,
    expandedCard: ExpandedCard
};

export default function SectionBlock({ block }) {
    const BlockComponent = BLOCK_RENDER[block.type];

    if(!BlockComponent) return null;
    
    
    return <BlockComponent block={block} />;
}