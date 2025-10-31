# Configuración de la API del Clima

## Problema: "Ciudad no encontrada siempre"

Si recibes el error "Ciudad no encontrada" constantemente, probablemente necesitas configurar tu propia API key de OpenWeatherMap.

## Solución: Obtén tu API Key gratuita

### Paso 1: Crear cuenta en OpenWeatherMap
1. Ve a [https://openweathermap.org/api](https://openweathermap.org/api)
2. Haz clic en "Sign Up" (Registrarse)
3. Completa el formulario de registro
4. Verifica tu email

### Paso 2: Obtener tu API Key
1. Inicia sesión en [https://home.openweathermap.org/](https://home.openweathermap.org/)
2. Ve a "API keys" en el menú
3. Copia tu API key (o genera una nueva)
4. **Nota:** La API key puede tardar unos minutos en activarse (hasta 2 horas)

### Paso 3: Configurar la API Key en el proyecto
1. Abre el archivo `src/components/Weather.tsx`
2. Busca la línea que dice:
   ```typescript
   const API_KEY = 'bd5e378503939ddaee76f12ad7a97608';
   ```
3. Reemplaza el valor con tu nueva API key:
   ```typescript
   const API_KEY = 'TU_API_KEY_AQUI';
   ```
4. Guarda el archivo

### Paso 4: Probar la aplicación
1. Reinicia el servidor de desarrollo si está corriendo
2. Prueba buscando ciudades como: Madrid, London, Paris, New York
3. Usa nombres en inglés para mejores resultados (ej: "Moscow" en vez de "Moscú")

## Alternativa: Variables de entorno (Recomendado)

Para mayor seguridad, puedes usar variables de entorno:

1. Crea un archivo `.env` en la raíz del proyecto:
   ```
   VITE_WEATHER_API_KEY=tu_api_key_aqui
   ```

2. Modifica `Weather.tsx`:
   ```typescript
   const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || 'bd5e378503939ddaee76f12ad7a97608';
   ```

3. Agrega `.env` a tu `.gitignore` para no compartir tu API key

## Plan Gratuito de OpenWeatherMap
- ✅ 1,000 llamadas por día
- ✅ Datos del clima actual
- ✅ Sin tarjeta de crédito requerida
- ✅ Gratis para siempre

## Solución de problemas

### Error: "Error de API Key"
- Tu API key no está activada o es inválida
- Espera 10-15 minutos después de crear la cuenta
- Verifica que copiaste la key completa

### Error: "Ciudad no encontrada"
- Verifica la ortografía del nombre de la ciudad
- Usa nombres en inglés (London, Paris, Moscow)
- Intenta con el formato: "Ciudad,Código_País" (ej: "Madrid,ES")

### La búsqueda no responde
- Abre la consola del navegador (F12) para ver errores
- Verifica tu conexión a internet
- Comprueba que la API key esté configurada correctamente
