import React from 'react';
import { ArrowRight, Mail, Download, Sparkles, CheckCircle2, Layout, ShieldCheck } from 'lucide-react';
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
    <section id="inicio" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Main Text Content (7 columns) */}
          <div className="lg:col-span-7 space-y-6 text-left">

            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Disponível para Novas Oportunidades & Projetos</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]"
            >
              {profile.heroTitlePrefix || 'Desenvolvedor de Software'}{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
                {profile.heroTitleHighlight || 'Backend Python & Frontend Web'}
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-slate-300 max-w-2xl leading-relaxed font-normal"
            >
              {profile.heroDescription}
            </motion.p>

            {/* Highlights / Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-2 text-sm text-slate-300"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>APIs RESTful (Async/Await)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Layout className="w-4 h-4 text-teal-400" />
                <span>Validação com Pydantic v2</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-indigo-400" />
                <span>Arquitetura Limpa & Swagger</span>
              </div>
            </motion.div>

            {/* Call to Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              <button
                onClick={scrollToProjetos}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-emerald-600/20 flex items-center gap-2 group transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                <span>Explorar Projetos Python</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={scrollToContato}
                className="px-6 py-3.5 rounded-xl glass-panel text-slate-200 hover:text-white hover:bg-slate-800/80 font-semibold text-sm border border-slate-700 transition-all flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>Entrar em Contato</span>
              </button>

              <button
                onClick={() => alert('Em breve! O currículo completo estará disponível para download.')}
                className="p-3.5 rounded-xl glass-panel text-slate-400 hover:text-white border border-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400"
                title="Baixar Currículo (PDF)"
                aria-label="Baixar Currículo em formato PDF"
              >
                <Download className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center gap-4 pt-4 text-slate-400 text-xs font-medium"
            >
              <span>Conecte-se:</span>
              <a
                href="https://github.com/leonardonasls-stack"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-slate-600 hover:text-white transition-colors"
                aria-label="Perfil no GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-slate-600 hover:text-white transition-colors"
                aria-label="Perfil no LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </motion.div>

          </div>

          {/* Hero Visual Display (5 columns) */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative mx-auto max-w-sm lg:max-w-none"
            >
              <div className="glass-panel p-6 rounded-2xl border border-slate-800 shadow-2xl space-y-4 text-left relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-xs font-mono text-emerald-400 font-semibold">main_api.py</span>
                </div>

                <div className="font-mono text-xs text-slate-300 space-y-1.5 leading-relaxed">
                  <p className="text-purple-400">
                    <span className="text-indigo-400">from</span> fastapi <span className="text-indigo-400">import</span> FastAPI, Depends
                  </p>
                  <p className="text-purple-400">
                    <span className="text-indigo-400">from</span> pydantic <span className="text-indigo-400">import</span> BaseModel
                  </p>
                  <p className="text-slate-500 pt-1"># API FastAPI em Python</p>
                  <p>
                    app = <span className="text-amber-300">FastAPI</span>(title=<span className="text-emerald-300">"Portfolio API"</span>)
                  </p>
                  <p className="text-indigo-400 pt-1">
                    <span className="text-purple-400">@app.get</span>(<span className="text-emerald-300">"/api/v1/developer"</span>)
                  </p>
                  <p>
                    <span className="text-purple-400">async def</span> <span className="text-blue-400">get_profile</span>():
                  </p>
                  <p className="pl-4">
                    <span className="text-purple-400">return</span> &#123;
                  </p>
                  <p className="pl-8">
                    <span className="text-emerald-300">"name"</span>: <span className="text-emerald-300">"Leonardo Nascimento"</span>,
                  </p>
                  <p className="pl-8">
                    <span className="text-emerald-300">"role"</span>: <span className="text-emerald-300">"Python & FastAPI Dev"</span>,
                  </p>
                  <p className="pl-8">
                    <span className="text-emerald-300">"stack"</span>: [<span className="text-amber-300">"Python 3.12"</span>, <span className="text-amber-300">"FastAPI"</span>, <span className="text-amber-300">"PostgreSQL"</span>],
                  </p>
                  <p className="pl-8">
                    <span className="text-emerald-300">"status"</span>: <span className="text-emerald-300">"200 OK - Active"</span>
                  </p>
                  <p className="pl-4">&#125;</p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>Focus: <strong>FastAPI / Python</strong></span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-semibold border border-emerald-800">
                    Open to Work
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
