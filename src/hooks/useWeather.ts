import { useQuery } from '@tanstack/react-query';
import { getWeatherData } from '../lib/supabase';

interface WeatherParams {
  latitude: number;
  longitude: number;
}

export function useWeather({ latitude, longitude }: WeatherParams) {
  return useQuery({
    queryKey: ['weather', latitude, longitude],
    queryFn: () => getWeatherData(latitude, longitude),
    staleTime: 1000 * 60 * 15, // 15 minutes
    retry: 2,
    refetchOnWindowFocus: false,
    enabled: !!latitude && !!longitude && Math.abs(latitude) <= 90 && Math.abs(longitude) <= 180,
  });
}