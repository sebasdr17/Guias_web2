import { useEffect, useState } from 'react';
import { API_KEY } from './useFetchMovies';

const BASE = `http://www.omdbapi.com/?apikey=${API_KEY}`;

export function useFetchMovieDetails(selectedId) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!selectedId) {
      setMovie({});
      setError(null);
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();

    const fetchDetails = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(`${BASE}&i=${encodeURIComponent(selectedId)}`, {
          signal: controller.signal,
        });
        const data = await res.json();

        if (data.Response === 'True') {
          setMovie(data);
        } else {
          setMovie({});
          setError(data.Error || 'No se pudo cargar la película');
        }
      } catch (err) {
        if (err.name !== 'AbortError') setError('Error al cargar detalles');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();

    return () => controller.abort();
  }, [selectedId]);

  return { movie, isLoading, error };
}
