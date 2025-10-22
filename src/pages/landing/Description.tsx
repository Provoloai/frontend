import { useDescription } from "@/hooks/useDescription";
import { DESCRIPTION_CONFIG } from "@/constants/description";
import DescriptionContent from "@/components/description/DescriptionContent";

export default function Description() {
  const { videoRef, handleVideoLoad } = useDescription();

  return (
    <section className="py-10 lg:px-32 md:px-10 px-5" id="features">
      <DescriptionContent
        config={DESCRIPTION_CONFIG}
        videoRef={videoRef}
        onVideoLoad={handleVideoLoad}
      />
    </section>
  );
}