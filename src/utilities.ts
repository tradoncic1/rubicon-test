export const BASE_URL = "https://api.themoviedb.org/3";
export const API_KEY = "d26c90235803105186cffeb510c2874a";

export const getImage780 = imagePath => {
  return `http://image.tmdb.org/t/p/w185${imagePath}`;
};
export const getImageOriginal = imagePath => {
  return `http://image.tmdb.org/t/p/original${imagePath}`;
};
