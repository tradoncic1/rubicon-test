import { useHistory } from "react-router-dom";
import React from "react";
import "./InfoCard.scss";

type Type = "movie" | "show";

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
  let history = useHistory();

  const linkToDetails = () => {
    history.push(`/${type}/${id}`);
  };

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
          <div className="InfoCard-View" onClick={linkToDetails}>
            View Details
          </div>
        </div>
        <img
          className="InfoCard-Text InfoCard-Image"
          src={imageUrl}
          alt={name}
        />
      </div>
      <h2 className="InfoCard-Text InfoCard-Name" onClick={linkToDetails}>
        {name}
      </h2>
    </div>
  );
};

export default InfoCard;
