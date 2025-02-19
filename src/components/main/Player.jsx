import dynamic from "next/dynamic";

// Dynamically import ReactPlayer to avoid SSR issues.
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const MyReactPlayer = ({ src }) => {
  return (
    <div
      className="player-wrapper"
      style={{
        position: "relative",
        paddingTop: "56.25%", // 16:9 Aspect Ratio
        borderRadius: "16px", // Rounded corners
        overflow: "hidden", // Hide overflow for rounded corners
      }}
    >
      <ReactPlayer
        url={src} // Local video file in the public folder
        className="react-player"
        playing={true} // Set to true to autoplay
        muted={true} // Mute the video to comply with autoplay policies
        controls
        width="100%"
        height="100%"
        style={{ position: "absolute", top: 0, left: 0 }}
      />
    </div>
  );
};

export default MyReactPlayer;
