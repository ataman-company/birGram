const MenuIcon = ({ color = "#FFBE00", size = 56 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size + 1} // Maintaining original height ratio (57)
    viewBox="0 0 56 57"
    fill="none"
  >
    <circle cx="28" cy="28.7344" r="28" fill="white" />
    <g clipPath="url(#clip0_2678_10032)">
      <rect x="8" y="9.23438" width="40" height="40" rx="20" fill={color} />
      <path
        d="M37.4262 25.2461H18.5703"
        stroke="#1A1A1A"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M37.4262 34.2461H18.5703"
        stroke="#1A1A1A"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_2678_10032">
        <rect x="8" y="9.23438" width="40" height="40" rx="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default MenuIcon;
