import * as React from "react";

function ShoppingCartIcon({ color = "currentColor", size = 24, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_10624_21046)">
        <path
          d="M11 20C11 20.83 10.33 21.5 9.5 21.5C8.67 21.5 8 20.83 8 20C8 19.17 8.67 18.5 9.5 18.5C10.33 18.5 11 19.17 11 20Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20 20C20 20.83 19.33 21.5 18.5 21.5C17.67 21.5 17 20.83 17 20C17 19.17 17.67 18.5 18.5 18.5C19.33 18.5 20 19.17 20 20Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 4H17.5C19.71 4 21.5 5.79 21.5 8V12C21.5 14.21 19.71 16 17.5 16H10C7.79 16 6 14.21 6 12V4ZM6 4C6 2.9 5.1 2 4 2H2.5"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_10624_21046">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default ShoppingCartIcon;
