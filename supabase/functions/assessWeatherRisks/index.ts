import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const RISK_THRESHOLDS = {
  wind: {
    high: 10, // m/s
    moderate: 5,
  },
  temp: {
    high: 30, // °C
    low: 5,
  },
  rain: {
    heavy: 10, // mm
    light: 2,
  },
}

serve(async (req) => {
  try {
    const { weather, constructionType } = await req.json()

    const risks = {
      highPriority: [],
      standard: [],
    }

    // Assess wind risks
    if (weather.current.windSpeed >= RISK_THRESHOLDS.wind.high) {
      risks.highPriority.push({
        id: 'wind-high',
        title: 'High Wind Speed Alert',
        mitigation: 'Suspend crane operations and secure loose materials',
        standard: 'BS EN 13001-2:2014',
      })
    } else if (weather.current.windSpeed >= RISK_THRESHOLDS.wind.moderate) {
      risks.standard.push({
        id: 'wind-moderate',
        title: 'Moderate Wind Conditions',
        mitigation: 'Monitor wind speeds and secure light materials',
      })
    }

    // Assess temperature risks
    if (weather.current.temp >= RISK_THRESHOLDS.temp.high) {
      risks.highPriority.push({
        id: 'temp-high',
        title: 'High Temperature Alert',
        mitigation: 'Implement additional rest breaks and ensure adequate hydration',
        standard: 'HSE Temperature Guidelines',
      })
    } else if (weather.current.temp <= RISK_THRESHOLDS.temp.low) {
      risks.standard.push({
        id: 'temp-low',
        title: 'Low Temperature Alert',
        mitigation: 'Monitor workers for cold stress and ensure proper PPE',
      })
    }

    return new Response(JSON.stringify(risks), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
})