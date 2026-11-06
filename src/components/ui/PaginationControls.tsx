"use client";

import React from "react";
import {ChevronLeft, ChevronRight} from "lucide-react";

export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100] as const;

export interface PaginationControlsProps {
    totalItems: number;
    page: number;
    pageSize: number;
    onPageChange: (nextPage: number) => void;
    onPageSizeChange: (nextSize: number) => void;
    itemLabel?: string;
}

export function PaginationControls({
    totalItems,
    page,
    pageSize,
    onPageChange,
    onPageSizeChange,
    itemLabel = "records",
}: PaginationControlsProps) {
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
    const safePage = Math.min(Math.max(1, page), totalPages);
    const startIdx = totalItems === 0 ? 0 : (safePage - 1) * pageSize + 1;
    const endIdx = Math.min(totalItems, safePage * pageSize);

    return (
        <div
            data-testid="pagination-controls"
            className="surface-elevated px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs"
        >
            <div className="flex items-center gap-3">
                <span
                    data-testid="pagination-status"
                    style={{color: "var(--text-secondary)"}}
                    className="tabular-nums font-medium"
                >
                    Showing {startIdx}–{endIdx} of {totalItems} {itemLabel}
                </span>

                <label className="inline-flex items-center gap-1.5 whitespace-nowrap">
                    <span
                        style={{color: "var(--text-muted)"}}
                        className="whitespace-nowrap"
                    >
                        Rows per page:
                    </span>
                    <select
                        aria-label="Rows per page"
                        data-testid="pagination-page-size"
                        value={pageSize}
                        onChange={(e) => onPageSizeChange(Number(e.target.value))}
                        className="input-control w-auto py-1 ps-2.5 pe-7 text-xs tabular-nums"
                    >
                        {PAGE_SIZE_OPTIONS.map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            <div className="flex items-center gap-1.5">
                <button
                    type="button"
                    aria-label="Previous page"
                    data-testid="pagination-prev"
                    disabled={safePage <= 1}
                    onClick={() => onPageChange(safePage - 1)}
                    className="btn-secondary py-1 px-2.5 inline-flex items-center gap-1 disabled:opacity-40"
                >
                    <ChevronLeft className="w-3.5 h-3.5" aria-hidden="true"/>
                    Prev
                </button>

                {Array.from({length: totalPages}).map((_, i) => {
                    const p = i + 1;
                    const isCurrent = p === safePage;
                    return (
                        <button
                            key={p}
                            type="button"
                            aria-label={`Page ${p}`}
                            aria-current={isCurrent ? "page" : undefined}
                            data-testid={`pagination-page-${p}`}
                            onClick={() => onPageChange(p)}
                            className={
                                isCurrent
                                    ? "btn-primary py-1 px-2.5 tabular-nums"
                                    : "btn-secondary py-1 px-2.5 tabular-nums"
                            }
                        >
                            {p}
                        </button>
                    );
                })}

                <button
                    type="button"
                    aria-label="Next page"
                    data-testid="pagination-next"
                    disabled={safePage >= totalPages}
                    onClick={() => onPageChange(safePage + 1)}
                    className="btn-secondary py-1 px-2.5 inline-flex items-center gap-1 disabled:opacity-40"
                >
                    Next
                    <ChevronRight className="w-3.5 h-3.5" aria-hidden="true"/>
                </button>
            </div>
        </div>
    );
}
