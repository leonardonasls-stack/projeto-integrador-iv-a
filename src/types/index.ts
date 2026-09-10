export type ProjectCategory = 'Frontend' | 'Fullstack' | 'Backend' | 'Mobile' | 'IHC / UX';

export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  category: ProjectCategory;
  techs: string[];
  githubUrl?: string;
  demoUrl?: string;
  imageUrl: string;
  featured: boolean;
  createdAt: string;
}

export interface User {
  username: string;
  role: 'admin' | 'guest';
  isLoggedIn: boolean;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
}

export * from './profile';
