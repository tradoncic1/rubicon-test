import posterPlaceholder from "../../assets/posterPlaceholder.png";
import InfoCard from "../../components/infoCard/InfoCard";
import { MovieGenreLookup } from "../../MovieGenreLookup";
import { ShowGenreLookup } from "../../ShowGenreLookup";
import Spinner from "../../components/spinner/Spinner";
import emptyState from "../../assets/emptyState.png";
import React, { useEffect, useState } from "react";
import { getImageOriginal } from "../../utilities";
import movies from "../../api/movies";
import shows from "../../api/shows";
import "./Home.scss";

const Home = () => {
  const [selectedTab, setSelectedTab] = useState("shows");
  const [searchResults, setSearchResults] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularShows, setPopularShows] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  let typingTimer = null;

  const fetchPopularMovies = async () => {
    setIsLoading(true);
    await movies
      .popular()
      .then(response => setPopularMovies(response.data.results.slice(0, 10)));
    setIsLoading(false);
  };
  const fetchPopularShows = async () => {
    setIsLoading(true);
    await shows
      .popular()
      .then(response => setPopularShows(response.data.results.slice(0, 10)));
    setIsLoading(false);
  };

  const fetchSearch = async value => {
    setIsLoading(true);
    if (selectedTab === "movies") {
      await movies
        .search(value)
        .then(response => setSearchResults(response.data.results));
    } else {
      await shows
        .search(value)
        .then(response => setSearchResults(response.data.results));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (searchValue.length < 3) {
      if (selectedTab === "movies") fetchPopularMovies();
      else if (selectedTab === "shows") fetchPopularShows();
    } else {
      fetchSearch(searchValue);
    }

    return () => {
      clearTimeout(typingTimer);
    };
  }, [selectedTab, searchValue]);

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

  const listMarkup = list => (
    <div className="Home-Popular">
      {list.length > 0 ? (
        list.map(item => (
          <InfoCard
            key={item.id}
            id={item.id}
            name={selectedTab === "movies" ? item.title : item.name}
            genres={
              selectedTab === "movies"
                ? getMovieGenres(item.genre_ids)
                : getShowGenres(item.genre_ids)
            }
            rating={item.vote_average}
            imageUrl={
              item.poster_path
                ? getImageOriginal(item.poster_path)
                : posterPlaceholder
            }
            type="movie"
          />
        ))
      ) : (
        <div className="Home-Empty">
          <img src={emptyState} alt="Nothing To Show" />
          <h2>No results matching that search</h2>
        </div>
      )}
    </div>
  );

  const onSearchChange = async event => {
    const value = event.target.value;
    clearTimeout(typingTimer);
    typingTimer = setTimeout(async () => {
      setSearchValue(value);
    }, 1000);
  };

  const loadingMarkup = (
    <div className="Home-Loading">
      <Spinner color="green" />
    </div>
  );

  return (
    <div className="Home-Page">
      <div className="Home-Tabs">
        <button
          style={
            selectedTab === "shows" ? { backgroundColor: "lightskyblue" } : null
          }
          onClick={() => setSelectedTab("shows")}
        >
          Shows
        </button>
        <button
          style={
            selectedTab === "movies"
              ? { backgroundColor: "lightskyblue" }
              : null
          }
          onClick={() => setSelectedTab("movies")}
        >
          Movies
        </button>
      </div>
      <input
        className="Home-Input"
        type="text"
        onChange={onSearchChange}
        placeholder={`Search ${selectedTab}`}
      />
      {!isLoading
        ? searchValue.length < 3
          ? listMarkup(selectedTab === "movies" ? popularMovies : popularShows)
          : listMarkup(searchResults)
        : loadingMarkup}
    </div>
  );
};

export default Home;
