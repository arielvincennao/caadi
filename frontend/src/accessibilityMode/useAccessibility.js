import { useContext } from "react";
import AccessibilityContext  from "./AccessibilityMode";

//creo un hook personalizado para exportar el contexto y usarlo desde cualquier lado más fácil.

export function useAccessibility(){
    return useContext(AccessibilityContext);
}