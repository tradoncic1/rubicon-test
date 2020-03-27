import { Link } from "react-router-dom";
import React from "react";
import "./InfoCard.scss";

type Type = "movie" | "tv";

interface InfoCardProps {
  // movie/show id in the db
  id: number;
  //name of the movie/show
  name: string;
  // url to the poster
  imageUrl: string;
  // main genres
  genres: string[];
  // rating out of 10
  rating: number;
  // movie or show
  type: Type;
}

const InfoCard = ({
  id,
  name,
  imageUrl,
  genres,
  rating,
  type
}: InfoCardProps) => {
  return (
    <div className="InfoCard-Wrap">
      <div className="InfoCard-ImageWrap">
        <div className="InfoCard-Overlay">
          <h3 className="InfoCard-Text InfoCard-Rating">★ {rating} / 10</h3>
          <div className="InfoCard-Text InfoCard-Genres">
            {genres.map((genre, index) => (
              <h2 key={index}>{genre}</h2>
            ))}
          </div>
          <Link className="InfoCard-View" to={`/${type}/${id}`}>
            View Details
          </Link>
        </div>
        <img
          className="InfoCard-Text InfoCard-Image"
          src={imageUrl}
          alt={name}
        />
      </div>
      <Link className="InfoCard-Text InfoCard-Name" to={`/${type}/${id}`}>
        <h2>{name}</h2>
      </Link>
    </div>
  );
};

export default InfoCard;
