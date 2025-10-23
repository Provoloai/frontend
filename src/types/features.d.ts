export interface Feature {
  id: number;
  text: string;
}

export interface Step {
  id: number;
  title: string;
  vidSrc: string;
  description: string;
}

export interface FeaturesConfig {
  intro: {
    main: string;
    highlight: string;
  };
  features: Feature[];
  steps: Step[];
  sectionTitle: string;
}

export interface FeaturesState {
  videosLoaded: Record<number, boolean>;
}

export interface FeaturesHeaderProps {
  config: FeaturesConfig;
}

export interface FeaturesListProps {
  config: FeaturesConfig;
}

export interface FeaturesStepsProps {
  config: FeaturesConfig;
  videoRefs: React.MutableRefObject<(HTMLVideoElement | null)[]>;
  onVideoLoad: (index: number) => void;
}

export interface FeaturesStepItemProps {
  step: Step;
  index: number;
  videoRef: (el: HTMLVideoElement | null) => void;
  onVideoLoad: () => void;
}