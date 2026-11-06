# Wilson Guevara (`@wilsonr990`) — Personal Portfolio & Webpage

Public personal webpage and interactive software engineering portfolio for **Wilson René Guevara Arévalo**, built with **Next.js 15**, **React 19**, **TypeScript**, **Tailwind CSS v4**, **Framer Motion**, and **Material UI (MUI v7)**.

---

## Overview

This webpage brings together both the **Professional** and **Personal** sides of Wilson's journey across Colombia, Singapore, and the United Arab Emirates:

### 1. Professional Track (`#professionalHighlights`, `#journey`, `#testimonials`, `#projects`)
- **Professional Highlights & CV (`src/components/ProfessionalHighlights.tsx`)**: Executive summary covering 12+ years designing and delivering distributed, data-intensive, and AI-powered systems across cybersecurity, fintech, and edtech, with direct PDF resume download (`public/FinalResume.pdf`) and contact links (`src/components/Contact.tsx`).
- **Career & Education Journey (`src/components/Journey.tsx`)**: Interactive timeline detailing engineering leadership and research roles at a Cybersecurity Company in Dubai (Senior Data Engineer), Hyphen Group in Singapore (Staff Senior Developer), Alef Education in Abu Dhabi, PSL in Medellín, Easy Solutions / Cyxtera in Bogotá, and Azuan Technologies, alongside academic credentials from DeepLearning.AI and Universidad Nacional de Colombia.
- **Testimonials & Technical Stack (`src/components/Testimonials.tsx`)**: Auto-advancing peer and manager recommendations paired with categorized technology badges across Backend (`Python`, `Kotlin`, `Spring Boot`, `Java`, `C++`), Frontend (`React`, `Vue.js`), DevOps & Observability (`Docker`, `Jenkins`, `Prometheus`), and AI/Data (`Milvus`, `Elasticsearch`, `GraphQL`).
- **Spotlighted & Open-Source Projects (`src/components/Projects.tsx`)**: Curated showcase of the RGApps ecosystem (`desktop-frontend`, `general-backend`, `rgapps-frontend`, `rgapps-backend`, `DDDCompiler`, `codingGame`) combined with live public repositories fetched from the GitLab API.

### 2. Personal Track (`#aboutme`, `#traveling`, `#philosophy`, `#funfacts`, `#gallery`)
- **About Me & Lifestyle (`src/components/PersonalHighlights.tsx`)**: Board game design, language exploration (Spanish, English, Japanese), world travel, music, continuous learning, and cinema.
- **Where I've Lived (`src/components/Traveling.tsx`)**: Milestones across Medellín & Bogotá (Colombia), Singapore, and Dubai (UAE).
- **Philosophy (`src/components/Philosophies.tsx`)**: Core principles on simplicity, momentum, life-work balance, and mentorship.
- **10 Fun Facts (`src/components/FunFacts.tsx`)**: Personal highlights from custom board game mechanics to espresso brewing.
- **Photo Gallery (`src/components/Gallery.tsx`)**: Community board-game night snapshots and personal lifestyle cards.

---

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Turbopack/Webpack)
- **UI Library**: [React 19](https://react.dev/) + [TypeScript 5](https://www.typescriptlang.org/)
- **Styling & Animations**: [Tailwind CSS v4](https://tailwindcss.com/) + [Framer Motion 12](https://www.framer.com/motion/) + [MUI v7](https://mui.com/)
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)

---

## Getting Started

### Prerequisites
- Node.js 20+ and npm

### Installation & Local Development

```bash
# Install dependencies
npm install

# Start development server at http://localhost:3000
npm run dev
```

### Production Build

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```
