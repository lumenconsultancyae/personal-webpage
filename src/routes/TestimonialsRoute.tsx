"use client";

import React, {useMemo, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {
    Plus,
    Quote,
    Trash2,
} from "lucide-react";
import type {TestimonialItem} from "@/domain/models";
import type {TestimonialFormParsed} from "@/domain/schemas";
import {
    useCreateTestimonialMutation,
    useDeleteTestimonialMutation,
    useProfileOverviewQuery,
    useRestoreTestimonialMutation,
    useTestimonialsQuery,
} from "@/application/usePortfolioQueries";
import {useToast} from "@/components/ui/ToastProvider";
import {ConfirmDialog} from "@/components/ui/ConfirmDialog";
import {RouteSkeleton} from "@/components/ui/ErrorBoundary";
import {TestimonialFormPanel} from "@/components/forms/TestimonialFormPanel";

export default function TestimonialsRoute() {
    const {data: testimonials = [], isLoading: loadingTestimonials} =
        useTestimonialsQuery();
    const {data: profile, isLoading: loadingProfile} =
        useProfileOverviewQuery();
    const createMutation = useCreateTestimonialMutation();
    const deleteMutation = useDeleteTestimonialMutation();
    const restoreMutation = useRestoreTestimonialMutation();
    const {pushToast} = useToast();

    const [searchParams, setSearchParams] = useSearchParams();
    const skillCategory = searchParams.get("skillCategory") ?? "all";

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [pendingDelete, setPendingDelete] =
        useState<TestimonialItem | null>(null);

    const skills = useMemo(() => {
        const all = profile?.skills ?? [];
        if (skillCategory === "all") return all;
        return all.filter((s) => s.category === skillCategory);
    }, [profile?.skills, skillCategory]);

    if (loadingTestimonials || loadingProfile || !profile) {
        return <RouteSkeleton rows={4}/>;
    }

    const onSubmit = async (values: TestimonialFormParsed) => {
        await createMutation.mutateAsync(values);
        pushToast({
            variant: "success",
            title: "Endorsement added",
            description: `Thank you! ${values.author}'s endorsement is now published.`,
        });
        setIsFormOpen(false);
    };

    const handleConfirmDelete = async () => {
        if (!pendingDelete) return;
        const snapshot = pendingDelete;
        setPendingDelete(null);
        await deleteMutation.mutateAsync(snapshot.id);
        pushToast({
            variant: "info",
            title: "Endorsement removed",
            description: `Removed endorsement by ${snapshot.author}.`,
            undoLabel: "Undo",
            onUndo: async () => {
                await restoreMutation.mutateAsync(snapshot);
                pushToast({
                    variant: "success",
                    title: "Endorsement restored",
                    description: `Restored endorsement by ${snapshot.author}.`,
                });
            },
        });
    };

    const skillCategories = [
        "all",
        "Backend",
        "Frontend",
        "DevOps & Observability",
        "AI, Data & Messaging",
    ] as const;

    return (
        <div data-testid="testimonials-route" className="space-y-10">
            <section aria-labelledby="testimonials-heading" className="space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1
                            id="testimonials-heading"
                            className="text-2xl sm:text-3xl font-bold tracking-tight"
                        >
                            Peer Testimonials &amp; Technical Matrix
                        </h1>
                        <p
                            style={{color: "var(--text-secondary)"}}
                            className="text-sm mt-1"
                        >
                            Feedback from engineering managers, tech leads, and colleagues across global teams
                        </p>
                    </div>

                    <button
                        type="button"
                        data-testid="toggle-testimonial-form"
                        onClick={() => setIsFormOpen((prev) => !prev)}
                        className="btn-primary text-sm inline-flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" aria-hidden="true"/>
                        {isFormOpen ? "Close Form" : "Add Endorsement"}
                    </button>
                </div>

                {isFormOpen && (
                    <TestimonialFormPanel
                        isSaving={createMutation.isPending}
                        onClose={() => setIsFormOpen(false)}
                        onSubmitForm={onSubmit}
                    />
                )}

                <div className="grid gap-3 sm:grid-cols-3">
                    {[
                        {
                            src: "/gallery/dubai-chapter.png",
                            caption: "Dubai & Abu Dhabi — Cybersecurity & EdTech Teams",
                        },
                        {
                            src: "/gallery/singapore-skyline.png",
                            caption: "Singapore — Multinational Fintech Engineering",
                        },
                        {
                            src: "/gallery/colombia-cocora.png",
                            caption: "Colombia — Distributed Systems & Security R&D",
                        },
                    ].map((region) => (
                        <div
                            key={region.src}
                            className="surface-card overflow-hidden flex items-center gap-3 p-2"
                        >
                            <img
                                src={region.src}
                                alt={region.caption}
                                width={120}
                                height={72}
                                className="w-24 h-16 object-cover rounded-lg shrink-0"
                            />
                            <span className="text-xs font-medium leading-snug">
                                {region.caption}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    {testimonials.map((item) => (
                        <article
                            key={item.id}
                            data-testid={`testimonial-card-${item.id}`}
                            className="surface-card p-5 flex flex-col justify-between gap-4"
                        >
                            <div className="space-y-3">
                                <div className="flex items-center justify-between gap-2">
                                    <Quote
                                        style={{color: "var(--accent-primary)"}}
                                        className="w-5 h-5"
                                        aria-hidden="true"
                                    />
                                    <span
                                        style={{color: "var(--text-muted)"}}
                                        className="text-xs tabular-nums"
                                    >
                                        {item.year}
                                    </span>
                                </div>
                                <p
                                    style={{color: "var(--text-secondary)"}}
                                    className="text-sm leading-relaxed italic"
                                >
                                    &ldquo;{item.text}&rdquo;
                                </p>
                            </div>

                            <div
                                style={{borderColor: "var(--border-subtle)"}}
                                className="pt-3 border-t flex items-center justify-between gap-2"
                            >
                                <div>
                                    <p className="font-semibold text-sm">
                                        {item.author}
                                    </p>
                                    <p
                                        style={{color: "var(--text-muted)"}}
                                        className="text-xs"
                                    >
                                        {item.role} · {item.company}
                                    </p>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <button
                                        type="button"
                                        aria-label={`Delete endorsement from ${item.author}`}
                                        data-testid={`delete-testimonial-${item.id}`}
                                        onClick={() => setPendingDelete(item)}
                                        style={{color: "var(--status-danger)"}}
                                        className="btn-secondary p-1.5"
                                    >
                                        <Trash2
                                            className="w-3.5 h-3.5"
                                            aria-hidden="true"
                                        />
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section aria-labelledby="skills-matrix-heading" className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h2
                            id="skills-matrix-heading"
                            className="text-xl font-semibold"
                        >
                            Tools &amp; Technologies Matrix
                        </h2>
                        <p
                            style={{color: "var(--text-muted)"}}
                            className="text-xs"
                        >
                            Production experience and proficiency across core engineering domains
                        </p>
                    </div>

                    <div
                        role="group"
                        aria-label="Filter skills by domain"
                        className="flex flex-wrap gap-1.5"
                    >
                        {skillCategories.map((cat) => {
                            const active = skillCategory === cat;
                            return (
                                <button
                                    key={cat}
                                    type="button"
                                    data-testid={`skill-cat-${cat}`}
                                    onClick={() => {
                                        const next = new URLSearchParams(
                                            searchParams
                                        );
                                        if (cat === "all") {
                                            next.delete("skillCategory");
                                        } else {
                                            next.set("skillCategory", cat);
                                        }
                                        setSearchParams(next);
                                    }}
                                    className={
                                        active
                                            ? "btn-primary text-xs"
                                            : "btn-secondary text-xs"
                                    }
                                >
                                    {cat === "all" ? "All Domains" : cat}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="bounded-table-container">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr>
                                <th className="py-3 px-4 font-semibold text-xs uppercase tracking-wider">
                                    Technology
                                </th>
                                <th className="py-3 px-4 font-semibold text-xs uppercase tracking-wider">
                                    Domain
                                </th>
                                <th className="py-3 px-4 font-semibold text-xs uppercase tracking-wider">
                                    Production Experience
                                </th>
                                <th className="py-3 px-4 font-semibold text-xs uppercase tracking-wider">
                                    Proficiency Index
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {skills.map((skill) => (
                                <tr
                                    key={skill.name}
                                    style={{borderColor: "var(--border-subtle)"}}
                                    className="border-b"
                                >
                                    <td className="py-2.5 px-4 font-medium">
                                        {skill.name}
                                    </td>
                                    <td className="py-2.5 px-4">
                                        <span className="badge-accent">
                                            {skill.category}
                                        </span>
                                    </td>
                                    <td className="py-2.5 px-4 tabular-nums">
                                        {skill.years} yrs
                                    </td>
                                    <td className="py-2.5 px-4 tabular-nums">
                                        {skill.proficiency}%
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <ConfirmDialog
                open={Boolean(pendingDelete)}
                title="Remove Peer Endorsement?"
                description="This endorsement will be removed from the testimonials view. You can undo immediately from the toast notification."
                itemSummary={
                    pendingDelete
                        ? `${pendingDelete.author} — ${pendingDelete.role}, ${pendingDelete.company}`
                        : undefined
                }
                confirmLabel="Delete Endorsement"
                cancelLabel="Cancel"
                variant="danger"
                isPending={deleteMutation.isPending}
                onConfirm={handleConfirmDelete}
                onCancel={() => setPendingDelete(null)}
            />
        </div>
    );
}
