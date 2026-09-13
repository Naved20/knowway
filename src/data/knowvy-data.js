/**
 * Knowvy Technologies — Authentic Source of Truth
 * Synchronized with official production data from knowvy.xyz
 *
 * Preserves authentic data, real statistics, verified partners,
 * team members, community channels, and historical milestones.
 */

export const brandData = {
  name: "Knowvy",
  fullName: "Knowvy Technologies",
  tagline: "Perks with Purpose, Events with Impact.",
  headline: "India's Student Developer Ecosystem",
  supportingCopy:
    "A student community in Bhopal hosting events, meetups, and hackathons for students and tech enthusiasts looking to build, learn, and grow together.",
  mission:
    "We believe that college shouldn't limit your engineering potential. Knowvy turns curiosity into real-world impact through community-driven learning.",
  description:
    "Founded by students in Bhopal, Knowvy Technologies organizes hands-on dev days, flagship hackathons, open-source cohorts, and community meetups. Whether you are coding your first line of JavaScript or building AI agents, Knowvy gives you the stage, mentorship, and peer network to succeed.",
  location: "Bhopal, Madhya Pradesh, India",
  stats: [
    { value: 2000, suffix: "+", label: "Community Builders", description: "Students, self-taught developers & creators" },
    { value: 30, suffix: "+", label: "Events & Meetups", description: "Hackathons, Dev Days & workshops hosted" },
    { value: 10, suffix: "L+", label: "Prize Pool & Grants", description: "Rewarding high-impact student projects" },
    { value: 9, suffix: " Cities", label: "HeyGen RoadShow", description: "Nationwide AI video & growth series" },
  ],
  links: {
    whatsapp: "https://chat.whatsapp.com/ByhJB7Rs9jpHcwGIUPWq9j",
    linkedin: "https://linkedin.com/company/knowvy",
    twitter: "https://x.com/knowvytech",
    founderTwitter: "https://x.com/mohneesh_gupta1",
    instagram: "https://instagram.com/knowvy.technologies",
    github: "https://github.com/mohneesh-gupta",
    email: "knowvy.tech@gmail.com",
    supportEmail: "knowvy1@gmail.com",
    phone: "+91 99938 49783",
    website: "https://knowvy.xyz",
  },
  pillars: [
    {
      id: "student-community",
      number: "01",
      title: "Student Community in Bhopal",
      subtitle: "The Hub for Builders",
      description: "A thriving tech hub bringing together students, self-taught developers, and tech enthusiasts across colleges in Bhopal.",
      tags: ["Bhopal Developers", "Cross-Campus Meetups", "Peer Circles", "Active Discord & WhatsApp"],
    },
    {
      id: "events-meetups",
      number: "02",
      title: "Events & Meetups",
      subtitle: "High Stakes, Not Stickers",
      description: "Regular offline meetups, technical workshops, hands-on dev days, and collaborative hackathons with real cash prizes.",
      tags: ["TIC National Hackathon", "MS Build Bhopal", "Agentic AI Hackathon", "CodeSprint"],
    },
    {
      id: "mentorship-growth",
      number: "03",
      title: "Mentorship & Growth",
      subtitle: "Accelerated Pathways",
      description: "Direct guidance from senior developers, open-source maintainers, and startup founders to fast-track your career.",
      tags: ["1-on-1 Guidance", "GSOC & Vercel PRs", "Resume Reviews", "Founder AMAs"],
    },
    {
      id: "build-ship",
      number: "04",
      title: "Build & Ship Culture",
      subtitle: "From Zero to Production",
      description: "We prioritize building production projects, shipping open source contributions, and showing your work out loud.",
      tags: ["Open Source PRs", "Production Deployment", "Full-Stack Web & AI", "Real Users"],
    },
  ],
};

