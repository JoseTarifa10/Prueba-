import Weather from '../components/Weather'
import '../styles/WeatherPage.css'

function WeatherPage() {
  return (
    <div className="weather-page">
      <div className="weather-page-header">
        <h1>Clima en Tiempo Real</h1>
        <p>Consulta el clima actual de cualquier ciudad del mundo</p>
      </div>
      <div className="weather-wrapper">
        <Weather />
      </div>
    </div>
  )
}

export default WeatherPage
