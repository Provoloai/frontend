import { useFeatures } from "@/hooks/useFeatures";
import { FEATURES_CONFIG } from "@/constants/features";
import FeaturesContent from "@/old-components/features/FeaturesContent";

const Features = () => {
  const { videoRefs, handleVideoLoad } = useFeatures();

  return (
    <FeaturesContent
      config={FEATURES_CONFIG}
      videoRefs={videoRefs}
      onVideoLoad={handleVideoLoad}
    />
  );
};

export default Features;