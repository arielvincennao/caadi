/**
 * Logo
 * Responsabilidades:
 * - Mostrar el logo de la aplicación con las propiedades recibidas
 * - Servir como enlace visual en la barra de navegación
 */

function Logo({ src, alt, className }) {
  return (
    <img 
      src={src} 
      alt={alt} 
      className={className}
    />
  )
}

export default Logo
