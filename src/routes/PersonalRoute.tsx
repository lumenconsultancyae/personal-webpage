"use client";

import React, {useState} from "react";
import {useSearchParams} from "react-router-dom";
import {
    BookOpen,
    Film,
    Languages,
    MapPin,
    Music,
    Plane,
    Puzzle,
    Quote,
    Sparkles,
    X,
} from "lucide-react";
import type {GalleryItem} from "@/domain/models";
import {useProfileOverviewQuery} from "@/application/usePortfolioQueries";
import {PERSONAL_BLOG_POSTS} from "@/infrastructure/blogPosts";
import {BlogFeedSection} from "@/components/ui/BlogFeedSection";
import {RouteSkeleton} from "@/components/ui/ErrorBoundary";

const LIFESTYLE_ICONS = {
    puzzle: <Puzzle className="w-5 h-5" aria-hidden="true"/>,
    languages: <Languages className="w-5 h-5" aria-hidden="true"/>,
    plane: <Plane className="w-5 h-5" aria-hidden="true"/>,
    music: <Music className="w-5 h-5" aria-hidden="true"/>,
    book: <BookOpen className="w-5 h-5" aria-hidden="true"/>,
    film: <Film className="w-5 h-5" aria-hidden="true"/>,
} as const;

const LIFESTYLE_IMAGES: Record<string, string> = {
    "life-boardgames": "/gallery/group.jpg",
    "life-languages": "/gallery/dev-workspace.png",
    "life-travel": "/gallery/colombia-cocora.png",
    "life-music": "/gallery/music-vinyl.png",
    "life-learning": "/gallery/coffee-lab.png",
    "life-movies": "/gallery/movies-cinema.png",
};

const TRAVEL_IMAGES: Record<string, string> = {
    "travel-colombia": "/gallery/colombia-cocora.png",
    "travel-singapore": "/gallery/singapore-skyline.png",
    "travel-uae": "/gallery/dubai-chapter.png",
    "travel-next": "/gallery/family-moment.png",
};

