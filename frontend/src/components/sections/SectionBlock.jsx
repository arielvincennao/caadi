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

  const isEditMode = isAdmin && isEditing;

  return (
    <div 
      className={`w-full mb-8 flex flex-col relative transition-all duration-300 ${
        isEditMode 
          ? "p-5 sm:p-6 border-2 border-dashed border-blue-400 bg-blue-50/40 rounded-2xl shadow-sm mt-6" 
          : ""
      }`}
    >
      {/* Etiqueta indicadora del tipo de bloque (solo visible al editar) */}
      {isEditMode && (
        <div className="absolute -top-3 left-4 bg-blue-600 text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider z-10 shadow-md">
          Bloque: {block.type}
        </div>
      )}

      {/* Botón de eliminar (reubicado para que flote en la esquina de la card) */}
      {isEditMode && onDelete && (
        <BtnControl 
          onClick={() => onDelete(block.id)}
          title={"Eliminar bloque"}
          className="absolute -top-3 right-4 bg-red-600 hover:bg-red-700 p-2 w-9 h-9 z-10 shadow-md"
        >
          <Icon name={"eliminar"} className={"w-5 h-5 text-white"} />
        </BtnControl>
      )}

      {/* Contenedor del componente hijo con margen superior si estamos editando para que no pise la etiqueta */}
      <div className={isEditMode ? "mt-4" : ""}>
        <BlockComponent
          block={block}
          isEditing={isEditing}
          isAdmin={isAdmin}
          onChange={onChange}
          onChildrenChange={onChildrenChange}
        />
      </div>
    </div>
  );
}