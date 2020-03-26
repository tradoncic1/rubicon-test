import React from "react";
import "./Spinner.scss";

type SpinnerColor = "blue" | "green" | "red";
type SpinnerSize = "small" | "medium" | "large";

interface SpinnerProps {
  size?: SpinnerSize;
  color?: SpinnerColor;
}

const Spinner = ({ size = "medium", color = "blue" }: SpinnerProps) => {
  const getSizePixels = () => {
    switch (size) {
      case "small":
        return "32px";
      case "medium":
        return "48px";
      case "large":
        return "64px";
      default:
        return "32px";
    }
  };
  const getHexColor = () => {
    switch (color) {
      case "blue":
        return "#5DB1D1";
      case "green":
        return "#90C978";
      case "red":
        return "#FE6B64";
      default:
        return "#FFF";
    }
  };

  const spinnerSvg = (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 192 192"
    >
      <path
        d="M163.24,28.88l-17,17a71,71,0,1,1-100.52,0l-17-17a95,95,0,1,0,134.48,0Z"
        fill={getHexColor()}
      />
    </svg>
  );
  return <div className={`Spinner Spinner-${size}`}>{spinnerSvg}</div>;
};

export default Spinner;
