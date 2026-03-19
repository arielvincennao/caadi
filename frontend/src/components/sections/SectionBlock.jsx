import CardBlock from "./blocks/CardBlock";
import LinkBlock from "./blocks/LinkBlock";
import StepsBlock from "./blocks/StepsBlock";
import ListBlock from "./blocks/ListBlock";
import BlogBlock from "./blocks/BlogBlock";
import MapBlock from "./blocks/MapBlock";
import ExpandedCardsGroup from "./blocks/ExpandedCardsGroup";
import BtnControl from "../common/BtnControl";
import { Icon } from "../common/Icon";

const BLOCK_RENDER = {
  card: CardBlock,
  link: LinkBlock,
  map: MapBlock,
  steps: StepsBlock,
  list: ListBlock,
  expandedCardsGroup: ExpandedCardsGroup,
  blogEntry: BlogBlock
};

export default function SectionBlock({ block, isEditing, isAdmin, onChange, onDelete, onChildrenChange }) {
  const BlockComponent = BLOCK_RENDER[block.type];

  if (!BlockComponent) return null;

  return (
    <div className="w-full mb-8">
      {isAdmin && isEditing && onDelete && (

        <BtnControl onClick={() => onDelete(block.id)}
          title={"Eliminar bloque"}
          className="bg-red-600 hover:bg-red-700 p-2"
        >
          <Icon name={"eliminar"} className={"w-5 h-5"} />
        </BtnControl>

      )}

      <BlockComponent
        block={block}
        isEditing={isEditing}
        isAdmin={isAdmin}
        onChange={onChange}
        onChildrenChange={onChildrenChange}
      >
      </BlockComponent>
    </div>
  );
}