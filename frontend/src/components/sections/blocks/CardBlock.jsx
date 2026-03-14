import CardSection from "../CardSection";

export default function CardBlock({ block, isEditing, isAdmin, onChange }) {
  const handleUpdate = (newData) => {
    onChange && onChange(block.id, newData);
  };

  return (
    <div className="my-6 flex justify-center">
      <CardSection
        card={block.data || {}}
        blockId={block.id}
        isEditing={isEditing}
        isAdmin={isAdmin}
        onUpdate={handleUpdate}
      />
    </div>
  );
}

// indicate that this block type has its own editing UI
CardBlock.hasEditor = true;
