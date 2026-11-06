"use client";

import React, {useEffect, useId, useRef} from "react";
import {AlertTriangle} from "lucide-react";

export interface ConfirmDialogProps {
    open: boolean;
    title: string;
    description: string;
    itemSummary?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: "danger" | "warning" | "primary";
    isPending?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export function ConfirmDialog({
    open,
    title,
    description,
    itemSummary,
    confirmLabel = "Confirm Delete",
    cancelLabel = "Cancel",
    variant = "danger",
    isPending = false,
    onConfirm,
    onCancel,
}: ConfirmDialogProps) {
    const titleId = useId();
    const descId = useId();
    const confirmBtnRef = useRef<HTMLButtonElement>(null);
    const cancelBtnRef = useRef<HTMLButtonElement>(null);
    const previousFocusRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (open) {
            previousFocusRef.current = document.activeElement as HTMLElement | null;
            const raf = requestAnimationFrame(() => {
                confirmBtnRef.current?.focus();
            });
            return () => cancelAnimationFrame(raf);
        } else if (previousFocusRef.current) {
            previousFocusRef.current.focus();
            previousFocusRef.current = null;
        }
    }, [open]);

    useEffect(() => {
        if (!open) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                e.preventDefault();
                onCancel();
                return;
            }
            if (e.key === "Tab") {
                const focusables = [
                    cancelBtnRef.current,
                    confirmBtnRef.current,
                ].filter(Boolean) as HTMLElement[];
                if (focusables.length < 2) return;
                const first = focusables[0];
                const last = focusables[focusables.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [open, onCancel]);

    if (!open) return null;

    const confirmBtnClass =
        variant === "danger"
            ? "btn-danger"
            : variant === "warning"
              ? "btn-primary"
              : "btn-primary";

    return (
        <div
            data-testid="confirm-dialog-backdrop"
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    onCancel();
                }
            }}
            style={{backgroundColor: "hsl(222 47% 4% / 0.72)"}}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm no-print"
        >
            <div
                role="alertdialog"
                aria-modal="true"
                aria-labelledby={titleId}
                aria-describedby={descId}
                data-testid="confirm-dialog"
                className="surface-card w-full max-w-md p-6 space-y-4"
            >
                <div className="flex items-start gap-3">
                    <span
                        style={{
                            backgroundColor: "var(--status-danger-bg)",
                            color: "var(--status-danger)",
                        }}
                        className="p-2.5 rounded-lg shrink-0"
                    >
                        <AlertTriangle className="w-5 h-5" aria-hidden="true"/>
                    </span>
                    <div className="space-y-1.5">
                        <h2 id={titleId} className="text-lg font-semibold">
                            {title}
                        </h2>
                        <p
                            id={descId}
                            style={{color: "var(--text-secondary)"}}
                            className="text-sm leading-relaxed"
                        >
                            {description}
                        </p>
                    </div>
                </div>

                {itemSummary && (
                    <div
                        data-testid="confirm-dialog-summary"
                        className="surface-elevated p-3 text-xs font-mono break-words"
                    >
                        {itemSummary}
                    </div>
                )}

                <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                        ref={cancelBtnRef}
                        type="button"
                        data-testid="confirm-dialog-cancel"
                        onClick={onCancel}
                        disabled={isPending}
                        className="btn-secondary text-sm"
                    >
                        {cancelLabel}
                    </button>
                    <button
                        ref={confirmBtnRef}
                        type="button"
                        data-testid="confirm-dialog-confirm"
                        onClick={onConfirm}
                        disabled={isPending}
                        className={`${confirmBtnClass} text-sm`}
                    >
                        {isPending ? "Processing..." : confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}
