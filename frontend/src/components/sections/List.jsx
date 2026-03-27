import { useEffect, useState } from "react";
import BtnControl from "../common/BtnControl";
import { Icon } from "../common/Icon";

export default function List({
  item: initialItem, isEditing: sectionEditing, isAdmin, onUpdate, onDelete, isActiveEditing,
  className = ""
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [item, setItem] = useState(initialItem);

 useEffect(() =>{
  if(isActiveEditing) setIsEditing(true);
 }, [isActiveEditing]);

  useEffect(() => {
    setItem(initialItem);
  }, [initialItem]);

  const handleChange = (e) => {
    setItem({ ...item, text: e.target.value });
  }

  const handleSave = () => {
    if (onUpdate) onUpdate(item);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (onDelete) onDelete(item.id);
  };
  return (
    <li className={`mt-4 ${className}`}>
      {isAdmin && (
        <div className="absolute right-0 flex gap-1 transition">
          {!isEditing ? (
            <>
              <BtnControl onClick={() => setIsEditing(true)}
                title={"Editar bloque"}
                className={"p-2 bg-blue-600 hover:bg-blue-700 text-white"}>
                <Icon name={"editar"} className={"w-5 h-5"} />
              </BtnControl>

              <BtnControl onClick={handleDelete}
                title={"Eliminar item"}
                className="bg-red-600 hover:bg-red-700 p-2"
              >
                <Icon name={"eliminar"} className={"w-5 h-5"} />
              </BtnControl>
            </>
          ) : (
            <>
              <BtnControl onClick={handleSave}
                title={"Guardar cambios"}
                className="bg-green-600 hover:bg-green-700 p-2"
              >
                <Icon name={"check"} className={"w-5 h-5"} />
              </BtnControl>
            </>
          )}
        </div>
      )}

      {isEditing ? (
        <input
          value={item.text}
          onChange={handleChange}
          className="flex-1 p-1 border-2 border-blue-600 w-[90%] rounded outline-none"
          autoFocus
        />
      ) : (
        <span>{item.text}</span>
      )}
    </li>
  );
}
