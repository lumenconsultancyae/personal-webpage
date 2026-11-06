"use client";

import {motion} from "framer-motion";
import {Sparkles} from "lucide-react";

const funFacts = [
    "🎲 I designed and tested my own custom board game with unique mechanics.",
    "I built my own financial tracking app",
    "I speak Spanish, English, and Baby 🍼",
    "I meditate daily — clarity > chaos",
    "I love logic puzzles and board games",
    "My brew gear collection is out of control",
    "I’ve debugged production while holding my daughter",
    "Favorite season? Autumn 🍂",
    "I’ve worked across 3 continents",
    "I mentor junior devs in my spare time",
    "You're looking at a portfolio I built from scratch",
];

export default function FunFacts() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left">
            {funFacts.map((fact, idx) => (
                <motion.div
                    key={idx}
                    initial={{opacity: 0, x: -20}}
                    whileInView={{opacity: 1, x: 0}}
                    viewport={{once: true}}
                    transition={{delay: idx * 0.05}}
                    className="bg-white/10 rounded-lg p-4 backdrop-blur-sm border-l-4 border-pink-400 shadow-md"
                >
                    <div className="flex items-center gap-2 text-pink-300 font-semibold">
                        <Sparkles className="w-4 h-4"/>
                        <span>Fact {idx + 1}</span>
                    </div>
                    <p className="text-sm text-white/80 mt-1">{fact}</p>
                </motion.div>
            ))}
        </div>
    );
}
