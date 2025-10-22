import { useEffect, useRef, useState } from "react";
import type { IntersectionObserverOptions } from "@/types/learn";

interface UseIntersectionObserverProps {
  options?: IntersectionObserverOptions;
  onIntersect?: () => void;
}

export const useIntersectionObserver = <T extends HTMLElement = HTMLElement>({
  options = {
    root: null,
    rootMargin: "100px",
    threshold: 0.1,
  },
  onIntersect,
}: UseIntersectionObserverProps = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasIntersected) {
          setIsIntersecting(true);
          setHasIntersected(true);
          onIntersect?.();
        }
      });
    }, options);

    observer.observe(element);

    return () => observer.disconnect();
  }, [options, onIntersect, hasIntersected]);

  return { elementRef, isIntersecting, hasIntersected };
};
