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
  
  async update(id, changes) {
  if (!id) throw new Error("id es requerido");
  return await OfficeRepository.update(id, changes);
}

}