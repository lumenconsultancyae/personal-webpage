# UX/UI Redesign & Frontend Architectural Upgrade (`feat/ux-style-improvements`)

See [`personal_docs/docs/UX_IMPROVEMENTS.md`](../../personal_docs/docs/UX_IMPROVEMENTS.md) for the companion deployment and BDD E2E verification report.

## Summary of Architectural & UX Changes in `personal-webpage`

1. **Declarative Routing & URL State (`react-router-dom`)**:
   - Multi-route navigation (`/`, `/journey`, `/projects`, `/testimonials`, `/personal`, `/contact`) with `React.lazy` + `<Suspense>` code splitting and legacy `#hash` redirection.
   - Bidirectional URL search parameter synchronization (`useSearchParams`) for `q`, `category`, `type`, `skillCategory`, `tab`, `sort`, `page`, and `pageSize`.
2. **Server State Management (`@tanstack/react-query`)**:
   - Deterministic query key factory (`src/application/queryKeys.ts`) and custom query/mutation hooks (`src/application/usePortfolioQueries.ts`) with optimistic updates, automatic error rollback, and cache invalidation.
3. **Semantic Design Tokens & Logical CSS (`src/app/globals.css`)**:
   - Unified dark/light theme tokens (`--bg-canvas`, `--bg-surface`, `--bg-elevated`, `--accent-primary`, `--status-*`), `font-variant-numeric: tabular-nums`, CSS logical properties (`ltr`/`rtl` support), `.kbd-hint` badges, and `@media print` rules.
4. **Accessible WAI-ARIA Primitives & Inline Form Validation**:
   - `ToastProvider` (`role="status"`, `aria-live="polite"`, Undo action callback)
   - `ConfirmDialog` (`role="alertdialog"`, `aria-modal="true"`, focus trap & restoration)
   - `CommandPalette` (`Cmd/Ctrl + K` keyboard navigation)
   - `ProjectFormPanel`, `TestimonialFormPanel`, and `ContactInquiryForm` (`react-hook-form` + `zod` + `sanitizeText`)
   - `PaginationControls` and `bounded-table-container` with sticky headers.

## Visual Before & After Screenshots

- Baseline "Before" screenshots: `docs/screenshots/ux_improvements/before/`
- Redesigned "After" screenshots: `docs/screenshots/ux_improvements/after/`
