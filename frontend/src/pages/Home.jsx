import { useState } from 'react'
import Logo from '../components/common/Logo'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import { Text } from '../components/Typography'

function Home() {
  const [showModes, setShowModes] = useState(false)

  if (!showModes) {
    return (
      <div className="bg-white min-h-screen flex flex-col items-center justify-center text-center px-4">
        <Logo src="/assets/logo-caadi.svg" alt="Logo CAADI" className="mb-6 max-w-xs w-40 h-40 md:w-62 md:h-62" />
        <div className="max-w-2xl mb-8">
          <Text className="mb-10">
          CAADi es una plataforma digital diseñada para centralizar información administrativa, cultural y de servicios orientados
          a personas con discapacidad. Su propósito es facilitar el acceso a recursos útiles y favorecer una participación más activa,
          autónoma e inclusiva dentro de la comunidad.
          </Text>
          <Button 
            className="main-button mb-4"
            onClick={() => setShowModes(true)}
          >
            <Text>Siguiente</Text>
          </Button>
          <Text className="text-gray-500 mt-10">
            Gracias por utilizar CAADI
          </Text>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center text-center relative">
      <div className="absolute top-4 left-4 md:top-6 md:left-10 z-10">
        <button
          onClick={() => setShowModes(false)}
          className="
            px-2 py-2 md:px-4 md:py-3
            rounded-full
            bg-[#1F313F]
            flex items-center justify-center gap-1 md:gap-2
            cursor-pointer
            hover:opacity-90
            transition-opacity
            shadow-md
            relative z-10
          "
          aria-label="Volver a la pantalla anterior"
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
      </div>
      <Logo src="/assets/logo-caadi.svg" alt="Logo CAADI" className="mb-6 max-w-xs w-40 h-40 md:w-62 md:h-62" />
      <div className="flex flex-col gap-8 md:gap-5 text-lg md:text-2xl">
        <Card size="md" to="/menu" mode="standard">
          <span>Modo estándar</span>
        </Card>
        <Card size="md" to="/menu" mode="visual">
          <span>Modo visual (LSA)</span>
        </Card>
        <Card size="md" to="/menu" mode="audio">
          <span>Modo audio (Lectura de voz)</span>
        </Card>
      </div>
    </div>
  )
}

export default Home
