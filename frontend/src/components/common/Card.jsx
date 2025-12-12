import { useNavigate } from 'react-router-dom'

export default function Card({
    size = "md",
    children,
    className = "",
    to = null,
    icon = null,
    onClick = null
  }) {
    const navigate = useNavigate()
    const sizeClasses = {
      md: "w-70 h-13 md:w-94 md:h-18",
      lg: "w-70 h-15 md:w-110 md:h-20",
    };




    const handleClick = () => {
      if (onClick) {
        onClick()
      } else if (to) {
        navigate(to)
      }
    }
  
    // Si se usa onClick sin to, no aplicar tamaños fijos para permitir flexibilidad
    const shouldApplySize = !onClick && to
    
    return (
      <button
          onClick={handleClick}
          className={`
          bg-white
          rounded-[10px] 
          flex items-center gap-1 
          cursor-pointer
          box-border
          border
          shadow-md
          ${shouldApplySize ? sizeClasses[size] : ''}
          ${className}
        `}
      >
        {icon ? <img src={icon} alt="" className='shrink-0 object-contain w-10 h-9 ml-1' /> : null}
        <div className="flex-1">
          {children}
        </div>
      </button>
    );
  }
  