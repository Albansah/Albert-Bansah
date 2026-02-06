import type { Freelancer } from '../types';

export const freelancersData: Freelancer[] = [
  { 
    id: 1, 
    name: 'Albert Bansah', 
    avatarUrl: 'https://media.licdn.com/dms/image/v2/D4E03AQG5mOfqv6rT7w/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1727032624944?e=1765411200&v=beta&t=5U6tpVHGBvaCwoo8hbnyYAOUoQmYpb_ykB9slbx3c2I', 
    skill: 'Web Developer & AI Expert, CEO of Albansah Platform', 
    rating: 4.9, 
    reviews: 152, 
    price: 110,
    bio: "Expert Web Developer specializing in Artificial Intelligence. I build intelligent, responsive web applications and machine learning models to solve complex business problems. Passionate about leveraging cutting-edge technology to create powerful, scalable solutions.\n\nFrom crafting dynamic user interfaces with modern frameworks to deploying predictive AI models, I deliver end-to-end solutions that drive innovation and growth.",
    skills: ['Python', 'TensorFlow', 'PyTorch', 'React', 'Node.js', 'Next.js', 'Cloud Computing'],
    portfolio: [
        { id: 1, imageUrl: 'https://images.unsplash.com/photo-1555774698-0b77e0ab232f?q=80&w=1770&auto=format&fit=crop', title: 'AI-Powered Chatbot UI' },
        { id: 2, imageUrl: 'https://images.unsplash.com/photo-1547027952-03c3b5d27807?q=80&w=1850&auto=format&fit=crop', title: 'E-commerce Recommendation Engine' },
        { id: 3, imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1770&auto=format&fit=crop', title: 'Predictive Analytics Dashboard' },
        { id: 4, imageUrl: 'https://images.unsplash.com/photo-1618423691383-207044015f02?q=80&w=2070&auto=format&fit=crop', title: 'Drconnexion Foundation Website' }
    ]
  },
  { 
    id: 2, 
    name: 'Destin Kitongo', 
    avatarUrl: 'https://assets.zyrosite.com/Yyv7KVN7a4u39pBV/screenshot-2025-11-04-3.06.50-pm-QePGN5nM3zYgkTFN.png', 
    skill: 'Graphic Designer', 
    rating: 5.0, 
    reviews: 95, 
    price: 80,
    bio: "Creative and detail-oriented Graphic Designer with a passion for crafting visually stunning designs. I specialize in branding, logo design, and marketing materials that capture attention and communicate messages effectively.\n\nMy design process is collaborative, focusing on understanding your brand's essence to forge a unique visual identity that stands out in a crowded marketplace.",
    skills: ['Branding', 'Logo Design', 'Adobe Illustrator', 'Adobe Photoshop', 'UI/UX Design', 'Figma'],
    portfolio: [
        { id: 1, imageUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1770&auto=format&fit=crop', title: 'Brand Identity for Tech Startup' },
        { id: 2, imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1770&auto=format&fit=crop', title: 'Data-driven Infographics' },
        { id: 3, imageUrl: 'https://images.unsplash.com/photo-1558502924-f7a3fb1b426b?q=80&w=1887&auto=format&fit=crop', title: 'Social Media Campaign Visuals' },
    ]
  },
  { 
    id: 3, 
    name: 'George Owoso', 
    avatarUrl: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=1887&auto=format&fit=crop', 
    skill: 'Full-Stack Developer', 
    rating: 4.8, 
    reviews: 215, 
    price: 95,
    bio: "Senior Full-Stack Developer proficient in the MERN stack (MongoDB, Express, React, Node.js). I build robust, scalable, and high-performance web applications from the ground up.\n\nI love tackling challenging problems and am dedicated to writing clean, efficient, and maintainable code. Let's collaborate and build something amazing together.",
    skills: ['React', 'Node.js', 'Express', 'MongoDB', 'TypeScript', 'GraphQL', 'Docker', 'AWS'],
    portfolio: [
        { id: 1, imageUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1770&auto=format&fit=crop', title: 'SaaS Platform Development' },
        { id: 2, imageUrl: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=1932&auto=format&fit=crop', title: 'Startup Landing Page' },
        { id: 3, imageUrl: 'https://images.unsplash.com/photo-1587614295999-6c1c13675127?q=80&w=1935&auto=format&fit=crop', title: 'Custom E-commerce Site' },
    ]
  },
  { 
    id: 4, 
    name: 'Alicia Bruna', 
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop', 
    skill: 'Content Writer', 
    rating: 4.9, 
    reviews: 180, 
    price: 55,
    bio: "Experienced content writer and editor with a knack for storytelling. I create compelling blog posts, articles, website copy, and marketing materials that engage audiences and drive business results.\n\nMy writing is SEO-friendly and tailored to capture your brand's unique voice, ensuring it resonates deeply with your target audience.",
    skills: ['Content Writing', 'Copywriting', 'SEO', 'Editing', 'Proofreading', 'Blogging', 'Content Strategy'],
    portfolio: [
        { id: 1, imageUrl: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=1770&auto=format&fit=crop', title: 'SEO Content Strategy Report' },
        { id: 2, imageUrl: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=1770&auto=format&fit=crop', title: 'B2B Tech Blog Series' },
        { id: 3, imageUrl: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1770&auto=format&fit=crop', title: 'Website Content Overhaul' },
    ]
  },
  {
    id: 5,
    name: 'Alfredo Liba',
    avatarUrl: 'https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?q=80&w=1887&auto=format&fit=crop',
    skill: 'SEO Specialist',
    rating: 5.0,
    reviews: 165,
    price: 70,
    bio: "Results-driven SEO specialist with a proven track record of increasing organic traffic and improving search engine rankings. I conduct comprehensive keyword research, on-page and off-page optimization, and technical SEO audits to boost your online visibility.\n\nMy strategies are data-driven and designed for long-term, sustainable growth in a competitive digital landscape.",
    skills: ['SEO Strategy', 'Keyword Research', 'On-Page SEO', 'Link Building', 'Technical SEO', 'Google Analytics', 'SEMrush'],
    portfolio: [
        { id: 1, imageUrl: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=1770&auto=format&fit=crop', title: 'E-commerce SEO Audit' },
        { id: 2, imageUrl: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=1770&auto=format&fit=crop', title: 'Local SEO Growth Campaign' },
        { id: 3, imageUrl: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1770&auto=format&fit=crop', title: 'Content Gap Analysis' },
    ]
  }
];