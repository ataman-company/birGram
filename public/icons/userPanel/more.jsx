import React from "react";

const MoreIcon = ({
  color = "#051061",
  secondaryColor = "#FFBE00",
  size = 24,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1673_41160)">
        {/* First Path */}
        <path
          d="M9.67651 9.5566C10.9477 8.28544 10.9477 6.22449 9.67651 4.95334C8.40535 3.68218 6.3444 3.68218 5.07325 4.95334C3.80209 6.22449 3.80209 8.28544 5.07325 9.5566C6.3444 10.8278 8.40535 10.8278 9.67651 9.5566Z"
          stroke={color} // Primary color
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Second Path */}
        <path
          d="M9.13 13.49H5.62C4.79157 13.49 4.12 14.1616 4.12 14.99V18.5C4.12 19.3284 4.79157 20 5.62 20H9.13C9.95842 20 10.63 19.3284 10.63 18.5V14.99C10.63 14.1616 9.95842 13.49 9.13 13.49Z"
          stroke={secondaryColor} // Secondary color
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Third Path */}
        <path
          d="M9.67651 9.5566C10.9477 8.28544 10.9477 6.22449 9.67651 4.95334C8.40535 3.68218 6.3444 3.68218 5.07325 4.95334C3.80209 6.22449 3.80209 8.28544 5.07325 9.5566C6.3444 10.8278 8.40535 10.8278 9.67651 9.5566Z"
          stroke={color} // Primary color again
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Fourth Path */}
        <path
          d="M14.86 10.51H18.37C19.1984 10.51 19.87 9.83844 19.87 9.01001V5.50001C19.87 4.67158 19.1984 4.00001 18.37 4.00001L14.86 4.00001C14.0316 4.00001 13.36 4.67158 13.36 5.50001V9.01001C13.36 9.83844 14.0316 10.51 14.86 10.51Z"
          stroke={secondaryColor} // Secondary color
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Fifth Path */}
        <path
          d="M14.3132 14.4422C13.0421 15.7134 13.0421 17.7743 14.3132 19.0455C15.5844 20.3166 17.6453 20.3166 18.9165 19.0455C20.1877 17.7743 20.1877 15.7134 18.9165 14.4422C17.6453 13.1711 15.5844 13.1711 14.3132 14.4422Z"
          stroke={color} // Primary color again
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1673_41160">
          <rect width="24" height="24" fill="white"></rect>
        </clipPath>
      </defs>
    </svg>
  );
};

export default MoreIcon;
