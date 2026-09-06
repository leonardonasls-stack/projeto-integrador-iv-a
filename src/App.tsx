import React, { useState } from 'react';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { ProjectProvider } from './context/ProjectContext';
import { ProfileProvider } from './context/ProfileContext';

import { ToastContainer } from './components/ui/ToastContainer';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/portfolio/Hero';
import { AboutSection } from './components/portfolio/AboutSection';
import { TechStack } from './components/portfolio/TechStack';
import { ProjectGrid } from './components/portfolio/ProjectGrid';
import { ContactSection } from './components/portfolio/ContactSection';
import { Footer } from './components/layout/Footer';
import { LoginModal } from './components/admin/LoginModal';
import { AdminDashboardModal } from './components/admin/AdminDashboardModal';

const PortfolioApp: React.FC = () => {
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white flex flex-col font-sans">
      <ToastContainer />
      
      {/* Navigation Header */}
      <Navbar onOpenAdminDashboard={() => setIsAdminDashboardOpen(true)} />

      {/* Main Sections */}
      <main className="flex-grow">
        <Hero />
        <AboutSection />
        <TechStack />
        <ProjectGrid />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modais */}
      <LoginModal />
      <AdminDashboardModal
        isOpen={isAdminDashboardOpen}
        onClose={() => setIsAdminDashboardOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <ProjectProvider>
          <ProfileProvider>
            <PortfolioApp />
          </ProfileProvider>
        </ProjectProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
