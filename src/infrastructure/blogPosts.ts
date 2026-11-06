export interface BlogPost {
    id: string;
    realm: "professional" | "personal";
    category: string;
    tabKey?: string;
    title: string;
    subtitle: string;
    dateLabel: string;
    readTime: string;
    coverImage: string;
    coverAlt: string;
    excerpt: string;
    paragraphs: string[];
    highlights: {label: string; detail: string}[];
    tags: string[];
    externalLinks?: {label: string; url: string}[];
}

export const PROFESSIONAL_BLOG_POSTS: BlogPost[] = [
    {
        id: "post-triton-dubai",
        realm: "professional",
        category: "Experience & AI/MLOps",
        title: "Scaling GPU Inference in Dubai: NVIDIA Triton, PyTorch & Whisper in Production",
        subtitle: "Senior Data Engineer · Cybersecurity Company (NDA) · Dubai, UAE",
        dateLabel: "Oct 2023 – Present",
        readTime: "5 min read",
        coverImage: "/gallery/dubai-chapter.png",
        coverAlt: "Dubai skyline at golden hour",
        excerpt:
            "How we designed and optimized end-to-end machine learning inference pipelines using NVIDIA Triton Inference Server, PyTorch, and Whisper ASR while maximizing GPU utilization across production clusters.",
        paragraphs: [
            "Transitioning large-scale deep learning models from research notebooks into low-latency production services requires treating ML infrastructure with the same architectural rigor as distributed backend systems.",
            "In my role as Senior Data Engineer in Dubai, I led the end-to-end architecture and delivery of GPU inference pipelines powered by NVIDIA Triton Inference Server, PyTorch, and OpenAI Whisper. By tuning dynamic batching, concurrent model execution, and memory allocation, we significantly improved GPU throughput while keeping tail latencies predictable.",
            "Alongside the inference core, I built full-stack internal support and observability tools and coordinated multi-team sprint roadmaps as Tech Lead—bridging data science research, DevOps automation, and production reliability.",
        ],
        highlights: [
            {
                label: "GPU Inference Orchestration",
                detail: "Dynamic batching & concurrent execution on NVIDIA Triton Inference Server",
            },
            {
                label: "Speech & Vector Pipelines",
                detail: "Production PyTorch & Whisper ASR pipelines paired with Milvus vector indexing",
            },
            {
                label: "Technical Leadership",
                detail: "Cross-team roadmap planning, architecture reviews, and operational tooling",
            },
        ],
        tags: ["Python", "PyTorch", "Triton Inference Server", "Whisper", "Milvus", "Docker"],
        externalLinks: [
            {label: "LinkedIn Experience", url: "https://www.linkedin.com/in/wilsonr990/"},
            {label: "Download Full CV (PDF)", url: "/FinalResume.pdf"},
        ],
    },
    {
        id: "post-fintech-singapore",
        realm: "professional",
        category: "Experience & Fintech",
        title: "Architecting Multinational Fintech Microservices in Singapore with Kotlin & Quarkus",
        subtitle: "Staff Senior Developer & Tech Lead · Hyphen Group · Singapore",
        dateLabel: "Jul 2022 – Jun 2023",
        readTime: "4 min read",
        coverImage: "/gallery/singapore-skyline.png",
        coverAlt: "Singapore Marina Bay skyline at twilight",
        excerpt:
            "Lessons learned spearheading three multinational fintech platforms across Asia using reactive Kotlin and Quarkus microservices, integrating TransUnion credit reporting, Stripe billing, and Microsoft Dynamics CRM.",
        paragraphs: [
            "Fintech platforms operating across multiple Asian markets face strict regulatory, latency, and reliability requirements. At Hyphen Group in Singapore, I spearheaded the backend architecture for three multinational financial products.",
            "We chose Kotlin and Quarkus to achieve fast startup times, low memory footprints, and expressive domain modeling. I designed and delivered the integration boundaries connecting our core services with TransUnion credit bureaus, Stripe payment workflows, and Microsoft Dynamics CRM.",
            "To keep release confidence high across distributed squads, I introduced automated Behavior-Driven Development (BDD) quality gates into our CI/CD pipelines, turning business specifications directly into executable regression suites.",
        ],
        highlights: [
            {
                label: "Reactive Kotlin & Quarkus",
                detail: "Low-footprint microservices serving multi-country financial products",
            },
            {
                label: "Enterprise Integrations",
                detail: "End-to-end TransUnion, Stripe, and Microsoft Dynamics CRM gateways",
            },
            {
                label: "BDD Quality Gates",
                detail: "Automated Gherkin/BDD verification embedded into CI/CD pipelines",
            },
        ],
        tags: ["Kotlin", "Quarkus", "GraphQL", "Kafka", "PostgreSQL", "BDD"],
        externalLinks: [
            {label: "LinkedIn Profile", url: "https://www.linkedin.com/in/wilsonr990/"},
        ],
    },
    {
        id: "post-alef-guinness",
        realm: "professional",
        category: "Experience & EdTech",
        title: "Two Guinness World Records at Alef Education: Real-Time EdTech Assessments at Scale",
        subtitle: "Full-Stack / Staff Senior Developer · Alef Education · Abu Dhabi, UAE",
        dateLabel: "Jan 2019 – May 2021",
        readTime: "4 min read",
        coverImage: "/gallery/dev-workspace.png",
        coverAlt: "Software architecture and engineering workspace",
        excerpt:
            "Building real-time K-12 assessment engines with Kotlin, Spring Boot, GraphQL, and ReactJS serving tens of thousands of students daily—and supporting two Guinness World Record events.",
        paragraphs: [
            "Classroom traffic is uniquely bursty: tens of thousands of students open an assessment at the exact same minute. At Alef Education in Abu Dhabi, I built and scaled core assessment modules using Kotlin, Spring Boot, GraphQL, and ReactJS.",
            "I led the integration of Wiris mathematical quizzes, asynchronous media-processing pipelines, and resilient GraphQL APIs that helped the platform achieve two official Guinness World Records for concurrent educational participation.",
            "Prior to my recent AI data engineering work, I also returned to Dubai's cybersecurity sector (2021–2022) to design reactive Java & Spring Boot WebFlux microservices backed by Elasticsearch and Milvus vector search.",
        ],
        highlights: [
            {
                label: "2x Guinness World Record Scale",
                detail: "Served tens of thousands of concurrent students with zero downtime",
            },
            {
                label: "Full-Stack Delivery",
                detail: "Kotlin & Spring Boot backends paired with GraphQL and ReactJS frontends",
            },
            {
                label: "Reactive Search & Vector DBs",
                detail: "Spring Boot WebFlux, Elasticsearch, and Milvus deployment automation",
            },
        ],
        tags: ["Kotlin", "Spring Boot", "WebFlux", "GraphQL", "React", "Elasticsearch"],
        externalLinks: [
            {label: "LinkedIn Profile", url: "https://www.linkedin.com/in/wilsonr990/"},
        ],
    },
    {
        id: "post-ddd-rgapps",
        realm: "professional",
        category: "Open-Source & Projects",
        title: "Why I Built DDDCompiler, the RGApps Ecosystem & My Interactive Desktop Platform",
        subtitle: "Open-Source Architecture, Compilers & Full-Stack Platforms · GitLab & GitHub",
        dateLabel: "Ongoing Open Source",
        readTime: "6 min read",
        coverImage: "/gallery/group2.jpg",
        coverAlt: "Testing board game mechanics and community apps",
        excerpt:
            "A deep dive into my personal engineering repositories: generating clean domain code with DDDCompiler, building a draggable desktop & stock tracker, and powering community board-game nights with RGApps.",
        paragraphs: [
            "Outside of my day job, I love building compilers, developer tools, and full-stack platforms that solve real problems in my own life. With DDDCompiler, I explored how explicit, human-readable domain specifications can automatically compile into clean, boilerplate-free Domain-Driven Design code.",
            "In the RGApps ecosystem, I built both an interactive draggable desktop personal platform (featuring a Stock portfolio tracker, Movie & Book notebooks, and Spaced-Repetition Language Flashcards) using React and Spring Boot WebFlux, and the GamePlan community platform using Vue 3, Vuetify 3, and reactive Java backends.",
            "All of these projects—along with my algorithmic bot heuristics for CodingGame and browser automation scripts—are open and available to explore on my GitLab and GitHub profiles.",
        ],
        highlights: [
            {
                label: "DDDCompiler",
                detail: "Model-driven Domain-Driven Design code generator written in Scala",
            },
            {
                label: "Interactive Desktop & Stocks",
                detail: "React + Spring Boot WebFlux platform with draggable apps & stock tracking",
            },
            {
                label: "RGApps & GamePlan",
                detail: "Vue 3, Vuetify 3 & reactive backend powering board-game events",
            },
        ],
        tags: ["DDD", "Scala", "React", "Vue 3", "Spring Boot WebFlux", "TypeScript"],
        externalLinks: [
            {label: "DDDCompiler on GitLab", url: "https://gitlab.com/wilsonr990/dddcompiler"},
            {label: "RGApps Group on GitLab", url: "https://gitlab.com/rgapps"},
            {label: "This Portfolio on GitHub", url: "https://github.com/lumenconsultancyae/personal-webpage"},
        ],
    },
    {
        id: "post-colombia-roots",
        realm: "professional",
        category: "Experience & Origins",
        title: "From Medellín & Bogotá to Global Engineering: Fraud Detection, Scala & Computer Vision",
        subtitle: "PSL, Easy Solutions / Cyxtera & Universidad Nacional de Colombia",
        dateLabel: "2007 – 2018 · Colombia",
        readTime: "5 min read",
        coverImage: "/gallery/colombia-cocora.png",
        coverAlt: "Colombia Cocora Valley wax palms and mountains",
        excerpt:
            "How researching 3D computer-vision driver fatigue detection at Universidad Nacional de Colombia launched my career in behavioral security, fraud detection, and distributed Scala microservices.",
        paragraphs: [
            "My engineering journey started at Universidad Nacional de Colombia in Bogotá, where I graduated with a B.Sc. in Electronic Engineering (GPA 4.1/5.0). For my thesis, 'Detecting fatigue in drivers by using 3D images,' I combined depth sensors, OpenCV, OpenNI, and machine learning to detect driver distraction in real time.",
            "That foundation led me into cybersecurity at Azuan Technologies and Easy Solutions (later Cyxtera), where I spent nearly five years leading the delivery of Clientless fraud-detection products, behavioral security engines in Scala/Play, and multiplatform security applications in C++, C#, and Java.",
            "At PSL in Medellín, I deepened my focus on distributed systems and Big Data—building Scala microservices, HBase/Phoenix/Hadoop integrations, and CI/CD pipelines that cut release cycles from days down to minutes.",
        ],
        highlights: [
            {
                label: "3D Computer Vision Thesis",
                detail: "Real-time driver fatigue classification using OpenCV, OpenNI & ML",
            },
            {
                label: "Fraud Detection & Security",
                detail: "Scala/Play backend services and C++ clientless protection products",
            },
            {
                label: "Big Data & CI/CD Automation",
                detail: "Apache Zeppelin, HBase, Phoenix, Hadoop, and automated release pipelines",
            },
        ],
        tags: ["Scala", "Play Framework", "C++", "OpenCV", "HBase", "Security"],
        externalLinks: [
            {label: "LinkedIn Profile", url: "https://www.linkedin.com/in/wilsonr990/"},
        ],
    },
];

