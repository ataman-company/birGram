const CrossIcon = ({ color = "#FFBE00", size = 57 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 57 57"
    fill="none"
  >
    <circle cx="28.6641" cy="28.7344" r="28" fill="white" />
    <g clipPath="url(#clip0)">
      <rect
        x="8.66406"
        y="9.23438"
        width="40"
        height="40"
        rx="20"
        fill={color}
      />
      <path
        d="M35.3331 22.5664L22 35.8995"
        stroke="#1A1A1A"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M35.3331 35.8995L22 22.5664"
        stroke="#1A1A1A"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect
          x="8.66406"
          y="9.23438"
          width="40"
          height="40"
          rx="20"
          fill="white"
        />
      </clipPath>
    </defs>
  </svg>
);

export default CrossIcon;
