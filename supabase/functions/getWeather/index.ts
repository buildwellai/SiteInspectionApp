import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const OPENWEATHER_API_KEY = Deno.env.get('OPENWEATHER_API_KEY')

serve(async (req) => {
  try {
    const { latitude, longitude } = await req.json()

    const response = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&units=metric&appid=${OPENWEATHER_API_KEY}`
    )

    const data = await response.json()

    // Transform the data into our desired format
    const weather = {
      current: {
        temp: data.current.temp,
        description: data.current.weather[0].description,
        windSpeed: data.current.wind_speed,
        humidity: data.current.humidity,
      },
      forecast: data.daily.slice(1, 4).map((day: any) => ({
        date: new Date(day.dt * 1000).toISOString(),
        temp: day.temp.day,
        description: day.weather[0].description,
      })),
    }

    return new Response(JSON.stringify(weather), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
})