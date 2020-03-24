import React from "react";
import "./ShowDetails.scss";

const ShowDetails = props => {
  return (
    <div className="ShowDetails-Page">
      <h1>Show Details page</h1>
      <br />
      <h3>ID: {props.match.params.id}</h3>
    </div>
  );
};

export default ShowDetails;
