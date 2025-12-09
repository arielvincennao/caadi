import { useNavigate } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Logo from '../components/common/Logo'
import Button from '../components/common/Button'
import { Text } from '../components/Typography'

function Home() {
  const navigate = useNavigate()

  return (
    <div>
      <Navbar/>
      <div className="bg-white flex flex-col items-center justify-center text-center px-5 pt-34">
        <Logo src="/assets/logo-caadi.svg" alt="Logo CAADI" className="mb-6 max-w-xs w-40 h-40 md:w-62 md:h-62" />
        <div className="flex flex-col items-center justify-center max-w-2xl mb-8">
          <Text className="mb-10">
          CAADi es una plataforma digital diseñada para centralizar información administrativa, cultural y de servicios orientados
          a personas con discapacidad. Su propósito es facilitar el acceso a recursos útiles y favorecer una participación más activa,
          autónoma e inclusiva dentro de la comunidad.
          </Text>
          <Button 
            className="main-button mb-4"
            onClick={() => navigate('/menu')}
          >
            <Text>Ir al Menú principal</Text>
          </Button>
          <Button 
            className="main-button-secondary mt-2"
            onClick={() => navigate('/agradecimientos')}
          >
            <Text>Agradecimientos</Text>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Home
