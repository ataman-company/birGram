export default function LogoutIcon({
  fill = "currentColor",
  size = 24,
  className = "",
  ...props
}) {
  return (
    <svg
      // Set the fill color
      fill={fill}
      // Control width & height with `size`
      width={size}
      height={size}
      viewBox="0 0 24 24"
      // Merge any other props (e.g., onClick)
      className={className}
      {...props}
    >
      <path
        d="M10 9V5a1 1 0 00-1-1H6a5 5 0 00-5 5v6a5 
          5 0 005 5h3a1 1 0 001-1v-4a1 1 0 10-2 
          0v3H6a3 3 0 01-3-3V9a3 3 0 013-3h3v3a1 1 
          0 002 0zm10.707 2.293l-3-3a1 1 0 10-1.414 
          1.414L17.586 11H12a1 1 0 100 2h5.586l-1.293 
          1.293a1 1 0 101.414 1.414l3-3a1 1 0 
          000-1.414z"
      />
    </svg>
  );
}
