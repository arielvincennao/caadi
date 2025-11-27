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
        w-12 h-12
        rounded-full
        bg-[#1F313F]
        flex items-center justify-center
        cursor-pointer
        hover:opacity-90
        transition-opacity
        shadow-md
        ${className}
      `}
      aria-label="Volver a la página anterior"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-white"
      >
        <path
          d="M15 18L9 12L15 6"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}

