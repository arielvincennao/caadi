import { useState, useRef, useEffect } from "react";
import ChildBlockSelector from "../ChildrenBlockSelector";
import Modal from "../../common/Modal";
import CardForm from "../../forms/CardForm";
import CardSection from "../CardSection";
import SectionBlock from "../SectionBlock";
import { BLOCK_FORMS } from "../../../config/blockForms";
import { BLOCKS_WITH_MODAL } from "../../../utils/blocksWithForm";


export default function ExpandedCardsGroup({ block, isEditing, isAdmin, onChildrenChange, onChange, onDelete }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalBlockType, setModalBlockType] = useState(null);
    const [isChildModalOpen, setIsChildModalOpen] = useState(false);
    const [activeId, setActiveId] = useState(null);

    const FormComponent = BLOCK_FORMS[modalBlockType];

    const cardRefs = useRef({});
    const desktopContentRef = useRef(null);

    const cards = block.children || [];

    const activeCard = cards.find(card => card.id === activeId); onDelete

    //busco el id de la card actual y busco la siguiente. Lógica para poder navegar a la siguiente card con el lector de pantalla con el TAB
    const currentIndex = cards.findIndex(card => card.id === activeId);
    const nextCard = currentIndex >= 0 ? cards[currentIndex + 1] : null;

    const handleAdd = (formData) => {
        const newCard = {
            id: `new-${crypto.randomUUID()}`,
            type: "card",
            data: formData,
            children: []
        };

        const updatedChildren = [...cards, newCard];

        onChildrenChange?.(block.id, updatedChildren);
    };

    const handleDeleteCard = (cardId) => {
        if (activeId === cardId) setActiveId(null);
        if (onDelete) {
            onDelete(cardId);
        } else {
            const updatedCards = cards.filter(card => card.id !== cardId);
            onChildrenChange?.(block.id, updatedCards);
        }
    };

    const handleDeleteChild = (childId) => {
        if (onDelete) {
            onDelete(childId); // Borra el bloque interior de la BD y del estado
        } else {
            const updatedCards = cards.map(card => {
                if (card.id === activeId) {
                    return {
                        ...card,
                        children: (card.children || []).filter(child => child.id !== childId)
                    };
                }
                return card;
            });
            onChildrenChange?.(block.id, updatedCards);
        }
    };

    const handleAddChildBlock = (type, formData = null) => {
        if (!activeId) return;

        const newChild = {
            id: `new-${crypto.randomUUID()}`,
            type: type,
            data: formData || {},
            children: []
        };

        // Buscamos la card activa y actualizamos sus hijos
        const updatedCards = cards.map(card => {
            if (card.id === activeId) {
                return {
                    ...card,
                    children: [...(card.children || []), newChild]
                };
            }
            return card;
        });

        onChildrenChange?.(block.id, updatedCards);
    };

    // funcion para editar hijos
    const handleChildChange = (childId, newData) => {
        const updatedCards = cards.map(card => {
            if (card.id === activeId) {
                return {
                    ...card,
                    children: card.children.map(child =>
                        child.id === childId ? { ...child, data: newData } : child
                    )
                };
            }
            return card;
        });
        onChildrenChange?.(block.id, updatedCards);
    };


    //scroll automatico al contenido de la card clickeada
    useEffect(() => {

        if (!activeCard) return;

        const isDesktop = window.innerWidth >= 768;

        //en desktop puedo usar scrollIntoView, puedo ir porque siempre es un solo contenedor expandido

        if (isDesktop) {
            desktopContentRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            //focus para que cuando se despliegue el contenido, el lector de pantalla haga el foco en el desplegable
            desktopContentRef.current?.focus();
        } else {
            //en mobile se expande debajo de la card, no es siempre el mismo contenedor, tengo que buscar la posición exacta para mostrar el contenido

            const active = cardRefs.current[activeCard.id];
            if (!active) return;

            //el -100 es para que no desaparezca la card por completo de la pantalla y se note que es la clickeada (se ve un poco la descripción, da contexto)

            const y = active.getBoundingClientRect().top + window.scrollY - 100;

            window.scrollTo({
                top: y,
                behavior: "smooth"
            });
        }

    }, [activeCard]);

    return (
        <>
            <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10 relative ${isAdmin && isEditing ? 'mt-6' : ''}`}>
                {cards.map(card => {
                    const isActive = card.id === activeId;
                    return (
                        <div key={card.id} className="w-full" ref={el => (cardRefs.current[card.id] = el)}>
                            <CardSection
                                card={card.data}
                                blockId={card.id}
                                onClick={() => setActiveId(isActive ? null : card.id)}
                                isActive={isActive}
                                isAdmin={isAdmin && isEditing}
                                onUpdate={(newData) => onChange && onChange(card.id, newData)}
                                onDelete={() => handleDeleteCard(card.id)}
                            />
                            {isActive && (
                                <div id={`card-content-${card.id}`} className="md:hidden p-6 rounded-xl mt-4 bg-white shadow-sm">
                                    {card.children?.map(innerBlock => (
                                        <SectionBlock
                                            key={innerBlock.id}
                                            block={innerBlock}
                                            isEditing={isEditing}
                                            isAdmin={isAdmin}
                                            onChange={handleChildChange}
                                        />
                                    ))}
                                    {/* Selector para Mobile */}
                                    {isAdmin && isEditing && (
                                        <ChildBlockSelector onAdd={(type) => {
                                            if (BLOCKS_WITH_MODAL.includes(type)) {
                                                setModalBlockType(type);
                                                setIsChildModalOpen(true);
                                                return;
                                            }
                                            handleAddChildBlock(type);
                                        }} />
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {activeCard && (
                <div key={activeCard.id} className="hidden md:block w-full bg-white shadow-sm rounded-2xl py-5 mb-15">
                    <div ref={desktopContentRef}
                        tabIndex="-1"
                        role="region"
                        aria-labelledby={`card-title-${activeCard.id}`}
                        aria-live="polite"
                        className="max-w-5xl mx-auto px-6 space-y-5"
                        onKeyDown={(e) => {
                            if (e.key === "Tab" && !e.shiftKey && nextCard) {
                                e.preventDefault();
                                cardRefs.current[nextCard.id]?.querySelector('[role="button"]')?.focus();
                            }
                        }}>

                        {activeCard.children?.map(innerBlock => (
                            <SectionBlock
                                key={innerBlock.id}
                                block={innerBlock}
                                isEditing={isEditing}
                                isAdmin={isAdmin}
                                onChange={handleChildChange}
                                onDelete={isAdmin && isEditing ? handleDeleteChild : null}
                            />
                        ))}

                        {/* Selector para Desktop */}
                        {isAdmin && isEditing && (
                            <div className=" pt-4 mt-4">
                                <ChildBlockSelector onAdd={(type) => {
                                    if (BLOCKS_WITH_MODAL.includes(type)) {
                                        setModalBlockType(type);
                                        setIsChildModalOpen(true);
                                        return;
                                    }
                                    handleAddChildBlock(type);
                                }} />
                            </div>
                        )}

                    </div>
                </div>
            )}

            {isAdmin && isEditing && (
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg cursor-pointer hover:bg-blue-700"
                >
                    + Añadir tarjeta
                </button>
            )}

            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <CardForm
                    onSubmit={(formData) => {
                        handleAdd(formData);
                        setIsModalOpen(false);
                    }}
                    onCancel={() => setIsModalOpen(false)}
                    showHref={false}
                />
            </Modal>

            <Modal open={isChildModalOpen} onClose={() => setIsChildModalOpen(false)}>
                {FormComponent && (
                    <FormComponent
                        onSubmit={(data) => {
                            handleAddChildBlock(modalBlockType, data);
                            setIsChildModalOpen(false);
                            setModalBlockType(null);
                        }}
                        onCancel={() => {
                            setIsChildModalOpen(false);
                            setModalBlockType(null);
                        }} />
                )}
            </Modal>

        </>
    );
}

ExpandedCardsGroup.hasEditor = true;
