"use client";

import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {X} from "lucide-react";
import type {ProjectItem} from "@/domain/models";
import {
    PROJECT_CATEGORIES,
    projectFormSchema,
    type ProjectFormParsed,
    type ProjectFormValues,
} from "@/domain/schemas";

export interface ProjectFormPanelProps {
    editingProject: ProjectItem | null;
    isSaving: boolean;
    onClose: () => void;
    onSubmitForm: (values: ProjectFormParsed) => Promise<void>;
}

export function ProjectFormPanel({
    editingProject,
    isSaving,
    onClose,
    onSubmitForm,
}: ProjectFormPanelProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<ProjectFormValues, unknown, ProjectFormParsed>({
        resolver: zodResolver(projectFormSchema),
        mode: "onTouched",
        reValidateMode: "onChange",
        shouldFocusError: true,
        defaultValues: {
            name: editingProject?.name ?? "",
            category: editingProject?.category ?? "Platform",
            description: editingProject?.description ?? "",
            web_url: editingProject?.web_url ?? "",
            homepage: editingProject?.homepage ?? "",
            tagsInput: editingProject ? editingProject.tags.join(", ") : "",
            year: editingProject?.year ?? 2026,
        },
    });

    useEffect(() => {
        reset({
            name: editingProject?.name ?? "",
            category: editingProject?.category ?? "Platform",
            description: editingProject?.description ?? "",
            web_url: editingProject?.web_url ?? "",
            homepage: editingProject?.homepage ?? "",
            tagsInput: editingProject ? editingProject.tags.join(", ") : "",
            year: editingProject?.year ?? 2026,
        });
    }, [editingProject, reset]);

    return (
        <section
            aria-label={
                editingProject ? "Edit project form" : "Create project form"
            }
            data-testid="project-form-panel"
            className="surface-card p-6 space-y-4"
        >
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                    {editingProject
                        ? `Edit Project: ${editingProject.name}`
                        : "Add New Project to Showcase"}
                </h2>
                <button
                    type="button"
                    aria-label="Close form"
                    onClick={onClose}
                    className="btn-secondary p-1.5"
                >
                    <X className="w-4 h-4" aria-hidden="true"/>
                </button>
            </div>

            <form
                noValidate
                onSubmit={handleSubmit(onSubmitForm)}
                className="grid gap-4 sm:grid-cols-2"
            >
                <div className="space-y-1">
                    <label
                        htmlFor="proj-name"
                        className="block text-xs font-medium"
                    >
                        Project Name *
                    </label>
                    <input
                        id="proj-name"
                        type="text"
                        data-testid="project-input-name"
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={
                            errors.name ? "proj-name-error" : undefined
                        }
                        {...register("name")}
                        className="input-control text-sm"
                        placeholder="e.g., Reactive Event Mesh"
                    />
                    {errors.name && (
                        <p
                            id="proj-name-error"
                            role="alert"
                            data-testid="project-error-name"
                            style={{color: "var(--status-danger)"}}
                            className="text-xs"
                        >
                            {errors.name.message}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                        <label
                            htmlFor="proj-category"
                            className="block text-xs font-medium"
                        >
                            Category *
                        </label>
                        <select
                            id="proj-category"
                            data-testid="project-input-category"
                            aria-invalid={Boolean(errors.category)}
                            {...register("category")}
                            className="input-control text-sm"
                        >
                            {PROJECT_CATEGORIES.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-1">
                        <label
                            htmlFor="proj-year"
                            className="block text-xs font-medium"
                        >
                            Year *
                        </label>
                        <input
                            id="proj-year"
                            type="number"
                            data-testid="project-input-year"
                            aria-invalid={Boolean(errors.year)}
                            aria-describedby={
                                errors.year ? "proj-year-error" : undefined
                            }
                            {...register("year")}
                            className="input-control text-sm tabular-nums"
                        />
                        {errors.year && (
                            <p
                                id="proj-year-error"
                                role="alert"
                                data-testid="project-error-year"
                                style={{color: "var(--status-danger)"}}
                                className="text-xs"
                            >
                                {errors.year.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className="space-y-1">
                    <label
                        htmlFor="proj-url"
                        className="block text-xs font-medium"
                    >
                        Repository / Live URL *
                    </label>
                    <input
                        id="proj-url"
                        type="url"
                        data-testid="project-input-url"
                        aria-invalid={Boolean(errors.web_url)}
                        aria-describedby={
                            errors.web_url ? "proj-url-error" : undefined
                        }
                        {...register("web_url")}
                        className="input-control text-sm"
                        placeholder="https://github.com/..."
                    />
                    {errors.web_url && (
                        <p
                            id="proj-url-error"
                            role="alert"
                            data-testid="project-error-url"
                            style={{color: "var(--status-danger)"}}
                            className="text-xs"
                        >
                            {errors.web_url.message}
                        </p>
                    )}
                </div>

                <div className="space-y-1">
                    <label
                        htmlFor="proj-tags"
                        className="block text-xs font-medium"
                    >
                        Technologies (comma-separated) *
                    </label>
                    <input
                        id="proj-tags"
                        type="text"
                        data-testid="project-input-tags"
                        aria-invalid={Boolean(errors.tagsInput)}
                        aria-describedby={
                            errors.tagsInput ? "proj-tags-error" : undefined
                        }
                        {...register("tagsInput")}
                        className="input-control text-sm"
                        placeholder="Kotlin, Spring Boot, Kafka"
                    />
                    {errors.tagsInput && (
                        <p
                            id="proj-tags-error"
                            role="alert"
                            data-testid="project-error-tags"
                            style={{color: "var(--status-danger)"}}
                            className="text-xs"
                        >
                            {errors.tagsInput.message}
                        </p>
                    )}
                </div>

                <div className="sm:col-span-2 space-y-1">
                    <label
                        htmlFor="proj-desc"
                        className="block text-xs font-medium"
                    >
                        Architecture &amp; Impact Description *
                    </label>
                    <textarea
                        id="proj-desc"
                        rows={3}
                        data-testid="project-input-description"
                        aria-invalid={Boolean(errors.description)}
                        aria-describedby={
                            errors.description ? "proj-desc-error" : undefined
                        }
                        {...register("description")}
                        className="input-control text-sm"
                        placeholder="Describe the architecture, technologies, and measurable engineering outcome..."
                    />
                    {errors.description && (
                        <p
                            id="proj-desc-error"
                            role="alert"
                            data-testid="project-error-description"
                            style={{color: "var(--status-danger)"}}
                            className="text-xs"
                        >
                            {errors.description.message}
                        </p>
                    )}
                </div>

                <div className="sm:col-span-2 flex items-center justify-end gap-3 pt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="btn-secondary text-sm"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        data-testid="project-submit-button"
                        disabled={isSaving}
                        className="btn-primary text-sm"
                    >
                        {isSaving
                            ? "Saving..."
                            : editingProject
                              ? "Save Changes"
                              : "Create Project"}
                    </button>
                </div>
            </form>
        </section>
    );
}
