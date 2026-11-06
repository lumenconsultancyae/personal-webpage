"use client";

import {motion} from "framer-motion";
import {Download} from "lucide-react";
import Contact from "@/components/Contact";
import {SectionSubtitle} from "@/components/common/Sections";


const fadeIn = {
    hidden: {opacity: 0, y: 30},
    visible: {
        opacity: 1,
        y: 0,
        transition: {type: "spring", stiffness: 60, damping: 12},
    },
};

function Summary() {
    return (
        <div className="max-w-4xl mx-auto px-4 pt-16 text-center space-y-6">
            <p className="text-lg text-gray-300">
                With 12+ years designing and delivering end-to-end, data-intensive, distributed and AI based systems.
                Adept at end-to-end system design, performance optimization, infrastructure operations, and mentoring.
                <br/>
                <br/>
                Passionate about Clean code, DevOps, and good practices.
                <br/>
                Experience on domains including cybersecurity, fintech, and edtech.
            </p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2 text-gray-300 text-sm max-w-xl mx-auto">
                <li>✔️ Technical Leading</li>
                <li>✔️ Backend Engineering & System Design</li>
                <li>✔️ Machine Learning Operations (MLOps)</li>
                <li>✔️ Domain-Driven Design (DDD)</li>
                <li>✔️ Behavioral-Driven Design (BDD)</li>
                <li>✔️ Clean Code & Scalable APIs</li>
            </ul>
        </div>
    );
}

export default function ProfessionalHighlights() {
    return (
        <>
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
                    className="inline-flex items-center px-5 py-2 rounded-md bg-orange-300 text-blue-900 font-semibold hover:bg-orange-400 transition"
                >
                    <Download className="w-5 h-5 mr-2"/>
                    Download CV
                </a>
                <Summary/>
            </motion.div>
            <SectionSubtitle text="Let's build something together"/>
            <Contact></Contact>
        </>
    );
}
