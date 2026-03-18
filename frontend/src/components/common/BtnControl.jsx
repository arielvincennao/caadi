
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