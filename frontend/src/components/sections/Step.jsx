export default function Step({
  stepNumber,
  text,
  stepIcon = null,
  className = ""
}) {
  return (
    <div
      className={`
        flex items-start gap-3 
        p-3 rounded-lg border shadow-sm bg-white
        ${className}
      `}
      role="group"
      aria-label={`Paso ${stepNumber}`}
    >
      {/* Ícono */}
      {stepIcon && (
        <img
          src={stepIcon}
          alt=""
          className="w-8 h-8 object-contain shrink-0"
        />
      )}

      {/* Contenido */}
      <div className="flex flex-col">
        <span className="font-semibold text-gray-800">
          Paso {stepNumber}
        </span>
        <p className="text-gray-600 text-sm leading-tight">
          {text}
        </p>
      </div>
    </div>
  );
}
