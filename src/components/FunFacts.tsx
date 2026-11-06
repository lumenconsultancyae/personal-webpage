"use client";

import {motion} from "framer-motion";
import {Sparkles} from "lucide-react";

const funFacts = [
    "I designed and playtested my own custom board game with unique mechanics.",
    "I built my own personal stock portfolio and financial tracking platform.",
    "I speak Spanish, English, and fluent toddler.",
    "I meditate daily — clarity over chaos.",
    "I love logic puzzles, strategy board games, and algorithmic challenges.",
    "My espresso and home-brew coffee gear collection is out of control.",
    "I have debugged production incidents while holding my daughter.",
    "My favorite season of the year is crisp autumn.",
    "I have lived and worked as an engineer across 3 continents.",
    "I mentor junior developers in my spare time — and built this portfolio from scratch.",
];

export default function FunFacts() {
    return (
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            {funFacts.map((fact, idx) => (
                <motion.div
                    key={idx}
                    initial={{opacity: 0, y: 12}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{delay: idx * 0.04}}
                    className="glass-card-interactive rounded-2xl p-4 border-l-4 border-l-pink-400"
                >
                    <div className="flex items-center gap-2 text-pink-300 font-semibold text-xs uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5"/>
                        <span>Fact {idx + 1}</span>
                    </div>
                    <p className="text-sm text-white/85 mt-1.5 leading-relaxed">
                        {fact}
                    </p>
                </motion.div>
            ))}
        </div>
    );
}
