"use client";

import {useEffect, useRef, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import clsx from "clsx";
import {Linkedin} from "lucide-react";
import {
    SiCplusplus,
    SiDocker,
    SiElasticsearch,
    SiGraphql,
    SiJenkins,
    SiKotlin,
    SiMilvus,
    SiPrometheus,
    SiPython,
    SiReact,
    SiSpringboot,
    SiVuedotjs
} from "react-icons/si";
import {FaJava} from "react-icons/fa";
import {SectionSubtitle} from "@/components/common/Sections";

const fadeIn = {
    hidden: {opacity: 0, y: 30},
    visible: {
        opacity: 1,
        y: 0,
        transition: {type: "spring", stiffness: 60, damping: 12},
    },
};

const testimonials = [
    {
        text: `"Working with Wilson was a great pleasure. As a senior backend engineer, he consistently displayed autonomy, reliability, and a proactive mindset. Wilson was never hesitant to voice out his ideas, take initiatives, and bring a wealth of best practices to our projects.

I highly recommend him for any future endeavors.”`,
        author: "Benjamin Miao Cai",
        linkedin: "https://www.linkedin.com/in/benjamin-miao-cai-900000122/",
        role: "Engineering Manager",
        company: "Cybersecurity Co. (NDA)",
    },
    {
        text: `"Wilson is a passionate software engineer who works at a good pace and is not afraid to tackle tedious tasks. He is constantly looking for ways to improve the codebase and make it more clear and friendlier for others. While he can sometimes come across as pushy and blunt, he has shown awareness of this and has made good progress in addressing these weaknesses during our time working together.

Wilson is a solid professional that was a pleasure working with!”`,
        author: "Pavel Krot",
        linkedin: "https://www.linkedin.com/in/pavel-krot-900000122/",
        role: "Senior Engineer",
        company: "Hyphen Group",
    },
    {
        text: `"Wilson is a strong engineer who, during his time at Hyphen Group was able to independently and effectively work across a wide breadth of technologies.

Wilson was able to build out several new services, and interface with a new set of integrations for our CRM platform.”`,
        author: "Andrew de Ridder",
        linkedin: "https://www.linkedin.com/in/andrew-de-ridder-900000122/",
        role: "Tech Lead",
        company: "Hyphen Group",
    },
    {
        text: `"What a valuable asset for a company is this guy. Also, an incredible colleague that retro-feeds you, and learning new things from each other just flows, creating better and better code. Definitely what you expect from someone fitting a Senior position, helping as much as he can, making the team win, therefore making the company win.”`,
        author: "Francisco Martinez",
        linkedin: "https://www.linkedin.com/in/francisco-martinez-900000122/",
        role: "Engineer",
        company: "Alef Education",
    },
    {
        text: `"I worked with Wilson for over a year. He is very focused, has great attention to detail, and well-versed technically. I can also say that has a great personality. He is calm, and patient when we do pair programming and humbly discusses topics I'm not very familiar with.

I recommend working with him as I believe he is a great team player.”`,
        author: "Jaime Sangcap",
        linkedin: "https://www.linkedin.com/in/jaime-sangcap-900000122/",
        role: "Engineer",
        company: "Cybersecurity Co. (NDA)",
    },
];


const professionalHighlights = [
    {icon: SiPython, name: "Python"},
    {icon: SiReact, name: "React"},
    {icon: SiVuedotjs, name: "Vue.js"},
    {icon: SiSpringboot, name: "Spring Boot"},
    {icon: SiGraphql, name: "GraphQL"},
    {icon: SiCplusplus, name: "C++"},
    {icon: FaJava, name: "Java"},
    {icon: SiKotlin, name: "Kotlin"},
    {icon: SiDocker, name: "Docker"},
    {icon: SiJenkins, name: "Jenkins"},
    {icon: SiPrometheus, name: "Prometheus"},
    {icon: SiMilvus, name: "Milvus"},
    {icon: SiElasticsearch, name: "Elasticsearch"},
];

const skillGroups = {
    "Backend": ["Python", "Kotlin", "Spring Boot", "Java", "C++"],
    "Frontend": ["React", "Vue.js"],
    "DevOps & Observability": ["Docker", "Jenkins", "Prometheus"],
    "AI/Data": ["Milvus", "Elasticsearch", "GraphQL"]
};

function getIcon(name: string) {
    return professionalHighlights.find((s) => s.name === name)?.icon;
}

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const duration = 20000;

    useEffect(() => {
        resetTimer();
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [currentIndex]);

    const resetTimer = () => {
        setProgress(0);
        if (intervalRef.current) clearInterval(intervalRef.current);
        const start = Date.now();
        intervalRef.current = setInterval(() => {
            const elapsed = Date.now() - start;
            setProgress(Math.min(100, (elapsed / duration) * 100));
            if (elapsed >= duration) {
                setCurrentIndex((prev) => (prev + 1) % testimonials.length);
            }
        }, 100);
    };

    useEffect(() => {
        const card = scrollRef.current?.children[currentIndex] as HTMLElement;
        if (card && scrollRef.current) {
            const container = scrollRef.current;
            const offset =
                card.offsetLeft - container.offsetWidth / 2 + card.offsetWidth / 2;
            container.scrollTo({left: offset, behavior: "smooth"});
        }
    }, [currentIndex]);

    const spotlight = testimonials[currentIndex];

    return (
        <>
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: -20}}
                    transition={{type: "spring", stiffness: 50, damping: 14}}
                    className="relative bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg text-white max-w-3xl mx-auto text-center mb-4"
                >
                    <p className="text-lg italic whitespace-pre-line">{spotlight.text}</p>
                    <div className="mt-4 flex justify-center items-center gap-2">
                        <a href={spotlight.linkedin} target="_blank" rel="noopener noreferrer">
                            <Linkedin className="w-4 h-4 text-orange-300"/>
                        </a>
                        <div className="flex flex-col text-left">
                            <span className="text-orange-300 font-semibold">{spotlight.author}</span>
                            <span className="text-white/70 text-sm">{spotlight.role}, {spotlight.company}</span>
                        </div>
                    </div>
                    <div
                        className="absolute bottom-0 left-0 h-1 bg-orange-300 rounded-full transition-all"
                        style={{width: `${progress}%`}}
                    />
                </motion.div>
            </AnimatePresence>

            <div
                ref={scrollRef}
                className="overflow-x-auto scrollbar-hide whitespace-nowrap flex gap-4 px-2 md:px-0 max-w-6xl mx-auto mb-12 pb-2"
            >
                {testimonials.map((t, i) => (
                    <motion.div
                        key={i}
                        whileHover={{scale: 1.02}}
                        whileTap={{scale: 0.98}}
                        className={clsx(
                            "min-w-[300px] md:min-w-[340px] bg-white/10 backdrop-blur-md p-5 rounded-xl shadow cursor-pointer transition border",
                            i === currentIndex ? "border-orange-400" : "border-transparent"
                        )}
                        onClick={() => setCurrentIndex(i)}
                    >
                        <p className="text-white/90 italic text-sm line-clamp-4 overflow-hidden text-ellipsis">
                            {t.text}
                        </p>
                        <div className="mt-4 flex items-center gap-2">
                            <a href={t.linkedin} target="_blank" rel="noopener noreferrer">
                                <Linkedin className="w-4 h-4 text-orange-300"/>
                            </a>
                            <p className="text-orange-300 font-semibold">{t.author}</p>
                        </div>
                        <p className="text-white/70 text-sm">
                            {t.role}, {t.company}
                        </p>
                    </motion.div>
                ))}
            </div>

            <SectionSubtitle text="Tools & Technologies"></SectionSubtitle>
            {Object.entries(skillGroups).map(([category, techs]) => (
                <div key={category} className="flex flex-row items-center mb-0">
                    <div key={category + "category"}
                         className="text-orange-300 font-semibold text-base text-right uppercase tracking-wide w-[35%]">
                        {category}
                    </div>
                    <div className="flex flex-wrap w-[65%]">
                        {techs.map((name) => {
                            const Icon = getIcon(name);
                            return (
                                <div key={name} className="">
                                    <motion.div
                                        variants={fadeIn}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{once: true}}
                                        className="bg-white/10 border border-white/10 rounded-lg p-2 flex flex-col items-center shadow m-2"
                                    >
                                        {Icon ? <Icon className="text-2xl mb-1"/> :
                                            <div className="text-xl">🛠️</div>}
                                        <span className="text-xs text-white" title={name}>{name}</span>
                                    </motion.div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </>
    );
}
