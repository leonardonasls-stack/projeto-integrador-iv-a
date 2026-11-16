import React from 'react';
import { MotionConfig } from 'framer-motion';
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
    <div className="min-h-screen bg-canvas text-gray-100 selection:bg-accent selection:text-canvas flex flex-col font-sans">
      <ToastContainer />
      
      {/* Navigation Header */}
      <Navbar />

      {/* Main Sections */}
      <main className="grow">
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
    <MotionConfig reducedMotion="user">
      <ToastProvider>
        <ProjectProvider>
          <SkillProvider>
            <ProfileProvider>
              <PortfolioApp />
            </ProfileProvider>
          </SkillProvider>
        </ProjectProvider>
      </ToastProvider>
    </MotionConfig>
  );
}
