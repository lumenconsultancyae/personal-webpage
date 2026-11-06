"use client";

import React, {useEffect, useState} from "react";
import {motion} from "framer-motion";
import {ExternalLink} from "lucide-react";
import Link from "next/link";

type Project = {
    id: number | string;
    name: string;
    description: string | null;
    web_url: string;
    homepage: string | null;
    tags?: string[];
};

const spotlightProjects: Project[] = [
    {
        id: "desktop-platform",
        name: "Interactive Desktop & Stocks Platform",
        description:
            "Interactive draggable desktop personal page (Personal Card, Notebook, Language Cards, Chess) & Stock portfolio tracker built with React, Redux, Spring Boot WebFlux, and MongoDB.",
        web_url: "https://gitlab.com/rgapps/desktop-frontend",
        homepage: "https://gitlab.com/rgapps/general-backend",
        tags: ["React", "Spring Boot WebFlux", "MongoDB", "Docker"],
    },
    {
        id: "rgapps-gameplan",
        name: "RGApps & GamePlan Platform",
        description:
            "Full-stack board-game community & event management application featuring reactive event streams, OAuth2 security, and a custom floating-layout design system.",
        web_url: "https://gitlab.com/rgapps/rgapps-frontend",
        homepage: "https://gitlab.com/rgapps/rgapps-backend",
        tags: ["Vue 3", "Vuetify 3", "Spring Boot WebFlux", "Pinia"],
    },
    {
        id: "ddd-compiler",
        name: "DDDCompiler",
        description:
            "Model-driven Domain-Driven Design compiler that generates clean domain code from explicit, human-readable domain model specifications.",
        web_url: "https://gitlab.com/wilsonr990/dddcompiler",
        homepage: null,
        tags: ["DDD", "Code Generation", "Architecture"],
    },
    {
        id: "coding-game",
        name: "CodingGame Algorithms",
        description:
            "Algorithmic implementations, heuristics, and bot competition solutions across multi-agent and optimization challenges.",
        web_url: "https://gitlab.com/wilsonr990/codingGame",
        homepage: null,
        tags: ["Algorithms", "C++", "Java", "Python"],
    },
];

export default function Projects() {
    const [remoteProjects, setRemoteProjects] = useState<Project[]>([]);
    const gitlabUser = "wilsonr990";

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const res = await fetch(
                    `https://gitlab.com/api/v4/users/${gitlabUser}/projects?simple=true&order_by=last_activity_at`
                );
                if (!res.ok) return;
                const data: Project[] = await res.json();
                if (Array.isArray(data)) {
                    const spotlightUrls = new Set(
                        spotlightProjects.map((s) => s.web_url.toLowerCase())
                    );
                    setRemoteProjects(
                        data.filter(
                            (p) =>
                                p.web_url &&
                                !spotlightUrls.has(p.web_url.toLowerCase())
                        )
                    );
                }
            } catch (err) {
                console.error("GitLab fetch error", err);
            }
        };
        fetchRepos();
    }, []);

    const allProjects = [...spotlightProjects, ...remoteProjects];

    return (
        <div className="max-w-5xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-left">
            {/* Current portfolio site */}
            <motion.div
                className="glass-card-interactive p-6 rounded-2xl flex flex-col justify-between border-t-2 border-t-amber-300/70"
                initial={{opacity: 0, scale: 0.96}}
                whileInView={{opacity: 1, scale: 1}}
                viewport={{once: true}}
                transition={{type: "spring", stiffness: 60, damping: 14}}
            >
                <div>
                    <h3 className="text-lg font-semibold mb-2 text-amber-300">
                        This Portfolio
                    </h3>
                    <p className="text-white/80 mb-4 text-sm leading-relaxed">
                        Built with Next.js 15, React 19, TypeScript, Tailwind CSS v4,
                        and Framer Motion—designed with a clean, low-density separation
                        between my professional work and personal world.
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-5">
                        {["Next.js 15", "React 19", "TypeScript", "Tailwind CSS"].map(
                            (tag) => (
                                <span
                                    key={tag}
                                    className="text-xs px-2.5 py-0.5 rounded-full bg-amber-300/15 border border-amber-300/30 text-amber-200 font-medium"
                                >
                                    {tag}
                                </span>
                            )
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-4 pt-2 border-t border-white/10">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-1.5 text-amber-300 hover:underline text-xs font-semibold"
                    >
                        View live <ExternalLink className="w-3.5 h-3.5"/>
                    </Link>
                    <a
                        href="https://github.com/lumenconsultancyae/personal-webpage"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-white/75 hover:text-amber-300 hover:underline text-xs font-medium"
                    >
                        GitHub <ExternalLink className="w-3.5 h-3.5"/>
                    </a>
                </div>
            </motion.div>

            {/* Spotlight & GitLab repos */}
            {allProjects.map((p) => (
                <motion.div
                    key={p.id}
                    className="glass-card-interactive p-6 rounded-2xl flex flex-col justify-between"
                    initial={{opacity: 0, scale: 0.96}}
                    whileInView={{opacity: 1, scale: 1}}
                    viewport={{once: true}}
                    transition={{type: "spring", stiffness: 60, damping: 14}}
                >
                    <div>
                        <h3 className="text-lg font-semibold mb-2 text-white">
                            {p.name}
                        </h3>
                        <p className="text-white/80 mb-4 text-sm leading-relaxed">
                            {p.description ||
                                "Open-source engineering project hosted on GitLab."}
                        </p>
                        {p.tags && (
                            <div className="flex flex-wrap gap-1.5 mb-5">
                                {p.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-xs px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-amber-200 font-medium"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-4 pt-2 border-t border-white/10">
                        <a
                            href={p.web_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-amber-300 hover:underline text-xs font-semibold"
                        >
                            View Project <ExternalLink className="w-3.5 h-3.5"/>
                        </a>
                        {p.homepage && (
                            <a
                                href={p.homepage}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-white/75 hover:text-amber-300 hover:underline text-xs font-medium"
                            >
                                Backend Repo <ExternalLink className="w-3.5 h-3.5"/>
                            </a>
                        )}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
