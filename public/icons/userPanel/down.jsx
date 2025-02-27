const Down = ({ color = "currentColor", size = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className="cursor-pointer"
    >
      <g clipPath="url(#clip0)">
        <path
          d="M18 9L12 15L6 9"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="24" height="24" fill="white"></rect>
        </clipPath>
      </defs>
    </svg>
  );
};

export default Down;