export const ecosystemNodes = [
  {
    id: "hackathons",
    title: "Hackathons",
    category: "High Stakes, Not Stickers",
    description: "48-hour offline & remote builds with real cash prize pools of ₹10L+ and judging by tech founders.",
    metrics: "TIC National Hackathon • Agentic AI Hackathon",
    position: [2.8, 1.2, 0.4],
    color: "#4D8DFF",
  },
  {
    id: "workshops",
    title: "Workshops & Cohorts",
    category: "Hands-on Sprints",
    description: "Small cohorts with direct mentorship covering production code, local LLMs, and modern cloud stacks.",
    metrics: "GitHub Copilot Dev Days • AWS Builder Day",
    position: [-2.6, 1.4, -0.6],
    color: "#8B5CF6",
  },
  {
    id: "opensource",
    title: "Open Source",
    category: "Maintainer Track",
    description: "PR sprints guiding students from cloning repositories to merged pull requests in high-visibility global repos.",
    metrics: "Open Source Sprint Q1 • GSOC & Vercel Contributors",
    position: [2.2, -1.5, 0.8],
    color: "#38BDF8",
  },
  {
    id: "meetups",
    title: "Meetups",
    category: "City-First Community",
    description: "Monthly in-person networking gatherings in Bhopal uniting student tinkerers, designers, and programmers.",
    metrics: "Miro Meetup Bhopal • Campus Hubs",
    position: [-2.4, -1.2, -0.7],
    color: "#60A5FA",
  },
  {
    id: "career",
    title: "Career & Transition",
    category: "Offers & Referrals",
    description: "Resume teardowns, technical mock interviews, and direct referrals to internships and developer roles.",
    metrics: "AWS Cloud Interns • YC-backed Startups",
    position: [0.3, 2.7, 0.5],
    color: "#A78BFA",
  },
  {
    id: "agentic-ai",
    title: "Agentic AI",
    category: "Multi-Agent Pipelines",
    description: "Hands-on building of autonomous AI agents, LangChain workflows, and vector database tools.",
    metrics: "Agentic AI Hackathon 2025 • 350+ Hackers",
    position: [-1.9, -2.0, 1.1],
    color: "#C084FC",
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps",
    category: "Production Infrastructure",
    description: "Serverless deployments, containers, and CI/CD automation in partnership with Microsoft and AWS.",
    metrics: "MS Build Bhopal • AWS Builder Day",
    position: [1.8, 2.1, -1.2],
    color: "#818CF8",
  },
  {
    id: "heygen",
    title: "HeyGen RoadShow",
    category: "AI Video & Growth",
    description: "Connecting founders, creators, and marketers across 9 Indian cities for modern AI video & creator commerce.",
    metrics: "9 Cities • One Mission",
    position: [-2.5, 0.2, 1.4],
    color: "#34D399",
  },
];

