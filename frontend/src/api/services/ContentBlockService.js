import { ContentBlockRepository } from "../repositories/ContentBlockRepository";
import { transformBlocksStructure } from "../../utils/dataTransformers";

export const ContentBlockService = {
  async getBySection(sectionId) {
    if (!sectionId) throw new Error("sectionId es requerido");
    const blocks = await ContentBlockRepository.getBySection(sectionId);
    return transformBlocksStructure(blocks);
  },

  async createBlock(sectionId, type, data, position, parentId = null) {
    return await ContentBlockRepository.create({
      section_id: sectionId,
      type,
      data,
      position,
      parent_id: parentId
    });
  },

  async createExpandedCardsGroup(sectionId, position, cards) {
    // Primero crea el grupo contenedor
    const group = await ContentBlockRepository.create({
      section_id: sectionId,
      type: "expandedCardsGroup",
      data: {},
      position,
      parent_id: null
    });

    // Después crea cada card hija
    await Promise.all(
      cards.map((cardData, index) =>
        ContentBlockRepository.create({
          section_id: sectionId,
          type: "card",
          data: cardData,
          position: index,
          parent_id: group.id
        })
      )
    );

    return group;
  },

  async updateBlock(id, data) {
    if (!id) throw new Error("id es requerido");
    return await ContentBlockRepository.update(id, { data });
  },

  async deleteBlock(id) {
    if (!id) throw new Error("id es requerido");
    // Los hijos se eliminan solos por CASCADE
    return await ContentBlockRepository.delete(id);
  },

  async reorderBlocks(blocks) {
    return await ContentBlockRepository.updatePositions(blocks);
  }
};