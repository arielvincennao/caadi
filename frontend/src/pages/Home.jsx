import Logo from '../components/common/Logo'
import Card from '../components/common/Card'

function Home() {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center text-center">
      <Logo src="/assets/logo-caadi.svg" alt="Logo CAADI" className="mb-6 max-w-xs w-40 h-40 md:w-62 md:h-62" />
      <div className="flex flex-col gap-8 md:gap-5 text-lg md:text-2xl">
        <Card size="md" to="/menu">
          <span>Modo estándar</span>
        </Card>
        <Card size="md">
          <span>Modo visual (LSA)</span>
        </Card>
        <Card size="md">
          <span>Modo audio (Lectura de voz)</span>
        </Card>
      </div>
    </div>
  )
}

export default Home
