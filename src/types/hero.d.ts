export interface HeroConfig {
  subtitle: string;
  title: string;
  titleHighlight: string;
  description: string;
  cta: {
    text: string;
    href: string;
  };
  screenshot: {
    alt: string;
    src: string;
  };
  floatingImages: {
    proposals: {
      alt: string;
      src: string;
      className: string;
    };
    freelancers: {
      alt: string;
      src: string;
      className: string;
    };
    upwork: {
      alt: string;
      src: string;
      className: string;
    };
  };
  backgroundVectors: {
    vector1: {
      alt: string;
      src: string;
      className: string;
    };
    vector2: {
      alt: string;
      src: string;
      className: string;
    };
  };
}

export interface HeroState {
  imagesLoaded: Record<string, boolean>;
}

export interface HeroContentProps {
  config: HeroConfig;
  imageRefs: React.MutableRefObject<Record<string, HTMLImageElement | null>>;
  imagesLoaded: Record<string, boolean>;
  onImageLoad: (key: string) => void;
}

export interface HeroFloatingImagesProps {
  config: HeroConfig;
  imageRefs: React.MutableRefObject<Record<string, HTMLImageElement | null>>;
  imagesLoaded: Record<string, boolean>;
  onImageLoad: (key: string) => void;
}

export interface HeroScreenshotProps {
  config: HeroConfig;
}

export interface HeroBackgroundVectorsProps {
  config: HeroConfig;
  imageRefs: React.MutableRefObject<Record<string, HTMLImageElement | null>>;
  imagesLoaded: Record<string, boolean>;
  onImageLoad: (key: string) => void;
}

export interface FloatingImageProps {
  src: string;
  alt: string;
  className: string;
  dataKey: string;
  imageRef: (el: HTMLImageElement | null) => void;
  initial: any;
  animate: any;
  delay: number;
}

export interface BackgroundVectorProps {
  src: string;
  alt: string;
  className: string;
  dataKey: string;
  imageRef: (el: HTMLImageElement | null) => void;
}
