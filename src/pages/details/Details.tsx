import posterPlaceholder from "../../assets/posterPlaceholder.png";
import Spinner from "../../components/spinner/Spinner";
import React, { useEffect, useState } from "react";
import { getImageOriginal } from "../../utilities";
import imdbLogo from "../../assets/imdbLogo.png";
import requests from "../../api/requests";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import YouTube from "react-youtube";
import "./Details.scss";

const Details = props => {
  const { params } = props.match;
  const [details, setDetails] = useState({} as any);
  const [trailer, setTrailer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchVideo = async () => {
    requests
      .videos(params.type, params.id)
      .then(response =>
        setTrailer(
          response.data.results.filter(result => result.type === "Trailer")[0]
            ?.key
        )
      );
  };

  const fetchDetails = async () => {
    setIsLoading(true);
    await requests
      .details(params.type, params.id)
      .then(response => setDetails(response.data));
    setIsLoading(false);
  };

  useEffect(() => {
    if (params.type !== "movie" && params.type !== "tv") {
      props.history.push("/");
    } else {
      fetchDetails();
      fetchVideo();
    }
  }, []);

  const _onReady = event => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  return (
    <div className="Details-Page">
      <Link className="Details-Back" to={"/"}>
        {"< Back"}
      </Link>
      {!isLoading ? (
        <div className="Details-Main">
          {trailer ? (
            <YouTube
              videoId={trailer}
              opts={{
                width: "350",
                height: "200",
                playerVars: {
                  autoplay: 0
                }
              }}
              onReady={_onReady}
            />
          ) : (
            <img
              className="Details-Poster"
              src={
                details.poster_path
                  ? getImageOriginal(details.poster_path)
                  : posterPlaceholder
              }
              alt="Poster"
            />
          )}
          <div className="Details-Info">
            <h1 className="Details-Title">
              {params.type === "movie" ? details.title : details.name}
            </h1>
            <div className="Details-Genres">
              {details.genres?.map((genre, index) => {
                if (index < details.genres.length - 1)
                  return <h2 key={genre.id}>{genre.name}</h2>;
                else return <h2 key={genre.id}>{genre.name}</h2>;
              })}
            </div>
            <div className="Details-Votes">
              {params.type === "movie" ? (
                <a href={`https://www.imdb.com/title/${details.imdb_id}`}>
                  <img className="Details-Imdb" src={imdbLogo} alt="imdbLogo" />
                </a>
              ) : null}
              <h2>★ {details.vote_average} / 10</h2>
            </div>
            <div className="Details-Overview">
              <h2>Synopsis</h2>
              <h3>{details.overview}</h3>
            </div>
          </div>
        </div>
      ) : (
        <div className="Details-Loading">
          <Spinner size="large" color="green" />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ reducer: { selectedTab } }) => ({
  selectedTab
});

export default connect(mapStateToProps)(Details);
