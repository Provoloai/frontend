import learn from "../../assets/img/learn.png";
import { Medal } from 'lucide-react';
import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";


export default function ImageMasonry() {
    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3, ease: "easeOut" },
        },
    };

    return (
        <section className="flex-1 flex flex-col overflow-y-auto relative ">
            <div className='w-4xl max-w-3xl mx-auto'>
                <motion.div className="text-start pt-20 flex" variants={itemVariants}>
                    <span>
                        <h2 className="text-3xl font-medium mb-3 text-center flex items-center gap-3">
                            Provolo Learn <Medal />
                        </h2>
                        <span className="flex justify-between">
                            <p className=" text-gray-400 flex-wrap w-1/2">
                                This is a space for freelancers who want to level up their online presence, land more gigs, and grow their careers.
                            </p>
                            <Link
                                to={"https://x.com/i/communities/1971577100684431600"}
                                target="_blank"
                                className="h-fit mt-auto items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-primary ring-1 ring-primary/10 ring-inset hover:bg-blue-50 hover:text-primary/80 transition-all duration-300 flex w-fit flex-nowrap"
                            >
                                Request Early Access
                            </Link>
                        </span>
                    </span>
                </motion.div>

                <div className="border-b border-gray-900/10 pb-10 "> </div>

                <div className='overflow-hidden mt-10 relative h-[700px]'>
                    <img src={learn} alt="Provolo Learn" className="absolute z-10" />
                </div>
            </div>
        </section>
    );
}
