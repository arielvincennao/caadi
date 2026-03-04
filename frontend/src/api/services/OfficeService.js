import { OfficeRepository } from "../repositories/OfficeRepository";

export const OfficeService = {
  async getBySection(slug) {
    const offices = await OfficeRepository.getAll();

    if (!slug) return offices;

    return offices.filter(office =>
      office.section_slug.includes("all") ||
      office.section_slug.includes(slug.toLowerCase())
    );
  },

  async getById(id) {
    const offices = await OfficeRepository.getAll();
    return offices.filter(office => office.id.toString() === id);
  }
}