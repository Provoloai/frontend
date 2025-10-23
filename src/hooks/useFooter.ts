import { useState } from "react";

export const useFooter = () => {
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});

  const handleImageLoad = (key: string) => {
    setImagesLoaded(prev => ({ ...prev, [key]: true }));
  };

  return {
    imagesLoaded,
    handleImageLoad,
  };
};
