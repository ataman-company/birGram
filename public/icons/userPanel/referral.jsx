import React from "react";

const ReferralIcon = ({ color = "#FFBD01", size = 24, ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.73932 6.59387C8.28402 6.59387 9.53625 5.34164 9.53625 3.79694C9.53625 2.25223 8.28402 1 6.73932 1C5.19461 1 3.94238 2.25223 3.94238 3.79694C3.94238 5.34164 5.19461 6.59387 6.73932 6.59387Z"
        stroke={color}
        strokeWidth="1.25862"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.43295 9.43542C7.2092 9.41304 6.97425 9.40186 6.73931 9.40186C4.11019 9.40186 1.87264 11.0576 1 13.3735"
        stroke={color}
        strokeWidth="1.25862"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.3265 15.4545C13.6868 15.4545 15.6002 13.5411 15.6002 11.1808C15.6002 8.82051 13.6868 6.9071 11.3265 6.9071C8.96614 6.9071 7.05273 8.82051 7.05273 11.1808C7.05273 13.5411 8.96614 15.4545 11.3265 15.4545Z"
        fill={color}
      />
      <path
        d="M13.4632 11.1808H9.18945"
        stroke={color}
        strokeWidth="1.25862"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.3264 13.3177V9.04395"
        stroke={color}
        strokeWidth="1.25862"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ReferralIcon;
