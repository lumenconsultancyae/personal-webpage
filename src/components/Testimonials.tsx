"use client";

import {useEffect, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import clsx from "clsx";
import {Linkedin, Quote} from "lucide-react";
import {
    SiApachekafka,
    SiArgo,
    SiCplusplus,
    SiDocker,
    SiElasticsearch,
    SiGraphql,
    SiJenkins,
    SiKotlin,
    SiKubernetes,
    SiMilvus,
    SiMongodb,
    SiNextdotjs,
    SiPostgresql,
    SiPrometheus,
    SiPython,
    SiPytorch,
    SiQuarkus,
    SiReact,
    SiScala,
    SiSpringboot,
    SiTypescript,
    SiVuedotjs,
} from "react-icons/si";
import {FaJava} from "react-icons/fa";
import {SectionSubtitle} from "@/components/common/Sections";

const testimonials = [
    {
        text: `"Working with Wilson was a great pleasure. As a senior backend engineer, he consistently displayed autonomy, reliability, and a proactive mindset. Wilson was never hesitant to voice out his ideas, take initiatives, and bring a wealth of best practices to our projects.\n\nI highly recommend him for any future endeavors."`,
        author: "Benjamin Miao Cai",
        linkedin: "https://www.linkedin.com/in/benjamin-miao-cai-900000122/",
        role: "Engineering Manager",
        company: "Cybersecurity Co. (NDA)",
    },
    {
        text: `"Wilson is a passionate software engineer who works at a good pace and is not afraid to tackle tedious tasks. He is constantly looking for ways to improve the codebase and make it more clear and friendlier for others. While he can sometimes come across as pushy and blunt, he has shown awareness of this and has made good progress in addressing these weaknesses during our time working together.\n\nWilson is a solid professional that was a pleasure working with!"`,
        author: "Pavel Krot",
        linkedin: "https://www.linkedin.com/in/pavel-krot-900000122/",
        role: "Senior Engineer",
        company: "Hyphen Group",
    },
    {
        text: `"Wilson is a strong engineer who, during his time at Hyphen Group was able to independently and effectively work across a wide breadth of technologies.\n\nWilson was able to build out several new services, and interface with a new set of integrations for our CRM platform."`,
        author: "Andrew de Ridder",
        linkedin: "https://www.linkedin.com/in/andrew-de-ridder-900000122/",
        role: "Tech Lead",
        company: "Hyphen Group",
    },
    {
        text: `"What a valuable asset for a company is this guy. Also, an incredible colleague that retro-feeds you, and learning new things from each other just flows, creating better and better code. Definitely what you expect from someone fitting a Senior position, helping as much as he can, making the team win, therefore making the company win."`,
        author: "Francisco Martinez",
        linkedin: "https://www.linkedin.com/in/francisco-martinez-900000122/",
        role: "Engineer",
        company: "Alef Education",
    },
    {
        text: `"I worked with Wilson for over a year. He is very focused, has great attention to detail, and well-versed technically. I can also say that has a great personality. He is calm, and patient when we do pair programming and humbly discusses topics I'm not very familiar with.\n\nI recommend working with him as I believe he is a great team player."`,
        author: "Jaime Sangcap",
        linkedin: "https://www.linkedin.com/in/jaime-sangcap-900000122/",
        role: "Engineer",
        company: "Cybersecurity Co. (NDA)",
    },
];

const professionalHighlights = [
    {icon: SiPython, name: "Python"},
    {icon: SiKotlin, name: "Kotlin"},
    {icon: FaJava, name: "Java"},
    {icon: SiSpringboot, name: "Spring Boot"},
    {icon: SiQuarkus, name: "Quarkus"},
    {icon: SiScala, name: "Scala"},
    {icon: SiCplusplus, name: "C++"},
    {icon: SiReact, name: "React"},
    {icon: SiNextdotjs, name: "Next.js"},
    {icon: SiTypescript, name: "TypeScript"},
    {icon: SiVuedotjs, name: "Vue.js"},
    {icon: SiDocker, name: "Docker"},
    {icon: SiKubernetes, name: "Kubernetes"},
    {icon: SiArgo, name: "ArgoCD"},
    {icon: SiJenkins, name: "Jenkins"},
    {icon: SiPrometheus, name: "Prometheus"},
    {icon: SiPytorch, name: "PyTorch"},
    {icon: SiMilvus, name: "Milvus"},
    {icon: SiElasticsearch, name: "Elasticsearch"},
    {icon: SiApachekafka, name: "Kafka"},
    {icon: SiGraphql, name: "GraphQL"},
    {icon: SiMongodb, name: "MongoDB"},
    {icon: SiPostgresql, name: "PostgreSQL"},
];

const skillGroups = {
    Backend: ["Python", "Kotlin", "Spring Boot", "Java", "Quarkus", "Scala", "C++"],
    Frontend: ["React", "Next.js", "TypeScript", "Vue.js"],
    "DevOps & Observability": ["Docker", "Kubernetes", "ArgoCD", "Jenkins", "Prometheus"],
    "AI, Data & Messaging": [
        "PyTorch",
        "Milvus",
        "Elasticsearch",
        "Kafka",
        "GraphQL",
        "MongoDB",
        "PostgreSQL",
    ],
};

function getIcon(name: string) {
    return professionalHighlights.find((s) => s.name === name)?.icon;
}

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const duration = 20000;

    useEffect(() => {
        setProgress(0);
        const start = Date.now();
        const timer = setInterval(() => {
            const elapsed = Date.now() - start;
            setProgress(Math.min(100, (elapsed / duration) * 100));
            if (elapsed >= duration) {
                setCurrentIndex((prev) => (prev + 1) % testimonials.length);
            }
        }, 100);
        return () => clearInterval(timer);
    }, [currentIndex]);

    const spotlight = testimonials[currentIndex];

    return (
        <div className="space-y-6">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{opacity: 0, y: 16}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: -16}}
                    transition={{type: "spring", stiffness: 60, damping: 14}}
                    className="relative overflow-hidden glass-card p-6 sm:p-7 rounded-2xl text-white max-w-3xl mx-auto text-center"
                >
                    <Quote
                        aria-hidden="true"
                        className="w-8 h-8 text-amber-300/30 mx-auto mb-2"
                    />
                    <p className="text-sm sm:text-base md:text-lg italic whitespace-pre-line leading-relaxed text-white/95">
                        {spotlight.text}
                    </p>
                    <div className="mt-4 flex justify-center items-center gap-2.5">
                        <a
                            href={spotlight.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${spotlight.author} LinkedIn`}
                            className="p-1.5 rounded-lg bg-white/10 hover:bg-amber-300/20 text-amber-300 transition"
                        >
                            <Linkedin className="w-4 h-4"/>
                        </a>
                        <div className="flex flex-col text-left">
                            <span className="text-amber-300 font-semibold text-sm sm:text-base">
                                {spotlight.author}
                            </span>
                            <span className="text-white/70 text-xs sm:text-sm">
                                {spotlight.role}, {spotlight.company}
                            </span>
                        </div>
                    </div>
                    <div
                        className="absolute bottom-0 left-0 h-1 bg-amber-300 transition-all"
                        style={{width: `${progress}%`}}
                    />
                </motion.div>
            </AnimatePresence>

            {/* Compact author selector cards — no horizontal text overflow */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 max-w-4xl mx-auto">
                {testimonials.map((t, i) => (
                    <button
                        key={t.author}
                        type="button"
                        onClick={() => setCurrentIndex(i)}
                        className={clsx(
                            "text-left p-3.5 rounded-xl transition cursor-pointer flex flex-col justify-between",
                            i === currentIndex
                                ? "glass-card border-amber-300/80 ring-1 ring-amber-300/50"
                                : "glass-card-interactive opacity-75 hover:opacity-100"
                        )}
                    >
                        <p className="text-white/85 italic text-xs line-clamp-2 mb-2.5">
                            {t.text}
                        </p>
                        <div>
                            <div className="flex items-center gap-1.5">
                                <Linkedin className="w-3.5 h-3.5 text-amber-300 flex-shrink-0"/>
                                <span className="text-amber-300 font-semibold text-xs truncate">
                                    {t.author}
                                </span>
                            </div>
                            <p className="text-white/65 text-[11px] truncate mt-0.5">
                                {t.role} · {t.company}
                            </p>
                        </div>
                    </button>
                ))}
            </div>

            <SectionSubtitle text="Tools & Technologies"/>

            <div className="max-w-4xl mx-auto space-y-3 text-left">
                {Object.entries(skillGroups).map(([category, techs]) => (
                    <div
                        key={category}
                        className="glass-card rounded-xl p-3 sm:px-4 sm:py-3 flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-4"
                    >
                        <div className="text-amber-300 font-semibold text-xs sm:text-sm uppercase tracking-wider sm:w-48 sm:text-right flex-shrink-0">
                            {category}
                        </div>
                        <div className="flex flex-wrap gap-2 flex-1">
                            {techs.map((name) => {
                                const Icon = getIcon(name);
                                return (
                                    <span
                                        key={name}
                                        className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white font-medium"
                                    >
                                        {Icon && <Icon className="text-sm text-amber-200"/>}
                                        <span>{name}</span>
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
