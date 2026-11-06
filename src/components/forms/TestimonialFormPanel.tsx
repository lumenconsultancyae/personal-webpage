"use client";

import React from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {X} from "lucide-react";
import {
    testimonialFormSchema,
    type TestimonialFormParsed,
    type TestimonialFormValues,
} from "@/domain/schemas";

export interface TestimonialFormPanelProps {
    isSaving: boolean;
    onClose: () => void;
    onSubmitForm: (values: TestimonialFormParsed) => Promise<void>;
}

export function TestimonialFormPanel({
    isSaving,
    onClose,
    onSubmitForm,
}: TestimonialFormPanelProps) {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<TestimonialFormValues, unknown, TestimonialFormParsed>({
        resolver: zodResolver(testimonialFormSchema),
        mode: "onTouched",
        reValidateMode: "onChange",
        shouldFocusError: true,
        defaultValues: {
            author: "",
            role: "",
            company: "",
            linkedin: "",
            text: "",
        },
    });

    return (
        <div
            data-testid="testimonial-form-panel"
            className="surface-card p-6 space-y-4"
        >
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                    Submit Peer Endorsement
                </h2>
                <button
                    type="button"
                    aria-label="Close endorsement form"
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
                        htmlFor="test-author"
                        className="block text-xs font-medium"
                    >
                        Full Name *
                    </label>
                    <input
                        id="test-author"
                        type="text"
                        data-testid="testimonial-input-author"
                        aria-invalid={Boolean(errors.author)}
                        aria-describedby={
                            errors.author ? "test-author-err" : undefined
                        }
                        {...register("author")}
                        className="input-control text-sm"
                    />
                    {errors.author && (
                        <p
                            id="test-author-err"
                            role="alert"
                            style={{color: "var(--status-danger)"}}
                            className="text-xs"
                        >
                            {errors.author.message}
                        </p>
                    )}
                </div>

                <div className="space-y-1">
                    <label
                        htmlFor="test-role"
                        className="block text-xs font-medium"
                    >
                        Role Title *
                    </label>
                    <input
                        id="test-role"
                        type="text"
                        data-testid="testimonial-input-role"
                        aria-invalid={Boolean(errors.role)}
                        aria-describedby={
                            errors.role ? "test-role-err" : undefined
                        }
                        {...register("role")}
                        className="input-control text-sm"
                    />
                    {errors.role && (
                        <p
                            id="test-role-err"
                            role="alert"
                            style={{color: "var(--status-danger)"}}
                            className="text-xs"
                        >
                            {errors.role.message}
                        </p>
                    )}
                </div>

                <div className="space-y-1">
                    <label
                        htmlFor="test-company"
                        className="block text-xs font-medium"
                    >
                        Company *
                    </label>
                    <input
                        id="test-company"
                        type="text"
                        data-testid="testimonial-input-company"
                        aria-invalid={Boolean(errors.company)}
                        aria-describedby={
                            errors.company ? "test-company-err" : undefined
                        }
                        {...register("company")}
                        className="input-control text-sm"
                    />
                    {errors.company && (
                        <p
                            id="test-company-err"
                            role="alert"
                            style={{color: "var(--status-danger)"}}
                            className="text-xs"
                        >
                            {errors.company.message}
                        </p>
                    )}
                </div>

                <div className="space-y-1">
                    <label
                        htmlFor="test-linkedin"
                        className="block text-xs font-medium"
                    >
                        LinkedIn URL *
                    </label>
                    <input
                        id="test-linkedin"
                        type="url"
                        data-testid="testimonial-input-linkedin"
                        aria-invalid={Boolean(errors.linkedin)}
                        aria-describedby={
                            errors.linkedin ? "test-linkedin-err" : undefined
                        }
                        {...register("linkedin")}
                        className="input-control text-sm"
                        placeholder="https://www.linkedin.com/in/..."
                    />
                    {errors.linkedin && (
                        <p
                            id="test-linkedin-err"
                            role="alert"
                            style={{color: "var(--status-danger)"}}
                            className="text-xs"
                        >
                            {errors.linkedin.message}
                        </p>
                    )}
                </div>

                <div className="sm:col-span-2 space-y-1">
                    <label
                        htmlFor="test-text"
                        className="block text-xs font-medium"
                    >
                        Endorsement Message *
                    </label>
                    <textarea
                        id="test-text"
                        rows={3}
                        data-testid="testimonial-input-text"
                        aria-invalid={Boolean(errors.text)}
                        aria-describedby={
                            errors.text ? "test-text-err" : undefined
                        }
                        {...register("text")}
                        className="input-control text-sm"
                    />
                    {errors.text && (
                        <p
                            id="test-text-err"
                            role="alert"
                            style={{color: "var(--status-danger)"}}
                            className="text-xs"
                        >
                            {errors.text.message}
                        </p>
                    )}
                </div>

                <div className="sm:col-span-2 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="btn-secondary text-sm"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        data-testid="testimonial-submit-button"
                        disabled={isSaving}
                        className="btn-primary text-sm"
                    >
                        {isSaving ? "Publishing..." : "Publish Endorsement"}
                    </button>
                </div>
            </form>
        </div>
    );
}
