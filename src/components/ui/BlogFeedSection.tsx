"use client";

import React, {useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {
    BookOpen,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ChevronUp,
    Clock,
    ExternalLink,
    Sparkles,
} from "lucide-react";
import type {BlogPost} from "@/infrastructure/blogPosts";

export interface BlogFeedSectionProps {
    heading: string;
    subheading: string;
    posts: BlogPost[];
    testIdPrefix: string;
}

export function BlogFeedSection({
    heading,
    subheading,
    posts,
    testIdPrefix,
}: BlogFeedSectionProps) {
    const [activeIdx, setActiveIdx] = useState<number>(0);
    const [showFullStory, setShowFullStory] = useState<boolean>(false);

    if (posts.length === 0) return null;

    const safeIdx = Math.min(Math.max(0, activeIdx), posts.length - 1);
    const activePost = posts[safeIdx];

    const selectPost = (index: number) => {
        setActiveIdx(index);
        setShowFullStory(false);
    };

    return (
        <section
            aria-labelledby={`${testIdPrefix}-heading`}
            data-testid={`${testIdPrefix}-blog-section`}
            className="space-y-2.5"
        >
            {/* Compact Single-Row Editorial Header + Story Counter */}
            <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-baseline gap-2.5">
                    <span className="inline-flex items-center gap-1 badge-accent text-[11px] py-0.5 px-2">
                        <BookOpen className="w-3 h-3" aria-hidden="true"/>
                        <span>Blog</span>
                    </span>
                    <h2
                        id={`${testIdPrefix}-heading`}
                        className="text-base sm:text-lg font-bold tracking-tight"
                    >
                        {heading}
                    </h2>
                    <span
                        style={{color: "var(--text-muted)"}}
                        className="hidden md:inline text-xs"
                    >
                        — {subheading}
                    </span>
                </div>

                {/* Prev / Next Story Controls */}
                <div className="flex items-center gap-1.5">
                    <span
                        style={{color: "var(--text-muted)"}}
                        className="text-[11px] font-mono tabular-nums"
                    >
                        Story {String(safeIdx + 1).padStart(2, "0")} /{" "}
                        {String(posts.length).padStart(2, "0")}
                    </span>
                    <button
                        type="button"
                        aria-label="Previous blog story"
                        data-testid={`${testIdPrefix}-prev-story`}
                        onClick={() =>
                            selectPost(
                                (safeIdx - 1 + posts.length) % posts.length
                            )
                        }
                        className="btn-secondary p-1"
                    >
                        <ChevronLeft className="w-3.5 h-3.5" aria-hidden="true"/>
                    </button>
                    <button
                        type="button"
                        aria-label="Next blog story"
                        data-testid={`${testIdPrefix}-next-story`}
                        onClick={() => selectPost((safeIdx + 1) % posts.length)}
                        className="btn-secondary p-1"
                    >
                        <ChevronRight className="w-3.5 h-3.5" aria-hidden="true"/>
                    </button>
                </div>
            </div>

            {/* Split-Pane Layout: Left Story Index + Right Animated Single-Story Reader */}
            <div className="grid gap-3 lg:grid-cols-12 items-start">
                {/* Left / Top Story Selector Deck */}
                <div
                    role="tablist"
                    aria-label={`${heading} selector`}
                    className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-col gap-1.5"
                >
                    {posts.map((post, idx) => {
                        const isSelected = idx === safeIdx;
                        return (
                            <button
                                key={post.id}
                                type="button"
                                role="tab"
                                aria-selected={isSelected}
                                data-testid={`blog-select-${post.id}`}
                                onClick={() => selectPost(idx)}
                                style={{
                                    borderColor: isSelected
                                        ? "var(--accent-primary)"
                                        : "var(--border-subtle)",
                                    backgroundColor: isSelected
                                        ? "var(--accent-subtle)"
                                        : "var(--bg-surface)",
                                }}
                                className="text-start p-2 rounded-xl border transition-all flex items-center gap-2.5 w-full cursor-pointer hover:opacity-95"
                            >
                                <img
                                    src={post.coverImage}
                                    alt={post.coverAlt}
                                    width={44}
                                    height={44}
                                    className="w-10 h-10 rounded-lg object-cover shrink-0"
                                />
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between gap-1">
                                        <span
                                            style={{
                                                color: isSelected
                                                    ? "var(--accent-primary)"
                                                    : "var(--text-muted)",
                                            }}
                                            className="text-[10px] font-mono font-semibold uppercase tracking-wider truncate"
                                        >
                                            {String(idx + 1).padStart(2, "0")} ·{" "}
                                            {post.category}
                                        </span>
                                        <span
                                            style={{color: "var(--text-muted)"}}
                                            className="text-[10px] tabular-nums shrink-0"
                                        >
                                            {post.readTime}
                                        </span>
                                    </div>
                                    <p className="text-xs font-semibold leading-snug line-clamp-1 mt-0.5">
                                        {post.title}
                                    </p>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Right Animated Single-Post Reader Stage */}
                <div
                    data-testid={`blog-stage-${testIdPrefix}`}
                    className="lg:col-span-8"
                >
                    <motion.article
                        key={activePost.id}
                        data-testid={`blog-post-${activePost.id}`}
                        initial={{opacity: 0, y: 14, scale: 0.992}}
                        animate={{opacity: 1, y: 0, scale: 1}}
                        transition={{
                            type: "spring",
                            stiffness: 270,
                            damping: 24,
                        }}
                        className="surface-card overflow-hidden"
                    >
                            {/* Compact Visual Banner + Header Overlay */}
                            <div className="relative h-28 sm:h-32 w-full overflow-hidden">
                                <img
                                    src={activePost.coverImage}
                                    alt={activePost.coverAlt}
                                    width={720}
                                    height={240}
                                    className="w-full h-full object-cover"
                                />
                                <div
                                    style={{
                                        background:
                                            "linear-gradient(to top, var(--bg-surface) 12%, transparent 90%)",
                                    }}
                                    className="absolute inset-0"
                                />
                                <div className="absolute bottom-2 inset-x-3.5 flex flex-wrap items-center justify-between gap-2 text-xs">
                                    <span className="badge-accent text-[10px] py-0.5 px-2">
                                        {activePost.category}
                                    </span>
                                    <span
                                        style={{
                                            backgroundColor:
                                                "var(--bg-elevated)",
                                            color: "var(--text-secondary)",
                                        }}
                                        className="px-2 py-0.5 rounded-full inline-flex items-center gap-1.5 tabular-nums text-[10px]"
                                    >
                                        <span>{activePost.dateLabel}</span>
                                        <span>·</span>
                                        <span className="inline-flex items-center gap-1">
                                            <Clock
                                                className="w-2.5 h-2.5"
                                                aria-hidden="true"
                                            />
                                            {activePost.readTime}
                                        </span>
                                    </span>
                                </div>
                            </div>

                            {/* Story Content */}
                            <div className="p-3.5 sm:p-4 space-y-2.5">
                                <div>
                                    <h3 className="text-sm sm:text-base font-bold leading-snug">
                                        {activePost.title}
                                    </h3>
                                    <p
                                        style={{color: "var(--accent-primary)"}}
                                        className="text-[11px] sm:text-xs font-medium"
                                    >
                                        {activePost.subtitle}
                                    </p>
                                </div>

                                <p
                                    style={{color: "var(--text-secondary)"}}
                                    className="text-xs sm:text-[13px] leading-relaxed"
                                >
                                    {activePost.excerpt}
                                </p>

                                {/* 2x2 Curated Favorites / Key Highlights */}
                                <div className="grid gap-2 sm:grid-cols-2">
                                    {activePost.highlights.map((h) => (
                                        <div
                                            key={h.label}
                                            className="surface-elevated p-2 space-y-0.5"
                                        >
                                            <p className="text-[11px] font-semibold flex items-center gap-1">
                                                <Sparkles
                                                    style={{
                                                        color: "var(--accent-primary)",
                                                    }}
                                                    className="w-3 h-3 shrink-0"
                                                    aria-hidden="true"
                                                />
                                                <span className="truncate">{h.label}</span>
                                            </p>
                                            <p
                                                style={{
                                                    color: "var(--text-secondary)",
                                                }}
                                                className="text-[11px] leading-snug line-clamp-2"
                                            >
                                                {h.detail}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Expandable Full Multi-Paragraph Blog Post */}
                                <AnimatePresence initial={false}>
                                    {showFullStory && (
                                        <motion.div
                                            key="full-story"
                                            data-testid={`blog-body-${activePost.id}`}
                                            initial={{opacity: 0, height: 0}}
                                            animate={{
                                                opacity: 1,
                                                height: "auto",
                                            }}
                                            exit={{opacity: 0, height: 0}}
                                            transition={{duration: 0.22}}
                                            style={{
                                                borderColor:
                                                    "var(--border-subtle)",
                                            }}
                                            className="pt-2.5 border-t space-y-2 overflow-hidden"
                                        >
                                            {activePost.paragraphs.map(
                                                (para, i) => (
                                                    <p
                                                        key={i}
                                                        style={{
                                                            color: "var(--text-secondary)",
                                                        }}
                                                        className="text-xs sm:text-sm leading-relaxed"
                                                    >
                                                        {para}
                                                    </p>
                                                )
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Footer Tags + Action Links */}
                                <div
                                    style={{borderColor: "var(--border-subtle)"}}
                                    className="pt-2.5 border-t flex flex-wrap items-center justify-between gap-2"
                                >
                                    <div className="flex flex-wrap gap-1">
                                        {activePost.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="surface-elevated px-1.5 py-0.5 text-[10px] font-mono"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex flex-wrap items-center gap-1.5">
                                        {activePost.externalLinks?.map(
                                            (link) => (
                                                <a
                                                    key={link.label}
                                                    href={link.url}
                                                    target={
                                                        link.url.startsWith(
                                                            "http"
                                                        )
                                                            ? "_blank"
                                                            : undefined
                                                    }
                                                    rel={
                                                        link.url.startsWith(
                                                            "http"
                                                        )
                                                            ? "noopener noreferrer"
                                                            : undefined
                                                    }
                                                    download={
                                                        link.url.endsWith(
                                                            ".pdf"
                                                        )
                                                            ? true
                                                            : undefined
                                                    }
                                                    className="btn-secondary text-[11px] py-1 px-2 inline-flex items-center gap-1"
                                                >
                                                    <span>{link.label}</span>
                                                    <ExternalLink
                                                        className="w-2.5 h-2.5"
                                                        aria-hidden="true"
                                                    />
                                                </a>
                                            )
                                        )}

                                        <button
                                            type="button"
                                            data-testid={`blog-toggle-${activePost.id}`}
                                            onClick={() =>
                                                setShowFullStory(
                                                    (prev) => !prev
                                                )
                                            }
                                            className="btn-primary text-[11px] py-1 px-2.5 inline-flex items-center gap-1"
                                        >
                                            {showFullStory ? (
                                                <>
                                                    <span>Collapse Story</span>
                                                    <ChevronUp
                                                        className="w-3 h-3"
                                                        aria-hidden="true"
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <span>Read Full Post</span>
                                                    <ChevronDown
                                                        className="w-3 h-3"
                                                        aria-hidden="true"
                                                    />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.article>
                </div>
            </div>
        </section>
    );
}
