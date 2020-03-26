import { MovieGenreLookup } from "./MovieGenreLookup";
import { ShowGenreLookup } from "./ShowGenreLookup";

export const BASE_URL = "https://api.themoviedb.org/3";
export const API_KEY = "d26c90235803105186cffeb510c2874a";

export const getImage185 = imagePath => {
  return `http://image.tmdb.org/t/p/w185${imagePath}`;
};
export const getImageOriginal = imagePath => {
  return `http://image.tmdb.org/t/p/original${imagePath}`;
};

export const getMovieGenres = (genreIds: []) => {
  let genreList = [];

  genreIds.forEach(genre => {
    MovieGenreLookup.forEach(movieGenre =>
      genre === movieGenre.id ? genreList.push(movieGenre.name) : null
    );
  });

  return genreList;
};

export const getShowGenres = (genreIds: []) => {
  let genreList = [];

  genreIds.forEach(genre => {
    ShowGenreLookup.forEach(showGenre =>
      genre === showGenre.id ? genreList.push(showGenre.name) : null
    );
  });

  return genreList;
};
