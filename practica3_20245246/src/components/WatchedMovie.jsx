import React from 'react';

export function WatchedSummary({ watched }) {
  if (!watched || watched.length === 0) {
    return (
      <div className="summary">
        <h2>Tu lista de vistas</h2>
        <p>No has agregado películas aún.</p>
      </div>
    );
  }

  const avg = (arr, key) => {
    if (!arr.length) return 0;
    return (
      arr.reduce((acc, item) => acc + Number(item[key] || 0), 0) / arr.length
    ).toFixed(1);
  };

  const avgImdb = avg(watched, 'imdbRating');
  const avgUser = avg(watched, 'userRating');
  const avgRuntime = avg(watched, 'runtime');

  return (
    <div className="summary">
      <h2>Resumen de vistas</h2>
      <div>
        <p>
          <span>⭐</span>
          <span>IMDB: {avgImdb}</span>
        </p>
        <p>
          <span>🎯</span>
          <span>Tu promedio: {avgUser}</span>
        </p>
        <p>
          <span>⏱</span>
          <span>Minutos: {avgRuntime}</span>
        </p>
      </div>
    </div>
  );
}

export function WatchedMoviesList({ watched, onDelete }) {
  return (
    <ul className="list list-watched">
      {watched.map((movie) => (
        <WatchedMovie key={movie.imdbID} movie={movie} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export function WatchedMovie({ movie, onDelete }) {
  const { imdbID, title, poster, imdbRating, userRating, runtime } = movie;

  return (
    <li>
      <img src={poster} alt={`${title} poster`} />
      <div>
        <h3>{title}</h3>
        <p>
          <span>⭐</span>
          <span>{imdbRating} IMDB</span>
        </p>
        <p>
          <span>🎯</span>
          <span>Tu: {userRating} ⭐</span>
        </p>
        <p>
          <span>⏱</span>
          <span>{runtime} min</span>
        </p>
      </div>
      <button className="btn-delete" onClick={() => onDelete(imdbID)}>
        X
      </button>
    </li>
  );
}
