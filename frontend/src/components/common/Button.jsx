import { useNavigate } from "react-router-dom";
const paddingMap = {
    'min': 'px-6', // 16px
    'normal': 'px-16', // 24px
};

function Button({
    children,
    className,
    onClick,
    href,
    type,
    paddingX = 'normal',
    disabled
}) {
    const pxClass = paddingMap[paddingX] || 'px-16';

    const handleClick = (e) => {
        if (disabled) {
            e.preventDefault();
            return;
        }

        // si es submit, dejar que el formulario maneje el evento
        if (type === 'submit') {
            if (onClick) {
                onClick(e);
            }
            return;
        }

        // acción normal
        if (onClick) {
            e.preventDefault();
            onClick();
            return;
        }

        // abre link externo
        if (href) {
            e.preventDefault();
            window.open(href, "_blank");
            return;
        }
    };

    return (
        <button
            className={`main-button ${pxClass} ${className} `}
            onClick={handleClick}
            type={type || 'button'}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

export default Button;

// el button no funciona del todo bien porque el texto rebalsa
