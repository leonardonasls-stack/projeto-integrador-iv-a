import React from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons';
import { motion } from 'framer-motion';
import { useProfile } from '../../context/ProfileContext';

export const Hero: React.FC = () => {
  const { profile } = useProfile();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="inicio" className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
      {/* Subtle Grid Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[680px] h-[320px] bg-emerald-500/10 blur-[140px] rounded-full pointer-events-none -z-10"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="space-y-8"
        >
          {/* Monospace Status Line */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-surface border border-white/10 text-xs font-mono text-gray-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400">status:</span>
            <span>{profile.statusBadge || 'disponível_para_projetos'}</span>
          </div>

          {/* Editorial Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tighter leading-[1.05] text-balance max-w-4xl">
            {profile.heroTitlePrefix || 'Engenharia de Software'}{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-cyan-400">
              {profile.heroTitleHighlight || 'Backend Python & Frontend Web.'}
            </span>
          </h1>

          {/* Asymmetric 2-Column Split Below Headline */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-4 items-end border-t border-white/10">
            {/* Left: Bio + Actions */}
            <div className="lg:col-span-7 space-y-6 pt-4">
              <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-2xl">
                {profile.heroDescription}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => scrollTo('projetos')}
                  className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-canvas font-semibold text-sm flex items-center gap-2 transition-all hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  <span>Explorar Projetos</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => scrollTo('contato')}
                  className="px-6 py-3 rounded-xl bg-surface hover:bg-surface-elevated text-gray-200 hover:text-white font-medium text-sm border border-white/10 flex items-center gap-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  <Mail className="w-4 h-4 text-emerald-400" />
                  <span>Contato</span>
                </button>

                <div className="flex items-center gap-2 ml-auto sm:ml-2">
                  <a
                    href={profile.githubUrl || 'https://github.com/leonardonasls-stack'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-surface hover:bg-surface-elevated text-gray-400 hover:text-white border border-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                    aria-label="GitHub"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={profile.linkedinUrl || 'https://linkedin.com'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-surface hover:bg-surface-elevated text-gray-400 hover:text-white border border-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                    aria-label="LinkedIn"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Live API Terminal Card */}
            <div className="lg:col-span-5 pt-4">
              <div className="bento-card p-5 rounded-2xl font-mono text-left">
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-gray-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>api_server.py</span>
                  </div>
                </div>

                <pre className="text-xs text-gray-300 leading-relaxed overflow-x-auto">
                  <code>
                    <span className="text-emerald-400">@app.get</span>
                    <span className="text-gray-400">(&quot;/api/v1/status&quot;)</span>
                    {'\n'}
                    <span className="text-cyan-400">async def</span>{' '}
                    <span className="text-white">system_health</span>():
                    {'\n    '}
                    <span className="text-cyan-400">return</span> {'{\n        '}
                    <span className="text-emerald-300">&quot;status&quot;</span>: <span className="text-amber-300">&quot;online&quot;</span>,{'\n        '}
                    <span className="text-emerald-300">&quot;stack&quot;</span>: [<span className="text-amber-300">&quot;Python&quot;</span>, <span className="text-amber-300">&quot;FastAPI&quot;</span>, <span className="text-amber-300">&quot;React&quot;</span>],{'\n        '}
                    <span className="text-emerald-300">&quot;architecture&quot;</span>: <span className="text-amber-300">&quot;clean_scalable&quot;</span>
                    {'\n    }'}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
