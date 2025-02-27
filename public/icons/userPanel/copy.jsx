const Copy = ({ color = "currentColor", size = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`text-${color}`}
    >
      <g stroke={color} strokeWidth="1.5">
        <path d="M3.216 9.814a1.76 1.76 0 0 1 1.603-1.588c3.484-.3 5.903-.301 9.36-.002.851.074 1.53.748 1.604 1.6.305 3.44.277 5.867-.01 9.335a1.773 1.773 0 0 1-1.615 1.62c-3.466.295-5.883.294-9.305.002a1.776 1.776 0 0 1-1.616-1.627c-.28-3.433-.342-5.867-.021-9.34Z"></path>
        <path
          strokeLinecap="round"
          d="M8.178 5.239c.012-.14.024-.282.038-.425a1.76 1.76 0 0 1 1.602-1.588c3.485-.3 5.904-.301 9.36-.002.852.074 1.53.748 1.605 1.6.304 3.439.276 5.867-.01 9.335a1.772 1.772 0 0 1-1.615 1.62c-.151.013-.3.026-.447.037"
        ></path>
      </g>
    </svg>
  );
};

export default Copy;
