"use client";

import {motion} from "framer-motion";
import {Compass, MapPin} from "lucide-react";

const traveling = [
    {
        code: "CO",
        country: "Colombia",
        city: "Medellín & Bogotá",
        period: "– 2017",
        note: "Where I grew up, studied engineering, and began my career.",
    },
    {
        code: "SG",
        country: "Singapore",
        city: "Singapore",
        period: "2017 – 2022",
        note: "Discovered the power of diversity, precision, and discipline.",
    },
    {
        code: "AE",
        country: "United Arab Emirates",
        city: "Dubai",
        period: "2022 – Present",
        note: "Started a new chapter as a father and senior engineer.",
    },
    {
        code: "EU",
        country: "Next Horizon",
        city: "Possibly Ireland",
        period: "Next?",
        note: "We’re open to where life takes us next — curiosity leads.",
    },
];

export default function Traveling() {
    return (
        <div className="max-w-3xl mx-auto space-y-4 text-left">
            {traveling.map(({code, country, city, period, note}) => (
                <motion.div
                    key={city}
                    whileHover={{x: 4}}
                    className="glass-card-interactive p-5 rounded-2xl border-l-4 border-l-pink-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                    <div className="space-y-1">
                        <div className="flex items-center gap-2.5 text-pink-300 font-semibold text-base">
                            {code === "EU" ? (
                                <Compass className="w-4 h-4 flex-shrink-0"/>
                            ) : (
                                <MapPin className="w-4 h-4 flex-shrink-0"/>
                            )}
                            <span>
                                {city}, {country}
                            </span>
                            <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-pink-300/15 border border-pink-300/30 text-pink-200">
                                {code}
                            </span>
                        </div>
                        <div className="text-sm text-white/85 leading-relaxed">
                            {note}
                        </div>
                    </div>
                    <div className="text-xs font-medium text-pink-200/90 bg-white/10 border border-white/15 px-3 py-1 rounded-full self-start sm:self-center whitespace-nowrap">
                        {period}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
