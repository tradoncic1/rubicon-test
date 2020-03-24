import React from "react";
import "./MovieDetails.scss";

const MovieDetails = props => {
  return (
    <div className="MovieDetails-Page">
      <h1>Movie Details page</h1>
      <br />
      <h3>ID: {props.match.params.id}</h3>
    </div>
  );
};

export default MovieDetails;
