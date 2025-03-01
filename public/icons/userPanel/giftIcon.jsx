import React from "react";

const GiftIcon = ({ color = "#FFBD01", size = 24, ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Gift box */}
      <path
        d="M2 7H14V14H2V7Z"
        stroke={color}
        strokeWidth="1.25862"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Top rectangle (box lid) */}
      <path
        d="M2 5H14V7H2V5Z"
        stroke={color}
        strokeWidth="1.25862"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Vertical ribbon */}
      <path
        d="M8 5V14"
        stroke={color}
        strokeWidth="1.25862"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Horizontal ribbon across the middle of the box */}
      <path
        d="M2 9H14"
        stroke={color}
        strokeWidth="1.25862"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Left bow arc */}
      <path
        d="M6 5C5 3 3 3 2 5"
        stroke={color}
        strokeWidth="1.25862"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right bow arc */}
      <path
        d="M10 5C11 3 13 3 14 5"
        stroke={color}
        strokeWidth="1.25862"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default GiftIcon;
