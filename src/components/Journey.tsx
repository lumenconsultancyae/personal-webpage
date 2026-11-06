"use client";

import {motion} from "framer-motion";
import {useState} from "react";
import {
    Timeline,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineItem,
    timelineItemClasses,
    TimelineOppositeContent,
    TimelineSeparator
} from "@mui/lab";
import {useMediaQuery, useTheme} from "@mui/material";
import clsx from "clsx";

const variants = {
    fadeInLeft: {
        hidden: {opacity: 0, x: -40},
        visible: {
            opacity: 1,
            x: 0,
            transition: {type: "spring", stiffness: 60, damping: 12},
        },
    },
    fadeInUp: {
        hidden: {opacity: 0, y: 20},
        visible: {
            opacity: 1,
            y: 0,
            transition: {type: "spring", stiffness: 60, damping: 12},
        },
    },
};

type WorkItem = {
    title: string;
    company: string;
    location: string;
    duration: string;
    details: string;
}

type EducationItem = {
    title: string;
    school: string;
    duration: string;
    details: string;
    field: string;
}

const workItems: WorkItem[] = [
    {
        title: "Senior Data Engineer",
        company: "Cybersecurity Company (NDA)",
        location: "Dubai, UAE",
        duration: "Oct 2023 – Present",
        details: "Led end-to-end ML inference pipelines (Triton, PyTorch, Whisper) optimizing GPU utilization, full-stack internal support tooling, and multi-team sprint roadmaps.",
    },
    {
        title: "Staff Senior Developer",
        company: "Hyphen Group",
        location: "Singapore",
        duration: "Jul 2022 – Jun 2023",
        details: "Spearheaded 3 multinational fintech platforms, integrated critical third-party APIs (TransUnion, Stripe), and introduced automated QA pipelines as Tech Lead.",
    },
    {
        title: "Senior Full Stack / Staff Developer",
        company: "Cybersecurity Company (NDA)",
        location: "Dubai, UAE",
        duration: "May 2021 – Jul 2022",
        details: "Built high-availability distributed backend services and real-time data ingestion pipelines with Spring Boot, Python, Elasticsearch, and Milvus.",
    },
    {
        title: "Full-Stack / Staff Senior Developer",
        company: "Alef Education",
        location: "Abu Dhabi, UAE",
        duration: "Jan 2019 – May 2021",
        details: "Delivered large-scale edtech assessment platforms used by tens of thousands daily (helping achieve two Guinness World Records) and led Wiris Quizzes integration.",
    },
    {
        title: "Senior Software Engineer",
        company: "PSL",
        location: "Medellín, Colombia",
        duration: "Oct 2017 – Dec 2018",
        details: "Built CI/CD pipelines reducing release cycles from days to minutes and integrated Big Data technologies (Hadoop, Phoenix, Zeppelin).",
    },
    {
        title: "Software Analyst Specialist",
        company: "Easy Solutions / Cyxtera",
        location: "Bogotá, Colombia",
        duration: "Feb 2013 – Oct 2017",
        details: "Led end-to-end delivery of fraud detection and Clientless security products, internal release automation tooling, and developer mentorship.",
    },
    {
        title: "Junior Software Developer / Researcher",
        company: "Azuan Technologies",
        location: "Bogotá, Colombia",
        duration: "Aug 2012 – Jan 2013",
        details: "Developed security POCs for keylogging protection using C++ and low-level Windows APIs.",
    },
];

const educationItems: EducationItem[] = [
    {
        title: "Deep Learning Specialization",
        school: "DeepLearning.AI (Coursera)",
        duration: "June 2023 – August 2023",
        details: "Topics: supervised learning, CNNs, RNNs, sequence models, deployment strategies.",
        field: "Machine Learning",
    },
    {
        title: "Electronic Engineering",
        school: "National University of Colombia",
        duration: "January 2007 – June 2012",
        details: "Thesis: \"Detecting driver fatigue using 3D imaging and ML (OpenCV, OpenNI).\"",
        field: "Electronic Engineering",
    },
];