export const eventsData = [
  {
    slug: "tic-national-hackathon",
    title: "TIC National Hackathon (Technocats Innovation Challenge)",
    category: "National Hackathon",
    status: "Upcoming",
    date: "April 03, 2026",
    startDate: "2026-04-03",
    location: "Offline • Bhopal, Madhya Pradesh",
    participants: "250+ Hackers",
    banner: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Technocats Innovation Challenge is a 36-hour offline hackathon organised by Knowvy Technologies and Vexite Studio.",
    about: "The flagship national 36-hour hackathon bringing together the finest student engineers across India to solve high-stakes challenges. Organized by Knowvy Technologies in collaboration with Vexite Studio, this competition features cash prizes, top venture mentors, and direct recruitment fast-tracks.",
    highlights: [
      "36 Hours of Non-stop Collaborative Building",
      "Cash Prizes & Grants for Winning Prototypes",
      "Mentorship from Senior Founders & Tech Leads",
      "Co-organized with Vexite Studio",
    ],
    challenges: [
      "AI-Powered Developer Tools & Autonomous Systems",
      "Decentralized Data & Open Financial Architecture",
      "Campus & Educational Productivity Infrastructure",
      "Smart City & Sustainable Technology",
    ],
    partners: ["Knowvy Technologies", "Vexite Studio", "Google for Developers", "TIT Bhopal"],
    winningTeams: [],
    prizes: "₹1,50,000+ Prize Pool",
  },
  {
    slug: "heygen-india-roadshow",
    title: "HeyGen India RoadShow Series (9 Cities)",
    category: "National RoadShow",
    status: "Upcoming",
    date: "Series 2026",
    startDate: "2026-05-01",
    location: "9 Cities Across India (Bhopal, Delhi, Mumbai, Bengaluru, etc.)",
    participants: "1,500+ Founders & Creators",
    banner: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Connecting founders, creators, and marketers across 9 major cities for real conversations on modern growth and AI video.",
    about: "A nationwide initiative led by Knowvy Technologies and HeyGen Ambassadors. We're taking HeyGen across 9 dynamic cities in India to spark direct, grounded conversations with creators, founders, and growth teams.",
    highlights: [
      "9 Cities: Jabalpur, Delhi, Hyderabad, Chennai, Mumbai, Pune, Bengaluru, Bhopal, Indore",
      "Real talk on modern marketing & scaling 10x video output",
      "Hands-on AI avatar workflows & publish-ready pipelines",
      "Founder-to-founder relationships & distribution playbooks",
    ],
    challenges: ["Create your first AI avatar and script live on site"],
    partners: ["Knowvy Technologies", "HeyGen", "HeyGen Ambassadors"],
    winningTeams: [],
    prizes: "HeyGen Subscriptions & Creator Grants",
  },
  {
    slug: "ms-build-bhopal",
    title: "MS Build Bhopal",
    category: "Dev Day & Cloud Labs",
    status: "Completed",
    date: "May 18, 2025",
    startDate: "2025-05-18",
    location: "Auditorium • Bhopal, India",
    participants: "220+ Participants",
    banner: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "A flagship event bringing Microsoft technologies, Azure AI, and modern web architectures to students in Bhopal with live keynote streaming & hands-on labs.",
    about: "Brought the spirit of Microsoft Build directly to students in Central India. Featured hands-on labs with Azure OpenAI, GitHub Copilot integration, and modern microservice deployments on Azure Kubernetes Service.",
    highlights: [
      "Keynote live streaming & technical breakdown",
      "Azure Cloud Subscriptions & Lab passes for all attendees",
      "Hands-on serverless & modern web architectures",
    ],
    challenges: ["Deploy a full-stack containerized app on Azure App Service"],
    partners: ["Microsoft for Startups", "Knowvy Technologies", "Azure Tech Group Bhopal"],
    winningTeams: [],
  },
  {
    slug: "agentic-ai-hackathon-2025",
    title: "Agentic AI Hackathon 2025",
    category: "AI Hackathon",
    status: "Completed",
    date: "November 20 - 21, 2025",
    startDate: "2025-11-20",
    location: "Tech Labs • Bhopal, India",
    participants: "350+ Hackers (45 Teams)",
    banner: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "A 36-hour intense hackathon where student teams built autonomous multi-agent systems, LangChain workflows, and AI vector database tools.",
    about: "Central India's first dedicated Agentic AI hackathon. 45 collegiate teams built autonomous agents capable of web automation, data retrieval, and complex task execution using LangChain, CrewAI, and ChromaDB.",
    highlights: [
      "36 Hours of intense autonomous agent prototyping",
      "Hands-on vector database & RAG pipelines",
      "Direct reviews from AI engineers & startup founders",
    ],
    challenges: ["Build an autonomous multi-agent system for real-world operations"],
    partners: ["Google for Developers", "Knowvy Technologies"],
    winningTeams: [
      { rank: "1st Place", team: "Team AgentZero", project: "Autonomous Customer Support & Incident Resolver" },
      { rank: "2nd Place", team: "Team VectorMind", project: "Distributed RAG over multi-format technical docs" },
    ],
    prizes: "₹1,00,000 in Cash & Cloud Credits",
  },
  {
    slug: "github-copilot-dev-days",
    title: "GitHub Copilot Dev Days",
    category: "Technical Workshop",
    status: "Completed",
    date: "July 12, 2025",
    startDate: "2025-07-12",
    location: "Hands-on Lab • Bhopal, India",
    participants: "180+ Developers",
    banner: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Interactive session exploring AI-assisted software development, rapid prototyping with GitHub Copilot, and automated unit test generation.",
    about: "Students experienced firsthand how GitHub Copilot transforms developer productivity. From refactoring complex functions to generating end-to-end unit tests and Dockerfiles.",
    highlights: [
      "Mastering Copilot prompt engineering for software engineers",
      "Automated test generation & regex parsing drills",
      "GitHub Education student tooling pack walkthrough",
    ],
    challenges: ["Refactor legacy codebase with 100% test coverage using Copilot"],
    partners: ["GitHub Education", "Knowvy Technologies"],
    winningTeams: [],
  },
  {
    slug: "open-source-sprint-q1",
    title: "Open Source Sprint Q1",
    category: "Community PR Sprint",
    status: "Completed",
    date: "January 24, 2026",
    startDate: "2026-01-24",
    location: "Campus Hub • Bhopal, India",
    participants: "210+ Contributors",
    banner: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "A weekend PR sprint guiding student developers to resolve real GitHub issues, review pull requests, and contribute to popular open source repos.",
    about: "Demystified open-source engineering for collegiate developers. Mentors guided students through finding 'good first issues', understanding Git rebase and squash workflows, and adhering to strict open-source review guidelines.",
    highlights: [
      "1-on-1 Pull Request reviews with experienced maintainers",
      "Over 40 first-time PRs merged during the weekend",
      "GSOC & open-source fellowship application masterclass",
    ],
    challenges: ["Merge at least 1 production PR into verified open-source repos"],
    partners: ["Knowvy Open Source Chapter", "GitHub Education"],
    winningTeams: [],
  },
  {
    slug: "aws-builder-day",
    title: "AWS Builder Day",
    category: "Cloud Dev Day",
    status: "Completed",
    date: "December 14, 2025",
    startDate: "2025-12-14",
    location: "Bhopal, Madhya Pradesh",
    participants: "160+ Participants",
    banner: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Deep dive into AWS cloud architecture, container deployments, and hands-on cloud labs for student developers.",
    about: "An intensive architecture masterclass covering AWS Lambda, ECS container services, and S3 event-driven triggers. Attendees deployed live serverless backends with zero downtime.",
    highlights: [
      "Hands-on AWS cloud lab environments",
      "Serverless architecture patterns for student projects",
      "Direct guidance on AWS Certified Cloud Practitioner prep",
    ],
    challenges: ["Build an event-driven image processing pipeline using AWS Lambda"],
    partners: ["Knowvy Technologies"],
    winningTeams: [],
  },
  {
    slug: "codesprint-bhopal",
    title: "CodeSprint Bhopal",
    category: "Competitive Programming",
    status: "Completed",
    date: "March 15, 2026",
    startDate: "2026-03-15",
    location: "Collegiate Campus • Bhopal, India",
    participants: "300+ Coders",
    banner: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Competitive programming and rapid MVP development sprint testing algorithmic efficiency and full-stack deployment skills under time limits.",
    about: "Combined the algorithmic intensity of competitive programming with rapid product execution. Coders solved complex dynamic programming challenges and then had 4 hours to turn their solution into a functional web service.",
    highlights: [
      "Algorithmic challenges benchmarked against strict time constraints",
      "Rapid web MVP deployment judging",
      "Top performers awarded direct interview opportunities",
    ],
    challenges: ["Build and deploy an algorithmic routing engine in under 4 hours"],
    partners: ["Knowvy Technologies", "Unstop"],
    winningTeams: [],
    prizes: "₹50,000 Cash Pool & Swag",
  },
  {
    slug: "miro-meetup-bhopal",
    title: "Miro Meetup Bhopal",
    category: "Design & Systems Meetup",
    status: "Completed",
    date: "September 05, 2025",
    startDate: "2025-09-05",
    location: "Co-working Space • Bhopal, India",
    participants: "140+ Designers & Coders",
    banner: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Visual collaboration meetup focused on system design diagramming, UX wireframing, and product management workflows for student founders.",
    about: "Explored the bridge between software architecture and product design. Attendees mapped end-to-end distributed system diagrams, wireframed mobile experiences, and learned agile sprint planning.",
    highlights: [
      "Hands-on visual system design diagramming",
      "Product wireframing and user journey mapping",
      "Networking circle with local startup founders",
    ],
    challenges: ["Map an end-to-end microservices architecture on Miro in 30 minutes"],
    partners: ["Knowvy Technologies"],
    winningTeams: [],
  },
];

