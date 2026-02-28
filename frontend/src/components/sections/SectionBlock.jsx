import CardBlock from "./blocks/CardBlock";
import LinkBlock from "./blocks/LinkBlock";
import StepsBlock from "./blocks/StepsBlock";
import ListBlock from "./blocks/ListBlock";
import BlogBlock from "./blocks/BlogBlock";
import MapBlock from "./blocks/MapBlock";

import ExpandedCardsGroup from "./blocks/ExpandedCardsGroup";


const BLOCK_RENDER = {
    card: CardBlock,
    link: LinkBlock,
    map: MapBlock,
    steps: StepsBlock,
    list: ListBlock,
    expandedCardsGroup : ExpandedCardsGroup,
    blogEntry: BlogBlock
};

export default function SectionBlock({ block }) {
    const BlockComponent = BLOCK_RENDER[block.type];

    if(!BlockComponent) return null;
    
    
    return <BlockComponent block={block} />;
}