import { useEffect, useState } from 'react';

// API key for OMDb
export const API_KEY = '1a777931';
const BASE = `http://www.omdbapi.com/?apikey=${API_KEY}`;

export function useFetchMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query || query.length < 3) {
      setMovies([]);
      setError(null);
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();

    const fetchMovies = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(`${BASE}&s=${encodeURIComponent(query)}`, {
          signal: controller.signal,
        });
        const data = await res.json();

        if (data.Response === 'True') {
          setMovies(data.Search);
        } else {
          setMovies([]);
          setError(data.Error || 'No se encontraron resultados');
        }
      } catch (err) {
        if (err.name !== 'AbortError') setError('Error al buscar películas');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();

    return () => controller.abort();
  }, [query]);

  return { movies, isLoading, error };
}
