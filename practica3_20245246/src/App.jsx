import React, { useState, useEffect } from 'react';
import { Nav, Logo, Search, NumResults } from './components/Nav';
import { Box } from './components/Box';
import { MovieList } from './components/Movie';
import { MovieDetails } from './components/MovieDetails';
import { WatchedSummary, WatchedMoviesList } from './components/WatchedMovie';
import { useFetchMovies } from './hooks/useFetchMovies';

export default function App() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  const [watched, setWatched] = useState(() => {
    try {
      const raw = localStorage.getItem('watched');
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('watched', JSON.stringify(watched));
  }, [watched]);

  const { movies, isLoading, error } = useFetchMovies(query);

  function handleSelectMovie(id) {
    setSelectedId(prev => (prev === id ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched(prev => [movie, ...prev]);
  }

  function handleDeleteWatched(id) {
    setWatched(prev => prev.filter(m => m.imdbID !== id));
  }

  return (
    <div>
      <Nav>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies || []} />
      </Nav>

      <main className="main">
        <Box>
          {isLoading && <p className="loader">Cargando...</p>}
          {error && <p className="error">{error}</p>}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} onDelete={handleDeleteWatched} />
            </>
          )}
        </Box>
      </main>
    </div>
  );
}
