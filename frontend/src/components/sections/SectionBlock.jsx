import CardBlock from "./blocks/CardBlock";
import LinkBlock from "./blocks/LinkBlock";
import StepsBlock from "./blocks/StepsBlock";
import ListBlock from "./blocks/ListBlock";

import ExpandedCardsGroup from "./blocks/ExpandedCardsGroup";


const BLOCK_RENDER = {
    card: CardBlock,
    link: LinkBlock,
    steps: StepsBlock,
    list: ListBlock,
    expandedCardsGroup : ExpandedCardsGroup
};

export default function SectionBlock({ block }) {
    const BlockComponent = BLOCK_RENDER[block.type];

    if(!BlockComponent) return null;
    
    
    return <BlockComponent block={block} />;
}