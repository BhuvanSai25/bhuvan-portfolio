import { Project, Experience, Skill, Education } from '../types';

export const personalInfo = {
  name: "Bhuvan Sai",
  role: "Software Engineer",
  email: "Bhuvansaibhuvi@gmail.com",
  phone: "+91 9014518858",
  linkedin: "https://linkedin.com/in/bhuvansai25",
  github: "https://github.com/bhuvansai25",
  location: "India",
  bio: "Software Engineer with 2.7+ years of experience in Full-stack application development. I design and build scalable backend services for distributed applications, proficient in Python with a strong foundation in Data Structures and Algorithms.",
  heroTagline: "Building scalable distributed systems & solving complex algorithmic problems."
};

export const skills: Skill[] = [
  // Languages
  { name: "Python", category: "Languages", icon: "python", isConcept: false },
  { name: "SQL", category: "Languages", icon: "sql", isConcept: false },
  { name: "JavaScript", category: "Languages", icon: "javascript", isConcept: false },
  { name: "Java", category: "Languages", icon: "java", isConcept: false },

  // Core
  { name: "DSA", category: "Core", icon: "Algo", isConcept: true },
  { name: "System Design", category: "Core", icon: "Network", isConcept: true },
  { name: "OOPs", category: "Core", icon: "Box", isConcept: true },
  { name: "LLD", category: "Core", icon: "Layers", isConcept: true },
  { name: "REST APIs", category: "Core", icon: "Globe", isConcept: true },
  { name: "Microservices", category: "Core", icon: "Blocks", isConcept: true },
  { name: "Agile", category: "Core", icon: "RefreshCw", isConcept: true },
  { name: "SDLC", category: "Core", icon: "Workflow", isConcept: true },

  // Frontend
  { name: "HTML", category: "Frontend", icon: "html5", isConcept: false },
  { name: "CSS", category: "Frontend", icon: "css3", isConcept: false },
  { name: "React", category: "Frontend", icon: "react", isConcept: false },

  // Cloud & Infra
  { name: "AWS", category: "Cloud & Infra", icon: "aws", isConcept: false },
  { name: "Azure", category: "Cloud & Infra", icon: "azure", isConcept: false },
  { name: "Docker", category: "Cloud & Infra", icon: "docker", isConcept: false },

  // Others
  { name: "Flask", category: "Others", icon: "flask", isConcept: false },
  { name: "Django", category: "Others", icon: "django", isConcept: false },
  { name: "Git", category: "Others", icon: "git", isConcept: false },
  { name: "ServiceNow", category: "Others", icon: "servicenow", isConcept: false },
];

export const experiences: Experience[] = [
  {
    company: "CDW",
    role: "Software Engineer",
    period: "Jul 2023 – Present",
    description: [
      "Reduced compute cost of scheduled reporting jobs by 80% by building an automated cleanup service that detected unused or empty reports and disabled redundant scheduled executions.",
      "Designed and implemented REST APIs for internal services, incorporating idempotent request handling, rate limiting, and structured error responses to improve service reliability.",
      "Implemented asynchronous processing using message queues to decouple long-running tasks from request workflows, preventing API timeouts during peak traffic.",
      "Developed a visualization tool to group contextually related infrastructure alerts (issues) by modeling service dependencies as a graph and applying BFS and Union-Find to identify the root cause and related failures for a bunch of alerts.",
      "Improved production observability by adding structured logging and monitoring dashboards, enabling faster debugging and proactive alerting for system failures.",
      "Developed dynamic, asynchronous client-side components to handle state management and real-time form validations, improving data capture accuracy by over 30% and enhancing the overall user experience.",
      "Mentored 3 junior developers and enforced rigorous code review standards, resulting in a 20% reduction in production bugs over six months."
    ]
  },
  {
    company: "CDW",
    role: "Full Stack Developer (Intern)",
    period: "Feb 2023 – May 2023",
    description: [
      "Completed intensive training on full-stack technologies including Java Spring Boot, React, and Node.js.",
      "Gained hands-on experience in the full software development lifecycle (SDLC) and building dynamic web applications."
    ]
  }
];

export const projects: Project[] = [
  {
    title: "Pathfinding & Urban Navigation Engine",
    category: "Algorithm",
    description: "A high-performance interactive algorithm visualizer for graph algorithms on grids and real-world maps.",
    tags: ["React", "Leaflet", "Algorithms", "Data Structures"],
    features: [
      "Implemented 7+ algorithms (Dijkstra, A*, BFS..etc) using custom MinHeap data structures, reducing time complexity from O(V²) to O(E log V).",
      "Integrated OpenStreetMap to fetch live road network data.",
      "Visualized real-world routing and navigation logic."
    ],
    github: "https://github.com/bhuvansai25",
    link: "https://path-visualizer-navigation.vercel.app/"
  },
  {
    title: "Agro Guide - Crop Recommendation AI",
    category: "ML/AI",
    description: "An AI-driven system that identifies critical factors influencing crop suitability and recommends the best crops and fertilizers.",
    tags: ["Python", "Machine Learning", "Pandas", "Data Vis"],
    features: [
      "Conducted in-depth analysis on large agricultural datasets.",
      "Performed feature engineering to support crop recommendation logic.",
      "Published patent 'Indian Crop and Fertilizer Recommendation System using AI and ML'."
    ],
    github: "https://github.com/bhuvansai25",
    link: "" 
  }
];

export const education: Education[] = [
  {
    school: "BMS Institute of Technology, Bengaluru",
    degree: "B.E. Information Technology",
    year: "2019 – 2023",
    score: "CGPA: 8.1"
  },
  {
    school: "Narayana Junior College",
    degree: "Intermediate",
    year: "2017 – 2019",
    score: "Percentage: 94.2%"
  }
];