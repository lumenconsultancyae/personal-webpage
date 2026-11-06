"use client";

import {AnimatePresence, motion} from "framer-motion";
import {useState} from "react";
import {Briefcase, GraduationCap, MapPin} from "lucide-react";
import clsx from "clsx";

type WorkItem = {
    title: string;
    company: string;
    location: string;
    duration: string;
    details: string;
};

type EducationItem = {
    title: string;
    school: string;
    duration: string;
    details: string;
    field: string;
};

const workItems: WorkItem[] = [
    {
        title: "Senior Data Engineer",
        company: "Cybersecurity Company (NDA)",
        location: "Dubai, UAE",
        duration: "Oct 2023 – Present",
        details:
            "Led end-to-end ML inference pipelines (Triton Inference Server, PyTorch, Whisper) optimizing GPU utilization, full-stack internal support tooling, and multi-team Jira sprint roadmaps.",
    },
    {
        title: "Staff Senior Developer",
        company: "Hyphen Group",
        location: "Singapore",
        duration: "Jul 2022 – Jun 2023",
        details:
            "Spearheaded 3 multinational fintech platforms using Kotlin & Quarkus microservices, integrated TransUnion, Stripe & Microsoft Dynamics CRM, and introduced BDD automated QA pipelines as Tech Lead.",
    },
    {
        title: "Senior Full Stack / Staff Developer",
        company: "Cybersecurity Company (NDA)",
        location: "Dubai, UAE",
        duration: "May 2021 – Jul 2022",
        details:
            "Designed reactive microservices using Java, Spring Boot & WebFlux, Elasticsearch, and Milvus, and built custom CI/CD deployment tooling across production and non-production environments.",
    },
    {
        title: "Full-Stack / Staff Senior Developer",
        company: "Alef Education",
        location: "Abu Dhabi, UAE",
        duration: "Jan 2019 – May 2021",
        details:
            "Built large-scale edtech assessment modules (Kotlin, Spring, GraphQL, ReactJS) used by tens of thousands daily—helping achieve two Guinness World Records—led Wiris Quizzes integration, media processing pipelines, and served as Scrum Master.",
    },
    {
        title: "Senior Software Engineer",
        company: "PSL",
        location: "Medellín, Colombia",
        duration: "Oct 2017 – Dec 2018",
        details:
            "Built Scala & Play Framework microservices, automated CI/CD pipelines reducing release cycles from days to minutes, Scala/Selenium BDD test suites, and Big Data integrations (Apache Zeppelin, Phoenix, HBase, Hadoop).",
    },
    {
        title: "Software Analyst Specialist",
        company: "Easy Solutions / Cyxtera",
        location: "Bogotá, Colombia",
        duration: "Feb 2013 – Oct 2017",
        details:
            "Led end-to-end delivery of fraud detection and Clientless security products (Scala/Play, Java/Selenium BDD, Jenkins CI/CD), multiplatform installable apps (C++, C, C#), and internal release automation tooling.",
    },
    {
        title: "Junior Software Developer / Researcher",
        company: "Azuan Technologies",
        location: "Bogotá, Colombia",
        duration: "Aug 2012 – Jan 2013",
        details:
            "Researched and developed security POCs for installable keylogging-protection applications using C++ and low-level Windows APIs.",
    },
];

const educationItems: EducationItem[] = [
    {
        title: "Deep Learning Specialization",
        school: "DeepLearning.AI (Coursera)",
        duration: "Jun 2023 – Aug 2023",
        details:
            "Topics: supervised learning, CNNs, RNNs, sequence models, deployment strategies.",
        field: "Machine Learning",
    },
    {
        title: "Electronic Engineering (GPA 4.1)",
        school: "Universidad Nacional de Colombia",
        duration: "Jan 2007 – Jun 2012",
        details:
            'Thesis: "Detecting fatigue in drivers by using 3D images" — real-time fatigue and distraction detection using 3D sensors, image processing, and ML libraries (OpenCV, OpenNI).',
        field: "Electronic Engineering",
    },
];

export default function Journey() {
    const [selectedWorkIdx, setSelectedWorkIdx] = useState(0);
    const [selectedEdIdx, setSelectedEdIdx] = useState(0);

    return (
        <div className="max-w-4xl mx-auto flex flex-col gap-8 text-left">
            <TimelineSection
                title="Work"
                items={workItems}
                selectedIdx={selectedWorkIdx}
                onSelect={setSelectedWorkIdx}
            />
            <TimelineSection
                title="Education"
                items={educationItems}
                selectedIdx={selectedEdIdx}
                onSelect={setSelectedEdIdx}
            />
        </div>
    );
}

interface TimelineSectionProps {
    title: string;
    items: (WorkItem | EducationItem)[];
    selectedIdx: number;
    onSelect: (idx: number) => void;
}

