export function Icon({ name, className }) {
  return (
    <svg className={`w-10 h-9 shrink-0 ${className}`}>
      <use href={`/assets/sprite.svg#${name}`} />
    </svg>
  );
}
