// Types for the Learn component

export interface LearnImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

export interface LearnHeaderProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
}

export interface LearnContentProps {
  imageProps: LearnImageProps;
}

export interface IntersectionObserverOptions {
  root: Element | null;
  rootMargin: string;
  threshold: number;
}

export interface LearnState {
  imageLoaded: boolean;
}
