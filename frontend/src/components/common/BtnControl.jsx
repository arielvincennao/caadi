/**
 * BtnControl
 * Responsabilidades:
 * - Renderizar un botón de control pequeño para acciones de administración
 * - Recibir título, clases y contenido interno para comandos de edición o borrado
 */


export default function BtnControl({ onClick, children, className = "", title, type = "button" }) {
    return (
        <button
            type={type}
            onClick={onClick}
            title={title}
            className={`p-1 rounded-full shadow-md cursor-pointer ${className}`}
        >
            {children}
        </button>
    );
}