export const opportunitiesData = [
  {
    id: "unstop",
    name: "Unstop",
    badge: "Official Platform Partner",
    officialUrl: "https://unstop.com",
    description: "India's leading platform connecting students with university competitions, case challenges, hackathons, and corporate hiring sprints.",
    curatedTracks: [
      "National Engineering Hackathons by Tech Giants",
      "Corporate Innovation & Hiring Sprints (Tata, Flipkart, Google)",
      "Technical Coding Assessments & Quizzes",
      "Summer Internship Drives",
    ],
    knowvyGuidance: "We curate high-yield national competitions on Unstop and organize internal team matching so members enter with well-balanced skillsets.",
  },
  {
    id: "devfolio",
    name: "Devfolio",
    badge: "India's Premier Builder Platform",
    officialUrl: "https://devfolio.co",
    description: "India's largest community of builders, hosting prominent university hackathons (ETHIndia, InOut, HackOut) and ecosystem micro-grants.",
    curatedTracks: [
      "Top Tier Indian University In-Person Hackathons",
      "Web3, Protocols & Decentralized App Tracks",
      "Devfolio Fellowship & Builder Micro-grants",
      "Direct Access to Venture Scout Networks",
    ],
    knowvyGuidance: "Learn how to craft standout Devfolio profiles, highlight GitHub contributions, and write compelling hackathon project proposals.",
  },
  {
    id: "mlh",
    name: "Major League Hacking (MLH)",
    badge: "Student Hackathon League",
    officialUrl: "https://mlh.io",
    description: "The global student hackathon league empowering over 500,000 student developers worldwide with weekend hackathons and fellowships.",
    curatedTracks: [
      "Official Member Hackathons (Weekly Online & Regional)",
      "MLH Fellowship (12-Week Open Source Remote Internship)",
      "Local Hack Day & Global Hack Week Sprints",
      "GitHub Student Developer Pack Perks",
    ],
    knowvyGuidance: "Knowvy mentors guide members through MLH Fellowship application essays, portfolio audits, and team formation for global MLH hackathons.",
  },
  {
    id: "devpost",
    name: "Devpost",
    badge: "Global Project Hackathons",
    officialUrl: "https://devpost.com",
    description: "The home for developer hackathons globally, hosting virtual competitions powered by OpenAI, AWS, Google Cloud, and tech innovators.",
    curatedTracks: [
      "Global Generative AI & Foundation Model Hackathons",
      "Cloud & Microservices Virtual Competitions",
      "Public Developer Project Showcases & Portfolios",
      "Venture Capital & Grant-Backed Building Sprints",
    ],
    knowvyGuidance: "Knowvy runs demo-day dry runs to help teams refine their 3-minute video pitches and Devpost project writeups before final submission.",
  },
];

