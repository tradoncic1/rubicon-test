import axios from "axios";
import { BASE_URL, API_KEY } from "../utilities";

export default {
  popular: () =>
    axios.get(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    )
};
