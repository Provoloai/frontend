export interface ConfettiPiece {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  velocityY: number;
  velocityX: number;
  opacity: number;
  update(): void;
  draw(ctx: CanvasRenderingContext2D): void;
}

export interface ConfettiConfig {
  count: number;
  gravity: number;
  terminalVelocity: number;
  colors: string[];
}

export interface ConfettiCanvasProps {
  className?: string;
}

export interface WelcomeDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface WelcomeContentProps {
  onContinue: () => void;
}
