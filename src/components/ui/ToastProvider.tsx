"use client";

import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import {
    AlertCircle,
    AlertTriangle,
    CheckCircle2,
    Info,
    RotateCcw,
    X,
} from "lucide-react";

export type ToastVariant = "success" | "error" | "warning" | "info";

export interface ToastInput {
    title: string;
    description?: string;
    variant?: ToastVariant;
    durationMs?: number;
    undoLabel?: string;
    onUndo?: () => void | Promise<void>;
}

export interface ToastRecord extends ToastInput {
    id: string;
    variant: ToastVariant;
}

interface ToastContextValue {
    toasts: ToastRecord[];
    pushToast: (toast: ToastInput) => string;
    dismissToast: (id: string) => void;
    clearToasts: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
    const ctx = useContext(ToastContext);
    if (!ctx) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return ctx;
}

const VARIANT_STYLES: Record<
    ToastVariant,
    { borderVar: string; bgVar: string; icon: React.ReactNode }
> = {
    success: {
        borderVar: "var(--status-success)",
        bgVar: "var(--status-success-bg)",
        icon: <CheckCircle2 className="w-5 h-5 shrink-0" aria-hidden="true"/>,
    },
    error: {
        borderVar: "var(--status-danger)",
        bgVar: "var(--status-danger-bg)",
        icon: <AlertCircle className="w-5 h-5 shrink-0" aria-hidden="true"/>,
    },
    warning: {
        borderVar: "var(--status-warning)",
        bgVar: "var(--status-warning-bg)",
        icon: <AlertTriangle className="w-5 h-5 shrink-0" aria-hidden="true"/>,
    },
    info: {
        borderVar: "var(--status-info)",
        bgVar: "var(--status-info-bg)",
        icon: <Info className="w-5 h-5 shrink-0" aria-hidden="true"/>,
    },
};

export function ToastProvider({
    children,
    defaultDurationMs = 6000,
}: {
    children: React.ReactNode;
    defaultDurationMs?: number;
}) {
    const [toasts, setToasts] = useState<ToastRecord[]>([]);
    const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(
        new Map()
    );

    const dismissToast = useCallback((id: string) => {
        const timer = timersRef.current.get(id);
        if (timer) {
            clearTimeout(timer);
            timersRef.current.delete(id);
        }
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const clearToasts = useCallback(() => {
        timersRef.current.forEach((timer) => clearTimeout(timer));
        timersRef.current.clear();
        setToasts([]);
    }, []);

    const pushToast = useCallback(
        (input: ToastInput): string => {
            const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
            const record: ToastRecord = {
                ...input,
                id,
                variant: input.variant ?? "info",
            };
            setToasts((prev) => [record, ...prev].slice(0, 5));

            const duration = input.durationMs ?? defaultDurationMs;
            if (duration > 0) {
                const timer = setTimeout(() => {
                    dismissToast(id);
                }, duration);
                timersRef.current.set(id, timer);
            }
            return id;
        },
        [defaultDurationMs, dismissToast]
    );

    useEffect(() => {
        const currentTimers = timersRef.current;
        return () => {
            currentTimers.forEach((timer) => clearTimeout(timer));
            currentTimers.clear();
        };
    }, []);

    return (
        <ToastContext.Provider
            value={{toasts, pushToast, dismissToast, clearToasts}}
        >
            {children}
            <div
                aria-label="Notifications"
                data-testid="toast-region"
                className="fixed bottom-4 end-4 z-50 flex flex-col gap-2.5 max-w-md w-[calc(100vw-2rem)] pointer-events-none no-print"
            >
                {toasts.map((toast) => {
                    const styleMeta = VARIANT_STYLES[toast.variant];
                    return (
                        <div
                            key={toast.id}
                            role="status"
                            aria-live="polite"
                            aria-atomic="true"
                            data-testid={`toast-item-${toast.variant}`}
                            style={{
                                backgroundColor: "var(--bg-elevated)",
                                borderColor: styleMeta.borderVar,
                            }}
                            className="pointer-events-auto rounded-xl border-s-4 border p-4 shadow-lg flex items-start gap-3 transition-all"
                        >
                            <span
                                style={{color: styleMeta.borderVar}}
                                className="mt-0.5"
                            >
                                {styleMeta.icon}
                            </span>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold">
                                    {toast.title}
                                </p>
                                {toast.description && (
                                    <p
                                        style={{color: "var(--text-secondary)"}}
                                        className="text-xs mt-1 leading-relaxed"
                                    >
                                        {toast.description}
                                    </p>
                                )}
                                {toast.onUndo && (
                                    <div className="mt-2.5">
                                        <button
                                            type="button"
                                            data-testid="toast-undo-button"
                                            onClick={async () => {
                                                const fn = toast.onUndo;
                                                dismissToast(toast.id);
                                                if (fn) {
                                                    await fn();
                                                }
                                            }}
                                            className="btn-secondary inline-flex items-center gap-1.5 text-xs py-1 px-2.5"
                                        >
                                            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true"/>
                                            {toast.undoLabel ?? "Undo"}
                                        </button>
                                    </div>
                                )}
                            </div>
                            <button
                                type="button"
                                aria-label="Dismiss notification"
                                data-testid="toast-dismiss-button"
                                onClick={() => dismissToast(toast.id)}
                                style={{color: "var(--text-muted)"}}
                                className="p-1 rounded hover:opacity-80"
                            >
                                <X className="w-4 h-4" aria-hidden="true"/>
                            </button>
                        </div>
                    );
                })}
            </div>
        </ToastContext.Provider>
    );
}
