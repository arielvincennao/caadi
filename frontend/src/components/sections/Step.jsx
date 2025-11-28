export default function Step({
  stepNumber,
  text,
  stepIcon = null,
  className = ""
}) {
  return (
    <div
      className={`flex items-center gap-4 ${className}`}
      role="group"
      aria-label={`Paso ${stepNumber}`}
    >

      {stepIcon && (
        <img
          src={stepIcon}
          alt=""
          className="w-10 h-10 object-contain shrink-0"
        />
      )}

      <p className="text-gray-800 leading-snug">
        <span className="font-semibold">
          Paso {stepNumber}:
        </span>{" "}
        {text}
      </p>
    </div>
  );
}