export default function PersonalRoute() {
    const {data: profile, isLoading} = useProfileOverviewQuery();
    const [searchParams, setSearchParams] = useSearchParams();
    const activeTab = searchParams.get("tab") ?? "all";
    const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

    if (isLoading || !profile) {
        return <RouteSkeleton rows={4}/>;
    }

    const tabs = [
        {id: "all", label: "All Sections"},
        {id: "lifestyle", label: "Lifestyle & Passions"},
        {id: "travel", label: "Global Chapters"},
        {id: "philosophy", label: "Philosophy"},
        {id: "funfacts", label: "10 Fun Facts"},
        {id: "gallery", label: "Photo Gallery"},
    ] as const;

    const showSection = (id: string) =>
        activeTab === "all" || activeTab === id;

    return (
        <div data-testid="personal-route" className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                        Beyond the Keyboard — Personal Blog &amp; Curated Favorites
                    </h1>
                    <p
                        style={{color: "var(--text-secondary)"}}
                        className="text-sm mt-1"
                    >
                        Blogs on my favorite board games (@bgameplan), favorite movies, favorite music, fatherhood, and global chapters
                    </p>
                </div>

                <div
                    role="tablist"
                    aria-label="Personal page sections"
                    className="flex flex-wrap gap-1.5"
                >
                    {tabs.map((tab) => {
                        const isCurrent = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                type="button"
                                role="tab"
                                aria-selected={isCurrent}
                                data-testid={`personal-tab-${tab.id}`}
                                onClick={() => {
                                    const next = new URLSearchParams(
                                        searchParams
                                    );
                                    if (tab.id === "all") {
                                        next.delete("tab");
                                    } else {
                                        next.set("tab", tab.id);
                                    }
                                    setSearchParams(next);
                                }}
                                className={
                                    isCurrent
                                        ? "btn-primary text-xs"
                                        : "btn-secondary text-xs"
                                }
                            >
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Personal Blog Posts: Board Games, Favorite Movies, Favorite Music, Fatherhood & Coffee */}
            {showSection("lifestyle") && (
                <BlogFeedSection
                    heading="Personal Blog: Board Games, Movies, Music & Life"
                    subheading="Stories and curated lists on tabletop game design (@bgameplan), mind-bending cinema, coding soundtracks, and specialty coffee"
                    posts={PERSONAL_BLOG_POSTS}
                    testIdPrefix="personal"
                />
            )}

            {/* Lifestyle Grid */}
            {showSection("lifestyle") && (
                <section aria-labelledby="lifestyle-heading" className="space-y-4">
                    <h2 id="lifestyle-heading" className="text-xl font-semibold">
                        Who Am I? — Lifestyle &amp; Passions
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {profile.lifestyle.map((item) => (
                            <article
                                key={item.id}
                                className="surface-card overflow-hidden flex flex-col justify-between"
                            >
                                <img
                                    src={
                                        LIFESTYLE_IMAGES[item.id] ??
                                        "/gallery/group2.jpg"
                                    }
                                    alt={item.title}
                                    width={400}
                                    height={200}
                                    className="w-full h-36 object-cover"
                                />
                                <div className="p-5 space-y-2.5 flex-1">
                                    <div className="flex items-center gap-2.5">
                                        <span
                                            style={{
                                                backgroundColor:
                                                    "var(--accent-subtle)",
                                                color: "var(--accent-primary)",
                                            }}
                                            className="p-2 rounded-lg"
                                        >
                                            {LIFESTYLE_ICONS[item.iconName]}
                                        </span>
                                        <h3 className="font-semibold text-base">
                                            {item.title}
                                        </h3>
                                    </div>
                                    <p
                                        style={{color: "var(--text-secondary)"}}
                                        className="text-sm leading-relaxed"
                                    >
                                        {item.desc}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            )}

            {/* Global Chapters / Travel */}
            {showSection("travel") && (
                <section aria-labelledby="travel-heading" className="space-y-4">
                    <h2 id="travel-heading" className="text-xl font-semibold">
                        Where I&apos;ve Lived — Every Place Tells a Story
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {profile.travel.map((stop) => (
                            <article
                                key={stop.id}
                                className="surface-card overflow-hidden flex flex-col justify-between"
                            >
                                <img
                                    src={
                                        TRAVEL_IMAGES[stop.id] ??
                                        "/gallery/colombia-cocora.png"
                                    }
                                    alt={`${stop.city}, ${stop.country}`}
                                    width={500}
                                    height={220}
                                    className="w-full h-40 object-cover"
                                />
                                <div className="p-5 space-y-2 flex-1">
                                    <div className="flex items-center justify-between gap-2">
                                        <span
                                            style={{color: "var(--accent-primary)"}}
                                            className="font-semibold text-sm inline-flex items-center gap-1.5"
                                        >
                                            <MapPin
                                                className="w-4 h-4"
                                                aria-hidden="true"
                                            />
                                            {stop.city}, {stop.country}
                                        </span>
                                        <span className="badge-accent tabular-nums">
                                            {stop.period}
                                        </span>
                                    </div>
                                    <p
                                        style={{color: "var(--text-secondary)"}}
                                        className="text-sm leading-relaxed"
                                    >
                                        {stop.note}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            )}

            {/* Philosophy */}
            {showSection("philosophy") && (
                <section
                    aria-labelledby="philosophy-heading"
                    className="space-y-4"
                >
                    <h2 id="philosophy-heading" className="text-xl font-semibold">
                        Engineering &amp; Life Philosophy
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {profile.philosophies.map((phil) => (
                            <article
                                key={phil.id}
                                className="surface-card p-5 space-y-2"
                            >
                                <div
                                    style={{color: "var(--accent-primary)"}}
                                    className="font-semibold text-sm flex items-center gap-2"
                                >
                                    <Quote
                                        className="w-4 h-4 shrink-0"
                                        aria-hidden="true"
                                    />
                                    <span>{phil.quote}</span>
                                </div>
                                <p
                                    style={{color: "var(--text-secondary)"}}
                                    className="text-sm leading-relaxed"
                                >
                                    {phil.context}
                                </p>
                            </article>
                        ))}
                    </div>
                </section>
            )}

            {/* 10 Fun Facts */}
            {showSection("funfacts") && (
                <section aria-labelledby="funfacts-heading" className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                        <h2 id="funfacts-heading" className="text-xl font-semibold">
                            10 Fun Facts
                        </h2>
                        {activeTab === "all" && profile.funFacts.length > 4 && (
                            <button
                                type="button"
                                onClick={() => {
                                    const next = new URLSearchParams(searchParams);
                                    next.set("tab", "funfacts");
                                    setSearchParams(next);
                                }}
                                className="btn-secondary text-xs"
                            >
                                Show all {profile.funFacts.length} facts
                            </button>
                        )}
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                        {(activeTab === "all"
                            ? profile.funFacts.slice(0, 4)
                            : profile.funFacts
                        ).map((item) => (
                            <div
                                key={item.id}
                                className="surface-card p-4 flex items-start gap-3"
                            >
                                <span className="badge-accent tabular-nums shrink-0">
                                    #{item.order}
                                </span>
                                <p
                                    style={{color: "var(--text-secondary)"}}
                                    className="text-sm"
                                >
                                    {item.fact}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Photo Gallery */}
            {showSection("gallery") && (
                <section aria-labelledby="gallery-heading" className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2
                            id="gallery-heading"
                            className="text-xl font-semibold inline-flex items-center gap-2"
                        >
                            <Sparkles
                                style={{color: "var(--accent-primary)"}}
                                className="w-5 h-5"
                                aria-hidden="true"
                            />
                            Snapshots &amp; Photo Gallery
                        </h2>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                        {profile.gallery.map((img) => (
                            <button
                                key={img.id}
                                type="button"
                                data-testid={`gallery-card-${img.id}`}
                                onClick={() => setLightboxItem(img)}
                                className="surface-card overflow-hidden text-start flex flex-col justify-between group hover:opacity-95 transition"
                            >
                                <img
                                    src={img.src}
                                    alt={img.alt}
                                    width={400}
                                    height={260}
                                    className="w-full h-40 object-cover"
                                />
                                <div className="p-3 space-y-1">
                                    <span className="badge-accent">
                                        {img.category}
                                    </span>
                                    <p
                                        style={{color: "var(--text-secondary)"}}
                                        className="text-xs leading-snug mt-1"
                                    >
                                        {img.caption}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>
                </section>
            )}

            {/* Accessible Lightbox Modal */}
            {lightboxItem && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label={lightboxItem.alt}
                    data-testid="gallery-lightbox"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setLightboxItem(null);
                        }
                    }}
                    style={{backgroundColor: "hsl(222 47% 4% / 0.8)"}}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm no-print"
                >
                    <div className="surface-card max-w-2xl w-full p-5 space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="badge-accent">
                                {lightboxItem.category}
                            </span>
                            <button
                                type="button"
                                aria-label="Close photo preview"
                                data-testid="gallery-lightbox-close"
                                onClick={() => setLightboxItem(null)}
                                className="btn-secondary p-1.5"
                            >
                                <X className="w-4 h-4" aria-hidden="true"/>
                            </button>
                        </div>
                        <img
                            src={lightboxItem.src}
                            alt={lightboxItem.alt}
                            className="w-full max-h-96 object-contain rounded-lg"
                        />
                        <p className="text-sm font-medium text-center">
                            {lightboxItem.caption}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
