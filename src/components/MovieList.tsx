import React from "react";
import { Movie } from "../service/OMDb";
import { FlexColumn, FlexRow } from "./Flex";
import "./MovieList.scss";

export type MovieListProps = {
  movies?: Movie[];
  onSelect?: (movie: Movie) => void;
};

const MovieList = (props: MovieListProps) => {
  return (
    <FlexRow className="wrap">
      {props.movies &&
        props.movies.map(movie => (
          <div
            key={movie.imdbID}
            onClick={() => {
              props.onSelect && props.onSelect(movie);
            }}
          >
            <FlexRow className="movie-cell" stretch>
              <img className="poster" src={movie.Poster} alt={movie.Title} />
              <FlexColumn className="description" stretch>
                <div>{movie.Title}</div>
                <div>({movie.Year})</div>
              </FlexColumn>
            </FlexRow>
          </div>
        ))}
    </FlexRow>
  );
};

export default MovieList;
