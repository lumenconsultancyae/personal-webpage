# Wilson Guevara — Personal Webpage (`personal-webpage`)

Clean, minimalist personal webpage and portfolio for **Wilson Guevara** (`@wilsonr990`), built with **Next.js 15**, **React 19**, **Tailwind CSS v4**, **Framer Motion**, and **MUI**.

## Page Structure (Strict Separation of Professional & Personal)

- **`/` (`src/app/page.tsx`) — Landing Splash Screen (`HeaderSplash`)**:
  - Introduces Wilson with an animated typewriter headline and two dedicated entrypoints: **Professional** and **Personal**.
- **`/professional` (`src/app/professional/page.tsx`) — Professional Portfolio**:
  - **Professional Highlights (`#professionalHighlights`)**: CV download, executive summary, core focus areas, and direct contact links.
  - **My Journey (`#journey`)**: Interactive Work & Education timeline (expanding one role at a time for low visual density).
  - **Why me? (`#testimonials`)**: Spotlight peer testimonials carousel and Tools & Technologies overview.
  - **My Projects (`#projects`)**: Spotlighted engineering projects and open-source repositories.
- **`/personal` (`src/app/personal/page.tsx`) — Personal Page**:
  - **About Me (`#aboutme`)**: Life beyond the keyboard and lifestyle highlights.
  - **Travelling (`#traveling`)**: Places called home (Colombia, Singapore, UAE, and beyond).
  - **Philosophy (`#philosophy`)**: Guiding principles on simplicity, momentum, balance, and mentoring.
  - **10 Fun Facts (`#funfacts`)**: Personal fun facts.
  - **Photo Gallery (`#gallery`)**: Community board-game nights, family, coffee, and travel snapshots.

## Local Deployment

Managed via [`docker-compose.yml`](../personal_docs/docker-compose.yml) in [`lumenconsultancyae/personal_docs`](https://github.com/lumenconsultancyae/personal_docs) at `http://localhost:3005`.
