import React, { useState, useEffect, useRef } from "react";
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
} from "@headlessui/react";
import Logo from "../Reusables/Logo";
import { Link } from "@tanstack/react-router";

export default function Welcome() {
    const [open] = useState(true);
    const canvasRef = useRef(null);

    // Confetti effect
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const confettiPieces = [];
        const confettiCount = 150;
        const gravity = 0.5;
        const terminalVelocity = 5;
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#a29bfe', '#fd79a8', '#fdcb6e'];

        class ConfettiPiece {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height - canvas.height;
                this.w = Math.random() * 10 + 5;
                this.h = Math.random() * 5 + 5;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.rotation = Math.random() * 360;
                this.rotationSpeed = Math.random() * 10 - 5;
                this.velocityY = Math.random() * -2 + 2;
                this.velocityX = Math.random() * 4 - 2;
                this.opacity = 1;
            }

            update() {
                this.velocityY += gravity;
                if (this.velocityY > terminalVelocity) {
                    this.velocityY = terminalVelocity;
                }
                this.x += this.velocityX;
                this.y += this.velocityY;
                this.rotation += this.rotationSpeed;

                if (this.y > canvas.height + 20) {
                    this.opacity -= 0.02;
                }
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate((this.rotation * Math.PI) / 180);
                ctx.globalAlpha = this.opacity;
                ctx.fillStyle = this.color;
                ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
                ctx.restore();
            }
        }

        for (let i = 0; i < confettiCount; i++) {
            confettiPieces.push(new ConfettiPiece());
        }

        let animationId;
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            confettiPieces.forEach((piece, index) => {
                piece.update();
                piece.draw();

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

    return (
        <>
            <canvas
                ref={canvasRef}
                className="fixed inset-0 pointer-events-none z-50"
                style={{ width: '100%', height: '100%' }}
            />
            <Dialog open={open} onClose={() => { }} className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                        >
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="text-center">
                                    <div className="w-full flex items-center flex-col">
                                        <p className="flex size-16 shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:size-10 text-primary text-2xl">
                                            🥳
                                        </p>
                                    </div>

                                    <div className="text-center sm:mt-0 sm:text-left w-full">
                                        <DialogTitle
                                            as="h3"
                                            className="text-2xl/9 font-medium tracking-tight text-gray-900 text-center mt-4"
                                        >
                                            Welcome to Pro!
                                        </DialogTitle>

                                        <p className="my-5 text-am text-center">
                                            A big welcome to Provolo Premium, we're excited to have you onboard! 🎉
                                        </p>

                                        <Link
                                            to="/proposal"
                                            className="w-full py-3 px-6 text-white rounded-lg flex items-center justify-center space-x-2 transition duration-150 ease-in-out btn-primary"
                                        >
                                            Continue
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    );
}