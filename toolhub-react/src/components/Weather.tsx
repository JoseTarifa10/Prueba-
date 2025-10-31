import { useState } from 'react';
import '../styles/Weather.css';

interface WeatherData {
  current_condition: [{
    temp_C: string;
    temp_F: string;
    FeelsLikeC: string;
    humidity: string;
    pressure: string;
    weatherDesc: [{
      value: string;
    }];
    windspeedKmph: string;
    weatherIconUrl: [{
      value: string;
    }];
  }];
  nearest_area: [{
    areaName: [{
      value: string;
    }];
    country: [{
      value: string;
    }];
  }];
}

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Traducciones del clima
  const weatherTranslations: { [key: string]: string } = {
    'Clear': 'Despejado',
    'Sunny': 'Soleado',
    'Partly cloudy': 'Parcialmente nublado',
    'Cloudy': 'Nublado',
    'Overcast': 'Cubierto',
    'Mist': 'Neblina',
    'Patchy rain possible': 'Posible lluvia dispersa',
    'Patchy snow possible': 'Posible nieve dispersa',
    'Patchy sleet possible': 'Posible aguanieve dispersa',
    'Patchy freezing drizzle possible': 'Posible llovizna helada',
    'Thundery outbreaks possible': 'Posibles tormentas',
    'Blowing snow': 'Nieve ventisca',
    'Blizzard': 'Ventisca',
    'Fog': 'Niebla',
    'Freezing fog': 'Niebla helada',
    'Patchy light drizzle': 'Llovizna ligera dispersa',
    'Light drizzle': 'Llovizna ligera',
    'Freezing drizzle': 'Llovizna helada',
    'Heavy freezing drizzle': 'Llovizna helada intensa',
    'Patchy light rain': 'Lluvia ligera dispersa',
    'Light rain': 'Lluvia ligera',
    'Moderate rain at times': 'Lluvia moderada a ratos',
    'Moderate rain': 'Lluvia moderada',
    'Heavy rain at times': 'Lluvia intensa a ratos',
    'Heavy rain': 'Lluvia intensa',
    'Light freezing rain': 'Lluvia helada ligera',
    'Moderate or heavy freezing rain': 'Lluvia helada moderada o intensa',
    'Light sleet': 'Aguanieve ligera',
    'Moderate or heavy sleet': 'Aguanieve moderada o intensa',
    'Patchy light snow': 'Nieve ligera dispersa',
    'Light snow': 'Nieve ligera',
    'Patchy moderate snow': 'Nieve moderada dispersa',
    'Moderate snow': 'Nieve moderada',
    'Patchy heavy snow': 'Nieve intensa dispersa',
    'Heavy snow': 'Nieve intensa',
    'Ice pellets': 'Granizo',
    'Light rain shower': 'Chubascos ligeros',
    'Moderate or heavy rain shower': 'Chubascos moderados o intensos',
    'Torrential rain shower': 'Chubascos torrenciales',
    'Light sleet showers': 'Chubascos de aguanieve ligeros',
    'Moderate or heavy sleet showers': 'Chubascos de aguanieve moderados o intensos',
    'Light snow showers': 'Chubascos de nieve ligeros',
    'Moderate or heavy snow showers': 'Chubascos de nieve moderados o intensos',
    'Light showers of ice pellets': 'Chubascos ligeros de granizo',
    'Moderate or heavy showers of ice pellets': 'Chubascos moderados o intensos de granizo',
    'Patchy light rain with thunder': 'Lluvia ligera dispersa con truenos',
    'Moderate or heavy rain with thunder': 'Lluvia moderada o intensa con truenos',
    'Patchy light snow with thunder': 'Nieve ligera dispersa con truenos',
    'Moderate or heavy snow with thunder': 'Nieve moderada o intensa con truenos'
  };

  const translateWeather = (description: string): string => {
    return weatherTranslations[description] || description;
  };

  const getWeatherEmoji = (description: string): string => {
    const desc = description.toLowerCase();
    if (desc.includes('clear') || desc.includes('sunny')) return '☀️';
    if (desc.includes('partly cloudy')) return '⛅';
    if (desc.includes('cloudy') || desc.includes('overcast')) return '☁️';
    if (desc.includes('rain')) return '🌧️';
    if (desc.includes('thunder')) return '⛈️';
    if (desc.includes('snow')) return '🌨️';
    if (desc.includes('mist') || desc.includes('fog')) return '🌫️';
    if (desc.includes('sleet')) return '🌨️';
    return '🌤️';
  };

  const handleSearch = async () => {
    if (!city.trim()) {
      setError('Por favor ingresa una ciudad');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // wttr.in es gratuito e ilimitado, no requiere API key
      const url = `https://wttr.in/${encodeURIComponent(city)}?format=j1`;
      console.log('Fetching weather for:', city);
      
      const response = await fetch(url);
      const data = await response.json();

      console.log('API Response:', response.status, data);

      if (!response.ok || !data.current_condition) {
        throw new Error('Ciudad no encontrada. Verifica el nombre e intenta de nuevo.');
      }

      setWeatherData(data);
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'Error al obtener el clima');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="weather">
      <div className="search-box">
        <input
          type="text"
          placeholder="Ej: Madrid, London, New York..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-btn" disabled={loading}>
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>

      {!weatherData && !error && !loading && (
        <div className="help-text">
          <p>💡 Prueba buscando ciudades como:</p>
          <div className="example-cities">
            <button onClick={() => { setCity('Madrid'); }} className="example-btn">Madrid</button>
            <button onClick={() => { setCity('Barcelona'); }} className="example-btn">Barcelona</button>
            <button onClick={() => { setCity('London'); }} className="example-btn">London</button>
            <button onClick={() => { setCity('Paris'); }} className="example-btn">Paris</button>
          </div>
        </div>
      )}

      {error && <div className="error-message">{error}</div>}

      {weatherData && !error && (
        <div className="weather-info">
          <div className="location">
            <h2>
              {weatherData.nearest_area[0].areaName[0].value}, {weatherData.nearest_area[0].country[0].value}
            </h2>
          </div>

          <div className="weather-icon-container">
            <div className="weather-emoji">
              {getWeatherEmoji(weatherData.current_condition[0].weatherDesc[0].value)}
            </div>
          </div>

          <div className="temperature">
            <h1>{weatherData.current_condition[0].temp_C}°C</h1>
            <p className="description">
              {translateWeather(weatherData.current_condition[0].weatherDesc[0].value)}
            </p>
          </div>

          <div className="weather-details">
            <div className="detail-item">
              <span className="detail-label">Sensación térmica</span>
              <span className="detail-value">{weatherData.current_condition[0].FeelsLikeC}°C</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Humedad</span>
              <span className="detail-value">{weatherData.current_condition[0].humidity}%</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Viento</span>
              <span className="detail-value">{weatherData.current_condition[0].windspeedKmph} km/h</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Presión</span>
              <span className="detail-value">{weatherData.current_condition[0].pressure} hPa</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
