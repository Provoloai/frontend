import { useEffect } from "react";
import HeroBackgroundVector from "./HeroBackgroundVector";
import type { HeroBackgroundVectorsProps } from "@/types/hero";

const HeroBackgroundVectors: React.FC<HeroBackgroundVectorsProps> = ({
  config,
  imageRefs,
  imagesLoaded,
  onImageLoad,
}) => {
  const backgroundVectors = [
    {
      key: "vector1",
      config: config.backgroundVectors.vector1,
    },
    {
      key: "vector2",
      config: config.backgroundVectors.vector2,
    },
  ];

  // Set up intersection observer for background vectors
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
            onImageLoad(imgKey as string);
          }
        }
      });
    }, options);

    // Observe all background vectors
    backgroundVectors.forEach(({ key }) => {
      const img = imageRefs.current[key];
      if (img) observer.observe(img);
    });

    return () => observer.disconnect();
  }, [backgroundVectors, imagesLoaded, onImageLoad]);

  return (
    <>
      {backgroundVectors.map(({ key, config: vectorConfig }) => (
        <HeroBackgroundVector
          key={key}
          src={vectorConfig.src}
          alt={vectorConfig.alt}
          className={vectorConfig.className}
          dataKey={key}
          imageRef={(el) => {
            imageRefs.current[key] = el;
          }}
        />
      ))}
    </>
  );
};

export default HeroBackgroundVectors;