function TimelineSection({
    title,
    items,
    selectedIdx,
    onSelect,
}: TimelineSectionProps) {
    return (
        <section className="w-full">
            <h3 className="text-center text-xl sm:text-2xl font-semibold mb-5 flex items-center justify-center gap-2.5 text-white">
                {title === "Work" ? (
                    <Briefcase className="w-5 h-5 text-amber-300"/>
                ) : (
                    <GraduationCap className="w-5 h-5 text-amber-300"/>
                )}
                <span>{title}</span>
            </h3>

            <div className="relative pl-6 md:pl-0">
                {/* Vertical guide line */}
                <div
                    aria-hidden="true"
                    className="absolute left-2 md:left-1/2 top-2 bottom-2 w-px -translate-x-1/2 bg-gradient-to-b from-amber-300/60 via-cyan-300/35 to-white/10"
                />

                <div className="space-y-3">
                    {items.map((item, idx) => {
                        const isSelected = selectedIdx === idx;
                        const isRightOnDesktop = idx % 2 === 0;
                        const org = "company" in item ? item.company : item.school;

                        return (
                            <div
                                key={`${item.title}-${item.duration}`}
                                className="relative grid grid-cols-1 md:grid-cols-[1fr_2.5rem_1fr] items-start"
                            >
                                {/* Left column on desktop */}
                                <div
                                    className={clsx(
                                        "hidden md:flex flex-col",
                                        isRightOnDesktop
                                            ? "items-end pr-3 pt-2.5 text-right"
                                            : "items-stretch pr-3"
                                    )}
                                >
                                    {isRightOnDesktop ? (
                                        <button
                                            type="button"
                                            onClick={() => onSelect(idx)}
                                            className="text-xs font-medium text-white/65 hover:text-amber-300 transition cursor-pointer"
                                        >
                                            {item.duration}
                                        </button>
                                    ) : (
                                        <TimelineCardContent
                                            item={item}
                                            org={org}
                                            isSelected={isSelected}
                                            align="right"
                                            onClick={() => onSelect(idx)}
                                        />
                                    )}
                                </div>

                                {/* Center timeline node */}
                                <div className="absolute -left-4 md:static flex justify-center pt-2.5">
                                    <button
                                        type="button"
                                        aria-label={`Select ${item.title}`}
                                        onClick={() => onSelect(idx)}
                                        className={clsx(
                                            "w-3.5 h-3.5 rounded-full transition-all duration-200 cursor-pointer",
                                            isSelected
                                                ? "bg-amber-300 ring-4 ring-amber-300/25 scale-125"
                                                : "bg-slate-900 border-2 border-cyan-300/70 hover:border-amber-300"
                                        )}
                                    />
                                </div>

                                {/* Right column on desktop & main column on mobile */}
                                <div
                                    className={clsx(
                                        "w-full",
                                        isRightOnDesktop
                                            ? "md:pl-3"
                                            : "md:pl-3 md:pt-2.5"
                                    )}
                                >
                                    {/* Mobile always renders the card here */}
                                    <div className="md:hidden">
                                        <TimelineCardContent
                                            item={item}
                                            org={org}
                                            isSelected={isSelected}
                                            align="left"
                                            onClick={() => onSelect(idx)}
                                        />
                                    </div>

                                    {/* Desktop renders card if right-side, or duration if left-side */}
                                    <div className="hidden md:block">
                                        {isRightOnDesktop ? (
                                            <TimelineCardContent
                                                item={item}
                                                org={org}
                                                isSelected={isSelected}
                                                align="left"
                                                onClick={() => onSelect(idx)}
                                            />
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => onSelect(idx)}
                                                className="text-xs font-medium text-white/65 hover:text-amber-300 transition cursor-pointer"
                                            >
                                                {item.duration}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

function TimelineCardContent({
    item,
    org,
    isSelected,
    align,
    onClick,
}: {
    item: WorkItem | EducationItem;
    org: string;
    isSelected: boolean;
    align: "left" | "right";
    onClick: () => void;
}) {
    return (
        <div
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onClick();
                }
            }}
            className={clsx(
                "rounded-2xl transition-all duration-200 text-left",
                isSelected
                    ? clsx(
                          "glass-card p-4 sm:p-5 border-amber-300/60",
                          align === "right" ? "md:border-r-4" : "border-l-4"
                      )
                    : "px-3.5 py-2 rounded-xl hover:bg-white/10 cursor-pointer flex flex-wrap items-center justify-between gap-2"
            )}
        >
            <div className="w-full flex items-baseline justify-between gap-2">
                <h4
                    className={clsx(
                        "font-semibold transition-colors",
                        isSelected
                            ? "text-base sm:text-lg text-white"
                            : "text-sm sm:text-base text-white/85 hover:text-amber-300"
                    )}
                >
                    {item.title}
                </h4>
                {!isSelected && (
                    <span className="text-xs text-white/55 md:hidden">
                        {item.duration}
                    </span>
                )}
            </div>

            <AnimatePresence initial={false}>
                {isSelected && (
                    <motion.div
                        initial={{opacity: 0, height: 0}}
                        animate={{opacity: 1, height: "auto"}}
                        exit={{opacity: 0, height: 0}}
                        transition={{duration: 0.2}}
                        className="mt-1.5 space-y-1.5 overflow-hidden"
                    >
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm">
                            <span className="font-semibold text-amber-300">{org}</span>
                            {"location" in item && (
                                <span className="inline-flex items-center gap-1 text-white/65 text-xs">
                                    <MapPin className="w-3 h-3"/>
                                    {item.location}
                                </span>
                            )}
                            <span className="text-white/60 text-xs">{item.duration}</span>
                        </div>
                        {item.details && (
                            <p className="text-xs sm:text-sm text-white/85 pt-1 leading-relaxed">
                                {item.details}
                            </p>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
