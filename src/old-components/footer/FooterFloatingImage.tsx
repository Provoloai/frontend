import { motion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { FOOTER_ANIMATIONS } from "@/constants/footer";
import type { FloatingImageProps } from "@/types/footer";

const FooterFloatingImage: React.FC<FloatingImageProps> = ({
  src,
  alt,
  className,
  initial,
  animate,
  delay,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "50px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isLoaded) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            setIsLoaded(true);
          }
        }
      });
    }, options);

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [isLoaded]);

  return (
    <motion.img
      ref={imgRef}
      alt={alt}
      data-src={src}
      className={className}
      initial={initial}
      animate={{
        ...animate,
        transition: { duration: 0.5, delay, ease: "easeOut" },
      }}
      variants={FOOTER_ANIMATIONS.floating}
      whileInView="animate"
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
      loading="lazy"
      style={{ willChange: "transform" }}
    />
  );
};

export default FooterFloatingImage;
