import {
  novalearn,
  ponggame,
  portfolio,
  backend,
  creator,
  ibm,
  hr,
  cp,
  fcc,
  mobile,
  web,
  ideas,
  concepts,
  designs,
  code,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "achievement",
    title: "Achievement",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Software Developer",
    icon: web,
  },
  {
    title: "Web Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Full Stack Web Developer",
    icon: creator,
  },
];

const achievements = [
  {
    title: ["Responsive Web Design", "JavaScript"],
    company_name: "freeCodeCamp",
    icon: fcc,
    iconBg: "#383E56",
    date: "May 2024",
    points: ["Credential ID: jayant-potdar-rwd"],
    credential: [
      "https://freecodecamp.org/certification/Jayant-Potdar/responsive-web-design",
    ],
  },
  {
    title: [
      "Python (Basic) Certificate",
      "SQL (Basic) Certificate",
      "CSS (Basic) Certificate",
    ],
    company_name: "HackerRank",
    icon: hr,
    iconBg: "#E6DEDD",
    date: "Apr 2025",
    points: [
      "Credential ID: b011ba865ccf",
      "Credential ID: 633d92ea00fe",
      "Credential ID: 633d92ea00fe",
    ],
    credential: [
      "https://www.hackerrank.com/certificates/b011ba865ccf",
      "https://www.hackerrank.com/certificates/633d92ea00fe",
      "https://www.hackerrank.com/certificates/633d92ea00fe",
    ],
  },
  {
    title: ["IT Specialist - HTML and CSS"],
    company_name: "Certiport",
    icon: cp,
    iconBg: "#383E56",
    date: "Apr 2025",
    points: ["Credential ID: c59ff7d1-7af2-4dcb-8c57-d2bd6a6d1f44"],
    credential: [
      "https://www.credly.com/badges/c59ff7d1-7af2-4dcb-8c57-d2bd6a6d1f44/linked_in_profile",
    ],
  },
  {
    title: ["Introduction to Software Engineering"],
    company_name: "IBM",
    icon: ibm,
    iconBg: "#E6DEDD",
    date: "Jun 2025",
    points: ["Credential ID: XCJFA94Z1UQ2"],
    credential: [
      "https://www.coursera.org/account/accomplishments/records/XCJFA94Z1UQ2",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Jayant proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Jayant does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "Jayant boosted our website traffic by 50% through his smart optimization. We are Truly grateful!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "Nova-Learn",
    description:
      "NovaLearn is an AI-powered platform that creates personalized learning paths with interactive content and quizzes. Designed with a futuristic 3D UI, it makes learning immersive, efficient, and goal-driven. 🚀",
    tags: [
      {
        name: "node",
        color: "blue-text-gradient",
      },
      {
        name: "spline",
        color: "green-text-gradient",
      },
      {
        name: "JavaScript",
        color: "pink-text-gradient",
      },
      {
        name: "Flask",
        color: "violet-text-gradient",
      },
      {
        name: "sqlite3",
        color: "orange-text-gradient",
      },
    ],
    image: novalearn,
    source_code_link: "https://nova-learn-jayant.vercel.app/",
  },
  {
    name: "Multiplayer Pong Game",
    description:
      "Multiplayer Pong Game with three modes: Play with a friend online, play side-by-side on the same screen, or challenge an AI opponent. Fast, fun, and competitive—classic Pong with modern multiplayer options! 🕹️🔥",
    tags: [
      {
        name: "socket",
        color: "blue-text-gradient",
      },
      {
        name: "express",
        color: "green-text-gradient",
      },
      {
        name: "JavaScript",
        color: "pink-text-gradient",
      },
    ],
    image: ponggame,
    source_code_link: "https://github.com/Jayant-1/Multiplayer_Pong_Game",
  },
  {
    name: "3D Portfolio",
    description:
      "A dynamic React JS portfolio with immersive 3D graphics and smooth animations for an engaging user experience. Includes interactive sections like About, Education, Projects, Connect, and Contact. 🎨💻",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "tailwind",
        color: "green-text-gradient",
      },
      {
        name: "framer-motion",
        color: "pink-text-gradient",
      },
      {
        name: "three.js",
        color: "orange-text-gradient",
      },
      {
        name: "spline",
        color: "violet-text-gradient",
      },
    ],
    image: portfolio,
    source_code_link: "https://jayantpotdar.vercel.app/",
  },
];

const words = [
  { text: "Ideas", imgPath: ideas, font: "Arial, sans-serif" },
  { text: "Concepts", imgPath: concepts, font: "'Courier New', Courier, monospace" },
  { text: "Designs", imgPath: designs, font: "'Times New Roman', Times, serif" },
  { text: "Code", imgPath: code, font: "'Fira Mono', monospace" },
  { text: "Ideas", imgPath: ideas, font: "'Comic Sans MS', cursive, sans-serif" },
  { text: "Concepts", imgPath: concepts, font: "'Roboto', sans-serif" },
  { text: "Designs", imgPath: designs, font: "'Georgia', serif" },
  { text: "Code", imgPath: code, font: "'Source Code Pro', monospace" },
];

export { achievements, projects, services, testimonials, words };
