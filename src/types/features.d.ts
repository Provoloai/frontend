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
  sectionTitle: string;
  stepsTitle: string;
  features: Feature[];
  steps: Step[];
}

export interface FeaturesState {
  videosLoaded: Record<string, boolean>;
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
  videosLoaded: Record<string, boolean>;
  setVideosLoaded: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

export interface FeaturesStepItemProps {
  step: Step;
  index: number;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isLoaded: boolean;
  onLoad: (index: number) => void;
}
