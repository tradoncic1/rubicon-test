import React, { useEffect, useState } from "react";
import "./Details.scss";
import { Link } from "react-router-dom";
import { getImageOriginal } from "../../utilities";
import Spinner from "../../components/spinner/Spinner";
import requests from "../../api/requests";
import { connect } from "react-redux";

const Details = props => {
  const { params } = props.match;
  const [details, setDetails] = useState({} as any);
  const [trailer, setTrailer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchVideo = async (id: number, type: "movie" | "show") => {};

  const fetchDetails = async () => {
    await requests
      .details(params.type, params.id)
      .then(response => setDetails(response.data));
  };

  useEffect(() => {
    if (params.type !== "movie" && params.type !== "tv") {
      props.history.push("/");
    } else {
      fetchDetails();
    }
  }, []);

  console.log(details);

  return (
    <div className="Details-Page">
      <Link className="Details-Back" to={"/"}>
        {"< Back"}
      </Link>
      {!isLoading ? (
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
