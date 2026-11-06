import React from "react";
import {describe, expect, it, vi} from "vitest";
import {fireEvent, render, screen} from "@testing-library/react";
import {ToastProvider, useToast} from "@/components/ui/ToastProvider";
import {ConfirmDialog} from "@/components/ui/ConfirmDialog";
import {
    ContextualEmptyState,
    RouteErrorBoundary,
} from "@/components/ui/ErrorBoundary";
import {PaginationControls} from "@/components/ui/PaginationControls";

function ToastHarness({onUndo}: { onUndo?: () => void }) {
    const {pushToast, clearToasts} = useToast();
    return (
        <div>
            <button
                type="button"
                onClick={() =>
                    pushToast({
                        variant: "success",
                        title: "Saved",
                        description: "Record saved",
                        onUndo,
                    })
                }
            >
                Trigger Success
            </button>
            <button
                type="button"
                onClick={() =>
                    pushToast({
                        variant: "error",
                        title: "Failed",
                        durationMs: 50,
                    })
                }
            >
                Trigger Short Error
            </button>
            <button type="button" onClick={clearToasts}>
                Clear All
            </button>
        </div>
    );
}

describe("Accessible UI Primitives (Toast, ConfirmDialog, ErrorBoundary, CommandPalette, Pagination)", () => {
    it("renders Toast notifications with Undo callback and dismissal", async () => {
        expect(() => render(<ToastHarness/>)).toThrow(
            /useToast must be used within a ToastProvider/
        );
        const undoSpy = vi.fn();
        render(
            <ToastProvider defaultDurationMs={0}>
                <ToastHarness onUndo={undoSpy}/>
            </ToastProvider>
        );

        fireEvent.click(screen.getByText("Trigger Success"));
        expect(screen.getByTestId("toast-item-success")).toBeInTheDocument();
        expect(screen.getByText("Saved")).toBeInTheDocument();

        fireEvent.click(screen.getByTestId("toast-undo-button"));
        expect(undoSpy).toHaveBeenCalledTimes(1);

        fireEvent.click(screen.getByText("Trigger Success"));
        fireEvent.click(screen.getByTestId("toast-dismiss-button"));
        expect(screen.queryByTestId("toast-item-success")).toBeNull();

        fireEvent.click(screen.getByText("Trigger Short Error"));
        fireEvent.click(screen.getByText("Clear All"));
        expect(screen.queryByTestId("toast-item-error")).toBeNull();
    });

    it("supports ConfirmDialog keyboard Escape, Tab focus trap, backdrop cancel, and confirm", () => {
        const onConfirm = vi.fn();
        const onCancel = vi.fn();

        const {rerender} = render(
            <ConfirmDialog
                open={true}
                title="Delete Item?"
                description="This action removes the item."
                itemSummary="Item #42"
                onConfirm={onConfirm}
                onCancel={onCancel}
            />
        );

        expect(screen.getByRole("alertdialog")).toBeInTheDocument();
        expect(screen.getByTestId("confirm-dialog-summary")).toHaveTextContent(
            "Item #42"
        );

        const cancelBtn = screen.getByTestId("confirm-dialog-cancel");
        const confirmBtn = screen.getByTestId("confirm-dialog-confirm");

        confirmBtn.focus();
        fireEvent.keyDown(window, {key: "Tab"});
        expect(document.activeElement).toBe(cancelBtn);

        cancelBtn.focus();
        fireEvent.keyDown(window, {key: "Tab", shiftKey: true});
        expect(document.activeElement).toBe(confirmBtn);

        fireEvent.keyDown(window, {key: "Escape"});
        expect(onCancel).toHaveBeenCalledTimes(1);

        fireEvent.click(screen.getByTestId("confirm-dialog-backdrop"));
        expect(onCancel).toHaveBeenCalledTimes(2);

        fireEvent.click(confirmBtn);
        expect(onConfirm).toHaveBeenCalledTimes(1);

        rerender(
            <ConfirmDialog
                open={false}
                title="Delete Item?"
                description="Closed"
                onConfirm={onConfirm}
                onCancel={onCancel}
            />
        );
        expect(screen.queryByRole("alertdialog")).toBeNull();
    });

    it("catches errors in RouteErrorBoundary and resets on Retry", () => {
        const spy = vi.spyOn(console, "error").mockImplementation(() => {});
        let shouldThrow = true;
        function BuggyChild() {
            if (shouldThrow) {
                throw new Error("Boom in child");
            }
            return <div>Recovered Content</div>;
        }

        const onReset = vi.fn();
        render(
            <RouteErrorBoundary onReset={onReset}>
                <BuggyChild/>
            </RouteErrorBoundary>
        );

        expect(screen.getByTestId("error-boundary-fallback")).toBeInTheDocument();
        expect(screen.getByText("Boom in child")).toBeInTheDocument();

        shouldThrow = false;
        fireEvent.click(screen.getByTestId("error-boundary-retry"));
        expect(onReset).toHaveBeenCalledTimes(1);
        expect(screen.getByText("Recovered Content")).toBeInTheDocument();
        spy.mockRestore();
    });

    it("renders ContextualEmptyState for no-records and no-matches", () => {
        const onAction = vi.fn();
        const {rerender} = render(
            <ContextualEmptyState
                kind="no-records"
                title="No records"
                description="Create one"
                actionLabel="Create"
                onAction={onAction}
            />
        );
        fireEvent.click(screen.getByTestId("empty-state-action-no-records"));
        expect(onAction).toHaveBeenCalledTimes(1);

        rerender(
            <ContextualEmptyState
                kind="no-matches"
                title="No matches"
                description="Clear filter"
                actionLabel="Clear"
                onAction={onAction}
            />
        );
        fireEvent.click(screen.getByTestId("empty-state-action-no-matches"));
        expect(onAction).toHaveBeenCalledTimes(2);
    });

    it("renders PaginationControls and handles page and page-size changes", () => {
        const onPageChange = vi.fn();
        const onPageSizeChange = vi.fn();

        render(
            <PaginationControls
                totalItems={25}
                page={1}
                pageSize={10}
                onPageChange={onPageChange}
                onPageSizeChange={onPageSizeChange}
                itemLabel="projects"
            />
        );

        expect(screen.getByTestId("pagination-status")).toHaveTextContent(
            "Showing 1–10 of 25 projects"
        );
        expect(screen.getByTestId("pagination-prev")).toBeDisabled();

        fireEvent.click(screen.getByTestId("pagination-next"));
        expect(onPageChange).toHaveBeenCalledWith(2);

        fireEvent.click(screen.getByTestId("pagination-page-3"));
        expect(onPageChange).toHaveBeenCalledWith(3);

        fireEvent.change(screen.getByTestId("pagination-page-size"), {
            target: {value: "25"},
        });
        expect(onPageSizeChange).toHaveBeenCalledWith(25);
    });
});
