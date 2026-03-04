import { ClaimRepository } from "../repositories/ClaimRepository";

export const ClaimService =  {
    async sendClaim(formData) {
        await ClaimRepository.insert(formData);
        await ClaimService._sendEmail(formData);
    },

    async _sendEmail(formData) {
        const payload = {
            "Tipo de queja": formData.type,
            "Nombre completo": formData.full_name,
            "Correo electrónico": formData.email,
            "Ubicación": formData.location,
            "Descripción": formData.description,
        };

    const response = await fetch("https://formspree.io/f/xlgwvbel", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error("Error al enviar el email");
    }
}