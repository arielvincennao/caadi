import { useNavigate } from 'react-router-dom'

export default function Card({
    size = "md",
    children,
    className = "",
    to = null,
  }) {
    const navigate = useNavigate()
    const sizeClasses = {
      md: "w-70 h-13 md:w-94 md:h-18",
      lg: "w-70 h-15 md:w-110 md:h-20",
    };

    const handleClick = () => {
      if (to) {
        navigate(to)
      }
    }
  
    return (
      <div
          onClick={handleClick}
          className={`
          bg-white
          rounded-[10px] p-4 
          flex items-center gap-4
          cursor-pointer
          box-border
          card-style
          ${sizeClasses[size]}
          ${className}
        `}
      >
        <div className="flex-1">
          {children}
        </div>
      </div>
    );
  }
  