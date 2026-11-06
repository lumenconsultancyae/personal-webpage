"use client";

import {Quote} from "lucide-react";
import {motion} from "framer-motion";

const philosophies = [
    {
        quote: "Simplicity scales. Complexity fails.",
        context: "Whether writing code or making life choices, I aim to keep things simple, overthinking usually leads to complex solutions results.",
    },
    {
        quote: "Progress over perfection.",
        context: "I believe momentum beats stalling. Deliver, learn, refine — repeat.",
    },
    {
        quote: "Balance creates better builders.",
        context: "A rested, well-rounded life outside work directly improves creativity, empathy, and decision-making.",
    },
    {
        quote: "You grow by teaching.",
        context: "Mentoring others is not just sharing knowledge — it sharpens your own understanding.",
    },
];

export default function Philosophies() {
    return (
        <div className="space-y-6 text-left">
            {philosophies.map(({quote, context}, idx) => (
                <motion.div
                    key={idx}
                    initial={{opacity: 0, x: -20}}
                    whileInView={{opacity: 1, x: 0}}
                    viewport={{once: true}}
                    transition={{delay: idx * 0.05}}
                    className="bg-white/10 border-l-4 border-pink-400 p-5 rounded-xl shadow-sm backdrop-blur-sm"
                >
                    <div className="flex items-center gap-2 mb-2 text-pink-300 font-semibold">
                        <Quote className="w-4 h-4"/>
                        <span>{quote}</span>
                    </div>
                    <p className="text-white/80 text-sm">{context}</p>
                </motion.div>
            ))}
        </div>
    );
}
