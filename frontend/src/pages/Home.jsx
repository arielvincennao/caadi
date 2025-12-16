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
      <div className="bg-white flex flex-col items-center justify-center text-center min-h-[calc(100vh-5rem)] gap-y-6">
        <Logo src="/assets/logo-caadi.svg" alt="Logo CAADI" className=" max-w-xs w-40 h-40 md:w-62 md:h-62" />
        <div className="flex flex-col items-center justify-center max-w-2xl gap-y-5">
          <Text>
          CAADi es una plataforma digital diseñada para centralizar información administrativa, cultural y de servicios orientados
          a personas con discapacidad. Su propósito es facilitar el acceso a recursos útiles y favorecer una participación más activa,
          autónoma e inclusiva dentro de la comunidad.
          </Text>
          <Button 
            onClick={() => navigate('/menu')}
          >
            <Text>Ir al Menú principal</Text>
          </Button>
          <Button 
            className="main-button-secondary"
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