/**
 * Authentic Leadership Team from knowvy.xyz
 */
export const teamData = [
  {
    name: "Mohneesh Gupta",
    role: "Founder & Community Lead",
    college: "Knowvy Technologies • Bhopal",
    bio: "Leading Knowvy, building developer networks, organizing tech meetups, and managing industry partnerships.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    skills: ["Community Building", "Developer Relations", "Partnerships", "Event Architecture", "Public Speaking"],
    socials: {
      github: "https://github.com/mohneesh-gupta",
      linkedin: "https://linkedin.com/in/mohneesh-gupta",
      twitter: "https://x.com/mohneesh_gupta1",
    },
    category: "Leadership",
    contribution: "Founder, overarching community roadmap, corporate partnerships, and event orchestration.",
  },
  {
    name: "Om Pandey",
    role: "CTO & Tech Lead",
    college: "Knowvy Technologies • Bhopal",
    bio: "Building web applications, managing servers, and developing new features for Knowvy.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    skills: ["Full-Stack Web", "Server Architecture", "Next.js", "Database Systems", "API Design"],
    socials: {
      github: "https://github.com/student-ompandey",
      linkedin: "https://linkedin.com/in/om-pandey-041717310",
      twitter: "https://x.com/knowvytech",
    },
    category: "Leadership",
    contribution: "Technology infrastructure, server maintenance, web systems, and technical mentorship.",
  },
  {
    name: "Durganand Sah",
    role: "Chief Marketing Officer",
    college: "Knowvy Technologies • Bhopal",
    bio: "Building brand presence, managing marketing campaigns, and expanding our community outreach.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    skills: ["Growth Marketing", "Brand Strategy", "Community Outreach", "Social Media", "Campaigns"],
    socials: {
      github: "https://github.com/Durganand2005",
      linkedin: "https://linkedin.com/in/durganand-sah-491b50253",
      twitter: "https://x.com/knowvytech",
    },
    category: "Leadership",
    contribution: "Brand positioning, marketing distribution, social channels, and partner relations.",
  },
  {
    name: "Naved Mansoori",
    role: "Tech Lead & Platform Architect",
    college: "Knowvy Technologies • Bhopal",
    bio: "Full-stack builder and open-source enthusiast focused on scalable web applications, real-time developer tooling, and modern UI engineering.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
    skills: ["Next.js", "TypeScript", "Three.js", "System Design", "Cloudinary", "APIs"],
    socials: {
      github: "https://github.com/Naved20",
      linkedin: "https://linkedin.com/in/naved-mansoori",
      twitter: "https://x.com/the_blockzen",
    },
    category: "Engineering",
    contribution: "Platform engineering, interactive 3D experiences, Supabase integration, and WebGL graphics.",
  },
];

