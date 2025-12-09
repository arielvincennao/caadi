import { useNavigate } from 'react-router-dom'
import Button from './Button'
import { Text } from '../Typography'

export default function BtnBack({ className = "" }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(-1)
  }

  return (
    <Button
      onClick={handleClick}
      className={`
        mt-5
        transition-opacity
        shadow-md
        relative z-10
        back-button
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
        className="md:w-6 md:h-6"
      >
        <path
          d="M15 18L9 12L15 6"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <Text className="whitespace-nowrap me-2">Volver</Text>
    </Button>
  )
}

