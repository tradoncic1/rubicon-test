import { changeSearch, changeTab, changePage } from "../../redux/actions";
import posterPlaceholder from "../../assets/posterPlaceholder.png";
import InfoCard from "../../components/infoCard/InfoCard";
import Spinner from "../../components/spinner/Spinner";
import emptyState from "../../assets/emptyState.png";
import React, { useEffect, useState } from "react";
import requests from "../../api/requests";
import { connect } from "react-redux";
import {
  getImageOriginal,
  getMovieGenres,
  getShowGenres
} from "../../utilities";
import "./Home.scss";

const Home = props => {
  const {
    searchValue,
    selectedTab,
    page,
    changeSearch,
    changeTab,
    changePage
  } = props;
  const [searchResults, setSearchResults] = useState([]);
  const [popularList, setPopularList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  let typingTimer = null;

  const fetchPopular = async () => {
    setIsLoading(true);
    await requests
      .popular(selectedTab, 1)
      .then(response => setPopularList(response.data.results.slice(0, 10)));
    setIsLoading(false);
  };

  const fetchSearch = async value => {
    setIsLoading(true);
    await requests.search(selectedTab, value, page).then(response => {
      setSearchResults(response.data.results);
      setTotalPages(response.data.total_pages);
    });
    setIsLoading(false);
  };

  useEffect(() => {
    if (searchValue.length < 3) {
      fetchPopular();
    } else {
      fetchSearch(searchValue);
    }

    return () => {
      clearTimeout(typingTimer);
    };
  }, [selectedTab, searchValue, page]);

  const listMarkup = list => (
    <div className="Home-Popular">
      {list.length > 0 ? (
        list.map(item => (
          <InfoCard
            key={item.id}
            id={item.id}
            name={selectedTab === "movie" ? item.title : item.name}
            genres={
              selectedTab === "movie"
                ? getMovieGenres(item.genre_ids).slice(0, 2)
                : getShowGenres(item.genre_ids).slice(0, 2)
            }
            rating={item.vote_average}
            imageUrl={
              item.poster_path
                ? getImageOriginal(item.poster_path)
                : posterPlaceholder
            }
            type={selectedTab}
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
      changeSearch(value);
    }, 1000);
  };

  const loadingMarkup = (
    <div className="Home-Loading">
      <Spinner color="green" />
    </div>
  );

  return (
    <div className="Home-Page">
      <div className="Home-ButtonGroup">
        <button
          style={
            selectedTab === "tv" ? { backgroundColor: "lightskyblue" } : null
          }
          onClick={() => {
            changeTab("tv");
            changePage(1);
          }}
        >
          Shows
        </button>
        <button
          style={
            selectedTab === "movie" ? { backgroundColor: "lightskyblue" } : null
          }
          onClick={() => {
            changeTab("movie");
            changePage(1);
          }}
        >
          Movies
        </button>
      </div>

      <input
        className="Home-Input"
        type="text"
        defaultValue={searchValue}
        onChange={onSearchChange}
        placeholder={`Search ${selectedTab === "movie" ? "movies" : "shows"}`}
      />
      {searchValue.length > 3 ? (
        <div
          className={`Home-ButtonGroup Home-Pagination ${
            page === 1 || page === totalPages ? "Home-Pagination-Disabled" : ""
          }`}
        >
          <button disabled={page === 1} onClick={() => changePage(page - 1)}>
            Previous
          </button>
          <button disabled>{page}</button>
          <button
            disabled={page === totalPages}
            onClick={() => changePage(page + 1)}
          >
            Next
          </button>
        </div>
      ) : null}
      {!isLoading
        ? searchValue.length < 3
          ? listMarkup(popularList)
          : listMarkup(searchResults)
        : loadingMarkup}
    </div>
  );
};

const mapStateToProps = ({ reducer: { searchValue, selectedTab, page } }) => ({
  searchValue,
  selectedTab,
  page
});

const mapDispatchToProps = dispatch => ({
  changeSearch: value => dispatch(changeSearch(value)),
  changeTab: value => dispatch(changeTab(value)),
  changePage: value => dispatch(changePage(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
