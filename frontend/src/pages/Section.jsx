import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { SectionService } from "../api/services/SectionService";
import { ContentBlockService } from "../api/services/ContentBlockService";
import BtnBack from "../components/common/BtnBack";
import Navbar from "../components/layout/Navbar";
import SectionBlock from "../components/sections/SectionBlock";
import AddBlockSelector from "../components/sections/AddBlockSelector";
import AdminSectionPanel from "../components/sections/AdminSectionPanel";
import SectionHeader from "../components/sections/SectionHeader";
import { BLOCK_DEFAULTS } from "../config/blockDefaults";
import { BLOCK_FORMS } from "../config/blockForms";
import Modal from "../components/common/Modal";
import { BLOCKS_WITH_MODAL } from "../utils/blocksWithForm";
import { Subtitle } from "../components/Typography";

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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalBlockType, setModalBlockType] = useState(null);
    const [tempSubtype, setTempSubtype] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        setEditData(initialData || {});
    }, [initialData]);

    if (!initialData) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        setIsSaving(true);
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
        } finally {
            setIsSaving(false);
        }
    };

    const rootBlocks = editData.rootBlocks ?? [];

    // helper to update a block recursively by id
    const updateBlockById = (blocks, id, updater) => {
        return blocks.map(block => {
            if (block.id === id) {
                return updater(block);
            }

            if (Array.isArray(block.children)) {
                return {
                    ...block,
                    children: updateBlockById(block.children, id, updater)
                };
            }

            return block;
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
            rootBlocks: updateBlockById(
                prev.rootBlocks || [],
                id,
                (b) => ({
                    ...b,
                    data: {
                        ...(b.data || {}),
                        ...newData
                    }
                })
            )
        }));
    };

    const handleBlockChildrenChange = (id, newChildren) => {
        setEditData(prev => ({
            ...prev,
            rootBlocks: updateBlockById(
                prev.rootBlocks || [],
                id,
                (b) => ({
                    ...b,
                    children: newChildren // 👈 SIEMPRE lo setea
                })
            )
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
    };

    const handleAddBlock = (type, formData = null) => {
        const config = BLOCK_DEFAULTS[type] || {};
        let newBlock = {
            id: `new-${Date.now()}`,
            type,
            data: formData || config.data || {},

        };

        if (config.children) {
            newBlock.children = config.children;
        }

        setEditData(prev => ({
            ...prev,
            rootBlocks: [...(prev.rootBlocks || []), newBlock]
        }));
    };

    const FormComponent = BLOCK_FORMS[modalBlockType];

    return (
        <>
            <div className="min-h-screen flex flex-col items-center">
                <Navbar />
                {isSaving && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                        <Subtitle className="text-white p-0 m-0">Guardando...</Subtitle>
                    </div>
                )}
                <div className="absolute top-23 left-4 mt-5 md:top-25 md:left-10 z-10">
                    <BtnBack />
                </div>

                <div className="p-3 md:w-6xl pt-20 md:pt-3 w-full mx-auto">

                    {isAuthenticated && (
                        <AdminSectionPanel
                            isEditing={isEditing}
                            onToggleEdit={() => {
                                setIsEditing(!isEditing);
                                if (isEditing) setEditData(initialData);
                            }}
                            onSave={handleSave}
                        />
                    )}

                    <SectionHeader
                        data={editData}
                        isEditing={isEditing}
                        onChange={handleChange}
                        setEditData={setEditData} />


                    {isAuthenticated && isEditing && (
                        <AddBlockSelector
                            newBlockType={newBlockType}
                            setNewBlockType={setNewBlockType}
                            onAdd={async (rawType) => {
                                const [type, subtype] = rawType.split(":");
                                if (BLOCKS_WITH_MODAL.includes(type)) {
                                    setModalBlockType(type);
                                    setIsModalOpen(true);
                                    setTempSubtype(subtype);
                                    setNewBlockType("");

                                    return;
                                }

                                //si es de este tipo, se crea en la base de datos inmediatamente para obtener el id y poder agregarlo al estado con el id real (no el temporal "new-")
                                if (type === 'expandedCardsGroup' || type === 'blogEntry') {
                                    try {
                                        const created = await ContentBlockService.createBlock(
                                            editData.id, type, { subtype }, editData.rootBlocks?.length || 0, null
                                        );
                                        setEditData(prev => ({
                                            ...prev,
                                            rootBlocks: [...(prev.rootBlocks || []), {
                                                id: created.id,
                                                type,
                                                data: { subtype },
                                                children: [],
                                                section_id: editData.id
                                            }]
                                        }));
                                    } catch (err) {
                                        console.error("Error creando bloque:", err);
                                    }
                                    setNewBlockType("");
                                    return;
                                }

                                handleAddBlock(type, subtype ? { subtype } : null);
                                setNewBlockType("");
                            }}
                        />
                    )}

                    {rootBlocks.map((block) => (
                        <SectionBlock
                            key={block.id}
                            block={block}
                            isEditing={isEditing}
                            isAdmin={isAuthenticated}
                            onChange={handleBlockChange}
                            onChildrenChange={handleBlockChildrenChange}
                            onDelete={handleBlockDelete}
                        />
                    ))}
                </div>
            </div>
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                {FormComponent && (
                    <FormComponent
                        variant={tempSubtype}
                        onSubmit={(data) => {
                            handleAddBlock(modalBlockType, { ...data, ...(tempSubtype && { subtype: tempSubtype }) });
                            setTempSubtype(null);
                            setIsModalOpen(false);
                        }}
                        onCancel={() => setIsModalOpen(false)}
                    />
                )}
            </Modal>
        </>
    );
}

export default Section;
