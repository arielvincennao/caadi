import { ClaimFormRepository } from "../repositories/ClaimFormRepository";

export const ClaimFormService = {
  async get() {
    return await ClaimFormRepository.get();
  },

  async updateTitle(id, title) {
    if (!title.trim()) throw new Error("El título es requerido");
    return await ClaimFormRepository.update(id, { title });
  },

  async updateTexts(id, { title, description, note }) {
    if (!title.trim()) throw new Error("El título es requerido");
    return await ClaimFormRepository.update(id, { title, description, note });
  },

  async updateClaimTypes(id, claimTypes) {
    if (!claimTypes.length) throw new Error("Debe haber al menos un tipo");
    return await ClaimFormRepository.update(id, { claim_types: claimTypes });
  },

  async updateFields(id, fields) {
    if (!fields.length) throw new Error("Debe haber al menos un campo");
    return await ClaimFormRepository.update(id, { fields });
  }
};