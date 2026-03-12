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

export default function SectionBlock({ block, isEditing, isAdmin, onChange, onDelete }) {
  const BlockComponent = BLOCK_RENDER[block.type];

  const handleDataChange = (e) => {
    if (!onChange) return;
    try {
      const parsed = JSON.parse(e.target.value);
      onChange(block.id, parsed);
    } catch (_) {
      // ignore invalid JSON while typing
    }
  };

  if (!BlockComponent) return null;

  // generic editor removed; each component handles its own UI
  return (
    <div className="w-full relative mb-8">
      {isAdmin && isEditing && onDelete && (
        <button
          onClick={() => onDelete(block.id)}
          className="absolute top-2 right-10 z-20 bg-red-600 text-white p-1 rounded-full shadow-md hover:bg-red-700 cursor-pointer"
          title="Eliminar bloque"
        >
          🗑
        </button>
      )}

      <BlockComponent
        block={block}
        isEditing={isEditing}
        isAdmin={isAdmin}
        onChange={onChange}
      >
        {block.children?.map(child => (
          <SectionBlock
            key={child.id}
            block={child}
            isEditing={isEditing}
            isAdmin={isAdmin}
            onChange={onChange}
            onDelete={onDelete}
          />
        ))}
      </BlockComponent>
    </div>
  );
}