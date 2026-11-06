"use client";

import React, {useState} from "react";
import {
    Download,
    GitBranch,
    Github,
    Linkedin,
    Mail,
    Phone,
    Trash2,
} from "lucide-react";
import type {ContactInquiry} from "@/domain/models";
import type {ContactInquiryParsed} from "@/domain/schemas";
import {
    useCreateInquiryMutation,
    useDeleteInquiryMutation,
    useInquiriesQuery,
    useRestoreInquiryMutation,
} from "@/application/usePortfolioQueries";
import {useToast} from "@/components/ui/ToastProvider";
import {ConfirmDialog} from "@/components/ui/ConfirmDialog";
import {ContactInquiryForm} from "@/components/forms/ContactInquiryForm";

export default function ContactRoute() {
    const {data: inquiries = []} = useInquiriesQuery();
    const createMutation = useCreateInquiryMutation();
    const deleteMutation = useDeleteInquiryMutation();
    const restoreMutation = useRestoreInquiryMutation();
    const {pushToast} = useToast();

    const [pendingDelete, setPendingDelete] =
        useState<ContactInquiry | null>(null);

    const onSubmitInquiry = async (values: ContactInquiryParsed) => {
        await createMutation.mutateAsync(values);
        pushToast({
            variant: "success",
            title: "Inquiry sent",
            description: `Thank you, ${values.name}! Your inquiry "${values.subject}" has been logged.`,
        });
    };

    const handleConfirmDelete = async () => {
        if (!pendingDelete) return;
        const snapshot = pendingDelete;
        setPendingDelete(null);
        await deleteMutation.mutateAsync(snapshot.id);
        pushToast({
            variant: "info",
            title: "Inquiry removed",
            description: `Removed inquiry "${snapshot.subject}".`,
            undoLabel: "Undo",
            onUndo: async () => {
                await restoreMutation.mutateAsync(snapshot);
                pushToast({
                    variant: "success",
                    title: "Inquiry restored",
                    description: `Restored inquiry "${snapshot.subject}".`,
                });
            },
        });
    };

    return (
        <div data-testid="contact-route" className="space-y-8">
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                    Contact &amp; Direct Inquiries
                </h1>
                <p
                    style={{color: "var(--text-secondary)"}}
                    className="text-sm mt-1"
                >
                    Whether you want to collaborate on distributed systems, schedule an architecture review, or say hi—my inbox is open.
                </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-12 items-start">
                <div className="lg:col-span-5 surface-card p-6 space-y-5">
                    <h2 className="text-lg font-semibold">
                        Direct Communication Channels
                    </h2>

                    <div className="space-y-3">
                        <a
                            href="mailto:wilsonr100@gmail.com"
                            className="surface-elevated p-3.5 flex items-center gap-3 text-sm hover:opacity-90"
                        >
                            <Mail
                                style={{color: "var(--accent-primary)"}}
                                className="w-5 h-5 shrink-0"
                                aria-hidden="true"
                            />
                            <div>
                                <div className="font-medium">Email</div>
                                <div
                                    style={{color: "var(--text-secondary)"}}
                                    className="text-xs"
                                >
                                    wilsonr100@gmail.com
                                </div>
                            </div>
                        </a>

                        <a
                            href="tel:+971565712642"
                            className="surface-elevated p-3.5 flex items-center gap-3 text-sm tabular-nums hover:opacity-90"
                        >
                            <Phone
                                style={{color: "var(--accent-secondary)"}}
                                className="w-5 h-5 shrink-0"
                                aria-hidden="true"
                            />
                            <div>
                                <div className="font-medium">
                                    Phone / WhatsApp (Dubai, UAE)
                                </div>
                                <div
                                    style={{color: "var(--text-secondary)"}}
                                    className="text-xs"
                                >
                                    +971 565712642
                                </div>
                            </div>
                        </a>
                    </div>

                    <div
                        style={{borderColor: "var(--border-subtle)"}}
                        className="pt-4 border-t space-y-3"
                    >
                        <p
                            style={{color: "var(--text-muted)"}}
                            className="text-xs uppercase tracking-wider font-medium"
                        >
                            Profiles &amp; Curriculum Vitae
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <a
                                href="https://www.linkedin.com/in/wilsonr990/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn Profile"
                                className="btn-secondary text-xs inline-flex items-center gap-1.5"
                            >
                                <Linkedin className="w-4 h-4" aria-hidden="true"/>
                                LinkedIn
                            </a>
                            <a
                                href="https://gitlab.com/wilsonr990"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitLab Profile"
                                className="btn-secondary text-xs inline-flex items-center gap-1.5"
                            >
                                <GitBranch className="w-4 h-4" aria-hidden="true"/>
                                GitLab
                            </a>
                            <a
                                href="https://github.com/wilsonr990"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub Profile"
                                className="btn-secondary text-xs inline-flex items-center gap-1.5"
                            >
                                <Github className="w-4 h-4" aria-hidden="true"/>
                                GitHub
                            </a>
                            <a
                                href="/FinalResume.pdf"
                                download
                                aria-label="Download CV PDF"
                                className="btn-primary text-xs inline-flex items-center gap-1.5"
                            >
                                <Download className="w-4 h-4" aria-hidden="true"/>
                                Download CV
                            </a>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-7 surface-card p-6 space-y-4">
                    <h2 className="text-lg font-semibold">
                        Send a Structured Inquiry
                    </h2>
                    <ContactInquiryForm
                        isSaving={createMutation.isPending}
                        onSubmitInquiry={onSubmitInquiry}
                    />
                </div>
            </div>

            <section aria-labelledby="inquiries-log-heading" className="space-y-3">
                <h2 id="inquiries-log-heading" className="text-lg font-semibold">
                    Recent Inquiries Log ({inquiries.length})
                </h2>

                <div
                    data-testid="inquiries-table-container"
                    className="bounded-table-container"
                >
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr>
                                <th className="py-3 px-4 font-semibold text-xs uppercase tracking-wider">
                                    Sender
                                </th>
                                <th className="py-3 px-4 font-semibold text-xs uppercase tracking-wider">
                                    Subject &amp; Message
                                </th>
                                <th className="py-3 px-4 font-semibold text-xs uppercase tracking-wider">
                                    Category
                                </th>
                                <th className="py-3 px-4 font-semibold text-xs uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="py-3 px-4 font-semibold text-xs uppercase tracking-wider text-end">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {inquiries.map((inq) => (
                                <tr
                                    key={inq.id}
                                    data-testid={`inquiry-row-${inq.id}`}
                                    style={{borderColor: "var(--border-subtle)"}}
                                    className="border-b align-top"
                                >
                                    <td className="py-3 px-4 whitespace-nowrap">
                                        <div className="font-medium">
                                            {inq.name}
                                        </div>
                                        <div
                                            style={{color: "var(--text-muted)"}}
                                            className="text-xs"
                                        >
                                            {inq.email}
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 max-w-md">
                                        <div className="font-semibold">
                                            {inq.subject}
                                        </div>
                                        <p
                                            style={{
                                                color: "var(--text-secondary)",
                                            }}
                                            className="text-xs mt-0.5"
                                        >
                                            {inq.message}
                                        </p>
                                    </td>
                                    <td className="py-3 px-4 whitespace-nowrap">
                                        <span className="badge-accent">
                                            {inq.category}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 tabular-nums whitespace-nowrap text-xs">
                                        {inq.createdAt}
                                    </td>
                                    <td className="py-3 px-4 text-end">
                                        <button
                                            type="button"
                                            aria-label={`Delete inquiry ${inq.subject}`}
                                            data-testid={`delete-inquiry-${inq.id}`}
                                            onClick={() =>
                                                setPendingDelete(inq)
                                            }
                                            style={{color: "var(--status-danger)"}}
                                            className="btn-secondary p-1.5"
                                        >
                                            <Trash2
                                                className="w-3.5 h-3.5"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <ConfirmDialog
                open={Boolean(pendingDelete)}
                title="Delete Logged Inquiry?"
                description="This inquiry record will be removed from the log. You can restore it immediately using the Undo button in the notification toast."
                itemSummary={
                    pendingDelete
                        ? `${pendingDelete.subject} — from ${pendingDelete.name} (${pendingDelete.email})`
                        : undefined
                }
                confirmLabel="Delete Inquiry"
                cancelLabel="Cancel"
                variant="danger"
                isPending={deleteMutation.isPending}
                onConfirm={handleConfirmDelete}
                onCancel={() => setPendingDelete(null)}
            />
        </div>
    );
}
