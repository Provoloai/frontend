import HeroContent from "./HeroContent";
import HeroScreenshot from "./HeroScreenshot";
import HeroBackgroundVectors from "./HeroBackgroundVectors";
import { HERO_STYLES } from "@/constants/hero";
import type { HeroConfig } from "@/types/hero";

interface HeroMainProps {
  config: HeroConfig;
  imageRefs: React.MutableRefObject<Record<string, HTMLImageElement | null>>;
  imagesLoaded: Record<string, boolean>;
  onImageLoad: (key: string) => void;
}

const HeroMain: React.FC<HeroMainProps> = ({
  config,
  imageRefs,
  imagesLoaded,
  onImageLoad,
}) => {
  return (
    <div className={HERO_STYLES.container}>
      <HeroContent 
        config={config} 
        imageRefs={imageRefs}
        imagesLoaded={imagesLoaded}
        onImageLoad={onImageLoad}
      />
      
      <HeroScreenshot config={config} />
      
      <HeroBackgroundVectors
        config={config}
        imageRefs={imageRefs}
        imagesLoaded={imagesLoaded}
        onImageLoad={onImageLoad}
      />
    </div>
  );
};

export default HeroMain;
