import React from "react";

const Withdraw = ({
  size = 24,
  color, // if provided, overrides both primary and secondary colors
  primaryColor = "#051061",
  secondaryColor = "#FFBE00",
}) => {
  // Override both colors if the color prop is provided
  if (color) {
    primaryColor = color;
    secondaryColor = color;
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1699_42648)">
        <path
          d="M9 3H17"
          stroke={secondaryColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13 15C14.1046 15 15 14.1046 15 13C15 11.8954 14.1046 11 13 11C11.8954 11 11 11.8954 11 13C11 14.1046 11.8954 15 13 15Z"
          stroke={primaryColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.5 15V11"
          stroke={primaryColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* This duplicate path is included as in the original SVG */}
        <path
          d="M13 15C14.1046 15 15 14.1046 15 13C15 11.8954 14.1046 11 13 11C11.8954 11 11 11.8954 11 13C11 14.1046 11.8954 15 13 15Z"
          stroke={primaryColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18.5 11V15"
          stroke={primaryColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.98999 12V6"
          stroke={secondaryColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 8L3.99 6L2 7.99"
          stroke={secondaryColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 6H19C20.66 6 22 7.34 22 9V17C22 18.66 20.66 20 19 20H7C5.34 20 4 18.66 4 17V15"
          stroke={primaryColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1699_42648">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Withdraw;
