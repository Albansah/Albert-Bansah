import * as React from 'react';

export interface User {
  id: string;
  email: string;
  role: 'client' | 'freelancer';
  stripe_onboarding_complete: boolean;
  onboarding_complete: boolean;
  full_name?: string;
  static_profile_id?: string;
}

export interface Freelancer {
  id: number;
  name: string;
  avatarUrl: string;
  skill: string;
  rating: number;
  reviews: number;
  price: number;
  bio: string;
  skills: string[];
  portfolio: { id: number; imageUrl: string; title: string; }[];
}

export interface Category {
  id: number;
  name: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  description: string;
}

export interface Job {
  id: string; // UUID from database
  title: string;
  description: string;
  category: string;
  budget: number;
  duration: string;
  skills: string[];
  clientId?: string; // Corresponds to User ID
  created_at?: string;
}

export interface JobApplication {
  id: string; // UUID from database
  jobId: string;
  freelancerId?: string; // Corresponds to User ID
  proposal: string;
  resumeFileName: string;
  timestamp: number;
  created_at?: string;
  status?: 'Pending' | 'Reviewed' | 'Accepted' | 'Rejected';
}