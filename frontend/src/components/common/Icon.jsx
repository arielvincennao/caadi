/**
 * Icon
 * Responsabilidades:
 * - Renderizar iconos SVG según el nombre recibido
 * - Permitir personalizar la apariencia con className
 */

export function Icon({ name, className = "w-10 h-9" }) {
  return (
    <svg className={`shrink-0 ${className}`}>
      <use href={`/assets/sprite.svg#${name}`} />
    </svg>
  );
}
