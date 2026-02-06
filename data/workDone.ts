export interface WorkDone {
  id: number;
  imageUrl: string;
  title: string;
  category: string;
  description: string;
  projectUrl?: string;
}

export const workDoneData: WorkDone[] = [
  { 
    id: 1, 
    imageUrl: 'https://assets.zyrosite.com/Y4LDM1z2v9F5q3eW/screenshot-2025-12-03-3.15.28-am-HMCI9A1xWKFYshnM.png', 
    title: 'Drconnexion Foundation Website', 
    category: 'Non-Profit Web Development', 
    description: 'A responsive website for a non-profit dedicated to empowering entrepreneurs in the Democratic Republic of the Congo.',
    projectUrl: 'https://www.drconnexion.org/'
  },
  { 
    id: 2, 
    imageUrl: 'https://assets.zyrosite.com/Y4LDM1z2v9F5q3eW/screenshot-2025-12-03-3.19.20-am-zekIJaqelvyCKVPv.png', 
    title: 'DRC Forum USA', 
    category: 'Web Development & Branding', 
    description: 'DRC Forum USA LLC is an organization dedicated to uniting stakeholders to address challenges and unlock the immense potential of the Democratic Republic of Congo.',
    projectUrl: 'https://www.drcforum-usa.com/'
  },
  { 
    id: 3, 
    imageUrl: 'https://assets.zyrosite.com/Y4LDM1z2v9F5q3eW/screenshot-2025-12-03-3.22.02-am-8fkib6X6CfT3Q6xb.png', 
    title: 'Otokondable Consulting Website', 
    category: 'Corporate Website Design', 
    description: 'A sleek, professional corporate website for a consulting firm, showcasing their services and expertise to a global audience.',
    projectUrl: 'https://www.otokondable.com/'
  },
  { 
    id: 4, 
    imageUrl: 'https://assets.zyrosite.com/Y4LDM1z2v9F5q3eW/screenshot-2025-12-03-3.11.48-am-Jii3sncNoi3yKXso.png', 
    title: 'Africa Assistance NGO Platform', 
    category: 'Non-Profit Web Development', 
    description: 'a pan-African network uniting NGOs to amplify social impact. We champion democratic collaboration, equitable resource distribution, and coordinated volunteer support to build a stronger future for the continent.',
    projectUrl: 'https://www.africa-assistance.org/'
  },
  {
    id: 5,
    imageUrl: 'https://assets.zyrosite.com/Y4LDM1z2v9F5q3eW/screenshot-2025-12-03-3.33.09-am-tDzEeKs3B9Pq3Dc2.png',
    title: 'Aya Khan Consultant Portfolio',
    category: 'Portfolio & Web Design',
    description: 'A modern and elegant portfolio website for an independent consultant, highlighting their skills, projects, and professional achievements.',
    projectUrl: 'https://www.ayakhanconsultant.com/'
  },
  {
    id: 6,
    imageUrl: 'https://assets.zyrosite.com/Y4LDM1z2v9F5q3eW/screenshot-2025-12-03-2.58.37-am-ckcL9g6sN34cch42.png',
    title: 'Canacu',
    category: 'NGO & Community Development',
    description: 'Official website for the Congolese NGO CANACU, dedicated to sustainable and inclusive development through a participatory approach involving local communities.',
    projectUrl: 'https://www.canacu.org/'
  }
];