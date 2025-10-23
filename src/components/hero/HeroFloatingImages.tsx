import { useEffect } from "react";
import HeroFloatingImage from "./HeroFloatingImage";
import type { HeroFloatingImagesProps } from "@/types/hero";

const HeroFloatingImages: React.FC<HeroFloatingImagesProps> = ({
  config,
  imageRefs,
  imagesLoaded,
  onImageLoad,
}) => {
  const floatingImages = [
    {
      key: "proposals",
      config: config.floatingImages.proposals,
      initial: { opacity: 0, x: 30, rotate: 8 },
      animate: { opacity: 1, x: 0, rotate: 0 },
      delay: 0.8,
    },
    {
      key: "freelancers",
      config: config.floatingImages.freelancers,
      initial: { opacity: 0, x: -30, rotate: -8 },
      animate: { opacity: 1, x: 0, rotate: 0 },
      delay: 0.6,
    },
    {
      key: "upwork",
      config: config.floatingImages.upwork,
      initial: { opacity: 0, y: 30, rotate: 10 },
      animate: { opacity: 1, y: 0, rotate: 0 },
      delay: 1.0,
    },
  ];

  // Set up intersection observer for floating images
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

    // Observe all floating images
    floatingImages.forEach(({ key }) => {
      const img = imageRefs.current[key];
      if (img) observer.observe(img);
    });

    return () => observer.disconnect();
  }, [floatingImages, imagesLoaded, onImageLoad]);

  return (
    <>
      {floatingImages.map(({ key, config: imageConfig, initial, animate, delay }) => (
        <HeroFloatingImage
          key={key}
          src={imageConfig.src}
          alt={imageConfig.alt}
          className={imageConfig.className}
          dataKey={key}
          imageRef={(el) => {
            imageRefs.current[key] = el;
          }}
          initial={initial}
          animate={animate}
          delay={delay}
        />
      ))}
    </>
  );
};

export default HeroFloatingImages;
