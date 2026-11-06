"use client";

import {motion} from "framer-motion";
import {MapPin} from "lucide-react";

const traveling = [
    {
        country: "🇨🇴 Colombia",
        city: "Medellín & Bogotá",
        period: "– 2017",
        note: "Where I grew up, studied engineering, and began my career.",
    },
    {
        country: "🇸🇬 Singapore",
        city: "Singapore",
        period: "2017 – 2022",
        note: "Discovered the power of diversity, precision, and discipline.",
    },
    {
        country: "🇦🇪 United Arab Emirates",
        city: "Dubai",
        period: "2022 – Present",
        note: "Started a new chapter as a father and senior engineer.",
    },
    {
        country: "🌍",
        city: "Possibly Ireland",
        period: "Next?",
        note: "We’re open to where life takes us next — curiosity leads.",
    },
];

export default function Traveling() {
    return (

        <div className="space-y-6 text-left">
            {traveling.map(({country, city, period, note}) => (
                <motion.div
                    key={city}
                    whileHover={{scale: 1.02}}
                    className="bg-white/10 backdrop-blur-md p-4 rounded-xl border-l-4 border-pink-300 shadow"
                >
                    <div className="flex items-center gap-3 mb-1 text-pink-300 font-semibold">
                        <MapPin className="w-4 h-4"/>
                        <span>{city}, {country}</span>
                    </div>
                    <div className="text-sm text-white/80">{note}</div>
                    <div className="text-xs text-white/60 mt-1 italic">{period}</div>
                </motion.div>
            ))}
        </div>
    );
}
