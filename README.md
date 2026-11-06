# Wilson Guevara — Personal Webpage & Engineering Portfolio (`personal-webpage`)

Production-ready personal webpage and engineering portfolio for **Wilson Guevara** (`@wilsonr990`), built with **Next.js 15**, **React 19**, **React Router (`react-router-dom`)**, **TanStack Query (`@tanstack/react-query`)**, **React Hook Form + Zod**, and a cohesive semantic CSS design token system.

## Key Features & Architecture

- **Declarative Multi-Route Navigation (`React Router`)**:
  - `/` — Executive Overview, KPI Metrics, Core Competencies & Spotlighted Work
  - `/journey` — Filterable Career & Education Timeline + Bounded Milestone Table
  - `/projects` — Paginated Projects Explorer with Debounced Search (`q`), Category/Sort Filters, Progressive Disclosure Create/Edit Drawer, and Accessible Delete Confirmation + Undo Toast
  - `/testimonials` — Peer Endorsements & 23-Technology Skills Matrix
  - `/personal` — Lifestyle, Global Chapters, Philosophy, 10 Fun Facts & Lightbox Photo Gallery
  - `/contact` — Schema-Validated Direct Inquiry Form & Bounded Inquiries Log
- **Keyboard Command Palette (`Cmd/Ctrl + K`)**, **Dark/Light Theme Toggle**, **LTR/RTL Logical CSS Support**, and **Responsive Off-Canvas Mobile Navigation Drawer**.
- **UX Redesign Documentation & Screenshots**: See [`docs/UX_IMPROVEMENTS.md`](./docs/UX_IMPROVEMENTS.md) and `docs/screenshots/ux_improvements/`.

## Development & Verification Commands

```bash
# Install dependencies
npm install

# Run Vitest unit & component tests with v8 coverage
npm run test:coverage

# Type-check and build production bundle
./node_modules/.bin/tsc --noEmit
npm run build
```

## Companion Documentation & Docker Compose Deployment

See [`lumenconsultancyae/personal_docs`](https://github.com/lumenconsultancyae/personal_docs) for [`docker-compose.yml`](../personal_docs/docker-compose.yml) (`http://localhost:3005`) and the Behave BDD E2E test suite (`bash ../personal_docs/scripts/run_bdd_e2e.sh`).
