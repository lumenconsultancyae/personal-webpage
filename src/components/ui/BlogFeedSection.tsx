"use client";

import React, {useState} from "react";
import {
    BookOpen,
    ChevronDown,
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
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
        [posts[0]?.id ?? ""]: true,
    });

    const categories = [
        "all",
        ...Array.from(new Set(posts.map((p) => p.category))),
    ];

    const visiblePosts =
        selectedCategory === "all"
            ? posts
            : posts.filter((p) => p.category === selectedCategory);

    const toggleExpand = (id: string) => {
        setExpandedIds((prev) => ({...prev, [id]: !prev[id]}));
    };

    return (
        <section
            aria-labelledby={`${testIdPrefix}-heading`}
            data-testid={`${testIdPrefix}-blog-section`}
            className="space-y-6"
        >
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <div className="inline-flex items-center gap-1.5 badge-accent mb-2">
                        <BookOpen className="w-3.5 h-3.5" aria-hidden="true"/>
                        <span>Editorial Blog &amp; Stories</span>
                    </div>
                    <h2
                        id={`${testIdPrefix}-heading`}
                        className="text-2xl sm:text-3xl font-bold tracking-tight"
                    >
                        {heading}
                    </h2>
                    <p
                        style={{color: "var(--text-secondary)"}}
                        className="text-sm mt-1"
                    >
                        {subheading}
                    </p>
                </div>

                <div
                    role="group"
                    aria-label="Filter blog posts by topic"
                    className="flex flex-wrap gap-1.5"
                >
                    {categories.map((cat) => {
                        const isActive = selectedCategory === cat;
                        return (
                            <button
                                key={cat}
                                type="button"
                                data-testid={`${testIdPrefix}-cat-${cat}`}
                                onClick={() => setSelectedCategory(cat)}
                                className={
                                    isActive
                                        ? "btn-primary text-xs py-1.5 px-3"
                                        : "btn-secondary text-xs py-1.5 px-3"
                                }
                            >
                                {cat === "all" ? "All Stories" : cat}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="space-y-6">
                {visiblePosts.map((post) => {
                    const isExpanded = Boolean(expandedIds[post.id]);
                    return (
                        <article
                            key={post.id}
                            data-testid={`blog-post-${post.id}`}
                            className="surface-card overflow-hidden"
                        >
                            <div className="grid lg:grid-cols-12">
                                <div className="lg:col-span-5 relative">
                                    <img
                                        src={post.coverImage}
                                        alt={post.coverAlt}
                                        width={560}
                                        height={360}
                                        className="w-full h-56 lg:h-full object-cover"
                                    />
                                </div>

                                <div className="lg:col-span-7 p-6 sm:p-7 flex flex-col justify-between space-y-4">
                                    <div className="space-y-3">
                                        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                                            <span className="badge-accent">
                                                {post.category}
                                            </span>
                                            <span
                                                style={{
                                                    color: "var(--text-muted)",
                                                }}
                                                className="inline-flex items-center gap-3 tabular-nums"
                                            >
                                                <span>{post.dateLabel}</span>
                                                <span className="inline-flex items-center gap-1">
                                                    <Clock
                                                        className="w-3.5 h-3.5"
                                                        aria-hidden="true"
                                                    />
                                                    {post.readTime}
                                                </span>
                                            </span>
                                        </div>

                                        <div>
                                            <h3 className="text-xl sm:text-2xl font-bold leading-snug">
                                                {post.title}
                                            </h3>
                                            <p
                                                style={{
                                                    color: "var(--accent-primary)",
                                                }}
                                                className="text-xs sm:text-sm font-medium mt-1"
                                            >
                                                {post.subtitle}
                                            </p>
                                        </div>

                                        <p
                                            style={{
                                                color: "var(--text-secondary)",
                                            }}
                                            className="text-sm leading-relaxed"
                                        >
                                            {post.excerpt}
                                        </p>

                                        {/* Curated Picks / Experience Highlights */}
                                        <div className="grid gap-2.5 sm:grid-cols-2 pt-1">
                                            {post.highlights.map((h) => (
                                                <div
                                                    key={h.label}
                                                    className="surface-elevated p-3 space-y-1"
                                                >
                                                    <p className="text-xs font-semibold flex items-center gap-1.5">
                                                        <Sparkles
                                                            style={{
                                                                color: "var(--accent-primary)",
                                                            }}
                                                            className="w-3.5 h-3.5 shrink-0"
                                                            aria-hidden="true"
                                                        />
                                                        <span>{h.label}</span>
                                                    </p>
                                                    <p
                                                        style={{
                                                            color: "var(--text-secondary)",
                                                        }}
                                                        className="text-xs leading-relaxed"
                                                    >
                                                        {h.detail}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Full Blog Article Body */}
                                        {isExpanded && (
                                            <div
                                                data-testid={`blog-body-${post.id}`}
                                                style={{
                                                    borderColor:
                                                        "var(--border-subtle)",
                                                }}
                                                className="pt-4 mt-2 border-t space-y-3"
                                            >
                                                {post.paragraphs.map(
                                                    (para, i) => (
                                                        <p
                                                            key={i}
                                                            style={{
                                                                color: "var(--text-secondary)",
                                                            }}
                                                            className="text-sm leading-relaxed"
                                                        >
                                                            {para}
                                                        </p>
                                                    )
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <div
                                        style={{
                                            borderColor: "var(--border-subtle)",
                                        }}
                                        className="pt-4 border-t flex flex-wrap items-center justify-between gap-3"
                                    >
                                        <div className="flex flex-wrap gap-1.5">
                                            {post.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="surface-elevated px-2.5 py-0.5 text-xs"
                                                >
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex flex-wrap items-center gap-2">
                                            {post.externalLinks?.map((link) => (
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
                                                    className="btn-secondary text-xs py-1.5 px-3 inline-flex items-center gap-1.5"
                                                >
                                                    <span>{link.label}</span>
                                                    <ExternalLink
                                                        className="w-3 h-3"
                                                        aria-hidden="true"
                                                    />
                                                </a>
                                            ))}

                                            <button
                                                type="button"
                                                data-testid={`blog-toggle-${post.id}`}
                                                onClick={() =>
                                                    toggleExpand(post.id)
                                                }
                                                className="btn-primary text-xs py-1.5 px-3 inline-flex items-center gap-1.5"
                                            >
                                                {isExpanded ? (
                                                    <>
                                                        <span>Show Less</span>
                                                        <ChevronUp
                                                            className="w-3.5 h-3.5"
                                                            aria-hidden="true"
                                                        />
                                                    </>
                                                ) : (
                                                    <>
                                                        <span>
                                                            Read Full Article
                                                        </span>
                                                        <ChevronDown
                                                            className="w-3.5 h-3.5"
                                                            aria-hidden="true"
                                                        />
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}
