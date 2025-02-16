import * as React from "react";

function TrashIcon({ color = "currentColor", size = 24, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_10624_20952)">
        <path
          d="M5 8V18C5 19.66 6.34 21 8 21H16C17.66 21 19 19.66 19 18V8M14 10V16M10 10V16M7.99 5L9.1 3.34C9.66 2.5 10.6 2 11.6 2H12.39C13.4 2 14.33 2.51 14.89 3.34L16 5H20M15.99 5H8H4"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_10624_20952">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default TrashIcon;
