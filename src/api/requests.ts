import axios from "axios";
import { BASE_URL, API_KEY } from "../utilities";

export default {
  popular: (type: "movie" | "tv", page: number) =>
    axios.get(
      `${BASE_URL}/${type}/popular?api_key=${API_KEY}&language=en-US&page=${page}`
    ),
  search: (type: "movie" | "tv", query: string, page: number) =>
    axios.get(
      `${BASE_URL}/search/${type}?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}`
    ),
  details: (type: "movie" | "tv", id: number) =>
    axios.get(`${BASE_URL}/${type}/${id}?api_key=${API_KEY}&language=en-US`),
  videos: (type: "movie" | "tv", id: number) =>
    axios.get(
      `${BASE_URL}/${type}/${id}/videos?api_key=${API_KEY}&language=en-US`
    )
};
