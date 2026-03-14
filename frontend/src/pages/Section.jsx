import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { SectionService } from "../api/services/SectionService";
import { ContentBlockService } from "../api/services/ContentBlockService";
import BtnBack from "../components/common/BtnBack";
import Navbar from "../components/layout/Navbar";
import { Title, Text } from "../components/Typography";
import SectionBlock from "../components/sections/SectionBlock";
import { StorageService } from "../api/services/StorageService";

/**
 * Section
 * Responsabilidades:
 * - Renderizar la sección con todos sus bloques
 * - Manejar estado local de UI
 * - Presentar datos de forma visual
 * - Permitir edición si el usuario es admin
 */
function Section({ data: initialData }) {
  const { isAuthenticated } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(initialData || {});
  const [newBlockType, setNewBlockType] = useState("");

  useEffect(() => {
    if (initialData) setEditData(initialData);
  }, [initialData]);

  if (!initialData) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      // primero actualizamos los datos básicos de la sección
      await SectionService.update(editData.id, {
        title: editData.title,
        description: editData.description,
        image: editData.image
      });

      // luego persistimos cambios en los bloques (creación/actualización)
      const persistBlocks = async (blocks, parentId = null) => {
        for (let i = 0; i < blocks.length; i++) {
          const b = blocks[i];
          if (String(b.id).startsWith("new-")) {
            // crear bloque nuevo y reemplazar el id en estado
            const created = await ContentBlockService.createBlock(
              editData.id,
              b.type,
              b.data || {},
              i,
              parentId
            );
            // update local state id
            setEditData(prev => {
              const replaceId = (blocksList) => {
                return blocksList.map(x => {
                  if (x.id === b.id) {
                    return { ...x, id: created.id };
                  }
                  if (x.children) {
                    return { ...x, children: replaceId(x.children) };
                  }
                  return x;
                });
              };
              return {
                ...prev,
                rootBlocks: replaceId(prev.rootBlocks || [])
              };
            });
            // continue with children if any (unlikely initially)
            await persistBlocks(b.children || [], created.id);
          } else {
            await ContentBlockService.updateBlock(b.id, b.data || {});
            if (b.children && b.children.length) {
              await persistBlocks(b.children, b.id);
            }
          }
        }
      };

      await persistBlocks(editData.rootBlocks || []);

      setIsEditing(false);
    } catch (err) {
      console.error("Error guardando sección:", err);
    }
  };

  const rootBlocks = editData.rootBlocks ?? [];

  // helper to update a block recursively by id
  const updateBlockById = (blocks, id, updater) => {
    return blocks.map(b => {
      if (b.id === id) {
        return typeof updater === 'function' ? updater(b) : updater;
      }
      if (b.children) {
        return { ...b, children: updateBlockById(b.children, id, updater) };
      }
      return b;
    });
  };

  // remove a block (and its descendants) from the tree by id
  const removeBlockById = (blocks, id) => {
    return blocks
      .filter(b => b.id !== id)
      .map(b => {
        if (b.children) {
          return { ...b, children: removeBlockById(b.children, id) };
        }
        return b;
      });
  };

  const handleBlockChange = (id, newData) => {
    setEditData(prev => ({
      ...prev,
      rootBlocks: updateBlockById(prev.rootBlocks || [], id, b => ({ ...b, data: newData }))
    }));
  };

  const handleBlockDelete = async (id) => {
    // optimistically remove from state
    setEditData(prev => ({
      ...prev,
      rootBlocks: removeBlockById(prev.rootBlocks || [], id)
    }));

    // if block already exists in DB, delete it immediately
    if (id && !String(id).startsWith("new-")) {
      try {
        await ContentBlockService.deleteBlock(id);
      } catch (err) {
        console.error("Error borrando bloque en la DB:", err);
      }
    }
    // refresh page after deletion to reflect backend state
    window.location.reload();
  };


  const handleAddBlock = (type) => {
    let newBlock = { id: `new-${Date.now()}`, type, children: [] };
    switch (type) {
      case 'card':
        newBlock.data = {};
        break;
      case 'link':
        newBlock.data = { name: '', href: '', icon: '' };
        break;
      case 'map':
        newBlock.data = { section: '', officeId: '', title: '' };
        break;
      case 'steps':
        newBlock.data = { title: '', steps: [] };
        break;
      case 'list':
        // start with a single example list item for convenience
        newBlock.data = { title: '', list: [{ id: 1, text: 'Ejemplo de texto' }] };
        break;
      case 'expandedCardsGroup':
        // start with empty children array
        break;
      case 'blogEntry':
        // will create container for cards
        break;
      default:
        newBlock.data = {};
    }
    setEditData(prev => ({
      ...prev,
      rootBlocks: [...(prev.rootBlocks || []), newBlock]
    }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <Navbar />

      <div className="absolute top-23 left-4 mt-5 md:top-25 md:left-10 z-10">
        <BtnBack />
      </div>

      <div className="p-3 md:w-6xl pt-20 md:pt-3 w-full mx-auto">

        {isAuthenticated && (
          <div className="mb-6 p-4 bg-white border-l-4 border-blue-600 shadow-sm flex justify-between items-center rounded-r-lg">
            <span className="font-bold text-blue-800">Panel de Administración</span>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setIsEditing(!isEditing);
                  if (isEditing) setEditData(initialData);
                }}
                className={`px-4 py-2 rounded font-medium transition ${isEditing ? 'bg-red-100 text-red-600' : 'bg-blue-600 text-white'}`}
              >
                {isEditing ? "Cancelar" : "Editar Sección"}
              </button>
              {isEditing && (
                <button
                  onClick={handleSave}
                  className="bg-green-600 text-white px-6 py-2 rounded font-medium hover:bg-green-700"
                >
                  Guardar
                </button>
              )}
            </div>
          </div>
        )}

        <section className="flex flex-col items-center text-center md:text-left md:items-start mb-8 w-full">
          <div className="w-full relative mb-6">
            {editData.image && (
              <img
                src={editData.image}
                alt={editData.title}
                className={`w-full max-h-64 md:max-h-96 object-cover rounded-lg ${isEditing ? 'opacity-50 ring-4 ring-blue-400' : ''}`}
              />
            )}
            {isEditing && (
              <div className="mt-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Cambiar imagen</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    try {
                      const url = await StorageService.uploadImage('section_covers', file);
                      setEditData(prev => ({ ...prev, image: url }));
                    } catch (err) {
                      console.error("Error subiendo imagen:", err);
                    }
                  }}
                  className="w-full p-2 border rounded text-sm bg-white"
                />
              </div>
            )}
          </div>

          <div className="w-full mb-2">
            {isEditing ? (
              <div className="flex flex-col">
                <label className="text-xs font-bold text-blue-600 uppercase">Título</label>
                <input
                  name="title"
                  value={editData.title || ""}
                  onChange={handleChange}
                  className="text-3xl font-bold border-b-2 border-blue-500 bg-transparent outline-none w-full py-2"
                />
              </div>
            ) : (
              <Title>{editData.title}</Title>
            )}
          </div>

          <div className="w-full mb-4">
            {isEditing ? (
              <div className="flex flex-col">
                <label className="text-xs font-bold text-blue-600 uppercase">Descripción</label>
                <textarea
                  name="description"
                  value={editData.description || ""}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-3 border-2 border-blue-100 rounded-lg outline-none focus:border-blue-500 bg-white"
                />
              </div>
            ) : (
              <Text>{editData.description}</Text>
            )}
          </div>
        </section>

        {isAuthenticated && isEditing && (
          <div className="mb-4 flex items-center gap-2">
            <select
              value={newBlockType}
              onChange={(e) => setNewBlockType(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="" disabled>Seleccione tipo de bloque</option>
              <option value="card">Card</option>
              <option value="link">Link</option>
              <option value="map">Map</option>
              <option value="steps">Steps</option>
              <option value="list">List</option>
              <option value="expandedCardsGroup">Expanded Cards Group</option>
              <option value="blogEntry">Blog Entry</option>
            </select>
            <button
              disabled={!newBlockType}
              onClick={() => {
                if (newBlockType) {
                  handleAddBlock(newBlockType);
                  setNewBlockType("");
                }
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Añadir bloque
            </button>
          </div>
        )}

        {rootBlocks.map((block) => (
          <SectionBlock
            key={block.id}
            block={block}
            isEditing={isEditing}
            isAdmin={isAuthenticated}
            onChange={handleBlockChange}
            onDelete={handleBlockDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default Section;
