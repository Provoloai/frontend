export interface DescriptionFeature {
  id: number;
  text: string;
}

export interface DescriptionConfig {
  title: string;
  subtitle: string;
  features: DescriptionFeature[];
  ctaText: string;
  ctaLink: string;
}

export interface DescriptionState {
  videoLoaded: boolean;
}

export interface DescriptionContentProps {
  config: DescriptionConfig;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  onVideoLoad: () => void;
}

export interface DescriptionVideoProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  onVideoLoad: () => void;
}
