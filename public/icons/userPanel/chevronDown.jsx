
import React from "react";

function ChevronDownIcon({ fill = "currentColor", size = 24, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      class="size-16 "
    >
      <g clip-path="url(#clip0_10624_21034)">
        <path
          d="M18 9L12 15L6 9"
          stroke={fill}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_10624_21034">
          <rect width="24" height="24" fill="white"></rect>
        </clipPath>
      </defs>
    </svg>
  );
}

export default ChevronDownIcon;
