import axios from "axios";
import { BASE_URL, API_KEY } from "../utilities";

export default {
  popular: () =>
    axios.get(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    ),
  search: (query: string) =>
    axios.get(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1`
    ),
  details: (id: number) =>
    axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`)
};
