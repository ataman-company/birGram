import React from "react";

const Deposit = ({
  size = 24,
  color, // if provided, overrides both primary and secondary colors
  primaryColor = "#051061",
  secondaryColor = "#FFBE00",
}) => {
  // Override both colors if a single color prop is passed
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
      <g clipPath="url(#clip0_1699_42660)">
        <path
          d="M7 3H15"
          stroke={secondaryColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.5 15V11"
          stroke={primaryColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11 15C12.1046 15 13 14.1046 13 13C13 11.8954 12.1046 11 11 11C9.89543 11 9 11.8954 9 13C9 14.1046 9.89543 15 11 15Z"
          stroke={primaryColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.5 11V15"
          stroke={primaryColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19.99 14V20"
          stroke={secondaryColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 18L19.99 20L18 18.01"
          stroke={secondaryColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 20H5C3.34 20 2 18.66 2 17V9C2 7.34 3.34 6 5 6H17C18.66 6 20 7.34 20 9V11"
          stroke={primaryColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1699_42660">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Deposit;
