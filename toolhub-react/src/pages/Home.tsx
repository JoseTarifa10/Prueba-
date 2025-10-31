import { Link } from 'react-router-dom'
import '../styles/Home.css'

interface Tool {
  id: string
  name: string
  description: string
  icon: string
  path: string
  color: string
}

function Home() {
  const tools: Tool[] = [
    {
      id: 'calculator',
      name: 'Calculadora',
      description: 'Calculadora básica para operaciones matemáticas',
      icon: '🔢',
      path: '/calculator',
      color: '#61dafb'
    },
    // Herramientas futuras se añadirán aquí
    {
      id: 'converter',
      name: 'Convertidor',
      description: 'Próximamente - Convertidor de unidades',
      icon: '🔄',
      path: '#',
      color: '#4caf50'
    },
    {
      id: 'notes',
      name: 'Notas',
      description: 'Próximamente - Bloc de notas',
      icon: '📝',
      path: '#',
      color: '#ff9800'
    },
    {
      id: 'timer',
      name: 'Temporizador',
      description: 'Próximamente - Temporizador y cronómetro',
      icon: '⏱️',
      path: '#',
      color: '#e91e63'
    }
  ]

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Bienvenido a ToolHub</h1>
        <p className="subtitle">Tu colección de herramientas útiles en un solo lugar</p>
      </header>

      <div className="tools-grid">
        {tools.map((tool) => (
          <Link
            key={tool.id}
            to={tool.path}
            className={`tool-card ${tool.path === '#' ? 'disabled' : ''}`}
            style={{ borderColor: tool.color }}
            onClick={(e) => tool.path === '#' && e.preventDefault()}
          >
            <div className="tool-icon" style={{ backgroundColor: tool.color }}>
              {tool.icon}
            </div>
            <h3 className="tool-name">{tool.name}</h3>
            <p className="tool-description">{tool.description}</p>
            {tool.path !== '#' && (
              <div className="tool-arrow" style={{ color: tool.color }}>
                →
              </div>
            )}
            {tool.path === '#' && (
              <div className="coming-soon">Próximamente</div>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home