export default function Journey() {
    const [selectedWorkIdx, setSelectedWorkIdx] = useState(0);
    const [selectedEdIdx, setSelectedEdIdx] = useState(0);

    return (
        <div className="max-w-6xl mx-auto flex flex-col gap-8">
            <JourneySection
                title="Work"
                items={workItems}
                selectedIdx={selectedWorkIdx}
                onSelect={setSelectedWorkIdx}
            />
            <JourneySection
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

function JourneySection({title, items, selectedIdx, onSelect}: TimelineSectionProps) {
    const theme = useTheme();

    return (
        <section className="w-full">
            <h3 className="text-center text-2xl font-semibold mb-6 flex items-center justify-center gap-2">
                {title === "Work" ? "💼" : "🎓"} {title}
            </h3>
            <Timeline
                sx={{
                    [theme.breakpoints.down("md")]: {
                        [`& .${timelineItemClasses.root}:before`]: {
                            flex: 0,
                            padding: 0,
                        },
                    },
                }}
            >
                {items.map((item, idx) => (
                    <TimelineCard
                        key={`${item.title}-${item.duration}`}
                        item={item}
                        idx={idx}
                        isSelected={selectedIdx === idx}
                        length={items.length}
                        onClick={() => onSelect(idx)}
                    />
                ))}
            </Timeline>
        </section>
    );
}

interface TimelineCardProps {
    item: WorkItem | EducationItem;
    idx: number;
    isSelected: boolean;
    length: number;
    onClick: () => void;
}

function TimelineCard({
                          item,
                          idx,
                          isSelected,
                          length,
                          onClick,
                      }: TimelineCardProps) {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            transition={{
                duration: 0.4,
                delay: 0.1 * (length - idx),
                ease: "easeOut",
            }}
            viewport={{once: true}}
            variants={variants.fadeInUp}
        >
            <TimelineItem position={idx % 2 && !isSmall ? "left" : "right"}>
                {!isSmall && (
                    <TimelineOppositeContent
                        className={clsx(
                            "text-sm text-white/70",
                            !isSelected && "hover:bg-white/5 cursor-pointer"
                        )}
                        onClick={onClick}
                    >
                        {item.duration}
                    </TimelineOppositeContent>
                )}
                <TimelineSeparator>
                    <TimelineDot
                        color={isSelected ? "secondary" : "primary"}
                        variant={isSelected ? "filled" : "outlined"}
                        sx={{
                            width: isSelected ? 14 : 10,
                            height: isSelected ? 14 : 10,
                            transition: "all 0.2s ease-in-out",
                        }}
                    />
                    <TimelineConnector/>
                </TimelineSeparator>
                <TimelineContent>
                    <motion.div
                        initial={{opacity: 0, x: idx % 2 && !isSmall ? 80 : -80}}
                        whileInView={{opacity: 1, x: 0}}
                        transition={{
                            type: "spring",
                            stiffness: 60,
                            damping: 12,
                            delay: 0.05 * (length - idx),
                        }}
                        viewport={{once: true}}
                    >
                        <div
                            onClick={onClick}
                            className={clsx(
                                "rounded-2xl transition duration-300 p-3",
                                isSelected
                                    ? clsx(
                                        "bg-white/10 border-cyan-400 shadow-md backdrop-blur-sm",
                                        idx % 2 && !isSmall ? "border-r-4" : "border-l-4"
                                    )
                                    : "hover:bg-white/5 cursor-pointer"
                            )}
                        >
                            <h4 className="text-lg font-semibold text-white">
                                {item.title}
                            </h4>
                            {isSelected && (
                                <div className="mt-1 space-y-1">
                                    <p className="text-sm font-medium text-orange-300">
                                        {"company" in item ? item.company : item.school}
                                    </p>
                                    {"location" in item && (
                                        <p className="text-xs text-white/60">
                                            {item.location}
                                        </p>
                                    )}
                                    <p className="text-xs text-white/60">
                                        {item.duration}
                                    </p>
                                    {item.details && (
                                        <p className="text-sm text-white/85 pt-1 leading-relaxed">
                                            {item.details}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </TimelineContent>
            </TimelineItem>
        </motion.div>
    );
}
