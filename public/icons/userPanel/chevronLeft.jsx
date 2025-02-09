import React from "react";

function ChevronLeftIcon({
  fill = "currentColor",
  size = 24,
  className = "",
  ...props
}) {
  return (
    <svg
      // Set the fill color
      fill={fill}
      // Adjust width & height via props
      width={size}
      height={size}
      // Merge any additional props/classes
      className={`transform ${className}`}
      viewBox="0 0 20 20"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M12.293 4.293a1 1 0 0 1 1.414 
           1.414L7.414 12l6.293 6.293a1 1 
           0 1 1-1.414 1.414l-7-7a1 1 0 
           0 1 0-1.414l7-7z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default ChevronLeftIcon;
