"use client";

import {BookOpen, Film, Languages, Music, Plane, Puzzle} from "lucide-react";
import {motion} from "framer-motion";
import {SectionSubtitle} from "@/components/common/Sections";

const lifestyleItems = [
    {
        icon: <Puzzle className="w-6 h-6"/>,
        title: "Board Game Designer & Host",
        desc: "From organizing Tuesday GamePlan board-game nights in Dubai (@bgameplan) to designing and playtesting my own custom board game with friends.",
    },
    {
        icon: <Languages className="w-6 h-6"/>,
        title: "Language Explorer",
        desc: "I love teaching Spanish and diving into Japanese—and built interactive English/Spanish flashcard prototypes (LanguageCards) to practice vocabulary.",
    },
    {
        icon: <Plane className="w-6 h-6"/>,
        title: "Global Citizen & Traveler",
        desc: "Colombia, Singapore, and the UAE have been home, with 15+ other countries visited across Asia, Europe, and the Americas.",
    },
    {
        icon: <Music className="w-6 h-6"/>,
        title: "Music Mood Swings",
        desc: "Lo-fi when coding, ambient for deep architectural flow, and classical for decompressing. Music is my mind’s backdrop.",
    },
    {
        icon: <BookOpen className="w-6 h-6"/>,
        title: "Always Learning",
        desc: "Outside of work, I dive into AI/ML papers, Domain-Driven Design, parenting books, and philosophy—anything that sparks thought.",
    },
    {
        icon: <Film className="w-6 h-6"/>,
        title: "Movies & Storytelling",
        desc: "Curating my personal notebook of mind-bending and inspiring cinema—favorites include Memento and 3 Idiots.",
    },
];

export default function PersonalHighlights() {
    return (
        <>
            <p className="text-white/80 text-lg leading-relaxed">
                {"By day, I’m building backend systems and AI pipelines. But life is more than semicolons and scrums. I'm also a curious traveler, dedicated dad, and espresso enthusiast."}
            </p>

            <p className="text-white/70 text-md">
                {"I believe balance makes for better builders — and that who you are off the keyboard matters just as much as what you type on it."}
            </p>

            <SectionSubtitle text="Life-style"/>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                {lifestyleItems.map(({icon, title, desc}) => (
                    <motion.div
                        key={title}
                        whileHover={{scale: 1.03}}
                        className="bg-white/10 p-5 rounded-xl shadow-md backdrop-blur-sm transition-all"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className="text-pink-300">{icon}</div>
                            <h3 className="text-lg font-semibold">{title}</h3>
                        </div>
                        <p className="text-white/80 text-sm">{desc}</p>
                    </motion.div>
                ))}
            </div>
        </>
    );
}
