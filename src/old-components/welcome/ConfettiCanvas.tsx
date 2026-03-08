import { useConfetti } from "@/hooks/useConfetti";
import type { ConfettiCanvasProps } from "@/types/welcome";

const ConfettiCanvas: React.FC<ConfettiCanvasProps> = ({ className = "" }) => {
  const canvasRef = useConfetti();

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-50 ${className}`}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default ConfettiCanvas;
