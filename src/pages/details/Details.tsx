import React, { useEffect, useState } from "react";
import "./Details.scss";
import movies from "../../api/movies";
import shows from "../../api/shows";
import { Link } from "react-router-dom";
import {
  getImageOriginal,
  getMovieGenres,
  getShowGenres
} from "../../utilities";

const Details = props => {
  const { params } = props.match;
  const [details, setDetails] = useState({} as any);

  const fetchMovies = async () => {
    await movies.details(params.id).then(response => setDetails(response.data));
  };
  const fetchShows = async () => {
    await shows.details(params.id).then(response => setDetails(response.data));
  };

  useEffect(() => {
    if (params.type !== "movie" && params.type !== "show") {
      props.history.push("/");
    } else {
      if (params.type === "movie") {
        fetchMovies();
      } else {
        fetchShows();
      }
    }
  }, []);

  console.log(details);

  return (
    <div className="Details-Page">
      <Link className="Details-Back" to={"/"}>
        {"< Back"}
      </Link>
      <div className="Details-Main">
        <img
          className="Details-Poster"
          src={getImageOriginal(details.poster_path)}
          alt="Poster"
        />
        <div className="Details-Info">
          <h1 className="Details-Title">
            {params.type === "movie" ? details.title : details.name}
          </h1>
          <div className="Details-Genres">
            {details.genres?.map(genre => (
              <h2 key={genre.id}>{genre.name}</h2>
            ))}
          </div>
          <div className="Details-Votes">
            <h2>★</h2>
            <h2>{details.vote_average} / 10</h2>
          </div>
          <h3 className="Details-Overview">{details.overview}</h3>
        </div>
      </div>
    </div>
  );
};

export default Details;
