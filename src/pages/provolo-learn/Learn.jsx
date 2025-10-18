import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Medal } from 'lucide-react';
import { Link } from "@tanstack/react-router";
import learn from "../../assets/img/learn.png";

export default function Learn() {
    const [imageLoaded, setImageLoaded] = useState(false);
    const imageRef = useRef(null);

    // Lazy load image on intersection
    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '100px',
            threshold: 0.1,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !imageLoaded) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        setImageLoaded(true);
                    }
                }
            });
        }, options);

        if (imageRef.current) {
            observer.observe(imageRef.current);
        }

        return () => observer.disconnect();
    }, [imageLoaded]);

    // Optimized animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.4,
                staggerChildren: 0.08,
            },
        },
    };

    const headerVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: "easeOut" },
        },
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.98 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5, ease: "easeOut" },
        },
    };

    return (
        <section className="flex-1 flex flex-col overflow-y-auto relative">
            <motion.div
                className="w-full max-w-3xl mx-auto "
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px", amount: 0.2 }}
                variants={containerVariants}
            >
                <motion.header className="text-start pt-20" variants={headerVariants}>
                    <motion.h1
                        className="text-3xl font-medium mb-3 flex items-center gap-3"
                        variants={headerVariants}
                    >
                        Provolo Learn <Medal aria-hidden="true" />
                    </motion.h1>

                    <motion.div
                        className="flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-0"
                        variants={headerVariants}
                    >
                        <p className="text-gray-400 sm:w-2/3">
                            This is a space for freelancers who want to level up their online presence, land more gigs, and grow their careers.
                        </p>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className="h-fit mt-auto"
                        >
                            <Link
                                to="https://x.com/i/communities/1971577100684431600"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="h-fit mt-auto items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-primary ring-1 ring-primary/10 ring-inset hover:bg-blue-100 hover:text-primary/90 transition-all duration-200 flex w-fit disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Request Early Access
                            </Link>
                        </motion.div>
                    </motion.div>
                </motion.header>

                <motion.div
                    className="border-b border-gray-900/10 pb-10"
                    variants={headerVariants}
                />

                <motion.div
                    className="overflow-hidden mt-10 relative h-[550px] rounded-2xl bg-gray-50"
                    variants={imageVariants}
                >
                    <img
                        ref={imageRef}
                        data-src={learn}
                        alt="Provolo Learn platform interface"
                        className="absolute z-10 w-full h-full object-cover object-top"
                        loading="lazy"
                        style={{ willChange: 'transform' }}
                    />
                </motion.div>
            </motion.div>
        </section>
    );
}