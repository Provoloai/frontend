import { useHero } from "@/hooks/useHero";
import { HERO_CONFIG } from "@/constants/hero";
import HeroMain from "@/components/hero/HeroMain";

export const Hero = () => {
  const { imagesLoaded, imageRefs, handleImageLoad } = useHero();

  return (
    <HeroMain
      config={HERO_CONFIG}
      imageRefs={imageRefs}
      imagesLoaded={imagesLoaded}
      onImageLoad={handleImageLoad}
    />
  );
};