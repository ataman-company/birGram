"use client";
import React, { useRef, useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css"; // استایل‌های پیش‌فرض Video.js

const VideoPlayer = ({ options }) => {
  const videoRef = useRef(null); // برای نگه‌داری عنصر ویدیو
  const playerRef = useRef(null); // برای نگه‌داری نمونه Video.js

  useEffect(() => {
    // اگر پلیر قبلاً مقداردهی نشده، یک نمونه جدید ایجاد کن
    if (playerRef.current === null) {
      playerRef.current = videojs(videoRef.current, options, () => {
        console.log("Player is ready!");
      });
    } else {
      // اگر پلیر وجود دارد، آپدیتش کن
      playerRef.current.src(options.sources);
    }

    return () => {
      // هنگام حذف کامپوننت، پلیر را از بین ببر
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [options]);

  return (
    <div className="w-full" data-vjs-player>
      <video
        ref={videoRef}
        className="video-js vjs-default-skin custom-class-name"
        playsInline
      ></video>
    </div>
  );
};

export default VideoPlayer;
