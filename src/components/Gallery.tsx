"use client";

import {motion} from "framer-motion";
import Image from "next/image";

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
        caption: "My coffee lab at home ☕",
    },
    {
        src: "/gallery/desk.svg",
        alt: "Minimal dev workspace",
        caption: "My focused dev zone",
    },
];

export default function Gallery() {
    return (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {images.map(({src, alt, caption}) => (
                <motion.div
                    key={src}
                    whileHover={{scale: 1.03}}
                    className="rounded-lg overflow-hidden shadow-lg bg-white/5 backdrop-blur-sm flex flex-col justify-between"
                >
                    <Image
                        src={src}
                        alt={alt}
                        width={600}
                        height={400}
                        className="w-full h-48 object-cover"
                    />
                    <p className="text-white/80 text-sm p-3">{caption}</p>
                </motion.div>
            ))}
        </div>
    );
}
