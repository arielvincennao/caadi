import {createContext, useState, useEffect} from "react";

/*
createContext sirve para compartir datos entre muchos componentes sin tener que pasarlo como props.
lo guardas en un contexto y lo usas donde lo necesitas.
*/

const AccessibilityContext = createContext();

/*
Con el provider "envuelvo" la app(App.jsx) para que los datos esten disponibles en todos los componentes.
*/
export function AccessibilityProvider({ children }){
    
    //obtiene el modo de localStorage cuando se carga el componente por primera vez, no se ejecuta en cada render
    const [mode, setMode] = useState(() => {
        return localStorage.getItem("mode") || "standard"; //valor por defecto, standard
    });

    //cada vez que se elija un nuevo modo, se actualiza
    useEffect(() => {
        localStorage.setItem("mode", mode);
    }, [mode]);

    return (
        //permite a toda la app usar el mode y setMode
        <AccessibilityContext.Provider value={{mode, setMode}}>
            {children}
        </AccessibilityContext.Provider>
    )
    
}

export default AccessibilityContext;