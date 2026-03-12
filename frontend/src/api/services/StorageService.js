import { StorageRepository } from "../repositories/StorageRepository";

export const StorageService = {
  async uploadImage(folder, file) {
    // Comprime el nombre para evitar espacios y caracteres raros
    const fileName = file.name.replace(/\s+/g, '_').toLowerCase();
    const path = `${folder}/${fileName}`;
    await StorageRepository.upload('assets', path, file);
    return StorageRepository.getPublicUrl('assets', path);
  },

  async deleteImage(url) {
    // Extrae el path relativo de la URL completa
    const path = url.split('/assets/')[1];
    if (!path) throw new Error('URL inválida');
    return await StorageRepository.delete('assets', path);
  },

  async listImages(folder) {
    return await StorageRepository.list('assets', folder);
  }
};