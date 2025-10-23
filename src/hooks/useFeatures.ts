import { useState, useEffect, useRef } from "react";

export const useFeatures = () => {
  const [videosLoaded, setVideosLoaded] = useState<Record<number, boolean>>({});
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Lazy load videos on intersection
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "50px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const video = entry.target as HTMLVideoElement;
          if (video.dataset.src && !videosLoaded[Number(video.dataset.index)]) {
            video.src = video.dataset.src;
            video.load();
            
            // Play the video after it loads
            video.addEventListener('loadeddata', () => {
              video.play().catch(console.error);
            });
            
            setVideosLoaded(prev => ({ ...prev, [Number(video.dataset.index)]: true }));
          }
        }
      });
    }, options);

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => observer.disconnect();
  }, [videosLoaded]);

  const handleVideoLoad = (index: number) => {
    setVideosLoaded(prev => ({ ...prev, [index]: true }));
  };

  return {
    videosLoaded,
    videoRefs,
    handleVideoLoad,
  };
};
