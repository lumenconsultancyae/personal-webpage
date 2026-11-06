"use client";

import React, {useEffect, useMemo, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {Edit3, ExternalLink, Plus, Search, Trash2, X} from "lucide-react";
import type {ProjectItem} from "@/domain/models";
import {PROJECT_CATEGORIES, type ProjectFormParsed} from "@/domain/schemas";
import {
    useCreateProjectMutation,
    useDeleteProjectMutation,
    useProjectsQuery,
    useRestoreProjectMutation,
    useUpdateProjectMutation,
} from "@/application/usePortfolioQueries";
import {useToast} from "@/components/ui/ToastProvider";
import {ConfirmDialog} from "@/components/ui/ConfirmDialog";
import {ContextualEmptyState, RouteSkeleton} from "@/components/ui/ErrorBoundary";
import {PaginationControls} from "@/components/ui/PaginationControls";
import {ProjectFormPanel} from "@/components/forms/ProjectFormPanel";

const PROJECT_BANNERS = [
    {src: "/gallery/dev-workspace.png", label: "Interactive Desktop & Architecture"},
    {src: "/gallery/group.jpg", label: "RGApps & GamePlan Community Platform"},
    {src: "/gallery/dubai-chapter.png", label: "Reactive Microservices & Open Source"},
];

export default function ProjectsRoute() {
    const {data: projects = [], isLoading} = useProjectsQuery();
    const createMutation = useCreateProjectMutation();
    const updateMutation = useUpdateProjectMutation();
    const deleteMutation = useDeleteProjectMutation();
    const restoreMutation = useRestoreProjectMutation();
    const {pushToast} = useToast();

    const [searchParams, setSearchParams] = useSearchParams();
    const urlQuery = searchParams.get("q") ?? "";
    const categoryFilter = searchParams.get("category") ?? "all";
    const sortOrder = searchParams.get("sort") ?? "year-desc";
    const pageParam = Number(searchParams.get("page") ?? "1") || 1;
    const pageSizeParam = Number(searchParams.get("pageSize") ?? "10") || 10;
    const createParam = searchParams.get("create") === "1";

    const [searchInput, setSearchInput] = useState(urlQuery);
    const [isFormOpen, setIsFormOpen] = useState(createParam);
    const [editingProject, setEditingProject] = useState<ProjectItem | null>(
        null
    );
    const [pendingDelete, setPendingDelete] = useState<ProjectItem | null>(
        null
    );

    useEffect(() => {
        setSearchInput(urlQuery);
    }, [urlQuery]);

    useEffect(() => {
        if (createParam) {
            setIsFormOpen(true);
        }
    }, [createParam]);

    // Debounce search input into URL search params
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchInput !== urlQuery) {
                const next = new URLSearchParams(searchParams);
                if (searchInput.trim()) {
                    next.set("q", searchInput.trim());
                } else {
                    next.delete("q");
                }
                next.set("page", "1");
                setSearchParams(next, {replace: true});
            }
        }, 200);
        return () => clearTimeout(timer);
    }, [searchInput, urlQuery, searchParams, setSearchParams]);

    const updateParam = (key: string, value: string) => {
        const next = new URLSearchParams(searchParams);
        if (!value || value === "all") {
            next.delete(key);
        } else {
            next.set(key, value);
        }
        if (key !== "page") {
            next.set("page", "1");
        }
        setSearchParams(next);
    };

    const clearFilters = () => {
        setSearchInput("");
        setSearchParams(new URLSearchParams());
    };

    const openCreateDrawer = () => {
        setEditingProject(null);
        setIsFormOpen(true);
    };

    const openEditDrawer = (project: ProjectItem) => {
        setEditingProject(project);
        setIsFormOpen(true);
    };

    const closeDrawer = () => {
        setIsFormOpen(false);
        setEditingProject(null);
        if (searchParams.get("create") === "1") {
            const next = new URLSearchParams(searchParams);
            next.delete("create");
            setSearchParams(next, {replace: true});
        }
    };

    const onSubmitForm = async (values: ProjectFormParsed) => {
        if (editingProject) {
            await updateMutation.mutateAsync({
                id: editingProject.id,
                input: values,
            });
            pushToast({
                variant: "success",
                title: "Project updated",
                description: `"${values.name}" has been updated in the showcase.`,
            });
        } else {
            await createMutation.mutateAsync(values);
            pushToast({
                variant: "success",
                title: "Project created",
                description: `"${values.name}" has been added to the showcase.`,
            });
        }
        closeDrawer();
    };

    const handleConfirmDelete = async () => {
        if (!pendingDelete) return;
        const snapshot = pendingDelete;
        setPendingDelete(null);
        await deleteMutation.mutateAsync(snapshot.id);
        pushToast({
            variant: "info",
            title: "Project removed",
            description: `"${snapshot.name}" was removed from the showcase.`,
            undoLabel: "Undo Delete",
            onUndo: async () => {
                await restoreMutation.mutateAsync(snapshot);
                pushToast({
                    variant: "success",
                    title: "Project restored",
                    description: `"${snapshot.name}" has been restored.`,
                });
            },
        });
    };

    const filteredProjects = useMemo(() => {
        const list = projects.filter((p) => {
            if (categoryFilter !== "all" && p.category !== categoryFilter) {
                return false;
            }
            if (urlQuery.trim()) {
                const q = urlQuery.toLowerCase();
                const text = `${p.name} ${p.description} ${p.category} ${p.tags.join(" ")}`.toLowerCase();
                if (!text.includes(q)) return false;
            }
            return true;
        });

        return [...list].sort((a, b) => {
            if (sortOrder === "year-asc") return a.year - b.year;
            if (sortOrder === "name-asc") return a.name.localeCompare(b.name);
            return b.year - a.year;
        });
    }, [projects, categoryFilter, urlQuery, sortOrder]);

    if (isLoading) {
        return <RouteSkeleton rows={4}/>;
    }

    const totalItems = filteredProjects.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSizeParam));
    const safePage = Math.min(Math.max(1, pageParam), totalPages);
    const pagedProjects = filteredProjects.slice(
        (safePage - 1) * pageSizeParam,
        safePage * pageSizeParam
    );

    const isSaving = createMutation.isPending || updateMutation.isPending;

    return (
        <div data-testid="projects-route" className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                        Projects &amp; Engineering Explorer
                    </h1>
                    <p
                        style={{color: "var(--text-secondary)"}}
                        className="text-sm mt-1"
                    >
                        Filterable catalog of production platforms, compilers, algorithms, and AI/ML pipelines
                    </p>
                </div>

                <button
                    type="button"
                    data-testid="toggle-project-form"
                    onClick={() => {
                        if (isFormOpen) closeDrawer();
                        else openCreateDrawer();
                    }}
                    className="btn-primary text-sm inline-flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" aria-hidden="true"/>
                    {isFormOpen ? "Close Project Form" : "New Project"}
                </button>
            </div>

            {isFormOpen && (
                <ProjectFormPanel
                    editingProject={editingProject}
                    isSaving={isSaving}
                    onClose={closeDrawer}
                    onSubmitForm={onSubmitForm}
                />
            )}

            <div className="grid gap-3 sm:grid-cols-3">
                {PROJECT_BANNERS.map((banner) => (
                    <div
                        key={banner.src}
                        className="surface-card overflow-hidden flex items-center gap-3 p-2"
                    >
                        <img
                            src={banner.src}
                            alt={banner.label}
                            width={120}
                            height={72}
                            className="w-24 h-16 object-cover rounded-lg shrink-0"
                        />
                        <span className="text-xs font-semibold leading-snug">
                            {banner.label}
                        </span>
                    </div>
                ))}
            </div>

            <div className="surface-card p-4 flex flex-wrap items-center justify-between gap-3">
                <div className="relative flex-1 min-w-[220px]">
                    <Search
                        style={{color: "var(--text-muted)"}}
                        className="w-4 h-4 absolute start-3 top-1/2 -translate-y-1/2 pointer-events-none"
                        aria-hidden="true"
                    />
                    <input
                        type="search"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Search by project name, technology tag, or keyword..."
                        aria-label="Search projects"
                        data-testid="projects-search-input"
                        className="input-control input-control-search text-sm"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <select
                        aria-label="Filter by category"
                        data-testid="projects-category-select"
                        value={categoryFilter}
                        onChange={(e) =>
                            updateParam("category", e.target.value)
                        }
                        className="input-control w-auto text-xs py-2"
                    >
                        <option value="all">All Categories</option>
                        {PROJECT_CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>

                    <select
                        aria-label="Sort projects"
                        data-testid="projects-sort-select"
                        value={sortOrder}
                        onChange={(e) => updateParam("sort", e.target.value)}
                        className="input-control w-auto text-xs py-2"
                    >
                        <option value="year-desc">Newest First</option>
                        <option value="year-asc">Oldest First</option>
                        <option value="name-asc">Name (A–Z)</option>
                    </select>

                    {(categoryFilter !== "all" || urlQuery) && (
                        <button
                            type="button"
                            data-testid="projects-clear-filters"
                            onClick={clearFilters}
                            className="btn-secondary text-xs inline-flex items-center gap-1"
                        >
                            <X className="w-3.5 h-3.5" aria-hidden="true"/>
                            Clear Filters
                        </button>
                    )}
                </div>
            </div>

            {projects.length === 0 ? (
                <ContextualEmptyState
                    kind="no-records"
                    title="No projects in showcase yet"
                    description="Get started by adding your first engineering project to the portfolio catalog."
                    actionLabel="Create First Project"
                    onAction={openCreateDrawer}
                />
            ) : filteredProjects.length === 0 ? (
                <ContextualEmptyState
                    kind="no-matches"
                    title="No projects matching current filter"
                    description="No projects matched your search query or category selection."
                    actionLabel="Clear Filters"
                    onAction={clearFilters}
                />
            ) : (
                <div className="space-y-3">
                    <div
                        data-testid="projects-table-container"
                        className="bounded-table-container"
                    >
                        <table className="w-full text-sm border-collapse">
                            <thead>
                                <tr>
                                    <th className="py-3 px-4 font-semibold text-xs uppercase tracking-wider">
                                        Project &amp; Summary
                                    </th>
                                    <th className="py-3 px-4 font-semibold text-xs uppercase tracking-wider">
                                        Category
                                    </th>
                                    <th className="py-3 px-4 font-semibold text-xs uppercase tracking-wider">
                                        Stack Tags
                                    </th>
                                    <th className="py-3 px-4 font-semibold text-xs uppercase tracking-wider">
                                        Year
                                    </th>
                                    <th className="py-3 px-4 font-semibold text-xs uppercase tracking-wider text-end">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {pagedProjects.map((project) => (
                                    <tr
                                        key={project.id}
                                        data-testid={`project-row-${project.id}`}
                                        style={{
                                            borderColor: "var(--border-subtle)",
                                        }}
                                        className="border-b align-top"
                                    >
                                        <td className="py-3.5 px-4 max-w-md">
                                            <div className="font-semibold">
                                                {project.name}
                                            </div>
                                            <p
                                                style={{
                                                    color: "var(--text-secondary)",
                                                }}
                                                className="text-xs mt-1 leading-relaxed"
                                            >
                                                {project.description}
                                            </p>
                                        </td>
                                        <td className="py-3.5 px-4 whitespace-nowrap">
                                            <span className="badge-accent">
                                                {project.category}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-4">
                                            <div className="flex flex-wrap gap-1">
                                                {project.tags.map((t) => (
                                                    <span
                                                        key={t}
                                                        className="surface-elevated px-2 py-0.5 text-xs"
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="py-3.5 px-4 tabular-nums whitespace-nowrap text-xs">
                                            {project.year}
                                        </td>
                                        <td className="py-3.5 px-4 whitespace-nowrap text-end">
                                            <div className="inline-flex items-center gap-1.5">
                                                <a
                                                    href={project.web_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label={`Open ${project.name} repository`}
                                                    className="btn-secondary p-1.5"
                                                >
                                                    <ExternalLink
                                                        className="w-3.5 h-3.5"
                                                        aria-hidden="true"
                                                    />
                                                </a>
                                                <button
                                                    type="button"
                                                    aria-label={`Edit ${project.name}`}
                                                    data-testid={`edit-project-${project.id}`}
                                                    onClick={() =>
                                                        openEditDrawer(project)
                                                    }
                                                    className="btn-secondary p-1.5"
                                                >
                                                    <Edit3
                                                        className="w-3.5 h-3.5"
                                                        aria-hidden="true"
                                                    />
                                                </button>
                                                <button
                                                    type="button"
                                                    aria-label={`Delete ${project.name}`}
                                                    data-testid={`delete-project-${project.id}`}
                                                    onClick={() =>
                                                        setPendingDelete(
                                                            project
                                                        )
                                                    }
                                                    className="btn-secondary p-1.5"
                                                    style={{
                                                        color: "var(--status-danger)",
                                                    }}
                                                >
                                                    <Trash2
                                                        className="w-3.5 h-3.5"
                                                        aria-hidden="true"
                                                    />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <PaginationControls
                        totalItems={totalItems}
                        page={safePage}
                        pageSize={pageSizeParam}
                        onPageChange={(nextPage) =>
                            updateParam("page", String(nextPage))
                        }
                        onPageSizeChange={(nextSize) => {
                            const next = new URLSearchParams(searchParams);
                            next.set("pageSize", String(nextSize));
                            next.set("page", "1");
                            setSearchParams(next);
                        }}
                        itemLabel="projects"
                    />
                </div>
            )}

            <ConfirmDialog
                open={Boolean(pendingDelete)}
                title="Remove Project from Showcase?"
                description="This project will be removed from your active portfolio catalog. You can undo this action immediately from the notification toast."
                itemSummary={
                    pendingDelete
                        ? `${pendingDelete.name} (${pendingDelete.category} · ${pendingDelete.year})`
                        : undefined
                }
                confirmLabel="Delete Project"
                cancelLabel="Cancel"
                variant="danger"
                isPending={deleteMutation.isPending}
                onConfirm={handleConfirmDelete}
                onCancel={() => setPendingDelete(null)}
            />
        </div>
    );
}
