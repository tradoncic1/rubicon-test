import React from "react";
import "./InfoComponent.scss";

interface InfoComponentProps {
  image: string;
  text: string;
}

const InfoComponent = ({ image, text }: InfoComponentProps) => {
  return (
    <div className="InfoComponent">
      <img src={image} alt={text} />
      <h2>{text}</h2>
    </div>
  );
};

export default InfoComponent;