export const PERSONAL_BLOG_POSTS: BlogPost[] = [
    {
        id: "personal-boardgames",
        realm: "personal",
        category: "Board Games",
        tabKey: "boardgames",
        title: "My Favorite Board Games & Hosting Tuesday @bgameplan Nights in Dubai",
        subtitle: "Tabletop Strategy, Social Deduction & Designing My Own Custom Board Game",
        dateLabel: "Personal Blog · Board Games",
        readTime: "5 min read",
        coverImage: "/gallery/group.jpg",
        coverAlt: "Hosting GamePlan board game night with friends in Dubai",
        excerpt:
            "Why tabletop games are my favorite way to bring people together—plus my all-time favorite strategy and party board games, hosting weekly @bgameplan nights in Dubai, and playtesting my own game design.",
        paragraphs: [
            "After a full day of working with distributed systems and cloud screens, nothing beats gathering around a physical table with friends, shuffling cards, and testing strategies face-to-face. In Dubai, I started organizing weekly Tuesday board-game nights (@bgameplan), welcoming newcomers and veteran strategists alike.",
            "What fascinates me most about board games is how elegant rule systems create emergent human stories—very much like good software architecture. A tight set of mechanics can spark tense negotiations, hilarious bluffs, or deep combinatorial calculation.",
            "Over the past few years, I have also been designing and playtesting my own custom strategy board game with friends—iterating on resource curves, player interaction, and pacing after every playtest session.",
        ],
        highlights: [
            {
                label: "Brass: Birmingham & Terraforming Mars",
                detail: "My favorite heavy economic & engine-building strategy games where every turn is a puzzle.",
            },
            {
                label: "7 Wonders Duel & Splendor",
                detail: "Brilliant, fast-paced tactical games with zero downtime and tight decision trees.",
            },
            {
                label: "Cash 'n Guns, Codenames & Decrypto",
                detail: "Our go-to social deduction and party favorites for big Tuesday @bgameplan nights.",
            },
            {
                label: "Catan, Ticket to Ride & Azul",
                detail: "Timeless gateway classics I love using to introduce new friends to the hobby.",
            },
        ],
        tags: ["Board Games", "@bgameplan", "Game Design", "Strategy", "Dubai Community"],
    },
    {
        id: "personal-movies",
        realm: "personal",
        category: "Favorite Movies",
        tabKey: "movies",
        title: "My Favorite Movies: Mind-Bending Cinema & Stories That Stay With You",
        subtitle: "From Memento & 3 Idiots to Sci-Fi, Thrillers & Human Resilience",
        dateLabel: "Personal Blog · Cinema Notebook",
        readTime: "4 min read",
        coverImage: "/gallery/movies-cinema.png",
        coverAlt: "Warm cinema projector and film notebook",
        excerpt:
            "A look inside my personal movie notebook: why I love non-linear puzzles like Memento, heartwarming stories about curiosity and education like 3 Idiots, and thought-provoking sci-fi.",
        paragraphs: [
            "I have always kept a personal movie notebook (which even inspired the Movie Cards widget in my interactive desktop project). I'm drawn to two kinds of films: intricate, non-linear puzzles that reward close attention, and deeply human stories about curiosity, mentorship, and perseverance.",
            "'Memento' remains one of my all-time favorites for the sheer brilliance of its reverse-chronological structure—it puts you directly inside the protagonist's epistemic limits. On the other end of the spectrum, '3 Idiots' is a film I can rewatch endlessly for its warmth, humor, and reminder to pursue genuine understanding over rote competition.",
            "Whether it's a Christopher Nolan mind-bender or a quiet drama after my daughter goes to sleep, great storytelling always recharges my imagination.",
        ],
        highlights: [
            {
                label: "Memento (2000)",
                detail: "A masterclass in non-linear storytelling, memory, and structural tension.",
            },
            {
                label: "3 Idiots (2009)",
                detail: "An inspiring, hilarious celebration of engineering curiosity, friendship, and learning for joy.",
            },
            {
                label: "The Prestige & Inception",
                detail: "Layered narratives about obsession, craft, and architecture of the mind.",
            },
            {
                label: "Interstellar & Arrival",
                detail: "Hard sci-fi grounded in fatherhood, language, time, and human connection.",
            },
        ],
        tags: ["Movies", "Memento", "3 Idiots", "Sci-Fi", "Storytelling"],
    },
    {
        id: "personal-music",
        realm: "personal",
        category: "Favorite Music",
        tabKey: "music",
        title: "My Favorite Music: Soundtracks for Deep Coding Flow, Architecture & Quiet Evenings",
        subtitle: "Lo-Fi Beats, Ambient Soundscapes, Classical Cello & Latin Roots",
        dateLabel: "Personal Blog · Music & Flow",
        readTime: "4 min read",
        coverImage: "/gallery/music-vinyl.png",
        coverAlt: "Studio headphones and vinyl turntable at dusk",
        excerpt:
            "Music is my mind's backdrop. Here is what I listen to when writing code, sketching distributed system architectures, or decompressing with a pour-over coffee.",
        paragraphs: [
            "Different kinds of thinking call for different sonic textures. Over the years, I've curated distinct playlists depending on whether I'm debugging a tricky concurrency issue, whiteboarding system architecture, or winding down with family.",
            "When I'm deep in implementation, steady instrumental lo-fi hip-hop and chillhop keep my tempo high without competing for verbal working memory. When I switch to high-level architecture design or writing technical RFCs, expansive ambient and post-rock soundscapes create a calm, unhurried space.",
            "And when the laptop closes, classical piano and cello—or warm Colombian and Latin acoustic records from home—help me shift gears completely.",
        ],
        highlights: [
            {
                label: "Lo-Fi Beats & Jazzhop (Coding Flow)",
                detail: "Nujabes, Idealism, and instrumental chillhop for steady, distraction-free coding sessions.",
            },
            {
                label: "Ambient & Post-Rock (System Design)",
                detail: "Brian Eno, Explosions in the Sky, Tycho, and Hans Zimmer soundtracks for deep architectural thinking.",
            },
            {
                label: "Classical Piano & Cello (Decompression)",
                detail: "Bach Cello Suites, Chopin Nocturnes, and Ludovico Einaudi for reading and evening calm.",
            },
            {
                label: "Colombian & Latin Acoustic (Weekend Energy)",
                detail: "Warm rhythms from Medellín and Bogotá that bring the energy of home into our living room.",
            },
        ],
        tags: ["Music", "Lo-Fi", "Ambient", "Classical", "Deep Work"],
    },
    {
        id: "personal-coffee-fatherhood",
        realm: "personal",
        category: "Life & Family",
        tabKey: "lifestyle",
        title: "Fatherhood, Specialty Coffee & Finding Balance Outside the Terminal",
        subtitle: "Raising My Daughter in Dubai & Dialing In V60 Pour-Overs in My Home Coffee Lab",
        dateLabel: "Personal Blog · Life & Coffee",
        readTime: "4 min read",
        coverImage: "/gallery/family-moment.png",
        coverAlt: "Father and daughter walking at golden hour",
        excerpt:
            "Why becoming a dad is my proudest role, how my morning V60 pour-over ritual sets the tone for the day, and why a balanced life outside work builds better engineers.",
        paragraphs: [
            "Becoming a father transformed how I think about time, patience, and presence. Watching my daughter discover the world—and learning to speak fluent Toddler alongside Spanish, English, and basic Japanese—reminds me every day that curiosity is our most natural superpower.",
            "My mornings start in my home coffee lab before the house wakes up. Weighing freshly roasted beans, dialing in the grind size, and blooming a V60 pour-over or pulling an espresso shot is a tactile ritual that blends science, craft, and mindfulness.",
            "I firmly believe that balance creates better builders: a rested, fulfilled life outside the keyboard directly sharpens empathy, creativity, and engineering judgment.",
        ],
        highlights: [
            {
                label: "Fatherhood First",
                detail: "Sunset walks, bedtime stories, and rediscovering the world through my daughter's eyes.",
            },
            {
                label: "The Home Coffee Lab",
                detail: "Single-origin V60 pour-overs (Colombian & Ethiopian naturals) and precision espresso.",
            },
            {
                label: "Daily Meditation & Language Cards",
                detail: "Keeping the mind clear through meditation and practicing Japanese & Spanish vocabulary.",
            },
        ],
        tags: ["Fatherhood", "Specialty Coffee", "V60 & Espresso", "Mindfulness"],
    },
];
