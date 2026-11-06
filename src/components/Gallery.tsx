"use client";

import {useEffect, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import Image from "next/image";
import {X} from "lucide-react";

const images = [
    {
        src: "/gallery/group.jpg",
        alt: "Board game community event in Dubai",
        caption: "Hosting RGApps Boardgame Nights with friends & community in Dubai",
    },
    {
        src: "/gallery/group2.jpg",
        alt: "Playing Cash 'n Guns at board game night",
        caption: "Game nights — testing mechanics & building connections",
    },
    {
        src: "/gallery/group3.jpg",
        alt: "Strategy board game session",
        caption: "Deep strategy & deduction at the table",
    },
    {
        src: "/gallery/group4.jpg",
        alt: "Friends playing card games",
        caption: "Good company, great games, and lots of laughs",
    },
    {
        src: "/gallery/family.svg",
        alt: "With my daughter",
        caption: "Fatherhood — my proudest role",
    },
    {
        src: "/gallery/travel.svg",
        alt: "Mountain view",
        caption: "Exploring Colombia’s Cocora Valley & the world",
    },
    {
        src: "/gallery/coffee.svg",
        alt: "Home brew setup",
        caption: "My coffee lab at home",
    },
    {
        src: "/gallery/desk.svg",
        alt: "Minimal dev workspace",
        caption: "My focused dev zone",
    },
];

export default function Gallery() {
    const [activeImage, setActiveImage] = useState<(typeof images)[number] | null>(
        null
    );

    useEffect(() => {
        if (!activeImage) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setActiveImage(null);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [activeImage]);

    return (
        <>
            <div className="max-w-5xl mx-auto grid gap-5 sm:grid-cols-2 md:grid-cols-4">
                {images.map((img) => (
                    <motion.button
                        key={img.src}
                        type="button"
                        onClick={() => setActiveImage(img)}
                        whileHover={{y: -4}}
                        className="glass-card-interactive rounded-2xl overflow-hidden flex flex-col justify-between text-left cursor-pointer group focus:outline-none focus:ring-2 focus:ring-pink-300"
                    >
                        <div className="w-full h-40 overflow-hidden bg-black/20">
                            <Image
                                src={img.src}
                                alt={img.alt}
                                width={600}
                                height={400}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <p className="text-white/85 text-xs sm:text-sm p-3.5 leading-snug">
                            {img.caption}
                        </p>
                    </motion.button>
                ))}
            </div>

            <AnimatePresence>
                {activeImage && (
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-label={activeImage.alt}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        onClick={() => setActiveImage(null)}
                        className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{scale: 0.94, opacity: 0}}
                            animate={{scale: 1, opacity: 1}}
                            exit={{scale: 0.94, opacity: 0}}
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-w-3xl w-full glass-card rounded-2xl overflow-hidden"
                        >
                            <button
                                type="button"
                                aria-label="Close photo preview"
                                onClick={() => setActiveImage(null)}
                                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-slate-950/75 text-white hover:bg-slate-900 transition cursor-pointer"
                            >
                                <X className="w-4 h-4"/>
                            </button>
                            <Image
                                src={activeImage.src}
                                alt={activeImage.alt}
                                width={900}
                                height={600}
                                className="w-full max-h-[70vh] object-contain bg-slate-950/60"
                            />
                            <div className="p-4 text-center text-white/90 text-sm font-medium">
                                {activeImage.caption}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
