"use client";

import React, {Component} from "react";
import {AlertOctagon, FolderOpen, Plus, RotateCw, SearchX} from "lucide-react";

interface ErrorBoundaryProps {
    children: React.ReactNode;
    onReset?: () => void;
    fallbackTitle?: string;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

export class RouteErrorBoundary extends Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {hasError: false, error: null};
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return {hasError: true, error};
    }

    handleRetry = () => {
        this.setState({hasError: false, error: null});
        if (this.props.onReset) {
            this.props.onReset();
        }
    };

    render() {
        if (this.state.hasError) {
            return (
                <div
                    role="alert"
                    data-testid="error-boundary-fallback"
                    className="surface-card max-w-xl mx-auto my-8 p-6 text-center space-y-4"
                >
                    <div className="inline-flex p-3 rounded-full" style={{backgroundColor: "var(--status-danger-bg)", color: "var(--status-danger)"}}>
                        <AlertOctagon className="w-7 h-7" aria-hidden="true"/>
                    </div>
                    <h2 className="text-xl font-semibold">
                        {this.props.fallbackTitle ?? "Unable to load this view"}
                    </h2>
                    <p
                        style={{color: "var(--text-secondary)"}}
                        className="text-sm"
                    >
                        {this.state.error?.message ??
                            "An unexpected error occurred while rendering this section."}
                    </p>
                    <div>
                        <button
                            type="button"
                            data-testid="error-boundary-retry"
                            onClick={this.handleRetry}
                            className="btn-primary inline-flex items-center gap-2 text-sm"
                        >
                            <RotateCw className="w-4 h-4" aria-hidden="true"/>
                            Retry
                        </button>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}

export function RouteSkeleton({rows = 4}: { rows?: number }) {
    return (
        <div
            role="status"
            aria-label="Loading content"
            data-testid="route-skeleton"
            className="space-y-4 py-4 animate-pulse"
        >
            <div className="surface-elevated h-10 w-64 rounded-lg"/>
            <div className="grid gap-4 md:grid-cols-3">
                {Array.from({length: rows}).map((_, idx) => (
                    <div
                        key={idx}
                        className="surface-card h-36 p-5 flex flex-col justify-between"
                    >
                        <div className="surface-elevated h-5 w-3/4 rounded"/>
                        <div className="surface-elevated h-4 w-full rounded"/>
                        <div className="surface-elevated h-4 w-1/2 rounded"/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export interface EmptyStateProps {
    kind: "no-records" | "no-matches";
    title: string;
    description: string;
    actionLabel: string;
    onAction: () => void;
}

export function ContextualEmptyState({
    kind,
    title,
    description,
    actionLabel,
    onAction,
}: EmptyStateProps) {
    return (
        <div
            data-testid={`empty-state-${kind}`}
            className="surface-card p-8 text-center space-y-4 my-4"
        >
            <div
                style={{
                    backgroundColor: "var(--accent-subtle)",
                    color: "var(--accent-primary)",
                }}
                className="inline-flex p-3 rounded-full"
            >
                {kind === "no-records" ? (
                    <FolderOpen className="w-6 h-6" aria-hidden="true"/>
                ) : (
                    <SearchX className="w-6 h-6" aria-hidden="true"/>
                )}
            </div>
            <div className="space-y-1 max-w-md mx-auto">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p
                    style={{color: "var(--text-secondary)"}}
                    className="text-sm"
                >
                    {description}
                </p>
            </div>
            <div>
                <button
                    type="button"
                    data-testid={`empty-state-action-${kind}`}
                    onClick={onAction}
                    className={
                        kind === "no-records"
                            ? "btn-primary inline-flex items-center gap-1.5 text-sm"
                            : "btn-secondary inline-flex items-center gap-1.5 text-sm"
                    }
                >
                    {kind === "no-records" && (
                        <Plus className="w-4 h-4" aria-hidden="true"/>
                    )}
                    {actionLabel}
                </button>
            </div>
        </div>
    );
}