/**
 * Authentic Collaborators from knowvy.xyz
 */
export const partnersData = [
  {
    name: "Google for Developers",
    category: "Community Partner",
    role: "Developer Tooling & Tech Sprints",
    badge: "Official Community Partner",
  },
  {
    name: "Microsoft for Startups",
    category: "Cloud Partner",
    role: "Azure Cloud Credits & Tech Guidance",
    badge: "Cloud Partner",
  },
  {
    name: "GitHub Education",
    category: "Dev Tooling",
    role: "Student Developer Pack & Open Source",
    badge: "Developer Tooling",
  },
  {
    name: "TIT Bhopal",
    category: "College Chapter",
    role: "On-Ground Campus Events & Venue Partner",
    badge: "College Chapter",
  },
  {
    name: "Unstop",
    category: "Platform Partner",
    role: "National Hackathons & Hiring Challenges",
    badge: "Platform Partner",
  },
  {
    name: "HeyGen",
    category: "AI Video Partner",
    role: "India RoadShow Series Across 9 Cities",
    badge: "RoadShow Partner",
  },
  {
    name: "Vexite Studio",
    category: "Co-Organizer",
    role: "TIC National Hackathon Co-host",
    badge: "Event Partner",
  },
];

/**
 * Real Student Testimonials from knowvy.xyz
 */
