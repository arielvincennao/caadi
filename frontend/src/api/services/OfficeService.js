import { OfficeRepository } from "../repositories/OfficeRepository";

export const OfficeService = {
  async getBySection(slug) {
    if (!slug) return await OfficeRepository.getAll();
    return await OfficeRepository.getBySection(slug);
  },

  async getById(id) {
    const office = await OfficeRepository.getById(id);
    return office ? [office] : [];
  },

  async create(officeData, sectionIds) {
    if (!officeData.name) throw new Error("El nombre es requerido");
    if (!officeData.coordinates) throw new Error("Las coordenadas son requeridas");
    const office = await OfficeRepository.create(officeData);
    await Promise.all(
      sectionIds.map(sectionId => OfficeRepository.linkSection(office.id, sectionId))
    );
    return office;
  },

  async update(id, changes) {
    if (!id) throw new Error("id es requerido");
    return await OfficeRepository.update(id, changes);
  },

  async delete(id) {
    if (!id) throw new Error("id es requerido");
    return await OfficeRepository.delete(id);
  }

}