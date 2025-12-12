import { useState } from 'react'
import { Title } from '../../components/Typography'
import './admin.css'

const sections = [
  { id: 'cud', name: 'CUD', icon: 'assets/icons/cud.svg' },
  { id: 'transporte', name: 'Pases de transporte', icon: 'assets/icons/transporte.svg' },
  { id: 'cnrt', name: 'Reserva de pasajes CNRT', icon: 'assets/icons/cnrt.svg' },
  { id: 'beneficios', name: 'Beneficios sociales', icon: 'assets/icons/beneficios.svg' },
  { id: 'cultura', name: 'Cultura y arte', icon: 'assets/icons/cultura.svg' },
  { id: 'turismo', name: 'Turismo accesible', icon: 'assets/icons/turismo.svg' },
  { id: 'centrosdia', name: 'Centros de día', icon: 'assets/icons/centrodia.svg' },
  { id: 'reclamos', name: 'Reclamos de accesibilidad', icon: 'assets/icons/reportes.svg' },
]

function Dashboard() {
  const [selectedSection, setSelectedSection] = useState(null)

  const handleSectionClick = (section) => {
    setSelectedSection(section)
  }

  return (
    <div className="bg-white min-h-screen">
      <section className="pb-10 pt-20 md:pt-24 px-4 md:px-6">
        <Title className="mb-10 md:mb-12 md:text-2xl text-center">Panel de Administración</Title>
        
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {/* Columna izquierda - Botones */}
            <div className="w-full md:w-1/3 lg:w-1/4">
              <div className="space-y-5">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => handleSectionClick(section)}
                    className={`dashboard-section-button ${
                      selectedSection?.id === section.id ? 'selected' : ''
                    }`}
                  >
                    <span className="dashboard-section-button-text">
                      {section.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Columna derecha - Panel informativo */}
            <div className="w-full md:w-2/3 lg:w-3/4">
              <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 border-2 border-gray-200 sticky top-24">
                {selectedSection ? (
                  <div>
                    <Title className="text-2xl md:text-3xl mb-4">
                      Editando {selectedSection.name}
                    </Title>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full min-h-[200px]">
                    <p className="text-xl md:text-2xl text-gray-500 text-center">
                    ← Selecciona la sección a editar
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard

