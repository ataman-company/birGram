import React from "react";

const AlertIcon = ({ color = "#FFBE00", size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
  >
    <path
      d="M12 21.41H5.94c-3.47 0-4.92-2.48-3.24-5.51l3.12-5.62L8.76 5c1.78-3.21 4.7-3.21 6.48 0l2.94 5.29 3.12 5.62c1.68 3.03.22 5.51-3.24 5.51H12z"
      fill={color}
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      style={{
        fillOpacity: 1,
        strokeOpacity: 1,
      }}
    />
    <path
      d="M11.994 17h.01"
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      style={{
        strokeOpacity: 1,
      }}
    />
    <path
      d="M12 9v5"
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      style={{
        strokeOpacity: 1,
      }}
    />
  </svg>
);

export default AlertIcon;
