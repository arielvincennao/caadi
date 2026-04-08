/**
 * useLocalEditing
 * Responsabilidades:
 * - Mantener un booleano de edición local (p. ej. modo edición en la UI)
 * - Exponer helpers para iniciar y detener la edición
 */
import { useState } from "react";

export function useLocalEditing(initial = false){
    const [localEditing, setLocalEditing] = useState(initial);

    const startEditing = () => setLocalEditing(true);
    const stopEditing = () => setLocalEditing(false);

    return {
        localEditing,
        startEditing,
        stopEditing
    };
}