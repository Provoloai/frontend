import { useEffect, useRef } from "react";
import { CONFETTI_CONFIG } from "@/constants/welcome";
import type { ConfettiPiece } from "@/types/welcome";

class ConfettiPieceClass implements ConfettiPiece {
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

  constructor(canvas: HTMLCanvasElement) {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height - canvas.height;
    this.w = Math.random() * 10 + 5;
    this.h = Math.random() * 5 + 5;
    this.color = CONFETTI_CONFIG.colors[Math.floor(Math.random() * CONFETTI_CONFIG.colors.length)];
    this.rotation = Math.random() * 360;
    this.rotationSpeed = Math.random() * 10 - 5;
    this.velocityY = Math.random() * -2 + 2;
    this.velocityX = Math.random() * 4 - 2;
    this.opacity = 1;
  }

  update() {
    this.velocityY += CONFETTI_CONFIG.gravity;
    if (this.velocityY > CONFETTI_CONFIG.terminalVelocity) {
      this.velocityY = CONFETTI_CONFIG.terminalVelocity;
    }
    this.x += this.velocityX;
    this.y += this.velocityY;
    this.rotation += this.rotationSpeed;

    if (this.y > window.innerHeight + 20) {
      this.opacity -= 0.02;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
    ctx.restore();
  }
}

export const useConfetti = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiPieces: ConfettiPieceClass[] = [];

    for (let i = 0; i < CONFETTI_CONFIG.count; i++) {
      confettiPieces.push(new ConfettiPieceClass(canvas));
    }

    let animationId: number;

    function animate() {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      confettiPieces.forEach((piece, index) => {
        piece.update();
        piece.draw(ctx);

        if (piece.opacity <= 0) {
          confettiPieces.splice(index, 1);
        }
      });

      if (confettiPieces.length > 0) {
        animationId = requestAnimationFrame(animate);
      }
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return canvasRef;
};
