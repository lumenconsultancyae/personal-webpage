"use client";

import {Quote} from "lucide-react";
import {motion} from "framer-motion";

const philosophies = [
    {
        quote: "Simplicity scales. Complexity fails.",
        context:
            "Whether writing code or making life choices, I aim to keep things simple; overthinking usually leads to complex, fragile results.",
    },
    {
        quote: "Progress over perfection.",
        context:
            "I believe momentum beats stalling. Deliver, learn, refine — repeat.",
    },
    {
        quote: "Balance creates better builders.",
        context:
            "A rested, well-rounded life outside work directly improves creativity, empathy, and decision-making.",
    },
    {
        quote: "You grow by teaching.",
        context:
            "Mentoring others is not just sharing knowledge — it sharpens your own understanding.",
    },
];

export default function Philosophies() {
    return (
        <div className="max-w-3xl mx-auto space-y-4 text-left">
            {philosophies.map(({quote, context}, idx) => (
                <motion.div
                    key={quote}
                    initial={{opacity: 0, x: -20}}
                    whileInView={{opacity: 1, x: 0}}
                    viewport={{once: true}}
                    transition={{delay: idx * 0.05}}
                    className="glass-card-interactive border-l-4 border-l-pink-400 p-5 rounded-2xl"
                >
                    <div className="flex items-center gap-2.5 mb-1.5 text-pink-300 font-semibold text-base">
                        <Quote className="w-4 h-4 flex-shrink-0"/>
                        <span>{quote}</span>
                    </div>
                    <p className="text-white/85 text-sm leading-relaxed">{context}</p>
                </motion.div>
            ))}
        </div>
    );
}
