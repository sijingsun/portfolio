export type Project = {
  id: number;
  title: string;
  role: string;
  year: string;
  description: string;
  detailDescription?: string;
  image?: string;
  video?: string;
};

export const projects: Project[] = [
  {
    id: 1,
    title: "Amazon Quick Spaces",
    role: "Lead Designer",
    year: "2025—Present",
    description:
      "Led design for Spaces — a Gen AI workspace that turns conversations into real outputs: reports, dashboards, and artifacts that last.",
    detailDescription:
      "At Amazon Quick, I led design for Spaces, a Gen AI workspace for enterprise teams. Spaces reframes how people work with Gen AI by shifting the focus from back and forth chat to durable outputs. Instead of treating chat as the end state, Spaces helps users move from conversations to structured artifacts such as research reports, dashboards, images, and other generated outputs, all grounded in scoped enterprise data.",
    image: "https://www.dropbox.com/scl/fi/1o0x9u586p3p3ygyfnmja/clairlogo.png?rlkey=wtbqb6pg7dduq3t3empm63rh2&st=f2e9y410&raw=1",
    video:
      "https://dl.dropboxusercontent.com/scl/fi/jlu921qkinp9aesj9ouj9/Spaces-video.webm?rlkey=vlofmt3t1pl9qg25zzcsgfqgo&st=x2rri4l0&dl=1",
  },
  {
    id: 2,
    title: "Build with AI",
    role: "Lead Designer",
    year: "2025—Present",
    description:
      "Agent setup was broken. I fixed it. Led the first Build with AI experience in Amazon Q, making agent creation something people actually use.",
    detailDescription:
      "When building AI agents, users often struggled with complex configuration, technical language, and unclear setup steps. With the belief that AI assistance should be the default, I led the first Build with AI experience in Amazon Quick Agents. The goal was to make agent creation feel guided and intuitive, reducing setup friction and increasing confidence so more users could successfully create and adopt agents.",
    image:
      "https://www.dropbox.com/scl/fi/ggtu8x9n9bkhiuv9rpvp2/ai-user-interactions.png?rlkey=naczdbx0wram5atu3qze754ho&st=r0h07a4x&raw=1",
    video:
      "https://dl.dropboxusercontent.com/scl/fi/g992ot110nb96rx4hzmrz/build-with-AI.mov?rlkey=ja9gq7e0ssgso0eqrlgkxajyd&st=ab2ehs0l&dl=1",
  },
  {
    id: 3,
    title: "C3 Generative AI",
    role: "Art Director",
    year: "2023",
    description:
      "Founding designer. Three months. Shipped a full enterprise knowledge copilot from zero.",
    image:
      "https://dl.dropboxusercontent.com/scl/fi/eny037xrbovvfj0vbbtgu/c3-gen-ai.png?rlkey=a78c4nxphmas2gazmk1v6oicu&st=nn85inoj&raw=1",
  },
  {
    id: 4,
    title: "C3.AI Prompt engineering",
    role: "Photographer",
    year: "2023-2024",
    description:
      "Designed tools that let anyone — technical or not — configure LLMs and evaluate outputs.",
    image:
      "https://dl.dropboxusercontent.com/scl/fi/lxq5ddwat231ht8zpzwhs/LLM.png?rlkey=7vbces7dkyy4a25c1q859sano&st=77o7uc01&raw=1",
  },
  {
    id: 5,
    title: "Kumo",
    role: "Brand Designer",
    year: "2025",
    description:
      "An AI companion for emotional reflection. Slows you down. Builds self-awareness. Multiple international design awards.",
    image:
      "https://dl.dropboxusercontent.com/scl/fi/1xgu1qu54mya2lwa2gsbp/kumo.jpg?rlkey=j1syilygzqqs4k5xqum6v7awc&st=g4thvl6a&raw=1",
  },
];