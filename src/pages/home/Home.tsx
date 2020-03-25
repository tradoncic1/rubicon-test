import React, { useEffect, useState } from "react";
import "./Home.scss";
import movies from "../../api/movies";
import InfoCard from "../../components/infoCard/InfoCard";
import { getImage780 } from "../../utilities";
import shows from "../../api/shows";
import { MovieGenreLookup } from "../../MovieGenreLookup";
import { ShowGenreLookup } from "../../ShowGenreLookup";

const Home = () => {
  const [selectedTab, setSelectedTab] = useState("movies");
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularShows, setPopularShows] = useState([]);

  const fetchPopularMovies = async () => {
    await movies
      .popular()
      .then(response => setPopularMovies(response.data.results.slice(0, 10)));
  };
  const fetchPopularShows = async () => {
    await shows
      .popular()
      .then(response => setPopularShows(response.data.results.slice(0, 10)));
  };

  useEffect(() => {
    if (selectedTab === "movies") fetchPopularMovies();
    else if (selectedTab === "shows") fetchPopularShows();
  }, [selectedTab]);

  const getMovieGenres = (genreIds: []) => {
    let genreList = [];

    genreIds.forEach(genre => {
      MovieGenreLookup.forEach(movieGenre =>
        genre === movieGenre.id ? genreList.push(movieGenre.name) : null
      );
    });

    return genreList.slice(0, 2);
  };

  const getShowGenres = (genreIds: []) => {
    let genreList = [];

    genreIds.forEach(genre => {
      ShowGenreLookup.forEach(showGenre =>
        genre === showGenre.id ? genreList.push(showGenre.name) : null
      );
    });

    return genreList.slice(0, 2);
  };

  const popularMarkup = (
    <div className="Home-Popular">
      {selectedTab === "movies"
        ? popularMovies.map(movie => (
            <InfoCard
              key={movie.id}
              id={movie.id}
              name={movie.title}
              genres={getMovieGenres(movie.genre_ids)}
              rating={movie.vote_average}
              imageUrl={getImage780(movie.poster_path)}
              type="movie"
            />
          ))
        : popularShows.map(show => (
            <InfoCard
              key={show.id}
              id={show.id}
              name={show.name}
              genres={getShowGenres(show.genre_ids)}
              rating={show.vote_average}
              imageUrl={getImage780(show.poster_path)}
              type="show"
            />
          ))}
    </div>
  );

  return (
    <div className="Home-Page">
      Home page
      <div className="Home-Tabs">
        <button onClick={() => setSelectedTab("movies")}>Movies</button>
        <button onClick={() => setSelectedTab("shows")}>Shows</button>
      </div>
      <input />
      {popularMarkup}
    </div>
  );
};

export default Home;