export const testimonialsData = [
  {
    quote: "Knowvy Bhopal gave me direct hands-on support. The open source cohort guided my first PR to Vercel, and mentors reviewed my GSOC application step-by-step.",
    author: "Rohit D.",
    role: "Contributed to Vercel / GSOC",
    college: "Google Summer of Code Mentee",
  },
  {
    quote: "Direct access to cloud architectures and community dev days gave me the exact skills needed to crack cloud infrastructure internships.",
    author: "Anjali S.",
    role: "Cloud Systems Specialist",
    college: "AWS Cloud Intern",
  },
  {
    quote: "Building autonomous agents at the Agentic AI Hackathon opened doors to Silicon Valley founders and real product thinking.",
    author: "Vikram S.",
    role: "AI Systems Engineer",
    college: "YC-backed AI Startup",
  },
  {
    quote: "The peer network in Bhopal is unlike any college club. We built production apps, showed our work out loud, and connected with top engineers.",
    author: "Priya M.",
    role: "Full Stack Developer",
    college: "Microsoft Dev Referral",
  },
];

/**
 * Official FAQs from knowvy.xyz
 */
export const faqsData = [
  {
    id: "faq-1",
    question: "What is Knowvy Technologies?",
    answer:
      "Knowvy Technologies is a premium technology ecosystem and student developer community in Bhopal. We organize hackathons, workshops, mentorship cohorts, and networking events to bridge the gap between academic theory and industry engineering standards.",
  },
  {
    id: "faq-2",
    question: "Who can join the community?",
    answer:
      "Any student, self-taught developer, designer, or tech enthusiast! Whether you are coding your first line of JavaScript or building AI agents, Knowvy gives you the stage, mentorship, and peer network to succeed.",
  },
  {
    id: "faq-3",
    question: "Are there fees for events or bootcamps?",
    answer:
      "Most of our community meetups, workshops, and study jams are 100% free. Flagship hackathons provide cash prizes, cloud credits, food, and swag with zero hidden fees.",
  },
  {
    id: "faq-4",
    question: "What is the Campus Ambassador Program?",
    answer:
      "Our campus leads represent Knowvy across universities like MANIT, RGPV, LNCT, VIT Bhopal, and TIT. They host local study jams, run hackathon watch parties, and get early access to speaker slots and mentorship.",
  },
  {
    id: "faq-5",
    question: "How can startups or companies partner with us?",
    answer:
      "We actively collaborate with tech companies, startups, and developer tool platforms for hiring challenges, sponsor tracks, and keynote sessions. Reach out at knowvy.tech@gmail.com or +91 99938 49783.",
  },
];

/**
 * HeyGen India RoadShow Series Details (9 Cities)
 */
export const heyGenRoadShowData = {
  title: "HeyGen India RoadShow Series",
  tagline: "9 Cities. One Mission.",
  subtitle: "Connecting founders, creators, and marketers for real conversations on modern growth and AI video.",
  statement: "This isn't a workshop or a typical product demo. It's a space for real conversations on how you market, create, and scale.",
  hosts: "Led by Knowvy Technologies & HeyGen Ambassadors",
  cities: [
    { number: "01", name: "Jabalpur", state: "Madhya Pradesh", landmark: "Marble Rocks & Dhuandhar Falls", status: "Dates announcing soon" },
    { number: "02", name: "Delhi", state: "Delhi NCR", landmark: "India Gate & Connaught Place", status: "Dates announcing soon" },
    { number: "03", name: "Hyderabad", state: "Telangana", landmark: "Charminar & HITEC City", status: "Dates announcing soon" },
    { number: "04", name: "Chennai", state: "Tamil Nadu", landmark: "Marina Beach & Central Station", status: "Dates announcing soon" },
    { number: "05", name: "Mumbai", state: "Maharashtra", landmark: "Gateway of India & Marine Drive", status: "Dates announcing soon" },
    { number: "06", name: "Pune", state: "Maharashtra", landmark: "Shaniwar Wada & Tech Parks", status: "Dates announcing soon" },
    { number: "07", name: "Bengaluru", state: "Karnataka", landmark: "Vidhana Soudha & Silicon Valley Hub", status: "Dates announcing soon" },
    { number: "08", name: "Bhopal", state: "Madhya Pradesh", landmark: "VIP Upper Lake & Taj-ul-Masajid", status: "Dates announcing soon" },
    { number: "09", name: "Indore", state: "Madhya Pradesh", landmark: "Rajwada Palace & Sarafa", status: "Dates announcing soon" },
  ],
  tracks: [
    {
      number: "01",
      title: "Real talk on how you market today",
      isFlagship: true,
      description: "Open floor for founders and creators to share what's working — and what's not — in their marketing and growth.",
    },
    {
      number: "02",
      title: "AI avatars & video, hands-on",
      isFlagship: false,
      description: "Live walkthroughs of HeyGen's AI video tools — create your first avatar, script, and publish-ready video.",
    },
    {
      number: "03",
      title: "Staying consistent at scale",
      isFlagship: false,
      description: "Strategies for maintaining brand consistency across platforms when you're producing at volume.",
    },
    {
      number: "04",
      title: "Founder-to-founder connections",
      isFlagship: false,
      description: "Structured networking that leads to real collaborations — not just LinkedIn connections.",
    },
    {
      number: "05",
      title: "Open floor",
      isFlagship: false,
      description: "Unstructured time for Q&A, demos, and the conversations that happen after the agenda ends.",
    },
  ],
};

