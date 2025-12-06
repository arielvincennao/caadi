import { useNavigate } from 'react-router-dom'

export default function BtnBack({ className = "" }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(-1)
  }

  return (
    <button
      onClick={handleClick}
      className={`
        mt-5
        px-2 py-2 md:px-4 md:py-3
        rounded-full
        bg-[#1F313F]
        flex items-center justify-center gap-1 md:gap-2
        cursor-pointer
        hover:opacity-90
        transition-opacity
        shadow-md
        relative z-10
        ${className}
      `}
      aria-label="Volver a la página anterior"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-white md:w-6 md:h-6"
      >
        <path
          d="M15 18L9 12L15 6"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-white text-sm md:text-base whitespace-nowrap">Volver</span>
    </button>
  )
}

