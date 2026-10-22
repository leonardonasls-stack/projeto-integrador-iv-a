import React from 'react';
import { ToastProvider } from './context/ToastContext';
import { ProjectProvider } from './context/ProjectContext';
import { ProfileProvider } from './context/ProfileContext';
import { SkillProvider } from './context/SkillContext';

import { ToastContainer } from './components/ui/ToastContainer';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/portfolio/Hero';
import { AboutSection } from './components/portfolio/AboutSection';
import { TechStack } from './components/portfolio/TechStack';
import { ProjectGrid } from './components/portfolio/ProjectGrid';
import { ContactSection } from './components/portfolio/ContactSection';
import { Footer } from './components/layout/Footer';
import { CookieConsent } from './components/ui/CookieConsent';

const PortfolioApp: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white flex flex-col font-sans">
      <ToastContainer />
      
      {/* Navigation Header */}
      <Navbar />

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

      {/* Modais & Overlays */}
      <CookieConsent />
    </div>
  );
};

export default function App() {
  return (
    <ToastProvider>
      <ProjectProvider>
        <SkillProvider>
          <ProfileProvider>
            <PortfolioApp />
          </ProfileProvider>
        </SkillProvider>
      </ProjectProvider>
    </ToastProvider>
  );
}
