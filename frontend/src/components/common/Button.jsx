import { Icon } from "./Icon";

function Button({
    children,
    className,
    onClick,
    href,
    type,
    disabled,
    icon = null
}) {

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
            onClick(e);
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
            className={`main-button hover:opacity-90 ${className} `}
            onClick={handleClick}
            type={type || 'button'}
            disabled={disabled}
        >
            {icon ? <Icon name={icon} className='shrink-0 object-contain scale-50  text-white' /> : null}
            {children}
        </button>
    );
}

export default Button;

