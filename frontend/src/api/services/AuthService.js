import { AuthRepository } from "../repositories/AuthRepository";

export const AuthService = {
  async signIn(email, password) {
    if (!email || !password) throw new Error("Email y contraseña requeridos")
    return await AuthRepository.signIn(email, password)
  },
  async signOut() {
    return await AuthRepository.signOut()
  },
  async getSession() {
    return await AuthRepository.getSession()
  },
  onAuthStateChange(callback) {
    return AuthRepository.onAuthStateChange(callback)
  }
}