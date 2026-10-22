import React from 'react';
import { ArrowRight, Mail, CheckCircle2, Layout, ShieldCheck } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons';
import { motion } from 'framer-motion';
import { useProfile } from '../../context/ProfileContext';

export const Hero: React.FC = () => {
  const { profile } = useProfile();
  const scrollToProjetos = () => {
    const el = document.getElementById('projetos');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContato = () => {
    const el = document.getElementById('contato');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="inicio" className="relative pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden">
      {/* Background Cyber Glow Gradients */}
      <div aria-hidden="true" className="absolute top-1/4 left-1/2 -translate-x-1/2 w-175 h-87.5 bg-linear-to-r from-violet-600/15 via-indigo-600/10 to-sky-500/15 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">

          {/* Bento Tile 1: Main Presentation & Headline (8 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-12 lg:col-span-7 bento-card p-8 md:p-10 rounded-3xl flex flex-col justify-between text-left relative"
          >
            <div className="space-y-6">
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-950/60 border border-violet-500/30 text-violet-200 text-xs font-semibold backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse shadow-sm shadow-sky-400" />
                <span>{profile.statusBadge || 'Desenvolvedor Full Stack | Python & React'}</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                {profile.heroTitlePrefix || 'Desenvolvedor de Software'}{' '}
                <span className="bg-linear-to-r from-violet-400 via-indigo-300 to-sky-400 bg-clip-text text-transparent">
                  {profile.heroTitleHighlight || 'Backend Python & Frontend Web'}
                </span>
              </h1>

              {/* Bio Description */}
              <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed font-normal">
                {profile.heroDescription}
              </p>
            </div>

            {/* Action Buttons & Socials */}
            <div className="pt-8 flex flex-wrap items-center gap-4 border-t border-white/5 mt-6">
              <button
                onClick={scrollToProjetos}
                className="w-full sm:w-auto justify-center px-6 py-3.5 rounded-2xl bg-linear-to-r from-violet-600 via-indigo-600 to-sky-500 hover:from-violet-500 hover:to-sky-400 text-white font-semibold text-xs tracking-wide shadow-lg shadow-violet-600/30 flex items-center gap-2 group transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-violet-400"
              >
                <span>Explorar Projetos</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={scrollToContato}
                className="w-full sm:w-auto justify-center px-6 py-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-xs border border-white/10 transition-all flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-violet-400"
              >
                <Mail className="w-4 h-4 text-sky-400" />
                <span>Entrar em Contato</span>
              </button>

              <div className="flex items-center gap-2 ml-auto">
                <a
                  href={profile.githubUrl || "https://github.com/leonardonasls-stack"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 transition-colors"
                  aria-label="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={profile.linkedinUrl || "https://linkedin.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 transition-colors"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Bento Tile 2: Live API Terminal (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="md:col-span-12 lg:col-span-5 bento-card p-6 rounded-3xl flex flex-col justify-between text-left font-mono relative overflow-hidden"
          >
            {/* Terminal Header */}
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                  <span>api_server.py</span>
                </div>
              </div>

              {/* Code Snippet */}
              <div className="space-y-2 text-xs text-slate-300 leading-relaxed overflow-x-auto">
                <p>
                  <span className="text-violet-400">from</span> <span className="text-white">fastapi</span> <span className="text-violet-400">import</span> <span className="text-sky-300">FastAPI</span>
                </p>
                <p>
                  <span className="text-violet-400">from</span> <span className="text-white">pydantic</span> <span className="text-violet-400">import</span> <span className="text-sky-300">BaseModel</span>
                </p>
                <p className="text-slate-500 pt-1"># Inicialização da API assíncrona</p>
                <p>
                  <span className="text-sky-300">app</span> = <span className="text-amber-300">FastAPI</span>(title=<span className="text-emerald-400">"Portfolio API"</span>, version=<span className="text-emerald-400">"2.0"</span>)
                </p>
                <p className="pt-2">
                  <span className="text-violet-400">@app.get</span>(<span className="text-emerald-400">"/api/v1/developer"</span>)
                </p>
                <p>
                  <span className="text-violet-400">async def</span> <span className="text-sky-400">get_profile</span>():
                </p>
                <p className="pl-4">
                  <span className="text-violet-400">return</span> &#123;
                </p>
                <p className="pl-8 text-slate-200">
                  <span className="text-sky-300">"developer"</span>: <span className="text-emerald-400">"Leonardo Nascimento"</span>,
                </p>
                <p className="pl-8 text-slate-200">
                  <span className="text-sky-300">"focus"</span>: [<span className="text-amber-300">"FastAPI"</span>, <span className="text-amber-300">"React 19"</span>, <span className="text-amber-300">"Docker"</span>],
                </p>
                <p className="pl-8 text-slate-200">
                  <span className="text-sky-300">"status"</span>: <span className="text-emerald-400">"200 OK · Available"</span>
                </p>
                <p className="pl-4">&#125;</p>
              </div>
            </div>

            {/* Terminal Footer Status */}
            <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Uvicorn running on <span className="text-sky-400">0.0.0.0:8000</span></span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px]">
                Async Ready
              </span>
            </div>
          </motion.div>

          {/* Bento Tile 3: Key Pillar 1 - FastAPI & Async Architecture (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="md:col-span-4 bento-card p-6 rounded-3xl text-left space-y-3"
          >
            <div className="w-10 h-10 rounded-2xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">APIs RESTful de Alta Performance</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Desenvolvimento de rotas assíncronas com FastAPI, schemas tipados com Pydantic v2 e persistência relacional com SQLAlchemy.
            </p>
          </motion.div>

          {/* Bento Tile 4: Key Pillar 2 - Modern Frontend (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-4 bento-card p-6 rounded-3xl text-left space-y-3"
          >
            <div className="w-10 h-10 rounded-2xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Layout className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Interfaces Reativas &amp; Design System</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Criação de SPAs modernas com React 19, TypeScript rigoroso, estilização com Tailwind CSS e animações com Framer Motion.
            </p>
          </motion.div>

          {/* Bento Tile 5: Key Pillar 3 - Clean Architecture (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="md:col-span-4 bento-card p-6 rounded-3xl text-left space-y-3"
          >
            <div className="w-10 h-10 rounded-2xl bg-fuchsia-500/20 border border-fuchsia-500/30 flex items-center justify-center text-fuchsia-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Qualidade &amp; Arquitetura Limpa</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Aplicações estruturadas, microsserviços conteinerizados com Docker e documentação Swagger/OpenAPI automatizada.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
