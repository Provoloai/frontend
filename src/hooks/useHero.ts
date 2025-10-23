import { useState, useEffect, useRef } from "react";

export const useHero = () => {
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});
  const imageRefs = useRef<Record<string, HTMLImageElement | null>>({});

  const handleImageLoad = (key: string) => {
    setImagesLoaded(prev => ({ ...prev, [key]: true }));
  };

  // Lazy load images on intersection
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "100px",
      threshold: 0.01,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          const imgKey = img.dataset.key;
          if (img.dataset.src && !imagesLoaded[imgKey as string]) {
            img.src = img.dataset.src;
            handleImageLoad(imgKey as string);
          }
        }
      });
    }, options);

    Object.values(imageRefs.current).forEach((img) => {
      if (img) observer.observe(img);
    });

    return () => observer.disconnect();
  }, [imagesLoaded]);

  return {
    imagesLoaded,
    imageRefs,
    handleImageLoad,
  };
};
