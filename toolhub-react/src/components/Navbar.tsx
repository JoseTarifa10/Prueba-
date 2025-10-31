import { Link } from 'react-router-dom'
import '../styles/Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          ToolHub
        </Link>
        <ul className="navbar-menu">
          <li>
            <Link to="/" className="navbar-link">
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/calculator" className="navbar-link">
              Calculadora
            </Link>
          </li>
          <li>
            <Link to="/weather" className="navbar-link">
              Clima
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
