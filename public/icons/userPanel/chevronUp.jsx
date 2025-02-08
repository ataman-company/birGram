// <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" class="size-16">
//   <g clip-path="url(#clip0_10624_21034)">
//     <path d="M6 15L12 9L18 15" stroke="currentcolor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
//   </g>
//   <defs>
//     <clipPath id="clip0_10624_21034">
//       <rect width="24" height="24" fill="white"></rect>
//     </clipPath>
//   </defs>
// </svg> -->

// function ChevronUpIcon({ color = "red" }) {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="currentColor"
//       style={{ color }}
//     >
//       <path d="M6 15L12 9L18 15Z" />
//     </svg>
//   );
// }

// export default ChevronUpIcon;

import React from "react";

function ChevronUpIcon({ fill = "currentColor", size = 24, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      class="size-16"
    >
      <g clip-path="url(#clip0_10624_21034)">
        <path
          d="M6 15L12 9L18 15"
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

export default ChevronUpIcon;