export const galleryData = [
  {
    id: "g1",
    title: "TIC National Hackathon Arena",
    category: "Hackathon",
    caption: "Over 250 student developers hacking overnight during TIC National Hackathon.",
    url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1000&q=80",
    ratio: "wide",
  },
  {
    id: "g2",
    title: "MS Build Bhopal Keynote & Labs",
    category: "Dev Day",
    caption: "Live keynote streaming & cloud labs bringing Microsoft AI to students in Bhopal.",
    url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    ratio: "tall",
  },
  {
    id: "g3",
    title: "Open Source Sprint PR Clinic",
    category: "Workshop",
    caption: "Mentors reviewing pull requests 1-on-1 with collegiate contributors.",
    url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    ratio: "standard",
  },
  {
    id: "g4",
    title: "Agentic AI Demo Day",
    category: "Demo Day",
    caption: "Finalist teams demonstrating autonomous agent workflows to founders and judges.",
    url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1000&q=80",
    ratio: "wide",
  },
  {
    id: "g5",
    title: "Miro Meetup Systems Circle",
    category: "Design",
    caption: "Student tinkerers collaborating on visual systems architecture diagrams.",
    url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
    ratio: "tall",
  },
  {
    id: "g6",
    title: "Awards & Winners Celebration",
    category: "Celebration",
    caption: "Recognizing winning teams with trophy honors, cash prizes, and founder network invites.",
    url: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80",
    ratio: "standard",
  },
];

export const creativeLabData = [
  {
    id: "cl-1",
    title: "Bhopal Cybernetic Campus 2030",
    theme: "Futuristic Indian University Night Network",
    prompt: "Cinematic drone view of an Indian engineering campus at midnight, illuminated by glowing electric blue and violet fiber-optic circuits, student builders collaborating in glass laboratories, dark metallic structures, hyper-realistic, slow orbital pan, 4k.",
    aspectRatio: "16:9",
    mediaUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    type: "Cinematic Visual",
  },
  {
    id: "cl-2",
    title: "The Neural Builder Node",
    theme: "Abstract Community Graph",
    prompt: "Abstract futuristic 3D sphere made of dark obsidian glass and illuminated electric blue filaments representing interconnected student developers, smooth rotational motion, dark studio atmosphere with violet rim light.",
    aspectRatio: "1:1",
    mediaUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    type: "3D Motion Study",
  },
  {
    id: "cl-3",
    title: "TIC Hackathon Energy Horizon",
    theme: "Event Visual Identity",
    prompt: "Slow motion cinematic camera tracking across an ultra-modern hackathon arena with dark metallic desks, luminous terminal screens, students ideating together, electric blue accents, cinematic depth of field.",
    aspectRatio: "16:9",
    mediaUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    type: "Luma Concept",
  },
];
