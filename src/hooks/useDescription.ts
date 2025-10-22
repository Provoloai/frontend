import { useState, useEffect, useRef } from "react";
import type { DescriptionState } from "@/types/description";

export const useDescription = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Lazy load video on intersection
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "100px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !videoLoaded) {
          const video = entry.target as HTMLVideoElement;
          if (video.dataset.src) {
            video.src = video.dataset.src;
            video.load();
            setVideoLoaded(true);
          }
        }
      });
    }, options);

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, [videoLoaded]);

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  return {
    videoLoaded,
    videoRef,
    handleVideoLoad,
  };
};
