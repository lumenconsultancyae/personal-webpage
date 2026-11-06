"use client";

import React from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Send} from "lucide-react";
import {
    contactInquirySchema,
    INQUIRY_CATEGORIES,
    type ContactInquiryFormValues,
    type ContactInquiryParsed,
} from "@/domain/schemas";

export interface ContactInquiryFormProps {
    isSaving: boolean;
    onSubmitInquiry: (values: ContactInquiryParsed) => Promise<void>;
}

export function ContactInquiryForm({
    isSaving,
    onSubmitInquiry,
}: ContactInquiryFormProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<ContactInquiryFormValues, unknown, ContactInquiryParsed>({
        resolver: zodResolver(contactInquirySchema),
        mode: "onTouched",
        reValidateMode: "onChange",
        shouldFocusError: true,
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            category: "Consulting",
            message: "",
        },
    });

    const onSubmit = async (values: ContactInquiryParsed) => {
        await onSubmitInquiry(values);
        reset();
    };

    return (
        <form
            noValidate
            data-testid="contact-inquiry-form"
            onSubmit={handleSubmit(onSubmit)}
            className="grid gap-4 sm:grid-cols-2"
        >
            <div className="space-y-1">
                <label htmlFor="inq-name" className="block text-xs font-medium">
                    Your Name *
                </label>
                <input
                    id="inq-name"
                    type="text"
                    data-testid="contact-input-name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "inq-name-error" : undefined}
                    {...register("name")}
                    className="input-control text-sm"
                    placeholder="Jane Doe"
                />
                {errors.name && (
                    <p
                        id="inq-name-error"
                        role="alert"
                        data-testid="contact-error-name"
                        style={{color: "var(--status-danger)"}}
                        className="text-xs"
                    >
                        {errors.name.message}
                    </p>
                )}
            </div>

            <div className="space-y-1">
                <label
                    htmlFor="inq-email"
                    className="block text-xs font-medium"
                >
                    Email Address *
                </label>
                <input
                    id="inq-email"
                    type="email"
                    data-testid="contact-input-email"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={
                        errors.email ? "inq-email-error" : undefined
                    }
                    {...register("email")}
                    className="input-control text-sm"
                    placeholder="jane@company.com"
                />
                {errors.email && (
                    <p
                        id="inq-email-error"
                        role="alert"
                        data-testid="contact-error-email"
                        style={{color: "var(--status-danger)"}}
                        className="text-xs"
                    >
                        {errors.email.message}
                    </p>
                )}
            </div>

            <div className="space-y-1">
                <label
                    htmlFor="inq-subject"
                    className="block text-xs font-medium"
                >
                    Subject *
                </label>
                <input
                    id="inq-subject"
                    type="text"
                    data-testid="contact-input-subject"
                    aria-invalid={Boolean(errors.subject)}
                    aria-describedby={
                        errors.subject ? "inq-subject-error" : undefined
                    }
                    {...register("subject")}
                    className="input-control text-sm"
                    placeholder="Distributed Systems Architecture"
                />
                {errors.subject && (
                    <p
                        id="inq-subject-error"
                        role="alert"
                        data-testid="contact-error-subject"
                        style={{color: "var(--status-danger)"}}
                        className="text-xs"
                    >
                        {errors.subject.message}
                    </p>
                )}
            </div>

            <div className="space-y-1">
                <label
                    htmlFor="inq-category"
                    className="block text-xs font-medium"
                >
                    Category *
                </label>
                <select
                    id="inq-category"
                    data-testid="contact-input-category"
                    aria-invalid={Boolean(errors.category)}
                    {...register("category")}
                    className="input-control text-sm"
                >
                    {INQUIRY_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </div>

            <div className="sm:col-span-2 space-y-1">
                <label
                    htmlFor="inq-message"
                    className="block text-xs font-medium"
                >
                    Message *
                </label>
                <textarea
                    id="inq-message"
                    rows={4}
                    data-testid="contact-input-message"
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                        errors.message ? "inq-message-error" : undefined
                    }
                    {...register("message")}
                    className="input-control text-sm"
                    placeholder="Share context about your team, timeline, or engineering goals..."
                />
                {errors.message && (
                    <p
                        id="inq-message-error"
                        role="alert"
                        data-testid="contact-error-message"
                        style={{color: "var(--status-danger)"}}
                        className="text-xs"
                    >
                        {errors.message.message}
                    </p>
                )}
            </div>

            <div className="sm:col-span-2 flex justify-end">
                <button
                    type="submit"
                    data-testid="contact-submit-button"
                    disabled={isSaving}
                    className="btn-primary text-sm inline-flex items-center gap-2"
                >
                    <Send className="w-4 h-4" aria-hidden="true"/>
                    {isSaving ? "Sending..." : "Send Inquiry"}
                </button>
            </div>
        </form>
    );
}
