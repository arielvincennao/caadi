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