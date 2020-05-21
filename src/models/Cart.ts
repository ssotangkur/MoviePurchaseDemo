import { useState } from "react";
import { Movie } from "../service/OMDb";

export type Cart = {
  movies: Map<string, Movie>;
  addMovie: (movie: Movie) => void;
  deleteMovie: (movie: Movie) => void;
  clear: () => void;
};

const useCart = (): [Cart, (movie: Movie) => void, (movie: Movie) => void] => {
  // We wrap the Map in a simple object that we recreate on mutation
  // to force setMovies to cause a rerender.
  const [movies, setMovies] = useState({ movies: new Map<string, Movie>() });

  const addMovie = (movie: Movie) => {
    setMovies(moviesObj => {
      return { movies: moviesObj.movies.set(movie.imdbID, movie) };
    });
  };

  const deleteMovie = (movie: Movie) => {
    setMovies(moviesObj => {
      moviesObj.movies.delete(movie.imdbID);
      return { movies: moviesObj.movies };
    });
  };

  const clear = () => {
    setMovies(moviesObj => {
      moviesObj.movies.clear();
      return { movies: moviesObj.movies };
    });
  };

  const cart: Cart = {
    movies: movies.movies,
    addMovie,
    deleteMovie,
    clear
  };

  return [cart, addMovie, deleteMovie];
};

export default useCart;
