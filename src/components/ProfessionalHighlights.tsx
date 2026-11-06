"use client";

import {motion} from "framer-motion";
import {CheckCircle2, Download} from "lucide-react";
import Contact from "@/components/Contact";
import {SectionSubtitle} from "@/components/common/Sections";

const fadeIn = {
    hidden: {opacity: 0, y: 20},
    visible: {
        opacity: 1,
        y: 0,
        transition: {type: "spring", stiffness: 60, damping: 14},
    },
};

const competencies = [
    "Technical Leading",
    "Backend Engineering & System Design",
    "Machine Learning Operations (MLOps)",
    "Domain-Driven Design (DDD)",
    "Behavioral-Driven Design (BDD)",
    "Clean Code & Scalable APIs",
];

function Summary() {
    return (
        <div className="max-w-3xl mx-auto text-center space-y-3.5">
            <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                With 12+ years designing and delivering end-to-end, data-intensive,
                distributed, and AI-based systems. Adept at end-to-end system design,
                performance optimization, infrastructure operations, and mentoring.
            </p>
            <p className="text-sm sm:text-base text-white/75 leading-relaxed">
                Passionate about Clean Code, DevOps, and engineering excellence across
                cybersecurity, fintech, and edtech domains.
            </p>
            <ul className="grid gap-2 sm:grid-cols-2 text-left text-white/90 text-sm max-w-2xl mx-auto pt-1">
                {competencies.map((item) => (
                    <li
                        key={item}
                        className="glass-card rounded-xl px-3.5 py-2 flex items-center gap-2.5"
                    >
                        <CheckCircle2 className="w-4 h-4 text-amber-300 flex-shrink-0"/>
                        <span className="font-medium">{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default function ProfessionalHighlights() {
    return (
        <div className="space-y-4">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{once: true}}
                variants={fadeIn}
                className="flex flex-col items-center gap-4 text-sm text-white/90"
            >
                <a
                    href="/FinalResume.pdf"
                    download
                    className="inline-flex items-center px-6 py-2.5 rounded-xl bg-amber-300 text-slate-950 font-semibold shadow-lg shadow-amber-400/20 hover:bg-amber-200 transition"
                >
                    <Download className="w-4 h-4 mr-2"/>
                    Download CV
                </a>
                <Summary/>
            </motion.div>
            <SectionSubtitle text="Let's build something together"/>
            <Contact/>
        </div>
    );
}
