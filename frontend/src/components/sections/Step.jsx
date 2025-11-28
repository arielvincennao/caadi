export default function Step({
  stepNumber,
  text,
  stepIcon = null
}) {
  return (
    <article
      className="flex items-center gap-4"
      aria-label={`Paso ${stepNumber}`}
    >
      <img src={stepIcon} alt="" className="w-10 h-10" />

      <div>
        <h3 className="font-bold">Paso {stepNumber}</h3>
        <p>{text}</p>
      </div>
    </article>

  );
}
